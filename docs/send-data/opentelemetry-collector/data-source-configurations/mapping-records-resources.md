---
id: mapping-records-resources
title: Mapping OpenTelemetry Concepts to Sumo Logic
sidebar_label: Mapping OTel Concepts to Sumo Logic
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page describes how to map your OpenTelemetry attributes like Resources, Records, and Instrumentation Scope, to Sumo Logic concepts like Fields.

OpenTelemetry has a [rich data model](https://github.com/open-telemetry/opentelemetry-proto/tree/main/opentelemetry/proto) that is internally constructed out of several layers. For all signals, these can be broken down into following:

* **Resource**. Includes attributes describing the resource from which given set of data comes from. Should follow [resource semantic conventions](https://github.com/open-telemetry/semantic-conventions).
* **Instrumentation Scope**. Additional information about the scope of data. For example, instrumentation library name.
* **Record**. Refers to a specific entry of data, such as a Log, Span, or Metric.
:::note
For logs, this is usually called a _Record_; for traces, it's usually called a _Span_; and for metrics, a _Datapoint_ (or _sample_, if Prometheus is used). In this documentation, we'll use _Record_ for all of these.
:::
Each Record has its own set of attributes, which may include key/value pairs that are specific to the context of the Record. Logs, in particular, can also include attributes in the body of the Record. Some Record types may follow certain conventions for signal types, such as [trace](https://github.com/open-telemetry/semantic-conventions), [metrics](https://github.com/open-telemetry/semantic-conventions), or [logs](https://github.com/open-telemetry/semantic-conventions).

As can be observed, while attributes can be present at both **Resource** and **Record-level** currently, they are not created equal and should be interpreted separately. The Resource-Level attribute context is much broader, and they identify where data comes from, whereas Record-Level attributes concern just one record, often with many keys and values.

At Sumo Logic, we use the concept of [Fields](/docs/manage/fields) for log data. Fields offer a powerful capability to associate indexable metadata with logs, though only a limited number of them can be used at a given time, and you must define them first.

Looking from the OpenTelemetry standpoint, [Fields](/docs/manage/fields) are a good match for the **Resource-level** attributes, while Log Record-level attributes are good fit for the [structured representation of the log via JSON](/docs/search/get-started-with-search/search-basics/view-search-results-json-logs), which is automatically supported by Sumo Logic Search.

All **Resource-level** attributes are stored as fields, and any attributes that do not match a defined field will be skipped. You can check the list of ignored fields using the [dropped fields view](/docs/manage/fields/#view-dropped-fields). When a log contains attributes at the **Record-level**, they are stored as JSON, and if there is a body, it will be stored under the `log` key.

:::info
If your log record has any **Record-level** attributes, Sumo will interpret this as a _structured log_, and display it in JSON. If the log does not have any **Record-level** attributes, Sumo will treat it as _unstructured_ and display the body. **Resource-level** attributes are interpreted as fields.
:::

## Example: Log with both Resource-level and Record-level attributes

Consider the following input log:

```yml
Resource:
  Attributes:
    "indexed-field": "some value"
Log:
  Body: "Sample body"
  Attributes:
    "log-level-attribute": 42
```

Such log will be stored as the following set of data at Sumo Logic:

```yml
Fields:
  "indexed-field": "some value"

_raw (JSON): {
  "log": "Sample body",
  "log-level-attribute": "42"
}
```

<img src={useBaseUrl('img/send-data/opentelemetry-collector/resource-and-record-level-attributes.png')} alt="resource and record attributes in Sumo Logic" style={{border: '1px solid gray'}} />

## Example: Log with Resource-level attributes only

If no log-level attributes are present, the log body is stored inline. For example, for the following input:

```json
Resource:
  Attributes:
    "indexed-field": "some value"
Log:
  Body: "Sample body"
```

The output is stored as:

```json
Fields:
  "indexed-field": "some value"

_raw: "Sample body"
```

<img src={useBaseUrl('img/send-data/opentelemetry-collector/resource-attributes-only.png')} alt="resource attributes only in Sumo Logic" style={{border: '1px solid gray'}} />
