(function(){try{
(function(){
  document.documentElement.classList.add('js');
  var acts=document.getElementById('q-acts');
  if(acts)acts.addEventListener('click',function(e){
    var b=e.target.closest('button');if(!b)return;
    var ok=b.getAttribute('data-a')==='ok',tag=document.getElementById('q-tag'),st=document.getElementById('q-state'),ask=document.getElementById('q-ask');
    acts.remove();
    tag.className='tag '+(ok?'ok':'wait');
    tag.textContent=ok?'Approved by you · test starts tomorrow 09:00':'Declined · ceiling unchanged, reason logged';
    st.textContent=ok?'4 applied · nothing waiting':'3 applied · 1 declined';
    st.classList.add('done');ask.classList.remove('ask');
  });
  var cp=document.getElementById('copy');
  if(cp)cp.addEventListener('click',function(){
    var t='Performance Marketing Engineer (PME): '+document.getElementById('def-text').textContent+' Source: performancemarketingengineer.org, v1.0, CC BY 4.0.';
    function done(m){cp.textContent=m;setTimeout(function(){cp.textContent='Copy definition'},2200)}
    function sel(){var r=document.createRange();r.selectNodeContents(document.getElementById('def-text'));var s=getSelection();s.removeAllRanges();s.addRange(r);done('Selected, press copy')}
    try{navigator.clipboard.writeText(t).then(function(){done('Copied')},sel)}catch(e){sel()}
  });
  var f=document.getElementById('sub'),msg=document.getElementById('msg'),em=document.getElementById('email');
  if(f)f.addEventListener('submit',function(e){e.preventDefault();
    if(!em.value||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value)){msg.textContent='Enter a work email, like name@company.com.';em.focus();return}
    msg.textContent='Preview only: nothing was sent. The live form connects at launch.';f.reset()});
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    var els=[].slice.call(document.querySelectorAll('.rv')).filter(function(el){return el.getBoundingClientRect().top>innerHeight});
    els.forEach(function(el){el.classList.add('pre')});
    var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.remove('pre');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){io.observe(el)});
  }
})();

/* reference parts: reveals, platform filter, copy buttons, arch + wave, carousel */
(function(){
  var $=function(s){return document.querySelector(s)},$$=function(s){return [].slice.call(document.querySelectorAll(s))};
  var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -6% 0px'}):null;
  $$('.v16p .rv,.v16p .ht,.v16p .field').forEach(function(el){io?io.observe(el):el.classList.add('in')});
  var items=$$('.field li'),cap=$('#ffCap');
  items.forEach(function(li,i){var l=li.querySelector('.lg');if(l)l.style.setProperty('--d',i)});
  var NAMES={all:'',social:'social',msg:'messaging',search:'search',ai:'AI assistant',video:'video and TV',audio:'audio',retail:'retail media',apps:'app'};
  $$('.ff button').forEach(function(b){b.addEventListener('click',function(){var f=b.dataset.f;$$('.ff button').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
    var n=0;items.forEach(function(li){var on=f==='all'||li.dataset.f===f;li.classList.toggle('dim',!on);if(on)n++});
    if(cap)cap.textContent=f==='all'?'45 ad platforms. Every one runs its own auction.':n+' '+NAMES[f]+' platform'+(n>1?'s':'')+', out of 45. Each one its own auction.'})});
  $$('[data-copy]').forEach(function(b){b.addEventListener('click',function(){var el=document.getElementById(b.dataset.copy),t=el.textContent.trim(),orig=b.textContent;
    function done(m){b.textContent=m;setTimeout(function(){b.textContent=orig},2000)}
    function sel(){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r);done('Selected, press copy')}
    try{navigator.clipboard.writeText(t).then(function(){done(b.dataset.msg||'Copied')},sel)}catch(e){sel()}})});
  /* arch, wave: draw in when they enter the view */
  $$('.rmeet,.hwave').forEach(function(el){io?io.observe(el):el.classList.add('in')});
  if(RM)$$('.rmeet,.hwave').forEach(function(el){el.classList.add('in')});
  /* footer wordmark: fit the line to the page width in whatever font loaded */
  var bm=$('.bigmark span');
  function fit(){if(!bm||innerWidth<760){if(bm)bm.style.fontSize='';return}bm.style.fontSize='100px';var w=bm.getBoundingClientRect().width;if(w)bm.style.fontSize=(100*(bm.parentNode.clientWidth-8)/w)+'px'}
  fit();addEventListener('resize',fit);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
  /* hiring carousel arrows */
  var tr=$('#jtrack');
  if(tr){var step=function(d){var c=tr.querySelector('.jcj');tr.scrollBy({left:d*((c?c.offsetWidth:360)+16),behavior:RM?'auto':'smooth'})};
    $('#jPrev').addEventListener('click',function(){step(-1)});$('#jNext').addEventListener('click',function(){step(1)});
    var upd=function(){$('#jPrev').disabled=tr.scrollLeft<4;$('#jNext').disabled=tr.scrollLeft+tr.clientWidth>tr.scrollWidth-4};tr.addEventListener('scroll',upd,{passive:true});upd()}
})();

}catch(e){console.warn(e)}})();
;
(function(){try{(function(){
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var $=function(q,r){return (r||document).querySelector(q)},$$=function(q,r){return [].slice.call((r||document).querySelectorAll(q))};
function once(el,cb,th){if(!el)return;if(!('IntersectionObserver' in window)){cb(el);return}
 var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){o.disconnect();cb(el)}})},{threshold:th||.25});o.observe(el)}
