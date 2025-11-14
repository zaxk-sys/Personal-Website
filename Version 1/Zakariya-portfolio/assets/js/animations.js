/* ============================================
   FUTURISTIC PORTFOLIO - ENHANCED ANIMATIONS
   Micro-animations, 3D effects, and scroll animations
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // NAVBAR SCROLL EFFECT WITH SMOOTH TRANSITION
  // ============================================
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  let ticking = false;
  
  function updateNavbar() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
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
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
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
    observer.observe(el);
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
  // 3D TILT EFFECT FOR PROJECT/KB CARDS (ENHANCED)
  // ============================================
  const cards = document.querySelectorAll('.project-card, .kb-item');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      // Enhanced 3D tilt with perspective
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
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
  const buttons = document.querySelectorAll('.btn, .submit-btn, .filter-btn, .theme-toggle');
  
  buttons.forEach(button => {
    // Ripple effect on click
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
    
    // Glow effect on hover
    button.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
      if (this.classList.contains('btn-primary')) {
        this.style.boxShadow = '0 0 30px rgba(0, 245, 255, 0.6), 0 0 60px rgba(0, 245, 255, 0.3)';
      } else if (this.classList.contains('btn-secondary')) {
        this.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.5)';
      }
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
    });
  });
  
  // ============================================
  // KNOWLEDGE BASE FILTER ANIMATION (ENHANCED)
  // ============================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const kbItems = document.querySelectorAll('.kb-item');
  
  if (filterButtons.length > 0 && kbItems.length > 0) {
    // Initial reveal animation for KB items
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 50);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    kbItems.forEach(item => {
      revealObserver.observe(item);
    });
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active state with animation
        filterButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.style.transform = 'scale(1)';
        });
        this.classList.add('active');
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 200);
        
        const filter = this.getAttribute('data-filter');
        
        // Animate items with stagger
        kbItems.forEach((item, index) => {
          const itemCategory = item.getAttribute('data-category');
          
          if (filter === 'all' || itemCategory === filter) {
            setTimeout(() => {
              item.classList.remove('hidden');
              item.classList.add('visible');
            }, index * 30);
          } else {
            item.classList.add('hidden');
            item.classList.remove('visible');
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
      this.parentElement.style.transform = 'scale(1.02)';
      this.parentElement.style.transition = 'transform 0.3s ease';
      this.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.3)';
      this.style.borderColor = 'var(--neon-cyan)';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'scale(1)';
      if (!this.value) {
        this.style.boxShadow = '';
        this.style.borderColor = 'rgba(0, 245, 255, 0.2)';
      }
    });
    
    // Input validation visual feedback
    input.addEventListener('input', function() {
      if (this.value) {
        this.style.borderColor = 'var(--neon-cyan)';
        this.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.2)';
      }
    });
  });
  
  // Form submission (already handled, keeping for reference)
  const contactForm = document.querySelector('.contact-form form');
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
      
      // Animate button with pulse
      submitBtn.textContent = 'Opening Email...';
      submitBtn.style.opacity = '0.7';
      submitBtn.disabled = true;
      submitBtn.style.animation = 'pulse 1s ease-in-out infinite';
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message
      setTimeout(() => {
        submitBtn.textContent = 'Email Client Opened! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #00FF88 0%, #00F5FF 100%)';
        submitBtn.style.animation = 'none';
        
        // Reset form
        setTimeout(() => {
          this.reset();
          submitBtn.textContent = originalText;
          submitBtn.style.opacity = '1';
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
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
  // PERFECT CURSOR GLOW EFFECT (Desktop Only)
  // Perfectly aligned, smooth, minimal
  // ============================================
  let cursorGlow = document.querySelector('.cursor-glow');
  if (!cursorGlow && window.innerWidth > 768) {
    cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
      position: fixed;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 245, 255, 0.5) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: width 0.15s ease-out, height 0.15s ease-out, transform 0.15s ease-out;
      display: block;
      mix-blend-mode: screen;
      will-change: transform;
      left: 0;
      top: 0;
    `;
    document.body.appendChild(cursorGlow);
    
    // Perfect cursor alignment - direct tracking with minimal lag
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    }, { passive: true });
    
    // Subtle scale-up on hover over clickable elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .kb-item, .btn, .expertise-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorGlow.style.width = '24px';
        cursorGlow.style.height = '24px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 245, 255, 0.7) 0%, transparent 70%)';
      });
      
      el.addEventListener('mouseleave', () => {
        cursorGlow.style.width = '12px';
        cursorGlow.style.height = '12px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 245, 255, 0.5) 0%, transparent 70%)';
      });
    });
  }
  
  
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
