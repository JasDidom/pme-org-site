(function(){try{(function(){var f=document.getElementById('skf');if(!f)return;var N=9,M={"c": ["Creative", 3, "III"], "a": ["Decisions", 2, "II"], "e": ["Signal", 1, "I"]};
var D={c:'Begin with the path from offer to message to landing-page action, and make creative tests you can read.',a:'Begin with decision rules, budget limits and changes you can observe and reverse.',e:'Begin with what each event means, how it reaches the platforms and how it reconciles with the CRM.',all:'Your answers are strong across all three crafts. Go straight to the loop and connect them.'};
f.addEventListener('change',function(){var g={c:0,a:0,e:0},n=0;for(var i=0;i<N;i++){var r=f.querySelector('input[name=q'+i+']:checked');if(r){n++;if(r.value==='0')g[r.dataset.c]++;}}
document.getElementById('skp').textContent=n<N?('Answered '+n+' of '+N+'.'):'';if(n<N){document.getElementById('sko').hidden=true;return;}
var best=null;['e','a','c'].forEach(function(k){if(g[k]>0&&(best===null||g[k]>g[best]))best=k;});
var t,h,d;if(best===null){t='Start with Chapter IV · The loop';h='#chapter-4';d=D.all;}else{t='Start with Chapter '+M[best][2]+' · '+M[best][0];h='#chapter-'+M[best][1];d=D[best];}
document.getElementById('skt').textContent=t;document.getElementById('skd').textContent=d;document.getElementById('ska').setAttribute('href',h);document.getElementById('sko').hidden=false;});})();
}catch(e){console.warn(e)}})();
;
(function(){try{
(function(){
var $=function(q){return document.querySelector(q)},$$=function(q){return [].slice.call(document.querySelectorAll(q))};
/* platform tabs */
$$('.ftabs button').forEach(function(b){b.addEventListener('click',function(){var p=b.getAttribute('data-p');
 $$('.ftabs button').forEach(function(x){x.setAttribute('aria-selected',x===b)});$$('.fpanel').forEach(function(f){f.hidden=f.getAttribute('data-p')!==p})})});
/* layout lab */
var ad=$('#ad'),lg=$('#lg'),st={r:'4/5',p:'tl',m:6,s:22};
function size(){var stg=ad.parentElement,W=stg.clientWidth-60,H=Math.min(500,Math.max(320,innerHeight*.62)),a=st.r.split('/'),k=a[0]/a[1];var w=Math.min(W,H*k);ad.style.width=w+'px';ad.style.height=(w/k)+'px'}
function place(){var m=st.m+'%',p=st.p;ad.style.setProperty('--m',m);ad.style.setProperty('--ls',st.s+'%');
 lg.style.left=lg.style.right=lg.style.top=lg.style.bottom='auto';lg.style.transform='';
 if(p[0]==='t')lg.style.top=m;else lg.style.bottom=m;ad.classList.toggle('lb',p[0]==='b');
 if(p[1]==='l')lg.style.left=m;else if(p[1]==='r')lg.style.right=m;else{lg.style.left='50%';lg.style.transform='translateX(-50%)'}
 var tall=st.r==='9/16',chk=[];
 chk.push([st.m>=4,st.m>=4?'Logo has breathing room from the edge':'Logo is too close to the edge: give it at least 4%']);
 chk.push([st.s>=16,st.s>=16?'Logo is large enough to read on a phone':'Logo will be hard to read on a phone']);
 chk.push([st.s<=32,st.s<=32?'Logo does not compete with the product':'Logo is competing with the product']);
 if(tall){var inTop=p[0]==='t'&&st.m<14,inSide=(p[1]!=='c')&&st.m<6;chk.push([!(inTop||inSide),inTop||inSide?'Logo sits under the app interface on 9:16: move it inside the safe zone':'Logo sits inside the 9:16 safe zone'])}
 chk.push([p!=='bl'&&p!=='bc'||!tall,(p==='bl'||p==='bc')&&tall?'Bottom placement fights the Reels caption':(p[0]==='t'?'Brand is seen first, before the promise':'Brand closes the read, next to the action')]);
 var bad=chk.some(function(c){return !c[0]&&!/promise|closes/.test(c[1])});lg.classList.toggle('warn',chk.slice(0,4).some(function(c){return !c[0]}));
 $('#lbChk').innerHTML=chk.map(function(c){return '<li class="'+(c[0]?'ok':'no')+'"><i>'+(c[0]?'✓':'!')+'</i>'+c[1]+'</li>'}).join('')}
function seg(id,key){$$(id+' button').forEach(function(b){b.addEventListener('click',function(){$$(id+' button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});st[key]=b.getAttribute('data-v');
 if(key==='r'){size();if(st.r==='9/16'&&!$('#lbGz').checked){$('#lbGz').checked=true;ad.classList.add('gz')}}place()})})}
seg('#lbRatio','r');seg('#lbPos','p');
$('#lbM').addEventListener('input',function(e){st.m=+e.target.value;$('#lbMo').textContent=st.m+'%';place()});
$('#lbS').addEventListener('input',function(e){st.s=+e.target.value;$('#lbSo').textContent=st.s+'%';place()});
[['#lbG3','g3'],['#lbGm','gm'],['#lbGz','gz']].forEach(function(t){$(t[0]).addEventListener('change',function(e){ad.classList.toggle(t[1],e.target.checked)})});
addEventListener('resize',size);size();place();
/* loop: light the steps in turn while visible */
var ls=$$('.lp8'),li=0,lt=null,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
function tick(){ls.forEach(function(l,i){l.classList.toggle('on',i===li)});li=(li+1)%ls.length}
if(!rm&&'IntersectionObserver' in window)new IntersectionObserver(function(es){es.forEach(function(e){clearInterval(lt);if(e.isIntersecting){tick();lt=setInterval(tick,1600)}else ls.forEach(function(l){l.classList.remove('on')})})}).observe($('#lp8'));
/* input pack */
var K='pme-creative-pack',sv={};try{sv=JSON.parse(localStorage.getItem(K)||'{}')}catch(e){}
var bs=$$('#pk input');function upd(){var n=bs.filter(function(b){return b.checked}).length;$('#pkN').textContent=n+' of '+bs.length;$('#pkB').style.width=(n/bs.length*100)+'%'}
bs.forEach(function(b){b.checked=!!sv[b.dataset.k];b.addEventListener('change',function(){sv[b.dataset.k]=b.checked;try{localStorage.setItem(K,JSON.stringify(sv))}catch(e){}upd()})});upd();
})();

}catch(e){console.warn(e)}})();
;
(function(){try{(function(){function sq(){var m=document.querySelector('main');if(!m)return;
 [].forEach.call(m.querySelectorAll('*'),function(e){if(e.closest('.keep-r'))return;var cs=getComputedStyle(e),r=parseFloat(cs.borderTopLeftRadius)||0;if(r<2||r>=40)return;
  var w=e.offsetWidth,h=e.offsetHeight;if(!w||!h)return;if(r*2>=Math.min(w,h)-2)return;e.style.borderRadius='0'})}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sq);else sq()})();
}catch(e){console.warn(e)}})();