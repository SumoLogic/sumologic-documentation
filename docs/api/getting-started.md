---
id: getting-started
title: API Authentication, Endpoints, and Security
sidebar_label: Authentication and Endpoints
description: This guide contains information about API authentication and the Sumo Logic endpoints to use for your API client.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/security/security-and-compliance.png')} alt="icon" width="40"/>

This guide describes API authentication and the Sumo Logic endpoints to use for your API client.

Sumo Logic APIs follow Representational State Transfer (REST) patterns and are optimized for ease of use and consistency. Our interactive API docs have been developed with the [OpenAPI Specification](https://www.openapis.org/), unless otherwise stated. The API docs on this site serve as supplemental information.

To view our main docs, click the link below corresponding to your deployment. If you're not sure, see [How to determine your endpoint](#which-endpoint-should-i-should-use).

| Deployment | API Docs URL                       |
|:------------|:----------------------------------|
| AU         | https://api.au.sumologic.com/docs  |
| CA         | https://api.ca.sumologic.com/docs  |
| DE         | https://api.de.sumologic.com/docs  |
| EU         | https://api.eu.sumologic.com/docs  |
| FED        | https://api.fed.sumologic.com/docs |
| IN         | https://api.in.sumologic.com/docs  |
| JP         | https://api.jp.sumologic.com/docs  |
| US1        | https://api.sumologic.com/docs     |
| US2        | https://api.us2.sumologic.com/docs |


<!--
#### Infrequent Data Tier

<table>
  <tr>
   <td>API
   </td>
   <td>Documentation URL
   </td>
  </tr>
  <tr>
   <td>Log Search Estimated Usage
   </td>
   <td><a href="https://api.sumologic.com/docs/#tag/logSearchesEstimatedUsage">https://api.sumologic.com/docs/#tag/...EstimatedUsage</a>
   </td>
  </tr>
</table>


#### Log Search

<table>
  <tr>
   <td>API
   </td>
   <td>Documentation URL
   </td>
  </tr>
  <tr>
   <td>Search Job
   </td>
   <td><a href="https://api.de.sumologic.com/docs/">/docs/api/search-job-API</a>
   </td>
  </tr>
</table>

-->

## Authentication

Sumo Logic supports the following options for API authentication:
* Access ID and access key
* Base64 encoded access id and access key

See [Access Keys](/docs/manage/security/access-keys) to learn how to generate an access key. Make sure to copy the key you create, because it is displayed only once.

### Access ID and Access Key

When you have an `accessId` and `accessKey`, you can execute requests like the following:

```bash
curl -u "<accessId>:<accessKey>" -X GET <API Endpoint>
```

Where `<API Endpoint>` is the Sumo Logic API URL you're sending requests to. For more information, see [Sumo Logic Endpoints](#sumo-logic-endpoints-by-deployment-and-firewall-security).

### Basic Access (Base64 encoded)

If you prefer to use [basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication), you can do a Base64 encoding of your `<accessId>:<accessKey>` to authenticate your HTTPS request. The following is an example request. Replace the placeholder `<encoded>` with your encoded access id and access key string:

```bash
curl -H "Authorization: Basic <encoded>" -X GET <API Endpoint>
```

The spacing in the **Authorization** field is required.


#### Base64 example

In most Linux distributions, you can use the `base64` command. As an example, if your access id is `Aladdin` and your access key is `OpenSesame`, then the command would be as follows:

```bash
echo -n "Aladdin:OpenSesame" | base64 --wrap 0
```

The `-n` ensures that an extra newline is not encoded.

This would yield a Base64 encoded string `QWxhZGRpbjpPcGVuU2VzYW1l` that is used like this:

```
"Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l"
```


## Sumo Logic Endpoints by Deployment and Firewall Security

<img src={useBaseUrl('img/icons/operations/firewall.png')} alt="icon" width="50"/>

Sumo Logic has several deployments that are assigned depending on the geographic location and the date an account is created.

Sumo Logic redirects your browser to the correct login URL and also redirects Collectors to the correct endpoint. However, if you're using an API you'll need to manually direct your API client to the correct Sumo Logic API URL.

<table><small>
  <tr>
   <td>Deployment
   </td>
   <td>Service Endpoint (login URL)
   </td>
   <td>API Endpoint
   </td>
   <td>Collection Endpoint
   </td>
   <td>Cloud Syslog Endpoint
   </td>
  </tr>
  <tr>
   <td>AU
   </td>
   <td>https://service.au.sumologic.com
   </td>
   <td>https://api.au.sumologic.com/api/
   </td>
   <td>https://collectors.au.sumologic.com
   </td>
   <td>syslog.collection.au.sumologic.com
   </td>
  </tr>
  <tr>
   <td>CA
   </td>
   <td>https://service.ca.sumologic.com
   </td>
   <td>https://api.ca.sumologic.com/api/
   </td>
   <td>https://collectors.ca.sumologic.com
   </td>
   <td>syslog.collection.ca.sumologic.com
   </td>
  </tr>
  <tr>
   <td>DE
   </td>
   <td>https://service.de.sumologic.com
   </td>
   <td>https://api.de.sumologic.com/api/
   </td>
   <td>https://collectors.de.sumologic.com
   </td>
   <td>syslog.collection.de.sumologic.com
   </td>
  </tr>
  <tr>
   <td>EU
   </td>
   <td>https://service.eu.sumologic.com</td>
   <td>https://api.eu.sumologic.com/api/</td>
   <td>https://collectors.eu.sumologic.com<br/>
   https://endpoint1.collection.eu.sumologic.com</td>
   <td>syslog.collection.eu.sumologic.com
   </td>
  </tr>
  <tr>
   <td>FED
   </td>
   <td>https://service.fed.sumologic.com
   </td>
   <td>https://api.fed.sumologic.com/api/
   </td>
   <td>https://collectors.fed.sumologic.com</td>
   <td>syslog.collection.fed.sumologic.com</td>
  </tr>
  <tr>
   <td>IN
   </td>
   <td>https://service.in.sumologic.com
   </td>
   <td>https://api.in.sumologic.com/api/
   </td>
   <td>https://collectors.in.sumologic.com
   </td>
   <td>syslog.collection.in.sumologic.com
   </td>
  </tr>
  <tr>
   <td>JP
   </td>
   <td>https://service.jp.sumologic.com
   </td>
   <td>https://api.jp.sumologic.com/api/
   </td>
   <td>https://collectors.jp.sumologic.com
   </td>
   <td>syslog.collection.jp.sumologic.com
   </td>
  </tr>
  <tr>
   <td>US1
   </td>
   <td>https://service.sumologic.com/
   </td>
   <td>https://api.sumologic.com/api/
   </td>
   <td>https://collectors.sumologic.com<br/>
   https://endpoint1.collection.sumologic.com<br/>
   https://endpoint2.collection.sumologic.com<br/>
   https://endpoint3.collection.sumologic.com<br/>
   https://endpoint4.collection.sumologic.com<br/>
   https://endpoint5.collection.sumologic.com</td>
   <td>syslog.collection.us1.sumologic.com
   </td>
  </tr>
  <tr>
   <td>US2
   </td>
   <td>https://service.us2.sumologic.com
   </td>
   <td>https://api.us2.sumologic.com/api/
   </td>
   <td>https://collectors.us2.sumologic.com<br/>
https://endpoint1.collection.us2.sumologic.com<br/>
https://endpoint2.collection.us2.sumologic.com<br/>
https://endpoint3.collection.us2.sumologic.com<br/>
https://endpoint4.collection.us2.sumologic.com<br/>
https://endpoint5.collection.us2.sumologic.com<br/>
https://endpoint6.collection.us2.sumologic.com<br/>
https://endpoint7.collection.us2.sumologic.com<br/>
https://endpoint8.collection.us2.sumologic.com<br/>
https://endpoint9.collection.us2.sumologic.com/</td>
   <td>syslog.collection.us2.sumologic.com</td>
  </tr></small>
</table>


### Which endpoint should I should use?

To determine which endpoint you should use, you'll need to find your account's deployment pod, which is located in the Sumo Logic URL you use. If you see `us2`, that means you're running on the US2 pod. If you see `eu`, `jp`, `de`, `in`, `ca`, or `au`, you're on one of those pods. The only exception is the US1 pod, which uses `service.sumologic.com`.

The specific collection endpoint will vary per account. The general format is: `endpoint[N].collection.[deploymentID].sumologic.com`.

You can also determine which deployment pod your account is using by creating an [HTTP Source](/docs/send-data/hosted-collectors/http-source/logs-metrics) and looking at the provided URL.


### Securing access to Sumo Logic infrastructure via DNS name or IP address

See the [static IP addresses for Cloud-to-Cloud Integration Sources](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework#static-ip-addresses).

For collection to work, your firewall must allow outbound traffic to Sumo Logic. Refer to [Test Connectivity for Sumo Logic Collectors](/docs/send-data/installed-collectors/collector-installation-reference/test-connectivity-sumo-collectors) for instructions on allowing outbound traffic over port 443.

* If your firewall allows DNS entries, add the following to the allowlist in your firewall to allow outbound traffic to sumologic.com:
   ```
   *.sumologic.com
   ```
   * By default, the Collector contacts `collectors.sumologic.com` before it is redirected to a deployment-specific endpoint such as `collectors.us2.sumologic.com` and `endpoint[N].collection.[deploymentID].[sumologic.com]`.
* If your firewall doesn’t allow DNS entries, you must allowlist all of the IP addresses for your deployment region. The addresses to allowlist depend on your Sumo Logic deployment.
   * To determine the IP addresses that require allowlisting, download the JSON object provided by Amazon Web Services (AWS). Amazon advises that this file will change several times a week. For details on how the file is updated, its usage, its syntax, and how to download the JSON file, see [AWS IP Address Ranges](https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html).

### FedRAMP Deployment

Sumo Logic's FedRAMP deployment is similar to our other deployments, such as US2, except that FedRAMP is certified to comply with the United States Standards for Security Categorization of Federal Information and Information Systems ([FIPS-199](https://en.wikipedia.org/wiki/FIPS_199)). In this deployment, we adhere to specific security requirements that are required for handling, storing, and transmitting data classified in the "Moderate" impact level.

### AWS Region by Sumo Deployment

{@import ../reuse/aws-region-by-sumo-deployment.md}


## Status Codes

Generic status codes that apply to all our APIs. See the [HTTP status code registry](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml) for reference.

| HTTP Status Code | Error Code          | Description                 
|:------------------|:---------------------|:-------------------------------------|
| 301              | moved               | The requested resource SHOULD be accessed through returned URI in Location Header. See [troubleshooting](/docs/api/troubleshooting) for details.                                       |
| 401              | unauthorized        | Credential could not be verified.                                                                                                                                                      |
| 403              | forbidden           | This operation is not allowed for your account type or the user doesn't have the role capability to perform this action. See [troubleshooting](/docs/api/troubleshooting) for details. |
| 404              | notfound            | Requested resource could not be found.                                                                                                                                                 |
| 405              | method.unsupported  | Unsupported method for URL.                                                                                                                                                            |
| 415              | contenttype.invalid | Invalid content type.                                                                                                                                                                  |
| 429              | rate.limit.exceeded | The API request rate is higher than 4 request per second or in-flight API requests are higher than 10 request per second.                                                              |
| 500              | internal.error      | Internal server error.                                                                                                                                                                 |
| 503              | service.unavailable | Service is currently unavailable.                                                                                                                                                      |

## Rate limiting

* A rate limit of four API requests per second (240 requests per minute) applies to all API calls from a user.
* A rate limit of 10 concurrent requests to any API endpoint applies to an access key.

If a rate is exceeded, a `rate limit exceeded 429` status code is returned.

## Versioning and Conflict Detection  

The [Collector Management API](/docs/api/collector-management) uses optimistic locking to deal with versioning and conflict detection. Any response that returns a single entity will have an ETag header which identifies the version of that entity.

Subsequent updates (`PUT` requests) to that entity must provide the value of the `ETag` header in an If-Match header; if the header is missing or no longer corresponds to the latest version of the entity, the request will fail (with `403 Forbidden` or `412 Precondition Failed`, respectively).

Clients must be prepared to handle such failures if they anticipate concurrent updates to the entities. Additionally, the value of the `ETag` header may be provided in an `If-None-Match` header in future `GET` requests for caching purposes.


## Sumo Logic alerts from static IP addresses

Sumo Logic provides notifications through static IP addresses. You can allowlist those IP addresses to receive notifications directly from Sumo. For a list of our allowlist addresses, contact [Support](https://support.sumologic.com/hc/en-us).

The [Test Connection feature for webhooks](/docs/alerts/webhook-connections/set-up-webhook-connections#test-a-connection) does not use the same static IP addresses that send notifications, it uses different temporary IP addresses.
