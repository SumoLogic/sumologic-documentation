(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const trialBtn = document.querySelector('.header-trial');

    if (!trialBtn) return;

    trialBtn.addEventListener('click', () => {
      fetch('https://insights.algolia.io/1/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Algolia-API-Key': 'fb2f4e1fb40f962900631121cb365549',
          'X-Algolia-Application-Id': '2SJPGMLW1Q'
        },
        body: JSON.stringify({
          events: [
            {
              eventName: 'Start Free Trial Clicked',
              eventType: 'conversion',
              index: 'crawler_sumodocs',
              objectIDs: ['trial-button-static'], // static dummy ID
              userToken: 'docusaurus-user'
            }
          ]
        })
      })
        .then(res => res.json())
        .then(console.log)
        .catch(console.error);
    });
  });
})();
