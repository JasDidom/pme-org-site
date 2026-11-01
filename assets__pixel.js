/* ================= pixel toolkit ================= */
const HEX = h => [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
const P = a => a.map(HEX);
const B4 = [0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
const dth = (x,y,f) => f*16 > B4[(y&3)*4+(x&3)] + .5;
function grad(stops,t,x,y){ t = t<0?0:t>.9999?.9999:t; const s=t*(stops.length-1), i=s|0; return dth(x,y,s-i)?stops[i+1]:stops[i]; }
function hash(x,y,s){ const h=Math.sin(x*127.1+y*311.7+s*74.7)*43758.5453; return h-Math.floor(h); }
function vn(x,y,s){ const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);
  const a=hash(xi,yi,s),b=hash(xi+1,yi,s),c=hash(xi,yi+1,s),d=hash(xi+1,yi+1,s); return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; }
function fbm(x,y,s){ return vn(x,y,s)*.55+vn(x*2.1,y*2.1,s+9)*.3+vn(x*4.3,y*4.3,s+17)*.15; }
function rng(seed){ return function(){ seed|=0; seed=seed+0x6D2B79F5|0; let t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
const mix=(a,b,t)=>[a[0]+(b[0]-a[0])*t|0,a[1]+(b[1]-a[1])*t|0,a[2]+(b[2]-a[2])*t|0];

class Pix{
  constructor(w,h){ this.w=w|0; this.h=h|0; this.cv=document.createElement('canvas'); this.cv.width=this.w; this.cv.height=this.h; this.g=this.cv.getContext('2d'); this.im=this.g.createImageData(this.w,this.h); this.d=this.im.data; }
  set(x,y,c,a){ x|=0; y|=0; if(x<0||y<0||x>=this.w||y>=this.h) return; const i=(y*this.w+x)*4, d=this.d; d[i]=c[0]; d[i+1]=c[1]; d[i+2]=c[2]; d[i+3]=a===undefined?255:a; }
  alpha(x,y){ x|=0; y|=0; if(x<0||y<0||x>=this.w||y>=this.h) return 0; return this.d[(y*this.w+x)*4+3]; }
  rect(x,y,w,h,c){ for(let j=y;j<y+h;j++) for(let i=x;i<x+w;i++) this.set(i,j,c); }
  done(){ this.g.putImageData(this.im,0,0); return this.cv; }
}
function skyFill(p,stops,y0,y1,seed){ y0=y0||0; y1=y1||p.h; for(let y=0;y<p.h;y++) for(let x=0;x<p.w;x++){ const t=(y-y0)/(y1-y0)+(vn(x*.05,y*.08,seed||1)-.5)*.06; p.set(x,y,grad(stops,t,x,y)); } }

function cloudSprite(w,h,seed,pal){
  const p=new Pix(w,h), r=rng(seed), blobs=[], n=4+(r()*3|0);
  for(let i=0;i<n;i++){ const br=h*(.26+r()*.26); blobs.push([w*(.14+.72*(i+.5)/n)+(r()-.5)*w*.08, h*.72-br*(.45+r()*.55), br]); }
  blobs.push([w*.5,h*.7,h*.28]);
  const floor=h*.84;
  for(let y=0;y<h;y++) for(let x=0;x<w;x++){
    if(y>floor+(vn(x*.2,0,seed)-.5)*3) continue;
    let depth=-1, top=h;
    for(const b of blobs){ const dx=x-b[0], dy=y-b[1], d=Math.sqrt(dx*dx+dy*dy)/b[2]; const nd=d+(fbm(x*.09,y*.09,seed)-.5)*.35; if(nd<1){ depth=Math.max(depth,1-nd); top=Math.min(top,b[1]-b[2]); } }
    if(depth<0) continue;
    const t=(y-top)/(floor-top)*.85+(1-depth)*.25+(fbm(x*.15,y*.15,seed+3)-.5)*.3;
    p.set(x,y,grad(pal,t,x,y));
  }
  return p.done();
}
function canopy(p,cx,cy,R,seed,pal,sq){
  sq=sq||1; const cell=Math.max(3,R*.16);
  const x0=Math.max(0,cx-R*1.3|0), x1=Math.min(p.w,cx+R*1.3|0), y0=Math.max(0,cy-R*1.3*sq|0), y1=Math.min(p.h,cy+R*1.3*sq|0);
  for(let y=y0;y<y1;y++) for(let x=x0;x<x1;x++){
    const dx=(x-cx)/R, dy=(y-cy)/(R*sq), d=Math.sqrt(dx*dx+dy*dy);
    if(d+(fbm(x*.07,y*.07,seed)-.5)*.7>1) continue;
    const gx=Math.floor(x/cell), gy=Math.floor(y/cell); let b1=1e9,b2=1e9,bx=0,by=0;
    for(let j=-1;j<=1;j++) for(let i=-1;i<=1;i++){ const px=(gx+i+hash(gx+i,gy+j,seed))*cell, py=(gy+j+hash(gx+i,gy+j,seed+1))*cell, dd=(x-px)*(x-px)+(y-py)*(y-py); if(dd<b1){ b2=b1; b1=dd; bx=px; by=py; } else if(dd<b2) b2=dd; }
    const edge=Math.sqrt(b2)-Math.sqrt(b1);
    const lx=(x-bx)/cell, ly=(y-by)/cell;
    let t=.55-(lx*.35+ly*.55)-dx*.18-dy*.3-(edge<1.3?.28:0)+(hash(x,y,seed+7)-.5)*.12;
    p.set(x,y,grad(pal,t,x,y));
    if(hash(x,y,seed)>.993) p.set(x,y,pal[pal.length-1]);
  }
}

/* ---------- flower head (shared by thesis + card) ---------- */
const PETALS=P(['#b8561e','#d9822b','#eea43a','#f5c549','#f9dc7c','#fdf0bd']);
const CORE=P(['#3e200b','#5a2e10','#7d4316','#a55e22']);
function drawFlower(p,cx,cy,R,seed){
  const sx=cx|0, sy=cy+R*.8|0, sb=p.h-1;
  const greens=P(['#23421d','#2f5a24','#44782f','#63983b','#8dbd4d']);
  for(let y=sy;y<=sb;y++){ const bend=Math.sin((y-sy)/(sb-sy+1)*2.2)*R*.12; for(let k=-1;k<=1;k++) p.set(sx+bend+k,y,greens[k<0?1:k===0?2:3]); }
  const leaf=(lx,ly,len,dir,s)=>{ for(let i=0;i<len;i++){ const t=i/len, half=Math.sin(t*Math.PI)*len*.28; for(let j=-half;j<=half;j++){ const xx=lx+dir*i, yy=ly-i*.45+j; const tt=.5+(j/(half+1))*.35+(fbm(xx*.3,yy*.3,s)-.5)*.5+ (dir>0?-.1:.1); p.set(xx,yy,grad(greens,tt,xx|0,yy|0)); } } };
  leaf(sx,sy+(sb-sy)*.45,R*.95,-1,seed); leaf(sx+1,sy+(sb-sy)*.62,R*.85,1,seed+2); leaf(sx,sy+(sb-sy)*.8,R*.6,-1,seed+4);
  for(let y=cy-R*1.2|0;y<cy+R*1.2;y++) for(let x=cx-R*1.25|0;x<cx+R*1.25;x++){
    const dx=x-cx, dy=(y-cy)*1.12, d=Math.sqrt(dx*dx+dy*dy), th=Math.atan2(dy,dx);
    const petal=.7+.3*Math.pow(Math.abs(Math.cos(th*6.5+seed)),.55);
    const Rr=R*petal*(.9+.2*fbm(x*.2,y*.2,seed));
    if(d>Rr) continue;
    const core=R*.3;
    if(d<core){ p.set(x,y,grad(CORE,d/core*.9+(hash(x,y,seed)-.5)*.35,x,y)); continue; }
    const t=(d-core)/(Rr-core);
    let v=t*.75+(-dx-dy)/(R*4)+(fbm(x*.35,y*.35,seed+1)-.5)*.5+.12;
    const c=grad(PETALS,v,x,y); p.set(x,y,c);
    if(hash(x,y,seed+3)>.94) p.set(x,y,PETALS[0]);
  }
}

/* ---------- buildings ---------- */
const STYLES={
  sand:{b:'#d6c09a',l:'#eadcbf',s:'#b39a73',w:'#7d6a52',g:'#9fbad6'},
  glass:{b:'#5876a0',l:'#7c9bc4',s:'#415d80',w:'#9dc2e6',g:'#c8e0f4'},
  grey:{b:'#b9bfc7',l:'#d8dde2',s:'#959da8',w:'#5d6c80',g:'#a9c4de'},
  dark:{b:'#2f3a4b',l:'#46566e',s:'#232d3b',w:'#6f89ab',g:'#8fb0d3'},
  brick:{b:'#b88867',l:'#d2a887',s:'#96694c',w:'#5b4a44',g:'#a5bfd8'}
};
function building(p,x,w,top,base,st,seed,haze,hazeC){
  const S={}; for(const k in st){ S[k]=HEX(st[k]); if(haze) S[k]=mix(S[k],hazeC,haze); }
  const r=rng(seed), kind=st===STYLES.glass||st===STYLES.dark?'glass':'punch';
  // crown
  if(r()<.4){ const cw=Math.max(3,w*(.4+r()*.3)|0), ch=3+(r()*6|0); p.rect(x+((w-cw)/2|0),top-ch,cw,ch,S.b); if(r()<.5) p.rect(x+(w/2|0),top-ch-(4+r()*8|0),1,4+(r()*8|0),S.s); }
  if(r()<.2){ for(let i=0;i<3;i++) p.rect(x+(w/2|0)-i,top-9+i*3,1+i*2,3,S.s); }
  for(let y=top;y<base;y++) for(let X=x;X<x+w;X++){
    let c=S.b;
    if(X===x) c=S.l; else if(X>=x+w-2) c=S.s;
    if(y===top) c=S.l;
    const lx=X-x-2, ly=y-top-3;
    if(kind==='punch'){ if(lx>=0&&X<x+w-3&&ly>=0&&y<base-2&&lx%3!==2&&ly%4<2) c=(hash(X,y,seed)>.8)?S.g:S.w; }
    else { if(lx>=0&&X<x+w-2&&ly>=0){ if(lx%2===0) c=S.s; else if(ly%3===0) c=S.b; else c=(hash(X>>1,y>>2,seed)>.7)?S.g:S.w; } }
    p.set(X,y,c);
  }
}

/* ---------- scene helper: fit a low-res canvas to CSS box ---------- */
function fit(cv,scale){ const r=cv.getBoundingClientRect(); const w=Math.max(80,Math.ceil(r.width/scale)), h=Math.max(60,Math.ceil(r.height/scale)); if(cv.width!==w||cv.height!==h){ cv.width=w; cv.height=h; } const g=cv.getContext('2d'); g.imageSmoothingEnabled=false; return {w,h,g}; }
function whenVisible(el,cb){ let v=false; new IntersectionObserver(es=>{ v=es[0].isIntersecting; if(v) cb(); },{threshold:0}).observe(el); return ()=>v; }


/* ---------- railway kit ---------- */
function drawCar(g,x1,y,L,liv,loco){
  const H=7; x1=Math.round(x1); y=Math.round(y); const x0=x1-L;
  g.fillStyle=liv.roof; g.fillRect(x0+1,y-H-1,L-(loco?3:2),1);
  g.fillStyle=liv.body; g.fillRect(x0,y-H,L-(loco?2:0),H-1);
  if(loco){ g.fillRect(x1-2,y-H+2,1,H-3); g.fillRect(x1-1,y-H+3,1,H-4); g.fillStyle=liv.nose||liv.stripe; g.fillRect(x1-1,y-H+3,1,1); }
  g.fillStyle=liv.stripe; g.fillRect(x0,y-3,L-(loco?1:0),1);
  for(let wx=x0+2;wx<x1-(loco?4:2);wx+=3){ g.fillStyle=liv.win; g.fillRect(wx,y-H+2,2,2); }
  g.fillStyle='#1b1b22'; g.fillRect(x0+2,y-1,2,1); g.fillRect(x1-(loco?6:4),y-1,2,1);
  if(loco&&liv.panto){ g.fillStyle='#3a3a44'; g.fillRect(x0+5,y-H-3,1,2); g.fillRect(x0+4,y-H-3,4,1); }
}
function drawTrain(g,x,y,n,L,liv){ for(let c=0;c<n;c++) drawCar(g,x-c*(L+1),y,L,liv,c===0); }
const LIV={
  pme:{body:'#2b5c8f',stripe:'#f1e6c8',roof:'#8f9aa8',win:'#ffe3a3',nose:'#ffd27a',panto:1},
  green:{body:'#3f7a4d',stripe:'#e9e1c9',roof:'#8f9aa8',win:'#dcefff',panto:1},
  terra:{body:'#b85a3c',stripe:'#f3e3c2',roof:'#8f8a88',win:'#ffe3a3',panto:1},
  grey:{body:'#9aa3ae',stripe:'#3d4a5c',roof:'#6d7681',win:'#e9f3fb',panto:1},
  tram:{body:'#e2742b',stripe:'#f3e5c6',roof:'#9c9690',win:'#3a3f4a',panto:1}
};
const CHECK=['.......#','......##','#....##.','##..##..','.####...','..##....'];
const DOLLAR=['..#..','.####','#.#..','.###.','..#.#','####.','..#..'];
function pxGlyph(g,rows,x,y,c,sh){ for(let j=0;j<rows.length;j++) for(let i=0;i<rows[j].length;i++) if(rows[j][i]==='#'){ if(sh){ g.fillStyle=sh; g.fillRect(x+i+1,y+j+1,1,1);} g.fillStyle=c; g.fillRect(x+i,y+j,1,1); } }
function cypress(p,x,base,h,w,seed,pal){
  for(let y=base-h;y<base;y++){ const k=(y-(base-h))/h; const hw=Math.max(.6,w*Math.sin(Math.min(1,k*1.15)*Math.PI*.55)*(k<.2?k/.2*.8+.2:1)); for(let X=Math.floor(x-hw);X<=Math.ceil(x+hw);X++){ const dx=(X-x)/(hw+.01); if(Math.abs(dx)>1+(hash(X,y,seed)-.5)*.5) continue; const t=.55-dx*.35+(fbm(X*.5,y*.35,seed)-.5)*.6+(1-k)*.1; p.set(X,y,grad(pal,t,X,y)); } }
}
function ridge(p,baseY,amp,freq,seed,pal,depthT){
  for(let x=0;x<p.w;x++){ const top=baseY-amp*fbm(x*freq,0,seed)|0; for(let y=Math.max(0,top);y<p.h;y++){ const t=(depthT||0)+(y-top)/(p.h-top)*.6+(hash(x,y,seed)-.5)*.12; p.set(x,y,grad(pal,t,x,y)); } }
}


const REDUCE=matchMedia('(prefers-reduced-motion: reduce)').matches; document.documentElement.classList.add('js');


/* ================= the library: four dusk-railway scenes ================= */
(function(){
  const SKY_DUSK=P(['#2d2f5e','#44427a','#6c5890','#9a6c96','#c98590','#e7a386','#f5c38e','#fbdca6']);
  const SKY_NIGHT=P(['#121430','#1b1d44','#272a58','#3a3a70','#5a4f86','#86658f']);
  const SKY_GOLD=P(['#3f6fb8','#5a88c8','#86a8d6','#c4c3cf','#efcd9f','#f7bf82']);
  const SKY_ROSE=P(['#3c3a72','#5d5290','#8e6aa0','#c4839a','#eba08a','#f8c792']);
  const CLOUD=P(['#fff3dc','#fbe0c0','#f2c2a6','#d99c98','#b07b93','#86688f']);
  const CLOUD_DAY=P(['#ffffff','#fbf3e6','#f1dcc4','#dcc3b2','#bca4a6']);
  const HILLP=P(['#a77f9f','#9a7697','#8c6d8f']), HILLD=P(['#6f5a7e','#624f73','#564668']), HILLN=P(['#3a3658','#302d4c','#272540']);
  const GRASS=P(['#3f5e44','#344f3a','#2a4130','#213528']);
  const CYP=P(['#131d1c','#1b2b26','#243a30','#2f4a39','#3f5e44']);
  const STONE=P(['#6e4d45','#8a6352','#a67a60','#c29773','#d9b48c','#ecd0a6']);
  const CR={e:'#3f7fdc',a:'#df9f36',c:'#e06e4c'};
  const LVB={e:{body:'#3f7fdc',stripe:'#e6efff',roof:'#9aa3ae',win:'#ffe3a3'},a:{body:'#df9f36',stripe:'#fff2d8',roof:'#9aa3ae',win:'#fff7e2'},c:{body:'#e06e4c',stripe:'#ffe6dc',roof:'#9aa3ae',win:'#ffe3a3',nose:'#ffd27a',panto:1}};

  function sun(p,sx,sy,sr,c1,c2,halo){ for(let y=0;y<p.h;y++) for(let x=0;x<p.w;x++){ const d=Math.hypot(x-sx,y-sy); if(d<sr) p.set(x,y,HEX(d<sr*.78?c1:c2)); else if(d<sr*2.3){ const t=(d-sr)/(sr*1.3); if(dth(x,y,1-t*1.1)) p.set(x,y,HEX(halo)); } } }
  function glow(p,cx,cy,r,col){ const c=HEX(col); for(let y=Math.floor(cy-r);y<=cy+r;y++) for(let x=Math.floor(cx-r);x<=cx+r;x++){ const d=Math.hypot(x-cx,y-cy)/r; if(d<1&&dth(x,y,(1-d)*.6)) p.set(x,y,c); } }
  function tracks(p,y){ const B=P(['#6b5a52','#584a45','#463b39']); for(let x=0;x<p.w;x++){ p.set(x,y,HEX('#cfc7ba')); p.set(x,y+1,HEX('#3a3238')); for(let k=2;k<p.h-y;k++) p.set(x,y+k,(x%3===1&&k===2)?HEX('#7a5a44'):grad(B,(k-2)/4+(hash(x,k,3)-.5)*.35,x,y+k)); } }
  function stars(p,n,ymax,seed){ const r=rng(seed); for(let i=0;i<n;i++){ const x=r()*p.w|0, y=r()*ymax|0, b=r(); p.set(x,y,HEX(b>.85?'#ffffff':b>.5?'#b7b3d0':'#6f6a95')); } }
  function clouds(list,pal){ return g=>list.forEach(c=>{ const w=Math.min(c[2],36); g.drawImage(cloudSprite(w,w*.42|0,c[3],pal),c[0]|0,c[1]|0); }); }
  function poleLine(p,xs,y,ty,col){ const C=HEX(col); xs.forEach(x=>{ for(let yy=y;yy<ty;yy++) p.set(x,yy,C); p.rect(x-2,y+1,5,1,C); });
    for(let x=0;x<p.w;x++){ let a=-1e9,b=1e9; xs.forEach(v=>{ if(v<=x&&v>a) a=v; if(v>x&&v<b) b=v; }); if(a<-1e8) a=-30; if(b>1e8) b=p.w+30; const t=(x-a)/(b-a); p.set(x,y+2+Math.round(Math.sin(t*Math.PI)*2.2),C); } }
  function container(p,x,y,w,h,col,r){ const c=mix(HEX(col),r()>.5?[255,255,255]:[0,0,0],r()*.16), d=mix(c,[0,0,0],.22), l=mix(c,[255,255,255],.25);
    for(let j=0;j<h;j++) for(let i=0;i<w;i++){ let k=c; if(j===0) k=l; else if(j===h-1) k=d; else if(i%2===1) k=d; if(i===0||i===w-1) k=mix(c,[0,0,0],.32); p.set(x+i,y+j,k); } }

  const S={
    signal(p,W,H){ skyFill(p,SKY_DUSK,0,H*.74,7); sun(p,W*.74,H*.58,Math.max(5,W*.065),'#fff4d6','#ffe2b0','#fbd3a0');
      ridge(p,H*.62,H*.1,.04,3,HILLP,0); ridge(p,H*.7,H*.07,.06,5,HILLD,.1);
      for(let i=0;i<5;i++) cypress(p,W*(.03+i*.055),H*.72,7+((i*37)%5)*2,1.3,40+i,CYP);
      ridge(p,H*.79,H*.02,.05,9,GRASS,0);
      const ty=H*.83|0;
      poleLine(p,[W*.1|0,W*.27|0],H*.44|0,ty,'#3b3040');
      const g1=W*.4|0, g2=W*.93|0, top=H*.27|0, post=HEX('#2a2633');
      for(let y=top;y<ty;y++){ p.set(g1,y,post); p.set(g1+1,y,post); p.set(g2,y,post); p.set(g2+1,y,post); if((y-top)%5===0){ p.set(g1-1,y,post); p.set(g2+2,y,post); } }
      p.rect(g1-1,top,g2-g1+4,2,post); for(let x=g1+2;x<g2;x+=4){ p.set(x,top+2,post); p.set(x+1,top+3,post); }
      [[.53,'e'],[.665,'a'],[.8,'c']].forEach(([v,k])=>{ const x=W*v|0, ly=top+8; glow(p,x,ly,7,CR[k]); p.rect(x-2,top+3,5,10,HEX('#1a1720')); p.rect(x-1,top+4,3,1,HEX('#3a3646')); p.rect(x-1,ly-1,3,3,HEX(CR[k])); p.set(x-1,ly-1,HEX('#ffffff')); p.rect(x-3,ly-2,1,5,HEX('#1a1720')); });
      tracks(p,ty);
      return [clouds([[W*.02,H*.1,W*.34,301],[W*.55,H*.05,W*.26,302]],CLOUD)]; },

    decisions(p,W,H){ skyFill(p,SKY_NIGHT,0,H*.72,11); stars(p,W*H/40,H*.55,4); sun(p,W*.16,H*.17,Math.max(3,W*.04),'#fff6e0','#efe3c6','#3e3d6e');
      ridge(p,H*.6,H*.08,.05,13,HILLD,0);
      const r=rng(5); for(let i=0;i<12;i++){ const bx=W*(.52+i*.04)|0, bh=2+(r()*7|0); p.rect(bx,(H*.58|0)-bh,3,bh+5,HEX(i%2?'#4a4466':'#423d5e')); if(r()>.35) p.set(bx+1,(H*.58|0)-bh+2,HEX('#ffd48a')); }
      ridge(p,H*.68,H*.04,.07,15,HILLN,0);
      const ty=H*.88|0, pt=ty-6;
      p.rect(0,pt,W,6,HEX('#6f6670')); p.rect(0,pt,W,1,HEX('#a59aa0')); for(let x=0;x<W;x+=6) p.set(x,pt+3,HEX('#5d5560'));
      // signal box
      const x0=W*.06|0, w=W*.42|0, cab=H*.3|0, mid=H*.47|0;
      glow(p,x0+w/2,cab+4,w*.62,'#ffd48a');
      glow(p,W*.765,H*.45,W*.26,'#6a64a8');
      for(let y=mid;y<pt;y++) for(let x=x0;x<x0+w;x++) p.set(x,y,((y-mid)%3===0||((x+((y-mid)/3|0)*2)%6===0))?HEX('#6e3a30'):HEX('#8a4f3e'));
      p.rect(x0-1,mid-1,w+2,2,HEX('#d9ccb4'));
      for(let y=cab;y<mid-1;y++) for(let x=x0;x<x0+w;x++){ const fr=(x-x0)%6===0||y===cab||y===mid-2; p.set(x,y,fr?HEX('#e3d6bd'):(hash(x>>1,y>>1,9)>.85?HEX('#ffe6b0'):HEX('#ffcf7a'))); }
      for(let i=0;i<4;i++){ const lx=x0+5+i*(w/4|0); p.rect(lx,mid-6,1,4,HEX('#5a3b28')); p.set(lx-1,mid-7,HEX('#c9352b')); }
      p.rect(x0-3,cab-3,w+6,3,HEX('#b5563a')); p.rect(x0-2,cab-4,w+4,1,HEX('#d27456')); p.rect(x0+w-6,cab-9,3,6,HEX('#6d4a3d'));
      // decision board
      const bx0=W*.58|0, bx1=W*.95|0, by0=H*.3|0, by1=H*.6|0;
      for(let y=by1;y<pt;y++){ p.set(bx0+3,y,HEX('#2a2633')); p.set(bx1-4,y,HEX('#2a2633')); }
      p.rect(bx0,by0,bx1-bx0,by1-by0,HEX('#1a1720')); p.rect(bx0+1,by0+1,bx1-bx0-2,by1-by0-2,HEX('#24212e'));
      const bw=bx1-bx0-12; [['e',.82],['a',.52],['c',.3]].forEach(([k,v],i)=>{ const y=by0+5+i*((by1-by0-8)/3|0); p.rect(bx0+3,y,2,2,HEX('#8f8ca3')); p.rect(bx0+8,y,Math.max(2,bw*v|0),2,HEX(CR[k])); });
      p.rect(bx0,by0,bx1-bx0,1,HEX('#3a3646'));
      // lamp
      const lx=W*.53|0; for(let y=H*.36|0;y<pt;y++) p.set(lx,y,HEX('#1f1c26')); p.rect(lx-1,H*.34|0,3,2,HEX('#ffe2a8')); glow(p,lx,H*.36,8,'#ffd48a');
      tracks(p,ty);
      return []; },

    creative(p,W,H){ skyFill(p,SKY_GOLD,0,H*.76,17); sun(p,W*.18,H*.6,Math.max(5,W*.07),'#fff6dc','#ffe4b0','#f7cf96');
      ridge(p,H*.64,H*.08,.04,19,P(['#9a93b0','#8d87a6','#827c9b']),0);
      ridge(p,H*.72,H*.04,.07,21,P(['#737d93','#687289','#5e687e']),0);
      const gy=H*.78|0, G=P(['#a6998a','#968a7c','#857a6e']); for(let y=gy;y<H;y++) for(let x=0;x<W;x++) p.set(x,y,grad(G,(y-gy)/(H-gy)+(hash(x,y,8)-.5)*.3,x,y));
      const r=rng(23), cw=Math.max(10,W*.13|0), ch=Math.max(5,H*.075|0), ks=['e','a','c'];
      // stacks
      [[.03,3],[.03+.135,2],[.03+.27,3],[.03+.405,1]].forEach(([v,n],si)=>{ for(let j=0;j<n;j++) container(p,W*v|0,gy-(j+1)*ch,cw,ch,CR[ks[(si+j)%3]],r); });
      // crane
      const c1=W*.58|0, c2=W*.95|0, ct=H*.17|0, cc=HEX('#4d5260'), cl=HEX('#6b7180');
      for(let y=ct;y<gy;y++){ p.rect(c1,y,2,1,cc); p.rect(c2,y,2,1,cc); if((y-ct)%4===0){ p.set(c1+2,y,cl); p.set(c2-1,y,cl); } }
      p.rect(c1-3,ct,c2-c1+8,3,cc); p.rect(c1-3,ct,c2-c1+8,1,cl); for(let x=c1;x<c2;x+=4) p.set(x,ct+3,cc);
      const tx=W*.74|0; p.rect(tx-3,ct+3,8,4,HEX('#2f3440')); p.set(tx-1,ct+4,HEX('#ffd48a'));
      const hy=H*.44|0; for(let y=ct+7;y<hy;y++) p.set(tx+1,y,HEX('#2f3440')); container(p,tx-cw/2+1|0,hy,cw,ch,CR.c,r);
      // flat wagon with variants
      const ty=H*.9|0; tracks(p,ty);
      const wx=W*.57|0, ww=W*.4|0; p.rect(wx,ty-3,ww,2,HEX('#3a3238')); p.rect(wx+2,ty-1,3,1,HEX('#1f1c22')); p.rect(wx+ww-5,ty-1,3,1,HEX('#1f1c22'));
      container(p,wx+1,ty-3-ch,cw,ch,CR.e,r); container(p,wx+cw+2,ty-3-ch,cw,ch,CR.a,r);
      return [clouds([[W*.36,H*.08,W*.3,311],[W*.02,H*.24,W*.22,312]],CLOUD_DAY)]; },

    loop(p,W,H){ skyFill(p,SKY_ROSE,0,H*.62,23); const sx=W*.5, sy=H*.46, sr=Math.max(6,W*.085); sun(p,sx,sy,sr,'#fff4d6','#ffe2b0','#fbd3a0');
      ridge(p,H*.48,H*.1,.035,25,HILLP,0);
      for(let i=0;i<7;i++) cypress(p,W*(.08+i*.13),H*.5,6+(i%3)*3,1.3,60+i,CYP);
      ridge(p,H*.56,H*.06,.05,27,HILLD,.1);
      const deck=H*.58|0, wy=H*.86|0, WATER=P(['#7d6690','#6a5a86','#584d78','#46406a']);
      for(let y=wy;y<H;y++) for(let x=0;x<W;x++){ const k=(y-wy)/(H-wy); let c=grad(WATER,k+(hash(x,y,8)-.5)*.2,x,y); const hw=sr*(1.2-k*.6)*(.55+.45*Math.sin(y*1.7)); if(y%2===0&&Math.abs(x-sx)<hw&&hash(x>>2,y,9)>.25) c=HEX(k<.45?'#f7cf98':'#e0a98a'); p.set(x,y,c); }
      const span=14, pier=4;
      for(let y=deck;y<wy+2;y++) for(let x=0;x<W;x++){ const lx=((x%span)+span)%span, inP=lx<pier;
        if(y>deck+3&&!inP){ const cx=pier+(span-pier)/2, rad=(span-pier)/2, at=deck+4+rad, dx=lx-cx; if(y>at-Math.sqrt(Math.max(0,rad*rad-dx*dx))) continue; }
        let t=.62+(hash(x>>1,y>>1,4)-.5)*.25; if(y<=deck+1) t=.9; if(inP&&lx===pier-1) t=.35; if(y===deck+2) t=.4; if((y-deck)%4===0&&hash(x,y,5)>.5) t-=.12; p.set(x,y,grad(STONE,t,x,y)); }
      for(let x=0;x<W;x++){ p.set(x,deck-1,HEX('#4a3c38')); if(x%3===0) p.set(x,deck,HEX('#6a5244')); }
      for(let x=6;x<W;x+=22){ for(let y=deck-17;y<deck-1;y++) p.set(x,y,HEX('#3b3440')); p.rect(x-1,deck-17,4,1,HEX('#3b3440')); }
      for(let x=0;x<W;x++) p.set(x,deck-15,HEX('#4b4354'));
      return [clouds([[W*.04,H*.06,W*.3,321],[W*.64,H*.12,W*.28,322]],CLOUD),
        g=>{ const L=Math.min(40,Math.max(14,W*.2|0)), front=W*.82|0; ['c','a','e'].forEach((k,i)=>drawCar(g,front-i*(L+1),deck-1,L,LVB[k],i===0)); }]; }
  };

  function paint(cv){ const r=cv.getBoundingClientRect(); if(!r.width) return; const f=fit(cv,r.width>200?3:2), p=new Pix(f.w,f.h); const post=S[cv.dataset.scene](p,f.w,f.h)||[]; f.g.clearRect(0,0,f.w,f.h); f.g.drawImage(p.done(),0,0); post.forEach(fn=>fn(f.g)); }
  const all=()=>document.querySelectorAll('canvas[data-scene]').forEach(paint);
  all(); let t; addEventListener('resize',()=>{ clearTimeout(t); t=setTimeout(all,220); });
})();

(function(){
  const BG=HEX('#f4f4f0');
  function fray(cv){ const side=cv.dataset.fray, f=fit(cv,4), p=new Pix(f.w,f.h), seed=f.w%97+(side==='top'?3:7);
    for(let x=0;x<p.w;x++){ const d=p.h*(.3+.7*fbm(x*.11,0,seed)); for(let y=0;y<p.h;y++){ const e=side==='bottom'?p.h-1-y:y; if(e<1||(e<d&&hash(x,y,seed)<Math.pow(1-e/d,.75))) p.set(x,y,BG); } }
    f.g.clearRect(0,0,f.w,f.h); f.g.drawImage(p.done(),0,0); }
  const all=()=>document.querySelectorAll('canvas[data-fray]').forEach(fray); all(); let t; addEventListener('resize',()=>{ clearTimeout(t); t=setTimeout(all,220); });
  if('IntersectionObserver' in window){ const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }),{rootMargin:'0px 0px -6% 0px'}); document.querySelectorAll('.rv').forEach(el=>io.observe(el)); }
  else document.querySelectorAll('.rv').forEach(el=>el.classList.add('in'));
})();
