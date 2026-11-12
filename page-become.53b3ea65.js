(function(){try{(function(){var f=document.getElementById('skf');if(!f)return;var N=9,M={"c": ["Creative", 3, "III"], "a": ["Decisions", 2, "II"], "e": ["Signal", 1, "I"]};
var D={c:'Begin with the path from offer to message to landing-page action, and make creative tests you can read.',a:'Begin with decision rules, budget limits and changes you can observe and reverse.',e:'Begin with what each event means, how it reaches the platforms and how it reconciles with the CRM.',all:'Your answers are strong across all three crafts. Go straight to the loop and connect them.'};
f.addEventListener('change',function(){var g={c:0,a:0,e:0},n=0;for(var i=0;i<N;i++){var r=f.querySelector('input[name=q'+i+']:checked');if(r){n++;if(r.value==='0')g[r.dataset.c]++;}}
document.getElementById('skp').textContent=n<N?('Answered '+n+' of '+N+'.'):'';if(n<N){document.getElementById('sko').hidden=true;return;}
var best=null;['e','a','c'].forEach(function(k){if(g[k]>0&&(best===null||g[k]>g[best]))best=k;});
var t,h,d;if(best===null){t='Start with Chapter IV · The loop';h='#chapter-4';d=D.all;}else{t='Start with Chapter '+M[best][2]+' · '+M[best][0];h='#chapter-'+M[best][1];d=D[best];}
document.getElementById('skt').textContent=t;document.getElementById('skd').textContent=d;document.getElementById('ska').setAttribute('href',h);document.getElementById('sko').hidden=false;});})();
}catch(e){console.warn(e)}})();
;
(function(){try{(function(){function sq(){var m=document.querySelector('main');if(!m)return;
 [].forEach.call(m.querySelectorAll('*'),function(e){if(e.closest('.keep-r'))return;var cs=getComputedStyle(e),r=parseFloat(cs.borderTopLeftRadius)||0;if(r<2||r>=40)return;
  var w=e.offsetWidth,h=e.offsetHeight;if(!w||!h)return;if(r*2>=Math.min(w,h)-2)return;e.style.borderRadius='0'})}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sq);else sq()})();
}catch(e){console.warn(e)}})();