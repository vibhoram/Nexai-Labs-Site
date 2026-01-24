// ===================================
// NAVIGATION ACTIVE STATE DETECTION
// Auto-highlight current page/section
// ===================================

// Mark active page link
function setActivePageLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Check if link matches current page
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html') ||
            href.includes(currentPage)) {
            link.classList.add('active');
        }
        
        // For pricing.html and book-demo.html
        if ((currentPage === 'pricing.html' && href === 'pricing.html') ||
            (currentPage === 'book-demo.html' && href === 'book-demo.html')) {
            link.classList.add('active');
        }
    });
}

// Mark active section link on scroll (for homepage)
function setActiveSectionLink() {
    if (!window.location.pathname.includes('index.html') && window.location.pathname !== '/' && window.location.pathname !== '') {
        return; // Only run on homepage
    }
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY + 150; // Offset for navbar height
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href.includes('#' + currentSection) && currentSection) {
            link.classList.add('active');
        }
        
        // Default to Home if at top
        if (window.scrollY < 100 && (href === '#home' || href === 'index.html#home' || href === '#')) {
            link.classList.add('active');
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setActivePageLink();
    setActiveSectionLink();
});

// Update on scroll (for homepage sections)
window.addEventListener('scroll', setActiveSectionLink);

// Update on hash change
window.addEventListener('hashchange', setActiveSectionLink);
