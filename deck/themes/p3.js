/* p3 테마 부품 — 「주황 면」(2026-11-24 사용자가 고른 시안 B). 파트 3 「프로젝트에서 서비스로: 에이전트 팀과 승인 지점」
 *
 * 화면: 숯색 바탕(#141414)에 흰 글자(#F7F7F5). 제목과 숫자는 Paperlogy, 본문은 Pretendard.
 * 색의 역할
 *   주황 #FF5B14  구조와 강조: 단계 번호 칸, 다음 질문, 제목 막대, 핵심 숫자, 전환 띠, 좌우 대비의 강조 칸, 퀴즈 정답.
 *                 넓은 면으로 쓰고 그 위 글자는 늘 검정(#141414)이다. 한 장에 주황 면은 한두 곳까지.
 *   연두 #C6FF4A  승인 표시에만: 고리의 체크, 승인자 이름표, 확인 목록의 통과 칸.
 *   흰 이름표     화면을 짚는 말(callout). 원문 종이(doc)도 밝은 면이다.
 * 쓰지 않는 것: 유리 판, 배경 흐림(backdrop-filter), 무지개 띠, 보라 빛, 빛 번짐. 옛 인자(frost, edge, beam, seed, depth 의 떠다니기)는 받아도 무시한다.
 *
 * 장면 코드 규칙을 그대로 지킨다. 모든 부품은 slide 의 setup 에서 부르고, 돌려받은 객체의 render(lt, ctx) 를
 * slide 의 render 에서 부른다. 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다. 좌표는 1920×1080 무대 px 다.
 *
 * 기본 부품(이름과 인자는 옛 테마와 같다)
 *   THEME.bg(el, variant)                        'base' | 'accent'(위 끝 주황 선) | 'lab'(실습 작업 면) | 'deep'. 옅은 원 하나가 ctx.amb 로 느리게 움직인다
 *   THEME.header(el, { chapter, title, fiction, at })   「파트 3 · 4장 제목」. fiction: true 면 오른쪽 위, 'inline' 이면 머리말 줄 끝에 「가상 사례」
 *   THEME.title(el, text, { x, y, w, size, weight, at, cls, flow, style, em })
 *                                                줄마다 주황 막대가 지나간 뒤 글자가 남는다. em: 주황 글자로 둘 낱말 배열 → { el, chars, lines, end, render }
 *   THEME.card(el, { x, y, w, h, label, title, body, at, pad, radius, focus })   면 카드(이름표 30px, 제목 48px, 본문 36px) → { el, body, glass, render }
 *   THEME.step(el, n, total, { x, y, at, word })  주황 칸 안의 큰 번호 + 「단계」「/ 7」 + 칸 점 줄 → { el, render }
 *   THEME.videoTitle(el, { src, poster, title, sub, kicker, flip, kind, scene, pos, at })
 *                                                「영상 띠 전환」: 위쪽에 영상(흑백), 아래 주황 띠에 머리 줄·제목 두 줄·질문. kind: 'intro' | 'chapter'
 *                                                → { el, title, lines, render(lt, ctx) }
 *   THEME.glass(el, { x, y, w, h, radius, pad, focusAt, cls, depth })   평평한 면(이름은 옛 이름). focusAt 에 왼쪽에서 펼쳐진다 → { el, body, light(v), render }
 *   THEME.sweep(el, { target, at, dur, angle })  경계가 또렷한 가림 걷기 → { render(lt) }
 *   THEME.path(el, nodes, { times, color, tail, width, baseAt })   흰 선 위를 지나는 흰 점(color: 'lime' 이면 연두) → { el, arr, render(lt), point(lt) }
 *   THEME.ring(el, { x, y, r, label, name, glyph, at, closeAt, state })   승인 지점 고리(연두) → { el, render }
 *   THEME.chip(el, text, { x, y, center, at, cls })   이름 칸. chip.light(v) 만큼 주황 테두리가 켜진다 → { el, light, render }
 *   THEME.shot(el, src, { size, w, h, x, y, at, marks, markAt, chat, chatOpts, url, draw, focus })   화면 틀(짚는 표시는 주황 테두리). w·h 를 주면 그 크기 → { el, screen, drawn, end, render }
 *   THEME.exhibit(el, { x, y, w, h, img, video, poster, draw, scene, at, focus, mono })   결과물 틀. mono: true 면 그림을 흑백으로 → { el, body, render }
 *   THEME.person(el, { who, x, y, at, org })      성 한 글자 고리 + 기호 + 「이름 직위」
 *   THEME.nextQ(el, { x, y | bottom, w, maxW, text, lead, at, focus, size })   챕터 끝 「다음 질문」 주황 면(질문 44px) → { el, body, q, x, y, w, h, lines, render }
 *
 * 레이아웃 부품(2026-11-24 더함. 레이아웃 목록은 plan/themes.md 6절 「레이아웃 목록」, 본보기는 deck/p3/ch00.js)
 *   THEME.reveal(e, lt, at, { dur, dx, dy })     글 덩어리 하나를 가림 걷기와 짧은 이동으로 드러낸다 → 진행값(0~1)
 *   THEME.statement(el, text, { x, w, cy, size, lead, sub, em, at, maxLines })   「한 문장」 → { el, title, end, render }
 *   THEME.bigNum(el, value, { x, top, bottom, unit, unitH, roll, tone, at })   「큰 숫자」. 잉크 높이 top~bottom. 한 자리 수는 1부터 넘어간다
 *                                                → { el, unit, right, end, render }
 *   THEME.points(el, items, { x, y, w, size, gap, mark, at, each })   항목 줄. items: [문장 | { text, note }]. mark: 'num'(주황 번호) | 'ring'(승인 고리) → { el, rows, end, render }
 *   THEME.split(el, { x, x0, x1, top, bottom, gap, left: { label, tone }, right: { label, tone }, at, rightAt })
 *                                                「좌우 대비」 두 면. tone: 'panel' | 'orange' | 'light' | 'line' → { left, right, leftEl, rightEl, rightAt, end, render }
 *   THEME.sequence(el, items, { x0, x1, y, h, gap, size, groups, at, each })   「가로 순서」. items: [{ label, note, tone: 'now'|'done'|'next'|'off', ring }]
 *                                                groups: [{ from, to, label }] → { cells, end, render }
 *   THEME.callout(el, { from: [x, y], x, y, head, text, lines, w, at })   「짚는 말」: 흰 이름표(또는 lines 가 있으면 경로 상자)와 짚는 선 → { el, end, render }
 *   THEME.quote(el, { who, text, x, y, size, sub, org, at })   「인물과 대사」: 큰 인물 고리와 대사 → { el, title, end, render }
 *   THEME.doc(el, { x, y, w, h, label, lines, size, mono, at, each })   「원문 크게」: 밝은 종이에 원문. lines: [문장 | { text, mark, dim }] → { el, end, render }
 *   THEME.tile(el, { x, y, w, h, n, title, text, tone, at })   「카드 격자」 칸 하나 → { el, body, end, render }
 *   THEME.table(el, rows, { x, y, cols, head, rowH, size, approve, check, at, each })   「표」. approve: 연두 이름표로 둘 열 번호, check: 고리를 둘 열 번호
 *                                                → { rows, end, render }
 *   THEME.quiz(el, opts, { x0, x1, y, h, size, answer, answerText, revealAt, at, each })   「퀴즈」 보기 칸. revealAt 에 정답 칸이 주황이 된다 → { items, revealAt, end, render }
 *   THEME.checklist(el, items, { x, y, w, rowH, size, at, each })   「확인 목록」. items: [{ text, note, value, state: 'pass'|'fail'|'todo' }] → { rows, end, render }
 *   THEME.gates(el, items, { x0, x1, y, r, size, groups, close, whoAt, at, each })   「승인 지점 줄」. items: [{ label, who, note, off }] → { cols, end, render }
 *   THEME.boxOf(e, ref, g)                       e 의 상자를 ref 기준 무대 px { x, y, w, h } 로(짚는 말의 from 을 구할 때)
 */
