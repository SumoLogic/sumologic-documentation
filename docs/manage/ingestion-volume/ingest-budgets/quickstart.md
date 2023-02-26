---
id: quickstart
title: Ingest Budgets Quickstart Tutorial
description: Learn how to create and use Ingest Budgets.
---


## Availability

| Account Type | Account Level|
|:--|:--|
| CloudFlex| Enterprise|
| Credits| Trial, Enterprise Operations, Enterprise Security, Enterprise Suite |

This tutorial provides the steps to create and use ingest budgets. Details about this feature can be found in [Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets).

## Requirements

API requests require authentication with an access id and key. In the following steps, the requests have the argument \<accessid:accesskey\> where you need to specify these. See [API authentication](/docs/api/getting-started#authentication) for details.

In addition, you need to specify the correct endpoint to send your API requests. The following steps have the
argument `<your deployment>` where you need to specify either us1, us2, eu, de, jp, or au. For us1, use `api.sumologic.com`. For the others, use `api.us2.sumologic.com`, and so on. For more information, see [Sumo Logic Endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).

## Ingest Budgets API Documentation

Documentation for OpenAPI built APIs is hosted on each deployment. Sumo Logic has several deployments that are assigned depending on the geographic location and the date an account is created. See [how to determine which endpoint to use](/docs/api/getting-started.md#sumo-logic-endpoints-by-deployment-and-firewall-security "Sumo Logic Endpoints and Firewall Security") if you are unsure.

Select the documentation link for your deployment:

| Deployment | Documentation URL |
|:------------|:------------------------------------------------------------------|
| AU | https://api.au.sumologic.com/docs/#tag/ingestBudgetManagement  |
| DE | https://api.de.sumologic.com/docs/#tag/ingestBudgetManagement |
| EU | https://api.eu.sumologic.com/docs/#tag/ingestBudgetManagement  |
| JP | https://api.jp.sumologic.com/docs/#tag/ingestBudgetManagement  |
| US1 | https://api.sumologic.com/docs/#tag/ingestBudgetManagement |
| US2 | https://api.us2.sumologic.com/docs/#tag/ingestBudgetManagement |

## Step 1. Create an Ingest Budget

Use a POST request to create an ingest budget. See the [API documentation for Ingest Budgets](#ingest-budgets-api-documentation) for further details.

Request Body Schema: **application/json**

:::note
These parameters are from the Ingest Budget's API documentation, linked in the above section.
:::

| Parameter | Description | Data Type |
|:--|:--|:--|
| name (required) | Display name of the ingest budget. | string `[ 1 .. 128 ] characters` |
| fieldValue (required) | Custom field value that is used to assign Collectors to the ingest budget. | string `[ 1 .. 1024 ] characters` |
| capacityBytes (required) | Capacity of the ingest budget, in bytes.<br/>It takes a few minutes for Collectors to stop collecting when capacity is reached. We recommend setting a soft limit that is lower than your needed hard limit. | integer `<int64> >= 0` |
| timezone (required) | Time zone of the reset time for the ingest budget. Follow the format in the [IANA Time Zone Database.](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) | string |
| resetTime (required) | Reset time of the ingest budget in HH:MM format. | string `5 characters` |
| description | Description of the ingest budget. | string `[ 0 .. 1024 ] characters` |
| action (required) | Action to take when ingest budget's capacity is reached. All actions are audited. Supported values are:<ul><li>stopCollecting</li><li>keepCollecting</li></ul> | string |

### Example POST request cURL command

:::note
The highlighted areas need to be customized.
:::

```bash title="Command"
curl -v -u '<accessid:accesskey>' \
--header 'Content-Type: application/json' \
--request POST https://api.<your deployment>.sumologic.com/api/v1beta/ingestBudgets \
--data @- <<'EOF'
```

```json
{
    "name": "Demo Budget 1",
    "fieldValue": "dev_30_gb",
    "capacityBytes": 1000,
    "timezone": "America/Los_Angeles",
    "resetTime": "23:30",
    "description": "A simple small demo budget",
    "action": "stopCollecting"
}
EOF
```

Single line example:

```bash
curl -u '<accessid:accesskey>' --header 'Content-Type: application/json' --request POST --data '{ "name": "Demo Budget 2",  "fieldValue": "dev_30_gb",  "capacityBytes": 1000,  "timezone": "America/Los_Angeles",  "resetTime": "23:30",  "description": "A simple small demo budget", "action": "stopCollecting"}' https://api.<your deployment>.sumologic.com/api/v1beta/ingestBudgets
```

which returns

```json
{"name":"Demo Budget 1",
"fieldValue":"dev_30_gb",
"capacityBytes":1000,"timezone":"America/Los_Angeles",
"resetTime":"23:30",
"description": "A simple small demo budget",
"action":"stopCollecting",
"createdAt":"2018-12-19T22:29:15.938Z",
"createdBy":"0000000000B20202",
"modifiedAt":"2018-12-19T22:29:15.938Z",
"modifiedBy":"0000000000B20202",
"id":"0000000000000064",
"usageBytes":0,"usageStatus":"Normal"}
```

:::note
You will use the `id` value in the next request. This example's value is `0000000000000064`.
:::

## Step 2. Confirm the Budget was Created

Use a GET request to confirm its creation. See the [API documentation for Ingest Budgets](#ingest-budgets-api-documentation)
for further details.

:::note
Customize `<accessid:accesskey>` and `<your deployment>`. Replace the value `0000000000000064` with the `id` value of your ingest budget.
:::

```bash
curl -u '<accessid:accesskey>' -X GET https://api.<your deployment>.sumologic.com/api/v1beta/ingestBudgets/0000000000000064
```

which returns

```json
{
"name":"Demo Budget 1",
"fieldValue":"dev_30_gb",
"capacityBytes":1000,
"timezone":"America/Los_Angeles",
"resetTime":"23:30",
"description":"A simple small demo budget",
"action":"stopCollecting",
"createdAt":"2018-12-19T22:29:15.938Z",
"createdBy":"0000000000B20202",
"modifiedAt":"2019-01-10T07:30:02.998Z",
"modifiedBy":"FFFFFFFFFFFFFD66",
"Id":"0000000000000064",
"usageBytes":1008,
"usageStatus":"Exceeded"
}
```

## Step 1. Assign a Collector to the Budget

The following steps can be referenced in [Assign Collector to Ingest Budget](assign-collector-ingest-budget.md). You can use the Collection page in the Sumo web interface or the Collector API to assign the Collector.

### Use Collection page

On the **Manage Data** > **Collection** > **[Collection](/docs/send-data/collection)** page when editing an
existing Collector or creating a new Hosted Collector there is a new option, **Assign to a Budget**, that allows you to assign an ingest budget to a Collector.

![assign to a budget dropdown option.png](/img/ingestion-volume/assign-budget-dropdown-option.png)

The dropdown displays your ingest budgets in the following format:

```
<budget name> (<field value>) (<allocated capacity>)
```

For example, the screenshot above shows `CSSdev (cssdev) (19GB)`. The `<budget name>` is `CSSdev`, the `<field value>` is `cssdev`, and the `<allocated capacity>` is `18GB`.

Select the ingest budget you want to assign to the Collector and click **Save**.

### Use Collector API

To assign a Collector to an ingest budget you need to get and update the Collector's configuration file. The following steps can be referenced in the [Collector Management API document for a PUT request](/docs/api/collector-management#Collector-API-Methods-and-Examples "Collector API Methods and Examples").

First make a GET request to get the Collector's JSON configuration:

:::note
Customize `<accessid:accesskey>`, `<your deployment>`, and collector ID like `150905330`. Replace the value `150905330` with the `id` value of your Collector. You can use the Sumo [web interface](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration.md) to get an `id`.
:::

```bash
curl -v -u '<accessid:accesskey>' https://api.<your deployment>.sumologic.com/api/v1/collectors/150905330
```

which returns

```
...
< ETag: "a2c82c407ea4ae70ac4f6425b50942a1"
...
{
  "collector":{
    "id":150905330,
    "name":"mycollectorname",
    "timeZone":"UTC",
    "fields":{     
    },
    "links":[{
      "rel":"sources",
      "href":"/v1/collectors/150905330/sources"
    }],
    "ephemeral":false,
    "sourceSyncMode":"UI",
    "collectorType":"Installable",
    "collectorVersion":"19.227-15",
    "osVersion":"10.14.2",
    "osName":"Mac OS X",
    "osArch":"x86_64",
    "lastSeenAlive":1545259173207,
    "alive":true
  }
}
}
* Connection #0 to host api.sumologic.com left intact
```

Save the response JSON to a file. To assign the Collector to the budget specify the ingest budget's `fieldValue` with the field `_budget` using the `fields` parameter.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| fields | JSON Object  | No |   | JSON map of key-value fields (metadata) to apply to the Collector. To assign an ingest budget use the field `_budget` with its Field Value. | Modifiable |

Modify your file to include the `_budget` field with the Field Value of the ingest budget to assign. In the following example, the Field Value of the ingest budget is `dev_30_gb` and the JSON file is named `updated_collector.json`.

More details can be found in [Assign Collector to Ingest Budget](assign-collector-ingest-budget.md). 

Our updated file's content is:

```json
{
  "collector":{
    "id":150905330,
    "name":"mycollectorname",
    "timeZone":"UTC",
    "fields":{
        "_budget": "dev_30_gb"      
    },
    "links":[{
      "rel":"sources",
      "href":"/v1/collectors/150905330/sources"
    }],
    "ephemeral":false,
    "sourceSyncMode":"UI",
    "collectorType":"Installable",
    "collectorVersion":"19.227-15",
    "osVersion":"10.14.2",
    "osName":"Mac OS X",
    "osArch":"x86_64",
    "lastSeenAlive":1545259173207,
    "alive":true
  }
}
```

## Step 1. Obtain the ETag value to identify Collector

To assign a Collector to a budget you'll need to make a PUT request with the [Collector Management API](/docs/api/collector-management). This request requires an "ETag" header value for verification. To get this value use a GET request for the Collector you want to assign and the response will have the value, like `< ETag: "a2c82c407ea4ae70ac4f6425b50942a1"`. You did this in step 2.

:::note
Customize `<accessid:accesskey>`, `<your deployment>`, and collector ID like `150905330`.
:::

```bash
curl -v -u '<accessid:accesskey>' https://api.<your deployment>.sumologic.com/api/v1/collectors/150905330
```

## Step 5. Assign Collector to the Budget

Use a PUT request with the [Collector Management API](/docs/api/collector-management) to update the Collector with the ingest budget assignment. Your PUT request needs to provide the "ETag" value from step 4 and the updated JSON file you created in step 3.

:::note
Customize `<accessid:accesskey>`, `a2c82c407ea4ae70ac4f6425b50942a1`, `updated_collector.json`, `<your deployment>`, and id like `150905330`.
:::

```bash
curl -u \<accessid:accesske\>'  -X PUT -H "Content-Type: application/json" -H "If-Match: \"a2c82c407ea4ae70ac4f6425b50942a1\"" -T updated_collector.json https://api\<your deploymen\>.sumologic.com/api/v1/collectors/150905330`
```

## Step 6. Verify Collector is assigned to Budget

Use another GET request to verify the assignment.

:::note
Customize `<accessid:accesskey>`, `<your deployment>`, and id like `150905330`.
:::

```bash
curl -u '<accessid:accesskey>' -X GET https://api.<your deployment>.sumologic.com/api/v1/collectors/150905330
```

which returns

```json
{
  "collector":{
    "id":150905330,
    "name":"mycollectorname",
    "timeZone":"UTC",
    "fields":{
      "_budget":"dev_30_gb"
    },
    "links":[{
      "rel":"sources",
      "href":"/v1/collectors/150905330/sources"
    }],
    "ephemeral":false,
    "sourceSyncMode":"UI",
    "collectorType":"Installable",
    "collectorVersion":"19.227-15",
    "osVersion":"10.14.2",
    "osName":"Mac OS X",
    "osArch":"x86_64",
    "lastSeenAlive":1547679700493,
    "alive":true
  }
}
```
