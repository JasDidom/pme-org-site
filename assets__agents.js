(function(){
var AG={
 budget:{n:'Budget agent',c:'var(--c-budget)',tasks:['Reading spend against CRM revenue','Pacing 14 campaigns to month target','Checking POAS by ad set, 7-day window']},
 creative:{n:'Creative agent',c:'var(--c-creative)',tasks:['Cutting 9:16 versions of the winner','Scoring hooks on last week’s spend','Writing 12 headline variants on brand']},
 signal:{n:'Signal agent',c:'var(--c-signal)',tasks:['Deduplicating 1,204 browser + server events','Matching CRM leads to click IDs','Verifying consent on new conversions']},
 page:{n:'Page agent',c:'var(--c-page)',tasks:['Comparing ad promise to landing hero','Running speed check on 6 landing pages','Splitting traffic on page test #14']},
 report:{n:'Reporting agent',c:'var(--c-report)',tasks:['Building the morning ledger','Reconciling Meta, Google and CRM','Drafting the weekly test readout']}
};
var Q=[
 {a:'budget',h:'Move €1,200/day from Prospecting · Broad to Retargeting · Visitors 30d',ev:['POAS 1.9 vs 0.8','7-day window','n = 412 orders'],gr:['Within ±20% daily limit','Reversible in one click'],done:'€1,200/day moved'},
 {a:'creative',h:'Launch 6 variants from the winner “Kitchen at sunset” as a hook test',ev:['CTR 2.4% vs 1.1% median','Frequency 3.8 and rising'],gr:['Brand check passed'],hu:'Tone of copy needs a human eye',done:'6 variants live'},
 {a:'signal',h:'Send 38 qualified leads from the CRM to Meta CAPI and Google offline conversions',ev:['Match rate 81%','Consent 38 / 38'],gr:['Within consent policy','Logged per event'],done:'38 conversions sent'},
 {a:'report',h:'Pause 2 brand keywords for a 14-day holdout: brand search may be taking organic clicks',ev:['MER 3.4 · target ≥ 3.0','Organic CTR −18% on brand'],gr:['Test design attached'],hu:'Stops paid brand traffic for 14 days',done:'Holdout running'},
 {a:'page',h:'Swap the landing headline to match the ad promise “Ready in spring 2027”',ev:['Bounce 61% on this ad','Message match score 2 / 5'],gr:['Versioned, A/B on 50%'],done:'Page test #15 live'},
 {a:'budget',h:'Cut TikTok Spark Ads by 30%: CPA 2.1× target for 5 days straight',ev:['CPA €84 vs €40 target','Spend €2,940 / 5d'],gr:['Within ±30% weekly limit','Reversible'],done:'TikTok budget −30%'},
 {a:'creative',h:'Retire 4 ads before fatigue and rotate in the next round from the queue',ev:['CTR −35% in 6 days','Frequency 5.2'],gr:['Replacements approved last week'],done:'4 ads rotated'},
 {a:'signal',h:'Fix the purchase event firing twice on the thank-you page (GTM v87)',ev:['Duplicates 11% of purchases','Since Tue 14:02'],gr:['Staging test passed','Rollback to v86 ready'],done:'GTM v88 published'}
];
var AUTO=[
 ['signal','Fixed 3 broken UTMs on new ads','inside L2 workflow scope'],
 ['report','Morning ledger sent to #growth','read-only, no approval needed'],
 ['creative','Resized 24 assets for Stories and Reels','no spend change'],
 ['page','Speed check: all pages under 2.5s LCP','read-only'],
 ['budget','Paced 14 campaigns to month target','inside daily limit']
];
var LV={
 1:{t:'Manual. People click every button; agents are off. Nothing compounds.',agents:'off'},
 2:{t:'Workflows. Rules run the routine the same good way every time; anything new still waits for a person.',agents:'rules'},
 3:{t:'Agents propose, a person approves. Money, brand and data changes wait for a yes. The level this standard recommends.',agents:'run'},
 4:{t:'Agents act inside limits, a person audits after. Only for moves that are small, logged and reversible.',agents:'run',auto:1},
 5:{t:'Unattended. Agents act with no person in the loop. Not recommended wherever money, brand or consent is involved.',agents:'run',auto:1,warn:1}
};
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function now(off){var d=new Date(2026,9,26,8,42+(off||0));return ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)}
function init(root){
 var qi=0,ai=0,tick=0,level=3,done=214,timers=[];
 var app=root.querySelector('.agx-app');if(!app)return;
 app.innerHTML='<div class="agx-top"><div class="agx-dots"><b></b><b></b><b></b></div><div class="agx-ttl">PME desk<span>Mon 08:42 · Acme Homes</span></div><div class="agx-stat agx-sd"><b data-k="done">214</b> tasks done overnight</div><div class="agx-stat agx-sw"><b data-k="wait">3</b> waiting for you</div></div>'+
 '<div class="agx-lv"><span>Autonomy</span><div class="agx-seg" role="group" aria-label="Autonomy level"></div><div class="agx-lvd"></div></div>'+
 '<div class="agx-body"><div class="agx-col ags"><p class="agx-ch">Agents <span>5 running</span></p></div><div class="agx-col"><p class="agx-ch">Needs your approval <span>you are the loop</span></p><div class="agx-q"></div></div><div class="agx-col"><p class="agx-ch">Decision log <span>reversible</span></p><div class="agx-log"></div></div></div>';
 var seg=app.querySelector('.agx-seg'),lvd=app.querySelector('.agx-lvd'),ags=app.querySelector('.ags'),q=app.querySelector('.agx-q'),log=app.querySelector('.agx-log');
 [1,2,3,4,5].forEach(function(n){var b=el('button',null,'L'+n+(n===3?'<span class="r">●</span>':''));b.setAttribute('aria-pressed',n===3?'true':'false');b.title=['','Manual','Workflows','Agents + approval','Agents within limits','Unattended'][n];b.onclick=function(){setLevel(n)};seg.appendChild(b)});
 var agEls={};
 Object.keys(AG).forEach(function(k,i){var a=AG[k];var d=el('div','agx-ag run','<div class="agx-px" style="--c:'+a.c+'">'+'<i></i>'.repeat(9)+'</div><div><b>'+a.n+'</b><small>'+a.tasks[0]+'</small><span class="agx-pill r">running</span></div>');ags.appendChild(d);agEls[k]=d});
 function setStat(){app.querySelector('[data-k=done]').textContent=done;app.querySelector('[data-k=wait]').textContent=level>=4||level<3?0:q.querySelectorAll('.agx-card:not(.out)').length}
 function addLog(kind,agent,txt,sub,undo){var a=AG[agent];var s=kind==='y'?'✓':kind==='n'?'✕':'·';var li=el('div','agx-li','<span class="s '+(kind==='n'?'n':kind==='a'?'a':'')+'">'+s+'</span><span class="m"><b>'+a.n+'</b> '+txt+'<small>'+sub+'</small></span>');if(undo){var u=el('button',null,'undo');u.onclick=function(){li.querySelector('.m small').textContent='Rolled back by you · '+now(tick);u.remove()};li.appendChild(u)}log.insertBefore(li,log.firstChild);while(log.children.length>9)log.lastChild.remove()}
 function card(p){var a=AG[p.a];var c=el('div','agx-card');c.innerHTML='<div class="agx-who" style="--c:'+a.c+'"><i></i>'+a.n+'<span class="t">'+now(tick)+'</span></div><h4>'+p.h+'</h4><div class="agx-ev">'+p.ev.map(function(x){return '<span>'+x+'</span>'}).join('')+'</div><div class="agx-gr">'+p.gr.map(function(x){return '<span>✓ '+x+'</span>'}).join('')+(p.hu?'<span class="h">● '+p.hu+'</span>':'')+'</div><div class="agx-act"><button class="y">Approve</button><button class="n">Reject</button></div>';
  c.querySelector('.y').onclick=function(){decide(c,p,'y')};c.querySelector('.n').onclick=function(){decide(c,p,'n')};return c}
 function decide(c,p,k,auto){c.classList.add('out');setTimeout(function(){c.remove();fill();setStat()},340);tick++;done++;
  if(k==='y')addLog('y',p.a,p.done,(auto?'Auto-approved inside limits':'Approved by you')+' · '+now(tick)+' · rollback ready',true);
  else addLog('n',p.a,'proposal rejected','Rejected by you · agent will learn from it · '+now(tick));
  agEls[p.a].querySelector('.agx-pill').className='agx-pill r';agEls[p.a].querySelector('.agx-pill').textContent='running';setStat()}
 function next(){var p=Q[qi%Q.length];qi++;return p}
 function fill(){var live=q.querySelectorAll('.agx-card:not(.out)').length;var em=q.querySelector('.agx-empty');if(em)em.remove();
  if(level<3){if(!q.querySelector('.agx-empty'))q.appendChild(el('div','agx-empty',level===1?'Agents are off. Every change is made by hand in each platform.':'Rules run the routine. Nothing new is proposed at this level.'));return}
  while(live<3){var p=next();var c=card(p);q.appendChild(c);live++;agEls[p.a].querySelector('.agx-pill').className='agx-pill w';agEls[p.a].querySelector('.agx-pill').textContent='waiting for you';
   if(level>=4){c.querySelector('.agx-act').innerHTML='<span style="font:12px Geist Mono,monospace;color:var(--a-ok)">● Auto-approving inside limits…</span>';(function(c,p){setTimeout(function(){if(c.isConnected&&level>=4)decide(c,p,'y',1)},900+Math.random()*900)})(c,p)}}
  setStat()}
 function setLevel(n){level=n;[].forEach.call(seg.children,function(b,i){b.setAttribute('aria-pressed',i+1===n?'true':'false')});var L=LV[n];lvd.textContent=L.t;lvd.className='agx-lvd'+(L.warn?' warn':'');
  Object.keys(agEls).forEach(function(k){var d=agEls[k],pl=d.querySelector('.agx-pill');d.classList.toggle('run',L.agents!=='off');if(L.agents==='off'){pl.className='agx-pill';pl.textContent='off'}else if(L.agents==='rules'){pl.className='agx-pill';pl.textContent='rules only'}else if(!/waiting/.test(pl.textContent)){pl.className='agx-pill r';pl.textContent='running'}});
  if(n<3){[].forEach.call(q.querySelectorAll('.agx-card'),function(c){c.remove()})}
  q.querySelectorAll('.agx-empty').forEach(function(e){e.remove()});
  if(n>=4){[].forEach.call(q.querySelectorAll('.agx-card:not(.out)'),function(c,i){var b=c.querySelector('.y');setTimeout(function(){if(c.isConnected&&level>=4&&b)b.click()},500+i*400)})}
  fill()}
 // seed log
 addLog('a','report','Morning ledger ready','Overnight · read-only');addLog('a','signal','Fixed 3 broken UTMs on new ads','Overnight · inside workflow scope');addLog('a','creative','Resized 24 assets for Stories and Reels','Overnight · no spend change');
 setLevel(3);
 // agents' live tasks + background auto actions
 var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){root._vis=e.isIntersecting})}):null;if(io)io.observe(root);else root._vis=true;
 setInterval(function(){if(!root._vis)return;ai++;var ks=Object.keys(AG);var k=ks[ai%ks.length];var sm=agEls[k].querySelector('small');if(LV[level].agents!=='off')sm.textContent=AG[k].tasks[ai%AG[k].tasks.length]+'…';
  if(ai%4===0&&level>=2){var x=AUTO[(ai/4)%AUTO.length|0];tick++;done++;addLog('a',x[0],x[1],'Auto · '+x[2]+' · '+now(tick));setStat()}},1600);
}
function boot(){[].forEach.call(document.querySelectorAll('.agx'),function(r){try{init(r)}catch(e){}})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
