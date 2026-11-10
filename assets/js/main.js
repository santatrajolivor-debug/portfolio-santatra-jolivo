/**
 * PORTFOLIO — SANTATRA JOLIVO RANDRIANIRINA
 * main.js — Interactions et animations
 */

'use strict';

/* ========================================================
   LOADER
======================================================== */
(function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1800);
    });
})();

/* ========================================================
   CUSTOM CURSOR (desktop uniquement)
======================================================== */
(function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');

    if (!cursor || !follower) return;

    // Désactiver sur mobile
    if (window.matchMedia('(max-width: 768px)').matches) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;

        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animateFollower);
    }

    animateFollower();

    // Hover effect
    const interactables = document.querySelectorAll('a, button, .skill-card, .project-card, .contact-card, .timeline-card');

    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('hover'));
        el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
    });
})();

/* ========================================================
   NAVIGATION
======================================================== */
(function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');

    // Scroll state
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        updateActiveLink();
    }, { passive: true });

    // Mobile menu
    let overlay = null;

    function openMenu() {
        navLinks.classList.add('open');
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');

        // Overlay
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay show';
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        overlay.addEventListener('click', closeMenu);
    }

    function closeMenu() {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');

        if (overlay) {
            overlay.remove();
            overlay = null;
        }
        document.body.style.overflow = '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Close on nav link click
    navLinkItems.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Active link tracking
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);

            if (link) {
                if (scrollPos >= top && scrollPos < bottom) {
                    navLinkItems.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    updateActiveLink();
})();

/* ========================================================
   HERO TYPING EFFECT
======================================================== */
(function initTyping() {
    const typingEl = document.getElementById('heroTyping');
    if (!typingEl) return;

    const words = [
        'Web & Backend',
        'Full Stack',
        'PHP & MySQL',
        'Frontend',
        'Informaticien',
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingEl.textContent = currentWord.substring(0, charIndex);

        let speed = isDeleting ? 60 : 90;

        if (!isDeleting && charIndex === currentWord.length) {
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                type();
            }, 2000);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    setTimeout(type, 1200);
})();

/* ========================================================
   SKILLS TABS
======================================================== */
(function initSkillsTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const panel = document.getElementById(`tab-${tabId}`);
            if (panel) {
                panel.classList.add('active');
                // Animate skill bars in new panel
                animateSkillBars(panel);
            }
        });
    });

    // Initial animation
    const firstPanel = document.querySelector('.tab-panel.active');
    if (firstPanel) {
        setTimeout(() => animateSkillBars(firstPanel), 500);
    }
})();

/* ========================================================
   SKILL BARS ANIMATION
======================================================== */
function animateSkillBars(container) {
    const fills = container.querySelectorAll('.skill-fill');
    fills.forEach(fill => {
        const targetWidth = fill.getAttribute('data-width');
        fill.style.width = targetWidth + '%';
    });
}

/* ========================================================
   SCROLL ANIMATIONS (Intersection Observer)
======================================================== */
(function initScrollAnimations() {
    // Ajouter les classes d'animation aux éléments
    const elementsToAnimate = [
        { selector: '.section-header', class: 'fade-in' },
        { selector: '.skill-card', class: 'fade-in' },
        { selector: '.project-card', class: 'fade-in' },
        { selector: '.timeline-item', class: 'fade-in-left' },
        { selector: '.contact-card', class: 'fade-in' },
        { selector: '.highlight-item', class: 'fade-in' },
        { selector: '.about-card', class: 'fade-in-right' },
        { selector: '.value-item', class: 'fade-in' },
    ];

    elementsToAnimate.forEach(({ selector, class: cls }) => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add(cls);
            el.style.transitionDelay = `${i * 0.08}s`;
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate skill bars when skills section becomes visible
                if (entry.target.classList.contains('skill-card')) {
                    const fill = entry.target.querySelector('.skill-fill');
                    if (fill) {
                        const targetWidth = fill.getAttribute('data-width');
                        setTimeout(() => {
                            fill.style.width = targetWidth + '%';
                        }, 100);
                    }
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });
})();

