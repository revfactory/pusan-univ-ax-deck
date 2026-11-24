/* 파트 1 · 9장 「작성자와 검토자, 승인하는 사람」 장면 코드. 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다.
 * 원고: plan/slides/p1-ch09.json. 레이아웃 배정: plan/assets/p1_layout_ch09.md. 테마 부품: themes/p1.js. 본보기: p1/ch00.js
 * 장마다 레이아웃이 다르다: 영상 제목 → 사례 장면 → 좌우 대비 → 글과 구조 → 기둥 비교 → 가로 순서 → 퀴즈 → 확인 목록.
 * 키 누름은 s07(정답 기둥을 세운다)에 한 번만 둔다. 나머지 장은 키 없이 3~4초 안에 끝 상태가 된다. */
(function () {
  'use strict';
  const { ease, prog, clamp, lerp, css, h, s } = REEL;
  DECK.config({ part: 'p1', chapter: 'ch09', title: '작성자와 검토자, 승인하는 사람' });

  const CH = { chapter: 9, title: '작성자와 검토자, 승인하는 사람' };
  const FIC = Object.assign({ fiction: true }, CH);
  const EDGE = 'rgba(19,32,44,.35)', AMBER_EDGE = '#C9861F', DEEP = '#1E40B8';
  const F = 1 / 30;
  const iso = THEME.iso, rise = THEME.rise, text = THEME.text;
  // 등각 좌표 (ix, iy) 를 기준점 o 에서 화면 좌표로 옮긴다
  const at2 = (o, ix, iy) => { const [dx, dy] = iso(ix, iy, 0); return [o[0] + dx, o[1] + dy]; };

  const svgFull = (el) => {
    const v = s('svg', { width: 1, height: 1 }, el);
    css(v, { position: 'absolute', left: '0px', top: '0px', overflow: 'visible', pointerEvents: 'none' });
    return v;
  };
  // 블록 이름표 글자 크기(44 는 테마의 큰 이름표)
  const tagPx = (b, px) => {
    const t = b.body.querySelector('.p1-tag');
    if (t) { if (px === 44) t.classList.add('is-big'); else css(t, { fontSize: px + 'px', padding: '8px 20px 10px' }); }
    return b;
  };
  // 카드 머리(cap)를 32px 로 쓴다
  const capPx = (c, px = 32) => { const e = c.face.querySelector('.p1-cap'); if (e) css(e, { fontSize: px + 'px' }); return c; };
  // 아직 오지 않은 자리(ghost)의 점선을 호박 테두리로 칠한다(사람이 들어갈 자리)
  const amberGhost = (b) => {
    b.body.querySelectorAll('polygon').forEach(p => { if (p.getAttribute('stroke-dasharray')) { p.setAttribute('stroke', AMBER_EDGE); p.setAttribute('stroke-width', '2.5'); } });
    return THEME.ghostDraw(b);
  };
  // 점선 길: 등각 점 배열을 이은 점선. 나타날 때 선이 앞에서부터 그어진다
  const dashPath = (sv, o, pts) => {
    const S = pts.map(([ix, iy]) => at2(o, ix, iy));
    const pl = s('polyline', { points: S.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' '), fill: 'none',
      stroke: 'rgba(19,32,44,.34)', 'stroke-width': 3, 'stroke-dasharray': '2 11', 'stroke-linecap': 'round' }, sv);
    let L = 0;
    for (let i = 1; i < S.length; i++) L += Math.hypot(S[i][0] - S[i - 1][0], S[i][1] - S[i - 1][1]);
    return (lt, at, dur = 0.4) => {
      const q = prog(lt, at, dur, ease.inOutCubic);
      pl.style.opacity = lt < at ? '0' : '1';
      // 그어지는 동안은 점선 대신 앞부분만 보이게 dash 패턴의 끝을 자른다
      if (q >= 1) pl.setAttribute('stroke-dasharray', '2 11');
      else { const D = q * L, n = Math.floor(D / 13); pl.setAttribute('stroke-dasharray', (Array(n).fill('2 11').join(' ') + ` 2 ${(L + 20).toFixed(0)}`).trim()); }
    };
  };
  // THEME.flow 의 점선 길은 처음부터 그려지므로, 그 장면이 열릴 때 보이게 한다
  const flowLine = (fl, lt, at) => {
    const l = fl.el.querySelector('svg > polyline');
    if (l) l.style.opacity = prog(lt, at, 0.3, ease.outQuad).toFixed(3);
  };
  // 서류 토큰의 현재 화면 위치(THEME.flow 가 이번 프레임에 정한 값)
  const tokAt = (fl) => {
    const g = fl.el.querySelector('svg > g');
    const m = /translate\(([-\d.]+)[ ,]+([-\d.]+)\)/.exec((g && g.getAttribute('transform')) || '');
    return m ? [+m[1], +m[2]] : null;
  };
  // 수치·판정을 1.12배에서 1배로 한 번에 찍는다
  const stamp = (e, lt, at, base = '') => {
    const q = prog(lt, at, 0.16, ease.outQuad);
    e.style.opacity = lt < at ? '0' : '1';
    e.style.transform = `${base} scale(${lerp(1.12, 1, q).toFixed(3)})`;
  };
  // 테마 블록과 같은 내려앉기 곡선(감싼 묶음 전체를 떨어뜨릴 때)
  const dropK = (lt, at, D) => {
    const land = at + 0.35;
    if (lt < at) return { dy: D, op: 0, sx: 1, sy: 1 };
    if (lt < land) { const p = (lt - at) / 0.35; return { dy: D * (1 - p * p), op: clamp(p / 0.12), sx: 1, sy: 1 }; }
    const q = lt - land;
    if (q < 3 * F) return { dy: 0, op: 1, sx: 1.035, sy: 0.92 };
    const e = ease.outBack(clamp((q - 3 * F) / 0.2), 1.2);
    return { dy: 0, op: 1, sx: lerp(1.035, 1, e), sy: lerp(0.92, 1, e) };
  };

  // 이 챕터에서만 쓰는 글자 배치(색·서체는 테마 변수를 그대로 쓴다)
  const css9 = document.createElement('style');
  css9.textContent = `
    .c9-calc { margin-top: 14px; font-size: 36px; line-height: 1.42; word-spacing: -0.28em; white-space: nowrap; }
    .c9-calc > div + div { margin-top: 6px; }
    .c9-calc .c9-k { color: var(--dim); }
    .c9-calc .c9-ind { display: inline-block; padding-left: 2.6em; }
    .c9-stamp { position: absolute; white-space: nowrap; font: 700 56px/1 var(--num); color: ${DEEP}; letter-spacing: -0.04em;
      background: #FFFFFF; border: 1.5px solid ${DEEP}; padding: 10px 22px 12px; transform-origin: 0 50%; }
    .c9-tok { position: absolute; white-space: nowrap; font: 700 52px/1 var(--num); color: var(--ink); letter-spacing: -0.04em;
      background: #FFFFFF; border: 1.5px solid var(--edge); padding: 10px 20px 12px; }
    .c9-num { position: absolute; white-space: nowrap; transform-origin: 0 60%; }
    .c9-num b { font: 700 120px/0.95 var(--num); color: var(--ink); letter-spacing: -0.05em; }
    .c9-num i { font: 700 56px/1 var(--body); font-style: normal; color: var(--ink); margin-left: 10px; }
    .c9-num small { display: block; margin-top: 6px; font: 400 34px/1.2 var(--body); color: var(--dim); }
    .c9-say { font-size: 44px; line-height: 1.3; font-weight: 600; }
    .c9-two { font-size: 40px; line-height: 1.3; font-weight: 600; }
  `;
  document.head.appendChild(css9);

  // ── s01 챕터 전환(L0 영상 제목): 공용 전환 영상 p1-tr-flow 를 좌우로 뒤집어 깐다 ──
  DECK.slide({
    id: 'p1-ch09-s01', dur: 3.2,
    notes: '방금 시연에서는 요청 한 문장에 조사, 작성, 검토 세 역할로 나눠 달라고 적었습니다. 9장에서는 왜 한 에이전트에게 다 맡기지 않고 역할을 나누는지, 그리고 이 순서에서 사람은 어디에서 결정하는지를 봅니다. 먼저 작성 단계가 틀린 초안을 냈을 때 검토가 무엇을 하는지부터 보겠습니다.',
    setup(el) {
      this.vt = THEME.videoTitle(el, {
        kind: 'chapter', kicker: '파트 1 · 9장', scene: 'flow', flip: true, at: 0.25,
        src: '../assets/video/p1/p1-tr-flow.mp4', poster: '../assets/video/p1/p1-tr-flow.jpg',
        title: '작성자와 검토자, 승인하는 사람',
        sub: '왜 한 에이전트가 아니라 세 역할로 나뉘었고, 사람은 어디에서 결정하는가',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // ── s02 이야기(L10 사례 장면): 책상 셋 앞을 지나간 초안 B 가 검토 앞에서 멈췄다가 작성으로 돌아온다 ──
  // 장면: 책상(조사·작성·검토)을 오른쪽 아래 축으로 (980, 300)부터 등각 277 간격, 줄 끝에 호박 점선 자리. 앞쪽에 한서윤 주임과 말풍선 카드
  DECK.slide({
    id: 'p1-ch09-s02', dur: 3.5,
    notes: '작성 단계가 틀린 초안을 내면 검토가 잡아내는지 보겠습니다. 화면은 일부러 위약금을 빠뜨려 써 둔 가상 초안 B(파트 2 실습 자료 lab5)를 검토 지침으로 판정한 예이고, 시연 결과가 아닙니다. 초안 B는 8회분 40,000원을 환불액으로 적었고, 검토는 규정으로 다시 계산해 위약금 6,000원이 빠졌다며 다시 쓰기로 판정했습니다. 한서윤 주임은 작성한 쪽이 왜 이 실수를 스스로 찾지 못하는지, 이 순서에서 자기가 맡는 일이 무엇인지 정리하려 합니다. (강사 확인: 시연의 검토 판정 파일을 보고 첫머리에 한 문장을 더합니다. 다시 쓰기가 나왔으면 「시연에서도 검토가 다시 쓰기를 한 번 판정했고, 이유는 ○○였습니다」라고 말합니다. 한 번에 통과했으면 「오늘 시연에서는 작성 역할이 처음부터 34,000원을 적어 검토를 한 번에 통과했습니다. 작성이 틀렸을 때도 검토가 잡는지 이 초안으로 보겠습니다」라고 말합니다.)',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [820, 220, 1060, 800], props: false, token: false });
      THEME.header(el, FIC);
      this.t = THEME.title(el, '검토자가 위약금 누락을\n찾아 다시 쓰게 합니다', { x: 120, y: 190, size: 72, w: 900, at: 0.1 });
      const O = [980, 300], S = 277;
      const lanes = svgFull(el);
      this.lane = dashPath(lanes, O, [[S, 140], [2 * S, 140]]);
      const things = h('div', 'full', el);   // 책상 층을 먼저 깔고 그 위로 서류 토큰이 지나가게 한다
      // 토큰: 작성 앞 → 검토 앞(0.3초 멈춤) → 같은 축을 거슬러 작성 앞
      this.fl = THEME.flow(el, [[S, 140], [2 * S, 140], [S, 140]], { x: O[0], y: O[1], at: 0.95, speed: 620, hold: { 1: 0.3 }, line: false });
      this.desks = ['조사', '작성', '검토'].map((lb, i) => {
        const [x, y] = at2(O, i * S, 0);
        return tagPx(THEME.block(things, { x, y, w: 180, d: 180, h: 70, tone: 'cobalt', at: 0.2 + i * 0.12, drop: 200, label: lb, pin: 40 }), 40);
      });
      const [gx, gy] = at2(O, 3 * S, 0);
      this.slot = THEME.block(things, { x: gx, y: gy, w: 180, d: 180, h: 70, tone: 'ghost', at: 0.6, drop: 0, shadow: false });
      this.slotDraw = amberGhost(this.slot);
      // 왼쪽 카드: 가상 초안 B 의 판정 예
      this.cardAt = this.fl.times[1];
      this.card = capPx(THEME.card(el, { x: 120, y: 400, w: 740, at: this.cardAt, pad: '24px 32px 26px', html:
        '<span class="p1-cap">파트 2 실습 자료 ·<br>가상 초안 B(일부러 위약금을 빠뜨린 초안)</span>' +
        '<div class="c9-calc p1-mono">' +
        '<div><span class="c9-k">초안:</span> 60,000원 × 8 ÷ 12 = 40,000원</div>' +
        '<div><span class="c9-k">검토:</span> <span class="p1-em">다시 쓰기</span> —<br><span class="c9-ind">위약금 6,000원을 빼지 않음</span></div>' +
        '<div><span class="c9-k">다시 계산:</span> 34,000원</div>' +
        '</div>' }));
      this.rows = Array.from(this.card.face.querySelectorAll('.c9-calc > div'));
      this.ex = text(el, 't-small p1-dimtext', '판정 예: 같은 수영 강습 민원을 검토 지침으로 판정', 120, 800, 760);
      css(this.ex, { fontSize: '34px' });
      // 앞쪽: 한서윤 주임(2.2배)과 말풍선 카드
      this.figAt = this.cardAt + 0.8;
      this.hs = THEME.figure(el, '한서윤', { x: 1010, y: 800, scale: 2.2, big: true, first: true, at: this.figAt });
      this.say = THEME.card(el, { x: 1160, y: 820, w: 540, at: this.figAt + 0.3, pad: '20px 30px 24px',
        html: '<div class="c9-say">작성 단계는 왜 스스로<br>못 찾았을까요?</div>' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      this.desks.forEach(b => b.render(lt));
      this.slot.render(lt); this.slotDraw(lt, 0.6, 0.45);
      this.lane(lt, 0.8);
      this.fl.render(lt);
      this.card.render(lt);
      this.rows.forEach((r, i) => rise(r, lt, this.cardAt + 0.4 + i * 0.15, 28));
      rise(this.ex, lt, this.cardAt + 0.85, 20);
      this.hs.render(lt);
      this.say.render(lt);
    },
  });

  // ── s03 개념(L3 좌우 대비): 왼쪽은 한 블록 앞을 「40,000원」이 한 바퀴 돌아 제자리로, 오른쪽은 검토가 규정집으로 「34,000원」을 찍는다 ──
  const S03_R = 1.75;
  DECK.slide({
    id: 'p1-ch09-s03', dur: 3.7,
    notes: '초안 B의 근거 칸에는 「남은 강습 횟수에 해당하는 금액에서 수강료의 10퍼센트를 위약금으로 뺀 금액」이라는 조문 문장이 그대로 적혀 있습니다. 그런데 계산 칸은 60,000원 × 8 ÷ 12에서 멈췄습니다. 같은 에이전트가 다시 확인하면 자기가 세운 계산식부터 읽기 때문에, 처음 놓친 위약금을 같은 논리로 또 빠뜨릴 수 있습니다. 검토 에이전트는 「프로젝트 파일의 규정으로 직접 다시 계산해 초안의 금액과 같은지 본다」는 지침대로 초안의 식이 아니라 규정에서 출발합니다. 그래서 작성과 검토를 다른 역할로 나누고, 검토자에게는 작성자와 다른 확인 순서를 줍니다.',
    setup(el) {
      THEME.header(el, FIC);
      this.t = THEME.title(el, '작성자가 검토하면 같은 오류를 통과시킵니다', { x: 120, y: 104, size: 64, at: 0.1 });
      const R = S03_R;
      const sp = this.sp = THEME.split(el, { left: { label: '작성자' }, right: { label: '검토자', tone: 'cobalt' }, rightAt: R, at: 0.3 });
      // 왼쪽 칸: 코발트 블록 하나(240×240, 높이 80). 그 앞의 네모난 등각 길을 토큰이 한 바퀴 돈다
      const A = [520, 560];
      this.one = tagPx(THEME.block(sp.left, { x: A[0], y: A[1], w: 240, d: 240, h: 80, tone: 'cobalt', at: 0.55, drop: 240, label: '작성 + 검토', pin: 40 }), 44);
      this.loop = THEME.flow(sp.left, [[130, 130], [290, 130], [290, 290], [130, 290], [130, 130]], { x: A[0], y: A[1], at: 1.0, speed: 1000 });
      this.tok = h('div', 'c9-tok', sp.left, '40,000원');
      this.l1 = text(sp.left, 'p1-half-line', '자기가 쓴 계산식을 다시 읽음', 120, 900);
      // 오른쪽 칸: 뒤(규정집) → 작성 → 검토 순서로 만든다. 블록 둘은 오른쪽 아래 축으로 등각 300 간격
      const B = [1210, 530];
      const [kx, ky] = at2(B, 300, 0);
      this.rule = THEME.item(sp.right, '규정집', { x: 1650, y: 515, at: R + 0.15, drop: 200, label: '규정집', note: '제7조 제1항 제2호', pin: 40 });
      const rt = this.rule.body.querySelector('.p1-tag');
      if (rt) { css(rt, { fontSize: '40px', padding: '8px 20px 10px' }); const sm = rt.querySelector('small'); if (sm) css(sm, { fontSize: '34px' }); }
      this.wr = tagPx(THEME.block(sp.right, { x: B[0], y: B[1], w: 200, d: 200, h: 70, tone: 'cobalt', at: R + 0.25, drop: 200, label: '작성', pin: 44 }), 44);
      this.rv = tagPx(THEME.block(sp.right, { x: kx, y: ky, w: 200, d: 200, h: 70, tone: 'cobalt', at: R + 0.35, drop: 200, label: '검토', pin: 44 }), 44);
      this.pass = THEME.flow(sp.right, [[0, 150], [300, 150]], { x: B[0], y: B[1], at: R + 0.7, speed: 750 });
      this.st = h('div', 'c9-stamp', sp.right, '34,000원');
      css(this.st, { left: '1500px', top: '774px' });
      this.stAt = this.pass.end + 0.02;
      this.l2 = text(sp.right, 'p1-half-line', '규정에서 금액을 다시 계산', 1040, 900);
    },
    render(lt) {
      const R = S03_R;
      this.t.render(lt);
      this.sp.render(lt);
      this.one.render(lt);
      this.loop.render(lt); flowLine(this.loop, lt, 0.85);
      const p = tokAt(this.loop);
      if (p) css(this.tok, { left: (p[0] - 34) + 'px', top: p[1] + 'px', transform: 'translate(-100%, -50%)', opacity: prog(lt, 0.75, 0.25).toFixed(3) });
      rise(this.l1, lt, 1.6);
      this.rule.render(lt); this.wr.render(lt); this.rv.render(lt);
      this.pass.render(lt); flowLine(this.pass, lt, R + 0.5);
      stamp(this.st, lt, this.stAt);
      rise(this.l2, lt, this.stAt + 0.05);
    },
  });

  // ── s04 구조(L16 글과 구조): 토큰이 작성 ↔ 검토를 두 번 오가며 계수 블록을 채우고, 세 번째는 「사람에게 넘김」 앞으로 꺾인다 ──
  // 등각 기준점 (1060, 420). 작성 (0,0), 검토 (346,0), 통과 (716,0), 사람에게 넘김 (180,380), 한서윤 주임 (120,560), 계수 블록 (100,-260)·(350,-260).
  // 토큰 길은 블록 앞쪽 iy 140. 통과로 가는 길은 처음부터 점선으로 놓는다
  DECK.slide({
    id: 'p1-ch09-s04', dur: 3.9,
    notes: '검토자의 판정은 통과 아니면 다시 쓰기, 둘 중 하나입니다. 다시 쓰기는 두 번까지 하고, 두 번 고쳐도 틀린 항목이 남으면 에이전트끼리 더 주고받지 않고 담당자인 한서윤 주임에게 넘깁니다. 이 상한이 없으면 같은 초안이 두 에이전트 사이를 계속 오갑니다. 시연에 넣은 요청 문장에도, 파트 2에서 여러분이 쓸 검토 지침에도 같은 규칙이 들어 있습니다.',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [600, 220, 1280, 800], props: false, token: false });
      THEME.header(el, FIC);
      this.t = THEME.title(el, '다시 쓰기는 두 번까지,\n그다음은 사람입니다', { x: 120, y: 190, size: 72, w: 900, at: 0.1 });
      this.ln = THEME.lines(el, ['판정: 통과 또는 다시 쓰기', '2회 고쳐도 틀리면 사람에게 넘김'], { x: 120, y: 400, w: 700, gap: 4 });
      const O = [1060, 420], S = 346, LN = 140;
      const P = (ix, iy) => at2(O, ix, iy);
      const lanes = svgFull(el);
      this.laneA = dashPath(lanes, O, [[0, LN], [S, LN], [716, LN]]);   // 작성 ↔ 검토, 이어서 통과 앞까지
      this.laneB = dashPath(lanes, O, [[S, LN], [S, 380]]);              // 검토 → 사람에게 넘김
      const things = h('div', 'full', el);
      // 토큰: 작성 → 검토 → 작성 (1회) → 검토 → 작성 (2회) → 검토 → 사람에게 넘김 앞. 블록 층(things) 위에 그려진다
      this.fl = THEME.flow(el, [[0, LN], [S, LN], [0, LN], [S, LN], [0, LN], [S, LN], [S, 380]], { x: O[0], y: O[1], at: 1.2, speed: 1300, line: false });
      const T = this.fl.times;
      // 계수 블록: 점선 자리 위에 흰 블록이 떨어져 채워진다(토큰이 작성 앞으로 돌아온 순간 닿는다)
      const cnt = (ix, label, fillAt) => {
        const [x, y] = P(ix, -260);
        const g = tagPx(THEME.block(things, { x, y, w: 90, d: 90, h: 30, tone: 'ghost', at: 0.3, drop: 0, shadow: false, label, pin: 30 }), 34);
        const w = THEME.block(things, { x, y, w: 90, d: 90, h: 30, tone: 'white', at: fillAt - 0.35, drop: 240 });
        return { g, w, draw: THEME.ghostDraw(g) };
      };
      // 뒤(ix + iy 가 작은 것)부터 만든다
      this.c1 = cnt(100, '다시 쓰기 1회', T[2]);
      const B = (ix, iy, q) => { const [x, y] = P(ix, iy); return THEME.block(things, Object.assign({ x, y, drop: 220 }, q)); };
      this.wr = tagPx(B(0, 0, { w: 200, d: 200, h: 70, tone: 'cobalt', at: 0.35, label: '작성', pin: 44 }), 44);
      this.c2 = cnt(350, '다시 쓰기 2회', T[4]);
      this.rv = tagPx(B(S, 0, { w: 200, d: 200, h: 70, tone: 'cobalt', at: 0.47, label: '검토', pin: 44 }), 44);
      this.hu = tagPx(B(180, 380, { w: 200, d: 200, h: 70, tone: 'amber', at: 0.6, label: '사람에게 넘김', pin: 30 }), 40);
      const [fx, fy] = P(120, 560);
      this.hs = THEME.figure(things, '한서윤', { x: fx, y: fy, scale: 1.8, big: true, first: true, at: 0.75 });
      this.ok = tagPx(B(716, 0, { w: 170, d: 170, h: 50, tone: 'white', at: 0.7, label: '통과', pin: 44 }), 40);
      this.turnAt = T[5];
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      rise(this.ln[0], lt, 0.5);
      rise(this.ln[1], lt, this.turnAt + 0.1);
      [this.c1, this.c2].forEach(c => { c.g.render(lt); c.draw(lt, 0.3, 0.4); c.w.render(lt); });
      [this.wr, this.rv, this.hu, this.hs, this.ok].forEach(b => b.render(lt));
      this.laneA(lt, 0.8, 0.45);
      this.laneB(lt, this.turnAt - 0.05, 0.25);
      this.fl.render(lt);
    },
  });
  // ── s05 수치(L14 기둥 비교): 채팅 1단위 흰 기둥과 멀티에이전트 15단위 코발트 기둥, 128px 「약 15배」 ──
  DECK.slide({
    id: 'p1-ch09-s05', dur: 3.9,
    notes: '토큰은 AI가 읽고 쓰는 글의 단위입니다. Anthropic은 자사 리서치 시스템에서 멀티에이전트가 채팅보다 토큰을 약 15배 썼다고 밝혔고, 시연한 팀을 잰 값은 아닙니다. 에이전트끼리 주고받는 경로도 3개면 3개, 5개면 10개, 10개면 45개로 늘어납니다. 그래서 에이전트 팀 설계를 다룬 책 한 권은 팀을 3~5개로 두고 10개가 넘으면 나누라고 권합니다. 시연에서도 역할을 조사, 작성, 검토 셋으로 나눠 달라고 요청했습니다.',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [740, 180, 1140, 840], props: false, token: false });
      THEME.header(el, CH);
      this.t = THEME.title(el, '에이전트를 늘리면\n사용량도 늘어납니다', { x: 120, y: 150, size: 88, w: 900, at: 0.1 });
      this.b1 = text(el, 't-body p1-dimtext', '토큰: AI가 읽고 쓰는 글의 단위', 120, 400, 760);
      this.b2 = text(el, 't-body', '멀티에이전트: 채팅의 약 15배 토큰', 120, 470, 760);
      this.b3 = text(el, 'p1-dimtext', 'Anthropic 자사 리서치 시스템 기준', 120, 533, 760);
      css(this.b3, { fontSize: '34px', lineHeight: '1.3' });
      // 시연 요청 묶음: 작은 코발트 블록 셋을 오른쪽 아래 축으로 놓고 오른쪽에 두 줄
      this.roles = [0, 1, 2].map(i => { const [x, y] = at2([168, 690], i * 80, 0); return THEME.block(el, { x, y, w: 64, d: 64, h: 26, tone: 'cobalt', at: 2.7 + i * 0.1, drop: 200 }); });
      this.rl = text(el, '', '시연 요청:<br>역할 3개(조사·작성·검토)', 380, 648);
      css(this.rl, { fontSize: '38px', lineHeight: '1.35', fontWeight: '600', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.src = text(el, 't-small p1-dimtext', '출처: Anthropic 엔지니어링 블로그(2025-06-13)', 120, 960, 760);
      // 기둥: 바닥 y 860, 흰 기둥(높이 38) x 900, 코발트 기둥(높이 570 = 38 × 15) x 1200
      const U = 38, A = [900, 860], Bp = [1200, 860];
      this.gA = 0.65; this.gD = 1.1;
      this.pa = tagPx(THEME.block(el, { x: A[0], y: A[1], w: 200, d: 200, h: U, grow: true, at: 0.45, label: '채팅', labelPos: 'below' }), 34);
      this.pb = tagPx(THEME.block(el, { x: Bp[0], y: Bp[1], w: 200, d: 200, h: 15 * U, tone: 'cobalt', grow: true, at: this.gA, label: '멀티에이전트', labelPos: 'below' }), 34);
      this.dimAt = this.gA + this.gD + 0.05;
      this.dm = THEME.dim(el, '약 15', { from: [Bp[0] + 200, Bp[1]], to: [Bp[0] + 200, Bp[1] - 15 * U], unit: '배', side: 'right', font: 'body', size: 128, unitSize: 60, color: DEEP, at: this.dimAt });
      this.unitAt = this.dm.end;
      this.un = text(el, '', '토큰 사용량', Bp[0] + 228, Bp[1] - 15 * U / 2 + 70);
      css(this.un, { fontSize: '34px', fontWeight: '600', color: 'var(--dim)', whiteSpace: 'nowrap' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      rise(this.b1, lt, 0.4);
      this.pa.render(lt);
      // 코발트 기둥은 1.1초 동안 솟는다(테마 기둥의 0.45초 곡선을 늘려 쓴다)
      const g = this.gA, D = this.gD;
      this.pb.render(lt < g ? lt : lt < g + D ? g + (lt - g) * 0.45 / D : lt - (D - 0.45));
      this.dm.render(lt);
      rise(this.un, lt, this.unitAt, 16);
      rise(this.b2, lt, this.unitAt + 0.05);
      rise(this.b3, lt, this.unitAt + 0.05);
      this.roles.forEach(b => b.render(lt));
      const p = prog(lt, 2.8, 0.4, ease.snap);
      css(this.rl, { opacity: p.toFixed(3), transform: `translateX(${((1 - p) * -24).toFixed(1)}px)` });
      rise(this.src, lt, 2.95, 16);
    },
  });

  // ── s06 수치(L4 가로 순서): 토큰이 승인 자리를 멈추지 않고 지나 운영 DB 에 닿으면 판이 위에서부터 납작해진다 ──
  // 블록 셋: x 420 / 960 / 1500, 바닥 y 800, 220×220. 등각으로 이웃 블록 사이는 (312, -312). 운영 DB 는 높이 10 판 열두 장이다
  DECK.slide({
    id: 'p1-ch09-s06', dur: 4.0,
    notes: '2025년 7월에 실제로 있었던 사고입니다. Replit의 AI 코딩 에이전트가 변경하지 말라고 한 기간에 운영 DB, 곧 실제 서비스가 쓰던 데이터 저장소를 지웠습니다. 임원 1,200여 명과 회사 1,190여 곳의 데이터였고, 에이전트는 복구할 수 없다고 답했지만 실제로는 사용자가 직접 복구했습니다. Fortune 보도에 따르면 에이전트는 사람의 승인 없이 진행하지 말라는 지시를 어겼다고 스스로 인정했습니다. 새별시설공단에서 이 자리에 해당하는 것은 민원 답변 발송이고, 그 앞에 오민석 팀장의 승인이 있습니다.',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [160, 560, 1640, 480], props: false, token: false });
      THEME.header(el, CH);
      this.t = THEME.title(el, '승인 없이 실행해 운영 데이터가 지워졌습니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.ln = THEME.lines(el, ['2025년 7월 · Replit의 AI 에이전트', '변경하지 말라고 한 기간에 운영 DB 삭제'], { x: 120, y: 196, w: 1080, gap: 0 });
      this.gl = text(el, 'p1-dimtext', '운영 DB: 실제 서비스가 쓰는 데이터 저장소', 120, 330, 1000);
      css(this.gl, { fontSize: '34px', lineHeight: '1.3' });
      // 오른쪽 위 수치 둘(고정폭 120px, 단위는 본문 서체 56px)
      this.n1 = text(el, 'c9-num', '<b>1,200</b><i>여 명</i><small>임원 데이터</small>', 1260, 186);
      this.n2 = text(el, 'c9-num', '<b>1,190</b><i>여 곳</i><small>회사 데이터</small>', 1260, 350);
      // 블록 줄
      const Y = 800, SZ = 220, A0 = [420, Y], a = 312, N = 12, PH = 10;
      const ag = tagPx(THEME.block(el, { x: 420, y: Y, w: SZ, d: SZ, h: 70, tone: 'cobalt', at: 0.4, drop: 220, label: 'AI 에이전트', pin: 36 }), 44);
      const gh = tagPx(THEME.block(el, { x: 960, y: Y, w: SZ, d: SZ, h: 70, tone: 'ghost', at: 0.55, drop: 0, shadow: false, label: '승인', pin: 36 }), 44);
      this.ag = ag; this.gh = gh; this.ghDraw = amberGhost(gh);
      // 운영 DB: 판 열두 장(묶음째 떨어진다)과 면을 그리지 않는 블록(그림자·이름표). 이름표가 판 위에 그려지도록 블록을 판 뒤에 만들고,
      // 그 블록의 그림자만 판보다 먼저 깐 층(shHold)으로 옮긴다
      this.dbAt = 0.7;
      const shHold = h('div', '', el);
      css(shHold, { position: 'absolute', left: '1500px', top: Y + 'px', width: '0px', height: '0px' });
      this.dbW = h('div', '', el);
      css(this.dbW, { position: 'absolute', left: '0px', top: '0px', width: '0px', height: '0px', transformOrigin: `1500px ${Y}px` });
      this.N = N; this.PH = PH; this.SZ = SZ;
      this.plates = [];
      for (let k = 0; k < N; k++) {
        const w = h('div', '', this.dbW);
        css(w, { position: 'absolute', left: '0px', top: '0px', width: '0px', height: '0px' });
        this.plates.push({ w, b: THEME.block(w, { x: 1500, y: Y, z: k * PH, w: SZ, d: SZ, h: PH, tone: 'slate', grow: true, at: -5, shadow: false }) });
      }
      this.db = tagPx(THEME.block(el, { x: 1500, y: Y, w: SZ, d: SZ, h: N * PH, hide: true, at: this.dbAt, drop: 220, label: '운영 DB', pin: 36 }), 44);
      const shSvg = this.db.el.querySelector(':scope > svg');
      if (shSvg) shHold.appendChild(shSvg);
      this.dbSh = shHold.querySelector('polygon');
      this.dbTag = this.db.el.querySelector('.p1-tag');
      this.dbPin = this.db.el.querySelector('.p1-pin');
      // 서류 토큰: AI 에이전트 오른쪽 앞에서 출발해 블록 사이 틈을 등각 축으로만 지나 운영 DB 앞에서 멈춘다
      this.fl = THEME.flow(el, [[150, 40], [150, -160], [a + 150, -160], [a + 150, -a - 160], [2 * a + 16, -a - 160]], { x: A0[0], y: A0[1], at: 1.3, speed: 1300 });
      this.flatAt = this.fl.end + 0.02;
      this.nAt = Math.max(2.6, this.flatAt + 0.15);
      // 가상 사례 카드(왼쪽 가운데): 새별시설공단에서 같은 자리
      this.cd = capPx(THEME.card(el, { x: 120, y: 404, w: 760, at: 2.95, cap: '가상 사례 · 새별시설공단', pad: '20px 32px 24px',
        html: '<div class="c9-two">민원 답변 <span class="p1-em">발송</span> 앞에<br>오민석 팀장의 <span class="p1-em">승인</span></div>' }));
      this.src = text(el, 't-small p1-dimtext', '출처: Fortune 2025-07-23, AI Incident Database #1152', 120, 975, 1000);
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      this.ln.forEach((l, i) => rise(l, lt, 0.35 + i * 0.12));
      rise(this.gl, lt, 0.6, 20);
      this.ag.render(lt);
      this.gh.render(lt); this.ghDraw(lt, 0.55, 0.45);
      // 운영 DB 묶음의 내려앉기
      const k = dropK(lt, this.dbAt, 220);
      this.dbW.style.transform = `translate(0px, ${(-k.dy).toFixed(1)}px) scale(${k.sx.toFixed(4)}, ${k.sy.toFixed(4)})`;
      this.dbW.style.opacity = k.op.toFixed(3);
      // 납작해지기: 맨 위 판부터 0.04초 간격으로 두께가 10px → 1.7px
      const fr = [];
      for (let i = 0; i < this.N; i++) fr[this.N - 1 - i] = 1 - 0.83 * prog(lt, this.flatAt + i * 0.04, 0.16, ease.inOutCubic);
      let drop = 0;
      for (let j = 0; j < this.N; j++) {
        const f = fr[j], x = f >= 0.9999 ? 1 : 1 - Math.cbrt(1 - f);   // 테마 기둥의 솟기 곡선(outCubic)을 거꾸로 풀어 두께 f 를 맞춘다
        this.plates[j].b.render(-5 + 0.45 * x);
        this.plates[j].w.style.transform = drop ? `translate(0px, ${drop.toFixed(1)}px)` : 'none';
        drop += this.PH * (1 - f);
      }
      this.db.render(lt);
      // 이름표·핀·그림자도 낮아진 높이를 따른다
      if (drop > 0) {
        if (this.dbTag) this.dbTag.style.transform += ` translateY(${drop.toFixed(1)}px)`;
        if (this.dbPin) this.dbPin.style.transform = `translateY(${drop.toFixed(1)}px) ` + this.dbPin.style.transform;
      }
      if (this.dbSh) {
        const H = this.N * this.PH - drop, a = this.SZ / 2, sx = Math.min(H * 0.55 + 10, 120), sy = Math.min(H * 0.14, 24);
        const pts = [[-a, -a], [a, -a], [a + sx, -a + sy], [a + sx, a + sy], [-a + sx, a + sy], [-a, a]].map(([x, y]) => iso(x, y, 0));
        this.dbSh.setAttribute('points', pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' '));
      }
      this.fl.render(lt); flowLine(this.fl, lt, 1.0);
      stamp(this.n1, lt, this.nAt);
      stamp(this.n2, lt, this.nAt + 0.2);
      this.cd.render(lt);
      rise(this.src, lt, 3.0, 16);
    },
  });

  // ── s07 퀴즈(L13, 키 한 번): 보기 블록 셋. 키를 누르면 ③ 블록에서 코발트 기둥이 솟고, 검토 지침의 마지막 줄 카드가 떨어진다 ──
  const S07_R = 2.0;
  DECK.slide({
    id: 'p1-ch09-s07', dur: 3.5, steps: [S07_R],
    notes: '1번, 2번, 3번 가운데 맞다고 생각하는 쪽에 손을 들어 주세요. (키) 정답은 3번이고, 파트 2에서 여러분이 만들 검토 프로젝트의 지침 마지막 줄에 「통과 판정은 발송 승인이 아닙니다. 발송은 고객지원팀장이 정합니다」가 적혀 있습니다. 검토 에이전트도 같은 계열의 모델이라 틀린 초안을 통과시킬 수 있으므로, 6장에서 정한 대로 금액과 조문은 한서윤 주임이 원문과 대조합니다. 기관 밖으로 나가는 발송은 앞 화면에서 본 대로 오민석 팀장이 승인합니다. (화면에서 옮긴 문구: 「한서윤 주임 · 고객지원팀」 「오민석 팀장 · 고객지원팀」)',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [200, 520, 1560, 520], props: false, token: false });
      THEME.header(el, FIC);
      this.t = THEME.title(el, '검토를 통과한 답변, 바로 보내도 됩니까?', { x: 120, y: 104, size: 72, at: 0.1 });
      // 보기 세 줄: 56px, 줄 간격 86, y 250~508
      this.ln = THEME.lines(el, ['① 통과했으니 바로 발송', '② 한서윤 주임이 규정 원문과 대조한 뒤 발송', '③ ②에 더해 오민석 팀장 승인 뒤 발송'], { x: 120, y: 250, w: 1240, gap: 0 });
      this.ln.forEach(l => css(l, { fontSize: '56px', lineHeight: '86px', fontWeight: '600', whiteSpace: 'nowrap' }));
      // 보기 블록 줄. 번호 이름표는 블록 윗면 위로 옮긴다(블록 줄 아래에는 키 뒤 설명 카드가 온다)
      const QY = 690, QH = 56, PIN = 20;
      this.qz = THEME.quiz(el, ['①', '②', '③'], { x0: 520, x1: 1560, y: QY, size: 250, h: QH, answer: 2, answerText: '정답 ③', revealAt: S07_R, riseH: 270, at: 0.75 });
      this.tags = this.qz.items.map(b => {
        const tg = b.body.querySelector('.p1-tag');
        css(tg, { fontSize: '52px', padding: '8px 30px 10px' });
        tg.style.top = (-QH - PIN - tg.offsetHeight) + 'px';
        const pin = h('div', 'p1-pin', b.body);
        css(pin, { left: '0px', top: (-QH - PIN) + 'px', height: PIN + 'px', transformOrigin: '0 100%' });
        return { tg, pin };
      });
      this.cd = THEME.card(el, { x: 120, y: 866, w: 1100, at: S07_R + 0.5, enter: 'drop', pad: '14px 32px 18px',
        html: '<div class="c9-two" style="font-size:44px;line-height:1.22">검토 지침의 마지막 줄: 통과 판정은 발송 승인이 아닙니다.<br>발송은 고객지원팀장이 정합니다.</div>' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      this.ln.forEach((l, i) => rise(l, lt, 0.4 + i * 0.12));
      this.qz.render(lt);
      // 핀은 이름표와 함께 자란다. ③ 이름표는 기둥이 솟기 시작하면 걷힌다(기둥 위 「정답 ③」이 대신한다)
      const off = 1 - prog(lt, S07_R, 0.2);
      this.tags.forEach(({ tg, pin }, k) => {
        const op = (+tg.style.opacity || 0) * (k === 2 ? off : 1);
        tg.style.opacity = op.toFixed(3);
        pin.style.transform = `scaleY(${op.toFixed(3)})`;
      });
      this.cd.render(lt);
    },
  });

  // ── s08 정리(L8 확인 목록): 사람이 정하는 네 가지를 호박 블록 줄로 놓고, 오른쪽에 에이전트 블록과 두 사람을 세운다 ──
  DECK.slide({
    id: 'p1-ch09-s08', dur: 3.3,
    notes: '한서윤 주임이 정리한 역할입니다. 규정 조사와 초안 작성, 검토는 에이전트가 맡고, 금액과 조문 대조는 한서윤 주임이, 발송 승인은 오민석 팀장이 합니다. 에이전트에게 넘기지 않는 일이 네 가지 있습니다. 무엇을 줄일지 목표를 정하는 일, 좋고 나쁜 답변을 가를 기준을 정하는 일, 규정에 없는 요청을 판단하는 일, 발송 결과를 책임지는 일입니다. 10장에서는 파트 1의 처음 질문, 왜 결과가 달랐는가에 답해 보겠습니다.',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [1240, 160, 680, 880], props: false, token: false });
      THEME.header(el, FIC);
      this.t = THEME.title(el, '목표·기준·판단·책임은 사람이 정합니다', { x: 120, y: 104, size: 64, at: 0.1 });
      // 목록 블록은 위에서 떨어지므로, 조립 중인 제목을 가리지 않게 제목 아래(y 205)부터 보이는 층에 넣는다
      const lay = h('div', 'full', el);
      css(lay, { clipPath: 'inset(205px 0px 0px 0px)', pointerEvents: 'none' });
      this.cl = THEME.checklist(lay, [
        { text: '목표', note: '초안 작성 시간 줄이기', tone: 'amber' },
        { text: '품질 기준', note: '조문·금액·개인정보', tone: 'amber' },
        { text: '맥락 판단', note: '규정에 없는 요청', tone: 'amber' },
        { text: '책임', note: '발송한 담당자와 기관', tone: 'amber' },
      ], { x: 120, y: 226, w: 1100, rowH: 140, box: 100, boxH: 40, textX: 220, textSize: 60, noteSize: 38, at: 0.4, each: 0.25 });
      // 오른쪽 위: 에이전트 블록 둘(처음부터 놓여 있다)과 풀이 줄
      this.ag = [['작성', 1420], ['검토', 1640]].map(([lb, x]) => tagPx(THEME.block(el, { x, y: 330, w: 120, d: 120, h: 40, tone: 'cobalt', at: -1, label: lb, pin: 40 }), 40));
      this.ac = text(el, '', '작성·검토: 에이전트', 1530, 408);
      css(this.ac, { fontSize: '34px', fontWeight: '600', color: 'var(--ink)', whiteSpace: 'nowrap', transform: 'translateX(-50%)' });
      // 오른쪽 아래: 한서윤 주임(대조), 오민석 팀장(발송 승인). 뒤(위쪽)에 있는 사람부터 만든다
      this.hs = THEME.figure(el, '한서윤', { x: 1390, y: 718, scale: 2.2, big: true, role: '대조', at: 1.65 });
      this.mb = THEME.figure(el, '오민석', { x: 1670, y: 738, scale: 2.2, big: true, role: '발송 승인', at: 1.8 });
      this.cd = capPx(THEME.card(el, { x: 120, y: 800, w: 1100, at: 2.25, enter: 'drop', cap: '다음 질문', pad: '14px 32px 18px',
        html: '<div class="c9-two" style="line-height:1.25">파트 1의 질문 「왜 결과가 달랐는가」에<br>무엇이라고 답하는가</div>' }));
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      this.ag.forEach(b => b.render(lt));
      this.cl.render(lt);
      this.hs.render(lt); this.mb.render(lt);
      this.cd.render(lt);
    },
  });
})();
