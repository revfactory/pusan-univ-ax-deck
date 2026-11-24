/* 파트 2 · 4장 「실습: 민원 상담 프로젝트 만들기」(LAB-3) — 레이아웃 목록(p2.md 8절)으로 다시 만든 장면 코드
 * 원고: plan/slides/p2-ch04.json · 배정표: plan/assets/p2_layout_ch04.md · 부품 본보기: deck/p2/ch00.js s08~s26 · 시범: deck/p2/ch06.js
 * 키 누름은 없다. 모든 장은 조각이 차례로 놓여 3초 안에 끝 상태가 된다.
 * 캡처(deck/assets/p2/shots/)가 없어 s03 의 화면은 THEME.shot 의 그린 화면이다. 단추 이름은 K-03 캡처 전이라 이름 없는 색 면으로 그린다.
 * 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다. */
(function () {
  'use strict';
  const { css, h } = REEL;
  DECK.config({ part: 'p2', chapter: 'ch04', title: '실습: 민원 상담 프로젝트 만들기' });

  const NOTES = {
    "p2-ch04-s01": "3장에서 한서윤 주임은 프로젝트를 만들기 전에 설계서 한 장을 썼습니다. 이번 장에서는 그 설계서를 ChatGPT의 프로젝트 하나로 옮깁니다. 파트 1 7장에서 본 프로젝트 지침과 프로젝트 파일을 여러분 계정에서 직접 만드는 실습입니다. ChatGPT를 열고 실습 묶음의 lab3 폴더와 자료 폴더를 미리 열어 두세요.",
    "p2-ch04-s02": "한서윤 주임이 3장에서 쓴 설계서대로 프로젝트를 만듭니다. 설계서의 역할과 범위, 답변 형식, 금지와 담당자에게 넘기는 조건은 지침 1판에 들어 있고, 근거로 쓰는 파일은 프로젝트 파일 3개로 올립니다. 설계서의 완료 기준은 이 장 끝에서 확인 질문 다섯 개의 답을 볼 때 씁니다. 이 실습에서도 실습 묶음의 가상 자료만 입력합니다. 한서윤 주임과 같은 순서로 다섯 단계를 따라 해 보겠습니다.",
    "p2-ch04-s03": "ChatGPT 왼쪽 사이드바에서 새 프로젝트를 누르고 이름을 「새별 민원 상담」으로 정합니다. 이름을 넣은 뒤 누르는 단추는 제 ChatGPT 화면에서 짚어 드립니다. 빈 프로젝트 화면이 나오면 됩니다. 맞춤형 GPT 만들기 화면은 쓰지 않습니다. 개인 계정에서는 새 GPT를 만들 수 없기 때문입니다. 메뉴 이름이 제 화면과 다르면 순서만 따라 주시고, 프로젝트 메뉴가 보이지 않는 분은 손을 들어 주세요. (강사 확인: 사이드바와 단추 이름은 강의 전날 K-03에서 실제 화면으로 확인하고, 다르면 화면에 나온 이름으로 말합니다.)",
    "p2-ch04-s04": "lab3 폴더의 지침_1판.md를 Windows는 메모장, macOS는 텍스트 편집기로 엽니다. ```text 줄과 ``` 줄 사이의 글만 복사해 프로젝트 설정의 지침 칸에 붙여 넣고 저장합니다. 프로젝트 설정을 여는 단추와 저장 단추는 제 ChatGPT 화면에서 먼저 짚어 드립니다. 지침은 역할, 근거, 답변 형식, 담당자에게 넘기는 경우, 개인정보 다섯 제목으로 나뉘고, 답변 형식에는 파트 1에서 본 다섯 칸이 그대로 들어 있습니다. 설계서를 직접 쓴 분도 여기서는 지침 1판을 붙여 넣습니다. 6장 실습의 기대 결과와 옆 사람과 시험 나누기가 지침 1판을 기준으로 하기 때문입니다. 이 지침은 이 프로젝트 안에서만 적용되고, 계정 전체의 맞춤 지침보다 우선합니다. (강사 확인: 지침 칸과 저장 단추의 이름은 강의 전날 K-03에서 실제 화면으로 확인하고, 다르면 화면에 나온 이름으로 말합니다.)",
    "p2-ch04-s05": "프로젝트 화면의 프로젝트 파일 자리에서 자료 폴더의 파일 세 개를 올립니다. 새별_체육시설_이용규정.md, 새별_공영주차장_운영지침.md, 새별_담당부서_안내.md입니다. 파일을 올리는 단추는 제 ChatGPT 화면에서 짚어 드립니다. 담당 부서 안내는 규정에 없는 질문을 어느 부서로 넘길지 적어 둔 파일이고, 지침 1판이 이 파일의 부서와 내선을 [담당자 확인] 칸에 적게 합니다. Plus는 프로젝트 파일을 25개까지 올릴 수 있으니 세 개는 넉넉합니다. 세 파일 이름이 모두 목록에 보이면 다음으로 넘어갑니다. (강사 확인: 파일을 올리는 단추 이름은 강의 전날 K-03에서 확인하고, 다르면 화면에 나온 이름으로 말합니다.) (화면에서 지운 기준 시점: 「2026년 11월 기준」)",
    "p2-ch04-s06": "세 단계를 마쳤으면 프로젝트 화면에서 세 가지를 확인합니다. 사이드바에 「새별 민원 상담」이 있는지, 프로젝트 설정의 지침 칸에 지침 1판이 남아 있는지, 프로젝트 파일이 3개인지 봅니다. 옆 사람과 화면을 바꿔 보고 세 가지가 모두 보이면 손을 들어 주세요. 프로젝트 메뉴가 끝내 보이지 않는 분은 새 대화에 파일 3개를 첨부하고 지침 1판을 첫 메시지로 보낸 뒤, 같은 대화에서 다음 질문을 보내면 됩니다.",
    "p2-ch04-s07": "사이드바에서 「새별 민원 상담」 프로젝트를 열고, 그 프로젝트 화면 안에서 새 대화를 시작합니다. 프로젝트 안에서 시작한 대화라야 지침 1판과 프로젝트 파일 3개가 함께 쓰입니다. lab3 폴더의 확인질문.md를 메모장이나 텍스트 편집기로 열고, Q1의 ```text 줄과 ``` 줄 사이 글을 복사해 보냅니다. Q1은 파트 1 2장과 5장에서 계속 본 수영 강습 환불 민원과 같은 계산입니다. 파트 1 5장과 달리 이번에는 요청문도 규정 파일도 붙이지 않고 질문만 보냅니다. (강사 확인: 프로젝트 안에서 연 대화가 사이드바 어디에 보이는지는 공식 문서와 tool_facts에 없습니다. K-03에서 캡처해 확인하기 전에는 「프로젝트 화면 안에서 연 대화」로만 말합니다.)",
    "p2-ch04-s08": "Q1을 보낸 같은 대화에서 Q2부터 Q5까지 하나씩 보냅니다. 확인질문.md에는 질문마다 상자가 따로 있으니, Q2 상자의 ```text 줄과 ``` 줄 사이만 복사해 보내고, 답이 다 나온 뒤에 Q3 상자를 복사합니다. 네 질문을 한꺼번에 복사해 한 메시지로 보내지 않습니다. Q2와 Q3은 규정에 답이 있는 질문, Q4는 규정에 없는 질문, Q5는 개인정보가 든 질문입니다. Q5의 이하준이라는 이름과 가운데 자리가 0000인 전화번호는 실습용 가상 정보입니다. 다섯 개를 다 보낸 분은 손을 들어 주세요.",
    "p2-ch04-s09": "이제 받은 답을 lab3/기대결과.md와 대조합니다. Q1부터 기대 결과를 하나씩 봅니다. Q1은 남은 8회 몫 40,000원에서 위약금 6,000원을 뺀 34,000원이고, 근거는 파트 1 5장과 같은 제7조 제1항 제2호입니다. Q2는 최초 30분 요금 1,000원에 나머지 60분 몫 1,800원(10분마다 300원)을 더한 2,800원에서 전기차 50%를 감면해 1,400원입니다. Q3은 30% 감면과 수강 신청할 때 증빙을 낸다는 답입니다. 문장은 달라도 되지만 금액과 근거 조문이 모두 같아야 통과이니, 세 개가 모두 같으면 손을 들어 주세요. 금액이 같아도 조문이 다르면 통과가 아닙니다. 다른 질문이 있으면 답은 대화에 그대로 두고, Q5까지 본 뒤 시험 기록에 옮겨 적습니다. (강사 확인: 강사가 codex로 미리 보낸 결과(V-03)에서 Q1·Q2는 기대 결과와 같았고, Q3은 세 번 중 한 번 범위 밖으로 넘어갔습니다. 참가자 화면에서는 다를 수 있고, ChatGPT 화면 결과는 강의 전날 K-03에서 확인합니다.)",
    "p2-ch04-s10": "Q4는 규정 파일에 없는 공연장 대관료를 묻습니다. 금액을 쓰지 않고 [담당자 확인]에 「필요」와 문화센터 운영팀 내선 2301이 나오면 맞습니다. Q5는 답변 맨 앞에 개인정보 경고가 나오고, 이하준이라는 이름과 전화번호가 [답변]에 없어야 하며, 시작 전날 취소라서 40,000원 전액 환불입니다. 파트 1 5장에서는 이름과 연락처를 지운 민원을 넣었기 때문에 개인정보 규칙은 이 Q5에서 처음 시험합니다. 두 개가 모두 맞으면 손을 들어 주세요. Q4에 금액이 나왔거나 Q5에 경고가 없는 등 하나라도 다르면, 앞 화면에서 다르게 나온 Q1~Q3과 함께 다음 화면에서 시험 기록에 옮겨 적습니다. (강사 확인: 강사가 codex로 미리 보낸 결과(V-03)에서 Q4·Q5는 기대 결과와 같았습니다. 참가자 화면에서는 다를 수 있고, ChatGPT 화면 결과는 K-03에서 확인합니다.)",
    "p2-ch04-s11": "기대 결과와 다른 답이 있었다면 lab4 폴더의 시험기록_양식.md를 메모장이나 텍스트 편집기로 엽니다. 1회차 표 아래 「LAB-3에서 옮겨 온 실패:」 줄의 괄호 안내를 지우고, 그 자리에 질문 번호와 기대 결과와 다른 점을 쓴 다음 저장합니다. 왼쪽 종이는 강사가 강의 전에 1장에서 말한 codex로 지침 1판과 Q3을 미리 보내 본 답입니다. 같은 Q3을 세 번 보냈을 때 한 번은 금액 없이 「처리 범위 밖」이라며 담당자에게 넘겼습니다. 여러분 화면에서 이런 답이 나왔다면 「LAB-3에서 옮겨 온 실패: Q3(65세 이상 수강료 감면)이 금액 없이 범위 밖으로 넘어갔다」라고 적어 두세요. 왜 이렇게 답했는지는 5장에서 함께 고르고, 6장에서 이 줄을 보고 지침을 고칩니다. 5번까지 끝내고 시간이 남는 분은 lab3/단계.md 6번(선택)으로 설계서를 직접 써 봅니다. (강사 확인: 왼쪽 Q3 답은 codex(모델 gpt-6-sol, 생각 수준 medium)로 지침 1판과 프로젝트 파일 3개를 흉내 내 2026-11-23에 보낸 결과(V-03)이고, ChatGPT 화면에서 같은 답이 나온다는 뜻이 아닙니다. 적는 자리는 lab4/완성본/시험기록_예.md의 1회차 표 아래 줄과 같습니다. ChatGPT 화면 결과는 K-03에서 확인합니다.)",
    "p2-ch04-s12": "한서윤 주임의 프로젝트는 이제 요청문과 규정 파일을 매번 붙이지 않아도 질문만 넣으면 다섯 칸으로 답하고 [근거] 칸을 채웁니다. 파트 1 5장에서 대화마다 붙여 넣던 요청문과 파일을 프로젝트에 한 번 정해 둔 결과입니다. 그런데 지금 확인한 것은 질문 다섯 개를 한 번씩 보낸 결과이고, 강사가 codex로 같은 Q3을 세 번 보냈더니 한 번은 다른 답이 나왔습니다. 질문 몇 개에 잘 답했다고 이 프로젝트를 믿어도 될까요? 5장에서 시험 질문과 통과 기준을 정합니다.",
  };
  const CH4 = '실습: 민원 상담 프로젝트 만들기';
  const C = THEME.C, M = THEME.mono;
  const px = v => v.toFixed(1) + 'px';
  const DIM = t => `<span style="color:var(--dim)">${t}</span>`;
  const MARK = t => `<span class="p2-mk">${t}</span>`;

  // 슬라이드 하나: build(el) 가 돌려준 부품을 차례로 그린다. 부품은 모두 render(lt, ctx) 를 가진다
  // 슬라이드마다 id·notes 와 함께 ...lay(dur, build) 로 펼쳐 쓴다
  const lay = (dur, build) => ({ dur, steps: [],
    setup(el) { this.parts = build.call(this, el).filter(Boolean); },
    render(lt, ctx) { this.parts.forEach(p => p.render(lt, ctx)); } });
  const top = (el, title, step) => THEME.top(el, { chapter: 4, chapterTitle: CH4, title, step: step ? [step, 6] : undefined, fiction: true });
  // 단계 표시 줄(「n / 6」) 오른쪽 끝 x. 제목 띠 아래 왼쪽 띠는 이 뒤에 놓아야 표시 줄을 가리지 않는다
  const rowEnd = el => { const r = el.querySelector('.p2-step-row'); return r ? 86 + r.offsetLeft + r.offsetWidth : 120; };
  // 고정폭 조각이 든 이름표: THEME.tag 는 글을 그대로 쓰므로 같은 크기의 띠로 만든다
  const tagH = (parent, html, o = {}) => THEME.strip(parent, html, Object.assign({ size: 34, weight: 700, lh: 1.15, padX: 22, padY: 10, tone: 'lemon', rot: -2, k: 0.5 }, o));
  // 부품 밖 요소에 같은 들었다 놓기를 준다(그림자 없이)
  const liftOf = (node, at, o = {}) => ({ render(lt) { THEME.lift(node, lt, at, Object.assign({ shadow: false, dur: 0.4 }, o)); } });
  // 고리: 같은 칸 안 요소 둘레에 주홍 고리를 단다
  function ring(parent, node, at, G = 14, rot = 0) {
    const r = h('div', 'p2-mark', parent);
    css(r, { left: px(node.offsetLeft - G), top: px(node.offsetTop - G), width: px(node.offsetWidth + 2 * G), height: px(node.offsetHeight + 2 * G) });
    return { render(lt) { THEME.lift(r, lt, at, { rot, k: 0.5, dur: 0.4 }); } };
  }

  // ─────────────────────────────────────────────────────────────
  // s01 전환: p2-tr-place 를 반전 없이 깔고 왼쪽 크림 띠에 꼬리표, 음절 조각 제목 두 줄, entry 질문
  DECK.slide({ id: 'p2-ch04-s01', notes: NOTES['p2-ch04-s01'], ...lay(2.6, el => [
    THEME.videoTitle(el, {
      kind: 'chapter', scene: 'place', kicker: '파트 2 · 4장',
      src: '../assets/video/p2/p2-tr-place.mp4', poster: '../assets/video/p2/p2-tr-place.jpg',
      title: '실습: 민원 상담\n프로젝트 만들기', sub: '이 설계서를 ChatGPT에서 어떻게 프로젝트로 만드는가',
    }),
  ]) });

  // ─────────────────────────────────────────────────────────────
  // s02 인물과 대사: 한서윤 주임(1.9배)과 대사 종이. 대사 종이 위 가장자리에 실습 규칙 1 레몬 띠,
  // 아래에 사진 조각(프로젝트 파일 3개)과 세 항목의 이름표
  DECK.slide({ id: 'p2-ch04-s02', notes: NOTES['p2-ch04-s02'], ...lay(2.2, el => {
    const bg = THEME.bg(el, 'base');
    const tp = top(el, '설계서대로 프로젝트 하나를 만듭니다');
    const sp = THEME.speech(el, { who: 'han', scale: 1.9, x: 130, org: true, bubble: { x: 740, y: 290, w: 1060 }, size: 72, at: 0.2,
      text: `답마다 ${MARK('[근거]')} 칸에\n조문이 있는지 보겠습니다`,
      sub: '프로젝트 이름 「새별 민원 상담」 · 지침 1판과 프로젝트 파일 3개<br>확인 질문 5개로 동작을 봅니다' });
    const rule = THEME.strip(el, '실습 규칙 1 · 실습 묶음의 가상 자료만 입력합니다', { right: 1800, y: 246, size: 34, weight: 700, tone: 'lemon', rot: -0.6, at: 0.9 });
    // 사진 조각(3:2)은 대사 종이의 아래 여백(보조 줄 아래 58px)에 조금 걸쳐 놓아 높이를 번다
    const bb = 290 + sp.el.offsetHeight, PY = bb - 40, PH = 980 - PY, PW = Math.round(PH * 1.5), PX = 760;
    const photo = THEME.cutout(el, '../assets/img/p2/p2-ch04-s02-three-docs_cut.png', { x: PX, y: PY, w: PW, h: PH, rot: -2, at: 1.1, fallback: 'binder' });
    const t3 = THEME.tag(el, '프로젝트 파일 3개', { x: PX - 12, y: PY - 14, size: 34, at: 1.25, rot: -2.5 });
    // 크림 이름표 세 장: 사진 오른쪽에 위에서 아래로(사진 속 세 항목을 왼쪽부터 가리키는 순서)
    const TX = PX + PW + 34, names = ['체육시설 이용 규정', '공영주차장 운영 지침', '담당 부서 안내'];
    const tags = names.map((t, i) => THEME.tag(el, t, { x: 0, y: 0, tone: 'cream', size: 34, at: 1.4 + i * 0.1, rot: [-1.5, 1.2, -0.8][i], seed: 3.1 + i }));
    const TY = bb + 6, gapY = Math.max(8, Math.floor((980 - TY - 3 * tags[0].h) / 2));
    tags.forEach((t, i) => css(t.el, { left: px(TX + [0, 26, 8][i]), top: px(TY + i * (tags[0].h + gapY)) }));
    return [bg, tp, sp, rule, photo, t3, ...tags];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s03 화면 크게: 그린 화면을 보통 크기로 그려 1.4배로 키운다(왼쪽 위만 보인다). 사이드바 「새 프로젝트」(고리 1)와 이름 칸(고리 2).
  // 오른쪽 열(x 1400~1800)에 쪽지 두 장과 초록 기대 결과 카드
  DECK.slide({ id: 'p2-ch04-s03', notes: NOTES['p2-ch04-s03'], ...lay(2.6, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '새 프로젝트를 만듭니다', 1);
    const shot = THEME.shot(el, null, { x: 120, y: 272, w: 1240, h: 708, zoom: 1.4, focus: [0, 0], at: 0.3, url: 'chatgpt.com',
      sidebar: { title: 'ChatGPT', items: ['새 프로젝트'], on: 0 },
      draw(main, frame) {
        const url = frame.el.querySelector('.kit-url'); if (url) css(url, { fontSize: '32px' });
        const sd = main.parentElement.querySelector('.p2-side'), it = sd.querySelectorAll('.p2-side-i');
        css(it[0], { fontSize: '32px', marginBottom: '14px' });
        css(it[1], { fontSize: '32px', fontWeight: 700 });
        // 대화 목록은 회색 줄로 가린다
        [200, 150, 220, 170, 190, 140, 210].forEach((w, i) => {
          const b = h('div', '', sd); css(b, { height: '16px', width: px(w), margin: (i ? 30 : 46) + 'px 14px 0', borderRadius: '8px', background: 'rgba(30,22,16,.13)' });
        });
        // 이름 입력 창: 회색 머리 줄, 이름 칸(「새별 민원 상담」), 이름을 쓰지 않은 확인 단추 색 면
        const dlg = h('div', '', main);
        css(dlg, { position: 'absolute', left: '34px', top: '96px', width: '520px', height: '300px', boxSizing: 'border-box', background: '#FFFFFF',
          border: '2px solid rgba(30,22,16,.14)', borderRadius: '18px', boxShadow: '0 8px 22px rgba(30,22,16,.12)' });
        const hd = h('div', '', dlg); css(hd, { position: 'absolute', left: '30px', top: '34px', width: '220px', height: '18px', borderRadius: '9px', background: 'rgba(30,22,16,.3)' });
        const field = h('div', '', dlg, '새별 민원 상담');
        css(field, { position: 'absolute', left: '30px', top: '86px', width: '456px', boxSizing: 'border-box', padding: '14px 20px', fontSize: '34px', fontWeight: 700,
          lineHeight: 1.3, color: C.ink, border: '3px solid rgba(30,22,16,.4)', borderRadius: '12px', background: '#FDFBF6', whiteSpace: 'nowrap' });
        const btn = h('div', '', dlg); css(btn, { position: 'absolute', right: '30px', bottom: '30px', width: '150px', height: '56px', borderRadius: '14px', background: C.dark });
        const cancel = h('div', '', dlg); css(cancel, { position: 'absolute', right: '196px', bottom: '30px', width: '120px', height: '56px', borderRadius: '14px', border: '2px solid rgba(30,22,16,.2)', boxSizing: 'border-box' });
        return [{ node: it[1], n: 1, at: 1.2, num: 'right' }, { node: field, n: 2, at: 1.6 }];
      } });
    const RX = 1400, RW = 400;
    const Y1 = 320;
    const c1 = THEME.callout(el, { x: RX, y: Y1, w: RW, n: 1, tone: 'cream', size: 40, rot: -1.2, at: 1.3,
      text: `${DIM('여는 곳')}<br>사이드바 →<br>새 프로젝트` });
    const c2 = THEME.callout(el, { x: RX, y: Y1 + c1.h + 30, w: RW, n: 2, tone: 'cream', size: 40, rot: 0, at: 1.7,
      text: `${DIM('입력할 이름')}<br>새별 민원 상담` });
    const cy = Y1 + c1.h + 30 + c2.h + 30;
    const ex = THEME.card(el, { x: RX, y: cy, w: RW, h: 'fit', minH: 980 - cy, layout: true, tone: 'green', label: '기대 결과', body: '빈 프로젝트 화면', bodySize: 48, rot: 0.8, at: 2.0 });
    css(ex.flow, { marginTop: px(Math.max(0, Math.round((ex.h - 76 - ex.flow.offsetHeight) / 2))) });
    const band = THEME.strip(el, 'GPT 만들기 화면은 쓰지 않습니다', { right: 1800, y: 214, size: 34, weight: 700, at: 0.25 });
    return [bg, tp, shot, c1, c2, ex, band];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s04 요청문 크게(지침 종이): 크림 종이를 두 칸으로 나눠 지침 1판의 짜임을 보인다. 오른쪽 칸 다섯 줄 아래에 레몬 테이프.
  // promptSheet 는 줄마다 굵기를 달리할 수 없어 THEME.paper 에 줄을 직접 쓴다. 종이 아래에 쪽지 세 장을 가로로
  DECK.slide({ id: 'p2-ch04-s04', notes: NOTES['p2-ch04-s04'], ...lay(2.2, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '지침 칸에 지침 1판을 붙여 넣습니다', 2);
    const band = THEME.strip(el, '모두 지침 1판으로 시작합니다', { right: 1800, y: 214, size: 34, weight: 700, at: 0.25 });
    // 왼쪽 칸(제목 네 줄)을 좁게, 오른쪽 칸(다섯 칸 줄)을 넓게 나눠 다섯 줄이 한 줄씩 들게 한다
    const X = 120, Y = 318, W = 1680, P = 48, LW = 410, GAP = 30, RXc = P + LW + GAP, RWc = W - RXc - P;
    const LS = 38;                                               // 다섯 칸 줄 글자
    // 칸 내용을 먼저 재서 종이 높이를 정한다
    const mk = (w) => { const d = h('div', '', el); css(d, { position: 'absolute', left: '0', top: '0', width: px(w), color: C.ink, wordBreak: 'keep-all' }); return d; };
    const head = (p, t, size, mt) => { const d = h('div', '', p, t); css(d, { position: 'relative', fontSize: px(size), fontWeight: 700, lineHeight: 1.25, marginTop: px(mt) }); return d; };
    const gray = (p, w) => { const d = h('div', '', p); css(d, { position: 'relative', width: px(w), height: '12px', borderRadius: '6px', background: 'rgba(30,22,16,.16)', marginTop: '14px' }); return d; };
    const R = mk(RWc);
    head(R, '# 답변 형식', 40, 0);
    const five = h('div', '', R); css(five, { position: 'relative', marginTop: '16px' });
    ['[민원 요지] 한 줄', '[답변] 민원인에게 보낼 문장. 존댓말, 5문장 이내', '[계산] 금액이 있으면 계산식. 없으면 「해당 없음」',
      '[근거] 규정 이름과 조문 번호(제○조 제○항 제○호), 조문 한 줄 인용', '[담당자 확인] 「필요」 또는 「불필요」와 이유']
      .forEach((t, i) => { const d = h('div', '', five, t); css(d, { position: 'relative', fontSize: px(LS), lineHeight: 1.34, marginTop: i ? '6px' : '0', whiteSpace: 'nowrap' }); });
    if (five.scrollWidth > RWc + 2) console.warn(`[DECK] s04 다섯 칸 줄이 칸보다 길다(${five.scrollWidth} > ${RWc})`);
    const L = mk(LW);
    const heads = ['# 역할', '# 근거', '# 담당자에게 넘기는 경우', '# 개인정보'].map((t, i) => { const d = head(L, t, 36, 0); gray(L, [320, 270, 380, 250][i]); return d; });
    const lgap = Math.max(18, Math.floor((R.offsetHeight - L.offsetHeight) / 3));   // 왼쪽 칸 높이를 오른쪽 칸에 맞춘다
    heads.slice(1).forEach(d => css(d, { marginTop: px(lgap) }));
    const H = Math.ceil(P * 2 + Math.max(L.offsetHeight, R.offsetHeight));
    const pp = THEME.paper(el, { x: X, y: Y, w: W, h: H, tone: 'cream', rot: 0, at: 0.3, seed: 2.2 });
    // 두 칸 사이 점선
    const div = h('div', '', pp.inner); css(div, { position: 'absolute', left: px(P + LW + GAP / 2), top: px(P), height: px(H - 2 * P), borderLeft: '3px dashed rgba(30,22,16,.22)' });
    // 다섯 칸 줄 아래 레몬 테이프(글 밑에 깔린다)
    const tapeY = P + five.offsetTop - 10, tapeH = five.offsetHeight + 20;
    const tape = THEME.tape(pp.inner, { x: RXc - 22, y: tapeY, w: RWc + 30, h: tapeH, rot: -0.4, at: 0.8, seed: 4.7 });
    pp.inner.appendChild(L); css(L, { left: px(P), top: px(P) });
    pp.inner.appendChild(R); css(R, { left: px(RXc), top: px(P) });
    // 종이 위 가장자리 이름표 두 장
    const tg1 = tagH(pp.el, `복사할 범위 · ${M('```text')} 줄과 ${M('```')} 줄 사이`, { x: P - 22, y: -32, tone: 'kraft', rot: -1.5, at: 0.9 });
    const tg2 = tagH(pp.el, `${M('lab3/지침_1판.md')} 상자 안 글`, { x: tg1.x + tg1.w + 34, y: -30, tone: 'kraft', rot: 1.2, at: 1.0, seed: 5.3 });
    // 종이 아래 쪽지 세 장(폭은 글 길이에 맞춰 나눈다)
    const NY = Y + H + 42, NW = [520, 640, 460], NX = [120, 120 + 520 + 30, 120 + 520 + 30 + 640 + 30];
    const n1 = THEME.note(el, { x: NX[0], y: NY, w: NW[0], label: '여는 프로그램', size: 34, rot: -0.6, at: 1.2, html: '메모장(Windows) ·<br>텍스트 편집기(macOS)' });
    const n2 = THEME.note(el, { x: NX[1], y: NY + 6, w: NW[1], label: '붙여 넣을 곳', size: 34, rot: 0.5, at: 1.35, html: '프로젝트 설정의 지침 칸<br>프로젝트 설정 → 지침 → 저장' });
    const n3 = THEME.note(el, { x: NX[2], y: NY, w: NW[2], tone: 'green', label: '기대 결과', size: 34, rot: -0.4, at: 1.5, html: '지침이 저장된다' });
    if (Math.max(NY + n1.h, NY + 6 + n2.h, NY + n3.h) > 990) console.warn('[DECK] s04 쪽지가 화면 아래로 넘친다');
    return [bg, tp, band, pp, tape, liftOf(L, 0.5, { from: 1.02 }), liftOf(R, 0.5, { from: 1.02 }), tg1, tg2, n1, n2, n3];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s05 기대 결과 크게: 초록 결과 종이에 값 「프로젝트 파일 3개」(124px)와 파일 이름 세 줄. 왼쪽에 올릴 파일 쪽지와 사진 조각
  DECK.slide({ id: 'p2-ch04-s05', notes: NOTES['p2-ch04-s05'], ...lay(2.0, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '프로젝트 파일 3개를 올립니다', 3);
    const band = THEME.strip(el, `자료 폴더의 ${M('.md')} 파일 3개 · 규정 2개와 담당 부서 안내`, { right: 1800, y: 214, size: 34, at: 0.25 });
    const RXr = 660, RWr = 1140;
    const files = ['새별_체육시설_이용규정.md', '새별_공영주차장_운영지침.md', '새별_담당부서_안내.md'];
    const rs = THEME.result(el, { x: RXr, y: 316, w: RWr, h: 664, size: 124, at: 0.5,
      value: '프로젝트 파일 3개',
      detail: '<div style="font-size:38px;line-height:1.4">새별 민원 상담 · 프로젝트 파일</div>' +
        `<div style="font-family:var(--mono);font-size:44px;line-height:1.42;margin-top:12px">${files.map(f => `<div>${f}</div>`).join('')}</div>` +
        '<div style="font-size:36px;line-height:1.4;margin-top:26px;padding-top:20px;border-top:3px dashed rgba(251,245,233,.45)">Plus 프로젝트 파일 25개까지</div>' });
    // 경로는 고정폭으로 쓰고, 「/」와 「_」 뒤에서만 줄이 바뀌게 한다(keep-all 이라 다른 자리에서는 접히지 않는다)
    const path = f => M('자료/') + '<wbr>' + f.replace(/_/g, '_<wbr>').split('<wbr>').map(M).join('<wbr>');
    const nt = THEME.note(el, { x: 120, y: 330, w: 500, label: '올릴 파일', size: 36, rot: -0.8, at: 0.3,
      html: files.map((f, i) => `<div style="margin-top:${i ? 10 : 0}px">${path(f)}</div>`).join('') });
    const cy = 330 + nt.h + 34, ch = Math.min(980 - cy, 300), cw = Math.min(500, Math.round(ch * 1.5));
    const photo = THEME.cutout(el, '../assets/img/p2/p2-ch04-s02-three-docs_cut.png', { x: 120 + Math.round((500 - cw) / 2), y: cy, w: cw, h: ch, rot: -2, at: 1.1, fallback: 'binder' });
    return [bg, tp, band, nt, rs, photo];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s06 채점 기준: 크림 기준 띠 세 장(이름과 확인 문장 두 줄, 52px). 셋째 띠의 「3개」에 레몬 바탕. 오른쪽에 막혔을 때 카드
  DECK.slide({ id: 'p2-ch04-s06', notes: NOTES['p2-ch04-s06'], ...lay(1.8, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '프로젝트 화면에서 세 가지를 봅니다', 3);
    const band = THEME.strip(el, '세 가지가 모두 보이면 맞습니다', { x: rowEnd(el) + 30, y: 212, size: 34, weight: 700, at: 0.25 });
    const it = (a, b) => `<span style="font-weight:700">${a}</span><br><span style="font-weight:500">${b}</span>`;
    const ck = THEME.checklist(el, { x: 120, y: 300, w: 1060, size: 52, gap: 44, at: 0.3, items: [
      it('사이드바', '「새별 민원 상담」 프로젝트가 있다'),
      it('지침 칸', '지침 1판이 저장되어 있다'),
      it('프로젝트 파일', `<span class="p2-mk" data-mk>3개</span>가 있다`)] });
    // 「3개」의 레몬 바탕은 0.8초에 깔린다
    const mk = el.querySelector('[data-mk]');
    const mkR = { render(lt) { const p = REEL.prog(lt, 0.8, 0.3, REEL.ease.outCubic);
      REEL.set(mk, 'backgroundSize', `${(p * 100).toFixed(1)}% 100%`); REEL.set(mk, 'boxShadow', p > 0.98 ? '' : 'none'); } };
    css(mk, { background: `linear-gradient(${C.lemon}, ${C.lemon}) no-repeat 0 0 / 0% 100%` });
    const card = THEME.card(el, { x: 1236, y: 300, w: 564, h: 680, layout: true, label: '막혔을 때', bodySize: 52, rot: 1.2, tape: true, at: 0.9,
      body: '새 대화에<br>파일 3개 첨부 →<br>지침 1판을<br>첫 메시지로 →<br>같은 대화에서 질문' });
    css(card.body, { lineHeight: 1.36, marginTop: '22px', fontWeight: 600 });
    css(card.flow, { marginTop: px(Math.max(0, Math.round((680 - 76 - card.flow.offsetHeight) / 2))) });
    return [bg, tp, band, ck, mkR, card];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s07 요청문 크게: 보낼 질문 Q1 전문. 오른쪽 열에 크림 쪽지와 초록 기대 결과 카드(다섯 칸 이름 조각, 「[근거]」만 레몬)
  const Q1 = '11월 수영 초급반(수강료 60,000원)을 다니고 있는데 12회 중 4회가 진행되었습니다. 오늘 그만두면 얼마를 돌려받나요?';
  DECK.slide({ id: 'p2-ch04-s07', notes: NOTES['p2-ch04-s07'], ...lay(2.0, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '프로젝트 안 새 대화에 Q1을 보냅니다', 4);
    const band = THEME.strip(el, '프로젝트 화면 안에서 새 대화를 엽니다', { right: 1800, y: 214, size: 34, weight: 700, at: 0.25 });
    const ps = THEME.promptSheet(el, { x: 120, y: 300, w: 1100, minH: 680, size: 56, center: true, at: 0.3, text: Q1,
      label: 'Q1(규정 안: 수강료 환불) · lab3/확인질문.md', whereHtml: '여는 곳 · 「새별 민원 상담」 프로젝트 안의 새 대화' });
    // 「60,000원)」과 「을」 사이에서 줄이 바뀌지 않게 한 덩어리로 묶는다
    const qline = [...ps.el.querySelectorAll('div')].find(d => d.childElementCount === 0 && d.textContent === Q1);
    if (qline) qline.innerHTML = qline.innerHTML.replace('(수강료 60,000원)을', '<span style="white-space:nowrap">(수강료 60,000원)을</span>');
    // 이름표의 파일 이름을 고정폭으로 쓰려고 부품의 이름표를 같은 자리의 띠로 바꾼다
    const old = [...ps.el.children].find(c => c.style.zIndex === '2'); if (old) old.remove();
    const lab = tagH(ps.el, `Q1(규정 안: 수강료 환불) · ${M('lab3/확인질문.md')}`, { x: 70 - 16 - 0, y: -30, at: 0.45 });
    const RX = 1254, RW = 546;
    const c1 = THEME.callout(el, { x: RX, y: 300, w: RW, tone: 'cream', size: 40, rot: 1, at: 0.8, text: '파트 1에서 본 수영 강습 민원과 같은 계산' });
    const chip = (t, on) => `<span ${on ? 'data-gm ' : ''}style="display:inline-block;white-space:nowrap;font-family:var(--mono);font-size:38px;line-height:1.2;padding:6px 14px;margin:0 12px 14px 0;` +
      (on ? `background:${C.lemon};color:${C.ink}` : 'background:rgba(251,245,233,.14)') + `">${t}</span>`;
    const cy = 300 + c1.h + 24;
    const ex = THEME.card(el, { x: RX, y: cy, w: RW, h: 'fit', minH: 980 - cy, layout: true, pad: 34, tone: 'green', label: '기대 결과', rot: -0.8, at: 1.1,
      title: '[근거] 칸에 조문이 있는 답', titleSize: 48, bodySize: 38,
      body: ['[민원 요지]', '[답변]', '[계산]', '[근거]', '[담당자 확인]'].map(t => chip(t, t === '[근거]')).join('') });
    css(ex.body, { marginTop: '22px' });
    css(ex.flow, { marginTop: px(Math.max(0, Math.round((ex.h - 68 - ex.flow.offsetHeight) / 2))) });
    // 「[근거]」 조각의 레몬 바탕은 1.3초에 깔린다
    const gm = ex.el.querySelector('[data-gm]');
    const gmR = { render(lt) { const p = REEL.prog(lt, 1.3, 0.3, REEL.ease.outCubic);
      REEL.set(gm, 'background', `linear-gradient(${C.lemon}, ${C.lemon}) no-repeat 0 0 / ${(p * 100).toFixed(1)}% 100%, rgba(251,245,233,.14)`);
      REEL.set(gm, 'color', p > 0.5 ? C.ink : C.cream); } };
    return [bg, tp, band, ps, lab, c1, ex, gmR];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s08 순서 조각(넷, 2×2): 윗줄 Q2 → Q3, 아랫줄 Q4 → Q5. 조각 하나가 확인질문.md 의 상자 하나, 메시지 하나다.
  // 조각 폭 820 안팎에 질문 44px. 줄 높이는 그 줄의 긴 조각에 맞춘다. 따라 읽는 글이라 회전 0°
  const QS = [
    ['Q2', '규정 안: 주차 감면', '전기차를 타고 새별역 공영주차장에 1시간 30분 주차했습니다. 주차 요금이 얼마인가요?'],
    ['Q3', '규정 안: 감면과 환불 절차', '65세 이상이면 수영 강습 수강료가 얼마나 감면되나요? 감면 서류는 언제 내야 하나요?'],
    ['Q4', '규정 밖', '새별문화센터 공연장 대관료가 하루에 얼마인가요?'],
    ['Q5', '개인정보', '민원인 이하준(010-0000-7788) 님이 요가 강습 시작 전날 취소를 요청했습니다. 수강료 40,000원 환불 답변을 써 주세요.'],
  ];
  DECK.slide({ id: 'p2-ch04-s08', notes: NOTES['p2-ch04-s08'], ...lay(2.0, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, 'Q2부터 Q5까지 하나씩 보냅니다', 4);
    const band = THEME.strip(el, `복사할 범위 · 상자마다 ${M('```text')} 줄과 ${M('```')} 줄 사이`, { x: rowEnd(el) + 30, y: 212, size: 34, weight: 700, at: 0.25 });
    const exp = THEME.tag(el, '기대 결과 · 질문마다 답이 하나씩', { x: 0, y: 0, tone: 'green', size: 34, at: 0.4, rot: 1.2 });
    const TW = tp.title.el.offsetWidth + 292;
    css(exp.el, { left: px(1800 - exp.w), top: px(TW + 24 < 1800 - exp.w ? 116 : 214) });
    const X0 = 120, Y0 = 302, GX = 40, GY = 26, PXq = 36, QF = 44, TOP = 90, PB = 30, YMAX = 944;
    // 질문 전문(44px). 종류 이름표는 레몬 조각 오른쪽에 둔다
    const flowOf = (q, w) => {
      const f = h('div', '', el, q[2]);
      css(f, { position: 'absolute', left: '0', top: '0', width: px(w - 2 * PXq), wordBreak: 'keep-all', color: C.ink, fontSize: px(QF), lineHeight: 1.4, fontWeight: 500, textWrap: 'pretty' });
      return f;
    };
    // 폭: 820·820 으로 두 줄이 y 944 안에 들면 그대로 쓰고, 넘으면 아랫줄을 긴 Q5 쪽으로 넓힌다(Q5 아래 이름표가 y 980 안에 들게)
    const W2 = (1680 - GX) / 2;
    let WS = null, flows = [], rows = [];
    for (const ws of [[W2, W2, W2, W2], [W2, W2, 720, 1680 - GX - 720]]) {
      flows.forEach(f => f.remove());
      WS = ws; flows = QS.map((q, i) => flowOf(q, ws[i]));
      rows = [0, 1].map(r => Math.ceil(TOP + Math.max(flows[2 * r].offsetHeight, flows[2 * r + 1].offsetHeight) + PB));
      if (Y0 + rows[0] + GY + rows[1] <= YMAX) break;
    }
    if (Y0 + rows[0] + GY + rows[1] > YMAX) console.warn(`[DECK] s08 조각이 화면 아래로 넘친다(${Y0 + rows[0] + GY + rows[1]}px)`);
    const parts = QS.map((q, i) => {
      const r = i >> 1, c = i & 1, w = WS[i], x = c ? 1800 - w : X0, y = Y0 + (r ? rows[0] + GY : 0), hh = rows[r], at = 0.5 + i * 0.2;
      const pp = THEME.paper(el, { x, y, w, h: hh, tone: 'cream', rot: 0, at, seed: 7.3 + i });
      pp.inner.appendChild(flows[i]); css(flows[i], { left: px(PXq), top: px(TOP) });
      const lb = h('div', '', pp.inner, q[1]);
      css(lb, { position: 'absolute', left: '138px', top: '20px', fontSize: '34px', fontWeight: 700, lineHeight: 1.3, padding: '4px 12px', background: '#E7D3B4', color: C.ink, whiteSpace: 'nowrap' });
      const chip = THEME.paper(pp.el, { x: -16, y: -22, w: 132, h: 100, tone: 'lemon', rot: [-4, 3, -3, 4][i], at: at + 0.1, k: 0.6, seed: 1.1 + i });
      const t = h('div', 'p2-num', chip.inner, q[0]); css(t, { inset: '0', fontSize: '66px', color: C.ink, paddingTop: '4px' });
      return { x, y, w, h: hh, render(lt) { pp.render(lt); chip.render(lt); } };
    });
    // Q5 조각 아래 가장자리 오른쪽에 걸친 레몬 이름표
    const q5 = parts[3];
    const vt = THEME.tag(el, 'Q5의 이름과 전화번호는 가상입니다', { x: 0, y: 0, size: 34, at: 1.4, rot: -1.5 });
    css(vt.el, { left: px(Math.min(1810 - vt.w, q5.x + q5.w - vt.w - 24)), top: px(q5.y + q5.h - 26) });
    return [bg, tp, band, exp, ...parts, vt];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s09 카드 격자(3열): 기대 결과 카드 세 장. 카드마다 이름표, Anton 큰 값, 계산 줄, 근거 조문(700)
  DECK.slide({ id: 'p2-ch04-s09', notes: NOTES['p2-ch04-s09'], ...lay(1.8, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, 'Q1~Q3은 금액과 조문을 대조합니다', 5);
    const band = THEME.strip(el, '문장은 달라도 됩니다 · 금액·근거 조문이 같으면 통과', { x: rowEnd(el) + 30, y: 212, size: 34, weight: 700, at: 0.25 });
    const file = tagH(el, M('lab3/기대결과.md'), { right: 1800, y: 216, tone: 'cream', rot: 1.2, at: 0.4 });
    const V = (t, u) => `<span style="font-family:var(--num);font-weight:400;font-size:110px;line-height:1.08;white-space:nowrap">${t}</span>` +
      (u ? `<span style="font-family:var(--display);font-weight:400;font-size:76px;margin-left:10px">${u}</span>` : '');
    const B = (calc, basis) => `<div style="font-size:36px;line-height:1.38">${calc}</div>` +
      `<div style="font-size:36px;font-weight:700;line-height:1.4;margin-top:16px;padding-top:14px;border-top:3px dashed rgba(30,22,16,.25)">${basis}</div>`;
    const gd = THEME.grid(el, { x: 120, y: 316, w: 1680, h: 664, gap: 40, at: 0.5, titleSize: 110, bodySize: 34, items: [
      { label: 'Q1 수영 초급 · 12회 중 4회', title: V('34,000', '원'),
        body: B('60,000 × 8 ÷ 12 = 40,000 · 위약금 6,000 · 40,000 − 6,000', '체육시설 이용 규정 제7조 제1항 제2호') },
      { label: 'Q2 전기차 · 1시간 30분', title: V('1,400', '원'),
        body: B('최초 30분 1,000원 + (60분 ÷ 10분) × 300원 = 2,800원 · 전기차 50% 감면', '공영주차장 운영 지침 제4조 제1항, 제5조 제1항 제4호, 제7조') },
      { label: 'Q3 65세 이상 · 수강료 감면', title: V('30%', '감면'),
        body: B('증빙은 수강 신청할 때 · 신청 뒤 낸 증빙은 다음 달부터', '체육시설 이용 규정 제6조 제1항 제4호, 제3항') }] });
    gd.cards.forEach(c => css(c.title, { marginTop: '10px', lineHeight: 1.08 }));
    const vals = gd.cards.map((c, i) => liftOf(c.title, 0.65 + i * 0.15, { from: 1.1 }));
    return [bg, tp, band, file, gd, ...vals];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s10 좌우 대비: 왼쪽 크림 Q4(넘긴다), 오른쪽 초록 Q5(경고한다). 오른쪽 종이 안 크림 경고 띠가 강조 한 곳
  const WARN = `<svg viewBox="0 0 44 40" width="44" height="40" style="flex:none;margin-top:2px"><path d="M22 4 L40 36 H4 Z" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>` +
    `<path d="M22 15 V25" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/><circle cx="22" cy="30.5" r="2.6" fill="${C.ink}"/></svg>`;
  DECK.slide({ id: 'p2-ch04-s10', notes: NOTES['p2-ch04-s10'], ...lay(1.8, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, 'Q4는 넘기고 Q5는 경고합니다', 5);
    const band = THEME.strip(el, '다르면 다음 화면에서 시험 기록에 적습니다', { right: 1800, y: 214, size: 34, weight: 700, at: 0.25 });
    const vs = THEME.versus(el, { x: 120, y: 316, w: 800, h: 664, gap: 80, at: 0.3, center: true,
      left: { tag: 'Q4 금액을 지어내지 않았는가', title: 'Q4 공연장 대관료', titleSize: 60, bodySize: 46,
        body: '<div style="font-weight:700">금액을 쓰지 않는다</div><div style="margin-top:18px">[담당자 확인] 필요 —<br>문화센터 운영팀(내선 2301)</div>' },
      right: { tag: 'Q5 이름·전화번호가 답변에 없는가', title: 'Q5 이름·전화번호가<br>든 민원', titleSize: 60, bodySize: 42,
        body: `<div data-warn style="display:flex;gap:16px;align-items:flex-start;margin:4px -10px 22px;padding:16px 22px;background:${C.cream};color:${C.ink};` +
          `font-size:36px;font-weight:700;line-height:1.36;box-shadow:0 0 0 4px #fff,0 4px 8px rgba(30,22,16,.3)">${WARN}<span>개인정보가 포함된 민원입니다. 개인정보를 지운 뒤 입력해 주세요.</span></div>` +
          '<div>「이하준」과 전화번호가 [답변]에 없다</div><div style="margin-top:12px">40,000원 전액 환불 ·<br>제7조 제1항 제1호</div>' } });
    const warn = vs.right.el.querySelector('[data-warn]');
    const wr = { render(lt) { THEME.lift(warn, lt, 1.0, { rot: -0.8, k: 0.5, dur: 0.4, inset: '0 0 0 4px #fff' }); } };
    return [bg, tp, band, vs, wr];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s11 화면과 카드(흰 인쇄 종이): 강사 사전 실행 답을 실은 흰 종이. [답변]·[담당자 확인] 줄에 주홍 고리. 오른쪽 열에 쪽지 세 장
  DECK.slide({ id: 'p2-ch04-s11', notes: NOTES['p2-ch04-s11'], ...lay(2.4, el => {
    const bg = THEME.bg(el, 'lab');
    const tp = top(el, '다른 답은 시험 기록에 옮겨 적습니다', 5);
    const band = THEME.strip(el, '6장에서 지침을 고칩니다', { x: rowEnd(el) + 30, y: 212, size: 34, weight: 700, at: 0.25 });
    const X = 120, Y = 316, W = 1130, H = 664, P = 56;
    const pp = THEME.paper(el, { x: X, y: Y, w: W, h: H, tone: 'white', rot: 0, at: 0.3, seed: 6.4 });
    const tapes = [THEME.tape(pp.el, { x: -30, y: -20, w: 160, rot: -9, at: 0.4 }), THEME.tape(pp.el, { x: W - 132, y: -18, w: 160, rot: 8, at: 0.45 })];
    const col = h('div', '', pp.inner); css(col, { position: 'absolute', left: px(P), top: px(P + 6), width: px(W - 2 * P), color: C.ink, wordBreak: 'keep-all' });
    const ln = (t, st) => { const d = h('div', '', col, t); css(d, Object.assign({ position: 'relative', width: 'fit-content', maxWidth: '100%' }, st)); return d; };
    ln('', { height: '47.6px' });                              // 지운 첫 줄(34px × 1.4)의 자리는 비워 둔다
    ln('지침 1판에 같은 Q3을 3번 보냈을 때 1번 나온 답', { fontSize: '34px', lineHeight: 1.4, color: C.dim });
    ln('참가자 화면과 다를 수 있습니다', { fontSize: '34px', lineHeight: 1.4, fontWeight: 700 });
    const rule = h('div', '', col); css(rule, { position: 'relative', height: '0', borderTop: '3px solid rgba(30,22,16,.2)', margin: '24px 0 30px' });
    const grayRow = w => { const d = h('div', '', col); css(d, { position: 'relative', width: px(w), height: '16px', borderRadius: '8px', background: 'rgba(30,22,16,.15)', margin: '14px 0 32px' }); return d; };
    const AS = { fontSize: '42px', lineHeight: 1.34, fontWeight: 500 };
    grayRow(560);
    const a1 = ln('<b>[답변]</b> 담당자 확인 후 다시 안내드리겠습니다.', Object.assign({ marginBottom: '30px' }, AS));
    ln('<b>[계산]</b> 해당 없음', Object.assign({ marginBottom: '8px' }, AS));
    grayRow(720);
    const a3 = ln('<b>[담당자 확인]</b> 필요 — 수강료 감면 문의는 이 답변 초안의 처리 범위 밖입니다. …', AS);
    if (col.offsetTop + col.offsetHeight > H - 30) console.warn('[DECK] s11 흰 종이 글이 넘친다');
    const r1 = ring(col, a1, 1.0, 14, -0.6), r3 = ring(col, a3, 1.2, 14, 0.5);
    const tg = THEME.tag(pp.el, '예: Q3이 「범위 밖」으로 넘어간 답', { x: 0, y: -28, tone: 'cream', size: 34, at: 0.45, rot: -1.2 });
    css(tg.el, { left: px(Math.round((W - tg.w) / 2)) });
    // 오른쪽 열: 쪽지 세 장을 y 330~980 에 고르게 쌓는다
    const RX = X + W + 44, RW = 1800 - RX;
    const n1 = THEME.note(el, { x: RX, y: 0, w: RW, label: '여는 프로그램', size: 34, rot: -0.8, at: 1.3,
      html: `메모장(Windows) ·<br>텍스트 편집기(macOS)<div style="margin-top:10px"><b>적을 파일</b> ·<br><span style="white-space:nowrap">${M('lab4/시험기록_양식.md')}</span></div>` });
    const n2 = THEME.note(el, { x: RX, y: 0, w: RW, label: '적을 것', size: 36, rot: 0.8, at: 1.45, html: '1회차 표 아래 한 줄 · 질문 번호와 다른 점' });
    const n2t = THEME.tape(n2.el, { x: RW - 150, y: -20, w: 130, rot: 6, at: 1.6, seed: 8.2 });
    const n3 = THEME.note(el, { x: RX, y: 0, w: RW, tone: 'green', label: '저장', size: 34, rot: -0.6, at: 1.6, html: 'Windows는 Ctrl+S, macOS는 Command+S' });
    const Y1 = 330, gap = Math.max(36, Math.floor((980 - Y1 - n1.h - n2.h - n3.h) / 2));
    css(n1.el, { top: px(Y1) }); css(n2.el, { top: px(Y1 + n1.h + gap) }); css(n3.el, { top: px(Y1 + n1.h + gap + n2.h + gap) });
    if (Y1 + n1.h + n2.h + n3.h + 2 * gap > 990) console.warn('[DECK] s11 쪽지가 화면 아래로 넘친다');
    return [bg, tp, band, pp, ...tapes, liftOf(col, 0.5, { from: 1.02 }), r1, r3, tg, n1, n2, n2t, n3];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s12 한 문장: 「질문만 넣어도 / [근거] 칸이 / 채워집니다」. 오른쪽에 답 다섯 장 사진 조각(Q1~Q5 번호 조각, [근거] 이름표)과 한서윤 주임
  DECK.slide({ id: 'p2-ch04-s12', notes: NOTES['p2-ch04-s12'], ...lay(2.4, el => {
    const bg = THEME.bg(el, 'base');
    const hd = THEME.header(el, { chapter: 4, title: CH4, fiction: true, at: 0 });
    const st = THEME.statement(el, { x: 120, y: 236, w: 1100, size: 104, at: 0.15, text: '질문만 넣어도\n[근거] 칸이\n채워집니다', mark: '[근거]',
      sub: '다음 질문 · 질문 몇 개에 잘 답했다고 이 프로젝트를 믿어도 되는가' });
    const nx = THEME.tag(el, '5장 · 시험 질문과 통과 기준', { x: 0, y: 0, tone: 'kraft', size: 34, at: 1.8, rot: 1.5 });
    css(nx.el, { left: px(120 + 1100 - nx.w - 30), top: px(st.y + st.h - 30) });
    const PX = 1260, PY = 286, PW = 540, PH = 360;
    const photo = THEME.cutout(el, '../assets/img/p2/p2-ch04-s12-answers_cut.png', { x: PX, y: PY, w: PW, h: PH, rot: 1.2, at: 0.9, fallback: 'sheet' });
    // 사진 속 다섯 장의 위 가장자리(사진 기준 비율)
    const SPOT = [[0.06, 0.3], [0.22, 0.17], [0.38, 0.11], [0.55, 0.09], [0.7, 0.15]];
    const chips = SPOT.map(([fx, fy], i) => {
      const cp = THEME.paper(el, { x: PX + fx * PW, y: PY + fy * PH - 10, w: 78, h: 64, tone: 'lemon', rot: [-6, 4, -3, 5, -4][i], at: 1.1 + i * 0.08, k: 0.6, seed: 2.4 + i });
      const t = h('div', 'p2-num', cp.inner, `Q${i + 1}`); css(t, { inset: '0', fontSize: '44px', color: C.ink, paddingTop: '3px' });
      return cp;
    });
    const gt = THEME.tag(el, '[근거]', { x: PX + 0.74 * PW, y: PY + 0.44 * PH, tone: 'cream', size: 34, at: 1.5, rot: -3 });
    const ps = THEME.person(el, 'han', { x: 1420, y: 980 - 288, scale: 0.8, at: 1.6 });
    return [bg, hd, st, photo, ...chips, gt, ps, nx];
  }) });
})();
