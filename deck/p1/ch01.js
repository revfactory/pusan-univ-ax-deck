/* 파트 1 · 1장 「오늘 만드는 것과 새별시설공단 고객지원팀」 장면 코드. 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다.
 * 원고: plan/slides/p1-ch01.json. 레이아웃 배정: plan/assets/p1_layout_ch01.md. 테마 부품: themes/p1.js. 본보기: p1/ch00.js
 * 장마다 레이아웃이 다르다: 자료 내려받기(실습 화면과 안내) → 영상 제목 → 사례 장면 → 큰 숫자 → 인물 줄 → 카드 격자 → 표 → 확인 목록 → 인물과 대사.
 * 키 누름은 없다. 모든 장이 키 없이 3~4초 안에 끝 상태가 된다. */
(function () {
  'use strict';
  const { ease, prog, css, h, s } = REEL;
  DECK.config({ part: 'p1', chapter: 'ch01', title: '오늘 만드는 것과 새별시설공단 고객지원팀' });

  const CH_TITLE = '오늘 만드는 것과 새별시설공단 고객지원팀';
  const CH = { chapter: 1, title: CH_TITLE };
  const FIC = Object.assign({ fiction: true }, CH);
  const C30 = Math.cos(Math.PI / 6);
  const rise = THEME.rise;
  // 등각 좌표(ix 오른쪽 아래 30°, iy 왼쪽 아래 30°)를 기준점 O 에서 화면 좌표로
  const at = (O, ix, iy) => { const [dx, dy] = THEME.iso(ix, iy, 0); return [O[0] + dx, O[1] + dy]; };
  // 블록 이름표 글자 크기를 바꾼다(보조 줄 크기는 따로)
  const tagSize = (b, size, small) => {
    const t = (b.body || b.el).querySelector('.p1-tag');
    if (!t) return null;
    css(t, { fontSize: size + 'px' });
    const sm = t.querySelector('small');
    if (sm && small) css(sm, { fontSize: small + 'px' });
    return t;
  };

  const NOTES = {
    s07a: '앞 화면에서 말한 실습 묶음은 이 주소에서 받고, 파일이 약 130MB라 받는 데 시간이 걸릴 수 있습니다. 주소는 github.com 슬래시 revfactory 슬래시 pusan-univ-ax-deck이고, 공개 저장소라 GitHub 로그인 없이 받을 수 있습니다. 초록색 「Code」 단추를 누르고 맨 아래 「Download ZIP」을 누르면 pusan-univ-ax-deck-main.zip 파일을 받습니다. 압축을 풀면 생기는 pusan-univ-ax-deck-main 폴더 안의 labs 폴더가 실습 묶음이고, 그 안의 lab1/단계.md를 앞 화면에서 안내한 방법으로 엽니다. 내려받기가 안 되거나 압축이 풀리지 않으면 강사에게 알려 주시고, 그동안은 강사 화면을 따라 하시면 됩니다.',
    s01:'안녕하십니까. 오늘 과정의 제목은 「에이전트 팀이 만들고 사람이 승인한다」이고, 이 문장이 오늘 하루의 결론입니다. 에이전트는 제목 아래 적은 대로 도구를 쓰고 그 결과를 보고 다음 행동을 정하는 AI이며, 파트 1의 3장에서 자세히 다룹니다. 화면의 질문, 오늘 무엇을 만드시는지는 사례와 등장인물을 소개한 뒤 여섯 번째 화면의 산출물 다섯 가지로 답하겠습니다. 먼저 오늘 하루 내내 쓰는 사례부터 보겠습니다.',
    s02: '오늘 하루 내내 쓰는 사례입니다. 새별시설공단은 가상의 도시 새별시가 세운 가상의 지방공기업이고, 체육센터와 공영주차장, 문화센터를 운영합니다. 고객지원팀 한서윤 주임은 누리집 민원 게시판과 전화로 들어온 수강료 환불, 주차 요금 감면, 대관 문의에 규정을 찾아 답변 초안을 씁니다. 화면 아래 문구대로 기관, 인물, 규정, 수치는 모두 실습용으로 만든 가상 사례입니다. 민원이나 문의에 답변을 써 보신 분은 손을 들어 주십시오.',
    s03: '새별시설공단에는 2026년 3분기에 민원 240건이 들어왔습니다. 실습 묶음의 가상 접수 목록에 있는 숫자이고, 파트 2에서 이 목록을 직접 분석합니다. 한서윤 주임은 민원마다 규정을 찾아 답변 초안을 쓰고, 팀장 확인을 거쳐 발송합니다. 오민석 팀장의 지시가 나옵니다. 답변 초안 작성 시간을 줄일 방법을 2주 뒤에 보고하라는 지시입니다.',
    s04: '오늘 사례에는 네 사람이 나옵니다. 여러분은 한서윤 주임을 따라가며 요청문을 쓰고, 프로젝트를 만들고, 시험하고, 승인을 요청합니다. 오민석 팀장은 답변 발송과 프로젝트의 팀 사용을 승인하고, 정보화팀 정하준 대리는 입력해도 되는 자료와 오픈 전 점검 항목을 확인합니다. 윤지영 본부장은 민원인에게 공개하는 서비스의 추진 여부를 정합니다. 파트가 바뀌어 화면 모양이 달라져도 말풍선, 도장, 자물쇠, 깃발 기호로 같은 사람을 알아볼 수 있습니다.',
    s05: '오늘은 세 파트로 진행하고, 파트마다 질문 하나에 답합니다. 파트 1의 질문은 「같은 ChatGPT에 같은 민원 답변을 시켰는데 왜 결과가 달랐는가」이고, 잠시 뒤 2장 실습에서 직접 겪어 봅니다. 파트 2에서는 규정을 근거로 답하고 규정에 없으면 담당자에게 넘기는 민원 상담을 ChatGPT Plus만으로 만들 수 있는지 확인합니다. 파트 3에서는 그 상담을 민원인이 누리집에서 쓰는 서비스로 넓힐 때 무엇이 더 필요하고 누가 하는지 봅니다. 파트가 바뀌면 화면의 색과 모양이 바뀌니, 화면이 바뀌면 다음 질문으로 넘어갔다는 뜻입니다.',
    s06: '오늘 여러분이 직접 만들어 가져가는 산출물은 다섯 가지이고, 행마다 무엇인지 한 줄씩 적었습니다. 프로젝트는 ChatGPT에서 지침과 파일을 한곳에 묶어 두고 새 대화마다 함께 쓰는 기능이며, 파트 2에서 직접 만듭니다. 호박색 두 행은 사람의 승인이 담긴 산출물이고, 앞 실습의 결과가 다음 실습에 쓰이니 못 끝낸 단계는 실습 묶음의 완성본으로 이어 가면 됩니다. 다섯 가지 모두 ChatGPT Plus로 만들고, 시연 4개는 강사가 실행하는 화면을 보기만 하므로 여러분 컴퓨터에 설치할 것은 없습니다. 시연은 파트 1에 하나, 파트 2에 하나, 파트 3에 두 개가 있고, 쓰는 도구는 시연하는 장에서 소개합니다.',
    s07: '웹 브라우저로 ChatGPT에 로그인해 계정이 Plus인지 확인하고, Plus가 아니거나 확인할 곳을 모르면 손을 들어 주십시오. Free·Go 계정은 2026년 11월 기준으로 웹에서 Work와 Sites를 쓸 수 없습니다. 실습 묶음은 제가 안내하는 방법으로 받아 압축 파일이면 풀어서 내 컴퓨터에 두고, lab1 폴더를 엽니다. 단계.md는 파일을 오른쪽 클릭하고 「연결 프로그램」에서 메모장(macOS는 텍스트 편집기)을 골라 엽니다. 「요청 A」가 보이면 손을 들어 주시고, 묶음을 받지 못한 분은 강사 화면을 따라 하시면 됩니다.',
    s08: '보고까지 2주가 남았습니다. 한서윤 주임은 우선 민원 글을 ChatGPT에 붙여 넣고, 그 위에 「아래 민원에 답변을 써 줘.」 한 줄만 적어 보기로 합니다. 이 요청이 방금 연 lab1/단계.md의 「요청 A」이고, 바로 이어지는 2장에서 여러분도 그대로 복사해 ChatGPT에 붙여 넣습니다. 파란 블록은 AI가 맡은 일이고, 점선 블록은 아직 나오지 않은 답변 초안입니다. 한 줄로 요청하면 어떤 답이 나오고 옆 사람과 같은지, 2장에서 직접 확인하겠습니다.',
  };

  // ── s01 과정 첫 화면·파트 1 인트로(L0 영상 제목): 영상 p1-intro 정방향, 왼쪽 판 y 140~900 ──
  // 판 안 순서: 꼬리표, 88px 제목 두 줄, 34px 에이전트 풀이, 40px 질문, 구분선, 30px 과정명·날짜
  DECK.slide({
    id: 'p1-ch01-s01', dur: 3.6,
    notes: NOTES.s01,
    setup(el) {
      // 영상 바탕색(#D7E0DF)이 대표 그림 바탕색과 달라서, 줄인 영상 바깥을 영상 바탕색으로 채운다
      this.vt = THEME.videoTitle(el, {
        kind: 'intro', scene: 'intro', fitBg: '#D7E0DF',
        src: '../assets/video/p1/p1-intro.mp4', poster: '../assets/video/p1/p1-intro.jpg',
        kicker: '파트 1 · 같은 AI, 다른 결과: 일을 맡기는 구조',
        title: '에이전트 팀이 만들고\n사람이 승인한다',
        sub: '오늘 하루 동안 무엇을 만드는가',
      });
      const panel = this.vt.title.el.parentNode;
      const sub = panel.querySelector('.p1-vt-sub'), kick = panel.querySelector('.p1-vt-kicker');
      css(panel, { padding: '60px 52px 60px' });
      css(kick, { marginBottom: '30px' });
      // 판 안에 두 요소를 더한다: 제목 아래 풀이 한 줄, 질문 아래 구분선과 과정명·날짜
      this.gloss = h('div', '', null, '<span class="p1-em">에이전트:</span> 도구를 쓰고 결과를 보고 다음 행동을 정하는 AI');
      panel.insertBefore(this.gloss, sub);
      css(this.gloss, { position: 'relative', marginTop: '34px', font: '400 34px/1.4 var(--body)', color: 'var(--ink)' });
      css(sub, { marginTop: '40px' });
      this.course = h('div', '', panel, '<div>공공기관 AX 업무혁신 전문가과정</div><div>2026-11-27 · 부산대학교 경제통상관 L103호</div>');
      css(this.course, { position: 'relative', marginTop: '48px', paddingTop: '30px', borderTop: '1.5px solid var(--line)',
        font: '400 30px/1.45 var(--body)', color: 'var(--dim)' });
      // 판이 y 140 에서 시작해 y 900 근처에서 끝나도록, 모자라는 높이를 세 간격에 나눠 더한다
      const TOP = 140, BOT = 900;
      const extra = Math.max(0, (BOT - TOP) - panel.offsetHeight);
      if (extra > 0) {
        const add = Math.floor(extra / 3);
        css(this.gloss, { marginTop: (34 + add) + 'px' });
        css(sub, { marginTop: (40 + add) + 'px' });
        css(this.course, { marginTop: (48 + extra - 2 * add) + 'px' });
      }
      // 늘어난 판 높이로 판 그림(앞면·오른면)과 세로 자리를 다시 맞춘다
      const PW = 1180, PH = panel.offsetHeight, dx = 14 * C30, dy = 7;
      css(panel, { top: TOP + 'px' });
      const polys = panel.querySelector(':scope > svg').querySelectorAll('polygon');
      polys[0].setAttribute('points', `0,0 ${PW},0 ${PW},${PH} 0,${PH}`);
      polys[1].setAttribute('points', `${PW},0 ${(PW + dx).toFixed(1)},${-dy} ${(PW + dx).toFixed(1)},${PH - dy} ${PW},${PH}`);
      this.words = Array.from(sub.querySelectorAll('.w'));
    },
    render(lt, ctx) {
      this.vt.render(lt, ctx);
      // 제목이 다 맞물리면 풀이 → 질문(단어별) → 과정명·날짜 순서로 올라온다
      const T = this.vt.title.end;
      rise(this.gloss, lt, T - 0.05);
      const q0 = T + 0.3;
      this.words.forEach((w, i) => { const q = prog(lt, q0 + i * 0.04, 0.45, ease.snap); w.style.transform = `translateY(${((1 - q) * 110).toFixed(1)}%)`; });
      rise(this.course, lt, q0 + this.words.length * 0.04 + 0.25);
    },
  });

  // ── s02 이야기(L10 사례 장면): 뒤쪽 시설 블록 셋, 가운데 민원 창구 누끼, 왼쪽 한서윤 주임. 서류 토큰 셋이 창구 앞까지 온다 ──
  // 기준점 C = 창구 바닥 가운데. 창구는 긴 쪽이 iy 축(오른쪽 위 ↔ 왼쪽 아래)이고 보이는 긴 면이 +ix 쪽(오른쪽 아래)이다.
  // 시설은 창구 뒤 iy -380 에 ix 축으로 줄지어 놓고, 토큰은 시설 앞(iy -310)에서 ix 축을 따라 ix 110 까지 간 뒤 iy 축을 따라 창구 앞에서 멈춘다
  DECK.slide({
    id: 'p1-ch01-s02', dur: 3.6,
    notes: NOTES.s02,
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [760, 180, 1120, 720], props: false, token: false });
      THEME.header(el, FIC);
      this.ttl = THEME.title(el, '한서윤 주임은\n민원 답변 초안을 씁니다', { x: 120, y: 190, size: 72, w: 900, at: 0.1 });
      this.body = THEME.lines(el, ['가상 기관 새별시설공단<br>고객지원팀', '입사 4년 차,<br>개발 경험은 없습니다'], { x: 120, y: 390, w: 620, gap: 24 });
      this.body.forEach(l => css(l, { fontSize: '46px' }));
      const C = [1190, 630];
      // 뒤(시설) → 서류 토큰 → 앞(민원 창구, 인물) 순서로 층을 깐다
      const back = h('div', 'full', el), mid = h('div', 'full', el), front = h('div', 'full', el);
      const FX = [-220, 20, 260];
      this.fac = [['새별체육센터', FX[0]], ['공영주차장', FX[1]], ['새별문화센터', FX[2]]].map(([name, ix], i) => {
        const [x, y] = at(C, ix, -380);
        const b = THEME.block(back, { x, y, w: 130, d: 100, h: 84, at: 0.6 + i * 0.14, label: name, pin: 24 });
        tagSize(b, 40);
        return b;
      });
      // 토큰 셋: 먼 자리(iy 90)부터 채워 뒤 토큰이 앞 토큰을 지나지 않게 한다
      const ends = [90, -20, -130];
      this.flows = FX.map((ix, i) => THEME.flow(mid, [[ix, -310], [110, -310], [110, ends[i]]],
        { x: C[0], y: C[1], at: 1.45 + i * 0.26, speed: 1000 }));
      this.ct = THEME.cutout(front, 'p1-key-counter', { src: '../assets/img/p1/p1-key-counter_cut.png', x: C[0], y: C[1], size: 420, at: 1.0,
        label: '민원 창구', note: '누리집 게시판·전화 문의', labelPos: 'below' });
      tagSize(this.ct, 40, 38);
      const [hx, hy] = at(C, -260, 140);
      this.hs = THEME.figure(front, '한서윤', { x: hx, y: hy, scale: 2.2, big: true, first: true, at: 1.14 });
      tagSize(this.hs, 44, 38);
      this.card = THEME.card(el, { x: 120, y: 900, w: 1680, at: 2.65, enter: 'slide', pad: '20px 34px',
        text: '이 강의에 나오는 새별시설공단, 새별시, 등장인물, 규정, 민원, 수치는 모두 실습을 위해 만든 가상 사례입니다. 실제 기관이나 인물과 관계가 없습니다.' });
      css(this.card.face, { fontSize: '36px', lineHeight: '1.4' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.ttl.render(lt);
      this.body.forEach((l, i) => rise(l, lt, 0.75 + i * 0.15));
      this.fac.forEach(b => b.render(lt));
      this.flows.forEach(f => f.render(lt));
      this.ct.render(lt); this.hs.render(lt);
      this.card.render(lt);
    },
  });

  // ── s03 이야기(L2 큰 숫자): 왼쪽 420px 「240건」과 세로 치수선, 오른쪽 오민석 팀장의 지시 카드와 2.4배 인물 ──
  DECK.slide({
    id: 'p1-ch01-s03', dur: 3.2,
    notes: NOTES.s03,
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [1160, 520, 720, 520], props: false, token: false });
      THEME.header(el, FIC);
      this.ttl = THEME.title(el, '초안 작성 시간을 줄일 방법을 찾습니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.bn = THEME.bigNum(el, '240', { unit: '건', x: 160, y: 200, at: 0.55,
        label: '민원 글 · 2026년 3분기 접수 · 가상', note: '민원마다 규정을 찾아 초안을 씁니다' });
      const note = this.bn.el.querySelector('.p1-big-note');
      if (note) css(note, { color: 'var(--ink)' });
      this.mb = THEME.figure(el, '오민석', { x: 1560, y: 800, scale: 2.4, big: true, first: true, at: 1.55 });
      this.cd = THEME.card(el, { x: 1200, y: 236, w: 620, at: 1.95, enter: 'slide', cap: '오민석 팀장의 지시',
        text: '답변 초안 작성 시간을 줄일 방법을 2주 뒤에 보고하세요.' });
      css(this.cd.face, { fontSize: '44px', lineHeight: '1.38', fontWeight: '600' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.ttl.render(lt);
      this.bn.render(lt);
      this.mb.render(lt);
      this.cd.render(lt);
    },
  });

  // ── s04 도식(L17 인물 줄): 네 사람을 2.8배로 바닥 y 650 에 x 120~1800 폭으로 세운다. 이름표는 이름 48px, 소속·하는 일 38px, 폭 352 로 같게 ──
  DECK.slide({
    id: 'p1-ch01-s04', dur: 3.0,
    notes: NOTES.s04,
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [120, 360, 1680, 600], props: false, token: false });
      THEME.header(el, FIC);
      this.t = THEME.title(el, '오늘 사례에 네 사람이 나옵니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.b = THEME.text(el, 't-body', '실습에서는 <span class="p1-em">한서윤 주임</span>의 일을 따라 합니다', 120, 196);
      this.fg = [['한서윤', '요청문을 쓰고 프로젝트를 만듭니다'], ['오민석', '답변 발송과 팀 사용을 승인합니다'],
        ['정하준', '입력해도 되는 자료를 확인합니다'], ['윤지영', '서비스 공개 여부를 정합니다']]
        .map(([who, role], k) => {
          const f = THEME.figure(el, who, { x: 324 + k * 424, y: 650, scale: 2.8, first: true, big: true, role, roleW: 352, at: 0.6 + k * 0.15 });
          const t = tagSize(f, 48, 38);
          const rl = t && t.querySelector('.p1-role');
          if (rl) css(rl, { fontSize: '38px' });
          return f;
        });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      rise(this.b, lt, 0.5);
      this.fg.forEach(f => f.render(lt));
    },
  });

  // ── s05 도식(L11 카드 격자): 파트마다 대표 그림 카드 한 장. 파트 1 카드만 코발트 ──
  // 대표 그림은 구조물이 오른쪽에 작게 있어서, 카드 맨 위 그림 칸(4:3)에 구조물 부분을 잘라 넣는다.
  // crop: [보이는 가운데 x 비율, 가운데 y 비율, 보이는 폭 비율]
  DECK.slide({
    id: 'p1-ch01-s05', dur: 3.0,
    notes: NOTES.s05,
    setup(el) {
      THEME.header(el, CH);
      this.t = THEME.title(el, '파트마다 질문 하나에 답합니다', { x: 120, y: 104, size: 72, at: 0.1 });
      const parts = [
        ['p1/p1-key-intro.jpg', '파트 1', '같은 AI, 왜 결과가\n다른가', [0.75, 0.48, 0.5], 1351],
        ['p2/p2-key-intro.jpg', '파트 2', '규정으로 답하는 상담을\n만들 수 있는가', [0.71, 0.52, 0.58], 1352],
        ['p3/p3-key-intro.jpg', '파트 3', '서비스로 넓히려면\n누가 무엇을 하는가', [0.5, 0.5, 0.7], 1351],
      ];
      const IH = 360;
      this.tl = parts.map(([src, tt, tx, cr, nh], k) => {
        const c = THEME.tile(el, { x: 120 + k * 570, y: 250, w: 540, h: 670, title: tt, text: tx, tone: k === 0 ? 'cobalt' : undefined, at: 0.45 + k * 0.18 });
        const ct = c.face.querySelector('.p1-tile-t'), cx = c.face.querySelector('.p1-tile-x');
        if (ct) css(ct, { fontSize: '52px' });
        if (cx) css(cx, { fontSize: '40px' });
        const plate = h('div', '', null);
        c.face.insertBefore(plate, c.face.firstChild);
        css(plate, { position: 'relative', width: '100%', height: IH + 'px', overflow: 'hidden', boxSizing: 'border-box',
          border: '1.5px solid var(--edge)', marginBottom: '26px', background: '#E9EDF1' });
        const PW = plate.clientWidth, dw = PW / cr[2], dh = dw * nh / 2400;
        const left = Math.min(0, Math.max(PW - dw, PW / 2 - cr[0] * dw)), top = Math.min(0, Math.max(IH - dh, IH / 2 - cr[1] * dh));
        const im = REEL.img('../assets/img/' + src);
        css(im, { position: 'absolute', left: left.toFixed(1) + 'px', top: top.toFixed(1) + 'px', width: dw.toFixed(1) + 'px', height: dh.toFixed(1) + 'px' });
        plate.appendChild(im);
        return c;
      });
      this.n = THEME.text(el, 't-body', '파트가 바뀌면 화면 테마도 바뀝니다', 120, 950);
      css(this.n, { fontSize: '44px' });
    },
    render(lt) {
      this.t.render(lt);
      this.tl.forEach(c => c.render(lt));
      rise(this.n, lt, 1.25);
    },
  });

  // ── s06 개념(L12 표): 산출물 다섯 행. 칸은 파트 · 산출물 · 한 줄 풀이. 사람의 승인이 담긴 두 행은 호박 ──
  DECK.slide({
    id: 'p1-ch01-s06', dur: 2.8,
    notes: NOTES.s06,
    setup(el) {
      THEME.header(el, CH);
      this.t = THEME.title(el, '오늘 만드는 산출물은 다섯 가지입니다', { x: 120, y: 104, size: 72, at: 0.1 });
      this.ln = [THEME.text(el, 't-body', '다섯 가지 모두 ChatGPT Plus로 만듭니다', 120, 196),
        THEME.text(el, 't-body', '강사 시연 4개는 보기만 하고 설치가 필요 없습니다', 120, 250)];
      const P = n => ({ text: '파트 ' + n, size: 40 }), N = t => ({ text: t, size: 48 }), X = t => ({ text: t, size: 38 });
      this.tb = THEME.table(el, [
        { cells: [P(1), N('세 항목 요청문'), X('목적, 자료, 완료 기준을 적은 요청문')] },
        { cells: [P(2), N('민원 상담 프로젝트'), X('규정 파일로 답하는 ChatGPT 프로젝트')], gap: 24 },
        { cells: ['', N('시험 기록과 승인 기록'), X('시험 12개 결과와 팀장 판정')], tone: 'amber' },
        { cells: [P(3), N('민원 안내 화면'), X('수강료 환불·주차 감면 계산 화면')], gap: 24 },
        { cells: ['', N('내 업무의 승인 지점 표'), X('AI에 맡길 일과 사람이 승인할 곳')], tone: 'amber' },
      ], { x: 120, y: 330, cols: [200, 640, 840], rowH: 100, gap: 10, at: 0.6, each: 0.1 });
      // 칸 글자: 파트 이름은 600(숫자만 코발트 고정폭), 산출물 이름은 700, 풀이는 400
      this.tb.rows.forEach(r => {
        const cells = r.face.querySelectorAll('.p1-tgrid > div');
        const pm = cells[0] && cells[0].querySelector('.p1-tc-m');
        if (pm) { const n = pm.textContent.replace(/\D/g, ''); pm.innerHTML = `파트 <b>${n}</b>`; css(pm, { fontWeight: '600' });
          css(pm.querySelector('b'), { font: '700 42px/1 var(--num)', color: 'var(--accent)' }); }
        const nm = cells[1] && cells[1].querySelector('.p1-tc-m');
        if (nm) css(nm, { fontWeight: '700' });
        const tx = cells[2] && cells[2].querySelector('.p1-tc-m');
        if (tx) css(tx, { fontWeight: '400' });
      });
      // 범례: 호박 작은 블록과 34px 글. 첫 호박 행(행 3)이 들어온 뒤 0.2초에 떨어진다
      const legAt = this.tb.rows[2].land + 0.2;
      this.leg = THEME.block(el, { x: 1330, y: 252, w: 40, d: 40, h: 30, tone: 'amber', drop: 120, at: legAt });
      this.legT = THEME.text(el, 'p1-side', '사람의 승인이 담긴 산출물', 1384, 206);
      this.legAt = this.leg.land + 0.05;
    },
    render(lt) {
      this.t.render(lt);
      this.ln.forEach((l, i) => rise(l, lt, 0.4 + i * 0.12));
      this.tb.render(lt);
      this.leg.render(lt);
      rise(this.legT, lt, this.legAt);
    },
  });

  // ── s07 실습 준비 확인(L8 확인 목록): 바탕 lab, 단계 블록 「준비」, 확인할 세 줄을 크게, 아래 안내 카드 ──
  DECK.slide({
    id: 'p1-ch01-s07', dur: 2.8,
    notes: NOTES.s07,
    setup(el) {
      this.bg = THEME.bg(el, 'lab', { floor: false });
      THEME.header(el, CH);
      this.stp = THEME.step(el, 1, 1, { x: 140, y: 160, at: 0.1 });
      const txt = this.stp.el.querySelector('.p1-step-txt');
      txt.innerHTML = '<b>준비</b>';
      css(txt.querySelector('b'), { font: '700 34px/1 var(--body)' });
      // 단계가 하나뿐이라 블록 옆면의 단계 번호는 원고에 없는 글자가 된다. 번호를 숨긴다
      this.stp.el.querySelectorAll('.p1-step-no').forEach(n => { n.style.display = 'none'; });
      this.t = THEME.title(el, '로그인과 실습 묶음을 확인합니다', { x: 300, y: 104, size: 64, at: 0.15 });
      this.b = THEME.text(el, 't-body', '프로그램 설치·API 키·결제는 필요 없습니다', 120, 196);
      this.cl = THEME.checklist(el, [
        { text: 'ChatGPT Plus 로그인', note: '웹 브라우저 · Plus 플랜', state: 'todo' },
        { text: '실습 묶음 받기', note: '자료 폴더와 lab1~lab8 폴더', state: 'todo' },
        { text: 'lab1/단계.md 열기', note: '「요청 A」가 보입니다', state: 'todo' },
      ], { x: 120, y: 262, w: 1680, rowH: 172, box: 120, boxH: 42, textX: 256, textSize: 64, noteSize: 40, at: 0.7 });
      this.cl.rows[2].text.innerHTML = '<span class="p1-mono">lab1/단계.md</span> 열기';
      this.cd = THEME.card(el, { x: 120, y: 792, w: 1400, at: 1.45, pad: '22px 34px',
        html: '<div>실습 묶음: 강사가 안내하는 방법으로 받습니다</div><div>압축 파일(.zip)이면 풀어서 내 컴퓨터에 둡니다</div>' +
          '<div><span class="p1-mono">.md</span> 파일: 메모장(Windows) · 텍스트 편집기(macOS)</div>' });
      css(this.cd.face, { fontSize: '36px', lineHeight: '1.4' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.stp.render(lt);
      this.t.render(lt);
      rise(this.b, lt, 0.45);
      this.cl.render(lt);
      this.cd.render(lt);
    },
  });

  // ── s07a 자료 내려받기 안내(L15 실습 화면과 안내 + 주소 카드): s07 준비 장 다음 ──
  // 위: 단계 블록 「준비」와 제목, 폭 1680 주소 카드(고정폭 60px 한 줄). 왼쪽 x 120~760: 세 단계(y 400/560/720)와 보조 줄 두 줄(y 900/950).
  // 오른쪽: 사용자가 찍은 저장소 화면 캡처를 wide 틀(1200×750)에 넣고 틀째 0.84배로 줄여 x 812~1840, y 366 에 둔다.
  // 캡처 전체(2114×1396)를 틀에 넣으면 그림 속 「Download ZIP」 글자가 무대에서 20px 남짓이라 뒷줄에서 읽히지 않는다.
  // 그래서 캡처의 오른쪽(「Go to file」·「Add file」·「Code」 단추와 열린 메뉴) 1240×775 영역(16:10)만 잘라 넣는다.
  // 이 배율이면 그림 속 글자가 무대에서 약 34px다.
  // 표시 사각형 자리는 캡처 원본 픽셀에서 잰 값이다(PIL 로 확인, 2026-11-27):
  //   초록 「Code」 단추: x 1849~2066, y 384~447 / 「Download ZIP」 줄(회색 강조 띠): x 1283~2050, y 1030~1093
  DECK.slide({
    id: 'p1-ch01-s07a', dur: 3.3,
    notes: NOTES.s07a,
    setup(el) {
      this.bg = THEME.bg(el, 'lab', { floor: false });
      THEME.header(el, CH);
      // 주소 카드: 주소는 줄을 나누지 않는다. 한 줄에 들지 않으면 56px 로 줄인다.
      // 단계 블록·제목보다 먼저 만들어 떨어지는 동안 제목 뒤로 지나가게 하고, 떨어지는 거리를 50px 로 줄여 제목과 겹치는 시간을 줄인다
      this.adr = THEME.card(el, { x: 120, y: 196, w: 1680, at: 0.3, drop: 50, pad: '14px 34px', cap: 'GitHub 저장소',
        html: '<div class="p1-mono">github.com/revfactory/pusan-univ-ax-deck</div>' });
      css(this.adr.face.querySelector('.p1-cap'), { marginBottom: '6px' });
      const url = this.adr.face.querySelector(':scope > div > .p1-mono');
      css(url, { fontSize: '60px', lineHeight: '1.1', whiteSpace: 'nowrap', color: 'var(--ink)' });
      if (url.scrollWidth > url.clientWidth) url.style.fontSize = '56px';

      this.stp = THEME.step(el, 1, 1, { x: 150, y: 160, at: 0.1 });
      const txt = this.stp.el.querySelector('.p1-step-txt');
      txt.innerHTML = '<b>준비</b>';
      css(txt.querySelector('b'), { font: '700 34px/1 var(--body)' });
      // 단계가 하나뿐이라 블록 옆면의 단계 번호는 원고에 없는 글자가 된다. 번호를 숨긴다(s07 과 같다)
      this.stp.el.querySelectorAll('.p1-step-no').forEach(n => { n.style.display = 'none'; });
      this.t = THEME.title(el, '실습 자료를 내려받습니다', { x: 300, y: 104, size: 64, at: 0.15 });

      // 왼쪽 세 단계: 코발트 고정폭 번호 64px, 그 오른쪽 42px 한 줄(넘치면 낱말 단위로 두 줄)
      const body = ['위 주소를 브라우저에서 엽니다', '초록색 「Code」 단추를 누릅니다', '「Download ZIP」을 누릅니다'];
      this.rows = body.map((tx, i) => {
        const r = h('div', 'a', el);
        css(r, { left: '120px', top: (400 + i * 160) + 'px', width: '640px' });
        const n = h('div', 'a', r);
        n.textContent = String(i + 1);
        css(n, { left: '0px', top: '-2px', font: '700 64px/1 var(--num)', color: 'var(--accent)' });
        const b = h('div', 'a t-body', r);
        b.textContent = tx;
        css(b, { left: '80px', top: '0px', width: '560px', wordBreak: 'keep-all', color: 'var(--ink)' });
        return r;
      });

      // 오른쪽 화면 틀: 캡처를 틀에 넣은 뒤 오른쪽 영역만 보이도록 그림 자리와 크기를 다시 준다
      const SRC = '../assets/img/p1/p1-github-download.png', IW = 2114, IH = 1396;
      const SW = 1200, SH = 750, CROP = [874, 345, 1240, 775];   // 원본 픽셀 [x, y, 폭, 높이]. 폭:높이 = 16:10(wide 틀과 같다)
      const k = SW / CROP[2];
      const box = (x0, y0, x1, y1, p) => ({ x: (x0 - p - CROP[0]) / CROP[2], y: (y0 - p - CROP[1]) / CROP[3],
        w: (x1 - x0 + 2 * p) / CROP[2], h: (y1 - y0 + 2 * p) / CROP[3] });
      const marks = [box(1849, 384, 2066, 447, 10), box(1283, 1030, 2050, 1093, 8)];
      this.markAt = 1.6;
      this.shot = THEME.shot(el, SRC, { size: 'wide', x: 824, y: 378, at: 0.9, marks, markAt: this.markAt });
      css(this.shot.el, { transformOrigin: '0 0', transform: 'scale(0.84)' });
      const im = this.shot.screen.querySelector('img');
      if (im) css(im, { left: (-CROP[0] * k).toFixed(1) + 'px', top: (-CROP[1] * k).toFixed(1) + 'px', right: 'auto', bottom: 'auto',
        width: (IW * k).toFixed(1) + 'px', height: (IH * k).toFixed(1) + 'px', maxWidth: 'none', objectFit: 'fill' });
      // 번호 판 2·3: 사각형 왼쪽 위 모서리에 걸친다. 틀 카드 안에 넣어 틀과 함께 줄어들고 함께 떨어진다
      const face = this.shot.el.querySelector('.p1-shot-card');
      this.plates = marks.map((m, i) => {
        const p = h('div', '', face);
        p.textContent = String(i + 2);
        css(p, { position: 'absolute', left: (12 + m.x * SW - 28).toFixed(1) + 'px', top: (12 + m.y * SH - 28).toFixed(1) + 'px',
          width: '56px', height: '56px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--accent)', border: '1.5px solid var(--edge)', color: '#FFFFFF', font: '700 36px/1 var(--num)',
          transformOrigin: '50% 100%' });
        return p;
      });

      // 보조 줄 두 줄(34px, --dim). 「labs」만 고정폭
      this.sub = [
        THEME.text(el, '', '압축을 풀면 <span class="p1-mono">labs</span> 폴더가 실습 묶음입니다', 120, 900),
        THEME.text(el, '', 'GitHub 로그인은 필요 없습니다', 120, 950),
      ];
      this.sub.forEach(e => css(e, { font: '400 34px/1.4 var(--body)', color: 'var(--dim)', whiteSpace: 'nowrap' }));
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.stp.render(lt);
      this.t.render(lt);
      this.adr.render(lt);
      this.rows.forEach((r, i) => rise(r, lt, 0.75 + i * 0.15));
      this.shot.render(lt);
      // 사각형이 그어지기 시작하고 0.15초 뒤 번호 판이 붙는다(사각형끼리 0.15초 간격은 THEME.shot 이 정한다)
      this.plates.forEach((p, i) => THEME.dropEl(p, lt, this.markAt + i * 0.15 + 0.15, 40));
      this.sub.forEach((e, i) => rise(e, lt, 2.2 + i * 0.15));
    },
  });

  // ── s08 다음 장으로(L9 인물과 대사): 요청 A 카드(고정폭 64px), 3배 한서윤 주임, 민원 글, 코발트 ChatGPT 블록, 비어 있는 답변 초안 자리 ──
  // 서류 토큰은 민원 글 앞에서 출발해 iy 축(오른쪽 위)을 따라 ChatGPT 블록 앞에서 멈춘다. 기준점 M = 민원 글 바닥 가운데
  DECK.slide({
    id: 'p1-ch01-s08', dur: 3.6,
    notes: NOTES.s08,
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [700, 420, 1180, 640], props: false, token: false });
      THEME.header(el, FIC);
      this.t = THEME.title(el, '한 줄로 요청하면 어떤 결과가 나오는가', { x: 120, y: 104, size: 64, at: 0.1 });
      this.ln = THEME.lines(el, ['한서윤 주임이 ChatGPT를 엽니다', '2장에서 「요청 A」를 직접 붙여 넣습니다'], { x: 120, y: 404, w: 1100, gap: 0 });
      const M = [1020, 760];
      const things = h('div', 'full', el);   // 사물 층을 먼저 깔고, 그 위로 서류 토큰을 지나가게 한다
      this.fl = THEME.flow(el, [[130, 0], [130, -235]], { x: M[0], y: M[1], at: 1.55, speed: 420, line: false });
      // 뒤(위쪽)에 있는 것부터 만든다
      this.gpt = THEME.block(things, { x: 1500, y: 660, w: 220, d: 220, h: 120, tone: 'cobalt', at: 0.45, label: 'ChatGPT', pin: 40 });
      tagSize(this.gpt, 44);
      this.cp = THEME.item(things, '민원 글', { x: M[0], y: M[1], w: 220, d: 160, at: 0.59, note: '수영 강습 환불 요청', pin: 40 });
      tagSize(this.cp, 40, 34);
      this.ghostAt = this.fl.end + 0.1;
      this.gh = THEME.block(things, { x: 1700, y: 840, w: 180, d: 150, h: 20, tone: 'ghost', at: this.ghostAt, drop: 0, shadow: false, label: '답변 초안', pin: 30 });
      tagSize(this.gh, 40);
      this.ghLine = THEME.ghostDraw(this.gh);
      this.hs = THEME.figure(things, '한서윤', { x: 520, y: 845, scale: 3, at: 0.73 });
      tagSize(this.hs, 40);
      this.cd = THEME.card(el, { x: 120, y: 200, w: 1000, at: 1.1, enter: 'slide',
        html: '<span class="p1-cap">요청 A · <span class="p1-mono">lab1/단계.md</span></span><div class="p1-mono">아래 민원에 답변을 써 줘.</div>' });
      css(this.cd.face.querySelector('.p1-cap'), { fontSize: '34px' });
      css(this.cd.face.querySelector(':scope > div > .p1-mono'), { fontSize: '64px', lineHeight: '1.3', fontWeight: '500', color: 'var(--ink)' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      this.ln.forEach((l, i) => rise(l, lt, 0.5 + i * 0.15));
      [this.gpt, this.cp, this.gh, this.hs].forEach(b => b.render(lt));
      this.ghLine(lt, this.ghostAt, 0.45);
      this.fl.render(lt);
      this.cd.render(lt);
    },
  });
})();
