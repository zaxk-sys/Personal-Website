// Initialize Lenis Smooth Scroll (Apple-style)
const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Apple-style smooth scroll to sections
document.addEventListener('DOMContentLoaded', function() {
    // Handle cross-page navigation (redirect to index.html sections)
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            
            // If it's a link to another page with a hash, handle it
            if (href.includes('index.html#')) {
                const hash = href.split('#')[1];
                const currentPage = window.location.pathname.split('/').pop();
                
                // If we're not on index.html, navigate there first
                if (currentPage !== 'index.html' && currentPage !== '') {
                    e.preventDefault();
                    window.location.href = href;
                    return;
                }
            }
        });
    });
    
    // Handle same-page anchor links with smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                // Use Lenis for smooth scroll (Apple-style)
                lenis.scrollTo(target, {
                    offset: -80, // Account for nav height
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Handle hash on page load
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                lenis.scrollTo(target, {
                    offset: -80,
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
            }
        }, 100);
    }
    
    // Update active nav on scroll
    const sections = document.querySelectorAll('section[id], main[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref && linkHref.includes(`#${current}`)) {
                link.classList.add('active');
            }
        });
    }
    
    // Use Lenis scroll event for smoother updates
    lenis.on('scroll', updateActiveNav);
    updateActiveNav();
});

// Custom Cursor (Desktop Only)
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('DOMContentLoaded', function() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        const cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor-dot';
        document.body.appendChild(cursorDot);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let dotX = 0;
        let dotY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor animation
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            dotX += (mouseX - dotX) * 0.3;
            dotY += (mouseY - dotY) * 0.3;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .bento-card, .kb-item, .project-item, .social-btn, .submit-btn, .filter-btn');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    });
}

// Live Time for Location Card
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/London' // Set to UK time since "Based in UK"
    });
    const dateString = now.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    });
    
    const timeElement = document.getElementById('local-time');
    if (timeElement) {
        timeElement.textContent = `${timeString} • ${dateString}`;
    }
}

setInterval(updateTime, 1000);
updateTime();

// Apple-style scroll-triggered animations
if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    entry.target.style.animation = `cardFadeIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
                }, index * 50);
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all cards
    document.querySelectorAll('.bento-card').forEach(card => {
        cardObserver.observe(card);
    });
} else {
    // Fallback: show all cards immediately if IntersectionObserver not supported
    document.querySelectorAll('.bento-card').forEach(card => {
        card.classList.add('visible');
    });
}

// Add floating animation after cards are visible
setTimeout(() => {
    document.querySelectorAll('.bento-card.visible, .bento-card').forEach((card, index) => {
        card.classList.add('animated');
    });
}, 1500);

console.log("Bento Grid Layout Initialized v2.0 - Apple Style");