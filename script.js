// ============================================
// NEXAI LABS - Premium Effects Engine v2
// Professional-Grade Web Animations
// ============================================

// Load GSAP with all plugins
const loadGSAP = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = () => {
            const st = document.createElement('script');
            st.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
            st.onload = resolve;
            document.head.appendChild(st);
        };
        document.head.appendChild(script);
    });
};

// ============================================
// GRID SPOTLIGHT - Mouse Follow Effect
// ============================================
class GridSpotlight {
    constructor() {
        if (window.innerWidth < 1024) return;
        
        this.spotlight = document.createElement('div');
        this.spotlight.className = 'grid-spotlight';
        document.body.appendChild(this.spotlight);
        
        this.mouse = { x: 0, y: 0 };
        this.pos = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.spotlight.classList.add('active');
        });
        
        document.addEventListener('mouseleave', () => {
            this.spotlight.classList.remove('active');
        });
        
        this.render();
    }
    
    render() {
        // Smooth follow
        this.pos.x += (this.mouse.x - this.pos.x) * 0.1;
        this.pos.y += (this.mouse.y - this.pos.y) * 0.1;
        
        this.spotlight.style.left = `${this.pos.x}px`;
        this.spotlight.style.top = `${this.pos.y}px`;
        
        requestAnimationFrame(() => this.render());
    }
}

// ============================================
// MAGNETIC CURSOR - Physics-Based
// ============================================
class MagneticCursor {
    constructor() {
        if (window.innerWidth < 1024) return;
        
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor-ring';
        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'cursor-dot';
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorDot);
        
        this.pos = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        this.render();
        this.setupMagnetics();
        this.setupHovers();
    }
    
    render() {
        // Physics-based smooth follow
        const dx = this.mouse.x - this.pos.x;
        const dy = this.mouse.y - this.pos.y;
        
        this.velocity.x += dx * 0.1;
        this.velocity.y += dy * 0.1;
        this.velocity.x *= 0.8;
        this.velocity.y *= 0.8;
        
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
        
        this.cursor.style.transform = `translate3d(${this.pos.x - 20}px, ${this.pos.y - 20}px, 0)`;
        this.cursorDot.style.transform = `translate3d(${this.mouse.x - 4}px, ${this.mouse.y - 4}px, 0)`;
        
        requestAnimationFrame(() => this.render());
    }
    
    setupMagnetics() {
        const magnets = document.querySelectorAll('.btn, .project-cta, .theme-toggle, .nav-links a');
        
        magnets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-magnetic');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-magnetic');
            });
        });
    }
    
    setupHovers() {
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('cursor-hover'));
        });
        
        document.querySelectorAll('.project-mockup').forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('cursor-expand'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('cursor-expand'));
        });
    }
}

