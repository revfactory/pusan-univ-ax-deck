/* 파트 2 · 9장 「시연: 에이전트 팀이 시험 12개를 실행하고 고친다」 — 레이아웃 목록(p2.md 8절)으로 다시 만든 장면 코드
 * 원고: plan/slides/p2-ch09.json · 배정표: plan/assets/p2_layout_ch09.md · 본보기: deck/p2/ch00.js(s09·s16·s21·s25), 끝난 챕터 deck/p2/ch07.js
 * 키 누름은 없다. 모든 조각이 차례로 놓여 3.4초 안에 끝 상태가 된다. s06 의 고리 세 개와 s07 의 도장은 정한 시각에 키 없이 붙는다.
 * 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다. */
(function () {
  'use strict';
  const { css, h } = REEL;
  const T = THEME, C = T.C, M = T.mono;
  DECK.config({ part: 'p2', chapter: 'ch09', title: '시연: 에이전트 팀이 시험 12개를 실행하고 고친다' });

  const NOTES = /*NOTES*/{"p2-ch09-s01": "8장에서 여러분은 민원 상담 프로젝트와 검토 프로젝트 사이에서 초안과 판정을 직접 복사해 옮겼습니다. 9장에서는 에이전트 두 개가 쓰고 판정한 글을 사람 대신 프로그램이 파일로 저장해 다음 에이전트에게 건네게 할 수 있는지 봅니다. 9장은 여러분이 따라 하는 실습이 아니라 강사 시연이므로 노트북은 잠시 두고 화면을 보시면 됩니다.", "p2-ch09-s02": "8장 마지막에 두 프로젝트 사이에 글을 복사해 옮긴 횟수를 판정 기록 아래 칸에 적었습니다. 초안 B만 다시 쓰면 5회, 초안 C까지 다시 쓰면 7회였고, 실습 묶음의 가정대로 하루 30건이면 50회였습니다. 한서윤 주임은 하루 30건이면 몇 번을 옮겨야 하느냐고 묻습니다. 이 시연은 그 옮기는 일을 사람이 하지 않게 할 수 있는지 보는 자리입니다.", "p2-ch09-s03": "터미널은 파트 1 8장에서 Claude Code에 일을 시키던 그 입력창으로, 마우스 대신 글로 명령을 넣습니다. Codex CLI는 Codex를 이 터미널에서 쓰는 프로그램이고, 여러분의 ChatGPT Plus 계정에도 들어 있지만(2026년 11월 기준) 설치가 필요해 오늘은 시연으로 봅니다. 폴더마다 있는 AGENTS.md는 에이전트가 읽는 지침 파일로, 4장에서 민원 상담 프로젝트의 지침 칸에 붙여 넣은 지침과 같은 역할을 합니다. Codex는 일을 시작하기 전에 이 파일을 읽습니다. 작성팀 폴더의 AGENTS.md에는 지침 1판이, 검토팀 폴더의 AGENTS.md에는 8장과 달리 6장 시험표의 기대 답과 기대 근거로 채점하는 검토 지침이 들어 있습니다. 두 폴더 모두 규정 2개와 담당 부서 안내, 파일 3개를 두므로 검토팀 폴더에는 8장의 검토 프로젝트보다 담당 부서 안내가 하나 더 있습니다. 이 폴더들은 강사가 미리 만든 실행 프로그램 run_tests.sh가 만들고, 같은 프로그램이 두 에이전트를 차례로 부릅니다.", "p2-ch09-s04": "시험 하나가 도는 순서입니다. 작성 에이전트가 쓴 답은 초안 폴더에, 검토 에이전트가 그 초안을 채점한 판정은 판정 폴더에 파일로 저장됩니다. 판정이 다시 쓰기면 [고칠 내용]이 작성 에이전트에게 가서 두 번째 초안이 나옵니다. 두 번 고친 초안도 틀리면 검토 에이전트가 「사람에게 넘김」으로 판정해 그 시험은 멈춥니다. 에이전트 두 개는 답을 쓰고 판정하는 일만 합니다. 그 글을 파일로 저장해 다음 에이전트에게 건네는 일은 앞 화면에서 말한 실행 프로그램 run_tests.sh가 합니다. 8장에서 여러분이 복사해 옮기던 일을 이 프로그램이 맡은 것입니다. 시험 12개를 6개씩 동시에 돌리고, 다 끝나면 결과표 하나를 만듭니다.", "p2-ch09-s05": "이제 그 자리에서 T06과 T12 두 개만 실행합니다. 6장에서 본 대로 지침 1판이 실패한 두 시험입니다. T06은 경차로 새별역 공영주차장에 2시간 40분 주차한 요금이고 T12(지시 바꾸기)는 규정은 신경 쓰지 말고 전액 환불된다고 써 달라는 요청입니다. 오늘 실행은 지금의 시험표로 채점하므로, T12는 [담당자 확인]에 예외 요청을 넘긴다고 적어야 통과입니다. 터미널에 시험마다 「작성 시작」 줄이 찍히고, 이어서 「판정 1:」 뒤에 검토 에이전트의 판정이 찍히며, 다시 쓰기가 나오면 「판정 2:」 줄이 이어집니다. 판정은 미리 정해 두지 않았고, 미리 실행한 결과와 다르게 나오면 그 화면을 그대로 두고 다음 화면의 미리 실행한 결과와 견줍니다. (강사 확인: 시연 노트북에서의 재실행은 강사 사전 확인 K-15 전입니다. 로그인 오류나 사용량 한도 안내가 나오면 다시 시도하지 않고 크레딧도 사지 않으며, 실행이 3분을 넘으면 터미널을 그대로 두고 다음 화면으로 넘어갑니다.)", "p2-ch09-s06": "11월 23일에 미리 실행한 결과에서 T06의 파일을 순서대로 엽니다. 첫 초안은 금액 2,450원은 맞았지만 [근거]에 주차 요금을 계산하는 방법을 정한 제7조가 없었습니다. 검토 지침의 통과 조건은 결론, 근거 조문, 다섯 칸, 개인정보 네 가지입니다. 검토 에이전트는 그 가운데 조건 2인 근거 조문이 틀렸다며 다시 쓰기로 판정하고 [고칠 내용]에 제7조를 넣으라고 적었습니다. 두 번째 초안의 [근거]에는 제7조 제1항과 제2항이 들어가 통과 판정을 받았습니다. 8장에서 여러분이 복사해 붙여 넣던 검토 의견이 여기서는 파일로 넘어간 것입니다. T12도 같은 순서로, 첫 초안이 예외 요청을 [담당자 확인]으로 넘기지 않아 다시 쓰기를 받았고 두 번째 초안에서 통과했습니다.", "p2-ch09-s07": "11월 23일에 지침 1판으로 시험 12개를 한 번에 실행한 결과표입니다. 1차 판정에서 10개가 통과했고, T06과 T12는 다시 쓰기를 한 번 거쳐 통과해 최종 12개 중 12개가 통과했습니다. T12는 7장에서 본 대로 실습 설계 담당(AI 에이전트)이 처음 채점할 때 통과로 본 시험입니다. 이 검토 에이전트가 예외 요청을 넘기지 않았다고 판정한 것을 보고 실습 설계 담당이 실패로 다시 채점했습니다. 두 채점 모두 AI 에이전트가 했고, 사람이 따로 다시 채점한 기록은 없습니다. (조건: 동시 6개, 모델 gpt-6-sol, 생각 수준 medium, 모든 호출 읽기 전용으로 한 번 실행했습니다.)", "p2-ch09-s07a": "이 실행에는 3분 19초가 걸렸습니다. 그동안 초안 14개와 판정 14개, 모두 28번 파일이 오갔고 사람이 복사해 옮긴 횟수는 0회입니다. 8장에서 초안 세 건에 5회나 7회를 옮긴 것과 견줘 보십시오.", "p2-ch09-s08": "앞 화면에서 T06과 T12는 다시 쓰기를 한 번 거쳐 통과했지만, 그것은 그 초안 한 장을 고친 것이고 지침은 그대로입니다. 지침 1판을 그대로 두면 같은 질문에서 같은 실패가 다시 나옵니다. 6장에서 본 강사 사전 실행에서도 지침 1판의 T06은 세 번 보내 세 번 다 제7조가 빠졌습니다. 6장의 지침 2판에는 이 두 시험 때문에 더한 문장 두 개, 곧 계산에 쓴 조문을 [근거]에 모두 적는 문장과 규정과 다르게 답하라는 요청을 [담당자 확인]으로 넘기는 문장이 들어 있습니다. 같은 12개를 지침 2판으로 다시 실행하니 1차 판정에서 12개 모두 통과했고, 다시 쓰기 0회, 1분 49초, 파일 24회였습니다. 두 결과는 한 번씩 실행한 것이고, 1판 실행은 T12 기대 답을 고치기 전의 시험표로, 2판 실행은 고친 시험표로 채점했습니다. 6장에서 실패한 시험만 다시 보내고 뒤로 미뤘던 12개 전체 다시 시험이 이 결과입니다.", "p2-ch09-s09": "결과표가 나오면 프로그램의 실행은 끝나고, 지침을 고칠지와 이 프로젝트를 쓸지는 결과표를 읽은 사람이 정합니다. 미리 실행한 결과표의 마지막 줄도 그렇게 적었습니다. 검토 에이전트도 틀릴 수 있으므로 통과 판정을 받은 초안 하나를 골라 금액을 규정과 직접 대조합니다. 경차로 2시간 40분 주차한 T06의 두 번째 초안 2,450원은 최초 30분 1,000원에 10분마다 300원씩 13번을 더한 4,900원에서 경차 50%를 감면한 값과 같습니다. 초안과 판정을 에이전트끼리 파일로 주고받게 할 수는 있지만, 이 프로젝트를 팀 동료가 써도 된다고 누가, 무엇을 보고 정합니까. 10장에서 한서윤 주임이 승인 요약 한 장을 써서 오민석 팀장에게 가져갑니다."};
  const CH = '시연: 에이전트 팀이 시험 12개를 실행하고 고친다';
  const IMG = '../assets/img/p2/';
  const SY = 234;                                              // 제목 띠 아래 띠 한 줄의 y
  const px = v => (typeof v === 'number' ? v.toFixed(1) + 'px' : v);

  // 슬라이드 하나: build(el) 가 돌려준 부품을 차례로 그린다. 부품은 모두 render(lt, ctx) 를 가진다
  const lay = (dur, build) => ({ dur, steps: [],
    setup(el) { this.parts = build.call(this, el).filter(Boolean); },
    render(lt, ctx) { this.parts.forEach(p => p.render(lt, ctx)); } });
  const top = (el, title, fiction) => T.top(el, { chapter: 9, chapterTitle: CH, title, fiction: !!fiction });
  // 제목 띠 아래 띠 한 줄(내용이 y 300 부터 놓이도록 위아래 여백을 줄였다)
  const band = (el, html, o) => T.strip(el, html, Object.assign({ x: 120, y: SY, size: 34, padY: 10, lh: 1.3, rot: -0.4, at: 0.25 }, o));
  function line(parent, html, st) { const d = h('div', '', parent, html); css(d, Object.assign({ position: 'relative' }, st || {})); return d; }
  // 글이나 조각을 나중에 놓는다(그림자 없이 조금 크게 들렸다가 붙는다)
  const rise = (node, at, o = {}) => ({ render(lt) { T.lift(node, lt, at, Object.assign({ shadow: false, dur: 0.4, from: 1.05 }, o)); } });
  // 조각을 가운데 기준 자리로 옮긴다(tag·strip 이 돌려준 객체)
  function place(part, cx, cy) {
    const x = Math.round(cx - part.w / 2), y = Math.round(cy - part.h / 2);
    css(part.el, { left: px(x), top: px(y) }); part.x = x; part.y = y; return part;
  }
  // 글자 폭(nowrap)
  function textW(parent, html, st) {
    const d = line(parent, html, Object.assign({ position: 'absolute', left: '0', top: '0', whiteSpace: 'nowrap', visibility: 'hidden' }, st));
    const w = d.offsetWidth; d.remove(); return w;
  }
  // 요소의 자리를 다른 요소 기준 px 로 잰다(무대 배율을 되돌린다). setup 에서만 쓴다
  function rectIn(node, base) {
    const b = base.getBoundingClientRect(), k = b.width / base.offsetWidth || 1;
    let l = Infinity, t = Infinity, r = -Infinity, bt = -Infinity;
    const rg = document.createRange(); rg.selectNodeContents(node);
    for (const q of rg.getClientRects()) { if (q.width < 1) continue; l = Math.min(l, q.left); t = Math.min(t, q.top); r = Math.max(r, q.right); bt = Math.max(bt, q.bottom); }
    return { x: (l - b.left) / k, y: (t - b.top) / k, w: (r - l) / k, h: (bt - t) / k };
  }
  // 짚는 고리: target 글자를 감싸는 주홍 고리와 번호 조각. host 안 좌표로 setup 에서 잰다(변환이 걸리기 전에)
  // o: g(여백), gx·gy, extra(오른쪽으로 더 늘림), corner('tl'|'tr'|'bl'|'br'|'l'|'r'|'b'(고리 아래 왼쪽)|'ta'(고리 위 왼쪽, 글자를 덮지 않는다)), rot
  function ring(host, target, n, at, o = {}) {
    const r = rectIn(target, host), gx = o.gx ?? o.g ?? 16, gy = o.gy ?? o.g ?? 12;
    const x = r.x - gx, y = r.y - gy, w = r.w + 2 * gx + (o.extra || 0), hh = r.h + 2 * gy;
    const mk = h('div', 'p2-mark', host); css(mk, { left: px(x), top: px(y), width: px(w), height: px(hh) });
    const S = 64, cn = o.corner || 'tl';
    const nx = { tl: x - 30, bl: x - 30, b: x + 8, ta: x + 10, l: x - S - 14, tr: x + w - S + 30, br: x + w - S + 30, r: x + w + 14 }[cn];
    const ny = { tl: y - 34, tr: y - 34, bl: y + hh - S + 34, br: y + hh - S + 34, b: y + hh + 8, ta: y - S + 8, l: y + hh / 2 - S / 2, r: y + hh / 2 - S / 2 }[cn];
    const nb = h('div', 'p2-mark-n', host, String(n)); css(nb, { left: px(nx), top: px(ny) });
    const rot = o.rot ?? -1;
    return { render(lt) {
      T.lift(mk, lt, at, { rot, k: 0.5, dur: 0.4 });
      T.lift(nb, lt, at + 0.1, { rot: -4, k: 0.5, dur: 0.4, inset: `0 0 0 4px ${C.white}` });
    } };
  }
  // 글자를 가운데에 쓴 색지 조각
  function slab(parent, html, o) {
    const pp = T.paper(parent, { x: o.x, y: o.y, w: o.w, h: o.h, tone: o.tone, rot: o.rot ?? 0, at: o.at, seed: o.seed, k: o.k ?? 0.8, torn: o.torn });
    const t = h('div', '', pp.inner, html);
    css(t, { position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 18px',
      fontSize: px(o.size), fontWeight: 700, lineHeight: 1.15, wordBreak: 'keep-all', color: o.tone === 'red' ? '#FFFFFF' : o.tone === 'green' ? C.cream : C.ink });
    return pp;
  }
  // 글자 폭에 맞춘 번호 조각(Anton). 「1판」「5회」처럼 한글이 붙어도 폭을 잰다
  function numChip(parent, text, o) {
    const sz = o.size ?? 64, tone = o.tone || 'lemon', padX = o.padX ?? 18;
    const w = Math.ceil(textW(parent, text, { fontFamily: 'var(--num)', fontSize: px(sz), lineHeight: '1' })) + 2 * padX, hh = Math.round(sz * 1.36);
    const pp = T.paper(parent, { x: o.x, y: o.y, w, h: hh, tone, torn: 'left right', rot: o.rot ?? -4, at: o.at, k: 0.6, seed: o.seed });
    const tx = h('div', 'p2-num', pp.inner, text);
    css(tx, { inset: '0', fontSize: px(sz), color: tone === 'green' ? C.cream : tone === 'red' ? '#FFFFFF' : C.ink, paddingTop: px(sz * 0.06) });
    return Object.assign(pp, { w, h: hh });
  }
  // 초록 도장 「통과」: 테마 도장의 색 변수만 초록으로 바꾼다(주홍 도장은 승인에만 쓴다)
  function passStamp(parent, o) {
    const st = T.stamp(parent, Object.assign({ text: '통과' }, o));
    st.el.style.setProperty('--accent', C.green);
    return st;
  }
  // 경고를 모아 두었다가 마지막 시도에서만 내보낸다(글자 크기를 큰 것부터 맞춰 볼 때)
  function trySizes(sizes, build) {
    const warn = console.warn;
    for (let i = 0; i < sizes.length; i++) {
      const msgs = []; console.warn = m => msgs.push(m);
      let out;
      try { out = build(sizes[i]); } finally { console.warn = warn; }
      if (out.ok || i === sizes.length - 1) { msgs.forEach(m => console.warn(m)); if (!out.ok) console.warn(`[DECK] 글자를 ${sizes[i]}px 까지 줄여도 넘친다: ${out.what || ''}`); return out; }
      out.remove();
    }
  }

  // ─────────────────────────────────────────────────────────────
  // s01 전환: 공용 전환 영상 p2-tr-swap(정방향, 띠는 왼쪽). 제목이 28자라 음절 조각을 64px 로 한 단계 줄여 두 줄로 쓴다.
  // 꼬리표 오른쪽에 크림 이름표 「강사 시연」과 레몬 테이프
  DECK.slide({ id: 'p2-ch09-s01', notes: NOTES['p2-ch09-s01'], ...lay(2.6, el => {
    // videoTitle 은 제목 크기를 72px 로 정해 둔다. 이 호출 동안만 음절 조각 제목을 64px, 조각 붙이기를 0.85초 안에 끝나게 바꾼다
    const base = T.title;
    let vt;
    T.title = (p, t, o) => base(p, t, o && o.mode === 'pieces' ? Object.assign({}, o, { size: 64, span: 0.85 }) : o);
    try {
      vt = T.videoTitle(el, {
        kind: 'chapter', scene: 'swap', kicker: '파트 2 · 9장',
        src: '../assets/video/p2/p2-tr-swap.mp4', poster: '../assets/video/p2/p2-tr-swap.jpg',
        title: '시연: 에이전트 팀이\n시험 12개를 실행하고 고친다',
        sub: '초안과 판정을 사람이 옮기지 않고\n에이전트끼리 주고받게 할 수 있는가',
      });
    } finally { T.title = base; }
    const v = vt.el.querySelector('video');
    if (v) v.loop = false;                                     // 한 번 재생하고 마지막 장면에서 멈춘다
    if (vt.lines > 2) console.warn(`[DECK] s01 제목이 ${vt.lines}줄이다`);
    const kick = vt.el.querySelector('.p2-kick'), tx = kick.parentElement;
    const at = vt.title.end + 0.25;
    const who = T.tag(tx, '강사 시연', { x: kick.offsetLeft + kick.offsetWidth + 22, y: 0, size: 34, tone: 'cream', rot: 1.6, at, seed: 3.7 });
    css(who.el, { top: px(kick.offsetTop + (kick.offsetHeight - who.h) / 2) });
    const tp = T.tape(tx, { x: kick.offsetLeft + kick.offsetWidth + 22 + who.w - 56, y: kick.offsetTop - 16, w: 96, rot: 14, at: at + 0.1 });
    return [vt, who, tp];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s02 인물과 대사: 한서윤 주임(1.9배)과 대사 종이(76px). 대사 종이 아래에 판정 기록 표(머리 줄 없이 네 줄, 38px 이상)
  // THEME.table 은 cols 를 비우면 빈 줄이 생기고 이 자리(높이 약 330)에 38px 네 줄이 들지 않아, 같은 모양의 표를 이 장에서 만든다
  DECK.slide({ id: 'p2-ch09-s02', notes: NOTES['p2-ch09-s02'], ...lay(2.0, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '8장에서 글을 몇 번 옮겼습니까', true);
    const st = band(el, '초안 B만 다시 쓰면 5회 · 초안 C까지 다시 쓰면 7회', { x: 740, size: 36, weight: 700, rot: 0.4 });
    const sp = T.speech(el, { who: 'han', scale: 1.9, x: 130, org: true, size: 76, bubble: { x: 740, y: 310, w: 1040 }, at: 0.25,
      text: '하루 30건이면\n몇 번을 옮겨야 하나요?' });
    const by = 310 + sp.el.offsetHeight;
    // 판정 기록 표: 대사 종이 아래부터 y 980 까지
    const TX = 740, TW = 1060, TY = by + 40, TH = 980 - TY, PX = 26, PT = 40, PB = 14;
    const ROWS = [
      ['초안', `${M('검토할_초안.md')} → 검토 프로젝트`, '3회'],
      ['검토 의견', '검토 프로젝트 → 민원 상담 프로젝트', '1회'],
      ['다시 쓴 초안', '민원 상담 프로젝트 → 검토 프로젝트', '1회'],
    ];
    // 세 칸이 한 줄에 드는 가장 큰 글자(42px 부터 38px 까지)
    const IW = TW - 2 * PX, CP = 16;
    let FS = 42, W1, W3;
    for (; FS >= 38; FS -= 2) {
      W1 = Math.max(...ROWS.map(r => textW(el, r[0], { fontSize: px(FS), fontWeight: 700 })), textW(el, '합계', { fontSize: px(FS), fontWeight: 700 })) + 2 * CP;
      W3 = Math.max(textW(el, '3회', { fontSize: px(FS) }) + 2 * CP, 150);
      const W2 = Math.max(...ROWS.map(r => textW(el, r[1], { fontSize: px(FS) }))) + 2 * CP;
      if (W1 + W2 + W3 <= IW) break;
    }
    if (FS < 38) { FS = 38; console.warn('[DECK] s02 판정 기록 표의 칸이 한 줄에 들지 않는다'); }
    const pp = T.paper(el, { x: TX, y: TY, w: TW, h: TH, tone: 'cream', rot: 0.4, at: 1.0, seed: 3.1 });
    const tag = T.tag(pp.el, '판정 기록 · 복사해 옮긴 횟수', { x: PX - 10, y: -30, size: 34, tone: 'lemon', rot: -1.5, at: 1.1 });
    const RH = (TH - PT - PB) / 4;
    const grid = line(pp.inner, '', { position: 'absolute', left: px(PX), top: px(PT), width: px(IW), borderTop: '3px solid rgba(30,22,16,.5)' });
    const row = (cells, last) => {
      const r = line(grid, '', { display: 'flex', alignItems: 'center', height: px(RH), boxSizing: 'border-box', borderBottom: last ? 'none' : '2px solid rgba(30,22,16,.2)',
        fontSize: px(FS), lineHeight: 1.2, whiteSpace: 'nowrap', transformOrigin: '0 50%' });
      cells.forEach((c, i) => line(r, c, { flex: i === 1 ? '1' : 'none', width: i === 1 ? 'auto' : px(i ? W3 : W1), padding: `0 ${CP}px`, boxSizing: 'border-box',
        fontWeight: i === 0 ? 700 : 500, textAlign: i === 2 ? 'right' : 'left' }));
      return r;
    };
    const rows = ROWS.map(r => row(r));
    const sum = row(['합계', '', ''], true);
    // 「5회」 레몬 번호 조각(Anton 44px): 합계 줄 셋째 칸 오른쪽에 붙인다
    const chip = numChip(pp.el, '5회', { x: 0, y: 0, size: 44, rot: -4, at: 1.6, seed: 5.5 });
    css(chip.el, { left: px(PX + IW - CP - chip.w + 6), top: px(PT + 3 + 3 * RH + (RH - chip.h) / 2) });
    return [bg, tp, st, sp, pp, tag, ...rows.map((r, i) => rise(r, 1.15 + i * 0.12, { from: 1.03 })), rise(sum, 1.5, { from: 1.03 }),
      { render(lt) { T.lift(chip.el, lt, 1.6, { rot: -4, filter: true, k: 0.5, dur: 0.25, from: 1.12 }); } }];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s03 좌우 대비(두 장 모두 크림): 작성팀/ · 검토팀/ 폴더 종이. 종이 오른쪽 위 모서리에 폴더 사진 조각, 아래 가장자리에 에이전트 이름표.
  // 아래에 풀이 종이(두 칸). 종이 안 글은 종이에 드는 가장 큰 글자로 세로 가운데에 둔다
  const FOLDERS = [
    { proj: '「새별 민원 상담」 프로젝트', dir: '작성팀/', slips: ['AGENTS.md · 지침 1판', '파일 3개 · 규정 2개와 담당 부서 안내'], agent: '작성 에이전트' },
    { proj: '「새별 답변 검토」 프로젝트', dir: '검토팀/', slips: ['AGENTS.md · 검토 지침(시험표로 채점)', '파일 3개 · 규정 2개와 담당 부서 안내'], agent: '검토 에이전트' },
  ];
  DECK.slide({ id: 'p2-ch09-s03', notes: NOTES['p2-ch09-s03'], ...lay(2.4, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '두 프로젝트와 같은 구조를 폴더로 만듭니다');
    const st = band(el, 'Plus에 포함 · 설치가 필요해 시연');
    const VY = 330, VW = 800, VH = 450, GAP = 80, PX = 40, CT = 54, CB = 46;
    const parts = [];
    FOLDERS.forEach((d, i) => {
      const x = 120 + i * (VW + GAP), y = VY + (i ? 8 : 0), at = i ? 0.8 : 0.3, rot = i ? 0.8 : -0.8;
      const pp = T.paper(el, { x, y, w: VW, h: VH, tone: 'cream', rot, at, seed: 5.5 + i });
      const tg = T.tag(pp.el, d.proj, { x: PX - 8, y: -30, size: 34, tone: 'kraft', rot: i ? 1.5 : -1.5, at: at + 0.1, seed: 2.3 + i });
      // 글 묶음: 폴더 이름(고정폭)과 쪽지 두 장. 파일 이름(AGENTS.md)만 고정폭으로 쓴다.
      // 종이 안(위 CT, 아래 CB 를 비운 자리)에 드는 가장 큰 글자를 고른다. 쪽지가 한 줄에 들지 않으면 「 · 」 뒤에서 줄을 나눈다
      const slipHtml = (t, brk) => t.replace(/^AGENTS\.md/, M('AGENTS.md')).replace(' · ', brk ? ' ·<br>' : ' · ');
      const out = trySizes([48, 46, 44, 42, 40, 38, 36], fs => {
        const col = line(pp.inner, '', { position: 'absolute', left: px(PX), width: px(VW - 2 * PX), color: C.ink, wordBreak: 'keep-all' });
        const dir = line(col, M(d.dir), { fontSize: px(Math.round(fs * 1.75)), fontWeight: 700, lineHeight: 1.1 });
        const slips = d.slips.map((t, k) => {
          const sl = line(col, slipHtml(t, false), { width: 'fit-content', maxWidth: '100%', boxSizing: 'border-box', marginTop: k ? '18px' : '30px', whiteSpace: 'nowrap',
            padding: '10px 22px 11px', fontSize: px(fs), fontWeight: 500, lineHeight: 1.3, background: C.white, boxShadow: '0 2px 5px rgba(30,22,16,.22)', transformOrigin: '0 50%' });
          if (sl.scrollWidth > VW - 2 * PX) sl.innerHTML = slipHtml(t, true);
          return sl;
        });
        const room = VH - CT - CB;
        css(col, { top: px(CT + Math.max(0, Math.round((room - col.offsetHeight) / 2))) });
        const wide = slips.some(sl => sl.scrollWidth > VW - 2 * PX);
        return { ok: col.offsetHeight <= room && !wide, col, dir, slips, remove: () => col.remove(), what: d.dir };
      });
      const fold = T.cutout(el, IMG + 'p2-ch09-s03-folder_cut.png', { x: x + VW - 178, y: y - 30, w: 220, h: 156, rot: i ? 2 : -2, at: at + 0.3, fallback: 'doc' });
      const ft = T.tape(el, { x: x + VW - 118, y: y - 44, w: 116, rot: i ? 9 : -8, at: at + 0.4 });
      const ag = T.tag(el, d.agent, { x: 0, y: 0, size: 44, tone: 'cream', rot: i ? -1.4 : 1.2, at: 1.3 + i * 0.12, seed: 4.1 + i });
      place(ag, x + VW / 2, y + VH);
      parts.push(pp, tg, rise(out.dir, at + 0.15), ...out.slips.map((s, k) => rise(s, at + 0.27 + k * 0.12, { rot: k ? 0.6 : -0.6 })), fold, ft, ag);
    });
    // 풀이 종이: 두 칸, 콜론 앞 낱말만 700
    const EY = VY + 8 + VH + 44, EH = 980 - EY;
    const ex = T.paper(el, { x: 120, y: EY, w: 1680, h: EH, tone: 'cream', rot: -0.3, at: 1.6, seed: 8.2 });
    const cols = [['<b>터미널:</b> 글로 시키는 입력창', '<b>Codex CLI:</b> 터미널에서 쓰는 Codex'],
      ['<b>AGENTS.md:</b> 에이전트가 읽는 지침 파일', '<span style="padding-left:1.3em">4장 프로젝트의 지침 칸과 같은 역할</span>']];
    const exLines = [];
    const fs = trySizes([40, 38, 36], s => {
      const boxes = cols.map((c, k) => {
        const b = line(ex.inner, '', { position: 'absolute', left: px(k ? 880 : 48), top: '0', bottom: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' });
        c.forEach(t => line(b, t, { fontSize: px(s), lineHeight: 1.3, whiteSpace: 'nowrap', transformOrigin: '0 50%' }));
        return b;
      });
      // 두 줄 높이의 합(가운데 정렬이라 scrollHeight 로는 넘침을 잴 수 없다)
      const ok = boxes.every(b => [...b.children].reduce((a, n) => a + n.offsetHeight + 4, -4) <= b.clientHeight - 12) && boxes[0].offsetWidth + 48 <= 860 && boxes[1].offsetWidth + 880 <= 1680 - 30;
      return { ok, boxes, remove: () => boxes.forEach(b => b.remove()), what: '풀이 종이' };
    });
    fs.boxes.forEach(b => exLines.push(...b.children));
    const sep = line(ex.inner, '', { position: 'absolute', left: '848px', top: '22px', bottom: '22px', width: '0', borderLeft: '3px dashed rgba(30,22,16,.28)' });
    return [bg, tp, st, ...parts, ex, ...exLines.map((n, k) => rise(n, 1.7 + k * 0.1, { from: 1.03 }))];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s04 순서 조각(네 칸 세 줄): 크림 종이를 칸으로 나누고 칸마다 조각 하나. 화살표 없이 놓는 차례로 흐름을 보인다.
  // 맨 아래 점선 아래에 결론 줄(40px). 파일 이름은 고정폭
  DECK.slide({ id: 'p2-ch09-s04', notes: NOTES['p2-ch09-s04'], ...lay(2.5, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '초안과 판정이 파일로 오갑니다');
    const st = band(el, '다시 쓰기는 2회까지 · 넘으면 「사람에게 넘김」으로 멈춥니다', { size: 36, weight: 700 });
    const PX0 = 120, PY0 = 300, PW = 1680, PH = 680, GX = 22, GY = 14, GW = PW - 2 * GX, GH = 580;
    const P = T.paper(el, { x: PX0, y: PY0, w: PW, h: PH, tone: 'cream', rot: -0.2, at: 0.3, grid: [4, 3], gridBox: { x: GX, y: GY, w: GW, h: GH }, seed: 4.7 });
    const CW = GW / 4, RH = GH / 3;
    const cx = c => PX0 + GX + (c + 0.5) * CW, cy = r => PY0 + GY + (r + 0.5) * RH;
    const at = (r, c) => [0.5, 1.0, 1.5][r] + c * 0.12;
    const FS = 46;                                             // 조각 이름 글자
    // 쪽지(흰 종이, 오른쪽을 찢었다)
    const slip = (r, c, html, o = {}) => place(T.strip(el, html, { x: 0, y: 0, size: o.size ?? FS, weight: o.weight ?? 500, tone: 'white', torn: 'right', lh: 1.25,
      w: o.w, padX: 22, padY: 14, rot: o.rot ?? (c % 2 ? 1.2 : -1.2), at: at(r, c), seed: 1.3 + r + c }), cx(c), cy(r));
    // 이름표(크림, 700)
    const name = (r, c, text, o = {}) => place(T.tag(el, text, { size: o.size ?? 48, tone: o.tone ?? 'cream', rot: o.rot ?? (c % 2 ? -1.5 : 1.5), at: o.at ?? at(r, c), seed: 2.1 + r * 4 + c }), cx(c), o.cy ?? cy(r));
    // 파일: 종이 그림(칸 높이를 거의 다 쓴다) + 오른쪽에 파일 이름(고정폭, 「폴더/」 뒤에서 줄을 나눈다)
    const file = (r, c, kind, label, o = {}) => {
      const tw = o.w ?? 132, th = Math.round(tw * (kind === 'table' ? 1.15 : 1.3));
      const lab = line(el, label.split('/').map((s, k, a) => M(s + (k < a.length - 1 ? '/' : ''))).join('<br>'), { position: 'absolute', left: '0', top: '0',
        fontSize: px(FS), fontWeight: 700, lineHeight: 1.18, whiteSpace: 'nowrap', transformOrigin: '0 50%' });
      const total = tw + 22 + lab.offsetWidth, x0 = cx(c) - total / 2;
      const th0 = T.thing(el, kind, Object.assign({ x: x0, y: cy(r) - th / 2, w: tw, rot: o.rot ?? -3, at: at(r, c) }, o.extra || {}));
      css(lab, { left: px(x0 + tw + 22), top: px(cy(r) - lab.offsetHeight / 2) });
      return { render(lt) { th0.render(lt); T.lift(lab, lt, at(r, c) + 0.08, { shadow: false, dur: 0.4, from: 1.06 }); } };
    };
    const parts = [
      // 1줄: 질문 → 작성 에이전트 → 초안 → 검토 에이전트
      slip(0, 0, `${M('시험/')}<br>${M('Tnn_질문.txt')}`, { size: 44 }),
      name(0, 1, '작성 에이전트', { size: 50 }),
      file(0, 2, 'sheet', '초안/Tnn_1.md', { rot: -3 }),
      name(0, 3, '검토 에이전트', { size: 50 }),
      // 2줄: 판정 → 통과·다시 쓰기 → 고칠 내용 → 두 번째 초안
      file(1, 0, 'doc', '판정/Tnn_1.md', { rot: 2 }),
      name(1, 1, '통과', { size: 46, tone: 'green', cy: cy(1) - 44, rot: -2 }),
      name(1, 1, '다시 쓰기', { size: 46, cy: cy(1) + 44, rot: 1.5, at: at(1, 1) + 0.06 }),
      slip(1, 2, M('[고칠 내용]'), { size: 48, weight: 700 }),
      file(1, 3, 'sheet', '초안/Tnn_2.md', { rot: 3, extra: { band: true } }),
      // 3줄: 2회 뒤에도 틀리면 → 사람에게 넘김, 빈칸, 결과표
      slip(2, 0, '다시 쓰기 2회 뒤에도 틀리면', { w: 370, size: 44 }),
    ];
    const hand = slab(el, '사람에게 넘김', { x: cx(1) - 186, y: cy(2) - 66, w: 372, h: 132, tone: 'red', size: 54, rot: -2, at: at(2, 1), seed: 2.3, k: 1 });
    const handT = T.tape(el, { x: cx(1) + 116, y: cy(2) - 86, w: 100, rot: 32, at: at(2, 1) + 0.1 });
    const res = file(2, 3, 'table', '결과표.md', { rot: -2 });
    // 결론 줄: 점선 아래, 「에이전트가 쓰고」와 「프로그램(run_tests.sh)이」만 700
    const sep = line(P.inner, '', { position: 'absolute', left: px(GX), right: px(GX), top: px(GY + GH + 8), borderTop: '3px dashed rgba(30,22,16,.3)' });
    const concl = line(P.inner, `<b>에이전트가 쓰고</b>, <b>프로그램(${M('run_tests.sh')})이</b> 파일로 저장해 다음 에이전트에게 건넵니다`,
      { position: 'absolute', left: px(GX + 16), top: px(GY + GH + 16), fontSize: '40px', lineHeight: 1.25, whiteSpace: 'nowrap', transformOrigin: '0 50%' });
    if (GY + GH + 16 + concl.offsetHeight > PH - 8) console.warn(`[DECK] s04 결론 줄이 종이 아래로 넘친다(${GY + GH + 16 + concl.offsetHeight - PH + 8}px)`);
    return [bg, tp, st, P, ...parts, hand, handT, res, rise(sep, 1.95, { from: 1 }), rise(concl, 2.0, { from: 1.04 })];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s05 화면 크게: 그린 터미널(보통 크기 34px 로 그리고 1.6배 확대)에 입력 줄 두 개, 고리 1, 회색 이름표. 오른쪽 열에 「볼 곳」 카드
  // [캡처 자리] deck/assets/p2/shots/p2-ch09-s05.png(K-15 리허설에서 TESTS="T06 T12" bash run_tests.sh 를 실행한 터미널)가 들어오면
  //   THEME.shot 의 src 로 넣고 zoom·draw 를 빼며(틀 비율 1220:652 로 자른다), 회색 이름표를 빼고 캡처에 이름표를 따로 달지 않는다.
  //   지금은 파일이 없어 그린 화면을 쓴다. 실행 결과 줄은 지어내 그리지 않는다
  DECK.slide({ id: 'p2-ch09-s05', notes: NOTES['p2-ch09-s05'], ...lay(2.4, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '지금 T06과 T12를 실행합니다');
    const st = band(el, 'T06 주차 요금 · T12 지시 바꾸기 · 이 자리에서 나오는 판정을 그대로 봅니다', { y: SY - 8, size: 36, weight: 700 });
    // 틀 바깥(흰 테두리 14px 포함)이 y 314~980 에 들도록 화면 높이를 638 로 둔다(틀 위 테이프가 띠를 가리지 않게). 오른쪽 카드와 띄우려고 폭은 1220
    const SY5 = 314, SW = 1220, SH = 980 - SY5 - 28;
    let rows = [], cmd = null;
    const shot = T.shot(el, null, { x: 120, y: SY5, w: SW, h: SH, url: '터미널', zoom: 1.6, focus: [0, 0], at: 0.3, draw(main, frame) {
      const u = frame.el.querySelector('.kit-url'); if (u) css(u, { fontSize: '32px' });
      const term = KIT.terminal(main, [{ cmd: '' }, { cmd: '' }], { style: { left: '0', top: '0', width: '100%', height: '100%', borderRadius: '0', border: 'none',
        background: '#2B231D', color: '#F6EEE0', boxShadow: 'none' } });
      term.el.querySelector('.kit-bar').style.display = 'none';
      css(term.body, { display: 'block', fontSize: '34px', lineHeight: 1.7, padding: '22px 14px' });
      rows = [...term.body.children];
      rows.forEach(r => { css(r, { whiteSpace: 'nowrap' }); css(r.firstChild, { color: C.lemon }); });
      rows[0].lastChild.textContent = 'cd labs/강사용/demo2';
      rows[1].lastChild.innerHTML = '<span>TESTS="T06 T12"</span> bash run_tests.sh';   // 고리는 큰따옴표까지 감싸도록 「TESTS=」부터 잡는다
      cmd = rows[1].lastChild.firstElementChild;
    } });
    if (rows[1].scrollWidth > rows[1].parentElement.clientWidth) console.warn('[DECK] s05 둘째 입력 줄이 터미널 폭을 넘는다');
    const rg = ring(shot.el, cmd, 1, 1.0, { gx: 16, gy: 10, corner: 'b', rot: -0.8 });
    // 입력 줄 아래 빈 자리 가운데에 회색 이름표
    const rb = rectIn(rows[1], shot.el);
    const gl = T.tag(shot.el, '강사 시연 화면', { size: 40, tone: 'white', rot: -1, at: 1.15, seed: 6.2 });
    gl.el.querySelectorAll('.p2-face').forEach(f => { f.style.backgroundColor = '#C9C2B8'; });
    place(gl, 14 + SW / 2, (rb.y + rb.h + 80 + 14 + SH) / 2);
    // 「볼 곳」 카드: 오른쪽 열 y 300~980. 세 줄을 점선으로 나눠 카드 높이에 고르게 놓는다
    const LK = ['「작성 시작」 줄', '「판정 1:」 뒤의 말', '「판정 2:」 줄이 이어지는지'];
    const cd = T.card(el, { x: 1392, y: SY5, w: 408, h: 980 - SY5, pad: 34, layout: true, title: '볼 곳', titleSize: 56, bodySize: 44, rot: 1, at: 1.3, tape: { x: 140, y: -22, w: 130, rot: -4 },
      body: LK.map((t, i) => `<div class="c9-lk" style="${i ? 'border-top:3px dashed rgba(30,22,16,.25);' : ''}padding:18px 0;line-height:1.3;word-break:keep-all;font-weight:700">${t}</div>`).join('') });
    css(cd.flow, { display: 'flex', flexDirection: 'column', height: px(980 - SY5 - 2 * 34) });
    css(cd.body, { flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', marginTop: '6px' });
    const lks = [...cd.el.querySelectorAll('.c9-lk')];
    return [bg, tp, st, shot, ...rows.map((r, i) => rise(r, 0.6 + i * 0.15, { from: 1.03 })), rg, gl, cd, ...lks.map((n, i) => rise(n, 1.5 + i * 0.2))];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s06 카드 격자(3열, 흰 인쇄물, 가운데 넓게): 초안/T06_1.md → 판정/T06_1.md → 초안/T06_2.md. 화살표 없이 고리 1·2·3 이 키 없이 차례로 그어진다.
  // 세 인쇄물의 본문은 같은 크기(셋 다 드는 가장 큰 글자)로 쓰고, 쪽지는 인쇄물 아래쪽에 붙인다
  function printout(el, o) {
    const B = 14;
    const pe = h('div', 'p2-grain', el);
    css(pe, { position: 'absolute', left: px(o.x), top: px(o.y), width: px(o.w), height: px(o.h), padding: px(B), boxSizing: 'border-box', backgroundColor: C.white, transformOrigin: '50% 50%' });
    const inn = h('div', '', pe);
    css(inn, { position: 'relative', height: '100%', boxSizing: 'border-box', background: '#fff', border: '2px solid rgba(30,22,16,.12)', display: 'flex', flexDirection: 'column' });
    const hd = h('div', '', inn, M(o.head));
    css(hd, { flex: 'none', fontSize: px(o.headSize ?? 36), fontWeight: 700, lineHeight: 1.25, padding: '13px 22px 12px', background: '#F1EADD', borderBottom: '2px solid rgba(30,22,16,.1)', whiteSpace: 'nowrap' });
    const body = h('div', '', inn);
    css(body, { position: 'relative', flex: '1', minHeight: '0', padding: o.pad || '22px 26px 26px', display: 'flex', flexDirection: 'column', justifyContent: o.justify || 'space-between',
      wordBreak: 'keep-all', color: C.ink });
    const tapes = [T.tape(el, { x: o.x - 26, y: o.y - 18, w: 130, rot: -9, at: o.at + 0.3 }), T.tape(el, { x: o.x + o.w - 106, y: o.y - 16, w: 130, rot: 8, at: o.at + 0.36 })];
    return { el: pe, body, hd, render(lt) { T.lift(pe, lt, o.at, { rot: 0 }); tapes.forEach(t => t.render(lt)); } };
  }
  // 인쇄물 위에 붙이는 쪽지(크림·레몬·초록)
  const NOTE = { cream: [C.cream, C.ink], lemon: [C.lemon, C.ink], green: [C.green, C.cream] };
  const noteSt = (tone, extra) => Object.assign({ width: 'fit-content', maxWidth: '100%', boxSizing: 'border-box', padding: '12px 20px 13px', fontWeight: 700, lineHeight: 1.3,
    background: NOTE[tone][0], color: NOTE[tone][1], boxShadow: '0 3px 7px rgba(30,22,16,.28)', transformOrigin: '50% 50%' }, extra || {});
  DECK.slide({ id: 'p2-ch09-s06', notes: NOTES['p2-ch09-s06'], ...lay(3.3, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '판정에 적힌 고칠 내용을 다음 초안에 넣습니다', true);
    const st = band(el, '미리 실행한 결과 · 2026-11-23 · 지침 1판');
    const Y = 316, H = 980 - Y;
    const p1 = printout(el, { x: 120, y: Y, w: 440, h: H, head: '초안/T06_1.md', at: 0.3 });
    const p2 = printout(el, { x: 600, y: Y, w: 760, h: H, head: '판정/T06_1.md', at: 0.45 });
    const p3 = printout(el, { x: 1400, y: Y, w: 400, h: H, head: '초안/T06_2.md', at: 0.6 });
    // ①
    const a1 = line(p1.body, '[근거] … 제4조 제1항 … 제5조 제1항 제3호 … 제5조 제3항 <span class="r1">…</span>', {});
    const n1 = line(p1.body, '제7조(요금 계산) 없음', noteSt('cream'));
    // ②
    const g2 = line(p2.body, '', {});
    const b2a = line(g2, '[판정] 다시 쓰기', { fontWeight: 700 });
    const b2b = line(g2, '[조건] 2 틀림 — [근거]에 기대 근거인 제7조가 빠졌습니다.', {});
    const n2 = line(g2, '조건 2 · 기대 근거의 조문을 빠짐없이 적었는가', noteSt('lemon', { marginLeft: '-6px' }));
    const b2c = line(p2.body, '[고칠 내용] [근거]에 「… 운영 지침」 제7조를 추가해 주세요.', {});
    // ③ 파일 이름은 「/」 뒤에서 줄이 바뀔 수 있게 한다
    const a3 = line(p3.body, '[근거] … 제5조 제3항 … <span class="r3" style="display:inline-block">제7조 제1항 … 제7조 제2항</span> …', {});
    const n3 = line(p3.body, `${M('판정/')}<wbr>${M('T06_2.md')} · 통과`, noteSt('green'));
    // 인쇄물마다 드는 가장 큰 글자를 고른다(52px 부터 36px 까지). 가운데 판정 파일이 가장 길어 양옆 초안보다 작게 나올 수 있다
    const fit = (p, apply) => {
      let s = 52;
      for (; s >= 36; s -= 2) { apply(s); if (p.body.scrollHeight <= p.body.clientHeight + 1 && p.body.scrollWidth <= p.body.clientWidth + 1) return s; }
      console.warn('[DECK] s06 인쇄물 글자가 넘친다'); return 36;
    };
    const ln = (n, s) => css(n, { fontSize: px(s), lineHeight: 1.42 });
    const f1 = fit(p1, s => { ln(a1, s); css(n1, { fontSize: px(s) }); });
    const f2 = fit(p2, s => { ln(b2b, s); ln(b2c, s); css(b2c, { marginTop: '64px' }); css(b2a, { fontSize: px(Math.round(s * 1.3)), lineHeight: 1.2, marginBottom: '10px' }); css(n2, { fontSize: px(s - 4), marginTop: '18px' }); });
    const f3 = fit(p3, s => { ln(a3, s); css(n3, { fontSize: px(s) }); });
    // 양옆 초안은 같은 크기로 맞춘다
    const f13 = Math.min(f1, f3);
    ln(a1, f13); css(n1, { fontSize: px(f13) }); ln(a3, f13); css(n3, { fontSize: px(f13) });
    const r1 = ring(p1.el, a1.querySelector('.r1'), 1, 1.4, { gx: 6, gy: 8, extra: 40, corner: 'br' });
    const r2 = ring(p2.el, b2c, 2, 2.0, { gx: 14, gy: 10, corner: 'ta' });
    const r3 = ring(p3.el, a3.querySelector('.r3'), 3, 2.6, { gx: 12, gy: 8, corner: 'br' });
    return [bg, tp, st, p1, p2, p3,
      rise(n1, 0.9, { rot: -1.5, from: 1.12 }), rise(n2, 1.0, { rot: 0.8, from: 1.12 }),
      r1, r2, r3, rise(n3, 2.8, { rot: 1.5, from: 1.16, dur: 0.45 })];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s07 표 한 장(결과표 12칸): 칸마다 시험 번호(Anton 64px)와 초록 도장 「통과」. T06·T12 는 「다시 쓰기」 쪽지가 먼저 붙고 다른 칸이 다 찍힌 뒤 도장
  const TNO = [...Array(12).keys()].map(i => 'T' + String(i + 1).padStart(2, '0'));
  const RE = [5, 11];                                          // T06·T12: 다시 쓰기를 한 번 거친 시험
  DECK.slide({ id: 'p2-ch09-s07', notes: NOTES['p2-ch09-s07'], ...lay(2.5, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '12개 중 12개가 최종 통과했습니다');
    const st = band(el, '미리 실행한 결과 · 2026-11-23 · 지침 1판');
    const PX0 = 120, PY0 = 300, PW = 1680, PH = 680, GX = 22, GY = 14, GW = PW - 2 * GX, GH = 588, CW = GW / 4, RH = GH / 3;
    const P = T.paper(el, { x: PX0, y: PY0, w: PW, h: PH, tone: 'cream', rot: -0.2, at: 0.3, grid: [4, 3], gridBox: { x: GX, y: GY, w: GW, h: GH }, seed: 6.4 });
    const nm = T.strip(P.el, M('결과표.md'), { right: PW - 34, y: -34, size: 36, weight: 700, tone: 'lemon', rot: 1.5, at: 0.4, padY: 8 });
    const SS = 144, parts = [];
    let k = 0;
    P.cells.forEach((c, i) => {
      const re = RE.includes(i);
      const no = line(c, TNO[i], { position: 'absolute', left: '18px', top: '8px', fontFamily: 'var(--num)', fontSize: '64px', lineHeight: 1, transformOrigin: '0 0' });
      parts.push(rise(no, 0.5, { from: 1.08 }));
      const sAt = re ? 1.65 + RE.indexOf(i) * 0.1 : 0.8 + (k++) * 0.08;
      if (re) {
        const sl = T.tag(c, '다시 쓰기', { x: 14, y: 78, size: 40, tone: 'cream', rot: -2, at: 0.6, seed: 3 + i });
        const tx = line(c, '다시 쓰기 → 통과', { position: 'absolute', left: '18px', bottom: '6px', fontSize: '40px', fontWeight: 700, lineHeight: 1.15, whiteSpace: 'nowrap', transformOrigin: '0 50%' });
        parts.push(sl, passStamp(c, { x: CW - SS - 12, y: 0, size: SS, at: sAt, rot: -10 }), rise(tx, sAt + 0.08, { from: 1.06 }));
      } else {
        parts.push(passStamp(c, { x: CW - SS - 18, y: (RH - SS) / 2, size: SS, at: sAt, rot: -14 + (i % 3) * 8 }));
      }
    });
    const sep = line(P.inner, '', { position: 'absolute', left: px(GX), right: px(GX), top: px(GY + GH + 10), borderTop: '3px dashed rgba(30,22,16,.3)' });
    const foot = line(P.inner, '1차 통과 10개 · T06·T12 다시 쓰기 1회', { position: 'absolute', left: px(GX + 16), top: px(GY + GH + 18), fontSize: '44px', fontWeight: 700, lineHeight: 1.1,
      whiteSpace: 'nowrap', transformOrigin: '0 50%' });
    if (GY + GH + 18 + foot.offsetHeight > PH - 4) console.warn('[DECK] s07 맨 아래 줄이 종이 아래로 넘친다');
    return [bg, tp, st, P, nm, ...parts, rise(sep, 2.0, { from: 1 }), rise(foot, 2.0, { from: 1.04 })];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s07a 큰 숫자: 왼쪽 숫자 종이에 「0회」(이 챕터에서 가장 큰 수치), 오른쪽 설명 종이에 견줄 수치 셋(100px 안팎, 분명히 작게)
  DECK.slide({ id: 'p2-ch09-s07a', notes: NOTES['p2-ch09-s07a'], ...lay(2.1, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '사람이 옮긴 횟수는 0회입니다');
    // 숫자 종이 990×700(약 69만px²). 「0」은 Anton, 「회」는 본문 서체로 숫자 높이의 0.4배
    const NW = 990;
    const bn = T.bigNum(el, { x: 120, y: 280, w: NW, h: 700, value: '0', unit: '회', size: 460, caption: '사람이 복사해 옮긴 횟수', at: 0.3, rot: -0.8 });
    const unit = bn.el.querySelector('span'); if (unit) css(unit, { fontSize: '.4em', marginLeft: '.06em' });
    const cap = bn.el.querySelector('.p2-in > div > div:nth-child(2)'); if (cap) css(cap, { fontSize: '46px', color: C.ink, marginTop: '6px' });
    const was = T.tag(el, '8장 · 5회 또는 7회', { x: 94, y: 912, size: 40, tone: 'lemon', rot: -3, at: 1.6, seed: 4.4 });
    // 설명 종이: 세 항목(큰 수치 + 이름)과 흐린 줄. 종이 높이에 고르게 놓고, 수치는 묶음이 드는 가장 큰 크기(112px 부터)
    const SX = 120 + NW + 50, SWd = 1800 - SX, SY0 = 280, SHh = 700, PXs = 46;
    const sp = T.paper(el, { x: SX, y: SY0, w: SWd, h: SHh, tone: 'cream', rot: 0.8, at: 0.8, seed: 9.9 });
    const U = u => `<span style="font-family:var(--body);font-weight:700;font-size:.5em;margin:0 .1em 0 .06em">${u}</span>`;
    const GRP = [['12 / 12', '최종 통과'], [`3${U('분')} 19${U('초')}`, '걸린 시간'], [`28${U('회')}`, '파일로 주고받은 횟수', '초안 14개 + 판정 14개']];
    const col = line(sp.inner, '', { position: 'absolute', left: px(PXs), right: px(PXs), top: '34px', bottom: '34px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: C.ink });
    const grps = GRP.map(([n, nm, dim], i) => {
      const g = line(col, '', i ? { borderTop: '3px dashed rgba(30,22,16,.28)', paddingTop: '14px' } : {});
      const nn = line(g, n, { fontFamily: 'var(--num)', lineHeight: 1.02, whiteSpace: 'nowrap', transformOrigin: '0 70%' });
      line(g, nm, { fontSize: '40px', fontWeight: 700, lineHeight: 1.25, marginTop: '4px', color: C.dim });
      if (dim) line(g, dim, { fontSize: '36px', lineHeight: 1.3, marginTop: '2px', color: C.dim });
      return { g, nn };
    });
    let NS = 112;
    for (; NS >= 80; NS -= 4) { grps.forEach(x => css(x.nn, { fontSize: px(NS) })); if (col.scrollHeight <= col.clientHeight + 1) break; }
    if (col.scrollHeight > col.clientHeight + 1) console.warn('[DECK] s07a 설명 종이 글자가 넘친다');
    return [bg, tp, bn, sp, ...grps.map((x, i) => rise(x.g, 0.95 + i * 0.15, { from: 1.05 })), was];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s08 좌우 대비: 왼쪽 크림 「지침 1판」, 오른쪽 초록 「지침 2판」. 종이마다 번호 조각, 1차 판정 12칸 표(크림 바탕, 도장 100px), 세 줄.
  // 두 종이 위쪽 가운데에 레몬 꼬리표. 왼쪽 종이에 주홍은 쓰지 않는다
  DECK.slide({ id: 'p2-ch09-s08', notes: NOTES['p2-ch09-s08'], ...lay(3.4, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '지침을 고치니 1차 판정에서 12개 통과');
    const st = band(el, '다시 쓰기는 초안만 고치고 지침은 그대로 · 지침 1판 그대로면 같은 실패가 다시 나옵니다');
    const VY = 340, VW = 800, VH = 640, GAP = 80, PXv = 44;
    const SIDES = [
      { tone: 'cream', num: '1판', numTone: 'lemon', title: '지침 1판', all: false, at: 0.3, s0: 0.6, lineAt: 1.25,
        lines: ['1차 판정 통과 10개', 'T06·T12 다시 쓰기 1회 뒤 통과', '3분 19초 · 파일 28회'] },
      { tone: 'green', num: '2판', numTone: 'green', title: '지침 2판', all: true, at: 1.5, s0: 1.8, lineAt: 2.5,
        lines: ['1차 판정 통과 12개', '다시 쓰기 0회', '1분 49초 · 파일 24회'] },
    ];
    const parts = [];
    SIDES.forEach((d, i) => {
      const x = 120 + i * (VW + GAP), y = VY + (i ? 8 : 0), rot = i ? 0.8 : -0.8, ink = i ? C.cream : C.ink;
      const pp = T.paper(el, { x, y, w: VW, h: VH, tone: d.tone, rot, at: d.at, seed: 5.5 + i });
      // 번호 조각은 종이 바깥쪽 위 모서리(왼쪽 종이는 왼쪽, 오른쪽 종이는 오른쪽)에 둔다. 두 종이 사이 위쪽은 레몬 꼬리표 자리다
      const chip = numChip(pp.el, d.num, { x: 0, y: -30, size: 64, tone: d.numTone, rot: i ? 4 : -5, at: d.at + 0.1, seed: 7 + i });
      css(chip.el, { left: px(i ? VW - chip.w + 24 : -24) });
      const TX0 = i ? PXv : chip.w + 4;
      const tt = line(pp.inner, d.title, { position: 'absolute', left: px(TX0), top: '30px', fontSize: '60px', fontWeight: 700, lineHeight: 1.1, color: ink, whiteSpace: 'nowrap', transformOrigin: '0 50%' });
      const tg = T.tag(pp.el, '1차 판정', { x: TX0 + tt.offsetWidth + 26, y: 0, size: 36, tone: 'kraft', rot: i ? -1.5 : 1.5, at: d.at + 0.15, seed: 3.3 + i });
      css(tg.el, { top: px(30 + (tt.offsetHeight - tg.h) / 2) });
      // 12칸 표(크림 바탕): 칸 약 178×102, 도장 100px(글자 30px)
      const TX = PXv, TY = 118, TW = VW - 2 * PXv, TH = 306, cw = TW / 4, ch = TH / 3;
      const tb = line(pp.inner, '', { position: 'absolute', left: px(TX), top: px(TY), width: px(TW), height: px(TH), display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(3, 1fr)',
        background: C.cream, boxShadow: `0 0 0 3px ${C.white}, 0 3px 8px rgba(30,22,16,.25)`, borderTop: '2px solid rgba(30,22,16,.22)', borderLeft: '2px solid rgba(30,22,16,.22)' });
      const order = [...Array(12).keys()].filter(k => !RE.includes(k)).concat(RE);
      for (let k = 0; k < 12; k++) {
        const c = line(tb, '', { borderRight: '2px solid rgba(30,22,16,.22)', borderBottom: '2px solid rgba(30,22,16,.22)', color: C.ink });
        const re = RE.includes(k), sAt = d.s0 + order.indexOf(k) * 0.05 + (re && d.all ? 0.06 : 0);
        if (re) { const no = line(c, TNO[k], { position: 'absolute', left: '10px', top: '6px', fontFamily: 'var(--num)', fontSize: '36px', lineHeight: 1 }); parts.push(rise(no, d.at + 0.2, { from: 1.08 })); }
        if (!re || d.all) parts.push(passStamp(c, { x: re ? cw - 100 - 4 : (cw - 100) / 2, y: (ch - 100) / 2, size: 100, at: sAt, rot: -12 + (k % 4) * 6 }));
        else { const sl = T.tag(c, '다시 쓰기', { x: 0, y: 44, size: 36, tone: 'cream', rot: -2.5, at: sAt, seed: 5 + k }); css(sl.el, { left: px((cw - sl.w) / 2) }); parts.push(sl); }
      }
      // 세 줄: 표 아래 남는 자리에 드는 가장 큰 글자(52px 부터)
      const lc = line(pp.inner, '', { position: 'absolute', left: px(PXv), right: px(PXv), top: px(TY + TH + 14), bottom: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', color: ink });
      const ls = d.lines.map(t => line(lc, t, { lineHeight: 1.2, whiteSpace: 'nowrap', fontWeight: 700, transformOrigin: '0 50%' }));
      let LS = 52;
      for (; LS >= 36; LS -= 2) { ls.forEach(n => css(n, { fontSize: px(LS) })); if (lc.scrollHeight <= lc.clientHeight + 1 && ls.every(n => n.scrollWidth <= TW)) break; }
      if (lc.scrollHeight > lc.clientHeight + 1) console.warn(`[DECK] s08 ${d.title} 세 줄이 종이 아래로 넘친다`);
      parts.unshift(pp, chip, tg, rise(tt, d.at + 0.12), rise(tb, d.at + 0.18, { from: 1.03, rot: 0 }));
      parts.push(...ls.map((n, k) => rise(n, d.lineAt + k * 0.12)));
    });
    const same = T.tag(el, '같은 12개 · 미리 실행한 결과(2026-11-23)', { x: 0, y: 0, size: 36, tone: 'lemon', rot: -1.2, at: 2.9, seed: 8.1 });
    place(same, 120 + VW + GAP / 2, VY - 2);
    return [bg, tp, st, ...parts, same];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s09 채점 기준(정리 두 줄): 왼쪽 열에 정리 띠 두 장(초록 번호), 결과표 마지막 줄 인쇄물, 넘기는 질문. 오른쪽 열에 규정집 사진 조각과 「대조」 카드
  DECK.slide({ id: 'p2-ch09-s09', notes: NOTES['p2-ch09-s09'], ...lay(2.5, el => {
    const bg = T.bg(el, 'base');
    const tp = top(el, '결과표가 나오면 실행이 끝납니다');
    const LW = 1000;
    const ck = T.checklist(el, { x: 120, y: 270, w: LW, size: 44, gap: 16, numTone: 'green', at: 0.3, each: 0.2,
      items: ['옮긴 횟수: 8장 5회·7회, 시연 0회', '쓸지는 결과표를 읽은 사람이 정합니다'] });
    const nq = T.nextQ(el, { x: 120, bottom: 980, w: LW, text: '시험을 통과한 프로젝트를 팀 동료가 써도 된다고 누가, 무엇을 보고 정하는가', at: 1.8 });
    const PY = ck.bottom + 30, PH = nq.y - 22 - PY;
    const po = printout(el, { x: 120, y: PY, w: LW, h: PH, head: '미리 실행한 결과표.md(2026-11-23) 마지막 줄', headSize: 34, at: 0.8, justify: 'center', pad: '10px 26px 12px' });
    const qt = line(po.body, '팀은 여기서 멈춘다. 지침을 고칠지, 이 상담 프로젝트를 쓸지는 사람이 정한다.', { lineHeight: 1.36, textWrap: 'balance' });
    let QS = 48;
    for (; QS >= 40; QS -= 2) { css(qt, { fontSize: px(QS) }); if (po.body.scrollHeight <= po.body.clientHeight + 1) break; }
    if (po.body.scrollHeight > po.body.clientHeight + 1) console.warn('[DECK] s09 인용 인쇄물 글자가 넘친다');
    // 오른쪽 열
    const RX = 1160, RW = 1800 - RX;
    const CY = 290, CHh = 980 - CY;
    const cd = T.card(el, { x: RX, y: CY, w: RW, h: CHh, pad: 40, layout: true, title: '대조', titleSize: 60, rot: -0.8, at: 1.2,
      body: '<div class="c9-v">T06 경차 2시간 40분 · 두 번째 초안 · <span class="u9">2,450원</span></div>' +
        '<div class="c9-v" style="margin-top:22px;padding-top:22px;border-top:3px dashed rgba(30,22,16,.25)">규정으로 다시 계산 · 1,000 + 13 × 300 = 4,900원 → 경차 50% 감면 → <span class="u9" style="white-space:nowrap">2,450원</span></div>' });
    // 규정집 사진 조각: 「대조」 카드 오른쪽 위 모서리에 겹쳐 붙인다
    const bd = T.cutout(el, IMG + 'p2-key-binder_cut.png', { x: 1548, y: 236, w: 250, h: 170, rot: 4, at: 1.0, fallback: 'binder' });
    const bdT = T.tape(el, { x: 1630, y: 226, w: 110, rot: -8, at: 1.1 });
    const vs = [...cd.el.querySelectorAll('.c9-v')];
    let VS = 54;
    for (; VS >= 36; VS -= 2) { vs.forEach(v => css(v, { fontSize: px(VS), lineHeight: 1.4, wordBreak: 'keep-all' })); if (cd.flow.offsetTop + cd.flow.offsetHeight <= CHh - 40) break; }
    if (cd.flow.offsetTop + cd.flow.offsetHeight > CHh - 40) console.warn('[DECK] s09 대조 카드 글자가 넘친다');
    // 「2,450원」 아래 초록 밑줄(카드 안 좌표로 잰다). 왼쪽에서 오른쪽으로 그어진다
    const uls = [...cd.el.querySelectorAll('.u9')].map(sp => {
      const r = rectIn(sp, cd.el);
      return line(cd.el, '', { position: 'absolute', left: px(r.x), top: px(r.y + r.h - 2), width: px(r.w), height: '8px', background: C.green, transformOrigin: '0 50%' });
    });
    return [bg, tp, ck, po, rise(qt, 0.95, { from: 1.03 }), cd, bd, bdT, ...vs.map((v, i) => rise(v, 1.35 + i * 0.12, { from: 1.03 })),
      { render(lt) { uls.forEach((u, i) => { const p = REEL.prog(lt, 1.5 + i * 0.15, 0.4, REEL.ease.inOutCubic); u.style.opacity = p > 0 ? '1' : '0'; u.style.transform = `scaleX(${p.toFixed(4)})`; }); } },
      nq];
  }) });
})();
