---
id: set-up-connections
title: Set Up ServiceNow Connections
sidebar_label: Set Up Connections
description: Set up connections for ServiceNow integration.
---


:::note
There are two ServiceNow connections available in Sumo Logic.

* [ServiceNow](#set-up-a-servicenow-connection) can create **Events** or **ITSM Incidents**.
* [ServiceNow (Legacy)](#set-up-a-servicenow-legacy-connection) is the older connection and only creates **Events** in ServiceNow.

If you are interested in creating **Security Incidents**, see [Set Up a ServiceNow Security Incident Webhook Connection](set-up-security-incident-webhook.md).
:::

A Webhook is an HTTP callback: an HTTP POST that occurs when something happens. Webhook connections allow you to send Sumo Logic alerts to third-party applications that accept incoming Webhooks.

An incident is an unplanned interruption that has occurred in your business and this is reported in ServiceNow via an ITSM incident.

## Prerequisite

Before setting up ServiceNow integration, contact your ServiceNow account manager to make sure that your organization has a subscription for Event Management.

To configure a Webhook connection, you must have a [Sumo Logic role](/docs/manage/users-roles/roles/create-manage-roles) that grants you the Manage connections capability.

## Set up a ServiceNow connection

To set up a ServiceNow Webhook connection:

1. Go to **Manage Data** > **Monitoring** > **Connections**.
1. On the **Connections** page click **Add**.
1. For **Connection Type**, select **ServiceNow**.<br/>![serviceNow icon.png](/img/connection-and-integration/serviceNow-icon.png)
1. In the **Create Connection** dialog, enter the **Name** of the connection.
1. (Optional) Enter a **Description** for the connection.
1. For **URL**, enter one of the following based on whether you want to create **Events** or **Incidents**: 
   * To create ServiceNow ITSM **Incidents**, enter the **URL** for the ServiceNow Incident endpoint. 
    ```
    https://<your-instance>.service-now.com/api/now/table/incident
    ```
   * To create **Events**, copy your organization's ServiceNow URL, which can be found at the top of any ServiceNow web page, then paste it in the URL text box. After pasting the URL, type **/api/now/table/em_event** to enable data to be uploaded from Sumo Logic to ServiceNow.
    ```
    https://<your-instance>.service-now.com/api/now/table/em_event
    ```
    :::note
    Only HTTPS (port 443) and HTTP (port 80) URLs are supported.
    :::
1. **Authentication** can be done with a **Username and Password** or an **Authorization Header**.
   * Use the **Username** and **Password** used to log in to **ServiceNow**.
   * See how to set an [Authorization Header](/docs/alerts/webhook-connections/set-up-webhook-connections).
1. Set the **Type** to **Events** or **Incidents** based on what you want to create. This needs to align with the **URL** you provided.
1. (Optional) **Custom Headers**, enter up to five comma separated key-value pairs.
1. For **Alert Payload**, which allows you to customize how the alert notification look in ServiceNow, enter a JSON object that defines the structure of what you want to send to ServiceNow. For details on variables that can be used as parameters within your JSON object, see [webhook payload variables](/docs/alerts/webhook-connections/set-up-webhook-connections). 
1. For **Recovery Payload**, which allows you to customize how the recovery notification look in ServiceNow, enter a JSON object that defines the structure of what you want to send to ServiceNow. 
1. Click **Save**.
1. To send alerts to this connection, follow these steps:
   1. [Testing the connection](set-up-connections.md).
   1. [Create a Monitor](/docs/alerts/monitors/create-monitor).

## Test the connection

After configuring the connection, click **Test Alert or Test Recovery**. If the connection is made, you will see a 201 OK response message.

If the connection is successful, you'll see an event or incident created in ServiceNow. There won't contain any information from the scheduled search, it will just have the text in the payload.

## ServiceNow ITSM Incident Import Table Fields

To determine the available fields and generate a sample payload for ServiceNow ITSM Incidents see the [ServiceNow documentation](https://docs.servicenow.com/bundle/newyork-application-development/page/integrate/inbound-rest/concept/use-REST-API-Explorer.html#use-REST-API-Explorer).

Once you are satisfied with the payload, copy the payload into the Sumo Logic payload field under the Webhook connection.

## Incidents for Domain Separation 

With domain separation in ServiceNow, you can separate data, processes, and administrative tasks into logically defined domains. To send ITSM incidents to the right domain, as part of the Webhook payload, send “company” as part of the payload and set it to your customer’s company sysid (32-bit GUID) to ensure the incident is inserted in the proper ServiceNow domain. You will also need to ensure the following:

1. Business rules are running for your import set as documented [here](https://docs.servicenow.com/bundle/newyork-platform-administration/page/script/server-scripting/task/t_CreateATransformMap.html). 
1. The company field in the import map is set to reject if the company name doesn’t exist as documented [here](https://docs.servicenow.com/bundle/newyork-platform-administration/page/integrate/ldap/task/t_SetChoiceAction.html). 

## Set up a ServiceNow (Legacy) connection

The first step for integrating ServiceNow with Sumo Logic is to configure one or more connections, which are HTTP endpoints that tell Sumo Logic where to send data. You can set up any number of connections, depending on your organization's needs.

1. In Sumo Logic, go to **Manage Data > Monitoring > Connections**.
1. On the Connections page, click **Add**.
1. For **Connection Type**, select **ServiceNow (Legacy)**.<br/>  ![serviceNow legacy icon.png](/img/connection-and-integration/serviceNow-legacy-icon.png)
1. In the Create Connection dialog box, enter the **Name** of the connection.
1. **Optional:** Enter a **Description** for the connection.
1. Enter the **Username** and **Password** used to log in to **ServiceNow**.
1. For **URL**, copy your organization's ServiceNow URL, which can be found at the top of any ServiceNow web page, then paste it in the URL text box. After pasting the URL, type **/api/now/table/em_event** to enable data to be uploaded from Sumo Logic to ServiceNow.
1. Click **Save**. The connection displays.

## Edit connections

Existing connections can be edited at any time through the **Manage Data** > **Monitoring** > **Connections** page.

1. Click **Edit** to the right of the name of the connection.
1. Make any changes to the information, then click **Save**.
