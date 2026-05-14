/* 
  PixTools - Global Scripts
  Shared utilities for dark mode, navigation, and SEO optimization.
*/

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initSearch();
    initAnimations();
    initCategories(); // ADD THIS LINE
});

/* Animation Logic */

function initAnimations() {
  // Scroll Progress Bar
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const bar = document.getElementById('scrollProgress');
    if (bar) bar.style.width = scrolled + '%';
  }, { passive: true });

  // Navbar Shadow on Scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 10
      ? '0 1px 20px rgba(0,0,0,0.2)'
      : 'none';
  }, { passive: true });

  // Tool Cards Fade Up on Scroll
  const cards = document.querySelectorAll('.tool-card');
  if (cards.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  cards.forEach(card => observer.observe(card));

  // Feature Items Fade Up
  const features = document.querySelectorAll('.feature-item');
  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 100);
        featureObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  features.forEach(f => featureObserver.observe(f));
}

/**
 * Initialize Dark/Light Theme based on localStorage or system preference
 */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (!icon) return;
    icon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
}

/**
 * Mobile navigation and other header interactions
 */
function initNavigation() {
    // Analytics placeholder
    /* 
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
    */
}

/**
 * Search functionality for tools on the homepage
 */
function initSearch() {
    const searchInput = document.getElementById('tool-search');
    const toolCards = document.querySelectorAll('.tool-card');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        toolCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(query) || desc.includes(query)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

/**
 * Utility: Format bytes to human readable format
 */
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Utility: File Download helper
 */
function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Shared Image processing utility
 */
const PixUtils = {
    /**
     * Get image dimensions
     */
    getImageDimensions: (file) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve({ width: img.width, height: img.height });
            img.src = URL.createObjectURL(file);
        });
    },

    /**
     * File to DataURL
     */
    fileToDataURL: (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    }
};



// Scroll Progress Bar
window.onscroll = function () {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  var bar = document.getElementById("scrollProgress");
  if (bar) bar.style.width = scrolled + "%";
};

// Navbar Shadow on Scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    if (window.scrollY > 10) {
      nav.style.boxShadow = '0 1px 20px rgba(0,0,0,0.2)';
    } else {
      nav.style.boxShadow = 'none';
    }
  }
});

// Upload Zone Drag Effects
document.querySelectorAll('.upload-zone').forEach(zone => {
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.classList.add('drag-over');
  });
  zone.addEventListener('dragleave', () => {
    zone.classList.remove('drag-over');
  });
  zone.addEventListener('drop', () => {
    zone.classList.remove('drag-over');
  });
});

// Download Button Success State
document.querySelectorAll('.download-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const original = this.textContent;
    this.textContent = 'Downloaded!';
    this.style.background = '#16a34a';
    this.style.transition = 'background 0.3s ease';
    setTimeout(() => {
      this.textContent = original;
      this.style.background = '';
    }, 2000);
  });
});

function initCategories() {
  const tabs = document.querySelectorAll('.cat-tab');
  const toolCards = document.querySelectorAll('.tool-card');
  const comingSoonPanel = document.getElementById('coming-soon-panel');
  const initialPanel = document.getElementById('initial-placeholder-panel');
  const toolGrid = document.querySelector('.tool-grid');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {

      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');
      const isComingSoon = tab.classList.contains('coming-soon');

      // Hide initial panel forever once a tab is clicked
      if (initialPanel) initialPanel.style.display = 'none';

      if (isComingSoon) {
        // Hide tool grid, show coming soon panel
        toolGrid.style.display = 'none';
        comingSoonPanel.style.display = 'flex';
      } else {
        // Show tool grid, hide coming soon panel
        comingSoonPanel.style.display = 'none';
        toolGrid.style.display = 'grid';

        // Filter cards by category
        toolCards.forEach(card => {
          if (card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
            // Re-trigger animation by resetting the class
            card.classList.remove('visible');
            setTimeout(() => card.classList.add('visible'), 50);
          } else {
            card.style.display = 'none';
          }
        });
      }
    });
  });
}

