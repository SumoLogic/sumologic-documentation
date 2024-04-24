---
id: service-alerts-scheduled-search-email-quota-reached
---

# Service Alert: Scheduled Search Email Quota Reached for Search

Why do I receive the following email?

```
From: Sumo Logic [mailto:service@sumologic.com]

Sent: Saturday, October 18, 2014 11:01 PM

To: <YOUR_EMAIL>

Subject: Service Alert: Scheduled Search Email Quota Reached for search

The Sumo Logic service has detected that 100% of your allowed quota of email notifications for scheduled search named has been used. No more email notifications will be sent for this search.

Regards,
The Sumo Logic Team
```

Sumo Logic implements an email quota allowing 120 emails to be sent per day per scheduled search. The purpose of this limit is set to prevent service.sumologic.com from spamming an inbox. This is documented in [Scheduled Searches](/docs/alerts/scheduled-searches/receive-email-alerts.md). 

The above quota assumes that no more than 5 Alert emails will be triggered per hour or an alert every 12 minutes on average. Sumo Logic expects that Alerts are used as an exception and it is unlikely to find email Alerts being sent at a rate higher than 5 emails per hour.
