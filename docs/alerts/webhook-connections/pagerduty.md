---
id: pagerduty
title: Webhook Connection for PagerDuty
sidebar_label: PagerDuty
description: Webhook Connections allow you to send alerts from Sumo Logic to PagerDuty.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/pagerduty.png')} alt="Thumbnail icon" width="50"/>

PagerDuty webhook connections allow you to send alert results as a PagerDuty notification. You can learn more about PagerDuty webhooks in
their [API Help](https://v2.developer.pagerduty.com/docs/webhooks-v2-overview).

[Webhook connections](set-up-webhook-connections.md) rely on HTTP endpoints that tell Sumo Logic where to send data. You can set up any number of connections. Once you set up the webhook connection, you'll have the option to use it in a [Scheduled Search](schedule-searches-webhook-connections.md) or [Monitor](/docs/alerts/monitors).

PagerDuty has a [Sumo Logic Integration Guide](https://www.pagerduty.com/docs/guides/sumo-logic-integration-guide/) with these same steps.

## Create a Service Key for the Webhook

1. In PagerDuty go to the **Services** menu and select **Service Directory**.
1. On the **Service Directory** page:
    * If you are creating a new service for your integration, click **Add New Service**.
    * If you are adding your integration to an existing service, click the name of the service you want to add the integration to. Then click the **Integrations** tab and click the **New Integration** button.
1. In the **Integration Type** menu, select from the following based on your preference:
    1. **Select Tool**: Search and select **Sumo Logic**.
    1. **Use our API directly**: You may also integrate by selecting ****Events API v2**** (recommended) or **Events API v1**.
1. Enter an **Integration Name**. If you are creating a new service for your integration, in General Settings, enter a **Name** for your new service. Then, in Incident Settings, specify the **Escalation Policy**, **Notification Urgency**, and **Incident Behavior** for your new service.
1. Click the **Add Service** or **Add Integration** button to save your new integration. You will be redirected to the Integrations page for your service.
1. Copy the **Integration Key** for your new integration and keep it in a safe place for later use.

## Set Up a Webhook Connection for PagerDuty

:::note
You need the **Manage connections** [role capability](/docs/manage/users-roles/roles/role-capabilities.md) to create webhook connections.
:::

The URL and supported payload are different based on the version of the PagerDuty Events API you are using. Follow the steps for the relevant API version below.

### Events API V2

1. Go to **Manage Data** > **Monitoring** > **Connections**.
1. On the Connections page click **Add**.
1. Click **PagerDuty**.
1. In the Create Connection dialog, enter the name of the Connection.
1. (Optional) Enter a **Description** for the Connection.
1. Enter the **URL** for the endpoint: `https://events.pagerduty.com/v2/enqueue`
1. The optional input fields **Authorization Header** and **Custom Headers** do not do anything and are ignored.
1. The default **Alert Payload** will not work with Event API V2. Change it to the following:
  ```json
  {
    "routing_key": "SERVICE KEY",
    "event_action": "trigger",
    "description": "{{TriggerType}} Alert:{{AlertName}}",
    "client": "Sumo Logic",
    "client_url": "{{AlertResponseURL}}",
    "payload": {
    	"summary": "{{TriggerType}} Alert:{{Name}}",
        "source": "Monitor :{{Name}}",
        "severity": "critical",
        "custom_details": {
          "alertURL": "{{AlertResponseURL}}",
          "triggerCondition": "{{TriggerCondition}}",
          "triggerValue": "{{TriggerValue}}",
          "triggerTime": "{{TriggerTime}}",
          "triggerTimeRange": "{{TriggerTimeRange}}",
          "query" : "{{Query}}",
          "queryURL" : "{{QueryURL}}",
          "results": "{{ResultsJSON}}"
        }
     }
  }
  ```
    * In the **Payload**, where it says `SERVICE KEY`, paste in the **integration key** you previously copied from PagerDuty.
    * In the **Payload** for the `description`, specify the description you want sent to PagerDuty. The above payload has specified to use the name of the alert.
    * In the **Payload** for `severity`, the allowed values (`critical`, `warning`, `error`, and `info`) are case sensitive; PagerDuty expects them to be lowercase. Do not use the `{{TriggerType}}` variable here because that will display values that are capitalized (i.e., `Critical`) and some of the `{{TriggerType}}` values are not allowed by PagerDuty (e.g., `MissingData`).
    * You can also update the `details` section, if you want to customize the PagerDuty alert notification.
1. The default **Recovery Payload** will not work with Event API V2. Change it to the following:
  ```json
	{
	  "routing_key": "{{RoutingKey}}",
	  "event_action": "resolve",
	  "dedup_key": "{{DedupKey}}",
	  "payload": {
	  	"summary": "Monitor {{Name}} has recovered at {{TriggerTime}}",
		"severity":"{{PayloadSeverity}}",
		"source":"{{PayloadSource}}",
		"custom_details": {
			"name": "{{Name}}",
			"time": "{{TriggerTimeRange}}",
			"triggerCondition": "{{TriggerCondition}}",
			"query": "{{Query}}"
		      }
	     }
	}

  ```
   * You can update the `custom_details` section, if you want to customize the PagerDuty recovery notification.
     :::note
     Do not update the `routing_key`, `event_action`, and `dedup_key` fields, otherwise recovery notifications will not be generated.
     :::
1. For details on other variables that can be used as parameters within your JSON object, see [Webhook Payload Variables](set-up-webhook-connections.md).
1. Click **Save**.

     ![PagerDuty default payload v2.png](/img/connection-and-integration/v2.png)

### Events API v1

1. Go to **Manage Data > Alerts > Connections**.
1. On the Connections page, click **Add**.
1. Click **PagerDuty**.
1. In the Create Connection dialog, enter the name of the Connection.
1. (Optional) Enter a **Description** for the Connection.
1. Enter the **URL** for the endpoint: `https://events.pagerduty.com/generic/2010-04-15/create_event.json`
1. The optional input fields **Authorization Header** and **Custom Headers** do not do anything and are ignored.
1. In the **Alert Payload**:
   * Where it says `SERVICE KEY`, paste in the **integration key** you previously copied from PagerDuty.
   * Where it says `description`, specify the description you want sent to PagerDuty.
   * You can also update the `details` section, if you want to customize the PagerDuty alert notification.
   ```json
   {
    	"service_key": "SERVICE KEY",
    	"event_type": "trigger",
    	"description": "{{TriggerType}} Alert:{{AlertName}}",
    	"client": "Sumo Logic",
    	"client_url": "{{AlertResponseURL}}",
    	"details": {
        	"alertURL": "{{AlertResponseURL}}",
    	    "triggerCondition": "{{TriggerCondition}}",
        	"triggerValue": "{{TriggerValue}}",
        	"triggerTime": "{{TriggerTime}}",
        	"triggerTimeRange": "{{TriggerTimeRange}}",
	      	"query" : "{{Query}}",
	      	"queryUrl" : "{{QueryURL}}",
	      	"results": "{{ResultsJSON}}"
 	      }
     }
     ```
1. Under the **Recovery Payload**:
   * You can update the `details` section, if you want to customize the PagerDuty recovery notification. Below is the default v1 payload.
   ```json
   {
	"service_key": "{{ServiceKey}}",
	"event_type": "resolve",
	"incident_key": "{{IncidentKey}}",
	"description": "{{Name}} has recovered at {{TriggerTime}}",
	"details": {
		"name": "{{Name}}",
		"time": "{{TriggerTimeRange}}",
		"triggerCondition": "{{TriggerCondition}}",
		"query": "{{Query}}"
	      }
    }
    ```
  :::note
  Do not update the `service_key`, `event_type`, and `incident_key` fields, otherwise recovery notifications will not be generated.
  :::
1. For details on other variables that can be used as parameters within your JSON object, see [Webhook Payload Variables](set-up-webhook-connections.md).

     ![PagerDuty default payload.png](/img/connection-and-integration/PagerDuty-default-payload.png)

1. Click **Save**.
