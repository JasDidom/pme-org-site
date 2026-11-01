(function(){try{(function(){function sq(){var m=document.querySelector('main');if(!m)return;
 [].forEach.call(m.querySelectorAll('*'),function(e){if(e.closest('.keep-r'))return;var cs=getComputedStyle(e),r=parseFloat(cs.borderTopLeftRadius)||0;if(r<2||r>=40)return;
  var w=e.offsetWidth,h=e.offsetHeight;if(!w||!h)return;if(r*2>=Math.min(w,h)-2)return;e.style.borderRadius='0'})}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sq);else sq()})();
}catch(e){console.warn(e)}})();