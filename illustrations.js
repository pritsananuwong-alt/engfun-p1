/* ========================================================
   EngFun ป.1 — Kawaii Storybook SVG Illustration Library
   ภาพวาดการ์ตูนพาสเทลสุดน่ารักสำหรับเด็กชั้น ป.1
   ======================================================== */
(function () {
  "use strict";

  const INK = "#4A3B52";

  function wrap(bg, body, sparkles = true) {
    const sp = sparkles
      ? `<circle cx="18" cy="20" r="3" fill="#FFF" opacity="0.85"/>
         <circle cx="102" cy="24" r="4" fill="#FFF" opacity="0.75"/>
         <circle cx="96" cy="98" r="2.5" fill="#FFF" opacity="0.8"/>`
      : "";
    return `<svg class="kawaii-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="4" width="112" height="112" rx="30" fill="${bg}"/>
      ${sp}
      ${body}
    </svg>`;
  }

  function face(x = 60, y = 64, spread = 12, happy = true, cheekColor = "#FF9EB5") {
    const mouth = happy
      ? `<path d="M${x - 5} ${y + 4} Q${x} ${y + 10} ${x + 5} ${y + 4}" fill="none" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>`
      : `<path d="M${x - 4} ${y + 7} Q${x} ${y + 4} ${x + 4} ${y + 7}" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`;
    return `
      <circle cx="${x - spread}" cy="${y}" r="4.2" fill="${INK}"/>
      <circle cx="${x + spread}" cy="${y}" r="4.2" fill="${INK}"/>
      <circle cx="${x - spread + 1.4}" cy="${y - 1.4}" r="1.6" fill="#FFF"/>
      <circle cx="${x + spread + 1.4}" cy="${y - 1.4}" r="1.6" fill="#FFF"/>
      <ellipse cx="${x - spread - 4}" cy="${y + 5.5}" rx="4.5" ry="2.6" fill="${cheekColor}" opacity="0.75"/>
      <ellipse cx="${x + spread + 4}" cy="${y + 5.5}" rx="4.5" ry="2.6" fill="${cheekColor}" opacity="0.75"/>
      ${mouth}
    `;
  }

  function colorDrop(fill, bg, strokeColor = INK, lightText = false) {
    const eyeFill = lightText ? "#FFF" : INK;
    const shineFill = lightText ? "#4A3B52" : "#FFF";
    return wrap(
      bg,
      `<ellipse cx="60" cy="100" rx="28" ry="6" fill="rgba(74,59,82,0.1)"/>
       <path d="M60 18 C60 18 92 52 92 73 C92 91 78 102 60 102 C42 102 28 91 28 73 C28 52 60 18 60 18 Z"
             fill="${fill}" stroke="${strokeColor}" stroke-width="3.4" stroke-linejoin="round"/>
       <ellipse cx="45" cy="56" rx="5" ry="9" transform="rotate(-24 45 56)" fill="#FFF" opacity="0.45"/>
       <circle cx="49" cy="73" r="4.2" fill="${eyeFill}"/>
       <circle cx="71" cy="73" r="4.2" fill="${eyeFill}"/>
       <circle cx="50.4" cy="71.6" r="1.5" fill="${shineFill}"/>
       <circle cx="72.4" cy="71.6" r="1.5" fill="${shineFill}"/>
       <ellipse cx="42" cy="79" rx="4.5" ry="2.5" fill="#FF8FB1" opacity="0.8"/>
       <ellipse cx="78" cy="79" rx="4.5" ry="2.5" fill="#FF8FB1" opacity="0.8"/>
       <path d="M55 78 Q60 84 65 78" fill="none" stroke="${eyeFill}" stroke-width="2.8" stroke-linecap="round"/>
       <circle cx="24" cy="40" r="5" fill="${fill}" stroke="${strokeColor}" stroke-width="2.2"/>
       <circle cx="97" cy="46" r="4" fill="${fill}" stroke="${strokeColor}" stroke-width="2.2"/>`
    );
  }

  function numberBadge(num, fill, bg) {
    return wrap(
      bg,
      `<circle cx="60" cy="62" r="40" fill="${fill}" stroke="${INK}" stroke-width="3.5"/>
       <circle cx="60" cy="62" r="33" fill="none" stroke="#FFF" stroke-width="2.5" stroke-dasharray="6 5" opacity="0.7"/>
       <text x="60" y="79" text-anchor="middle" font-family="Fredoka, Mali, sans-serif" font-size="52" font-weight="700" fill="#FFF" stroke="${INK}" stroke-width="2.5" paint-order="stroke">${num}</text>
       <polygon points="94,20 97,27 104,27 98,31 100,38 94,34 88,38 90,31 84,27 91,27" fill="#FFD32A" stroke="${INK}" stroke-width="1.8"/>`
    );
  }

  const ART = {
    // ================= GREETINGS =================
    Hello: wrap(
      "#FFF0F5",
      `<circle cx="60" cy="62" r="28" fill="#FFE0BD" stroke="${INK}" stroke-width="3.2"/>
       <path d="M32 56 Q34 26 60 28 Q86 26 88 56 Q74 44 60 44 Q46 44 32 56Z" fill="#5D4037" stroke="${INK}" stroke-width="3"/>
       <circle cx="30" cy="48" r="9" fill="#5D4037" stroke="${INK}" stroke-width="2.8"/>
       <circle cx="90" cy="48" r="9" fill="#5D4037" stroke="${INK}" stroke-width="2.8"/>
       ${face(60, 62, 11)}
       <path d="M40 90 Q60 82 80 90 L84 106 L36 106 Z" fill="#FF7EA5" stroke="${INK}" stroke-width="3"/>
       <ellipse cx="96" cy="70" rx="9" ry="12" transform="rotate(18 96 70)" fill="#FFE0BD" stroke="${INK}" stroke-width="3"/>
       <path d="M101 52 Q108 55 107 62" fill="none" stroke="#FF9F1A" stroke-width="3" stroke-linecap="round"/>`
    ),
    "Good morning": wrap(
      "#FFF7D6",
      `<path d="M10 96 Q60 72 110 96 L110 112 L10 112 Z" fill="#8CE99A" stroke="${INK}" stroke-width="3"/>
       <g stroke="#FFA502" stroke-width="4" stroke-linecap="round">
         <line x1="60" y1="14" x2="60" y2="24"/><line x1="26" y1="28" x2="33" y2="35"/>
         <line x1="94" y1="28" x2="87" y2="35"/><line x1="16" y1="60" x2="26" y2="60"/>
         <line x1="104" y1="60" x2="94" y2="60"/>
       </g>
       <circle cx="60" cy="60" r="27" fill="#FFD32A" stroke="${INK}" stroke-width="3.2"/>
       ${face(60, 60, 10)}`
    ),
    "Good afternoon": wrap(
      "#E3F4FF",
      `<g stroke="#FF9F1A" stroke-width="4" stroke-linecap="round">
         <line x1="72" y1="14" x2="72" y2="23"/><line x1="44" y1="26" x2="50" y2="32"/>
         <line x1="100" y1="26" x2="94" y2="32"/><line x1="104" y1="54" x2="95" y2="54"/>
       </g>
       <circle cx="72" cy="52" r="22" fill="#FFD32A" stroke="${INK}" stroke-width="3"/>
       ${face(72, 52, 8)}
       <path d="M24 92 H76 C84 92 88 86 88 80 C88 73 82 68 75 68 C73 59 64 54 55 56 C48 50 36 53 33 63 C23 64 16 71 16 80 C16 87 20 92 24 92 Z"
             fill="#FFFFFF" stroke="${INK}" stroke-width="3.2"/>
       ${face(50, 76, 9)}`
    ),
    "Good night": wrap(
      "#2B2D5C",
      `<path d="M74 26 C52 26 36 43 36 64 C36 85 53 100 74 98 C59 93 52 79 54 63 C56 46 65 34 74 26 Z"
             fill="#FFE066" stroke="#FFF4B8" stroke-width="2.5"/>
       <circle cx="46" cy="62" r="3" fill="${INK}"/>
       <path d="M44 70 Q49 74 53 70" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
       <polygon points="88,28 91,36 99,36 93,41 95,49 88,44 81,49 83,41 77,36 85,36" fill="#FFD32A"/>
       <polygon points="28,32 30,37 35,37 31,40 32,45 28,42 24,45 25,40 21,37 26,37" fill="#FFF3A3"/>
       <circle cx="94" cy="74" r="4" fill="#A29BFE"/>`,
      false
    ),
    Goodbye: wrap(
      "#EBF5FF",
      `<path d="M20 74 A40 40 0 0 1 100 74" fill="none" stroke="#FF7675" stroke-width="8" stroke-linecap="round"/>
       <path d="M28 74 A32 32 0 0 1 92 74" fill="none" stroke="#FFD32A" stroke-width="8" stroke-linecap="round"/>
       <path d="M36 74 A24 24 0 0 1 84 74" fill="none" stroke="#74B9FF" stroke-width="8" stroke-linecap="round"/>
       <rect x="44" y="62" width="32" height="36" rx="12" fill="#FF9F43" stroke="${INK}" stroke-width="3.2"/>
       <rect x="50" y="76" width="20" height="14" rx="5" fill="#FFF3D6" stroke="${INK}" stroke-width="2.4"/>
       ${face(60, 72, 7)}`
    ),
    "Thank you": wrap(
      "#FFF0F3",
      `<path d="M60 98 C60 98 20 74 20 47 C20 32 32 22 45 22 C53 22 58 27 60 32 C62 27 67 22 75 22 C88 22 100 32 100 47 C100 74 60 98 60 98 Z"
             fill="#FF6B9D" stroke="${INK}" stroke-width="3.4" stroke-linejoin="round"/>
       <ellipse cx="38" cy="40" rx="6" ry="4" transform="rotate(-30 38 40)" fill="#FFF" opacity="0.5"/>
       ${face(60, 56, 11, true, "#FF3B7F")}`
    ),
    Sorry: wrap(
      "#F3F0FF",
      `<circle cx="60" cy="62" r="34" fill="#FFE6B8" stroke="${INK}" stroke-width="3.4"/>
       <path d="M40 50 Q46 46 51 50" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>
       <path d="M69 50 Q74 46 80 50" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>
       ${face(60, 62, 12, false)}
       <path d="M84 62 Q90 71 84 76 Q78 71 84 62 Z" fill="#74B9FF" stroke="${INK}" stroke-width="2.2"/>`
    ),
    Friend: wrap(
      "#E9FBF1",
      `<circle cx="40" cy="64" r="22" fill="#FFE0BD" stroke="${INK}" stroke-width="3"/>
       <path d="M20 58 Q26 36 40 38 Q56 36 60 58 Q48 48 40 48 Q30 48 20 58Z" fill="#5D4037" stroke="${INK}" stroke-width="2.8"/>
       ${face(40, 64, 7)}
       <circle cx="80" cy="64" r="22" fill="#FFE0BD" stroke="${INK}" stroke-width="3"/>
       <path d="M60 56 Q68 35 80 38 Q94 35 100 56 Q88 47 80 48 Q70 47 60 56Z" fill="#3B2F2F" stroke="${INK}" stroke-width="2.8"/>
       ${face(80, 64, 7)}
       <path d="M60 36 C60 36 49 28 49 21 C49 17 53 14 56 14 C58 14 60 16 60 18 C60 16 62 14 64 14 C67 14 71 17 71 21 C71 28 60 36 60 36 Z"
             fill="#FF6B9D" stroke="${INK}" stroke-width="2.4"/>`
    ),

    // ================= NUMBERS 1-10 =================
    One: numberBadge("1", "#FF6B6B", "#FFF0F0"),
    Two: numberBadge("2", "#FF9F43", "#FFF5E8"),
    Three: numberBadge("3", "#FECA57", "#FFFBE6"),
    Four: numberBadge("4", "#20BF6B", "#E9FBF1"),
    Five: numberBadge("5", "#00CEC9", "#E6FCFB"),
    Six: numberBadge("6", "#4D96FF", "#EEF5FF"),
    Seven: numberBadge("7", "#8854D0", "#F4EEFF"),
    Eight: numberBadge("8", "#FD79A8", "#FFF0F6"),
    Nine: numberBadge("9", "#FF7F50", "#FFF2EC"),
    Ten: numberBadge("10", "#3867D6", "#EDF2FF"),

    // ================= COLORS =================
    Red: colorDrop("#FF5252", "#FFF0F0"),
    Blue: colorDrop("#339AF0", "#EBF5FF"),
    Yellow: colorDrop("#FFD43B", "#FFFBE6"),
    Green: colorDrop("#40C057", "#EBFBEE"),
    Orange: colorDrop("#FF922B", "#FFF4E6"),
    Pink: colorDrop("#FF78B4", "#FFF0F6"),
    Purple: colorDrop("#9775FA", "#F3F0FF"),
    Black: colorDrop("#343A40", "#EDF0F5", "#1F2429", true),
    White: colorDrop("#FFFFFF", "#EDF2F7", "#8D99AE", false),
    Brown: colorDrop("#A96B42", "#FBF3EC"),

    // ================= ANIMALS =================
    Cat: wrap(
      "#FFF4E6",
      `<polygon points="30,52 34,22 54,40" fill="#FFB347" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
       <polygon points="90,52 86,22 66,40" fill="#FFB347" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
       <polygon points="35,46 37,30 48,40" fill="#FF9EB5"/>
       <polygon points="85,46 83,30 72,40" fill="#FF9EB5"/>
       <ellipse cx="60" cy="66" rx="34" ry="30" fill="#FFC46B" stroke="${INK}" stroke-width="3.2"/>
       <path d="M55 37 L55 46 M60 36 L60 47 M65 37 L65 46" stroke="#E67E22" stroke-width="3" stroke-linecap="round"/>
       <line x1="20" y1="66" x2="34" y2="68" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
       <line x1="20" y1="74" x2="34" y2="73" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
       <line x1="100" y1="66" x2="86" y2="68" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
       <line x1="100" y1="74" x2="86" y2="73" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
       ${face(60, 65, 13)}
       <polygon points="57,69 63,69 60,73" fill="#FF6B9D"/>`
    ),
    Dog: wrap(
      "#F6F0FF",
      `<ellipse cx="28" cy="66" rx="13" ry="24" transform="rotate(14 28 66)" fill="#B57C4C" stroke="${INK}" stroke-width="3.2"/>
       <ellipse cx="92" cy="66" rx="13" ry="24" transform="rotate(-14 92 66)" fill="#B57C4C" stroke="${INK}" stroke-width="3.2"/>
       <ellipse cx="60" cy="64" rx="32" ry="30" fill="#F2C894" stroke="${INK}" stroke-width="3.2"/>
       <ellipse cx="47" cy="58" rx="11" ry="12" fill="#D49A62" opacity="0.65"/>
       <ellipse cx="60" cy="76" rx="14" ry="11" fill="#FFF7EB"/>
       <ellipse cx="60" cy="70" rx="6" ry="4.5" fill="${INK}"/>
       <circle cx="47" cy="59" r="4.2" fill="${INK}"/>
       <circle cx="73" cy="59" r="4.2" fill="${INK}"/>
       <circle cx="48.4" cy="57.6" r="1.5" fill="#FFF"/>
       <circle cx="74.4" cy="57.6" r="1.5" fill="#FFF"/>
       <ellipse cx="38" cy="67" rx="4.5" ry="2.6" fill="#FF9EB5" opacity="0.75"/>
       <ellipse cx="82" cy="67" rx="4.5" ry="2.6" fill="#FF9EB5" opacity="0.75"/>
       <path d="M55 77 Q60 83 65 77" fill="none" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>
       <path d="M57 80 Q60 88 63 80 Z" fill="#FF6B9D"/>`
    ),
    Bird: wrap(
      "#E6F7FF",
      `<ellipse cx="60" cy="68" rx="30" ry="26" fill="#5CC8FF" stroke="${INK}" stroke-width="3.2"/>
       <ellipse cx="60" cy="76" rx="18" ry="14" fill="#D9F3FF"/>
       <path d="M54 42 Q60 28 66 42" fill="#5CC8FF" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
       <ellipse cx="30" cy="68" rx="10" ry="14" transform="rotate(24 30 68)" fill="#38A8E8" stroke="${INK}" stroke-width="3"/>
       <ellipse cx="90" cy="68" rx="10" ry="14" transform="rotate(-24 90 68)" fill="#38A8E8" stroke="${INK}" stroke-width="3"/>
       <circle cx="48" cy="60" r="4.2" fill="${INK}"/>
       <circle cx="72" cy="60" r="4.2" fill="${INK}"/>
       <circle cx="49.3" cy="58.6" r="1.5" fill="#FFF"/>
       <circle cx="73.3" cy="58.6" r="1.5" fill="#FFF"/>
       <ellipse cx="40" cy="67" rx="4.5" ry="2.6" fill="#FF9EB5" opacity="0.8"/>
       <ellipse cx="80" cy="67" rx="4.5" ry="2.6" fill="#FF9EB5" opacity="0.8"/>
       <polygon points="54,64 66,64 60,74" fill="#FFA502" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>`
    ),
    Fish: wrap(
      "#E3FAFC",
      `<polygon points="84,62 106,42 102,62 106,82" fill="#FF8787" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
       <ellipse cx="55" cy="62" rx="34" ry="24" fill="#FF9F43" stroke="${INK}" stroke-width="3.2"/>
       <path d="M46 39 Q56 24 68 40" fill="#FFD32A" stroke="${INK}" stroke-width="3"/>
       <path d="M56 40 Q62 62 56 84" fill="none" stroke="#FFF4D6" stroke-width="7" stroke-linecap="round"/>
       <circle cx="38" cy="57" r="4.5" fill="${INK}"/>
       <circle cx="39.5" cy="55.5" r="1.6" fill="#FFF"/>
       <ellipse cx="42" cy="66" rx="4.5" ry="2.6" fill="#FF7EA5" opacity="0.8"/>
       <path d="M26 65 Q31 70 36 67" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>
       <circle cx="18" cy="40" r="5" fill="#FFF" stroke="#74C0FC" stroke-width="2"/>
       <circle cx="25" cy="28" r="3.5" fill="#FFF" stroke="#74C0FC" stroke-width="2"/>`
    ),
    Duck: wrap(
      "#E6FCF5",
      `<ellipse cx="62" cy="78" rx="30" ry="21" fill="#FFE066" stroke="${INK}" stroke-width="3.2"/>
       <circle cx="54" cy="48" r="22" fill="#FFE066" stroke="${INK}" stroke-width="3.2"/>
       <path d="M48 26 Q54 16 60 26" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
       <ellipse cx="32" cy="54" rx="11" ry="6.5" fill="#FF922B" stroke="${INK}" stroke-width="3"/>
       <circle cx="48" cy="45" r="4" fill="${INK}"/>
       <circle cx="49.3" cy="43.6" r="1.5" fill="#FFF"/>
       <ellipse cx="58" cy="53" rx="4.5" ry="2.6" fill="#FF9EB5" opacity="0.8"/>
       <path d="M54 74 Q70 70 78 82 Q64 88 54 74 Z" fill="#FFD43B" stroke="${INK}" stroke-width="2.6"/>`
    ),
    Rabbit: wrap(
      "#FFF0F6",
      `<ellipse cx="45" cy="34" rx="10" ry="24" transform="rotate(-10 45 34)" fill="#FFFFFF" stroke="${INK}" stroke-width="3.2"/>
       <ellipse cx="75" cy="34" rx="10" ry="24" transform="rotate(10 75 34)" fill="#FFFFFF" stroke="${INK}" stroke-width="3.2"/>
       <ellipse cx="45" cy="36" rx="5" ry="15" transform="rotate(-10 45 36)" fill="#FFB3C6"/>
       <ellipse cx="75" cy="36" rx="5" ry="15" transform="rotate(10 75 36)" fill="#FFB3C6"/>
       <ellipse cx="60" cy="72" rx="32" ry="27" fill="#FFFFFF" stroke="${INK}" stroke-width="3.2"/>
       ${face(60, 70, 12)}
       <polygon points="57,74 63,74 60,78" fill="#FF85A2"/>`
    ),
    Pig: wrap(
      "#FFF0F5",
      `<polygon points="28,50 32,26 50,38" fill="#FFA8C5" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
       <polygon points="92,50 88,26 70,38" fill="#FFA8C5" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
       <circle cx="60" cy="64" r="33" fill="#FFC2D6" stroke="${INK}" stroke-width="3.2"/>
       <ellipse cx="60" cy="70" rx="14" ry="10" fill="#FF8FB1" stroke="${INK}" stroke-width="2.8"/>
       <circle cx="55" cy="70" r="2.6" fill="${INK}"/>
       <circle cx="65" cy="70" r="2.6" fill="${INK}"/>
       <circle cx="45" cy="56" r="4.2" fill="${INK}"/>
       <circle cx="75" cy="56" r="4.2" fill="${INK}"/>
       <circle cx="46.3" cy="54.6" r="1.5" fill="#FFF"/>
       <circle cx="76.3" cy="54.6" r="1.5" fill="#FFF"/>
       <ellipse cx="36" cy="65" rx="4.5" ry="2.6" fill="#FF6B9D" opacity="0.65"/>
       <ellipse cx="84" cy="65" rx="4.5" ry="2.6" fill="#FF6B9D" opacity="0.65"/>`
    ),
    Cow: wrap(
      "#EBFBEE",
      `<ellipse cx="26" cy="48" rx="12" ry="7" transform="rotate(-18 26 48)" fill="#FFF" stroke="${INK}" stroke-width="3"/>
       <ellipse cx="94" cy="48" rx="12" ry="7" transform="rotate(18 94 48)" fill="#FFF" stroke="${INK}" stroke-width="3"/>
       <path d="M40 32 Q36 20 46 24" fill="#FFD32A" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>
       <path d="M80 32 Q84 20 74 24" fill="#FFD32A" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>
       <ellipse cx="60" cy="62" rx="31" ry="29" fill="#FFFFFF" stroke="${INK}" stroke-width="3.2"/>
       <ellipse cx="44" cy="46" rx="11" ry="9" fill="#4A3B52" opacity="0.85"/>
       <ellipse cx="60" cy="76" rx="22" ry="14" fill="#FFC2D6" stroke="${INK}" stroke-width="3"/>
       <circle cx="53" cy="74" r="2.5" fill="${INK}"/><circle cx="67" cy="74" r="2.5" fill="${INK}"/>
       <circle cx="47" cy="56" r="4" fill="${INK}"/><circle cx="73" cy="56" r="4" fill="${INK}"/>
       <circle cx="48.3" cy="54.6" r="1.4" fill="#FFF"/><circle cx="74.3" cy="54.6" r="1.4" fill="#FFF"/>`
    ),
    Elephant: wrap(
      "#EDF2FF",
      `<ellipse cx="26" cy="60" rx="18" ry="24" fill="#91B4FF" stroke="${INK}" stroke-width="3.2"/>
       <ellipse cx="94" cy="60" rx="18" ry="24" fill="#91B4FF" stroke="${INK}" stroke-width="3.2"/>
       <ellipse cx="27" cy="62" rx="10" ry="15" fill="#FFC2D6"/>
       <ellipse cx="93" cy="62" rx="10" ry="15" fill="#FFC2D6"/>
       <circle cx="60" cy="60" r="29" fill="#A5C4FF" stroke="${INK}" stroke-width="3.2"/>
       <path d="M54 66 Q54 94 68 94 Q75 94 74 87 Q73 83 68 85 Q65 86 65 66" fill="#A5C4FF" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>
       <circle cx="48" cy="54" r="4.2" fill="${INK}"/><circle cx="72" cy="54" r="4.2" fill="${INK}"/>
       <circle cx="49.3" cy="52.6" r="1.5" fill="#FFF"/><circle cx="73.3" cy="52.6" r="1.5" fill="#FFF"/>
       <ellipse cx="40" cy="62" rx="4.5" ry="2.6" fill="#FF9EB5" opacity="0.8"/>
       <ellipse cx="80" cy="62" rx="4.5" ry="2.6" fill="#FF9EB5" opacity="0.8"/>`
    ),
    Ant: wrap(
      "#FFF5F5",
      `<path d="M34 40 Q28 24 20 26" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
       <path d="M44 38 Q46 22 54 24" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
       <line x1="48" y1="76" x2="40" y2="94" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
       <line x1="62" y1="78" x2="62" y2="96" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
       <line x1="76" y1="76" x2="86" y2="94" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
       <circle cx="84" cy="66" r="17" fill="#FF6B6B" stroke="${INK}" stroke-width="3.2"/>
       <circle cx="60" cy="66" r="13" fill="#FF8787" stroke="${INK}" stroke-width="3.2"/>
       <circle cx="38" cy="58" r="19" fill="#FF6B6B" stroke="${INK}" stroke-width="3.2"/>
       ${face(38, 57, 7)}`
    ),

    // ================= CLASSROOM =================
    Book: wrap(
      "#EEF5FF",
      `<rect x="24" y="28" width="72" height="68" rx="12" fill="#4D96FF" stroke="${INK}" stroke-width="3.4"/>
       <rect x="34" y="28" width="54" height="68" rx="8" fill="#74B9FF" stroke="${INK}" stroke-width="3.2"/>
       <rect x="36" y="84" width="54" height="12" rx="6" fill="#FFFDF5" stroke="${INK}" stroke-width="3"/>
       <rect x="44" y="42" width="34" height="24" rx="8" fill="#FFF" stroke="${INK}" stroke-width="2.6"/>
       ${face(61, 54, 8)}`
    ),
    Pencil: wrap(
      "#FFF9DB",
      `<g transform="rotate(-35 60 60)">
         <rect x="44" y="24" width="32" height="62" rx="6" fill="#FFD43B" stroke="${INK}" stroke-width="3.2"/>
         <rect x="44" y="16" width="32" height="14" rx="5" fill="#FF8FB1" stroke="${INK}" stroke-width="3.2"/>
         <rect x="44" y="27" width="32" height="7" fill="#DEE2E6" stroke="${INK}" stroke-width="2.6"/>
         <polygon points="44,86 76,86 60,110" fill="#FFE0BD" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
         <polygon points="55,102 65,102 60,110" fill="${INK}"/>
         ${face(60, 56, 8)}
       </g>`
    ),
    Pen: wrap(
      "#EBF5FF",
      `<g transform="rotate(-35 60 60)">
         <rect x="47" y="18" width="26" height="70" rx="12" fill="#4D96FF" stroke="${INK}" stroke-width="3.2"/>
         <rect x="47" y="18" width="26" height="24" rx="10" fill="#3867D6" stroke="${INK}" stroke-width="3.2"/>
         <line x1="76" y1="26" x2="76" y2="48" stroke="#FFD32A" stroke-width="5" stroke-linecap="round"/>
         <polygon points="51,88 69,88 60,108" fill="#E9ECEF" stroke="${INK}" stroke-width="3"/>
         ${face(60, 62, 7)}
       </g>`
    ),
    Ruler: wrap(
      "#FFF4E6",
      `<g transform="rotate(-25 60 60)">
         <rect x="20" y="42" width="80" height="36" rx="9" fill="#FFCA3A" stroke="${INK}" stroke-width="3.2"/>
         <g stroke="${INK}" stroke-width="2.6" stroke-linecap="round">
           <line x1="32" y1="42" x2="32" y2="52"/><line x1="44" y1="42" x2="44" y2="50"/>
           <line x1="56" y1="42" x2="56" y2="52"/><line x1="68" y1="42" x2="68" y2="50"/>
           <line x1="80" y1="42" x2="80" y2="52"/><line x1="90" y1="42" x2="90" y2="50"/>
         </g>
         ${face(60, 64, 10)}
       </g>`
    ),
    Eraser: wrap(
      "#FFF0F6",
      `<g transform="rotate(-14 60 62)">
         <rect x="24" y="38" width="72" height="46" rx="12" fill="#FF85A2" stroke="${INK}" stroke-width="3.4"/>
         <rect x="52" y="38" width="44" height="46" rx="10" fill="#74B9FF" stroke="${INK}" stroke-width="3.4"/>
         ${face(72, 60, 9)}
       </g>`
    ),
    Bag: wrap(
      "#F4EEFF",
      `<path d="M46 32 C46 18 74 18 74 32" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
       <rect x="28" y="32" width="64" height="68" rx="22" fill="#9775FA" stroke="${INK}" stroke-width="3.4"/>
       <rect x="38" y="64" width="44" height="26" rx="10" fill="#FFD32A" stroke="${INK}" stroke-width="3"/>
       ${face(60, 50, 11)}`
    ),
    Chair: wrap(
      "#FFF4E6",
      `<rect x="36" y="22" width="48" height="36" rx="10" fill="#FFAD60" stroke="${INK}" stroke-width="3.2"/>
       <rect x="30" y="62" width="60" height="14" rx="7" fill="#FF922B" stroke="${INK}" stroke-width="3.2"/>
       <line x1="38" y1="76" x2="36" y2="100" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
       <line x1="82" y1="76" x2="84" y2="100" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
       <line x1="42" y1="58" x2="42" y2="62" stroke="${INK}" stroke-width="5"/>
       <line x1="78" y1="58" x2="78" y2="62" stroke="${INK}" stroke-width="5"/>
       ${face(60, 40, 9)}`
    ),
    Table: wrap(
      "#EBFBEE",
      `<rect x="18" y="42" width="84" height="18" rx="9" fill="#D49A6A" stroke="${INK}" stroke-width="3.4"/>
       <rect x="26" y="60" width="10" height="38" rx="5" fill="#B57C4C" stroke="${INK}" stroke-width="3"/>
       <rect x="84" y="60" width="10" height="38" rx="5" fill="#B57C4C" stroke="${INK}" stroke-width="3"/>
       <rect x="36" y="60" width="48" height="16" rx="5" fill="#F2C894" stroke="${INK}" stroke-width="2.8"/>
       ${face(60, 66, 9)}`
    ),

    // ================= BODY =================
    Head: wrap(
      "#FFF0F4",
      `<circle cx="60" cy="64" r="32" fill="#FFE0BD" stroke="${INK}" stroke-width="3.4"/>
       <path d="M28 58 Q30 24 60 26 Q90 24 92 58 Q76 44 60 44 Q44 44 28 58Z" fill="#5D4037" stroke="${INK}" stroke-width="3.2"/>
       <circle cx="28" cy="66" r="7" fill="#FFE0BD" stroke="${INK}" stroke-width="3"/>
       <circle cx="92" cy="66" r="7" fill="#FFE0BD" stroke="${INK}" stroke-width="3"/>
       ${face(60, 66, 12)}`
    ),
    Eye: wrap(
      "#EEF5FF",
      `<ellipse cx="38" cy="60" rx="18" ry="22" fill="#FFF" stroke="${INK}" stroke-width="3.2"/>
       <ellipse cx="82" cy="60" rx="18" ry="22" fill="#FFF" stroke="${INK}" stroke-width="3.2"/>
       <circle cx="40" cy="62" r="11" fill="#4D96FF"/>
       <circle cx="80" cy="62" r="11" fill="#4D96FF"/>
       <circle cx="40" cy="62" r="6" fill="${INK}"/>
       <circle cx="80" cy="62" r="6" fill="${INK}"/>
       <circle cx="43" cy="57" r="3.5" fill="#FFF"/>
       <circle cx="83" cy="57" r="3.5" fill="#FFF"/>
       <path d="M26 36 Q38 28 50 36" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
       <path d="M70 36 Q82 28 94 36" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`
    ),
    Ear: wrap(
      "#FFF4E6",
      `<path d="M46 28 C72 20 88 38 84 62 C82 78 72 94 56 96 C44 97 38 88 42 78" fill="#FFE0BD" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/>
       <path d="M54 42 C68 40 74 52 70 64 C67 72 60 78 54 74" fill="none" stroke="#D99B72" stroke-width="4" stroke-linecap="round"/>
       <path d="M94 48 Q102 58 94 68" fill="none" stroke="#FF9F1A" stroke-width="3.2" stroke-linecap="round"/>
       <path d="M101 42 Q112 58 101 74" fill="none" stroke="#FF9F1A" stroke-width="3.2" stroke-linecap="round"/>`
    ),
    Nose: wrap(
      "#FFF5EB",
      `<circle cx="60" cy="60" r="34" fill="#FFE8CC" stroke="${INK}" stroke-width="3"/>
       <path d="M60 36 L60 66 C60 76 74 78 74 68 C74 62 68 60 64 62" fill="#FFD1A9" stroke="${INK}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
       <ellipse cx="42" cy="70" rx="7" ry="4" fill="#FF9EB5" opacity="0.65"/>
       <ellipse cx="80" cy="70" rx="7" ry="4" fill="#FF9EB5" opacity="0.65"/>`
    ),
    Mouth: wrap(
      "#FFF0F6",
      `<path d="M24 54 Q60 44 96 54 Q94 94 60 94 Q26 94 24 54 Z" fill="#FF6B9D" stroke="${INK}" stroke-width="3.6" stroke-linejoin="round"/>
       <path d="M34 56 Q60 52 86 56 L83 66 Q60 69 37 66 Z" fill="#FFFFFF" stroke="${INK}" stroke-width="2.5"/>
       <path d="M44 88 Q60 74 76 88 Q60 94 44 88 Z" fill="#FF9EB5"/>`
    ),
    Hand: wrap(
      "#EBFBEE",
      `<rect x="44" y="20" width="10" height="36" rx="5" fill="#FFE0BD" stroke="${INK}" stroke-width="3"/>
       <rect x="55" y="16" width="10" height="38" rx="5" fill="#FFE0BD" stroke="${INK}" stroke-width="3"/>
       <rect x="66" y="20" width="10" height="36" rx="5" fill="#FFE0BD" stroke="${INK}" stroke-width="3"/>
       <rect x="76" y="28" width="9" height="30" rx="4.5" fill="#FFE0BD" stroke="${INK}" stroke-width="3"/>
       <rect x="28" y="48" width="18" height="11" rx="5.5" transform="rotate(-35 28 48)" fill="#FFE0BD" stroke="${INK}" stroke-width="3"/>
       <rect x="38" y="46" width="46" height="44" rx="18" fill="#FFE0BD" stroke="${INK}" stroke-width="3.2"/>
       ${face(61, 69, 9)}`
    ),
    Foot: wrap(
      "#FFF9DB",
      `<path d="M40 34 C40 24 68 24 72 44 C76 62 70 96 52 98 C34 99 30 84 36 68 C40 58 40 44 40 34 Z"
             fill="#FFE0BD" stroke="${INK}" stroke-width="3.4"/>
       <circle cx="38" cy="24" r="6" fill="#FFE0BD" stroke="${INK}" stroke-width="2.8"/>
       <circle cx="50" cy="20" r="5" fill="#FFE0BD" stroke="${INK}" stroke-width="2.8"/>
       <circle cx="60" cy="22" r="4.5" fill="#FFE0BD" stroke="${INK}" stroke-width="2.8"/>
       <circle cx="69" cy="26" r="4" fill="#FFE0BD" stroke="${INK}" stroke-width="2.8"/>
       <circle cx="76" cy="33" r="3.6" fill="#FFE0BD" stroke="${INK}" stroke-width="2.8"/>
       ${face(54, 68, 7)}`
    ),
    Hair: wrap(
      "#F4EEFF",
      `<circle cx="30" cy="52" r="15" fill="#5D4037" stroke="${INK}" stroke-width="3"/>
       <circle cx="90" cy="52" r="15" fill="#5D4037" stroke="${INK}" stroke-width="3"/>
       <circle cx="60" cy="54" r="30" fill="#5D4037" stroke="${INK}" stroke-width="3.2"/>
       <circle cx="60" cy="70" r="24" fill="#FFE0BD" stroke="${INK}" stroke-width="3.2"/>
       <path d="M36 64 Q48 48 60 54 Q72 48 84 64 Q74 42 60 42 Q46 42 36 64 Z" fill="#5D4037" stroke="${INK}" stroke-width="2.8"/>
       <circle cx="34" cy="44" r="6" fill="#FF7EA5" stroke="${INK}" stroke-width="2.4"/>
       <circle cx="86" cy="44" r="6" fill="#FF7EA5" stroke="${INK}" stroke-width="2.4"/>
       ${face(60, 72, 9)}`
    ),

    // ================= EXTRA ABC WORDS =================
    Apple: wrap(
      "#FFF0F0",
      `<path d="M60 30 Q62 16 70 14" fill="none" stroke="#8D5524" stroke-width="4" stroke-linecap="round"/>
       <ellipse cx="74" cy="24" rx="11" ry="6" transform="rotate(-24 74 24)" fill="#51CF66" stroke="${INK}" stroke-width="2.8"/>
       <path d="M60 36 C44 26 24 38 26 64 C28 88 46 98 60 94 C74 98 92 88 94 64 C96 38 76 26 60 36 Z"
             fill="#FF595E" stroke="${INK}" stroke-width="3.4"/>
       <ellipse cx="42" cy="50" rx="5" ry="9" transform="rotate(-20 42 50)" fill="#FFF" opacity="0.4"/>
       ${face(60, 64, 12)}`
    ),
    Ball: wrap(
      "#EEF5FF",
      `<circle cx="60" cy="60" r="36" fill="#FFFFFF" stroke="${INK}" stroke-width="3.4"/>
       <path d="M60 24 A36 36 0 0 1 94 48 L60 60 Z" fill="#FF6B6B" stroke="${INK}" stroke-width="2.8"/>
       <path d="M60 96 A36 36 0 0 1 26 72 L60 60 Z" fill="#4D96FF" stroke="${INK}" stroke-width="2.8"/>
       <path d="M26 48 A36 36 0 0 1 60 24 L60 60 Z" fill="#FFD32A" stroke="${INK}" stroke-width="2.8"/>
       <circle cx="60" cy="60" r="14" fill="#FFF" stroke="${INK}" stroke-width="3"/>
       ${face(60, 60, 5)}`
    ),
    Egg: wrap(
      "#FFF9DB",
      `<path d="M60 20 C79 20 90 50 90 70 C90 89 77 100 60 100 C43 100 30 89 30 70 C30 50 41 20 60 20 Z"
             fill="#FFF8EB" stroke="${INK}" stroke-width="3.4"/>
       <ellipse cx="46" cy="46" rx="5" ry="10" transform="rotate(-15 46 46)" fill="#FFF"/>
       ${face(60, 66, 11)}`
    ),
    Goat: wrap(
      "#EBFBEE",
      `<path d="M44 36 Q38 18 48 20" fill="#D49A6A" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
       <path d="M76 36 Q82 18 72 20" fill="#D49A6A" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
       <ellipse cx="28" cy="52" rx="11" ry="6" transform="rotate(-18 28 52)" fill="#F1F3F5" stroke="${INK}" stroke-width="3"/>
       <ellipse cx="92" cy="52" rx="11" ry="6" transform="rotate(18 92 52)" fill="#F1F3F5" stroke="${INK}" stroke-width="3"/>
       <ellipse cx="60" cy="64" rx="28" ry="27" fill="#FFFFFF" stroke="${INK}" stroke-width="3.2"/>
       <polygon points="54,90 66,90 60,104" fill="#E9ECEF" stroke="${INK}" stroke-width="2.8" stroke-linejoin="round"/>
       ${face(60, 64, 11)}`
    ),
    Hat: wrap(
      "#FFF0F6",
      `<ellipse cx="60" cy="80" rx="44" ry="14" fill="#FFCA3A" stroke="${INK}" stroke-width="3.2"/>
       <path d="M32 76 C32 42 44 30 60 30 C76 30 88 42 88 76 Z" fill="#FFD43B" stroke="${INK}" stroke-width="3.2"/>
       <rect x="33" y="64" width="54" height="11" rx="5" fill="#FF7EA5" stroke="${INK}" stroke-width="2.8"/>
       ${face(60, 52, 9)}`
    ),
    Igloo: wrap(
      "#E6F7FF",
      `<path d="M20 88 C20 44 38 30 60 30 C82 30 100 44 100 88 Z" fill="#D0EBFF" stroke="${INK}" stroke-width="3.4"/>
       <path d="M26 62 H94 M36 46 H84" stroke="#74C0FC" stroke-width="2.5"/>
       <path d="M46 88 V66 C46 56 74 56 74 66 V88 Z" fill="#4D96FF" stroke="${INK}" stroke-width="3.2"/>`
    ),
    Jam: wrap(
      "#FFF0F3",
      `<rect x="32" y="38" width="56" height="58" rx="14" fill="#FF6B81" stroke="${INK}" stroke-width="3.4"/>
       <rect x="28" y="24" width="64" height="16" rx="7" fill="#FFD43B" stroke="${INK}" stroke-width="3.2"/>
       <rect x="40" y="52" width="40" height="28" rx="8" fill="#FFFDF5" stroke="${INK}" stroke-width="2.6"/>
       ${face(60, 65, 8)}`
    ),
    Kite: wrap(
      "#EEF5FF",
      `<path d="M60 88 Q74 96 64 108" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
       <polygon points="60,18 92,54 60,90 28,54" fill="#FF78B4" stroke="${INK}" stroke-width="3.4" stroke-linejoin="round"/>
       <polygon points="60,18 92,54 60,54" fill="#FFD32A"/>
       <polygon points="60,54 28,54 60,90" fill="#74B9FF"/>
       <polygon points="60,18 92,54 60,90 28,54" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linejoin="round"/>
       ${face(60, 54, 8)}`
    ),
    Lion: wrap(
      "#FFF4E6",
      `<g fill="#FF922B" stroke="${INK}" stroke-width="2.8">
         <circle cx="60" cy="24" r="12"/><circle cx="84" cy="34" r="12"/><circle cx="94" cy="60" r="12"/>
         <circle cx="84" cy="86" r="12"/><circle cx="60" cy="96" r="12"/><circle cx="36" cy="86" r="12"/>
         <circle cx="26" cy="60" r="12"/><circle cx="36" cy="34" r="12"/>
       </g>
       <circle cx="60" cy="60" r="28" fill="#FFD43B" stroke="${INK}" stroke-width="3.2"/>
       ${face(60, 60, 11)}
       <polygon points="56,64 64,64 60,69" fill="#B5542D"/>`
    ),
    Monkey: wrap(
      "#FFF4E6",
      `<circle cx="26" cy="60" r="13" fill="#B57C4C" stroke="${INK}" stroke-width="3"/>
       <circle cx="94" cy="60" r="13" fill="#B57C4C" stroke="${INK}" stroke-width="3"/>
       <circle cx="26" cy="60" r="7" fill="#FFE0BD"/>
       <circle cx="94" cy="60" r="7" fill="#FFE0BD"/>
       <circle cx="60" cy="60" r="30" fill="#B57C4C" stroke="${INK}" stroke-width="3.2"/>
       <circle cx="49" cy="54" r="14" fill="#FFE0BD"/>
       <circle cx="71" cy="54" r="14" fill="#FFE0BD"/>
       <ellipse cx="60" cy="70" rx="22" ry="16" fill="#FFE0BD"/>
       ${face(60, 62, 11)}`
    ),
    Nest: wrap(
      "#EBFBEE",
      `<ellipse cx="46" cy="56" rx="11" ry="14" fill="#A5D8FF" stroke="${INK}" stroke-width="3"/>
       <ellipse cx="62" cy="52" rx="11" ry="14" fill="#FFE066" stroke="${INK}" stroke-width="3"/>
       <ellipse cx="76" cy="56" rx="11" ry="14" fill="#FFC2D6" stroke="${INK}" stroke-width="3"/>
       <path d="M22 62 C22 92 98 92 98 62 Z" fill="#C68B59" stroke="${INK}" stroke-width="3.4"/>
       <path d="M30 72 Q60 80 90 72 M36 82 Q60 88 84 82" fill="none" stroke="#8D5524" stroke-width="3" stroke-linecap="round"/>`
    ),
    Queen: wrap(
      "#FFF9DB",
      `<polygon points="24,84 20,40 42,58 60,28 78,58 100,40 96,84" fill="#FFD32A" stroke="${INK}" stroke-width="3.4" stroke-linejoin="round"/>
       <circle cx="20" cy="36" r="5" fill="#FF6B9D" stroke="${INK}" stroke-width="2.4"/>
       <circle cx="60" cy="24" r="6" fill="#74B9FF" stroke="${INK}" stroke-width="2.4"/>
       <circle cx="100" cy="36" r="5" fill="#FF6B9D" stroke="${INK}" stroke-width="2.4"/>
       <rect x="24" y="80" width="72" height="12" rx="6" fill="#FFA502" stroke="${INK}" stroke-width="3"/>
       ${face(60, 66, 10)}`
    ),
    Sun: wrap(
      "#FFF9DB",
      `<g stroke="#FF9F1A" stroke-width="5" stroke-linecap="round">
         <line x1="60" y1="12" x2="60" y2="24"/><line x1="60" y1="96" x2="60" y2="108"/>
         <line x1="12" y1="60" x2="24" y2="60"/><line x1="96" y1="60" x2="108" y2="60"/>
         <line x1="26" y1="26" x2="34" y2="34"/><line x1="86" y1="86" x2="94" y2="94"/>
         <line x1="94" y1="26" x2="86" y2="34"/><line x1="34" y1="86" x2="26" y2="94"/>
       </g>
       <circle cx="60" cy="60" r="28" fill="#FFD32A" stroke="${INK}" stroke-width="3.4"/>
       ${face(60, 60, 10)}`
    ),
    Tiger: wrap(
      "#FFF4E6",
      `<circle cx="34" cy="34" r="11" fill="#FF922B" stroke="${INK}" stroke-width="3"/>
       <circle cx="86" cy="34" r="11" fill="#FF922B" stroke="${INK}" stroke-width="3"/>
       <ellipse cx="60" cy="64" rx="33" ry="30" fill="#FFA94D" stroke="${INK}" stroke-width="3.2"/>
       <path d="M54 35 L54 45 M60 34 L60 47 M66 35 L66 45" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
       <path d="M28 58 L38 60 M28 68 L38 68 M92 58 L82 60 M92 68 L82 68" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>
       <ellipse cx="60" cy="74" rx="14" ry="10" fill="#FFF4E6"/>
       ${face(60, 64, 12)}`
    ),
    Umbrella: wrap(
      "#EEF5FF",
      `<path d="M60 64 V92 C60 100 50 100 50 93" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
       <path d="M20 64 C20 32 100 32 100 64 Q87 56 74 64 Q60 56 46 64 Q33 56 20 64 Z"
             fill="#FF78B4" stroke="${INK}" stroke-width="3.4" stroke-linejoin="round"/>
       <path d="M60 34 V62" stroke="#FFF" stroke-width="2.5" opacity="0.6"/>
       ${face(60, 50, 10)}`
    ),
    Van: wrap(
      "#EBFBEE",
      `<rect x="18" y="42" width="84" height="44" rx="14" fill="#69DB7C" stroke="${INK}" stroke-width="3.4"/>
       <rect x="26" y="50" width="22" height="16" rx="5" fill="#D0EBFF" stroke="${INK}" stroke-width="2.8"/>
       <rect x="54" y="50" width="38" height="16" rx="5" fill="#D0EBFF" stroke="${INK}" stroke-width="2.8"/>
       <circle cx="36" cy="88" r="11" fill="#495057" stroke="${INK}" stroke-width="3"/>
       <circle cx="36" cy="88" r="4.5" fill="#FFF"/>
       <circle cx="84" cy="88" r="11" fill="#495057" stroke="${INK}" stroke-width="3"/>
       <circle cx="84" cy="88" r="4.5" fill="#FFF"/>
       <circle cx="96" cy="74" r="4" fill="#FFD43B"/>`
    ),
    Whale: wrap(
      "#E3FAFC",
      `<path d="M56 34 Q52 20 44 22 M58 34 Q62 20 70 22" fill="none" stroke="#4D96FF" stroke-width="3.5" stroke-linecap="round"/>
       <path d="M22 68 C22 44 46 38 66 44 C80 48 86 58 92 58 C98 58 102 48 106 46 C104 58 98 66 94 70 C98 76 102 80 100 84 C88 82 82 78 74 84 C54 94 22 90 22 68 Z"
             fill="#74C0FC" stroke="${INK}" stroke-width="3.4" stroke-linejoin="round"/>
       ${face(48, 66, 10)}`
    ),
    Xylophone: wrap(
      "#FFF0F6",
      `<rect x="20" y="34" width="14" height="58" rx="7" fill="#FF6B6B" stroke="${INK}" stroke-width="3"/>
       <rect x="38" y="38" width="14" height="50" rx="7" fill="#FFA94D" stroke="${INK}" stroke-width="3"/>
       <rect x="56" y="42" width="14" height="42" rx="7" fill="#FFD43B" stroke="${INK}" stroke-width="3"/>
       <rect x="74" y="46" width="14" height="34" rx="7" fill="#69DB7C" stroke="${INK}" stroke-width="3"/>
       <rect x="92" y="50" width="12" height="26" rx="6" fill="#74C0FC" stroke="${INK}" stroke-width="3"/>`
    ),
    "Yo-yo": wrap(
      "#EBFBEE",
      `<path d="M60 14 V34" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
       <circle cx="60" cy="66" r="32" fill="#FF6B9D" stroke="${INK}" stroke-width="3.4"/>
       <circle cx="60" cy="66" r="22" fill="#FFD43B" stroke="${INK}" stroke-width="2.8"/>
       ${face(60, 66, 8)}`
    ),
    Zebra: wrap(
      "#F1F3F5",
      `<ellipse cx="34" cy="36" rx="9" ry="14" transform="rotate(-16 34 36)" fill="#FFF" stroke="${INK}" stroke-width="3"/>
       <ellipse cx="86" cy="36" rx="9" ry="14" transform="rotate(16 86 36)" fill="#FFF" stroke="${INK}" stroke-width="3"/>
       <ellipse cx="60" cy="64" rx="31" ry="30" fill="#FFFFFF" stroke="${INK}" stroke-width="3.2"/>
       <path d="M52 35 L56 46 M60 34 L60 47 M68 35 L64 46" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
       <path d="M30 56 L42 60 M90 56 L78 60" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
       <ellipse cx="60" cy="78" rx="16" ry="11" fill="#ADB5BD" stroke="${INK}" stroke-width="2.8"/>
       ${face(60, 62, 12)}`
    ),
    OrangeFruit: wrap(
      "#FFF4E6",
      `<ellipse cx="68" cy="24" rx="10" ry="5.5" transform="rotate(-24 68 24)" fill="#51CF66" stroke="${INK}" stroke-width="2.6"/>
       <circle cx="60" cy="64" r="33" fill="#FF922B" stroke="${INK}" stroke-width="3.4"/>
       <ellipse cx="44" cy="48" rx="5" ry="9" transform="rotate(-22 44 48)" fill="#FFF" opacity="0.38"/>
       ${face(60, 65, 11)}`
    )
  };

  window.ENG_ILLUSTRATIONS = {
    getWordSvg(word, context = "") {
      if (context === "abc" && word === "Orange") {
        return ART.OrangeFruit;
      }
      return ART[word] || null;
    }
  };
})();
