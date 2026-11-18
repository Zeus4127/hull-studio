(function(){
var d=document,L=d.getElementById('kLap'),P=d.getElementById('kPh');
function fit(){[].forEach.call(d.querySelectorAll('.k-view'),function(v){var w=+v.dataset.w,f=v.firstElementChild,s=v.clientWidth/w;f.style.width=w+'px';f.style.height=Math.ceil(v.clientHeight/s)+'px';f.style.transform='scale('+s+')'})}
if(L){var t=d.querySelector('#kT [aria-pressed=true]').dataset.t,k=d.querySelector('#kD [aria-pressed=true]').dataset.d,seen=false;
var show=function(){var u='designs/'+t+'-'+k+'.html';if(seen){L.src=u;P.src=u}d.getElementById('kOpen').href=u;fit()};
var bind=function(id,key){var bs=d.querySelectorAll('#'+id+' button');[].forEach.call(bs,function(b){b.addEventListener('click',function(){[].forEach.call(bs,function(x){x.setAttribute('aria-pressed',x===b)});if(key==='t')t=b.dataset.t;else k=b.dataset.d;show()})})};
bind('kT','t');bind('kD','d');addEventListener('resize',fit);
if('IntersectionObserver' in window){new IntersectionObserver(function(e,o){if(e[0].isIntersecting){seen=true;show();o.disconnect()}},{rootMargin:'600px'}).observe(L)}else{seen=true}
show()}
var S=d.getElementById('kSum');
if(S){var money=function(n){return 'A$'+Math.round(n).toLocaleString('en-AU')},calc=function(){var p=d.querySelector('input[name=kp]:checked'),n=+p.value;
[].forEach.call(d.querySelectorAll('.k-adds input[value]'),function(c){if(c.checked)n+=+c.value});
S.textContent='From '+money(n);d.getElementById('kHalf1').textContent=money(n/2);d.getElementById('kHalf2').textContent=money(n/2);
var c=d.getElementById('kCare'),m='from '+money(+p.dataset.care)+' a month';d.getElementById('kCareP').textContent=m;d.getElementById('kMonth').textContent=c.checked?m:'Not included'};
[].forEach.call(d.querySelectorAll('.k-build input'),function(i){i.addEventListener('change',calc)});calc()}
var H=d.querySelector('.hd');if(H){var st=function(){H.classList.toggle('stuck',scrollY>40)};addEventListener('scroll',st,{passive:true});st()}
var V=d.querySelector('.k-hero video');if(V&&matchMedia('(prefers-reduced-motion: reduce)').matches){V.removeAttribute('autoplay');V.pause()}
var Q=d.getElementById('kQ');
if(Q)Q.addEventListener('input',function(){var v=Q.value.trim().toLowerCase(),n=0;[].forEach.call(d.querySelectorAll('[data-sec=faq] details'),function(x){var hit=!v||x.textContent.toLowerCase().indexOf(v)>=0;x.hidden=!hit;if(hit)n++});d.getElementById('kNone').hidden=n>0});
})();
