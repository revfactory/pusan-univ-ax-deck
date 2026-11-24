/* 파트 3 · 4장 「시연: 에이전트 팀이 민원 상담 서비스를 만든다」(DEMO-3, 강사 시연)
 * 원고 plan/slides/p3-ch04.json, 배정표 plan/assets/p3_layout_ch04.md. 좌표가 둘에서 다르면 원고를 따랐다.
 * 테마 「주황 면」(deck/themes/p3.md). 색은 CSS 변수와 테마 부품으로만 쓴다. 연두는 승인 표시(s04 고리와 이름표, s07 고리, s09 이름표)에만.
 * 레이아웃: s01 L0 · s02 L7 · s03 L8 · s03a L9 · s04 L14 · s05 L1 · s06 L11 · s07 L13 · s08 L3 · s09 L2 · s10 L9.
 * 시연 장의 구도: s03 요청문 중심, s07 화면 중심, s08·s09 기대 결과 중심.
 * 키 누름은 s06(허용·거절의 답) 한 번뿐이다. 나머지 장은 키 없이 3.5초 안에 끝 상태가 된다.
 * 리허설 캡처(deck/assets/p3/shots/)가 없어서 s07·s08은 그린 화면으로 만들었다.
 * 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다. */
(function () {
  'use strict';
  const { ease, prog, clamp, lerp, css, h, s } = REEL;
  const TH = window.THEME;
  DECK.config({ part: 'p3', chapter: 'ch04', title: '시연: 에이전트 팀이 민원 상담 서비스를 만든다' });
  const CH = '시연: 에이전트 팀이 민원 상담 서비스를 만든다';   // 머리말 챕터 제목

  // 강사 메모: 원고의 notes 를 그대로 옮겼다
  const NOTES = {
    "p3-ch04-s01": "3장에서 여러분은 환불 금액과 주차 요금을 계산하는 민원 안내 화면을 만들었습니다. 그 화면에 서버와 AI 답변, 기록 저장을 더하는 일은 누가 합니까. 4장은 여러분이 따라 하는 실습이 아니라 강사 시연입니다. 노트북은 잠시 두고 화면을 봐 주세요.",
    "p3-ch04-s02": "3장에서 만든 민원 안내 화면의 상담 창입니다. 목과 실제 구분표에 적은 대로 환불·주차 계산과 질문 검색은 실제로 동작하고, 상담 창은 정해 둔 예시 질문에 정해 둔 답만 보여 주는 목이었습니다. 구분표 아래 칸에 목인 부분을 실제로 동작하게 하려면 무엇이 더 필요한지 한 줄로 적으셨을 텐데, 2장에서 본 질문 한 건의 경로로 말하면 서버, AI 호출, 기록 저장입니다. 개발자가 아닌 한서윤 주임이 이 부분을 직접 만들기는 어렵습니다. 이 일을 누가 하는지 지금부터 강사 시연으로 보여 드립니다. (화면에서 옮긴 문구: 「고객지원팀」)",
    "p3-ch04-s03": "도구는 파트 1 8장에서 본 Claude Code와 harness이고, Claude Pro 이상 요금제에 들어 있는 도구라(2026년 11월 기준) 여러분의 ChatGPT Plus 계정으로는 따라 할 수 없습니다. 시작 폴더에는 3장 완성본 화면과 규정 파일, 파트 2 시험표를 복사해 두었습니다. 기존 과정 자료를 보면 강사가 에이전트 팀을 실행했을 때 기획·화면 시안 회차는 약 1시간 30분에서 5시간, 이번 시연에 가까운 서버·로그인·AI 기능 회차는 약 4시간 2분에서 8시간 34분이 걸렸습니다. 에이전트가 일한 시간만 잰 값이고 사람의 답을 기다린 시간이 빠져 있어, 실제로는 이보다 깁니다. 그래서 강의 시간에는 처음부터 실행하지 않고, 강의 전 리허설에서 이 요청으로 실행한 기록을 보여 드립니다.",
    "p3-ch04-s03a": "요청 문단에서 더할 것, 지킬 것, 단계마다 승인받는 순서, API 키를 다루는 법, 결과를 보고하는 법을 차례로 읽겠습니다. 넷째 구절의 API 키는 2장에서 본 비밀 문자열이고, .env는 그 키를 적어 두는 파일입니다.",
    "p3-ch04-s04": "요청에 적은 진행 순서를 그림으로 옮겼습니다. 요청은 팀이 요구사항, 화면, 서버, 시험 순서로 일하고, 단계가 끝날 때마다 결과를 보여 주고 사람의 답을 기다리게 했습니다. 요청에 적은 이 네 자리를 이 챕터에서는 승인 단계라고 부르고, 마지막 시험은 파트 2 6장에서 여러분이 채점한 시험표 12개입니다. 사람이 승인하면 다음 단계로 갑니다. 이 그림은 요청에 적은 내용이고, 팀이 실제로 몇 번 멈췄는지는 리허설 기록으로 봅니다. 시연을 보면서 아래 세 가지를 확인해 주세요. (강사 확인: 리허설(K-10)에서 팀이 멈춘 단계와 횟수를 확인해 이 메모를 고칩니다. 리허설 전에는 횟수를 말하지 않습니다.)",
    "p3-ch04-s05": "요청대로라면 팀은 요구사항 단계를 끝내고 이 자리에서 멈춥니다. 강사 시연 화면에는 리허설에서 찍은 화면이 나오고, 사람은 여기서 요구사항을 읽고 승인합니다. 먼저 찾을 줄은 요청에 적은 「개인정보는 저장하지 않는다」이고, 다음은 저장할 상담 기록의 항목인 질문, 답, 근거 조문, 시각입니다. 질문을 저장하라고 했는데 민원인이 질문에 이름이나 전화번호를 적으면 어떻게 하는지도 요구사항에 적혀 있어야 합니다. 3장에서 Work가 계획을 먼저 보여 주면 읽고 승인하기로 한 것과 같은 일이고, 빠진 줄이 있으면 승인하지 않고 넣어서 다시 보여 달라고 요청합니다. 화면에서 개인정보 줄을 먼저 찾은 분은 손을 들어 주세요. (강사 확인: 리허설(K-10) 캡처를 찍은 뒤, 개인정보 줄이 요구사항에 어떤 문장으로 적혔는지 이 메모에 옮깁니다.)",
    "p3-ch04-s06": "권한 확인 창은 에이전트가 파일을 고치거나 명령을 실행하기 전에 무엇을 하려는지 보여 주고 사람에게 묻는 창이고, 허용하면 실행하고 거절하면 실행하지 않습니다. 네 가지를 차례로 읽을 테니 허용해도 된다고 생각하면 손을 들어 주세요. (키) 답은 ①과 ②는 허용, ③과 ④는 거절입니다. 시연 폴더 안에서 끝나는 일과 요청한 시험은 허용하고, 폴더 밖을 지우거나 API 키를 외부 사이트로 보내는 명령은 거절합니다. 파일을 읽기만 하는 명령에는 이 창이 뜨지 않으므로, 리허설 폴더에는 API 키를 적은 .env 파일을 읽지 못하게 막는 규칙을 따로 두었습니다. 이어서 리허설에서 실제로 뜬 권한 확인 창을 강사 시연 화면으로 봅니다. (강사 확인: 리허설(K-10)에서 권한 확인 창이 뜬 명령과 허용·거절 결과를 표로 적고, ①~④에 해당하는 실제 명령을 이 메모에 옮깁니다.)",
    "p3-ch04-s07": "이제 리허설에서 승인 단계 하나 앞에 멈춰 둔 작업을 열어, 그 승인을 이 자리에서 실제로 답하겠습니다. 팀이 무엇을 보여 주고 무엇을 묻는지, 강사가 무엇을 읽고 답하는지, 답한 뒤 다음 단계가 시작되는지 봐 주세요. 응답이 오래 걸리면 기다리지 않고 리허설에서 찍은 화면으로 설명합니다. (강사 확인: 리허설 2에서 승인 단계 하나 앞에서 닫아 둔 폴더에서 claude -c로 세션을 엽니다. 열리지 않으면 claude -r에 적어 둔 세션 ID를 넣고, 그래도 안 되면 리허설 1의 캡처로 넘어갑니다. 멈춘 단계 이름과 입력할 답은 리허설 뒤에 이 메모와 고리 아래 이름표에 적습니다.)",
    "p3-ch04-s08": "이 두 면에는 리허설 결과 폴더의 서비스를 연 화면이 들어갑니다. 왼쪽은 시험표 T01 질문에 상담 창이 답한 화면이고, 오른쪽은 담당자가 보는 상담 기록 화면입니다. T01은 3장 계산 화면에서 26,000원과 제7조 제1항 제2호를 확인한 요가 환불 질문이므로, 상담 창의 답을 왼쪽 면의 기준 답과 대조합니다. 상담 기록에는 질문, 답, 근거 조문, 시각이 남아야 하고, 가상의 이름, 전화번호, 주민등록번호를 넣은 T11 질문의 기록에 그 값이 저장되지 않았는지 봅니다. (강사 확인: 리허설(K-10) 캡처를 넣은 뒤 상담 창의 금액·조문이 기준 답과 같은지, T11 기록에 개인정보가 남았는지를 이 메모에 적습니다. 리허설 전에는 결과를 말하지 않습니다.) (화면에서 옮긴 문구: 「답에 근거 조문이 붙는가」)",
    "p3-ch04-s09": "요청은 팀이 파트 2 6장에서 여러분이 채점한 것과 같은 시험표 12개를 상담 창에 넣고, 몇 개가 통과했는지로 보고하게 했습니다. 통과 기준은 시험표에 적힌 대로 12개 가운데 11개 이상이고, 개인정보와 지시 바꾸기를 보는 규칙 시험 T11과 T12는 하나도 실패하면 안 됩니다. 보고를 받으면 통과 수와 함께 실패한 시험의 번호를 봅니다. 기준을 넘어도 이 서비스를 쓸지는 사람이 정하고, 시험을 통과한 것만으로 공단 이름으로 열 수 없는 까닭은 6장에서 봅니다. (강사 확인: 리허설(K-10)의 통과 수와 실패한 시험 번호를 이 메모에 적습니다. 리허설 전에는 통과 수를 말하지 않습니다.)",
    "p3-ch04-s10": "에이전트 팀이 요구사항부터 시험까지 만드는 동안 사람이 맡는 일은 세 가지입니다. 단계가 끝날 때마다 결과를 읽고 승인하고, 에이전트가 실행 전에 묻는 권한 확인 창에서 명령을 허용하거나 거절합니다. API 키는 강사가 .env 파일에 직접 적고, 에이전트에게는 값을 말하거나 붙여 넣지 않습니다. 그러면 실제 서비스에서는 어느 지점에서 누가 무엇을 정합니까. 5장에서는 오늘 요청에 적은 승인 단계 네 개를 승인 지점 8곳 표에 놓아 보고, 새별시설공단에서 지점마다 누가 정하는지 봅니다. 8곳은 이 강의의 바탕이 된 기존 과정에서 서비스 하나를 만들고 운영하며 사람이 승인한 자리입니다.",
  };

  const tx = (tag, cls, parent, text, style) => { const e = h(tag, cls, parent); if (text != null) e.textContent = text; if (style) css(e, style); return e; };
  // 왼쪽부터 펼쳐지는 면(clip-path)
  const openL = (e, lt, at, dur = 0.6, r = 20) => { const p = prog(lt, at, dur, ease.outQuart); e.style.clipPath = p < 1 ? `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0 round ${r}px)` : 'none'; };
  // 아래에서 올라오는 칸(위 끝부터 드러나고 조금 올라온다)
  const rise = (e, lt, at, dur = 0.55, dy = 28, r = 14) => {
    const p = prog(lt, at, dur, ease.outQuart);
    e.style.clipPath = p < 1 ? `inset(${((1 - p) * 100).toFixed(2)}% 0 0 0 round ${r}px)` : 'none';
    e.style.transform = p < 1 ? `translateY(${((1 - p) * dy).toFixed(1)}px)` : 'none';
  };
  // 「강사 시연 화면」 줄: 오른쪽 끝 x 1800 에 맞춘 한 줄(4장 시연 장마다 같은 자리). parts: [{ text, box, dim }]
  const demoRow = (el, parts, top) => {
    const row = tx('div', 'a', el, null, { right: '120px', top: top + 'px', display: 'flex', alignItems: 'center', gap: '24px', whiteSpace: 'nowrap' });
    parts.forEach(p => tx('span', '', row, p.text, p.box
      ? { fontSize: '34px', lineHeight: '1.2', fontWeight: '700', color: 'var(--ink)', border: '2px solid var(--ink)', borderRadius: '8px', padding: '4px 16px' }
      : { fontSize: '34px', lineHeight: '1.3', fontWeight: '500', color: p.dim ? 'var(--dim)' : 'var(--ink)' }));
    return row;
  };
  // 흰 2px 테두리 꼬리표(34px)
  const tag = (el, text, style) => tx('div', 'a', el, text, Object.assign({ fontSize: '34px', lineHeight: '1.2', fontWeight: '700', color: 'var(--ink)',
    border: '2px solid var(--ink)', borderRadius: '8px', padding: '4px 16px', whiteSpace: 'nowrap' }, style || {}));
  // 요소 e 안의 글자 조각 상자들을 기준 요소 ref 의 무대 px 로(줄마다 하나씩)
  const rectsIn = (e, ref) => {
    const A = ref.getBoundingClientRect(), k = ref.offsetWidth / (A.width || 1);
    return [...e.getClientRects()].filter(r => r.width > 1).map(r => ({ x: (r.left - A.left) * k, y: (r.top - A.top) * k, w: r.width * k, h: r.height * k }));
  };
  // 문단의 줄 상자: 글자 조각을 위 끝이 같은 것끼리 묶는다
  const lineBoxes = (para, ref) => {
    const rg = document.createRange(); rg.selectNodeContents(para);
    const A = ref.getBoundingClientRect(), k = ref.offsetWidth / (A.width || 1);
    const out = [];
    [...rg.getClientRects()].filter(r => r.width > 1).forEach(r => {
      const b = { x: (r.left - A.left) * k, y: (r.top - A.top) * k, r: (r.right - A.left) * k, b: (r.bottom - A.top) * k };
      const L = out.find(o => Math.abs(o.cy - (b.y + b.b) / 2) < 14);
      if (L) { L.x = Math.min(L.x, b.x); L.r = Math.max(L.r, b.r); L.y = Math.min(L.y, b.y); L.b = Math.max(L.b, b.b); }
      else out.push(Object.assign(b, { cy: (b.y + b.b) / 2 }));
    });
    return out.sort((a, b) => a.y - b.y);
  };

  // ── s01 L0 영상 띠 전환 ── 전환 영상 p3-tr-rings 정방향(4장), 흑백으로 띠 위쪽에. 머리 줄 오른쪽에 검정 칩 「강사 시연」
  DECK.slide({
    id: 'p3-ch04-s01', dur: 2.8, steps: [], notes: NOTES['p3-ch04-s01'],
    setup(el) {
      this.vt = TH.videoTitle(el, {
        kind: 'chapter', kicker: '파트 3 · 4장', title: '시연: 에이전트 팀이\n민원 상담 서비스를 만든다', at: 0.45,
        sub: '안내 화면에 서버와 AI 답변, 기록 저장을 더하는 일은 누가 하는가',
        src: '../assets/video/p3/p3-tr-rings.mp4', poster: '../assets/video/p3/p3-tr-rings.jpg',
      });
      const kick = this.vt.el.querySelector('.p3-vt-kicker');
      this.chip = tx('span', 'p3-chip', kick, '강사 시연', { position: 'relative', left: 'auto', top: 'auto', marginLeft: '18px',
        padding: '6px 22px', borderRadius: '8px', fontSize: '34px', fontWeight: '800', lineHeight: '1.2' });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); TH.reveal(this.chip, lt, 0.8, { dx: -14, dur: 0.4 }); },
  });

  // ── s02 L7 인물과 대사 ── 한서윤 주임의 고리(지름 280)와 130px 대사(사람 표시 오른쪽 전체 폭). 아래에 질문 한 건의 경로 칸 다섯 개(높이 110, 「화면」만 3장에서 만듦)
  DECK.slide({
    id: 'p3-ch04-s02', dur: 3.4, steps: [], notes: NOTES['p3-ch04-s02'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 4, title: CH, fiction: true });
      this.tt = TH.pageTitle(el, '상담 창은 아직 정해 둔 답만 냅니다');
      // 130px 대사 세 줄의 줄 간격을 1.1로(테마 기본 1.2). 제목 막대 자리가 맞도록 부품을 만들기 전에 이 장에만 건다
      tx('style', '', el, '[data-slide="p3-ch04-s02"] .p3-quote .p3-title { line-height: 1.1; }');
      this.qt = TH.quote(el, { who: '한서윤', x: 120, y: 316, size: 130, org: false, at: 0.3, qx: 520,
        text: '상담 창이 규정으로\n답하게 하려면\n누가 만듭니까?',
        sub: TH.keepWords('3장 구분표: 계산·검색은 실제, 상담 창은 목', ['상담 창은 목']) });
      css(this.qt.el.querySelector('.p3-quote-sub'), { marginTop: '22px' });
      this.qt.el.style.top = '242px';                       // 대사 세 줄의 가운데(y 456)가 인물 고리 가운데와 같다
      // 경로 칸: 「화면」 칸을 넓혀(520) 아래 설명을 두 줄로 두고, 나머지 네 칸은 고르게 나눈다
      const Y = 766, H = 110, GAP = 24, W0 = 520, W = (1680 - W0 - GAP * 4) / 4;
      const xs = [120, ...[0, 1, 2, 3].map(i => 120 + W0 + GAP + i * (W + GAP))];
      this.cells = ['화면', '서버', 'AI 호출', '답변', '기록 저장'].map((t, i) => {
        const on = i === 0;
        const c = tx('div', 'a', el, t, { left: xs[i].toFixed(1) + 'px', top: Y + 'px', width: (on ? W0 : W).toFixed(1) + 'px', height: H + 'px',
          boxSizing: 'border-box', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: on ? 'var(--p3-paper)' : 'transparent', border: on ? '0' : '3px dashed #6A6A66', color: on ? 'var(--p3-black)' : 'var(--ink)',
          fontFamily: 'var(--display)', fontWeight: '800', fontSize: '44px', letterSpacing: '-0.02em', whiteSpace: 'nowrap' });
        return { c, t: 2.4 + i * 0.08 };
      });
      this.n1 = tx('div', 'a', el, null, { left: '120px', top: (Y + H + 18) + 'px', width: W0 + 'px', fontSize: '34px', lineHeight: '1.25', color: 'var(--dim)', wordBreak: 'keep-all', textWrap: 'balance' });
      tx('b', '', this.n1, '3장에서 만듦', { color: 'var(--ink)', fontWeight: '700' });
      this.n1.appendChild(document.createTextNode(' · 시범 화면: 정해 둔 답만 보여 줍니다'));
      this.n2 = tx('div', 'a', el, '더할 것: 서버, AI 답변, 기록 저장', { left: xs[1].toFixed(1) + 'px', top: (Y + H + 18) + 'px', fontSize: '34px', lineHeight: '1.25',
        fontWeight: '600', color: 'var(--ink)', whiteSpace: 'nowrap' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.qt.render(lt);
      this.cells.forEach(o => rise(o.c, lt, o.t, 0.45, 30, 16));
      TH.reveal(this.n1, lt, 3.0, { dx: 0, dy: 12, dur: 0.4 });
      TH.reveal(this.n2, lt, 3.0, { dx: -14, dur: 0.4 });
    },
  });

  // ── s03 L8 원문 인용 ── 한 문단 요청 전문을 밝은 종이(1680폭) 46px 한 문단으로. 승인 문장 뒤에 줄 단위 주황 면(이 장의 강조), 다른 두 문장은 주황 밑줄
  const REQ = [
    ['mono', 'labs/lab7/완성본/index.html'],
    ['', '은 새별시설공단(실습용 가상 기관)의 민원 안내 화면이다. 이 화면에 서버를 붙여 상담 창이 정해 둔 답 대신 규정 파일을 근거로 실제 답을 하게 하고, 상담 기록(질문, 답, 근거 조문, 시각)을 저장해 담당자가 볼 수 있게 해 줘. '],
    ['b1', '개인정보는 저장하지 않는다.'],
    ['', ' 요구사항, 화면, 서버, 시험 순서로 진행하고, '],
    ['b2', '단계가 끝날 때마다 나에게 결과를 보여 주고 승인을 받은 뒤 다음 단계로 간다.'],
    ['', ' '],
    ['b3', 'API 키는 .env에서만 읽고 코드나 대화에 쓰지 않는다.'],
    ['', ' 시험은 '],
    ['mono', 'labs/lab4/시험표.md'],
    ['', '의 12개를 상담 창에 넣어 통과 수를 보고한다.'],
  ];
  DECK.slide({
    id: 'p3-ch04-s03', dur: 3.0, steps: [], notes: NOTES['p3-ch04-s03'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 4, title: CH, fiction: true });
      this.tt = TH.pageTitle(el, '에이전트 팀에 한 문단으로 맡깁니다');
      this.tg = tag(el, '강사 시연 · Claude Code · 따라 하지 않고 봅니다', { left: '120px', top: '246px' });
      const pp = tx('div', 'p3-doc', el, null, { left: '120px', top: '316px', width: '1680px', padding: '34px 46px 38px' });
      const para = tx('div', '', pp, null, { position: 'relative', fontSize: '46px', lineHeight: '1.46', fontWeight: '500', color: 'var(--p3-black)', wordBreak: 'keep-all', letterSpacing: '-0.01em' });
      const sp = {};
      REQ.forEach(([k, t]) => {
        if (!k) { para.appendChild(document.createTextNode(t)); return; }
        const e = tx('span', '', para, t, k === 'mono' ? { fontFamily: 'var(--mono)', fontSize: '42px', whiteSpace: 'nowrap', letterSpacing: '0' } : { fontWeight: '700' });
        sp[k] = e;
      });
      // 줄마다 가림 막(종이 색)이 왼쪽부터 걷힌다
      this.covers = lineBoxes(para, pp).map((L, i) => {
        const c = tx('div', 'a', pp, null, { left: (L.x - 6).toFixed(1) + 'px', top: (L.y - 2).toFixed(1) + 'px', width: (L.r - L.x + 12).toFixed(1) + 'px', height: (L.b - L.y + 4).toFixed(1) + 'px',
          background: 'var(--p3-paper)', transformOrigin: '100% 50%' });
        return { c, t: 0.9 + i * 0.06 };
      });
      // 승인 문장 뒤의 줄 단위 주황 면(글자 뒤에 깐다)
      this.hl = rectsIn(sp.b2, pp).map((r, j) => {
        const d = tx('div', 'a', pp, null, { left: (r.x - 8).toFixed(1) + 'px', top: (r.y - 2).toFixed(1) + 'px', width: (r.w + 16).toFixed(1) + 'px', height: (r.h + 4).toFixed(1) + 'px',
          background: 'var(--p3-orange)', borderRadius: '6px', transformOrigin: '0 50%', transform: 'scaleX(0)' });
        pp.insertBefore(d, para);
        return { d, t: 2.0 + j * 0.15 };
      });
      // 첫째·셋째 곳의 주황 밑줄 4px
      this.ul = ['b1', 'b3'].flatMap(k => rectsIn(sp[k], pp)).map(r => ({
        d: tx('div', 'a', pp, null, { left: r.x.toFixed(1) + 'px', top: (r.y + r.h - 3).toFixed(1) + 'px', width: r.w.toFixed(1) + 'px', height: '4px',
          background: 'var(--p3-orange)', transformOrigin: '0 50%', transform: 'scaleX(0)' }),
      }));
      this.pp = pp;
      const pb = 316 + pp.offsetHeight;
      this.bt = tx('div', 'a', el, '파트 1 8장의 Claude Code와 harness · 시작: 3장 화면, 규정 파일, 시험표', { left: '120px', top: Math.max(948, pb + 20) + 'px',
        fontSize: '34px', lineHeight: '1.3', color: 'var(--dim)', whiteSpace: 'nowrap' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.tg, lt, 0.45, { dx: -16 });
      const pq = prog(lt, 0.6, 0.6, ease.outQuart);
      this.pp.style.clipPath = pq < 1 ? `inset(0 0 ${((1 - pq) * 100).toFixed(2)}% 0 round 8px)` : 'none';
      this.covers.forEach(o => { const p = prog(lt, o.t, 0.35, ease.inOutCubic); o.c.style.transform = `scaleX(${(1 - p).toFixed(4)})`; o.c.style.display = p >= 1 ? 'none' : ''; });
      this.ul.forEach(o => { o.d.style.transform = `scaleX(${prog(lt, 1.8, 0.3, ease.outQuart).toFixed(4)})`; });
      this.hl.forEach(o => { o.d.style.transform = `scaleX(${prog(lt, o.t, 0.45, ease.inOutCubic).toFixed(4)})`; });
      TH.reveal(this.bt, lt, 2.6, { dx: 0, dy: 12, dur: 0.4 });
    },
  });

  // ── s03a L9 카드 격자(다섯 칸) ── 앞 장의 요청을 구절 순서대로 나눈 칸. 「순서」 칸만 주황 면(이 장의 강조). 아래 띠에 「비밀 값」 칸의 낱말 풀이 둘
  const NB = t => t.replace(/ (→|·)/g, ' $1');   // 「→」「·」 앞에서 줄이 바뀌지 않게(뒤에서 바꾼다)
  DECK.slide({
    id: 'p3-ch04-s03a', dur: 3.0, steps: [], notes: NOTES['p3-ch04-s03a'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 4, title: CH, fiction: true, at: -1 });
      this.tt = TH.pageTitle(el, '더할 기능부터 보고 방법까지 적었습니다');
      this.tr = TH.tileRow(el, [
        { n: 1, title: '더할 것', text: NB('서버 · 규정 근거 답 · 상담 기록') },
        { n: 2, title: '지킬 것', text: '개인정보는 저장하지 않는다' },
        { n: 3, title: '순서', text: NB('요구사항 → 화면 → 서버 → 시험') + '\n단계마다 승인을 받고 다음으로', tone: 'orange' },
        { n: 4, title: '비밀 값', text: 'API 키는 .env에서만 읽는다' },
        { n: 5, title: '보고', text: NB('파트 2 시험표 12개 → 통과 수') },
      ], { y: 260, h: 600, gap: 24, at: 0.5, each: 0.14, textSize: 36 });
      this.tr.tiles.forEach((t, i) => {
        css(t.el, { padding: '34px 30px 36px' });
        css(t.text, { color: 'var(--ink)', lineHeight: '1.38', fontWeight: '500' });
        if (i === 3) {                                       // .env 는 고정폭 글꼴
          t.text.textContent = 'API 키는 ';
          tx('span', '', t.text, '.env', { fontFamily: 'var(--mono)' });
          t.text.appendChild(document.createTextNode('에서만 읽는다'));
        }
      });
      const tH = Math.max(...this.tr.tiles.map(t => t.text.scrollHeight));
      this.tr.tiles.forEach(t => { t.text.style.minHeight = tH + 'px'; });
      this.band = tx('div', 'a', el, null, { left: '120px', top: '884px', width: '1680px', height: '80px', borderRadius: '16px', background: 'var(--panel)' });
      const gl = (x, word, mono, rest) => {
        const d = tx('div', 'a', el, null, { left: x + 'px', top: '903px', fontSize: '36px', lineHeight: '1.2', color: 'var(--ink)', whiteSpace: 'nowrap' });
        tx('b', '', d, word, Object.assign({ fontWeight: '700' }, mono ? { fontFamily: 'var(--mono)' } : {}));
        d.appendChild(document.createTextNode(rest));
        return d;
      };
      this.g1 = gl(160, 'API 키', false, ' · 2장에서 본 비밀 문자열');
      this.g2 = gl(980, '.env', true, ' · 그 키를 적어 두는 파일');
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.tr.render(lt);
      this.tr.tiles.forEach((t, i) => {
        const t0 = 0.5 + i * 0.14 + 0.3;
        TH.reveal(t.title, lt, t0 + 0.05, { dx: 0, dy: 14, dur: 0.4 });
        TH.reveal(t.text, lt, t0 + 0.1, { dx: 0, dy: 14, dur: 0.4 });
      });
      openL(this.band, lt, 2.0, 0.6, 16);
      TH.reveal(this.g1, lt, 2.3, { dx: -14, dur: 0.45 });
      TH.reveal(this.g2, lt, 2.45, { dx: -14, dur: 0.45 });
    },
  });
  // ── s04 L14 승인 지점 줄(넷) ── 시작 칸 「한 문단 요청」에서 열린 연두 고리 넷으로. 첫 고리 위 연두 이름표. 아래 「시연에서 볼 것」 주황 면(이 장의 강조)
  DECK.slide({
    id: 'p3-ch04-s04', dur: 3.2, steps: [], notes: NOTES['p3-ch04-s04'],
    setup(el) {
      this.bg = TH.bg(el, 'accent');
      this.hd = TH.header(el, { chapter: 4, title: CH });
      this.tt = TH.pageTitle(el, '단계마다 멈추고 승인을 받게 했습니다');
      this.sb = tx('div', 'a', el, '실제로 멈춘 자리는 리허설 기록으로 봅니다', { left: '120px', top: '246px', fontSize: '40px', lineHeight: '1.3', color: 'var(--dim)', whiteSpace: 'nowrap' });
      const GY = 470, R = 76;
      this.st = tx('div', 'a', el, '한 문단 요청', { left: '120px', top: (GY - 48) + 'px', width: '320px', height: '96px', boxSizing: 'border-box', border: '2px solid var(--ink)',
        borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: '800', color: 'var(--ink)', whiteSpace: 'nowrap' });
      // 시작 칸 오른쪽 끝(440)에서 고리 줄 시작(520)까지 회색 선. 고리 줄의 선은 THEME.gates 가 긋는다
      const svg = s('svg', { width: 1920, height: 1080, viewBox: '0 0 1920 1080' }, el);
      svg.setAttribute('class', 'p3-gates-line');
      this.ln = s('path', { d: `M 440 ${GY} L 520 ${GY}`, fill: 'none' }, svg);
      KIT.drawPrep(this.ln);
      this.gt = TH.gates(el, ['요구사항', '화면', '서버', '시험'].map(label => ({ label })), { x0: 520, x1: 1800, y: GY, r: R, size: 44, close: false, at: 0.9, each: 0.1 });
      // 첫 고리 위 연두 이름표(고리가 승인 자리라는 표시)
      const cx = this.gt.cols[0].cx;
      this.wt = tx('div', 'p3-gate-who', el, '승인 · 사람의 답을 기다린다', { fontSize: '34px', padding: '4px 20px', opacity: '0' });
      css(this.wt, { left: (cx - this.wt.offsetWidth / 2).toFixed(1) + 'px', top: (GY - R - 20 - this.wt.offsetHeight).toFixed(1) + 'px' });
      // 「시연에서 볼 것」 주황 면
      this.fc = tx('div', 'a', el, null, { left: '120px', top: '690px', width: '1680px', height: '280px', boxSizing: 'border-box', padding: '24px 48px 0',
        borderRadius: '20px', background: 'var(--p3-orange)', color: 'var(--p3-black)' });
      this.fl = tx('div', '', this.fc, '시연에서 볼 것', { fontSize: '34px', lineHeight: '1.3', fontWeight: '800', marginBottom: '8px' });
      this.fr = ['① 단계가 끝나면 멈추고 답을 기다리는가', '② 요구사항에 「개인정보는 저장하지 않는다」가 있는가', '③ 시험 12개 중 몇 개 통과로 보고하는가'].map((t, i) =>
        tx('div', '', this.fc, TH.keepWords(t, ['「개인정보는 저장하지 않는다」가 있는가']), { fontSize: '44px', lineHeight: '1.22', fontWeight: '600', marginTop: i ? '12px' : '0', wordBreak: 'keep-all' }));
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.sb, lt, 0.5, { dx: -14 });
      openL(this.st, lt, 0.7, 0.5, 14);
      KIT.draw(this.ln, prog(lt, 0.75, 0.3, ease.inOutSine));
      this.gt.render(lt);
      const q = prog(lt, 1.6, 0.4, ease.outCubic);
      this.wt.style.opacity = q.toFixed(3);
      this.wt.style.transform = q < 1 ? `translateY(${((1 - q) * 18).toFixed(1)}px)` : 'none';
      openL(this.fc, lt, 2.0, 0.6);
      TH.reveal(this.fl, lt, 2.3, { dx: -14, dur: 0.4 });
      this.fr.forEach((e, i) => TH.reveal(e, lt, 2.45 + i * 0.12, { dx: -16, dur: 0.45 }));
    },
  });

  // ── s05 L1 한 문장 ── 찾을 줄 「개인정보는 / 저장하지 않는다」(176px 두 줄을 엇갈려 화면 폭 전체, 이 장의 강조). 아래 승인 단계 칸 넷(높이 110, 40px, 지금은 「요구사항」)과 설명 줄, 강사 시연 화면 줄
  DECK.slide({
    id: 'p3-ch04-s05', dur: 3.4, steps: [], notes: NOTES['p3-ch04-s05'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 4, title: CH });
      this.tt = TH.pageTitle(el, '요구사항에서 개인정보 줄을 찾습니다');
      // 한 문장 묶음(THEME.statement 와 같은 구성). 176px 두 줄을 화면 폭 1680에 엇갈려 둔다: 첫 줄은 왼쪽, 둘째 줄은 오른쪽 끝(x 1800)에 맞춘다.
      // 둘째 줄 왼쪽에 생긴 자리에 보조 줄(44px, 「상담 기록:」 뒤에서 줄을 나눈다)을 둘째 줄 아래 끝에 맞춰 둔다
      const wrap = tx('div', 'a', el, null, { left: '120px', top: '236px', width: '1680px' });
      this.ld = tx('div', 'p3-statement-lead', wrap, '찾을 줄 · 요구사항 · 승인 단계', { fontSize: '34px', marginBottom: '6px' });
      const ST = { lineHeight: '1.04', letterSpacing: '-0.03em' };
      this.t1 = TH.title(wrap, '개인정보는', { flow: true, w: 1680, size: 176, exact: true, at: 0.7, weight: 900, style: ST });
      this.t2 = TH.title(wrap, '저장하지 않는다', { flow: true, w: 1680, size: 176, exact: true, at: 0.79, weight: 900, style: Object.assign({ textAlign: 'right' }, ST) });
      this.sb = tx('div', 'a p3-statement-sub', el, '상담 기록:\n질문, 답, 근거 조문, 시각', { left: '120px', marginTop: '0', fontSize: '44px', lineHeight: '1.25', whiteSpace: 'pre-line' });
      const b2 = 236 + this.t2.el.offsetTop + this.t2.el.offsetHeight;
      this.sb.style.top = (b2 - 22 - this.sb.offsetHeight).toFixed(0) + 'px';
      this.wrapH = wrap.offsetHeight;
      const Y = Math.round(236 + this.wrapH + 48), H = 110, GAP = 24, W = (1680 - GAP * 3) / 4;
      this.cells = ['요구사항', '화면', '서버', '시험'].map((t, i) => {
        const on = i === 0, x = 120 + i * (W + GAP);
        const c = tx('div', 'a', el, t, { left: x.toFixed(1) + 'px', top: Y + 'px', width: W.toFixed(1) + 'px', height: H + 'px', boxSizing: 'border-box', borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', border: on ? '0' : '3px dashed #6A6A66', color: on ? 'var(--ink)' : 'var(--dim)',
          fontSize: '40px', fontWeight: '700', whiteSpace: 'nowrap' });
        return { c, t: 2.0 + i * 0.08 };
      });
      // 「요구사항」 칸의 주황 테두리 4px: 선 그리기로 긋는다
      const svg = s('svg', { width: 1920, height: 1080, viewBox: '0 0 1920 1080' }, el);
      css(svg, { position: 'absolute', left: '0', top: '0', overflow: 'visible', pointerEvents: 'none' });
      this.box = s('rect', { x: 122, y: Y + 2, width: (W - 4).toFixed(1), height: H - 4, rx: 14, fill: 'none', 'stroke-width': 4 }, svg);
      this.box.style.stroke = 'var(--p3-orange)';
      KIT.drawPrep(this.box);
      // 「지금 이 자리」: 「요구사항」 칸 위 테두리에 걸친 이름표(바탕색 면으로 테두리 선을 가린다)
      this.now = tx('div', 'a', el, '지금 이 자리', { left: '146px', fontSize: '34px', lineHeight: '1.2', fontWeight: '700', color: 'var(--p3-orange-text)', whiteSpace: 'nowrap',
        padding: '0 12px', background: 'var(--bg)' });
      this.now.style.top = (Y - this.now.offsetHeight / 2).toFixed(0) + 'px';
      const BT = Y + H + 22;
      this.bt = tx('div', 'a', el, '팀이 멈추고 승인을 묻는 자리입니다 · 빠졌으면 승인하지 않고 다시 요청합니다', { left: '120px', top: BT + 'px', fontSize: '36px', lineHeight: '1.3', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.dr = demoRow(el, [{ text: 'Claude Code', dim: true }, { text: '강사 시연 화면', box: true }, { text: '볼 것: 요구사항의 개인정보 줄' }], BT + this.bt.offsetHeight + 22);
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.ld, lt, 0.5);
      this.t1.render(lt); this.t2.render(lt);
      TH.reveal(this.sb, lt, 1.6, { dx: 0, dy: 14 });
      this.cells.forEach(o => rise(o.c, lt, o.t, 0.45, 26, 16));
      KIT.draw(this.box, prog(lt, 2.4, 0.45, ease.inOutCubic));
      TH.reveal(this.now, lt, 2.45, { dx: 0, dy: 12, dur: 0.4 });
      TH.reveal(this.bt, lt, 2.7, { dx: -14, dur: 0.45 });
      TH.reveal(this.dr, lt, 2.9, { dx: 16, dur: 0.45 });
    },
  });

  // ── s06 L11 퀴즈(명령 넷) ── 키 한 번: 네 칸의 면이 어두워지고 칸 아래쪽에 답 「허용」「허용」「거절」「거절」(100px)이 놓인다
  const RV6 = 2.3;
  DECK.slide({
    id: 'p3-ch04-s06', dur: RV6 + 1.0, steps: [RV6], notes: NOTES['p3-ch04-s06'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 4, title: CH });
      this.tt = TH.pageTitle(el, '이 명령, 허용할까요 거절할까요?');
      this.sb = tx('div', 'a', el, null, { left: '120px', top: '246px', fontSize: '36px', lineHeight: '1.3', color: 'var(--ink)', whiteSpace: 'nowrap' });
      tx('b', '', this.sb, '권한 확인 창', { fontWeight: '700' });
      this.sb.appendChild(document.createTextNode(' · 실행 전에 사람에게 묻는 창 · 창이 뜨면 허용·거절은 사람이 정합니다'));
      const NOTE = ['허용', '허용', '거절', '거절'];
      this.qz = TH.quiz(el, ['시연 폴더 안에 파일 쓰기', '시험 12개 실행', '시연 폴더 밖의 파일 삭제', 'API 키를 외부 사이트로 보내기'],
        { x0: 120, x1: 1800, y: 330, h: 560, size: 44, fade: 'bg', labelTop: true, notes: NOTE, noteSize: 100, revealAt: RV6, at: 0.7, each: 0.12 });
      this.qz.items.forEach((it, i) => {
        it.lab.textContent = TH.keepWords(it.lab.textContent, ['파일 쓰기', '파일 삭제']);   // 「시연 폴더 안에 / 파일 쓰기」로 줄을 나눈다(글자는 그대로)
        css(it.note, { fontFamily: 'var(--display)', fontWeight: '900', lineHeight: '1', letterSpacing: '-0.02em', whiteSpace: 'nowrap',
          color: NOTE[i] === '거절' ? 'var(--p3-orange-text)' : 'var(--ink)' });
      });
      this.dr = demoRow(el, [{ text: '강사 시연 화면', box: true }, { text: '볼 것: 리허설에서 뜬 권한 확인 창의 명령' }], 936);
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.sb, lt, 0.5, { dx: -14 });
      this.qz.render(lt);
      this.qz.items.forEach((it, i) => TH.reveal(it.note, lt, RV6 + 0.25 + i * 0.1, { dx: 0, dy: 34, dur: 0.4 }));   // 답 낱말은 아래에서 올라온다(1.0초 안에 끝)
      TH.reveal(this.dr, lt, 1.9, { dx: 16, dur: 0.4 });
    },
  });

  // ── s07 L13 결과물 전시(강사 시연 화면 자리) ── 왼쪽 열에 제목·본문·열린 연두 고리, 오른쪽 큰 틀(1100×640)에 「지금 실행」(120px, 이 장의 강조)
  DECK.slide({
    id: 'p3-ch04-s07', dur: 2.7, steps: [], notes: NOTES['p3-ch04-s07'],
    setup(el) {
      this.bg = TH.bg(el, 'deep');
      this.hd = TH.header(el, { chapter: 4, title: CH });
      this.tt = TH.title(el, '승인 하나는\n이 자리에서\n답합니다', { x: 120, y: 200, size: 72, exact: true, w: 520, at: 0.2 });
      const body = (t, top) => tx('div', 'a', el, t, { left: '120px', top: top + 'px', width: '520px', fontSize: '36px', lineHeight: '1.4', color: 'var(--ink)', whiteSpace: 'pre-line' });
      this.b1 = body('팀이 무엇을 보여 주고\n묻는지 봅니다', 490);
      this.b2 = body('답한 뒤 다음 단계가\n시작되는지 봅니다', 490 + this.b1.offsetHeight + 16);
      this.rg = TH.ring(el, { x: 176, y: 790, r: 56, width: 6, at: 1.8 });
      this.r1 = tx('div', 'a', el, '승인 단계', { left: '256px', top: '742px', fontSize: '40px', lineHeight: '1.25', fontWeight: '800', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.r2 = tx('div', 'a', el, '강사가 답합니다', { left: '256px', top: (742 + this.r1.offsetHeight + 2) + 'px', fontSize: '34px', lineHeight: '1.3', color: 'var(--dim)', whiteSpace: 'nowrap' });
      // 오른쪽 큰 틀: 머리 줄(높이 64)에 「강사 시연 화면」, 가운데에 「지금 실행」과 볼 것 줄. 승인 질문의 내용은 그리지 않는다
      const W = 1100, H = 640;
      this.ex = TH.exhibit(el, { x: 700, y: 250, w: W, h: H, pad: 0, at: 0.4, draw: (box) => {
        css(box, { background: 'var(--panel)' });
        const head = tx('div', '', box, null, { position: 'absolute', left: '0', top: '0', right: '0', height: '64px', boxSizing: 'border-box', padding: '0 28px',
          borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center' });
        this.ht = tx('span', '', head, '강사 시연 화면', { fontSize: '34px', lineHeight: '1.2', fontWeight: '700', color: 'var(--ink)', border: '2px solid var(--ink)', borderRadius: '8px', padding: '2px 14px', whiteSpace: 'nowrap' });
        this.go = tx('div', '', box, '지금 실행', { position: 'absolute', left: '0', right: '0', textAlign: 'center', fontFamily: 'var(--display)', fontWeight: '900', fontSize: '120px',
          lineHeight: '1.05', letterSpacing: '-0.02em', color: 'var(--p3-orange-text)', whiteSpace: 'nowrap' });
        this.lk = tx('div', '', box, '볼 것: 팀이 보여 주는 결과와 승인 질문', { position: 'absolute', left: '0', right: '0', textAlign: 'center', fontSize: '40px', lineHeight: '1.3',
          fontWeight: '500', color: 'var(--ink)', whiteSpace: 'nowrap' });
        const gh = this.go.offsetHeight, lh = this.lk.offsetHeight, top = 64 + (H - 64 - (gh + 48 + lh)) / 2;
        css(this.go, { top: top.toFixed(0) + 'px' }); css(this.lk, { top: (top + gh + 48).toFixed(0) + 'px' });
        return null;
      } });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.ex.render(lt, ctx);
      TH.reveal(this.ht, lt, 1.0, { dx: -14, dur: 0.4 });
      const g = prog(lt, 1.2, 0.5, ease.outCubic);
      this.go.style.clipPath = g < 1 ? `inset(${((1 - g) * 100).toFixed(1)}% 0 0 0)` : 'none';
      this.go.style.transform = g < 1 ? `translateY(${((1 - g) * 44).toFixed(1)}px)` : 'none';
      TH.reveal(this.lk, lt, 1.6, { dx: 0, dy: 12, dur: 0.45 });
      TH.reveal(this.b1, lt, 1.0, { dx: -14, dur: 0.45 });
      TH.reveal(this.b2, lt, 1.15, { dx: -14, dur: 0.45 });
      this.rg.render(lt);
      TH.reveal(this.r1, lt, 2.1, { dx: -14, dur: 0.4 });
      TH.reveal(this.r2, lt, 2.2, { dx: -14, dur: 0.4 });
    },
  });

  // ── s08 L3 좌우 대비 ── 왼쪽 상담 창(T01 질문 말풍선과 기준 답 금액 120px, 이 장의 강조), 오른쪽 밝은 면의 상담 기록 칸 넷(값 자리는 점선 칸)
  DECK.slide({
    id: 'p3-ch04-s08', dur: 3.0, steps: [], notes: NOTES['p3-ch04-s08'],
    setup(el) {
      this.bg = TH.bg(el, 'deep');
      this.hd = TH.header(el, { chapter: 4, title: CH, fiction: true });
      this.tt = TH.pageTitle(el, '상담 창의 답과 상담 기록을 봅니다');
      this.tg = tag(el, '리허설 결과', { right: '120px', top: '162px' });   // 제목 줄 오른쪽 끝(원고의 y 246은 면 위 끝과 붙어 제목 줄로 올렸다)
      this.sp = TH.split(el, { top: 300, bottom: 920, left: { label: '상담 창' }, right: { label: '상담 기록', tone: 'light' }, at: 0.4, rightAt: 1.2 });
      const L = this.sp.left;
      // 사용자 말풍선(밝은 면, 오른쪽 정렬): 시험표 T01 질문 원문
      this.bu = tx('div', '', L, TH.keepWords('요가 강습(수강료 40,000원, 월 8회)을 등록했는데 2회가 진행되었습니다. 지금 그만두면 얼마를 환불받나요?', ['월 8회)을']), {
        marginLeft: 'auto', width: '700px', boxSizing: 'border-box', padding: '16px 28px 18px', borderRadius: '24px 24px 6px 24px', background: 'var(--p3-paper)', color: 'var(--p3-black)',
        fontSize: '34px', lineHeight: '1.4', fontWeight: '500', wordBreak: 'keep-all' });
      // 기준 답: 이름표를 금액 바로 위에 붙인다(답 말풍선 모양으로 그리지 않는다. 상담 창이 실제로 낸 답이 아니다)
      this.al = tx('div', '', L, '기준 답 · 시험표 T01', { marginTop: '30px', fontSize: '34px', lineHeight: '1.3', fontWeight: '700', color: 'var(--p3-orange-text)' });
      this.am = tx('div', '', L, '26,000원', { marginTop: '2px', fontFamily: 'var(--num)', fontWeight: '900', fontSize: '120px', lineHeight: '1.05', letterSpacing: '-0.02em',
        fontVariantNumeric: 'tabular-nums', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.ar = tx('div', '', L, '체육시설 이용 규정 제7조 제1항 제2호', { marginTop: '10px', fontSize: '36px', lineHeight: '1.3', fontWeight: '700', color: 'var(--ink)', whiteSpace: 'nowrap' });
      // 상담 기록 칸 넷
      const RH = 116;
      this.rows = ['질문', '답', '근거 조문', '시각'].map((t, i) => {
        const row = tx('div', '', this.sp.right, null, { position: 'absolute', left: '0', right: '0', top: (i * RH) + 'px', height: RH + 'px', display: 'flex', alignItems: 'center',
          borderTop: i ? '2px solid #D8D8D2' : '0' });
        const nm = tx('div', '', row, t, { flex: 'none', width: '260px', fontSize: '40px', lineHeight: '1.2', fontWeight: '800', color: 'var(--p3-black)', whiteSpace: 'nowrap' });
        const bx = tx('div', '', row, null, { flex: 'none', width: '460px', height: '72px', boxSizing: 'border-box', border: '3px dashed #5A5A55', borderRadius: '12px' });
        return { nm, bx, t: 1.7 + i * 0.1 };
      });
      this.dr = demoRow(el, [{ text: '강사 시연 화면', box: true }, { text: '볼 것: 답의 금액·조문, 기록의 네 칸, T11 줄' }], 940);
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.sp.render(lt);
      TH.reveal(this.bu, lt, 0.85, { dx: 16, dur: 0.45 });
      TH.reveal(this.al, lt, 1.1, { dx: -14, dur: 0.4 });
      const a = prog(lt, 1.2, 0.5, ease.outCubic);
      this.am.style.clipPath = a < 1 ? `inset(${((1 - a) * 100).toFixed(1)}% -10px 0 0)` : 'none';
      this.am.style.transform = a < 1 ? `translateY(${((1 - a) * 40).toFixed(1)}px)` : 'none';
      TH.reveal(this.ar, lt, 1.45, { dx: -14, dur: 0.4 });
      this.rows.forEach(r => {
        TH.reveal(r.nm, lt, r.t, { dx: -16, dur: 0.4 });
        const q = prog(lt, r.t + 0.1, 0.4, ease.outQuart);
        r.bx.style.clipPath = q < 1 ? `inset(0 ${((1 - q) * 100).toFixed(1)}% 0 0)` : 'none';
      });
      TH.reveal(this.tg, lt, 2.3, { dx: 14, dur: 0.4 });
      TH.reveal(this.dr, lt, 2.5, { dx: 16, dur: 0.4 });
    },
  });

  // ── s09 L2 큰 숫자 ── 통과 기준의 수 「11」(잉크 y 200~760, 이 장의 강조)과 아래 「개 이상」. 오른쪽 열에 제목·기준·시험 칸 12개·연두 이름표
  DECK.slide({
    id: 'p3-ch04-s09', dur: 3.0, steps: [], notes: NOTES['p3-ch04-s09'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 4, title: CH });
      this.bn = TH.bigNum(el, '11', { x: 110, top: 200, bottom: 760, at: 0.2 });
      // 숫자 잉크의 왼쪽 끝에 단위의 잉크 왼쪽 끝을 맞춘다
      const inkL = (e, text) => {
        const cs = getComputedStyle(e), g = document.createElement('canvas').getContext('2d');
        g.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        return -g.measureText(text).actualBoundingBoxLeft;
      };
      const dg = this.bn.el.querySelector('.p3-bignum-d');
      const x0 = 110 + inkL(dg, '11');
      this.un = tx('div', 'a', el, '개 이상', { top: '790px', fontFamily: 'var(--display)', fontWeight: '900', fontSize: '100px', lineHeight: '1', letterSpacing: '-0.02em',
        color: 'var(--p3-orange-text)', whiteSpace: 'nowrap' });
      this.un.style.left = (x0 - inkL(this.un, '개 이상')).toFixed(1) + 'px';
      const RX = Math.round(this.bn.right + 80), CW = 1800 - RX;
      this.vr = tx('div', 'a p3-vrule', el, null, { left: Math.round(this.bn.right + 34) + 'px', top: '170px', height: '730px' });
      this.tt = TH.title(el, '결과는 시험 통과 수로\n보고받습니다', { x: RX, y: 170, size: 64, exact: true, w: CW + 40, at: 0.5 });
      this.cr = tx('div', 'a', el, TH.keepWords('통과 기준: 11개 이상, 규칙 시험 실패 0건', ['규칙 시험 실패 0건']), { left: RX + 'px', top: '360px', width: CW + 'px',
        fontSize: '40px', lineHeight: '1.3', fontWeight: '700', color: 'var(--ink)', wordBreak: 'keep-all' });
      const CWd = 98, CH6 = 76, G = 12;
      this.cells = Array.from({ length: 12 }, (_, i) => {
        const hot = i >= 10, x = RX + (i % 6) * (CWd + G), y = 500 + Math.floor(i / 6) * (CH6 + G);
        const c = tx('div', 'a', el, 'T' + String(i + 1).padStart(2, '0'), { left: x + 'px', top: y + 'px', width: CWd + 'px', height: CH6 + 'px', boxSizing: 'border-box',
          border: hot ? '4px solid var(--p3-orange)' : '2px solid var(--ink)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--num)', fontWeight: '800', fontSize: '36px', fontVariantNumeric: 'tabular-nums', color: 'var(--ink)', whiteSpace: 'nowrap' });
        return { c, t: 1.2 + i * 0.05 };
      });
      this.rl = tx('div', 'a', el, null, { left: RX + 'px', top: '686px', width: CW + 'px', fontSize: '34px', lineHeight: '1.3', color: 'var(--ink)', wordBreak: 'keep-all' });
      tx('b', '', this.rl, '규칙 시험', { fontWeight: '700', color: 'var(--p3-orange-text)' });
      this.rl.appendChild(document.createTextNode(TH.keepWords(' · T11 개인정보 · T12 지시 바꾸기', ['T11 개인정보', 'T12 지시 바꾸기'])));
      this.ok = tx('div', 'a', el, '사용 여부 · 사람이 정합니다', { left: RX + 'px', top: '800px', fontSize: '40px', lineHeight: '1.25', fontWeight: '700', padding: '8px 24px',
        borderRadius: '10px', background: 'var(--p3-lime)', color: 'var(--p3-black)', whiteSpace: 'nowrap' });
      this.dr = demoRow(el, [{ text: '강사 시연 화면', box: true }, { text: '볼 것: 통과 수와 실패한 시험 번호' }], 936);
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.bn.render(lt);
      TH.reveal(this.un, lt, 0.6, { dx: 0, dy: 20, dur: 0.45 });
      this.vr.style.transform = `scaleY(${prog(lt, 0.3, 0.9, ease.inOutSine).toFixed(4)})`;
      this.tt.render(lt);
      TH.reveal(this.cr, lt, 1.0, { dx: -14, dur: 0.45 });
      this.cells.forEach(o => rise(o.c, lt, o.t, 0.35, 18, 10));
      TH.reveal(this.rl, lt, 2.0, { dx: -14, dur: 0.4 });
      const q = prog(lt, 2.3, 0.4, ease.outCubic);
      this.ok.style.clipPath = q < 1 ? `inset(${((1 - q) * 100).toFixed(1)}% 0 0 0 round 10px)` : 'none';
      this.ok.style.transform = q < 1 ? `translateY(${((1 - q) * 20).toFixed(1)}px)` : 'none';
      TH.reveal(this.dr, lt, 2.6, { dx: 16, dur: 0.4 });
    },
  });

  // ── s10 L9 카드 격자(셋)와 다음 질문 ── 사람이 맡는 일 세 칸, 아래 「다음 질문」 주황 면(이 장의 강조)
  DECK.slide({
    id: 'p3-ch04-s10', dur: 3.2, steps: [], notes: NOTES['p3-ch04-s10'],
    setup(el) {
      this.bg = TH.bg(el, 'accent');
      this.hd = TH.header(el, { chapter: 4, title: CH });
      this.tt = TH.pageTitle(el, '사람이 맡는 일은 세 가지입니다');
      this.tr = TH.tileRow(el, [
        { n: 1, title: '단계마다 결과를 읽고 승인합니다' },
        { n: 2, title: '명령을 허용하거나 거절합니다' },
        { n: 3, title: 'API 키를 직접 보관합니다' },
      ], { y: 260, h: 470, at: 0.5, each: 0.14 });
      this.nq = TH.nextQ(el, { x: 120, bottom: 970, w: 1680, size: 56, text: '에이전트 팀이 만드는 동안 사람은 어느 지점에서 무엇을 결정하는가', at: 2.3 });
      css(this.nq.el.querySelector('.p3-card-label'), { fontSize: '34px' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.tr.render(lt);
      this.tr.tiles.forEach((t, i) => TH.reveal(t.title, lt, 0.5 + i * 0.14 + 0.3, { dx: 0, dy: 16, dur: 0.45 }));
      this.nq.render(lt, ctx);
    },
  });
})();
