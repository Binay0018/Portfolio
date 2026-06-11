/* ── TAB SWITCHING (About section) ── */
const tabLinks = document.querySelectorAll('.desc');
const tabContents = document.querySelectorAll('.tab');

const openTab = (name, event) => {
  for (const tabLink of tabLinks) {
    tabLink.classList.remove('activeLink');
  }
  for (const tabContent of tabContents) {
    tabContent.classList.remove('active');
  }
  event.currentTarget.classList.add('activeLink');
  document.getElementById(name).classList.add('active');
};

/* ── MOBILE MENU ── */
const menuIcon  = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");
const navList   = document.querySelector("nav ul");

function openMenu() {
  navList.classList.add("show");
  menuIcon.classList.add("hide");
  closeIcon.classList.add("show");
}

function closeMenu() {
  navList.classList.remove("show");
  menuIcon.classList.remove("hide");
  closeIcon.classList.remove("show");
}

/* ── CLOSE MENU ON NAV LINK CLICK (mobile UX) ── */
document.querySelectorAll('#navList a').forEach(link => {
  link.addEventListener('click', () => closeMenu());
});

/* ── NAVBAR: shrink + shadow on scroll ── */
const navbar = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ── ACTIVE NAV LINK on scroll (highlight current section) ── */
const sections  = document.querySelectorAll('div[id], section[id]');
const navAnchors = document.querySelectorAll('#navList a');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active-nav'));
      const match = document.querySelector(`#navList a[href="#${entry.target.id}"]`);
      if (match) match.classList.add('active-nav');
    }
  });
}, observerOptions);

sections.forEach(sec => sectionObserver.observe(sec));

/* ── SCROLL REVEAL (fade-in sections as they enter viewport) ── */
const revealElements = document.querySelectorAll(
  '.work, .skill-card, #aboutSec, .img, .leftRow, .rightRow, .contact-item'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ── TYPING ANIMATION (hero subtitle) ── */
const heroRole = document.querySelector('.hero-role');
if (heroRole) {
  const roles = [
    'Full Stack Developer',
    'AI Enthusiast',
    'Blockchain Builder',
    'Problem Solver'
  ];
  let roleIndex = 0;
  let charIndex  = 0;
  let isDeleting = false;

  const type = () => {
    const current = roles[roleIndex];
    if (isDeleting) {
      heroRole.textContent = current.substring(0, charIndex--);
    } else {
      heroRole.textContent = current.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === current.length + 1) {
      isDeleting = true;
      setTimeout(type, 1800);
      return;
    }
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
    }
    setTimeout(type, isDeleting ? 60 : 100);
  };

  type();
}

/* ── CONTACT FORM: basic feedback ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"], .cv2');
    const original = btn.textContent;
    btn.textContent = '✅ Message sent!';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

/* ── SMOOTH SCROLL (fallback for older browsers) ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