// ============================================
// 3D TILT EFFECT - Premium Hover
// ============================================
class TiltEffect {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            max: options.max || 15,
            perspective: options.perspective || 1000,
            scale: options.scale || 1.02,
            speed: options.speed || 500,
            glare: options.glare || true
        };
        
        if (this.options.glare) {
            this.glareElement = document.createElement('div');
            this.glareElement.className = 'tilt-glare';
            this.element.appendChild(this.glareElement);
            this.element.style.overflow = 'hidden';
        }
        
        this.init();
    }
    
    init() {
        this.element.style.transformStyle = 'preserve-3d';
        this.element.style.transition = `transform ${this.options.speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
        
        this.element.addEventListener('mouseenter', () => this.onEnter());
        this.element.addEventListener('mousemove', (e) => this.onMove(e));
        this.element.addEventListener('mouseleave', () => this.onLeave());
    }
    
    onEnter() {
        this.element.style.transition = 'none';
    }
    
    onMove(e) {
        const rect = this.element.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const rotateX = (this.options.max / 2 - y * this.options.max).toFixed(2);
        const rotateY = (x * this.options.max - this.options.max / 2).toFixed(2);
        
        this.element.style.transform = `
            perspective(${this.options.perspective}px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(${this.options.scale}, ${this.options.scale}, ${this.options.scale})
        `;
        
        if (this.glareElement) {
            const glareX = x * 100;
            const glareY = y * 100;
            this.glareElement.style.background = `
                radial-gradient(circle at ${glareX}% ${glareY}%, 
                rgba(255,255,255,0.3) 0%, 
                rgba(255,255,255,0) 60%)
            `;
        }
    }
    
    onLeave() {
        this.element.style.transition = `transform ${this.options.speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
        this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
        if (this.glareElement) {
            this.glareElement.style.background = 'transparent';
        }
    }
}

// ============================================
// KINETIC TYPOGRAPHY - Variable Font Weight
// ============================================
class KineticTypography {
    constructor() {
        this.heroTitle = document.querySelector('.hero-title');
        if (!this.heroTitle) return;
        
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX / window.innerWidth;
            this.mouse.y = e.clientY / window.innerHeight;
            this.updateWeight();
        });
    }
    
    updateWeight() {
        // Map mouse position to font weight (400-900)
        const weight = Math.round(400 + (this.mouse.x * 500));
        this.heroTitle.style.fontVariationSettings = `'wght' ${weight}`;
    }
}

// ============================================
// SCROLL VELOCITY TYPOGRAPHY
// ============================================
class ScrollVelocityText {
    constructor() {
        this.lastScroll = 0;
        this.velocity = 0;
        this.heroSubtitle = document.querySelector('.hero-subtitle');
        
        if (this.heroSubtitle) {
            window.addEventListener('scroll', () => this.onScroll());
            this.animate();
        }
    }
    
    onScroll() {
        const currentScroll = window.scrollY;
        this.velocity = Math.abs(currentScroll - this.lastScroll);
        this.lastScroll = currentScroll;
    }
    
