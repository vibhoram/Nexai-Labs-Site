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
// NAVBAR SCROLL BEHAVIOR
// ============================================
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Hide navbar on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar?.style.setProperty('transform', 'translateY(-100%)');
    } else {
        navbar?.style.setProperty('transform', 'translateY(0)');
    }
    
    lastScroll = currentScroll;
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

// Handle clicking outside modal to close
signinModal?.addEventListener('click', (e) => {
    if (e.target === signinModal || e.target.classList.contains('modal-overlay')) {
        signinModal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

const projectTypeDropdown = document.getElementById('projectTypeDropdown');
const projectTypeInput = document.getElementById('projectTypeInput');
const dropdownSelected = projectTypeDropdown?.querySelector('.dropdown-selected');
const dropdownOptions = projectTypeDropdown?.querySelectorAll('.dropdown-option');
const otherTypeGroup = document.getElementById('otherTypeGroup');
const otherTypeInput = document.getElementById('otherType');

// Toggle Dropdown
dropdownSelected?.addEventListener('click', () => {
    projectTypeDropdown.classList.toggle('active');
});

// Close when clicking outside
document.addEventListener('click', (e) => {
    if (!projectTypeDropdown?.contains(e.target)) {
        projectTypeDropdown?.classList.remove('active');
    }
});

// Option Selection
dropdownOptions?.forEach(option => {
    option.addEventListener('click', () => {
        const value = option.dataset.value;
        const text = option.innerHTML; // Get text with icon
        
        // Update selected view
        dropdownSelected.querySelector('span').innerHTML = text;
        dropdownSelected.classList.add('has-value');
        
        // Update Hidden Input
        projectTypeInput.value = value;
        
        // Handle "Other" Logic
        if (value === 'Other') {
            otherTypeGroup.style.display = 'block';
            otherTypeInput.setAttribute('required', 'true');
            setTimeout(() => otherTypeInput.focus(), 100);
        } else {
            otherTypeGroup.style.display = 'none';
            otherTypeInput.removeAttribute('required');
        }
        
        // Close dropdown
        projectTypeDropdown.classList.remove('active');
    });
});

const notifyForm = document.getElementById('notifyForm');

// ============================================
// CONFIGURATION
// ============================================
const DESTINATION_EMAIL = "support@nexailabs.tech"; 
const DEBUG_MODE = false; // <--- Set to TRUE to debug email issues

notifyForm?.addEventListener('submit', async (e) => {
    // DEBUG MODE: Submit normally to see FormSubmit's actual response page
    if (DEBUG_MODE) {
        console.log('DEBUG MODE ACTIVE: Submitting form natively to check for activation/errors...');
        // We do NOT preventDefault here. We let the form submit to the URL.
        // This will open the FormSubmit page so you can see if it asks for activation.
        return true; 
    }

    e.preventDefault();
    
    const btn = notifyForm.querySelector('button[type="submit"]');
    const originalContent = btn.innerHTML;
    const formData = new FormData(notifyForm);
    
    console.log(`[FormSubmit] Attempting to send data to owner: ${DESTINATION_EMAIL}`);
    console.log(`[FormSubmit] Customer Email: ${formData.get('email')}`);
    
    // Loading State
    btn.disabled = true;
    btn.innerHTML = `
        <div class="loader-sm"></div>
        <span>Processing Request...</span>
    `;
    
    try {
        // Send to FormSubmit.co via fetch
        const response = await fetch(`https://formsubmit.co/ajax/${DESTINATION_EMAIL}`, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        const result = await response.json();
        console.log('[FormSubmit] Response:', result);

        if (response.ok) {
            // Success State
            signinModal.innerHTML = `
                <div class="modal-content contact-modal" style="text-align: center; padding: 3rem;">
                    <div style="width: 80px; height: 80px; background: rgba(39, 202, 64, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: #27ca40;">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <h2 style="margin-bottom: 1rem;">System Handshake Complete</h2>
                    <p style="color: var(--text-light); margin-bottom: 2rem; line-height: 1.6;">
                        Request ID: <span style="font-family: monospace; background: rgba(99,102,241,0.1); padding: 2px 6px; border-radius: 4px; color: var(--primary);">#NEX-${Math.floor(Math.random() * 90000) + 10000}</span><br>
                        <strong>Internal Note:</strong> This inquiry has been sent to the owner inbox:<br>
                        <span style="color: var(--text); font-weight: 600;">${DESTINATION_EMAIL}</span>
                    </p>
                    <button class="btn btn-secondary" onclick="location.reload()">Return to Site</button>
                </div>
            `;
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('[FormSubmit] Error:', error);
        showToast('Transmission failed. Check console for details.', 'error');
        btn.disabled = false;
        btn.innerHTML = originalContent;
    }
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

// ============================================
// 🚀 BIG CORP AGENCY FEATURES
// AI Chatbot | Pricing Calculator | Book Demo | Client Portal
// ============================================

// ==================== AI CHATBOT ====================
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotMinimize = document.getElementById('chatbotMinimize');
const chatbotForm = document.getElementById('chatbotForm');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotMessages = document.getElementById('chatbotMessages');

// Toggle chatbot
let hasGreeted = false;
chatbotToggle?.addEventListener('click', () => {
    chatbotToggle.classList.toggle('active');
    chatbotWindow.classList.toggle('active');
    
    // Send initial greeting only once
    if (!hasGreeted && chatbotWindow.classList.contains('active')) {
        hasGreeted = true;
        setTimeout(() => {
            // Remove the static default message if it exists
            const staticMsg = chatbotMessages.querySelector('.bot-message');
            if (staticMsg && staticMsg.querySelector('.quick-actions')) {
                staticMsg.remove();
            }

            addBotMessage(`👋 Hey there! I'm your AI assistant for Nexai Labs.

I can help you with:
[1] 💰 Pricing estimates
[2] 📅 Scheduling a demo
[3] 📧 Contacting our team
[4] 🚀 Viewing our work
[5] ⚙️ Learning about our tech stack

What would you like to know? Just type a number!`);
        }, 500);
    }
});

// Minimize chatbot
chatbotMinimize?.addEventListener('click', (e) => {
    e.stopPropagation();
    chatbotToggle.classList.remove('active');
    chatbotWindow.classList.remove('active');
});

// Close chatbot when clicking outside
document.addEventListener('click', (e) => {
    const chatbot = document.getElementById('aiChatbot');
    const isClickInside = chatbot?.contains(e.target);
    
    if (!isClickInside && chatbotWindow?.classList.contains('active')) {
        chatbotToggle?.classList.remove('active');
        chatbotWindow?.classList.remove('active');
    }
});

// Prevent clicks inside chatbot from closing it
chatbotWindow?.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Quick action buttons
document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        
        if (action === 'pricing') {
            window.location.href = 'pricing.html';
        } else if (action === 'demo') {
            window.location.href = 'book-demo.html';
        } else if (action === 'contact') {
            signinBtn?.click();
            addBotMessage("Perfect! Fill out the form and we'll get back to you within 24 hours.");
        }
    });
});

// Chatbot form submission
chatbotForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = chatbotInput.value.trim();
    
    if (message) {
        // Add user message
        addUserMessage(message);
        chatbotInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const response = getBotResponse(message.toLowerCase());
            addBotMessage(response);
        }, 800);
    }
});

