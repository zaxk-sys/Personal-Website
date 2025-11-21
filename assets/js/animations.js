/* ============================================
   FUTURISTIC PORTFOLIO - ENHANCED ANIMATIONS
   Micro-animations, 3D effects, and scroll animations
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // SCROLL-TRIGGERED ANIMATIONS
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all fade-in-up elements
  document.querySelectorAll('.fade-in-up, .kb-item').forEach(el => {
    scrollObserver.observe(el);
  });
  
  // ============================================
  // NAVBAR SCROLL EFFECT WITH SMOOTH TRANSITION
  // ============================================
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  let ticking = false;
  
  function updateNavbar() {
    const currentScroll = window.pageYOffset;
    
    if (navbar) {
      if (currentScroll > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    lastScroll = currentScroll;
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  });
  
  // ============================================
  // NAVBAR GRADIENT UNDERLINE ANIMATION
  // ============================================
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    // Create animated underline effect
    link.addEventListener('mouseenter', function() {
      // Add smooth transition
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Add active link indicator animation
    if (link.classList.contains('active')) {
      link.style.transform = 'translateY(-2px)';
    }
  });
  
  // ============================================
  // LOGO NEON PULSE ANIMATION
  // ============================================
  const logo = document.querySelector('.logo');
  if (logo) {
    // Add hover glow effect
    logo.addEventListener('mouseenter', function() {
      this.style.animation = 'logoPulse 2s ease-in-out infinite';
      this.style.filter = 'drop-shadow(0 0 10px rgba(0, 245, 255, 0.8))';
    });
    
    logo.addEventListener('mouseleave', function() {
      this.style.animation = 'none';
      this.style.filter = 'none';
    });
  }
  
  // ============================================
  // MOBILE MENU TOGGLE WITH ANIMATION
  // ============================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      menuToggle.classList.toggle('active');
      
      // Animate hamburger icon
      menuToggle.style.transform = 'rotate(90deg)';
      setTimeout(() => {
        menuToggle.style.transform = 'rotate(0deg)';
      }, 300);
    });
    
    // Close menu when clicking on a link
    const links = navLinksContainer.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }
  
  // ============================================
  // PREMIUM MINIMAL PARTICLES (Home Page)
  // Slow, soft glow particles for premium feel
  // ============================================
  if (document.querySelector('.hero')) {
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
      // Minimal particle count for cleaner look
      const particleCount = 20; // Reduced for premium minimal feel
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 30 + 's';
        
        // Consistent small size
        const size = Math.random() * 1 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Slow, smooth animation (30s)
        particle.style.animationDuration = (Math.random() * 10 + 25) + 's';
        
        // Varying opacity for depth
        particle.style.opacity = Math.random() * 0.3 + 0.2;
        
        // Random movement direction
        const moveX = (Math.random() - 0.5) * 100;
        const moveY = (Math.random() - 0.5) * 100;
        particle.style.setProperty('--move-x', moveX + 'px');
        particle.style.setProperty('--move-y', moveY + 'px');
        
        // Random color variation (cyan to violet)
        const colorVariation = Math.random();
        if (colorVariation > 0.6) {
          particle.style.background = 'var(--neon-violet)';
          particle.style.boxShadow = '0 0 10px var(--neon-violet), 0 0 20px rgba(176, 38, 255, 0.3)';
        }
        
        particlesContainer.appendChild(particle);
      }
    }
  }
  
  // ============================================
  // CONTACT PAGE PARTICLES
  // ============================================
  function createContactParticles() {
    const particlesContainer = document.querySelector('.contact-particles');
    if (!particlesContainer) return;
    
    const particleCount = 30; // Subtle particles for contact page
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'contact-particle';
      
      // Random starting position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.bottom = Math.random() * 20 + '%';
      
      // Random animation delay
      particle.style.animationDelay = Math.random() * 20 + 's';
      
      // Random size variation
      const size = Math.random() * 2 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Random horizontal movement
      const horizontalMove = (Math.random() - 0.5) * 100;
      particle.style.setProperty('--move-x', horizontalMove + 'px');
      
      // Random animation duration (15-25 seconds for slow movement)
      const duration = Math.random() * 10 + 15;
      particle.style.animationDuration = duration + 's';
      
      particlesContainer.appendChild(particle);
    }
  }
  
  // Create contact particles
  if (document.querySelector('.contact-section')) {
    createContactParticles();
  }
  
  // ============================================
  // ENHANCED SCROLL-TRIGGERED ANIMATIONS
  // Smooth fade + parallax entry for hero titles and sections
  // ============================================
  const enhancedObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  };
  
  const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Faster, more responsive animations (150-250ms)
        setTimeout(() => {
          entry.target.classList.add('fade-in-up');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // Faster transitions for section titles
          if (entry.target.classList.contains('section-title')) {
            entry.target.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out, filter 0.15s ease';
          }
        }, index * 30); // Reduced delay from 50ms to 30ms
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements for scroll animations - faster transitions
  // Note: Project cards now use CSS animations for faster initial load
  const animateElements = document.querySelectorAll('.kb-item');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(15px)'; // Reduced from 30px
    el.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out'; // Faster: 200ms
    scrollObserver.observe(el);
  });
  
  // ============================================
  // SMOOTH FADE + PARALLAX FOR HERO TITLES
  // ============================================
  // Hero titles already have CSS animations, but we add scroll parallax
  const heroTitles = document.querySelectorAll('.section-title');
  heroTitles.forEach(title => {
    window.addEventListener('scroll', () => {
      const rect = title.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const parallaxOffset = (window.innerHeight - rect.top) * 0.1;
        title.style.transform = `translateY(${parallaxOffset}px)`;
      }
    }, { passive: true });
  });
  
  // ============================================
  // 3D TILT EFFECT FOR BENTO CARDS (ENHANCED)
  // ============================================
  const cards = document.querySelectorAll('.bento-card, .kb-item');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      // Subtle 3D tilt with perspective
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.01)`;
      this.style.transition = 'none';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.transition = 'transform 0.5s ease-out';
    });
  });
  
  // ============================================
  // BUTTON GLOW & RIPPLE EFFECTS
  // ============================================
  const buttons = document.querySelectorAll('.submit-btn, .filter-btn, .social-btn');
  
  buttons.forEach(button => {
    // Ripple effect on click
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
        width: 100px;
        height: 100px;
        left: ${e.clientX - this.getBoundingClientRect().left - 50}px;
        top: ${e.clientY - this.getBoundingClientRect().top - 50}px;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleAnimation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // ============================================
  // KNOWLEDGE BASE FILTER ANIMATION (ENHANCED)
  // ============================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const kbItems = document.querySelectorAll('.kb-item');

  if (filterButtons.length > 0 && kbItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active state with animation
        filterButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.style.transform = 'scale(1)';
        });
        this.classList.add('active');
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 150);
        
        const filter = this.getAttribute('data-filter');
        
        // Filter items with fade animation
        kbItems.forEach((item, index) => {
          const itemCategory = item.getAttribute('data-category');
          
          if (filter === 'all' || itemCategory === filter) {
            setTimeout(() => {
              item.style.opacity = '0';
              item.style.transform = 'translateY(20px)';
              item.classList.remove('hidden');
              requestAnimationFrame(() => {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
              });
            }, index * 30);
          } else {
            item.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
              item.classList.add('hidden');
            }, 200);
          }
        });
      });
    });
  }
  
  // ============================================
  // ENHANCED CONTACT FORM ANIMATIONS
  // ============================================
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
  
  formInputs.forEach(input => {
    // Focus animation with glow
    input.addEventListener('focus', function() {
      this.parentElement.style.transform = 'scale(1.01)';
      this.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'scale(1)';
    });
    
    // Input validation visual feedback
    input.addEventListener('input', function() {
      if (this.value) {
        this.style.borderColor = 'var(--accent)';
      }
    });
  });
  
  // Form submission with animations
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      
      // Get form data
      const name = this.querySelector('#name').value;
      const email = this.querySelector('#email').value;
      const subject = this.querySelector('#subject').value;
      const message = this.querySelector('#message').value;
      
      // Create mailto link with form data
      const mailtoLink = `mailto:itszakariya0@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      // Animate button
      submitBtn.textContent = 'Opening Email...';
      submitBtn.style.transform = 'scale(0.95)';
      submitBtn.disabled = true;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message
      setTimeout(() => {
        submitBtn.textContent = 'Email Opened! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #3b82f6 100%)';
        submitBtn.style.transform = 'scale(1)';
        
        // Reset form
        setTimeout(() => {
          this.reset();
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 2000);
      }, 500);
    });
  }
  
  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ============================================
  // SCROLL-BASED MOTION BLUR (Subtle)
  // ============================================
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    document.body.classList.add('scrolling');
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      document.body.classList.remove('scrolling');
    }, 150);
  }, { passive: true });
  
  // ============================================
  // CURSOR GLOW EFFECT - REMOVED
  // Now using unified cursor system in main.js
  // ============================================

  // ============================================
  // MOTION GRAPHICS - ENHANCED ANIMATIONS
  // ============================================

  // Split Text Animation - Character by character reveal
  function splitTextAnimation(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      const text = element.textContent;
      element.innerHTML = '';
      element.classList.add('split-text');

      [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${index * 0.03}s`;
        element.appendChild(span);
      });
    });
  }

  // Word-by-word animation
  function wordAnimation(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      const words = element.textContent.split(' ');
      element.innerHTML = '';
      element.classList.add('word-animate');

      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word;
        span.style.animationDelay = `${index * 0.08}s`;
        element.appendChild(span);

        // Add space after word (except last)
        if (index < words.length - 1) {
          element.appendChild(document.createTextNode(' '));
        }
      });
    });
  }

  // Counter Animation - Animate numbers from 0 to target
  function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-counter'));
      const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
      const suffix = counter.getAttribute('data-suffix') || '';
      const prefix = counter.getAttribute('data-prefix') || '';

      let start = 0;
      const increment = target / (duration / 16);

      const updateCounter = () => {
        start += increment;
        if (start < target) {
          counter.textContent = prefix + Math.floor(start) + suffix;
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = prefix + target + suffix;
        }
      };

      // Start when in view
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      counterObserver.observe(counter);
    });
  }

  // Page Transition Effect
  function initPageTransitions() {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    document.body.appendChild(overlay);

    // Handle internal links
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');

      // Skip external links, anchors, and downloads
      if (!href ||
          href.startsWith('#') ||
          href.startsWith('http') ||
          href.startsWith('mailto') ||
          link.hasAttribute('download') ||
          link.hasAttribute('target')) {
        return;
      }

      link.addEventListener('click', (e) => {
        e.preventDefault();

        // Trigger exit animation
        overlay.classList.add('active');

        setTimeout(() => {
          window.location.href = href;
        }, 600);
      });
    });

    // Entry animation on page load
    window.addEventListener('load', () => {
      overlay.classList.add('exit');
      setTimeout(() => {
        overlay.classList.remove('active', 'exit');
      }, 600);
    });
  }

  // Scroll Parallax Effect
  function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg, [data-parallax]');

    if (parallaxElements.length === 0) return;

    function updateParallax() {
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
        const rect = element.getBoundingClientRect();
        const scrolled = window.pageYOffset;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const yPos = -(scrolled * speed);
          element.style.transform = `translateY(${yPos}px)`;
        }
      });
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();
  }

  // Staggered Card Entrance
  function initStaggeredEntrance() {
    const cards = document.querySelectorAll('.bento-card, .kb-item');

    cards.forEach((card, index) => {
      card.classList.add('stagger-enter');
      card.style.animationDelay = `${index * 0.1}s`;
    });

    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '-50px' });

    cards.forEach(card => staggerObserver.observe(card));
  }

  // Magnetic Button Effect
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.social-btn, .submit-btn, .filter-btn');

    buttons.forEach(btn => {
      btn.classList.add('magnetic-btn');

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // Scroll-based transforms
  function initScrollTransforms() {
    const rotateElements = document.querySelectorAll('.rotate-on-scroll');
    const scaleElements = document.querySelectorAll('.scale-on-scroll');
    const blurElements = document.querySelectorAll('.blur-on-scroll');

    function updateTransforms() {
      const scrolled = window.pageYOffset;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrolled / maxScroll;

      rotateElements.forEach(el => {
        el.style.transform = `rotate(${scrollPercent * 360}deg)`;
      });

      scaleElements.forEach(el => {
        const scale = 1 + (scrollPercent * 0.5);
        el.style.transform = `scale(${scale})`;
      });

      blurElements.forEach(el => {
        const blur = scrollPercent * 10;
        el.style.filter = `blur(${blur}px)`;
      });
    }

    window.addEventListener('scroll', updateTransforms, { passive: true });
  }

  // Hero text animation on load
  function initHeroAnimation() {
    const heroTitle = document.querySelector('.card-profile h1');
    const heroDescription = document.querySelector('.card-profile .text-muted');

    if (heroTitle) {
      // Animate hero title with character reveal
      setTimeout(() => {
        splitTextAnimation('.card-profile h1');
      }, 300);
    }

    if (heroDescription) {
      // Animate description with word reveal
      setTimeout(() => {
        wordAnimation('.card-profile .text-muted');
      }, 800);
    }
  }

  // Tech stack stagger animation
  function initTechStackAnimation() {
    const techItems = document.querySelectorAll('.tech-item');

    techItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px) scale(0.8)';

      setTimeout(() => {
        item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0) scale(1)';
      }, 1000 + (index * 100));
    });
  }

  // Animated Skill Bars
  function initSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');

    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const width = fill.getAttribute('data-width');
          setTimeout(() => {
            fill.style.width = width + '%';
          }, 200);
          skillObserver.unobserve(fill);
        }
      });
    }, { threshold: 0.5 });

    skillFills.forEach(fill => skillObserver.observe(fill));
  }

  // Animate certification badges on hover
  function initCertAnimations() {
    const certItems = document.querySelectorAll('.cert-item');

    certItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';

      setTimeout(() => {
        item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 1200 + (index * 150));
    });
  }

  // Stats number animation enhancement
  function initStatsAnimation() {
    const statItems = document.querySelectorAll('.stat-item');

    statItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.8)';

      setTimeout(() => {
        item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      }, 800 + (index * 100));
    });
  }

  // Initialize all motion graphics
  function initMotionGraphics() {
    // Delay to ensure DOM is ready
    setTimeout(() => {
      initHeroAnimation();
      initTechStackAnimation();
      initSkillBars();
      initCertAnimations();
      initStatsAnimation();
      animateCounters();
      initPageTransitions();
      initParallax();
      initStaggeredEntrance();
      initMagneticButtons();
      initScrollTransforms();
    }, 100);
  }

  // Run on DOM ready
  initMotionGraphics();
  
  
  // ============================================
  // EXPERTISE CARDS FLOATING ANIMATION
  // ============================================
  const expertiseCards = document.querySelectorAll('.expertise-card');
  if (expertiseCards.length > 0) {
    // Ensure cards are visible immediately
    expertiseCards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
    
    // Add floating animation when scrolled into view
    const expertiseObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class for floating animation
          entry.target.classList.add('visible');
          expertiseObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    expertiseCards.forEach(card => {
      expertiseObserver.observe(card);
    });
  }
  
  // ============================================
  // KNOWLEDGE BASE DETAIL PAGE ANIMATIONS
  // ============================================
  // Create particles for KB detail hero
  function createKBHeroParticles() {
    const particlesContainer = document.querySelector('.kb-hero-particles');
    if (!particlesContainer) return;
    
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      particle.style.left = Math.random() * 100 + '%';
      particle.style.bottom = Math.random() * 20 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      
      const size = Math.random() * 3 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      const horizontalMove = (Math.random() - 0.5) * 200;
      particle.style.setProperty('--move-x', horizontalMove + 'px');
      
      const duration = Math.random() * 10 + 10;
      particle.style.animationDuration = duration + 's';
      particle.style.opacity = Math.random() * 0.5 + 0.3;
      
      particlesContainer.appendChild(particle);
    }
  }
  
  if (document.querySelector('.kb-detail-hero')) {
    createKBHeroParticles();
  }
  
  // Staggered text reveal for KB detail page
  const kbParagraphs = document.querySelectorAll('.kb-paragraph, .kb-section-heading');
  if (kbParagraphs.length > 0) {
    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          textObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    kbParagraphs.forEach(para => {
      textObserver.observe(para);
    });
  }
  
  // ============================================
  // SPLINE INTERACTIVE MOUSE TRACKING
  // Robot reacts to cursor movement globally - ONLY the robot moves
  // ============================================
  const viewer = document.querySelector('spline-viewer');
  
  if (viewer) {
    viewer.addEventListener('load', () => {
      const scene = viewer?.scene;
      if (!scene) return;
      
      let targetX = 0;
      let targetY = 0;
      let smoothX = 0;
      let smoothY = 0;
      
      window.addEventListener('mousemove', (e) => {
        targetX = (e.clientX / window.innerWidth) * 2 - 1;
        targetY = (e.clientY / window.innerHeight) * 2 - 1;
      }, { passive: true });
      
      function animate() {
        smoothX += (targetX - smoothX) * 0.05;
        smoothY += (targetY - smoothY) * 0.05;
        
        // Try multiple methods to find the robot object
        let robot = null;
        
        // Method 1: findObjectByName
        if (scene.findObjectByName) {
          robot = scene.findObjectByName('Robot') 
               || scene.findObjectByName('robot')
               || scene.findObjectByName('Armature')
               || scene.findObjectByName('Character');
        }
        
        // Method 2: find by name property
        if (!robot && scene.find) {
          robot = scene.find(obj => 
            obj.name === 'Robot' || 
            obj.name === 'robot' || 
            obj.name === 'Armature' ||
            obj.name === 'Character'
          );
        }
        
        // Method 3: Try first child if no name match
        if (!robot && scene.children && scene.children.length > 0) {
          robot = scene.children[0];
        }
        
        // Method 4: Try root object
        if (!robot && scene.object) {
          robot = scene.object;
        }
        
        if (robot && robot.rotation !== undefined) {
          robot.rotation.y = smoothX * 0.5;
          robot.rotation.x = smoothY * 0.3;
        }
        
        requestAnimationFrame(animate);
      }
      
      animate();
    });
  }
  
});
