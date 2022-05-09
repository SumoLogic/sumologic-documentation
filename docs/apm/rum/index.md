---
slug: /apm/rum
id: rum-index
---

# Real User Monitoring

Real User Monitoring (RUM) gives you the ability to understand how users interact with the digital interfaces of your business and if their experience is satisfactory or not. This open-source powered and flexible capability brings you full visibility into what’s happening in your user's browser while interacting with your web applications.

RUM provides you end-to-end visibility into individual user transactions to quickly understand the user experience. You get insights into delays that occurred on the client, overall end-to-end transaction times, network timings, rendering events, and can perform high-level monitoring, alerting, as well as troubleshooting any potential slow-downs. You have full details about the specific performance of top user cohorts, their geographical locations, browsers, and operating systems. You can also fully understand the overall experience of all users and transactions of your digital business, all the time.

The [Sumo Logic OpenTelemetry auto-instrumentation for JavaScript](https://github.com/SumoLogic/sumologic-opentelemetry-js) library enables collecting RUM data in the form of OpenTelemetry compatible traces, directly from the browser. It can gather information about the load, execution, and rendering of your JavaScript applications and record information about browser-to-backend performance of every user transaction in real time, without sampling. This data is gathered directly from your end-user devices and displayed as individual spans representing user-initiated actions (like clicks or document loads) at the beginning of each trace, reflecting its request journey from the client throughout the whole application and back. All data collected is compatible with OpenTelemetry and doesn't use proprietary vendor code.

The full list of functionalities and configuration is available in the [Sumo Logic OpenTelemetry auto-instrumentation for JavaScript](https://github.com/SumoLogic/sumologic-opentelemetry-js) README file.

:::tip
For full end-to-end visibility, it is recommended to supplement RUM browser auto-instrumentation with appropriate [backend tracing instrumentation](/docs/apm/traces/get-started-transaction-tracing).
:::

:::note
Learn more with this [Real User Monitoring micro lesson](https://www.youtube.com/watch?v=n-khmblaQN4&list=PLuHsjJUxgM1fRFUzFZuQcZ2GCW-jtiOxa&index=1).
:::

<Iframe url="https://www.youtube.com/embed/n-khmblaQN4"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        />

import Iframe from 'react-iframe';

## Collect RUM data

To collect [traces](/docs/apm/traces) from a browser you'll first need to create a RUM HTTP Traces Source. The Source will have an endpoint URL that you'll put in a script that sends trace data in [OTLP/JSON over HTTP](https://github.com/open-telemetry/opentelemetry-specification/blob/master/specification/protocol/otlp.md#otlphttp)
protocol.

## Create a RUM HTTP Traces Source

To configure a RUM HTTP Traces Source:

1. In the Sumo Logic web interface, select **Manage Data \> Collection \> Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Select **RUM** **HTTP Traces**. 

    ![RUM HTTP traces source icon.png](/img/rum/rum-icon.png)  
    
    Complete source and advanced options. A list of FAQs on the page provides help for these options.

1.  Enter the following RUM HTTP Traces information:

    * **Name** for the Source.
    * (Optional) **Description** for the Source.
    * (Optional) For **Source Host **and** Source Category**, enter any string to tag the output collected from the source. These are built-in metadata fields that allow you to organize your data. We recommend you specify a Source Category indicating the data is from a browser.

    ![RUM-HTTP-Traces-Source.png](/img/rum/RUM-HTTP-Traces-Source.png)

1. Enter **Advanced options for Browser RUM**. A list of FAQs on the page provides help for these options. A table with all the available configuration parameters is available in the [Sumo Logic OpenTelemetry auto-instrumentation for JavaScript](https://github.com/SumoLogic/sumologic-opentelemetry-js) README file.  

    ![RUM-HTTP-Traces-Source-Advanced.png](/img/rum/RUM-HTTP-Traces-Source-Advanced.png)  
     
   * **Application Name.** (Recommended) Add an **Application Name **tag of a text string to show for the app name in spans, for example `bookings-app`. This groups services in the Application Service View. If left blank, services will belong to a "default" application. See [Application Service Dashboards](../traces/working-with-tracing-data/service-map.md) for more information. This setting is saved in the script for  `name_of_your_web_application`.
   * **Service Name.** (Mandatory) Add a **Service Name** of a text string to show for the service name in spans, for example `bookings-web-app`. This setting is saved in the script for `name_of_your_web_service`.
   * **Probabilistic sampling rate.** (Optional) Add a Proba**bilistic sampling rate** for heavy traffic sites in a decimal value based on percentage, for example, 10% would be entered as `0.1`.
   * **Ignore urls.** (Optional) For **Ignore urls**, add a list of URLs not to collect trace data from, supports regex, for example: `/^https://www.tracker.com/.*/, /^https://api.mydomain.com/log/.*/`
   * **Custom Tags.** (Optional) Click **+Add** and enter a key and value for each **Custom Tags** to show in spans from instrumented browsers. For example, click **+Add** and enter a key `deployment.environment` with a value of production. This information is saved in the script for `name_of_your_web_service`.
   * **Propagate Trace Header Cors Urls.** (Recommended) For **Propagate Trace Header Cors Urls**, add a list of URLs or URL patterns passing tracing context to construct traces end-to-end, for example: 

        `/^https://api.mydomain.com/apiv3/.*/`
        `/^https://www.3rdparty.com/.*/.`

        This information is saved in the script for `list_of_urls_to_receive_trace_context`.

        :::note
        Sumo Logic cannot perform configuration validation of services of other origins. 

        This list is empty by default, which means trace context propagation, allowing creation of end to and front end to backend traces for cross-origin requests is not enabled because of browser CORS security restrictions. To connect your front-end and back-end traces, make sure your environment supports W3C Trace Context HTTP headers.

        **Recommended:** You should always try enabling context propagation and CORS configuration changes in a test environment before setting it up in production.
        :::

        To propagate tracing context to create front-end to back-end traces, set domain(s) to propagate W3C tracing context to.  You also must configure your servers/APIs to accept and return following CORS headers in its response:
        
        `Access-Control-Allow-Headers: traceparent, tracestate`
        
        Sumo Logic cannot perform any validation correct configuration of services of other origins, so please be careful when configuring this. Valid cross-origin resources must include the prefix `http://` or `https://` and the domain name. The port number is not required unless it differs from the default for HTTP (port 80) or HTTPS (port 443).
    * **Geolocation recognition.** Select a **Geolocation recognition** option to automatically recognize geographical locations of your end clients from:
      
      * The country down to state (recommended for global websites)
      * A single country down to city level (recommended for local, country specific websites)

1. When you are finished configuring the Source, click **Submit**.

1. An HTTP Source Script is displayed in a pop-up with three different formats: Synchronous, Asynchronous, and NPM. These are examples of scripts you can use with all configurations you entered when creating the source, including advanced options. Select a format and click **Copy to Clipboard**.  

    ![RUM-HTTP-Traces-Script.png](/img/rum/RUM-HTTP-Traces-Script.png)

The script includes a RUM HTTP Traces Source URL for **collectionSourceUrl** in the generated script. This is saved for the script as `sumo_logic_http_traces_source_url`. Your user's browser should be allowed to POST data to this URL.  
  
This can be also replaced with an internal OpenTelemetry collector if you wish to redirect browser traffic over it. In this case, replace this URL with the OpenTelemetry collector OTLP/HTTP receiver endpoint as described in [Getting Started with Transaction Tracing](/docs/apm/traces/get-started-transaction-tracing). In this case, the OpenTelemetry collector exporter will send data to the RUM HTTP Traces Source URL.

### Use the Script

Use the copied script in your page head, inside the \<head\>\</head\> tags. The script sends trace data in [OTLP/JSON over HTTP](https://github.com/open-telemetry/opentelemetry-specification/blob/master/specification/protocol/otlp.md#otlphttp) protocol. 

:::note
You can view and copy a script anytime by clicking **Show Script** for the source.  

![show-script.png](/img/rum/show-script.png)
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
<script
  src="https://rum.sumologic.com/sumologic-rum-v3.js"
  type="text/javascript"
></script>
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

	
The other option is to bundle this library inside your project and initialize it. Inside your project directory execute npm install `@sumologic/opentelemetry-rum`.

RUM needs to be initialized preferably before other functionalities in your code:

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

:::tip
RUM script can be also wrapped in form of a browser extension/plugin for monitoring SaaS applications in environments where you can control user browser configuration (such as internal employees). To obtain a customized browser extension for your environment to monitor Real User Experience with Sumo Logic, contact your Account Team or Sumo Logic support.
:::

## Search traces from the browser

Create a [trace query](../traces/working-with-tracing-data/view-and-investigate-traces.md) that specifies traces starting with the value you gave to `<name_of_your_web_service>` as a root service name. You can also include `documentLoad` as an operation name to find traces that correspond to page loads. Click on any of the load spans, such as `documentLoad`, `documentFetch` or `resourceFetch`, to open a right-side panel with detailed span metadata including timing events.

![RUM-trace-view with border.png](/img/rum/RUM-trace-view-with-border.png)

## JavaScript metrics

Real User Monitoring metrics are automatically generated for you from browser traces. They allow you to understand the overall user experience on the level of the whole website, its front-end services as well as top-loaded page groups and user cohorts categorized by their browsers, operating systems, and geographical locations.

The metrics are collected for user actions representing document loads which means actual retrieval and execution of web documents in the browser. They currently do not support non-load actions like XHR, which will be added soon.

You can find these metrics in Metrics Explorer by querying for `_contenttype=rummetricfromtrace`

The following table has details on the metrics collected from JavaScript. These are available in each trace in the `documentLoad` and `documentFetch` spans as span events in the details panel and also used in the [Real User Monitoring App](#real-user-monitoring-app) to populate the Website Performance and UI Paint Timings panels.

| Order | Name | Calculation |
|--|--|--|
| 1 | browser_time_to_dns_resolution_end | domainLookupEnd - span start time (fetch start) | 
| 2 | browser_time_to_ssl_end | if secureConnectionStart > 0: connectionEnd - span start time (fetch start)
else NaN | 
| 3 | browser_time_to_tcp_established | if secureConnectionStart > 0: secureConnectionStart - span start time (fetch start) | 
else connectionEnd - span start time (fetch start) | 
| 4 | browser_time_to_request_end | responseStart - span start time (fetch start) | 
| 5 | browser_time_to_response_end | responseEnd - span start time (fetch start) | 
| 6 | browser_time_to_interactive | domInteractive - span start time (fetch start) | 
| 7.1 | browser_time_to_fp | firstPaint - span start time (fetch start) | 
| 7.2 | browser_time_to_fcp | firstContentfulPaint - span start time (fetch start) | 
| 7.3 | browser_time_to_lcp | largestContentfulPaint - span start time (fetch start) | 
| 8 | browser_time_to_processing_end | domComplete - span start time (fetch start) | 
| 9 | browser_time_to_page_load_end | loadEventEnd - span start time (fetch start) | 

:::tip
See W3C [navigation timing](https://www.w3.org/TR/navigation-timing/) for details on how an interface for web applications defines its access timing information concerning navigation and other elements.
:::

Metrics 1-6 and 8-9 are navigation timing metrics and are presented in the form of areas on the **Website Performance** chart on [RUM dashboards](#dashboards). They help you to understand the sequence of events from user clicks to a fully loaded document.

![Navigation-metrics.png](/img/rum/Navigation-metrics.png)

There are also three additional metrics (7.1, 7.2, and 7.3 from the table above) that explain rendering events inside the user's browser. These are **First Paint**, **First Contentful Paint,** and **Largest Contentful Paint**. They are only loosely related to navigation timings and in many cases, some of them may appear long after the page is fully loaded in the browser (which indicates rendering slow-downs). These metrics are displayed in the **UI Paint Timings** panel on RUM dashboards.

* [First Paint](https://developer.mozilla.org/en-US/docs/Glossary/First_paint): **measures the time from page fetch start (span start time) to the moment when the browser renders the first pixels to the screen, rendering anything that is visually different from what was on the screen prior to navigation. It answers the question "Is it happening?" 
* [First Contentful Paint](https://web.dev/fcp/): measures the time from page fetch start (span start time) to the moment when any part of the page's content is rendered on the screen. For this metric, "content" refers to text, images (including background images), \<svg\> elements, or non-white \<canvas\> elements.
* [Largest Contentful Paint](https://web.dev/lcp/): measures the time from page fetch start (span start time) to the moment when the largest image or text block visible within the viewport is rendered.

:::note
Timing metrics are not calculated if the visibility state of the document was "hidden" at any point during the load.
:::

### Real User Monitoring Explore view

Explore contains dashboards from the [RUM App](#real-user-monitoring-app) to visualize Real User Monitoring metrics gathered from tracing instrumentation in the browser. This provides visibility into an actual end-user experience by geographical locations, browser, and operating system types. This also helps you to understand how your customers experience the performance of your web application.

Explore organizes RUM data on three levels:

* Application: corresponds to the value of the application tag set in the JavaScript script above. This should correspond to your whole website defined by its business function, such as "Coffee shop".
* Service: corresponds to the name of the service in the JavaScript script above. This should correspond to a JS code executed in the browser, such as "coffee-shop-web". You can have multiple services for each application. 
* Action Name: automatically generated from URLs. No configuration is required.

Action names can contain asterisks (\*) to replace automatically-detected dynamic parts of the URL. If you have action names that overlap, the action name with an asterisk contains data for page loads NOT contained in more specific action names:

For example:

`http://www.site.com/path/page.htm`

does not contain actions from 

`http://www.site.com/path/*`

There are three dashboard types on the **Application** and **Service** level and a single one on the **Action** level. You can select the appropriate dashboard from drop-down menu in the header:

![explore rum with red box.png](/img/rum/explore-rum-with-red-box.png)

## Real User Monitoring App

### App Installation

The Real User Monitoring App is **automatically installed** for all users of your organization once Sumo Logic detects data coming from user browsers. The content is placed in **Sumo Logic RUM - default dashboards** inside the **Admin Recommended** folder and is automatically available for all users in the organization. Do not modify or delete content in this folder as it gets automatically maintained and updated.

If for any reason this gets removed, you can install the App manually from **App Catalog**:

1. From the **App Catalog**, search for and select the **Real User Monitoring** app. 
1. Click **Add to Library**.
1. Provide an **App Name**. You can retain the existing name or enter a name of your choice for the app.
1. **Advanced**. Select the Location in Library (the default is the Personal folder in the library), or click New Folder to add a new folder.
1. Click **Add to Library**.

Once the app is installed, it will appear in your **Personal** folder or the folder you specified. From here, you can share it with your organization.

### Dashboards

#### RUM Overview Application/Service/Action

The **RUM Overview Application/Service/Action** dashboards show the user experience for performance and requests metrics for selected application, service, or action, broken down per top geo-locations, operating systems, and browsers.

Use this dashboard to:

 * Analyze load and paint timings for page document loads by application, service, or action.
 * Understand what top browsers, operating systems, and locations are active with your website.

You can select the timing metric type in the **statistic** dropdown on the dashboard header. This will change the browser time metrics types on charts.

You can also click on any data-point on the charts to open a details panel and view the **Infrastructure** tab to drill-down to traces representing user transactions from the selected time point.

![RUM_Overview.png](/img/rum/RUM_Overview.png)

#### RUM TopN Application/Service

The **RUM TopN Application** dashboards show top N browsers, operating systems, and geographical locations by load time and requests for the selected **application** or **service**.

Use this dashboard to:

 * Find out top N browsers, operating systems, and geolocations by load or requests.
 * Understand the slowest and fastest browsers from a rendering perspective or geographical locations from a network perspective.
 * Find out which browsers, operating systems are in use by your users and where are they are geographically located.

You can select the timing metric type in the **statistic** dropdown on the dashboard header. This will change the browser time metrics types on charts. You can also define the top N number for all charts.

![img](/img/rum/RUM-TopN-Application.png)

#### RUM Performance Analytics Application/Service

The **RUM Performance Analytics Application** dashboards show the page performance and requests for a cohort of users specified by selecting the desired combination of dimensions.

Use this dashboard to:

* Filter data for specific combinations of browser and/or operating system, and/or geolocation.
* Understand load and timing metrics for the selected user cohort.

You can compare the timings against previous days' data by selecting the appropriate option in the **compare_with** drop-down.

For cross-dimensional metrics, only the average statistic type is available.

You can click on any data-point on the charts to open a details panel and view the **Infrastructure** tab to drill-down to traces representing user transactions from the selected time point.

![img](/img/rum/RUM-Performance-Analytics-Application.png)
