/* 파트 1 · 8장 「시연: 한 문장으로 민원 답변 팀 만들기」 장면 코드. 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다.
 * 원고: plan/slides/p1-ch08.json. 레이아웃 배정: plan/assets/p1_layout_ch08.md. 테마 부품: themes/p1.js. 본보기: p1/ch00.js, p1/ch03.js
 * 장마다 레이아웃이 다르다: 영상 제목 → 사례 장면 → 요청문 크게 → 화면 크게 → 좌우 대비 → 실습 화면과 안내 → 가로 순서 → 표 → 한 문장.
 * 키 누름은 s05(오른쪽 칸 「파일에 적힌 조건」을 연다) 한 번뿐이다. 나머지 장은 키 없이 3~4초 안에 끝 상태가 된다.
 * 리허설 캡처(deck/assets/p1/shots/p1-ch08-s04.png ~ s08.png)가 아직 없다. s04·s06 은 그린 Claude Code 화면, s05·s08 은 빈 자리로 둔다.
 * 캡처 파일이 생기면 넣을 자리를 장마다 「캡처 자리」 주석으로 적었다. */
(function () {
  'use strict';
  const { ease, prog, clamp, lerp, css, h, s } = REEL;
  DECK.config({ part: 'p1', chapter: 'ch08', title: '시연: 한 문장으로 민원 답변 팀 만들기' });

  const NOTES = {
    "p1-ch08-s01": "7장에서 지침과 자료를 한 번 정해 두고, 확인할 수 있는 규칙은 검사로 옮기는 환경을 봤습니다. 그 검사를 맡는 에이전트 역할을 이제부터 검토라고 부릅니다. 그러면 이 환경을 이루는 파일은 누가 씁니까. 이번 8장은 여러분이 따라 하는 실습이 아니라 강사 시연입니다. 노트북은 잠시 두고 화면만 보시면 됩니다.",
    "p1-ch08-s02": "한서윤 주임의 요청문과 규칙을 Claude Code에서는 에이전트 파일과 스킬 파일로 적고, 이번 시연은 그 파일을 요청 한 문장으로 만듭니다. Claude Code는 글로 시키면 파일을 만드는 도구이고, harness는 여기에 설치하는 추가 기능으로 에이전트 팀과 스킬을 만듭니다. 3장과 7장에서 말한 하네스, 곧 지침·자료·검토를 정해 둔 환경을 만들어 주는 플러그인이라 이름이 같습니다. Claude Code는 2026년 11월 기준 Claude Pro 이상 요금제에 들어 있습니다. 여러분의 ChatGPT Plus 계정으로는 따라 할 수 없으므로 강사가 시연합니다.",
    "p1-ch08-s03": "규정 파일이 든 자료 폴더 하나만 있는 빈 폴더에서 시작합니다. 터미널은 Claude Code에 글로 일을 시키는 입력창이고, 여기에 이 한 문장을 넣습니다. 답변 다섯 칸, 자료 폴더만 근거로 쓰기, 개인정보 옮기지 않기는 5장의 세 항목에서 가져왔습니다. 세 역할로 나누기와, 다시 쓰기가 두 번을 넘으면 사람에게 넘기기는 이번에 새로 더했습니다. 반대로 5장에 있던 발송 전 팀장 확인, 규정에 없는 내용의 처리, 답하지 않는 범위는 이 문장에 넣지 않았습니다.",
    "p1-ch08-s04": "실행이 끝나면 자료 폴더만 있던 시연 폴더에 파일이 생깁니다. .claude/agents/ 폴더에는 역할마다 에이전트 파일이, .claude/skills/ 폴더에는 그 에이전트가 쓸 스킬 파일이 들어갑니다. 7장에서 본 대로 에이전트 파일은 누가 하는지를, 스킬 파일은 어떻게 하는지를 정합니다. CLAUDE.md는 Claude Code가 이 폴더에서 일을 시작할 때마다 먼저 읽는 지침 파일입니다. 이렇게 생긴 파일은 모두 사람이 한 줄도 쓰지 않았습니다. (강사 확인: 진행 중 권한 확인 창이 뜨면 폴더 안 읽기와 쓰기만 허용합니다.)",
    "p1-ch08-s05": "생긴 파일 가운데, 요청 문장의 마지막 구절 「두 번 넘게 다시 쓰기가 나오면 사람에게 넘긴다」가 적힌 곳을 엽니다. 이 조건은 검토 역할의 에이전트 파일에 적힐 수도 있고, 팀이 일하는 순서를 정하는 스킬 파일에 적힐 수도 있습니다. (키) 제가 Claude Code에서 그 파일을 열어 조건이 적힌 줄을 짚으면, 왼쪽의 요청 구절이 파일에 어떤 문장으로 들어갔는지 견주어 보세요. 사람이 쓴 요청의 한 구절이 파일의 규칙으로 남는지 확인하는 화면입니다. (강사 확인: 오른쪽은 리허설(K-09) 캡처가 들어오기 전까지 빈 틀입니다. 시연 중에는 .claude 폴더의 파일을 직접 열어 보여 주고, 리허설에서 조건이 적힌 파일 이름과 문장을 확인해 이 메모를 고칩니다. 어느 파일에도 상한이 없으면 demo1/대본.md의 대응대로 그 사실을 보입니다. 이어서 검토 에이전트 파일에 규칙을 넣게 하고 들어간 문장을 보여 줍니다.)",
    "p1-ch08-s06": "이제 이 팀에 2장과 5장에서 쓴 것과 같은 수영 강습 환불 민원을 맡깁니다. 민원 원문은 이름과 연락처를 지운 판입니다. 요청은 「팀으로 만들어 줘」 한 줄과 민원 원문뿐이고, 답변 형식과 근거 자료는 다시 적지 않았습니다. 그 내용은 앞에서 생긴 파일이 정합니다. 실행이 도는 동안 팀이 34,000원을 낼지 각자 짐작해 두세요.",
    "p1-ch08-s07": "팀은 규정 조사, 답변 작성, 검토 세 역할이 차례로 일합니다. 조사 역할이 자료 폴더의 규정에서 관련 조문을 찾으면, 작성 역할이 그 조문으로 다섯 칸 답변 초안을 쓰고, 검토 역할이 초안을 확인합니다. 검토에서 다시 쓰기가 나오면 초안은 작성 역할로 돌아가고, 두 번을 넘으면 사람에게 넘어갑니다. 요청 한 문장에서 사람이 나오는 곳은 이 마지막 단계와 답변의 [담당자 확인] 칸, 두 곳입니다. (강사 확인: 역할 사이의 결과가 파일로 남는지, 검토 결과를 어떤 말로 적는지는 리허설(K-09)에서 확인해 이 메모를 고칩니다.)",
    "p1-ch08-s08": "팀이 낸 답변 초안을 5장의 기준 답과 대조할 항목은 환불 금액 34,000원, 근거 제7조 제1항 제2호, 지급 기한 7영업일 세 가지입니다. 계산식의 6,000원은 수강료 60,000원의 10%인 위약금입니다. 제가 팀의 답변 초안을 열어 [계산], [근거], [답변] 칸을 차례로 짚으면 표 가운데 칸과 같은지 봐 주세요. 5장 대화를 열어 둔 분은 자기 답변의 세 항목과도 견주고, 열어 두지 않은 분은 표 가운데 칸을 기준 답으로 읽으시면 됩니다. 금액이 다르게 나오면 그 화면을 그대로 두고, 검토 역할이 그 오류를 잡아냈는지 봅니다. (강사 확인: 표 셋째 칸은 리허설(K-09) 캡처가 들어오기 전까지 칸 이름만 있습니다. 시연 중에는 팀이 낸 답변 초안 화면을 직접 띄웁니다.)",
    "p1-ch08-s09": "오늘 본 도구는 여러분 계정에 없습니다. 같은 구조, 곧 지침과 자료와 검토는 파트 2에서 ChatGPT 프로젝트로 직접 만들고, 민원 상담 프로젝트와 검토 프로젝트도 따로 둡니다. 시연을 보며 질문 하나가 남았을 것입니다. 왜 한 에이전트가 아니라 세 역할로 나뉘었고, 사람은 어디에서 결정합니까. 9장에서 위약금을 빠뜨린 초안을 검토가 어떻게 다시 쓰기로 판정하는지 보며 이 질문에 답합니다.",
  };
  const CT = '시연: 한 문장으로 민원 답변 팀 만들기';
  const CH = { chapter: 8, title: CT };
  const FIC = Object.assign({ fiction: true }, CH);
  const F = 1 / 30;
  const C30 = Math.cos(Math.PI / 6);
  const BG = '#E9EDF1', EDGE = 'rgba(19,32,44,.35)', ACC = '#2A55E5';
  const TERM_BG = '#13202C', TERM_INK = '#E9EDF1', TERM_ACC = '#8FA8FF';
  const rise = THEME.rise;
  const text = THEME.text;

  const svgFull = (el) => {
    const v = s('svg', { width: 1, height: 1 }, el);
    css(v, { position: 'absolute', left: '0px', top: '0px', overflow: 'visible', pointerEvents: 'none' });
    return v;
  };
  const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  const mix = (a, b, p) => { const A = hex(a), B = hex(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], clamp(p)))).join(',')})`; };
  // 사각 윤곽: 둘레를 따라 그어진다
  const markRect = (sv, x, y, w, hh, o = {}) => {
    const r = s('rect', { x: x.toFixed(1), y: y.toFixed(1), width: w.toFixed(1), height: hh.toFixed(1), fill: o.fill || 'none',
      stroke: o.stroke || ACC, 'stroke-width': o.sw ?? 4, 'stroke-linejoin': 'miter' }, sv);
    r._len = 2 * (w + hh);
    r.style.strokeDasharray = r._len;
    return r;
  };
  const drawRect = (r, lt, at, dur = 0.45) => {
    const p = prog(lt, at, dur, ease.inOutCubic);
    r.style.strokeDashoffset = (r._len * (1 - p)).toFixed(1);
    r.style.opacity = p > 0 ? '1' : '0';
    r.style.fillOpacity = p.toFixed(3);
  };
  // 블록 이름표 글자 크기
  const tagSize = (b, px) => { const t = b.body.querySelector('.p1-tag'); if (t) t.style.fontSize = px + 'px'; return t; };

  // 그린 Claude Code 화면(캡처 자리): 짙은 바탕, 윗줄에 창 표시와 「Claude Code」
  function termScreen(screen) {
    const wrap = h('div', '', screen);
    css(wrap, { position: 'absolute', left: '0px', top: '0px', width: '100%', height: '100%', background: TERM_BG, color: TERM_INK });
    const bar = h('div', '', wrap);
    css(bar, { position: 'absolute', left: '0px', top: '0px', right: '0px', height: '72px', display: 'flex', alignItems: 'center', gap: '12px',
      padding: '0 28px', borderBottom: '1.5px solid rgba(233,237,241,.16)' });
    for (let i = 0; i < 3; i++) { const d = h('i', '', bar); css(d, { display: 'block', width: '14px', height: '14px', background: 'rgba(233,237,241,.3)' }); }
    const t = h('span', '', bar, 'Claude Code');
    css(t, { marginLeft: '14px', font: '600 30px/1 var(--body)', color: 'rgba(233,237,241,.85)' });
    const body = h('div', '', wrap);
    css(body, { position: 'absolute', left: '0px', top: '72px', right: '0px', bottom: '0px' });
    return { el: wrap, body };
  }

  // ── s01 챕터 전환(L0 영상 제목): p1-tr-flow 정방향. 꼬리표 오른쪽에 「강사 시연」 이름표가 마지막에 떨어진다 ──
  DECK.slide({
    id: 'p1-ch08-s01', dur: 3.2,
    notes: NOTES['p1-ch08-s01'],
    setup(el) {
      this.vt = THEME.videoTitle(el, {
        kind: 'chapter', kicker: '파트 1 · 8장', scene: 'flow', at: 0.15,
        src: '../assets/video/p1/p1-tr-flow.mp4', poster: '../assets/video/p1/p1-tr-flow.jpg',
        title: '시연: 한 문장으로\n민원 답변 팀 만들기',
        sub: '이 환경을 사람이 파일 하나씩 직접 써야 하는가',
      });
      // 판 높이를 바꾸지 않게 꼬리표 줄 안에 절대 위치로 겹쳐 놓는다
      const kick = this.vt.el.querySelector('.p1-vt-kicker'), kt = kick.querySelector('span');
      this.tag = h('div', 'p1-tag', kick, '강사 시연');
      css(this.tag, { fontSize: '34px', transformOrigin: '50% 100%' });
      css(this.tag, { left: (kt.offsetLeft + kt.offsetWidth + 24) + 'px', top: ((kick.offsetHeight - this.tag.offsetHeight) / 2).toFixed(1) + 'px' });
      this.tagAt = Math.min(2.25, this.vt.end + 0.05);
    },
    render(lt, ctx) {
      this.vt.render(lt, ctx);
      THEME.dropEl(this.tag, lt, this.tagAt, 120);
    },
  });

  // ── s02 이야기(L10 사례 장면): 한서윤 주임의 질문, 이미 쓴 두 문서(흰 블록), 이번 시연에서 채울 세 자리(점선 → 코발트) ──
  DECK.slide({
    id: 'p1-ch08-s02', dur: 3.2,
    notes: NOTES['p1-ch08-s02'],
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [760, 230, 1120, 800], props: false, token: false });
      THEME.header(el, FIC);
      this.ttl = THEME.title(el, '파일 대신 요청\n한 문장을 넣습니다', { x: 120, y: 190, size: 72, w: 640, at: 0.1 });
      // 본문 세 줄: 도구 이름(굵게) 아래에 풀이를 둔다. 셋째 줄은 둘째 줄 풀이 「하네스를」과 같은 자리에서 시작한다
      const box = h('div', 'a', el);
      css(box, { left: '120px', top: '400px', width: '600px', display: 'flex', flexDirection: 'column', gap: '0px' });
      this.lines = [
        '<b>Claude Code:</b><br>글로 시키면 파일을 만드는 도구',
        '<b>harness:</b><br>하네스를 만들어 주는 추가 기능',
        '(에이전트 팀과 스킬 파일)',
      ].map(t => h('div', 't-body', box, t));
      css(this.lines[0], { marginBottom: '18px' });
      // 뒤(위쪽)에 있는 것부터 만든다. 점선 블록 셋은 한 줄로 놓고(바닥 y 400), 이름표 40px
      this.slots = [1060, 1389, 1718].map((x, k) => {
        const at = 1.2 + k * 0.18;
        const b = THEME.block(el, { x, y: 390, w: 180, d: 180, h: 60, tone: 'ghost', at, drop: 0, label: ['조사', '작성', '검토'][k], pin: 34 });
        tagSize(b, 40);
        const polys = Array.from(b.body.querySelectorAll('polygon'));
        return { b, at, draw: THEME.ghostDraw(b), polys, sh: b.el.firstChild };
      });
      this.fillAt = 2.4;
      // 흰 블록 둘: 이미 쓴 문서. 이름표는 블록 아래 36px(긴 이름표는 빈칸 하나에서 두 줄로 접는다)
      this.docs = [['세 항목 요청문', 1420, 1.02], ['업무에서 지키는\n네 가지', 1710, 0.9]].map(([lb, x, at]) => {
        const b = THEME.block(el, { x, y: 790, w: 160, d: 160, h: 50, at, label: lb, labelPos: 'below' });
        const t = tagSize(b, 36);
        css(t, { whiteSpace: 'pre', textAlign: 'center' });
        return b;
      });
      // 앞쪽: 한서윤 주임 2.2배. 대사 카드가 머리 위에 오므로 이름표는 발 왼쪽에 둔다(오른쪽은 인물 기호 블록이 있다)
      this.hs = THEME.figure(el, '한서윤', { x: 1000, y: 975, at: 0.3, first: true, scale: 2.2, big: true });
      const ft = this.hs.el.querySelector('.p1-tag');
      css(ft, { left: (-80 - ft.offsetWidth / 2).toFixed(0) + 'px', top: (-ft.offsetHeight + 36) + 'px' });
      this.cd = THEME.card(el, { x: 730, y: 515, w: 540, at: 0.65, enter: 'drop', cap: '한서윤 주임', html: '조사, 작성, 검토 파일을<br>제가 다 써야 하나요?' });
      css(this.cd.face, { fontSize: '44px', fontWeight: '600', lineHeight: '1.32' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.ttl.render(lt);
      this.lines.forEach((l, i) => rise(l, lt, 0.55 + i * 0.12));
      const C = THEME.tones.cobalt, faces = [C.left, C.right, C.top];
      const q = prog(lt, this.fillAt, 0.22, ease.outCubic);   // 셋이 함께 코발트로 칠해진다
      const u = lt - (this.fillAt + 0.1);
      let sx = 1, sy = 1;   // 칠해지며 눌렸다 펴진다
      if (u >= 0 && u < 3 * F) { sx = 1.035; sy = 0.92; }
      else if (u >= 3 * F) { const e = ease.outBack(clamp((u - 3 * F) / 0.2), 1.2); sx = lerp(1.035, 1, e); sy = lerp(0.92, 1, e); }
      this.slots.forEach(sl => {
        sl.b.render(lt);
        sl.draw(lt, sl.at, 0.45);
        if (q > 0) {
          sl.polys.forEach((pg, i) => { pg.setAttribute('stroke-dasharray', 'none'); pg.setAttribute('fill', mix(BG, faces[i], q)); pg.style.fillOpacity = '1'; });
          sl.b.body.style.transform = `scale(${sx.toFixed(4)}, ${sy.toFixed(4)})`;
        } else sl.polys.forEach(pg => pg.setAttribute('fill', BG));
        if (sl.sh) sl.sh.style.opacity = q.toFixed(3);
      });
      this.docs.forEach(b => b.render(lt));
      this.hs.render(lt);
      this.cd.render(lt);
    },
  });

  // ── s03 시연(L7 요청문 크게): 요청 한 문장을 구절마다 줄을 바꿔 싣고, 왼쪽에 구절이 어디서 왔는지 이름표 다섯 ──
  const S03_PROMPT = '새별시설공단(실습용 가상 기관) 고객지원팀의 민원 답변 초안을 만드는 에이전트 팀을 구성해 줘. 규정 조사, 답변 작성, 검토 세 역할로 나누고, 근거는 자료/ 폴더의 규정 파일만 쓰고, 답변은 [민원 요지] [답변] [계산] [근거] [담당자 확인] 다섯 칸으로 쓰고, 개인정보는 답변에 옮기지 않으며, 검토에서 두 번 넘게 다시 쓰기가 나오면 사람에게 넘기게 해 줘.';
  const S03_PH = [
    { t: '새별시설공단(실습용 가상 기관) 고객지원팀의 민원 답변 초안을 만드는 에이전트 팀을 구성해 줘.' },
    { t: '규정 조사, 답변 작성, 검토 세 역할로 나누고,', tag: '새로 더한 것', cob: true },
    { t: '근거는 자료/ 폴더의 규정 파일만 쓰고,', tag: '항목 2' },
    { t: '답변은 [민원 요지] [답변] [계산] [근거] [담당자 확인] 다섯 칸으로 쓰고,', tag: '항목 1' },
    { t: '개인정보는 답변에 옮기지 않으며,', tag: '항목 3' },
    { t: '검토에서 두 번 넘게 다시 쓰기가 나오면 사람에게 넘기게 해 줘.', tag: '새로 더한 것', cob: true },
  ];
  DECK.slide({
    id: 'p1-ch08-s03', dur: 3.5,
    notes: NOTES['p1-ch08-s03'],
    setup(el) {
      if (S03_PH.map(p => p.t).join(' ') !== S03_PROMPT) console.warn('[DECK] s03 요청 문장이 원고와 다르다');
      THEME.header(el, CH);
      const CX = 410, CY = 200, CW = 1400, CB = 892;   // 카드: x 410~1810, y 200~892
      this.ttl = THEME.title(el, '요청은 이 한 문장입니다', { x: CX, y: 92, size: 64, at: 0.1 });
      // 구절이 시작하는 곳에서 줄을 바꾼다(구절 사이의 빈칸 하나가 줄바꿈이 된다. 글자는 그대로다)
      this.cd = THEME.card(el, { x: CX, y: CY, w: CW, at: 0.3, cap: 'Claude Code', html: '<div class="p1-prompt"></div>', pad: '26px 48px 34px' });
      const pr = this.cd.face.querySelector('.p1-prompt');
      this.ph = S03_PH.map(p => {
        const d = h('div', '', pr);
        const sp = h('span', '', d); sp.textContent = p.t;
        return { d, sp, p };
      });
      // 고정폭 글자 크기: 48px 부터 낮춰 가며 「새로 더한 것」 두 구절이 한 줄에 들고 카드가 CB 안에서 끝나는 가장 큰 크기를 쓴다
      const LHR = 1.4;
      let F = 48, gap = 0;
      for (F of [48, 47, 46, 45, 44, 43, 42]) {
        gap = Math.round(F * 0.3);
        css(pr, { whiteSpace: 'normal', wordBreak: 'keep-all', fontSize: F + 'px', lineHeight: String(LHR) });
        this.ph.forEach((q, i) => { q.d.style.marginTop = i ? gap + 'px' : '0px'; });
        if (this.ph.filter(q => q.p.cob).every(q => q.sp.getClientRects().length === 1) && CY + this.cd.face.offsetHeight <= CB) break;
      }
      // 남는 높이는 구절 사이 간격에 나눠 넣어 카드가 CB 까지 찬다
      const extra = Math.max(0, CB - CY - this.cd.face.offsetHeight);
      gap += Math.min(36, Math.floor(extra / (this.ph.length - 1)));
      this.ph.forEach((q, i) => { q.d.style.marginTop = i ? gap + 'px' : '0px'; });
      this.fs = F;
      // 「새로 더한 것」 두 구절의 코발트 사각 윤곽(카드 면 기준 좌표, 선 굵기 5px)
      const msv = svgFull(this.cd.face);
      this.marks = this.ph.filter(q => q.p.cob).map(q => {
        const multi = q.sp.getClientRects().length > 1;
        const x = (multi ? q.d.offsetLeft : q.sp.offsetLeft) - 16, w = (multi ? q.d.offsetWidth : q.sp.offsetWidth) + 32;
        return markRect(msv, x, q.d.offsetTop - 8, w, q.d.offsetHeight + 16, { fill: 'rgba(42,85,229,.08)', sw: 5 });
      });
      // 왼쪽 구절 이름표(44px): 오른쪽 끝을 카드 왼쪽 가장자리에 붙이고 구절 첫 줄과 같은 높이에 둔다.
      // 카드 가장자리에서 구절 첫 글자까지 짧은 선을 잇는다(카드 위에 그린다)
      const lsv = svgFull(el);
      const LH = F * LHR;
      this.tags = this.ph.filter(q => q.p.tag).map(q => {
        const t = h('div', 'p1-tag is-big' + (q.p.cob ? ' is-cobalt' : ''), el, q.p.tag);
        const cy = CY + q.d.offsetTop + LH / 2;
        css(t, { right: (1920 - CX) + 'px' });
        css(t, { top: (cy - t.offsetHeight / 2).toFixed(1) + 'px' });
        const ln = s('line', { x1: CX, y1: cy, x2: CX + 38, y2: cy, stroke: q.p.cob ? ACC : EDGE, 'stroke-width': q.p.cob ? 4 : 2 }, lsv);
        return { t, ln };
      });
      this.phAt = i => 0.62 + i * 0.15;
      this.tagAt = i => 1.4 + i * 0.22;
      this.markAt = [2.45, 2.65];
      this.foot = text(el, 't-body', '자료/ 폴더에 가상 규정 파일이 있습니다', 120, 930);
    },
    render(lt) {
      this.ttl.render(lt);
      this.cd.render(lt);
      this.ph.forEach((q, i) => rise(q.d, lt, this.phAt(i), 18));
      // 이름표는 왼쪽에서 제자리로 밀려 들어온다(위아래로 움직이면 이웃 이름표와 겹친다)
      this.tags.forEach((g, i) => {
        const p = prog(lt, this.tagAt(i), 0.32, ease.snap);
        g.t.style.opacity = p.toFixed(3);
        g.t.style.transform = `translateX(${((1 - p) * -60).toFixed(1)}px)`;
        g.ln.style.opacity = prog(lt, this.tagAt(i) + 0.22, 0.2).toFixed(3);
      });
      this.marks.forEach((m, i) => drawRect(m, lt, this.markAt[i]));
      rise(this.foot, lt, 2.75);
    },
  });

  // ── s04 시연(L6 화면 크게): 시연 폴더에 파일이 생긴다. 줄이 끼어들며 자료/ 를 밀어내고, 오른쪽 이름표 셋이 그 줄을 짚는다 ──
  // 캡처 자리: deck/assets/p1/shots/p1-ch08-s04.png 가 생기면 THEME.shot 의 src 로 주고(그린 화면은 그 아래에 가려진다),
  // 회색 막대 자리의 실제 파일 이름을 원고 onScreen·facts 에 적은 뒤 표시 사각형(S04_MARK)과 이름표 짚는 점을 캡처의 줄에 맞춘다.
  const S04 = { x: 120, y: 196, LH: 80, top: 20, ind: 60, base: 48, FS: 44 };
  DECK.slide({
    id: 'p1-ch08-s04', dur: 3.5,
    notes: NOTES['p1-ch08-s04'],
    setup(el) {
      THEME.header(el, CH);
      this.ttl = THEME.title(el, '에이전트 파일과 스킬 파일이 생깁니다', { x: 120, y: 92, size: 64, at: 0.1 });
      // [글, 단계, 나타나는 시각, 종류]. 처음부터 있던 줄은 화면 틀과 함께 놓인다
      const defs = [
        ['~/demo1_saebyeol/', 0, 0.62, 'root'],
        ['.claude/agents/', 1, 1.0, 'new'],
        ['조사', 2, 1.12, 'file'],
        ['작성', 2, 1.24, 'file'],
        ['검토', 2, 1.36, 'file'],
        ['.claude/skills/', 1, 1.8, 'new'],
        ['CLAUDE.md', 1, 2.4, 'new'],
        ['자료/', 1, 0.7, 'dir'],
      ];
      this.shot = THEME.shot(el, null, {
        size: 'wide', x: S04.x, y: S04.y, at: 0.25,
        draw: (screen) => {
          const T = termScreen(screen);
          const list = h('div', '', T.body);
          css(list, { position: 'absolute', left: '0px', top: '0px', right: '0px', bottom: '0px', font: `500 ${S04.FS}px/1.2 var(--mono)`, color: TERM_INK });
          this.rows = defs.map(([txt, lv, at, kind]) => {
            const r = h('div', '', list);
            css(r, { position: 'absolute', left: (S04.base + lv * S04.ind) + 'px', top: '0px', height: S04.LH + 'px', display: 'flex', alignItems: 'center', gap: '18px', whiteSpace: 'nowrap' });
            if (kind === 'new' || kind === 'file') {   // 새로 생긴 줄 앞의 코발트 점
              const dot = h('div', '', r);
              css(dot, { position: 'absolute', left: '-30px', top: '50%', width: '14px', height: '14px', marginTop: '-7px', background: '#5C7EF0' });
            }
            if (kind === 'file') {   // 문서 모양 + 파일 이름 자리(회색 막대. 파일 이름은 리허설 캡처를 보고 넣는다) + 역할 꼬리표
              const ic = s('svg', { width: 32, height: 40, viewBox: '0 0 32 40' }, r);
              s('path', { d: 'M2 2 H21 L30 11 V38 H2 Z', fill: 'none', stroke: TERM_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, ic);
              s('path', { d: 'M21 2 V11 H30', fill: 'none', stroke: TERM_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, ic);
              const bar = h('div', '', r);
              css(bar, { width: '360px', height: '24px', background: 'rgba(233,237,241,.24)' });
              const tg = h('div', '', r, txt);
              css(tg, { marginLeft: '10px', padding: '2px 18px 4px', border: '2px solid #5C7EF0', color: '#FFFFFF', font: '600 36px/1.25 var(--body)' });
            } else {
              const t = h('span', '', r, txt);
              if (kind === 'root') t.style.color = TERM_ACC;
            }
            return { el: r, at, kind };
          });
          this.msv = svgFull(T.body);
          return T.el;
        },
      });
      // 모든 줄이 들어온 뒤의 자리(줄 k 의 위 끝 = top + k·LH). 표시 사각형은 대상 줄이 들어온 뒤에 긋는다(그 위의 줄은 더 움직이지 않는다)
      const rowTop = k => S04.top + k * S04.LH;
      const right = ks => Math.max(...ks.map(k => this.rows[k].el.offsetLeft + this.rows[k].el.offsetWidth));
      const left = ks => Math.min(...ks.map(k => this.rows[k].el.offsetLeft));
      const bodyY = S04.y + 72;   // 화면 안 목록의 위 끝(무대 좌표)
      const S04_MARK = [
        { ks: [1, 2, 3, 4], at: 1.62 },
        { ks: [5], at: 2.08 },
        { ks: [6], at: 2.68 },
      ];
      this.marks = S04_MARK.map(m => {
        const x0 = left(m.ks) - 46, x1 = right(m.ks) + 20, y0 = rowTop(m.ks[0]) + 4, y1 = rowTop(m.ks[m.ks.length - 1]) + S04.LH - 4;
        const r = markRect(this.msv, x0, y0, x1 - x0, y1 - y0, { stroke: '#5C7EF0', fill: 'rgba(92,126,240,.14)' });
        return { r, at: m.at, from: [S04.x + x1, bodyY + (y0 + y1) / 2] };
      });
      // 짚는 이름표 셋: 작은 블록 + 두 줄 글(44px 굵게 / 34px). 카드째 떨어지고 블록이 그 안에 내려앉는다
      const defsC = [
        { tone: 'cobalt', name: '에이전트 파일', desc: '누가 하는가', cy: 330 },
        { tone: 'white', name: '스킬 파일', desc: '어떻게 하는가', cy: 590 },
        { tone: 'ghost', name: 'CLAUDE.md', desc: '이 폴더에서 늘 먼저 읽는 지침', cy: 845 },
      ];
      const CX = 1372, CW = 468;
      const lsv = svgFull(el);
      this.calls = defsC.map((c, i) => {
        const m = this.marks[i], at = m.at + 0.35;
        const cd = THEME.card(el, { x: CX, y: 0, w: CW, at: at + 0.2, drop: 90, pad: '22px 20px 24px 160px',
          html: `<div style="font:700 44px/1.2 var(--body);color:var(--ink);white-space:nowrap">${c.name}</div><div style="font:400 34px/1.3 var(--body);color:var(--dim);margin-top:6px;word-break:keep-all">${c.desc}</div>` });
        const H = cd.face.offsetHeight;
        cd.el.style.top = (c.cy - H / 2).toFixed(1) + 'px';
        const gh = c.tone === 'ghost';
        const b = THEME.block(cd.el, { x: 84, y: H / 2 + 16, w: 80, d: 80, h: 30, tone: c.tone, at: gh ? at + 0.45 : at + 0.5, drop: gh ? 0 : 90, shadow: !gh });
        const ln = s('line', { x1: m.from[0], y1: m.from[1], x2: m.from[0], y2: m.from[1], stroke: ACC, 'stroke-width': 3, 'stroke-linecap': 'round' }, lsv);
        const dot = s('circle', { cx: m.from[0], cy: m.from[1], r: 7, fill: ACC }, lsv);
        return { cd, b, draw: gh ? THEME.ghostDraw(b) : null, ln, dot, at, to: [CX, c.cy] };
      });
    },
    render(lt) {
      this.ttl.render(lt);
      this.shot.render(lt);
      let y = S04.top;   // 줄이 끼어들면 그 아래 줄이 줄 높이만큼 밀려 내려간다
      this.rows.forEach(r => {
        const p = prog(lt, r.at, 0.32, ease.snap);
        r.el.style.top = y.toFixed(1) + 'px';
        r.el.style.opacity = p.toFixed(3);
        r.el.style.transform = `translateX(${((1 - p) * -24).toFixed(1)}px)`;
        y += S04.LH * p;
      });
      this.marks.forEach(m => drawRect(m.r, lt, m.at, 0.4));
      this.calls.forEach(c => {
        const p = prog(lt, c.at, 0.3, ease.inOutCubic);
        c.ln.setAttribute('x2', lerp(c.ln.x1.baseVal.value, c.to[0], p).toFixed(1));
        c.ln.setAttribute('y2', lerp(c.ln.y1.baseVal.value, c.to[1], p).toFixed(1));
        c.ln.style.opacity = c.dot.style.opacity = lt < c.at ? '0' : '1';
        c.cd.render(lt);
        c.b.render(lt);
        if (c.draw) c.draw(lt, c.at + 0.45, 0.4);
      });
    },
  });

  // ── s05 시연(L3 좌우 대비, 키 한 번): 왼쪽 요청 구절. 키를 누르면 오른쪽 「파일에 적힌 조건」 칸이 열린다 ──
  // 캡처 자리: deck/assets/p1/shots/p1-ch08-s05.png 가 생기면 점선 판(this.panel) 대신 조건이 적힌 한두 줄을 잘라 키운 그림(폭 800)을
  // 같은 자리(x 1040, y 370, 800×540)에 떨어뜨리고, 그 줄에 코발트 사각 윤곽을 긋는다. 그림 위 34px 한 줄에 실제 파일 이름을 단다.
  const S05_R = 1.9;
  DECK.slide({
    id: 'p1-ch08-s05', dur: 3.4, steps: [S05_R],
    notes: NOTES['p1-ch08-s05'],
    setup(el) {
      THEME.header(el, CH);
      this.ttl = THEME.title(el, '사람에게 넘기는 조건을 찾아봅니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.body = text(el, 't-body', '요청한 조건이 파일 어디에 적혔는지 봅니다', 120, 180);
      const sp = this.sp = THEME.split(el, { top: 260, bottom: 975, left: { label: '요청 문장' }, right: { label: '파일에 적힌 조건' }, rightAt: S05_R, at: 0.3 });
      const PY = 370, PH = 540;
      this.cd = THEME.card(sp.left, { x: 160, y: PY, w: 720, h: PH, at: 0.85, pad: '36px 44px',
        html: '<div>검토에서 두 번 넘게 다시 쓰기가 나오면 사람에게 넘기게 해 줘.</div>' });
      css(this.cd.face, { display: 'flex', alignItems: 'center', fontSize: '68px', fontWeight: '700', lineHeight: '1.42', wordBreak: 'keep-all' });
      // 오른쪽 칸 이름표 왼쪽의 호박 띠(사람에게 넘기는 자리)
      const rt = sp.right.querySelector('.p1-half-tag');
      this.band = h('div', '', sp.right);
      css(this.band, { position: 'absolute', left: '1014px', top: (260 + (rt.offsetHeight - 52) / 2).toFixed(1) + 'px', width: '12px', height: '52px',
        background: '#F2A93B', border: '1.5px solid #C9861F', transformOrigin: '50% 100%' });
      // 강사 시연 화면 자리: 점선 테두리 흰 판. 리허설 전이라 파일 이름과 내용은 그리지 않는다
      this.panel = h('div', '', sp.right);
      css(this.panel, { position: 'absolute', left: '1040px', top: PY + 'px', width: '800px', height: PH + 'px', boxSizing: 'border-box',
        background: 'repeating-linear-gradient(135deg, #FFFFFF 0px, #FFFFFF 22px, #F3F5F8 22px, #F3F5F8 44px)',
        border: '2.5px dashed rgba(19,32,44,.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '22px',
        transformOrigin: '50% 100%' });
      this.pa = h('div', '', this.panel, '강사 시연 화면');
      css(this.pa, { font: '700 56px/1.2 var(--body)', color: 'var(--ink)' });
      this.pb = h('div', '', this.panel, '볼 것: 다시 쓰기 상한이 적힌 줄');
      css(this.pb, { font: '400 40px/1.3 var(--body)', color: 'var(--dim)' });
    },
    render(lt) {
      const R = S05_R;
      this.ttl.render(lt);
      rise(this.body, lt, 0.45);
      this.sp.render(lt);
      this.cd.render(lt);
      THEME.dropEl(this.panel, lt, R + 0.3, 120);
      rise(this.pa, lt, R + 0.7, 28);
      rise(this.pb, lt, R + 0.82, 28);
      const g = prog(lt, R + 0.45, 0.3, ease.snap);
      this.band.style.transform = `scaleY(${g.toFixed(3)})`;
      this.band.style.opacity = g > 0 ? '1' : '0';
    },
  });

  // ── s06 시연(L15 실습 화면과 안내): 같은 민원을 팀에 맡기는 요청. 왼쪽 카드에 다시 적지 않은 것 ──
  // 캡처 자리: deck/assets/p1/shots/p1-ch08-s06.png 가 생기면 THEME.shot 의 src 로 주고, 「팀으로 만들어 줘」 윤곽(this.mark)을 캡처의 그 글자에 맞춘다.
  const S06_ROWS = [
    { segs: ['아래 민원에 대한 답변 초안을 ', { mark: '팀으로 만들어 줘' }, '.'] },
    { segs: [] },
    { segs: ['[민원 원문]'] },
    { segs: ['제목: 수영 강습 환불 요청'] },
    { segs: ['11월 수영 초급반(월·수·금 오전 7시)을 등록했고 수강료 60,000원을 계좌이체로 냈습니다.'] },
    { segs: ['11월 강습 12회 가운데 지금까지 4회가 진행되었고 4회 모두 나갔습니다.'] },
    { segs: ['회사 근무 시간이 바뀌어 오늘 그만두려고 합니다.'] },
    { segs: ['환불이 얼마나 되는지, 언제 들어오는지 알려 주세요.'] },
  ];
  DECK.slide({
    id: 'p1-ch08-s06', dur: 3.3,
    notes: NOTES['p1-ch08-s06'],
    setup(el) {
      THEME.header(el, FIC);
      this.ttl = THEME.title(el, '같은 수영 강습 민원을 팀에 맡깁니다', { x: 120, y: 92, size: 64, at: 0.1 });
      // 화면 틀은 받침까지 무대 안에 들도록 x 600 에 둔다(원고 x 680 이면 받침 오른쪽이 화면 밖으로 잘린다)
      this.cd = THEME.card(el, { x: 120, y: 390, w: 440, at: 0.45, enter: 'slide', pad: '34px 30px 38px',
        html: '<div>이름·연락처를<br>지운 민원입니다</div><div style="height:1.5px;background:var(--line);margin:30px 0 26px"></div><div>형식과 근거 자료는<br>다시 적지 않습니다</div>' });
      css(this.cd.face, { fontSize: '44px', fontWeight: '600', lineHeight: '1.35', whiteSpace: 'nowrap' });
      this.shot = THEME.shot(el, null, {
        size: 'wide', x: 600, y: 196, at: 0.25,
        draw: (screen) => {
          const T = termScreen(screen);
          const box = h('div', '', T.body);
          css(box, { position: 'absolute', left: '28px', top: '28px', right: '28px', padding: '16px 24px 18px 64px', border: '1.5px solid rgba(233,237,241,.3)',
            font: '500 38px/1.5 var(--mono)', color: TERM_INK, wordBreak: 'keep-all' });
          this.rows = S06_ROWS.map((r, i) => {
            const d = h('div', '', box);
            d.style.minHeight = '57px';
            r.segs.forEach(sg => {
              const sp = h('span', '', d);
              if (typeof sg === 'string') sp.textContent = sg;
              else { sp.textContent = sg.mark; sp.style.color = '#FFFFFF'; this.mk = sp; }
            });
            return d;
          });
          this.prompt = h('span', '', box, '&gt;');
          css(this.prompt, { position: 'absolute', left: '26px', top: '16px', color: TERM_ACC, fontWeight: '700' });
          const sv = svgFull(box);
          this.mark = markRect(sv, this.mk.offsetLeft - 8, this.mk.offsetTop + 2, this.mk.offsetWidth + 16, 53, { stroke: '#5C7EF0', fill: 'rgba(42,85,229,.3)' });
          return T.el;
        },
      });
      this.rowAt = [0.9, -1, 1.85, 2.0, 2.15, 2.3, 2.45, 2.6];
    },
    render(lt) {
      this.ttl.render(lt);
      this.cd.render(lt);
      this.shot.render(lt);
      this.rows.forEach((r, i) => { if (this.rowAt[i] >= 0) rise(r, lt, this.rowAt[i], 16); });
      const pp = prog(lt, 0.8, 0.25);
      this.prompt.style.opacity = pp.toFixed(3);
      drawRect(this.mark, lt, 1.4, 0.45);
    },
  });

  // ── s07 도식(L4 가로 순서): 코발트 블록 셋 앞을 서류 토큰이 지나며 보조 줄이 올라오고, 검토에서 작성으로 되돌아가는 점선, 끝에 사람(호박) ──
  // 토큰 길: 블록 k 앞(등각 (k·a + off, -k·a + off)) → 두 블록 사이 앞쪽(오른쪽 위 30°) → 다음 블록 앞(오른쪽 아래 30°).
  // 되돌림 점선은 그 아래쪽에 「검토」 앞 → 왼쪽 아래 30° → 왼쪽 위 30° → 「답변 작성」 앞으로 긋는다(토큰 길과 겹치지 않는다)
  const S07 = (() => {
    // 블록 넷이 한 줄에 들어가야 해서 바닥 크기는 232(1.1배)까지, 높이·이름표·번호는 1.25배로 키운다
    const x0 = 320, x1 = 1200, y = 550, size = 232, hh = 104, n = 3;
    const dx = (x1 - x0) / (n - 1), a = dx / (2 * C30), off = size / 2 + 50;
    const sp = 1600, seg = a / sp, tokAt = 0.95, humanAt = 2.7, humanLand = humanAt + 0.35;
    // flow 의 일정(theme schedule 과 같은 계산): 방향을 바꾸는 점마다 0.1초
    const p0 = tokAt, p2 = p0 + 0.3 + seg + 0.1 + seg, p4 = p2 + 0.1 + 0.3 + seg + 0.1 + seg;
    const hold4 = humanLand + 0.05 - p4 - 0.1;
    const p6 = p4 + 0.1 + hold4 + seg + 0.1 + seg;
    return { x0, x1, y, size, hh, dx, a, off, sp, tokAt, humanAt, hold4, stops: [p0, p2, p4, p6] };
  })();
  DECK.slide({
    id: 'p1-ch08-s07', dur: 3.9,
    notes: NOTES['p1-ch08-s07'],
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [120, 320, 1720, 660], props: false, token: false });
      THEME.header(el, CH);
      this.ttl = THEME.title(el, '조사·작성·검토 순서로 일합니다', { x: 120, y: 104, size: 64, at: 0.1 });
      const { x0, x1, y, size, hh, dx, a, off } = S07;
      const at = (ix, iy) => [x0 + (ix - iy) * C30, y + (ix + iy) * 0.5];
      // 되돌림 점선(블록보다 먼저 만들어 블록 아래에 깔린다)
      const front = k => at(k * a + off, -k * a + off);
      const back = [front(2), at(2 * a + off, -a + off), front(1)];   // 검토 앞 → 왼쪽 아래 → 답변 작성 앞
      this.back = back;
      this.backLen = Math.hypot(back[1][0] - back[0][0], back[1][1] - back[0][1]) * 2;
      const bsv = svgFull(el);
      this.backLine = s('polyline', { points: '', fill: 'none', stroke: 'rgba(19,32,44,.62)', 'stroke-width': 3.5, 'stroke-dasharray': '12 9', 'stroke-linejoin': 'round' }, bsv);
      // 「다시 쓰기」 이름표는 점선 꼭짓점의 오른쪽 아래에 둔다(아래 두 줄과 겹치지 않는다)
      this.backTag = h('div', 'p1-tag is-big', el, '다시 쓰기');
      css(this.backTag, { left: (back[1][0] + 34) + 'px', top: (back[1][1] - 6) + 'px' });
      this.sq = THEME.sequence(el, [
        { label: '규정 조사', note: '조사 결과', tone: 'cobalt' },
        { label: '답변 작성', note: '답변 초안', tone: 'cobalt' },
        { label: '검토', note: '검토 결과', tone: 'cobalt' },
      ], { x0, x1, y, size, h: hh, at: 0.3, each: 0.2, token: false, pin: 40 });
      // 이름표 55px(보조 줄 42px), 번호 60px
      const bigTag = b => { const t = b.body.querySelector('.p1-tag'); css(t, { fontSize: '55px', padding: '12px 30px 14px' }); const sm = t.querySelector('small'); if (sm) sm.style.fontSize = '42px'; return t; };
      this.sq.blocks.forEach(b => { bigTag(b); const no = b.body.querySelector('.p1-seq-no'); if (no) no.style.fontSize = '60px'; });
      // 보조 줄은 토큰이 그 블록 앞에 멈출 때 올라온다
      this.noteEls = this.sq.blocks.map(b => { const sm = b.body.querySelector('.p1-tag small'); css(sm, { overflow: 'hidden' }); return { sm, H: sm.offsetHeight + 2 }; });
      this.human = THEME.block(el, { x: x0 + 3 * dx, y, w: size, d: size, h: hh, tone: 'amber', at: S07.humanAt, label: '사람', pin: 40, drop: 300 });
      bigTag(this.human).classList.add('is-big');
      const path = [];
      for (let k = 0; k < 4; k++) { path.push([k * a + off, -k * a + off]); if (k < 3) path.push([k * a + off, -(k + 1) * a + off]); }
      this.fl = THEME.flow(el, path, { x: x0, y, at: S07.tokAt, speed: S07.sp, line: false, hold: { 0: 0.3, 2: 0.3, 4: S07.hold4 } });
      if (Math.abs(this.fl.times[6] - S07.stops[3]) > 0.02) console.warn('[DECK] s07 토큰 일정이 다르다', this.fl.times);
      this.l1 = text(el, 't-body', '다시 쓰기가 나오면 작성으로 돌아갑니다', 120, 862);
      this.l2 = text(el, 't-body', '두 번을 넘으면 사람에게 넘깁니다', 120, 922);
      [this.l1, this.l2].forEach(e => css(e, { fontSize: '46px', lineHeight: '1.25' }));
      this.backAt = S07.stops[2] + 0.1;
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.ttl.render(lt);
      // 되돌림 점선이 검토 앞에서부터 그어진다
      const q = prog(lt, this.backAt, 0.5, ease.inOutCubic), L = this.backLen * q, B = this.back, half = this.backLen / 2;
      let pts = '';
      if (q > 0) {
        const pt = [B[0]];
        if (L <= half) pt.push([lerp(B[0][0], B[1][0], L / half), lerp(B[0][1], B[1][1], L / half)]);
        else pt.push(B[1], [lerp(B[1][0], B[2][0], (L - half) / half), lerp(B[1][1], B[2][1], (L - half) / half)]);
        pts = pt.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
      }
      this.backLine.setAttribute('points', pts);
      const tp = prog(lt, this.backAt + 0.35, 0.3, ease.snap);
      this.backTag.style.opacity = tp.toFixed(3);
      this.backTag.style.transform = `translate(${((1 - tp) * -18).toFixed(1)}px, 0px)`;
      this.sq.render(lt);
      this.noteEls.forEach((n, k) => {
        const p = prog(lt, S07.stops[k], 0.3, ease.snap);
        n.sm.style.maxHeight = (n.H * p).toFixed(1) + 'px';
        n.sm.style.opacity = p.toFixed(3);
      });
      this.human.render(lt);
      this.fl.render(lt);
      rise(this.l1, lt, this.backAt + 0.2);
      rise(this.l2, lt, S07.stops[3] - 0.15);
    },
  });

  // ── s08 시연(L12 표): 5장 기준 답 세 항목과 팀이 낸 답변 초안의 칸 이름. 셋째 칸은 강사 시연 화면을 볼 빈 점선 칸이다 ──
  // 캡처 자리: deck/assets/p1/shots/p1-ch08-s08.png 가 생기면 셋째 칸의 점선 칸 자리(행마다 this.slots)에 [계산] [근거] [답변] 칸을 잘라 키운 그림(520×140)을 넣고,
  // 칸 머리말 꼬리표를 그림 왼쪽 위에 단다.
  DECK.slide({
    id: 'p1-ch08-s08', dur: 3.0,
    notes: NOTES['p1-ch08-s08'],
    setup(el) {
      THEME.header(el, FIC);
      this.ttl = THEME.title(el, '5장 답변과 세 항목을 대조합니다', { x: 120, y: 104, size: 64, at: 0.1 });
      const cols = [380, 760, 540], RH = 200, GAP = 12, X = 120, Y = 250;
      this.tb = THEME.table(el, [
        ['환불 금액', { text: '34,000원', size: 76, sub: '60,000원 × 8 ÷ 12 − 6,000원(위약금 10%)', subSize: 34 }, { text: '[계산]', size: 48 }],
        ['근거', { text: '체육시설 이용 규정 제7조 제1항 제2호', size: 50 }, { text: '[근거]', size: 48 }],
        ['지급 기한', { text: '7영업일(제8조 제2항)', size: 58 }, { text: '[답변]', size: 48 }],
      ], { x: X, y: Y, cols, head: ['', '5장 기준 답', '팀이 낸 답변 초안\n강사 시연 화면'], headSize: 34, headH: 96, rowH: RH, gap: GAP, size: 48, at: 0.45, each: 0.12 });
      this.slots = this.tb.rows.map((r, i) => {
        const cells = r.face.querySelectorAll('.p1-tgrid > div');
        css(cells[0], { fontWeight: '700' });
        css(cells[1], { color: 'var(--accent)', fontWeight: '700' });
        css(cells[2], { color: 'var(--dim)', fontWeight: '600', textAlign: 'center' });
        if (i === 1) cells[1].querySelector('.p1-tc-m').innerHTML = '체육시설 이용 규정<br>제7조 제1항 제2호';
        // 셋째 칸의 빈 점선 칸(강사가 시연 화면의 그 칸을 짚는다)
        const sv = svgFull(r.face);
        const x0 = cols[0] + cols[1] + 26, x1 = cols[0] + cols[1] + cols[2] - 26, y0 = 26, y1 = RH - 26;
        const pg = s('polygon', { points: `${x0},${y0} ${x1},${y0} ${x1},${y1} ${x0},${y1}`, fill: 'rgba(233,237,241,.55)', stroke: 'rgba(19,32,44,.45)', 'stroke-width': 1.5, 'stroke-dasharray': '6 5' }, sv);
        sv.style.zIndex = '0';
        r.face.querySelector('.p1-tgrid').style.position = 'relative';
        return { draw: THEME.dashDraw([pg]), at: 0.45 + i * 0.12 + 0.45 };
      });
      this.see = text(el, 't-body p1-dimtext', '볼 것: 팀 답변의 [계산] [근거] [답변] 칸', 120, 912);
      this.see.style.fontSize = '40px';
    },
    render(lt) {
      this.ttl.render(lt);
      this.tb.render(lt);
      this.slots.forEach(sl => sl.draw(lt, sl.at, 0.45));
      rise(this.see, lt, 1.55);
    },
  });

  // ── s09 정리(L1 한 문장): 같은 구조를 파트 2에서 직접 만든다. 보조 줄 둘과 9장에서 답할 질문 카드 ──
  DECK.slide({
    id: 'p1-ch08-s09', dur: 3.0,
    notes: NOTES['p1-ch08-s09'],
    setup(el) {
      this.bg = THEME.bg(el, 'accent', { floor: false, bx: 1880, by: 1180 });
      THEME.header(el, CH);
      this.st = THEME.statement(el, '같은 구조를 파트 2에서\n직접 만듭니다', { size: 132, cy: 390, em: ['직접 만듭니다'], at: 0.2 });
      this.l1 = text(el, 't-body', '지침 + 자료 + 검토 → <b>ChatGPT 프로젝트</b>', 120, 610);
      this.l2 = text(el, 't-body p1-dimtext', 'Claude Code는 시연으로만 봅니다', 120, 672);
      [this.l1, this.l2].forEach(e => { e.style.fontSize = '44px'; });
      this.subAt = this.st.end - 0.1;
      this.cd = THEME.card(el, { x: 120, y: 780, w: 1240, at: this.subAt + 0.45, enter: 'drop', cap: '다음 질문',
        html: '왜 한 에이전트가 아니라 세 역할로 나뉘었고,<br>사람은 어디에서 결정하는가' });
      css(this.cd.face, { fontSize: '46px', fontWeight: '600', lineHeight: '1.32' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.st.render(lt);
      rise(this.l1, lt, this.subAt);
      rise(this.l2, lt, this.subAt + 0.15);
      this.cd.render(lt);
    },
  });
})();
