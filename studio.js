(function(){
var d=document;[].forEach.call(d.querySelectorAll('.k-plus'),function(b){b.addEventListener('click',function(){var n=b.parentNode.querySelector('.k-more');[].forEach.call(b.parentNode.querySelectorAll('.k-more'),function(x){x.hidden=false;x.classList.remove('k-more')});b.remove();if(n)n.focus()})});
d=document;var L=d.getElementById('kLap'),P=d.getElementById('kPh');
function fit(){[].forEach.call(d.querySelectorAll('.k-view'),function(v){var w=+v.dataset.w,f=v.firstElementChild,s=v.clientWidth/w;f.style.width=w+'px';f.style.height=Math.ceil(v.clientHeight/s)+'px';f.style.transform='scale('+s+')'})}
if(L){var t=d.querySelector('#kT [aria-pressed=true]').dataset.t,k=d.querySelector('#kD [aria-pressed=true]').dataset.d,seen=false;
var show=function(){var u='designs/'+t+'-'+k+'.html';if(seen){L.src=u;P.src=u}d.getElementById('kOpen').href=u;var o2=d.getElementById('kOpen2');if(o2)o2.href=u;var pb=d.querySelector('#kD [aria-pressed=true]'),ds=d.getElementById('kDesc');if(ds&&pb)ds.textContent=pb.dataset.desc||'';[].forEach.call(d.querySelectorAll('.k-lay'),function(x){x.setAttribute('aria-pressed',x.dataset.pick===k)});[].forEach.call(d.querySelectorAll('.k-pg'),function(a){a.href='designs/'+t+'-'+k+(a.dataset.pg?'-'+a.dataset.pg:'')+'.html'});fit()};
var bind=function(id,key){var bs=d.querySelectorAll('#'+id+' button[data-'+key+']');[].forEach.call(bs,function(b){b.addEventListener('click',function(){[].forEach.call(bs,function(x){x.setAttribute('aria-pressed',x===b)});if(key==='t')t=b.dataset.t;else k=b.dataset.d;show()})})};
bind('kT','t');bind('kD','d');
if('IntersectionObserver' in window){new IntersectionObserver(function(e,o){if(e[0].isIntersecting){seen=true;show();o.disconnect()}},{rootMargin:'600px'}).observe(L)}else{seen=true}
var C={},TR=d.getElementById('kTry');
function hx(c){return'#'+c.map(function(v){v=Math.max(0,Math.min(255,Math.round(v))).toString(16);return v.length<2?'0'+v:v}).join('')}
function rg(h){h=h.replace('#','');return[0,2,4].map(function(i){return parseInt(h.substr(i,2),16)})}
function mx(a,b,q){return a.map(function(v,i){return v+(b[i]-v)*q})}
function lm(c){var f=c.map(function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*f[0]+.7152*f[1]+.0722*f[2]}
function cn(a,b){var x=lm(a),y=lm(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
function paint(){[L,P].forEach(function(F){var D2,r;try{D2=F.contentDocument;r=D2&&D2.documentElement}catch(e){}if(!r)return;var s=r.style;['--p','--pd','--pdt','--a','--a2','--al','--at','--hf','--r','--br','--hb','--hc','--hl','--sh'].forEach(function(v){s.removeProperty(v)});
if(C.p){var p=rg(C.p),pd=mx(p,[0,0,0],.32);s.setProperty('--p',hx(p));s.setProperty('--pd',hx(pd));s.setProperty('--pdt',hx(pd)+'d9')}
if(C.a){var a=rg(C.a),n=0;while(Math.max(cn(a,[255,255,255]),cn(a,[20,24,29]))<4.6&&n++<20)a=mx(a,[0,0,0],.04);var a2=a;n=0;while(cn(a2,[240,236,224])<4.6&&n++<30)a2=mx(a2,[0,0,0],.08);var al=a,pp=rg(C.p||getComputedStyle(r).getPropertyValue('--p').trim()||'#12305c');n=0;while(cn(al,pp)<4.6&&n++<30)al=mx(al,[255,255,255],.1);
s.setProperty('--a',hx(a));s.setProperty('--a2',hx(a2));s.setProperty('--al',hx(al));s.setProperty('--at',cn(a,[255,255,255])>=cn(a,[20,24,29])?'#fff':'#14181d')}
if(C.f)s.setProperty('--hf',C.f);if(C.r!=null)s.setProperty('--r',C.r+'px');if(C.b)s.setProperty('--br',C.b==='pill'?'999px':'var(--r)');
if(C.h==='light'){s.setProperty('--hb','#fff');s.setProperty('--hc','var(--p)');s.setProperty('--hl','var(--line)')}
if(C.h==='dark'){s.setProperty('--hb','var(--pd)');s.setProperty('--hc','#fff');s.setProperty('--hl','rgba(255,255,255,.12)')}
if(C.w==='flat')s.setProperty('--sh','none');
var x=D2.getElementById('kx');if(!x&&D2.head){x=D2.createElement('style');x.id='kx';D2.head.appendChild(x)}
if(x)x.textContent=C.s==='compact'?'.sec{padding:52px 0!important}.cta{padding:48px 0!important}':C.s==='roomy'?'.sec{padding:124px 0!important}.cta{padding:96px 0!important}':''})}
function press(g,b){[].forEach.call(g.querySelectorAll('button'),function(x){x.setAttribute('aria-pressed',x===b)})}
if(TR){TR.addEventListener('click',function(e){var b=e.target.closest('button');if(!b||b.id==='kReset')return;var g=b.parentNode;
if(b.dataset.p){C.p=b.dataset.p;C.a=b.dataset.a;press(g,b);[].forEach.call(TR.querySelectorAll('.k-sw button'),function(x){x.setAttribute('aria-pressed',x.dataset.v===C[x.parentNode.dataset.k])})}
else if(b.dataset.v!==undefined){C[g.dataset.k]=b.dataset.v;press(g,b);if(g.classList.contains('k-sw'))press(TR.querySelector('.k-themes'),null)}
paint()});
TR.addEventListener('input',function(e){var i=e.target;if(i.type==='color'){C[i.dataset.k]=i.value;press(i.closest('.k-sw'),null);press(TR.querySelector('.k-themes'),null);paint()}});
d.getElementById('kReset').addEventListener('click',function(){C={};[].forEach.call(TR.querySelectorAll('button[aria-pressed]'),function(x){x.setAttribute('aria-pressed','false')});paint()});
L.addEventListener('load',paint);P.addEventListener('load',paint)}
[].forEach.call(d.querySelectorAll('.k-lay'),function(b){b.addEventListener('click',function(){var x=d.querySelector('#kD [data-d="'+b.dataset.pick+'"]');if(x){x.click();d.getElementById('designs').scrollIntoView({behavior:'smooth'})}})});
var Q=new URLSearchParams(location.search),qt=Q.get('t'),qd=Q.get('d');if(qt){var tb=d.querySelector('#kT button[data-t="'+qt+'"]');if(tb){var row=tb.closest('[data-grp]');if(tb.hidden){var pl=row.querySelector('.k-plus');if(pl)pl.click()}tb.click()}}if(qd){var db=d.querySelector('#kD button[data-d="'+qd+'"]');if(db)db.click()}
show()}
var S=d.getElementById('kSum');
if(S){var money=function(n){return 'A$'+Math.round(n).toLocaleString('en-AU')},calc=function(){var p=d.querySelector('input[name=kp]:checked'),n=+p.value;
[].forEach.call(d.querySelectorAll('.k-adds input[value]'),function(c){if(c.checked)n+=+c.value});
S.textContent='From '+money(n);d.getElementById('kHalf1').textContent=money(n/2);d.getElementById('kHalf2').textContent=money(n/2);
var c=d.getElementById('kCare'),m='from '+money(+p.dataset.care)+' a month';d.getElementById('kCareP').textContent=m;d.getElementById('kMonth').textContent=c.checked?m:'Not included'};
[].forEach.call(d.querySelectorAll('.k-build input'),function(i){i.addEventListener('change',calc)});calc()}
var H=d.querySelector('.hd');if(H){var st=function(){H.classList.toggle('stuck',scrollY>40)};addEventListener('scroll',st,{passive:true});st()}
var V=d.querySelector('.k-hero video');if(V&&matchMedia('(prefers-reduced-motion: reduce)').matches){V.removeAttribute('autoplay');V.pause()}
var rv=d.documentElement;if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){rv.classList.add('k-js');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});
[].forEach.call(d.querySelectorAll('main>section'),function(x){if(x.classList.contains('hero')||x.classList.contains('ph'))return;if(x.getBoundingClientRect().top<innerHeight)return;x.classList.add('k-rv');io.observe(x)})}
var Q=d.getElementById('kQ');
if(Q)Q.addEventListener('input',function(){var v=Q.value.trim().toLowerCase(),n=0;[].forEach.call(d.querySelectorAll('[data-sec=faq] details'),function(x){var hit=!v||x.textContent.toLowerCase().indexOf(v)>=0;x.hidden=!hit;if(hit)n++});d.getElementById('kNone').hidden=n>0});
})();
