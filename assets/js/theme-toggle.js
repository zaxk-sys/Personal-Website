// ============================================
// LIQUID GLASS THEME TOGGLE
// ============================================

(function() {
    'use strict';

    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const body = document.body;

    // Get saved theme or default to 'night' (since site starts dark)
    const savedTheme = localStorage.getItem('theme') || 'night';
    
    // Apply saved theme on load
    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update label
        const label = document.querySelector('.toggle-label');
        if (label) {
            label.textContent = theme === 'day' ? 'Work' : 'Sleep';
        }
    }

    // Initialize theme
    applyTheme(savedTheme);

    // Toggle function with smooth animation
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme') || 'night';
        const newTheme = currentTheme === 'day' ? 'night' : 'day';
        
        // Add transition class for smooth fade
        body.style.transition = 'background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1), color 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Apply new theme
        applyTheme(newTheme);
        
        // Remove transition after animation completes
        setTimeout(() => {
            body.style.transition = '';
        }, 600);
    }

    // Event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Optional: Add keyboard support (Space or Enter)
    if (themeToggle) {
        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }

    // Expose for external use if needed
    window.themeToggle = {
        toggle: toggleTheme,
        setTheme: applyTheme,
        getTheme: () => html.getAttribute('data-theme') || 'night'
    };
})();



