---
id: generate-new-url-with-auth-header
title: Generate a New URL for an HTTP Source with an Auth Header
sidebar_label: Regenerate URL
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
 <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Beta</span></a></p>

Sumo Logic offers secure token-based authentication for the HTTPS Logs and Metrics Source. This capability allows you to authenticate using a unique token in the request header, maintaining the existing HTTPS endpoint behavior while adding token validation per source. Obtain the token to use in an auth header when you configure an HTTP source or regenerate the URL.

## Generate a new URL for an HTTP source

You can generate a new URL for an HTTP Source at any time. Generating a new URL completely invalidates the old URL. 

To generate a new URL:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.  <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. 
1. On the **Manage Collection** page, click **Regenerate URL** next to the HTTP source.<br/><img src={useBaseUrl('img/send-data/regenerate-url.png')} alt="Regenerate URL link" style={{border: '1px solid gray'}} width="800" />
1. In the **HTTP Source Address** dialog box, select one of the following to regenerate the URL where the source data will be stored:
   * **Presigned URL**. Select to copy a presigned URL with embedded authentication.<br/><img src={useBaseUrl('img/send-data/generate-new-url-new.png')} alt="Generate New URL" style={{border: '1px solid gray'}} width="600"/>
   * **Auth Header**. Select to copy the URL, as well as a separate authorization header that contains an authentication token. This option provides greater security than a presigned URL because placing the authentication token in the authorization header of a request prevents the token from being exposed in the URL.<br/><img src={useBaseUrl('img/send-data/generate-new-url-and-token.png')} alt="Generate New URL and token" style={{border: '1px solid gray'}} width="600"/>
