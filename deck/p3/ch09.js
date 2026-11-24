/* 파트 3 · 9장 「정리: 에이전트 팀이 만들고 사람이 승인한다」. 원고 plan/slides/p3-ch09.json, 배정표 plan/assets/p3_layout_ch09.md.
 * 테마 「주황 면」(deck/themes/p3.md). 색은 CSS 변수와 테마 부품으로만 쓴다.
 * 레이아웃: s01 L0 · s02 L8 · s03 L9(파트 3 칸을 넓게) · s04 L12 · s05 L2 · s06 L3 · s07 L9 · s08 L0(과정 마지막 장).
 * 장마다 강조 한 곳(주황 면 또는 100px 이상의 글자)을 둔다. 장 제목은 72px.
 * 키 누름은 s03(파트 3의 답) 한 번뿐이다. 나머지 장은 키 없이 3초 안팎에 끝 상태가 된다.
 * 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다. */
(function () {
  'use strict';
  const { ease, prog, css, h, s } = REEL;
  const TH = window.THEME;
  const CH = '정리: 에이전트 팀이 만들고 사람이 승인한다';
  DECK.config({ part: 'p3', chapter: 'ch09', title: CH });

  // 강사 메모: 원고의 notes 를 그대로 옮겼다
  const NOTES = {
      "p3-ch09-s01": "오늘 과정의 마지막 챕터입니다. 과정을 시작할 때 세 파트마다 질문을 하나씩, 모두 세 질문을 드렸습니다. 이 챕터에서는 그 세 질문에 답하고, 오늘 만든 산출물을 확인한 뒤, 내일 소속 기관에서 무엇을 해 볼지 정합니다. 먼저 한 달 뒤의 한서윤 주임을 보겠습니다.",
      "p3-ch09-s02": "한 달 뒤, 한서윤 주임이 윤지영 본부장에게 민원 상담 서비스의 진행을 보고합니다. 보고서는 파트 2 10장에서 쓴 승인 요약과 같은 네 칸입니다. 만든 것 칸에는 한서윤 주임이 만든 민원 안내 화면과, 에이전트 팀이 더한 서버와 AI 답변, 기록 저장을 적었습니다. 남는 위험 칸에는 6장의 오픈 전 점검에서 오픈 뒤로 넘긴 항목인 담당자 기록 화면의 날짜별 검색을 적었습니다. 마지막 줄이 다음 승인 지점인 배포와 승인자 윤지영 본부장입니다. 고리가 열려 있는 것은 본부장이 아직 정하지 않았다는 뜻입니다. (강사 참고: 한 달 동안의 처리 건수나 줄어든 시간 같은 수치는 실습 묶음에 없어 넣지 않았습니다. 질문이 나오면 가상 사례라 수치를 정하지 않았다고 답합니다.)",
      "p3-ch09-s03": "과정을 시작할 때 드린 세 질문에 답해 봅니다. 파트 1에서는 요청의 세 항목과 모델 바깥에 정해 둔 지침·자료·검증·승인이 결과를 정한다고 답했습니다. 파트 2에서는 민원 상담 프로젝트를 직접 만들면서 ChatGPT Plus만으로 가능하다는 것을 확인했습니다. 조건은 좁은 범위, 시험표, 검토자, 승인 기록입니다. 파트 3의 답을 열기 전에, 그 답을 한 문장으로 말해 주실 분이 계십니까? (키) 파트 3의 답은 구성 요소는 에이전트 팀이 만들고 승인 지점마다 정해진 사람이 결정한다는 것이고, 앞 화면의 보고서 마지막 줄이 그 예입니다.",
      "p3-ch09-s04": "파트 1 9장에서 에이전트에게 넘기지 않는 사람의 일 네 가지를 보았습니다. 오늘 하루 동안 이 네 가지는 모두 사람이 정했습니다. 목표는 오민석 팀장이 지시한 답변 초안 작성 시간 줄이기였습니다. 품질 기준은 시험 12개 가운데 11개 이상 통과와 규칙 시험 실패 0건이었습니다. 맥락 판단으로 한서윤 주임은 배상 판단이 필요한 사고·분쟁을 시범 범위에서 뺐고, 책임은 승인 기록의 판정한 사람 칸에 남았습니다. 8장에서 만든 승인 지점 표의 승인자 칸도 이 네 가지를 정할 사람을 적는 자리입니다.",
      "p3-ch09-s05": "오늘 여러분이 직접 만든 산출물 다섯 가지입니다. 세 항목 요청문, 시험 기록, 승인 요약과 승인 기록, 승인 지점 표는 실습 묶음의 양식 파일에 저장했습니다. 민원 상담 프로젝트는 검토 프로젝트 「새별 답변 검토」와 함께 ChatGPT 프로젝트로 남아 있습니다. 3장에서 만든 민원 안내 화면은 게시하지 않았으므로 비공개 그대로이고, 필요 없으면 지웁니다. 못 끝낸 실습은 각 실습 폴더의 완성본으로 채우면 됩니다. 오늘 강의 자료는 제가 안내하는 방법으로 받습니다.",
      "p3-ch09-s06": "오늘 실습 8개는 모두 ChatGPT Plus 웹 화면에서 했고, 왼쪽 판에는 실습마다 쓴 기능과 실습 번호가 있습니다. 민원 안내 화면은 Work와 Sites로, 되지 않은 분은 Chat에서 받은 HTML 파일로 만들었고, 승인 지점 표는 임시 채팅이 보이지 않으면 일반 대화로 만들었습니다. 시연 4개에 쓴 도구가 오른쪽 판에 나오는데, Claude Code와 harness는 파트 1 8장과 파트 3 4장 두 시연에 썼습니다. harness는 Claude Code의 추가 기능으로 에이전트 팀을 만들고, Claude Code는 Claude Pro 이상 요금제에 들어 있습니다. Codex CLI는 Plus 계정에 포함되지만 설치가 필요합니다. 영상 생성 도구는 여러분 계정에 없고, 포스터 같은 이미지는 ChatGPT Images로 만들 수 있습니다. 판 아래 주석대로 서비스 안에서 AI가 답하게 하려면 API 요금이 Plus와 따로 청구되고, 플랜에 들어 있는 기능과 요금은 2026년 11월 기준이니 쓰기 전에 다시 확인합니다. (화면에서 옮긴 문구: 「시연 4개에는 다른 도구가 필요했습니다」)",
      "p3-ch09-s07": "첫째, 소속 기관의 생성형 AI 이용 지침에서 입력해도 되는 자료와 쓸 수 있는 도구를 확인하고, 파트 1 6장에서 본 업무에서 지키는 네 가지도 그 지침에 맞춰 봅니다. 둘째, 8장에서 저장한 승인지점표_양식.md의 「시험해 볼 것」 칸에 기대 답이 정해진 입력 세 개를 적고, 개인정보와 내부 자료 없이 돌려 나온 답을 기대 답과 대조합니다. 기대 답은 맞는 답을 미리 적어 둔 것이고, 파트 2 5장의 시험표에 질문마다 적어 둔 기대 답이 그 예입니다. 기관 지침이 개인 계정 사용을 막으면 이 시험을 하기 전에 승인자에게 먼저 묻습니다. 파일을 가져가지 못한 분이 양식을 받는 곳은 제가 따로 안내합니다. 셋째, 그 표와 시험 결과를 승인자에게 보여 주고 승인 지점과 승인자가 맞는지 확인받습니다. 셋 가운데 기관에 돌아가 먼저 할 일에 손을 들어 주십시오. (강사 참고: 실습 묶음 배포 방법은 강의 설계서 9절에서 아직 정해지지 않았습니다. 정해지면 그 방법을 이 자리에서 말합니다.)",
      "p3-ch09-s08": "오늘 과정의 제목이자 결론인 「에이전트 팀이 만들고 사람이 승인한다」로 마칩니다. 마지막 질문은 소속 기관에 돌아가 처음 맡길 업무 하나가 무엇인가입니다. 8장에서 승인 지점 표로 만든 업무가 첫 후보이고, 그 업무를 맡기기 전에 첫 승인 지점과 승인자부터 정합니다. 옆 사람에게 그 업무를 한 문장으로 말해 보는 것으로 오늘 과정을 끝내겠습니다. 오늘 함께해 주셔서 감사합니다."
  };

  const tx = (tag, cls, parent, text, style) => { const e = h(tag, cls, parent); if (text != null) e.textContent = text; if (style) css(e, style); return e; };
  // 어두운 바탕 위 보조 글자: --dim(#C4C4BE)보다 밝게 둔다
  const SOFT = '#DEDED8';
  // 왼쪽부터 펼쳐지는 선(SVG 경로)
  const line = (svg, d, w, color) => { const p = s('path', { d, fill: 'none', 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg); p.style.stroke = color; KIT.drawPrep(p); return p; };
  const stageSvg = el => { const v = s('svg', { width: 1920, height: 1080, viewBox: '0 0 1920 1080' }, el); css(v, { position: 'absolute', left: '0', top: '0', overflow: 'visible', pointerEvents: 'none' }); return v; };

  // ── s01 L0 영상 띠 전환 ── 인트로 영상 p3-intro 정방향, 인트로 장과 같은 밝기
  DECK.slide({
    id: 'p3-ch09-s01', dur: 2.8, steps: [], notes: NOTES['p3-ch09-s01'],
    setup(el) {
      this.vt = TH.videoTitle(el, {
        kind: 'chapter', kicker: '파트 3 · 9장', at: 0.45,
        title: '정리: 에이전트 팀이 만들고\n사람이 승인한다',
        sub: '오늘의 세 질문에 무엇이라고 답하고, 내일 무엇을 하는가',
        src: '../assets/video/p3/p3-intro.mp4', poster: '../assets/video/p3/p3-intro.jpg',
      });
      el.querySelector('.p3-vt-media').style.filter = 'grayscale(1) brightness(1.35) contrast(1.25)';
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // ── s02 L8 원문 인용(진행 보고) ── 밝은 종이에 보고서 네 줄, 아래 왼쪽에 보고하는 사람과 받는 사람, 오른쪽에 열린 연두 고리와 「배포」(110px)
  DECK.slide({
    id: 'p3-ch09-s02', dur: 3.1, steps: [], notes: NOTES['p3-ch09-s02'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 9, title: CH, fiction: 'inline' });
      this.tt = TH.pageTitle(el, '한 달 뒤, 본부장에게 보고합니다');
      this.sb = tx('div', 'a', el, '보고서의 마지막 줄은 다음 승인 지점과 승인자입니다',
        { left: '120px', top: '238px', fontSize: '40px', lineHeight: '1.3', fontWeight: '500', color: 'var(--ink)', whiteSpace: 'nowrap' });
      const ROWS = [
        ['만든 것', '민원 안내 화면(한서윤 주임) · 서버와 AI 답변, 기록 저장(에이전트 팀)'],
        ['시험 결과', '시험 기록 · 오픈 전 점검표 첨부'],
        ['남는 위험', '뒤로 넘긴 항목 · 담당자 기록 화면의 날짜별 검색'],
        ['사람이 정할 것', '다음 승인 지점: 배포 · 승인자: 윤지영 본부장'],
      ];
      this.dc = TH.doc(el, { x: 120, y: 312, w: 1680, size: 40, labelSize: 34, label: '민원 상담 서비스 진행 보고 · 한 달 뒤', at: 0.5, each: 0.08,
        lines: ROWS.map(([, v], i) => (i === 3 ? { text: v, mark: true } : v)) });
      // 줄마다 이름(34px 800 회색)을 값 앞에 같은 줄로 붙인다. 밝은 종이 위라 주황 글자를 쓰지 않는다
      [...this.dc.el.querySelectorAll('.p3-doc-line')].forEach((r, i) => {
        css(r, { display: 'flex', alignItems: 'baseline' });
        const k = tx('span', '', null, ROWS[i][0], { flex: 'none', width: '296px', fontSize: '34px', fontWeight: '800', color: '#5A5A55' });
        r.insertBefore(k, r.firstChild);
      });
      // 아래 줄: 왼쪽에 한서윤 주임 → 윤지영 본부장, 오른쪽에 열린 승인 고리와 「배포」
      const PY = 808, CY = PY + 52;
      const person = (who, x, at) => {
        const p = TH.person(el, { who, x, y: PY, at, org: true, nameSize: 40 });
        const og = p.el.querySelector('.p3-person-org'); if (og) css(og, { fontSize: '34px', color: SOFT });
        return p;
      };
      this.p1 = person('한서윤', 120, 1.4);
      const X2 = 680;
      this.p2 = person('윤지영', X2, 1.8);
      const svg = stageSvg(el);
      const ax0 = 120 + this.p1.el.offsetWidth + 36, ax1 = X2 - 36;
      this.ar = line(svg, `M ${ax0} ${CY} L ${ax1} ${CY}`, 3, 'var(--ink)');
      this.ah = line(svg, `M ${ax1 - 16} ${CY - 13} L ${ax1} ${CY} L ${ax1 - 16} ${CY + 13}`, 3, 'var(--ink)');
      // 「배포」(110px) 오른쪽 끝을 x 1780 에 맞추고 고리를 그 왼쪽에 둔다
      this.word = tx('div', 'a', el, '배포', { fontFamily: 'var(--display)', fontWeight: '900', fontSize: '110px', lineHeight: '1', letterSpacing: '-0.02em', color: 'var(--ink)', whiteSpace: 'nowrap' });
      const ww = this.word.offsetWidth, wx = 1780 - ww, RX = wx - 40 - 76, RY = CY;
      css(this.word, { left: wx + 'px', top: (RY - this.word.offsetHeight / 2 + 4).toFixed(0) + 'px' });
      this.ring = TH.ring(el, { x: RX, y: RY, r: 76, width: 7, at: 2.2 });
      this.tag = tx('div', 'p3-gate-who', el, '윤지영 본부장', { fontSize: '34px', padding: '4px 20px', top: (RY + 90) + 'px' });
      this.tag.style.left = (RX - this.tag.offsetWidth / 2).toFixed(0) + 'px';
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.sb, lt, 0.35);
      this.dc.render(lt);
      this.p1.render(lt); this.p2.render(lt);
      KIT.draw(this.ar, prog(lt, 1.6, 0.4, ease.inOutCubic));
      KIT.draw(this.ah, prog(lt, 1.95, 0.15, ease.outCubic));
      this.ring.render(lt);
      TH.reveal(this.word, lt, 2.25, { dx: -20 });
      TH.reveal(this.tag, lt, 2.6, { dx: 0, dy: 12 });
    },
  });

  // ── s03 L9 카드 격자(셋) ── 파트 3 칸(주황 면)을 넓게 두어 키를 누르면 열리는 답(56px 세 줄)이 이 장에서 가장 크게 보인다.
  //    키 전: 파트 1·2 칸은 번호·질문·답, 파트 3 칸은 번호·질문만. 키: 답 세 줄이 검정 막대를 지나 놓이고 칸 둘레에 주황 선이 한 번 그어진다
  const S3_KEY = 1.9;
  DECK.slide({
    id: 'p3-ch09-s03', dur: 3.0, steps: [S3_KEY], notes: NOTES['p3-ch09-s03'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 9, title: CH });
      this.tt = TH.pageTitle(el, '오늘의 세 질문에 이렇게 답합니다');
      const Y = 256, H = 690, GAP = 28, W3 = 712, W12 = (1680 - 2 * GAP - W3) / 2;
      const XS = [120, 120 + W12 + GAP, 120 + 2 * (W12 + GAP)], WS = [W12, W12, W3];
      const Q = [
        ['파트 1', '같은 AI, 왜 결과가 다른가', '요청의 세 항목과 모델 바깥에 정해 둔 지침·자료·검증·승인이 결과를 정합니다'],
        ['파트 2', '규정으로 답하는 상담을 만들 수 있는가', '만들 수 있습니다. 조건은 좁은 범위, 시험표, 검토자, 승인 기록입니다'],
        ['파트 3', '서비스로 넓히려면 누가 무엇을 하는가', null],
      ];
      this.tiles = Q.map(([n, q, a], i) => {
        const t0 = 0.5 + i * 0.14;
        const tl = TH.tile(el, { x: Math.round(XS[i]), y: Y, w: Math.round(WS[i]), h: H, n, title: q, text: a, tone: i === 2 ? 'orange' : 'panel', titleSize: 44, at: t0 });
        css(tl.el, { padding: '40px 40px' });
        css(tl.title, { textWrap: 'balance' });
        if (tl.text) css(tl.text, { fontSize: '38px', lineHeight: '1.4', fontWeight: '500', color: 'var(--ink)' });
        // 「지침·자료·검증·승인이」는 가운뎃점에서 줄이 갈리지 않게 한 덩어리로 둔다
        if (i === 0) { tl.text.textContent = '요청의 세 항목과 모델 바깥에 정해 둔 '; tx('span', '', tl.text, '지침·자료·검증·승인이', { whiteSpace: 'nowrap' }); tl.text.appendChild(document.createTextNode(' 결과를 정합니다')); }
        return { tl, t0 };
      });
      // 파트 3의 답: 세 줄로 나눠 둔다(문구는 원고 그대로)
      const t3 = this.tiles[2].tl;
      this.ans = TH.title(t3.el, '구성 요소는 에이전트 팀이\n만들고, 승인 지점마다\n정해진 사람이 결정합니다',
        { flow: true, w: Math.round(W3 - 80), size: 58, exact: true, weight: 800, at: S3_KEY + 0.05, style: { marginTop: '18px', lineHeight: '1.16' } });
      t3.el.querySelectorAll('.p3-title-bar').forEach(b => { b.style.background = 'var(--p3-black)'; });
      // 세 칸의 질문과 답 시작 높이를 맞춘다
      const tH = Math.max(...this.tiles.map(o => o.tl.title.offsetHeight));
      const aH = Math.max(this.ans.el.offsetHeight + 2, ...this.tiles.filter(o => o.tl.text).map(o => o.tl.text.offsetHeight));
      this.tiles.forEach(o => { o.tl.title.style.minHeight = tH + 'px'; if (o.tl.text) o.tl.text.style.minHeight = aH + 'px'; });
      this.ans.el.style.minHeight = aH + 'px';
      // 키를 누르면 파트 3 칸 둘레(12px 바깥)에 주황 4px 선이 한 번 그어진다
      const svg = stageSvg(el), x = XS[2] - 12, y = Y - 12, w = W3 + 24, hh = H + 24, r = 30;
      this.frame = line(svg, `M ${x + r} ${y} H ${x + w - r} A ${r} ${r} 0 0 1 ${x + w} ${y + r} V ${y + hh - r} A ${r} ${r} 0 0 1 ${x + w - r} ${y + hh} H ${x + r} A ${r} ${r} 0 0 1 ${x} ${y + hh - r} V ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y}`, 4, 'var(--p3-orange)');
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      this.tiles.forEach(({ tl, t0 }) => {
        tl.render(lt);
        TH.reveal(tl.title, lt, t0 + 0.35, { dx: -14 });
        if (tl.text) TH.reveal(tl.text, lt, t0 + 0.5, { dx: -14 });
      });
      this.ans.render(lt);
      KIT.draw(this.frame, prog(lt, S3_KEY, 0.7, ease.inOutCubic));
    },
  });

  // ── s04 L12 확인 목록(사람의 일 넷) ── 항목 이름 100px, 연두 체크(사람이 정해 승인한 기준), 오른쪽에 사례 46px와 출처 38px
  DECK.slide({
    id: 'p3-ch09-s04', dur: 2.6, steps: [], notes: NOTES['p3-ch09-s04'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 9, title: CH, fiction: 'inline' });
      this.tt = TH.pageTitle(el, '목표·기준·판단·책임은 사람이 정했습니다');
      this.sb = tx('div', 'a', el, '파트 1 9장에서 본 사람의 일 네 가지',
        { left: '120px', top: '236px', fontSize: '40px', lineHeight: '1.3', fontWeight: '500', color: 'var(--ink)', whiteSpace: 'nowrap' });
      const R = [
        ['목표', '답변 초안 작성 시간 줄이기', '오민석 팀장의 지시 · 파트 1 1장'],
        ['품질 기준', '시험 12개 중 11개 이상 통과', '시험표 · 파트 2 5장'],
        ['맥락 판단', '사고·분쟁은 시범 범위에서 뺌', '한서윤 주임 · 파트 2 2장'],
        ['책임', '승인 기록에 판정한 사람을 적음', '승인 기록 · 파트 2 10장'],
      ];
      this.ck = TH.checklist(el, R.map(([text, note]) => ({ text, note, state: 'pass' })), { y: 296, rowH: 168, size: 100, mainW: 560, at: 0.5, each: 0.18 });
      this.ck.rows.forEach((r, i) => {
        css(r.nt, { fontSize: '46px', lineHeight: '1.25', fontWeight: '700', color: 'var(--ink)' });
        tx('div', '', r.nt, R[i][2], { fontSize: '38px', lineHeight: '1.3', fontWeight: '500', color: SOFT, marginTop: '8px' });
      });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.sb, lt, 0.35);
      this.ck.render(lt);
    },
  });

  // ── s05 L2 큰 숫자 ── 주황 「5」가 1부터 넘어가 멈춘다. 오른쪽 열에 제목과 산출물 다섯 줄(자리 줄은 34px 고정폭), 숫자 아래 본문
  DECK.slide({
    id: 'p3-ch09-s05', dur: 2.8, steps: [], notes: NOTES['p3-ch09-s05'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 9, title: CH });
      this.bn = TH.bigNum(el, '5', { x: 110, top: 190, bottom: 690, unit: '가지', unitH: 124, at: 0.2 });
      const RX = Math.round(this.bn.right + 92);
      this.vr = tx('div', 'a p3-vrule', el, null, { left: (RX - 46) + 'px', top: '180px', height: '790px' });
      this.tt = TH.title(el, '오늘 만든 산출물은\n다섯 가지입니다', { x: RX, y: 166, size: 64, exact: true, w: 1800 - RX, at: 0.5 });
      const IT = [
        ['세 항목 요청문', '파트 1 5장 · lab1/세항목_요청문_양식.md'],
        ['민원 상담 프로젝트', '파트 2 4장 · ChatGPT 프로젝트 「새별 민원 상담」'],
        ['시험 기록과 승인 기록', '파트 2 6장·10장 · lab4/시험기록_양식.md, lab6/승인요약_양식.md'],
        ['민원 안내 화면', '파트 3 3장 · Sites(비공개) 또는 index.html'],
        ['내 업무의 승인 지점 표', '파트 3 8장 · lab8/승인지점표_양식.md'],
      ];
      const ty = 166 + this.tt.el.offsetHeight + 34;
      this.pt = TH.points(el, IT.map(([text, note]) => ({ text, note })), { x: RX, y: ty, w: 1800 - RX, size: 40, gap: 16, mark: 'num', at: 1.0, each: 0.2 });
      this.pt.rows.forEach(r => {
        r.tt.style.fontWeight = '700';
        const nt = r.row.querySelector('.p3-point-note');
        css(nt, { fontFamily: 'var(--mono)', fontSize: '34px', lineHeight: '1.32', color: SOFT, marginTop: '4px' });
        // 파일 경로 중간에서 줄이 갈리지 않게 경로마다 한 덩어리로 둔다
        const parts = nt.textContent.split(/(lab\d\/[^\s,]+|index\.html)/);
        nt.textContent = '';
        parts.forEach((t, k) => { if (!t) return; if (k % 2) tx('span', '', nt, t, { whiteSpace: 'nowrap' }); else nt.appendChild(document.createTextNode(t)); });
      });
      this.colEnd = ty + this.pt.el.offsetHeight;
      this.body = tx('div', 'a', el, '못 끝낸 실습은 각 폴더의 완성본으로 채웁니다',
        { left: '120px', width: (RX - 46 - 60 - 120) + 'px', fontSize: '44px', lineHeight: '1.3', fontWeight: '700', color: 'var(--ink)', wordBreak: 'keep-all', textWrap: 'balance' });
      this.body.style.top = (Math.max(this.colEnd, 900) - this.body.offsetHeight).toFixed(0) + 'px';
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.bn.render(lt);
      this.vr.style.transform = `scaleY(${prog(lt, 0.3, 0.9, ease.inOutSine).toFixed(4)})`;
      this.tt.render(lt); this.pt.render(lt);
      TH.reveal(this.body, lt, 2.2, { dx: 0, dy: 14 });
    },
  });

  // ── s06 L3 좌우 대비(Plus와 다른 도구) ── 두 면에 큰 줄(100px) 「실습 8개」「시연 4개」, 묶음마다 이름 40px와 설명. 오른쪽이 주황 면
  DECK.slide({
    id: 'p3-ch09-s06', dur: 3.0, steps: [], notes: NOTES['p3-ch09-s06'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 9, title: CH });
      this.tt = TH.pageTitle(el, '실습 8개는 모두 Plus로 했습니다');
      this.sp = TH.split(el, { top: 254, bottom: 926, left: { label: 'ChatGPT Plus로 한 일', tone: 'panel' }, right: { label: '다른 도구가 필요한 일', tone: 'orange' }, at: 0.3, rightAt: 1.1 });
      const side = (body, big, groups, dark, t0) => {
        css(body, { display: 'flex', flexDirection: 'column' });
        const b = tx('div', '', body, big, { flex: 'none', marginTop: '-20px', fontFamily: 'var(--display)', fontWeight: '900', fontSize: '100px', lineHeight: '1', letterSpacing: '-0.03em', color: 'var(--ink)', whiteSpace: 'nowrap' });
        const wrap = tx('div', '', body, null, { flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '22px' });
        const gs = groups.map(([k, v]) => {
          const g = tx('div', '', wrap);
          tx('div', '', g, k, { fontSize: '40px', lineHeight: '1.2', fontWeight: '800', color: 'var(--ink)', whiteSpace: 'nowrap' });
          tx('div', '', g, v, { fontSize: '34px', lineHeight: '1.25', fontWeight: dark ? '600' : '500', color: dark ? 'var(--p3-black)' : SOFT, marginTop: '4px', whiteSpace: 'nowrap' });
          return g;
        });
        return [b, ...gs].map((e, i) => ({ e, at: t0 + i * 0.12 }));
      };
      this.items = [
        ...side(this.sp.left, '실습 8개', [
          ['Chat · 실습 1·2', '요청문 비교 · 민원 데이터 분석'],
          ['프로젝트 · 실습 3~6', '민원 상담 · 시험 · 검토 · 승인 요약'],
          ['Work · Sites · 실습 7', '민원 안내 화면 · 안 되면 Chat에서 HTML 파일'],
          ['임시 채팅 · 실습 8', '내 업무의 승인 지점 표'],
        ], false, 0.6),
        ...side(this.sp.right, '시연 4개', [
          ['Claude Code + harness', '에이전트 팀에 일 맡기기 · 파트 1 8장 · 파트 3 4장'],
          ['Codex CLI', '작성·검토 에이전트로 시험 12개 실행 · 파트 2 9장'],
          ['이미지·영상 생성 도구', '안내 포스터와 영상 · 파트 3 7장'],
        ], true, 1.4),
      ];
      this.api = tx('div', 'a', el, '서비스 안에서 AI가 답하게 하려면 API 요금이 Plus와 따로 청구됩니다',
        { left: '120px', top: '942px', fontSize: '36px', lineHeight: '1.3', fontWeight: '600', color: 'var(--ink)', whiteSpace: 'nowrap' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.sp.render(lt);
      this.items.forEach(o => TH.reveal(o.e, lt, o.at, { dx: -14 }));
      TH.reveal(this.api, lt, 2.3, { dx: 0, dy: 12 });
    },
  });

  // ── s07 L9 카드 격자(셋) ── 같은 폭의 칸 셋(536×700), 번호 110px, 제목 56px, 설명 42px. 셋째 칸이 주황 면
  DECK.slide({
    id: 'p3-ch09-s07', dur: 2.6, steps: [], notes: NOTES['p3-ch09-s07'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 9, title: CH });
      this.tt = TH.pageTitle(el, '내일 해 볼 일은 세 가지입니다');
      this.tr = TH.tileRow(el, [
        { n: 1, title: '기관의 AI 이용 지침 확인', text: '입력해도 되는 자료와 쓸 수 있는 도구를 확인합니다' },
        { n: 2, title: '기대 답이 정해진 시험 세 개 돌리기', text: '승인지점표_양식.md의 「시험해 볼 것」 칸에 적고, 개인정보와 내부 자료 없이 돌립니다' },
        { n: 3, title: '승인자에게 표 보여 주기', text: '승인 지점과 승인자가 맞는지 확인받습니다', tone: 'orange' },
      ], { y: 256, h: 700, titleSize: 56, textSize: 42 });
      const tiles = this.tr.tiles;
      // 파일 이름은 고정폭으로 쓴다(문구는 그대로)
      const t2 = tiles[1].text;
      t2.textContent = '';
      tx('span', 'p3-mono', t2, '승인지점표_양식.md');
      t2.appendChild(document.createTextNode('의 「시험해 볼 것」 칸에 적고, 개인정보와 내부 자료 없이 돌립니다'));
      tiles.forEach((t, i) => { css(t.text, { color: 'var(--ink)', fontWeight: i === 2 ? '600' : '500', lineHeight: '1.38' }); css(t.title, { textWrap: 'balance' }); });
      // 제목·설명 자리의 높이를 다시 맞춘다
      tiles.forEach(t => { t.title.style.minHeight = ''; t.text.style.minHeight = ''; });
      const tH = Math.max(...tiles.map(t => t.title.offsetHeight)), xH = Math.max(...tiles.map(t => t.text.offsetHeight));
      tiles.forEach(t => { t.title.style.minHeight = tH + 'px'; t.text.style.minHeight = xH + 'px'; });
      this.parts = tiles.map((t, i) => ({ t, at: 0.5 + i * 0.14 }));
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.tr.render(lt);
      this.parts.forEach(({ t, at }) => {
        TH.reveal(t.title, lt, at + 0.35, { dx: -14 });
        TH.reveal(t.text, lt, at + 0.5, { dx: -14 });
      });
    },
  });

  // ── s08 L0 영상 띠 전환(과정 마지막 장) ── 전환 영상 p3-tr-rings 좌우 반전. 띠 글 상자 끝에 띠 폭 전체의 검정 선과 과정 이름·날짜
  DECK.slide({
    id: 'p3-ch09-s08', dur: 2.9, steps: [], notes: NOTES['p3-ch09-s08'],
    setup(el) {
      this.vt = TH.videoTitle(el, {
        kind: 'chapter', kicker: '파트 3 · 9장', flip: true, at: 0.45,
        title: '에이전트 팀이 만들고\n사람이 승인한다',
        sub: '소속 기관에 돌아가 처음 맡길 업무 하나는 무엇인가',
        src: '../assets/video/p3/p3-tr-rings.mp4', poster: '../assets/video/p3/p3-tr-rings.jpg',
      });
      const box = this.vt.el.querySelector('.p3-vt-text');
      this.course = tx('div', '', box, '공공기관 AX 업무혁신 전문가과정 · 2026-11-27',
        { alignSelf: 'stretch', fontSize: '34px', lineHeight: '1.3', fontWeight: '700', color: 'var(--p3-black)', marginTop: '34px', paddingTop: '22px', borderTop: '3px solid var(--p3-black)', whiteSpace: 'nowrap' });
    },
    render(lt, ctx) {
      this.vt.render(lt, ctx);
      TH.reveal(this.course, lt, 2.0, { dx: -16 });
    },
  });
})();
