/* p1.js — 파트 1 테마 「아이소메트릭: 흰 모형 블록」 부품
 *
 * 쓰는 법: 부품은 setup 에서 만들고, 돌려받은 객체의 render(lt, ctx) 를 장면의 render 에서 부른다.
 *   좌표는 무대(1920×1080) px 다. 블록의 (x, y)는 블록 바닥면 가운데가 닿는 바닥 점이다.
 *   등각 좌표 THEME.iso(ix, iy, iz) → [화면 dx, 화면 dy]. ix 는 오른쪽 아래 30°, iy 는 왼쪽 아래 30°, iz 는 위쪽이다.
 *   블록은 뒤(화면 위쪽)에 있는 것부터 만든다. 나중에 만든 것이 앞에 그려진다.
 *   at 은 그 부품의 움직임이 시작되는 lt(초)다. at 을 -1 로 주면 처음부터 놓여 있다.
 *
 * 필수 부품
 *   THEME.bg(el, variant, o)          'base' | 'accent' | 'lab'. o: { floor: [x, y, w, h] | false, props, token } → { el, render(lt, ctx) }
 *   THEME.header(el, o)               o: { chapter: 3 | 'ch03', title, fiction } → { el, render }
 *   THEME.title(el, text, o)          제목(한꺼번에 나타난다). o: { x, y, w, size, at, maxLines, cls } → { el, end, lines, render(lt) }
 *   THEME.card(el, o)                 정면 판 카드. o: { x, y, w, h, tone, at, enter: 'drop' | 'slide', cap, text, html, depth } → { el, face, end, render(lt) }
 *   THEME.step(el, n, total, o)       계단 블록 단계 표시. o: { x, y, at, text } → { el, end, render(lt) }
 *   THEME.videoTitle(el, o)           영상 위 제목. o: { kind: 'intro' | 'chapter', src, poster, loop, fit, fitBg, flip, kicker, title, sub, scene, at }
 *                                     → { el, title, end, render(lt, ctx) }. src 가 없고 poster 만 있으면 그 그림을 정지 배경으로,
 *                                     둘 다 없으면 scene('intro' 'stack' 'pillars' 'flow')을 블록으로 그린다
 *
 * 이 파트의 부품
 *   THEME.block(el, o)                블록 하나. o: { x, y, z, w, d, h, tone, at, drop, grow, label, note, labelPos, pin, labelTone,
 *                                     answer, answerAt, fold, layers, lines, shadow } → { el, land, end, top, render(lt) }
 *   THEME.stack(el, layers, o)        층 쌓기. layers: [{ label, note, tone, h, layers }] 아래층부터. o: { x, y, w, d, shrink, at, each, times, labelX, pullAt, pull }
 *                                     → { el, blocks, end, render(lt) }
 *   THEME.flow(el, path, o)           등각 축만 따라 움직이는 서류 토큰. path: 등각 좌표 [[ix, iy], …](이웃한 두 점은 ix 나 iy 하나만 다르다)
 *                                     o: { x, y, at, speed, hold: { 점 번호: 초 }, tone, line } → { el, times, end, render(lt) }
 *   THEME.dim(el, value, o)           치수선 + 수치. o: { from: [x, y], to: [x, y], at, unit, side: 'right' | 'left' | 'above' | 'below', size } → { el, end, render(lt) }
 *   THEME.shot(el, src, o)            화면 캡처 틀(흰 카드 + 블록 받침). src 가 비었거나 불러오지 못하면 그린 화면을 넣는다
 *                                     o: { size: 'wide' | 'full' | 'tall', x, y, at, marks: [{ x, y, w, h }], markAt, chat, chatOpts, input, top, url, draw(screen) }
 *                                     → { el, screen, drawn, chat, end, render(lt) }
 *   THEME.chatgpt(parent, o)          그린 ChatGPT 화면(THEME.shot 이 쓴다). o: { chat, chatOpts, input, top, url } → { el, body, chat, end, render(lt) }
 *   THEME.item(el, kind, o)           사례 사물: '민원 글' '규정집' '답변 초안' '시험표' '승인 기록'. o 는 block 과 같고 시험표는 cells, 승인 기록은 stampAt 을 더 받는다
 *   THEME.figure(el, who, o)          인물: '한서윤' '오민석' '정하준' '윤지영'. o: { x, y, at, first, symbol, scale } → { el, end, render(lt) }
 *   THEME.cutout(el, id, o)           누끼 소품 그림(id: 'p1-key-counter' 'p1-key-rules' 'p1-key-figure'). o: { src, x, y, size, at, mono, label, note, labelPos, pin }
 *                                     (x, y)는 바닥면 가운데, size 는 화면에서 차지하는 폭. src 가 없으면 같은 크기의 흰 블록 → block 과 같다
 *
 * 레이아웃 부품(2026-11-24 추가, p1.md 「레이아웃 목록」)
 *   THEME.statement(el, text, o)      한 문장 132px + 받침 판 + 보조 줄. o: { x, w, cy, size, at, em: ['코발트로 끝날 말'], sub, facts: [{ label, text }](셋까지) } → { el, title, end, render(lt) }
 *   THEME.bigNum(el, value, o)        큰 숫자 420px + 세로 치수선. o: { x, y, size, unit, label, note, tone, at } → { el, num, end, render(lt) }
 *   THEME.split(el, o)                좌우 대비. o: { x, top, bottom, left: { label, tone }, right: { label, tone }, at, rightAt, floor }
 *                                     → { left, right(칸 요소), rightAt, end, render(lt) }. 오른쪽 칸은 rightAt 에 열린다
 *   THEME.sequence(el, items, o)      가로 순서. items: [{ label, note, tone, h }]. o: { x0, x1, y, size, h, at, each, token, speed } → { blocks, flow, end, render(lt) }
 *   THEME.tile(el, o)                 번호 카드. o: { x, y, w, h, n, title, text, tone, at, enter } → card 와 같다
 *   THEME.table(el, rows, o)          표. rows: [[칸, …] | { cells, tone }]. o: { x, y, cols: [폭, …], head: [머리, …], rowH, gap, size, at, each } → { rows, end, render(lt) }
 *   THEME.quiz(el, opts, o)           퀴즈. opts: [보기 글, …]. o: { x0, x1, y, size, answer(번호), answerText, revealAt, riseH, at } → { items, revealAt, end, render(lt) }
 *   THEME.checklist(el, items, o)     확인 목록. items: [{ text, note, value, state: 'pass' | 'fail' | 'todo' }]. o: { x, y, w, rowH, at, each } → { end, render(lt) }
 *   THEME.callout(el, o)              짚는 이름표. o: { from: [x, y], x, y, text, w, at } → { end, render(lt) }
 *   THEME.rise(e, lt, at, dy)         글 덩어리를 아래에서 올리는 도우미
 *   THEME.title 에 em(코발트로 끝날 말 배열)을 더했다. em 을 주지 않으면 결과는 전과 같다
 *
 * 레이아웃 부품 보완(2026-11-24 2차, p1.md 3절 표)
 *   THEME.plate(el, o)                가로 순서 블록 아래에 까는 두께 있는 판. o: { x0, x1, n, y, r, T, tone, at, drop, labels: [{ text, x, size, weight, at }], labelY }
 *                                     → { el, top, a, r, groundY(x), iso(ix, iy, z), labels, land, end, render(lt) }
 *   THEME.text / THEME.lines / THEME.dropEl / THEME.ghostDraw / THEME.dashDraw   글 덩어리, 본문 여러 줄, 요소 내려앉히기, 점선 윤곽 그리기
 *   table: headSize, headH(두 줄 머리), groupGap, 칸 { text, sub, size, subSize }, 행 { cells, tone, h, size, gap }, 돌려주는 값에 head·bottom
 *   checklist: todo 점선 블록, value: '' 빈 값 칸, revealAt(결과를 키 한 번에 연다), box·boxH·textX·textSize·noteSize·valueSize·slotW, 항목 tone, 돌려주는 값에 rows
 *   stack: tone 'ghost' 빈 층, tagSize·noteSize·noteW·labelGap.  dim: font 'body', pos, unitSize, color.  tile: img.  figure: big, role, roleW
 *   새 레이아웃 부품의 기본 글자: 표 머리 줄 34px, 표 행 40px, 확인 목록 보조 줄 34px, 가로 순서 보조 줄 34px
 *
 * 이 파일은 REEL 과 KIT, DECK.video 만 쓴다. Math.random, 시계, CSS transition·animation 을 쓰지 않는다.
 */
