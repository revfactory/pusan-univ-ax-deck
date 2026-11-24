/* 파트 3 · 6장 「오픈 전 점검: 개인정보, 비용, 접근성」. 원고 plan/slides/p3-ch06.json, 배정표 plan/assets/p3_layout_ch06.md.
 * 테마 「주황 면」(deck/themes/p3.md). 색은 CSS 변수와 테마 부품으로만 쓴다.
 * 레이아웃: s01 L0 · s02 L7 · s03 L3 · s04 L10 · s05 L4 · s06 L5 · s07 L11 · s08 L12.
 * 장마다 강조 한 곳(주황 면 또는 100px 이상의 글자)을 둔다. 제목은 THEME.pageTitle 72px.
 * 키 누름은 s07(넘김 판정 공개) 한 번뿐이다. 나머지 장은 키 없이 3.5초 안에 끝 상태가 된다.
 * 점검표의 아직 채우지 않은 칸은 점선 칸이다(승인이 아니므로 연두를 쓰지 않는다). 연두는 s07의 개선 범위 표시와 s08의 승인 표시에만 쓴다.
 * 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다. */
(function () {
  'use strict';
  const { ease, prog, clamp, lerp, css, h, s } = REEL;
  const TH = window.THEME;
  DECK.config({ part: 'p3', chapter: 'ch06', title: '오픈 전 점검: 개인정보, 비용, 접근성' });
  const CH = '오픈 전 점검: 개인정보, 비용, 접근성';   // 머리말 챕터 제목

  // 강사 메모: 원고의 notes 를 그대로 옮겼다
  const NOTES = {
    "p3-ch06-s01": "5장에서는 시연 요청에 적은 승인 단계 네 개를 승인 지점 8곳 표에 놓아 보았습니다. 5장의 마지막 질문은 공단 이름으로 서비스를 열기 전에 무엇을 점검하느냐였습니다. 6장은 이 질문에 답합니다. 답은 정하준 대리가 가져오는 오픈 전 점검표이고, 점검표는 개인정보, 비용, 접근성 세 가지로 나뉩니다.",
    "p3-ch06-s02": "4장 요청에는 시험표 12개를 상담 창에 넣어 통과 수를 보고하라는 줄이 있었습니다. 시연에서 본 통과 수가 몇 개든, 정보화팀 정하준 대리는 그 보고 다음에 오픈 전 점검표를 꺼냅니다. 점검표의 개인정보, 비용, 접근성 줄은 시험표에 없는 항목이라 아직 빈칸입니다. 이 가운데 개인정보와 비용은 1장에서 한서윤 주임이 적은 프로젝트와 서비스의 차이 여섯 가지에도 있던 항목입니다. (강사 확인: 통과 수는 DEMO-3 리허설(K-10) 기록의 숫자로 말하고, 「모두 통과했다」고 미리 말하지 않습니다.) (화면에서 옮긴 문구: 「강사 시연 화면」 「볼 것: 통과 수를 보고한 줄」)",
    "p3-ch06-s03": "파트 2 5장에서 본 시험표의 T11은 민원인의 이름과 전화번호가 들어간 질문을 넣었을 때 답변에 개인정보가 나오지 않으면 통과입니다. 그런데 4장 요청은 상담 기록에 질문, 답, 근거 조문, 시각을 저장하라고 했고, 같은 요청에 「개인정보는 저장하지 않는다」도 적었습니다. 이 질문이 들어왔을 때 상담 기록의 질문 칸에 무엇이 남는지는 시험표의 어느 줄에도 없습니다. 시험은 답변이 규정과 맞는지 확인하고, 오픈 전 점검은 민원인에게 열었을 때 기록과 요금과 이용하는 사람에게 생기는 일을 확인합니다. Sites 도움말도 게시하기 전에 민감한 정보가 없는지, 다른 사용자로 열어도 기대대로 동작하는지 확인하라고 안내합니다.",
    "p3-ch06-s04": "개인정보 항목표는 서비스가 저장하는 항목마다 다섯 가지를 적는 표이고, 첫 줄의 수집 항목은 4장 요청에 적힌 대로 질문, 답, 근거 조문, 시각입니다. 질문 칸은 민원인이 직접 쓰는 칸이라, 요청에 「개인정보는 저장하지 않는다」고 적었어도 이름과 전화번호가 섞여 들어올 수 있습니다. 그래서 나머지 네 칸을 정해야 하는데, 보관 기간은 기록을 얼마 동안 두는지, 파기는 그 기간이 지난 기록을 누가 어떤 방법으로 지우는지 적는 칸입니다. 처리방침은 공단이 어떤 개인정보를 모아 어떻게 다루는지 민원인에게 공개해 알리는 글이고, 외부 AI 업체 칸에는 질문이 어느 회사의 AI 모델로 넘어가는지 적습니다. 네 칸의 값은 에이전트 팀이 정하지 않고 개인정보 담당인 정하준 대리가 확인해 공단이 정하며, 이 표는 점검할 항목을 모은 것이라 법률 검토를 대신하지 않습니다.",
    "p3-ch06-s05": "2장에서 본 대로 질문이 들어오면 서버가 AI를 부르고, AI 호출 요금은 Plus와 따로, 쓰는 만큼 청구됩니다(2026년 11월 기준). 누리집에 열면 누가 몇 번 질문할지 공단이 정할 수 없으므로, 한 사람의 하루 질문 수, 서비스 전체의 하루 질문 수, 한 달 지출 상한을 정해 둡니다. 세 값은 아직 빈칸이고, 에이전트 팀이 아니라 공단이 예산을 보고 정합니다. 공격 시험은 한도보다 많은 질문을 일부러 보내 실제로 막히는지, 막힌 사람에게 어떤 안내가 나오는지 보는 시험이고, 실제 누리집이 아니라 공단이 운영하는 시험용 서비스에만 합니다. 시험표의 T12로는 답변 내용을 바꾸려는 지시를 시험했고, 공격 시험으로는 요금이 나가는 기능을 몇 번까지 부를 수 있는지 시험합니다.",
    "p3-ch06-s06": "화면 읽기 프로그램은 화면의 글자를 소리로 읽어 주는 프로그램이고, 화면을 보기 어려운 민원인은 이 프로그램과 키보드로 누리집을 씁니다. 점검표의 접근성 줄은 오픈 전에 공단 담당자가 이 프로그램을 켜고, 4장 서비스의 바탕인 민원 안내 화면에서 마우스 없이 Tab 키로 칸을 옮겨 다니며 3장의 T01 값(요가 8회 가운데 2회 진행, 수강료 40,000원)을 넣어 보는 확인입니다. 칸 이름과 결과의 26,000원, 근거 조문이 소리로 읽히는지는 화면에 숫자가 맞게 보이는지와 따로 확인해야 하고, 사람이 직접 들어 봐야 압니다. 오늘 강의실에서는 이 확인을 실습하거나 시연하지 않고, 이 화면을 화면 읽기 프로그램으로 써 본 기록도 아직 없어 세 질문 모두 답을 비워 둡니다. (강사 참고: 프로그램 이름을 물으면, Windows 11에는 내레이터가 들어 있어 Ctrl + Windows 로고 키 + Enter로 켜고, macOS에는 VoiceOver가 들어 있어 Command-F5로 켜고 끈다고 답합니다.)",
    "p3-ch06-s07": "점검표의 빈칸을 채우다 보면 고칠 것이 나옵니다. 화면의 네 가지는 시연 서비스를 실제로 점검한 결과가 아니라 나누는 기준을 보려고 만든 예시인데, 이 가운데 오픈 전에 반드시 고칠 항목에 손을 들어 주세요. (키) 앞의 세 가지는 민원인의 개인정보, 공단이 내는 요금, 화면 읽기 프로그램을 쓰는 민원인의 이용에 걸리므로 고친 뒤에 엽니다. 담당자 기록 화면의 날짜별 검색은 민원인에게 생기는 일이 없으므로, 맡을 사람과 기한을 적어 점검표에 남긴 채 오픈 뒤로 넘깁니다. 오픈 전에 고칠 것과 넘길 것을 나누는 이 판정이 5장의 승인 지점 개선 범위이고, 새별시설공단에서는 오민석 팀장이 정합니다.",
    "p3-ch06-s08": "오픈 전 점검표는 개인정보 항목표, 요금 한도와 공격 시험, 화면 읽기 프로그램 확인 세 가지이고, 모두 시험표에 없는 항목입니다. 보관 기간이나 지출 상한 같은 값은 에이전트 팀이 대신 정하지 않고 공단이 정합니다. 오픈 전 항목은 고친 뒤에, 넘긴 항목은 맡을 사람과 기한을 적은 채로 둡니다. 개선 범위를 오민석 팀장이 판정한 점검표를 내고, 윤지영 본부장에게 배포 승인을 받습니다. 상담 창까지 여는 배포가 이 승인을 기다리는 동안 먼저 민원인에게 알릴 것은 3장에서 만든 계산과 질문 검색 화면입니다. 7장에서는 한서윤 주임이 이 화면을 알릴 안내 포스터와 안내 영상을 여러 AI 도구로 만든 결과를 봅니다.",
  };

  const tx = (tag, cls, parent, text, style) => { const e = h(tag, cls, parent); if (text != null) e.textContent = text; if (style) css(e, style); return e; };
  // 왼쪽부터 펼쳐지는 면(clip-path)
  const openL = (e, lt, at, dur = 0.6, r = 16) => { const p = prog(lt, at, dur, ease.outQuart); e.style.clipPath = p < 1 ? `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0 round ${r}px)` : 'none'; return p; };
  // 아래에서 올라오는 글 덩어리(가림 걷기와 이동)
  const rise = (e, lt, at, dy = 36, dur = 0.5) => TH.reveal(e, lt, at, { dx: 0, dy, dur });
  // 무대 전체 크기의 SVG 층
  const svgLayer = el => { const v = s('svg', { width: 1920, height: 1080, viewBox: '0 0 1920 1080' }, el); css(v, { position: 'absolute', left: '0', top: '0', overflow: 'visible', pointerEvents: 'none' }); return v; };
  // 흰 선(그려지는 선)
  const inkPath = (svg, d, w = 3) => { const p = s('path', { d, fill: 'none', 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg); p.style.stroke = 'var(--ink)'; KIT.drawPrep(p); return p; };
  // 점선 빈칸: 아직 채우지 않은 값. 점선이 왼쪽부터 그어진다(clip-path)
  const dashBox = (parent, style) => tx('div', 'a', parent, null, Object.assign({ boxSizing: 'border-box', border: '3px dashed #6A6A66', borderRadius: '12px' }, style));

  // ── s01 L0 영상 띠 전환 ── 전환 영상 p3-tr-rings 를 정방향(4장 정방향, 5장 반전, 6장 정방향)으로 흑백으로 띠 위쪽에 깐다
  DECK.slide({
    id: 'p3-ch06-s01', dur: 2.8, steps: [], notes: NOTES['p3-ch06-s01'],
    setup(el) {
      this.vt = TH.videoTitle(el, {
        kind: 'chapter', kicker: '파트 3 · 6장', title: '오픈 전 점검:\n개인정보, 비용, 접근성', at: 0.45,
        sub: '공단 이름으로 서비스를 열기 전에 무엇을 점검하는가',
        src: '../assets/video/p3/p3-tr-rings.mp4', poster: '../assets/video/p3/p3-tr-rings.jpg',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // ── s02 L7 인물과 대사 ── 정하준 대리의 고리(지름 200)와 104px 대사. 아래에 화면 폭 전체의 점검표 면과 세 줄(점선 빈칸)
  DECK.slide({
    id: 'p3-ch06-s02', dur: 3.4, steps: [], notes: NOTES['p3-ch06-s02'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 6, title: CH, fiction: true });
      this.tt = TH.pageTitle(el, '정하준 대리가 오픈 전 점검표를 꺼냅니다');
      // 점검표 면을 화면 폭 전체(y 600~966)로 쓰므로 인물 고리를 지름 200 으로 줄여 이름·소속이 면 위(y 590 안)에 들게 한다.
      // 대사는 원고대로 세로 가운데 y 410(대사 묶음 약 241~579)에 둔다
      this.qt = TH.quote(el, { who: '정하준', x: 120, y: 262, d: 200, cy: 410, size: 104, text: '시험표에 없는 줄이\n아직 비어 있습니다.', sub: '에이전트 팀이 통과 수를 보고한 뒤', at: 0.3 });
      css(el.querySelector('.p3-quote-name'), { marginTop: '18px' });
      css(el.querySelector('.p3-quote-org'), { fontSize: '36px', marginTop: '4px' });   // 이름표 글자를 34px 아래로 두지 않는다
      const gb = el.querySelector('.p3-quote-who .p3-person-glyph');
      css(gb, { width: '72px', height: '72px', right: '0px', bottom: '0px' });
      const gs = gb.querySelector('svg'); gs.setAttribute('width', '42'); gs.setAttribute('height', '42');
      // 점검표: 화면 폭 전체의 면(#1F1F1F) 한 장. 이름표 y 620, 세 줄 y 682~952. 항목 56px, 설명 40px 밝은 글자
      this.pn = tx('div', 'a', el, null, { left: '120px', top: '600px', width: '1680px', height: '366px', borderRadius: '20px', background: 'var(--panel)' });
      this.lb = tx('div', 'a', el, '오픈 전 점검표', { left: '164px', top: '620px', fontFamily: 'var(--display)', fontWeight: '800', fontSize: '40px', lineHeight: '1.2', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.ck = TH.checklist(el, [
        { text: '개인정보', note: '무엇을 얼마 동안 남기는가', state: 'todo' },
        { text: '비용', note: 'Plus와 따로 청구되는 AI 호출 요금', state: 'todo' },
        { text: '접근성', note: '화면 읽기 프로그램으로 쓸 수 있는가', state: 'todo' },
      ], { x: 164, y: 682, w: 1592, rowH: 90, size: 56, noteSize: 40, box: 72, mainW: 300, at: 2.3, each: 0.18 });
      this.ck.rows.forEach(r => { if (r.nt) css(r.nt, { color: 'var(--ink)', fontWeight: '500' }); });
      // 줄 사이 선은 그 줄이 놓일 때 왼쪽부터 그어진다
      this.tl = this.ck.rows.map((r, i) => { const l = r.row.querySelector('.p3-tline'); if (l) l.style.transformOrigin = '0 50%'; return { l, t: 2.3 + i * 0.18 }; });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.qt.render(lt);
      openL(this.pn, lt, 1.95, 0.6, 20);
      TH.reveal(this.lb, lt, 2.1, { dx: -16 });
      this.ck.render(lt);
      this.tl.forEach(o => { if (o.l) o.l.style.transform = `scaleX(${prog(lt, o.t, 0.5, ease.outQuart).toFixed(4)})`; });
    },
  });

  // ── s03 L3 좌우 대비 ── 왼쪽 면(시험표의 확인 범위)과 오른쪽 주황 면(점검표의 확인 범위). 큰 낱말 「답변」「상담 기록」 110px
  DECK.slide({
    id: 'p3-ch06-s03', dur: 3.0, steps: [], notes: NOTES['p3-ch06-s03'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 6, title: CH, fiction: true });
      this.tt = TH.pageTitle(el, '시험은 답변을, 점검은 서비스를 확인합니다');
      this.sp = TH.split(el, { top: 280, bottom: 920, left: { label: '시험표의 확인 범위' }, right: { label: '점검표의 확인 범위', tone: 'orange' }, at: 0.4, rightAt: 1.2 });
      const LX = 168, RX = 1020, W = 732;
      const big = (x, y, t, col) => tx('div', 'a', el, t, { left: x + 'px', top: y + 'px', fontFamily: 'var(--display)', fontWeight: '900', fontSize: '110px', lineHeight: '1.08', letterSpacing: '-0.03em', color: col, whiteSpace: 'nowrap' });
      // 왼쪽 면
      this.qLab = tx('div', 'a', el, 'T11 질문', { left: LX + 'px', top: '396px', fontSize: '34px', lineHeight: '1.3', fontWeight: '700', color: 'var(--p3-orange-text)' });
      this.qTxt = tx('div', 'a p3-mono', el, '민원인 박하늘(010-0000-5678, …) 님이 …', { left: LX + 'px', top: '446px', width: W + 'px', fontSize: '36px', lineHeight: '1.4', color: 'var(--ink)', wordBreak: 'keep-all' });
      this.win = tx('div', 'a', el, '상담 창', { left: LX + 'px', fontSize: '40px', lineHeight: '1.2', fontWeight: '700', color: 'var(--dim)', whiteSpace: 'nowrap' });
      this.ans = big(LX, 566, '답변', 'var(--ink)');
      // 「상담 창」에서 「답변」으로 가는 화살표(선 그리기). 「답변」은 화살표 오른쪽
      const winW = this.win.offsetWidth, AX0 = LX + winW + 18, AX1 = AX0 + 96;
      this.ans.style.left = (AX1 + 26) + 'px';
      const midY = 566 + this.ans.offsetHeight / 2 + 4;
      this.win.style.top = (midY - this.win.offsetHeight / 2).toFixed(0) + 'px';
      const sv = svgLayer(el);
      this.arr = inkPath(sv, `M ${AX0} ${midY} L ${AX1} ${midY}`, 4);
      this.arrH = inkPath(sv, `M ${AX1 - 18} ${midY - 16} L ${AX1} ${midY} L ${AX1 - 18} ${midY + 16}`, 4);
      this.arr.style.stroke = this.arrH.style.stroke = 'var(--dim)';
      this.b1 = tx('div', 'a', el, '시험표 T11: 답변에 개인정보가 없는가', { left: LX + 'px', top: '780px', width: W + 'px', fontSize: '40px', lineHeight: '1.3', fontWeight: '600', color: 'var(--ink)', wordBreak: 'keep-all' });
      // 오른쪽 주황 면(검정 글자). 왼쪽 면의 「T11 질문」 자리에 맞춰 4장 요청 줄을 면 위쪽에 둔다(두 면 모두 위에 근거 문서, 가운데 큰 낱말, 아래에 본문 줄)
      this.req = tx('div', 'a', el, '4장 요청: 개인정보는 저장하지 않는다', { left: RX + 'px', top: '396px', width: W + 'px', fontSize: '36px', lineHeight: '1.35', fontWeight: '600', color: 'var(--p3-black)', wordBreak: 'keep-all' });
      this.rule = tx('div', 'a', el, null, { left: RX + 'px', top: '456px', width: W + 'px', height: '3px', background: 'var(--p3-black)', transformOrigin: '0 50%' });
      this.rec = big(RX, 566, '상담 기록', 'var(--p3-black)');
      this.items = tx('div', 'a', el, '질문 · 답 · 근거 조문 · 시각', { left: RX + 'px', top: '700px', fontSize: '40px', lineHeight: '1.3', fontWeight: '600', color: 'var(--p3-black)', whiteSpace: 'nowrap' });
      this.b2 = tx('div', 'a', el, '오픈 전 점검표: 기록에는 무엇이 남는가', { left: RX + 'px', top: '780px', width: W + 'px', fontSize: '40px', lineHeight: '1.3', fontWeight: '700', color: 'var(--p3-black)', wordBreak: 'keep-all' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.sp.render(lt);
      TH.reveal(this.qLab, lt, 0.85); TH.reveal(this.qTxt, lt, 0.92);
      TH.reveal(this.win, lt, 1.05);
      KIT.draw(this.arr, prog(lt, 1.1, 0.3, ease.inOutCubic)); KIT.draw(this.arrH, prog(lt, 1.32, 0.15, ease.outCubic));
      rise(this.ans, lt, 1.15, 40);
      TH.reveal(this.b1, lt, 1.3, { dx: 0, dy: 12 });
      TH.reveal(this.req, lt, 1.55);
      this.rule.style.transform = `scaleX(${prog(lt, 1.6, 0.5, ease.outQuart).toFixed(4)})`;
      rise(this.rec, lt, 1.65, 48, 0.55);
      TH.reveal(this.items, lt, 1.85);
      TH.reveal(this.b2, lt, 1.97);
    },
  });

  // ── s04 L10 표 ── 개인정보 항목표 5행. 첫 행만 정해진 값, 네 행은 점선 빈칸과 「공단이 정할 빈칸」 묶음. 아래 주황 면 줄
  DECK.slide({
    id: 'p3-ch06-s04', dur: 3.4, steps: [], notes: NOTES['p3-ch06-s04'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 6, title: CH, fiction: true });
      this.tt = TH.pageTitle(el, '개인정보 항목표에 다섯 가지를 적습니다');
      this.sb = tx('div', 'a', el, '상담 기록에 저장하는 항목마다', { left: '120px', top: '240px', fontSize: '40px', lineHeight: '1.3', color: 'var(--dim)', whiteSpace: 'nowrap' });
      this.tag = tx('div', 'a', el, '개인정보 항목표', { right: '120px', top: '238px', padding: '6px 22px', border: '2px solid var(--ink)', borderRadius: '10px', fontSize: '34px', lineHeight: '1.3', fontWeight: '700', color: 'var(--ink)', whiteSpace: 'nowrap' });
      const Y = 310, HH = 56, RH = 104, AT = 0.95, EACH = 0.08;
      const NAMES = ['수집 항목', '보관 기간', '파기', '처리방침', '외부 AI 업체'];
      this.tb = TH.table(el, NAMES.map(n => [n, '']), { y: Y, cols: [420, 1260], head: ['항목', '내용'], headSize: 34, rowH: RH, size: 40, at: AT, each: EACH });
      this.tb.rows.forEach(r => {
        const [c0, c1] = r.row.querySelectorAll('.p3-td');
        css(c0, { fontFamily: 'var(--display)', fontWeight: '800', fontSize: '46px', letterSpacing: '-0.02em' });
        r.c1 = c1;
      });
      // 첫 행: 4장 요청으로 이미 정해진 값과 그 아래 보조 줄
      const c1 = this.tb.rows[0].c1;
      css(c1, { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' });
      tx('div', '', c1, '질문 · 답 · 근거 조문 · 시각', { fontSize: '40px', lineHeight: '1.2', fontWeight: '600' });
      tx('div', '', c1, '질문 칸에 이름·전화번호가 섞일 수 있습니다', { fontSize: '34px', lineHeight: '1.3', color: 'var(--dim)', marginTop: '4px' });
      // 둘째~다섯째 행: 점선 빈칸(x 560~1380, 높이 64)
      this.blanks = this.tb.rows.slice(1).map((r, i) => ({ b: dashBox(r.row, { left: '440px', top: ((RH - 64) / 2) + 'px', width: '820px', height: '64px' }), t: 1.5 + i * 0.1 }));
      // 네 빈칸을 묶는 괄호 선과 묶음 이름(주황 글자)
      const top = Y + HH + RH + 14, bot = Y + HH + RH * 5 - 14, BX = 1426, mid = (top + bot) / 2;
      const sv = svgLayer(el);
      this.br = inkPath(sv, `M ${BX - 22} ${top} L ${BX} ${top} L ${BX} ${bot} L ${BX - 22} ${bot}`, 3);
      this.brT = inkPath(sv, `M ${BX} ${mid} L ${BX + 26} ${mid}`, 3);
      this.grp = tx('div', 'a', el, '공단이 정할\n빈칸', { left: (BX + 44) + 'px', fontFamily: 'var(--display)', fontWeight: '800', fontSize: '48px', lineHeight: '1.15', letterSpacing: '-0.02em', color: 'var(--p3-orange-text)', whiteSpace: 'pre-line' });
      this.grp.style.top = (mid - this.grp.offsetHeight / 2).toFixed(0) + 'px';
      // 표 아래 주황 면 줄(이 장의 강조)
      this.band = tx('div', 'a', el, null, { left: '120px', top: '906px', width: '1680px', height: '80px', borderRadius: '14px', background: 'var(--p3-orange)' });
      this.bandT = tx('div', 'a', el, '법률 검토를 대신하지 않습니다', { left: '164px', top: '906px', height: '80px', display: 'flex', alignItems: 'center', fontFamily: 'var(--display)', fontWeight: '800', fontSize: '44px', letterSpacing: '-0.01em', color: 'var(--p3-black)', whiteSpace: 'nowrap' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.sb, lt, 0.45); TH.reveal(this.tag, lt, 0.6, { dx: 14 });
      this.tb.render(lt);
      this.blanks.forEach(o => { const p = prog(lt, o.t, 0.4, ease.outQuart); o.b.style.clipPath = `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0)`; });
      KIT.draw(this.br, prog(lt, 1.95, 0.4, ease.inOutCubic)); KIT.draw(this.brT, prog(lt, 2.2, 0.15, ease.outCubic));
      TH.reveal(this.grp, lt, 2.2, { dx: -14 });
      openL(this.band, lt, 2.4, 0.6, 14);
      TH.reveal(this.bandT, lt, 2.6, { dx: -14 });
    },
  });

  // ── s05 L4 가로 순서 ── 질문이 AI 호출까지 가는 길의 칸 넷. 「한도」 칸(주황 면, 넓게)에서 흰 점이 잠시 멈춘다. 아래 공격 시험 줄
  const ICON = {
    ask: '<path d="M8 10h48v32H30L17 54V42H8z"/><path d="M18 22h28M18 31h18"/>',
    server: '<rect x="12" y="7" width="40" height="15" rx="3"/><rect x="12" y="25" width="40" height="15" rx="3"/><rect x="12" y="43" width="40" height="15" rx="3"/><path d="M19 14.5h3M19 32.5h3M19 50.5h3M38 14.5h8M38 32.5h8M38 50.5h8"/>',
  };
  const AT5 = 0.6;   // s05 칸이 올라오기 시작하는 시각
  const icon = (parent, body, size, style) => { const d = tx('div', 'a', parent, null, Object.assign({ width: size + 'px', height: size + 'px', color: 'var(--dim)' }, style)); d.innerHTML = `<svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`; return d; };
  DECK.slide({
    id: 'p3-ch06-s05', dur: 3.5, steps: [], notes: NOTES['p3-ch06-s05'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 6, title: CH, fiction: true });
      this.tt = TH.pageTitle(el, '요금이 나가는 기능에는 한도를 둡니다');
      this.sb = tx('div', 'a', el, 'AI 호출 요금은 쓰는 만큼 청구됩니다(2장)', { left: '120px', top: '236px', fontSize: '40px', lineHeight: '1.3', color: 'var(--dim)', whiteSpace: 'nowrap' });
      const Y = 330, H = 436, GAP = 16, X0 = 120, AT = AT5, EACH = 0.1, PY = 312;
      this.sq = TH.sequence(el, [
        { label: '민원인 질문' }, { label: '서버' },
        { label: '한도', tone: 'now', note: '한 사람의 하루 질문 수\n서비스 전체의 하루 질문 수\n한 달 지출 상한' },
        { label: 'AI 호출', note: '요금 · 쓰는 만큼' },
      ], { x0: X0, x1: 1800, y: Y, h: H, gap: GAP, size: 52, numSize: 120, noteSize: 34, at: AT, each: EACH });
      // 「한도」 칸은 설명 세 줄이 줄마다 한 줄에 들도록 넓힌다(칸 폭 528, 나머지 368)
      const WS = [368, 368, 528, 368];
      let x = X0;
      this.cx = WS.map((w, i) => {
        const c = this.sq.cells[i];
        css(c.c, { left: x + 'px', width: w + 'px' });
        const lab = c.c.querySelector('.p3-seq-label');
        css(lab, { marginTop: '22px' });            // 이름은 번호 바로 아래(네 칸의 이름이 같은 높이)
        const nt = c.c.querySelector('.p3-seq-note');
        if (nt) css(nt, { whiteSpace: 'pre-line', marginTop: '18px', lineHeight: '1.45' });
        const cx = x + w / 2; x += w + GAP; return cx;
      });
      const hn = this.sq.cells[2].c.querySelector('.p3-seq-note');
      css(hn, { fontWeight: '600', borderTop: '3px solid var(--p3-black)', paddingTop: '16px' });
      // 설명이 없는 두 칸은 아래쪽에 큰 선 그림(질문 말풍선, 서버)
      this.icons = [icon(this.sq.cells[0].c, ICON.ask, 150, { left: '30px', bottom: '30px' }), icon(this.sq.cells[1].c, ICON.server, 150, { left: '30px', bottom: '30px' })];
      // 흰 점: 칸 위 선을 따라 지나가다 「한도」에서 잠시 멈춘다
      this.pa = TH.path(el, this.cx.map(c => [c, PY]), { times: [1.3, 1.62, [1.92, 2.18], 2.5], tail: 0.3 });
      // 공격 시험 줄(y 786~946)
      this.strip = tx('div', 'a', el, null, { left: '120px', top: '786px', width: '1680px', height: '160px', borderRadius: '16px', background: 'var(--panel)' });
      this.l1 = tx('div', 'a', el, '한도는 공격 시험으로 확인합니다', { left: '152px', top: '796px', fontSize: '34px', lineHeight: '1.3', color: 'var(--dim)', whiteSpace: 'nowrap' });
      this.l2 = tx('div', 'a', el, '공격 시험', { left: '152px', top: '842px', fontFamily: 'var(--display)', fontWeight: '800', fontSize: '44px', lineHeight: '1.15', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.l3 = tx('div', 'a', el, '한도보다 많이 보내 보는 시험', { left: '152px', top: '894px', fontSize: '34px', lineHeight: '1.3', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.vr = tx('div', 'a', el, null, { left: '680px', top: '806px', width: '2px', height: '120px', background: '#3A3A3A', transformOrigin: '50% 0' });
      this.chk = ['한도에서 막히는가', '막힌 사람에게 어떤 안내가 나오는가'].map((t, i) => {
        const y = 804 + i * 70;
        const b = dashBox(el, { left: '716px', top: y + 'px', width: '44px', height: '44px', borderRadius: '8px' });
        const e = tx('div', 'a', el, t, { left: '780px', fontSize: '40px', lineHeight: '1.3', fontWeight: '600', color: 'var(--ink)', whiteSpace: 'nowrap' });
        e.style.top = (y + 22 - e.offsetHeight / 2).toFixed(0) + 'px';
        return { b, e, t: 2.5 + i * 0.1 };
      });
      this.foot = tx('div', 'a', el, '공단의 시험용 서비스에만 합니다', { right: '120px', top: '962px', fontSize: '34px', lineHeight: '1.3', fontWeight: '700', color: 'var(--ink)', whiteSpace: 'nowrap' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.sb, lt, 0.45);
      this.sq.render(lt);
      this.sq.cells.forEach((c, i) => {
        const lab = c.c.querySelector('.p3-seq-label'), nt = c.c.querySelector('.p3-seq-note');
        TH.reveal(lab, lt, AT5 + i * 0.1 + 0.25, { dx: 0, dy: 14 });
        if (nt) TH.reveal(nt, lt, AT5 + i * 0.1 + 0.4, { dx: 0, dy: 14 });
      });
      this.icons.forEach((d, i) => { const p = prog(lt, AT5 + i * 0.1 + 0.35, 0.5, ease.outCubic); d.style.opacity = p.toFixed(3); d.style.transform = `translateY(${((1 - p) * 24).toFixed(1)}px)`; });
      this.pa.render(lt);
      openL(this.strip, lt, 1.9, 0.6, 16);
      TH.reveal(this.l1, lt, 2.2); TH.reveal(this.l2, lt, 2.3); TH.reveal(this.l3, lt, 2.4);
      this.vr.style.transform = `scaleY(${prog(lt, 2.3, 0.4, ease.outQuart).toFixed(4)})`;
      this.chk.forEach(o => {
        const q = prog(lt, o.t, 0.4, ease.outCubic);
        o.b.style.opacity = q.toFixed(3); o.b.style.transform = `scale(${lerp(0.5, 1, q).toFixed(3)})`;
        TH.reveal(o.e, lt, o.t + 0.05);
      });
      TH.reveal(this.foot, lt, 2.9, { dx: 0, dy: 10 });
    },
  });

  // ── s06 L5 화면 크게와 짚는 말 ── 그린 민원 안내 화면(1100×620)에서 주황 테두리가 Tab 순서로 칸 셋 → 결과 상자로 옮겨 간다.
  //    오른쪽에 Tab 키 그림(이 장의 강조, 「Tab」 120px)과 짚는 말 셋
  DECK.slide({
    id: 'p3-ch06-s06', dur: 3.2, steps: [], notes: NOTES['p3-ch06-s06'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 6, title: CH, fiction: true });
      this.tt = TH.pageTitle(el, '오픈 전에 화면 읽기 프로그램으로 써 봅니다');
      this.sb = tx('div', 'a', el, '화면 읽기 프로그램은 글자를 소리로 읽어 줍니다 · 공단 담당자가 마우스 없이 소리로 확인합니다', { left: '120px', top: '240px', fontSize: '36px', lineHeight: '1.3', color: 'var(--ink)', whiteSpace: 'nowrap' });
      const FX = 36;   // 화면 안 왼쪽 여백
      this.sh = TH.shot(el, null, { x: 120, y: 310, w: 1100, h: 620, at: 0.6, focus: true,
        draw: (alt, W, H) => {
          const hdr = tx('div', 'a', alt, '민원 안내 화면 · 수강료 환불 계산', { left: FX + 'px', top: '24px', fontSize: '34px', lineHeight: '1.3', fontWeight: '600', color: 'var(--dim)', whiteSpace: 'nowrap' });
          const rule = tx('div', 'a', alt, null, { left: FX + 'px', right: FX + 'px', top: '86px', height: '2px', background: '#333333' });
          const fields = ['강습 종류', '낸 수강료 (원)', '진행된 강습 횟수'].map((t, i) => {
            const y = 112 + i * 152;
            const lab = tx('div', 'a', alt, t, { left: FX + 'px', top: y + 'px', fontSize: '40px', lineHeight: '1.25', fontWeight: '600', color: 'var(--ink)', whiteSpace: 'nowrap' });
            const box = tx('div', 'a', alt, null, { left: FX + 'px', top: (y + 58) + 'px', width: '520px', height: '72px', boxSizing: 'border-box', border: '2px solid var(--ink)', borderRadius: '10px' });
            if (!i) { const ch = s('svg', { width: 28, height: 18, viewBox: '0 0 28 18' }, box); css(ch, { position: 'absolute', right: '24px', top: '25px' }); const p = s('path', { d: 'M3 3 L14 14 L25 3', fill: 'none', 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, ch); p.style.stroke = 'var(--ink)'; }
            return { lab, box };
          });
          // 결과 상자: 금액·설명 자리는 흐린 막대(값은 강사가 말로 한다)
          const res = tx('div', 'a', alt, null, { left: '606px', top: '322px', width: '440px', height: '248px', boxSizing: 'border-box', border: '2px solid var(--ink)', borderRadius: '12px' });
          tx('div', 'a', res, '예상 환불 금액', { left: '30px', top: '22px', fontSize: '40px', lineHeight: '1.25', fontWeight: '600', color: 'var(--ink)', whiteSpace: 'nowrap' });
          [[300, 64, 90], [360, 24, 172], [250, 24, 208]].forEach(([w, hh, t]) => tx('div', 'a', res, null, { left: '30px', top: t + 'px', width: w + 'px', height: hh + 'px', borderRadius: '8px', background: '#333333' }));
          const parts = [hdr, rule, ...fields.flatMap(f => [f.lab, f.box]), res];
          return { fields, res, parts };
        } });
      const D = this.sh.drawn, scr = this.sh.screen;
      // Tab 이동 표시: 주황 4px 테두리 하나가 칸 셋 → 결과 상자로 옮겨 간다(끝 상태는 결과 상자)
      const G = 10, rectOf = e => ({ x: e.offsetLeft - G, y: e.offsetTop - G, w: e.offsetWidth + 2 * G, h: e.offsetHeight + 2 * G });
      this.stops = [...D.fields.map(f => rectOf(f.box)), rectOf(D.res)];
      this.mk = tx('div', 'a', scr, null, { boxSizing: 'border-box', border: '4px solid var(--p3-orange)', borderRadius: '14px', opacity: '0' });
      // Tab 키 그림: 흰 면, 아래 끝은 두꺼운 회색 테두리(눌리는 키)
      this.key = tx('div', 'a', el, null, { left: '1260px', top: '310px', width: '540px', height: '186px', boxSizing: 'border-box', borderRadius: '20px', background: 'var(--p3-paper)', borderBottom: '12px solid #C4C4BE' });
      tx('div', 'a', this.key, 'Tab', { left: '44px', top: '14px', fontFamily: 'var(--display)', fontWeight: '900', fontSize: '120px', lineHeight: '1.15', letterSpacing: '-0.02em', color: 'var(--p3-black)' });
      const ar = s('svg', { width: 120, height: 64, viewBox: '0 0 120 64' }, this.key);
      css(ar, { position: 'absolute', right: '44px', top: '54px' });
      ['M8 32 L100 32', 'M78 10 L100 32 L78 54', 'M112 6 L112 58'].forEach(d => { const p = s('path', { d, fill: 'none', 'stroke-width': 9, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, ar); p.style.stroke = 'var(--p3-black)'; });
      // 짚는 말 셋(흰 면 검정 36px, 폭 540)
      const CO = { x: 1260, w: 540 };
      this.c1 = TH.callout(el, Object.assign({ y: 520, text: 'Tab 키로 입력 칸과 결과까지 갑니까?', at: 1.6 }, CO));
      this.c2 = TH.callout(el, Object.assign({ y: 670, text: '입력 칸 이름이 소리로 읽힙니까?', at: 1.95 }, CO));
      this.c3 = TH.callout(el, Object.assign({ y: 820, text: '환불 금액과 근거 조문이 읽힙니까?', at: 2.2 }, CO));
      [this.c1, this.c2, this.c3].forEach(c => css(c.el, { fontSize: '36px', lineHeight: '1.3', padding: '12px 26px' }));
      // 짚는 선: 「낸 수강료 (원)」 이름표에서 결과 상자 위를 지나 둘째 말로, 결과 상자 오른쪽 끝에서 셋째 말로
      const L2 = TH.boxOf(D.fields[1].lab, el), RB = TH.boxOf(D.res, el);
      const c2y = 670 + this.c2.el.offsetHeight / 2, c3y = 820 + this.c3.el.offsetHeight / 2, JX = 1234;
      const sv = svgLayer(el);
      this.ld2 = inkPath(sv, `M ${L2.x + L2.w + 14} ${L2.y + L2.h / 2} L ${JX} ${L2.y + L2.h / 2} L ${JX} ${c2y} L 1260 ${c2y}`, 3);
      this.ld3 = inkPath(sv, `M ${RB.x + RB.w} ${c3y} L 1260 ${c3y}`, 3);
      this.d2 = s('circle', { cx: L2.x + L2.w + 14, cy: L2.y + L2.h / 2, r: 7 }, sv); this.d2.style.fill = 'var(--ink)';
      this.d3 = s('circle', { cx: RB.x + RB.w, cy: c3y, r: 7 }, sv); this.d3.style.fill = 'var(--ink)';
      if (c3y > RB.y + RB.h - 12) console.warn('[DECK] 셋째 짚는 선이 결과 상자 아래로 지난다');
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.sb, lt, 0.45);
      this.sh.render(lt, ctx);
      this.sh.drawn.parts.forEach((e, i) => TH.reveal(e, lt, 0.75 + i * 0.07, { dx: -12 }));
      // Tab 이동: 1.4초 첫 칸, 0.3초마다 다음 칸, 2.3초 결과 상자
      const T0 = 1.4, ST = 0.3, k = clamp((lt - T0) / ST, 0, 3), i0 = Math.floor(k), f = ease.inOutCubic(clamp((k - i0) / 0.6));
      const a = this.stops[Math.min(i0, 3)], b = this.stops[Math.min(i0 + 1, 3)];
      const r = { x: lerp(a.x, b.x, f), y: lerp(a.y, b.y, f), w: lerp(a.w, b.w, f), h: lerp(a.h, b.h, f) };
      const pin = prog(lt, T0, 0.2, ease.outCubic);
      css(this.mk, { left: r.x.toFixed(1) + 'px', top: r.y.toFixed(1) + 'px', width: r.w.toFixed(1) + 'px', height: r.h.toFixed(1) + 'px', opacity: pin.toFixed(3), transform: `scale(${lerp(1.06, 1, pin).toFixed(4)})` });
      // Tab 키: 아래에서 올라오고, Tab 이동마다 짧게 눌린다
      rise(this.key, lt, 1.0, 50, 0.55);
      const press = [0, 1, 2, 3].reduce((m, j) => { const d = lt - (T0 + j * ST); return Math.max(m, d >= 0 && d < 0.16 ? Math.sin(Math.PI * d / 0.16) : 0); }, 0);
      if (lt >= 1.55) this.key.style.transform = `translateY(${(press * 8).toFixed(1)}px)`;
      this.key.style.borderBottomWidth = (12 - press * 8).toFixed(1) + 'px';
      [this.c1, this.c2, this.c3].forEach(c => c.render(lt));
      KIT.draw(this.ld2, prog(lt, 1.75, 0.35, ease.inOutCubic)); this.d2.setAttribute('opacity', prog(lt, 1.72, 0.15).toFixed(3));
      KIT.draw(this.ld3, prog(lt, 2.0, 0.25, ease.inOutCubic)); this.d3.setAttribute('opacity', prog(lt, 1.97, 0.15).toFixed(3));
    },
  });

  // ── s07 L11 퀴즈 ── 점검 결과 예시 넷. 키 한 번: 칸 면이 어두워지고 칸 아래쪽에 판정(「오픈 전」 연두 칩 셋, 「넘김」), 아래 주황 면의 기준 줄
  DECK.slide({
    id: 'p3-ch06-s07', dur: 3.5, steps: [1.9], notes: NOTES['p3-ch06-s07'],
    setup(el) {
      const RV = 1.9;
      this.RV = RV;
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 6, title: CH, fiction: true });
      this.tt = TH.pageTitle(el, '오픈 전에 고칠 항목은 어느 것입니까?');
      // 개선 범위 표시: 열린 연두 고리(닫지 않는다)와 이름
      this.rg = TH.ring(el, { x: 140, y: 270, r: 18, width: 4, at: 0.45 });
      this.rl = tx('div', 'a', el, '승인 지점 · 개선 범위', { left: '178px', top: '246px', fontSize: '36px', lineHeight: '1.3', fontWeight: '600', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.tag = tx('div', 'a', el, '점검 결과 예시', { right: '120px', top: '240px', padding: '6px 22px', border: '2px solid var(--ink)', borderRadius: '10px', fontSize: '34px', lineHeight: '1.3', fontWeight: '700', color: 'var(--ink)', whiteSpace: 'nowrap' });
      const OPTS = ['상담 기록의 질문 칸에 전화번호가 그대로 남는다', '질문 수 한도가 없다', '화면 읽기 프로그램이 환불 금액을 읽지 않는다', '담당자 기록 화면에 날짜별 검색이 없다'];
      const NOTE = ['오픈 전', '오픈 전', '오픈 전', '넘김 · 맡을 사람과 기한을 적는다'];
      this.qz = TH.quiz(el, OPTS, { x0: 120, x1: 1800, y: 300, h: 560, size: 44, fade: 'bg', labelTop: true, notes: NOTE, noteSize: 48, revealAt: RV, at: 0.7, each: 0.12 });
      // 결과 글이 네 줄을 넘으면 40px 로 내린다(원고 기준 40px, 네 줄까지)
      if (this.qz.items.some(it => it.lab.offsetHeight > 44 * 1.2 * 4 + 2)) this.qz.items.forEach(it => { it.lab.style.fontSize = '40px'; });
      // 판정: 「오픈 전」은 연두 테두리 칩(사람이 내린 개선 범위 판정), 넷째는 「넘김」과 그 아래 34px
      this.qz.items.forEach((it, i) => {
        const n = it.note; n.textContent = '';
        if (i < 3) {
          tx('span', '', n, '오픈 전', { display: 'inline-block', padding: '6px 24px 8px', border: '2px solid var(--p3-lime)', borderRadius: '12px', fontFamily: 'var(--display)', fontWeight: '800', fontSize: '48px', lineHeight: '1.2', color: 'var(--p3-lime)', whiteSpace: 'nowrap' });
        } else {
          tx('div', '', n, '넘김', { fontFamily: 'var(--display)', fontWeight: '800', fontSize: '48px', lineHeight: '1.2', color: 'var(--dim)' });
          tx('div', '', n, '맡을 사람과 기한을 적는다', { fontSize: '34px', lineHeight: '1.35', fontWeight: '500', color: 'var(--dim)', marginTop: '6px' });
        }
      });
      // 기준 줄: 칸 아래 주황 면(이 장의 강조, 키 뒤에만)
      this.band = tx('div', 'a', el, null, { left: '120px', top: '886px', width: '1680px', height: '80px', borderRadius: '14px', background: 'var(--p3-orange)' });
      this.bandT = tx('div', 'a', el, '민원인의 개인정보, 공단의 비용, 서비스 이용에 걸리면 오픈 전', { left: '164px', top: '886px', height: '80px', display: 'flex', alignItems: 'center', fontFamily: 'var(--display)', fontWeight: '800', fontSize: '44px', letterSpacing: '-0.01em', color: 'var(--p3-black)', whiteSpace: 'nowrap' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      this.rg.render(lt); TH.reveal(this.rl, lt, 0.5);
      TH.reveal(this.tag, lt, 0.55, { dx: 14 });
      this.qz.render(lt);
      openL(this.band, lt, this.RV + 0.75, 0.6, 14);
      TH.reveal(this.bandT, lt, this.RV + 0.9, { dx: -14 });
    },
  });

  // ── s08 L12 확인 목록과 배포 승인 ── 채운 점검표 세 줄(연두 체크 96px, 항목 60px). 아래 왼쪽 「배포 승인」 고리는 열린 채로 남는다
  //    (배포 승인은 사람이 아직 하지 않은 결정이다). 아래 오른쪽 「다음 질문」 주황 면이 이 장의 강조
  DECK.slide({
    id: 'p3-ch06-s08', dur: 3.4, steps: [], notes: NOTES['p3-ch06-s08'],
    setup(el) {
      this.bg = TH.bg(el, 'accent');
      this.hd = TH.header(el, { chapter: 6, title: CH });
      this.tt = TH.pageTitle(el, '채운 점검표로 배포 승인을 받습니다');
      this.sb = tx('div', 'a', el, '오픈 전 항목은 고친 뒤, 넘긴 항목은 기한과 함께', { left: '120px', top: '240px', fontSize: '40px', lineHeight: '1.3', color: 'var(--dim)', whiteSpace: 'nowrap' });
      this.lb = tx('div', 'a', el, '오픈 전 점검표', { left: '120px', top: '304px', fontSize: '34px', lineHeight: '1.3', fontWeight: '700', color: 'var(--p3-orange-text)', whiteSpace: 'nowrap' });
      this.ck = TH.checklist(el, [
        { text: '개인정보 항목표', note: '보관 기간 · 파기 · 처리방침 · 외부 AI 업체', state: 'pass' },
        { text: '요금 한도와 공격 시험', note: '한 사람 · 서비스 전체 · 한 달', state: 'pass' },
        { text: '화면 읽기 프로그램 확인', note: 'Tab 키 · 입력 칸 이름 · 결과', state: 'pass' },
      ], { y: 356, rowH: 130, at: 0.8, each: 0.18 });
      this.tl = this.ck.rows.map((r, i) => { const l = r.row.querySelector('.p3-tline'); if (l) l.style.transformOrigin = '0 50%'; return { l, t: 0.8 + i * 0.18 }; });
      // 다음 질문: 세 줄이 되어 목록과 겹치면 폭을 880 으로 늘리고 배포 승인 줄을 올린다(원고의 대안)
      let DY = 870;
      this.nq = TH.nextQ(el, { x: 1000, bottom: 970, w: 800, maxLines: 3, keep: ['만드는 데에도'], text: '서비스를 알리는 안내물을 만드는 데에도 AI 도구를 쓸 수 있는가', at: 2.3 });
      if (this.nq.lines > 2 || this.nq.y < 356 + 130 * 3) {
        this.nq.el.remove();
        this.nq = TH.nextQ(el, { x: 920, bottom: 970, w: 880, maxLines: 3, keep: ['만드는 데에도'], text: '서비스를 알리는 안내물을 만드는 데에도 AI 도구를 쓸 수 있는가', at: 2.3 });
        DY = 850;
      }
      // 배포 승인: 열린 연두 고리(닫지 않는다)와 64px 이름
      this.rg = TH.ring(el, { x: 176, y: DY, r: 56, width: 6, at: 1.6 });
      this.dp = tx('div', 'a', el, '배포 승인', { left: '256px', fontFamily: 'var(--display)', fontWeight: '800', fontSize: '64px', lineHeight: '1.2', letterSpacing: '-0.02em', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.dp.style.top = (DY - this.dp.offsetHeight / 2).toFixed(0) + 'px';
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.sb, lt, 0.45); TH.reveal(this.lb, lt, 0.6);
      this.ck.render(lt);
      this.tl.forEach(o => { if (o.l) o.l.style.transform = `scaleX(${prog(lt, o.t, 0.5, ease.outQuart).toFixed(4)})`; });
      this.rg.render(lt);
      TH.reveal(this.dp, lt, 1.9, { dx: -18 });
      this.nq.render(lt, ctx);
    },
  });
})();
