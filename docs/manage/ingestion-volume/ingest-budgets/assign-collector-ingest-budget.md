---
id: assign-collector-ingest-budget
title: Assign Collector to Ingest Budget
description: Learn how to assign a Collector to an ingest budget.
---


## Availability

| Account Type | Account Level |
|:--|:--|
| CloudFlex | Enterprise |
| Credits | Trial, Enterprise Operations, Enterprise Security, Enterprise Suite |

Once you have created an ingest budget you can assign a Collector to it. You can assign a Collector to an ingest budget by:

* Using the [Collection](#assign-collector-to-ingest-budget) page.
* Using the `fields` parameter at any time with the [Collector Management API](#collector-management-api) or when first registering a Collector with Sumo with the [command line installer](#command-line-installation) or [user.properties](#userproperties) file.

The UI installer for Installed Collectors does not support assigning ingest budgets, use another method.

:::note
Assigning an Ingest Budget to a Collector is only relevant for V1 Ingest Budgets. V2 Ingest Budgets assign budgets to your log data by **Fields** or built-in metadata fields, and do not use the reserved **`_budget`** field.
:::

## Collection page

On the **Manage Data** > **Collection** > **[Collection page](/docs/send-data/collection)** when editing an existing Collector or creating a new Hosted Collector there is an option, **Assign to a Budget**, that allows you to assign an ingest budget to a Collector.

![assign to a budget dropdown option.png](/img/ingestion-volume/assign-budget-dropdown-option.png)

The dropdown displays your ingest budgets in the following format:

```
<budget name> (<field value>) (<allocated capacity>)
```

For example, the screenshot above shows `CSSdev (cssdev) (19GB)`. The `<budget name>` is `CSSdev`, the `<budget name>` is `cssdev`, and the `<allocated capacity>` is `19GB`.

Select the ingest budget you want to assign to the Collector and click **Save**.

### Limited role capability

If you do not have the **Manage Ingest Budgets** [role capability](../../users-roles/roles/role-capabilities.md) but have the **Manage Collectors** capability on its own you can assign a Collector to an Ingest Budget by manually adding the field **`_budget`** with the **Field Value** from the desired Ingest Budget into the [Fields](/docs/manage/fields.md) property. For example, if you have a budget with a Field Value of **Dev_20GB**, you would add: 

![Manual budget field.png](/img/ingestion-volume/Manual-budget-field.png)

## Collector Management API

Use the [Collector Management API](/docs/api/collector-management) to assign an existing Collector to an existing ingest budget.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| fields | JSON Object | No |   |  JSON map of key-value fields (metadata) to apply to the Collector. To assign an ingest budget use the field _budget with its Field Value.<br/><br/>For example, if you have a budget with a Field Value of Dev_20GB, you would add:<br/>`fields=_budget=Dev_20GB`  | Modifiable |

The following steps can be referenced in the [Collector Management API document for a PUT request](/docs/api/collector-management#Collector-API-Methods-and-Examples "Collector API Methods and Examples"). If you are not sure what URL endpoint to use see [Sumo Logic Endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security "Sumo Logic Endpoints and Firewall Security").

First make a GET request to get the Collector's JSON configuration:

```bash
curl -v -u 'accessid:accesskey' https://api.sumologic.com/api/v1/collectors/15
```

GET response:

```
...
< ETag: "acd8c6f11f5100b047e6320f231c4f6f"
...
{
  "collector":{
    "id":102113467,
    "name":"duke-mac",
    "timeZone":"UTC",
    "fields":{

    },
    "links":[{
      "rel":"sources",
      "href":"/v1/collectors/15/sources"
    }],
    "ephemeral":false,
    "sourceSyncMode":"UI",
    "collectorType":"Installable",
    "collectorVersion":"19.130",
    "osVersion":"10.12.6",
    "osName":"Mac OS X",
    "osArch":"x86_64",
    "lastSeenAlive":1537390136406,
    "alive":true
  }
}
* Connection #0 to host api.sumologic.com left intact
```

Save the JSON to a file and modify it to include the `_budget` field with the Field Value of the ingest budget to assign. In the following example, the Field Value of the ingest budget is `sumo_budget` and the JSON file is named `updated_collector.json`.

```json
{
  "collector":{
    "id":15,
    "name":"duke-mac",
    "timeZone":"UTC",
    "fields":{
      "_budget":"sumo_budget"
    },
    "links":[{
      "rel":"sources",
      "href":"/v1/collectors/15/sources"
    }],
    "ephemeral":false,
    "sourceSyncMode":"UI",
    "collectorType":"Installable",
    "collectorVersion":"19.130",
    "osVersion":"10.12.6",
    "osName":"Mac OS X",
    "osArch":"x86_64",
    "lastSeenAlive":1537390136406,
    "alive":true
  }
}
```

Once the Collector's JSON configuration is modified with the `_budget` to assign go ahead and make the PUT request to update the Collector with this new configuration:

:::note
Updating a Collector also requires the "If-Match" header to be specified with the "ETag" provided in the headers of a previous GET request.
:::

```bash
curl -u 'accessid:accesskey' -X PUT -H "Content-Type: application/json" -H "If-Match: \"acd8c6f11f5100b047e6320f231c4f6f\"" -T updated_collector.json https://api.sumologic.com/api/v1/collectors/15
```

The response has the updated JSON and the Collector is now assigned to the ingest budget with a Field Value of `sumo_budget` :

```json
{
  "collector":{
    "id":15,
    "name":"dduke-mac",
    "timeZone":"UTC",
    "fields":{
      "_budget":"sumo_budget"
    },
    "links":[{
      "rel":"sources",
      "href":"/v1/collectors/15/sources"
    }],
    "ephemeral":false,
    "sourceSyncMode":"UI",
    "collectorType":"Installable",
    "collectorVersion":"19.130",
    "osVersion":"10.12.6",
    "osName":"Mac OS X",
    "osArch":"x86_64",
    "lastSeenAlive":1537391044526,
    "alive":true
  }
}
```

## user.properties

When registering a new Collector you can specify the parameter `fields` in [user.properties](/docs/send-data/installed-collectors/collector-installation-reference/user-properties.md) to assign the Collector to an existing ingest budget.

| Parameter | Description | Can be changed after installation? |
|:--|:--|:--|
| `fields=[list of fields]` | Comma-separated list of key=value fields. To assign an ingest budget use the field `_budget` with its Field Value. For example, if you have a budget with a Field Value of `Dev_20GB`, you would add:<br/><br/>`fields=_budget=Dev_20GB` | No, use the web interface or the Collector Management API to modify. |

## Command line installation

When using the [command line (shell script) installer](/docs/send-data/installed-collectors/collector-installation-reference/parameters-command-line-installer.md) you can assign the Collector to an existing ingest budget with the `-Vfields` parameter. For details and example commands on Collector installation, see [Install a Collector on Linux](/docs/send-data/installed-collectors/linux.md), [Install a Collector on MacOS](/docs/send-data/installed-collectors/macos.md), and [Install a Collector on Windows](/docs/send-data/installed-collectors/windows.md).

| Parameter | Description |
|:--|:--|
| `-Vfields=[list of fields]` | Comma-separated list of key=value fields. To assign an ingest budget use the field `_budget` with its Field Value. For example, if you have a budget with a Field Value of `Dev_20GB`, you would add:<br/>`-Vfields=_budget=Dev_20GB` |

 
