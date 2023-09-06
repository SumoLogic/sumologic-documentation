---
id: custom-inventory-sources
title: Configure a Custom Inventory Source
sidebar_label: Custom Inventory Source
description: Learn how to extract inventory data from your data sources
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic explains how you can extract inventory data from logs in Sumo Logic and send it to CSE. If you want to leverage inventory data from a system or service that isn’t supported by a Sumo Logic Source inventory source, you can follow the instructions in this topic. This procedure assumes that you already ingest log data that contains inventory data.

CSE uses _inventory data_—information about hosts and users in your environment—to provide context to Signals. Inventory data can also be used in Entity Groups to set attributes on Entities (users, hosts, and so on); those attributes can be later used in detection rule definitions, to adjust the severity of Signals (using criticality), and for further context in Signals.

Sumo Logic provides a number of Sources you can use to ingest inventory data from services such as Microsoft Azure AD, Carbon Black, and AWS EC2. For more information, see [Inventory Sources and Data](/docs/cse/administration/inventory-sources-and-data).


## How it works

In the steps below, you’ll configure a Sumo Logic [scheduled search](/docs/alerts/scheduled-searches) that returns inventory data that’s been ingested by your inventory source. You configure a Webhook connection as the alert type for the scheduled search. The webhook’s payload is inventory data, and its destination is an HTTP Source that you’ve set up to receive the data.


## Before you start

