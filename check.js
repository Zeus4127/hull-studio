(function(){
var d=document,F=d.getElementById('kChk'),O=d.getElementById('kOut');if(!F)return;
var U=new URLSearchParams(location.search).get('Website')||new URLSearchParams(location.search).get('url');if(U){d.getElementById('kUrl').value=U}
function e(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function word(n){return n>=90?['Good','ok']:n>=50?['Needs work','mid']:['Poor','bad']}
function next(u,msg){return '<div class="k-next"><h3>'+msg+'</h3><p>We will build three designs of your new site, with your own name, words and photos, before you pay for anything.</p><p class="acts"><a class="btn" href="contact.html?Website='+encodeURIComponent(u)+'#quote">Get my three free designs</a></p></div>'}
function run(u){if(!/^https?:\/\//i.test(u))u='https://'+u;
O.innerHTML='<p class="k-wait">Checking '+e(u)+' as a phone sees it. This takes about half a minute.</p>';
var api='https://www.googleapis.com/pagespeedonline/v5/runPagespeed?strategy=mobile&url='+encodeURIComponent(u)+['performance','seo','accessibility','best-practices'].map(function(c){return '&category='+c}).join('');
fetch(api).then(function(r){if(!r.ok)throw r.status;return r.json()}).then(function(j){var L=j.lighthouseResult,C=L.categories,A=L.audits;
var cats=[['performance','Speed on a phone'],['seo','Found on Google'],['accessibility','Easy for everyone to use'],['best-practices','Safe and up to date']];
var h='<h2>Results for '+e(L.finalUrl||u)+'</h2><div class="k-scores">'+cats.map(function(c){var n=Math.round((C[c[0]]||{}).score*100||0),w=word(n);return '<div class="'+w[1]+'"><b>'+n+'</b><span>'+c[1]+'</span><small>'+w[0]+'</small></div>'}).join('')+'</div>';
var checks=[['viewport','Built for phones'],['is-on-https','Secure padlock (HTTPS)'],['document-title','Has a page title'],['meta-description','Has a search description'],['image-alt','Photos described for screen readers'],['color-contrast','Text easy to read'],['font-size','Text big enough on a phone']];
h+='<ul class="k-list">'+checks.filter(function(c){return A[c[0]]&&A[c[0]].score!==null}).map(function(c){var ok=A[c[0]].score>=0.9;return '<li class="'+(ok?'ok':'bad')+'">'+(ok?'Yes: ':'No: ')+c[1]+'</li>'}).join('');
if(A['largest-contentful-paint'])h+='<li class="'+(A['largest-contentful-paint'].score>=0.9?'ok':'bad')+'">Main content shows in '+e(A['largest-contentful-paint'].displayValue)+' on a phone</li>';
h+='</ul>';var low=cats.some(function(c){return ((C[c[0]]||{}).score||0)<0.9});
O.innerHTML=h+next(u,low?'Your site is losing you work. We can fix that.':'Your site is in good shape. Want it to win more work?')}).catch(function(){
O.innerHTML='<p class="k-wait">We could not run the instant check just now. Send us the address and we will check it by hand and email you a short report, free.</p>'+next(u,'We will check '+e(u.replace(/^https?:[/][/]/,''))+' for you.')})}
F.addEventListener('submit',function(ev){ev.preventDefault();var u=d.getElementById('kUrl').value.trim();if(u)run(u)});if(U)run(U)})();