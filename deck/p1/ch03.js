/* 파트 1 · 3장 「같은 모델, 다른 결과」 장면 코드. 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다.
 * 원고: plan/slides/p1-ch03.json. 레이아웃 배정: plan/assets/p1_layout_ch03.md. 테마 부품: themes/p1.js. 본보기: p1/ch00.js s08~s21
 * 장마다 레이아웃이 다르다: 영상 제목 → 인물과 대사 → 한 문장 → 표 → 좌우 대비 → 세로 층 → 가로 순서 → 퀴즈 → 기둥 비교 → 확인 목록.
 * 키 누름은 s05(오른쪽 칸을 연다)와 s07(정답 기둥을 세운다)에 한 번씩만 둔다. 나머지 장은 키 없이 3~4초 안에 끝 상태가 된다. */
(function () {
  'use strict';
  const { ease, prog, clamp, lerp, css, h, s } = REEL;
  DECK.config({ part: 'p1', chapter: 'ch03', title: '같은 모델, 다른 결과' });

  const CH = { chapter: 3, title: '같은 모델, 다른 결과' };
  const FIC = Object.assign({ fiction: true }, CH);
  const EDGE = 'rgba(19,32,44,.35)', INK = '#13202C', SHADE = 'rgba(19,32,44,.18)';
  const F = 1 / 30;
  const rise = THEME.rise;

  // 절대 위치 글 덩어리
  const text = (el, cls, html, x, y, w) => {
    const d = h('div', 'a ' + cls, el, html);
    css(d, { left: x + 'px', top: y + 'px' });
    if (w) d.style.width = w + 'px';
    return d;
  };
  // 본문 여러 줄: 줄마다 div 를 만들어 따로 올린다
  const bodyLines = (el, lines, o = {}) => {
    const box = h('div', 'a', el);
    css(box, { left: (o.x ?? 120) + 'px', top: (o.y ?? 400) + 'px', width: (o.w ?? 560) + 'px', display: 'flex', flexDirection: 'column', gap: (o.gap ?? 14) + 'px' });
    return lines.map(t => h('div', 't-body', box, t));
  };
  const svgFull = (el) => {
    const v = s('svg', { width: 1, height: 1 }, el);
    css(v, { position: 'absolute', left: '0px', top: '0px', overflow: 'visible', pointerEvents: 'none' });
    return v;
  };
  // 블록 이름표를 44px 로 키운다
  const bigTag = (b) => { const t = b.body.querySelector('.p1-tag'); if (t) t.classList.add('is-big'); return b; };
  // 위에서 떨어져 내려앉는 상태(themes/p1.js 블록과 같은 곡선): 0.35초 가속 낙하, 3프레임 눌림, 0.2초에 펴짐
  const dropK = (lt, at, D = 300) => {
    const land = at + 0.35;
    if (lt < at) return { dy: D, op: 0, sx: 1, sy: 1 };
    if (lt < land) { const p = (lt - at) / 0.35; return { dy: D * (1 - p * p), op: clamp(p / 0.12), sx: 1, sy: 1 }; }
    const q = lt - land;
    if (q < 3 * F) return { dy: 0, op: 1, sx: 1.035, sy: 0.92 };
    const e = ease.outBack(clamp((q - 3 * F) / 0.2), 1.2);
    return { dy: 0, op: 1, sx: lerp(1.035, 1, e), sy: lerp(0.92, 1, e) };
  };
  // 점선 윤곽을 둘레를 따라 그어 나간다. polys: 점선(stroke-dasharray)을 단 polygon 들
  const dashDraw = (polys) => {
    polys.forEach(p => {
      const pts = p.getAttribute('points').trim().split(/\s+/).map(q => q.split(',').map(Number));
      let L = 0;
      for (let i = 0; i < pts.length; i++) { const a = pts[i], c = pts[(i + 1) % pts.length]; L += Math.hypot(c[0] - a[0], c[1] - a[1]); }
      p._L = L;
    });
    return (lt, at, dur = 0.35) => {
      const q = prog(lt, at, dur, ease.inOutCubic);
      polys.forEach(p => {
        p.style.opacity = lt < at ? '0' : '1';
        if (q >= 1) { p.setAttribute('stroke-dasharray', '6 5'); p.style.fillOpacity = '1'; return; }
        const D = q * p._L, n = Math.floor(D / 11), r = D - n * 11;
        p.setAttribute('stroke-dasharray', (Array(n).fill('6 5').join(' ') + ` ${Math.min(6, r).toFixed(1)} ${(p._L + 20).toFixed(0)}`).trim());
        p.style.fillOpacity = q.toFixed(3);
      });
    };
  };
  // 아직 오지 않은 자리(ghost 블록)의 점선 윤곽. 블록은 drop: 0 으로 만들어 떨어지지 않게 한다
  const ghostLines = (b) => dashDraw(Array.from(b.body.querySelectorAll('polygon')).filter(p => p.getAttribute('stroke-dasharray')));

  // 층 옆 이름표(themes/p1.js stack 의 이름표와 같은 모양). 이름 44px + 보조 줄 34px. 보조 줄은 폭 o.w 에서 접는다
  const sideTags = (el, defs, o = {}) => {
    const sv = svgFull(el);
    return defs.map(d => {
      const t = h('div', 'p1-side', el);
      const nm = h('span', '', t); nm.textContent = d.label;
      css(nm, { fontSize: (o.name ?? 44) + 'px', fontWeight: '700', lineHeight: '1.2' });
      let sm = null;
      if (d.note) {
        // brk: 보조 줄을 접을 자리(그 앞까지가 첫 줄). 문구는 그대로이고 공백 하나를 줄바꿈으로 보인다
        sm = h('small', '', t); sm.textContent = d.brk ? d.note.slice(0, d.brk) + '\n' + d.note.slice(d.brk + 1) : d.note;
        css(sm, { fontSize: (o.note ?? 34) + 'px', lineHeight: '1.25', marginTop: '4px' });
        if (o.w) css(sm, { width: o.w + 'px', whiteSpace: 'pre-line', wordBreak: 'keep-all' });
      }
      const ln = s('line', { stroke: EDGE, 'stroke-width': 1.5, 'stroke-linecap': 'round' }, sv);
      const dot = s('circle', { r: 5, fill: INK }, sv);
      return { t, sm, line: ln, dot, oy: o.oy ?? 20 };
    });
  };
  // (ax, ay) 층의 지시점, (lx, ly) 이름표 첫 줄의 왼쪽 가운데, p 등장 정도
  const drawTag = (q, ax, ay, lx, ly, p) => {
    css(q.t, { left: lx + 'px', top: ly + 'px', opacity: p.toFixed(3), transform: `translate(${((1 - p) * -24).toFixed(1)}px, ${-q.oy}px)` });
    q.line.setAttribute('x1', ax.toFixed(1)); q.line.setAttribute('y1', ay.toFixed(1));
    q.line.setAttribute('x2', lerp(ax, lx - 14, p).toFixed(1)); q.line.setAttribute('y2', lerp(ay, ly, p).toFixed(1));
    q.dot.setAttribute('cx', ax.toFixed(1)); q.dot.setAttribute('cy', ay.toFixed(1));
    q.line.style.opacity = q.dot.style.opacity = p > 0 ? '1' : '0';
  };

  // ── s01 챕터 전환(L0 영상 제목): 전환 영상 p1-tr-stack 을 정방향으로 깐다 ──
  DECK.slide({
    id: 'p1-ch03-s01', dur: 3,
    notes: "2장에서 여러분은 같은 요청을 넣고 옆 사람과 결과를 견주었습니다. 근거나 지급 기한 가운데 하나 이상이 서로 달랐을 겁니다. 3장에서는 같은 모델에 같은 요청을 넣었는데 왜 결과가 달랐는지 원인을 찾습니다. 반려를 받은 한서윤 주임도 이 질문에서 시작합니다.",
    setup(el) {
      this.vt = THEME.videoTitle(el, {
        kind: 'chapter', kicker: '파트 1 · 3장', scene: 'stack',
        src: '../assets/video/p1/p1-tr-stack.mp4', poster: '../assets/video/p1/p1-tr-stack.jpg',
        title: '같은 모델, 다른 결과',
        sub: '같은 모델에 같은 요청을 넣었는데 왜 결과가 서로 달랐는가',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // ── s02 이야기(L9 인물과 대사): 3배 인물 둘 사이로 반려된 초안이 되돌아오고, 한서윤 주임의 대사 카드가 제목 자리에 들어온다 ──
  DECK.slide({
    id: 'p1-ch03-s02', dur: 3.2,
    notes: "2장 끝에서 오민석 팀장은 세 가지 사유로 한서윤 주임의 초안을 반려했습니다. 한서윤 주임이 처음 떠올린 생각은 모델이 틀렸다는 것이었습니다. 모델을 바꾸면 해결될까요, 아니면 다른 원인이 있을까요? 결과를 하나씩 다시 보겠습니다.",
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [240, 560, 1500, 500], props: false, token: false });
      THEME.header(el, FIC);
      const M = [1560, 720];
      const things = h('div', 'full', el);   // 사물 층을 먼저 깔고, 그 위로 서류 토큰을 지나가게 한다
      // 뒤(위쪽)에 있는 것부터 만든다
      // 인물은 3.5배. 한서윤 주임의 머리(y 약 470)가 본문 줄(y 380~441) 아래에 오도록 대사 카드와 본문을 20~30px 올렸다
      this.mb = THEME.figure(things, '오민석', { x: M[0], y: M[1], at: 0.35, first: true, scale: 3.5 });
      this.dr = THEME.item(things, '답변 초안', { x: 1110, y: 800, w: 220, d: 170, at: 0.75, label: '답변 초안 · 반려', labelPos: 'below' });
      this.hs = THEME.figure(things, '한서윤', { x: 540, y: 830, at: 0.15, first: true, scale: 3.5 });
      // 오민석 팀장 앞(왼쪽 아래)에서 등각 축을 따라 왼쪽 위로, 다시 왼쪽 아래로 내려와 한서윤 주임 앞에서 멈춘다
      this.fl = THEME.flow(el, [[0, 120], [-336, 120], [-336, 640]], { x: M[0], y: M[1], at: this.dr.land + 0.05, speed: 620, line: false });
      this.cd = THEME.card(el, { x: 120, y: 150, w: 860, at: this.mb.land + 1.1, enter: 'slide', cap: '한서윤 주임', text: '모델이 틀린 걸까요?' });
      css(this.cd.face, { fontSize: '72px', fontWeight: '700' });
      this.body = text(el, 't-body', '반려된 초안을 들고 원인을 찾습니다', 120, 380);
      this.bodyAt = this.cd.land + 0.1;
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      [this.mb, this.dr, this.hs].forEach(b => b.render(lt));
      this.fl.render(lt);
      this.cd.render(lt);
      rise(this.body, lt, this.bodyAt);
    },
  });

  // ── s03 결론(L1 한 문장 + 근거 칸): 120px 두 줄 문장과 그 근거 셋 ──
  DECK.slide({
    id: 'p1-ch03-s03', dur: 3.4,
    notes: "한서윤 주임이 먼저 확인한 금액은 34,000원으로 공단 규정의 계산과 같았습니다. 비어 있던 것은 요청이었습니다. 근거 규정을 적지 않으니 일반 법령을 들었고, 형식을 적지 않으니 매번 달랐고, 개인정보 처리를 적지 않으니 이름 「김가람」을 옮겼습니다. 강사가 보낸 여섯 번도 웹 검색을 썼든 안 썼든 공단 규정을 근거로 든 답은 없었고, 모두 「김가람님」으로 시작했습니다. 강사는 codex로 보냈으니 여러분 화면의 문장은 다를 수 있으며, 여러분 결과에서 이 세 가지가 어떻게 나왔는지 견주어 보세요. (강사 확인: ChatGPT 화면에서 같은지는 강의 전날 K-13에서 확인합니다.) (화면에서 지운 주석: 「강사 사전 실행 예: codex 6회(2026-11-23)」)",
    setup(el) {
      this.bg = THEME.bg(el, 'base', { props: false, floor: false });
      THEME.header(el, FIC);
      this.st = THEME.statement(el, '모델이 아니라\n요청이 비어 있었습니다', {
        em: ['요청이 비어'], size: 120, cy: 560, at: 0.1,
        sub: '<span class="p1-mono">아래 민원에 답변을 써 줘.</span>',
        facts: [
          { label: '근거 자료 없음', text: '→ 체육시설법 시행령 등 일반 기준' },
          { label: '답변 형식 없음', text: '→ 매번 다른 형식' },
          { label: '개인정보 처리 없음', text: '→ 6번 모두 「김가람님」' },
        ],
      });
      this.src = text(el, 't-small p1-dimtext', '웹 검색 사용 4회 · 미사용 2회', 120, 950, 1200);
      this.srcAt = this.st.end - 0.25;
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.st.render(lt);
      rise(this.src, lt, this.srcAt, 16);
    },
  });

  // ── s04 개념(L12 표): 같은 요청 6번의 지급 기한을 행으로 놓고 맨 아래 규정 행을 회청으로 견준다 ──
  // 값이 같은 행끼리 묶는다: 「3영업일 이내」 네 행은 흰 행, 「확인 후 안내」 두 행은 호박색 행, 묶음 사이를 20px 띄운다.
  // 규정 행은 회청에 글자를 더 크게 하고, 조문 줄을 같은 행 안 둘째 줄로 넣는다
  DECK.slide({
    id: 'p1-ch03-s04', dur: 3.1,
    notes: "모델은 앞에 온 글을 보고 다음에 올 말 가운데 그럴듯한 것을 골라 이어 쓰기 때문에, 같은 요청에도 답이 매번 조금씩 다릅니다. 요청에 근거를 정해 주지 않으면 모델이 찾은 일반 자료나 추측으로 그 부분을 채웁니다. 강사가 보낸 여섯 번 가운데 「3영업일 이내」 네 번은 모두 웹 검색을 쓴 답이고, 「확인 후 안내」 두 번은 모두 검색을 쓰지 않은 답입니다. 그러니 이 4대 2는 확률만으로 갈린 것이 아니고, 검색을 했는지와 정확히 일치합니다. 어느 쪽도 공단 규정의 7영업일은 아니었으므로, 이 답을 그대로 보내면 민원인에게 공단 규정과 다른 기한을 안내하게 됩니다. 「3영업일 이내」는 체육시설법 시행령의 환불 기준과 같은 값이라 법령으로는 맞는 답입니다. 이 사례의 공단 규정(가상)은 7영업일로 정해 두었고, 모델은 그 규정을 받지 못해 법령 기준으로 답했습니다. (화면에서 지운 주석: 「강사 사전 실행 예: codex 6회(2026-11-23)」)",
    setup(el) {
      this.bg = THEME.bg(el, 'base', { props: false, floor: false });
      THEME.header(el, FIC);
      this.t = THEME.title(el, '모델은 확률로 답합니다', { x: 120, y: 104, size: 72, at: 0.1 });
      this.lines = bodyLines(el, [
        '다음에 올 그럴듯한 말을<br>골라 이어 씁니다',
        '정하지 않은 것은 일반 자료나<br><span class="p1-em">추측</span>으로 채웁니다',
        '추측은 실행할 때마다<br>달라집니다',
      ], { x: 120, y: 262, w: 560, gap: 44 });
      const TX = 740, TY = 314, RH = 74, GAP = 8, GG = 20, cols = [200, 860], FS = 42;
      this.cap = h('div', 'p1-tag', el, '같은 요청 6번 · 지급 기한');
      css(this.cap, { left: TX + 'px', top: '196px', fontSize: '34px', fontWeight: '600' });
      this.tA = THEME.table(el, [['1', '3영업일 이내 · 법령 기준'], ['2', '3영업일 이내 · 법령 기준'], ['3', '3영업일 이내 · 법령 기준'], ['4', '3영업일 이내 · 법령 기준']],
        { x: TX, y: TY, cols, head: ['실행', '지급 기한'], rowH: RH, gap: GAP, size: FS, at: 0.85 });
      const head = el.querySelector('.p1-thead');
      if (head) css(head, { fontSize: '34px' });
      const BY = TY + 4 * (RH + GAP) - GAP + GG;
      this.tB = THEME.table(el, [{ cells: ['5', '확인 후 안내'], tone: 'amber' }, { cells: ['6', '확인 후 안내'], tone: 'amber' }],
        { x: TX, y: BY, cols, rowH: RH, gap: GAP, size: FS, at: 0.85 + 4 * 0.08 + 0.08 });
      // 규정 행은 여섯 행 뒤에 한 박자 쉬고 들어온다
      const RY = BY + 2 * (RH + GAP) - GAP + GG, RRH = 112;
      this.rule = THEME.table(el, [{ cells: ['공단 규정', '신청일부터 7영업일 안'], tone: 'slate' }], { x: TX, y: RY, cols, rowH: RRH, gap: GAP, size: 44, at: 1.75 });
      const grid = this.rule.rows[0].face.querySelector('.p1-tgrid');
      if (grid) css(grid, { alignItems: 'center' });
      if (grid && grid.children[0]) css(grid.children[0], { whiteSpace: 'nowrap', fontSize: '36px' });
      const val = this.rule.rows[0].face.querySelector('.p1-tgrid > div:nth-child(2)');
      if (val) {
        val.textContent = '';
        const v = h('div', '', val, '신청일부터 7영업일 안');
        css(v, { fontSize: '52px', fontWeight: '700', lineHeight: '1.15' });
        this.law = h('div', '', val, '체육시설 이용 규정 제8조 제2항');
        css(this.law, { fontSize: '30px', fontWeight: '400', lineHeight: '1.3', opacity: '0.85' });
      }
      this.src = text(el, 't-small p1-dimtext', '웹 검색 사용 4회 · 미사용 2회', 120, 896, 600);
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      this.lines.forEach((l, i) => rise(l, lt, 0.45 + i * 0.15));
      rise(this.cap, lt, 0.7, 16);
      this.tA.render(lt);
      this.tB.render(lt);
      this.rule.render(lt);
      rise(this.src, lt, 2.25, 16);
    },
  });

  // ── s05 개념(L3 좌우 대비, 키 한 번): 왼쪽 「질문」이 먼저 놓이고, 키를 누르면 오른쪽 「맡긴 일」 칸이 열린다 ──
  const S05_R = 2.0;
  DECK.slide({
    id: 'p1-ch03-s05', dur: 4, steps: [S05_R],
    notes: "질문에는 대답만 있으면 됩니다. 환불 계산 방법을 물었다면 방법을 듣고 끝납니다. (키) 맡긴 일은 받은 결과물을 고치지 않고 그대로 쓸 수 있어야 끝납니다. 민원 답변 초안이라면 공단 규정의 조문, 규정의 지급 기한, 개인정보 없음을 모두 갖춰야 보낼 수 있습니다. 한 줄 요청은 일을 맡기는 요청인데 끝나는 조건을 하나도 적지 않았습니다.",
    setup(el) {
      THEME.header(el, FIC);
      this.t = THEME.title(el, '맡긴 일은 그대로 쓸 수 있어야 합니다', { x: 120, y: 104, size: 64, at: 0.1 });
      const R = S05_R;
      const sp = this.sp = THEME.split(el, { left: { label: '질문' }, right: { label: '맡긴 일', tone: 'cobalt' }, rightAt: R, at: 0.3 });
      this.q = bigTag(THEME.block(sp.left, { x: 520, y: 650, w: 260, d: 260, h: 70, at: 0.6, label: '「수영 강습 환불은 어떻게 계산해?」', pin: 50 }));
      this.l1 = text(sp.left, 'p1-half-line', '대답을 들으면 끝납니다', 120, 880);
      this.dr = bigTag(THEME.item(sp.right, '답변 초안', { x: 1420, y: 560, w: 260, d: 170, at: R + 0.25, label: '「이 민원에 보낼 답변을 써 줘」', pin: 40 }));
      this.ck = ['공단 규정의 조문', '규정의 지급 기한', '개인정보 없음'].map((lb, k) =>
        THEME.block(sp.right, { x: 1130 + k * 300, y: 760, w: 96, d: 96, h: 36, at: R + 0.55 + k * 0.15, label: lb, labelPos: 'below' }));
      this.l2 = text(sp.right, 'p1-half-line', '결과물을 그대로 씁니다', 1040, 900);
      this.l3 = text(sp.right, 't-body', '민원 답변 초안은 <span class="p1-em">맡긴 일</span>입니다', 1040, 960);
    },
    render(lt) {
      const R = S05_R;
      this.t.render(lt);
      this.sp.render(lt);
      this.q.render(lt);
      rise(this.l1, lt, 1.0);
      this.dr.render(lt);
      this.ck.forEach(b => b.render(lt));
      rise(this.l2, lt, R + 1.0);
      rise(this.l3, lt, R + 1.15);
    },
  });

  // ── s06 도식(L5 세로 층): 다섯 층 자리 가운데 위 세 층만 채우고, 왼쪽 치수선 둘로 생성형 AI와 에이전트의 범위를 잰다 ──
  // 층 묶음: 바닥 가운데 (1000, 695), 맨 아래층 폭 570, 위로 80씩 좁아짐, 층 높이 60. 채운 맨 아래층(에이전트, 폭 410)이 화면 폭 710px.
  // 층 i 의 왼쪽 모서리는 (1000 - w·cos30, 695 - 60·i) 에서 60px 위까지. 묶음은 y 270(모델 층 윗면) ~ 980(맨 아래 점선 층 앞 모서리)
  const STK = { x: 1000, y: 695, w: 570, shrink: 80, h: 60, lx: 1520, ly: [727, 567, 407] };
  const layerGeo = i => {
    const w = STK.w - STK.shrink * i, z = STK.h * i;
    return { w, z, anchor: [STK.x + (w / 2) * Math.cos(Math.PI / 6), STK.y + (w / 2) * 0.5 - z - STK.h / 2], left: STK.x - w * Math.cos(Math.PI / 6) };
  };
  DECK.slide({
    id: 'p1-ch03-s06', dur: 3.2,
    notes: "맡긴 일을 그대로 쓸 수 있게 하려면 요청에 적을 것 말고도 모델 바깥에 정할 것이 있습니다. 모델은 받은 글을 보고 답을 만드는 부분이고, 묻는 말에 답을 만들어 돌려주는 데까지가 생성형 AI입니다. 모델에 웹 검색, 파일 열기, 코드로 계산하기 같은 도구를 붙이고 그 결과를 보고 다음 할 일을 정하게 하면 에이전트입니다. 한서윤 주임의 일이라면 규정 파일을 열어 환불 조문을 찾고, 계산한 금액이 조문과 맞지 않으면 조문을 다시 찾는 데까지 갑니다. ChatGPT에도 문서·보고서를 여러 단계에 걸쳐 만드는 에이전트 기능 Work가 있고, 파트 3 실습에서 직접 씁니다.",
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [300, 360, 1500, 700], props: false, tokenAt: [1660, 920], tokenA: 80, tokenB: 40 });
      THEME.header(el, CH);
      this.t = THEME.title(el, '요청 말고 모델 바깥에도 정할 것이 있습니다', { x: 120, y: 104, size: 64, at: 0.1 });
      // 본문 두 줄은 제목 아래 왼쪽(x 120~860, y 196~318). 층 묶음 맨 위 점(1000, 270)과 왼쪽 모서리(783, 395)보다 왼쪽 위라 겹치지 않는다
      this.lines = bodyLines(el, [
        '<b>생성형 AI:</b> 묻는 말에 답을 만듭니다',
        '<b>에이전트:</b> 도구를 쓰고 다음 할 일을 정합니다',
      ], { x: 120, y: 196, w: 1000, gap: 0 });
      // 아래 두 층(하네스·워크플로 자리)은 떨어지지 않고 점선 윤곽만 그어진다. 이름표를 달지 않는다
      this.ghosts = [0, 1].map(i => {
        const g = layerGeo(i), at = 0.3 + i * 0.15;
        const b = THEME.block(el, { x: STK.x, y: STK.y, z: g.z, w: g.w, d: g.w, h: STK.h, tone: 'ghost', at, drop: 0, shadow: false });
        return { b, line: ghostLines(b), at };
      });
      const defs = [
        { i: 2, label: '에이전트', note: '금액이 안 맞으면 조문을 다시 찾음', brk: 9 },
        { i: 3, label: '도구', note: '웹 검색, 파일 열기, 코드로 계산', brk: 12 },
        { i: 4, label: '모델', note: '받은 글을 보고 답을 만듦', brk: 8, tone: 'cobalt' },
      ];
      this.layers = defs.map((d, k) => {
        const g = layerGeo(d.i);
        const b = THEME.block(el, { x: STK.x, y: STK.y, z: g.z, w: g.w, d: g.w, h: STK.h, tone: d.tone, at: 0.8 + k * 0.16, drop: 300, shadow: k === 0, shadowH: STK.h });
        return { b, g };
      });
      // 이름표는 층 묶음 오른쪽 끝(x 1494)보다 오른쪽 x 1520 에 160px 간격으로 세로로 벌려 놓고, 보조 줄은 폭 300 에서 두 줄로 접는다
      this.tags = sideTags(el, defs, { name: 44, note: 34, w: 300, oy: 27 });
      // 치수선: 모델 층 높이를 재는 「생성형 AI」(바깥쪽), 위 세 층 높이를 재는 「에이전트」(층 묶음 쪽).
      // 두 글자가 서로의 선과 겹치지 않도록 짧은 선을 바깥에, 긴 선을 안쪽에 두고 글자는 모두 선 왼쪽에 둔다.
      // 「에이전트」 글자는 「생성형 AI」 글자와 위아래로 겹치지 않게 긴 선의 아래쪽(y 535)에 둔다
      const yTop = STK.y - STK.h * 5, yModel = STK.y - STK.h * 4, yAgent = STK.y - STK.h * 2;
      const XI = 400, XO = 480;
      this.d1 = THEME.dim(el, '생성형 AI', { from: [XI, yModel], to: [XI, yTop], side: 'left', size: 52, at: 1.75 });
      this.d2 = THEME.dim(el, '에이전트', { from: [XO, yAgent], to: [XO, yTop], side: 'left', size: 52, at: 2.15 });
      [this.d1, this.d2].forEach(d => css(d.num, { fontFamily: 'var(--body)', fontWeight: '700', letterSpacing: '-0.01em' }));
      css(this.d2.num, { top: (yAgent - 40) + 'px' });
      // 치수 보조선: 잰 높이의 위아래 끝에서 층 모서리까지 가는 점선
      const sv = svgFull(el);
      const ext = (y, x1, x2, at) => ({ ln: s('line', { x1, y1: y, x2: x1, y2: y, stroke: EDGE, 'stroke-width': 1.5, 'stroke-dasharray': '4 6' }, sv), x1, x2, at });
      this.ext = [
        ext(yTop, layerGeo(4).left - 10, XI - 16, 1.75),
        ext(yModel, layerGeo(3).left - 10, XI - 16, 1.75),
        ext(yAgent, layerGeo(2).left - 10, XO - 16, 2.15),
      ];
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      this.lines.forEach((l, i) => rise(l, lt, 1.1 + i * 0.15));
      this.ghosts.forEach(q => { q.b.render(lt); q.line(lt, q.at); });
      this.layers.forEach((L, k) => {
        L.b.render(lt);
        drawTag(this.tags[k], L.g.anchor[0], L.g.anchor[1], STK.lx, STK.ly[k], prog(lt, L.b.land + 0.05, 0.35, ease.snap));
      });
      this.ext.forEach(e => {
        const p = prog(lt, e.at, 0.35, ease.inOutCubic);
        e.ln.setAttribute('x2', lerp(e.x1, e.x2, p).toFixed(1));
        e.ln.style.opacity = lt < e.at ? '0' : '1';
      });
      this.d1.render(lt);
      this.d2.render(lt);
    },
  });

  // ── s06a 도식(L4 가로 순서): 하네스 판 위에 워크플로 단계 블록 셋이 놓이고, 서류 토큰이 블록 앞을 지나간다 ──
  // 하네스 판: 단계 블록마다 그 아래에 등각 정사각형(반폭 r)을 두고 세 정사각형을 합친 판이다. 합친 판의 앞쪽 가장자리는 등각 축을 따라
  // 번갈아 꺾이는 선이라, 앞면이 블록과 같은 왼면(밝은 회색)·오른면(어두운 회색) 두 색으로 보이고 두께 T 와 그림자가 생긴다.
  // 블록 k 의 바닥 가운데는 등각 좌표 (k·a, -k·a), 화면에서는 (x0 + k·433, yc). 판 윗면은 화면 y 282~786, 앞 모서리 아래 끝 y 786
  const PL = { x0: 527, a: 250, r: 230, T: 44, yc: 556 };
  const C30 = Math.cos(Math.PI / 6);
  const plIso = (ix, iy, z = 0) => [PL.x0 + (ix - iy) * C30, PL.yc + (ix + iy) * 0.5 - z];
  // 앞쪽 가장자리(왼쪽 모서리 → 오른쪽 모서리)와 뒤쪽 가장자리의 등각 꼭짓점
  const PL_FRONT = (() => { const { a, r } = PL; return [[-r, r], [r, r], [r, r - a], [a + r, r - a], [a + r, r - 2 * a], [2 * a + r, r - 2 * a], [2 * a + r, -2 * a - r]]; })();
  const PL_BACK = (() => { const { a, r } = PL; return [[2 * a - r, -2 * a - r], [2 * a - r, -a - r], [a - r, -a - r], [a - r, -r], [-r, -r]]; })();
  // 판 앞쪽 바닥선의 화면 y(화면 x 에서)
  const plGroundY = (x) => {
    const S = PL_FRONT.map(([ix, iy]) => plIso(ix, iy, 0));
    for (let i = 0; i < S.length - 1; i++) {
      const [x1, y1] = S[i], [x2, y2] = S[i + 1];
      if (x >= Math.min(x1, x2) && x <= Math.max(x1, x2) && x2 !== x1) return y1 + (y2 - y1) * (x - x1) / (x2 - x1);
    }
    return PL.yc;
  };
  DECK.slide({
    id: 'p1-ch03-s06a', dur: 3.8,
    notes: "일의 순서를 미리 정해 둔 것이 워크플로이고, 한서윤 주임의 일이라면 규정 찾기, 답변 작성, 원문 대조의 순서입니다. 하네스는 이 전부에 적용되는 환경으로, 어떤 지침을 읽고, 어떤 도구를 쓰고, 무엇을 기록하고, 어떻게 검증하고, 어디까지 실행할지를 정합니다. 한서윤 주임에게는 공단 규정만 근거로 쓰고, 조문 번호를 확인하고, 발송 전에 팀장이 승인한다는 규칙이 여기에 들어갑니다. 4장에서는 이 규칙을 먼저 요청문에 적고, 7장에서 한 번 정해 두는 방법을 본 뒤 파트 2에서 직접 만듭니다. 이 가운데 한서윤 주임이 지금 바로 바꿀 수 있는 것은 요청문이므로, 요청에 무엇을 적어야 하는지로 돌아갑니다. (강사 확인: 앞 화면의 에이전트·도구·모델 세 층 아래에 비워 둔 두 층이 이 화면의 워크플로와 하네스라고 말로 잇습니다.)",
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [120, 380, 1680, 640], props: false, token: false });
      THEME.header(el, FIC);
      this.t = THEME.title(el, '순서와 규칙까지 정하면 하네스입니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.b1 = text(el, 't-body', '<b>워크플로:</b> 일의 순서를 미리 정합니다', 120, 196);
      const { a, r, T } = PL;
      const P2 = pts => pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
      const tn = THEME.tones.white;
      // 그림자: 정사각형마다 바닥에서 오른쪽 아래(등각 x 방향)로 민 육각형. 겹친 곳이 진해지지 않게 불투명하게 칠하고 묶음 전체에 투명도를 준다
      const sv0 = svgFull(el);
      this.psh = s('g', { opacity: 0 }, sv0);
      this.psh.style.transformOrigin = `${plIso(a, -a)[0].toFixed(0)}px ${PL.yc}px`;
      const sx = 56, sy = 12;
      [0, 1, 2].forEach(k => {
        const cx = k * a, cy = -k * a;
        s('polygon', { points: P2([[cx - r, cy - r], [cx + r, cy - r], [cx + r + sx, cy - r + sy], [cx + r + sx, cy + r + sy], [cx - r + sx, cy + r + sy], [cx - r, cy + r]].map(([ix, iy]) => plIso(ix, iy, 0))), fill: INK }, this.psh);
      });
      // 판 본체: 앞쪽 옆면(등각 y 방향을 보는 면은 왼면 색, x 방향을 보는 면은 오른면 색)을 먼저, 윗면을 나중에 그린다
      this.plate = h('div', 'full', el);
      css(this.plate, { pointerEvents: 'none', transformOrigin: `${plIso(a, -a)[0].toFixed(0)}px ${PL.yc + r}px` });
      const sv = svgFull(this.plate);
      const st = { stroke: EDGE, 'stroke-width': 1.5, 'stroke-linejoin': 'round' };
      for (let i = 0; i < PL_FRONT.length - 1; i++) {
        const [p, q] = [PL_FRONT[i], PL_FRONT[i + 1]];
        const fill = p[1] === q[1] ? tn.left : tn.right;
        s('polygon', { points: P2([plIso(p[0], p[1], 0), plIso(q[0], q[1], 0), plIso(q[0], q[1], T), plIso(p[0], p[1], T)]), fill, ...st }, sv);
      }
      s('polygon', { points: P2(PL_FRONT.concat(PL_BACK).map(([ix, iy]) => plIso(ix, iy, T))), fill: tn.top, ...st }, sv);
      this.plateAt = 0.3;
      // 단계 블록 셋: 판 윗면(높이 T) 위에 놓는다
      const BY = PL.yc - T;
      this.sq = THEME.sequence(el, [
        { label: '규정 찾기', tone: 'cobalt' }, { label: '답변 작성', tone: 'cobalt' }, { label: '원문 대조', tone: 'cobalt' },
      ], { x0: PL.x0, x1: PL.x0 + 4 * a * C30, y: BY, size: 200, h: 80, at: 0.7, token: false, pin: 36 });
      // 서류 토큰: 블록 1 앞(등각 (150, 150))에서 출발해 블록 사이 틈을 등각 축으로만 지나 「원문 대조」 앞에서 멈춘다. 길은 모두 판 윗면 안에 있다
      this.fl = THEME.flow(el, [[0, 0], [0, -a], [a, -a], [a, -2 * a], [2 * a, -2 * a]], { x: PL.x0, y: BY + 150, at: 1.45, speed: 1300, line: false });
      // 판 앞쪽 아래의 이름표 줄: 「하네스」와 규칙 셋. 핀은 판 앞쪽 바닥선에서 이름표 위까지 내려온다
      const tagY = PL.yc + r + 30;
      const rsv = svgFull(el);
      const pinTo = (cx) => s('line', { x1: cx, y1: plGroundY(cx).toFixed(1), x2: cx, y2: tagY, stroke: EDGE, 'stroke-width': 1.5 }, rsv);
      const hx = PL.x0 - a * C30 * 0.9;
      this.htag = h('div', 'p1-tag', el, '하네스');
      css(this.htag, { left: hx + 'px', top: tagY + 'px', fontSize: '52px', fontWeight: '700' });
      this.hpin = pinTo(hx);
      this.rules = [['공단 규정만 근거', PL.x0 + a * C30], ['조문 확인', PL.x0 + 3 * a * C30], ['발송 전 승인', PL.x0 + 5 * a * C30]].map(([lb, cx]) => {
        const tg = h('div', 'p1-tag', el, lb);
        css(tg, { left: cx + 'px', top: tagY + 'px', fontSize: '40px', fontWeight: '600' });
        return { tg, pin: pinTo(cx) };
      });
      this.ruleAt = this.fl.end + 0.05;
      this.b2 = text(el, 't-body', '<b>하네스:</b> 지침·도구·기록·검증·권한을 정합니다', 120, 914);
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      // 판은 120px 위에서 떨어진다. 더 높이서 떨어지면 조립 중인 제목을 가린다
      const k = dropK(lt, this.plateAt, 120);
      this.plate.style.transform = `translate(0px, ${(-k.dy).toFixed(1)}px) scale(${k.sx.toFixed(4)}, ${k.sy.toFixed(4)})`;
      this.plate.style.opacity = k.op.toFixed(3);
      const g = prog(lt, this.plateAt + 0.2, 0.15, ease.outQuad);
      this.psh.setAttribute('opacity', (0.18 * g).toFixed(3));
      this.psh.style.transform = `scale(${lerp(0.6, 1, g).toFixed(3)})`;
      const hp = prog(lt, this.plateAt + 0.4, 0.3, ease.snap);
      this.htag.style.opacity = hp.toFixed(3);
      this.htag.style.transform = `translate(-50%, ${((1 - hp) * 14).toFixed(1)}px)`;
      this.hpin.style.opacity = hp.toFixed(3);
      rise(this.b1, lt, 0.75);
      this.sq.render(lt);
      this.fl.render(lt);
      this.rules.forEach((r, i) => {
        const p = prog(lt, this.ruleAt + i * 0.12, 0.3, ease.snap);
        r.tg.style.opacity = p.toFixed(3);
        r.tg.style.transform = `translate(-50%, ${((1 - p) * 14).toFixed(1)}px)`;
        r.pin.style.opacity = p.toFixed(3);
      });
      rise(this.b2, lt, this.ruleAt + 0.25);
    },
  });

  // ── s09 정리(L8 확인 목록): 한 줄 요청 아래에 비어 있던 세 줄을 점선 블록으로 긋고, 다음 질문 카드를 내려놓는다 ──
  DECK.slide({
    id: 'p1-ch03-s09', dur: 3,
    notes: "한서윤 주임의 한 줄 요청에는 근거 자료, 답변 형식, 개인정보 처리가 비어 있었고, 모델은 비어 있던 것을 일반 기준과 추측으로 채웠습니다. 모델 바깥에 정해 둘 것 가운데 지금 바로 정할 수 있는 것이 요청문입니다. 그래서 요청에는 어느 규정으로 답할지, 어떤 칸에 나눠 쓸지, 이름과 연락처를 어떻게 할지를 적어야 합니다. 그러면 이 세 가지를 어떻게 적어야 모델이 추측으로 채우지 않을까요? 4장에서 한서윤 주임이 한 줄 요청을 다시 씁니다.",
    setup(el) {
      // 오른쪽 아래 큰 코발트 블록은 목록 셋째 줄의 밑줄(x 1720, y 778)과 다음 질문 카드에 닿지 않게 화면 모서리 쪽으로 내렸다
      this.bg = THEME.bg(el, 'accent', { floor: false, bx: 1880, by: 1180 });
      THEME.header(el, FIC);
      this.t = THEME.title(el, '요청에 무엇을 적어야 할까요?', { x: 120, y: 104, size: 72, at: 0.1 });
      this.req = h('div', 'p1-tag p1-mono', el, '아래 민원에 답변을 써 줘.');
      css(this.req, { left: '120px', top: '196px', fontSize: '36px', fontWeight: '500', transformOrigin: '50% 100%' });
      this.reqAt = 0.45;
      // 확인 목록(THEME.checklist 와 같은 모양을 키웠다: 항목 60px, 보조 줄 38px, 줄 높이 172). 4장에서 채울 자리라 값을 비우고,
      // 줄 높이만 한 점선 블록(116×116, 높이 40)은 떨어지지 않고 윤곽이 그어진다
      const X = 120, Y = 262, W = 1600, RH = 172, BW = 116, BH = 40;
      const sv = svgFull(el);
      this.rows = [
        ['근거 자료', '어느 규정으로 답할지'],
        ['답변 형식', '어떤 칸에 나눠 쓸지'],
        ['개인정보 처리', '이름·연락처를 어떻게 할지'],
      ].map(([t1, t2], i) => {
        const ry = Y + i * RH, at = 0.9 + i * 0.18;
        const bx = X + BW * Math.cos(Math.PI / 6) + 4;
        const b = THEME.block(el, { x: bx, y: ry + RH / 2 + BH / 2, w: BW, d: BW, h: BH, tone: 'ghost', at, drop: 0, shadow: false });
        const tx = h('div', 'p1-chk', el);
        const TL = X + 250;
        css(tx, { left: TL + 'px', top: ry + 'px', width: (X + W - TL) + 'px', height: RH + 'px' });
        css(h('div', 'p1-chk-t', tx, t1), { fontSize: '60px', fontWeight: '700', lineHeight: '1.2' });
        css(h('div', 'p1-chk-n', tx, t2), { fontSize: '38px', lineHeight: '1.3', marginTop: '4px' });
        // 값 자리: 비어 있는 점선 칸(4장에서 채운다)
        const x0 = X + W - 600, x1 = X + W - 20, y0 = ry + 46, y1 = ry + RH - 46;
        const slot = s('polygon', { points: `${x0},${y0} ${x1},${y0} ${x1},${y1} ${x0},${y1}`, fill: 'rgba(255,255,255,.35)', stroke: 'rgba(19,32,44,.45)', 'stroke-width': 1.5, 'stroke-dasharray': '6 5' }, sv);
        return { b, line: ghostLines(b), slot: dashDraw([slot]), tx, at };
      });
      this.cd = THEME.card(el, { x: 120, y: 800, w: 1200, at: 1.75, enter: 'drop', cap: '다음 질문', text: '추측으로 채우지 않게 하려면 요청에 무엇을 적어야 하는가' });
      css(this.cd.face, { fontSize: '44px', fontWeight: '600' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      const k = dropK(lt, this.reqAt, 160);
      this.req.style.transform = `translate(0px, ${(-k.dy).toFixed(1)}px) scale(${k.sx.toFixed(4)}, ${k.sy.toFixed(4)})`;
      this.req.style.opacity = k.op.toFixed(3);
      this.rows.forEach(r => { r.b.render(lt); r.line(lt, r.at); r.slot(lt, r.at + 0.15, 0.45); rise(r.tx, lt, r.at + 0.1, 20); });
      this.cd.render(lt);
    },
  });
})();
