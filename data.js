// ข้อมูลบทเรียนภาษาอังกฤษ ชั้นประถมศึกษาปีที่ 1 (หลักสูตรแกนกลาง)
window.ENG_DATA = {
  alphabet: [
    { letter: "A", lower: "a", phonics: "แอะ (a)", word: "Apple", reading: "แอป-เปิ้ล", thai: "แอปเปิ้ล", emoji: "🍎", color: "#FF6B6B" },
    { letter: "B", lower: "b", phonics: "เบอะ (b)", word: "Ball", reading: "บอล", thai: "ลูกบอล", emoji: "⚽", color: "#4D96FF" },
    { letter: "C", lower: "c", phonics: "เคอะ (c)", word: "Cat", reading: "แคท", thai: "แมว", emoji: "🐱", color: "#FF9F43" },
    { letter: "D", lower: "d", phonics: "เดอะ (d)", word: "Dog", reading: "ด็อก", thai: "สุนัข", emoji: "🐶", color: "#A29BFE" },
    { letter: "E", lower: "e", phonics: "เอะ (e)", word: "Egg", reading: "เอ็ก", thai: "ไข่", emoji: "🥚", color: "#FDCB6E" },
    { letter: "F", lower: "f", phonics: "เฟอะ (f)", word: "Fish", reading: "ฟิช", thai: "ปลา", emoji: "🐟", color: "#00CEC9" },
    { letter: "G", lower: "g", phonics: "เกอะ (g)", word: "Goat", reading: "โกท", thai: "แพะ", emoji: "🐐", color: "#55EFC4" },
    { letter: "H", lower: "h", phonics: "เฮอะ (h)", word: "Hat", reading: "แฮท", thai: "หมวก", emoji: "👒", color: "#FD79A8" },
    { letter: "I", lower: "i", phonics: "อิ (i)", word: "Igloo", reading: "อิก-ลู", thai: "บ้านน้ำแข็ง", emoji: "🧊", color: "#74B9FF" },
    { letter: "J", lower: "j", phonics: "เจอะ (j)", word: "Jam", reading: "แจม", thai: "แยมผลไม้", emoji: "🍓", color: "#FF7675" },
    { letter: "K", lower: "k", phonics: "เคอะ (k)", word: "Kite", reading: "ไคท์", thai: "ว่าว", emoji: "🪁", color: "#6C5CE7" },
    { letter: "L", lower: "l", phonics: "เลอะ (l)", word: "Lion", reading: "ไล-ออน", thai: "สิงโต", emoji: "🦁", color: "#F39C12" },
    { letter: "M", lower: "m", phonics: "เมอะ (m)", word: "Monkey", reading: "มัง-กี้", thai: "ลิง", emoji: "🐵", color: "#E17055" },
    { letter: "N", lower: "n", phonics: "เนอะ (n)", word: "Nest", reading: "เนสท์", thai: "รังนก", emoji: "🪺", color: "#00B894" },
    { letter: "O", lower: "o", phonics: "เอาะ (o)", word: "Orange", reading: "ออ-เรนจ์", thai: "ส้ม", emoji: "🍊", color: "#FF9F1A" },
    { letter: "P", lower: "p", phonics: "เพอะ (p)", word: "Pig", reading: "พิก", thai: "หมู", emoji: "🐷", color: "#FF85A2" },
    { letter: "Q", lower: "q", phonics: "เควอะ (q)", word: "Queen", reading: "ควีน", thai: "พระราชินี", emoji: "👑", color: "#F1C40F" },
    { letter: "R", lower: "r", phonics: "เรอะ (r)", word: "Rabbit", reading: "แรบ-บิท", thai: "กระต่าย", emoji: "🐰", color: "#A29BFE" },
    { letter: "S", lower: "s", phonics: "เซอะ (s)", word: "Sun", reading: "ซัน", thai: "พระอาทิตย์", emoji: "☀️", color: "#FFA502" },
    { letter: "T", lower: "t", phonics: "เทอะ (t)", word: "Tiger", reading: "ไท-เกอร์", thai: "เสือ", emoji: "🐯", color: "#FF6348" },
    { letter: "U", lower: "u", phonics: "อะ (u)", word: "Umbrella", reading: "อัม-เบรล-ลา", thai: "ร่ม", emoji: "☂️", color: "#70A1FF" },
    { letter: "V", lower: "v", phonics: "เวอะ (v)", word: "Van", reading: "แวน", thai: "รถตู้", emoji: "🚐", color: "#2ED573" },
    { letter: "W", lower: "w", phonics: "เวอะ (w)", word: "Whale", reading: "เวล", thai: "วาฬ", emoji: "🐳", color: "#1E90FF" },
    { letter: "X", lower: "x", phonics: "คซึ (x)", word: "Xylophone", reading: "ไซ-โล-โฟน", thai: "ระนาดฝรั่ง", emoji: "🎼", color: "#E84393" },
    { letter: "Y", lower: "y", phonics: "เยอะ (y)", word: "Yo-yo", reading: "โย่-โย่", thai: "ลูกดิ่งโยโย่", emoji: "🪀", color: "#26DE81" },
    { letter: "Z", lower: "z", phonics: "เซอะ (z)", word: "Zebra", reading: "ซี-บรา", thai: "ม้าลาย", emoji: "🦓", color: "#576574" }
  ],

  units: [
    {
      id: "greetings",
      number: 1,
      titleEn: "Hello! Greetings",
      titleTh: "การทักทายและแนะนำตัว",
      icon: "👋",
      image: "images/unit-greetings.jpg",
      themeColor: "#FF6B6B",
      bgSoft: "#FFF0F0",
      description: "ฝึกทักทาย สวัสดี ขอบคุณ และแนะนำชื่อตัวเองเป็นภาษาอังกฤษ",
      words: [
        { word: "Hello", reading: "เฮล-โล", thai: "สวัสดี", emoji: "👋", sentence: "Hello! Nice to meet you.", sentenceTh: "สวัสดี! ยินดีที่ได้รู้จักนะ" },
        { word: "Good morning", reading: "กู๊ด มอร์-นิ่ง", thai: "สวัสดีตอนเช้า", emoji: "🌅", sentence: "Good morning, teacher!", sentenceTh: "สวัสดีตอนเช้าครับ/ค่ะ คุณครู!" },
        { word: "Good afternoon", reading: "กู๊ด อาฟ-เทอร์-นูน", thai: "สวัสดีตอนบ่าย", emoji: "☀️", sentence: "Good afternoon, friends!", sentenceTh: "สวัสดีตอนบ่าย เพื่อนๆ!" },
        { word: "Good night", reading: "กู๊ด ไนท์", thai: "ราตรีสวัสดิ์", emoji: "🌙", sentence: "Good night, Mom and Dad.", sentenceTh: "ราตรีสวัสดิ์ครับ/ค่ะ คุณพ่อคุณแม่" },
        { word: "Goodbye", reading: "กู๊ด-บาย", thai: "ลาก่อน", emoji: "🎒", sentence: "Goodbye! See you tomorrow.", sentenceTh: "ลาก่อน! แล้วพบกันใหม่พรุ่งนี้นะ" },
        { word: "Thank you", reading: "แธงค์-กิ้ว", thai: "ขอบคุณ", emoji: "🙏", sentence: "Thank you very much!", sentenceTh: "ขอบคุณมากครับ/ค่ะ!" },
        { word: "Sorry", reading: "ซอ-รี่", thai: "ขอโทษ", emoji: "🥺", sentence: "I am sorry.", sentenceTh: "หนู/ผมขอโทษครับ/ค่ะ" },
        { word: "Friend", reading: "เฟรนด์", thai: "เพื่อน", emoji: "🧑‍🤝‍🧑", sentence: "You are my good friend.", sentenceTh: "เธอเป็นเพื่อนที่ดีของฉัน" }
      ],
      dialogues: [
        { speaker: "น้องมะลิ", avatar: "👧", side: "left", en: "Hello! My name is Mali. What is your name?", th: "สวัสดี! ฉันชื่อมะลิ เธอชื่ออะไรเหรอ?" },
        { speaker: "น้องต้นกล้า", avatar: "👦", side: "right", en: "Hi, Mali! My name is Tonkla.", th: "สวัสดีมะลิ! ผมชื่อต้นกล้าครับ" },
        { speaker: "น้องมะลิ", avatar: "👧", side: "left", en: "How are you today?", th: "วันนี้เธอสบายดีไหม?" },
        { speaker: "น้องต้นกล้า", avatar: "👦", side: "right", en: "I am fine, thank you! And you?", th: "ผมสบายดี ขอบคุณครับ! แล้วเธอล่ะ?" },
        { speaker: "น้องมะลิ", avatar: "👧", side: "left", en: "I am happy! Let's play together!", th: "ฉันมีความสุขมาก! มาเล่นด้วยกันเถอะ!" }
      ]
    },
    {
      id: "numbers",
      number: 2,
      titleEn: "Numbers 1–10",
      titleTh: "ตัวเลข 1 ถึง 10",
      icon: "🔢",
      image: "images/unit-numbers.jpg",
      themeColor: "#4D96FF",
      bgSoft: "#EEF5FF",
      description: "ฝึกนับเลข 1 ถึง 10 พร้อมภาพประกอบให้น้องๆ ช่วยกันนับ",
      words: [
        { word: "One", reading: "วัน", thai: "หนึ่ง (1)", emoji: "1️⃣", countEmoji: "🍎", count: 1, sentence: "I have one apple.", sentenceTh: "ฉันมีแอปเปิ้ล 1 ลูก" },
        { word: "Two", reading: "ทู", thai: "สอง (2)", emoji: "2️⃣", countEmoji: "🐥", count: 2, sentence: "Two little ducks.", sentenceTh: "เป็ดน้อย 2 ตัว" },
        { word: "Three", reading: "ทรี", thai: "สาม (3)", emoji: "3️⃣", countEmoji: "🎈", count: 3, sentence: "Three red balloons.", sentenceTh: "ลูกโป่งสีแดง 3 ลูก" },
        { word: "Four", reading: "โฟร์", thai: "สี่ (4)", emoji: "4️⃣", countEmoji: "🦋", count: 4, sentence: "Four cute butterflies.", sentenceTh: "ผีเสื้อน่ารัก 4 ตัว" },
        { word: "Five", reading: "ไฟว์", thai: "ห้า (5)", emoji: "5️⃣", countEmoji: "⭐", count: 5, sentence: "Five shiny stars.", sentenceTh: "ดาวส่องแสง 5 ดวง" },
        { word: "Six", reading: "ซิกซ์", thai: "หก (6)", emoji: "6️⃣", countEmoji: "🍓", count: 6, sentence: "Six sweet strawberries.", sentenceTh: "สตรอว์เบอร์รีหวาน 6 ลูก" },
        { word: "Seven", reading: "เซ-เว่น", thai: "เจ็ด (7)", emoji: "7️⃣", countEmoji: "🌈", count: 7, sentence: "Seven colors in a rainbow.", sentenceTh: "สายรุ้งมี 7 สี" },
        { word: "Eight", reading: "เอท", thai: "แปด (8)", emoji: "8️⃣", countEmoji: "🐟", count: 8, sentence: "Eight happy fish.", sentenceTh: "ปลาแสนสุข 8 ตัว" },
        { word: "Nine", reading: "ไนน์", thai: "เก้า (9)", emoji: "9️⃣", countEmoji: "🌸", count: 9, sentence: "Nine pink flowers.", sentenceTh: "ดอกไม้สีชมพู 9 ดอก" },
        { word: "Ten", reading: "เท็น", thai: "สิบ (10)", emoji: "🔟", countEmoji: "✏️", count: 10, sentence: "I can count to ten!", sentenceTh: "ฉันนับเลขถึงสิบได้แล้ว!" }
      ],
      dialogues: [
        { speaker: "คุณครู", avatar: "👩‍🏫", side: "left", en: "How old are you?", th: "หนูอายุเท่าไรแล้วคะ?" },
        { speaker: "น้องปันปัน", avatar: "🧒", side: "right", en: "I am seven years old!", th: "หนูอายุ 7 ขวบครับ/ค่ะ!" },
        { speaker: "คุณครู", avatar: "👩‍🏫", side: "left", en: "How many pencils do you have?", th: "หนูมีดินสอกี่แท่งคะ?" },
        { speaker: "น้องปันปัน", avatar: "🧒", side: "right", en: "I have three pencils!", th: "หนูมีดินสอ 3 แท่งครับ/ค่ะ!" }
      ]
    },
    {
      id: "colors",
      number: 3,
      titleEn: "Rainbow Colors",
      titleTh: "สีสันสดใส",
      icon: "🎨",
      image: "images/unit-colors.jpg",
      themeColor: "#FF9F1A",
      bgSoft: "#FFF6E6",
      description: "รู้จักคำศัพท์สีต่างๆ รอบตัวเรา พร้อมฝึกบอกสีของสิ่งของ",
      words: [
        { word: "Red", reading: "เรด", thai: "สีแดง", emoji: "🔴", swatch: "#FF4757", sentence: "The apple is red.", sentenceTh: "แอปเปิ้ลมีสีแดง" },
        { word: "Blue", reading: "บลู", thai: "สีฟ้า / สีน้ำเงิน", emoji: "🔵", swatch: "#1E90FF", sentence: "The sky is blue.", sentenceTh: "ท้องฟ้ามีสีฟ้า" },
        { word: "Yellow", reading: "เยล-โล", thai: "สีเหลือง", emoji: "🟡", swatch: "#FFD32A", sentence: "The banana is yellow.", sentenceTh: "กล้วยมีสีเหลือง" },
        { word: "Green", reading: "กรีน", thai: "สีเขียว", emoji: "🟢", swatch: "#2ED573", sentence: "The frog is green.", sentenceTh: "กบมีสีเขียว" },
        { word: "Orange", reading: "ออ-เรนจ์", thai: "สีส้ม", emoji: "🟠", swatch: "#FF7F50", sentence: "The carrot is orange.", sentenceTh: "แคร์รอตมีสีส้ม" },
        { word: "Pink", reading: "พิงก์", thai: "สีชมพู", emoji: "🩷", swatch: "#FF6B9D", sentence: "I like pink flowers.", sentenceTh: "ฉันชอบดอกไม้สีชมพู" },
        { word: "Purple", reading: "เพอร์-เพิล", thai: "สีม่วง", emoji: "🟣", swatch: "#9B59B6", sentence: "Grapes are purple.", sentenceTh: "องุ่นมีสีม่วง" },
        { word: "Black", reading: "แบล็ก", thai: "สีดำ", emoji: "⚫", swatch: "#2F3542", sentence: "It is a black cat.", sentenceTh: "มันคือแมวสีดำ" },
        { word: "White", reading: "ไวท์", thai: "สีขาว", emoji: "⚪", swatch: "#F1F2F6", borderSwatch: "#CBD5E1", sentence: "The rabbit is white.", sentenceTh: "กระต่ายมีสีขาว" },
        { word: "Brown", reading: "บราวน์", thai: "สีน้ำตาล", emoji: "🟤", swatch: "#A0522D", sentence: "The teddy bear is brown.", sentenceTh: "ตุ๊กตาหมีมีสีน้ำตาล" }
      ],
      dialogues: [
        { speaker: "น้องบีม", avatar: "👧", side: "left", en: "What color is it?", th: "นี่คือสีอะไรเหรอ?" },
        { speaker: "น้องพีท", avatar: "👦", side: "right", en: "It is blue! Blue is my favorite color.", th: "มันคือสีฟ้า! สีฟ้าเป็นสีโปรดของผมเลย" },
        { speaker: "น้องบีม", avatar: "👧", side: "left", en: "I like pink and yellow!", th: "ฉันชอบสีชมพูและสีเหลือง!" }
      ]
    },
    {
      id: "animals",
      number: 4,
      titleEn: "Cute Animals",
      titleTh: "สัตว์น่ารักรอบตัว",
      icon: "🦁",
      image: "images/unit-animals.jpg",
      themeColor: "#20BF6B",
      bgSoft: "#E9FBF1",
      description: "เรียนรู้ชื่อสัตว์น่ารัก ทั้งสัตว์เลี้ยงและสัตว์ป่า พร้อมเสียงอ่านชัดเจน",
      words: [
        { word: "Cat", reading: "แคท", thai: "แมว", emoji: "🐱", sentence: "This is a cute cat.", sentenceTh: "นี่คือแมวน่ารักหนึ่งตัว" },
        { word: "Dog", reading: "ด็อก", thai: "สุนัข", emoji: "🐶", sentence: "I have a brown dog.", sentenceTh: "ฉันมีสุนัขสีน้ำตาล" },
        { word: "Bird", reading: "เบิร์ด", thai: "นก", emoji: "🐦", sentence: "A bird can fly.", sentenceTh: "นกสามารถบินได้" },
        { word: "Fish", reading: "ฟิช", thai: "ปลา", emoji: "🐠", sentence: "A fish can swim.", sentenceTh: "ปลาสามารถว่ายน้ำได้" },
        { word: "Duck", reading: "ดั๊ก", thai: "เป็ด", emoji: "🦆", sentence: "The yellow duck says quack!", sentenceTh: "เป็ดสีเหลืองร้องก้าบๆ!" },
        { word: "Rabbit", reading: "แรบ-บิท", thai: "กระต่าย", emoji: "🐰", sentence: "The rabbit can jump.", sentenceTh: "กระต่ายสามารถกระโดดได้" },
        { word: "Pig", reading: "พิก", thai: "หมู", emoji: "🐷", sentence: "It is a pink pig.", sentenceTh: "มันคือหมูสีชมพู" },
        { word: "Cow", reading: "คาว", thai: "วัว", emoji: "🐮", sentence: "A cow gives us milk.", sentenceTh: "วัวให้นมแก่เรา" },
        { word: "Elephant", reading: "เอ-เลอะ-แฟนท์", thai: "ช้าง", emoji: "🐘", sentence: "The elephant is very big!", sentenceTh: "ช้างตัวใหญ่มาก!" },
        { word: "Ant", reading: "แอนท์", thai: "มด", emoji: "🐜", sentence: "The ant is very small.", sentenceTh: "มดตัวเล็กมาก" }
      ],
      dialogues: [
        { speaker: "น้องอิง", avatar: "👧", side: "left", en: "What is this?", th: "นี่คือตัวอะไรเหรอ?" },
        { speaker: "น้องปาล์ม", avatar: "👦", side: "right", en: "It is a rabbit! It has long ears.", th: "มันคือกระต่าย! มันมีหูยาวด้วยนะ" },
        { speaker: "น้องอิง", avatar: "👧", side: "left", en: "Do you like cats?", th: "เธอชอบแมวไหม?" },
        { speaker: "น้องปาล์ม", avatar: "👦", side: "right", en: "Yes, I do! Cats are so cute.", th: "ชอบสิ! แมวน่ารักมากเลย" }
      ]
    },
    {
      id: "classroom",
      number: 5,
      titleEn: "My Classroom",
      titleTh: "ห้องเรียนของฉัน",
      icon: "🎒",
      image: "images/unit-classroom.jpg",
      themeColor: "#8854D0",
      bgSoft: "#F4EEFF",
      description: "คำศัพท์อุปกรณ์การเรียนและสิ่งของในห้องเรียน ป.1 ที่ใช้ทุกวัน",
      words: [
        { word: "Book", reading: "บุ๊ก", thai: "หนังสือ", emoji: "📖", sentence: "Open your book, please.", sentenceTh: "กรุณาเปิดหนังสือของหนูนะ" },
        { word: "Pencil", reading: "เพน-ซิล", thai: "ดินสอ", emoji: "✏️", sentence: "This is my pencil.", sentenceTh: "นี่คือดินสอของฉัน" },
        { word: "Pen", reading: "เพน", thai: "ปากกา", emoji: "🖊️", sentence: "It is a blue pen.", sentenceTh: "มันคือปากกาสีน้ำเงิน" },
        { word: "Ruler", reading: "รู-เลอร์", thai: "ไม้บรรทัด", emoji: "📏", sentence: "I have a long ruler.", sentenceTh: "ฉันมีไม้บรรทัดยาว" },
        { word: "Eraser", reading: "อิ-เร-เซอร์", thai: "ยางลบ", emoji: "🧼", sentence: "Can I borrow your eraser?", sentenceTh: "ขอยืมยางลบหน่อยได้ไหม?" },
        { word: "Bag", reading: "แบ็ก", thai: "กระเป๋า", emoji: "🎒", sentence: "My school bag is red.", sentenceTh: "กระเป๋านักเรียนของฉันสีแดง" },
        { word: "Chair", reading: "แชร์", thai: "เก้าอี้", emoji: "🪑", sentence: "Sit down on your chair.", sentenceTh: "นั่งลงบนเก้าอี้ของหนูนะ" },
        { word: "Table", reading: "เท-เบิล", thai: "โต๊ะ", emoji: "🪵", sentence: "Put the book on the table.", sentenceTh: "วางหนังสือไว้บนโต๊ะ" }
      ],
      dialogues: [
        { speaker: "คุณครู", avatar: "👩‍🏫", side: "left", en: "Stand up, please!", th: "กรุณายืนขึ้นค่ะ!" },
        { speaker: "นักเรียน", avatar: "👧", side: "right", en: "Good morning, teacher!", th: "สวัสดีตอนเช้าค่ะ คุณครู!" },
        { speaker: "คุณครู", avatar: "👩‍🏫", side: "left", en: "Sit down, please. Open your book!", th: "นั่งลงได้ค่ะ เปิดหนังสือกันเลย!" },
        { speaker: "นักเรียน", avatar: "👦", side: "right", en: "Yes, teacher!", th: "ครับ/ค่ะ คุณครู!" }
      ]
    },
    {
      id: "body",
      number: 6,
      titleEn: "My Body",
      titleTh: "ร่างกายของฉัน",
      icon: "😊",
      image: "images/unit-body.jpg",
      themeColor: "#EB3B5A",
      bgSoft: "#FFF0F4",
      description: "ชี้ส่วนต่างๆ ของร่างกายและฝึกพูดประโยคสั้นๆ เกี่ยวกับตัวเรา",
      words: [
        { word: "Head", reading: "เฮด", thai: "ศีรษะ / หัว", emoji: "🧒", sentence: "Touch your head!", sentenceTh: "จับที่ศีรษะของหนูสิ!" },
        { word: "Eye", reading: "อาย", thai: "ตา", emoji: "👀", sentence: "I have two eyes.", sentenceTh: "ฉันมีดวงตา 2 ข้าง" },
        { word: "Ear", reading: "เอียร์", thai: "หู", emoji: "👂", sentence: "I listen with my ears.", sentenceTh: "ฉันฟังเสียงด้วยหูของฉัน" },
        { word: "Nose", reading: "โนส", thai: "จมูก", emoji: "👃", sentence: "I have one nose.", sentenceTh: "ฉันมีจมูก 1 อัน" },
        { word: "Mouth", reading: "เมาธ์", thai: "ปาก", emoji: "👄", sentence: "Smile with your mouth!", sentenceTh: "ยิ้มกว้างๆ ด้วยปากของหนูสิ!" },
        { word: "Hand", reading: "แฮนด์", thai: "มือ", emoji: "✋", sentence: "Clap your hands!", sentenceTh: "ปรบมือกันเถอะ!" },
        { word: "Foot", reading: "ฟุต", thai: "เท้า", emoji: "🦶", sentence: "Stamp your feet!", sentenceTh: "กระทืบเท้าเบาๆ สิ!" },
        { word: "Hair", reading: "แฮร์", thai: "ผม", emoji: "💇", sentence: "I have black hair.", sentenceTh: "ฉันมีผมสีดำ" }
      ],
      dialogues: [
        { speaker: "น้องฮูก Ollie", avatar: "🦉", side: "left", en: "Let's play! Touch your nose!", th: "มาเล่นกัน! จับจมูกของหนูเร็ว!" },
        { speaker: "น้องฟ้า", avatar: "👧", side: "right", en: "Here is my nose!", th: "นี่ไงจมูกของหนู!" },
        { speaker: "น้องฮูก Ollie", avatar: "🦉", side: "left", en: "Great job! Now clap your hands!", th: "เก่งมากเลย! ทีนี้ปรบมือ 2 ที!" },
        { speaker: "น้องฟ้า", avatar: "👧", side: "right", en: "Clap, clap! That is fun!", th: "แปะ แปะ! สนุกจังเลย!" }
      ]
    }
  ],

  stickers: [
    { id: "star-explorer", emoji: "🌟", name: "นักสำรวจมือใหม่", requirement: 3, desc: "สะสมครบ 3 ดาว" },
    { id: "abc-hero", emoji: "🅰️", name: "ผู้พิชิต ABC", requirement: 6, desc: "สะสมครบ 6 ดาว" },
    { id: "rainbow-painter", emoji: "🌈", name: "ศิลปินสีรุ้ง", requirement: 10, desc: "สะสมครบ 10 ดาว" },
    { id: "animal-friend", emoji: "🦁", name: "เพื่อนรักสัตว์โลก", requirement: 15, desc: "สะสมครบ 15 ดาว" },
    { id: "super-listener", emoji: "🎧", name: "หูทิพย์ภาษาอังกฤษ", requirement: 20, desc: "สะสมครบ 20 ดาว" },
    { id: "gold-owl", emoji: "🦉", name: "ศิษย์เอกน้องฮูก", requirement: 30, desc: "สะสมครบ 30 ดาว" },
    { id: "rocket-kid", emoji: "🚀", name: "จรวดคนเก่ง ป.1", requirement: 40, desc: "สะสมครบ 40 ดาว" },
    { id: "crown-champ", emoji: "👑", name: "แชมป์ภาษาอังกฤษ ป.1", requirement: 50, desc: "สะสมครบ 50 ดาว" }
  ],

  mascotQuotes: [
    "สวัสดีจ้า! กดที่การ์ดเพื่อฟังเสียงภาษาอังกฤษได้เลยนะ 🔊",
    "น้องๆ เก่งมากเลย! ลองฝึกออกเสียงตามดังๆ นะจ๊ะ 🗣️",
    "กดปุ่มเต่า 🐢 เพื่อฟังเสียงแบบช้าๆ ชัดๆ ได้ด้วยนะ!",
    "อย่าลืมไปลองฝึกเขียน A–Z บนกระดานวิเศษด้วยนะ ✏️",
    "เล่นเกมทบทวนเพื่อสะสมดาวและปลดล็อกสติกเกอร์กันเถอะ 🌟"
  ]
};
