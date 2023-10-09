---
id: restart-collectors
title: Restart a Collector (Beta)
description: Learn how to restart a Collector from the Collection page.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

This feature is in Beta. To participate, contact your Sumo Logic account executive.

This document explains how to initiate a request to restart an Installed
Collector from the Collection page. The other option is to [start or stop a Collector using our provided scripts](start-stop-collector-using-scripts.md).

## Limitations

* When you confirm and click the Proceed button to restart a Collector do not refresh the web page. Refreshes could result in:
  * missing status notifications such as error and success. The status request is only made by the initial session of the browser.
  * the restart not initiating. In this case, you will have to request the restart again.
* A **timeout error** notification doesn't indicate the restart failed. It may still be processing the restart and needs more time.
* You cannot request restarts within five minutes of one another.
* Requires version 19.375-4.

## Failure scenarios

You cannot restart a Collector if:

* A restart is already in progress.
* A software upgrade or downgrade is in progress.
* A restart was triggered within the past five minutes.
* The Collector version does not support restarts.
* The Collector is not running or [offline](/docs/send-data/installed-collectors).
* The requesting user does not have the necessary privileges to perform a restart. 

## Restart a Collector

To restart your Installed Collector in the Sumo Logic platform:

1. Open the Collection page, go to **Manage Data** > **Collection** > **Collection**.
1. Find the Installed Collector and click the information icon on the right of the row.
1. The **API usage information** popup is displayed. Click the **Restart Collector** button on the bottom left.<br/>   ![restart collector button.png](/img/collector/restart-collector-button.png)
1. Click **Confirm **to send the restart request.<br/>   ![restart confirmation.png](/img/collector/restart-confirmation.png)
1. The bottom left of the platform will provide a notification informing you the request was successful.<br/>   ![restart initiated.png](/img/collector/restart-initiated.png)
1. A few minutes later another notification is provided, either **restarted successfully** or **restart request timeout**. Do not refresh the web page, see the [limitations](#limitations) section above for details.

## Audit restarts

The [Audit Event Index](/docs/manage/security/audit-event-index.md) keeps
records of restart requests with the `getCollectorRestartRequested` event and restart completions with the `getCollectorRestartCompleted` event. The following is a simple [Search](/docs/search) query that returns these event logs:

```sql
_index=sumologic_audit_events _sourceCategory=collection
| where eventName matches /^CollectorRestart/
```

Installed Collectors store log events in its installation directory under the '**/logs**' directory. These logs are useful when troubleshooting collector issues.

### Restart Complete Event Log

```json
{
    "requestId": "COLLECTOR-RESTART:0000000006763518:1634662788016",
    "operator": {
        "email": "sales@sumologic.com",
        "id": "000000000B28AA8B",
        "interface": "UI",
        "sessionId": "7euc2az151mgedrglvik1",
        "sourceIp": "54.177.50.196",
        "type": "UserContext"
    },
    "collectorIdentity": {
        "collectorId": "0000000006763518",
        "collectorName": "sumologic"
    },
    "status": "SUCCESS",
    "collectorVersion": "19.361-8",
    "accountId": "000000000B02681B",
    "eventId": "96dc3560-13cc-4ac2-b629-d1d768d69b4d",
    "eventName": "CollectorRestartCompleted",
    "eventTime": "2021-10-19T17:00:18.748Z",
    "eventFormatVersion": "1.0",
    "subsystem": "collection"
}
```

### Restart Request Event Log

```json
{
    "requestId": "COLLECTOR-RESTART:0000000006763518:1634662772568",
    "operator": {
        "email": "sales@sumologic.com",
        "id": "000000000B28AA8B",
        "interface": "UI",
        "sessionId": "7euc2az151mgedrglvik1",
        "sourceIp": "54.177.50.196",
        "type": "UserContext"
    },
    "collectorIdentity": {
        "collectorId": "0000000006763518",
        "collectorName": "sumologic"
    },
    "collectorVersion": "19.361-8",
    "accountId": "000000000B02681B",
    "eventId": "19203380-8cb3-41e0-8e56-8c9c6ba2a616",
    "eventName": "CollectorRestartRequested",
    "eventTime": "2021-10-19T16:59:32.587Z",
    "eventFormatVersion": "1.0",
    "subsystem": "collection"
}
```
