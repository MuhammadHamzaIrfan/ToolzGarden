/* 
  ToolzGarden - Global Scripts
  Shared utilities for dark mode, navigation, and SEO optimization.
*/

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initSearch();
    initAnimations();
    initCategories(); 

    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
      });

      // Close menu when link clicked
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navLinks.classList.remove('open');
        });
      });

      // Close menu when clicked outside
      document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('open');
        }
      });
    }

    // ===== SCROLL REVEAL ANIMATION =====
    function initScrollReveal() {

      // Add reveal class to all target elements
      const selectors = [
        '.tool-card',
        '.feature-item',
        '.faq-item',
        '.category-tabs',
        '.section-title',
        '.footer-brand',
        '.footer-links',
        '.tool-description',
        '.related-tools',
        '.preview-container',
        '.controls-card',
        '.upload-area',
        '.why-section',
        '.stats-section',
        'h2',
        '.badge-private'
      ];

      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          if (!el.classList.contains('hero-animate')) {
            el.classList.add('reveal');
          }
        });
      });

      // Add stagger delays to tool cards
      document.querySelectorAll('.tool-card').forEach((card, i) => {
        const delay = (i % 3) * 0.1;
        card.style.transitionDelay = `${delay}s`;
      });

      // Add stagger delays to feature items
      document.querySelectorAll('.feature-item').forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.1}s`;
      });

      // Add stagger delays to footer links
      document.querySelectorAll('.footer-links').forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.1}s`;
      });

      // IntersectionObserver for scroll reveal
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      });

      // Observe all reveal elements
      document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
      });
    }

    initScrollReveal();
});

/**
 * ==========================================
 * ADVERTISEMENT CONFIGURATION
 * ==========================================
 * Easily replace the empty strings below with your ad network codes.
 * Example: 
 * adTopBanner: '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXX" crossorigin="anonymous"></script><ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-XXX" data-ad-slot="YYY"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>'
 */
const AdConfig = {
    leftAd: `<script>
  atOptions = {
    'key' : 'e6057e5f17147ecf971a199d41a59d5c',
    'format' : 'iframe',
    'height' : 600,
    'width' : 160,
    'params' : {}
  };
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/e6057e5f17147ecf971a199d41a59d5c/invoke.js"></script>`,           
    rightAd: `<script>
  atOptions = {
    'key' : 'e6057e5f17147ecf971a199d41a59d5c',
    'format' : 'iframe',
    'height' : 600,
    'width' : 160,
    'params' : {}
  };
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/e6057e5f17147ecf971a199d41a59d5c/invoke.js"></script>`,          
    nativeAd: `<script async="async" data-cfasync="false" src="https://pl29466896.effectivecpmnetwork.com/c9d45fde88457f3b282a3791a75b5290/invoke.js"></script>
<div id="container-c9d45fde88457f3b282a3791a75b5290"></div>`
};

async function initAds() {
    // Helper to safely execute scripts injected via innerHTML sequentially
    const injectHTMLWithScripts = async (container, htmlString) => {
        container.innerHTML = '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;
        
        for (const node of Array.from(tempDiv.childNodes)) {
            if (node.tagName && node.tagName.toLowerCase() === 'script') {
                await new Promise(resolve => {
                    const newScript = document.createElement('script');
                    Array.from(node.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                    newScript.text = node.textContent; // Use textContent for scripts
                    
                    if (newScript.src) {
                        newScript.onload = newScript.onerror = resolve;
                    } else {
                        setTimeout(resolve, 0);
                    }
                    container.appendChild(newScript);
                });
            } else {
                container.appendChild(node.cloneNode(true));
            }
        }
    };

    // 1. Sidebar Ads
    const renderSidebarAd = async (sideClass, htmlContent) => {
        const adContainers = document.querySelectorAll(sideClass + ' .modern-ad-placeholder, ' + sideClass + ' [id^="left-ad"], ' + sideClass + ' [id^="right-ad"]');
        for (const adContainer of Array.from(adContainers)) {
            if (htmlContent.trim() !== '' && !htmlContent.includes('Paste Adsterra')) {
                adContainer.classList.remove('modern-ad-placeholder');
                adContainer.style.border = 'none';
                adContainer.style.background = 'transparent';
                await injectHTMLWithScripts(adContainer, htmlContent);
            } else {
                // Graceful collapse if blocked or empty
                adContainer.style.minHeight = '0';
            }
        }
    };

    await renderSidebarAd('.left-side-ad', AdConfig.leftAd);
    await renderSidebarAd('.right-side-ad', AdConfig.rightAd);

    // 2. Native Ad (Homepage, About, Contact)
    let nativeTarget = document.querySelector('.category-tabs'); // Homepage
    let insertMethod = 'afterend';

    // Target About, Contact, and Tool pages specifically
    if (!nativeTarget) {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('about') || path.includes('contact')) {
            nativeTarget = document.querySelector('main.center-main-content');
            insertMethod = 'beforeend';
        } else if (path.includes('/tools/')) {
            nativeTarget = document.querySelector('.tool-layout');
            insertMethod = 'afterend';
        }
    }

    if (nativeTarget && AdConfig.nativeAd.trim() !== '' && !AdConfig.nativeAd.includes('Paste Adsterra')) {
        const nativeWrapper = document.createElement('div');
        nativeWrapper.className = 'native-ad-wrapper';
        nativeTarget.insertAdjacentElement(insertMethod, nativeWrapper);
        await injectHTMLWithScripts(nativeWrapper, AdConfig.nativeAd);
    }
}

// Performance Safety: Delay ad injection until entire page and resources have loaded
window.addEventListener('load', initAds);

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
  if (cards.length > 0) {
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
  }

  // Feature Items Fade Up
  const features = document.querySelectorAll('.feature-item');
  if (features.length > 0) {
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

    // Highlight active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
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

// Responsive Code

/* ===== SCROLL REVEAL ANIMATION FIX ===== */
/* Paste this at the bottom of your script.js file */

document.addEventListener('DOMContentLoaded', () => {

  // Add reveal class directly to all target elements
  const revealSelectors = [
    '.tool-card',
    '.feature-item', 
    '.faq-item',
    '.category-tabs',
    '.section-title',
    '.footer-brand',
    '.footer-links',
    '.controls-card',
    '.tool-description',
    '.coming-soon-panel'
  ];

  revealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger delay for cards
      if (selector === '.tool-card') {
        el.style.transitionDelay = `${(i % 4) * 0.08}s`;
      }
      if (selector === '.feature-item') {
        el.style.transitionDelay = `${i * 0.1}s`;
      }
      if (selector === '.footer-links' || selector === '.footer-brand') {
        el.style.transitionDelay = `${i * 0.1}s`;
      }
    });
  });

  // IntersectionObserver
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
  });

  // Observe all reveal elements
  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

});