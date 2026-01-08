---
id: zebrium-rcaas
title: Zebrium RCaaS
description: Learn about the collection process for the Sumo Logic Zebrium RCaaS integration.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/zebrium-rcaas-logo.png')} alt="Thumbnail icon" width="50"/>

Zebrium RCaaS (Root Cause as a Service) is an AI-driven platform that automates root cause analysis of software incidents, helping developers identify and resolve issues quickly by analyzing log and metric data. You can use a webhook in the Zebrium RCaaS platform to forward events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor automated root cause analysis results, detect anomalies, and proactively address software incidents with insights in Sumo Logic. For more details, refer to the [Zebrium RCaaS Documentation](https://docs.zebrium.com/).

## Setup

This section has instructions for collecting logs for the Sumo Logic Zebrium RCaaS webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Zebrium RCaaS events.

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/zebriumrcaas` - for the Zebrium RCaaS integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Zebrium RCaaS to send events related to root cause analysis results to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Zebrium RCaaS account.

Follow the below steps to configure the Zebrium RCaaS webhook.

1. Sign in to the [Zebrium RCaaS account](https://trial.zebrium.com/auth/sign-in).
2. Go to **Settings** from top right corner, and click **Integrations & Collectors**.
3. Select **Outgoing RCA** from the **Webhooks** section.
4. Click **Create a New Integration**. The webhook form will appear.
5. Enter webhook form data as follows:
    - **Integration Name**. Provide a name for your outgoing webhook.
    - **Deployment**. Select a deployment for the integration.
    - **Service Groups**. Select service group(s) for the integration.
6. Click **Next**.
    - **Webhook URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
    - **Authentication Method**. Keep it as **NONE**.
7. Click **Save**.
8. Verify Zebrium RCaaS events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
  ```sql
  _sourceCategory=webhook/zebriumrcaas
  ```

:::info
- For detailed information about webhook creation, refer to the [Zebrium RCaaS Documentation](https://docs.sciencelogic.com/zebrium/latest/Content/Web_Zebrium/07_Webhooks/rca_outgoing.html).
- For support, [contact Zebrium RCaaS](https://www.zebrium.com/).
:::
