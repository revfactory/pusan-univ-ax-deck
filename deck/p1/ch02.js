/* 파트 1 · 2장 「실습: 한 줄 요청으로 민원 답변 받아 보기」 장면 코드. 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다.
 * 원고: plan/slides/p1-ch02.json. 레이아웃 배정: plan/assets/p1_layout_ch02.md. 테마 부품: themes/p1.js. 본보기: p1/ch00.js s08~s27
 * 장마다 레이아웃이 다르다: 영상 제목 → 사례 장면 → 좌우 대비 → 카드 격자 → 요청문 크게 → 화면 크게 → 표 → 확인 목록 → 한 문장 → 인물과 대사.
 * 키 누름은 s06(결과 목록을 연다) 한 번뿐이다. 나머지 장은 키 없이 3~4초 안에 끝 상태가 된다. */
(function () {
  'use strict';
  const { ease, prog, clamp, lerp, css, h, s } = REEL;
  DECK.config({ part: 'p1', chapter: 'ch02', title: '실습: 한 줄 요청으로 민원 답변 받아 보기' });
  const CH = { chapter: 2, title: '실습: 한 줄 요청으로 민원 답변 받아 보기', fiction: true };
  const I = THEME.iso, rise = THEME.rise, text = THEME.text;
  const ACC = '#2A55E5', INK = '#13202C', EDGE = 'rgba(19,32,44,.35)';
  // 강사 메모: 원고의 notes 를 그대로 옮겼다
  const NOTES = {
    s01: "2장은 여러분이 처음으로 직접 입력하는 실습입니다. 1장에서 오민석 팀장이 민원 답변 초안 작성 시간을 줄일 방법을 2주 뒤에 보고하라고 했습니다. 한서윤 주임이 가장 먼저 해 본 일은 ChatGPT에 한 줄로 부탁하는 것이었습니다. 여러분도 같은 요청을 넣어 보고 어떤 답이 나오는지 함께 보겠습니다.",
    s02: "1장 끝에서 본 한 줄 요청에 들어간 민원은 이런 내용입니다. 수영 초급반 수강료 60,000원을 내고 12회 가운데 4회를 들은 민원인이, 그만두면 얼마를 언제 돌려받는지 묻습니다. 공단 규정에 환불 기준이 있지만 한서윤 주임은 규정 파일을 붙이지 않고 「아래 민원에 답변을 써 줘.」 한 줄만 적었습니다. 여러분도 이 요청을 그대로 넣어 봅니다.",
    s03: "오늘 모든 실습에서는 실습 묶음의 가상 자료만 입력하고, 기관 내부 문서, 실제 민원, 실제 개인정보는 넣지 않습니다. 요청 A의 김가람이라는 이름과 가운데 자리가 0000인 전화번호도 가상 정보입니다.",
    s03b: "요청 A를 보내기 전에 README.md 실습 규칙 2번대로, 화면의 ①② 순서를 따라 「모델 개선을 위한 데이터 학습 허용」을 함께 끕니다. 끄면 대화가 모델 학습에 쓰이지 않지만, 끈 뒤 시작한 새 대화부터 적용되고 좋아요·싫어요 같은 피드백을 보낸 대화는 학습에 쓰일 수 있습니다. 그래서 1단계는 새 대화에서 하고 피드백은 누르지 않으며, 끌지 말지는 각자 정하시고 왜 끄는지는 6장에서 다시 봅니다. (강사 확인: 메뉴 이름은 강의 전날 K-01에서 실제 화면으로 확인하고, 다르면 화면에 나온 이름으로 말합니다.) (화면에서 지운 기준 시점: 「2026년 11월 기준」)",
    s03a: "먼저 단계.md 「파일 다루기」의 안내대로 붙여 넣을 글을 복사하니, 1장에서 열어 둔 단계.md 창으로 돌아갑니다. 창을 닫았다면 lab1 폴더의 단계.md를 오른쪽 클릭하고 「연결 프로그램」에서 메모장(Mac은 텍스트 편집기)을 고릅니다. 「아래 민원에 답변을 써 줘.」 앞을 클릭하고 Shift를 누른 채 「알려 주세요.」 끝을 클릭하면 열한 줄이 선택됩니다. Ctrl+A는 요청 B와 C까지 고르므로 쓰지 않고, 위아래의 ``` 표시 줄도 넣지 않습니다. Ctrl+C(Mac은 ⌘+C)로 복사했으면 다음 화면으로 넘어가고, 파일이 열리지 않으면 손을 들어 주세요.",
    s04: "ChatGPT에서 새 대화를 열고, 입력창 오른쪽의 「추론 수준」을 눌러 ① Instant로 맞춥니다. 이어서 ② 복사한 요청 A를 Ctrl+V로 붙여 넣어 보냅니다(Mac은 ⌘+V). Instant는 빠르게 답하는 수준이라 실습 시간 안에 답을 받기 좋습니다. 오류 문구가 나오거나 답이 없으면 ③ 「다시 생성」을 한 번 누르고, 「생성 중…」에서 멈추면 「생성 중지」 뒤 「다시 생성」을 누릅니다. 「추론 수준」이 보이지 않으면 제 화면을 따라 하시면 됩니다. 답이 다 나오면 손을 들어 알려 주세요. (강사 확인: 「다시 생성」과 「생성 중지」는 공식 도움말 한국어판의 표기입니다(F-09b). 입력창의 「추론 수준」과 Instant는 2026-11-27 강사 계정 화면에서 확인했습니다. 단추 이름과 위치가 다르면 화면대로 말합니다.)",
    s06: "왼쪽 카드의 공단 규정(가상)이 오늘 견줄 기준이고, 제8조 제2항에 따라 지급 기한은 신청일부터 7영업일입니다. 환불 금액은 제7조 제1항 제2호로 계산해 남은 8회분 40,000원에서 위약금 6,000원을 뺀 34,000원입니다. (키) 강사가 강의 전에 codex CLI로 같은 요청을 여섯 번 보냈더니(웹 검색 사용 4회, 미사용 2회) 금액은 모두 34,000원이었습니다. 그러나 근거는 한 번도 공단 규정이 아닌 일반 법령·기준이었고, 지급 기한은 3영업일이거나 빠졌으며(3영업일은 체육시설법 시행령 제21조의3이 체육시설업자에게 정한 일반 기준이라 틀린 답이 아니고, 공단 규정을 받지 못해 일반 법령으로 답한 것입니다. 공단 규정의 7영업일은 실습을 위해 정한 가상 값입니다), 이름은 모두 「김가람님」으로 옮겼습니다. 여러분 화면은 다를 수 있지만 금액보다 그대로 보낼 수 있는지를 보고, 5장에서 이 규정을 ChatGPT에 직접 줍니다. (강사 확인: 네 줄의 결과와 수치는 codex CLI(gpt-6-sol, 생각 수준 medium)로 2026-11-23에 돌린 결과입니다. 강의 전날 K-13에서 ChatGPT 새 대화 세 개로 다시 돌려 네 줄의 문구를 확정합니다. 금액까지 달라졌으면 금액 줄을 「사람마다 다름」으로 바꿔 말합니다. 조문 번호가 붙은 세 번은 모두 체육시설법 시행령 제21조의3이었고, 이 조문의 「반환사유가 발생한 날부터 3영업일 이내」 문구는 2026-11-27에 국가법령정보센터에서 확인했습니다.)",
    s07: "방금 받은 답변이 있는 대화는 지우지 말고 그대로 둡니다. 5장에서 공단 규정 파일을 붙여 세 항목으로 다시 요청한 뒤, 이 답변과 나란히 놓고 비교표 1열 5줄과 2열을 채웁니다. 대화를 지웠다면 5장에서 lab1/완성본/요청A_결과예.md를 대신 씁니다. 이제 이 결과가 한서윤 주임에게는 어떻게 돌아왔는지 보겠습니다.",
    s08: "한서윤 주임이 올린 초안을 오민석 팀장이 세 가지 이유로 반려했습니다. 근거가 공단 규정이 아니고, 여러분이 견줘 본 대로 다시 넣으면 근거와 기한이 달라지며, 이름과 전화번호를 그대로 넣었다는 것입니다. 세 번째에서 한서윤 주임이 넣은 것은 사례 속 실제 민원인의 정보이고, 여러분이 넣은 김가람과 0000 번호는 가상 정보입니다. 그러면 같은 모델에 같은 요청을 넣었는데 왜 결과가 서로 달랐을까요? 3장에서 그 원인을 찾습니다.",
  };

  const div = (parent, cls, html, st) => { const e = h('div', cls, parent, html); if (st) css(e, st); return e; };
  // 무대 좌표(1920×1080)에 놓는 svg
  const svgFull = (el) => { const v = s('svg', { width: 1, height: 1 }, el); css(v, { position: 'absolute', left: '0px', top: '0px', overflow: 'visible', pointerEvents: 'none' }); return v; };
  // 조상까지의 배치 좌표(변환과 무관한 offset 값)
  const rel = (e, anc) => { let x = 0, y = 0; for (let n = e; n && n !== anc; n = n.offsetParent) { x += n.offsetLeft; y += n.offsetTop; } return [x, y]; };
  // 블록 이름표 글자 크기: 44px 는 테마의 is-big, 그 밖의 크기는 직접 준다
  const tagPx = (b, px) => { const t = b.body.querySelector('.p1-tag'); if (t) { if (px === 44) t.classList.add('is-big'); else t.style.fontSize = px + 'px'; } return b; };
  // 단계 이름표(흰 이름표 34px, 단계 번호만 코발트). 위에서 떨어져 내려앉는다
  const stepTag = (el, html, x, y) => { const t = text(el, 'p1-tag', html, x, y); css(t, { fontSize: '34px', transformOrigin: '50% 100%' }); return t; };
  const STEP = (a, b) => `${a} · <b style="color:var(--accent);font-weight:700">${b}</b>/3`;
  // 사각 표시(폴리곤). dash 면 점선. 그리는 함수 (lt, at, dur) 를 함께 돌려준다
  const rectMark = (sv, x, y, w, hh, o = {}) => {
    const a = { points: `${x.toFixed(1)},${y.toFixed(1)} ${(x + w).toFixed(1)},${y.toFixed(1)} ${(x + w).toFixed(1)},${(y + hh).toFixed(1)} ${x.toFixed(1)},${(y + hh).toFixed(1)}`,
      fill: 'none', stroke: o.stroke || (o.dash ? '#4B5A68' : ACC), 'stroke-width': o.sw || (o.dash ? 3 : 5), 'stroke-linejoin': 'miter' };
    if (o.dash) a['stroke-dasharray'] = '6 5';
    const p = s('polygon', a, sv);
    if (o.dash) return THEME.dashDraw([p]);
    const L = 2 * (w + hh);
    return (lt, at, dur = 0.35) => {
      const q = prog(lt, at, dur, ease.inOutCubic);
      p.style.strokeDasharray = L.toFixed(1);
      p.style.strokeDashoffset = (L * (1 - q)).toFixed(1);
      p.style.opacity = q > 0 ? '1' : '0';
    };
  };
  // 짚는 선(코발트 3px)과 끝점. (x1, y1) 에서 (x2, y2) 로 그어진다
  const leader = (sv, x1, y1, x2, y2) => {
    const ln = s('line', { x1, y1, x2: x1, y2: y1, stroke: ACC, 'stroke-width': 3, 'stroke-linecap': 'round' }, sv);
    const dot = s('circle', { cx: x2, cy: y2, r: 6, fill: ACC }, sv);
    return (lt, at, dur = 0.25) => {
      const q = prog(lt, at, dur, ease.inOutCubic);
      ln.setAttribute('x2', lerp(x1, x2, q).toFixed(1)); ln.setAttribute('y2', lerp(y1, y2, q).toFixed(1));
      ln.style.opacity = lt < at ? '0' : '1';
      dot.style.opacity = q >= 1 ? '1' : '0';
    };
  };
  // 이름표가 옆에서 붙는다(dx 만큼 밀려 있다가 제자리로)
  const tagIn = (e, lt, at, dx = -16, dy = 0) => {
    const p = prog(lt, at, 0.3, ease.snap);
    e.style.opacity = p.toFixed(3);
    e.style.transform = `translate(${((1 - p) * dx).toFixed(1)}px, ${((1 - p) * dy).toFixed(1)}px)`;
  };
  // 파일 이름은 / 뒤에서만 줄을 바꾼다
  const MONO = t => t.split(/(?<=\/)/).map(p => `<span class="p1-mono" style="white-space:nowrap">${p}</span>`).join('<wbr>');

  const REQ_A = ['아래 민원에 답변을 써 줘.', '', '[누리집 민원 게시판]', '작성자: 김가람', '연락처: 010-0000-1234', '제목: 수영 강습 환불 요청', '',
    '11월 수영 초급반(월·수·금 오전 7시)을 등록했고 수강료 60,000원을 계좌이체로 냈습니다.',
    '11월 강습 12회 가운데 지금까지 4회가 진행되었고 4회 모두 나갔습니다.',
    '회사 근무 시간이 바뀌어 오늘 그만두려고 합니다.',
    '환불이 얼마나 되는지, 언제 들어오는지 알려 주세요.'];

  // ── s01 챕터 전환(L0 영상 제목): 파트 1 인트로 영상을 좌우로 뒤집어 깔고 글자 판은 오른쪽 ──
  DECK.slide({
    id: 'p1-ch02-s01', dur: 3.2, notes: NOTES.s01,
    setup(el) {
      this.vt = THEME.videoTitle(el, {
        kind: 'chapter', kicker: '파트 1 · 2장', scene: 'intro', flip: true,
        src: '../assets/video/p1/p1-intro.mp4', poster: '../assets/video/p1/p1-intro.jpg', fitBg: '#D7E0DF',   // 영상 바탕색에 맞춘다(FIT 표의 intro 바탕과 다르다)
        title: '실습: 한 줄 요청으로\n민원 답변 받아 보기',
        sub: '한서윤 주임이 ChatGPT에 민원 답변을 한 줄로 요청하면 어떤 결과가 나오는가',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // ── s02 이야기(L10 사례 장면): 민원 창구 앞에서 민원 글이 ChatGPT 블록 앞까지 가고, 규정집 자리는 점선으로 비어 있다 ──
  DECK.slide({
    id: 'p1-ch02-s02', dur: 3.7, notes: NOTES.s02,
    setup(el) {
      // ChatGPT 블록, 한서윤 주임, 민원 글의 바닥 가운데. 민원 글은 한서윤 주임 이름표(x 760~1040)와 ChatGPT 블록(x 1242~1658) 사이에 둔다
      const G = [1450, 800], H = [900, 740], M = [1160, 845];
      this.bg = THEME.bg(el, 'base', { floor: [760, 300, 1100, 720], props: false, token: false, origin: G });
      THEME.header(el, CH);
      this.t = THEME.title(el, '규정집 없이\n한 줄로 요청합니다', { x: 120, y: 190, size: 72, w: 640, at: 0.1 });
      this.body = THEME.lines(el, ['수강료 <b style="font-weight:700">60,000원</b>,<br>12회 가운데 <b style="font-weight:700">4회</b> 수강', '환불 금액과 지급 시기를 묻는 민원'], { x: 120, y: 400, w: 600, gap: 16 });
      const things = h('div', 'full', el);   // 사물 층을 먼저 깔고, 그 앞을 지나는 서류 토큰을 위에 둔다
      // 민원 글 토큰: 민원 글에서 등각 축(오른쪽 아래 → 오른쪽 위)을 따라 ChatGPT 블록 앞까지 가서 멈춘다
      this.fl = THEME.flow(el, [[-60, 0], [122, 0], [122, -43]], { x: M[0], y: M[1], at: 1.45, speed: 300 });
      // 뒤(위쪽)에 있는 것부터 만든다. 0.14초 간격으로 떨어진다
      this.ct = THEME.cutout(things, 'p1-key-counter', { src: '../assets/img/p1/p1-key-counter_cut.png', x: 1420, y: 450, size: 400, at: 0.15 });
      // 규정집 자리: ChatGPT 블록 오른쪽 뒤. 점선을 조금 진하게 해 빈자리가 보이게 한다
      const [gx, gy] = I(-30, -330);
      this.gh = tagPx(THEME.block(things, { x: G[0] + gx, y: G[1] + gy, w: 150, d: 120, h: 90, tone: 'ghost', shadow: false, drop: 0, at: 2.35, label: '규정집', pin: 30 }), 40);
      this.gh.body.querySelectorAll('polygon[stroke-dasharray]').forEach(p => { p.setAttribute('stroke', '#4B5A68'); p.setAttribute('stroke-width', '2.2'); });
      this.ghD = THEME.ghostDraw(this.gh);
      this.hs = THEME.figure(things, '한서윤', { x: H[0], y: H[1], at: 0.29, first: true, scale: 2.2, big: true });
      this.gpt = tagPx(THEME.block(things, { x: G[0], y: G[1], w: 240, d: 240, h: 130, tone: 'cobalt', at: 0.43, label: 'ChatGPT', pin: 40 }), 44);
      this.mw = tagPx(THEME.item(things, '민원 글', { x: M[0], y: M[1], at: 0.57, pin: 34 }), 40);
      // 요청 카드: 한서윤 주임 위. 고정폭 44px 한 줄이 들어가도록 폭을 잰다
      this.cd = THEME.card(el, { x: 800, y: 250, w: 640, at: 1.0, pad: '22px 30px 24px', html: '<div class="p1-mono" style="font-size:44px;line-height:1.3;white-space:nowrap">아래 민원에 답변을 써 줘.</div>' });
      const need = this.cd.face.firstChild.firstChild.scrollWidth + 60 + 3;
      if (need > 640) this.cd.el.style.width = Math.ceil(need) + 'px';
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      this.body.forEach((b, i) => rise(b, lt, 0.8 + i * 0.15));
      [this.ct, this.hs, this.gpt, this.mw].forEach(b => b.render(lt));
      this.gh.render(lt); this.ghD(lt, 2.35, 0.6);
      this.fl.render(lt);
      this.cd.render(lt);
    },
  });

  // ── s03 개념(L3 좌우 대비): 왼쪽 「입력합니다」 실습 묶음, 0.8초 뒤 오른쪽 「넣지 않습니다」 칸이 열리며 회청 블록 셋 ──
  DECK.slide({
    id: 'p1-ch02-s03', dur: 3.3, notes: NOTES.s03,
    setup(el) {
      THEME.header(el, CH);
      this.t = THEME.title(el, '실습 묶음의 가상 자료만 입력합니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.rule = stepTag(el, '실습 규칙 1', 1560, 116);
      const R = 1.3;
      const sp = this.sp = THEME.split(el, { left: { label: '입력합니다' }, right: { label: '넣지 않습니다', tone: 'slate' }, rightAt: R, at: 0.3 });
      this.labs = tagPx(THEME.block(sp.left, { x: 520, y: 680, w: 300, d: 300, h: 90, layers: 3, at: 0.55, label: '실습 묶음 labs/', pin: 46 }), 44);
      this.labs.body.querySelector('.p1-tag > span').innerHTML = '실습 묶음 <span class="p1-mono">labs/</span>';
      this.l1 = text(sp.left, '', '요청 A의 이름과 번호는 가상입니다', 120, 890);
      css(this.l1, { font: '600 40px/1.3 var(--body)', color: 'var(--ink)', whiteSpace: 'nowrap' });
      // 회청 블록 셋: 등각 축(오른쪽 위)을 따라 앞에서 뒤로. 이름표 44px 가 옆 블록에 닿지 않게 블록 사이를 315 로 벌렸다
      const F = [1140, 762], STEPB = 315;
      const names = ['기관 내부 문서', '실제 민원', '실제 개인정보'];
      this.sl = [2, 1, 0].map(k => {   // 뒤(오른쪽 위)부터 만든다
        const [dx, dy] = I(0, -STEPB * k);
        return tagPx(THEME.block(sp.right, { x: F[0] + dx, y: F[1] + dy, w: 130, d: 130, h: 80, tone: 'slate', at: R + 0.25 + k * 0.15, label: names[k], pin: 40 }), 44);
      });
      this.r1 = text(sp.right, '', '소속 기관 문서, 실제 민원은 넣지 않습니다', 1040, 870);
      this.r2 = text(sp.right, '', '실제 개인정보도 넣지 않습니다', 1040, 925);
      [this.r1, this.r2].forEach(e => css(e, { font: '400 40px/1.3 var(--body)', color: 'var(--ink)', whiteSpace: 'nowrap' }));
      this.R = R;
    },
    render(lt) {
      const R = this.R;
      this.t.render(lt);
      THEME.dropEl(this.rule, lt, 0.2, 120);
      this.sp.render(lt);
      this.labs.render(lt);
      rise(this.l1, lt, 1.0);
      this.sl.forEach(b => b.render(lt));
      rise(this.r1, lt, R + 1.0);
      rise(this.r2, lt, R + 1.15);
    },
  });

  // ── s03b 개념(L11 카드 격자): 학습 설정을 끄는 순서 카드 둘. ② 카드의 스위치가 켜짐에서 꺼짐으로 바뀐다 ──
  DECK.slide({
    id: 'p1-ch02-s03b', dur: 2.8, notes: NOTES.s03b,
    setup(el) {
      this.bg = THEME.bg(el, 'lab', { floor: false });
      THEME.header(el, CH);
      this.t = THEME.title(el, '시작 전에: 학습 설정 끄기', { x: 120, y: 104, size: 72, at: 0.1 });
      // 카드 두 장이 y 250~860 을 쓴다. 번호 128px, 문구 52px
      this.tl = [['①', '계정 메뉴(프로필 아이콘)\n→ 설정'], ['②', '데이터 관리 → 「모델 개선을 위한\n데이터 학습 허용」 끄기']]
        .map(([n, tt], k) => THEME.tile(el, { x: 120 + k * 860, y: 250, w: 800, h: 610, n, title: tt, at: 0.55 + k * 0.18, pad: '40px 44px' }));
      const t2 = this.tl[1].face.querySelector('.p1-tile-t');
      t2.innerHTML = t2.innerHTML.replace('끄기', '<span style="color:var(--accent)">끄기</span>');   // 「끄기」만 코발트
      this.tl.forEach(c => {
        css(c.face.querySelector('.p1-tile-n'), { fontSize: '128px' });
        css(c.face.querySelector('.p1-tile-t'), { position: 'absolute', left: '44px', right: '44px', bottom: '48px', margin: '0', fontSize: '52px', lineHeight: '1.25' });
      });
      // 카드 오른쪽 위 그림(글자 없음): ① 프로필 아이콘, ② 켜짐 → 꺼짐 스위치. 처음 크기의 두 배
      const ic = s('svg', { width: 340, height: 340, viewBox: '-60 -60 120 120' }, this.tl[0].face);
      css(ic, { position: 'absolute', right: '56px', top: '44px', overflow: 'visible' });
      const clip = s('clipPath', { id: 'p1c02-pf' }, s('defs', {}, ic));
      s('circle', { cx: 0, cy: 0, r: 52 }, clip);
      s('circle', { cx: 0, cy: 0, r: 52, fill: '#FFFFFF', stroke: INK, 'stroke-width': 3 }, ic);
      const pg = s('g', { 'clip-path': 'url(#p1c02-pf)' }, ic);
      s('circle', { cx: 0, cy: -12, r: 18, fill: '#D3D9E0', stroke: INK, 'stroke-width': 3 }, pg);
      s('path', { d: 'M -38 52 Q -38 14 0 14 Q 38 14 38 52 Z', fill: '#D3D9E0', stroke: INK, 'stroke-width': 3 }, pg);
      const sw = s('svg', { width: 500, height: 264, viewBox: '0 0 170 90' }, this.tl[1].face);
      css(sw, { position: 'absolute', right: '56px', top: '84px', overflow: 'visible' });
      this.swBg = s('rect', { x: 2, y: 2, width: 166, height: 86, rx: 43, fill: ACC, stroke: '#1E40B8', 'stroke-width': 3 }, sw);
      this.swK = s('circle', { cx: 125, cy: 45, r: 33, fill: '#FFFFFF', stroke: EDGE, 'stroke-width': 2 }, sw);
      this.swAt = 1.75;
      this.n = text(el, '', '끈 뒤 시작한 새 대화부터 적용', 120, 890);
      css(this.n, { font: '600 48px/1.25 var(--body)', color: 'var(--ink)' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      this.tl.forEach(c => c.render(lt));
      const q = prog(lt, this.swAt, 0.35, ease.inOutCubic);   // 스위치가 꺼진다(손잡이가 왼쪽으로, 바탕이 회색으로)
      this.swK.setAttribute('cx', lerp(125, 45, q).toFixed(1));
      this.swBg.setAttribute('fill', q < 0.5 ? ACC : '#B9C3CE');
      this.swBg.setAttribute('stroke', q < 0.5 ? '#1E40B8' : '#8E9AA6');
      rise(this.n, lt, 1.3);
    },
  });

  // ── s03a 실습 단계(L7 요청문 크게): 메모장 글 17줄에서 열한 줄을 고른다. 선택 띠가 위에서 아래로 늘어난다 ──
  DECK.slide({
    id: 'p1-ch02-s03a', dur: 3.2, notes: NOTES.s03a,
    setup(el) {
      this.bg = THEME.bg(el, 'lab', { floor: false });
      THEME.header(el, CH);
      this.ft = text(el, 'p1-tag is-big', '파일 다루기', 120, 196);
      this.ft.style.transformOrigin = '50% 100%';
      // 메모장 카드: x 680, 폭 1120. 17줄을 고정폭 32px 로 싣고, 카드 폭을 넘는 줄은 카드 안에서 줄을 바꾼다(잘리는 글자가 없다)
      const NX = 680, NW = 1120, NY = 196, LH = 39;
      this.t = THEME.title(el, '「요청 A」 글만 골라 복사합니다', { x: NX, y: 92, size: 52, at: 0.2 });
      this.np = THEME.card(el, { x: NX, y: NY, w: NW, at: 0.3, pad: '12px 30px 14px',
        html: '<span class="p1-cap">메모장 · <span class="p1-mono">lab1/단계.md</span></span><div class="p1-np"></div>' });
      const box = this.np.face.querySelector('.p1-np');
      css(box, { position: 'relative' });
      this.sel = div(box, '', '', { position: 'absolute', left: '0px', right: '0px', top: '0px', height: '0px', background: 'rgba(42,85,229,.2)', transformOrigin: '50% 0' });
      const lines = ['### 요청 A', '', '```text'].concat(REQ_A, ['```', '', '## 2단계: 세 항목 요청(파트 1 5장)']);
      this.ln = lines.map((t, i) => {
        const e = div(box, 'p1-mono', '', { position: 'relative', fontSize: '32px', lineHeight: LH + 'px', minHeight: LH + 'px', whiteSpace: 'pre-wrap', wordBreak: 'keep-all',
          color: [2, 14, 16].includes(i) ? 'var(--dim)' : 'var(--ink)' });
        const sp = h('span', '', e); sp.textContent = t;
        return { e, sp };
      });
      this.box = box;
      // 선택 띠: 3번째 줄 위부터 13번째 줄 아래까지(줄이 바뀐 줄의 높이를 포함한다)
      const top3 = this.ln[3].e.offsetTop, bot13 = this.ln[13].e.offsetTop + this.ln[13].e.offsetHeight;
      css(this.sel, { top: top3 + 'px', height: (bot13 - top3) + 'px' });
      // 카드 안 글의 무대 좌표
      const [bx, by] = rel(box, this.np.el), X0 = NX + bx, Y0 = NY + by;
      const sv = svgFull(el);
      const caret = (x, y) => { const r = s('rect', { x: x - 2, y: y + 4, width: 4, height: LH - 8, fill: ACC }, sv); return r; };
      const y3 = Y0 + top3, y13 = Y0 + this.ln[13].e.offsetTop, w13 = this.ln[13].sp.offsetWidth;
      this.c1 = caret(X0 - 3, y3);
      this.c2 = caret(X0 + w13 + 3, y13);
      // 「여기부터」: 카드 왼쪽 바깥에서 짚는 선으로 첫 줄 앞을 잇는다. 「여기까지」: 마지막 줄 끝 바로 뒤
      const TX = NX - 40;
      this.t1 = text(el, 'p1-tag is-cobalt', '여기부터', 0, 0);
      css(this.t1, { fontSize: '36px', padding: '6px 18px 8px' });
      css(this.t1, { left: (TX - this.t1.offsetWidth) + 'px', top: (y3 + LH / 2 - this.t1.offsetHeight / 2) + 'px' });
      this.l1 = leader(sv, TX, y3 + LH / 2, X0 - 8, y3 + LH / 2);
      this.t2 = text(el, 'p1-tag is-cobalt', '여기까지', 0, 0);
      css(this.t2, { fontSize: '36px', padding: '6px 18px 8px' });
      css(this.t2, { left: (X0 + w13 + 60) + 'px', top: (y13 + LH / 2 - this.t2.offsetHeight / 2) + 'px' });
      this.l2 = leader(sv, X0 + w13 + 60, y13 + LH / 2, X0 + w13 + 10, y13 + LH / 2);
      // 왼쪽 카드(x 120, 폭 520): 할 일 세 줄 36px / 기대 결과 / 쓰지 않는 키
      const KB = 'word-break:keep-all;font-size:36px;line-height:1.28';
      this.card = THEME.card(el, { x: 120, y: 440, w: 520, at: 0.5, enter: 'slide', pad: '22px 28px 24px', html:
        `<div style="${KB}">${MONO('lab1/단계.md')}를 메모장으로 엽니다</div>` +
        `<div style="${KB};margin-top:10px"><span style="white-space:nowrap">「아래 민원에」부터</span> <span style="white-space:nowrap">「알려 주세요.」까지</span> 선택</div>` +
        `<div style="${KB};margin-top:10px">Ctrl+C로 복사합니다</div>` +
        '<div style="height:1.5px;background:var(--line);margin:16px 0 10px"></div>' +
        '<div style="font:600 36px/1.25 var(--body);color:var(--dim)">기대 결과</div>' +
        '<div style="font:700 44px/1.25 var(--body)">열한 줄이 선택됩니다</div>' +
        `<div style="${KB};margin-top:14px;padding-top:12px;border-top:1.5px dashed var(--edge)"><b>Ctrl+A</b>(전체 선택)는 쓰지 않습니다</div>` });
      const cb = 440 + this.card.face.offsetHeight;
      if (cb > 990) console.warn(`[DECK] p1-ch02-s03a 왼쪽 카드 아래 끝 ${cb}`);
      const nb = NY + this.np.face.offsetHeight;
      if (nb > 990) console.warn(`[DECK] p1-ch02-s03a 메모장 카드 아래 끝 ${nb}`);
      if (box.scrollWidth > box.clientWidth + 1) console.warn('[DECK] p1-ch02-s03a 메모장 줄이 카드 폭을 넘는다');
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      THEME.dropEl(this.ft, lt, 0.1, 140);
      this.t.render(lt);
      this.np.render(lt);
      this.card.render(lt);
      rise(this.box, lt, 0.7, 12);                         // 17줄이 한 번에 나타난다
      const c1 = prog(lt, 1.25, 0.15, ease.outQuad);
      this.c1.style.opacity = c1.toFixed(3);
      this.l1(lt, 1.3);
      tagIn(this.t1, lt, 1.4, -16);
      const p = prog(lt, 1.6, 0.8, ease.inOutCubic);       // 선택 띠가 0.8초 동안 위에서 아래로 늘어난다
      this.sel.style.transform = `scaleY(${p.toFixed(4)})`;
      this.sel.style.opacity = p > 0 ? '1' : '0';
      this.c2.style.opacity = prog(lt, 2.4, 0.15, ease.outQuad).toFixed(3);
      this.l2(lt, 2.45);
      tagIn(this.t2, lt, 2.55, 16);
    },
  });

  // ── s04 실습 단계(L6 화면 크게): 그린 ChatGPT 화면에 요청 A를 붙여 넣고 보낸다. ①②③ 을 짚는다 ──
  DECK.slide({
    id: 'p1-ch02-s04', dur: 3.9, notes: NOTES.s04,
    setup(el) {
      this.bg = THEME.bg(el, 'lab', { floor: false });
      THEME.header(el, CH);
      this.t = THEME.title(el, '「요청 A」를 그대로 붙여 넣고 보냅니다', { x: 120, y: 92, size: 52, at: 0.15 });
      this.stp = stepTag(el, STEP('1단계', '1~2'), 1500, 100);
      const AI1 = '김가람님, 안녕하세요.';
      this.shot = THEME.shot(el, null, { size: 'wide', x: 120, y: 196, at: 0.2, draw: (scr) => {
        const g = div(scr, 'p1-gpt');
        const top = div(g, 'p1-gpt-top');
        css(div(top, 'p1-gpt-btn', 'ChatGPT'), { fontSize: '32px' });
        this.menu = div(top, 'p1-gpt-btn', '▾', { padding: '6px 18px 8px', fontSize: '32px' });   // 모델 메뉴: 모델 이름은 쓰지 않는다
        const body = div(g, '', '', { position: 'relative', flex: '1', padding: '10px 20px 0', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' });
        // 요청문 32px. 말풍선 폭을 넘는 줄은 말풍선 안에서 줄을 바꾼다
        this.ub = div(body, '', '', { alignSelf: 'flex-end', boxSizing: 'border-box', maxWidth: '1160px', background: 'var(--accent)', color: '#FFFFFF',
          border: '1.5px solid #1E40B8', borderRadius: '10px', padding: '8px 18px 10px', font: '400 32px/1.22 var(--body)', transformOrigin: '100% 100%' });
        REQ_A.forEach(t => div(this.ub, '', t, t ? { whiteSpace: 'pre-wrap', wordBreak: 'keep-all' } : { height: '10px' }));
        // 답 말풍선과 「다시 생성」은 입력칸 바로 위에 붙인다(남는 높이는 요청문 말풍선과 답 말풍선 사이로 간다)
        this.ai = div(body, '', '', { alignSelf: 'flex-start', marginTop: 'auto', boxSizing: 'border-box', background: '#FFFFFF', border: '1.5px solid var(--edge)', borderRadius: '10px',
          padding: '6px 20px 8px', font: '400 32px/1.3 var(--body)', color: 'var(--ink)', transformOrigin: '0 100%' });
        this.aiT = h('span', '', this.ai); this.aiT.textContent = AI1;
        this.dots = div(this.ai, '', '● ● ●', { display: 'none', fontSize: '24px', letterSpacing: '4px', color: 'var(--dim)' });
        this.dots.setAttribute('data-fine', '');
        this.rg = div(body, '', '다시 생성', { alignSelf: 'flex-start', background: '#FFFFFF', border: '1.5px dashed var(--edge)', color: 'var(--dim)',
          padding: '4px 18px 6px', font: '600 32px/1.25 var(--body)', borderRadius: '8px', marginBottom: '12px' });
        this.inp = div(g, 'p1-gpt-input', '', { margin: '0 20px 16px', minHeight: '72px' });
        div(this.inp, 'p1-plus', '+'); div(this.inp, '', '');
        this.lv = div(this.inp, '', 'Instant ▾', { alignSelf: 'center', marginLeft: 'auto', marginRight: '14px', padding: '4px 20px 6px', background: '#EEF0F3', border: '1.5px solid var(--edge)', borderRadius: '999px', font: '600 30px/1.25 var(--body)', color: 'var(--ink)', whiteSpace: 'nowrap' });
        div(this.inp, 'p1-send', '↑').style.marginLeft = '0';
        this.g = g;
        return g;
      } });
      // 말풍선 크기는 글자가 모두 들어간 상태로 고정한다
      css(this.ai, { minWidth: this.ai.offsetWidth + 'px', minHeight: this.ai.offsetHeight + 'px' });
      this.AI1 = [...AI1];
      if (this.ub.scrollWidth > this.ub.clientWidth + 1) console.warn('[DECK] p1-ch02-s04 요청 A 줄이 말풍선 폭을 넘는다');
      { const bd = this.ub.parentElement; if (bd.scrollHeight > bd.clientHeight + 1) console.warn(`[DECK] p1-ch02-s04 화면 안 글이 넘친다 ${bd.scrollHeight}/${bd.clientHeight}`); }
      // 표시 사각형: 그린 화면 안 좌표. 그린 화면의 왼쪽 위는 무대 (122.5, 198.5)
      const g = this.g, O = [122.5, 198.5], sv = s('svg', { width: 1, height: 1 }, g);
      css(sv, { position: 'absolute', left: '0px', top: '0px', overflow: 'visible', zIndex: '1' });
      const bx = e => { const [x, y] = rel(e, g); return [x, y, e.offsetWidth, e.offsetHeight]; };
      const [ix, iy, iw, ih] = bx(this.inp), [rx, ry, rw, rh] = bx(this.rg), [mx, my, mw, mh] = bx(this.lv);
      this.m1 = rectMark(sv, ix - 6, iy - 6, iw + 12, ih + 12);
      this.m2 = rectMark(sv, rx - 7, ry - 7, rw + 14, rh + 14, { dash: true });
      this.m3 = rectMark(sv, mx - 7, my - 7, mw + 14, mh + 14, { dash: true });
      // 짚는 이름표(오른쪽 x 1380, 폭 440, 36px 코발트). 짚는 선이 화면 안 글을 가로지르지 않게 이름표를 표시와 같은 높이에 둔다
      const CX = 1380, CW = 440;
      // ② 는 ① 과 겹치지 않게 다시 생성 버튼보다 조금 위(가운데 y 750)에 두고, 짚는 선은 빈 자리를 비스듬히 지난다
      this.co2 = THEME.callout(el, { from: [O[0] + rx + rw + 7, O[1] + ry + rh / 2], x: CX, y: 750, w: CW, text: '③ 오류가 나오면 <span style="white-space:nowrap">「다시 생성」을</span> 한 번', at: 2.5 });
      this.co1 = THEME.callout(el, { from: [O[0] + ix + iw + 6, O[1] + iy + ih / 2], x: CX, y: O[1] + iy + ih / 2, w: CW, text: '① 추론 수준을 <b>Instant</b>로<br>② 붙여 넣고 보내기', at: 2.2 });
      [this.co1, this.co2].forEach(c => { const tg = c.el.querySelector('.p1-callout'); if (tg) tg.style.wordBreak = 'keep-all'; });   // 「」 안에서 줄을 바꾸지 않는다
      // 기대 결과 카드: 짚는 이름표 ③ 과 ② 사이(짚는 선이 지나가지 않는 자리)
      this.card = THEME.card(el, { x: CX, y: 300, w: CW, at: 3.1, enter: 'slide', pad: '22px 26px 24px', html:
        '<div style="font:600 34px/1.25 var(--body);color:var(--dim)">기대 결과</div><div style="font:700 40px/1.3 var(--body)">환불 답변 초안이 나옵니다</div>' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      THEME.dropEl(this.stp, lt, 0.05, 120);
      this.t.render(lt);
      this.shot.render(lt);
      const pu = prog(lt, 0.75, 0.35, ease.snap);           // 사용자 말풍선이 붙여 넣어진다
      this.ub.style.opacity = clamp(pu * 2).toFixed(3);
      this.ub.style.transform = `translateY(${((1 - pu) * 30).toFixed(1)}px) scale(${lerp(0.95, 1, pu).toFixed(4)})`;
      const pa = prog(lt, 1.1, 0.3, ease.snap), stream = 1.7, cps = 30;   // 생각 표시 0.6초 뒤 첫 줄이 한 글자씩
      this.ai.style.opacity = clamp(pa * 2).toFixed(3);
      this.ai.style.transform = `translateY(${((1 - pa) * 20).toFixed(1)}px)`;
      const n = clamp(Math.floor((lt - stream) * cps), 0, this.AI1.length);
      this.dots.style.display = lt >= 1.1 && lt < stream ? 'inline-block' : 'none';
      this.aiT.textContent = lt < stream ? '' : this.AI1.slice(0, n).join('');
      rise(this.rg, lt, 1.95, 14);
      this.m1(lt, 2.0);
      this.m2(lt, 2.3, 0.4);
      this.m3(lt, 2.6, 0.4);
      this.co1.render(lt); this.co2.render(lt);
      this.card.render(lt);
    },
  });

  // ── s06 실습 확인(L8 확인 목록, 키 한 번): 왼쪽 공단 규정 기준 카드, 오른쪽 결과 목록. 키를 누르면 줄마다 블록이 떨어지고 흔한 결과가 올라온다 ──
  const RV = 2.3;
  DECK.slide({
    id: 'p1-ch02-s06', dur: 3.9, steps: [RV], notes: NOTES.s06,
    setup(el) {
      this.bg = THEME.bg(el, 'lab', { floor: false });
      THEME.header(el, CH);
      this.t = THEME.title(el, '근거로 든 것이 공단 규정인가요?', { x: 120, y: 104, size: 64, at: 0.1 });
      this.stp = stepTag(el, STEP('1단계', '2'), 120 + this.t.el.offsetWidth + 40, 116);
      this.body = text(el, 't-body', '답변에 공단 규정 조문이 나왔습니까?', 120, 196);
      const RULE = '<div data-r style="height:1.5px;background:var(--line);margin:12px 0 10px"></div>';
      this.card = THEME.card(el, { x: 120, y: 290, w: 560, at: 0.5, cap: '공단 규정 기준', pad: '20px 26px 24px', html:
        // 줄이 바뀌는 자리를 낱말 묶음 사이로 정한다(nowrap 묶음)
        '<div data-r style="font-size:34px;line-height:1.25">새별시설공단 체육시설 <span style="white-space:nowrap">이용 규정(가상)</span></div>' + RULE +
        '<div data-r class="p1-mono" style="font-size:34px;line-height:1.3">제7조 제1항 제2호</div>' +
        '<div data-r style="font:700 48px/1.2 var(--body)">환불 34,000원</div>' +
        '<div data-r class="p1-dimtext" style="font-size:34px;line-height:1.25">남은 8회분 40,000원 − <span style="white-space:nowrap">위약금 6,000원</span></div>' + RULE +
        '<div data-r class="p1-mono" style="font-size:34px;line-height:1.3">제8조 제2항</div>' +
        '<div data-r style="font:700 48px/1.2 var(--body)">신청일부터 7영업일 안</div>' +
        '<div data-r style="font-size:34px;line-height:1.25;margin-top:12px">5장에서 이 규정을 <span style="white-space:nowrap">ChatGPT에 줍니다</span></div>' });
      { const cp = this.card.face.querySelector('.p1-cap'); if (cp) cp.style.fontSize = '34px'; }   // 꼬리표 「공단 규정 기준」 30 → 34px
      this.lines = Array.from(this.card.face.querySelectorAll('[data-r]'));
      const cb = 290 + this.card.face.offsetHeight;
      if (cb > 960) console.warn(`[DECK] p1-ch02-s06 공단 규정 기준 카드 아래 끝 ${cb}`);
      this.cl = THEME.checklist(el, [
        { text: '환불 금액', note: '대개 34,000원 · 규정 금액과 같습니다', state: 'pass' },
        { text: '근거', note: '일반 법령·기준 · 공단 규정이 아닙니다', state: 'fail' },
        { text: '지급 기한', note: '법령 기준 3영업일 또는 빠짐 · 공단 규정은 7영업일', state: 'fail' },
        { text: '이름', note: '김가람님 · 그대로 옮겼습니다', state: 'fail' },
      ], { x: 740, y: 290, w: 1060, rowH: 160, box: 88, boxH: 42, textX: 184, textSize: 58, noteSize: 40, at: 1.2, revealAt: RV });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      THEME.dropEl(this.stp, lt, 0.2, 120);
      rise(this.body, lt, 0.45);
      this.card.render(lt);
      this.lines.forEach((e, i) => rise(e, lt, 0.75 + i * 0.06, 16));
      this.cl.render(lt);
    },
  });

  // ── s07 실습 단계(L1 한 문장): 132px 두 줄 문장과 근거 칸 셋 ──
  DECK.slide({
    id: 'p1-ch02-s07', dur: 3.4, notes: NOTES.s07,
    setup(el) {
      this.bg = THEME.bg(el, 'lab', { floor: false });
      THEME.header(el, CH);
      this.stp = stepTag(el, STEP('1단계', '3'), 120, 196);
      this.st = THEME.statement(el, '이 대화는\n지우지 않고 둡니다', { size: 132, at: 0.3, facts: [
        { label: '1열 한 줄 요청', text: '5장에서 이 답변을 다시 엽니다' },
        { label: '2열 세 항목 요청 · 5장', text: '세 항목 요청의 답변과 나란히 견줍니다' },
        { label: '막히면', text: '5장에서 lab1/완성본/요청A_결과예.md와 견줍니다' },
      ] });
      // 문장을 y 330~610 에, 근거 칸을 y 720 부터 둔다(부품의 cy 는 근거 칸까지 묶어 가운데를 잡으므로 위치를 직접 준다)
      this.st.el.style.top = '330px';
      const ft = this.st.el.querySelectorAll('.p1-stmt-fact-t')[2];
      if (ft) ft.innerHTML = `5장에서 ${MONO('lab1/완성본/요청A_결과예.md')}와 견줍니다`;
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      THEME.dropEl(this.stp, lt, 0.05, 120);
      this.st.render(lt);
    },
  });

  // ── s08 이야기(L9 인물과 대사): 답변 초안이 오민석 팀장 앞까지 갔다가 돌아오고, 대사 카드와 반려 사유, 다음 질문이 차례로 놓인다 ──
  DECK.slide({
    id: 'p1-ch02-s08', dur: 3.8, notes: NOTES.s08,
    setup(el) {
      const H = [1170, 870], L = 500, [ox, oy] = I(0, -L), O = [H[0] + ox, H[1] + oy];   // 한서윤 주임(왼쪽 앞), 오민석 팀장(오른쪽 뒤)
      this.bg = THEME.bg(el, 'base', { floor: [900, 380, 980, 660], props: false, token: false, origin: H });
      THEME.header(el, CH);
      this.t = THEME.title(el, '오민석 팀장이 초안을 반려했습니다', { x: 120, y: 100, size: 52, at: 0.1 });
      const things = h('div', 'full', el);
      // 뒤(오른쪽 위)부터 만든다
      this.ob = THEME.figure(things, '오민석', { x: O[0], y: O[1], at: 0.15, first: true, scale: 3 });
      // 답변 초안: 두 사람 사이 등각 축 위. 한서윤 주임의 기호 블록(iy -225~-123)과 오민석 팀장 몸통(iy -440 이후) 사이에 둔다
      const [dx, dy] = I(-30, -340);
      this.dr = THEME.item(things, '답변 초안', { x: H[0] + dx, y: H[1] + dy, w: 140, d: 120, at: 0.3, label: false });
      this.hs = THEME.figure(things, '한서윤', { x: H[0], y: H[1], at: 0.45, scale: 3 });
      // 답변 초안 토큰: 한서윤 주임 앞에서 등각 축(오른쪽 위)을 따라 오민석 팀장 앞까지 갔다가 돌아온다
      this.fl = THEME.flow(el, [[70, 0], [70, -L], [70, 0]], { x: H[0], y: H[1], at: 0.95, speed: 900, hold: { 1: 0.35 }, tone: 'cobalt' });
      this.cd = THEME.card(el, { x: 120, y: 190, w: 1000, at: 1.9, enter: 'slide', cap: '오민석 팀장', text: '이대로는 보낼 수 없습니다', pad: '24px 34px 28px' });
      css(this.cd.face, { fontSize: '72px', fontWeight: '700', lineHeight: '1.25' });
      this.why = ['근거 조문이 공단 규정과 다릅니다', '실행할 때마다 답이 다릅니다', '이름·전화번호를 그대로 입력했습니다'].map((t, i) => {
        const r = text(el, 't-body', '', 120, 420 + i * 62);
        css(r, { display: 'flex', alignItems: 'center', gap: '20px', whiteSpace: 'nowrap', lineHeight: '1.3' });
        div(r, '', String(i + 1), { flex: 'none', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          font: '700 34px/1 var(--num)', color: 'var(--ink)', background: '#FFFFFF', border: '1.5px solid var(--edge)' });
        div(r, '', t);
        return r;
      });
      this.nx = THEME.card(el, { x: 120, y: 760, w: 900, at: 2.85, enter: 'drop', cap: '다음 질문', pad: '22px 32px 26px',
        html: '<div style="font-size:44px;line-height:1.35;font-weight:600">같은 모델에 같은 요청을 넣었는데<br>왜 결과가 서로 달랐는가</div>' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      [this.ob, this.dr, this.hs].forEach(b => b.render(lt));
      this.fl.render(lt);
      this.cd.render(lt);
      this.why.forEach((r, i) => rise(r, lt, 2.3 + i * 0.15));
      this.nx.render(lt);
    },
  });
})();
