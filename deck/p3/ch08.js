/* 파트 3 · 8장 「실습: 내 업무의 승인 지점 표 만들기」(LAB-8). 원고 plan/slides/p3-ch08.json, 배정표 plan/assets/p3_layout_ch08.md.
 * 테마 「주황 면」(deck/themes/p3.md). 색은 CSS 변수와 테마 부품으로만 쓴다. 주황 면은 한 장에 두 곳까지, 연두는 s02 승인 지점 고리와 승인자 이름표에만 쓴다.
 * 레이아웃: s01 L0 · s02 L10 · s03 L3 · s03a L1 · s04 L5 · s04a L6 · s05 L13 · s06 L4 · s07 L12 · s08 L6 · s09 L4(다음 질문).
 * 키 누름은 없다. 모든 장이 키 없이 3.5초 안에 끝 상태가 된다.
 * 캡처 파일(deck/assets/p3/shots/p3-ch08-s04.png, p3-ch08-s05.png)이 없어 s04·s05 는 그린 화면을 쓴다.
 * 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다. */
(function () {
  'use strict';
  const { ease, prog, css, h, s } = REEL;
  const TH = window.THEME;
  DECK.config({ part: 'p3', chapter: 'ch08', title: '실습: 내 업무의 승인 지점 표 만들기' });
  const CH = '실습: 내 업무의 승인 지점 표 만들기';

  // 강사 메모: 원고의 notes 를 그대로 옮겼다
  const NOTES = {
    "p3-ch08-s01": "7장까지 한서윤 주임은 민원 답변 초안에서 시작해 민원 안내 화면과 안내물까지 만들었고, 단계마다 누가 승인하는지 정해 왔습니다. 이번 장에서는 그 순서를 여러분 자신의 업무 하나에 옮깁니다. ChatGPT가 질문을 하나씩 하면 답하고, 질문이 끝나면 세 항목과 승인 지점 표를 받아 양식 파일에 옮깁니다. 파트 1 1장에서 본 산출물 다섯 가지 가운데 마지막인 「내 업무의 승인 지점 표」가 이것입니다.",
    "p3-ch08-s02": "한서윤 주임이 오늘 한 일과 파트 3의 누리집 공개를 승인 지점 표 하나로 정리한 예입니다. 1행부터 5행까지는 파트 2에서 여러분이 한 실습 다섯 개이고, 6행 발송은 파트 1 9장에서 본, 민원인에게 보내기 전 오민석 팀장의 승인입니다. 7행은 3장에서 만든 민원 안내 화면을 시범 운영 범위로 게시하기 전의 승인이고, 8행은 상담 창까지 더한 서비스를 민원인에게 누리집으로 열기 전의 승인입니다. 5장에서 본 대로 누리집 공개는 윤지영 본부장이 정하므로 8행의 승인자는 경영지원본부장입니다. 승인자 칸에는 사람 이름 대신 직위나 역할을 적어서 「오민석 팀장」이 아니라 「고객지원팀장」으로 나옵니다. 표 전체는 실습 묶음의 lab8/완성본/새별_예.md에 있고, 화면에는 여섯 칸 가운데 세 칸만 실었습니다. (화면에서 옮긴 문구: 「한서윤 주임 · 민원 답변 초안 작성」, 「고객지원팀」)",
    "p3-ch08-s03": "이번에는 여러분이 실제로 하는 업무 하나를 고릅니다. 다만 ChatGPT에는 업무의 종류만 일반적인 말로 적습니다. 예를 들면 「계약 서류의 필수 항목 누락 점검」입니다. 기관 이름, 사람 이름, 내부 수치, 실제 문서 내용은 적지 않고 실제 개인정보와 내부 자료도 넣지 않는데, 실습마다 지켜 온 실습 규칙 1번을 이 실습에 맞춰 적은 것입니다. 업무가 떠오르지 않으면 왼쪽의 세 가지 가운데 하나로 해도 됩니다.",
    "p3-ch08-s03a": "임시 채팅은 저장하지 않으면 대화 기록에 남지 않고, 임시 상태인 동안 모델 개선에 쓰이지 않습니다. 다만 OpenAI가 안전 목적으로 사본을 최대 30일 보관할 수 있으니 임시 채팅에서도 실습 규칙을 지키고, 임시 채팅을 저장하지 않습니다.",
    "p3-ch08-s04": "ChatGPT에서 새 대화를 열고 임시 채팅을 켭니다. 켜는 곳은 화면 개편으로 바뀔 수 있어 강의 전에 제 화면으로 확인해 두었으니(강사 사전 확인 K-08), 제가 누르는 자리를 보고 따라 눌러 주세요. 첫 메시지를 보내기 전에 개인화 여부를 고르는 선택지가 나오면 메모리와 맞춤 지침을 쓰지 않는 쪽(영어 화면 「Unpersonalized」)을 고르고, 이 선택은 대화를 시작한 뒤에는 바꿀 수 없습니다. 켜는 곳을 못 찾는 분은 기다리지 말고 일반 대화로 시작하고, 4단계에서 표를 옮긴 뒤 그 대화를 지웁니다. (화면에서 옮긴 문구: 「저장하지 않으면 기록에 남지 않는 채팅」)",
    "p3-ch08-s04a": "요청문은 lab8 폴더의 단계.md에 있습니다. 단계.md를 메모장(Windows)이나 텍스트 편집기(macOS)로 열고, 다른 프로그램이 열리면 Windows는 파일을 오른쪽 클릭하고 「연결 프로그램」에서, macOS는 파일을 Control-클릭하고 「다음으로 열기」에서 고릅니다. 「## 요청 1」 줄 아래로 내려가 「나는 공공기관 직원이다.」부터 「첫 질문부터 시작해.」까지 마우스로 끌어 선택하고, Ctrl+C(macOS는 Command+C)로 복사합니다. 그 위아래에 있는 기호 줄 두 개(```text 줄과 ``` 줄)는 복사하지 않습니다. 오른쪽 원문에서 「여기부터」와 「여기까지」를 잇는 괄호 안이 복사할 범위이고, 붙여 넣기는 다음 화면에서 합니다.",
    "p3-ch08-s05": "앞 화면에서 복사한 글을 임시 채팅 입력창에 붙여 넣고 보냅니다. 붙여 넣기는 Windows가 Ctrl+V, macOS가 Command+V입니다. 요청 1은 질문을 한 번에 하나씩, 모두 7개 안에서 하라고 정하고, 기관 이름·사람 이름·내부 수치·실제 문서 내용은 묻지 말라고 적어 두었습니다. 질문이 끝나면 만들 것도 정해 두었는데, 파트 1 4장의 세 항목(목적과 결과물, 참고 자료와 제외 범위, 완료 기준과 승인 조건)과, 사람이 결과를 확인하고 다음으로 넘어갈지 정하는 자리를 적은 승인 지점 표입니다. 보내면 질문이 하나만 나와야 하고, 강의 전에 파트 2 1장에서 말한 codex로 돌려 봤을 때도 질문이 하나씩 나왔습니다. 질문 문장은 제 화면과 다를 수 있고, 질문을 한꺼번에 여러 개 하면 「질문은 하나씩만 해 줘」를 보냅니다. (화면에서 옮긴 문구: 「나는 공공기관 직원이다. 내 업무 하나를 AI 에이전트에게 맡길 수 있는지 정리하려고 한다. 너는 질문을 한 번에 하나씩 하는 인터뷰 진행자다.」)",
    "p3-ch08-s06": "질문마다 짧게 답합니다. 질문은 업무 이름과 결과물, 쓰는 자료와 그 자료를 외부 서비스에 넣어도 되는지, 결과가 맞는지 판단하는 기준, 결과에 책임지는 사람의 직위나 역할, 틀렸을 때 생기는 일을 묻습니다. 기관 이름이나 사람 이름을 적으면 「실습에서는 일반적인 말로 바꿔 적어 주세요」라는 안내가 나오고 그 내용은 표에 옮기지 않게 해 두었지만, 처음부터 적지 않는 것이 규칙입니다. 강의 전에 codex로 가상의 기관 이름, 사람 이름, 건수를 넣어 봤을 때 이 안내가 나왔고 표에 들어가지 않았지만, 여러분 화면에서는 다를 수 있습니다. 질문이 7개를 넘거나 시간이 모자라면 단계.md의 「요청 2」를 보내 지금까지 답한 내용으로 표를 받습니다. (화면에서 옮긴 문구: 「업무는 일반적인 말로 적습니다」, 「질문이 끝나면 세 항목과 승인 지점 표」)",
    "p3-ch08-s07": "표가 나오면 세 가지를 봅니다. 첫째, 단계마다 에이전트에게 맡길 일과 사람이 하는 일이 따로 적혀 있는지, 둘째, 승인 지점마다 승인자가 직위나 역할로 적혀 있는지 봅니다. 셋째, 대화 중에 기관 이름이나 사람 이름을 적었더라도 표에는 들어가지 않았는지 봅니다. 답하지 않은 칸은 「확인 필요」로 나오고, 그대로 두어도 됩니다. 세 가지가 맞으면 손을 들어 주세요. 표가 아직 안 나온 분은 「요청 2」를 보냅니다.",
    "p3-ch08-s08": "저장하지 않은 임시 채팅은 창을 닫으면 다시 열 수 없으니, 표가 나오면 다른 일보다 먼저 옮깁니다. lab8 폴더의 승인지점표_양식.md를 메모장(Windows)이나 텍스트 편집기(macOS)로 엽니다. ChatGPT 답변에서 세 항목을 마우스로 끌어 선택하고 Ctrl+C(macOS는 Command+C)로 복사해 양식의 「## 세 항목」 줄 바로 아래에 붙이고, 같은 방법으로 승인 지점 표를 「## 승인 지점 표」 줄 바로 아래에 붙입니다. 양식에 원래 있던 빈 칸 줄은 지우지 않아도 됩니다. 메모장에 붙인 표는 칸 모양이 화면과 다르게 들어갈 수 있는데, 칸의 글이 다 들어가 있으면 그대로 두고, 글이 빠졌으면 그 줄만 다시 복사합니다. 다 붙였으면 같은 이름으로 저장하고, 저장은 Windows가 Ctrl+S, macOS가 Command+S입니다. 표 아래의 「## 시험해 볼 것」 칸은 오늘 비워 두어도 되고, 9장에서 내일 할 일로 다시 봅니다. 임시 채팅 대신 일반 대화로 한 분은 표를 옮긴 뒤 그 대화를 지우고, 표가 나오기 전에 시간이 끝났으면 완성본/새별_예.md의 표 양식에 손으로 채웁니다.",
    "p3-ch08-s09": "옆 사람과 노트북을 바꿔 표를 읽습니다. 파일은 주고받지 않고, 옆 사람 노트북에 열려 있는 그 사람의 승인지점표_양식.md를 그대로 봅니다. 에이전트에게 맡긴 일 뒤에 사람이 멈춰서 확인하는 자리가 빠진 곳을 하나 찾아 그 양식 맨 아래의 「옆 사람이 찾은 빠진 승인 지점」 칸에 적고, 적은 사람이 Ctrl+S(macOS는 Command+S)로 저장한 뒤 노트북을 돌려줍니다. 찾기 어려우면 화면의 두 예가 그 표에 있는지부터 봅니다. 한서윤 주임의 표에서는 규정이 개정되면 프로젝트 파일을 바꾸고 시험 12개를 다시 돌린 뒤 사용을 다시 승인받는 단계가 빠져 있었습니다. 돌려받은 내 양식 맨 아래 칸에 옆 사람이 적은 내용이 저장되어 있으면 오늘 가져가는 표가 완성되고, 오늘의 세 질문에 무엇이라고 답하고 내일 무엇을 할지는 9장에서 정리합니다.",
  };
  const tx = (tag, cls, parent, text, style) => { const e = h(tag, cls, parent); if (text != null) e.textContent = text; if (style) css(e, style); return e; };
  const HD = (el, fiction) => TH.header(el, { chapter: 8, title: CH, fiction });
  // 어두운 바탕 위 보조 글자: 테마 --dim(#C4C4BE)보다 밝게 둔다
  const BRIGHT = '#E2E2DC';
  const ORANGE_TX = 'var(--p3-orange-text)';
  // 글자 폭 재기(setup 에서만)
  const meas = (el, t, st) => { const m = tx('span', '', el, t, Object.assign({ position: 'absolute', left: '0', top: '0', whiteSpace: 'nowrap', visibility: 'hidden' }, st)); const w = m.offsetWidth; m.remove(); return w; };
  // sizes 가운데 모든 글이 maxW 안에 한 줄로 드는 가장 큰 크기
  const fitSize = (el, texts, st, maxW, sizes) => sizes.find(z => texts.every(t => meas(el, t, Object.assign({}, st, { fontSize: z + 'px' })) <= maxW)) ?? sizes[sizes.length - 1];
  // 장 제목 72px(x 120, y 146). 한 줄에 들지 않으면 64px
  const pageTitle = (el, text, o) => {
    let t = TH.pageTitle(el, text, Object.assign({ w: 1680 }, o || {}));
    if (t.lines > 1) { t.el.remove(); t = TH.pageTitle(el, text, Object.assign({ w: 1680 }, o || {}, { size: 64 })); }
    return t;
  };
  // 단계 칸 오른쪽 제목: 단계 칸 오른쪽 끝 + 56, 아래 끝을 단계 칸 아래 끝에 맞춘다. 72px 한 줄이 안 되면 64px
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
  // 「머리 낱말 · 나머지」 한 줄. 머리 낱말만 굵게(글자는 원고 그대로)
  const rich = (parent, cls, head, rest, style) => {
    const e = tx('div', cls, parent, null, Object.assign({ whiteSpace: 'nowrap', color: 'var(--ink)', lineHeight: '1.3' }, style));
    tx('b', '', e, head, { fontWeight: '800' });
    e.appendChild(document.createTextNode(' · ' + rest));
    return e;
  };
  // 묶음 열: 이름(34px 주황 글자 800)과 값(vs px 600). 값이 배열이면 줄마다 나눈다. mono: 값을 고정폭으로
  const group = (el, x, w, name, value, vs, o = {}) => {
    const b = tx('div', 'a', el, null, { left: x + 'px', top: '0', width: w + 'px', wordBreak: 'keep-all' });
    tx('div', '', b, name, { fontSize: '34px', fontWeight: '800', lineHeight: '1.3', color: ORANGE_TX, marginBottom: '4px' });
    (Array.isArray(value) ? value : [value]).forEach(v => tx('div', o.mono ? 'p3-mono' : '', b, v, { fontSize: vs + 'px', fontWeight: '600', lineHeight: '1.3', color: 'var(--ink)', whiteSpace: o.nowrap ? 'nowrap' : 'normal' }));
    return b;
  };
  // 묶음을 y0~y1 사이에 고르게 놓는다(간격은 min~max)
  const stack = (blocks, y0, y1, min = 20, max = 64) => {
    const tot = blocks.reduce((a, b) => a + b.offsetHeight, 0);
    const gap = Math.max(min, Math.min(max, (y1 - y0 - tot) / Math.max(1, blocks.length - 1)));
    let y = y0; blocks.forEach(b => { b.style.top = Math.round(y) + 'px'; y += b.offsetHeight + gap; });
    return y - gap;
  };

  // ── s01 L0 영상 띠 전환 ── 전환 영상 p3-tr-path 를 정방향(반전 없이) 흑백으로 띠 위쪽에 깐다
  DECK.slide({
    id: 'p3-ch08-s01', dur: 2.8, steps: [], notes: NOTES['p3-ch08-s01'],
    setup(el) {
      this.vt = TH.videoTitle(el, {
        kind: 'chapter', kicker: '파트 3 · 8장', title: '실습: 내 업무의\n승인 지점 표 만들기', at: 0.45,
        sub: '내 업무에서는 무엇부터 맡기고 어디에서 승인할 것인가',
        src: '../assets/video/p3/p3-tr-path.mp4', poster: '../assets/video/p3/p3-tr-path.jpg',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // ── s02 L10 표와 승인자(8행, 화면 전체) ── 단계 이름 44~48px, 승인 지점 38px(앞에 열린 연두 고리), 승인자 연두 이름표 40~44px
  DECK.slide({
    id: 'p3-ch08-s02', dur: 3.4, steps: [], notes: NOTES['p3-ch08-s02'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = HD(el, true);
      this.pe = TH.person(el, { who: '한서윤', x: 0, y: 140, at: 0.4, org: false, nameSize: 44 });
      this.pe.el.style.left = (1800 - this.pe.el.offsetWidth) + 'px';
      this.tt = TH.pageTitle(el, '단계마다 멈출 곳과 승인자가 있습니다', { w: 1800 - this.pe.el.offsetWidth - 40 - 120 });
      const R = [['1. 범위 정하기', '시범 범위 확정', '고객지원팀장'], ['2. 민원 상담 프로젝트 만들기', '지침 1판 저장', '담당자'], ['3. 시험', '시험 기록 확정', '담당자'],
        ['4. 검토', '다시 쓰기 2회를 넘으면 사람에게 넘김', '담당자'], ['5. 사용 승인', '시범 사용 승인', '고객지원팀장'], ['6. 발송', '민원인에게 보내기 전', '고객지원팀장'],
        ['7. 시범 게시', '시범 운영 범위로 게시하기 전', '고객지원팀장'], ['8. 누리집 공개(배포)', '민원인에게 누리집으로 열기 전', '경영지원본부장']];
      // 열 폭은 글자 폭에서 정한다: 첫 열(단계)과 셋째 열(승인자 이름표)을 크게, 남는 폭을 둘째 열에
      const NAME = z => ({ fontFamily: 'var(--display)', fontSize: z + 'px', fontWeight: '800', letterSpacing: '-0.02em' });
      const TAG = z => ({ fontSize: z + 'px', fontWeight: '800' });
      const S2 = 38;
      let s1 = 48, s3 = 44, C1, C2, C3;
      const need2 = Math.max(...R.map(r => meas(el, r[1], { fontSize: S2 + 'px', fontWeight: '500' }))) + Math.round(S2 * 1.5) + 24 + 12;
      for (;;) {
        C1 = Math.ceil(Math.max(...R.map(r => meas(el, r[0], NAME(s1))))) + 40;
        C3 = Math.ceil(Math.max(...R.map(r => meas(el, r[2], TAG(s3))))) + 36 + 8;
        C2 = 1680 - C1 - C3;
        if (C2 >= need2 || s1 <= 40) break;
        if (s3 > 40) s3 -= 2; else s1 -= 2;
      }
      const TY = 252, RH = 80, at = 0.6, each = 0.08;
      this.tb = TH.table(el, R, { x: 120, y: TY, cols: [C1, C2, C3], head: ['단계', '승인 지점(여기서 멈춘다)', '승인자'], headSize: 34, rowH: RH, size: S2, approve: 2, at, each });
      el.querySelectorAll('.p3-th').forEach(c => css(c, { color: BRIGHT, fontWeight: '700' }));
      const RS = Math.round(S2 * 1.5);
      this.rings = this.tb.rows.map((r, i) => {
        const td = r.row.querySelectorAll('.p3-td');
        // 첫 열: 「1.」 번호만 주황 글자, 단계 이름은 제목 서체
        const [num, ...rest] = R[i][0].split(' ');
        td[0].textContent = '';
        css(td[0], Object.assign({ whiteSpace: 'nowrap', lineHeight: '1.1' }, NAME(s1)));
        tx('span', '', td[0], num, { color: ORANGE_TX, marginRight: '0.3em' });
        td[0].appendChild(document.createTextNode(rest.join(' ')));
        // 둘째 열: 열린 연두 고리(승인 지점) 뒤에 글
        css(td[1], { left: (C1 + RS) + 'px', width: (C2 - RS - 24) + 'px', fontSize: S2 + 'px', fontWeight: '500', color: 'var(--ink)', whiteSpace: 'nowrap' });
        const tg = td[2].querySelector('.p3-approve');
        css(tg, Object.assign({ padding: '4px 18px', lineHeight: '1.25', borderRadius: '10px' }, TAG(s3)));
        return TH.ring(r.row, { x: C1 + S2 * 0.6, y: RH / 2, r: Math.round(S2 * 0.44), width: 4, state: 'open', at: at + i * each + 0.1 });
      });
      const FY = TY + 56 + RH * R.length + 14;
      this.f1 = tx('div', 'a', el, '승인자 칸 · 사람 이름 대신 직위나 역할', { left: '120px', top: FY + 'px', fontSize: '34px', fontWeight: '600', lineHeight: '1.3', color: BRIGHT, whiteSpace: 'nowrap' });
      this.f2 = tx('div', 'a', el, '승인 지점 표 예 · ', { right: '120px', top: FY + 'px', fontSize: '34px', fontWeight: '600', lineHeight: '1.3', color: BRIGHT, whiteSpace: 'nowrap' });
      tx('span', 'p3-mono', this.f2, 'lab8/완성본/새별_예.md', { fontSize: '32px' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt); this.pe.render(lt);
      this.tb.render(lt); this.rings.forEach(r => r.render(lt));
      TH.reveal(this.f1, lt, 2.6, { dx: 0, dy: 10 }); TH.reveal(this.f2, lt, 2.7, { dx: 0, dy: 10 });
    },
  });

  // ── s03 L3 좌우 대비 ── 왼쪽 면: 업무 예 세 줄(고르게 나눈 칸), 오른쪽 주황 면: 입력하지 않는 것 넷(72px)과 그려지는 ✕
  DECK.slide({
    id: 'p3-ch08-s03', dur: 2.8, steps: [], notes: NOTES['p3-ch08-s03'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = HD(el);
      this.tt = pageTitle(el, '이번에는 맡은 업무 하나를 고릅니다');
      this.sb = tx('div', 'a', el, '일반적인 말로 적습니다 · 예: ', { left: '120px', top: '246px', fontSize: '40px', fontWeight: '600', lineHeight: '1.3', color: 'var(--ink)', whiteSpace: 'nowrap' });
      tx('span', '', this.sb, '「계약 서류의 필수 항목 누락 점검」', { color: ORANGE_TX, fontWeight: '700' });
      const TOP = 330, BOT = 960;
      this.sp = TH.split(el, { top: TOP, bottom: BOT, labelSize: 40, left: { label: '업무가 떠오르지 않으면', tone: 'panel' }, right: { label: '입력하지 않는 것', tone: 'orange' }, at: 0.5, rightAt: 1.3 });
      const BH = BOT - TOP - 108 - 40;
      // 왼쪽: 업무 예 셋을 칸 높이에 고르게(칸 사이 선)
      const LT = ['회의록 초안 작성', '공공데이터로 월간 통계표 만들기', '입찰 공고문 필수 항목 점검'];
      const ls = fitSize(el, LT, { fontFamily: 'var(--display)', fontWeight: '800', letterSpacing: '-0.02em' }, 720, [56, 52, 48, 44]);
      this.L = LT.map((t, i) => {
        const r = tx('div', '', this.sp.left, null, { position: 'absolute', left: '0', right: '0', top: Math.round(i * BH / 3) + 'px', height: Math.round(BH / 3) + 'px', display: 'flex', alignItems: 'center',
          borderTop: i ? '2px solid #3A3A3A' : 'none' });
        tx('div', '', r, t, { fontFamily: 'var(--display)', fontWeight: '800', fontSize: ls + 'px', lineHeight: '1.15', letterSpacing: '-0.02em', color: 'var(--ink)', whiteSpace: 'nowrap' });
        return r;
      });
      // 오른쪽: 넷(검정 72px)과 ✕
      this.no = ['기관 이름', '사람 이름', '내부 수치', '실제 문서 내용'].map((t, i) => {
        const r = tx('div', '', this.sp.right, null, { position: 'absolute', left: '0', right: '0', top: Math.round(i * BH / 4) + 'px', height: Math.round(BH / 4) + 'px', display: 'flex', alignItems: 'center', gap: '30px' });
        const svg = s('svg', { width: 52, height: 52, viewBox: '0 0 52 52' }, tx('div', '', r, null, { flex: 'none', width: '52px', height: '52px' }));
        const ps = ['M 8 8 L 44 44', 'M 44 8 L 8 44'].map(d => { const p = s('path', { d, fill: 'none', 'stroke-width': 8, 'stroke-linecap': 'round' }, svg); p.style.stroke = 'var(--p3-black)'; KIT.drawPrep(p); return p; });
        tx('div', '', r, t, { fontFamily: 'var(--display)', fontWeight: '800', fontSize: '80px', lineHeight: '1.1', letterSpacing: '-0.02em', color: 'var(--p3-black)', whiteSpace: 'nowrap' });
        return { r, ps, t: 1.6 + i * 0.1 };
      });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.tt.render(lt);
      TH.reveal(this.sb, lt, 0.35);
      this.sp.render(lt);
      this.L.forEach((r, i) => TH.reveal(r, lt, 0.8 + i * 0.12, { dx: -16 }));
      this.no.forEach(n => {
        TH.reveal(n.r, lt, n.t, { dx: -16, dur: 0.4 });
        n.ps.forEach((p, k) => KIT.draw(p, prog(lt, n.t + 0.2 + k * 0.1, 0.2, ease.outCubic)));
      });
    },
  });

  // ── s03a L1 한 문장 ── 「임시 채팅」을 화면 폭의 3분의 2 크기로, 아래에 풀이 세 줄(화면 폭 전체의 줄 칸)
  DECK.slide({
    id: 'p3-ch08-s03a', dur: 2.6, steps: [], notes: NOTES['p3-ch08-s03a'],
    setup(el) {
      this.bg = TH.bg(el, 'base');
      this.hd = HD(el);
      // 글자 폭이 1160px 안팎이 되는 크기(300px 까지)
      const w100 = meas(el, '임시 채팅', { fontFamily: 'var(--display)', fontWeight: '900', fontSize: '100px', letterSpacing: '-0.02em' });
      const SZ = Math.min(300, Math.floor(1160 / w100 * 100));
      this.sm = TH.title(el, '임시 채팅', { x: 112, y: 176, size: SZ, exact: true, weight: 900, at: 0.3 });
      css(this.sm.el, { lineHeight: '1.08', letterSpacing: '-0.03em' });
      const wBot = 176 + this.sm.el.offsetHeight;
      // 풀이 세 줄: onScreen 첫 항목을 「·」에서 나눈 두 줄과 셋째 줄
      const LN = ['저장하지 않으면 대화 기록에 남지 않음', '임시 상태인 동안 모델 개선에 쓰이지 않음', '안전 목적의 사본은 OpenAI가 최대 30일 보관할 수 있음'];
      const fs = fitSize(el, LN, { fontWeight: '600' }, 1600, [60, 58, 56, 52]);
      const Y0 = Math.max(wBot + 26, 520), Y1 = 950, RH = (Y1 - Y0) / 3;
      this.rows = LN.map((t, i) => {
        const r = tx('div', 'a', el, null, { left: '120px', width: '1680px', top: Math.round(Y0 + i * RH) + 'px', height: Math.round(RH) + 'px', display: 'flex', alignItems: 'center', gap: '34px' });
        const ln = tx('div', '', r, null, { position: 'absolute', left: '0', right: '0', top: '0', height: '2px', background: '#3A3A3A', transformOrigin: '0 50%' });
        tx('i', '', r, null, { flex: 'none', width: '18px', height: '18px', borderRadius: '3px', background: i === 2 ? 'var(--p3-orange)' : 'var(--ink)' });
        const tt = tx('div', '', r, null, { fontSize: fs + 'px', fontWeight: '600', lineHeight: '1.2', color: 'var(--ink)', whiteSpace: 'nowrap' });
        if (i === 2) {
          tt.appendChild(document.createTextNode('안전 목적의 사본은 OpenAI가 '));
          tx('span', '', tt, '최대 30일', { color: ORANGE_TX, fontWeight: '800' });
          tt.appendChild(document.createTextNode(' 보관할 수 있음'));
        } else tt.textContent = t;
        return { r, ln, t: 1.0 + i * 0.15 };
      });
      this.bl = tx('div', 'a', el, null, { left: '120px', width: '1680px', top: Math.round(Y1) + 'px', height: '2px', background: '#3A3A3A', transformOrigin: '0 50%' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.sm.render(lt);
      this.rows.forEach(r => {
        r.ln.style.transform = `scaleX(${prog(lt, r.t - 0.1, 0.5, ease.outQuart).toFixed(4)})`;
        TH.reveal(r.r, lt, r.t, { dx: -18 });
      });
      this.bl.style.transform = `scaleX(${prog(lt, 1.3, 0.5, ease.outQuart).toFixed(4)})`;
    },
  });

  // ── s04 L5 화면 크게와 짚는 말 ── 그린 새 대화 화면(1100×560): 위 가운데 「임시 채팅」 표시와 빈 입력창. 오른쪽 열 네 묶음
  DECK.slide({
    id: 'p3-ch08-s04', dur: 2.8, steps: [], notes: NOTES['p3-ch08-s04'],
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = HD(el);
      this.st = TH.step(el, 1, 5, { x: 120, y: 158, at: 0.1 });
      this.tt = stepTitle(el, this.st, '임시 채팅을 켭니다');
      // 켜는 단추는 그리지 않는다(단추의 화면 표기와 위치가 조사표에 없다). 「임시 채팅」은 기능 이름이다
      this.sh = TH.shot(el, null, { x: 120, y: 360, w: 1100, h: 560, at: 0.35, focus: true,
        marks: [{ pick: d => d.pill, grow: 12, at: 1.2 }],
        draw: alt => {
          const fr = KIT.frame(alt, 'browser', { url: 'chatgpt.com', style: { left: '0', top: '0', width: '100%', height: '100%', borderRadius: '0', border: '0' } });
          const pill = tx('div', '', fr.body, '임시 채팅', { position: 'absolute', top: '44px', padding: '12px 42px', borderRadius: '999px', background: 'var(--p3-paper)',
            color: 'var(--p3-black)', fontSize: '56px', fontWeight: '700', lineHeight: '1.2', whiteSpace: 'nowrap' });
          pill.style.left = Math.round((fr.body.offsetWidth - pill.offsetWidth) / 2) + 'px';
          tx('div', 'p3-ui-comp', fr.body, null, { left: '80px', right: '80px', bottom: '40px', height: '100px' });
          return { pill };
        } });
      // 짚는 말: 알약 아래 60px, 알약 가운데에서 내려오는 선으로 잇는다
      const P = TH.boxOf(this.sh.drawn.pill, el, 12);
      const cx = P.x + P.w / 2, cy = P.y + P.h + 60;
      this.co = TH.callout(el, { x: 0, y: cy, head: '기대 결과', text: '화면에 임시 채팅 표시가 보인다', at: 1.55 });
      this.co.el.style.left = Math.round(cx - this.co.el.offsetWidth / 2) + 'px';
      const svg = s('svg', { width: 1920, height: 1080, viewBox: '0 0 1920 1080' }, el);
      svg.setAttribute('class', 'p3-leader');
      this.ld = s('path', { d: `M ${cx} ${P.y + P.h + 2} L ${cx} ${cy}`, fill: 'none' }, svg);
      KIT.drawPrep(this.ld);
      // 오른쪽 열(x 1260~1800): 네 묶음을 화면 높이(y 360~920)에 고르게
      const G = [['입력', '새 대화를 열고 임시 채팅 켜기'], ['켜는 곳', '강사가 먼저 보여 줍니다'], ['개인화를 물으면', '「Unpersonalized」 쪽을 고릅니다'],
        ['못 찾으면', ['일반 대화로 시작 ·', '표를 옮긴 뒤 대화를 지웁니다']]];
      for (const vs of [40, 38, 36]) {
        if (this.gr) this.gr.forEach(b => b.remove());
        this.gr = G.map(([k, v], i) => {
          const b = group(el, 1260, 540, k, v, vs);
          if (i) css(b, { borderTop: '2px solid #3A3A3A', paddingTop: '18px' });
          return b;
        });
        if (this.gr.reduce((a, b) => a + b.offsetHeight, 0) + 3 * 24 <= 560) break;
      }
      stack(this.gr, 360, 920, 24, 60);
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.st.render(lt); this.tt.render(lt); this.sh.render(lt, ctx);
      KIT.draw(this.ld, prog(lt, 1.3, 0.3, ease.inOutCubic));
      this.co.render(lt);
      this.gr.forEach((b, i) => TH.reveal(b, lt, 0.8 + i * 0.15, { dx: -14 }));
    },
  });

  // ── s04a L6 단계 칸과 원문 ── 왼쪽 열: 단계 칸, 64px 제목 두 줄, 묶음 셋. 오른쪽: 단계.md 종이(왼쪽 여백에 「여기부터」「여기까지」와 주황 괄호), 종이 아래 막히면 두 줄
  DECK.slide({
    id: 'p3-ch08-s04a', dur: 2.9, steps: [], notes: NOTES['p3-ch08-s04a'],
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = HD(el);
      this.st = TH.step(el, 2, 5, { x: 120, y: 170, at: 0.1 });
      this.tt = TH.title(el, '「요청 1」을\n복사합니다', { x: 120, y: 380, size: 64, exact: true, w: 480, at: 0.3 });
      const LW = 496;
      const vs = fitSize(el, ['「나는 공공기관 직원이다.」부터'], { fontWeight: '600' }, LW, [40, 38, 36]);
      this.info = [
        group(el, 120, LW, '열 파일', 'lab8/단계.md', vs, { mono: true }),
        group(el, 120, LW, '복사할 범위', ['「나는 공공기관 직원이다.」부터', '「첫 질문부터 시작해.」까지'], vs, { nowrap: true }),
        group(el, 120, LW, '기대 결과', '오른쪽 괄호 안의 글만 복사된다', vs),
      ];
      stack(this.info, 380 + this.tt.el.offsetHeight + 44, 960, 22, 40);
      const DX = 640, DY = 170, PADL = 212;
      this.dc = TH.doc(el, { x: DX, y: DY, w: 1160, size: 40, labelSize: 34, label: '단계.md', at: 0.35, each: 0.05, lines: [
        '## 요청 1', { text: '```text', dim: true, size: 34 }, '나는 공공기관 직원이다. 내 업무 하나를 …', '규칙', '- 질문은 한 번에 하나만 한다. …', '…', '첫 질문부터 시작해.', { text: '```', dim: true, size: 34 },
      ] });
      const p = this.dc.el, rows = [...p.querySelectorAll('.p3-doc-line')];
      css(p, { padding: `30px 56px 34px ${PADL}px` });
      css(p.querySelector('.p3-doc-label'), { marginLeft: (64 - PADL) + 'px', paddingBottom: '14px', marginBottom: '14px' });
      rows.forEach(r => css(r, { lineHeight: '1.4', marginTop: '12px', whiteSpace: 'nowrap' }));
      [1, 7].forEach(i => rows[i].classList.add('p3-mono'));
      [0, 3].forEach(i => css(rows[i], { fontWeight: '700' }));
      // 짚는 이름표(검정 면, 흰 34px 800)와 주황 괄호: 「나는 공공기관 직원이다.」 줄부터 「첫 질문부터 시작해.」 줄까지
      const rTop = i => DY + rows[i].offsetTop, rBot = i => rTop(i) + rows[i].offsetHeight;
      const TAG = { left: (DX + 18) + 'px', padding: '6px 16px', borderRadius: '8px', background: 'var(--p3-black)', color: 'var(--p3-paper)', fontSize: '34px', fontWeight: '800', lineHeight: '1.3', whiteSpace: 'nowrap' };
      this.t1 = tx('div', 'a', el, '여기부터', TAG);
      this.t2 = tx('div', 'a', el, '여기까지', TAG);
      const y0 = rTop(2) + 4, y1 = rBot(6) - 4;
      this.t1.style.top = y0 + 'px';
      this.t2.style.top = (y1 - this.t2.offsetHeight) + 'px';
      const bx = DX + 18 + this.t1.offsetWidth + 10;
      const svg = s('svg', { width: 1920, height: 1080, viewBox: '0 0 1920 1080' }, el);
      css(svg, { position: 'absolute', left: '0', top: '0', overflow: 'visible', pointerEvents: 'none' });
      this.br = s('path', { d: `M ${bx + 14} ${y0} L ${bx} ${y0} L ${bx} ${y1} L ${bx + 14} ${y1}`, fill: 'none', 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
      this.br.style.stroke = 'var(--p3-orange)';
      KIT.drawPrep(this.br);
      // 막히면 두 줄: 둘째 줄의 「macOS」를 첫 줄의 「Windows」 아래에 맞춘다
      const by = DY + p.offsetHeight + 20;
      const LN = { left: DX + 'px', fontSize: '34px', fontWeight: '600', lineHeight: '1.3', color: BRIGHT, whiteSpace: 'nowrap' };
      this.m1 = tx('div', 'a', el, null, Object.assign({ top: by + 'px' }, LN));
      tx('b', '', this.m1, '막히면', { fontWeight: '800', color: 'var(--ink)' });
      const pre = tx('span', '', this.m1, ' · 다른 프로그램이 열리면 · ');
      this.m1.appendChild(document.createTextNode('Windows · 오른쪽 클릭 → 「연결 프로그램」'));
      const ind = this.m1.querySelector('b').offsetWidth + pre.offsetWidth;
      this.m2 = tx('div', 'a', el, 'macOS · Control-클릭 → 「다음으로 열기」', Object.assign({ top: (by + 46) + 'px' }, LN, { left: (DX + ind) + 'px' }));
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.st.render(lt); this.tt.render(lt); this.dc.render(lt);
      this.info.forEach((b, i) => TH.reveal(b, lt, 0.7 + i * 0.12));
      TH.reveal(this.t1, lt, 1.4, { dx: -12, dur: 0.35 });
      KIT.draw(this.br, prog(lt, 1.45, 0.5, ease.inOutCubic));
      TH.reveal(this.t2, lt, 1.9, { dx: -12, dur: 0.35 });
      TH.reveal(this.m1, lt, 2.1, { dx: 0, dy: 10 });
      TH.reveal(this.m2, lt, 2.2, { dx: 0, dy: 10 });
    },
  });

  // ── s05 L13 결과물 전시(기대 결과 예) ── 오른쪽 그린 임시 채팅 화면(1100×576): 표시, 보낸 글 네 줄, 첫 질문 48px. 왼쪽 열 세 항목
  DECK.slide({
    id: 'p3-ch08-s05', dur: 2.6, steps: [], notes: NOTES['p3-ch08-s05'],
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = HD(el);
      this.st = TH.step(el, 2, 5, { x: 120, y: 158, at: 0.1 });
      this.tt = stepTitle(el, this.st, '「요청 1」을 보냅니다');
      const EX = 700, EY = 384, EW = 1100, EH = 576;
      this.tag = tx('div', 'a', el, '기대 결과 예', { right: '120px', fontSize: '34px', fontWeight: '800', lineHeight: '1.3', color: ORANGE_TX, whiteSpace: 'nowrap' });
      this.tag.style.top = (EY - 14 - this.tag.offsetHeight) + 'px';
      const D = {};
      this.ex = TH.exhibit(el, { x: EX, y: EY, w: EW, h: EH, pad: 16, at: 0.4, focus: true, draw: (box, w) => {
        css(box, { background: '#161616' });
        D.pill = tx('div', '', box, '임시 채팅', { position: 'absolute', top: '24px', padding: '8px 32px', borderRadius: '999px', background: 'var(--p3-paper)', color: 'var(--p3-black)',
          fontSize: '36px', fontWeight: '700', lineHeight: '1.2', whiteSpace: 'nowrap' });
        D.pill.style.left = Math.round((w - D.pill.offsetWidth) / 2) + 'px';
        D.ub = tx('div', '', box, null, { position: 'absolute', right: '28px', top: (24 + D.pill.offsetHeight + 26) + 'px', padding: '18px 32px 20px', borderRadius: '24px 24px 6px 24px',
          background: 'var(--p3-paper)', color: 'var(--p3-black)' });
        ['나는 공공기관 직원이다. …', '- 질문은 한 번에 하나만 한다. …', '- 기관 이름, 사람 이름, 내부 수치, 실제 문서 내용은 묻지 않는다. …', '첫 질문부터 시작해.']
          .forEach(t => tx('div', '', D.ub, t, { fontSize: '34px', lineHeight: '1.4', fontWeight: '500', whiteSpace: 'nowrap' }));
        D.ai = tx('div', '', box, null, { position: 'absolute', left: '28px', right: '28px', paddingLeft: '34px' });
        D.ai.style.top = (D.ub.offsetTop + D.ub.offsetHeight + 36) + 'px';
        D.bar = tx('i', '', D.ai, null, { position: 'absolute', left: '0', top: '6px', bottom: '6px', width: '6px', borderRadius: '2px', background: 'var(--p3-orange)', transformOrigin: '50% 0', transform: 'scaleY(0)' });
        ['AI 에이전트에게 맡기고 싶은 업무는 무엇이고,', '최종 결과물은 어떤 형태인가요?'].forEach(t => tx('div', '', D.ai, t, {
          fontFamily: 'var(--display)', fontWeight: '800', fontSize: '48px', lineHeight: '1.25', letterSpacing: '-0.02em', color: 'var(--ink)', whiteSpace: 'nowrap' }));
        return null;
      } });
      this.D = D;
      // 왼쪽 열(x 120~660)
      const V1 = ['붙여 넣기 Ctrl+V(Windows) ·', 'Command+V(macOS) → 보내기'], V3 = ['질문이 여러 개면', '「질문은 하나씩만 해 줘」'];
      const vs = fitSize(el, [...V1, ...V3], { fontWeight: '600' }, 540, [42, 40, 38, 36]);
      this.gr = [group(el, 120, 540, '입력', V1, vs, { nowrap: true }), group(el, 120, 540, '기대 결과', '질문 하나만 나온다', vs), group(el, 120, 540, '막히면', V3, vs, { nowrap: true })];
      this.gr.forEach((b, i) => { if (i) css(b, { borderTop: '2px solid #3A3A3A', paddingTop: '20px' }); });
      stack(this.gr, EY, EY + EH, 28, 80);
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.st.render(lt); this.tt.render(lt);
      this.ex.render(lt, ctx);
      const D = this.D;
      TH.reveal(D.pill, lt, 0.7, { dx: 0, dy: 10, dur: 0.4 });
      TH.reveal(D.ub, lt, 0.9, { dx: 0, dy: 16 });
      TH.reveal(D.ai, lt, 1.6, { dx: 0, dy: 16 });
      D.bar.style.transform = `scaleY(${prog(lt, 1.75, 0.35, ease.outQuart).toFixed(4)})`;
      TH.reveal(this.tag, lt, 1.0, { dx: 14 });
      this.gr.forEach((b, i) => TH.reveal(b, lt, 0.6 + i * 0.15));
    },
  });

  // ── s06 L4 가로 순서(묻고 답하기) ── 칸 넷(질문 · 짧은 답 · 다음 질문 · 「요청 2」 주황 칸). 넷째 칸은 「요청 2」 원문이 들어가게 넓힌다
  DECK.slide({
    id: 'p3-ch08-s06', dur: 2.6, steps: [], notes: NOTES['p3-ch08-s06'],
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = HD(el);
      this.st = TH.step(el, 3, 5, { x: 120, y: 158, at: 0.1 });
      this.tt = stepTitle(el, this.st, '질문마다 짧게 답합니다');
      const CY = 410, CHT = 520, W = [372, 372, 372, 516], G = 16;
      this.sq = TH.sequence(el, [
        { label: 'AI 에이전트에게 맡기고 싶은 업무는 무엇이고, 최종 결과물은 어떤 형태인가요?' },
        { label: TH.keepWords('계약 서류의 필수 항목 누락 점검', ['필수 항목', '누락 점검']) },
        { label: '다음 질문 하나' },
        // 「요청 2」 원문은 원고가 정한 자리에서 줄을 나눈다
        { label: TH.keepWords('질문이 7개를 넘으면 「요청 2」', ['「요청 2」']), tone: 'now', note: '질문은 여기까지 하고,\n지금까지 답한 내용으로\n세 항목과 승인 지점 표를\n만들어 줘. 모르는 칸은\n「확인 필요」로 적어.' },
      ], { y: CY, h: CHT, gap: G, size: 48, numSize: 96, noteSize: 34, at: 0.5, each: 0.1 });
      let x = 120;
      this.sq.cells.forEach((c, i) => { css(c.c, { left: x + 'px', width: W[i] + 'px', padding: '28px 28px 32px' }); x += W[i] + G; });
      const lab = i => this.sq.cells[i].c.querySelector('.p3-seq-label');
      css(lab(0), { fontFamily: 'var(--body)', fontWeight: '600', fontSize: '40px', lineHeight: '1.35', letterSpacing: '0' });
      [1, 2].forEach(i => css(lab(i), { fontSize: '56px', lineHeight: '1.12' }));
      css(lab(3), { fontSize: '44px' });
      css(this.sq.cells[3].c.querySelector('.p3-seq-note'), { whiteSpace: 'pre-line', fontWeight: '600', lineHeight: '1.38', marginTop: '14px' });
      // 칸 1~3 위 묶음 이름 줄
      const c3r = 120 + W[0] + W[1] + W[2] + 2 * G;
      this.gl = tx('div', 'a', el, null, { left: '120px', top: '342px', width: (c3r - 120) + 'px', height: '60px', boxSizing: 'border-box', borderBottom: '3px solid #8A8A86', whiteSpace: 'pre', lineHeight: '1.2' });
      tx('span', '', this.gl, '임시 채팅', { fontSize: '40px', fontWeight: '800', color: 'var(--ink)' });
      tx('span', '', this.gl, '  ·  ', { fontSize: '34px', color: BRIGHT });
      tx('span', '', this.gl, '기대 결과 ', { fontSize: '34px', fontWeight: '800', color: ORANGE_TX });
      tx('span', '', this.gl, '질문은 하나씩, 모두 7개 이내', { fontSize: '34px', fontWeight: '600', color: 'var(--ink)' });
      this.b1 = rich(el, 'a', '입력', '질문마다 짧게 답하기', { left: '120px', top: '948px', fontSize: '36px', fontWeight: '600' });
      this.b2 = rich(el, 'a', '이름을 적었을 때', '「실습에서는 일반적인 말로 바꿔 적어 주세요」', { right: '120px', top: '948px', fontSize: '36px', fontWeight: '600', color: BRIGHT });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.st.render(lt); this.tt.render(lt);
      TH.reveal(this.gl, lt, 0.4, { dx: 0, dy: 10 });
      this.sq.render(lt);
      TH.reveal(this.b1, lt, 1.6, { dx: 0, dy: 10 });
      TH.reveal(this.b2, lt, 1.72, { dx: 0, dy: 10 });
    },
  });

  // ── s07 L12 확인 목록 ── 세 줄(64px, 점선 칸 96px, 보조 줄 36px). 칸은 참가자가 자기 표와 견줄 자리라 비워 둔다
  DECK.slide({
    id: 'p3-ch08-s07', dur: 2.6, steps: [], notes: NOTES['p3-ch08-s07'],
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = HD(el);
      this.st = TH.step(el, 3, 5, { x: 120, y: 158, at: 0.1 });
      this.tt = stepTitle(el, this.st, '표가 나오면 세 가지를 봅니다');
      this.ck = TH.checklist(el, [
        { text: '맡길 일과 사람이 하는 일이 단계마다 나뉘었다', note: '「에이전트에게 맡길 일」 · 「사람이 하는 일」', state: 'todo' },
        { text: '승인 지점마다 승인자가 있다', note: '「승인 지점(여기서 멈춘다)」 · 「승인자(직위나 역할)」', state: 'todo' },
        { text: '기관 이름·사람 이름·내부 수치가 표에 없다', note: '대화에 적었어도 표에는 옮기지 않는다', state: 'todo' },
      ], { y: 372, rowH: 172, size: 64, noteSide: 'below', box: 96, at: 0.5, each: 0.18 });
      this.ck.rows.forEach(r => {
        css(r.tt, { fontFamily: 'var(--display)', fontWeight: '800', letterSpacing: '-0.02em', lineHeight: '1.18', whiteSpace: 'nowrap' });
        if (r.nt) css(r.nt, { fontSize: '36px', lineHeight: '1.35', marginTop: '8px', color: BRIGHT, fontWeight: '500' });
      });
      const BY = 372 + 172 * 3 + 22;
      this.b1 = tx('div', 'a', el, '세 가지가 모두 맞으면 됩니다', { left: '120px', top: BY + 'px', fontFamily: 'var(--display)', fontSize: '48px', fontWeight: '800', lineHeight: '1.2', letterSpacing: '-0.02em', color: 'var(--ink)', whiteSpace: 'nowrap' });
      this.b2 = tx('div', 'a', el, '답하지 않은 칸은 「확인 필요」', { right: '120px', fontSize: '38px', fontWeight: '600', lineHeight: '1.3', color: BRIGHT, whiteSpace: 'nowrap' });
      this.b2.style.top = (BY + this.b1.offsetHeight - this.b2.offsetHeight - 2) + 'px';
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.st.render(lt); this.tt.render(lt); this.ck.render(lt);
      TH.reveal(this.b1, lt, 1.6, { dx: -16 });
      TH.reveal(this.b2, lt, 1.75, { dx: 0, dy: 10 });
    },
  });

  // ── s08 L6 단계 칸과 원문(양식 파일) ── 왼쪽 열: 단계 칸, 64px 제목 두 줄, 묶음 넷. 오른쪽: 양식 종이 아홉 줄, 붙일 줄 둘은 주황 테두리와 검정 이름표
  DECK.slide({
    id: 'p3-ch08-s08', dur: 2.9, steps: [], notes: NOTES['p3-ch08-s08'],
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = HD(el);
      this.st = TH.step(el, 4, 5, { x: 120, y: 170, at: 0.1 });
      this.tt = TH.title(el, '창을 닫기 전에 표를\n양식에 옮깁니다', { x: 120, y: 360, size: 64, exact: true, w: 560, at: 0.3 });
      // 묶음 넷: 이름(주황 글자 800)을 값 앞에 같은 줄로 붙인다
      const G = [['저장할 파일', 'lab8/승인지점표_양식.md', true], ['복사', '답변을 마우스로 끌어 선택 → Ctrl+C · Command+C'], ['붙일 곳', '세 항목 · 승인 지점 표를 오른쪽 표시 아래에'], ['저장', 'Ctrl+S(Windows) · Command+S(macOS)']];
      const make = vs => G.map(([k, v, mono]) => {
        const b = tx('div', 'a', el, null, { left: '120px', width: '540px', fontSize: vs + 'px', fontWeight: '600', lineHeight: '1.3', color: 'var(--ink)', wordBreak: 'keep-all' });
        tx('span', '', b, k, { fontWeight: '800', color: ORANGE_TX });
        b.appendChild(document.createTextNode(' '));
        tx('span', mono ? 'p3-mono' : '', b, v, mono ? { whiteSpace: 'nowrap', fontSize: (vs - 2) + 'px' } : null);
        return b;
      });
      const y0 = 360 + this.tt.el.offsetHeight + 22;
      for (const vs of [38, 36, 34]) {
        if (this.gr) this.gr.forEach(b => b.remove());
        this.gr = make(vs);
        if (this.gr.reduce((a, b) => a + b.offsetHeight, 0) + 3 * 14 <= 975 - y0) break;
      }
      stack(this.gr, y0, 975, 14, 30);
      const DX = 700, DY = 170;
      this.dc = TH.doc(el, { x: DX, y: DY, w: 1100, size: 38, mono: true, labelSize: 34, label: '승인지점표_양식.md', at: 0.35, each: 0.05, lines: [
        '# 내 업무의 승인 지점 표', '## 세 항목', '[항목 1. 목적과 결과물]', '[항목 2. 참고 자료와 제외 범위]', '[항목 3. 완료 기준과 승인 조건]',
        '## 승인 지점 표', '| 단계 | 에이전트에게 맡길 일 | … | 판정 기준 |', '## 시험해 볼 것', '## 옆 사람이 찾은 빠진 승인 지점',
      ] });
      const p = this.dc.el, rows = [...p.querySelectorAll('.p3-doc-line')];
      css(p, { padding: '30px 52px 34px 64px' });
      css(p.querySelector('.p3-doc-label'), { paddingBottom: '14px', marginBottom: '12px' });
      rows.forEach(r => css(r, { lineHeight: '1.38', marginTop: '8px', whiteSpace: 'nowrap' }));
      [0, 1, 5, 7, 8].forEach(i => css(rows[i], { fontWeight: '700' }));
      const MONO = { fontFamily: 'var(--mono)', fontSize: '38px', fontWeight: '700' };
      // 붙일 줄: 주황 4px 테두리(왼쪽부터 그어진다)와 검정 면 이름표
      this.pins = [[1, '세 항목은 이 줄 아래에', 1.5], [5, '표는 이 줄 아래에', 1.8]].map(([i, t, at]) => {
        const tw = meas(el, rows[i].textContent, MONO);
        const box = tx('div', '', rows[i], null, { position: 'absolute', left: '-14px', top: '-4px', width: (tw + 28) + 'px', bottom: '-4px', border: '4px solid var(--p3-orange)', borderRadius: '10px', boxSizing: 'border-box' });
        const tag = tx('div', '', rows[i], t, { position: 'absolute', left: (tw + 40) + 'px', top: '50%', marginTop: '-25px', padding: '4px 16px', borderRadius: '8px', background: 'var(--p3-black)', color: 'var(--p3-paper)',
          fontFamily: 'var(--body)', fontSize: '34px', fontWeight: '800', lineHeight: '1.25', whiteSpace: 'nowrap' });
        return { box, tag, at };
      });
      { const tw = meas(el, rows[7].textContent, MONO);
        this.later = tx('div', '', rows[7], '오늘은 비워 둡니다 · 9장에서 다시', { position: 'absolute', left: (tw + 36) + 'px', top: '50%', marginTop: '-22px', fontFamily: 'var(--body)', fontSize: '34px', fontWeight: '800', lineHeight: '1.3', color: '#5A5A55', whiteSpace: 'nowrap' }); }
      this.bd = tx('div', 'a', el, '저장하지 않은 임시 채팅은 다시 열 수 없습니다', { left: DX + 'px', top: (DY + p.offsetHeight + 22) + 'px', fontSize: '40px', fontWeight: '800', lineHeight: '1.25', color: 'var(--ink)', whiteSpace: 'nowrap' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.st.render(lt); this.tt.render(lt); this.dc.render(lt);
      this.gr.forEach((b, i) => TH.reveal(b, lt, 0.7 + i * 0.12));
      this.pins.forEach(({ box, tag, at }) => {
        const q = prog(lt, at, 0.4, ease.outQuart);
        box.style.clipPath = q < 1 ? `inset(0 ${((1 - q) * 100).toFixed(2)}% 0 0)` : 'none';
        box.style.opacity = q > 0 ? '1' : '0';
        TH.reveal(tag, lt, at + 0.2, { dx: -12, dur: 0.35 });
      });
      TH.reveal(this.later, lt, 2.1, { dx: -12, dur: 0.35 });
      TH.reveal(this.bd, lt, 2.3, { dx: 0, dy: 10 });
    },
  });

  // ── s09 L4 가로 순서(적는 방법)와 다음 질문 ── 칸 셋, 아래 왼쪽 찾은 예와 적을 곳, 아래 오른쪽 다음 질문(주황 면)
  DECK.slide({
    id: 'p3-ch08-s09', dur: 3.4, steps: [], notes: NOTES['p3-ch08-s09'],
    setup(el) {
      this.bg = TH.bg(el, 'lab');
      this.hd = HD(el);
      this.st = TH.step(el, 5, 5, { x: 120, y: 158, at: 0.1 });
      this.tt = stepTitle(el, this.st, '옆 사람 표에서 빠진 승인 지점을 찾습니다');
      const SY = 410, SH = 300;
      const items = [{ label: '옆 사람과 노트북을 바꿉니다' }, { label: '그 노트북에 열린 양식 맨 아래 칸에 적습니다' },
        { label: TH.keepWords('적은 사람이 저장(Ctrl+S · Command+S)하고 돌려줍니다', ['Ctrl+S · Command+S)하고']) }];
      for (const size of [48, 46, 44]) {
        if (this.sq) { this.sq.cells.forEach(c => c.c.remove()); el.querySelectorAll('.p3-seq-group').forEach(g => g.remove()); }
        this.sq = TH.sequence(el, items, { y: SY, h: SH, gap: 16, size, numSize: 96, at: 0.5, each: 0.1, groups: [{ from: 0, to: 2, label: '적는 방법' }] });
        if (this.sq.cells.every(c => c.c.scrollHeight <= SH + 1)) break;
      }
      css(el.querySelector('.p3-seq-group'), { top: '342px', height: '60px', fontSize: '40px', fontWeight: '800', color: 'var(--ink)', borderBottom: '3px solid #8A8A86' });
      // 아래 왼쪽: 찾은 예 두 줄, 적을 곳 두 줄
      const LY = SY + SH + 16;
      this.k = tx('div', 'a', el, '찾은 예', { left: '120px', top: LY + 'px', fontSize: '34px', fontWeight: '800', lineHeight: '1.3', color: ORANGE_TX, whiteSpace: 'nowrap' });
      this.exs = ['외부 서비스에 자료를 넣기 전 확인', '규정이 바뀌면 다시 시험'].map((t, i) => tx('div', 'a', el, t, { left: '120px', top: (LY + 42 + i * 60) + 'px',
        fontFamily: 'var(--display)', fontSize: '50px', fontWeight: '800', lineHeight: '1.15', letterSpacing: '-0.02em', color: 'var(--ink)', whiteSpace: 'nowrap' }));
      const WY = LY + 42 + 2 * 60 + 12;
      const W = { left: '120px', fontSize: '34px', fontWeight: '600', lineHeight: '1.3', color: BRIGHT, whiteSpace: 'nowrap' };
      this.w1 = tx('div', 'a', el, null, Object.assign({ top: WY + 'px' }, W));
      tx('b', '', this.w1, '적을 곳', { fontWeight: '800', color: 'var(--ink)' });
      this.w1.appendChild(document.createTextNode(' · '));
      tx('span', 'p3-mono', this.w1, '## 옆 사람이 찾은 빠진 승인 지점', { fontSize: '32px' });
      this.w1.appendChild(document.createTextNode(' ·'));
      this.w2 = tx('div', 'a', el, '단계 · 승인 지점 · 승인자', Object.assign({ top: (WY + 44) + 'px' }, W));
      // 아래 오른쪽: 다음 질문(두 줄)
      const NX = 1010;
      this.nq = TH.nextQ(el, { x: NX, bottom: WY + 88, maxW: 1800 - NX, lead: '9장', size: 44, keep: ['내일 무엇을 하는가', '무엇이라고 답하고,'],
        text: '오늘의 세 질문에 무엇이라고 답하고, 내일 무엇을 하는가', at: 2.3 });
      this.nq.el.style.left = (1800 - this.nq.w) + 'px';
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx); this.hd.render(lt); this.st.render(lt); this.tt.render(lt);
      this.sq.render(lt);
      TH.reveal(this.k, lt, 1.2, { dx: -12 });
      this.exs.forEach((e, i) => TH.reveal(e, lt, 1.32 + i * 0.12, { dx: -16 }));
      TH.reveal(this.w1, lt, 1.7, { dx: 0, dy: 10 });
      TH.reveal(this.w2, lt, 1.8, { dx: 0, dy: 10 });
      this.nq.render(lt, ctx);
    },
  });
})();
