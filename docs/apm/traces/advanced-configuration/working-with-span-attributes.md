---
id: working-with-span-attributes
---

# Working with Span attributes

You can add, delete, hash, or modify span attributes (metadata tags) on Collectors or directly in your application code. This helps you enhance diagnostic details included in your data, remove redundant information to cut the cost, or mask sensitive information before they leave your site.

## Attach logs to spans

You can collect logs with traces attached to them by [inserting spanid/traceid from span context when writing to logs](/Traces/Getting_Started_with_Transaction_Tracing/Instrument_your_application_with_OpenTelemetry/Java_OpenTelemetry_auto-instrumentation/TraceId_and_SpanId_injection_into_logs_configuratio.md).
If that's not possible, you can assign any of the following fields:

 * error
 * error.kind
 * error.object
 * event
 * message
 * stack

and they are displayed in the **Span logs** tab in [Details Pane](../02Working_with_Tracing_data/03View_and_investigate_traces.md "View and investigate traces") after clicking on the span.

![span logs in details pane.png](/img/traces/span-logs-in-details-pane.png)

## Working with attributes on OpenTelemetry collector

Regardless if you are using the Sumo Logic distribution of OpenTelemetry collector, an original installation, or the OpenTelemetry collector as part of Sumo Logic Kubernetes collection, you can use the attributes processor to add, modify, delete, or hash the values of attributes.

Refer to the [OpenTelemetry collector attributes processor documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/attributesprocessor) for examples.

## Insert custom tags with instrumentation APIs

You can insert dynamically-created custom tags in your code by calling the appropriate functions of OpenTelemetry auto-instrumentation.

See how to pass [custom tags](../01Getting_Started_with_Transaction_Tracing/01Instrument_your_application_with_OpenTelemetry/Java_OpenTelemetry_auto-instrumentation/Custom_tags_configuration.md "Custom tags configuration") for Java auto-instrumentation.
