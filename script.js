(function(){

"use strict";

/* ── 1. PROGRESS BAR ── */

var prog = document.createElement('div');
prog.id = 'ae-progress';
document.body.prepend(prog);

window.addEventListener('scroll', function(){
  var docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var pct  = (window.scrollY / docH * 100).toFixed(1);
  prog.style.width = pct + '%';
}, {passive:true});

/* ── 2. NAV SHRINK ON SCROLL ── */
var nav = document.getElementById('mainNav');
window.addEventListener('scroll', function(){
  if(!nav) return;
  if(window.scrollY > 60){ nav.classList.add('scrolled'); }
  else { nav.classList.remove('scrolled'); }
}, {passive:true});

/* ── 3. ACTIVE NAV LINK (IntersectionObserver) ── */
var sections = document.querySelectorAll('section[id]');
var navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');
var sectionObs = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(entry.isIntersecting){
      var id = '#' + entry.target.id;
      navLinks.forEach(function(a){
        a.classList.toggle('active-link', a.getAttribute('href') === id);
      });
    }
  });
}, {threshold:0.3, rootMargin:'-60px 0px -60px 0px'});
sections.forEach(function(s){ sectionObs.observe(s); });

/* ── 4. SCROLL REVEAL (all elements) ── */
function addRevealClasses(){
  /* eyebrows */
  document.querySelectorAll('.eyebrow').forEach(function(el,i){
    el.classList.add('reveal'); el.style.transitionDelay = '0s';
  });
  /* grules */
  document.querySelectorAll('.grule').forEach(function(el){
    el.style.width = '0';
    el.style.overflow = 'hidden';
    el.style.transition = 'width .5s ease';
  });
  /* sec-titles */
  document.querySelectorAll('.sec-title').forEach(function(el,i){
    el.classList.add('reveal');
    el.style.transitionDelay = '.1s';
  });
  /* body-text */
  document.querySelectorAll('.body-text').forEach(function(el,i){
    el.classList.add('reveal');
    el.style.transitionDelay = '.18s';
  });
  /* about cards */
  document.querySelectorAll('.about-card').forEach(function(el,i){
    el.classList.add('reveal');
    el.style.transitionDelay = (i*0.1) + 's';
  });
  /* about stats */
  document.querySelectorAll('.as-box').forEach(function(el,i){
    el.classList.add('reveal-scale');
    el.style.transitionDelay = (i*0.1) + 's';
  });
  /* svc groups */
  document.querySelectorAll('.svc-group-title').forEach(function(el){
    el.classList.add('reveal');
  });
  document.querySelectorAll('.svc-card').forEach(function(el,i){
    el.classList.add('reveal-scale');
    el.style.transitionDelay = ((i%3)*0.12) + 's';
  });
  /* prob cards */
  document.querySelectorAll('.prob-card').forEach(function(el,i){
    el.classList.add('reveal');
    el.style.transitionDelay = (i*0.12) + 's';
  });
  /* cost boxes */
  document.querySelectorAll('.cost-box').forEach(function(el,i){
    el.classList.add('reveal-scale');
    el.style.transitionDelay = (i*0.15) + 's';
  });
  /* solution how items */
  document.querySelectorAll('.how-item').forEach(function(el,i){
    el.classList.add('reveal');
    el.style.transitionDelay = (i*0.1) + 's';
  });
  /* why cards */
  document.querySelectorAll('.why-card').forEach(function(el,i){
    el.classList.add('reveal-scale');
    el.style.transitionDelay = (i*0.1) + 's';
  });
  /* comp rows */
  document.querySelectorAll('.comp-row').forEach(function(el,i){
    el.classList.add('reveal');
    el.style.transitionDelay = (i*0.06) + 's';
  });
  /* client cards */
  document.querySelectorAll('.cl-card').forEach(function(el,i){
    el.classList.add('reveal');
    el.style.transitionDelay = (i*0.12) + 's';
  });
  /* poc steps */
  document.querySelectorAll('.poc-step').forEach(function(el,i){
    el.classList.add('reveal');
    el.style.transitionDelay = (i*0.15) + 's';
  });
  /* poc delivers */
  document.querySelectorAll('.poc-del').forEach(function(el,i){
    el.classList.add('reveal-scale');
    el.style.transitionDelay = (i*0.1) + 's';
  });
  /* process steps */
  document.querySelectorAll('.process-step').forEach(function(el,i){
    el.style.transitionDelay = (i*0.15) + 's';
  });
  /* hero stats boxes */
  document.querySelectorAll('.hero-stats > div:not(.hs-div)').forEach(function(el,i){
    /* already animated via CSS heroFadeUp */
  });
  /* cost quote */
  var cq = document.querySelector('.cost-quote');
  if(cq){ cq.classList.add('reveal'); cq.style.transitionDelay='.3s'; }
  /* solution quote */
  var sq = document.querySelector('.solution-quote');
  if(sq){ sq.classList.add('reveal'); sq.style.transitionDelay='.25s'; }
  /* two-col children */
  document.querySelectorAll('.two-col > div').forEach(function(el,i){
    if(!el.querySelector('.sec-title') && !el.querySelector('.svc-card')){
      el.classList.add(i%2===0 ? 'reveal-left' : 'reveal-right');
    }
  });
  /* footer brand */
  var fb = document.querySelector('.footer-brand');
  if(fb){ fb.classList.add('reveal'); }
}
addRevealClasses();

