(function(){try{(function(){function sq(){var m=document.querySelector('main');if(!m)return;
 [].forEach.call(m.querySelectorAll('*'),function(e){if(e.closest('.keep-r'))return;var cs=getComputedStyle(e),r=parseFloat(cs.borderTopLeftRadius)||0;if(r<2||r>=40)return;
  var w=e.offsetWidth,h=e.offsetHeight;if(!w||!h)return;if(r*2>=Math.min(w,h)-2)return;e.style.borderRadius='0'})}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sq);else sq()})();
}catch(e){console.warn(e)}})();
;
(function(){try{(function(){var B=[].slice.call(document.querySelectorAll('.lb-f button')),C=[].slice.call(document.querySelectorAll('.lb-c'));
B.forEach(function(b){b.addEventListener('click',function(){B.forEach(function(x){x.classList.toggle('on',x===b)});var f=b.dataset.f;C.forEach(function(c){c.hidden=!(f==='all'||c.dataset.c===f)})})});
[].forEach.call(document.querySelectorAll('.lb-copy'),function(b){b.addEventListener('click',function(){var t=document.getElementById(b.dataset.t).textContent;function done(){b.textContent='Copied';b.classList.add('ok');setTimeout(function(){b.textContent='Copy';b.classList.remove('ok')},1600)}
 if(navigator.clipboard)navigator.clipboard.writeText(t).then(done,done);else done()})})})();
}catch(e){console.warn(e)}})();
;
(function(){try{(function(){function sq(){var m=document.querySelector('main');if(!m)return;
 [].forEach.call(m.querySelectorAll('*'),function(e){if(e.closest('.keep-r'))return;var cs=getComputedStyle(e),r=parseFloat(cs.borderTopLeftRadius)||0;if(r<2||r>=40)return;
  var w=e.offsetWidth,h=e.offsetHeight;if(!w||!h)return;if(r*2>=Math.min(w,h)-2)return;e.style.borderRadius='0'})}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sq);else sq()})();
}catch(e){console.warn(e)}})();