function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'user-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        </div>
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function addBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bot-message';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
            </svg>
        </div>
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}


function getBotResponse(message) {
    const msg = message.toLowerCase().trim();

    // Automated number system [1-5]
    if (msg === '1' || msg === '[1]') {
        setTimeout(() => window.location.href = 'pricing.html', 500);
        return "💰 Opening our pricing calculator now! Our projects start at just $800. What kind of project are you planning?";
    }
    if (msg === '2' || msg === '[2]') {
        setTimeout(() => window.location.href = 'book-demo.html', 500);
        return "📅 Perfect! Opening our scheduling page. You can book a free 30-min discovery call with our team.";
    }
    if (msg === '3' || msg === '[3]') {
        setTimeout(() => document.getElementById('signinBtn')?.click(), 500);
        return "📧 Opening our contact form! Fill it out and we'll get back to you within 24 hours. You can also email us at support@nexailabs.tech.";
    }
    if (msg === '4' || msg === '[4]') {
        setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 300);
        return "🚀 Scrolling to our portfolio! We've built everything from SaaS platforms to mobile apps. Which project interests you?";
    }
    if (msg === '5' || msg === '[5]') {
        return "⚙️ Our tech stack: React, Next.js, Node.js, Python, TypeScript, AWS, and AI integration. We use the latest tools to build scalable applications!";
    }
    
    // Detect user's energy level and match it
    const isHyped = msg.includes('!') || msg.includes('awesome') || msg.includes('dope') || msg.includes('sick');
    const isCasual = msg.includes('bro') || msg.includes('dude') || msg.includes('yo') || msg.includes('lol') || msg.includes('lmao');
    const isCursing = msg.includes('fuck') || msg.includes('shit') || msg.includes('damn') || msg.includes('ass');
    
    // Casual/Slang responses
    if (isCasual && msg.includes('sup')) {
        return "Yo! Not much, just here to help you build dope shit 🔥 What's good? Need pricing, wanna book a call, or just curious about what we do?";
    }
    
    if (isCursing && (msg.includes('expensive') || msg.includes('much'))) {
        return "Haha nah bro, we're actually pretty affordable! Starting at just $800 for a solid web app. Click that pricing button and see for yourself 💰";
    }
    
    if (msg.includes('fast') && isCasual) {
        return "Hell yeah we're fast! ⚡ Simple sites = 2-4 weeks. We don't fuck around with timelines. Want specifics? Say 'timeline' and I'll break it down!";
    }
    
    if (msg.includes('legit') || msg.includes('real') || msg.includes('scam')) {
        return "100% legit bro 💯 Not a scam, not offshore, not some dropshipping BS. Real devs, real code, real results. Check our portfolio (say 'work') or book a demo to talk to us directly!";
    }
    
    if (msg.includes('best') || msg.includes('good') || msg.includes('recommend')) {
        return "Best bet? Start with our Basic Web App ($800) if you're testing an idea. If you're serious about scale, go Professional ($3,500). Either way, we'll build it right 🎯 Want a detailed rec? Book a demo!";
    }
    
    if (msg.includes('boring') || msg.includes('basic') || msg.includes('template')) {
        return "Nah we don't do boring templates 😤 Even our $800 tier gets custom design, smooth animations, and that premium feel. We're not churning out WordPress trash here!";
    }
    
    if (msg.includes('ai') && !msg.includes('integration')) {
        return "Yo, AI stuff is HUGE right now! We can integrate GPT-powered chat, content generation, smart recommendations... basically make your app feel alive 🤖 Add-on is $500. Interested?";
    }
    
    // Pricing keywords
    if (msg.includes('price') || msg.includes('cost') || msg.includes('pricing') || 
        msg.includes('how much') || msg.includes('quote') || msg.includes('estimate') || 
        msg.includes('budget') || msg.includes('rate')) {
        setTimeout(() => {
            window.location.href = 'pricing.html';
        }, 500);
        return "💰 Opening our pricing calculator now! You can customize your project type, complexity level, and additional features to get an instant estimate. The prices are super affordable starting at just $800!";
    } 
    
    // Demo/Meeting keywords
    else if (msg.includes('demo') || msg.includes('call') || msg.includes('meeting') || 
             msg.includes('schedule') || msg.includes('book') || msg.includes('appointment') || 
             msg.includes('consultation') || msg.includes('talk')) {
        setTimeout(() => {
            window.location.href = 'book-demo.html';
        }, 500);
        return "📅 Perfect! Opening our scheduling page now. Pick a time that works best for you and we'll have a detailed discussion about your project goals and how we can help!";
    } 
    
    // Contact/Email keywords
    else if (msg.includes('contact') || msg.includes('email') || msg.includes('reach') || 
             msg.includes('message') || msg.includes('talk to you') || msg.includes('get in touch')) {
        setTimeout(() => {
            document.getElementById('signinBtn')?.click();
        }, 500);
        return "📧 Great! I'm opening our contact form for you. Fill it out with your project details and we'll get back to you within 24 hours. You can also email us directly at support@nexailabs.tech!";
    }
    
    // Portfolio/Work keywords
    else if (msg.includes('portfolio') || msg.includes('work') || msg.includes('project') || 
             msg.includes('previous') || msg.includes('examples') || msg.includes('showcase') ||
             msg.includes('built')) {
        setTimeout(() => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
        return "🚀 Check out our latest projects below! We've built everything from SaaS platforms to mobile apps for startups and enterprises. Each project showcases our commitment to quality and innovation.";
    }
    
    // Tech stack keywords  
    else if (msg.includes('tech') || msg.includes('stack') || msg.includes('technology') || 
             msg.includes('framework') || msg.includes('language') || msg.includes('tool')) {
        return "⚙️ We specialize in modern tech: React, Next.js, Node.js, Python, TypeScript, AWS, Firebase, and cutting-edge AI integration. We stay updated with the latest technologies to build scalable, performant applications!";
    }
    
    // Services keywords
    else if (msg.includes('service') || msg.includes('what do you') || msg.includes('offer') || 
             msg.includes('help with') || msg.includes('do you do')) {
        return "✨ We offer full-stack development (web & mobile apps), UI/UX design, AI integration, cloud deployment, and ongoing maintenance. Whether you need an MVP, enterprise platform, or complete redesign, we've got you covered!";
    }
    
    // Timeline keywords
    else if (msg.includes('how long') || msg.includes('timeline') || msg.includes('duration') || 
             msg.includes('time') || msg.includes('fast') || msg.includes('quick')) {
        return "⏱️ Timeline depends on project complexity! Simple web apps: 2-4 weeks. Mobile apps: 4-8 weeks. Enterprise solutions: 8-16 weeks. We work in agile sprints with regular updates. Want a specific estimate? Click 'Book Demo' above!";
    }
    
    // Process keywords
    else if (msg.includes('process') || msg.includes('how do you') || msg.includes('workflow') || 
             msg.includes('methodology')) {
        return "🔄 Our process: 1) Discovery call to understand your vision, 2) Design & prototyping phase, 3) Agile development with weekly updates, 4) Testing & QA, 5) Deployment & training, 6) Ongoing support. We keep you involved every step!";
    }
    
    // Team keywords
    else if (msg.includes('team') || msg.includes('who') || msg.includes('people') || 
             msg.includes('company') || msg.includes('about you')) {
        setTimeout(() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
        return "👥 We're a team of passionate developers, designers, and AI specialists based globally. Scroll down to learn more about us, our mission, and what drives us to create exceptional digital products!";
    }
    
    // Greeting keywords
    else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || 
             msg.includes('sup') || msg.includes('yo')) {
        return "👋 Hey there! I'm your AI assistant. I can help you with:\n• 💰 Pricing estimates\n• 📅 Scheduling a demo\n• 📧 Contacting our team\n• 🚀 Viewing our work\n• ⚙️ Learning about our tech stack\n\nWhat would you like to know?";
    }
    
    // Thank you
    else if (msg.includes('thank') || msg.includes('thanks') || msg.includes('appreciate')) {
        return "😊 You're very welcome! If you have any other questions, just ask. Ready to start your project? Click 'Book Demo' or 'Contact Sales' above!";
    }
    
    // Common questions - intelligent varied responses
    else if (msg.includes('why') || msg.includes('why should')) {
        return "💡 Great question! We combine technical excellence with creative design. Our team has delivered 50+ projects, averaging 4.8/5 client satisfaction. We're not just developers - we're your strategic partners in growth!";
    }
    
    else if (msg.includes('when') || msg.includes('availability') || msg.includes('available')) {
        return "📆 We're available Monday-Friday, 9 AM - 6 PM EST, but our chatbot is always here! For immediate assistance, click 'Contact Sales' or book a demo for a detailed discussion.";
    }
    
    else if (msg.includes('where') || msg.includes('location') || msg.includes('based')) {
        return "🌍 We're a globally distributed team with members across North America, Europe, and Asia. This lets us provide 24/7 support and diverse perspectives on every project!";
    }
    
    else if (msg.includes('payment') || msg.includes('pay') || msg.includes('invoice')) {
        return "💳 We accept bank transfers, credit cards, and offer flexible payment plans. Typically 30% upfront, 40% mid-project, 30% on completion. Want details? Book a demo!";
    }
    
    else if (msg.includes('guarantee') || msg.includes('warranty') || msg.includes('support after')) {
        return "✅ Yes! We provide 30 days of free post-launch support and bug fixes. We also offer ongoing maintenance packages. Your success is our success!";
    }
    
    else if (msg.includes('experience') || msg.includes('years') || msg.includes('expertise')) {
        return "🏆 Our team has 10+ years combined experience. We've built apps for startups, mid-size companies, and Fortune 500s. Industries: FinTech, HealthTech, E-commerce, SaaS, and more!";
    }
    
    else if (msg.includes('start') || msg.includes('begin') || msg.includes('kick off') || msg.includes('first step')) {
        setTimeout(() => {
            const bookDemoModal = document.getElementById('bookDemoModal');
            bookDemoModal?.classList.add('show');
            document.body.style.overflow = 'hidden';
        }, 500);
        return "🚀 Let's get started! I'm opening our scheduler - book a free 30-min discovery call. We'll discuss your vision, timeline, budget, and create a custom roadmap for your project!";
    }
    
    else if (msg.includes('urgent') || msg.includes('asap') || msg.includes('rush')) {
        return "⚡ We can accommodate rush projects! Typical rush timeline: 1-2 weeks for MVPs. Premium rates apply. Book a demo ASAP and mention 'urgent' - we'll prioritize your call!";
    }
    
    else if (msg.includes('competition') || msg.includes('vs') || msg.includes('better') || msg.includes('different')) {
        return "🌟 Unlike agencies that outsource, WE build your project in-house. You get direct access to developers, weekly updates, full code ownership, and personalized support. Quality over quantity, always!";
    }
    
    // Check if asking a question (contains question words)
    else if (msg.includes('what') || msg.includes('how') || msg.includes('can you') || msg.includes('do you')) {
        const responses = [
            "🤔 That's a great question! While I don't have that specific info, I can connect you with our team. Try asking about pricing, our work, or booking a demo!",
            "💬 Hmm, I'm not 100% sure about that! But I can help with: pricing estimates, scheduling calls, viewing our portfolio, or general questions about our services. What interests you?",
            "🎯 Good question! For detailed answers, I'd recommend booking a quick demo call with our team. They can address all your specific needs. Want me to open the scheduler?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Default intelligent fallback with variety
    else {
        const fallbacks = [
            "🤔 I'm not quite sure about that, but I'm great at helping with:\n• 💰 Pricing (say 'pricing')\n• 📅 Scheduling demos (say 'book demo')\n• 🚀 Viewing our work (say 'portfolio')\n• 📧 Contacting us (say 'contact')\n\nWhat would you like to explore?",
            "💡 Interesting! While that's outside my knowledge base, I can definitely help you with project pricing, booking a consultation, or answering questions about our services. What sounds good?",
            "🎯 Hmm, I'm not programmed to answer that specifically, but I'm an expert on our services! Try asking about:\n• Our tech stack\n• Project timelines\n• Pricing\n• Previous work\n\nOr just say 'help' for options!",
            "👋 I might not fully understand that, but here's what I CAN help with right now: getting you a price quote, scheduling a demo call with our team, or showing you our portfolio. Which one interests you?"
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
}

// ==================== BOOK DEMO MODAL ====================
const bookDemoBtn = document.getElementById('bookDemoBtn');
const bookDemoModal = document.getElementById('bookDemoModal');
const bookDemoOverlay = document.getElementById('bookDemoOverlay');
const closeDemoModal = document.getElementById('closeDemoModal');

function openDemoModal() {
    bookDemoModal?.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeDemoModalFn() {
    bookDemoModal?.classList.remove('show');
    document.body.style.overflow = '';
}

bookDemoBtn?.addEventListener('click', openDemoModal);
closeDemoModal?.addEventListener('click', closeDemoModalFn);
bookDemoOverlay?.addEventListener('click', closeDemoModalFn);

// ==================== PRICING MODAL (Homepage) ====================
if (document.getElementById('pricingModal')) {
    const pModal = document.getElementById('pricingModal');
    const pClose = document.getElementById('closePricingModal');
    
    pClose?.addEventListener('click', () => {
        pModal.classList.remove('show');
        document.body.style.overflow = '';
    });
}

// ==================== ESC KEY HANDLER ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const bdModal = document.getElementById('bookDemoModal');
        const prModal = document.getElementById('pricingModal');
        const cbWindow = document.getElementById('chatbotWindow');
        const cbToggle = document.getElementById('chatbotToggle');

        if (bdModal?.classList.contains('show')) bdModal.classList.remove('show');
        if (prModal?.classList.contains('show')) prModal.classList.remove('show');
        if (cbWindow?.classList.contains('active')) cbToggle?.click();
        document.body.style.overflow = '';
    }
});

console.log('%c Nexai Labs Systems Online', 'font-size: 14px; font-weight: bold; color: #10b981;');
