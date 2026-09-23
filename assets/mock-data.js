/* =========================================================================
   學習生涯工作台 · 統一 Mock Data
   全站唯一資料來源。所有頁面共讀同一份結構，未來可直接以 API 回應取代。
   寫入端（新增任務／成果／目標…）會透過 OD Store 存回 localStorage，
   因此跨頁操作能保留，Demo Flow 得以連續展示。
   ========================================================================= */
window.OD_MOCK = {

  /* ── 學生 ───────────────────────────────────────────────── */
  student: {
    id: 'stu_001',
    name: '陳品妤',
    initials: '品妤',
    school: '國立中正大學',
    program: '資訊工程學系',
    grade: '三年級',
    goal: '報考資訊工程研究所（考試入學）',
    targetLabel: '2027 年 2 月筆試',
    days: 135,
    weeklyHoursTarget: 18,
    email: 'pinyu.chen@example.com',
    phone: '0912-345-678',
    location: '嘉義縣民雄鄉',
    links: [
      { label: 'GitHub', value: 'github.com/pinyu' },
      { label: '作品集', value: 'pinyu.dev' }
    ]
  },

  /* ── 科目（學習規則的每週接觸次數） ─────────────────────── */
  subjects: [
    { id: 'lin',  name: '線性代數', short: '線代', perWeek: 3, minutes: 90,  active: true,  hue: 255 },
    { id: 'ds',   name: '資料結構', short: '資結', perWeek: 3, minutes: 90,  active: true,  hue: 200 },
    { id: 'os',   name: '作業系統', short: 'OS',   perWeek: 2, minutes: 90,  active: true,  hue: 160 },
    { id: 'algo', name: '演算法',   short: '演算', perWeek: 2, minutes: 120, active: true,  hue: 25  },
    { id: 'eng',  name: '英文',     short: '英文', perWeek: 2, minutes: 60,  active: true,  hue: 320 }
  ],

  /* ── 修課紀錄 ───────────────────────────────────────────── */
  semesterOrder: ['大一上', '大一下', '大二上', '大二下', '大三上', '大三下', '大四上', '大四下'],
  currentSemester: '大三上',
  categories: [
    { id: 'required',      name: '系必修',   need: 51 },
    { id: 'dept-elective', name: '系選修',   need: 24 },
    { id: 'ge',            name: '通識',     need: 28 },
    { id: 'free',          name: '自由選修', need: 25 }
  ],
  courses: [
    { id: 'c-pd1', name: '程式設計（一）',  credits: 3, category: 'required',      grade: 'A',    semester: '大一上', teacher: '林彥廷' },
    { id: 'c-la1', name: '線性代數（上）',  credits: 3, category: 'required',      grade: 'A',    semester: '大一上', teacher: '吳承翰' },
    { id: 'c-cal1', name: '微積分（一）',   credits: 4, category: 'required',      grade: 'B+',   semester: '大一上', teacher: '陳美玲' },
    { id: 'c-dm',  name: '離散數學',        credits: 3, category: 'required',      grade: 'A-',   semester: '大一上', teacher: '黃俊傑' },
    { id: 'c-ge1', name: '通識：科技與社會', credits: 2, category: 'ge',           grade: 'A',    semester: '大一上', teacher: '—' },
    { id: 'c-eng1', name: '英文（一）',      credits: 3, category: 'required',      grade: 'B+',   semester: '大一上', teacher: 'Smith' },

    { id: 'c-pd2', name: '程式設計（二）',  credits: 3, category: 'required',      grade: 'A',    semester: '大一下', teacher: '林彥廷' },
    { id: 'c-la2', name: '線性代數（下）',  credits: 3, category: 'required',      grade: 'A-',   semester: '大一下', teacher: '吳承翰' },
    { id: 'c-cal2', name: '微積分（二）',   credits: 4, category: 'required',      grade: 'B',    semester: '大一下', teacher: '陳美玲' },
    { id: 'c-ge2', name: '通識：藝術鑑賞',   credits: 2, category: 'ge',            grade: 'A-',   semester: '大一下', teacher: '—' },
    { id: 'c-eng2', name: '英文（二）',      credits: 3, category: 'required',      grade: 'B',    semester: '大一下', teacher: 'Smith' },

    { id: 'c-ds',  name: '資料結構',        credits: 3, category: 'required',      grade: 'A+',   semester: '大二上', teacher: '林彥廷' },
    { id: 'c-co',  name: '計算機組織',      credits: 3, category: 'required',      grade: 'B',    semester: '大二上', teacher: '張家瑋' },
    { id: 'c-stat', name: '機率與統計',     credits: 3, category: 'required',      grade: 'B+',   semester: '大二上', teacher: '李佳蓉' },
    { id: 'c-ge3', name: '通識：哲學導論',   credits: 2, category: 'ge',            grade: 'A',    semester: '大二上', teacher: '—' },

    { id: 'c-os',  name: '作業系統',        credits: 3, category: 'required',      grade: 'B+',   semester: '大二下', teacher: '張家瑋' },
    { id: 'c-db',  name: '資料庫系統',      credits: 3, category: 'dept-elective', grade: 'A',    semester: '大二下', teacher: '李佳蓉' },
    { id: 'c-web', name: '網頁程式設計',    credits: 3, category: 'dept-elective', grade: 'A',    semester: '大二下', teacher: '林彥廷' },
    { id: 'c-ge4', name: '通識：經濟學概論', credits: 2, category: 'ge',            grade: 'B+',   semester: '大二下', teacher: '—' },

    { id: 'c-algo', name: '演算法',         credits: 3, category: 'required',      grade: '',     semester: '大三上', teacher: '黃俊傑', inProgress: true },
    { id: 'c-se',  name: '軟體工程',        credits: 3, category: 'required',      grade: '',     semester: '大三上', teacher: '李佳蓉', inProgress: true },
    { id: 'c-stat2', name: '統計學',        credits: 3, category: 'required',      grade: '',     semester: '大三上', teacher: '李佳蓉', inProgress: true },
    { id: 'c-net', name: '計算機網路',      credits: 3, category: 'dept-elective', grade: '',     semester: '大三上', teacher: '張家瑋', inProgress: true },
    { id: 'c-proj1', name: '專題（一）',    credits: 1, category: 'required',      grade: '',     semester: '大三上', teacher: '黃俊傑', inProgress: true },
    { id: 'c-ge5', name: '通識：環境與永續', credits: 2, category: 'ge',            grade: '',     semester: '大三上', teacher: '—', inProgress: true },

    { id: 'c-img', name: '數位影像處理',    credits: 3, category: 'free',          grade: 'A-',   semester: '大二下', teacher: '—' },
    { id: 'c-py',  name: 'Python 資料分析', credits: 3, category: 'free',          grade: 'A',    semester: '大二下', teacher: '—' },
    { id: 'c-ce',  name: '服務學習',        credits: 0, category: 'free',          grade: 'A',    semester: '大二上', teacher: '—' },
    { id: 'c-pe1', name: '體育（一）',      credits: 0, category: 'free',          grade: 'A',    semester: '大一上', teacher: '—' },
    { id: 'c-pe2', name: '體育（二）',      credits: 0, category: 'free',          grade: 'A',    semester: '大一下', teacher: '—' }
  ],
  graduationRequirements: {
    imported: false,
    fileName: '',
    requirementsImported: false,
    requirementsFileName: '',
    totalNeed: 128,
    totalEarned: 61,
    parseResult: { minCredits: 128, required: 51, elective: 24, ge: 28, free: 25 }
  },

  /* ── 本學期課表（不可安排讀書的時段） ───────────────────── */
  timetable: [
    { id: 'tt3', day: 2, start: '18:00', end: '20:00', name: '演算法',   room: '工學院 301', courseId: 'c-algo' },
    { id: 'tt4', day: 3, start: '10:10', end: '12:00', name: '軟體工程', room: '工學院 205', courseId: 'c-se' },
    { id: 'tt8', day: 4, start: '09:00', end: '12:00', name: '統計學',   room: '理學院 201', courseId: 'c-stat2' },
    { id: 'tt9', day: 1, start: '13:30', end: '15:20', name: '計算機網路', room: '工學院 301', courseId: 'c-net' },
    { id: 'tt10', day: 5, start: '15:30', end: '17:20', name: '專題（一）', room: '工學院 309', courseId: 'c-proj1' },
    { id: 'tt11', day: 3, start: '15:30', end: '17:20', name: '通識：環境與永續', room: '人文 302', courseId: 'c-ge5' }
  ],
  /* ── 各學期課表：切換學期時會顯示對應課表 ─────────────── */
  timetableBySemester: {
    '大一上': [
      { id: 'sb11a', day: 1, start: '10:10', end: '12:00', name: '程式設計（一）',   room: '工學院 203', courseId: 'c-pd1' },
      { id: 'sb11b', day: 2, start: '10:10', end: '12:00', name: '離散數學',         room: '工學院 301', courseId: 'c-dm' },
      { id: 'sb11c', day: 3, start: '15:30', end: '17:20', name: '通識：科技與社會', room: '社科 102',   courseId: 'c-ge1' },
      { id: 'sb11d', day: 4, start: '09:00', end: '12:00', name: '線性代數（上）',   room: '理學院 105', courseId: 'c-la1' },
      { id: 'sb11e', day: 4, start: '13:30', end: '16:20', name: '微積分（一）',     room: '理學院 201', courseId: 'c-cal1' },
      { id: 'sb11f', day: 5, start: '08:00', end: '10:00', name: '體育（一）',       room: '體育館',     courseId: 'c-pe1' },
      { id: 'sb11g', day: 5, start: '10:10', end: '12:00', name: '英文（一）',       room: '人文 201',   courseId: 'c-eng1' }
    ],
    '大一下': [
      { id: 'sb12a', day: 1, start: '10:10', end: '12:00', name: '程式設計（二）',   room: '工學院 203', courseId: 'c-pd2' },
      { id: 'sb12b', day: 2, start: '09:00', end: '12:00', name: '線性代數（下）',   room: '理學院 105', courseId: 'c-la2' },
      { id: 'sb12c', day: 3, start: '15:30', end: '17:20', name: '通識：藝術鑑賞',   room: '人文 302',   courseId: 'c-ge2' },
      { id: 'sb12d', day: 4, start: '08:00', end: '10:00', name: '體育（二）',       room: '體育館',     courseId: 'c-pe2' },
      { id: 'sb12e', day: 4, start: '13:30', end: '16:20', name: '微積分（二）',     room: '理學院 201', courseId: 'c-cal2' },
      { id: 'sb12f', day: 5, start: '15:30', end: '17:20', name: '英文（二）',       room: '人文 302',   courseId: 'c-eng2' }
    ],
    '大二上': [
      { id: 'sb21a', day: 1, start: '10:00', end: '12:00', name: '資料結構',   room: '工學院 204', courseId: 'c-ds' },
      { id: 'sb21b', day: 2, start: '08:00', end: '10:00', name: '計算機組織', room: '工學院 301', courseId: 'c-co' },
      { id: 'sb21c', day: 3, start: '14:00', end: '16:00', name: '機率與統計', room: '理學院 201', courseId: 'c-stat' },
      { id: 'sb21d', day: 4, start: '10:10', end: '12:00', name: '通識：哲學導論', room: '人文 302', courseId: 'c-ge3' }
    ],
    '大二下': [
      { id: 'sb22a', day: 1, start: '13:30', end: '15:20', name: '作業系統',     room: '工學院 301', courseId: 'c-os' },
      { id: 'sb22b', day: 2, start: '15:30', end: '17:20', name: '資料庫系統',   room: '工學院 204', courseId: 'c-db' },
      { id: 'sb22c', day: 3, start: '09:00', end: '12:00', name: '網頁程式設計', room: '計算機中心', courseId: 'c-web' },
      { id: 'sb22d', day: 4, start: '10:10', end: '12:00', name: '通識：經濟學概論', room: '社科 101', courseId: 'c-ge4' },
      { id: 'sb22e', day: 5, start: '13:30', end: '16:20', name: '數位影像處理', room: '工學院 205', courseId: 'c-img' }
    ],
    '大三上': [
      { id: 'tt3', day: 2, start: '18:00', end: '20:00', name: '演算法',   room: '工學院 301', courseId: 'c-algo' },
      { id: 'tt4', day: 3, start: '10:10', end: '12:00', name: '軟體工程', room: '工學院 205', courseId: 'c-se' },
      { id: 'tt8', day: 4, start: '09:00', end: '12:00', name: '統計學',   room: '理學院 201', courseId: 'c-stat2' },
      { id: 'tt9', day: 1, start: '13:30', end: '15:20', name: '計算機網路', room: '工學院 301', courseId: 'c-net' },
      { id: 'tt10', day: 5, start: '15:30', end: '17:20', name: '專題（一）', room: '工學院 309', courseId: 'c-proj1' },
      { id: 'tt11', day: 3, start: '15:30', end: '17:20', name: '通識：環境與永續', room: '人文 302', courseId: 'c-ge5' }
    ],
    '大三下': [
      { id: 'sb23a', day: 2, start: '10:00', end: '12:00', name: '機器學習',   room: '工學院 204', courseId: '' },
      { id: 'sb23b', day: 3, start: '13:30', end: '16:20', name: '專題（二）', room: '工學院 309', courseId: '' },
      { id: 'sb23c', day: 5, start: '09:00', end: '12:00', name: '資訊安全',   room: '工學院 301', courseId: '' }
    ]
  },
  today: '2026-09-23',

  /* ── 任務類型（新增／編輯任務的分組選單） ─────────────────
     任務不只讀書：請老師寫推薦信、寫專題文件也是一件要排進時程的事，
     所以分成「學習」與「一般事務」兩組。前五個學習類別不能動，
     拆解目標時會自動寫入「理解」「練習」。 */
  taskKindGroups: [
    ['學習', ['理解', '練習', '複習', '回想', '測驗']],
    ['一般事務', ['撰寫', '聯繫', '申請', '準備', '其他']]
  ],

  /* ── 任務（時間型 + 目標型） ────────────────────────────── */
  tasks: [
    { id: 'k1', date: '2026-09-21', start: '10:00', end: '11:30', sid: 'lin',  title: '第四章 向量空間 理解', kind: '理解', minutes: 90, done: true,  type: 'time', goalId: 'g1' },
    { id: 'k2', date: '2026-09-21', start: '15:00', end: '16:30', sid: 'ds',   title: '鏈結串列題目 1–8',      kind: '練習', minutes: 90, done: true,  type: 'time' },
    { id: 'k3', date: '2026-09-22', start: '08:30', end: '09:30', sid: 'os',   title: 'Chapter 1 複習',       kind: '複習', minutes: 60, done: true,  type: 'time' },
    { id: 'k4', date: '2026-09-22', start: '20:00', end: '20:40', sid: 'eng',  title: '閱讀測驗 2 篇',         kind: '練習', minutes: 40, done: true,  type: 'time' },
    { id: 'k5', date: '2026-09-23', start: '09:00', end: '10:30', sid: 'ds',   title: 'Queue 與 Stack 練習',  kind: '練習', minutes: 90, done: false, type: 'time' },
    { id: 'k6', date: '2026-09-23', start: '14:00', end: '15:30', sid: 'lin',  title: '線性代數 Chapter 4',   kind: '理解', minutes: 90, done: false, type: 'time', goalId: 'g1', goalAmount: 1 },
    { id: 'k7', date: '2026-09-23', start: '19:00', end: '20:00', sid: 'algo', title: '演算法題目 10 題',     kind: '練習', minutes: 60, done: false, type: 'time' },
    { id: 'k8', date: '2026-09-24', start: '09:00', end: '10:00', sid: 'lin',  title: 'Chapter 4 回想測驗',   kind: '回想', minutes: 60, done: false, type: 'time', goalId: 'g1' },
    { id: 'k9', date: '2026-09-25', start: '19:00', end: '20:30', sid: 'algo', title: '圖論演算法 練習',      kind: '練習', minutes: 90, done: false, type: 'time' },
    { id: 'k10', date: '2026-09-26', start: '10:00', end: '11:30', sid: 'ds',  title: 'Binary Tree 題目 1–10', kind: '練習', minutes: 90, done: false, type: 'time' },
    { id: 'k11', date: '2026-09-27', start: '10:00', end: '10:40', sid: 'eng', title: '單字與片語複習',       kind: '複習', minutes: 40, done: false, type: 'time' },
    { id: 'k12', date: '2026-09-27', start: '15:00', end: '16:00', sid: 'lin', title: '第五章 5-1 理解',      kind: '理解', minutes: 60, done: false, type: 'time', goalId: 'g1' },
    { id: 'k13', date: '2026-09-16', start: '10:00', end: '11:30', sid: 'lin', title: '第三章 行列式 理解',   kind: '理解', minutes: 90, done: true,  type: 'time' },
    { id: 'k14', date: '2026-09-15', start: '14:00', end: '15:30', sid: 'ds',  title: '陣列與字串題目 1–15',  kind: '練習', minutes: 90, done: true,  type: 'time' },
    { id: 'k15', date: '2026-09-11', start: '19:00', end: '20:30', sid: 'os',  title: '行程與執行緒 複習',    kind: '複習', minutes: 90, done: true,  type: 'time' },
    { id: 'k16', date: '2026-09-09', start: '20:00', end: '21:00', sid: 'algo', title: '分治法 回想',          kind: '回想', minutes: 60, done: true,  type: 'time' },
    { id: 'k17', date: '2026-09-08', start: '09:00', end: '10:00', sid: 'eng',  title: '閱讀測驗 3 篇',        kind: '練習', minutes: 60, done: true,  type: 'time' },
    { id: 'k18', date: '2026-09-04', start: '15:00', end: '16:00', sid: 'lin', title: '第二章 矩陣運算 測驗',  kind: '測驗', minutes: 60, done: true,  type: 'time' },
    /* 不是讀書的事也要排進時程：沒有科目，類型走「一般事務」那一組 */
    { id: 'k19', date: '2026-09-18', start: '14:00', end: '15:00', sid: '',    title: '請老師寫推薦信',       kind: '聯繫', minutes: 60, done: true,  type: 'time' },
    { id: 'k20', date: '2026-09-19', start: '20:00', end: '21:30', sid: '',    title: '專題文件撰寫',         kind: '撰寫', minutes: 90, done: true,  type: 'time' },
    { id: 'k21', date: '2026-09-24', start: '16:00', end: '17:00', sid: '',    title: '送交專題初稿',         kind: '申請', minutes: 60, done: false, type: 'time' }
  ],

  /* ── 學習目標（目標型任務） ─────────────────────────────── */
  goals: [
    { id: 'g1', title: '完成線性代數', sid: 'lin', measure: 'chapters', unit: 'Chapters',
      total: 6, current: 3, weekLabel: 'Chapter 4–5', weekFrom: 4, weekTo: 5,
      deadline: '2026-10-31', createdAt: '2026-09-01',
      plan: [
        { dayLabel: '週一', date: '2026-09-21', title: '閱讀 Chapter 4', kind: '理解', minutes: 90 },
        { dayLabel: '週三', date: '2026-09-23', title: '完成 Chapter 4 練習', kind: '練習', minutes: 90 },
        { dayLabel: '週四', date: '2026-09-24', title: '閱讀 Chapter 5', kind: '理解', minutes: 90 },
        { dayLabel: '週六', date: '2026-09-26', title: '完成 Chapter 5 練習', kind: '練習', minutes: 90 }
      ] },
    { id: 'g2', title: '完成線性代數講義', sid: 'lin', measure: 'pages', unit: '頁',
      total: 180, current: 108, weekLabel: '本週 30 頁', weekFrom: 0, weekTo: 0,
      weekTarget: 30, weekDone: 18, deadline: '2026-11-30', createdAt: '2026-09-05', plan: [] },
    { id: 'g3', title: '完成資料結構題庫', sid: 'ds', measure: 'questions', unit: '題',
      total: 120, current: 45, weekLabel: '本週 30 題', weekFrom: 0, weekTo: 0,
      weekTarget: 30, weekDone: 12, deadline: '2026-10-20', createdAt: '2026-09-02', plan: [] },
    { id: 'g4', title: '演算法線上課程', sid: 'algo', measure: 'videos', unit: '部影片',
      total: 24, current: 14, weekLabel: '本週 4 部', weekFrom: 0, weekTo: 0,
      weekTarget: 4, weekDone: 2, deadline: '2026-12-15', createdAt: '2026-09-10', plan: [] }
  ],
  measureTypes: [
    { value: 'chapters',  label: '章節', unit: 'Chapters' },
    { value: 'pages',     label: '頁數', unit: '頁' },
    { value: 'questions', label: '題數', unit: '題' },
    { value: 'videos',    label: '影片', unit: '部影片' },
    { value: 'custom',    label: '自訂', unit: '單位' }
  ],

  /* ── 學習日誌 ───────────────────────────────────────────── */
  journals: [
    { id: 'j1', date: '2026-09-23', time: '09:30', text: '完成資料結構 Queue 練習。' },
    { id: 'j2', date: '2026-09-23', time: '14:20', text: '上完線性代數。' },
    { id: 'j3', date: '2026-09-23', time: '21:00', text: '完成線代 Chapter 3。' },
    { id: 'j4', date: '2026-09-22', time: '21:20', text: '作業系統 Chapter 1 複習完，排程演算法還需要再看一次。' },
    { id: 'j5', date: '2026-09-21', time: '20:40', text: '線代第四章例題做完一輪，矩陣運算速度仍偏慢。' }
  ],

  /* ── 成果歷程 ───────────────────────────────────────────── */
  achievementTypes: [
    { value: 'course',     label: '課程' },
    { value: 'intern',     label: '實習' },
    { value: 'contest',    label: '競賽' },
    { value: 'project',    label: '專題' },
    { value: 'activity',   label: '活動' },
    { value: 'cert',       label: '證照' },
    { value: 'other',      label: '其他' }
  ],
  achievements: [
    { id: 'a1', type: 'course', courseId: 'c-db', title: '資料庫系統專題', semester: '大三上', grade: '90',
      summary: '完成一套校園二手書交易系統，涵蓋 ER 模型、正規化、SQL 查詢與交易控制。',
      tech: ['SQL', 'MySQL', '資料建模'], skills: ['資料庫', 'SQL', '資料庫設計', '專案實作'],
      link: '', repo: '', date: '2026-06-20' },
    { id: 'a2', type: 'contest', title: '全國大專院校程式設計競賽', semester: '大三上', grade: '佳作',
      summary: '三人一隊，以圖論與動態規劃題型為主，完成 7 / 12 題。',
      tech: ['C++', '演算法'], skills: ['程式設計', '問題解決', '團隊協作'], link: '', repo: '', date: '2026-05-18' },
    { id: 'a3', type: 'project', title: '校園二手書交易平台', semester: '大二下', grade: '',
      summary: '獨立完成前後端雛型，含會員、刊登、搜尋與交易流程。',
      tech: ['JavaScript', 'Node.js', 'MySQL'], skills: ['程式設計', '系統設計', '資料庫'], link: '', repo: 'github.com/pinyu/bookswap', date: '2026-06-30' },
    { id: 'a4', type: 'intern', title: '暑期實習 · 後端開發', semester: '大三上', grade: '',
      summary: '於校園新創團隊實習八週，負責會員服務 API 與資料表維護。',
      tech: ['Node.js', 'SQL', 'Git'], skills: ['程式設計', '團隊協作', '溝通'], link: '', repo: '', date: '2026-08-30' },
    { id: 'a5', type: 'cert', title: 'TOEIC 多益 785 分', semester: '大二下', grade: '785',
      summary: '聽力 420 / 閱讀 365。', tech: [], skills: ['英文'], link: '', repo: '', date: '2026-03-12' },
    { id: 'a6', type: 'activity', title: '資訊工程研習營 隊輔', semester: '大二下', grade: '',
      summary: '帶領 24 位高中生完成 Python 入門專題。', tech: ['Python'], skills: ['溝通', '團隊協作'], link: '', repo: '', date: '2026-07-15' }
  ],

  /* ── 能力分析 ───────────────────────────────────────────── */
  skills: [
    { id: 's-code',  name: '程式設計', score: 84, note: 'C++／Python 實作熟練，能在時限內完成中型題目。',
      open: ['非同步程式設計', '單元測試與除錯流程', '效能分析與優化'] },
    { id: 's-data',  name: '資料分析', score: 71, note: '統計與資料處理具基礎，視覺化與推論統計仍待補強。',
      open: ['資料視覺化', '推論統計應用', 'A/B 測試分析'] },
    { id: 's-db',    name: '資料庫',   score: 86, note: 'SQL 查詢、建模與正規化表現穩定，具專題實作經驗。',
      open: ['NoSQL 資料庫', '資料庫效能調校'] },
    { id: 's-prob',  name: '問題解決', score: 78, note: '能拆解問題並以競賽題型驗證，複雜度分析仍不穩。',
      open: ['複雜度分析', '系統性除錯方法'] },
    { id: 's-sys',   name: '系統設計', score: 66, note: '具小型專案架構經驗，分散式與效能設計尚未接觸。',
      open: ['分散式系統', '系統效能與擴展性'] },
    { id: 's-pm',    name: '專案管理', score: 74, note: '能規劃專題時程與分工，風險控管經驗較少。',
      open: ['風險控管', '進度追蹤工具'] },
    { id: 's-team',  name: '團隊協作', score: 82, note: '競賽與實習皆有多人協作經驗，具文件撰寫能力。',
      open: ['跨團隊溝通', '衝突處理'] },
    { id: 's-comm',  name: '溝通',     score: 76, note: '研習營隊輔與實習簡報經驗，技術表達可再加強。',
      open: ['跨部門溝通', '文件撰寫'] }
  ],
  skillEvidence: [
    { id: 'e1', skillId: 's-db',   source: 'course',      sourceId: 'c-db',  label: '資料庫系統',   evidenceType: '課程', detail: '成績 90 · 大三上', note: 'ER 模型、正規化、交易控制', items: ['ER 模型與資料建模', '正規化設計', 'SQL 查詢與交易控制'] },
    { id: 'e2', skillId: 's-db',   source: 'achievement', sourceId: 'a1',    label: '資料庫系統專題', evidenceType: '課程成果', detail: '成果 · SQL / MySQL', note: '完成可運作的交易系統', items: ['ER 模型與資料建模', '資料表設計'] },
    { id: 'e3', skillId: 's-data', source: 'course',      sourceId: 'c-stat', label: '機率與統計',   evidenceType: '課程', detail: '成績 B+ · 大二上', note: '機率與推論統計基礎', items: ['機率與統計基礎'] },
    { id: 'e4', skillId: 's-data', source: 'achievement', sourceId: 'a1',    label: '資料庫系統專題', evidenceType: '課程成果', detail: '成果 · 資料處理', note: '資料清理與查詢分析', items: ['資料清理與查詢', '基本資料分析'] },
    { id: 'e5', skillId: 's-code', source: 'achievement', sourceId: 'a2',    label: '程式設計競賽', evidenceType: '競賽', detail: '競賽 · 佳作', note: 'C++ 實作與演算法應用', items: ['C++ 實作與演算法應用'] },
    { id: 'e6', skillId: 's-code', source: 'achievement', sourceId: 'a4',    label: '後端開發實習', evidenceType: '實習', detail: '實習 · 8 週', note: '會員服務 API 開發', items: ['後端 API 開發', '程式除錯與測試'] },
    { id: 'e7', skillId: 's-prob', source: 'course',      sourceId: 'c-algo', label: '演算法',       evidenceType: '課程', detail: '修課中 · 大三上', note: '圖論與動態規劃練習中', items: ['圖論與動態規劃練習', '問題拆解與解題'] },
    { id: 'e8', skillId: 's-sys',  source: 'achievement', sourceId: 'a3',    label: '二手書交易平台', evidenceType: '專題', detail: '專題 · 獨立完成', note: '前後端整合與資料庫設計', items: ['前後端整合', '小型專案架構', '資料庫設計'] },
    { id: 'e9', skillId: 's-team', source: 'achievement', sourceId: 'a4',    label: '後端開發實習', evidenceType: '實習', detail: '實習 · 團隊協作', note: '與 PM、前端協作', items: ['跨角色協作', '共同開發流程'] },
    { id: 'e10', skillId: 's-comm', source: 'achievement', sourceId: 'a6',   label: '資訊研習營隊輔', evidenceType: '活動', detail: '活動 · 24 位學員', note: '教學與溝通', items: ['技術教學與引導', '簡報表達'] },
    { id: 'e11', skillId: 's-pm',  source: 'achievement', sourceId: 'a1',    label: '資料庫系統專題', evidenceType: '課程成果', detail: '成果 · 時程規劃', note: '四週專題規劃與分工', items: ['專題時程規劃', '團隊分工'] },
    { id: 'e12', skillId: 's-db',  source: 'achievement', sourceId: 'a3',    label: '二手書交易平台', evidenceType: '專題', detail: '專題 · MySQL', note: '資料表設計與查詢', items: ['資料表設計', 'SQL 查詢與交易控制'] }
  ],

  /* ── AI 職涯探索 ────────────────────────────────────────── */
  careerDirections: [
    { id: 'data-analysis', name: '資料分析', en: 'Data Analysis', overlap: 78,
      have: ['SQL', '統計', '資料處理'], gap: ['Python', '資料視覺化', 'A/B Testing', '商業分析'],
      reason: '你的修課、專題與成果中出現資料庫、統計與資料處理經驗，因此與此方向存在多項能力重疊。',
      suggest: '建議進一步了解資料分析師的日常工作與常用工具。',
      path: ['補強 Python 與資料處理（約 4 週）', '實作完整資料分析專題（約 5 週）', '學習 A/B Testing 與商業指標'],
      kw: ['Python', 'SQL', 'pandas', 'Tableau'],
      grad: ['資訊工程所', '資料科學所', '統計所'],
      resources: {
        course:   [{ id: 'r1', name: 'Python 程式設計', provider: '資工系', meta: '下學期 · 3 學分' }],
        activity: [{ id: 'r2', name: '資料分析讀書會', provider: '圖書館學習社群', meta: '每週三 19:00' }],
        contest:  [{ id: 'r3', name: '資料分析挑戰賽', provider: '校內 AI 中心', meta: '11 月報名' }],
        workshop: [{ id: 'r4', name: 'Python 資料分析工作坊', provider: '計算機中心', meta: '週末 2 日' }],
        online:   [{ id: 'r5', name: 'pandas 與資料視覺化', provider: '線上課程平台', meta: '約 12 小時' }]
      } },
    { id: 'software-dev', name: '軟體開發', en: 'Software Development', overlap: 84,
      have: ['程式設計', '資料結構', '版本控制'], gap: ['系統設計', '測試', '雲端部署'],
      reason: '程式實作與資料結構能力是此方向的核心，加上實習與專題經驗，能力輪廓高度重疊。',
      suggest: '建議進一步了解後端與全端工程師的技能組合。',
      path: ['補強系統設計與架構（約 4 週）', '熟悉測試與 CI/CD 流程（約 3 週）', '完成一個可部署的專題（約 6 週）'],
      kw: ['Git', 'REST API', 'Docker', 'Node.js'],
      grad: ['資訊工程所', '資訊管理所'],
      resources: {
        course:   [{ id: 'r6', name: '軟體工程', provider: '資工系', meta: '本學期修課中' }],
        activity: [{ id: 'r7', name: '開源專案貢獻聚', provider: '學生社群', meta: '每月一次' }],
        contest:  [{ id: 'r8', name: '黑客松競賽', provider: '大專院校聯合', meta: '10 月' }],
        workshop: [{ id: 'r9', name: 'Docker 與 CI/CD 工作坊', provider: '計算機中心', meta: '週末 1 日' }],
        online:   [{ id: 'r10', name: '系統設計入門', provider: '線上課程平台', meta: '約 20 小時' }]
      } },
    { id: 'info-system', name: '資訊系統', en: 'Information Systems', overlap: 72,
      have: ['資料庫', '系統設計', '專案管理'], gap: ['企業流程', 'ERP 概念', '需求訪談'],
      reason: '資料庫與專題規劃經驗與資訊系統工作重疊，但企業流程與需求分析經驗尚在建立中。',
      suggest: '建議進一步了解企業資訊系統的導入與維運角色。',
      path: ['了解企業流程與 ERP 概念（約 3 週）', '練習需求訪談與系統分析（約 4 週）', '參與企業參訪或導入專題'],
      kw: ['SQL', 'ERP', 'BPMN', 'UML'],
      grad: ['資訊管理所', '資訊工程所'],
      resources: {
        course:   [{ id: 'r11', name: '企業資訊系統導論', provider: '資管系', meta: '下學期 · 3 學分' }],
        activity: [{ id: 'r12', name: '企業參訪', provider: '職涯中心', meta: '11 月' }],
        contest:  [{ id: 'r13', name: '商業流程改善提案競賽', provider: '管理學院', meta: '12 月' }],
        workshop: [{ id: 'r14', name: '需求訪談實務', provider: '職涯中心', meta: '半日' }],
        online:   [{ id: 'r15', name: 'ERP 與企業流程概論', provider: '線上課程平台', meta: '約 8 小時' }]
      } },
    { id: 'product-pm', name: '產品／專案相關', en: 'Product / Project', overlap: 68,
      have: ['專案管理', '團隊協作', '溝通'], gap: ['使用者研究', '數據分析', '產品指標'],
      reason: '專題規劃、團隊協作與溝通能力與產品／專案角色重疊，但仍缺少使用者研究與指標設計經驗。',
      suggest: '建議進一步了解產品經理與專案經理的差異。',
      path: ['學習使用者研究與訪談（約 3 週）', '建立產品指標與數據追蹤（約 3 週）', '完成一份產品提案'],
      kw: ['User Story', 'Wireframe', 'Agile', 'Figma'],
      grad: ['資訊管理所', '工業工程所'],
      resources: {
        course:   [{ id: 'r16', name: '使用者經驗設計', provider: '設計學院', meta: '下學期 · 3 學分' }],
        activity: [{ id: 'r17', name: '產品經理分享會', provider: '職涯中心', meta: '10 月' }],
        contest:  [{ id: 'r18', name: '產品設計競賽', provider: '創新中心', meta: '11 月' }],
        workshop: [{ id: 'r19', name: '敏捷專案管理工作坊', provider: '計算機中心', meta: '週末 1 日' }],
        online:   [{ id: 'r20', name: '產品思維入門', provider: '線上課程平台', meta: '約 6 小時' }]
      } },
    { id: 'business-analysis', name: '商業分析', en: 'Business Analysis', overlap: 61,
      have: ['統計', '資料庫', '溝通'], gap: ['商業知識', '財務指標', '簡報敘事'],
      reason: '統計與資料處理是你的起點，但商業領域知識與財務指標的理解仍在起步。',
      suggest: '建議進一步了解商業分析與資料分析的差異。',
      path: ['補強商業與財務基礎（約 4 週）', '練習個案分析與簡報（約 4 週）', '參與商業個案競賽'],
      kw: ['Excel', '財務報表', 'Tableau', '簡報'],
      grad: ['企業管理所', '資訊管理所'],
      resources: {
        course:   [{ id: 'r21', name: '管理學', provider: '管理學院', meta: '下學期 · 3 學分' }],
        activity: [{ id: 'r22', name: '商業個案讀書會', provider: '管理學院', meta: '每週二 18:00' }],
        contest:  [{ id: 'r23', name: '商業個案競賽', provider: '管理學院', meta: '12 月' }],
        workshop: [{ id: 'r24', name: '商業簡報工作坊', provider: '職涯中心', meta: '半日' }],
        online:   [{ id: 'r25', name: '財務指標與商業分析', provider: '線上課程平台', meta: '約 10 小時' }]
      } }
  ],

  /* ── 推薦之外的機會：不掛在任何職涯方向底下 ───────────────
     上面的 resources 是比對能力缺口後推出來的，這裡是推不出來但值得自己逛的。
     用 field（領域）而不是 careerDirection 分類，因為它們本來就沒對到你的方向。 */
  opportunities: [
    { id: 'o1',  type: 'course',   field: '資料分析',   name: '機率與統計（二）',     provider: '資工系',       meta: '下學期 · 3 學分', note: '想往資料走，這門是後面的底子' },
    { id: 'o2',  type: 'course',   field: '人工智慧',   name: '人工智慧導論',         provider: '資工系',       meta: '下學期 · 3 學分', note: 'AI 應用的入門課，作業偏實作' },
    { id: 'o3',  type: 'course',   field: '人工智慧',   name: '數位影像處理',         provider: '資工系',       meta: '下學期 · 3 學分', note: '影像相關的專題會用到' },
    { id: 'o4',  type: 'course',   field: '商管',       name: '行銷管理',             provider: '管理學院',     meta: '下學期 · 3 學分', note: '想補商業語言可以修' },
    { id: 'o5',  type: 'course',   field: '設計',       name: '視覺傳達設計概論',     provider: '設計學院',     meta: '下學期 · 2 學分', note: '非本科也能修的設計入門' },
    { id: 'o6',  type: 'activity', field: '系統與網路', name: '開源社群聚會',         provider: '學生社群',     meta: '每月第一個週四',  note: '認識業界工程師的場合' },
    { id: 'o7',  type: 'activity', field: '跨域',       name: '英語簡報讀書會',       provider: '語言中心',     meta: '每週五 18:30',    note: '練口說也練台風' },
    { id: 'o8',  type: 'activity', field: '設計',       name: '設計思考工作聚',       provider: '創新中心',     meta: '隔週一次',        note: '跨系分組解真實問題' },
    { id: 'o9',  type: 'contest',  field: '系統與網路', name: '全國大專程式競賽',     provider: '教育部',       meta: '10 月報名',       note: '演算法實力的客觀指標' },
    { id: 'o10', type: 'contest',  field: '人工智慧',   name: 'AI 應用創新競賽',      provider: '科技部',       meta: '11 月報名',       note: '可以帶著現成的專題去報' },
    { id: 'o11', type: 'contest',  field: '商管',       name: '大專院校行銷企劃賽',   provider: '管理學院',     meta: '12 月報名',       note: '吃簡報與敘事能力' },
    { id: 'o12', type: 'workshop', field: '系統與網路', name: 'Git 與協作流程工作坊', provider: '計算機中心',   meta: '半日',            note: '做專題前先補起來' },
    { id: 'o13', type: 'workshop', field: '資料分析',   name: '資料視覺化實作',       provider: '圖書館',       meta: '週末 1 日',       note: '把分析結果講清楚' },
    { id: 'o14', type: 'workshop', field: '跨域',       name: '簡報敘事工作坊',       provider: '職涯中心',     meta: '半日',            note: '成果發表前很受用' },
    { id: 'o15', type: 'online',   field: '人工智慧',   name: '機器學習基礎',         provider: '線上課程平台', meta: '約 24 小時',      note: '有微積分與統計底子再修' },
    { id: 'o16', type: 'online',   field: '資料分析',   name: 'SQL 進階查詢',         provider: '線上課程平台', meta: '約 10 小時',      note: '資料庫課的延伸' },
    { id: 'o17', type: 'online',   field: '系統與網路', name: '資訊安全概論',         provider: '線上課程平台', meta: '約 15 小時',      note: '跨領域的敲門磚' },
    { id: 'o18', type: 'online',   field: '設計',       name: 'UI/UX 設計基礎',       provider: '線上課程平台', meta: '約 12 小時',      note: '做專題介面用得上' }
  ],

  /* ── 推薦理由用的 AI 免責文案（避免宣稱真正 AI 判斷） ───── */
  aiDisclaimer: '以上為依目前輸入的學習歷程與成果整理的初步分析，非心理測驗或正式能力評量結果。',

  /* ── 簡歷 ───────────────────────────────────────────────── */
  resumeModes: [
    { value: 'job',    label: '求職版', desc: '優先呈現實習、專題、競賽、技能與作品' },
    { value: 'grad',   label: '升學版', desc: '優先呈現修課、成績、專題與研究學習成果' }
  ],

  /* ── 簡歷版型（可切換） ─────────────────────────────────── */
  resumeTemplates: [
    { id: 'classic', name: '經典', desc: '單欄、分區清楚，適合列印與系統解析。' },
    { id: 'modern',  name: '現代', desc: '以主色強調標題層級，視覺較有重點。' },
    { id: 'minimal', name: '極簡', desc: '減少線框與裝飾，強調內容與留白。' }
  ],

  /* ── 簡歷基本資料（可編輯，會存回 localStorage） ────────── */
  resumeProfile: {
    name: '陳品妤',
    email: 'pinyu.chen@example.com',
    phone: '0912-345-678',
    location: '嘉義縣民雄鄉',
    website: 'pinyu.dev',
    github: 'github.com/pinyu',
    template: 'classic'
  },

  /* ── 年度回顧 ───────────────────────────────────────────── */
  yearlyStats: {
    year: 2026,
    tasksDone: 186,
    goalsDone: 8,
    coursesCount: 28,
    achievementsCount: 12,
    projects: 3,
    contests: 2,
    interns: 1,
    topSubjectId: 'lin',
    newSkills: ['資料分析', 'SQL', '專案管理'],
    topGoalTitle: '完成線性代數 Chapter 1–6',
    topGoalProgress: '6 / 6 Chapters',
    breakdown: [
      { label: '課程', value: 28 }, { label: '成果', value: 12 },
      { label: '專題', value: 3 }, { label: '競賽', value: 2 },
      { label: '實習', value: 1 }, { label: '學習目標', value: 8 }
    ],
    monthly: [12, 15, 18, 14, 20, 22, 16, 19, 15, 13, 11, 11]
  },

  /* ── 未來接 API 的資料表 / 端點對照（純文件用） ─────────── */
  apiMap: {
    student: 'students',
    subjects: 'study_rules',
    courses: 'courses',
    graduationRequirements: 'graduation_requirements',
    timetable: 'timetable_entries',
    timetableBySemester: 'timetable_entries (by semester)',
    resumeTemplates: 'resume_templates',
    resumeProfile: 'student_profiles',
    tasks: 'tasks',
    goals: 'goals',
    journals: 'journal_entries',
    achievements: 'achievements',
    skills: 'skills',
    skillEvidence: 'skill_evidence',
    careerDirections: 'career_directions',
    resources: 'learning_resources',
    opportunities: 'learning_resources (推薦之外，未掛職涯方向)'
  }
};
