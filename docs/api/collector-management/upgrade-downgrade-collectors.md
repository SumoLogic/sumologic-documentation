---
id: upgrade-downgrade-collectors
title: Upgrade or Downgrade Collectors Using the API
sidebar_label: Upgrade or Downgrade Collectors
---

View and manage the software versions of your Installed Collectors through HTTP endpoints. Use these HTTP endpoints to upgrade or downgrade Collectors. We recommend you follow our [best practices](/docs/send-data/collection/upgrade-collectors#collector-upgrade-best-practices) when you upgrade your Collectors.

:::warning
Collector Management APIs are not yet built with OpenAPI specifications and therefore not included in our [Swagger docs](https://api.sumologic.com/docs/). Instead, refer to the below documentation.
:::

The upgrade may automatically be done in increments. In this case, you may experience longer upgrade times.

There is a community-supported script available on GitHub that allows you to conduct bulk actions to Collectors, see [Collector Management Script](https://github.com/SumoLogic/collector-management-client).

## Timeout

If an upgrade task does not complete successfully after 30 minutes, it will automatically time out with a status of `failed`.

## GET methods

### Get upgradable Collectors

<details>
<summary><span className="api get">GET</span><code>collectors/upgrades/collectors</code></summary>
<p/>

Sends a request to get Collectors you can upgrade.

**Request Headers**

| Key          | Value              |
|:------------ |:------------------ |
| Content-Type | `application/json` |
| Accept       | `application/json` |


**Query Parameters**

| Parameter | Type   | Required | Default        | Description                                |
|:--------- |:------ |:-------- |:-------------- |:------------------------------- |
| `toVersion` | String | No       | Latest Version | Collector build to upgrade (or downgrade) to. If not specified, upgrades to the latest version. |
| `offset`    | Int    | No       | 0              | Offset into the list of Collectors.                                                             |
| `limit`     | Int    | No       | 50             | Maximum number of Collectors to return.                                                         |


**Status Code**

| Code | Text                   | Description            |
|:---- |:---------------------- |:----------------------------------------------- |
| `200`  | OK                     | Upgradable Collectors were retrieved and provided in the response payload. |
| `415`  | Unsupported Media Type | Content-Type wasn't set to `application/json`.                             |
| `400`  | Bad Request            | A parameter wasn't valid.                                                  |

**Success Result**

A JSON document containing the upgradable collectors.

**Sample Session**

```bash title="Sample request"
curl -i -u "<accessId>:<accessKey>" -X GET https://api.sumologic.com/api/v1/collectors/upgrades/collectors
```

```json title="Sample response"
{
    "collectors": [
        {
            "id": 100000000,
            "name": "SumoCollector_Local",
            "hostName": "TestHost",
            "timeZone": "UTC",
            "links": [
                {
                    "rel": "sources",
                    "href": "/v1/collectors/100000000/sources"
                }
            ],
            "ephemeral": false,
            "sourceSyncMode": "UI",
            "collectorType": "Installable",
            "collectorVersion": "20.1-2749",
            "osVersion": "10.11.5",
            "osName": "Mac OS X",
            "osArch": "x86_64",
            "lastSeenAlive": 1465848876035,
            "alive": true
        }
    ]
}
```
</details>

---
### Get available builds

<details>
<summary><span className="api get">GET</span><code>/collectors/upgrades/targets</code></summary>
<p/>

**Request Headers**

| Key          | Value              |
|:------------ |:------------------ |
| Content-Type | `application/json` |
| Accept       | `application/json` |

**Query Parameters**

None

**Status Code**

| Code | Text                   | Description                                                      |
|:---- |:---------------------- |:------------------------------ |
| `200`  | OK                     | The build information has been returned in the response payload. |
| `415`  | Unsupported Media Type | Content-Type wasn't set to `application/json`.                   |


**Success Result**

A JSON document containing the versions of collector builds, which includes the following fields.

| Field   | Data Type | Description                    |
| :-------| :--------|:------------------------------ |
| `version` | string    | Version of the collector build.  |
| `latest`  | boolean   | Whether it's the latest version. |

#### Examples

```bash title="Sample request"
curl -i -u "<accessId>:<accessKey>" -X GET https://api.sumologic.com/api/v1/collectors/upgrades/targets
```

```json title="Sample response"
{
  "targets": [
  {
    "version": "19.115-37",
    "latest": false
  },
  ...
  {
    "version": "20.1-2749",
    "latest": true
  }
 ]
}
```
</details>

---
### Get upgrade task status

<details>
<summary><span className="api get">GET</span><code>/collectors/upgrades/&#123;upgradeTaskID&#125;</code></summary>
<p/>

After obtaining the upgrade job ID, you can obtain the status of the upgrade task from the status endpoint.

**Request Headers**

| Key          | Value              |
| :----------- | :----------------- |
| Content-Type | `application/json` |
| Accept       | `application/json` |


**Query Parameters**

| Parameter     | Type | Required | Description                    |
|:------------- |:---- |:-------- |:------------------------------ |
| `upgradeTaskID` | Long | Yes      | Task ID from the upgrade task. |


**Status Code**

| Code | Text                   | Description        |
|:---- |:---------------------- |:--------------------- |
| `200`  | OK                     | The upgrade task status has been returned in the response. |
| `415`  | Unsupported Media Type | Content-Type wasn't set to `application/json`.             |
| `404`  | Not found              | The upgrade task ID was not found.                         |

**Success Result**

A success result generates a JSON document containing the upgrade task status, including the following fields.

|Field        |Description                             |
|:------------|:--------------------------------------|
|`collectorId`  |Collector ID of this upgrade task (long).           |
|`toVersion`    |Target version of this upgrade task (string).         |
|`requestedTime`|UNIX timestamp when the upgrade task is requested (long).  |
|status    | Status code for the upgrade task (integer):<br/>0 - not started<br/>1 - pending, the upgrade is issued awaiting a response from the Collector.<br/>2 - succeeded<br/>3 - failed<br/>6 - Progressing, the upgrade is running on the Collector.|
|`message`      |Any additional message, normally a failed reason (string).   |

**Sample session**

```bash title="Sample request"
curl -i -u "<accessId>:<accessKey>" -X GET https://api.sumologic.com/api/v1/collectors/upgrades/12345
```

```json title="Sample response"
{
    "upgrade": {
        "id": 12345,
        "collectorId": 100000000,
        "toVersion": "19.152-1",
        "requestTime": 1465855411044,
        "status": 2,
        "message": ""
    }
}
```
</details>

## POST Methods

### Create an upgrade or downgrade task

<details>
<summary><span className="api post">POST</span><code>/collectors/upgrades</code></summary>
<p/>

**Request Headers**

|Key         |Value             |
|:-----------|:-----------------|
|Content-Type|`application/json`|
|Accept      |`application/json`|

**Query Parameters**

None

**JSON Payload Parameters**

|Parameter  |Type  |Required|Default       |Description                                                                                    |
|:----------|:-----|:-------|:-------------|:----------------------------------------------------------------------------------------------|
|collectorId|Long  |Yes     |              |Identifier of the Collector to upgrade (or downgrade).                                         |
|toVersion  |String|No      |Latest version|Collector build to upgrade (or downgrade) to. If not specified, upgrades to the latest version.|

**Status Code**

|Code|Text                  |Description                                     |
|:---|:---------------------|:-----------------------------------------------|
|202 |Accepted              |The upgrade task has been created successfully. |
|415 |Unsupported Media Type|`Content-Type` wasn't set to `application/json`.|
|400 |Bad Request           |Generic request error by the client.            |

**Success Result**

With success, a JSON document is returned containing the ID and link of the newly created upgrade task. This is an opaque string to use for following upgrade status checking API.

**Error Result**

A status code 400 will be returned with following error codes.

|Code                     |Description        |
|:------------------------|:-------|
|collector.invalid        |The Collector ID was not provided, doesn't exist, or the user doesn't have permission to use it.|
|collector.type.invalid   |The Collector is not an Installed Collector (it is a Hosted Collector).                         |
|collector.not.alive      |The Collector is not running.                                                                   |
|collector.in.upgrading   |The Collector is currently being upgraded.                                                      |
|collector.version.invalid|The upgrade version was not provided, or the version is not valid.                              |

**Sample Session**

```bash title="Sample request"
curl -i -u "<accessId>:<accessKey>" -H "Content-Type: application/json" -X POST -d '{"collectorId":100000000,"toVersion":"19.152-1"}'
https://api.sumologic.com/api/v1/collectors/upgrades
```

```json title="Sample response"
{
    "id": "12345",
    "link": {
        "rel": "self",
        "href": "/v1/collectors/upgrades/12345"
    }
}
```

</details>
