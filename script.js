(function () {
  'use strict';

  // Nav background on scroll
  const topNav = document.getElementById('topNav');
  function updateNav() {
    if (window.scrollY > 40) {
      topNav.classList.add('scrolled');
    } else {
      topNav.classList.remove('scrolled');
    }
  }
  document.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('tapcard-theme', next);
    });
  }

  // Hero grid spotlight
  const heroGrid = document.getElementById('heroGrid');
  const heroEl = document.getElementById('hero');
  let gx = 0, gy = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    const rect = heroEl.getBoundingClientRect();
    const gridRect = heroGrid.getBoundingClientRect();
    const activeTop = rect.top + rect.height * 0.3;

    if (e.clientY >= activeTop && e.clientY <= rect.bottom) {
      tx = e.clientX - gridRect.left;
      ty = e.clientY - gridRect.top;
    } else {
      tx = gridRect.width / 2;
      ty = gridRect.height * 0.3;
    }
  });

  (function lerpGrid() {
    gx += (tx - gx) * 0.08;
    gy += (ty - gy) * 0.08;
    heroGrid.style.setProperty('--mx', gx + 'px');
    heroGrid.style.setProperty('--my', gy + 'px');
    requestAnimationFrame(lerpGrid);
  })();

  // 3D card tilt, follows the cursor within the hero stage
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroStage = document.getElementById('heroStage');
  const cardTilt = document.getElementById('cardTilt');
  const BASE_RX = 10, BASE_RY = -18;

  if (heroStage && cardTilt && !reduceMotion) {
    heroStage.addEventListener('mousemove', e => {
      const rect = heroStage.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = BASE_RX - (py - 0.5) * 24;
      const ry = BASE_RY + (px - 0.5) * 28;
      cardTilt.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });

    heroStage.addEventListener('mouseleave', () => {
      cardTilt.style.transform = `rotateX(${BASE_RX}deg) rotateY(${BASE_RY}deg)`;
    });
  }

  // Click either card to bring it to the front
  const cardGroup = document.getElementById('cardGroup');
  if (cardGroup) {
    const cards = cardGroup.querySelectorAll('.nfc-card');
    function bringToFront(card) {
      cards.forEach(c => c.classList.toggle('is-front', c === card));
      cardGroup.classList.add('has-front');
    }
    cards.forEach(card => {
      card.addEventListener('click', () => bringToFront(card));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          bringToFront(card);
        }
      });
    });
  }

  // Scrollspy: highlight the nav link for the section in view
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = '#' + entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });

    sections.forEach(section => observer.observe(section));
  }
})();

/* ===== PRICING CARDS -> ORDER FORM ===== */
document.querySelectorAll('.pricing-card').forEach(card => {
  function selectPackage() {
    const value = card.getAttribute('data-package');
    const radio = document.querySelector(`input[name="package"][value="${value}"]`);
    if (radio) radio.checked = true;

    const orderSection = document.getElementById('order');
    if (orderSection) orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const pill = radio ? radio.closest('.package-pill') : null;
    if (pill) {
      pill.classList.add('flash');
      setTimeout(() => pill.classList.remove('flash'), 900);
    }
  }

  card.addEventListener('click', selectPackage);
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectPackage();
    }
  });
});

/* ===== ORDER FORM ===== */
// Get a free access key at https://web3forms.com (just enter your email,
// no account or password needed) and paste it below.
const WEB3FORMS_ACCESS_KEY = '4806b2b9-ffc1-4a56-b9ae-9a805d59058d';

const orderForm = document.getElementById('orderForm');
if (orderForm) {
  const submitBtn = document.getElementById('orderSubmit');
  const note = document.getElementById('orderNote');
  const defaultNote = note ? note.textContent : '';

  orderForm.addEventListener('submit', async e => {
    e.preventDefault();

    if (WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
      if (note) {
        note.textContent = 'Order form isn\'t connected yet — add your Web3Forms access key in script.js.';
        note.classList.add('is-error');
      }
      return;
    }

    const name = orderForm.querySelector('#orderName').value.trim();
    const pkg = orderForm.querySelector('input[name="package"]:checked').value;
    const message = orderForm.querySelector('#orderMessage').value.trim();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    if (note) {
      note.textContent = '';
      note.classList.remove('is-success', 'is-error');
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `NFC card order — ${pkg}`,
          from_name: 'TapCard order form',
          name: name,
          package: pkg,
          message: message
        })
      });

      const result = await response.json();

      if (result.success) {
        orderForm.reset();
        if (note) {
          note.textContent = 'Sent! We\'ll follow up shortly to confirm your order.';
          note.classList.add('is-success');
        }
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      if (note) {
        note.textContent = 'Something went wrong sending that — please try again or message us directly below.';
        note.classList.add('is-error');
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send order details';
    }
  });
}

/* ===== COPY EMAIL & PHONE ===== */
document.querySelectorAll('.copy-item').forEach(item => {
  const value = item.getAttribute('data-copy');
  if (!value) return;

  function showCopied() {
    item.classList.add('copied');
    clearTimeout(item._copyTimer);
    item._copyTimer = setTimeout(() => {
      item.classList.remove('copied');
    }, 1400);
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.top = '-9999px';
    ta.style.opacity = '0';
    ta.setAttribute('readonly', '');
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    try {
      document.execCommand('copy');
    } catch (e) {
      console.warn('Copy failed:', e);
    }
    document.body.removeChild(ta);
  }

  function doCopy() {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(value).then(showCopied).catch(() => {
        fallbackCopy(value);
        showCopied();
      });
    } else {
      fallbackCopy(value);
      showCopied();
    }
  }

  item.addEventListener('click', doCopy);
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      doCopy();
    }
  });
});