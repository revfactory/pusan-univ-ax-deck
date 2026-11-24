/* 파트 2 · 8장 「실습: 검토 프로젝트로 답변 초안 검토하기」(LAB-5) — 레이아웃 목록(p2.md 8절)으로 다시 만든 장면 코드
 * 원고: plan/slides/p2-ch08.json(12장) · 배정표: plan/assets/p2_layout_ch08.md · 본보기: deck/p2/ch00.js, 시범 챕터 deck/p2/ch06.js
 * 키 누름은 s08(옮긴 횟수를 센 뒤 표의 횟수와 5회·7회·50회를 연다) 한 장에 한 번이다. 나머지 장은 조각이 차례로 놓여 3초 안에 끝 상태가 된다.
 * s05a 의 넘김 카드는 키 없이 1.8초부터 0.15초 간격으로 넘어간다.
 * 캡처(deck/assets/p2/shots/)가 아직 없어 s04·s07 의 화면은 THEME.shot 의 그린 화면이다. 캡처가 들어오면 각 장의 [캡처] 주석 자리에서 src 로 바꾼다.
 * 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다. */
(function () {
  'use strict';
  const { css, h, prog, ease, lerp } = REEL;
  const CH = '실습: 검토 프로젝트로 답변 초안 검토하기';
  DECK.config({ part: 'p2', chapter: 'ch08', title: CH });

  const NOTES = {
    "p2-ch08-s01": "7장에서는 정하준 대리가 채점을 누가 했는지 물었고, 검토자를 따로 두어야 하는 이유를 보았습니다. 이번 장은 실습입니다. ChatGPT Plus 안에서 그 검토자를 어떻게 따로 두는지 여러분이 직접 만들어 봅니다.",
    "p2-ch08-s02": "한서윤 주임은 「새별 민원 상담」과 따로, 검토만 하는 프로젝트 「새별 답변 검토」를 하나 더 만듭니다. 프로젝트 지침은 그 프로젝트 안에서만 적용되므로, 검토 프로젝트에서는 민원 상담 프로젝트의 지침이 아니라 검토 지침대로 판정합니다. 검토할 초안은 lab5 폴더 검토할_초안.md의 A, B, C 세 건이고, 민원 상담 프로젝트가 썼다고 가정한 가상 초안입니다. 그 가운데 초안 B는 파트 1 9장에서 검토가 위약금 6,000원이 빠졌다며 다시 쓰기로 판정한 수영 강습 초안입니다. 오늘도 실습 묶음의 가상 자료만 입력합니다.",
    "p2-ch08-s03": "4장에서 「새별 민원 상담」을 만든 순서와 같습니다. 첫째로 사이드바의 새 프로젝트를 눌러 이름을 「새별 답변 검토」로 정합니다. 둘째로 lab5 폴더의 검토_지침.md를 메모장이나 텍스트 편집기로 열어 ```text 줄과 ``` 줄 사이 글만 복사하고, 프로젝트 설정의 지침 칸에 붙여 넣어 저장합니다. 이 지침에는 초안을 고쳐 쓰지 말고 판정과 이유만 쓰라는 줄과 금액·근거·개인정보·형식·범위 다섯 항목을 확인하라는 줄이 있습니다. 셋째로 프로젝트 파일에 자료 폴더의 새별_체육시설_이용규정.md와 새별_공영주차장_운영지침.md 두 개만 올리고, 사이드바에 프로젝트가 두 개 보이면 됩니다. (강사 확인: 새 프로젝트, 프로젝트 설정, 지침 칸, 프로젝트 파일의 화면 이름은 강의 전날 K-03·K-14에서 확인하고, 다르면 화면에 나온 이름으로 말합니다.)",
    "p2-ch08-s04": "검토 프로젝트 안에서 새 대화를 열고, lab5 폴더의 검토할_초안.md에서 「초안 A」 상자를 ```text 줄과 ``` 줄 사이만 통째로 복사해 붙여 넣고 보냅니다. 상자 안에 원 민원과 초안이 함께 들어 있어서 따로 덧붙일 글은 없습니다. 초안 B와 초안 C도 각각 새 대화를 열어 같은 방법으로 보냅니다. 화면의 답은 강사가 codex로 검토 프로젝트를 흉내 내어 초안마다 두 번 보내 받은 예 가운데 하나이고, 여러분 화면의 문장은 다를 수 있습니다. 검토 프로젝트가 초안을 고쳐 써 주면 지침이 저장되었는지 보고, 검토 프로젝트 안에서 새 대화를 다시 엽니다.",
    "p2-ch08-s05": "판정기록_양식.md를 메모장이나 텍스트 편집기로 엽니다. 먼저 내 화면의 답에서 판정, 틀렸다고 한 항목, 검토 프로젝트가 다시 계산한 금액을 초안마다 1~3번 칸에 옮겨 적습니다. 4번 칸의 금액은 내가 직접 확인하는데, 초안 A는 lab4/시험표.md의 T06과 같은 민원이고 B와 C는 자료 폴더 체육시설 이용규정의 제7조 제1항으로 계산합니다. 그 금액과 틀렸다고 한 항목을 보고 5번 칸에 판정에 동의하는지 적습니다. B가 통과로 나오면 「금액을 규정 제7조 제1항 제2호로 직접 다시 계산해 줘」를 보내고, 그 화면을 판정 기록에 「검토 프로젝트가 놓친 것」으로 적어 주세요. (화면에서 옮긴 문구: 「여는 프로그램 · 메모장(Windows) · 텍스트 편집기(macOS) · 같은 이름으로 저장」)",
    "p2-ch08-s05a": "양식을 채운 뒤 내 화면의 판정을 카드 뒷면과 맞춰 봅니다. 기대 판정은 A 통과, 위약금 6,000원을 빼지 않은 B 다시 쓰기, 답변에 이름과 전화번호가 남은 C 다시 쓰기입니다. B와 C에는 범위 지적이 함께 붙어도 맞습니다. B는 규정과 다른 40,000원을 약속했다는 지적이고, C는 재연락 약속이나 결제 수단을 확인하지 않은 환불 안내에 대한 지적입니다. 강사가 codex로 초안마다 두 번씩 돌렸을 때는 두 번 모두 이 판정이었지만 여러분 화면은 다를 수 있습니다(ChatGPT 화면은 강사 사전 확인 K-14).",
    "p2-ch08-s06": "다시 쓰기를 받은 초안 B를 「새별 민원 상담」 프로젝트로 가져갑니다. 먼저 새 메모장 창, macOS는 텍스트 편집기의 새 문서를 열고 검토할_초안.md 아래쪽 「다시 쓰기 요청」 상자 안 글을 붙여 넣습니다. 채우는 동안 여러 대화를 오가며 복사해 와야 해서 입력창이 아니라 메모장에서 채웁니다. 민원 상담 프로젝트를 만들지 못한 분은 오른쪽 쪽지대로 프로젝트 밖 새 대화에 자료 폴더 파일 3개를 첨부하고 지침_2판.md의 상자 안 글을 첫 메시지로 보냅니다. 그리고 같은 대화에 메모장에서 채운 글을 보냅니다.",
    "p2-ch08-s06a": "괄호 줄 세 개를 하나씩 지우고 그 자리에 붙여 넣습니다. ①과 ②는 같은 파일의 「초안 B」 상자에서 [원 민원] 네 줄과 [초안] 다섯 줄을 복사합니다. ③은 사이드바의 「새별 답변 검토」에서 4번에 초안 B를 보낸 대화를 열어 [고칠 내용] 뒤 문장만 복사해 옵니다. (화면에서 옮긴 문구: 「[고칠 내용] 환불액을 34,000원으로 수정하고, 계산 칸에 남은 8회분 40,000원에서 위약금 6,000원을 빼는 식을 적어 주세요.」) (화면에서 지운 주석: 「강사 사전 실행 예: codex 2회(2026-11-23)」)",
    "p2-ch08-s06b": "다 채운 글을 통째로 복사해 「새별 민원 상담」 프로젝트 안의 새 대화에 붙여 넣고 보냅니다. [계산] 칸에 40,000원 − 6,000원 = 34,000원이 있으면 됩니다. 화면의 답은 강사가 codex로 지침 2판 상담 프로젝트를 흉내 내어 한 번 받은 예라서 여러분 화면의 문장은 다를 수 있습니다.",
    "p2-ch08-s07": "다시 쓴 초안을 「새별 답변 검토」 프로젝트로 가져갑니다. 6번과 같은 방법으로 새 메모장 창에 검토할_초안.md 맨 아래 「다시 검토 요청」 상자 안 글을 붙여 넣습니다. 맨 윗줄 [다시 쓰기 횟수] 1회는 그대로 두고, [원 민원]은 「초안 B」 상자에서, [초안]은 6번에서 받은 다시 쓴 답 전체에서 복사해 괄호 자리에 붙여 넣습니다. 다 채운 글을 통째로 복사해 검토 프로젝트 안의 새 대화에 붙여 넣고 보냅니다. 기대 결과는 통과이고, 시간이 남는 분은 초안 C도 6번과 7번을 해 봅니다. 다시 쓰기가 또 나오면 새 [고칠 내용]으로 6번을 한 번 더 하고, 다시 검토할 때 맨 윗줄을 [다시 쓰기 횟수] 2회로 고칩니다. 판정 기록에도 그 초안 줄을 하나 더 만들고 횟수 칸에 2를 적습니다. 다시 쓰기는 한 초안에 2회까지라서, 2회 다시 써도 다시 쓰기가 나오면 검토 프로젝트가 사람에게 넘김으로 판정하고 그 초안은 담당자가 직접 씁니다. 통과가 나와도 답 끝 [알림]에 적힌 대로 발송 승인은 아니고, 발송은 오민석 팀장이 정합니다.",
    "p2-ch08-s08": "판정 기록 맨 아래 「복사해 옮긴 횟수」 표에 적고, 프로젝트에 붙여 넣어 보낸 요청 하나를 1회로 셉니다. (키) 초안 행에는 민원 상담 프로젝트가 썼다고 가정한 검토할_초안.md에서 초안 A·B·C를 검토 프로젝트로 옮긴 3회를 적습니다. 초안 B만 다시 썼다면 초안 3회, 검토 의견 1회, 다시 쓴 초안 1회로 5회이고, 초안 C까지 다시 썼다면 7회입니다. 5회인 분, 7회인 분 차례로 손을 들어 주세요. 양식 맨 아래 칸에는 민원이 하루 30건이고 그 가운데 3분의 1이 다시 쓰기를 한 번 받는다고 가정할 때의 하루 횟수를 적습니다. 이 가정은 실습 묶음이 정한 것이고, 2장의 민원 목록에서 나온 숫자가 아닙니다. 이 가정이면 30회에 10건 × 2회를 더해 50회이고, 이 횟수는 9장 시연에서 다시 비교합니다.",
    "p2-ch08-s09": "ChatGPT Plus 안에서 검토자를 따로 두는 방법은 지침이 다른 프로젝트를 하나 더 만드는 것이었습니다. 검토 프로젝트는 초안을 고쳐 쓰지 않고 판정과 이유만 썼고, 다시 쓰기는 2회까지이며 통과는 발송 승인이 아니라는 규칙도 검토 지침에 들어 있었습니다. 그런데 초안과 검토 의견을 두 프로젝트 사이로 옮긴 것은 여러분이었고, 초안 B만 다시 써도 5회였습니다. 9장에서는 두 프로젝트를 작성 에이전트와 검토 에이전트로 바꾸고, 초안과 판정을 프로그램이 파일로 넘겨 사람이 옮기지 않게 할 수 있는지 강사 시연으로 봅니다.",
  };

  const C = THEME.C;
  // 파일 이름·기호는 고정폭 서체로, 한 덩어리로 쓴다(밑줄 뒤에서 줄이 갈리지 않게). 긴 경로는 「자료/」 뒤에 <wbr> 을 둔다
  const M = t => THEME.mono(t).replace('<span style="', '<span style="white-space:nowrap;');
  const INK = { cream: C.ink, white: C.ink, lemon: C.ink, kraft: C.ink, red: '#FFFFFF', green: C.cream, dark: C.cream };
  const px = v => (typeof v === 'number' ? v.toFixed(1) + 'px' : v);
  const DIM = t => `<span style="color:var(--dim)">${t}</span>`;

  // 슬라이드 하나: build(el) 가 돌려준 부품을 차례로 그린다. 부품은 모두 render(lt, ctx) 를 가진다
  const lay = (dur, build, steps) => ({ dur, steps: steps || [],
    setup(el) { this.parts = build.call(this, el).filter(Boolean); },
    render(lt, ctx) { this.parts.forEach(p => p.render(lt, ctx)); } });
  const top = (el, title, step) => THEME.top(el, { chapter: 8, chapterTitle: CH, title, step, fiction: true });
  const anim = fn => ({ render: fn });
  // 단계 표시 줄(「n / 8」)의 오른쪽 끝 x. 제목 아래 띠는 이 뒤에 놓아 표시 줄을 가리지 않는다
  const rowEnd = el => { const r = el.querySelector('.p2-step-row'); return r ? Math.ceil(posIn(r, el).x + posIn(r, el).w) : 566; };
  // 제목 아래 띠가 표시 줄 오른쪽(x 약 670~1800)에 한 줄로 들지 않으면 「 · 」 자리에서 두 줄로 쓴다(y 188~292, 화면 인쇄물 위 끝 y 300 앞)
  const band2 = (el, html, o = {}) => THEME.strip(el, html, Object.assign({ x: rowEnd(el) + 24, y: 188, size: 36, weight: 700, lh: 1.22, rot: -0.4, at: 0.25, padY: 8 }, o));

  // 요소의 위치를 다른 요소 기준 px 로 잰다(무대 배율을 되돌린다)
  function posIn(node, base) {
    const a = node.getBoundingClientRect(), b = base.getBoundingClientRect(), k = b.width / base.offsetWidth;
    return { x: (a.left - b.left) / k, y: (a.top - b.top) / k, w: a.width / k, h: a.height / k };
  }

  // 숫자 조각: 색지에 Anton 숫자. o.reveal 이면 키 누름 뒤처럼 1.22배·큰 그림자에서 0.45초 동안 붙는다
  function chip(parent, text, o = {}) {
    const tone = o.tone || 'lemon', size = o.size ?? 64;
    const tx = h('div', '', parent, text);
    css(tx, { position: 'absolute', left: '0', top: '0', fontFamily: 'var(--num)', fontSize: px(size), lineHeight: 1.1, whiteSpace: 'nowrap' });
    const w = o.w ?? Math.ceil(tx.offsetWidth + 2 * (o.padX ?? 18)), hh = o.h ?? Math.ceil(tx.offsetHeight + 2 * (o.padY ?? 4));
    const rot = o.rot ?? -3, at = o.at ?? 0;
    const pp = THEME.paper(parent, { x: o.x ?? 0, y: o.y ?? 0, w, h: hh, tone, rot, at, k: o.k ?? 0.6, seed: o.seed });
    pp.inner.appendChild(tx);
    css(tx, { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: INK[tone], paddingTop: px(size * 0.04) });
    return { el: pp.el, w, h: hh, render(lt) {
      if (o.reveal) THEME.lift(pp.el, lt, at, { rot, shadowEl: pp.face, k: 1.5, dur: 0.45, from: 1.22 });
      else pp.render(lt);
    } };
  }

  // 번호 조각(순서 조각의 왼쪽 위)
  const numPiece = (parent, n, at, tone = 'red') => chip(parent, String(n), { x: -16, y: -24, w: 84, h: 91, size: 60, tone, rot: -5, at, k: 0.6 });

  // 순서 조각 한 줄: 조각마다 위에 할 일(굵게)과 보조 줄, 아래 끝에 붙인 종이(bottom). 조각 폭은 widths 로 따로 준다
  // items: [{ n, title(HTML), subs:[HTML], bottom(parentEl, innerW, at) → { el, h, render } }]
  function pieceRow(el, o) {
    const gap = o.gap ?? 36, PX = o.pad ?? 30, at0 = o.at ?? 0.3, each = o.each ?? 0.2;
    let x = o.x ?? 120;
    const parts = o.items.map((d, i) => {
      const w = o.widths[i], hh = o.h, y = o.y + (o.stagger ? o.stagger[i] : 0), at = at0 + i * each, rot = [-0.8, 0.6, -0.5][i % 3];
      const pp = THEME.paper(el, { x, y, w, h: hh, tone: 'cream', rot, at, seed: 7.3 + i });
      const flow = h('div', '', pp.inner);
      css(flow, { position: 'absolute', left: px(PX), top: px(o.top ?? 30), width: px(w - 2 * PX), wordBreak: 'keep-all', color: C.ink });
      const tt = h('div', '', flow, d.title);
      css(tt, { fontSize: px(o.titleSize ?? 40), fontWeight: 700, lineHeight: 1.3, textIndent: '60px' });   // 번호 조각을 비킨다
      (d.subs || []).forEach(s => { const sd = h('div', '', flow, s); css(sd, { fontSize: px(o.subSize ?? 34), lineHeight: 1.38, marginTop: px(o.subGap ?? 12), color: o.subColor || C.dim }); });
      const bot = d.bottom ? d.bottom(pp.el, w - 2 * PX, at + 0.3) : null;
      if (bot) css(bot.el, { left: px(PX), top: px(hh - (o.botPad ?? PX) - bot.h) });
      const used = (o.top ?? 30) + flow.offsetHeight + (bot ? bot.h + (bot.lift ?? 0) + 16 : 0) + (o.botPad ?? PX);
      if (used > hh) { console.warn(`[DECK] 순서 조각 글자가 넘친다(${Math.round(used - hh)}px): ${d.title.replace(/<[^>]+>/g, '').slice(0, 30)}`); pp.el.style.outline = '6px dashed #FF00AA'; }
      const np = numPiece(pp.el, d.n, at + 0.1);
      const out = { x, y, w, h: hh, el: pp.el, used, render(lt) {
        pp.render(lt); np.render(lt);
        THEME.lift(flow, lt, at + 0.15, { shadow: false, dur: 0.4, from: 1.03 });
        if (bot) bot.render(lt);
      } };
      x += w + gap;
      return out;
    });
    return { parts, render(lt) { parts.forEach(p => p.render(lt)); } };
  }

  // 그린 화면의 글자 키우기: 주소 줄과 사이드바를 32px 이상으로
  function screenFonts(frame, sideW) {
    const url = frame.el.querySelector('.kit-url'); if (url) css(url, { fontSize: '32px' });
    const sd = frame.body.querySelector('.p2-side');
    if (sd) { css(sd, { width: px(sideW), fontSize: '32px' }); }
  }
  // 그린 대화: 사용자 말풍선(오른쪽)과 답(왼쪽). 줄마다 div. 글자 32px
  function chatIn(main, o) {
    const wrap = h('div', '', main);
    css(wrap, { position: 'absolute', left: '26px', right: '26px', top: '18px', fontSize: px(o.size ?? 32), lineHeight: 1.28, color: C.ink, wordBreak: 'keep-all' });
    const ub = h('div', '', wrap);
    css(ub, { marginLeft: 'auto', width: 'fit-content', maxWidth: px(o.userW ?? 700), background: '#EEE6D8', borderRadius: '26px', padding: '14px 26px', boxSizing: 'border-box' });
    const uLines = o.user.map(t => h('div', '', ub, t));
    const ab = h('div', '', wrap); css(ab, { marginTop: px(o.gap ?? 62), padding: '0 6px' });
    const aLines = o.ai.map((t, i) => { const d = h('div', '', ab, t); if (i) css(d, { marginTop: '10px' }); return d; });
    if (o.firstGap) css(uLines[0], { marginBottom: px(o.firstGap) });
    return { wrap, ub, ab, uLines, aLines };
  }

  // ─────────────────────────────────────────────────────────────
  // s01 전환: p2-tr-swap 을 좌우 반전해 깔고(plan/assets/p2_video_map.json: p2-ch08-s01-tr-swap → p2-tr-swap) 오른쪽 크림 띠에 꼬리표, 음절 조각 제목, entry 질문
  DECK.slide({ id: 'p2-ch08-s01', notes: NOTES['p2-ch08-s01'], ...lay(2.6, el => [
    THEME.videoTitle(el, {
      kind: 'chapter', scene: 'swap', flip: true, kicker: '파트 2 · 8장',
      src: '../assets/video/p2/p2-tr-swap.mp4', poster: '../assets/video/p2/p2-tr-swap.jpg',
      title: '실습: 검토 프로젝트로\n답변 초안 검토하기', sub: 'ChatGPT Plus 안에서 검토자를 어떻게 따로 두는가',
    }),
  ]) });

  // ─────────────────────────────────────────────────────────────
  // s02 인물과 대사: 한서윤 주임(1.9배)과 대사 종이. 대사 종이 아래에 답변 초안 종이 세 장과 초안 B 에 붙인 레몬 조각
  DECK.slide({ id: 'p2-ch08-s02', notes: NOTES['p2-ch08-s02'], ...lay(2.2, el => {
    const bg = THEME.bg(el, 'base');
    const tp = top(el, '검토만 하는 프로젝트를 하나 더 둡니다');
    const sp = THEME.speech(el, { who: 'han', scale: 1.9, x: 130, org: true, size: 72, at: 0.25, bubble: { x: 740, y: 310, w: 1060 },
      text: '지침이 다른 프로젝트에\n판정을 맡기겠습니다.',
      sub: '<b>「새별 민원 상담」</b>: 초안을 씁니다<br><b>「새별 답변 검토」</b>: 판정과 이유만 씁니다' });
    const rule = THEME.strip(el, '실습 규칙 1 · 실습 묶음의 가상 자료만 입력합니다', { x: 740, y: 238, size: 34, weight: 700, tone: 'lemon', rot: -0.6, at: 0.2, padY: 10 });
    // 초안 종이 세 장: 대사 종이 아래 가장자리에 걸쳐 놓는다(이름표는 대사 보조 줄 아래, 종이 아래 끝은 y 975)
    const by = 310 + sp.el.offsetHeight, sy = by - 16, sh = 975 - sy, sw = Math.round(sh / 1.3);
    const sheets = [['초안 A', 770, -3], ['초안 B', 1010, 2], ['초안 C', 1800 - sw, -1.5]].map(([t, x, r], i) => {
      const th = THEME.thing(el, 'sheet', { x, y: sy + (i === 1 ? 8 : 0), w: sw, h: sh, rot: r, at: 1.0 + i * 0.12 });
      const tg = THEME.tag(el, t, { x: x - 10, y: sy - 30, size: 36, tone: 'cream', rot: r * 0.6 - 1, at: 1.1 + i * 0.12 });
      return { th, tg };
    });
    // 레몬 조각: 초안 B 종이 오른쪽 가장자리에서 초안 C 쪽으로 걸친다(두 줄). 왼쪽 끝을 테이프로 B 종이에 붙인다
    const LX = 1010 + sw - 70, LY = sy + Math.round(sh * 0.42);
    const lem = THEME.strip(el, '파트 1 9장에서 본 초안 ·<br>위약금 누락', { x: LX, y: LY, size: 36, weight: 700, tone: 'lemon', rot: -1.5, at: 1.5, padY: 12, lh: 1.3 });
    const tape = THEME.tape(el, { x: LX - 44, y: LY + 30, w: 96, rot: -62, at: 1.6 });
    return [bg, tp, sp, rule, ...sheets.flatMap(s => [s.th, s.tg]), lem, tape];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s03 순서 조각(셋): ① 사이드바 ② 지침 칸 ③ 프로젝트 파일. 조각 위쪽에 할 일과 보조 줄, 아래쪽에 화면 한 부분을 작게 그린 흰 종이
  DECK.slide({ id: 'p2-ch08-s03', notes: NOTES['p2-ch08-s03'], ...lay(2.2, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '「새별 답변 검토」 프로젝트를 만듭니다', [3, 8, 1]);
    // 단계 표시 줄을 비켜 그 오른쪽에 띠를 둔다
    const band = THEME.strip(el, '4장과 같은 순서, 지침과 파일만 다릅니다', { x: rowEnd(el) + 28, y: 204, size: 36, weight: 700, rot: -0.5, at: 0.25, padY: 10 });
    // 이름표는 쪽지 위로 30px 걸쳐 나온다. 위 글과 겹치지 않게 그만큼(lift)을 조각 높이 계산에 넣는다
    const mini = (html, label, size = 36, padY = 18) => (parent, w, at) => {
      const n = THEME.note(parent, { x: 0, y: 0, w, tone: 'white', size, padX: 20, padY, label, at, html });
      if (label) n.lift = 18;
      return n;
    };
    // 조각 안 빈 자리(ex[i])만큼 아래 쪽지를 키운다: ① 사이드바 줄 높이, ② 입력 칸 아래 여백, ③ 파일 이름 줄 간격
    const build = (parent, ex) => {
      const rp = 11 + Math.floor(ex[0] / 8);
      const row = (t, st) => `<div style="padding:${rp}px 14px;border-radius:10px;white-space:nowrap;${st || ''}">${t}</div>`;
      const sidebar = mini(row('프로젝트', 'font-weight:700;color:var(--dim);padding-left:4px') + row('새 프로젝트') + row('새별 민원 상담') +
        row('새별 답변 검토', 'background:rgba(192,52,31,.16);font-weight:700'), undefined, 40);
      const guide = mini(`<div style="position:relative;border:2px solid rgba(30,22,16,.28);border-radius:12px;padding:8px 16px ${44 + ex[1]}px;line-height:1.34;margin-top:6px">` +
        `# 역할<br>…<br>초안을 고쳐 쓰지 않는다. 판정과 이유만 쓴다.` +
        `<span style="position:absolute;right:12px;bottom:8px;width:120px;height:34px;border-radius:9px;background:${C.dark}"></span></div>`, '지침', 34, 12);
      const fl = Math.round(34 * 1.6 + ex[2] / 2);
      const files = mini(`<div style="margin-top:6px;line-height:${fl}px">${M('새별_체육시설_이용규정.md')}<br>${M('새별_공영주차장_운영지침.md')}</div>`, '프로젝트 파일', 34);
      return pieceRow(parent, { x: 120, y: 300, h: 662, gap: 36, widths: [410, 650, 548], stagger: [0, 12, 0], at: 0.3, each: 0.2,
        titleSize: 44, subSize: 36, subColor: C.ink, items: [
        { n: 1, title: '① 사이드바 → 새 프로젝트 → 이름 <span style="white-space:nowrap">「새별 답변 검토」</span>', bottom: sidebar },
        { n: 2, title: `② 프로젝트 설정 → 지침 칸 → ${M('검토_지침.md')} 상자 안 글 → 저장`,
          subs: [`복사할 범위 · ${M('```text')} 줄과 ${M('```')} 줄 사이`], bottom: guide },
        { n: 3, title: '③ 프로젝트 파일 → 자료 폴더의 규정 2개',
          subs: [`${M('자료/')}<wbr>${M('새별_체육시설_이용규정.md')}<br>${M('자료/')}<wbr>${M('새별_공영주차장_운영지침.md')}`], bottom: files }] });
    };
    // 한 번 재어 본 뒤(임시 상자) 빈 자리를 쪽지에 나눠 다시 만든다
    const tmp = h('div', '', el);
    const probe = build(tmp, [0, 0, 0]);
    const ex = probe.parts.map(p => Math.max(0, Math.floor(p.h - p.used - 6)));
    el.removeChild(tmp);
    const seq = build(el, ex);
    const p3 = seq.parts[2];
    const ok = THEME.tag(el, '기대 결과 · 사이드바에 프로젝트 두 개', { x: 0, y: p3.y + p3.h - 30, size: 34, tone: 'green', rot: -1.2, at: 1.4 });
    css(ok.el, { left: px(1800 - ok.w) });
    return [bg, tp, band, seq, ok];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s04 화면과 카드: 검토 프로젝트 안 새 대화에 초안 A 상자를 보낸 그린 화면(1160×662). 오른쪽 열에 쪽지 두 장과 초록 기대 결과
  // [캡처] deck/assets/p2/shots/p2-ch08-s04.png 가 들어오면 THEME.shot 의 두 번째 인자(src)로 주고 sidebar·draw 를 빼며, 고리는 marks 비율 좌표로 옮긴다
  DECK.slide({ id: 'p2-ch08-s04', notes: NOTES['p2-ch08-s04'], ...lay(3.0, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '초안마다 새 대화를 열어 보냅니다', [4, 8]);
    // body 한 줄(약 1300px)은 표시 줄 오른쪽에 들지 않아 「 · 」 자리에서 두 줄로 쓴다
    const band = band2(el, '「초안 A」 상자를 통째로 붙여 넣습니다 ·<br>초안 B와 C도 각각 새 대화에서 보냅니다');
    const D = {};
    const shot = THEME.shot(el, null, { x: 120, y: 300, w: 1160, h: 662, at: 0.3, url: 'chatgpt.com',
      sidebar: { title: '프로젝트', items: ['새별 민원 상담', '새별 답변 검토'], on: 1 },
      draw(main, frame) {
        screenFonts(frame, 320);
        D.c = chatIn(main, { userW: 720, gap: 66,
          user: ['[원 민원]', '경차로 새별역 공영주차장에 2시간 40분 주차했습니다. 요금이 얼마인가요?', '[초안]', '[민원 요지] 경차 2시간 40분 주차 요금 문의', '…'],
          ai: ['<span style="font-weight:700">[판정] 통과</span>', '[항목별 확인]', '- 금액: 맞음 — 초안의 2,450원과 다시 계산한 금액이 같습니다.'] });
        return [{ node: D.c.ub, n: 1, at: 0.9 }, { node: D.c.aLines[0].firstChild, n: 2, at: 1.4 }];
      } });
    const talk = anim(lt => {
      THEME.lift(D.c.ub, lt, 0.6, { shadow: false, dur: 0.4, from: 1.04 });
      THEME.lift(D.c.ab, lt, 1.1, { shadow: false, dur: 0.4, from: 1.03 });
    });
    // 오른쪽 열(x 1310~1800, 원고 좌표): 쪽지 두 장과 초록 기대 결과
    const RX = 1310, RW = 490;
    const c1 = THEME.callout(el, { x: RX, y: 300, w: RW, tone: 'cream', size: 36, rot: 0, at: 1.6,
      text: `파일 · ${M('lab5/')}<wbr>${M('검토할_초안.md')}<br><span style="font-weight:500">복사할 범위 · ${M('```text')} 줄과 ${M('```')} 줄 사이(상자 하나)</span>` });
    const c2 = THEME.callout(el, { x: RX, y: 300 + c1.h + 22, w: RW, tone: 'cream', size: 36, rot: 0, at: 1.75,
      text: '여는 곳 · 「새별 답변 검토」 안 새 대화' });
    const cy = 300 + c1.h + 22 + c2.h + 22;
    const ok = THEME.card(el, { x: RX, y: cy, w: RW, h: 'fit', minH: 980 - cy, layout: true, pad: 30, tone: 'green', label: '기대 결과',
      body: '[판정] <span style="white-space:nowrap">[항목별 확인]</span> <span style="white-space:nowrap">[다시 계산]</span>이 있는 답', bodySize: 36, rot: 0, at: 1.9 });
    // 화면 왼쪽 아래 모서리: 작은 초안 종이 세 장과 「새 대화 3개」
    const SW = 118, SH = 154, SY = 800;
    const smalls = ['초안 A', '초안 B', '초안 C'].map((t, i) => {
      const x = 92 + i * 112, r = [-5, 3, -2][i], at = 2.1 + i * 0.1;
      const th = THEME.thing(el, 'sheet', { x, y: SY + [0, 14, 4][i], w: SW, h: SH, rot: r, at });
      const lb = THEME.strip(el, t, { x: x - 6, y: SY + [0, 14, 4][i] + 78, size: 34, weight: 700, tone: 'lemon', rot: r * 0.5, at: at + 0.05, padX: 8, padY: 4 });
      return [th, lb];
    }).flat();
    const three = THEME.tag(el, '새 대화 3개', { x: 112, y: SY - 72, size: 34, tone: 'kraft', rot: -2, at: 2.5 });
    return [bg, tp, band, shot, talk, c1, c2, ok, ...smalls, three];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s05 표 한 장: 판정 기록 양식의 1차 판정 표(머리 칸 다섯, 빈 줄 세 줄)를 y 300~약 870 에 크게 둔다. 머리 칸마다 레몬 번호 조각 1~5.
  // 표 아래 가장자리: ①·② 쪽지 한 장(①과 ② 한 줄, 금액 확인 한 줄). 「B가 통과로 나오면」 쪽지는 단계 표시 줄 오른쪽 빈 자리(y 약 184~296)에 둔다
  DECK.slide({ id: 'p2-ch08-s05', notes: NOTES['p2-ch08-s05'], ...lay(2.0, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '내 화면의 답부터 판정 기록에 적습니다', [5, 8]);
    // 아래 쪽지를 먼저 재어 표 높이를 정한다
    const big = 'font-size:40px;font-weight:700;line-height:1.3;white-space:nowrap';
    const steps = THEME.note(el, { x: 120, y: 0, w: 1680, tone: 'cream', size: 34, rot: -0.3, at: 1.0, padX: 34, padY: 16,
      html: `<div style="display:flex;gap:64px"><div style="${big}">① 내 화면의 답 → 1~3번 칸</div><div style="${big}">② 내가 확인한 금액과 동의 여부 → 4·5번 칸</div></div>` +
        `<div style="margin-top:4px">금액 확인 · A는 ${M('lab4/시험표.md')} T06 · B·C는 ${M('자료/')}<wbr>${M('새별_체육시설_이용규정.md')} 제7조 제1항</div>` });
    const SY = 982 - steps.h;
    css(steps.el, { top: px(SY) });
    // 표: 머리 칸 44px(본문 색), 빈 줄 셋은 남는 높이를 나눠 갖는다. 줄 선 2px 진한 색, 칸 사이 세로 선
    const TY = 300, TB = SY + 30;                      // 표 종이 아래 끝은 쪽지 위 끝보다 30px 아래(쪽지가 표 아래 가장자리에 걸친다)
    const tb = THEME.table(el, { x: 120, y: TY, w: 1680, size: 38, headSize: 44, widths: 'auto', pad: [10, 14], fill: false, at: 0.3,
      cols: ['판정(통과·\n다시 쓰기·사람에게 넘김)', '틀렸다고\n한 항목', '검토 프로젝트가\n다시 계산한 금액', '내가 규정으로\n확인한 금액', '판정에\n동의하는가'],
      rows: [['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']] });
    el.appendChild(steps.el);                           // 쪽지를 표 종이 위에 그린다
    const heads = tb.cells.slice(0, 5);
    heads.forEach(c => css(c, { paddingTop: '44px', paddingBottom: '16px', color: C.ink, lineHeight: 1.2, alignItems: 'flex-start' }));
    tb.cells.forEach((c, k) => {
      if (k % 5) css(c, { borderLeft: '2px solid rgba(30,22,16,.3)' });
      if (k >= 5) css(c, { borderBottom: '2px solid rgba(30,22,16,.65)' });
    });
    const headH = heads[0].offsetHeight, RH = Math.floor((TB - TY - 44 - 4 - headH - 30) / 3);
    css(tb.grid, { gridTemplateRows: `auto repeat(3, ${RH}px)` });
    css(tb.el, { height: px(TB - TY) });
    const nums = heads.map((c, i) => chip(tb.el, String(i + 1), { x: 48 + c.offsetLeft + 8, y: 44 - 32, w: 64, h: 70, size: 50, tone: 'lemon', rot: [-5, 3, -4, 4, -3][i], at: 0.5 + i * 0.08 }));
    const lab = THEME.strip(el, `${M('lab5/판정기록_양식.md')} · 1차 판정 표`, { x: 150, y: TY - 52, size: 34, weight: 700, tone: 'lemon', rot: -1.2, at: 0.45, padY: 8, padX: 22 });
    // 「B가 통과로 나오면」: 제목 띠 아래, 표 이름표 오른쪽 빈 자리(y 약 198~300). 이름표(두 줄)를 왼쪽에, 따라 할 두 줄을 오른쪽에
    const BX = Math.max(rowEnd(el) + 24, 150 + lab.w + 18), BW = 1800 - BX;
    const ifB = THEME.note(el, { x: BX, y: 0, w: BW, tone: 'cream', size: 34, rot: 0.3, at: 1.3, padX: 18, padY: 8,
      html: `<div style="display:flex;align-items:center;gap:16px"><div style="flex:none;font-size:34px;font-weight:700;line-height:1.12;background:${C.lemon};padding:8px 12px;transform:rotate(-2deg)">B가 통과로<br>나오면</div>` +
        `<div class="c8-ifb" style="line-height:1.26;white-space:nowrap">금액을 규정 제7조 제1항 제2호로 직접 다시 계산해 줘<br>판정 기록에 「검토 프로젝트가 놓친 것」으로 적기</div></div>` });
    const BY = 300 - ifB.h + 2;
    css(ifB.el, { top: px(BY) });
    const fb = ifB.el.querySelector('.c8-ifb'), fr = posIn(fb, ifB.el);
    if (fr.x + fr.w > BW - 10) console.warn(`[DECK] B 쪽지 글이 넘친다(${Math.round(fr.x + fr.w - BW + 10)}px)`);
    return [bg, tp, tb, ...nums, lab, steps, ifB];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s05a 카드 격자(넘김, 3열): 앞면 초안 A·B·C(크림), 뒷면 판정. 키 없이 1.8초부터 0.15초 간격으로 넘어간다
  DECK.slide({ id: 'p2-ch08-s05a', notes: NOTES['p2-ch08-s05a'], ...lay(3.0, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, 'A 통과, B·C 다시 쓰기가 나왔습니까?', [5, 8]);
    const band = THEME.strip(el, '③ 내 화면의 [판정]과 카드 뒷면 맞춰 보기', { x: rowEnd(el) + 28, y: 204, size: 36, weight: 700, rot: -0.5, at: 0.25, padY: 10 });
    const FS = 'font-size:56px;font-weight:500;line-height:1.28;margin-top:22px';
    const front = (t, b) => `<div class="p2-card-t" style="font-size:76px;font-family:var(--display);font-weight:400;line-height:1.1">${t}</div><div style="${FS}">${b}</div>`;
    const redo = '<div class="c8-band" style="position:relative;align-self:flex-start;background:#C0341F;color:#fff;font-family:var(--display);font-size:60px;line-height:1.1;' +
      'padding:12px 26px 10px;margin:0 0 8px -8px;transform:rotate(-1.5deg);box-shadow:0 3px 6px rgba(30,22,16,.3)">다시 쓰기</div>';
    const BS = 'font-size:56px;line-height:1.26;margin-top:16px';
    const gd = THEME.grid(el, { cols: 3, x: 120, y: 318, w: 1680, h: 662, gap: 40, at: 0.3, each: 0.15, flipAt: 1.8, flipEach: 0.15, items: [
      { front: front('초안 A', '경차 2시간 40분 주차 요금 · 2,450원'), backTone: 'green',
        back: `<div style="font-family:var(--display);font-size:150px;line-height:1">통과</div><div style="${BS}">다시 계산 4,900원의 50% → 2,450원</div>` },
      { front: front('초안 B', '수영 초급반 중도 환불 · 40,000원'), backTone: 'cream',
        back: redo + `<div style="${BS}">금액: 위약금 6,000원을 빼지 않음</div><div style="${BS};font-weight:700">다시 계산 34,000원</div>` },
      { front: front('초안 C', '요가 강습 시작 전날 취소 · 40,000원'), backTone: 'cream',
        back: redo + `<div style="${BS}">개인정보: [답변]에 이름과 전화번호</div><div style="${BS}">다시 계산 40,000원(금액은 맞다)</div>` }] });
    // 넘긴 뒤 주홍 띠가 1.12배에서 1배로 눌려 붙는다(B·C)
    const bands = [1, 2].map(i => ({ b: gd.cards[i].flip.back.querySelector('.c8-band'), t: 1.8 + i * 0.15 + 0.5 + 0.1 }));
    const press = anim(lt => bands.forEach(({ b, t }) => {
      const p = prog(lt, t, 0.16, ease.outCubic);
      REEL.set(b, 'transform', `rotate(-1.5deg) scale(${lerp(1.12, 1, p).toFixed(4)})`);
    }));
    const bc = gd.cards[1].el, bx = parseFloat(bc.style.left), bw = parseFloat(bc.style.width), byy = parseFloat(bc.style.top) + parseFloat(bc.style.height);
    const p1 = THEME.tag(el, '파트 1 9장에서 본 판정', { x: 0, y: byy - 34, size: 34, tone: 'lemon', rot: -1.5, at: 1.15 });
    css(p1.el, { left: px(bx + (bw - p1.w) / 2) });
    return [bg, tp, band, gd, press, p1];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s06 요청문 크게: 새 메모장 창에 채울 「다시 쓰기 요청」 글(크림 종이, 36px). 오른쪽에 레몬 쪽지 「민원 상담 프로젝트가 없으면」
  DECK.slide({ id: 'p2-ch08-s06', notes: NOTES['p2-ch08-s06'], ...lay(1.9, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '민원 상담 프로젝트에 다시 쓰기를 요청합니다', [6, 8]);
    // body 한 줄(약 1450px)은 단계 표시 줄 오른쪽(x 600~1800)에 들지 않아 표시 줄 아래(y 250)에 둔다
    const band = THEME.strip(el, '새 메모장 창에서 「다시 쓰기 요청」을 채웁니다 · 다 채운 글을 「새별 민원 상담」 새 대화로', { x: 292, y: 250, size: 36, weight: 700, rot: -0.3, at: 0.25, padY: 8 });
    const PW = 1036, PY0 = 372, PH = 980 - PY0;
    const pp = THEME.paper(el, { x: 120, y: PY0, w: PW, h: PH, tone: 'cream', rot: 0, at: 0.3, seed: 3.9 });
    const col = h('div', '', pp.inner);
    css(col, { position: 'absolute', left: '50px', top: '0', width: px(PW - 100), fontSize: '40px', lineHeight: 1.42, color: C.ink, wordBreak: 'keep-all' });
    const first = h('div', '', col, '아래 초안이 검토에서 「다시 쓰기」 판정을 받았다. 검토 의견을 반영해 다섯 칸 형식으로 다시 써 줘.');
    css(first, { textWrap: 'pretty' });
    const slots = [['[원 민원]', '(원 민원을 붙여 넣는다)'], ['[초안]', '(초안을 붙여 넣는다)'], ['[검토 의견]', '(검토 프로젝트의 [고칠 내용]을 붙여 넣는다)']].map(([k, v], i) => {
      const r = h('div', '', col); css(r, { display: 'flex', alignItems: 'center', gap: '18px', marginTop: px(i ? 14 : 26) });
      const kk = h('div', '', r, k); css(kk, { flex: 'none', width: '214px', fontSize: '38px', fontWeight: 700 });
      const vv = h('div', '', r, v); css(vv, { flex: 1, fontSize: '34px', lineHeight: 1.3, padding: '8px 16px', border: '3px dashed rgba(30,22,16,.5)', color: C.dim });
      return vv;
    });
    const foot = h('div', '', col, `복사할 범위 · ${M('```text')} 줄과 ${M('```')} 줄 사이<br>괄호 줄 세 개는 메모장에서 지우고 그 자리에 붙여 넣습니다`);
    css(foot, { fontSize: '36px', fontWeight: 700, color: C.dim, marginTop: '26px', paddingTop: '18px', borderTop: '3px dashed rgba(30,22,16,.25)' });
    const spare = PH - col.offsetHeight;
    css(col, { top: px(Math.max(40, Math.round(spare / 2))) });
    if (spare < 70) console.warn(`[DECK] 요청문 종이 글자가 넘친다(${70 - spare}px)`);
    const ptag = THEME.tag(el, '새 메모장 창(macOS는 텍스트 편집기 새 문서) ← 「다시 쓰기 요청」 상자 안 글', { x: 140, y: PY0 - 34, size: 34, tone: 'kraft', rot: -0.8, at: 0.45 });
    const ptape = THEME.tape(el, { x: 120 + PW - 190, y: PY0 - 18, w: 150, rot: 5, at: 0.55 });
    const txt = anim(lt => {
      THEME.lift(first, lt, 0.5, { shadow: false, dur: 0.4, from: 1.02 });
      slots.forEach((s, i) => THEME.lift(s.parentElement, lt, 0.6 + i * 0.08, { shadow: false, dur: 0.35, from: 1.04 }));
      THEME.lift(foot, lt, 0.85, { shadow: false, dur: 0.4, from: 1.02 });
    });
    // 오른쪽 레몬 쪽지
    const NX = 120 + PW + 30, NW = 1800 - NX;
    const fp = t => `<span style="font-family:var(--mono);white-space:nowrap">${t}</span>`;
    const nt = THEME.note(el, { x: NX, y: 0, w: NW, tone: 'lemon', labelTone: 'cream', label: '민원 상담 프로젝트가 없으면', size: 34, padX: 30, padY: 24, rot: 0.6, at: 1.0,
      html: '프로젝트 밖 새 대화 · 입력창의 + → 파일 3개 첨부' +
        `<div style="margin:8px 0 10px;line-height:1.36">${fp('자료/새별_체육시설_이용규정.md')}<br>${fp('자료/새별_공영주차장_운영지침.md')}<br>${fp('자료/새별_담당부서_안내.md')}</div>` +
        `첫 메시지 · ${M('lab4/완성본/지침_2판.md')} 상자 안 글을 붙여 넣어 보내기` +
        '<div style="margin-top:10px">그다음 같은 대화에 메모장에서 채운 글을 보냅니다</div>' });
    const ny = Math.round(PY0 + 20 + Math.max(0, (PH - 20 - nt.h) / 2));
    css(nt.el, { top: px(ny) });
    if (ny + nt.h > 980) console.warn(`[DECK] 레몬 쪽지가 y 980 을 넘는다(${ny + nt.h}px)`);
    const ntape = THEME.tape(el, { x: NX + NW - 150, y: ny - 20, w: 130, rot: 6, at: 1.1 });
    return [bg, tp, band, pp, ptag, ptape, txt, nt, ntape];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s06a 순서 조각(셋): 괄호 줄 세 개 자리 ①②③. 위에 채울 자리와 복사할 범위, 아래 끝에 붙여 넣은 뒤의 첫 줄(①②는 흰 띠, ③은 검토 대화 쪽지)
  DECK.slide({ id: 'p2-ch08-s06a', notes: NOTES['p2-ch08-s06a'], ...lay(2.1, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '괄호 줄 세 개 자리에 붙여 넣습니다', [6, 8]);
    // 붙여 넣은 뒤의 첫 줄: 흰 띠(글자 폭에 맞춰 접는다)
    const whiteBand = text => (parent, w, at) => {
      const s = THEME.strip(parent, text, { x: 0, y: 0, w, size: 36, weight: 500, tone: 'white', torn: '', rot: 0, at, padX: 22, padY: 18, lh: 1.36 });
      return s;
    };
    const D = {};
    const review = (parent, w, at) => {
      const nt = THEME.note(parent, { x: 0, y: 0, w, tone: 'white', size: 34, padX: 22, padY: 14, rot: 0, at,
        html: `<div style="height:24px"></div>[고칠 내용]<div class="c8-fix" style="margin:6px -10px 0;padding:4px 10px">환불액을 34,000원으로 수정하고, …</div>` +
          `<div style="margin-top:12px;color:var(--dim)">[알림] 통과 판정은 발송 승인이 아닙니다. …</div>` });
      // 위 가장자리 이름표: 쪽지 폭에 맞춰 두 줄로 접는다
      const lb = THEME.strip(nt.el, '「새별 답변 검토」 · 초안 B를 보낸 대화', { x: 10, y: -30, w: w - 40, size: 34, weight: 700, tone: 'lemon', rot: -1, at: at + 0.12, padX: 18, padY: 8, lh: 1.25 });
      const fix = nt.el.querySelector('.c8-fix'), p = posIn(fix, nt.el);
      const ring = h('div', '', nt.el);
      css(ring, { position: 'absolute', left: px(p.x - 6), top: px(p.y - 6), width: px(p.w + 12), height: px(p.h + 12), boxSizing: 'border-box',
        border: `6px solid ${C.red}`, borderRadius: '12px', transformOrigin: '50% 50%' });
      D.ring = ring;
      return { el: nt.el, h: nt.h, lift: 30, render(lt) { nt.render(lt); lb.render(lt); THEME.lift(ring, lt, 1.4, { rot: -0.6, k: 0.5, dur: 0.4, shadow: false, from: 1.12 }); } };
    };
    const seq = pieceRow(el, { x: 120, y: 296, h: 684, gap: 34, widths: [432, 432, 748], stagger: [0, 10, 0], at: 0.3, each: 0.2, botPad: 28, subGap: 8, items: [
      { n: 1, title: `① [원 민원] 아래 괄호 자리 ← ${M('검토할_초안.md')} 「초안 B」 상자`,
        subs: ['복사할 범위 · [원 민원] 다음 줄부터 [초안] 줄 앞까지(네 줄)'], bottom: whiteBand('11월 수영 초급반(월·수·금 오전 7시)을 등록했고 …') },
      { n: 2, title: '② [초안] 아래 괄호 자리 ← 같은 「초안 B」 상자',
        subs: [`복사할 범위 · [초안] 다음 줄부터 ${M('```')} 줄 앞까지(다섯 줄)`], bottom: whiteBand('[민원 요지] 수영 초급반 중도 환불 금액과 지급 시기 문의 …') },
      { n: 3, title: '③ [검토 의견] 아래 괄호 자리 ← 검토 대화 답의 [고칠 내용]',
        subs: ['복사할 범위 · [고칠 내용] 뒤 문장부터 [알림] 줄 앞까지', '가는 곳 · 사이드바 「새별 답변 검토」 → 4번에서 초안 B를 보낸 대화'], bottom: review }] });
    return [bg, tp, seq];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s06b 기대 결과 크게: 초록 종이에 34,000원(Anton 180px)과 [계산] 세 문장. 왼쪽에 보낼 것 쪽지와 「새 메모장 창」 → 사이드바 종이
  DECK.slide({ id: 'p2-ch08-s06b', notes: NOTES['p2-ch08-s06b'], ...lay(1.9, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '다 채운 글을 「새별 민원 상담」 새 대화로', [6, 8]);
    const c1 = THEME.callout(el, { x: 120, y: 320, w: 540, tone: 'cream', size: 44, rot: -1, at: 0.3,
      text: '다 채운 글을 통째로 복사 → 「새별 민원 상담」 안 새 대화에 붙여 넣고 보내기' });
    // 새 메모장 창(흰 종이, 회색 줄)과 그 위에 겹쳐 붙인 사이드바 종이
    const NY = 320 + c1.h + 46, NH = 975 - NY;
    const pad = THEME.paper(el, { x: 130, y: NY, w: 520, h: NH, tone: 'white', rot: 1, at: 0.45, seed: 2.2 });
    [0.2, 0.32, 0.44, 0.56, 0.68, 0.8].forEach((f, i) => {
      const l = h('div', 'p2-tl' + (i % 3 === 0 ? ' dark' : ''), pad.inner); css(l, { left: '34px', top: px(NH * f), width: px(i % 3 === 2 ? 110 : 160) });
    });
    const padTag = THEME.tag(el, '새 메모장 창', { x: 150, y: NY - 30, size: 34, tone: 'kraft', rot: -2, at: 0.55 });
    const side = THEME.note(el, { x: 300, y: NY + 40, w: 330, tone: 'cream', size: 34, padX: 16, padY: 14, rot: -1.5, at: 0.6,
      html: ['프로젝트', '새별 민원 상담', '새별 답변 검토'].map((t, i) => `<div style="padding:5px 12px;border-radius:10px;white-space:nowrap;${
        i === 0 ? 'font-weight:700;color:var(--dim);padding-left:2px' : i === 1 ? 'background:rgba(192,52,31,.16);font-weight:700' : ''}">${t}</div>`).join('') });
    css(side.el, { top: px(NY + Math.round((NH - side.h) / 2) + 6) });
    const LM = `background:${C.lemon};color:${C.ink};padding:0 .12em;-webkit-box-decoration-break:clone;box-decoration-break:clone`;
    const rs = THEME.result(el, { x: 700, y: 300, w: 1100, h: 680, num: true, size: 180, value: '34,000원', detailSize: 40, at: 0.6,
      detail: '<div style="line-height:1.42">[계산] 남은 8회분: 60,000원 × (12회 − 4회) ÷ 12회 = 40,000원.<br>위약금: 60,000원 × 10% = 6,000원.<br>' +
        `환불액: 40,000원 − 6,000원 = <span style="${LM}">34,000원</span>.</div>` +
        '<div style="margin-top:26px;padding-top:20px;border-top:3px dashed rgba(251,245,233,.45);font-weight:700">[계산]에 40,000원 − 6,000원 = 34,000원</div>' });
    const ex = THEME.tag(el, '지침 2판', { x: 0, y: 252, size: 34, tone: 'kraft', rot: 0.8, at: 0.75 });
    css(ex.el, { left: px(1800 - ex.w) });
    const rtag = [...rs.el.children].filter(c => c.style.zIndex === '2').pop();   // 결과 종이의 「기대 결과」 이름표
    if (rtag) css(rtag, { left: '-14px' });
    return [bg, tp, c1, pad, padTag, side, rs, ex];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s07 화면 크게: 다시 검토 요청을 보낸 그린 화면(1160×662). 고리 1 [다시 쓰기 횟수] 1회, 2 [판정] 통과, 3 [알림] 줄. 오른쪽 열에 쪽지 두 장과 초록 기대 결과
  // [캡처] deck/assets/p2/shots/p2-ch08-s07.png 가 들어오면 THEME.shot 의 두 번째 인자(src)로 주고 sidebar·draw 를 빼며, 고리는 marks 비율 좌표로 옮긴다
  DECK.slide({ id: 'p2-ch08-s07', notes: NOTES['p2-ch08-s07'], ...lay(2.7, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '다시 쓴 초안을 검토 프로젝트에 넣습니다', [7, 8]);
    const band = band2(el, '다시 쓰기는 한 초안에 2회까지 ·<br>2회 다시 써도 「다시 쓰기」면 「사람에게 넘김」');
    const D = {};
    const shot = THEME.shot(el, null, { x: 120, y: 300, w: 1160, h: 662, at: 0.3, url: 'chatgpt.com',
      sidebar: { title: '프로젝트', items: ['새별 민원 상담', '새별 답변 검토'], on: 1 },
      draw(main, frame) {
        screenFonts(frame, 320);
        D.c = chatIn(main, { userW: 720, gap: 66, firstGap: 12,
          user: ['<span>[다시 쓰기 횟수] 1회</span>', '[원 민원]', '11월 수영 초급반(월·수·금 오전 7시)을 등록했고 …', '[초안]', '[민원 요지] 수영 초급반 중도 환불 금액과 지급 시기 문의 …'],
          ai: ['<span style="font-weight:700">[판정] 통과</span>', '- 금액: 맞음 — 환불액은 34,000원입니다.', '[알림] 통과 판정은 발송 승인이 아닙니다. 발송은 고객지원팀장이 정합니다.'] });
        return [{ node: D.c.uLines[0].firstChild, n: 1, at: 0.9 }, { node: D.c.aLines[0].firstChild, n: 2, at: 1.4 }, { node: D.c.aLines[2], n: 3, at: 1.6 }];
      } });
    const talk = anim(lt => {
      THEME.lift(D.c.ub, lt, 0.6, { shadow: false, dur: 0.4, from: 1.04 });
      THEME.lift(D.c.ab, lt, 1.1, { shadow: false, dur: 0.4, from: 1.03 });
    });
    const RX = 1310, RW = 490;
    const c1 = THEME.callout(el, { x: RX, y: 300, w: RW, tone: 'cream', size: 36, rot: 0, at: 1.8,
      text: '「다시 검토 요청」도 새 메모장 창에서 채웁니다<br><span style="font-weight:500">[원 민원] ← 「초안 B」 상자 · [초안] ← 6번에서 받은 다시 쓴 답 전체</span>' });
    const c2 = THEME.callout(el, { x: RX, y: 300 + c1.h + 22, w: RW, tone: 'cream', size: 36, rot: 0, at: 1.95,
      text: '다 채운 글을 통째로 → 「새별 답변 검토」 안 새 대화' });
    const cy = 300 + c1.h + 22 + c2.h + 22;
    const ok = THEME.card(el, { x: RX, y: cy, w: RW, h: 'fit', minH: 980 - cy, layout: true, pad: 30, tone: 'green', label: '기대 결과',
      body: '<span style="font-family:var(--display);font-size:60px;line-height:1.15">[판정] 통과</span>', bodySize: 44, rot: 0, at: 2.1 });
    return [bg, tp, band, shot, talk, c1, c2, ok];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s08 표 한 장(키 한 번): 옮긴 횟수 표와 오른쪽 횟수 카드. 키를 누르면(1.6초) 횟수 칸 3·1·1 과 5회·7회, 50회가 크게 붙는다
  DECK.slide({ id: 'p2-ch08-s08', notes: NOTES['p2-ch08-s08'], ...lay(3.4, el => {
    const RV = 1.7;
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '두 프로젝트 사이를 몇 번 옮겼습니까?', [8, 8]);
    const band = band2(el, '판정 기록 아래 「복사해 옮긴 횟수」 칸 ·<br>프로젝트에 보낸 요청 하나를 1회로 셉니다', { rot: 0.4 });
    const sub = t => `<div style="font-size:34px;font-weight:500;line-height:1.3;color:var(--dim);margin-top:4px">${t}</div>`;
    const TW = 1110;
    const tb = THEME.table(el, { x: 120, y: 300, w: TW, size: 38, headSize: 34, fill: false, widths: [1, 2.62, 0.46], pad: [18, 18], at: 0.3,
      cols: ['옮긴 것', '어디서 어디로', '횟수'],
      rows: [['초안', `${M('검토할_초안.md')} → 검토 프로젝트${sub('민원 상담 프로젝트가 쓴 초안으로 가정')}`, ''],
        ['검토 의견', '검토 프로젝트 → 민원 상담 프로젝트', ''],
        ['다시 쓴 초안', '민원 상담 프로젝트 → 검토 프로젝트', ''],
        ['합계', '', '']] });
    // 횟수 칸(셋째 칸)에 키 누름 뒤 붙는 숫자 조각
    const cells = tb.cells, gx = 48, gy = 44;
    const counts = ['3', '1', '1'].map((t, i) => {
      const c = cells[3 * (i + 1) + 2];
      const cw = c.offsetWidth, ch = c.offsetHeight;
      return chip(tb.el, t, { x: gx + c.offsetLeft + (cw - 78) / 2, y: gy + c.offsetTop + (ch - 84) / 2, w: 78, h: 84, size: 64, tone: 'lemon', rot: [-4, 3, -2][i], at: RV + i * 0.2, reveal: true });
    });
    const cmp = THEME.tag(el, '9장 시연에서 이 횟수와 비교합니다', { x: 0, y: 300 + tb.h - 34, size: 34, tone: 'kraft', rot: -1, at: 0.7 });
    css(cmp.el, { left: px(120 + TW - 40 - cmp.w) });
    // 오른쪽 열: 크림 카드 두 장(5회, 7회)과 가정 카드(50회)
    const RX = 120 + TW + 30, RW = 1800 - RX;
    const card = (y, hh, at, rot) => THEME.paper(el, { x: RX, y, w: RW, h: hh, tone: 'cream', rot, at, seed: 3.3 + y * 0.01 });
    const label = (pp, t) => { const d = h('div', '', pp.inner, t); css(d, { position: 'absolute', left: '34px', top: '0', bottom: '0', display: 'flex', alignItems: 'center', fontSize: '44px', fontWeight: 700, lineHeight: 1.2, color: C.ink, wordBreak: 'keep-all', width: px(RW - 34 - 250) }); return d; };
    const k1 = card(300, 190, 0.85, -0.8), k2 = card(510, 190, 1.0, 0.7);
    label(k1, '초안 B만<br>다시 쓰면'); label(k2, '초안 C까지<br>다시 쓰면');
    const g1 = chip(el, '5회', { x: RX + RW - 236, y: 300 + 20, w: 216, h: 150, size: 120, tone: 'green', rot: -3, at: RV + 0.65, reveal: true });
    const g2 = chip(el, '7회', { x: RX + RW - 236, y: 510 + 20, w: 216, h: 150, size: 120, tone: 'green', rot: 2.5, at: RV + 0.8, reveal: true });
    const k3 = card(720, 260, 1.15, -0.5);
    const asm = h('div', '', k3.inner, `<span style="display:inline-block;background:${C.lemon};font-weight:700;padding:0 12px;margin-right:12px;transform:rotate(-2deg);box-shadow:0 2px 4px rgba(30,22,16,.25)">가정</span>` +
      '민원 하루 30건, 3분의 1이 다시 쓰기');
    css(asm, { position: 'absolute', left: '34px', right: '30px', top: '26px', fontSize: '34px', lineHeight: 1.4, color: C.ink, wordBreak: 'keep-all' });
    const fifty = h('div', '', el);
    css(fifty, { position: 'absolute', left: px(RX + 34), top: px(720 + 26 + asm.offsetHeight + 4), display: 'flex', alignItems: 'baseline', gap: '28px', color: C.ink, transformOrigin: '20% 60%' });
    const fn = h('div', '', fifty, '50회'); css(fn, { fontFamily: 'var(--num)', fontSize: '110px', lineHeight: 1.05 });
    const ff = h('div', '', fifty, '30 + 10 × 2'); css(ff, { fontSize: '34px', fontWeight: 700, color: C.dim });
    const reveal = anim(lt => {
      THEME.lift(fifty, lt, RV + 1.0, { shadow: false, dur: 0.45, from: 1.22 });
    });
    return [bg, tp, band, tb, ...counts, cmp, k1, k2, k3, g1, g2, reveal];
  }, [1.6]) });

  // ─────────────────────────────────────────────────────────────
  // s09 채점 기준(정리 세 줄): 정리 띠 세 장(초록 번호)과 넘기는 질문. 오른쪽 카드에 두 프로젝트 종이와 그 사이 초안 종이·5회
  DECK.slide({ id: 'p2-ch08-s09', notes: NOTES['p2-ch08-s09'], ...lay(2.4, el => {
    const bg = THEME.bg(el, 'base');
    const tp = top(el, '검토는 따로, 옮기는 일은 사람이 했습니다');
    const ck = THEME.checklist(el, { x: 120, y: 290, w: 1160, size: 48, gap: 22, numTone: 'green', at: 0.3, each: 0.2, items: [
      '검토자는 지침이 다른 프로젝트로 둡니다', '다시 쓰기 2회, 통과는 발송 승인이 아닙니다', '초안 B만 다시 써도 5회 옮겼습니다'] });
    const nq = THEME.nextQ(el, { x: 120, bottom: 980, w: 1160, at: 1.6, text: '초안과 판정을 사람이 옮기지 않고 에이전트끼리 주고받게 할 수 있는가' });
    // 오른쪽 카드(x 1340, y 300, 460×680)
    const cd = THEME.paper(el, { x: 1340, y: 300, w: 460, h: 680, tone: 'cream', rot: 1, at: 0.9, seed: 5.7 });
    const proj = (t, y, at, rot) => {
      const pp = THEME.paper(cd.el, { x: 30, y, w: 400, h: 130, tone: 'white', rot, at, k: 0.7, seed: 6 + y * 0.01 });
      const d = h('div', '', pp.inner, t); css(d, { position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '44px', fontWeight: 700, color: C.ink });
      return pp;
    };
    const pa = proj('새별 민원 상담', 34, 1.05, -1.2), pb = proj('새별 답변 검토', 516, 1.2, 1);
    const sh = THEME.thing(cd.el, 'sheet', { x: 96, y: 196, w: 210, h: 274, rot: -4, at: 1.3 });
    const five = chip(cd.el, '5회', { x: 236, y: 268, w: 168, h: 112, size: 88, tone: 'lemon', rot: 4, at: 1.4 });
    return [bg, tp, ck, cd, pa, pb, sh, five, nq];
  }) });
})();