/* ── 5. OBSERVER — trigger reveals + grule + counters ── */
var revealObs = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      /* animate grule width */
      if(entry.target.classList.contains('grule')){
        entry.target.style.width = '48px';
      }
      revealObs.unobserve(entry.target);
    }
  });
}, {threshold:0.12, rootMargin:'0px 0px -50px 0px'});

document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale,.grule,.eyebrow,.process-step').forEach(function(el){
  revealObs.observe(el);
});

/* ── 6. ANIMATED COUNTER ── */
function animateCounter(el, target, prefix, suffix, decimals){
  var start = 0;
  var dur   = 1800;
  var startTime = null;
  function step(ts){
    if(!startTime) startTime = ts;
    var prog = Math.min((ts - startTime) / dur, 1);
    var ease = 1 - Math.pow(1 - prog, 3);
    var cur  = start + (target - start) * ease;
    var disp = decimals ? cur.toFixed(decimals) : Math.floor(cur);
    el.textContent = (prefix||'') + disp + (suffix||'');
    if(prog < 1) requestAnimationFrame(step);
    else el.textContent = (prefix||'') + target + (suffix||'');
  }
  requestAnimationFrame(step);
}

var countersStarted = false;
function startCounters(){
  if(countersStarted) return;
  countersStarted = true;
  /* hero stats */
  var hsNums = document.querySelectorAll('.hs-num');
  /* about stats */
  var asNums = document.querySelectorAll('.as-num');
  /* cost stats */
  var costNums = document.querySelectorAll('.cost-num');

  var counterData = [
    /* hero stats: 20-30%, 7+, 12, IIT (skip IIT) */
    {sel:'.hero-stats .hs-num', items:[
      {target:30, prefix:'20–', suffix:'%'},
      {target:7,  prefix:'',   suffix:'+'},
      {target:12, prefix:'',   suffix:''},
      null
    ]},
    /* about stats */
    {sel:'.about-stats .as-num', items:[
      {target:20, prefix:'~',  suffix:'%'},
      {target:12, prefix:'',   suffix:''},
      null,
      null
    ]},
    /* cost stats */
    {sel:'.cost-stats .cost-num', items:[
      null,
      null,
      null
    ]}
  ];

  /* hero */
  var hh = document.querySelectorAll('.hero-stats .hs-num');
  if(hh[1]) animateCounter(hh[1], 7,  '', '+', 0);
  if(hh[2]) animateCounter(hh[2], 12, '', '',  0);
  /* about */
  var aa = document.querySelectorAll('.about-stats .as-num');
  if(aa[1]) animateCounter(aa[1], 12, '', '', 0);
}

