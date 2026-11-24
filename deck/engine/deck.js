/* deck.js — showreel 엔진(reel-engine.js) 위에서 슬라이드 한 장을 장면 하나로 올린다.
 *
 * 한 페이지(chNN.html)가 챕터 하나다. 슬라이드는 등록한 순서대로 하나의 타임라인에 이어 붙는다.
 *   슬라이드 i 의 구간 = [start_i, start_i + dur_i + TAIL). TAIL(2초) 동안은 끝 상태를 유지한다.
 * 그래서 같은 페이지가 두 가지로 쓰인다.
 *   발표 모드(기본)     : 키를 누를 때마다 슬라이드 안 시간(lt)을 0 → 다음 멈춤 지점까지 재생한다.
 *   렌더 모드(?render=1): showreel 렌더러·shoot.mjs 가 window.__seek(t) 로 임의 시각을 찍는다(검수 스틸, 영상 내보내기).
 *
 * 규약
 *   DECK.config({ part: 'p1', chapter: 'ch01', title: '챕터 제목' })
 *   DECK.slide({ id, dur, steps, notes, setup(el), render(lt, ctx) })
 *       id      'p1-ch01-s03' (원고의 슬라이드 id 와 같아야 한다)
 *       dur     등장 애니메이션이 끝나는 시각(초, 기본 6). 이 뒤로는 끝 상태를 유지한다
 *       steps   [2.5, 5] 처럼 lt 가 멈추는 지점. 다음 키를 누르면 이어서 재생한다. 없으면 dur 까지 한 번에 재생
 *       notes   강사 메모(N 키로 본다)
 *       setup(el)        한 번 호출. el 은 1920×1080 <section>. this 에 요소를 저장한다
 *       render(lt, ctx)  매 프레임. lt = 슬라이드 안 시간(멈춤 지점에서 멈춘다),
 *                        ctx = { dur, p, amb, live }. amb 는 멈추지 않고 흐르는 시간(배경의 반복 움직임에만 쓴다)
 *   DECK.video(parent, src, { poster, loop, muted, fit, style })   슬라이드에 들어올 때 재생, 나갈 때 정지. 렌더 모드에서는 poster 를 보여 준다
 *   DECK.slides / DECK.state / DECK.go(i) / DECK.next() / DECK.prev()
 *
 * 키: → Space PageDown Enter 다음 · ← PageUp Backspace 이전 · Home End · F 전체 화면 · R 이 슬라이드 다시 · N 메모 · B 검은 화면 · 숫자+Enter 이동
 * 주소: chNN.html?s=3 | ?s=p1-ch01-s03 | ?s=last
 *
 * 장면 코드 규칙은 showreel 과 같다: 화면은 lt 와 amb 의 순수 함수다. Math.random, Date.now, CSS transition·animation,
 * 이전 프레임 값에 기대는 계산을 쓰지 않는다. 무작위는 REEL.rand(i, salt), 흔들림은 REEL.noise(t, seed).
 */
