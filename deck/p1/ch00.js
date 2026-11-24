/* 파트 1 스타일 프레임. 테마 부품(themes/p1.js)을 실제 파트 1 내용으로 한 번씩 써 본 본보기다.
 * 제작 담당은 배치와 부품 호출 방법을 여기서 가져간다. s01·s02 는 대표 그림을 poster 로 넣었다. 영상이 들어오면 src 를 더하고 다시 찍는다. */
(function () {
  'use strict';
  const { ease, prog, css, h } = REEL;
  DECK.config({ part: 'p1', chapter: 'ch00', title: '스타일 프레임' });

  // 글 덩어리를 아래에서 올린다(투명도만 바꾸지 않는다)
  const rise = (el, lt, at, dy = 28) => {
    const p = prog(lt, at, 0.5, ease.snap);
    el.style.opacity = p.toFixed(3);
    el.style.transform = `translateY(${((1 - p) * dy).toFixed(1)}px)`;
  };

  // s01 파트 인트로(title): 영상 자리. 영상이 없어 사무실 디오라마를 블록으로 그렸다
  DECK.slide({
    id: 'p1-ch00-s01', dur: 3.2,
    notes: '파트 1 인트로. 영상 p1-intro 가 들어올 자리다. 지금은 영상의 시작 그림(p1-key-intro, 고객지원팀 사무실 한 층)을 정지 배경으로 둔다. 영상이 들어오면 src 를 더한다. 제목은 자모 블록 조립으로 들어온다.',
    setup(el) {
      this.vt = THEME.videoTitle(el, {
        kind: 'intro', kicker: '파트 1', scene: 'intro', poster: '../assets/img/p1/p1-key-intro.jpg',
        title: '같은 AI, 다른 결과:\n일을 맡기는 구조',
        sub: '같은 ChatGPT에 같은 민원 답변을 시켰는데 왜 결과가 달랐는가',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // s02 챕터 전환(transition): 같은 국면의 둘째 챕터라 영상을 좌우로 뒤집고 제목을 오른쪽에 둔다
  DECK.slide({
    id: 'p1-ch00-s02', dur: 3,
    notes: '챕터 전환 장. 파트 1 ch09 는 p1-tr-flow 영상을 뒤집어 쓴다. 영상이 없어 시작 그림(p1-key-flow, 코발트 책상 세 곳과 호박색 승인 블록)을 뒤집어 정지 배경으로 둔다.',
    setup(el) {
      this.vt = THEME.videoTitle(el, {
        kind: 'chapter', kicker: '파트 1 · 9장', scene: 'flow', flip: true, poster: '../assets/img/p1/p1-key-flow.jpg',
        title: '작성자와 검토자, 승인하는 사람',
        sub: '왜 한 에이전트가 아니라 세 역할로 나뉘었고, 사람은 어디에서 결정하는가',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // s03 개념(concept·diagram): 왼쪽 40% 글, 오른쪽 60% 다섯 겹 받침
  DECK.slide({
    id: 'p1-ch00-s03', dur: 3.4,
    notes: '개념 장. 모델·도구·에이전트·워크플로·하네스를 안쪽부터 넓어지는 다섯 겹 받침으로 쌓고, 다 쌓이면 전체가 물러나 구조 전체를 보인다.',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [760, 330, 1100, 750], props: false, tokenAt: [880, 935], tokenA: 90, tokenB: 60 });
      this.hd = THEME.header(el, { chapter: 3, title: '같은 모델, 다른 결과' });
      this.ttl = THEME.title(el, '모델에서 하네스까지\n다섯 단계', { x: 120, y: 190, size: 72, w: 640, at: 0.1 });
      this.body = h('div', 'a t-body', el, '점수 차이는 <span class="p1-em">모델 바깥</span>에 정해 둔 지침·자료·검증에서 나왔다.');
      css(this.body, { left: '120px', top: '400px', width: '560px' });
      this.st = THEME.stack(el, [
        { label: '하네스' }, { label: '워크플로' }, { label: '에이전트' }, { label: '도구' }, { label: '모델', tone: 'cobalt' },
      ], { x: 1180, y: 800, w: 380, shrink: 64, at: 0.45, each: 0.16, pullAt: 2.1 });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.ttl.render(lt);
      rise(this.body, lt, 0.9);
      this.st.render(lt);
    },
  });

  // s04 수치(data): 막대 그래프 대신 높이가 다른 기둥 두 개와 치수선
  DECK.slide({
    id: 'p1-ch00-s04', dur: 3,
    notes: '수치 장. 기존 과정 강사가 같은 모델로 과제 15개를 풀게 해 하네스가 없을 때와 있을 때의 평균 점수를 잰 결과다(자체 측정, 코드 실행 없는 산출물 평가). 치수선이 먼저 그어지고 숫자가 찍힌다.',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [820, 240, 1040, 860], props: false, tokenAt: [1240, 560], tokenA: 60, tokenB: 60 });
      this.hd = THEME.header(el, { chapter: 3, title: '같은 모델, 다른 결과' });
      this.ttl = THEME.title(el, '같은 모델,\n같은 과제 15개', { x: 120, y: 190, size: 72, w: 600, at: 0.1 });
      this.body = h('div', 'a t-body', el, '하네스가 있을 때와 없을 때 평균 점수가 갈렸다.');
      css(this.body, { left: '120px', top: '400px', width: '520px' });
      this.src = h('div', 'a t-small p1-dimtext', el, '기존 과정 강사의 자체 측정<br>과제 15개 평균, 코드 실행 없는 산출물 평가');
      css(this.src, { left: '120px', top: '860px', width: '600px' });
      const S = 5.4, A = { x: 1080, y: 740 }, B = { x: 1400, y: 740 };
      this.a = THEME.block(el, { x: A.x, y: A.y, w: 150, d: 150, h: 49.5 * S, at: 0.35, label: '하네스 없이', labelPos: 'below' });
      this.b = THEME.block(el, { x: B.x, y: B.y, w: 150, d: 150, h: 79.3 * S, tone: 'cobalt', at: 0.55, label: '하네스를 갖추고', labelPos: 'below' });
      this.da = THEME.dim(el, '49.5', { from: [A.x - 160, A.y], to: [A.x - 160, A.y - 49.5 * S], unit: '점', side: 'left', at: this.a.land + 0.15 });
      this.db = THEME.dim(el, '79.3', { from: [B.x + 160, B.y], to: [B.x + 160, B.y - 79.3 * S], unit: '점', side: 'right', at: this.b.land + 0.15 });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.ttl.render(lt);
      rise(this.body, lt, 0.8);
      rise(this.src, lt, 1.0, 16);
      this.a.render(lt); this.b.render(lt);
      this.da.render(lt); this.db.render(lt);
    },
  });

  // s05 실습 단계(lab-step): 왼쪽 계단 단계 표시와 카드, 가운데 화면 캡처 틀(캡처가 없어 그린 화면)
  DECK.slide({
    id: 'p1-ch00-s05', dur: 5.2,
    notes: 'LAB-1 1단계의 실습 장 본보기. 캡처 파일(deck/assets/p1/shots/<슬라이드 id>.png)이 없으므로 THEME.shot 이 그린 ChatGPT 화면을 넣었다. 붙여 넣을 곳을 코발트 사각 윤곽으로 짚는다.',
    setup(el) {
      this.bg = THEME.bg(el, 'lab', { floor: false });
      this.hd = THEME.header(el, { chapter: 2, title: '실습: 한 줄 요청으로 민원 답변 받아 보기', fiction: true });
      this.stp = THEME.step(el, 2, 4, { x: 150, y: 330, at: 0.1 });
      this.ttl = THEME.title(el, '「요청 A」를 그대로 붙여 넣고 보냅니다', { x: 560, y: 96, size: 52, at: 0.15 });
      this.card = THEME.card(el, { x: 120, y: 380, w: 380, at: 0.5, html:
        '<span class="p1-cap">붙여 넣을 글</span><div class="p1-mono" style="font-size:30px">lab1/단계.md</div>' +
        '<div style="font-size:36px;font-weight:600;margin-top:6px">「요청 A」 전체</div>' +
        '<div style="height:1.5px;background:var(--line);margin:26px 0 22px"></div>' +
        '<span class="p1-cap">기대 결과</span><div style="font-size:36px;line-height:1.38">옆 사람과 환불 금액·근거가 다르게 나온다</div>' });
      this.shot = THEME.shot(el, null, {
        size: 'wide', x: 560, y: 196, at: 0.25, top: 'GPT-6',
        chat: [
          { who: 'user', text: '아래 민원에 답변을 써 줘.\n\n[누리집 민원 게시판]\n작성자: 김가람\n연락처: 010-0000-1234\n제목: 수영 강습 환불 요청\n…' },
          { who: 'ai', text: '김가람 님, 문의하신 수영 강습 환불 안내드립니다.' },
        ],
        chatOpts: { start: 1.5, think: 0.6 },
        marks: [{ x: 0.018, y: 0.866, w: 0.964, h: 0.106 }], markAt: 0.8,
      });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.stp.render(lt);
      this.ttl.render(lt);
      this.card.render(lt);
      this.shot.render(lt);
    },
  });

  // s06 사례 사물: 민원 글 → 규정집 → 답변 초안 → 승인 기록. 서류 토큰이 등각 축을 따라 지나가고, 팀장의 도장 블록이 내려앉는다
  DECK.slide({
    id: 'p1-ch00-s06', dur: 6.2, steps: [4.9],
    notes: '사례 사물 장. 민원 글, 규정집, 답변 초안, 승인 기록을 블록으로 놓고 서류 토큰이 차례로 지나간다. 첫 키에서 토큰이 승인 기록 앞에 멈추고, 다음 키에서 오민석 팀장의 호박색 도장 블록이 내려앉는다.',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [480, 300, 1400, 760], props: false, token: false });
      this.hd = THEME.header(el, { chapter: 4, title: '일을 맡길 때 정하는 세 항목', fiction: true });
      this.ttl = THEME.title(el, '발송 직전에\n팀장이 승인한다', { x: 120, y: 130, size: 72, w: 600, at: 0.1 });
      this.body = h('div', 'a t-body', el, '답변 초안은 <b>오민석 팀장</b>이 확인한 뒤에 민원인에게 나간다.');
      css(this.body, { left: '120px', top: '340px', width: '520px' });
      const O = [740, 900], step = 280, at = (k) => [O[0] + THEME.iso(0, -k * step)[0], O[1] + THEME.iso(0, -k * step)[1]];
      const [p0, p1, p2, p3] = [0, 1, 2, 3].map(at);
      const things = h('div', 'full', el);   // 사물 층을 먼저 깔고, 사물 앞을 지나는 토큰을 그 위에 둔다
      this.fl = THEME.flow(el, [[110, 0], [110, -step], [110, -2 * step], [110, -3 * step]], { x: O[0], y: O[1], at: 1.3, speed: 330, hold: { 1: 0.45, 2: 0.45 } });
      const t2 = this.fl.times[2];
      // 뒤(오른쪽 위)에 있는 것부터 만든다
      this.mb = THEME.figure(things, '오민석', { x: 1700, y: 560, at: 0.7, first: true });
      this.ap = THEME.item(things, '승인 기록', { x: p3[0], y: p3[1], at: 0.5, stampAt: 5.0 });
      this.dr = THEME.item(things, '답변 초안', { x: p2[0], y: p2[1], at: t2 - 0.35, note: '근거 제7조 제1항 제2호' });
      this.rb = THEME.item(things, '규정집', { x: p1[0], y: p1[1], at: 0.35, note: '체육시설 이용 규정', pin: 30 });
      this.cp = THEME.item(things, '민원 글', { x: p0[0], y: p0[1], at: 0.2, note: '수영 강습 환불 문의' });
      this.hs = THEME.figure(things, '한서윤', { x: 470, y: 870, at: 0.5, first: true });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.ttl.render(lt);
      rise(this.body, lt, 0.8);
      [this.mb, this.ap, this.dr, this.rb, this.cp, this.hs].forEach(b => b.render(lt));
      this.fl.render(lt);
    },
  });

  // s07 이야기(story): 누끼 소품(민원 창구) 옆에 코드로 그린 인물과 카드를 놓는다
  DECK.slide({
    id: 'p1-ch00-s07', dur: 3.6,
    notes: '이야기 장. 가상 기관 새별시설공단 고객지원팀의 민원 창구에서 한서윤 주임이 일하고, 오민석 팀장이 민원 답변 초안 작성 시간을 줄일 방법을 2주 뒤에 보고하라고 지시한다. 민원 창구는 생성한 누끼 그림(p1-key-counter)을 회색조로 넣었다.',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [700, 300, 1180, 760], props: false, token: false });
      this.hd = THEME.header(el, { chapter: 1, title: '오늘 만드는 것과 새별시설공단 고객지원팀', fiction: true });
      this.ttl = THEME.title(el, '새별시설공단\n고객지원팀', { x: 120, y: 190, size: 72, w: 600, at: 0.1 });
      this.body = h('div', 'a t-body', el, '한서윤 주임은 민원 창구에서 답변 초안을 쓴다.');
      css(this.body, { left: '120px', top: '400px', width: '520px' });
      // 뒤(위쪽)에 있는 것부터 만든다
      this.mb = THEME.figure(el, '오민석', { x: 1690, y: 470, at: 0.6, first: true });
      this.cd = THEME.card(el, { x: 1000, y: 150, w: 540, at: 1.1, enter: 'slide', cap: '오민석 팀장의 지시', text: '답변 초안 작성 시간을 줄일 방법을 2주 뒤에 보고하세요.' });
      this.ct = THEME.cutout(el, 'p1-key-counter', { src: '../assets/img/p1/p1-key-counter_cut.png', x: 1290, y: 760, size: 480, at: 0.3,
        label: '민원 창구', note: '수영 강습·주차 민원 접수', labelPos: 'below' });
      this.hs = THEME.figure(el, '한서윤', { x: 900, y: 800, at: 0.8, first: true });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.ttl.render(lt);
      rise(this.body, lt, 0.8);
      [this.mb, this.cd, this.ct, this.hs].forEach(b => b.render(lt));
    },
  });

  // ══ 레이아웃 본보기(2026-11-24): deck/themes/p1.md 「레이아웃 목록」의 갈래를 한 장씩 보인다 ══
  const REQ_A = '아래 민원에 답변을 써 줘.\n\n[누리집 민원 게시판]\n작성자: 김가람\n연락처: 010-0000-1234\n제목: 수영 강습 환불 요청\n\n11월 수영 초급반(월·수·금 오전 7시)을 등록했고 수강료 60,000원을 계좌이체로 냈습니다.\n11월 강습 12회 가운데 지금까지 4회가 진행되었고 4회 모두 나갔습니다.\n회사 근무 시간이 바뀌어 오늘 그만두려고 합니다.\n환불이 얼마나 되는지, 언제 들어오는지 알려 주세요.';
  const src = (el, html, top = 980) => { const e = h('div', 'a t-small p1-dimtext', el, html); css(e, { left: '120px', top: top + 'px', width: '1500px' }); return e; };

  // L1 한 문장
  DECK.slide({
    id: 'p1-ch00-s08', dur: 3.2,
    notes: '레이아웃 「한 문장」. 장의 결론 한 문장을 132px로 화면 폭 거의 다 쓰고, 핵심 말만 코발트로 맞물린다. 받침 판이 먼저 들어온다. 키 누름 없음.',
    setup(el) {
      THEME.header(el, { chapter: 3, title: '같은 모델, 다른 결과', fiction: true });
      this.st = THEME.statement(el, '모델이 아니라\n요청이 비어 있었습니다', { em: ['요청이 비어'], sub: '근거 자료, 답변 형식, 개인정보 처리를 하나도 정하지 않았습니다' });
    },
    render(lt) { this.st.render(lt); },
  });

  // L2 큰 숫자
  DECK.slide({
    id: 'p1-ch00-s09', dur: 3.4,
    notes: '레이아웃 「큰 숫자」. 수치 하나를 420px로 왼쪽에 찍고, 오른쪽에 그 수치가 나온 두 기둥을 작게 둔다. 키 누름 없음.',
    setup(el) {
      THEME.header(el, { chapter: 3, title: '같은 모델, 다른 결과' });
      this.bn = THEME.bigNum(el, '29.8', { unit: '점', x: 160, y: 200, label: '같은 모델, 같은 과제 15개의 평균 점수 차이', note: '하네스 없이 49.5점 · 하네스를 갖추고 79.3점', at: 0.2 });
      const f = THEME.bg(el, 'base', { floor: [1320, 380, 560, 640], props: false, token: false });
      this.f = f;
      this.c1 = THEME.block(el, { x: 1500, y: 880, w: 120, d: 120, h: 49.5 * 5, at: 1.3, grow: true, label: '없이', labelPos: 'below' });
      this.c2 = THEME.block(el, { x: 1720, y: 880, w: 120, d: 120, h: 79.3 * 5, tone: 'cobalt', at: 1.5, grow: true, label: '갖추고', labelPos: 'below' });
      this.s = src(el, '기존 과정 강사의 자체 측정 · 과제 15개 평균, 코드 실행 없이 결과물만 채점');
    },
    render(lt, ctx) { this.f.render(lt, ctx); this.bn.render(lt); this.c1.render(lt); this.c2.render(lt); THEME.rise(this.s, lt, 1.6); },
  });

  // L3 좌우 대비(키 한 번: 오른쪽 칸을 연다)
  DECK.slide({
    id: 'p1-ch00-s10', dur: 3.6, steps: [2],
    notes: '레이아웃 「좌우 대비」. 왼쪽 칸(질문)이 먼저 놓이고, 키를 누르면 세로 판에서 오른쪽 칸(맡긴 일)이 열리며 답변 초안과 확인 블록 셋이 내려앉는다. 키 한 번.',
    setup(el) {
      THEME.header(el, { chapter: 3, title: '같은 모델, 다른 결과', fiction: true });
      this.t = THEME.title(el, '맡긴 일은 그대로 쓸 수 있어야 합니다', { x: 120, y: 104, size: 64, at: 0.1 });
      const sp = this.sp = THEME.split(el, { left: { label: '질문' }, right: { label: '맡긴 일', tone: 'cobalt' }, rightAt: 2, at: 0.3 });
      this.q = THEME.block(sp.left, { x: 520, y: 650, w: 260, d: 260, h: 70, at: 0.6, label: '「수영 강습 환불은 어떻게 계산해?」', pin: 60 });
      this.lt1 = h('div', 'a p1-half-line', sp.left, '대답을 들으면 끝납니다');
      css(this.lt1, { left: '120px', top: '880px' });
      const R = 2;
      this.dr = THEME.item(sp.right, '답변 초안', { x: 1420, y: 560, w: 240, d: 180, at: R + 0.25, label: '「이 민원에 보낼 답변을 써 줘」', pin: 56 });
      this.ck = ['공단 규정의 조문', '규정의 지급 기한', '개인정보 없음'].map((lb, k) =>
        THEME.block(sp.right, { x: 1150 + k * 270, y: 760, w: 90, d: 90, h: 40, at: R + 0.55 + k * 0.15, label: lb, labelPos: 'below' }));
      this.lt2 = h('div', 'a p1-half-line', sp.right, '결과물을 그대로 씁니다');
      css(this.lt2, { left: '1040px', top: '920px' });
    },
    render(lt) {
      this.t.render(lt); this.sp.render(lt); this.q.render(lt); THEME.rise(this.lt1, lt, 1.0);
      this.dr.render(lt); this.ck.forEach(b => b.render(lt)); THEME.rise(this.lt2, lt, 2 + 1.0);
    },
  });

  // L4 가로 순서
  DECK.slide({
    id: 'p1-ch00-s11', dur: 3.8,
    notes: '레이아웃 「가로 순서」. 단계 블록 넷이 왼쪽부터 내려앉고, 서류 토큰이 블록 앞을 지나 승인 블록 앞에서 멈춘다. 에이전트가 맡는 단계는 코발트, 사람이 승인하는 단계는 호박. 키 누름 없음.',
    setup(el) {
      THEME.header(el, { chapter: 3, title: '같은 모델, 다른 결과' });
      this.t = THEME.title(el, '워크플로: 일의 순서를 미리 정합니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.bg = THEME.bg(el, 'base', { floor: [160, 420, 1600, 600], props: false, token: false });
      this.sq = THEME.sequence(el, [
        { label: '규정 찾기', note: '공단 규정 파일', tone: 'cobalt' },
        { label: '답변 작성', note: '다섯 칸 형식', tone: 'cobalt' },
        { label: '원문 대조', note: '민원 원문과 비교', tone: 'cobalt' },
        { label: '팀장 승인', note: '오민석 팀장', tone: 'amber' },
      ], { y: 640, at: 0.5 });
      this.n = h('div', 'a t-body p1-dimtext', el, '정해 둔 순서대로 매번 같은 단계를 밟습니다');
      css(this.n, { left: '120px', top: '930px' });
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.t.render(lt); this.sq.render(lt); THEME.rise(this.n, lt, 1.6); },
  });

  // L5 세로 층(크게)
  DECK.slide({
    id: 'p1-ch00-s12', dur: 3.4,
    notes: '레이아웃 「세로 층」. 다섯 층을 화면 가운데에 크게 쌓고, 오른쪽에 층 이름과 업무 예를 단다. 키 누름 없음.',
    setup(el) {
      THEME.header(el, { chapter: 3, title: '같은 모델, 다른 결과', fiction: true });
      this.t = THEME.title(el, '순서와 규칙까지 정하면 하네스입니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.bg = THEME.bg(el, 'base', { floor: [120, 420, 1100, 640], props: false, token: false });
      this.st = THEME.stack(el, [
        { label: '하네스', note: '공단 규정만 근거, 조문 확인, 발송 전 승인' },
        { label: '워크플로', note: '규정 찾기 → 답변 작성 → 원문 대조' },
        { label: '에이전트' }, { label: '도구' }, { label: '모델', tone: 'cobalt' },
      ].map(L => Object.assign({ h: 72 }, L)), { x: 640, y: 720, w: 560, shrink: 96, at: 0.4, each: 0.16, labelX: 1190 });
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.t.render(lt); this.st.render(lt); },
  });

  // L6 화면 전체 캡처
  DECK.slide({
    id: 'p1-ch00-s13', dur: 3.8,
    notes: '레이아웃 「화면 전체 캡처」. 그린 ChatGPT 화면을 크게 두고, 짚을 곳 하나를 표시 사각형과 짚는 이름표로 가리킨다. 키 누름 없음.',
    setup(el) {
      THEME.header(el, { chapter: 2, title: '실습: 한 줄 요청으로 민원 답변 받아 보기', fiction: true });
      this.t = THEME.title(el, '근거로 든 것이 공단 규정인가요?', { x: 120, y: 92, size: 52, at: 0.1 });
      this.sh = THEME.shot(el, null, { size: 'wide', x: 120, y: 196, at: 0.2, top: 'GPT-6',
        chat: [
          { who: 'user', text: '아래 민원에 답변을 써 줘.\n\n[누리집 민원 게시판]\n작성자: 김가람\n…' },
          { who: 'ai', text: '김가람님, 안녕하세요. 체육시설법 시행령의 중도 해지 기준에 따라 환불 금액은 34,000원입니다.' },
        ], chatOpts: { start: 0.5, think: 0.3 },
        marks: [{ x: 0.012, y: 0.5, w: 0.77, h: 0.205 }], markAt: 2.2 });
      this.co = THEME.callout(el, { from: [1058, 648], x: 1420, y: 648, text: '근거가 공단 규정이 아닌 일반 법령', at: 2.5, w: 400 });
    },
    render(lt) { this.t.render(lt); this.sh.render(lt); this.co.render(lt); },
  });

  // L7 요청문 크게
  DECK.slide({
    id: 'p1-ch00-s14', dur: 3,
    notes: '레이아웃 「요청문 크게」. 실습 단계 가운데 붙여 넣을 글이 핵심인 장. 요청문 원문을 36px 고정폭 글자로 큰 카드에 싣는다. 키 누름 없음.',
    setup(el) {
      this.bg = THEME.bg(el, 'lab', { floor: false });
      THEME.header(el, { chapter: 2, title: '실습: 한 줄 요청으로 민원 답변 받아 보기', fiction: true });
      this.stp = THEME.step(el, 1, 4, { x: 150, y: 330, at: 0.2 });
      this.t = THEME.title(el, '「요청 A」 글만 골라 복사합니다', { x: 560, y: 92, size: 52, at: 0.1 });
      this.k = THEME.card(el, { x: 120, y: 420, w: 380, at: 0.6, enter: 'slide', cap: '복사 키', html: '<div>Ctrl+C</div><div class="p1-dimtext">Mac은 ⌘+C</div>' });
      this.c = THEME.card(el, { x: 560, y: 196, w: 1240, at: 0.35, cap: '붙여 넣을 글 · lab1/단계.md 「요청 A」', html: '<div class="p1-prompt"></div>' });
      this.c.face.querySelector('.p1-prompt').textContent = REQ_A;
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.stp.render(lt); this.t.render(lt); this.k.render(lt); this.c.render(lt); },
  });

  // L8 확인 목록
  DECK.slide({
    id: 'p1-ch00-s15', dur: 3.2,
    notes: '레이아웃 「확인 목록」. 실습 확인 장. 확인할 항목 네 줄과 기대 값을 화면 폭 전체에 놓는다. 통과한 항목은 흰 블록이 선다. 키 누름 없음.',
    setup(el) {
      this.bg = THEME.bg(el, 'lab', { floor: false });
      THEME.header(el, { chapter: 5, title: '실습: 세 항목으로 다시 요청하기', fiction: true });
      this.t = THEME.title(el, '금액·조문·기한·이름을 확인합니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.cl = THEME.checklist(el, [
        { text: '환불 금액', note: '계산식이 함께 나온다', value: '34,000원' },
        { text: '근거 조문', note: '체육시설 이용 규정', value: '제7조 제1항 제2호' },
        { text: '지급 기한', note: '제8조 제2항', value: '7영업일' },
        { text: '이름·연락처', note: '답변에 나오지 않는다', value: '없음' },
      ], { x: 120, y: 250, w: 1680, rowH: 160, at: 0.5 });
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.t.render(lt); this.cl.render(lt); },
  });

  // L9 인물과 대사
  DECK.slide({
    id: 'p1-ch00-s16', dur: 3.4,
    notes: '레이아웃 「인물과 대사」. 인물 둘을 3배로 크게 세우고, 한 사람의 대사를 60px 카드에 싣는다. 키 누름 없음.',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [240, 560, 1500, 500], props: false, token: false });
      THEME.header(el, { chapter: 3, title: '같은 모델, 다른 결과', fiction: true });
      this.mb = THEME.figure(el, '오민석', { x: 1560, y: 720, at: 0.3, first: true, scale: 3 });
      this.dr = THEME.item(el, '답변 초안', { x: 1110, y: 800, w: 220, d: 170, at: 0.6, label: '답변 초안 · 반려', labelPos: 'below' });
      this.hs = THEME.figure(el, '한서윤', { x: 520, y: 850, at: 0.5, first: true, scale: 3 });
      this.cd = THEME.card(el, { x: 120, y: 170, w: 860, at: 1.1, enter: 'slide', cap: '한서윤 주임', text: '모델이 틀린 걸까요?' });
      this.cd.face.style.fontSize = '72px';
      this.cd.face.style.fontWeight = '700';
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.mb.render(lt); this.dr.render(lt); this.hs.render(lt); this.cd.render(lt); },
  });

  // L10 카드 격자
  DECK.slide({
    id: 'p1-ch00-s17', dur: 3,
    notes: '레이아웃 「카드 격자」. 번호 카드 셋을 한 줄로 세운다. 카드마다 큰 번호, 제목, 설명 한 줄. 키 누름 없음.',
    setup(el) {
      THEME.header(el, { chapter: 4, title: '일을 맡길 때 정하는 세 항목' });
      this.t = THEME.title(el, '요청에 정할 것은 세 항목입니다', { x: 120, y: 104, size: 72, at: 0.1 });
      this.tl = [['목적과\n결과물', '읽는 사람, 답변 형식'], ['참고 자료와\n제외 범위', '근거 자료, 답하지 않을 것'], ['완료 기준과\n승인 조건', '끝낼 기준, 발송 전 확인']]
        .map(([tt, tx], k) => THEME.tile(el, { x: 120 + k * 580, y: 290, w: 520, h: 470, n: k + 1, title: tt, text: tx, at: 0.5 + k * 0.18 }));
      this.n = h('div', 'a t-body', el, '세 항목을 적으면 모델이 <span class="p1-em">추측으로 채울 자리</span>가 줄어듭니다');
      css(this.n, { left: '120px', top: '850px' });
    },
    render(lt) { this.t.render(lt); this.tl.forEach(c => c.render(lt)); THEME.rise(this.n, lt, 1.3); },
  });

  // L11 표
  DECK.slide({
    id: 'p1-ch00-s18', dur: 3.2,
    notes: '레이아웃 「표」. 같은 요청 여섯 번의 결과를 행으로 놓고, 맨 아래 규정 행을 회청으로 칠해 견준다. 키 누름 없음.',
    setup(el) {
      THEME.header(el, { chapter: 3, title: '같은 모델, 다른 결과', fiction: true });
      this.t = THEME.title(el, '같은 요청을 6번 보낸 결과', { x: 120, y: 104, size: 64, at: 0.1 });
      const r = (n, a, b) => [String(n), a, b, '일반 법령·기준'];
      this.tb = THEME.table(el, [
        r(1, '웹 검색 사용', '3영업일 이내'), r(2, '웹 검색 사용', '3영업일 이내'), r(3, '웹 검색 사용', '3영업일 이내'),
        r(4, '앱 연결 검색 사용', '3영업일 이내'), r(5, '검색 안 함', '확인 후 안내'), r(6, '검색 안 함', '확인 후 안내'),
        { cells: ['규정', '체육시설 이용 규정', '신청일부터 7영업일 안', '제8조 제2항'], tone: 'slate' },
      ], { x: 120, y: 300, cols: [200, 500, 500, 480], head: ['실행', '검색', '지급 기한', '근거'], rowH: 72, gap: 10, at: 0.5 });
    },
    render(lt) { this.t.render(lt); this.tb.render(lt); },
  });

  // L12 퀴즈(키 한 번: 정답을 연다)
  DECK.slide({
    id: 'p1-ch00-s19', dur: 3.6, steps: [2.2],
    notes: '레이아웃 「퀴즈」. 보기 블록 셋이 놓이고, 키를 누르면 정답 블록 자리에서 코발트 기둥이 솟아 정답이 크게 붙고 다른 보기는 옅어진다. 키 한 번.',
    setup(el) {
      THEME.header(el, { chapter: 3, title: '같은 모델, 다른 결과' });
      this.t = THEME.title(el, '점수 차이는 몇 점이었을까요?', { x: 120, y: 104, size: 72, at: 0.1 });
      this.b = h('div', 'a t-body', el, '같은 모델이 같은 과제 15개를 풉니다.<br>한쪽에만 역할과 일하는 순서를 적어 뒀습니다.');
      css(this.b, { left: '120px', top: '206px', width: '1000px' });
      this.bg = THEME.bg(el, 'base', { floor: [240, 440, 1440, 520], props: false, token: false });
      this.qz = THEME.quiz(el, ['① 5점 안쪽', '② 10~20점', '③ 30점 가까이'], { y: 700, answer: 2, answerText: '29.8점 차이', revealAt: 2.2, at: 0.6 });
      this.s = src(el, '채점 기준: 결과물 10개 항목, 100점 만점 · 기존 과정 강사의 자체 측정', 975);
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.t.render(lt); THEME.rise(this.b, lt, 0.5); this.qz.render(lt); THEME.rise(this.s, lt, 1.2); },
  });

  // L13 기둥 비교(크게)
  DECK.slide({
    id: 'p1-ch00-s20', dur: 3.4,
    notes: '레이아웃 「기둥 비교」. 기둥 두 개를 화면 오른쪽 3분의 2에 크게 세우고 치수선 수치를 128px로 찍는다. 제목은 왼쪽 위 88px 두 줄. 키 누름 없음.',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [720, 240, 1160, 820], props: false, token: false });
      THEME.header(el, { chapter: 3, title: '같은 모델, 다른 결과' });
      this.t = THEME.title(el, '차이는 모델\n바깥에서 나왔습니다', { x: 120, y: 150, size: 88, w: 900, at: 0.1 });
      this.b = h('div', 'a t-body', el, '역할과 일하는 순서를<br>적어 둔 쪽이 높았습니다');
      css(this.b, { left: '120px', top: '400px', width: '560px' });
      const S = 7.0, A = { x: 900, y: 860 }, B = { x: 1280, y: 860 }, OFF = 200;
      this.a = THEME.block(el, { x: A.x, y: A.y, w: 200, d: 200, h: 49.5 * S, at: 0.4, grow: true, label: '하네스 없이', labelPos: 'below' });
      this.c = THEME.block(el, { x: B.x, y: B.y, w: 200, d: 200, h: 79.3 * S, tone: 'cobalt', at: 0.6, grow: true, label: '하네스를 갖추고', labelPos: 'below' });
      [this.a, this.c].forEach(b => { const tg = b.body.querySelector('.p1-tag'); if (tg) tg.style.fontSize = '34px'; });
      this.da = THEME.dim(el, '49.5', { from: [A.x - OFF, A.y], to: [A.x - OFF, A.y - 49.5 * S], unit: '점', side: 'left', size: 128, unitSize: 60, at: this.a.land + 0.1 });
      this.db = THEME.dim(el, '79.3', { from: [B.x + OFF, B.y], to: [B.x + OFF, B.y - 79.3 * S], unit: '점', side: 'right', size: 128, unitSize: 60, color: '#1E40B8', at: this.c.land + 0.1 });
      this.s = src(el, '기존 과정 강사의 자체 측정<br>과제 15개 평균, 코드 실행 없이 결과물만 채점', 900);
      this.s.style.width = '600px';
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.t.render(lt); THEME.rise(this.b, lt, 0.9); this.a.render(lt); this.c.render(lt); this.da.render(lt); this.db.render(lt); THEME.rise(this.s, lt, 1.8); },
  });

  // L2-1 한 문장 + 근거 칸
  DECK.slide({
    id: 'p1-ch00-s21', dur: 3.6,
    notes: '레이아웃 「한 문장」에 근거 칸 셋을 붙인 경우. 결론 문장 아래에 그 결론을 받치는 사실 셋을 한 줄로 놓는다. 키 누름 없음.',
    setup(el) {
      THEME.header(el, { chapter: 3, title: '같은 모델, 다른 결과', fiction: true });
      this.st = THEME.statement(el, '모델이 아니라\n요청이 비어 있었습니다', { em: ['요청이 비어'], size: 120, cy: 580,
        facts: [
          { label: '근거 자료 없음', text: '→ 체육시설법 시행령 등 일반 기준' },
          { label: '답변 형식 없음', text: '→ 매번 다른 형식' },
          { label: '개인정보 처리 없음', text: '→ 6번 모두 「김가람님」' },
        ] });
      this.s = src(el, '웹 검색 사용 4회 · 미사용 2회', 990);
    },
    render(lt) { this.st.render(lt); THEME.rise(this.s, lt, 2.4); },
  });

  // ══ 2026-11-24 2차: 보완한 부품과 새 레이아웃 「인물 줄」 ══

  // L17 인물 줄
  DECK.slide({
    id: 'p1-ch00-s22', dur: 3.2,
    notes: '레이아웃 「인물 줄」. 인물 넷을 2.8배로 한 줄에 세우고, 이름표(44px) 아래에 하는 일(34px)을 단다. 키 누름 없음.',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [120, 420, 1680, 600], props: false, token: false });
      THEME.header(el, { chapter: 1, title: '오늘 만드는 것과 새별시설공단 고객지원팀', fiction: true });
      this.t = THEME.title(el, '오늘 사례에 네 사람이 나옵니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.b = THEME.text(el, 't-body', '실습에서는 <span class="p1-em">한서윤 주임</span>의 일을 따라 합니다', 120, 196);
      this.fg = [['한서윤', '요청문을 쓰고 프로젝트를 만듭니다'], ['오민석', '답변 발송과 팀 사용을 승인합니다'],
        ['정하준', '입력해도 되는 자료를 확인합니다'], ['윤지영', '서비스 공개 여부를 정합니다']]
        .map(([who, role], k) => THEME.figure(el, who, { x: 300 + k * 440, y: 700, scale: 2.8, first: true, big: true, role, roleW: 330, at: 0.4 + k * 0.15 }));
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.t.render(lt); THEME.rise(this.b, lt, 0.5); this.fg.forEach(f => f.render(lt)); },
  });

  // L4 가로 순서 + 두께 있는 판(THEME.plate)
  DECK.slide({
    id: 'p1-ch00-s23', dur: 3.8,
    notes: '레이아웃 「가로 순서」에 두께 있는 판을 깐 경우(THEME.plate). 판이 먼저 내려앉고 단계 블록이 판 위에 놓인 뒤, 판 앞쪽 아래에 규칙 이름표가 붙는다. 키 누름 없음.',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [120, 380, 1680, 640], props: false, token: false });
      THEME.header(el, { chapter: 3, title: '같은 모델, 다른 결과', fiction: true });
      this.t = THEME.title(el, '순서와 규칙까지 정하면 하네스입니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.b1 = THEME.text(el, 't-body', '<b>워크플로:</b> 일의 순서를 미리 정합니다', 120, 196);
      const X0 = 527, A = 250, C = Math.cos(Math.PI / 6), X1 = X0 + 4 * A * C;
      this.pl = THEME.plate(el, { x0: X0, x1: X1, n: 3, y: 556, r: 230, T: 44, at: 0.3,
        labels: [{ text: '하네스', x: X0 - A * C * 0.9, size: 52, weight: 700, at: 0.7 },
          { text: '공단 규정만 근거', x: X0 + A * C, at: 2.3 }, { text: '조문 확인', x: X0 + 3 * A * C, at: 2.42 }, { text: '발송 전 승인', x: X0 + 5 * A * C, at: 2.54 }] });
      this.sq = THEME.sequence(el, [{ label: '규정 찾기', tone: 'cobalt' }, { label: '답변 작성', tone: 'cobalt' }, { label: '원문 대조', tone: 'cobalt' }],
        { x0: X0, x1: X1, y: this.pl.top, size: 200, h: 80, at: 0.7, token: false });
      this.fl = THEME.flow(el, [[0, 0], [0, -A], [A, -A], [A, -2 * A], [2 * A, -2 * A]], { x: X0, y: this.pl.top + 150, at: 1.45, speed: 1300, line: false });
      this.b2 = THEME.text(el, 't-body', '<b>하네스:</b> 지침·도구·기록·검증·권한을 정합니다', 120, 914);
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.t.render(lt); THEME.rise(this.b1, lt, 0.75); this.pl.render(lt); this.sq.render(lt); this.fl.render(lt); THEME.rise(this.b2, lt, 2.8); },
  });

  // L5 세로 층 + 점선 빈 층 + 낱말 치수선
  DECK.slide({
    id: 'p1-ch00-s24', dur: 3.2,
    notes: '레이아웃 「세로 층」에서 아래 두 층을 점선 빈 층(tone ghost)으로 두고, 왼쪽에 낱말 치수선(font body) 둘을 단 경우. 키 누름 없음.',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [300, 360, 1500, 700], props: false, token: false });
      THEME.header(el, { chapter: 3, title: '같은 모델, 다른 결과' });
      this.t = THEME.title(el, '요청 말고 모델 바깥에도 정할 것이 있습니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.ln = THEME.lines(el, ['<b>생성형 AI:</b> 묻는 말에 답을 만듭니다', '<b>에이전트:</b> 도구를 쓰고 다음 할 일을 정합니다'], { x: 120, y: 196, w: 1000, gap: 0 });
      const X = 1000, Y = 695, HH = 60;
      this.st = THEME.stack(el, [
        { tone: 'ghost', h: HH }, { tone: 'ghost', h: HH },
        { label: '에이전트', note: '금액이 안 맞으면\n조문을 다시 찾음', h: HH },
        { label: '도구', note: '웹 검색, 파일 열기,\n코드로 계산', h: HH },
        { label: '모델', note: '받은 글을 보고\n답을 만듦', tone: 'cobalt', h: HH },
      ], { x: X, y: Y, w: 570, shrink: 80, at: 0.3, each: 0.15, labelX: 1520, tagSize: 44, noteSize: 34, labelGap: 150 });
      const yTop = Y - HH * 5, yModel = Y - HH * 4, yAgent = Y - HH * 2;
      this.d1 = THEME.dim(el, '생성형 AI', { from: [400, yModel], to: [400, yTop], side: 'left', size: 52, font: 'body', at: 1.75 });
      this.d2 = THEME.dim(el, '에이전트', { from: [480, yAgent], to: [480, yTop], side: 'left', size: 52, font: 'body', pos: 0.22, at: 2.15 });
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.t.render(lt); this.ln.forEach((l, i) => THEME.rise(l, lt, 1.1 + i * 0.15)); this.st.render(lt); this.d1.render(lt); this.d2.render(lt); },
  });

  // L12 표: 행 묶음 색, 묶음 사이 간격, 칸 안 둘째 줄
  DECK.slide({
    id: 'p1-ch00-s25', dur: 3.1,
    notes: '레이아웃 「표」에서 값이 같은 행끼리 색으로 묶고(groupGap), 규정 행에 칸 안 둘째 줄(sub)을 단 경우. 키 누름 없음.',
    setup(el) {
      THEME.header(el, { chapter: 3, title: '같은 모델, 다른 결과', fiction: true });
      this.t = THEME.title(el, '모델은 확률로 답합니다', { x: 120, y: 104, size: 72, at: 0.1 });
      this.ln = THEME.lines(el, ['다음에 올 그럴듯한 말을<br>골라 이어 씁니다', '정하지 않은 것은<br><span class="p1-em">추측</span>으로 채웁니다', '추측은 실행할 때마다<br>달라집니다'], { x: 120, y: 262, w: 560, gap: 44 });
      this.cap = THEME.text(el, 'p1-tag', '같은 요청 6번 · 지급 기한', 740, 196);
      this.cap.style.fontSize = '34px';
      const r = (n, v, tn) => ({ cells: [String(n), v], tone: tn });
      this.tb = THEME.table(el, [r(1, '3영업일 이내'), r(2, '3영업일 이내'), r(3, '3영업일 이내'), r(4, '3영업일 이내'),
        r(5, '확인 후 안내', 'amber'), r(6, '확인 후 안내', 'amber'),
        { cells: ['규정', { text: '신청일부터 7영업일 안', sub: '체육시설 이용 규정 제8조 제2항', size: 52, subSize: 30 }], tone: 'slate', h: 112, size: 44 }],
        { x: 740, y: 314, cols: [200, 860], head: ['실행', '지급 기한'], rowH: 74, gap: 8, size: 42, groupGap: 20, at: 0.85 });
      this.s = THEME.text(el, 't-small p1-dimtext', '웹 검색 사용 4회 · 미사용 2회', 120, 896, 600);
    },
    render(lt) { this.t.render(lt); this.ln.forEach((l, i) => THEME.rise(l, lt, 0.45 + i * 0.15)); THEME.rise(this.cap, lt, 0.7, 16); this.tb.render(lt); THEME.rise(this.s, lt, 2.25, 16); },
  });

  // L8 확인 목록: 점선 블록(todo)과 빈 값 칸
  DECK.slide({
    id: 'p1-ch00-s26', dur: 3,
    notes: '레이아웃 「확인 목록」에서 아직 채우지 않은 줄(todo)과 빈 값 칸(value: \'\')을 쓴 경우. 블록과 값 칸은 떨어지지 않고 점선이 그어진다. 키 누름 없음.',
    setup(el) {
      this.bg = THEME.bg(el, 'accent', { floor: false, bx: 1880, by: 1180 });
      THEME.header(el, { chapter: 3, title: '같은 모델, 다른 결과', fiction: true });
      this.t = THEME.title(el, '요청에 무엇을 적어야 할까요?', { x: 120, y: 104, size: 72, at: 0.1 });
      this.req = THEME.text(el, 'p1-tag p1-mono', '아래 민원에 답변을 써 줘.', 120, 196);
      css(this.req, { fontSize: '36px', fontWeight: '500', transformOrigin: '50% 100%' });
      this.cl = THEME.checklist(el, [
        { text: '근거 자료', note: '어느 규정으로 답할지', state: 'todo', value: '' },
        { text: '답변 형식', note: '어떤 칸에 나눠 쓸지', state: 'todo', value: '' },
        { text: '개인정보 처리', note: '이름·연락처를 어떻게 할지', state: 'todo', value: '' },
      ], { x: 120, y: 262, w: 1600, rowH: 172, box: 116, boxH: 40, textX: 250, textSize: 60, noteSize: 38, at: 0.9 });
      this.cd = THEME.card(el, { x: 120, y: 800, w: 1200, at: 1.75, enter: 'drop', cap: '다음 질문', text: '추측으로 채우지 않게 하려면 요청에 무엇을 적어야 하는가' });
      css(this.cd.face, { fontSize: '44px', fontWeight: '600' });
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.t.render(lt); THEME.dropEl(this.req, lt, 0.45, 160); this.cl.render(lt); this.cd.render(lt); },
  });

  // L11 카드 격자: 카드 맨 위 그림(img)
  DECK.slide({
    id: 'p1-ch00-s27', dur: 3,
    notes: '레이아웃 「카드 격자」에서 카드 맨 위에 16:9 그림을 넣은 경우(tile 의 img). 파트마다 대표 그림 한 장과 질문. 키 누름 없음.',
    setup(el) {
      THEME.header(el, { chapter: 1, title: '오늘 만드는 것과 새별시설공단 고객지원팀' });
      this.t = THEME.title(el, '파트마다 질문 하나에 답합니다', { x: 120, y: 104, size: 72, at: 0.1 });
      this.tl = [['p1/p1-key-intro.jpg', '파트 1', '같은 AI, 왜 결과가\n다른가'], ['p2/p2-key-intro.jpg', '파트 2', '규정으로 답하는 상담을\n만들 수 있는가'], ['p3/p3-key-intro.jpg', '파트 3', '서비스로 넓히려면\n누가 무엇을 하는가']]
        .map(([im, tt, tx], k) => THEME.tile(el, { x: 120 + k * 580, y: 250, w: 520, h: 640, img: '../assets/img/' + im, title: tt, text: tx, tone: k === 0 ? 'cobalt' : undefined, at: 0.4 + k * 0.18 }));
      this.n = THEME.text(el, 't-body', '파트가 바뀌면 화면 테마도 바뀝니다', 120, 960);
    },
    render(lt) { this.t.render(lt); this.tl.forEach(c => c.render(lt)); THEME.rise(this.n, lt, 1.3); },
  });
})();
