/* 파트 1 · 5장 「실습: 세 항목으로 다시 요청하기」 장면 코드. 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다.
 * 원고: plan/slides/p1-ch05.json. 레이아웃 배정: plan/assets/p1_layout_ch05.md. 테마 부품: themes/p1.js. 본보기: p1/ch00.js s07, s11, s13~s18
 * 장마다 레이아웃이 다르다: 영상 제목 → 사례 장면 → 요청문 크게 → 화면 크게 → 가로 순서 → 확인 목록 → 좌우 대비 → 표 → 카드 격자 → 인물과 대사.
 * 키 누름은 s03 한 장에 한 번이다(빈칸 양식을 먼저 보이고 키로 예시 카드를 연다). 나머지 장은 키 없이 3~4초 안에 끝 상태가 된다.
 * 캡처(deck/assets/p1/shots/p1-ch05-s04.png)가 아직 없어 s04 의 ChatGPT 화면은 THEME.shot 의 그린 화면이다. */
(function () {
  'use strict';
  const { ease, prog, clamp, lerp, css, h, s } = REEL;
  DECK.config({ part: 'p1', chapter: 'ch05', title: '실습: 세 항목으로 다시 요청하기' });

  const HEAD = { chapter: 5, title: '실습: 세 항목으로 다시 요청하기', fiction: true };
  const C30 = Math.cos(Math.PI / 6);
  const ACC = '#2A55E5', DIM = '#4B5A68';
  const rise = THEME.rise;
  const iso = THEME.iso;

  // 강사 메모: 원고 notes 를 그대로 옮겼다
  const NOTES = {
    s01: "4장에서 한서윤 주임은 한 줄 요청을 세 항목으로 다시 썼습니다. 5장에서는 여러분이 그 요청문을 직접 채워 ChatGPT에 보내 봅니다. 2장에서 받은 한 줄 요청의 답변과 나란히 놓고 무엇이 달라졌는지 확인합니다. 2장에서 지우지 말라고 한 대화가 남아 있는지 먼저 봐 주세요.",
    s02: "한서윤 주임은 4장에서 다시 쓴 요청문에 새별시설공단 체육시설 이용 규정 파일을 붙여 같은 민원을 다시 보냅니다. 모델과 민원 내용은 2장과 같고, 바뀐 것은 요청문, 첨부한 규정 파일, 민원 원문에서 지운 이름·연락처·게시판 줄 세 가지입니다. 그래서 답에 이름이 나오지 않아도 요청문의 개인정보 규칙 때문인지 입력에 이름이 없어서인지는 이번 실습으로 가를 수 없습니다. 시작하기 전에 실습 규칙 1번을 다시 봅니다. 오늘은 실습 묶음의 가상 자료만 입력합니다.",
    s03: "lab1/단계.md 2단계 1번으로, lab1 폴더의 세항목_요청문_양식.md를 메모장(Windows)이나 텍스트 편집기(macOS)로 엽니다. 다른 프로그램이 열리면 파일을 오른쪽 클릭하고 「연결 프로그램」에서 메모장이나 텍스트 편집기를 고릅니다. 고칠 곳은 빈칸 일곱 곳으로 항목 1과 2에 세 곳씩, 항목 3에 한 곳이 있고, 밑줄 네 개를 지운 자리에 씁니다. (키) 한서윤 주임이 채운 값이 나오니 그대로 옮겨 써도 되고, 막히면 완성본 폴더의 세항목_요청문_예.md를 씁니다. 복사할 범위는 ```text 줄과 ``` 줄 사이 전부로 화면에 싣지 않은 줄도 들어가며, 붙여 넣기는 2단계 3번에서 합니다.",
    s04: "ChatGPT에서 새 대화를 열고, 2장의 대화는 지우지 않고 그대로 둡니다. 입력창의 + 단추를 누르고 파일을 추가하는 메뉴에서 자료 폴더의 새별_체육시설_이용규정.md를 첨부합니다. 영어 화면에서는 이 메뉴가 Add photos & files이고, 이름이 제 화면과 다르면 순서만 따라 주세요. 첨부가 안 되는 분은 규정 파일 내용을 복사해 요청문 아래에 붙여 넣으면 됩니다. (강사 확인: 한국어 화면의 메뉴 이름은 강의 전날 K-04에서 확인해 그 이름으로 말합니다.)",
    s05: "먼저 2단계 1번에서 채운 양식 파일(완성본을 쓰면 세항목_요청문_예.md)의 ```text 줄과 ``` 줄 사이를 복사해 붙여 넣습니다. 이어서 단계.md 「요청 B의 민원」에서 [민원 원문]부터 「언제 들어오는지 알려 주세요.」까지 복사해 요청문 아래에 붙여 넣고 보냅니다. 이 민원은 2장의 반려 사유를 따라 이름과 연락처를 지운 판입니다. 금액이 34,000원이 아니면 같은 대화에 「계산식을 칸마다 보여 주고, 위약금 조항을 다시 확인해 줘」를 보냅니다. 응답이 느리거나 한도 안내가 나오면 Instant가 보일 때 Instant로 바꾸고 「다시 생성」을 누르며, 보이지 않으면 제 화면을 따릅니다. (강사 확인: 아래 옮긴 문구의 [민원 요지]·[계산] 두 줄은 강사가 codex로 미리 돌린 결과 B_2입니다. ChatGPT 화면에서 같은지는 K-13, Plus 메뉴에 Instant가 있는지는 K-02에서 강의 전날 확인합니다.) (화면에서 옮긴 문구: 「[항목 1. 목적과 결과물]」 「[항목 2. 참고 자료와 제외 범위]」 「[항목 3. 완료 기준과 승인 조건]」 「제목: 수영 강습 환불 요청」 「[민원 요지] 11월 수영 초급 강습을 4회 진행한 뒤 중단할 경우의 환불금과 지급 기한을 문의하셨습니다.」 「[계산] 60,000원 × (12회 − 4회) ÷ 12회 − 60,000원 × 10% = 34,000원」 「강사 사전 실행 예: codex(2026-11-23)」)",
    s06: "답에서 네 가지를 보고, 규정 기준 값과 하나씩 견줍니다. 금액은 남은 8회 몫 40,000원에서 위약금 6,000원을 뺀 값이고, 위약금은 제7조 제1항 제2호가 정한 수강료의 10퍼센트입니다. 금액, 조문, 기한, 이름 네 가지가 모두 맞으면 손을 들어 주세요. [담당자 확인] 칸은 필요로 나와도 불필요로 나와도 맞고, 문장이 제 화면과 달라도 금액·조문·기한이 같으면 됩니다. 강사가 강의 전에 codex라는 다른 도구로 두 번 돌려 본 결과에서도 네 가지가 모두 이 값과 같았습니다.",
    s07: "이번에는 방금 그 대화에 lab1/단계.md의 「요청 C」를 보냅니다. 새 대화가 아니라 같은 대화입니다. 대관은 첨부한 체육시설 이용 규정에 없는 내용이고, 요청문 항목 2에 첨부 파일에 없는 내용은 추측해서 쓰지 않는다고 적었습니다. 그래서 금액 없이 담당자 확인이 필요하다고 답해야 합니다. 금액을 지어낸 분은 6장에서 다시 쓰니 그 화면을 남겨 두세요. (강사 확인: 오른쪽 답 카드의 두 줄은 강사가 codex로 미리 돌린 결과 C_1이고, ChatGPT 화면은 강의 전날 K-13에서 확인합니다.) (화면에서 옮긴 문구: 「문화센터 강의실 대관 취소 수수료」) (화면에서 지운 주석: 「강사 사전 실행 예: codex(2026-11-23)」)",
    s08: "2장에서 남겨 둔 대화를 방금 받은 답과 나란히 놓고, 비교표 1열 5줄 답변 형식을 먼저 채운 뒤 2열을 채웁니다. 표 가운데 칸의 2장 값은 codex로 요청 A를 여섯 번 돌린 결과라 여러분 화면과 다를 수 있으니, 비교표에는 자기 화면의 값을 적습니다. 금액은 두 답이 같을 수 있어 근거, 지급 기한, 답변 형식 줄을 보고, 6줄 조문 확인과 7줄 요청 C도 채웁니다. 4줄 이름은 이번 민원에서 이름과 연락처를 지웠기 때문에 2열에 「비교하지 않는다」가 적혀 있고, 개인정보 규칙은 파트 2에서 시험합니다. 옆 사람과 2열을 바꿔 본 뒤 나와 다른 줄이 있으면 손을 들어 주세요.",
    s09: "2단계의 마지막 6번입니다. 2단계 1번에서 메모장이나 텍스트 편집기로 열어 빈칸을 채운 양식 파일에서 Ctrl+S, macOS에서는 Command+S를 눌러 저장합니다. 저장 위치는 lab1 폴더, 파일 이름은 세항목_요청문_양식.md 그대로이고, 파트 2에서 설계서와 프로젝트 지침을 만들 때 다시 엽니다. 저장하지 못한 분은 파트 2에서 완성본 폴더의 세항목_요청문_예.md를 쓰면 됩니다.",
    s10: "한서윤 주임이 다시 받은 초안을 오민석 팀장에게 가져갑니다. 이번 초안에는 공단 규정의 조문 번호와 7영업일이 붙었고 칸이 정해진 형식으로 나왔습니다. 민원 원문에서 이름과 연락처를 지우고 보냈으니 초안에도 이름이 없습니다. 팀장의 답은 「고쳐서 쓸 수 있겠다」입니다. 한서윤 주임은 내일부터 실제 민원에 이 방식을 쓰려고 하는데, 그대로 써도 되는지가 6장의 질문입니다.",
  };

  // 이 챕터의 글자 모양(움직임은 두지 않는다)
  const sheet = document.createElement('style');
  sheet.textContent = [
    '.c5-steptag{font:600 34px/1.2 var(--body);color:var(--ink);transform-origin:50% 100%}',
    '.c5-steptag b{font:700 34px/1 var(--num);color:var(--accent)}',
    '.c5-code{font:500 34px/1.3 var(--mono);color:var(--ink);word-spacing:-0.18em}',
    '.c5-code > div{white-space:pre-wrap;padding-left:2ch;text-indent:-2ch;word-break:keep-all}',
    '.c5-code.c5-plain > div{padding-left:0;text-indent:0}',
    '.c5-code .c5-fence{color:var(--dim)}',
    '.c5-code .c5-head{font-weight:700}',
    '.c5-code .c5-blank{display:inline-block;white-space:nowrap;text-indent:0}',
    '.c5-code .c5-val{color:var(--accent);font-weight:800}',
    '.c5-code.c5-big{font-size:37px;line-height:1.27}',
    '.c5-lc.c5-row{flex-direction:row;align-items:center;gap:30px;white-space:nowrap}',
    '.c5-lc.c5-row b{display:inline}',
    '.c5-lc .c5-vr{flex:none;width:1.5px;height:40px;background:var(--line)}',
    '.c5-lc{display:flex;flex-direction:column;gap:6px}',
    '.c5-lc b{display:block;font:700 34px/1.3 var(--body);color:var(--ink)}',
    '.c5-lc div{font:400 34px/1.35 var(--body);color:var(--ink);word-break:keep-all}',
    '.c5-lc .c5-hr{height:1.5px;background:var(--line);margin:14px 0 8px}',
    '.c5-mo{font-family:var(--mono);font-weight:500;word-spacing:-0.18em}',
    '.c5-chip{display:inline-flex;align-items:center;gap:14px;padding:8px 18px 9px 12px;background:#FFFFFF;border:1.5px solid var(--edge);' +
      'font:500 34px/1.2 var(--mono);color:var(--ink);white-space:nowrap}',
    '.c5-chip i{flex:none;width:30px;height:38px;border:1.5px solid var(--edge);background:' +
      'linear-gradient(#2A55E5 0 0) 6px 9px/15px 3px no-repeat,linear-gradient(#2A55E5 0 0) 6px 17px/15px 3px no-repeat,' +
      'linear-gradient(#2A55E5 0 0) 6px 25px/9px 3px no-repeat,#FFFFFF}',
    '.c5-menu{position:absolute;background:#FFFFFF;border:1.5px solid var(--edge);padding:10px;transform-origin:0 100%;box-sizing:border-box}',
    '.c5-menu > div{display:flex;align-items:center;gap:18px;height:66px;padding:0 16px}',
    '.c5-menu > div:first-child{background:#E8EDFC}',
    '.c5-menu i{flex:none;width:32px;height:32px;border:1.5px solid var(--edge);background:#E3E8ED}',
    '.c5-menu b{display:block;height:18px;background:#D6DDE4}',
    '.c5-rule{font:600 36px/1.3 var(--body);color:var(--ink);white-space:nowrap}',
    '.c5-say{font:400 34px/1.45 var(--body);color:var(--ink);word-break:keep-all}',
    '.c5-say > div + div{margin-top:10px}',
    '.c5-say .c5-key{display:inline-block;white-space:nowrap;position:relative}',
    '.c5-desc{font:400 34px/1.32 var(--body);color:var(--ink);word-break:keep-all}',
  ].join('\n');
  document.head.appendChild(sheet);

  // 요소의 자리를 기준 요소 안 좌표로 잰다(변환과 무관한 레이아웃 값). setup 에서만 부른다
  function rel(e, root) {
    let x = 0, y = 0, k = e;
    while (k && k !== root) { x += k.offsetLeft; y += k.offsetTop; k = k.offsetParent; }
    return { x, y, w: e.offsetWidth, h: e.offsetHeight };
  }
  // 무대 전체를 덮는 svg
  function svgFull(parent) {
    const v = s('svg', { width: 1, height: 1 }, parent);
    css(v, { position: 'absolute', left: '0px', top: '0px', overflow: 'visible', pointerEvents: 'none' });
    return v;
  }
  // 코발트 사각 윤곽: 둘레를 따라 그어진다. draw(lt, at, dur)
  function outline(svg, x, y, w, hh, sw = 4) {
    const r = s('rect', { x: x.toFixed(1), y: y.toFixed(1), width: w.toFixed(1), height: hh.toFixed(1), fill: 'none', stroke: ACC, 'stroke-width': sw }, svg);
    const L = 2 * (w + hh);
    r.style.strokeDasharray = L.toFixed(1);
    return {
      el: r,
      draw(lt, at, dur = 0.3) {
        const p = prog(lt, at, dur, ease.inOutCubic);
        r.style.strokeDashoffset = (L * (1 - p)).toFixed(1);
        r.style.opacity = lt < at ? '0' : '1';
      },
    };
  }
  // 제목 오른쪽 끝의 단계 이름표 「2단계 · N/6」(34px). 제목 줄 가운데 높이에 맞춘다
  function stepTag(el, ttl, n, x, y, size) {
    const t = h('div', 'p1-tag c5-steptag', el, `2단계 · <b>${n}</b>/6`);
    css(t, { left: (x + ttl.el.offsetWidth + 34) + 'px', top: Math.round(y + (size * 1.08 - t.offsetHeight) / 2) + 'px' });
    return t;
  }

  // ── s01 챕터 전환(L0 영상 제목): 전환 영상 p1-tr-stack 을 정방향으로 깐다(plan/assets/p1_video_map.json) ──
  DECK.slide({
    id: 'p1-ch05-s01', dur: 3.2,
    notes: NOTES.s01,
    setup(el) {
      this.vt = THEME.videoTitle(el, {
        kind: 'chapter', kicker: '파트 1 · 5장', scene: 'stack',
        src: '../assets/video/p1/p1-tr-stack.mp4', poster: '../assets/video/p1/p1-tr-stack.jpg',
        title: '실습: 세 항목으로 다시 요청하기',
        sub: '세 항목으로 다시 요청하면 결과가 실제로 달라지는가',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // ── s02 이야기(L10 사례 장면): 세 층 판을 가운데 두고 왼쪽 뒤 규정집, 오른쪽 뒤 한서윤 주임, 오른쪽 앞 민원 글. 서류 토큰이 앞쪽을 지나간다 ──
  // 세 층 판 바닥 가운데 O. 규정집은 O 에서 등각 -ix 쪽(왼쪽 뒤), 민원 글은 +ix 쪽(오른쪽 앞), 한서윤 주임은 -iy 쪽(오른쪽 뒤)
  DECK.slide({
    id: 'p1-ch05-s02', dur: 3.9,
    notes: NOTES.s02,
    setup(el) {
      const O = [1180, 690];
      const at = (ix, iy) => { const [dx, dy] = iso(ix, iy, 0); return [O[0] + dx, O[1] + dy]; };
      this.bg = THEME.bg(el, 'base', { floor: [740, 230, 1140, 820], props: false, token: false });
      THEME.header(el, HEAD);
      this.ttl = THEME.title(el, '한서윤 주임이\n규정 파일을 붙입니다', { x: 120, y: 190, size: 72, w: 700, at: 0.1, maxLines: 2 });
      this.lines = THEME.lines(el, ['같은 민원 내용, 같은 ChatGPT', '달라진 것은 <span class="p1-em">세 가지</span>', '요청문, 규정 파일, 이름·연락처를 지운 민원'], { x: 120, y: 400, w: 600, gap: 6 });
      const things = h('div', 'full', el);   // 사물 층을 먼저 깔고, 사물 앞을 지나는 서류 토큰을 그 위에 둔다
      // 토큰: 규정집 앞 → 세 층 판 앞 → 민원 글 앞. 등각 +ix 한 축으로만 간다
      this.fl = THEME.flow(el, [[-260, 175], [0, 175], [300, 175]], { x: O[0], y: O[1], at: 1.95, speed: 760, hold: { 1: 0.18 } });
      // 뒤(ix + iy 가 작은 것)부터 만든다: 한서윤 주임 → 규정집 → 세 층 판 → 민원 글
      this.hs = THEME.figure(things, '한서윤', { x: 1650, y: 410, at: 0.35, first: true, scale: 2.2, big: true });
      const [rx, ry] = at(-340, 0);
      this.rules = THEME.cutout(things, 'p1-key-rules', { src: '../assets/img/p1/p1-key-rules_cut.png', x: rx, y: ry, size: 300, at: 1.3, label: '체육시설 이용 규정', pin: 40 });
      css(this.rules.body.querySelector('.p1-tag'), { fontSize: '40px' });
      this.st = THEME.stack(things, [
        { label: '목적과 결과물', h: 52 }, { label: '참고 자료와 제외 범위', h: 52 }, { label: '완료 기준과 승인 조건', h: 52 },
      ], { x: O[0], y: O[1], w: 260, at: 0.55, each: 0.14, labelX: 1440, tagSize: 40, labelGap: 62 });
      const [cx, cy] = at(300, 60);
      this.cp = THEME.item(things, '민원 글', { x: cx, y: cy, w: 200, d: 150, at: 1.1, label: '수영 강습 환불 민원(이름·연락처 지움)', labelPos: 'below' });
      css(this.cp.body.querySelector('.p1-tag'), { fontSize: '36px' });
      // 실습 규칙 카드: 왼쪽 호박 띠
      this.rule = THEME.card(el, { x: 120, y: 880, w: 1000, at: 2.95, enter: 'slide', pad: '20px 30px 22px 50px',
        html: '<div class="c5-rule">실습 규칙 1 · 실습 묶음의 가상 자료만 입력합니다</div>' });
      const band = h('div', '', this.rule.face);
      css(band, { position: 'absolute', left: '0px', top: '0px', bottom: '0px', width: '18px', background: 'var(--accent2)', borderRight: '1.5px solid var(--edge)' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.ttl.render(lt);
      this.lines.forEach((l, i) => rise(l, lt, 0.7 + i * 0.12));
      this.hs.render(lt); this.rules.render(lt); this.st.render(lt); this.cp.render(lt);
      this.fl.render(lt);
      this.rule.render(lt);
    },
  });

  // ── s03 실습 단계(L7 요청문 크게, 키 한 번): 빈칸 7곳에 코발트 윤곽이 그어진 양식 카드. 키를 누르면 같은 자리에 예시 카드가 떨어진다 ──
  const FORM = [
    '```text',
    '[항목 1. 목적과 결과물]',
    '- 이 답변을 읽는 사람: ____',
    '- 답변의 목적: ____',
    '[답변] 민원인에게 보낼 문장. 존댓말, ____문장 이내',
    '[항목 2. 참고 자료와 제외 범위]',
    '- 근거로 쓰는 자료: 첨부한 ____ 파일만 쓴다.',
    '- 첨부 파일에 없는 내용: 추측해서 쓰지 않고 ____라고 쓴다.',
    '- 답하지 않는 것: ____',
    '[항목 3. 완료 기준과 승인 조건]',
    '- 승인 조건: 이 답변은 초안이다. 발송 전에 ____이 확인한다.',
    '```',
  ];
  const EXAMPLE = [
    '새별체육센터 강습을 신청한 민원인',
    '민원인이 환불 금액, 계산 방법, 지급 기한을 한 번에 알 수 있게 한다.',
    '5',
    '「새별시설공단 체육시설 이용 규정」',
    '「규정에서 확인되지 않아 담당자 확인이 필요합니다」',
    '손해 배상, 사고·분쟁, 첨부 규정 밖의 시설(대관 등)',
    '고객지원팀장',
  ];
  // 양식 12줄을 카드 안에 싣는다. vals 가 없으면 빈칸 ____ 를, 있으면 그 자리에 예시 값을 코발트 글자로 넣는다
  function formLines(box, vals) {
    const blanks = [];
    let k = 0;
    FORM.forEach(line => {
      const d = h('div', '', box);
      if (line.startsWith('```')) d.className = 'c5-fence';
      else if (line.startsWith('[항목')) d.className = 'c5-head';
      line.split('____').forEach((part, i) => {
        if (i > 0) {
          const b = h('span', vals ? 'c5-val' : 'c5-blank', d);
          b.textContent = vals ? vals[k] : '____';
          blanks.push(b); k++;
        }
        if (part) d.appendChild(document.createTextNode(part));
      });
    });
    return blanks;
  }
  const S03_EX = 2.6;   // 키를 누르면 이어지는 지점: 양식이 빠지고 예시가 떨어진다
  DECK.slide({
    id: 'p1-ch05-s03', dur: 3.75, steps: [S03_EX],
    notes: NOTES.s03,
    setup(el) {
      this.bg = THEME.bg(el, 'lab', { floor: false });
      THEME.header(el, HEAD);
      // 윗줄: 제목, 그 아래 고칠 곳·복사할 범위 한 줄 카드, 오른쪽 위에 작은 단계 계단
      this.ttl = THEME.title(el, '양식의 빈칸 7곳을 채웁니다', { x: 120, y: 92, size: 52, at: 0.1 });
      this.stp = THEME.step(el, 1, 6, { x: 1452, y: 246, at: 0.15, size: 28, base: 22, rise: 8, gap: 1.1 });
      const txt = this.stp.el.querySelector('.p1-step-txt');
      txt.innerHTML = '2단계 · <b>1</b>/6';
      css(txt, { fontSize: '34px', color: 'var(--ink)' });
      this.left = THEME.card(el, { x: 120, y: 172, w: 1270, at: 0.3, enter: 'slide', pad: '14px 30px 16px',
        html: '<div class="c5-lc c5-row"><div><b>고칠 곳</b> <span class="c5-mo">```text</span> 줄과 <span class="c5-mo">```</span> 줄 사이의 <span class="c5-mo">____</span> 7곳</div>' +
          '<i class="c5-vr"></i><div><b>복사할 범위</b> 같은 두 줄 사이 전부</div></div>' });
      // 양식 카드(화면 폭 거의 전부)
      const W = 1680, Y = 280;
      this.form = THEME.card(el, { x: 120, y: Y, w: W, at: 0.45, drop: 110, cap: '채울 파일 · lab1/세항목_요청문_양식.md', pad: '20px 40px 24px', html: '<div class="c5-code c5-big"></div>' });
      const fbox = this.form.face.querySelector('.c5-code');
      const blanks = formLines(fbox, null);
      const osv = svgFull(this.form.face);
      this.marks = blanks.map(b => { const r = rel(b, this.form.face); return outline(osv, r.x - 6, r.y + 3, r.w + 12, r.h - 6); });
      // 예시 카드: 양식 카드와 같은 자리
      this.ex = THEME.card(el, { x: 120, y: Y, w: W, at: S03_EX + 0.22, cap: '예시(한서윤 주임 작성)', pad: '20px 40px 24px', html: '<div class="c5-code c5-big"></div>', drop: 260 });
      formLines(this.ex.face.querySelector('.c5-code'), EXAMPLE);
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.ttl.render(lt);
      this.stp.render(lt);
      this.left.render(lt);
      this.form.render(lt);
      // 키 뒤: 양식 카드가 오른쪽으로 미끄러져 나간다
      if (lt >= S03_EX) {
        const p = prog(lt, S03_EX, 0.38, ease.inCubic);
        this.form.el.style.transform = `translate(${(p * 1900).toFixed(1)}px, 0px)`;
        this.form.el.style.opacity = (1 - p).toFixed(3);
      }
      this.marks.forEach((m, i) => m.draw(lt, 1.0 + i * 0.1));
      this.ex.render(lt);
    },
  });

  // ── s04 실습 단계(L6 화면 크게): 그린 ChatGPT 새 대화. + 단추 → 파일 추가 메뉴 → 첨부 칩. 오른쪽 짚는 이름표 셋과 기대 결과 카드 ──
  DECK.slide({
    id: 'p1-ch05-s04', dur: 3.4,
    notes: NOTES.s04,
    setup(el) {
      this.bg = THEME.bg(el, 'lab', { floor: false });
      THEME.header(el, HEAD);
      this.ttl = THEME.title(el, '새 대화에 규정 파일을 첨부합니다', { x: 120, y: 92, size: 52, at: 0.1 });
      this.tag = stepTag(el, this.ttl, 2, 120, 92, 52);
      this.shot = THEME.shot(el, null, { size: 'wide', x: 120, y: 196, at: 0.2, top: 'ChatGPT' });
      const scr = this.shot.screen, face = scr.parentElement;
      // 새 대화 화면을 1.6배 안팎으로 키워 그린다: 입력창이 틀 폭 대부분을 쓰고 틀 세로 가운데에 온다
      const gpt = scr.querySelector('.p1-gpt'), inp = scr.querySelector('.p1-gpt-input');
      const plus = scr.querySelector('.p1-plus'), send = scr.querySelector('.p1-send');
      const top = scr.querySelector('.p1-gpt-top');
      css(top, { height: '90px' });
      top.querySelectorAll('.p1-gpt-btn').forEach(e => css(e, { fontSize: '36px' }));
      top.querySelectorAll('.p1-gpt-url').forEach(e => css(e, { fontSize: '30px' }));
      css(inp, { minHeight: '0px', margin: '0 40px', padding: '40px 38px', gap: '0px', flexWrap: 'wrap', alignItems: 'center', borderWidth: '2px' });
      css(plus, { width: '120px', height: '120px', fontSize: '80px', borderWidth: '2px' });
      css(send, { width: '120px', height: '120px', fontSize: '58px' });
      const slot = h('div', '', null);
      inp.insertBefore(slot, inp.firstChild);
      css(slot, { flex: '0 0 100%', height: '132px', display: 'flex', alignItems: 'center', marginBottom: '26px' });
      css(h('div', '', gpt), { flex: '1' });   // 입력창 아래 빈 자리(입력창이 세로 가운데에 온다)
      // 첨부 칩(50px)
      this.chip = h('div', 'c5-chip', slot, '<i></i>새별_체육시설_이용규정.md');
      css(this.chip, { fontSize: '50px', padding: '14px 28px 15px 20px', gap: '24px', borderWidth: '2px' });
      css(this.chip.querySelector('i'), { transform: 'scale(1.55)', margin: '0 9px' });
      // 파일 추가 메뉴: + 단추 위로 크게 펼쳐진다(항목은 글자 없는 막대. 한국어 메뉴 이름은 공식 문서에 없어 쓰지 않는다)
      const pG = rel(plus, gpt), topH = top.offsetHeight;
      const rowH = Math.floor((pG.y - 14 - (topH + 14) - 24 - 3) / 3);
      this.menu = h('div', 'c5-menu', gpt);
      [420, 300, 460].forEach(w => {
        const r = h('div', '', this.menu);
        css(r, { height: rowH + 'px', gap: '26px', padding: '0 22px' });
        css(h('i', '', r), { width: '50px', height: '50px' });
        css(h('b', '', r), { width: w + 'px', height: '28px' });
      });
      css(this.menu, { left: pG.x + 'px', top: (pG.y - 14 - this.menu.offsetHeight) + 'px', width: '640px', padding: '12px', zIndex: '2' });
      // 짚을 자리(무대 좌표)
      const pR = rel(plus, el), mR = rel(this.menu.firstChild, el), cR = rel(this.chip, el);
      const fR = rel(face, el);
      const msv = svgFull(face);
      this.mPlus = outline(msv, pR.x - fR.x - 8, pR.y - fR.y - 8, pR.w + 16, pR.h + 16, 6);
      this.mChip = outline(msv, cR.x - fR.x - 8, cR.y - fR.y - 8, cR.w + 16, cR.h + 16, 6);
      this.co = [
        THEME.callout(el, { from: [mR.x + mR.w - 30, mR.y + mR.h / 2], x: 1380, y: 290, w: 440, text: '영어 화면: Add photos & files', at: 1.3 }),
        THEME.callout(el, { from: [cR.x + cR.w + 8, cR.y + cR.h / 2], x: 1380, y: 450, w: 440, text: '자료/새별_체육시설_이용규정.md', at: 2.35 }),
        THEME.callout(el, { from: [pR.x + pR.w + 8, pR.y + pR.h / 2], x: 1380, y: 588, w: 440, text: '새 대화 → + → 파일을 추가하는 메뉴', at: 1.05 }),
      ];
      this.co.forEach(q => css(q.el.querySelector('.p1-callout'), { fontSize: '38px' }));
      this.coMenu = [this.co[0].el.querySelector('line'), this.co[0].el.querySelector('circle')];
      const t0 = this.co[0].el.querySelector('.p1-callout');
      t0.classList.remove('is-cobalt');
      css(t0, { background: '#FFFFFF', color: 'var(--dim)', borderColor: 'var(--edge)' });
      this.co[0].el.querySelector('line').setAttribute('stroke', DIM);
      this.co[0].el.querySelector('circle').setAttribute('fill', DIM);
      this.co[1].el.querySelector('.p1-callout').classList.add('p1-mono');
      // 기대 결과 카드: 틀(오른쪽 면 x 1344, 받침 윗면 y 946)과 24px 넘게 띄운다
      this.card = THEME.card(el, { x: 1380, y: 690, w: 440, at: 2.65, cap: '기대 결과', html: '<div style="font-size:44px;line-height:1.3;font-weight:600;word-break:keep-all">입력창에 파일 이름이 붙는다</div>' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.ttl.render(lt);
      THEME.dropEl(this.tag, lt, 0.45, 120);
      this.shot.render(lt);
      // + 윤곽 → 메뉴가 펼쳐졌다 닫힌다 → 칩이 올라오고 윤곽이 칩으로 옮겨 간다
      this.mPlus.draw(lt, 0.7, 0.3);
      this.mPlus.el.style.opacity = lt < 0.7 ? '0' : (1 - prog(lt, 2.05, 0.2, ease.outQuad)).toFixed(3);
      const op = prog(lt, 0.95, 0.3, ease.outCubic), cl = prog(lt, 1.95, 0.2, ease.inCubic), m = op * (1 - cl);
      this.menu.style.transform = `scaleY(${Math.max(0.001, m).toFixed(3)})`;
      this.menu.style.opacity = m > 0.01 ? '1' : '0';
      const c = prog(lt, 2.1, 0.35, ease.snap);
      this.chip.style.transform = `translateY(${((1 - c) * 36).toFixed(1)}px)`;
      this.chip.style.opacity = c.toFixed(3);
      this.mChip.draw(lt, 2.25, 0.3);
      this.co.forEach(q => q.render(lt));
      // 메뉴가 닫히면 메뉴를 짚던 선은 거두고 이름표만 남긴다
      if (lt >= 1.95) { const g = (1 - prog(lt, 1.95, 0.2, ease.inCubic)).toFixed(3); this.coMenu.forEach(e => { e.style.opacity = g; }); }
      this.card.render(lt);
    },
  });

  // ── s05 실습 단계(L4 가로 순서): 붙여 넣는 순서 블록 셋, 블록 아래 파일 위치, 서류 토큰이 블록 사이를 지나 「보내기」 앞에서 멈춘다 ──
  DECK.slide({
    id: 'p1-ch05-s05', dur: 3.7,
    notes: NOTES.s05,
    setup(el) {
      this.bg = THEME.bg(el, 'lab', { floor: false });
      this.fl0 = THEME.bg(el, 'base', { floor: [160, 400, 1640, 560], props: false, token: false });
      THEME.header(el, HEAD);
      this.ttl = THEME.title(el, '요청문과 민원을 붙여 넣고 보냅니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.tag = stepTag(el, this.ttl, 3, 120, 104, 64);
      this.lines = THEME.lines(el, ['채운 요청문 아래에 「요청 B의 민원」', '이름과 연락처를 지운 민원입니다'], { x: 120, y: 196, w: 1200, gap: 0 });
      this.chip = h('div', 'c5-chip', el, '<i></i>새별_체육시설_이용규정.md');
      css(this.chip, { position: 'absolute', left: '120px', top: '360px' });
      const X0 = 360, Y = 640, A = (1560 - 360) / 2 / (2 * C30);   // 블록 사이 등각 거리
      this.sq = THEME.sequence(el, [
        { label: '요청문 붙여 넣기' }, { label: '그 아래에 민원 붙여 넣기' }, { label: '보내기', tone: 'cobalt' },
      ], { x0: X0, x1: 1560, y: Y, size: 200, at: 0.5, each: 0.2, token: false });
      // 토큰: 1번 블록 왼쪽 앞에서 출발해 블록 앞 모서리와 블록 사이 틈을 등각 축으로만 지나 「보내기」 앞에서 멈춘다(블록 아래 설명 줄 위쪽만 지난다)
      const o = 140;
      this.fl = THEME.flow(el, [[-110, o], [o, o], [o, o - A], [o + A, o - A], [o + A, o - 2 * A], [o + 2 * A, o - 2 * A]],
        { x: X0, y: Y, at: 1.45, speed: 1500, line: false });
      this.desc = [
        [120, 500, '<span class="c5-mo">세항목_요청문_양식.md</span>의 <span class="c5-mo">```text</span> 줄과 <span class="c5-mo">```</span> 줄 사이'],
        [700, 520, '<span class="c5-mo">lab1/단계.md</span> 「2단계: 세 항목 요청」 아래 「요청 B의 민원」의 <span class="c5-mo">```text</span> 줄과 <span class="c5-mo">```</span> 줄 사이'],
      ].map(([x, w, t]) => THEME.text(el, 'c5-desc', t, x, 812, w));
      this.res = THEME.text(el, 't-body', '<b>기대 결과</b> · [민원 요지]부터 [담당자 확인]까지 다섯 칸으로 나뉜 답', 120, 960, 1700);
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.fl0.render(lt, ctx);
      this.ttl.render(lt);
      THEME.dropEl(this.tag, lt, 0.45, 120);
      this.lines.forEach((l, i) => rise(l, lt, 0.4 + i * 0.12));
      rise(this.chip, lt, 0.62);
      this.sq.render(lt);
      this.desc.forEach((d, i) => rise(d, lt, 1.3 + i * 0.15));
      this.fl.render(lt);
      rise(this.res, lt, 2.85);
    },
  });

  // ── s06 실습 확인(L8 확인 목록): 기대 값 네 줄(통과 흰 블록)과 계산 카드 ──
  DECK.slide({
    id: 'p1-ch05-s06', dur: 3,
    notes: NOTES.s06,
    setup(el) {
      this.bg = THEME.bg(el, 'lab', { floor: false });
      THEME.header(el, HEAD);
      this.ttl = THEME.title(el, '금액·조문·기한·이름을 확인합니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.tag = stepTag(el, this.ttl, 3, 120, 104, 64);
      this.body = THEME.text(el, 't-body', '네 가지가 모두 같으면 맞습니다', 120, 196);
      this.book = THEME.item(el, '규정집', { x: 1436, y: 246, w: 78, d: 58, h: 36, at: 0.55, label: false, layers: 4, drop: 160 });
      this.ltag = h('div', 'p1-tag', el, '체육시설 이용 규정');
      css(this.ltag, { left: '1500px', top: '200px', fontSize: '34px' });
      this.cl = THEME.checklist(el, [
        { text: '환불 금액', value: '34,000원' },
        { text: '근거 조문', value: '제7조 제1항 제2호' },
        { text: '지급 기한', value: '7영업일(제8조 제2항)' },
        { text: '이름·연락처', value: '답변에 나오지 않는다' },
      ], { x: 120, y: 270, w: 1680, rowH: 135, box: 92, boxH: 34, textX: 200, textSize: 52, valueSize: 48, at: 0.8, each: 0.18 });
      css(this.cl.rows[3].value, { fontFamily: 'var(--body)', fontWeight: '700', letterSpacing: '0' });
      this.calc = THEME.card(el, { x: 120, y: 850, w: 1680, at: 1.95, cap: '계산', pad: '22px 34px 24px',
        html: '<div class="c5-mo" style="font-size:40px;line-height:1.3">60,000원 × (12회 − 4회) ÷ 12회 − 60,000원 × 10% = 34,000원</div>' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.ttl.render(lt);
      THEME.dropEl(this.tag, lt, 0.45, 120);
      rise(this.body, lt, 0.4);
      this.book.render(lt);
      rise(this.ltag, lt, 0.7, 16);
      this.cl.render(lt);
      this.calc.render(lt);
    },
  });

  // ── s07 실습 단계(L3 좌우 대비): 왼쪽 「보낼 곳」 요청 C 카드, 오른쪽 「기대 결과」 답 카드. 오른쪽 칸은 키 없이 왼쪽 뒤에 열린다 ──
  const S07_R = 1.5;
  DECK.slide({
    id: 'p1-ch05-s07', dur: 3.55,
    notes: NOTES.s07,
    setup(el) {
      this.bg = THEME.bg(el, 'lab', { floor: false });
      THEME.header(el, HEAD);
      this.ttl = THEME.title(el, '규정에 없는 질문을 보냅니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.tag = stepTag(el, this.ttl, 4, 120, 104, 64);
      const sp = this.sp = THEME.split(el, { left: { label: '보낼 곳' }, right: { label: '기대 결과', tone: 'cobalt' }, rightAt: S07_R, at: 0.3 });
      this.l1 = THEME.text(sp.left, 'p1-half-line', '방금 그 대화(새 대화가 아니다)', 120, 330);
      this.req = THEME.card(sp.left, { x: 160, y: 420, w: 760, at: 0.8, cap: 'lab1/단계.md 「요청 C」',
        html: '<div class="c5-code c5-plain" style="font-size:38px;line-height:1.5"><div>같은 기준으로 아래 민원에도 답변을 써 줘.</div><div>[민원 원문]</div>' +
          '<div>제목: 문화센터 강의실 대관 취소</div><div>다음 주 토요일에 빌린 새별문화센터 강의실 대관을 취소하려고 합니다. 취소 수수료가 얼마인가요?</div></div>' });
      this.r1 = THEME.text(sp.right, 'p1-half-line', '금액 없이 담당자 확인', 1040, 330);
      this.ans = THEME.card(sp.right, { x: 1040, y: 420, w: 800, at: S07_R + 0.35,
        html: '<div class="c5-say" style="font-size:48px;line-height:1.4"><div>[답변] 문의하신 대관 취소 수수료는 첨부된 체육시설 이용 규정에서 확인되지 않아 <span class="c5-key">담당자 확인이 필요합니다</span>.</div>' +
          '<div>[계산] 산정할 수 없습니다.</div></div>' });
      this.ansLines = Array.from(this.ans.face.querySelectorAll('.c5-say > div'));
      const k = this.ans.face.querySelector('.c5-key'), kr = rel(k, this.ans.face);
      this.key = outline(svgFull(this.ans.face), kr.x - 8, kr.y - 2, kr.w + 16, kr.h + 4, 4);
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.ttl.render(lt);
      THEME.dropEl(this.tag, lt, 0.45, 120);
      this.sp.render(lt);
      rise(this.l1, lt, 0.55);
      this.req.render(lt);
      rise(this.r1, lt, S07_R + 0.2);
      this.ans.render(lt);
      this.ansLines.forEach((l, i) => rise(l, lt, S07_R + 0.75 + i * 0.15));
      this.key.draw(lt, S07_R + 1.15, 0.35);
    },
  });

  // ── s08 실습 확인(L12 표): 2장(한 줄 요청)과 5장(세 항목 요청)의 답을 네 행으로 견준다. 셋째 칸(기대 결과)은 코발트 ──
  DECK.slide({
    id: 'p1-ch05-s08', dur: 2.9,
    notes: NOTES.s08,
    setup(el) {
      this.bg = THEME.bg(el, 'lab', { floor: false });
      THEME.header(el, HEAD);
      this.ttl = THEME.title(el, '2장의 답변과 나란히 놓고 봅니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.tag = stepTag(el, this.ttl, 5, 120, 104, 64);
      const B = t => ({ text: t, size: 44 });
      this.tb = THEME.table(el, [
        ['근거', '체육시설법 시행령 등 일반 법령·기준', B('체육시설 이용 규정 제7조 제1항 제2호')],
        ['지급 기한', '3영업일 또는 확인 후 안내', B('7영업일(제8조 제2항)')],
        ['답변 형식', '매번 다르다', B('[민원 요지]~[담당자 확인] 다섯 칸')],
        ['이름·연락처', '「김가람님」으로 옮김', B('답변에 없음(민원에서 지우고 보냄)')],
      ], { x: 120, y: 350, cols: [300, 640, 740], head: ['', '2장 · 한 줄 요청', '5장 · 세 항목 요청\n기대 결과'],
        headH: 100, headSize: 34, rowH: 110, gap: 10, size: 40, at: 0.5, each: 0.1 });
      this.tb.rows.forEach(r => {
        const c = r.face.querySelectorAll('.p1-tgrid > *');
        css(c[0], { fontWeight: '700' });
        css(c[2], { color: ACC, fontWeight: '700' });
      });
      const hc = this.tb.head.children;
      css(hc[1], { color: 'var(--ink)' });
      css(hc[2], { color: ACC });
      this.lines = THEME.lines(el, ['<span class="c5-mo">lab1/비교표.md</span> 2열을 채웁니다', '2장 대화를 보고 1열 5줄(답변 형식)도 채웁니다', '옆 사람과 2열을 바꿔 봅니다'],
        { x: 120, y: 856, w: 1680, gap: 0 });
      this.lines.forEach(l => css(l, { fontSize: '40px', lineHeight: '1.3' }));
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.ttl.render(lt);
      THEME.dropEl(this.tag, lt, 0.45, 120);
      this.tb.render(lt);
      this.lines.forEach((l, i) => rise(l, lt, 1.3 + i * 0.12));
    },
  });

  // ── s09 실습 단계(L11 카드 격자): 저장 카드 넷(2×2). 오른쪽 아래에 세 층 판에서 파트 2 점선 블록으로 가는 서류 토큰 ──
  DECK.slide({
    id: 'p1-ch05-s09', dur: 3.5,
    notes: NOTES.s09,
    setup(el) {
      this.bg = THEME.bg(el, 'lab', { floor: false });
      this.fl0 = THEME.bg(el, 'base', { floor: [1000, 720, 860, 330], props: false, token: false });
      THEME.header(el, HEAD);
      this.ttl = THEME.title(el, '채운 요청문을 저장합니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.tag = stepTag(el, this.ttl, 6, 120, 104, 64);
      const defs = [
        ['저장할 것', '빈칸을 채운 세 항목 요청문'], ['저장 위치', 'lab1 폴더'],
        ['파일 이름', '<span class="c5-mo">세항목_요청문_양식.md</span>(2단계 1번에서 연 파일 그대로)'], ['저장 키', 'Ctrl+S · macOS는 Command+S'],
      ];
      // 타일: 제목 56px, 설명 본문 색 42px
      this.tiles = defs.map(([tt, tx], k) => {
        const c = THEME.tile(el, { x: 120 + (k % 2) * 860, y: 216 + Math.floor(k / 2) * 252, w: 820, h: 236, title: tt, text: 'x', at: 0.45 + k * 0.15, pad: '22px 36px' });
        css(c.face.querySelector('.p1-tile-t'), { fontSize: '56px', lineHeight: '1.15', marginBottom: '8px' });
        const x = c.face.querySelector('.p1-tile-x');
        x.innerHTML = tx;
        css(x, { fontSize: '42px', lineHeight: '1.3', color: 'var(--ink)' });
        return c;
      });
      this.stuck = THEME.text(el, 'c5-desc', '<b>막히면</b> · <span class="c5-mo">lab1/완성본/세항목_요청문_예.md</span>', 120, 768);
      this.body = THEME.text(el, 't-body', '파트 2에서 민원 상담 프로젝트의 지침으로 씁니다', 120, 846);
      css(this.body, { fontSize: '42px' });
      // 오른쪽 아래(앞 장보다 1.5배): 앞쪽 세 층 판 S, 등각 -iy 축 뒤쪽 점선 블록 G. 토큰은 두 블록의 왼쪽을 지나 점선 블록 앞에서 멈춘다
      const S = [1180, 960], GI = -205;
      const g = iso(0, GI, 0), G = [S[0] + g[0], S[1] + g[1]];
      this.fl = THEME.flow(el, [[-108, 60], [-108, GI + 50]], { x: S[0], y: S[1], at: 2.25, speed: 460, line: true });
      this.gh = THEME.block(el, { x: G[0], y: G[1], w: 144, d: 144, h: 50, tone: 'ghost', at: 1.8, drop: 0, shadow: false,
        label: '파트 2 · 민원 상담 프로젝트', labelPos: 'right' });
      this.ghDraw = THEME.ghostDraw(this.gh);
      css(this.gh.body.querySelector('.p1-tag'), { fontSize: '36px', whiteSpace: 'normal', width: '300px', boxSizing: 'border-box', wordBreak: 'keep-all' });
      // 이름표는 아래층에 달아 점선 블록 아래로 지나게 한다
      this.st = THEME.stack(el, [{ h: 22, label: '세 항목 요청문' }, { h: 22 }, { h: 22 }], { x: S[0], y: S[1], w: 156, at: 1.2, each: 0.14, labelX: 1516, tagSize: 36 });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.fl0.render(lt, ctx);
      this.ttl.render(lt);
      THEME.dropEl(this.tag, lt, 0.45, 120);
      this.tiles.forEach(c => c.render(lt));
      rise(this.stuck, lt, 1.3);
      rise(this.body, lt, 1.45);
      this.gh.render(lt); this.ghDraw(lt, 1.8, 0.4);
      this.st.render(lt);
      this.fl.render(lt);
    },
  });

  // ── s10 이야기(L9 인물과 대사): 대사 카드와 다음 질문 카드, 3배 인물 둘, 왼쪽 뒤 점선 초안(반려된 초안 자리)과 새 코발트 답변 초안 ──
  DECK.slide({
    id: 'p1-ch05-s10', dur: 3.9,
    notes: NOTES.s10,
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [700, 380, 1180, 700], props: false, token: false });
      THEME.header(el, HEAD);
      this.ttl = THEME.title(el, '반려된 초안이 고쳐 쓸 초안이 됐습니다', { x: 120, y: 96, size: 64, at: 0.1 });
      const H = [1120, 862], M = [1680, 630];
      const things = h('div', 'full', el);
      // 서류 토큰: 한서윤 주임 오른쪽 앞에서 등각 -iy 축으로 오민석 팀장 왼쪽 앞까지
      const d = [M[0] - H[0], M[1] - H[1]], ix = (d[0] / C30 + 2 * d[1]) / 2, iy = (2 * d[1] - d[0] / C30) / 2;
      this.fl = THEME.flow(el, [[90, 20], [90, iy + 70]], { x: H[0], y: H[1], at: 2.0, speed: 620 });
      // 뒤(위쪽)에 있는 것부터 만든다
      this.mb = THEME.figure(things, '오민석', { x: M[0], y: M[1], at: 0.35, first: true, scale: 3 });
      // 2장에서 반려된 초안 자리: 떨어지지 않고 점선 윤곽만 그어진다
      this.old = THEME.block(things, { x: 1330, y: 330, w: 200, d: 150, h: 20, tone: 'ghost', at: 0.8, drop: 0, shadow: false });
      this.oldDraw = THEME.ghostDraw(this.old);
      this.dr = THEME.item(things, '답변 초안', { x: 1340, y: 590, w: 200, d: 150, at: 1.35, label: '근거 · 제7조 제1항 제2호', note: '지급 기한 · 7영업일', pin: 40 });
      const tg = this.dr.body.querySelector('.p1-tag');
      css(tg, { fontSize: '40px' }); css(tg.querySelector('small'), { fontSize: '34px' });
      this.hs = THEME.figure(things, '한서윤', { x: H[0], y: H[1], at: 0.55, first: true, scale: 3, symbol: false });
      this.say = THEME.card(el, { x: 120, y: 200, w: 990, at: 2.55, enter: 'slide', cap: '오민석 팀장', text: '「고쳐서 쓸 수 있겠다」', pad: '34px 44px 58px' });
      css(this.say.face, { fontSize: '110px', fontWeight: '700', lineHeight: '1.55', whiteSpace: 'nowrap' });
      this.q = THEME.card(el, { x: 120, y: 650, w: 820, at: 2.9, enter: 'drop', cap: '다음 질문', html: '<div>이 방식을 내일 실제 민원에</div><div>그대로 써도 되는가</div>', pad: '30px 40px 46px' });
      css(this.q.face, { fontSize: '60px', fontWeight: '600', lineHeight: '1.38' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.ttl.render(lt);
      this.mb.render(lt);
      this.old.render(lt); this.oldDraw(lt, 0.8, 0.45);
      this.dr.render(lt);
      this.hs.render(lt);
      this.fl.render(lt);
      this.say.render(lt);
      this.q.render(lt);
    },
  });
})();
