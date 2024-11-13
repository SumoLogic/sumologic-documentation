---
id: mailgun
title: Mailgun
description: Learn about the collection process for the Sumo Logic Mailgun integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/mailgun-logo.png')} alt="Thumbnail icon" width="50"/>


The Mailgun app for Sumo Logic enables you to seamlessly monitor email system performance and user interactions through two comprehensive dashboards. The provided dashboard empowers you to analyze and optimize email delivery by monitoring event trends, identifying errors, understanding client behaviour, and tracking event geolocation data, ensuring efficient email management and an enhanced user experience. Meanwhile, the dashboard also offers a holistic view of email delivery, allowing you to track issues, complaint patterns, and geographic trends in events and complaints, facilitating effective email management and optimization.

Mailgun is an email delivery service for sending, receiving, and tracking emails. You can use a webhook in the Mailgun platform to forward inbound and outbound email events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor the entire email communication lifecycle, events such as accepted, rejected, delivered, and failed messages, as well as recipient interactions like opened, clicked, unsubscribed, and complained events in Sumo Logic. For more details, refer to the [Mailgun Documentation](https://documentation.mailgun.com/en/latest/).

## Event types

The Sumo Logic integration for Mailgun ingests email events into Sumo Logic through an outgoing webhook available in Mailgun. For more information on supported events that are ingested through the Mailgun webhook, see the [Mailgun Documentation](https://documentation.mailgun.com/en/latest/user_manual.html#events-1).

### Sample log messages

```json
{
  "signature": {
    "token": "b30b54697f3c4c8f8e810ee1e6012cc25b93a0b006aedd9ea5",
    "timestamp": 1698262699,
    "signature": ""
  },
  "event-data": {
    "id": "Ase7i2zsRYeDXztHGENqRA",
    "timestamp": 1698262699.873676,
    "log-level": "info",
    "event": "clicked",
    "message": {
      "headers": {
        "message-id": "16982626991826.18666.16540@sandbox6dc4471342a54f23b39d0b8be5621130.mailgun.org"
      }
    },
    "recipient": "win7mailer411@mxil.com",
    "recipient-domain": "example.com",
    "ip": "72.66.105.242",
    "geolocation": {
      "country": "US",
      "region": "CA",
      "city": "San Francisco"
    },
    "client-info": {
      "client-os": "Linux",
      "device-type": "desktop",
      "client-name": "Chrome",
      "client-type": "browser",
      "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.43 Safari/537.31"
    },
    "campaigns": [
      
    ],
    "tags": [
      "my_tag_1",
      "my_tag_2"
    ],
    "user-variables": {
      "my_var_1": "Mailgun Variable #1",
      "my-var-2": "awesome"
    }
  }
}
```

### Sample queries

```sql
_sourceCategory="webhook/mailgun"
| json "event-data.id", "event-data.event", "event-data.log-level" as id, event, loglevel nodrop
| where event matches "{{event}}" and loglevel matches "{{logLevel}}"
| count
```

## Setup

This section has instructions for collecting logs for the Sumo Logic Mailgun webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Mailgun events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP source - for example, `webhook/mailgun` - for the Mailgun integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Mailgun to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time any email events occur within your Mailgun account.

Follow the below steps to configure the Mailgun webhook.

1. Sign in to the [Mailgun account](https://signup.mailgun.com/new/signup).
2. Under **Sending** section move to the **Webhooks** option.
3. Click **Add Webhook**. The webhook form appears.
4. Enter webhook form data as follows:
    - **Event Types**. Select the event types for which you want to send notifications to Sumo Logic.
    - **URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
5. Click **Create Webhook**.
6. Verify Mailgun events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
```sql
`_sourceCategory=webhook/mailgun`
```

:::info
- For detailed information about webhook creation, refer to the [Mailgun Documentation](https://documentation.mailgun.com/en/latest/user_manual.html#webhooks-1).
- For support, [contact Mailgun](https://app.mailgun.com/support).
:::

### Installing the Mailgun app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Mailgun dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Mailgun - Overview** dashboard offers a comprehensive overview of email system performance and user interactions, featuring panels that include Log Level, Total Events, Total Error Events, Log Level Trends, Event Type, Event Trends, Top Sender, Top Recipient, Top Subject, Client OS, Client Device Type, Client Type, Client Name, Event Geolocation, and Recent Event Summary. This dashboard empowers Mailgun users to analyze and optimize email delivery by monitoring event trends, identifying errors, understanding client behavior, and tracking event geolocation data, ensuring efficient email management and enhanced user experience.

<img src={useBaseUrl('img/integrations/webhooks/mailgun_overview.png')} style={{border: '1px solid black'}} alt="Mailgun - Overview"/>

### Failed, Complained Events

The **Mailgun - Failed, Complained Events** dashboard offers a holistic view of email system performance and user interactions, featuring panels like Failed Events, Severity, Top Failure Codes, Top Failure Reasons, Top Sender and Recipient for Failure Events, Recent Failed Events, Complained Events, Top Sender and Recipient for Complained Events, Top Subject for Complained Events, Event Geolocation, and Recent Complained Events. This dashboard equips Mailgun users to closely monitor email delivery, assess issues, understand complaint patterns, and track geographic trends in events and complaints, facilitating effective email management and optimization.

<img src={useBaseUrl('img/integrations/webhooks/mailgun_failedComplainedEvents.png')} style={{border: '1px solid black'}} alt="Mailgun - Failed, Complained Events"/>

## Upgrade/Downgrade the iLeMailgunrt app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Mailgun app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>