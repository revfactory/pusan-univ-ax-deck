/* p2 테마 부품 — 종이 오리기: 크라프트지 콜라주
 *
 * 크라프트지 위에 크림 종이 카드, 오린 색지, 흰 테두리를 두른 사진 조각, 화면 캡처 인쇄물을 붙인다.
 * 주홍(--accent)은 사람의 결정·승인 도장·지금 단계에만, 짙은 초록(--accent2)은 통과·완료에만 쓴다.
 *
 * 쓰는 법: 부품은 모두 setup 에서 부르고, 돌려받은 객체의 render(lt, ctx) 를 슬라이드 render 에서 부른다.
 *          좌표(x, y, w, h)는 1920×1080 무대 기준 px, at 은 등장 시각(초, lt 기준)이다.
 *
 * 필수 부품
 *   THEME.bg(el, variant, o)          배경. 'base' 크라프트 | 'accent' 주홍 색지가 화면 절반을 덮는다(o.side 'right'|'left') | 'lab' 모눈 노트 종이 한 장
 *                                     → { el, render(lt, ctx) }  끝 상태에서는 빛 자리만 ctx.amb 로 아주 느리게 움직인다
 *   THEME.header(el, { chapter, title, fiction, at })   위쪽 챕터 표시 「파트 2 · 4장 제목」. fiction: true 면 오른쪽 위에 「가상 사례」(30px)
 *   THEME.title(el, text, o)          제목. o.mode 'strip'(기본: 크림 띠 위 --ink 한 색, 슬라이드 제목) | 'pieces'(음절마다 색지 조각, 파트·챕터 제목에만)
 *                                     o: { x, y, w, size, at, maxLines, tone, flow, tones(조각 색 목록, 기본 크림·레몬·초록·연한 크라프트) }
 *                                     줄은 '\n' 으로 나눈다 → { el, end, lines, render }
 *   THEME.card(el, o)                 크림 종이 카드. o: { x, y, w, h, num, label, title, body(HTML), bodyClass('p2-prompt' 면 따라 입력할 글 36px), tone, rot, at, tape, torn,
 *                                     photo:{ src, fallback, w, h, rot }, titleSize, bodySize, labelSize(레이아웃 부품용, 주지 않으면 44·34·30px),
 *                                     h:'fit'(글 높이에 맞춤, minH), layout(이름표 34px, 번호 조각이 있으면 이름표를 56px 비킨다) }
 *                                     → { el, inner, flow, x, y, w, h, render }
 *   THEME.step(el, n, total, o)       실습 단계 번호. 주홍 조각에 Anton 숫자, 아래에 지난 단계(초록)·지금(주홍)·남은 단계 표시. o: { x, y, at, row:{ x, y }(표시 줄 위치),
 *                                     slash(표시 줄을 「n / 전체」로), from(여러 단계를 한 화면에서 할 때 첫 단계: 조각 「1·2·3」), label(표시 줄 글자) } → { el, render }
 *   THEME.videoTitle(el, o)           인트로·전환 장. o: { src, poster, kicker, title, sub, kind:'intro'|'chapter', flip, scene:'intro'|'place'|'flip'|'swap', at, padX(띠 끝 여백, 기본 90) }
 *                                     src·poster 가 없으면 코드로 그린 콜라주를 오른쪽 40%에 놓는다(영상이 들어오기 전의 대체 표시) → { el, render }
 *
 * 이 파트의 부품
 *   THEME.paper(el, o)                종이 한 장. o: { x, y, w, h, tone:'cream'|'white'|'red'|'green'|'lemon'|'kraft'|'dark', torn:'top right bottom left' 가운데 몇 개,
 *                                     rot, at, pad, grid:[cols, rows], k(그림자 배율) } → { el, face, inner, cells, render }
 *   THEME.tape(el, o)                 반투명 테이프 조각. o: { x, y, w, rot, at, tone:'lemon'|'clear'|'red' } → { el, render }
 *   THEME.cutout(el, src, o)          누끼 사진 조각(<id>_cut.png). setup 에서 흰 테두리를 캔버스에 미리 그려 붙인다. src 가 없으면 o.fallback 의 종이 그림
 *                                     o: { x, y, w, h, rot, at, border, fallback:'doc'|'binder'|'laptop'|'table'|'sheet'|'summary'|'stamp' } → { el, render }
 *   THEME.shot(el, src, o)            화면 캡처 인쇄물(흰 테두리, 위 모서리 테이프 두 조각, 회전 0°). src 가 null 이면 그린 화면을 같은 틀에 넣는다
 *                                     o: { size:'wide'|'full'|'tall'|'big' 또는 w·h, x, y, at, url, sidebar:{ title, items, on }, chat:[KIT.chat 메시지], chatOpts, draw(main, frame),
 *                                          marks:[{ x, y, w, h, n, at, num }] (틀 기준 비율 0~1), zoom·focus(한 부분만 확대) }
 *                                     draw 가 [{ node, n, at, num }] 을 돌려주면 그 요소 둘레에 고리를 단다 → { el, main, frame, chat, pos, w, h, render }
 *   THEME.flip(el, front, back, o)    넘겨서 뒷면을 보이는 카드. front/back: HTML 문자열 또는 function(face). o: { x, y, w, h, at, flipAt, frontTone, backTone, rot, pad }
 *                                     → { el, front, back, render }  flipAt 을 steps 뒤에 두면 키를 누를 때 넘어간다
 *   THEME.stamp(el, o)                승인 도장. 1.15배에서 1배로 0.12초에 찍히고 o.paper 요소가 2px 눌린다. o: { x, y, size, text, at, rot, paper } → { el, render }
 *   THEME.person(el, who, o)          인물. 색지 실루엣 + 기호 조각 + 이름 띠. who: 'han'|'oh'|'jung'|'yoon'. o: { x, y, scale, at, org(true 면 소속 둘째 줄) } → { el, render }
 *   THEME.thing(el, kind, o)          사례 사물을 종이로 그린 것. kind: 'doc' 민원 글 출력물 | 'binder' 규정집 | 'laptop' | 'table' 시험표 | 'sheet' 답변 초안
 *                                     | 'summary' 승인 기록 | 'stamp' 도장. o: { x, y, w, rot, at, band(sheet 에 주홍 띠) } → { el, render }
 *   THEME.nextQ(el, o)                챕터 끝에 넘기는 질문. 크림 띠 왼쪽에 레몬 이름표 「다음 질문」, 오른쪽 칸에 질문(40px, 700). o: { x, y | bottom, w, text, lead, at, rot }
 *                                     w 를 주지 않으면 가장 긴 줄에 맞춘다(최대 1680) → { el, x, y, w, h, render }
 *
 * 레이아웃 부품(2026-11-24): 장마다 가장 중요한 요소 하나를 화면의 3분의 1 이상으로 놓는다. 배치 좌표와 쓰는 때는 p2.md 8절 「레이아웃 목록」
 *   THEME.top(el, o)                  머리말 + 제목 띠(80px, 단계가 있으면 단계 번호 + 68px) → { title, bottom, render }
 *   THEME.tag(el, text, o)            색지 이름표(34px). 종이 위 모서리에 붙인다
 *   THEME.statement(el, o)            한 문장(104px)       THEME.bigNum(el, o)      큰 숫자(Anton 300px)     THEME.versus(el, o)     좌우 대비
 *   THEME.callout(el, o)              짚는 쪽지(36px)      THEME.promptSheet(el, o) 요청문 크게(44px)        THEME.result(el, o)     기대 결과 크게(112px)
 *   THEME.checklist(el, o)            채점 기준(46px)      THEME.sequence(el, o)    순서 조각                THEME.speech(el, o)     인물과 대사(60px)
 *   THEME.grid(el, o)                 카드 격자            THEME.table(el, o)       표 한 장                 THEME.handsUp(el, o)    손들기(키 누름 뒤 답)
 *   THEME.decide(el, o)               판정 순서
 *   THEME.strip(el, html, o)          글자 폭에 맞춘 종이 띠 한 장(34px)   THEME.note(el, o)  이름표를 위 가장자리에 걸친 쪽지(34px)
 *   THEME.mono(text)                  파일 이름·기호를 고정폭 서체로 쓴 HTML 조각
 *   보완 인자(2026-11-24, 시범 챕터 6장에서 옮김): versus { fit, center }, promptSheet { whereHtml, center }, table { pad, rowPad, widths:'auto', 머리 글 '\n', tapeY },
 *   handsUp { note, frontTone, backTone, prompt:null, grow, wrap }, grid 항목 { back } → 넘김 카드. 자세한 것은 p2.md 8절 「시범 챕터에서 옮긴 인자」
 *   THEME.lift(el, lt, at, o)         들었다 놓기: 1.05배·큰 그림자에서 0.5초 동안 1배·작은 그림자로 붙는다(outCubic, 넘치지 않음). 다른 요소에도 같은 움직임을 줄 때 쓴다
 *                                     o: { rot, dur, from, filter, shadowEl, k, inset, shadow } → 진행률 0~1
 *   THEME.C                           색 값
 */