function seen(el,on,off){if(!el||!('IntersectionObserver' in window))return;new IntersectionObserver(function(es){es.forEach(function(e){(e.isIntersecting?on:off)(el)})},{threshold:0}).observe(el)}
function type(el,text,ms,done,caret){var tw=document.createElement('span');tw.className='tw';el.textContent='';el.appendChild(tw);var c;
 if(caret!==false){c=document.createElement('span');c.className='car';c.setAttribute('aria-hidden','true');el.appendChild(c)}
 var i=0;(function step(){i+=Math.max(1,Math.round(text.length/140));tw.textContent=text.slice(0,i);if(i<text.length)setTimeout(step,ms);else{if(c)c.remove();el.textContent=text;done&&done()}})()}

/* perspective lines draw out */
$$('.persp').forEach(function(p){var ls=$$('line',p);ls.forEach(function(l,i){l.setAttribute('pathLength','1');l.style.setProperty('--k',Math.abs((i%2?1:-1)*Math.floor(i/2)))});
 if(RM){p.classList.add('on');return}once(p,function(){p.classList.add('on')},.05)});

/* SMIL drawings run only while on screen */
$$('svg.iso').forEach(function(sv){if(!sv.querySelector('animate,animateMotion')||!sv.pauseAnimations)return;
 if(RM){sv.pauseAnimations();try{sv.setCurrentTime(0)}catch(e){}return}
 sv.pauseAnimations();seen(sv,function(){sv.unpauseAnimations()},function(){sv.pauseAnimations()})});

/* hero queue: rows arrive one by one, the text types itself, the last one asks for attention */
(function(){var win=$('.hero .win');if(!win)return;var rows=$$('.q-r',win),st=$('#q-state'),ask=$('#q-ask');if(!rows.length)return;
 var final=st?st.textContent:'';
 function resolved(){if(ask){ask.classList.remove('need');ask.classList.add('resolved')}}
 $$('#q-acts button').forEach(function(b){b.addEventListener('click',resolved)});
 if(RM){if(ask)ask.classList.add('need');return}
 win.classList.add('fxq');var applied=0;
 function run(i){if(i>=rows.length){if(st)st.textContent=final;return}var r=rows[i],w=$('.what',r),t=w?w.textContent:'';r.classList.add('in');
  if(st)st.textContent=i<rows.length-1?'Agent working · '+applied+' applied':applied+' applied · 1 waiting for you';
  setTimeout(function(){type(w,t,16,function(){r.classList.add('done');if(!r.classList.contains('ask')){applied++}else{r.classList.add('need')}
   if(st)st.textContent=r.classList.contains('ask')?final:'Agent working · '+applied+' applied';setTimeout(function(){run(i+1)},280)})},260)}
 once(win,function(){setTimeout(function(){run(0)},250)},.35)})();

/* the three layers stack up */
$$('.fx-stack').forEach(function(sv){if(RM){sv.classList.add('on');return}once(sv,function(){sv.classList.add('on');setTimeout(function(){sv.classList.add('idle')},1900)},.35)});
$$('.fx-cre').forEach(function(sv){if(RM)return;once(sv,function(){sv.classList.add('on')},.3)});

