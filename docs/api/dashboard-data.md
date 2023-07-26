---
id: dashboard-data
title: Dashboard Data APIs (Beta)
description: Sumo Logic Dashboard Data APIs allow you to access available dashboards, retrieve a specific dashboard, or retrieve the data for all monitors.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

:::important
The Dashboard Data API is currently in Beta. For questions or support, please contact [beta-dashboard-api-group@sumologic.com](mailto:beta-dashboard-api-group@sumologic.com).
:::

The Dashboard Data API allows you to access available dashboards, retrieve a specific dashboard, or retrieve the data for all monitors (i.e., panels) on a dashboard. In order to retrieve data from a dashboard via the API, the dashboard must be in [live mode](/docs/dashboards/about).

## Authentication

Any request made to the Sumo Logic API needs to include an HTTP Basic Authentication header (see RFC 2617) generated from a user's email and password. All modern browsers (as well as command line tools like curl and wget) support basic authentication. This is secure, since all communication with the Sumo Logic service happens over TLS (SSL/HTTPS). For more information, see [API Authentication](/docs/api/getting-started/#authentication).

## Listing Available Dashboards

This section describes how to list all available dashboards and their definitions. 

**Method**: `GET` <br/>
**Endpoint**: `https://api.sumologic.com/api/v1/dashboards`

