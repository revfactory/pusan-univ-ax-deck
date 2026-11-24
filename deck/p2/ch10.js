/* 파트 2 · 10장 「실습: 승인 요약 쓰고 승인 받기」(LAB-6) — 레이아웃 목록(p2.md 8절)으로 다시 만든 장면 코드
 * 원고: plan/slides/p2-ch10.json · 배정표: plan/assets/p2_layout_ch10.md · 본보기: deck/p2/ch00.js s06·s20~s26, deck/p2/ch06.js
 * 장 차례는 원고 slides 배열을 따른다(s07 → s07b → s07a). 키 누름은 s10(승인 도장) 한 장에 한 번이다.
 * 나머지 장은 모든 조각이 차례로 놓여 3초 안팎에 끝 상태가 된다. s06 의 넘김 카드도 키 없이 넘어간다.
 * 텍스트 편집기·요청문을 크게 싣는 장이라 ChatGPT 캡처를 넣지 않는다(원고의 지시).
 * 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다. */
(function () {
  'use strict';
  const { css, h, set, prog, lerp, ease } = REEL;
  DECK.config({ part: 'p2', chapter: 'ch10', title: '실습: 승인 요약 쓰고 승인 받기' });

  const NOTES = {
    "p2-ch10-s01": "9장 시연에서 작성 에이전트와 검토 에이전트는 결과표를 만든 뒤 실행이 끝났고, 쓸지 말지는 사람이 정한다고 했습니다. 이 장의 질문은 시험을 통과한 「새별 민원 상담」 프로젝트를 팀 동료가 써도 된다고 누가, 무엇을 보고 정하는가입니다. 여러분이 승인 요약 한 장을 쓰고, 옆 사람이 팀장 역할을 맡아 판정합니다. 실습 묶음의 lab6 폴더를 씁니다.",
    "p2-ch10-s02": "파트 1 9장 마지막 두 화면에서, 검토를 통과한 답변도 한서윤 주임이 규정 원문과 대조하고 오민석 팀장이 발송을 승인한다고 정했습니다. 그때 승인한 것은 민원인에게 나가는 답변 한 건이었습니다. 이번에 승인할 것은 「새별 민원 상담」 프로젝트를 고객지원팀 동료들이 쓰는 일이고, 1장에서 오민석 팀장이 건 세 번째 조건 「팀장 승인 뒤에만 팀이 쓸 것」을 이번에 채웁니다. 팀이 쓰게 된 뒤에도 답변마다 하는 대조와 발송 승인은 그대로 합니다. 한서윤 주임은 이 승인을 받으려고 승인 요약 한 장을 씁니다.",
    "p2-ch10-s03": "오민석 팀장은 승인 요약 한 장을 읽고 판정합니다. 만든 것에는 프로젝트 이름, 다루는 민원 두 가지, 근거 파일, 답변 형식을 적습니다. 시험 결과에는 6장 시험 기록의 숫자와 8장 판정 기록을, 남는 위험에는 시험 기록의 남는 위험과 시험하지 않은 범위를 옮깁니다. 사람이 정할 것은 시범 기간, 쓸 사람과 공유 범위, 발송 전 확인 방법이고, 이 세 가지는 시험 기록으로 정할 수 없어 팀장이 정합니다. 다음 화면부터 ChatGPT로 이 네 칸의 초안을 받고 직접 고칩니다.",
    "p2-ch10-s04": "lab6/단계.md 실습 순서 1번과 2번입니다. 6장 실습에서 채운 lab4 폴더의 시험기록_양식.md를 메모장이나 텍스트 편집기로 열고, 없는 분은 lab6/완성본/시험기록_예.md를 엽니다. ChatGPT에서 새 대화를 열고 lab6/단계.md 「요청 1」의 ```text 줄과 ``` 줄 사이를 붙여 넣습니다.",
    "p2-ch10-s04a": "맨 아래 「(여기에 시험 기록을 붙여 넣는다)」 자리에 시험 기록 파일의 글을 모두 붙여 넣습니다. 8장에서 채운 lab5 폴더의 판정기록_양식.md가 있으면 그 아래에 함께 붙이고 보냅니다. 강사가 완성본 시험 기록을 넣어 codex로 한 번 보낸 예에서는 네 칸이 모두 나왔고 시험 기록에 없는 숫자는 없었습니다. 다만 1판의 규칙 시험 실패 건수는 요약에 옮겨지지 않아, 3번에서 시험 기록과 견주어 채웁니다. ChatGPT 화면은 강사 사전 확인(K-06) 전이라 여러분 화면의 문장은 다를 수 있습니다. 요청 1의 「최대 10명」은 2026년 11월 기준 OpenAI 도움말의 숫자입니다.",
    "p2-ch10-s05": "lab6/단계.md 3번입니다. 받은 초안을 lab6 폴더의 승인요약_양식.md에 칸마다 옮기고, [시험 결과]는 행마다 시험 기록의 같은 줄과 맞춰 봅니다. 시험 수는 1회차 표의 T01부터 T12까지, 지침 1판 통과 수는 1회차 아래 「통과」 줄, 고친 뒤 통과 수는 2회차 아래 「통과」 줄에서 찾습니다. 규칙 시험은 T11(개인정보)과 T12(지시 바꾸기)의 결과를 적은 「규칙 시험 실패」 줄, 고친 지침은 「고친 것」 표에서 찾습니다. 지침 1판은 6장 1회차에서 시험한 처음 지침이고, 8장 판정 기록이 있으면 마지막 행은 lab5 폴더의 판정기록_양식.md와 맞춥니다. 숫자가 다르면 시험 기록의 숫자로 고치고, 시험 기록이 없는 분은 완성본/시험기록_예.md의 같은 줄을 봅니다. (화면에서 옮긴 문구: 「여는 프로그램」 「메모장(Windows) · 텍스트 편집기(macOS)」)",
    "p2-ch10-s05a": "같은 3번에서 시험 기록에 없는 내용을 지웁니다. 시험 기록에 없는 숫자, 예를 들어 「정확도 95%」가 들어가 있으면 지우고, 중간안이나 재시험 같은 과정이 최종 결과와 섞여 있으면 최종 숫자 한 줄로 정리합니다. 중간안은 마지막 판 전에 고쳐 본 지침이고, 재시험은 고친 지침으로 같은 시험을 다시 보낸 것입니다. 강사가 codex로 한 번 받은 초안에도 중간안에서 T12가 실패했다는 문장이 최종 결과와 함께 나왔습니다. 「확인 필요」로 나온 칸에는 내 제안 값을 적고, Ctrl+S, macOS는 Command+S로 저장합니다. (화면에서 지운 주석: 「강사 사전 실행 예: codex 1회(2026-11-23)에서 받은 초안」)",
    "p2-ch10-s06": "내 시험 기록을 넣은 분은 카드의 숫자가 아니라 내 시험 기록의 같은 줄과 견주고, 같으면 맞습니다. 카드의 10 / 12와 12 / 12는 완성본 시험기록_예.md를 넣었을 때의 값입니다. 1판 10 / 12는 5장에서 정한 통과 기준인 11개 이상과 규칙 시험 실패 0건을 채우지 못해, 지침을 고친 뒤 2판으로 다시 시험했습니다. 네 칸이 다 있고, 숫자가 시험 기록과 같고, 「확인 필요」 칸에 제안 값을 적었으면 손을 들어 주세요. 강사가 완성본 시험 기록을 넣어 codex로 한 번 보낸 예에서는 네 칸이 모두 나왔고 시험 기록에 없는 숫자는 나오지 않았습니다. 다만 1판의 규칙 시험 실패 건수(1건)와 통과 기준을 채우지 못했다는 내용은 요약에 옮겨지지 않았습니다. 그래서 내 시험 기록의 1판 줄과 견주어 빠진 숫자가 있으면 채웁니다. 네 칸이 아니게 나온 분은 「[만든 것] [시험 결과] [남는 위험] [사람이 정할 것] 네 칸만 다시 써 줘」를 보냅니다. (강사 확인: 앞에서 말한 codex 예는 지금의 완성본 기록(1판 10 / 12)으로 2026-11-24에 다시 보낸 결과입니다. ChatGPT 화면에서 같은지는 K-06에서 확인합니다.)",
    "p2-ch10-s07": "lab6/단계.md 4번입니다. 바꾸기 전에 각자 내 노트북에 내가 고친 승인요약_양식.md, 내 시험 기록, 팀장_판정카드.md 세 파일을 열어 두고, 그대로 옆 사람과 노트북을 바꿉니다. 지금부터 옆 사람의 승인 요약을 오민석 팀장 역할로 읽고 판정카드 질문 5개에 예나 아니오와 확인한 방법을 적습니다.",
    "p2-ch10-s07b": "질문 1은 요약만 읽지 말고 시험 기록에서 한 줄을 골라 직접 대조하라는 질문입니다. 질문 4는 규정에 없는 질문이 들어왔을 때 금액을 지어내지 않고 담당 부서나 처리 기관으로 넘기는지 묻습니다. 시험 기록의 T09와 T10 줄, 5장에서 본 규정에 없는 질문 두 개의 판정을 보고 답합니다. 판정카드도 옆 사람 노트북의 파일에 적고 저장합니다. 6번까지 옆 사람 노트북에서 적은 뒤 노트북을 돌려줍니다.",
    "p2-ch10-s07a": "질문 5개에 답했으면 판정카드의 판정 표에서 하나를 고릅니다. 질문 5개가 모두 예이거나 아니오인 질문을 조건으로 막을 수 있으면 승인입니다. 숫자가 시험 기록과 다르거나 남는 위험에 막는 방법이 없으면 수정 요청, 규칙 시험 실패가 있거나 시험 수가 모자라 판단할 수 없으면 보류입니다. 규칙 시험 T11과 T12가 하나라도 실패했으면 승인하지 않는데, 5장에서 정한 통과 기준이 규칙 시험 실패 0건이기 때문입니다. 판정은 사람마다 달라도 되고, 시험 기록 한 줄을 직접 대조했는지가 중요합니다.",
    "p2-ch10-s08": "lab6/단계.md 5번입니다. 판정한 사람이 옆 사람의 승인요약_양식.md 맨 아래 승인 기록 칸에 날짜, 판정, 조건 또는 고칠 것, 판정한 사람을 적습니다. 무엇을 적을지는 판정카드의 판정 표에 있습니다. 승인이면 조건과 공유 범위, 수정 요청이면 고칠 것과 다시 볼 날짜, 보류면 더 시험할 것입니다. 판정카드에서 아니오였던 질문 번호도 적고, 파일을 같은 이름으로 저장합니다.",
    "p2-ch10-s09": "lab6/단계.md 6번입니다. 판정이 승인이면 「새별 민원 상담」 프로젝트를 누구와 공유할지 승인 기록의 조건 칸에 적고, 수정 요청이나 보류였으면 이 단계는 건너뜁니다. OpenAI 도움말(2026년 11월 기준)을 보면 Plus 계정은 프로젝트에 최대 10명까지 초대할 수 있습니다. 링크로 누구나 들어오게 열면 링크를 받은 로그인한 ChatGPT 사용자는 누구나 들어올 수 있고, 편집 권한이 없는 참여자는 보고 대화만 합니다. 완성본은 체육시설·주차 담당자 4명을 편집 권한 없이 초대하고 링크로는 열지 않는다고 적었습니다. 공유 메뉴와 권한의 실제 화면 이름은 강사 사전 확인(K-06) 전이라 화면에는 뜻만 적었고, lab6/단계.md에는 한국어 도움말의 표기가 함께 적혀 있습니다. 이 실습에서는 공유 링크를 실제로 열지 않습니다.",
    "p2-ch10-s10": "방금 적은 판정에 손을 들어 봅니다. 승인, 수정 요청, 보류 순서로 묻겠고, 판정은 사람마다 달라도 됩니다. (키) 실습 묶음 완성본에서 오민석 팀장은 조건을 붙여 승인했습니다. 시범 2주와 담당자 4명은 「사람이 정할 것」의 제안에서, 발송 전 담당자 대조와 ChatGPT 화면에서 다시 시험하는 조건은 「남는 위험」의 막는 방법에서 왔습니다. 완성본의 시험 기록은 강사가 codex로 흉내 낸 결과라 ChatGPT 화면에서 다시 시험해야 하고, 11개 이상 통과와 규칙 시험 실패 0건은 5장에서 정한 통과 기준 두 가지입니다. 11장에서는 파트 2의 질문에 무엇이라고 답하는지, 이 프로젝트로 아직 하지 못하는 일은 무엇인지 봅니다.",
  };
  const CH10 = '실습: 승인 요약 쓰고 승인 받기';
  const C = THEME.C, M = THEME.mono;
  const px = v => (typeof v === 'number' ? v.toFixed(1) + 'px' : v);
  const DIM = t => `<span style="color:var(--dim)">${t}</span>`;
  const NB = t => `<span style="white-space:nowrap">${t}</span>`;
  // 경로·파일 이름은 고정폭으로 쓰고 빗금 뒤에서만 줄을 바꾼다
  const MPATH = (...parts) => parts.map(t => NB(M(t))).join('<wbr>');
  const ANTON = (t, size) => `<span style="font-family:var(--num);font-weight:400${size ? ';font-size:' + size + 'px' : ''}">${t}</span>`;

  // 슬라이드 하나: build(el) 가 돌려준 부품을 차례로 그린다. 부품은 모두 render(lt, ctx) 를 가진다
  const lay = (dur, build, steps) => ({ dur, steps: steps || [],
    setup(el) { this.parts = build.call(this, el).filter(Boolean); },
    render(lt, ctx) { this.parts.forEach(p => p.render(lt, ctx)); } });
  const top = (el, title, step) => THEME.top(el, { chapter: 10, chapterTitle: CH10, title, step, fiction: true });
  // 부품 밖 요소의 등장: 그림자 없이 조금 크게 들었다가 놓인다
  const pop = (node, at, o = {}) => ({ render: lt => THEME.lift(node, lt, at, Object.assign({ shadow: false, dur: 0.4 }, o)) });
  const group = (...ps) => ({ render: (lt, ctx) => ps.forEach(p => p && p.render(lt, ctx)) });

  // 요소의 위치를 다른 요소 기준 px 로 잰다(무대 배율을 되돌린다). setup 에서만 부른다
  function posIn(node, base) {
    const a = node.getBoundingClientRect(), b = base.getBoundingClientRect(), k = (b.width / base.offsetWidth) || 1;
    return { x: (a.left - b.left) / k, y: (a.top - b.top) / k, w: a.width / k, h: a.height / k };
  }
  // 글자가 실제로 차지한 폭(줄 단위 상자 가운데 가장 넓은 것)
  function textW(node, base) {
    const rg = document.createRange(); rg.selectNodeContents(node);
    const k = (base.getBoundingClientRect().width / base.offsetWidth) || 1;
    return Math.max(0, ...[...rg.getClientRects()].map(r => r.width / k));
  }
  // 주홍 고리: base 안에서 node 를 둘러싼다. 글자 위의 고리는 테두리를 얇게 해 획을 덮지 않는다
  function ringAt(base, node, o = {}) {
    const r = posIn(node, base), gx = o.gx ?? 12, gy = o.gy ?? 6;
    const ring = h('div', 'p2-mark', base);
    css(ring, { left: px(r.x - gx), top: px(r.y - gy), width: px(r.w + 2 * gx), height: px(r.h + 2 * gy), borderWidth: px(o.bw ?? 6), borderRadius: px(o.br ?? 20), zIndex: 4 });
    return { el: ring, render: lt => THEME.lift(ring, lt, o.at ?? 1, { rot: o.rot ?? -1.2, k: 0.5, dur: 0.4 }) };
  }
  // 레몬 밑줄 조각(글자 아래). 곱하기 섞기로 글자를 가리지 않는다. 왼쪽부터 그어진다
  function underline(base, node, o = {}) {
    const r = posIn(node, base), w = r.w + 12;
    const u = h('div', 'p2-lemon', base);
    css(u, { position: 'absolute', left: px(r.x - 6), top: px(r.y + r.h - (o.lift ?? 14)), width: px(w), height: px(o.th ?? 16), mixBlendMode: 'multiply',
      clipPath: THEME.jag(w, o.th ?? 16, 'left right', o.seed ?? 2.2, 3, 0), transformOrigin: '0 50%', zIndex: 3 });
    return { el: u, render: lt => { const p = prog(lt, o.at ?? 1, 0.35, ease.outCubic); set(u, 'opacity', lt >= (o.at ?? 1) ? '1' : '0'); set(u, 'transform', `scaleX(${p.toFixed(4)})`); } };
  }
  // 글에 HTML 을 쓸 수 있는 이름표(THEME.tag 와 같은 종이. 파일 이름을 고정폭으로 쓸 때)
  function tagH(parent, html, o = {}) {
    const tone = o.tone || 'lemon';
    const wrap = h('div', '', parent); css(wrap, { position: 'absolute', left: px(o.x ?? 0), top: px(o.y ?? 0), zIndex: 3 });
    const box = h('div', '', wrap); css(box, { position: 'relative' });
    const tx = h('span', '', box, html);
    css(tx, { position: 'relative', display: 'inline-block', padding: '10px 22px 11px', fontSize: px(o.size ?? 34), fontWeight: 700, lineHeight: 1.15,
      whiteSpace: 'nowrap', color: tone === 'red' ? '#FFFFFF' : tone === 'green' ? C.cream : C.ink });
    const w = box.offsetWidth, hh = box.offsetHeight, seed = o.seed ?? 3.1;
    const rim = h('div', 'p2-rim', box), face = h('div', `p2-face p2-${tone} p2-grain`, box);
    box.insertBefore(face, box.firstChild); box.insertBefore(rim, face);
    rim.style.clipPath = THEME.jag(w, hh, 'left right', seed, 5, 0);
    face.style.clipPath = THEME.jag(w, hh, 'left right', seed + 0.5, 5, 3);
    return { el: wrap, w, h: hh, place(x, y) { css(wrap, { left: px(x), top: px(y) }); },
      render: lt => THEME.lift(box, lt, o.at ?? 0, { rot: o.rot ?? -2, filter: true, k: 0.5, dur: 0.4 }) };
  }
  // 번호 조각: 색지 사각형에 숫자나 원 숫자. 원 숫자는 Anton 에 글리프가 없어 A2Z 700 으로 쓴다
  function chip(parent, text, o = {}) {
    const tone = o.tone || 'lemon', sz = o.size ?? 84;
    const np = THEME.paper(parent, { x: o.x ?? -20, y: o.y ?? -26, w: sz, h: Math.round(sz * 1.08), tone, rot: o.rot ?? -5, at: o.at ?? 0, k: 0.6, seed: o.seed });
    const nn = h('div', 'p2-num', np.inner, text);
    css(nn, { inset: '0', fontSize: px(o.font ?? sz * 0.72), color: tone === 'red' ? '#FFFFFF' : tone === 'green' ? C.cream : C.ink, paddingTop: '4px' });
    if (o.body) css(nn, { fontFamily: 'var(--body)', fontWeight: 700, paddingTop: '0' });
    return np;
  }
  // 초록 체크 조각
  function check(parent, x, y, o = {}) {
    const sz = o.size ?? 56;
    const p = THEME.paper(parent, { x, y, w: sz, h: sz, tone: 'green', rot: o.rot ?? -6, at: o.at ?? 1, k: 0.5 });
    const v = h('div', '', p.inner);
    css(v, { position: 'absolute', left: px(sz * 0.27), top: px(sz * 0.24), width: px(sz * 0.46), height: px(sz * 0.24),
      borderLeft: `${Math.round(sz * 0.12)}px solid ${C.cream}`, borderBottom: `${Math.round(sz * 0.12)}px solid ${C.cream}`, transform: 'rotate(-45deg)' });
    return p;
  }

  // ─────────────────────────────────────────────────────────────
  // s01 전환: 공용 영상 p2-intro 를 좌우로 뒤집어 깔고(한 번 재생하고 마지막 장면에서 멈춘다) 오른쪽 크림 띠에 꼬리표, 제목, entry 질문
  DECK.slide({ id: 'p2-ch10-s01', notes: NOTES['p2-ch10-s01'], ...lay(2.8, el => {
    const vt = THEME.videoTitle(el, {
      kind: 'chapter', scene: 'intro', flip: true, kicker: '파트 2 · 10장',
      src: '../assets/video/p2/p2-intro.mp4', poster: '../assets/video/p2/p2-intro.jpg',
      title: CH10, sub: '시험을 통과한 프로젝트를 팀 동료가 써도 된다고\n누가, 무엇을 보고 정하는가',
    });
    const v = el.querySelector('video');
    if (v) v.loop = false;
    return [vt];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s02 인물과 대사: 오민석 팀장(1.9배)과 대사 종이. 대사 종이 아래 왼쪽에 승인 요약 사진 조각과 가져온 사람 이름표,
  // 오른쪽에 크림 카드 두 장(뒤: 파트 1 9장 답변 한 건, 앞: 10장 팀 사용, 주홍 테이프)
  DECK.slide({ id: 'p2-ch10-s02', notes: NOTES['p2-ch10-s02'], ...lay(2.2, el => {
    const bg = THEME.bg(el, 'base');
    const tp = top(el, '이번 승인은 답변이 아니라 팀 사용입니다');
    const sp = THEME.speech(el, { who: 'oh', scale: 1.9, x: 130, org: true, bubble: { x: 740, y: 290, w: 1040 }, at: 0.2,
      text: '팀이 쓰는 것은\n제가 승인한 뒤입니다' });
    const by = 290 + sp.el.offsetHeight;                        // 대사 종이 아래 끝(약 600)
    const cy = by + 52;                                         // 사진 조각과 카드가 놓이는 줄
    const cut = THEME.cutout(el, '../assets/img/p2/p2-ch10-s02-summary-sheet_cut.png', { x: 756, y: cy, w: 240, h: 980 - cy, rot: -3, at: 1.0, fallback: 'summary' });
    const who = THEME.tag(el, '한서윤 주임 · 고객지원팀', { x: 756, y: cy - 34, at: 1.1, rot: -2.5 });
    const cardAt = (o, kind, thingW, thingH) => {
      const c = THEME.card(el, { x: o.x, y: o.y, w: o.w, h: 980 - o.y, pad: 32, layout: true, label: o.label, labelSize: 40, title: o.title, titleSize: 44, rot: o.rot, at: o.at });
      css(c.flow, { position: 'absolute', left: '32px', bottom: '32px', width: px(o.w - 64), marginTop: '0' });
      const lab = c.flow.querySelector('.p2-card-l');                  // 이름표 줄은 카드 위쪽에 남긴다
      c.inner.appendChild(lab); css(lab, { position: 'absolute', left: '32px', top: '30px' });
      const th = THEME.thing(c.el, kind, { x: o.w - 32 - thingW, y: 26, w: thingW, h: thingH, rot: o.thingRot, at: o.at + 0.12 });
      return { c, th };
    };
    const back = cardAt({ x: 1008, y: cy + 36, w: 400, rot: -2, at: 1.3, label: '파트 1 9장', title: '답변 한 건의 발송', thingRot: 5 }, 'sheet', 104, 135);
    css(back.c.title, { textWrap: 'balance' });
    const front = cardAt({ x: 1380, y: cy, w: 420, rot: 1.5, at: 1.45, label: '10장', title: '「새별 민원 상담」의<br>팀 사용', thingRot: -3 }, 'laptop', 176, 124);
    const tape = THEME.tape(front.c.el, { x: 128, y: -20, w: 130, rot: -8, tone: 'red', at: 1.55 });
    return [bg, tp, sp, cut, who, back.c, back.th, front.c, front.th, tape];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s03 카드 격자(2×2): 승인 요약 네 칸. 「사람이 정할 것」만 제목 아래 주홍 띠. 오른쪽 열에 쓰는 근거(시험 기록·판정 기록)
  DECK.slide({ id: 'p2-ch10-s03', notes: NOTES['p2-ch10-s03'], ...lay(2.0, el => {
    const bg = THEME.bg(el, 'base');
    const tp = top(el, '팀장은 승인 요약 네 칸을 보고 정합니다');
    const band = THEME.strip(el, '<b style="font-weight:700">승인 요약</b> · 받는 사람: 오민석 팀장 · 고객지원팀', { x: 120, y: 254, size: 36, rot: -0.5, at: 0.2, padY: 10 });
    const GW = 1320, RX = 120 + GW + 36, RW = 1800 - RX;
    const B = t => `<div style="color:var(--dim);line-height:1.3;margin-top:10px">${t}</div>`;
    const gd = THEME.grid(el, { x: 120, y: 344, w: GW, h: 636, cols: 2, gap: 36, at: 0.3, each: 0.15, titleSize: 52, bodySize: 40, items: [
      { title: '만든 것', body: B('프로젝트 이름, 다루는 민원 두 가지, 근거로 쓰는 파일, 답변 형식'), pad: 32 },
      { title: '시험 결과', body: B('시험 수, 통과 수, 규칙 시험(개인정보, 지시 바꾸기) 결과, 고친 지침과 고친 뒤 결과'), pad: 32 },
      { title: '남는 위험', body: B('시험 기록의 「남는 위험」과, 시험하지 않은 범위'), pad: 32 },
      { title: '사람이 정할 것', body: B('시범 기간, 쓸 사람과 공유 범위, 발송 전 확인 방법'), pad: 32 }] });
    // 「사람이 정할 것」 제목 아래 주홍 색지 띠(사람의 결정)
    const c4 = gd.cards[3], t4 = posIn(c4.title, c4.el), tw = textW(c4.title, c4.el);
    const red = h('div', 'p2-red p2-grain', c4.el);
    css(red, { position: 'absolute', left: px(t4.x - 6), top: px(t4.y + t4.h - 6), width: px(tw + 12), height: '16px', clipPath: THEME.jag(tw + 12, 16, 'left right', 4.7, 3, 0), transformOrigin: '0 50%', zIndex: 1 });
    const redP = { render: lt => { const p = prog(lt, 0.3 + 3 * 0.15 + 0.1, 0.3, ease.outCubic); set(red, 'opacity', p > 0 ? '1' : '0'); set(red, 'transform', `scaleX(${p.toFixed(4)})`); } };
    // 오른쪽 열: 크림 카드와 종이 그림 두 개(이름표 40px)
    const rc = THEME.card(el, { x: RX, y: 344, w: RW, h: 'fit', pad: 28, title: '시험 기록과 판정 기록으로 씁니다', titleSize: 40, rot: 1.2, at: 1.1 });
    css(rc.title, { textWrap: 'balance' });
    const y1 = 344 + rc.h + 30, y2 = Math.min(y1 + 224, 975 - 140 * 1.3);
    const th1 = THEME.thing(el, 'table', { x: RX + 4, y: y1, w: 160, rot: -4, at: 1.3 });
    const g1 = THEME.tag(el, '시험 기록 · 6장', { x: RX + 74, y: y1 + 120, size: 40, at: 1.4, rot: -2 });
    const th2 = THEME.thing(el, 'sheet', { x: RX + 14, y: y2, w: 140, rot: 3, at: 1.45 });
    const g2 = THEME.tag(el, '판정 기록 · 8장', { x: RX + 74, y: y2 + 120, size: 40, at: 1.55, rot: 1.5, tone: 'kraft' });
    g1.el.style.left = px(Math.min(RX + 74, 1800 - g1.w)); g2.el.style.left = px(Math.min(RX + 74, 1800 - g2.w));
    return [bg, tp, band, gd, redP, rc, th1, g1, th2, g2];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s04 순서 조각(넷, 2×2): 할 일 네 가지. 글이 길어 한 줄에 넷을 놓지 않고 두 줄 두 칸으로 놓는다. 지금 할 일 ④만 주홍 번호
  DECK.slide({ id: 'p2-ch10-s04', notes: NOTES['p2-ch10-s04'], ...lay(2.0, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '시험 기록을 붙여 요청 1을 보냅니다', [2, 6, 1]);
    const band = THEME.strip(el, '새 대화에 요청 1과 시험 기록 · 8장 판정 기록이 있으면 함께', { right: 1800, y: 218, size: 36, rot: 0.5, at: 0.2, padY: 10 });
    // 윗줄은 글이 많은 ①을 넓게, 아랫줄은 쪽지가 든 ④를 넓게 둔다(칸 폭이 엇갈린다)
    const X = 120, G = 40, WA = 864, WB = 1680 - WA - G, Y1 = 306, H1 = 316, Y2 = Y1 + H1 + 36, H2 = 980 - Y2;
    const PX = 36, IND = 40;
    const piece = (i, x, y, w, hh, tone, title, body, rot) => {
      const at = 0.3 + i * 0.2;
      const pp = THEME.paper(el, { x, y, w, h: hh, tone: 'cream', rot, at, pad: PX, seed: 7.3 + i });
      const flow = h('div', '', pp.inner); css(flow, { position: 'relative', paddingLeft: px(IND), wordBreak: 'keep-all', color: C.ink });
      const t = h('div', '', flow, title); css(t, { fontSize: '56px', fontWeight: 700, lineHeight: 1.16, textWrap: 'balance' });
      if (body) { const b = h('div', '', flow, body); css(b, { fontSize: '38px', lineHeight: 1.34, marginTop: '12px', color: C.dim }); }
      if (flow.offsetHeight > hh - 2 * PX + 2) console.warn(`[DECK] s04 조각 ${i + 1} 글이 넘친다(${Math.round(flow.offsetHeight - (hh - 2 * PX))}px)`);
      const np = chip(pp.el, ['①', '②', '③', '④'][i], { tone, at: at + 0.1, body: true, font: 62 });
      return { pp, flow, np, render(lt) { pp.render(lt); np.render(lt); } };
    };
    const L = t => `<div>${t}</div>`;
    const p1 = piece(0, X, Y1, WA, H1, 'lemon', '준비',
      L(`lab4에서 채운 ${M('시험기록_양식.md')}`) + L(`없으면 ${MPATH('lab6/', '완성본/', '시험기록_예.md')}`) + L(`메모장(Windows) · ${NB('텍스트 편집기(macOS)')}`), -0.8);
    const p2 = piece(1, X + WA + G, Y1 + 12, WB, H1 - 12, 'lemon', '새 대화에 요청 1 붙여 넣기',
      `${MPATH('lab6/', '단계.md')} 「요청 1」의 ${NB(M('```text'))} 줄과 ${NB(M('```'))} 줄 사이`, 0.7);
    const p3 = piece(2, X, Y2, WB, H2, 'lemon', '맨 아래 자리에 시험 기록 파일의 글 전체',
      `판정 기록(${MPATH('lab5/', '판정기록_양식.md')})이 있으면 그 아래에`, 0.5);
    const p4 = piece(3, X + WB + G, Y2 + 10, WA, H2 - 10, 'red', '보내기', '', -0.6);
    // ④ 조각 안 기대 결과(초록 쪽지)
    const NX = 250;
    const ex = THEME.note(p4.pp.el, { x: NX, y: 54, w: WA - NX - 32, tone: 'green', label: '기대 결과', labelTone: 'lemon', size: 40, rot: 0.8, at: 1.3, padY: 24,
      html: `<div style="font-size:48px;font-weight:700;line-height:1.25">네 칸이 채워진 초안</div><div style="margin-top:10px">알 수 없는 칸은 ${NB('「확인 필요」')}</div>` });
    ex.el.style.top = px((H2 - 10 - ex.h) / 2 + 12);
    return [bg, tp, band, p1, p2, p3, p4, ex];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s04a 요청문 크게: 요청 1 전문(빈 줄까지 그대로). 맨 아래 붙여 넣을 자리는 점선 칸과 주홍 고리, 「최대 10명」 아래 레몬 밑줄
  const ASK1 = '아래 시험 기록으로 팀장에게 올릴 승인 요약 초안을 써 줘. 한 장 분량으로, 아래 네 칸만 쓴다.\n\n[만든 것] 프로젝트 이름, 다루는 민원 두 가지, 근거로 쓰는 파일, 답변 형식\n[시험 결과] 시험 수, 통과 수, 규칙 시험(개인정보, 지시 바꾸기) 결과, 고친 지침과 고친 뒤 결과\n[남는 위험] 시험 기록의 「남는 위험」과, 시험하지 않은 범위\n[사람이 정할 것] 팀장이 정할 것: 시범 기간, 쓸 사람과 공유 범위(Plus 계정의 프로젝트 공유는 최대 10명), 발송 전 확인 방법\n\n시험 기록에 없는 숫자나 결과를 지어내지 않는다. 시험 기록으로 알 수 없는 칸은 「확인 필요」라고 쓴다.\n\n(여기에 시험 기록을 붙여 넣는다)';
  DECK.slide({ id: 'p2-ch10-s04a', notes: NOTES['p2-ch10-s04a'], ...lay(2.1, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '새 대화에 요청 1을 붙여 넣습니다', [2, 6, 1]);
    const band = THEME.strip(el, '가상 사례 실습입니다. 이 묶음의 가상 자료만 입력합니다.', { right: 1800, y: 218, size: 34, rot: 0.5, at: 0.2, padY: 10 });
    const SZ = 38;
    const lines = ASK1.split('\n'), last = lines.length - 1;
    const body = lines.map((t, i) => {
      if (!t.trim()) return `<div style="height:${SZ * 0.5}px"></div>`;
      if (i === last) return `<div class="c10-slot" style="display:inline-block;margin-top:4px;padding:6px 22px;border:3px dashed rgba(30,22,16,.5);background:rgba(30,22,16,.05)">${t}</div>`;
      return `<div style="text-wrap:pretty">${t.replace('최대 10명', '<span class="c10-ten" style="white-space:nowrap">최대 10명</span>')}</div>`;
    }).join('');
    const cd = THEME.card(el, { x: 120, y: 300, w: 1680, h: 'fit', pad: 40, layout: true, rot: 0, at: 0.3,
      label: `요청 1 · ${M('lab6/단계.md')}`, bodyClass: 'p2-prompt', bodySize: SZ, body });
    css(cd.body, { lineHeight: 1.42 });
    const bodyP = pop(cd.body, 0.5, { from: 1.02 });
    const ul = underline(cd.el, cd.el.querySelector('.c10-ten'), { at: 1.0 });
    const rg = ringAt(cd.el, cd.el.querySelector('.c10-slot'), { gx: 14, gy: 10, bw: 8, at: 1.6, rot: -0.8 });
    return [bg, tp, band, cd, bodyP, ul, rg];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s05 표 한 장: 승인요약_양식.md 의 「시험 결과」 표. 넷째 칸(양식 밖 안내)은 레몬 바탕과 왼쪽 점선. 숫자 줄 넷에 초록 체크
  DECK.slide({ id: 'p2-ch10-s05', notes: NOTES['p2-ch10-s05'], ...lay(2.3, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '시험 결과의 숫자를 직접 대조합니다', [3, 6]);
    const band = THEME.strip(el, `초안을 ${M('승인요약_양식.md')}로 옮깁니다 · 행마다 시험 기록의 같은 줄과 맞춥니다`, { right: 1800, y: 218, size: 34, rot: 0.5, at: 0.2, padY: 10 });
    const GRAY = '<span style="display:inline-block;width:90px;height:12px;border-radius:6px;background:rgba(30,22,16,.2);vertical-align:middle"></span>';
    const BOX = '<span class="c10-box" style="display:inline-block;width:44px;height:44px;box-sizing:border-box;border:4px solid rgba(30,22,16,.5);border-radius:6px;vertical-align:middle"></span>';
    const rows = [
      ['시험 수', '1회차 표의 시험 번호(T01~T12)'],
      ['지침 1판 통과 수', '1회차(지침 1판) 아래<br>「통과: ___ / 12」'],
      ['고친 뒤 통과 수', '2회차 아래 「통과: ___ / 12」'],
      ['규칙 시험(T11 개인정보,<br>T12 지시 바꾸기)', '1회차·2회차 아래<br>「규칙 시험 실패: ___건」'],
      ['고친 지침', '「고친 것」 표'],
      ['검토 프로젝트 판정(LAB-5, 있으면)', MPATH('lab5/', '판정기록_양식.md')]].map(([a, d]) => [a, GRAY, BOX, d]);
    const tb = THEME.table(el, { x: 120, y: 306, w: 1680, size: 38, headSize: 34, widths: [640, 130, 214, 600], pad: [3, 20], fill: false, at: 0.3,
      cols: ['항목', '값', '시험 기록과\n대조했는가', '시험 기록에서\n볼 곳'], rows });
    const NC = 4, cells = tb.cells;
    // 넷째 칸: 레몬 바탕(줄과 함께 왼쪽부터 칠한다)과 왼쪽 점선
    const paints = [];
    cells.forEach((c, k) => {
      if (k % NC !== 3) return;
      css(c, { borderLeft: '3px dashed rgba(30,22,16,.45)' });
      if (k < NC) return;
      const pt = h('div', '', c); c.insertBefore(pt, c.firstChild);
      css(pt, { position: 'absolute', inset: '0', background: 'rgba(242,207,74,.55)', transformOrigin: '0 50%' });
      css(c, { position: 'relative' });
      paints.push({ pt, row: Math.floor(k / NC) - 1 });
    });
    // 줄마다 차례로 나타난다(머리 줄 먼저)
    const R0 = 0.45, RS = 0.08;
    const rowsP = { render(lt) {
      cells.forEach((c, k) => THEME.lift(c.lastElementChild, lt, R0 + Math.floor(k / NC) * RS, { shadow: false, dur: 0.35, from: 1.04 }));
      paints.forEach(({ pt, row }) => { const p = prog(lt, R0 + (row + 1) * RS, 0.35, ease.outCubic); set(pt, 'transform', `scaleX(${p.toFixed(4)})`); });
    } };
    const lab = tagH(tb.el, `여는 파일 · ${M('lab6/승인요약_양식.md')} · 시험 결과`, { x: 32, y: -30, at: 0.45, rot: -1.5 });
    // 숫자 줄 네 개(시험 수~규칙 시험)의 셋째 칸 네모에 초록 체크
    const boxes = [...tb.el.querySelectorAll('.c10-box')].slice(0, 4);
    const checks = boxes.map((b, i) => { const r = posIn(b, tb.el); return check(tb.el, r.x - 2, r.y - 8, { size: 52, at: 1.1 + i * 0.15, rot: -6 + i * 2 }); });
    const fix = THEME.tag(el, '다르면 시험 기록의 숫자로 고칩니다', { size: 40, tone: 'cream', at: 1.8, rot: -1.2 });
    fix.el.style.left = px(1800 - 30 - fix.w); fix.el.style.top = px(Math.min(306 + tb.h - 24, 980 - fix.h));
    return [bg, tp, band, tb, rowsP, lab, ...checks, fix];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s05a 채점 기준(고쳐 쓰는 기준 세 줄): 기준 띠 세 장과 오른쪽 대조 카드(강사 사전 실행 초안의 한 문장)
  DECK.slide({ id: 'p2-ch10-s05a', notes: NOTES['p2-ch10-s05a'], ...lay(2.1, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '시험 기록에 없는 내용은 지웁니다', [3, 6]);
    const band = THEME.strip(el, '과정이 섞인 문장은 최종 숫자 한 줄로 · 「확인 필요」 칸에는 내 제안 값', { right: 1800, y: 218, size: 34, rot: 0.5, at: 0.2, padY: 10 });
    const SUB = t => `<div style="font-size:36px;font-weight:500;line-height:1.36;color:var(--dim);margin-top:10px;text-wrap:pretty">${t}</div>`;
    const ck = THEME.checklist(el, { x: 120, y: 296, w: 1170, size: 44, gap: 20, at: 0.3, items: [
      '지울 것 · 시험 기록에 없는 내용(예: <span class="c10-x">「정확도 95%」</span>)',
      '「중간안」「재시험」이 섞이면 → 최종 숫자 한 줄로' + SUB('중간안은 마지막 판 전에 고쳐 본 지침, 재시험은 고친 지침으로 같은 시험을 다시 보낸 것입니다.'),
      '「확인 필요」 칸 → 내 제안 값' + SUB('예: 시범 기간 2주, 공유 범위 고객지원팀 담당자 4명, 발송 전 금액 대조는 담당자')] });
    // 셋째 번호 조각은 초록(제안 값을 채우면 끝난다)
    const rowsEl = [...el.querySelectorAll('.p2-paper')].filter(p => p.querySelector(':scope > .p2-paper .p2-num'));
    const n3 = rowsEl[2] && rowsEl[2].querySelector(':scope > .p2-paper');
    if (n3) { const f = n3.querySelector('.p2-face'); f.classList.remove('p2-lemon'); f.classList.add('p2-green'); css(n3.querySelector('.p2-num'), { color: C.cream }); }
    // 「정확도 95%」 위에 짙은 색지 줄을 덮는다(지울 내용)
    const xs = el.querySelector('.c10-x'), xp = xs.closest('.p2-paper'), xr = posIn(xs, xp);
    const bar = h('div', 'p2-dark p2-grain', xp);
    css(bar, { position: 'absolute', left: px(xr.x - 8), top: px(xr.y + xr.h * 0.5 - 6), width: px(xr.w + 16), height: '12px', transformOrigin: '0 50%', zIndex: 3,
      clipPath: THEME.jag(xr.w + 16, 12, 'left right', 6.6, 3, 0) });
    const barP = { render: lt => { const p = prog(lt, 0.9, 0.3, ease.outCubic); set(bar, 'opacity', lt >= 0.9 ? '1' : '0'); set(bar, 'transform', `rotate(-1.5deg) scaleX(${p.toFixed(4)})`); } };
    // 오른쪽 대조 카드
    const RX = 1340, RW = 460;
    const cd = THEME.card(el, { x: RX, y: 300, w: RW, h: 680, pad: 30, layout: true, rot: 1, at: 1.0, labelSize: 34 });
    const ly = cd.flow.offsetTop + 128 + 22;                   // 지운 이름표(34px 세 줄, 줄 간격 1.25)의 자리는 비워 둔다
    const pr = THEME.paper(cd.el, { x: 22, y: ly, w: RW - 44, h: 100, tone: 'white', rot: 0, at: 1.15, seed: 2.4 });
    const pt = h('div', '', pr.inner, '다만 <span class="c10-mid">중간안에서는</span> 규정과 다른 답을 요구한 T12가 반복 시험에서 실패했다.');
    css(pt, { position: 'absolute', left: '26px', top: '22px', width: px(RW - 44 - 52), fontSize: '36px', lineHeight: 1.4, fontWeight: 500, wordBreak: 'keep-all', color: C.ink });
    const ph = pt.offsetHeight + 44; css(pr.el, { height: px(ph) });
    const rg = ringAt(pr.el, pt.querySelector('.c10-mid'), { gx: 10, gy: 4, bw: 5, at: 1.4 });
    const fin = h('div', '', cd.el, `→ 최종 숫자 한 줄로 · 예(완성본 규칙 시험 행): ${NB('1판 실패 1건(T12),')} ${NB('2판 실패 0건')}`);
    css(fin, { position: 'absolute', left: '30px', top: px(ly + ph + 22), width: px(RW - 60), fontSize: '34px', fontWeight: 700, lineHeight: 1.36, wordBreak: 'keep-all', color: C.ink });
    const finP = pop(fin, 1.5);
    const save = THEME.tag(el, '저장: Ctrl+S(Windows) · Command+S(macOS)', { x: 120, y: ck.bottom + 22, tone: 'kraft', at: 1.7, rot: -1.2 });
    return [bg, tp, band, ck, barP, cd, pr, rg, finP, save];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s06 카드 격자(넘김 카드 넷): 키 없이 1.4초부터 넘어간다(카드 값은 완성본 기록을 넣었을 때의 예라 숨기지 않는다).
  // 뒷면 위에 앞면 이름을 이름표로 남겨 끝 상태만 보아도 어느 칸의 값인지 읽힌다. 아래 띠 카드 세 줄
  DECK.slide({ id: 'p2-ch10-s06', notes: NOTES['p2-ch10-s06'], ...lay(3.1, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '네 칸과 숫자를 확인합니다', [3, 6]);
    const band = THEME.strip(el, '내 시험 기록을 넣었으면: 시험 기록의 같은 줄과 숫자가 같으면 맞습니다', { x: 600, y: 216, size: 40, weight: 700, rot: -0.5, at: 0.2, padY: 8 });
    const FLIP = 1.4, GY = 384, GH = 340;
    const lab = t => `<div class="p2-card-l" style="font-size:36px;color:inherit;opacity:.85">${t}</div>`;
    const big = t => `<div style="font-family:var(--num);font-size:112px;line-height:1;margin-top:10px;white-space:nowrap">${t}</div>`;
    const sub = t => `<div style="font-size:38px;font-weight:700;line-height:1.3;margin-top:12px;text-wrap:balance">${t}</div>`;
    const slot = t => `<span style="display:inline-block;white-space:nowrap;margin:0 10px 6px 0">${t}</span>`;
    const gd = THEME.grid(el, { x: 120, y: GY, w: 1680, h: GH, cols: 4, gap: 36, at: 0.3, each: 0.15, titleSize: 60, flipAt: FLIP, items: [
      { title: '칸', back: lab('칸') + '<div style="font-size:60px;font-weight:700;line-height:1.15;margin-top:8px">네 칸</div>' +
        `<div style="font-size:34px;font-weight:700;line-height:1.3;margin-top:14px">${['[만든 것]', '[시험 결과]', '[남는 위험]', '[사람이 정할 것]'].map(slot).join('')}</div>` },
      { title: '지침 1판', back: lab('지침 1판') + big('10 / 12') + sub('규칙 시험 실패 1건(T12)') },
      { title: '지침 2판', back: lab('지침 2판') + big('12 / 12') + sub('규칙 시험 실패 0건') },
      { title: '사람이 정할 것', back: lab('사람이 정할 것') + '<div style="font-size:54px;font-weight:700;line-height:1.22;margin-top:12px">「확인 필요」 →<br>내 제안 값</div>' }] });
    gd.cards.forEach(c => { c.flip.front.style.padding = '36px'; c.flip.back.style.padding = '34px 32px';
      const ft = c.flip.front.querySelector('.p2-card-t'); if (ft) css(ft, { textWrap: 'balance' }); });
    const hand = THEME.tag(el, '네 가지가 모두 맞는지 봅니다', { x: 104, y: GY - 34, size: 36, at: 0.9, rot: -2.5 });
    const done = tagH(el, `${M('완성본/시험기록_예.md')}를 넣었을 때`, { x: 0, y: GY - 30, tone: 'kraft', at: 1.0, rot: 1.5 });
    done.place(120 + 2 * (1680 - 3 * 36) / 4 + 36 + 18 - done.w / 2, GY - 32);
    // 아래 띠 카드: 셋째 줄은 처음부터, 첫째·둘째 줄은 넷째 카드가 넘어가고 0.2초 뒤
    const BY = GY + GH + 26, END = FLIP + 3 * 0.15 + 0.5;
    const pp = THEME.paper(el, { x: 120, y: BY, w: 1680, h: 980 - BY, tone: 'cream', rot: -0.4, at: 1.05, seed: 6.2 });
    const col = h('div', '', pp.inner); css(col, { position: 'absolute', left: '44px', right: '44px', top: '0', bottom: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px', wordBreak: 'keep-all', color: C.ink });
    const l1 = h('div', '', col, '1판 10 / 12는 통과 기준(11개 이상, 규칙 시험 실패 0건)을 채우지 못해<br>지침을 고치고 2판으로 다시 시험했습니다.');
    const l2 = h('div', '', col, '빠진 숫자가 있으면 내 시험 기록의 <span class="c10-l1">1판 줄</span>과 견주어 채웁니다');
    const l3 = h('div', '', col, '1판의 규칙 시험 실패 건수가 요약에서 빠졌다');
    css(l1, { fontSize: '36px', fontWeight: 500, lineHeight: 1.36, textWrap: 'balance' });
    css(l2, { fontSize: '38px', fontWeight: 700, lineHeight: 1.36 });
    css(l3, { fontSize: '34px', fontWeight: 500, lineHeight: 1.36, color: C.dim });
    const ul = underline(pp.el, l2.querySelector('.c10-l1'), { at: END + 0.2 + 0.15 + 0.25 });
    return [bg, tp, band, gd, hand, done, pp, pop(l3, 1.2), pop(l1, END + 0.2), pop(l2, END + 0.35), ul];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s07 순서 조각(셋): 열어 둘 파일 세 개, 노트북 바꾸기(두 노트북이 자리를 바꾼다), 판정카드 질문 5개.
  // 글이 많은 첫 조각을 넓게 둔다(한 줄에 몇 자만 드는 줄이 생기지 않게)
  DECK.slide({ id: 'p2-ch10-s07', notes: NOTES['p2-ch10-s07'], ...lay(2.1, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '읽고 확인한 만큼만 승인합니다', [4, 6]);
    const Y = 312, H = 650, G = 36, WS = [700, 480, 428], PX = 40;
    let x = 120;
    const parts = WS.map((w, i) => {
      const at = 0.3 + i * 0.2, y = Y + (i % 2 ? 16 : 0);
      const pp = THEME.paper(el, { x, y, w, h: H, tone: 'cream', rot: [-0.8, 0.7, -0.5][i], at, pad: PX, seed: 3.3 + i });
      const flow = h('div', '', pp.inner); css(flow, { position: 'relative', marginTop: '70px', wordBreak: 'keep-all', color: C.ink });
      const np = chip(pp.el, String(i + 1), { tone: 'lemon', at: at + 0.1 });
      const r = { pp, flow, np, x, y, w, at, extra: [] };
      x += w + G;
      return r;
    });
    const T = (p, t) => { const d = h('div', '', p.flow, t); css(d, { fontSize: '50px', fontWeight: 700, lineHeight: 1.2, textWrap: 'balance' }); return d; };
    // 1: 바꾸기 전에 열어 둘 파일
    T(parts[0], '바꾸기 전에 내 노트북에<br>열어 둘 파일');
    const files = [
      `${MPATH('lab6/', '승인요약_양식.md')}<wbr>${DIM(NB('(내가 고친 승인 요약)'))}`,
      `내 시험 기록${DIM(`(${MPATH('lab4/', '시험기록_양식.md')}, 없으면 ${MPATH('lab6/', '완성본/', '시험기록_예.md')})`)}`,
      `${MPATH('lab6/', '팀장_판정카드.md')}`];
    const fl = files.map((t, i) => {
      const d = h('div', '', parts[0].flow, t);
      css(d, { fontSize: '36px', lineHeight: 1.36, marginTop: i ? '18px' : '30px', paddingLeft: '30px', position: 'relative' });
      const dot = h('div', 'p2-lemon', d); css(dot, { position: 'absolute', left: '0', top: '14px', width: '16px', height: '22px', transform: 'rotate(-6deg)' });
      return pop(d, 0.7 + i * 0.1);
    });
    // 2: 노트북 바꾸기
    T(parts[1], '세 파일을 열어 옆 사람과 노트북을 바꿉니다');
    const p2 = parts[1], LW = 190, LY = H - PX - 150;
    const ax = 28, bx = p2.w - 28 - LW;
    const la = THEME.thing(p2.pp.el, 'laptop', { x: ax, y: LY, w: LW, rot: -3, at: 0.9 });
    const lb = THEME.thing(p2.pp.el, 'laptop', { x: bx, y: LY, w: LW, rot: 3, at: 0.95 });
    const mk = (t, tone) => { const s0 = h('div', `p2-${tone}`, t.el); css(s0, { position: 'absolute', right: '10px', top: '10px', width: '30px', height: '30px', borderRadius: '50%', boxShadow: '0 0 0 3px #fff' }); };
    mk(la, 'lemon'); mk(lb, 'green');
    const ar = THEME.paper(p2.pp.el, { x: p2.w / 2 - 48, y: LY - 92, w: 96, h: 64, tone: 'red', rot: -3, at: 1.1, k: 0.6 });
    ar.inner.innerHTML = '<svg viewBox="0 0 100 60" width="96" height="64" style="position:absolute;left:0;top:0"><path d="M16 30 H84 M16 30 l16 -14 M16 30 l16 14 M84 30 l-16 -14 M84 30 l-16 14" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const swap = { render(lt) {
      la.render(lt); lb.render(lt); ar.render(lt);
      const a = prog(lt, 1.2, 0.6, ease.inOutCubic), dx = (bx - ax) * a, arc = Math.sin(Math.PI * a);
      set(la.el, 'translate', `${dx.toFixed(1)}px ${(-70 * arc).toFixed(1)}px`);
      set(lb.el, 'translate', `${(-dx).toFixed(1)}px ${(26 * arc).toFixed(1)}px`);
    } };
    // 3: 판정카드
    T(parts[2], '판정카드 질문 5개에 답합니다');
    const p3 = parts[2];
    const tbl = THEME.thing(p3.pp.el, 'table', { x: 34, y: H - PX - 340, w: 250, rot: -3, at: 1.3 });
    const card = THEME.tag(p3.pp.el, '팀장 판정카드', { y: H - PX - 96, size: 40, at: 1.4, rot: 2 });
    card.el.style.left = px(p3.w - card.w - 18);
    return [bg, tp, ...parts.map(p => group(p.pp, p.np)), ...fl, swap, tbl, card];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s07b 표 한 장: 팀장 판정카드 질문 5개(판정카드 문장 그대로). 오른쪽 두 칸은 비운다. 질문 4 꼬리표
  DECK.slide({ id: 'p2-ch10-s07b', notes: NOTES['p2-ch10-s07b'], ...lay(1.9, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '판정카드 질문 5개에 예·아니오로 답합니다', [4, 6]);
    const Q = [
      '[시험 결과]의 숫자가 시험 기록과 같은가? <span class="c10-q1">시험 기록에서 한 줄을 골라 대조했다</span>',
      '규칙 시험(T11 개인정보, T12 지시 바꾸기)이 모두 통과했는가?',
      '[남는 위험]마다 막는 방법이 적혀 있는가?',
      '규정에 없는 질문(대관 취소 수수료, 과태료 이의 신청 등)이 들어오면 금액을 지어내지 않고 담당 부서나 처리 기관으로 넘긴다는 것이 시험으로 확인되었는가?',
      '쓸 사람, 시범 기간, 공유 범위, 발송 전 확인 방법이 정해졌는가?'];
    const NUMC = n => `<span class="c10-n" style="flex:none;display:inline-flex;align-items:center;justify-content:center;width:54px;height:58px;margin-top:-2px;background:${C.lemon};` +
      `font-family:var(--num);font-size:40px;line-height:1;color:${C.ink};box-shadow:0 0 0 3px ${C.white},0 3px 5px rgba(30,22,16,.3);transform:rotate(-4deg)">${n}</span>`;
    const rows = Q.map((q, i) => [`<div style="display:flex;gap:20px;align-items:flex-start">${NUMC(i + 1)}<div class="c10-qt">${q}</div></div>`, '', '']);
    const tb = THEME.table(el, { x: 120, y: 300, w: 1680, size: 38, headSize: 34, widths: [1246, 210, 224], pad: [4, 22], fill: false, at: 0.3,
      cols: ['팀장 판정카드', '예 / 아니오', '확인한 방법'], rows });
    const cells = tb.cells, NC = 3;
    css(cells[0].firstElementChild, { fontFamily: 'var(--display)', fontWeight: 400, fontSize: '44px', color: C.ink });
    // 오른쪽 두 칸 사이에 세로 선(빈 칸이 칸으로 보이게)
    cells.forEach((c, k) => { if (k % NC) css(c, { borderLeft: '2px solid rgba(30,22,16,.2)' }); });
    const rowsP = { render(lt) { cells.forEach((c, k) => { const r = Math.floor(k / NC); THEME.lift(c.firstElementChild, lt, r ? 0.45 + r * 0.12 : 0.4, { shadow: false, dur: 0.35, from: 1.04 }); }); } };
    const rg = ringAt(tb.el, tb.el.querySelector('.c10-q1'), { gx: 10, gy: 4, bw: 5, at: 1.2 });
    // 질문 4 셋째 줄 오른쪽 빈 자리에 걸친 꼬리표: 마지막 줄 글 끝 바로 뒤에서 시작한다
    const q4t = cells[4 * NC].querySelector('.c10-qt'), rg4 = document.createRange(); rg4.selectNodeContents(q4t);
    const lines4 = [...rg4.getClientRects()], tbR = tb.el.getBoundingClientRect(), kk = (tbR.width / tb.el.offsetWidth) || 1;
    const last4 = lines4.reduce((a, b) => (b.bottom > a.bottom + 2 || (Math.abs(b.bottom - a.bottom) <= 2 && b.right > a.right) ? b : a));
    const tg = THEME.tag(tb.el, '질문 4 → 시험 기록의 T09·T10 줄(규정에 없는 질문)', { size: 36, tone: 'lemon', at: 1.4, rot: -1.5 });
    const lx = (last4.right - tbR.left) / kk + 14, ly = (last4.top + last4.height / 2 - tbR.top) / kk;
    tg.el.style.left = px(Math.min(lx, 1680 - 6 - tg.w)); tg.el.style.top = px(ly - tg.h / 2);
    if (lx > 1680 - 6 - tg.w) console.warn(`[DECK] s07b 꼬리표가 질문 4 글과 겹친다(${Math.round(lx - (1680 - 6 - tg.w))}px)`);
    return [bg, tp, tb, rowsP, rg, tg];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s07a 판정 순서: 판정카드 파일의 차례(승인 → 수정 요청 → 보류). 답 조각은 모두 주홍(사람의 결정)
  DECK.slide({ id: 'p2-ch10-s07a', notes: NOTES['p2-ch10-s07a'], ...lay(2.0, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '판정은 셋 가운데 하나를 고릅니다', [4, 6]);
    const band = THEME.strip(el, '규칙 시험(T11, T12)이 하나라도 실패했으면 승인하지 않습니다.', { right: 1800, y: 216, size: 36, weight: 700, rot: 0.5, at: 0.2, padY: 10 });
    const dc = THEME.decide(el, { x: 120, y: 306, w: 1680, aw: 440, gap: 18, size: 48, aSize: 76, at: 0.3, rows: [
      { q: `<span class="c10-q">질문 5개가 모두 「예」이거나, ${NB('「아니오」인')} 질문을 조건으로 막을 수 있다</span>`, a: '승인', tone: 'red' },
      { q: '<span class="c10-q">숫자가 시험 기록과 다르거나, 남는 위험에 막는 방법이 없다</span>', a: '수정 요청', tone: 'red' },
      { q: `<span class="c10-q"><span class="c10-rf">규칙 시험 실패가 있거나</span>, ${NB('시험 수가')} 모자라 판단할 수 없다</span>`, a: '보류', tone: 'red' }] });
    // 줄 수는 그대로 두고 줄 길이만 고르게 한다(낱말 하나만 남는 줄을 막는다)
    el.querySelectorAll('.c10-q').forEach(q => css(q.parentElement, { textWrap: 'balance' }));
    const rf = el.querySelector('.c10-rf');
    const rg = ringAt(rf.closest('.p2-paper'), rf, { gx: 10, gy: 4, bw: 5, at: 1.3 });
    const tg = tagH(el, `질문 5개의 답을 보고 고릅니다 · ${M('lab6/팀장_판정카드.md')} 「판정」`, { x: 136, y: dc.bottom - 16, tone: 'cream', at: 1.5, rot: -1 });
    return [bg, tp, band, dc, rg, tg];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s08 표 한 장: 승인요약_양식.md 맨 아래(위쪽을 찢은 종이)의 승인 기록 칸. 빈 칸 네 개와 질문 번호 빈칸에 주홍 고리.
  // 오른쪽 열에 채울 곳·판정마다 적을 것 쪽지와 저장 이름표
  DECK.slide({ id: 'p2-ch10-s08', notes: NOTES['p2-ch10-s08'], ...lay(2.4, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '승인 기록에 판정과 조건을 적습니다', [5, 6]);
    const band = THEME.strip(el, `판정한 사람이 양식 아래 칸을 채웁니다 · 날짜 · 판정 · 조건 · 판정한 사람`, { right: 1800, y: 218, size: 34, rot: 0.5, at: 0.2, padY: 10 });
    const PW = 1150, PH = 680, PY0 = 300, IP = 54;
    const pp = THEME.paper(el, { x: 120, y: PY0, w: PW, h: PH, tone: 'cream', torn: 'top', rot: 0, at: 0.3, seed: 2.6 });
    const inn = h('div', '', pp.inner); css(inn, { position: 'absolute', left: px(IP), right: px(IP), top: '62px', bottom: '40px', color: C.ink, wordBreak: 'keep-all' });
    const head = h('div', '', inn, '승인 기록(판정한 사람이 채운다)'); css(head, { position: 'relative', fontSize: '50px', fontWeight: 700, lineHeight: 1.2 });
    const g = h('div', '', inn);
    css(g, { position: 'relative', display: 'grid', gridTemplateColumns: '0.75fr 1.45fr 1.15fr 1fr', marginTop: '34px', borderTop: '3px solid rgba(30,22,16,.55)' });
    const HD = ['날짜', '판정<br>(승인·수정 요청·보류)', '조건 또는<br>고칠 것', '판정한 사람'];
    const heads = HD.map((t, i) => {
      const c = h('div', '', g); css(c, { position: 'relative', padding: '16px 18px', fontSize: '36px', fontWeight: 700, lineHeight: 1.25, color: C.dim, borderBottom: '3px solid rgba(30,22,16,.55)',
        borderLeft: i ? '2px solid rgba(30,22,16,.2)' : 'none', display: 'flex', alignItems: 'center' });
      const tx = h('div', '', c, t); css(tx, { position: 'relative', zIndex: 1 });
      return { c, tx };
    });
    // 판정 칸 머리만 주홍 띠(사람의 결정)
    const hr = heads[1].c; css(hr, { color: '#FFFFFF' });
    const redB = h('div', 'p2-red p2-grain', hr); hr.insertBefore(redB, hr.firstChild); css(redB, { position: 'absolute', inset: '6px 4px', transformOrigin: '0 50%' });
    const blanks = [0, 1, 2, 3].map(i => { const c = h('div', '', g); css(c, { height: '230px', borderBottom: '2px solid rgba(30,22,16,.3)', borderLeft: i ? '2px solid rgba(30,22,16,.2)' : 'none' }); return c; });
    const qn = h('div', '', inn, '판정카드에서 「아니오」였던 질문 번호: <span class="c10-qn">____</span>');
    css(qn, { position: 'relative', fontSize: '44px', fontWeight: 700, lineHeight: 1.3, marginTop: '40px' });
    const headP = pop(head, 0.5), gP = pop(g, 0.55, { from: 1.02 }), qP = pop(qn, 0.7);
    const redP = { render: lt => { const p = prog(lt, 0.7, 0.3, ease.outCubic); set(redB, 'transform', `scaleX(${p.toFixed(4)})`); } };
    const rings = blanks.map((b, i) => ringAt(pp.el, b, { gx: -14, gy: -18, bw: 7, br: 18, at: 1.2 + i * 0.15, rot: (i % 2 ? 1 : -1) * 1.2 }));
    const rq = ringAt(pp.el, qn.querySelector('.c10-qn'), { gx: 12, gy: 4, bw: 7, at: 1.9 });
    // 오른쪽 열
    const RX = 120 + PW + 40, RW = 1800 - RX;
    const N1Y = 318;
    const n1 = THEME.note(el, { x: RX, y: N1Y, w: RW, label: '채울 곳', size: 36, rot: 1, at: 0.9,
      html: `옆 사람의 ${MPATH('승인요약_양식.md')} 맨 아래 「승인 기록」` });
    const LN = (t, m) => `<div style="text-wrap:balance${m ? ';margin-top:8px' : ''}">${t}</div>`;
    const n2 = THEME.note(el, { x: RX + 4, y: N1Y + n1.h + 44, w: RW - 4, label: '판정마다 적을 것', size: 36, rot: -0.8, at: 1.1, labelRot: 1.5,
      html: LN('승인 → 조건, 공유 범위') + LN(`수정 요청 → ${NB('고칠 것과 다시 볼 날짜')}`, 1) + LN('보류 → 더 시험할 것', 1) });
    // 저장 이름표: 오른쪽 열 폭에 맞게 「·」 뒤에서 두 줄로 나눈다(질문 번호 빈칸을 가리지 않게)
    const save = tagH(el, `저장: Ctrl+S(Windows) ·<br>Command+S(macOS)`, { tone: 'kraft', at: 1.5, rot: -1.2, size: 34 });
    save.place(1800 - save.w, 980 - save.h);
    if (N1Y + n1.h + 44 + n2.h > 980 - save.h - 10) console.warn('[DECK] s08 오른쪽 쪽지와 저장 이름표가 겹친다');
    return [bg, tp, band, pp, headP, gP, redP, qP, n1, n2, save, ...rings, rq];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s09 채점 기준(사실 네 줄): 공유 범위를 정할 때 알아 둘 것. 오른쪽에 승인 기록 그림 위에 겹친 공유 범위 예 카드와 쪽지
  DECK.slide({ id: 'p2-ch10-s09', notes: NOTES['p2-ch10-s09'], ...lay(2.1, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '공유 범위는 적기만 하고 열지 않습니다', [6, 6]);
    const band = THEME.strip(el, '승인이면 조건 칸에 공유할 사람을 적습니다 · Plus 프로젝트 공유는 최대 10명', { right: 1800, y: 218, size: 34, rot: 0.5, at: 0.2, padY: 10 });
    const ck = THEME.checklist(el, { x: 120, y: 312, w: 1170, size: 36, gap: 16, at: 0.3, items: [
      'Plus 계정 소유자는 프로젝트에 최대 10명까지 초대할 수 있습니다.',
      '링크로 누구나 들어오게 열면, 링크를 받은 로그인한 ChatGPT 사용자는 <span class="c10-any">누구나</span> 들어올 수 있습니다.',
      '편집 권한을 받은 사람은 지침과 파일을 고치고 다른 사람을 초대할 수 있습니다. 편집 권한이 없는 참여자는 보고 대화만 합니다.',
      '공유 프로젝트의 대화는 소유자와 모든 참여자가 「모델 개선을 위한 데이터 학습 허용」을 켠 경우에만 모델 개선에 쓰일 수 있습니다.'] });
    const hd = THEME.tag(el, '공유 범위를 정할 때 알아 둘 것', { x: 140, y: 312 - 34, at: 0.25, rot: -2 });
    const any = el.querySelector('.c10-any');
    const rg = ringAt(any.closest('.p2-paper'), any, { gx: 10, gy: 4, bw: 5, at: 0.9 });
    // 오른쪽 열
    const RX = 1336, RW = 1800 - RX;
    const CY = 330;
    const th = THEME.thing(el, 'summary', { x: RX + RW - 200, y: CY - 38, w: 190, rot: 7, at: 1.05 });
    const cd = THEME.card(el, { x: RX, y: CY, w: RW, h: 'fit', pad: 30, layout: true, rot: -1.2, at: 1.1, label: '공유 범위 예(완성본)',
      body: '고객지원팀 체육시설·주차 담당자 4명. 편집 권한 없이 초대하고, 링크로 누구나 들어오게 열지 않는다(Plus 공유는 최대 10명)', bodySize: 36 });
    const tape = THEME.tape(cd.el, { x: 40, y: -22, w: 140, rot: -4, at: 1.2 });
    const nt = THEME.note(el, { x: RX + 6, y: CY + cd.h + 22, w: RW - 6, size: 40, rot: 1, at: 1.4, padY: 18,
      html: '<div style="font-weight:700;line-height:1.3">이 실습에서는 공유 링크를 실제로 열지 않습니다.</div>' });
    if (CY + cd.h + 22 + nt.h > 984) console.warn(`[DECK] s09 오른쪽 열이 넘친다(${CY + cd.h + 22 + nt.h}px)`);
    return [bg, tp, band, ck, hd, rg, th, cd, tape, nt];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s10 승인 도장: 손들기 카드 세 장과 오민석 팀장(첫 화면). 키 한 번(1.6) 뒤 1.7초에 승인 기록 종이가 크게 붙고
  // 조건 줄이 놓인 뒤 2.5초에 「승인」 도장이 찍힌다. 같은 때 왼쪽 「승인」 카드에 주홍 테이프
  DECK.slide({ id: 'p2-ch10-s10', notes: NOTES['p2-ch10-s10'], ...lay(3.0, el => {
    const bg = THEME.bg(el, 'accent', { side: 'right' });
    const tp = top(el, '팀장은 조건을 붙여 승인했습니다', [6, 6]);
    const band = THEME.strip(el, '승인·수정 요청·보류 가운데 내 판정은?', { x: 120, y: 274, size: 36, weight: 700, rot: -0.5, at: 0.2, padY: 8 });
    // 왼쪽: 손들기 카드 세 장
    const opts = ['승인', '수정 요청', '보류'].map((t, i) => {
      const pp = THEME.paper(el, { x: 120 + i * 262, y: 356, w: 240, h: 200, tone: 'cream', rot: [-2, 1.5, -1][i], at: 0.3 + i * 0.12, seed: 3.7 + i });
      const tx = h('div', '', pp.inner, t);
      css(tx, { position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: '50px', fontWeight: 700, lineHeight: 1.15, color: C.ink, wordBreak: 'keep-all', padding: '0 18px' });
      return pp;
    });
    const RV = 1.7;
    const okTape = THEME.tape(opts[0].el, { x: 50, y: -18, w: 140, rot: -6, tone: 'red', at: RV + 0.8 });
    const oh = THEME.person(el, 'oh', { x: 300, y: 980 - 360 * 1.2, scale: 1.2, at: 0.8, org: true });
    // 오른쪽: 승인 기록 종이(키 누름 뒤 크게 붙는다). 주홍 면의 대부분을 쓴다
    const PX0 = 946, PY0 = 284, PW = 854, PH = 704, P = 42;
    const pp = THEME.paper(el, { x: PX0, y: PY0, w: PW, h: PH, tone: 'cream', rot: -0.7, at: RV, seed: 8.4 });
    const ppP = { render: lt => THEME.lift(pp.el, lt, RV, { rot: -0.7, shadowEl: pp.face, k: 1.5, dur: 0.45, from: 1.22 }) };
    const tag = THEME.tag(pp.el, '승인 기록 · 실습 묶음 완성본', { x: P - 16, y: -30, at: RV + 0.15, rot: -2 });
    const abs = (html, x, y, st) => { const d = h('div', '', pp.inner, html); css(d, Object.assign({ position: 'absolute', left: px(x), top: px(y), color: C.ink, wordBreak: 'keep-all' }, st || {})); return d; };
    // 위 왼쪽: 날짜, 사람이 정할 것(두 값을 위아래로)
    const date = abs('2026-11-27', P, 44, { fontFamily: 'var(--num)', fontSize: '84px', lineHeight: 1 });
    const g1 = abs('사람이 정할 것에서', P, 144, { fontSize: '36px', fontWeight: 500, color: C.dim, lineHeight: 1.2 });
    const CHIP = t => `<span style="display:inline-block;padding:2px 12px 4px;border-bottom:5px solid ${C.ink};font-size:66px;font-weight:700;line-height:1.12;white-space:nowrap">${t}</span>`;
    const c1 = abs(CHIP('시범 2주'), P, 194), c2 = abs(CHIP('담당자 4명'), P, 290);
    // 위 오른쪽: 판정 칸(점선)과 그 안에 찍히는 「승인」 도장(지름 290)
    const BW = 330, BH = 330, BX = PW - P - BW, BY = 20, SZ = 290;
    const box = abs('', BX, BY, { width: px(BW), height: px(BH), boxSizing: 'border-box', border: '4px dashed rgba(30,22,16,.4)', borderRadius: '12px' });
    // 아래: 남는 위험에서(종이 아래쪽에 붙여 쓴다)
    const low = h('div', '', pp.inner);
    css(low, { position: 'absolute', left: px(P), right: px(P), bottom: '22px', color: C.ink, wordBreak: 'keep-all' });
    const sep = h('div', '', low); css(sep, { borderTop: '3px dashed rgba(30,22,16,.3)', marginBottom: '12px' });
    const g2 = h('div', '', low, '남는 위험에서'); css(g2, { fontSize: '36px', fontWeight: 500, color: C.dim, lineHeight: 1.2 });
    const g2a = h('div', '', low, '금액 안내 답변은 발송 전 담당자 대조'); css(g2a, { fontSize: '48px', fontWeight: 700, lineHeight: 1.22, marginTop: '4px', whiteSpace: 'nowrap' });
    const g2b = h('div', '', low, 'ChatGPT 화면에서 12개를 다시 시험해 11개 이상 통과하고<br>규칙 시험 실패가 0건이면 시작');
    css(g2b, { fontSize: '42px', fontWeight: 500, lineHeight: 1.28, marginTop: '8px', textWrap: 'balance' });
    const topEnd = c2.offsetTop + c2.offsetHeight, lowTop = PH - 22 - low.offsetHeight;
    if (lowTop < Math.max(topEnd, BY + BH) + 8) console.warn(`[DECK] s10 승인 기록 아래 묶음이 위 묶음과 겹친다(${Math.round(Math.max(topEnd, BY + BH) + 8 - lowTop)}px)`);
    const lines = [g1, c1, c2, sep, g2, g2a, g2b].map((d, i) => pop(d, RV + 0.3 + i * 0.07));
    const dateP = pop(date, RV + 0.25, { from: 1.1 }), boxP = pop(box, RV + 0.25);
    // 도장 사진 조각: 종이 오른쪽 위 모서리에 걸친다(도장 자국과 머리말 「가상 사례」를 비킨다)
    const cut = THEME.cutout(el, '../assets/img/p2/p2-key-stamp_cut.png', { x: PX0 + PW - 72, y: PY0 - 168, w: 150, h: 250, rot: 12, at: RV + 0.6, fallback: 'stamp' });
    const st = THEME.stamp(pp.el, { x: BX + (BW - SZ) / 2, y: BY + (BH - SZ) / 2, size: SZ, text: '승인', at: RV + 0.8, rot: -12, paper: pp.el });
    return [bg, tp, band, ...opts, oh, ppP, tag, dateP, boxP, ...lines, cut, st, okTape];
  }, [1.6]) });
})();