Identify your source of inventory data and review the [CSE inventory schema](#cse-inventory-schema) below. The schema identifies the attributes supported for the two different CSE inventory types: user and computer. For each attribute in the user or host schema, identify the field from your inventory source that maps to the schema attribute. You’ll use this mapping when you set up a Webhook in [Step 2](#step-2-create-a-webhook-connection) below.


## Limitations

This approach uses Scheduled Searches, which are limited to 100 unique rows of data each time they trigger. This means that if you have more than 100 inventory items, only the first 100 will be sent using this method.


## Step 1: Set up an HTTP Source

In this step, you configure an HTTP Source that will receive the inventory data from the Webhook you’ll set up later in this procedure. You can add the source to an existing Hosted Collector or configure a new collector.

1. Go to **Manage Data** > **Collection** > **Collection** in the Sumo Logic UI.
2. Navigate to an existing Hosted Collector, or if you prefer to set up a new one, follow the instructions in [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
3. In the row for the Hosted Collector, click **Add Source**. <br/><img src={useBaseUrl('img/cse/add-source-link.png')} alt="add-source-link.png" />
4. Click **HTTP Logs & Metrics.**  <br/><img src={useBaseUrl('img/cse/select-source.png')} alt="select-source.png" />
5. The source configuration page appears. <br/><img src={useBaseUrl('img/cse/http-source.png')} alt="http-source.png" />
6. **Name**. Enter a name for the source.
7. **Description**. (Optional)
8. **Source Host**. (Optional) Enter a string to tag the messages collected from the source. The string that you supply will be saved in a metadata field called `_sourceHost`.
9. **Source Category**. Enter a string to tag the output collected from the source, for example, _cse/custom/inventory_. The string that you supply will be saved in a metadata field called `_sourceCategory`.
10. **SIEM Processing**. Click the checkbox to configure the source to forward log messages to CSE.
11. **Fields**. Click **+Add Field**, and add a field whose name is `_siemdatatype` with value _inventory_.
12. Click **Save**
13. Copy the URL that appears. You will need this to create the Webook in the next step.

## Step 2: Create a Webhook connection

In this step you create a WebHook that points to the HTTP source.

1. Go to **Manage Data > Monitoring** and select the **Connections** tab. <br/><img src={useBaseUrl('img/cse/connections.png')} alt="connections.png" />
2. Click the plus sign (+) icon.
3. On the **Select Connection Type** page, click **Webhook.**
4. Give it a name and input the URL from the HTTP Endpoint as your URL.
5. On the **Create New Webhook** page:
    1. **Name**. Enter a name for the Webhook.
    2. **URL**. Enter the URL of the HTTP Source you created above.
    3. **Payload**. Enter a JSON object <br/><img src={useBaseUrl('img/cse/create-webhook.png')} alt="create-webhook.png" width="500"/>

## Step 3: Create search query

In this step, you create a log query that extracts inventory-related fields from your inventory source. Refer to [CSE inventory schema](#cse-inventory-schema) for the inventory attributes that are supported for host and user objects.


## Step 4: Create a Scheduled Search

In this step, you schedule the search you created above to send results to the Webhook you created.

1. In your log search tab, click **Save As**.
2. On the Save Item popup:
    1. **Name**. Enter a name for your search,
    2. **Time range**. Select a time range.
    3. **Click Schedule This Search**. <br/><img src={useBaseUrl('img/cse/save-item-inv.png')} alt="save-item-inv.png" width="450"/>
    4. The popup refreshes.
    5. **Run Frequency**.
    6. **Time range for scheduled search**.
    7. **Timezone for scheduled search**.
    8. **Alert Type**. Select Webhook,  and pick the one you created that goes to the HTTP Endpoint. Check **Send a separate alert for each search result**.
    9. **Location to save to**. Choose a folder location for the search. <br/><img src={useBaseUrl('img/cse/save-item-4.png')} alt="save-item-4.png" width="450"/>

## CSE inventory schema

This section defines the attributes in the CSE inventory schema for hosts and users. Note that the same attributes can be used for either host or user inventory data.


### Host inventory attributes

The table below lists attributes most typically used in host inventory records. The ones you choose depend on the fields available from your inventory data source. For a host, you might consider using `computername`, `deviceUniqueId`, and `hostname`, at a minimum.


<table>
  <tr>
   <td><strong>Inventory attribute</strong>
   </td>
   <td><strong>Notes</strong>
   </td>
  </tr>
  <tr>
   <td><code>computername</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><code>deviceUniqueId</code>
   </td>
   <td>A unique ID that distinguishes an inventory item from other inventory items from the same source.
   </td>
  </tr>
  <tr>
   <td><code>groups</code>
   </td>
   <td>The directory service (for example, Azure AD) group that the inventory item belongs to.
   </td>
  </tr>
  <tr>
   <td><code>hostname</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><code>ip</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><code>location</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><code>mac</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><code>natIp</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><code>normalizedComputerName</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><code>normalizedHostname</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><code>os</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><code>osVersion</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><code>uniqueID</code>
   </td>
   <td>A unique ID that distinguishes an inventory item from all other inventory items from all inventory sources.
   </td>
  </tr>
</table>



### User inventory attributes

The table below lists attributes most typically used in user inventory records. The ones you choose depend on the fields available from your inventory data source. For a user, you might consider using `username`, `userID`, `emails`, and `groups`, at a minimum.


<table>
  <tr>
   <td><strong>Inventory attribute</strong>
   </td>
   <td><strong>Notes</strong>
   </td>
  </tr>
  <tr>
   <td><code>department</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><code>emails</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><code>givenName</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><code>groups </code>
   </td>
   <td>The directory service (for example, Azure AD) group that the inventory item belongs to.
   </td>
  </tr>
  <tr>
   <td><code>lastName</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><code>middleName</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><code>uniqueID</code>
   </td>
   <td>A unique ID that distinguishes an inventory item from all other inventory items from all inventory sources.
   </td>
  </tr>
  <tr>
   <td><code>userId</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><code>username</code>
   </td>
   <td>
   </td>
  </tr>
</table>



## Example saved search and Webhook payload


### Scheduled search

 The search below extracts inventory fields from JAMF logs.

```json
_sourceCategory="security/jamf" and _collector="Jamf"
| json field _raw "event.computer.osVersion as os_version
| json field _raw "event.computer.deviceName as hostname
| json field _raw "event.computer.deviceName as hostname
| json field _raw "event.computer.ipAddress as ip
| json field _raw "event.computer.macAddress as mac
| json field _raw "event.computer.username as username
| json field _raw "event.computer.emailAddress as email
| json field _raw "event.computer.position as role
| where !(isEmpty(username))
| count by os_version, hostname, ip, mac, username,email, role
```

**Notes**



* `_collector` and `_sourceCategory` and specify the collector that ingests the inventory data and the source category assigned it. In your own search, you can use these and other [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) fields to scope your search.



### Webhook payload for User Entity


```json
{
"userId": "{{Results.email}}",
"username": "{{Results.username}}",
"hostname": "{{Results.hostname}}",
"ip": "{{Results.ip}}",
"osVersion": "{{Results.os_version}}",
"mac": "{{Results.mac}}",
"source": "JAMF",
"customInventory": true,
"type": "user"
}
```

### Webhook payload for Computer Entity

```json
{
"computername": "{{Results.hostname}}",
"hostname": "{{Results.hostname}}",
"ip": "{{Results.ip}}",
"natip": "{{Results.natip}}",
"os": "{{Results.os}}",
"mac": "{{Results.mac}}",
"source": "CarbonBlack",
"uniqueID": "{{Results.uniqueID}}",
"deviceUniqueId": "{{Results.uniqueID}}",
"customInventory": true,
"type": "computer"
}
```


**Notes**


* The `source` key is an arbitrary string that identifies the source of the inventory data.
* The `customInventory` key identifies the payload as custom inventory data. You must include this in your webhook payload.
* The `type` key specifies what type of inventory data the webhook sends. Set the value to _user_ or _computer_. You must include this in your webhook payload.
