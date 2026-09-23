/* =========================================================================
   學習生涯工作台 · 共用殼層
   Sidebar 導覽 / Appbar / Modal / Toast / 右下角語音輸入 / OD Store
   頁面只需：OD.appbar(...)、OD.on(action, fn)，其餘由本檔提供。
   ========================================================================= */
(function () {
  'use strict';

  var OD = window.OD = {};
  OD.page = document.body.getAttribute('data-page') || '';

  /* ── 工具 ───────────────────────────────────────────────── */
  OD.$ = function (s, r) { return (r || document).querySelector(s); };
  OD.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  OD.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  };
  OD.uid = function (p) { return (p || 'id') + '_' + Math.random().toString(36).slice(2, 7); };
  OD.slug = function (s) {
    var str = String(s == null ? '' : s), h = 0;
    for (var i = 0; i < str.length; i++) { h = (h * 31 + str.charCodeAt(i)) >>> 0; }
    var ascii = str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return ascii || ('sec-' + h.toString(36));
  };
  OD.toMin = function (hhmm) { var p = String(hhmm).split(':'); return (+p[0]) * 60 + (+p[1]); };
  OD.addMin = function (hhmm, min) {
    var t = OD.toMin(hhmm) + min;
    return ('0' + Math.floor(t / 60) % 24).slice(-2) + ':' + ('0' + t % 60).slice(-2);
  };
  OD.fmtMin = function (m) { return Math.floor(m / 60) + ' 小時' + (m % 60 ? ' ' + (m % 60) + ' 分' : ''); };

  var WD = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
  var WD_FULL = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  OD.DAY_NAMES = WD;
  OD.parseISO = function (iso) { var p = String(iso).split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); };
  OD.iso = function (d) { return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); };
  OD.dow = function (iso) { return OD.parseISO(iso).getDay(); };          // 0=Sun
  OD.dowMon0 = function (iso) { return (OD.dow(iso) + 6) % 7; };          // 0=Mon
  OD.fmtDate = function (iso) {
    var d = OD.parseISO(iso);
    return (d.getMonth() + 1) + '月' + d.getDate() + '日（' + WD[d.getDay()] + '）';
  };
  OD.fmtDateShort = function (iso) { var d = OD.parseISO(iso); return (d.getMonth() + 1) + '/' + d.getDate(); };
  OD.monthDays = function (y, m) { return new Date(y, m, 0).getDate(); };
  OD.weekStart = function (iso) {
    var d = OD.parseISO(iso); var off = (d.getDay() + 6) % 7; d.setDate(d.getDate() - off); return OD.iso(d);
  };
  OD.weekDates = function (iso) {
    var start = OD.weekStart(iso), out = [];
    for (var i = 0; i < 7; i++) { var d = OD.parseISO(start); d.setDate(d.getDate() + i); out.push(OD.iso(d)); }
    return out;
  };
  OD.nowHM = function () { var d = new Date(); return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); };

  /* ── Store（跨頁共用同一份 mock data） ──────────────────── */
  var KEY = 'shiji:v5';
  var PERSIST = ['tasks', 'goals', 'journals', 'achievements', 'skillEvidence', 'timetable', 'timetableBySemester', 'subjects', 'graduationRequirements', 'courses', 'resumeProfile'];
  var db = JSON.parse(JSON.stringify(window.OD_MOCK));
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) { var saved = JSON.parse(raw); PERSIST.forEach(function (k) { if (saved[k]) db[k] = saved[k]; }); }
  } catch (e) {}
  OD.db = db;
  OD.save = function () {
    try {
      var o = {}; PERSIST.forEach(function (k) { o[k] = db[k]; });
      localStorage.setItem(KEY, JSON.stringify(o));
    } catch (e) {}
  };
  OD.reset = function () { try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); };

  /* ── 查詢 ───────────────────────────────────────────────── */
  OD.today = db.today;
  OD.subject = function (id) { return db.subjects.filter(function (s) { return s.id === id; })[0] || null; };
  OD.subjectName = function (id) { var s = OD.subject(id); return s ? s.name : (id || ''); };
  OD.subjectHue = function (id) { var s = OD.subject(id); return s ? s.hue : 250; };

  /* ── 課表：依學期取得 / 科目清單維護 ────────────────────── */
  OD.timetableFor = function (sem) {
    sem = sem || db.currentSemester;
    var map = db.timetableBySemester || {};
    if (map[sem]) return map[sem];
    return sem === db.currentSemester ? (db.timetable || []) : [];
  };
  function nameHue(str) {
    var h = 0; for (var i = 0; i < str.length; i++) { h = (h * 31 + str.charCodeAt(i)) >>> 0; }
    return h % 360;
  }
  OD.addSubject = function (data) {
    var name = (data && data.name ? String(data.name) : '').trim();
    if (!name) return null;
    var s = {
      id: OD.uid('sub'), name: name, short: (data && data.short) || name.slice(0, 2),
      perWeek: (data && data.perWeek) || 2, minutes: (data && data.minutes) || 90,
      active: true, hue: (data && data.hue != null) ? data.hue : nameHue(name)
    };
    db.subjects.push(s); OD.save(); return s;
  };
  OD.removeSubject = function (id) {
    var n = db.subjects.length;
    db.subjects = db.subjects.filter(function (s) { return s.id !== id; });
    if (db.subjects.length !== n) OD.save();
    return db.subjects;
  };
  OD.ensureSubject = function (name) {
    var key = String(name == null ? '' : name).trim();
    if (!key) return '';
    var found = db.subjects.filter(function (s) { return s.name === key || s.short === key; })[0];
    if (!found) found = OD.addSubject({ name: key });
    return found ? found.id : '';
  };

  OD.course = function (id) { return db.courses.filter(function (c) { return c.id === id; })[0] || null; };
  OD.goal = function (id) { return db.goals.filter(function (g) { return g.id === id; })[0] || null; };

  /* ── 成績／年級換算 ─────────────────────────────────────── */
  var GRADE_POINTS = { 'A+': 4.3, 'A': 4, 'A-': 3.7, 'B+': 3.3, 'B': 3, 'B-': 2.7, 'C+': 2.3, 'C': 2, 'C-': 1.7, 'D': 1, 'F': 0 };
  OD.gradePoint = function (g) {
    var k = String(g == null ? '' : g).trim();
    return GRADE_POINTS[k] != null ? GRADE_POINTS[k] : null;
  };
  OD.gpa = function () {
    var pts = 0, cr = 0;
    db.courses.forEach(function (c) {
      var p = OD.gradePoint(c.grade); if (p == null || !c.credits) return;
      pts += p * c.credits; cr += c.credits;
    });
    return cr ? Math.round(pts / cr * 100) / 100 : 0;
  };
  OD.creditsOf = function (pred) {
    return db.courses.filter(pred).reduce(function (s, c) { return s + (c.credits || 0); }, 0);
  };
  var YEAR_CN = { '一': 1, '二': 2, '三': 3, '四': 4 };
  OD.semYear = function (sem) {
    var m = /大\s*([一二三四])/.exec(String(sem == null ? '' : sem));
    return m ? YEAR_CN[m[1]] : 0;
  };
  OD.yearLabel = function (sem) {
    var y = OD.semYear(sem);
    return y ? '大' + ['', '一', '二', '三', '四'][y] : String(sem == null ? '' : sem);
  };
  OD.currentYear = function () { return OD.semYear(db.currentSemester) || 3; };
  OD.student = function () { return db.student; };

  OD.tasksOn = function (iso) {
    return db.tasks.filter(function (t) { return t.date === iso; })
      .sort(function (a, b) { return String(a.start).localeCompare(String(b.start)); });
  };
  OD.weekTasks = function (iso) {
    var days = OD.weekDates(iso || OD.today);
    return db.tasks.filter(function (t) { return days.indexOf(t.date) > -1; });
  };
  OD.coverageFor = function (sid) {
    var s = OD.subject(sid); if (!s) return { done: 0, target: 0 };
    var days = OD.weekDates(OD.today);
    var done = db.tasks.filter(function (t) { return t.sid === sid && t.done && days.indexOf(t.date) > -1; }).length;
    return { done: done, target: s.active ? s.perWeek : 0, active: s.active, subject: s };
  };
  OD.coverage = function () {
    var done = 0, target = 0, unmet = [], rows = [];
    db.subjects.filter(function (s) { return s.active; }).forEach(function (s) {
      var c = OD.coverageFor(s.id);
      done += c.done; target += c.target;
      rows.push({ sid: s.id, name: s.name, done: c.done, target: c.target, short: c.done < c.target });
      if (c.done < c.target) unmet.push(s.id);
    });
    return { done: done, target: target, pct: target ? Math.round(done / target * 100) : 0, unmet: unmet, rows: rows };
  };
  OD.graduation = function () {
    var g = db.graduationRequirements, earned = {}, auto = 0;
    db.courses.forEach(function (c) { if (c.grade) { earned[c.category] = (earned[c.category] || 0) + c.credits; auto += c.credits; } });
    var cats = db.categories.map(function (cat) {
      return { id: cat.id, name: cat.name, need: cat.need, earned: earned[cat.id] || 0, missing: Math.max(0, cat.need - (earned[cat.id] || 0)) };
    });
    return { totalNeed: g.totalNeed, earned: auto, categories: cats, imported: g.imported, fileName: g.fileName, parseResult: g.parseResult };
  };
  OD.thisWeekLoad = function () {
    return OD.weekTasks().filter(function (t) { return !t.done; }).reduce(function (s, t) { return s + t.minutes; }, 0);
  };

  /* ── 事件：action / change / input 委派 ─────────────────── */
  var handlers = {}, evs = {};
  OD.on = function (a, fn) { handlers[a] = fn; };
  OD.listen = function (n, fn) { (evs[n] = evs[n] || []).push(fn); };
  OD.emit = function (n, p) { (evs[n] || []).forEach(function (fn) { fn(p); }); };
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]'); if (!el) return;
    var a = el.getAttribute('data-action');
    if (a === 'modal-close') { OD.closeModal(); return; }
    if (a === 'nav') { return; }
    if (handlers[a]) handlers[a](el, e);
  });
  document.addEventListener('change', function (e) {
    var el = e.target.closest('[data-change]'); if (!el) return;
    var a = el.getAttribute('data-change'); if (handlers[a]) handlers[a](el, e);
  });
  document.addEventListener('input', function (e) {
    var el = e.target.closest('[data-input]'); if (!el) return;
    var a = el.getAttribute('data-input'); if (handlers[a]) handlers[a](el, e);
  });

  /* ── Toast ──────────────────────────────────────────────── */
  OD.toast = function (msg) {
    var root = OD.$('#toastRoot'); if (!root) return;
    var d = document.createElement('div'); d.className = 'toast'; d.textContent = msg;
    root.appendChild(d);
    setTimeout(function () { d.classList.add('out'); setTimeout(function () { d.remove(); }, 320); }, 2400);
  };

  /* ── Modal ──────────────────────────────────────────────── */
  OD.closeModal = function () { var r = OD.$('#modalRoot'); if (r) r.innerHTML = ''; document.removeEventListener('keydown', escClose); };
  function escClose(e) { if (e.key === 'Escape') OD.closeModal(); }
  OD.modal = function (o) {
    var root = OD.$('#modalRoot'); if (!root) return null;
    root.innerHTML =
      '<div class="scrim" data-static="' + (o.static ? '1' : '') + '">' +
        '<div class="modal' + (o.wide ? ' modal-lg' : '') + '" role="dialog" aria-modal="true">' +
          '<div class="modal-head"><div><h2>' + o.title + '</h2>' + (o.sub ? '<div class="sub">' + o.sub + '</div>' : '') + '</div>' +
            '<button class="btn btn-ghost btn-icon" data-action="modal-close" aria-label="關閉">' +
              '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
          '</div>' +
          '<div class="modal-body">' + o.body + '</div>' +
          (o.foot ? '<div class="modal-foot">' + o.foot + '</div>' : '') +
        '</div>' +
      '</div>';
    var scrim = OD.$('.scrim', root);
    scrim.addEventListener('click', function (e) { if (e.target === scrim && !o.static) OD.closeModal(); });
    document.addEventListener('keydown', escClose);
    if (o.onOpen) o.onOpen(OD.$('.modal', root));
    return OD.$('.modal', root);
  };

  /* ── Sidebar 導覽 ───────────────────────────────────────── */
  var ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.2V21h13V9.2"/><path d="M9.5 21v-6h5v6"/>',
    courses: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v14H6.5A2.5 2.5 0 0 0 4 19.5z"/><path d="M4 5.5v14"/><path d="M8 7.5h8"/>',
    achievements: '<circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5"/>',
    diagnosis: '<circle cx="12" cy="12" r="8.2"/><circle cx="12" cy="12" r="3.4"/>',
    explore: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5.5-5.5 2 2-5.5z"/>',
    resource: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v14H6.5A2.5 2.5 0 0 0 4 19.5z"/><path d="M4 5.5v14"/><path d="M8 7.5h8"/>',
    resume: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
    recap: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><path d="m6.5 6.5 2 2M15.5 15.5l2 2M17.5 6.5l-2 2M8.5 15.5l-2 2"/><circle cx="12" cy="12" r="3"/>'
  };
  OD.NAV = [
    { id: 'home', label: '首頁', sub: '日誌 × 任務', href: 'index.html' },
    { id: 'courses', label: '修課與畢業', href: 'courses.html' },
    { id: 'achievements', label: '學習歷程', href: 'achievements.html' },
    { id: 'resume', label: '簡歷', href: 'resume.html' },
    { id: 'recap', label: '年度回顧', href: 'recap.html' }
  ];
  var NAV_PARENT = { diagnosis: 'achievements', explore: 'achievements', resource: 'achievements' };
  function navActive(id) { return OD.page === id || NAV_PARENT[OD.page] === id; }
  OD.renderSidebar = function () {
    var host = OD.$('#sidebar'); if (!host) return;
    var s = db.student;
    function item(n, sub) {
      return '<a class="nav-item' + (sub ? ' nav-sub' : '') + '" href="' + n.href + '"' + (navActive(n.id) ? ' aria-current="page"' : '') + ' data-od-id="nav-' + n.id + '">' +
        '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[n.id] || '') + '</svg>' +
        '<span>' + n.label + '</span></a>';
    }
    host.innerHTML =
      '<div class="side-brand"><span class="brand-mark">習</span>' +
        '<span class="brand-text"><b>學習生涯工作台</b><span>LEARNING WORKSPACE</span></span></div>' +
      '<nav class="nav" aria-label="主要導覽">' +
        '<div class="nav-label">MY WORKSPACE</div>' +
        OD.NAV.map(function (n) {
          var out = item(n, false);
          if (n.children) out += n.children.map(function (c) { return item(c, true); }).join('');
          return out;
        }).join('') +
      '</nav>' +
      '<div class="side-foot"><div class="who"><span class="avatar">' + OD.esc(s.initials) + '</span>' +
        '<span><b>' + OD.esc(s.name) + '</b><span>' + OD.esc(s.grade + ' · ' + s.program) + '</span></span></div></div>';
  };

  /* ── Flow strip：學習成果 → 能力診斷 → 職涯探索 → 學習資源 ── */
  OD.FLOW = [
    { k: 'portfolio', label: '學習成果', href: 'achievements.html' },
    { k: 'diagnosis', label: '能力診斷', href: 'diagnosis.html' },
    { k: 'explore', label: '職涯探索', href: 'explore.html' },
    { k: 'resource', label: '學習資源', href: 'resources.html' }
  ];
  OD.flowStrip = function (active) {
    return '<nav class="flow" data-od-id="flow-strip" aria-label="學習歷程流程">' + OD.FLOW.map(function (f, i) {
      return '<button class="flow-step' + (f.k === active ? ' is-current' : '') + '" data-action="flow" data-href="' + f.href + '"' +
        (f.k === active ? ' aria-current="step"' : '') + '>' +
        '<span class="n">' + (i + 1) + '</span>' + f.label + '</button>' +
        (i < OD.FLOW.length - 1 ? '<span class="flow-sep" aria-hidden="true">→</span>' : '');
    }).join('') + '</nav>';
  };
  OD.on('flow', function (el) {
    var href = el.getAttribute('data-href') || '';
    var file = href.split('#')[0];
    var here = location.pathname.split('/').pop() || 'index.html';
    if (file && file.toLowerCase() !== here.toLowerCase()) { location.href = href; return; }
    var t = OD.$('[data-od-id="' + (href.split('#')[1] || '') + '"]');
    if (t) window.scrollTo({ top: Math.max(0, t.getBoundingClientRect().top + window.pageYOffset - 90), behavior: 'smooth' });
  });
  window.addEventListener('load', function () {
    var h = location.hash.replace('#', '');
    if (!h) return;
    var t = OD.$('[data-od-id="' + h + '"]');
    if (t) setTimeout(function () { window.scrollTo({ top: Math.max(0, t.getBoundingClientRect().top + window.pageYOffset - 90), behavior: 'smooth' }); }, 60);
  });

  /* ── Appbar ─────────────────────────────────────────────── */
  OD.appbar = function (o) {
    var host = OD.$('#appbar'); if (!host) return;
    host.innerHTML =
      '<div><h1 data-od-id="page-title">' + o.title + '</h1>' + (o.sub ? '<div class="sub">' + o.sub + '</div>' : '') + '</div>' +
      '<div class="appbar-actions">' + (o.actions || '') + '</div>';
  };

  /* ── 語音輸入（全站右下角；僅 UI 模擬，不串接語音 API） ─── */
  var voice = { timer: null, sec: 0, onTask: null, target: null, listening: false, checked: [], date: null, heard: '' };
  OD.MOCK_SPEECH = '今天線性代數讀完第三章，但是習題還沒做完。';

  /* heard 有值就代表「已經辨識好了」：視窗一開就是文字那一步，不必再按停止。
     FAB 按下去直接錄音（見下面的錄音鍵）之後，接手的就是這一條。 */
  OD.openVoice = function (opts) {
    opts = opts || {};
    voice.target = opts.target || null;
    voice.onTask = opts.onTask || null;
    voice.checked = [];
    voice.date = opts.date || OD.today;
    voice.sec = 0;
    voice.heard = opts.heard || '';
    renderVoice(voice.heard ? 'text' : 'listen');
  };
  /* mode：'listen' 從頭開始聽，'text' 直接跳到辨識完成那一步 */
  function renderVoice(mode) {
    if (mode === 'listen') voice.heard = '';
    var body =
      '<div class="rec"><span class="rec-dot"></span>' +
        '<div class="grow"><b id="vState">正在聆聽……</b><div class="meta" id="vTimer">00:00</div></div>' +
        '<div class="wave">' + '<i style="animation-delay:0s"></i><i style="animation-delay:.12s"></i><i style="animation-delay:.24s"></i><i style="animation-delay:.36s"></i><i style="animation-delay:.18s"></i><i style="animation-delay:.3s"></i>' + '</div>' +
      '</div>' +
      '<div class="field"><label>辨識結果（可編輯）</label><textarea class="textarea" id="vText" placeholder="停止後會顯示模擬的語音轉文字結果…" disabled></textarea></div>' +
      '<div class="field" id="vSuggest" hidden><label>任務建議（依辨識內容）</label><div class="opt-list" id="vSuggestList"></div></div>' +
      '<div class="meta">此為 Prototype，未串接任何語音辨識服務。</div>';
    OD.modal({
      title: '語音輸入',
      sub: '模擬語音轉文字流程',
      body: body,
      foot: '<button class="btn btn-secondary" data-action="voice-restart">重新錄音</button>' +
            '<button class="btn btn-primary" data-action="voice-stop" id="vStop">停止並轉文字</button>',
      onOpen: function () { if (mode === 'text') showTranscript(voice.heard); else startRec(); }
    });
    OD.on('voice-restart', function () { renderVoice('listen'); });
    OD.on('voice-stop', function () { showTranscript(OD.MOCK_SPEECH); });
    OD.on('voice-fill', function () {
      var v = OD.$('#vText').value, n = voiceCommitTasks();
      OD.closeModal();
      OD.emit('refresh');
      var el = OD.$(voice.target);
      if (el) { el.value = (el.value ? el.value.replace(/\s*$/, '') + '\n' : '') + v; el.dispatchEvent(new Event('input', { bubbles: true })); }
      OD.toast(n ? '已加入 ' + n + ' 個任務，並將內容放入文字框' : '已將語音內容放入文字框');
      OD.emit('voiceFilled', { text: v, target: voice.target });
    });
    OD.on('voice-journal', function () {
      var v = OD.$('#vText').value, n = voiceCommitTasks();
      OD.closeModal();
      OD.addJournal(v, voice.date || OD.today);
      OD.toast(n ? '已加入 ' + n + ' 個任務與今日日誌' : '已加入今日日誌');
      OD.emit('refresh');
    });
    OD.on('voice-task', function () {
      var v = OD.$('#vText').value; OD.closeModal();
      if (OD.page === 'home' && voice.onTask) { voice.onTask(v); return; }
      try { localStorage.setItem('shiji:pendingTask', v); } catch (e) {}
      location.href = 'index.html?newGoal=1';
    });
    OD.on('voice-toggle-suggest', function (el) {
      var i = +el.getAttribute('data-idx');
      var at = voice.checked.indexOf(i);
      if (at > -1) voice.checked.splice(at, 1); else voice.checked.push(i);
      renderVoiceSuggest();
    });
  }
  /* 辨識完成之後的那一步：文字放進可以編輯的框、依內容給任務建議、把底下那顆鈕
     換成真正要做的事。在視窗裡按「停止並轉文字」與 FAB 錄完自動接手，走的都是
     這裡，兩條路看到的結果一定一樣。 */
  function showTranscript(text) {
    stopTicker();
    voice.heard = text || OD.MOCK_SPEECH;
    var ta = OD.$('#vText'); if (ta) { ta.disabled = false; ta.value = voice.heard; }
    var s = OD.$('#vState'); if (s) s.textContent = '辨識完成';
    var t = OD.$('#vTimer'); if (t) t.textContent = '已停止';
    renderVoiceSuggest();
    var f = OD.$('.modal-foot'); if (!f) return;
    f.innerHTML = (voice.target ? '<button class="btn btn-secondary" data-action="voice-restart">重新錄音</button>' : '') +
      '<button class="btn btn-primary" id="vPrimary" data-action="' + (voice.target ? 'voice-fill' : 'voice-journal') + '">' +
      voiceFootLabel() + '</button>';
  }
  function voiceFootLabel() {
    var base = voice.target ? '放入文字框' : '加入日誌';
    return voice.checked.length ? '加入任務並' + base : base;
  }
  function updateVoicePrimary() {
    var b = OD.$('#vPrimary'); if (b) b.textContent = voiceFootLabel();
  }
  function voiceCommitTasks() {
    if (!voice.checked.length) return 0;
    var items = voiceSuggestions(), n = 0;
    voice.checked.slice().sort(function (a, b) { return a - b; }).forEach(function (i) {
      var it = items[i]; if (!it) return;
      db.tasks.push({
        id: OD.uid('k'), date: voice.date || OD.today, start: '', end: '',
        sid: OD.ensureSubject(it.subject || ''), title: it.title, kind: it.kind,
        minutes: it.minutes, done: false, type: 'time', source: 'voice'
      });
      n++;
    });
    OD.save(); voice.checked = [];
    return n;
  }
  function voiceSuggestions() {
    /* 建議是從「剛剛聽到的內容」長出來的，不是從寫死的那一句 */
    var text = voice.heard || OD.MOCK_SPEECH || '', name = '', chapter = '';
    (OD.db.subjects || []).forEach(function (s) { if (!name && s.name && text.indexOf(s.name) > -1) name = s.name; });
    var m = text.match(/第[一二三四五六七八九十0-9]+章/);
    if (m) chapter = m[0];
    var base = (name || '今天的學習內容') + (chapter ? ' ' + chapter : '');
    return [
      { title: '完成' + base + '習題', subject: name, kind: '練習', minutes: 60, desc: '把還沒做完的練習排進今天的空檔' },
      { title: '複習' + base + '重點', subject: name, kind: '複習', minutes: 30, desc: '趁記憶猶新，整理關鍵概念與例題' }
    ];
  }
  function renderVoiceSuggest() {
    var wrap = OD.$('#vSuggest'), list = OD.$('#vSuggestList');
    if (!wrap || !list) return;
    list.innerHTML = voiceSuggestions().map(function (it, i) {
      var on = voice.checked.indexOf(i) > -1;
      return '<button type="button" class="opt is-check' + (on ? ' is-active' : '') + '" data-action="voice-toggle-suggest" data-idx="' + i + '" aria-pressed="' + (on ? 'true' : 'false') + '">' +
        '<span class="opt-mark" aria-hidden="true"></span><span class="grow"><span class="opt-k">' + OD.esc(it.title) + '</span>' +
        '<div class="opt-d">' + it.kind + ' · 約 ' + it.minutes + ' 分　·　' + OD.esc(it.desc) + '</div></span>' +
        '<span class="opt-badge">' + (on ? '已勾選' : '') + '</span></button>';
    }).join('');
    wrap.hidden = false;
    updateVoicePrimary();
  }
  function mmss(sec) {
    return ('0' + Math.floor(sec / 60)).slice(-2) + ':' + ('0' + Math.floor(sec % 60)).slice(-2);
  }
  function startRec() {
    stopTicker(); voice.sec = 0;
    var t = OD.$('#vTimer'), s = OD.$('#vState');
    if (s) s.textContent = '正在聆聽……';
    if (t) t.textContent = '00:00';
    voice.timer = setInterval(function () {
      voice.sec++;
      if (t) t.textContent = mmss(voice.sec);
    }, 1000);
  }
  function stopTicker() { if (voice.timer) clearInterval(voice.timer); voice.timer = null; }
  function closeVoice() { stopTicker(); OD.closeModal(); }

  /* ── 錄音鍵：FAB 按下去就開始錄，錄完自己接上語音輸入 ──────────
     這裡仍是 UI 模擬，沒有真的開麥克風：辨識結果就是 OD.MOCK_SPEECH，
     照著唸話的速度一個字一個字顯示出來，看起來像邊講邊出字。時間到了、
     或再按一下，就停止並把文字交給語音輸入那一步——使用者不必先開視窗
     再自己按一次停止。 */
  var rec = { timer: null, ms: 0 };
  function recNodes() {
    return { host: OD.$('#voiceRoot'), time: OD.$('#fabRecTime'), text: OD.$('#fabRecText') };
  }
  /* 一句話唸完要多久：照字數估。太快像跳字，太慢讓人空等 */
  function recTotal() { return Math.min(5200, Math.max(2400, (OD.MOCK_SPEECH || '').length * 160)); }
  function recLabel(on) {
    var b = OD.$('[data-od-id=voice-fab]'); if (!b) return;
    b.setAttribute('aria-label', on ? '停止錄音' : '語音輸入');
    b.setAttribute('title', on ? '停止錄音' : '語音輸入');
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
  function beginRec() {
    var n = recNodes(); if (!n.host) return;
    endRecTimer();
    rec.ms = 0;
    var total = recTotal(), full = OD.MOCK_SPEECH || '';
    n.host.classList.add('is-rec');
    recLabel(true);
    if (n.time) n.time.textContent = '00:00';
    if (n.text) n.text.textContent = '';
    rec.timer = setInterval(function () {
      rec.ms += 100;
      if (n.time) n.time.textContent = mmss(rec.ms / 1000);
      if (n.text) n.text.textContent = full.slice(0, Math.floor(rec.ms / total * full.length));
      if (rec.ms >= total) finishRec();
    }, 100);
  }
  function endRecTimer() { if (rec.timer) clearInterval(rec.timer); rec.timer = null; }
  /* 停止錄音 → 直接接上語音輸入：辨識好的文字一起帶過去，視窗一開就是那一步 */
  function finishRec() {
    endRecTimer();
    var n = recNodes();
    if (n.host) n.host.classList.remove('is-rec');
    if (n.text) n.text.textContent = '';
    recLabel(false);
    OD.openVoice({ heard: OD.MOCK_SPEECH });
  }
  function toggleRec() {
    /* 跳出視窗的時候不錄：遮罩底下可能正開著一張填到一半的表單，
       這時候接手過去會把它蓋掉。錄音只在乾淨的頁面上發生。 */
    if (OD.$('.scrim')) return;
    if (rec.timer) finishRec(); else beginRec();
  }

  OD.addJournal = function (text, date) {
    if (!text) return;
    db.journals.push({ id: OD.uid('j'), date: date || OD.today, time: OD.nowHM(), text: text });
    OD.save();
  };

  /* ── 語音 FAB：可拖移，位置記憶於本機 ───────────────────── */
  var FAB_KEY = 'shiji:fabPos';
  function initFab(host) {
    host.classList.add('fab-dock');
    var M = 12, down = false, moved = false, pid = null, sx = 0, sy = 0, ox = 0, oy = 0;
    function clamp(v, lo, hi) { return Math.max(lo, Math.min(v, hi)); }
    /* 手機時側欄是固定在底部的標籤列，語音鈕不能停在它後面 */
    function bottomGap() {
      var bar = OD.$('.sidebar'); if (!bar) return M;
      if (getComputedStyle(bar).position !== 'fixed') return M;
      var r = bar.getBoundingClientRect();
      if (r.height <= 0 || r.top < window.innerHeight * 0.5) return M;
      return (window.innerHeight - r.top) + M;
    }
    function place(l, t) {
      var w = host.offsetWidth || 58, h = host.offsetHeight || 58;
      var gap = bottomGap();
      l = clamp(l, M, Math.max(M, window.innerWidth - w - M));
      t = clamp(t, M, Math.max(M, window.innerHeight - h - gap));
      host.style.left = l + 'px'; host.style.top = t + 'px';
      host.style.right = 'auto'; host.style.bottom = 'auto';
      /* 鈕被拖到畫面上半部時，錄音面板改成往下長，不然會被視窗切掉 */
      host.classList.toggle('is-rec-down', t < 140);
      return { left: Math.round(l), top: Math.round(t) };
    }
    function persist(p) { try { localStorage.setItem(FAB_KEY, JSON.stringify(p)); } catch (e) {} }
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(FAB_KEY)); } catch (e) {}
    if (saved && typeof saved.left === 'number' && typeof saved.top === 'number') place(saved.left, saved.top);

    host.addEventListener('pointerdown', function (e) {
      if (e.button) return;
      pid = e.pointerId; down = true; moved = false;
      sx = e.clientX; sy = e.clientY;
      var r = host.getBoundingClientRect(); ox = r.left; oy = r.top;
      try { host.setPointerCapture(pid); } catch (err) {}
    });
    host.addEventListener('pointermove', function (e) {
      if (!down || e.pointerId !== pid) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (!moved && Math.abs(dx) + Math.abs(dy) < 5) return;
      moved = true; host.classList.add('is-dragging');
      place(ox + dx, oy + dy);
      e.preventDefault();
    });
    function end(e) {
      if (!down || (e && e.pointerId !== pid)) return;
      down = false; host.classList.remove('is-dragging');
      try { host.releasePointerCapture(pid); } catch (err) {}
      if (moved) {
        persist({ left: parseFloat(host.style.left), top: parseFloat(host.style.top) });
        host.addEventListener('click', function (ev) { ev.stopPropagation(); ev.preventDefault(); }, { capture: true, once: true });
      }
    }
    host.addEventListener('pointerup', end);
    host.addEventListener('pointercancel', end);
    window.addEventListener('resize', function () {
      if (host.style.left) persist(place(parseFloat(host.style.left), parseFloat(host.style.top)));
    });
  }

  /* ── 開機 ───────────────────────────────────────────────── */
  OD.boot = function () {
    OD.renderSidebar();
    var host = OD.$('#voiceRoot');
    if (host) {
      host.innerHTML =
        '<span class="fab-label">語音輸入</span>' +
        /* 錄音時才從鈕旁邊長出來的小面板：計時、呼吸的紅點、邊講邊出的字 */
        '<div class="fab-rec" id="fabRec" role="status" aria-live="polite">' +
          '<span class="rec-dot" aria-hidden="true"></span>' +
          '<span class="fab-rec-body"><b id="fabRecTime">00:00</b><span id="fabRecText"></span></span>' +
        '</div>' +
        '<button class="fab" data-action="voice-open" data-od-id="voice-fab" title="語音輸入" aria-label="語音輸入" aria-pressed="false">' +
          '<svg class="ico ico-mic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></svg>' +
          '<svg class="ico ico-stop" viewBox="0 0 24 24" aria-hidden="true"><rect x="7.5" y="7.5" width="9" height="9" rx="2" fill="currentColor"/></svg>' +
        '</button>';
      initFab(host);
    }
    /* 這顆鈕就是錄音鍵：按下去直接錄，錄完自己接語音輸入 */
    OD.on('voice-open', toggleRec);
    OD.on('mic', function (el) { OD.openVoice({ target: el.getAttribute('data-target') || null }); });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', OD.boot);
  else OD.boot();
})();