(function () {
  'use strict';
  const R = window.REEL;
  const { ease, prog, kf, clamp, lerp, rand, noise, css, h, s } = R;
  const T = window.THEME = window.THEME || {};
  const TAU = Math.PI * 2;
  const px = v => (typeof v === 'number' ? v.toFixed(1) + 'px' : v);
  const esc = t => String(t ?? '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const SEG = new Intl.Segmenter('ko', { granularity: 'grapheme' });
  const C = T.C = { kraft: '#C69C6D', ink: '#1E1610', dim: '#5A4A3A', dimKraft: '#3E3024', red: '#C0341F', green: '#1F6F5C',
    cream: '#FBF5E9', lemon: '#F2CF4A', white: '#FFFDF8', dark: '#2E241C' };
  const TONE_INK = { cream: C.ink, white: C.ink, lemon: C.ink, kraft: C.ink, red: '#FFFFFF', green: C.cream, dark: C.cream };

  // ── 종이 결 무늬: 처음 한 번만 캔버스로 만든다(프레임마다 바꾸지 않는다) ──
  function texture(n, paint) { const c = document.createElement('canvas'); c.width = c.height = n; paint(c.getContext('2d'), n); return c.toDataURL('image/png'); }
  (function bakeTextures() {
    if (document.body.style.getPropertyValue('--p2-grain')) return;
    const grain = texture(512, (g, n) => {
      const im = g.createImageData(n, n), d = im.data;
      for (let i = 0; i < n * n; i++) {
        const r = rand(i, 1.37), q = rand(i, 2.71), dark = r < 0.55;
        d[i * 4] = dark ? 52 : 255; d[i * 4 + 1] = dark ? 34 : 249; d[i * 4 + 2] = dark ? 18 : 236;
        d[i * 4 + 3] = Math.floor(q * q * (dark ? 40 : 34));
      }
      g.putImageData(im, 0, 0);
    });
    const fiber = texture(640, (g, n) => {
      for (let i = 0; i < 46; i++) {                       // 아주 옅은 얼룩
        const x = rand(i, 21) * n, y = rand(i, 22) * n, r = 40 + rand(i, 23) * 120, dark = rand(i, 24) < 0.5;
        for (const ox of [-n, 0, n]) for (const oy of [-n, 0, n]) {
          const gr = g.createRadialGradient(x + ox, y + oy, 0, x + ox, y + oy, r);
          gr.addColorStop(0, dark ? 'rgba(110,70,30,.07)' : 'rgba(255,236,200,.08)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
          g.fillStyle = gr; g.fillRect(x + ox - r, y + oy - r, r * 2, r * 2);
        }
      }
      for (let i = 0; i < 1700; i++) {                     // 섬유 가닥
        const x = rand(i, 11) * n, y = rand(i, 12) * n, L = 5 + rand(i, 13) * 24, a = rand(i, 14) * TAU, dark = rand(i, 15) < 0.55;
        g.strokeStyle = dark ? `rgba(96,60,26,${(0.10 + rand(i, 16) * 0.16).toFixed(3)})` : `rgba(255,240,210,${(0.12 + rand(i, 16) * 0.2).toFixed(3)})`;
        g.lineWidth = 0.7 + rand(i, 17) * 1.3;
        for (const ox of [-n, 0, n]) for (const oy of [-n, 0, n]) {
          if (x + ox < -40 || x + ox > n + 40 || y + oy < -40 || y + oy > n + 40) continue;
          g.beginPath(); g.moveTo(x + ox, y + oy);
          g.quadraticCurveTo(x + ox + Math.cos(a + 0.5) * L * 0.5, y + oy + Math.sin(a + 0.5) * L * 0.5, x + ox + Math.cos(a) * L, y + oy + Math.sin(a) * L);
          g.stroke();
        }
      }
    });
    const speckle = texture(256, (g, n) => {               // 도장 잉크: 군데군데 빈 자리
      const im = g.createImageData(n, n), d = im.data;
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const i = y * n + x, r = rand((y >> 1) * 128 + (x >> 1), 5.5), b = 0.5 + 0.5 * Math.sin(x * 0.07 + Math.sin(y * 0.05) * 2) * Math.sin(y * 0.09);
        d[i * 4 + 3] = r < 0.12 ? 30 + r * 600 : Math.round(255 * (0.78 + 0.22 * b));
      }
      g.putImageData(im, 0, 0);
    });
    const st = document.body.style;
    st.setProperty('--p2-grain', `url(${grain})`);
    st.setProperty('--p2-fiber', `url(${fiber})`);
    st.setProperty('--p2-speckle', `url(${speckle})`);
  })();

  // ── 그림자와 들었다 놓기 ──
  const SH = (x, y, b, a) => `${x.toFixed(1)}px ${y.toFixed(1)}px ${b.toFixed(1)}px rgba(30,22,16,${a.toFixed(3)})`;
  function shadowParts(p, k) {                           // p = 1 이면 종이에 붙은 상태
    const off = lerp(22, 4, p) * k, bl = lerp(30, 6, p) * k;
    return [[off * 0.3, off, bl, lerp(0.2, 0.34, p)], [off * 0.5 + 2 * k, off * 1.8 + 6 * k, bl * 1.6 + 14 * k, lerp(0.1, 0.14, p)]];
  }
  const boxSh = (p, k = 1) => shadowParts(p, k).map(a => SH(...a)).join(', ');
  const dropSh = (p, k = 1) => shadowParts(p, k).map(([x, y, b, a]) => `drop-shadow(${SH(x, y, b / 2, a)})`).join(' ');
  T.boxShadow = boxSh;

  T.lift = (el, lt, at = 0, o = {}) => {
    const p = prog(lt, at, o.dur ?? 0.5, ease.outCubic);
    const vis = lt >= at ? clamp((lt - at) / 0.09) : 0;
    const sc = lerp(o.from ?? 1.05, 1, p);
    R.set(el, 'opacity', vis.toFixed(3));
    R.set(el, 'transform', `rotate(${(o.rot || 0).toFixed(2)}deg) scale(${sc.toFixed(4)})`);
    if (o.shadow !== false) {
      const tgt = o.shadowEl || el, k = o.k ?? 1;
      if (o.filter) R.set(tgt, 'filter', dropSh(p, k));
      else R.set(tgt, 'boxShadow', (o.inset ? o.inset + ', ' : '') + boxSh(p, k));
    }
    return p;
  };

  // ── 찢은 가장자리: 다각형 clip-path(px) ──
  function jag(w, hh, sides, seed, amp, inset) {
    const pts = [];
    const D = (i, k) => inset + amp * (0.6 * (0.5 + 0.5 * noise(i * 0.42, seed + k)) + 0.4 * rand(i, seed * 3 + k));
    const edge = (len, f) => { const n = Math.max(2, Math.round(len / 10)); for (let i = 0; i <= n; i++) f(len * i / n, i); };
    if (sides.includes('top')) edge(w, (x, i) => pts.push([x, D(i, 1)])); else pts.push([0, 0], [w, 0]);
    if (sides.includes('right')) edge(hh, (y, i) => pts.push([w - D(i, 2), y])); else pts.push([w, 0], [w, hh]);
    if (sides.includes('bottom')) edge(w, (x, i) => pts.push([w - x, hh - D(i, 3)])); else pts.push([w, hh], [0, hh]);
    if (sides.includes('left')) edge(hh, (y, i) => pts.push([D(i, 4), hh - y])); else pts.push([0, hh], [0, 0]);
    return `polygon(${pts.map(([x, y]) => `${x.toFixed(1)}px ${y.toFixed(1)}px`).join(',')})`;
  }
  T.jag = jag;
  // 크기를 재야 하는 종이(띠·이름표): 요소 안에 흰 가장자리(rim)와 면(face)을 깔고 setup 끝에 잘라 둔다
  function backing(host, tone, torn, seed) {
    const rim = h('div', 'p2-rim', host), face = h('div', `p2-face p2-${tone} p2-grain`, host);
    host.insertBefore(face, host.firstChild); host.insertBefore(rim, face);
    const w = host.offsetWidth, hh = host.offsetHeight;
    rim.style.clipPath = jag(w, hh, torn, seed, 5, 0);
    face.style.clipPath = jag(w, hh, torn, seed + 0.5, 5, 3);
    return { rim, face };
  }

  // ── 종이 한 장 ──
  T.paper = (parent, o = {}) => {
    const w = o.w ?? 600, hh = o.h ?? 400, tone = o.tone || 'cream', torn = o.torn || '';
    const seed = o.seed ?? ((o.x || 0) * 0.0131 + (o.y || 0) * 0.0071 + w * 0.003 + 1);
    const el = h('div', 'p2-paper', parent);
    css(el, { left: px(o.x ?? 0), top: px(o.y ?? 0), width: px(w), height: px(hh) });
    if (torn) { const rim = h('div', 'p2-rim', el); rim.style.clipPath = jag(w, hh, torn, seed, 6, 0); }
    const face = h('div', `p2-face p2-${tone} p2-grain`, el);
    if (torn) face.style.clipPath = jag(w, hh, torn, seed + 0.5, 6, 4);
    const inner = h('div', 'p2-in', face);
    if (o.pad != null) css(inner, { padding: px(o.pad), boxSizing: 'border-box' });
    const cells = [];
    if (o.grid) {
      const [cols, rows] = o.grid, g = h('div', 'p2-cells', inner), gb = o.gridBox || {};
      const pad = o.pad ?? 0;
      css(g, { left: px(gb.x ?? pad), top: px(gb.y ?? pad), width: px(gb.w ?? w - 2 * pad), height: px(gb.h ?? hh - 2 * pad),
        gridTemplateColumns: o.cols || `repeat(${cols}, 1fr)`, gridTemplateRows: o.rows || `repeat(${rows}, 1fr)`,
        borderTop: '2px solid ' + 'rgba(30,22,16,.22)', borderLeft: '2px solid rgba(30,22,16,.22)' });
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push(h('div', 'p2-cell', g));
    }
    const rot = o.rot ?? 0, at = o.at ?? 0;
    return { el, face, inner, cells, w, h: hh,
      render(lt) { return T.lift(el, lt, at, { rot, filter: !!torn, shadowEl: torn ? el : face, k: o.k ?? 1, shadow: o.shadow, dur: o.dur }); } };
  };

  // ── 테이프 ──
  T.tape = (parent, o = {}) => {
    const w = o.w ?? 150, th = o.h ?? 46, tone = o.tone || 'lemon';
    const el = h('div', 'p2-tape' + (tone !== 'lemon' ? ' p2-tape-' + tone : ''), parent);
    css(el, { left: px(o.x ?? 0), top: px(o.y ?? 0), width: px(w), height: px(th) });
    el.style.clipPath = jag(w, th, 'left right', o.seed ?? ((o.x || 0) * 0.01 + (o.y || 0) * 0.02 + 3), 5, 0);
    const rot = o.rot ?? -4, at = o.at ?? 0;
    return { el, render(lt) {
      const p = prog(lt, at, 0.16, ease.outCubic);
      R.set(el, 'opacity', lt >= at ? '1' : '0');
      R.set(el, 'transform', `rotate(${rot}deg) scale(${lerp(1.12, 1, p).toFixed(4)})`);
      return p;
    } };
  };

  // ── 배경 ──
  T.bg = (parent, variant = 'base', o = {}) => {
    const el = h('div', 'p2-bg', parent);
    h('div', 'p2-bg-tex', el);
    const light = h('div', 'p2-bg-light', el);
    light.style.background = 'radial-gradient(ellipse 60% 55% at 30% 24%, rgba(255,244,222,.30), rgba(255,244,222,0) 72%), ' +
      'linear-gradient(160deg, rgba(0,0,0,0) 48%, rgba(70,40,12,.14) 100%)';
    let sheet = null;
    if (variant === 'accent') {
      const right = o.side !== 'left';
      sheet = T.paper(el, { x: right ? 930 : -70, y: -70, w: 1060, h: 1220, tone: 'red', torn: right ? 'left' : 'right', rot: right ? 1.1 : -1.1, at: -9, k: 1.2 });
    } else if (variant === 'lab') {
      sheet = T.paper(el, { x: 62, y: 24, w: 1796, h: 1034, tone: 'cream', torn: 'left', rot: -0.3, at: -9 });
      sheet.face.classList.add('p2-note');
      for (let i = 0; i < 15; i++) {                       // 노트에서 뜯은 자리의 구멍(크라프트가 비친다)
        const hole = h('div', '', sheet.face);
        css(hole, { position: 'absolute', left: '22px', top: px(44 + i * 67), width: '22px', height: '22px', borderRadius: '50%', background: '#B98E5F',
          boxShadow: 'inset 0 3px 4px rgba(30,22,16,.35)' });
      }
    }
    return { el, sheet, render(lt, ctx) {
      const a = ctx ? ctx.amb : lt;
      R.set(light, 'transform', `translate(${(noise(a * 0.06, 3) * 40).toFixed(1)}px, ${(noise(a * 0.06, 7) * 26).toFixed(1)}px)`);
      if (sheet) sheet.render(lt);
    } };
  };

  // ── 머리말 ──
  T.header = (parent, o = {}) => {
    const el = h('div', 'p2-head', parent);
    const n = typeof o.chapter === 'number' ? o.chapter : parseInt(String(o.chapter || '').replace(/\D/g, ''), 10);
    const strip = h('div', 'p2-strip', el); css(strip, { position: 'relative' });
    h('div', 'p2-head-tx', strip, `<b>파트 ${o.part ?? 2}${n ? ' · ' + n + '장' : ''}</b>${esc(o.title || '')}`);
    backing(strip, 'cream', 'left right', 7.7);
    let fic = null;
    if (o.fiction) fic = h('div', 'p2-fic', parent, '가상 사례');
    const at = o.at ?? 0;
    return { el, render(lt) {
      T.lift(strip, lt, at, { rot: -0.4, filter: true, k: 0.5, dur: 0.4 });
      if (fic) T.lift(fic, lt, at + 0.12, { rot: 1.6, k: 0.5, dur: 0.4 });
    } };
  };

  // ── 제목 ──
  const TITLE_TONES = ['cream', 'lemon', 'cream', 'green', 'cream', 'kraft', 'lemon', 'cream', 'green'];
  function buildPieces(box, text, o) {
    const size = o.size, pieces = [], cut = o.jongCut ?? 0.58, bw = Math.max(3, size * 0.05);
    const tones = o.tones || TITLE_TONES;
    const ins = { all: `inset 0 0 0 ${bw}px #fff`,
      top: `inset 0 ${bw}px 0 #fff, inset ${bw}px 0 0 #fff, inset -${bw}px 0 0 #fff`,
      bot: `inset 0 -${bw}px 0 #fff, inset ${bw}px 0 0 #fff, inset -${bw}px 0 0 #fff` };
    let k = 0, prev = '';
    String(text).split('\n').forEach((line, li) => {
      if (li) h('br', '', box);
      line.split(' ').filter(Boolean).forEach((word, wi) => {
        if (wi) box.appendChild(document.createTextNode(' '));
        const ww = h('span', 'p2-tw', box);
        for (const { segment: ch } of SEG.segment(word)) {
          if (/[:,.·!?()「」]/.test(ch)) { const pu = h('span', 'p2-punct', ww); pu.textContent = ch; pieces.push({ punct: pu, i: k++ }); continue; }
          let tone = tones[Math.floor(rand(k, o.seed ?? 7.3) * tones.length)];
          if (tone === prev) tone = tones[(tones.indexOf(tone) + 1) % tones.length];
          prev = tone;
          const pc = h('span', 'p2-pc', ww);
          const sp = h('span', 'p2-sp', pc); sp.textContent = ch;
          const code = ch.charCodeAt(0) - 0xac00;
          const jong = code >= 0 && code < 11172 ? code % 28 : 0;
          const part = (cls, top, bottom, glyphTop) => {
            const pt = h('span', `p2-pt p2-${tone} p2-grain`, pc);
            css(pt, { top, bottom, height: bottom === 'auto' ? `calc(.1em + ${cut}em)` : 'auto' });
            const gl = h('span', 'p2-gl', pt); gl.textContent = ch; css(gl, { top: glyphTop, color: TONE_INK[tone] });
            return pt;
          };
          let top, bot = null;
          if (jong) { top = part('t', '0', 'auto', '.1em'); bot = part('b', `calc(.1em + ${cut}em)`, '0', `-${cut}em`); }
          else top = part('a', '0', '0', '.1em');
          pieces.push({ pc, top, bot, i: k, rot: (rand(k, 4.1) - 0.5) * 6, insTop: jong ? ins.top : ins.all, insBot: ins.bot });
          k++;
        }
      });
    });
    return pieces;
  }
  T.title = (parent, text, o = {}) => {
    const size = o.size ?? 72, mode = o.mode || 'strip', at = o.at ?? 0.1;
    const box = h('div', 'p2-ttl', parent);
    if (o.flow) css(box, { position: 'relative' });
    else css(box, { left: px(o.x ?? 120), top: px(o.y ?? 120) });
    css(box, { fontSize: px(size), width: o.w ? px(o.w) : 'auto' });
    let render, end, lines;
    if (mode === 'pieces') {
      const pieces = buildPieces(box, text, Object.assign({ size }, o));
      const n = pieces.length, each = o.each ?? Math.min(0.07, (o.span ?? 1.1) / Math.max(1, n - 1));
      end = at + (n - 1) * each + 0.45;
      const tops = new Set([...box.querySelectorAll('.p2-tw')].map(x => x.offsetTop));
      lines = tops.size;
      render = lt => pieces.forEach(p => {
        const t0 = at + p.i * each;
        if (p.punct) { const q = prog(lt, t0, 0.2, ease.outCubic); R.set(p.punct, 'opacity', (lt >= t0 ? 1 : 0) + ''); R.set(p.punct, 'transform', `scale(${lerp(1.1, 1, q).toFixed(3)})`); return; }
        T.lift(p.pc, lt, t0, { rot: p.rot, shadowEl: p.top, inset: p.insTop, k: 0.45, dur: 0.4 });
        if (p.bot) T.lift(p.bot, lt, t0 + 0.05, { rot: 0, shadowEl: p.bot, inset: p.insBot, k: 0.45, dur: 0.35, from: 1.1 });
      });
    } else {
      const tone = o.tone || 'cream';
      const strips = String(text).split('\n').map((line, i) => {
        const st = h('div', 'p2-strip', box);
        css(st, { position: 'relative', width: 'fit-content', maxWidth: o.w ? px(o.w) : 'none', whiteSpace: o.w ? 'normal' : 'nowrap', marginBottom: px(size * 0.12),
          marginLeft: px(i % 2 ? size * 0.3 : 0) });
        const tx = h('div', 'p2-strip-tx', st); tx.textContent = line;
        css(tx, { color: TONE_INK[tone], lineHeight: o.w ? 1.12 : 1 });
        backing(st, tone, 'left right', 3.3 + i);
        return { st, rot: (i % 2 ? 0.7 : -0.6) * (o.tilt ?? 1) };
      });
      lines = strips.length;
      end = at + (strips.length - 1) * 0.1 + 0.5;
      render = lt => strips.forEach((s0, i) => T.lift(s0.st, lt, at + i * 0.1, { rot: s0.rot, filter: true, k: 0.7 }));
    }
    if (o.maxLines && lines > o.maxLines) console.warn(`[DECK] 제목이 ${lines}줄이다(최대 ${o.maxLines}줄): ${text}`);
    return { el: box, end, lines, render };
  };

  // ── 카드 ──
  // o.layout: 레이아웃 부품과 같은 크기 규칙을 쓴다(이름표 기본 34px, 번호 조각이 있으면 이름표를 번호 조각 오른쪽으로 비킨다)
  // o.h: 'fit' 이면 글에 맞춰 높이를 정한다(o.minH 보다 작아지지 않는다). 돌려주는 h 로 다음 요소의 자리를 잡는다
  T.card = (parent, o = {}) => {
    if (o.h === 'fit') {
      const pad0 = o.pad ?? 38;
      const probe = T.card(parent, Object.assign({}, o, { h: 2400, tape: false, num: undefined }));
      const need = Math.ceil(probe.flow.offsetTop + probe.flow.offsetHeight + pad0 + 2);
      probe.el.remove();
      return T.card(parent, Object.assign({}, o, { h: Math.max(o.minH || 0, need) }));
    }
    const w = o.w ?? 460, hh = o.h ?? 400, pad = o.pad ?? 38, tone = o.tone || 'cream', at = o.at ?? 0;
    const pp = T.paper(parent, { x: o.x, y: o.y, w, h: hh, tone, torn: o.torn, rot: o.rot ?? 0, at, pad, seed: o.seed });
    const subs = [];
    let photoH = 0;
    if (o.photo) {
      const ph = o.photo, pw = ph.w ?? w - pad * 2 + 20, phh = ph.h ?? Math.round(pw * 0.62);
      photoH = (ph.y ?? pad - 6) + phh - pad + 14;
      subs.push(T.cutout(pp.el, ph.src || null, { x: ph.x ?? (w - pw) / 2, y: ph.y ?? pad - 6, w: pw, h: phh, rot: ph.rot ?? 0, at: at + 0.15,
        fallback: ph.fallback, border: ph.border }));
    }
    const flow = h('div', '', pp.inner); css(flow, { position: 'relative', marginTop: px(photoH) });
    const lab = o.label ? h('div', 'p2-card-l', flow, o.label) : null;
    const labSize = o.labelSize ?? (o.layout ? 34 : null);
    if (lab && labSize) css(lab, { fontSize: px(labSize) });   // 레이아웃 부품이 쓰는 큰 이름표. 주지 않으면 30px 그대로
    if (lab && o.layout && o.num != null) css(lab, { marginLeft: '56px' });   // 번호 조각(왼쪽 위 84×92)이 이름표를 가리지 않게
    const title = o.title ? h('div', 'p2-card-t', flow, o.title) : null;
    const body = o.body ? h('div', o.bodyClass || 'p2-card-b', flow, o.body) : null;
    if (title && o.titleSize) css(title, { fontSize: px(o.titleSize) });   // 레이아웃 부품(grid)이 쓰는 큰 글자. 주지 않으면 44·34px 그대로
    if (body && o.bodySize) css(body, { fontSize: px(o.bodySize) });
    if (o.num != null) {
      const np = T.paper(pp.el, { x: -22, y: -26, w: 84, h: 92, tone: o.numTone || 'lemon', rot: -5, at: at + 0.12, k: 0.6 });
      const nn = h('div', 'p2-num', np.inner, String(o.num)); css(nn, { inset: '0', fontSize: '64px', color: TONE_INK[o.numTone || 'lemon'], paddingTop: '4px' });
      subs.push(np);
    }
    const lim = hh - pad + 2;                                // 카드 글자가 넘치면 경고하고 분홍 점선으로 표시한다(시트에서 바로 보이게)
    if (flow.offsetTop + flow.offsetHeight > lim) {
      console.warn(`[DECK] 카드 글자가 넘친다(${flow.offsetTop + flow.offsetHeight - lim + 2}px): ${(o.title || o.label || '').replace(/<[^>]+>/g, ' ')}`);
      pp.face.style.overflow = 'visible'; pp.el.style.outline = '6px dashed #FF00AA';
    }
    if (o.tape) subs.push(T.tape(pp.el, Object.assign({ x: w / 2 - 75, y: -22, w: 150, rot: -3, at: at + 0.3 }, o.tape === true ? {} : o.tape)));
    return { el: pp.el, face: pp.face, inner: pp.inner, flow, title, body, x: o.x, y: o.y, w, h: hh,
      render(lt) { pp.render(lt); subs.forEach(x => x.render(lt)); } };
  };

  // ── 단계 번호 ──
  // o.from: 한 화면에서 여러 단계를 함께 할 때 첫 단계(예: from 1, n 3 → 조각 「1·2·3」, 1~3번 점이 주홍)
  // o.slash: 표시 줄 글자를 「n / 전체」로 쓴다(범위면 「1·2·3 / 8」). o.label: 표시 줄 글자를 직접 준다. 둘 다 없으면 「N단계 중」
  T.step = (parent, n, total, o = {}) => {
    const el = h('div', 'p2-step', parent);
    css(el, { left: px(o.x ?? 98), top: px(o.y ?? 112), width: '172px', height: '240px' });
    const pc = T.paper(el, { x: 0, y: 0, w: 164, h: 172, tone: 'red', torn: 'bottom', rot: o.rot ?? -3, at: o.at ?? 0.05, k: 0.8 });
    const from = Math.min(o.from ?? n, n), nums = [];
    for (let i = from; i <= n; i++) nums.push(i);
    const numTx = nums.join('·');
    const nEl = h('div', 'p2-step-n', pc.inner, numTx);
    if (nums.length > 1) css(nEl, { fontSize: nums.length > 2 ? '60px' : '84px', letterSpacing: '-0.02em' });
    const row = h('div', 'p2-step-row', el); css(row, { left: px(o.row?.x ?? 4), top: px(o.row?.y ?? 192) });
    for (let i = 1; i <= total; i++) {
      const d = h('div', 'p2-step-dot', row);
      css(d, i < from ? { background: C.green } : i <= n ? { background: C.red } : { border: `3px solid rgba(30,22,16,.55)` });
    }
    const labTx = o.label ?? (o.slash ? `${numTx} / ${total}` : `${total}단계 중`);
    const lab = h('div', 'p2-step-lab', row, esc(labTx)); css(lab, { position: 'relative', marginLeft: '8px' });
    const at = (o.at ?? 0.05) + 0.25;
    return { el, render(lt) {
      pc.render(lt);
      const p = prog(lt, at, 0.35, ease.outCubic);
      R.set(row, 'opacity', p.toFixed(3)); R.set(row, 'transform', `scale(${lerp(1.06, 1, p).toFixed(4)})`);
    } };
  };

  // ── 사례 사물(종이 그림) ──
  const ln = (b, x, y, w, dark) => { const l = h('div', 'p2-tl' + (dark ? ' dark' : ''), b); css(l, { left: px(x), top: px(y), width: px(w) }); return l; };
  const box = (b, st) => { const d = h('div', '', b); css(d, Object.assign({ position: 'absolute' }, st)); return d; };
  const ASPECT = { doc: 1.3, binder: 1.3, laptop: 0.7, table: 1.15, sheet: 1.3, summary: 1.25, stamp: 0.9 };
  const THINGS = {
    doc(b, w, hh) {                                         // 민원 게시판 출력물
      b.classList.add('p2-white', 'p2-grain');
      box(b, { left: 0, right: 0, top: 0, height: px(hh * 0.1), background: '#E4D9C7' });
      ln(b, w * 0.1, hh * 0.16, w * 0.58, true);
      [0.27, 0.33, 0.39, 0.45, 0.51, 0.57, 0.63].forEach((y, i) => ln(b, w * 0.1, hh * y, w * (i % 3 === 2 ? 0.5 : 0.8)));
      box(b, { left: px(w * 0.1), top: px(hh * 0.73), width: px(w * 0.8), height: px(hh * 0.16), border: '3px solid rgba(30,22,16,.16)', boxSizing: 'border-box' });
    },
    binder(b, w, hh, o, el) {                               // 스테이플러로 묶은 규정집
      [[14, 12, 2.5, '#E6DAC3'], [7, 6, 1.2, '#EFE6D4']].forEach(([dx, dy, r, c]) => {
        const pg = h('div', '', el); el.insertBefore(pg, b);
        css(pg, { position: 'absolute', left: px(dx), top: px(dy), width: px(w), height: px(hh), background: c, transform: `rotate(${r}deg)`, boxShadow: '0 2px 4px rgba(30,22,16,.25)' });
      });
      b.classList.add('p2-white', 'p2-grain');
      box(b, { left: 0, top: 0, bottom: 0, width: px(w * 0.12), background: C.green });
      box(b, { left: px(w * 0.2), top: px(hh * 0.04), width: px(w * 0.16), height: '7px', background: '#8C8C8C', borderRadius: '2px' });
      ln(b, w * 0.22, hh * 0.13, w * 0.5, true);
      [0.25, 0.31, 0.37, 0.46, 0.52, 0.58, 0.67, 0.73, 0.79].forEach((y, i) => {
        if (i % 3 === 0) box(b, { left: px(w * 0.22), top: px(hh * y - 2), width: '14px', height: '14px', background: 'rgba(30,22,16,.5)' });
        ln(b, w * 0.22 + (i % 3 === 0 ? 24 : 0), hh * y, w * (i % 3 === 2 ? 0.42 : 0.62) - (i % 3 === 0 ? 24 : 0));
      });
    },
    laptop(b, w, hh) {                                      // 노트북(어두운 색지)
      const sw = w * 0.82, sh = hh * 0.78;
      const scr = box(b, { left: px((w - sw) / 2), top: 0, width: px(sw), height: px(sh), background: C.dark, borderRadius: '14px' });
      const inn = box(scr, { left: '5%', top: '7%', right: '5%', bottom: '7%', background: '#FFFDF8' });
      box(inn, { left: 0, top: 0, bottom: 0, width: '26%', background: '#F1EADD' });
      [0.18, 0.3, 0.42].forEach((y, i) => box(inn, { left: '34%', top: px(sh * 0.86 * y), width: i ? '40%' : '52%', height: '9px', borderRadius: '5px', background: 'rgba(30,22,16,.2)' }));
      box(inn, { left: '34%', top: '62%', width: '56%', height: '18%', borderRadius: '10px', background: '#EEE6D8' });
      box(b, { left: 0, top: px(sh), width: px(w), height: px(hh - sh), background: '#3A2E25', clipPath: `polygon(6% 0, 94% 0, 100% 100%, 0 100%)` });
      return 'shaped';
    },
    table(b, w, hh) {                                       // 시험표 12칸
      b.classList.add('p2-cream', 'p2-grain');
      ln(b, w * 0.1, hh * 0.08, w * 0.46, true);
      const gx = w * 0.1, gy = hh * 0.2, gw = w * 0.8, gh = hh * 0.72, cw = gw / 3, ch = gh / 4;
      box(b, { left: px(gx), top: px(gy), width: px(gw), height: px(gh), border: '3px solid rgba(30,22,16,.3)', boxSizing: 'border-box',
        backgroundImage: `linear-gradient(90deg, rgba(30,22,16,.22) 2px, transparent 2px), linear-gradient(rgba(30,22,16,.22) 2px, transparent 2px)`,
        backgroundSize: `${cw.toFixed(1)}px ${ch.toFixed(1)}px` });
      for (let i = 0; i < 12; i++) {
        const cx = gx + (i % 3 + 0.5) * cw, cy = gy + (Math.floor(i / 3) + 0.5) * ch, r = Math.min(cw, ch) * 0.3;
        if (i === 7) { [45, -45].forEach(a => box(b, { left: px(cx - r), top: px(cy - 4), width: px(r * 2), height: '9px', background: C.red, transform: `rotate(${a}deg)` })); }
        else box(b, { left: px(cx - r), top: px(cy - r), width: px(r * 2), height: px(r * 2), borderRadius: '50%', border: `5px solid ${C.green}`, boxSizing: 'border-box', opacity: 0.9 });
      }
    },
    sheet(b, w, hh, o) {                                    // 답변 초안 출력물
      b.classList.add('p2-cream', 'p2-grain');
      ln(b, w * 0.1, hh * 0.09, w * 0.5, true);
      [0.2, 0.26, 0.32, 0.38, 0.44, 0.5, 0.56, 0.62, 0.68, 0.8].forEach((y, i) => ln(b, w * 0.1, hh * y, w * (i === 9 ? 0.36 : i % 4 === 3 ? 0.55 : 0.8), i === 9));
      if (o.band) box(b, { left: '-4%', top: px(hh * 0.3), width: '108%', height: px(hh * 0.11), background: C.red, transform: 'rotate(-4deg)', boxShadow: '0 3px 5px rgba(30,22,16,.3)' });
    },
    summary(b, w, hh) {                                     // 승인 기록
      b.classList.add('p2-cream', 'p2-grain');
      ln(b, w * 0.1, hh * 0.08, w * 0.4, true);
      box(b, { left: '10%', top: '17%', width: '80%', height: '50%', border: '3px solid rgba(30,22,16,.28)', boxSizing: 'border-box',
        backgroundImage: 'linear-gradient(90deg, transparent 49.5%, rgba(30,22,16,.22) 49.5%, rgba(30,22,16,.22) 50.5%, transparent 50.5%), linear-gradient(transparent 49.5%, rgba(30,22,16,.22) 49.5%, rgba(30,22,16,.22) 50.5%, transparent 50.5%)' });
      [0.74, 0.8].forEach(y => ln(b, w * 0.1, hh * y, w * 0.42));
      box(b, { left: '60%', top: '70%', width: px(w * 0.26), height: px(w * 0.26), borderRadius: '50%', border: `6px solid ${C.red}`, boxSizing: 'border-box', transform: 'rotate(-12deg)', opacity: 0.88 });
    },
    stamp(b, w, hh) {                                       // 도장(나무 손잡이)
      const cx = w * 0.42;
      box(b, { left: px(cx - w * 0.16), top: px(hh * 0.02), width: px(w * 0.32), height: px(w * 0.32), borderRadius: '50%', background: '#8A6440' });
      box(b, { left: px(cx - w * 0.08), top: px(hh * 0.02 + w * 0.26), width: px(w * 0.16), height: px(hh * 0.3), background: '#7A5634' });
      box(b, { left: px(cx - w * 0.3), top: px(hh * 0.5), width: px(w * 0.6), height: px(hh * 0.22), background: '#5B4330', borderRadius: '6px' });
      box(b, { left: px(cx - w * 0.28), top: px(hh * 0.72), width: px(w * 0.56), height: px(hh * 0.07), background: C.red });
      box(b, { left: px(w * 0.62), top: px(hh * 0.62), width: px(w * 0.34), height: px(w * 0.34), borderRadius: '50%', border: `6px solid ${C.red}`, boxSizing: 'border-box', transform: 'rotate(-10deg)', opacity: 0.85 });
      return 'shaped';
    },
  };
  T.thing = (parent, kind, o = {}) => {
    const w = o.w ?? 300, hh = o.h ?? Math.round(w * (ASPECT[kind] || 1.25));
    const el = h('div', 'p2-thing', parent);
    css(el, { left: px(o.x ?? 0), top: px(o.y ?? 0), width: px(w), height: px(hh) });
    const b = h('div', 'p2-face', el);
    const shaped = (THINGS[kind] || THINGS.doc)(b, w, hh, o, el) === 'shaped';
    if (shaped) b.style.overflow = 'visible';
    const inset = !shaped && o.border ? `inset 0 0 0 ${o.border}px #fff` : null;
    return { el, w, h: hh, render(lt) { return T.lift(el, lt, o.at ?? 0, { rot: o.rot ?? 0, filter: shaped, shadowEl: shaped ? el : b, inset, k: o.k ?? 1 }); } };
  };

  // ── 누끼 사진 조각 ──
  // 누끼 PNG 의 불투명한 부분만 둘러싼 사각형. 투명 여백을 빼고 맞춰야 조각이 자리를 채운다.
  // file:// 로 열어 픽셀을 읽지 못하면 그림 전체를 쓴다.
  function alphaBox(im) {
    const W = im.naturalWidth, H = im.naturalHeight, s = Math.min(1, 256 / Math.max(W, H));
    const cw = Math.max(1, Math.round(W * s)), ch = Math.max(1, Math.round(H * s));
    try {
      const c = document.createElement('canvas'); c.width = cw; c.height = ch;
      const g = c.getContext('2d'); g.drawImage(im, 0, 0, cw, ch);
      const d = g.getImageData(0, 0, cw, ch).data;
      let x0 = cw, y0 = ch, x1 = -1, y1 = -1;
      for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
        if (d[(y * cw + x) * 4 + 3] > 24) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
      }
      if (x1 < 0) return [0, 0, W, H];
      const sx = Math.max(0, Math.floor((x0 - 1) / s)), sy = Math.max(0, Math.floor((y0 - 1) / s));
      return [sx, sy, Math.min(W, Math.ceil((x1 + 2) / s)) - sx, Math.min(H, Math.ceil((y1 + 2) / s)) - sy];
    } catch (e) { return [0, 0, W, H]; }
  }
  // 캔버스는 화면 크기의 2배로 만든다(고해상도 화면에서 가장자리가 흐려지지 않게).
  function bakeCutout(cv, im, w, hh, B) {
    const S = 2, W = w * S, H = hh * S, BB = B * S;
    cv.width = W; cv.height = H;
    const g = cv.getContext('2d');
    const [sx, sy, sw, sh] = alphaBox(im);
    const sc = Math.min((W - 2 * BB) / sw, (H - 2 * BB) / sh);
    const iw = sw * sc, ih = sh * sc, ix = (W - iw) / 2, iy = (H - ih) / 2;
    const t = document.createElement('canvas'); t.width = W; t.height = H;
    const tg = t.getContext('2d');
    for (const r of [BB, BB * 0.66, BB * 0.33]) for (let a = 0; a < 28; a++) {
      const an = a / 28 * TAU;
      tg.drawImage(im, sx, sy, sw, sh, ix + Math.cos(an) * r, iy + Math.sin(an) * r, iw, ih);
    }
    tg.globalCompositeOperation = 'source-in'; tg.fillStyle = '#FFFFFF'; tg.fillRect(0, 0, W, H);
    g.clearRect(0, 0, W, H); g.drawImage(t, 0, 0); g.drawImage(im, sx, sy, sw, sh, ix, iy, iw, ih);
  }
  T.cutout = (parent, src, o = {}) => {
    const w = o.w ?? 420, hh = o.h ?? 420, B = o.border ?? 12, at = o.at ?? 0, rot = o.rot ?? 0;
    if (!src) {                                             // 그림이 아직 없다: 종이로 그린 사물로 대신한다
      const k = o.fallback || 'doc', fw = Math.min(w, hh / (ASPECT[k] || 1.25));
      const th = T.thing(parent, k, { x: (o.x ?? 0) + (w - fw) / 2, y: (o.y ?? 0) + (hh - fw * (ASPECT[k] || 1.25)) / 2, w: fw, rot, at, border: B });
      return th;
    }
    const el = h('div', 'p2-thing', parent);
    css(el, { left: px(o.x ?? 0), top: px(o.y ?? 0), width: px(w), height: px(hh) });
    const cv = h('canvas', '', el); cv.width = w; cv.height = hh; css(cv, { position: 'absolute', inset: '0', width: '100%', height: '100%' });
    const im = new Image();
    R.preload(new Promise(res => {
      im.onload = () => { try { bakeCutout(cv, im, w, hh, B); } catch (e) { console.error('[REEL] 누끼 테두리 그리기 실패:', src, e); } res(); };
      im.onerror = () => { console.error('[REEL] 이미지 로드 실패:', src); res(); };
    }));
    im.src = src;
    return { el, render(lt) { return T.lift(el, lt, at, { rot, filter: true }); } };
  };

  // ── 화면 캡처 인쇄물 ──
  const SHOT = { wide: [1200, 750], full: [1440, 810], tall: [600, 900], big: [1360, 765] };   // big: 레이아웃 「화면 크게」(제목 아래 y 270 에서 화면 안에 든다)
  // o.w·o.h: 틀 안 화면 크기를 직접 준다(주면 size 보다 앞선다). 예: 오른쪽에 쪽지 열을 두는 「화면 크게」는 w 1240, h 708
  // o.zoom·o.focus: 화면의 한 부분만 확대한다. sidebar·chat·draw 는 보통 크기(대화 34px, 사이드바 30px)로 그리고,
  //   부품이 zoom 배로 키워 focus:[x, y](보통 크기 기준 px) 자리부터 틀에 보인다. 예: zoom 1.6, focus [0, 0] 이면 왼쪽 위 1/1.6 만 보인다
  // o.draw(main, frame) 가 [{ node, n, at, num, numNode }] 를 돌려주면 그 요소 둘레에 고리를 단다(비율 좌표를 손으로 재지 않아도 된다)
  // 고리 번호 조각 자리(marks 의 각 항목): num: 'left'(기본, 고리 왼쪽 바깥) | 'right' | 'top' | [x, y](틀 안 px), numNode: 이 요소의 왼쪽에 둔다
  T.shot = (parent, src, o = {}) => {
    const [w, hh] = (o.w && o.h) ? [o.w, o.h] : (SHOT[o.size || 'wide'] || SHOT.wide), B = 14, at = o.at ?? 0.1;
    const el = h('div', 'p2-shot', parent);
    css(el, { left: px(o.x ?? 120), top: px(o.y ?? 200), width: px(w + 2 * B), height: px(hh + 2 * B) });
    const paper = h('div', 'p2-shot-paper p2-grain', el);
    const inn = h('div', 'p2-shot-in', el); css(inn, { left: px(B), top: px(B), width: px(w), height: px(hh) });
    let frame = null, main = inn, chat = null, drawn = null;
    if (src) KIT.cover(inn, src, { objectPosition: 'top left' });
    else {
      frame = KIT.frame(inn, o.size === 'tall' ? 'phone' : 'browser', { url: o.url ?? 'chatgpt.com', style: { left: '0', top: '0', width: '100%', height: '100%' } });
      let host = frame.body;
      if (o.zoom) {                                          // 확대: 보통 크기 화면을 담는 칸을 키워 focus 자리부터 보인다
        const k = o.zoom, [fx, fy] = o.focus || [0, 0];
        host = h('div', '', frame.body);
        css(host, { position: 'absolute', left: '0', top: '0', display: 'flex', width: px(frame.body.offsetWidth / k + fx), height: px(frame.body.offsetHeight / k + fy),
          transformOrigin: '0 0', transform: `scale(${k}) translate(${-fx}px, ${-fy}px)` });
      }
      main = host;
      if (o.sidebar) {
        const sd = h('div', 'p2-side', host);
        if (o.sidebar.title) { const t = h('div', 'p2-side-i', sd); t.textContent = o.sidebar.title; css(t, { fontWeight: 700, color: C.dim, paddingLeft: '4px' }); }
        (o.sidebar.items || []).forEach((it, i) => { const d = h('div', 'p2-side-i' + (i === (o.sidebar.on ?? 0) ? ' on' : ''), sd); d.textContent = it; });
        main = h('div', 'p2-main', host);
      }
      if (o.chat) chat = KIT.chat(main, o.chat, Object.assign({ style: { left: '0', top: '0', right: '0', bottom: '0' } }, o.chatOpts || {}));
      if (o.draw) drawn = o.draw(main, frame);
    }
    // 요소의 자리를 틀 안 px 로 잰다(무대 배율과 확대를 되돌린다)
    const pos = node => {
      const a = node.getBoundingClientRect(), b = inn.getBoundingClientRect(), k = b.width / inn.offsetWidth;
      return { x: (a.left - b.left) / k, y: (a.top - b.top) / k, w: a.width / k, h: a.height / k };
    };
    const nodeMarks = Array.isArray(drawn) ? drawn.filter(m => m && m.node).map(m => {
      const p = pos(m.node);
      return Object.assign({}, m, { x: p.x / w, y: p.y / hh, w: p.w / w, h: p.h / hh });
    }) : [];
    const tapes = [T.tape(el, { x: -26, y: -18, w: 160, rot: -9, at: at + 0.35 }), T.tape(el, { x: w + 2 * B - 136, y: -16, w: 160, rot: 8, at: at + 0.42 })];
    const lay = h('div', '', el); css(lay, { position: 'absolute', left: px(B), top: px(B), width: px(w), height: px(hh) });
    const marks = (o.marks || []).concat(nodeMarks).map((m, i) => {
      const ring = h('div', 'p2-mark', lay);
      const G = 12;                                          // 짚을 자리와 고리 사이 여백
      css(ring, { left: px(m.x * w - G), top: px(m.y * hh - G), width: px(m.w * w + 2 * G), height: px(m.h * hh + 2 * G) });
      let num = null;                                        // 번호 조각은 기본으로 고리 왼쪽 바깥에 둔다(윗줄 글자를 가리지 않게)
      if (m.n != null) {
        let nx = m.x * w - G - 78, ny = (m.y + m.h / 2) * hh - 32;
        if (m.num === 'right') nx = (m.x + m.w) * w + G + 14;
        else if (m.num === 'top') { nx = m.x * w - G - 10; ny = m.y * hh - G - 78; }
        else if (Array.isArray(m.num)) [nx, ny] = m.num;
        if (m.numNode) { const p = pos(m.numNode); nx = p.x - 64 - 10; ny = p.y + p.h / 2 - 32; }
        num = h('div', 'p2-mark-n', lay, String(m.n)); css(num, { left: px(nx), top: px(ny) });
      }
      return { ring, num, at: m.at ?? at + 1 + i * 0.3, rot: (rand(i, 9.1) - 0.5) * 3 };
    });
    return { el, main, frame, chat, pos, w: w + 2 * B, h: hh + 2 * B, render(lt) {
      T.lift(el, lt, at, { rot: 0, shadowEl: paper });
      tapes.forEach(t => t.render(lt));
      if (chat) chat.render(lt);
      marks.forEach(m => {
        T.lift(m.ring, lt, m.at, { rot: m.rot, k: 0.5, dur: 0.4 });
        if (m.num) T.lift(m.num, lt, m.at + 0.1, { rot: -4, k: 0.5, dur: 0.4, inset: `0 0 0 4px ${C.white}` });
      });
    } };
  };

  // ── 넘기는 카드 ──
  T.flip = (parent, front, back, o = {}) => {
    const w = o.w ?? 460, hh = o.h ?? 320, at = o.at ?? 0, fat = o.flipAt ?? at + 1.5, rot = o.rot ?? 0;
    const el = h('div', 'p2-flip', parent);
    css(el, { left: px(o.x ?? 0), top: px(o.y ?? 0), width: px(w), height: px(hh) });
    const inn = h('div', 'p2-flip-in', el);
    const face = (tone, content) => {
      const f = h('div', `p2-flip-f p2-${tone} p2-grain`, inn);
      css(f, { padding: px(o.pad ?? 36) });
      if (typeof content === 'function') content(f); else f.innerHTML = content || '';
      return f;
    };
    const fr = face(o.frontTone || 'cream', front), bk = face(o.backTone || 'green', back);
    return { el, front: fr, back: bk, render(lt) {
      const p0 = T.lift(el, lt, at, { rot, shadow: false });
      const p = prog(lt, fat, 0.5, ease.inOutCubic);
      const lifted = Math.min(p0, 1 - 0.75 * Math.sin(Math.PI * p));
      R.set(inn, 'boxShadow', boxSh(lifted, 1));
      if (p <= 0 || p >= 1) {
        R.set(el, 'perspective', 'none'); R.set(inn, 'transformStyle', 'flat'); R.set(inn, 'transform', 'none');
        R.set(fr, 'display', p >= 1 ? 'none' : ''); R.set(bk, 'display', p >= 1 ? '' : 'none'); R.set(bk, 'transform', 'none');
      } else {
        R.set(el, 'perspective', '2000px'); R.set(inn, 'transformStyle', 'preserve-3d');
        R.set(inn, 'transform', `rotateY(${(180 * p).toFixed(2)}deg) scale(${(1 + 0.05 * Math.sin(Math.PI * p)).toFixed(4)})`);
        R.set(fr, 'display', ''); R.set(bk, 'display', ''); R.set(bk, 'transform', 'rotateY(180deg)');
      }
    } };
  };

  // ── 승인 도장 ──
  T.stamp = (parent, o = {}) => {
    const size = o.size ?? 220, text = o.text ?? '승인';
    const el = h('div', 'p2-stamp', parent); el.textContent = text;
    css(el, { left: px(o.x ?? 0), top: px(o.y ?? 0), width: px(size), height: px(size), fontSize: px(size * ([...text].length > 2 ? 0.22 : 0.3)), paddingTop: px(size * 0.2) });
    const at = o.at ?? 1, rot = o.rot ?? -12;
    return { el, render(lt) {
      const p = prog(lt, at, 0.12, ease.outQuad);
      R.set(el, 'opacity', lt >= at ? (0.94 * clamp((lt - at) / 0.04)).toFixed(3) : '0');
      R.set(el, 'transform', `rotate(${rot}deg) scale(${lerp(1.15, 1, p).toFixed(4)})`);
      if (o.paper) {
        const d = kf(lt, [[at + 0.06, 0], [at + 0.12, 2, ease.outQuad], [at + 0.36, 0, ease.inOutSine]]);
        R.set(o.paper, 'translate', `0px ${d.toFixed(2)}px`);
      }
    } };
  };

  // ── 넘기는 질문(챕터 끝에서 다음 장의 질문을 놓는 띠) ──
  // 크림 종이 왼쪽에 레몬 이름표 「다음 질문」을 붙이고, 이름표 오른쪽 칸에 질문(40px, 700)을 쓴다.
  // 질문이 칸보다 길면 칸 안에서 낱말 단위로 줄이 바뀐다. 나눌 자리를 정하려면 '\n' 을 쓴다.
  // o.lead 를 주면 이름표 오른쪽 첫 줄에 안내 한 줄(34px)을 쓰고, 질문은 그 아래 줄에 쓴다.
  // o: { x | right | cx, y | bottom, w(주지 않으면 가장 긴 줄에 맞춘다. 최대 o.maxW, 기본 1680), text, lead, label, size(40), at, rot, seed, maxLines(3) }
  //   → { el, x, y, w, h, render }
  T.nextQ = (parent, o = {}) => {
    const size = o.size ?? 40, at = o.at ?? 0, PX = 32, PY = 22, GAP = 26, LH = 1.3;
    const lab = h('div', '', parent, esc(o.label ?? '다음 질문'));
    css(lab, { position: 'absolute', left: '0', top: '0', padding: '10px 20px 11px', fontSize: '30px', fontWeight: 700, lineHeight: 1.15, whiteSpace: 'nowrap', color: C.ink });
    const tw = lab.offsetWidth, th = lab.offsetHeight, colX = PX + tw + GAP;
    const col = h('div', '', parent);
    css(col, { position: 'absolute', left: '0', top: '0', width: px((o.w ?? o.maxW ?? 1680) - colX - PX), wordBreak: 'keep-all', color: C.ink, transformOrigin: '0% 50%' });
    let lead = null;
    if (o.lead) { lead = h('div', '', col, esc(o.lead)); css(lead, { fontSize: '34px', lineHeight: LH, fontWeight: 500 }); }
    const q = h('div', '', col, esc(o.text || ''));
    css(q, { fontSize: px(size), lineHeight: LH, fontWeight: 700, whiteSpace: 'pre-line', textWrap: 'balance', marginTop: lead ? '4px' : '0' });
    const lineRects = n => { const rg = document.createRange(); rg.selectNodeContents(n); return [...rg.getClientRects()].filter(r => r.width > 0); };
    let w = o.w;
    if (w == null) {                                         // 가장 긴 줄의 오른쪽 끝까지(무대 배율을 되돌려 잰다)
      const cb = col.getBoundingClientRect(), zoom = (cb.width / col.offsetWidth) || 1;
      let right = 0;
      [lead, q].forEach(n => { if (n) lineRects(n).forEach(r => { right = Math.max(right, (r.right - cb.left) / zoom); }); });
      w = Math.ceil(colX + right + PX + 2);
      css(col, { width: px(w - colX - PX) });
    }
    const qLines = Math.round(q.offsetHeight / (size * LH));
    if (qLines > (o.maxLines ?? 3)) console.warn(`[DECK] 넘기는 질문이 ${qLines}줄이다: ${o.text}`);
    const hh = Math.ceil(PY * 2 + Math.max(col.offsetHeight, th));
    const x = o.right != null ? o.right - w : o.cx != null ? Math.round(o.cx - w / 2) : (o.x ?? 120);
    const y = o.bottom != null ? o.bottom - hh : (o.y ?? 0);
    const pp = T.paper(parent, { x, y, w, h: hh, tone: 'cream', rot: o.rot ?? -0.4, at, seed: o.seed ?? 6.6 });
    const firstH = lead ? 34 * LH : size * LH;
    const tag = T.paper(pp.inner, { x: PX - 6, y: PY + (firstH - th) / 2, w: tw, h: th, tone: 'lemon', torn: 'left right', rot: -2, at: at + 0.15, k: 0.5, dur: 0.4, seed: 2.7 });
    tag.inner.appendChild(lab);
    pp.inner.appendChild(col); css(col, { left: px(colX), top: px(PY) });
    return { el: pp.el, x, y, w, h: hh, lines: qLines, render(lt) {
      pp.render(lt); tag.render(lt);
      T.lift(col, lt, at + 0.3, { shadow: false, dur: 0.4 });
    } };
  };

  // ── 인물 ──
  const PEOPLE = {
    han: { name: '한서윤 주임', org: '고객지원팀', hair: 'bob', extra: 'round', sym: 'speech' },
    oh: { name: '오민석 팀장', org: '고객지원팀', hair: 'short', extra: 'tie', sym: 'stamp' },
    jung: { name: '정하준 대리', org: '정보화팀', hair: 'part', extra: 'lanyard', sym: 'lock' },
    yoon: { name: '윤지영 본부장', org: '경영지원본부', hair: 'tied', extra: 'lapel', sym: 'flag' },
  };
  const HAIR = {
    bob: 'M84 160 C74 92 106 46 150 46 C196 46 228 90 216 160 L222 204 L186 204 L190 134 C178 112 164 104 150 104 C134 104 120 112 110 134 L114 204 L78 204 Z',
    short: 'M88 132 C82 70 114 46 150 46 C188 46 218 70 212 132 C206 104 186 90 150 90 C116 90 96 104 88 132 Z',
    part: 'M88 136 C82 66 120 44 158 46 C194 48 220 76 212 136 C208 110 194 94 172 88 C146 100 116 100 92 116 Z',
    tied: 'M88 134 C82 70 114 46 150 46 C188 46 218 70 212 134 C206 102 186 86 150 86 C116 86 96 102 88 134 Z',
  };
  const SYM = {
    speech: `<path d="M-26 -22 h52 a9 9 0 0 1 9 9 v24 a9 9 0 0 1 -9 9 h-24 l-14 13 v-13 h-14 a9 9 0 0 1 -9 -9 v-24 a9 9 0 0 1 9 -9 z" fill="${C.ink}"/>`,
    stamp: `<circle cx="0" cy="-20" r="11" fill="${C.red}"/><rect x="-6" y="-12" width="12" height="16" fill="${C.red}"/><rect x="-22" y="4" width="44" height="14" rx="3" fill="${C.red}"/><rect x="-24" y="20" width="48" height="6" fill="${C.red}"/>`,
    lock: `<path d="M-14 -4 v-10 a14 14 0 0 1 28 0 v10" fill="none" stroke="${C.ink}" stroke-width="7"/><rect x="-22" y="-4" width="44" height="32" rx="5" fill="${C.ink}"/>`,
    flag: `<rect x="-20" y="-28" width="6" height="60" fill="${C.ink}"/><path d="M-14 -28 h38 l-9 13 l9 13 h-38 z" fill="${C.ink}"/>`,
  };
  T.person = (parent, who, o = {}) => {
    const P = PEOPLE[who] || PEOPLE.han, sc = o.scale ?? 0.9, at = o.at ?? 0.2;
    const el = h('div', 'p2-person', parent);
    css(el, { left: px(o.x ?? 120), top: px(o.y ?? 560), width: px(300 * sc), height: px(360 * sc) });
    const body = 'M18 360 C18 268 70 234 150 234 C230 234 282 268 282 360 Z', neck = 'M126 176 L174 176 L180 244 L120 244 Z';
    const bun = P.hair === 'tied' ? '<circle cx="204" cy="66" r="27"/>' : '';
    const shapes = (fillBody, fillHead, fillHair) =>
      `<path d="${body}" fill="${fillBody}"/><path d="${neck}" fill="${fillHead}"/><ellipse cx="150" cy="124" rx="60" ry="70" fill="${fillHead}"/>` +
      `<g fill="${fillHair}">${bun}<path d="${HAIR[P.hair]}"/></g>`;
    const extra = {
      round: `<path d="M124 236 Q150 266 176 236 Z" fill="${C.cream}"/>`,
      tie: `<path d="M120 236 L150 280 L180 236 Z" fill="${C.cream}"/><path d="M142 242 L158 242 L163 256 L156 322 L150 334 L144 322 L137 256 Z" fill="${C.ink}"/>`,
      lanyard: `<path d="M128 238 L146 304 M172 238 L154 304" stroke="${C.cream}" stroke-width="6" fill="none"/><rect x="133" y="302" width="34" height="44" rx="3" fill="${C.cream}"/><rect x="140" y="318" width="20" height="5" fill="${C.ink}" opacity=".6"/>`,
      lapel: `<path d="M126 236 L150 292 L150 240 Z M174 236 L150 292 L150 240 Z" fill="${C.cream}"/><path d="M110 240 L150 330 L118 250 Z M190 240 L150 330 L182 250 Z" fill="#4A3A2C"/>`,
    }[P.extra] || '';
    const svg = s('svg', { viewBox: '-10 -10 320 380', width: 300 * sc, height: 360 * sc }, el);
    css(svg, { position: 'absolute', left: '0', top: '0', overflow: 'visible' });
    svg.innerHTML = `<g stroke="#FFFFFF" stroke-width="16" stroke-linejoin="round">${shapes('#fff', '#fff', '#fff')}</g>` +
      shapes('#3A2C20', '#E3C9A3', C.ink) + extra;
    const symEl = h('div', '', el);
    const sd = 104 * sc;
    css(symEl, { position: 'absolute', left: px(232 * sc), top: px(196 * sc), width: px(sd), height: px(sd), borderRadius: '50%', background: C.cream });
    const ss = s('svg', { viewBox: '-50 -50 100 100', width: sd, height: sd }, symEl); ss.innerHTML = SYM[P.sym];
    const nameWrap = h('div', 'p2-name', el); css(nameWrap, { top: px(318 * sc), transform: 'translateX(-50%)' });
    const nameIn = h('div', '', nameWrap); css(nameIn, { position: 'relative' });
    const tag = h('div', 'p2-name-tx', nameIn, esc(P.name) + (o.org ? `<small>${esc(P.org)}</small>` : ''));
    backing(nameIn, 'cream', 'left right', 5.1 + (o.x || 0) * 0.01);
    return { el, render(lt) {
      T.lift(svg, lt, at, { rot: o.rot ?? 0, filter: true, k: 0.8 });
      T.lift(symEl, lt, at + 0.14, { rot: 6, k: 0.5, dur: 0.4, inset: `0 0 0 ${Math.max(4, 6 * sc).toFixed(1)}px #fff` });
      T.lift(nameIn, lt, at + 0.22, { rot: -1.2, filter: true, k: 0.5, dur: 0.4 });
    } };
  };

  // ── 영상 자리의 대체 콜라주(영상·그림이 들어오기 전) ──
  const COLLAGE = {
    intro: [['binder', 1290, 120, 330, -5], ['doc', 1585, 250, 270, 6], ['laptop', 1240, 560, 560, -2], ['tape', 1660, 238, 140, 18]],
    place: [['doc', 1280, 150, 300, -4], ['sheet', 1540, 300, 300, 5], ['binder', 1330, 600, 300, 3], ['tape', 1360, 140, 140, -10]],
    flip: [['table', 1300, 150, 380, -4], ['table', 1420, 520, 380, 3], ['tape', 1430, 130, 140, -8]],
    swap: [['sheet', 1270, 170, 330, -7], ['sheet', 1500, 400, 330, 6, { band: true }], ['tape', 1290, 150, 140, -12]],
  };
  function collage(parent, scene, flip, at) {
    return (COLLAGE[scene] || COLLAGE.intro).map(([kind, x, y, w, rot, extra], i) => {
      const t0 = at + 0.15 + i * 0.16;
      if (kind === 'tape') return T.tape(parent, { x: flip ? 1920 - x - w : x, y, w, rot: flip ? -rot : rot, at: t0 + 0.2 });
      const hh = Math.round(w * (ASPECT[kind] || 1.25));
      return T.thing(parent, kind, Object.assign({ x: flip ? 1920 - x - w : x, y, w, h: hh, rot: flip ? -rot : rot, at: t0, border: 0 }, extra || {}));
    });
  }

  // ── 인트로·전환 장 ──
  // 글자 칸(box) 왼쪽에서 가장 긴 줄 끝까지의 폭(무대 px). 줄 단위 상자를 재므로 칸이 1100px 여도 실제로 쓴 폭이 나온다.
  // 무대가 화면 배율로 줄어 있어도 맞도록 box 의 화면 폭과 offsetWidth 의 비로 되돌린다. 잴 수 없으면 칸 폭을 그대로 쓴다.
  function textWidth(box, nodes, min = 760) {
    const bb = box.getBoundingClientRect(), full = box.offsetWidth;
    if (!bb.width || !full) return full || 1100;
    const zoom = bb.width / full;
    let right = 0;
    nodes.forEach(n => {
      const rg = document.createRange(); rg.selectNodeContents(n);
      for (const r of rg.getClientRects()) if (r.width > 0) right = Math.max(right, (r.right - bb.left) / zoom);
    });
    return Math.round(Math.min(full, Math.max(min, right)));
  }
  // 대표 그림·영상의 크라프트는 #CC8E53 안팎으로 테마 바탕(#C69C6D)보다 주황이 짙다. 채도를 낮추고 조금 밝혀 #C7986B 근처로 맞춘다.
  // 이렇게 하면 전환 장에서 본문 장으로 넘어갈 때 바탕색이 튀지 않고, 그림 속 빨간 종이가 승인용 주홍과 덜 헷갈린다.
  const MEDIA_TONE = 'saturate(.75) brightness(1.05)';
  T.videoTitle = (parent, o = {}) => {
    const intro = o.kind === 'intro', flip = !!o.flip, at = o.at ?? 0;
    const root = h('div', 'p2-vt', parent);
    const media = h('div', 'p2-vt-media', root);
    let bg = null, items = [], cover = null;
    if (o.src && o.poster) {
      const v = DECK.video(media, o.src, { poster: o.poster });
      if (flip) v.style.transform = 'scaleX(-1)';
      v.style.filter = MEDIA_TONE;
    } else if (o.poster) {
      cover = KIT.cover(media, o.poster);
      cover.style.filter = MEDIA_TONE;
    } else {
      bg = T.bg(media, 'base');
      items = collage(media, o.scene || 'intro', flip, at);
    }
    const tx = h('div', 'p2-vt-text', root);
    css(tx, { left: px(flip ? 1920 - 120 - 1100 : 120) });
    const kick = h('div', 'p2-kick', tx);
    const kt = h('span', 'p2-kick-tx', kick, esc(o.kicker || '').replace(/(\d+)/g, '<span class="num">$1</span>'));
    if (intro) css(kt, { fontSize: '42px', padding: '14px 28px 15px' });
    backing(kick, 'lemon', 'left right', 2.2);
    const ttl = T.title(tx, o.title || '', { mode: 'pieces', flow: true, size: intro ? 88 : 72, w: 1100, at: at + 0.45, maxLines: 2, seed: o.seed });
    const q = h('div', 'p2-q', tx); q.textContent = o.sub || '';
    const qLines = Math.round((q.offsetHeight - 26) / (40 * 1.42));
    const qMax = intro ? 3 : 2;
    if (o.sub && qLines > qMax) console.warn(`[DECK] 질문이 ${qLines}줄이다(최대 ${qMax}줄): ${o.sub}`);
    const th = tx.offsetHeight, top = Math.round((1080 - th) / 2) - 8;
    css(tx, { top: px(top) });
    // 크림 띠 너비를 실제 글자 폭에 맞춘다. 대표 그림·영상의 콜라주는 반대쪽 40%에 있어서 띠가 1100px 칸을 다 덮으면 그림 가장자리를 가린다.
    const cw = textWidth(tx, [kick, ttl.el, q]);
    if (flip) css(tx, { left: px(1920 - 120 - cw) });
    const padY = 66, padX = o.padX ?? 90, bx = flip ? 1920 - 120 - cw - padX : -42, bw = flip ? 1920 + 42 - bx : 120 + cw + padX + 42;
    const band = T.paper(root, { x: bx, y: top - padY, w: bw, h: th + padY * 2, tone: 'cream', torn: flip ? 'left top bottom' : 'right top bottom',
      rot: flip ? 0.7 : -0.7, at: at + 0.1, seed: 4.4 });
    root.insertBefore(band.el, tx);
    const qAt = ttl.end + 0.05;
    return { el: root, title: ttl, lines: ttl.lines, qLines, render(lt, ctx) {
      if (bg) bg.render(lt, ctx);
      items.forEach(it => it.render(lt));
      if (cover) R.set(cover, 'transform', `scale(${(1.0 + 0.03 * clamp(lt / 10)).toFixed(4)})${flip ? ' scaleX(-1)' : ''}`);
      band.render(lt);
      T.lift(kick, lt, at + 0.3, { rot: -1.5, filter: true, k: 0.6, dur: 0.4 });
      ttl.render(lt);
      const p = prog(lt, qAt, 0.55, ease.outCubic);
      R.set(q, 'opacity', (lt >= qAt ? 1 : 0) + '');
      R.set(q, 'clipPath', `inset(-10px ${(100 - 100 * p).toFixed(2)}% -10px -10px)`);
    } };
  };

  // ════ 레이아웃 부품(2026-11-24 추가) ════
  // 장마다 가장 중요한 요소 하나를 화면의 3분의 1 이상으로 놓는 부품이다. 어느 장에 어느 부품을 쓰는지는 p2.md 「레이아웃 목록」에 있다.
  // 모든 부품은 키 누름 없이 차례로 나타나 3~4초 안에 끝 상태가 된다.
  // o.revealAt 을 받는 부품은 그 요소를 키 누름 뒤에 한 번 크게 붙인다(REVEAL: 1.22배·큰 그림자에서 0.45초). revealAt 은 steps 시각보다 0.1초 뒤에 둔다.
  const REVEAL = { from: 1.22, dur: 0.45, k: 1.5 };
  // 크기를 재기 위한 칸: 부모 안에 만들어 잰 뒤 종이 안으로 옮긴다
  function measureBox(parent, w, st) {
    const col = h('div', '', parent);
    css(col, Object.assign({ position: 'absolute', left: '0', top: '0', width: px(w), wordBreak: 'keep-all', color: C.ink }, st || {}));
    return col;
  }
  function line(parent, html, st) { const d = h('div', '', parent, html); css(d, Object.assign({ position: 'relative' }, st || {})); return d; }
  function numPiece(parent, n, o = {}) {
    const tone = o.tone || 'lemon', sz = o.size ?? 84;
    const np = T.paper(parent, { x: o.x ?? -22, y: o.y ?? -26, w: sz, h: Math.round(sz * 1.08), tone, rot: o.rot ?? -5, at: o.at ?? 0, k: 0.6 });
    const nn = h('div', 'p2-num', np.inner, esc(n)); css(nn, { inset: '0', fontSize: px(sz * 0.72), color: TONE_INK[tone], paddingTop: '4px' });
    return np;
  }
  function overflowMark(pp, flow, lim, what) {
    if (flow.offsetTop + flow.offsetHeight <= lim) return;
    console.warn(`[DECK] 종이 글자가 넘친다(${Math.round(flow.offsetTop + flow.offsetHeight - lim)}px): ${String(what || '').replace(/<[^>]+>/g, ' ').slice(0, 40)}`);
    pp.face.style.overflow = 'visible'; pp.el.style.outline = '6px dashed #FF00AA';
  }
  // 고정폭 조각: 파일 이름, 기호(```), 코드 낱말을 글 안에서 고정폭 서체로 쓴다. T.mono('시험질문.md') → HTML
  T.mono = t => `<span style="font-family:var(--mono)">${esc(t)}</span>`;
  const revealLift = (pp, lt, at, rot) => T.lift(pp.el, lt, at, { rot, shadowEl: pp.face, k: REVEAL.k, dur: REVEAL.dur, from: REVEAL.from });

  // 위쪽 줄: 머리말 + 슬라이드 제목(크림 띠, 기본 80px). o.step 을 주면 왼쪽에 실습 단계 번호를 놓고 제목은 68px.
  // o: { chapter, chapterTitle, title('\n' 으로 줄), size, step:[n, total, from], fiction(기본 true) } → { title, bottom(제목 아래 y), render }
  T.top = (parent, o = {}) => {
    const hd = T.header(parent, { chapter: o.chapter, title: o.chapterTitle, fiction: o.fiction ?? true, at: 0 });
    const st = o.step ? T.step(parent, o.step[0], o.step[1], { x: 86, y: 100, at: 0.05, slash: true, from: o.step[2], row: { x: 206, y: 114 } }) : null;
    const size = o.size ?? (st ? 68 : 80), tx = st ? 292 : 120, ty = st ? 104 : 120;
    const tt = T.title(parent, o.title || '', { x: tx, y: ty, size, at: 0.1 });
    if (tx + tt.el.offsetWidth > 1820) console.warn(`[DECK] 제목이 화면 폭을 넘는다(${tx + tt.el.offsetWidth}px): ${o.title}`);
    const bottom = Math.max(ty + tt.el.offsetHeight, st ? 254 : 0);
    return { title: tt, bottom, render(lt) { hd.render(lt); if (st) st.render(lt); tt.render(lt); } };
  };

  // 이름표 조각: 색지 띠에 짧은 글(34px, 700). o: { x, y, tone('lemon'|'kraft'|'red'|'green'|'cream'), size, rot, at, seed } → { el, w, h, render }
  T.tag = (parent, text, o = {}) => {
    const tone = o.tone || 'lemon';
    const wrap = h('div', '', parent); css(wrap, { position: 'absolute', left: px(o.x ?? 0), top: px(o.y ?? 0), zIndex: 2 });
    const box = h('div', '', wrap); css(box, { position: 'relative' });
    const tx = h('span', '', box, esc(text));
    css(tx, { position: 'relative', display: 'inline-block', padding: '10px 22px 11px', fontSize: px(o.size ?? 34), fontWeight: 700, lineHeight: 1.15, whiteSpace: 'nowrap', color: TONE_INK[tone] });
    backing(box, tone, 'left right', o.seed ?? 2.3);
    return { el: wrap, w: box.offsetWidth, h: box.offsetHeight,
      render(lt) { T.lift(box, lt, o.at ?? 0, { rot: o.rot ?? -2, filter: true, k: 0.5, dur: 0.4 }); } };
  };

  // 띠: 글자 폭에 맞춘 종이 띠 한 장(ch06 의 장면 코드에서 옮겼다). 제목 옆 안내 한 줄, 표 아래 합계 줄, 출처 줄에 쓴다.
  // o: { x | right(오른쪽 끝 x), y, w(주면 줄을 접는다), size(34), weight(500), lh(1.4), tone('cream'), torn('left right'), rot(0), at, padX(28), padY(14), seed } → { el, x, y, w, h, render }
  T.strip = (parent, html, o = {}) => {
    const size = o.size ?? 34, padX = o.padX ?? 28, padY = o.padY ?? 14, tone = o.tone || 'cream';
    const tx = h('div', '', parent, html);
    css(tx, { position: 'absolute', left: '0', top: '0', fontSize: px(size), lineHeight: String(o.lh ?? 1.4), fontWeight: String(o.weight ?? 500),
      width: o.w ? px(o.w - 2 * padX) : 'auto', whiteSpace: o.w ? 'normal' : 'nowrap', wordBreak: 'keep-all' });
    const w = o.w ?? Math.ceil(tx.offsetWidth) + 2 * padX + 2, hh = Math.ceil(tx.offsetHeight) + 2 * padY;
    const x = o.right != null ? o.right - w : (o.x ?? 120), y = o.y ?? 0;
    const pp = T.paper(parent, { x, y, w, h: hh, tone, torn: o.torn ?? 'left right', rot: o.rot ?? 0, at: o.at ?? 0, seed: o.seed });
    pp.inner.appendChild(tx);
    css(tx, { left: px(padX), top: px(padY), color: TONE_INK[tone] });
    return { el: pp.el, x, y, w, h: hh, render: lt => pp.render(lt) };
  };

  // 쪽지: 이름표를 위 가장자리에 걸친 종이 쪽지(이름표가 종이 밖으로 걸쳐 높이를 아낀다. ch06 의 장면 코드에서 옮겼다).
  // o: { x, y, w, html, label, labelTone('lemon'), labelRot(-2), size(34), tone('cream'), rot, at, padX(34), padY(26), seed } → { el, x, y, w, h, render }
  T.note = (parent, o = {}) => {
    const PX = o.padX ?? 34, PY = o.padY ?? 26, tone = o.tone || 'cream', LT = o.label ? 12 : 0, w = o.w ?? 600;
    const col = h('div', '', parent, o.html || '');
    css(col, { position: 'absolute', left: '0', top: '0', width: px(w - 2 * PX), fontSize: px(o.size ?? 34), lineHeight: 1.4, fontWeight: 500, wordBreak: 'keep-all', color: TONE_INK[tone] });
    const hh = Math.ceil(col.offsetHeight + 2 * PY + LT);
    const pp = T.paper(parent, { x: o.x ?? 0, y: o.y ?? 0, w, h: hh, tone, rot: o.rot ?? 0, at: o.at ?? 0, seed: o.seed });
    pp.inner.appendChild(col); css(col, { left: px(PX), top: px(PY + LT) });
    const tg = o.label ? T.tag(pp.el, o.label, { x: PX - 16, y: -30, size: 34, tone: o.labelTone || 'lemon', at: (o.at ?? 0) + 0.15, rot: o.labelRot ?? -2 }) : null;
    return { el: pp.el, x: o.x ?? 0, y: o.y ?? 0, w, h: hh, render(lt) { pp.render(lt); if (tg) tg.render(lt); } };
  };

  // 한 문장: 크림 종이 한 장에 한 문장을 크게(기본 120px, Black Han Sans). o.mark 에 준 낱말은 레몬 바탕을 깐다. 종이는 y 200~980 사이 세로 가운데.
  // o: { text('\n' 으로 줄), sub(44px), kicker(40px), x, y, w, size, tone, mark, at, rot } → { el, y, h, end, render }
  T.statement = (parent, o = {}) => {
    const size = o.size ?? 120, at = o.at ?? 0.1, x = o.x ?? 120, w = o.w ?? 1680, PX = 80, PY = 80, tone = o.tone || 'cream';
    const soft = tone === 'cream' ? C.dim : TONE_INK[tone];
    const col = measureBox(parent, w - PX * 2, { color: TONE_INK[tone] });
    const kick = o.kicker ? line(col, esc(o.kicker), { fontSize: '40px', fontWeight: 700, marginBottom: '24px', color: soft }) : null;
    const rows = String(o.text || '').split('\n').map(t => {
      let html = esc(t);
      if (o.mark) html = html.split(esc(o.mark)).join(`<span class="p2-mk">${esc(o.mark)}</span>`);
      return line(col, html, { fontFamily: 'var(--display)', fontSize: px(size), lineHeight: 1.22, whiteSpace: 'nowrap' });
    });
    rows.forEach(r => { if (r.scrollWidth > w - PX * 2 + 2) console.warn(`[DECK] 한 문장 줄이 종이보다 길다: ${r.textContent}`); });
    const sub = o.sub ? line(col, esc(o.sub), { fontSize: '44px', lineHeight: 1.42, marginTop: '36px', whiteSpace: 'pre-line', color: soft }) : null;
    const hh = Math.ceil(PY * 2 + col.offsetHeight), y = o.y ?? Math.max(200, Math.round(200 + (780 - hh) / 2));
    const pp = T.paper(parent, { x, y, w, h: hh, tone, rot: o.rot ?? -0.6, at, seed: o.seed ?? 8.1 });
    pp.inner.appendChild(col); css(col, { left: px(PX), top: px(PY) });
    const parts = [kick, ...rows, sub].filter(Boolean);
    return { el: pp.el, y, h: hh, end: at + 0.2 + parts.length * 0.15 + 0.4, render(lt) {
      pp.render(lt);
      parts.forEach((d, i) => T.lift(d, lt, at + 0.2 + i * 0.15, { shadow: false, dur: 0.4, from: 1.04 }));
    } };
  };

  // 큰 숫자: 왼쪽 종이(960×700, y 280~980)에 숫자(Anton, 기본 300px, 종이 폭에 맞춰 줄인다), 오른쪽 종이에 이름표와 설명 줄(첫 줄 52px 700, 나머지 40px).
  // o: { value, unit, caption(숫자 아래 36px), label, labelTone, lines, tone('cream'|'green'|'red'), x, y, w, h, side:{ x, y, w }, size, at, revealAt, rot } → { el, render }
  T.bigNum = (parent, o = {}) => {
    const at = o.at ?? 0.2, x = o.x ?? 120, y = o.y ?? 280, w = o.w ?? 960, hh = o.h ?? 700, tone = o.tone || 'cream', rot = o.rot ?? -1;
    const pp = T.paper(parent, { x, y, w, h: hh, tone, rot, at, seed: 9.3 });
    const wrapN = h('div', '', pp.inner);
    css(wrapN, { position: 'absolute', inset: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: TONE_INK[tone] });
    const num = h('div', '', wrapN); css(num, { position: 'relative', fontFamily: 'var(--num)', lineHeight: 1, whiteSpace: 'nowrap' });
    num.innerHTML = esc(o.value) + (o.unit ? `<span style="font-family:var(--body);font-weight:700;font-size:.24em;margin-left:.14em">${esc(o.unit)}</span>` : '');
    let size = o.size ?? 300; css(num, { fontSize: px(size) });
    while (num.offsetWidth > w - 90 && size > 120) { size -= 10; css(num, { fontSize: px(size) }); }
    const cap = o.caption ? line(wrapN, esc(o.caption), { fontSize: '40px', fontWeight: 700, marginTop: '20px', textAlign: 'center', padding: '0 40px', color: tone === 'cream' ? C.dim : TONE_INK[tone] }) : null;
    const nAt = o.revealAt ?? at;
    let side = null;
    if (o.lines || o.label) {
      const sd = o.side || {}, sx = sd.x ?? x + w + 50, sw = sd.w ?? 1800 - sx, PX = 46, PY = 44, LT = o.label ? 30 : 0;
      const col = measureBox(parent, sw - PX * 2);
      (o.lines || []).forEach((t, i) => line(col, t, i === 0 ? { fontSize: '52px', fontWeight: 700, lineHeight: 1.28 } : { fontSize: '40px', lineHeight: 1.42, marginTop: '18px', color: C.dim }));
      const sh = Math.ceil(PY * 2 + LT + col.offsetHeight), sy = sd.y ?? y + Math.round((hh - sh) / 2);
      const sp = T.paper(parent, { x: sx, y: sy, w: sw, h: sh, tone: 'cream', rot: 0.8, at: at + 0.35, seed: 9.9 });
      sp.inner.appendChild(col); css(col, { left: px(PX), top: px(PY + LT) });
      const tg = o.label ? T.tag(sp.el, o.label, { x: PX - 16, y: -26, tone: o.labelTone || 'lemon', at: at + 0.5 }) : null;
      side = { sp, tg };
    }
    return { el: pp.el, render(lt) {
      if (o.revealAt != null) revealLift(pp, lt, nAt, rot); else pp.render(lt);
      T.lift(num, lt, nAt + 0.1, { shadow: false, dur: 0.4, from: 1.12 });
      if (cap) T.lift(cap, lt, nAt + 0.3, { shadow: false, dur: 0.35 });
      if (side) { side.sp.render(lt); if (side.tg) side.tg.render(lt); }
    } };
  };

  // 좌우 대비: 같은 크기의 종이 두 장. 왼쪽은 앞(1판·실패·고치기 전), 오른쪽은 뒤(2판·통과·고친 뒤).
  // 쪽마다 { tag, tagTone, num(Anton 180px), numSize, title(58px), body(44px), tone }. 오른쪽 기본 tone 은 초록. 종이 800×690, y 280~980.
  // o.revealAt 을 주면 오른쪽 종이가 그 시각에 크게 붙는다(답을 먼저 보이면 안 되는 장). o: { left, right, x, y, w(한 장), h, gap, at, revealAt, fit, center } → { left, right, render }
  // o.fit: 숫자를 numSize 에서 5px 씩 줄여 종이 폭과 높이에 맞추고, 두 장의 숫자를 작은 쪽 크기로 맞춘다(numSize 를 290 처럼 크게 주고 쓴다, 120px 아래로는 줄이지 않는다).
  // o.center: 종이 안 글을 세로 가운데에 둔다
  T.versus = (parent, o = {}) => {
    const x = o.x ?? 120, y = o.y ?? 280, w = o.w ?? 800, hh = o.h ?? 690, gap = o.gap ?? 80, at = o.at ?? 0.3, PX = 52;
    const side = (d, i) => {
      const tone = d.tone || (i ? 'green' : 'cream'), rot = i ? 0.9 : -0.9, a0 = i ? (o.revealAt ?? at + 0.4) : at;
      const pp = T.paper(parent, { x: x + i * (w + gap), y: y + (i ? 10 : 0), w, h: hh, tone, rot, at: a0, pad: PX, seed: 5.5 + i });
      const flow = h('div', '', pp.inner); css(flow, { position: 'relative', color: TONE_INK[tone], marginTop: d.tag ? '34px' : '0' });
      const nl = d.num != null ? line(flow, esc(d.num), { fontFamily: 'var(--num)', fontSize: px(d.numSize ?? 180), lineHeight: 1, whiteSpace: 'nowrap' }) : null;
      if (d.title) line(flow, d.title, { fontSize: px(d.titleSize ?? 58), fontWeight: 700, lineHeight: 1.22, marginTop: d.num != null ? '26px' : '0' });
      if (d.body) line(flow, d.body, { fontSize: px(d.bodySize ?? 44), lineHeight: 1.42, marginTop: '18px' });
      const tg = d.tag ? T.tag(pp.el, d.tag, { x: PX - 16, y: -26, tone: d.tagTone || (i ? 'lemon' : 'kraft'), at: a0 + (i && o.revealAt != null ? 0.25 : 0.15) }) : null;
      return { pp, tg, rot, a0, nl, flow, d };
    };
    const L = side(o.left || {}, 0), Rt = side(o.right || {}, 1);
    if (o.fit) {                                             // 숫자 글자 폭(Range)과 종이 안 높이를 재서 숫자를 줄인다. 두 장 가운데 작은 쪽 크기로 맞춘다
      const fitOne = sd => {
        if (!sd.nl) return Infinity;
        const tw = () => { const r = document.createRange(); r.selectNodeContents(sd.nl); const k = sd.nl.getBoundingClientRect().width / (sd.nl.offsetWidth || 1); return Math.round(r.getBoundingClientRect().width / (k || 1)); };
        let ns = sd.d.numSize ?? 180;
        while ((tw() > w - PX * 2 - 6 || sd.flow.offsetHeight + (sd.d.tag ? 34 : 0) > hh - PX * 2) && ns > 120) { ns -= 5; css(sd.nl, { fontSize: px(ns) }); }
        return ns;
      };
      const ns = Math.min(fitOne(L), fitOne(Rt));
      [L, Rt].forEach(sd => { if (sd.nl && ns !== Infinity) css(sd.nl, { fontSize: px(ns) }); });
    }
    [L, Rt].forEach(sd => {
      if (o.center) css(sd.flow, { marginTop: px(Math.max(sd.d.tag ? 34 : 0, Math.round((hh - PX * 2 - sd.flow.offsetHeight) / 2))) });
      overflowMark(sd.pp, sd.flow, hh - PX + 2, sd.d.title || sd.d.num);
    });
    return { left: L.pp, right: Rt.pp, render(lt) {
      L.pp.render(lt); if (L.tg) L.tg.render(lt);
      if (o.revealAt != null) revealLift(Rt.pp, lt, Rt.a0, Rt.rot); else Rt.pp.render(lt);
      if (Rt.tg) Rt.tg.render(lt);
    } };
  };

  // 짚는 쪽지: 화면 인쇄물 위에 테이프로 붙이는 쪽지. 주홍 번호 조각과 글(40px, 700). THEME.shot 의 marks 번호와 맞춘다.
  // o: { x, y, w, n, text(HTML), size, tone('lemon'|'cream'), at, rot } → { el, h, render }
  T.callout = (parent, o = {}) => {
    const w = o.w ?? 440, PX = 30, PY = 26, NW = o.n != null ? 58 : 0, tone = o.tone || 'lemon', at = o.at ?? 0;
    const col = measureBox(parent, w - PX * 2 - NW);
    line(col, o.text || '', { fontSize: px(o.size ?? 40), fontWeight: 700, lineHeight: 1.3 });
    const hh = Math.ceil(PY * 2 + col.offsetHeight);
    const pp = T.paper(parent, { x: o.x ?? 0, y: o.y ?? 0, w, h: hh, tone, rot: o.rot ?? -1.5, at, seed: (o.x || 0) * 0.01 + 1.7 });
    pp.inner.appendChild(col); css(col, { left: px(PX + NW), top: px(PY) });
    const np = o.n != null ? numPiece(pp.el, o.n, { x: -18, y: -18, size: 64, tone: 'red', at: at + 0.1 }) : null;
    const tp = T.tape(pp.el, { x: w / 2 - 60, y: -20, w: 120, rot: 3, tone: 'clear', at: at + 0.2 });
    return { el: pp.el, h: hh, render(lt) { pp.render(lt); if (np) np.render(lt); tp.render(lt); } };
  };

  // 요청문 한 장: 참가자가 복사해 보낼 글을 크림 종이에 크게(기본 50px) 쓴다. 종이는 y 200~980 사이 세로 가운데. '[' 로 시작해 ']' 로 끝나는 줄은 채워 넣을 칸(점선 테두리)으로 한 줄에 이어 놓는다.
  // o: { text, label(기본 「보낼 요청문」), where(종이 아래쪽 안내 한 줄, 40px), whereHtml, x, y, w, size, minH, center, at, rot } → { el, x, y, w, h, render }
  // o.whereHtml: where 를 HTML 로 준다(파일 이름·기호를 THEME.mono 조각으로 쓸 때). o.center: minH 로 종이가 글보다 높으면 남는 높이를 글 위와 아래쪽 줄 위에 반씩 나눈다
  T.promptSheet = (parent, o = {}) => {
    const w = o.w ?? 1480, PX = 70, PY = 72, size = o.size ?? 50, at = o.at ?? 0.3;
    const col = measureBox(parent, w - PX * 2);
    String(o.text || '').split('\n').forEach(t => {
      if (!t.trim()) { line(col, '', { height: px(size * 0.5) }); return; }
      const slot = /^\[.*\]$/.test(t.trim());
      line(col, esc(t), slot ? { display: 'inline-block', fontSize: px(size * 0.9), fontWeight: 700, lineHeight: 1.3, padding: '6px 16px', margin: '8px 14px 8px 0', border: '3px dashed rgba(30,22,16,.5)' }
        : { fontSize: px(size), fontWeight: 500, lineHeight: 1.5, textWrap: 'pretty' });   // 마지막 줄에 낱말 하나만 남지 않게
    });
    const wh = (o.where || o.whereHtml) ? line(col, o.whereHtml ?? esc(o.where), { fontSize: '40px', fontWeight: 700, color: C.dim, marginTop: '26px', paddingTop: '18px', borderTop: '3px dashed rgba(30,22,16,.25)' }) : null;
    const hh = Math.max(o.minH ?? 0, Math.ceil(PY * 2 + col.offsetHeight));
    const spare = hh - PY * 2 - col.offsetHeight;
    if (o.center && spare > 0) {                             // 글은 위 빈 자리의 가운데, 아래쪽 줄은 종이 아래쪽으로
      css(col.firstElementChild, { marginTop: px(spare / 2) });
      if (wh) css(wh, { marginTop: px(26 + spare / 2) });
    }
    const x = o.x ?? Math.round((1920 - w) / 2), y = o.y ?? Math.max(300, Math.round(200 + (780 - hh) / 2));   // 300 위로 올리면 이름표가 단계 표시 줄을 덮는다
    if (y + hh > 1050) console.warn(`[DECK] 요청문 종이가 화면 아래로 넘친다(${y + hh}px)`);
    const pp = T.paper(parent, { x, y, w, h: hh, tone: 'cream', rot: o.rot ?? 0, at, seed: 3.9 });   // 따라 입력할 글은 기울이지 않는다(7절 3번)
    pp.inner.appendChild(col); css(col, { left: px(PX), top: px(PY) });
    const tg = T.tag(pp.el, o.label ?? '보낼 요청문', { x: PX - 16, y: -28, size: 34, at: at + 0.15 });
    const tp = T.tape(pp.el, { x: w - 220, y: -22, w: 150, rot: 4, at: at + 0.25 });
    return { el: pp.el, x, y, w, h: hh, render(lt) { pp.render(lt); tg.render(lt); tp.render(lt); T.lift(col, lt, at + 0.2, { shadow: false, dur: 0.4, from: 1.02 }); } };
  };

  // 기대 결과 한 가지: 초록 종이에 결과를 크게 쓴다. num: true 면 Anton(기본 180px), 아니면 Black Han Sans(기본 124px). 종이는 y 300 에서 980 까지, 글은 세로 가운데.
  // o: { label(기본 「기대 결과」), value(HTML), num, size, detail(44px), x, y, w, h, minH, tone('green'), at, revealAt, rot } → { el, x, y, w, h, render }
  T.result = (parent, o = {}) => {
    const w = o.w ?? 1100, tone = o.tone || 'green', PX = 64, PY = 72, at = o.at ?? 0.4, rot = o.rot ?? 0.8, ink = TONE_INK[tone];
    const col = measureBox(parent, w - PX * 2, { color: ink });
    const v = line(col, o.value || '', o.num ? { fontFamily: 'var(--num)', fontSize: px(o.size ?? 180), lineHeight: 1.05 }
      : { fontFamily: 'var(--display)', fontSize: px(o.size ?? 124), lineHeight: 1.2, textWrap: 'balance' });
    const d = o.detail ? line(col, o.detail, { fontSize: px(o.detailSize ?? 44), lineHeight: 1.45, marginTop: '30px' }) : null;
    const x = o.x ?? Math.round((1920 - w) / 2), y = o.y ?? 300;
    const hh = o.h ?? Math.max(o.minH ?? 980 - y, Math.ceil(PY * 2 + col.offsetHeight));
    const pp = T.paper(parent, { x, y, w, h: hh, tone, rot, at, seed: 4.2 });
    pp.inner.appendChild(col); css(col, { left: px(PX), top: px(Math.max(PY, Math.round((hh - col.offsetHeight) / 2))) });
    if (col.offsetHeight > hh - PY) { console.warn(`[DECK] 기대 결과 종이 글자가 넘친다: ${String(o.value).replace(/<[^>]+>/g, ' ')}`); pp.el.style.outline = '6px dashed #FF00AA'; }
    const a0 = o.revealAt ?? at;
    const tg = T.tag(pp.el, o.label ?? '기대 결과', { x: PX - 16, y: -28, size: 34, at: a0 + 0.15 });
    return { el: pp.el, x, y, w, h: hh, render(lt) {
      if (o.revealAt != null) revealLift(pp, lt, a0, rot); else pp.render(lt);
      tg.render(lt);
      T.lift(v, lt, a0 + 0.15, { shadow: false, dur: 0.4, from: 1.1 });
      if (d) T.lift(d, lt, a0 + 0.3, { shadow: false, dur: 0.35 });
    } };
  };

  // 채점 기준: 기준 한 줄마다 크림 띠 한 장과 번호 조각(레몬, Anton). 두 줄짜리 기준 셋과 한 줄 하나면 y 290 에서 약 990 까지. o: { items:[HTML], x, y(290), w(1160), size(44), gap(22), at, each(0.15), numTone } → { bottom, render }
  T.checklist = (parent, o = {}) => {
    const x = o.x ?? 120, w = o.w ?? 1160, size = o.size ?? 44, gap = o.gap ?? 22, at = o.at ?? 0.3, each = o.each ?? 0.15, PX = 40, NX = 130, PY = 24;
    let y = o.y ?? 290;
    const rows = (o.items || []).map((t, i) => {
      const col = measureBox(parent, w - NX - PX);
      line(col, t, { fontSize: px(size), fontWeight: 600, lineHeight: 1.32, textWrap: 'balance' });
      const hh = Math.max(140, Math.ceil(PY * 2 + col.offsetHeight));
      const pp = T.paper(parent, { x: x + (i % 2 ? 14 : 0), y, w, h: hh, tone: 'cream', torn: 'right', rot: i % 2 ? 0.4 : -0.4, at: at + i * each, seed: 6.1 + i, k: 0.8 });
      pp.inner.appendChild(col); css(col, { left: px(NX), top: px(Math.round((hh - col.offsetHeight) / 2)) });
      const np = numPiece(pp.el, i + 1, { x: 20, y: Math.round((hh - 86) / 2), size: 80, tone: o.numTone || 'lemon', at: at + i * each + 0.1, rot: -4 });
      y += hh + gap;
      return { pp, np };
    });
    if (y - gap > 1050) console.warn(`[DECK] 채점 기준이 화면 아래로 넘친다(${y - gap}px)`);
    return { bottom: y - gap, render(lt) { rows.forEach(r => { r.pp.render(lt); r.np.render(lt); }); } };
  };

  // 순서 조각: 종이 조각을 왼쪽에서 오른쪽으로 차례로 놓는다. 화살표 없이 번호와 놓는 순서로 차례를 보인다.
  // o: { items:[{ title, body }], x, y(300), w, h(660, 엇갈림 20 을 더해 980 까지), gap, at, each(0.2), on(지금 단계 번호: 주홍), done(끝난 단계 수: 초록), titleSize(66), bodySize(44) } → { render }
  T.sequence = (parent, o = {}) => {
    const items = o.items || [], n = Math.max(1, items.length), x = o.x ?? 120, y = o.y ?? 300, W = o.w ?? 1680, gap = o.gap ?? 36, hh = o.h ?? 660,
      at = o.at ?? 0.3, each = o.each ?? 0.2, PX = 38, w = Math.floor((W - gap * (n - 1)) / n);
    const parts = items.map((d, i) => {
      const k = i + 1, tone = k === o.on ? 'red' : (o.done && k <= o.done) ? 'green' : 'lemon';
      const pp = T.paper(parent, { x: x + i * (w + gap), y: y + (i % 2 ? 20 : 0), w, h: hh, tone: 'cream', rot: [-1.2, 0.8, -0.5, 1.1, -0.9][i % 5], at: at + i * each, pad: PX, seed: 7.3 + i });
      const flow = h('div', '', pp.inner); css(flow, { position: 'relative', marginTop: '96px' });
      if (d.title) line(flow, d.title, { fontSize: px(o.titleSize ?? 66), fontWeight: 700, lineHeight: 1.18, textWrap: 'balance' });
      if (d.body) line(flow, d.body, { fontSize: px(o.bodySize ?? 44), lineHeight: 1.42, marginTop: '22px', color: C.dim, textWrap: 'balance' });
      css(flow, { marginTop: px(Math.max(96, Math.round((hh - PX * 2 - flow.offsetHeight) / 2))) });   // 글을 조각 세로 가운데에(번호 조각 아래 96px 은 비운다)
      overflowMark(pp, flow, hh - PX + 2, d.title);
      return { pp, np: numPiece(pp.el, k, { x: -16, y: -24, size: 84, tone, at: at + i * each + 0.1 }) };
    });
    return { render(lt) { parts.forEach(p => { p.pp.render(lt); p.np.render(lt); }); } };
  };

  // 인물과 대사: 인물을 크게(기본 1.9배, 발끝 y 980) 놓고 옆에 대사 종이(76px, 700, 보조 줄 42px)를 붙인다. 꼬리 조각이 인물 쪽을 가리킨다.
  // o: { who, text('\n' 으로 줄), sub(36px), x, y, scale, bubble:{ x, y, w }, size, org, at } → { person, el, render }
  T.speech = (parent, o = {}) => {
    const sc = o.scale ?? 1.9, at = o.at ?? 0.2, x0 = o.x ?? 130, y0 = o.y ?? Math.round(980 - 360 * sc);
    const ps = T.person(parent, o.who || 'han', { x: x0, y: y0, scale: sc, at, org: o.org ?? true });
    const b = o.bubble || {}, bw = b.w ?? 1040, PX = 64, PY = 58;
    const col = measureBox(parent, bw - PX * 2);
    line(col, o.text || '', { fontSize: px(o.size ?? 76), fontWeight: 700, lineHeight: 1.28, whiteSpace: 'pre-line', textWrap: 'balance' });
    if (o.sub) line(col, o.sub, { fontSize: '42px', lineHeight: 1.42, marginTop: '26px', color: C.dim });
    const hh = Math.ceil(PY * 2 + col.offsetHeight), bx = b.x ?? x0 + Math.round(300 * sc) + 40, by = b.y ?? Math.max(200, y0 - 80);
    const pp = T.paper(parent, { x: bx, y: by, w: bw, h: hh, tone: 'cream', rot: -0.8, at: at + 0.3, seed: 2.9 });
    const tail = h('div', '', pp.el);
    css(tail, { position: 'absolute', left: '-50px', top: px(Math.min(hh - 80, 110)), width: '62px', height: '58px', background: C.cream, clipPath: 'polygon(100% 0, 100% 100%, 0 72%)' });
    pp.el.insertBefore(tail, pp.el.firstChild);
    pp.inner.appendChild(col); css(col, { left: px(PX), top: px(PY) });
    return { person: ps, el: pp.el, render(lt) { ps.render(lt); pp.render(lt); T.lift(col, lt, at + 0.45, { shadow: false, dur: 0.4 }); } };
  };

  // 카드 격자: 카드를 cols 열로 놓는다(제목 62px, 본문 44px, 여백 46px). 기본 자리는 y 300 에서 980 까지. 카드마다 THEME.card 의 인자(num, label, title, body, tone, numTone, photo, tape).
  // 카드는 layout 규칙을 쓴다(이름표 34px, 번호 조각이 이름표를 가리지 않는다).
  // 넘김 카드: 항목에 back(뒷면 HTML)을 주면 그 칸은 THEME.flip 이 된다. 앞면은 label·title·body 로 짠다. 뒷면 색은 backTone(기본 초록).
  //   o.flipAt 시각부터 o.flipEach(0.15초) 간격으로 차례로 넘어간다. 키 누름 한 번에 모두 넘길 때 steps 시각 + 0.1 을 준다.
  //   넘김 카드의 글은 세로 가운데에 둔다(o.faceAlign: 'top' 이면 위에서부터 쓰고, 번호 조각 옆 이름표를 56px 비킨다)
  // o: { items, cols, x, y, w, h(전체 높이), gap, at, each(0.15), titleSize, bodySize, flipAt, flipEach, faceAlign } → { cards, render }
  T.grid = (parent, o = {}) => {
    const items = o.items || [], cols = o.cols ?? Math.min(3, items.length || 1), rows = Math.ceil(items.length / cols);
    const x = o.x ?? 120, y = o.y ?? 300, W = o.w ?? 1680, H = o.h ?? 680, gap = o.gap ?? 40, at = o.at ?? 0.3, each = o.each ?? 0.15;
    const cw = Math.floor((W - gap * (cols - 1)) / cols), ch = Math.floor((H - gap * (rows - 1)) / rows);
    const TS = o.titleSize ?? 62, BS = o.bodySize ?? 44;
    const cards = items.map((d, i) => {
      const cx = x + (i % cols) * (cw + gap), cy = y + Math.floor(i / cols) * (ch + gap), rot = d.rot ?? [-0.9, 0.7, -0.4, 1, -0.7, 0.5][i % 6], a = at + i * each;
      if (d.back == null) return T.card(parent, Object.assign({ pad: 46, titleSize: TS, bodySize: BS, labelSize: 34, layout: true }, d, { x: cx, y: cy, w: cw, h: ch, rot, at: a }));
      const mid = (o.faceAlign ?? 'center') === 'center';
      const face = (lab, t, b) => (lab ? `<div class="p2-card-l" style="font-size:34px${d.num != null && !mid ? ';margin-left:56px' : ''}">${lab}</div>` : '') +
        (t ? `<div class="p2-card-t" style="font-size:${d.titleSize ?? TS}px">${t}</div>` : '') + (b ? `<div class="p2-card-b" style="font-size:${d.bodySize ?? BS}px">${b}</div>` : '');
      const box = html => mid ? `<div style="display:flex;flex-direction:column;justify-content:safe center;height:100%">${html}</div>` : html;
      const fl = T.flip(parent, box(d.front ?? face(d.label, d.title, d.body)), box(d.back), { x: cx, y: cy, w: cw, h: ch, rot, at: a, pad: 46,
        flipAt: (o.flipAt ?? at + 2) + i * (o.flipEach ?? 0.15), frontTone: d.tone || 'cream', backTone: d.backTone || 'green' });
      const np = d.num != null ? numPiece(fl.el, d.num, { x: -22, y: -26, size: 84, tone: d.numTone || 'lemon', at: a + 0.12 }) : null;
      return { el: fl.el, flip: fl, render(lt) { fl.render(lt); if (np) np.render(lt); } };
    });
    return { cards, render(lt) { cards.forEach(c => c.render(lt)); } };
  };

  // 표 한 장: 크림 종이에 머리 줄과 줄을 쓴다(줄이 세 줄 이하면 44px, 넘으면 36px). mark 번째 줄(0부터)은 레몬 바탕과 주홍 테이프로 짚는다.
  // 줄이 적어 종이가 y 980 에 못 미치면 줄 높이를 늘린다(o.fill: false 면 늘리지 않는다, o.h 로 높이를 정할 수 있다).
  // o: { cols:[머리 글], rows:[[칸 HTML]], widths:[비율] | 'auto', x, y(300), w, h, fill, size, headSize, pad:[위아래, 좌우], rowPad:[줄마다 위아래 여백], mark, tapeY(짚은 줄 위에서 테이프까지, 기본 8), label, at, rot }
  //   → { el, h, grid, cells, tape, render }
  // pad: 모든 칸의 여백(기본 [22, 24]). rowPad: 본문 줄마다 위아래 여백(null 이면 pad). 예: 채운 예 줄만 높게 [40, null]
  // 머리 글의 '\n' 은 줄 나눔 자리다. widths: 'auto' 면 칸마다 한 줄로 쓸 때의 폭을 재서 나누고, 표 폭에 다 들지 않으면
  //   '\n' 이 있는 머리 칸을 오른쪽 칸부터 접는다. 남는 폭은 칸마다 같게 더한다. 'auto' 가 아니면 '\n' 자리에서 늘 줄을 나눈다
  T.table = (parent, o = {}) => {
    const w = o.w ?? 1680, PX = 48, PY = 44, LT = o.label ? 26 : 0, size = o.size ?? ((o.rows || []).length <= 3 ? 44 : 36), at = o.at ?? 0.3, cols = o.cols || [];
    const [pv, ph] = o.pad || [22, 24], auto = o.widths === 'auto', NC = cols.length;
    const col = measureBox(parent, w - PX * 2);
    const g = h('div', '', col);
    css(g, { position: 'relative', display: 'grid', gridTemplateColumns: (auto ? cols.map(() => 1) : (o.widths || cols.map(() => 1))).map(v => v + 'fr').join(' '), borderTop: '3px solid rgba(30,22,16,.55)' });
    const cell = (html, st) => {                           // 칸 안 글은 안쪽 div 하나에 넣는다(칸을 세로 가운데로 맞춰도 줄 안 글자가 흩어지지 않게)
      const c = h('div', '', g); css(c, Object.assign({ display: 'flex', alignItems: 'center', padding: `${pv}px ${ph}px`, borderBottom: '2px solid rgba(30,22,16,.2)', fontSize: px(size), lineHeight: 1.38 }, st));
      css(h('div', '', c, html), { position: 'relative' }); return c; };
    const headHtml = (t, fold) => String(t).split('\n').map(esc).join(fold ? '<br>' : ' ');
    const heads = cols.map(t => cell(headHtml(t, !auto), { fontWeight: 700, fontSize: px(o.headSize ?? Math.max(34, size - 6)), color: C.dim, borderBottom: '3px solid rgba(30,22,16,.55)' }));
    const marked = [];
    (o.rows || []).forEach((r, ri) => r.forEach((t, ci) => {
      const rp = (o.rowPad || [])[ri];
      const c = cell(t, Object.assign(ci === 0 ? { fontWeight: 700 } : {}, rp != null ? { paddingTop: px(rp), paddingBottom: px(rp) } : {}));
      if (ri === o.mark) marked.push(c);
    }));
    marked.forEach(c => css(c, { background: 'rgba(242,207,74,.5)' }));
    const cells = [...g.children];
    if (auto && NC) {                                      // 칸 폭: 한 줄로 쓸 때의 폭 → 넘치면 머리 칸을 오른쪽부터 접는다 → 남는 폭을 나눈다
      cells.forEach(c => css(c.firstElementChild, { whiteSpace: 'nowrap' }));
      const need = () => [...Array(NC)].map((_, i) => Math.max(...cells.filter((c, k) => k % NC === i).map(c => c.firstElementChild.offsetWidth)) + 2 * ph + 2);
      const avail = w - PX * 2;
      for (let k = NC - 1; k >= 0; k--) {
        if (need().reduce((a, b) => a + b, 0) <= avail) break;
        if (String(cols[k]).includes('\n')) heads[k].firstElementChild.innerHTML = headHtml(cols[k], true);
      }
      const nw = need(), extra = Math.max(0, avail - nw.reduce((a, b) => a + b, 0));
      if (nw.reduce((a, b) => a + b, 0) > avail) console.warn(`[DECK] 표 칸이 표 폭보다 넓다(${Math.round(nw.reduce((a, b) => a + b, 0) - avail)}px)`);
      css(g, { gridTemplateColumns: nw.map(v => px(v + extra / NC)).join(' ') });
      cells.slice(NC).forEach(c => css(c.firstElementChild, { whiteSpace: 'normal' }));
    }
    const x = o.x ?? 120, y = o.y ?? 300, target = o.h ?? (o.fill === false ? 0 : 980 - y);
    if (PY * 2 + LT + col.offsetHeight < target)            // 줄이 적으면 줄 높이를 늘려 종이가 y 980 까지 닿게 한다
      css(g, { height: px(target - PY * 2 - LT), gridTemplateRows: `auto repeat(${(o.rows || []).length}, 1fr)` });
    const hh = Math.ceil(PY * 2 + LT + col.offsetHeight);
    if (y + hh > 1050) console.warn(`[DECK] 표가 화면 아래로 넘친다(${y + hh}px)`);
    const pp = T.paper(parent, { x, y, w, h: hh, tone: 'cream', rot: o.rot ?? -0.3, at, seed: 5.1 });
    pp.inner.appendChild(col); css(col, { left: px(PX), top: px(PY + LT) });
    const tg = o.label ? T.tag(pp.el, o.label, { x: PX - 16, y: -28, at: at + 0.15 }) : null;
    const tp = marked.length ? T.tape(pp.el, { x: -34, y: PY + LT + marked[0].offsetTop + (o.tapeY ?? 8), w: 110, rot: -6, tone: 'red', at: at + 0.6 }) : null;
    return { el: pp.el, h: hh, grid: g, cells, tape: tp ? tp.el : null, render(lt) { pp.render(lt); if (tg) tg.render(lt); if (tp) tp.render(lt); } };
  };

  // 손들기: 묻는 말을 크게 쓰고, 키를 누르면 오른쪽 카드가 넘어가 답을 보인다(THEME.flip).
  // o: { question, prompt(이름표, 기본 없음. 빈 문자열·null 이면 이름표를 만들지 않는다), front(앞면 글, 기본 없음. 비면 앞면은 종이 무늬만 둔다), answer(뒷면 HTML), x, y(300), w, h(680), size(100), answerW, at, revealAt,
  //      note(물음 종이 아래쪽 줄, 40px 흐린 글), frontTone, backTone, grow, ... } → { flip, render }
  // o.grow: 답 카드가 넘어가며 가운데로 커지고 물음 종이는 좁아져 왼쪽으로 물러난다(ch06 s06). 이때 기본 앞면은 어두운 종이, 뒷면은 흰 종이다.
  //   answer 안에 class="p2-fit" 요소(큰 숫자)가 있으면 카드 폭에 맞춰 fitSize(300)에서 10px 씩 fitMin(200)까지 줄인다.
  //   wrap: true 면 물음을 접어 쓴다(보기 여러 줄을 본문 서체로 쓸 때, font: 'body'). 아니면 줄마다 한 줄로 쓰고 종이 폭에 맞춰 글자를 줄인다
  T.handsUp = (parent, o = {}) => {
    if (o.grow) return handsUpGrow(parent, o);
    const at = o.at ?? 0.3, x = o.x ?? 120, y = o.y ?? 300, w = o.w ?? 1000, hh = o.h ?? 680, PX = 60;
    const pp = T.paper(parent, { x, y, w, h: hh, tone: 'cream', rot: -0.8, at, pad: PX, seed: 1.9 });
    const flow = h('div', '', pp.inner); css(flow, { position: 'relative' });
    line(flow, o.question || '', { fontFamily: 'var(--display)', fontSize: px(o.size ?? 100), lineHeight: 1.24, whiteSpace: 'pre-line', textWrap: 'balance' });
    const nt = o.note ? line(pp.inner, o.note, { position: 'absolute', left: px(PX), right: px(PX - 10), bottom: '54px', fontSize: '40px', fontWeight: 500, lineHeight: 1.3, color: C.dim, wordBreak: 'keep-all', textWrap: 'balance' }) : null;
    const NB = nt ? nt.offsetHeight + 54 + 24 - PX : 0;      // 아래쪽 줄이 있으면 그 위의 빈 자리에서 가운데
    css(flow, { marginTop: px(Math.max(30, Math.round((hh - PX * 2 - NB - flow.offsetHeight) / 2))) });
    overflowMark(pp, flow, hh - PX - NB + 2, o.question);
    const tg = o.prompt ? T.tag(pp.el, o.prompt, { x: PX - 16, y: -28, size: 36, at: at + 0.2 }) : null;
    const ax = x + w + 60, aw = o.answerW ?? 1800 - ax;
    const fl = T.flip(parent, o.front ? `<div class="p2-card-t" style="font-size:52px">${esc(o.front)}</div>` : '', o.answer || '',
      { x: ax, y: y + 20, w: aw, h: hh - 40, at: at + 0.4, flipAt: o.revealAt ?? at + 2, rot: 1.2, pad: 44, frontTone: o.frontTone, backTone: o.backTone });
    return { flip: fl, render(lt) { pp.render(lt); if (tg) tg.render(lt); if (nt) T.lift(nt, lt, at + 0.3, { shadow: false, dur: 0.4 }); fl.render(lt); } };
  };

  // 손들기(grow): ch06 s06 의 장면 코드를 부품으로 옮겼다. 넘기기 전 답 카드는 넘긴 뒤 크기의 카드를 줄여(scale) 오른쪽 폭 620 자리에 둔다
  function handsUpGrow(parent, o) {
    const at = o.at ?? 0.3, RV = o.revealAt ?? at + 2, QX = o.x ?? 120, QY = o.y ?? 300, QH = o.h ?? 680, QP = 60, Q0 = o.w ?? 1000, S = o.size ?? 100;
    const RIGHT = o.right ?? 1800, PAD = o.pad ?? 48, FW = o.frontW ?? 620;
    const qp = T.paper(parent, { x: QX, y: QY, w: Q0, h: QH, tone: 'cream', at, seed: 1.9 });
    const wrap = !!o.wrap, body = (o.font ?? (wrap ? 'body' : 'display')) === 'body';
    const qx = h('div', '', qp.inner, String(o.question || '').replace(/\n/g, '<br>'));
    css(qx, { position: 'absolute', left: px(QP), fontFamily: body ? 'var(--body)' : 'var(--display)', fontWeight: body ? 700 : 400, fontSize: px(S), lineHeight: body ? 1.36 : 1.24,
      color: C.ink, wordBreak: 'keep-all', whiteSpace: wrap ? 'normal' : 'nowrap', width: wrap ? px(Q0 - 2 * QP) : 'auto' });
    const nt = o.note ? h('div', '', qp.inner, o.note) : null;
    if (nt) css(nt, { position: 'absolute', left: px(QP), right: px(QP - 10), bottom: '54px', fontSize: '40px', fontWeight: 500, lineHeight: 1.3, color: C.dim, wordBreak: 'keep-all', textWrap: 'balance' });
    const qt = o.prompt ? T.tag(qp.el, o.prompt, { x: 20, y: -28, size: 36, at: at + 0.2 }) : null;
    // 넘긴 뒤 자리: 카드는 이름표 오른쪽 끝 뒤에서 시작해 RIGHT 까지, 물음 종이는 카드 왼쪽 40px 앞까지
    const CX = o.cardX ?? Math.min(900, Math.max(800, QX + 20 + (qt ? qt.w : 0) + 24)), CW = RIGHT - CX, Q1 = CX - 40 - QX;
    const q0w = qx.offsetWidth;
    const QS1 = wrap ? Math.round(S * Math.max(0.84, Math.min(1, (Q1 - 2 * QP) / (Q0 - 2 * QP)))) : Math.min(Math.round(S * 0.84), Math.floor(S * (Q1 - 2 * QP) / q0w));
    // 물음 높이를 넘기기 전·뒤 크기에서 재 둔다(세로 가운데를 잡으려고)
    const NB = nt ? nt.offsetHeight + 54 + 24 : 0, h0 = qx.offsetHeight;
    css(qx, { fontSize: px(QS1) }); if (wrap) css(qx, { width: px(Q1 - 2 * QP) });
    const h1 = qx.offsetHeight;
    css(qx, { fontSize: px(S) }); if (wrap) css(qx, { width: px(Q0 - 2 * QP) });
    const top0 = Math.round((QH - NB - h0) / 2), top1 = Math.round((QH - NB - h1) / 2);
    if (h0 > QH - NB - 40) { console.warn(`[DECK] 손들기 물음이 종이보다 길다: ${String(o.question).replace(/<[^>]+>/g, ' ').slice(0, 30)}`); qp.el.style.outline = '6px dashed #FF00AA'; }
    // 답 카드: 뒷면을 넘긴 뒤 크기로 짜고, 넘기기 전에는 같은 카드를 줄여(scale) 오른쪽에 둔다
    const pos = h('div', '', parent); css(pos, { position: 'absolute', left: px(CX), top: '0', width: px(CW), height: '0', transformOrigin: '0 0', zIndex: 3 });
    const card = h('div', '', pos); css(card, { position: 'absolute', inset: '0' });
    const inn = h('div', 'p2-flip-in', card);
    const fr = h('div', `p2-flip-f p2-${o.frontTone || 'dark'} p2-grain`, inn), bk = h('div', `p2-flip-f p2-${o.backTone || 'white'} p2-grain`, inn);
    css(bk, { padding: px(PAD) });
    const bw = h('div', '', bk, o.answer || ''); css(bw, { position: 'relative', wordBreak: 'keep-all' });
    const IW = CW - 2 * PAD, MAXH = o.maxH ?? 730;
    const fits = [...bw.querySelectorAll('.p2-fit')];
    fits.forEach(f => {
      let ns = o.fitSize ?? 300; css(f, { fontSize: px(ns), display: 'inline-block', whiteSpace: 'nowrap' });
      while ((f.offsetWidth > IW - 4 || bw.offsetHeight + 2 * PAD > MAXH) && ns > (o.fitMin ?? 200)) { ns -= 10; css(f, { fontSize: px(ns) }); }
    });
    const CH = Math.ceil(bw.offsetHeight + 2 * PAD), CY = clamp(Math.round(QY + QH / 2 - CH / 2), 270, 1000 - CH);
    css(pos, { top: px(CY), height: px(CH) });
    const S0 = FW / CW, X0 = QX + Q0 + 60, Y0 = Math.round(QY + (QH - CH * S0) / 2);
    css(fr, { display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: px(PAD) });
    const ft = o.front ? h('div', '', fr, esc(o.front)) : null;
    if (ft) css(ft, { fontSize: px(Math.round((o.frontSize ?? 60) / S0)), fontWeight: 700, lineHeight: 1.25, color: TONE_INK[o.frontTone || 'dark'], wordBreak: 'keep-all' });
    return { el: pos, card, back: bk, paper: qp, render(lt) {
      const a = prog(lt, RV, 0.8, ease.inOutCubic);           // 자리와 크기
      const p = prog(lt, RV + 0.05, 0.62, ease.inOutCubic);   // 세로축 넘김
      // 물음 종이: 폭과 글자가 줄고 조금 더 기울어 뒤로 물러난다
      R.set(qp.el, 'width', px(lerp(Q0, Q1, a)));
      R.set(qx, 'fontSize', px(lerp(S, QS1, a))); if (wrap) R.set(qx, 'width', px(lerp(Q0, Q1, a) - 2 * QP));
      R.set(qx, 'top', px(lerp(top0, top1, a)));
      T.lift(qp.el, lt, at, { rot: lerp(-0.8, -1.8, a), shadowEl: qp.face, k: lerp(1, 0.5, a) });
      if (qt) qt.render(lt);
      if (nt) T.lift(nt, lt, at + 0.3, { shadow: false, dur: 0.4 });
      // 답 카드: 오른쪽 작은 자리에서 가운데 큰 자리로 옮기며 넘긴다
      const sc = lerp(S0, 1, a), xx = lerp(X0, CX, a), yy = lerp(Y0, CY, a) - 60 * Math.sin(Math.PI * a);
      R.set(pos, 'transform', `translate(${(xx - CX).toFixed(1)}px, ${(yy - CY).toFixed(1)}px) scale(${sc.toFixed(4)})`);
      const p0 = T.lift(card, lt, at + 0.4, { rot: lerp(1.2, -0.6, a), shadow: false });
      R.set(inn, 'boxShadow', boxSh(Math.min(p0, 1 - 0.85 * Math.sin(Math.PI * p)), 1.5));
      if (p <= 0 || p >= 1) {
        R.set(card, 'perspective', 'none'); R.set(inn, 'transformStyle', 'flat'); R.set(inn, 'transform', 'none');
        R.set(fr, 'display', p >= 1 ? 'none' : 'flex'); R.set(bk, 'display', p >= 1 ? '' : 'none'); R.set(bk, 'transform', 'none');
      } else {
        R.set(card, 'perspective', '2600px'); R.set(inn, 'transformStyle', 'preserve-3d');
        R.set(inn, 'transform', `rotateY(${(180 * p).toFixed(2)}deg) scale(${(1 + 0.1 * Math.sin(Math.PI * p)).toFixed(4)})`);
        R.set(fr, 'display', 'flex'); R.set(bk, 'display', ''); R.set(bk, 'transform', 'rotateY(180deg)');
      }
      fits.forEach(f => T.lift(f, lt, RV + 0.55, { shadow: false, dur: 0.45, from: 1.18 }));
    } };
  }

  // 판정 순서: 위에서부터 차례로 묻는 줄. 줄마다 물음(40px)과 오른쪽 끝의 답 조각(Black Han Sans 52px). 위 줄에 해당하지 않으면 다음 줄을 본다.
  // o: { rows:[{ q, a, tone }], x, y(300), w, aw(답 조각 너비 400), gap(44), size(52), aSize(76), at, each(0.25) } → { bottom, render }  세 줄이면 y 300 에서 980 안쪽까지
  T.decide = (parent, o = {}) => {
    const x = o.x ?? 120, w = o.w ?? 1680, aw = o.aw ?? 400, gap = o.gap ?? 44, at = o.at ?? 0.3, each = o.each ?? 0.25, PX = 50, PY = 34;
    let y = o.y ?? 300;
    const rows = (o.rows || []).map((r, i) => {
      const col = measureBox(parent, w - aw - PX * 2);
      line(col, r.q || '', { fontSize: px(o.size ?? 52), fontWeight: 600, lineHeight: 1.32 });
      const hh = Math.max(190, Math.ceil(PY * 2 + col.offsetHeight)), qw = w - aw + 40, tone = r.tone || 'lemon';
      const pp = T.paper(parent, { x, y, w: qw, h: hh, tone: 'cream', rot: i % 2 ? 0.3 : -0.3, at: at + i * each, seed: 4.4 + i });
      pp.inner.appendChild(col); css(col, { left: px(PX), top: px(Math.round((hh - col.offsetHeight) / 2)) });
      const ap = T.paper(parent, { x: x + w - aw, y: y + Math.round((hh - 140) / 2), w: aw, h: 140, tone, torn: 'left right', rot: i % 2 ? 1.5 : -2, at: at + i * each + 0.15, k: 0.7, seed: 8.8 + i });
      const ax = h('div', '', ap.inner, esc(r.a || ''));
      css(ax, { position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--display)', fontSize: px(o.aSize ?? 76), color: TONE_INK[tone] });
      y += hh + gap;
      return { pp, ap };
    });
    if (y - gap > 1050) console.warn(`[DECK] 판정 순서가 화면 아래로 넘친다(${y - gap}px)`);
    return { bottom: y - gap, render(lt) { rows.forEach(r => { r.pp.render(lt); r.ap.render(lt); }); } };
  };
})();
