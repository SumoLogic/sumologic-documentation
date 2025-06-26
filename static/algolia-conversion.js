document.addEventListener('DOMContentLoaded', function () {
  const trialBtn = document.querySelector('a.header-trial[href*="sumologic.com/sign-up"]');
  if (typeof aa === 'function' && trialBtn) {
    trialBtn.addEventListener('click', function () {
      // Google Analytics event
      gtag('event', 'free_trial_click');

      // Algolia conversion event
      aa('convertedObjectIDs', {
        index: 'crawler_sumodocs',
        eventName: 'free_trial_click',
        objectIDs: ['start-free-trial'],
      });
    });
  }
});
