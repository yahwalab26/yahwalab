(function(){
  document.documentElement.classList.add('js');
  var $=function(s){return document.querySelector(s)},$$=function(s){return document.querySelectorAll(s)};
  /* 모달 접근성: 열 때 포커스 이동·배경 inert·Tab 가둠, 닫을 때 inert 해제·열었던 요소로 복귀 */
  function a11yDialog(el, o) {
    o = o || {};
    var bg = [].concat(o.bg || ['header', 'main', 'footer']);
    var opener = null, F = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';
    function items() { return [].filter.call(el.querySelectorAll(F), function (n) { return !n.hidden && n.offsetParent !== null || n === document.activeElement; }); }
    function setBg(on) { bg.forEach(function (s) { document.querySelectorAll(s).forEach(function (n) { on ? n.setAttribute('inert', '') : n.removeAttribute('inert'); }); }); }
    function trap(e) {
      if (e.key !== 'Tab') return;
      var f = items(); if (!f.length) { e.preventDefault(); return; }
      var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === a || !el.contains(document.activeElement))) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && (document.activeElement === z || !el.contains(document.activeElement))) { e.preventDefault(); a.focus(); }
    }
    return {
      open: function (from) {
        opener = from || document.activeElement; setBg(true);
        el.addEventListener('keydown', trap);
        var t = (o.focus && el.querySelector(o.focus)) || items()[0] || el;
        if (t === el && !el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
        t.focus();
      },
      close: function () {
        el.removeEventListener('keydown', trap); setBg(false);
        if (opener && opener.focus) opener.focus(); opener = null;
      }
    };
  }
  window.ywDlg=a11yDialog;
  var mdA=a11yDialog($('#md'),{focus:'.x',bg:['.skip','header','main','footer']});
  function closeMd(){var m=$('#md');if(m&&m.classList.contains('on')){m.classList.remove('on');mdA.close()}}
  /* 문의 버튼·이메일 복사·출간작 클릭 익명 집계: 날짜·이벤트·페이지(출간작은 제목)만 보냄. 개인정보·IP·쿠키 없음, 실패해도 화면 동작에는 영향 없음.
     본인 방문 제외: 정산 사이트에 관리자로 로그인한 브라우저는 자동 제외(쿠키 yw_nt), 예비로 주소 끝에 ?notrack 을 붙여 접속해도 제외 */
  var TK={u:'https://wddixxdrndgvjgicwunu.supabase.co',k:'sb_publishable_fIrxIqOmX_-BFpSELdmvXQ_kkYSkaCx'};
  try{if(/[?&]notrack\b/.test(location.search))localStorage.setItem('yw_nt','1')}catch(e){}
  function track(ev,label){try{
    var nt=false;try{nt=localStorage.getItem('yw_nt')==='1'}catch(x){}
    if(nt||/(^|;\s*)yw_nt=1/.test(document.cookie))return; /* 정산 사이트에 관리자로 로그인한 브라우저는 쿠키로 자동 제외 */
    var pg=location.pathname.replace(/index\.html$/,'');if(pg.slice(-1)!=='/')pg+='/';
    fetch(TK.u+'/rest/v1/rpc/log_site_event',{method:'POST',keepalive:true,headers:{'Content-Type':'application/json',apikey:TK.k},body:JSON.stringify({p_event:ev,p_page:pg,p_label:label||''})}).catch(function(){});
  }catch(e){}}
  var ld=$('#ld'),seen=false;
  try{seen=sessionStorage.getItem('yw_ld')==='1'}catch(e){}
  function ready(){var r=document.documentElement;if(r.classList.contains('rd'))return;r.classList.add('rd');document.dispatchEvent(new Event('yw:ready'))}
  function out(){if(ld.classList.contains('out'))return;ld.classList.add('out');setTimeout(ready,520);setTimeout(function(){ld.style.display='none'},1700);try{sessionStorage.setItem('yw_ld','1')}catch(e){}}
  if(!ld){ready()}else if(seen){ld.style.display='none';ready()}else{
    var t0=Date.now(),cn=$('#cn'),iv=setInterval(function(){var p=Math.min(1,(Date.now()-t0-100)/1250);if(p<0)p=0;p=1-Math.pow(1-p,3);cn.textContent=('00'+Math.round(p*100)).slice(-3);if(p>=1)clearInterval(iv)},40);
    setTimeout(out,1500);ld.addEventListener('click',out)}
  var C={submit:['Submission','투고 문의',
   '<ul><li>로맨스 / 로맨스 판타지 / BL / GL</li><li>현재 공백 미포함 1만 자 이상의 19금 초단편 및 10만 자 안팎의 단편 작품만 투고를 받고 있습니다.</li><li><b>투고 양식</b> — 완결고와 자유 양식의 시놉시스</li><li>BL의 경우 트루비 레이블로 출간됩니다.</li><li>투고 결과는 합격 유무 관계없이 회신드립니다.</li></ul><p class="cl">짧지만 선명한 이야기부터 오래도록 기억에 남는 작품까지.<br>작가님의 이야기를 독자에게 전하기 위해 좋은 작품을 기다립니다.</p>'],
   make:['Contact','제작 문의','<p class="cl" style="border:0;padding:0">문의 내용은 아래 이메일로 보내주세요.</p>']};
  document.addEventListener('click',function(e){var t=e.target.closest('[data-m]');
    if(t){e.preventDefault();var c=C[t.dataset.m];$('#mE').textContent=c[0];$('#mT').textContent=c[1];$('#mB').innerHTML=c[2];$('#md').classList.add('on');mdA.open(t);track(t.dataset.m==='make'&&t.classList.contains('l')?'make_imprint':t.dataset.m)}
    else if(e.target.id==='md'||e.target.closest('.x'))closeMd()});
  document.addEventListener('click',function(e){var w=e.target.closest('a.wk');if(w){var h=w.querySelector('h3');track('work_click',h?h.textContent:'')}});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMd()});
  if($('#cp'))$('#cp').addEventListener('click',function(){var b=this,v=$('#addr').textContent;track('email_copy');
    function ok(){b.textContent='복사되었습니다 ✓';setTimeout(function(){b.textContent='이메일 복사'},1800)}
    function fb(){var r=document.createRange();r.selectNode($('#addr'));var s=getSelection();s.removeAllRanges();s.addRange(r);try{document.execCommand('copy');ok()}catch(x){b.textContent='직접 선택해 복사해 주세요'}}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(v).then(ok,fb)}else fb()});
})();

