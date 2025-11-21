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

// Custom Cursor (Desktop Only) - Enhanced with animations
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
        let isHovering = false;
        let currentMagneticElement = null;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Check for text elements under cursor
            const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
            if (elementUnderCursor) {
                const computedStyle = window.getComputedStyle(elementUnderCursor);
                const isTextElement = elementUnderCursor.matches('p, span, h1, h2, h3, h4, h5, h6, label, .text-content') ||
                    (elementUnderCursor.childNodes.length === 1 &&
                     elementUnderCursor.childNodes[0].nodeType === Node.TEXT_NODE &&
                     elementUnderCursor.childNodes[0].textContent.trim().length > 0);

                if (isTextElement && !isHovering) {
                    cursor.classList.add('text');
                    cursorDot.classList.add('text');
                } else if (!isHovering) {
                    cursor.classList.remove('text');
                    cursorDot.classList.remove('text');
                }
            }
        });

        // Smooth cursor animation with magnetic effect
        function animateCursor() {
            let targetX = mouseX;
            let targetY = mouseY;

            // Magnetic effect - snap to center of hovered element
            if (currentMagneticElement && isHovering) {
                const rect = currentMagneticElement.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Calculate distance to center
                const distX = mouseX - centerX;
                const distY = mouseY - centerY;
                const distance = Math.sqrt(distX * distX + distY * distY);

                // Magnetic pull strength (closer = stronger pull)
                const maxDistance = Math.max(rect.width, rect.height) / 2;
                const magnetStrength = Math.max(0, 1 - (distance / maxDistance)) * 0.3;

                targetX = mouseX - (distX * magnetStrength);
                targetY = mouseY - (distY * magnetStrength);
            }

            // Smooth interpolation
            cursorX += (targetX - cursorX) * 0.15;
            cursorY += (targetY - cursorY) * 0.15;
            dotX += (targetX - dotX) * 0.35;
            dotY += (targetY - dotY) * 0.35;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Click animation
        document.addEventListener('mousedown', () => {
            cursor.classList.add('clicking');
            cursorDot.classList.add('clicking');
        });

        document.addEventListener('mouseup', () => {
            cursor.classList.remove('clicking');
            cursorDot.classList.remove('clicking');
        });

        // Hover effects with magnetic detection
        const interactiveElements = document.querySelectorAll('a, button, .bento-card, .kb-item, .project-item, .social-btn, .submit-btn, .filter-btn, .tech-item, .nav-link, .theme-toggle, input, textarea');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                cursor.classList.add('hover');
                cursorDot.classList.add('hover');
                cursor.classList.remove('text');
                cursorDot.classList.remove('text');
                isHovering = true;
                currentMagneticElement = el;

                // Add magnetic class for smooth snapping
                if (el.matches('button, .social-btn, .submit-btn, .filter-btn, .theme-toggle')) {
                    cursor.classList.add('magnetic');
                }
            });

            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover', 'magnetic');
                cursorDot.classList.remove('hover');
                isHovering = false;
                currentMagneticElement = null;
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.classList.add('hidden');
            cursorDot.classList.add('hidden');
        });

        document.addEventListener('mouseenter', () => {
            cursor.classList.remove('hidden');
            cursorDot.classList.remove('hidden');
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