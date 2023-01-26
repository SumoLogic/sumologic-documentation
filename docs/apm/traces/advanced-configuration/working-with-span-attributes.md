---
id: working-with-span-attributes
title: Working with Span Attributes
description: Learn how to modify the attributes of your spans.
---

You can add, delete, hash, or modify span attributes (metadata tags) on Collectors or directly in your application code. This helps you enhance diagnostic details included in your data, remove redundant information to cut the cost, or mask sensitive information before they leave your site.

## Attach logs to spans

You can collect logs with traces attached to them by [inserting `spanid` and `traceid` from span context when writing to logs](../get-started-transaction-tracing/opentelemetry-instrumentation/java/traceid-spanid-injection-into-logs-configuration.md). If that's not possible, you can assign any of the following fields:

 * error
 * error.kind
 * error.object
 * event
 * message
 * stack

and they are displayed in the **Span logs** tab in [Details Pane](/docs/apm/traces/view-and-investigate-traces) after clicking on the span.

![span logs in details pane.png](/img/traces/span-logs-in-details-pane.png)

## Working with attributes on OpenTelemetry collector

Whether you're using the Sumo Logic OpenTelemetry collector distribution, an original installation, or the OpenTelemetry collector as part of Sumo Logic Kubernetes collection, you can use the attributes processor to add, modify, delete, or hash the values of attributes.

Refer to the [OpenTelemetry collector attributes processor documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/attributesprocessor) for examples.

## Insert custom tags with instrumentation APIs

You can insert dynamically-created custom tags in your code by calling the appropriate functions of OpenTelemetry auto-instrumentation.

See how to pass [custom tags](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/java/custom-tags-configuration) for Java auto-instrumentation.
