/* 파트 3 · 3장 「실습: 민원 안내 화면 만들기」. 원고 plan/slides/p3-ch03.json, 배정표 plan/assets/p3_layout_ch03.md.
 * 테마 「주황 면」(deck/themes/p3.md). 색은 CSS 변수와 테마 부품으로만 쓴다. 주황 면은 한 장에 두 곳까지, 연두는 s06 「계획 승인」 고리에만 쓴다.
 * 레이아웃: s01 L0 · s02 L4 · s03 L12 · s04 L5 · s05 L6 · s06 L9 · s07 L4 · s07a L8 · s08 L12 · s08a L6 · s09 L10 · s10 L13 · s11 L3 · s11a L12 · s12 L1.
 * 실습 장의 구도: 화면 중심(s04), 요청문 중심(s05·s07a·s08a), 기대 결과 중심(s06·s08·s10).
 * 키 누름은 s09(목·실제 표의 셋째 열) 한 번뿐이다. 나머지 장은 키 없이 3.5초 안에 끝 상태가 된다.
 * 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다. */
(function () {
  'use strict';
  const { ease, prog, css, h, s } = REEL;
  const TH = window.THEME;
  DECK.config({ part: 'p3', chapter: 'ch03', title: '실습: 민원 안내 화면 만들기' });
  const CH = '실습: 민원 안내 화면 만들기';

  // 강사 메모: 원고의 notes 를 그대로 옮겼다
  const NOTES = {
    "p3-ch03-s01": "2장에서 정하준 대리가 민원인의 질문 한 건이 화면, 서버, AI 호출, 답변, 기록 저장을 차례로 지나는 경로를 그렸습니다. 이번 장에서는 그 가운데 어디까지를 개발자가 아닌 한서윤 주임이 ChatGPT Plus만으로 만들 수 있는지 여러분이 직접 해 봅니다. 만드는 것은 환불 금액과 주차 요금을 계산하고 근거 조문을 함께 보여 주는 민원 안내 화면입니다. 실습 묶음의 lab7 폴더와 lab7/단계.md를 열어 두세요.",
    "p3-ch03-s02": "한서윤 주임은 개발 경험이 없어서 화면을 코드로 짜지 않고, ChatGPT Work에 규정 파일 등 파일 4개와 화면 요청문을 넘깁니다. Work는 길고 여러 단계로 된 작업과 문서·사이트 같은 완성 결과물을 맡는 ChatGPT의 에이전트입니다. 한서윤 주임이 직접 하는 일은 두 가지입니다. Work가 먼저 보여 주는 계획을 읽고 승인하고, 열린 화면의 환불 금액이 파트 2 시험표의 기대 답과 같은지 확인합니다. 2장의 경로에 있던 다섯 가지 가운데 오늘 만드는 것은 맨 앞의 화면이고, 여러분도 같은 순서로 따라 합니다.",
    "p3-ch03-s03": "Sites는 ChatGPT에서 웹 화면을 말로 설명해 만들고 미리 보고 공유하는 기능이고, Codex는 파트 2 9장 시연에서 Codex CLI로 본 ChatGPT의 코딩용 기능입니다. 2026년 11월 기준으로 Work와 Sites 만들기는 Codex와 사용량 한도를 함께 씁니다. 한도를 다 쓰면 크레딧 구매 화면이 나오거나 가진 크레딧이 자동으로 쓰일 수 있습니다. 그때는 실습 규칙 5번대로 크레딧을 사지 않고, 2단계 뒤에 보여 드릴 대체 경로(Chat에서 HTML 파일로 받기)로 갑니다. 파트 1 2장에서 다룬 「모델 개선을 위한 데이터 학습 허용」이 켜져 있으면 Sites를 만들거나 고친 대화가 학습에 쓰일 수 있습니다. 설정 → 데이터 관리에서 상태를 확인하고, 끌지 말지는 여러분이 정합니다. 새 사이트는 비공개로 시작하고, 오늘은 6단계에서 공개 범위를 정하기만 합니다. 다른 사람을 넣거나 게시하지 않으며, 서로의 사이트 링크도 열어 보지 않습니다. (출처: 사이트 줄은 실습 규칙 4 · lab7 「시작 전에」)",
    "p3-ch03-s04": "ChatGPT 웹에서 「Work」를 고르고 새 대화를 엽니다. Plus는 웹에서 Work를 쓸 수 있고 따로 설치할 것은 없습니다. 입력창의 + 단추로 파일 4개를 첨부하는데, 규정 2개와 담당 부서 안내는 자료 폴더에, 자주묻는질문.md는 lab7 폴더에 있습니다. 메뉴와 단추 이름이 제 화면과 다르면 순서만 따라 주세요. Work가 보이지 않는 분은 lab7/단계.md의 「대체 경로」 1번부터 시작하고, 대체 경로는 잠시 뒤 「대체 경로」 화면에서 다시 보여 드립니다.",
    "p3-ch03-s05": "lab7 폴더의 화면_요청문.md를 메모장이나 텍스트 편집기로 열고, 「요청 1(기본 경로: Work에서 Sites로)」 아래 ```text 줄과 ``` 줄 사이를 모두 복사해 Work 입력창에 붙여 넣고 보냅니다. 화면에는 핵심 세 줄만 실었으니 화면을 보고 치지 말고 파일에서 전체를 복사합니다. 첫 줄의 @Sites와 website는 사이트를 만들라는 말이고, 둘째 줄은 만들기 전에 계획을 먼저 보여 달라는 요청, 마지막 줄은 게시를 내가 정한다는 조건입니다. 요청문 6번의 상담 창은 정해 둔 답만 보여 주게 했는데, 이렇게 겉모양만 있고 실제로는 동작하지 않는 시범 부분을 목(mock)이라고 부르고 4단계에서 구분표에 따로 적습니다. 계획이 나오지 않고 바로 만들기 시작하면 그대로 두고, 계획을 승인하는 장면은 다음 화면에서 제 화면으로 봅니다.",
    "p3-ch03-s06": "계획이 나오면 바로 승인하지 않고, 요청 1에 적은 화면 구성 6개와 값 6건을 직접 확인하겠다는 완료 기준이 계획에 다 있는지 먼저 읽습니다. 다 있으면 계획과 함께 나오는 승인 단추를 누르고, 빠진 것이 있으면 승인하지 않고 「○○가 계획에 없다. 넣어서 다시 보여 줘」의 ○○에 빠진 것을 적어 보냅니다. 승인 단추의 이름과 자리는 강의 전날 확인한 제 화면(강사 사전 확인 K-07)으로 보여 드립니다. 승인 단추가 보이지 않으면 같은 대화에 「계획을 승인한다. 이 계획대로 만들어 줘」를 보내고, 그래도 만들기가 시작되지 않으면 저에게 알리고 대체 경로로 갑니다. 미리보기가 열릴 때까지 걸리는 시간은 사람마다 다릅니다. 4장 시연의 요청에도 단계마다 사람의 승인을 받으라는 조건이 들어 있습니다. 다음 두 화면은 Work를 쓸 수 없는 분이 따라 할 대체 경로이니, Work로 하는 분은 건너뛰고 미리보기가 열리면 단계 3으로 갑니다. (강사 시연 화면: Work의 계획과 승인 단추를 보입니다)",
    "p3-ch03-s07": "Work가 보이지 않거나, Sites로 만들 수 없거나, 사용량 한도를 다 쓴 분은 이 대체 경로로 갑니다. Chat 새 대화에 같은 파일 4개를 첨부하고 화면_요청문.md의 「요청 1-파일」을 ```text 줄과 ``` 줄 사이만 복사해 보낸 뒤, 답변 끝의 내려받기 링크로 index.html을 받아 더블클릭합니다. 링크는 빨리 만료되므로 답이 나오면 바로 받고, Chat이 내려받기 링크를 주는지는 강의 전날 제가 확인합니다(K-07). 한국 계정에서 Sites가 되지 않으면 오늘은 이 경로가 기본 경로가 되고, 링크가 없을 때 할 일은 다음 화면에서 봅니다.",
    "p3-ch03-s07a": "내려받기 링크가 없으면 「index.html의 전체 코드를 코드 상자 하나로 보여 줘」를 보냅니다. 코드 상자의 복사 단추를 누르고 메모장이나 텍스트 편집기에 붙여 넣어 index.html로 저장하는데, macOS 텍스트 편집기는 먼저 「일반 텍스트」로 바꿔 둡니다. 그다음은 기본 경로의 3~5단계를 같은 방법으로 하고, 고친 파일은 다시 내려받습니다. 파일이 열리지 않거나 값이 계속 틀리면 lab7/완성본/index.html을 엽니다. 파트 2 1장에서 말한 codex로 강의 전(2026-11-23) 「요청 1-파일」을 한 번 돌려 만든 파일에서는 계산 11개와 검색 3개가 맞았습니다. Chat에서 같은 순서가 되는지는 강의 전날 제 화면으로 확인하고(K-07), 여러분 화면에서는 결과가 다를 수 있습니다. 이 경로의 파일은 링크로 공유하지 않고, 동료에게 보여 줄 때는 파일을 직접 건넵니다.",
    "p3-ch03-s08": "미리보기가 열리면 세 값을 직접 넣습니다. 요가 40,000원, 진행 2회는 남은 6회 몫 30,000원에서 위약금 4,000원을 뺀 26,000원이고 근거는 제7조 제1항 제2호입니다. 경차로 새별역 2시간 40분은 4,900원(1,000원 + 13 × 300원)의 50퍼센트인 2,450원, 「대관」 검색은 문화센터 운영팀(내선 2301)입니다. 제7조 제5항(10원 미만 버림)이 함께 붙거나 화면 모양이 달라도 값과 조문이 같으면 맞으니, 세 값이 맞으면 손을 들어 주세요. T01과 T06은 파트 2 5장에서 본 시험표(lab4/시험표.md)의 번호입니다. 강의 전 codex로 한 번 돌려 만든 완성본에서는 세 값이 모두 맞았지만 여러분의 화면은 다를 수 있고, 틀리면 「요청 2」의 빈칸 세 곳을 채워 같은 대화에 보냅니다.",
    "p3-ch03-s08a": "「요청 2」는 미리보기나 내려받은 파일에서 확인한 값이 기대 값과 다를 때 보냅니다. 화면_요청문.md의 「요청 2」를 ```text 줄과 ``` 줄 사이만 복사하고, 빈칸 세 곳(입력, 화면에 나온 값, 기대 값과 근거)을 채워 같은 대화에 보냅니다. 대체 경로라면 고친 파일을 다시 내려받습니다. 값이 계속 틀리면 lab7/완성본/index.html을 엽니다.",
    "p3-ch03-s09": "목은 영어 mock을 소리 나는 대로 적은 말로, 겉모양만 있고 실제로는 동작하지 않는 시범 부분을 가리킵니다. lab7 폴더의 목과_실제_구분표.md를 메모장이나 텍스트 편집기로 엽니다. 화면의 다섯 부분을 표의 「확인한 방법」대로 눌러 보아 결과가 따라 바뀌면 「실제로 동작한다」, 입력을 바꿔도 정해 둔 답만 나오면 「목이다」라고 적습니다. (키) 기대 결과는 환불 계산, 주차 계산, 질문 검색, 담당 부서 표가 실제로 동작하고, 「시범 화면: 정해 둔 답만 보여 줍니다」가 붙은 상담 창이 목입니다. 표 아래 「목인 부분을 실제로 동작하게 하려면 무엇이 더 필요한가」 칸에도 한 줄을 적어 같은 이름으로 저장합니다. 목인 부분을 동료에게 보여 줄 때는 「목」이라고 먼저 말합니다.",
    "p3-ch03-s10": "같은 대화에 화면_요청문.md의 「요청 3」을 ```text 줄과 ``` 줄 사이만 복사해 보냅니다. 근거 조문을 금액 바로 아래에 굵게 보이고, 결과 아래에 고객지원팀 내선 안내 문장을 넣는 두 가지를 고칩니다. 마지막 줄 「그 밖의 화면과 계산은 바꾸지 마」는 맞던 계산이 함께 바뀌지 않게 하는 문장이고, 그래서 바뀐 화면에서 요가 26,000원을 다시 확인합니다. 대체 경로로 하는 분은 고친 파일을 다시 내려받아 엽니다. 강의 전 codex로 같은 요청을 보낸 판에서는 근거 조문과 안내 문장이 이 자리에 들어갔고 금액은 그대로였지만, 여러분 화면에서는 배치가 다를 수 있습니다. (화면에서 지운 주석: 「강사 사전 실행 예: codex 1회(2026-11-23)」)",
    "p3-ch03-s11": "Sites의 「공유」를 눌러 공유 화면을 열고 공개 범위의 선택지를 봅니다. 선택지는 계정마다 다를 수 있어서, 강의 전날 Plus 개인 계정으로 확인한 제 화면(강사 사전 확인 K-07)으로 보여 드립니다. 시범 운영에 쓴다면 어느 범위로 열지 정해 구분표 아래 칸에 이유와 함께 한 줄로 적습니다. 인터넷 전체에 공개하는 범위를 골랐다면 누구나 사이트에 들어올 수 있다는 점을 이유에 넣습니다. 파트 2 10장에서 프로젝트 공유 범위를 정하기만 하고 링크를 열지 않은 것과 같이, 사람을 넣거나 게시하지 않고 공유 화면을 닫습니다. 사이트는 비공개 그대로 두고 필요 없으면 지우는데, 지우는 자리도 K-07에서 확인한 제 화면으로 보여 드립니다. 공유 화면이 보이지 않으면 미리보기까지만 하고 구분표에 적으면 되고, 먼저 끝난 분은 「요청 4」로 헬스 자유이용 환불과 시설 이용 확인 주차 요금을 확인합니다.",
    "p3-ch03-s11a": "API 키가 지급된 분은 선택 확장으로 2장에서 본 API 키를 사이트 설정의 비밀 값에 직접 넣고, lab7/단계.md 「선택 확장」의 문장으로 요청합니다. 키는 대화창에 붙여 넣지 않고, 요금은 2장에서 본 대로 Plus와 따로 청구됩니다. 선택 확장에서도 게시하지 않습니다. 미리보기에서 실제 답이 나오지 않으면 거기서 멈춥니다. (강사 확인: 사이트 안에서 AI 모델이 답하게 하는 기능은 공식 안내에 없습니다. 도움말에는 「사이트 구성에서 키를 추가하거나 제거하는 경우에는 여전히 게시가 필요합니다」라고 적혀 있고, 게시하지 않은 미리보기에서 새 키가 쓰이는지는 문서에 없어 K-07에서 확인합니다.) (화면에서 지운 기준 시점: 「2026년 11월 기준」)",
    "p3-ch03-s12": "한서윤 주임은 개발 경험 없이 계산과 질문 검색이 동작하는 화면까지 만들었고, 계획 승인과 값 확인은 직접 했습니다. 상담 창은 정해 둔 답만 보여 주는 목이고, 2장의 경로 다섯 가지 가운데 만든 것은 화면 하나입니다. 안내 화면에 서버와 AI 답변, 기록 저장을 더하는 일은 누가 하는지, 4장에서 강사가 에이전트 팀에 이 일을 맡기는 시연으로 봅니다."
  };

  const tx = (tag, cls, parent, text, style) => { const e = h(tag, cls, parent); if (text != null) e.textContent = text; if (style) css(e, style); return e; };
  const svgIcon = (body, size, sw = 2.2) => `<svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  const ICON = {
    doc: '<path d="M16 6h22l12 12v40H16z"/><path d="M38 6v12h12"/><path d="M23 32h20M23 41h20M23 50h12"/>',
    arrowUp: '<path d="M32 50V16"/><path d="M18 30l14-14 14 14"/>',
  };
  const HD = el => TH.header(el, { chapter: 3, title: CH, fiction: true });
  // 장 제목 72px(x 120, y 146). 한 줄에 들지 않으면 64px
  const pageTitle = (el, text, o) => {
    let t = TH.pageTitle(el, text, Object.assign({ w: 1680 }, o || {}));
    if (t.lines > 1) { t.el.remove(); t = TH.pageTitle(el, text, Object.assign({ w: 1680, size: 64 }, o || {})); }
    return t;
  };
  // 단계 칸 오른쪽 제목: 아래 끝을 단계 칸 아래 끝(y 330)에 맞춘다. 72px 한 줄이 안 되면 64px
  const stepTitle = (el, st, text, at = 0.3) => {
    const x = st.el.offsetLeft + st.el.offsetWidth + 56, w = 1800 - x;
    let t = null;
    for (const size of [72, 64]) {
      if (t) t.el.remove();
      t = TH.title(el, text, { x, y: 0, size, exact: true, at, w });
      if (t.lines === 1) break;
    }
    t.el.style.top = (st.el.offsetTop + st.el.offsetHeight - t.el.offsetHeight + 6).toFixed(0) + 'px';
    return t;
  };
  // 왼쪽부터 펼쳐지는 면
  const openL = (e, lt, at, dur = 0.6, r = 16) => { const p = prog(lt, at, dur, ease.outQuart); e.style.clipPath = p < 1 ? `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0 round ${r}px)` : 'none'; };
  // 화면 폭 주황 면 줄(검정 48px)
  const band = (el, text, y) => tx('div', 'a', el, text, {
    left: '120px', top: y + 'px', width: '1680px', boxSizing: 'border-box', padding: '14px 44px 16px', borderRadius: '16px',
    background: 'var(--p3-orange)', color: 'var(--p3-black)', fontFamily: 'var(--display)', fontWeight: '800', fontSize: '48px', lineHeight: '1.2', letterSpacing: '-0.01em', whiteSpace: 'nowrap' });
  // 꼬리표(34px 주황 글자 800)
  const kicker = (el, text, x, y) => tx('div', 'a', el, text, { left: x + 'px', top: y + 'px', fontSize: '34px', fontWeight: '800', lineHeight: '1.3', color: 'var(--p3-orange-text)', whiteSpace: 'nowrap' });
  // 「머리 낱말 · 나머지」 한 줄. 머리 낱말만 굵게(글자는 원고 그대로)
  const rich = (parent, cls, head, rest, style) => {
    const e = tx('div', cls, parent, null, Object.assign({ whiteSpace: 'nowrap', color: 'var(--ink)', lineHeight: '1.3' }, style));
    tx('b', '', e, head, { fontWeight: '800' });
    e.appendChild(document.createTextNode(' · ' + rest));
    return e;
  };
  // 왼쪽 열의 묶음: 이름표(34px 주황 글자 800)와 값(36px 600). inline 이면 한 줄로 잇는다
  const infoCol = (el, items, x, w, y0, gap = 18) => {
    let y = y0;
    return items.map(([k, v, inline]) => {
      const b = tx('div', 'a', el, null, { left: x + 'px', top: y + 'px', width: w + 'px', wordBreak: 'keep-all' });
      if (inline) {
        tx('span', '', b, k, { fontSize: '34px', fontWeight: '800', lineHeight: '1.3', color: 'var(--p3-orange-text)' });
        tx('span', '', b, v, { fontSize: '36px', fontWeight: '600', lineHeight: '1.3', color: 'var(--ink)' });
      } else {
        tx('div', '', b, k, { fontSize: '34px', fontWeight: '800', lineHeight: '1.3', color: 'var(--p3-orange-text)', marginBottom: '2px' });
        tx('div', '', b, v, { fontSize: '36px', fontWeight: '600', lineHeight: '1.3', color: 'var(--ink)' });
      }
      y += b.offsetHeight + gap;
      return b;
    });
  };
  // 원문 종이 다듬기: 줄 간격, 고정폭 줄, 「복사하지 않음」 꼬리표
  const docTune = (dc, o = {}) => {
    const p = dc.el, rows = [...p.querySelectorAll('.p3-doc-line')];
    if (o.pad) p.style.padding = o.pad;
    const lab = p.querySelector('.p3-doc-label');
    if (lab && o.labGap != null) css(lab, { paddingBottom: o.labGap + 'px', marginBottom: o.labGap + 'px' });
    rows.forEach(r => css(r, { lineHeight: String(o.lh ?? 1.3), marginTop: (o.mt ?? 6) + 'px' }));
    (o.mono || []).forEach(i => rows[i].classList.add('p3-mono'));
    (o.tags || []).forEach(i => tx('span', '', rows[i], '복사하지 않음', {
      position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--body)', fontSize: '30px', fontWeight: '600',
      lineHeight: '1.3', padding: '2px 16px', borderRadius: '8px', background: '#E2E2DC', color: '#5A5A55', whiteSpace: 'nowrap' }));
    return rows;
  };

  // ── s01 L0 영상 띠 전환 ── 전환 영상 p3-tr-path 를 좌우로 뒤집어(3장) 흑백으로 띠 위쪽에 깐다
  DECK.slide({
    id: 'p3-ch03-s01', dur: 2.5, steps: [], notes: NOTES['p3-ch03-s01'],
    setup(el) {
      this.vt = TH.videoTitle(el, {
        kind: 'chapter', flip: true, kicker: '파트 3 · 3장', title: CH, at: 0.4,
        sub: '개발자가 아닌 한서윤 주임이 이 가운데 어디까지 직접 만들 수 있는가',
        src: '../assets/video/p3/p3-tr-path.mp4', poster: '../assets/video/p3/p3-tr-path.jpg',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // ── s02 L4 가로 순서(오늘 만드는 것) ── 위: 한서윤 주임 → 넘기는 것 넷 → ChatGPT Work. 아래: 경로 다섯 칸 가운데 「화면」만 주황 면
  DECK.slide({
    id: 'p3-ch03-s02', dur: 2.9, steps: [], notes: NOTES['p3-ch03-s02'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = HD(el);
      this.tt = pageTitle(el, '한서윤 주임이 Work에 화면을 맡깁니다');
      this.sb = tx('div', 'a', el, '파일 4개와 화면 요청문을 넘기고 계획을 승인한 뒤 계산 값을 확인합니다',
        { left: '120px', top: '246px', fontSize: '40px', lineHeight: '1.3', color: 'var(--ink)', whiteSpace: 'nowrap' });
      // 위 줄: 인물 · 넘기는 것 넷(44px, 한 줄에 들지 않으면 2×2) · 화살표 · ChatGPT Work(60px)
      const RY = 330;
      this.boxes = ['규정 파일 2개', '담당 부서 안내', '자주 묻는 질문', '화면 요청문'].map(t => tx('div', 'a', el, t, {
        fontSize: '44px', lineHeight: '1.25', fontWeight: '700', color: 'var(--ink)', padding: '14px 22px', border: '3px solid var(--ink)',
        borderRadius: '14px', whiteSpace: 'nowrap', boxSizing: 'border-box' }));
      this.wk = tx('div', 'a', el, 'ChatGPT Work', { fontFamily: 'var(--display)', fontWeight: '800', fontSize: '60px', lineHeight: '1.15', letterSpacing: '-0.02em', color: 'var(--ink)',
        background: 'var(--panel)', padding: '30px 40px', borderRadius: '18px', whiteSpace: 'nowrap', border: '3px solid #3A3A3A' });
      const GAP = 14, wkW = this.wk.offsetWidth, wkH = this.wk.offsetHeight, wkX = 1800 - wkW;
      const bw = this.boxes.map(b => b.offsetWidth), bh = this.boxes[0].offsetHeight;
      const one = 120 + 340 + bw.reduce((a, b) => a + b, 0) + GAP * 3 + 120 <= wkX;
      const blockH = one ? Math.max(bh, wkH) : Math.max(bh * 2 + GAP, wkH);
      const CY = RY + blockH / 2;
      this.pe = TH.person(el, { who: '한서윤', x: 120, y: 0, at: 0.7, org: true, nameSize: 44 });
      css(this.pe.el, { top: (CY - this.pe.el.offsetHeight / 2) + 'px' });
      const X0 = 120 + this.pe.el.offsetWidth + 40;
      let right;
      if (one) {
        let x = X0;
        this.boxes.forEach((b, i) => { css(b, { left: x + 'px', top: (CY - bh / 2) + 'px' }); x += bw[i] + GAP; });
        right = x - GAP;
      } else {   // 한 줄에 들지 않으면 2×2
        const c1 = Math.max(bw[0], bw[2]), c2 = Math.max(bw[1], bw[3]);
        this.boxes.forEach((b, i) => { const c = i % 2, r = Math.floor(i / 2);
          css(b, { left: (X0 + (c ? c1 + GAP : 0)) + 'px', top: (CY - bh - GAP / 2 + r * (bh + GAP)) + 'px', width: (c ? c2 : c1) + 'px' }); });
        right = X0 + c1 + GAP + c2;
      }
      css(this.wk, { left: wkX + 'px', top: (CY - wkH / 2) + 'px' });
      const svg = s('svg', { width: 1920, height: 1080, viewBox: '0 0 1920 1080' }, el);
      css(svg, { position: 'absolute', left: '0', top: '0', overflow: 'visible', pointerEvents: 'none' });
      const L0 = right + 22, L1 = wkX - 22;   // 흰 선과 화살촉
      this.ln = s('path', { d: `M ${L0} ${CY} L ${L1} ${CY}`, fill: 'none', 'stroke-width': 5, 'stroke-linecap': 'round' }, svg);
      this.ah = s('path', { d: `M ${L1 - 22} ${CY - 18} L ${L1} ${CY} L ${L1 - 22} ${CY + 18}`, fill: 'none', 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
      [this.ln, this.ah].forEach(p => { p.style.stroke = 'var(--ink)'; });
      KIT.drawPrep(this.ln);
      // 아래: 경로 다섯 칸. 위 줄 아래로 내리고 y 970 에서 끝낸다
      const GT = RY + blockH + 40, SY = GT + 72, SH = 970 - SY;
      this.sq = TH.sequence(el, [{ label: '화면', tone: 'now' }, { label: '서버', tone: 'off' }, { label: 'AI 호출', tone: 'off' }, { label: '답변', tone: 'off' }, { label: '기록 저장', tone: 'off' }],
        { y: SY, h: SH, gap: 16, size: 52, numSize: 110, at: 1.8, each: 0.1, groups: [{ from: 0, to: 0, label: '오늘 만드는 것' }] });
      // 오늘 만드는 「화면」은 이름을 크게(이 장의 강조)
      css(this.sq.cells[0].c.querySelector('.p3-seq-label'), { fontSize: '96px', lineHeight: '1' });
      css(el.querySelector('.p3-seq-group'), { top: GT + 'px', height: '58px', fontSize: '40px', color: 'var(--ink)', borderBottom: '4px solid var(--ink)' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.sb, lt, 0.5);
      this.pe.render(lt);
      this.boxes.forEach((b, i) => TH.reveal(b, lt, 0.95 + i * 0.1, { dx: -14, dur: 0.4 }));
      KIT.draw(this.ln, prog(lt, 1.3, 0.35, ease.inOutCubic));
      this.ah.style.opacity = prog(lt, 1.6, 0.08).toFixed(3);
      openL(this.wk, lt, 1.5, 0.5, 14);
      this.sq.render(lt);
    },
  });

  // ── s03 L12 확인 목록(시작 전에) ── 세 줄(항목 60px, 보조 줄 34px 두 줄까지), 아래 주황 면 줄(실습 규칙 1)과 저장할 파일
  DECK.slide({
    id: 'p3-ch03-s03', dur: 3.0, steps: [], notes: NOTES['p3-ch03-s03'],
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = HD(el);
      this.tt = pageTitle(el, '시작 전에 세 가지를 확인합니다');
      this.tag = tx('div', 'a', el, '시작 전에', { right: '120px', top: '172px', fontSize: '34px', fontWeight: '800', lineHeight: '1.3', color: 'var(--p3-orange-text)', whiteSpace: 'nowrap' });
      this.ck = TH.checklist(el, [
        { text: '크레딧은 사지 않습니다', note: TH.keepWords('Work·Sites 만들기는 Codex와 같은 사용량을 씁니다 · 한도를 다 쓰면 Chat에서 HTML 파일로 받는 대체 경로로 갑니다', ['한도를 다 쓰면 Chat에서 HTML 파일로 받는 대체 경로로 갑니다']) },
        { text: '「모델 개선을 위한 데이터 학습 허용」을 확인합니다', note: '설정 → 데이터 관리 · 켜져 있으면 Sites를 만들고 고친 대화가 학습에 쓰일 수 있습니다' },
        { text: '사이트는 비공개로 둡니다', note: '6단계에서 공개 범위를 정하기만 합니다 · 다른 사람을 넣거나 게시하지 않습니다' },
      ], { y: 270, rowH: 196, size: 60, noteSide: 'below', at: 0.6, each: 0.18 });
      this.ck.rows.forEach(r => {
        css(r.tt, { fontFamily: 'var(--display)', fontWeight: '800', letterSpacing: '-0.02em', lineHeight: '1.2' });
        if (r.nt) css(r.nt, { lineHeight: '1.35', marginTop: '10px' });
      });
      this.bd = band(el, '실습 규칙 1 · 실습 묶음의 가상 자료만 입력합니다', 880);
      this.fl = tx('div', 'a p3-mono', el, '저장할 파일 · lab7/목과_실제_구분표.md', { left: '120px', top: '978px', fontSize: '34px', lineHeight: '1.3', color: 'var(--ink)', whiteSpace: 'nowrap' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.tag, lt, 0.3, { dx: 14 });
      this.ck.render(lt);
      openL(this.bd, lt, 1.8, 0.6);
      TH.reveal(this.fl, lt, 2.5, { dx: 0, dy: 10 });
    },
  });

  // ── s04 L5 화면 크게와 짚는 말 ── 그린 화면(1680×540): Work 단추와 입력창(파일 네 칸 2×2)만 크게. 주황 표시 → 흰 짚는 선 → 흰 이름표
  DECK.slide({
    id: 'p3-ch03-s04', dur: 3.3, steps: [], notes: NOTES['p3-ch03-s04'],
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = HD(el);
      this.st = TH.step(el, 1, 7, { x: 120, y: 158, at: 0.1 });
      this.tt = stepTitle(el, this.st, 'Work를 고르고 파일 4개를 첨부합니다');
      const FILES = ['새별_체육시설_이용규정.md', '새별_공영주차장_운영지침.md', '새별_담당부서_안내.md', '자주묻는질문.md'];
      this.chips = [];
      this.sh = TH.shot(el, null, { w: 1680, h: 540, x: 120, y: 360, at: 0.35, focus: true,
        marks: [{ pick: d => d.pill, grow: 8, at: 1.2 }, { pick: d => d.grid, grow: 12, at: 2.0 }],
        draw: alt => {
          const fr = KIT.frame(alt, 'browser', { url: 'chatgpt.com', style: { left: '0', top: '0', width: '100%', height: '100%', borderRadius: '0', border: '0' } });
          const pill = tx('div', 'p3-ui-pill', fr.body, null, { left: '24px', top: '26px', fontSize: '48px', padding: '10px 30px 10px 22px', gap: '14px' });
          h('i', '', pill); tx('span', '', pill, 'Work');
          const comp = tx('div', 'p3-ui-comp', fr.body, null, { left: '24px', bottom: '24px', gap: '12px' });
          const grid = tx('div', '', comp, null, { display: 'grid', gridTemplateColumns: 'auto auto', gap: '12px 10px', justifyContent: 'start' });
          FILES.forEach(f => {
            const c = tx('div', 'p3-ui-file', grid);
            const ic = h('span', '', c); css(ic, { display: 'block', width: '36px', height: '36px', color: 'var(--dim)' }); ic.innerHTML = svgIcon(ICON.doc, 36, 3);
            tx('span', '', c, f);
            this.chips.push(c);
          });
          const row = tx('div', '', comp, null, { display: 'flex', alignItems: 'center', justifyContent: 'space-between' });
          tx('div', 'p3-ui-plus', row, '+', { width: '72px', height: '72px', fontSize: '48px' });
          tx('div', 'p3-ui-send', row, null, { width: '72px', height: '72px' }).innerHTML = svgIcon(ICON.arrowUp, 40, 5);
          return { pill, grid };
        } });
      const P = TH.boxOf(this.sh.drawn.pill, el, 8), G = TH.boxOf(this.sh.drawn.grid, el, 12);
      const py = P.y + P.h / 2;
      this.c1 = TH.callout(el, { from: [P.x + P.w, py], x: P.x + P.w + 80, y: py - 32, head: '여는 곳', text: 'ChatGPT 웹 → 「Work」 → 새 대화', at: 1.35 });
      this.c2 = TH.callout(el, { from: [G.x + G.w, G.y + G.h / 2], x: G.x + G.w + 48, y: G.y - 6, head: '첨부할 파일 4개', mono: false,
        lines: ['자료/새별_체육시설_이용규정.md', '자료/새별_공영주차장_운영지침.md', '자료/새별_담당부서_안내.md', 'lab7/자주묻는질문.md'], at: 2.15 });
      this.ok = rich(el, 'a', '기대 결과', '입력창에 파일 4개가 붙는다', { left: '120px', top: '928px', fontSize: '36px', fontWeight: '600' });
      this.ng = rich(el, 'a', '막히면', 'Work가 보이지 않으면 대체 경로', { right: '120px', top: '928px', fontSize: '36px', fontWeight: '500', color: 'var(--dim)' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.st.render(lt); this.tt.render(lt); this.sh.render(lt, ctx);
      this.chips.forEach((c, i) => {
        const p = prog(lt, 1.0 + i * 0.12, 0.45, ease.outCubic);
        c.style.opacity = p.toFixed(3); c.style.transform = p < 1 ? `translateY(${((1 - p) * 16).toFixed(1)}px)` : 'none';
      });
      this.c1.render(lt); this.c2.render(lt);
      TH.reveal(this.ok, lt, 2.75, { dx: 0, dy: 10 });
      TH.reveal(this.ng, lt, 2.85, { dx: 0, dy: 10 });
    },
  });

  // ── s05 L6 단계 칸과 원문 ── 왼쪽 열: 단계 칸, 64px 제목 세 줄, 묶음 셋. 오른쪽: 「요청 1」 원문 종이(1160×740)
  DECK.slide({
    id: 'p3-ch03-s05', dur: 2.6, steps: [], notes: NOTES['p3-ch03-s05'],
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = HD(el);
      this.st = TH.step(el, 2, 7, { x: 120, y: 170, at: 0.1 });
      this.tt = TH.title(el, '「요청 1」을\n붙여 넣고\n보냅니다', { x: 120, y: 380, size: 64, exact: true, w: 480, at: 0.3 });
      this.info = infoCol(el, [['여는 프로그램', TH.keepWords('메모장(Windows) · 텍스트 편집기(macOS)', ['텍스트 편집기(macOS)'])], ['붙여 넣을 곳', 'Work 입력창 → 보내기'], ['기대 결과 · ', '계획이 먼저 나온다', true]], 120, 480, 630);
      this.dc = TH.doc(el, { x: 640, y: 170, w: 1160, h: 740, size: 40, labelSize: 34, label: 'lab7/화면_요청문.md · 「요청 1」', at: 0.35, each: 0.05, lines: [
        { text: '## 요청 1(기본 경로: Work에서 Sites로)', dim: true, size: 34 },
        { text: '```text', dim: true, size: 34 },
        '@Sites 첨부한 파일 4개로 「새별시설공단 민원 안내」 website를 만들어 줘. 새별시설공단은 실습용 가상 기관이다.',
        { text: '만들기 전에 계획을 먼저 보여 주고 내 승인을 받은 뒤 시작해.', mark: true },
        { text: '가운데 줄은 화면에서 뺐습니다 · 전체는 파일에서 복사합니다', dim: true, size: 34 },
        { text: '- 게시(공개)는 내가 정한다. 공개 범위를 바꾸거나 게시하기 전에 나에게 묻는다.', mark: true },
        { text: '```', dim: true, size: 34 },
      ] });
      docTune(this.dc, { pad: '32px 48px 32px 64px', labGap: 14, lh: 1.42, mt: 14, mono: [0, 1, 6], tags: [1, 6] });
      this.cp = tx('div', 'a', el, '```text 줄과 ``` 줄 사이를 모두 복사합니다', { left: '640px', top: '932px', fontSize: '36px', fontWeight: '700', lineHeight: '1.3', color: 'var(--ink)', whiteSpace: 'nowrap' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.st.render(lt); this.tt.render(lt); this.dc.render(lt);
      this.info.forEach((b, i) => TH.reveal(b, lt, 0.7 + i * 0.12));
      TH.reveal(this.cp, lt, 1.9, { dx: 0, dy: 10 });
    },
  });

  // ── s06 L9 카드 격자(찾을 것 여섯 칸)와 승인 열 ── 왼쪽 칸 여섯 개(357×250), 오른쪽 연두 고리가 닫히고 「계획 승인」
  DECK.slide({
    id: 'p3-ch03-s06', dur: 3.2, steps: [], notes: NOTES['p3-ch03-s06'],
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = HD(el);
      this.st = TH.step(el, 2, 7, { x: 120, y: 158, at: 0.1 });
      this.tt = stepTitle(el, this.st, '계획을 읽고 승인합니다');
      const NAMES = ['환불 계산', '주차 계산', '결과의 근거 조문', '질문 검색', '담당 부서 표', '상담 창'];
      this.rows = [0, 1].map(r => TH.tileRow(el, NAMES.slice(r * 3, r * 3 + 3).map((t, i) => ({ n: r * 3 + i + 1, title: t })),
        { x0: 120, x1: 1220, y: r ? 630 : 360, h: 250, gap: 14, titleSize: 44, at: 0.6 + r * 0.3, each: 0.1 }));
      this.rows.forEach(rw => rw.tiles.forEach(t => {
        css(t.el, { padding: '30px 30px 32px' });
        if (t.title) css(t.title, { lineHeight: '1.15', whiteSpace: 'nowrap', letterSpacing: '-0.03em' });
      }));
      this.g1 = tx('div', 'a', el, '계획에서 찾을 것 · 화면 구성 6개', { left: '120px', top: '894px', fontSize: '40px', fontWeight: '800', lineHeight: '1.2', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.g2 = tx('div', 'a', el, '완료 기준 · 값 6건을 직접 확인해 표로 보여 준다', { left: '120px', top: '950px', fontSize: '36px', fontWeight: '600', lineHeight: '1.3', color: 'var(--ink)', whiteSpace: 'nowrap' });
      // 승인 열(x 1300~1800)
      const RX = 1300, R = 76, RY = 360;
      this.rg = TH.ring(el, { x: RX + R, y: RY + R, r: R, width: 7, at: 1.8, closeAt: 2.25 });
      this.ap = tx('div', 'a', el, '계획 승인', { left: (RX + 2 * R + 32) + 'px', fontFamily: 'var(--display)', fontWeight: '800', fontSize: '56px', lineHeight: '1.15', color: 'var(--ink)', whiteSpace: 'nowrap', letterSpacing: '-0.02em' });
      this.ap.style.top = (RY + R - this.ap.offsetHeight / 2).toFixed(0) + 'px';
      this.an = rich(el, 'a', '다 있으면', TH.keepWords('계획과 함께 나오는 승인 단추를 누릅니다', ['승인 단추를']), { left: RX + 'px', top: (RY + 2 * R + 30) + 'px', width: '500px', whiteSpace: 'normal', wordBreak: 'keep-all', fontSize: '34px', lineHeight: '1.35' });
      this.sbox = tx('div', 'a', el, '○○가 계획에 없다. 넣어서 다시 보여 줘', { left: RX + 'px', width: '500px', boxSizing: 'border-box', padding: '18px 28px 20px', borderRadius: '14px',
        background: 'var(--p3-paper)', color: 'var(--p3-black)', fontSize: '40px', fontWeight: '700', lineHeight: '1.3', wordBreak: 'keep-all' });
      this.sbox.style.top = (880 - this.sbox.offsetHeight) + 'px';
      this.sl = tx('div', 'a', el, '빠졌을 때 보낼 문장', { left: RX + 'px', fontSize: '34px', fontWeight: '800', lineHeight: '1.3', color: 'var(--p3-orange-text)', whiteSpace: 'nowrap' });
      this.sl.style.top = (880 - this.sbox.offsetHeight - this.sl.offsetHeight - 10) + 'px';
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.st.render(lt); this.tt.render(lt);
      this.rows.forEach(r => r.render(lt));
      TH.reveal(this.g1, lt, 1.3, { dx: 0, dy: 10 });
      TH.reveal(this.g2, lt, 1.5, { dx: 0, dy: 10 });
      this.rg.render(lt);
      TH.reveal(this.ap, lt, 2.05, { dx: -16 });
      TH.reveal(this.an, lt, 2.2, { dx: 0, dy: 10 });
      TH.reveal(this.sl, lt, 2.6, { dx: 0, dy: 10 });
      openL(this.sbox, lt, 2.65, 0.5, 14);
    },
  });

  // ── s07 L4 가로 순서(대체 1~3) ── 칸 셋(549×430), 칸 위 묶음 이름, 아래 주황 면 줄
  DECK.slide({
    id: 'p3-ch03-s07', dur: 2.9, steps: [], notes: NOTES['p3-ch03-s07'],
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = HD(el);
      this.tt = pageTitle(el, 'Work가 안 되면 HTML 파일로 받습니다');
      this.kk = kicker(el, '대체 경로 · Chat에서 HTML 파일로', 120, 240);
      this.b1 = tx('div', 'a', el, 'Work가 보이지 않거나 Sites로 만들 수 없을 때', { left: '120px', top: '286px', fontSize: '40px', lineHeight: '1.3', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.b2 = tx('div', 'a', el, 'Work로 하는 분은 이 화면과 다음 화면을 건너뜁니다', { right: '120px', fontSize: '34px', lineHeight: '1.3', color: 'var(--dim)', whiteSpace: 'nowrap' });
      // 같은 줄에 들면 첫 줄과 바닥선을 맞추고, 들지 않으면 아래 줄(y 336). 아래 줄이어도 오른쪽 끝에 붙어 칸 위 묶음 이름(첫 칸 위)과 겹치지 않는다
      const same = 120 + this.b1.offsetWidth + 48 + this.b2.offsetWidth <= 1800;
      this.b2.style.top = (same ? 286 + this.b1.offsetHeight - this.b2.offsetHeight - 2 : 336) + 'px';
      this.sq = TH.sequence(el, [
        { label: TH.keepWords('Chat 새 대화에 같은 파일 4개 첨부', ['같은 파일 4개 첨부']) },
        { label: TH.keepWords('화면_요청문.md의 「요청 1-파일」 보내기', ['「요청 1-파일」 보내기']) },
        { label: '답변 끝 내려받기 링크로 index.html 받기 → 더블클릭' },
      ], { y: 420, h: 430, gap: 16, size: 44, numSize: 120, at: 0.7, each: 0.1, groups: [{ from: 0, to: 0, label: '대체 경로 1~3' }] });
      css(el.querySelector('.p3-seq-group'), { top: '358px', height: '56px', fontSize: '40px', color: 'var(--ink)', borderBottom: '4px solid var(--ink)' });
      this.bd = band(el, '링크는 빨리 만료됩니다. 답이 나오면 바로 받습니다', 874);
      this.nx = rich(el, 'a', '링크가 없으면', '다음 화면', { right: '120px', top: '976px', fontSize: '34px', fontWeight: '500' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.kk, lt, 0.4);
      TH.reveal(this.b1, lt, 0.5);
      TH.reveal(this.b2, lt, 0.6, { dx: 14 });
      this.sq.render(lt);
      openL(this.bd, lt, 1.6, 0.6);
      TH.reveal(this.nx, lt, 2.4, { dx: 0, dy: 10 });
    },
  });

  // ── s07a L8 원문 인용(보낼 문장) ── 밝은 종이에 보낼 문장 60px, 이름표 줄 오른쪽 주황 면 칸, 저장 순서 세 줄 60px
  DECK.slide({
    id: 'p3-ch03-s07a', dur: 2.6, steps: [], notes: NOTES['p3-ch03-s07a'],
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = HD(el);
      this.tt = pageTitle(el, '링크가 없으면 코드를 붙여 넣어 저장합니다');
      this.kk = kicker(el, '대체 경로 · 링크가 없을 때', 120, 244);
      this.dc = TH.doc(el, { x: 120, y: 302, w: 1680, size: 60, labelSize: 34, label: '보낼 문장', at: 0.5, each: 0.06, lines: [
        { text: 'index.html의 전체 코드를 코드 상자 하나로 보여 줘', mark: true },
      ] });
      const [ln] = docTune(this.dc, { pad: '22px 56px 28px 72px', labGap: 10, lh: 1.25, mt: 0 });
      css(ln, { fontFamily: 'var(--display)', fontWeight: '800', letterSpacing: '-0.02em' });
      const dBot = 302 + this.dc.el.offsetHeight;
      this.ob = tx('div', 'a', el, '이 경로는 링크로 공유하지 않습니다', { right: '120px', top: (dBot + 22) + 'px', padding: '12px 34px 14px', borderRadius: '14px',
        background: 'var(--p3-orange)', color: 'var(--p3-black)', fontFamily: 'var(--display)', fontWeight: '800', fontSize: '44px', lineHeight: '1.2', whiteSpace: 'nowrap' });
      this.ol = tx('div', 'a', el, '저장하는 순서', { left: '120px', fontSize: '40px', fontWeight: '800', lineHeight: '1.2', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.ol.style.top = (dBot + 22 + (this.ob.offsetHeight - this.ol.offsetHeight) / 2).toFixed(0) + 'px';
      const pY = dBot + 22 + this.ob.offsetHeight + 26;
      this.pt = TH.points(el, ['① 코드 상자의 복사 단추를 누릅니다', TH.keepWords('② 메모장(Windows) · 텍스트 편집기(macOS, 「일반 텍스트」로 바꾼 뒤)에 붙여 넣습니다', ['바꾼 뒤)에']), '③ index.html로 저장하고 더블클릭합니다'],
        { x: 120, y: pY, w: 1680, size: 60, gap: 28, mark: 'none', at: 1.5, each: 0.2 });
      // 줄 머리의 ①②③ 만 주황 글자로(글자는 원고 그대로)
      this.pt.rows.forEach(r => {
        css(r.tt, { fontFamily: 'var(--display)', fontWeight: '800', lineHeight: '1.2', letterSpacing: '-0.02em' });
        const t = r.tt.textContent; r.tt.textContent = '';
        const m = tx('span', '', r.tt, t.slice(0, 2), { color: 'var(--p3-orange-text)' });
        r.tt.appendChild(document.createTextNode(t.slice(2)));
        const ind = m.offsetWidth;   // 둘째 줄을 번호 뒤에 맞춘다
        css(r.tt, { paddingLeft: ind + 'px', textIndent: -ind + 'px' });
      });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.kk, lt, 0.4);
      this.dc.render(lt);
      TH.reveal(this.ol, lt, 1.2);
      openL(this.ob, lt, 1.2, 0.5, 14);
      this.pt.render(lt);
    },
  });

  // ── s08 L12 확인 목록(세 값) ── 넣어 볼 값 세 줄(56px)과 줄 오른쪽 끝 기대 값(96px 주황 글자). 기대 값은 처음부터 보인다
  DECK.slide({
    id: 'p3-ch03-s08', dur: 2.4, steps: [], notes: NOTES['p3-ch03-s08'],
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = HD(el);
      this.st = TH.step(el, 3, 7, { x: 120, y: 158, at: 0.1 });
      this.tt = stepTitle(el, this.st, '미리보기에 세 값을 직접 넣어 봅니다');
      this.ck = TH.checklist(el, [
        { text: '요가 · 수강료 40,000원 · 진행 2회', note: '체육시설 이용 규정 제7조 제1항 제2호 · 시험표 T01', value: '26,000원' },
        { text: '경차 · 새별역 공영주차장 · 2시간 40분', note: '시험표 T06', value: '2,450원' },
        { text: '자주 묻는 질문에서 「대관」 검색', note: '문화센터 운영팀', value: '내선 2301' },
      ], { y: 380, rowH: 170, size: 56, noteSide: 'below', box: 96, at: 0.6, each: 0.18 });
      this.ck.rows.forEach(r => {
        css(r.tt, { fontFamily: 'var(--display)', fontWeight: '800', letterSpacing: '-0.02em', lineHeight: '1.2', whiteSpace: 'nowrap' });
        if (r.nt) css(r.nt, { fontSize: '34px', lineHeight: '1.35', marginTop: '8px' });
        if (r.val) css(r.val, { fontFamily: 'var(--num)', fontSize: '96px', fontWeight: '900', lineHeight: '1', letterSpacing: '-0.02em', color: 'var(--p3-orange-text)' });
      });
      this.hn = tx('div', 'a', el, '세 값이 맞는지 확인합니다 · 틀리면 「요청 2」의 빈칸을 채워 보냅니다', { left: '120px', top: '908px', fontSize: '40px', fontWeight: '600', lineHeight: '1.3', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.src = tx('div', 'a p3-small', el, '완성본 · 세 값 모두 맞음', { left: '120px', top: '990px', whiteSpace: 'nowrap' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.st.render(lt); this.tt.render(lt); this.ck.render(lt);
      TH.reveal(this.hn, lt, 1.6, { dx: 0, dy: 10 });
      TH.reveal(this.src, lt, 1.9, { dx: 0, dy: 10 });
    },
  });

  // ── s08a L6 단계 칸과 원문(「요청 2」) ── 오른쪽 원문 종이에 다섯 줄을 모두 싣고, 빈칸 세 곳은 점선 밑줄 칸
  DECK.slide({
    id: 'p3-ch03-s08a', dur: 2.6, steps: [], notes: NOTES['p3-ch03-s08a'],
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = HD(el);
      this.st = TH.step(el, 3, 7, { x: 120, y: 170, at: 0.1 });
      this.tt = TH.title(el, '틀리면 「요청 2」의\n빈칸을 채워\n보냅니다', { x: 120, y: 376, size: 64, exact: true, w: 560, at: 0.3 });
      const iy = 376 + this.tt.el.offsetHeight + 30;
      this.info = infoCol(el, [['붙여 넣을 곳', '같은 대화'], ['대체 경로라면', '고친 파일을 다시 내려받습니다'], ['막히면', '값이 계속 틀리면 lab7/완성본/index.html']], 120, 540, iy, 16);
      { const v = this.info[2].lastChild; v.textContent = '값이 계속 틀리면 '; tx('span', '', v, 'lab7/완성본/index.html', { whiteSpace: 'nowrap' }); }
      this.dc = TH.doc(el, { x: 720, y: 170, w: 1080, size: 40, labelSize: 34, label: 'lab7/화면_요청문.md · 「요청 2」', at: 0.35, each: 0.05, lines: [
        { text: '## 요청 2(값이 틀렸을 때)', dim: true, size: 34 },
        { text: '```text', dim: true, size: 34 },
        '화면에서 확인한 값이 규정과 다르다. 아래 경우를 고쳐 줘. 고친 뒤 같은 값을 다시 계산해 표로 보여 줘.',
        '- 입력: ____',
        '- 화면에 나온 값: ____',
        '- 기대 값과 근거: ____',
        '다른 계산 결과는 바꾸지 마.',
        { text: '```', dim: true, size: 34 },
      ] });
      const rows = docTune(this.dc, { pad: '32px 48px 34px 64px', labGap: 14, lh: 1.42, mt: 16, mono: [0, 1, 7], tags: [1, 7] });
      // 빈칸 「____」: 글자는 그대로 두고 점선 밑줄 칸으로 보인다
      this.blanks = [3, 4, 5].map((i, k) => {
        const r = rows[i], t = r.textContent, j = t.indexOf('____');
        r.textContent = t.slice(0, j);
        const b = tx('span', '', r, '____', { display: 'inline-block', width: '380px', marginLeft: '10px', color: 'transparent', borderBottom: '4px dashed var(--p3-orange)', lineHeight: '1.1' });
        return { b, t: 1.1 + k * 0.12 };
      });
      this.cp = tx('div', 'a', el, '```text 줄과 ``` 줄 사이를 모두 복사합니다', { left: '720px', top: (170 + this.dc.el.offsetHeight + 26) + 'px', fontSize: '36px', fontWeight: '700', lineHeight: '1.3', color: 'var(--ink)', whiteSpace: 'nowrap' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.st.render(lt); this.tt.render(lt); this.dc.render(lt);
      this.blanks.forEach(({ b, t }) => { const p = prog(lt, t, 0.4, ease.outCubic); b.style.clipPath = p < 1 ? `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0)` : 'none'; });
      this.info.forEach((b, i) => TH.reveal(b, lt, 0.7 + i * 0.12));
      TH.reveal(this.cp, lt, 1.9, { dx: 0, dy: 10 });
    },
  });

  // ── s09 L10 표(목과 실제) ── 키 한 번: 셋째 열이 위에서 차례로 채워지고, 「상담 창」 줄의 「목이다」 칸이 아래에서 주황으로 차오른다
  const KEY9 = 2.0;
  DECK.slide({
    id: 'p3-ch03-s09', dur: KEY9 + 1.4, steps: [KEY9], notes: NOTES['p3-ch03-s09'],
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = HD(el);
      this.st = TH.step(el, 4, 7, { x: 120, y: 158, at: 0.1 });
      this.tt = stepTitle(el, this.st, '동작하는 부분과 목(mock)을 나눕니다');
      this.sb = tx('div', 'a', el, null, { left: '120px', top: '342px', fontSize: '36px', lineHeight: '1.3', color: 'var(--ink)', whiteSpace: 'nowrap' });
      tx('b', '', this.sb, '목(mock):', { fontWeight: '800' });
      this.sb.appendChild(document.createTextNode(' 겉모양만 있는 시범 부분 · 입력을 바꿔도 정해 둔 답만 나옵니다'));
      this.fn = tx('div', 'a p3-mono', el, 'lab7/목과_실제_구분표.md', { right: '120px', top: '348px', fontSize: '30px', lineHeight: '1.3', color: 'var(--dim)', whiteSpace: 'nowrap' });
      // 열 폭: 첫 열(화면 부분 48px)과 셋째 열(판정 48px, 머리 34px)을 글자 폭에 맞추고 남는 폭을 가운데 열에 준다
      const NAME = { fontFamily: 'var(--display)', fontSize: '48px', fontWeight: '800', letterSpacing: '-0.02em' };
      const meas = (t, st) => { const m = tx('span', '', el, t, Object.assign({ position: 'absolute', whiteSpace: 'nowrap', visibility: 'hidden' }, st)); const w = m.offsetWidth; m.remove(); return w; };
      const names = ['수강료 환불 계산', '주차 요금 계산', '자주 묻는 질문 검색', '담당 부서 안내', '상담 창'];
      const C1 = Math.ceil(Math.max(...names.map(t => meas(t, NAME)))) + 48;
      const C3 = Math.ceil(Math.max(meas('실제로 동작한다', NAME) + 40, meas('실제로 동작한다 / 목이다', { fontSize: '34px', fontWeight: '700' }))) + 8;
      const C2 = 1680 - C1 - C3, TY = 400, HH = 56;
      this.tb = TH.table(el, [
        [names[0], '진행 횟수를 바꿔 금액이 바뀌는지 본다', ''],
        [names[1], '주차 시간과 감면 대상을 바꿔 본다', ''],
        [names[2], '「대관」, 「정기권」, 결과가 없는 낱말(예: 「수영복」)을 넣어 본다', ''],
        [names[3], '표가 자료/새별_담당부서_안내.md와 같은지 본다', ''],
        [names[4], '예시에 없는 질문을 넣어 본다', ''],
      ], { x: 120, y: TY, cols: [C1, C2, C3], head: ['화면 부분', '확인한 방법', '실제로 동작한다 / 목이다'], headSize: 34, rowH: 96, size: 36, at: 0.7, each: 0.08 });
      // 「대관」 줄은 「결과가 없는 낱말…」을 한 덩어리로 둘째 줄에 둔다
      { const c = this.tb.rows[2].row.querySelectorAll('.p3-td')[1]; c.textContent = '';
        const w = tx('span', '', c, '「대관」, 「정기권」, '); tx('span', '', w, '결과가 없는 낱말(예: 「수영복」)을 넣어 본다', { whiteSpace: 'nowrap' }); }
      // 행 높이: 가운데 열이 두 줄이면 그 행만 높인다(최소 84)
      let yy = HH;
      this.rh = this.tb.rows.map(r => {
        const td = r.row.querySelectorAll('.p3-td');
        css(td[0], Object.assign({ lineHeight: '1.1', whiteSpace: 'nowrap' }, NAME));
        css(td[1], { fontSize: '38px', fontWeight: '500', lineHeight: '1.28', color: 'var(--ink)', width: (C2 - 64) + 'px' });   // 셋째 열과 40px 이상 띄운다. 넘치면 두 줄
        css(td[1], { height: 'auto' }); const h2 = td[1].offsetHeight; css(td[1], { height: '100%' });
        const H = Math.max(84, h2 + 24);
        css(r.row, { top: yy + 'px', height: H + 'px' }); r.y = yy; yy += H;
        return H;
      });
      this.tbBottom = TY + yy;
      // 셋째 열(키 뒤): 넷은 흰 글자, 「상담 창」 줄은 행 높이 전체를 쓰는 주황 칸
      const X3 = C1 + C2;
      this.ans = this.tb.rows.map((r, i) => {
        const t = KEY9 + 0.1 + i * 0.12, H = this.rh[i];
        if (i < 4) return { e: tx('div', 'a', r.row, '실제로 동작한다', Object.assign({ left: X3 + 'px', top: '0', height: H + 'px', display: 'flex', alignItems: 'center', color: 'var(--ink)', whiteSpace: 'nowrap' }, NAME)), t };
        const box = tx('div', 'a', r.row, null, { left: (X3 - 16) + 'px', top: '0', width: (C3 + 16) + 'px', height: H + 'px' });
        const fill = tx('div', 'a', box, null, { left: '0', top: '0', width: '100%', height: '100%', borderRadius: '10px', background: 'var(--p3-orange)', transformOrigin: '50% 100%', transform: 'scaleY(0)' });
        const lab = tx('div', 'a', box, '목이다', Object.assign({ left: '16px', top: '0', height: '100%', display: 'flex', alignItems: 'center', color: 'var(--p3-black)', whiteSpace: 'nowrap' }, NAME));
        return { fill, lab, t };
      });
      const BY = Math.max(this.tbBottom + 18, 950);
      this.mk = tx('div', 'a', el, '시범 화면: 정해 둔 답만 보여 줍니다', { right: '120px', top: BY + 'px', fontSize: '34px', fontWeight: '600', lineHeight: '1.3', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.q = tx('div', 'a', el, '목인 부분을 실제로 동작하게 하려면 무엇이 더 필요한가(한 줄): ____', { left: '120px', top: BY + 'px', fontSize: '34px', lineHeight: '1.3', color: 'var(--ink)', whiteSpace: 'nowrap' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.st.render(lt); this.tt.render(lt);
      TH.reveal(this.sb, lt, 0.5); TH.reveal(this.fn, lt, 0.55, { dx: 14 });
      this.tb.render(lt);
      TH.reveal(this.q, lt, 1.4, { dx: 0, dy: 10 });
      this.ans.forEach(a => {
        if (a.e) { TH.reveal(a.e, lt, a.t, { dx: -14, dur: 0.35 }); return; }
        a.fill.style.transform = `scaleY(${prog(lt, a.t, 0.45, ease.outQuart).toFixed(4)})`;
        TH.reveal(a.lab, lt, a.t + 0.3, { dx: 0, dy: 12, dur: 0.35 });
      });
      TH.reveal(this.mk, lt, KEY9 + 1.0, { dx: 0, dy: 10, dur: 0.4 });
    },
  });

  // ── s10 L13 결과물 전시 ── 왼쪽 「요청 3」 종이, 오른쪽 그린 결과 화면(밝은 면): 140px 금액, 고친 두 곳에 주황 막대
  DECK.slide({
    id: 'p3-ch03-s10', dur: 3.0, steps: [], notes: NOTES['p3-ch03-s10'],
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = HD(el);
      this.st = TH.step(el, 5, 7, { x: 120, y: 158, at: 0.1 });
      this.tt = stepTitle(el, this.st, '「요청 3」으로 한 번 고칩니다');
      const Y = 360, H = 562, EX = 800;
      this.dc = TH.doc(el, { x: 120, y: Y, w: 640, h: H, size: 34, labelSize: 34, label: '보낼 곳 · 같은 대화', at: 0.5, each: 0.05, lines: [
        '두 가지를 고쳐 줘.',
        { text: '1. 계산 결과에서 근거 조문을 금액 바로 아래에 굵게 보여 줘.', mark: true },
        { text: '2. 계산 결과 아래에 「이 금액은 안내용입니다. 신청 전 고객지원팀(체육시설 내선 2101, 주차 내선 2201)에 확인해 주세요.」를 넣어 줘.', mark: true },
        '그 밖의 화면과 계산은 바꾸지 마.',
      ] });
      const rows = docTune(this.dc, { pad: '26px 34px 28px 58px', labGap: 10, lh: 1.36, mt: 10 });
      rows.forEach(r => css(r, { fontWeight: '500' }));
      // 꼬리표는 결과 화면 아래 오른쪽 끝에 둔다(결과 화면 위 y 320 은 단계 칸 옆 제목과 겹친다)
      this.tag = tx('div', 'a p3-small', el, '완성본 화면', { right: '120px', top: (Y + H + 22) + 'px', whiteSpace: 'nowrap' });
      const R = {};
      this.ex = TH.exhibit(el, { x: EX, y: Y, w: 1000, h: H, pad: 12, at: 1.3, focus: true, draw: box => {
        css(box, { background: 'var(--p3-paper)' });
        const c = tx('div', 'a', box, null, { left: '44px', right: '40px', top: '26px', color: '#141414' });
        R.k = tx('div', '', c, '예상 환불 금액', { fontSize: '36px', fontWeight: '600', lineHeight: '1.3', color: '#5A5A55' });
        R.amt = tx('div', '', c, '26,000원', { fontFamily: 'var(--num)', fontWeight: '900', fontSize: '140px', lineHeight: '1', letterSpacing: '-0.02em', marginTop: '4px' });
        const fixed = (t, st, tail) => { const e = tx('div', '', c, t, Object.assign({ position: 'relative', paddingLeft: '28px', wordBreak: 'keep-all' }, st));
          if (tail) tx('span', '', e, tail, { whiteSpace: 'nowrap' });
          const b = tx('i', '', e, null, { position: 'absolute', left: '0', top: '6px', bottom: '6px', width: '9px', borderRadius: '2px', background: 'var(--p3-orange)', transformOrigin: '50% 0', transform: 'scaleY(0)' });
          return { e, b }; };
        R.law = fixed('근거 · 새별시설공단 체육시설 이용 규정 제7조 제1항 ', { fontSize: '34px', fontWeight: '700', lineHeight: '1.3', marginTop: '16px' }, '제2호·제5항');
        R.fm = tx('div', 'p3-mono', c, '40,000원 × (8회 − 2회) ÷ 8회 − 위약금 4,000원 = 26,000원 → 10원 미만 버림', { fontSize: '30px', lineHeight: '1.35', marginTop: '12px', paddingLeft: '28px', color: '#3A3A36', wordBreak: 'keep-all' });
        R.note = fixed('이 금액은 안내용입니다. 신청 전 고객지원팀(체육시설 내선 2101, 주차 내선 2201)에 확인해 주세요.', { fontSize: '34px', fontWeight: '500', lineHeight: '1.3', marginTop: '16px' });
        return null;
      } });
      this.R = R;
      this.re = rich(el, 'a', '다시 확인할 값', '요가 · 40,000원 · 진행 2회 → 26,000원', { left: '120px', top: (Y + H + 16) + 'px', fontSize: '36px', fontWeight: '600' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.st.render(lt); this.tt.render(lt); this.dc.render(lt);
      TH.reveal(this.tag, lt, 2.7, { dx: 0, dy: 10 });
      this.ex.render(lt, ctx);
      const R = this.R;
      TH.reveal(R.k, lt, 1.5, { dx: 0, dy: 10 });
      TH.reveal(R.amt, lt, 1.6, { dx: 0, dy: 40, dur: 0.55 });
      TH.reveal(R.law.e, lt, 1.85); TH.reveal(R.fm, lt, 1.95); TH.reveal(R.note.e, lt, 2.05);
      R.law.b.style.transform = `scaleY(${prog(lt, 2.1, 0.35, ease.outQuart).toFixed(4)})`;
      R.note.b.style.transform = `scaleY(${prog(lt, 2.3, 0.35, ease.outQuart).toFixed(4)})`;
      TH.reveal(this.re, lt, 2.6, { dx: 0, dy: 10 });
    },
  });

  // ── s11 L3 좌우 대비(볼 것과 하지 않는 것) ── 왼쪽 면: 공개 범위의 선택지(88px), 오른쪽 주황 면: 하지 않는 것 셋(72px)과 그려지는 ✕ 표시
  DECK.slide({
    id: 'p3-ch03-s11', dur: 2.9, steps: [], notes: NOTES['p3-ch03-s11'],
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = HD(el);
      this.st = TH.step(el, 6, 7, { x: 120, y: 158, at: 0.1 });
      this.tt = stepTitle(el, this.st, '공개 범위를 정하고 게시하지 않습니다');
      this.sp = TH.split(el, { top: 360, bottom: 900, x0: 120, x1: 1800, x: 1150, gap: 24, labelSize: 40,
        left: { label: '공유 화면에서 볼 것', tone: 'panel' }, right: { label: '하지 않는 것', tone: 'orange' }, at: 0.6, rightAt: 1.4 });
      const L = this.sp.left;
      this.big = tx('div', '', L, '공개 범위의 선택지', { fontFamily: 'var(--display)', fontWeight: '900', fontSize: '88px', lineHeight: '1.05', letterSpacing: '-0.03em', whiteSpace: 'nowrap', color: 'var(--ink)', marginTop: '6px' });
      this.d1 = tx('div', '', L, '인터넷 전체에 공개하면 누구나 사이트에 들어올 수 있다', { fontSize: '36px', lineHeight: '1.35', marginTop: '22px', fontWeight: '500', color: 'var(--ink)', wordBreak: 'keep-all' });
      const bt = tx('div', 'a', L, null, { left: '0', right: '0', bottom: '0', borderTop: '2px solid #3A3A3A', paddingTop: '16px' });
      this.w1 = rich(bt, '', '적을 곳', 'lab7/목과_실제_구분표.md 아래 칸', { fontSize: '34px', lineHeight: '1.35', color: 'var(--dim)', whiteSpace: 'normal' });
      this.w2 = tx('div', '', bt, TH.keepWords('시범 운영에 쓴다면 공개 범위(공유 화면의 선택지 가운데 하나)와 그 이유(한 줄): ____', ['그 이유(한 줄):']), { fontSize: '34px', lineHeight: '1.35', marginTop: '6px', color: 'var(--ink)', wordBreak: 'keep-all' });
      const Rb = this.sp.right;
      this.no = ['사람 넣기', '게시', '링크 열어 보기'].map((t, i) => {
        const row = tx('div', '', Rb, null, { display: 'flex', alignItems: 'center', gap: '24px', marginTop: i ? '44px' : '30px' });
        const ic = tx('div', '', row, null, { flex: 'none', width: '56px', height: '56px' });
        const svg = s('svg', { width: 56, height: 56, viewBox: '0 0 56 56' }, ic);
        const ps = ['M 9 9 L 47 47', 'M 47 9 L 9 47'].map(d => { const p = s('path', { d, fill: 'none', 'stroke-width': 9, 'stroke-linecap': 'round' }, svg); p.style.stroke = 'var(--p3-black)'; KIT.drawPrep(p); return p; });
        tx('div', '', row, t, { fontFamily: 'var(--display)', fontWeight: '800', fontSize: '72px', lineHeight: '1.15', letterSpacing: '-0.02em', color: 'var(--p3-black)', whiteSpace: 'nowrap' });
        return { row, ps, t: 1.85 + i * 0.15 };
      });
      this.s7 = rich(el, 'a', '단계 7', '사이트는 비공개 그대로 둡니다. 필요 없으면 지웁니다', { left: '120px', top: '926px', fontSize: '36px', fontWeight: '600' });
      this.r4 = tx('div', 'a', el, '먼저 끝났으면 「요청 4」', { right: '120px', top: '928px', fontSize: '34px', lineHeight: '1.3', color: 'var(--dim)', whiteSpace: 'nowrap' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.st.render(lt); this.tt.render(lt); this.sp.render(lt);
      TH.reveal(this.big, lt, 0.95, { dx: 0, dy: 20 });
      TH.reveal(this.d1, lt, 1.1, { dx: 0, dy: 12 });
      TH.reveal(this.w1, lt, 1.2); TH.reveal(this.w2, lt, 1.3);
      this.no.forEach(n => {
        TH.reveal(n.row, lt, n.t, { dx: -16, dur: 0.4 });
        n.ps.forEach((p, k) => KIT.draw(p, prog(lt, n.t + 0.2 + k * 0.12, 0.22, ease.outCubic)));
      });
      TH.reveal(this.s7, lt, 2.4, { dx: 0, dy: 10 });
      TH.reveal(this.r4, lt, 2.5, { dx: 0, dy: 10 });
    },
  });

  // ── s11a L12 확인 목록(선택 확장) ── 네 줄(60px), 아래 주황 면 결론 줄
  DECK.slide({
    id: 'p3-ch03-s11a', dur: 2.4, steps: [], notes: NOTES['p3-ch03-s11a'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = HD(el);
      this.tt = pageTitle(el, '선택 확장 · API 키가 지급된 경우에만');
      this.ck = TH.checklist(el, [
        { text: '사이트 설정의 비밀 값에 API 키를 직접 넣습니다' },
        { text: '선택 확장에서도 게시하지 않습니다' },
        { text: '미리보기에서 실제 답이 안 나오면 멈춥니다' },
        { text: 'API 사용 요금은 Plus와 따로 청구됩니다' },
      ], { y: 270, rowH: 150, size: 60, at: 0.5, each: 0.18 });
      this.ck.rows.forEach(r => { r.tt.style.width = 'auto'; if (r.nt) css(r.nt, { fontSize: '34px', marginLeft: '36px', color: 'var(--dim)' }); });
      this.bd = band(el, '키를 대화창에 붙여 넣지 않습니다', 890);
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.ck.render(lt);
      openL(this.bd, lt, 1.5, 0.6);
    },
  });

  // ── s12 L1 한 문장과 다음 질문 ── 132px 문장 두 줄(「직접」만 주황 글자), 경로 다섯 칸, 정리 세 줄, 오른쪽 아래 다음 질문(주황 면)
  DECK.slide({
    id: 'p3-ch03-s12', dur: 3.2, steps: [], notes: NOTES['p3-ch03-s12'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = HD(el);
      this.sm = TH.statement(el, '계산과 검색까지\n직접 만들었습니다', { em: ['직접'], cy: 330, size: 132, at: 0.3 });
      this.row = tx('div', 'a', el, null, { left: '120px', top: '530px', width: '880px', display: 'flex', gap: '10px' });
      this.cells = ['화면', '서버', 'AI 호출', '답변', '기록 저장'].map((t, i) => tx('div', '', this.row, t, {
        flex: '1 1 auto', textAlign: 'center', fontSize: '36px', lineHeight: '1.2', fontWeight: i ? '600' : '800', padding: '10px 14px', borderRadius: '10px',
        boxSizing: 'border-box', whiteSpace: 'nowrap', background: i ? 'transparent' : 'var(--p3-paper)', color: i ? 'var(--dim)' : 'var(--p3-black)',
        border: i ? '2px dashed #6A6A66' : '2px solid var(--p3-paper)' }));
      this.pt = TH.points(el, ['동작: 환불·주차 계산, 질문 검색, 부서 표', '목: 상담 창', '남은 것: 서버, AI 답변, 기록 저장'],
        { x: 120, y: 650, w: 920, size: 48, gap: 34, mark: 'num', at: 1.4, each: 0.2 });
      this.nq = TH.nextQ(el, { x: 1060, bottom: 970, w: 740, maxW: 740, lead: '4장 · 강사 시연', maxLines: 4,
        text: '안내 화면에 서버와 AI 답변, 기록 저장을 더하는 일은 누가 하는가', at: 2.3 });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.sm.render(lt);
      this.cells.forEach((c, i) => TH.reveal(c, lt, 1.1 + i * 0.06, { dx: 0, dy: 14, dur: 0.4 }));
      this.pt.render(lt); this.nq.render(lt, ctx);
    },
  });
})();
