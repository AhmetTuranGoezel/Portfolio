/* ============================================================
   Ahmet Turan Gözel — Portfolio interactions
   ============================================================ */
(function () {
  'use strict';
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Year ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  $('#themeToggle')?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ---------- Language (DE / EN) ---------- */
  const langToggle = $('#langToggle');

  function applyLang(lang) {
    root.setAttribute('lang', lang);
    $$('[data-de]').forEach(el => {
      const v = el.getAttribute('data-' + lang);
      if (v !== null) el.textContent = v;
    });
    $$('[data-de-placeholder]').forEach(el => {
      const v = el.getAttribute('data-' + lang + '-placeholder');
      if (v !== null) el.setAttribute('placeholder', v);
    });
    $$('[data-de-aria]').forEach(el => {
      const v = el.getAttribute('data-' + lang + '-aria');
      if (v !== null) el.setAttribute('aria-label', v);
    });
    $$('.lang-toggle__opt').forEach(o =>
      o.classList.toggle('is-active', o.getAttribute('data-lang-opt') === lang)
    );
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  let currentLang = 'de';
  try { currentLang = localStorage.getItem('lang') || 'de'; } catch (e) {}

  langToggle?.addEventListener('click', () => {
    currentLang = currentLang === 'de' ? 'en' : 'de';
    applyLang(currentLang);
  });

  /* ---------- Mobile menu ---------- */
  const nav = $('#nav');
  const burger = $('#hamburger');
  function closeMenu() {
    nav?.classList.remove('is-open');
    burger?.setAttribute('aria-expanded', 'false');
  }
  burger?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  $$('.nav__link').forEach(l => l.addEventListener('click', closeMenu));

  /* ---------- Header scrolled + to-top ---------- */
  const header = $('#header');
  const toTop = $('#toTop');
  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 12);
    toTop?.classList.toggle('is-visible', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop?.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  /* ---------- Projects data ---------- */
  const projects = [
    {
      icon: '🗂️', title: 'Maßgeschneidertes CRM-System', org: 'Vapor Handels GmbH',
      de: 'Eigenes CRM-System gebaut. Kunden, Angebote und Prozesse werden darüber zentral verwaltet.',
      en: 'Built a custom CRM system from scratch. Manages customers, quotes and processes in one place.',
      tags: ['React', 'Node.js', 'REST API', 'SQL'],
      badgeDe: 'Berufliches Projekt', badgeEn: 'Professional work'
    },
    {
      icon: '🔗', title: 'B2B-Web-Applikation', org: 'Vapor Handels GmbH',
      de: 'B2B-Plattform gebaut, die direkt an Plentymarkets angebunden ist. Geschäftsprozesse laufen darüber komplett digital.',
      en: 'Built a B2B platform connected directly to the Plentymarkets ERP. Business processes run fully digital through it.',
      tags: ['React', 'REST API', 'Plentymarkets'],
      badgeDe: 'Berufliches Projekt', badgeEn: 'Professional work'
    },
    {
      icon: '📦', title: 'Echtzeit-Produktions-Tracker', org: 'Vapor Handels GmbH',
      de: 'Echtzeit-Tracker für Logistik gebaut. Zeigt Produktions- und Versandstatus live an und nutzt LLMs für automatisierte Abläufe.',
      en: 'Built a real-time logistics tracker. Shows production and shipping status live, with LLM-powered automation on top.',
      tags: ['Echtzeit', 'REST API', 'LLM', 'Logistik'],
      badgeDe: 'Berufliches Projekt', badgeEn: 'Professional work'
    },
    {
      icon: '🛠️', title: 'Maintenance-App mit MES-Schnittstelle', org: 'Vorwerk Autotec',
      de: 'Entwicklung einer Power-App inkl. MES-Schnittstelle für den Standort Wuppertal, über die Wartungs-Tickets erstellt und bearbeitet werden.',
      en: 'Built a Power App including an MES interface for the Wuppertal site, used to create and process maintenance tickets.',
      tags: ['Power Platform', 'MES', 'Power Apps'],
      badgeDe: 'Berufliches Projekt', badgeEn: 'Professional work'
    },
    {
      icon: '🧭', title: 'Power-Apps-Unternehmensportal', org: 'Vorwerk Autotec',
      de: 'Aufbau eines zentralen Portals in Power Apps mit Zugang zu verschiedenen Anwendungen inklusive Berechtigungsverwaltung.',
      en: 'Built a central portal in Power Apps providing access to multiple applications including permission management.',
      tags: ['Power Platform', 'Microsoft 365', 'Auth'],
      badgeDe: 'Berufliches Projekt', badgeEn: 'Professional work'
    },
    {
      icon: '🌍', title: 'Internationaler Software-Rollout', org: 'Vorwerk Autotec',
      de: 'Software an Standorten in China, Mexiko, Polen und Serbien eingeführt. Ziel: überall dieselben digitalen Abläufe.',
      en: 'Rolled out software at sites in China, Mexico, Poland and Serbia. Goal: same digital workflows everywhere.',
      tags: ['Rollout', 'Controlling', '.NET'],
      badgeDe: 'Berufliches Projekt', badgeEn: 'Professional work'
    }
  ];

  const grid = $('#projectGrid');
  if (grid) {
    grid.innerHTML = projects.map(p => `
      <article class="project reveal">
        <div class="project__top">
          <span class="project__badge" data-de="${p.badgeDe}" data-en="${p.badgeEn}">${p.badgeDe}</span>
          <span class="project__icon" aria-hidden="true">${p.icon}</span>
        </div>
        <div class="project__body">
          <h3 class="project__title">${p.title}</h3>
          <p class="project__org">${p.org}</p>
          <p class="project__desc" data-de="${p.de}" data-en="${p.en}">${p.de}</p>
          <div class="project__tags">
            ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
      </article>
    `).join('');
  }

  /* ---------- Apply saved language now that DOM (incl. projects) is built ---------- */
  applyLang(currentLang);

  /* ---------- Project card stagger indices ---------- */
  if (grid) {
    grid.querySelectorAll('.project').forEach((p, i) => p.style.setProperty('--i', i));
  }

  /* ---------- Chip proficiency bars ---------- */
  $$('.chip[data-level]').forEach(el => {
    el.style.setProperty('--level', el.dataset.level + '%');
  });

  /* ---------- Stagger indices ---------- */
  $$('.skill-chips').forEach(list => {
    list.querySelectorAll('.chip').forEach((c, i) => {
      c.classList.add('reveal');
      c.style.setProperty('--i', i);
    });
  });
  $$('.timeline').forEach(tl => {
    tl.querySelectorAll('.timeline__item').forEach((item, i) => {
      item.style.setProperty('--i', i);
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Timeline scroll-progress + dot activation ---------- */
  function updateTimelineProgress() {
    const viewH = window.innerHeight;
    const timelines = $$('#cvTimeline .timeline');
    let prevDone = true;

    timelines.forEach(tl => {
      let progress;
      if (!prevDone) {
        progress = 0;
      } else {
        const rect = tl.getBoundingClientRect();
        progress = Math.min(1, Math.max(0, (viewH - rect.top) / (rect.height + viewH * 0.3)));
      }
      tl.style.setProperty('--tl-progress', progress);

      const tlRect = tl.getBoundingClientRect();
      const tlH = tlRect.height || 1;
      tl.querySelectorAll('.timeline__item').forEach(item => {
        if (item.classList.contains('is-active')) return;
        const dotPos = (item.getBoundingClientRect().top - tlRect.top) / tlH;
        if (progress > dotPos) item.classList.add('is-active');
      });

      prevDone = progress >= 1;
    });
  }
  window.addEventListener('scroll', updateTimelineProgress, { passive: true });
  updateTimelineProgress();

  /* ---------- Stat counter animation ---------- */
  const statEls = $$('.stat__num[data-count]');
  statEls.forEach(el => { el.textContent = '0' + (el.dataset.suffix || ''); });
  if ('IntersectionObserver' in window) {
    const statObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        obs.unobserve(e.target);
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const t = Math.min(1, (now - start) / duration);
          const ease = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * ease) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    statEls.forEach(el => statObs.observe(el));
  }

  /* ---------- Layered depth parallax ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 760;
  if (!prefersReducedMotion && !isMobile) {
    const scenes = $$('[data-scene]');
    const parallaxEls = $$('[data-parallax]');
    const smooth = t => t * t * (3 - 2 * t);

    function updateScrollEffects() {
      const vh = window.innerHeight;

      scenes.forEach(s => {
        const rect = s.getBoundingClientRect();
        const scrollable = s.offsetHeight - vh;
        let p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
        s.style.setProperty(s.dataset.scene, smooth(p).toFixed(3));
      });

      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax);
        const rect = el.getBoundingClientRect();
        const fromCenter = (rect.top + rect.height / 2) - vh / 2;
        el.style.setProperty('--py', (-fromCenter * speed).toFixed(1) + 'px');
      });
    }
    window.addEventListener('scroll', updateScrollEffects, { passive: true });
    updateScrollEffects();
  }


  /* ---------- Scrollspy ---------- */
  const sections = $$('main section[id]');
  const navLinks = $$('.nav__link');
  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('id');
          navLinks.forEach(l =>
            l.classList.toggle('is-active', l.getAttribute('href') === '#' + id)
          );
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* ---------- Video facade (GDPR: load only on click, no-cookie domain) ---------- */
  const facade = $('#videoFacade');
  facade?.querySelector('.video__play')?.addEventListener('click', () => {
    const id = facade.getAttribute('data-video-id');
    if (!id) return; // no video configured yet
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    iframe.title = 'Video - Ahmet Turan Gözel';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    facade.innerHTML = '';
    facade.appendChild(iframe);
  });

  /* ---------- Contact form (Web3Forms) ---------- */
  const form = $('#contactForm');
  const statusEl = $('#formStatus');
  const submitBtn = $('#cfSubmit');
  form?.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (!statusEl) return;
    const key = form.querySelector('[name="access_key"]')?.value;
    statusEl.className = 'form-status';

    if (!key || key === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      statusEl.classList.add('is-err');
      statusEl.textContent = currentLang === 'de'
        ? 'Kontaktformular ist noch nicht konfiguriert. Bitte per E-Mail melden.'
        : 'Contact form is not configured yet. Please reach out via email.';
      return;
    }

    const original = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) { submitBtn.disabled = true; submitBtn.style.opacity = '.7'; }
    statusEl.textContent = currentLang === 'de' ? 'Wird gesendet …' : 'Sending …';

    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const data = await res.json();
      if (res.ok && data.success) {
        statusEl.classList.add('is-ok');
        statusEl.textContent = currentLang === 'de'
          ? '✓ Vielen Dank! Ihre Nachricht wurde gesendet.'
          : '✓ Thank you! Your message has been sent.';
        form.reset();
      } else { throw new Error(data.message || 'failed'); }
    } catch (err) {
      statusEl.classList.add('is-err');
      statusEl.textContent = currentLang === 'de'
        ? 'Etwas ist schiefgelaufen. Bitte später erneut versuchen oder per E-Mail melden.'
        : 'Something went wrong. Please try again later or reach out via email.';
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.style.opacity = ''; submitBtn.innerHTML = original; }
    }
  });
})();
