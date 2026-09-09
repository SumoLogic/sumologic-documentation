/**
 * Fix for Docusaurus anchor link double-click issue
 *
 * Completely intercepts anchor link clicks and handles scrolling manually
 * with proper offset for the fixed navbar.
 */

function getNavbarHeight() {
  const navbar = document.querySelector('.navbar');
  return navbar ? navbar.offsetHeight : 60;
}

function scrollToAnchor(targetId) {
  const element = document.getElementById(targetId);
  if (!element) return;

  const navbarHeight = getNavbarHeight();
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - navbarHeight - 16; // navbar height + 16px padding

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

function handleAnchorClick(event) {
  const link = event.target.closest('a[href^="#"], a[href*="#"]');
  if (!link) return;

  const href = link.getAttribute('href');
  if (!href || !href.includes('#')) return;

  // Get the hash part
  let hash;
  if (href.startsWith('#')) {
    hash = href;
  } else {
    const url = new URL(link.href);
    // Only handle same-page anchors
    if (url.pathname !== window.location.pathname) return;
    hash = url.hash;
  }

  if (!hash) return;

  // Prevent default behavior
  event.preventDefault();

  const targetId = decodeURIComponent(hash.substring(1));

  // Update URL without triggering scroll
  if (window.history.pushState) {
    window.history.pushState(null, null, hash);
  } else {
    window.location.hash = hash;
  }

  // Scroll to element with offset
  requestAnimationFrame(() => {
    scrollToAnchor(targetId);
  });
}

export function onClientEntry() {
  // Intercept all clicks on anchor links
  document.addEventListener('click', handleAnchorClick, true);

  // Handle initial page load with hash
  if (window.location.hash) {
    setTimeout(() => {
      const targetId = decodeURIComponent(window.location.hash.substring(1));
      scrollToAnchor(targetId);
    }, 100);
  }
}

export function onRouteDidUpdate({ location }) {
  // Handle hash on route changes
  if (location.hash) {
    setTimeout(() => {
      const targetId = decodeURIComponent(location.hash.substring(1));
      scrollToAnchor(targetId);
    }, 100);
  }
}
