/* PME v18 · pixel fields: generative square-pixel clouds that "build" into place */
(function(){
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var C = {navy:'#1c2541', blue:'#3b5bd9', sky:'#8fa4ee', amber:'#f2b632', gold:'#f7d36b', coral:'#e5603e', green:'#3aa65a', lime:'#cfe84a', ink:'#2e2e2c', grey:'#d9d8d2'};
  function h2(x,y,s){ var n=Math.sin(x*127.1+y*311.7+s*74.7)*43758.5453; return n-Math.floor(n); }
  function vn(x,y,s){ var xi=Math.floor(x), yi=Math.floor(y), xf=x-xi, yf=y-yi; var u=xf*xf*(3-2*xf), v=yf*yf*(3-2*yf);
    var a=h2(xi,yi,s), b=h2(xi+1,yi,s), c=h2(xi,yi+1,s), d=h2(xi+1,yi+1,s); return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; }
  function fbm(x,y,s){ return .55*vn(x,y,s)+.3*vn(x*2.1,y*2.1,s+9)+.15*vn(x*4.3,y*4.3,s+21); }
  var ss=function(a,b,x){ x=Math.max(0,Math.min(1,(x-a)/(b-a))); return x*x*(3-2*x); };

  /* each type returns [density 0..1, colour] for a cell at (u,v) in 0..1 */
  var T = {
    hero: function(u,v,n,r){ var edge=.78+(n-.5)*.38; if(v>edge) return [0];
      var d=.98-v*.55+(n-.5)*.5; var t=(u*1.1-v*.9)+(fbm(u*3,v*3,3)-.5)*.9;
      var c=t>.42?(r<.18?C.coral:(r<.26?C.lime:C.amber)):t>-.05?(r<.1?C.sky:C.blue):(r<.15?C.blue:C.navy); return [d,c]; },
    funnel: function(u,v,n,r){ var mid=.5+Math.sin(u*5)*.06, w=u<.5?.06+.42*Math.pow(1-u*2,2):.06+.5*Math.pow((u-.5)*2,1.6); var dy=Math.abs(v-mid);
      if(dy>w*(.7+n*.6)) return [0]; var d=(u<.5?.35+.6*(u*2):.95-.5*((u-.5)*2))*(1-dy/(w+.02))+.15;
      var c=u<.42?(r<.5?C.blue:C.sky):u<.58?(r<.5?C.blue:C.amber):(r<.65?C.amber:(r<.8?C.gold:C.coral)); return [d,c]; },
    build: function(u,v,n,r,x,cols){ var col=Math.floor(u*24), hh=.25+.7*vn(col*.7,0,4)*(.6+.4*Math.sin(col*.9)); if(1-v>hh+(n-.5)*.05) return [0];
      var d=.75+.25*vn(u*9,v*9,5); var k=col%6; var c=k<2?C.navy:k<4?C.blue:k<5?C.amber:C.coral; if(r<.06) c=C.lime; return [d,c]; },
    signal: function(u,v,n,r){ var dx=u-.62, dy=v-.5, rr=Math.sqrt(dx*dx*1.2+dy*dy*3); var d=1-rr*1.9+(n-.5)*.6; return [d, r<.12?C.navy:(r<.45?C.sky:C.blue)]; },
    decisions: function(u,v,n,r){ var dx=u-.55, dy=v-.55, rr=Math.sqrt(dx*dx*1.1+dy*dy*2.6); var d=1-rr*1.9+(n-.5)*.6; return [d, r<.12?C.navy:(r<.45?C.gold:C.amber)]; },
    creative: function(u,v,n,r){ var dx=u-.45, dy=v-.5, rr=Math.sqrt(dx*dx*1.3+dy*dy*2.8); var d=1-rr*1.9+(n-.5)*.6; return [d, r<.12?C.navy:(r<.4?C.amber:C.coral)]; },
    loop: function(u,v,n,r){ var a=Math.atan2(v-.5,(u-.5)*1.8), rr=Math.hypot((u-.5)*1.8,v-.5); var ring=Math.abs(rr-.32); var d=1-ring*6+(n-.5)*.5;
      var k=(a+Math.PI)/(Math.PI*2); var c=k<.33?C.coral:k<.66?C.amber:C.blue; if(r<.1) c=C.navy; return [d,c]; },
    crowd: function(u,v,n,r){ var d=.35+.55*fbm(u*5,v*3,8)+(v>.6?.2:0); var c=r<.3?C.navy:r<.55?C.blue:r<.75?C.amber:r<.9?C.coral:C.sky; return [d,c]; }
  };

  function setup(cv){
    var r=cv.getBoundingClientRect(); if(!r.width) return null;
    var dpr=Math.min(2,devicePixelRatio||1), cell=parseFloat(cv.dataset.cell||'')||(r.width<520?7:r.width<900?8:10);
    cv.width=Math.round(r.width*dpr); cv.height=Math.round(r.height*dpr);
    var g=cv.getContext('2d'); g.setTransform(dpr,0,0,dpr,0,0);
    var cols=Math.floor(r.width/cell), rows=Math.floor(r.height/cell), ox=(r.width-cols*cell)/2, oy=(r.height-rows*cell)/2;
    var fn=T[cv.dataset.field]||T.hero, seed=(cv.dataset.seed|0)||7, cells=[];
    for(var y=0;y<rows;y++) for(var x=0;x<cols;x++){
      var u=(x+.5)/cols, v=(y+.5)/rows, n=fbm(u*4,v*4,seed), rnd=h2(x,y,seed+3), out=fn(u,v,n,rnd,x,cols);
      if(out[0]>0 && h2(x,y,seed)<out[0]){ var alpha=h2(x,y,seed+5)<.25?.45:1;
        var order=cv.dataset.field==='build'?(1-v)*.8+h2(x,y,1)*.2:(cv.dataset.field==='funnel'?u*.7+h2(x,y,1)*.3:h2(x,y,1));
        cells.push({x:ox+x*cell,y:oy+y*cell,c:out[1],a:alpha,o:order}); }
    }
    return {g:g,w:r.width,h:r.height,cell:cell,cells:cells,gap:Math.max(1,Math.round(cell*.18))};
  }
  function draw(S,k,t){
    var g=S.g; g.clearRect(0,0,S.w,S.h); var s=S.cell-S.gap;
    for(var i=0;i<S.cells.length;i++){ var p=S.cells[i]; if(p.o>k) continue;
      var a=p.a; if(t&&h2(i,Math.floor(t/900),2)<.012) a*=.35;
      g.globalAlpha=a; g.fillStyle=p.c; g.fillRect(p.x,p.y,s,s); }
    g.globalAlpha=1;
  }
  var list=[];
  function init(){
    list=[].slice.call(document.querySelectorAll('canvas[data-field]')).map(function(cv){ return {cv:cv,S:setup(cv),k:RM?1.1:0,vis:false}; });
    if('IntersectionObserver' in window){ var io=new IntersectionObserver(function(es){ es.forEach(function(e){ var it=list.find(function(o){return o.cv===e.target;}); if(it){ it.vis=e.isIntersecting; } }); },{rootMargin:'0px 0px -10% 0px'}); list.forEach(function(it){ io.observe(it.cv); }); }
    else list.forEach(function(it){ it.vis=true; });
  }
  function loop(t){
    list.forEach(function(it){ if(!it.S||!it.vis) return; if(it.k<1.1) it.k=Math.min(1.1,it.k+.012); draw(it.S,it.k,RM?0:t); });
    requestAnimationFrame(loop);
  }
  function resize(){ list.forEach(function(it){ it.S=setup(it.cv); }); }
  init(); requestAnimationFrame(loop);
  var rt; addEventListener('resize',function(){ clearTimeout(rt); rt=setTimeout(resize,200); });
  /* re-measure hidden canvases (tabs) when they appear */
  document.addEventListener('pme:shown',function(){ resize(); });

  /* reveal */
  var rv=[].slice.call(document.querySelectorAll('.rv:not(.in)'));
  if('IntersectionObserver' in window){ var io2=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io2.unobserve(e.target); } }); },{rootMargin:'0px 0px -6% 0px'}); rv.forEach(function(el){ io2.observe(el); }); }
  else rv.forEach(function(el){ el.classList.add('in'); });

  /* tabs */
  var tabs=[].slice.call(document.querySelectorAll('[data-tabs] [role=tab]'));
  tabs.forEach(function(b){ b.addEventListener('click',function(){ var box=b.closest('[data-tabs]'), id=b.dataset.t;
    [].forEach.call(box.querySelectorAll('[role=tab]'),function(x){ x.setAttribute('aria-selected',x===b); });
    [].forEach.call(document.querySelectorAll('[data-pane-of="'+box.id+'"] .pane'),function(p){ p.hidden=p.dataset.p!==id; });
    document.dispatchEvent(new Event('pme:shown')); }); });

  /* carousels */
  [].forEach.call(document.querySelectorAll('[data-car]'),function(box){ var tr=box.querySelector('.ctrack'); if(!tr) return;
    var step=function(d){ var c=tr.firstElementChild; tr.scrollBy({left:d*((c?c.offsetWidth:320)+16),behavior:'smooth'}); };
    var p=box.querySelector('[data-prev]'), n=box.querySelector('[data-next]'); if(p) p.onclick=function(){step(-1)}; if(n) n.onclick=function(){step(1)}; });
})();
