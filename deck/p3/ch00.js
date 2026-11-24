/* 파트 3 스타일 프레임(2026-11-24, 시안 B 「주황 면」). 레이아웃 목록(plan/themes.md 6절)의 15가지를 16장으로 보인다(덱 목록에는 넣지 않는다).
 * s17~s21 은 같은 날 올린 부품 기본값(제목 72px, 핵심 요소 y 240~900, 설명 34px 이상)을 인자 없이 쓴 본보기다. s01~s16 은 처음 크기를 인자로 고정해 두었다.
 * 문구는 plan/slides/p3-chNN.json 에서 가져왔고 장마다 어느 원고의 장인지 주석에 적었다. 키 누름은 퀴즈 한 장(s12)에만 있다.
 * 색: 주황은 구조와 강조(제목 막대, 단계 칸, 다음 질문, 큰 숫자, 좌우 대비의 오른쪽, 퀴즈 정답). 한 장에 주황 면은 두 곳까지.
 *     연두는 승인 표시(고리의 체크, 승인자 이름표)에만. 화면을 짚는 말은 흰 이름표. */
(function () {
  'use strict';
  const { ease, prog, clamp, lerp, css, h } = REEL;
  const TH = window.THEME;
  DECK.config({ part: 'p3', chapter: 'ch00', title: '스타일 프레임' });

  const tx = (tag, cls, parent, text, style) => { const e = h(tag, cls, parent); if (text != null) e.textContent = text; if (style) css(e, style); return e; };
  const svgIcon = (body, size, sw = 2.2) => `<svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  const ICON = {
    doc: '<path d="M16 6h22l12 12v40H16z"/><path d="M38 6v12h12"/><path d="M23 32h20M23 41h20M23 50h12"/>',
    arrowUp: '<path d="M32 50V16"/><path d="M18 30l14-14 14 14"/>',
  };
  const HD = {
    1: '본부장의 질문: 민원인이 직접 쓸 수 있습니까', 2: '민원 상담 서비스의 구성 요소', 3: '실습: 민원 안내 화면 만들기', 5: '승인 지점 8곳',
    6: '오픈 전 점검: 개인정보, 비용, 접근성', 7: '시연: 여러 AI 도구로 안내 콘텐츠 만들기', 8: '실습: 내 업무의 승인 지점 표 만들기', 9: '정리: 에이전트 팀이 만들고 사람이 승인한다',
  };
  // 왼쪽 위 단계 칸 오른쪽에 제목을 아래 끝 맞춤으로 놓는다
  const stepTitle = (el, st, text, size, at) => {
    const b = st.el.getBoundingClientRect(), k = st.el.offsetWidth / (b.width || 1);
    const sx = st.el.offsetLeft + b.width * k, sy = st.el.offsetTop, sh = st.el.offsetHeight;
    const t = TH.title(el, text, { x: sx + 56, y: 0, size, exact: true, at, w: 1800 - sx - 56 });
    t.el.style.top = (sy + sh - t.el.offsetHeight + 6).toFixed(0) + 'px';
    return t;
  };

  // ── s01 L0 영상 띠 전환(파트 인트로) · p3-ch01-s01 ──
  DECK.slide({
    id: 'p3-ch00-s01', dur: 3.4, steps: [],
    notes: 'L0 영상 띠 전환. 위쪽에 흑백 영상, 아래 주황 띠에 검정 제목 두 줄과 파트 질문. 띠가 아래에서 올라오고 제목은 줄마다 검정 막대가 지나간 뒤 남는다.',
    setup(el) {
      this.vt = TH.videoTitle(el, {
        kind: 'intro', kicker: '파트 3', at: 0.2,
        src: '../assets/video/p3/p3-intro.mp4', poster: '../assets/video/p3/p3-intro.jpg',
        title: '프로젝트에서 서비스로:\n에이전트 팀과 승인 지점',
        sub: 'ChatGPT 안의 프로젝트를 민원인이 누리집에서 쓰는 서비스로 만들려면 무엇이 더 필요하고, 그 일을 누가 하는가',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // ── s02 L7 인물과 대사 · p3-ch01-s02 ──
  DECK.slide({
    id: 'p3-ch00-s02', dur: 3.2, steps: [],
    notes: 'L7 인물과 대사. 핵심 요소는 지름 280px 인물 고리와 112px 대사. 고리 중심을 y 430에 두어 대사가 화면 위아래 절반에 걸친다. 대사 왼쪽 주황 세로선이 위에서 아래로 그어진다.',
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 1, title: HD[1], fiction: true });
      this.qt = TH.quote(el, { who: '윤지영', x: 120, y: 290, label: '본부장의 질문', text: '민원인이 직접\n쓸 수 있습니까?', size: 112,
        sub: '민원 상담 프로젝트 시연을 본 뒤의 질문', at: 0.2 });
      this.pe = TH.person(el, { who: '한서윤', x: 570, y: 740, at: 1.6, org: true });
      this.fn = tx('div', 'a p3-small', el, '이 강의에 나오는 새별시설공단, 새별시, 등장인물, 규정, 민원, 수치는 모두 실습을 위해 만든 가상 사례입니다. 실제 기관이나 인물과 관계가 없습니다.',
        { left: '120px', top: '930px', width: '1680px' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.qt.render(lt); this.pe.render(lt);
      TH.reveal(this.fn, lt, 2.0, { dx: 0, dy: 10 });
    },
  });

  // ── s03 L4 가로 순서 · p3-ch02-s03 ──
  DECK.slide({
    id: 'p3-ch00-s03', dur: 3.6, steps: [],
    notes: 'L4 가로 순서. 칸 다섯 개(1680×470)가 왼쪽부터 아래에서 올라오고, 흰 점 하나가 칸 위 선을 따라 화면에서 기록 저장까지 지나간다.',
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 2, title: HD[2], fiction: true });
      this.tt = TH.title(el, '질문 한 건은 다섯 곳을 지납니다', { x: 120, y: 160, size: 72, exact: true, at: 0.2 });
      this.sb = tx('div', 'a p3-body p3-dim', el, '프로젝트에서는 ChatGPT가 모두 맡았습니다', { left: '120px', top: '262px' });
      this.sq = TH.sequence(el, [
        { label: '화면', note: '질문을 입력합니다' },
        { label: '서버', note: '규정 파일을 붙여 보냅니다' },
        { label: 'AI 호출', note: '모델이 답을 만듭니다' },
        { label: '답변', note: '26,000원 · 제7조 제1항 제2호' },
        { label: '기록 저장', note: '질문 · 답 · 근거 조문 · 시각' },
      ], { y: 400, h: 470, size: 52, numSize: 96, noteSize: 30, at: 0.5, each: 0.1 });
      const cw = (1680 - 64) / 5, xs = [0, 1, 2, 3, 4].map(i => 120 + i * (cw + 16) + cw / 2);
      this.pa = TH.path(el, [[120, 372], ...xs.map(x => [x, 372]), [1800, 372]], { at: 1.3, dur: 1.6, tail: 0.35 });
      this.ft = tx('div', 'a p3-small', el, '금액과 조문은 시험표 T01의 기대 답', { left: '120px', top: '910px' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.sb, lt, 0.55); this.sq.render(lt); this.pa.render(lt);
      TH.reveal(this.ft, lt, 1.6, { dx: 0, dy: 10 });
    },
  });

  // ── s04 L3 좌우 대비 · p3-ch06-s03 ──
  DECK.slide({
    id: 'p3-ch00-s04', dur: 3.4, steps: [],
    notes: 'L3 좌우 대비. 두 면(각 828×620)이 왼쪽부터 펼쳐진다. 오른쪽(점검표의 확인 범위)은 주황 면이고 키 없이 0.8초 뒤 열린다. 답이 오른쪽이면 steps: [rightAt] 한 번.',
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 6, title: HD[6], fiction: true });
      this.tt = TH.title(el, '시험은 답변을, 점검은 서비스를 확인합니다', { x: 120, y: 160, size: 64, exact: true, at: 0.2 });
      this.sp = TH.split(el, { top: 280, bottom: 900, labelSize: 30, left: { label: '시험표의 확인 범위' }, right: { label: '점검표의 확인 범위', tone: 'orange' }, at: 0.5, rightAt: 1.3 });
      const side = (body, big, lines, mono) => {
        const b = tx('div', '', body, big, { fontFamily: 'var(--display)', fontWeight: '900', fontSize: '120px', lineHeight: '1.05', letterSpacing: '-0.03em', color: 'var(--ink)' });
        const ls = lines.map(t => tx('div', 'p3-body', body, t, { marginTop: '18px', color: 'var(--ink)', fontWeight: '600' }));
        const m = mono ? tx('div', 'p3-small p3-mono', body, mono, { position: 'absolute', left: '0', bottom: '0', color: 'var(--dim)' }) : null;
        return [b, ...ls, ...(m ? [m] : [])];
      };
      this.L = side(this.sp.left, '답변', ['T11: 답변에 개인정보가 없는가'], 'T11 질문 · 민원인 박하늘(010-0000-5678, …) 님이 …');
      this.Rr = side(this.sp.right, '상담 기록', ['기록에는 무엇이 남는가', '질문 · 답 · 근거 조문 · 시각']);
      this.ft = tx('div', 'a p3-small', el, '4장 요청: 개인정보는 저장하지 않는다', { left: '120px', top: '930px' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.sp.render(lt);
      this.L.forEach((e, i) => TH.reveal(e, lt, 0.9 + i * 0.12, { dx: -14 }));
      this.Rr.forEach((e, i) => TH.reveal(e, lt, this.sp.rightAt + 0.4 + i * 0.12, { dx: -14 }));
      TH.reveal(this.ft, lt, 2.2, { dx: 0, dy: 10 });
    },
  });

  // ── s05 L5 화면 크게와 짚는 말 · p3-ch03-s04 ──
  DECK.slide({
    id: 'p3-ch00-s05', dur: 3.8, steps: [],
    notes: 'L5 화면 크게와 짚는 말. 화면(1680×670)이 왼쪽부터 펼쳐지고, 주황 테두리 표시와 흰 짚는 선, 흰 이름표(34px)가 Work 단추와 첨부 파일에 차례로 붙는다. 그린 화면은 필요한 부분(Work 단추, 입력창)만 크게 그린다: 단추 40px, 파일 이름 36px. 지시 문구는 화면 옆 카드가 아니라 화면 위 이름표로 둔다.',
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = TH.header(el, { chapter: 3, title: HD[3], fiction: true });
      this.st = TH.step(el, 1, 7, { x: 120, y: 158, at: 0.1 });
      this.tt = stepTitle(el, this.st, 'Work를 고르고 파일 4개를 첨부합니다', 64, 0.3);
      const files = ['새별_체육시설_이용규정.md', '새별_공영주차장_운영지침.md', '새별_담당부서_안내.md', '자주묻는질문.md'];
      this.chips = [];
      this.sh = TH.shot(el, null, { w: 1680, h: 670, x: 120, y: 360, at: 0.35, focus: true,
        marks: [{ pick: d => d.pill, grow: 8, at: 1.2 }, { pick: d => d.wrap, grow: 10, at: 2.0 }],
        draw: alt => {
          const fr = KIT.frame(alt, 'browser', { url: 'chatgpt.com', style: { left: '0', top: '0', width: '100%', height: '100%', borderRadius: '0', border: '0' } });
          const pill = tx('div', 'p3-ui-pill', fr.body, null, { left: '30px', top: '24px' });
          h('i', '', pill); tx('span', '', pill, 'Work');
          const comp = tx('div', 'p3-ui-comp', fr.body, null, { left: '56px', bottom: '28px', width: '760px' });
          const wrap = tx('div', '', comp, null, { display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' });
          files.forEach(f => {
            const c = tx('div', 'p3-ui-file', wrap);
            const ic = h('span', '', c); css(ic, { display: 'block', width: '38px', height: '38px', color: 'var(--dim)' }); ic.innerHTML = svgIcon(ICON.doc, 38, 3);
            tx('span', '', c, f);
            this.chips.push(c);
          });
          const row = tx('div', '', comp, null, { display: 'flex', alignItems: 'center', justifyContent: 'space-between' });
          tx('div', 'p3-ui-plus', row, '+');
          tx('div', 'p3-ui-send', row).innerHTML = svgIcon(ICON.arrowUp, 36, 5);
          return { pill, wrap };
        } });
      const P = TH.boxOf(this.sh.drawn.pill, el, 8), W = TH.boxOf(this.sh.drawn.wrap, el, 10);
      const TAG = 64, cx = P.x + P.w + 84, cy = P.y + P.h / 2;
      this.c1 = TH.callout(el, { from: [P.x + P.w, cy], x: cx, y: cy - TAG / 2, head: '여는 곳', text: 'ChatGPT 웹 → 「Work」 → 새 대화', at: 1.35 });
      // 둘째 이름표는 첫째 오른쪽 같은 줄에 둔다(아래에 두면 입력창 표시와 닿는다)
      this.c2 = TH.callout(el, { x: cx + this.c1.el.offsetWidth + 16, y: cy - TAG / 2, head: '막히면', text: 'Work가 보이지 않으면 대체 경로', at: 1.6 });
      const kx = W.x + W.w + 80;
      this.c3 = TH.callout(el, { from: [W.x + W.w, W.y + W.h / 2], x: kx, y: W.y, head: '첨부할 파일 4개',
        lines: ['자료/새별_체육시설_이용규정.md', '자료/새별_공영주차장_운영지침.md', '자료/새별_담당부서_안내.md', 'lab7/자주묻는질문.md'], at: 2.15 });
      this.c4 = TH.callout(el, { x: kx, y: W.y + this.c3.el.offsetHeight + 16, head: '기대 결과', text: '입력창에 파일 4개가 붙는다', at: 2.6 });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.st.render(lt); this.tt.render(lt); this.sh.render(lt, ctx);
      this.chips.forEach((c, i) => {
        const p = prog(lt, 1.0 + i * 0.12, 0.45, ease.outCubic);
        c.style.opacity = p.toFixed(3); c.style.transform = p < 1 ? `translateY(${((1 - p) * 16).toFixed(1)}px)` : 'none';
      });
      [this.c1, this.c2, this.c3, this.c4].forEach(c => c.render(lt));
    },
  });

  // ── s06 L6 단계 칸과 원문 · p3-ch03-s05 ──
  DECK.slide({
    id: 'p3-ch00-s06', dur: 3.4, steps: [],
    notes: 'L6 단계 칸과 원문. 붙여 넣을 요청문이 밝은 종이(1160×760)에 38px로 크게 나온다. 승인과 관계된 줄은 굵게, 왼쪽 주황 막대. 왼쪽 열은 단계 칸, 제목, 여는 곳 세 줄.',
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = TH.header(el, { chapter: 3, title: HD[3], fiction: true });
      this.st = TH.step(el, 2, 7, { x: 120, y: 170, at: 0.1 });
      this.tt = TH.title(el, '「요청 1」을\n붙여 넣고\n보냅니다', { x: 120, y: 380, size: 64, exact: true, w: 460, at: 0.3 });
      this.info = [['여는 프로그램', '메모장(Windows) ·\n텍스트 편집기(macOS)'], ['붙여 넣을 곳', 'Work 입력창 → 보내기'], ['기대 결과', '계획이 먼저 나온다']].map(([k, v], i) => {
        const b = tx('div', 'a', el, null, { left: '120px', width: '460px' });
        tx('div', 'p3-card-label', b, k, { marginBottom: '4px' });
        tx('div', 'p3-body-s', b, v, { whiteSpace: 'pre-line', fontWeight: '600' });
        return b;
      });
      let y = 640; this.info.forEach(b => { b.style.top = y + 'px'; y += b.offsetHeight + 22; });
      this.dc = TH.doc(el, { x: 640, y: 170, w: 1160, label: '화면_요청문.md · 「요청 1」', labelSize: 30, size: 38, at: 0.35, each: 0.05, lines: [
        { text: '## 요청 1(기본 경로: Work에서 Sites로)', dim: true },
        { text: '```text', dim: true },
        '@Sites 첨부한 파일 4개로 「새별시설공단 민원 안내」 website를 만들어 줘. 새별시설공단은 실습용 가상 기관이다.',
        { text: '만들기 전에 계획을 먼저 보여 주고 내 승인을 받은 뒤 시작해.', mark: true },
        { text: '(가운데 줄은 화면에서 뺐습니다 · 전체는 파일에서 복사합니다)', dim: true, size: 30 },
        '- 게시(공개)는 내가 정한다. 공개 범위를 바꾸거나 게시하기 전에 나에게 묻는다.',
        { text: '```', dim: true },
      ] });
      this.cp = tx('div', 'a p3-body-s', el, '```text 줄과 ``` 줄 사이를 모두 복사합니다', { left: '640px', top: (170 + this.dc.el.offsetHeight + 26) + 'px', fontWeight: '700' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.st.render(lt); this.tt.render(lt); this.dc.render(lt);
      this.info.forEach((b, i) => TH.reveal(b, lt, 0.7 + i * 0.12));
      TH.reveal(this.cp, lt, 1.9, { dx: 0, dy: 10 });
    },
  });

  // ── s07 L12 확인 목록 · p3-ch03-s08 ──
  DECK.slide({
    id: 'p3-ch00-s07', dur: 3.2, steps: [],
    notes: 'L12 확인 목록. 세 줄(1680×480)에 넣어 볼 값과 기대 값(48px)을 함께 보인다. 아직 확인하지 않은 칸은 점선, 통과는 연두 체크(승인과 같은 표시), 어긋남은 주황.',
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = TH.header(el, { chapter: 3, title: HD[3], fiction: true });
      this.st = TH.step(el, 3, 7, { x: 120, y: 170, at: 0.1 });
      this.tt = stepTitle(el, this.st, '미리보기에 세 값을 직접 넣어 봅니다', 64, 0.3);
      this.ck = TH.checklist(el, [
        { text: '요가 · 수강료 40,000원 · 진행 2회', note: '체육시설 이용 규정 제7조 제1항 제2호 · 시험표 T01', value: '26,000원', state: 'todo' },
        { text: '경차 · 새별역 공영주차장 · 2시간 40분', note: '시험표 T06', value: '2,450원', state: 'todo' },
        { text: '자주 묻는 질문에서 「대관」 검색', note: '문화센터 운영팀', value: '내선 2301', state: 'todo' },
      ], { y: 420, rowH: 160, size: 44, noteSide: 'below', noteSize: 30, at: 0.6 });
      this.ft = tx('div', 'a p3-body-s', el, '세 값이 맞는지 확인합니다 · 틀리면 「요청 2」의 빈칸을 채워 보냅니다', { left: '120px', top: '930px', fontWeight: '600' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.st.render(lt); this.tt.render(lt); this.ck.render(lt);
      TH.reveal(this.ft, lt, 1.6, { dx: 0, dy: 10 });
    },
  });

  // ── s08 L0 영상 띠 전환(챕터) · p3-ch05-s01 ──
  DECK.slide({
    id: 'p3-ch00-s08', dur: 3.4, steps: [],
    notes: 'L0 영상 띠 전환(챕터). 제목이 한 줄이면 띠가 짧아지지 않고 최소 높이(520px)를 지킨다.',
    setup(el) {
      this.vt = TH.videoTitle(el, {
        kind: 'chapter', kicker: '파트 3 · 5장', at: 0.25,
        src: '../assets/video/p3/p3-tr-rings.mp4', poster: '../assets/video/p3/p3-tr-rings.jpg',
        title: '승인 지점 8곳', sub: '에이전트 팀이 만드는 동안 사람은 어느 지점에서 무엇을 결정하는가',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // ── s09 L8 원문 인용 · p3-ch05-s02 ──
  DECK.slide({
    id: 'p3-ch00-s09', dur: 3.6, steps: [],
    notes: 'L8 원문 인용. 4장 시연 요청의 한 문단을 밝은 종이(1680×400)에 56px로 옮기고, 승인 문장 두 줄에 주황 막대. 아래 고리 넷의 승인자 이름표는 모두 「나」다.',
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 5, title: HD[5], fiction: true });
      this.tt = TH.title(el, '요청의 승인자는 「나」 한 명입니다', { x: 120, y: 160, size: 64, exact: true, at: 0.2 });
      this.dc = TH.doc(el, { x: 120, y: 270, w: 1680, label: '4장 시연의 한 문단 요청(일부)', labelSize: 30, size: 56, at: 0.4, each: 0.08, lines: [
        '요구사항, 화면, 서버, 시험 순서로 진행하고,',
        { text: '단계가 끝날 때마다 나에게 결과를 보여 주고', mark: true },
        { text: '승인을 받은 뒤 다음 단계로 간다.', mark: true },
      ] });
      this.gt = TH.gates(el, ['요구사항', '화면', '서버', '시험'].map(l => ({ label: l, who: '나' })), { x0: 120, x1: 1180, y: 790, r: 36, size: 36, whoSize: 30, at: 1.3, each: 0.1 });
      this.pe = TH.person(el, { who: '한서윤', x: 1300, y: 730, at: 1.6, org: true });
      this.q = tx('div', 'a p3-body', el, '공단에서는 이 네 단계를\n누가 승인합니까?', { left: '1300px', top: '880px', width: '500px', whiteSpace: 'pre-line', fontWeight: '700' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.dc.render(lt); this.gt.render(lt); this.pe.render(lt);
      TH.reveal(this.q, lt, 2.4, { dx: 0, dy: 12 });
    },
  });

  // ── s10 L14 승인 지점 줄 · p3-ch05-s05 ──
  DECK.slide({
    id: 'p3-ch00-s10', dur: 3.8, steps: [],
    notes: 'L14 승인 지점 줄. 지름 128px 고리 여덟 개가 한 줄로 열리고 닫힌 뒤, 고리 아래에 승인자 연두 이름표가 차례로 붙는다. 위에 묶음 이름(만들기 전, 열기 전과 연 뒤).',
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 5, title: HD[5], fiction: true });
      this.tt = TH.title(el, '공단에서는 지점마다 정하는 사람이 다릅니다', { x: 120, y: 160, size: 64, exact: true, at: 0.2 });
      this.sb = tx('div', 'a p3-body', el, '오민석 팀장 4곳 · 정하준 대리 2곳 · 한서윤 주임 1곳 · 윤지영 본부장 1곳', { left: '120px', top: '262px', fontWeight: '600' });
      const L = [['요구사항', '오민석 팀장'], ['화면\n설계', '한서윤 주임'], ['데이터\n설계', '정하준 대리'], ['인증\n설계', '정하준 대리'],
        ['AI 기능\n설계', '오민석 팀장'], ['개선\n범위', '오민석 팀장'], ['배포', '윤지영 본부장'], ['변경\n요청', '오민석 팀장']];
      this.gt = TH.gates(el, L.map(([label, who]) => ({ label, who })), { y: 580, r: 64, size: 40, ringW: 4, whoSize: 30, groupSize: 30, at: 0.6, each: 0.1,
        groups: [{ from: 0, to: 4, label: '만들기 전' }, { from: 5, to: 7, label: '열기 전과 연 뒤' }] });
      this.ft = tx('div', 'a p3-small', el, '출처: 비개발자가 서비스 하나를 만들고 운영한 기존 과정(9회)의 승인 지점', { left: '120px', top: '960px' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.sb, lt, 0.5); this.gt.render(lt);
      TH.reveal(this.ft, lt, 2.6, { dx: 0, dy: 10 });
    },
  });

  // ── s11 L10 표와 승인자 · p3-ch08-s02(8행 → 화면 전체) ──
  DECK.slide({
    id: 'p3-ch00-s11', dur: 3.6, steps: [],
    notes: 'L10 표와 승인자. 8행 표를 화면 전체로 쓴 본보기(행 36px, 행 높이 82). 승인 지점 칸 앞에 고리, 승인자 칸은 연두 이름표. 5행 이하면 행 40px, 행 높이 104.',
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 8, title: HD[8], fiction: true });
      this.tt = TH.title(el, '단계마다 멈출 곳과 승인자가 있습니다', { x: 120, y: 150, size: 64, exact: true, at: 0.2 });
      this.pe = TH.person(el, { who: '한서윤', x: 1440, y: 140, at: 0.4, org: true });
      const R = [['1. 범위 정하기', '시범 범위 확정', '고객지원팀장'], ['2. 민원 상담 프로젝트 만들기', '지침 1판 저장', '담당자'], ['3. 시험', '시험 기록 확정', '담당자'],
        ['4. 검토', '다시 쓰기 2회를 넘으면 사람에게 넘김', '담당자'], ['5. 사용 승인', '시범 사용 승인', '고객지원팀장'], ['6. 발송', '민원인에게 보내기 전', '고객지원팀장'],
        ['7. 시범 게시', '시범 운영 범위로 게시하기 전', '고객지원팀장'], ['8. 누리집 공개(배포)', '민원인에게 누리집으로 열기 전', '경영지원본부장']];
      this.tb = TH.table(el, R, { y: 262, cols: [560, 800, 320], head: ['단계', '승인 지점(여기서 멈춘다)', '승인자'], rowH: 82, size: 36, headSize: 30, check: 1, approve: 2, at: 0.6, each: 0.08 });
      this.ft = tx('div', 'a p3-small', el, '승인자 칸 · 사람 이름 대신 직위나 역할', { left: '120px', top: '990px' });
      this.fr = tx('div', 'a p3-small p3-mono', el, 'lab8/완성본/새별_예.md', { right: '120px', top: '990px' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.pe.render(lt); this.tb.render(lt);
      TH.reveal(this.ft, lt, 2.6, { dx: 0, dy: 10 }); TH.reveal(this.fr, lt, 2.7, { dx: 0, dy: 10 });
    },
  });

  // ── s12 L11 퀴즈 · p3-ch05-s07 ── 키 한 번(정답이 먼저 보이면 안 된다)
  DECK.slide({
    id: 'p3-ch00-s12', dur: 3.6, steps: [2.4],
    notes: 'L11 퀴즈. 왼쪽 종이에 승인 요약, 오른쪽에 높은 보기 칸 셋(각 317×650). 키 한 번에 정답 칸이 아래에서 주황으로 차오르고 다른 칸은 옅어진다.',
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 5, title: HD[5], fiction: true });
      this.tt = TH.title(el, '이 승인 요약, 어떤 판정을 내립니까?', { x: 120, y: 150, size: 64, exact: true, at: 0.2 });
      this.dc = TH.doc(el, { x: 120, y: 260, w: 620, label: '가상 예 · 인증 설계 승인 요약', labelSize: 30, size: 36, at: 0.4, each: 0.06, lines: [
        '받는 사람: 정하준 대리',
        '남는 위험: 주소를 아는 사람은 누구나 상담 기록을 열 수 있다',
        { text: '막는 방법: (비어 있음)', mark: true },
        { text: '파트 2 팀장 판정카드 · 질문 3', dim: true, size: 30, gap: 30 },
        { text: '[남는 위험]마다 막는 방법이 적혀 있는가?', dim: true, size: 30 },
      ] });
      this.qz = TH.quiz(el, ['승인', '수정 요청', '보류'], { x0: 800, x1: 1800, y: 260, h: 640, size: 56, answer: 1, revealAt: 2.4, at: 0.8,
        answerText: '정답 ② 수정 요청 · 남는 위험에 막는 방법이 없을 때' });
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.dc.render(lt); this.qz.render(lt); },
  });

  // ── s13 L9 카드 격자 · p3-ch09-s07 ──
  DECK.slide({
    id: 'p3-ch00-s13', dur: 3.0, steps: [],
    notes: 'L9 카드 격자. 같은 무게의 항목 셋을 536×620 칸에. 번호 110px. 강조할 칸 하나만 주황 면(여기서는 승인자에게 보여 주는 셋째 칸).',
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 9, title: HD[9] });
      this.tt = TH.title(el, '내일 해 볼 일은 세 가지입니다', { x: 120, y: 160, size: 72, exact: true, at: 0.2 });
      const T3 = [['기관의 AI 이용\n지침 확인', '입력해도 되는 자료와 쓸 수 있는 도구를 확인합니다'],
        ['기대 답이 정해진\n시험 세 개 돌리기', '승인지점표_양식.md의 「시험해 볼 것」 칸에 적고, 개인정보와 내부 자료 없이 돌립니다'],
        ['승인자에게\n표 보여 주기', '승인 지점과 승인자가 맞는지 확인받습니다']];
      this.tl = T3.map(([t, d], i) => TH.tile(el, { x: 120 + i * 572, y: 300, w: 536, h: 640, n: i + 1, title: t, text: d, tone: i === 2 ? 'orange' : 'panel', at: 0.5 + i * 0.14 }));
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.tl.forEach(t => t.render(lt)); },
  });

  // ── s14 L13 결과물 전시 · p3-ch07-s06 ──
  DECK.slide({
    id: 'p3-ch00-s14', dur: 3.4, steps: [],
    notes: 'L13 결과물 전시. 세로 영상(포스터 520×924)과 그 영상의 수치(160px)를 한 묶음(1120×924)으로 보인다. 영상 위 글자는 슬라이드에서 얹었다.',
    setup(el) {
      this.bg = TH.bg(el, 'deep');
      this.hd = TH.header(el, { chapter: 7, title: '시연: 여러 AI 도구로 안내 콘텐츠 만들기', fiction: 'inline' });
      this.tt = TH.title(el, '안내 영상은\n미리 만든 것을\n틉니다', { x: 120, y: 200, size: 72, exact: true, w: 520, at: 0.2 });
      this.pt = TH.points(el, ['글자 없는 포스터 그림에서 출발한 10초 영상', '영상에는 글자가 없습니다', '글자는 슬라이드에서 따로 얹었습니다'],
        { x: 120, y: 520, w: 500, size: 36, gap: 22, mark: 'none', at: 0.9 });
      this.ex = TH.exhibit(el, { x: 1280, y: 136, w: 520, h: 924, pad: 0, at: 0.4, video: '../assets/video/p3/p3-demo-video.mp4', poster: '../assets/video/p3/p3-demo-video.jpg' });
      const ov = tx('div', '', this.ex.body, null, { position: 'absolute', left: '36px', right: '36px', top: '60px', color: '#0B2545' });
      tx('div', '', ov, '새별시설공단 민원 안내', { fontFamily: 'var(--display)', fontWeight: '900', fontSize: '44px', lineHeight: '1.15' });
      tx('div', '', ov, '수강료 환불·주차 요금을 바로 계산하세요', { fontSize: '30px', fontWeight: '600', marginTop: '14px', lineHeight: '1.35' });
      tx('div', '', this.ex.body, '가상 기관 실습 자료', { position: 'absolute', left: '0', right: '0', bottom: '64px', textAlign: 'center', fontSize: '30px', fontWeight: '600', color: '#3A3A36' });
      this.ov = ov;
      const stat = (y, num, unit, label) => {
        const b = tx('div', 'a', el, null, { left: '700px', top: y + 'px', width: '540px' });
        const n = tx('div', '', b, null, { fontFamily: 'var(--num)', fontWeight: '900', fontSize: '160px', lineHeight: '1', color: 'var(--p3-orange)', letterSpacing: '-0.02em', whiteSpace: 'nowrap' });
        n.textContent = num;
        if (unit) tx('span', '', n, unit, { fontSize: '72px', fontWeight: '800', color: 'var(--ink)', marginLeft: '10px' });
        tx('div', 'p3-body-s', b, label, { marginTop: '14px', fontWeight: '600' });
        return b;
      };
      this.s1 = stat(200, '10', '초', '세로 영상');
      this.s2 = stat(500, '70', null, '쓴 크레딧(생성 사용량 단위)');
      this.s3 = tx('div', 'a p3-small', el, '2026-11-24 이 강의 자료 제작 기록', { left: '700px', top: '800px' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.pt.render(lt); this.ex.render(lt, ctx);
      TH.reveal(this.ov, lt, 1.0, { dx: 0, dy: 12 });
      [this.s1, this.s2, this.s3].forEach((b, i) => TH.reveal(b, lt, 1.2 + i * 0.2, { dx: 0, dy: 20 }));
    },
  });

  // ── s15 L1 한 문장 · p3-ch09-s03(파트 3의 답) ──
  DECK.slide({
    id: 'p3-ch00-s15', dur: 2.8, steps: [],
    notes: 'L1 한 문장. 132px 문장 두 줄이 화면 가운데를 채운다. 끝말(승인합니다)만 주황 글자. 위 이름표 30px, 아래 보조 줄 44px.',
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 9, title: HD[9] });
      this.sm = TH.statement(el, '에이전트 팀이 만들고\n사람이 승인합니다', { lead: '파트 3 · 서비스로 넓히려면 누가 무엇을 하는가', size: 132, em: ['승인합니다'],
        sub: '구성 요소는 에이전트 팀이 만들고, 승인 지점마다 정해진 사람이 결정합니다', cy: 570, at: 0.3 });
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.hd.render(lt); this.sm.render(lt); },
  });

  // ── s16 L2 큰 숫자 · p3-ch05-s09(정리와 다음 질문) ──
  DECK.slide({
    id: 'p3-ch00-s16', dur: 3.6, steps: [],
    notes: 'L2 큰 숫자. 숫자 8의 잉크가 화면 높이의 73%(y 180~970)를 채우고 1부터 8까지 위로 넘어간다. 오른쪽에 제목, 승인 고리 세 줄, 다음 질문(주황 면).',
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 5, title: HD[5], fiction: true });
      this.bn = TH.bigNum(el, '8', { x: 110, top: 180, bottom: 970, unit: '곳', unitH: 150, at: 0.2 });
      const RX = Math.max(1040, Math.round(this.bn.right + 80));
      this.vr = tx('div', 'a p3-vrule', el, null, { left: (RX - 46) + 'px', top: '180px', height: '790px' });
      this.tt = TH.title(el, '승인 지점마다\n사람과 기록을 정합니다', { x: RX, y: 170, size: 64, exact: true, w: 1800 - RX, at: 0.5 });
      this.pt = TH.points(el, ['8곳: 요구사항부터 변경 요청까지', '지점마다 다른 승인자', '같은 승인 요약, 판정 세 가지'], { x: RX, y: 380, w: 1800 - RX, size: 40, gap: 36, mark: 'ring', at: 1.0, each: 0.2 });
      this.nq = TH.nextQ(el, { x: RX, bottom: 970, maxW: 1800 - RX, text: '공단 이름으로 서비스를 열기 전에 무엇을 점검하는가', at: 2.3 });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.bn.render(lt);
      this.vr.style.transform = `scaleY(${prog(lt, 0.3, 0.9, ease.inOutSine).toFixed(4)})`;
      this.tt.render(lt); this.pt.render(lt); this.nq.render(lt, ctx);
    },
  });

  // ════ s17~s21: 올린 기본값의 본보기(크기 인자를 주지 않는다) ════
  const T72 = (el, text, o) => TH.title(el, text, Object.assign({ x: 120, y: 146, size: 72, exact: true, at: 0.2 }, o || {}));

  // ── s17 L15 사람 칸 · p3-ch05-s05 ──
  DECK.slide({
    id: 'p3-ch00-s17', dur: 3.0, steps: [],
    notes: 'L15 사람 칸(THEME.people). 사람 넷을 칸으로 나누고 맡은 곳 수를 150px 숫자로. 맡은 지점은 칸 아래에서 위로 쌓여 쌓인 높이가 수와 같은 비율이다.',
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 5, title: HD[5], fiction: true });
      this.tt = T72(el, '공단에서는 지점마다 정하는 사람이 다릅니다');
      this.pp = TH.people(el, [
        { who: '오민석', value: '4', unit: '곳', list: ['요구사항', 'AI 기능 설계', '개선 범위', '변경 요청'] },
        { who: '정하준', value: '2', unit: '곳', list: ['데이터 설계', '인증 설계'] },
        { who: '한서윤', value: '1', unit: '곳', list: ['화면 설계'] },
        { who: '윤지영', value: '1', unit: '곳', list: ['배포'] },
      ]);
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.pp.render(lt); },
  });

  // ── s18 L14 승인 지점 줄(기본값) · p3-ch05-s03 ──
  DECK.slide({
    id: 'p3-ch00-s18', dur: 3.2, steps: [],
    notes: 'L14 기본값: 반지름 76, 고리 선 7, 이름 40px, 풀이 34px, 묶음 이름 40px. 고리 사이 선은 고리 가장자리에서 끊긴다.',
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 5, title: HD[5] });
      this.tt = T72(el, '서비스 하나에 승인 지점은 8곳입니다', { em: ['8곳입니다'] });
      const P = ['요구사항', '화면 설계', '데이터 설계', '인증 설계', 'AI 기능\n설계', '개선 범위', '배포', '변경 요청'];
      const G = ['만들 것과 범위', '화면 구성', '남길 기록', '이용자 확인', 'AI 답의 기준', '열기 전\n고칠 것', '서비스 공개', '승인 뒤 변경'];
      this.gt = TH.gates(el, P.map((label, i) => ({ label, note: G[i] })), { y: 600, close: false, at: 0.5, each: 0.1,
        groups: [{ from: 0, to: 4, label: '만들기 전: 설계 승인 5곳' }, { from: 5, to: 7, label: '열기 전과 연 뒤: 3곳' }] });
      this.ft = tx('div', 'a p3-small', el, '출처: 비개발자가 서비스 하나를 만들고 운영한 기존 과정(9회)의 승인 지점', { left: '120px', top: '966px' });
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.gt.render(lt); TH.reveal(this.ft, lt, 2.4, { dx: 0, dy: 10 }); },
  });

  // ── s19 L11 퀴즈(새 인자) · p3-ch05-s07 ── 키 한 번
  DECK.slide({
    id: 'p3-ch00-s19', dur: 3.8, steps: [2.2],
    notes: "L11 새 인자: fade 'bg'(다른 칸은 면만 어두워지고 글은 읽힌다), labelTop(보기 이름을 번호 아래에), notes(칸 아래쪽 풀이 34px), answerText 56px.",
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 5, title: HD[5], fiction: true });
      this.tt = T72(el, '이 승인 요약, 어떤 판정을 내립니까?');
      this.dc = TH.doc(el, { x: 120, y: 246, w: 620, h: 638, label: '가상 예 · 인증 설계 승인 요약', size: 36, at: 0.4, each: 0.06, lines: [
        '받는 사람: 정하준 대리', '남는 위험: 주소를 아는 사람은 누구나 상담 기록을 열 수 있다', { text: '막는 방법: (비어 있음)', mark: true },
        { text: '파트 2 팀장 판정카드 · 질문 3', dim: true, size: 34, gap: 26 }, { text: '[남는 위험]마다 막는 방법이 적혀 있는가?', dim: true, size: 34 },
      ] });
      this.qz = TH.quiz(el, ['승인', '수정 요청', '보류'], { x0: 800, x1: 1800, y: 246, h: 638, answer: 1, revealAt: 2.2, at: 0.8, fade: 'bg', labelTop: true,
        notes: ['승인 — 질문 5개가 모두 「예」이거나, 「아니오」를 조건으로 막을 수 있을 때', '수정 요청 — 남는 위험에 막는 방법이 없을 때', '보류 — 시험 수가 모자라 판단할 수 없을 때'],
        answerText: '정답 ② 수정 요청', answerSize: 56, answerY: 900 });
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.dc.render(lt); this.qz.render(lt); },
  });

  // ── s20 L12 확인 목록(기본값) · p3-ch05-s04a ──
  DECK.slide({
    id: 'p3-ch00-s20', dur: 3.0, steps: [],
    notes: 'L12 기본값: 항목 60px(제목 서체), 왼쪽 칸 96px, 보조 줄 34px는 항목 오른쪽.',
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 5, title: HD[5] });
      this.tt = T72(el, '시연 요청에 없던 지점이 4곳입니다');
      this.ck = TH.checklist(el, [
        { text: '인증 설계', note: '요청에 「담당자가 볼 수 있게」만 있고, 담당자를 확인하는 방법은 없음' },
        { text: '개선 범위', note: '요청에 없었다' }, { text: '배포', note: '요청에 없었다' }, { text: '변경 요청', note: '요청에 없었다' },
      ], { y: 270, rowH: 150, at: 0.6 });
      this.bd = tx('div', 'a', el, '이 네 곳에도 승인할 사람을 정해야 합니다', { left: '120px', top: '890px', width: '1680px', boxSizing: 'border-box', padding: '14px 44px 16px', borderRadius: '16px',
        background: 'var(--p3-orange)', color: 'var(--p3-black)', fontFamily: 'var(--display)', fontWeight: '800', fontSize: '48px', lineHeight: '1.2' });
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.ck.render(lt); TH.reveal(this.bd, lt, 1.6, { dx: -16 }); },
  });

  // ── s21 L9 카드 격자 한 줄(tileRow) · p3-ch09-s07 ──
  DECK.slide({
    id: 'p3-ch00-s21', dur: 3.0, steps: [],
    notes: 'L9 THEME.tileRow: 칸 폭을 고르게 나누고 제목·설명 자리의 높이를 가장 긴 칸에 맞춘다(제목 한 줄인 칸도 두 줄인 칸과 같은 높이에서 시작한다).',
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 9, title: HD[9] });
      this.tt = T72(el, '내일 해 볼 일은 세 가지입니다');
      this.tr = TH.tileRow(el, [
        { n: 1, title: '기관의 AI 이용 지침 확인', text: '입력해도 되는 자료와 쓸 수 있는 도구를 확인합니다' },
        { n: 2, title: '기대 답이 정해진 시험 세 개 돌리기', text: '승인지점표_양식.md의 「시험해 볼 것」 칸에 적고, 개인정보와 내부 자료 없이 돌립니다' },
        { n: 3, title: '승인자에게 표 보여 주기', text: '승인 지점과 승인자가 맞는지 확인받습니다', tone: 'orange' },
      ], { y: 260, h: 660 });
    },
    render(lt, ctx) { this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.tr.render(lt); },
  });
})();