(function () {
  'use strict';
  const R = window.REEL;
  const { ease, prog, clamp, lerp, css, h, s } = R;
  const F = 1 / 30;
  const C30 = Math.cos(Math.PI / 6), S30 = 0.5;
  const INK = '#13202C', BG = '#E9EDF1', EDGE = 'rgba(19,32,44,.35)', SHADE = 'rgba(19,32,44,.18)';
  const TONES = {
    white: { top: '#FFFFFF', left: '#D3D9E0', right: '#B9C3CE' },
    cobalt: { top: '#5C7EF0', left: '#2A55E5', right: '#1E40B8' },
    amber: { top: '#F7C36A', left: '#F2A93B', right: '#C9861F' },
    slate: { top: '#5A6773', left: '#3A4652', right: '#2A333C' },
    ghost: { top: BG, left: BG, right: BG },   // 아직 오지 않은 자리: 윤곽선만 보인다
  };
  const tone = t => TONES[t] || TONES.white;
  const iso = (x, y, z = 0) => [(x - y) * C30, (x + y) * S30 - z];
  const P = a => a.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  const mix = (a, b, p) => { const A = hex(a), B = hex(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], clamp(p)))).join(',')})`; };
  const THEME = window.THEME = window.THEME || {};
  THEME.iso = iso;
  THEME.tones = TONES;

  // ── 그리기 도우미 ──
  function svgAt(parent, x = 0, y = 0) {
    const v = s('svg', { width: 1, height: 1 }, parent);
    css(v, { position: 'absolute', left: x + 'px', top: y + 'px', overflow: 'visible', pointerEvents: 'none' });
    return v;
  }
  function poly(g, pts, fill, o = {}) {
    const a = { points: P(pts), fill, stroke: o.stroke ?? EDGE, 'stroke-width': o.sw ?? 1.5, 'stroke-linejoin': 'round', 'vector-effect': 'non-scaling-stroke' };
    if (o.dash) a['stroke-dasharray'] = o.dash;
    return s('polygon', a, g);
  }
  function seg(g, a, b, o = {}) {
    return s('line', { x1: a[0].toFixed(1), y1: a[1].toFixed(1), x2: b[0].toFixed(1), y2: b[1].toFixed(1), stroke: o.stroke ?? EDGE,
      'stroke-width': o.sw ?? 1.5, 'stroke-linecap': 'round', 'vector-effect': 'non-scaling-stroke' }, g);
  }
  function zbox(parent) {   // 크기 0 인 기준점 상자
    const d = h('div', '', parent);
    css(d, { position: 'absolute', left: '0px', top: '0px', width: '0px', height: '0px' });
    return d;
  }

  // 등각 상자: 바닥 가운데(0,0) 기준, 높이 z0 에서 z0+hh 까지. 왼면·오른면·윗면을 그리고 높이를 바꾸는 update(hh) 를 돌려준다
  function box(g, w, d, hh, z0, c, o = {}) {
    const a = w / 2, b = d / 2, st = { dash: o.dash };
    const L = poly(g, [], c.left, st), Rf = poly(g, [], c.right, st), T = poly(g, [], c.top, st);
    const flap = o.fold ? poly(g, [], c.left, st) : null;
    const extra = s('g', {}, g);
    const f = Math.min(a, b) * 0.5;
    function update(H) {
      const zt = z0 + H;
      L.setAttribute('points', P([iso(-a, b, z0), iso(a, b, z0), iso(a, b, zt), iso(-a, b, zt)]));
      Rf.setAttribute('points', P([iso(a, -b, z0), iso(a, b, z0), iso(a, b, zt), iso(a, -b, zt)]));
      if (o.fold) {   // 오른쪽 모서리를 접은 납작 블록(민원 글)
        T.setAttribute('points', P([iso(-a, -b, zt), iso(a - f, -b, zt), iso(a, -b + f, zt), iso(a, b, zt), iso(-a, b, zt)]));
        flap.setAttribute('points', P([iso(a - f, -b, zt), iso(a, -b + f, zt), iso(a - f, -b + f, zt)]));
      } else T.setAttribute('points', P([iso(-a, -b, zt), iso(a, -b, zt), iso(a, b, zt), iso(-a, b, zt)]));
      extra.innerHTML = '';
      if (o.layers > 1) {   // 층 선(규정집: 층 하나가 조문 하나)
        for (let k = 1; k < o.layers; k++) {
          const z = z0 + H * k / o.layers;
          s('polyline', { points: P([iso(-a, b, z), iso(a, b, z), iso(a, -b, z)]), fill: 'none', stroke: EDGE, 'stroke-width': 1.2, 'vector-effect': 'non-scaling-stroke' }, extra);
        }
      }
      if (o.lines) {   // 윗면 글줄(민원 글, 답변 초안)
        for (let k = 0; k < o.lines; k++) {
          const yy = -b + d * (0.3 + 0.2 * k), x0 = -a + w * 0.16, x1 = a - w * (k === o.lines - 1 ? 0.5 : 0.22);
          seg(extra, iso(x0, yy, zt), iso(x1, yy, zt), { stroke: o.lineColor || 'rgba(19,32,44,.3)', sw: 3 });
        }
      }
    }
    update(hh);
    return { update };
  }
  // 흐림 없는 평행사변형 그림자: 바닥 사각형과 오른쪽 아래(등각 ix 방향)로 민 사각형을 잇는 육각형
  function shadowPts(w, d, hh, z0 = 0) {
    const a = w / 2, b = d / 2, sx = Math.min(hh * 0.55 + 10, 120), sy = Math.min(hh * 0.14, 24);
    return [iso(-a, -b, z0), iso(a, -b, z0), iso(a + sx, -b + sy, z0), iso(a + sx, b + sy, z0), iso(-a + sx, b + sy, z0), iso(-a, b, z0)];
  }
  // 정면 판(카드·패널·캡처 카드)의 두께와 그림자. 판의 앞면은 (0,0)-(W,H), 두께는 오른쪽 위 30°로 뻗는다
  function slab(g, W, H, dep, o = {}) {
    const dx = dep * C30, dy = dep * S30, L = o.shadow ?? 26, vx = L * C30, vy = L * S30;
    if (L > 0) poly(g, [[dx, H - dy], [W + dx, H - dy], [W + dx + vx, H - dy + vy], [W + vx, H + vy], [vx, H + vy], [0, H]], SHADE, { stroke: 'none' });
    poly(g, [[W, 0], [W + dx, -dy], [W + dx, H - dy], [W, H]], o.right || TONES.white.right);
    poly(g, [[0, 0], [W, 0], [W + dx, -dy], [dx, -dy]], o.top || TONES.white.top);
  }
  // 내려앉기: at 에 떨어지기 시작해 0.35초 뒤 바닥에 닿고, 3프레임 눌렸다가 0.2초에 펴진다
  function dropState(lt, at, D) {
    const land = at + 0.35;
    if (lt < at) return { dy: D, op: 0, sx: 1, sy: 1 };
    if (lt < land) { const p = (lt - at) / 0.35; return { dy: D * (1 - p * p), op: clamp(p / 0.12), sx: 1, sy: 1 }; }
    const q = lt - land;
    if (q < 3 * F) return { dy: 0, op: 1, sx: 1.035, sy: 0.92 };
    const e = ease.outBack(clamp((q - 3 * F) / 0.2), 1.2);
    return { dy: 0, op: 1, sx: lerp(1.035, 1, e), sy: lerp(0.92, 1, e) };
  }

  // ── 블록 ──
  THEME.block = (el, o = {}) => {
    const w = o.w ?? 120, d = o.d ?? w, hh = o.h ?? 60, z = o.z ?? 0, x = o.x ?? 960, y = o.y ?? 600;
    const at = o.at ?? 0, D = o.drop ?? 360, land = at + 0.35;
    const root = zbox(el);
    css(root, { left: x + 'px', top: y + 'px' });
    let sh = null;
    if (o.shadow !== false) sh = poly(svgAt(root), shadowPts(w, d, o.shadowH ?? hh, z), SHADE, { stroke: 'none' });
    const body = zbox(root);
    body.style.transformOrigin = `0px ${-z}px`;
    const sv = svgAt(body);
    const bx = box(sv, w, d, hh, z, tone(o.tone), { fold: o.fold, layers: o.layers, lines: o.lines, lineColor: o.lineColor, dash: o.tone === 'ghost' ? '6 5' : null });
    if (o.hide) Array.from(sv.childNodes).forEach(n => { n.style.display = 'none'; });   // 면을 그리지 않고 그림자·이름표·움직임만 쓴다(THEME.cutout)
    const topY = -z - hh;
    let tag = null, pin = null, front = null, back = null, tagBase = '', lead = null;
    if (o.label) {
      const pos = o.labelPos || 'top';
      tag = h('div', 'p1-tag' + (o.labelTone ? ' is-' + o.labelTone : ''), body);
      front = h('span', '', tag); front.textContent = o.label;
      if (o.note) { const sm = h('small', '', front); sm.textContent = o.note; }
      if (o.answer) {
        back = h('div', 'p1-back', tag); back.textContent = o.answer;
        back.style.position = 'static'; back.style.display = 'block';
        const wb = tag.offsetWidth; back.style.display = 'none'; back.style.position = '';
        tag.style.minWidth = Math.max(tag.offsetWidth, wb) + 'px';
        back.style.display = '';
      }
      if (pos === 'top') {
        const pl = o.pin ?? 44;
        pin = h('div', 'p1-pin', body);
        css(pin, { left: '0px', top: (topY - pl) + 'px', height: pl + 'px', transformOrigin: '0 100%' });
        css(tag, { left: '0px', top: (topY - pl) + 'px' });
        tagBase = 'translate(-50%, -100%)';
      } else if (pos === 'right') {
        const ax = (w / 2) * C30, ay = (w / 2) * S30 - z - hh / 2, rx = ((w + d) / 2) * C30 + 34;
        lead = seg(sv, [ax, ay], [rx - 8, ay], { stroke: EDGE });
        css(tag, { left: rx + 'px', top: ay + 'px' });
        tagBase = 'translate(0, -50%)';
      } else if (pos === 'left') {
        const ax = -(d / 2) * C30, ay = (d / 2) * S30 - z - hh / 2, lx = -((w + d) / 2) * C30 - 34;
        lead = seg(sv, [ax, ay], [lx + 8, ay], { stroke: EDGE });
        css(tag, { left: lx + 'px', top: ay + 'px' });
        tagBase = 'translate(-100%, -50%)';
      } else {   // below
        css(tag, { left: '0px', top: (((w + d) / 2) * S30 - z + 18) + 'px' });
        tagBase = 'translate(-50%, 0)';
      }
    }
    const end = Math.max(land + 0.3, o.label ? land + 0.4 : 0, o.answer ? (o.answerAt ?? land + 1) + 0.45 : 0);
    return {
      el: root, body, land, end, top: [x, y + topY],
      render(lt) {
        if (o.grow) {   // 솟아오르기: 높이가 0 에서 h 까지 자란다(기둥, 시험표 칸)
          const p = prog(lt, at, 0.45, ease.outCubic);
          bx.update(Math.max(0.5, hh * p));
          body.style.opacity = lt < at ? '0' : '1';
          if (sh) { sh.setAttribute('points', P(shadowPts(w, d, Math.max(1, (o.shadowH ?? hh) * p), z))); sh.style.opacity = lt < at ? '0' : '1'; }
        } else {
          const k = dropState(lt, at, D);
          body.style.transform = `translate(0px, ${(-k.dy).toFixed(1)}px) scale(${k.sx.toFixed(4)}, ${k.sy.toFixed(4)})`;
          body.style.opacity = k.op.toFixed(3);
          if (sh) {
            const g = prog(lt, land - 0.15, 0.15, ease.outQuad);
            sh.setAttribute('transform', `translate(0 ${-z}) scale(${lerp(0.3, 1, g).toFixed(3)}) translate(0 ${z})`);
            sh.style.opacity = g.toFixed(3);
          }
        }
        if (tag) {
          const p = prog(lt, (o.grow ? at + 0.3 : land) + 0.05, 0.3, ease.snap);
          let tf = `${tagBase} translateY(${((1 - p) * 14).toFixed(1)}px)`;
          if (back) {   // 이름표 뒤집기: 90° 에서 앞뒤가 바뀐다. 멈춘 상태에는 3D 변환을 두지 않는다
            const q = prog(lt, o.answerAt ?? land + 1, 0.45, ease.inOutCubic), ang = 180 * q;
            const showBack = ang >= 90;
            front.style.visibility = showBack ? 'hidden' : 'inherit';
            back.style.visibility = showBack ? 'inherit' : 'hidden';
            if (q > 0 && q < 1) tf += ` perspective(700px) rotateX(${(showBack ? ang - 180 : ang).toFixed(1)}deg)`;
          }
          tag.style.transform = tf;
          tag.style.opacity = p.toFixed(3);
          if (pin) pin.style.transform = `scaleY(${p.toFixed(3)})`;
          if (lead) lead.style.opacity = p.toFixed(3);
        }
      },
    };
  };

  // ── 층 쌓기 ──
  THEME.stack = (el, layers, o = {}) => {
    const x = o.x ?? 1180, y = o.y ?? 800, w0 = o.w ?? 380, d0 = o.d ?? w0, shrink = o.shrink ?? 0, at = o.at ?? 0.2, each = o.each ?? 0.12;
    const root = zbox(el);
    const grp = zbox(root);
    grp.style.transformOrigin = `${x}px ${y}px`;
    const total = layers.reduce((a, L) => a + (L.h ?? 44), 0);
    // 점선 빈 층(tone 'ghost'): 떨어지지 않고 윤곽이 둘레를 따라 그어진다. 그림자는 점선이 아닌 첫 층이 진다
    const isGh = L => L.tone === 'ghost';
    const first = layers.findIndex(L => !isGh(L));
    const shH = first < 0 ? 0 : layers.slice(first).reduce((a, L) => a + (L.h ?? 44), 0);
    let z = 0;
    const blocks = layers.map((L, i) => {
      const w = w0 - shrink * i, d = d0 - shrink * i, hh = L.h ?? 44;
      const t = o.times ? o.times[i] - 0.35 : at + i * each;
      const gh = isGh(L);
      const b = THEME.block(grp, { x, y, z, w, d, h: hh, tone: L.tone, at: t, shadow: i === first, shadowH: shH, layers: L.layers, fold: L.fold, lines: L.lines, drop: gh ? 0 : (o.drop ?? 300) });
      b.anchor = [x + (w / 2) * C30, y + (w / 2) * S30 - z - hh / 2];
      if (gh) { b.ghostDraw = THEME.ghostDraw(b); b.drawAt = t; }
      z += hh;
      return b;
    });
    const lx = o.labelX ?? (x + ((w0 + d0) / 2) * C30 + 70);
    const lsv = svgAt(root);
    const labels = layers.map((L, i) => {
      if (!L.label) return null;
      const t = h('div', 'p1-side', root);
      t.textContent = L.label;
      if (o.tagSize) css(t, { fontSize: o.tagSize + 'px', fontWeight: '700' });
      if (L.note) {
        const sm = h('small', '', t); sm.textContent = L.note;   // \n 은 줄바꿈
        if (o.noteSize) css(sm, { fontSize: o.noteSize + 'px', marginTop: '4px' });
        if (o.noteW) css(sm, { width: o.noteW + 'px', whiteSpace: 'pre-line', wordBreak: 'keep-all' });
        else if (L.note.indexOf('\n') >= 0) css(sm, { whiteSpace: 'pre-line', width: 'max-content' });   // \n 에서만 줄을 바꾼다
      }
      return { el: t, line: seg(lsv, [0, 0], [0, 0], { stroke: EDGE }), dot: s('circle', { r: 4, fill: INK }, lsv) };
    });
    const last = blocks[blocks.length - 1];
    const pullAt = o.pullAt ?? null;
    const end = Math.max(last.land + 0.5, pullAt != null ? pullAt + 0.8 : 0);
    return {
      el: root, blocks, end,
      render(lt) {
        blocks.forEach(b => { b.render(lt); if (b.ghostDraw) b.ghostDraw(lt, b.drawAt); });
        const k = pullAt == null ? 1 : lerp(1, o.pull ?? 0.8, prog(lt, pullAt, 0.8, ease.inOutCubic));
        grp.style.transform = k === 1 ? 'none' : `scale(${k.toFixed(4)})`;
        let minY = Infinity;
        for (let i = labels.length - 1; i >= 0; i--) {   // 위층부터 놓고 아래층 이름표는 겹치지 않게 내린다
          const L = labels[i];
          if (!L) continue;
          const b = blocks[i];
          const ax = x + (b.anchor[0] - x) * k, ay = y + (b.anchor[1] - y) * k;
          let ly = ay;
          if (minY !== Infinity) ly = Math.max(ly, minY + (o.labelGap ?? 58));
          minY = ly;
          const p = prog(lt, b.land + 0.05, 0.35, ease.snap);
          css(L.el, { left: lx + 'px', top: ly + 'px', opacity: p.toFixed(3), transform: `translate(${((1 - p) * -24).toFixed(1)}px, -50%)` });
          const ex = lerp(ax, lx - 14, p);
          L.line.setAttribute('x1', ax.toFixed(1)); L.line.setAttribute('y1', ay.toFixed(1));
          L.line.setAttribute('x2', ex.toFixed(1)); L.line.setAttribute('y2', lerp(ay, ly, p).toFixed(1));
          L.dot.setAttribute('cx', ax.toFixed(1)); L.dot.setAttribute('cy', ay.toFixed(1));
          L.line.style.opacity = L.dot.style.opacity = p > 0 ? '1' : '0';
        }
      },
    };
  };

  // ── 서류 토큰의 흐름 ──
  function tokenShape(g, t, sc = 1) {
    const sv = s('g', {}, g);
    poly(sv, shadowPts(52 * sc, 38 * sc, 9 * sc), SHADE, { stroke: 'none' });
    box(sv, 52 * sc, 38 * sc, 9 * sc, 0, tone(t), { fold: true });
    return sv;
  }
  function schedule(S, at, speed, hold) {
    const segs = [], times = [at];
    let t = at;
    for (let i = 1; i < S.length; i++) {
      if (i > 1) {
        const a = S[i - 2], b = S[i - 1], c = S[i];
        const turn = Math.abs((b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0])) > 1 || ((b[0] - a[0]) * (c[0] - b[0]) + (b[1] - a[1]) * (c[1] - b[1])) < 0;
        t += (turn ? 0.1 : 0) + (hold[i - 1] || 0);   // 방향을 바꾸는 모서리에서 0.1초 멈춘다
      } else t += hold[0] || 0;
      const dt = Math.hypot(S[i][0] - S[i - 1][0], S[i][1] - S[i - 1][1]) / speed;
      segs.push({ a: S[i - 1], b: S[i], t0: t, t1: t + dt });
      t += dt;
      times.push(t);
    }
    return { segs, times, end: t };
  }
  function posAt(segs, S, lt) {
    for (let i = 0; i < segs.length; i++) {
      const q = segs[i];
      if (lt < q.t0) return { p: q.a, k: i };
      if (lt < q.t1) { const e = ease.inOutQuad((lt - q.t0) / (q.t1 - q.t0)); return { p: [lerp(q.a[0], q.b[0], e), lerp(q.a[1], q.b[1], e)], k: i }; }
    }
    return { p: S[S.length - 1], k: segs.length };
  }
  THEME.flow = (el, path, o = {}) => {
    const x = o.x ?? 960, y = o.y ?? 540, at = o.at ?? 0.4, speed = o.speed ?? 380, hold = o.hold || {};
    path.forEach((p, i) => {
      if (i && Math.abs(p[0] - path[i - 1][0]) > 0.01 && Math.abs(p[1] - path[i - 1][1]) > 0.01) console.warn('[DECK] p1 flow: 등각 축을 벗어난 구간', i);
    });
    const S = path.map(([ix, iy]) => { const [dx, dy] = iso(ix, iy, 0); return [x + dx, y + dy]; });
    const root = zbox(el);
    const sv = svgAt(root);
    if (o.line !== false) s('polyline', { points: P(S), fill: 'none', stroke: 'rgba(19,32,44,.32)', 'stroke-width': 3, 'stroke-dasharray': '2 11', 'stroke-linecap': 'round' }, sv);
    const trail = s('polyline', { points: '', fill: 'none', stroke: 'rgba(19,32,44,.6)', 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, sv);
    const tok = tokenShape(sv, o.tone || 'white', o.scale ?? 1);
    const { segs, times, end } = schedule(S, at, speed, hold);
    return {
      el: root, times, end: end + (hold[S.length - 1] || 0),
      render(lt) {
        const { p, k } = posAt(segs, S, lt);
        const ap = prog(lt, at - 0.3, 0.3, ease.inQuad);   // 시작 점에 작게 내려앉는다
        tok.setAttribute('transform', `translate(${p[0].toFixed(1)} ${(p[1] - (1 - ap) * 80).toFixed(1)})`);
        tok.style.opacity = lt < at - 0.3 ? '0' : '1';
        trail.setAttribute('points', lt <= at ? '' : P(S.slice(0, k + 1).concat([p])));
      },
    };
  };

  // ── 치수선 ──
  THEME.dim = (el, value, o = {}) => {
    const [x1, y1] = o.from, [x2, y2] = o.to, at = o.at ?? 0.3;
    const L = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / L, uy = (y2 - y1) / L, nx = -uy, ny = ux, tk = 16;
    const root = zbox(el);
    const sv = svgAt(root);
    const main = seg(sv, [x1, y1], [x1, y1], { stroke: INK, sw: 2 });
    const t1 = seg(sv, [x1 - nx * tk, y1 - ny * tk], [x1 + nx * tk, y1 + ny * tk], { stroke: INK, sw: 2.5 });
    const t2 = seg(sv, [x2 - nx * tk, y2 - ny * tk], [x2 + nx * tk, y2 + ny * tk], { stroke: INK, sw: 2.5 });
    const num = h('div', 'p1-dim-num', root);
    num.textContent = value;
    if (o.unit) { const u = h('small', '', num); u.textContent = o.unit; }
    if (o.size) num.style.fontSize = o.size + 'px';
    if (o.font === 'body') css(num, { fontFamily: 'var(--body)', fontWeight: '700', letterSpacing: '-0.01em' });   // 낱말을 잴 때(생성형 AI, 에이전트)
    if (o.unitSize) { const u = num.querySelector('small'); if (u) css(u, { fontSize: o.unitSize + 'px', fontWeight: '700' }); }
    if (o.color) num.style.color = o.color;
    const side = o.side || (Math.abs(uy) > Math.abs(ux) ? 'right' : 'above');
    const pp = o.pos ?? 0.5;   // 글자 자리: 0 은 from 끝, 1 은 to 끝, 0.5 는 가운데
    const mx = lerp(x1, x2, pp), my = lerp(y1, y2, pp);
    const place = { right: [mx + 28, my, 'translate(0, -50%)'], left: [mx - 28, my, 'translate(-100%, -50%)'],
      above: [mx, my - 22, 'translate(-50%, -100%)'], below: [mx, my + 22, 'translate(-50%, 0)'] }[side];
    css(num, { left: place[0] + 'px', top: place[1] + 'px', transformOrigin: '50% 50%' });
    const drawEnd = at + 0.4, numAt = drawEnd + 0.06;
    return {
      el: root, num, end: numAt + 0.2,
      render(lt) {
        const p = prog(lt, at, 0.4, ease.inOutCubic);
        main.setAttribute('x2', lerp(x1, x2, p).toFixed(1)); main.setAttribute('y2', lerp(y1, y2, p).toFixed(1));
        main.style.opacity = lt < at ? '0' : '1';
        t1.style.opacity = lt < at ? '0' : '1';
        t2.style.opacity = p >= 0.98 ? '1' : '0';
        const q = prog(lt, numAt, 0.14, ease.outQuad);   // 숫자는 굴리지 않고 한 번에 찍는다
        num.style.opacity = lt < numAt ? '0' : '1';
        num.style.transform = `${place[2]} scale(${lerp(1.15, 1, q).toFixed(3)})`;
      },
    };
  };

  // ── 머리말 ──
  THEME.header = (el, o = {}) => {
    const wrap = h('div', 'p1-head', el);
    const ic = s('svg', { width: 30, height: 30, viewBox: '-17 -20 34 36' }, wrap);
    box(ic, 18, 18, 12, 0, TONES.cobalt);
    const part = String((window.DECK && DECK.cfg && DECK.cfg.part) || 'p1').replace(/\D/g, '') || '1';
    const n = typeof o.chapter === 'number' ? o.chapter : parseInt(String(o.chapter || '').replace(/\D/g, ''), 10);
    const t = h('span', '', wrap);
    t.textContent = `파트 ${part}` + (n ? ` · ${n}장` : '');
    if (o.title) { const b = h('b', '', wrap); b.textContent = o.title; }
    let fic = null;
    if (o.fiction) { fic = h('div', 'p1-fiction', el); fic.textContent = '가상 사례'; }
    return { el: wrap, fiction: fic, render() {} };
  };

  // ── 제목 ──
  // 아래 jamo 영역 나눔은 예전 조립 동작이 쓰던 것이다. 지금 제목은 조각을 만들지 않는다.
  // 영역 비율은 Paperlogy 800 스틸로 맞췄다(글자 상자 기준 [x0, y0, x1, y1]).
  const VERT = new Set([0, 1, 2, 3, 4, 5, 6, 7, 20]);       // ㅏㅐㅑㅒㅓㅔㅕㅖㅣ: 초성 왼쪽 | 중성 오른쪽
  const MIX = new Set([9, 10, 11, 14, 15, 16, 19]);          // ㅘㅙㅚㅝㅞㅟㅢ
  const JAMO = { vx: 0.6, mx: 0.62, my: 0.5, jb: 0.6 };
  THEME.JAMO = JAMO;
  function jamo(ch) {
    const c = ch.charCodeAt(0) - 0xac00;
    if (c < 0 || c > 11171) return [{ r: [0, 0, 1, 1], dir: 'up' }];
    const jung = Math.floor((c % 588) / 28), jong = c % 28, yb = jong ? JAMO.jb : 1;
    let top;
    if (VERT.has(jung)) top = [{ r: [0, 0, JAMO.vx, yb], dir: 'up' }, { r: [JAMO.vx, 0, 1, yb], dir: 'dr' }];
    else if (MIX.has(jung)) top = [{ r: [0, 0, JAMO.mx, yb * JAMO.my], dir: 'up' }, { r: [0, yb * JAMO.my, JAMO.mx, yb], dir: 'dl' }, { r: [JAMO.mx, 0, 1, yb], dir: 'dr' }];
    else top = [{ r: [0, 0, 1, yb * JAMO.my], dir: 'up' }, { r: [0, yb * JAMO.my, 1, yb], dir: 'dr' }];
    return jong ? top.concat([{ r: [0, yb, 1, 1], dir: 'dl' }]) : top;
  }
  const DIRS = { up: [0, -1], dl: [-C30, S30], dr: [C30, S30] };
  const SHADE_OF = { up: 'top', dl: 'left', dr: 'right' };
  THEME.title = (el, text, o = {}) => {
    const size = o.size ?? 88, at = o.at ?? 0.15, tn = tone(o.tone || 'cobalt');
    const box_ = h('div', 'p1-title display' + (o.cls ? ' ' + o.cls : ''), el);
    css(box_, { fontSize: size + 'px' });
    if (o.x != null) css(box_, { position: 'absolute', left: o.x + 'px', top: (o.y ?? 0) + 'px' });
    else box_.style.position = 'relative';
    if (o.w) box_.style.maxWidth = o.w + 'px';
    if (o.color) box_.style.color = o.color;
    const seg_ = new Intl.Segmenter('ko', { granularity: 'grapheme' });
    const syls = [];
    // em: 코발트로 끝나는 글자 묶음(문자열 배열). 맞물린 뒤 --ink 대신 코발트가 된다
    const src = String(text), emAt = new Array(src.length).fill(false);
    (o.em || []).forEach(wd => { let i = src.indexOf(wd); while (wd && i >= 0) { for (let k = i; k < i + wd.length; k++) emAt[k] = true; i = src.indexOf(wd, i + wd.length); } });
    let off = 0;
    const parts = src.split(/(\n| +)/);
    parts.forEach(part => {
      if (!part) return;
      if (part === '\n') { h('br', '', box_); off += 1; return; }
      if (/^ +$/.test(part)) { box_.appendChild(document.createTextNode(' ')); off += part.length; return; }
      const word = h('span', 'p1-word', box_);
      for (const { segment } of seg_.segment(part)) {
        const fin = emAt[off] ? '#2A55E5' : (o.color || INK);
        off += segment.length;
        const sy = h('span', 'p1-syl', word);
        const base = h('span', 'p1-base', sy); base.textContent = segment;
        base.style.color = fin;
        syls.push({ el: sy, base, fin });
      }
    });
    // 조각이 날아와 맞물리는 동작은 뺐다(2026-11-27 사용자 지시). 제목 전체가 at 부터 0.25초 동안 나타난다
    const FADE = 0.25, end = at + FADE;
    box_.style.opacity = '0';
    const lines = Math.max(1, Math.round(box_.offsetHeight / (size * 1.08)));
    if (o.maxLines && lines > o.maxLines) console.warn(`[DECK] p1 제목 줄 수 초과(${lines} > ${o.maxLines}): ${text}`);
    return {
      el: box_, end, lines,
      render(lt) { box_.style.opacity = clamp((lt - at) / FADE).toFixed(3); },
    };
  };

  // ── 카드: 정면 판 ──
  THEME.card = (el, o = {}) => {
    const x = o.x ?? 120, y = o.y ?? 300, w = o.w ?? 600, dep = o.depth ?? 14, at = o.at ?? 0.2, tn = o.tone || 'white';
    const root = h('div', 'p1-card', el);
    css(root, { left: x + 'px', top: y + 'px', width: w + 'px' });
    const sv = s('svg', { width: 1, height: 1 }, root);
    const face = h('div', 'p1-face' + (tn !== 'white' ? ' is-' + tn : ''), root);
    if (o.h) face.style.height = o.h + 'px';
    if (o.pad != null) face.style.padding = o.pad;
    if (o.cap) { const c = h('span', 'p1-cap', face); c.textContent = o.cap; }
    if (o.text != null) { const t = h('div', '', face); t.textContent = o.text; }
    if (o.html != null) h('div', '', face, o.html);
    let drawn = false;
    const enter = o.enter || 'drop';
    const land = at + (enter === 'drop' ? 0.35 : 0.4);
    return {
      el: root, face, land, end: land + 0.3,
      render(lt) {
        if (!drawn) { slab(sv, face.offsetWidth, face.offsetHeight, dep, { top: tone(tn).top, right: tone(tn).right }); drawn = true; }
        if (enter === 'drop') {
          const k = dropState(lt, at, o.drop ?? 220);
          root.style.transformOrigin = '50% 100%';
          root.style.transform = `translate(0px, ${(-k.dy).toFixed(1)}px) scale(${k.sx.toFixed(4)}, ${k.sy.toFixed(4)})`;
          root.style.opacity = k.op.toFixed(3);
        } else {   // 등각 축(왼쪽 아래)에서 미끄러져 들어와 맞물린다
          const p = prog(lt, at, 0.4, ease.outCubic), dd = (1 - p) * 160;
          const q = lt - land, sq = q >= 0 && q < 2 * F ? ' scale(1.02, 0.96)' : '';
          root.style.transformOrigin = '50% 100%';
          root.style.transform = `translate(${(-dd * C30).toFixed(1)}px, ${(dd * S30).toFixed(1)}px)${sq}`;
          root.style.opacity = lt < at ? '0' : clamp(p / 0.25).toFixed(3);
        }
      },
    };
  };

  // ── 단계 표시: 계단 블록 ──
  THEME.step = (el, n, total, o = {}) => {
    const x = o.x ?? 150, y = o.y ?? 200, size = o.size ?? 54, base = o.base ?? 40, rise = o.rise ?? 16, at = o.at ?? 0.1;
    const root = h('div', 'p1-step', el);
    css(root, { left: '0px', top: '0px' });
    const blocks = [];
    const gap = o.gap ?? 1.22;
    for (let k = total - 1; k >= 0; k--) {   // 먼 블록(오른쪽 위)부터 만든다
      const [dx, dy] = iso(0, -k * size * gap, 0);
      const now = k + 1 === n, hh = base + k * rise;
      const b = THEME.block(root, { x: x + dx, y: y + dy, w: size, d: size, h: hh, tone: k + 1 < n ? 'white' : now ? 'cobalt' : 'ghost',
        at: now ? at : -1, drop: 160, shadow: k + 1 <= n });
      const lb = h('div', 'p1-step-no' + (now ? ' is-now' : ''), b.body);
      const [fx, fy] = iso(size / 2, 0, hh / 2);   // 오른면 가운데(앞 블록에 가리지 않는다)
      css(lb, { left: fx + 'px', top: fy + 'px' });
      lb.textContent = String(k + 1);
      if (k + 1 > n) lb.style.color = '#4B5A68';
      blocks.push(b);
    }
    const [ex] = iso(0, -(total - 1) * size * gap, 0);
    const txt = h('div', 'p1-step-txt', root);
    css(txt, { left: (x + ex + size * C30 + 24) + 'px', top: (y - 18) + 'px', transform: 'translateY(-50%)' });
    txt.innerHTML = `<b>${n}</b> / ${total}단계`;
    if (o.text) { const sm = h('div', '', txt); sm.textContent = o.text; sm.style.color = 'var(--ink)'; }
    const end = at + 0.7;
    return {
      el: root, end,
      render(lt) {
        blocks.forEach(b => b.render(lt));
        const p = prog(lt, at + 0.2, 0.35, ease.snap);
        txt.style.opacity = p.toFixed(3);
        txt.style.transform = `translate(${((1 - p) * -18).toFixed(1)}px, -50%)`;
      },
    };
  };

  // ── 배경 ──
  function gridPatch(parent, rect, o = {}) {
    const [gx, gy, gw, gh] = rect, sp = o.spacing ?? 64, fade = 120;
    const wrap = h('div', 'p1-grid', parent);
    const m = `linear-gradient(to right, transparent, #000 ${fade}px, #000 calc(100% - ${fade}px), transparent), linear-gradient(to bottom, transparent, #000 ${fade}px, #000 calc(100% - ${fade}px), transparent)`;
    css(wrap, { position: 'absolute', left: gx + 'px', top: gy + 'px', width: gw + 'px', height: gh + 'px', overflow: 'hidden',
      maskImage: m, webkitMaskImage: m, maskComposite: 'intersect', webkitMaskComposite: 'source-in' });
    const sv = s('svg', { width: gw, height: gh }, wrap);
    const t = Math.tan(Math.PI / 6), span = gw * t;
    const ox = (o.origin ? o.origin[0] : 0) - gx, oy = (o.origin ? o.origin[1] : 0) - gy;
    const c0 = ((oy - t * ox) % sp + sp) % sp, c1 = ((oy + t * ox) % sp + sp) % sp;
    for (let c = c0 - Math.ceil(span / sp) * sp; c < gh + span; c += sp) seg(sv, [0, c], [gw, c + span], { stroke: 'rgba(19,32,44,.14)', sw: 1.2 });
    for (let c = c1; c < gh + span * 2; c += sp) seg(sv, [0, c], [gw, c - span], { stroke: 'rgba(19,32,44,.14)', sw: 1.2 });
    return wrap;
  }
  // 바닥을 천천히 도는 작은 서류 토큰(배경의 반복 움직임, ctx.amb)
  function loopToken(parent, cx, cy, A, B, o = {}) {
    const S = [[-A, -B], [A, -B], [A, B], [-A, B], [-A, -B]].map(([ix, iy]) => { const [dx, dy] = iso(ix, iy, 0); return [cx + dx, cy + dy]; });
    const sv = svgAt(parent);
    const tok = tokenShape(sv, o.tone || 'white', o.scale ?? 0.8);
    const speed = o.speed ?? 26, pause = o.pause ?? 0.8;
    const { segs, end } = schedule(S, 0, speed, { 1: pause, 2: pause, 3: pause, 4: pause });
    const period = end + pause;
    return {
      render(amb) {
        const t = ((amb + (o.phase ?? 0)) % period + period) % period;
        const { p } = posAt(segs, S, t);
        tok.setAttribute('transform', `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})`);
      },
    };
  }
  THEME.bg = (el, variant = 'base', o = {}) => {
    const root = h('div', 'p1-bg full', el);
    root.style.pointerEvents = 'none';
    const fl = o.floor === false ? null : (o.floor || (variant === 'accent' ? [820, 300, 1100, 780] : [700, 260, 1220, 820]));
    if (fl) gridPatch(root, fl, { origin: o.origin });
    const parts = [];
    if (variant === 'lab') {
      const band = svgAt(root);
      poly(band, [[0, 0], [30, 0], [30, 1080], [0, 1080]], TONES.amber.left, { stroke: 'none' });
      poly(band, [[30, 0], [40, -6], [40, 1080], [30, 1080]], TONES.amber.right, { stroke: 'none' });
      seg(band, [30, 0], [30, 1080], { stroke: EDGE });
    }
    if (variant === 'accent') {
      const b = THEME.block(root, { x: o.bx ?? 1730, y: o.by ?? 1010, w: 440, d: 380, h: 200, tone: 'cobalt', at: -1 });   // 오른쪽 아래 모서리에 일부만 보인다
      parts.push(b);
    }
    if ((variant === 'base' && o.props !== false) || o.props === true) {
      parts.push(THEME.block(root, { x: 1792, y: 958, w: 92, d: 92, h: 64, at: -1 }));
      parts.push(THEME.block(root, { x: 1690, y: 1030, w: 64, d: 64, h: 30, at: -1 }));
    }
    let tok = null;
    if (fl && (variant === 'accent' ? o.token === true : o.token !== false)) {   // 강조 바탕은 토큰이 큰 블록과 겹치지 않게 기본으로 끈다
      const cx = o.tokenAt ? o.tokenAt[0] : fl[0] + fl[2] / 2, cy = o.tokenAt ? o.tokenAt[1] : fl[1] + fl[3] / 2;
      tok = loopToken(root, cx, cy, o.tokenA ?? 300, o.tokenB ?? 170, { phase: o.phase ?? 0 });
    }
    return {
      el: root,
      render(lt, ctx) {
        parts.forEach(b => b.render(lt));
        if (tok) tok.render(ctx ? ctx.amb : lt);
      },
    };
  };

  // ── 인물 ──
  const PEOPLE = {
    '한서윤': { name: '한서윤 주임', dept: '고객지원팀', hair: 'bob', acc: null, sym: 'bubble' },
    '오민석': { name: '오민석 팀장', dept: '고객지원팀', hair: 'short', acc: 'tie', sym: 'stamp' },
    '정하준': { name: '정하준 대리', dept: '정보화팀', hair: 'short', acc: 'lanyard', sym: 'lock' },
    '윤지영': { name: '윤지영 본부장', dept: '경영지원본부', hair: 'tied', acc: 'collar', sym: 'flag' },
  };
  THEME.people = PEOPLE;
  function symbolIcon(g, kind) {
    const st = { stroke: INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
    if (kind === 'bubble') {
      s('path', { d: 'M -19 -38 H 19 V -14 H 0 L -10 -5 L -8 -14 H -19 Z', fill: '#FFFFFF', ...st }, g);
    } else if (kind === 'stamp') {
      s('circle', { cx: 0, cy: -34, r: 6, fill: TONES.amber.left, ...st }, g);
      s('path', { d: 'M -4 -28 V -21 H 4 V -28', fill: TONES.amber.left, ...st }, g);
      s('path', { d: 'M -15 -21 H 15 V -9 H -15 Z', fill: TONES.amber.left, ...st }, g);
      s('path', { d: 'M -17 -4 H 17', fill: 'none', ...st, stroke: TONES.amber.right, 'stroke-width': 4 }, g);
    } else if (kind === 'lock') {
      s('path', { d: 'M -9 -20 V -27 A 9 9 0 0 1 9 -27 V -20', fill: 'none', ...st }, g);
      s('path', { d: 'M -14 -20 H 14 V -3 H -14 Z', fill: '#FFFFFF', ...st }, g);
      s('circle', { cx: 0, cy: -12, r: 2.8, fill: INK }, g);
    } else if (kind === 'flag') {
      s('path', { d: 'M -12 -3 V -40', fill: 'none', ...st }, g);
      s('path', { d: 'M -12 -40 L 15 -32 L -12 -24 Z', fill: '#FFFFFF', ...st }, g);
    }
  }
  THEME.figure = (el, who, o = {}) => {
    const pp = PEOPLE[who] || { name: who, dept: '', hair: 'short', acc: null, sym: null };
    const sc = o.scale ?? 1.3, x = o.x ?? 960, y = o.y ?? 700, at = o.at ?? 0.2, land = at + 0.35;
    const r = 20, rx = r * 1.2247, ry = r * 0.7071, H = 66, hr = 17, hy = -(H + hr + 3);
    const root = zbox(el);
    css(root, { left: x + 'px', top: y + 'px' });
    const shv = svgAt(root);
    s('ellipse', { cx: (14 * sc).toFixed(1), cy: (5 * sc).toFixed(1), rx: (rx * 1.25 * sc).toFixed(1), ry: (ry * 1.05 * sc).toFixed(1), fill: SHADE }, shv);
    const body = zbox(root);
    body.style.transformOrigin = '0px 0px';
    const sv = svgAt(body);
    const g = s('g', { transform: `scale(${sc})` }, sv);
    let symG = null;
    if (pp.sym && o.symbol !== false) {   // 인물 기호 블록: 오른쪽 뒤의 작은 흰 블록 윗면에 기호를 얹는다
      const sx = 0, sy = -58, [bx, by] = iso(sx, sy, 0);
      const sb = s('g', { transform: `translate(${bx.toFixed(1)} ${by.toFixed(1)})` }, g);
      poly(sb, shadowPts(34, 34, 24), SHADE, { stroke: 'none' });
      box(sb, 34, 34, 24, 0, TONES.white);
      symG = s('g', { transform: `translate(${bx.toFixed(1)} ${(by - 24 + 4).toFixed(1)})` }, g);
      symbolIcon(symG, pp.sym);
    }
    const st = { stroke: EDGE, 'stroke-width': 1.5, 'vector-effect': 'non-scaling-stroke', 'stroke-linejoin': 'round' };
    s('path', { d: `M ${-rx} ${-H} L ${-rx} 0 A ${rx} ${ry} 0 0 0 0 ${ry} L 0 ${-H + ry} A ${rx} ${ry} 0 0 1 ${-rx} ${-H} Z`, fill: TONES.white.left, ...st }, g);
    s('path', { d: `M 0 ${ry} A ${rx} ${ry} 0 0 0 ${rx} 0 L ${rx} ${-H} A ${rx} ${ry} 0 0 1 0 ${-H + ry} Z`, fill: TONES.white.right, ...st }, g);
    s('ellipse', { cx: 0, cy: -H, rx, ry, fill: '#FFFFFF', ...st }, g);
    const HAIR = TONES.slate.left;
    if (pp.acc === 'tie') s('path', { d: `M -4 ${-H + ry + 1} H 4 L 6 ${-H * 0.42} L 0 ${-H * 0.3} L -6 ${-H * 0.42} Z`, fill: HAIR, ...st }, g);
    if (pp.acc === 'lanyard') {
      s('path', { d: `M -11 ${-H + ry - 1} L 0 ${-H * 0.5} L 11 ${-H + ry - 1}`, fill: 'none', stroke: INK, 'stroke-width': 1.6, 'vector-effect': 'non-scaling-stroke' }, g);
      s('path', { d: `M -8 ${-H * 0.5} H 8 V ${-H * 0.5 + 16} H -8 Z`, fill: '#FFFFFF', ...st }, g);
    }
    if (pp.acc === 'collar') {
      s('path', { d: `M ${-rx * 0.75} ${-H + 4} L -2 ${-H + ry + 6} L ${-rx * 0.55} ${-H * 0.5} Z`, fill: HAIR, ...st }, g);
      s('path', { d: `M ${rx * 0.75} ${-H + 4} L 2 ${-H + ry + 6} L ${rx * 0.55} ${-H * 0.5} Z`, fill: HAIR, ...st }, g);
    }
    if (pp.hair === 'tied') s('circle', { cx: -hr * 0.95, cy: hy - hr * 0.55, r: hr * 0.45, fill: HAIR, ...st }, g);
    if (pp.hair === 'bob') {   // 턱선 길이 단발: 머리 뒤에 깔리는 머리카락 덩어리(얼굴보다 넓고 턱까지 내려온다)
      const a = hr * 1.28;
      s('path', { d: `M ${-a} ${hy + hr * 0.92} L ${-a} ${hy - hr * 0.1} A ${a} ${a * 0.95} 0 0 1 ${a} ${hy - hr * 0.1} L ${a} ${hy + hr * 0.92} Z`, fill: HAIR, ...st }, g);
    }
    s('circle', { cx: 0, cy: hy, r: hr, fill: '#FFFFFF', ...st }, g);
    s('path', { d: `M ${hr * 0.2} ${hy + hr * 0.95} A ${hr} ${hr} 0 0 0 ${hr * 0.98} ${hy + hr * 0.2} A ${hr * 1.3} ${hr * 1.3} 0 0 1 ${hr * 0.2} ${hy + hr * 0.95} Z`, fill: TONES.white.left, stroke: 'none' }, g);
    {   // 앞머리(정수리를 덮는 모자꼴). 단발은 앞머리가 조금 더 내려온다
      const a = hr * 1.06, f = pp.hair === 'bob' ? 0.02 : -0.12;
      s('path', { d: `M ${-a} ${hy + hr * 0.1} A ${a} ${a} 0 0 1 ${a} ${hy + hr * 0.1} L ${hr * 0.85} ${hy + hr * f} Q 0 ${hy - hr * 0.55} ${-hr * 0.85} ${hy + hr * f} Z`, fill: HAIR, ...st }, g);
    }
    const tag = h('div', 'p1-tag' + (o.big ? ' is-big' : ''), root);   // big: 이름표 44px(인물 줄 레이아웃)
    tag.textContent = pp.name;
    if (o.first && pp.dept) { const sm = h('small', '', tag); sm.textContent = pp.dept; }
    if (o.role) {   // 하는 일 한 줄(34px, 이름표 아래). roleW 폭에서 접는다
      const rl = h('div', 'p1-role', tag); rl.textContent = o.role;
      if (o.roleW) css(rl, { width: o.roleW + 'px' });
    }
    css(tag, { left: '0px', top: ((ry + 12) * sc) + 'px' });
    return {
      el: root, land, end: land + 0.5,
      render(lt) {
        const k = dropState(lt, at, o.drop ?? 300);
        body.style.transform = `translate(0px, ${(-k.dy).toFixed(1)}px) scale(${k.sx.toFixed(4)}, ${k.sy.toFixed(4)})`;
        body.style.opacity = k.op.toFixed(3);
        const g2 = prog(lt, land - 0.15, 0.15, ease.outQuad);
        shv.style.opacity = g2.toFixed(3);
        const p = prog(lt, land + 0.05, 0.3, ease.snap);
        tag.style.opacity = p.toFixed(3);
        tag.style.transform = `translate(-50%, ${((1 - p) * 12).toFixed(1)}px)`;
      },
    };
  };

  // ── 사례 사물 ──
  THEME.item = (el, kind, o = {}) => {
    const lab = o.label === false ? null : (o.label ?? kind);
    const base = { x: o.x, y: o.y, z: o.z, at: o.at, drop: o.drop, labelPos: o.labelPos, pin: o.pin, shadow: o.shadow, note: o.note, label: lab, labelTone: o.labelTone };
    if (kind === '민원 글') return THEME.block(el, { ...base, w: o.w ?? 150, d: o.d ?? 112, h: 14, tone: 'white', fold: true, lines: 3 });
    if (kind === '규정집') return THEME.block(el, { ...base, w: o.w ?? 150, d: o.d ?? 112, h: o.h ?? 72, tone: 'white', layers: o.layers ?? 6 });
    if (kind === '답변 초안') return THEME.block(el, { ...base, w: o.w ?? 150, d: o.d ?? 112, h: 20, tone: 'cobalt', lines: 3, lineColor: 'rgba(255,255,255,.75)' });
    if (kind === '승인 기록') {
      const plate = THEME.block(el, { ...base, pin: o.pin ?? 84, w: o.w ?? 150, d: o.d ?? 112, h: 14, tone: 'white', lines: 2 });
      const stampAt = o.stampAt ?? (o.at ?? 0) + 0.8;
      const stamp = THEME.block(el, { x: o.x, y: o.y, z: (o.z ?? 0) + 14, w: 44, d: 44, h: 34, tone: 'amber', at: stampAt, shadow: false, drop: 260 });
      return { el: plate.el, land: plate.land, stamp, stampLand: stamp.land, end: Math.max(plate.end, stamp.end), top: plate.top,
        render(lt) { plate.render(lt); stamp.render(lt); } };
    }
    if (kind === '시험표') {
      const cols = o.cols ?? 4, rows = o.rows ?? 3, w = o.w ?? 260, d = o.d ?? 190, z0 = o.z ?? 0;
      // 칸 블록이 판보다 나중에 그려져 위쪽 이름표를 가리므로 이름표 기본 자리는 오른쪽이다
      const plate = THEME.block(el, { ...base, labelPos: o.labelPos ?? 'right', pin: o.pin ?? 64, w, d, h: 12, tone: 'white' });
      const cells = o.cells || [], cw = (w - 20) / cols, cd = (d - 20) / rows, list = [];
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) list.push({ r, c, i: r * cols + c });
      list.sort((a, b) => (a.r + a.c) - (b.r + b.c));
      const cellAt = o.cellAt ?? (o.at ?? 0) + 0.6;
      const blocks = list.map(q => {
        const st = cells[q.i];
        const [dx, dy] = iso(-w / 2 + 10 + (q.c + 0.5) * cw, -d / 2 + 10 + (q.r + 0.5) * cd, 0);
        if (!st) return null;
        return THEME.block(el, { x: (o.x ?? 960) + dx, y: (o.y ?? 600) + dy, z: z0 + 12, w: cw - 8, d: cd - 8, h: st === 'pass' ? 20 : 4,
          tone: st === 'pass' ? 'white' : 'slate', at: cellAt + q.i * 0.08, grow: true, shadow: false });
      }).filter(Boolean);
      return { el: plate.el, land: plate.land, end: Math.max(plate.end, cellAt + cells.length * 0.08 + 0.5), top: plate.top,
        render(lt) { plate.render(lt); blocks.forEach(b => b.render(lt)); } };
    }
    return THEME.block(el, { ...base, w: o.w ?? 140, d: o.d ?? 110, h: o.h ?? 40, tone: o.tone });
  };

  // ── 누끼 소품 ──
  // crop: 그림에서 불투명한 영역(가로·세로 0~1), r: 바닥면 비율 w / (w + d), hr: 불투명 영역의 세로 / 가로.
  // 2026-11-23 생성본에서 잰 값이다. 그림을 다시 만들면 다시 잰다.
  const CUTS = {
    'p1-key-counter': { crop: [0.105, 0.197, 0.9162, 0.8929], r: 0.185, hr: 0.858 },
    'p1-key-rules': { crop: [0.1246, 0.195, 0.8754, 0.8188], r: 0.483, hr: 0.831 },
    'p1-key-figure': { crop: [0.3396, 0.1013, 0.6587, 0.895], r: 0.5, hr: 2.489 },
  };
  THEME.cutouts = CUTS;
  THEME.cutout = (el, id, o = {}) => {
    const c = CUTS[id] || { crop: [0, 0, 1, 1], r: 0.5, hr: 1 }, cr = o.crop || c.crop;
    const size = o.size ?? 360;                        // 화면에서 소품이 차지하는 폭(px)
    const sum = size / C30, w = sum * (o.r ?? c.r), d = sum - w;
    const hh = Math.max(4, size * (o.hr ?? c.hr) - sum / 2);
    // (x, y)는 블록과 같이 바닥면 가운데다. 이름표 핀은 소품 뒤쪽 윗면을 넘도록 기본 길이를 잡는다
    const b = THEME.block(el, Object.assign({}, o, { w, d, h: hh, tone: o.tone || 'white', hide: !!o.src, pin: o.pin ?? Math.round(sum / 4 + 30) }));
    if (!o.src) return b;   // 그림이 없으면 같은 크기의 흰 블록이 놓인다
    const im = R.img(o.src);
    const iw = size / (cr[2] - cr[0]), ih = iw * (o.aspect ?? 1);
    // 색은 역할을 뜻할 때만 칠하므로 생성 그림의 색 띠는 기본으로 회색조로 바꾼다(mono: false 면 그대로)
    css(im, { position: 'absolute', left: (-size / 2 - cr[0] * iw).toFixed(1) + 'px', top: (sum / 4 - cr[3] * ih).toFixed(1) + 'px',
      width: iw.toFixed(1) + 'px', height: ih.toFixed(1) + 'px', filter: o.mono === false ? 'none' : 'grayscale(1)' });
    b.body.insertBefore(im, b.body.querySelector('.p1-tag, .p1-pin'));   // 그림은 이름표 아래에 둔다
    return b;
  };

  // ── 화면 캡처 틀 ──
  const SHOT = { wide: [1200, 750], full: [1440, 810], tall: [600, 900] };
  THEME.chatgpt = (parent, o = {}) => {
    const el = h('div', 'p1-gpt', parent);
    const top = h('div', 'p1-gpt-top', el);
    if (o.top) { const b = h('div', 'p1-gpt-btn', top); b.textContent = o.top; }
    const u = h('div', 'p1-gpt-url', top); u.textContent = o.url || 'chatgpt.com';
    const body = h('div', 'p1-gpt-body', el);
    const inp = h('div', 'p1-gpt-input', el);
    const plus = h('div', 'p1-plus', inp); plus.textContent = '+';
    const it = h('div', '', inp); it.textContent = o.input || '';
    const send = h('div', 'p1-send', inp); send.textContent = '↑';
    const chat = o.chat ? KIT.chat(body, o.chat, Object.assign({ style: { inset: '0' } }, o.chatOpts || {})) : null;
    return { el, body, chat, end: chat ? chat.end : 0, render(lt) { if (chat) chat.render(lt); } };
  };
  THEME.shot = (el, src, o = {}) => {
    const [W, H] = SHOT[o.size] || SHOT.wide;
    const pad = 12, x = o.x ?? 120, y = o.y ?? 200, at = o.at ?? 0.1, CW = W + pad * 2, CH = H + pad * 2;
    const root = h('div', 'p1-shot', el);
    css(root, { left: (x - pad) + 'px', top: (y - pad) + 'px', width: CW + 'px', height: CH + 'px' });
    const sv = s('svg', { width: 1, height: 1 }, root);
    // 블록 받침: 카드가 윗면 가운데에 선다
    const ex = 40, fy = CH + 12, fh = 28, pd = 48, pdx = pd * C30, pdy = pd * S30, L = 30, vx = L * C30, vy = L * S30;
    const A = [-ex, fy + fh], B = [CW + ex, fy + fh], Cc = [CW + ex + pdx, fy + fh - pdy], Dd = [-ex + pdx, fy + fh - pdy];
    poly(sv, [Dd, Cc, [Cc[0] + vx, Cc[1] + vy], [B[0] + vx, B[1] + vy], [A[0] + vx, A[1] + vy], A], SHADE, { stroke: 'none' });
    poly(sv, [[CW + ex, fy], [CW + ex + pdx, fy - pdy], [CW + ex + pdx, fy + fh - pdy], [CW + ex, fy + fh]], TONES.white.right);
    poly(sv, [[-ex, fy], [CW + ex, fy], [CW + ex + pdx, fy - pdy], [-ex + pdx, fy - pdy]], TONES.white.top);
    poly(sv, [[-ex, fy], [CW + ex, fy], [CW + ex, fy + fh], [-ex, fy + fh]], TONES.white.left);
    const card = zbox(root);
    css(card, { width: CW + 'px', height: CH + 'px' });
    const csv = s('svg', { width: 1, height: 1 }, card);
    css(csv, { position: 'absolute', left: '0px', top: '0px', overflow: 'visible' });
    slab(csv, CW, CH, 14, { shadow: 0 });
    const face = h('div', 'p1-shot-card', card);
    css(face, { left: '0px', top: '0px', width: CW + 'px', height: CH + 'px' });
    const screen = h('div', 'p1-screen', face);
    css(screen, { width: W + 'px', height: H + 'px' });
    let drawn = null, img = null;
    if (o.chat || o.draw || !src) {   // 그린 화면은 캡처가 없을 때 보이고, 캡처가 들어오면 그 아래에 가려진다
      if (o.draw) drawn = { el: o.draw(screen) || screen.lastChild, render() {}, end: 0 };
      else drawn = THEME.chatgpt(screen, o);
    }
    if (src) {
      img = R.img(src);
      screen.appendChild(img);
      img.addEventListener('load', () => { if (drawn && drawn.el) drawn.el.style.display = 'none'; });
      img.addEventListener('error', () => { img.remove(); img = null; if (drawn && drawn.el) drawn.el.style.display = ''; });
    }
    const msv = s('svg', { width: 1, height: 1, class: 'p1-marks' }, face);
    const marks = (o.marks || []).map(m => {
      const r = s('rect', { x: (pad + m.x * W).toFixed(1), y: (pad + m.y * H).toFixed(1), width: (m.w * W).toFixed(1), height: (m.h * H).toFixed(1),
        fill: 'none', stroke: '#2A55E5', 'stroke-width': 5, 'stroke-linejoin': 'miter' }, msv);
      r._len = 2 * (m.w * W + m.h * H);
      r.style.strokeDasharray = r._len;
      return r;
    });
    const land = at + 0.35, chatEnd = drawn && drawn.chat ? drawn.end : 0;
    const markAt = o.markAt ?? Math.max(land + 0.4, chatEnd + 0.2);
    return {
      el: root, screen, drawn: !!drawn && !src, chat: drawn ? drawn.chat : null, land,
      end: Math.max(land + 0.3, chatEnd, marks.length ? markAt + 0.5 : 0),
      render(lt) {
        const k = dropState(lt, at, o.drop ?? 140);
        card.style.transformOrigin = `${CW / 2}px ${CH}px`;
        card.style.transform = `translate(0px, ${(-k.dy).toFixed(1)}px) scale(${k.sx.toFixed(4)}, ${k.sy.toFixed(4)})`;
        card.style.opacity = k.op.toFixed(3);
        sv.style.opacity = prog(lt, at - 0.1, 0.25, ease.outQuad).toFixed(3);
        if (drawn) drawn.render(lt);
        marks.forEach((m, i) => { const p = prog(lt, markAt + i * 0.15, 0.45, ease.inOutCubic); m.style.strokeDashoffset = (m._len * (1 - p)).toFixed(1); m.style.opacity = p > 0 ? '1' : '0'; });
      },
    };
  };

  // ── 영상 제목(인트로·전환) ──
  // 영상이 없을 때 그리는 장면: 영상과 같은 내용을 블록으로 보여 준다
  function fallbackScene(root, kind, cx, cy, at) {
    const parts = [];
    gridPatch(root, [cx - 420, cy - 360, 840, 720], { origin: [cx, cy] });
    let tok = null;
    const B = (q) => { const b = THEME.block(root, q); parts.push(b); return b; };
    const at2 = (k) => at + 0.15 + k * 0.14;
    if (kind === 'intro') {   // 고객지원팀 사무실 한 층: 바닥판, 서류 선반, 책상, 민원 창구, 인형
      B({ x: cx, y: cy, w: 360, d: 300, h: 22, at, drop: 220 });
      const on = (ix, iy, z = 0) => { const [dx, dy] = iso(ix, iy, z); return [cx + dx, cy + dy]; };
      const [tx, ty] = on(101, -10, 22);   // 책상 줄과 민원 창구 사이 통로를 오가는 서류 토큰(바닥판 바로 위 층)
      const tk = loopToken(root, tx, ty, 6, 95, { speed: 28, pause: 1.4, scale: 0.55 });
      const tkEl = root.lastChild, slabAt = at;
      const items = [   // [ix, iy, 만드는 함수] — 깊이(ix + iy) 순서로 만든다
        [-135, 0, (x, y, t) => B({ x, y, z: 22, w: 40, d: 190, h: 124, layers: 5, at: t })],
        [-40, -85, (x, y, t) => B({ x, y, z: 22, w: 70, d: 50, h: 36, at: t })],
        [50, -85, (x, y, t) => B({ x, y, z: 22, w: 70, d: 50, h: 36, at: t })],
        [5, -30, (x, y, t) => { const f = THEME.figure(root, '한서윤', { x, y: y - 22, at: t, symbol: false, scale: 0.85 }); f.el.querySelector('.p1-tag').style.display = 'none'; parts.push(f); }],
        [-40, 25, (x, y, t) => B({ x, y, z: 22, w: 70, d: 50, h: 36, at: t })],
        [50, 25, (x, y, t) => B({ x, y, z: 22, w: 70, d: 50, h: 36, at: t })],
        [138, 30, (x, y, t) => B({ x, y, z: 22, w: 40, d: 200, h: 50, tone: 'slate', at: t })],
        [195, 70, (x, y, t) => { const f = THEME.figure(root, '', { x, y: y - 22, at: t, symbol: false, scale: 0.85 }); f.el.querySelector('.p1-tag').style.display = 'none'; parts.push(f); }],
      ];
      items.sort((a, b) => (a[0] + a[1]) - (b[0] + b[1])).forEach(([ix, iy, fn], k) => { const [x, y] = on(ix, iy); fn(x, y, at2(k + 1)); });
      tok = { render(amb) { tk.render(amb); tkEl.style.opacity = amb < slabAt + 0.4 ? '0' : '1'; } };   // 바닥판이 놓인 뒤에 보인다
    } else if (kind === 'stack') {   // 흰 판 블록 세 장이 하나씩 내려와 쌓인다
      tok = loopToken(root, cx, cy, 250, 200, { speed: 30, pause: 1, scale: 0.7 });   // 토큰은 블록보다 먼저 만들어 뒤로 지나가게 한다
      [0, 1, 2].forEach(i => B({ x: cx, y: cy, z: i * 44, w: 320, d: 260, h: 44, at: at + 0.1 + i * 0.32, shadow: i === 0, shadowH: 132, drop: 300 }));
    } else if (kind === 'pillars') {   // 흰 판 블록 둘레의 네 모서리에서 호박색 기둥이 솟는다
      tok = loopToken(root, cx, cy, 260, 210, { speed: 30, pause: 1, scale: 0.7 });
      B({ x: cx, y: cy, w: 330, d: 270, h: 36, at, drop: 220 });
      const pieces = [   // [ix, iy, 시작 시각, 종류] — 깊이 순서로 만든다
        [-140, -110, at + 0.5, 'p'], [140, -110, at + 0.8, 'p'], [-140, 110, at + 1.1, 'p'], [0, 0, at + 0.25, 'c'], [140, 110, at + 1.4, 'p'],
      ].sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]));
      pieces.forEach(([ix, iy, t, k]) => {
        const [dx, dy] = iso(ix, iy, 0);
        if (k === 'c') B({ x: cx, y: cy, z: 36, w: 120, d: 90, h: 16, tone: 'cobalt', at: t, drop: 200, shadow: false });
        else B({ x: cx + dx, y: cy + dy, z: 36, w: 36, d: 36, h: 170, tone: 'amber', at: t, grow: true, shadow: false });
      });
    } else {   // flow: 흰 서류 블록 하나가 코발트 책상 세 곳을 지나고, 검토 책상에서 한 번 되돌아간 뒤 호박색 승인 블록 앞에서 멈춘다
      [-170, 0, 170].forEach((ix, i) => { const [dx, dy] = iso(ix, 0, 0); B({ x: cx + dx, y: cy + dy, w: 100, d: 76, h: 60, tone: 'cobalt', at: at + 0.1 + i * 0.18 }); });
      const S0 = [[-270, 80], [-170, 80], [0, 80], [170, 80], [0, 80], [170, 80], [250, 80]];
      const pts = S0.map(([ix, iy]) => { const [dx, dy] = iso(ix, iy, 0); return [cx + dx, cy + dy]; });
      const sv = svgAt(root);
      s('polyline', { points: P(pts), fill: 'none', stroke: 'rgba(19,32,44,.32)', 'stroke-width': 3, 'stroke-dasharray': '2 11', 'stroke-linecap': 'round' }, sv);
      const t = tokenShape(sv, 'white', 0.9);
      const [ax, ay] = iso(325, 80, 0);
      B({ x: cx + ax, y: cy + ay, w: 70, d: 70, h: 46, tone: 'amber', at: at + 0.7 });
      const sch = schedule(pts, 0, 130, { 1: 0.5, 2: 0.5, 3: 0.5, 4: 0.3, 5: 0.3 });
      const period = sch.end + 1.6;
      tok = { render(amb) {
        const tt = ((amb - at - 0.9) % period + period) % period, { p } = posAt(sch.segs, pts, tt);
        t.setAttribute('transform', `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})`);
        t.style.opacity = amb < at + 0.9 ? '0' : '1';
      } };
    }
    return { render(lt, amb) { parts.forEach(b => b.render(lt)); if (tok) tok.render(amb); } };
  }
  // 장면별 [배율, 그림 바탕색]. 그림 바탕은 페이지 바탕(#E9EDF1)보다 3~5단계 어두워서, 줄인 그림 바깥을 그림 바탕색으로 채워 경계가 보이지 않게 한다
  const FIT = { intro: [0.76, '#E6EBEF'], stack: [0.84, '#E4E9EE'], pillars: [0.68, '#E5EAEE'], flow: [0.78, '#E6EAEF'] };
  THEME.videoTitle = (el, o = {}) => {
    const kind = o.kind || 'chapter', flip = !!o.flip, at = o.at ?? 0.1;
    const root = h('div', 'p1-vt full', el);
    let scene = null;
    // 대표 그림·영상은 구조물이 글자 판(x 96~1288)과 겹치지 않게 오른쪽 가장자리(뒤집으면 왼쪽)를 기준으로 줄여 놓는다.
    // 배율은 장면마다 2026-11-23 생성본의 구조물 범위를 재서 정했다. fit 으로 바꿀 수 있다
    const fx = FIT[o.scene] || [1, null];
    const fs = (o.src || o.poster) ? (o.fit ?? fx[0]) : 1;
    if (fs < 1) root.style.background = o.fitBg || fx[1] || '';
    const mst = { transformOrigin: '0 0', transform: flip
      ? `translate(${(1920 * fs).toFixed(1)}px, ${(540 * (1 - fs)).toFixed(1)}px) scale(${-fs}, ${fs})`
      : `translate(${(1920 * (1 - fs)).toFixed(1)}px, ${(540 * (1 - fs)).toFixed(1)}px) scale(${fs})` };
    if (fs < 1) {   // 줄인 그림의 안쪽 가장자리와 위아래가 바탕색으로 서서히 사라지게 한다
      const m = 'linear-gradient(to right, transparent 0, #000 16%), linear-gradient(to bottom, transparent 0, #000 12%, #000 88%, transparent 100%)';
      Object.assign(mst, { maskImage: m, webkitMaskImage: m, maskComposite: 'intersect', webkitMaskComposite: 'source-in' });
    }
    // 파트 1 영상은 블록이 쌓여 완성되는 영상이라 한 번 재생하고 마지막 장면에 멈춘다(loop: true 로 바꿀 수 있다)
    if (o.src) DECK.video(root, o.src, { poster: o.poster, loop: !!o.loop, style: mst });
    else if (o.poster) {   // 영상은 없고 대표 그림만 있을 때: 그림을 움직이지 않는 배경으로 둔다
      const im = R.img(o.poster);
      css(im, Object.assign({ position: 'absolute', left: '0px', top: '0px', width: '1920px', height: '1080px', objectFit: 'cover' }, mst));
      root.appendChild(im);
    } else scene = fallbackScene(root, o.scene || 'intro', flip ? 1920 - 1585 : 1585, 610, at + 0.1);
    const PW = 1180, px = flip ? 1920 - 96 - PW : 96;
    const panel = h('div', 'p1-vt-panel', root);
    css(panel, { left: px + 'px', width: PW + 'px' });
    const psv = s('svg', { width: 1, height: 1 }, panel);
    const kick = h('div', 'p1-vt-kicker', panel);
    const ksv = s('svg', { width: 34, height: 34, viewBox: '-19 -22 38 40' }, kick);
    box(ksv, 20, 20, 14, 0, TONES.cobalt);
    const kt = h('span', '', kick);
    kt.innerHTML = '';
    String(o.kicker || '').split(/(\d+)/).forEach(part => { if (!part) return; const e = /^\d+$/.test(part) ? h('b', '', kt) : h('span', '', kt); e.textContent = part; });
    const big = kind === 'intro' ? 88 : 72, maxT = 2, maxS = kind === 'intro' ? 3 : 2;
    const ttl = THEME.title(panel, o.title || '', { size: big, w: 1100, at: at + 0.3, maxLines: maxT });
    const sub = h('div', 'p1-vt-sub', panel);
    sub.style.maxWidth = '1100px';
    sub.textContent = o.sub || '';
    const subLines = Math.max(1, Math.round(sub.offsetHeight / (40 * 1.42)));
    if (subLines > maxS) console.warn(`[DECK] p1 영상 제목 질문 줄 수 초과(${subLines} > ${maxS}): ${o.sub}`);
    const words = R.split(sub, 'word', { mask: true });
    const PH = panel.offsetHeight;
    css(panel, { top: Math.round(540 - PH / 2) + 'px' });
    poly(psv, [[0, 0], [PW, 0], [PW, PH], [0, PH]], 'rgba(233,237,241,.85)');
    const dx = 14 * C30, dy = 14 * S30;
    poly(psv, [[PW, 0], [PW + dx, -dy], [PW + dx, PH - dy], [PW, PH]], 'rgba(185,195,206,.9)');
    poly(psv, [[0, 0], [PW, 0], [PW + dx, -dy], [dx, -dy]], 'rgba(255,255,255,.9)');
    const subAt = ttl.end - 0.25;
    const end = Math.max(ttl.end, subAt + words.length * 0.03 + 0.45);
    return {
      el: root, title: ttl, lines: { title: ttl.lines, sub: subLines }, end,
      render(lt, ctx) {
        const p = prog(lt, at, 0.45, ease.inOutCubic);   // 판이 등각 축 방향으로 미끄러져 열린다
        const cut = (1 - p) * (PW + 60);
        panel.style.clipPath = p >= 1 ? 'none' : flip ? `inset(-30px -40px -40px ${cut.toFixed(1)}px)` : `inset(-30px ${cut.toFixed(1)}px -40px -40px)`;
        const kp = prog(lt, at + 0.15, 0.35, ease.snap);
        kick.style.transform = `translateY(${((1 - kp) * 18).toFixed(1)}px)`;
        kick.style.opacity = kp.toFixed(3);
        ttl.render(lt);
        words.forEach((wd, i) => { const q = prog(lt, subAt + i * 0.03, 0.45, ease.snap); wd.style.transform = `translateY(${((1 - q) * 110).toFixed(1)}%)`; });
        if (scene) scene.render(lt, ctx ? ctx.amb : lt);
      },
    };
  };

  // ══ 레이아웃 부품(2026-11-24 추가) ══
  // 한 장의 핵심 요소를 크게 놓는 부품이다. 모두 키 누름 없이 3~4초 안에 끝 상태가 된다.
  // 키 한 번으로 여는 부품(split 의 rightAt, quiz 의 revealAt)은 그 시각을 slide 의 steps 에 하나만 둔다.
  const ACC = '#2A55E5';
  // 글 덩어리를 아래에서 28px 올린다(투명도만 바꾸지 않는다)
  function riseEl(e, lt, at, dy = 28) {
    const p = prog(lt, at, 0.5, ease.snap);
    e.style.opacity = p.toFixed(3);
    e.style.transform = `translateY(${((1 - p) * dy).toFixed(1)}px)`;
  }
  THEME.rise = riseEl;

  // 한 문장: 화면 폭을 거의 다 쓰는 큰 문장(자모 조립)과 그 아래 받침 판, 보조 한 줄
  THEME.statement = (el, text, o = {}) => {
    const size = o.size ?? 132, x = o.x ?? 120, w = o.w ?? 1680, at = o.at ?? 0.2;
    const root = h('div', 'p1-stmt', el);
    css(root, { left: x + 'px', top: '0px', width: w + 'px' });
    const ttl = THEME.title(root, text, { size, w, at: at + 0.3, em: o.em, maxLines: o.maxLines ?? 3 });
    const words = Array.from(ttl.el.querySelectorAll('.p1-word'));
    const tw = Math.min(w, Math.max(200, ...words.map(wd => wd.offsetLeft + wd.offsetWidth)));
    const pl = h('div', 'p1-stmt-plate', root);
    const psv = s('svg', { width: 1, height: 1 }, pl);
    css(psv, { position: 'absolute', left: '0px', top: '0px', overflow: 'visible' });
    poly(psv, [[0, 0], [tw + 40, 0], [tw + 40, 16], [0, 16]], TONES.white.left);
    slab(psv, tw + 40, 16, 26, { shadow: 0 });
    css(pl, { left: '-20px', top: (ttl.el.offsetHeight + 34) + 'px' });
    let sub = null;
    if (o.sub) { sub = h('div', 'p1-stmt-sub', root, o.sub); sub.style.marginTop = '78px'; }
    let facts = [];   // 근거 칸(선택): 문장 아래 한 줄에 셋까지. [{ label, text }]
    if (o.facts && o.facts.length) {
      const row = h('div', 'p1-stmt-facts', root);
      row.style.marginTop = sub ? '56px' : '96px';
      row.style.gridTemplateColumns = `repeat(${o.facts.length}, 1fr)`;
      facts = o.facts.map(f => {
        const c = h('div', 'p1-stmt-fact', row);
        h('div', 'p1-stmt-fact-l', c).textContent = f.label || '';
        if (f.text) h('div', 'p1-stmt-fact-t', c).textContent = f.text;
        return c;
      });
    }
    const H = root.offsetHeight + (sub || facts.length ? 0 : 60);
    root.style.top = Math.round((o.cy ?? 560) - H / 2) + 'px';
    const subAt = ttl.end - 0.1;
    return {
      el: root, title: ttl, end: facts.length ? subAt + 0.3 + facts.length * 0.15 + 0.5 : sub ? subAt + 0.5 : ttl.end,
      render(lt) {
        const p = prog(lt, at, 0.4, ease.outCubic), dd = (1 - p) * 220;   // 받침 판이 등각 축(왼쪽 아래)에서 들어온다
        pl.style.transform = `translate(${(-dd * C30).toFixed(1)}px, ${(dd * S30).toFixed(1)}px)`;
        pl.style.opacity = lt < at ? '0' : clamp(p / 0.25).toFixed(3);
        ttl.render(lt);
        if (sub) riseEl(sub, lt, subAt);
        facts.forEach((c, i) => riseEl(c, lt, subAt + 0.3 + i * 0.15));
      },
    };
  };

  // 큰 숫자: 화면 왼쪽 절반 이상을 차지하는 수치(420px)와 그 높이를 재는 세로 치수선, 위 설명과 아래 보조 줄
  THEME.bigNum = (el, value, o = {}) => {
    const size = o.size ?? 420, x = o.x ?? 120, y = o.y ?? 190, at = o.at ?? 0.3;
    const root = h('div', 'p1-big', el);
    css(root, { left: x + 'px', top: y + 'px' });
    const lab = o.label ? h('div', 'p1-big-label', root, o.label) : null;
    const num = h('div', 'p1-big-num', root);
    css(num, { fontSize: size + 'px' });
    String(value).split(/([.,])/).forEach(part => {   // 고정폭 글꼴의 소수점·쉼표 둘레 빈칸을 줄인다
      if (!part) return;
      if (part === '.' || part === ',') { const d = h('span', 'p1-big-dot', num); d.textContent = part; } else num.appendChild(document.createTextNode(part));
    });
    if (o.unit) { const u = h('span', 'p1-big-unit', num); u.textContent = o.unit; u.style.fontSize = Math.round(size * 0.34) + 'px'; }
    if (o.tone === 'cobalt') num.style.color = ACC;
    const note = o.note ? h('div', 'p1-big-note', root, o.note) : null;
    // 숫자 높이(글자 상자의 0.13~0.86)를 재는 세로 치수선
    const sv = svgAt(root);
    const y1 = num.offsetTop + size * 0.13, y2 = num.offsetTop + size * 0.86, lx = -44;
    const main = seg(sv, [lx, y1], [lx, y1], { stroke: INK, sw: 2.5 });
    const t1 = seg(sv, [lx - 16, y1], [lx + 16, y1], { stroke: INK, sw: 3 });
    const t2 = seg(sv, [lx - 16, y2], [lx + 16, y2], { stroke: INK, sw: 3 });
    const numAt = at + 0.55;
    num.style.transformOrigin = '0% 60%';
    return {
      el: root, num, end: numAt + 0.7,
      render(lt) {
        if (lab) riseEl(lab, lt, at);
        const p = prog(lt, at + 0.1, 0.4, ease.inOutCubic);
        main.setAttribute('y2', lerp(y1, y2, p).toFixed(1));
        main.style.opacity = t1.style.opacity = lt < at + 0.1 ? '0' : '1';
        t2.style.opacity = p >= 0.98 ? '1' : '0';
        const q = prog(lt, numAt, 0.16, ease.outQuad);   // 숫자는 굴리지 않고 1.12배에서 1배로 한 번에 찍힌다
        num.style.opacity = lt < numAt ? '0' : '1';
        num.style.transform = `scale(${lerp(1.12, 1, q).toFixed(3)})`;
        if (note) riseEl(note, lt, numAt + 0.3);
      },
    };
  };

  // 좌우 대비: 화면을 x 에서 둘로 나누는 세로 판과 양쪽 이름표. 왼쪽(left)·오른쪽(right) 칸에 블록을 넣는다.
  // 오른쪽 칸은 rightAt 에 세로 판에서 오른쪽으로 열린다(steps 에 rightAt 하나를 두면 키를 눌러 연다)
  THEME.split = (el, o = {}) => {
    const X = o.x ?? 960, top = o.top ?? 250, bot = o.bottom ?? 1010, at = o.at ?? 0.2, rAt = o.rightAt ?? at + 0.8;
    const L = h('div', 'p1-half full', el), Rr = h('div', 'p1-half full', el);
    if (o.floor !== false) {
      gridPatch(L, [80, top + 60, X - 120, bot - top - 40]);
      gridPatch(Rr, [X + 40, top + 60, 1880 - X - 40, bot - top - 40]);
    }
    const wall = h('div', 'p1-split-wall', el);
    const wsv = s('svg', { width: 1, height: 1 }, wall);
    css(wsv, { position: 'absolute', left: '0px', top: '0px', overflow: 'visible' });
    poly(wsv, [[0, 0], [10, 0], [10, bot - top], [0, bot - top]], TONES.white.left);
    slab(wsv, 10, bot - top, 16, { shadow: 0 });
    css(wall, { left: (X - 5) + 'px', top: top + 'px', width: '40px', height: (bot - top) + 'px' });
    const tag = (side, cfg, parent, lx) => {
      if (!cfg) return null;
      const g = h('div', 'p1-half-tag' + (cfg.tone ? ' is-' + cfg.tone : ''), parent);
      g.textContent = cfg.label || '';
      css(g, { left: lx + 'px', top: top + 'px' });
      return g;
    };
    const lt_ = tag('left', o.left, L, 120), rt_ = tag('right', o.right, Rr, X + 80);
    return {
      left: L, right: Rr, rightAt: rAt, end: rAt + 0.6,
      render(lt) {
        const g = prog(lt, at, 0.45, ease.outCubic);   // 세로 판이 아래에서 위로 그어진다
        wall.style.clipPath = `inset(${((1 - g) * 100).toFixed(1)}% -40px -40px -40px)`;
        if (lt_) riseEl(lt_, lt, at + 0.15);
        const p = prog(lt, rAt, 0.5, ease.inOutCubic);   // 오른쪽 칸이 세로 판에서 오른쪽으로 열린다
        Rr.style.clipPath = p >= 1 ? 'none' : `inset(-40px ${((1 - p) * (1920 - X)).toFixed(1)}px -40px ${X}px)`;
        if (rt_) riseEl(rt_, lt, rAt + 0.2);
      },
    };
  };

  // 가로 순서: 단계 블록을 화면 가로 한 줄로 놓는다. 블록 왼면에 번호, 위에 이름표.
  // 서류 토큰은 블록 앞 바닥을 등각 축만 따라(오른쪽 아래 → 오른쪽 위) 지그재그로 한 번 지나간다
  THEME.sequence = (el, items, o = {}) => {
    const n = items.length, x0 = o.x0 ?? 300, x1 = o.x1 ?? 1620, y = o.y ?? 640, size = o.size ?? 190, hh = o.h ?? 70;
    const at = o.at ?? 0.3, each = o.each ?? 0.2;
    const dx = n > 1 ? (x1 - x0) / (n - 1) : 0, a = dx / (2 * C30);
    const blocks = items.map((it, k) => {
      const b = THEME.block(el, { x: x0 + k * dx, y, w: size, d: size, h: it.h ?? hh, tone: it.tone || 'white', at: at + k * each,
        label: it.label, note: it.note, labelPos: 'top', pin: o.pin ?? 36 });
      const tg = b.body.querySelector('.p1-tag'); if (tg) tg.classList.add('is-big');
      const no = h('div', 'p1-seq-no' + (it.tone === 'cobalt' || it.tone === 'slate' ? ' is-on' : ''), b.body);
      const [fx, fy] = iso(0, size / 2, (it.h ?? hh) / 2);
      css(no, { left: fx + 'px', top: fy + 'px' });
      no.textContent = String(k + 1);
      return b;
    });
    const last = at + (n - 1) * each + 0.35;
    let fl = null;
    if (o.token !== false && n > 1) {
      const off = size / 2 + 50, path = [];
      for (let k = 0; k < n; k++) {
        const c = k * a;
        path.push([c + off, -c + off]);
        if (k < n - 1) path.push([c + a + off, -c + off]);
      }
      const hold = {};
      for (let k = 1; k < n - 1; k++) hold[2 * k] = 0.12;
      fl = THEME.flow(el, path, { x: x0, y, at: o.tokenAt ?? last + 0.15, speed: o.speed ?? 900, hold });
    }
    return {
      el, blocks, flow: fl, end: Math.max(last + 0.6, fl ? fl.end : 0),
      render(lt) { blocks.forEach(b => b.render(lt)); if (fl) fl.render(lt); },
    };
  };

  // 번호 카드: 정면 판에 큰 번호(코발트 96px), 제목 46px, 설명 38px. 카드 격자에 쓴다
  THEME.tile = (el, o = {}) => {
    const esc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>');   // \n 은 줄바꿈
    const html = (o.n != null ? `<div class="p1-tile-n">${esc(o.n)}</div>` : '') + `<div class="p1-tile-t">${esc(o.title || '')}</div>` +
      (o.text ? `<div class="p1-tile-x">${esc(o.text)}</div>` : '');
    const c = THEME.card(el, { x: o.x, y: o.y, w: o.w ?? 520, h: o.h, tone: o.tone, at: o.at, enter: o.enter || 'drop', html, depth: o.depth ?? 18, pad: o.pad ?? '34px 40px' });
    c.face.classList.add('p1-tile');
    if (o.img) {   // 카드 맨 위 16:9 그림(대표 그림 등). 폭은 카드 안쪽 폭
      const im = document.createElement('img');
      im.className = 'p1-tile-img'; im.src = o.img; im.alt = '';
      if (o.imgH) im.style.height = o.imgH + 'px';
      c.face.insertBefore(im, c.face.firstChild);
    }
    return c;
  };

  // 표: 머리 행(30px)과 흰 판 행(36px). rows: [{ cells: [...], tone }] 또는 [...]. tone 'cobalt' | 'slate' | 'amber' 로 한 행을 칠한다
  // 2026-11-24 보완: headSize(머리 줄 글자), 칸 { text, sub, size, subSize }(칸 안 둘째 줄), 행 { cells, tone, h, size, gap }(행 높이·글자·앞 간격),
  // groupGap(앞 행과 색이 바뀌는 자리에 더 띄우는 간격). 돌려주는 값에 head(머리 줄 요소)와 bottom(마지막 행 아래 끝 y)을 더했다
  THEME.table = (el, rows, o = {}) => {
    const x = o.x ?? 120, y = o.y ?? 300, cols = o.cols, at = o.at ?? 0.3, each = o.each ?? 0.08, rowH = o.rowH ?? 78, gap = o.gap ?? 12;
    const W = cols.reduce((s_, v) => s_ + v, 0), tpl = cols.map(v => v + 'px').join(' ');
    const esc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const cellHtml = c => {
      if (c == null || typeof c !== 'object') return `<div>${esc(c ?? '')}</div>`;
      const m = c.size ? ` style="font-size:${c.size}px"` : '', sb = c.subSize ? ` style="font-size:${c.subSize}px"` : '';
      return `<div class="p1-tcell"><div class="p1-tc-m"${m}>${esc(c.text ?? '')}</div>${c.sub ? `<div class="p1-tc-s"${sb}>${esc(c.sub)}</div>` : ''}</div>`;
    };
    let head = null;
    if (o.head) {
      head = h('div', 'p1-thead', el, o.head.map(c => `<div>${esc(c)}</div>`).join(''));
      css(head, { left: (x + 0) + 'px', top: (y - 52) + 'px', width: W + 'px', gridTemplateColumns: tpl });
      if (o.headSize) head.style.fontSize = o.headSize + 'px';
      // headH(선택): 머리 줄이 두 줄일 때의 높이. 머리 칸의 \n 에서 줄을 바꾸고 아랫줄을 첫 행 위 12px 에 맞춘다
      if (o.headH) css(head, { top: (y - o.headH) + 'px', height: (o.headH - 12) + 'px', alignItems: 'end', whiteSpace: 'pre-line', wordBreak: 'keep-all' });
    }
    let cy = y, prev = null;
    const cards = rows.map((r, i) => {
      const R = Array.isArray(r) ? { cells: r } : r, tn = R.tone || null;
      if (i > 0) { if (o.groupGap && (tn || 'white') !== (prev || 'white')) cy += o.groupGap; cy += R.gap || 0; }
      const rh = R.h ?? rowH;
      const html = `<div class="p1-tgrid" style="grid-template-columns:${tpl}">${R.cells.map(cellHtml).join('')}</div>`;
      const c = THEME.card(el, { x, y: cy, w: W, h: rh, tone: tn || 'white', at: at + i * each, enter: 'slide', html, depth: 10, pad: '0' });
      c.face.classList.add('p1-trow');
      if (o.size) c.face.style.fontSize = o.size + 'px';
      if (R.size) c.face.style.fontSize = R.size + 'px';
      cy += rh + gap; prev = tn;
      return c;
    });
    return {
      el, head, rows: cards, bottom: cy - gap, end: at + rows.length * each + 0.5,
      render(lt) { if (head) riseEl(head, lt, at - 0.1, 14); cards.forEach(c => c.render(lt)); },
    };
  };

  // 퀴즈: 큰 흰 블록 보기 여러 개(이름표 44px, 블록 아래). revealAt 에 정답 블록 자리에서 코발트 기둥이 솟고
  // 정답 글(56px)이 위에 붙으며, 다른 보기는 옅어진다. revealAt 을 steps 에 하나 둔다
  THEME.quiz = (el, opts, o = {}) => {
    const n = opts.length, x0 = o.x0 ?? 470, x1 = o.x1 ?? 1450, y = o.y ?? 760, size = o.size ?? 250, hh = o.h ?? 56;
    const at = o.at ?? 0.4, each = o.each ?? 0.15, ans = o.answer;
    const dx = n > 1 ? (x1 - x0) / (n - 1) : 0, rAt = o.revealAt ?? at + n * each + 1;
    const items = opts.map((txt, k) => {
      const b = THEME.block(el, { x: x0 + k * dx, y, w: size, d: size, h: hh, at: at + k * each, label: txt, labelPos: 'below' });
      const tg = b.body.querySelector('.p1-tag'); if (tg) tg.classList.add('is-big');
      return b;
    });
    let up = null;
    if (ans != null) {
      up = THEME.block(el, { x: x0 + ans * dx, y, z: hh, w: size, d: size, h: o.riseH ?? 280, tone: 'cobalt', at: rAt, grow: true, shadow: false,
        label: o.answerText, labelTone: 'cobalt', pin: 26 });
      const tg = up.body.querySelector('.p1-tag'); if (tg) tg.classList.add('is-answer');
    }
    return {
      el, items, revealAt: rAt, end: up ? rAt + 0.9 : at + n * each + 0.6,
      render(lt) {
        const q = prog(lt, rAt, 0.4, ease.outQuad);
        items.forEach((b, k) => { b.render(lt); b.el.style.opacity = k === ans ? '1' : lerp(1, 0.35, q).toFixed(3); });
        if (up) up.render(lt);
      },
    };
  };

  // 확인 목록: 행마다 작은 블록(통과 'pass' 흰 블록, 실패 'fail' 회청 판, 아직 'todo' 점선)과 42px 글, 30px 보조 줄
  // 2026-11-24 보완: 'todo' 블록은 떨어지지 않고 점선 윤곽이 그어진다. value: ''(빈 글) 또는 slot: true 면 오른쪽에 빈 점선 값 칸을 긋는다.
  // 인자 box·boxH(블록 크기), textX(글 왼쪽 끝, x 기준), textSize·noteSize·valueSize, slotW, 항목별 tone(블록 색을 바꾼다. 예: 'amber').
  // 돌려주는 rows: [{ block, el, text, note, value, slot, at }]
  // revealAt(선택): 그 시각 전에는 항목 이름과 점선 블록만 보이고, revealAt 부터 줄마다 each 간격으로 블록(통과·어긋남)이 떨어지며
  // 보조 줄과 값이 올라온다. 참가자가 자기 결과를 먼저 확인한 뒤 강사가 키 한 번으로 결과를 여는 장에 쓴다(steps: [revealAt])
  THEME.checklist = (el, items, o = {}) => {
    const x = o.x ?? 120, y = o.y ?? 300, w = o.w ?? 1100, rowH = o.rowH ?? 128, at = o.at ?? 0.3, each = o.each ?? 0.18;
    const bw = o.box ?? 60, bh = o.boxH ?? 40, tl = o.textX ?? 130, rv = o.revealAt;
    let ssv = null;
    const rows = items.map((it, i) => {
      const st = it.state || 'pass', ry = y + i * rowH, t0 = at + i * each, todo = st === 'todo';
      const bx = o.box ? x + bw * C30 + 4 : x + 44, by = o.box ? ry + rowH / 2 + bh / 2 : ry + rowH / 2 + 14;
      const tr = rv != null && !todo ? rv + i * each : null;   // 결과가 열리는 시각
      let ph = null, phDraw = null;
      if (tr != null) { ph = THEME.block(el, { x: bx, y: by, w: bw, d: bw, h: bh, tone: 'ghost', at: t0, drop: 0, shadow: false }); phDraw = THEME.ghostDraw(ph); }
      const b = THEME.block(el, { x: bx, y: by, w: bw, d: bw, h: st === 'fail' ? 8 : bh,
        tone: it.tone || (st === 'fail' ? 'slate' : todo ? 'ghost' : 'white'), at: tr ?? t0, drop: todo ? 0 : 200, shadow: todo ? false : undefined });
      const draw = todo ? THEME.ghostDraw(b) : null;
      const tx = h('div', 'p1-chk', el);
      css(tx, { left: (x + tl) + 'px', top: ry + 'px', width: (w - tl) + 'px', height: rowH + 'px' });
      const t1 = h('div', 'p1-chk-t', tx); t1.textContent = it.text || '';
      if (o.textSize) t1.style.fontSize = o.textSize + 'px';
      let t2 = null, v = null, slot = null;
      if (it.note) { t2 = h('div', 'p1-chk-n', tx); t2.textContent = it.note; if (o.noteSize) t2.style.fontSize = o.noteSize + 'px'; }
      if (it.value) { v = h('div', 'p1-chk-v', tx); v.textContent = it.value; if (o.valueSize) v.style.fontSize = o.valueSize + 'px'; }
      else if (it.value === '' || it.slot) {
        if (!ssv) ssv = svgAt(el);
        const sw = o.slotW ?? 600, x1 = x + w - 20, x0 = x1 - sw, y0 = ry + rowH * 0.27, y1 = ry + rowH * 0.73;
        const pg = s('polygon', { points: `${x0},${y0} ${x1},${y0} ${x1},${y1} ${x0},${y1}`, fill: 'rgba(255,255,255,.35)', stroke: 'rgba(19,32,44,.45)', 'stroke-width': 1.5, 'stroke-dasharray': '6 5' }, ssv);
        slot = { el: pg, draw: dashDraw([pg]) };
      }
      return { block: b, b, el: tx, tx, text: t1, note: t2, value: v, slot, draw, at: t0, t: t0, tr, ph, phDraw };
    });
    return {
      el, rows, end: (rv != null ? rv : at) + items.length * each + 0.6,
      render(lt) {
        rows.forEach(r => {
          if (r.ph) { r.ph.render(lt); r.phDraw(lt, r.t); r.ph.el.style.opacity = lt >= r.tr + 0.3 ? '0' : '1'; }
          r.b.render(lt); if (r.draw) r.draw(lt, r.t);
          if (r.slot) r.slot.draw(lt, r.t + 0.15, 0.45);
          riseEl(r.tx, lt, r.t + 0.1, 20);
          if (r.tr != null) { if (r.note) riseEl(r.note, lt, r.tr + 0.2, 16); if (r.value) riseEl(r.value, lt, r.tr + 0.2, 16); }
        });
      },
    };
  };

  // 짚는 이름표: 점(from)에서 지시선을 그어 코발트 이름표(36px)를 단다. 화면 캡처와 구조도 위에 쓴다
  THEME.callout = (el, o = {}) => {
    const [px, py] = o.from, tx = o.x, ty = o.y, at = o.at ?? 0.8;
    const root = zbox(el);
    const sv = svgAt(root);
    const ln = seg(sv, [px, py], [px, py], { stroke: ACC, sw: 3 });
    const dot = s('circle', { cx: px, cy: py, r: 7, fill: ACC }, sv);
    const tg = h('div', 'p1-tag is-cobalt p1-callout', root, o.text || '');
    const right = tx >= px;
    css(tg, { left: tx + 'px', top: ty + 'px', width: (o.w ?? 400) + 'px', boxSizing: 'border-box' });
    return {
      el: root, end: at + 0.8,
      render(lt) {
        const p = prog(lt, at, 0.3, ease.inOutCubic);
        ln.setAttribute('x2', lerp(px, tx, p).toFixed(1)); ln.setAttribute('y2', lerp(py, ty, p).toFixed(1));
        ln.style.opacity = dot.style.opacity = lt < at ? '0' : '1';
        const q = prog(lt, at + 0.25, 0.3, ease.snap);
        tg.style.opacity = q.toFixed(3);
        tg.style.transform = `translate(${right ? '0' : '-100%'}, -50%) translateY(${((1 - q) * 12).toFixed(1)}px)`;
      },
    };
  };

  // ══ 레이아웃 부품 보완(2026-11-24 2차): p1 ch03 장면 코드가 직접 처리한 것을 부품으로 올렸다 ══

  // 점선 윤곽을 둘레를 따라 그어 나간다. polys: 점선(stroke-dasharray)을 단 polygon. 돌려주는 함수 (lt, at, dur) 를 render 에서 부른다
  function dashDraw(polys) {
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
  }
  THEME.dashDraw = dashDraw;
  // 점선 블록(tone 'ghost')의 윤곽 그리기. 블록은 drop: 0, shadow: false 로 만든다
  THEME.ghostDraw = (b) => dashDraw(Array.from(b.body.querySelectorAll('polygon')).filter(p => p.getAttribute('stroke-dasharray')));

  // 절대 위치 글 덩어리. cls 예: 't-body', 't-small p1-dimtext'
  THEME.text = (el, cls, html, x, y, w) => {
    const d = h('div', 'a ' + cls, el, html);
    css(d, { left: x + 'px', top: y + 'px' });
    if (w) d.style.width = w + 'px';
    return d;
  };
  // 본문 여러 줄: 줄마다 div 를 만들어 따로 올릴 수 있게 돌려준다. o: { x, y, w, gap, cls }
  THEME.lines = (el, lines, o = {}) => {
    const bx = h('div', 'a', el);
    css(bx, { left: (o.x ?? 120) + 'px', top: (o.y ?? 400) + 'px', width: (o.w ?? 560) + 'px', display: 'flex', flexDirection: 'column', gap: (o.gap ?? 14) + 'px' });
    return lines.map(tx => h('div', o.cls || 't-body', bx, tx));
  };
  // 아무 요소나 블록과 같은 곡선으로 떨어뜨려 내려앉힌다(이름표, 판). transformOrigin 은 부르는 쪽이 정한다
  THEME.dropEl = (e, lt, at, D = 160) => {
    const k = dropState(lt, at, D);
    e.style.transform = `translate(0px, ${(-k.dy).toFixed(1)}px) scale(${k.sx.toFixed(4)}, ${k.sy.toFixed(4)})`;
    e.style.opacity = k.op.toFixed(3);
  };

  // 두께 있는 판: 가로 순서 블록 아래에 까는 판(ch03 s06a). 블록 n 개의 바닥 가운데마다 등각 정사각형(반폭 r)을 두고 합친 모양이라
  // 앞쪽 가장자리가 등각 축을 따라 번갈아 꺾이고, 앞면이 왼면·오른면 두 음영으로 보인다.
  // o: { x0, x1, n(블록 수, THEME.sequence 와 같은 값), y(판 바닥 가운데 y), r, T(두께), tone, at, drop,
  //      labels: [{ text, x, size, weight, at }](판 앞쪽 아래 이름표, 판 바닥선에서 내려오는 핀), labelY, shadow: [sx, sy] }
  // 돌려주는 값: { el, top(판 윗면 y. THEME.sequence 의 y 로 준다), a(블록 사이 등각 거리), r, groundY(x), iso(ix, iy, z), labels, land, end, render(lt) }
  THEME.plate = (el, o = {}) => {
    const n = o.n ?? 3, x0 = o.x0 ?? 300, x1 = o.x1 ?? x0, yc = o.y ?? 600, T = o.T ?? 44, at = o.at ?? 0.3, D = o.drop ?? 120;
    const a = n > 1 ? (x1 - x0) / (n - 1) / (2 * C30) : 0, r = o.r ?? Math.max(a * 0.92, 140);
    const pt = (ix, iy, z = 0) => [x0 + (ix - iy) * C30, yc + (ix + iy) * S30 - z];
    const FRONT = [[-r, r]];
    for (let k = 0; k < n; k++) { FRONT.push([k * a + r, r - k * a]); if (k < n - 1) FRONT.push([k * a + r, r - (k + 1) * a]); }
    FRONT.push([(n - 1) * a + r, -(n - 1) * a - r]);
    const BACK = [[(n - 1) * a - r, -(n - 1) * a - r]];
    for (let k = n - 1; k >= 1; k--) { BACK.push([k * a - r, -(k - 1) * a - r]); BACK.push([(k - 1) * a - r, -(k - 1) * a - r]); }
    const groundY = (gx) => {
      const S = FRONT.map(([ix, iy]) => pt(ix, iy, 0));
      for (let i = 0; i < S.length - 1; i++) {
        const [ax, ay] = S[i], [bx, by] = S[i + 1];
        if (gx >= Math.min(ax, bx) && gx <= Math.max(ax, bx) && bx !== ax) return ay + (by - ay) * (gx - ax) / (bx - ax);
      }
      return yc;
    };
    const root = zbox(el);
    const midX = pt((n - 1) * a / 2, -(n - 1) * a / 2)[0];
    const [sx, sy] = o.shadow || [56, 12];
    const sh = s('g', { opacity: 0 }, svgAt(root));
    sh.style.transformOrigin = `${midX.toFixed(0)}px ${yc}px`;
    for (let k = 0; k < n; k++) {   // 겹친 곳이 진해지지 않게 불투명하게 칠하고 묶음 전체에 투명도를 준다
      const cx = k * a, cy = -k * a;
      s('polygon', { points: P([[cx - r, cy - r], [cx + r, cy - r], [cx + r + sx, cy - r + sy], [cx + r + sx, cy + r + sy], [cx - r + sx, cy + r + sy], [cx - r, cy + r]].map(([ix, iy]) => pt(ix, iy, 0))), fill: INK }, sh);
    }
    const body = h('div', 'full', root);
    css(body, { pointerEvents: 'none', transformOrigin: `${midX.toFixed(0)}px ${(yc + r).toFixed(0)}px` });
    const sv = svgAt(body), tn = tone(o.tone);
    for (let i = 0; i < FRONT.length - 1; i++) {
      const p = FRONT[i], q = FRONT[i + 1];
      poly(sv, [pt(p[0], p[1], 0), pt(q[0], q[1], 0), pt(q[0], q[1], T), pt(p[0], p[1], T)], p[1] === q[1] ? tn.left : tn.right);
    }
    poly(sv, FRONT.concat(BACK).map(([ix, iy]) => pt(ix, iy, T)), tn.top);
    const land = at + 0.35;
    const lY = o.labelY ?? (yc + r + 30);
    const lsv = svgAt(root);
    const labels = (o.labels || []).map((L, i) => {
      const tg = h('div', 'p1-tag', root, '');
      tg.textContent = L.text;
      css(tg, { left: L.x + 'px', top: lY + 'px', fontSize: (L.size ?? 40) + 'px', fontWeight: String(L.weight ?? 600) });
      const pin = seg(lsv, [L.x, groundY(L.x)], [L.x, lY], { stroke: EDGE });
      return { el: tg, pin, at: L.at ?? land + 0.05 + i * 0.12 };
    });
    const end = Math.max(land + 0.3, ...labels.map(L => L.at + 0.3));
    return {
      el: root, top: yc - T, a, r, groundY, iso: pt, labels, land, end,
      render(lt) {
        THEME.dropEl(body, lt, at, D);
        const g = prog(lt, land - 0.15, 0.15, ease.outQuad);
        sh.setAttribute('opacity', (0.18 * g).toFixed(3));
        sh.style.transform = `scale(${lerp(0.6, 1, g).toFixed(3)})`;
        labels.forEach(L => {
          const p = prog(lt, L.at, 0.3, ease.snap);
          L.el.style.opacity = p.toFixed(3);
          L.el.style.transform = `translate(-50%, ${((1 - p) * 14).toFixed(1)}px)`;
          L.pin.style.opacity = p.toFixed(3);
        });
      },
    };
  };
})();
