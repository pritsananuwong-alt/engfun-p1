/* ========================================================
   EngFun ป.1 — Interactive Grade 1 English Learning App
   ======================================================== */
(function () {
  "use strict";

  const DATA = window.ENG_DATA;
  const STORAGE_KEY = "engfun_p1_progress_v1";

  // ---------------- App State ----------------
  const state = {
    view: "home",
    stars: 0,
    wordsHeard: 0,
    slowMode: false,
    showReading: true,
    projectorMode: false,
    currentUnitId: null,
    spotlightIdx: 0,
    abcIdx: 0,
    abcSongActive: false,
    traceCase: "upper",
    traceColor: "#FF595E",
    tracedLettersSession: new Set(),
    hasDrawnStroke: false,
    gameMode: "listen",
    gameUnitScope: "all",
    mascotQuoteIdx: 0,
    playSeqCancel: null
  };

  // Load saved progress
  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        state.stars = Number(parsed.stars) || 0;
        state.wordsHeard = Number(parsed.wordsHeard) || 0;
      }
    } catch (_) {
      // ignore storage errors
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          stars: state.stars,
          wordsHeard: state.wordsHeard
        })
      );
    } catch (_) {
      // ignore storage errors
    }
  }

  // ---------------- Audio & Speech Engine ----------------
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function playSfx(type) {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;

    const tone = (freq, start, dur, wave = "sine", gainVal = 0.14) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = wave;
      osc.frequency.setValueAtTime(freq, now + start);
      gain.gain.setValueAtTime(gainVal, now + start);
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + dur + 0.02);
    };

    if (type === "pop") {
      tone(520, 0, 0.08, "sine", 0.12);
    } else if (type === "correct") {
      tone(523.25, 0, 0.12, "triangle", 0.16);
      tone(659.25, 0.09, 0.14, "triangle", 0.16);
      tone(783.99, 0.18, 0.22, "triangle", 0.18);
    } else if (type === "wrong") {
      tone(280, 0, 0.14, "sawtooth", 0.08);
      tone(220, 0.12, 0.2, "sawtooth", 0.08);
    } else if (type === "star") {
      tone(659.25, 0, 0.1, "sine", 0.15);
      tone(880, 0.09, 0.18, "sine", 0.16);
    } else if (type === "fanfare") {
      tone(523.25, 0, 0.12, "triangle", 0.16);
      tone(659.25, 0.11, 0.12, "triangle", 0.16);
      tone(783.99, 0.22, 0.12, "triangle", 0.16);
      tone(1046.5, 0.34, 0.35, "triangle", 0.2);
    }
  }

  let cachedVoices = [];
  function refreshVoices() {
    if ("speechSynthesis" in window) {
      cachedVoices = window.speechSynthesis.getVoices() || [];
    }
  }
  refreshVoices();
  if ("speechSynthesis" in window && window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = refreshVoices;
  }

  function pickEnglishVoice() {
    if (!cachedVoices.length) refreshVoices();
    const enUS = cachedVoices.filter((v) => /en[-_]US/i.test(v.lang));
    const preferred =
      enUS.find((v) => /Google US English|Samantha|Zira|Jenny|Aria|Natural/i.test(v.name)) ||
      enUS[0] ||
      cachedVoices.find((v) => /^en/i.test(v.lang));
    return preferred || null;
  }

  function stopSequence() {
    if (state.playSeqCancel) {
      state.playSeqCancel();
      state.playSeqCancel = null;
    }
    state.abcSongActive = false;
    const songBtn = document.getElementById("btn-abc-song");
    if (songBtn) songBtn.textContent = "🎵 อ่าน A ถึง Z";
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  let activeUtterance = null;

  function speakEnglish(text, { countHeard = true, onEnd = null, rateOverride = null } = {}) {
    if (!text) return;
    if (countHeard) {
      state.wordsHeard += 1;
      saveProgress();
    }
    if (!("speechSynthesis" in window)) {
      showToast("เบราว์เซอร์นี้ไม่รองรับเสียงอ่านอัตโนมัติ");
      if (onEnd) setTimeout(onEnd, 400);
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    activeUtterance = utter;
    const voice = pickEnglishVoice();
    if (voice) utter.voice = voice;
    utter.lang = voice ? voice.lang : "en-US";
    utter.rate = rateOverride !== null ? rateOverride : state.slowMode ? 0.62 : 0.9;
    utter.pitch = 1.05;
    if (onEnd) {
      utter.onend = () => {
        activeUtterance = null;
        onEnd();
      };
      utter.onerror = () => {
        activeUtterance = null;
        onEnd();
      };
    }
    window.speechSynthesis.speak(utter);
  }

  // ---------------- Rewards & Confetti ----------------
  function getUnlockedStickersCount(starsVal) {
    return DATA.stickers.filter((s) => starsVal >= s.requirement).length;
  }

  function awardStars(amount, reasonText) {
    const prevUnlocked = getUnlockedStickersCount(state.stars);
    state.stars += amount;
    saveProgress();
    updateStarCounterUI(true);

    const nextUnlocked = getUnlockedStickersCount(state.stars);
    if (nextUnlocked > prevUnlocked) {
      const newly = DATA.stickers[nextUnlocked - 1];
      playSfx("fanfare");
      launchConfetti(90);
      showToast(`🎉 ปลดล็อกสติกเกอร์ใหม่: ${newly.emoji} ${newly.name}!`);
    } else {
      playSfx("star");
      if (reasonText) showToast(`+${amount} ⭐ ${reasonText}`);
    }
  }

  function updateStarCounterUI(animate = false) {
    const el = document.getElementById("star-count");
    const btn = document.getElementById("btn-star-counter");
    if (el) el.textContent = state.stars;
    if (animate && btn) {
      btn.classList.remove("pop");
      void btn.offsetWidth;
      btn.classList.add("pop");
    }
  }

  let toastTimer = null;
  function showToast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  // Lightweight Confetti
  const confettiCanvas = document.getElementById("confetti-canvas");
  const confettiCtx = confettiCanvas ? confettiCanvas.getContext("2d") : null;
  let confettiParticles = [];
  let confettiRAF = null;

  function resizeConfetti() {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeConfetti);
  resizeConfetti();

  function launchConfetti(count = 60) {
    if (!confettiCtx) return;
    const colors = ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#8854D0", "#FF85A2"];
    for (let i = 0; i < count; i++) {
      confettiParticles.push({
        x: Math.random() * confettiCanvas.width,
        y: -20 - Math.random() * 80,
        vx: (Math.random() - 0.5) * 6,
        vy: 3 + Math.random() * 5,
        size: 7 + Math.random() * 7,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 110 + Math.random() * 40
      });
    }
    if (!confettiRAF) animateConfetti();
  }

  function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles = confettiParticles.filter((p) => p.life > 0 && p.y < confettiCanvas.height + 30);
    for (const p of confettiParticles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08;
      p.rot += p.vrot;
      p.life -= 1;
      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate(p.rot);
      confettiCtx.fillStyle = p.color;
      confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
      confettiCtx.restore();
    }
    if (confettiParticles.length > 0) {
      confettiRAF = requestAnimationFrame(animateConfetti);
    } else {
      confettiRAF = null;
    }
  }

  // ---------------- Navigation ----------------
  function switchView(viewName) {
    stopSequence();
    state.view = viewName;
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    const target = document.getElementById(`view-${viewName}`);
    if (target) target.classList.add("active");

    document.querySelectorAll(".nav-btn").forEach((btn) => {
      const match = btn.dataset.view === viewName || (viewName === "unit" && btn.dataset.view === "home");
      btn.classList.toggle("active", match);
    });

    if (viewName === "abc") {
      renderAbcSpotlight();
    } else if (viewName === "games") {
      renderActiveGame();
    } else if (viewName === "stickers") {
      renderStickersView();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------------- Cute Illustration Helper ----------------
  function getCuteVisualHtml(word, fallbackEmoji, sizeClass = "art-md", context = "") {
    const svg = window.ENG_ILLUSTRATIONS && window.ENG_ILLUSTRATIONS.getWordSvg(word, context);
    if (svg) {
      return `<div class="cute-art ${sizeClass}">${svg}</div>`;
    }
    return `<div class="vocab-emoji">${fallbackEmoji || "🌟"}</div>`;
  }

  // ---------------- Home View ----------------
  function getAllWords() {
    const list = [];
    DATA.units.forEach((u) => {
      u.words.forEach((w) => list.push({ ...w, unitId: u.id, unitTitle: u.titleTh }));
    });
    return list;
  }

  function renderDailyWord() {
    const all = getAllWords();
    const pick = all[Math.floor(Math.random() * all.length)];
    const box = document.getElementById("daily-word-box");
    if (!box) return;
    box.innerHTML = `
      ${getCuteVisualHtml(pick.word, pick.emoji, "art-sm")}
      <div>
        <div class="daily-word-en">${pick.word} <span style="font-size:1rem">🔊</span></div>
        <div class="daily-word-meta">
          <span class="reading-guide">(${pick.reading}) • </span>${pick.thai} — <em>${pick.sentence}</em>
        </div>
      </div>
    `;
    box.onclick = () => {
      playSfx("pop");
      speakEnglish(`${pick.word}. ${pick.sentence}`);
    };
  }

  function renderUnitsGrid() {
    const grid = document.getElementById("units-grid");
    if (!grid) return;
    grid.innerHTML = DATA.units
      .map(
        (u) => `
      <button class="unit-card" data-unit-id="${u.id}" style="--u-color:${u.themeColor}; --u-soft:${u.bgSoft}" type="button">
        <div class="unit-cover-wrap">
          <img class="unit-cover-img" src="${u.image}" alt="${u.titleTh}" loading="lazy" />
          <span class="unit-num-badge unit-num-float">บทที่ ${u.number}</span>
        </div>
        <div class="unit-card-body">
          <h3 class="unit-title-en">${u.titleEn}</h3>
          <div class="unit-title-th">${u.titleTh}</div>
          <p class="unit-desc">${u.description}</p>
          <div class="unit-footer">
            <span>🃏 ${u.words.length} คำศัพท์ • 💬 ${u.dialogues.length} ประโยค</span>
            <span class="unit-go">เริ่มเรียน →</span>
          </div>
        </div>
      </button>
    `
      )
      .join("");

    grid.querySelectorAll(".unit-card").forEach((card) => {
      card.addEventListener("click", () => {
        playSfx("pop");
        openUnit(card.dataset.unitId);
      });
    });
  }

  // ---------------- Unit Detail View ----------------
  function getCurrentUnit() {
    return DATA.units.find((u) => u.id === state.currentUnitId) || DATA.units[0];
  }

  function openUnit(unitId) {
    state.currentUnitId = unitId;
    const unit = getCurrentUnit();

    const heading = document.getElementById("unit-heading");
    heading.innerHTML = `
      <img class="unit-heading-thumb" src="${unit.image}" alt="${unit.titleTh}" />
      <div>
        <h2>Unit ${unit.number}: ${unit.titleEn}</h2>
        <span>${unit.titleTh}</span>
      </div>
    `;

    // Reset to vocab tab
    switchUnitTab("vocab");
    renderUnitVocab(unit);
    renderUnitDialogues(unit);
    switchView("unit");
  }

  function switchUnitTab(tabName) {
    stopSequence();
    document.querySelectorAll(".unit-tab").forEach((t) => {
      t.classList.toggle("active", t.dataset.utab === tabName);
    });
    document.querySelectorAll(".unit-panel").forEach((p) => p.classList.remove("active"));
    const panel = document.getElementById(`upanel-${tabName}`);
    if (panel) panel.classList.add("active");

    if (tabName === "quiz") {
      const unit = getCurrentUnit();
      mountQuizGame(document.getElementById("unit-quiz-mount"), unit.words, `แบบทดสอบบทที่ ${unit.number}: ${unit.titleTh}`);
    }
  }

  function renderWordVisual(w) {
    const art = getCuteVisualHtml(w.word, w.emoji, "art-md");
    if (w.count && w.countEmoji) {
      const items = w.countEmoji.repeat(w.count);
      return `${art}<div class="count-visual">${items}</div>`;
    }
    return art;
  }

  function renderUnitVocab(unit) {
    const grid = document.getElementById("vocab-grid");
    grid.innerHTML = unit.words
      .map(
        (w, idx) => `
      <div class="vocab-card" data-widx="${idx}" role="button" tabindex="0">
        <span class="vocab-sound-tag" aria-hidden="true">🔊</span>
        ${renderWordVisual(w)}
        <div class="vocab-word">${w.word}</div>
        <div class="vocab-reading reading-guide">${w.reading}</div>
        <div class="vocab-thai">${w.thai}</div>
        <button class="vocab-sentence-btn" data-sidx="${idx}" type="button">
          <strong>💬 "${w.sentence}"</strong>
          <span>${w.sentenceTh}</span>
        </button>
      </div>
    `
      )
      .join("");

    grid.querySelectorAll(".vocab-card").forEach((card) => {
      const idx = Number(card.dataset.widx);
      const item = unit.words[idx];

      const speakWord = () => {
        stopSequence();
        grid.querySelectorAll(".vocab-card").forEach((c) => c.classList.remove("speaking"));
        card.classList.add("speaking");
        speakEnglish(item.word, {
          onEnd: () => card.classList.remove("speaking")
        });
      };

      card.addEventListener("click", (e) => {
        if (e.target.closest(".vocab-sentence-btn")) return;
        speakWord();
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          speakWord();
        }
      });
    });

    grid.querySelectorAll(".vocab-sentence-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        stopSequence();
        const idx = Number(btn.dataset.sidx);
        const item = unit.words[idx];
        const card = btn.closest(".vocab-card");
        grid.querySelectorAll(".vocab-card").forEach((c) => c.classList.remove("speaking"));
        card.classList.add("speaking");
        speakEnglish(item.sentence, {
          onEnd: () => card.classList.remove("speaking")
        });
      });
    });
  }

  function renderUnitDialogues(unit) {
    const list = document.getElementById("dialogue-list");
    list.innerHTML = unit.dialogues
      .map(
        (d, idx) => `
      <div class="dialogue-row ${d.side}">
        <div class="dialogue-avatar" aria-hidden="true">${d.avatar}</div>
        <div class="dialogue-bubble" data-didx="${idx}" role="button" tabindex="0">
          <div class="dialogue-speaker">${d.speaker} 🔊</div>
          <div class="dialogue-en">${d.en}</div>
          <div class="dialogue-th">${d.th}</div>
        </div>
      </div>
    `
      )
      .join("");

    list.querySelectorAll(".dialogue-bubble").forEach((bubble) => {
      const idx = Number(bubble.dataset.didx);
      const d = unit.dialogues[idx];
      bubble.addEventListener("click", () => {
        stopSequence();
        list.querySelectorAll(".dialogue-bubble").forEach((b) => b.classList.remove("speaking"));
        bubble.classList.add("speaking");
        speakEnglish(d.en, {
          onEnd: () => bubble.classList.remove("speaking")
        });
      });
    });
  }

  function playSequentialList(items, getText, highlightFn, onFinish) {
    stopSequence();
    let cancelled = false;
    let timer = null;
    state.playSeqCancel = () => {
      cancelled = true;
      clearTimeout(timer);
      highlightFn(-1);
    };

    let idx = 0;
    const next = () => {
      if (cancelled) return;
      if (idx >= items.length) {
        highlightFn(-1);
        state.playSeqCancel = null;
        if (onFinish) onFinish();
        return;
      }
      highlightFn(idx);
      speakEnglish(getText(items[idx]), {
        onEnd: () => {
          if (cancelled) return;
          idx += 1;
          timer = setTimeout(next, 520);
        }
      });
    };
    next();
  }

  // ---------------- Classroom Spotlight Modal ----------------
  function openSpotlight(startIdx = 0) {
    state.spotlightIdx = startIdx;
    renderSpotlight();
    document.getElementById("spotlight-modal").classList.remove("hidden");
  }

  function closeSpotlight() {
    stopSequence();
    document.getElementById("spotlight-modal").classList.add("hidden");
  }

  function renderSpotlight() {
    const unit = getCurrentUnit();
    const w = unit.words[state.spotlightIdx];
    document.getElementById("spot-counter").textContent = `${state.spotlightIdx + 1} / ${unit.words.length}`;
    const vis = document.getElementById("spot-visual");
    const art = getCuteVisualHtml(w.word, w.emoji, "art-xl");
    if (w.count && w.countEmoji) {
      vis.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center">${art}<div style="font-size:1.85rem;margin-top:6px">${w.countEmoji.repeat(w.count)}</div></div>`;
    } else {
      vis.innerHTML = art;
    }
    document.getElementById("spot-word").textContent = w.word;
    document.getElementById("spot-reading").textContent = w.reading;
    document.getElementById("spot-thai").textContent = w.thai;
    document.getElementById("spot-sent-en").textContent = `"${w.sentence}"`;
    document.getElementById("spot-sent-th").textContent = w.sentenceTh;
  }

  // ---------------- ABC & Tracing Pad ----------------
  const traceCanvas = document.getElementById("trace-canvas");
  const traceCtx = traceCanvas ? traceCanvas.getContext("2d") : null;
  let isDrawing = false;

  function renderAbcGrid() {
    const grid = document.getElementById("abc-grid");
    if (!grid) return;
    grid.innerHTML = DATA.alphabet
      .map(
        (item, idx) => `
      <button class="abc-key ${idx === state.abcIdx ? "active" : ""}" data-aidx="${idx}" style="--key-color:${item.color}" type="button">
        <span class="abc-key-letters">${item.letter}${item.lower}</span>
        <span class="abc-key-art">${getCuteVisualHtml(item.word, item.emoji, "art-xs", "abc")}</span>
      </button>
    `
      )
      .join("");

    grid.querySelectorAll(".abc-key").forEach((btn) => {
      btn.addEventListener("click", () => {
        stopSequence();
        state.abcIdx = Number(btn.dataset.aidx);
        renderAbcSpotlight();
        speakCurrentAbc();
      });
    });
  }

  function renderAbcSpotlight() {
    const item = DATA.alphabet[state.abcIdx];
    document.getElementById("ph-phonics").textContent = `เสียงโฟนิกส์: ${item.phonics}`;
    document.getElementById("ph-big").textContent = item.letter;
    document.getElementById("ph-small").textContent = item.lower;
    document.getElementById("ph-emoji").innerHTML = getCuteVisualHtml(item.word, item.emoji, "art-lg", "abc");
    document.getElementById("ph-word").textContent = item.word;
    document.getElementById("ph-reading").textContent = `อ่านว่า: ${item.reading}`;
    document.getElementById("ph-thai").textContent = item.thai;

    document.querySelectorAll(".abc-key").forEach((btn) => {
      btn.classList.toggle("active", Number(btn.dataset.aidx) === state.abcIdx);
    });

    resetTraceCanvas();
  }

  function speakCurrentAbc() {
    const item = DATA.alphabet[state.abcIdx];
    speakEnglish(`${item.letter}. ${item.word}`);
  }

  function getTraceGuideText() {
    const item = DATA.alphabet[state.abcIdx];
    if (state.traceCase === "upper") return item.letter;
    if (state.traceCase === "lower") return item.lower;
    return `${item.letter}${item.lower}`;
  }

  function resetTraceCanvas() {
    if (!traceCtx || !traceCanvas) return;
    state.hasDrawnStroke = false;
    const w = traceCanvas.width;
    const h = traceCanvas.height;
    traceCtx.clearRect(0, 0, w, h);

    // Primary-school handwriting lines
    traceCtx.save();
    traceCtx.lineWidth = 2;
    // Top line
    traceCtx.strokeStyle = "#cfe2ff";
    traceCtx.beginPath();
    traceCtx.moveTo(20, 62);
    traceCtx.lineTo(w - 20, 62);
    traceCtx.stroke();

    // Middle dashed line
    traceCtx.setLineDash([8, 8]);
    traceCtx.strokeStyle = "#ffd085";
    traceCtx.beginPath();
    traceCtx.moveTo(20, 152);
    traceCtx.lineTo(w - 20, 152);
    traceCtx.stroke();

    // Baseline
    traceCtx.setLineDash([]);
    traceCtx.strokeStyle = "#ffb8c6";
    traceCtx.beginPath();
    traceCtx.moveTo(20, 238);
    traceCtx.lineTo(w - 20, 238);
    traceCtx.stroke();

    // Faint dotted letter template
    const txt = getTraceGuideText();
    traceCtx.font = `700 ${state.traceCase === "both" ? 168 : 206}px Fredoka, Arial, sans-serif`;
    traceCtx.textAlign = "center";
    traceCtx.textBaseline = "alphabetic";
    traceCtx.fillStyle = "rgba(77, 150, 255, 0.13)";
    traceCtx.fillText(txt, w / 2, 236);
    traceCtx.setLineDash([7, 7]);
    traceCtx.lineWidth = 3;
    traceCtx.strokeStyle = "rgba(77, 150, 255, 0.48)";
    traceCtx.strokeText(txt, w / 2, 236);
    traceCtx.restore();
  }

  function setupTraceCanvasEvents() {
    if (!traceCanvas || !traceCtx) return;

    const getPos = (e) => {
      const rect = traceCanvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: ((clientX - rect.left) / rect.width) * traceCanvas.width,
        y: ((clientY - rect.top) / rect.height) * traceCanvas.height
      };
    };

    const start = (e) => {
      e.preventDefault();
      isDrawing = true;
      state.hasDrawnStroke = true;
      const p = getPos(e);
      traceCtx.save();
      traceCtx.beginPath();
      traceCtx.moveTo(p.x, p.y);
      traceCtx.lineCap = "round";
      traceCtx.lineJoin = "round";
      traceCtx.lineWidth = 15;
      traceCtx.strokeStyle = state.traceColor;
      // Draw a dot in case of single tap
      traceCtx.lineTo(p.x + 0.1, p.y + 0.1);
      traceCtx.stroke();
    };

    const move = (e) => {
      if (!isDrawing) return;
      e.preventDefault();
      const p = getPos(e);
      traceCtx.lineTo(p.x, p.y);
      traceCtx.stroke();
    };

    const end = () => {
      if (!isDrawing) return;
      isDrawing = false;
      traceCtx.restore();
    };

    traceCanvas.addEventListener("mousedown", start);
    traceCanvas.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);

    traceCanvas.addEventListener("touchstart", start, { passive: false });
    traceCanvas.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);
  }

  // ---------------- Games Arcade ----------------
  function populateGameUnitSelect() {
    const sel = document.getElementById("game-unit-select");
    if (!sel) return;
    DATA.units.forEach((u) => {
      const opt = document.createElement("option");
      opt.value = u.id;
      opt.textContent = `${u.icon} บทที่ ${u.number}: ${u.titleTh} (${u.titleEn})`;
      sel.appendChild(opt);
    });
  }

  function getScopedWords() {
    if (state.gameUnitScope === "all") return getAllWords();
    const u = DATA.units.find((x) => x.id === state.gameUnitScope);
    return u ? u.words : getAllWords();
  }

  function shuffle(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function renderActiveGame() {
    const stage = document.getElementById("game-stage");
    if (!stage) return;
    const pool = getScopedWords();
    if (state.gameMode === "listen") {
      mountListenPickGame(stage, pool);
    } else if (state.gameMode === "memory") {
      mountMemoryGame(stage, pool);
    } else {
      mountQuizGame(stage, pool, "🎯 ควิซท้าประลอง 5 ข้อ");
    }
  }

  // Game 1: Listen & Pick
  function mountListenPickGame(container, pool) {
    let streak = 0;
    let round = 0;
    let locked = false;
    let target = null;

    function nextRound() {
      locked = false;
      round += 1;
      const shuffled = shuffle(pool);
      const choices = shuffled.slice(0, 4);
      target = choices[Math.floor(Math.random() * choices.length)];

      container.innerHTML = `
        <div class="quiz-header-bar">
          <strong>🎧 ฟังเสียงแล้วเลือกภาพให้ถูกต้อง (ข้อที่ ${round})</strong>
          <span class="tip-pill">🔥 ตอบถูกติดกัน: ${streak} ครั้ง</span>
        </div>
        <div class="quiz-prompt-box">
          <button class="quiz-big-speaker" id="lp-speak-btn" type="button" title="กดเพื่อฟังเสียงอีกครั้ง">🔊</button>
          <p class="quiz-prompt-title">กดปุ่มลำโพงเพื่อฟังคำศัพท์ แล้วคลิกภาพที่ตรงกัน!</p>
        </div>
        <div class="quiz-options-grid">
          ${choices
            .map(
              (c, i) => `
            <button class="quiz-option" data-cidx="${i}" type="button">
              ${getCuteVisualHtml(c.word, c.emoji, "art-md")}
              <span class="opt-th">${c.thai}</span>
            </button>
          `
            )
            .join("")}
        </div>
        <div class="quiz-feedback" id="lp-feedback"></div>
      `;

      const speakBtn = container.querySelector("#lp-speak-btn");
      speakBtn.addEventListener("click", () => speakEnglish(target.word));

      container.querySelectorAll(".quiz-option").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (locked) return;
          const pick = choices[Number(btn.dataset.cidx)];
          const fb = container.querySelector("#lp-feedback");
          if (pick.word === target.word) {
            locked = true;
            streak += 1;
            btn.classList.add("correct");
            fb.className = "quiz-feedback ok";
            fb.textContent = `🌟 เก่งมาก! "${target.word}" แปลว่า ${target.thai}`;
            playSfx("correct");
            awardStars(1, "ตอบถูกแล้ว!");
            if (streak % 3 === 0) launchConfetti(50);
            setTimeout(nextRound, 1350);
          } else {
            streak = 0;
            btn.classList.add("wrong");
            btn.disabled = true;
            fb.className = "quiz-feedback err";
            fb.textContent = "ลองฟังเสียงแล้วเลือกดูอีกครั้งนะ สู้ๆ! 💪";
            playSfx("wrong");
            speakEnglish(target.word, { countHeard: false });
          }
        });
      });

      setTimeout(() => speakEnglish(target.word, { countHeard: false }), 220);
    }

    nextRound();
  }

  // Game 2: Memory Match
  function mountMemoryGame(container, pool) {
    const pairCount = Math.min(6, pool.length);
    const selected = shuffle(pool).slice(0, pairCount);
    const deck = shuffle(
      selected.flatMap((w, idx) => [
        { uid: `w-${idx}`, pairId: idx, kind: "word", item: w },
        { uid: `p-${idx}`, pairId: idx, kind: "pic", item: w }
      ])
    );

    let flipped = [];
    let matchedCount = 0;
    let moves = 0;
    let busy = false;

    function renderBoard() {
      container.innerHTML = `
        <div class="quiz-header-bar">
          <strong>🧩 จับคู่คำศัพท์ภาษาอังกฤษกับภาพให้ครบ ${pairCount} คู่</strong>
          <div>
            <span class="tip-pill" id="mem-status">จับคู่แล้ว: 0 / ${pairCount} • เปิดไป: 0 ครั้ง</span>
            <button class="btn-mini" id="mem-restart" type="button" style="margin-left:8px">🔀 สุ่มใหม่</button>
          </div>
        </div>
        <div class="memory-grid">
          ${deck
            .map(
              (card, i) => `
            <button class="mem-card" data-midx="${i}" type="button" aria-label="การ์ดความจำ">
              <span class="mem-back-q">❓</span>
            </button>
          `
            )
            .join("")}
        </div>
      `;

      container.querySelector("#mem-restart").addEventListener("click", () => {
        playSfx("pop");
        mountMemoryGame(container, pool);
      });

      const cardsEl = container.querySelectorAll(".mem-card");
      cardsEl.forEach((btn) => {
        btn.addEventListener("click", () => {
          const i = Number(btn.dataset.midx);
          const card = deck[i];
          if (busy || btn.classList.contains("flipped") || btn.classList.contains("matched")) return;

          btn.classList.add("flipped");
          if (card.kind === "word") {
            btn.innerHTML = `<span class="mem-word">${card.item.word}</span><span class="mem-th reading-guide">${card.item.reading}</span>`;
          } else {
            btn.innerHTML = `${getCuteVisualHtml(card.item.word, card.item.emoji, "art-sm")}<span class="mem-th">${card.item.thai}</span>`;
          }

          playSfx("pop");
          speakEnglish(card.item.word, { countHeard: false });
          flipped.push({ i, btn, card });

          if (flipped.length === 2) {
            moves += 1;
            busy = true;
            const [a, b] = flipped;
            if (a.card.pairId === b.card.pairId) {
              matchedCount += 1;
              setTimeout(() => {
                a.btn.classList.add("matched");
                b.btn.classList.add("matched");
                playSfx("correct");
                flipped = [];
                busy = false;
                updateStatus();
                if (matchedCount === pairCount) {
                  launchConfetti(85);
                  awardStars(3, "จับคู่ครบทุกใบแล้ว เก่งสุดยอด!");
                  setTimeout(() => {
                    const statusEl = container.querySelector("#mem-status");
                    if (statusEl) statusEl.textContent = `🎉 ชนะแล้ว! ใช้ไป ${moves} ครั้ง`;
                  }, 250);
                }
              }, 320);
            } else {
              setTimeout(() => {
                a.btn.classList.remove("flipped");
                b.btn.classList.remove("flipped");
                a.btn.innerHTML = `<span class="mem-back-q">❓</span>`;
                b.btn.innerHTML = `<span class="mem-back-q">❓</span>`;
                flipped = [];
                busy = false;
                updateStatus();
              }, 820);
            }
          }
        });
      });
    }

    function updateStatus() {
      const s = container.querySelector("#mem-status");
      if (s) s.textContent = `จับคู่แล้ว: ${matchedCount} / ${pairCount} • เปิดไป: ${moves} ครั้ง`;
    }

    renderBoard();
  }

  // Game 3 (and Unit Quiz): 5-Question Illustrated Quiz
  function mountQuizGame(container, pool, titleText) {
    const totalQ = Math.min(5, pool.length);
    const questions = shuffle(pool).slice(0, totalQ);
    let qIdx = 0;
    let score = 0;

    function renderQuestion() {
      if (qIdx >= totalQ) {
        const starsEarned = Math.max(1, score);
        if (score >= 4) {
          playSfx("fanfare");
          launchConfetti(80);
        }
        awardStars(starsEarned, `ทำแบบทดสอบได้ ${score}/${totalQ} คะแนน!`);
        const praise =
          score === totalQ
            ? "สุดยอดไปเลย! ได้คะแนนเต็ม! 🏆"
            : score >= 3
              ? "เก่งมากเลยจ้า! ฝึกอีกนิดจะได้เต็มแล้ว 🌟"
              : "พยายามได้ดีมาก! ลองทบทวนแล้วมาเล่นใหม่นะ 💪";

        container.innerHTML = `
          <div class="result-card">
            <div class="result-trophy">${score === totalQ ? "🏆" : score >= 3 ? "🌟" : "🦉"}</div>
            <h3>${praise}</h3>
            <div class="result-score">คะแนนที่ได้: ${score} / ${totalQ} ข้อ (+${starsEarned} ⭐)</div>
            <button class="btn-chunky btn-primary" id="btn-quiz-retry" type="button">🔄 เล่นแบบทดสอบอีกครั้ง</button>
          </div>
        `;
        container.querySelector("#btn-quiz-retry").addEventListener("click", () => {
          playSfx("pop");
          mountQuizGame(container, pool, titleText);
        });
        return;
      }

      const target = questions[qIdx];
      const distractors = shuffle(pool.filter((w) => w.word !== target.word)).slice(0, 3);
      const options = shuffle([target, ...distractors]);
      const isPictureToWord = qIdx % 2 === 0;
      let answered = false;

      const pct = Math.round((qIdx / totalQ) * 100);

      container.innerHTML = `
        <div class="quiz-header-bar">
          <strong>${titleText} — ข้อ ${qIdx + 1} / ${totalQ}</strong>
          <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
          <span class="tip-pill">คะแนน: ${score}</span>
        </div>

        <div class="quiz-prompt-box">
          ${
            isPictureToWord
              ? `
            <div class="quiz-prompt-visual">
              ${getCuteVisualHtml(target.word, target.emoji, "art-lg")}
            </div>
            <p class="quiz-prompt-title">ภาพนี้ (${target.thai}) ภาษาอังกฤษคือคำว่าอะไร?</p>
          `
              : `
            <button class="quiz-big-speaker" id="qz-speak-btn" type="button" title="กดฟังเสียง">🔊</button>
            <p class="quiz-prompt-title">ฟังเสียงแล้วเลือกคำศัพท์ภาษาอังกฤษที่ได้ยิน!</p>
          `
          }
        </div>

        <div class="quiz-options-grid">
          ${options
            .map(
              (o, i) => `
            <button class="quiz-option" data-oidx="${i}" type="button">
              <span class="opt-en">${o.word}</span>
              <span class="opt-th reading-guide">${o.reading}</span>
            </button>
          `
            )
            .join("")}
        </div>
        <div class="quiz-feedback" id="qz-feedback"></div>
      `;

      const speakBtn = container.querySelector("#qz-speak-btn");
      if (speakBtn) {
        speakBtn.addEventListener("click", () => speakEnglish(target.word));
        setTimeout(() => speakEnglish(target.word, { countHeard: false }), 200);
      }

      container.querySelectorAll(".quiz-option").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (answered) return;
          answered = true;
          const chosen = options[Number(btn.dataset.oidx)];
          const fb = container.querySelector("#qz-feedback");

          container.querySelectorAll(".quiz-option").forEach((b, idx) => {
            b.disabled = true;
            if (options[idx].word === target.word) b.classList.add("correct");
          });

          if (chosen.word === target.word) {
            score += 1;
            fb.className = "quiz-feedback ok";
            fb.textContent = `✅ ถูกต้อง! ${target.word} (${target.thai})`;
            playSfx("correct");
            speakEnglish(target.word, { countHeard: false });
          } else {
            btn.classList.add("wrong");
            fb.className = "quiz-feedback err";
            fb.textContent = `❌ คำตอบที่ถูกคือ "${target.word}" (${target.thai}) นะจ๊ะ`;
            playSfx("wrong");
            speakEnglish(target.word, { countHeard: false });
          }

          setTimeout(() => {
            qIdx += 1;
            renderQuestion();
          }, 1450);
        });
      });
    }

    renderQuestion();
  }

  // ---------------- Stickers View ----------------
  function renderStickersView() {
    const unlockedCount = getUnlockedStickersCount(state.stars);
    document.getElementById("st-total-stars").textContent = state.stars;
    document.getElementById("st-unlocked-count").textContent = `${unlockedCount} / ${DATA.stickers.length}`;
    document.getElementById("st-words-heard").textContent = state.wordsHeard;

    const grid = document.getElementById("stickers-grid");
    grid.innerHTML = DATA.stickers
      .map((s) => {
        const unlocked = state.stars >= s.requirement;
        const left = Math.max(0, s.requirement - state.stars);
        return `
        <div class="sticker-card ${unlocked ? "unlocked" : "locked"}">
          <span class="sticker-emoji">${s.emoji}</span>
          <div class="sticker-name">${s.name}</div>
          <div class="sticker-req">
            ${unlocked ? "✅ ปลดล็อกแล้ว!" : `🔒 ${s.desc} (อีก ${left} ⭐)`}
          </div>
        </div>
      `;
      })
      .join("");
  }

  // ---------------- Wire Up All Events ----------------
  function initEvents() {
    // Nav & Brand
    document.getElementById("btn-brand-home").addEventListener("click", () => switchView("home"));
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        playSfx("pop");
        switchView(btn.dataset.view);
      });
    });

    // Hero buttons
    document.getElementById("btn-hero-abc").addEventListener("click", () => {
      playSfx("pop");
      switchView("abc");
    });
    document.getElementById("btn-hero-game").addEventListener("click", () => {
      playSfx("pop");
      switchView("games");
    });
    document.getElementById("btn-star-counter").addEventListener("click", () => {
      playSfx("pop");
      switchView("stickers");
    });

    // Mascot interaction
    const mascot = document.getElementById("mascot-trigger");
    const mascotSpeech = document.getElementById("mascot-speech");
    const pokeMascot = () => {
      playSfx("pop");
      state.mascotQuoteIdx = (state.mascotQuoteIdx + 1) % DATA.mascotQuotes.length;
      mascotSpeech.textContent = DATA.mascotQuotes[state.mascotQuoteIdx];
      const greetings = ["Hello! Let's learn English!", "Good job! You are awesome!", "Hi friend! Ready to play?"];
      speakEnglish(greetings[state.mascotQuoteIdx % greetings.length]);
    };
    mascot.addEventListener("click", pokeMascot);
    mascot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        pokeMascot();
      }
    });

    // Daily word next
    document.getElementById("btn-daily-next").addEventListener("click", () => {
      playSfx("pop");
      renderDailyWord();
    });

    // Header toggles
    const slowBtn = document.getElementById("toggle-slow");
    slowBtn.addEventListener("click", () => {
      state.slowMode = !state.slowMode;
      slowBtn.classList.toggle("active", state.slowMode);
      slowBtn.setAttribute("aria-pressed", String(state.slowMode));
      playSfx("pop");
      showToast(state.slowMode ? "🐢 เปิดโหมดอ่านช้าๆ ชัดๆ แล้ว" : "🐇 กลับเป็นความเร็วปกติแล้ว");
    });

    const readingBtn = document.getElementById("toggle-reading");
    readingBtn.addEventListener("click", () => {
      state.showReading = !state.showReading;
      readingBtn.classList.toggle("active", state.showReading);
      readingBtn.setAttribute("aria-pressed", String(state.showReading));
      document.body.classList.toggle("hide-reading", !state.showReading);
      playSfx("pop");
    });

    const projBtn = document.getElementById("toggle-projector");
    projBtn.addEventListener("click", () => {
      state.projectorMode = !state.projectorMode;
      projBtn.classList.toggle("active", state.projectorMode);
      projBtn.setAttribute("aria-pressed", String(state.projectorMode));
      document.body.classList.toggle("projector-mode", state.projectorMode);
      playSfx("pop");
      showToast(state.projectorMode ? "📺 เปิดโหมดจอใหญ่สำหรับห้องเรียนแล้ว" : "💻 ปิดโหมดจอใหญ่แล้ว");
    });

    // Unit View controls
    document.getElementById("btn-unit-back").addEventListener("click", () => switchView("home"));
    document.querySelectorAll(".unit-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        playSfx("pop");
        switchUnitTab(tab.dataset.utab);
      });
    });

    document.getElementById("btn-play-all-words").addEventListener("click", () => {
      const unit = getCurrentUnit();
      const cards = document.querySelectorAll("#vocab-grid .vocab-card");
      playSequentialList(
        unit.words,
        (w) => w.word,
        (idx) => {
          cards.forEach((c, i) => c.classList.toggle("speaking", i === idx));
          if (idx >= 0 && cards[idx]) {
            cards[idx].scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        },
        () => showToast("👏 อ่านครบทุกคำในบทนี้แล้ว!")
      );
    });

    document.getElementById("btn-play-dialogue").addEventListener("click", () => {
      const unit = getCurrentUnit();
      const bubbles = document.querySelectorAll("#dialogue-list .dialogue-bubble");
      playSequentialList(
        unit.dialogues,
        (d) => d.en,
        (idx) => {
          bubbles.forEach((b, i) => b.classList.toggle("speaking", i === idx));
        },
        () => showToast("💬 จบบทสนทนาแล้ว เก่งมาก!")
      );
    });

    // Spotlight modal
    document.getElementById("btn-open-spotlight").addEventListener("click", () => {
      playSfx("pop");
      openSpotlight(0);
    });
    document.getElementById("btn-close-spotlight").addEventListener("click", closeSpotlight);
    document.getElementById("spotlight-modal").addEventListener("click", (e) => {
      if (e.target.id === "spotlight-modal") closeSpotlight();
    });
    document.getElementById("btn-spot-prev").addEventListener("click", () => {
      const unit = getCurrentUnit();
      state.spotlightIdx = (state.spotlightIdx - 1 + unit.words.length) % unit.words.length;
      renderSpotlight();
      speakEnglish(unit.words[state.spotlightIdx].word);
    });
    document.getElementById("btn-spot-next").addEventListener("click", () => {
      const unit = getCurrentUnit();
      state.spotlightIdx = (state.spotlightIdx + 1) % unit.words.length;
      renderSpotlight();
      speakEnglish(unit.words[state.spotlightIdx].word);
    });
    document.getElementById("btn-spot-speak").addEventListener("click", () => {
      const unit = getCurrentUnit();
      speakEnglish(unit.words[state.spotlightIdx].word);
    });
    document.getElementById("btn-spot-sent").addEventListener("click", () => {
      const unit = getCurrentUnit();
      speakEnglish(unit.words[state.spotlightIdx].sentence);
    });

    // Keyboard shortcuts for Classroom Spotlight Modal
    window.addEventListener("keydown", (e) => {
      const modal = document.getElementById("spotlight-modal");
      if (modal.classList.contains("hidden")) return;
      if (e.key === "Escape") closeSpotlight();
      if (e.key === "ArrowRight") document.getElementById("btn-spot-next").click();
      if (e.key === "ArrowLeft") document.getElementById("btn-spot-prev").click();
      if (e.key === " ") {
        e.preventDefault();
        document.getElementById("btn-spot-speak").click();
      }
    });

    // ABC & Tracing controls
    document.getElementById("btn-ph-speak").addEventListener("click", speakCurrentAbc);
    document.getElementById("btn-abc-prev").addEventListener("click", () => {
      stopSequence();
      state.abcIdx = (state.abcIdx - 1 + DATA.alphabet.length) % DATA.alphabet.length;
      renderAbcSpotlight();
      speakCurrentAbc();
    });
    document.getElementById("btn-abc-next").addEventListener("click", () => {
      stopSequence();
      state.abcIdx = (state.abcIdx + 1) % DATA.alphabet.length;
      renderAbcSpotlight();
      speakCurrentAbc();
    });

    document.getElementById("btn-abc-song").addEventListener("click", () => {
      const songBtn = document.getElementById("btn-abc-song");
      if (state.abcSongActive) {
        stopSequence();
        return;
      }
      state.abcSongActive = true;
      songBtn.textContent = "⏹️ หยุดอ่าน";
      playSequentialList(
        DATA.alphabet,
        (item) => `${item.letter}, ${item.word}`,
        (idx) => {
          if (idx >= 0) {
            state.abcIdx = idx;
            renderAbcSpotlight();
          }
        },
        () => {
          state.abcSongActive = false;
          songBtn.textContent = "🎵 อ่าน A ถึง Z";
          launchConfetti(60);
          awardStars(2, "ฟังครบ A ถึง Z แล้ว!");
        }
      );
    });

    document.querySelectorAll(".case-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.traceCase = btn.dataset.case;
        document.querySelectorAll(".case-btn").forEach((b) => b.classList.toggle("active", b === btn));
        playSfx("pop");
        resetTraceCanvas();
      });
    });

    document.querySelectorAll(".crayon").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.traceColor = btn.dataset.color;
        document.querySelectorAll(".crayon").forEach((b) => b.classList.toggle("active", b === btn));
        playSfx("pop");
      });
    });

    document.getElementById("btn-trace-clear").addEventListener("click", () => {
      playSfx("pop");
      resetTraceCanvas();
    });

    document.getElementById("btn-trace-done").addEventListener("click", () => {
      if (!state.hasDrawnStroke) {
        showToast("✏️ ลองลากเส้นเขียนตัวอักษรบนกระดานก่อนนะจ๊ะ!");
        return;
      }
      const letter = DATA.alphabet[state.abcIdx].letter;
      launchConfetti(45);
      speakCurrentAbc();
      if (!state.tracedLettersSession.has(letter)) {
        state.tracedLettersSession.add(letter);
        awardStars(1, `เขียนตัว ${letter} สวยมาก!`);
      } else {
        playSfx("correct");
        showToast(`👏 เขียนตัว ${letter} ได้เยี่ยมมากเลย!`);
      }
    });

    // Games View controls
    document.getElementById("game-unit-select").addEventListener("change", (e) => {
      state.gameUnitScope = e.target.value;
      playSfx("pop");
      renderActiveGame();
    });

    document.querySelectorAll(".game-mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.gameMode = btn.dataset.gmode;
        document.querySelectorAll(".game-mode-btn").forEach((b) => b.classList.toggle("active", b === btn));
        playSfx("pop");
        renderActiveGame();
      });
    });

    // Reset progress
    document.getElementById("btn-reset-progress").addEventListener("click", () => {
      if (window.confirm("ต้องการรีเซ็ตดาวและสติกเกอร์ทั้งหมดเพื่อเริ่มสะสมใหม่ใช่ไหม?")) {
        state.stars = 0;
        state.wordsHeard = 0;
        state.tracedLettersSession.clear();
        saveProgress();
        updateStarCounterUI();
        renderStickersView();
        showToast("🔄 รีเซ็ตคะแนนเรียบร้อยแล้ว เริ่มสะสมใหม่กันเลย!");
      }
    });
  }

  // ---------------- Boot ----------------
  loadProgress();
  updateStarCounterUI();
  renderDailyWord();
  renderUnitsGrid();
  renderAbcGrid();
  setupTraceCanvasEvents();
  populateGameUnitSelect();
  initEvents();
})();