    animate() {
        // Smoothly decay velocity
        this.velocity *= 0.95;
        
        // Apply velocity-based letter spacing
        const spacing = Math.min(this.velocity * 0.1, 5);
        this.heroSubtitle.style.letterSpacing = `${spacing}px`;
        
        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// ADVANCED GSAP SCROLL ANIMATIONS
// ============================================
async function initScrollAnimations() {
    await loadGSAP();
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero Parallax - Multiple layers at different speeds
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        gsap.to('.hero-content', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: 150,
            opacity: 0.3
        });
        
        gsap.to('.particles-container', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 0.5
            },
            y: 100
        });
    }
    
    // Stats - Staggered reveal with individual triggers
    gsap.utils.toArray('.stat-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Project Cards - Horizontal slide in
    gsap.utils.toArray('.project-card-large').forEach((card, i) => {
        const direction = card.classList.contains('reverse') ? 100 : -100;
        
        gsap.from(card.querySelector('.project-visual'), {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: direction,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from(card.querySelector('.project-info'), {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: -direction * 0.5,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
        });
    });
    
    // Category Headers - Text reveal
    gsap.utils.toArray('.category-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    // About Section - Split reveal
    const aboutContent = document.querySelector('.about-content');
    const aboutVisual = document.querySelector('.about-visual');
    
    if (aboutContent) {
        gsap.from(aboutContent, {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            x: -80,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }
    
    if (aboutVisual) {
        gsap.from(aboutVisual, {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            x: 80,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
        });
    }
    
    // Capabilities - Stagger
    gsap.utils.toArray('.capability').forEach((cap, i) => {
        gsap.from(cap, {
            scrollTrigger: {
                trigger: cap,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            x: -30,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out'
        });
    });
    
    // Contact Section
    gsap.from('.contact-content', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Footer - Rise up
    gsap.from('.footer-content', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });
}

// ============================================
// TYPING EFFECT - Premium Version
// ============================================
const typingTexts = [
    'We Build the Future',
    'Innovation at Scale',
    'Code That Matters',
    'Ship Fast. Ship Right.'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeEffect() {
    if (!typingElement) return;
    
    const current = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let speed = isDeleting ? 30 : 70;
    
    if (!isDeleting && charIndex === current.length) {
        speed = 2500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        speed = 300;
    }
    
    setTimeout(typeEffect, speed);
}

// ============================================
// STATS COUNTER - Eased Animation
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            
            if (target === 500) {
                counter.textContent = Math.floor(current) + '+';
            } else if (target === 99) {
                counter.textContent = current.toFixed(1) + '%';
            } else if (target === 4.9) {
                counter.textContent = current.toFixed(1) + '★';
            } else {
                counter.textContent = Math.floor(current);
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    });
}

// ============================================
// THEME - Auto-detect system preference
// ============================================
function initTheme() {
    const saved = localStorage.getItem('theme');
    
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
    } else {
        // Auto-detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

const themeToggle = document.getElementById('themeToggle');
themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

initTheme();

// ============================================
// MOBILE MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ============================================
// SMOOTH SCROLL - Premium
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            
            window.scrollTo({
                top,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// BACK TO TOP
// ============================================
const backToTop = document.getElementById('backToTopBtn');
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Back to top visibility
    if (currentScroll > 500) {
        backToTop?.classList.add('show');
    } else {
        backToTop?.classList.remove('show');
    }
    
    // Hide navbar on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar?.style.setProperty('transform', 'translateY(-100%)');
    } else {
        navbar?.style.setProperty('transform', 'translateY(0)');
    }
    
    lastScroll = currentScroll;
});

backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// MODALS
// ============================================
const signinBtn = document.getElementById('signinBtn');
const signinModal = document.getElementById('signinModal');
const modalClose = document.getElementById('modalClose');

signinBtn?.addEventListener('click', () => {
    signinModal?.classList.add('show');
    document.body.style.overflow = 'hidden';
});

modalClose?.addEventListener('click', () => {
    signinModal?.classList.remove('show');
    document.body.style.overflow = '';
});

signinModal?.addEventListener('click', (e) => {
    if (e.target === signinModal) {
        signinModal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

document.getElementById('notifyForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Thanks! We\'ll be in touch soon.');
    signinModal?.classList.remove('show');
    document.body.style.overflow = '';
    e.target.reset();
});

// ============================================
// COOKIE CONSENT
// ============================================
const cookieConsent = document.getElementById('cookieConsent');
const cookieAccept = document.getElementById('cookieAccept');
const cookieDecline = document.getElementById('cookieDecline');

if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => cookieConsent?.classList.add('show'), 3000);
}

cookieAccept?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieConsent?.classList.remove('show');
});

cookieDecline?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    cookieConsent?.classList.remove('show');
});

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${type === 'success' 
                ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
                : '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>'
            }
        </svg>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => toast.classList.add('show'));
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ============================================
// LAZY LOADING IMAGES
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });
        
        images.forEach(img => observer.observe(img));
    }
}

// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // Animate out
    setTimeout(() => {
        preloader?.classList.add('hidden');
        
        // Start animations after preloader
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 300);
    }, 800);
});

// ============================================
// INIT EVERYTHING
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
    // Typing effect
    setTimeout(typeEffect, 800);
    
    // GSAP Scroll animations
    await initScrollAnimations();
    
    // Magnetic cursor (desktop)
    if (window.innerWidth >= 1024) {
        new MagneticCursor();
        new GridSpotlight();
    }
    
    // 3D Tilt on project mockups
    document.querySelectorAll('.project-mockup').forEach(el => {
        new TiltEffect(el, { max: 10, glare: true });
    });
    
    // Lazy loading
    initLazyLoading();
    
    // Stats counter observer
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
});

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        signinModal?.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Console Easter Egg
console.log('%c🚀 Nexai Labs', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cBuilding the future, one line at a time.', 'font-size: 14px; color: #8b5cf6;');
console.log('%cInterested in working together? → support@nexailabs.tech', 'font-size: 12px; color: #64748b;');
