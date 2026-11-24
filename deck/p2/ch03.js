/* 파트 2 · 3장 「민원 상담 프로젝트 설계서 한 장」 — 레이아웃 목록(p2.md 8절)으로 다시 만든 장면 코드
 * 원고: plan/slides/p2-ch03.json · 배정표: plan/assets/p2_layout_ch03.md · 본보기: deck/p2/ch00.js s22·s24, 시범 챕터 deck/p2/ch06.js
 * 키 누름은 s06(넘김 카드)과 s07(손들기 grow)에 한 번씩이다. 나머지 장은 모든 조각이 차례로 놓여 2.5초 안에 끝 상태가 된다.
 * 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다. */
(function () {
  'use strict';
  const { css, h, prog, lerp, ease } = REEL;
  DECK.config({ part: 'p2', chapter: 'ch03', title: '민원 상담 프로젝트 설계서 한 장' });

  const NOTES = /*NOTES*/{"p2-ch03-s01": "2장에서 민원 240건을 세어 시범 범위를 수강료 환불과 주차 요금 감면 두 유형으로 정했습니다. 이 두 유형을 맡을 민원 상담 프로젝트가 무엇을 근거로 읽고 어떤 규칙으로 답할지는 아직 정하지 않았습니다. 3장에서는 한서윤 주임이 프로젝트를 만들기 전에 이것을 종이 한 장에 정해 적습니다. 3장의 질문은 화면에 보이는 그대로입니다.", "p2-ch03-s02": "한서윤 주임은 2장에서 수강료 환불 74건과 주차 요금 감면 61건, 240건 가운데 135건을 시범 범위로 정했습니다. 파트 1 5장에서 저장한 세 항목 요청문도 가지고 있습니다. ChatGPT에서 바로 프로젝트를 만들 수도 있지만, 한서윤 주임은 그 전에 프로젝트에 무엇을 정해 둘지 종이 한 장에 먼저 적기로 합니다. 이 한 장을 설계서라고 부릅니다. 왜 만들기 전에 적는지부터 보겠습니다.", "p2-ch03-s03": "파트 1 3장에서 모델은 정하지 않은 것을 추측으로 채운다고 했고, 파트 1 2장의 한 줄 요청이 그 예입니다. 근거 자료를 정하지 않자 6회 모두 공단 규정이 아닌 일반 법령이나 일반 기준을 근거로 들었습니다. 지급 기한은 규정의 7영업일 대신 3영업일이 4회, 확인 후 안내가 2회였습니다. 이 6회는 같은 요청을 같은 조건으로 여러 번 보내 보려고 강의 전에 1장에서 말한 codex로 보낸 것이라, 여러분 ChatGPT 화면의 문장과는 다를 수 있습니다. 설계는 이런 빈칸을 프로젝트가 추측하기 전에 사람이 정해 적어 두는 일입니다. 한서윤 주임은 근거를 프로젝트 파일 3개로 정하고, 파일에 없는 금액과 기한은 지어내지 않으며 범위 밖 문의는 담당자 확인으로 넘긴다고 적었습니다. 적어 둔 규칙도 확률로 지켜진다는 것을 파트 1 7장에서 보았으므로, 적은 대로 답하는지는 5장과 6장에서 시험합니다. (강사 확인: ChatGPT 화면에서 같은지는 강의 전날 K-13에서 확인합니다.)", "p2-ch03-s04": "설계서의 칸은 다섯 개이고, 화면은 한서윤 주임이 채운 예입니다. 다섯 칸의 전체 문장은 실습 묶음의 lab3/완성본/설계서_예.md에 있습니다. 1번 역할과 범위에는 누구의 무슨 일을 돕는지와 다루는 민원 유형을, 2번 프로젝트 파일에는 근거로 쓰는 파일 이름을, 3번 답변 형식에는 칸의 이름과 순서를 적습니다.", "p2-ch03-s04a": "4번에는 하지 않는 일과 담당자 확인으로 넘기는 경우, 넘길 부서를 적습니다. 5번 완료 기준에는 답변 하나를 쓸 수 있다고 판단하는 기준을 적습니다.", "p2-ch03-s05": "설계서의 칸은 대부분 파트 1 5장의 세 항목 요청문에서 옮겨 옵니다. 항목 1의 목적은 1번 칸으로, 결과물 형식인 답변의 다섯 칸은 3번 칸으로 갑니다. 항목 2의 참고 자료는 2번 칸으로, 제외 범위는 4번 칸으로 가고, 항목 3의 완료 기준은 5번 칸으로 갑니다. 마지막으로 요청문에 없던 것 세 가지를 더합니다. 2장에서 정한 주차 요금 감면이 1번 칸의 범위에 들고, 공영주차장 운영 지침과 담당 부서 안내 파일 2개가 2번 칸에, 범위 밖 문의를 넘길 부서와 내선이 4번 칸에 들어갑니다. 항목 3의 승인 조건인 오민석 팀장의 발송 전 확인은 설계서 예의 칸에 없습니다. 발송은 프로젝트가 아니라 사람이 정하는 일이고, 10장 승인에서 다시 봅니다.", "p2-ch03-s06": "설계서의 문장은 프로젝트가 읽고, 뒤에서 시험하고 검토할 때 사람이 다시 읽습니다. 「근거를 잘 밝힌다」는 무엇을 하면 지킨 것인지 읽는 사람마다 다르게 판단합니다. (키) 「[근거] 칸에 규정 이름과 조문 번호를 적는다」는 답변을 열어 그 칸을 보면 누구나 같은 판정을 냅니다. 계산과 개인정보도 계산식이 붙었는가, 이름과 전화번호가 남았는가로 바꿔 적으면 같은 방식으로 확인됩니다. 조문 번호는 5장에서 채점할 때 기대 답과 함께 대조하는 항목입니다.", "p2-ch03-s07": "손을 들어 주세요. 네 문장 가운데 답변을 열어 보면 지켰는지 바로 가릴 수 있는 문장은 몇 번입니까. (키) 답은 2번과 4번으로, 범위 밖 문의에 담당 부서와 내선이 적혔는지, 다섯 칸이 순서대로 있는지는 누가 보아도 같게 판정합니다. 1번의 「짧게」와 3번의 「꼼꼼히」는 읽는 사람마다 기준이 다릅니다. 1번은 「[답변]은 5문장 이내」로, 3번은 「[근거]의 조문이 파일에 있다」로 바꿔 적으면 확인할 수 있습니다.", "p2-ch03-s08": "파트 1 2장의 한 줄 요청을 강의 전에 codex로 6회 보냈을 때 답변은 모두 칸 없이 문단으로 나와서, 근거가 어느 문단에 있는지 읽어서 찾아야 했습니다. 여러분 화면의 답은 다를 수 있습니다. 설계서 3번 칸에 답변의 다섯 칸을 정해 두면 모든 답이 같은 자리에 같은 내용을 담습니다. 그래서 답을 확인할 때마다 [근거] 칸부터 보면 됩니다. 5장에서는 질문마다 맞는 답과 근거 조문을 미리 정해 둔 표로 프로젝트를 시험하는데, 이때 [근거] 칸의 조문이 미리 정해 둔 조문과 같은지 봅니다. 7장에서는 답을 쓴 프로젝트와 따로 검토자를 두어 [근거] 칸의 조문이 규정에 실제로 있는지 보게 합니다. 발송 전에 한서윤 주임이 규정 원문과 대조할 때도 [계산]과 [근거] 칸을 찾으면 됩니다. 형식을 고정하는 목적은 답을 확인하는 사람이 볼 곳을 정해 두는 데 있습니다.", "p2-ch03-s09": "3장을 정리합니다. 한서윤 주임은 프로젝트를 만들기 전에 설계서의 다섯 칸에 범위, 파일, 답변 형식, 넘기는 조건, 완료 기준을 정해 적었습니다. 문장은 누가 읽어도 지켰는지 같게 판정할 수 있게 쓰고, 답변 형식은 다섯 칸으로 고정했습니다. 이 결정은 파트 1 7장에서 본 프로젝트 지침에, 2번 칸의 파일 3개는 프로젝트 파일에 들어갑니다. 설계서는 선택으로 직접 써 볼 수 있고, lab3/단계.md 6번이 그 순서입니다. lab3/설계서_양식.md를 Windows에서는 메모장, macOS에서는 텍스트 편집기로 엽니다. 파트 1 5장에서 lab1/세항목_요청문_양식.md에 저장한 요청문을 칸마다 「내 설계」에 옮겨 적고 같은 이름으로 저장합니다(Windows는 Ctrl+S, macOS는 Command+S). 저장한 요청문이 없으면 lab1/완성본/세항목_요청문_예.md를 옮깁니다. 수업 시간을 따로 두지 않으니 4장 실습에서 5번까지 끝내고 시간이 남으면 하고, 못 하면 수업 뒤에 합니다. 다 쓴 설계서는 「요청 1」로 지침으로 바꿔 지침 1판과 견줘 보기만 하고, 프로젝트의 지침 칸은 지침 1판 그대로 둡니다. 그러면 이 설계서를 ChatGPT에서 어떻게 프로젝트로 만들까요? 4장에서 직접 만듭니다."};
  const CH = '민원 상담 프로젝트 설계서 한 장';
  const C = THEME.C, M = THEME.mono;
  const px = v => v.toFixed(1) + 'px';

  // 슬라이드 하나: build(el) 가 돌려준 부품을 차례로 그린다. 부품은 모두 render(lt, ctx) 를 가진다
  const lay = (dur, build, steps) => ({ dur, steps: steps || [],
    setup(el) { this.parts = build.call(this, el).filter(Boolean); },
    render(lt, ctx) { this.parts.forEach(p => p.render(lt, ctx)); } });
  const top = (el, title, fiction) => THEME.top(el, { chapter: 3, chapterTitle: CH, title, fiction });

  // 글 안의 색지 조각(레몬·주홍·초록). 흰 가장자리와 작은 그림자를 둔다. 등장은 pop 으로 따로 준다
  const TONE = { lemon: [C.lemon, C.ink], red: [C.red, '#FFFFFF'], green: [C.green, C.cream], white: [C.white, C.ink] };
  const chip = (t, tone = 'lemon', size = 34, cls = 'c3-chip') => `<span class="${cls}" style="display:inline-block;font-size:${size}px;font-weight:700;line-height:1.15;` +
    `padding:6px 14px 7px;white-space:nowrap;background:${TONE[tone][0]};color:${TONE[tone][1]};box-shadow:0 0 0 3px ${C.white},0 3px 6px rgba(30,22,16,.28)">${t}</span>`;
  // 번호 조각(Anton 숫자)
  const numChip = (n, tone = 'lemon', size = 44) => `<span class="c3-n" style="display:inline-flex;flex:none;align-items:center;justify-content:center;box-sizing:border-box;` +
    `width:${Math.round(size * 1.36)}px;height:${Math.round(size * 1.44)}px;padding-top:3px;font-family:var(--num);font-weight:400;font-size:${size}px;line-height:1;` +
    `background:${TONE[tone][0]};color:${TONE[tone][1]};box-shadow:0 0 0 3px ${C.white},0 3px 6px rgba(30,22,16,.28)">${n}</span>`;
  // 종이 안 요소의 등장: 조금 크게 들렸다가 제자리에 붙는다(그림자 없이)
  const pop = (node, lt, at, rot = 0, from = 1.08, dur = 0.35) => THEME.lift(node, lt, at, { rot, shadow: false, dur, from });
  // 무대 기준 글자 폭(nowrap)
  function textW(parent, html, st) {
    const d = h('div', '', parent, html);
    css(d, Object.assign({ position: 'absolute', left: '0', top: '0', whiteSpace: 'nowrap', visibility: 'hidden' }, st));
    const w = d.offsetWidth; d.remove(); return w;
  }

  // ─────────────────────────────────────────────────────────────
  // s01 전환: p2-tr-place 를 좌우로 뒤집어 깔고, 오른쪽 크림 띠에 꼬리표, 음절 조각 제목, entry 질문
  DECK.slide({ id: 'p2-ch03-s01', notes: NOTES['p2-ch03-s01'], dur: 2.8, steps: [],
    setup(el) {
      this.vt = THEME.videoTitle(el, {
        kind: 'chapter', scene: 'place', flip: true, at: 0.2, kicker: '파트 2 · 3장',
        src: '../assets/video/p2/p2-tr-place.mp4', poster: '../assets/video/p2/p2-tr-place.jpg',
        title: '민원 상담 프로젝트\n설계서 한 장',
        sub: '고른 범위에서 프로젝트가 무엇을 읽고\n어떤 규칙으로 답해야 하는가',
      });
      // 원고: 영상은 한 번 재생하고 마지막 장면에서 멈춘다. 이 영상은 반복용이라 끝 0.5초에 조각이 옅어지므로
      // 끝 0.6초 앞에서 멈춘다. 발표 모드의 <video> 에만 해당한다(렌더 모드는 poster 를 쓴다)
      const v = this.vt.el.querySelector('video');
      if (v) {
        v.loop = false;
        v.addEventListener('timeupdate', () => { if (v.duration && v.currentTime >= v.duration - 0.6) v.pause(); });
      }
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // ─────────────────────────────────────────────────────────────
  // s02 인물과 대사: 한서윤 주임(1.9배)과 대사 종이. 대사 종이 아래에 쪽지 ①(시범 범위 막대 두 개), 쪽지 ②(세 칸으로 접은 종이), 사진 조각(설계서)
  DECK.slide({ id: 'p2-ch03-s02', notes: NOTES['p2-ch03-s02'], ...lay(2.0, el => {
    const bg = THEME.bg(el, 'base');
    const hd = THEME.header(el, { chapter: 3, title: CH, fiction: true });
    const sp = THEME.speech(el, { who: 'han', scale: 1.9, x: 130, org: true, bubble: { x: 740, w: 1040 }, at: 0.2,
      text: '프로젝트를 만들기 전에\n정할 것부터 적겠습니다.',
      sub: '시범 범위: 수강료 환불 · 주차 요금 감면<br>가진 것: 파트 1 5장의 세 항목 요청문' });
    const NY = Math.max(712, sp.el.offsetTop + sp.el.offsetHeight + 52), NH = 978 - NY;
    // ① 크림 쪽지: 2장과 같은 오린 막대 두 개(36px). 막대 길이는 건수에 비례하고, 짧은 막대에도 글자가 들게 정한다
    const BARS = [['수강료 환불 74건', 74], ['주차 요금 감면 61건', 61]], BH = 78, BG = 22;
    const tws = BARS.map(([t]) => textW(el, t, { fontSize: '36px', fontWeight: 700 }));
    const k = Math.max(...BARS.map(([, n], i) => (tws[i] + 92) / n));    // 글자 왼쪽 24px + 오른쪽 끝 테이프 자리
    const bw = BARS.map(([, n]) => Math.round(k * n));
    const X1 = 752, W1 = Math.max(...bw) + 52;
    const n1 = THEME.paper(el, { x: X1, y: NY, w: W1, h: NH, tone: 'cream', rot: -1, at: 1.0, seed: 3.1 });
    const by0 = Math.round((NH - (2 * BH + BG)) / 2) + 10;
    const bars = BARS.map(([t], i) => {
      const bp = THEME.paper(n1.el, { x: 26, y: by0 + i * (BH + BG), w: bw[i], h: BH, tone: 'kraft', torn: 'right', rot: i ? 0.6 : -0.5, at: 1.05 + i * 0.06, k: 0.6, seed: 4.2 + i });
      const tx = h('div', '', bp.inner, t);
      css(tx, { position: 'absolute', left: '24px', top: '0', bottom: '0', display: 'flex', alignItems: 'center', fontSize: '36px', fontWeight: 700, whiteSpace: 'nowrap', color: C.ink });
      const tp = THEME.tape(n1.el, { x: 26 + bw[i] - 54, y: by0 + i * (BH + BG) + 16, w: 66, rot: -12 + i * 7, tone: 'red', at: 1.1 + i * 0.06 });
      return { render(lt) { bp.render(lt); tp.render(lt); } };
    });
    const t1 = THEME.tag(n1.el, '시범 범위 · 135건', { x: 18, y: -30, at: 1.1, rot: -2 });
    // ② 크림 쪽지: 세 칸으로 접은 종이 그림
    const X2 = X1 + W1 + 24, W2 = 236;
    const n2 = THEME.paper(el, { x: X2, y: NY + 6, w: W2, h: NH - 6, tone: 'cream', rot: 1, at: 1.2, seed: 3.7 });
    const fold = h('div', '', n2.inner);
    const FW = 150, FH = 186;
    css(fold, { position: 'absolute', left: px((W2 - FW) / 2), top: px((NH - 6 - FH) / 2 + 16), width: px(FW), height: px(FH) });
    [0, 1, 2].forEach(i => {
      const pn = h('div', '', fold);
      css(pn, { position: 'absolute', left: px(i === 1 ? 10 : 0), top: px(i * FH / 3), width: px(FW), height: px(FH / 3), boxSizing: 'border-box', padding: '14px 16px 0',
        background: i === 1 ? '#EDE3CF' : C.white, borderTop: i ? '2px dashed rgba(30,22,16,.3)' : 'none', boxShadow: '0 3px 6px rgba(30,22,16,.18)' });
      [0.8, 0.55].forEach(f => { const ln = h('div', 'p2-tl', pn); css(ln, { position: 'relative', width: px((FW - 32) * f), marginBottom: '10px' }); });
    });
    const t2 = THEME.tag(n2.el, '세 항목 요청문', { x: -6, y: -30, at: 1.3, rot: 1.5 });
    // ③ 사진 조각: 클립보드(설계서 한 장)와 이름표
    const X3 = X2 + W2 + 24, W3 = 1800 - X3;
    const cut = THEME.cutout(el, '../assets/img/p2/p2-ch03-s02-clipboard_cut.png', { x: X3, y: NY - 40, w: W3, h: 300, rot: 3, at: 1.4, fallback: 'summary' });
    const t3 = THEME.tag(el, '설계서', { x: X3 + W3 / 2 - 64, y: NY + 214, at: 1.55, rot: -3 });
    return [bg, hd, sp, n1, ...bars, t1, n2, t2, cut, t3];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s03 좌우 대비: 왼쪽 크림 「정하지 않았을 때」 두 줄과 출처 줄, 오른쪽 초록 「설계서에 적은 결정」 세 줄(이름표만 주홍)
  DECK.slide({ id: 'p2-ch03-s03', notes: NOTES['p2-ch03-s03'], ...lay(2.0, el => {
    const bg = THEME.bg(el, 'base');
    const tp = top(el, '설계는 사람이 결정을 적어 두는 일입니다', true);
    const band = THEME.strip(el, '적지 않은 것은 ChatGPT가 추측으로 채웁니다', { x: 120, y: 234, size: 40, weight: 700, rot: -0.6, at: 0.2 });
    // 줄 첫머리 낱말(화살표 앞)은 700, 나머지는 400
    const rows = (list, line) => list.map(([a, b], i) => `<div class="c3-ln" style="font-weight:400;${i ? `margin-top:34px;padding-top:34px;border-top:3px dashed ${line}` : ''}"><span style="font-weight:700">${a}</span> → ${b}</div>`).join('');
    const vs = THEME.versus(el, { x: 120, y: 356, w: 800, h: 624, gap: 80, at: 0.3,
      left: { tag: '정하지 않았을 때 · 파트 1 2장', bodySize: 44,
        body: rows([['근거', '일반 법령·기준(6회 모두)'], ['지급 기한', '3영업일 4회,<br>확인 후 안내 2회']], 'rgba(30,22,16,.22)') },
      right: { tag: '설계서에 적은 결정 · 한서윤 주임', tagTone: 'red', bodySize: 44,
        body: rows([['근거', '프로젝트 파일 3개만'], ['파일에 없는 금액·기한', '<br>지어내지 않음'], ['범위 밖', '담당자 확인']], 'rgba(251,245,233,.35)') } });
    // 왼쪽 종이 아래쪽 출처 줄(34px, 흐린 글)
    const src = h('div', '', vs.left.inner, '공단 규정은 7영업일');
    css(src, { position: 'absolute', left: '52px', right: '52px', bottom: '46px', paddingTop: '18px', borderTop: '3px dashed rgba(30,22,16,.25)',
      fontSize: '34px', lineHeight: 1.36, fontWeight: 500, color: C.dim, wordBreak: 'keep-all' });
    // 글을 종이 안 세로 가운데에(왼쪽은 출처 줄 위의 빈 자리에서)
    const IH = 624 - 104;
    const fl = vs.left.inner.firstElementChild, fr = vs.right.inner.firstElementChild;
    css(fl, { marginTop: px(Math.max(34, (IH - 34 - (src.offsetHeight + 24) - fl.offsetHeight) / 2 + 34)) });
    css(fr, { marginTop: px(Math.max(34, (IH - 34 - fr.offsetHeight) / 2 + 34)) });
    const L = [...vs.left.inner.querySelectorAll('.c3-ln')], R = [...vs.right.inner.querySelectorAll('.c3-ln')];
    return [bg, tp, band, vs, { render(lt) {
      L.forEach((d, i) => pop(d, lt, 0.45 + i * 0.15, 0, 1.04));
      pop(src, lt, 0.8, 0, 1.03);
      R.forEach((d, i) => pop(d, lt, 0.95 + i * 0.15, 0, 1.04));
    } }];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s04 표 한 장: 설계서 1~3번 칸(머리 줄 없음). 첫 칸은 레몬 번호 조각과 칸 이름, 둘째 칸은 한서윤 주임의 작성 예(한 문장에 한 줄)
  DECK.slide({ id: 'p2-ch03-s04', notes: NOTES['p2-ch03-s04'], ...lay(1.9, el => {
    const bg = THEME.bg(el, 'base');
    const tp = top(el, '설계서에는 다섯 칸을 채웁니다', true);
    const name = (n, t) => `<span style="display:inline-flex;align-items:center;gap:20px;white-space:nowrap">${numChip(n, 'lemon', 44)}<span>${t}</span></span>`;
    const lines = arr => arr.map((t, i) => `<div class="c3-ln" style="text-wrap:balance;${i ? 'margin-top:16px' : ''}">${t}</div>`).join('');   // 두 줄이 되면 뜻 단위에서 고르게 나눈다
    const FMT = ['[민원 요지]', '[답변]', '[계산]', '[근거]', '[담당자 확인]'];
    const tb = THEME.table(el, { x: 120, y: 300, w: 1680, size: 40, cols: [], widths: [1, 2.8], at: 0.3, pad: [22, 28],
      label: '민원 상담 프로젝트 설계서 · 한서윤 주임 작성 예',
      rows: [
        [name(1, '역할과 범위'), lines(['고객지원팀 담당자의 민원 답변 초안 작성을 돕는다', '시범 범위는 체육센터 수강료 환불과 공영주차장 요금 감면 두 유형이다'])],
        [name(2, '프로젝트 파일'), lines(['새별_체육시설_이용규정.md', '새별_공영주차장_운영지침.md', '새별_담당부서_안내.md'].map(M))],
        // 줄을 바꿀 때는 화살표 뒤에서 바꾼다
        [name(3, '답변 형식'), lines([FMT.map((t, i) => `<span style="white-space:nowrap">${M(t)}${i < 4 ? ' →' : ''}</span>`).join(' ')])],
      ] });
    // 머리 줄이 없으므로 줄 높이를 글에 맞춰 나누고(남는 높이는 줄마다 고르게), 첫 칸 폭을 칸 이름에 맞춘다
    const cells = tb.cells, firsts = [0, 2, 4].map(i => cells[i].firstElementChild.firstElementChild);
    const c1 = Math.ceil(Math.max(...firsts.map(d => d.offsetWidth))) + 2 * 28 + 30;
    css(tb.grid, { gridTemplateRows: 'repeat(3, auto)', gridTemplateColumns: `${c1}px 1fr` });
    const rows = [0, 1, 2].map(r => ({ a: cells[2 * r].firstElementChild, b: cells[2 * r + 1].firstElementChild, n: cells[2 * r].querySelector('.c3-n') }));
    const file = THEME.strip(el, M('lab3/완성본/설계서_예.md'), { right: 1790, y: 266, size: 34, weight: 700, torn: 'left right', rot: 1.5, at: 1.2 });
    return [bg, tp, tb, { render(lt) {
      rows.forEach((r, i) => { pop(r.a, lt, 0.5 + i * 0.2, 0, 1.04); pop(r.b, lt, 0.5 + i * 0.2, 0, 1.03); pop(r.n, lt, 0.6 + i * 0.2, -4, 1.15, 0.25); });
    } }, file];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s04a 채점 기준: 5번 「완료 기준」 띠 네 줄(52px)과 오른쪽 대조 카드(4번 칸의 세 문장, 40px, 점선 구분)
  DECK.slide({ id: 'p2-ch03-s04a', notes: NOTES['p2-ch03-s04a'], ...lay(2.0, el => {
    const bg = THEME.bg(el, 'base');
    const tp = top(el, '넘기는 조건과 완료 기준도 적습니다', true);
    // 화면 검수(2026-11-24): 띠 글자 52px, 카드 문장 40px. 4번 칸의 긴 문장(약 50자)이 40px로 들도록 카드를 폭 660, y 270~980 으로 넓혔다
    const CX = 1140, CK = CX - 40 - 120, CY = 270, CW = 1800 - CX, CH = 980 - CY, PAD = 38;
    const ITEMS = ['금액에 계산식이 있다', '[근거]의 조문이 파일에 실제로 있다', '개인정보가 없다', '형식 다섯 칸이 모두 있다'];
    // 띠마다 줄 수를 미리 재서 네 장이 y 300~980 을 채우도록 간격을 정한다(띠 안 글 폭 = 띠 폭 - 번호 자리 130 - 여백 40)
    const rowH = ITEMS.map(t => Math.max(140, Math.ceil(48 + (textW(el, t, { fontSize: '52px', fontWeight: 600 }) > CK - 170 ? 2 : 1) * 52 * 1.32)));
    const gap = Math.max(16, Math.min(40, Math.floor((680 - rowH.reduce((a, b) => a + b, 0)) / 3)));
    const ck = THEME.checklist(el, { x: 120, y: 300, w: CK, size: 52, gap, at: 0.3, each: 0.15, items: ITEMS });
    const tg = THEME.tag(el, '5. 완료 기준', { x: 104, y: 250, at: 0.2, rot: -1.5 });
    const SENT = ['파일에 없는 금액·기한을 지어내지 않는다',
      '시범 범위 밖(대관, 시설 고장, <span style="white-space:nowrap">사고·분쟁,</span> 과태료)은 담당자 확인으로 넘기고 담당 부서와 내선을 적는다',   // 「사고·분쟁」이 가운뎃점에서 갈리지 않게
      '개인정보는 답변에 옮기지 않는다'];
    const LAB = '4. 금지와 담당자에게 넘기는 조건';
    const labOne = textW(el, LAB, { fontSize: '34px', fontWeight: 700 }) <= CW - 2 * PAD;
    const card = THEME.card(el, { x: CX, y: CY, w: CW, h: CH, pad: PAD, tone: 'cream', rot: 1, at: 1.0, tape: true,
      label: labOne ? LAB : '4. 금지와 담당자에게<br>넘기는 조건', labelSize: 34, bodySize: 40,
      body: SENT.map((t, i) => `<div class="c3-ln" style="line-height:1.38;${i ? 'border-top:3px dotted rgba(30,22,16,.35);margin-top:18px;padding-top:18px' : 'margin-top:24px'}">${t}</div>`).join('') });
    const S = [...card.body.querySelectorAll('.c3-ln')];
    // 남는 높이를 문장 사이 구분선의 위아래에 고르게 나눈다(카드 아래쪽이 비지 않게)
    const spare = CH - PAD - (card.flow.offsetTop + card.flow.offsetHeight) - 6;
    if (spare > 0) S.slice(1).forEach(d => css(d, { marginTop: px(18 + spare / 4), paddingTop: px(18 + spare / 4) }));
    return [bg, tp, ck, tg, card, { render(lt) { S.forEach((d, i) => pop(d, lt, 1.15 + i * 0.12, 0, 1.04)); } }];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s05 좌우 대비(옮겨 감): 왼쪽 크림 종이에 세 항목 띠, 오른쪽 크림 종이에 설계서 다섯 칸 이름과 출처 조각.
  // 레몬 조각은 요청문에서 옮겨 온 것, 주홍 조각은 요청문에 없던 것이다. 화살표는 그리지 않는다
  DECK.slide({ id: 'p2-ch03-s05', notes: NOTES['p2-ch03-s05'], ...lay(2.4, el => {
    const bg = THEME.bg(el, 'base');
    const tp = top(el, '세 항목 요청문을 설계서 칸에 옮깁니다', false);
    const band = THEME.strip(el, '요청문에 없던 것 세 가지를 더합니다', { x: 120, y: 234, size: 40, weight: 700, rot: -0.6, at: 0.2 });
    // 왼쪽: 요청문 종이, 왼쪽 위 모서리에 클립으로 묶은 종이 사진, 띠 세 줄(40px)
    const LP = THEME.paper(el, { x: 120, y: 356, w: 800, h: 624, tone: 'cream', rot: -0.9, at: 0.3, seed: 5.5 });
    const SL = [['항목 1', '목적과 결과물'], ['항목 2', '참고 자료와 제외 범위'], ['항목 3', '완료 기준과 승인 조건']];
    const strips = SL.map(([a, b], i) => THEME.strip(LP.el, `<b>${a}</b> ${b}`, { x: i ? 56 : 236, y: [150, 310, 470][i], w: i ? 688 : 508,
      size: 40, weight: 500, tone: 'kraft', torn: 'right', rot: [0.6, -0.5, 0.4][i], at: 0.45 + i * 0.15, padX: 30, padY: 28, seed: 6 + i }));
    const lt0 = THEME.tag(LP.el, '세 항목 요청문 · 파트 1 5장', { x: 210, y: -28, at: 0.4 });
    const clip = THEME.cutout(el, '../assets/img/p2/p2-ch03-s05-clip_cut.png', { x: 84, y: 300, w: 200, h: 266, rot: -8, at: 0.85, fallback: 'doc' });
    // 오른쪽: 설계서 칸 종이. 칸마다 번호 조각, 칸 이름(40px), 출처 조각(34px). 들지 않으면 조각이 다음 줄로 간다
    const RP = THEME.paper(el, { x: 1000, y: 366, w: 800, h: 624, tone: 'cream', rot: 0.9, at: 0.8, seed: 6.5 });
    const ROWS = [
      ['역할과 범위', [['항목 1 · 목적', 'lemon'], ['+ 주차 요금 감면 · 2장', 'red']]],
      ['프로젝트 파일', [['항목 2 · 참고 자료', 'lemon'], ['+ 파일 2개', 'red']]],
      ['답변 형식', [['항목 1 · 결과물 형식', 'lemon']]],
      ['금지와 담당자에게 넘기는 조건', [['항목 2 · 제외 범위', 'lemon'], ['+ 넘길 부서와 내선', 'red']]],
      ['완료 기준', [['항목 3', 'lemon']]],
    ];
    const col = h('div', '', RP.inner);
    css(col, { position: 'absolute', left: '44px', right: '40px', top: '0', color: C.ink });
    ROWS.forEach(([nm, cs], i) => {
      const r = h('div', 'c3-row', col);
      css(r, { display: 'flex', alignItems: 'flex-start', gap: '18px', marginTop: i ? '22px' : '0' });
      r.innerHTML = numChip(i + 1, 'lemon', 40) +
        `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px 12px;min-height:58px"><span class="c3-nm" style="font-size:40px;font-weight:700;line-height:1.3;margin-right:6px">${nm}</span>` +
        cs.map(([t, tone]) => chip(t, tone, 34, 'c3-chip c3-' + tone)).join('') + '</div>';
    });
    css(col, { top: px(Math.round((624 - col.offsetHeight) / 2)) });
    if (col.offsetHeight > 624 - 60) console.warn('[DECK] s05 오른쪽 종이 글이 넘친다', col.offsetHeight);
    const rws = [...col.querySelectorAll('.c3-row')].map(r => ({ n: r.querySelector('.c3-n'), nm: r.querySelector('.c3-nm') }));
    const lem = [...col.querySelectorAll('.c3-lemon')], red = [...col.querySelectorAll('.c3-red')];
    return [bg, tp, band, LP, ...strips, lt0, clip, RP, { render(lt) {
      rws.forEach((r, i) => { pop(r.n, lt, 0.9 + i * 0.1, -4, 1.15, 0.25); pop(r.nm, lt, 0.9 + i * 0.1, 0, 1.04); });
      lem.forEach((c, i) => pop(c, lt, 1.3 + i * 0.08, [-1.5, 1, -1, 1.5, -0.5][i], 1.1, 0.3));
      red.forEach((c, i) => pop(c, lt, 1.8 + i * 0.15, [1.5, -1.5, 1][i], 1.1, 0.3));
    } }];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s06 카드 격자(넘김, 3열): 앞면 크림 「확인하기 어려운 문장」, 키를 한 번 누르면 세 장이 0.15초 간격으로 넘어가 초록 뒷면 「확인할 수 있는 문장」
  DECK.slide({ id: 'p2-ch03-s06', notes: NOTES['p2-ch03-s06'], ...lay(2.6, el => {
    const bg = THEME.bg(el, 'base');
    const tp = top(el, '확인할 수 있는 문장으로 적습니다', false);
    const band = THEME.strip(el, '누가 읽어도 지켰는지 같게 판단합니다', { x: 120, y: 236, size: 36, weight: 700, rot: -0.6, at: 0.2 });
    const L = '확인하기 어려운 문장 · 예시';
    const B = t => `<div class="p2-card-l" style="font-size:34px">확인할 수 있는 문장</div><div class="p2-card-t" style="font-size:60px;line-height:1.28;margin-top:24px">${t}</div>`;
    const gd = THEME.grid(el, { cols: 3, x: 120, y: 350, w: 1680, h: 630, gap: 40, at: 0.3, each: 0.15, titleSize: 76, flipAt: 1.7, flipEach: 0.15, items: [
      { num: 1, label: L, title: '근거를 잘 밝힌다', back: B('[근거] 칸에 규정 이름과 조문 번호를 적는다') },
      { num: 2, label: L, title: '정확하게 계산한다', back: B('금액에는 계산식을 붙인다') },
      { num: 3, label: L, title: '개인정보에 주의한다', back: B('이름·전화번호를 답변에 옮기지 않는다') }] });
    const CWD = Math.floor((1680 - 80) / 3);
    const tapes = gd.cards.map((c, i) => THEME.tape(c.el, { x: CWD / 2 - 40, y: -22, w: 140, rot: [-4, 3, -2][i], tone: 'clear', at: 0.4 + i * 0.15 }));
    return [bg, tp, band, gd, ...tapes];
  }, [1.6]) });

  // ─────────────────────────────────────────────────────────────
  // s07 손들기(grow): 보기 네 줄(44px). 키를 한 번 누르면 답 카드가 넘어가며 가운데로 커지고 물음 종이는 좁아져 물러난다.
  // 「② ④」는 Anton 에 원 숫자 글리프가 없어 본문 서체(A2Z 700)로 쓰고 카드 폭에 맞춘다(fitSize 220)
  DECK.slide({ id: 'p2-ch03-s07', notes: NOTES['p2-ch03-s07'], ...lay(2.8, el => {
    const bg = THEME.bg(el, 'base');
    const tp = top(el, '확인할 수 있는 문장은 몇 번입니까?', false);
    const Q = ['① 답변은 짧게 쓴다', '② 범위 밖 문의는 담당 부서와 내선을 적어 넘긴다', '③ 규정을 꼼꼼히 확인하고 답한다', '④ 답변은 다섯 칸 순서로 쓴다'];
    // 화면 검수(2026-11-24): 물러난 뒤에도 보기가 40px 로 읽히게 보기 48px, 답 카드 자리 x 860(물음 종이 폭 700), 아래 두 줄 44px
    const hu = THEME.handsUp(el, { grow: true, wrap: true, size: 48, cardX: 860, prompt: null, front: '', frontSize: 52, revealAt: 1.7, at: 0.3, backTone: 'green', fitSize: 220,
      question: Q.map((t, i) => `<div class="c3-q" style="${i ? 'margin-top:34px' : ''}">${t}</div>`).join(''),
      answer: '<div style="font-size:40px;font-weight:700;line-height:1.3">확인할 수 있습니다</div>' +
        '<div class="p2-fit" style="font-family:var(--body);font-weight:700;line-height:1;margin-top:14px">② ④</div>' +
        '<div style="border-top:3px dashed rgba(251,245,233,.45);margin:26px 0 20px"></div>' +
        '<div style="font-size:44px;line-height:1.45">① → [답변]은 5문장 이내<br>③ → [근거]의 조문이 파일에 있다</div>' });
    const qs = [...hu.paper.el.querySelectorAll('.c3-q')];
    return [bg, tp, hu, { render(lt) { qs.forEach((d, i) => pop(d, lt, 0.45 + i * 0.1, 0, 1.04)); } }];
  }, [1.6]) });

  // ─────────────────────────────────────────────────────────────
  // s08 순서 조각(셋): 위에 body 띠 두 장, 다섯 칸 이름 띠(「[근거]」만 레몬 바탕과 주홍 테이프)와 출처 띠, 아래에 [근거] 칸을 다시 보는 때 세 조각
  DECK.slide({ id: 'p2-ch03-s08', notes: NOTES['p2-ch03-s08'], ...lay(2.2, el => {
    const bg = THEME.bg(el, 'base');
    const tp = top(el, '답변 형식을 고정하면 볼 칸이 정해집니다', true);
    const b1 = THEME.strip(el, '파트 1 2장: 칸 없이 문단으로 썼습니다', { x: 120, y: 238, size: 36, weight: 700, rot: -0.6, at: 0.15 });
    const b2 = THEME.strip(el, '다섯 칸이면 확인할 칸을 바로 찾습니다', { x: 120 + b1.w + 28, y: 244, size: 36, weight: 700, rot: 0.5, at: 0.22 });
    // 다섯 칸 이름 띠: 칸 조각(고정폭 36px). 「[근거]」는 안쪽 조각에 레몬 바탕이 따로 붙는다
    const FMT = ['[민원 요지]', '[답변]', '[계산]', '[근거]', '[담당자 확인]'];
    const slot = (t, i) => `<span class="c3-slot" style="display:inline-block;margin-right:${i < 4 ? 16 : 0}px"><span class="c3-in" style="display:inline-block;padding:10px 16px;` +
      `font-family:var(--mono);font-size:36px;font-weight:700;line-height:1.2;background:${C.white};box-shadow:inset 0 0 0 2px rgba(30,22,16,.22)">${t}</span></span>`;
    const SY = 370;
    const fs = THEME.strip(el, '<div style="padding-top:18px">' + FMT.map((t, i) => slot(t, i)).join('') + '</div>', { x: 120, y: SY, size: 36, padX: 26, padY: 14, lh: 1.2, rot: -0.4, at: 0.3, torn: 'left right' });
    const slots = [...fs.el.querySelectorAll('.c3-slot')], key = slots[3].firstElementChild;
    const kx = 26 + slots[3].offsetLeft, kw = slots[3].offsetWidth;
    const tape = THEME.tape(fs.el, { x: kx + kw / 2 - 50, y: -20, w: 100, rot: -7, tone: 'red', at: 0.85 });
    const lab = THEME.tag(el, '[근거] 칸을 다시 보는 때', { x: 104, y: SY - 32, at: 0.4, rot: -1.5 });
    const seq = THEME.sequence(el, { x: 120, y: 506, w: 1680, h: 460, gap: 36, at: 1.0, each: 0.2, titleSize: 56, bodySize: 44, items: [
      { title: '시험할 때 · 5장', body: '미리 정해 둔 조문과 같은가' },
      { title: '검토자가 볼 때 · 7장', body: '조문이 규정에 실제로 있는가' },
      { title: '발송 전 · 한서윤 주임', body: '규정 원문과 대조' }] });
    return [bg, tp, b1, b2, fs, lab, seq, { render(lt) {
      slots.forEach((s0, i) => pop(s0, lt, 0.36 + i * 0.06, 0, 1.08, 0.3));
      // 「[근거]」: 0.8초에 레몬 바탕이 붙으며 한 번 더 눌린다
      const p = prog(lt, 0.8, 0.22, ease.outCubic);
      key.style.background = lt >= 0.8 ? C.lemon : C.white;
      key.style.transform = `scale(${lt >= 0.8 ? lerp(1.14, 1, p).toFixed(4) : '1'})`;
      tape.render(lt);
    } }];
  }) });

  // ─────────────────────────────────────────────────────────────
  // s09 채점 기준(정리 세 줄): 초록 번호 조각의 정리 띠 세 줄, 그 아래 다음 질문 띠, 오른쪽에 설계서 카드(지침 종이와 파일 종이)
  DECK.slide({ id: 'p2-ch03-s09', notes: NOTES['p2-ch03-s09'], ...lay(2.4, el => {
    const bg = THEME.bg(el, 'base');
    const tp = top(el, '설계서 한 장이 지침과 파일이 됩니다', false);
    const ck = THEME.checklist(el, { x: 120, y: 290, w: 1160, size: 44, gap: 30, numTone: 'green', at: 0.3, each: 0.2, items: [
      '설계서 다섯 칸에 사람이 결정을 적습니다', '문장은 확인할 수 있게, 형식은 고정', '결정은 지침으로, 파일은 프로젝트 파일로'] });
    const nq = THEME.nextQ(el, { x: 120, bottom: 980, w: 1160, text: '이 설계서를 ChatGPT에서 어떻게 프로젝트로 만드는가', at: 1.4 });
    // 오른쪽 카드: 설계서 한 장 안에서 「프로젝트 지침」(크림, 회색 글줄 다섯 줄)과 「프로젝트 파일」(초록, 파일 세 장)
    const card = THEME.card(el, { x: 1340, y: 300, w: 460, h: 680, pad: 40, tone: 'cream', rot: 1.2, at: 0.9, label: '민원 상담 프로젝트 설계서', labelSize: 34, tape: true });
    const g1 = THEME.paper(card.el, { x: 34, y: 130, w: 392, h: 236, tone: 'white', rot: -2, at: 1.05, pad: 30, seed: 7.7, k: 0.8 });
    const t1 = h('div', '', g1.inner, '프로젝트 지침'); css(t1, { position: 'relative', fontSize: '38px', fontWeight: 700, lineHeight: 1.2, color: C.ink });
    [0.92, 0.78, 0.86, 0.6, 0.72].forEach(f => { const ln = h('div', 'p2-tl', g1.inner); css(ln, { position: 'relative', width: px((392 - 60) * f), marginTop: '16px' }); });
    const g2 = THEME.paper(card.el, { x: 44, y: 396, w: 380, h: 170, tone: 'green', rot: 1.8, at: 1.2, pad: 30, seed: 8.3, k: 0.8 });
    const t2 = h('div', '', g2.inner, '프로젝트 파일'); css(t2, { position: 'relative', fontSize: '38px', fontWeight: 700, lineHeight: 1.2, color: C.cream });
    const files = h('div', '', g2.inner); css(files, { position: 'relative', display: 'flex', gap: '18px', marginTop: '18px' });
    [0, 1, 2].forEach(() => {
      const f = h('div', '', files);
      css(f, { width: '52px', height: '44px', background: C.cream, clipPath: 'polygon(0 0, 72% 0, 100% 28%, 100% 100%, 0 100%)' });
    });
    const foot = h('div', '', card.inner, '파트 1 7장에서 본 두 항목');
    css(foot, { position: 'absolute', left: '40px', right: '30px', bottom: '40px', fontSize: '34px', fontWeight: 700, lineHeight: 1.3, color: C.dim });
    return [bg, tp, ck, card, g1, g2, nq, { render(lt) { pop(foot, lt, 1.35, 0, 1.04); } }];
  }) });
})();
