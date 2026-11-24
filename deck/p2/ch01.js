/* 파트 2 · 1장 「시범 운영 2주: 완성품 먼저 보기」 장면 코드 — 레이아웃 목록(deck/themes/p2.md 8절)으로 다시 만들었다(2026-11-24).
 * 원고: plan/slides/p2-ch01.json · 배정표: plan/assets/p2_layout_ch01.md · 본보기: deck/p2/ch00.js · 시범 챕터: deck/p2/ch06.js
 * 키 누름은 없다. 모든 장이 키 누름 없이 차례로 놓여 3초 안팎에 끝 상태가 된다.
 * 캡처(deck/assets/p2/shots/p2-ch01-s03.png)가 아직 없어 s03 의 화면은 THEME.shot 의 그린 화면이다.
 * 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다. */
(function () {
  'use strict';
  const { ease, prog, css, h, s } = REEL;
  const T = THEME, C = THEME.C;
  const CH = '시범 운영 2주: 완성품 먼저 보기';
  DECK.config({ part: 'p2', chapter: 'ch01', title: CH });

  const NOTES = {
    "p2-ch01-s01": "파트 2를 시작합니다. 파트 1 마지막 화면에서 넘긴 질문이 그대로 파트 2의 질문입니다. 규정을 근거로 답하고 규정에 없으면 담당자에게 넘기는 민원 상담 프로젝트를 ChatGPT Plus만으로 만들 수 있는가. 파트 2에서는 여러분이 이 프로젝트를 직접 만들고, 시험하고, 승인까지 받아 봅니다. 이 질문의 답은 파트 2 11장에서 정리합니다.",
    "p2-ch01-s02": "파트 1 10장에서 오민석 팀장이 범위를 좁힌 2주 시범 운영을 허락했습니다. 허락에는 조건이 세 가지 붙었습니다. 범위를 좁힐 것, 시험 결과를 가져올 것, 팀장 승인 뒤에만 팀이 쓸 것입니다. 화면 아래 문구대로 파트 2에 나오는 기관, 인물, 규정, 민원, 수치도 모두 가상 사례입니다. 조건을 채우는 순서를 보기 전에, 파트 1부터 따라온 한서윤 주임이 승인을 받으러 가져갈 완성품부터 보겠습니다.",
    "p2-ch01-s03": "제가 강의 전에 만들어 둔 완성본으로, 파트 1 10장 마지막 화면에서 이름을 본 「새별 민원 상담」 프로젝트입니다. 파트 1 7장에서 본 대로 프로젝트에는 답하는 규칙을 적은 지침과 규정 파일을 한 번 넣어 두고, 그 안에서 여는 새 대화마다 이 둘을 함께 씁니다. 그래서 요청문과 규정 파일을 다시 붙여 넣지 않고 수영 초급반 환불 민원만 물었습니다. 다섯 칸으로 나뉜 답에서 ① 금액 34,000원과 ② 근거 조문 제7조 제1항 제2호를 봐 주세요. codex는 ChatGPT 플랜에 함께 들어 있는 다른 도구이고, 이 답은 강의 전에 codex로 한 번 돌려 본 예라서 여러분이 4장에서 받을 답은 문장이 다를 수 있습니다. (강사 확인: 답 말풍선은 codex로 지침 1판 프로젝트를 흉내 내 Q1을 1회 보낸 결과(labs/_검증기록.md V-03, 2026-11-23)입니다. 납품 전 강사 사전 확인 K-03 때 ChatGPT 화면을 찍어 캡처로 바꿉니다. 바꾼 뒤에는 「codex로 한 번 돌려 본 예」라는 말을 빼고 「문장이 다를 수 있다」는 그대로 둡니다.)",
    "p2-ch01-s04": "완성본의 답에서 볼 동작은 네 가지입니다. 카드의 Q는 4장에서 보낼 확인 질문의 번호이고, 다섯 개 가운데 세 개를 골라 실었습니다. 답마다 [근거] 칸에 조문 번호가 붙고, 규정에 없는 공연장 대관료를 물으면 금액 없이 「담당자 확인 필요」와 문화센터 운영팀 내선 2301을 적습니다. 이름과 전화번호가 든 민원에는 맨 앞에 경고를 내고 그 정보를 답변에 옮기지 않으며, 답은 늘 같은 다섯 칸으로 나옵니다. 네 가지 모두 4장에서 질문 다섯 개를 보내 여러분 화면에서 확인합니다. 파트 1 5장에서는 이름을 지운 민원을 넣었고 2장의 한 줄 요청에는 개인정보 규칙이 없었으므로, 개인정보 경고는 4장 Q5에서 처음 시험합니다. (화면에서 옮긴 문구: 「Q4 · 공연장 대관료」)",
    "p2-ch01-s05": "팀장의 조건 세 가지를 파트 2의 챕터에 놓아 보면 이 순서이고, 조각 1과 3에는 장마다 아래 줄에 그 장에서 하는 일을 적었습니다. 첫 조건인 범위는 2장 실습에서 민원 목록을 세어 먼저 맡길 민원 유형 두 가지를 고르는 일입니다. 3장에서는 프로젝트가 무엇을 근거로 어떤 형식으로 답할지 설계서 한 장에 적고, 4장에서 그 내용으로 프로젝트를 만듭니다. 두 번째 조건인 시험은 5장부터 9장까지입니다. 5장에서는 시험 질문 12개와 질문마다 기대 답과 근거 조문을 적은 시험표를 보고, 12개 중 몇 개를 통과해야 하는지 정합니다. 이야기에서는 한서윤 주임이 이 시험표를 쓰고, 여러분은 실습 묶음에 든 시험표를 받아 씁니다. 6장에서는 그 표로 채점하며 지침을 고칩니다. 7장의 검토자는 프로젝트를 만든 사람 말고 다른 쪽이 답변 초안을 통과 또는 다시 쓰기로 판정하게 하는 역할이고, 8장에서 검토만 하는 프로젝트를 하나 더 만듭니다. 9장은 에이전트 둘이 시험을 실행하는 것을 제가 보여 드리는 시연입니다. 마지막 조건인 승인은 10장에서 승인 요약 한 장으로 받습니다. 승인 요약에는 만든 것, 시험 결과, 남는 위험, 사람이 정할 것을 적고, 11장에서 파트 2의 질문에 답하며 정리합니다. 「실습」이라고 적힌 다섯 챕터는 모두 ChatGPT Plus 웹 화면에서 합니다. (화면에서 지운 기준 시점: 「2026년 11월 기준」)",
    "p2-ch01-s06": "실습 다섯 개는 결과물을 하나씩 남기고, 그 결과물을 다음 실습에서 씁니다. 2장의 시범 범위 판단표로 범위를 정해 4장에서 「새별 민원 상담」을 만들고, 6장에서 그 프로젝트를 시험해 시험 기록을 남깁니다. 8장에서는 검토만 하는 「새별 답변 검토」를 만들어 판정 기록을 남기고, 10장에서 시험 기록과 판정 기록으로 승인 요약을 써서 승인 기록까지 받습니다. 파트 1 10장 마지막 화면에서 본 두 프로젝트와 시험 기록·승인 기록이 이것입니다. 앞 실습을 끝내지 못해도 다음 실습은 이어 갈 수 있습니다. 판단표는 lab2/완성본/범위_판단표_예.md, 시험 기록은 lab4/완성본/시험기록_예.md, 판정 기록은 lab5/완성본/판정_예.md를 가져옵니다. 프로젝트는 폴더에서 가져올 수 없으니 lab3/지침_1판.md와 자료 폴더의 파일 3개로 다시 만듭니다.",
    "p2-ch01-s07": "첫 조건인 범위부터 정합니다. 새별시설공단의 민원 접수 목록은 화면의 여섯 유형으로 나뉘고, 유형마다 옆 칸에 목록에 적힌 민원 요지를 하나씩 붙였습니다. 오른쪽 카드의 기준 네 가지, 곧 건수가 많은가, 처리일수가 긴가, 규정으로 답이 정해지는가, 사람의 판단이 필요한가를 보고 프로젝트에 먼저 맡길 두 유형을 골라 보세요. 이 네 가지는 2장에서 채울 시범 범위 판단표의 칸입니다. 건수와 처리일수는 아직 세지 않았으니 짐작으로 판단하고, 제가 유형을 하나씩 읽으면 고른 두 가지에서 손을 들어 주세요.",
    "p2-ch01-s07a": "질문 「민원 유형 가운데 어느 것부터 프로젝트에 맡길 것인가」는 2장에서 민원 240건을 직접 세어 답합니다. 지금 고른 두 유형은 그때 건수를 보고 다시 판단합니다."
  };

  // 슬라이드 하나: build(el) 가 돌려준 부품을 차례로 그린다. 부품은 모두 render(lt, ctx) 를 가진다
  const lay = (dur, build) => ({ dur, steps: [],
    setup(el) { this.parts = build.call(this, el).filter(Boolean); },
    render(lt, ctx) { this.parts.forEach(p => p.render(lt, ctx)); } });
  const top = (el, title, fiction) => T.top(el, { chapter: 1, chapterTitle: CH, title, fiction });
  // 부품 밖의 요소 하나를 놓는 움직임(그림자 없이 from 배에서 1배로)
  const put = (el, at, o = {}) => ({ render: lt => T.lift(el, lt, at, Object.assign({ shadow: false, dur: 0.4, from: 1.05 }, o)) });
  const each = (list, fn) => ({ render: (lt, ctx) => list.forEach((x, i) => fn(x, i, lt, ctx)) });
  // 요소의 자리를 다른 요소 기준 px 로 잰다(무대 배율을 되돌린다)
  function posIn(node, base) {
    const a = node.getBoundingClientRect(), b = base.getBoundingClientRect(), k = b.width / base.offsetWidth;
    return { x: (a.left - b.left) / k, y: (a.top - b.top) / k, w: a.width / k, h: a.height / k, r: (a.right - b.left) / k, b: (a.bottom - b.top) / k };
  }
  // 글 안에 붙이는 작은 색지 조각(번호, 고리 번호). tone 은 테마 색 이름
  const chip = (t, tone, st = '') => `<span class="c1-chip p2-${tone} p2-grain" style="position:relative;display:inline-flex;align-items:center;justify-content:center;` +
    `box-shadow:0 0 0 3px ${C.white},2px 3px 5px rgba(30,22,16,.25);${st}">${t}</span>`;
  const DIM = t => `<span style="color:var(--dim)">${t}</span>`;

  // ─────────────────────────────────────────────────────────────
  // s01 전환(파트 인트로): 영상 p2-intro 를 정방향으로 깔고 오른쪽으로 96px 옮긴다. 왼쪽 크림 띠에 꼬리표, 음절 조각 제목, 파트 질문 세 줄
  DECK.slide({
    id: 'p2-ch01-s01', dur: 3.4, steps: [], notes: NOTES['p2-ch01-s01'],
    setup(el) {
      this.vt = T.videoTitle(el, {
        kind: 'intro', scene: 'intro', kicker: '파트 2',
        src: '../assets/video/p2/p2-intro.mp4', poster: '../assets/video/p2/p2-intro.jpg',
        title: '규정으로 답하는\n민원 상담 프로젝트 만들기',
        sub: '규정을 근거로 답하고 규정에 없으면\n담당자에게 넘기는 민원 상담 프로젝트를\nChatGPT Plus만으로 만들 수 있는가',
        padX: 56,
      });
      // 영상 속 바인더의 왼쪽 끝(x 약 1115)이 크림 띠에 가려지지 않게 영상을 오른쪽으로 96px 옮긴다.
      // 영상이 비운 왼쪽 96px 에는 크라프트 바탕을 깔고, 영상 왼쪽 가장자리 60px 를 바탕과 섞는다.
      const media = this.vt.el.querySelector('.p2-vt-media');
      this.kraft = T.bg(this.vt.el, 'base');
      this.vt.el.insertBefore(this.kraft.el, media);
      const mask = 'linear-gradient(to right, transparent 0, #000 60px)';
      css(media, { transform: 'translateX(96px)', maskImage: mask, webkitMaskImage: mask });
      // 테마는 질문을 한 번에 닦아 연다. 원고대로 위 줄부터 0.2초 간격으로 한 줄씩 열려고 줄마다 나눈다(줄 나눔은 같다).
      const q = this.q = el.querySelector('.p2-q');
      const lines = q.textContent.split('\n');
      q.textContent = '';
      this.ql = lines.map(t => { const d = h('div', '', q); d.textContent = t; css(d, { transformOrigin: '0 50%' }); return d; });
      this.qAt = this.vt.title.end + 0.05;
    },
    render(lt, ctx) {
      this.kraft.render(lt, ctx);
      this.vt.render(lt, ctx);
      this.q.style.clipPath = 'none';
      this.q.style.opacity = lt >= this.qAt ? '1' : '0';
      this.ql.forEach((d, i) => {
        const t0 = this.qAt + i * 0.2, p = prog(lt, t0, 0.5, ease.outCubic);
        d.style.opacity = lt >= t0 ? '1' : '0';
        d.style.clipPath = `inset(-12px ${(100 - 100 * p).toFixed(2)}% -12px -12px)`;
        d.style.transform = `scale(${(1.03 - 0.03 * p).toFixed(4)})`;
      });
    },
  });

  // ─────────────────────────────────────────────────────────────
  // s02 인물과 대사: 오민석 팀장(1.9배)과 조건 세 줄을 쓴 대사 종이. 2번 줄 끝에 시험표 사진 조각, 종이 아래에 가상 사례 고지 띠
  const COND = ['범위를 좁힐 것', '시험 결과를 가져올 것', '팀장 승인 뒤에만 팀이 쓸 것'];
  DECK.slide({ id: 'p2-ch01-s02', notes: NOTES['p2-ch01-s02'], ...lay(2.4, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '오민석 팀장이 조건 세 가지를 겁니다', true);
    const BX = 740, BY = 290;
    const rows = COND.map((t, i) => `<div class="c2-row" style="display:flex;align-items:center;gap:26px;white-space:nowrap;margin-top:${i ? 22 : 0}px">` +
      chip(String(i + 1), 'lemon', `flex:none;width:66px;height:72px;font-family:var(--num);font-weight:400;font-size:50px;line-height:1;transform:rotate(${[-4, 3, -2][i]}deg)`) +
      `<span class="c2-tx">${t}</span></div>`).join('');
    const sp = T.speech(el, { who: 'oh', scale: 1.9, x: 130, org: true, size: 60, bubble: { x: BX, y: BY, w: 1040 }, at: 0.2, text: rows, sub: '시범 운영 2주를 시작하기 전에' });
    const col = sp.el.querySelector('.p2-in').lastElementChild;
    css(col.firstElementChild, { whiteSpace: 'normal' });
    const rowEls = [...col.querySelectorAll('.c2-row')], subEl = col.lastElementChild;
    const tag = T.tag(el, '오민석 팀장의 조건', { x: BX + 44, y: BY - 34, size: 34, at: 0.6, rot: -2 });
    // 사진 조각: 2번 줄 글 끝 바로 뒤, 줄 높이 가운데
    // 사진 조각: 2번 줄 글 끝 바로 뒤. 아래 끝을 2번 줄 아래에 맞춰 더 긴 3번 줄을 가리지 않는다
    const r2 = posIn(rowEls[1].querySelector('.c2-tx'), el), b2 = posIn(rowEls[1], el).b;
    const photo = T.cutout(el, '../assets/img/p2/p2-ch01-s02-testsheet_cut.png', { x: Math.round(r2.r + 40), y: Math.round(b2 + 8 - 220), w: 176, h: 220, rot: 4, at: 1.2, fallback: 'table' });
    const bottom = BY + sp.el.offsetHeight;
    const notice = T.strip(el, '이 강의에 나오는 새별시설공단, 새별시, 등장인물, 규정, 민원, 수치는 모두 실습을 위해 만든 가상 사례입니다. 실제 기관이나 인물과 관계가 없습니다.',
      { x: BX, y: bottom + 34, w: 1040, size: 34, lh: 1.4, torn: 'left right', rot: 0, at: 1.4, padY: 16 });
    return [bg, tp, sp, tag,
      each(rowEls, (r, i, lt) => T.lift(r, lt, 0.65 + i * 0.15, { shadow: false, dur: 0.4, from: 1.06 })),
      put(subEl, 1.1, { from: 1.03 }), photo, notice];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s03 화면 크게: 그린 대화 화면(프로젝트 「새별 민원 상담」 안의 대화)이 화면 폭을 다 쓴다(틀 안 글자 36px). 고리 1은 [계산]의 34,000원, 고리 2는 [근거]의 조문 번호(46px, 굵게).
  // 「볼 곳」 쪽지는 제목 띠 오른쪽, 출처 두 줄은 틀 아래 띠 한 장
  const Q1 = '11월 수영 초급반(수강료 60,000원)을 다니고 있는데 12회 중 4회가 진행되었습니다. 오늘 그만두면 얼마를 돌려받나요?';
  const B = t => `<b style="font-weight:700">${t}</b>`;
  const MK = 'white-space:nowrap;font-size:46px;font-weight:700;line-height:1.2';
  const ANSWER = [
    `${B('[민원 요지]')} 11월 수영 초급반 12회 중 4회가 진행된 시점의 환불 금액 문의`,
    `${B('[답변]')} 오늘 환불을 신청하시면, 말씀해 주신 진행 횟수를 기준으로 ${B('34,000원')}을 돌려받으실 수 있습니다.`,
    `${B('[계산]')} 60,000원 × (12회 − 4회) ÷ 12회 − 60,000원 × 10% = <span class="c3-m1" style="${MK};margin-left:10px">34,000원</span>`,
    `${B('[근거]')} 새별_체육시설_이용규정 <span class="c3-m2" style="${MK};margin:0 14px">제7조 제1항 제2호</span>: “강습 시작일 이후에 신청한 경우: …”`,
    `${B('[담당자 확인]')} 불필요 — 제공된 수강료와 진행 횟수로 규정에 따라 계산할 수 있습니다.`,
  ];
  const S03 = { shot: 0.3, user: 0.7, ans: 1.1, m1: 1.6, m2: 1.9, src: 2.2 };
  DECK.slide({ id: 'p2-ch01-s03', notes: NOTES['p2-ch01-s03'], ...lay(2.8, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '완성된 프로젝트는 이렇게 답합니다', true);
    const band = T.strip(el, '강사 완성본 · 「새별 민원 상담」 프로젝트', { x: 120, y: tp.bottom + 6, size: 36, rot: -0.6, at: 0.2 });
    // 틀: x 120~1800(테두리 포함), 위는 띠 아래 끝에서 30px 겹치고 아래는 y 898
    const SY = band.y + band.h - 30, SW = 1680 - 28, SH = 898 - SY - 28, GUT = 70;
    let user = null, lines = [], over = 0;
    const shot = T.shot(el, null, { x: 120, y: SY, w: SW, h: SH, at: S03.shot, url: 'chatgpt.com',
      draw(main, frame) {
        css(frame.el.querySelector('.kit-bar'), { height: '40px' });
        const wrap = h('div', '', main);
        css(wrap, { position: 'absolute', inset: '0', display: 'flex', flexDirection: 'column', color: C.ink });
        const head = h('div', '', wrap);
        css(head, { flex: 'none', display: 'flex', alignItems: 'center', gap: '16px', height: '50px', padding: '0 34px', fontSize: '40px', fontWeight: 700,
          borderBottom: '2px solid rgba(30,22,16,.1)' });
        const ic = s('svg', { viewBox: '0 0 40 34', width: 40, height: 34 }, head);
        ic.innerHTML = '<path d="M2 6 a3 3 0 0 1 3 -3 h10 l4 5 h16 a3 3 0 0 1 3 3 v18 a3 3 0 0 1 -3 3 h-30 a3 3 0 0 1 -3 -3 z" fill="none" stroke="#5A4A3A" stroke-width="3.4" stroke-linejoin="round"/>';
        h('span', '', head).textContent = '새별 민원 상담';
        // 대화 칸: 글이 칸보다 길면 아래쪽(답)을 맞추고 사용자 말풍선이 위로 밀려 올라간다
        const body = h('div', '', wrap);
        css(body, { flex: '1', minHeight: '0', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 34px 10px' });
        user = h('div', 'kit-msg kit-user', body);
        css(user, { flex: 'none', alignSelf: 'flex-end', maxWidth: '80%', transformOrigin: '100% 100%' });
        css(h('div', 'kit-bubble', user, Q1), { padding: '10px 28px 11px', fontSize: '36px', lineHeight: 1.4 });
        const ai = h('div', '', body);
        css(ai, { flex: 'none', position: 'relative', marginTop: '10px', paddingLeft: GUT + 'px', fontSize: '36px', lineHeight: 1.36 });
        lines = ANSWER.map((t, i) => { const d = h('div', '', ai, t); css(d, { position: 'relative', marginTop: i === 4 ? '9px' : i ? '4px' : '0', transformOrigin: '0 50%' }); return d; });   // 고리 2 아래 줄은 고리와 닿지 않게 띄운다
        over = Math.max(0, 6 - posIn(user, body).y);   // 아래로 맞춘 칸에서 넘친 높이는 위쪽으로 나간다(scrollHeight 로 잴 수 없다)
        // 번호 조각은 답 왼쪽 여백(GUT)에, 짚는 줄과 같은 높이로
        const ax = posIn(ai, frame.el).x;
        return [['.c3-m1', 1, S03.m1], ['.c3-m2', 2, S03.m2]].map(([q, n, at]) => {
          const node = ai.querySelector(q), p = posIn(node, frame.el);
          return { node, n, at, num: [ax + GUT / 2 - 42, p.y + p.h / 2 - 32] };
        });
      } });
    if (over) console.warn(`[DECK] 그린 화면의 대화가 칸보다 ${Math.round(over)}px 길다(사용자 말풍선이 위로 밀린다)`);
    // 「볼 곳」 쪽지: 제목 띠 오른쪽(오른쪽 끝 x 1800, 틀 위)
    const NUMST = 'width:58px;height:58px;margin-right:4px;font-size:40px;font-weight:700;vertical-align:-6px;transform:rotate(-4deg)';
    const LW = 500, LX = 1800 - LW;
    if (LX < 120 + tp.title.el.offsetWidth + 20) console.warn('[DECK] s03 볼 곳 쪽지가 제목 띠와 겹친다');
    const look = T.callout(el, { x: LX, y: 100, w: LW, tone: 'cream', size: 40, rot: 1.2, at: 1.35,
      text: `${DIM('볼 곳')}<br><span style="white-space:nowrap">${chip('①', 'red', NUMST)} 금액</span><span style="white-space:nowrap;margin-left:34px">${chip('②', 'red', NUMST)} 근거 조문</span>` });
    if (100 + look.h > SY + 6) console.warn('[DECK] s03 볼 곳 쪽지가 화면 틀과 겹친다');
    const nums = [...look.el.querySelectorAll('.c1-chip')];
    // 출처 띠: 틀 아래 한 장
    const src = T.strip(el, '참가자 화면의 문장은 다를 수 있습니다',
      { right: 1800, y: 904, size: 34, rot: -0.4, at: S03.src, padY: 10 });
    el.appendChild(band.el);                                   // 띠를 화면 인쇄물 위에 겹쳐 붙인다
    return [bg, tp, band, shot,
      put(user, S03.user, { from: 1.04 }),
      each(lines, (d, i, lt) => T.lift(d, lt, S03.ans + i * 0.12, { shadow: false, dur: 0.4, from: 1.03 })),
      look, each(nums, (n, i, lt) => T.lift(n, lt, [S03.m1, S03.m2][i] + 0.1, { shadow: false, dur: 0.35, from: 1.3, rot: -4 })),
      src];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s04 카드 격자(2×2): 핵심 동작 네 가지. 카드마다 동작 이름과 예 한 가지. 2번·3번 카드 오른쪽 위 모서리에 사진 조각
  const WARN = '<svg viewBox="0 0 40 36" width="40" height="36" style="display:inline-block;vertical-align:-5px;margin-right:10px">' +
    `<path d="M20 2 L38 34 H2 Z" fill="${C.ink}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>` +
    `<rect x="18" y="12" width="4.4" height="12" rx="1.6" fill="${C.cream}"/><circle cx="20.2" cy="28.4" r="2.5" fill="${C.cream}"/></svg>`;
  const SLOTS = ['[민원 요지]', '[답변]', '[계산]', '[근거]', '[담당자 확인]'];
  const S04 = { at: 0.3, each: 0.15 };
  DECK.slide({ id: 'p2-ch01-s04', notes: NOTES['p2-ch01-s04'], ...lay(2.2, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '핵심 동작은 네 가지입니다', true);
    const tw = tp.title.el.offsetWidth;
    // 레몬 띠는 제목 띠 오른쪽, 같은 높이에. 2번 카드의 사진 조각(x 1640~)과 겹치지 않게 오른쪽 끝을 1600 에 둔다
    const band = T.strip(el, '기대 결과 · 4장에서 직접 확인', { right: 1600, y: 140, size: 34, tone: 'lemon', weight: 700, rot: 1.2, at: 0.25 });
    if (band.x < 120 + tw + 20) console.warn('[DECK] s04 레몬 띠가 제목 띠와 겹친다');
    const GY = 286, GH = 694;
    const chips = SLOTS.map((t, i) => `<span class="c4-slot p2-white p2-grain" style="display:inline-block;font-family:var(--mono);font-size:36px;font-weight:500;line-height:1.2;` +
      `padding:6px 16px 7px;margin:0 14px 14px 0;box-shadow:0 0 0 2px rgba(30,22,16,.14),2px 4px 6px rgba(30,22,16,.18)">${t}</span>${i === 2 ? '<br>' : ''}`).join('');
    const items = [
      { label: 'Q1 · 수영 초급반 환불', title: '답변마다 근거 조문 번호', body: '[근거] 체육시설 이용 규정 <span style="white-space:nowrap">제7조 제1항 제2호</span>' },
      { title: '규정에 없으면 「담당자 확인 필요」', body: '금액을 쓰지 않습니다<br>[담당자 확인] 필요 — <span style="white-space:nowrap">문화센터 운영팀(내선 2301)</span>' },
      { label: 'Q5 · 이름과 전화번호가 든 민원', title: '개인정보가 든 입력에는 경고', body: WARN + '개인정보가 포함된 민원입니다. 개인정보를 지운 뒤 입력해 주세요.' },
      { label: '모든 답', title: '다섯 칸으로 고정된 답변 형식', body: chips },
    ].map((d, i) => Object.assign(d, { pad: 36, tape: { at: S04.at + i * S04.each + 0.1, x: 335 } }));
    const gd = T.grid(el, { cols: 2, x: 120, y: GY, w: 1680, h: GH, gap: 40, titleSize: 44, bodySize: 36, at: S04.at, each: S04.each, items });
    const slots = [...gd.cards[3].el.querySelectorAll('.c4-slot')];
    css(gd.cards[3].body, { marginTop: '18px', lineHeight: 1 });
    gd.cards.forEach(c => css(c.flow, { marginTop: Math.max(0, Math.round((c.h - 72 - c.flow.offsetHeight) / 2)) + 'px' }));   // 카드 안 글을 세로 가운데에
    // 사진 조각: 2번 카드는 제목 줄 위(카드 위 가장자리 밖으로 걸친다), 3번 카드는 오른쪽 위 모서리
    const c2 = gd.cards[1], c3 = gd.cards[2];
    const ph2 = T.cutout(el, '../assets/img/p2/p2-ch01-s04-phone_cut.png', { x: c2.x + c2.w - 176, y: c2.y - 128, w: 176, h: 160, rot: 5, at: S04.at + S04.each + 0.1, border: 10 });
    const ph3 = T.cutout(el, '../assets/img/p2/p2-ch01-s04-redacted_cut.png', { x: c3.x + c3.w - 150, y: c3.y - 74, w: 150, h: 190, rot: -4, at: S04.at + 2 * S04.each + 0.1, border: 10, fallback: 'doc' });
    return [bg, tp, band, gd, ph2, ph3,
      each(slots, (d, i, lt) => T.lift(d, lt, S04.at + 3 * S04.each + 0.25 + i * 0.06, { shadow: false, dur: 0.35, from: 1.12, rot: i % 2 ? 1.4 : -1.2 }))];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s05 순서 조각(셋): 조건 1 · 범위 / 조건 2 · 시험 / 조건 3 · 승인. 조각 안에 장마다 장 이름과 하는 일.
  // 머리 번호 조각은 셋 모두 주홍이어야 해서 THEME.sequence 대신 같은 자리 규칙으로 직접 놓는다
  const SEQ = [
    { head: '조건 1 · 범위', rows: [['2장 · 실습', '민원 유형 두 가지 고르기'], ['만들기'], ['3장 · 설계서', '만들기 전에 적는 한 장'], ['4장 · 실습', '프로젝트 만들기']] },
    { head: '조건 2 · 시험', rows: [['5장 · 통과 기준'], ['6장 · 실습'], ['7장 · 검토자'], ['8장 · 실습'], ['9장 · 강사 시연']], big: true },
    { head: '조건 3 · 승인', rows: [['10장 · 실습', '승인 요약 한 장 쓰기'], ['정리'], ['11장 · 정리', '파트 2 질문에 답하기']] },
  ];
  // 장 이름 조각: 「실습」은 레몬 바탕, 「강사 시연」은 짙은 색지(크림 글자), 나머지는 바탕 없이
  function chName(t, size) {
    const tone = /실습$/.test(t) ? 'lemon' : /강사 시연$/.test(t) ? 'dark' : null;
    const st = `font-size:${size}px;font-weight:700;line-height:1.2;white-space:nowrap;`;
    if (!tone) return `<span style="${st}color:${size > 36 ? C.ink : C.dim}">${t}</span>`;
    return `<span class="p2-${tone} p2-grain" style="${st}display:inline-block;padding:4px 14px 5px;margin-left:-14px;box-shadow:0 0 0 3px ${C.white}">${t}</span>`;
  }
  DECK.slide({ id: 'p2-ch01-s05', notes: NOTES['p2-ch01-s05'], ...lay(1.9, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '조건 세 가지가 실습 순서입니다', false);
    const by = tp.bottom + 8;
    const b1 = T.strip(el, '프로젝트 만들기는 범위와 시험 사이', { x: 120, y: by, size: 36, tone: 'lemon', weight: 700, rot: -0.6, at: 0.15 });
    const b2 = T.strip(el, '실습: ChatGPT Plus 웹 화면', { right: 1800, y: by + 4, size: 34, tone: 'cream', rot: 0.6, at: 0.2 });
    const X = 120, W = 1680, GAP = 36, PW = Math.floor((W - 2 * GAP) / 3), PY = b1.y + b1.h + 40, PH = 980 - 20 - PY, P = 38;
    const parts = [];
    SEQ.forEach((d, i) => {
      const at = 0.3 + i * 0.2, rot = [-1.1, 0.8, -0.6][i];
      const pp = T.paper(el, { x: X + i * (PW + GAP), y: PY + (i % 2 ? 20 : 0), w: PW, h: PH, tone: 'cream', rot, at, pad: P, seed: 7.3 + i });
      const flow = h('div', '', pp.inner); css(flow, { position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' });
      const head = h('div', '', flow, d.head);
      css(head, { position: 'relative', marginLeft: '56px', fontSize: '56px', fontWeight: 700, lineHeight: 1.18, whiteSpace: 'nowrap' });
      const rows = d.rows.map((r, k) => {
        const row = h('div', '', flow);
        css(row, { position: 'relative', marginTop: k ? (d.big ? '20px' : r.length === 1 || d.rows[k - 1].length === 1 ? '16px' : '26px') : '34px', transformOrigin: '0 50%' });
        if (d.big) row.innerHTML = chName(r[0], 40);
        else if (r.length === 1) {                           // 이름표(만들기·정리): 연한 크라프트
          row.innerHTML = `<span class="p2-kraft p2-grain" style="display:inline-block;font-size:34px;font-weight:700;line-height:1.15;padding:8px 20px 9px;box-shadow:0 0 0 3px ${C.white};transform:rotate(-1.5deg)">${r[0]}</span>`;
        } else row.innerHTML = `<div>${chName(r[0], 34)}</div><div style="font-size:36px;font-weight:700;line-height:1.28;margin-top:6px">${r[1]}</div>`;
        return row;
      });
      const spare = PH - 2 * P - (i % 2 ? 20 : 0) - flow.offsetHeight;   // 남는 높이를 줄 사이에 나눠 조각 아래쪽까지 쓴다(한 칸에 48px 까지)
      if (spare > 0) rows.forEach(r => css(r, { marginTop: (parseFloat(r.style.marginTop) + Math.min(48, Math.floor(spare / rows.length))) + 'px' }));
      if (flow.offsetHeight > PH - 2 * P) { console.warn(`[DECK] 순서 조각 글자가 넘친다: ${d.head}`); pp.el.style.outline = '6px dashed #FF00AA'; }
      const np = T.paper(pp.el, { x: -16, y: -24, w: 84, h: 91, tone: 'red', rot: -5, at: at + 0.1, k: 0.6 });
      css(h('div', 'p2-num', np.inner, String(i + 1)), { inset: '0', fontSize: '60px', color: '#FFFFFF', paddingTop: '4px' });
      parts.push(pp, np, put(head, at + 0.12, { from: 1.04 }),
        each(rows, (r, k, lt) => T.lift(r, lt, at + 0.2 + k * 0.06, { shadow: false, dur: 0.35, from: 1.05 })));
    });
    return [bg, tp, b1, b2, ...parts];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s06 카드 격자(5열): 실습 결과물 다섯 장. 위에 사물 조각, 레몬 장 번호 조각, 결과물 이름. 아래 레몬 띠에 완성본 안내
  const OUT = [['2', '시범 범위 판단표'], ['4', '「새별 민원 상담」'], ['6', '시험 기록'], ['8', '「새별 답변 검토」 ·<br>판정 기록'], ['10', '승인 요약 ·<br>승인 기록']];
  const S06 = { at: 0.3, each: 0.2 };
  DECK.slide({ id: 'p2-ch01-s06', notes: NOTES['p2-ch01-s06'], ...lay(1.9, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '결과물을 다음 실습에서 씁니다', false);
    const CW = 350, CH = 600, CY = 290, P = 20, ROT = [-2.2, 1.4, -1.1, 2.4, -1.6];
    const parts = [];
    OUT.forEach(([n, name], i) => {
      const at = S06.at + i * S06.each, x = 120 + i * (CW - 18), y = CY + [0, 6, 0, 6, 2][i];
      const pp = T.paper(el, { x, y, w: CW, h: CH, tone: 'cream', rot: ROT[i], at, seed: 3.1 + i });
      const ob = pp.el, oa = at + 0.05;
      let things;
      if (i === 0) {                                           // 판단표: 흰 종이, 3열 6행
        const p1 = T.paper(ob, { x: 22, y: 24, w: 306, h: 296, tone: 'white', rot: -1.5, at: oa, grid: [3, 6], gridBox: { x: 24, y: 60, w: 258, h: 212 }, k: 0.7 });
        css(h('div', 'p2-tl dark', p1.inner), { left: '24px', top: '26px', width: '150px' });
        things = [p1];
      } else if (i === 1) things = [T.thing(ob, 'laptop', { x: 12, y: 64, w: 326, rot: 1.2, at: oa })];
      else if (i === 2) {                                      // 시험표: 표시 없이 칸만
        const t3 = T.thing(ob, 'table', { x: 46, y: 20, w: 258, rot: -2.4, at: oa });
        [...t3.el.querySelector('.p2-face').children].slice(2).forEach(c => c.remove());
        things = [t3];
      } else if (i === 3) {                                    // 답변 초안 위에 작은 판정 쪽지
        const t4 = T.thing(ob, 'sheet', { x: 30, y: 16, w: 226, rot: 2, at: oa });
        const p4 = T.paper(ob, { x: 168, y: 176, w: 160, h: 132, tone: 'cream', rot: -5, at: oa + 0.08, k: 0.6 });
        [[20, 26, 98, 1], [20, 62, 120, 0], [20, 92, 80, 0]].forEach(([lx, ly, lw, d]) => css(h('div', 'p2-tl' + (d ? ' dark' : ''), p4.inner), { left: lx + 'px', top: ly + 'px', width: lw + 'px' }));
        things = [t4, p4];
      } else {                                                 // 승인 기록: 도장 없이(도장은 10장에서 찍는다)
        const t5 = T.thing(ob, 'summary', { x: 52, y: 18, w: 246, rot: -1.8, at: oa });
        const f5 = t5.el.querySelector('.p2-face'); f5.removeChild(f5.lastElementChild);
        things = [t5];
      }
      // 장 번호 조각(숫자 Anton 88px, 「장」은 본문 서체 46px)과 결과물 이름(40px)
      const lab = h('div', '', ob);
      css(lab, { position: 'absolute', left: P + 'px', right: P + 'px', top: '346px' });
      const num = h('div', 'p2-lemon p2-grain', lab, `<span style="font-family:var(--num);font-size:88px;line-height:1">${n}</span><span style="font-size:46px;font-weight:700;margin-left:8px">장</span>`);
      css(num, { position: 'relative', display: 'inline-flex', alignItems: 'baseline', padding: '8px 20px 6px 18px', boxShadow: `0 0 0 3px ${C.white}, 2px 4px 6px rgba(30,22,16,.22)`, transformOrigin: '0 50%' });
      const nm = h('div', '', lab, name);
      css(nm, { position: 'relative', marginTop: '20px', fontSize: '40px', fontWeight: 700, lineHeight: 1.25, wordBreak: 'keep-all', transformOrigin: '0 0' });
      if (lab.offsetTop + lab.offsetHeight > CH - 14) { console.warn(`[DECK] 결과물 카드 글자가 넘친다: ${name}`); ob.style.outline = '6px dashed #FF00AA'; }
      if (nm.scrollWidth > CW - 2 * P + 2) console.warn(`[DECK] 결과물 이름이 카드 폭보다 넓다(${nm.scrollWidth}px): ${name}`);
      parts.push(pp, ...things, put(num, at + 0.1, { from: 1.12, rot: -3 }), put(nm, at + 0.14, { from: 1.04 }));
    });
    const last = S06.at + 4 * S06.each;
    const band = T.strip(el, '못 끝내면 완성본 폴더에서 가져옵니다<span style="font-family:var(--mono);font-size:34px;font-weight:500;margin-left:30px">예: lab4/완성본/시험기록_예.md</span>',
      { x: 120, y: 906, size: 40, tone: 'lemon', weight: 700, rot: -0.5, at: last + 0.2, padY: 10 });
    css(band.el, { left: Math.round((1920 - band.w) / 2) + 'px' });   // 글 폭에 맞춘 띠를 가운데에
    return [bg, tp, ...parts, band];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s07 표 한 장: 민원 유형 여섯 줄(유형 | 예). 표 오른쪽 위 모서리에 민원 더미 사진 조각, 오른쪽 열에 고르는 기준 카드
  const TYPES = [['수강료 환불', '예: 수영 강습 중도 환불 금액 문의'], ['주차 요금 감면', '예: 경차 감면 적용 여부'], ['대관 신청', '예: 공연장 대관료 문의'],
    ['시설 고장 신고', '예: 주차장 조명 꺼짐'], ['사고·분쟁', '예: 수영장 바닥에서 미끄러져 다침, 배상 요구'], ['기타', '예: 휴관일 문의']];
  const CRIT = ['건수', '평균 처리일수', '규정으로 답이 정해지는가', '사람의 판단이 필요한가'];
  const S07 = { table: 0.3, rows: 0.45, pile: 0.9, card: 1.1, crit: 1.25, foot: 1.7 };
  DECK.slide({ id: 'p2-ch01-s07', notes: NOTES['p2-ch01-s07'], ...lay(2.2, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '첫 조건은 범위입니다', true);
    const band = T.strip(el, '네 기준으로 두 유형을 고릅니다', { right: 1800, y: 130, size: 40, tone: 'red', weight: 700, rot: 1, at: 0.2 });
    const tb = T.table(el, { x: 120, y: 300, w: 1100, size: 38, cols: [], widths: [1, 1.9], label: '민원 240건 · 2026년 3분기 · 가상', at: S07.table, rows: TYPES, pad: [16, 24] });
    // 머리 줄이 없으므로 부품의 「auto + 1fr×6」 대신 여섯 줄을 모두 auto 로 두고 남는 높이를 줄마다 나눈다(5번 줄만 두 줄이다)
    css(tb.grid, { gridTemplateRows: `repeat(${TYPES.length}, auto)` });
    const rowCells = TYPES.map((_, i) => tb.cells.slice(i * 2, i * 2 + 2));
    const pile = T.cutout(el, '../assets/img/p2/p2-ch01-s07-pile_cut.png', { x: 1112, y: 214, w: 160, h: 200, rot: 5, at: S07.pile, fallback: 'doc' });
    // 고르는 기준 카드(x 1260~1800, y 300~980)
    const CX = 1260, CWd = 540, CYc = 300, CHc = 680, PX = 44;
    const card = T.paper(el, { x: CX, y: CYc, w: CWd, h: CHc, tone: 'cream', rot: 0.8, at: S07.card, seed: 6.4 });
    const tag = T.tag(card.el, '고르는 기준', { x: PX - 16, y: -28, size: 34, at: S07.card + 0.15 });
    const tape = T.tape(card.el, { x: CWd - 170, y: -20, w: 140, rot: 6, at: S07.card + 0.2 });
    const list = h('div', '', card.inner);
    css(list, { position: 'absolute', left: PX + 'px', right: PX + 'px', top: '70px', display: 'flex', flexDirection: 'column', gap: '30px' });
    const crit = CRIT.map((t, i) => {
      const r = h('div', '', list); css(r, { position: 'relative', display: 'flex', alignItems: 'flex-start', gap: '22px', transformOrigin: '0 50%' });
      h('div', '', r, chip(String(i + 1), 'lemon', `width:58px;height:64px;font-family:var(--num);font-weight:400;font-size:42px;line-height:1;transform:rotate(${[-4, 3, -2, 4][i]}deg)`));
      css(r.firstElementChild, { flex: 'none' });
      const tx = h('div', '', r, t); css(tx, { fontSize: '40px', fontWeight: 700, lineHeight: 1.28, paddingTop: '6px', wordBreak: 'keep-all', textWrap: 'balance' });
      return r;
    });
    const foot = h('div', '', card.inner, '건수와 처리일수는 2장에서 셉니다');
    css(foot, { position: 'absolute', left: PX + 'px', right: PX + 'px', bottom: '36px', fontSize: '34px', lineHeight: 1.36, color: C.dim, paddingTop: '18px',
      borderTop: '3px dashed rgba(30,22,16,.28)', transformOrigin: '0 100%', textWrap: 'balance' });
    if (list.offsetTop + list.offsetHeight > foot.offsetTop - 16) console.warn('[DECK] 기준 카드 글자가 아래 줄과 겹친다');
    return [bg, tp, band, tb,
      each(rowCells, (cs, i, lt) => cs.forEach(c => T.lift(c, lt, S07.rows + i * 0.08, { shadow: false, dur: 0.35, from: 1.03 }))),
      pile, card, tag, tape,
      each(crit, (r, i, lt) => T.lift(r, lt, S07.crit + i * 0.1, { shadow: false, dur: 0.35, from: 1.05 })),
      put(foot, S07.foot, { from: 1.03 })];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s07a 한 문장: 1장의 넘기는 질문. 크림 종이 한 장에 Black Han Sans 120px 세 줄, 「어느 것부터」는 레몬 바탕
  DECK.slide({ id: 'p2-ch01-s07a', notes: NOTES['p2-ch01-s07a'], ...lay(1.6, el => [
    T.bg(el, 'base'),
    T.header(el, { chapter: 1, title: CH }),
    T.statement(el, { kicker: '다음 질문', text: '민원 유형 가운데\n어느 것부터 프로젝트에\n맡길 것인가', mark: '어느 것부터', sub: '2장 실습에서 정합니다', at: 0.1 }),
  ]) });
})();
