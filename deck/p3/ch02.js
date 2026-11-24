/* 파트 3 · 2장 「민원 상담 서비스의 구성 요소」. 원고 plan/slides/p3-ch02.json, 배정표 plan/assets/p3_layout_ch02.md.
 * 테마 「주황 면」(deck/themes/p3.md). 색은 CSS 변수와 테마 부품으로만 쓴다. 이 챕터에는 승인 표시가 없어 연두를 쓰지 않는다.
 * 레이아웃: s01 L0 · s02 L8 · s03 L4(다섯 칸) · s04 L9(넷) · s05 L3 · s06 L11 · s07 L1 · s08 L4(세 칸) · s09 L9(셋)와 다음 질문.
 * 장마다 강조 한 곳(주황 면 또는 100px 이상의 글자)을 둔다. 장 제목은 72px(THEME.pageTitle).
 * 키 누름은 s06(퀴즈 정답) 한 번뿐이다. 나머지 장은 키 없이 3.5초 안에 끝 상태가 된다.
 * 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다. */
(function () {
  'use strict';
  const { ease, prog, clamp, css, h, s } = REEL;
  const TH = window.THEME;
  const CH = '민원 상담 서비스의 구성 요소';
  DECK.config({ part: 'p3', chapter: 'ch02', title: CH });

  // 강사 메모: 원고의 notes 를 그대로 옮겼다
  const NOTES = {
    "p3-ch02-s01": "1장에서 한서윤 주임은 프로젝트와 서비스의 차이를 화면, 이용자 확인, 기록 저장, 개인정보, 비용, 운영 여섯 가지로 적었습니다. 2장에서는 서비스가 되려면 프로젝트 바깥에 무엇이 더 있어야 하는지 하나씩 봅니다. 정보화팀 정하준 대리가 민원인의 질문 한 건을 따라가며 설명합니다. 낯선 낱말이 몇 개 나오지만 만드는 방법이 아니라 승인할 때 읽을 수 있을 만큼만 다룹니다.",
    "p3-ch02-s02": "한서윤 주임이 1장에서 적은 여섯 가지를 들고 정보화팀 정하준 대리를 찾아갑니다. 정하준 대리는 낱말을 풀기 전에 민원인의 질문 한 건부터 화면에 띄웁니다. 파트 2 시험표의 T01과 같은 요가 강습 환불 질문이고, 이번에는 민원인이 누리집의 상담 창에 직접 입력했다고 가정합니다. 이 질문이 답이 되어 돌아오기까지 어디를 지나는지 다음 화면에서 따라갑니다. (소속: 한서윤 주임 · 고객지원팀)",
    "p3-ch02-s03": "질문은 먼저 화면에 입력되고, 공단 쪽에서 요청을 받아 규칙대로 처리하는 프로그램인 서버가 그 질문에 규정 파일을 붙여 AI 모델을 부릅니다. AI 모델은 파트 1 3장에서 본 대로 받은 글을 보고 답을 만드는 부분이고, 서버가 모델을 부르는 일을 AI 호출이라고 합니다. 모델이 만든 답은 서버를 거쳐 화면으로 돌아오고, 맞게 답했다면 시험표 T01의 기대 답인 26,000원과 제7조 제1항 제2호가 나옵니다. 마지막으로 질문, 답, 근거 조문, 시각을 기록으로 남겨 담당자가 나중에 볼 수 있게 하는데, 다음 화면에서는 이 기록을 모아 두는 곳을 DB라고 부릅니다. 파트 2의 민원 상담 프로젝트에서는 대화창이 화면, 대화 목록이 기록이었고 이 다섯 곳을 ChatGPT가 모두 맡았지만, 서비스로 만들면 공단이 갖춰야 합니다.",
    "p3-ch02-s04": "앞 화면의 다섯 곳을 맡는 쪽끼리 묶으면 이 그림이 되고, AI 호출은 서버와 AI 모델 사이의 선, 기록 저장은 DB가 맡는 일입니다. 화면은 민원인이 보고 입력하는 곳이고, 서버는 요청을 받아 규칙대로 처리하는 곳입니다. 화면의 코드는 민원인의 브라우저로 전달되어 실행되므로 누구나 열어 볼 수 있습니다. 서버가 AI 모델을 부를 때는 API를 쓰는데, API는 프로그램이 다른 프로그램에 정해진 형식으로 요청을 보내는 방법입니다. 이때 함께 보내는 비밀 문자열이 API 키이고, 화면 코드에 넣으면 누구나 볼 수 있으므로 서버에만 둡니다. DB는 데이터베이스의 줄임말로 상담 기록을 한곳에 모아 담당자 누구나 같은 기록을 보게 하며, 4장 시연에서 쓸 요청에는 기록에 남기지 않을 것으로 「개인정보는 저장하지 않는다」가 적혀 있습니다.",
    "p3-ch02-s05": "1장에서 적은 이용자 확인은 두 가지 확인으로 나뉩니다. 인증은 이 요청을 보낸 사람이 누구인지 확인하는 일이고, 보통 로그인으로 합니다. 인가는 확인한 그 사람이 무엇을 할 수 있는지 정하는 일로, 같은 상담 기록 화면이라도 담당자인 한서윤 주임은 열 수 있고 민원인은 열 수 없게 합니다. ChatGPT 프로젝트를 공유할 때 편집 권한과 대화 권한을 나눠 주는 것도 인가입니다. 누가 무엇을 할 수 있게 할지는 5장의 승인 지점 가운데 인증 설계에서 사람이 정합니다.",
    "p3-ch02-s06": "문장을 하나씩 읽을 테니, 인증이라고 생각하시면 손을 들어 주세요. 손을 확인한 뒤 키를 누르면 세 문장의 답이 함께 나옵니다. ①은 보낸 사람이 누구인지 확인하므로 인증이고, ②와 ③은 확인된 사람이 할 수 있는 일을 정하므로 인가입니다. ③에서 볼 수는 있지만 지울 수는 없게 한 규칙도 사람이 미리 정해 두어야 서버가 지킵니다.",
    "p3-ch02-s07": "민원 상담 프로젝트는 여러분의 ChatGPT Plus 구독으로 썼고, Plus 요금표에도 프로젝트가 들어 있습니다. 서비스에서는 앞에서 본 대로 서버가 API로 AI 모델을 부르는데, API 사용은 Plus에 들어 있지 않고 따로 청구됩니다. 1장에서 한서윤 주임이 비용 칸에 「구독 요금 안 → AI 호출 요금 따로」라고 적은 것이 이 내용입니다. 요금은 쓰는 만큼 청구되고, OpenAI 요금표는 질문 횟수가 아니라 AI에 보내고 받은 글의 양(토큰)으로 값을 매깁니다. 그래서 질문 한 번에 얼마라고 말할 수 없고, 금액은 화면에 싣지 않습니다. 이 요금에 한도를 두는 일은 6장 오픈 전 점검에서 다룹니다. (강사 참고: 금액을 물으면, 요금표가 토큰 100만 개당 가격이고 입력과 출력의 단가가 달라 질문 한 번의 금액은 말하지 않고, 쓰기 전에 OpenAI의 API 요금 안내를 직접 확인하게 한다고 답합니다.) (화면에서 지운 기준 시점: 「2026년 11월 기준」)",
    "p3-ch02-s08": "3장 실습에서 쓰는 Sites는 ChatGPT로 웹사이트와 가벼운 앱을 만들고, 미리 보고, 게시하고, 공유하는 기능입니다. Sites를 쓸 수 없으면 화면을 담은 HTML 파일(index.html)을 받아 내 PC의 바탕 화면에 두고 브라우저로 여는데, 이 파일은 내 PC 안에 있으므로 옆자리에서는 열 수 없습니다. 화면에는 싣지 않았지만, 개발자가 쓰는 127.0.0.1이라는 주소도 그 기기 자신을 가리키므로 그 PC에서만 열립니다. 배포는 화면과 서버를 인터넷의 공개 주소에 올려 민원인 누구나 열 수 있게 바꾸는 일이고, 1장에서 적은 운영은 이 주소를 연 뒤부터 시작됩니다. Sites는 새 사이트를 비공개로 시작해 공개 범위를 고르게 하고 인터넷 전체에 공개하면 누구나 들어올 수 있는데, 3장에서는 이 공개 범위를 정하기만 하고 게시하지 않습니다.",
    "p3-ch02-s09": "서비스가 되려면 프로젝트 바깥에 화면, 서버, DB가 있어야 하고, 인증과 인가로 누가 무엇을 할 수 있는지 정해야 합니다. Plus와 따로 청구되는 AI 호출 요금과 누구에게 공개할지도 정해야 합니다. 1장에서 적은 여섯 가지 가운데 개인정보는 6장 오픈 전 점검에서, 운영은 5장 승인 지점 8곳의 변경 요청에서 다룹니다. 그렇다면 개발자가 아닌 한서윤 주임은 이 가운데 어디까지 직접 만들 수 있을까요? 3장 실습에서 여러분이 직접 만들어 보며 확인합니다.",
  };

  const tx = (tag, cls, parent, text, style) => { const e = h(tag, cls, parent); if (text != null) e.textContent = text; if (style) css(e, style); return e; };
  // 왼쪽부터 펼쳐지는 면, 아래에서 올라오는 칸(clip-path)
  const openL = (e, lt, at, dur = 0.6, r = 20) => { const p = prog(lt, at, dur, ease.outQuart); e.style.clipPath = p < 1 ? `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0 round ${r}px)` : 'none'; return p; };
  const rise = (e, lt, at, dur = 0.55, r = 20) => { const p = prog(lt, at, dur, ease.outQuart); e.style.clipPath = p < 1 ? `inset(${((1 - p) * 100).toFixed(2)}% 0 0 0 round ${r}px)` : 'none'; return p; };
  // 본문 한 줄(40px)
  const bodyLine = (el, text, top, o) => tx('div', 'a', el, text, Object.assign({ left: '120px', top: top + 'px', fontSize: '40px', lineHeight: '1.3', fontWeight: '500', color: 'var(--ink)', whiteSpace: 'nowrap' }, o || {}));
  // 무대 크기 SVG 한 장(선 그리기)
  const stageSvg = el => { const v = s('svg', { width: 1920, height: 1080, viewBox: '0 0 1920 1080' }, el); css(v, { position: 'absolute', left: '0', top: '0', overflow: 'visible', pointerEvents: 'none' }); return v; };
  const line = (svg, d, w = 4) => { const p = s('path', { d, fill: 'none', 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg); p.style.stroke = 'var(--ink)'; KIT.drawPrep(p); return p; };
  // 선 그림(64칸 기준, 글자 없음). 색은 놓인 칸의 글자색을 따른다
  const ICON = {
    screen: '<rect x="6" y="10" width="52" height="36" rx="4"/><path d="M6 19h52"/><path d="M24 55h16"/><path d="M32 46v9"/>',
    server: '<rect x="12" y="8" width="40" height="14" rx="3"/><rect x="12" y="25" width="40" height="14" rx="3"/><rect x="12" y="42" width="40" height="14" rx="3"/><path d="M19 15h3M19 32h3M19 49h3"/>',
    db: '<ellipse cx="32" cy="14" rx="20" ry="6"/><path d="M12 14v34c0 3.3 9 6 20 6s20-2.7 20-6V14"/><path d="M12 31c0 3.3 9 6 20 6s20-2.7 20-6"/>',
    model: '<rect x="16" y="16" width="32" height="32" rx="5"/><circle cx="32" cy="32" r="7"/><path d="M24 7v9M32 7v9M40 7v9M24 48v9M32 48v9M40 48v9M7 24h9M7 32h9M7 40h9M48 24h9M48 32h9M48 40h9"/>',
    file: '<path d="M16 6h22l12 12v40H16z"/><path d="M38 6v12h12"/><path d="M23 32h20M23 41h20M23 50h12"/>',
    arrow: '<path d="M8 32h44"/><path d="M36 16l16 16-16 16"/>',
    globe: '<circle cx="32" cy="32" r="25"/><path d="M7 32h50"/><path d="M32 7c-9 8-9 42 0 50M32 7c9 8 9 42 0 50"/><path d="M12 19h40M12 45h40"/>',
  };
  const icon = (parent, key, size, style, sw = 2.6) => {
    const d = tx('div', '', parent, null, Object.assign({ width: size + 'px', height: size + 'px', flex: 'none', color: 'var(--ink)' }, style || {}));
    d.innerHTML = `<svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${ICON[key]}</svg>`;
    return d;
  };
  // 흰 이름표(검정 34px). (x, y)가 가운데
  const tag = (el, text, x, y, size = 34) => {
    const e = tx('div', 'a', el, text, { padding: '8px 22px', borderRadius: '10px', background: 'var(--p3-paper)', color: 'var(--p3-black)', fontSize: size + 'px', lineHeight: '1.3', fontWeight: '700', whiteSpace: 'nowrap' });
    css(e, { left: (x - e.offsetWidth / 2).toFixed(0) + 'px', top: (y - e.offsetHeight / 2).toFixed(0) + 'px' });
    return e;
  };

  // ── s01 L0 영상 띠 전환 ── 전환 영상 p3-tr-path 를 정방향 그대로(2장) 흑백으로 띠 위쪽에 깐다
  DECK.slide({
    id: 'p3-ch02-s01', dur: 2.8, steps: [], notes: NOTES['p3-ch02-s01'],
    setup(el) {
      this.vt = TH.videoTitle(el, {
        kind: 'chapter', kicker: '파트 3 · 2장', title: CH, flip: false, at: 0.4,
        sub: '서비스가 되려면 프로젝트 바깥에 무엇이 더 있어야 하는가',
        src: '../assets/video/p3/p3-tr-path.mp4', poster: '../assets/video/p3/p3-tr-path.jpg',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // ── s02 L8 원문 인용 ── 민원 글 종이(1680×372, 64px 두 줄). 아래 왼쪽에 두 사람, 오른쪽에 정하준 대리의 말(주황 면, 검정 56px)
  DECK.slide({
    id: 'p3-ch02-s02', dur: 3.0, steps: [], notes: NOTES['p3-ch02-s02'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 2, title: CH, fiction: true });
      this.tt = TH.pageTitle(el, '정하준 대리가 질문 한 건을 따라갑니다');
      this.bd = bodyLine(el, '민원인이 누리집 상담 창에 묻습니다', 240);
      this.dc = TH.doc(el, { x: 120, y: 304, w: 1680, h: 372, label: '민원 글 · 누리집 상담 창', size: 64, at: 0.7, each: 0.15, lines: [
        '요가 강습(수강료 40,000원, 월 8회)을 등록했는데',
        '2회가 진행되었습니다. 지금 그만두면 얼마를 환불받나요?',
      ] });
      css(this.dc.el, { padding: '32px 56px 36px 64px' });
      this.src = tx('div', 'a', el, '시험표 T01의 질문', { left: '120px', top: '690px', fontSize: '34px', lineHeight: '1.3', color: 'var(--dim)' });
      // 말한 사람(정하준 대리)을 주황 칸 가까이에 둔다. 칸 왼쪽의 꼭지가 정하준 대리를 가리킨다
      const BX = 1000, BY = 740, BW = 800, BH = 230, PY = BY + BH / 2 - 52;
      this.han = TH.person(el, { who: '한서윤', x: 120, y: PY, at: 1.6, org: false, nameSize: 44 });
      this.jung = TH.person(el, { who: '정하준', x: 120 + this.han.el.offsetWidth + 64, y: PY, at: 1.75, org: false, nameSize: 44 });
      this.say = tx('div', 'a', el, null, { left: BX + 'px', top: BY + 'px', width: BW + 'px', height: BH + 'px', boxSizing: 'border-box', padding: '0 52px',
        display: 'flex', alignItems: 'center', borderRadius: '20px', background: 'var(--p3-orange)' });
      this.tail = tx('div', 'a', el, null, { left: (BX - 30) + 'px', top: (BY + BH / 2 - 24) + 'px', width: '0', height: '0', transformOrigin: '100% 50%',
        borderTop: '24px solid transparent', borderBottom: '24px solid transparent', borderRight: '32px solid var(--p3-orange)' });
      this.sayT = tx('div', '', this.say, '이 질문 한 건이 어디를 지나는지 그려 보겠습니다.', { fontFamily: 'var(--display)', fontWeight: '800', fontSize: '56px',
        lineHeight: '1.22', letterSpacing: '-0.02em', color: 'var(--p3-black)', wordBreak: 'keep-all' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.bd, lt, 0.5);
      this.dc.render(lt);
      TH.reveal(this.src, lt, 1.4, { dx: 0, dy: 10 });
      this.han.render(lt); this.jung.render(lt);
      const p = openL(this.say, lt, 2.0, 0.6);
      this.tail.style.opacity = p > 0.02 ? '1' : '0';
      this.tail.style.transform = `scaleX(${prog(lt, 2.0, 0.3, ease.outCubic).toFixed(3)})`;
      TH.reveal(this.sayT, lt, 2.2, { dur: 0.55 });
    },
  });

  // ── s03 L4 가로 순서(다섯 칸) ── 칸 다섯 개(1680×560)가 아래에서 올라오고, 흰 점이 칸 위 선을 따라 지나가며 칸마다 설명을 놓는다
  DECK.slide({
    id: 'p3-ch02-s03', dur: 3.4, steps: [], notes: NOTES['p3-ch02-s03'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 2, title: CH, fiction: true });
      this.tt = TH.pageTitle(el, '질문 한 건은 다섯 곳을 지납니다');
      this.bd = bodyLine(el, '프로젝트에서는 ChatGPT가 모두 맡았습니다', 240);
      const Y = 340, H = 560, X0 = 120, X1 = 1800, GAP = 16, N = 5, W = (X1 - X0 - GAP * (N - 1)) / N, PY = 316;
      const LAB = ['화면', '서버', 'AI 호출', '답변', '기록 저장'];
      const NOTE = ['질문을 입력합니다', '규정 파일을 붙여 보냅니다', '모델이 답을 만듭니다', '26,000원 · 제7조 제1항 제2호', '질문 · 답 · 근거 조문 · 시각'];
      this.sq = TH.sequence(el, LAB.map((label, i) => ({ label, note: NOTE[i] })), { x0: X0, x1: X1, y: Y, h: H, gap: GAP, size: 60, numSize: 120, noteSize: 38, at: 0.6, each: 0.1 });
      // 이름(60px)은 번호 바로 아래에, 설명(38px)은 칸 아래쪽에 둔다. 설명 자리는 세 줄 높이로 맞춰 다섯 칸의 설명이 같은 높이에서 시작한다
      this.sq.cells.forEach(c => {
        css(c.c, { padding: '30px 26px 32px' });
        css(c.c.querySelector('.p3-seq-label'), { marginTop: '22px', whiteSpace: 'nowrap', letterSpacing: '-0.03em' });
        c.nt = c.c.querySelector('.p3-seq-note');
        css(c.nt, { marginTop: 'auto', minHeight: Math.ceil(38 * 1.4 * 3) + 'px', paddingTop: '20px', borderTop: '2px solid #3A3A3A', color: 'var(--ink)', lineHeight: '1.4' });
      });
      const cx = i => X0 + i * (W + GAP) + W / 2;
      // 점은 1.3초에 왼쪽 끝에서 출발해 칸 가운데 위를 차례로 지나 2.5초에 5번 칸 위에서 멈춘다
      this.T = [1.3, 1.42, 1.7, 1.97, 2.24, 2.5];
      this.pa = TH.path(el, [[X0, PY], ...LAB.map((_, i) => [cx(i), PY])], { times: this.T, tail: 0.35, baseAt: 0.9 });
      this.ft = tx('div', 'a', el, '금액과 조문은 시험표 T01의 기대 답', { left: '120px', top: '926px', fontSize: '30px', lineHeight: '1.3', color: 'var(--dim)' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.bd, lt, 0.5);
      this.sq.render(lt); this.pa.render(lt);
      this.sq.cells.forEach((c, i) => {
        const a = this.T[i + 1];
        TH.reveal(c.nt, lt, a, { dx: 0, dy: 12, dur: 0.4 });
        // 점이 닿는 동안만 칸 테두리가 주황으로 켜진다(끝 상태에서는 꺼져 있다)
        const v = clamp((lt - a + 0.08) / 0.12) * (1 - prog(lt, a + 0.25, 0.4));
        c.c.style.boxShadow = v > 0.01 ? `inset 0 0 0 4px rgba(255,91,20,${v.toFixed(3)})` : '';
      });
      TH.reveal(this.ft, lt, 2.7, { dx: 0, dy: 10 });
    },
  });

  // ── s04 L9 카드 격자(넷, 구역 이름) ── 칸 넷(372×470)과 칸 위 구역 이름, 칸 아래 잇는 선 셋. 「서버」 칸이 주황 면
  DECK.slide({
    id: 'p3-ch02-s04', dur: 3.0, steps: [], notes: NOTES['p3-ch02-s04'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 2, title: CH, fiction: true });
      this.tt = TH.pageTitle(el, '화면, 서버, DB가 맡는 일이 다릅니다');
      const Y = 366, H = 492, GAP = 64, AT = 0.5, EACH = 0.14;
      // 설명의 줄은 쉼표 뒤에서 바꾼다(줄바꿈 자리만 정하고 글자는 원고 그대로)
      this.tr = TH.tileRow(el, [
        { title: '화면', text: '질문 입력 칸,\n답변 표시' },
        { title: '서버', text: '규정 파일 붙이기,\nAPI 키 보관', tone: 'orange' },
        { title: 'DB', text: '상담 기록' },
        { title: 'AI 모델', text: '외부 AI 업체' },
      ], { y: Y, h: H, gap: GAP, titleSize: 72, textSize: 38, at: AT, each: EACH });
      const KEYS = ['screen', 'server', 'db', 'model'];
      this.ics = this.tr.tiles.map((t, i) => {
        css(t.el, { padding: '34px 34px 38px 40px' });
        css(t.text, { color: 'var(--ink)', lineHeight: '1.35', marginTop: '12px' });
        css(t.title, { letterSpacing: '-0.03em', whiteSpace: 'nowrap' });
        return icon(t.el, KEYS[i], 180, { position: 'absolute', left: '30px', top: '28px' }, 2);
      });
      const W = 372, cx = i => 120 + i * (W + GAP) + W / 2;
      // 구역 이름(40px, 밑줄 4px): 「민원인의 브라우저」는 첫 칸 위, 「공단 쪽」은 둘째·셋째 칸 위. 넷째 칸 위는 비운다
      const zone = (text, x0, x1) => tx('div', 'a', el, text, { left: x0 + 'px', top: '284px', width: (x1 - x0) + 'px', boxSizing: 'border-box', paddingBottom: '10px',
        borderBottom: '4px solid var(--ink)', fontSize: '40px', lineHeight: '1.25', fontWeight: '700', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.zones = [{ e: zone('민원인의 브라우저', 120, 120 + W), at: AT + 0.1 }, { e: zone('공단 쪽', 120 + W + GAP, 120 + 3 * W + 2 * GAP), at: AT + EACH + 0.1 }];
      // 잇는 선: 칸 아래 끝(y 850)에서 내려와 이어진다. 「AI 호출」은 서버 칸에서 DB 칸 아래(y 938)를 지나 AI 모델 칸까지
      const B = Y + H, L1 = 890, L2 = 946, svg = stageSvg(el);
      this.links = [
        { p: line(svg, `M ${cx(0)} ${B} V ${L1} H ${cx(1)} V ${B}`), t: tag(el, '질문 · 답변', (cx(0) + cx(1)) / 2, L1, 36), at: 1.6 },
        { p: line(svg, `M ${cx(1)} ${B} V ${L1} H ${cx(2)} V ${B}`), t: tag(el, '기록 저장', (cx(1) + cx(2)) / 2, L1, 36), at: 1.9 },
        { p: line(svg, `M ${cx(1)} ${B} V ${L2} H ${cx(3)} V ${B}`), t: tag(el, 'AI 호출', (cx(2) + cx(3)) / 2, L2, 36), at: 2.2 },
      ];
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      this.tr.render(lt);
      this.tr.tiles.forEach((t, i) => { const at = 0.5 + i * 0.14; TH.reveal(this.ics[i], lt, at + 0.25, { dx: 0, dy: 20 }); });
      this.zones.forEach(z => TH.reveal(z.e, lt, z.at, { dx: -16 }));
      this.links.forEach(k => { KIT.draw(k.p, prog(lt, k.at, 0.45, ease.inOutCubic)); TH.reveal(k.t, lt, k.at + 0.25, { dx: 0, dy: 10, dur: 0.4 }); });
    },
  });

  // ── s05 L3 좌우 대비 ── 위 요청 칸에서 두 면으로 갈라지는 흰 선. 왼쪽 숯색 면 「인증」, 오른쪽 주황 면 「인가」(120px), 예시 두 줄(60px)을 같은 높이에
  DECK.slide({
    id: 'p3-ch02-s05', dur: 2.9, steps: [], notes: NOTES['p3-ch02-s05'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 2, title: CH, fiction: true });
      this.tt = TH.pageTitle(el, '인증과 인가를 나눠 확인합니다');
      const TOP = 340, BOT = 930, X0 = 120, X1 = 1800, G = 24, XM = (X0 + X1) / 2;
      const LC = (X0 + XM - G / 2) / 2, RC = (XM + G / 2 + X1) / 2;
      this.rq = tx('div', 'a', el, '요청 · 상담 기록 화면 열기', { top: '248px', padding: '6px 34px', borderRadius: '12px', border: '2px solid var(--ink)',
        fontSize: '40px', lineHeight: '1.3', fontWeight: '700', color: 'var(--ink)', whiteSpace: 'nowrap', background: 'var(--bg)' });
      const rw = this.rq.offsetWidth, rh = this.rq.offsetHeight, ry = 248 + rh / 2;
      this.rq.style.left = (960 - rw / 2).toFixed(0) + 'px';
      const svg = stageSvg(el);
      this.forks = [line(svg, `M ${960 - rw / 2} ${ry} H ${LC} V ${TOP - 4}`, 3), line(svg, `M ${960 + rw / 2} ${ry} H ${RC} V ${TOP - 4}`, 3)];
      this.sp = TH.split(el, { top: TOP, bottom: BOT, x0: X0, x1: X1, gap: G, labelSize: 40,
        left: { label: '인증 · 보낸 사람은 누구인가', tone: 'panel' }, right: { label: '인가 · 상담 기록을 볼 수 있는가', tone: 'orange' }, at: 0.7, rightAt: 1.5 });
      // 면 안의 자리(면 위 끝 기준): 면 이름 32, 큰 낱말 90, 「예시」 300, 예시 두 줄 352·452
      const side = (P, word, ex, at, onOrange) => {
        const lab = P.querySelector('.p3-split-label');
        css(lab, { top: '32px', left: '52px' });
        const w = TH.title(P, word, { x: 52, y: 92, size: 120, exact: true, weight: 900, at: at + 0.35 });
        if (onOrange) w.el.querySelectorAll('.p3-title-bar').forEach(b => { b.style.background = 'var(--p3-black)'; });
        const exl = tx('div', 'a', P, '예시', { left: '52px', top: '300px', fontSize: '30px', lineHeight: '1.3', fontWeight: onOrange ? '700' : '500', color: onOrange ? 'var(--p3-black)' : 'var(--dim)' });
        const rows = ex.map(([t, wt], i) => {
          const r = tx('div', 'a', P, null, { left: '52px', right: '52px', top: (348 + i * 100) + 'px', height: '100px', boxSizing: 'border-box',
            borderTop: `2px solid ${onOrange ? 'rgba(20,20,20,.35)' : '#3A3A3A'}`, display: 'flex', alignItems: 'center' });
          tx('div', '', r, t, { fontFamily: 'var(--display)', fontSize: '60px', lineHeight: '1.1', fontWeight: wt, letterSpacing: '-0.02em', color: onOrange ? 'var(--p3-black)' : 'var(--ink)', whiteSpace: 'nowrap' });
          return r;
        });
        return { w, exl, rows, at };
      };
      this.L = side(this.sp.leftEl, '인증', [['한서윤 주임', '800'], ['민원인', '800']], 0.7, false);
      this.R = side(this.sp.rightEl, '인가', [['볼 수 있음', '800'], ['볼 수 없음', '600']], 1.5, true);
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.rq, lt, 0.4, { dx: 0, dy: 10 });
      this.forks.forEach(f => KIT.draw(f, prog(lt, 0.55, 0.45, ease.inOutCubic)));
      this.sp.render(lt);
      [this.L, this.R].forEach(S => {
        S.w.render(lt);
        TH.reveal(S.exl, lt, S.at + 0.5, { dx: -12 });
        S.rows.forEach((r, i) => TH.reveal(r, lt, S.at + 0.55 + i * 0.12, { dx: -16 }));
      });
    },
  });

  // ── s06 L11 퀴즈(문장 셋) ── 키 한 번: ① 칸이 주황으로 차오르고, 세 칸 아래쪽에 답 「인증」「인가」「인가」(72px)가 놓인다
  const RV6 = 1.7;
  DECK.slide({
    id: 'p3-ch02-s06', dur: 2.9, steps: [RV6], notes: NOTES['p3-ch02-s06'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 2, title: CH, fiction: true });
      this.tt = TH.pageTitle(el, '인증일까요, 인가일까요?');
      this.bd = bodyLine(el, '세 문장 가운데 인증은 몇 번입니까?', 240);
      this.qz = TH.quiz(el, ['상담 기록을 연 사람이 한서윤 주임 본인인지 확인한다', '민원인은 상담 기록 화면을 열 수 없다', '담당자는 상담 기록을 볼\u00A0수\u00A0있지만 지울\u00A0수\u00A0없다'], {   // 「볼 수 있지만」「지울 수 없다」가 줄 끝에서 나뉘지 않게
        x0: 120, x1: 1800, y: 320, h: 600, gap: 36, size: 52, answer: 0, fade: 'bg', labelTop: true, revealAt: RV6, at: 0.6, each: 0.12,
        notes: ['인증', '인가', '인가'], noteSize: 72 });
      // 칸 번호는 원고의 ①②③, 답 낱말은 72px 제목 서체
      const PAD = 28;
      this.qz.items.forEach((it, i) => {
        it.num.textContent = '①②③'[i];
        css(it.num, { fontFamily: 'var(--body)', fontWeight: '700', fontSize: '128px', lineHeight: '1', top: '22px' });
        css(it.lab, { top: (22 + it.num.offsetHeight + 14) + 'px', lineHeight: '1.25', fontWeight: '700' });
        css(it.note, { fontFamily: 'var(--display)', fontWeight: '900', lineHeight: '1.1', letterSpacing: '-0.02em', left: (120 + i * (536 + 36) + PAD + 12) + 'px' });
      });
      this.ex = tx('div', 'a', el, '예시', { right: '120px', top: '940px', fontSize: '30px', lineHeight: '1.3', color: 'var(--dim)' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.bd, lt, 0.5);
      this.qz.render(lt);
      TH.reveal(this.ex, lt, 1.2, { dx: 0, dy: 10 });
    },
  });

  // ── s07 L1 한 문장(아래 두 칸) ── 180px 두 줄, 「따로」만 주황 글자. 보조 줄 48px. 아래 칸 둘(828×226, 칸 이름 48px, 설명 38px)
  DECK.slide({
    id: 'p3-ch02-s07', dur: 2.8, steps: [], notes: NOTES['p3-ch02-s07'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 2, title: CH });
      this.sm = TH.statement(el, 'AI 호출 요금은\n따로 청구됩니다', { em: ['따로'], cy: 418, size: 180, sub: 'API 사용은 Plus와 따로 청구됩니다', at: 0.3 });
      css(this.sm.el.querySelector('.p3-statement-sub'), { fontSize: '48px', marginTop: '26px' });
      this.sm.el.style.top = Math.round(418 - this.sm.el.offsetHeight / 2) + 'px';   // 보조 줄을 키운 만큼 세로 가운데를 다시 맞춘다
      const Y = 712, H = 226, W = 828, G = 24;
      this.cards = [
        ['민원 상담 프로젝트', 'ChatGPT Plus 구독으로 사용'],
        ['민원 상담 서비스 → AI 호출 · API', 'API 요금 · Plus와 따로, 쓰는 만큼(토큰 기준) 청구'],
      ].map(([t, d], i) => {
        const tl = TH.tile(el, { x: 120 + i * (W + G), y: Y, w: W, h: H, title: t, text: d, titleSize: 48, textSize: 38, at: 1.6 + i * 0.15 });
        css(tl.el, { padding: '34px 40px 38px' });
        css(tl.title, { whiteSpace: 'nowrap' });
        css(tl.text, { color: 'var(--ink)', marginTop: '12px', whiteSpace: 'nowrap' });
        // 둘째 칸(서비스)은 주황 선 4px 로 「따로」와 잇는다(면이 아니라 테두리)
        if (i) css(tl.el, { boxShadow: 'inset 0 0 0 4px var(--p3-orange)' });
        return tl;
      });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.sm.render(lt);
      this.cards.forEach(c => c.render(lt));
      this.cards.forEach((c, i) => { TH.reveal(c.title, lt, 1.75 + i * 0.15, { dx: -14 }); TH.reveal(c.text, lt, 1.85 + i * 0.15, { dx: -14 }); });
    },
  });

  // ── s08 L4 가로 순서(세 칸) ── 「내 PC」 → 「배포」(주황 면) → 「공개 주소」. 흰 점이 왼쪽 칸에서 오른쪽 칸으로 지나간다
  DECK.slide({
    id: 'p3-ch02-s08', dur: 3.2, steps: [], notes: NOTES['p3-ch02-s08'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 2, title: CH });
      this.tt = TH.pageTitle(el, '배포는 누구나 여는 주소에 올리는 일입니다');
      this.b1 = bodyLine(el, '내 PC에 둔 파일은 나만 엽니다', 240);
      const Y = 340, H = 520, X0 = 120, X1 = 1800, GAP = 16, N = 3, W = (X1 - X0 - GAP * (N - 1)) / N, PY = 316;
      this.sq = TH.sequence(el, [{ label: '내 PC' }, { label: '배포', tone: 'now' }, { label: '공개 주소' }],
        { x0: X0, x1: X1, y: Y, h: H, gap: GAP, size: 72, numSize: 120, at: 0.6, each: 0.12 });
      const KEYS = ['file', 'arrow', 'globe'];
      this.sq.cells.forEach((c, i) => {
        css(c.c, { padding: '34px 44px 40px' });
        c.ic = icon(c.c, KEYS[i], i === 1 ? 150 : 120, { position: 'absolute', right: '44px', top: '36px', color: i === 1 ? 'var(--p3-black)' : 'var(--ink)' });
      });
      const notes = (c, mono, say) => {
        const m = tx('div', 'p3-mono', c.c, mono, { fontSize: '36px', lineHeight: '1.3', color: 'var(--dim)', marginTop: '22px', whiteSpace: 'nowrap' });
        const t = tx('div', '', c.c, say, { fontSize: '44px', lineHeight: '1.3', fontWeight: '700', color: 'var(--ink)', marginTop: '8px', whiteSpace: 'nowrap' });
        return [m, t];
      };
      this.nL = notes(this.sq.cells[0], '바탕 화면의 index.html', '나만 엽니다');
      this.nR = notes(this.sq.cells[2], 'https:// …', '누구나 엽니다');
      // 「배포」 칸도 설명 자리만큼 비워 세 칸의 이름을 같은 높이에 둔다
      tx('div', '', this.sq.cells[1].c, null, { flex: 'none', height: (this.nL[0].offsetHeight + this.nL[1].offsetHeight + 30) + 'px' });
      const cx = i => X0 + i * (W + GAP) + W / 2;
      // 점은 1.3초에 왼쪽 칸 가운데 위, 1.8초에 「배포」 칸, 2.3초에 오른쪽 칸 가운데 위
      this.pa = TH.path(el, [[X0, PY], [cx(0), PY], [cx(1), PY], [cx(2), PY]], { times: [1.15, 1.3, 1.8, 2.3], tail: 0.35, baseAt: 0.8 });
      this.b2 = bodyLine(el, '3장에서는 공개 범위를 정하기만 합니다', 892, { fontWeight: '700' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.b1, lt, 0.5);
      this.sq.render(lt); this.pa.render(lt);
      this.sq.cells.forEach((c, i) => TH.reveal(c.ic, lt, 0.9 + i * 0.12, { dx: 0, dy: 18 }));
      this.nL.forEach((e, i) => TH.reveal(e, lt, 1.0 + i * 0.1, { dx: -12 }));
      this.nR.forEach((e, i) => TH.reveal(e, lt, 2.3 + i * 0.1, { dx: -12 }));
      TH.reveal(this.b2, lt, 2.6, { dx: 0, dy: 10 });
    },
  });

  // ── s09 L9 카드 격자(셋)와 다음 질문 ── 칸 셋(536×410)에 번호 110px와 정리 문장(48px), 아래 「다음 질문」 주황 면(질문 56px 두 줄)
  DECK.slide({
    id: 'p3-ch02-s09', dur: 3.2, steps: [], notes: NOTES['p3-ch02-s09'],
    setup(el) {
      this.bg = TH.bg(el, 'accent');
      this.hd = TH.header(el, { chapter: 2, title: CH, fiction: true });
      this.tt = TH.pageTitle(el, '서비스는 이 구성 요소를 갖춰야 합니다');
      this.tr = TH.tileRow(el, [
        { n: 1, title: '화면·서버·DB가 질문을 처리합니다' },
        { n: 2, title: '인증·인가로 누가 무엇을 할지 정합니다' },
        { n: 3, title: 'AI 호출 요금과 배포\u00A0범위를 정합니다' },   // 「배포 범위」가 줄 끝에서 나뉘지 않게
      ], { y: 258, h: 420, titleSize: 48, at: 0.5, each: 0.2 });
      this.nq = TH.nextQ(el, { x: 120, bottom: 970, w: 1680, size: 56, focus: true, at: 2.3,
        text: '개발자가 아닌 한서윤 주임이\n이 가운데 어디까지 직접 만들 수 있는가' });
      css(this.nq.el.querySelector('.p3-card-label'), { fontSize: '34px' });
      this.nq.el.style.top = (970 - this.nq.el.offsetHeight) + 'px';   // 이름표를 키운 만큼 아래 끝을 다시 맞춘다
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      this.tr.render(lt);
      this.tr.tiles.forEach((t, i) => TH.reveal(t.title, lt, 0.75 + i * 0.2, { dx: 0, dy: 16 }));
      this.nq.render(lt, ctx);
      TH.reveal(this.nq.q, lt, 2.55, { dx: -14 });
    },
  });
})();
