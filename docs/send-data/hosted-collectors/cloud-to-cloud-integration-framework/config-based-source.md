---
id: config-based-source
title: Config Based Source
sidebar_label: STIX/TAXII 2 Client
tags:
  - cloud-to-cloud
  - config
  - based
description: Learn how to set up a Config Based C2C to collect data into the Sumo Logic environment.
---

import CodeBlock from '@theme/CodeBlock';
import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

[Config Based C2C]

:::note
This source is available in the [Fed deployment](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

## Data collected

## Setup

### Vendor configuration

1. Identify a vendor who provides the data that should be ingested.
1. Follow their documentation to obtain the required configuration:
   - Authentication
   - Endpoint specific request information
   - Rate limit
   - Location of the log data from the API response
   - Pagination

### Source configuration

When you create an Config Based Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Config Based Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Config Based**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM.
1. (Optional) **Parser path**. If **Forward to SIEM** option is selected, provide a parser path if available.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   - ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   - ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Authentication Configuration**. This section configures the authentication that is required by the vendor's API.
   1. **Authentication type**. Select one of currently supported authentication types: APIKey, Basic, or Bearer. If no authentication is required, select None. The deafault is Basic.
      1. **APIKey**. Involves passing a non-expired/static token in the request header or query parameters, with a customizable token name.
         1. **Name**. Name of the APIKey parameter.
         1. **Value**. API key itself.
         1. **Style**. Represents how the API key should be sent in the request. Possible options: In Params (1), In Header (2), In Query String (3). By default, the API-Key is passed in the header of the request.
            1. **AuthStyleInParams**. Send the credentials in the POST body as application/x-www-form-urlencoded parameters.
            1. **AuthStyleInHeader**. Send the credentials using HTTP Basic Authorization.
            1. **AuthStyleInQueryString**. Send the credentials in the query parameters.
         1. **Prefix**. The prefix used with the apikey. By default the value is empty and no prefix will be used.
      1. **Basic**. Requires the user's username and password to be provided in the request header.
         1. **Username**. Basic auth username.
         1. **Password**. Basic auth password.
      1. **Bearer**. Requires a non-expired/static bearer token to be included in the Authorization header.
         1. **Token**. Token is the actual non-expirable authentication token.
         1. **Prefix**. The prefix used with the token (e.g., "Bearer"). If not specified, the default prefix "Bearer" will be used.
1. **Request Configuration**. This section configures the request that is created for the first call to the vendor's API within the polling cycle. This component prepares, executes and makes it ready for the next polling cycle. For now we only support HTTP requests.
   1. **Method**. The HTTP method used in the request. Possible values: GET, POST. Default value: GET.
   1. **Endpoint**. The original api endpoint URL as a string that the requestor will append parameters to.
   1. **Body**. The HTTP body which is put through the Go template engine. If not specified, the default empty value will be used.
   1. **Params**. The url parameters where the key is a string and the value is also a string but is put through the Go template engine. If not specified, no params will be used.
   1. **Headers**. The HTTP request headers where the key is a string and the value is also a string but is put through the Go template engine. If not specified, no headers will be used.
1. **Tracking Progression**. This section configures how the source will track its progression over time. For now we only support Time Window.
   1. **Time Window**
      1. **Initial Lookback**. How far back from current time to start the window upon source creation. Must be between window size and 31d. If not specified, the default value 24h will be used.
      1. **Max Lookback**. How far back the window is allowed to go based on the third party APIs data retention policy. Must be between window size and 365d. If not specified, the default value 31d will be used.
      1. **Size**. The maximum size of the window chunk. Must be between 1m and 24h. If not specified, the default value 5m will be used.
1. **HTTP Client Configuration**. This section configures the HTTP Client used for API calls.
   1. **Timeout Duration**. How long the source allows the HTTP connection to live before closing it and setting the health to a timeout error. Must be between window size and 31d. If not specified, the default value 5m will be used.
   1. **Timeout Retries**. The source will automatically retry without waiting for the next poll interval this many times for some errors such as 500 Internal Server. If not specified, the default value 5 will be used.
   1. **Rate Limit Reqs**. The number of HTTP requests the source is allowed to make within the rate limit duration. If not specified, the default value 1000 will be used.
   1. **Rate Limit Duration**. The duration the rate limit requests, must be between 1s and 1h. If not specified, the default value 1m will be used.
   1. **Rate Limit Burst**. The number of requests the source is allowed to burst. If not specified, the default value 1000 will be used.
1. **Response Log Ingest Configuration**. This section configures the location of the log data from the API response. For now we only support JSON data.
   1. **JSON**. Multiple result configurations can be added and at least one is required.
      For paths and locations we decided to go with the JSONPath standard.
      Different vendors are returning timestamps in different formats. For time parsing, we plan to add
      Time parsing functionality in the future to use sumo time. For now, time format needs to be provided using Golang time format.
      1. **Result Path**. JPath to the array of logs to ingest.
      1. **Timestamp Path**. JPath to the log timestamp. If not specified, the default value of current time will be used.
      1. **Time Format**. Log Timestamp Format. Has to be configured when Timestamp Path is provided.
1. **Pagination Configurationn**. This section configures the paginator component. It handles the API response data pagination and checks if there is a next page of results. For now we only support Link Headers pagination.
   1. **LinkHeaders**. This pagination is described in [RFC 8288](https://www.rfc-editor.org/rfc/rfc8288). It is used to handle pagination where the next page URL is included in the Link HTTP response header or in the response body.
      1. **Headers**. Next page URL is in the response headers.
      1. **Body**. Next page URL is in the response body.
         1. **JsonPath**. A JSON Path to the appropriate body property. If not specified, empty value weill be used.
1. (Optional) **Polling Interval**. Set how frequently to poll for new data. It must be between 5 minutes and 48 hours
1. When you are finished configuring the Source, click **Save**.

## JSON Configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter  | Type        | Value                                         | Required | Description                      |
| :--------- | :---------- | :-------------------------------------------- | :------- | :------------------------------- |
| schemaRef  | JSON Object | `{"type":"TAXII 2 Client"}`                   | Yes      | Define the specific schema type. |
| sourceType | String      | `"Universal"`                                 | Yes      | Type of source.                  |
| config     | JSON Object | [Configuration object](#configuration-object) | Yes      | Source type specific values.     |

### Configuration Object

| Parameter               | Type        | Required | Default       | Description                                                                                                                                                                                                                              | Example                                                                                                                                                                                                                                                   |
| :---------------------- | :---------- | :------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                    | String      | Yes      | `null`        | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`.                                | `"mySource"`                                                                                                                                                                                                                                              |
| description             | String      | No       | `null`        | Type a description of the source.                                                                                                                                                                                                        | `"Testing source"`                                                                                                                                                                                                                                        |
| category                | String      | No       | `null`        | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`                                                                                                                                                                                                                                         |
| parserPath              | String      | No       | `null`        | The path to a parser. name                                                                                                                                                                                                               |                                                                                                                                                                                                                                                           |
| fields                  | JSON Object | No       | `null`        | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.                                                                                          | `{"_siemForward": false, "fieldA": "valueA"}`                                                                                                                                                                                                             |
| authType                | String      | Yes      | `Basic`       | Authentication type.                                                                                                                                                                                                                     | `"authType": "APIKey"`                                                                                                                                                                                                                                    |
| apiKeyName              | String      | Yes      | `2.1`         | Name of the API-Key parameter.                                                                                                                                                                                                           | `"apiKeyName": "Authorization"`                                                                                                                                                                                                                           |
| apiKeyValue             | String      | Yes      | `null`        | API-Key itself.                                                                                                                                                                                                                          | `"apiKeyValue": "value"`                                                                                                                                                                                                                                  |
| apiKeyAuthStyle         | Integer     | Yes      | `2`           | Represents how the API key should be sent in the request. Possible options: In Params (1), In Header (2), In Query String (3).                                                                                                           | `"apiKeyAuthStyle": 2`                                                                                                                                                                                                                                    |
| apiKeyPrefix            | String      | No       | `null`        | The prefix used with the apikey.                                                                                                                                                                                                         | `"apiKeyPrefix": "SSWS"`                                                                                                                                                                                                                                  |
| basicUsername           | String      | Yes      | `null`        | Basic auth username.                                                                                                                                                                                                                     | `"basicUsername": "username"`                                                                                                                                                                                                                             |
| basicPassword           | String      | Yes      | `null`        | Basic auth password.                                                                                                                                                                                                                     | `"basicPassword": "password"`                                                                                                                                                                                                                             |
| bearerToken             | String      | Yes      | `null`        | Token is the actual non-expirable authentication token.                                                                                                                                                                                  | `"bearerToken": "token"`                                                                                                                                                                                                                                  |
| bearerPrefix            | String      | No       | `Bearer`      | The prefix used with the token (e.g., "Bearer").                                                                                                                                                                                         | `"bearerPrefix": "SSWS"`                                                                                                                                                                                                                                  |
| requestMethod           | String      | Yes      | `GET`         | The HTTP method used in the request.                                                                                                                                                                                                     | `"requestMethod": "GET"`                                                                                                                                                                                                                                  |
| requestEndpoint         | String      | Yes      | `null`        | The original api endpoint URL as a string that the requestor will append parameters to.                                                                                                                                                  | `"requestEndpoint": "endpoint"`                                                                                                                                                                                                                           |
| requestBody             | String      | No       | `null`        | The HTTP body which is put through the Go template engine.                                                                                                                                                                               |                                                                                                                                                                                                                                                           |
| requestHeaders          | JSON Object | No       | `null`        | HTTP basic authentication password                                                                                                                                                                                                       | `"requestHeaders": [{"headerName": "Accept", "headerValue": "application/json"}, {"headerName": "Content-Type", "headerValue": "application/json"}]`                                                                                                      |
| requestParams           | JSON Object | No       | `null`        | HTTP basic authentication password                                                                                                                                                                                                       | `"requestParams": [{"paramName": "limit",  "paramValue": "1000"}, {"paramName": "since", "paramValue": "{{ .WindowStartUTC \"2006-01-02T15:04:05Z07:00\" }}"}, {"paramName": "until", "paramValue": "{{ .WindowEndUTC \"2006-01-02T15:04:05Z07:00\" }}"}` |
| progressionType         | String      | Yes      | `null`        | Progression type.                                                                                                                                                                                                                        | `"progressionType": "window"`                                                                                                                                                                                                                             |
| windowInitialLookback   | String      | Yes      | `24h`         | How far back from current time to start the window upon source creation. Must be between window size and 31d.                                                                                                                            | `"windowInitialLookback": "24h"`                                                                                                                                                                                                                          |
| windowMaxLookback       | String      | Yes      | `31d`         | How far back the window is allowed to go based on the third party APIs data retention policy. Must be between window size and 365d.                                                                                                      | `"windowMaxLookback": "31d"`                                                                                                                                                                                                                              |
| windowSize              | String      | Yes      | `5m`          | The maximum size of the window chunk. Must be between 1m and 24h.                                                                                                                                                                        | `"windowSize": "5m"`                                                                                                                                                                                                                                      |
| clientTimeoutDuration   | String      | Yes      | `5m`          | How long the source allows the HTTP connection to live before closing it and setting the health to a timeout error. Must be between window size and 31d.                                                                                 | `"clientTimeoutDuration": "5m"`                                                                                                                                                                                                                           |
| clientTimeoutRetries    | Integer     | Yes      | 5             | The source will automatically retry without waiting for the next poll interval this many times for some errors such as 500 Internal Server.                                                                                              | `"clientTimeoutRetries": 5`                                                                                                                                                                                                                               |
| clientRateLimitReqs     | Integer     | Yes      | 1000          | The number of HTTP requests the source is allowed to make within the rate limit duration.                                                                                                                                                | `"clientRateLimitReqs": 1000`                                                                                                                                                                                                                             |
| clientRateLimitDuration | String      | Yes      | `1m`          | The duration the rate limit requests, must be between 1s and 1h.                                                                                                                                                                         | `"clientRateLimitDuration": "1m"`                                                                                                                                                                                                                         |
| clientRateLimitBurst    | Integer     | Yes      | 1000          | The number of requests the source is allowed to burst.                                                                                                                                                                                   | `"clientRateLimitBurst": 1000`                                                                                                                                                                                                                            |
| dataProcessorType       | String      | Yes      | `json`        | Response Log Type.                                                                                                                                                                                                                       | `"dataProcessorType": "json"`                                                                                                                                                                                                                             |
| resultsConfig           | JSON Object | Yes      | `null`        | Configuration of the location of the log data from the API response.                                                                                                                                                                     | `"resultsConfig": [{"resultPath": "$[*]", "timestampPath": "$.published", "timestampFormat": "2006-01-02T15:04:05.999Z"}]`                                                                                                                                |
| paginationType          | String      | Yes      | `linkHeaders` | Pagination type.                                                                                                                                                                                                                         | `"paginationType": "linkHeaders"`                                                                                                                                                                                                                         |
| linkHeadersType         | String      | Yes      | `headers`     | Configures if the next page URL is included in the Link HTTP response header or in the response body.                                                                                                                                    | `"linkHeadersType": "headers"`                                                                                                                                                                                                                            |
| linkHeadersJsonPath     | String      | No       | `null`        | A JSON Path to the appropriate body property.                                                                                                                                                                                            | `"linkHeadersJsonPath": "$.link.next"`                                                                                                                                                                                                                    |
| pollingInterval         | String      | Yes      | `5m`          | Set how frequently to poll for new data. It must be between 5 minutes and 48 hours.                                                                                                                                                      | `"pollingInterval": "5m"`                                                                                                                                                                                                                                 |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

[Download example](/files/c2c/config-based/example.json)

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

[Download example](/files/c2c/config-based/example.tf)

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::