document.addEventListener("DOMContentLoaded", () => {
  // Scroll Animations
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in, .slide-up').forEach(el => observer.observe(el));

  // Shrink Header
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('shrink', window.scrollY > 80);
  });

  // Scroll Progress
  const progress = document.getElementById('scrollIndicator');
  if (progress) {
    window.addEventListener('scroll', () => {
      const scrolled = (document.documentElement.scrollTop || document.body.scrollTop)
        / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
      progress.style.width = scrolled + "%";
    });
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      q.parentElement.classList.toggle('active');
    });
  });

  // Testimonial Slider
  const slider = document.querySelector('.testimonial-slider');
  if (slider) {
    const cards = slider.querySelectorAll('.testimonial-card');
    let idx = 0;
    const show = i => slider.style.transform = `translateX(-${i * 100}%)`;
    const next = () => show(idx = (idx + 1) % cards.length);
    const prev = () => show(idx = (idx - 1 + cards.length) % cards.length);
    let iv = setInterval(next, 5000);
    document.querySelector('.testimonial-controls .next').addEventListener('click', () => { next(); clearInterval(iv); iv = setInterval(next,5000); });
    document.querySelector('.testimonial-controls .prev').addEventListener('click', () => { prev(); clearInterval(iv); iv = setInterval(next,5000); });
  }

  // Chatbot
  const toggle = document.getElementById('chatbot-toggle');
  const bot    = document.getElementById('chatbot');
  const close  = document.getElementById('chatbot-close');
  const send   = document.getElementById('chatbot-send');
  const input  = document.getElementById('chatbot-input-field');
  const msgs   = document.getElementById('chatbot-messages');

  if (toggle && bot) {
    toggle.addEventListener('click', () => {
      bot.style.display = 'flex';
      toggle.style.display = 'none';
    });
  }
  if (close && toggle) {
    close.addEventListener('click', () => {
      bot.style.display = 'none';
      toggle.style.display = 'block';
    });
  }
  const sendMsg = () => {
    const txt = input.value.trim();
    if (!txt) return;
    const um = document.createElement('div');
    um.className = 'message user';
    um.textContent = txt;
    msgs.appendChild(um);
    input.value = '';
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => {
      const bm = document.createElement('div');
      bm.className = 'message bot';
      bm.textContent = "Thanks! We'll be in touch soon.";
      msgs.appendChild(bm);
      msgs.scrollTop = msgs.scrollHeight;
    }, 800);
  };
  if (send) send.addEventListener('click', sendMsg);
  if (input) input.addEventListener('keypress', e => e.key==='Enter' && sendMsg());

  // Mobile Nav Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav       = document.querySelector('.nav');
  const navLinks  = document.querySelectorAll('.nav-links a');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });
    navLinks.forEach(a => a.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    }));
  }
});
