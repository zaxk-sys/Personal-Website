/* ============================================
   FUTURISTIC PORTFOLIO - MAIN FUNCTIONALITY
   Theme Toggle & Core Features
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // ENHANCED THEME TOGGLE WITH SMOOTH TRANSITIONS
  // ============================================
  const themeToggle = document.querySelector('.theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  // Set initial theme before page renders to prevent flash
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
  
  // Add fade transition class to body for smooth theme switching
  document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      // Prevent multiple rapid clicks
      if (this.disabled) return;
      this.disabled = true;
      
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Add fade effect
      document.body.style.opacity = '0.8';
      
      // Switch theme after brief delay for smooth transition
      setTimeout(() => {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Restore opacity
        setTimeout(() => {
          document.body.style.opacity = '1';
          this.disabled = false;
        }, 150);
      }, 100);
      
      // Add click animation
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
    });
  }
  
  /**
   * Update theme toggle icon
   * @param {string} theme - 'dark' or 'light'
   */
  function updateThemeIcon(theme) {
    if (themeToggle) {
      // Use better icons with smooth transition
      const icon = theme === 'dark' ? '☀️' : '🌙';
      themeToggle.textContent = icon;
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }
  
  // ============================================
  // NAVBAR ACTIVE LINK INDICATOR
  // ============================================
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPage || (currentPage === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
    
    // Add hover effect
    link.addEventListener('mouseenter', function() {
      if (!this.classList.contains('active')) {
        this.style.transform = 'translateY(-2px)';
      }
    });
    
    link.addEventListener('mouseleave', function() {
      if (!this.classList.contains('active')) {
        this.style.transform = 'translateY(0)';
      }
    });
  });
  
  // ============================================
  // SMOOTH PAGE TRANSITIONS
  // ============================================
  // Add fade-in on page load
  document.body.style.opacity = '0';
  window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.5s ease-in';
    document.body.style.opacity = '1';
  });
  
  // Handle page transitions for internal links (FADE + BLUR)
  const internalLinks = document.querySelectorAll('a[href$=".html"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      // Only apply transition if it's an internal link
      if (href && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('#')) {
        e.preventDefault();
        document.body.classList.add('page-transition-out');
        
        setTimeout(() => {
          window.location.href = href;
        }, 400);
      }
    });
  });
  
  // Add fade-in animation on page load
  window.addEventListener('load', () => {
    document.body.classList.add('page-transition-in');
  });
  
});

