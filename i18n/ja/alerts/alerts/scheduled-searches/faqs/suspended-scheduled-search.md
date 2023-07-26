---
id: suspended-scheduled-search
---

# What Happens When a Scheduled Search Is Suspended?

If you have received an Alert Email from Sumo Logic stating that an issue has been detected with a Scheduled Search, it might not be immediately apparent why your Scheduled Search has failed, and may even be suspended. The Scheduled Search referred to in the email may be one that has run for months without a problem, but now for some reason, it fails.

First, we recommend that you review the scheduled search. (Just click the link at the bottom of the email.) It could be that there's an easy-to-spot typo. Or perhaps an operator is being used improperly. See [how to prevent your scheduled search from failing](/docs/alerts/scheduled-searches/faq#why-would-a-scheduled-search-fail).

## Why was my Scheduled Search suspended?

Scheduled Searches must run within the limits of a [timeout period](prevent-scheduled-search-timing-out.md), which can be 20 minutes to an hour, depending on the time range set for the query. If for some reason, a Scheduled Search cannot complete within the confines of the timeout period, such as connectivity problems or heavy load, the query will timeout and fail.

When a Scheduled Search query fails Sumo Logic attempts to run the query again a few more times. If all attempts fail the scheduled search is temporarily or permanently suspended depending on the issue detected. The owner of the scheduled search will receive an email alert with details of the suspension including the reason.

The [Audit Index](/docs/manage/security/audit-index.md) stores events on your scheduled search events.

## Examples of Scheduled Search suspensions

### Temporary suspension

The following is an example of a temporary suspension email:

![suspension email.png](/img/alerts/suspension-email.png)

The [Audit Index](/docs/manage/security/audit-index.md) stores events on your scheduled search events. The following is an example of a temporary suspension log:   

![temp sus.png](/img/alerts/temp-sus.png)

### Permanent suspension

The following is an example of a permanent suspension email:  

![permanent sus.png](/img/alerts/permanentsus.png)

The [Audit Index](/docs/manage/security/audit-index.md) stores events on your scheduled search events. The following is an example of a permanent suspension log:

![perm sus.png](/img/alerts/perm-sus.png)

### How long will the Scheduled Search be suspended?  

The suspended state of the Scheduled Search lasts for four hours for non-daily searches (for example, searches recurring every 15 minutes, every 1 hour, etc.) and for up to an extra day for a daily search (two failed executions on two days and skips the third day).

Once the suspension period is over, the Scheduled Search will resume normal operation after four hours (for non-daily scheduled searches) or on the fourth day for a daily Scheduled Search.

Permanent suspensions last forever. You need to create a new scheduled search. 

### How can I troubleshoot the failure?

For complete details, see [Why Would a Scheduled Search Fail?](/docs/alerts/scheduled-searches/faq#why-would-a-scheduled-search-fail).

### Reactivate a Suspended Scheduled Search

If you would like to reactivate the Scheduled Search immediately without waiting for the suspension time out period, you can edit the Scheduled Search and change the **Run Frequency** from **Never** back to the desired frequency. This will reactivate the Scheduled Search immediately. If the cause of the failure was a temporary high load on the system or some other connectivity issue, the Scheduled Search should run properly. But if the root cause is still unknown, it may fail again.

### What else can I do?

For assistance with Scheduled Search issues, contact [Sumo Logic Support](https://support.sumologic.com/hc/en-us). 
