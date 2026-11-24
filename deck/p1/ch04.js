/* 파트 1 · 4장 「일을 맡길 때 정하는 세 항목」 장면 코드. 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다.
 * 원고: plan/slides/p1-ch04.json. 레이아웃 배정: plan/assets/p1_layout_ch04.md. 테마 부품: themes/p1.js. 본보기: p1/ch00.js s08~s27, p1/ch03.js
 * 장마다 레이아웃이 다르다: 영상 제목 → 좌우 대비 → 카드 격자 → 표 → 좌우 대비 → 확인 목록 → 퀴즈 → 한 문장.
 * 키 누름은 s02(오른쪽 칸 「고친 뒤」를 연다)와 s07(퀴즈 정답)에 한 번씩만 둔다. 나머지 장은 키 없이 3~4초 안에 끝 상태가 된다. */
(function () {
  'use strict';
  const { ease, prog, clamp, lerp, css, h, s } = REEL;
  DECK.config({ part: 'p1', chapter: 'ch04', title: '일을 맡길 때 정하는 세 항목' });

  const CH = { chapter: 4, title: '일을 맡길 때 정하는 세 항목' };
  const FIC = Object.assign({ fiction: true }, CH);
  const INK = '#13202C';
  const C30 = Math.cos(Math.PI / 6);
  const rise = THEME.rise;
  const text = THEME.text;
  // 블록 이름표를 44px 로 키운다(보조 줄은 34px)
  const bigTag = (b) => { const t = b.body.querySelector('.p1-tag'); if (t) t.classList.add('is-big'); return b; };
  const svgFull = (el) => {
    const v = s('svg', { width: 1, height: 1 }, el);
    css(v, { position: 'absolute', left: '0px', top: '0px', overflow: 'visible', pointerEvents: 'none' });
    return v;
  };

  // 강사 메모: 원고(plan/slides/p1-ch04.json)의 notes 를 그대로 옮겼다
  const NOTES = {
    "p1-ch04-s01": "3장에서 한서윤 주임은 결과가 달랐던 까닭을 찾았습니다. 모델이 틀린 것이 아니라, 요청에 정해 준 것이 없어서 모델이 근거와 형식을 추측으로 채웠습니다. 그러면 추측하지 않게 하려면 요청에 무엇을 적어야 할까요? 4장에서는 한서윤 주임이 다시 쓴 요청문으로 그 답을 봅니다.",
    "p1-ch04-s02": "한서윤 주임이 2장에서 보낸 요청을 다시 꺼냈습니다. 왼쪽 한 줄 요청에는 근거 자료, 답변 형식, 개인정보 처리가 하나도 적혀 있지 않았고, 모델은 이 셋을 일반 기준과 추측으로 채웠습니다. (키) 오른쪽에 다시 쓴 요청문의 맨 위 한 줄은 모델이 맡을 일로, 새별시설공단 고객지원팀의 민원 답변 초안 작성을 돕는 일이라고 밝힙니다. 그 아래 세 항목에 모델이 추측하던 내용을 미리 적었고, 회색 막대 하나가 본문 한 줄입니다. 본문은 다음 화면부터 한 묶음씩 열어 읽고, 요청문 전체는 5장 실습에서 양식 파일을 열어 직접 채웁니다.",
    "p1-ch04-s03": "한서윤 주임의 요청문은 세 항목으로 되어 있습니다. 항목 1은 목적과 결과물로, 누가 읽는 답변이고 어떤 형식으로 받을지 정합니다. 항목 2는 참고 자료와 제외 범위로, 무엇을 근거로 쓰고 무엇은 답하지 않을지 정합니다. 항목 3은 완료 기준과 승인 조건으로, 어떤 상태면 끝난 것이고 발송 전에 누가 확인하는지 정합니다. 항목 1부터 하나씩 열어 보겠습니다.",
    "p1-ch04-s04": "항목 1에는 이 답변을 누가 읽고 무엇을 알아야 하는지 적습니다. 한서윤 주임은 읽는 사람을 강습을 신청한 민원인으로, 목적을 환불 금액과 계산 방법, 지급 기한을 한 번에 알리는 것으로 적었습니다. 그리고 답변을 민원 요지, 답변, 계산, 근거, 담당자 확인의 다섯 칸으로 나눠 순서를 정했습니다. 2장에서는 실행할 때마다 답의 형식이 달랐는데, 칸을 정해 두면 팀장은 근거 칸을 찾아 조문부터 확인할 수 있습니다. 다음은 그 근거를 어디서 가져올지 정하는 항목 2입니다.",
    "p1-ch04-s05": "2장의 답변은 체육시설법 시행령 같은 일반 법령을 근거로 들었고, 공단 규정은 한 번도 나오지 않았습니다. 요청에 근거 자료를 정해 주지 않았기 때문입니다. 항목 2는 근거를 첨부한 체육시설 이용 규정 파일 하나로 정하고, 파일에 없는 내용은 추측하지 말고 담당자 확인이 필요하다고 쓰게 합니다. 손해 배상, 사고·분쟁, 대관 같은 첨부 규정 밖의 일은 답하지 않는 것으로 적었습니다. 규정에 없는 질문에 실제로 어떻게 답하는지는 5장 실습에서 확인하고, 이어서 항목 3을 보겠습니다.",
    "p1-ch04-s06": "항목 3에는 끝났다고 볼 기준과 확인할 사람을 적습니다. 완료 기준은 금액에 계산식이 있고, 근거 칸의 조문 번호가 첨부한 규정 파일에 실제로 있는 것입니다. 2장의 답변에도 법령 조문 번호가 붙은 경우가 있었지만 공단 규정의 조문이 아니었으므로, 이 기준으로는 끝난 답변이 아닙니다. 개인정보 줄은 2장 답변의 「김가람님」이 다시 나오지 않도록 민원 원문의 이름과 연락처를 답변에 옮기지 않게 합니다. 마지막 줄은 「이 답변은 초안이다. 발송 전에 고객지원팀장이 확인한다.」로 정하는데, 그러면 팀장의 확인은 작업 순서에서 어디에 두어야 할까요?",
    "p1-ch04-s07": "화면 아래 흐름에서 한서윤 주임은 요청문으로 답변 초안을 받은 뒤, 초안을 그대로 보내지 않고 직접 고쳐서 민원인에게 발송합니다. 오민석 팀장의 확인을 ①, ②, ③ 가운데 어디에 둘지, 번호를 부르면 손을 들어 주세요. (키) 답은 ③, 발송 직전으로, ②에서 확인을 받아도 그 뒤에 주임이 고치면 팀장이 본 답변과 민원인이 받는 답변이 달라집니다. 2장의 초안 가운데에는 규정의 7영업일이 아니라 3영업일을 적은 것이 있었고, 발송하면 민원인은 그 기한을 공단의 답으로 받습니다. 그래서 승인은 결과가 기관 밖으로 나가는 행동 바로 앞에서 받습니다.",
    "p1-ch04-s08": "정리하겠습니다. 2장에서 모델이 추측으로 채운 형식, 근거, 이름 처리를 한서윤 주임은 세 항목에 적었고, 발송 직전 팀장 확인도 붙였습니다. 남은 질문은 하나입니다. 세 항목으로 다시 요청하면 결과가 실제로 달라질까요? 5장 실습에서 여러분이 양식을 직접 채워 2장의 답변과 나란히 비교합니다. (강사 확인: 근거 칸 설명의 2장 결과는 강사가 codex로 미리 돌린 6회 결과입니다. ChatGPT 화면에서 같은지는 강의 전날 K-13에서 확인하고, 다르면 「여러분 화면에서는」으로 바꿔 말합니다.)",
  };

  // ── s01 챕터 전환(L0 영상 제목): 전환 영상 p1-tr-stack 을 좌우로 뒤집어 깔고 글자 판은 오른쪽에 둔다(plan/assets/p1_video_map.json) ──
  DECK.slide({
    id: 'p1-ch04-s01', dur: 3,
    notes: NOTES['p1-ch04-s01'],
    setup(el) {
      this.vt = THEME.videoTitle(el, {
        kind: 'chapter', kicker: '파트 1 · 4장', scene: 'stack', flip: true,
        src: '../assets/video/p1/p1-tr-stack.mp4', poster: '../assets/video/p1/p1-tr-stack.jpg',
        title: '일을 맡길 때 정하는 세 항목',
        sub: '추측으로 채우지 않게 하려면 요청에 무엇을 적어야 하는가',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // ── s02 이야기(L3 좌우 대비, 키 한 번): 왼쪽 「고치기 전」 한 줄 요청과 한서윤 주임, 키를 누르면 오른쪽 「고친 뒤」 요청문 카드가 열린다 ──
  // 요청문 카드는 역할 줄 한 줄(34px 두 줄)과 묶음 제목 셋, 본문 줄 대신 회색 막대(8 · 3 · 3줄, labs/lab1/완성본/세항목_요청문_예.md 의 줄 수)
  const S02_R = 2.0;
  DECK.slide({
    id: 'p1-ch04-s02', dur: 3.8, steps: [S02_R],
    notes: NOTES['p1-ch04-s02'],
    setup(el) {
      THEME.header(el, FIC);
      this.t = THEME.title(el, '한 줄 요청을 세 항목으로 고쳐 씁니다', { x: 120, y: 104, size: 64, at: 0.1 });
      const R = S02_R;
      const sp = this.sp = THEME.split(el, { left: { label: '고치기 전' }, right: { label: '고친 뒤', tone: 'cobalt' }, rightAt: R, at: 0.3 });
      // 왼쪽 칸: 요청 카드 → 한서윤 주임 → 대사 카드
      this.req = THEME.card(sp.left, { x: 160, y: 340, w: 760, at: 0.5,
        html: '<div class="p1-mono" style="font-size:44px;line-height:1.3;white-space:nowrap">아래 민원에 답변을 써 줘.</div>' });
      this.hs = THEME.figure(sp.left, '한서윤', { x: 215, y: 880, scale: 2.6, at: 0.8, first: true });
      this.say = THEME.card(sp.left, { x: 396, y: 520, w: 534, at: this.hs.land + 0.2, enter: 'slide', cap: '한서윤 주임', pad: '24px 28px 26px',
        html: '<div style="font-size:40px;line-height:1.4;white-space:nowrap">모델이 추측한 것을 이번에는<br>제가 정해서 적겠습니다.</div>' });
      // 오른쪽 칸: 요청문 카드(키를 누르면 칸이 열리고 카드가 떨어진다)
      this.doc = THEME.card(sp.right, { x: 1040, y: 330, w: 800, at: R + 0.2, pad: '22px 34px 22px' });
      const f = this.doc.face;
      const role = h('div', 'p1-mono', f);
      role.innerHTML = '너는 새별시설공단 고객지원팀의<br>민원 답변 초안 작성을 돕는다.';
      css(role, { fontSize: '34px', lineHeight: '1.3', whiteSpace: 'nowrap', marginBottom: '14px' });
      // 막대 길이는 본문 줄마다 다르게 둔다(글자 대신 줄 수만 보인다)
      const W = [[0.94, 0.82, 0.9, 0.62, 0.88, 0.96, 0.74, 0.5], [0.9, 0.97, 0.58], [0.86, 0.93, 0.66]];
      this.groups = [['[항목 1. 목적과 결과물]', 8], ['[항목 2. 참고 자료와 제외 범위]', 3], ['[항목 3. 완료 기준과 승인 조건]', 3]].map(([t, n], g) => {
        const box = h('div', '', f);
        css(box, { marginTop: g ? '14px' : '0px' });
        const hd = h('div', 'p1-mono', box);
        hd.textContent = t;
        css(hd, { fontSize: '40px', lineHeight: '1.2', fontWeight: '600', marginBottom: '8px', whiteSpace: 'nowrap' });
        for (let k = 0; k < n; k++) {
          const bar = h('div', '', box);
          css(bar, { height: '14px', width: (W[g][k] * 100).toFixed(0) + '%', background: 'var(--line)', marginTop: k ? '7px' : '0px' });
        }
        return box;
      });
    },
    render(lt) {
      this.t.render(lt);
      this.sp.render(lt);
      this.req.render(lt);
      this.hs.render(lt);
      this.say.render(lt);
      this.doc.render(lt);
      this.groups.forEach((g, i) => rise(g, lt, this.doc.land + 0.1 + i * 0.14));
    },
  });

  // ── s03 개념(L11 카드 격자): 한 줄 요청 이름표 아래로 번호 카드 셋이 떨어지고 본문 두 줄이 올라온다 ──
  DECK.slide({
    id: 'p1-ch04-s03', dur: 2.7,
    notes: NOTES['p1-ch04-s03'],
    setup(el) {
      THEME.header(el, FIC);
      this.t = THEME.title(el, '요청문에는 세 항목을 적습니다', { x: 120, y: 104, size: 72, at: 0.1 });
      // 한 줄 요청 이름표(ch00 s26 의 요청 이름표와 같은 모양): 꼬리표 + 고정폭 36px 원문
      this.reqL = text(el, 'p1-dimtext', '한 줄 요청', 120, 209);
      css(this.reqL, { fontSize: '34px', fontWeight: '600', whiteSpace: 'nowrap' });
      this.req = text(el, 'p1-tag p1-mono', '아래 민원에 답변을 써 줘.', 120 + this.reqL.offsetWidth + 22, 200);
      css(this.req, { fontSize: '36px', fontWeight: '500', transformOrigin: '50% 100%' });
      this.tl = [['목적과 결과물', '읽는 사람, 답변 형식'], ['참고 자료와\n제외 범위', '근거 자료, 답하지 않을 것'], ['완료 기준과\n승인 조건', '끝낼 기준, 발송 전 확인']]
        .map(([tt, tx], k) => THEME.tile(el, { x: 120 + k * 580, y: 300, w: 520, h: 490, n: k + 1, title: tt, text: tx, at: 0.7 + k * 0.18, pad: '26px 40px 34px' }));
      // 번호(180px)는 카드 위쪽, 제목(56px)과 설명(40px)은 카드 아래쪽에 붙여 카드 높이를 다 쓴다
      this.tl.forEach(c => {
        const n = c.face.querySelector('.p1-tile-n'), wrap = n && n.parentElement;
        if (!wrap) return;
        css(wrap, { display: 'flex', flexDirection: 'column', height: '100%' });
        css(n, { marginBottom: 'auto', fontSize: '180px' });
        css(c.face.querySelector('.p1-tile-t'), { fontSize: '56px', marginBottom: '14px' });
        css(c.face.querySelector('.p1-tile-x'), { fontSize: '40px', lineHeight: '1.35' });
      });
      this.ln = THEME.lines(el, ['모델이 추측하던 것을', '<span class="p1-em">요청하는 사람</span>이 먼저 정합니다'], { x: 120, y: 836, w: 1680, gap: 0 });
      this.ln.forEach(l => { l.style.fontSize = '46px'; });
    },
    render(lt) {
      this.t.render(lt);
      rise(this.reqL, lt, 0.4, 16);
      THEME.dropEl(this.req, lt, 0.45, 160);
      this.tl.forEach(c => c.render(lt));
      this.ln.forEach((l, i) => rise(l, lt, 1.55 + i * 0.15));
    },
  });

  // ── s04 개념(L12 표): 왼쪽 본문 세 줄(콜론 앞 말은 코발트), 오른쪽 답변 다섯 칸 표 ──
  DECK.slide({
    id: 'p1-ch04-s04', dur: 2.6,
    notes: NOTES['p1-ch04-s04'],
    setup(el) {
      THEME.header(el, FIC);
      this.t = THEME.title(el, '항목 1은 읽는 사람과 형식을 정합니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.ln = THEME.lines(el, [
        '<span class="p1-em">읽는 사람</span>:<br>강습을 신청한 민원인',
        '<span class="p1-em">목적</span>:<br>환불 금액·계산 방법·지급 기한',
        '<span class="p1-em">형식</span>:<br>다섯 칸, 정한 순서대로',
      ], { x: 120, y: 250, w: 580, gap: 80 });
      this.ln.forEach(l => { l.style.fontSize = '46px'; });
      // 위에서 읽으면 답변 칸 순서와 같다. 칸 이름 48px, 적을 내용 44px. 다섯 행이 y 250~950 을 쓴다
      const r = (a, b) => [{ text: a, size: 48 }, { text: b, size: 44 }];
      this.tb = THEME.table(el, [
        r('[민원 요지]', '한 줄'), r('[답변]', '존댓말, 5문장 이내'), r('[계산]', '금액이 있으면 계산식'),
        r('[근거]', '규정 이름과 조문 번호'), r('[담당자 확인]', '필요 또는 불필요, 그 이유'),
      ], { x: 740, y: 250, cols: [360, 700], rowH: 128, gap: 15, at: 1.0, each: 0.1 });
      this.tb.rows.forEach(c => { const m = c.face.querySelector('.p1-tc-m'); if (m) css(m, { fontWeight: '700' }); });
    },
    render(lt) {
      this.t.render(lt);
      this.ln.forEach((l, i) => rise(l, lt, 0.45 + i * 0.2));
      this.tb.render(lt);
    },
  });

  // ── s05 개념(L3 좌우 대비, 키 없음): 왼쪽 「근거로 쓰는 범위」 규정집과 바닥 윤곽, 오른쪽 「답하지 않는 일」 회청 블록 셋 ──
  DECK.slide({
    id: 'p1-ch04-s05', dur: 3.9,
    notes: NOTES['p1-ch04-s05'],
    setup(el) {
      THEME.header(el, FIC);
      this.t = THEME.title(el, '항목 2는 근거와 제외 범위를 정합니다', { x: 120, y: 104, size: 64, at: 0.1 });
      const R = this.R = 1.9;
      const sp = this.sp = THEME.split(el, { left: { label: '근거로 쓰는 범위' }, right: { label: '답하지 않는 일', tone: 'slate' }, rightAt: R, at: 0.3 });
      // 왼쪽 칸. 규정집 둘레 바닥의 등각 사각 윤곽(반변 A). 왼쪽 → 뒤 → 오른쪽 → 앞 모서리 순서로 그어진다
      const B = [600, 685], A = 165;
      const P = (ix, iy) => { const [dx, dy] = THEME.iso(ix, iy); return (B[0] + dx).toFixed(1) + ',' + (B[1] + dy).toFixed(1); };
      this.ring = s('polyline', { points: [P(-A, A), P(-A, -A), P(A, -A), P(A, A), P(-A, A)].join(' '),
        fill: 'none', stroke: INK, 'stroke-width': 1.5, 'stroke-linejoin': 'round' }, svgFull(sp.left));
      this.ringLen = 8 * A;   // 등각 축의 단위 벡터 길이가 1 이라 화면 둘레도 8A 다
      this.ring.style.strokeDasharray = this.ringLen;
      // 윤곽 바깥 왼쪽 뒤: 근거로 쓰지 않는 자료(점선 블록). 떨어지지 않고 윤곽이 그어진다
      this.law = bigTag(THEME.block(sp.left, { x: 285, y: 520, w: 120, d: 120, h: 36, tone: 'ghost', drop: 0, shadow: false, at: 1.3,
        label: '일반 법령·기준', note: '2장 답변의 근거', pin: 20 }));
      this.lawDraw = THEME.ghostDraw(this.law);
      // 규정집 누끼. 이름표는 칸 이름표와 점선 블록 이름표를 피해 오른쪽으로 80px 민다(핀은 규정집 가운데에 남는다)
      this.rules = bigTag(THEME.cutout(sp.left, 'p1-key-rules', { src: '../assets/img/p1/p1-key-rules_cut.png', x: B[0], y: B[1], size: 400, at: 0.5,
        label: '체육시설 이용 규정', note: '첨부 파일', pin: 120 }));
      this.rules.body.querySelector('.p1-tag').style.left = '80px';
      this.l1 = text(sp.left, 'p1-half-line', '<span class="p1-em">근거</span>: 첨부한 체육시설 이용 규정만', 120, 880);
      this.l1.style.fontSize = '40px';
      // 오른쪽 칸. 회청 블록 셋을 등각 축(왼쪽 아래 → 오른쪽 위)을 따라 놓는다. 뒤(오른쪽 위)부터 만들고, 떨어지는 순서는 왼쪽 앞부터
      const pos = [[1160, 700], [1420, 550], [1680, 400]];
      const names = ['손해 배상', '사고·분쟁', '대관'];
      this.out = [2, 1, 0].map(i => bigTag(THEME.block(sp.right, { x: pos[i][0], y: pos[i][1], w: 150, d: 150, h: 50, tone: 'slate', at: R + 0.2 + i * 0.15, label: names[i], pin: 30 })));
      this.l2 = text(sp.right, 'p1-half-line', '<span class="p1-em">규정에 없으면</span>: 담당자 확인 필요', 1040, 800);
      this.l2.style.fontSize = '40px';
      this.card = THEME.card(sp.right, { x: 1040, y: 860, w: 800, at: R + 1.05, enter: 'slide', pad: '20px 32px 22px',
        html: '<div class="p1-mono" style="font-size:34px;line-height:1.35;white-space:nowrap">규정에서 확인되지 않아<br>담당자 확인이 필요합니다</div>' });
    },
    render(lt) {
      const R = this.R;
      this.t.render(lt);
      this.sp.render(lt);
      const rp = prog(lt, this.rules.land + 0.1, 0.4, ease.inOutCubic);
      this.ring.style.strokeDashoffset = (this.ringLen * (1 - rp)).toFixed(1);
      this.ring.style.opacity = rp > 0 ? '1' : '0';
      this.law.render(lt); this.lawDraw(lt, 1.3);
      this.rules.render(lt);
      rise(this.l1, lt, 1.5);
      this.out.forEach(b => b.render(lt));
      rise(this.l2, lt, R + 0.85);
      this.card.render(lt);
    },
  });

  // ── s06 개념(L8 확인 목록): 「답변 초안」 아래 완료 기준 네 줄, 넷째 줄(승인)은 호박 블록과 오민석 팀장 ──
  DECK.slide({
    id: 'p1-ch04-s06', dur: 2.6,
    notes: NOTES['p1-ch04-s06'],
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [1500, 600, 380, 460], props: false, token: false });
      THEME.header(el, FIC);
      this.t = THEME.title(el, '항목 3은 끝낼 기준과 승인을 정합니다', { x: 120, y: 104, size: 64, at: 0.1 });
      // 목록 이름표: 왼쪽에 작은 코발트 판(답변 초안 사물)
      this.dr = THEME.item(el, '답변 초안', { x: 150, y: 222, w: 44, d: 34, at: 0.3, label: false, shadow: false });
      this.cap = text(el, '', '답변 초안', 200, 190);
      css(this.cap, { fontSize: '34px', fontWeight: '600', whiteSpace: 'nowrap' });
      this.cl = THEME.checklist(el, [
        { text: '계산식 있음', note: '완료: 계산식과 규정에 있는 조문 번호' },
        { text: '조문 번호가 규정 파일에 있음' },
        { text: '이름·연락처 없음', note: '개인정보: 이름·연락처를 옮기지 않음' },
        { text: '발송 전 확인', note: '승인: 발송 전에 고객지원팀장 확인', tone: 'amber' },
      ], { x: 120, y: 250, w: 1440, rowH: 175, box: 110, boxH: 44, textX: 240, textSize: 58, noteSize: 38, at: 0.55 });
      // 보조 줄은 항목 이름 아래가 아니라 같은 행 오른쪽 끝에 둔다. 행이 x 360~1560 을 다 쓰게 해 화면 오른쪽 위가 비지 않게 한다
      this.cl.rows.forEach(r => { if (r.note) css(r.note, { gridColumn: '2', gridRow: '1', alignSelf: 'center', textAlign: 'right', marginTop: '0px', whiteSpace: 'nowrap' }); });
      const last = this.cl.rows[3];
      this.mb = THEME.figure(el, '오민석', { x: 1680, y: 880, scale: 2.6, at: last.block.land + 0.1, first: true });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      this.dr.render(lt);
      rise(this.cap, lt, 0.35, 16);
      this.cl.render(lt);
      this.mb.render(lt);
    },
  });

  // ── s07 퀴즈(L13, 키 한 번): 일의 순서 블록 다섯과 그 사이 점선 자리 ①②③. 키를 누르면 ③ 자리에 호박 블록이 떨어지고 서류 토큰이 지나간다 ──
  // 블록 줄: 바닥 y 785, x 300~1620(블록 사이 330, 블록 170×170). 점선 자리는 블록 사이 틈 뒤(y 665)에 두어 블록과 겹치지 않게 한다.
  // 서류 토큰은 블록 앞(F, y 925)과 블록 사이 틈(M, y 830)을 번갈아 지나며 틈마다 점선 자리 바로 앞을 거친다. 결론 줄(y 972)보다 위에 머문다
  const S07_R = 2.3;
  const QZ = { x0: 300, dx: 330, y: 785, gy: 665, f: 140 };
  QZ.a = QZ.dx / (2 * C30);
  DECK.slide({
    id: 'p1-ch04-s07', dur: 5.4, steps: [S07_R],
    notes: NOTES['p1-ch04-s07'],
    setup(el) {
      const R = S07_R;
      this.bg = THEME.bg(el, 'base', { floor: [160, 500, 1600, 520], props: false, token: false });
      THEME.header(el, FIC);
      this.t = THEME.title(el, '팀장 확인은 어디에 둘까요?', { x: 120, y: 104, size: 72, at: 0.1 });
      // 보기 세 줄 48px(이 장의 물음 내용)
      this.opts = ['① 요청문을 쓰기 전', '② 초안을 받은 직후(고치기 전)', '③ 민원인에게 발송하기 직전'].map((t, i) => {
        const o = text(el, 't-body', t, 120, 204 + i * 70);
        css(o, { fontSize: '48px', fontWeight: '600', lineHeight: '1.35', whiteSpace: 'nowrap' });
        return o;
      });
      // 점선 자리 셋(뒤쪽 줄). 블록보다 먼저 만든다
      const gx = [0, 2, 3].map(k => QZ.x0 + (k + 0.5) * QZ.dx);
      this.slots = gx.map((x, i) => {
        const b = THEME.block(el, { x, y: QZ.gy, w: 90, d: 90, h: 30, tone: 'ghost', drop: 0, shadow: false, at: 1.5 + i * 0.1 });
        return { b, draw: THEME.ghostDraw(b), at: 1.5 + i * 0.1 };
      });
      // 정답: ③ 자리에 호박 기둥(바닥 90×90, 높이 280)과 56px 이름표. 블록 줄보다 높이 솟아 정답 자리가 한눈에 보인다
      this.amb = THEME.block(el, { x: gx[2], y: QZ.gy, w: 90, d: 90, h: 280, tone: 'amber', at: R + 0.05, label: '팀장 확인', labelTone: 'amber', pin: 40 });
      this.amb.body.querySelector('.p1-tag').classList.add('is-answer');
      // 자리 번호: 점선 자리 가운데에 쓴다. ③ 은 호박 블록이 앉은 뒤 그 앞 모서리 위에 그대로 남는다
      this.nums = ['①', '②', '③'].map((t, i) => {
        const d = text(el, '', t, gx[i], QZ.gy);
        css(d, { font: '700 44px/1.2 var(--body)', color: INK, transform: 'translate(-50%, -50%)', whiteSpace: 'nowrap' });
        return d;
      });
      // 순서 블록 다섯(앞쪽 줄). 테마 sequence 가 붙이는 1~5 번호는 원고에 없는 글자이고 ①②③과 헷갈리므로 뗀다
      this.sq = THEME.sequence(el, [
        { label: '민원 글' }, { label: '요청문' }, { label: '답변 초안', tone: 'cobalt' },
        { label: '고친 답변', note: '한서윤 주임이 초안을 고침' }, { label: '발송', note: '민원인에게', tone: 'slate' },
      ], { x0: QZ.x0, x1: QZ.x0 + 4 * QZ.dx, y: QZ.y, size: 170, h: 70, at: 0.7, each: 0.15, token: false, pin: 80 });
      this.sq.blocks.forEach(b => { const n = b.body.querySelector('.p1-seq-no'); if (n) n.remove(); });
      // 「고친 답변」 보조 줄은 이웃 이름표와 겹치지 않게 두 줄로 접는다(문구는 그대로)
      const sm = this.sq.blocks[3].body.querySelector('.p1-tag small');
      if (sm) css(sm, { whiteSpace: 'normal', width: '230px', wordBreak: 'keep-all' });
      // 「고친 답변」 이름표는 왼쪽으로, 「발송」 이름표는 오른쪽으로 밀어 그 사이 호박 블록(③ 자리)이 가리지 않게 한다. 핀은 블록 가운데에 남는다
      this.sq.blocks[3].body.querySelector('.p1-tag').style.left = '-80px';
      this.sq.blocks[4].body.querySelector('.p1-tag').style.left = '28px';
      // 서류 토큰: 블록 앞 F_k 와 블록 사이 틈 M_k 를 번갈아 지난다. 「고친 답변」과 「발송」 사이 틈(M3, 호박 기둥 앞)에서 0.4초 멈춘다
      const { a, f } = QZ, path = [];
      for (let k = 0; k < 5; k++) { path.push([k * a + f, -k * a + f]); if (k < 4) path.push([k * a + f, -(k + 1) * a + f]); }
      this.fl = THEME.flow(el, path, { x: QZ.x0, y: QZ.y, at: R + 0.55, speed: 1300, hold: { 7: 0.4 }, line: false });
      this.ans = text(el, 't-body', '승인은 결과가 기관 밖으로 나가기 직전에 받습니다', 120, 972);
      css(this.ans, { fontSize: '44px', fontWeight: '600', lineHeight: '1.3', whiteSpace: 'nowrap' });
    },
    render(lt, ctx) {
      const R = S07_R;
      this.bg.render(lt, ctx);
      this.t.render(lt);
      const q = prog(lt, R + 0.4, 0.4, ease.outQuad);   // 정답이 열리면 보기 ①② 와 그 자리는 옅어진다
      const dimK = lerp(1, 0.35, q);
      this.opts.forEach((o, i) => { rise(o, lt, 0.35 + i * 0.12); if (i < 2) o.style.opacity = (parseFloat(o.style.opacity) * dimK).toFixed(3); });
      this.slots.forEach((sl, i) => { sl.b.render(lt); sl.draw(lt, sl.at); sl.b.el.style.opacity = i < 2 ? dimK.toFixed(3) : '1'; });
      this.amb.render(lt);
      this.nums.forEach((n, i) => {
        const p = prog(lt, this.slots[i].at + 0.2, 0.35, ease.snap);
        n.style.opacity = (p * (i < 2 ? dimK : 1)).toFixed(3);
        n.style.transform = `translate(-50%, -50%) translateY(${((1 - p) * 16).toFixed(1)}px)`;
      });
      this.sq.render(lt);
      this.fl.render(lt);
      rise(this.ans, lt, R + 0.9);
    },
  });

  // ── s08 정리(L1 한 문장): 120px 두 줄 문장, 보조 줄(호박 블록 + 발송 전 팀장 확인), 근거 칸 셋, 다음 질문 카드 ──
  DECK.slide({
    id: 'p1-ch04-s08', dur: 3.5,
    notes: NOTES['p1-ch04-s08'],
    setup(el) {
      this.bg = THEME.bg(el, 'accent', { floor: false, bx: 1880, by: 1180 });
      THEME.header(el, FIC);
      this.st = THEME.statement(el, '모델이 추측하던 것을\n요청문에 적었습니다', {
        em: ['요청문에'], size: 120, at: 0.1,
        sub: '발송 전 팀장 확인',
        facts: [
          { label: '항목 1 · 다섯 칸', text: '형식이 매번 다름' },
          { label: '항목 2 · 첨부 규정만', text: '근거가 일반 법령' },
          { label: '항목 3 · 이름·연락처 제외', text: '이름을 그대로 옮김' },
        ],
      });
      // statement 는 문장·보조 줄·근거 칸 전체의 가운데를 cy 에 맞춘다. 근거 칸 윗선이 y 625 에 오도록 묶음 전체의 위치를 다시 정한다
      const root = this.st.el, facts = root.querySelector('.p1-stmt-facts'), sub = root.querySelector('.p1-stmt-sub');
      facts.style.marginTop = '84px';   // 근거 칸 위 머리말 한 줄 자리(머리말은 지웠고 자리는 비워 둔다)
      // 근거 칸: 칸 제목 50px, 설명 40px. 칸 폭을 글 길이에 맞추고 1680 폭 안에 양 끝을 맞춰 칸 제목이 한 줄에 들게 한다
      css(facts, { gridTemplateColumns: 'repeat(3, max-content)', justifyContent: 'space-between', columnGap: '56px' });
      facts.querySelectorAll('.p1-stmt-fact-l').forEach(d => css(d, { fontSize: '50px', whiteSpace: 'nowrap' }));
      facts.querySelectorAll('.p1-stmt-fact-t').forEach(d => css(d, { fontSize: '40px', marginTop: '10px' }));
      sub.style.fontSize = '46px';
      const top = 610 - facts.offsetTop;
      root.style.top = top + 'px';
      // 보조 줄 앞에 호박 작은 블록
      sub.style.paddingLeft = '92px';
      const sy = top + sub.offsetTop + sub.offsetHeight / 2;
      this.subAt = this.st.title.end - 0.1;
      this.amb = THEME.block(el, { x: 160, y: sy + 16, w: 40, d: 40, h: 28, tone: 'amber', at: this.subAt - 0.1, drop: 160 });
      const cy = 610 + facts.offsetHeight + 36;
      this.cd = THEME.card(el, { x: 120, y: cy, w: 1200, at: this.st.end - 0.2, enter: 'drop', cap: '다음 질문', pad: '22px 34px 24px',
        html: '<div class="p1-dimtext" style="font-size:34px;line-height:1.35">5장 실습: 세 항목으로 다시 요청하기</div>' +
          '<div style="font-size:44px;line-height:1.35;font-weight:600;margin-top:4px;white-space:nowrap">세 항목으로 다시 요청하면 결과가 실제로 달라지는가</div>' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.st.render(lt);
      this.amb.render(lt);
      this.cd.render(lt);
    },
  });
})();
