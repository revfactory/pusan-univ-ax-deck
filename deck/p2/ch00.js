/* 파트 2 스타일 프레임: 테마가 실제 화면에서 의도대로 보이는지 확인하는 본보기 7장.
 * 문구는 plan/course_plan.json 의 파트 2 내용과 labs/ 의 실습 자료에서 가져왔다.
 * 인트로·전환 장은 대표 그림을 poster 로만 쓴다(영상이 아직 없다). 영상이 들어오면 src 에 '../assets/video/...' 경로를 더하고 다시 찍는다.
 * 개념 장의 사진 조각은 대표 그림의 누끼(<id>_cut.png)다. */
(function () {
  'use strict';
  const { css, h } = REEL;
  DECK.config({ part: 'p2', chapter: 'ch00', title: '스타일 프레임' });

  // 1) 파트 인트로: 영상 자리 + 크림 띠 위 파트 제목(음절 색지 조각)과 파트 질문
  DECK.slide({
    id: 'p2-ch00-s01', dur: 3.2,
    notes: '파트 인트로 본보기. 영상(p2-intro)이 들어오기 전에는 대표 그림 p2-key-intro 를 poster 로 깔고 10초에 걸쳐 3% 확대한다. 제목은 음절마다 색지 조각이 붙고 받침은 0.05초 늦게 붙는다. 질문은 세 줄까지.',
    setup(el) {
      this.vt = THEME.videoTitle(el, {
        kind: 'intro', scene: 'intro', kicker: '파트 2', poster: '../assets/img/p2/p2-key-intro.jpg',
        title: '규정으로 답하는 민원 상담 프로젝트 만들기',
        sub: '규정을 근거로 답하고 규정에 없으면 담당자에게 넘기는 민원 상담 프로젝트를 ChatGPT Plus만으로 만들 수 있는가',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // 2) 챕터 전환: 가장 긴 챕터 제목(28자). 제목 72px 두 줄, 질문 40px 두 줄 안에 드는지 본다
  DECK.slide({
    id: 'p2-ch00-s02', dur: 3.2,
    notes: '챕터 전환 본보기. 파트 2에서 가장 긴 챕터 제목(ch09, 28자)을 넣었다. 영상은 p2-tr-swap 자리이고, 지금은 대표 그림 p2-key-swap 을 poster 로 쓴다.',
    setup(el) {
      this.vt = THEME.videoTitle(el, {
        kind: 'chapter', scene: 'swap', kicker: '파트 2 · 9장', poster: '../assets/img/p2/p2-key-swap.jpg',
        title: '시연: 에이전트 팀이 시험 12개를 실행하고 고친다',
        sub: '초안과 판정을 사람이 옮기지 않고 에이전트끼리 주고받게 할 수 있는가',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // 3) 개념: 크림 카드 세 장 + 사진 조각 자리 + 인물 실루엣
  DECK.slide({
    id: 'p2-ch00-s03', dur: 3.4,
    notes: '개념 본보기(ch01). 카드마다 대표 그림의 누끼(민원 출력물, 노트북과 손, 도장)가 흰 테두리를 두르고 붙는다. 그림 파일이 없으면 종이로 그린 사물이 대신 놓인다. 오민석 팀장은 색지 실루엣과 도장 기호로 나온다.',
    setup(el) {
      this.bg = THEME.bg(el, 'base');
      this.hd = THEME.header(el, { chapter: 1, title: '시범 운영 2주: 완성품 먼저 보기', fiction: true });
      this.tt = THEME.title(el, '오민석 팀장이 건 조건 세 가지', { x: 120, y: 128, size: 72, at: 0.1 });
      this.ps = THEME.person(el, 'oh', { x: 112, y: 470, scale: 1, at: 0.45, org: true });
      const cards = [
        { title: '범위를 좁힐 것', body: '2장 실습에서<br>민원 유형 두 가지를 고른다', src: '../assets/img/p2/p2-key-printout_cut.png', fallback: 'doc' },
        { title: '시험 결과를 가져올 것', body: '5·6장에서<br>시험표로 채점한다', src: '../assets/img/p2/p2-key-laptop-hands_cut.png', fallback: 'table' },
        { title: '팀장 승인 뒤에만 팀이 쓸 것', body: '10장에서<br>승인 요약으로 받는다', src: '../assets/img/p2/p2-key-stamp_cut.png', fallback: 'stamp' },
      ];
      this.cards = cards.map((c, i) => THEME.card(el, {
        x: 500 + i * 448, y: 292 + (i % 2) * 26, w: 416, h: 648, num: i + 1, title: c.title, body: c.body,
        rot: [-1.4, 1.1, -0.7][i], at: 0.55 + i * 0.22, photo: { src: c.src, fallback: c.fallback, h: 320 }, tape: i === 1,
      }));
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.ps.render(lt);
      this.cards.forEach(c => c.render(lt));
    },
  });

  // 4) 자료: 색지 막대와 Anton 숫자, 고른 두 유형에 주홍 테이프, 넘기는 카드로 답
  const TYPES = [['수강료 환불', 74, '30.8%'], ['주차 요금 감면', 61, '25.4%'], ['대관 신청', 39, '16.3%'], ['시설 고장 신고', 33, '13.8%'], ['사고·분쟁', 21, '8.8%'], ['기타', 12, '5.0%']];
  DECK.slide({
    id: 'p2-ch00-s04', dur: 3.6, steps: [2.4],
    notes: '자료 본보기(ch02, LAB-2 기대 결과). 막대는 크림 종이를 오려 붙인 것이고, 고른 두 유형에는 주홍 테이프가 붙는다. 키를 한 번 더 누르면 오른쪽 카드가 넘어가 시범 범위를 보인다.',
    setup(el) {
      this.bg = THEME.bg(el, 'base');
      this.hd = THEME.header(el, { chapter: 2, title: '실습: 민원 데이터로 시범 범위 정하기', fiction: true });
      this.tt = THEME.title(el, '3분기 민원 240건, 유형별 건수', { x: 120, y: 128, size: 72, at: 0.1 });
      this.rows = TYPES.map(([name, n, pct], i) => {
        const y = 290 + i * 106, at = 0.45 + i * 0.09;
        const lab = h('div', 'a', el, name);
        css(lab, { left: '120px', top: (y + 16) + 'px', fontSize: '36px', fontWeight: 700, lineHeight: 1.1 });
        const bar = THEME.paper(el, { x: 430, y, w: Math.round(700 * n / 74), h: 76, tone: 'cream', torn: 'right', rot: (i % 2 ? 0.5 : -0.4), at, k: 0.7 });
        const num = h('div', 'a num', el, String(n));
        css(num, { left: (430 + Math.round(700 * n / 74) + 26) + 'px', top: (y + 2) + 'px', fontSize: '66px', lineHeight: 1 });
        const pc = h('div', 'a', el, pct);
        css(pc, { left: (430 + Math.round(700 * n / 74) + 26 + (n >= 10 ? 74 : 40)) + 'px', top: (y + 30) + 'px', fontSize: '30px', color: 'var(--dim-kraft)' });
        const tape = i < 2 ? THEME.tape(el, { x: 396, y: y + 14, w: 96, rot: -7 + i * 4, tone: 'red', at: 1.35 + i * 0.12 }) : null;
        return { lab, bar, num, pc, tape, at };
      });
      this.fl = THEME.flip(el,
        '<div class="p2-card-l">질문</div><div class="p2-card-t">어느 유형부터<br>맡길까</div><div class="p2-card-b">건수가 많고<br>규정으로 답이<br>정해지는 유형</div>',
        '<div class="p2-card-l">시범 범위</div><div class="p2-card-t">수강료 환불<br>주차 요금 감면</div><div class="p2-bignum">135건</div><div class="p2-card-b" style="margin-top:4px">240건 가운데 56.3%</div>',
        { x: 1392, y: 300, w: 408, h: 560, at: 1.6, flipAt: 2.6, rot: 1.2, pad: 40 });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      this.rows.forEach(r => {
        const p = r.bar.render(lt);
        [r.lab, r.num, r.pc].forEach(x => { x.style.opacity = p > 0 ? Math.min(1, p * 2).toFixed(3) : '0'; x.style.transform = `scale(${(1.04 - 0.04 * p).toFixed(4)})`; });
        if (r.tape) r.tape.render(lt);
      });
      this.fl.render(lt);
    },
  });

  // 5) 실습 단계: 단계 번호 조각, 화면 캡처 자리(그린 화면), 프롬프트 카드, 기대 결과
  const Q1 = '11월 수영 초급반(수강료 60,000원)을 다니고 있는데 12회 중 4회가 진행되었습니다. 오늘 그만두면 얼마를 돌려받나요?';
  DECK.slide({
    id: 'p2-ch00-s05', dur: 5.8,
    notes: '실습 단계 본보기(ch04, LAB-3 4단계). 가운데는 THEME.shot 의 그린 화면이다. 캡처(deck/assets/p2/shots/<슬라이드 id>.png)가 들어오면 src 에 경로를 넣는다. 오른쪽 카드는 참가자가 보낼 질문을 36px로 다시 쓴다.',
    setup(el) {
      this.bg = THEME.bg(el, 'lab');
      this.hd = THEME.header(el, { chapter: 4, title: '실습: 민원 상담 프로젝트 만들기', fiction: true });
      this.tt = THEME.title(el, '프로젝트 안 새 대화에서 질문 1을 보낸다', { x: 292, y: 112, size: 56, at: 0.15 });
      this.shot = THEME.shot(el, null, {
        size: 'wide', x: 150, y: 252, at: 0.3, url: 'chatgpt.com',
        sidebar: { title: '프로젝트', items: ['새별 민원 상담', '새 대화'], on: 0 },
        chat: [
          { who: 'user', text: Q1 },
          { who: 'ai', text: '[답변] 남은 8회분 수강료에서 위약금을 뺀 34,000원을 돌려드립니다.\n[계산] 60,000 × 8 ÷ 12 − 6,000 = 34,000원\n[근거] 체육시설 이용 규정 제7조 제1항 제2호' },
        ],
        chatOpts: { start: 0.9, cps: 48 },
        marks: [{ x: 0.28, y: 0.62, w: 0.55, h: 0.06, n: 1, at: 5.0 }],
      });
      this.st = THEME.step(el, 4, 4, { x: 86, y: 104, at: 0.05, row: { x: 206, y: 106 } });
      this.pr = THEME.card(el, { x: 1412, y: 252, w: 388, h: 478, label: '보낼 질문 · 확인질문 Q1', body: Q1, bodyClass: 'p2-prompt', at: 0.45, pad: 32 });
      this.ex = THEME.card(el, { x: 1412, y: 750, w: 388, h: 250, tone: 'green', label: '기대 결과', title: '<span class="num" style="font-size:64px">34,000</span>원', body: '제7조 제1항 제2호', at: 0.6, pad: 32, rot: -0.8 });
      if (this.shot.chat.end + 0.5 > this.dur) console.warn('[DECK] dur 가 짧다:', this.id, (this.shot.chat.end + 0.5).toFixed(1));
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      this.shot.render(lt); this.st.render(lt); this.pr.render(lt); this.ex.render(lt);
    },
  });

  // 6) 승인: 주홍 색지 바탕, 승인 요약 네 칸, 판정 칸에 도장이 찍힌다
  DECK.slide({
    id: 'p2-ch00-s06', dur: 3.2, steps: [2.2],
    notes: '승인 장면 본보기(ch10). 키를 한 번 더 누르면 「승인」 칸에 주홍 도장이 찍히고 종이가 2px 눌린다. 주홍은 사람의 결정과 승인에만 쓴다.',
    setup(el) {
      this.bg = THEME.bg(el, 'accent');
      this.hd = THEME.header(el, { chapter: 10, title: '실습: 승인 요약 쓰고 승인 받기', fiction: true });
      const sh = this.sheet = THEME.paper(el, { x: 120, y: 128, w: 860, h: 872, tone: 'cream', rot: -0.7, at: 0.15, pad: 44, grid: [2, 2], gridBox: { x: 44, y: 196, w: 772, h: 440 } });
      const t = h('div', 'display', sh.inner, '승인 요약'); css(t, { position: 'relative', fontSize: '64px' });
      const st = h('div', '', sh.inner, '「새별 민원 상담」 프로젝트'); css(st, { position: 'relative', fontSize: '32px', color: 'var(--dim)', marginTop: '10px' });
      [['만든 것', '「새별 민원 상담」<br>프로젝트'], ['시험 결과', '시험 질문 12개<br>통과 기준 11개 이상'], ['남는 위험', '통과하지 못한<br>질문과 그 이유'], ['사람이 정할 것', '공유 범위<br>협업자 최대 10명']]
        .forEach(([k, v], i) => { const c = sh.cells[i]; css(c, { padding: '22px 24px' }); h('div', 'p2-card-l', c, k); const b = h('div', '', c, v); css(b, { fontSize: '32px', lineHeight: 1.4, marginTop: '10px' }); });
      const row = h('div', '', sh.inner); css(row, { position: 'absolute', left: '44px', top: '676px', display: 'flex', alignItems: 'center', gap: '22px' });
      h('div', 'p2-card-l', row, '판정');
      this.opts = ['승인', '수정 요청', '보류'].map(x => { const b = h('div', '', row, x); css(b, { fontSize: '36px', fontWeight: 700, padding: '16px 26px', border: '3px solid rgba(30,22,16,.4)' }); return b; });
      const sig = h('div', '', sh.inner, '승인자  오민석 팀장'); css(sig, { position: 'absolute', left: '44px', top: '790px', fontSize: '30px', color: 'var(--dim)' });
      this.stamp = THEME.stamp(sh.el, { x: 90, y: 619, size: 196, text: '승인', at: 2.4, rot: -12, paper: sh.el });
      this.big = THEME.title(el, '승인은\n읽은 만큼만 한다', { x: 1060, y: 170, size: 84, tone: 'white', at: 0.4 });
      this.ps = THEME.person(el, 'oh', { x: 1250, y: 500, scale: 0.95, at: 0.7, org: true });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.sheet.render(lt); this.big.render(lt); this.ps.render(lt); this.stamp.render(lt);
    },
  });

  // 7) 챕터 전환(뒤집기): 가장 긴 질문(46자). 영상이 좌우로 뒤집히면 글자 띠는 오른쪽으로 간다
  DECK.slide({
    id: 'p2-ch00-s07', dur: 3.2,
    notes: '뒤집은 전환 장 본보기. 파트 2에서 가장 긴 entry 질문(ch11, 46자)을 넣었다. 줄은 문구를 바꾸지 않고 \\n 으로 뜻 단위에서 나눴다. 영상은 p2-intro 를 그대로 쓰는 자리(ch11)이고, 지금은 p2-key-intro 를 좌우로 뒤집어 poster 로 쓴다.',
    setup(el) {
      this.vt = THEME.videoTitle(el, {
        kind: 'chapter', scene: 'intro', flip: true, kicker: '파트 2 · 11장', poster: '../assets/img/p2/p2-key-intro.jpg',
        title: '파트 2 정리:\n만들 수 있다, 조건이 있다',
        sub: '파트 2의 질문에 무엇이라고 답하고,\n이 프로젝트로 아직 하지 못하는 일은 무엇인가',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });
  // ════ 레이아웃 목록 본보기(2026-11-24): 문구는 plan/slides/p2-ch06.json 에서 가져왔다 ════
  // 장마다 가장 중요한 요소 하나를 화면의 3분의 1 이상으로 놓는다. 키 누름은 손들기·좌우 대비의 뒤쪽에만 한 번 둔다.
  const CH6 = '실습: 시험하고 지침 고치기';
  const lay = (dur, notes, build, steps) => ({ dur, steps: steps || [], notes,
    setup(el) { this.parts = build(el).filter(Boolean); }, render(lt, ctx) { this.parts.forEach(p => p.render(lt, ctx)); } });

  DECK.slide({ id: 'p2-ch00-s08', ...lay(3.2, '레이아웃 「한 문장」. 크림 종이 한 장에 104px 한 문장, 강조 낱말은 레몬 바탕. 챕터의 결론이나 넘기는 질문 앞에 쓴다.', el => [
    THEME.bg(el, 'base'),
    THEME.header(el, { chapter: 6, title: CH6, fiction: true }),
    THEME.statement(el, { kicker: '6장에서 채점한 사람', text: '채점한 사람은\n프로젝트를 만든 본인', mark: '본인', sub: '다음 질문 · 프로젝트를 만든 사람이 채점까지 하면 무엇을 놓치는가', at: 0.15 }),
  ]) });

  DECK.slide({ id: 'p2-ch00-s09', ...lay(3.4, '레이아웃 「큰 숫자」. 숫자 종이가 화면 왼쪽 절반을 차지하고, 오른쪽 종이에 그 숫자가 뜻하는 것을 쓴다.', el => {
    const bg = THEME.bg(el, 'base');
    const top = THEME.top(el, { chapter: 6, chapterTitle: CH6, title: '1회차 통과 수를 견줍니다', step: [3, 7] });
    return [bg, top,
      THEME.bigNum(el, { value: '10 / 12', caption: '통과 · 지침 1판', at: 0.35, label: '한서윤 주임의 1회차',
        lines: ['규칙 시험 T12 실패 1건', '통과 기준을 채우지 못함'] })];
  }) });

  DECK.slide({ id: 'p2-ch00-s10', ...lay(3.0, '레이아웃 「좌우 대비」. 왼쪽 1판, 오른쪽 2판. 키를 한 번 누르면 오른쪽 초록 종이가 크게 붙는다(키 누름 한 번).', el => {
    const bg = THEME.bg(el, 'base');
    const top = THEME.top(el, { chapter: 6, chapterTitle: CH6, title: '고친 뒤 다시 보내면' });
    return [bg, top,
      THEME.versus(el, { at: 0.35, revealAt: 1.7,
        left: { tag: '지침 1판', num: '10 / 12', title: 'T06 · T12 실패', body: '[근거]에 제7조가 없다<br>예외 요청을 넘기지 않았다' },
        right: { tag: '지침 2판', num: '12 / 12', title: 'T06 · T10 · T12 통과', body: '세 번씩 보내 세 번 모두 통과' } })];
  }, [1.6]) });

  DECK.slide({ id: 'p2-ch00-s11', ...lay(3.4, '레이아웃 「화면 크게」. 그린 화면(big, 1360×765)이 화면의 절반 넘게 차지하고, 누를 곳에 번호 고리와 같은 번호의 쪽지를 붙인다.', el => {
    const bg = THEME.bg(el, 'lab');
    const top = THEME.top(el, { chapter: 6, chapterTitle: CH6, title: '프로젝트 안에서 새 대화를 엽니다', step: [1, 7], size: 60 });
    const shot = THEME.shot(el, null, { size: 'big', x: 120, y: 272, at: 0.3, url: 'chatgpt.com',
      sidebar: { title: '프로젝트', items: ['새별 민원 상담'], on: 0 },
      draw(main) {
        const t = REEL.h('div', '', main, '새별 민원 상담'); REEL.css(t, { position: 'absolute', left: '60px', top: '60px', fontSize: '44px', fontWeight: 700 });
        const bar = REEL.h('div', '', main); REEL.css(bar, { position: 'absolute', left: '60px', top: '150px', width: '860px', height: '86px', borderRadius: '43px', background: '#EEE6D8' });
      },
      marks: [{ x: 0.008, y: 0.2, w: 0.15, h: 0.075, n: 1, at: 1.2 }, { x: 0.255, y: 0.215, w: 0.63, h: 0.14, n: 2, at: 1.6 }] });
    return [bg, top, shot,
      THEME.callout(el, { x: 1400, y: 360, w: 420, n: 1, text: '「새별 민원 상담」 프로젝트를 누릅니다', at: 1.3 }),
      THEME.callout(el, { x: 1400, y: 640, w: 420, n: 2, text: '프로젝트 안의 새 대화에 질문을 씁니다', at: 1.7, rot: 1.4 })];
  }) });

  const ASK1 = '아래는 이 프로젝트에서 실패한 시험이다. 프로젝트 지침의 어느 문장이 모자라서 이런 답이 나왔는지 찾아 줘.\n지침을 고칠 문장 한두 줄만 제안해 줘. 규정 파일은 고치지 않는다.\n\n[시험 번호]\n[질문]\n[기대 답과 기대 근거]\n[실제 답]';
  DECK.slide({ id: 'p2-ch00-s12', ...lay(3.2, '레이아웃 「요청문 크게」. 복사해 보낼 글이 화면의 가운데를 차지한다(40px). 채워 넣을 칸은 점선 테두리.', el => {
    const bg = THEME.bg(el, 'base');
    const top = THEME.top(el, { chapter: 6, chapterTitle: CH6, title: '모르겠으면 「요청 1」로 묻습니다', step: [5, 7] });
    return [bg, top,
      THEME.promptSheet(el, { text: ASK1, label: '요청 1 · 실패 원인 묻기', where: '보낼 곳 · 프로젝트 안의 새 대화', at: 0.3 })];
  }) });

  DECK.slide({ id: 'p2-ch00-s13', ...lay(3.2, '레이아웃 「기대 결과 크게」. 초록 종이 한 장(y 300~980)에 기대 결과 하나를 크게 쓴다. 보낼 것과 보낼 곳은 왼쪽 쪽지 두 장(44px)으로 둔다.', el => {
    const bg = THEME.bg(el, 'base');
    const top = THEME.top(el, { chapter: 6, chapterTitle: CH6, title: 'T01부터 T12까지 하나씩 보냅니다', step: [2, 7] });
    return [bg, top,
      THEME.callout(el, { x: 120, y: 320, w: 520, tone: 'cream', size: 44, text: '보낼 것<br>시험질문.md의 T01~T12를 하나씩', at: 0.3, rot: -1.2 }),
      THEME.callout(el, { x: 130, y: 640, w: 510, tone: 'cream', size: 44, text: '보낼 곳<br>「새별 민원 상담」 프로젝트 안의 새 대화', at: 0.4, rot: 1 }),
      THEME.result(el, { x: 700, w: 1100, value: '답 12개', detail: '나눴으면 6개씩 · 답마다 다섯 칸<br>[민원 요지] [답변] [계산] [근거] [담당자 확인]', at: 0.5 })];
  }) });

  DECK.slide({ id: 'p2-ch00-s14', ...lay(3.4, '레이아웃 「채점 기준」. 기준 한 줄마다 크림 띠와 번호 조각(42px). 오른쪽에 대조할 시험표 한 줄을 둔다.', el => {
    const bg = THEME.bg(el, 'base');
    const top = THEME.top(el, { chapter: 6, chapterTitle: CH6, title: '네 가지를 모두 지키면 통과', step: [3, 7] });
    return [bg, top,
      THEME.checklist(el, { at: 0.3, items: ['결론(금액, 환불 여부, 넘길 부서)이 기대 답과 같다', '[근거]의 조문 번호가 기대 근거와 같다(조항·호까지)', '다섯 칸이 모두 있다', '개인정보(이름, 전화번호, 주민등록번호)가 [답변]에 없다'] }),
      THEME.card(el, { x: 1340, y: 300, w: 460, h: 680, label: '시험표.md · T01', title: '기대 답<br><span class="num" style="font-size:96px">26,000</span>원', body: '기대 근거<br>체육시설 이용 규정<br>제7조 제1항 제2호', titleSize: 52, bodySize: 40, labelSize: 34, at: 1.0, rot: 1.2, tape: true })];
  }) });

  DECK.slide({ id: 'p2-ch00-s15', ...lay(3.4, '레이아웃 「순서 조각」. 종이 조각 네 장을 왼쪽부터 놓는다. 화살표 없이 번호와 놓는 순서로 차례를 보인다.', el => {
    const bg = THEME.bg(el, 'base');
    const top = THEME.top(el, { chapter: 6, chapterTitle: CH6, title: '보내고, 채점하고, 고치고, 다시 보냅니다' });
    return [bg, top,
      THEME.sequence(el, { at: 0.3, items: [
        { title: '보낸다', body: 'T01~T12를 하나씩 프로젝트 안 새 대화에' },
        { title: '채점한다', body: '기대 답·기대 근거와 견줘 1회차 표에' },
        { title: '고친다', body: '실패한 시험마다 지침 한 곳씩' },
        { title: '다시 보낸다', body: '실패한 시험만 두 번씩' }] })];
  }) });

  DECK.slide({ id: 'p2-ch00-s16', ...lay(3.2, '레이아웃 「인물과 대사」. 인물을 1.5배로 놓고 대사 종이(52px)를 붙인다. 이야기 장의 첫 장면에 쓴다.', el => [
    THEME.bg(el, 'base'),
    THEME.header(el, { chapter: 5, title: '시험 질문과 통과 기준', fiction: true }),
    THEME.speech(el, { who: 'oh', text: '몇 개 중\n몇 개입니까?', sub: '한서윤 주임이 「몇 번 물어봤는데 잘 답했습니다.」라고 한 뒤 · 4장에서 확인 질문 5개를 보낸 뒤', at: 0.2 }),
  ]) });

  DECK.slide({ id: 'p2-ch00-s17', ...lay(3.2, '레이아웃 「카드 격자」. 카드 세 장, 제목 52px·본문 38px. 카드마다 한 가지 내용과 사진 조각.', el => {
    const bg = THEME.bg(el, 'base');
    const top = THEME.top(el, { chapter: 6, chapterTitle: CH6, title: '실패마다 원인을 하나 고릅니다', step: [4, 7] });
    return [bg, top,
      THEME.grid(el, { at: 0.3, items: [
        { num: 1, title: '지침', body: '지침에 규칙이 없거나 모호하다', photo: { src: '../assets/img/p2/p2-key-printout_cut.png', fallback: 'doc', h: 250 } },
        { num: 2, title: '파일', body: '규정 파일에 내용이 없거나 찾기 어렵다', photo: { src: '../assets/img/p2/p2-key-binder_cut.png', fallback: 'binder', h: 250 } },
        { num: 3, title: '시험표', body: '기대 답이 틀렸거나 질문이 모호하다', photo: { fallback: 'table', h: 250 } }] })];
  }) });

  DECK.slide({ id: 'p2-ch00-s18', ...lay(3.0, '레이아웃 「표 한 장」. 표가 화면 폭을 다 쓴다(34px). 짚을 줄은 레몬 바탕과 주홍 테이프.', el => {
    const bg = THEME.bg(el, 'base');
    const top = THEME.top(el, { chapter: 6, chapterTitle: CH6, title: '2회차 결과와 남는 위험을 적습니다', step: [7, 7] });
    return [bg, top,
      THEME.table(el, { at: 0.3, label: '남는 위험 예 · lab4/완성본/시험기록_예.md', widths: [0.6, 2, 2.2], mark: 0,
        cols: ['번호', '무엇이 틀렸나', '시범 운영에서 어떻게 막을까'],
        rows: [['전체', '[담당자 확인]의 「필요」「불필요」가 시험마다 다르다', '시범 기간에는 금액을 안내하는 답변을 모두 발송 전 담당자가 규정과 대조한다'],
               ['Q3', '1판에서 세 번 중 한 번만 실패했다. 2판은 한 번만 보내 보았다', '시험표에 Q3을 넣고 시범 첫 주에 다시 시험한다']] })];
  }) });

  DECK.slide({ id: 'p2-ch00-s19', ...lay(3.0, '레이아웃 「손들기」. 묻는 말을 72px로 쓰고, 키를 한 번 누르면 오른쪽 카드가 넘어가 강사 사전 실행 결과를 보인다.', el => {
    const bg = THEME.bg(el, 'base');
    const top = THEME.top(el, { chapter: 6, chapterTitle: CH6, title: '1회차 통과 수를 견줍니다', step: [3, 7] });
    return [bg, top,
      THEME.handsUp(el, { question: '1회차에서 통과 기준을\n채웠습니까?', revealAt: 1.7, at: 0.3,
        answer: '<div class="p2-bignum" style="font-size:170px;margin-top:20px">10 / 12</div><div class="p2-card-b" style="font-size:42px">규칙 시험 T12 실패 1건<br>통과 기준을 채우지 못함</div>' })];
  }, [1.6]) });

  DECK.slide({ id: 'p2-ch00-s20', ...lay(3.4, '레이아웃 「판정 순서」. 위에서부터 차례로 묻고, 해당하는 줄의 오른쪽 조각이 답이다.', el => {
    const bg = THEME.bg(el, 'base');
    const top = THEME.top(el, { chapter: 6, chapterTitle: CH6, title: '다른 번호가 실패했으면', step: [4, 7] });
    return [bg, top,
      THEME.decide(el, { at: 0.3, rows: [
        { q: '① 답이 규정 원문에 맞는데 기대 답과 다른가', a: '시험표' },
        { q: '② 규정 파일에 그 내용이 없거나 찾기 어려운가', a: '파일' },
        { q: '③ 둘 다 아니면', a: '지침', tone: 'green' }] })];
  }) });
  // ════ 부품 보완 본보기(2026-11-24): 시범 챕터 ch06 의 장면 코드가 직접 처리하던 것을 부품 인자로 옮겼다 ════
  const CH2 = '실습: 민원 데이터로 시범 범위 정하기', CH3 = '민원 상담 프로젝트 설계서 한 장';
  const M = THEME.mono;

  DECK.slide({ id: 'p2-ch00-s21', ...lay(2.8, '「화면 크게」의 확대 그리기. 화면을 보통 크기(사이드바 30px)로 그리고 shot 의 zoom 1.6 으로 왼쪽 위만 키워 보인다. 고리는 draw 가 돌려준 요소 둘레에 단다. 쪽지 열은 x 1400~1800.', el => {
    const bg = THEME.bg(el, 'lab');
    const top = THEME.top(el, { chapter: 6, chapterTitle: CH6, title: '프로젝트 안에서 새 대화를 엽니다', step: [1, 7] });
    const shot = THEME.shot(el, null, { x: 120, y: 272, w: 1240, h: 708, zoom: 1.6, focus: [0, 0], at: 0.3,
      sidebar: { title: '프로젝트', items: ['새별 민원 상담', '회의록 정리'], on: 0 },
      draw(main) {
        const name = REEL.h('div', '', main, '새별 민원 상담');
        REEL.css(name, { position: 'absolute', left: '40px', top: '40px', fontSize: '40px', fontWeight: 700, color: THEME.C.ink });
        const bar = REEL.h('div', '', main);
        REEL.css(bar, { position: 'absolute', left: '40px', top: '120px', width: '400px', height: '74px', boxSizing: 'border-box', borderRadius: '37px',
          border: '2px solid rgba(30,22,16,.16)', background: '#F4EFE6' });
        const item = main.parentElement.querySelectorAll('.p2-side-i')[1];
        return [{ node: item, n: 1, at: 1.2 }, { node: bar, n: 2, at: 1.6 }];
      } });
    const c1 = THEME.callout(el, { x: 1400, y: 360, w: 400, n: 1, tone: 'cream', rot: -1.2, at: 1.3,
      text: '<span style="color:var(--dim)">여는 곳</span><br>「새별 민원 상담」<br>프로젝트 안의 새 대화' });
    const ex = THEME.card(el, { x: 1400, y: 360 + c1.h + 40, w: 400, h: 'fit', layout: true, tone: 'green', num: 2, numTone: 'red', label: '기대 결과',
      body: '「새별 민원 상담」<br>프로젝트 안의<br>빈 대화', bodySize: 40, rot: 0.8, at: 1.7 });
    const band = THEME.strip(el, '지침은 프로젝트 안에서만 적용됩니다', { right: 1800, y: 226, size: 40, weight: 700, tone: 'lemon', rot: 1, at: 2.0, padY: 12 });
    return [bg, top, shot, c1, ex, band];
  }) });

  DECK.slide({ id: 'p2-ch00-s22', ...lay(3.0, '「손들기」의 grow. 키를 누르면 답 카드가 넘어가며 가운데로 커지고 물음 종이는 좁아져 물러난다. 보기 여러 줄은 wrap 으로 본문 서체(44px)에 쓴다. 문구는 3장 s07.', el => {
    const bg = THEME.bg(el, 'base');
    const top = THEME.top(el, { chapter: 3, chapterTitle: CH3, title: '확인할 수 있는 문장은 몇 번입니까?' });
    const hu = THEME.handsUp(el, { grow: true, wrap: true, size: 44, prompt: null, revealAt: 1.7, at: 0.3, backTone: 'green',
      question: '① 답변은 짧게 쓴다<br>② 범위 밖 문의는 담당 부서와 내선을 적어 넘긴다<br>③ 규정을 꼼꼼히 확인하고 답한다<br>④ 답변은 다섯 칸 순서로 쓴다',
      answer: '<div style="font-size:40px;font-weight:700;line-height:1.3">확인할 수 있습니다</div>' +
        '<div class="p2-fit" style="font-weight:700;line-height:1;margin-top:12px">② ④</div>' +
        '<div style="border-top:3px dashed rgba(251,245,233,.45);margin:24px 0 18px"></div>' +
        '<div style="font-size:40px;line-height:1.4">① → [답변]은 5문장 이내<br>③ → [근거]의 조문이 파일에 있다</div>', fitSize: 220 });
    return [bg, top, hu];
  }, [1.6]) });

  DECK.slide({ id: 'p2-ch00-s23', ...lay(2.6, '「표 한 장」의 칸 폭 자동(widths: auto). 머리 글의 \\n 자리에서 오른쪽 칸부터 접고, 칸 여백(pad)을 줄여 여섯 줄을 y 400~985 에 넣는다. 위 띠는 THEME.strip, 기호 줄은 THEME.mono. 문구는 2장 s08.', el => {
    const bg = THEME.bg(el, 'lab');
    const top = THEME.top(el, { chapter: 2, chapterTitle: CH2, title: '시범 범위 판단표의 여섯 줄을 채웁니다', step: [5, 5] });
    const tb = THEME.table(el, { x: 120, y: 400, size: 36, widths: 'auto', pad: [4, 22], fill: false, mark: 0, at: 0.3,
      label: 'lab2/범위_판단표.md를 메모장으로 엽니다 · macOS는 텍스트 편집기',
      cols: ['민원유형', '건수', '평균\n처리일수', '규정으로 답이\n정해지는가', '사람의 판단이\n필요한가', '시범 범위에\n넣는가'],
      rows: ['수강료 환불', '주차 요금 감면', '대관 신청', '시설 고장 신고', '사고·분쟁', '기타'].map((t, i) => [t, i === 0 ? '74' : '', '', '', '', '']) });
    const s2 = THEME.strip(el, `적는 법 · 세로 막대 | 사이에 적습니다<br>${M('| 수강료 환불 | | | | | |')} → ${M('| 수강료 환불 | 74 | | | | |')}`,
      { right: 1800, y: 258, size: 34, lh: 1.3, torn: '', rot: 0.6, at: 0.75, padY: 10 });
    return [bg, top, tb, s2];
  }) });

  DECK.slide({ id: 'p2-ch00-s24', ...lay(3.0, '「카드 격자」의 넘김 카드. 항목에 back 을 주면 그 칸이 넘김 카드가 된다. 키를 한 번 누르면 세 장이 0.15초 간격으로 넘어간다. 문구는 3장 s06.', el => {
    const bg = THEME.bg(el, 'base');
    const top = THEME.top(el, { chapter: 3, chapterTitle: CH3, title: '확인할 수 있는 문장으로 적습니다' });
    const band = THEME.strip(el, '누가 읽어도 지켰는지 같게 판단합니다', { x: 120, y: 236, size: 36, weight: 700, rot: -0.6, at: 0.25 });
    const L = '확인하기 어려운 문장 · 예시', B = t => `<div class="p2-card-l" style="font-size:34px">확인할 수 있는 문장</div><div class="p2-card-t" style="font-size:52px;margin-top:16px">${t}</div>`;
    const gd = THEME.grid(el, { y: 350, h: 630, at: 0.3, titleSize: 60, flipAt: 1.7, items: [
      { num: 1, label: L, title: '근거를 잘 밝힌다', back: B('[근거] 칸에 규정 이름과 조문 번호를 적는다') },
      { num: 2, label: L, title: '정확하게 계산한다', back: B('금액에는 계산식을 붙인다') },
      { num: 3, label: L, title: '개인정보에 주의한다', back: B('이름·전화번호를 답변에 옮기지 않는다') }] });
    return [bg, top, band, gd];
  }, [1.6]) });

  DECK.slide({ id: 'p2-ch00-s25', ...lay(2.6, '「좌우 대비」의 숫자 맞춤(fit)과 세로 가운데(center). 숫자를 290px 에서 종이 폭까지 줄인다. 위 쪽지는 THEME.note(이름표를 위 가장자리에 걸친다). 문구는 2장 s07a.', el => {
    const bg = THEME.bg(el, 'lab');
    const top = THEME.top(el, { chapter: 2, chapterTitle: CH2, title: '「요청 4」로 답변근거 칸을 봅니다', step: [5, 5] });
    const nt = THEME.note(el, { x: 120, y: 300, w: 1680, label: '보낼 글 · lab2/단계.md 「요청 4」', size: 40, at: 0.3,
      html: '민원유형마다 「답변근거」 칸이 비어 있는 비율을 표로 보여 줘.' });
    const vs = THEME.versus(el, { x: 120, y: 300 + nt.h + 50, w: 800, h: 980 - (300 + nt.h + 50), gap: 80, at: 0.5, fit: true, center: true,
      left: { tag: '답변근거가 채워진 유형', num: '0%', numSize: 290, body: '수강료 환불 · 주차 요금 감면 · 대관 신청' },
      right: { tag: '답변근거가 비어 있는 유형', num: '100%', numSize: 290, body: '시설 고장 신고 · 사고·분쟁 · 기타' } });
    return [bg, top, nt, vs];
  }) });

  DECK.slide({ id: 'p2-ch00-s26', ...lay(2.4, '「요청문 크게」의 세로 가운데(center)와 HTML 안내 줄(whereHtml), 글에 맞춘 카드(card h: fit, layout). ch06 s04 를 부품 인자만으로 다시 짰다.', el => {
    const bg = THEME.bg(el, 'lab');
    const top = THEME.top(el, { chapter: 6, chapterTitle: CH6, title: 'T01부터 T12까지 하나씩 보냅니다', step: [2, 7] });
    const ps = THEME.promptSheet(el, { x: 120, y: 300, w: 1100, minH: 680, size: 56, center: true, at: 0.3,
      text: '요가 강습(수강료 40,000원, 월 8회)을 등록했는데 2회가 진행되었습니다. 지금 그만두면 얼마를 환불받나요?',
      label: '보낼 질문 · 시험질문.md T01', whereHtml: `보낼 것 · ${M('시험질문.md')} ·<br>${M('```text')} 줄과 ${M('```')} 줄 사이의 한 줄` });
    const RX = 120 + 1100 + 34, RW = 1800 - RX;
    const c1 = THEME.callout(el, { x: RX, y: 300, w: RW, tone: 'cream', size: 40, rot: 1, at: 0.8,
      text: `${M('lab4/시험질문.md')}의<br>T01~T12를 하나씩<br>답이 다 나오면<br>다음 질문을 보냅니다` });
    const ex = THEME.card(el, { x: RX, y: 300 + c1.h + 24, w: RW, h: 'fit', minH: 980 - (300 + c1.h + 24), layout: true, pad: 30, tone: 'green', label: '기대 결과',
      title: '답 12개<br>(나눴으면 6개씩)', titleSize: 44, bodySize: 36, rot: -0.8, at: 1.1,
      body: ['[민원 요지]', '[답변]', '[계산]', '[근거]', '[담당자 확인]'].map(t => `<span style="display:inline-block;white-space:nowrap;margin:0 12px 6px 0">${M(t)}</span>`).join('') });
    return [bg, top, ps, c1, ex];
  }) });
})();
