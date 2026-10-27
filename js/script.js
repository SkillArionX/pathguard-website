/* ==========================================================================
   PathGuard — site behaviour (plain JavaScript, no frameworks / no build step)
   Sections:  1. Mobile menu   2. Scroll-reveal   3. Use-case carousel
              4. Product gallery   5. Contact demo form
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 1. Mobile menu ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function setNav(open) {
    navLinks.classList.toggle('open', open);
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  }
  navToggle.addEventListener('click', function () {
    setNav(!navLinks.classList.contains('open'));
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setNav(false); });
  });

  /* ---------- 2. Scroll-reveal (fade/slide elements in as they enter the screen) ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- 3. Use-case carousel ---------- */
  var VOLUME_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><path d="M16 9a5 5 0 0 1 0 6"></path><path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path></svg>';
  var AUDIO_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-audio-lines"><path d="M2 10v3"></path><path d="M6 6v11"></path><path d="M10 3v18"></path><path d="M14 8v7"></path><path d="M18 5v13"></path><path d="M22 10v3"></path></svg>';

  // Edit the text / images of the use cases here. The first four are also written in index.html.
  var scenarios = [
    { title: 'Money Detection', description: 'Identifies currency notes and speaks the recognized denomination aloud.', speech: 'This appears to be a ₹500 note.', image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=1400&q=92', tag: 'CURRENCY RECOGNITION', color: 'green', number: '01' },
    { title: 'Medicine Reading', description: 'Reads visible packaging text to help users access important label information.', speech: 'Label text detected. Please verify the medicine and dosage.', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1400&q=92', tag: 'TEXT & LABEL READING', color: 'red', number: '02' },
    { title: 'Distance Estimation', description: 'Illustrates how supported depth sensing may communicate distance to nearby objects.', speech: 'Door detected — sample distance: 6 metres.', image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1400&q=92', tag: 'ENVIRONMENT AWARENESS', color: 'blue', number: '03' },
    { title: 'Road Awareness', description: 'Highlights relevant obstacles and nearby movement to support environmental awareness.', speech: 'Possible obstacle ahead. Please proceed cautiously.', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1400&q=92', tag: 'PEDESTRIAN AWARENESS', color: 'red', number: '04' },
    { title: 'Sign & Text Reading', description: 'Explores OCR-based access to signs, printed information, and everyday text.', speech: 'Text detected. Listening to the reading…', image: 'https://images.unsplash.com/photo-1506377585622-bedcbb027afc?auto=format&fit=crop&w=1400&q=92', tag: 'OPTICAL CHARACTER RECOGNITION', color: 'blue', number: '05' }
  ];

  var caseGrid = document.getElementById('caseGrid');
  var caseDots = document.getElementById('caseDots').querySelectorAll('button');
  var caseIndex = 0;

  function escapeHTML(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Build a card element for a scenario that is not already in the page (the 5th one).
  function buildCard(item) {
    var el = document.createElement('article');
    el.className = 'case-card reveal visible';
    el.innerHTML =
      '<div class="case-image">' +
        '<img src="' + escapeHTML(item.image) + '" alt="' + escapeHTML(item.title) + ' illustrative scenario" loading="lazy">' +
        '<div class="detection-frame ' + item.color + '"></div>' +
        '<span class="case-tag">' + escapeHTML(item.tag) + '</span>' +
        '<button class="audio-button" aria-label="Play example audio for ' + escapeHTML(item.title) + '">' + VOLUME_ICON + '</button>' +
      '</div>' +
      '<div class="case-content"><div class="case-number">' + item.number + '</div><div><h3>' + escapeHTML(item.title) + '</h3><p>' + escapeHTML(item.description) + '</p></div></div>' +
      '<div class="case-speech">' + AUDIO_ICON + escapeHTML(item.speech) + '</div>';
    return el;
  }

  // One persistent element per scenario: reuse the 4 already in index.html, build the 5th.
  var existing = caseGrid.querySelectorAll('.case-card');
  var cardEls = scenarios.map(function (item, i) { return existing[i] || buildCard(item); });
  cardEls.forEach(function (el, i) { el.dataset.index = String(i); });

  function stopAudioState() {
    caseGrid.querySelectorAll('.audio-button.is-playing').forEach(function (b) { b.classList.remove('is-playing'); });
  }

  function renderCases() {
    var n = scenarios.length;
    var visible = [];
    for (var i = 0; i < 4; i++) visible.push(cardEls[(i + caseIndex) % n]);
    // Cards that scroll into view after the first render are shown straight away.
    visible.forEach(function (el) { el.classList.add('visible'); });
    caseGrid.replaceChildren.apply(caseGrid, visible);
    caseDots.forEach(function (d, i) { d.classList.toggle('active', i === caseIndex); });
    stopAudioState();
  }

  document.getElementById('casePrev').addEventListener('click', function () {
    caseIndex = (caseIndex - 1 + scenarios.length) % scenarios.length;
    renderCases();
  });
  document.getElementById('caseNext').addEventListener('click', function () {
    caseIndex = (caseIndex + 1) % scenarios.length;
    renderCases();
  });
  caseDots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { caseIndex = i; renderCases(); });
  });

  // Example audio: speaks the sample message with the browser's built-in speech synthesis.
  caseGrid.addEventListener('click', function (e) {
    var btn = e.target.closest('.audio-button');
    if (!btn) return;
    var card = btn.closest('.case-card');
    var item = scenarios[Number(card.dataset.index)];
    stopAudioState();
    btn.classList.add('is-playing');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(item.speech);
      utterance.rate = 0.92;
      window.speechSynthesis.speak(utterance);
    }
  });

  /* ---------- 4. Product gallery ---------- */
  // `native: true` = small source photo, shown at close to its real size so it stays sharp.
  var productViews = [
    { label: 'Front View', note: 'PathGuard concept · full frame', image: 'images/pathguard-front-view.jpg' },
    { label: 'Side View', note: 'Temple module with status light', image: 'images/pathguard-side-view.jpg' },
    { label: 'Camera Module', note: 'Conceptual camera and sensor area', image: 'images/pathguard-camera-module.jpg', native: true },
    { label: 'Worn View', note: 'Wearable concept in everyday use', image: 'images/pathguard-worn-view.jpg', native: true }
  ];

  var productMain = document.getElementById('productMain');
  var productTitle = document.getElementById('productTitle');
  var productNote = document.getElementById('productNote');
  var productCounter = document.getElementById('productCounter');
  var thumbs = document.getElementById('productThumbs').querySelectorAll('.thumb');
  var productIndex = 0;

  function showProduct(i) {
    productIndex = (i + productViews.length) % productViews.length;
    var view = productViews[productIndex];
    productMain.classList.toggle('native', !!view.native);
    // Replace the <img> so the fade-in animation plays on every change.
    var img = document.createElement('img');
    img.src = view.image;
    img.alt = view.label;
    productMain.replaceChild(img, productMain.querySelector('img'));
    productCounter.textContent = '0' + (productIndex + 1) + ' / 04';
    productTitle.textContent = view.label;
    productNote.textContent = view.note;
    thumbs.forEach(function (t, k) {
      t.classList.toggle('active', k === productIndex);
      t.setAttribute('aria-pressed', String(k === productIndex));
    });
  }

  document.getElementById('productPrev').addEventListener('click', function () { showProduct(productIndex - 1); });
  document.getElementById('productNext').addEventListener('click', function () { showProduct(productIndex + 1); });
  thumbs.forEach(function (t, k) { t.addEventListener('click', function () { showProduct(k); }); });

  /* ---------- 5. Contact demo form (nothing is sent anywhere) ---------- */
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    contactForm.classList.add('is-hidden');
    formSuccess.classList.remove('is-hidden');
  });
  document.getElementById('formBack').addEventListener('click', function () {
    formSuccess.classList.add('is-hidden');
    contactForm.classList.remove('is-hidden');
  });
})();
