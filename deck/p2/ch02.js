/* 파트 2 · 2장 「실습: 민원 데이터로 시범 범위 정하기」 — 레이아웃 목록(p2.md 8절)으로 다시 만든 장면 코드
 * 원고: plan/slides/p2-ch02.json · 배정표: plan/assets/p2_layout_ch02.md · 본보기: deck/p2/ch00.js s08~s26, deck/p2/ch06.js
 * 키 누름은 없다(모든 장 steps []). 모든 조각이 차례로 놓여 2.6초 안에 끝 상태가 된다.
 * 캡처(deck/assets/p2/shots/)가 아직 없어 s03·s06 의 화면은 THEME.shot 의 그린 화면이다.
 * 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다. */
(function () {
  'use strict';
  const { css, h, set, prog, lerp, ease } = REEL;
  DECK.config({ part: 'p2', chapter: 'ch02', title: '실습: 민원 데이터로 시범 범위 정하기' });

  const NOTES = {
    "p2-ch02-s01": "2장은 파트 2의 첫 실습입니다. 1장에서 오민석 팀장이 건 조건 세 가지 가운데 첫째가 범위를 좁히는 것이었습니다. 한서윤 주임은 어느 민원부터 프로젝트에 맡길지를 지난 분기에 들어온 민원의 건수로 정합니다. 여러분도 같은 민원 접수 목록을 ChatGPT에 올려 유형별로 세어 보겠습니다.",
    "p2-ch02-s02": "한서윤 주임 앞에 2026년 3분기 민원 접수 목록이 있습니다. 7월 1일부터 9월 30일까지 누리집, 전화, 방문으로 들어온 민원 240건이 담긴 CSV 파일입니다. CSV는 칸을 쉼표로 나눠 적은 표 파일이고, 이 파일에서는 한 줄이 민원 한 건입니다. 오민석 팀장의 첫 조건대로 모든 민원을 한꺼번에 맡기지 않고, 건수가 많으면서 규정으로 답이 정해지는 유형부터 고르려고 합니다. 240건을 직접 세지 않고 ChatGPT에 파일을 올려 세게 합니다. 이 목록의 민원과 수치, 등장인물은 모두 가상입니다.",
    "p2-ch02-s03": "ChatGPT에서 새 대화를 엽니다. 입력창의 + 단추를 누르고 파일을 추가하는 메뉴에서 실습 묶음 자료 폴더의 민원접수목록_2026_3분기.csv를 첨부합니다. 영어 화면에서는 이 메뉴가 Add photos & files이고, 이름이 제 화면과 다르면 순서만 따라 주세요. 압축 파일로 받으셨다면 압축을 푼 폴더 안의 파일을 고릅니다. 이 파일은 가상 자료이고 이름이나 전화번호 칸이 없습니다. 실습 규칙 1대로 오늘은 실습 묶음의 가상 자료만 올리고, 소속 기관의 실제 민원 목록은 올리지 않습니다. 첨부한 파일은 다음 화면의 요청 1과 함께 보냅니다. (강사 확인: 한국어 도움말은 기계 번역 문서라 「사진 및 파일 추가」라는 표기가 화면의 메뉴 이름과 같은지 알 수 없습니다(F-17b). 강의 전날 K-04에서 캡처하고, 그 이름으로 말합니다.) (화면에서 옮긴 문구: 「막히면: lab2/완성본/민원접수목록_2026_3분기.xlsx를 첨부합니다」)",
    "p2-ch02-s04": "실습 묶음 lab2 폴더의 단계.md를 오른쪽 클릭하고 연결 프로그램에서 메모장(macOS는 텍스트 편집기)으로 엽니다. 「요청 1」 아래 ```text 줄과 ``` 줄 사이의 세 줄만 복사하고, 두 표시 줄은 복사하지 않습니다. 앞 화면에서 CSV를 첨부해 둔 입력창에 Ctrl+V(macOS는 Command+V)로 붙여 넣고 보냅니다. 요청 1에는 「파이썬 코드를 실행해서」를 적어 두었고, 그래야 4번 단계에서 표의 숫자가 코드로 센 값인지 확인할 수 있습니다.",
    "p2-ch02-s04a": "표 대신 설명만 나오면 같은 대화에 「파이썬으로 실행해서 표로 보여 줘」를 보내고, 표의 한글이 깨지면 완성본 폴더의 xlsx 파일을 올려 다시 보냅니다. (강사 확인: 그린 화면의 표 값은 lab2/기대결과.md이고, 건수와 평균 처리일수는 강사가 codex로 요청 1을 한 번 보낸 결과(V-02, 2026-11-23)와 같았습니다. ChatGPT 화면의 표는 강의 전날 K-04에서 확인하고, 참가자 화면에서는 문장과 비율의 소수 자리가 다를 수 있습니다.)",
    "p2-ch02-s05": "같은 대화에 lab2/단계.md의 「요청 2」를 복사해 보냅니다. 이번에도 ```text 줄과 ``` 줄 사이의 한 줄만 복사합니다. 막대 여섯 개가 나오고 막대 위 숫자가 앞 화면 표의 건수와 같으면 됩니다. 차트의 방향과 색은 제 화면과 달라도 됩니다. ChatGPT의 데이터 분석에서는 막대 차트를 상호작용 차트로 바꿔 볼 수도 있습니다. 차트가 나오지 않아도 범위를 정할 때는 요청 1의 표 숫자를 쓰므로 다음 단계로 넘어갑니다. (강사 확인: 차트 화면은 codex로 확인하지 못했습니다. 강의 전날 K-04에서 요청 2를 보내 캡처합니다.)",
    "p2-ch02-s06": "요청 1의 표가 코드로 센 숫자인지 확인합니다. 같은 대화에 lab2/단계.md의 「요청 3」을 복사해 보내면 건수와 평균 처리일수를 계산한 코드가 나옵니다. 그 코드에서 CSV 파일을 여는 줄과 「민원유형」별로 묶어 세는 줄을 찾습니다. 묶어 세는 줄에는 보통 groupby, value_counts, Counter 같은 말이 들어가지만, 묶어 세는 방법은 답마다 다릅니다. 화면의 코드는 강사가 codex로 요청 3을 한 번 보내 받은 답의 일부입니다. groupby도 value_counts도 없이, 파일을 연 뒤 한 줄씩 읽어 민원유형별로 모아 셌습니다. 이렇게 파일을 여는 줄과 유형별로 묶어 세는 줄이 있으면 표의 숫자는 계산하지 않고 써 낸 값이 아니라 코드를 실행해 센 값입니다. 여러분 화면의 코드는 다를 수 있습니다. 코드가 없거나 숫자만 다시 적어 주면 「요청 3」을 한 번 더 보냅니다. (강사 확인: 코드를 여는 화면 요소의 이름과 모양은 공식 문서에 없어 화면에 그리지 않았습니다. 강의 전날 K-04에서 요청 1의 답변에 코드가 어떻게 보이는지와 요청 3의 답변을 함께 캡처합니다.)",
    "p2-ch02-s07": "표가 나왔으면 건수를 확인합니다. 수강료 환불 74건, 주차 요금 감면 61건, 대관 신청 39건, 시설 고장 신고 33건, 사고·분쟁 21건, 기타 12건이고 합계는 240건입니다. 여섯 건수와 합계가 모두 같으면 손을 들어 주세요. 비율은 반올림 방식에 따라 소수 첫째 자리가 0.1 다를 수 있고, 건수와 합계가 같으면 맞은 것입니다. 건수가 다르면 같은 대화에 「합계가 240인지 확인하고, 다르면 원인을 보여 줘」를 보냅니다. 평균 처리일수는 시범 범위 판단표를 채울 때 함께 씁니다. (강사 확인: 이 값은 lab2/기대결과.md이고, 강사가 codex로 요청 1을 한 번 보낸 결과(V-02, 2026-11-23)가 파이썬으로 직접 센 값과 같았습니다. ChatGPT 화면에서 같은지는 강의 전날 K-04에서 확인하고, 참가자 화면에서는 문장과 표 모양이 다를 수 있습니다.)",
    "p2-ch02-s07a": "시범 범위 판단표의 「규정으로 답이 정해지는가」 칸을 채우려면 근거가 있어야 합니다. CSV의 답변근거 칸에는 「체육시설 이용 규정 제7조」 같은 규정 이름이 적혀 있습니다. 같은 대화에 lab2/단계.md의 「요청 4」를 복사해 보냅니다. 이 결과는 다음 화면의 판단표에 씁니다. 답변근거 칸이 채워진 유형, 곧 빈 비율이 0%인 유형이 규정으로 답이 정해지는 유형입니다. 수강료 환불, 주차 요금 감면, 대관 신청이 0%이고 시설 고장 신고, 사고·분쟁, 기타가 100%입니다. 표가 나오지 않으면 화면의 기대 결과를 보고 다음 화면으로 갑니다. (강사 확인: 표의 값은 lab2/기대결과.md이고 CSV를 직접 세어 같은 값을 확인했습니다. 강사가 codex로 요청 4를 한 번 보낸 결과(2026-11-24)도 같았습니다. ChatGPT 화면은 강의 전날 K-04에서 요청 4를 보내 확인합니다.)",
    "p2-ch02-s08": "이제 숫자를 시범 범위 판단표에 옮깁니다. lab2 폴더의 범위_판단표.md가 그 파일입니다. 이 파일을 오른쪽 클릭하고 연결 프로그램에서 메모장(macOS는 텍스트 편집기)으로 엽니다. 파일 맨 위 안내대로 판단 칸 세 개는 예 또는 아니오로 적습니다. 여섯 유형마다 건수와 평균 처리일수는 요청 1의 표에서 옮깁니다. 「규정으로 답이 정해지는가」는 앞 화면의 요청 4 결과를 보고, 답변근거 칸이 채워진 유형이면 예, 비어 있으면 아니오라고 적습니다. 「사람의 판단이 필요한가」는 여러분이 정해 예나 아니오로 적습니다. 칸은 세로 막대 사이에 적고 막대는 지우지 않으며, 마지막 「시범 범위에 넣는가」 칸은 다음 화면에서 적습니다. 막히면 lab2/완성본 폴더의 범위_판단표_예.md를 봅니다.",
    "p2-ch02-s08a": "이제 숫자를 보고 사람이 정할 차례입니다. 판단표의 마지막 칸 「시범 범위에 넣는가」에 고른 두 유형은 예, 나머지는 아니오를 적습니다. 표 아래 세 줄에는 고른 두 유형, 고른 이유 한 줄, 뺀 유형과 이유 한 줄을 적습니다. 다 적으면 같은 이름으로 저장합니다(Ctrl+S, macOS는 Command+S). 판단은 사람마다 달라도 되고, 고른 이유를 건수, 평균 처리일수, 답변근거 빈 비율 같은 표의 숫자로 적었는지가 중요합니다. 막히면 lab2/완성본 폴더의 범위_판단표_예.md를 봅니다. 다 적은 분은 손을 들어 주세요.",
    "p2-ch02-s09": "여러분의 판단표와 한서윤 주임의 판단을 견줘 봅니다. 한서윤 주임은 수강료 환불 74건과 주차 요금 감면 61건을 골랐습니다. 두 유형을 합치면 135건으로 3분기 민원 240건의 56.3%입니다. 둘 다 답변근거 칸에 체육시설 이용 규정 제7조와 공영주차장 운영 지침 제5조가 적혀 있어 규정의 계산 규칙으로 답이 정해집니다. 사고·분쟁은 평균 처리일수가 10.95일로 가장 길고 답변근거 칸이 비어 있으며, 배상 판단은 사람이 해야 하므로 범위에서 뺍니다. 대관 신청도 규정으로 답이 정해지지만 이번 시범에는 대관 규정을 넣지 않으므로 시범 뒤 확장 후보로 둡니다. 다르게 고른 분도 표의 숫자로 이유를 적었다면 괜찮습니다. (화면에서 옮긴 문구: 「질문 · 어느 유형부터 맡길까」 「건수가 많고 규정으로 답이 정해지는 유형」)",
    "p2-ch02-s09a": "그러면 고른 범위에서 프로젝트는 무엇을 읽고 어떤 규칙으로 답해야 할까요? 3장은 수강료 환불과 주차 요금 감면 기준으로 진행하고, 이 질문에 설계서 한 장으로 답합니다.",
  };
  const CH2 = '실습: 민원 데이터로 시범 범위 정하기';
  const C = THEME.C, M = THEME.mono;
  const px = v => v.toFixed(1) + 'px';
  const DIM = t => `<span style="color:var(--dim)">${t}</span>`;
  // 경로·파일 이름을 고정폭으로 쓰되 빗금과 밑줄 뒤에서만 줄을 바꾼다
  const MPATH = (...parts) => parts.map(t => `<span style="white-space:nowrap">${M(t)}</span>`).join('<wbr>');
  const NB = t => `<span style="white-space:nowrap">${t}</span>`;
  // 고리와 같은 주홍 번호 조각(글 안에 쓴다)
  const CHIP = n => `<span style="display:inline-block;width:50px;height:50px;line-height:54px;text-align:center;font-family:var(--num);font-weight:400;font-size:38px;` +
    `background:${C.red};color:#fff;box-shadow:0 0 0 3px ${C.white};margin-right:14px;vertical-align:-8px">${n}</span>`;

  // 민원 유형별 값(lab2/기대결과.md 요청 1·요청 4)
  const TYPES = [
    { name: '수강료 환불', n: 74, pct: '30.8%', avg: '3.76' },
    { name: '주차 요금 감면', n: 61, pct: '25.4%', avg: '2.89' },
    { name: '대관 신청', n: 39, pct: '16.3%', avg: '4.69' },
    { name: '시설 고장 신고', n: 33, pct: '13.8%', avg: '2.03' },
    { name: '사고·분쟁', n: 21, pct: '8.8%', avg: '10.95' },
    { name: '기타', n: 12, pct: '5.0%', avg: '3.00' },
  ];

  // 슬라이드 하나: build(el) 가 돌려준 부품을 차례로 그린다. 부품은 모두 render(lt, ctx) 를 가진다
  const lay = (dur, build) => ({ dur, steps: [],
    setup(el) { this.parts = build(el).filter(Boolean); },
    render(lt, ctx) { this.parts.forEach(p => p.render(lt, ctx)); } });
  const top = (el, title, step) => THEME.top(el, { chapter: 2, chapterTitle: CH2, title, step: step ? [step, 5] : undefined, fiction: true });
  // 부품 밖 요소의 등장: 그림자 없이 조금 크게 들었다가 놓인다
  const pop = (node, at, o = {}) => ({ render: lt => THEME.lift(node, lt, at, Object.assign({ shadow: false, dur: 0.4 }, o)) });
  const at0 = (node, x, y) => css(node, { left: px(x), top: px(y) });

  // 글에 HTML 을 쓸 수 있는 이름표(THEME.tag 와 같은 종이. 파일 이름을 고정폭으로 쓰거나 두 줄로 쓸 때)
  function tagH(parent, html, o = {}) {
    const tone = o.tone || 'lemon';
    const wrap = h('div', '', parent); css(wrap, { position: 'absolute', left: px(o.x ?? 0), top: px(o.y ?? 0), zIndex: 2 });
    const box = h('div', '', wrap); css(box, { position: 'relative' });
    const tx = h('span', '', box, html);
    css(tx, { position: 'relative', display: 'inline-block', padding: '10px 22px 11px', fontSize: (o.size ?? 34) + 'px', fontWeight: 700, lineHeight: o.lh ?? 1.15,
      whiteSpace: 'nowrap', color: tone === 'red' ? '#FFFFFF' : tone === 'green' ? C.cream : C.ink });
    const w = box.offsetWidth, hh = box.offsetHeight, seed = o.seed ?? 3.1;
    const rim = h('div', 'p2-rim', box), face = h('div', `p2-face p2-${tone} p2-grain`, box);
    box.insertBefore(face, box.firstChild); box.insertBefore(rim, face);
    rim.style.clipPath = THEME.jag(w, hh, 'left right', seed, 5, 0);
    face.style.clipPath = THEME.jag(w, hh, 'left right', seed + 0.5, 5, 3);
    return { el: wrap, w, h: hh, render: lt => THEME.lift(box, lt, o.at ?? 0, { rot: o.rot ?? -2, filter: true, k: 0.5, dur: 0.4 }) };
  }

  // ─────────────────────────────────────────────────────────────
  // s01 전환: p2-tr-place 를 뒤집지 않고 깔고 왼쪽 크림 띠에 꼬리표, 음절 조각 제목, entry 질문
  DECK.slide({ id: 'p2-ch02-s01', notes: NOTES['p2-ch02-s01'], ...lay(2.6, el => [
    THEME.videoTitle(el, {
      kind: 'chapter', scene: 'place', flip: false, kicker: '파트 2 · 2장',
      src: '../assets/video/p2/p2-tr-place.mp4', poster: '../assets/video/p2/p2-tr-place.jpg',
      title: '실습: 민원 데이터로\n시범 범위 정하기', sub: '민원 유형 가운데 어느 것부터\n프로젝트에 맡길 것인가',
    }),
  ]) });

  // ─────────────────────────────────────────────────────────────
  // s02 인물과 대사: 한서윤 주임(1.9배)과 대사 종이, 종이 위 주홍 이름표. 대사 종이 아래에 민원 목록 사진 조각과 240건 쪽지
  DECK.slide({ id: 'p2-ch02-s02', notes: NOTES['p2-ch02-s02'], ...lay(2.2, el => {
    const bg = THEME.bg(el, 'base');
    const hd = THEME.header(el, { chapter: 2, title: CH2, fiction: true });
    const sp = THEME.speech(el, { who: 'han', scale: 1.9, x: 130, org: true, bubble: { x: 740, w: 1040 }, at: 0.2,
      text: '많이 들어오는 민원부터\n세어 보겠습니다.', sub: '2026년 3분기 민원 접수 목록(가상)<br>어느 유형부터 맡길지 건수로 정합니다' });
    const cond = THEME.tag(sp.el, '팀장의 조건 1 · 범위', { x: 48, y: -30, tone: 'red', at: 0.6, rot: -2 });
    const by = parseFloat(sp.el.style.top) + sp.el.offsetHeight;          // 대사 종이 아래 끝
    const cut = THEME.cutout(el, '../assets/img/p2/p2-ch02-s02-list_cut.png', { x: 770, y: by - 14, w: 360, h: 994 - by, rot: 2, at: 1.0 });
    const tp = THEME.tape(el, { x: 880, y: by - 26, w: 140, rot: -7, at: 1.1 });
    const nt = THEME.note(el, { x: 1150, y: 0, w: 650, rot: -1, at: 1.3, padY: 24,
      html: `<div style="font-family:var(--mono);font-size:34px;line-height:1.3">민원접수목록_2026_3분기.csv</div>` +
        `<div style="margin:6px 0 4px;line-height:1"><span class="c2-240" style="display:inline-block;font-family:var(--num);font-size:120px;line-height:1">240<span style="font-family:var(--body);font-weight:700;font-size:56px;margin-left:8px">건</span></span></div>` +
        `<div style="font-size:36px;color:var(--dim)">7월 1일~9월 30일</div>` });
    nt.el.style.top = px(980 - nt.h);
    const big = pop(nt.el.querySelector('.c2-240'), 1.4, { from: 1.1 });
    return [bg, hd, sp, cond, cut, tp, nt, big];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s03 화면 크게(확대): 빈 새 대화의 입력창 왼쪽 아래를 1.6배로 그린다. 「+」 단추(고리 1)와 열린 메뉴의 파일 추가 항목(고리 2).
  // 쪽지 ①은 확대 화면의 빈 자리(오른쪽 위)에 붙이고, ②와 초록 기대 결과는 오른쪽 열(x 1400~1800)에 쌓는다
  DECK.slide({ id: 'p2-ch02-s03', notes: NOTES['p2-ch02-s03'], ...lay(2.6, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '새 대화에 민원 목록 CSV를 첨부합니다', 1);
    const shot = THEME.shot(el, null, { x: 120, y: 272, w: 1240, h: 680, url: 'chatgpt.com', zoom: 1.6, focus: [0, 0], at: 0.3,
      draw(main) {
        // 보통 크기 기준 좌표(보이는 자리 약 775×391)
        const name = h('div', '', main, 'ChatGPT');
        css(name, { position: 'absolute', left: '22px', top: '14px', fontSize: '26px', fontWeight: 700, lineHeight: 1.2, color: C.ink });
        const menu = h('div', '', main);
        css(menu, { position: 'absolute', left: '22px', top: '66px', width: '340px', boxSizing: 'border-box', padding: '10px', background: '#FFFFFF',
          border: '2px solid rgba(30,22,16,.14)', borderRadius: '16px', boxShadow: '0 6px 16px rgba(30,22,16,.14)' });
        const row = (dark, w) => {
          const r = h('div', '', menu);
          css(r, { display: 'flex', alignItems: 'center', gap: '12px', height: '44px', padding: '0 12px', borderRadius: '10px', background: dark ? '#F1EADD' : 'transparent' });
          css(h('div', '', r), { width: '22px', height: '22px', borderRadius: '6px', boxSizing: 'border-box', border: `3px solid ${dark ? 'rgba(30,22,16,.8)' : 'rgba(30,22,16,.22)'}` });
          css(h('div', '', r), { width: px(w), height: dark ? '16px' : '11px', borderRadius: '6px', background: dark ? 'rgba(30,22,16,.78)' : 'rgba(30,22,16,.16)' });
          return r;
        };
        const add = row(true, 210); row(false, 170); row(false, 190); row(false, 140);
        const bar = h('div', '', main);
        css(bar, { position: 'absolute', left: '22px', top: '296px', width: '730px', height: '76px', boxSizing: 'border-box', borderRadius: '38px',
          border: '2px solid rgba(30,22,16,.18)', background: '#F7F2E9' });
        const plus = h('div', '', bar, '+');
        css(plus, { position: 'absolute', left: '12px', top: '12px', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '40px', fontWeight: 500, lineHeight: 1, color: C.ink, background: '#FFFFFF', border: '2px solid rgba(30,22,16,.2)', boxSizing: 'border-box' });
        css(h('div', '', bar), { position: 'absolute', left: '82px', top: '32px', width: '240px', height: '11px', borderRadius: '6px', background: 'rgba(30,22,16,.14)' });
        return [{ node: plus, n: 1, at: 1.1, num: 'right' }, { node: add, n: 2, at: 1.4, num: 'right' }];
      } });
    const c1 = THEME.callout(el, { x: 820, y: 384, w: 520, n: 1, tone: 'cream', size: 40, rot: -1, at: 1.0,
      text: `입력창의 + → 파일을 추가하는 메뉴<div style="font-size:34px;font-weight:500;color:var(--dim);margin-top:8px">영어 화면: ${NB('Add photos &amp; files')}</div>` });
    const band = THEME.strip(el, '실습 규칙 1 · 실습 묶음의 가상 자료만 입력합니다', { right: 1800, y: 222, size: 40, weight: 700, tone: 'lemon', rot: 0.8, at: 2.0, padY: 12 });
    const c2 = THEME.callout(el, { x: 1400, y: 336, w: 400, n: 2, tone: 'cream', size: 36, rot: 1, at: 1.5,
      text: `${DIM('고를 파일')}<div style="font-size:34px;font-weight:500;line-height:1.3;margin:4px 0 8px">${MPATH('자료/', '민원접수목록_', '2026_3분기.csv')}</div>가상 자료 · 개인정보 칸 없음` });
    const ex = THEME.card(el, { x: 1400, y: 0, w: 400, h: 'fit', layout: true, tone: 'green', label: '기대 결과', body: '입력창 위에 파일 이름이 붙습니다', bodySize: 40, rot: -0.8, at: 1.8 });
    ex.el.style.top = px(980 - ex.h);
    return [bg, tp, shot, c1, c2, ex, band];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s04 요청문 크게: 요청 1 세 문장(46px)을 폭 1680 종이에. 종이 아래에 body 두 줄 띠와 초록 기대 결과 띠
  const ASK1 = '첨부한 CSV는 새별시설공단의 2026년 3분기 민원 접수 목록(가상 자료)이다.\n파이썬 코드를 실행해서 민원유형별 건수, 전체 대비 비율(%), 평균 처리일수(소수 둘째 자리)를 표로 보여 줘.\n건수가 많은 순서로 정렬하고, 마지막 줄에 합계를 넣어 줘.';
  DECK.slide({ id: 'p2-ch02-s04', notes: NOTES['p2-ch02-s04'], ...lay(1.8, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '「요청 1」을 붙여 넣고 보냅니다', 2);
    const ps = THEME.promptSheet(el, { x: 120, y: 290, w: 1680, size: 46, at: 0.3, text: ASK1,
      label: '붙여 넣을 글 · lab2/단계.md 「요청 1」', whereHtml: `${M('```text')} 줄과 ${M('```')} 줄 사이의 글만 복사합니다` });
    const s1 = THEME.strip(el, `${M('lab2/단계.md')}의 「요청 1」 세 줄을 복사<br>CSV를 첨부한 입력창에 붙여 넣기`, { x: 120, y: 0, size: 36, lh: 1.3, rot: -0.6, at: 0.9, padY: 12 });
    const s2 = THEME.strip(el, `<span style="font-weight:500">기대 결과 ·</span> 유형 여섯 줄과 합계 240 줄이 있는 표`, { x: 0, y: 0, size: 40, weight: 700, tone: 'green', rot: 0.6, at: 1.1, padY: 18 });
    const sy = Math.max(ps.y + ps.h + 26, 980 - s1.h);
    at0(s1.el, 120, sy);
    at0(s2.el, Math.max(120 + s1.w + 40, 1800 - s2.w), sy + Math.round((s1.h - s2.h) / 2));
    return [bg, tp, ps, s1, s2];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s04a 표 한 장: 요청 1을 보낸 뒤 나오는 표 여덟 줄(40px). 합계 줄은 레몬 바탕과 주홍 테이프, 표 종이 안 아래쪽 줄에 출처
  DECK.slide({ id: 'p2-ch02-s04a', notes: NOTES['p2-ch02-s04a'], ...lay(2.0, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '유형 여섯 줄과 합계 240 줄이 있는 표', 2);
    const rows = TYPES.map(t => [t.name, String(t.n), t.pct, t.avg]).concat([['합계', '240', '100%', '4.04']]);
    const tb = THEME.table(el, { x: 120, y: 300, w: 1680, h: 680, size: 40, pad: [4, 30], mark: 6, at: 0.3, widths: [2.1, 1, 1, 1.5],
      label: 'ChatGPT · 민원접수목록_2026_3분기.csv', cols: ['민원유형', '건수', '비율', '평균 처리일수'], rows });
    tb.cells.forEach((c, i) => { if (i % 4) css(c, { justifyContent: 'flex-end' }); });   // 숫자 칸은 오른쪽 맞춤
    const col = tb.grid.parentElement;
    const src = h('div', '', col, '표의 값: lab2/기대결과.md');
    css(src, { position: 'relative', fontSize: '34px', lineHeight: 1.3, color: C.dim, marginTop: '16px', wordBreak: 'keep-all' });
    css(tb.grid, { height: px(tb.grid.offsetHeight - src.offsetHeight - 16) });
    const parts = [bg, tp, tb];
    for (let r = 0; r <= rows.length; r++) {                   // 머리 줄부터 한 줄씩
      const cs = tb.cells.slice(r * 4, r * 4 + 4);
      parts.push({ render: lt => cs.forEach(c => THEME.lift(c, lt, 0.5 + r * 0.08, { shadow: false, dur: 0.3, from: 1.04 })) });
    }
    const tAt = 0.5 + rows.length * 0.08 + 0.2;                 // 합계 줄이 놓이고 0.2초 뒤 테이프
    parts.push({ render: lt => {
      if (!tb.tape) return;
      const p = prog(lt, tAt, 0.16, ease.outCubic);
      set(tb.tape, 'opacity', lt >= tAt ? '1' : '0');
      set(tb.tape, 'transform', `rotate(-6deg) scale(${lerp(1.12, 1, p).toFixed(4)})`);
    } });
    parts.push(pop(src, tAt + 0.15, { from: 1.02 }));
    return parts;
  }) });

  // ─────────────────────────────────────────────────────────────
  // s05 기대 결과 크게: 초록 결과 종이 안에 크림 종이 막대 여섯 개(길이는 건수 비례, 왼쪽 끝에서 늘어난다). 왼쪽 열 쪽지 세 장
  DECK.slide({ id: 'p2-ch02-s05', notes: NOTES['p2-ch02-s05'], ...lay(2.4, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '「요청 2」로 막대 차트를 받습니다', 3);
    // 결과 종이
    const RW = 1100, RH = 680, PX = 60;
    const res = THEME.paper(el, { x: 700, y: 300, w: RW, h: RH, tone: 'green', rot: 0.8, at: 0.5, seed: 4.2 });
    const rtag = THEME.tag(res.el, '기대 결과 · 막대 6개 · 막대 위 숫자 = 표의 건수', { x: PX - 16, y: -28, at: 0.65 });
    const foot = h('div', '', res.el, '실제 차트의 모양과 색은 다를 수 있습니다');
    css(foot, { position: 'absolute', left: px(PX), bottom: '40px', fontSize: '34px', lineHeight: 1.3, color: C.cream, opacity: 0.86 });
    const TOP = 72, PITCH = (RH - TOP - 40 - 44 - 34) / 6, BX = 330, BH = 54, LMAX = 560;
    const bars = TYPES.map((t, i) => {
      const y = TOP + i * PITCH, a = 0.75 + i * 0.1, L = Math.round(t.n / 74 * LMAX);
      const nm = h('div', '', res.el, t.name);
      css(nm, { position: 'absolute', left: px(PX), top: px(y + PITCH / 2 - 25), fontSize: '36px', fontWeight: 700, lineHeight: 1.4, color: C.cream, whiteSpace: 'nowrap' });
      const wrap = h('div', '', res.el); css(wrap, { position: 'absolute', left: px(BX), top: px(y + (PITCH - BH) / 2), width: px(L), height: px(BH) });
      const bp = THEME.paper(wrap, { x: 0, y: 0, w: L, h: BH, tone: 'cream', torn: 'right', at: -9, k: 0.5, seed: 2.2 + i });
      const num = h('div', '', res.el, String(t.n));
      css(num, { position: 'absolute', left: px(BX + L + 20), top: px(y + PITCH / 2 - 40), fontFamily: 'var(--num)', fontSize: '72px', lineHeight: 1.1, color: C.cream });
      return { render(lt) {
        THEME.lift(nm, lt, a, { shadow: false, dur: 0.3, from: 1.04 });
        const p = prog(lt, a, 0.3, ease.outCubic);
        set(wrap, 'opacity', lt >= a ? '1' : '0');
        set(wrap, 'clipPath', p >= 1 ? 'none' : `inset(-30px ${(100 - 100 * p).toFixed(2)}% -30px -30px)`);
        bp.render(lt);
        THEME.lift(num, lt, a + 0.3, { shadow: false, dur: 0.35, from: 1.1 });
      } };
    });
    // 왼쪽 열 쪽지 세 장(x 120, 폭 520)
    const c1 = THEME.callout(el, { x: 120, y: 300, w: 520, tone: 'cream', size: 40, rot: 0, at: 0.3,
      text: `<div style="font-size:34px;color:var(--dim);line-height:1.3;margin-bottom:6px">보낼 글 · ${M('lab2/단계.md')} ${NB('「요청 2」')}</div>민원유형별 건수를 막대 차트로 그려 줘. 막대 위에 건수를 적어 줘.` });
    const n3 = THEME.note(el, { x: 120, y: 0, w: 520, size: 34, rot: 0.8, at: 1.7, html: '<b>막히면:</b> 차트가 없어도 다음 단계로 갑니다' });
    n3.el.style.top = px(980 - n3.h);
    let n2 = null;
    for (const sz of [36, 34]) {                                // 세 장이 y 300~980 에 들지 않으면 ②를 34px 로
      if (n2) n2.el.remove();
      n2 = THEME.note(el, { x: 130, y: 300 + c1.h + 26, w: 510, size: sz, rot: -0.8, at: 1.5, html: '같은 대화에 이어서 보냅니다<br>막대 위 숫자가 표의 건수와 같은지 봅니다' });
      if (n2.y + n2.h + 18 <= 980 - n3.h) break;
    }
    el.appendChild(n3.el);
    return [bg, tp, c1, res, rtag, ...bars, pop(foot, 1.8), n2, n3];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s06 화면 크게: 요청 3의 답에서 코드 부분을 크게 그린다(고정폭 36px, 고리 1 = with open 줄, 고리 2 = groups 줄).
  // 보낼 글 쪽지 ①은 화면 위쪽(사용자 말풍선 자리)에 붙이고, 찾을 줄 ②와 초록 기대 결과 ③은 오른쪽 열에 쌓는다
  DECK.slide({ id: 'p2-ch02-s06', notes: NOTES['p2-ch02-s06'], ...lay(2.4, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '「요청 3」으로 건수를 센 코드를 봅니다', 4);
    const SW = 1120, SH = 680, CODE = 36, LH = 1.6;
    const D = {};
    const shot = THEME.shot(el, null, { x: 120, y: 272, w: SW, h: SH, url: 'chatgpt.com', at: 0.3,
      draw(main) {
        const app = h('div', '', main, 'ChatGPT');
        css(app, { position: 'absolute', left: '20px', top: '18px', fontSize: '34px', fontWeight: 700, lineHeight: 1.2, color: C.ink });
        const box = h('div', '', main);
        css(box, { position: 'absolute', left: '16px', right: '16px', top: '232px', boxSizing: 'border-box', padding: '24px 24px', borderRadius: '14px', background: '#2A2420' });
        const code = (t, mt) => { const d = h('div', '', box); css(d, { fontFamily: 'var(--mono)', fontSize: px(CODE), lineHeight: LH, whiteSpace: 'pre', color: '#F4EDE1', marginTop: px(mt || 0) });
          const sp = h('span', '', d); sp.textContent = t; return { d, sp }; };
        const ghost = (w) => { const r = h('div', '', box); css(r, { height: '34px', display: 'flex', alignItems: 'center' });
          css(h('div', '', r), { width: px(w), height: '10px', borderRadius: '5px', background: 'rgba(244,237,225,.2)' }); return r; };
        const l1 = code('with open("민원접수목록_2026_3분기.csv", …) as f:');
        const l2 = code('    rows = list(csv.DictReader(f))');
        ghost(520); ghost(380);
        const l3 = code('groups[row["민원유형"]].append(…)');
        D.lines = [l1, l2, l3];
        const foot = h('div', '', main, '참가자 화면의 코드는 다를 수 있습니다');
        css(foot, { position: 'absolute', left: '18px', bottom: '22px', fontSize: '34px', lineHeight: 1.3, color: C.dim });
        D.foot = foot;
        return [{ node: l1.sp, n: 1, at: 1.1, num: 'right' }, { node: l3.sp, n: 2, at: 1.4, num: 'right' }];
      } });
    const lines = D.lines.map((l, i) => pop(l.d, 0.6 + i * 0.12, { from: 1.03 }));
    const src = THEME.tag(el, '코드 일부', { x: 140, y: 246, size: 34, rot: -1.2, at: 0.45 });
    const band = THEME.strip(el, '파일을 여는 줄과 유형별로 세는 줄을 찾습니다', { right: 1800, y: 222, size: 36, rot: 0.6, at: 0.2, padY: 12 });
    // ① 보낼 글: 화면 위쪽 오른쪽(사용자 말풍선 자리)
    const N1W = 900;
    const n1 = THEME.note(el, { x: 0, y: 0, w: N1W, size: 40, rot: 0, at: 0.8, label: '보낼 글 · lab2/단계.md 「요청 3」',
      html: `<div style="font-weight:700">건수와 평균 처리일수를 계산한 코드를 보여 줘.</div><div style="font-size:34px;color:var(--dim)">같은 대화에 「요청 3」을 보냅니다</div>` });
    at0(n1.el, 120 + 14 + SW - 16 - N1W, 272 + 14 + 54 + 26);
    // ② 찾을 줄, ③ 기대 결과: 오른쪽 열(x 1362~1800)
    const RX = 120 + SW + 28 + 34, RW = 1800 - RX;
    const c2 = THEME.callout(el, { x: RX, y: 330, w: RW, tone: 'cream', size: 36, rot: 1, at: 1.2,
      text: `${DIM('찾을 줄')}<div style="margin-top:6px">${CHIP(1)}CSV 파일을 여는 줄</div><div style="margin-top:8px">${CHIP(2)}「민원유형」별로 묶어 세는 줄</div>` +
        `<div style="font-size:34px;font-weight:500;line-height:1.35;margin-top:12px">묶어 세는 줄에 자주 나오는 ${NB('말 ·')} ${M('groupby')}, ${M('value_counts')}, ${M('Counter')}</div>` });
    const ex = THEME.card(el, { x: RX, y: 0, w: RW, h: 'fit', layout: true, pad: 30, tone: 'green', label: '기대 결과', body: `두 줄이 보입니다 · ${NB('코드로 센 숫자입니다')}`, bodySize: 40, rot: -0.8, at: 1.7 });
    ex.el.style.top = px(980 - ex.h);
    return [bg, tp, shot, ...lines, src, band, n1, c2, ex, pop(D.foot, 1.9)];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s07 카드 격자(3×2): 유형 카드 여섯 장에 건수(Anton 100px)와 평균 처리일수. 격자 아래에 합계 띠와 막히면 보낼 글 띠
  DECK.slide({ id: 'p2-ch02-s07', notes: NOTES['p2-ch02-s07'], ...lay(2.0, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '표의 건수가 이 숫자와 같습니까?', 4);
    const tRight = 292 + tp.title.el.offsetWidth;
    const chk = THEME.tag(el, '확인', { x: tRight + 26, y: 122, size: 34, rot: -3, at: 0.25 });
    const body = THEME.strip(el, '여섯 유형과 합계 240이 같으면 맞습니다', { x: 560, y: 222, size: 36, weight: 700, rot: -0.5, at: 0.2, padY: 10 });
    // 아래 띠 두 장
    const sum = THEME.strip(el, `합계 · <span style="font-family:var(--num);font-weight:400;font-size:60px;line-height:1;vertical-align:-4px">240</span>건 · 평균 4.04일`,
      { x: 120, y: 0, size: 40, weight: 700, lh: 1.25, rot: -0.6, at: 1.2, padY: 10 });
    const hx = 120 + sum.w + 30;
    const help = THEME.strip(el, `${DIM('막히면 보낼 글')} · 합계가 240인지 확인하고, 다르면 원인을 보여 줘`, { x: hx, y: 0, w: 1800 - hx, size: 36, lh: 1.3, rot: 0, at: 1.35, padY: 10 });
    const BH = Math.max(sum.h, help.h), BY = 980 - BH;
    at0(sum.el, 120, BY + (BH - sum.h) / 2); at0(help.el, hx, BY + (BH - help.h) / 2);
    const GY = 318, GH = BY - 22 - GY;
    const gd = THEME.grid(el, { cols: 3, x: 120, y: GY, w: 1680, h: GH, gap: 40, at: 0.3, each: 0.12, items: TYPES.map(t => ({
      title: t.name, titleSize: 40, pad: 30,
      body: `<div style="display:flex;align-items:baseline;justify-content:space-between;gap:20px;color:var(--ink)">` +
        `<span class="c2-n" style="display:inline-block;font-family:var(--num);font-size:100px;line-height:1">${t.n}<span style="font-family:var(--body);font-weight:700;font-size:44px;margin-left:6px">건</span></span>` +
        `<span style="font-size:40px;line-height:1.2">평균 ${t.avg}일</span></div>` })) });
    const nums = gd.cards.map((c, i) => pop(c.el.querySelector('.c2-n'), 0.3 + i * 0.12 + 0.1, { from: 1.1 }));
    return [bg, tp, chk, body, gd, ...nums, sum, help];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s07a 좌우 대비: 보낼 글 쪽지 아래에 0%(크림)와 100%(초록) 두 종이. 숫자 옆에 유형 세 줄, 이음매 위에 초록 기대 결과 이름표
  DECK.slide({ id: 'p2-ch02-s07a', notes: NOTES['p2-ch02-s07a'], ...lay(1.9, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '「요청 4」로 답변근거 칸을 봅니다', 5);
    const tRight = 292 + tp.title.el.offsetWidth;
    const body = THEME.strip(el, '같은 대화에<br>「요청 4」를 보냅니다', { x: 0, y: 100, size: 34, lh: 1.3, rot: 0.6, at: 0.2, padY: 10 });
    at0(body.el, Math.max(tRight + 40, 1800 - body.w), 100);
    const nt = THEME.note(el, { x: 120, y: 288, w: 1680, label: '보낼 글 · lab2/단계.md 「요청 4」', size: 40, at: 0.3,
      html: '민원유형마다 「답변근거」 칸이 비어 있는 비율을 표로 보여 줘.' });
    const VY = nt.y + nt.h + 54, VH = 980 - VY;
    const kick = '<div style="font-size:34px;font-weight:700;line-height:1.3;color:var(--dim);margin-bottom:6px">답변근거 빈 비율</div>';
    const row = (num, list, ink) => kick.replace('var(--dim)', ink) +
      `<div style="display:flex;align-items:center;gap:44px"><span class="c2-v" style="display:inline-block;font-family:var(--num);font-weight:400;font-size:180px;line-height:1">${num}</span>` +
      `<span style="font-size:44px;font-weight:500;line-height:1.42;white-space:nowrap">${list}</span></div>`;
    const vs = THEME.versus(el, { x: 120, y: VY, w: 800, h: VH, gap: 80, at: 0.6, center: true,
      left: { title: row('0%', '수강료 환불<br>주차 요금 감면<br>대관 신청', 'var(--dim)'), body: '답변근거가 채워진 유형 = 규정으로 답이 정해지는 유형', bodySize: 44 },
      right: { title: row('100%', '시설 고장 신고<br>사고·분쟁<br>기타', 'rgba(251,245,233,.85)') } });
    css(vs.left.el.querySelector('.p2-in > div > div:last-child'), { fontWeight: 700 });
    const vEls = [...el.querySelectorAll('.c2-v')], IW = 800 - 104;   // 숫자와 유형 세 줄이 종이 안에 들게 두 장의 숫자를 함께 줄인다
    for (let ns = 180; ns > 140 && vEls.some(v => v.parentElement.scrollWidth > IW); ns -= 5) vEls.forEach(v => css(v, { fontSize: px(ns - 5) }));
    const srcR = h('div', '', vs.right.inner, '표의 값: lab2/기대결과.md');
    css(srcR, { position: 'absolute', left: '52px', right: '40px', bottom: '36px', fontSize: '34px', lineHeight: 1.3, color: C.cream, opacity: 0.86 });
    const vals = vEls.map((v, i) => pop(v, (i ? 1.0 : 0.6) + 0.15, { from: 1.12 }));
    const ex = THEME.tag(el, '기대 결과 · 0%인 유형 셋 · 100%인 유형 셋', { x: 0, y: VY - 30, tone: 'green', size: 34, rot: -1.2, at: 1.2 });
    ex.el.style.left = px(960 - ex.w / 2);
    return [bg, tp, body, nt, vs, ...vals, pop(srcR, 1.35), ex];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s08 표 한 장: 범위_판단표 여섯 줄(38px). 첫 줄 건수 칸 「74」만 채운 예(레몬 바탕, 주홍 테이프). 위 왼쪽에 body 띠, 오른쪽에 적는 법 띠
  DECK.slide({ id: 'p2-ch02-s08', notes: NOTES['p2-ch02-s08'], ...lay(2.1, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '시범 범위 판단표의 여섯 줄을 채웁니다', 5);
    const s1 = THEME.strip(el, '숫자와 예·아니오를 네 칸에 적습니다', { x: 120, y: 280, size: 40, weight: 700, rot: -0.6, at: 0.25, padY: 10 });
    const s2 = THEME.strip(el, `적는 법 · 세로 막대 | 사이에 적습니다<br>${M('| 수강료 환불 | | | | | |')} →<br>${M('| 수강료 환불 | 74 | | | | |')}`,
      { right: 1800, y: 218, size: 34, lh: 1.3, rot: 0.6, at: 0.9, padY: 10 });
    const TY = 400, TH = 580, SHIFT = 52;                       // 이름표가 두 줄이라 표 글을 52px 내린다
    const tb = THEME.table(el, { x: 120, y: TY, w: 1680, h: TH, size: 38, headSize: 34, widths: 'auto', pad: [4, 22], at: 0.3,
      cols: ['민원유형', '건수', '평균\n처리일수', '규정으로 답이\n정해지는가', '사람의 판단이\n필요한가', '시범 범위에\n넣는가'],
      rows: TYPES.map((t, i) => [t.name, i === 0 ? '74' : '', '', '', '', '']) });
    const col = tb.grid.parentElement;
    tb.cells.forEach(c => css(c, { lineHeight: 1.2 }));
    css(col, { top: px(44 + SHIFT) }); css(tb.grid, { height: px(TH - 88 - SHIFT) });
    tb.cells.slice(0, 5).forEach(c => css(c, { color: C.ink }));   // 6열 머리 글자만 --dim(다음 화면에서 채운다)
    const lab = tagH(tb.el, `${M('lab2/범위_판단표.md')}를 메모장으로 엽니다<br>macOS는 텍스트 편집기`, { x: 32, y: -30, lh: 1.25, at: 0.45, rot: -1.2 });
    const c74 = tb.cells[6 + 1];
    css(c74, { background: 'rgba(242,207,74,.62)', fontWeight: 700 });
    const tape = THEME.tape(tb.el, { x: 48 + c74.offsetLeft + c74.offsetWidth - 62, y: 44 + SHIFT + c74.offsetTop - 16, w: 84, h: 40, rot: 12, tone: 'red', at: 1.2 });
    const ex = THEME.tag(el, '기대 결과 · 여섯 줄마다 네 칸이 채워집니다', { x: 0, y: TY - 30, tone: 'green', size: 34, rot: 1.2, at: 1.4 });
    ex.el.style.left = px(1790 - ex.w);
    const parts = [bg, tp, s1, tb, lab];
    for (let r = 0; r <= TYPES.length; r++) {                   // 머리 줄과 유형 줄이 위부터
      const cs = tb.cells.slice(r * 6, r * 6 + 6);
      parts.push({ render: lt => cs.forEach(c => THEME.lift(c, lt, 0.5 + r * 0.08, { shadow: false, dur: 0.3, from: 1.04 })) });
    }
    return parts.concat([s2, tape, ex]);
  }) });

  // ─────────────────────────────────────────────────────────────
  // s08a 채점 기준: 사람이 정하는 칸 세 줄(44px, 주홍 번호 조각). 오른쪽에 마지막 칸만 남긴 대조 표, 아래에 저장 띠와 기대 결과 띠
  DECK.slide({ id: 'p2-ch02-s08a', notes: NOTES['p2-ch02-s08a'], ...lay(2.1, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '두 유형을 고르고 이유를 적습니다', 5);
    const who = THEME.tag(el, '사람이 정하는 칸', { x: 286, y: 262, tone: 'red', size: 34, rot: -2, at: 0.2 });
    const b1 = THEME.strip(el, '이 판단은 사람이 합니다', { x: 286 + who.w + 18, y: 256, size: 40, weight: 700, rot: 0.6, at: 0.25, padY: 8 });
    const ck = THEME.checklist(el, { x: 120, y: 350, w: 1000, size: 44, gap: 14, at: 0.3, numTone: 'red',
      items: ['고른 두 유형: ____, ____', '고른 이유 한 줄: ____', '뺀 유형과 이유 한 줄: ____'] });
    const save = THEME.strip(el, `${DIM('저장')} · 같은 이름으로 저장 · Ctrl+S(macOS는 Command+S)`, { x: 120, y: 0, size: 40, rot: -0.5, at: 1.3, padX: 18, padY: 10 });
    const ok = THEME.strip(el, `<span style="font-weight:500">기대 결과 ·</span> 고른 이유를 표의 숫자로 적습니다`, { x: 120, y: 0, size: 40, weight: 700, tone: 'green', rot: 0.5, at: 1.45, padY: 10 });
    at0(ok.el, 130, 980 - ok.h);
    at0(save.el, 120, 980 - ok.h - 12 - save.h);
    // 대조 표(크림 종이): 민원유형 · ⋯ · 시범 범위에 넣는가
    const CX = Math.max(1160, Math.ceil(120 + save.w + 16));
    const card = THEME.table(el, { x: CX, y: 300, w: 1800 - CX, h: 680, size: 38, headSize: 34, pad: [4, 10], widths: 'auto', at: 0.9, rot: 1,
      cols: ['민원유형', '⋯', '시범\n범위에\n넣는가'], rows: TYPES.map(t => [t.name, '', '']) });
    card.cells.forEach(c => css(c, { lineHeight: 1.2 }));
    card.cells.slice(0, 2).forEach(c => css(c, { color: C.ink }));
    const hc = card.cells[2];
    const ring = h('div', 'p2-mark', card.el);
    css(ring, { left: px(48 + hc.offsetLeft - 8), top: px(44 + hc.offsetTop - 8), width: px(hc.offsetWidth + 16), height: px(hc.offsetHeight + 16) });
    return [bg, tp, who, b1, ck, card, { render: lt => THEME.lift(ring, lt, 1.1, { rot: 1.5, k: 0.5, dur: 0.4 }) }, save, ok];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s09 큰 숫자: 「135건」 숫자 종이(주홍 이름표 「시범 범위」)와 오른쪽 설명 종이의 유형 막대 여섯 개. 고른 두 막대에 주홍 테이프.
  // 사고·분쟁과 대관 신청의 작은 쪽지는 숫자 종이 오른쪽 빈 자리에서 그 줄 높이에 붙인다
  DECK.slide({ id: 'p2-ch02-s09', notes: NOTES['p2-ch02-s09'], ...lay(2.4, el => {
    const bg = THEME.bg(el, 'base');
    const tp = top(el, '시범 범위: 수강료 환불과 주차 요금 감면');
    const sy = tp.bottom + 16;
    const b1 = THEME.strip(el, '두 유형 135건, 240건 가운데 56.3%', { x: 120, y: sy, size: 40, weight: 700, rot: -0.6, at: 0.2, padY: 10 });
    const b2 = THEME.strip(el, '사고·분쟁은 사람이 판단해야 해서 뺍니다', { x: 120 + b1.w + 26, y: sy, size: 40, weight: 700, rot: 0.5, at: 0.3, padY: 10 });
    const NY = sy + b1.h + 40, NH = 980 - NY, NW = 960;
    const bn = THEME.bigNum(el, { x: 120, y: NY, w: NW, h: NH, value: '135', unit: '건', caption: '240건 가운데 56.3%', at: 0.3 });
    // 숫자를 종이 왼쪽으로 붙여 오른쪽에 쪽지 자리를 만든다
    const wrapN = bn.el.querySelector('.p2-in').firstChild;
    css(wrapN, { alignItems: 'flex-start', paddingLeft: '40px' });
    css(wrapN.lastChild, { textAlign: 'left', padding: '0 0 0 6px' });
    const red = THEME.tag(bn.el, '시범 범위', { x: 34, y: -28, tone: 'red', size: 34, rot: -2, at: 0.45 });
    // 설명 종이와 막대
    const SX = 1130, SWD = 670, PX = 34, TOP = 34, FOOT = 104;
    const side = THEME.paper(el, { x: SX, y: NY, w: SWD, h: NH, tone: 'cream', rot: 0.8, at: 0.8, seed: 9.9 });
    const PITCH = (NH - TOP - FOOT) / 6, NAMEW = 248, BX = PX + NAMEW + 8, LMAX = 176, BH = 40;
    const foot = h('div', '', side.el, '근거: 체육시설 이용 규정 제7조 · 공영주차장 운영 지침 제5조');
    css(foot, { position: 'absolute', left: px(PX), right: px(PX), bottom: '26px', fontSize: '34px', lineHeight: 1.3, color: C.dim, wordBreak: 'keep-all' });
    const rowsY = [];
    const bars = TYPES.map((t, i) => {
      const y = TOP + i * PITCH, cy = y + PITCH / 2, a = 0.95 + i * 0.08, L = Math.round(t.n / 74 * LMAX);
      rowsY.push(NY + cy);
      const nm = h('div', '', side.el, t.name);
      css(nm, { position: 'absolute', left: px(PX), top: px(cy - 24), fontSize: '34px', fontWeight: 700, lineHeight: 1.4, whiteSpace: 'nowrap', color: C.ink });
      const bp = THEME.paper(side.el, { x: BX, y: cy - BH / 2, w: L, h: BH, tone: 'kraft', torn: 'right', rot: (i % 2 ? 0.6 : -0.6), at: a, k: 0.4, seed: 5.5 + i });
      const nn = h('div', '', side.el, `<span style="font-family:var(--num);font-size:48px">${t.n}</span><span style="font-size:34px;margin-left:12px;color:var(--dim)">${t.pct}</span>`);
      css(nn, { position: 'absolute', left: px(BX + L + 14), top: px(cy - 31), lineHeight: 1.3, whiteSpace: 'nowrap', color: C.ink });
      const tape = i < 2 ? THEME.tape(side.el, { x: BX - 30, y: cy - 26, w: 76, h: 40, rot: -10, tone: 'red', at: 1.4 + i * 0.08 }) : null;
      return { render(lt) { THEME.lift(nm, lt, a, { shadow: false, dur: 0.3, from: 1.04 }); bp.render(lt); THEME.lift(nn, lt, a + 0.1, { shadow: false, dur: 0.3, from: 1.08 }); if (tape) tape.render(lt); } };
    });
    // 작은 쪽지 두 장: 숫자 종이 오른쪽 빈 자리, 그 줄 높이에 붙이고 설명 종이 가장자리와 테이프로 잇는다
    // 쪽지 자리: 숫자 오른쪽 끝에서 설명 종이 이름 칸 앞(x 1150)까지. 폭이 480 보다 좁으면 숫자를 10px 씩 줄인다(240px 까지)
    const numEl = wrapN.firstChild, NXof = () => 120 + 40 + numEl.offsetWidth + 18;
    for (let ns = parseFloat(numEl.style.fontSize); 1150 - NXof() < 480 && ns > 240; ns -= 10) css(numEl, { fontSize: px(ns - 10) });
    const NX = NXof(), NWD = 1150 - NX;
    const k1 = THEME.note(el, { x: NX, y: 0, w: NWD, size: 34, tone: 'white', rot: -1.4, at: 1.6, html: '시범 뒤 확장 후보 · 이번에는 대관 규정을 넣지 않음' });
    const k2 = THEME.note(el, { x: NX, y: 0, w: NWD, size: 34, tone: 'white', rot: 1.2, at: 1.75, html: '평균 10.95일 · 가장 깁니다<br>답변근거 칸 비어 있음' });
    let y1 = Math.round(rowsY[2] - k1.h / 2), y2 = Math.round(rowsY[4] - k2.h / 2);
    if (y2 < y1 + k1.h + 14) { const d = (y1 + k1.h + 14 - y2) / 2; y1 -= d; y2 += d; }
    at0(k1.el, NX, y1); at0(k2.el, NX, y2);
    const t1 = THEME.tape(k1.el, { x: -22, y: -20, w: 96, rot: -14, at: 1.75 });
    const t2 = THEME.tape(k2.el, { x: -22, y: -20, w: 96, rot: -10, at: 1.9 });
    return [bg, tp, b1, b2, bn, red, side, ...bars, pop(foot, 2.0), k1, k2, t1, t2];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s09a 한 문장: 3장으로 넘기는 질문 한 문장(104px, 세 줄)
  DECK.slide({ id: 'p2-ch02-s09a', notes: NOTES['p2-ch02-s09a'], ...lay(1.4, el => [
    THEME.bg(el, 'base'),
    THEME.header(el, { chapter: 2, title: CH2 }),
    THEME.statement(el, { kicker: '다음 질문', size: 104, at: 0.1, text: '고른 범위에서\n프로젝트가 무엇을 읽고\n어떤 규칙으로 답해야 하는가' }),
  ]) });
})();
