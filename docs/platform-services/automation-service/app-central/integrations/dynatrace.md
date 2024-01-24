---
title: Dynatrace
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/dynatrace.png)

Version: 1.1  
Updated: Jul 11, 2023

Dynatrace is a software-intelligence monitoring platform that simplifies enterprise cloud complexity and accelerates digital transformation. With Davis (the Dynatrace AI causation engine) and complete automation, the Dynatrace all-in-one platform provides answers, not just data, about the performance of your applications, their underlying infrastructure, and the experience of your end users. Dynatrace is used to modernize and automate enterprise cloud operations, release higher-quality software faster, and deliver optimum digital experiences to your organization's customers.

Dynatrace seamlessly brings infrastructure and cloud, application performance, and digital experience monitoring into an all-in-one, automated solution that's powered by artificial intelligence. Dynatrace assists in driving performance results by providing development, operations, and business teams with a shared platform, metrics. In this way, Dynatrace can serve as your organization's single "source of truth."

## Actions

* **Search Security Problems** *(Enrichment)* - Lists all security problems based the parameters provided
* **Search Security Problems Daemon** *(Daemon)* - Automatically returns latest security problems
* **Mute Security Problem** *(Containment)* - Mutes the specified security problem. Muted problems are hidden from the list of problems in the UI
* **Unmute Security Problem** *(Containment)* - Unmutes the specified security problem
* **Get Problems** *(Enrichment)* - Lists the problems (and their details) observed by Dynatrace during a relative period of time
* **Get Problems Daemon** *(Daemon)* - Automatically returns the latest problems
* **Close Problem** *(Containment)* - Closes the specified problem and adds a closing comment
* **Create Problem Comment** *(Containment)* - Adds a new comment on the specified problem
* **Search Logs** *(Enrichment)* - Lists all log records based on the parameters provided
* **Get Events** *(Enrichment)* - Lists events based on the parameters provided
* **Get Security Advices** *(Enrichment)* - Lists recommendations related to security problems using AI
* **Search Metrics** *(Enrichment)* - Lists all metrics based on the parameters provided
* **Search Metrics Daemon** *(Daemon)* - Automatically returns the latest metrics

**Timeframe**

You can use one of the following formats for timeframe:

* Timestamp in UTC milliseconds.
* Human-readable format of 2021-01-25T05:57:01.123+01:00. If no time zone is specified, UTC is used. You can use a space character instead of the T. Seconds and fractions of a second are optional.
* Relative timeframe, back from now. The format is now-NU/A, where N is the amount of time, U is the unit of time, and A is an alignment. The alignment rounds all the smaller values to the nearest zero in the past. For example, now-1y/w is one year back, aligned by a week. You can also specify relative timeframe without an alignment: now-NU. Supported time units for the relative timeframe are:
	+ m: minutes
	+ h: hours
	+ d: days
	+ w: weeks
	+ M: months
	+ y: years

**Event Selector**

Defines the scope of the query. Only events matching the specified criteria are included in the response.   


* Event ID: eventId("id-1", "id-2").
* ID of related entity: entityId("id-1", "id-2").
* Event status: status("OPEN") or status("CLOSED"). You can specify only one status.
* Management zone ID: managementZoneId("123", "321").
* Event type: eventType("event-type"). You can specify only one event type. You can fetch the list of possible event types with the GET event types call.
* Correlation ID: correlationId("id-1", "id-2").
* Happened during maintenance (true, false): underMaintenance(true).
* Notifications are suppressed (true, false): suppressAlert(true).
* Problem creation is suppressed (true, false): suppressProblem(true).
* Frequent event (true, false): frequentEvent(true).
* Event property: property.&lt;key&gt;("value-1", "value-2").

To set several criteria, separate them with commas (,). Only results matching all criteria are included in the response.

**Entity Selector**

The entity scope of the query. You must set one of these criteria:

* Entity type: type("TYPE")
* Dynatrace entity ID: entityId("id"). You can specify several IDs, separated by a comma (entityId("id-1","id-2")). All requested entities must be of the same type.

You can add one or several of the following criteria. Values are case-sensitive and the EQUALS operator is used unless otherwise specified.

* Tag: tag("value"). Tags in [context]key:value, key:value, and value formats are detected and parsed automatically. Any colons (:) that are part of the key or value must be escaped with a backslash(\), otherwise, it will be interpreted as the separator between the key and the value. All tag values are case-sensitive.
* Management zone ID: mzId(123)
* Management zone name: mzName("value")
* Entity name: entityName("value"). By default this filters for entities, whose name contains the given value and is not case sensitive. The following modifications are available:
	+ entityName.equals: changes the operator to EQUALS.
	+ entityName.startsWith: changes the operator to BEGINS WITH.
	+ entityName.in: enables you to provide multiple values. The EQUALS operator applies.
	+ caseSensitive(entityName("value")): takes any entity name criterion as an arguments and makes the value case-sensitive.
