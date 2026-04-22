/* ============================================================
   SPENJENN GRIND — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Navigation scroll behaviour ── */
  const nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  // Sub-pages have no hero: start dark immediately
  if (!document.querySelector('.hero')) {
    nav.classList.add('scrolled');
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── Mobile hamburger ── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ── Active nav link ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Scroll fade-in (IntersectionObserver) ── */
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target); // fire once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.fade-in').forEach(function (el) {
    io.observe(el);
  });

  /* ── Smooth hover tilt on NBA/client photos (subtle) ── */
  document.querySelectorAll('.nba-photo').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -6;
      card.style.transform = 'perspective(800px) rotateY(' + x + 'deg) rotateX(' + y + 'deg)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  /* ── Animated stat counters ── */
  var statNums = document.querySelectorAll('.stat-num[data-target]');
  if (statNums.length) {
    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-target'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1400;
        var startTime = null;
        function tick(now) {
          if (!startTime) startTime = now;
          var elapsed = now - startTime;
          var progress = Math.min(elapsed / duration, 1);
          var ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(ease * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      });
    }, { threshold: 0.6 });
    statNums.forEach(function (el) { counterIO.observe(el); });
  }

  /* ── Floating Book CTA ── */
  var floatCta = document.querySelector('.float-cta');
  if (floatCta) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 420) {
        floatCta.classList.add('show');
      } else {
        floatCta.classList.remove('show');
      }
    }, { passive: true });
  }

})();