/* definition: typed out, then the three inputs light up */
(function(){var d=$('#dict'),p=$('#defText');if(!d||!p)return;var t=p.textContent;
 function mark(){var h=t.replace('the creative','the <mark class="c">creative</mark>').replace('the decisions','the <mark class="d">decisions</mark>').replace('the signals','the <mark class="s">signals</mark>');
  p.innerHTML=h;d.classList.add('typed');var ms=$$('mark',p),cs=$$('.crafts3 span',d);
  ms.forEach(function(m,i){setTimeout(function(){m.classList.add('lit');cs[i]&&cs[i].classList.add('lit')},RM?0:250+i*420)})}
 if(RM){mark();return}
 p.style.minHeight=p.offsetHeight+'px';addEventListener('resize',function(){p.style.minHeight=''});
 once(d,function(){p.style.minHeight=p.offsetHeight+'px';type(p,t,14,mark)},.45)})();

/* the loop: a token runs the track, each step lights up as it passes */
(function(){var box=$('#lpTrack'),ol=$('#lpSteps');if(!box||!ol)return;var steps=$$('.step',ol),NS='http://www.w3.org/2000/svg',svg,path,on,tok,halo,nodes=[],L=0,xs=[],run=false,t0=0,raf;
 function el(n,a){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);return e}
 function build(){box.innerHTML='';nodes=[];var bw=box.getBoundingClientRect();if(bw.width<10)return;
  xs=steps.map(function(s){var r=s.getBoundingClientRect();return r.left-bw.left+r.width/2});
  var y1=18,y2=70,rr=(y2-y1)/2,a=xs[0],b=xs[xs.length-1];
  var d='M'+a+','+y1+' L'+b+','+y1+' A'+rr+','+rr+' 0 0 1 '+b+','+y2+' L'+a+','+y2+' A'+rr+','+rr+' 0 0 1 '+a+','+y1;
  svg=el('svg',{viewBox:'0 0 '+bw.width+' 84',preserveAspectRatio:'none'});path=el('path',{d:d,'class':'trk'});on=el('path',{d:d,'class':'trk-on'});
  svg.appendChild(path);svg.appendChild(on);
  xs.forEach(function(x,i){var g=el('g',{'class':'nd',transform:'translate('+x+' '+y1+')'});g.appendChild(el('circle',{r:9}));var tx=el('text',{y:4});tx.textContent=i+1;g.appendChild(tx);svg.appendChild(g);nodes.push(g)});
  halo=el('circle',{r:9,'class':'tokh'});tok=el('circle',{r:4.5,'class':'tok'});svg.appendChild(halo);svg.appendChild(tok);box.appendChild(svg);L=path.getTotalLength();
  on.style.strokeDasharray='70 '+L}
 function frame(ts){if(!run||!path||!L)return;if(!t0)t0=ts;var p=((ts-t0)/9000)%1,len=p*L,pt=path.getPointAtLength(len);
  tok.setAttribute('cx',pt.x);tok.setAttribute('cy',pt.y);halo.setAttribute('cx',pt.x);halo.setAttribute('cy',pt.y);on.style.strokeDashoffset=-(len-70);
  var top=len<=(xs[xs.length-1]-xs[0]);steps.forEach(function(s,i){var hot=top&&Math.abs(pt.x-xs[i])<46;s.classList.toggle('on',hot);nodes[i]&&nodes[i].classList.toggle('on',hot)});
  raf=requestAnimationFrame(frame)}
 build();addEventListener('resize',function(){build()});
 if(RM)return;
 seen(ol,function(){if(!path)build();if(!path||!L)return;if(!run){run=true;t0=0;raf=requestAnimationFrame(frame)}},function(){run=false;cancelAnimationFrame(raf);steps.forEach(function(s){s.classList.remove('on')})})})();

/* chart lines draw */
(function(){var c=$('#measure .chart');if(!c)return;if(RM){c.classList.add('on');return}once(c,function(){c.classList.add('on')},.35)})();

