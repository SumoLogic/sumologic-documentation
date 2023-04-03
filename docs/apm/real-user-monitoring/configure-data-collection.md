---
id: configure-data-collection
title: Configuring RUM Data Collection
description: Learn how to collect Traces and RUM metrics from a browser using a RUM HTTP Traces Source.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Iframe from 'react-iframe';

To collect [traces](/docs/apm/traces) and RUM metrics from a browser, you'll first need to create a RUM HTTP Traces Source. The source will have an endpoint URL that you'll put in a script that sends trace data in [OTLP/JSON over HTTP](https://github.com/open-telemetry/opentelemetry-specification/blob/master/specification/protocol/otlp.md#otlphttp) protocol. Alternatively, you can also use an intermediary OTel collector, if you require data to flow over your infrastructure rather than directly to Sumo Logic. Note however this will disable automatic geo-location recognition capabilities.

:::sumo Micro Lesson
Using the RUM HTTP Traces App for Manual Testing.

<Iframe url="https://www.youtube.com/embed/CduT1sqSPmE?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

:::

## Prerequisites
To utilize XHR and navigation/route changes, and errors collection, you must use RUM script version 4 or higher (`https://rum.sumologic.com/sumologic-rum-v4.js`). Make sure you're using the correct version in your pages. For automatic updates, use the script `https://rum.sumologic.com/sumologic-rum.js`. You can find more details about versioning control [later in this document](#step-2-add-rum-script-to-your-page-header).

For full end-to-end visibility, we recommended supplementing your RUM browser auto-instrumentation with the appropriate [back-end tracing instrumentation](/docs/apm/traces/get-started-transaction-tracing).

## Step 1: Create a RUM HTTP Traces Source

To configure a RUM HTTP Traces source:

1. From Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. If you've not yet created a Hosted Collector, [follow these steps](/docs/send-data/hosted-collectors/configure-hosted-collector) to do so.
1. On the **Collection** page, click **Add Source** next to a Hosted Collector. <br/><img src={useBaseUrl('img/reuse/add-source.png')} alt="add source" width="475"/>
1. Select **RUM HTTP Traces**. <br/><img src={useBaseUrl('img/rum/rum-icon.png')} alt="Real User Monitoring" width="120"/>
1. Under **Source Type: RUM HTTP Traces**, enter the following information:
   * **Name** for the Source.
   * **Description**. (Optional) description of the Source .
   * **Source Host** and **Source Category**. (Optional) Enter any string to tag the output collected from the source. These are [built-in metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata.md) fields that allow you to organize your data. We recommend you specify a Source Category indicating the data is from a browser.<br/><img src={useBaseUrl('img/rum/RUM-HTTP-Traces-Source.png')} alt="Real User Monitoring" />
1. Enter **Advanced options for Browser RUM**.<br/><img src={useBaseUrl('img/rum/RUM-HTTP-Traces-Source-Advanced.png')} alt="Real User Monitoring" width="400"/>
   * **Application Name**. (Recommended) Add an **Application Name** tag of a text string to show for the app name in spans (for example, `bookings-app`). This groups services in the Application Service View. If left blank, services will belong to a "default" application. See [Application Service Dashboards](/docs/apm/traces/services-list-map.md) for more information. This setting is saved in the script for `name_of_your_web_application`.
   * **Service Name**. (Required) Add a **Service Name** of a text string to show for the service name in spans (for example, `bookings-web-app`). This setting is saved in the script for `name_of_your_web_service`. To set up a service name dynamically (e.g., to have different service names for micro-frontend packages), leverage the `getOverriddenServiceName` function inside your page code to overwrite the default service name (requires RUM script v4.2.0 or higher). Service names should be of low cardinality and should describe parts of your website above page level. Here's an example code leveraging that function:
    ```javascript
    window.sumoLogicOpenTelemetryRum.initialize({
      collectionSourceUrl:
        'https://service.sumologic.com/receiver/v1/rum/token==',
      serviceName: 'online-shop-frontend',
      applicationName: 'online-shop',
      getOverriddenServiceName: (span) => {
        const pathname = document.location.pathname;
        if (pathname.startsWith('/carts/')) {
          return 'online-shop-frontend-carts'
        }
        return 'online-shop-frontend-main'
      }
    });
    ```
   * **deployment.environment** (optional):  Your production, staging, or development environment name, up to 10 distinct values per org.
   * **Probabilistic sampling rate** (optional): Add a **Probabilistic sampling rate** for heavy traffic sites in a decimal value based on percentage, for example, 10% would be entered as `0.1`.
   * **Ignore urls** (optional): Add a list of URLs not to collect trace data from. Supports regex. Make sure provided URLs are valid JavaScript flavor regexes. For example: `/^https:\/\/www.tracker.com\/.*/, /^https:\/\/api.mydomain.com\/log\/.*/`
   * **Custom Tags** (optional): Click **+Add** and enter a key and value for each **Custom Tags** to show in spans from instrumented browsers. As an example, you could enter a key of `internal.version` with a value of `0.1.21`. This information is saved in the script for `name_of_your_web_service`.
   * **Propagate Trace Header Cors Urls** (recommended): Add a list of URLs or URL patterns that pass tracing context to construct traces end-to-end. This information is saved in the script for `list_of_urls_to_receive_trace_context`. Make sure provided URLs are valid JavaScript flavor regexes. Some examples are `/^https:\/\/api.mydomain.com\/apiv3\/.*/` and `/^https:\/\/www.3rdparty.com\/.*/.`
    :::caution **Propagate Trace Header Cors Urls**
    Sumo Logic cannot perform configuration validation of services of other origins. You should always enable context propagation and CORS configuration changes in a test environment before setting it up in production.
    <details><summary><strong>Click here</strong> to review our recommendations</summary>
    This list is empty by default, which means trace context propagation&#8212;allowing creation of end to and front end to backend traces for cross-origin requests&#8212;is not enabled because of browser CORS security restrictions. To connect your front-end and back-end traces, make sure your environment supports <a href="https://www.w3.org/TR/trace-context">W3C Trace Context</a> HTTP headers. <br/><br/>To propagate tracing context to create front-end to back-end traces, set domain(s) to propagate W3C tracing context to. You must also configure your servers/APIs to accept and return following CORS headers in its response - for example: <code>Access-Control-Allow-Headers: traceparent, tracestate</code>.
    Valid cross-origin resources must include the prefix <code>http://</code> or <code>https://</code> and the domain name. The port number is not required unless it differs from the default for HTTP (port 80) or HTTPS (port 443).
    </details>
    :::
   * **Geolocation recognition**: Select a **Geolocation recognition** option to automatically recognize geographical locations of your end clients from:
     * The country down to state (recommended for global websites)
     * A single country down to city level (recommended for local, country specific websites)
   * For additional guidance on the above options, refer to the FAQs list on the page. To view all available configuration parameters, see the [Sumo Logic OpenTelemetry auto-instrumentation for JavaScript README file](https://github.com/SumoLogic/sumologic-opentelemetry-js).
1. When you are finished configuring the Source, click **Submit**.
1. An HTTP Source Script is displayed in a pop-up with three different formats: synchronous, asynchronous, and npm. These are examples of scripts you can use with all configurations you entered when creating the source, including advanced options. Select a format and click **Copy to Clipboard**. <br/><img src={useBaseUrl('img/rum/RUM-HTTP-Traces-Script.png')} alt="Real User Monitoring" width="400"/>


The script includes a RUM HTTP Traces Source URL for `collectionSourceUrl` in the generated script. This is saved for the script as `sumo_logic_http_traces_source_url`. Your user's browser should be allowed to POST data to this URL.  

This can be also replaced with an internal OpenTelemetry collector if you wish to redirect browser traffic over it. In this case, replace this URL with the OpenTelemetry collector OTLP/HTTP receiver endpoint as described in [Getting Started with Transaction Tracing](/docs/apm/traces/get-started-transaction-tracing). In this case, the OpenTelemetry collector exporter will send data to the RUM HTTP Traces Source URL.

## Step 2: Add RUM Script to Your Page Header

Use the copied script in your page head inside the `<head>` `</head>` tags. The script sends trace data in [OTLP/JSON over HTTP](https://github.com/open-telemetry/opentelemetry-specification/blob/master/specification/protocol/otlp.md#otlphttp) protocol. 

:::tip
You can view and copy a script anytime by clicking **Show script** for the source.<br/> ![show-script.png](/img/rum/show-script.png)
:::

The following are base script examples, populated when you create and configure a source in the above instructions.

<Tabs
  className="unique-tabs"
  defaultValue="synchronous"
  values={[
    {label: 'Synchronous', value: 'synchronous'},
    {label: 'Asynchronous', value: 'asynchronous'},
    {label: 'NPM', value: 'npm'},
  ]}>

<TabItem value="synchronous">

```javascript
<script src="https://rum.sumologic.com/sumologic-rum-v3.js" type="text/javascript"></script>
<script>
  window.sumoLogicOpenTelemetryRum &&
    window.sumoLogicOpenTelemetryRum.initialize({
      collectionSourceUrl: 'sumo_logic_traces_collector_source_url',
      serviceName: 'name_of_your_web_service',
      propagateTraceHeaderCorsUrls: [
        'list_of_domains_to_receive_trace_context',
      ],
    });
</script>
```

</TabItem>
<TabItem value="asynchronous">

You can load the script asynchronously using the script below but some functionalities like user interactions or requests made before script run will be limited.

```javascript
<script>
  (function (w, s, d, r, e, n) {
    (w[s] = w[s] || {
      readyListeners: [],
      onReady: function (e) {
        w[s].readyListeners.push(e);
      },
    }),
      ((e = d.createElement('script')).async = 1),
      (e.src = r),
      (n = d.getElementsByTagName('script')[0]).parentNode.insertBefore(e, n);
  })(
    window,
    'sumoLogicOpenTelemetryRum',
    document,
    'https://rum.sumologic.com/sumologic-rum-v3.js',
  );
  window.sumoLogicOpenTelemetryRum.onReady(function () {
    window.sumoLogicOpenTelemetryRum.initialize({
      collectionSourceUrl: 'sumo_logic_traces_collector_source_url',
      serviceName: 'name_of_your_web_service',
      propagateTraceHeaderCorsUrls: [
        'list_of_domains_to_receive_trace_context',
      ],
    });
  });
</script>
```

</TabItem>
<TabItem value="npm">

The other option is to bundle this library inside your project and initialize it. Inside your project directory, execute:
```bash
npm install @sumologic/opentelemetry-rum
```

RUM needs to be initialized, preferably before other functionalities in your code:

```javascript
import { initialize } from '@sumologic/opentelemetry-rum';

initialize({
  collectionSourceUrl: 'sumo_logic_traces_collector_source_url',
  serviceName: 'name_of_your_web_service',
  propagateTraceHeaderCorsUrls: ['list_of_domains_to_receive_trace_context'],
});
```

</TabItem>
</Tabs>

The above script examples omit the version number and automatically uses most up-to-date version of it (which you can find [here](https://github.com/SumoLogic/sumologic-opentelemetry-js)). If you want to manually control versioning of the script, use:
* `https://rum.sumologic.com/sumologic-rum-vX.js` (e.g., https://rum.sumologic.com/sumologic-rum-v4.js) for major version control (no breaking changes)
* `https://rum.sumologic.com/sumologic-rum-vX.Y.js` (e.g., https://rum.sumologic.com/sumologic-rum-v4.0.js) for minor version control (only bug fixes are automatically included)
* `https://rum.sumologic.com/sumologic-rum-vX.Y.Z.js` (e.g., https://rum.sumologic.com/sumologic-rum-v4.0.0.js) for patch version control (strict version control)

RUM scripts can be also wrapped in the form of a browser extension/plugin for monitoring SaaS applications in environments where you can control user browser configuration (e.g., internal employees). To obtain a customized browser extension for your environment to monitor Real User Experience with Sumo Logic, contact your Account Team or Sumo Logic support.
