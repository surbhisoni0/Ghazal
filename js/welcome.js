(function () {
  'use strict';
  var KEY = 'gw_welcome';
  try { if (localStorage.getItem(KEY) === '1') return; } catch (e) {}
  var DEMO = document.body.dataset.demo === '1';
  var L = document.documentElement.lang === 'en' ? 'en' : 'pt';
  var T = {
    pt: { title: 'Subscreva a newsletter', sub: 'Escolha o idioma e fique a par de todas as novidades do GHAZAL.', lang: 'Idioma', ph: 'O seu endereço de email', go: 'Subscrever', skip: 'Continuar sem subscrever', consent: 'Ao subscrever, aceito receber emails do GHAZAL sobre novidades, eventos e campanhas.', close: 'Fechar', errMail: 'Indique um email válido.', errSrv: 'Não foi possível subscrever. Tente novamente.', ok: 'Obrigado! O seu email foi guardado.', wait: 'A enviar…', demo: 'Pré-visualização: o email não é guardado aqui. Funciona quando o servidor está ligado.' },
    en: { title: 'Subscribe to the newsletter', sub: 'Choose your language and stay up to date with all the news from GHAZAL.', lang: 'Language', ph: 'Your email address', go: 'Subscribe', skip: 'Continue without subscribing', consent: 'By subscribing, I agree to receive emails from GHAZAL about news, events and offers.', close: 'Close', errMail: 'Please enter a valid email.', errSrv: 'We could not subscribe you. Please try again.', ok: 'Thank you! Your email has been saved.', wait: 'Sending…', demo: 'Preview: the email is not saved here. It works when the server is running.' }
  };
  function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x) e.textContent = x; return e; }

  var st = document.createElement('style');
  st.textContent = '.gwm{position:fixed;inset:0;z-index:100;background:rgba(8,4,2,.78);display:grid;place-items:center;padding:16px;overflow:auto}' +
    '.gwm-b{position:relative;width:min(560px,100%);background:#21150e;color:#f1e3c8;border:1px solid #d49a5c;padding:40px 36px 30px;text-align:center;font:300 15px/1.5 Jost,system-ui,sans-serif;max-height:96vh;overflow:auto}' +
    '.gwm-b h2{font:500 clamp(24px,5vw,32px)/1.15 "Cormorant Garamond",Georgia,serif;letter-spacing:.08em;text-transform:uppercase;margin:0 0 14px}' +
    '.gwm-s{margin:0 0 22px;color:#b9a283}.gwm-x{position:absolute;top:10px;right:12px;background:none;border:0;color:#d49a5c;font-size:20px;cursor:pointer;padding:6px 10px}' +
    '.gwm-l{display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;margin-bottom:16px}.gwm-ll{font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#b9a283;width:100%}' +
    '.gwm-l button{flex:1 1 140px;max-width:200px;padding:11px;background:none;border:1px solid #4a3322;color:#f1e3c8;font:inherit;letter-spacing:.1em;text-transform:uppercase;font-size:13px;cursor:pointer}.gwm-l button[aria-pressed=true]{background:#d49a5c;border-color:#d49a5c;color:#1d110b}' +
    '.gwm-f input[type=email]{width:100%;padding:12px;background:#150d08;color:#f1e3c8;border:1px solid #4a3322;font:inherit;margin-bottom:6px}' +
    '.gwm-hp{position:absolute;left:-9999px}.gwm-e{min-height:1.3em;font-size:13px;color:#e8806f;margin-bottom:8px}.gwm-e.ok{color:#8fd19e}' +
    '.gwm-c{font-size:12px;color:#b9a283;margin:6px 0 18px}.gwm-go{display:block;margin:0 auto 12px;padding:13px 40px;background:#d49a5c;color:#1d110b;border:0;font:500 13px Jost,sans-serif;letter-spacing:.16em;text-transform:uppercase;cursor:pointer}.gwm-go:disabled{opacity:.6}' +
    '.gwm-sk{background:none;border:0;color:#b9a283;text-decoration:underline;font:inherit;font-size:13px;cursor:pointer}.gwm button:focus-visible,.gwm input:focus-visible{outline:2px solid #d49a5c;outline-offset:2px}';
  document.head.appendChild(st);

  var ov = el('div', 'gwm'); ov.id = 'gw-welcome';
  var box = el('div', 'gwm-b'); box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-labelledby', 'gwm-t');
  var x = el('button', 'gwm-x', '✕'); x.type = 'button';
  var h = el('h2'); h.id = 'gwm-t'; var sb = el('p', 'gwm-s');
  var lr = el('div', 'gwm-l'), lab = el('span', 'gwm-ll'), bPT = el('button', '', 'Português'), bEN = el('button', '', 'English');
  bPT.type = bEN.type = 'button'; lr.append(lab, bPT, bEN);
  var fm = el('form', 'gwm-f'); fm.noValidate = true;
  var em = el('input'); em.type = 'email'; em.name = 'email'; em.maxLength = 120; em.autocomplete = 'email';
  var hp = el('input', 'gwm-hp'); hp.type = 'text'; hp.name = 'website'; hp.tabIndex = -1; hp.autocomplete = 'off'; hp.setAttribute('aria-hidden', 'true');
  var er = el('div', 'gwm-e'); er.setAttribute('role', 'alert');
  var cs = el('p', 'gwm-c'), go = el('button', 'gwm-go'), sk = el('button', 'gwm-sk');
  go.type = 'submit'; sk.type = 'button';
  fm.append(em, hp, er, cs, go, sk); box.append(x, h, sb, lr, fm); ov.appendChild(box);

  function render() {
    var t = T[L];
    h.textContent = t.title; sb.textContent = t.sub; lab.textContent = t.lang; em.placeholder = t.ph; em.setAttribute('aria-label', t.ph);
    cs.textContent = t.consent; go.textContent = t.go; sk.textContent = t.skip; x.setAttribute('aria-label', t.close);
    bPT.setAttribute('aria-pressed', String(L === 'pt')); bEN.setAttribute('aria-pressed', String(L === 'en'));
  }
  function setLang(l) {
    L = l;
    try { localStorage.setItem('lang', l); } catch (e) {}
    if (document.documentElement.lang !== l) { var b = document.getElementById('lang'); if (b) b.click(); }
    er.textContent = ''; render();
  }
  var prev = null;
  function close() {
    try { localStorage.setItem(KEY, '1'); } catch (e) {}
    document.removeEventListener('keydown', onKey); ov.remove(); document.body.style.overflow = '';
    if (prev && prev.focus) prev.focus();
  }
  function onKey(e) {
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    var f = [].filter.call(box.querySelectorAll('button,input'), function (n) { return !n.disabled && n.tabIndex !== -1; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  bPT.onclick = function () { setLang('pt'); }; bEN.onclick = function () { setLang('en'); };
  x.onclick = close; sk.onclick = close;
  fm.onsubmit = function (e) {
    e.preventDefault();
    var t = T[L], v = em.value.trim();
    er.className = 'gwm-e';
    if (v.length > 120 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { er.textContent = t.errMail; em.focus(); return; }
    if (DEMO) { er.textContent = t.demo; return; }
    er.textContent = t.wait; go.disabled = true;
    fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: v, lang: L, website: hp.value }) })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (j) { if (!j || !j.ok) throw 0; er.className = 'gwm-e ok'; er.textContent = t.ok; setTimeout(close, 2500); })
      .catch(function () { er.textContent = t.errSrv; go.disabled = false; });
  };
  setTimeout(function () {
    prev = document.activeElement; render();
    document.body.appendChild(ov); document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    (L === 'pt' ? bPT : bEN).focus();
  }, 800);
})();