/* roles: the arc draws and the sun rises as you scroll through it */
(function(){var d=$('#rdome');if(!d)return;
 $$('.rc2').forEach(function(c){function t(v){c.classList.toggle('hot',v)}c.addEventListener('mouseenter',function(){t(true)});c.addEventListener('mouseleave',function(){t(false)});c.addEventListener('focus',function(){t(true)});c.addEventListener('blur',function(){t(false)})});
 if(RM){d.style.setProperty('--o',0);d.style.setProperty('--p',1);return}
 var raf=0;function upd(){raf=0;var r=d.getBoundingClientRect(),vh=innerHeight,p=(vh-r.top)/(vh*.55+r.height*.6);p=Math.max(0,Math.min(1,p));
  var e=1-Math.pow(1-p,2);d.style.setProperty('--o',(1-e).toFixed(4));d.style.setProperty('--p',e.toFixed(4));d.classList.toggle('lit',p>.92)}
 function q(){if(!raf)raf=requestAnimationFrame(upd)}addEventListener('scroll',q,{passive:true});addEventListener('resize',q);upd()})();

/* close: one proposal at a time waits for a yes */
(function(){var card=$('#cqCard');if(!card)return;var who=$('#cqWho'),what=$('#cqWhat'),st=$('#cqSt'),
 Q=[['Budget agent','Raise the Meta ceiling by €15,000 for a three-week geo holdout.'],['Budget agent','Move 20% of non-brand search into Meta prospecting for two weeks.'],
  ['Creative agent','Retire two hooks that spent €4,000 without reaching a verdict.'],['Signal agent','Switch purchase events to the server tag before the sale weekend.']],
 i=0,timer=null,live=false,busy=false;
 function setSt(c,txt){card.classList.remove('ok','no');if(c)card.classList.add(c);st.innerHTML='<i></i>'+txt}
 function show(){busy=true;card.classList.add('out');setTimeout(function(){i=(i+1)%Q.length;who.textContent=Q[i][0];setSt('','Waiting for a yes');card.classList.remove('out');
  type(what,Q[i][1],18,function(){busy=false;sched()},true)},380)}
 function sched(){clearTimeout(timer);if(live&&!RM)timer=setTimeout(show,4200)}
 $$('.cq-acts button',card).forEach(function(b){b.addEventListener('click',function(){if(busy)return;clearTimeout(timer);var ok=b.getAttribute('data-a')==='ok';
  setSt(ok?'ok':'no',ok?'Approved · logged · rollback ready':'Declined · nothing changed');timer=setTimeout(show,1800)})});
 seen(card,function(){live=true;sched()},function(){live=false;clearTimeout(timer)})})();
})();



/* hero: type "engineered." while the dots compute, then settle */
(function(){var w=document.querySelector('.tw-e'),hl=w&&w.closest('.hl');if(!w)return;var ch=[].slice.call(w.querySelectorAll('.ch')),cells=hl?[].slice.call(hl.querySelectorAll('.ic i')):[];
cells.forEach(function(c,k){c.style.setProperty('--n',[0,1,2,1,2,3,2,3,4][k]||0)});
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
w.classList.add('typing');var k=0,flick=setInterval(function(){cells.forEach(function(c){c.classList.toggle('bit',Math.random()<.45)})},90);
setTimeout(function step(){ch.forEach(function(c){c.classList.remove('cur')});if(k<ch.length){ch[k].classList.add('on','cur');k++;setTimeout(step,k===ch.length-1?260:85+Math.random()*60)}
 else{clearInterval(flick);cells.forEach(function(c){c.classList.remove('bit')});ch[ch.length-1].classList.add('cur');setTimeout(function(){ch[ch.length-1].classList.remove('cur');w.classList.remove('typing')},1600)}},550)})();

