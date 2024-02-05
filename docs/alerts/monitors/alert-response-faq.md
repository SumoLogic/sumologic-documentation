---
id: alert-response-faq
title: Alert Response FAQ
description: Our commonly asked questions about Alert Response are documented for your reference.
---

## Is Alert Response available in all Sumo Logic packages? 

Overall, yes. Alert Response is available in all the Sumo Logic packages. However, there are specific features within Alert Response that only work on specific packages. See the table below for details. 

**Alert Details**

| Package | Related Alerts | Monitor History | Playbooks |
|:--|:--|:--|:--|
| Free | Yes | Yes | Yes |
| Essentials | Yes | Yes | Yes |
| Enterprise Security | Yes | Yes | Yes |
| Enterprise Operations | Yes | Yes | Yes |
| Enterprise Suite | Yes | Yes | Yes |

**Alert Content**

| Package  | Log Fluctuations | Dimensional Explanation | Anomaly | Benchmark |
|:--|:--|:--|:--|:--|
| Free | Yes | Yes | No | No |
| Essentials | Yes | Yes | No | No |
| Enterprise Security | Yes | Yes | No | Yes |
| Enterprise Operations | Yes | Yes | Yes | Yes |
| Enterprise Suite | Yes | Yes | Yes | Yes |

## I have an existing third-party Connection, but don’t see a link to the Alert page

If you have an existing [connection](/docs/alerts/webhook-connections) such as Slack, PagerDuty, or Generic, you may not see a link to the Alert page in notifications. The link to the Alert page is not added by default in any of the Connections. You will have to manually add that link. You can do that by updating the webhook payload by referencing the `{{AlertResponseUrl}}` variable (case insensitive).

For example, in Slack, you can add the following section to the **Alert Payload**:

```json
{
  "title": "Alert URL",
  "value": "{{AlertResponseUrl}}"
},
```

![alertResponseURLExample.png](/img/monitors/alertResponseURLExample.png)

Learn more about [Alert Variables](/docs/alerts/monitors/alert-variables).

## What happens to corresponding alerts when a monitor is deleted?

After a monitor is deleted, corresponding alerts don't remain useful so they are deleted as well. 

## Where are the Log Fluctuation and Dimensional Explanation Cards for metrics-based Alerts?

Log Fluctuation and Dimensional Explanation cards work on Log data only. They are not applicable for Metrics-based alerts and therefore will not show up.

## Where are the Log Fluctuation Cards for Logs-based Alerts?

Sometimes, because of internal system errors, Log Fluctuation cards might not appear. If the problem persists, please [contact Sumo Logic support](/docs/get-started/help).

## I only see "Others" as a signature in Log Fluctuation Card. Is that expected?

Sumo Logic detects and maintains a signature library. It does that by analyzing logs sent to Sumo Logic and catalogs them into various signatures in the signature library. This process happens in the background and runs periodically, to keep the signatures up to date.

There could be cases where the process has still not cataloged a new log message to a signature. As a result, it would get bundled into the "Others" category. This problem should be fixed automatically after some time (when the background process runs).

You can also force run the signature cataloging process manually, by calling the [LogCompare](../../search/logcompare.md) or [LogReduce](/docs/search/logreduce) operators from the Log Search page. 

## I don’t see the Dimensional Explanation Card for logs-based Alert

There could be two reasons for the card not loading:

* Sometimes because of internal system errors Log Fluctuation cards might not appear.  If the problem persists please contact the Sumo Logic support team. 
* The Dimensional Explanation card has some limitations on where it might not work. Currently, the card doesn't work for the following cases:
    * Parse based filtering query
        ```sql
        _sourceCategory = security/okta
        "app.user_management.push_profile_failure"
        | json field=_raw "uuid=*" as uuid
        ```
   * Uncategorized
       ```sql
       106.212.160.* or 180.151.66.*
       ```
   * Only unstructured search term
       ```sql
       "NIFI_STORESTODUNNHUMBY_ERROR"
       "PPID" AND "sfe-staging-web"
       \"url\":\"/api/private/printing/"
       OR "\"response\":\"first byte timeout\""
       ```
   * Only structured search terms connected via or
       ```
       _sourceCategory=cx.eventlog/*/login-monitor OR
       _sourceCategory=cx.eventlog/*/ssh-login-monitor
       ```

## Where are Anomaly cards and Benchmark cards for Logs-based Alerts?

Anomaly cards only work if we are able to infer an entity from the alerting query. If we are unable to do so, then the anomaly card is not shown. There could be two reasons why the entity is not Inferred from the logs query.

* Logs don’t come from our Kubernetes or AWS Observability data collection sources. For AWS Observability, Logs need to be collected using our AWS Observability CloudFormation or Terraform setup process specifically, otherwise, entities might not work.
* Metrics data should be sent to Sumo Logic for the above-mentioned sources (Kubernetes and AWS Observability) in order for these cards to work properly.  

## Where are Anomaly Cards for Metrics-based Alerts?

Alert Response anomaly detection only detects anomalies for metrics data coming from Kubernetes or specific sources within AWS ([learn more](../../observability/root-cause-explorer.md)). If you are setting up alerts on Metrics that don’t belong to either one of these categories, anomalies will not be detected.

Use the [Sumo Logic Kubernetes collection](https://github.com/SumoLogic/sumologic-kubernetes-collection#sumologic-kubernetes-collection) or the [Sumo Logic AWS observability collection](/docs/observability/aws) for this to work properly. 

## Where are Benchmark Cards for Metrics-based Alerts?

Alert Response benchmarking only works for data coming from specific sources within AWS. If you are setting up alerts on Metrics that don’t belong to this category, anomalies will not be detected.
