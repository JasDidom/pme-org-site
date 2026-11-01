(function(){try{(function(){function sq(){var m=document.querySelector('main');if(!m)return;
 [].forEach.call(m.querySelectorAll('*'),function(e){if(e.closest('.keep-r'))return;var cs=getComputedStyle(e),r=parseFloat(cs.borderTopLeftRadius)||0;if(r<2||r>=40)return;
  var w=e.offsetWidth,h=e.offsetHeight;if(!w||!h)return;if(r*2>=Math.min(w,h)-2)return;e.style.borderRadius='0'})}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sq);else sq()})();
}catch(e){console.warn(e)}})();
;
(function(){try{(function(){var f=document.getElementById('lcF'),st=document.getElementById('lcS');if(!f)return;var db=null,uid=null;
 if(window.claude&&claude.use){Promise.all([claude.use('db'),claude.use('user')]).then(function(r){db=r[0];var u=r[1];if(db&&u&&u.id)return u.id().then(function(i){uid=i})}).catch(function(){db=null})}
 function msg(t,c){st.className=c||'';st.innerHTML=t}
 function mail(d){var b='Craft: '+d.craft+'\nTitle: '+d.title+'\nWhen: '+d.when+'\n\nPrompt:\n'+d.prompt+'\n\nA good answer includes:\n'+d.good+'\n\nName: '+d.name+'\nLink: '+d.link;
  return 'mailto:hello@performancemarketingengineer.org?subject='+encodeURIComponent('Prompt for the library: '+d.title)+'&body='+encodeURIComponent(b)}
 f.addEventListener('submit',function(e){e.preventDefault();var d={};['craft','title','when','prompt','good','name','link'].forEach(function(k){d[k]=(f.elements[k].value||'').trim()});
  if(!d.title||!d.prompt){msg('Add a title and the prompt.','err');return}if(!f.elements.ok.checked){msg('Please confirm the last box.','err');return}
  var btn=f.querySelector('button');btn.disabled=true;
  function fallback(){btn.disabled=false;msg('Almost there: <a href="'+mail(d)+'">send it by email</a> and we’ll review it.','ok')}
  if(db&&uid){d.at=new Date().toISOString();d.status='review';db.doc('submissions/'+uid+'/prompts/p'+Date.now()).set(d).then(function(){btn.disabled=false;f.reset();msg('Thanks. Your prompt is in review and will be published with your name once it passes.','ok')},fallback)}else fallback()})})();
(function(){var B=[].slice.call(document.querySelectorAll('.lb-f button')),C=[].slice.call(document.querySelectorAll('.lb-c'));
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