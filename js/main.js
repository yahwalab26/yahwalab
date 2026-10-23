(function(){
  document.documentElement.classList.add('js');
  var $=function(s){return document.querySelector(s)},$$=function(s){return document.querySelectorAll(s)};
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
    var t0=Date.now(),cn=$('#cn'),iv=setInterval(function(){var p=Math.min(1,(Date.now()-t0-400)/2200);if(p<0)p=0;p=1-Math.pow(1-p,3);cn.textContent=('00'+Math.round(p*100)).slice(-3);if(p>=1)clearInterval(iv)},40);
    setTimeout(out,3000);ld.addEventListener('click',out)}
  var C={submit:['Submission','투고 문의',
   '<ul><li>로맨스 / 로맨스 판타지 / BL / GL</li><li>현재 공백 미포함 1만 자 이상의 19금 초단편 및 10만 자 안팎의 단편 작품만 투고를 받고 있습니다.</li><li><b>투고 양식</b> — 완결고와 자유 양식의 시놉시스</li><li>BL의 경우 트루비 레이블로 출간됩니다.</li><li>투고 결과는 합격 유무 관계없이 회신드립니다.</li></ul><p class="cl">짧지만 선명한 이야기부터 오래도록 기억에 남는 작품까지.<br>작가님의 이야기를 독자에게 전하기 위해 좋은 작품을 기다립니다.</p>'],
   make:['Contact','제작 문의','<p class="cl" style="border:0;padding:0">문의 내용은 아래 이메일로 보내주세요.</p>']};
  document.addEventListener('click',function(e){var t=e.target.closest('[data-m]');
    if(t){e.preventDefault();var c=C[t.dataset.m];$('#mE').textContent=c[0];$('#mT').textContent=c[1];$('#mB').innerHTML=c[2];$('#md').classList.add('on');track(t.dataset.m==='make'&&t.classList.contains('l')?'make_imprint':t.dataset.m)}
    else if(e.target.id==='md'||e.target.closest('.x'))$('#md').classList.remove('on')});
  document.addEventListener('click',function(e){var w=e.target.closest('a.wk');if(w){var h=w.querySelector('h3');track('work_click',h?h.textContent:'')}});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')$('#md').classList.remove('on')});
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

  /* 슬라이드 1: 출간작 표지 팬 — 출간작 목록의 표지를 그대로 가져와 자동 갱신됨 */
  var fan=document.getElementById('fan'),imgs=[].slice.call(document.querySelectorAll('#wl img.cvi')).slice(0,4);
  if(fan&&imgs.length){var c=imgs.length,R=[-9,-3,3,9],TY=[2,-5,-5,2],K=[-16,-7,9,18];
    imgs.forEach(function(im,n){var f=document.createElement('div');f.className='fc';
      var m=c===1?1.5:n*(3/(c-1));
      f.style.cssText='left:'+(c===1?32:6+n*(59/(c-1))).toFixed(1)+'%;--n:'+n+';--r:'+R[Math.round(m)]+'deg;--ty:'+TY[Math.round(m)]+'%;--k:'+K[Math.round(m)];
      var s=document.createElement('span');s.className='fi';s.style.setProperty('--n',n);
      var g=document.createElement('img');g.src=im.getAttribute('src');g.alt='';g.width=520;g.height=780;g.decoding='async';
      s.appendChild(g);f.appendChild(s);fan.appendChild(f)})}
  else if(fan)fan.style.display='none';

  /* 슬라이드 2: 유통처 허브 — 선이 알약을 따라다니고, 커서에 살짝 끌려옴 */
  var hub=document.getElementById('hub'),svg=document.getElementById('hbl'),NS='http://www.w3.org/2000/svg',pills=[],lines=[],hubC=null,hubOn=false,hraf=0,ptr={x:-999,y:-999,in:false};
  if(hub&&svg){hubC=hub.querySelector('.hb-c');
    [].forEach.call(hub.querySelectorAll('.hb-p li'),function(li,n){var p=li.querySelector('.pl'),d=+li.style.getPropertyValue('--d');
      var b=document.createElementNS(NS,'line'),f=document.createElementNS(NS,'line');
      b.setAttribute('class','b');b.setAttribute('pathLength','1');b.style.setProperty('--n',d);f.setAttribute('class','f');f.style.setProperty('--n',d);
      svg.appendChild(b);svg.appendChild(f);
      var o={li:li,p:p,b:b,f:f,x:0,y:0,on:false};pills.push(o);
      p.addEventListener('pointerenter',function(){o.hv=true});p.addEventListener('pointerleave',function(){o.hv=false})});
    hub.addEventListener('pointermove',function(e){ptr.x=e.clientX;ptr.y=e.clientY;ptr.in=true});
    hub.addEventListener('pointerleave',function(){ptr.in=false})}
  function hubTick(){hraf=0;if(!hubOn||!hub)return;
    var hr=hub.getBoundingClientRect(),cr=hubC.getBoundingClientRect(),W=hr.width,H=hr.height;
    svg.setAttribute('viewBox','0 0 '+W.toFixed(1)+' '+H.toFixed(1));
    var cx=cr.left+cr.width/2-hr.left,cy=cr.top+cr.height/2-hr.top;
    pills.forEach(function(o){var r=o.p.getBoundingClientRect(),px=r.left+r.width/2,py=r.top+r.height/2,hx=px-o.x,hy=py-o.y,tx=0,ty=0,near=false;
      if(ptr.in&&!rm){var dx=ptr.x-hx,dy=ptr.y-hy,dist=Math.hypot(dx,dy);if(dist<170){var k=(1-dist/170)*.34;tx=dx*k;ty=dy*k}near=dist<64||o.hv}
      o.x+=(tx-o.x)*.14;o.y+=(ty-o.y)*.14;o.p.style.setProperty('--mx',o.x.toFixed(2)+'px');o.p.style.setProperty('--my',o.y.toFixed(2)+'px');
      if(near!==o.on){o.on=near;o.p.classList.toggle('on',near);o.b.classList.toggle('act',near);o.f.classList.toggle('act',near)}
      var X=px-hr.left,Y=py-hr.top;
      [o.b,o.f].forEach(function(l){l.setAttribute('x1',cx.toFixed(1));l.setAttribute('y1',cy.toFixed(1));l.setAttribute('x2',X.toFixed(1));l.setAttribute('y2',Y.toFixed(1))})});
    hraf=requestAnimationFrame(hubTick)}
  function hubRun(on){hubOn=on;if(on&&!hraf)hraf=requestAnimationFrame(hubTick)}

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
    setTimeout(function(){p.classList.remove('out');if(i!==1)hubRun(false)},1000);
    var c=S[i];c.classList.remove('out');c.classList.add('on');c.removeAttribute('inert');c.setAttribute('aria-hidden','false');
    L.textContent=c.getAttribute('data-lb');L.classList.remove('sw');void L.offsetWidth;L.classList.add('sw');
    if(i===1)hubRun(true);if(i===2)countUp();plan()}
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
  var mq=document.querySelector('.mq-t');
  if(mq&&!rm&&mq.getAnimations){var a=mq.getAnimations()[0];
    if(a){var last=window.scrollY,rate=1,target=1,run=false;
      function frame(){rate+=(target-rate)*.08;target+=(1-target)*.06;a.playbackRate=rate;if(Math.abs(rate-1)>.01||Math.abs(target-1)>.01)requestAnimationFrame(frame);else{a.playbackRate=1;run=false}}
      window.addEventListener('scroll',function(){var y=window.scrollY,v=Math.abs(y-last);last=y;target=Math.min(1+v*.18,9);if(!run){run=true;requestAnimationFrame(frame)}},{passive:true});
      if('IntersectionObserver' in window)new IntersectionObserver(function(es){es.forEach(function(e){e.isIntersecting?a.play():a.pause()})}).observe(mq.parentNode)}}
})();
