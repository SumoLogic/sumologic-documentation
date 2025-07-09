/**
 * Docusaurus client-module:
 *   – executed only in the browser
 *   – loaded once per page load
 */
function addListener(btn) {
  if (btn.__trialHooked) return;          // already wired
  btn.__trialHooked = true;

  btn.addEventListener('click', () => {
    /* Generic conversion event – *no* search context required   */
    fetch('https://insights.algolia.io/1/events', {
      method:  'POST',
      headers: {
        'Content-Type':           'application/json',
        'X-Algolia-API-Key':      'fb2f4e1fb40f962900631121cb365549',
        'X-Algolia-Application-Id':'2SJPGMLW1Q',
      },
      body: JSON.stringify({
        events: [{
          eventName: 'Start Trial Button Clicked',
          eventType: 'conversion',
          index:     'crawler_sumodocs',
          objectIDs: ['free-trial-click'],   // dummy objectID
          userToken: 'anonymous-user',
        }],
      }),
    })
    .then(r => r.ok ? r.json() : Promise.reject(r))
    .then(b => console.log('✅ Algolia Insights', b))
    .catch(e => console.error('❌ Algolia error', e));
  });

  console.log('▶ trackTrialClick: wired');
}

/* ---------- retry helper ---------- */
function waitForButton(retries = 20) {
  const btn = document.querySelector('a.header-trial');   // <a class="header-trial">
  if (btn) return addListener(btn);

  if (retries > 0) {
    return setTimeout(() => waitForButton(retries - 1), 300);
  }
  console.warn('trackTrialClick: free-trial button not found');
}

/* run after the first page load */
export function onClientEntry() {
  waitForButton();
}

/* run after every client-side navigation (e.g. clicking a doc link) */
export function onRouteDidUpdate() {
  waitForButton();
}
