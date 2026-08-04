// your code goes her// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Custom cursor dot (desktop only) =====
const cursorDot = document.getElementById('cursorDot');
if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });
}

// ===== Mobile menu toggle =====
const menuBtn = document.getElementById('menuBtn');
const topnav = document.getElementById('topnav');
menuBtn.addEventListener('click', () => {
  topnav.classList.toggle('open');
});
topnav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => topnav.classList.remove('open'));
});

// ===== Hero terminal typing animation =====
const cmdEl = document.getElementById('typedCmd');
const caretEl = document.getElementById('caretCmd');
const jsonEl = document.getElementById('termJson');

const command = 'curl https://api.dev/nahid-hasan';

const jsonLines = [
  ['"name"', '"Nahid Hasan"'],
  ['"role"', '"Software Engineering Student"'],
  ['"focus"', '"Backend Development"'],
  ['"status"', '"open_to_work"'],
  ['"currently_building"', '"Krishi Sahayak (কৃষি সহায়ক)"'],
  ['"languages"', '["C++", "Java", "Python", "JS"]']
];

function buildJsonHTML() {
  let out = '<span class="p">{</span>\n';
  jsonLines.forEach((pair, i) => {
    const comma = i < jsonLines.length - 1 ? ',' : '';
    out += `  <span class="k">${pair[0]}</span><span class="p">: </span><span class="s">${pair[1]}</span><span class="p">${comma}</span>\n`;
  });
  out += '<span class="p">}</span>';
  return out;
}

function typeCommand(text, i = 0) {
  if (i <= text.length) {
    cmdEl.textContent = text.slice(0, i);
    setTimeout(() => typeCommand(text, i + 1), 34);
  } else {
    caretEl.style.opacity = '0';
    setTimeout(revealJson, 260);
  }
}

function revealJson() {
  jsonEl.innerHTML = buildJsonHTML();
  jsonEl.style.opacity = '0';
  jsonEl.style.transform = 'translateY(6px)';
  jsonEl.style.transition = 'opacity .5s ease, transform .5s ease';
  requestAnimationFrame(() => {
    jsonEl.style.opacity = '1';
    jsonEl.style.transform = 'translateY(0)';
  });
}

// Respect reduced motion
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) {
  cmdEl.textContent = command;
  caretEl.style.opacity = '0';
  revealJson();
} else {
  typeCommand(command);
}

// ===== Scroll spy for rail dots =====
const railDots = document.querySelectorAll('.rail-dot');
const sections = ['top', 'about', 'skills', 'education', 'projects', 'experience', 'certs', 'contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);

function updateRail() {
  let current = sections[0];
  const scrollY = window.scrollY + window.innerHeight * 0.35;
  sections.forEach(sec => {
    if (sec.offsetTop <= scrollY) current = sec;
  });
  railDots.forEach(dot => {
    const href = dot.getAttribute('href').replace('#', '');
    dot.classList.toggle('active', href === current.id);
  });
}
window.addEventListener('scroll', updateRail, { passive: true });
updateRail();

// ===== Scroll reveal =====
const revealTargets = document.querySelectorAll(
  '.section-head, .about-grid, .stack-card, .tl-item, .project-card, .exp-card, .cert-card, .contact-inner'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => io.observe(el));e
