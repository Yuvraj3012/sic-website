(function(){
  const nav=document.getElementById('nav');
  const onScroll=()=>nav.classList.toggle('scrolled',scrollY>30);
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  // mobile menu
  const burger=document.getElementById('burger');
  burger.addEventListener('click',()=>{const o=document.body.classList.toggle('menu-open');burger.setAttribute('aria-expanded',o)});
  document.querySelectorAll('#links a').forEach(a=>a.addEventListener('click',()=>{document.body.classList.remove('menu-open');burger.setAttribute('aria-expanded',false)}));

  // active link on scroll
  const links=[...document.querySelectorAll('#links a')];
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-45% 0px -50% 0px'});
  document.querySelectorAll('main > section').forEach(s=>io.observe(s));

  // hero slides
  const ledes=["A student-led community bridging financial education, real-world investing, and industry connections.",
    "Analysts, alumni, and industry mentors who help each other grow — from first pitch to first offer.",
    "Manage real capital, publish research, and meet the firms hiring on the other side."];
  const dots=[...document.querySelectorAll('.dots button')],pills=[...document.querySelectorAll('#pillars div')],lede=document.getElementById('lede');
  let i=0,t;
  function go(n){i=n;dots.forEach((d,k)=>{d.classList.toggle('on',k===n);d.setAttribute('aria-selected',k===n)});pills.forEach((p,k)=>p.classList.toggle('on',k===n));
    lede.style.opacity=0;setTimeout(()=>{lede.textContent=ledes[n];lede.style.opacity=1},250);
    dots[n].classList.remove('on');void dots[n].offsetWidth;dots[n].classList.add('on');restart()}
  function restart(){clearInterval(t);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)t=setInterval(()=>go((i+1)%3),6000)}
  dots.forEach(d=>d.addEventListener('click',()=>go(+d.dataset.i)));restart();

  // search
  const s=document.getElementById('search'),si=document.getElementById('searchInput'),sr=document.getElementById('searchResults');
  const idx=[...document.querySelectorAll('main section[id]')].map(sec=>({id:sec.id,title:(sec.querySelector('h2,h1')||{}).textContent||sec.id,text:sec.textContent.toLowerCase()}));
  const openS=()=>{s.classList.add('open');si.value='';sr.innerHTML='';si.focus()},closeS=()=>s.classList.remove('open');
  document.getElementById('searchBtn').onclick=openS;document.getElementById('searchClose').onclick=closeS;
  addEventListener('keydown',e=>{if(e.key==='Escape')closeS()});
  si.addEventListener('input',()=>{const q=si.value.trim().toLowerCase();sr.innerHTML='';if(!q)return;
    const hits=idx.filter(x=>x.text.includes(q));
    sr.innerHTML=hits.length?hits.map(h=>`<a href="#${h.id}">${h.title}</a>`).join(''):'<p style="color:var(--muted);padding:12px 0">No matches. Try "SMIF", "research", or "careers".</p>';
    sr.querySelectorAll('a').forEach(a=>a.onclick=closeS)});

  // join form
  const f=document.getElementById('joinForm'),m=document.getElementById('formMsg');
  f.addEventListener('submit',e=>{e.preventDefault();
    const name=f.name.value.trim(),email=f.email.value.trim();
    if(!name){m.textContent='Enter your name to join.';f.name.focus();return}
    if(!/^\S+@\S+\.\S+$/.test(email)){m.textContent='Enter a valid email address so we can reach you.';f.email.focus();return}
    m.textContent=`Thanks, ${name.split(' ')[0]} — you're on the list. Watch your inbox for the next meeting details.`;f.reset()});
})();
