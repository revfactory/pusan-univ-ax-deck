/* kit.js — 테마와 무관한 슬라이드 부품. 모양은 deck.css 의 클래스와 테마 CSS 변수로 정한다.
 * 모든 부품은 setup 에서 만들고(KIT.x(parent, …) → 객체), render 에서 객체.render(lt) 를 부른다. 화면은 lt 의 순수 함수다.
 *
 *   KIT.rise(els, lt, start, each, o)            요소 배열을 차례로 올린다(o: dur, y, blur)
 *   KIT.lines(parent, ['a','b'], cls)            줄마다 div 를 만든다 → 요소 배열
 *   KIT.type(el, text, lt, start, cps, cursor)   타자 효과
 *   KIT.count(el, lt, start, dur, to, o)         숫자 카운트(o: decimals, prefix, suffix, from)
 *   KIT.draw(pathEl, p)                          SVG 선을 p(0~1)만큼 그린다(setup 에서 KIT.drawPrep(pathEl) 먼저)
 *   KIT.fit(el, maxW, maxH)                      글자 크기를 줄여 상자 안에 맞춘다(setup 에서만)
 *   KIT.cover(parent, src, style)                이미지를 미리 불러와 꽉 채운다
 *   KIT.frame(parent, 'browser'|'phone'|'window', { title, url, style })   → { el, body }
 *   KIT.chat(parent, msgs, o)                    대화창 시뮬레이션 → { el, render(lt), end }
 *        msgs: [{ who: 'user'|'ai'|'tool', text, name, gap }]  o: { start, cps, gap, think }
 *   KIT.terminal(parent, lines, o)               터미널 시뮬레이션 → { el, render(lt), end }
 *        lines: [{ cmd: 'npm run dev' } | { out: '결과 줄', cls: 'ok|warn|dim' }]  o: { start, cps, gap, prompt }
 *   end 는 그 부품의 마지막 움직임이 끝나는 시각(초)이다. 슬라이드 dur 를 end + 0.5 이상으로 잡는다.
 */
