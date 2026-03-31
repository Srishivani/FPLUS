/**
 * FPLUS Technical Services — Main JavaScript
 * ===========================================
 * Handles: services carousel, scroll reveal, contact form
 */

(function () {
  'use strict';

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
    let current = 0;

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

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Drag support
    let startX = 0;
    let drag = false;
    track.addEventListener('pointerdown', (e) => {
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
      }
    });

    window.addEventListener('resize', () => goTo(current));

    // Auto-advance every 3 seconds
    setInterval(() => {
      goTo((current + 1) % pages);
    }, 3000);
  }

  /* ==========================================================================
     Scroll Reveal
     ========================================================================== */
  function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('on');
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
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

      const subject = encodeURIComponent('Consultation / Repair / Install — ' + service);
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
     Init
     ========================================================================== */
  function init() {
    initCarousel();
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