/* observe cost section to trigger counters */
var counterTrigger = document.querySelector('#about');
if(counterTrigger){
  var ctrObs = new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting){ startCounters(); ctrObs.disconnect(); }
  }, {threshold:0.3});
  ctrObs.observe(counterTrigger);
}

/* ── 7. INJECT SCROLLING TICKER after hero ── */
var heroSection = document.getElementById('hero');
if(heroSection && heroSection.nextElementSibling){
  var ticker = document.createElement('div');
  ticker.className = 'ae-ticker-wrap';
  var items = [
    'AI-Based HVAC Optimisation','Smart BMS Platform','IIT Jammu Validated',
    '20–30% Energy Savings','Make in India','Digital Twin Technology',
    'VFD Integration','Multi-Brand Compatible','3D Monitoring Dashboard',
    'Predictive Maintenance','IT-OT Convergence','National Sales Partner',
    'AI-Based HVAC Optimisation','Smart BMS Platform','IIT Jammu Validated',
    '20–30% Energy Savings','Make in India','Digital Twin Technology',
    'VFD Integration','Multi-Brand Compatible','3D Monitoring Dashboard',
    'Predictive Maintenance','IT-OT Convergence','National Sales Partner'
  ];
  var inner = '<div class="ae-ticker-inner">';
  items.forEach(function(t){
    inner += '<span class="ae-ticker-item"><span class="ae-ticker-dot"></span>' + t + '</span>';
  });
  inner += '</div>';
  ticker.innerHTML = inner;
  heroSection.parentNode.insertBefore(ticker, heroSection.nextElementSibling);
}

/* ── 8. SMOOTH SECTION TRANSITION — subtle background shift ── */
var bgObs = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(entry.isIntersecting){
      var sec = entry.target;
      /* light flash on section border */
      var before = document.createElement('span');
    }
  });
}, {threshold:0.1});
sections.forEach(function(s){ bgObs.observe(s); });

/* ── 9. PARALLAX on hero-ring (subtle) ── */
window.addEventListener('scroll', function(){
  var ring = document.querySelector('.hero-ring');
  if(!ring) return;
  ring.style.transform = 'translateY(calc(-50% + ' + (window.scrollY * 0.12) + 'px))';
}, {passive:true});

/* ── 10. CTA button text bounce on hover ── */
document.querySelectorAll('.btn').forEach(function(btn){
  btn.addEventListener('mouseenter', function(){
    this.style.transform = 'translateY(-3px)';
  });
  btn.addEventListener('mouseleave', function(){
    this.style.transform = '';
  });
});

/* ── 11. COST QUOTE — typewriter-style reveal ── */
var cq = document.querySelector('.cost-quote p');
if(cq){
  var cqObs = new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting){
      cq.style.borderLeft = '3px solid var(--gold)';
      cq.style.paddingLeft = '20px';
      cq.style.transition = 'padding .5s, border .5s';
      cqObs.disconnect();
    }
  }, {threshold:0.7});
  cqObs.observe(cq);
}

/* ── 12. WA FLOAT pulse class ── */
var waFloat = document.querySelector('.wa-float');
/* already handled in CSS */

})();

/* AE Systems - Main JS */

function toggleMenu() {
  var h = document.getElementById('hamburger');
  var m = document.getElementById('mobileMenu');
  if (!h || !m) return;
  h.classList.toggle('open');
  m.classList.toggle('open');
}

function closeMenu() {
  var h = document.getElementById('hamburger');
  var m = document.getElementById('mobileMenu');
  if (h) h.classList.remove('open');
  if (m) m.classList.remove('open');
}

document.addEventListener('click', function(e) {
  var h = document.getElementById('hamburger');
  var m = document.getElementById('mobileMenu');
  if (h && m && !h.contains(e.target) && !m.contains(e.target)) {
    h.classList.remove('open');
    m.classList.remove('open');
  }
});

window.addEventListener('scroll', function() {
  var nav = document.getElementById('mainNav');
  if (nav) {
    nav.style.boxShadow = window.scrollY > 40
      ? '0 4px 36px rgba(0,0,0,0.4)'
      : '0 2px 24px rgba(0,0,0,0.4)';
  }
});

