(function () {
  'use strict';
  var v = document.querySelector('.vbg video'), b = document.getElementById('vpp');
  if (!v) return;
  v.muted = true;
  // phones in portrait get the vertical clip, everything else the widescreen one
  var tall = window.matchMedia && matchMedia('(max-aspect-ratio: 1/1)').matches;
  v.poster = tall ? '/img/video1-poster-mobile.jpg' : '/img/video1-poster.jpg';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var save = navigator.connection && navigator.connection.saveData;
  var manual = false;
  if (!save) v.src = tall ? '/video/hero-mobile.mp4' : '/video/hero.mp4';
  var T = { pt: { p: 'Pausar vídeo de fundo', a: 'Reproduzir vídeo de fundo' }, en: { p: 'Pause background video', a: 'Play background video' } };
  function label() {
    if (!b) return;
    var t = T[document.documentElement.lang === 'en' ? 'en' : 'pt'], l = v.paused ? t.a : t.p;
    b.textContent = v.paused ? '\u25B6' : '\u275A\u275A';
    b.setAttribute('aria-label', l); b.title = l;
  }
  function play() { var r = v.play(); if (r && r.catch) r.catch(function () {}); }
  if (reduce || save) { v.removeAttribute('autoplay'); v.pause(); } else { play(); }
  ['play', 'pause'].forEach(function (e) { v.addEventListener(e, label); });
  if (b) b.addEventListener('click', function () { if (v.paused) { manual = false; play(); } else { manual = true; v.pause(); } });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) v.pause(); else if (!manual && !reduce && !save) play();
  });
  new MutationObserver(label).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  label();
})();
