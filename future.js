(function(){
var d=document,h=d.documentElement;h.classList.add('fl-js');
function hx(c){return'#'+c.map(function(v){v=Math.max(0,Math.min(255,Math.round(v))).toString(16);return v.length<2?'0'+v:v}).join('')}
function rg(h){h=h.replace('#','');return[0,2,4].map(function(i){return parseInt(h.substr(i,2),16)})}
function mx(a,b,q){return a.map(function(v,i){return v+(b[i]-v)*q})}
function lm(c){var f=c.map(function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*f[0]+.7152*f[1]+.0722*f[2]}
function cn(a,b){var x=lm(a),y=lm(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}

function $(i){return d.getElementById(i)}
var red=matchMedia('(prefers-reduced-motion: reduce)').matches,cs=window.CSS&&CSS.supports?function(a,b){return CSS.supports(a,b)}:function(){return false};
var okl=cs('color','oklch(50% .1 200)');
var Y={vt:[typeof CSSViewTransitionRule!=='undefined','supports it, so tapping the card glides.','does not support it, so the page simply loads.',1],
sd:[cs('animation-timeline','view()'),'supports it.','does not support it, so you see the finished page.',1],
ok:[okl,'supports oklch.','does not support oklch, so the panel mixes colours the plain way.',0],
sw:[('serviceWorker' in navigator)&&location.protocol==='https:','can save pages on this address.',('serviceWorker' in navigator)?'is not on https (for example a local file), so no saved copy is made here.':'does not support service workers, so no saved copy is made.',0]};
[].forEach.call(d.querySelectorAll('[data-you]'),function(e){var y=Y[e.dataset.you];if(!y)return;e.textContent='Your browser right now: '+(y[0]?y[1]:y[2])+(y[3]&&y[0]&&red?' Reduced motion is on, so the motion is off.':'')});
var ai=$('flAi');
if(ai){var ld=null,s=d.querySelector('script[type="application/ld+json"]');try{ld=JSON.parse(s.textContent)}catch(e){}
if(ld){var A=function(x){return x==null?[]:Array.isArray(x)?x:[x]},g=ld['@graph']||[ld],biz=null,sv=[];
g.forEach(function(n){var t=A(n['@type']);if(t.indexOf('Service')>-1){if(n.name&&sv.indexOf(n.name)<0)sv.push(n.name)}else if(!biz&&t.indexOf('WebSite')<0&&t.indexOf('BreadcrumbList')<0&&t.indexOf('FAQPage')<0&&n.name)biz=n});
if(biz){var C=$('flCards');C.textContent='';
var card=function(l,v,w){var c=d.createElement('div'),t=d.createElement('dt'),dd=d.createElement('dd');c.className='fl-card'+(w?' wide':'');t.textContent=l;if(Array.isArray(v)){var u=d.createElement('ul');u.className='fl-chips';v.forEach(function(x){var li=d.createElement('li');li.textContent=x;u.appendChild(li)});dd.appendChild(u)}else{var p=d.createElement('p');p.textContent=v;dd.appendChild(p)}c.appendChild(t);c.appendChild(dd);C.appendChild(c)};
var ar=A(biz.areaServed).map(function(x){return typeof x==='string'?x:(x&&x.name)||''}).filter(Boolean);
card('Type',A(biz['@type']).join(', '));card('Name',biz.name);if(biz.description)card('Description',biz.description,1);if(sv.length)card('Services',sv,1);card('Area',ar.length?ar:['Not given']);
$('flRaw').textContent=JSON.stringify(ld,null,2)}}
var bs=ai.querySelectorAll('.fl-seg button');[].forEach.call(bs,function(b){b.addEventListener('click',function(){ai.dataset.v=b.dataset.v;[].forEach.call(bs,function(x){x.setAttribute('aria-pressed',x===b)})})})}
var P=$('flPanel');
if(P){var RD=$('flRead'),SW=$('flSw'),AN=$('flAny'),W=[255,255,255],K=[20,24,29],BODY=[35,38,43];
function lin(v){v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)}
function gam(v){v=v<=.0031308?12.92*v:1.055*Math.pow(v,1/2.4)-.055;return Math.max(0,Math.min(1,v))*255}
function lab(c){var r=lin(c[0]),g=lin(c[1]),b=lin(c[2]),l=Math.cbrt(.4122214708*r+.5363325363*g+.0514459929*b),m=Math.cbrt(.2119034982*r+.6806995451*g+.1073969566*b),s=Math.cbrt(.0883024619*r+.2817188376*g+.6299787005*b);return[.2104542553*l+.793617785*m-.0040720468*s,1.9779984951*l-2.428592205*m+.4505937099*s,.0259040371*l+.7827717662*m-.808675766*s]}
function unlab(L,a,b){var l=L+.3963377774*a+.2158037573*b,m=L-.1055613458*a-.0638541728*b,s=L-.0894841775*a-1.291485548*b;l=l*l*l;m=m*m*m;s=s*s*s;return[gam(4.0767416621*l-3.3077115913*m+.2309699292*s),gam(-1.2684380046*l+2.6097574011*m-.3413193965*s),gam(-.0041960863*l-.7034186147*m+1.707614701*s)]}
function tint(c,L,k,q){if(!okl)return mx(c,W,q);var o=lab(c),C=Math.min(Math.sqrt(o[1]*o[1]+o[2]*o[2])*k,.045),H=Math.atan2(o[2],o[1]);return unlab(L,C*Math.cos(H),C*Math.sin(H))}
function r1(n){return(Math.floor(n*10)/10).toFixed(1)}
function theme(c0){var b=c0.slice(),n=0;while(cn(b,W)<4.5&&cn(b,K)<4.5&&n++<40)b=mx(b,[0,0,0],.04);
var bt=cn(b,W)>=cn(b,K)?W:K,s1=tint(b,.96,.2,.92),s2=tint(b,.9,.35,.8),bi=b.slice();n=0;while(cn(bi,s2)<4.6&&n++<40)bi=mx(bi,[0,0,0],.06);
var set=function(k,v){P.style.setProperty(k,hx(v))};set('--b',b);set('--bt',bt);set('--bi',bi);set('--bs',s1);set('--bs2',s2);
var a=cn(bi,s1),t=cn(bt,b),p=cn(BODY,s1),moved=hx(b)!==hx(c0);
RD.textContent='Brand '+hx(c0)+(moved?' (nudged to '+hx(b)+' so text stays readable)':'')+'. Contrast: heading '+r1(a)+' to 1, button text '+r1(t)+' to 1, body text '+r1(p)+' to 1. '+(Math.min(a,t,p)>=4.5?'All pass 4.5 to 1.':'Check this one.')}
function press(b){[].forEach.call(SW.querySelectorAll('.fl-s'),function(x){x.setAttribute('aria-pressed',x===b)})}
SW.addEventListener('click',function(e){var b=e.target.closest('.fl-s');if(!b)return;press(b);AN.value=b.dataset.v;theme(rg(b.dataset.v))});
AN.addEventListener('input',function(){press(null);theme(rg(AN.value))});theme(rg('#0d5068'))}
var N=$('flNet');
if(N){var T=$('flNetTx'),up=function(){var on=navigator.onLine;N.className='fl-chip'+(on?'':' off');T.textContent=on?'Online':'Offline: using the saved copy'};
addEventListener('online',up);addEventListener('offline',up);up();
var sv2=$('flSaved');if(window.caches&&caches.match){caches.match('future.html',{ignoreSearch:true}).then(function(m){sv2.textContent=m?'Saved copy of this page: ready on this device.':'Saved copy of this page: not yet. It is saved the first time you visit over https.'}).catch(function(){})}else sv2.textContent='Saved copy of this page: not available here. It needs an https address.'}
})();
