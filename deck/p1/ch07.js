/* 파트 1 · 7장 「한 번 정해 두고 계속 쓰는 환경」 장면 코드. 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다.
 * 원고: plan/slides/p1-ch07.json. 레이아웃 배정: plan/assets/p1_layout_ch07.md. 테마 부품: themes/p1.js. 본보기: p1/ch00.js, p1/ch03.js
 * 장마다 레이아웃이 다르다: 영상 제목 → 사례 장면 → 세로 층 → 가로 순서(판) → 기둥 비교 → 확인 목록 → 퀴즈 → 좌우 대비 → 표.
 * 키 누름은 s05(「약 37%」를 연다)와 s07(정답 기둥을 세운다)에 한 번씩만 둔다. 나머지 장은 키 없이 3~4초 안에 끝 상태가 된다. */
(function () {
  'use strict';
  const { ease, prog, clamp, lerp, css, h, s } = REEL;
  DECK.config({ part: 'p1', chapter: 'ch07', title: '한 번 정해 두고 계속 쓰는 환경' });

  const CH = { chapter: 7, title: '한 번 정해 두고 계속 쓰는 환경' };
  const FIC = Object.assign({ fiction: true }, CH);
  const C30 = Math.cos(Math.PI / 6), S30 = 0.5;
  const EDGE = 'rgba(19,32,44,.35)', INK = '#13202C';
  const iso = THEME.iso, rise = THEME.rise, text = THEME.text;
  // 기준점 P 에서 등각 좌표 (ix, iy, iz) 만큼 옮긴 화면 점
  const at2 = (P, ix, iy, iz = 0) => { const [dx, dy] = iso(ix, iy, iz); return [P[0] + dx, P[1] + dy]; };
  const zbox = (parent) => { const d = h('div', '', parent); css(d, { position: 'absolute', left: '0px', top: '0px', width: '0px', height: '0px' }); return d; };
  const svgFull = (parent) => { const v = s('svg', { width: 1, height: 1 }, parent); css(v, { position: 'absolute', left: '0px', top: '0px', overflow: 'visible', pointerEvents: 'none' }); return v; };
  const tagOf = (b) => b.body.querySelector('.p1-tag');

  // 옆 이름표: 앵커 점(ax, ay)에서 가는 지시선이 뻗고 이름표가 붙는다. side 'left' 면 이름표 오른쪽 끝이 lx, 'right' 면 왼쪽 끝이 lx
  function callout(parent, o) {
    const root = zbox(parent);
    const sv = svgFull(root);
    const line = s('line', { stroke: EDGE, 'stroke-width': 1.5, 'stroke-linecap': 'round' }, sv);
    const dot = s('circle', { r: 5, fill: INK }, sv);
    const tag = h('div', o.cls || 'p1-tag', root, o.html ?? null);
    if (o.html == null) tag.textContent = o.text;
    const left = (o.side || 'left') === 'left';
    css(tag, { left: o.lx + 'px', top: o.ly + 'px' });
    if (o.style) css(tag, o.style);
    const gap = o.gap ?? 12;
    return {
      el: tag, end: o.at + 0.35,
      render(lt) {
        const p = prog(lt, o.at, 0.35, ease.snap);
        const ex = o.lx + (left ? gap : -gap);
        line.setAttribute('x1', o.ax.toFixed(1)); line.setAttribute('y1', o.ay.toFixed(1));
        line.setAttribute('x2', lerp(o.ax, ex, p).toFixed(1)); line.setAttribute('y2', lerp(o.ay, o.ly, p).toFixed(1));
        dot.setAttribute('cx', o.ax.toFixed(1)); dot.setAttribute('cy', o.ay.toFixed(1));
        line.style.opacity = dot.style.opacity = p > 0 ? '1' : '0';
        tag.style.opacity = p.toFixed(3);
        tag.style.transform = `translate(${left ? '-100%' : '0px'}, -50%) translateX(${((1 - p) * (left ? 22 : -22)).toFixed(1)}px)`;
      },
    };
  }
  // 핀 이름표: (x, yb) 가 이름표 아래 가운데. 핀은 yb 에서 pin 만큼 아래로 내려간다. at 에 떨어져 내려앉는다
  function pinTag(parent, label, x, yb, pin, at, size) {
    const root = zbox(parent);
    const pn = h('div', 'p1-pin', root);
    css(pn, { left: x + 'px', top: yb + 'px', height: pin + 'px', transformOrigin: '0 0' });
    const tg = h('div', 'p1-tag', root);
    tg.textContent = label;
    css(tg, { left: x + 'px', top: yb + 'px', fontSize: size + 'px', transformOrigin: '50% 100%' });
    return {
      el: tg, end: at + 0.55,
      render(lt) {
        THEME.dropEl(tg, lt, at, 90);
        tg.style.transform = 'translate(-50%, -100%) ' + tg.style.transform;
        const p = prog(lt, at + 0.25, 0.3, ease.snap);
        pn.style.transform = `scaleY(${p.toFixed(3)})`;
        pn.style.opacity = p > 0 ? '1' : '0';
      },
    };
  }

  // ── s01 챕터 전환(L0 영상 제목): 6장 첫 화면이 정방향으로 쓴 p1-tr-pillars 를 좌우로 뒤집어 깐다 ──
  DECK.slide({
    id: 'p1-ch07-s01', dur: 3,
    notes: "6장에서 정하준 대리의 질문으로 업무에서 지키는 네 가지, 곧 개인정보, 내부 자료, 책임, 근거가 더해졌습니다. 이제 한서윤 주임이 요청할 때 챙길 것은 세 항목 요청문, 규정 파일, 업무에서 지키는 네 가지입니다. 이것을 민원이 들어올 때마다 다시 적어야 하는지, 7장에서 답을 찾습니다.",
    setup(el) {
      // 발표 때 한 번 재생하고 호박색 기둥 네 개가 다 솟은 마지막 장면에서 멈춘다(loop 기본값 false)
      this.vt = THEME.videoTitle(el, {
        kind: 'chapter', kicker: '파트 1 · 7장', scene: 'pillars', flip: true,
        src: '../assets/video/p1/p1-tr-pillars.mp4', poster: '../assets/video/p1/p1-tr-pillars.jpg',
        title: '한 번 정해 두고 계속 쓰는 환경',
        sub: '세 항목과 네 가지 규칙을 요청할 때마다 다시 적어야 하는가',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // ── s02 이야기(L10 사례 장면): 새 대화 칸 셋에 같은 더미를 세 번 쌓는다. 셋째 칸은 규정집 자리가 점선으로 비어 있다 ──
  // 칸은 등각 축(-iy, 오른쪽 위)을 따라 놓는다. 칸 1 이 앞(왼쪽 아래), 칸 3 이 뒤(오른쪽 위)다. 뒤 칸부터 만든다.
  // 칸마다 아래부터 흰 납작 블록(칸) · 민원 글 · 세 층 요청문 판 · 규정집 누끼. 사물 이름표는 칸 1 왼쪽에만 단다
  const S02 = { S0: [960, 780], STEP: 300, PAD: { w: 280, d: 230, h: 24 }, IT: { w: 220, d: 170 }, PL: { w: 220, d: 175, h: 26 }, RS: 220 };
  S02.RZ = S02.PAD.h + 14 + S02.PL.h * 3;
  // 누끼 그림은 z 만큼 들어 올린다(THEME.cutout 은 그림 자리를 바닥 기준으로만 잡는다)
  const liftCut = (b, z) => { const im = b.body.querySelector('img'); if (im) im.style.top = (parseFloat(im.style.top) - z).toFixed(1) + 'px'; return b; };
  DECK.slide({
    id: 'p1-ch07-s02', dur: 3.7,
    notes: "한서윤 주임은 5장에서 완성한 세 항목 요청문을 저장해 두었습니다. 민원이 들어올 때마다 새 대화를 열고 요청문, 규정 파일, 민원 글을 차례로 다시 넣습니다. 바쁜 날 규정 파일 첨부를 한 번 빠뜨리면 그 대화의 답변에는 공단 규정의 조문이 나오지 않습니다. 2장의 한 줄 요청에서도 규정 파일이 없어서 근거는 일반 법령·기준이었고, 공단 규정의 조문 번호는 한 번도 나오지 않았습니다. 그러면 모델이 한 번 답할 때 보는 것은 정확히 어디까지일까요.",
    setup(el) {
      const { S0, STEP, PAD, IT, PL, RZ, RS } = S02;
      this.bg = THEME.bg(el, 'base', { floor: [700, 160, 1180, 880], props: false, token: false });
      THEME.header(el, FIC);
      this.ttl = THEME.title(el, '새 대화마다\n처음부터 다시 붙입니다', { x: 120, y: 190, size: 72, at: 0.1 });
      this.body = THEME.lines(el, ['세 항목 요청문, 규정 파일, 민원 글', '하나를 빠뜨리면 답에서도 빠집니다'], { x: 120, y: 400, w: 600, gap: 6 });
      const slots = [0, 1, 2].map(k => at2(S0, 0, -STEP * k));
      this.parts = [];
      this.ghosts = [];
      const P = (b) => { this.parts.push(b); return b; };
      this.seqAt = (k) => 0.45 + 0.7 * k;
      [2, 1, 0].forEach(k => {
        const [x, y] = slots[k], t = this.seqAt(k);
        P(THEME.block(el, { x, y, w: PAD.w, d: PAD.d, h: PAD.h, at: 0.15 + 0.05 * (2 - k), drop: 220 }));
        P(THEME.item(el, '민원 글', { x, y, z: PAD.h, w: IT.w, d: IT.d, at: t, drop: 260, label: false }));
        [0, 1, 2].forEach(j => P(THEME.block(el, { x, y, z: PAD.h + 14 + PL.h * j, w: PL.w, d: PL.d, h: PL.h, at: t + 0.2 + 0.12 * j, drop: 240,
          shadow: j === 0, shadowH: PL.h * 3 })));
        if (k < 2) {
          P(liftCut(THEME.cutout(el, 'p1-key-rules', { src: '../assets/img/p1/p1-key-rules_cut.png', x, y, z: RZ, size: RS, at: t + 0.62, drop: 260 }), RZ));
        } else {   // 셋째 칸: 규정집이 떨어지지 않고 그 자리에 점선 윤곽만 그어진다
          const g = THEME.cutout(el, 'p1-key-rules', { x, y, z: RZ, size: RS, tone: 'ghost', at: t + 0.62, drop: 0, shadow: false });
          this.ghosts.push({ b: g, draw: THEME.ghostDraw(g), at: t + 0.62 });
        }
      });
      // 칸 이름표 「새 대화 N」(40px): 더미 꼭대기 위에 핀으로 단다
      this.heads = slots.map(([x, y], k) => pinTag(el, `새 대화 ${k + 1}`, x, y - RZ - 128, 24, this.seqAt(k) + 0.3, 40));
      // 첫째 칸 더미에만 사물 이름표(36px)를 왼쪽에 단다
      const [x0, y0] = slots[0];
      const LX = 770, st = { fontSize: '36px' };
      this.cMin = callout(el, { text: '민원 글', ax: x0 - 150, ay: y0 - PAD.h - 4, lx: LX, ly: 770, at: this.seqAt(0) + 0.4, style: st });
      this.cReq = callout(el, { text: '세 항목 요청문', ax: x0 - 150, ay: y0 - PAD.h - 14 - 40, lx: LX, ly: 690, at: this.seqAt(0) + 0.65, style: st });
      this.cRul = callout(el, { text: '체육시설 이용 규정', ax: x0 - 80, ay: y0 - RZ - 70, lx: LX, ly: 600, at: this.seqAt(0) + 1.05, style: st });
      this.hs = THEME.figure(el, '한서윤', { x: 360, y: 870, scale: 2.2, big: true, first: true, at: 0.3 });
      this.cd = THEME.card(el, { x: 1160, y: 820, w: 640, at: this.seqAt(2) + 0.85, enter: 'slide', cap: '한서윤 주임', html: '민원이 올 때마다<br>요청문부터 다시 붙여요.' });
      css(this.cd.face, { fontSize: '44px', fontWeight: '600', lineHeight: '1.35' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.ttl.render(lt);
      this.body.forEach((b, i) => rise(b, lt, 0.6 + i * 0.12));
      this.parts.forEach(b => b.render(lt));
      this.ghosts.forEach(g => { g.b.render(lt); g.draw(lt, g.at, 0.4); });
      this.heads.forEach(t => t.render(lt));
      this.cMin.render(lt); this.cReq.render(lt); this.cRul.render(lt);
      this.hs.render(lt);
      this.cd.render(lt);
    },
  });

  // ── s03 개념(L5 세로 층): 프롬프트 ⊂ 컨텍스트 ⊂ 하네스. 판의 넓이가 범위다. 하네스 층은 끝까지 점선 빈 층으로 남는다 ──
  // 층 묶음 바닥 가운데 (640, 590), 맨 아래층 폭 560, 위로 140씩 좁아짐, 층 높이 64. 맨 아래 점선 층의 앞 모서리가 y 870 이라
  // 화면 아래 본문 두 줄(y 920~1036)과 겹치지 않는다. 이름표는 x 1140 부터 세 줄(용어 44px, 뜻 34px, 한서윤 주임 34px)
  const S03 = { x: 640, y: 590, w: 560, shrink: 140, h: 64, lx: 1140, ly: [775, 560, 345] };
  DECK.slide({
    id: 'p1-ch07-s03', dur: 2.9,
    notes: "세 가지 말을 좁은 범위부터 하나씩 보겠습니다. 프롬프트는 이번에 보내는 지시로, 한서윤 주임에게는 세 항목 요청문입니다. 컨텍스트는 ChatGPT가 한 번 답할 때 함께 들어가는 것 전부로, 요청문, 규정 파일, 민원 글, 같은 대화의 앞선 내용까지 들어갑니다. 하네스는 이 둘을 포함하는 가장 넓은 범위이고, 7장에서는 3장에서 본 내용 가운데 지침과 파일을 정해 두는 곳과 검사 단계만 다룹니다. 지금 한서윤 주임은 프롬프트와 컨텍스트 범위를 대화마다 직접 채우고 있고, 하네스 범위는 비어 있습니다.",
    setup(el) {
      const G = S03;
      this.bg = THEME.bg(el, 'base', { floor: [100, 250, 1160, 700], props: false, token: false });
      THEME.header(el, CH);
      this.ttl = THEME.title(el, '요청문은 가장 좁은 범위입니다', { x: 120, y: 104, size: 64, at: 0.1 });
      // 하네스(점선, 0.35초에 그어짐) → 컨텍스트 → 프롬프트(0.3초 간격으로 떨어짐)
      this.st = THEME.stack(el, [{ tone: 'ghost', h: G.h }, { h: G.h }, { h: G.h }],
        { x: G.x, y: G.y, w: G.w, shrink: G.shrink, times: [0.7, 1.1, 1.4] });
      const L = [
        { term: '하네스', mean: '지침과 파일을 한 번 정해 두는 곳', who: '한서윤 주임 · 아직 비어 있음', dim: true },
        { term: '컨텍스트', mean: '한 번 답할 때 함께 들어가는 것 전부', who: '한서윤 주임 · 요청문 + 규정 파일 + 민원 글 + 앞 대화' },
        { term: '프롬프트', mean: '이번에 보내는 지시', who: '한서윤 주임 · 세 항목 요청문' },
      ];
      const sv = svgFull(el);
      this.labels = L.map((q, i) => {
        const b = this.st.blocks[i];
        const box = h('div', 'p1-side', el);
        css(box, { left: G.lx + 'px', top: G.ly[i] + 'px', transform: 'translateY(-50%)' });
        const r1 = h('div', '', box); r1.textContent = q.term;
        css(r1, { fontSize: '44px', fontWeight: '700', lineHeight: '1.2' });
        const r2 = h('small', '', box); r2.textContent = q.mean;
        css(r2, { fontSize: '34px', marginTop: '4px' });
        const r3 = h('small', '', box); r3.textContent = q.who;
        css(r3, { fontSize: '34px', color: q.dim ? 'var(--dim)' : 'var(--accent)', fontWeight: q.dim ? '400' : '600' });
        const line = s('line', { stroke: EDGE, 'stroke-width': 1.5, 'stroke-linecap': 'round' }, sv);
        const dot = s('circle', { r: 5, fill: INK }, sv);
        return { box, rows: [r1, r2, r3], line, dot, at: b.land + 0.05, ax: b.anchor[0], ay: b.anchor[1], ly: G.ly[i] };
      });
      this.body = [
        text(el, 't-body', '프롬프트·컨텍스트 범위는 대화마다 넣고', 120, 920),
        text(el, 't-body', '하네스 범위는 한 번 정해 두면 남습니다', 120, 975),
      ];
      this.bodyAt = 1.85;
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.ttl.render(lt);
      this.st.render(lt);
      this.labels.forEach(lb => {
        const p = prog(lt, lb.at, 0.35, ease.snap);
        lb.rows.forEach((r, j) => {   // 위 줄부터 0.1초 간격으로 붙는다
          const q = prog(lt, lb.at + 0.1 * j, 0.35, ease.snap);
          r.style.opacity = q.toFixed(3);
          r.style.transform = `translateX(${((1 - q) * -22).toFixed(1)}px)`;
          r.style.display = 'block';
        });
        lb.line.setAttribute('x1', lb.ax.toFixed(1)); lb.line.setAttribute('y1', lb.ay.toFixed(1));
        lb.line.setAttribute('x2', lerp(lb.ax, S03.lx - 16, p).toFixed(1)); lb.line.setAttribute('y2', lerp(lb.ay, lb.ly, p).toFixed(1));
        lb.dot.setAttribute('cx', lb.ax.toFixed(1)); lb.dot.setAttribute('cy', lb.ay.toFixed(1));
        lb.line.style.opacity = lb.dot.style.opacity = p > 0 ? '1' : '0';
      });
      this.body.forEach((b, i) => rise(b, lt, this.bodyAt + i * 0.12));
    },
  });

  // ── s04 개념(L4 가로 순서, 판을 까는 경우): 「프로젝트」 판 위에 지침·파일·새 대화 블록이 놓이고, 민원 글 토큰이 판 바깥에서 「새 대화」 앞으로 들어온다 ──
  // 판과 블록 배치는 ch00 s23·ch03 s06a 와 같다. 블록 k 의 바닥 가운데는 판 윗면 등각 좌표 (k·a, -k·a), a = 250
  DECK.slide({
    id: 'p1-ch07-s04', dur: 3.6,
    notes: "ChatGPT Plus에서 하네스 범위 가운데 지침과 파일을 정해 두는 기능이 프로젝트입니다. 프로젝트에 지침과 파일을 넣어 두면 그 프로젝트에서 새 대화를 시작할 때 그 내용을 함께 씁니다. 세 항목 요청문은 프로젝트 지침에, 규정 파일은 프로젝트 파일로 넣고, 새 대화에는 민원 글만 넣으면 됩니다. Plus는 프로젝트 파일을 25개까지 올릴 수 있고, 지침은 그 프로젝트 안에서만 적용됩니다. 여러분 계정으로 되는 기능이고, 파트 2에서 직접 만듭니다.",
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [120, 360, 1680, 660], props: false, token: false });
      THEME.header(el, FIC);
      this.t = THEME.title(el, 'ChatGPT에서는 프로젝트에 정해 둡니다', { x: 120, y: 104, size: 64, at: 0.1 });
      const X0 = 527, A = 250, X1 = X0 + 4 * A * C30;
      this.pl = THEME.plate(el, { x0: X0, x1: X1, n: 3, y: 556, r: 230, T: 44, at: 0.3,
        labels: [{ text: '프로젝트', x: X0 - A * C30 * 0.9, size: 52, weight: 700, at: 0.75 }] });
      this.sq = THEME.sequence(el, [
        { label: '지침', note: '세 항목 요청문' },
        { label: '파일', note: '체육시설 이용 규정' },
        { label: '새 대화', note: '민원 글', tone: 'cobalt' },
      ], { x0: X0, x1: X1, y: this.pl.top, size: 200, h: 80, at: 0.7, token: false });
      // 민원 글 서류 토큰: 판 오른쪽 바깥(등각 (960, -500))에서 -ix 축을 따라 들어와 「새 대화」 블록 오른쪽 앞(등각 (690, -500))에서 멈춘다
      this.fl = THEME.flow(el, [[960, -2 * A], [690, -2 * A]], { x: X0, y: this.pl.top, at: 1.45, speed: 420, line: false });
      this.ln = text(el, 't-body', '새 대화에는 <span class="p1-em">민원 글만</span> 넣습니다', 120, 900);
      this.src = text(el, 't-small p1-dimtext', 'Plus 프로젝트 파일 25개까지', 120, 980);
      this.cd = THEME.card(el, { x: 1300, y: 880, w: 520, at: 2.45, enter: 'slide', text: '파트 2에서 직접 만듭니다' });
      css(this.cd.face, { fontSize: '40px', fontWeight: '600' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      this.pl.render(lt);
      this.sq.render(lt);
      this.fl.render(lt);
      rise(this.ln, lt, 2.15);
      rise(this.src, lt, 2.3, 16);
      this.cd.render(lt);
    },
  });

  // ── s05 수치(L14 기둥 비교, 키 한 번): 그 규칙까지 모두 지켜질 확률(누적 곱)의 기둥 여섯. 키를 누르면 기둥 6 의 「약 37%」가 찍힌다 ──
  // 기둥은 등각 축(-iy, 오른쪽 위)을 따라 앞(왼쪽 아래)의 기둥 1부터 뒤(오른쪽 위)의 기둥 6까지 130px 간격으로 놓는다.
  // 기둥 1(가장 큼)의 윗면 왼쪽 모서리가 제목 둘째 줄(x 793 까지)보다 오른쪽에 오도록 기둥 1 바닥 가운데를 x 925 에 둔다.
  // 「약 37%」(128px)는 한 줄로 두면 화면 오른쪽 끝을 넘으므로 치수선 오른쪽에 「약」과 「37%」 두 줄로 놓는다
  const S05_R = 2.8;
  DECK.slide({
    id: 'p1-ch07-s05', dur: 4, steps: [S05_R],
    notes: "프로젝트 지침도 말로 적은 규칙이므로, 6장의 네 가지가 아니라 한서윤 주임 요청문에 적은 규칙 여섯 개로 계산해 보겠습니다. 다섯 칸 순서로 쓰기, 첨부 파일만 근거로 쓰기, 추측하지 않기, 대관 등에 답하지 않기, 계산식 붙이기, 이름·연락처 옮기지 않기입니다. 하나를 지킬 확률을 70%에서 95% 사이로 가정하고 차례로 곱하면 기둥이 하나씩 낮아집니다. 여섯 개가 모두 지켜질 확률은 몇 퍼센트쯤일지 먼저 짐작해 보세요. (키) 답은 약 37%로, 실제로 잰 값이 아니라 가정으로 계산한 값이지만 규칙이 늘수록 모두 지켜질 확률이 내려간다는 점은 가정을 바꿔도 같습니다.",
    setup(el) {
      const R = S05_R;
      this.bg = THEME.bg(el, 'base', { floor: [780, 150, 1100, 900], props: false, token: false });
      THEME.header(el, CH);
      this.t = THEME.title(el, '말로 적은 규칙은\n확률로 지켜집니다', { x: 120, y: 150, size: 88, w: 900, at: 0.1 });
      this.body = THEME.lines(el, ['요청문의 규칙 여섯 개, 하나당 70~95%로 가정', '확률을 차례로 곱하면',
        '여섯 개가 모두 지켜질 확률은 <span class="p1-em">약 37%</span>'], { x: 120, y: 400, w: 560, gap: 10 });
      this.src = text(el, 't-small p1-dimtext', '규칙별 준수 확률을 가정한 계산 · 기존 과정 강의 자료(책 부록 G의 가정)', 120, 960, 600);
      const RATE = [85, 95, 70, 90, 80, 92], SC = 6.8, W = 130, STEP = 130, O = [925, 905];
      let acc = 1;
      const cum = RATE.map(r => (acc *= r / 100));   // 그 규칙까지 모두 지켜질 확률: 85 · 81 · 57 · 51 · 41 · 37
      const pos = cum.map((c, i) => ({ xy: at2(O, 0, -STEP * i), hh: c * 100 * SC, at: 0.5 + 0.25 * i }));
      this.cols = [];
      for (let i = 5; i >= 0; i--) {   // 뒤(기둥 6)부터 만든다
        const q = pos[i];
        const b = THEME.block(el, { x: q.xy[0], y: q.xy[1], w: W, d: W, h: q.hh, tone: i === 5 ? 'cobalt' : 'white', at: q.at, grow: true,
          label: `규칙 ${i + 1} · ${RATE[i]}%`, labelPos: 'below', shadowH: Math.min(q.hh, 160) });
        // 이름표는 기둥 앞 모서리 바로 아래에서 오른쪽으로 놓는다(앞 기둥의 오른면과 겹치지 않게)
        const tg = tagOf(b);
        css(tg, { fontSize: '34px' });
        tg.style.left = (tg.offsetWidth / 2 + 6).toFixed(0) + 'px';
        this.cols.push(b);
      }
      const L = pos[5], dx = L.xy[0] + W * C30 + 34;
      this.dm = THEME.dim(el, '약 37', { from: [dx, L.xy[1]], to: [dx, L.xy[1] - L.hh], unit: '%', side: 'right', size: 128, unitSize: 60, color: '#1E40B8', at: R + 0.05 });
      this.dm.num.innerHTML = '약<br>37<small>%</small>';
      css(this.dm.num, { lineHeight: '1.02' });
      css(this.dm.num.querySelector('small'), { fontSize: '60px', fontWeight: '700', color: '#1E40B8' });
      this.R = R;
    },
    render(lt, ctx) {
      const R = this.R;
      this.bg.render(lt, ctx);
      this.t.render(lt);
      rise(this.body[0], lt, 0.7);
      rise(this.body[1], lt, 0.85);
      rise(this.body[2], lt, R + 0.4);
      this.cols.forEach(b => b.render(lt));
      rise(this.src, lt, 2.2, 16);
      this.dm.render(lt);
    },
  });

  // ── s06 도식(L8 확인 목록, 크게): 위 순서 줄(지침 · 답변 초안 · 검사)을 서류 토큰이 가로로 한 번 지나간 뒤, 검사 목록 세 줄이 놓인다 ──
  // 순서 줄은 화면 폭(x 120~1800)에 고르게 둔다: 「지침」 왼쪽 끝 x 120, 「답변 초안」 판과 이름표 묶음의 가운데 x 960, 「검사」 오른쪽 끝 x 1800.
  // 이름표 44px, 「답변 초안」 판은 원고의 1.6배(122×90). 목록은 y 362 부터 행 206 으로 아래 끝이 y 980 이다
  const S06 = { rowY: 245, trackY: 332, listY: 362, rowH: 206 };
  DECK.slide({
    id: 'p1-ch07-s06', dur: 3.5,
    notes: "지침에 적기만 한 규칙은 확률로 지켜집니다. 그래서 맞다·틀리다를 정해진 기준으로 가릴 수 있는 규칙은 답변이 나온 뒤 따로 확인하는 검사 단계로 옮깁니다. 조문 번호가 규정 원문에 있는지, 답변에 전화번호가 남았는지, 다섯 칸이 모두 있는지는 원문과 대조하거나 글자를 찾아보면 가려집니다. 이 검사를 에이전트나 프로젝트에 맡기면 그 역할을 검토라고 부르고, 파트 2에서는 시험표와 검토 프로젝트가 맡습니다.",
    setup(el) {
      const G = S06;
      this.bg = THEME.bg(el, 'base', { floor: false, props: false });
      THEME.header(el, CH);
      this.t = THEME.title(el, '확인할 수 있는 규칙은 검사로 옮깁니다', { x: 120, y: 104, size: 64, at: 0.1 });
      // 순서 줄 이름표(44px). 화살표는 그리지 않는다
      const mk = (label) => { const e = h('div', 'p1-tag is-big', el); e.textContent = label; css(e, { left: '0px', top: '0px', transformOrigin: '50% 100%' }); return e; };
      this.gd = mk('지침');
      this.ck = mk('검사');
      const gw = this.gd.offsetWidth, cw = this.ck.offsetWidth, th = this.gd.offsetHeight;
      css(this.gd, { left: '120px', top: (G.rowY - th / 2) + 'px' });
      css(this.ck, { left: (1800 - cw) + 'px', top: (G.rowY - th / 2) + 'px' });
      // 「답변 초안」 판(코발트, 122×90)과 오른쪽 이름표를 한 묶음으로 x 960 가운데에 둔다
      const IW = 122, ID = 90, half = ((IW + ID) / 2) * C30;
      const probe = mk('답변 초안'); const lw = probe.offsetWidth; probe.remove();
      const ix = Math.round(960 - (2 * half + 34 + lw) / 2 + half);
      this.dr = THEME.item(el, '답변 초안', { x: ix, y: G.rowY + 8, w: IW, d: ID, at: 0.75, drop: 120, labelPos: 'right' });
      tagOf(this.dr).classList.add('is-big');
      this.rowAt = [0.6, 0.75, 0.9];
      // 토큰이 지나가는 자리: 가는 점선(「지침」 가운데 → 「검사」 가운데)
      const x0 = 120 + gw / 2, x1 = 1800 - cw / 2;
      const sv = svgFull(el);
      this.track = s('line', { x1: x0, y1: G.trackY, x2: x0, y2: G.trackY, stroke: 'rgba(19,32,44,.32)', 'stroke-width': 3, 'stroke-dasharray': '2 11', 'stroke-linecap': 'round' }, sv);
      this.tx = [x0, x1];
      // 서류 토큰: 「지침」 아래에 내려앉은 뒤 화면 가로로 한 번 지나가 「검사」 아래에서 멈춘다(경로가 한 점인 THEME.flow 를 통째로 옮긴다)
      this.fl = THEME.flow(el, [[0, 0]], { x: x0, y: G.trackY, at: 1.2, line: false, scale: 1.3 });
      this.fl.el.querySelectorAll('polyline').forEach(pl => { pl.style.display = 'none'; });
      this.cl = THEME.checklist(el, [
        { text: '조문 번호', note: '조문 번호가 규정 원문에 있는가', state: 'pass', value: '통과' },
        { text: '전화번호', note: '답변에 전화번호가 남았는가', state: 'fail', value: '다시 쓰기' },
        { text: '다섯 칸', note: '다섯 칸이 모두 있는가', state: 'pass', value: '통과' },
      ], { x: 120, y: G.listY, w: 1680, rowH: G.rowH, box: 136, boxH: 46, textX: 300, textSize: 60, noteSize: 38, valueSize: 56, at: 1.8, each: 0.25 });
      // 판정 글: 본문 서체 56px. 「다시 쓰기」만 코발트
      this.cl.rows.forEach((r, i) => { if (r.value) css(r.value, { fontFamily: 'var(--body)', fontWeight: '700', color: i === 1 ? 'var(--accent)' : '' }); });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      THEME.dropEl(this.gd, lt, this.rowAt[0], 60);
      this.dr.render(lt);
      THEME.dropEl(this.ck, lt, this.rowAt[2], 60);
      const [x0, x1] = this.tx;
      const d = prog(lt, 0.95, 0.4, ease.outCubic);   // 점선이 왼쪽에서 오른쪽으로 그어진다
      this.track.setAttribute('x2', lerp(x0, x1, d).toFixed(1));
      this.track.style.opacity = d > 0 ? '1' : '0';
      this.fl.render(lt);
      const m = prog(lt, 1.25, 0.75, ease.inOutCubic);
      this.fl.el.style.transform = `translateX(${((x1 - x0) * m).toFixed(1)}px)`;
      this.cl.render(lt);
    },
  });

  // ── s07 퀴즈(L13, 키 한 번): 보기 블록 넷이 등각 사선으로 놓이고, 키를 누르면 ③ 블록에서 코발트 기둥이 솟는다 ──
  // 보기 글(48px)은 블록 오른쪽 한 열(L)에 왼쪽 맞춤으로 모은다. 열의 x 는 가장 긴 보기 글의 폭을 재서 오른쪽 끝이 x 1850 에 오도록 정한다.
  // 정답 이름표는 ③ 보기 글 바로 아래에 붙여 한 묶음으로 보이게 하고, 키를 누르면 ③ 보기 글에 코발트 윤곽 4px 이 생긴다.
  // ③ 기둥이 ② 블록을 가리지 않도록 ②→③ 간격을 넓힌다. 가리지 않는 조건: 세로 간격 + 0.577 × 가로 간격 ≥ 블록 폭 170 + 블록 높이 50 + 기둥 높이
  const S07_R = 2.2;
  DECK.slide({
    id: 'p1-ch07-s07', dur: 3.9, steps: [S07_R],
    notes: "손을 들어 주세요. 정해진 기준으로 맞다·틀리다를 가릴 수 없는 규칙은 몇 번입니까. (키) 정답은 3번으로, 이해하기 쉬운지는 읽는 사람이 판단해야 하므로 지침에 적어 두고 사람이 읽고 고칩니다. 1번, 2번, 4번은 원문과 대조하거나 글자를 찾아보면 확인되므로 검사로 옮깁니다. 답변의 책임과 발송 결정은 지침에도 검사에도 넣지 않고 사람이 맡는데, 이 이야기는 9장에서 이어집니다.",
    setup(el) {
      const R = S07_R, SZ = 170, HH = 50, HW = SZ * C30, FS = 48;
      this.bg = THEME.bg(el, 'base', { floor: [100, 250, 1100, 760], props: false, token: false });
      THEME.header(el, CH);
      this.t = THEME.title(el, '검사로 옮길 수 없는 규칙은 무엇입니까?', { x: 120, y: 104, size: 64, at: 0.1 });
      const OPT = ['① 근거 조문 번호가 규정 파일에 있다', '② 답변에 이름·전화번호를 옮기지 않는다', '③ 민원인이 이해하기 쉽게 쓴다', '④ 답변은 다섯 칸 순서로 쓴다'];
      const probe = OPT.map(t => { const e = h('div', 'p1-tag', el); e.textContent = t; css(e, { fontSize: FS + 'px', left: '0px', top: '0px' }); const r = [e.offsetWidth, e.offsetHeight]; e.remove(); return r; });
      const TH = probe[0][1];
      const L = Math.round(1850 - Math.max(...probe.map(q => q[0])));
      // 블록 자리: ①→② 와 ③→④ 는 가로 120·세로 155(이웃 블록끼리 겹치지 않는 최소), ②→③ 은 남은 폭을 모두 쓰고 세로 230
      const X1 = 360, x4 = L - HW - 30, DXb = x4 - X1 - 240;
      const P = [[X1, 340]];
      P.push([P[0][0] + 120, P[0][1] + 155]);
      P.push([P[1][0] + DXb, P[1][1] + 230]);
      P.push([P[2][0] + 120, P[2][1] + 155]);
      const colH = Math.min(200, Math.floor(230 + DXb * 0.577 - SZ - HH - 6));   // ② 블록을 가리지 않는 가장 높은 기둥
      this.blocks = P.map(([x, y], k) => THEME.block(el, { x, y, w: SZ, d: SZ, h: HH, at: 0.6 + 0.15 * k, drop: 140 }));
      // 보기 글 자리(세로 가운데). ③ 아래에 정답 이름표가 붙으므로 ④ 글은 그 아래로 비켜 놓는다
      const ly = P.map(([, y]) => y - HH / 2);
      const ansTop = ly[2] + TH / 2 + 4;
      ly[3] = Math.max(ly[3], ansTop + TH + 18 + TH / 2);
      this.labels = P.map(([x, y], k) => callout(el, { text: OPT[k], side: 'right', ax: x + HW, ay: y - HH / 2, lx: L, ly: ly[k],
        at: this.blocks[k].land + 0.05, style: { fontSize: FS + 'px' } }));
      // 정답 기둥: ③ 블록 윗면에서 솟는다
      const [x3, y3] = P[2];
      this.col = THEME.block(el, { x: x3, y: y3, z: HH, w: SZ, d: SZ, h: colH, tone: 'cobalt', at: R, grow: true, shadow: false });
      // 정답 이름표(코발트 48px): ③ 보기 글 바로 아래에 붙인다
      this.ans = h('div', 'p1-tag is-cobalt', el);
      this.ans.textContent = '지침에 두고 사람이 읽습니다';
      css(this.ans, { left: L + 'px', top: ansTop + 'px', fontSize: FS + 'px', transformOrigin: '0 0' });
      // 「검사」 이름표(34px): ①②④ 블록 왼쪽 꼭짓점 앞에 0.1초 간격으로 떨어진다
      this.chk = [0, 1, 3].map((k, j) => {
        const e = h('div', 'p1-tag', el); e.textContent = '검사';
        const [x, y] = P[k];
        css(e, { left: (x - HW - 12) + 'px', top: (y - HH / 2) + 'px', fontSize: '34px', transformOrigin: '50% 100%' });
        return { e, at: R + 0.5 + 0.1 * j };
      });
      this.R = R;
    },
    render(lt, ctx) {
      const R = this.R;
      this.bg.render(lt, ctx);
      this.t.render(lt);
      this.blocks.forEach(b => b.render(lt));
      this.labels.forEach(c => c.render(lt));
      this.col.render(lt);
      // ③ 보기 글의 코발트 윤곽이 0에서 4px 로 두꺼워진다
      const o = prog(lt, R + 0.2, 0.3, ease.snap);
      this.labels[2].el.style.boxShadow = o > 0 ? `0 0 0 ${(4 * o).toFixed(2)}px var(--accent)` : 'none';
      // 정답 이름표: ③ 보기 글 밑에서 아래로 펼쳐진다
      const a = prog(lt, R + 0.3, 0.4, ease.snap);
      this.ans.style.opacity = a > 0 ? '1' : '0';
      this.ans.style.clipPath = `inset(0 0 ${((1 - a) * 100).toFixed(1)}% 0)`;
      this.ans.style.transform = `translateY(${((1 - a) * -16).toFixed(1)}px)`;
      this.chk.forEach(c => { THEME.dropEl(c.e, lt, c.at, 120); c.e.style.transform = 'translate(-100%, -50%) ' + c.e.style.transform; });
    },
  });

  // ── s08 개념(L3 좌우 대비): 왼쪽 「에이전트 파일 · 누가」 코발트 블록 셋, 오른쪽 「스킬 파일 · 어떻게」 세 층 판. 오른쪽 칸은 키 없이 열린다 ──
  // 왼쪽 블록 셋은 등각 축(-iy, 오른쪽 위)을 따라 놓는다. 오른쪽 아래(+ix)로 놓으면 첫 블록 이름표가 칸 이름표와 겹치고
  // 마지막 블록이 칸 아래 줄(y 840)에 닿는다. 이름표는 블록 위에 핀으로 달고, 뒤 블록에 걸리지 않게 40px 왼쪽으로 민다
  DECK.slide({
    id: 'p1-ch07-s08', dur: 3.4,
    notes: "Claude Code라는 도구에서는 하네스 범위를 파일 여러 개로 나눠 적습니다. 에이전트 파일은 3장에서 본 에이전트 하나가 맡을 역할을 적은 문서로, 이 예시에서는 규정 조사, 답변 작성, 검토에 하나씩 둡니다. 스킬 파일은 그 일을 하는 순서를 적은 문서로, 규정을 찾고, 금액을 계산하고, 다섯 칸으로 쓰는 차례가 들어갑니다. ChatGPT 프로젝트의 지침 하나에 적던 내용을 역할마다, 순서마다 파일로 나눈 것이고, 화면의 역할과 순서는 구성 예시입니다. 이 도구는 여러분 계정에 없으니 따라 하지 않으셔도 되고, 8장 시연에서 이 파일이 .claude 폴더 안에 생기는 모습을 봅니다.",
    setup(el) {
      const RA = 1.35;
      this.bg = THEME.bg(el, 'base', { floor: false, props: false });
      THEME.header(el, CH);
      this.t = THEME.title(el, 'Claude Code는 파일로 정해 둡니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.sp = THEME.split(el, { left: { label: '에이전트 파일 · 누가' }, right: { label: '스킬 파일 · 어떻게', tone: 'cobalt' }, at: 0.2, rightAt: RA });
      const SZ = 170, A = [320, 730], T = 265;
      this.lb = ['규정 조사', '답변 작성', '검토'].map((lab, k) => {
        const [x, y] = at2(A, 0, -T * k);
        const b = THEME.block(this.sp.left, { x, y, w: SZ, d: SZ, h: 80, tone: 'cobalt', at: 0.45 + 0.15 * k, drop: 240, label: lab, labelPos: 'top', pin: 26 });
        const tg = tagOf(b); tg.classList.add('is-big'); css(tg, { marginLeft: '-40px' });
        return b;
      });
      this.ll = text(this.sp.left, 'p1-half-line', '에이전트 파일: 에이전트 하나가<br>맡을 역할을 적은 문서', 120, 840);
      css(this.ll, { fontSize: '40px', lineHeight: '1.35' });
      // 오른쪽 세 층 판: 원고의 폭 400 은 세로 판(x 960)과 이름표 열(x 1600)을 넘으므로 폭 300, 위로 30씩 좁힌다
      this.st = THEME.stack(this.sp.right, [{ label: '규정 찾기', h: 60 }, { label: '계산', h: 60 }, { label: '다섯 칸 작성', h: 60 }],
        { x: 1280, y: 640, w: 300, shrink: 30, at: RA + 0.35, each: 0.14, labelX: 1590, tagSize: 44 });
      this.rl = text(this.sp.right, 'p1-half-line', '스킬 파일: 일하는 순서를 적은 문서', 1040, 840);
      css(this.rl, { fontSize: '40px' });
      this.n1 = text(el, 't-body p1-dimtext', '참가자 계정에는 없어 시연으로 봅니다', 120, 960);
      css(this.n1, { fontSize: '34px' });
      this.n2 = text(el, 't-small p1-dimtext', '구성 예시', 1700, 960);
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      this.sp.render(lt);
      this.lb.forEach(b => b.render(lt));
      this.st.render(lt);
      rise(this.ll, lt, 2.3, 28);
      rise(this.rl, lt, 2.4, 28);
      rise(this.n1, lt, 2.5, 28);
      rise(this.n2, lt, 2.55, 28);
    },
  });

  // ── s09 정리(L12 표): 지금 쓰는 것 → 옮길 곳 세 행, 업무에서 지키는 네 가지 띠, 다음 질문 카드 ──
  // 띠의 꼬리표와 문장이 폭 1680 한 줄에 들지 않으면 꼬리표를 위 줄, 문장을 아래 줄에 두고 띠 높이를 늘린다(setup 에서 잰다)
  DECK.slide({
    id: 'p1-ch07-s09', dur: 3.6,
    notes: "세 항목 요청문은 프로젝트 지침으로, 규정 파일은 프로젝트 파일로 옮기면 민원마다 다시 붙여 넣지 않아도 됩니다. 지침도 확률로 지켜지므로 확인할 수 있는 규칙은 검사 단계로 옮깁니다. 6장의 네 가지 가운데 개인정보와 내부 자료는 사람이 입력 전에 확인하고, 근거는 검사 단계와 원문 대조로, 책임은 발송 승인으로 지킵니다. Claude Code에서는 이 환경이 에이전트 파일과 스킬 파일 여러 개가 되는데, 이 파일을 사람이 하나씩 직접 써야 할까요? 8장의 강사 시연에서 확인합니다.",
    setup(el) {
      this.bg = THEME.bg(el, 'accent', { bx: 1880, by: 1180 });
      THEME.header(el, CH);
      this.t = THEME.title(el, '요청문은 지침으로, 확인은 검사로 옮깁니다', { x: 120, y: 104, size: 64, at: 0.1 });
      const C = (a, b) => [{ text: a, size: 44 }, { text: b, size: 52 }];
      this.tb = THEME.table(el, [C('세 항목 요청문', '프로젝트 지침'), C('규정 파일', '프로젝트 파일'), C('확인할 수 있는 규칙', '검사 단계')],
        { x: 120, y: 220, cols: [760, 920], rowH: 120, gap: 12, at: 0.35, each: 0.12 });
      // 네 가지 띠
      const BX = 120, BY = 640, BW = 1680, TX = 440;
      const tag = h('div', 'p1-tag', el); tag.textContent = '업무에서 지키는 네 가지';
      css(tag, { fontSize: '34px', left: '0px', top: '0px', position: 'absolute' });
      const ln = h('div', 't-body', el); ln.textContent = '개인정보·내부 자료 → 입력 전 확인 · 근거 → 검사·원문 대조 · 책임 → 발송 승인';
      css(ln, { fontSize: '34px', left: '0px', top: '0px', whiteSpace: 'nowrap', position: 'absolute' });
      const one = TX + tag.offsetWidth + 24 + ln.offsetWidth <= BX + BW - 30;
      const BH = one ? 100 : 128;
      this.band = THEME.card(el, { x: BX, y: BY, w: BW, h: BH, at: 1.0, enter: 'drop', html: '', depth: 10, pad: '0' });
      this.band.el.appendChild(tag); this.band.el.appendChild(ln);   // 띠와 함께 떨어진다
      if (one) {
        css(tag, { left: (TX - BX) + 'px', top: (BH / 2) + 'px', transform: 'translateY(-50%)' });
        css(ln, { left: (TX - BX + tag.offsetWidth + 24) + 'px', top: (BH / 2) + 'px', transform: 'translateY(-50%)' });
      } else {
        css(tag, { left: (TX - BX) + 'px', top: '12px' });
        css(ln, { left: (TX - BX) + 'px', top: '68px' });
      }
      this.bandOne = one;
      this.tag = tag; this.ln = ln;
      // 띠 왼쪽 끝의 작은 호박 기둥 넷(높이 40, 아래에서 솟는다): 화면 가로 한 줄(등각 (t, -t) 방향)로 띠 안에 놓는다
      this.amb = [0, 1, 2, 3].map(k => {
        const [x, y] = at2([186, BY + BH / 2 + 22], 37 * k, -37 * k);
        return THEME.block(el, { x, y, w: 34, d: 34, h: 40, tone: 'amber', at: 1.4 + 0.1 * k, grow: true, shadow: false });
      });
      this.cd = THEME.card(el, { x: 120, y: 790 + (BH - 100), w: 1240, at: 2.35, enter: 'drop', cap: '다음 질문',
        html: '<div style="font-size:34px;line-height:1.4">Claude Code에서는 이 환경이 에이전트 파일·스킬 파일 여러 개입니다</div>' +
              '<div style="font-size:44px;font-weight:700;line-height:1.35;margin-top:6px">이 환경을 사람이 파일 하나씩 직접 써야 하는가</div>' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      this.tb.render(lt);
      this.band.render(lt);
      this.amb.forEach(b => b.render(lt));
      const p = prog(lt, 1.85, 0.35, ease.snap);   // 기둥이 솟은 뒤 꼬리표와 문장이 찍힌다
      [this.tag, this.ln].forEach((e, i) => {
        const q = prog(lt, 1.85 + 0.12 * i, 0.35, ease.snap);
        e.style.opacity = q.toFixed(3);
        e.style.transform = (this.bandOne ? 'translateY(-50%) ' : '') + `translateX(${((1 - q) * -20).toFixed(1)}px)`;
      });
      void p;
      this.cd.render(lt);
    },
  });
})();
