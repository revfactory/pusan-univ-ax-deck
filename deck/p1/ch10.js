/* 파트 1 · 10장 「파트 1 정리: 결과를 정하는 것」 장면 코드. 화면은 lt(슬라이드 안 시간)와 ctx.amb(멈추지 않는 시간)의 순수 함수다.
 * 원고: plan/slides/p1-ch10.json. 레이아웃 배정: plan/assets/p1_layout_ch10.md. 테마 부품: themes/p1.js. 본보기: p1/ch00.js, p1/ch03.js
 * 장마다 레이아웃이 다르다: 영상 제목 → 인물과 대사 → 한 문장 → 좌우 대비 → 글과 구조 → 가로 순서. */
(function () {
  'use strict';
  const { ease, prog, lerp, css, h, s } = REEL;
  DECK.config({ part: 'p1', chapter: 'ch10', title: '파트 1 정리: 결과를 정하는 것' });

  const CH = { chapter: 10, title: '파트 1 정리: 결과를 정하는 것' };
  const FIC = Object.assign({ fiction: true }, CH);
  const EDGE = 'rgba(19,32,44,.35)', INK = '#13202C';
  const C30 = Math.cos(Math.PI / 6), S30 = 0.5;
  const rise = THEME.rise;
  // 기준점 O 에서 등각 좌표 (ix, iy) 만큼 옮긴 화면 점
  const ISO = (O, ix, iy) => { const [dx, dy] = THEME.iso(ix, iy, 0); return [O[0] + dx, O[1] + dy]; };
  const svgFull = (el) => {
    const v = s('svg', { width: 1, height: 1 }, el);
    css(v, { position: 'absolute', left: '0px', top: '0px', overflow: 'visible', pointerEvents: 'none' });
    return v;
  };
  // 블록 이름표의 글자 크기를 바꾼다(이름 / 보조 줄). 보조 줄의 \n 은 줄바꿈으로 보인다
  const tagSize = (b, name, note) => {
    const t = b.body ? b.body.querySelector('.p1-tag') : null;
    if (!t) return null;
    css(t, { fontSize: name + 'px' });
    const sm = t.querySelector('small');
    if (sm && note) css(sm, { fontSize: note + 'px', whiteSpace: 'pre' });
    return t;
  };
  // 인물 이름표: 이름 44px, 소속 34px(테마의 is-big)
  const person = (el, who, o) => THEME.figure(el, who, Object.assign({ scale: 3, first: true, big: true }, o));
  // 핀 이름표 하나: (x, y0) 사물 윗점에서 위로 핀을 세우고 그 끝(yTag)에 이름표 아래 끝을 맞춘다
  const pinTag = (el, x, y0, yTag, text, size, at) => {
    const pn = h('div', 'p1-pin', el);
    css(pn, { left: x + 'px', top: yTag + 'px', height: (y0 - yTag) + 'px', transformOrigin: '0 100%' });
    const tg = h('div', 'p1-tag', el);
    tg.textContent = text;
    css(tg, { left: x + 'px', top: yTag + 'px', fontSize: size + 'px' });
    return {
      el: tg, end: at + 0.3,
      render(lt) {
        const p = prog(lt, at, 0.3, ease.snap);
        tg.style.opacity = p.toFixed(3);
        tg.style.transform = `translate(-50%, -100%) translateY(${((1 - p) * 14).toFixed(1)}px)`;
        pn.style.transform = `scaleY(${p.toFixed(3)})`;
      },
    };
  };
  // 옆 이름표 하나: 사물의 점(ax, ay)에서 이름표 가운데 높이(ly)의 lx 까지 지시선을 긋는다(themes/p1.js stack 이름표와 같은 모양).
  // lx 가 ax 보다 오른쪽이면 lx 가 이름표 왼쪽 끝, 왼쪽이면 이름표 오른쪽 끝이다
  const sideTag = (el, sv, ax, ay, lx, ly, text, size, at) => {
    const left = lx < ax, sg = left ? 1 : -1;
    const t = h('div', 'p1-side', el);
    t.textContent = text;
    css(t, { left: lx + 'px', top: ly + 'px', fontSize: size + 'px', fontWeight: '700' });
    const ln = s('line', { stroke: EDGE, 'stroke-width': 1.5, 'stroke-linecap': 'round' }, sv);
    const dot = s('circle', { r: 4, fill: INK }, sv);
    return {
      end: at + 0.35,
      render(lt) {
        const p = prog(lt, at, 0.35, ease.snap);
        css(t, { opacity: p.toFixed(3), transform: `translate(${left ? '-100%' : '0px'}, -50%) translateX(${((1 - p) * 24 * sg).toFixed(1)}px)` });
        ln.setAttribute('x1', ax.toFixed(1)); ln.setAttribute('y1', ay.toFixed(1));
        ln.setAttribute('x2', lerp(ax, lx - 14 * sg, p).toFixed(1)); ln.setAttribute('y2', lerp(ay, ly, p).toFixed(1));
        dot.setAttribute('cx', ax.toFixed(1)); dot.setAttribute('cy', ay.toFixed(1));
        ln.style.opacity = dot.style.opacity = p > 0 ? '1' : '0';
      },
    };
  };
  // 서류 토큰이 사물 밑에 닿은 뒤 지나온 자국을 걷는다(토큰은 사물 밑에 남는다)
  const fadeFlow = (f, lt, at) => { f.el.style.opacity = (1 - prog(lt, at, 0.35, ease.inOutCubic)).toFixed(3); };

  // ── s01 챕터 전환(L0 영상 제목): 파트 1 인트로 영상 p1-intro 를 정방향으로 깐다 ──
  DECK.slide({
    id: 'p1-ch10-s01', dur: 3.2,
    notes: '10장은 파트 1의 마지막 장입니다. 1장에서 세 파트의 질문을 소개할 때 파트 1의 질문은 「같은 ChatGPT에 같은 민원 답변을 시켰는데 왜 결과가 달랐는가」였습니다. 한 줄 요청, 세 항목 요청, 업무에서 지키는 네 가지, 에이전트 팀 시연까지 본 지금 이 질문에 한 문장으로 답해 봅니다. 한서윤 주임도 이 답으로 오민석 팀장에게 중간 보고를 합니다.',
    setup(el) {
      this.vt = THEME.videoTitle(el, {
        // 영상 바탕색(#D7E0DF)이 대표 그림 바탕(#E6EBEF)과 달라서, 줄인 영상 바깥을 영상 바탕색으로 채운다
        kind: 'chapter', kicker: '파트 1 · 10장', scene: 'intro', fitBg: '#D7E0DF',
        src: '../assets/video/p1/p1-intro.mp4', poster: '../assets/video/p1/p1-intro.jpg',
        title: '파트 1 정리: 결과를 정하는 것',
        sub: '파트 1의 질문 「왜 결과가 달랐는가」에 무엇이라고 답하는가',
      });
    },
    render(lt, ctx) { this.vt.render(lt, ctx); },
  });

  // ── s02 이야기(L9 인물과 대사): 답변 초안 두 장을 들고 한 중간 보고와 오민석 팀장의 결정 ──
  // 한서윤 주임 앞에서 서류 토큰 둘이 등각 축을 따라 왼쪽으로 가고, 닿는 자리에 흰 초안과 코발트 초안이 내려앉는다.
  // 대사 카드가 들어온 뒤 오민석 팀장 앞에 승인 기록이 놓이고 도장이 찍힌다
  DECK.slide({
    id: 'p1-ch10-s02', dur: 3.6,
    notes: '한서윤 주임이 같은 수영 강습 환불 민원에 받은 답변 초안 두 장을 들고 오민석 팀장에게 중간 보고를 합니다. 한 줄 요청의 답은 근거가 일반 법령이라 반려되었습니다. 세 항목 요청의 답은 공단 규정의 조문 번호가 붙어, 팀장이 고쳐서 쓸 수 있겠다고 한 답입니다. 팀장은 팀 전체에 바로 쓰게 하지 않고, 범위를 좁혀 2주 동안 시범 운영하라고 정합니다. 이 결정이 어떤 보고에서 나왔는지 다음 세 화면에서 봅니다.',
    setup(el) {
      const HS = [990, 820], OM = [1640, 600], AP = [1380, 700];
      this.bg = THEME.bg(el, 'base', { floor: [140, 600, 1700, 440], props: false, token: false, origin: HS });
      THEME.header(el, FIC);
      this.t = THEME.title(el, '팀장이 2주 시범 운영을 허락합니다', { x: 120, y: 92, size: 64, at: 0.1 });
      this.cd = THEME.card(el, { x: 120, y: 190, w: 1000, at: 1.6, enter: 'slide', cap: '오민석 팀장의 결정', pad: '24px 36px 30px',
        html: '범위를 좁혀서 2주 동안<br>시범 운영해 봅시다.' });
      css(this.cd.face, { fontSize: '72px', fontWeight: '700', lineHeight: '1.25' });
      this.body = THEME.text(el, 't-body', '중간 보고: 같은 민원, 답변 초안 두 장', 120, 500);
      // 뒤(오른쪽 위)에 있는 것부터 만든다
      this.om = person(el, '오민석', { x: OM[0], y: OM[1], at: 0.4 });
      this.ap = THEME.item(el, '승인 기록', { x: AP[0], y: AP[1], w: 160, d: 120, at: 2.25, stampAt: 2.6, label: false });
      this.apTag = pinTag(el, AP[0], AP[1] - 14 - 34 - 24, 560, '시범 운영 2주', 40, this.ap.stampLand + 0.05);
      this.hs = person(el, '한서윤', { x: HS[0], y: HS[1], at: 0.2 });
      // 서류 토큰: 한서윤 주임 앞(P0)에서 등각 축(왼쪽 위 → 왼쪽 아래)으로 초안 자리까지 간다
      const P0 = ISO(HS, 0, 70), W = [300, 860], B = [700, 900];
      const route = (T) => {   // P0 → T: -ix 로 u 만큼, +iy 로 t 만큼
        const dx = (T[0] - P0[0]) / C30, dy = (T[1] - P0[1]) / S30;   // dx = -(u + t), dy = t - u
        const t = (dy - dx) / 2, u = -(dx + dy) / 2;
        return [[0, 0], [-u, 0], [-u, t]];
      };
      this.fw = THEME.flow(el, route(W), { x: P0[0], y: P0[1], at: 0.7, speed: 1250, line: false });
      this.fb = THEME.flow(el, route(B), { x: P0[0], y: P0[1], at: 1.25, speed: 700, line: false });
      // 초안은 토큰이 닿는 순간 그 위에 내려앉는다. 이름표는 둘 다 위에 단다(오른쪽에 달면 한서윤 주임 이름표와 겹친다)
      this.dw = THEME.block(el, { x: W[0], y: W[1], w: 200, d: 150, h: 20, tone: 'white', lines: 3, at: this.fw.end - 0.35,
        label: '한 줄 요청 · 반려', note: '근거: 일반 법령', pin: 100 });
      this.db = THEME.item(el, '답변 초안', { x: B[0], y: B[1], w: 200, d: 150, at: this.fb.end - 0.35,
        label: '세 항목 요청', note: '근거: 체육시설 이용 규정\n제7조 제1항 제2호', pin: 100 });
      tagSize(this.dw, 40, 34); tagSize(this.db, 40, 34);
      this.fadeAt = [this.dw.land + 0.1, this.db.land + 0.1];
      this.parts = [this.om, this.ap, this.apTag, this.hs, this.fw, this.fb, this.dw, this.db, this.cd];
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      rise(this.body, lt, 0.95);
      this.parts.forEach(b => b.render(lt));
      fadeFlow(this.fw, lt, this.fadeAt[0]);
      fadeFlow(this.fb, lt, this.fadeAt[1]);
    },
  });

  // ── s03 결론(L1 한 문장, 키 한 번): 파트 1의 질문에 답하는 장 ──
  // 키 전: 물음 「왜 결과가 달랐는가」가 96px 로 화면 세로 가운데(y 488~592)에 조립되고, 그 아래 받침 판이 놓인다.
  // 키: 물음이 64px 로 줄며 머리 자리(x 120, y 104)로 올라가고, 200px 두 줄 문장이 조립된 뒤 근거 칸 둘이 올라온다.
  // 문장은 화면 폭 1680 을 쓰도록 첫 줄은 왼쪽(x 120)에서 시작하고 둘째 줄은 오른쪽 끝(x 1800)에 맞춘다. 받침 판도 폭 1680 이다.
  // THEME.statement 는 한 덩어리를 왼쪽 정렬로만 놓아서, 같은 모양(자모 조립 문장, 받침 판, 근거 칸)을 장면 코드에서 직접 놓는다
  const S03_R = 1.5;
  DECK.slide({
    id: 'p1-ch10-s03', dur: 4.1, steps: [S03_R],
    notes: '답을 보이기 전에 화면의 질문, 「왜 결과가 달랐는가」에 한 분이 한 문장으로 답해 주시겠습니까? (키) 실습 두 번 모두 같은 ChatGPT를 썼고, 바뀐 것은 요청과 모델 바깥에 정해 둔 것입니다. 요청의 세 항목은 4장과 5장에서 요청문에 적은 목적과 결과물, 참고 자료와 제외 범위, 완료 기준과 승인 조건입니다. 지침과 자료는 7장의 프로젝트 지침과 파일이고, 검증은 7장의 검사 단계와 9장의 검토, 승인은 발송 전 오민석 팀장의 확인입니다. 이것이 파트 1의 답입니다. (화면에서 옮긴 문구: 「규정집」)',

    setup(el) {
      THEME.header(el, CH);
      const R = S03_R, X = 120, W = 1680;
      // 물음: 끝 자리(64px)로 만들고, 키 전에는 1.5배(96px)로 키워 세로 가운데로 내려 둔다
      this.q = THEME.title(el, '왜 결과가 달랐는가', { x: X, y: 104, size: 64, at: 0.1 });
      this.q.el.style.transformOrigin = '0 0';
      this.qDy = 488 - 104;
      // 답하는 문장: 200px 두 줄. 둘째 줄 첫 낱말에 왼쪽 여백을 주어 줄 끝을 x 1800 에 맞춘다
      const SY = 200;
      this.ans = THEME.title(el, '요청과 모델 바깥이\n결과를 정합니다', { x: X, y: SY, size: 200, w: W + 20, at: R + 0.4, em: ['결과를 정합니다'] });
      const wd = this.ans.el.querySelectorAll('.p1-word');
      const l2 = wd[4].offsetLeft + wd[4].offsetWidth - wd[3].offsetLeft;
      wd[3].style.marginLeft = Math.max(0, W - l2) + 'px';
      // 받침 판: 문장 아래 34px, 폭 1680, 두께 16(themes/p1.js statement 의 판과 같은 그리기)
      const PY = SY + this.ans.el.offsetHeight + 34, PW = W, PH = 16, dx = 26 * C30, dy = 26 * S30;
      this.plate = h('div', 'p1-stmt-plate', el);
      css(this.plate, { position: 'absolute', left: (X - 20) + 'px', top: PY + 'px' });
      const psv = svgFull(this.plate);
      const pg = (pts, fill) => s('polygon', { points: pts.map(q => q.join(',')).join(' '), fill, stroke: EDGE, 'stroke-width': 1.5, 'stroke-linejoin': 'round' }, psv);
      pg([[0, 0], [PW, 0], [PW, PH], [0, PH]], THEME.tones.white.left);
      pg([[PW, 0], [PW + dx, -dy], [PW + dx, PH - dy], [PW, PH]], THEME.tones.white.right);
      pg([[0, 0], [PW, 0], [PW + dx, -dy], [dx, -dy]], THEME.tones.white.top);
      // 근거 칸 둘: 화면 폭을 반씩 쓴다. 칸 이름 60px, 칸 설명 44px 본문 색. 칸 아래 끝을 y 960 근처에 맞춘다
      const row = h('div', 'p1-stmt-facts', el);
      css(row, { position: 'absolute', left: X + 'px', width: W + 'px', gridTemplateColumns: '1fr 1fr', columnGap: '64px' });
      this.facts = [
        ['요청의 세 항목', '목적과 결과물 · 참고 자료와 제외 범위 ·<br>완료 기준과 승인 조건'],   // 「 · 」 뒤에서 줄을 바꾼다(글자는 그대로)
        ['모델 바깥에 정해 둔', '지침·자료·검증·승인'],
      ].map(([lb, tx]) => {
        const c = h('div', 'p1-stmt-fact', row);
        css(c, { paddingTop: '22px', borderTopWidth: '4px' });
        css(h('div', 'p1-stmt-fact-l', c, lb), { fontSize: '60px' });
        css(h('div', 'p1-stmt-fact-t', c, tx), { fontSize: '44px', color: 'var(--ink)', marginTop: '10px' });
        return c;
      });
      row.style.top = Math.max(PY + PH + 44, 960 - row.offsetHeight) + 'px';
      this.factAt = this.ans.end + 0.05;
    },
    render(lt) {
      const k = prog(lt, S03_R, 0.55, ease.inOutCubic);
      this.q.render(lt);
      this.q.el.style.transform = `translateY(${lerp(this.qDy, 0, k).toFixed(1)}px) scale(${lerp(1.5, 1, k).toFixed(4)})`;
      const p = prog(lt, 0.3, 0.4, ease.outCubic), dd = (1 - p) * 220;   // 받침 판이 등각 축(왼쪽 아래)에서 들어온다
      this.plate.style.transform = `translate(${(-dd * C30).toFixed(1)}px, ${(dd * S30).toFixed(1)}px)`;
      this.plate.style.opacity = lt < 0.3 ? '0' : Math.min(1, p / 0.25).toFixed(3);
      this.ans.render(lt);
      this.facts.forEach((c, i) => rise(c, lt, this.factAt + i * 0.15));
    },
  });

  // ── s04 정리(L3 좌우 대비, 키 없음): 왼쪽 세 층 요청문, 오른쪽 답변 초안과 호박 기둥 넷 ──
  DECK.slide({
    id: 'p1-ch10-s04', dur: 3.5,
    notes: '한서윤 주임과 여러분이 지금 가진 것은 두 가지입니다. 하나는 5장에서 채워 lab1 폴더에 저장한 세 항목 요청문이고, 저장하지 못했다면 lab1/완성본/세항목_요청문_예.md를 씁니다. 이 요청문은 파트 2에서 프로젝트에 무엇을 넣을지 적는 한 장짜리 설계서를 쓸 때 그대로 옮겨 씁니다. 다른 하나는 6장에서 정하준 대리가 물은, 업무에서 지키는 네 가지입니다. 개인정보는 지우고 넣고, 내부 자료는 기관 지침으로 확인하고, 책임은 담당자와 기관이 지고, 조문과 금액은 사람이 대조합니다.',
    setup(el) {
      THEME.header(el, CH);
      this.t = THEME.title(el, '지금 가진 것은 요청문과 규칙입니다', { x: 120, y: 104, size: 64, at: 0.1 });
      const RA = 1.35;
      const sp = this.sp = THEME.split(el, { left: { label: '세 항목 요청문 한 장' }, right: { label: '업무에서 지키는 네 가지' }, at: 0.3, rightAt: RA });
      // 왼쪽 칸: 세 층 흰 판(아래층부터). 이름표는 세로 판(x 960)에 닿지 않게 x 580 에서 시작한다
      this.st = THEME.stack(sp.left, [
        { label: '목적과 결과물', h: 60 }, { label: '참고 자료와 제외 범위', h: 60 }, { label: '완료 기준과 승인 조건', h: 60 },
      ], { x: 330, y: 720, w: 260, shrink: 0, at: 0.5, each: 0.14, labelX: 580, tagSize: 36 });
      this.l1 = THEME.text(sp.left, 'p1-mono', 'lab1/세항목_요청문_양식.md', 120, 884);
      css(this.l1, { fontSize: '34px', color: 'var(--ink)' });
      this.l1At = this.st.end - 0.1;
      // 오른쪽 칸: 흰 답변 초안 판과 네 모서리의 호박 기둥(6장 전환 영상 p1-tr-pillars 와 같은 모양)
      const D = [1470, 780], DW = 280, DH = 50, PW = 50, PH = 190, k = DW / 2 - PW / 2;
      this.dr = THEME.block(sp.right, { x: D[0], y: D[1], w: DW, d: DW, h: DH, lines: 3, at: RA + 0.25 });
      const pil = (ix, iy, t, o) => {
        const [x, y] = ISO(D, ix, iy);
        return THEME.block(sp.right, Object.assign({ x, y, z: DH, w: PW, d: PW, h: PH, tone: 'amber', grow: true, at: t }, o));
      };
      const T0 = this.dr.land + 0.05;
      // ix + iy 가 작은 것(뒤)부터 만든다: 뒤 → 왼쪽 → 오른쪽 → 앞. 솟는 순서도 같다
      this.pl = [
        pil(-k, -k, T0, { label: '개인정보', pin: 24 }),
        pil(-k, k, T0 + 0.15, { label: '내부 자료', labelPos: 'left' }),
        pil(k, -k, T0 + 0.3, { label: '책임', labelPos: 'right' }),
        pil(k, k, T0 + 0.45, { label: '근거', labelPos: 'below' }),
      ];
      this.pl.forEach(b => tagSize(b, 40));
      // 앞 기둥 이름표는 답변 초안 판의 앞 모서리 아래로 내린다(판 위에 두면 판 앞면을 가린다)
      const fy = ISO(D, k, k)[1], frontY = D[1] + DW / 2 + 14;
      this.pl[3].body.querySelector('.p1-tag').style.top = (frontY - fy) + 'px';
      this.parts = [this.st, this.dr].concat(this.pl);
    },
    render(lt) {
      this.t.render(lt);
      this.sp.render(lt);
      this.parts.forEach(b => b.render(lt));
      rise(this.l1, lt, this.l1At, 20);
    },
  });

  // ── s05 도식(L16 글과 구조): 위 구역은 새 대화마다 다시 넣는 요청문과 규정집, 아래 구역은 비어 있는 검토 자리 ──
  DECK.slide({
    id: 'p1-ch10-s05', dur: 3.9,
    notes: '보고에는 남은 문제도 들어갑니다. 첫째, 한서윤 주임은 새 대화를 열 때마다 세 항목 요청문과 규정 파일을 다시 붙여 넣고 있습니다. 둘째, 8장 시연의 팀에는 답변 초안을 확인하는 검토 역할이 있었지만, 한서윤 주임의 ChatGPT 대화에는 그런 역할이 없습니다. 오민석 팀장이 팀 전체에 바로 쓰게 하지 않고 2주 시범 운영으로 정한 것도 이 두 문제 때문입니다. 두 문제는 파트 2에서 ChatGPT Plus 안에서 풉니다.',
    setup(el) {
      this.bg = THEME.bg(el, 'base', { floor: [760, 220, 1080, 800], props: false, token: false, origin: [1000, 380] });
      THEME.header(el, CH);
      this.t = THEME.title(el, '아직 남은 문제가\n두 가지 있습니다', { x: 120, y: 190, size: 72, w: 720, at: 0.1 });
      this.b1 = THEME.text(el, 't-body', '요청할 때마다<br>요청문과 파일을 다시 넣습니다', 120, 400, 600);
      this.b2 = THEME.text(el, 't-body', '답변 초안을 따로<br>검토하는 사람이 없습니다', 120, 780, 600);
      const sv = svgFull(el);
      // 위 구역: 「새 대화」 카드 셋. 카드마다 서류 토큰 둘이 들어오고, 닿는 자리에 요청문 판과 규정집이 놓인다(0.5초 간격으로 되풀이)
      const things = h('div', 'full', el);   // 카드 층을 먼저 깐다. 토큰은 카드 위, 요청문 판과 규정집 아래에 그려진다
      this.units = [0, 1, 2].map(k => {
        const cx = 1000 + 330 * k, C = [cx, 380], t0 = 0.3 + 0.45 * k;
        const PL = [cx - 70, 545], RB = [cx + 80, 530];
        const card = THEME.block(things, { x: C[0], y: C[1], w: 180, d: 140, h: 50, lines: 3, at: t0 });
        const fa = THEME.flow(el, [[0, 170], [0, 0]], { x: PL[0], y: PL[1], at: t0 + 0.4, speed: 900, line: false });
        const fb = THEME.flow(el, [[0, 170], [0, 0]], { x: RB[0], y: RB[1], at: t0 + 0.52, speed: 900, line: false });
        const plate = THEME.block(el, { x: PL[0], y: PL[1], w: 96, d: 72, h: 18, layers: 3, at: fa.end - 0.35 });
        const rule = THEME.item(el, '규정집', { x: RB[0], y: RB[1], w: 84, d: 64, h: 48, layers: 4, at: fb.end - 0.35,
          label: k === 0 ? '규정집' : false, labelPos: 'below' });
        const u = { card, fa, fb, plate, rule, tags: [] };
        if (k === 0) {
          tagSize(rule, 36);
          // 첫 카드에만 이름표를 단다: 「새 대화」와 「세 항목 요청문」은 왼쪽, 「규정집」은 아래
          const ca = [C[0] - 70 * C30, C[1] + 35 * S30 - 25];
          u.tags.push(sideTag(el, sv, ca[0], ca[1], ca[0] - 90, ca[1], '새 대화', 36, card.land + 0.05));
          const pa = [PL[0] - 36 * C30, PL[1] + 18 * S30 - 9];
          u.tags.push(sideTag(el, sv, pa[0], pa[1], pa[0] - 70, pa[1] + 6, '세 항목 요청문', 36, plate.land + 0.05));
        }
        return u;
      });
      // 아래 구역: 작성 책상 → 비어 있는 검토 자리 → 승인 블록을 같은 높이에 놓는다. 이름표는 블록 아래
      const T2 = 2.2, LY = 820;
      this.T2 = T2;
      this.wr = THEME.block(el, { x: 990, y: LY, w: 180, d: 180, h: 70, tone: 'cobalt', at: T2 + 0.05, label: '작성', labelPos: 'below' });
      this.gh = THEME.block(el, { x: 1310, y: LY, w: 180, d: 180, h: 70, tone: 'ghost', drop: 0, shadow: false, at: T2 + 0.35, label: '검토', labelPos: 'below' });
      // 빈 검토 자리는 점선 윤곽만 있어 바탕에 묻히므로 윤곽선을 진하고 굵게 긋는다
      this.gh.body.querySelectorAll('polygon[stroke-dasharray]').forEach(p => { p.setAttribute('stroke', 'rgba(19,32,44,.75)'); p.setAttribute('stroke-width', '2.5'); });
      this.ghDraw = THEME.ghostDraw(this.gh);
      this.ok = THEME.block(el, { x: 1630, y: LY, w: 180, d: 180, h: 70, tone: 'amber', at: T2 + 0.6, label: '승인', labelPos: 'below' });
      [this.wr, this.gh, this.ok].forEach(b => tagSize(b, 40));
      el.appendChild(sv);   // 지시선은 카드와 판 위에 그린다
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      rise(this.b1, lt, 0.5);
      this.units.forEach(u => {
        u.card.render(lt); u.fa.render(lt); u.fb.render(lt); u.plate.render(lt); u.rule.render(lt);
        u.tags.forEach(t => t.render(lt));
        fadeFlow(u.fa, lt, u.plate.land + 0.1);
        fadeFlow(u.fb, lt, u.rule.land + 0.1);
      });
      rise(this.b2, lt, this.T2);
      this.wr.render(lt);
      this.gh.render(lt); this.ghDraw(lt, this.T2 + 0.35, 0.4);
      this.ok.render(lt);
    },
  });

  // ── s06 예고(L4 가로 순서): 파트 2에서 만드는 네 가지와 다음 질문 ──
  // 셋째·넷째 자리는 블록 대신 시험표(칸이 아직 솟지 않은 점선 칸 12개)와 승인 기록(도장 없음)을 놓는다
  DECK.slide({
    id: 'p1-ch10-s06', dur: 3.8,
    notes: '파트 2에서는 지침과 규정 파일을 「새별 민원 상담」 프로젝트에 한 번 넣어 두고 새 대화마다 함께 씁니다. 검토는 「새별 답변 검토」 프로젝트에 맡기고, 실습 다섯 개는 모두 ChatGPT Plus 웹 화면에서 합니다. 시험표는 민원 질문 12개와 질문마다 기대 답과 근거 조문을 적은 표이고, 받은 답을 이 표로 채점해 통과와 실패를 적으면 시험 기록입니다. 승인 기록은 판정 날짜, 판정(승인·수정 요청·보류), 조건, 판정한 사람을 적는 한 장이고, 실습에서는 옆 사람이 팀장 역할을 맡습니다. 파트 2의 질문은 「규정을 근거로 답하고 규정에 없으면 담당자에게 넘기는 민원 상담 프로젝트를 ChatGPT Plus만으로 만들 수 있는가」입니다. (화면에서 지운 기준 시점: 「ChatGPT 프로젝트 기능: 2026년 11월 기준」)',
    setup(el) {
      const X0 = 300, X1 = 1620, Y = 600, SZ = 200, HH = 80, PIN = 115;
      this.bg = THEME.bg(el, 'base', { floor: [140, 300, 1680, 520], props: false, token: false, origin: [X0, Y] });
      THEME.header(el, FIC);
      this.t = THEME.title(el, '파트 2에서 민원 상담 프로젝트를 만듭니다', { x: 120, y: 104, size: 64, at: 0.1 });
      this.sq = THEME.sequence(el, [
        { label: '새별 민원 상담', note: '프로젝트', tone: 'cobalt' },
        { label: '새별 답변 검토', note: '프로젝트', tone: 'cobalt' },
        { label: '시험표' }, { label: '승인 기록' },
      ], { x0: X0, x1: X1, y: Y, size: SZ, h: HH, at: 0.4, each: 0.2, token: false, pin: PIN });
      // 셋째·넷째 블록은 감추고 같은 자리에 사물을 놓는다. 번호는 사물에 붙일 면이 없어 넷 모두 감춘다
      el.querySelectorAll('.p1-seq-no').forEach(n => { n.style.display = 'none'; });
      [2, 3].forEach(i => { this.sq.blocks[i].el.style.display = 'none'; });
      const dx = (X1 - X0) / 3, XT = X0 + 2 * dx, XA = X0 + 3 * dx;
      const at3 = 0.4 + 2 * 0.2, at4 = 0.4 + 3 * 0.2;
      // 시험표: 판 위 12칸 자리만 점선으로 긋는다(칸은 파트 2에서 솟는다)
      const tw = 230, td = 200, cols = 4, rows = 3, cw = (tw - 24) / cols, cdp = (td - 24) / rows;
      this.tb = THEME.block(el, { x: XT, y: Y, w: tw, d: td, h: 12, at: at3, label: '시험표', pin: Y - 12 - (Y - HH - PIN) });
      this.cells = [];
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const [cx, cy] = THEME.iso(-tw / 2 + 12 + (c + 0.5) * cw, -td / 2 + 12 + (r + 0.5) * cdp, 0);
        const b = THEME.block(el, { x: XT + cx, y: Y + cy, z: 12, w: cw - 10, d: cdp - 10, h: 4, tone: 'ghost', drop: 0, shadow: false, at: this.tb.land + 0.05 + (r + c) * 0.04 });
        this.cells.push({ b, draw: THEME.ghostDraw(b), at: this.tb.land + 0.05 + (r + c) * 0.04 });
      }
      this.ap = THEME.block(el, { x: XA, y: Y, w: 210, d: 170, h: 14, lines: 2, at: at4, label: '승인 기록', pin: Y - 14 - (Y - HH - PIN) });
      [this.tb, this.ap].forEach(b => { const t = b.body.querySelector('.p1-tag'); if (t) t.classList.add('is-big'); });
      // 첫 블록 윗면의 흰 판 두 층(아래 「지침」, 위 「규정 파일」). 이름표는 첫 블록과 둘째 블록 사이 빈 곳에 둔다
      const sv = svgFull(el), b1 = this.sq.blocks[0];
      this.lay = [0, 1].map(i => THEME.block(el, { x: X0, y: Y, z: HH + 20 * i, w: 150, d: 120, h: 20, shadow: i === 0, shadowH: 40, at: b1.land + 0.1 + i * 0.14, drop: 260 }));
      this.layTags = [['지침', 0, 500], ['규정 파일', 1, 438]].map(([tx, i, ly]) => {
        const ax = X0 + 75 * C30, ay = Y + 60 * S30 - HH - 20 * i - 10;
        return sideTag(el, sv, ax + 2, ay, 492, ly, tx, 34, this.lay[i].land + 0.05);
      });
      // 서류 토큰: 첫 블록 앞에서 출발해 블록 사이를 등각 축(오른쪽 위 → 오른쪽 아래)으로 지나 승인 기록 앞에서 멈춘다
      const A = dx / (2 * C30), OFF = 150, path = [[OFF, OFF]];
      for (let k = 1; k <= 3; k++) { path.push([OFF + A * (k - 1), OFF - A * k]); path.push([OFF + A * k, OFF - A * k]); }
      this.fl = THEME.flow(el, path, { x: X0, y: Y, at: at4 + 0.5, speed: 2000, line: false });
      el.appendChild(sv);   // 지시선은 블록과 판 위에 그린다
      this.q = THEME.card(el, { x: 120, y: 820, w: 1240, at: this.fl.end + 0.05, enter: 'drop', cap: '다음 질문', pad: '18px 36px 22px',
        html: '<div style="font-size:40px;line-height:1.35;font-weight:600">규정을 근거로 답하고 규정에 없으면 담당자에게 넘기는<br>민원 상담 프로젝트를 ChatGPT Plus만으로 만들 수 있는가</div>' });
    },
    render(lt, ctx) {
      this.bg.render(lt, ctx);
      this.t.render(lt);
      this.sq.render(lt);
      this.lay.forEach(b => b.render(lt));
      this.layTags.forEach(t => t.render(lt));
      this.tb.render(lt);
      this.cells.forEach(c => { c.b.render(lt); c.draw(lt, c.at, 0.3); });
      this.ap.render(lt);
      this.fl.render(lt);
      this.q.render(lt);
    },
  });
})();