(function () {
  'use strict';
  const R = window.REEL;
  const { ease, prog, clamp, lerp, rand, noise, css, h, s } = R;
  const T = (window.THEME = window.THEME || {});
  const SW = 1920, SH = 1080, TAU = Math.PI * 2;
  // violet·indigo·cyan 은 옛 이름이다(장면 코드가 TH.colors.violet 을 쓴다). 값은 이 테마의 색이다
  const C = { bg: '#141414', ink: '#F7F7F5', dim: '#C4C4BE', lime: '#C6FF4A', orange: '#FF5B14', panel: '#1F1F1F',
    violet: '#FF5B14', indigo: '#2A2A2A', cyan: '#C4C4BE' };
  const SPEC = ['#F7F7F5', '#C4C4BE', '#FF5B14', '#C4C4BE', '#F7F7F5'];
  const FEATHER = 1.5;
  // 제목 크기는 받은 값을 그대로 쓴다. 옛 장면 코드는 본문을 제목 아래 고정 y 에 두어서 크기를 올리면 제목과 본문이 겹친다(2026-11-24 확인).
  // 큰 제목은 레이아웃 부품(statement 120, quote 76, videoTitle 116~120)과 장면 코드의 size 로 정한다
  const TSIZE = v => v;

  const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${clamp(a).toFixed(3)})`; };
  const mix = (a, b, t) => { const p = parseInt(a.slice(1), 16), q = parseInt(b.slice(1), 16), k = clamp(t);
    return `rgb(${[16, 8, 0].map(sh => Math.round(lerp((p >> sh) & 255, (q >> sh) & 255, k))).join(',')})`; };
  const px = v => (v == null ? '' : typeof v === 'number' ? v + 'px' : v);
  const txt = (tag, cls, parent, text) => { const e = h(tag, cls, parent); if (text != null) e.textContent = text; return e; };
  let uid = 0;

  // 가림 걷기 마스크: f(0~1)만큼 왼쪽부터 드러난다. 다 드러나면 mask 를 지운다
  function maskAt(el, f, feather = 16, angle = 100) {
    if (f >= 1) { if (el.style.maskImage !== 'none') { el.style.maskImage = 'none'; el.style.webkitMaskImage = 'none'; } return; }
    const x = lerp(-feather, 100 + feather, f);
    const m = `linear-gradient(${angle}deg, #000 ${(x - feather).toFixed(1)}%, rgba(0,0,0,0) ${x.toFixed(1)}%)`;
    el.style.maskImage = m; el.style.webkitMaskImage = m;
  }
  // 글자 한 줄의 잉크(실제로 칠해지는 부분)가 yTop~yBot 을 채우는 글자 크기와 상자 top(line-height 1 기준)
  function inkFit(e, text, yTop, yBot) {
    const cs = getComputedStyle(e);
    const g = document.createElement('canvas').getContext('2d');
    g.font = `${cs.fontStyle} ${cs.fontWeight} 1000px ${cs.fontFamily}`;
    const m = g.measureText(text);
    const a = m.actualBoundingBoxAscent / 1000, d = m.actualBoundingBoxDescent / 1000;
    const fa = m.fontBoundingBoxAscent / 1000, fd = m.fontBoundingBoxDescent / 1000;
    const fs = (yBot - yTop) / (a + d);
    return { fs, top: yTop - ((1 - fa - fd) / 2 + fa - a) * fs };
  }
  function glow(g, x, y, r, hex, a) {
    if (a <= 0.002 || r <= 1) return;
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, rgba(hex, a)); gr.addColorStop(0.45, rgba(hex, a * 0.45)); gr.addColorStop(1, rgba(hex, 0));
    g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  function quad(g, pts) { g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]); g.closePath(); }
  function edgeLine(g, a, b, alpha, width) {
    if (alpha <= 0.01) return;
    g.strokeStyle = rgba(C.ink, alpha * 0.6); g.lineWidth = width; g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.stroke();
  }

  // ── 바탕 ──
  T.bg = (el, variant = 'base') => {
    const v = ['base', 'accent', 'lab', 'deep'].includes(variant) ? variant : 'base';
    const root = h('div', 'p3-bg p3-bg-' + v, el);
    const spot = h('div', 'p3-bg-spot', root);
    const sheet = v === 'lab' ? h('div', 'p3-bg-sheet', root) : null;
    const bar = v === 'accent' ? h('div', 'p3-bg-bar', root) : null;
    return {
      el: root,
      render(lt, ctx) {
        const amb = ctx ? ctx.amb : lt;
        spot.style.transform = `translate(${(60 * Math.sin(amb / 11)).toFixed(1)}px, ${(40 * Math.cos(amb / 13)).toFixed(1)}px)`;
        if (bar) bar.style.transform = `scaleX(${prog(lt, 0, 0.8, ease.outQuart).toFixed(4)})`;
        if (sheet) sheet.style.opacity = prog(lt, 0, 0.5, ease.outCubic).toFixed(3);
      },
    };
  };

  // ── 머리말 ──
  const chapterLabel = c => {
    if (c == null || c === '') return '파트 3';
    const n = typeof c === 'number' ? c : parseInt(String(c).replace(/\D/g, ''), 10);
    return Number.isFinite(n) && n > 0 ? `파트 3 · ${n}장` : String(c);
  };
  T.header = (el, o = {}) => {
    const box = h('div', 'p3-header', el);
    h('i', 'p3-tick', box);
    txt('span', '', box, chapterLabel(o.chapter));
    if (o.title) txt('b', '', box, o.title);
    const fic = o.fiction ? txt('div', 'p3-fiction', o.fiction === 'inline' ? box : el, '가상 사례') : null;
    const at = o.at ?? 0.05;
    return {
      el: box,
      render(lt) {
        const p = prog(lt, at, 0.6, ease.outCubic);
        maskAt(box, p, FEATHER, 90);
        box.style.transform = p < 1 ? `translateX(${((1 - p) * -18).toFixed(1)}px)` : 'none';
        if (fic && fic.parentNode !== box) { const q = prog(lt, at + 0.2, 0.5, ease.outCubic); maskAt(fic, q, FEATHER, 90); }
      },
    };
  };

  // ── 제목: 줄마다 주황 막대가 지나간 뒤 글자가 남는다 ── 낱말 단위로 줄을 바꾼다(어절 중간에서 끊지 않는다)
  function splitWords(el, text, em) {
    el.textContent = '';
    const chars = [];
    const seg = new Intl.Segmenter('ko', { granularity: 'grapheme' });
    for (const part of String(text).split(/(\n|[ \t]+)/)) {
      if (!part) continue;
      if (part === '\n') { el.appendChild(document.createElement('br')); continue; }
      if (/^[ \t]+$/.test(part)) { el.appendChild(document.createTextNode(' ')); continue; }
      const w = h('span', 'p3-w' + (em && em.some(x => part.includes(x)) ? ' p3-em' : ''), el);
      for (const { segment } of seg.segment(part)) chars.push(txt('span', 'p3-ch', w, segment));
    }
    return chars;
  }
  // 장 제목(2026-11-24 기준): x 120, y 146, 72px. 핵심 요소는 그 아래 y 240~900 을 쓴다
  T.pageTitle = (el, text, o = {}) => T.title(el, text, Object.assign({ x: 120, y: 146, size: 72, exact: true, at: 0.2 }, o));
  T.title = (el, text, o = {}) => {
    const t = h('div', 'p3-title' + (o.cls ? ' ' + o.cls : ''), el);
    if (o.flow) t.style.position = 'relative'; else css(t, { left: px(o.x ?? 120), top: px(o.y ?? 200) });
    if (o.w) t.style.width = px(o.w);
    if (o.size) t.style.fontSize = px(o.exact ? o.size : TSIZE(o.size));
    t.style.fontWeight = String(o.weight ?? 800);
    if (o.style) css(t, o.style);
    const chars = splitWords(t, text, o.em);
    const words = [...t.querySelectorAll('.p3-w')];
    const tops = [...new Set(words.map(w => w.offsetTop))].sort((a, b) => a - b);
    const lines = Math.max(1, tops.length);
    const at = o.at ?? 0.2, GAP = 0.09;
    const bars = tops.map((top, li) => {
      const ws = words.filter(w => w.offsetTop === top);
      const l = Math.min(...ws.map(w => w.offsetLeft)), r = Math.max(...ws.map(w => w.offsetLeft + w.offsetWidth));
      const b = h('div', 'p3-title-bar', t);
      css(b, { left: (l - 6) + 'px', top: (top + ws[0].offsetHeight * 0.06) + 'px', width: (r - l + 12) + 'px', height: (ws[0].offsetHeight * 0.9) + 'px' });
      return { b, ws };
    });
    return {
      el: t, chars, lines, end: at + lines * GAP + 0.9,
      render(lt) {
        bars.forEach(({ b, ws }, li) => {
          const t0 = at + li * GAP, a = prog(lt, t0, 0.32, ease.inOutCubic), c = prog(lt, t0 + 0.34, 0.36, ease.inOutCubic);
          b.style.transformOrigin = c > 0 ? '100% 50%' : '0 50%';
          b.style.transform = `scaleX(${(c > 0 ? 1 - c : a).toFixed(4)})`;
          b.style.display = (a <= 0 || c >= 1) ? 'none' : '';
          const on = lt >= t0 + 0.32 ? '1' : '0';
          ws.forEach(w => { w.style.opacity = on; });
        });
      },
    };
  };

  // ── 가림 걷기 ── 빛줄기 없이 경계가 또렷한 마스크(옛 beam 인자는 무시)
  T.sweep = (el, o = {}) => {
    const tg = o.target, at = o.at ?? 0.2, dur = (o.dur ?? 0.8) * 0.75, angle = o.angle ?? 100;
    return { render(lt) { if (tg) maskAt(tg, prog(lt, at, dur, ease.inOutQuart), FEATHER, angle); } };
  };
  T.reveal = (e, lt, at, o = {}) => {
    const p = prog(lt, at, o.dur ?? 0.5, ease.outCubic);
    maskAt(e, p, FEATHER, o.angle ?? 90);
    const dx = o.dx ?? -14, dy = o.dy ?? 0;
    e.style.transform = p < 1 ? `translate(${((1 - p) * dx).toFixed(1)}px, ${((1 - p) * dy).toFixed(1)}px)` : 'none';
    return p;
  };

  // ── 면(옛 이름 glass) ── 평평한 숯색 면. focusAt 이면 왼쪽에서 펼쳐진다. 흐림·떠다니기·무지개 띠 없음
  T.glass = (el, o = {}) => {
    const depth = ['front', 'mid', 'back'].includes(o.depth) ? o.depth : 'mid';
    const g = h('div', `p3-glass ${depth}` + (o.cls ? ' ' + o.cls : ''), el);
    css(g, { left: px(o.x ?? 0), top: px(o.y ?? 0), width: px(o.w ?? 600), height: o.h != null ? px(o.h) : 'auto', borderRadius: px(Math.min(o.radius ?? 20, 20)) });
    const body = h('div', 'p3-glass-body', g);
    if (o.pad != null) body.style.padding = px(o.pad);
    let lit = 0;
    return {
      el: g, body,
      light(v) { lit = clamp(v); },
      render(lt) {
        if (o.focusAt != null) {
          const p = prog(lt, o.focusAt, (o.focusDur ?? 0.8) * 0.8, ease.outQuart);
          g.style.clipPath = p < 1 ? `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0)` : 'none';
        }
        g.style.borderColor = lit > 0.01 ? rgba(C.orange, 0.9 * lit) : '';
      },
    };
  };

  // ── 카드 ──
  T.card = (el, o = {}) => {
    const at = o.at ?? 0.3;
    const gl = T.glass(el, Object.assign({}, o, { focusAt: o.focus ? at : null }));
    if (o.label) txt('div', 'p3-card-label', gl.body, o.label);
    if (o.title) txt('div', 'p3-card-title', gl.body, o.title);
    if (o.body) txt('div', 'p3-card-body', gl.body, o.body);
    const sw = o.focus ? null : T.sweep(el, { target: gl.el, at, dur: o.dur ?? 0.8 });
    return { el: gl.el, body: gl.body, glass: gl, render(lt, ctx) { gl.render(lt, ctx); if (sw) sw.render(lt); } };
  };

  // ── 단계 표시: 주황 칸 안의 큰 번호 + 오른쪽에 「단계」「/ 7」과 칸 점 줄 ──
  T.step = (el, n, total, o = {}) => {
    const box = h('div', 'p3-step', el);
    css(box, { left: px(o.x ?? 120), top: px(o.y ?? 200) });
    const tile = h('div', 'p3-step-tile', box);
    const num = txt('span', 'p3-step-n', tile, String(n));
    const side = h('div', 'p3-step-head', box);
    txt('span', 'p3-step-k', side, o.word ?? '단계');
    txt('span', 'p3-step-t', side, '/ ' + total);
    const dots = h('div', 'p3-step-dots', side);
    const ds = Array.from({ length: total }, (_, i) => h('i', i + 1 < n ? 'past' : i + 1 === n ? 'now' : 'next', dots));
    const at = o.at ?? 0.15;
    return {
      el: box,
      render(lt) {
        const pt = prog(lt, at, 0.5, ease.outQuart);
        tile.style.clipPath = pt < 1 ? `inset(0 ${((1 - pt) * 100).toFixed(2)}% 0 0 round 20px)` : 'none';
        const pn = prog(lt, at + 0.25, 0.5, ease.outQuart);
        num.style.transform = pn < 1 ? `translateY(${((1 - pn) * 60).toFixed(1)}px)` : 'none';
        num.style.opacity = pn > 0 ? '1' : '0';
        maskAt(side, prog(lt, at + 0.3, 0.6, ease.outCubic), FEATHER, 90);
        ds.forEach((d, i) => { d.style.transform = `scale(${prog(lt, at + 0.4 + i * 0.05, 0.3, ease.outCubic).toFixed(3)})`; });
      },
    };
  };

  // ── 그린 장면: 영상과 대표 그림이 모두 없을 때 영상 자리에 까는 흑백 공간(글자 없음) ──
  const PL = Array.from({ length: 16 }, (_, i) => ({
    X: (i % 2 ? 1 : -1) * lerp(0.6, 3.0, rand(i, 1)), Y: lerp(-1.5, 0.05, rand(i, 2)), z0: i * 0.7,
    w: lerp(1.0, 1.8, rand(i, 3)), h: lerp(1.5, 2.6, rand(i, 4)), ry: (i % 2 ? -1 : 1) * lerp(0.5, 0.95, rand(i, 5)),
  }));
  function glassScene(cv, kind, flip) {
    const g = cv.getContext('2d');
    const cw = cv.width, ch = cv.height;
    const k = Math.max(cw / SW, ch / SH), ox = (cw - SW * k) / 2, oy = (ch - SH * k) / 2;
    const sky = g.createLinearGradient(0, 0, 0, SH);
    sky.addColorStop(0, '#202020'); sky.addColorStop(1, C.bg);
    const P = (cx, cy, f) => (x, y, z) => { const zz = Math.max(0.3, z); return [cx + (f * x) / zz, cy + (f * y) / zz]; };
    const scenes = {
      intro(t) {                                   // 판 여러 장 사이로 천천히 나아간다
        const cx = SW / 2, cy = SH * 0.36, D = PL.length * 0.7, pr = P(cx, cy, 1050);
        PL.map(p => ({ p, Z: ((((p.z0 - t * 0.32) % D) + D) % D) + 0.9 })).sort((a, b) => b.Z - a.Z).forEach(({ p, Z }) => {
          const a = clamp((D + 0.9 - Z) / 2.2) * clamp((Z - 1.0) / 1.4);
          if (a <= 0.01) return;
          const c = (Math.cos(p.ry) * p.w) / 2, sn = (Math.sin(p.ry) * p.w) / 2;
          const c0 = pr(p.X - c, p.Y - p.h / 2, Z - sn), c1 = pr(p.X + c, p.Y - p.h / 2, Z + sn);
          const c2 = pr(p.X + c, p.Y + p.h / 2, Z + sn), c3 = pr(p.X - c, p.Y + p.h / 2, Z - sn);
          quad(g, [c0, c1, c2, c3]); g.fillStyle = rgba(C.ink, 0.05 * a); g.fill();
          g.lineWidth = 1.4; g.strokeStyle = rgba(C.ink, 0.22 * a); g.stroke();
          edgeLine(g, c0, [lerp(c0[0], c1[0], 0.45), lerp(c0[1], c1[1], 0.45)], 0.6 * a, 2.2);
        });
      },
      path(t) {                                    // 점 하나가 판 다섯 장을 차례로 지나간다
        const u = (t % 6.5) / 6.5, fade = 1 - clamp((u - 0.86) / 0.14);
        const xAt = q => lerp(150, 1720, ease.inOutSine(clamp(q / 0.8)));
        const yAt = x => 330 + Math.sin(x / 260) * 26;
        const head = xAt(u);
        [380, 650, 920, 1190, 1460].forEach((x, i) => {
          const sc = lerp(1.25, 0.8, i / 4), w = 130 * sc, hh = 320 * sc, sk = 50 * sc, cy = yAt(x);
          const lit = clamp((head - x) / 70) * fade;
          const c0 = [x - w / 2, cy - hh / 2 + sk / 2], c1 = [x + w / 2, cy - hh / 2 - sk / 2], c2 = [x + w / 2, cy + hh / 2 - sk / 2], c3 = [x - w / 2, cy + hh / 2 + sk / 2];
          quad(g, [c0, c1, c2, c3]); g.fillStyle = rgba(C.ink, 0.05 + 0.1 * lit); g.fill();
          g.lineWidth = 1.5; g.strokeStyle = rgba(C.ink, 0.2 + 0.5 * lit); g.stroke();
        });
        glow(g, head, yAt(head), 16, '#FFFFFF', 0.9 * fade);
      },
      rings(t) {                                   // 한 줄로 놓인 고리가 차례로 연두로 닫힌다
        const u = t % 8, fade = 1 - clamp((u - 7.2) / 0.8);
        for (let i = 6; i >= 0; i--) {
          const q = i / 6, x = lerp(330, 1560, q), y = lerp(360, 240, q), r = lerp(170, 64, q);
          const on = clamp((u - (0.9 + i * 0.75)) / 0.35) * fade;
          g.save(); g.translate(x, y); g.scale(0.42, 1);
          g.lineWidth = r * 0.16; g.strokeStyle = rgba(C.ink, 0.08 + 0.05 * on);
          g.beginPath(); g.arc(0, 0, r, 0, TAU); g.stroke();
          g.strokeStyle = rgba(C.lime, 0.85 * on); g.lineWidth = 4 / 0.42;
          g.beginPath(); g.arc(0, 0, r, 0, TAU); g.stroke();
          g.restore();
        }
      },
    };
    const run = scenes[kind] || scenes.intro;
    return t => {
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.clearRect(0, 0, cw, ch);
      g.setTransform(flip ? -k : k, 0, 0, k, flip ? cw - ox : ox, oy);
      g.fillStyle = sky; g.fillRect(0, 0, SW, SH);
      run(t);
    };
  }

  // ── 영상 띠 전환(파트 인트로·챕터 전환) ── 위쪽 영상(흑백), 아래 주황 띠에 머리 줄·제목·질문. 띠 높이는 글 양에 맞춘다
  T.videoTitle = (el, o = {}) => {
    const intro = o.kind === 'intro';
    const root = h('div', 'p3-vt' + (intro ? ' intro' : ''), el);
    const media = h('div', 'p3-vt-media', root);
    let draw = null, still = null;
    // 영상 셋(p3-intro, p3-tr-path, p3-tr-rings)은 판과 고리가 화면 높이의 5~55%에 있다. 띠 위로 보이는 520~560px 에
    // 그 자리가 들어오도록 위쪽 8% 지점에 맞춰 자른다(o.pos 로 바꿀 수 있다)
    const pos = o.pos || '50% 8%';
    if (o.src && o.poster) {
      const v = DECK.video(media, o.src, { poster: o.poster, style: { objectPosition: pos } });
      if (o.flip) v.style.transform = 'scaleX(-1)';
    } else if (o.poster) {
      still = KIT.cover(media, o.poster, { objectPosition: pos });
    } else {
      const cv = h('canvas', '', media); cv.width = SW; cv.height = SH;
      draw = glassScene(cv, o.scene || (intro ? 'intro' : 'path'), !!o.flip);
    }
    const shade = h('div', 'p3-vt-shade', root);
    const band = h('div', 'p3-vt-band', root);
    const box = h('div', 'p3-vt-text', root);
    const at = o.at ?? 0.25;
    const kick = h('div', 'p3-vt-kicker', box);
    h('i', 'p3-tick', kick);
    txt('span', '', kick, o.kicker || '파트 3');
    const ttl = T.title(box, o.title || '', { flow: true, w: 1680, size: intro ? 120 : 116, exact: true, at: at + 0.15, weight: o.weight ?? 900 });
    const q = o.sub ? txt('div', 'p3-vt-q', box, o.sub) : null;
    const maxQ = intro ? 3 : 2;
    if (ttl.lines > 2) console.warn(`[DECK] 영상 위 제목이 ${ttl.lines}줄이다(2줄까지): ${o.title}`);
    const qLines = q ? Math.round(q.getBoundingClientRect().height / (parseFloat(getComputedStyle(q).lineHeight) || 59)) : 0;
    if (qLines > maxQ) console.warn(`[DECK] 영상 위 질문이 ${qLines}줄이다(${maxQ}줄까지): ${o.sub}`);
    const bandH = () => Math.max(intro ? 560 : 520, box.offsetHeight + 70 + 60);
    let BH = bandH();
    const fit = () => { BH = bandH(); band.style.height = BH + 'px'; media.style.bottom = BH + 'px'; shade.style.bottom = BH + 'px'; };
    fit();
    return {
      el: root, title: ttl, lines: { title: ttl.lines, sub: qLines },
      render(lt, ctx) {
        const amb = ctx ? ctx.amb : lt;
        if (band.offsetHeight !== BH || box.offsetHeight + 130 > BH) fit();   // 장면 코드가 글 상자를 바꾼 경우
        if (draw) draw(amb);
        media.style.transform = `scale(${lerp(1.06, 1, ease.outCubic(clamp(lt / 1.8))).toFixed(4)})`;
        if (still) still.style.transform = `${o.flip ? 'scaleX(-1) ' : ''}scale(${(1 + 0.03 * clamp(lt / 14)).toFixed(4)})`;
        const pb = prog(lt, Math.max(0, at - 0.2), 0.7, ease.outQuart);
        band.style.clipPath = pb < 1 ? `inset(${((1 - pb) * 100).toFixed(2)}% 0 0 0)` : 'none';
        const pk = prog(lt, at, 0.5, ease.outCubic);
        maskAt(kick, pk, FEATHER, 90); kick.style.transform = pk < 1 ? `translateX(${((1 - pk) * -16).toFixed(1)}px)` : 'none';
        ttl.render(lt);
        if (q) { const pq = prog(lt, at + 0.95, 0.6, ease.outCubic); maskAt(q, pq, FEATHER, 90); q.style.transform = pq < 1 ? `translateY(${((1 - pq) * 12).toFixed(1)}px)` : 'none'; }
      },
    };
  };

  // ── 경로: 흰 선 위를 지나는 흰 점 ── Catmull-Rom 곡선으로 마디를 잇는다
  function bez(pts) {
    const segs = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      segs.push(`C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`);
    }
    return { m: `M ${pts[0][0]} ${pts[0][1]}`, segs };
  }
  T.path = (el, nodes, o = {}) => {
    const svg = s('svg', { width: SW, height: SH, viewBox: `0 0 ${SW} ${SH}` }, el);
    svg.setAttribute('class', 'p3-path');
    const col = o.color === 'lime' ? C.lime : C.ink;
    const { m, segs } = bez(nodes);
    const d = m + ' ' + segs.join(' '), sw = o.width ?? 2;
    const base = s('path', { d, fill: 'none', stroke: 'rgba(247,247,245,.22)', 'stroke-width': sw, 'stroke-linecap': 'round' }, svg);
    const trail = s('path', { d, fill: 'none', stroke: col, 'stroke-opacity': 0.6, 'stroke-width': sw + 1.5, 'stroke-linecap': 'round' }, svg);
    const comet = s('path', { d, fill: 'none', stroke: col, 'stroke-width': sw + 4, 'stroke-linecap': 'round' }, svg);
    const halo = s('circle', { r: 16, fill: 'none', stroke: col, 'stroke-width': 2, 'stroke-opacity': 0.5 }, svg);
    const head = s('circle', { r: 8, fill: col }, svg);
    const L = base.getTotalLength();
    const lens = nodes.map((_, i) => {
      if (!i) return 0;
      const tp = s('path', { d: m + ' ' + segs.slice(0, i).join(' ') }, svg);
      const l = tp.getTotalLength(); tp.remove(); return l;
    });
    const n = nodes.length;
    const raw = o.times || nodes.map((_, i) => (o.at ?? 0.3) + i * ((o.dur ?? 2.4) / Math.max(1, n - 1)));
    const arr = raw.map(t => (Array.isArray(t) ? t[0] : t)), lev = raw.map(t => (Array.isArray(t) ? t[1] : t));
    const lenAt = t => {
      if (t <= arr[0]) return 0;
      for (let i = 0; i < n - 1; i++) {
        if (t <= lev[i]) return lens[i];
        if (t < arr[i + 1]) return lerp(lens[i], lens[i + 1], ease.inOutSine((t - lev[i]) / Math.max(1e-6, arr[i + 1] - lev[i])));
      }
      return L;
    };
    KIT.drawPrep(base);
    const baseAt = o.baseAt ?? arr[0] - 0.4, tail = o.tail ?? 0.3;
    return {
      el: svg, arr, lev, L,
      point(t) { const p = base.getPointAtLength(lenAt(t)); return [p.x, p.y]; },
      render(lt) {
        KIT.draw(base, prog(lt, baseAt, 0.8, ease.inOutSine));
        const hl = lenAt(lt), tl = lenAt(lt - tail);
        const on = clamp((lt - arr[0]) / 0.15);
        trail.style.strokeDasharray = `${tl.toFixed(1)} ${(2 * L).toFixed(0)}`;
        trail.style.opacity = tl > 0.5 ? '1' : '0';
        comet.style.strokeDasharray = `${Math.max(0, hl - tl).toFixed(1)} ${(2 * L).toFixed(0)}`;
        comet.style.strokeDashoffset = (-tl).toFixed(1);
        comet.style.opacity = on.toFixed(3);
        const pt = base.getPointAtLength(hl);
        [halo, head].forEach(c => { c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1)); c.style.opacity = on.toFixed(3); });
      },
    };
  };

  // ── 승인 지점 고리(연두) ──
  T.ring = (el, o = {}) => {
    const r = o.r ?? 44, pad = 36, sz = (r + pad) * 2, c = sz / 2;
    const box = h('div', 'p3-ring', el);
    css(box, { left: px((o.x ?? 0) - sz / 2), top: px((o.y ?? 0) - sz / 2), width: px(sz) });
    const svg = s('svg', { width: sz, height: sz, viewBox: `0 0 ${sz} ${sz}` }, box);
    // width: 호의 굵기(기본 4), baseWidth: 바탕 점선의 굵기(기본 2). 큰 고리(반지름 70 이상)는 width 를 r/11 안팎으로 준다
    const AW = o.width ?? 4, BW = o.baseWidth ?? Math.max(2, AW / 2.5);
    const base = s('circle', { cx: c, cy: c, r, fill: 'none', stroke: 'rgba(198,255,74,.45)', 'stroke-width': BW, 'stroke-dasharray': '2 8' }, svg);
    const halo = s('circle', { cx: c, cy: c, r, fill: 'none', stroke: C.lime, 'stroke-width': 2, opacity: 0 }, svg);
    const disc = s('circle', { cx: c, cy: c, r: r - 1, fill: C.lime, opacity: 0 }, svg);
    const arc = s('circle', { cx: c, cy: c, r, fill: 'none', stroke: C.lime, 'stroke-width': AW, 'stroke-linecap': 'round', transform: `rotate(-60 ${c} ${c})` }, svg);
    const Lc = TAU * r;
    arc.style.strokeDasharray = `${Lc.toFixed(2)} ${Lc.toFixed(2)}`;
    const chk = s('path', { d: `M ${c - r * 0.4} ${c + r * 0.02} L ${c - r * 0.1} ${c + r * 0.3} L ${c + r * 0.42} ${c - r * 0.28}`,
      fill: 'none', stroke: C.bg, 'stroke-width': Math.max(3, r * 0.14), 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    KIT.drawPrep(chk);
    const gly = o.glyph ? txt('div', 'p3-ring-glyph', box, o.glyph) : null;
    if (gly) css(gly, { top: (c - 24) + 'px' });
    const lab = o.label ? txt('div', 'p3-ring-label', box, o.label) : null;
    const nm = o.name ? txt('div', 'p3-ring-name', box, o.name) : null;
    const state = o.state || (o.closeAt != null ? 'closed' : 'open');
    const openAt = o.at ?? 0.3, closeAt = state === 'closed' ? o.closeAt : null;
    return {
      el: box, closeAt,
      render(lt) {
        const po = prog(lt, openAt, 0.6, ease.inOutSine);
        const pc = closeAt != null ? prog(lt, closeAt, 0.25, ease.outCubic) : 0;
        const frac = state === 'hollow' ? 0 : lerp(0, 300 / 360, po) + pc * (60 / 360);
        arc.style.strokeDashoffset = (Lc * (1 - frac)).toFixed(2);
        base.style.opacity = po.toFixed(3);
        svg.style.transform = `scale(${lerp(0.82, 1, po).toFixed(4)})`;
        disc.setAttribute('opacity', pc.toFixed(3));
        KIT.draw(chk, closeAt != null ? prog(lt, closeAt + 0.1, 0.25, ease.outCubic) : 0);
        const ph = closeAt != null ? clamp((lt - closeAt) / 0.6) : 0;
        halo.setAttribute('r', (r + 24 * ease.outCubic(ph)).toFixed(2));
        halo.setAttribute('opacity', (ph > 0 && ph < 1 ? 0.6 * (1 - ph) : 0).toFixed(3));
        if (gly) gly.style.opacity = (po * (1 - pc)).toFixed(3);
        [lab, nm].forEach((e, i) => {
          if (!e) return;
          const p = prog(lt, openAt + 0.3 + i * 0.12, 0.5, ease.outCubic);
          e.style.opacity = p.toFixed(3); e.style.transform = p < 1 ? `translateY(${((1 - p) * 12).toFixed(1)}px)` : 'none';
        });
      },
    };
  };

  // ── 이름 칸 ── light(v) 만큼 주황 테두리가 켜진다
  T.chip = (el, text, o = {}) => {
    const c = txt('div', 'p3-chip' + (o.cls ? ' ' + o.cls : ''), el, text);
    css(c, { left: px(o.x ?? 0), top: px(o.y ?? 0) });
    if (o.center) css(c, { left: px((o.x ?? 0) - c.offsetWidth / 2), top: px((o.y ?? 0) - c.offsetHeight / 2) });
    const at = o.at ?? 0.3, onBand = !!(el.closest && el.closest('.p3-vt-text'));   // 전환 띠 위의 칸은 검정 칸 그대로 둔다
    let lv = 0;
    return {
      el: c,
      light(v) { lv = onBand ? 0 : clamp(v); },
      render(lt) {
        const p = prog(lt, at, 0.5, ease.outCubic);
        maskAt(c, p, FEATHER, 100);
        c.style.transform = p < 1 ? `translateY(${((1 - p) * 10).toFixed(1)}px)` : 'none';
        c.style.boxShadow = lv > 0.01 ? `inset 0 0 0 3px ${rgba(C.orange, lv)}` : '';   // 켜진 칸은 주황 테두리(주황 면을 한 장에 한두 곳으로 아낀다)
      },
    };
  };

  // ── 화면 틀 ──
  const SIZES = { wide: [1200, 750], full: [1440, 810], tall: [600, 900] };
  T.shot = (el, src, o = {}) => {
    const [w, hh] = o.w && o.h ? [o.w, o.h] : SIZES[o.size] || SIZES.wide;   // w·h 를 주면 크기 이름 대신 그 크기로
    const at = o.at ?? 0.2;
    const gl = T.glass(el, { x: o.x ?? Math.round((SW - w) / 2), y: o.y ?? 200, w, h: hh, radius: 20, pad: 0, focusAt: o.focus ? at : null });
    gl.el.classList.add('p3-shot');
    const scr = h('div', 'p3-screen', gl.body);
    let img = null;
    if (src) { img = R.img(src); img.className = 'p3-shot-img'; scr.appendChild(img); }
    const alt = h('div', 'p3-screen-alt', scr);
    let drawn = {};
    if (o.draw) drawn = o.draw(alt, w - 24, hh - 24) || {};
    else if (o.chat) {
      const fr = KIT.frame(alt, o.frame || 'browser', { url: o.url || 'chatgpt.com', style: { left: '0', top: '0', width: '100%', height: '100%', borderRadius: '0', border: '0' } });
      const chat = KIT.chat(fr.body, o.chat, Object.assign({ style: { inset: '0' } }, o.chatOpts || {}));
      drawn = { render: lt => chat.render(lt), end: chat.end, frame: fr, chat };
    }
    const sb = scr.getBoundingClientRect();
    const marks = (o.marks || []).map((m, i) => {
      const mk = h('div', 'p3-mark', scr);
      if (typeof m.pick === 'function' && m.pick(drawn)) {
        const b = m.pick(drawn).getBoundingClientRect(), g = m.grow ?? 10;
        Object.assign(m, { x: (b.left - sb.left - g) / sb.width, y: (b.top - sb.top - g) / sb.height, w: (b.width + 2 * g) / sb.width, h: (b.height + 2 * g) / sb.height });
      }
      css(mk, { left: m.x * 100 + '%', top: m.y * 100 + '%', width: m.w * 100 + '%', height: m.h * 100 + '%' });
      return { mk, at: m.at ?? (o.markAt ?? at + 1.2) + i * 0.35 };
    });
    const sw = o.focus ? null : T.sweep(el, { target: gl.el, at, dur: 0.9 });
    return {
      el: gl.el, screen: alt, glass: gl, drawn, end: drawn.end,
      render(lt, ctx) {
        gl.render(lt, ctx);
        if (sw) sw.render(lt);
        const useImg = !!(img && img.complete && img.naturalWidth > 0);
        if (img) img.style.display = useImg ? '' : 'none';
        alt.style.display = useImg ? 'none' : '';
        if (!useImg && drawn.render) drawn.render(lt, ctx);
        marks.forEach(({ mk, at: ma }) => {
          const p = prog(lt, ma, 0.4, ease.outCubic);
          mk.style.opacity = p.toFixed(3); mk.style.transform = `scale(${lerp(1.08, 1, p).toFixed(4)})`;
        });
      },
    };
  };

  // ── 결과물 틀 ──
  T.exhibit = (el, o = {}) => {
    const w = o.w ?? 538, hh = o.h ?? 932, pad = o.pad ?? 16, at = o.at ?? 0.2;
    const gl = T.glass(el, { x: o.x ?? 200, y: o.y ?? 74, w, h: hh, radius: 20, pad: 0, focusAt: o.focus ? at : null });
    const box = h('div', 'p3-exhibit' + (o.mono ? ' mono' : ''), gl.body);   // mono: 옛 대표 그림(보라·초록 빛)을 흑백으로 바꿔 쓴다
    css(box, { left: pad + 'px', top: pad + 'px', right: pad + 'px', bottom: pad + 'px' });
    let alt = null;
    if (o.video && o.poster) DECK.video(box, o.video, { poster: o.poster, fit: o.fit || 'cover' });
    else if (o.img) KIT.cover(box, o.img, { objectFit: o.fit || 'cover' });
    else if (o.draw) alt = o.draw(box, w - 2 * pad, hh - 2 * pad) || null;
    else {
      const cv = h('canvas', '', box); cv.width = w - 2 * pad; cv.height = hh - 2 * pad;
      const dr = glassScene(cv, o.scene || 'intro', false);
      alt = { render: (lt, ctx) => dr(ctx ? ctx.amb : lt) };
    }
    const sw = o.focus ? null : T.sweep(el, { target: gl.el, at, dur: 0.9 });
    return { el: gl.el, body: box, glass: gl, render(lt, ctx) { gl.render(lt, ctx); if (sw) sw.render(lt); if (alt && alt.render) alt.render(lt, ctx); } };
  };

  // ── 인물 표시 ── 얼굴을 그리지 않는다. 성 한 글자를 넣은 고리 + 기호 + 「이름 직위」
  const PEOPLE = {
    '한서윤': { role: '주임', org: '고객지원팀', glyph: 'bubble' },
    '오민석': { role: '팀장', org: '고객지원팀', glyph: 'stamp' },
    '정하준': { role: '대리', org: '정보화팀', glyph: 'lock' },
    '윤지영': { role: '본부장', org: '경영지원본부', glyph: 'flag' },
  };
  const GLYPH = {
    bubble: '<path d="M4 5h16v10H11l-4 4v-4H4z"/>',
    stamp: '<path d="M9.5 4h5v5l2.5 3h-10L9.5 9z"/><path d="M5 14h14v3.5H5z"/><path d="M6 20.5h12"/>',
    lock: '<rect x="5" y="11" width="14" height="9.5" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    flag: '<path d="M6 21V3.5"/><path d="M6 4h11.5l-2.5 4 2.5 4H6"/>',
  };
  function personMark(parent, who, D, glyphD) {
    const base = PEOPLE[who] || {};
    const ringBox = h('div', 'p3-person-ring', parent);
    css(ringBox, { width: D + 'px', height: D + 'px' });
    const svg = s('svg', { width: D, height: D, viewBox: `0 0 ${D} ${D}` }, ringBox);
    // 바탕 고리: 들어오기 전에는 보이지 않는다(render 에서 bgc 의 투명도를 올린다)
    const bgc = s('circle', { cx: D / 2, cy: D / 2, r: D / 2 - 2, fill: 'none', stroke: '#2E2E2E', 'stroke-width': Math.max(6, D * 0.07), opacity: 0 }, svg);
    const ring = s('circle', { cx: D / 2, cy: D / 2, r: D / 2 - 5, fill: 'none', stroke: C.ink, 'stroke-width': Math.max(2, D * 0.02), transform: `rotate(-90 ${D / 2} ${D / 2})` }, svg);
    KIT.drawPrep(ring);
    const sur = txt('span', 'p3-person-sur', ringBox, (who || '').slice(0, 1));
    sur.style.fontSize = Math.round(D * 0.42) + 'px';
    const gb = h('div', 'p3-person-glyph', ringBox);
    css(gb, { width: glyphD + 'px', height: glyphD + 'px' });
    gb.innerHTML = `<svg viewBox="0 0 24 24" width="${Math.round(glyphD * 0.6)}" height="${Math.round(glyphD * 0.6)}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${GLYPH[base.glyph] || ''}</svg>`;
    gb.style.color = base.glyph === 'stamp' ? C.lime : C.ink;
    return { ring, sur, gb, base, bgc };
  }
  T.person = (el, o = {}) => {
    const base = PEOPLE[o.who] || {};
    const p = { role: o.role ?? base.role, org: typeof o.org === 'string' ? o.org : base.org };
    const box = h('div', 'p3-person', el);
    css(box, { left: px(o.x ?? 120), top: px(o.y ?? 800) });
    // stack: true 면 고리 아래에 이름(사람 칸). nameSize: 이름 글자 크기(기본 36, 48 이상이면 제목 서체 800)
    if (o.stack) css(box, { flexDirection: 'column', alignItems: 'flex-start', gap: '18px' });
    const mk = personMark(box, o.who, 104, 44);
    const tx = h('div', 'p3-person-txt', box);
    const nm = txt('div', 'p3-person-name', tx, `${o.who || ''} ${p.role || ''}`.trim());
    if (o.nameSize) css(nm, o.nameSize >= 48 ? { fontFamily: 'var(--display)', fontSize: o.nameSize + 'px', fontWeight: '800', letterSpacing: '-0.02em', lineHeight: '1.15' } : { fontSize: o.nameSize + 'px' });
    if (o.org && p.org) txt('div', 'p3-person-org', tx, p.org);
    const at = o.at ?? 0.4;
    return {
      el: box, name: nm,
      render(lt) {
        mk.bgc.setAttribute('opacity', prog(lt, at, 0.3).toFixed(3));
        KIT.draw(mk.ring, prog(lt, at, 0.7, ease.inOutSine));
        const ps = prog(lt, at + 0.25, 0.5, ease.outCubic);
        mk.sur.style.opacity = ps.toFixed(3);
        mk.gb.style.opacity = ps.toFixed(3); mk.gb.style.transform = `scale(${lerp(0.6, 1, ps).toFixed(3)})`;
        const pt = prog(lt, at + 0.3, 0.5, ease.outCubic);
        maskAt(tx, pt, FEATHER, 90); tx.style.transform = pt < 1 ? `translateX(${((1 - pt) * -14).toFixed(1)}px)` : 'none';
      },
    };
  };

  // 어절 묶음이 줄 끝에서 나뉘지 않게 한다: 의존 명사(전에, 뒤에, 때, 수, 것 등)를 앞 어절에 붙이고(줄바꿈 없는 공백),
  // keep 으로 준 말 묶음 안의 공백도 줄바꿈 없는 공백으로 바꾼다. 화면의 글자는 그대로다
  const DEP = /(\S) (전에|전|후에|뒤에|뒤|때|때문에|수|것|것을|것이|중에|만큼|대로|동안|사이)(?=[\s,.?!·]|$)/g;
  function keepWords(text, keep) {
    let t = String(text).replace(DEP, '$1\u00A0$2');
    (Array.isArray(keep) ? keep : []).forEach(k => { t = t.split(k).join(k.replace(/ /g, '\u00A0')); });
    return t;
  }
  T.keepWords = keepWords;

  // ── 다음 질문: 챕터 끝의 주황 면 ── 첫 줄 이름표 「다음 질문」(lead 를 주면 같은 줄에 작은 안내), 아래 질문(기본 44px)
  T.nextQ = (el, o = {}) => {
    const at = o.at ?? 0.3, maxW = o.maxW ?? 1680, PX = 44, size = o.size ?? 44;
    const gl = T.glass(el, { x: 0, y: 0, w: o.w ?? maxW, radius: 20, pad: `26px ${PX}px 30px`, focusAt: o.focus ? at : null });
    gl.el.classList.add('p3-nextq');
    const head = h('div', 'p3-nextq-head', gl.body);
    css(head, { display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', marginBottom: '8px' });
    const lab = txt('span', 'p3-card-label', head, o.label ?? '다음 질문');
    lab.style.marginBottom = '0';
    let lead = null;
    if (o.lead) {
      const bar = h('i', '', head);
      css(bar, { display: 'block', width: '2px', height: '26px', margin: '0 18px', background: 'rgba(20,20,20,.4)', borderRadius: '1px' });
      lead = txt('span', 'p3-nextq-lead', head, o.lead);
    }
    const q = txt('div', 'p3-card-body p3-nextq-q', gl.body, o.keep === false ? (o.text || '') : keepWords(o.text || '', o.keep));
    css(q, { fontSize: size + 'px', wordBreak: 'keep-all', textWrap: 'balance' });
    let w = o.w;
    if (w == null) {
      const bb = gl.body.getBoundingClientRect(), zoom = (bb.width / gl.body.offsetWidth) || 1;
      const left = bb.left + PX * zoom;
      const rg = document.createRange(); rg.selectNodeContents(q);
      let right = [...rg.getClientRects()].reduce((m, r) => (r.width > 0 ? Math.max(m, (r.right - left) / zoom) : m), 0);
      right = Math.max(right, [...head.children].reduce((m, c) => Math.max(m, (c.getBoundingClientRect().right - left) / zoom), 0));
      w = Math.min(maxW, Math.ceil(right + 2 * PX + 4));
      gl.el.style.width = w + 'px';
    }
    const lh = size * 1.3, qLines = Math.round(q.offsetHeight / lh);
    if (qLines > (o.maxLines ?? 2)) console.warn(`[DECK] 다음 질문이 ${qLines}줄이다: ${o.text}`);
    const hh = gl.el.offsetHeight;
    const x = o.x ?? 120, y = o.bottom != null ? o.bottom - hh : (o.y ?? 800);
    css(gl.el, { left: x + 'px', top: y + 'px' });
    const sw = o.focus ? null : T.sweep(el, { target: gl.el, at, dur: o.dur ?? 0.8 });
    return {
      el: gl.el, body: gl.body, glass: gl, q, lead, x, y, w, h: hh, lines: qLines,
      render(lt, ctx) { gl.render(lt, ctx); if (sw) sw.render(lt); },
    };
  };

  // ═════════════════════ 레이아웃 부품 ═════════════════════

  // ── 한 문장 ── 문장(기본 120px, 세 줄까지)을 세로 가운데 cy 에. 위 이름표(lead, 30px 주황 글자), 아래 보조 줄(sub, 44px)
  T.statement = (el, text, o = {}) => {
    const x = o.x ?? 120, w = o.w ?? 1680, at = o.at ?? 0.3;
    const wrap = h('div', 'p3-statement', el);
    css(wrap, { left: x + 'px', width: w + 'px' });
    const lead = o.lead ? txt('div', 'p3-statement-lead', wrap, o.lead) : null;
    const ttl = T.title(wrap, text, { flow: true, w, size: o.size ?? 120, exact: true, at: at + (lead ? 0.2 : 0), weight: o.weight ?? 900, em: o.em });
    const sub = o.sub ? txt('div', 'p3-statement-sub', wrap, o.sub) : null;
    const H = wrap.offsetHeight;
    wrap.style.top = ((o.cy ?? 540) - H / 2).toFixed(0) + 'px';
    if (ttl.lines > (o.maxLines ?? 3)) console.warn(`[DECK] 한 문장이 ${ttl.lines}줄이다: ${text}`);
    const subAt = ttl.end - 0.2;
    return {
      el: wrap, title: ttl, end: sub ? subAt + 0.5 : ttl.end,
      render(lt) {
        if (lead) T.reveal(lead, lt, at);
        ttl.render(lt);
        if (sub) T.reveal(sub, lt, subAt, { dx: 0, dy: 14 });
      },
    };
  };

  // ── 큰 숫자 ── 숫자의 잉크가 top~bottom 을 채운다(기본 180~970, 화면 높이의 73%). 한 자리 수는 1부터 위로 넘어간다(roll: false 로 끈다)
  T.bigNum = (el, value, o = {}) => {
    const str = String(value), x = o.x ?? 110, top = o.top ?? 180, bot = o.bottom ?? 970, at = o.at ?? 0.2;
    const win = h('div', 'p3-bignum' + (o.tone === 'ink' ? ' ink' : ''), el);
    win.dataset.bleed = '';                                  // 줄 상자는 무대 밖까지 가지만 잉크는 무대 안이다
    const probe = txt('div', 'p3-bignum-d', win, str);
    const fit = inkFit(probe, str, top, bot);
    win.removeChild(probe);
    css(win, { left: x + 'px', top: fit.top.toFixed(1) + 'px', height: fit.fs.toFixed(1) + 'px',
      // 넘어가는 숫자는 잉크 높이(top~bottom) 안에서만 보인다(머리말과 겹치지 않게)
      clipPath: `inset(${Math.max(0, top - fit.top - 6).toFixed(1)}px 0 ${Math.max(0, fit.top + fit.fs - bot - 6).toFixed(1)}px 0)` });
    const roll = o.roll !== false && /^[2-9]$/.test(str);
    const vals = roll ? Array.from({ length: +str }, (_, i) => String(i + 1)) : [str];
    const ds = vals.map((v, i) => {
      const d = txt('div', 'p3-bignum-d', win, v);
      css(d, { position: 'absolute', right: '0', top: (i * fit.fs).toFixed(1) + 'px', fontSize: fit.fs.toFixed(1) + 'px', lineHeight: fit.fs.toFixed(1) + 'px' });
      return d;
    });
    const dw = Math.max(...ds.map(d => d.offsetWidth));
    win.style.width = dw + 'px';
    let unit = null, right = x + dw;
    if (o.unit) {
      unit = txt('div', 'p3-bignum-unit', el, o.unit);
      const uf = inkFit(unit, o.unit, bot - (o.unitH ?? 150), bot);
      css(unit, { fontSize: uf.fs.toFixed(1) + 'px', lineHeight: '1', left: (x + dw + 24) + 'px', top: uf.top.toFixed(1) + 'px' });
      right = x + dw + 24 + unit.offsetWidth;
    }
    const n = vals.length, fs = fit.fs;
    return {
      el: win, unit, right, end: at + (roll ? 1.3 : 0.6),
      render(lt) {
        const k = (n - 1) * prog(lt, at, 1.1, ease.inOutQuart);
        const pin = prog(lt, at - 0.05, 0.45, ease.outCubic);
        ds.forEach((d, i) => {
          d.style.transform = `translateY(${(-k * fs + (1 - pin) * fs * 0.35).toFixed(1)}px)`;
          d.style.opacity = Math.abs(i - k) < 1 ? pin.toFixed(3) : '0';   // 칸 밖으로 나간 숫자는 보이지 않게(점검 도구가 넘침으로 보지 않게)
        });
        if (unit) T.reveal(unit, lt, at + (roll ? 0.95 : 0.4), { dx: 0, dy: 16 });
      },
    };
  };

  // ── 항목 줄 ── 2~4줄, 기본 60px. mark: 'num'(주황 번호, 기본) | 'ring'(승인 고리, 승인과 관련된 항목에만) | 'none'
  T.points = (el, items, o = {}) => {
    const x = o.x ?? 120, y = o.y ?? 400, w = o.w ?? 1100, size = o.size ?? 60, gap = o.gap ?? 28, at = o.at ?? 0.6, each = o.each ?? 0.15;
    const mark = o.mark ?? 'num';
    const wrap = h('div', 'p3-points', el);
    css(wrap, { left: x + 'px', top: y + 'px', width: w + 'px' });
    const rows = items.map((it, i) => {
      const t = typeof it === 'string' ? { text: it } : it;
      const row = h('div', 'p3-point', wrap);
      css(row, { marginTop: i ? gap + 'px' : '0', paddingLeft: (mark === 'none' ? 0 : Math.round(size * 1.6)) + 'px' });
      const tt = txt('div', 'p3-point-text', row, t.text);
      tt.style.fontSize = size + 'px';
      if (t.note) txt('div', 'p3-point-note', row, t.note);
      let num = null;
      if (mark === 'num') { num = txt('div', 'p3-point-num', row, String(t.n ?? i + 1)); css(num, { fontSize: Math.round(size * 1.1) + 'px', lineHeight: tt.offsetHeight + 'px' }); }
      return { row, tt, num, t };
    });
    const tAt = i => at + i * each;
    const rings = mark === 'ring' ? rows.map((r, i) => T.ring(el, { x: x + size * 0.55, y: y + r.row.offsetTop + r.tt.offsetHeight / 2, r: Math.round(size * 0.5), at: tAt(i), closeAt: tAt(i) + 0.45 })) : [];
    return {
      el: wrap, rows, end: tAt(rows.length - 1) + 0.7,
      render(lt) {
        rows.forEach((r, i) => T.reveal(r.row, lt, tAt(i) + 0.05, { dx: -16 }));
        rings.forEach(rg => rg.render(lt));
      },
    };
  };

  // ── 좌우 대비 ── 두 면. tone: 'panel'(숯색) | 'orange'(주황 면, 검정 글자) | 'light'(밝은 면, 검정 글자) | 'line'(테두리만)
  T.split = (el, o = {}) => {
    const top = o.top ?? 250, bottom = o.bottom ?? 1000, x0 = o.x0 ?? 120, x1 = o.x1 ?? 1800, gap = o.gap ?? 24;
    const xm = o.x ?? (x0 + x1) / 2, at = o.at ?? 0.3, rightAt = o.rightAt ?? at + 0.8;
    const side = (key, def, l, r) => {
      const so = o[key] || {};
      const p = h('div', 'p3-split p3-tone-' + (so.tone || def), el);
      css(p, { left: l + 'px', top: top + 'px', width: (r - l) + 'px', height: (bottom - top) + 'px' });
      const lab = so.label ? txt('div', 'p3-split-label', p, so.label) : null;
      if (lab && (o.labelSize ?? 40) !== 30) lab.style.fontSize = (o.labelSize ?? 40) + 'px';
      const body = h('div', 'p3-split-body', p);
      return { p, lab, body };
    };
    const L = side('left', 'panel', x0, xm - gap / 2), Rr = side('right', 'orange', xm + gap / 2, x1);
    const open = (P, t0, lt) => {
      const p = prog(lt, t0, 0.6, ease.outQuart);
      P.p.style.clipPath = p < 1 ? `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0 round 20px)` : 'none';
      if (P.lab) T.reveal(P.lab, lt, t0 + 0.3);
    };
    return {
      left: L.body, right: Rr.body, leftEl: L.p, rightEl: Rr.p, rightAt, end: rightAt + 0.9,
      render(lt) { open(L, at, lt); open(Rr, rightAt, lt); },
    };
  };

  // ── 가로 순서 ── 칸 N개를 화면 폭에 나란히. tone: 'now'(주황 면) | 'done' | 'next'(기본) | 'off'(점선, 범위 밖). ring: 칸 위에 승인 고리
  T.sequence = (el, items, o = {}) => {
    const x0 = o.x0 ?? 120, x1 = o.x1 ?? 1800, y = o.y ?? 420, hh = o.h ?? 400, gap = o.gap ?? 16, size = o.size ?? 52;
    const numSize = o.numSize ?? 120, noteSize = o.noteSize ?? 34;
    const at = o.at ?? 0.4, each = o.each ?? 0.1, n = items.length, w = (x1 - x0 - gap * (n - 1)) / n;
    const cells = items.map((it, i) => {
      const cx = x0 + i * (w + gap);
      const c = h('div', 'p3-seq p3-seq-' + (it.tone || 'next'), el);
      css(c, { left: cx.toFixed(1) + 'px', top: y + 'px', width: w.toFixed(1) + 'px', height: hh + 'px' });
      const num = txt('div', 'p3-seq-n', c, String(it.n ?? i + 1));
      if (numSize !== 96) num.style.fontSize = numSize + 'px';
      const lab = txt('div', 'p3-seq-label', c, it.label);
      lab.style.fontSize = size + 'px';
      if (it.note) { const nt = txt('div', 'p3-seq-note', c, it.note); if (noteSize !== 30) nt.style.fontSize = noteSize + 'px'; }
      const ring = it.ring ? T.ring(el, { x: cx + w - 40, y: y + 46, r: 20, at: at + i * each + 0.3, closeAt: at + i * each + 0.7 }) : null;
      return { c, num, ring, t: at + i * each };
    });
    const grp = (o.groups || []).map((g, j) => {
      const l = x0 + g.from * (w + gap), r = x0 + g.to * (w + gap) + w;
      const b = h('div', 'p3-seq-group', el);
      css(b, { left: l.toFixed(1) + 'px', top: (y - 64) + 'px', width: (r - l).toFixed(1) + 'px' });
      txt('span', '', b, g.label);
      return { b, t: at + g.from * each };
    });
    return {
      cells, end: at + (n - 1) * each + 0.9,
      render(lt) {
        grp.forEach(g => T.reveal(g.b, lt, g.t, { dx: 0, dy: 10 }));
        cells.forEach(({ c, num, ring, t }) => {
          const p = prog(lt, t, 0.55, ease.outQuart);
          c.style.clipPath = p < 1 ? `inset(${((1 - p) * 100).toFixed(2)}% 0 0 0 round 16px)` : 'none';
          const q = prog(lt, t + 0.2, 0.45, ease.outCubic);
          num.style.transform = q < 1 ? `translateY(${((1 - q) * 30).toFixed(1)}px)` : 'none';
          num.style.opacity = q.toFixed(3);
          if (ring) ring.render(lt);
        });
      },
    };
  };

  // ── 짚는 말 ── 흰 이름표(머리 낱말은 굵게) 또는 경로 상자(lines). from 점에서 이름표 왼쪽 가운데까지 꺾은 선
  T.callout = (el, o = {}) => {
    const at = o.at ?? 1.2;
    const box = h('div', 'p3-callout' + (o.lines ? ' card' : ''), el);
    if (o.lines) {
      if (o.head) txt('div', 'p3-callout-label', box, o.head);
      o.lines.forEach(t => txt('div', 'p3-callout-row' + (o.mono === false ? '' : ' p3-mono'), box, t));
    } else {
      if (o.head) txt('b', '', box, o.head);
      if (o.text) box.appendChild(document.createTextNode((o.head ? ' · ' : '') + o.text));
    }
    css(box, { left: (o.x ?? 1200) + 'px', top: (o.y ?? 300) + 'px' });
    if (o.w) css(box, { width: o.w + 'px', whiteSpace: 'normal' });
    let line = null, dot = null;
    if (o.from) {
      const svg = s('svg', { width: SW, height: SH, viewBox: `0 0 ${SW} ${SH}` }, el);
      svg.setAttribute('class', 'p3-leader');
      const [fx, fy] = o.from, tx = o.x ?? 1200, ty = (o.y ?? 300) + box.offsetHeight / 2;
      const left = tx > fx;
      const ex = left ? tx : tx + box.offsetWidth;
      const pts = Math.abs(ty - fy) < 2 ? [[fx, fy], [ex, ty]] : [[fx, fy], [(fx + ex) / 2, fy], [(fx + ex) / 2, ty], [ex, ty]];
      line = s('path', { d: 'M ' + pts.map(q => q.map(v => v.toFixed(1)).join(' ')).join(' L '), fill: 'none' }, svg);
      KIT.drawPrep(line);
      dot = s('circle', { cx: fx, cy: fy, r: 7 }, svg);
    }
    return {
      el: box, end: at + 0.9,
      render(lt) {
        if (dot) dot.setAttribute('opacity', prog(lt, at, 0.2).toFixed(3));
        if (line) KIT.draw(line, prog(lt, at, 0.35, ease.inOutCubic));
        T.reveal(box, lt, at + (line ? 0.25 : 0), { dx: -16 });
      },
    };
  };

  // ── 인물과 대사 ── 왼쪽에 큰 인물 고리(지름 280)와 이름, 오른쪽에 대사(기본 96px)와 주황 세로선
  T.quote = (el, o = {}) => {
    const x = o.x ?? 120, y = o.y ?? 230, at = o.at ?? 0.2, D = o.d ?? 280;
    const base = PEOPLE[o.who] || {};
    const who = h('div', 'p3-quote-who', el);
    css(who, { left: x + 'px', top: y + 'px', width: Math.max(D, 360) + 'px' });
    const mk = personMark(who, o.who, D, 96);
    const nm = txt('div', 'p3-quote-name', who, `${o.who || ''} ${o.role ?? base.role ?? ''}`.trim());
    const og = o.org !== false && base.org ? txt('div', 'p3-quote-org', who, typeof o.org === 'string' ? o.org : base.org) : null;
    const qx = o.qx ?? x + Math.max(D, 360) + 90, qw = o.qw ?? 1800 - qx;
    const qbox = h('div', 'p3-quote', el);
    css(qbox, { left: qx + 'px', width: qw + 'px' });
    const lab = o.label ? txt('div', 'p3-quote-label', qbox, o.label) : null;
    const ttl = T.title(qbox, o.text || '', { flow: true, w: qw - 48, size: o.size ?? 96, exact: true, at: at + 0.6, weight: 800 });
    ttl.el.style.marginLeft = '48px';
    const bar = h('div', 'p3-quote-bar', qbox);
    const sub = o.sub ? txt('div', 'p3-quote-sub', qbox, o.sub) : null;
    const cy = o.cy ?? y + D / 2;
    qbox.style.top = (cy - qbox.offsetHeight / 2).toFixed(0) + 'px';
    css(bar, { top: (ttl.el.offsetTop + 8) + 'px', height: (ttl.el.offsetHeight - 16) + 'px' });
    return {
      el: qbox, title: ttl, end: ttl.end + (sub ? 0.5 : 0),
      render(lt) {
        mk.bgc.setAttribute('opacity', prog(lt, at, 0.3).toFixed(3));
        KIT.draw(mk.ring, prog(lt, at, 0.7, ease.inOutSine));
        const ps = prog(lt, at + 0.25, 0.5, ease.outCubic);
        mk.sur.style.opacity = ps.toFixed(3);
        mk.gb.style.opacity = ps.toFixed(3); mk.gb.style.transform = `scale(${lerp(0.6, 1, ps).toFixed(3)})`;
        T.reveal(nm, lt, at + 0.35); if (og) T.reveal(og, lt, at + 0.45);
        if (lab) T.reveal(lab, lt, at + 0.5);
        bar.style.transform = `scaleY(${prog(lt, at + 0.5, 0.5, ease.outQuart).toFixed(4)})`;
        ttl.render(lt);
        if (sub) T.reveal(sub, lt, ttl.end - 0.2, { dx: 0, dy: 12 });
      },
    };
  };

  // ── 원문 크게 ── 밝은 종이(#F7F7F5)에 검정 글자. 이름표 줄(파일 이름), 줄마다 문장. mark 줄은 왼쪽 주황 막대와 굵은 글자, dim 줄은 회색
  T.doc = (el, o = {}) => {
    const at = o.at ?? 0.3, each = o.each ?? 0.06, size = o.size ?? 40;
    const p = h('div', 'p3-doc', el);
    css(p, { left: (o.x ?? 120) + 'px', top: (o.y ?? 200) + 'px', width: (o.w ?? 1200) + 'px' });
    if (o.h) p.style.height = o.h + 'px';
    const lab = o.label ? txt('div', 'p3-doc-label', p, o.label) : null;
    if (lab && (o.labelSize ?? 34) !== 30) lab.style.fontSize = (o.labelSize ?? 34) + 'px';
    const rows = (o.lines || []).map(l => {
      const t = typeof l === 'string' ? { text: l } : l;
      const r = txt('div', 'p3-doc-line' + (t.mark ? ' mark' : '') + (t.dim ? ' dim' : '') + (o.mono ? ' p3-mono' : ''), p, t.text);
      r.style.fontSize = (t.size ?? size) + 'px';
      if (t.gap) r.style.marginTop = t.gap + 'px';
      return { r, mark: !!t.mark };
    });
    const marks = rows.filter(r => r.mark).map(r => { const b = h('i', 'p3-doc-bar', r.r); return b; });
    const n = rows.length;
    return {
      el: p, end: at + 0.6 + n * each + 0.5,
      render(lt) {
        const pp = prog(lt, at, 0.6, ease.outQuart);
        p.style.clipPath = pp < 1 ? `inset(0 0 ${((1 - pp) * 100).toFixed(2)}% 0 round 8px)` : 'none';
        if (lab) T.reveal(lab, lt, at + 0.2);
        rows.forEach(({ r }, i) => T.reveal(r, lt, at + 0.3 + i * each, { dx: -10 }));
        marks.forEach((b, i) => { b.style.transform = `scaleY(${prog(lt, at + 0.5 + n * each + i * 0.12, 0.35, ease.outQuart).toFixed(4)})`; });
      },
    };
  };

  // ── 카드 격자의 칸 ── 큰 번호(주황 글자 110px), 제목 48px, 설명 36px. tone: 'panel' | 'orange'(한 장에 한 칸만)
  //   titleH·textH: 제목·설명 자리의 높이(칸끼리 줄 높이를 맞출 때). 여러 칸은 THEME.tileRow 가 맞춰 준다
  T.tile = (el, o = {}) => {
    const at = o.at ?? 0.4;
    const p = h('div', 'p3-tile p3-tone-' + (o.tone || 'panel'), el);
    css(p, { left: (o.x ?? 120) + 'px', top: (o.y ?? 300) + 'px', width: (o.w ?? 520) + 'px', height: (o.h ?? 520) + 'px' });
    const num = o.n != null ? txt('div', 'p3-tile-n', p, String(o.n)) : null;
    const tt = o.title ? txt('div', 'p3-tile-title', p, o.title) : null;
    const tx = o.text ? txt('div', 'p3-tile-text', p, o.text) : null;
    if (tt && o.titleSize) tt.style.fontSize = o.titleSize + 'px';
    if (tx && o.textSize) tx.style.fontSize = o.textSize + 'px';
    if (tt && o.titleH) tt.style.minHeight = o.titleH + 'px';
    if (tx && o.textH) tx.style.minHeight = o.textH + 'px';
    return {
      el: p, body: p, num, title: tt, text: tx, end: at + 0.8,
      render(lt) {
        const q = prog(lt, at, 0.55, ease.outQuart);
        p.style.clipPath = q < 1 ? `inset(${((1 - q) * 100).toFixed(2)}% 0 0 0 round 20px)` : 'none';
        if (num) { const r = prog(lt, at + 0.2, 0.45, ease.outCubic); num.style.opacity = r.toFixed(3); num.style.transform = r < 1 ? `translateY(${((1 - r) * 30).toFixed(1)}px)` : 'none'; }
      },
    };
  };
  // ── 카드 격자 한 줄 ── items: [{ n, title, text, tone }]. 칸 폭을 고르게 나누고 제목·설명 자리의 높이를 가장 긴 칸에 맞춘다
  //   기본: x 120~1800, y 260, 높이 640, 간격(셋 36, 넷 24, 둘 24), 제목 48px, 설명 36px
  T.tileRow = (el, items, o = {}) => {
    const n = items.length, x0 = o.x0 ?? 120, x1 = o.x1 ?? 1800, y = o.y ?? 260, hh = o.h ?? 640;
    const gap = o.gap ?? (n === 3 ? 36 : 24), w = (x1 - x0 - gap * (n - 1)) / n, at = o.at ?? 0.5, each = o.each ?? 0.14;
    const tiles = items.map((it, i) => T.tile(el, Object.assign({ titleSize: o.titleSize, textSize: o.textSize }, it, { x: Math.round(x0 + i * (w + gap)), y, w: Math.round(w), h: hh, at: at + i * each })));
    const tH = Math.max(0, ...tiles.map(t => (t.title ? t.title.offsetHeight : 0)));
    const xH = Math.max(0, ...tiles.map(t => (t.text ? t.text.offsetHeight : 0)));
    tiles.forEach(t => { if (t.title) t.title.style.minHeight = tH + 'px'; if (t.text) t.text.style.minHeight = xH + 'px'; });
    return { tiles, end: at + (n - 1) * each + 0.8, render(lt) { tiles.forEach(t => t.render(lt)); } };
  };

  // ── 표 ── 머리 줄 34px(headSize), 행 글자 기본 40px(34px 아래로 내리지 않는다), 행 높이 기본 104(5행 기준). approve 열은 연두 이름표, check 열은 앞에 승인 고리
  T.table = (el, rows, o = {}) => {
    const x = o.x ?? 120, y = o.y ?? 300, rowH = o.rowH ?? 104, size = o.size ?? 40, at = o.at ?? 0.5, each = o.each ?? 0.1;
    const cols = o.cols || [], W = cols.reduce((a, b) => a + b, 0) || 1680;
    const colX = cols.map((_, i) => cols.slice(0, i).reduce((a, b) => a + b, 0));
    const wrap = h('div', 'p3-table', el);
    css(wrap, { left: x + 'px', top: y + 'px', width: W + 'px' });
    const HH = o.head ? 56 : 0;
    const head = o.head ? h('div', 'p3-table-head', wrap) : null;
    const hs = o.headSize ?? 34;
    if (head) o.head.forEach((t, i) => { const c = txt('div', 'p3-th', head, t); css(c, { left: colX[i] + 'px' }); if (hs !== 30) c.style.fontSize = hs + 'px'; });
    const rule = h('div', 'p3-table-rule', wrap);
    css(rule, { top: HH + 'px' });
    const rr = rows.map((rw, i) => {
      const cells = Array.isArray(rw) ? rw : rw.cells;
      const row = h('div', 'p3-tr' + (rw.tone ? ' ' + rw.tone : ''), wrap);
      css(row, { top: (HH + i * rowH) + 'px', height: rowH + 'px', fontSize: size + 'px' });
      if (i) h('div', 'p3-tline', row);
      const tags = [], rings = [];
      cells.forEach((v, j) => {
        const c = h('div', 'p3-td', row);
        css(c, { left: (colX[j] + (j === o.check ? size * 1.4 : 0)) + 'px', width: (cols[j] - (j === o.check ? size * 1.4 : 0) - 24) + 'px' });
        if (j === o.approve) { const tg = txt('span', 'p3-approve', c, v); tags.push(tg); }
        else c.textContent = v;
        if (j === o.check) rings.push(T.ring(row, { x: colX[j] + size * 0.55, y: rowH / 2, r: Math.round(size * 0.42), at: at + i * each + 0.1, closeAt: at + i * each + 0.45 }));
      });
      return { row, tags, rings, t: at + i * each };
    });
    const tagAt = at + rows.length * each + 0.25;
    return {
      rows: rr, el: wrap, end: tagAt + rows.length * 0.08 + 0.4,
      render(lt) {
        if (head) T.reveal(head, lt, at - 0.2);
        rule.style.transform = `scaleX(${prog(lt, at - 0.2, 0.7, ease.inOutSine).toFixed(4)})`;
        rr.forEach((r, i) => {
          T.reveal(r.row, lt, r.t, { dx: -16 });
          r.rings.forEach(g => g.render(lt));
          r.tags.forEach(tg => {
            const q = prog(lt, tagAt + i * 0.08, 0.35, ease.outCubic);
            tg.style.opacity = q.toFixed(3);
            tg.style.transform = q < 1 ? `translateX(${((1 - q) * 18).toFixed(1)}px)` : 'none';
          });
        });
      },
    };
  };

  // ── 퀴즈 ── 보기 칸을 가로로. revealAt(키 한 번의 시각)에 정답 칸이 주황 면이 된다. 정답 풀이는 칸 아래 줄
  //   fade: 'cell'(기본, 다른 칸이 글까지 35%로 옅어진다) | 'bg'(다른 칸은 면만 어두워지고 글은 읽히는 회색으로 남는다. 새 장은 'bg' 를 쓴다)
  //   labelTop: true 면 보기 이름을 번호 바로 아래에 둔다(칸 아래쪽을 notes 자리로 비운다)
  //   notes: [보기마다 풀이] 칸 아래쪽에 34px(noteSize). 정답 공개 때 놓이고 칸이 옅어져도 함께 옅어지지 않는다
  //   answerText: 칸 아래 줄(answerSize 기본 40, 48 이상이면 제목 서체 800). answerY 로 자리를 정한다
  T.quiz = (el, opts, o = {}) => {
    const x0 = o.x0 ?? 120, x1 = o.x1 ?? 1800, y = o.y ?? 560, hh = o.h ?? 300, gap = o.gap ?? 24, size = o.size ?? 56;
    const at = o.at ?? 0.5, each = o.each ?? 0.12, n = opts.length, w = (x1 - x0 - gap * (n - 1)) / n;
    const revealAt = o.revealAt ?? 2.0, fade = o.fade ?? 'cell', PAD = o.pad ?? 28;
    const items = opts.map((t, i) => {
      const c = h('div', 'p3-quiz', el);
      const cx = x0 + i * (w + gap);
      css(c, { left: cx.toFixed(1) + 'px', top: y + 'px', width: w.toFixed(1) + 'px', height: hh + 'px' });
      const fill = h('div', 'p3-quiz-fill', c);
      const num = txt('div', 'p3-quiz-n', c, String(i + 1));
      const lab = txt('div', 'p3-quiz-text', c, t);
      lab.style.fontSize = size + 'px';
      if (o.labelTop) { css(num, { left: PAD + 'px', top: '26px' }); css(lab, { top: (26 + num.offsetHeight + 14) + 'px', bottom: 'auto', left: PAD + 'px', right: PAD + 'px' }); }
      let note = null;
      if (o.notes && o.notes[i]) {
        // 칸 밖 형제 요소로 둔다(칸이 옅어져도 풀이는 옅어지지 않는다)
        note = txt('div', 'p3-quiz-note', el, o.notes[i]);
        css(note, { left: (cx + PAD).toFixed(1) + 'px', width: (w - 2 * PAD).toFixed(1) + 'px', bottom: (1080 - y - hh + 26) + 'px', fontSize: (o.noteSize ?? 34) + 'px' });
        if (i === o.answer) note.classList.add('hit');
      }
      return { c, fill, num, lab, note, t: at + i * each };
    });
    const ans = o.answerText ? txt('div', 'p3-quiz-answer', el, o.answerText) : null;
    if (ans) {
      css(ans, { left: x0 + 'px', top: (o.answerY ?? y + hh + 36) + 'px', width: (x1 - x0) + 'px' });
      const as = o.answerSize ?? 40;
      if (as !== 40) css(ans, { fontSize: as + 'px' });
      if (as >= 48) css(ans, { fontFamily: 'var(--display)', fontWeight: '800', lineHeight: '1.15', letterSpacing: '-0.01em' });
    }
    return {
      items, revealAt, end: revealAt + 0.9,
      render(lt) {
        const pr = prog(lt, revealAt, 0.45, ease.outCubic);
        items.forEach((it, i) => {
          const p = prog(lt, it.t, 0.55, ease.outQuart);
          it.c.style.clipPath = p < 1 ? `inset(${((1 - p) * 100).toFixed(2)}% 0 0 0 round 20px)` : 'none';
          const hit = i === o.answer;
          it.fill.style.transform = `scaleY(${(hit ? pr : 0).toFixed(4)})`;
          it.c.classList.toggle('on', hit && pr > 0.5);
          if (fade === 'bg') {
            it.c.style.background = hit ? '' : mix(C.panel, '#181818', pr);
            if (!hit) { it.num.style.color = mix('#FF7A3D', '#8A8A86', pr); it.lab.style.color = mix(C.ink, C.dim, pr); }
          } else it.c.style.opacity = hit ? '1' : lerp(1, 0.35, pr).toFixed(3);
          if (it.note) T.reveal(it.note, lt, revealAt + 0.3 + i * 0.1, { dx: 0, dy: 12 });
        });
        if (ans) T.reveal(ans, lt, revealAt + (o.notes ? 0.75 : 0.3), { dx: 0, dy: 14 });
      },
    };
  };

  // ── 확인 목록 ── 줄마다 칸(통과: 연두 체크, 어긋남: 주황 ✕, 아직: 점선), 항목 기본 60px, 보조 줄 34px, 값 48px(오른쪽 끝)
  //   noteSide: 'right'(기본, 항목 이름은 왼쪽 한 줄, 보조 줄은 그 오른쪽) | 'below'(보조 줄을 항목 아래에)
  //   mainW: 오른쪽 배치에서 항목 이름 칸의 폭(기본: 가장 긴 이름 + 48). box: 왼쪽 칸 크기(기본 60px 이상이면 96, 아니면 72)
  T.checklist = (el, items, o = {}) => {
    const x = o.x ?? 120, y = o.y ?? 260, w = o.w ?? 1680, rowH = o.rowH ?? 150, size = o.size ?? 60, at = o.at ?? 0.5, each = o.each ?? 0.18;
    const side = (o.noteSide ?? 'right') === 'right', noteSize = o.noteSize ?? 34, BX = o.box ?? (size >= 60 ? 96 : 72);
    const wrap = h('div', 'p3-check' + (side ? ' side' : ''), el);
    css(wrap, { left: x + 'px', top: y + 'px', width: w + 'px' });
    const ic = (k, path) => `<svg viewBox="0 0 64 64" width="${k}" height="${k}" fill="none" stroke="#141414" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"/></svg>`;
    const rows = items.map((it, i) => {
      const row = h('div', 'p3-check-row', wrap);
      css(row, { top: (i * rowH) + 'px', height: rowH + 'px' });
      if (i) h('div', 'p3-tline', row);
      const st = it.state || 'todo';
      const bx = h('div', 'p3-check-box ' + st, row);
      if (BX !== 72) css(bx, { width: BX + 'px', height: BX + 'px', borderRadius: '16px' });
      const k = Math.round(BX * 0.6);
      bx.innerHTML = st === 'pass' ? ic(BX === 72 ? 44 : k, 'M14 33l12 12 24-26') : st === 'fail' ? ic(BX === 72 ? 40 : k - 4, 'M18 18l28 28M46 18L18 46') : '';
      const tx = h('div', 'p3-check-text', row);
      const tt = txt('div', 'p3-check-main', tx, it.text); tt.style.fontSize = size + 'px';
      const nt = it.note ? txt('div', 'p3-check-note', tx, it.note) : null;
      if (nt && noteSize !== 30) nt.style.fontSize = noteSize + 'px';
      const val = it.value ? txt('div', 'p3-check-val', row, it.value) : null;
      return { row, bx, tx, tt, nt, val, t: at + i * each };
    });
    if (side) {
      const mw = o.mainW ?? Math.min(w * 0.55, Math.max(...rows.map(r => r.tt.offsetWidth)) + 48);
      rows.forEach(r => { r.tt.style.width = Math.round(mw) + 'px'; });
    }
    return {
      rows, el: wrap, end: at + (items.length - 1) * each + 0.8,
      render(lt) {
        rows.forEach(r => {
          T.reveal(r.tx, lt, r.t, { dx: -14 });
          if (r.val) T.reveal(r.val, lt, r.t + 0.1, { dx: 14 });
          const q = prog(lt, r.t + 0.25, 0.4, ease.outCubic);
          r.bx.style.opacity = q.toFixed(3);
          r.bx.style.transform = `scale(${lerp(0.6, 1, q).toFixed(3)})`;
        });
      },
    };
  };

  // ── 승인 지점 줄 ── 고리 N개를 한 줄로(파트 3의 대표 구도). items: [{ label, who, off, note, whoAt }]
  //   기본 크기(2026-11-24 기준): 반지름 76(지름 152), 고리 선 7, 이름 40px(\n 으로 두 줄까지), 풀이 34px, 승인자 이름표 34px, 묶음 이름 40px
  //   who 는 고리 아래 연두 이름표(승인자), off: true 면 점선 고리와 옅은 이름(요청에 없던 곳 등)
  //   고리 사이 선은 고리 가장자리에서 끊긴다(cut: false 면 한 줄로 잇는다)
  //   groups: [{ from, to, label }] 고리 위 묶음 이름. 고리는 at 부터 each 간격으로 열리고 close 가 true(기본)면 0.45초 뒤 닫힌다
  //   이름표 시각: whoAt(첫 이름표) + whoEach 간격. 항목에 whoAt 을 주면 그 항목만 그 시각에 붙는다. whoWith: true 면 제 고리가 열린 뒤 바로 붙는다
  T.gates = (el, items, o = {}) => {
    const x0 = o.x0 ?? 120, x1 = o.x1 ?? 1800, y = o.y ?? 560, r = o.r ?? 76, at = o.at ?? 0.5, each = o.each ?? 0.12, n = items.length;
    const cw = (x1 - x0) / n, size = o.size ?? 40, noteSize = o.noteSize ?? 34, whoSize = o.whoSize ?? 34, groupSize = o.groupSize ?? 40;
    const ringW = o.ringW ?? Math.max(4, Math.round(r / 11));
    const svg = s('svg', { width: SW, height: SH, viewBox: `0 0 ${SW} ${SH}` }, el);
    svg.setAttribute('class', 'p3-gates-line');
    const cxs = items.map((_, i) => x0 + cw * (i + 0.5));
    // 선 조각: 고리 바깥에서만 보인다. 조각마다 전체 선이 그려지는 진행에 맞춰 차례로 그린다
    const spans = o.cut === false ? [[x0, x1]] : [[x0, cxs[0] - r], ...cxs.slice(1).map((cx, i) => [cxs[i] + r, cx - r]), [cxs[n - 1] + r, x1]];
    const segs = spans.filter(([a, b]) => b - a > 1).map(([a, b]) => {
      const p = s('path', { d: `M ${a.toFixed(1)} ${y} L ${b.toFixed(1)} ${y}`, fill: 'none' }, svg);
      KIT.drawPrep(p);
      return { p, a, b };
    });
    const cols = items.map((it, i) => {
      const cx = cxs[i], t = at + i * each;
      const ring = T.ring(el, { x: cx, y, r, at: t, width: ringW, closeAt: o.close === false || it.off ? null : t + 0.45, state: it.off ? 'hollow' : undefined });
      if (it.off) ring.el.classList.add('off');
      const lab = txt('div', 'p3-gate-label' + (it.off ? ' off' : ''), el, it.label);
      css(lab, { left: (cx - cw / 2).toFixed(1) + 'px', width: cw.toFixed(1) + 'px', top: (y + r + 28) + 'px', fontSize: size + 'px' });
      return { ring, lab, cx, it, t };
    });
    // 이름 아래 줄(설명, 승인자 이름표)은 가장 긴 이름에 맞춰 한 높이로 놓는다
    const labH = Math.max(...cols.map(c => c.lab.offsetHeight));
    const notes = cols.map(c => {
      if (!c.it.note) return null;
      const e = txt('div', 'p3-gate-note', el, c.it.note);
      css(e, { left: (c.cx - cw / 2).toFixed(1) + 'px', width: cw.toFixed(1) + 'px', top: (y + r + 28 + labH + 8) + 'px' });
      if (noteSize !== 30) css(e, { fontSize: noteSize + 'px', lineHeight: '1.25' });
      return e;
    });
    const noteH = Math.max(0, ...notes.map(e => (e ? e.offsetHeight + 8 : 0)));
    const tagAt = o.whoAt ?? at + n * each + 0.4, whoEach = o.whoEach ?? 0.08;
    cols.forEach((c, i) => {
      c.note = notes[i];
      c.tag = null;
      if (c.it.who) {
        c.tag = txt('div', 'p3-gate-who', el, c.it.who);
        if (whoSize !== 30) css(c.tag, { fontSize: whoSize + 'px', padding: '4px 20px' });
        css(c.tag, { left: (c.cx - c.tag.offsetWidth / 2).toFixed(1) + 'px', top: (y + r + 28 + labH + noteH + 18) + 'px' });
      }
      c.tagT = c.it.whoAt ?? (o.whoWith ? c.t + 0.55 : tagAt + i * whoEach);
    });
    const gH = groupSize === 30 ? 46 : Math.round(groupSize * 1.2) + 10;
    const grp = (o.groups || []).map(g => {
      const l = x0 + cw * g.from + 12, rr = x0 + cw * (g.to + 1) - 12;
      const b = h('div', 'p3-seq-group', el);
      css(b, { left: l.toFixed(1) + 'px', top: (y - r - 64 - gH) + 'px', width: (rr - l).toFixed(1) + 'px' });
      if (groupSize !== 30) css(b, { height: gH + 'px', fontSize: groupSize + 'px', color: 'var(--ink)', borderBottomWidth: '4px' });
      txt('span', '', b, g.label);
      return { b, t: at + g.from * each };
    });
    const lastTag = Math.max(0, ...cols.filter(c => c.tag).map(c => c.tagT));
    return {
      cols, end: Math.max(at + (n - 1) * each + 1.0, lastTag + 0.4),
      render(lt) {
        const P = x0 + (x1 - x0) * prog(lt, at - 0.3, 0.9, ease.inOutSine);
        segs.forEach(g => KIT.draw(g.p, clamp((P - g.a) / (g.b - g.a))));
        grp.forEach(g => T.reveal(g.b, lt, g.t, { dx: 0, dy: 10 }));
        cols.forEach(c => {
          c.ring.render(lt);
          T.reveal(c.lab, lt, c.t + 0.2, { dx: 0, dy: 12 });
          if (c.note) T.reveal(c.note, lt, c.t + 0.3, { dx: 0, dy: 12 });
          if (c.tag) { const q = prog(lt, c.tagT, 0.35, ease.outCubic); c.tag.style.opacity = q.toFixed(3); c.tag.style.transform = q < 1 ? `translateY(${((1 - q) * 14).toFixed(1)}px)` : 'none'; }
        });
      },
    };
  };

  // ── 사람 칸 ── 사람마다 세로 칸 하나(ch05 s05). 칸 위에 인물 표시와 이름(56px), 그 오른쪽에 수(150px, 주황 글자)와 단위(60px),
  //   칸 아래쪽에 맡은 항목을 아래에서 위로 쌓는다(항목 칸 92px, 44px, 앞에 연두 고리). 쌓인 높이가 수와 같은 비율이다
  //   items: [{ who, value, unit, list: [항목] }]. mark: 'ring'(기본, 승인과 관련된 항목) | 'none'
  T.people = (el, items, o = {}) => {
    const n = items.length, x0 = o.x0 ?? 120, x1 = o.x1 ?? 1800, top = o.top ?? 272, bot = o.bottom ?? 948, gap = o.gap ?? 64;
    const W = (x1 - x0 - gap * (n - 1)) / n, at = o.at ?? 0.4, each = o.each ?? 0.22, BH = o.blockH ?? 92, BG = 12;
    const listSize = o.listSize ?? 44, mark = o.mark ?? 'ring';
    const cols = items.map((it, k) => {
      const x = Math.round(x0 + k * (W + gap)), t = at + k * each;
      const rule = k ? h('div', 'p3-vrule', el) : null;
      if (rule) css(rule, { left: (x - gap / 2) + 'px', top: top + 'px', height: (bot - top) + 'px' });
      const pe = T.person(el, { who: it.who, x, y: top, at: t, org: false, stack: true, nameSize: o.nameSize ?? 56 });
      const cnt = h('div', 'p3-people-n', el);
      css(cnt, { left: (x + 132) + 'px', top: (top - 10) + 'px' });
      txt('span', 'p3-people-v', cnt, String(it.value ?? '')).style.fontSize = (o.numSize ?? 150) + 'px';
      if (it.unit) txt('span', 'p3-people-u', cnt, it.unit).style.fontSize = (o.unitSize ?? 60) + 'px';
      const L = it.list || [];
      const blocks = L.map((p, j) => {
        const y = bot - (L.length - j) * (BH + BG) + BG, cy = y + BH / 2, t0 = t + 0.35 + (L.length - 1 - j) * 0.08;
        const b = h('div', 'p3-people-item', el);
        css(b, { left: x + 'px', top: y + 'px', width: Math.round(W) + 'px', height: BH + 'px' });
        const ring = mark === 'ring' ? T.ring(el, { x: x + 46, y: cy, r: 22, width: 5, at: t0 + 0.1 }) : null;
        const tt = txt('div', 'p3-people-t', el, p);
        css(tt, { left: (x + (ring ? 88 : 32)) + 'px', fontSize: listSize + 'px' });
        tt.style.top = (cy - tt.offsetHeight / 2).toFixed(0) + 'px';
        return { b, ring, tt, t0 };
      });
      return { rule, pe, cnt, blocks, t };
    });
    const last = Math.max(...cols.map(c => c.t + 0.35 + (c.blocks.length) * 0.08 + 0.5));
    return {
      cols, end: last,
      render(lt) {
        cols.forEach(c => {
          if (c.rule) c.rule.style.transform = `scaleY(${prog(lt, c.t - 0.15, 0.7, ease.outQuart).toFixed(4)})`;
          c.pe.render(lt);
          T.reveal(c.cnt, lt, c.t + 0.1, { dx: 0, dy: 40, dur: 0.55 });
          c.blocks.forEach(q => {
            T.reveal(q.b, lt, q.t0, { dx: 0, dy: 44, dur: 0.45 });
            if (q.ring) q.ring.render(lt);
            T.reveal(q.tt, lt, q.t0 + 0.05, { dx: 0, dy: 44, dur: 0.45 });
          });
        });
      },
    };
  };

  // 요소 e 의 상자를 기준 요소 ref 안의 무대 px 로 돌려준다(g 만큼 넓힌다). 화면 안 단추를 짚는 선의 시작점을 구할 때 쓴다
  T.boxOf = (e, ref, g = 0) => {
    const A = ref.getBoundingClientRect(), B = e.getBoundingClientRect(), k = ref.offsetWidth / (A.width || 1);
    return { x: (B.left - A.left) * k - g, y: (B.top - A.top) * k - g, w: B.width * k + 2 * g, h: B.height * k + 2 * g };
  };

  T.colors = C;
  T.spectrum = SPEC;
  T.mask = maskAt;
  T.inkFit = inkFit;
})();
