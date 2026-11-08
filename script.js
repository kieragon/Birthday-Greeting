const $=s=>document.querySelector(s),cake=$('#cake'),btn=$('#btn'),st=$('#st'),cv=$('#cf'),cx=cv.getContext('2d');
let W,H,P=[],raf,lit=true;
const rs=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};
rs();addEventListener('resize',rs);
const COL=['#ff5d8f','#ffc145','#47c1bf','#7a6ff0','#ff8a5b','#8bd450'];
function burst(x,y,n=90,sp=6.3,a=-1.57){
  for(let i=0;i<n;i++){
    const t=a+(Math.random()-.5)*sp,v=4+Math.random()*9;
    P.push({x,y,vx:Math.cos(t)*v,vy:Math.sin(t)*v,w:6+Math.random()*6,h:4+Math.random()*5,r:Math.random()*6,l:0,m:120+Math.random()*80,c:COL[i%6]});
  }
  raf||(raf=requestAnimationFrame(tick));
}
function tick(){
  cx.clearRect(0,0,W,H);
  P=P.filter(p=>p.l<p.m&&p.y<H+20);
  P.forEach(p=>{
    p.l++;p.vx*=.985;p.vy=p.vy*.985+.22;p.x+=p.vx;p.y+=p.vy;p.r+=.2;
    cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);
    cx.globalAlpha=Math.min(1,(p.m-p.l)/30);cx.fillStyle=p.c;
    cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);cx.restore();
  });
  raf=P.length?requestAnimationFrame(tick):0;
}
function toggle(){
  lit=!lit;
  cake.classList.toggle('out',!lit);
  btn.textContent=lit?'Blow out the candles':'Relight the candles';
  st.textContent=lit?'Make a wish, then blow them out.':'Your wish is on its way ✨';
  if(!lit){const b=cake.getBoundingClientRect();burst(b.left+b.width/2,b.top+b.height*.3,110,3.5);}
}
btn.onclick=cake.onclick=toggle;
$('#name').oninput=e=>{const v=e.target.value.trim();$('#who').textContent=v?', '+v:'';};
document.addEventListener('pointerdown',e=>{if(!e.target.closest('button,input,#cake'))burst(e.clientX,e.clientY,40);});
setTimeout(()=>{burst(0,H,70,1,-.8);burst(W,H,70,1,-2.35);},2300);