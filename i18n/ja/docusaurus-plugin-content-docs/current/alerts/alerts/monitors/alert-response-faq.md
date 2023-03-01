---
id: alert-response-faq
title: Alert Response FAQ
sidebar_label: Alert Response FAQ
description: Our commonly asked questions about Alert Response are documented for your reference.
---

## Is Alert Response available in all Sumo Logic packages? 

Overall, yes Alert Response is available in all the Sumo Logic packages. However, there are specific features within Alert Response that only work on specific packages. See the table below for details. 

**Alert Details**

| Package | Related Alerts | Monitor History | Playbooks |
|--|--|--|--|
| Free | Yes | Yes | Yes |
| Essentials | Yes | Yes | Yes |
| Enterprise Security | Yes | Yes | Yes |
| Enterprise Operations | Yes | Yes | Yes |
| Enterprise Suite | Yes | Yes | Yes |

**Alert Content**

| Package  | Log Fluctuations | Dimensional Explanation | Anomaly | Benchmark |
|--|--|--|--|--|
| Free | Yes | Yes | No | No |
| Essentials | Yes | Yes | No | No |
| Enterprise Security | Yes | Yes | No | Yes |
| Enterprise Operations | Yes | Yes | Yes | Yes |
| Enterprise Suite | Yes | Yes | Yes | Yes |

## I have an existing connection but don’t see a link to the Alert Page?

If you have an existing connection such as Slack, PagerDuty, or Generic, you may not see a link to the Alert Page in notifications. The link to the Alert page is not added by default in any of the Connections. You will have to manually add that link. You can do that by updating the webhook payload by referencing the `{{AlertResponseUrl}}` variable (case insensitive).

For example, in Slack, you can add the following section to the payload:

```json
{
    "title": "Alert URL",
    "value": "{{AlertResponseUrl}}"
},
```

![alertResponseURLExample.png](/img/monitors/alertResponseURLExample.png)

Learn more about [Alert Variables](/docs/alerts/monitors/alert-variables).

## I don’t see Log Fluctuation or Dimensional Explanation Card for metrics-based Alert?

Log Fluctuation and Dimensional Explanation cards work on log data. As a result, currently, they are not applicable for Metrics based alerts and therefore don’t show up.

## I don’t see Log Fluctuation Card for logs-based Alert?

Sometimes because of internal system errors Log Fluctuation cards might not appear. If the problem persists please [contact the Sumo Logic support team](/docs/get-started/help).

## I only see "Others" as a signature in Log Fluctuation Card. Is that expected?

Sumo Logic detects and maintains a signature library. It does that by analyzing logs sent to Sumo Logic and catalogs them into various signatures in the signature library. This process happens in the background and runs periodically, to keep the signatures up to date. There could be cases, that the process has still not cataloged a new log message to a signature, as a result, it gets bundled into the "Others" category. This problem should be fixed automatically after some time (when the background process runs).

You can also force run the signature cataloging process manually, by calling the [LogCompare](../../search/logcompare.md) or [LogReduce](/docs/search/logreduce) operators from the Log Search page. 

## I don’t see the Dimensional Explanation Card for logs-based Alert?

There could be two reasons for the card not loading:

1. Sometimes because of internal system errors Log Fluctuation cards might not appear.  If the problem persists please contact the Sumo Logic support team. 
1. The Dimensional Explanation card has some limitations on where it might not work. Currently, the card doesn't work for the following cases:

    * Parse based filtering query

        ```
        _sourceCategory = security/okta
        "app.user_management.push_profile_failure"
        | json field=_raw "uuid=*" as uuid
        ```

   * Uncategorized

       ```
       106.212.160.* or 180.151.66.*
       ```

   * Only unstructured search term

       ```
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

## I don’t see Anomaly Card or Benchmark card for logs-based Alert?

Anomaly cards only work if we are able to infer an entity from the alerting query. If we are unable to do so, then the anomaly card is not shown. There could be two reasons why the entity is not Inferred from the logs query.

1. Logs don’t come from our Kubernetes or AWS Observability data collection sources. For AWS Observability, Logs need to be collected using our AWS Observability CloudFormation or Terraform setup process specifically, otherwise, entities might not work.
1. Metrics data should be sent to Sumo Logic for the above-mentioned sources (Kubernetes and AWS Observability) in order for these cards to work properly.  

## I don’t see Anomaly Card for metrics-based Alert?

Alert Response anomaly detection only detects anomalies for metrics data coming from Kubernetes or specific sources within AWS ([Learn More](../../observability/root-cause-explorer.md)). If you are setting up alerts on Metrics that don’t belong to either one of these categories, then anomalies will not be detected.

Use the Sumo Logic Kubernetes collection or the Sumo Logic AWS observability collection for this to work properly. 

## I don’t see Benchmark Card for metrics-based Alert?

Alert Response benchmarking only works for data coming from specific sources within AWS. If you are setting up alerts on Metrics that don’t belong to this category, then anomalies will not be detected.
