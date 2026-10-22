(function(){
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
  function out(){if(ld.classList.contains('out'))return;ld.classList.add('out');setTimeout(function(){ld.style.display='none'},1300);try{sessionStorage.setItem('yw_ld','1')}catch(e){}}
  if(!ld){}else if(seen){ld.style.display='none'}else{
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

/* hero slider */
(function(){var h=document.getElementById('hs');if(!h)return;
  var S=h.querySelectorAll('.hs-s'),D=h.querySelectorAll('.hs-d'),L=document.getElementById('hsl'),N=document.getElementById('hsn'),P=document.getElementById('hsp'),i=0,rm=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
  function go(n){i=(n+S.length)%S.length;
    S.forEach(function(s,k){var on=k===i;s.classList.toggle('on',on);s.setAttribute('aria-hidden',on?'false':'true');if(on)s.removeAttribute('inert');else s.setAttribute('inert','')});
    D.forEach(function(d,k){d.classList.remove('on');d.setAttribute('aria-current',k===i?'true':'false')});void h.offsetWidth;D[i].classList.add('on');
    L.textContent=S[i].dataset.lb;N.textContent='0'+(i+1)+' / 0'+S.length}
  D.forEach(function(d,k){d.addEventListener('click',function(){go(k)})});
  document.getElementById('hsf').addEventListener('click',function(){go(i+1)});document.getElementById('hsb').addEventListener('click',function(){go(i-1)});
  P.addEventListener('click',function(){var p=h.classList.toggle('pz');P.setAttribute('aria-pressed',p);P.textContent=p?'▶':'Ⅱ';P.setAttribute('aria-label',p?'자동 넘김 재생':'자동 넘김 멈춤')});
  D.forEach(function(d){d.querySelector('i').addEventListener('animationend',function(){if(d.classList.contains('on'))go(i+1)})});
  h.addEventListener('mouseenter',function(){h.classList.add('ho')});h.addEventListener('mouseleave',function(){h.classList.remove('ho')});
  h.addEventListener('focusin',function(){h.classList.add('ho')});h.addEventListener('focusout',function(){h.classList.remove('ho')});
  var v=document.getElementById('hsv'),x0=null,y0=0;
  v.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
  v.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5)go(i+(dx<0?1:-1))},{passive:true});
  go(0);if(rm){h.classList.add('pz');P.setAttribute('aria-pressed','true');P.textContent='▶'}
})();
