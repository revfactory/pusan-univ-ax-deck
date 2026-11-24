/* 파트 3 · 7장 「시연: 여러 AI 도구로 안내 콘텐츠 만들기」(DEMO-4). 원고 plan/slides/p3-ch07.json, 배정표 plan/assets/p3_layout_ch07.md.
 * 테마 「주황 면」(deck/themes/p3.md). 색은 CSS 변수와 테마 부품으로만 쓴다. 연두는 s07 승인 항목 고리와 s08 승인 지점 고리에만 쓴다.
 * 레이아웃: s01 L0 · s02 L7 · s03 L3 · s04 L8 · s05 L12 · s06 L13 · s07 L1 · s08 L4 · s09 L9 · s10 L3(다음 질문).
 * 장마다 강조 한 곳(주황 면 또는 100px 이상의 글자)을 둔다. 장 제목은 72px(THEME.pageTitle).
 * 키 누름은 s03(다른 곳 두 군데를 연다)과 s06(강사가 때를 골라 영상을 튼다) 두 장에 한 번씩이다. 나머지 장은 키 없이 3.5초 안에 끝 상태가 된다.
 * 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다. */
(function () {
  'use strict';
  const { ease, prog, css, h, s } = REEL;
  const TH = window.THEME;
  const CH = '시연: 여러 AI 도구로 안내 콘텐츠 만들기';   // 머리말 챕터 제목
  DECK.config({ part: 'p3', chapter: 'ch07', title: CH });

  // 강사 메모: 원고의 notes 를 그대로 옮겼다
  const NOTES = /*NOTES*/{
    "p3-ch07-s01": "6장에서는 공단 이름으로 서비스를 열기 전에 점검할 항목을 봤습니다. 민원 안내 화면을 열면 민원인이 그 화면이 생겼다는 것을 알아야 합니다. 그 안내물을 만드는 데에도 AI 도구를 쓸 수 있는지가 7장의 질문입니다. 7장은 여러분이 따라 하는 실습이 아니라 강사 시연이므로 노트북은 잠시 두고 화면을 봐 주세요.",
    "p3-ch07-s02": "상담 창까지 여는 배포는 본부장 승인을 기다리고 있으므로, 먼저 알리는 것은 3장에서 만든 계산과 질문 검색 화면입니다. 이 민원 안내 화면을 열기 전에 민원인에게 알릴 안내물이 필요합니다. 한서윤 주임이 안내 포스터 한 장과 짧은 안내 영상 한 편을 맡았습니다. 3장에서 민원 안내 화면을 ChatGPT에 맡겨 만들었으니, 안내물도 AI 도구로 만들 수 있는지 묻습니다. 이번 시연에서는 미리 만든 포스터와 영상을 보고, 그 자리에서는 포스터 이미지 한 장만 다시 만듭니다. (화면에서 옮긴 문구: 「고객지원팀」, 「수강료 환불 계산」, 「주차 요금 계산」)",
    "p3-ch07-s03": "이 포스터는 AI 이미지 도구로 미리 만들었습니다. 왼쪽은 포스터에 넣으라고 요청한 글자입니다. 제목, 부제, 아래 띠의 「가상 기관 실습 자료」를 오른쪽 포스터와 한 글자씩 견줘 보고, 다른 곳을 찾은 분은 손을 들어 주세요. (키) 다른 곳은 두 군데입니다. 부제의 「요금을」이 「요금울」로 나왔고, 요청에 없던 마침표가 끝에 붙었습니다. 제목과 「가상 기관 실습 자료」는 요청과 같습니다. 이 포스터는 요청한 글자와 포스터의 글자를 대조하는 예로 씁니다. (강사 확인: 2026-11-24에 포스터 파일을 직접 열어 부제의 「요금울」과 끝 마침표를 확인했습니다. 포스터 파일을 바꾸면 이 메모를 다시 대조합니다.)",
    "p3-ch07-s04": "이번에는 그 자리에서 포스터 이미지 한 장을 만듭니다. 요청은 앞 화면의 포스터를 만들 때 보낸 문장 그대로이고, 그림 요청을 영어로 쓰고 넣을 한글만 그대로 적어서 영어로 되어 있습니다. 풀어 말하면 제목, 부제, 아래 띠의 글자를 정확히 넣고 사람, 얼굴, 로고, 실존 지명은 넣지 않는 세로 포스터입니다. 미리 만든 포스터는 파트 2 9장에서 본 Codex CLI의 이미지 생성 기능(codex-image)으로, ChatGPT 계정에 로그인해 만들었습니다. 지금은 여러분 계정에도 있는 ChatGPT Images로 보내므로, 요청 문구는 같고 도구는 다릅니다. 이미지는 생성에 몇 분 걸릴 수 있고, 결과가 나오면 다음 화면에서 요청한 글자와 대조합니다. (강사 확인: 화면에는 원문 일부만 실었으니, 대본 「포스터 요청」 상자 안의 전문을 한 글자도 바꾸지 않고 보냅니다. 생성이 오래 걸리면 기다리지 않고 미리 만든 포스터로 넘어가고, 결과를 미리 정해 두지 않습니다.)",
    "p3-ch07-s05": "방금 만든 포스터를 화면의 요청한 글자와 한 줄씩 대조합니다. 제목, 부제, 아래 띠의 「가상 기관 실습 자료」 순서로 읽겠습니다. 다른 글자를 찾은 분은 손을 들어 주세요. 같은 요청을 보내도 결과가 같다고 보장되지 않으므로, 앞 화면에서 「요금울」을 찾은 일을 생성물마다 합니다. 한 글자라도 다르면 공단 이름으로 내보내지 않고, 고쳐 다시 만들거나 글자 없는 그림 위에 글자를 따로 올립니다. (강사 확인: 생성이 끝나지 않았으면 앞 화면의 포스터로 같은 기준을 설명합니다.)",
    "p3-ch07-s06": "안내 영상은 만드는 데 몇 분이 걸리고 크레딧을 쓰므로 미리 만들어 두었습니다. 크레딧은 생성 서비스가 사용량을 세는 단위입니다. 이 강의 자료를 만들던 2026년 11월 24일, 영상 생성 서비스 Higgsfield로 이 10초 세로 영상 한 편을 만드는 데 70크레딧을 썼습니다. (키) 글자 없는 포스터 그림에서 출발해 수영장, 계산기, 자동차가 차례로 나타납니다. 영상에는 글자가 없습니다. 지금 보이는 포스터 글자는 슬라이드에서 영상 위에 따로 얹은 것이라 「요금을」이 요청대로 나옵니다. 안내 음성은 이번에 만들지 않았습니다.",
    "p3-ch07-s07": "파트 2에서는 답변 초안을 승인했고, AI 도구로 만든 그림과 영상에도 승인이 필요합니다. 첫째는 사실 확인으로, 기관명과 문구, 날짜, 링크를 원문과 대조합니다. 둘째는 초상과 저작권으로, 앞에서 본 포스터는 사람 얼굴과 로고를 넣지 않게 요청했고, 나온 포스터에도 없습니다. 셋째는 기관 명의로, 이 포스터는 가상 기관이라 「가상 기관 실습 자료」를 넣었고, 실제 업무라면 공단 이름으로 내보내도 되는지를 정해진 사람이 승인합니다. Sites 도움말도 게시 전에 권리 없는 제3자 콘텐츠가 없는지 확인하고 개인이나 기관을 사칭하지 말라고 안내합니다.",
    "p3-ch07-s08": "오늘 보고 있는 이 강의 자료도 에이전트 팀이 만들었습니다. 에이전트는 파트 1 3장에서 본 대로 도구를 쓰고 결과를 보고 다음 행동을 정하는 AI입니다. 강의 설계, 디자인과 그림, 영상, 원고를 역할마다 다른 에이전트가 맡았고, 일을 나누고 결과를 확인하는 에이전트도 따로 두었습니다. 앞에서 말한 대로 포스터는 codex-image로, 안내 영상은 영상 생성 서비스 Higgsfield로 만들었습니다. 설계와 디자인·그림 다음에 연두색 고리가 있습니다. 이 고리가 승인 지점, 사람이 정하는 자리이고, 작업은 여기서 사람의 승인을 받은 뒤에 이어졌습니다. 사람이 강의 구성, 디자인, 영상 예산을 승인한 뒤에 영상과 원고를 만들었습니다. 무엇을 언제 정했는지는 날짜별 결정 기록 파일에 남겼습니다. 다음 화면에서 그 가운데 예산과 범위를 봅니다.",
    "p3-ch07-s09": "이 강의 자료를 만들 때도 2026년 11월 24일 승인 지점에서 사람이 강의 구성, 디자인, 영상 예산을 정했습니다. 영상은 에이전트 팀이 두 안의 견적을 냈고, 사람이 미리 정해 둔 상한 안에서 몇 편을 어느 안으로 만들지 고른 뒤에 만들었습니다. 업무에서 AI 도구로 안내물을 만들 때도 몇 편을 만들지는 사람이 정합니다. 얼마까지 쓸지도 쓰기 전에 사람이 정합니다. 여러분 계정의 ChatGPT도 Work나 Codex의 포함 사용량을 다 쓴 뒤 계속 쓰면 가진 크레딧이 자동으로 쓰일 수 있습니다. 실습 규칙 5번이 크레딧 자동 사용을 막으라고 한 까닭이 이것입니다. (화면에서 옮긴 문구: 「AI가 안과 견적을 내면 사람이 고릅니다」)",
    "p3-ch07-s10": "오늘 본 도구 가운데 이미지는 여러분 계정의 ChatGPT Images로도 만들 수 있습니다(2026년 11월 기준 모든 플랜). Plus에서 이미지를 몇 장까지 만들 수 있는지는 공식 문서에 수치가 없고, 오늘 쓴 영상 도구는 여러분 계정에 없어 시연으로만 봤습니다. 업무에서 쓸 때도 파트 1 6장의 업무에서 지키는 네 가지는 같고, 만든 뒤에는 글자부터 대조합니다. 다음 8장에서는 한서윤 주임의 사례를 여러분 업무로 바꿉니다. 내 업무에서는 무엇부터 맡기고 어디에서 승인할 것인가를 표로 만들어 봅니다."
  }/*END*/;

  const tx = (tag, cls, parent, text, style) => { const e = h(tag, cls, parent); if (text != null) e.textContent = text; if (style) css(e, style); return e; };
  const HD = (el, fiction) => TH.header(el, { chapter: 7, title: CH, fiction });
  const SUB = '#E6E6E1';                                   // 어두운 바탕 위 보조 글자(--dim 보다 밝게)
  const POSTER = '../assets/img/p3/p3-demo-poster.jpg';    // 936×1664
  // 장 제목 아래 본문 한 줄(40px, y 246)
  const bodyLine = (el, text) => tx('div', 'a', el, text, { left: '120px', top: '246px', fontSize: '40px', lineHeight: '1.3', fontWeight: '500', color: SUB, whiteSpace: 'nowrap' });
  // 왼쪽부터 펼쳐지는 면(clip-path)
  const openL = (e, lt, at, dur = 0.6, r = 16) => { const p = prog(lt, at, dur, ease.outQuart); e.style.clipPath = p < 1 ? `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0 round ${r}px)` : 'none'; return p; };
  // 아래에서 올라오는 면(위쪽부터 가려져 있다가 드러난다)
  const riseUp = (e, lt, at, dur = 0.6, dy = 28) => {
    const p = prog(lt, at, dur, ease.outQuart);
    e.style.clipPath = p < 1 ? `inset(${((1 - p) * 100).toFixed(2)}% 0 0 0)` : 'none';
    e.style.transform = p < 1 ? `translateY(${((1 - p) * dy).toFixed(1)}px)` : 'none';
    return p;
  };
  const growX = (e, lt, at, dur = 0.5) => { e.style.transform = `scaleX(${prog(lt, at, dur, ease.outQuart).toFixed(4)})`; };
  // 둥근 사각형 테두리를 선 그리기로 긋는 SVG(부모 기준 x, y, w, h)
  const rrect = (x, y, w, hh, r) => `M ${x + r} ${y} H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r} V ${y + hh - r} Q ${x + w} ${y + hh} ${x + w - r} ${y + hh} H ${x + r} Q ${x} ${y + hh} ${x} ${y + hh - r} V ${y + r} Q ${x} ${y} ${x + r} ${y} Z`;
  const strokeBox = (parent, x, y, w, hh, { r = 20, color = 'var(--ink)', width = 2, left = 0, top = 0 } = {}) => {
    const svg = s('svg', { width: w + 8, height: hh + 8, viewBox: `-4 -4 ${w + 8} ${hh + 8}` }, parent);
    css(svg, { position: 'absolute', left: (left + x - 4) + 'px', top: (top + y - 4) + 'px', overflow: 'visible', pointerEvents: 'none' });
    const p = s('path', { d: rrect(0, 0, w, hh, r), fill: 'none', 'stroke-width': width, 'stroke-linejoin': 'round' }, svg);
    p.style.stroke = color;
    KIT.drawPrep(p);
    return { svg, p, draw: v => KIT.draw(p, v) };
  };
  // 주황 면 줄(검정 글자). 장의 강조 한 곳
  const orangeBar = (el, text, { x = 120, y, w = 1680, hh = 80, size = 44 }) => {
    const b = tx('div', 'a', el, null, { left: x + 'px', top: y + 'px', width: w + 'px', height: hh + 'px', boxSizing: 'border-box', padding: '0 44px', borderRadius: '16px',
      background: 'var(--p3-orange)', display: 'flex', alignItems: 'center', clipPath: 'inset(0 100% 0 0)' });
    const t = tx('div', '', b, text, { color: 'var(--p3-black)', fontFamily: 'var(--display)', fontWeight: '800', fontSize: size + 'px', lineHeight: '1.2', letterSpacing: '-0.01em', whiteSpace: 'nowrap' });
    if (t.offsetWidth > w - 88) console.warn(`[DECK] 주황 줄 글자가 넘친다(${t.offsetWidth}px): ${text}`);
    return { b, t };
  };

  // ── s01 L0 영상 띠 전환 ── 인트로 영상 p3-intro 를 좌우로 뒤집어 흑백으로 띠 위쪽에 깐다. 머리 줄 끝에 검정 칩 「강사 시연」
  DECK.slide({
    id: 'p3-ch07-s01', dur: 2.8, steps: [], notes: NOTES['p3-ch07-s01'],
    setup(el) {
      this.vt = TH.videoTitle(el, {
        kind: 'chapter', kicker: '파트 3 · 7장', flip: true, at: 0.45,
        title: '시연: 여러 AI 도구로\n안내 콘텐츠 만들기',
        sub: '서비스를 알리는 안내물을 만드는 데에도 AI 도구를 쓸 수 있는가',
        src: '../assets/video/p3/p3-intro.mp4', poster: '../assets/video/p3/p3-intro.jpg',
      });
      // 밝기는 인트로 장과 같게(챕터 전환의 기본값보다 어둡다)
      el.querySelector('.p3-vt-media').style.filter = 'grayscale(1) brightness(1.35) contrast(1.25)';
      const kick = el.querySelector('.p3-vt-kicker');
      this.chip = TH.chip(kick, '강사 시연', { at: 0.75 });
      css(this.chip.el, { position: 'relative', left: 'auto', top: 'auto', fontSize: '34px', fontWeight: '800', lineHeight: '1.2', padding: '8px 22px', marginLeft: '8px' });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); this.chip.light(0); this.chip.render(lt); },
  });

  // ── s02 L7 인물과 대사 ── 한서윤 주임의 고리(지름 280)와 대사 세 줄(160px 안팎). 아래 줄: 그린 화면 칸 → 흰 선 → 빈 칸 둘
  DECK.slide({
    id: 'p3-ch07-s02', dur: 3.0, steps: [], notes: NOTES['p3-ch07-s02'],
    setup(el) {
      this.bg = TH.bg(el, 'base'); this.hd = HD(el, true);
      // 큰 대사는 줄 사이를 좁힌다(이 장에만 적용. 제목 막대 위치를 재기 전에 넣는다)
      tx('style', '', el, 'section[data-slide="p3-ch07-s02"] .p3-quote .p3-title { line-height: 1.06; }');
      this.tt = TH.pageTitle(el, '한서윤 주임이 안내물 두 가지를 맡습니다');
      const D = 280, QX = 480, TOP = 258, ROW = 800;
      // 대사: 원고의 두 줄을 세 줄로 나눠 160px 안팎으로 키운다(문구는 그대로). 줄이 넷이 되면 크기를 줄여 다시 만든다
      let qt = null, who = null;
      for (const size of [168, 160, 152, 144, 136, 128]) {
        qt = TH.quote(el, { who: '한서윤', org: false, x: 120, y: 300, d: D, qx: QX, size, text: '포스터와 영상도\nAI 도구로\n만들 수 있을까요?', at: 0.3 });
        who = [...el.querySelectorAll('.p3-quote-who')].pop();
        if (qt.title.lines <= 3 && qt.el.offsetHeight <= ROW - TOP - 20) break;
        qt.el.remove(); who.remove();
      }
      this.qt = qt;
      // 대사 상자 위 끝은 장 제목 아래, 고리 묶음(고리와 이름)은 대사의 세로 가운데
      qt.el.style.top = TOP + 'px';
      const qMid = TOP + qt.title.el.offsetTop + qt.title.el.offsetHeight / 2;
      who.style.top = (qMid - who.offsetHeight / 2).toFixed(0) + 'px';
      css(qt.el.querySelector('.p3-quote-bar'), { top: (qt.title.el.offsetTop + 14) + 'px', height: (qt.title.el.offsetHeight - 28) + 'px' });
      // 아래 줄(y 800~976): 왼쪽 그린 화면 칸
      const RH = 176;
      this.scr = tx('div', 'a', el, null, { left: '120px', top: ROW + 'px', width: '620px', height: RH + 'px', boxSizing: 'border-box', borderRadius: '20px', background: 'var(--panel)',
        padding: '0 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' });
      this.sh = tx('div', '', this.scr, '민원 안내 화면', { fontSize: '34px', lineHeight: '1.3', fontWeight: '700', color: 'var(--p3-orange-text)' });
      this.st = tx('div', '', this.scr, '새별시설공단 민원 안내', { fontSize: '44px', lineHeight: '1.25', fontWeight: '800', color: 'var(--ink)', marginTop: '10px', whiteSpace: 'nowrap', letterSpacing: '-0.01em' });
      // 흰 선(x 740~860)
      this.ln = tx('div', 'a', el, null, { left: '740px', top: (ROW + RH / 2 - 1.5) + 'px', width: '120px', height: '3px', background: 'var(--ink)', transformOrigin: '0 50%', transform: 'scaleX(0)' });
      // 오른쪽 칸 둘: 아직 만들지 않은 안내물(그림 없음). 흰 2px 테두리를 긋고 이름을 놓는다
      this.cells = [['안내 포스터 한 장', 880], ['안내 영상 한 편', 1360]].map(([t, x], i) => {
        const box = strokeBox(el, x, ROW, 440, RH, { r: 20, width: 2 });
        const nm = tx('div', 'a', el, t, { left: x + 'px', top: ROW + 'px', width: '440px', height: RH + 'px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--display)', fontWeight: '800', fontSize: '52px', lineHeight: '1.15', letterSpacing: '-0.02em', color: 'var(--ink)', whiteSpace: 'nowrap' });
        return { box, nm, at: 2.1 + i * 0.15 };
      });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.qt.render(lt);
      openL(this.scr, lt, 1.6, 0.6, 20);
      TH.reveal(this.sh, lt, 1.75); TH.reveal(this.st, lt, 1.85);
      growX(this.ln, lt, 1.9, 0.35);
      this.cells.forEach(c => { c.box.draw(prog(lt, c.at, 0.5, ease.inOutCubic)); TH.reveal(c.nm, lt, c.at + 0.2, { dx: 0, dy: 14 }); });
    },
  });

  // ── s03 L3 좌우 대비(요청한 글자와 포스터) ── 키 한 번: 포스터 조각 위 두 곳씩 주황 테두리, 아래 주황 면 줄에 답
  const S3 = 2.3;
  // 오른쪽 밝은 면의 포스터 조각 셋(포스터 936×1664 의 px 범위, 면 폭 732 에 맞춰 키운다)
  //   A: 제목과 부제(그림 높이 17~35%), Z: 부제 줄 뒤쪽 「요금울 바로 계산하세요.」만 좁게 잘라 확대(약 1.46배, 「요금울」 글자 높이 약 67px),
  //   B: 아래 띠 「가상 기관 실습 자료」(글자 위아래만 남겨 낮게 자른다). Z 의 왼쪽 끝 x 405 는 「주차」의 마지막 획(x 403) 바로 뒤다
  const PW = 732, POSTER_W = 936, POSTER_H = 1664;
  const CROPS = [
    { x0: 0, x1: 936, y0: 0.17 * POSTER_H, y1: 0.35 * POSTER_H, top: 412, at: 1.35 },
    { x0: 405, x1: 905, y0: 440, y1: 532, top: 662, at: 1.5 },
    { x0: 0, x1: 936, y0: 1528, y1: 1612, top: 813, at: 1.65 },
  ];
  // 짚는 자리(포스터 px). 조각 A 는 원고 visual 의 비율 좌표(조각 A 기준)를 그대로 옮긴 값, 조각 Z 는 글자 둘레에 여백을 둔 값
  const AY = 0.17 * POSTER_H, AH = 0.18 * POSTER_H;
  const MARKS = [
    { crop: 0, x: 0.435 * POSTER_W, y: AY + 0.556 * AH, w: 0.155 * POSTER_W, h: 0.25 * AH, at: S3 },          // 「요금울」
    { crop: 1, x: 410, y: 454, w: 138, h: 62, at: S3 },
    { crop: 0, x: 0.925 * POSTER_W, y: AY + 0.556 * AH, w: 0.03 * POSTER_W, h: 0.25 * AH, at: S3 + 0.3 },     // 끝 마침표
    { crop: 1, x: 871, y: 454, w: 16, h: 62, at: S3 + 0.3 },                                                    // 마침표 x 875~882
  ];
  DECK.slide({
    id: 'p3-ch07-s03', dur: 3.6, steps: [S3], notes: NOTES['p3-ch07-s03'],
    setup(el) {
      this.bg = TH.bg(el, 'deep'); this.hd = HD(el, 'inline');
      this.tt = TH.pageTitle(el, '미리 만든 포스터, 요청과 같습니까?');
      this.body = bodyLine(el, '요청한 글자와 한 글자씩 견줘 보세요');
      this.sp = TH.split(el, { top: 300, bottom: 900, left: { label: '요청한 글자', tone: 'panel' }, right: { label: 'AI 이미지 도구로 미리 만든 포스터', tone: 'light' }, labelSize: 40, at: 0.3, rightAt: 1.1 });
      // 왼쪽 면: 세 항목(이름 34px 주황 글자, 요청한 글자 56px 800). 면 안 높이에 고르게 놓는다
      css(this.sp.left, { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' });
      this.groups = [['제목', '새별시설공단 민원 안내'], ['부제', '수강료 환불·주차 요금을 바로 계산하세요'], ['아래 띠', '가상 기관 실습 자료']].map(([k, v]) => {
        const b = tx('div', '', this.sp.left, null, { flex: 'none' });
        tx('div', '', b, k, { fontSize: '34px', lineHeight: '1.3', fontWeight: '700', color: 'var(--p3-orange-text)' });
        tx('div', '', b, v, { fontSize: '56px', lineHeight: '1.2', fontWeight: '800', color: 'var(--ink)', letterSpacing: '-0.02em', wordBreak: 'keep-all', marginTop: '4px' });
        return b;
      });
      // 오른쪽 밝은 면: 포스터 조각 셋(KIT.cover). 1px 테두리 #D8D8D2
      this.crops = CROPS.map(c => {
        const k = PW / (c.x1 - c.x0), ch = (c.y1 - c.y0) * k;
        const box = tx('div', 'a', el, null, { left: '1020px', top: c.top + 'px', width: PW + 'px', height: ch.toFixed(1) + 'px', overflow: 'hidden', borderRadius: '4px', outline: '1px solid #D8D8D2' });
        KIT.cover(box, POSTER, { inset: 'auto', left: (-c.x0 * k).toFixed(1) + 'px', top: (-c.y0 * k).toFixed(1) + 'px', width: (POSTER_W * k).toFixed(1) + 'px', height: (POSTER_H * k).toFixed(1) + 'px', objectFit: 'fill' });
        return { box, k, c, at: c.at };
      });
      // 짚는 표시: 조각 A 와 확대 조각 Z 위 주황 4px 테두리(키를 누른 뒤 같은 자리끼리 함께 그어진다)
      this.marks = MARKS.map(m => {
        const C = this.crops[m.crop], k = C.k;
        const sb = strokeBox(C.box, (m.x - C.c.x0) * k, (m.y - C.c.y0) * k, m.w * k, m.h * k, { r: m.crop ? 8 : 6, width: 4, color: 'var(--p3-orange)' });
        return { sb, at: m.at };
      });
      this.ans = orangeBar(el, '다른 곳 두 군데 · 요금을 → 요금울 · 계산하세요 → 계산하세요.(마침표가 더해짐)', { y: 910, hh: 80, size: 44 });
      if (this.ans.t.offsetWidth > 1680 - 88) this.ans.t.style.fontSize = '40px';
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.body, lt, 0.35);
      this.sp.render(lt);
      this.groups.forEach((g, i) => TH.reveal(g, lt, 0.6 + i * 0.12, { dx: -16 }));
      this.crops.forEach(c => riseUp(c.box, lt, c.at, 0.6, 30));
      this.marks.forEach(m => { m.sb.draw(prog(lt, m.at, 0.35, ease.inOutCubic)); m.sb.svg.style.opacity = lt >= m.at ? '1' : '0'; });
      openL(this.ans.b, lt, S3 + 0.5, 0.5, 16);
      TH.reveal(this.ans.t, lt, S3 + 0.62, { dx: -16 });
    },
  });

  // ── s04 L8 원문 인용(영어 요청) ── 밝은 종이에 영어 원문 일부(34px 고정폭). 「reads exactly …」 세 곳은 굵게, 아래 주황 4px 밑줄
  const REQ = [
    ['… a bold dark navy Korean headline that ', 0],
    ['reads exactly 새별시설공단 민원 안내', 1],
    [', and below it a smaller dark blue Korean subheading that ', 0],
    ['reads exactly 수강료 환불·주차 요금을 바로 계산하세요', 1],
    ['. … a small gray Korean footer that ', 0],
    ['reads exactly 가상 기관 실습 자료', 1],
    ['. No other text, no people, no faces, no logos, no real place names, tall vertical 9:16 portrait frame.', 0],
  ];
  const REQ_TEXT = '… a bold dark navy Korean headline that reads exactly 새별시설공단 민원 안내, and below it a smaller dark blue Korean subheading that reads exactly 수강료 환불·주차 요금을 바로 계산하세요. … a small gray Korean footer that reads exactly 가상 기관 실습 자료. No other text, no people, no faces, no logos, no real place names, tall vertical 9:16 portrait frame.';
  DECK.slide({
    id: 'p3-ch07-s04', dur: 3.4, steps: [], notes: NOTES['p3-ch07-s04'],
    setup(el) {
      this.bg = TH.bg(el, 'base'); this.hd = HD(el);
      this.tt = TH.pageTitle(el, '그 자리에서 포스터 한 장을 만듭니다');
      this.body = bodyLine(el, '미리 만든 포스터와 같은 요청을 넣습니다');
      const DY = 310;   // 종이 위 끝(본문 줄과 10px 띄운다. 원고 y 300)
      this.dc = TH.doc(el, { x: 120, y: DY, w: 1680, size: 34, mono: true, label: '요청 · 영어 원문 일부(전문은 강사 화면)', labelSize: 34, at: 0.5, lines: [REQ_TEXT] });
      // 줄 항목을 다시 짠다: 세 곳만 굵게(800). 글자는 원고 그대로다
      const row = this.dc.el.querySelector('.p3-doc-line');
      row.textContent = '';
      const bolds = [];
      REQ.forEach(([t, b]) => { if (b) bolds.push(tx('span', '', row, t, { fontWeight: '800' })); else row.appendChild(document.createTextNode(t)); });
      if (row.textContent !== REQ_TEXT) console.warn('[DECK] s04 영어 원문이 원고와 다르다');
      // 밑줄: 굵은 구간이 줄을 넘어가면 줄 조각마다 따로 긋는다(종이 기준 좌표)
      const db = this.dc.el.getBoundingClientRect(), z = (db.width / this.dc.el.offsetWidth) || 1;
      this.unders = bolds.flatMap((sp, k) => [...sp.getClientRects()].filter(r => r.width > 4).map((r, j) => ({
        u: tx('div', 'a', this.dc.el, null, { left: ((r.left - db.left) / z).toFixed(1) + 'px', top: ((r.bottom - db.top) / z - 1).toFixed(1) + 'px', width: (r.width / z).toFixed(1) + 'px', height: '4px',
          background: 'var(--p3-orange)', transformOrigin: '0 50%', transform: 'scaleX(0)' }),
        at: 1.3 + k * 0.12 + j * 0.16,
      })));
      // 종이 아래: 「풀어 말하면」 줄(오른쪽 끝에 강사 시연 화면 안내), 풀이 두 줄, 칸 둘
      const py = DY + this.dc.el.offsetHeight + 18;
      this.lab = tx('div', 'a', el, '풀어 말하면', { left: '120px', top: py + 'px', fontSize: '34px', lineHeight: '1.3', fontWeight: '700', color: 'var(--p3-orange-text)', whiteSpace: 'nowrap' });
      this.see = tx('div', 'a', el, '강사 시연 화면 · 볼 것: 요청한 글자가 그대로 나오는가', { right: '120px', top: py + 'px', fontSize: '34px', lineHeight: '1.3', fontWeight: '600', color: SUB, whiteSpace: 'nowrap' });
      this.plain = tx('div', 'a', el, '제목 새별시설공단 민원 안내, 부제 수강료 환불·주차 요금을 바로 계산하세요, 아래 띠 가상 기관 실습 자료를 정확히 넣고, 사람·얼굴·로고·실존 지명은 넣지 않는 세로 포스터',
        { left: '120px', top: (py + 54) + 'px', width: '1680px', fontSize: '40px', lineHeight: '54px', fontWeight: '500', color: 'var(--ink)', wordBreak: 'keep-all' });
      const CY = py + 54 + this.plain.offsetHeight + 14, CH3 = 84;
      if (CY + CH3 > 1004) console.warn(`[DECK] s04 칸 둘이 아래로 넘친다(${CY + CH3})`);
      // 칸 둘이 x 120~1800 을 고르게 나눈다(폭 828, 사이 24)
      this.cells = [
        { x: 120, w: 828, t: '지금 · ChatGPT Images', size: 36 },
        { x: 972, w: 828, t: '요청 문구는 같고 도구는 다릅니다', size: 40, hot: true },
      ].map((c, i) => {
        const b = tx('div', 'a', el, null, { left: c.x + 'px', top: CY + 'px', width: c.w + 'px', height: CH3 + 'px', boxSizing: 'border-box', borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', clipPath: 'inset(0 100% 0 0)',
          background: c.hot ? 'var(--p3-orange)' : 'transparent', border: c.hot ? '0' : '2px solid var(--ink)' });
        const t = tx('div', '', b, c.t, { fontFamily: 'var(--display)', fontWeight: '800', fontSize: c.size + 'px', lineHeight: '1.2', letterSpacing: '-0.02em', whiteSpace: 'nowrap',
          color: c.hot ? 'var(--p3-black)' : 'var(--ink)' });
        if (t.offsetWidth > c.w - 32) console.warn(`[DECK] s04 칸 글자가 넘친다(${t.offsetWidth}/${c.w}): ${c.t}`);
        return { b, t, at: 2.4 + i * 0.12 };
      });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.body, lt, 0.35);
      this.dc.render(lt);
      this.unders.forEach(o => { o.u.style.transform = `scaleX(${prog(lt, o.at, 0.3, ease.inOutCubic).toFixed(4)})`; });
      TH.reveal(this.lab, lt, 1.8); TH.reveal(this.see, lt, 1.85, { dx: 14 });
      TH.reveal(this.plain, lt, 1.9, { dx: 0, dy: 12, dur: 0.6 });
      this.cells.forEach(c => { openL(c.b, lt, c.at, 0.5, 16); TH.reveal(c.t, lt, c.at + 0.15, { dx: -12 }); });
    },
  });

  // ── s05 L12 확인 목록(대조할 세 줄) ── 점선 칸 셋은 비워 둔다(결과는 강사 화면에서 본다). 아래 주황 면 줄
  DECK.slide({
    id: 'p3-ch07-s05', dur: 2.8, steps: [], notes: NOTES['p3-ch07-s05'],
    setup(el) {
      this.bg = TH.bg(el, 'deep'); this.hd = HD(el, 'inline');
      this.tt = TH.pageTitle(el, '한 글자라도 다르면 그대로 쓰지 않습니다');
      this.body = bodyLine(el, '방금 만든 포스터를 요청과 대조합니다');
      this.tag = tx('div', 'a', el, '요청한 글자', { left: '120px', top: '312px', fontSize: '34px', lineHeight: '1.3', fontWeight: '700', color: SUB, whiteSpace: 'nowrap' });
      this.ck = TH.checklist(el, ['새별시설공단 민원 안내', '수강료 환불·주차 요금을 바로 계산하세요', '가상 기관 실습 자료'].map(text => ({ text, state: 'todo' })),
        { x: 120, y: 366, w: 1680, rowH: 166, size: 80, noteSide: 'below', at: 0.6, each: 0.18 });
      // 줄마다 글자 위에 이름(34px 주황 글자). 항목은 제목 서체 800
      ['제목', '부제', '아래 띠'].forEach((k, i) => {
        const r = this.ck.rows[i];
        const lab = tx('div', '', r.tx, k, { fontSize: '34px', lineHeight: '1.25', fontWeight: '700', color: 'var(--p3-orange-text)', marginBottom: '6px' });
        r.tx.insertBefore(lab, r.tt);
        css(r.tx, { marginLeft: '44px' });
        css(r.tt, { fontFamily: 'var(--display)', fontWeight: '800', letterSpacing: '-0.02em', lineHeight: '1.1', whiteSpace: 'nowrap' });
      });
      this.bar = orangeBar(el, '강사 시연 화면 · 볼 것: 요청한 글자와 다른 곳', { y: 884, hh: 80, size: 48 });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.body, lt, 0.35); TH.reveal(this.tag, lt, 0.5);
      this.ck.render(lt);
      openL(this.bar.b, lt, 1.8, 0.5, 16);
      TH.reveal(this.bar.t, lt, 1.95, { dx: -16 });
    },
  });

  // ── s06 L13 결과물 전시(세로 영상) ── 키 한 번: 강사가 때를 골라 영상을 처음부터 한 번 튼다. 키 전에는 첫 장면(poster)에 멈춰 있다
  const S6 = 2.3;
  DECK.slide({
    id: 'p3-ch07-s06', dur: 2.8, steps: [S6], notes: NOTES['p3-ch07-s06'],
    setup(el) {
      this.bg = TH.bg(el, 'deep'); this.hd = HD(el, 'inline');
      this.tt = TH.title(el, '안내 영상은\n미리 만든 것을\n틉니다', { x: 120, y: 200, size: 72, exact: true, w: 520, at: 0.2 });
      this.pt = TH.points(el, ['글자 없는 포스터 그림에서 출발한 10초 영상', '영상에는 글자가 없습니다', '글자는 슬라이드에서 따로 얹었습니다'],
        { x: 120, y: 530, w: 520, size: 42, gap: 30, mark: 'none', at: 0.9, each: 0.12 });
      // 오른쪽: 세로 영상(520×924). 반복하지 않고 한 번 재생한다
      this.ex = TH.exhibit(el, { x: 1280, y: 136, w: 520, h: 924, pad: 0, at: 0.4, focus: true,
        video: '../assets/video/p3/p3-demo-video.mp4', poster: '../assets/video/p3/p3-demo-video.jpg' });
      this.vid = this.ex.body.querySelector('video');
      if (this.vid) this.vid.loop = false;
      // 영상 위에 슬라이드가 얹는 포스터 글자(영상에는 글자가 없다)
      this.ov = tx('div', '', this.ex.body, null, { position: 'absolute', left: '36px', right: '36px', top: '60px', color: '#0B2545' });
      tx('div', '', this.ov, '새별시설공단 민원 안내', { fontFamily: 'var(--display)', fontWeight: '900', fontSize: '44px', lineHeight: '1.15', whiteSpace: 'nowrap' });
      tx('div', '', this.ov, '수강료 환불·주차 요금을 바로 계산하세요', { fontSize: '30px', fontWeight: '600', marginTop: '14px', lineHeight: '1.35', wordBreak: 'keep-all' });
      this.ft = tx('div', '', this.ex.body, '가상 기관 실습 자료', { position: 'absolute', left: '0', right: '0', bottom: '64px', textAlign: 'center', fontSize: '30px', fontWeight: '600', lineHeight: '1.3', color: '#3A3A36' });
      // 가운데 열: 수치 둘(200px 주황 글자)과 이름 줄, 제작 기록
      const stat = (y, num, unit, label) => {
        const b = tx('div', 'a', el, null, { left: '690px', top: y + 'px', width: '560px' });
        const n = tx('div', '', b, num, { fontFamily: 'var(--num)', fontWeight: '900', fontSize: '200px', lineHeight: '0.9', color: 'var(--p3-orange-text)', letterSpacing: '-0.03em', whiteSpace: 'nowrap' });
        if (unit) tx('span', '', n, unit, { fontFamily: 'var(--display)', fontSize: '84px', fontWeight: '800', color: 'var(--ink)', marginLeft: '12px', letterSpacing: '-0.02em' });
        tx('div', '', b, label, { fontSize: '40px', lineHeight: '1.3', fontWeight: '600', color: 'var(--ink)', marginTop: '16px', whiteSpace: 'nowrap' });
        return b;
      };
      this.s1 = stat(206, '10', '초', '세로 영상');
      this.s2 = stat(540, '70', null, '쓴 크레딧(생성 사용량 단위)');
      this.rec = tx('div', 'a', el, '2026-11-24 이 강의 자료 제작 기록', { left: '690px', top: '880px', fontSize: '34px', lineHeight: '1.3', fontWeight: '500', color: SUB, whiteSpace: 'nowrap' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.pt.render(lt); this.ex.render(lt, ctx);
      TH.reveal(this.ov, lt, 1.0, { dx: 0, dy: 12 });
      TH.reveal(this.ft, lt, 1.05, { dx: 0, dy: 10 });
      TH.reveal(this.s1, lt, 1.2, { dx: 0, dy: 40, dur: 0.55 });
      TH.reveal(this.s2, lt, 1.4, { dx: 0, dy: 40, dur: 0.55 });
      TH.reveal(this.rec, lt, 1.6, { dx: 0, dy: 10 });
      // 발표 모드: 키 전에는 첫 장면에 멈춰 두고, 키를 누르면 처음부터 한 번 재생한다(끝나면 마지막 장면에서 멈춘다)
      const v = this.vid;
      if (v && ctx.live) {
        if (lt <= S6 + 0.01) {
          if (!v.paused) v.pause();
          if (v.currentTime > 0.05) { try { v.currentTime = 0; } catch (e) { /* 메타데이터 전 */ } }
        } else if (v.paused && !v.ended) {
          const pr = v.play(); if (pr && pr.catch) pr.catch(() => null);
        }
      }
    },
  });

  // ── s07 L1 한 문장과 승인 항목 셋 ── 176px 문장 두 줄(「승인이」만 주황 글자), 아래 세 칸에 열린 연두 고리(닫지 않는다)
  DECK.slide({
    id: 'p3-ch07-s07', dur: 2.6, steps: [], notes: NOTES['p3-ch07-s07'],
    setup(el) {
      this.bg = TH.bg(el, 'deep'); this.hd = HD(el, 'inline');
      this.sm = TH.statement(el, '생성물에도\n승인이 필요합니다', { size: 176, cy: 372, em: ['승인이'], at: 0.3 });
      const Y = 650, H = 290, W = 536, G = 36, R = 32;
      this.cells = [['사실 확인', '글자·날짜·링크를 원문과 대조'], ['초상·저작권', '얼굴, 실존 로고를 넣지 않음'], ['기관 명의', '가상 기관임을 밝히는 문구']].map(([k, v], i) => {
        const x = 120 + i * (W + G), at = 1.2 + i * 0.15;
        const c = tx('div', 'a', el, null, { left: x + 'px', top: Y + 'px', width: W + 'px', height: H + 'px', borderRadius: '20px', background: 'var(--panel)', clipPath: 'inset(0 100% 0 0)' });
        const ring = TH.ring(el, { x: x + 44 + R, y: Y + 44 + R, r: R, width: 5, at: at + 0.2 });
        const nm = tx('div', 'a', el, k, { left: (x + 44 + 2 * R + 26) + 'px', fontFamily: 'var(--display)', fontWeight: '800', fontSize: '56px', lineHeight: '1.15', letterSpacing: '-0.02em', color: 'var(--ink)', whiteSpace: 'nowrap' });
        nm.style.top = (Y + 44 + R - nm.offsetHeight / 2).toFixed(0) + 'px';
        const ds = tx('div', 'a', el, v, { left: (x + 44) + 'px', top: (Y + 148) + 'px', width: (W - 88) + 'px', fontSize: '40px', lineHeight: '1.35', fontWeight: '500', color: 'var(--ink)', wordBreak: 'keep-all', textWrap: 'balance' });
        return { c, ring, nm, ds, at };
      });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.sm.render(lt);
      this.cells.forEach(o => {
        openL(o.c, lt, o.at, 0.6, 20);
        o.ring.render(lt);
        TH.reveal(o.nm, lt, o.at + 0.3, { dx: -14 });
        TH.reveal(o.ds, lt, o.at + 0.42, { dx: -14 });
      });
    },
  });

  // ── s08 L4 가로 순서(작업 넷과 승인 지점) ── 흰 점이 첫 칸 위에서 출발해 x 960(둘째·셋째 칸 사이)에서 멈추고, 세로선이 아래 연두 고리까지 내려가 고리가 닫힌다
  DECK.slide({
    id: 'p3-ch07-s08', dur: 3.0, steps: [], notes: NOTES['p3-ch07-s08'],
    setup(el) {
      this.bg = TH.bg(el, 'base'); this.hd = HD(el);
      this.tt = TH.pageTitle(el, '이 강의 자료도 에이전트 팀이 만들었습니다');
      this.body = bodyLine(el, '에이전트는 도구를 쓰고 결과를 보고 다음 행동을 정하는 AI입니다');
      this.sq = TH.sequence(el, ['설계', '디자인·그림', '영상', '원고'].map(label => ({ label })), { y: 380, h: 440, size: 60, numSize: 120, at: 0.4, each: 0.1 });
      const PY = 350, GY = 916, GR = 56;
      // 흰 선은 화면 폭 전체, 점은 x 960 에서 멈춘다(마지막 마디에는 가지 않는다)
      this.pa = TH.path(el, [[120, PY], [540, PY], [960, PY], [1800, PY]], { times: [1.0, 1.5, [2.0, 99], 100], baseAt: 0.4, tail: 0.35 });
      this.vl = tx('div', 'a', el, null, { left: '959px', top: (PY + 12) + 'px', width: '2px', height: (GY - GR - 10 - PY - 12) + 'px', background: 'rgba(247,247,245,.6)', transformOrigin: '50% 0', transform: 'scaleY(0)' });
      this.ring = TH.ring(el, { x: 960, y: GY, r: GR, width: 6, at: 1.8, closeAt: 2.4 });
      this.gl = tx('div', 'a', el, '승인 지점: 사람이 정함', { left: '1040px', fontSize: '48px', lineHeight: '1.2', fontWeight: '800', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.gl.style.top = (GY - this.gl.offsetHeight / 2).toFixed(0) + 'px';
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.body, lt, 0.35);
      this.sq.render(lt); this.pa.render(lt);
      this.vl.style.transform = `scaleY(${prog(lt, 2.0, 0.35, ease.inOutCubic).toFixed(4)})`;
      this.ring.render(lt);
      TH.reveal(this.gl, lt, 2.4, { dx: -16 });
    },
  });

  // ── s09 L9 카드 격자(둘) ── 「범위」 칸(면)과 「예산」 칸(주황 면). 낱말 160px, 설명 56px. 칸 아래 한 줄(40px)
  DECK.slide({
    id: 'p3-ch07-s09', dur: 2.4, steps: [], notes: NOTES['p3-ch07-s09'],
    setup(el) {
      this.bg = TH.bg(el, 'accent'); this.hd = HD(el);
      this.tt = TH.pageTitle(el, '업무에서도 예산과 범위는 사람이 정합니다');
      this.tr = TH.tileRow(el, [{ title: '범위', text: '몇 편을 만들 것인가' }, { title: '예산', text: '얼마까지 쓸 것인가', tone: 'orange' }],
        { y: 260, h: 600, titleSize: 160, textSize: 56, at: 0.5, each: 0.14 });
      // 낱말과 설명을 칸 안 세로 가운데에 둔다
      this.tr.tiles.forEach(t => {
        css(t.el, { justifyContent: 'center', padding: '40px 72px' });
        css(t.title, { marginTop: '0', minHeight: '0', lineHeight: '1.05', fontWeight: '900' });
        css(t.text, { marginTop: '28px', minHeight: '0', color: 'var(--ink)', fontWeight: '600', lineHeight: '1.3' });
      });
      this.ft = tx('div', 'a', el, '이 강의 자료의 영상: 견적 두 안 가운데 사람이 고름 · 2026-11-24', { left: '120px', top: '892px', fontSize: '40px', lineHeight: '1.3', fontWeight: '600', color: 'var(--ink)', whiteSpace: 'nowrap' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      this.tr.render(lt);
      this.tr.tiles.forEach((t, i) => { TH.reveal(t.title, lt, 0.75 + i * 0.14, { dx: 0, dy: 30 }); TH.reveal(t.text, lt, 0.9 + i * 0.14, { dx: -14 }); });
      TH.reveal(this.ft, lt, 1.6, { dx: 0, dy: 12 });
    },
  });

  // ── s10 L3 좌우 대비와 다음 질문 ── 왼쪽 밝은 면 「참가자 계정」, 오른쪽 면 「강사 시연」. 아래 「다음 질문」 주황 면(화면 폭)
  DECK.slide({
    id: 'p3-ch07-s10', dur: 3.0, steps: [], notes: NOTES['p3-ch07-s10'],
    setup(el) {
      this.bg = TH.bg(el, 'base'); this.hd = HD(el);
      this.tt = TH.pageTitle(el, '이미지는 참가자 계정으로도 만듭니다');
      // 다음 질문: 화면 폭 주황 면, 질문 60px, 머리 34px. 아래 끝 y 970
      this.nq = TH.nextQ(el, { x: 120, bottom: 970, w: 1680, maxW: 1680, size: 60, text: '내 업무에서는 무엇부터 맡기고 어디에서 승인할 것인가', at: 99 });
      css(this.nq.el.querySelector('.p3-card-label'), { fontSize: '34px' });
      const NT = 970 - this.nq.el.offsetHeight;
      this.nq.el.style.top = NT + 'px';
      this.sp = TH.split(el, { top: 260, bottom: NT - 30, left: { label: '참가자 계정', tone: 'light' }, right: { label: '강사 시연', tone: 'panel' }, labelSize: 40, at: 0.3, rightAt: 1.1 });
      // 큰 줄은 콜론 뒤에서 두 줄로 나눠 78px 로 둔다(문구는 그대로)
      const big = (parent, text, color) => tx('div', '', parent, text, { fontFamily: 'var(--display)', fontWeight: '800', fontSize: '78px', lineHeight: '1.12', letterSpacing: '-0.02em', color, whiteSpace: 'pre-line' });
      this.L1 = big(this.sp.left, 'ChatGPT Images:\n모든 플랜', '#141414');
      this.L2 = tx('div', '', this.sp.left, '만든 뒤에는 글자부터 대조합니다', { fontSize: '40px', lineHeight: '1.3', fontWeight: '600', color: '#141414', marginTop: '22px', whiteSpace: 'nowrap' });
      this.R1 = big(this.sp.right, '오늘 쓴 영상 도구:\n참가자 계정에 없음', 'var(--ink)');
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      this.sp.render(lt);
      TH.reveal(this.L1, lt, 0.6, { dx: -16 }); TH.reveal(this.L2, lt, 0.75, { dx: -16 });
      TH.reveal(this.R1, lt, 1.4, { dx: -16 });
      riseUp(this.nq.el, lt, 2.3, 0.6, 30);
    },
  });
})();
