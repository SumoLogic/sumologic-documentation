---
id: service-intelligence
title: Service Intelligence
description: Generate a service map to analyze service coverage and stability.
---

<head>
 <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/observability/service-intelligence-icon.png')} alt="icon" width="50"/>

Service Intelligence uses AI to analyze logs to generate a map of system services, revealing areas that require attention. It surfaces real-time signals for issues such as latency, errors, high traffic, and security anomalies, providing actionable paths for root-cause analysis.

The functionality of Service Intelligence is similar to that of the [Services list and map](/docs/apm/traces/services-list-map/), but uses AI to generate the list and map, providing deeper insights and more targeted surfacing of areas of concern.

## View a service list and map

The service list and map visually maps out your application environment, giving you a greater understanding of your application architecture, hierarchy, and dependencies between monitored microservices. Health and load of each microservice is reflected in size and color of nodes in the map to help you spot potential problems and bottlenecks in your application infrastructure.

1. In the main Sumo Logic menu of the [**New UI**](/docs/get-started/sumo-logic-ui), select **Service Intelligence**. (Service Intelligence is not available in the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic).) You can also click the **Go To...** menu at the top of the screen and select **Service Intelligence**. 
1. A list of services is displayed to the left, and and a map of services is displayed in the center. These services are automatically identified by AI analysis of logs in your entire enterprise. <br/><img src={useBaseUrl('img/observability/service-intelligence-initial-map.png')} alt="Service Intelligence list and map" style={{border: '1px solid gray'}} width="800" />
1. To refresh the list of services and the map:
    1. Click **Regenerate** in the **Regenerate Map** panel to right. The service list and map will be regenerated with the last 15 minutes' worth of data.
    1. Click the **Regenerate Map** button in the upper right to hide the **Regenerate Map** panel.<br/><img src={useBaseUrl('img/observability/service-intelligence-regenerate-map.png')} alt="Regenerate map" style={{border: '1px solid gray'}} width="125" />
    1. Use the buttons at the bottom of the screen to resize the map.<br/><img src={useBaseUrl('img/observability/service-intelligence-size-buttons.png')} alt="Resize buttons" style={{border: '1px solid gray'}} width="200" />

## View the signals summary

Clicking the **Insights** button displays a **Signals Summary** panel that shows a summary of service signals and steps to take to remediate issues.

1. Click the **Insights** (light bulb) button in the upper right. <br/><img src={useBaseUrl('img/observability/service-intelligence-insights-button.png')} alt="Insights button" style={{border: '1px solid gray'}} width="125" />
1. The **Signals Summary** displays findings, for example:<br/><img src={useBaseUrl('img/observability/service-intelligence-signals-summary.png')} alt="Signals summary" style={{border: '1px solid gray'}} width="300" />
1. Read the summary to find areas of concern and actions you can take. 

## View service signals

When you click a service in the list in the upper left, or a node in the map, a **Service Signals** panel displays. The panel contains findings about the service with log examples and steps you can take to remediate problems with the service.

1. Click the **Insights** (light bulb) button in the upper right.
1. Click a service in the list on the left, or click an individual node in the map. In the following example, we've clicked the Checkout Service.<br/><img src={useBaseUrl('img/observability/service-intelligence-checkout-service-example.png')} alt="Checkout Service example" style={{border: '1px solid gray'}} width="800" />
1. Notice how the **Service Signals** panel displays signals that require attention. When you click **Show Log Example**, it displays an example of a log entry that illustrates the issue. You can use this information to query for logs with similar content.<br/><img src={useBaseUrl('img/observability/service-intelligence-log-example.png')} alt="Log example" style={{border: '1px solid gray'}} width="300" />
1. Scroll to the bottom of the **Service Signals** pane to the **Next Steps** section. This section describes concrete steps you can take to remediate issues identified in that node.<br/><img src={useBaseUrl('img/observability/service-intelligence-next-steps.png')} alt="Service Intelligence next steps" style={{border: '1px solid gray'}} width="300" />
1.  From the **Next Steps** section, you can also:
     * View transactions dependent on the selected node.
     * Open [Copilot](/docs/search/copilot/) to investigate further.
