/* 파트 3 · 5장 「승인 지점 8곳」. 원고 plan/slides/p3-ch05.json, 배정표 plan/assets/p3_layout_ch05.md.
 * 테마 「주황 면」(deck/themes/p3.md). 색은 CSS 변수와 테마 부품으로만 쓴다.
 * 레이아웃: s01 L0 · s02 L8 · s03 L14 · s04 L3 · s04a L12 · s05 사람 넷 칸 · s06 L9 · s07 L11 · s08 L4 · s09 L2.
 * 장마다 강조 한 곳(주황 면 또는 100px 이상의 글자)을 둔다. 제목은 72px(s09는 오른쪽 열에 두 줄).
 * 키 누름은 s07(퀴즈 정답) 한 번뿐이다. 나머지 장은 키 없이 3.5초 안에 끝 상태가 된다.
 * 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다. */
(function () {
  'use strict';
  const { ease, prog, clamp, lerp, css, h, s } = REEL;
  const TH = window.THEME;
  DECK.config({ part: 'p3', chapter: 'ch05', title: '승인 지점 8곳' });
  const CH = '승인 지점 8곳';   // 머리말 챕터 제목

  // 강사 메모: 원고의 notes 를 그대로 옮겼다
  const NOTES = {
      "p3-ch05-s01": "4장 시연의 한 문단 요청에는 요구사항, 화면, 서버, 시험 단계가 끝날 때마다 승인을 받으라는 문장이 있었습니다. 5장에서는 그 네 단계를 서비스 하나를 만들고 운영하는 동안의 승인 지점 8곳에 대응시켜 봅니다. 이어서 새별시설공단에서는 지점마다 누가 무엇을 정하는지 정리합니다.",
      "p3-ch05-s02": "4장 시연에서 에이전트 팀에 넣은 한 문단 요청의 한 문장입니다. 승인 단계는 요구사항, 화면, 서버, 시험 네 개이고, 네 단계 모두 「나」, 곧 요청한 사람 한 명에게 승인을 받습니다. 한서윤 주임이 이 요청을 공단에서 쓴다면, 화면 구성은 직접 볼 수 있어도 상담 기록에 무엇을 남길지나 누리집에 공개할지는 혼자 정할 수 없습니다. 그래서 한서윤 주임은 공단에서 이 네 단계를 누가 승인해야 하는지 묻습니다. (강사 확인: 리허설 K-10 기록이 나오면 첫 문장 뒤에 「시연에서 팀은 ○○ 단계에서 멈췄고, 저는 ○○라고 답했습니다」를 더합니다. 기록이 나오기 전에는 멈춘 횟수와 답한 내용을 말하지 않습니다.)",
      "p3-ch05-s03": "이 강의의 바탕이 된 기존 과정에서는 9회 동안 비개발자가 에이전트 팀으로 서비스 하나를 기획부터 배포와 운영까지 만들었고, 그때 사람이 승인한 지점이 8곳이었습니다. 기존 과정은 2회차부터 9회차까지 회차마다 승인 하나로 끝나는 구성이라 8곳이 되었습니다. 앞의 다섯 곳은 만들기 전에 설계를 승인하는 자리이고, 요구사항 다음의 네 곳은 2장에서 본 화면, DB, 인증, AI 호출에 하나씩 있습니다. 인증 설계는 2장에서 본 인증과 인가를 정하는 자리로, 상담 기록을 열려는 사람이 누구인지 어떻게 확인하고 누구에게 열어 줄지를 정합니다. 뒤의 세 곳은 서비스를 열기 전에 고칠 것을 정하는 개선 범위, 서비스를 공개하는 배포, 연 뒤에 바꾸는 변경 요청입니다. 개선 범위는 열기 전에 서비스를 점검한 결과를 보고 고칠 것과 뒤로 넘길 것을 나누는 자리이고, 이 오픈 전 점검은 6장에서 다룹니다.",
      "p3-ch05-s04": "시연 요청의 네 단계를 8곳에 대응시켜 봅니다. 요구사항은 요구사항, 화면은 화면 설계에 해당합니다. 서버 단계는 상담 기록을 저장하고 규정을 근거로 답을 만들므로, 남길 기록을 정하는 데이터 설계와 AI의 답을 정하는 AI 기능 설계 두 곳에 해당합니다. 시험 단계는 그 답을 시험표 12개로 확인하므로 AI 기능 설계에 해당합니다. 이 대응은 화면 아래에 적은 대로, 이 강의가 요청 문장과 기존 과정의 승인 지점을 대조해 정한 것입니다. (강사 확인: 리허설 K-10 기록이 나오면 팀이 실제로 멈춘 단계와 이 대응을 다시 대조하고, 멈춘 단계와 그 자리에서 답한 내용을 한 문장으로 더합니다.)",
      "p3-ch05-s04a": "남은 네 곳, 인증 설계, 개선 범위, 배포, 변경 요청은 요청 문장에 없습니다. 인증 설계는 조금 다릅니다. 요청에 「담당자가 볼 수 있게」라는 말은 있지만, 그 사람이 담당자인지 어떻게 확인할지는 적혀 있지 않습니다. 요청이 승인을 받으라고 적은 것은 네 단계뿐이므로, 공단에서 쓰려면 이 네 곳에서도 누가 승인할지 정해야 합니다. (강사 확인: 이 화면의 표기는 요청 문장만 보고 정했습니다. 리허설 K-10 기록이 나오면 다시 대조합니다. 팀이 담당자 확인 방법을 스스로 만들어 승인을 물었다면 인증 설계 줄을 그 내용으로 고칩니다. 기록이 나오기 전에는 「시연에 없었다」고 말하지 않습니다.)",
      "p3-ch05-s05": "새별시설공단에서 8곳을 누가 정하는지 네 사람의 역할에 맞춰 나눴습니다. 파트 2에서 프로젝트의 팀 사용을 승인한 오민석 팀장은 네 곳을 맡습니다. 요구사항에서 상담 창이 답할 범위와 저장하지 않을 것을, AI 기능 설계에서 근거 규정과 시험 통과 기준을, 개선 범위에서 오픈 전에 고칠 것과 넘길 것을, 변경 요청에서 바꿀 것과 다시 할 시험을 정합니다. 개인정보 담당인 정하준 대리는 데이터 설계에서 남길 기록 항목과 보관 기간을, 인증 설계에서 기록을 볼 사람과 확인 방법을 정합니다. 민원인이 보는 화면 구성과 완료 기준은 3장 실습에서 계획을 읽고 승인하는 단계를 맡았던 한서윤 주임이 정합니다. 누리집에 공개할지는 1장에서 이 질문을 한 윤지영 본부장이 정합니다. 여러분 부서라면 배포를 누가 정할지 잠시 떠올려 보세요. (소속: 오민석 팀장 · 고객지원팀, 정하준 대리 · 정보화팀, 한서윤 주임 · 고객지원팀, 윤지영 본부장 · 경영지원본부)",
      "p3-ch05-s06": "파트 2 10장에서 오민석 팀장에게 올린 승인 요약을 떠올려 보세요. 만든 것, 시험 결과, 남는 위험, 사람이 정할 것 네 칸과, 판정한 사람이 채우는 승인 기록이 있었습니다. 예를 들어 그 승인 기록에는 판정 승인, 조건 시범 2주와 담당자 4명, 판정한 사람 오민석 팀장이 적혔습니다. 승인 지점 8곳에도 이 양식을 씁니다. 네 칸과 승인 기록의 구성은 같고, 칸 안의 항목은 지점마다 바뀝니다. 판정도 같은 세 가지입니다. 승인, 수정 요청, 보류 가운데 하나를 고르고 날짜, 조건이나 고칠 것, 판정한 사람을 적습니다.",
      "p3-ch05-s07": "가상 예로, 정하준 대리가 받은 인증 설계 승인 요약의 남는 위험 칸에 「주소를 아는 사람은 누구나 상담 기록을 열 수 있다」가 있고 막는 방법이 비어 있습니다. 파트 2 10장에서 쓴 팀장 판정카드의 질문 3, 「남는 위험마다 막는 방법이 적혀 있는가」로 보고 승인, 수정 요청, 보류 가운데 맞다고 생각하는 쪽에 손을 들어 주세요. (키) 판정카드로는 남는 위험에 막는 방법이 없으면 수정 요청이고, 고칠 것과 다시 볼 날짜를 기록에 적습니다. 보류는 시험이 모자라 판단할 수 없을 때 고르는데, 이 예는 위험이 분명히 적혀 있어 판단할 수 있습니다. 이 예는 시연 결과가 아니라 판정을 연습하려고 만든 예입니다.",
      "p3-ch05-s08": "승인한 AI 기능 설계는 승인할 때의 규정 파일을 근거로 답하게 되어 있습니다. 그렇다면 규정이 개정되면 어떻게 될까요? 규정 파일을 바꾸면 상담 창의 답이 달라지므로, 승인한 설계와 실제 서비스가 서로 달라집니다. 그래서 바꿀 것과 다시 할 시험을 적어 변경 요청으로 올리고, 시험 12개를 다시 돌린 결과를 보고 오민석 팀장이 다시 승인한 뒤에 반영합니다. 8장 실습에서 옆 사람 표의 빠진 승인 지점을 찾을 때 이 예를 다시 봅니다.",
      "p3-ch05-s09": "5장을 정리합니다. 기존 과정에서 서비스 하나를 만들고 운영하는 동안 사람이 승인한 지점은 요구사항부터 변경 요청까지 8곳이고, 4장 시연의 요청은 그 가운데 4곳에 해당했습니다. 새별시설공단에서는 지점마다 정하는 사람이 다르고, 어느 지점이든 같은 승인 요약을 받아 승인, 수정 요청, 보류 가운데 하나로 판정합니다. 8곳 가운데 개선 범위는 오픈 전 점검의 결과를 보고 정합니다. 6장에서는 정하준 대리가 가져온 오픈 전 점검표로 공단 이름으로 서비스를 열기 전에 무엇을 점검하는지 봅니다."
  };

  const tx = (tag, cls, parent, text, style) => { const e = h(tag, cls, parent); if (text != null) e.textContent = text; if (style) css(e, style); return e; };
  // 장 제목: 72px 한 줄(x 120)
  const T72 = (el, text, o) => TH.title(el, text, Object.assign({ x: 120, y: 146, size: 72, exact: true, at: 0.2 }, o || {}));
  const SRC = '대응: 이 강의가 시연 요청 문장과 기존 과정의 승인 지점을 대조해 정함';
  // 왼쪽부터 펼쳐지는 면(clip-path)
  const openL = (e, lt, at, dur = 0.6) => { const p = prog(lt, at, dur, ease.outQuart); e.style.clipPath = p < 1 ? `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0 round 20px)` : 'none'; };
  // 큰 고리는 선을 굵게 쓴다(테마 고리의 원 순서: 바탕 점선, 번짐, 채움, 호)
  const thick = (ring, w) => { const c = ring.el.querySelectorAll('circle'); c[0].setAttribute('stroke-width', Math.max(2, w / 2.5)); c[3].setAttribute('stroke-width', w); };
  // 열린 고리 안쪽에서는 고리 사이 회색 선을 가린다(선은 고리와 고리 사이에만 보인다). 고리가 열릴 때 함께 놓인다
  const holes = (el, gt, y, r, fill = 'var(--bg)') => gt.cols.map(c => {
    const d = tx('div', 'a', el, null, { left: (c.cx - r + 3) + 'px', top: (y - r + 3) + 'px', width: (2 * r - 6) + 'px', height: (2 * r - 6) + 'px', borderRadius: '50%', background: fill, opacity: '0' });
    c.ring.el.before(d);
    return { d, t: c.t };
  });
  const holesAt = (hs, lt) => hs.forEach(o => { o.d.style.opacity = prog(lt, o.t, 0.15).toFixed(3); });

  // ── s01 L0 영상 띠 전환 ── 전환 영상 p3-tr-rings 를 좌우로 뒤집어(5장) 흑백으로 띠 위쪽에 깐다
  DECK.slide({
    id: 'p3-ch05-s01', dur: 2.8, steps: [], notes: NOTES['p3-ch05-s01'],
    setup(el) {
      this.vt = TH.videoTitle(el, {
        kind: 'chapter', kicker: '파트 3 · 5장', title: '승인 지점 8곳', flip: true, at: 0.45,
        sub: '에이전트 팀이 만드는 동안 사람은 어느 지점에서 무엇을 결정하는가',
        src: '../assets/video/p3/p3-tr-rings.mp4', poster: '../assets/video/p3/p3-tr-rings.jpg',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // ── s02 L8 원문 인용 ── 요청 문장(밝은 종이 56px), 아래 왼쪽에 고리 넷과 승인자 「나」, 오른쪽에 한서윤 주임과 주황 면의 질문(56px)
  DECK.slide({
    id: 'p3-ch05-s02', dur: 3.2, steps: [], notes: NOTES['p3-ch05-s02'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 5, title: CH, fiction: true });
      this.tt = T72(el, '요청의 승인자는 「나」 한 명입니다');
      this.dc = TH.doc(el, { x: 120, y: 248, w: 1680, label: '4장 시연의 한 문단 요청(일부)', size: 56, at: 0.4, each: 0.08, lines: [
        '요구사항, 화면, 서버, 시험 순서로 진행하고,',
        { text: '단계가 끝날 때마다 나에게 결과를 보여 주고', mark: true },
        { text: '승인을 받은 뒤 다음 단계로 간다.', mark: true },
      ] });
      css(this.dc.el, { padding: '28px 56px 30px 64px' });
      css(this.dc.el.querySelector('.p3-doc-label'), { fontSize: '34px' });
      // 시연에서 실제로 승인한 기록이 아직 없으므로 고리는 열어 둔다(close: false)
      const GY = 752, GR = 56;
      this.gt = TH.gates(el, ['요구사항', '화면', '서버', '시험'].map(l => ({ label: l, who: '나' })),
        { x0: 120, x1: 1000, y: GY, r: GR, size: 40, at: 1.3, each: 0.1, close: false, whoAt: 1.8 });
      this.gt.cols.forEach(c => { thick(c.ring, 6); c.tag && css(c.tag, { fontSize: '34px', padding: '4px 20px' }); });
      this.gt.cols.forEach(c => { if (c.tag) c.tag.style.left = (c.cx - c.tag.offsetWidth / 2).toFixed(1) + 'px'; });
      this.ho = holes(el, this.gt, GY, GR);
      this.pe = TH.person(el, { who: '한서윤', x: 1060, y: 694, at: 1.6, org: true });
      // 질문: 주황 면(이 장의 강조 한 곳), 검정 56px
      this.qp = tx('div', 'a', el, '공단에서는 이 네 단계를 누가 승인합니까?', {
        left: '1060px', top: '814px', width: '740px', boxSizing: 'border-box', padding: '16px 40px 20px', borderRadius: '20px',
        background: 'var(--p3-orange)', color: 'var(--p3-black)', fontFamily: 'var(--display)', fontWeight: '800', fontSize: '56px', lineHeight: '1.18', letterSpacing: '-0.02em', wordBreak: 'keep-all' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.dc.render(lt); this.gt.render(lt); holesAt(this.ho, lt); this.pe.render(lt);
      openL(this.qp, lt, 2.3, 0.6);
    },
  });

  // ── s03 L14 승인 지점 줄 ── 지름 152px 고리 여덟 개. 위에 묶음 이름 둘(5곳·3곳을 큰 숫자로)과 굵은 막대. 둘째 묶음(열기 전과 연 뒤)은 회색 면 위에 둔다
  const PTS = ['요구사항', '화면 설계', '데이터 설계', '인증 설계', 'AI 기능\n설계', '개선 범위', '배포', '변경 요청'];
  // 묶음 이름: 수(「5곳」「3곳」)만 크게 쓴다. 글자는 원고 그대로다
  const groupHead = (el, x, w, parts) => {
    const b = tx('div', 'a', el, null, { left: x + 'px', width: w + 'px', color: 'var(--ink)', fontWeight: '700', fontSize: '40px', lineHeight: '1.2', whiteSpace: 'pre-line', wordBreak: 'keep-all' });
    parts.forEach(t => {
      const m = /^#(\d)(곳)$/.exec(t);
      if (!m) { tx('span', '', b, t); return; }
      tx('span', '', b, m[1], { fontFamily: 'var(--num)', fontWeight: '900', fontSize: '108px', lineHeight: '1', color: 'var(--p3-orange-text)', letterSpacing: '-0.02em' });
      tx('span', '', b, m[2], { fontFamily: 'var(--display)', fontWeight: '800', fontSize: '54px', marginLeft: '6px' });
    });
    return b;
  };
  DECK.slide({
    id: 'p3-ch05-s03', dur: 3.2, steps: [], notes: NOTES['p3-ch05-s03'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 5, title: CH });
      this.tt = T72(el, '서비스 하나에 승인 지점은 8곳입니다', { em: ['8곳입니다'] });
      const BAR = 496, GY = 606, GR = 76;
      // 둘째 묶음의 면: x 1178~1824, y 292~936
      this.pn = tx('div', 'a', el, null, { left: '1178px', top: '292px', width: '646px', height: '644px', borderRadius: '24px', background: 'var(--panel)' });
      this.g1 = groupHead(el, 120, 1030, ['만들기 전: 설계 승인 ', '#5곳']);
      this.g2 = groupHead(el, 1218, 580, ['열기 전과 연 뒤: ', '#3곳', '\n· 열기 전 점검은 6장']);
      [this.g1, this.g2].forEach(g => { g.style.top = (BAR - 18 - g.offsetHeight) + 'px'; });
      this.b1 = tx('div', 'a', el, null, { left: '120px', top: BAR + 'px', width: '1030px', height: '8px', borderRadius: '4px', background: 'var(--ink)', transformOrigin: '0 50%' });
      this.b2 = tx('div', 'a', el, null, { left: '1218px', top: BAR + 'px', width: '566px', height: '8px', borderRadius: '4px', background: 'var(--ink)', transformOrigin: '0 50%' });
      const GLOSS = ['만들 것과 범위', '화면 구성', '남길 기록', '이용자 확인', 'AI 답의 기준', '열기 전\n고칠 것', '서비스 공개', '승인 뒤 변경'];
      this.gt = TH.gates(el, PTS.map((label, i) => ({ label, note: GLOSS[i] })), { x0: 120, x1: 1800, y: GY, r: GR, size: 42, at: 0.5, each: 0.1, close: false });
      this.gt.cols.forEach(c => { thick(c.ring, 7); if (c.note) css(c.note, { fontSize: '34px', lineHeight: '1.25' }); });
      this.ho = holes(el, this.gt, GY, GR);
      this.ho.slice(5).forEach(o => { o.d.style.background = 'var(--panel)'; });
      this.ft = tx('div', 'a p3-small', el, '출처: 비개발자가 서비스 하나를 만들고 운영한 기존 과정(9회)의 승인 지점', { left: '120px', top: '966px' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.g1, lt, 0.45, { dx: 0, dy: 16 });
      this.b1.style.transform = `scaleX(${prog(lt, 0.4, 0.7, ease.outQuart).toFixed(4)})`;
      TH.reveal(this.g2, lt, 0.95, { dx: 0, dy: 16 });
      this.b2.style.transform = `scaleX(${prog(lt, 0.9, 0.6, ease.outQuart).toFixed(4)})`;
      openL(this.pn, lt, 0.8, 0.6);
      this.gt.render(lt); holesAt(this.ho, lt);
      TH.reveal(this.ft, lt, 2.4, { dx: 0, dy: 10 });
    },
  });

  // ── s04 L3 좌우 대비(가운데 잇는 선) ── 왼쪽 네 단계(100px), 오른쪽 승인 지점 여덟 개(44px), 흰 선 다섯 개
  DECK.slide({
    id: 'p3-ch05-s04', dur: 3.7, steps: [], notes: NOTES['p3-ch05-s04'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 5, title: CH, at: -1 });
      this.tt = T72(el, '시연 요청의 단계는 4곳에 해당합니다');
      const TOP = 248, BOT = 836;
      this.sp = TH.split(el, { top: TOP, bottom: BOT, x0: 120, x1: 1800, gap: 400,
        left: { label: '4장 시연 요청의 단계', tone: 'panel' }, right: { tone: 'panel' }, at: 0.5, rightAt: 0.9 });
      css(this.sp.leftEl.querySelector('.p3-split-label'), { fontSize: '34px', top: '34px' });
      // 왼쪽 네 단계: 면 이름 아래(y 348~826)를 넷으로 고르게 나눈다
      const LY = [0, 1, 2, 3].map(i => 348 + (478 / 4) * (i + 0.5));
      this.stp = ['요구사항', '화면', '서버', '시험'].map((t, i) => {
        const e = tx('div', 'a', el, t, { left: '168px', fontFamily: 'var(--display)', fontWeight: '800', fontSize: '100px', lineHeight: '1.05', color: 'var(--ink)', whiteSpace: 'nowrap', letterSpacing: '-0.03em' });
        e.style.top = (LY[i] - e.offsetHeight / 2).toFixed(0) + 'px';
        return { e, x: 168 + e.offsetWidth, y: LY[i] };
      });
      // 오른쪽 여덟 이름: 줄 높이 70px, 면 안 세로 가운데
      const RH = 70, R0 = TOP + (BOT - TOP - RH * 8) / 2;
      const NX = 1222, BX = 1200;
      this.names = ['요구사항', '화면 설계', '데이터 설계', '인증 설계', 'AI 기능 설계', '개선 범위', '배포', '변경 요청'].map((t, i) => {
        const cy = R0 + RH * (i + 0.5);
        const e = tx('div', 'p3-gate-label off', el, t, { left: NX + 'px', fontSize: '44px', textAlign: 'left', whiteSpace: 'nowrap' });
        e.style.top = (cy - e.offsetHeight / 2).toFixed(0) + 'px';
        const bar = tx('div', 'a', el, null, { left: BX + 'px', top: (cy - 24) + 'px', width: '6px', height: '48px', borderRadius: '2px', background: 'var(--p3-orange)', transformOrigin: '50% 50%', transform: 'scaleY(0)' });
        return { e, bar, cy, hit: null };
      });
      // 잇는 선: 요구사항→요구사항, 화면→화면 설계, 서버→데이터 설계, 서버→AI 기능 설계, 시험→AI 기능 설계
      const LINKS = [[0, 0], [1, 1], [2, 2], [2, 4], [3, 4]];
      const svg = s('svg', { width: 1920, height: 1080, viewBox: '0 0 1920 1080' }, el);
      css(svg, { position: 'absolute', left: '0', top: '0', overflow: 'visible', pointerEvents: 'none' });
      const EX = BX - 14;
      this.links = LINKS.map(([a, b], k) => {
        const sx = this.stp[a].x + 24, sy = this.stp[a].y, ey = this.names[b].cy, dx = (EX - sx) * 0.42;
        const p = s('path', { d: `M ${sx} ${sy} C ${sx + dx} ${sy} ${EX - dx} ${ey} ${EX} ${ey}`, fill: 'none', 'stroke-width': 3, 'stroke-linecap': 'round' }, svg);
        p.style.stroke = 'var(--ink)';
        KIT.drawPrep(p);
        const d0 = s('circle', { cx: sx, cy: sy, r: 8 }, svg), d1 = s('circle', { cx: EX, cy: ey, r: 8 }, svg);
        d0.style.fill = 'var(--ink)'; d1.style.fill = 'var(--ink)';
        const t = 1.6 + k * 0.15, arrive = t + 0.38;
        const n = this.names[b];
        n.hit = n.hit == null ? arrive : Math.min(n.hit, arrive);
        return { p, d0, d1, t, arrive };
      });
      this.b1 = tx('div', 'a p3-body-s', el, '서버: 기록 저장과 규정 근거 답변을 만든다', { left: '120px', top: '852px', lineHeight: '1.35' });
      this.b2 = tx('div', 'a p3-body-s', el, '시험: 그 답변을 시험표 12개로 확인한다', { left: '120px', top: '902px', lineHeight: '1.35' });
      this.ft = tx('div', 'a p3-small', el, SRC, { left: '120px', top: '966px' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.sp.render(lt);
      this.stp.forEach((st, i) => TH.reveal(st.e, lt, 0.8 + i * 0.1, { dx: -20 }));
      this.names.forEach((n, i) => {
        TH.reveal(n.e, lt, 1.1 + i * 0.05, { dx: -12 });
        const on = n.hit != null && lt >= n.hit;
        n.e.classList.toggle('off', !on);
        n.bar.style.transform = `scaleY(${(n.hit != null ? prog(lt, n.hit, 0.3, ease.outQuart) : 0).toFixed(4)})`;
      });
      this.links.forEach(l => {
        KIT.draw(l.p, prog(lt, l.t, 0.38, ease.inOutCubic));
        l.d0.setAttribute('opacity', prog(lt, l.t - 0.05, 0.12).toFixed(3));
        l.d1.setAttribute('opacity', (lt >= l.arrive ? 1 : 0).toFixed(0));
      });
      TH.reveal(this.b1, lt, 2.6, { dx: 0, dy: 12 });
      TH.reveal(this.b2, lt, 2.72, { dx: 0, dy: 12 });
      TH.reveal(this.ft, lt, 2.9, { dx: 0, dy: 10 });
    },
  });

  // ── s04a L12 확인 목록 ── 요청에 없던 네 지점(84px)과 점선 빈칸(승인할 사람이 아직 없다). 보조 줄은 오른쪽 절반(40px). 결론 줄은 주황 면
  DECK.slide({
    id: 'p3-ch05-s04a', dur: 3.0, steps: [], notes: NOTES['p3-ch05-s04a'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 5, title: CH, at: -1 });
      this.tt = T72(el, '시연 요청에 없던 지점이 4곳입니다');
      this.sb = tx('div', 'a', el, '요청에 있던 곳: 요구사항 · 화면 설계 · 데이터 설계 · AI 기능 설계',
        { left: '120px', top: '248px', fontSize: '36px', lineHeight: '1.35', color: 'var(--dim)', whiteSpace: 'nowrap' });
      this.ck = TH.checklist(el, [
        { text: '인증 설계', note: '요청에 「담당자가 볼 수 있게」만 있고, 담당자를 확인하는 방법은 없음', state: 'todo' },
        { text: '개선 범위', note: '요청에 없었다', state: 'todo' },
        { text: '배포', note: '요청에 없었다', state: 'todo' },
        { text: '변경 요청', note: '요청에 없었다', state: 'todo' },
      ], { x: 120, y: 312, w: 1680, rowH: 138, size: 84, at: 0.7, each: 0.18 });
      this.ck.rows.forEach(r => {
        css(r.bx, { width: '104px', height: '104px', borderRadius: '18px', borderWidth: '4px' });
        css(r.tx, { marginLeft: '48px', display: 'flex', alignItems: 'center' });
        css(r.tx.querySelector('.p3-check-main'), { flex: 'none', width: '600px', fontFamily: 'var(--display)', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: '1.1', whiteSpace: 'nowrap' });
        const nt = r.tx.querySelector('.p3-check-note'); if (nt) css(nt, { flex: '1 1 auto', fontSize: '40px', lineHeight: '1.3', marginTop: '0', marginLeft: '28px' });
      });
      // 결론 줄: 주황 면, 검정 48px(이 장의 강조 한 곳)
      this.bd = tx('div', 'a', el, '이 네 곳에도 승인할 사람을 정해야 합니다', {
        left: '120px', top: '876px', width: '1680px', boxSizing: 'border-box', padding: '14px 44px 16px', borderRadius: '16px',
        background: 'var(--p3-orange)', color: 'var(--p3-black)', fontFamily: 'var(--display)', fontWeight: '800', fontSize: '48px', lineHeight: '1.2', letterSpacing: '-0.01em' });
      this.ft = tx('div', 'a p3-small', el, SRC, { left: '120px', top: '992px' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.sb, lt, 0.5); this.ck.render(lt);
      openL(this.bd, lt, 1.75, 0.6);
      TH.reveal(this.ft, lt, 2.3, { dx: 0, dy: 10 });
    },
  });

  // ── s05 사람 넷 칸 ── 화면을 네 칸으로 나눠 사람마다 인물 표시, 이름 56px, 맡은 곳 수(150px).
  //    칸 아래쪽에 맡은 지점을 한 칸씩 쌓는다(연두 고리와 44px). 쌓인 높이가 곳 수와 같은 비율이라 오민석 팀장의 칸이 가장 높다
  DECK.slide({
    id: 'p3-ch05-s05', dur: 3.0, steps: [], notes: NOTES['p3-ch05-s05'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 5, title: CH, fiction: true, at: -1 });
      this.tt = T72(el, '공단에서는 지점마다 정하는 사람이 다릅니다');
      const WHO = [
        ['오민석', '4곳', ['요구사항', 'AI 기능 설계', '개선 범위', '변경 요청']],
        ['정하준', '2곳', ['데이터 설계', '인증 설계']],
        ['한서윤', '1곳', ['화면 설계']],
        ['윤지영', '1곳', ['배포']],
      ];
      const W = 372, GAP = 64, TOP = 272, BOT = 948, BH = 92, BG = 12;
      this.cols = WHO.map(([who, n, pts], k) => {
        const x = 120 + k * (W + GAP), at = 0.4 + k * 0.22;
        const rule = k ? tx('div', 'a p3-vrule', el, null, { left: (x - GAP / 2) + 'px', top: TOP + 'px', height: (BOT - TOP) + 'px' }) : null;
        const pe = TH.person(el, { who, x, y: TOP, at, org: false });
        css(pe.el, { flexDirection: 'column', alignItems: 'flex-start', gap: '18px' });
        css(pe.el.querySelector('.p3-person-name'), { fontFamily: 'var(--display)', fontSize: '56px', fontWeight: '800', letterSpacing: '-0.02em', lineHeight: '1.15' });
        const cnt = tx('div', 'a', el, null, { left: (x + 104 + 28) + 'px', top: (TOP - 10) + 'px', whiteSpace: 'nowrap', lineHeight: '1' });
        tx('span', '', cnt, n.slice(0, -1), { fontFamily: 'var(--num)', fontWeight: '900', fontSize: '150px', lineHeight: '1', color: 'var(--p3-orange-text)', letterSpacing: '-0.02em' });
        tx('span', '', cnt, n.slice(-1), { fontFamily: 'var(--display)', fontWeight: '800', fontSize: '60px', color: 'var(--ink)', marginLeft: '8px' });
        // 맡은 지점: 아래(y 948)에서 위로 쌓는다. 아래 칸부터 차례로 올라온다
        const blocks = pts.map((p, j) => {
          const top = BOT - (pts.length - j) * (BH + BG) + BG, cy = top + BH / 2, t0 = at + 0.35 + (pts.length - 1 - j) * 0.08;
          const b = tx('div', 'a', el, null, { left: x + 'px', top: top + 'px', width: W + 'px', height: BH + 'px', boxSizing: 'border-box', borderRadius: '14px', background: 'var(--panel)', border: '2px solid var(--line)' });
          const ring = TH.ring(el, { x: x + 46, y: cy, r: 22, at: t0 + 0.1 });
          thick(ring, 5);
          const t = tx('div', 'a', el, p, { left: (x + 88) + 'px', fontFamily: 'var(--display)', fontWeight: '800', fontSize: '44px', lineHeight: '1.2', color: 'var(--ink)', whiteSpace: 'nowrap', letterSpacing: '-0.02em' });
          t.style.top = (cy - t.offsetHeight / 2).toFixed(0) + 'px';
          return { b, ring, t, t0 };
        });
        return { rule, pe, cnt, blocks, at };
      });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      this.cols.forEach(c => {
        if (c.rule) c.rule.style.transform = `scaleY(${prog(lt, c.at - 0.15, 0.7, ease.outQuart).toFixed(4)})`;
        c.pe.render(lt);
        TH.reveal(c.cnt, lt, c.at + 0.1, { dx: 0, dy: 40, dur: 0.55 });
        c.blocks.forEach(o => {
          TH.reveal(o.b, lt, o.t0, { dx: 0, dy: 44, dur: 0.45 });
          o.ring.render(lt);
          TH.reveal(o.t, lt, o.t0 + 0.05, { dx: 0, dy: 44, dur: 0.45 });
        });
      });
    },
  });

  // ── s06 L9 카드 격자(셋) ── 같은 승인 요약 양식 세 장. 파트 2에서 본 첫 양식이 주황 면. 아래 승인 기록 줄(36px)
  DECK.slide({
    id: 'p3-ch05-s06', dur: 2.9, steps: [], notes: NOTES['p3-ch05-s06'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 5, title: CH, fiction: true });
      this.tt = T72(el, '지점마다 같은 승인 요약을 씁니다');
      const HEADS = ['민원 상담 프로젝트\n팀 사용 · 파트 2 10장', '데이터 설계', '배포'];
      const TO = ['받는 사람: 오민석 팀장', '받는 사람: 정하준 대리', '받는 사람: 윤지영 본부장'];
      const FIELDS = ['만든 것', '시험 결과', '남는 위험', '사람이 정할 것'];
      this.tiles = HEADS.map((hd, i) => {
        const t0 = 0.5 + i * 0.14, hot = i === 0;
        const tl = TH.tile(el, { x: 120 + i * 572, y: 248, w: 536, h: 612, at: t0, tone: hot ? 'orange' : 'panel' });
        css(tl.el, { padding: '30px 40px 26px' });
        const lineCol = hot ? 'var(--p3-black)' : 'var(--line)';
        const items = [
          tx('div', 'p3-card-label', tl.body, '승인 요약', { fontSize: '34px', marginBottom: '6px', flex: 'none', color: hot ? 'var(--p3-black)' : '' }),
          tx('div', 'p3-card-title', tl.body, hd, { fontSize: '44px', lineHeight: '1.2', height: '106px', marginBottom: '6px', flex: 'none' }),
          tx('div', '', tl.body, TO[i], { fontSize: '34px', lineHeight: '1.35', color: 'var(--dim)', marginBottom: '2px', flex: 'none' }),
        ];
        FIELDS.forEach(f => {
          const r = tx('div', '', tl.body, null, { borderBottom: `2px solid ${lineCol}`, paddingBottom: '20px', marginTop: '10px', flex: 'none' });
          tx('div', '', r, f, { fontSize: '40px', lineHeight: '1.25', fontWeight: '600' });
          items.push(r);
        });
        return { tl, items, t0 };
      });
      this.rec = TH.glass(el, { x: 120, y: 880, w: 1680, h: 84, pad: 0, radius: 16, focusAt: 1.6 });
      const row = tx('div', '', this.rec.body, null, { display: 'flex', alignItems: 'center', height: '100%', padding: '0 40px', fontSize: '36px', lineHeight: '1.2', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.recItems = ['승인 기록', '날짜', '판정(승인·수정 요청·보류)', '조건 또는 고칠 것', '판정한 사람'].map((t, i) => tx('div', '', row, t, i
        ? { flex: '1 1 auto', paddingLeft: '28px', borderLeft: '2px solid var(--dim)', height: '44px', display: 'flex', alignItems: 'center' }
        : { flex: 'none', fontWeight: '800', marginRight: '32px' }));
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      this.tiles.forEach(({ tl, items, t0 }) => { tl.render(lt); items.forEach((e, j) => TH.reveal(e, lt, t0 + 0.3 + j * 0.05, { dx: -12 })); });
      this.rec.render(lt, ctx);
      this.recItems.forEach((e, i) => TH.reveal(e, lt, 1.75 + i * 0.08, { dx: -12 }));
    },
  });

  // ── s07 L11 퀴즈 ── 키 한 번: 「수정 요청」 칸이 주황으로 차오르고, 세 칸 아래쪽에 판정 기준(34px)이 놓인다
  DECK.slide({
    id: 'p3-ch05-s07', dur: 3.8, steps: [2.2], notes: NOTES['p3-ch05-s07'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 5, title: CH, fiction: true });
      this.tt = T72(el, '이 승인 요약, 어떤 판정을 내립니까?');
      const RV = 2.2, X0 = 800, X1 = 1800, Y = 246, H = 638, GAP = 24, W = (X1 - X0 - GAP * 2) / 3, PAD = 28;
      this.dc = TH.doc(el, { x: 120, y: Y, w: 620, h: H, label: '가상 예 · 인증 설계 승인 요약', size: 36, at: 0.4, each: 0.06, lines: [
        '받는 사람: 정하준 대리',
        '남는 위험: 주소를 아는 사람은 누구나 상담 기록을 열 수 있다',
        { text: '막는 방법: (비어 있음)', mark: true },
        { text: '파트 2 팀장 판정카드 · 질문 3', dim: true, size: 34, gap: 26 },
        { text: '[남는 위험]마다 막는 방법이 적혀 있는가?', dim: true, size: 34 },
      ] });
      css(this.dc.el, { padding: '28px 44px 30px 60px' });
      css(this.dc.el.querySelector('.p3-doc-label'), { fontSize: '34px' });
      this.RV = RV;
      this.qz = TH.quiz(el, ['승인', '수정 요청', '보류'], { x0: X0, x1: X1, y: Y, h: H, gap: GAP, size: 56, answer: 1, revealAt: RV, at: 0.8 });
      // 보기 이름은 번호 바로 아래에 둔다(칸 아래쪽은 판정 기준 자리)
      this.qz.items.forEach(it => { css(it.num, { left: PAD + 'px', top: '26px' }); css(it.lab, { top: '136px', bottom: 'auto', left: PAD + 'px', right: PAD + 'px' }); });
      // 판정 기준은 칸 밖 형제 요소로 둔다. 다른 두 칸이 옅어져도 판정 기준 줄은 옅어지지 않는다
      const CRIT = ['승인 — 질문 5개가 모두 「예」이거나, 「아니오」를 조건으로 막을 수 있을 때', '수정 요청 — 남는 위험에 막는 방법이 없을 때', '보류 — 시험 수가 모자라 판단할 수 없을 때'];
      this.crit = CRIT.map((t, i) => {
        const hit = i === 1;
        const box = tx('div', 'a', el, null, { left: (X0 + i * (W + GAP) + PAD).toFixed(1) + 'px', width: (W - 2 * PAD).toFixed(1) + 'px', bottom: (1080 - Y - H + 26) + 'px', color: hit ? 'var(--p3-black)' : 'var(--dim)' });
        const c = tx('div', '', box, t, { fontSize: '34px', lineHeight: '1.32', fontWeight: hit ? '600' : '500', wordBreak: 'keep-all' });
        const rec = hit ? tx('div', '', box, '기록: 고칠 것과 다시 볼 날짜', { fontSize: '34px', lineHeight: '1.32', fontWeight: '700', marginTop: '16px', paddingTop: '12px', borderTop: '2px solid var(--p3-black)', wordBreak: 'keep-all' }) : null;
        return { c, rec, at: RV + 0.3 + i * 0.1 };
      });
      this.ans = tx('div', 'a', el, '정답 ② 수정 요청', { left: X0 + 'px', top: '898px', fontFamily: 'var(--display)', fontWeight: '800', fontSize: '56px', lineHeight: '1.15', letterSpacing: '-0.01em', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.ft = tx('div', 'a p3-small', el, '판정카드의 판정 기준 가운데 이 예에 해당하는 조건만 옮김', { left: '120px', top: '996px' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.dc.render(lt); this.qz.render(lt);
      this.crit.forEach(k => { TH.reveal(k.c, lt, k.at, { dx: 0, dy: 12 }); if (k.rec) TH.reveal(k.rec, lt, this.RV + 0.65, { dx: 0, dy: 12 }); });
      TH.reveal(this.ans, lt, this.RV + 0.75, { dx: -16 });
      TH.reveal(this.ft, lt, this.RV + 0.85, { dx: 0, dy: 10 });
    },
  });

  // ── s08 L4 가로 순서 ── 흰 점이 ①~④ 위를 지나 ⑤(지금 단계, 주황 면)에서 멈추고, 그때 ⑤의 고리가 닫힌다
  DECK.slide({
    id: 'p3-ch05-s08', dur: 3.7, steps: [], notes: NOTES['p3-ch05-s08'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = TH.header(el, { chapter: 5, title: CH, fiction: true });
      this.tt = T72(el, '승인한 뒤 바꾸려면 변경 요청을 거칩니다');
      this.q = tx('div', 'a', el, '규정이 개정되면 어떻게 됩니까?', { left: '120px', top: '246px', fontSize: '42px', lineHeight: '1.3', fontWeight: '600', color: 'var(--ink)', whiteSpace: 'nowrap' });
      const Y = 360, H = 572, GAP = 16, X0 = 120, X1 = 1800, N = 5, W = (X1 - X0 - GAP * (N - 1)) / N, AT = 0.6, EACH = 0.1, PY = 334;
      this.sq = TH.sequence(el, [
        { label: 'AI 기능 설계 · 승인', tone: 'done' }, { label: '규정 개정' }, { label: '규정 파일 교체' }, { label: '시험 12개 다시' }, { label: '변경 요청', tone: 'now' },
      ], { x0: X0, x1: X1, y: Y, h: H, gap: GAP, size: 52, at: AT, each: EACH });
      // 번호 120px, 다섯 칸의 이름 자리를 두 줄 높이로 맞춘다
      this.sq.cells.forEach(c => {
        css(c.num, { fontSize: '120px' });
        c.c.querySelector('.p3-seq-label').style.minHeight = Math.ceil(52 * 1.15 * 2) + 'px';
      });
      const cx = i => X0 + i * (W + GAP) + W / 2, rx = i => X0 + i * (W + GAP) + W - 58;
      this.r1 = TH.ring(el, { x: rx(0), y: Y + 66, r: 32, at: AT + 0.25, closeAt: AT + 0.3 });
      this.r5 = TH.ring(el, { x: rx(4), y: Y + 66, r: 32, at: AT + 4 * EACH + 0.25, closeAt: 2.8 });
      this.pa = TH.path(el, [[X0, PY], ...[0, 1, 2, 3, 4].map(i => [cx(i), PY])], { times: [1.3, 1.6, 1.9, 2.2, 2.5, 2.8], tail: 0.35 });
      this.tag = tx('div', 'p3-gate-who', el, '오민석 팀장', { top: '946px', opacity: '0', fontSize: '34px', padding: '4px 20px' });
      this.tag.style.left = (cx(4) - this.tag.offsetWidth / 2).toFixed(1) + 'px';
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.q, lt, 0.5, { dx: -14 });
      this.sq.render(lt); this.r1.render(lt); this.r5.render(lt); this.pa.render(lt);
      const q = prog(lt, 3.0, 0.4, ease.outCubic);
      this.tag.style.opacity = q.toFixed(3);
      this.tag.style.transform = q < 1 ? `translateY(${((1 - q) * 18).toFixed(1)}px)` : 'none';
    },
  });

  // ── s09 L2 큰 숫자 ── 주황 「8」이 1부터 넘어가 멈추고, 오른쪽 열에 제목·정리 세 줄(연두 고리)·다음 질문
  DECK.slide({
    id: 'p3-ch05-s09', dur: 3.4, steps: [], notes: NOTES['p3-ch05-s09'],
    setup(el) {
      this.bg = TH.bg(el, 'accent');
      this.hd = TH.header(el, { chapter: 5, title: CH, fiction: true });
      this.bn = TH.bigNum(el, '8', { x: 110, top: 180, bottom: 970, unit: '곳', unitH: 150, at: 0.2 });
      const RX = Math.max(1040, Math.round(this.bn.right + 80));
      this.vr = tx('div', 'a p3-vrule', el, null, { left: (RX - 46) + 'px', top: '180px', height: '790px' });
      this.tt = TH.title(el, '승인 지점마다\n사람과 기록을 정합니다', { x: RX, y: 170, size: 72, exact: true, w: 1800 - RX, at: 0.5 });
      this.pt = TH.points(el, ['8곳: 요구사항부터 변경 요청까지', '지점마다 다른 승인자', '같은 승인 요약, 판정 세 가지'],
        { x: RX, y: 380, w: 1800 - RX, size: 40, gap: 36, mark: 'ring', at: 1.0, each: 0.2 });
      // 질문은 「열기 전에」를 한 줄에 두도록 줄을 직접 나눈다(문구는 원고 그대로)
      this.nq = TH.nextQ(el, { x: RX, bottom: 970, maxW: 1800 - RX, text: '공단 이름으로 서비스를\n열기 전에 무엇을 점검하는가', at: 2.3 });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.bn.render(lt);
      this.vr.style.transform = `scaleY(${prog(lt, 0.3, 0.9, ease.inOutSine).toFixed(4)})`;
      this.tt.render(lt); this.pt.render(lt); this.nq.render(lt, ctx);
    },
  });
})();
