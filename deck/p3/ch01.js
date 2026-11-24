/* 파트 3 · 1장 「본부장의 질문: 민원인이 직접 쓸 수 있습니까」. 원고 plan/slides/p3-ch01.json, 배정표 plan/assets/p3_layout_ch01.md.
 * 테마 「주황 면」(deck/themes/p3.md). 색은 CSS 변수와 테마 부품으로만 쓴다. 연두는 s03 의 조건 이행 체크(승인 기록의 조건)에만 쓴다.
 * 레이아웃: s01 L0 · s02 L7 · s03 L12 · s04 L11 · s05 L3 · s06 L1 · s07 L9 · s08 L4.
 * 장마다 강조 한 곳(주황 면 또는 100px 이상의 글자)을 둔다. 장 제목은 72px(THEME.pageTitle).
 * 키 누름은 s04(퀴즈 정답) 한 번뿐이다. 나머지 장은 키 없이 3.5초 안에 끝 상태가 된다.
 * 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다. */
(function () {
  'use strict';
  const { ease, prog, css, h } = REEL;
  const TH = window.THEME;
  DECK.config({ part: 'p3', chapter: 'ch01', title: '본부장의 질문: 민원인이 직접 쓸 수 있습니까' });
  const CH = '본부장의 질문: 민원인이 직접 쓸 수 있습니까';   // 머리말 챕터 제목

  // 강사 메모: 원고의 notes 를 그대로 옮겼다
  const NOTES = /*NOTES*/{
    "p3-ch01-s01": "파트 3을 시작하겠습니다. 파트 2에서는 규정을 근거로 답하는 민원 상담 프로젝트를 ChatGPT Plus만으로 만들고, 시험하고, 승인받았습니다. 파트 2의 답은 「만들 수 있다, 조건은 좁은 범위, 시험표, 검토자, 승인 기록이다」였습니다. 파트 3의 질문은 화면에 적은 대로, 이 프로젝트를 민원인이 누리집에서 쓰는 서비스로 만들려면 무엇이 더 필요하고 그 일을 누가 하느냐입니다. 이 질문은 윤지영 본부장의 질문 하나에서 시작합니다.",
    "p3-ch01-s02": "파트 2 11장에서 고객지원팀 회의에 들어온 경영지원본부 윤지영 본부장이 민원 상담 프로젝트 시연을 보았습니다. 화면의 대사는 시연이 끝난 뒤 본부장이 한 질문입니다. 민원인이 직접 쓸 수 있느냐는 질문이고, 이 챕터의 제목입니다. 이 프로젝트를 공단 누리집에서 민원인이 쓰게 할 수 있느냐는 뜻입니다. 이 강의에 나오는 새별시설공단, 새별시, 등장인물, 규정, 민원, 수치는 모두 실습을 위해 만든 가상 사례입니다. 실제 기관이나 인물과 관계가 없습니다.",
    "p3-ch01-s03": "한서윤 주임은 질문에 답하기 전에 2주 시범 운영부터 보고합니다. 보고의 기준은 파트 2 10장에서 오민석 팀장이 승인하며 붙인 조건입니다. 시범은 그 조건대로 ChatGPT 화면에서 시험 12개를 다시 돌려 11개 이상 통과한 뒤 시작했습니다. 조건을 하나씩 확인합니다. 담당자 4명만 민원 상담 프로젝트를 썼고, 금액을 안내하는 답변은 모두 발송 전에 담당자가 규정 원문과 대조했습니다. 처리 건수나 줄어든 시간 같은 숫자로 보고하지 않는 것은 승인할 때 건 조건이 숫자가 아니라 지킬 일이었기 때문입니다.",
    "p3-ch01-s04": "파트 2 10장에서 공유 범위를 정할 때 본 프로젝트 공유 링크를 공단 누리집에 걸면 될까요? 된다고 보시는 분, 안 된다고 보시는 분 차례로 손을 들어 주십시오. 키를 누르면 답이 나오고, 답은 안 된다입니다. 2026년 11월 OpenAI 도움말을 보면 링크로 들어오는 사람은 로그인한 ChatGPT 사용자이고, 대화 권한만 줘도 프로젝트의 지침과 파일이 보입니다. 같은 도움말에는 Plus 소유자가 둘 수 있는 협업자가 10명까지로 나와 있습니다. 협업자는 프로젝트에 초대받아 함께 쓰는 사람이라, 민원인 수만큼 초대할 수 없습니다. (강사 확인: 링크 참여 조건, 대화 권한, 협업자 수는 OpenAI 도움말 한 곳에만 있는 내용입니다(F-13). 강의 전날 같은 문서를 다시 열어 보고, 바뀌었으면 화면의 줄과 이 메모를 고칩니다. 협업자 수는 화면에 싣지 않습니다.)",
    "p3-ch01-s05": "한서윤 주임이 본부장에게 답하려고 프로젝트와 서비스의 차이를 여섯 가지로 적었습니다. 왼쪽이 지금, 오른쪽이 서비스입니다. 화면은 ChatGPT 화면에서 공단 누리집으로, 쓰는 사람은 초대한 담당자 4명에서 처음 오는 민원인으로 바뀝니다. 지금은 상담 기록이 공단에 남지 않지만 서비스에서는 공단이 보관해야 하고, 개인정보도 담당자가 지우고 넣던 것을 민원인이 직접 씁니다. 비용은 구독 요금 안에서 쓰던 것이 바뀌어, 서비스 안에서 AI가 답하는 데 드는 AI 호출 요금이 Plus와 따로 청구됩니다. 운영은 팀 안의 2주 시범에서 공단 이름으로 늘 여는 서비스로 바뀌므로, 규정이 바뀌거나 답이 틀렸을 때 고칠 사람이 있어야 합니다. (화면에서 지운 기준 시점: 「AI 호출 요금 · 2026년 11월 기준」)",
    "p3-ch01-s06": "여섯 가지를 적고 나면 파트 3 질문의 뒷부분, 이 일을 누가 하느냐가 남습니다. 한서윤 주임은 입사 4년 차이고 개발 경험이 없습니다. 웹 화면을 직접 만들어 본 분은 손을 들어 주십시오. 파트 3에서는 이 일을 한서윤 주임이 ChatGPT로 직접 만드는 부분, 에이전트 팀에 맡기는 부분, 사람이 정하는 부분으로 나눠 봅니다. 에이전트 팀은 파트 1 8장에서 본 대로 Claude Code에서 역할마다 에이전트 파일을 두고 여러 에이전트가 일을 나눠 맡게 한 것입니다. 그 결과를 사람이 확인하고 다음으로 넘어갈지 정하는 자리를 승인 지점이라고 부릅니다.",
    "p3-ch01-s07": "파트 3에는 실습 2개와 강사 시연 2개가 있습니다. 3장에서 여러분은 수강료 환불과 주차 요금 계산, 질문 검색이 되는 민원 안내 화면을 직접 만듭니다. ChatGPT Work로 만들고, 되지 않으면 Chat에서 받은 HTML 파일로 같은 화면을 엽니다. 4장은 그 화면에 서버와 AI 답변, 기록 저장을 더하는 일을 파트 1 8장에서 본 Claude Code의 에이전트 팀에 맡기는 강사 시연이고, 서버는 2장에서 봅니다. 7장은 안내 포스터와 안내 영상을 만드는 강사 시연이고, 8장에서는 여러분 업무의 승인 지점 표를 직접 만듭니다. 번호만 적은 작은 칸은 구성 요소(2장), 승인 지점 8곳(5장), 오픈 전 점검(6장), 정리(9장)입니다.",
    "p3-ch01-s08": "서비스가 한서윤 주임이 적은 여섯 가지를 갖추려면 프로젝트 바깥에 무엇이 있어야 할까요? 프로젝트 바깥에 있어야 한다는 말은, ChatGPT 프로젝트에 없어서 따로 만들어야 한다는 뜻입니다. 화면 오른쪽의 빈 칸 다섯 개에는 아직 이름이 없습니다. 2장에서는 민원인의 질문 한 건이 화면에서 기록 저장까지 지나가는 경로를 따라가며 이 다섯 칸이 무엇인지 봅니다. 칸의 이름이 정해지면 파트 3 질문의 뒷부분, 그 일을 누가 하느냐로 돌아갑니다. 아래 주황 줄에 적은 세 가지대로, 3장에서는 한서윤 주임이 직접 만들 수 있는 데까지 만들고, 4장에서는 서버와 AI 답변, 기록 저장을 에이전트 팀에 맡기고, 5장에서는 사람이 어느 지점에서 무엇을 정하는지 봅니다."
  }/*END*/;

  const tx = (tag, cls, parent, text, style) => { const e = h(tag, cls, parent); if (text != null) e.textContent = text; if (style) css(e, style); return e; };
  const HD = el => TH.header(el, { chapter: 1, title: CH, fiction: true });
  // 왼쪽부터 펼쳐지는 면(clip-path)
  const openL = (e, lt, at, dur = 0.6, r = 16) => { const p = prog(lt, at, dur, ease.outQuart); e.style.clipPath = p < 1 ? `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0 round ${r}px)` : 'none'; };
  // 가로로 펼쳐지는 선
  const growX = (e, lt, at, dur = 0.6) => { e.style.transform = `scaleX(${prog(lt, at, dur, ease.outQuart).toFixed(4)})`; };
  const rule = (el, x, y, w, color, hgt = 2) => tx('div', 'a', el, null, { left: x + 'px', top: y + 'px', width: w + 'px', height: hgt + 'px', background: color, transformOrigin: '0 50%', transform: 'scaleX(0)' });

  // ── s01 L0 영상 띠 전환(파트 인트로) ── 위쪽에 인트로 영상 p3-intro(정방향, 흑백), 아래 주황 띠에 제목 두 줄(120px)과 파트 질문
  DECK.slide({
    id: 'p3-ch01-s01', dur: 3.0, steps: [], notes: NOTES['p3-ch01-s01'],
    setup(el) {
      // at 0.4: 띠가 0.2초에 올라오기 시작한다(띠는 at − 0.2 에 움직인다)
      this.vt = TH.videoTitle(el, {
        kind: 'intro', kicker: '파트 3', at: 0.4,
        src: '../assets/video/p3/p3-intro.mp4', poster: '../assets/video/p3/p3-intro.jpg',
        title: '프로젝트에서 서비스로:\n에이전트 팀과 승인 지점',
        sub: 'ChatGPT 안의 프로젝트를 민원인이 누리집에서 쓰는 서비스로 만들려면 무엇이 더 필요하고, 그 일을 누가 하는가',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // ── s02 L7 인물과 대사 ── 윤지영 본부장의 고리(지름 200)와 대사 168px 두 줄이 화면 폭을 쓴다. 대사 아래 보조 줄과 한서윤 주임
  DECK.slide({
    id: 'p3-ch01-s02', dur: 3.0, steps: [], notes: NOTES['p3-ch01-s02'],
    setup(el) {
      this.bg = TH.bg(el, 'base'); this.hd = HD(el);
      // 큰 대사는 줄 사이를 좁힌다(이 장에만 적용. 제목 막대 위치를 재기 전에 넣는다)
      tx('style', '', el, 'section[data-slide="p3-ch01-s02"] .p3-quote .p3-title { line-height: 1.08; }');
      this.tt = TH.pageTitle(el, '본부장이 누리집 공개를 묻습니다');
      const D = 200, QS = 168, TOP = 262;
      this.qt = TH.quote(el, { who: '윤지영', x: 120, y: 300, d: D, size: QS, label: '본부장의 질문', text: '민원인이 직접\n쓸 수 있습니까?',
        sub: '민원 상담 프로젝트 시연을 본 뒤의 질문', at: 0.5 });
      const qb = this.qt.el, who = el.querySelector('.p3-quote-who'), tt = this.qt.title.el;
      css(qb.querySelector('.p3-quote-label'), { fontSize: '34px' });
      css(qb.querySelector('.p3-quote-sub'), { fontSize: '40px', marginTop: '24px' });
      css(who.querySelector('.p3-quote-org'), { fontSize: '34px', marginTop: '8px' });
      // 고리가 작아졌으므로 기호 칸도 줄인다
      const gb = who.querySelector('.p3-person-glyph'), gs = gb.querySelector('svg');
      css(gb, { width: '64px', height: '64px' }); gs.setAttribute('width', '38'); gs.setAttribute('height', '38');
      // 대사 상자 위 끝은 장 제목 아래(y 262), 고리 중심은 대사 두 줄의 세로 가운데
      qb.style.top = TOP + 'px';
      who.style.top = (TOP + tt.offsetTop + tt.offsetHeight / 2 - D / 2).toFixed(0) + 'px';
      css(qb.querySelector('.p3-quote-bar'), { top: (tt.offsetTop + 12) + 'px', height: (tt.offsetHeight - 24) + 'px' });
      this.pe = TH.person(el, { who: '한서윤', x: 570, y: TOP + qb.offsetHeight + 30, at: 1.8, org: true, nameSize: 44 });
      css(this.pe.el.querySelector('.p3-person-org'), { fontSize: '34px' });
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.qt.render(lt); this.pe.render(lt); },
  });

  // ── s03 L12 확인 목록 ── 승인 기록의 조건 두 줄(84px, 연두 체크 116). 아래 줄에 「지켰습니다」(주황 글자 200px 안팎)와 두 사람
  DECK.slide({
    id: 'p3-ch01-s03', dur: 3.2, steps: [], notes: NOTES['p3-ch01-s03'],
    setup(el) {
      this.bg = TH.bg(el, 'base'); this.hd = HD(el);
      this.tt = TH.pageTitle(el, '시범 운영 2주는 조건대로 진행했습니다');
      this.sb = tx('div', 'a', el, '보고 기준은 승인 기록의 조건입니다', { left: '120px', top: '246px', fontSize: '40px', lineHeight: '1.3', color: 'var(--dim)', whiteSpace: 'nowrap' });
      // 머리 줄: 승인 기록(왼쪽)과 시범 기간(오른쪽 끝), 아래 흰 선
      this.h1 = tx('div', 'a', el, '승인 기록 · 판정한 사람 · 오민석 팀장', { left: '120px', top: '316px', fontSize: '40px', lineHeight: '1.25', fontWeight: '800', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.h2 = tx('div', 'a', el, '시범 운영 2주', { right: '120px', top: '316px', fontSize: '40px', lineHeight: '1.25', fontWeight: '800', color: 'var(--p3-orange-text)', whiteSpace: 'nowrap' });
      this.hr = rule(el, 120, 384, 1680, 'var(--ink)', 3);
      // 목록 두 줄: y 400~700(줄 높이 150), 항목 84px, 체크 칸 116
      this.ck = TH.checklist(el, [
        { text: '담당자 4명만 사용', state: 'pass' },
        { text: '금액 안내 답변은 발송 전 담당자 대조', state: 'pass' },
      ], { x: 120, y: 400, w: 1680, rowH: 150, size: 84, box: 116, noteSide: 'below', at: 0.9, each: 0.18 });
      this.ck.rows.forEach(r => {
        css(r.tt, { display: 'inline-block', fontFamily: 'var(--display)', fontWeight: '800', letterSpacing: '-0.02em', lineHeight: '1.15', whiteSpace: 'nowrap' });
        css(r.tx, { marginLeft: '48px' });
      });
      // 아래 줄(y 716~944): 왼쪽 「지켰습니다」, 오른쪽 끝에 보고한 사람과 받은 사람(이름 44px)
      const CY = 830, PG = 64;
      this.p1 = TH.person(el, { who: '한서윤', x: 0, y: 0, at: 2.0, nameSize: 44 });
      this.p2 = TH.person(el, { who: '윤지영', x: 0, y: 0, at: 2.15, nameSize: 44 });
      const w1 = this.p1.el.offsetWidth, w2 = this.p2.el.offsetWidth, PX = 1800 - (w1 + PG + w2);
      css(this.p1.el, { left: PX + 'px', top: (CY - this.p1.el.offsetHeight / 2).toFixed(0) + 'px' });
      css(this.p2.el, { left: (PX + w1 + PG) + 'px', top: (CY - this.p2.el.offsetHeight / 2).toFixed(0) + 'px' });
      // 글자 크기: 200px 에서 재고, 두 사람 앞 80px 안에 들도록 줄인다(160px 아래로 내리지 않는다)
      const mk = size => TH.title(el, '지켰습니다', { x: 120, y: 0, size, weight: 900, exact: true, em: ['지켰습니다'], at: 1.6, style: { whiteSpace: 'nowrap' } });
      let kp = mk(200);
      const room = PX - 80 - 120;
      if (kp.el.offsetWidth > room) { const k = Math.max(160, Math.floor(200 * room / kp.el.offsetWidth)); kp.el.remove(); kp = mk(k); }
      kp.el.style.top = (CY - kp.el.offsetHeight / 2).toFixed(0) + 'px';
      this.kp = kp;
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.sb, lt, 0.5);
      TH.reveal(this.h1, lt, 0.7); TH.reveal(this.h2, lt, 0.75, { dx: 14 }); growX(this.hr, lt, 0.65, 0.7);
      this.ck.render(lt); this.kp.render(lt);
      this.p1.render(lt); this.p2.render(lt);
    },
  });

  // ── s04 L11 퀴즈(보기 둘, 자료 없음) ── 키 한 번: 「안 됩니다」 칸이 주황으로 차오르고 칸 아래쪽에 이유 두 줄(40px 검정)
  const RV4 = 1.5;
  DECK.slide({
    id: 'p3-ch01-s04', dur: RV4 + 1.4, steps: [RV4], notes: NOTES['p3-ch01-s04'],
    setup(el) {
      this.bg = TH.bg(el, 'base'); this.hd = HD(el);
      this.tt = TH.pageTitle(el, '공유 링크를 누리집에 걸면 됩니까');
      const X0 = 120, X1 = 1800, Y = 290, H = 560, GAP = 24, PAD = 44, W = (X1 - X0 - GAP) / 2;
      this.qz = TH.quiz(el, ['됩니다', '안 됩니다'], { x0: X0, x1: X1, y: Y, h: H, gap: GAP, size: 72, answer: 1, fade: 'bg', labelTop: true, pad: PAD, revealAt: RV4, at: 0.5 });
      // 정답 칸 아래쪽의 이유: 칸 밖 형제 요소(칸 아래 끝에서 40px 위)
      const nx = X0 + W + GAP + PAD;
      this.nb = tx('div', 'a', el, null, { left: nx + 'px', width: (W - 2 * PAD) + 'px', bottom: (1080 - Y - H + 40) + 'px' });
      this.nr = tx('div', '', this.nb, null, { height: '3px', background: 'var(--p3-black)', marginBottom: '22px', transformOrigin: '0 50%', transform: 'scaleX(0)' });
      this.noteEls = ['링크로 들어오는 사람은 로그인한 ChatGPT 사용자입니다', '대화 권한으로도 지침과 파일이 보입니다'].map((t, i) =>
        tx('div', '', this.nb, t, { fontSize: '40px', lineHeight: '1.32', fontWeight: '600', color: 'var(--p3-black)', wordBreak: 'keep-all', marginTop: i ? '14px' : '0' }));
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.qz.render(lt);
      growX(this.nr, lt, RV4 + 0.25, 0.5);
      this.noteEls.forEach((e, i) => TH.reveal(e, lt, RV4 + 0.3 + i * 0.12, { dx: 0, dy: 12 }));
    },
  });

  // ── s05 L3 좌우 대비(가운데 항목 열) ── 왼쪽 면 「지금」, 오른쪽 주황 면 「서비스」, 가운데 열에 항목 이름 여섯 줄(48px, 줄 높이 92). 값은 44px
  const ROWS5 = [
    ['화면', 'ChatGPT 화면', '공단 누리집'],
    ['이용자 확인', '담당자 4명', '처음 오는 민원인'],
    ['기록 저장', '남지 않음', '공단이 보관'],
    ['개인정보', '담당자가 지움', '민원인이 입력'],
    ['비용', '구독 요금 안', 'AI 호출 요금 따로'],
    ['운영', '팀 안 시범 2주', '상시 운영'],
  ];
  DECK.slide({
    id: 'p3-ch01-s05', dur: 3.0, steps: [], notes: NOTES['p3-ch01-s05'],
    setup(el) {
      this.bg = TH.bg(el, 'base'); this.hd = HD(el);
      this.tt = TH.pageTitle(el, '프로젝트와 서비스는 여섯 가지가 다릅니다');
      this.sb = tx('div', 'a', el, '한서윤 주임이 적어 본 차이', { left: '120px', top: '246px', fontSize: '40px', lineHeight: '1.3', color: 'var(--dim)', whiteSpace: 'nowrap' });
      const TOP = 300, BOT = 930, LX0 = 120, LX1 = 760, RX0 = 1160, RX1 = 1800, PAD = 48, R0 = 372, RH = 92;
      this.sp = TH.split(el, { top: TOP, bottom: BOT, x0: LX0, x1: RX1, gap: RX0 - LX1, left: { label: '지금', tone: 'panel' }, right: { label: '서비스', tone: 'orange' }, labelSize: 40, at: 0.6, rightAt: 1.0 });
      // 면 이름은 가운데 열 쪽에 붙인다: 「지금」은 왼쪽 면의 오른쪽 끝, 「서비스」는 오른쪽 면의 왼쪽 끝(y 314).
      // 머리 줄 아래 선이 면 이름 글자에 닿지 않도록 여섯 줄을 y 372 부터 줄 높이 92 로 둔다(원고는 y 354, 줄 높이 96)
      css(this.sp.leftEl.querySelector('.p3-split-label'), { left: 'auto', right: PAD + 'px', top: '14px' });
      css(this.sp.rightEl.querySelector('.p3-split-label'), { left: PAD + 'px', top: '14px' });
      this.mh = tx('div', 'a', el, '새별 민원 상담', { left: LX1 + 'px', width: (RX0 - LX1) + 'px', top: '314px', textAlign: 'center', fontSize: '40px', lineHeight: '1.3', fontWeight: '800', color: 'var(--ink)', whiteSpace: 'nowrap' });
      // 머리 줄 아래 선(세 구간)
      const seg = (y, a) => [
        rule(el, LX0 + PAD, y, LX1 - LX0 - 2 * PAD, a ? '#3A3A3A' : '#555551', a ? 2 : 3),
        rule(el, LX1 + 40, y, RX0 - LX1 - 80, a ? '#2E2E2E' : '#555551', a ? 2 : 3),
        rule(el, RX0 + PAD, y, RX1 - RX0 - 2 * PAD, a ? 'rgba(20,20,20,.28)' : 'rgba(20,20,20,.6)', a ? 2 : 3),
      ];
      this.head = seg(R0, false);
      const mid = (e, cy) => { e.style.top = (cy - e.offsetHeight / 2).toFixed(0) + 'px'; return e; };
      this.rows = ROWS5.map(([k, a, b], i) => {
        const cy = R0 + RH * i + RH / 2, t = 1.2 + i * 0.12;
        const name = mid(tx('div', 'a', el, k, { left: LX1 + 'px', width: (RX0 - LX1) + 'px', textAlign: 'center', fontFamily: 'var(--display)', fontWeight: '800', fontSize: '48px', lineHeight: '1.15', letterSpacing: '-0.02em', color: 'var(--ink)', whiteSpace: 'nowrap' }), cy);
        const lv = mid(tx('div', 'a', el, a, { left: (LX0 + PAD) + 'px', width: (LX1 - LX0 - 2 * PAD) + 'px', textAlign: 'right', fontSize: '44px', lineHeight: '1.25', fontWeight: '500', color: 'var(--ink)', whiteSpace: 'nowrap' }), cy);
        const rv = mid(tx('div', 'a', el, b, { left: (RX0 + PAD) + 'px', fontSize: '44px', lineHeight: '1.25', fontWeight: '600', color: 'var(--p3-black)', whiteSpace: 'nowrap' }), cy);
        const lines = i ? seg(R0 + RH * i, true) : [];
        return { name, lv, rv, lines, t };
      });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.sb, lt, 0.5);
      this.sp.render(lt);
      TH.reveal(this.mh, lt, 1.0, { dx: 0, dy: 12 });
      this.head.forEach((e, j) => growX(e, lt, 0.9 + j * 0.1, 0.6));
      this.rows.forEach(r => {
        r.lines.forEach(e => growX(e, lt, r.t - 0.05, 0.5));
        TH.reveal(r.name, lt, r.t, { dx: 0, dy: 14 });
        TH.reveal(r.lv, lt, r.t + 0.04, { dx: 16 });
        TH.reveal(r.rv, lt, r.t + 0.04, { dx: -16 });
      });
    },
  });

  // ── s06 L1 한 문장 ── 180px 문장 두 줄. 위에 한서윤 인물 표시, 아래 보조 줄(48px)과 여섯 항목 칸(높이 150 이상, 52px)
  DECK.slide({
    id: 'p3-ch01-s06', dur: 3.0, steps: [], notes: NOTES['p3-ch01-s06'],
    setup(el) {
      this.bg = TH.bg(el, 'base'); this.hd = HD(el);
      const PY = 160;
      this.pe = TH.person(el, { who: '한서윤', role: '주임 · 입사 4년 차 · 개발 경험 없음', x: 120, y: PY, at: 0.3 });
      this.sm = TH.statement(el, '한서윤 주임은\n개발자가 아닙니다', { size: 180, sub: '여섯 가지는 누가 만듭니까', cy: 470, at: 0.5 });
      css(this.sm.el.querySelector('.p3-statement-sub'), { color: 'var(--dim)', fontSize: '48px', marginTop: '22px' });
      // 문장은 인물 표시 아래(y 284)에서 시작한다
      const top = PY + 104 + 20;
      this.sm.el.style.top = top + 'px';
      // 여섯 항목 칸: x 120~1800 을 고르게 나누고, 보조 줄 아래부터 y 960 까지(높이 150 이상)
      const N = 6, GAP = 16, W = (1680 - GAP * (N - 1)) / N;
      const Y = top + this.sm.el.offsetHeight + 28, H = Math.max(150, 960 - Y);
      this.cells = ['화면', '이용자 확인', '기록 저장', '개인정보', '비용', '운영'].map((t, i) =>
        tx('div', 'a', el, t, { left: (120 + i * (W + GAP)).toFixed(1) + 'px', top: Y + 'px', width: W.toFixed(1) + 'px', height: H + 'px', boxSizing: 'border-box',
          border: '2px solid var(--ink)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--display)', fontSize: '52px', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--ink)', whiteSpace: 'nowrap' }));
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.pe.render(lt); this.sm.render(lt);
      this.cells.forEach((c, i) => TH.reveal(c, lt, 1.8 + i * 0.08, { dx: 0, dy: 18, dur: 0.45 }));
    },
  });

  // ── s07 L9 카드 격자(넷) ── 장 번호 줄(2장~9장) 아래에 실습·시연 칸 넷. 번호 110px 주황 글자가 강조
  const TILES7 = [
    { n: 3, title: '민원 안내 화면 만들기', kind: '3장 실습', tag: '참가자가 직접', lab: true },
    { n: 4, title: '에이전트 팀의 서비스 제작', kind: '4장 시연', tag: '강사 시연' },
    { n: 7, title: '안내 포스터와 영상', kind: '7장 시연', tag: '강사 시연' },
    { n: 8, title: '내 업무의 승인 지점 표', kind: '8장 실습', tag: '참가자가 직접', lab: true },
  ];
  DECK.slide({
    id: 'p3-ch01-s07', dur: 3.0, steps: [], notes: NOTES['p3-ch01-s07'],
    setup(el) {
      this.bg = TH.bg(el, 'base'); this.hd = HD(el);
      this.tt = TH.pageTitle(el, '파트 3에서 실습 2개, 시연 2개를 합니다');
      this.sb = tx('div', 'a', el, '실습은 참가자가, 시연은 강사가 합니다', { left: '120px', top: '240px', fontSize: '40px', lineHeight: '1.3', color: 'var(--dim)', whiteSpace: 'nowrap' });
      // 장 번호 줄: 여덟 칸을 x 120~1800 에 고르게. 실습·시연 장(3·4·7·8)은 흰 글자와 주황 밑줄, 나머지는 회색
      const CY = 314, CW = 1680 / 8, HOT = [3, 4, 7, 8];
      this.base = rule(el, 120, CY + 56, 1680, '#333333', 2);
      this.chs = [2, 3, 4, 5, 6, 7, 8, 9].map((n, i) => {
        const hot = HOT.includes(n);
        const e = tx('div', 'a', el, n + '장', { left: (120 + i * CW) + 'px', top: CY + 'px', width: CW + 'px', textAlign: 'center', fontSize: '40px', lineHeight: '1.2',
          fontWeight: hot ? '800' : '500', color: hot ? 'var(--ink)' : '#8A8A86', whiteSpace: 'nowrap' });
        const u = hot ? rule(el, 120 + i * CW + CW / 2 - 40, CY + 54, 80, 'var(--p3-orange)', 4) : null;
        return { e, u, t: 0.6 + i * 0.05 };
      });
      this.tr = TH.tileRow(el, TILES7.map(({ n, title }) => ({ n, title })), { y: 392, h: 508, titleSize: 44, at: 0.9, each: 0.14 });
      this.parts = this.tr.tiles.map((tl, i) => {
        const d = TILES7[i];
        css(tl.el, { padding: '36px 38px 34px' });
        css(tl.title, { marginTop: '26px', textWrap: 'balance' });
        const ft = tx('div', '', tl.el, null, { marginTop: 'auto', paddingTop: '20px', borderTop: '2px solid #333333' });
        const k = tx('div', '', ft, d.kind, { fontSize: '36px', lineHeight: '1.3', fontWeight: '700', color: 'var(--ink)' });
        const g = tx('div', '', ft, d.tag, { fontSize: '34px', lineHeight: '1.3', marginTop: '4px', fontWeight: d.lab ? '800' : '500', color: d.lab ? 'var(--p3-orange-text)' : 'var(--dim)' });
        const t0 = 0.9 + i * 0.14;
        return { title: tl.title, k, g, t0 };
      });
      // 제목 자리는 가장 긴 칸(두 줄)에 맞춘다(tileRow 가 맞춘 높이를 margin 을 바꾼 뒤 다시 잰다)
      const tH = Math.max(...this.parts.map(p => { p.title.style.minHeight = '0'; return p.title.offsetHeight; }));
      this.parts.forEach(p => { p.title.style.minHeight = tH + 'px'; });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.sb, lt, 0.5);
      growX(this.base, lt, 0.55, 0.7);
      this.chs.forEach(c => { TH.reveal(c.e, lt, c.t, { dx: 0, dy: 10, dur: 0.4 }); if (c.u) growX(c.u, lt, c.t + 0.15, 0.4); });
      this.tr.render(lt);
      this.parts.forEach(p => {
        TH.reveal(p.title, lt, p.t0 + 0.3, { dx: -12 });
        TH.reveal(p.k, lt, p.t0 + 0.42, { dx: -12 });
        TH.reveal(p.g, lt, p.t0 + 0.52, { dx: -12 });
      });
    },
  });

  // ── s08 L4 가로 순서(빈 칸 다섯) ── 첫 칸 「새별 민원 상담」(면)과 이름 없는 점선 칸 다섯. 아래 주황 면 줄 「누가 하는가 …」
  DECK.slide({
    id: 'p3-ch01-s08', dur: 3.0, steps: [], notes: NOTES['p3-ch01-s08'],
    setup(el) {
      this.bg = TH.bg(el, 'base'); this.hd = HD(el);
      this.tt = TH.pageTitle(el, '프로젝트 바깥에 무엇이 더 있어야 합니까');
      const Y = 380, H = 420;
      this.sq = TH.sequence(el, [{ label: '새별 민원 상담', n: '' }, ...[0, 1, 2, 3, 4].map(() => ({ label: '', n: '', tone: 'off' }))], {
        x0: 120, x1: 1800, y: Y, h: H, gap: 16, size: 52, at: 0.5, each: 0.1,
        groups: [{ from: 0, to: 0, label: '프로젝트' }, { from: 1, to: 5, label: '프로젝트 바깥 · 서비스가 되려면' }] });
      // 첫 칸: 이름이 칸 폭(267)에 들도록 안쪽 여백을 줄인다
      css(this.sq.cells[0].c, { padding: '28px 22px 30px' });
      el.querySelectorAll('.p3-seq-group').forEach(g => css(g, { fontSize: '40px', lineHeight: '1.25', height: 'auto', paddingBottom: '10px', top: (Y - 78) + 'px' }));
      // 아래 주황 면 줄(x 120~1800, 검정 48px). 한 줄에 들지 않으면 44px
      this.bd = tx('div', 'a', el, null, { left: '120px', top: '850px', width: '1680px', boxSizing: 'border-box', padding: '18px 44px 20px', borderRadius: '16px',
        background: 'var(--p3-orange)', color: 'var(--p3-black)', fontFamily: 'var(--display)', fontWeight: '800', fontSize: '48px', lineHeight: '1.2', letterSpacing: '-0.01em', whiteSpace: 'nowrap' });
      this.bt = tx('span', '', this.bd, '누가 하는가 · 직접 만듦 · 에이전트 팀에 맡김 · 사람이 정함', { display: 'inline-block' });
      if (this.bt.offsetWidth > 1680 - 88) this.bd.style.fontSize = '44px';
      this.nx = tx('div', 'a', el, '다음 · 2장 민원 상담 서비스의 구성 요소', { left: '120px', top: '970px', fontSize: '34px', lineHeight: '1.3', color: 'var(--dim)', whiteSpace: 'nowrap' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.sq.render(lt);
      openL(this.bd, lt, 1.5, 0.6);
      TH.reveal(this.bt, lt, 1.75, { dx: -16 });
      TH.reveal(this.nx, lt, 2.3, { dx: 0, dy: 10 });
    },
  });
})();
