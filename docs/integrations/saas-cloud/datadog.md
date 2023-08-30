---
id: datadog
title: Datadog
description: Use the Sumo Logic Integration for Datadog to start sending data from Datadog to your Sumo Logic account.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src='https://upload.wikimedia.org/wikipedia/en/7/7e/Datadog_logo.svg' alt="icon" width="50"/>

The Sumo Logic Integration for Datadog allows you to send events and alerts from Datadog to Sumo Logic using HTTP Collectors. To get started:

1. In Sumo Logic, [add a **Hosted Collector**](/docs/send-data/hosted-collectors/configure-hosted-collector/#step-1-configure-hosted-collector).
2. Under this collector, [add an **HTTP Source**](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
3. Copy the URL that you get after creating the source in the previous step.
4. In Datadog, go to the **Sumo Logic Integration** settings screen.
5. Enter the **Collector Name** you want to assign to the collector and the **Collector URL** from step 3.<br/><img src={useBaseUrl('img/integrations/saas-cloud/datadog.png')} alt="Thumbnail icon" />

Next time you'd like to send a message from Datadog to Sumo Logic, use `@sumologic-{YOUR COLLECTOR NAME}`.

To send Sumo Logic alerts to your Datadog account, see [Sumo Logic Webhook Connection for Datadog](/docs/alerts/webhook-connections/datadog).