/* hero slider · 자동 넘김(페이지네이션 없음) + 모션 */
(function(){var h=document.getElementById('hs');if(!h)return;
  var S=[].slice.call(h.querySelectorAll('.hs-s')),L=document.getElementById('hsl'),root=document.documentElement,i=0,tm=null,hold=false,
      rm=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches,DUR=rm?10000:7600;
  S.forEach(function(s,k){if(k){s.setAttribute('inert','');s.setAttribute('aria-hidden','true')}});

  var fan=document.getElementById('fan'),B=[].slice.call(h.querySelectorAll('.hs-bar button'));
  function mark(){B.forEach(function(b,k){var on=k===i;b.classList.toggle('on',on);b.setAttribute('aria-selected',on?'true':'false');b.tabIndex=on?0:-1})}
  B.forEach(function(b,k){b.addEventListener('click',function(){go(k)});
    b.addEventListener('keydown',function(e){var n={ArrowRight:k+1,ArrowLeft:k-1,Home:0,End:B.length-1}[e.key];if(n===undefined)return;e.preventDefault();n=(n+B.length)%B.length;go(n);B[n].focus()})});

  /* 슬라이드 3: 정산 금액 카운트업 */
  function countUp(){[].forEach.call(S[2].querySelectorAll('[data-cu]'),function(el){var to=+el.getAttribute('data-cu');
    if(rm){el.textContent=to.toLocaleString('ko-KR');return}
    el.textContent='0';var t0=0,dl=2300;function step(t){if(!t0)t0=t;var p=Math.min(1,(t-t0-dl)/1500);if(p<0){requestAnimationFrame(step);return}
      p=1-Math.pow(1-p,4);el.textContent=Math.round(to*p).toLocaleString('ko-KR');if(p<1)requestAnimationFrame(step)}
    requestAnimationFrame(step)})}

  /* 포인터 패럴랙스(표지 팬·기기 목업 기울기) */
  var pw=document.getElementById('pw'),mx=0,my=0,tx=0,ty=0,praf=0;
  function pTick(){praf=0;mx+=(tx-mx)*.09;my+=(ty-my)*.09;
    if(fan){fan.style.setProperty('--px',mx.toFixed(3));fan.style.setProperty('--py',my.toFixed(3))}
    if(pw){pw.style.setProperty('--ry',mx.toFixed(3));pw.style.setProperty('--rx',my.toFixed(3))}
    if(Math.abs(tx-mx)>.003||Math.abs(ty-my)>.003)praf=requestAnimationFrame(pTick)}
  if(!rm){h.addEventListener('pointermove',function(e){var r=h.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*2;ty=((e.clientY-r.top)/r.height-.5)*2;if(!praf)praf=requestAnimationFrame(pTick)});
    h.addEventListener('pointerleave',function(){tx=ty=0;if(!praf)praf=requestAnimationFrame(pTick)})}

  function go(n){var p=S[i],k=(n+S.length)%S.length;if(S[k]===p)return;i=k;
    p.classList.remove('on');p.classList.add('out');p.setAttribute('inert','');p.setAttribute('aria-hidden','true');
    setTimeout(function(){p.classList.remove('out')},1000);
    var c=S[i];c.classList.remove('out');c.classList.add('on');c.removeAttribute('inert');c.setAttribute('aria-hidden','false');
    L.textContent=c.getAttribute('data-lb');L.classList.remove('sw');void L.offsetWidth;L.classList.add('sw');
    mark();if(i===2)countUp();plan()}
  function plan(){clearTimeout(tm);if(hold||document.hidden)return;tm=setTimeout(function(){go(i+1)},DUR)}

  /* 읽는 중(텍스트 위·키보드 포커스)에는 멈춤, 모바일은 좌우 스와이프 */
  var ht=h.querySelector('.hs-vp');
  h.addEventListener('pointerover',function(e){if(e.target.closest&&e.target.closest('.hs-t')){hold=true;clearTimeout(tm)}});
  h.addEventListener('pointerout',function(e){if(e.target.closest&&e.target.closest('.hs-t')&&!(e.relatedTarget&&e.relatedTarget.closest&&e.relatedTarget.closest('.hs-t'))){hold=false;plan()}});
  h.addEventListener('focusin',function(){hold=true;clearTimeout(tm)});h.addEventListener('focusout',function(){hold=false;plan()});
  document.addEventListener('visibilitychange',plan);
  var x0=null,y0=0;
  ht.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
  ht.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5)go(i+(dx<0?1:-1))},{passive:true});
  L.setAttribute('aria-live','off');
  function start(){plan()}
  if(root.classList.contains('rd'))start();else document.addEventListener('yw:ready',start,{once:true});
})();

/* 스크롤 리빌 · 마키 속도 연동 */
(function(){var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
  var els=[].slice.call(document.querySelectorAll('.sh,.wk,.sub>*,.rows>div,footer .wrap'));
  els.forEach(function(el){var par=el.parentNode,idx=[].indexOf.call(par.children,el);el.style.setProperty('--d',el.classList.contains('wk')||par.classList.contains('rows')||par.classList.contains('sub')?idx:0)});
  if(!('IntersectionObserver' in window)||rm){els.forEach(function(el){el.classList.add('in')});var bx=document.querySelector('.sub .box');if(bx)bx.classList.add('in')}
  else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.1});
    els.forEach(function(el){io.observe(el)})}
})();
