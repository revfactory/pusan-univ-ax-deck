/* 파트 1 · 6장 「공공기관에서 지키는 네 가지」 장면 코드. 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다.
 * 원고: plan/slides/p1-ch06.json. 레이아웃 배정: plan/assets/p1_layout_ch06.md. 테마 부품: themes/p1.js. 본보기: p1/ch00.js
 * 장마다 레이아웃이 다르다: 영상 제목 → 인물과 대사 → 글과 구조 → 확인 목록 → 사례 장면 → 가로 순서 → 좌우 대비 → 카드 격자.
 * 키 누름은 s04(지울 줄의 값을 연다) 한 번뿐이다. 나머지 장은 키 없이 3~4초 안에 끝 상태가 된다. */
(function () {
  'use strict';
  const { ease, prog, lerp, css, h, s } = REEL;
  DECK.config({ part: 'p1', chapter: 'ch06', title: '공공기관에서 지키는 네 가지' });

  const CH = { chapter: 6, title: '공공기관에서 지키는 네 가지' };
  const FIC = Object.assign({ fiction: true }, CH);
  const EDGE = 'rgba(19,32,44,.35)', INK = '#13202C';
  const iso = THEME.iso;
  const rise = THEME.rise;
  const text = THEME.text;

  // 블록·인물 이름표를 44px(보조 줄 34px)로 키운다
  const bigTag = (b) => { const t = (b.body || b.el).querySelector('.p1-tag'); if (t) t.classList.add('is-big'); return b; };
  // (cx, cy) 를 바닥 원점으로 하는 등각 좌표 → 화면 점
  const isoAt = (cx, cy) => (ix, iy, iz = 0) => { const [dx, dy] = iso(ix, iy, iz); return [cx + dx, cy + dy]; };
  const svgFull = (el) => {
    const v = s('svg', { width: 1, height: 1 }, el);
    css(v, { position: 'absolute', left: '0px', top: '0px', overflow: 'visible', pointerEvents: 'none' });
    return v;
  };
  // 지시선이 달린 흰 이름표(이름 44px, 질문 34px). side 'right' 는 이름표 왼쪽 끝이 x, 'left' 는 오른쪽 끝이 x 다.
  // 이름 줄의 세로 가운데를 y 에 맞춘다. 지시선은 anchor 에서 이름표 가장자리까지 그어진 뒤 이름표가 옆에서 들어온다
  function leaderTag(el, sv, o) {
    const t = h('div', 'p1-tag is-big', el);
    t.appendChild(document.createTextNode(o.name));
    const sm = h('small', '', t); sm.textContent = o.note;
    if (o.br != null) { sm.textContent = o.note.slice(0, o.br) + '\n' + o.note.slice(o.br + 1); sm.style.whiteSpace = 'pre-line'; }
    const W = t.offsetWidth;
    const left = o.side === 'left' ? o.x - W : o.x;
    css(t, { left: left + 'px', top: (o.y - 36) + 'px' });
    const ex = o.side === 'left' ? left + W : left;
    const ln = s('line', { x1: o.anchor[0], y1: o.anchor[1], x2: o.anchor[0], y2: o.anchor[1], stroke: EDGE, 'stroke-width': 1.5, 'stroke-linecap': 'round' }, sv);
    const dot = s('circle', { cx: o.anchor[0], cy: o.anchor[1], r: 6, fill: INK }, sv);
    const dir = o.side === 'left' ? 1 : -1;
    return {
      el: t, end: o.at + 0.55,
      render(lt) {
        const p = prog(lt, o.at, 0.25, ease.inOutCubic);
        ln.setAttribute('x2', lerp(o.anchor[0], ex, p).toFixed(1)); ln.setAttribute('y2', lerp(o.anchor[1], o.y, p).toFixed(1));
        ln.style.opacity = dot.style.opacity = lt < o.at ? '0' : '1';
        const q = prog(lt, o.at + 0.2, 0.32, ease.snap);
        t.style.opacity = q.toFixed(3);
        t.style.transform = `translateX(${((1 - q) * 26 * dir).toFixed(1)}px)`;
      },
    };
  }

  // ── s01 챕터 전환(L0 영상 제목): 흰 판 네 모서리에서 호박 기둥이 솟는 전환 영상 p1-tr-pillars 를 정방향으로 깐다 ──
  DECK.slide({
    id: 'p1-ch06-s01', dur: 3.4,
    notes: '5장에서 세 항목 요청문에 규정 파일을 붙이자 조문 번호와 계산식이 붙은 답변이 나왔고, 오민석 팀장은 「고쳐서 쓸 수 있겠다」고 했습니다. 그러면 이 요청문을 내일 실제 민원에 그대로 써도 될까요? 6장은 이 질문에 답합니다. 답은 기관 밖의 서비스에 업무 자료를 넣기 전에 확인할 네 가지입니다.',
    setup(el) {
      this.vt = THEME.videoTitle(el, {
        kind: 'chapter', kicker: '파트 1 · 6장', scene: 'pillars',
        src: '../assets/video/p1/p1-tr-pillars.mp4', poster: '../assets/video/p1/p1-tr-pillars.jpg',
        title: '공공기관에서 지키는 네 가지',
        sub: '이 방식을 내일 실제 민원에 그대로 써도 되는가',
      });
      if (this.vt.end + 0.3 > this.dur) console.warn('[DECK] s01 dur 가 짧다', this.vt.end);
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // ── s02 이야기(L9 인물과 대사): 3배 인물 둘 사이에 민원 글과 답변 초안. 한서윤 주임의 대사 카드가 들어온 뒤
  //    정하준 대리가 내려앉고, 서류 토큰이 답변 초안에서 정하준 대리 앞까지 간 뒤 답변 초안 둘레에 점선 기둥 자리 넷이 그어진다 ──
  DECK.slide({
    id: 'p1-ch06-s02', dur: 3.8,
    notes: '5장이 끝나고 한서윤 주임은 조문 번호와 계산식이 붙은 답변 초안을 받았습니다. 한서윤 주임이 내일부터 실제 민원에 이 요청문을 쓰겠다고 하자, 정보화팀 정하준 대리가 그 전에 확인할 것이 네 가지 있다고 합니다. 정하준 대리는 정보보안과 개인정보 담당이라, 기관 밖의 서비스에 무엇을 넣는지와 나온 답을 어떻게 내보내는지를 봅니다. 여러분 기관에서는 이 일을 어느 부서가 맡는지 떠올려 보세요. 네 가지를 먼저 한 화면에 놓고 보겠습니다.',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [260, 470, 1580, 590], props: false, token: false });
      THEME.header(el, FIC);
      this.t = THEME.title(el, '정하준 대리가 네 가지를 묻습니다', { x: 120, y: 100, size: 64, at: 0.1 });
      const D = [1220, 840], P = isoAt(D[0], D[1]);   // 답변 초안의 바닥 가운데
      const things = h('div', 'full', el);   // 사물 층을 먼저 깔고 서류 토큰을 그 위에 둔다
      // 서류 토큰: 답변 초안 오른쪽 뒤에서 등각 축(오른쪽 위)을 따라 정하준 대리 왼쪽 앞까지 간다
      this.fl = THEME.flow(el, [[0, -125], [0, -320]], { x: D[0], y: D[1], at: 2.05, speed: 420 });
      // 뒤(ix + iy 가 작은 것)부터 만든다
      this.jh = bigTag(THEME.figure(things, '정하준', { x: 1600, y: 640, at: 1.5, first: true, scale: 3 }));
      this.cp = bigTag(THEME.item(things, '민원 글', { x: 840, y: 680, w: 200, d: 150, at: 0.3, note: '수영 강습 환불 요청' }));
      const G = (ix, iy, at) => {
        const [x, y] = P(ix, iy);
        const b = THEME.block(things, { x, y, w: 32, d: 32, h: 100, tone: 'ghost', drop: 0, shadow: false, at });
        return { b, draw: THEME.ghostDraw(b), at };
      };
      const g0 = G(-128, -103, 2.65), g1 = G(-128, 103, 2.8);
      this.dr = bigTag(THEME.item(things, '답변 초안', { x: D[0], y: D[1], w: 220, d: 170, at: 0.5, note: '근거 제7조 제1항 제2호', labelPos: 'left' }));
      const g2 = G(128, -103, 2.95), g3 = G(128, 103, 3.1);
      this.ghosts = [g0, g1, g2, g3];
      this.hs = bigTag(THEME.figure(things, '한서윤', { x: 420, y: 850, at: 0.7, first: true, scale: 3 }));
      this.cd = THEME.card(el, { x: 120, y: 190, w: 1000, at: 1.0, enter: 'slide', cap: '한서윤 주임', html: '내일부터 실제 민원에<br>이 요청문을 쓰겠습니다.' });
      css(this.cd.face, { fontSize: '72px', fontWeight: '700', lineHeight: '1.25' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      [this.jh, this.cp].forEach(b => b.render(lt));
      this.ghosts.forEach(g => { g.b.render(lt); g.draw(lt, g.at, 0.3); });
      [this.dr, this.hs].forEach(b => b.render(lt));
      this.cd.render(lt);
      this.fl.render(lt);
    },
  });

  // ── s03 도식(L16 글과 구조): 가운데 큰 흰 판 위에 답변 초안, 판 네 모서리에서 호박 기둥이 차례로 솟고 기둥마다 규칙 이름표가 붙는다 ──
  // 판: 480×480, 높이 40, 바닥 가운데 (1060, 640). 모서리 화면 점: 뒤 (1060, 400), 왼쪽 (644, 640), 오른쪽 (1476, 640), 앞 (1060, 880).
  // 기둥: 90×90, 높이 180, 판 모서리에서 45 안쪽(등각 ±195). 이름표는 기둥 바깥쪽에 지시선으로 단다
  DECK.slide({
    id: 'p1-ch06-s03', dur: 3.5,
    notes: '정하준 대리가 묻는 네 가지는 개인정보, 내부 자료, 책임, 근거이고, 답변 초안이 기관 밖으로 나가기 전에 모두 확인합니다. 이 가운데 개인정보와 비공개 자료를 넣지 않는 것, 답변의 사실 여부를 확인하는 것은 행정안전부 안내서에 나오는 주의사항입니다. 이 안내서는 행정안전부가 2023년 5월 중앙행정기관과 지방자치단체 약 300곳에 배포한 「챗GPT 활용방법 및 주의사항 안내」입니다. 책임은 민원 답변이 기관 이름으로 나간다는 사실에서 이 과정이 더한 규칙입니다. 하나씩 보겠습니다.',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [440, 320, 1280, 700], props: false, token: false });
      THEME.header(el, CH);
      this.t = THEME.title(el, '네 가지를 확인한 뒤에 보냅니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.body = text(el, 't-body', '답변 초안이 기관 밖으로 나가기 전', 120, 196);
      this.src = text(el, 't-small p1-dimtext', '개인정보·내부 자료·근거: 행정안전부 「챗GPT 활용방법 및 주의사항 안내」(2023. 5.) · 책임: 이 과정의 규칙', 120, 1000, 1700);
      this.src.dataset.fine = '1';
      const C = [1060, 640], P = isoAt(C[0], C[1]), Z = 40, K = 195;
      this.plate = THEME.block(el, { x: C[0], y: C[1], w: 480, d: 480, h: Z, at: 0.35, drop: 260 });
      const pil = (ix, iy, at) => { const [x, y] = P(ix, iy); return { b: THEME.block(el, { x, y, z: Z, w: 90, d: 90, h: 180, tone: 'amber', at, grow: true, shadow: false }), x, y, at }; };
      // 뒤(ix + iy 가 작은 것)부터 만든다
      const pB = pil(-K, -K, 1.0), pL = pil(-K, K, 1.25);
      const [qx, qy] = P(-25, -25);   // 앞 기둥에 덜 가리게 판 가운데에서 조금 뒤에 둔다
      this.dr = THEME.item(el, '답변 초안', { x: qx, y: qy, z: Z, w: 200, d: 150, at: 0.6, pin: 20 });
      const dt = this.dr.body.querySelector('.p1-tag'); if (dt) css(dt, { fontSize: '40px', padding: '8px 22px 10px' });
      const pR = pil(K, -K, 1.5), pF = pil(K, K, 1.75);
      this.pillars = [pB, pL, pR, pF];
      // 이름표: 기둥이 다 솟을 무렵(at + 0.3) 지시선이 그어진다. 기둥 모서리 화면 점 = 기둥 바닥 가운데 + iso(±45, ±45) − 높이
      const sv = svgFull(el), A = 45 * Math.cos(Math.PI / 6);
      this.tags = [
        leaderTag(el, sv, { name: '개인정보', note: '이름·연락처를 지웠습니까?', side: 'right', x: 1170, y: 258, anchor: [pB.x + A, pB.y - 190], at: pB.at + 0.3 }),
        leaderTag(el, sv, { name: '내부 자료', note: '밖에 올려도 되는 자료입니까?', br: 9, side: 'left', x: 610, y: 452, anchor: [pL.x - A, pL.y - 190], at: pL.at + 0.3 }),
        leaderTag(el, sv, { name: '책임', note: '틀리면 누가 책임집니까?', br: 6, side: 'right', x: 1510, y: 452, anchor: [pR.x + A, pR.y - 190], at: pR.at + 0.3 }),
        leaderTag(el, sv, { name: '근거', note: '조문 번호·금액을 원문과 대조했습니까?', side: 'left', x: 962, y: 866, anchor: [pF.x - A, pF.y - 62], at: pF.at + 0.3 }),
      ];
      this.srcAt = this.tags[3].end + 0.05;
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      rise(this.body, lt, 0.55);
      this.plate.render(lt);
      this.pillars.slice(0, 2).forEach(p => p.b.render(lt));
      this.dr.render(lt);
      this.pillars.slice(2).forEach(p => p.b.render(lt));
      this.tags.forEach(t => t.render(lt));
      rise(this.src, lt, this.srcAt, 20);
    },
  });

  // ── s04 퀴즈(L8 확인 목록, 키 한 번): 민원 글 네 줄을 점선 블록과 함께 놓고, 키를 누르면 줄마다 블록이 떨어지고 값이 찍힌다.
  //    지울 두 줄(작성자·연락처)은 회청 판이 놓인 뒤 항목 글 위로 지우는 줄이 그어진다 ──
  const S04_R = 2.2;
  DECK.slide({
    id: 'p1-ch06-s04', dur: 3.9, steps: [S04_R],
    notes: '정하준 대리의 첫 질문은 「이름·연락처를 지웠습니까?」입니다. 이 민원 글을 ChatGPT에 넣기 전에 지울 줄이 어느 것인지 손을 들어 답해 주세요. (키) 답은 작성자와 연락처이고, 2장에서 원문을 그대로 넣었을 때는 강사가 codex로 미리 보낸 여섯 번 모두 답변에 「김가람님」이 옮겨졌습니다. 5장에서 이름과 연락처를 지운 민원을 보낸 까닭이 이 규칙이고, 행정안전부 안내서도 민원인의 개인정보와 상황 정보 입력을 잘못된 예로 듭니다. 금액 계산에 쓰는 수강료와 진행 횟수는 남기고, 주소나 직장 이름 등 그 사람을 알아볼 수 있는 내용은 지웁니다. (강사 확인: 참가자 화면에서는 다를 수 있습니다. ChatGPT 화면에서도 이름이 옮겨지는지는 강의 전날 K-13에서 확인합니다.)',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: false, props: false });
      THEME.header(el, FIC);
      this.t = THEME.title(el, '입력하기 전에 지울 줄은?', { x: 120, y: 104, size: 72, at: 0.1 });
      // 목록 이름표: 왼쪽에 작은 민원 글 블록, 오른쪽에 34px 글
      this.cp = THEME.item(el, '민원 글', { x: 168, y: 236, w: 70, d: 52, at: 0.35, label: false, drop: 160 });
      this.cap = text(el, 'p1-side', '민원 글 · 수영 강습 환불 요청', 236, 202);
      const R = S04_R;
      this.cl = THEME.checklist(el, [
        { text: '작성자: 김가람', value: '지우고 입력', state: 'fail' },
        { text: '연락처: 010-0000-1234', value: '지우고 입력', state: 'fail' },
        { text: '수강료 60,000원', value: '계산에 필요', state: 'pass' },
        { text: '12회 가운데 4회 진행', value: '계산에 필요', state: 'pass' },
      ], { x: 120, y: 270, w: 1680, rowH: 140, box: 96, boxH: 36, textX: 220, textSize: 52, valueSize: 48, at: 0.55, revealAt: R });
      // 값은 본문 서체로. 지울 줄은 항목 글 위에 지우는 줄을 긋는다(회청 판이 놓인 뒤)
      this.strikes = [];
      this.cl.rows.forEach((r, i) => {
        if (r.value) css(r.value, { fontFamily: 'var(--body)', fontWeight: '700' });
        if (i > 1) return;
        const sp = h('span', '', r.text); sp.textContent = r.text.firstChild.textContent;
        r.text.firstChild.remove();
        css(sp, { position: 'relative', display: 'inline-block' });
        const ln = h('div', '', sp);
        css(ln, { position: 'absolute', left: '-10px', top: '54%', height: '5px', width: 'calc(100% + 20px)', background: INK, transformOrigin: '0 50%' });
        this.strikes.push({ ln, at: r.tr + 0.4 });
      });
      this.line = text(el, 't-body', '주소·직장 이름이 있으면 그것도 지웁니다', 120, 862);
      this.src = text(el, 't-small p1-dimtext', '행정안전부 안내서의 잘못된 입력 예: 민원 답변서 초안을 쓰려고 민원인 개인정보 입력', 120, 980, 1680);
      this.src.dataset.fine = '1';
      this.lineAt = R + 0.75;
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      this.cp.render(lt);
      rise(this.cap, lt, 0.4, 16);
      this.cl.render(lt);
      this.strikes.forEach(k => {
        const p = prog(lt, k.at, 0.3, ease.inOutCubic);
        k.ln.style.transform = `scaleX(${p.toFixed(3)})`;
        k.ln.style.opacity = lt < k.at ? '0' : '1';
      });
      rise(this.line, lt, this.lineAt);
      rise(this.src, lt, this.lineAt + 0.15, 20);
    },
  });

  // ── s05 개념(L10 사례 장면): 왼쪽 제목과 본문, 오른쪽에 공개 자료(규정집)·비공개 판 더미·기관 지침·ChatGPT.
  //    공개 토큰은 기관 지침 앞에서 0.3초 멈춘 뒤 ChatGPT 앞까지 가고, 비공개 토큰은 기관 지침 앞에서 멈춘 채 남는다 ──
  // 등각 배치(기관 지침 G 기준): 규정집 (-340, 0), 비공개 더미 (0, -340), ChatGPT (340, 0).
  // 공개 토큰은 iy = 110 줄(블록 왼면 앞)을, 비공개 토큰은 ix = 110 줄(블록 오른면 앞)을 따라간다
  DECK.slide({
    id: 'p1-ch06-s05', dur: 3.9,
    notes: '정하준 대리의 두 번째 질문은 「밖에 올려도 되는 자료입니까?」입니다. 행정안전부 안내서는 결정이 끝나지 않은 정보, 공표되지 않은 정보, 외부 반출이 허용되지 않은 정보를 입력하지 말라고 합니다. 중앙행정기관과 지방자치단체에 배포된 문서이므로, 공기업에서 올릴 수 있는 범위는 소속 기관의 지침으로 확인합니다. 2장에서 「모델 개선을 위한 데이터 학습 허용」을 끈 것도 같은 까닭으로, 끄면 대화가 ChatGPT 모델을 개선하는 학습에 쓰이지 않습니다. 다만 끈 뒤 시작한 새 대화부터 적용되고 피드백을 보낸 대화는 학습에 쓰일 수 있으며, 껐다고 비공개 자료를 올려도 되는 것은 아닙니다. (화면에서 옮긴 문구: 「설정 → 데이터 관리」 「2026년 11월 기준」)',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [800, 200, 1080, 780], props: false, token: false });
      THEME.header(el, FIC);
      // 왼쪽 글 묶음(제목 88px 두 줄 + 본문 44px 두 줄)을 세로 가운데 y 320~740 에 둔다
      this.t = THEME.title(el, '올려도 되는 자료는\n기관이 정합니다', { x: 120, y: 320, size: 88, w: 780, at: 0.1 });
      this.lines = THEME.lines(el, ['비공개: 결정 전·공표 전·반출 금지 자료', '범위는 소속 기관의 지침으로 확인'], { x: 120, y: 584, w: 780, gap: 18 });
      this.lines.forEach(e => css(e, { fontSize: '44px' }));
      this.src = text(el, 't-small p1-dimtext', '근거 문서: 행정안전부 「챗GPT 활용방법 및 주의사항 안내」(2023. 5.)', 120, 980, 1200);
      this.src.dataset.fine = '1';
      const G = [1340, 660], P = isoAt(G[0], G[1]), L = 340;
      const things = h('div', 'full', el);   // 사물 층을 먼저 깔고 토큰을 그 위에 둔다
      this.fa = THEME.flow(el, [[-244, 110], [0, 110], [235, 110]], { x: G[0], y: G[1], at: 1.55, speed: 420, hold: { 1: 0.3 } });
      this.fb = THEME.flow(el, [[110, -240], [110, -15]], { x: G[0], y: G[1], at: 1.75, speed: 420, tone: 'slate' });
      // 뒤(ix + iy 가 작은 것)부터 만든다
      let p = P(-L, 0);
      this.rules = bigTag(THEME.cutout(things, 'p1-key-rules', { src: '../assets/img/p1/p1-key-rules_cut.png', x: p[0], y: p[1], size: 300, at: 0.3,
        label: '공개 자료', note: '체육시설 이용 규정' }));
      p = P(0, -L);
      this.sec = bigTag(THEME.block(things, { x: p[0], y: p[1], w: 210, d: 170, h: 86, tone: 'slate', layers: 3, at: 0.5,
        label: '비공개 자료', note: '결정 전 · 공표 전 · 반출 금지' }));
      { // 이름표가 화면 오른쪽 끝을 넘지 않게 왼쪽으로 옮긴다(핀은 블록 가운데에 남는다)
        const tg = this.sec.body.querySelector('.p1-tag'); tg.style.left = '-40px';
        // 비공개 판 더미 윗면의 자물쇠 기호(핀과 겹치지 않게 윗면 왼쪽 앞에 둔다)
        const [lx, ly] = iso(-48, 40, 86);
        const v = s('svg', { width: 1, height: 1 }, this.sec.body);
        css(v, { position: 'absolute', left: '0px', top: '0px', overflow: 'visible' });
        const gg = s('g', { transform: `translate(${lx.toFixed(1)} ${ly.toFixed(1)}) scale(1.7)` }, v);
        const st = { stroke: INK, 'stroke-width': 2.4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', 'vector-effect': 'non-scaling-stroke' };
        s('path', Object.assign({ d: 'M -8 -18 V -24 A 8 8 0 0 1 8 -24 V -18', fill: 'none' }, st), gg);
        s('path', Object.assign({ d: 'M -12 -18 H 12 V -2 H -12 Z', fill: '#FFFFFF' }, st), gg);
        s('circle', { cx: 0, cy: -10, r: 2.6, fill: INK }, gg);
      }
      this.gd = bigTag(THEME.block(things, { x: G[0], y: G[1], w: 160, d: 130, h: 64, tone: 'amber', at: 0.7, label: '기관 지침' }));
      p = P(L, 0);
      this.gpt = bigTag(THEME.block(things, { x: p[0], y: p[1], w: 160, d: 130, h: 64, tone: 'cobalt', at: 0.9, label: 'ChatGPT', labelPos: 'below' }));   // 이름표를 아래에 달아 기관 지침 앞의 비공개 토큰과 떨어뜨린다
      this.srcAt = Math.max(this.fa.end, this.fb.end) + 0.05;
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      this.lines.forEach((l, i) => rise(l, lt, 0.65 + i * 0.15));
      [this.rules, this.sec, this.gd, this.gpt].forEach(b => b.render(lt));
      this.fa.render(lt); this.fb.render(lt);
      rise(this.src, lt, this.srcAt, 20);
    },
  });

  // ── s06 도식(L4 가로 순서): ChatGPT → 한서윤 주임 → 오민석 팀장 → 민원인. 사람이 맡는 둘째·셋째 블록은 호박.
  //    서류 토큰이 블록 앞을 지나며 한서윤 주임·오민석 팀장 앞에서 0.4초씩 멈추고, 오민석 팀장 블록 위에 호박 도장 블록이 내려앉는다 ──
  DECK.slide({
    id: 'p1-ch06-s06', dur: 4.3,
    notes: '세 번째 질문은 「틀리면 누가 책임집니까?」입니다. 민원인이 받는 답변에는 새별시설공단 고객지원팀이라는 이름이 찍히고, 초안을 쓴 도구의 이름은 없습니다. 그래서 초안을 ChatGPT가 썼더라도 결과는 답변을 보낸 담당자와 기관이 책임집니다. 5장 요청문의 세 번째 묶음에 발송 전 팀장 확인을 승인 조건으로 적은 이유가 이것입니다. 이 규칙은 행정안전부 안내서의 문장이 아니라, 민원 답변이 기관 이름으로 나간다는 사실에서 이 과정이 정한 규칙입니다.',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [160, 380, 1640, 640], props: false, token: false });
      THEME.header(el, FIC);
      this.t = THEME.title(el, '보낸 답변은 담당자와 기관이 책임집니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.lines = THEME.lines(el, ['답변은 새별시설공단 이름으로 발송', '초안을 쓴 도구 이름은 답변에 없음'], { x: 120, y: 196, w: 1200, gap: 0 });
      const X0 = 330, X1 = 1590, Y = 640, SZ = 190, at0 = 0.35;
      this.sq = THEME.sequence(el, [
        { label: 'ChatGPT', note: '답변 초안', tone: 'cobalt' },
        { label: '한서윤 주임', note: '고쳐 쓰기', tone: 'amber' },
        { label: '오민석 팀장 · 고객지원팀', note: '발송 승인', tone: 'amber' },
        { label: '민원인' },
      ], { x0: X0, x1: X1, y: Y, size: SZ, at: at0, token: false });
      // 서류 토큰: THEME.sequence 의 길(블록 앞 바닥을 등각 축으로 지그재그)과 같은 점을 쓰고, 사람 블록 앞에서 0.4초씩 멈춘다
      const a = (X1 - X0) / 3 / (2 * Math.cos(Math.PI / 6)), off = SZ / 2 + 50, path = [];
      for (let k = 0; k < 4; k++) { const c = k * a; path.push([c + off, -c + off]); if (k < 3) path.push([c + a + off, -c + off]); }
      this.fl = THEME.flow(el, path, { x: X0, y: Y, at: 0.95, speed: 1400, hold: { 2: 0.4, 4: 0.4 } });
      // 도장 블록: 토큰이 오민석 팀장 앞에 닿을 때 셋째 블록 윗면 앞쪽에 내려앉는다(받침 + 손잡이)
      const stampAt = this.fl.times[4] - 0.05, [sx, sy] = iso(34, 34);
      const bx = X0 + 2 * (X1 - X0) / 3 + sx, by = Y + sy;
      this.st1 = THEME.block(el, { x: bx, y: by, z: 70, w: 74, d: 74, h: 22, tone: 'amber', at: stampAt, drop: 240, shadow: false });
      this.st2 = THEME.block(el, { x: bx, y: by, z: 92, w: 30, d: 30, h: 40, tone: 'amber', at: stampAt + 0.04, drop: 240, shadow: false });
      this.cd = THEME.card(el, { x: 1180, y: 930, w: 680, at: this.fl.end + 0.05, enter: 'drop', html: '보낸 곳: 새별시설공단 고객지원팀' });
      css(this.cd.face, { fontSize: '40px', fontWeight: '600', padding: '24px 32px' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      this.lines.forEach((l, i) => rise(l, lt, 0.5 + i * 0.15));
      this.sq.render(lt);
      this.st1.render(lt); this.st2.render(lt);
      this.fl.render(lt);
      this.cd.render(lt);
    },
  });

  // ── s07 개념(L3 좌우 대비): 왼쪽 칸 「답변 초안」의 계산·근거 카드, 오른쪽 칸 「규정집」의 조문 카드.
  //    오른쪽 칸은 키 없이 왼쪽 칸 뒤에 열리고, 서류 토큰이 두 카드 사이를 한 번 오간 뒤 호박 블록과 「조문 있음 · 계산 같음」이 찍힌다 ──
  DECK.slide({
    id: 'p1-ch06-s07', dur: 4.1,
    notes: '네 번째 질문은 「조문 번호·금액을 원문과 대조했습니까?」입니다. 5장 답변에 나온 제7조 제1항 제2호와 34,000원은 사람이 규정 파일을 열어 조문과 계산식을 대조합니다. 행정안전부 안내서도 챗GPT가 청문 조항을 입법예고 조항인 행정절차법 제41조로 답한 예를 들며, 사실 여부를 확인한 뒤 쓰라고 합니다. 5장의 요청 C(대관 취소 수수료)에서 금액이 나온 분은 손을 들어 주시고, 요청 C를 보내지 못한 분은 옆자리 화면을 봐 주세요. 그 금액은 규정 파일에 없는 숫자라서 보낼 수 없는 답입니다. (화면에서 옮긴 문구: 「한서윤 주임」)',
    setup(el) {
      THEME.header(el, FIC);
      this.t = THEME.title(el, '조문 번호와 금액은 원문과 대조합니다', { x: 120, y: 104, size: 64, at: 0.1 });
      const RA = 1.1, X = 1000;
      // 세로 판을 x 1000 으로 옮겨 왼쪽 칸(x 120~1000)을 넓힌다. 오른쪽 칸은 x 1000~1880
      const sp = this.sp = THEME.split(el, { x: X, left: { label: '답변 초안' }, right: { label: '규정집', tone: 'slate' }, at: 0.2, rightAt: RA });
      const mono = 'font-family:var(--mono);font-weight:500;font-size:52px;line-height:1.55';
      const nw = (t) => `<span style="white-space:nowrap">${t}</span>`;
      this.c1 = THEME.card(sp.left, { x: 140, y: 336, w: 820, at: 0.45, enter: 'drop', drop: 120, pad: '36px 40px', html:
        `<div style="${mono}">${nw('[계산] 60,000원 × 8 ÷ 12')} ${nw('− 6,000원 = 34,000원')}</div>` +
        `<div style="${mono};margin-top:26px">${nw('[근거] 체육시설 이용 규정')} ${nw('제7조 제1항 제2호')}</div>` });
      // 질문 두 줄은 카드 바로 아래에 붙인다
      const qy = 336 + this.c1.face.offsetHeight + 34;
      this.q = THEME.lines(sp.left, ['규정 파일에 그 조문이 있습니까?', '계산식이 조문의 기준과 같습니까?'], { x: 140, y: qy, w: 840, gap: 0, cls: 'p1-half-line' });
      this.q.forEach(e => css(e, { fontSize: '52px', lineHeight: '70px', whiteSpace: 'normal' }));
      // 오른쪽 칸: 조문 카드를 먼저 만들고 규정집 누끼를 카드 위 모서리에 세운다. 카드 아래에 호박 블록과 확인 글, 맨 아래에 요청 C 카드.
      // 글은 왼쪽 칸과 같은 비율(36px → 44~58px)로 키웠다
      this.c2 = THEME.card(sp.right, { x: 1060, y: 420, w: 780, at: RA + 0.35, enter: 'drop', pad: '30px 34px', html:
        '<div style="font-size:44px;line-height:1.4;word-break:keep-all">제7조 제1항 제2호: 남은 강습 횟수에 해당하는 금액에서 수강료의 10퍼센트를 위약금으로 뺀 금액</div>' });
      this.rb = bigTag(THEME.cutout(sp.right, 'p1-key-rules', { src: '../assets/img/p1/p1-key-rules_cut.png', x: 1300, y: 380, size: 170, at: RA + 0.5,
        label: '체육시설 이용 규정', labelPos: 'right', drop: 200 }));
      // 서류 토큰: 왼쪽 카드 오른쪽 아래에서 세로 판을 건너 확인 블록 자리까지 갔다가 돌아온다(모서리마다 0.1초 멈춤)
      this.fl = THEME.flow(el, [[0, 0], [104, 0], [104, -104], [104, 0], [0, 0]], { x: 912, y: qy + 30, at: RA + 0.75, speed: 750 });
      this.ok = THEME.block(sp.right, { x: 1125, y: 778, w: 90, d: 90, h: 46, tone: 'amber', at: this.fl.end + 0.02, drop: 220 });
      this.okT = text(sp.right, 'p1-half-line', '조문 있음 · 계산 같음', 1215, 698);
      css(this.okT, { fontSize: '58px', fontWeight: '700', transformOrigin: '0% 50%' });
      this.okAt = this.fl.end + 0.3;
      this.c3 = THEME.card(sp.right, { x: 1060, y: 800, w: 780, at: this.okAt + 0.05, enter: 'slide', pad: '20px 34px', html:
        '<div style="font-size:44px;line-height:1.4;word-break:keep-all">5장 요청 C: 대관 취소 수수료 금액이 나왔습니까?</div>' });
    },
    render(lt) {
      this.t.render(lt);
      this.sp.render(lt);
      this.c1.render(lt);
      this.q.forEach((e, i) => rise(e, lt, 0.85 + i * 0.12));
      this.rb.render(lt);
      this.c2.render(lt);
      this.fl.render(lt);
      this.ok.render(lt);
      const p = prog(lt, this.okAt, 0.16, ease.outQuad);   // 확인 글은 1.12배에서 1배로 한 번에 찍힌다
      this.okT.style.opacity = lt < this.okAt ? '0' : '1';
      this.okT.style.transform = `scale(${lerp(1.12, 1, p).toFixed(3)})`;
      this.c3.render(lt);
    },
  });

  // ── s08 정리(L11 카드 격자): 규칙 카드 넷이 떨어져 내려앉고, 카드 맨 위 왼쪽의 작은 호박 기둥이 솟는다. 이어 본문 두 줄과 다음 질문 카드 ──
  DECK.slide({
    id: 'p1-ch06-s08', dur: 3.2,
    notes: '정하준 대리의 네 가지는 소속 기관에 돌아가 실제 민원을 다룰 때 지키는 것이고, 세부 기준은 기관 지침으로 확인합니다. 오늘 실습에서는 README.md의 실습 규칙 1번 「가상 자료만 입력」이 개인정보와 내부 자료에, 3번 「원문 대조」가 근거에 해당합니다. 그런데 한서윤 주임은 요청할 때마다 요청문과 규정 파일을 넣고 네 가지를 매번 확인해야 합니다. 세 항목과 네 가지 규칙을 요청할 때마다 이렇게 다시 챙겨야 할까요? 7장에서 한 번 정해 두면 계속 적용되는 방법을 봅니다. (화면에서 옮긴 문구: 「답변 초안」)',
    setup(el) {
      this.bg = THEME.bg(el, 'accent', { floor: false, bx: 1880, by: 1180 });
      THEME.header(el, CH);
      this.t = THEME.title(el, '업무에서 지키는 네 가지입니다', { x: 120, y: 104, size: 72, at: 0.1 });
      const defs = [['개인정보', '이름·연락처·주소는 지우고 입력'], ['내부 자료', '기관 지침이 허용한 자료만'], ['책임', '보낸 담당자와 기관'], ['근거', '조문 번호·금액은 원문과 대조']];
      // 카드 넷: 폭 396, 간격 32(x 120~1800), y 236~800. 카드 맨 위 왼쪽에 호박 기둥 120×120, 높이 180
      const CW = 396, CG = 32, CY = 236, CH_ = 564, PW = 120, PH = 180, PAD = 30;
      const C30 = Math.cos(Math.PI / 6);
      this.tiles = defs.map(([tt, tx], k) => {
        const at = 0.35 + k * 0.15;
        // THEME.tile 과 같은 모양의 카드. 떨어지는 높이를 60 으로 낮춰 조립 중인 제목을 가리지 않게 한다
        const c = THEME.card(el, { x: 120 + k * (CW + CG), y: CY, w: CW, h: CH_, at, enter: 'drop', drop: 60, depth: 18, pad: `${PAD}px 28px`,
          html: `<div class="p1-tile-t">${tt}</div><div class="p1-tile-x">${tx}</div>` });
        c.face.classList.add('p1-tile');
        css(c.face.querySelector('.p1-tile-t'), { fontSize: '58px', lineHeight: '1.2', marginBottom: '12px' });
        css(c.face.querySelector('.p1-tile-x'), { fontSize: '40px', lineHeight: '1.42', color: 'var(--ink)' });
        // 번호 자리에 호박 기둥을 세운다(카드와 함께 떨어지고, 카드가 내려앉은 뒤 솟는다). 기둥 둘레 높이 = 높이 + 바닥면 세로 폭
        const gap = h('div', '', c.face); c.face.insertBefore(gap, c.face.firstChild);
        css(gap, { height: (PH + PW + 8) + 'px' });
        const b = THEME.block(c.el, { x: 28 + PW * C30 + 4, y: PAD + PW / 2 + PH, w: PW, d: PW, h: PH, tone: 'amber', at: c.land + 0.1, grow: true });
        return { c, b };
      });
      // 아래 띠(y 820~1020): 왼쪽에 본문 두 줄, 오른쪽에 다음 질문 카드(「규칙을」 뒤에서 두 줄로 접는다)
      this.lines = THEME.lines(el, ['세부 기준은 소속 기관 지침을 확인', '실습 규칙 1은 개인정보·내부 자료, 3은 근거'], { x: 120, y: 832, w: 760, gap: 0 });
      this.cd = THEME.card(el, { x: 870, y: 822, w: 650, at: 1.75, enter: 'slide', cap: '다음 질문', pad: '20px 28px',
        html: '세 항목과 네 가지 규칙을<br>요청할 때마다 다시 적어야 하는가' });
      css(this.cd.face, { fontSize: '42px', fontWeight: '600', lineHeight: '1.3' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      this.tiles.forEach(q => { q.c.render(lt); q.b.render(lt); });
      this.lines.forEach((l, i) => rise(l, lt, 1.3 + i * 0.15));
      this.cd.render(lt);
    },
  });
})();