:::note
Sumo Logic endpoints like `api.sumologic.com` are different in deployments outside `us1`. You need to specify your deployment in the endpoint. For example `api.**YOUR_DEPLOYMENT**.sumologic.com` you would specify `**YOUR_DEPLOYMENT**` as either `au`, `ca`, de, `eu`, `fed`, `in`, `jp`,` us1`, or `us2`. For us1, use `api.sumologic.com`. For the others, use `api.us2.sumologic.com`, and so on. For more information, see [Sumo Logic Endpoints](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

### Headers

| Header | Value |
| :--- | :--- |
| Accept | application/json |

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| monitors | String | No | True if the result should contain the definition of all monitors for each dashboard, false otherwise. False is the default (recommended). |

### Result

A JSON document containing the definition of each dashboard and, if the monitors query parameter was set to true, the definition of all monitors.

### Sample Session

Following is a sample session using curl.

```curl
curl --trace-ascii - --user EMAIL:PASSWORD -H 'Accept: application/json' "https://api.sumologic.com/api/v1/dashboards?monitors=false"

0000: GET /api/v1/dashboards?monitors=false HTTP/1.1
0030: Authorization: Basic ZGFkZHlAZGVtby5jb206QkYxMm5qa2Q=
0067: User-Agent: curl/7.30.0
0080: Host: api.sumologic.com
0099: Accept: application/json
00b3:
<= Recv header, 17 bytes (0x11)
0000: HTTP/1.1 200 OK
<= Recv header, 38 bytes (0x26)
0000: Cache-control: no-cache="set-cookie"
<= Recv header, 32 bytes (0x20)
0000: Content-Type: application/json
<= Recv header, 37 bytes (0x25)
0000: Date: Sun, 06 Oct 2013 18:40:12 GMT
<= Recv header, 40 bytes (0x28)
0000: Expires: Thu, 01-Jan-1970 00:00:00 GMT
<= Recv header, 60 bytes (0x3c)
0000: Set-Cookie: JSESSIONID=1t6b4ps5u6g3dq7a5czcna5de;Path=/api
<= Recv header, 166 bytes (0xa6)
0000: Set-Cookie: AWSELB=D5C1176F0665104977B708B0B48E6FFEC09E311CD1EC4
0040: 51E46A989E25A20FD856E229589F00580EC5CCC2FF5028B92E5DA7F3AD559CEE
0080: 48166CCEA8216D9091F529236BC08;PATH=/
<= Recv header, 43 bytes (0x2b)
0000: Strict-Transport-Security: max-age=604800
<= Recv header, 22 bytes (0x16)
0000: Content-Length: 5905
<= Recv header, 24 bytes (0x18)
0000: Connection: keep-alive
<= Recv header, 2 bytes (0x2)
0000:
<= Recv data, 5905 bytes (0x1711)
0000: {"dashboards":[{"properties":"{\\"showColumnTitles\\":false}","id"
0040: :348995,"description":null,"title":"0 SYSTEM - Search All","dash
0080: boardMonitors":[]},
...
{"dashboards":[{"properties":"{\\"showColumnTitles\\":false}","id":348995,"description":null,"title":"0 SYSTEM - Search All","dashboardMonitors":[]},
...
```

The result is a JSON object with one key: **dashboards**. The value for the key is an array of dashboard definitions. In this example, the dashboard definition for the first entry in the array is:

```json
{
   "properties":"{\\"showColumnTitles\\":false}",
   "id":348995,
   "description":null,
   "title":"0 SYSTEM - Search All",
   "dashboardMonitors":[
   ]
}
```

## Getting a Dashboard

This section describes how to get a dashboard, its definition, and the definition of all monitors.

**Method**: `GET`<br/>
**Endpoint**: `https://api.sumologic.com/api/v1/dashboards/DASHBOARD_ID`

:::note
Sumo Logic endpoints like `api.sumologic.com` are different in deployments outside `us1`. You need to specify your deployment in the endpoint. For example `api.**YOUR_DEPLOYMENT**.sumologic.com` you would specify `**YOUR_DEPLOYMENT**` as either `au`, `ca`, de, `eu`, `fed`, `in`, `jp`,` us1`, or `us2`. For us1, use `api.sumologic.com`. For the others, use `api.us2.sumologic.com`, and so on. For more information, see [Sumo Logic Endpoints](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

### Headers

| Header | Value |
| :--- | :--- |
| Accept | application/json |

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| dashboardId | String | Yes | The ID of the dashboard for which to return the definition |

### Result

A JSON document containing the definition of the dashboard as well as the definition of each monitor contained on the dashboard.

### Sample Session

Following is a sample session using curl.

```
curl --trace-ascii - --user EMAIL:PASSWORD -H 'Accept: application/json' "https://api.sumologic.com/api/v1/dashboards/348995"

== Info: Adding handle: conn: 0x7fac91003a00
== Info: Adding handle: send: 0
== Info: Adding handle: recv: 0
== Info: Curl_addHandleToPipeline: length: 1
== Info: - Conn 0 (0x7fac91003a00) send_pipe: 1, recv_pipe: 0
== Info: About to connect() to api.sumologic.com port 443 (#0)
== Info:   Trying 107.22.230.221...
== Info: Connected to api.sumologic.com (107.22.230.221) port 443 (#0)
== Info: TLS 1.0 connection using TLS_RSA_WITH_AES_128_CBC_SHA
== Info: Server certificate: sumologic.com
== Info: Server certificate: GeoTrust Extended Validation SSL CA
== Info: Server certificate: GeoTrust Primary Certification Authority
== Info: Server auth using Basic with user 'EMAIL'
=> Send header, 173 bytes (0xad)
0000: GET /api/v1/dashboards/348995 HTTP/1.1
0028: Authorization: Basic ZGFkZHlAZGVtby5jb206QkYxMm5qa2Q=
005f: User-Agent: curl/7.30.0
0078: Host: api.sumologic.com
0091: Accept: application/json
00ab:
<= Recv header, 17 bytes (0x11)
0000: HTTP/1.1 200 OK
<= Recv header, 38 bytes (0x26)
0000: Cache-control: no-cache="set-cookie"
<= Recv header, 32 bytes (0x20)
0000: Content-Type: application/json
<= Recv header, 37 bytes (0x25)
0000: Date: Sun, 06 Oct 2013 21:03:02 GMT
<= Recv header, 40 bytes (0x28)
0000: Expires: Thu, 01-Jan-1970 00:00:00 GMT
<= Recv header, 61 bytes (0x3d)
0000: Set-Cookie: JSESSIONID=1nu7v4chfsdnz15ojsr3di7b0y;Path=/api
<= Recv header, 166 bytes (0xa6)
0000: Set-Cookie: AWSELB=D5C1176F0665104977B708B0B48E6FFEC09E311CD1C6F
0040: 29E2ACA16815BCCF61834DF4BE105580CEABB2A7F9C3F05E5C7D3D15ED600409
0080: 1A1F4206E23035E8A707C5DB45D6C;PATH=/
<= Recv header, 43 bytes (0x2b)
0000: Strict-Transport-Security: max-age=604800
<= Recv header, 28 bytes (0x1c)
0000: transfer-encoding: chunked
<= Recv header, 24 bytes (0x18)
0000: Connection: keep-alive
<= Recv header, 2 bytes (0x2)
0000:
<= Recv data, 12774 bytes (0x31e6)
0000: 31de
0006: {"dashboard":{"properties":"{\\"showColumnTitles\\":false}","id":3
0046: 48995,"description":null,"title":"0 SYSTEM - Search All","dashbo
0086: ardMonitors":[{"properties":"{\\"version\\":2,\\"settings\\":{\\"table
...
{"dashboard":{"properties":"{\\"showColumnTitles\\":false}","id":348995,"description":null,"title":"0 SYSTEM - Search All","dashboardMonitors":[{"properties":"{\\"version\\":2,\"settings\\":{\\"table\\":{\\"small\\":
...
```

The result is a JSON object with one key: **`dashboard`**. The value contains the definition of the dashboard as well as a JSON array in which each entry represents one of the monitors contained on the dashboard.

```json
{
   "dashboard":{
      "properties":"{\\"showColumnTitles\\":false}",
      "id":348995,
      "description":null,
      "title":"0 SYSTEM - Search All",
      "dashboardMonitors":[
         {
            "properties":"{\\"version\\":2,\\"settings\\":{\\"table\\":{\\"small\\":{\\"version\\":2,\\"detailLevel\\":\\"small\\",\\"configuration\\":{\\"textTruncationMode\\":\\"end\\",\\"fontSize\\":\\"small\\",\\"fontSizeOverride\\":null,\\"drilldown\\":{\\"fallback\\":{\\"target\\":{\\"name\\":null}}}}},\\"medium\\":{\\"version\\":2,\\"detailLevel\\":\\"medium\\",\\"configuration\\":{\\"textTruncationMode\\":\\"end\\",\\"fontSize\\":\\"small\\",\\"fontSizeOverride\\":null,\\"drilldown\\":{\\"fallback\\":{\\"target\\":{\\"name\\":null}}}}},\\"large\\":{\\"version\\":2,\\"detailLevel\\":\\"large\\",\\"configuration\\":{\\"textTruncationMode\\":\\"end\\",\\"fontSize\\":\\"small\\",\\"fontSizeOverride\\":null,\\"drilldown\\":{\\"fallback\\":{\\"target\\":{\\"name\\":null}}}}}},\\"bar\\":{\\"small\\":{\\"version\\":2,\\"detailLevel\\":\\"small\\",\\"chartType\\":\\"bar\\",\\"configuration\\":{\\"colors\\":{\\"index\\":null,\\"overrides\\":null},\\"legend\\":{\\"enabled\\":false,\\"position\\":\\"right\\"},\\"plotOptions\\":{\\"stacking\\":null,\\"lineToArea\\":false},\\"xAxis\\":{\\"title\\":null,\\"label\\":{\\"truncationMode\\":\\"middle\\"}},\\"yAxis\\":{\\"title\\":null,\\"logScale\\":false,\\"min\\":null,\\"max\\":null,\\"bands\\":null},\\"drilldown\\":{\\"fallback\\":{\\"target\\":{\\"name\\":null}}}}},\\"medium\\":{\\"version\\":2,\\"detailLevel\\":\\"medium\\",\\"chartType\\":\\"bar\\",\\"configuration\\":{\\"colors\\":{\\"index\\":null,\\"overrides\\":null},\\"legend\\":{\\"enabled\\":true,\\"position\\":\\"right\\"},\\"plotOptions\\":{\\"stacking\\":null,\\"lineToArea\\":false},\\"xAxis\\":{\\"title\\":null,\\"label\\":{\\"truncationMode\\":\\"middle\\"}},\\"yAxis\\":{\\"title\\":null,\\"logScale\\":false,\\"min\\":null,\\"max\\":null,\\"bands\\":null},\\"drilldown\\":{\\"fallback\\":{\\"target\\":{\\"name\\":null}}}}},\\"large\\":{\\"version\\":2,\\"detailLevel\\":\\"large\\",\\"chartType\\":\\"bar\\",\\"configuration\\":{\\"colors\\":{\\"index\\":null,\\"overrides\\":null},\\"legend\\":{\\"enabled\\":true,\\"position\\":\\"right\\"},\\"plotOptions\\":{\\"stacking\\":null,\\"lineToArea\\":false},\\"xAxis\\":{\\"title\\":null,\\"label\\":{\\"truncationMode\\":\\"middle\\"}},\\"yAxis\\":{\\"title\\":null,\\"logScale\\":false,\\"min\\":null,\\"max\\":null,\\"bands\\":null},\\"drilldown\\":{\\"fallback\\":{\\"target\\":{\\"name\\":null}}}}}},\\"column\\":{\\"small\\":{\\"version\\":2,\\"detailLevel\\":\\"small\\",\\"chartType\\":\\"column\\",\\"configuration\\":{\\"colors\\":{\\"index\\":null,\\"overrides\\":null},\\"legend\\":{\\"enabled\\":false,\\"position\\":\\"right\\"},\\"plotOptions\\":{\\"stacking\\":null,\\"lineToArea\\":false},\\"xAxis\\":{\\"title\\":null,\\"label\\":{\\"truncationMode\\":\\"middle\\"}},\\"yAxis\\":{\\"title\\":null,\\"logScale\\":false,\\"min\\":null,\\"max\\":null,\\"bands\\":null},\\"drilldown\\":{\\"fallback\\":{\\"target\\":{\\"name\\":null}}}}},\\"medium\\":{\\"version\\":2,\\"detailLevel\\":\\"medium\\",\\"chartType\\":\\"column\\",\\"configuration\\":{\\"colors\\":{\\"index\\":null,\\"overrides\\":null},\\"legend\\":{\\"enabled\\":true,\\"position\\":\\"right\\"},\\"plotOptions\\":{\\"stacking\\":null,\\"lineToArea\\":false},\\"xAxis\\":{\\"title\\":null,\\"label\\":{\\"truncationMode\\":\\"middle\\"}},\\"yAxis\\":{\\"title\\":null,\\"logScale\\":false,\\"min\\":null,\\"max\\":null,\\"bands\\":null},\\"drilldown\\":{\\"fallback\\":{\\"target\\":{\\"name\\":null}}}}},\\"large\\":{\\"version\\":2,\\"detailLevel\\":\\"large\\",\\"chartType\\":\\"column\\",\\"configuration\\":{\\"colors\\":{\\"index\\":null,\\"overrides\\":null},\\"legend\\":{\\"enabled\\":true,\\"position\\":\\"right\\"},\\"plotOptions\\":{\\"stacking\\":null,\\"lineToArea\\":false},\\"xAxis\\":{\\"title\\":null,\\"label\\":{\\"truncationMode\\":\\"middle\\"}},\\"yAxis\\":{\\"title\\":null,\\"logScale\\":false,\\"min\\":null,\\"max\\":null,\\"bands\\":null},\\"drilldown\\":{\\"fallback\\":{\\"target\\":{\\"name\\":null}}}}}},\\"line\\":{\\"small\\":{\\"version\\":2,\\"detailLevel\\":\\"small\\",\\"chartType\\":\\"line\\",\\"configuration\\":{\\"colors\\":{\\"index\\":null,\\"overrides\\":null},\\"legend\\":{\\"enabled\\":false,\\"position\\":\\"right\\"},\\"plotOptions\\":{\\"stacking\\":null,\\"lineToArea\\":false},\\"xAxis\\":{\\"title\\":null,\\"label\\":{\\"truncationMode\\":\\"middle\\"}},\\"yAxis\\":{\\"title\\":null,\\"logScale\\":false,\\"min\\":null,\\"max\\":null,\\"bands\\":null},\\"drilldown\\":{\\"fallback\\":{\\"target\\":{\\"name\\":null}}}}},\\"medium\\":{\\"version\\":2,\\"detailLevel\\":\\"medium\\",\\"chartType\\":\\"line\\",\\"configuration\\":{\\"colors\\":{\\"index\\":null,\\"overrides\\":null},\\"legend\\":{\\"enabled\\":true,\\"position\\":\\"right\\"},\\"plotOptions\\":{\\"stacking\\":null,\\"lineToArea\\":false},\\"xAxis\\":{\\"title\\":null,\\"label\\":{\\"truncationMode\\":\\"middle\\"}},\\"yAxis\\":{\\"title\\":null,\\"logScale\\":false,\\"min\\":null,\\"max\\":null,\\"bands\\":null},\\"drilldown\\":{\\"fallback\\":{\\"target\\":{\\"name\\":null}}}}},\\"large\\":{\\"version\\":2,\\"detailLevel\\":\\"large\\",\\"chartType\\":\\"line\\",\\"configuration\\":{\\"colors\\":{\\"index\\":null,\\"overrides\\":null},\\"legend\\":{\\"enabled\\":true,\\"position\\":\\"right\\"},\\"plotOptions\\":{\\"stacking\\":null,\\"lineToArea\\":false},\\"xAxis\\":{\\"title\\":null,\\"label\\":{\\"truncationMode\\":\\"middle\\"}},\\"yAxis\\":{\\"title\\":null,\\"logScale\\":false,\\"min\\":null,\\"max\\":null,\\"bands\\":null},\\"drilldown\\":{\\"fallback\\":{\\"target\\":{\\"name\\":null}}}}}}}}",
            "id":348996,
            "queryString":"_sourcecategory=stream \\"[call=InboundStreamProtocol.executeQuery] [explainPlan] exiting search,\\" !GURR\n| parse regex \\"(?<null1>\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2},\\d{3} -\\d{4} INFO)\\"\\n| parse \\"customerId=*,\\" as org_id\\n| parse \\"User:*:\\" as user\\n| lookup org_name as org_name, account_type as account_type from christian/config/organizations on org_id = org_id\\n| count org_id, org_name, account_type, user\\n| sort _count",
            "disabled":false,
            "width":0,
            "y":1,
            "x":0,
            "title":"All Searches By User",
            "queryId":"1273687561743599",
            "viewerType":"table",
            "detailLevel":2,
            "timeRange":"[{\\"t\\":\\"relative\\",\\"d\\":-86400000}]",
            "savedSearchId":-1,
            "height":0,
            "isDisabled":false,
            "dashboardId":348995
         },
         ...
      ]
   }
}
```

## Getting Dashboard Data

This section describes how to get the data for all monitors contained on a dashboard.

**Method**: GET<br/>
**Endpoint**: `https://api.sumologic.com/api/v1/dashboards/DASHBOARD_ID/data`

:::note
Sumo Logic endpoints like `api.sumologic.com` are different in deployments outside `us1`. You need to specify your deployment in the endpoint. For example `api.**YOUR_DEPLOYMENT**.sumologic.com` you would specify `**YOUR_DEPLOYMENT**` as either `au`, `ca`, de, `eu`, `fed`, `in`, `jp`,` us1`, or `us2`. For us1, use `api.sumologic.com`. For the others, use `api.us2.sumologic.com`, and so on. For more information, see [Sumo Logic Endpoints](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security "Sumo Logic Endpoints and Firewall Security").
:::

### Headers

| Header | Value |
| :--- | :--- |
| Accept | application/json |

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| dashboardId | String | Yes | The ID of the dashboard for which to return the data of all contained monitors |

### Result

A JSON document containing the data for all monitors contained on the dashboard.

### Sample Session

Following is a sample session using curl.

```
curl --trace-ascii - --user EMAIL:PASSWORD -H 'Accept: application/json' "https://api.sumologic.com/api/v1/dashboards/1200439/data"

== Info: Adding handle: conn: 0x7f9da2003a00
== Info: Adding handle: send: 0
== Info: Adding handle: recv: 0
== Info: Curl_addHandleToPipeline: length: 1
== Info: - Conn 0 (0x7f9da2003a00) send_pipe: 1, recv_pipe: 0
== Info: About to connect() to api.sumologic.com port 443 (#0)
== Info:   Trying 107.22.230.221...
== Info: Connected to api.sumologic.com (107.22.230.221) port 443 (#0)
== Info: TLS 1.0 connection using TLS_RSA_WITH_AES_128_CBC_SHA
== Info: Server certificate: sumologic.com
== Info: Server certificate: GeoTrust Extended Validation SSL CA
== Info: Server certificate: GeoTrust Primary Certification Authority
== Info: Server auth using Basic with user 'EMAIL'
=> Send header, 179 bytes (0xb3)
0000: GET /api/v1/dashboards/1200439/data HTTP/1.1
002e: Authorization: Basic ZGFkZHlAZGVtby5jb206QkYxMm5qa2Q=
0065: User-Agent: curl/7.30.0
007e: Host: api.sumologic.com
0097: Accept: application/json
00b1:
<= Recv header, 17 bytes (0x11)
0000: HTTP/1.1 200 OK
<= Recv header, 38 bytes (0x26)
0000: Cache-control: no-cache="set-cookie"
<= Recv header, 32 bytes (0x20)
0000: Content-Type: application/json
<= Recv header, 37 bytes (0x25)
0000: Date: Sun, 06 Oct 2013 21:18:17 GMT
<= Recv header, 40 bytes (0x28)
0000: Expires: Thu, 01-Jan-1970 00:00:00 GMT
<= Recv header, 60 bytes (0x3c)
0000: Set-Cookie: JSESSIONID=n484c7ogvupl190c1o6dzydnn;Path=/api
<= Recv header, 166 bytes (0xa6)
0000: Set-Cookie: AWSELB=D5C1176F0665104977B708B0B48E6FFEC09E311CD1C6F
0040: 29E2ACA16815BCCF61834DF4BE105580CEABB2A7F9C3F05E5C7D3D15ED600409
0080: 1A1F4206E23035E8A707C5DB45D6C;PATH=/
<= Recv header, 43 bytes (0x2b)
0000: Strict-Transport-Security: max-age=604800
<= Recv header, 22 bytes (0x16)
0000: Content-Length: 7460
<= Recv header, 24 bytes (0x18)
0000: Connection: keep-alive
<= Recv header, 2 bytes (0x2)
0000:
<= Recv data, 7460 bytes (0x1d24)
0000: {"id":1200439,"dashboardMonitorDatas":[{"fields":[{"keyField":tr
0040: true,"name":"latitude","fieldType":"double"},{"keyField":true,"name
0080: e":"longitude","fieldType":"double"},{"keyField":true,"name":"co
...
{"id":1200439,"dashboardMonitorDatas":[{"fields":[{"keyField":true,"name":"latitude","fieldType":"double"},{"keyField":true,"name":"longitude","fieldType":"double"},{"keyField":true,"name":"country_name","fieldType":"string"},
...
```

The result is a JSON object containing a key, **`dashboardMonitorDatas`**, the value of which is an array with one entry for each monitor contained on the dashboard. Each monitor entry contains the details of the current data for the monitor.

```json
{
   "id":1200439,
   "dashboardMonitorDatas":[
      {
         "fields":[
            {
               "keyField":true,
               "name":"latitude",
               "fieldType":"double"
            },
            ...
         ],
         "id":1200440,
         "records":[
            {
               "map":{
                  "_count":"11779",
                  "area_code":"0",
                  "longitude":"-97.0",
                  "latitude":"38.0",
                  "country_name":"United States"
               }
            },
            ...
          ]
       }
    ]
}
```