function showToast(msg) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 3500);
}

function getFormData() {
  var name     = document.getElementById('f-name').value.trim();
  var company  = document.getElementById('f-company').value.trim();
  var email    = document.getElementById('f-email').value.trim();
  var phone    = document.getElementById('f-phone').value.trim();
  var interest = document.getElementById('f-interest').value;
  var type     = document.getElementById('f-type').value;
  var msg      = document.getElementById('f-msg').value.trim();
  if (!name || !email || !phone || !interest) {
    showToast('Please fill Name, Email, Phone and Interest.');
    return null;
  }
  return {
    name: name, company: company, email: email,
    phone: phone, interest: interest, type: type, msg: msg
  };
}

function sendWhatsApp() {
  var d = getFormData();
  if (!d) return;
  var text = encodeURIComponent(
    'AE Systems Enquiry\n\n' +
    'Name: ' + d.name + '\n' +
    'Company: ' + (d.company || 'N/A') + '\n' +
    'Email: ' + d.email + '\n' +
    'Phone: ' + d.phone + '\n' +
    'Interested In: ' + d.interest + '\n' +
    'Building Type: ' + (d.type || 'N/A') + '\n\n' +
    'Message:\n' + (d.msg || 'No message.') + '\n\nSent from aesystems.in'
  );
  window.open('https://wa.me/919873076300?text=' + text, '_blank');
  showToast('Opening WhatsApp...');
}

document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('submitBtn');
  if (!btn) return;

  btn.addEventListener('click', function(e) {
    e.preventDefault();
    var d = getFormData();
    if (!d) return;

    var successEl = document.getElementById('form-success');
    var errorEl   = document.getElementById('form-error');
    if (successEl) successEl.style.display = 'none';
    if (errorEl)   errorEl.style.display   = 'none';
    btn.textContent = 'Sending...';
    btn.disabled    = true;

    var formData = new FormData();
    formData.append('name',          d.name);
    formData.append('company',       d.company || 'N/A');
    formData.append('email',         d.email);
    formData.append('phone',         d.phone);
    formData.append('interest',      d.interest);
    formData.append('building_type', d.type || 'N/A');
    formData.append('message',       d.msg || 'No additional message.');
    formData.append('_subject',      'AE Systems Enquiry: ' + d.interest + ' - ' + (d.company || d.name));
    formData.append('_replyto',      d.email);

    fetch('https://formspree.io/f/xqedogwg', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(function(res) {
      return res.json().then(function(data) { return { ok: res.ok, data: data }; });
    })
    .then(function(result) {
      if (result.ok) {
        if (successEl) successEl.style.display = 'block';
        ['f-name', 'f-company', 'f-email', 'f-phone', 'f-msg'].forEach(function(id) {
          var el = document.getElementById(id);
          if (el) el.value = '';
        });
        var sel1 = document.getElementById('f-interest');
        var sel2 = document.getElementById('f-type');
        if (sel1) sel1.selectedIndex = 0;
        if (sel2) sel2.selectedIndex = 0;
        btn.textContent = '\u2705 Sent!';
        setTimeout(function() { btn.textContent = '\U0001F4E7 Send Enquiry'; btn.disabled = false; }, 4000);
      } else {
        if (errorEl) {
          errorEl.style.display = 'block';
          errorEl.textContent = '\u26A0\uFE0F Failed to send. Please email us at sales@aesystems.in';
        }
        btn.textContent = '\u274C Failed — Try Again';
        btn.disabled = false;
      }
    })
    .catch(function() {
      if (errorEl) {
        errorEl.style.display = 'block';
        errorEl.textContent = '\u26A0\uFE0F Network error. Please WhatsApp or email us directly.';
      }
      btn.textContent = '\u274C Try Again';
      btn.disabled = false;
    });
  });
});

function toggleMenu(){

const h = document.getElementById("hamburger");
const m = document.getElementById("mobileMenu");

if(!h || !m) return;

h.classList.toggle("open");
m.classList.toggle("open");

}
