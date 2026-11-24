/* 파트 2 · 11장 「파트 2 정리: 만들 수 있다, 조건이 있다」 — 레이아웃 목록(p2.md 8절)으로 다시 만든 장면 코드
 * 원고: plan/slides/p2-ch11.json · 배정표: plan/assets/p2_layout_ch11.md · 본보기: deck/p2/ch00.js, 끝난 챕터 deck/p2/ch07.js·ch05.js
 * 키 누름은 s05(퀴즈) 한 장에 한 번이다. 나머지 장은 모든 조각이 차례로 놓여 2.5초 안에 끝 상태가 된다.
 * 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다. */
(function () {
  'use strict';
  const { css, h, s } = REEL;
  const T = THEME, C = T.C, M = T.mono;
  DECK.config({ part: 'p2', chapter: 'ch11', title: '파트 2 정리: 만들 수 있다, 조건이 있다' });

  const NOTES = /*NOTES*/{"p2-ch11-s01": "파트 2의 마지막 챕터입니다. 파트 2를 시작할 때 「규정을 근거로 답하고 규정에 없으면 담당자에게 넘기는 민원 상담 프로젝트를 ChatGPT Plus만으로 만들 수 있는가」를 물었습니다. 범위를 정하고, 프로젝트를 만들고, 시험하고, 검토 프로젝트를 두고, 승인까지 받은 지금 이 질문에 답합니다. 이 프로젝트로 아직 하지 못하는 일이 무엇인지도 함께 봅니다.", "p2-ch11-s02": "10장에서 조건을 붙여 승인받은 뒤, 한서윤 주임이 고객지원팀 회의에서 「새별 민원 상담」을 팀원들에게 보여 줍니다. 파트 1부터 계속 본 수영 강습 환불 민원을 넣자 [계산]과 [근거] 칸이 붙은 답이 나옵니다. 화면의 답은 4장 확인 질문 Q1의 기대 결과와 같은 값입니다. 그때 회의에 들어와 화면을 보던 윤지영 본부장이 묻습니다. 「민원인이 직접 쓸 수 있습니까?」 이 질문에는 이 챕터 끝에서 답하고, 먼저 파트 2를 시작할 때 물은 질문부터 답하겠습니다.", "p2-ch11-s03": "파트 2를 시작할 때 물은 질문을 다시 보겠습니다. 「규정을 근거로 답하고 규정에 없으면 담당자에게 넘기는 민원 상담 프로젝트를 ChatGPT Plus만으로 만들 수 있는가」. 답은 「만들 수 있다」입니다. 다만 조건이 네 가지 있습니다. 2장에서 민원 240건 가운데 두 유형 135건으로 범위를 좁혔습니다. 5장과 6장에서는 시험 12개와 통과 기준(11개 이상, 규칙 시험 실패 0건)을 적은 시험표로 채점했고, 10장에서 조건을 붙인 승인을 기록으로 남겼습니다. 이 세 가지는 1장에서 오민석 팀장이 건 조건(범위, 시험, 승인)과 같습니다. 검토자는 7장에서 정하준 대리가 채점을 누가 했는지 물은 뒤 더해졌고, 8장에서 「새별 답변 검토」 프로젝트로 만들었습니다.", "p2-ch11-s04": "파트 2에서 여러분이 만든 산출물은 다섯 가지입니다. 2장의 시범 범위 판단표, 4장의 「새별 민원 상담」 프로젝트, 6장의 시험 기록, 8장의 판정 기록, 10장의 승인 요약과 승인 기록입니다. 파트 1 1장에서 말한 산출물 가운데 민원 상담 프로젝트와 시험 기록·승인 기록이 여기서 나왔습니다. 못 끝낸 실습은 각 실습 폴더의 완성본 폴더에 있는 예(범위_판단표_예.md, 시험기록_예.md, 판정_예.md, 승인요약_예.md)로 채웁니다. 승인 기록의 조건과 승인 요약 양식은 파트 3에서 다시 쓰므로 파일을 지우지 말고 저장해 둡니다.", "p2-ch11-s05": "넷 가운데 여러분의 ChatGPT Plus 계정으로 하지 않은 일에 손을 들어 주세요. (키) 답은 ④, 9장에서 강사가 Codex CLI로 보여 준 시연입니다. Codex는 Plus 계정에 들어 있지만 CLI를 설치해야 해서 오늘은 시연으로 보았습니다. 8장에서 여러분은 두 프로젝트 사이에 초안과 판정을 5회 또는 7회 복사해 옮겼고, 시연에서는 에이전트가 파일로 주고받아 사람이 옮긴 횟수가 0회였습니다. ①부터 ③과 10장의 승인 요약은 여러분이 ChatGPT 웹 화면에서 직접 했으니 여러분 계정으로 그대로 다시 해 볼 수 있습니다.", "p2-ch11-s06": "본부장의 질문에 지금 답하면 「아직은 아니요」입니다. 첫째, 민원인이 이 프로젝트에 들어올 수 없습니다. 2026년 11월 OpenAI 도움말을 보면, 프로젝트를 링크로 열어도 들어오는 사람은 ChatGPT에 로그인한 사용자입니다. 누리집 민원 게시판에 글을 올리는 민원인은 ChatGPT에 로그인하지 않으니 이 프로젝트를 쓰지 못합니다. 프로젝트를 함께 쓰도록 초대한 사람을 협업자라고 하는데, 같은 도움말에 따르면 Plus 계정은 협업자를 최대 10명까지 둘 수 있습니다. 10장의 승인 기록도 「새별 민원 상담」의 공유 범위를 고객지원팀 담당자 4명으로 정했습니다. 둘째, 상담 대화는 ChatGPT 프로젝트 안에 있고 공단의 민원 기록에는 남지 않습니다. 민원인이 무엇을 묻고 어떤 답을 받았는지 공단이 기록으로 남길 방법이 아직 없습니다. (강사 확인: 링크 참여 조건과 협업자 수는 OpenAI 도움말의 프로젝트 문서에 있고, 영어판과 한국어판의 내용이 같습니다(F-13, 2026-11-24 확인). 바뀔 수 있는 숫자라 강의 전날 같은 문서를 다시 열어 보고, 바뀌었으면 화면의 줄과 이 메모를 고칩니다.)", "p2-ch11-s07": "본부장의 질문을 넓혀 적으면 파트 3의 질문이 됩니다. 「ChatGPT 안의 프로젝트를 민원인이 누리집에서 쓰는 서비스로 만들려면 무엇이 더 필요하고, 그 일을 누가 하는가」입니다. 한서윤 주임은 개발자가 아닙니다. 파트 3에서는 이 질문에 실습 2개와 시연 2개로 답합니다. 다음 화면부터 파트 3입니다."};
  const CH = '파트 2 정리: 만들 수 있다, 조건이 있다';
  const IMG = '../assets/img/p2/';
  const px = v => (typeof v === 'number' ? v.toFixed(1) + 'px' : v);
  const INK = { cream: C.ink, white: C.ink, lemon: C.ink, kraft: C.ink, red: '#FFFFFF', green: C.cream, dark: C.cream };

  // 슬라이드 하나: build(el) 가 돌려준 부품을 차례로 그린다. 부품은 모두 render(lt, ctx) 를 가진다
  const lay = (dur, build, steps) => ({ dur, steps: steps || [],
    setup(el) { this.parts = build.call(this, el).filter(Boolean); },
    render(lt, ctx) { this.parts.forEach(p => p.render(lt, ctx)); } });
  const top = (el, title, fiction) => T.top(el, { chapter: 11, chapterTitle: CH, title, fiction: !!fiction });

  // 글 한 줄(블록)
  function line(parent, html, st) { const d = h('div', '', parent, html); css(d, Object.assign({ position: 'relative' }, st || {})); return d; }
  // 글이나 조각을 나중에 놓는다(그림자 없이 조금 크게 들렸다가 붙는다)
  const rise = (node, at, o = {}) => ({ render(lt) { T.lift(node, lt, at, Object.assign({ shadow: false, dur: 0.4, from: 1.05 }, o)); } });
  // 번호 조각(레몬·초록·주홍, Anton). 원 숫자(①)는 Anton 에 글리프가 없어 o.body 면 본문 서체(A2Z 700)로 쓴다
  function numChip(parent, n, o) {
    const tone = o.tone || 'lemon', sz = o.size ?? 84;
    const np = T.paper(parent, { x: o.x, y: o.y, w: sz, h: Math.round(sz * 1.08), tone, rot: o.rot ?? -5, at: o.at, k: 0.6, seed: o.seed });
    const nn = h('div', 'p2-num', np.inner, String(n));
    css(nn, { inset: '0', fontSize: px(sz * (o.body ? 0.62 : 0.72)), color: INK[tone], paddingTop: o.body ? '0' : '4px' },
      o.body ? { fontFamily: 'var(--body)', fontWeight: 700 } : {});
    return np;
  }
  // 둥근 기호 조각: 주홍 색지에 흰 도장(오민석 팀장의 조건), 짙은 색지에 크림 자물쇠(정하준 대리의 질문)
  const SYM = {
    stamp: `<circle cx="0" cy="-20" r="11" fill="#FFFFFF"/><rect x="-6" y="-12" width="12" height="16" fill="#FFFFFF"/><rect x="-22" y="4" width="44" height="14" rx="3" fill="#FFFFFF"/><rect x="-24" y="20" width="48" height="6" fill="#FFFFFF"/>`,
    lock: `<path d="M-14 -4 v-10 a14 14 0 0 1 28 0 v10" fill="none" stroke="${C.cream}" stroke-width="7"/><rect x="-22" y="-4" width="44" height="32" rx="5" fill="${C.cream}"/>`,
  };
  function badge(parent, kind, o = {}) {
    const sz = o.size ?? 84;
    const el = h('div', '', parent);
    css(el, { position: 'absolute', left: px(o.x ?? 0), top: px(o.y ?? 0), width: px(sz), height: px(sz), borderRadius: '50%', background: kind === 'stamp' ? C.red : C.dark, transformOrigin: '50% 50%' });
    const sv = s('svg', { viewBox: '-50 -50 100 100', width: sz, height: sz }, el); sv.innerHTML = SYM[kind];
    css(sv, { position: 'absolute', left: '0', top: '0' });
    const at = o.at ?? 0, rot = o.rot ?? 6;
    return { el, render(lt) { return T.lift(el, lt, at, { rot, k: 0.5, dur: 0.4, inset: `0 0 0 ${Math.max(4, sz * 0.07).toFixed(1)}px #fff` }); } };
  }
  // 무대 기준 글자 폭(nowrap)
  function textW(parent, html, st) {
    const d = h('div', '', parent, html);
    css(d, Object.assign({ position: 'absolute', left: '0', top: '0', whiteSpace: 'nowrap', visibility: 'hidden' }, st));
    const w = d.offsetWidth; d.remove(); return w;
  }

  // ─────────────────────────────────────────────────────────────
  // s01 전환: 파트 2 인트로 영상 p2-intro 를 정방향으로(10장은 반전, 11장은 정방향). 왼쪽 크림 띠에 꼬리표, 음절 조각 제목, entry 질문 두 줄
  DECK.slide({ id: 'p2-ch11-s01', notes: NOTES['p2-ch11-s01'], ...lay(3.0, el => [
    T.videoTitle(el, {
      kind: 'chapter', scene: 'intro', kicker: '파트 2 · 11장',
      src: '../assets/video/p2/p2-intro.mp4', poster: '../assets/video/p2/p2-intro.jpg',
      title: '파트 2 정리:\n만들 수 있다, 조건이 있다',
      sub: '파트 2의 질문에 무엇이라고 답하고,\n이 프로젝트로 아직 하지 못하는 일은 무엇인가',
    }),
  ]) });

  // ─────────────────────────────────────────────────────────────
  // s02 인물과 대사: 윤지영 본부장(1.9배)과 대사 종이(76px). 대사 종이 아래 왼쪽에 답변 카드, 오른쪽에 한서윤 주임·오민석 팀장(0.8배)과 이름표 「고객지원팀 회의」
  DECK.slide({ id: 'p2-ch11-s02', notes: NOTES['p2-ch11-s02'], ...lay(2.1, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '팀 회의에서 본부장이 묻습니다', true);
    const BY = 340;
    const sp = T.speech(el, { who: 'yoon', scale: 1.9, x: 130, org: true, bubble: { x: 740, y: BY, w: 1040 }, size: 76, at: 0.2,
      text: '민원인이 직접\n쓸 수 있습니까?' });
    const st = T.strip(el, '한서윤 주임이 「새별 민원 상담」을 보여 줍니다', { x: 740, y: tp.bottom + 14, size: 36, rot: -0.4, at: 0.15 });
    if (st.y + st.h > BY - 4) console.warn(`[DECK] s02 띠가 대사 종이에 닿는다(${st.y + st.h - BY + 4}px)`);
    const by = BY + sp.el.offsetHeight;                          // 대사 종이 아래 끝(약 y 650)
    // 답변 카드: 윤지영 본부장의 깃발 기호(오른쪽 끝 약 x 769) 오른쪽에서 시작. 줄은 「÷ 12」 뒤(환불할 몫과 위약금 사이)와 「규정」 뒤에서 나누고 둘째 줄을 들여 쓴다
    const CX = 790, PX = 34, PY = 30, FS = 36;
    const item = (k, a, b) => `<div style="position:relative;padding-left:3.25em;white-space:nowrap"><b style="position:absolute;left:0">${k}</b>${a}<br>${b}</div>`;
    const body = item('[계산]', '60,000 × 8 ÷ 12', '− 6,000 = 34,000원') +
      `<div style="height:${Math.round(FS * 0.45)}px"></div>` + item('[근거]', '체육시설 이용 규정', '제7조 제1항 제2호');
    const probe = line(el, body, { position: 'absolute', left: '0', top: '0', fontSize: px(FS), lineHeight: 1.4, visibility: 'hidden' });
    const CW = Math.ceil(probe.offsetWidth) + PX * 2 + 4, CH = Math.ceil(probe.offsetHeight) + PY * 2 + 14;
    probe.remove();
    const CY = Math.max(by + 34, 980 - CH);
    const card = T.paper(el, { x: CX, y: CY, w: CW, h: CH, tone: 'cream', rot: 0.8, at: 1.0, seed: 3.7 });
    const col = line(card.inner, body, { position: 'absolute', left: px(PX), top: px(PY + 14), fontSize: px(FS), lineHeight: 1.4, color: C.ink });
    const lab = T.tag(card.el, '새별 민원 상담 · 답변', { x: 18, y: -30, size: 34, tone: 'kraft', rot: -1.5, at: 1.05 });
    const tape = T.tape(card.el, { x: CW - 150, y: -20, w: 130, rot: 6, at: 1.1 });
    // 회의에 있던 두 사람: 카드 오른쪽. 머리는 이름표 「고객지원팀 회의」 아래, 이름 띠는 화면 아래 30px 안에 들도록 정한다
    const PS = 0.8, PX0 = Math.max(CX + CW + 4, 1800 - 500), PY0 = Math.min(696, Math.max(by + 28, 672));
    // 오민석 팀장을 먼저 만든다: 한서윤 주임의 말풍선 기호가 팀장 몸통 가장자리 위에 놓이게
    const oh = T.person(el, 'oh', { x: PX0 + 236, y: PY0, scale: PS, at: 1.45, org: true });
    const han = T.person(el, 'han', { x: PX0, y: PY0, scale: PS, at: 1.3, org: true });
    const mt = T.tag(el, '고객지원팀 회의', { x: 0, y: by + 2, size: 34, tone: 'kraft', rot: 1.5, at: 1.6 });
    css(mt.el, { left: px(PX0 + 236 - mt.w / 2) });
    if (PX0 + 236 + 269 > 1850) console.warn(`[DECK] s02 인물이 화면 오른쪽에 너무 붙는다(${PX0 + 236 + 269})`);
    return [bg, tp, st, sp, card, rise(col, 1.12, { from: 1.03 }), lab, tape, han, oh, mt];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s03 순서 조각(넷): 파트 2의 질문(띠)에 대한 답이 제목 띠다. 조건 네 조각을 위에서 아래로 쌓는다.
  // 원고의 가로 네 조각(약 393×470)은 본문 40px 가 한 줄에 7~9자만 들어 세로로 쌓은 줄 조각(폭 1680)으로 바꿨다. 본문이 한 줄에 든다
  const COND = [
    { title: '좁은 범위', sub: '2장 · 두 유형 135건', sym: 'stamp' },
    { title: '시험표', sub: '5·6장 · 12개 중 11개 이상 통과', sym: 'stamp' },
    { title: '검토자', sub: '7·8장 · 「새별 답변 검토」', sym: 'lock' },
    { title: '승인 기록', sub: '10장 · 조건을 붙인 승인', sym: 'stamp' },
  ];
  DECK.slide({ id: 'p2-ch11-s03', notes: NOTES['p2-ch11-s03'], ...lay(2.4, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '만들 수 있습니다, 조건은 네 가지입니다', true);
    const QY = tp.bottom + 50;
    const qs = T.strip(el, '규정을 근거로 답하고 규정에 없으면 담당자에게 넘기는<br>민원 상담 프로젝트를 ChatGPT Plus만으로 만들 수 있는가',
      { x: 120, y: QY, size: 36, lh: 1.3, rot: -0.4, at: 0.2, seed: 8.2 });
    // 이름표는 띠 위 가장자리에 걸치되 띠 글자(위 여백 14px 아래)를 가리지 않게 올린다
    const qt = T.tag(el, '파트 2의 질문', { x: 104, y: 0, size: 34, tone: 'lemon', rot: -2.5, at: 0.3 });
    css(qt.el, { top: px(QY + 10 - qt.h) });
    // 범례: 질문 띠 오른쪽의 크림 종이 한 장, 두 줄
    const LX = qs.x + qs.w + 40, LW = 1800 - LX;
    const leg = T.paper(el, { x: LX, y: QY, w: LW, h: qs.h, tone: 'cream', torn: 'right', rot: 0.6, at: 1.9, seed: 4.6 });
    const legRows = [['stamp', '오민석 팀장의 조건 · 1장'], ['lock', '정하준 대리의 질문 · 7장']].map(([k, t], i) => {
      const rh = qs.h / 2, bs = 46;
      const b = badge(leg.inner, k, { x: 28, y: i * rh + (rh - bs) / 2 + (i ? -4 : 4), size: bs, at: 1.95 + i * 0.08, rot: -4 });
      const tx = line(leg.inner, t, { position: 'absolute', left: px(28 + bs + 18), top: px(i * rh + (i ? -4 : 4)), height: px(rh), display: 'flex', alignItems: 'center',
        fontSize: '34px', fontWeight: 700, whiteSpace: 'nowrap', transformOrigin: '0% 50%' });
      if (28 + bs + 18 + tx.offsetWidth > LW - 30) console.warn(`[DECK] s03 범례가 종이보다 길다: ${t}`);
      return [b, rise(tx, 2.0 + i * 0.08)];
    }).flat();
    // 조건 줄 조각 네 장
    const Y0 = QY + qs.h + 26, GAP = 14, RH = Math.floor((980 - Y0 - GAP * 3) / 4), TS = 70, BS = 52;
    const tW = Math.max(...COND.map(c => textW(el, c.title, { fontSize: px(TS), fontWeight: 700 })));
    const TX = 136, BX = TX + tW + 74;
    const parts = [];
    COND.forEach((c, i) => {
      const at = 0.4 + i * 0.2, off = i % 2 ? 18 : 0, rot = i % 2 ? 0.35 : -0.35;
      const y = Y0 + i * (RH + GAP);
      const pp = T.paper(el, { x: 120 + off, y, w: 1680 - off, h: RH, tone: 'cream', torn: 'right', rot, at, seed: 6.1 + i, k: 0.8 });
      const t = line(pp.inner, c.title, { position: 'absolute', left: px(TX), top: '0', height: px(RH), display: 'flex', alignItems: 'center', fontSize: px(TS), fontWeight: 700, whiteSpace: 'nowrap', transformOrigin: '0% 50%' });
      line(pp.inner, '', { position: 'absolute', left: px(BX - 36), top: '22px', bottom: '22px', width: '0', borderLeft: '3px dashed rgba(30,22,16,.28)' });
      const b = line(pp.inner, c.sub, { position: 'absolute', left: px(BX), top: '0', height: px(RH), display: 'flex', alignItems: 'center', fontSize: px(BS), fontWeight: 500, whiteSpace: 'nowrap', transformOrigin: '0% 50%' });
      const bEnd = BX + b.offsetWidth;
      parts.push(pp, numChip(pp.el, i + 1, { x: 22, y: Math.round((RH - 91) / 2), size: 84, tone: 'green', at: at + 0.1, rot: [-4, 3, -2, 4][i], seed: 2 + i }),
        rise(t, at + 0.12), rise(b, at + 0.2));
      // 사물 조각(높이 150): 줄 조각 위아래로 조금 걸친다. 1·3번과 2·4번의 자리를 엇갈려 위아래 조각이 겹치지 않게 한다
      const OX = Math.max(1150 + (i % 2 ? 90 : 0), bEnd + 50 - 60), OY = Math.round((RH - 150) / 2), ta = at + 0.15;
      if (OX + 60 + 140 > 1680 - off - 220) console.warn(`[DECK] s03 사물 조각이 기호에 닿는다: ${c.sub}`);
      if (i === 0) {
        [[210, -0.8, 18], [160, 0.6, 76]].forEach(([w, r, yy], k) => parts.push(T.paper(pp.el, { x: OX + 30, y: OY + yy, w, h: 48, tone: 'kraft', torn: 'right', rot: r, at: ta + k * 0.05, k: 0.6, seed: 3.1 + k })));
        [0, 1].forEach(k => parts.push(T.tape(pp.el, { x: OX + 6, y: OY + 24 + k * 58, w: 84, h: 34, rot: -8 + k * 6, tone: 'red', at: ta + 0.15 + k * 0.05 })));
      } else if (i === 1) {
        parts.push(T.thing(pp.el, 'table', { x: OX + 60, y: OY, w: Math.round(150 / 1.15), rot: 2.5, at: ta }));
      } else if (i === 2) {
        parts.push(T.thing(pp.el, 'sheet', { x: OX + 70, y: OY, w: Math.round(150 / 1.3), rot: -3, at: ta, band: true }));
      } else {
        const sm = T.thing(pp.el, 'summary', { x: OX + 60, y: OY, w: 120, rot: 1.5, at: ta });
        parts.push(sm, T.stamp(pp.el, { x: OX + 40, y: OY + 50, size: 112, at: at + 0.25, rot: -12, paper: pp.el }));
      }
      // 조건마다 기호(도장: 오민석 팀장의 조건, 자물쇠: 정하준 대리의 질문)
      parts.push(badge(pp.el, c.sym, { x: 1680 - off - 210, y: Math.round((RH - 84) / 2), size: 84, at: 1.5 + i * 0.1, rot: [6, -5, 4, -7][i] }));
    });
    return [bg, tp, qs, qt, ...parts, leg, ...legRows];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s04 카드 격자(3열 2행, 다섯 장 + 쪽지): 산출물 카드. 사물 조각은 카드 오른쪽 위 모서리에 걸쳐 두고(카드 위로 반쯤 나온다) 글은 카드 폭을 다 쓴다.
  // 파일 이름은 고정폭 서체, 「/」 뒤에서만 줄이 바뀐다
  const fileHtml = f => f.split('/').map((p, i, a) => `<span style="white-space:nowrap">${p}${i < a.length - 1 ? '/' : ''}</span>`).join('<wbr>');
  const OUT = [
    { ch: '2장', title: '시범 범위 판단표', file: 'lab2/범위_판단표.md' },
    { ch: '4장', title: '민원 상담 프로젝트', name: '「새별 민원 상담」' },
    { ch: '6장', title: '시험 기록', file: 'lab4/시험기록_양식.md' },
    { ch: '8장', title: '판정 기록', file: 'lab5/판정기록_양식.md' },
    { ch: '10장', title: '승인 요약과 승인 기록', file: 'lab6/승인요약_양식.md' },
  ];
  DECK.slide({ id: 'p2-ch11-s04', notes: NOTES['p2-ch11-s04'], ...lay(1.9, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '파트 2에서 만든 산출물은 다섯 가지입니다', false);
    const GY = Math.max(300, tp.bottom + 58), GH = 980 - GY, PAD = 34, BS = 38;
    // 부품의 넘침 점검이 먼저 돌지 않도록 작은 제목(44px)으로 만든 뒤 키운다
    const gd = T.grid(el, { x: 120, y: GY, w: 1680, h: GH, cols: 3, titleSize: 44, bodySize: BS, at: 0.3, each: 0.15,
      items: OUT.map((o, i) => ({ num: i + 1, numTone: 'green', pad: PAD, label: o.ch, title: o.title,
        body: o.file ? `<span style="font-family:var(--mono)">${fileHtml(o.file)}</span>` : o.name })) });
    // 파일 이름 줄은 점선 아래에 두고, 제목은 다섯 장이 모두 카드에 드는 가장 큰 같은 크기(56px 부터)로 쓴다
    gd.cards.forEach(c => { css(c.title, { lineHeight: 1.15, textWrap: 'balance' }); css(c.body, { color: C.ink, marginTop: '10px', paddingTop: '8px', borderTop: '3px dashed rgba(30,22,16,.28)', lineHeight: 1.25 }); });
    const over = () => Math.max(...gd.cards.map(c => c.flow.offsetTop + c.flow.offsetHeight - (c.h - PAD)));
    for (let TS = 58; TS >= 44; TS -= 2) { gd.cards.forEach(c => css(c.title, { fontSize: px(TS) })); if (over() <= 0) break; }
    if (over() > 0) console.warn(`[DECK] s04 카드 글자가 넘친다(${over()}px)`);
    const parts = [];
    gd.cards.forEach((c, i) => {
      const a = 0.3 + i * 0.15;
      // 파일 이름 줄을 카드 아래쪽으로 내린다(제목과 파일 이름 사이의 빈 높이를 쓴다)
      const spare = c.h - PAD - (c.flow.offsetTop + c.flow.offsetHeight);
      if (spare > 0) css(c.body, { marginTop: px(10 + spare) });
      // 사물 조각(높이 약 116): 카드 오른쪽 위 모서리에 걸친다
      const ta = a + 0.1, OX = c.w - 190, OY = -50;
      if (i === 0) {
        [[150, -1, 8], [118, 0.8, 58]].forEach(([w, r, yy], k) => parts.push(T.paper(c.el, { x: OX + 26, y: OY + yy, w, h: 42, tone: 'kraft', torn: 'right', rot: r, at: ta + k * 0.05, k: 0.6, seed: 2.2 + k })));
        [0, 1].forEach(k => parts.push(T.tape(c.el, { x: OX + 4, y: OY + 12 + k * 50, w: 72, h: 32, rot: -8 + k * 6, tone: 'red', at: ta + 0.12 + k * 0.05 })));
      } else if (i === 1) {
        parts.push(T.thing(c.el, 'laptop', { x: OX + 2, y: OY + 8, w: 168, rot: -2, at: ta }));
      } else if (i === 2) {
        parts.push(T.thing(c.el, 'table', { x: OX + 36, y: OY, w: Math.round(116 / 1.15), rot: 3, at: ta }));
      } else if (i === 3) {
        parts.push(T.thing(c.el, 'sheet', { x: OX + 44, y: OY, w: Math.round(116 / 1.3), rot: -3, at: ta, band: true }));
      } else {
        const sm = T.thing(c.el, 'summary', { x: OX + 40, y: OY, w: 94, rot: 2, at: ta });
        parts.push(sm, T.stamp(c.el, { x: OX + 86, y: OY + 38, size: 98, at: a + 0.3, rot: -12, paper: c.el }));
      }
    });
    // 여섯째 칸: 크림 쪽지(48px, 700). 칸 세로 가운데에 조금 기울여 놓는다
    const cw = Math.floor((1680 - 80) / 3), ch = Math.floor((GH - 40) / 2), NX = 120 + 2 * (cw + 40), NY = GY + ch + 40;
    const nt = T.note(el, { x: NX + 24, y: 0, w: cw - 48, size: 48, rot: 1.4, at: 1.4, padX: 40, padY: 34,
      html: '<div style="font-weight:700;line-height:1.36;text-wrap:balance">못 끝낸 것은 실습 묶음의 완성본으로 채웁니다</div>' });
    css(nt.el, { top: px(NY + Math.round((ch - nt.h) / 2)) });
    return [bg, tp, gd, ...parts, nt];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s05 손들기(grow): 보기 네 줄(48px, 물러나면 40px). 키를 한 번 누르면 크림 답 카드가 넘어가며 x 800~1800 자리로 커진다.
  // 「④」와 원 숫자는 Black Han Sans·Anton 에 글리프가 없어 본문 서체(A2Z 700)로 쓴다
  const QUIZ = ['① 민원 240건으로 시범 범위 정하기', '② 「새별 민원 상담」으로 시험 12개 채점하기', '③ 「새별 답변 검토」로 초안 3건 판정하기', '④ 작성·검토 에이전트가 초안과 판정 주고받기'];
  const DONE = [['①', '직접 했습니다 · 2장'], ['②', '직접 했습니다 · 6장'], ['③', '직접 했습니다 · 8장']];
  DECK.slide({ id: 'p2-ch11-s05', notes: NOTES['p2-ch11-s05'], ...lay(3.0, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '직접 하지 않은 일은?', false);
    const st = T.strip(el, '넷 가운데 하나는 참가자 계정으로 하지 않았습니다', { x: 120, y: tp.bottom + 14, size: 36, rot: -0.4, at: 0.2 });
    const RV = 1.7, QY = Math.max(350, st.y + st.h + 20);
    const chip = t => `<span style="display:inline-flex;align-items:center;justify-content:center;width:62px;height:62px;margin-right:22px;background:${C.green};color:${C.cream};` +
      `font-weight:700;font-size:40px;line-height:1;transform:rotate(-4deg);box-shadow:0 0 0 3px ${C.white},0 3px 6px rgba(30,22,16,.3)">${t}</span>`;
    const hu = T.handsUp(el, { y: QY, h: 980 - QY, grow: true, wrap: true, size: 48, prompt: null, front: '', backTone: 'cream', fitSize: 220, fitMin: 160, revealAt: RV, at: 0.3,
      question: QUIZ.map((t, i) => `<div class="c11-q" style="${i ? 'margin-top:30px' : ''}">${t}</div>`).join(''),
      answer: '<div style="display:flex;align-items:center;gap:48px">' +
          '<div class="p2-fit" style="font-family:var(--body);font-weight:700;line-height:1">④</div>' +
          `<div class="c11-a"><div style="font-size:52px;font-weight:700;line-height:1.25">강사 시연 · 9장</div><div style="font-family:var(--mono);font-size:40px;line-height:1.3;margin-top:16px;color:${C.dim}">Codex CLI</div></div>` +
        '</div>' +
        '<div style="border-top:3px dashed rgba(30,22,16,.3);margin:30px 0 26px"></div>' +
        DONE.map(([n, t], i) => `<div class="c11-a" style="display:flex;align-items:center;font-size:40px;font-weight:500;line-height:1.3;${i ? 'margin-top:18px' : ''}">${chip(n)}${t}</div>`).join('') });
    const qs = [...hu.paper.el.querySelectorAll('.c11-q')], as = [...hu.back.querySelectorAll('.c11-a')];
    // 고른 항목 표시: 답 카드 위 모서리의 주홍 테이프(넘어간 뒤 붙는다). 카드보다 앞에 놓는다
    const CY = parseFloat(hu.el.style.top), tape = T.tape(el, { x: 1800 - 230, y: CY - 22, w: 160, rot: 5, tone: 'red', at: RV + 0.75 });
    css(tape.el, { zIndex: 4 });
    return [bg, tp, st, hu, tape, { render(lt) {
      qs.forEach((d, i) => T.lift(d, lt, 0.45 + i * 0.1, { shadow: false, dur: 0.35, from: 1.04 }));
      as.forEach((d, i) => T.lift(d, lt, RV + 0.7 + i * 0.1, { shadow: false, dur: 0.35, from: 1.04 }));
    } }];
  }, [1.6]) });

  // ─────────────────────────────────────────────────────────────
  // s06 좌우 대비(두 장 모두 크림): 왼쪽 「민원인은 이 프로젝트를 쓰지 못합니다」, 오른쪽 「상담 기록이 공단에 남지 않습니다」.
  // 왼쪽 종이는 글이 많아 폭을 넓혔다(880 · 720). 사진 조각은 두 종이 오른쪽 위 모서리에 걸친다(위 모서리 레몬 테이프)
  DECK.slide({ id: 'p2-ch11-s06', notes: NOTES['p2-ch11-s06'], ...lay(2.0, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '아직 하지 못하는 일이 두 가지입니다', true);
    const VY = tp.bottom + 14 + 76 + 22, VH = 980 - VY, LW = 880, GAP = 80, RX = 120 + LW + GAP, RW = 1800 - RX, P = 52;
    // 왼쪽 종이
    const L = T.paper(el, { x: 120, y: VY, w: LW, h: VH, tone: 'cream', rot: -0.7, at: 0.3, pad: P, seed: 5.5 });
    const lf = line(L.inner, '', { wordBreak: 'keep-all', color: C.ink });
    const lt1 = line(lf, '민원인은 이 프로젝트를<br>쓰지 못합니다', { fontSize: '58px', fontWeight: 700, lineHeight: 1.22 });
    const la = line(lf, '링크로 들어오는 사람: 로그인한 ChatGPT 사용자', { fontSize: '36px', lineHeight: 1.4, marginTop: '22px' });
    const lb = line(lf, '누리집의 민원인은 ChatGPT에 로그인하지 않습니다', { fontWeight: 700, lineHeight: 1.32, marginTop: '16px', textWrap: 'balance' });
    const lg = line(lf, '', { marginTop: '24px', paddingTop: '20px', borderTop: '3px dashed rgba(30,22,16,.3)', fontSize: '36px', lineHeight: 1.4, color: C.dim });
    line(lg, '협업자(함께 쓰도록 초대한 사람): 최대 10명'); line(lg, '승인 기록의 공유 범위: 담당자 4명', { marginTop: '4px' });
    // 「누리집의 민원인은 …」 줄(이 장에서 가장 눈에 띄는 줄)을 종이에 드는 가장 큰 글자로(52px 부터)
    let lbs = 52;
    for (; lbs >= 44; lbs -= 2) { css(lb, { fontSize: px(lbs) }); if (lf.offsetHeight <= VH - 2 * P) break; }
    if (lf.offsetHeight > VH - 2 * P) { console.warn(`[DECK] s06 왼쪽 종이 글자가 넘친다(${lf.offsetHeight - VH + 2 * P}px)`); L.el.style.outline = '6px dashed #FF00AA'; }
    const n1 = numChip(L.el, 1, { x: -22, y: -26, size: 84, at: 0.42, rot: -5 });
    // 휴대폰 사진 조각: 왼쪽 종이 오른쪽 위 모서리. 출처 띠 오른쪽 끝 뒤에서 시작해 위로 올리고, 아래 끝은 제목 아래 첫 줄 위에서 멈춘다
    const t1End = 120 + P + textW(el, '민원인은 이 프로젝트를', { fontSize: '58px', fontWeight: 700 });
    const PHW = 150, PHX = Math.max(t1End + 20, 120 + LW - 104), PHY = tp.bottom + 14 + 76 + 4;   // 지운 출처 띠의 아래 끝 기준을 그대로 쓴다
    const PHH = Math.min(300, VY + P + lt1.offsetHeight + 22 - 8 - PHY);
    if (PHX + PHW > RX - 24) console.warn(`[DECK] s06 휴대폰 조각이 오른쪽 종이에 닿는다(${PHX + PHW - RX + 24}px)`);
    const ph1 = T.cutout(el, IMG + 'p2-ch11-s06-phone_cut.png', { x: PHX, y: PHY, w: PHW, h: PHH, rot: 4, at: 0.5, fallback: 'laptop' });
    const tp1 = T.tape(el, { x: PHX + PHW / 2 - 60, y: PHY - 14, w: 120, rot: -6, at: 0.62 });
    const lrows = [lt1, la, lb, lg];
    // 오른쪽 종이: 위쪽에 보관 상자 사진 조각을 크게(오른쪽 위 모서리에 걸친다), 글은 종이 아래쪽
    const R = T.paper(el, { x: RX, y: VY + 10, w: RW, h: VH - 10, tone: 'cream', rot: 0.8, at: 1.0, pad: P, seed: 6.4 });
    const rf = line(R.inner, '', { wordBreak: 'keep-all', color: C.ink });
    const rt = line(rf, '상담 기록이 공단에<br>남지 않습니다', { fontSize: '58px', fontWeight: 700, lineHeight: 1.22 });
    const rb = line(rf, '대화는 ChatGPT 프로젝트 안에 있습니다', { fontSize: '52px', fontWeight: 500, lineHeight: 1.36, marginTop: '26px', textWrap: 'balance' });
    const room = VH - 10 - 2 * P;
    css(rf, { marginTop: px(Math.max(0, room - rf.offsetHeight - 6)) });
    const n2 = numChip(R.el, 2, { x: -22, y: -26, size: 84, at: 1.12, rot: 4 });
    const rTop = VY + 10 + P + parseFloat(rf.style.marginTop);   // 오른쪽 제목 첫 줄의 y
    const BXY = Math.max(tp.bottom + 12, VY - 90), BXH = Math.min(380, rTop - 26 - BXY), BXW = Math.round(BXH * 0.96), BXX = 1800 - BXW + 44;
    const ph2 = T.cutout(el, IMG + 'p2-ch11-s06-box_cut.png', { x: BXX, y: BXY, w: BXW, h: BXH, rot: -3, at: 1.2, fallback: 'summary' });
    const tp2 = T.tape(el, { x: BXX + BXW / 2 - 60, y: BXY - 14, w: 120, rot: 5, at: 1.32 });
    return [bg, tp, L, n1, ...lrows.map((d, i) => rise(d, 0.45 + i * 0.12, { from: 1.04 })), ph1, tp1,
      R, n2, rise(rt, 1.2, { from: 1.04 }), rise(rb, 1.34, { from: 1.04 }), ph2, tp2];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s07 한 문장: 파트 2 의 답을 넘기는 질문(파트 3 의 질문). Black Han Sans 세 줄을 종이 폭(1680)에 맞춰 키운다.
  // 제목 띠 아래 띠(48px)에 「윤지영 본부장 · 민원인이 직접 쓸 수 있습니까?」. 종이 오른쪽 위에 민원 출력물 사진 조각(레몬 테이프). 주홍은 쓰지 않는다
  const EXIT = ['ChatGPT 안의 프로젝트를 민원인이', '누리집에서 쓰는 서비스로 만들려면', '무엇이 더 필요하고, 그 일을 누가 하는가'];
  DECK.slide({ id: 'p2-ch11-s07', notes: NOTES['p2-ch11-s07'], ...lay(2.2, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '파트 3은 이 질문에서 시작합니다', true);
    const st = T.strip(el, '<b>윤지영 본부장</b> · 민원인이 직접 쓸 수 있습니까?', { x: 120, y: tp.bottom + 14, size: 48, rot: -0.6, at: 0.2, padY: 12 });
    const SY = st.y + st.h + 20, SH = 980 - SY, PX = 64, PY = 50, IW = 1680 - 2 * PX;
    const pp = T.paper(el, { x: 120, y: SY, w: 1680, h: SH, tone: 'cream', rot: -0.5, at: 0.3, seed: 8.1 });
    const col = line(pp.inner, '', { position: 'absolute', left: px(PX), width: px(IW), color: C.ink });
    const kick = line(col, '다음 질문', { fontSize: '40px', fontWeight: 700, lineHeight: 1.2, color: C.dim });
    const rows = EXIT.map(t => line(col, t, { fontFamily: 'var(--display)', lineHeight: 1.16, whiteSpace: 'nowrap' }));
    const sub = line(col, '다음: 파트 3 · 프로젝트에서 서비스로: 에이전트 팀과 승인 지점', { fontSize: '44px', fontWeight: 500, lineHeight: 1.36, marginTop: '30px', color: C.dim });
    // 세 줄의 줄 나눔을 지킨 채 가장 긴 줄이 종이 안 폭에 들고, 전체가 종이 높이에 드는 가장 큰 글자
    const w100 = Math.max(...EXIT.map(t => textW(el, t, { fontFamily: 'var(--display)', fontSize: '100px' })));
    let S = Math.min(120, Math.floor(100 * (IW - 8) / w100));
    const fit = () => { rows.forEach((r, i) => css(r, { fontSize: px(S), marginTop: i ? '0' : '18px' })); return col.offsetHeight <= SH - 2 * PY; };
    while (!fit() && S > 72) S -= 2;
    if (col.offsetHeight > SH - 2 * PY) { console.warn('[DECK] s07 한 문장이 종이에 들지 않는다'); pp.el.style.outline = '6px dashed #FF00AA'; }
    css(col, { top: px(Math.round((SH - col.offsetHeight) / 2)) });
    // 사진 조각: 첫 줄 끝 오른쪽, 셋째 줄 위
    const r1End = 120 + PX + textW(el, EXIT[0], { fontFamily: 'var(--display)', fontSize: px(S) });
    const r3Top = SY + col.offsetTop + rows[2].offsetTop;
    const CX0 = Math.max(r1End + 24, 1540), CW0 = Math.min(300, 1884 - CX0), CY0 = Math.max(tp.bottom + 8, SY - 110), CH0 = Math.min(Math.round(CW0 * 1.36), r3Top - 12 - CY0);
    if (CW0 < 220) console.warn(`[DECK] s07 사진 조각 자리가 좁다(${CW0}px)`);
    const ph = T.cutout(el, IMG + 'p2-key-printout_cut.png', { x: CX0, y: CY0, w: CW0, h: CH0, rot: 3, at: 1.3, fallback: 'doc' });
    const pt = T.tape(el, { x: CX0 + CW0 / 2 - 70, y: CY0 - 12, w: 140, rot: -5, at: 1.4 });
    const parts = [kick, ...rows, sub];
    return [bg, tp, st, pp, ...parts.map((d, i) => rise(d, 0.5 + i * 0.15, { from: 1.04 })), ph, pt];
  }) });
})();