1. Click **Generate**.
1. When asked to confirm the generation, click **OK**.
1. In the resulting dialog box, the newly-generated URL is displayed, as well as the authorization header if you selected **Auth Header**. Copy the URL (and header if applicable) and keep in a safe place. 
1. Use the copied URL (and header if appropriate) when you [upload data to your HTTP Logs and Metrics source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#upload-data-to-the-httplogs-and-metrics-source).

:::note
If you see a 401 (failed to authenticate) error message right after generating a new URL, wait a few minutes, then try the new URL again.
:::

## Upload logs to an HTTP source



### Upload log data with a POST request

When you [upload log with a POST request](/docs/send-data/hosted-collectors/http-source/logs-metrics/upload-logs/#upload-log-data-with-a-post-request), keep in mind the following.

To upload log data with a POST request, include the complete data payload as the request body. Any query parameters will be ignored.

:::important
We recommend that the POST data payload have a size, before compression, of 100KB to 1MB. See [data payload considerations](/docs/send-data/hosted-collectors/http-source/logs-metrics/#data-payload-considerations) for details.
:::

* Data payload:
  * Data line 1
  * Data line 2
  * Data line 3
* Method: POST
* URL: <br/>Enter the URL obtained when you configure the HTTP Logs and Metrics Source or when you regenerate the URL. Enter either a presigned URL or a URL to be used with an auth header:
    * Presigned URL: `https://[SumoEndpoint]/receiver/v1/http/[UniqueHTTPCollectorCode]` <br/>where
       * [SumoEndpoint] is your Sumo collection endpoint
       * [UniqueHTTPCollectorCode] is the string that follows the last forward slash (`/`) in the upload URL for the HTTP source
    * URL used with auth header: `https://[SumoEndpoint]/receiver/v1/http` <br/>where [SumoEndpoint] is your Sumo collection endpoint
* Body
  * Data line 1
  * Data line 2
  * Data line 3

### Supported HTTP Headers

The following parameters can be specified via headers when sending data to an HTTP Source. The settings will apply to all messages in the request. For Source Name, Host, and Category, the header value will override any default value already specified for the source and/or collector.

You can configure your Source to process HTTP Headers into metadata fields. See [HTTP Source fields](/docs/manage/fields) for details.

:::note
Overridden metadata field values are not returned with [Search Autocomplete](/docs/search/get-started-with-search/search-basics/search-autocomplete).
:::

| Setting | Header Name | Header Value |
|:--|:--|:--|
| Compressed data | `Content-Encoding` | Values can be `zstd`, `gzip`, or `deflate`.<br/>Required if you are uploading compressed data. |
| Custom Source Name | `X-Sumo-Name` | Desired source name.<br/>Useful if you want to override the source name configured for the source. |
| Custom Source Host | `X-Sumo-Host` | Desired host name.<br/>Useful if you want to override the source host configured for the source. |
| Custom Source Category | `X-Sumo-Category` | Desired source category.<br/>Useful if you want to override the source category configured for the source. |
| Fields as custom metadata | `X-Sumo-Fields` | [Fields](/docs/manage/fields) need to be in a comma separated list of key-value pairs.  |
| Token authentication | `x-sumo-token` | Token to be used for authentication in an authorization header. Obtain the token when you select **Auth Header** when you [configure the HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source), or when you [regenerate the URL](/docs/send-data/hosted-collectors/http-source/generate-new-url/). |

### Command line examples

:::note
Data is ingested according to the configured [processing rules](/docs/send-data/collection/processing-rules). Messages blocked by filters will not be ingested.
:::

#### cURL

When using cURL to POST data from a file: 

* Make sure to use the -T parameter to specify the file path, not -d. The -d parameter causes new lines to be removed from the content, which will interfere with message boundary detection.
* Make sure that each line in the file follows the format specified by the Content-Type header for the HTTP request.
* Enter the URL (and auth header if applicable) obtained when you [configured the HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source) or when you [regenerate the URL](/docs/send-data/hosted-collectors/http-source/generate-new-url/). If you use an auth header, enter it in this format: <br/>`-H "x-sumo-token: [TokenString]"`

**POST upload**

Presigned URL:
```bash
curl -v -X POST -T [local_file_name] https://collectors.sumologic.com/receiver/v1/http/[UniqueHTTPCollectorCode] 
```
URL with auth header:
```bash
curl -v -X POST -H "x-sumo-token: [TokenString]" -T [local_file_name] https://collectors.sumologic.com/receiver/v1/http
```

**POST upload (gzip compressed data)** 

Presigned URL:
```bash
curl -v -X POST -H 'Content-Encoding:gzip' -T [local_file_name.gz] https://collectors.sumologic.com/receiver/v1/http/[UniqueHTTPCollectorCode]
```

URL with auth header:
```bash
curl -v -X POST -H 'Content-Encoding:gzip' -H "x-sumo-token: [TokenString]" -T [local_file_name.gz] https://collectors.sumologic.com/receiver/v1/http
```

**POST upload with custom Source Category**

Presigned URL:
```bash
curl -v -X POST -H 'X-Sumo-Category:myNewCategory' -T [local_file_name] https://collectors.sumologic.com/receiver/v1/http/[UniqueHTTPCollectorCode]
```

URL with auth header:
```bash
curl -v -X POST -H 'X-Sumo-Category:myNewCategory' -H "x-sumo-token: [TokenString]" -T [local_file_name] https://collectors.sumologic.com/receiver/v1/http
```

**POST upload with custom Fields**

Presigned URL:
```bash
curl -v -X POST -H 'X-Sumo-Fields:environment=dev,cluster=k8s' -T [local_file_name] https://collectors.sumologic.com/receiver/v1/http/[UniqueHTTPCollectorCode]
```
URL with auth header:
```bash
curl -v -X POST -H 'X-Sumo-Fields:environment=dev,cluster=k8s' -H "x-sumo-token: [TokenString]" -T [local_file_name] https://collectors.sumologic.com/receiver/v1/http
```

#### PowerShell

**POST upload**

In the following examples when a URL is used with an auth header, `$headers` is defined as follows:

```bash
$headers = @{
    Authorization="x-sumo-token: [TokenString]"
    Content='application/json'
}
```

Presigned URL:
```bash
Invoke-WebRequest -Method POST -InFile [local_file_name] 'https://collectors.sumologic.com/receiver/v1/http/[UniqueHTTPCollectorCode]'
```

URL with auth header:
```bash
Invoke-WebRequest -Method POST -InFile [local_file_name] 'https://collectors.sumologic.com/receiver/v1/http' -Headers $headers
```

**POST upload (gzip compressed data)** 

Presigned URL:
```bash
Invoke-WebRequest -Method POST -Headers @{'Content-Encoding' = 'gzip'} -InFile [local_file_name.gz] 'https://collectors.sumologic.com/receiver/v1/http/[UniqueHTTPCollectorCode]'
```

URL with auth header:
```bash
Invoke-WebRequest -Method POST -Headers @{'Content-Encoding' = 'gzip'} -InFile [local_file_name.gz] 'https://collectors.sumologic.com/receiver/v1/http' -Headers $headers
```

**POST upload with custom Source Category**

Presigned URL:
```bash
Invoke-WebRequest -Method POST -Headers @{'X-Sumo-Category' = 'myCustomCategory'} -InFile [local_file_name] 'https://collectors.sumologic.com/receiver/v1/http/[UniqueHTTPCollectorCode]'
```

URL with auth header:
```bash
Invoke-WebRequest -Method POST -Headers @{'X-Sumo-Category' = 'myCustomCategory'} -InFile [local_file_name] 'https://collectors.sumologic.com/receiver/v1/http' -Headers $headers
```

**POST upload with custom Field**

Presigned URL:
```bash
Invoke-WebRequest -Method POST -Headers @{'X-Sumo-Fields' = 'environment=dev'} -InFile [local_file_name] 'https://collectors.sumologic.com/receiver/v1/http/[UniqueHTTPCollectorCode]'
```

URL with auth header:
```bash
Invoke-WebRequest -Method POST -Headers @{'X-Sumo-Fields' = 'environment=dev'} -InFile [local_file_name] 'https://collectors.sumologic.com/receiver/v1/http' -Headers $headers
```