* Health state (HEALTHY,UNHEALTHY): healthState("HEALTHY")
* First seen timestamp: firstSeenTms.&lt;operator&gt;(now-3h). Use any timestamp format from the from/to parameters. The following operators are available:
	+ lte: earlier than or at the specified time
	+ lt: earlier than the specified time
	+ gte: later than or at the specified time
	+ gt: later than the specified time
* Entity attribute: &lt;attribute&gt;("value1","value2") and &lt;attribute&gt;.exists(). To fetch the list of available attributes, execute the GET entity type request and check the properties field of the response.
* Relationships: fromRelationships.&lt;relationshipName&gt;() and toRelationships.&lt;relationshipName&gt;(). The criterion takes an entity selector as an attribute. To fetch the list of available relationships, execute the GET entity type request and check the fromRelationships and toRelationships fields.
* Negation: not(&lt;criterion&gt;). Inverts any criterion except for type.   
For more information, see Entity selector in Dynatrace Documentation.

To set several criteria, separate them with a comma (,). For example, type("HOST"),healthState("HEALTHY"). Only results matching all criteria are included in response.

The length of the string is limited to 10,000 characters.

The number of entities that can be selected is limited to 10000.

**Metric Selector**

You can specify multiple metric keys separated by commas (for example, metrickey1,metrickey2). To select multiple metrics belonging to the same parent, list the last part of the required metric keys in parentheses, separated by commas, while keeping the common part untouched. For example, to list the builtin:host.cpu.idle and builtin:host.cpu.user metric, write: builtin:host.cpu.(idle,user).

You can select a full set of related metrics by using a trailing asterisk (\*) wildcard. For example, builtin:host.\* selects all host-based metrics and builtin:\* selects all Dynatrace-provided metrics.

You can set additional transformation operators, separated by a colon (:). See [Metrics selector transformations](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/metric-v2/metric-selector) in Dynatrace Documentation for additional information on available result transformations and syntax.

Only aggregation, merge, parents, and splitBy transformations are supported by this endpoint.

If the metric key contains any symbols you must quote (") the key. The following characters inside of a quoted metric key must be escaped with a tilde (~):

* Quotes (")
* Tildes (~)

For example, to query the metric with the key of ext:selfmonitoring.jmx.Agents: Type "APACHE" you must specify this selector:

"ext:selfmonitoring.jmx.Agents: Type ~"APACHE~""

To find metrics based on a search term, rather than metricId, use the text query parameter instead of this one.

**Log Search**

The log search query.

The query must use the [Dynatrace search query language](https://www.dynatrace.com/support/help/how-to-use-dynatrace/log-monitoring/analyze-log-data/log-viewer#sql).   
The query has a limit of 20 relations (logical operators between simple expressions (AND, OR) or comparison operators (=, !=, &lt;, &lt;=, &gt;, &gt;=) in simple expressions).

**Dynatrace Documentation**

More information can be found [here](https://www.dynatrace.com/support/help).

## Dynatrace configuration

To be authenticated to use the Dynatrace API, you need a valid access token. To generate an access token follow these steps:

1. In the "Dynatrace menu", select **Access tokens**
2. Select **Generate new token**
3. Enter a name for your token.   
Dynatrace doesn't enforce unique token names. You can create multiple tokens with the same name. Be sure to provide a meaningful name for each token you generate. Proper naming helps you to efficiently manage your tokens and perhaps delete them when they're no longer needed
4. Select the required scopes for the token
5. Select **Generate**
6. Copy the generated token to the clipboard. Store the token in a password manager for future use   
**NOTE:** You can only access your token once upon creation. You can't reveal it afterwards

## Dynatrace in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/dynatrace/dynatrace-1.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/dynatrace/dynatrace-2.png)

1. After the list of the integrations appears, search/look for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/dynatrace/dynatrace-3.png)

1. Populate all the required fields (\*)

1. Click **Save**.

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/dynatrace/dynatrace-4.png)

1. Click Test Saved Settings. <br/>![](/img/platform-services/automation-service/app-central/integrations/dynatrace/dynatrace-5.png)

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/dynatrace/dynatrace-6.png)

## Change Log

* May 9, 2022 - First upload
* July 11, 2023 (v1.1) - Updated the integration with Environmental Variables