/* attio-style side index: highlight the section in view */
(function(){var L=[].slice.call(document.querySelectorAll('.hj-nav a'));if(!L.length||!('IntersectionObserver' in window))return;
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){L.forEach(function(a){a.classList.toggle('on',a.dataset.t===e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
L.forEach(function(a){var t=document.getElementById(a.dataset.t);t&&io.observe(t)})})();

/* stay in the loop form (preview) */
(function(){var f=document.querySelector('.sil-f');if(!f)return;f.addEventListener('submit',function(e){e.preventDefault();var i=f.querySelector('input'),m=document.querySelector('.sil-m');
m.textContent=/^\S+@\S+\.\S+$/.test(i.value)?'Preview only: nothing was sent. The live form connects at launch.':'Enter a valid work email.'})})();

/* approval card loop: alternate suggestions, the cursor approves one and declines the next */
(function(){var c=document.getElementById('hjPop');if(!c)return;var cur=c.querySelector('.hj-cur'),b1=c.querySelector('.hj-b1'),b2=c.querySelector('.hj-b2'),tt=c.querySelector('b'),tx=c.querySelector('p'),live=false,t=[],n=0;
 var Q=[{t:'Raise the Meta ceiling by €15,000',x:'Budget agent · for a three-week geo holdout. Outside your €10,000 limit, so it waits.',a:'ok'},
        {t:'Pause all brand search for two weeks',x:'Budget agent · to cut spend fast. Brand terms still bring new customers, so it waits.',a:'no'},
        {t:'Switch purchases to the server tag',x:'Signal agent · before the sale weekend. Changes what every platform learns from, so it waits.',a:'ok'},
        {t:'Ship ten variants of the old hook',x:'Creative agent · from last month’s winner. Off-brand claim in two of them, so it waits.',a:'no'}];
 if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 function at(ms,f){t.push(setTimeout(f,ms))}
 function reset(){b1.className='hj-b1';b2.className='hj-b2';b1.textContent='Approve';b2.textContent='Decline'}
 function cycle(){if(!live)return;var q=Q[n%Q.length];n++;tt.textContent=q.t;tx.textContent=q.x;reset();
  var btn=q.a==='ok'?b1:b2,r=c.getBoundingClientRect(),b=btn.getBoundingClientRect(),x=(b.left-r.left)+b.width*.55,y=(b.top-r.top)+b.height*.55;
  cur.style.transition='none';cur.style.left='105%';cur.style.top='130%';void cur.offsetWidth;cur.style.transition='';
  at(250,function(){cur.classList.add('on');cur.style.left=x+'px';cur.style.top=y+'px'});
  at(1350,function(){cur.classList.add('tap');btn.classList.add('press')});
  at(1500,function(){cur.classList.remove('tap');btn.classList.remove('press');if(q.a==='ok'){b1.classList.add('ok');b1.textContent='Approved'}else{b2.classList.add('no');b2.textContent='Declined';b1.classList.add('dim')}});
  at(2300,function(){c.classList.add('gone');cur.classList.remove('on')});
  at(3000,function(){c.classList.remove('gone');at(10,function(){})});
  at(3000,cycle)}
 new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!live){live=true;cycle()}else if(!e.isIntersecting&&live){live=false;t.forEach(clearTimeout);t=[];c.classList.remove('gone');cur.classList.remove('on');reset()}})},{threshold:.4}).observe(c)})();

/* four layers v2: pinned; scroll explodes the stack, then lights one layer per step (top down, from Memory) */
(function(){var pin=document.getElementById('lyPin'),a=document.getElementById('lyArt');if(!pin||!a)return;
 var S=[].slice.call(a.querySelectorAll('.ly-s')),C=[].slice.call(document.querySelectorAll('#lyCalls .lyc')),B=[].slice.call(document.querySelectorAll('#lyIdx button')),ORDER=[0,1,2,3],cur=-1;
 var mq=window.matchMedia?matchMedia('(prefers-reduced-motion: reduce)'):{matches:false};
 function set(k){if(k===cur)return;cur=k;a.classList.toggle('live',k>=0);
  S.forEach(function(s){s.classList.toggle('on',+s.dataset.i===k)});C.forEach(function(c){c.classList.toggle('on',+c.dataset.i===k)});B.forEach(function(b){b.classList.toggle('on',+b.dataset.i===k)})}
 function geo(){var r=pin.getBoundingClientRect(),span=pin.offsetHeight-innerHeight;return {r:r,span:span,p:Math.max(0,Math.min(1,-r.top/span))}}
 var raf=0;function u(){raf=0;if(mq.matches){a.style.setProperty('--p',1);S.forEach(function(s){s.classList.add('on')});return}
  var g=geo(),e=Math.min(1,g.p/.12);a.style.setProperty('--p',(1-Math.pow(1-e,3)).toFixed(3));
  var q=(g.p-.1)/.9*4,st=g.p<.08?-1:Math.max(0,Math.min(3,Math.floor(q)));set(st<0?-1:ORDER[st]);B.forEach(function(b,x){var f=Math.max(0,Math.min(1,q-x));b.style.setProperty('--f',f.toFixed(3))})}
 B.forEach(function(b){b.addEventListener('click',function(){var st=ORDER.indexOf(+b.dataset.i),span=pin.offsetHeight-innerHeight,top=pin.getBoundingClientRect().top+scrollY;
  scrollTo({top:top+span*(.1+.9*(st+.5)/4),behavior:'smooth'})})});
 addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(u)},{passive:true});addEventListener('resize',u);u()})();

