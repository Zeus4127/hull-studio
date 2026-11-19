(function(){
var d=document,R=d.documentElement,K='cm_custom',S={},main=d.getElementById('main');
var cs=d.currentScript,show=!cs||!cs.src||cs.dataset.show==='1'||/[?&]customise/.test(location.search);
if(!main||!show||window.top!==window.self||/[?&]shot/.test(location.search))return;
try{S=JSON.parse(localStorage.getItem(K)||'{}')||{}}catch(e){S={}}
var NAMES={facts:'Numbers band',about:'About',services:'Services',gallery:'Photo wall',capability:'Capability',projects:'Projects',steps:'How we work',branches:'Branches',faq:'Questions',careers:'Careers',badges:'Licences and badges',credentials:'Licence and insurance cards',before_after:'Before and after',costs:'Cost guide',reviews:'Reviews'};
function rgb(h){h=h.replace('#','');return[0,2,4].map(function(i){return parseInt(h.substr(i,2),16)})}
function hex(c){return'#'+c.map(function(v){v=Math.max(0,Math.min(255,Math.round(v))).toString(16);return v.length<2?'0'+v:v}).join('')}
function mix(a,b,k){return a.map(function(v,i){return v+(b[i]-v)*k})}
function lum(c){var f=c.map(function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*f[0]+.7152*f[1]+.0722*f[2]}
function con(a,b){var x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
function set(k,v){R.style.setProperty(k,v)}
function secs(){return[].slice.call(main.querySelectorAll('[data-sec]'))}
function apply(){
if(S.primary){var p=rgb(S.primary),pd=mix(p,[0,0,0],.32);set('--p',hex(p));set('--pd',hex(pd));set('--pdt',hex(pd)+'d9')}
if(S.accent){var a=rgb(S.accent),a2=a,n=0;while(con(a2,[240,236,224])<4.6&&n++<30)a2=mix(a2,[0,0,0],.08);set('--a',hex(a));set('--a2',hex(a2));set('--al',hex(a));set('--at',con(a,[255,255,255])>=con(a,[20,24,29])?'#fff':'#14181d')}
if(S.header==='light'){set('--hb','#fff');set('--hc','var(--p)');set('--hl','var(--line)')}
if(S.header==='dark'){set('--hb','var(--pd)');set('--hc','#fff');set('--hl','rgba(255,255,255,.12)')}
if(S.corners!=null)set('--r',S.corners+'px');
if(S.buttons)set('--br',S.buttons==='pill'?'999px':'var(--r)');
if(S.font)set('--hf',{inter:'Inter',fraunces:'Fraunces',barlow:'BarlowC',sora:'Sora',spaceg:'SpaceG',outfit:'Outfit',playfair:'Playfair',archivo:'Archivo'}[S.font]||'Sora');
var h=main.querySelector('.hero.full');if(h&&S.hero)h.classList.toggle('as-split',S.hero==='split');
var end=main.querySelector('.cta'),by={};secs().forEach(function(s){by[s.dataset.sec]=s});
(S.order||[]).forEach(function(k){if(by[k])main.insertBefore(by[k],end)});
secs().forEach(function(s){s.hidden=(S.hide||[]).indexOf(s.dataset.sec)>=0})}
function save(){try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}apply();var o=d.getElementById('cmOut');if(o)o.value=JSON.stringify(S)}
apply();
var css='.cmB{position:fixed;left:14px;bottom:14px;z-index:60;padding:10px 16px;border-radius:999px;border:0;background:#0c0f14;color:#fff;font:600 13px Inter,system-ui,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.35);cursor:pointer}'
+'.cmP{position:fixed;left:0;top:0;bottom:0;z-index:61;width:min(340px,92vw);background:#fff;color:#14181d;box-shadow:0 0 40px rgba(0,0,0,.35);overflow:auto;padding:18px;font:14px/1.4 Inter,system-ui,sans-serif}'
+'.cmP h4{margin:16px 0 8px;font:700 12px Inter,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#55606b}.cmP label{display:flex;justify-content:space-between;align-items:center;gap:10px;margin:6px 0}'
+'.cmP select,.cmP input[type=color]{font:inherit;padding:4px;min-width:120px;height:34px}.cmP .row{display:flex;align-items:center;gap:6px;padding:5px 0;border-top:1px solid #e6e9ee}.cmP .row span{flex:1}'
+'.cmP button{font:600 13px Inter,sans-serif;padding:7px 10px;border-radius:8px;border:1px solid #c3cad6;background:#fff;color:#14181d;cursor:pointer}.cmP .go{background:#0c0f14;color:#fff;border-color:#0c0f14}'
+'.cmP textarea{width:100%;height:70px;font:12px monospace;margin-top:8px}.cmP .top2{display:flex;justify-content:space-between;align-items:center}'
+'@media(max-width:700px){.cmB{bottom:78px}}';
var st=d.createElement('style');st.textContent=css;d.head.appendChild(st);
var b=d.createElement('button');b.className='cmB';b.type='button';b.textContent='Customise';d.body.appendChild(b);
var P=null;
function sel(label,key,opts){var l=d.createElement('label');l.textContent=label;var s=d.createElement('select');opts.forEach(function(o){var e=d.createElement('option');e.value=o[0];e.textContent=o[1];s.appendChild(e)});
if(S[key]!=null)s.value=S[key];s.addEventListener('change',function(){S[key]=key==='corners'?+s.value:s.value;save()});l.appendChild(s);return l}
function col(label,key,v){var l=d.createElement('label');l.textContent=label;var i=d.createElement('input');i.type='color';i.value=S[key]||getComputedStyle(R).getPropertyValue(v).trim()||'#000000';
i.addEventListener('input',function(){S[key]=i.value;save()});l.appendChild(i);return l}
function list(box){box.textContent='';secs().forEach(function(s){var k=s.dataset.sec,r=d.createElement('div');r.className='row';
var c=d.createElement('input');c.type='checkbox';c.checked=!s.hidden;c.setAttribute('aria-label','Show '+(NAMES[k]||k));
c.addEventListener('change',function(){S.hide=(S.hide||[]).filter(function(x){return x!==k});if(!c.checked)S.hide.push(k);save()});
var n=d.createElement('span');n.textContent=NAMES[k]||k;r.appendChild(c);r.appendChild(n);
[['Up',-1],['Down',1]].forEach(function(m){var u=d.createElement('button');u.type='button';u.textContent=m[0];u.addEventListener('click',function(){var o=secs().map(function(x){return x.dataset.sec}),i=o.indexOf(k),j=i+m[1];
if(j<0||j>=o.length)return;o.splice(i,1);o.splice(j,0,k);S.order=o;save();list(box)});r.appendChild(u)});box.appendChild(r)})}
function open(){if(P){P.hidden=!P.hidden;return}
P=d.createElement('div');P.className='cmP';P.setAttribute('role','dialog');P.setAttribute('aria-label','Customise this design');
var t=d.createElement('div');t.className='top2';var h=d.createElement('b');h.textContent='Customise this design';var x=d.createElement('button');x.type='button';x.textContent='Close';x.addEventListener('click',function(){P.hidden=true});t.appendChild(h);t.appendChild(x);P.appendChild(t);
function head(s){var e=d.createElement('h4');e.textContent=s;P.appendChild(e)}
head('Colours');P.appendChild(col('Main colour','primary','--p'));P.appendChild(col('Highlight colour','accent','--a'));
head('Layout');P.appendChild(sel('Header','header',[['','As designed'],['dark','Dark'],['light','White']]));P.appendChild(sel('Top of page','hero',[['full','Full photo'],['split','Words left, photo right']]));
P.appendChild(sel('Corners','corners',[[16,'Rounded'],[24,'Very rounded'],[8,'Slight'],[0,'Square']]));P.appendChild(sel('Buttons','buttons',[['pill','Pill'],['square','Match corners']]));
P.appendChild(sel('Heading font','font',[['','As designed'],['sora','Sora (bold)'],['inter','Inter (plain)'],['fraunces','Fraunces (serif)'],['barlow','Barlow (condensed)']]));
head('Sections: show, hide and reorder');var box=d.createElement('div');P.appendChild(box);list(box);
head('Keep these settings');var c=d.createElement('button');c.type='button';c.className='go';c.textContent='Copy settings';var r=d.createElement('button');r.type='button';r.textContent='Reset';r.style.marginLeft='8px';
var o=d.createElement('textarea');o.id='cmOut';o.readOnly=true;o.value=JSON.stringify(S);o.setAttribute('aria-label','Settings code');
c.addEventListener('click',function(){o.select();var done=function(){c.textContent='Copied'};if(navigator.clipboard)navigator.clipboard.writeText(o.value).then(done,function(){});else{try{d.execCommand('copy');done()}catch(e){}}});
r.addEventListener('click',function(){try{localStorage.removeItem(K)}catch(e){}location.reload()});
P.appendChild(c);P.appendChild(r);P.appendChild(o);var note=d.createElement('p');note.textContent='Send this code to your web builder to make the changes permanent.';P.appendChild(note);d.body.appendChild(P)}
b.addEventListener('click',open);
})();