/* ========================================================
   SCREENSHOT CAROUSEL (Cyber Café)
======================================================== */
(function initScreenshotCarousel() {
    const cards = document.querySelectorAll('.project-preview-screenshots');

    cards.forEach(card => {
        const imgs = card.querySelectorAll('.screenshot-img');
        const btns = card.querySelectorAll('.ss-btn');
        let currentIndex = 0;
        let interval;

        function showSlide(index) {
            imgs.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
            btns.forEach((btn, i) => {
                btn.classList.toggle('active', i === index);
            });
            currentIndex = index;
        }

        function nextSlide() {
            const next = (currentIndex + 1) % imgs.length;
            showSlide(next);
        }

        function startInterval() {
            interval = setInterval(nextSlide, 3000);
        }

        function stopInterval() {
            clearInterval(interval);
        }

        btns.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                stopInterval();
                showSlide(i);
                startInterval();
            });
        });

        card.addEventListener('mouseenter', stopInterval);
        card.addEventListener('mouseleave', startInterval);

        // Démarrer seulement si les images se sont chargées
        const firstImg = imgs[0];
        if (firstImg) {
            if (firstImg.complete) {
                startInterval();
            } else {
                firstImg.addEventListener('load', startInterval);
                // Fallback si l'image ne charge pas
                firstImg.addEventListener('error', startInterval);
                setTimeout(startInterval, 2000);
            }
        }
    });
})();

/* ========================================================
   CONTACT FORM
======================================================== */
(function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            showToast('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showToast('Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        // Construction du lien mailto
        const subjectText = subject || 'Contact depuis portfolio';
        const body = `Bonjour Santatra,\n\nJe me permets de vous contacter depuis votre portfolio.\n\nNom : ${name}\nEmail : ${email}\nSujet : ${subjectText}\n\nMessage :\n${message}\n\nCordialement,\n${name}`;

        const mailtoLink = `mailto:santatrajolivor@gmail.com?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;

        showToast('Votre client mail s\'ouvre pour envoyer le message.', 'success');
        form.reset();
    });

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
})();

/* ========================================================
   TOAST NOTIFICATIONS
======================================================== */
function showToast(message, type = 'success') {
    // Supprimer le toast existant
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    // Animation
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

/* ========================================================
   BACK TO TOP
======================================================== */
(function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

/* ========================================================
   SMOOTH SCROLL
======================================================== */
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const navHeight = document.getElementById('navbar')?.offsetHeight || 70;
            const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

            window.scrollTo({ top: targetTop, behavior: 'smooth' });
        });
    });
})();

/* ========================================================
   STATS COUNTER ANIMATION
======================================================== */
(function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                const numMatch = text.match(/\d+/);
                if (!numMatch) return;

                const target = parseInt(numMatch[0]);
                const suffix = text.replace(/\d+/, '');
                let current = 0;
                const duration = 1200;
                const steps = 30;
                const increment = target / steps;
                const intervalTime = duration / steps;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(counter);
                    }
                    el.textContent = Math.round(current) + suffix;
                }, intervalTime);

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
})();

/* ========================================================
   KEYBOARD ACCESSIBILITY
======================================================== */
(function initKeyboardNav() {
    // Fermer le menu mobile avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navLinks = document.getElementById('navLinks');
            const hamburger = document.getElementById('hamburger');

            if (navLinks && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                hamburger.classList.remove('open');
                document.body.style.overflow = '';

                const overlay = document.querySelector('.nav-overlay');
                if (overlay) overlay.remove();
            }
        }
    });
})();

/* ========================================================
   PROJET CARDS — Hover improvements
======================================================== */
(function initProjectCards() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '';
        });
    });
})();

/* ========================================================
   CONSOLE MESSAGE
======================================================== */
console.log(
    '%c⚡ Portfolio de Santatra Jolivo Randrianirina\n%c Développeur Web & Informaticien\n santatrajolivor@gmail.com',
    'color: #00d4ff; font-size: 18px; font-weight: bold;',
    'color: #a0a0b8; font-size: 12px;'
);