(function () {
  'use strict';
  const R = window.REEL;
  if (!R) throw new Error('[DECK] reel-engine.js 를 deck.js 보다 먼저 불러온다');
  const { clamp, h, css } = R;
  const Q = new URLSearchParams(location.search);
  const RENDER = Q.has('render');
  const TAIL = 2;
  const cfg = { part: '', chapter: '', title: '', width: 1920, height: 1080, fps: 30 };
  const slides = [];
  const st = { i: 0, lt: 0, amb: 0, target: 0, playing: false, step: 0 };
  let T = 0;

  R.config({ width: cfg.width, height: cfg.height, fps: cfg.fps, duration: 1 });

  function config(o) {
    Object.assign(cfg, o);
    R.config({ width: cfg.width, height: cfg.height, fps: cfg.fps });
    if (cfg.title) document.title = `${cfg.part.toUpperCase()} ${cfg.chapter} · ${cfg.title}`;
  }

  function slide(def) {
    const d = Object.assign({ dur: 6, steps: [], notes: '' }, def);
    if (!d.id) throw new Error('[DECK] slide: id 가 없다');
    if (slides.some(x => x.id === d.id)) throw new Error('[DECK] slide: id 중복 ' + d.id);
    d.steps = (d.steps || []).filter(x => x > 0 && x < d.dur).sort((a, b) => a - b);
    d.index = slides.length;
    d._videos = [];
    d._start = T;
    T += d.dur + TAIL;
    R.scene({
      id: d.id, start: d._start, end: T,
      setup(el) { d.el = el; el.dataset.slide = d.id; return d.setup ? d.setup.call(d, el) : null; },
      render(lt) {
        if (d.render) d.render.call(d, lt, { dur: d.dur, p: clamp(lt / d.dur), amb: RENDER ? lt : st.amb, live: !RENDER });
      },
    });
    slides.push(d);
    R.config({ duration: T });
    return d;
  }

  // 영상: 발표 모드에서는 <video>, 렌더 모드에서는 poster 이미지(스틸 검수가 영상 디코딩을 기다리지 않게)
  function video(parent, src, o = {}) {
    const host = parent.closest('[data-slide]');
    const d = slides.find(x => host && x.id === host.dataset.slide);
    const base = { position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: o.fit || 'cover' };
    if (RENDER) {
      if (!o.poster) { console.warn('[REEL] poster 없는 영상:', src); return h('div', 'deck-video', parent); }
      const im = R.img(o.poster);
      im.className = 'deck-video';
      parent.appendChild(im);
      return css(im, Object.assign(base, o.style || {}));
    }
    const v = h('video', 'deck-video', parent);
    Object.assign(v, { src, loop: o.loop !== false, muted: o.muted !== false, playsInline: true, preload: 'auto' });
    if (o.poster) v.poster = o.poster;
    css(v, Object.assign(base, o.style || {}));
    if (d) d._videos.push(v);
    return v;
  }

  // ── 발표 모드 ──
  let ui = null, numBuf = '';
  const paint = () => window.__seek(slides[st.i]._start + st.lt);
  const enter = d => d._videos.forEach(v => { try { v.currentTime = 0; } catch (e) { /* 아직 메타데이터가 없다 */ } v.play().catch(() => null); });
  const leave = d => d._videos.forEach(v => v.pause());

  function go(i, atEnd) {
    i = clamp(i, 0, slides.length - 1);
    if (slides[st.i]) leave(slides[st.i]);
    const d = slides[i];
    st.i = i; st.amb = 0;
    st.step = atEnd ? d.steps.length : 0;
    st.lt = atEnd ? d.dur : 0;
    st.target = atEnd ? d.dur : (d.steps[0] ?? d.dur);
    st.playing = !atEnd;
    enter(d); paint(); sync();
  }
  function next() {
    const d = slides[st.i];
    if (st.playing) { st.lt = st.target; st.playing = false; paint(); return; }   // 재생 중이면 그 단계의 끝으로 건너뛴다
    if (st.lt < d.dur - 1e-3) { st.step++; st.target = d.steps[st.step] ?? d.dur; st.playing = true; sync(); return; }
    if (st.i < slides.length - 1) go(st.i + 1); else chapterNav(1);
  }
  function prev() {
    const d = slides[st.i];
    if (st.step > 0) { st.step--; st.lt = st.target = d.steps[st.step]; st.playing = false; paint(); sync(); return; }
    if (st.i > 0) go(st.i - 1, true); else chapterNav(-1);
  }
  function flatChapters() {
    const m = window.DECK_MANIFEST;
    return m && m.parts ? m.parts.flatMap(p => (p.chapters || []).map(c => Object.assign({ part: p.id }, c))) : [];
  }
  function chapterNav(dir) {
    const flat = flatChapters();
    const k = flat.findIndex(c => c.part === cfg.part && c.id === cfg.chapter);
    const to = k < 0 ? null : flat[k + dir];
    if (to) location.href = '../' + to.file + (dir < 0 ? '?s=last' : '');
  }
  function pageNo() {
    const mine = flatChapters().filter(c => c.part === cfg.part);
    const k = mine.findIndex(c => c.id === cfg.chapter);
    if (k < 0) return [st.i + 1, slides.length];
    const before = mine.slice(0, k).reduce((a, c) => a + (c.slides || 0), 0);
    return [before + st.i + 1, mine.reduce((a, c) => a + (c.slides || 0), 0)];
  }
  function sync() {
    if (!ui) return;
    const [n, total] = pageNo();
    ui.no.textContent = `${n} / ${total}`;
    ui.bar.style.transform = `scaleX(${n / total})`;
    ui.notes.textContent = slides[st.i].notes || '(메모 없음)';
    try { history.replaceState(null, '', '#' + (st.i + 1)); } catch (e) { /* file:// 에서 막히면 무시 */ }
  }
  function fit() {
    const wrap = document.getElementById('wrap');
    const k = Math.min(innerWidth / cfg.width, innerHeight / cfg.height);
    wrap.style.transform = `translate(${(innerWidth - cfg.width * k) / 2}px, ${(innerHeight - cfg.height * k) / 2}px) scale(${k})`;
  }

  function present() {
    document.body.classList.add('deck-live');
    ui = {
      bar: h('div', 'deck-bar', document.body),
      no: h('div', 'deck-no', document.body),
      notes: h('div', 'deck-notes', document.body),
      black: h('div', 'deck-black', document.body),
    };
    fit();
    addEventListener('resize', fit);
    const s = Q.get('s') || (location.hash || '').slice(1);
    let i = 0, atEnd = false;
    if (s === 'last') { i = slides.length - 1; atEnd = true; }
    else if (/^\d+$/.test(s || '')) i = Number(s) - 1;
    else if (s) i = Math.max(0, slides.findIndex(x => x.id === s));
    go(i, atEnd);
    addEventListener('keydown', e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.code;
      if (/^(Digit|Numpad)\d$/.test(k)) { numBuf += k.slice(-1); return; }
      if (k === 'Enter' && numBuf) { go(Number(numBuf) - 1); numBuf = ''; return; }
      numBuf = '';
      if (['ArrowRight', 'Space', 'PageDown', 'Enter', 'ArrowDown'].includes(k)) { e.preventDefault(); next(); }
      else if (['ArrowLeft', 'PageUp', 'Backspace', 'ArrowUp'].includes(k)) { e.preventDefault(); prev(); }
      else if (k === 'Home') go(0);
      else if (k === 'End') go(slides.length - 1, true);
      else if (k === 'KeyR') go(st.i);
      else if (k === 'KeyF') { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen().catch(() => null); }
      else if (k === 'KeyN') document.body.classList.toggle('deck-show-notes');
      else if (k === 'KeyB' || k === 'Period') document.body.classList.toggle('deck-blackout');
    });
    document.getElementById('stage').addEventListener('click', e => { if (!e.target.closest('[data-interactive]')) next(); });
    let last = 0;
    const tick = now => {
      const dt = Math.min(0.1, last ? (now - last) / 1000 : 0);
      last = now;
      if (st.playing) { st.lt = Math.min(st.target, st.lt + dt); if (st.lt >= st.target) st.playing = false; }
      st.amb += dt;
      paint();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  addEventListener('load', () => {
    const wait = () => {
      if (!window.__ready) return setTimeout(wait, 30);
      // 검수 도구가 읽는 슬라이드 표
      window.__deck = { part: cfg.part, chapter: cfg.chapter, title: cfg.title, tail: TAIL,
        slides: slides.map(d => ({ id: d.id, start: d._start, dur: d.dur, steps: d.steps, notes: d.notes || '', videos: d._videos.length })) };
      if (!slides.length) { console.error('[DECK] 등록된 슬라이드가 없다'); return; }
      if (!RENDER) present();
    };
    wait();
  });

  window.DECK = { config, slide, video, slides, state: st, cfg, go, next, prev, RENDER, TAIL };
})();