(function () {
  'use strict';
  const R = window.REEL;
  const { h, css, prog, ease, clamp, lerp, stagger } = R;
  const KIT = {};

  KIT.rise = (els, lt, start, each = 0.08, o = {}) => {
    els.forEach((el, i) => {
      const p = stagger(lt, start, each, o.dur ?? 0.6, i, o.ease || ease.snap);
      el.style.opacity = p.toFixed(3);
      el.style.transform = `translateY(${((1 - p) * (o.y ?? 40)).toFixed(1)}px)`;
      if (o.blur) el.style.filter = p < 0.98 ? `blur(${((1 - p) * o.blur).toFixed(1)}px)` : 'none';
    });
  };
  KIT.lines = (parent, items, cls) => items.map(t => h('div', cls || '', parent, t));

  KIT.type = (el, text, lt, start, cps = 28, cursor = true) => {
    const chars = [...text];
    const n = clamp(Math.floor((lt - start) * cps), 0, chars.length);
    const done = n >= chars.length;
    const blink = Math.floor(lt * 2.5) % 2 === 0;
    el.textContent = chars.slice(0, n).join('') + (cursor && lt >= start && (!done || blink) ? '▍' : '');
    return start + chars.length / cps;
  };

  KIT.count = (el, lt, start, dur, to, o = {}) => {
    const p = prog(lt, start, dur, o.ease || ease.outQuart);
    el.textContent = (o.prefix || '') + R.count(p, to, { decimals: o.decimals || 0, from: o.from || 0 }) + (o.suffix || '');
  };

  KIT.drawPrep = path => { const len = path.getTotalLength(); path.style.strokeDasharray = len; path._len = len; return len; };
  KIT.draw = (path, p) => { path.style.strokeDashoffset = (path._len || 0) * (1 - clamp(p)); };

  KIT.fit = (el, maxW, maxH) => {
    let size = parseFloat(getComputedStyle(el).fontSize);
    for (let i = 0; i < 40 && size > 20; i++) {
      if (el.scrollWidth <= maxW && (!maxH || el.scrollHeight <= maxH)) break;
      size *= 0.95;
      el.style.fontSize = size.toFixed(1) + 'px';
    }
    return size;
  };

  KIT.cover = (parent, src, style) => {
    const im = R.img(src);
    parent.appendChild(im);
    return css(im, Object.assign({ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }, style || {}));
  };

  KIT.frame = (parent, kind = 'browser', o = {}) => {
    const el = h('div', `kit-frame kit-${kind}`, parent);
    if (o.style) css(el, o.style);
    if (kind === 'phone') h('div', 'kit-notch', el);
    else {
      const bar = h('div', 'kit-bar', el);
      h('i', '', bar); h('i', '', bar); h('i', '', bar);
      h('span', 'kit-url', bar, o.url || o.title || '');
    }
    const body = h('div', 'kit-body', el);
    return { el, body };
  };

  // 대화창: 사용자 말풍선은 튀어 오르고, AI 말풍선은 '입력 중' 점 뒤에 글자가 흘러나온다.
  // 말풍선 높이는 setup 에서 재 두고, 넘치면 위로 밀어 올린다(이전 프레임에 기대지 않는다).
  KIT.chat = (parent, msgs, o = {}) => {
    const el = h('div', 'kit-chat', parent);
    if (o.style) css(el, o.style);
    const rail = h('div', 'kit-chat-rail', el);
    const cps = o.cps ?? 42, gap = o.gap ?? 0.7, think = o.think ?? 0.7;
    let t = o.start ?? 0.4;
    const items = msgs.map(m => {
      const row = h('div', `kit-msg kit-${m.who}`, rail);
      if (m.name) h('div', 'kit-name', row, m.name);
      const bubble = h('div', 'kit-bubble', row);
      const txt = h('span', '', bubble);
      txt.textContent = m.text;
      const dots = h('span', 'kit-dots', bubble, '● ● ●');
      const chars = [...m.text];
      const at = t;
      const streamAt = m.who === 'user' ? at : at + think;
      const end = m.who === 'user' ? at + 0.35 : streamAt + chars.length / cps;
      t = end + (m.gap ?? gap);
      return { m, row, bubble, txt, dots, chars, at, streamAt, end };
    });
    const H = el.clientHeight;
    let acc = 0;
    items.forEach(it => { it.dots.style.display = 'none'; });
    items.forEach(it => {                       // 글자가 모두 들어간 상태의 크기를 재서 고정한다(offset 값은 화면 배율과 무관하다)
      it.bubble.style.minWidth = it.bubble.offsetWidth + 1 + 'px';
      it.bubble.style.minHeight = it.bubble.offsetHeight + 'px';
      it.h = it.row.offsetHeight + parseFloat(getComputedStyle(rail).rowGap || 0);
      acc += it.h; it.bottom = acc;
    });
    const end = items.length ? items[items.length - 1].end : 0;
    return {
      el, end, items,
      render(lt) {
        let shift = 0;
        items.forEach(it => {
          const p = prog(lt, it.at, 0.35, ease.pop);
          it.row.style.opacity = clamp(p * 2).toFixed(3);
          it.row.style.transform = `translateY(${((1 - p) * 30).toFixed(1)}px) scale(${lerp(0.94, 1, p).toFixed(4)})`;
          const waiting = it.m.who !== 'user' && lt < it.streamAt;
          it.dots.style.display = waiting ? '' : 'none';
          const n = it.m.who === 'user' ? it.chars.length : clamp(Math.floor((lt - it.streamAt) * cps), 0, it.chars.length);
          it.txt.textContent = waiting ? '' : it.chars.slice(0, n).join('');
          shift = Math.max(shift, prog(lt, it.at, 0.4, ease.swift) * Math.max(0, it.bottom - H));
        });
        rail.style.transform = `translateY(${(-shift).toFixed(1)}px)`;
      },
    };
  };

  // 터미널: 명령은 타자로, 출력은 한 줄씩 나타난다.
  KIT.terminal = (parent, lines, o = {}) => {
    const fr = KIT.frame(parent, 'window', { title: o.title || 'terminal', style: o.style });
    fr.el.classList.add('kit-terminal');
    const cps = o.cps ?? 30, gap = o.gap ?? 0.25, prompt = o.prompt ?? '$ ';
    let t = o.start ?? 0.4;
    const rows = lines.map(l => {
      const row = h('div', 'kit-line ' + (l.cmd != null ? 'kit-cmd' : 'kit-out ' + (l.cls || '')), fr.body);
      const at = t;
      if (l.cmd != null) { h('span', 'kit-prompt', row, prompt); row._txt = h('span', '', row); t += [...l.cmd].length / cps + 0.45; }
      else { row.textContent = l.out; t += l.gap ?? gap; }
      return { l, row, at };
    });
    return {
      el: fr.el, body: fr.body, end: t,
      render(lt) {
        rows.forEach(r => {
          if (r.l.cmd != null) { r.row.style.opacity = lt >= r.at ? 1 : 0; KIT.type(r.row._txt, r.l.cmd, lt, r.at, cps, lt < r.at + [...r.l.cmd].length / cps + 0.4); }
          else { const p = prog(lt, r.at, 0.2, ease.outQuad); r.row.style.opacity = p.toFixed(3); r.row.style.transform = `translateY(${((1 - p) * 8).toFixed(1)}px)`; }
        });
      },
    };
  };

  window.KIT = KIT;
})();
