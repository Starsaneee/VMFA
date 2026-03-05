/**
 * VMFA — Virginia Museum of Fine Arts
 * script.js
 * Handles page routing, nav highlighting, mobile menu,
 * exhibition filtering, and scroll effects.
 */

// ============================================================
// SPA Page Routing
// ============================================================

/**
 * showPage — switches the visible "page" and updates nav state
 * @param {string} pageId - ID of the page to show
 */
function showPage(pageId) {
  // Hide all pages
  const allPages = document.querySelectorAll('.page');
  allPages.forEach(function(p) {
    p.classList.remove('active');
  });

  // Show the target page
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
  }

  // Update nav link active states
  const navLinks = document.querySelectorAll('nav a[data-page]');
  navLinks.forEach(function(link) {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    }
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// Mobile Navigation
// ============================================================

/**
 * openMobileNav — opens the fullscreen mobile nav overlay
 */
function openMobileNav() {
  const nav = document.getElementById('mobileNav');
  if (nav) {
    nav.classList.add('open');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }
}

/**
 * closeMobileNav — closes the fullscreen mobile nav overlay
 */
function closeMobileNav() {
  const nav = document.getElementById('mobileNav');
  if (nav) {
    nav.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ============================================================
// Exhibition Filter Tabs
// ============================================================

/**
 * filterExhibitions — filters the exhibit rows by status
 * @param {string} filter - 'all', 'current', or 'upcoming'
 * @param {HTMLElement} btn - the clicked tab button
 */
function filterExhibitions(filter, btn) {
  // Update active tab styling
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(function(tab) {
    tab.classList.remove('active');
  });
  if (btn) {
    btn.classList.add('active');
  }

  // Show/hide exhibit rows based on filter
  const rows = document.querySelectorAll('.exhibit-row');
  rows.forEach(function(row) {
    var status = row.getAttribute('data-status');
    if (filter === 'all') {
      row.classList.remove('hidden');
    } else if (filter === status) {
      row.classList.remove('hidden');
    } else {
      row.classList.add('hidden');
    }
  });
}

// ============================================================
// Sticky Header Scroll Behavior
// ============================================================

/**
 * handleScroll — adds/removes a 'scrolled' class on the header
 * for shadow emphasis when the user scrolls down
 */
function handleScroll() {
  var header = document.getElementById('site-header');
  if (!header) return;

  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// ============================================================
// Smooth Card Reveal on Scroll
// ============================================================

/**
 * revealOnScroll — uses IntersectionObserver to animate elements
 * into view as the user scrolls down the page
 */
function revealOnScroll() {
  // Only run if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) return;

  var observeTargets = document.querySelectorAll(
    '.event-card, .artist-card, .collection-tile, .exhibit-row, .visit-card'
  );

  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); // animate once only
        }
      });
    },
    { threshold: 0.1 }
  );

  observeTargets.forEach(function(el) {
    el.classList.add('pre-reveal');
    observer.observe(el);
  });
}

// ============================================================
// Dynamic Today's Hours
// ============================================================

/**
 * updateTodaysHours — checks the current day of the week and
 * updates any element with class "todays-hours-display"
 * to reflect VMFA's actual schedule
 */
function updateTodaysHours() {
  var hoursMap = {
    0: '10 am – 5 pm',  // Sunday
    1: '10 am – 5 pm',  // Monday
    2: '10 am – 9 pm',  // Tuesday
    3: '10 am – 9 pm',  // Wednesday
    4: '10 am – 9 pm',  // Thursday
    5: '10 am – 9 pm',  // Friday
    6: '10 am – 5 pm'   // Saturday
  };

  var today = new Date().getDay();
  var todaysHours = hoursMap[today];

  // Update any span that has the class "todays-hours-display"
  var displays = document.querySelectorAll('.todays-hours-display');
  displays.forEach(function(el) {
    el.textContent = todaysHours;
  });
}

// ============================================================
// Event Listener Setup
// ============================================================

document.addEventListener('DOMContentLoaded', function() {

  // Mobile menu buttons
  var menuBtn = document.getElementById('menuBtn');
  var menuClose = document.getElementById('menuClose');

  if (menuBtn) {
    menuBtn.addEventListener('click', openMobileNav);
  }

  if (menuClose) {
    menuClose.addEventListener('click', closeMobileNav);
  }

  // Close mobile nav when pressing Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMobileNav();
    }
  });

  // Scroll listener for header effect
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Initialize scroll reveal
  revealOnScroll();

  // Initialize today's hours
  updateTodaysHours();

  // Ensure home page is shown by default
  showPage('home');

  console.log('VMFA site initialized.');
});