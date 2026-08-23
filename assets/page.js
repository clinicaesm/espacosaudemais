(function(){
  // Preloader
  window.addEventListener('load', function(){
    setTimeout(function(){ var p=document.querySelector('.preloader'); if(p) p.classList.add('done'); }, 250);
  });

  // Scroll progress + header + back-to-top
  var progress = document.querySelector('.scroll-progress');
  var header = document.querySelector('.site-header');
  var backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', function(){
    var h = document.documentElement;
    var scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if(progress) progress.style.width = scrolled + '%';
    if(header) header.classList.toggle('scrolled', h.scrollTop > 30);
    if(backToTop) backToTop.classList.toggle('show', h.scrollTop > 700);
  }, {passive:true});
  if(backToTop) backToTop.addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });

  // Mobile menu
  var menuBtn = document.querySelector('.menu-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  if(menuBtn && mobileNav){
    menuBtn.addEventListener('click', function(){
      var open = mobileNav.classList.toggle('open');
      menuBtn.classList.toggle('active', open);
      menuBtn.setAttribute('aria-expanded', open);
    });
    document.querySelectorAll('.mobile-nav a, .mobile-nav button').forEach(function(el){
      el.addEventListener('click', function(){ mobileNav.classList.remove('open'); menuBtn.classList.remove('active'); });
    });
  }

  // Reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry, i){
      if(entry.isIntersecting){
        entry.target.style.transitionDelay = (i % 4) * 70 + 'ms';
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // Footer year
  var y = document.querySelector('.year');
  if(y) y.textContent = new Date().getFullYear();
})();
