---
id: datadog
title: Sumo Logic Integration with Data Dog
sidebar_label: Datadog
description: Start sending data from Datadog to your Sumo Logic account.
---
import useBaseUrl from '@docusaurus/useBaseUrl';
<img src='https://upload.wikimedia.org/wikipedia/en/7/7e/Datadog_logo.svg' alt="icon" width="50"/>

You can start sending events and alerts to Sumo Logic from Datadog using HTTP Collectors.
Here are the steps which are needed to be followed:
1. In Sumo Logic, add a hosted collector by following these steps [here](https://help.sumologic.com/docs/send-data/hosted-collectors/configure-hosted-collector/#step-1-configure-hosted-collector)
2. Add a HTTP source under this collector by following the steps [here](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source)
3. Copy the URL which you get after creating the source in previous step.
4. Go to the Sumo Logic Integration settings screen in Datadog
5. Enter the name you want to assign to the collector and the URL from step 3.
<img src={useBaseUrl('img/integrations/saas-cloud/datadog.png')} alt="Thumbnail icon" width="100"/>
6. Next time you want to send a message from Datadog to Sumo Logic, use **@sumologic-{YOUR COLLECTOR NAME}**.

Also for sending Sumo Logic alert to your Datadog account, follow the instruction [here](https://help.sumologic.com/docs/alerts/webhook-connections/datadog/)