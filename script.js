// Basic interactive behaviors: nav toggle, typing effect, reveal on scroll, animate skill bars, contact form handling

document.addEventListener('DOMContentLoaded', () => {
  // NAV toggle
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  toggle && toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('show');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Typing effect for hero
  const typingEl = document.getElementById('typing-text');
  const phrases = [
    'Front-end engineer • React / TypeScript',
    'Performance & Accessibility advocate',
    'Building delightful user experiences'
  ];
  let p = 0, i = 0, forward = true;
  function tick(){
    const current = phrases[p];
    if(forward){
      i++;
      typingEl.textContent = current.slice(0, i);
      if(i === current.length){ forward = false; setTimeout(tick, 1300); return; }
    } else {
      i--;
      typingEl.textContent = current.slice(0, i);
      if(i === 0){ forward = true; p = (p+1)%phrases.length; }
    }
    setTimeout(tick, forward ? 50 : 25);
  }
  tick();

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    for(const e of entries){
      if(e.isIntersecting){ e.target.classList.add('visible'); }
    }
  }, {threshold: 0.12});
  reveals.forEach(r => observer.observe(r));

  // Skill bar animation
  const progressBars = document.querySelectorAll('.progress');
  const barsObserver = new IntersectionObserver((entries, obs) => {
    for(const entry of entries){
      if(entry.isIntersecting){
        const bar = entry.target;
        const value = bar.getAttribute('data-progress') || '0';
        const inner = bar.querySelector('span');
        inner.style.width = value + '%';
        obs.unobserve(bar);
      }
    }
  }, {threshold: 0.35});
  progressBars.forEach(b => barsObserver.observe(b));

  // Smooth scrolling for hash links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (ev)=>{
      ev.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      // close nav on mobile
      if(navLinks.classList.contains('show')) navLinks.classList.remove('show');
    });
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Contact form handling (progress/status)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if(form){
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = 'Sending…';
      const formData = new FormData(form);
      const action = form.getAttribute('action') || '';
      // If user left default Formspree endpoint, fallback to mailto
      if(!action || action.includes('your-form-id')){
        // fallback: open mail client
        const name = formData.get('name') || '';
        const email = formData.get('_replyto') || '';
        const message = formData.get('message') || '';
        const subject = encodeURIComponent('Portfolio message from ' + name);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:akash@example.com?subject=${subject}&body=${body}`;
        status.textContent = 'Opened mail client (fallback).';
        return;
      }

      try {
        const res = await fetch(action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if(res.ok){
          status.textContent = 'Message sent — thanks!';
          form.reset();
        } else {
          const data = await res.json();
          status.textContent = data?.error || 'Could not send message. Try mailto.';
        }
      } catch(err){
        status.textContent = 'Network error — try mailto link.';
      }
    });
  }
});