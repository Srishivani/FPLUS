/**
 * FPLUS Technical Services — Main JavaScript
 * ===========================================
 * Handles: services carousel, scroll reveal, contact form
 */

(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* ==========================================================================
     Services Carousel
     ========================================================================== */
  function initCarousel() {
    const track = document.getElementById('carTrack');
    const dotsWrap = document.getElementById('carDots');
    const prevBtn = document.getElementById('carPrev');
    const nextBtn = document.getElementById('carNext');

    if (!track || !dotsWrap) return;

    const cards = track.querySelectorAll('.svc');
    const VISIBLE = 3;
    const total = cards.length;
    const pages = Math.max(1, total - VISIBLE + 1);
    const AUTO_INTERVAL = 6500;
    let current = 0;
    let autoTimer = null;

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, pages - 1));
      const cardW = cards[0].getBoundingClientRect().width + 2;
      track.style.transform = `translateX(-${current * cardW}px)`;

      dotsWrap.querySelectorAll('.cc-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    // Build dots
    for (let i = 0; i < pages; i++) {
      const d = document.createElement('div');
      d.className = 'cc-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    }

    function resetAuto() {
      if (autoTimer) clearInterval(autoTimer);
      autoTimer = setInterval(() => {
        goTo((current + 1) % pages);
      }, AUTO_INTERVAL);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goTo(current - 1);
        resetAuto();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goTo(current + 1);
        resetAuto();
      });
    }

    // Drag support (ignore drags that start on a link click)
    let startX = 0;
    let drag = false;
    track.addEventListener('pointerdown', (e) => {
      if (e.target.closest('a')) return;
      startX = e.clientX;
      drag = true;
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener('pointerup', (e) => {
      if (!drag) return;
      drag = false;
      const delta = startX - e.clientX;
      if (Math.abs(delta) > 60) {
        delta > 0 ? goTo(current + 1) : goTo(current - 1);
        resetAuto();
      }
    });

    window.addEventListener('resize', () => goTo(current));

    const wrap = track.closest('.carousel-wrap');
    if (wrap) {
      wrap.addEventListener('mouseenter', () => {
        if (autoTimer) clearInterval(autoTimer);
      });
      wrap.addEventListener('mouseleave', resetAuto);
    }

    resetAuto();
  }

  /* ==========================================================================
     HSE Image Slideshow
     ========================================================================== */
  function initHseSlideshow() {
    const slides = document.querySelectorAll('.hse-slide');
    const items = document.querySelectorAll('.hse-item[data-hse-index]');
    const dotsWrap = document.getElementById('hseDots');
    const progressBar = document.querySelector('.hse-progress-bar');
    const section = document.getElementById('hse');

    if (!slides.length || !items.length) return;

    const total = slides.length;
    const INTERVAL = 4500;
    let current = 0;
    let timer = null;
    let progressTimer = null;
    let progressStart = 0;

    function clearTimers() {
      if (timer) clearInterval(timer);
      if (progressTimer) cancelAnimationFrame(progressTimer);
      timer = null;
      progressTimer = null;
    }

    function animateProgress() {
      if (!progressBar) return;
      const elapsed = Date.now() - progressStart;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      progressBar.style.width = pct + '%';
      if (pct < 100) {
        progressTimer = requestAnimationFrame(animateProgress);
      }
    }

    function goTo(idx) {
      if (progressTimer) cancelAnimationFrame(progressTimer);
      current = ((idx % total) + total) % total;

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === current);
      });

      items.forEach((item, i) => {
        const on = i === current;
        item.classList.toggle('active', on);
        item.setAttribute('aria-selected', on ? 'true' : 'false');
      });

      if (dotsWrap) {
        dotsWrap.querySelectorAll('.hse-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === current);
          dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
        });
      }

      progressStart = Date.now();
      if (progressBar) progressBar.style.width = '0%';
      animateProgress();
    }

    function startAuto() {
      clearTimers();
      goTo(current);
      timer = setInterval(() => {
        goTo(current + 1);
      }, INTERVAL);
    }

    if (dotsWrap) {
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'hse-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', 'HSE slide ' + (i + 1));
        dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        dot.addEventListener('click', () => {
          goTo(i);
          startAuto();
        });
        dotsWrap.appendChild(dot);
      }
    }

    items.forEach((item) => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.getAttribute('data-hse-index'), 10);
        if (!Number.isNaN(idx)) {
          goTo(idx);
          startAuto();
        }
      });
    });

    if (section) {
      section.addEventListener('mouseenter', clearTimers);
      section.addEventListener('mouseleave', startAuto);
    }

    startAuto();
  }

  /* ==========================================================================
     Scroll Reveal
     ========================================================================== */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    function revealInView(el) {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return rect.top < vh * 0.92 && rect.bottom > 0;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('on');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' }
    );

    reveals.forEach((el) => {
      if (revealInView(el)) el.classList.add('on');
      observer.observe(el);
    });
  }

  /* ==========================================================================
     Contact Form
     ========================================================================== */
  function initForm() {
    const fields = [
      { id: 'f-name', ffId: 'ff-name', ok: (v) => v.trim().length >= 2 },
      { id: 'f-phone', ffId: 'ff-phone', ok: (v) => v.trim().length >= 7 },
      { id: 'f-email', ffId: 'ff-email', ok: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
      { id: 'f-service', ffId: 'ff-service', ok: (v) => v !== '' },
      { id: 'f-msg', ffId: 'ff-msg', ok: (v) => v.trim().length >= 10 },
    ];

    fields.forEach((f) => {
      const el = document.getElementById(f.id);
      if (el) {
        el.addEventListener('input', () => {
          const ff = document.getElementById(f.ffId);
          if (ff) ff.classList.remove('has-error');
        });
      }
    });

    const submitBtn = document.getElementById('submitBtn');
    if (!submitBtn) return;

    submitBtn.addEventListener('click', function () {
      let valid = true;

      fields.forEach((f) => {
        const el = document.getElementById(f.id);
        const ff = document.getElementById(f.ffId);
        if (!el) return;
        if (ff && !f.ok(el.value)) {
          ff.classList.add('has-error');
          valid = false;
        } else if (ff) {
          ff.classList.remove('has-error');
        }
      });

      if (!valid) return;

      const name = document.getElementById('f-name').value.trim();
      const company = document.getElementById('f-company').value.trim();
      const phone = document.getElementById('f-phone').value.trim();
      const email = document.getElementById('f-email').value.trim();
      const service = document.getElementById('f-service').value;
      const location = document.getElementById('f-location').value.trim();
      const msg = document.getElementById('f-msg').value.trim();

      const subject = encodeURIComponent('Fitout / Maintenance Enquiry — ' + service);
      const body = encodeURIComponent(
        'Name: ' + name + '\n' +
        (company ? 'Company: ' + company + '\n' : '') +
        'Phone: ' + phone + '\n' +
        'Reply-to: ' + email + '\n' +
        'Service: ' + service + '\n' +
        (location ? 'Location: ' + location + '\n' : '') +
        '\nProject Brief:\n' + msg +
        '\n\n---\nSent via fplus.ae'
      );

      window.location.href =
        'mailto:Faiyazqu123@gmail.com?subject=' + subject + '&body=' + body;

      this.disabled = true;
      this.innerHTML = 'Sending&hellip;';

      const btn = this;
      setTimeout(() => {
        const success = document.getElementById('formSuccess');
        const note = document.getElementById('formNote');
        if (success) {
          success.style.display = 'block';
          success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        btn.style.display = 'none';
        if (note) note.style.display = 'none';
      }, 900);
    });
  }

  /* ==========================================================================
     Floating Contact Widget
     ========================================================================== */
  function initContactFloat() {
    const widget = document.getElementById('contactFloat');
    const toggle = document.getElementById('contactFloatToggle');
    if (!widget || !toggle) return;

    toggle.addEventListener('click', () => {
      const isOpen = widget.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!widget.contains(e.target) && widget.classList.contains('open')) {
        widget.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ==========================================================================
     Core Services sidecar — one panel per master category
     ========================================================================== */
  function initOneMasterSidecar(panel) {
    const slides = panel.querySelectorAll('.svc-core-slide');
    const items = panel.querySelectorAll('.svc-core-item[data-svc-index]');
    const dotsWrap = panel.querySelector('.svc-core-slide-dots');
    const progressBar = panel.querySelector('.svc-core-progress-bar');
    const detailLink = panel.querySelector('.svc-core-detail-link');

    if (!slides.length || !items.length) return;

    const total = slides.length;
    const INTERVAL = 5000;
    let current = 0;
    let timer = null;
    let progressTimer = null;
    let progressStart = 0;

    function clearTimers() {
      if (timer) clearInterval(timer);
      if (progressTimer) cancelAnimationFrame(progressTimer);
      timer = null;
      progressTimer = null;
    }

    function animateProgress() {
      if (!progressBar) return;
      const elapsed = Date.now() - progressStart;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      progressBar.style.width = pct + '%';
      if (pct < 100) progressTimer = requestAnimationFrame(animateProgress);
    }

    function updateDetailLink(idx) {
      if (!detailLink) return;
      const item = items[idx];
      const href = item && item.getAttribute('data-svc-href');
      if (href) {
        detailLink.href = href;
        const title = item.querySelector('.svc-core-item-t');
        detailLink.textContent =
          'View ' + (title ? title.textContent.trim() : 'service') + ' →';
      }
    }

    function goTo(idx) {
      if (progressTimer) cancelAnimationFrame(progressTimer);
      current = ((idx % total) + total) % total;

      slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
      items.forEach((item, i) => {
        const on = i === current;
        item.classList.toggle('active', on);
        item.setAttribute('aria-selected', on ? 'true' : 'false');
      });

      if (dotsWrap) {
        dotsWrap.querySelectorAll('.svc-core-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === current);
          dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
        });
      }

      updateDetailLink(current);
      progressStart = Date.now();
      if (progressBar) progressBar.style.width = '0%';
      animateProgress();
    }

    function startAuto() {
      clearTimers();
      goTo(current);
      timer = setInterval(() => goTo(current + 1), INTERVAL);
    }

    if (dotsWrap && !dotsWrap.dataset.built) {
      dotsWrap.dataset.built = '1';
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'svc-core-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        dot.addEventListener('click', () => {
          goTo(i);
          startAuto();
        });
        dotsWrap.appendChild(dot);
      }
    }

    items.forEach((item) => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.getAttribute('data-svc-index'), 10);
        if (!Number.isNaN(idx)) {
          goTo(idx);
          startAuto();
        }
      });
      item.addEventListener('dblclick', () => {
        const href = item.getAttribute('data-svc-href');
        if (href) window.location.href = href;
      });
    });

    panel.addEventListener('mouseenter', clearTimers);
    panel.addEventListener('mouseleave', startAuto);

    startAuto();
  }

  function initSvcCoreSidecar() {
    document.querySelectorAll('.svc-master-panel').forEach(initOneMasterSidecar);
  }

  /* ==========================================================================
     Hero headline flip
     ========================================================================== */
  function initHeroFlip() {
    const flip = document.getElementById('heroFlip');
    if (!flip) return;

    const slides = flip.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-flip-dot');
    if (slides.length < 2) return;

    let current = 0;
    let timer = null;
    const INTERVAL = 6000;

    function goTo(idx) {
      current = (idx + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('active', i === current));
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function resetTimer() {
      if (timer) clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), INTERVAL);
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        goTo(parseInt(dot.getAttribute('data-hero-slide'), 10));
        resetTimer();
      });
    });

    const hero = document.getElementById('hero');
    if (hero) {
      hero.addEventListener('mouseenter', () => {
        if (timer) clearInterval(timer);
      });
      hero.addEventListener('mouseleave', resetTimer);
    }

    resetTimer();
  }

  /* ==========================================================================
     Init
     ========================================================================== */
  function init() {
    initCarousel();
    initSvcCoreSidecar();
    initHeroFlip();
    initHseSlideshow();
    initScrollReveal();
    initForm();
    initContactFloat();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
