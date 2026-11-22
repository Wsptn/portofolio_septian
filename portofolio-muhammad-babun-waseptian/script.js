/* ═══════════════════════════════════════════════
   PORTOFOLIO - SCRIPT.JS
   ═══════════════════════════════════════════════ */

// ── HAMBURGER MENU ──
const hamburger  = document.getElementById("menuToggle");
const navMenu    = document.getElementById("navMenu");
const navLinks   = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen);
});

// Close menu on nav link click
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", false);
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    navMenu.classList.remove("open");
    hamburger.classList.remove("open");
  }
});

// ── SCROLL EVENTS ──
const header       = document.getElementById("header");
const scrollProg   = document.getElementById("scrollProgress");
const backTopBtn   = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  const scrollTop    = window.scrollY;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  // Scroll progress bar
  scrollProg.style.width = `${progress}%`;

  // Header shadow
  header.classList.toggle("scrolled", scrollTop > 30);

  // Back to top button visibility
  backTopBtn.classList.toggle("visible", scrollTop > 400);
});

// Back to top
backTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ── REVEAL ANIMATIONS (IntersectionObserver) ──
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for sibling elements
      const siblings = [...entry.target.parentElement.querySelectorAll(".reveal")];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.08}s`;

      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px -40px 0px"
});

revealEls.forEach(el => revealObserver.observe(el));

// ── ACTIVE NAV LINK (IntersectionObserver) ──
const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isActive);
      });
    }
  });
}, {
  rootMargin: "-30% 0px -60% 0px"
});

sections.forEach(section => sectionObserver.observe(section));

// ── FOOTER YEAR ──
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── SMOOTH HOVER EFFECT for project cards ──
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    card.style.transform = `translateY(-8px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.transition = "transform .4s ease";
  });

  card.addEventListener("mouseenter", () => {
    card.style.transition = "transform .1s ease";
  });
});