/* prove & act: light up once, in place, when the graphic comes into view */
(function(){var a=document.querySelector('.pa-art');if(!a)return;
 if(!('IntersectionObserver' in window)){a.classList.add('in');return}
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){a.classList.add('in');io.disconnect()}})},{threshold:.35});io.observe(a)})();

(function(){var tr=document.getElementById('hcTrack');if(!tr)return;var cs=[].slice.call(tr.children),bs=[].slice.call(document.querySelectorAll('.hrail button')),
bar=document.querySelector('.hr-line b'),pv=document.getElementById('hcPrev'),nx=document.getElementById('hcNext');
function idx(){var x=tr.scrollLeft,b=0,d=1e9;cs.forEach(function(c,i){var dd=Math.abs(c.offsetLeft-tr.offsetLeft-x-parseFloat(getComputedStyle(tr).paddingLeft)+0);if(dd<d){d=dd;b=i}});
 if(tr.scrollLeft+tr.clientWidth>=tr.scrollWidth-4)b=cs.length-1;return b}
function upd(){var i=idx();bs.forEach(function(b,j){b.classList.toggle('on',j<=i);b.setAttribute('aria-selected',j===i)});if(bar)bar.style.width=(i/(cs.length-1)*100)+'%';
 if(pv)pv.disabled=tr.scrollLeft<4;if(nx)nx.disabled=tr.scrollLeft+tr.clientWidth>tr.scrollWidth-4}
function go(i){i=Math.max(0,Math.min(cs.length-1,i));tr.scrollTo({left:cs[i].offsetLeft-cs[0].offsetLeft,behavior:'smooth'})}
bs.forEach(function(b,i){b.addEventListener('click',function(){go(i)})});
if(pv)pv.addEventListener('click',function(){go(idx()-1)});if(nx)nx.addEventListener('click',function(){go(idx()+1)});
tr.addEventListener('scroll',function(){requestAnimationFrame(upd)},{passive:true});addEventListener('resize',upd);upd()})();
/* citation carousel v2: tabs with per-card reading time, pause on hover / button, height follows the card */
(function(){var box=document.getElementById('xc'),t=document.getElementById('xcT'),vp=document.getElementById('xcV');if(!box||!t||!box.classList.contains('xc2'))return;
 var C=[].slice.call(t.children),T=[].slice.call(box.querySelectorAll('.xt')),i=0,
  RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;if(RM)box.classList.add('held');
 function fit(){var m=0;C.forEach(function(c){c.style.minHeight='';m=Math.max(m,c.offsetHeight)});C.forEach(function(c){c.style.minHeight=m+'px'});vp.style.height=m+'px'}
 function go(k){i=(k+C.length)%C.length;var d=+C[i].dataset.dur||10;box.style.setProperty('--dur',d+'s');
  t.style.transform='translateX(calc('+(-i*100)+'% - '+(i*40)+'px))';
  T.forEach(function(b,x){b.classList.remove('on');b.classList.toggle('done',x<i);b.setAttribute('aria-selected',x===i);if(x===i){void b.offsetWidth;b.classList.add('on')}});
  C.forEach(function(c,x){c.setAttribute('aria-hidden',x!==i);c.inert=x!==i});fit()}
 T.forEach(function(b,x){b.addEventListener('click',function(){go(x)});b.querySelector('u').addEventListener('animationend',function(){if(x===i)go(i+1)})});
 vp.addEventListener('mouseenter',function(){box.classList.add('paused')});vp.addEventListener('mouseleave',function(){box.classList.remove('paused')});
 vp.addEventListener('focusin',function(){box.classList.add('paused')});vp.addEventListener('focusout',function(){box.classList.remove('paused')});
 if('IntersectionObserver' in window)new IntersectionObserver(function(es){es.forEach(function(e){box.classList.toggle('off',!e.isIntersecting)})},{threshold:.25}).observe(box);
 var sx=null;t.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});t.addEventListener('touchend',function(e){if(sx===null)return;var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)go(i+(dx<0?1:-1));sx=null});
 box.addEventListener('keydown',function(e){if(e.key==='ArrowRight')go(i+1);if(e.key==='ArrowLeft')go(i-1)});
 addEventListener('resize',fit);[].forEach.call(t.querySelectorAll('img'),function(im){im.addEventListener('load',fit)});go(0)})();

}catch(e){console.warn(e)}})();