---
id: nobl9
title: Nobl9
description: Learn about the collection process for the Sumo Logic Nobl9 integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/nobl9-logo.png')} alt="Thumbnail icon" width="50"/>

Nobl9 is a pioneering company specializing in Service Level Objective (SLO) management, empowering businesses to optimize and ensure the reliability of their digital services through advanced monitoring, measurement, and proactive performance enhancements. You can use a webhook in the Nobl9 platform to forward alert events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor the entire spectrum of alert actions, encompassing the creation, user acknowledgments, resolution status, and user-initiated silence events in Sumo Logic. For more details, refer to the [Nobl9 Documentation](https://docs.nobl9.com/).

## Event types

The Sumo Logic integration for Nobl9 ingests alert events into Sumo Logic through an outgoing webhook available in Nobl9. The following alert event types are ingested through the Nobl9 webhook:
- Error Rate Exceedance
- Latency Spike
- Availability Drop
- Traffic Surge
- Saturation
- Degraded Functionality
- Dependency Failure
- Data Integrity Issues
- Security Breach
- Threshold Violations
- Capacity Limits

## Setup

This section has instructions for collecting logs for the Sumo Logic Nobl9 webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Nobl9 events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/nobl9` - for the Nobl9 integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Nobl9 to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Nobl9 account.

Follow the below steps to configure the Nobl9 webhook.

1. Sign in to the [Nobl9 account](https://accounts.nobl9.com/).
2. Open the right sidebar, and move to **Integrations**.
3. Select **Alert Methods**, and click **Add Alert Method**.
4. Select **Webhook**. The webhook form appears.
5. Enter webhook form data as follows:
    - **URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
    - **Project**. Select the project for which you want to send notifications to Sumo Logic.
    - **Name**. Enter a name for your alert method.
    - **Notification Details**. Select fields from the checklist which will be included in the notification sent to Sumo Logic.
6. Click **ADD ALERT METHOD**.
7. Verify Nobl9 events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
```sql
`_sourcecategory=webhook/nobl9`
```

:::info
- For detailed information about webhook creation, refer to the [Nobl9 Documentation](https://docs.nobl9.com/Alerting/Alert_methods/webhook).
- For support, [contact Nobl9](https://www.nobl9.com/contact/support).
:::
