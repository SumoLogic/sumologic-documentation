---
id: instrument-your-llm-application
title: LLM Application Instrumentation
sidebar_label: LLM Application Instrumentation
keywords:
  - apps
  - ai-observability
  - llm
  - genai
  - opentelemetry
  - instrumentation
description: 
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <meta name="robots" content="noindex" />
</head>

<img src={useBaseUrl('img/observability/ai-observability/AI-Observability-icon.png')} alt="AI Observability icon" width="60"/>

The Sumo Logic AI Observability app reads OpenTelemetry (OTel) traces that follow the OpenTelemetry GenAI semantic conventions. Any library that emits `gen_ai.*` span attributes works, and you don't need a Sumo Logic agent or SDK.

## Choose an instrumentation method

:::tip
Use one method per process. Running both creates duplicate spans.
:::

| Category | OpenTelemetry | OpenLLMetry |
|:--|:--|:--|
| Overview | Official [OpenTelemetry packages for GenAI](https://github.com/open-telemetry/opentelemetry-python-genai) | Open-source [Traceloop SDK](https://github.com/traceloop/openllmetry) built on OpenTelemetry |
| Setup | Install and enable a package for each provider or framework | Install the SDK and initialize it with `Traceloop.init()` |
| Prompt and response capture | Disabled by default. Must be enabled | Enabled by default |
| Best suited for | A simple, vendor-neutral setup | Broad provider and framework coverage with minimal code |

## Supported providers and frameworks

| Vendor | OpenTelemetry | OpenLLMetry |
|:--|:--|:--|
| Google Gemini | Yes | Yes |
| Groq | Yes, through the OpenAI SDK | Yes |
| LangChain and LangGraph | Yes | Yes |
| LlamaIndex | Yes | Yes |
| Haystack | Not covered yet | Yes |
| OpenAI and AI gateways: Helicone, OpenRouter, Braintrust | Yes | Yes |

## How to instrument your LLM application?

### Prerequisites

1. Create a Sumo Logic [OTLP/HTTP source](/docs/send-data/hosted-collectors/http-source/otlp/) and copy its source URL. The URL contains the authentication token, so you don't need to set headers or API keys.
1. Use Python 3.10 or later.
1. Use one virtual environment per method. Don't install OpenTelemetry and OpenLLMetry together.

### Step 1. Set up the exporter

Set up the exporter only once in your application, using [OpenTelemetry](#opentelemetry-setup) or [OpenLLMetry](#openllmetry-setup). Every example in [Instrument your application](#step-2-instrument-your-application) assumes it has run first, so none of them repeats it.

#### OpenTelemetry setup

**Step 1. Set environment variables**

Set these environment variables, along with your LLM provider's API key:

```
export OTEL_EXPORTER_OTLP_ENDPOINT="<YOUR_SOURCE_URL>"

export OTEL_SERVICE_NAME="<YOUR_SERVICE_NAME>"
export OTEL_RESOURCE_ATTRIBUTES="deployment.environment=<YOUR_ENVIRONMENT>"
export OTEL_METRICS_EXPORTER=none  # Sumo Logic drops OTLP histogram metrics, so send traces only
```

`OTEL_SERVICE_NAME` becomes the service filter in the dashboards and `deployment.environment` becomes the environment filter.

**Step 2. Install packages**

```
pip install "opentelemetry-sdk>=1.43" "opentelemetry-exporter-otlp-proto-http>=1.43" "opentelemetry-util-genai==1.3b0"
```

**Step 3. Initialize the exporter**

Add the following code at the start of your application, before you import any LLM library:

```
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# Endpoint, service.name and deployment.environment come from the
# OTEL_EXPORTER_OTLP_*, OTEL_SERVICE_NAME and OTEL_RESOURCE_ATTRIBUTES env vars.
provider = TracerProvider(resource=Resource.create())
provider.add_span_processor(BatchSpanProcessor(OTLPSpanExporter()))
trace.set_tracer_provider(provider)
```

**Step 4. Flush spans before exit**

Before the process exits, flush buffered spans. This matters for short-lived scripts:

```
provider.shutdown()
```

In a long-running service, skip the shutdown call. Spans are sent in batches.

#### OpenLLMetry setup

**Step 1. Set environment variables**

Set these environment variables, along with your LLM provider's API key. Use the same source URL value as the OpenTelemetry method:

```
export TRACELOOP_BASE_URL="<YOUR_SOURCE_URL>"

export OTEL_SERVICE_NAME="<YOUR_SERVICE_NAME>"
export OTEL_RESOURCE_ATTRIBUTES="deployment.environment=<YOUR_ENVIRONMENT>"
export OTEL_METRICS_EXPORTER=none  # Sumo Logic drops OTLP histogram metrics, so send traces only
```

`OTEL_SERVICE_NAME` becomes the service filter in the dashboards and `deployment.environment` becomes the environment filter.

**Step 2. Install the SDK**

```
pip install "traceloop-sdk>=0.62.0"
```

**Step 3. Initialize the SDK**

Add the following code at the start of your application, before you import any LLM or framework library:

```
import os
from traceloop.sdk import Traceloop

# Endpoint comes from TRACELOOP_BASE_URL. Service name and deployment.environment
# come from OTEL_SERVICE_NAME and OTEL_RESOURCE_ATTRIBUTES.
Traceloop.init(
    app_name=os.getenv("OTEL_SERVICE_NAME"),
    api_endpoint=os.getenv("TRACELOOP_BASE_URL"),
    telemetry_enabled=False,  # don't send anonymous SDK usage data to Traceloop
)
```

**Step 4. Flush spans before exit**

Before the process exits, flush buffered spans. OpenLLMetry has no public `flush()`, but it registers the global provider:

```
from opentelemetry import trace

trace.get_tracer_provider().shutdown()
```

In a long-running service, skip the shutdown call. Spans are sent in batches.

### Step 2. Instrument your application

Each vendor below has a section for each method. In Google Docs, click the arrow next to a heading to collapse or expand it. The examples show only the install line for the integration and the code that follows the setup above.

Each vendor below has a section for each method. In Google Docs, click the arrow next to a heading to collapse or expand it.

<Tabs
  className="outer-tabs"
  defaultValue="OpenTelemetry"
  values={[
    {label: 'OpenTelemetry', value: 'OpenTelemetry'},
    {label: 'OpenLLMetry', value: 'OpenLLMetry'},
  ]}>

<TabItem value="OpenTelemetry">

<Tabs
  className="inner-tabs"
  defaultValue="otel-tab1"
  values={[
    {label: 'Google Gemini', value: 'otel-tab1'},
    {label: 'Groq', value: 'otel-tab2'},
    {label: 'LangChain and LangGraph', value: 'otel-tab3'},
    {label: 'LlamaIndex', value: 'otel-tab4'},
    {label: 'Haystack', value: 'otel-tab5'},
    {label: 'OpenAI and AI gateways: Helicone, OpenRouter, Braintrust', value: 'otel-tab6'},
  ]}>

<TabItem value="otel-tab1">

Traces content generation, including streamed calls, made with the [Google GenAI SDK](https://github.com/googleapis/python-genai) (`google-genai`), for both the Gemini Developer API and Vertex AI.

Gemini spans use the operation name `generate_content`, not `chat`.

**Install**:

`pip install "opentelemetry-instrumentation-google-genai==1.3b0" google-genai`

**Run the following code after the [OpenTelemetry setup](#opentelemetry-setup)**:

```
import os
from opentelemetry.instrumentation.google_genai import GoogleGenAiSdkInstrumentor
GoogleGenAiSdkInstrumentor().instrument()

from google import genai

client = genai.Client()  # reads GEMINI_API_KEY

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="What is 15 multiplied by 7?",
)
print(response.text)
```

The provider is reported as `gcp.gemini`.

**Related sources**:
- [OpenTelemetry Google GenAI package](https://github.com/open-telemetry/opentelemetry-python-genai/tree/main/instrumentation/opentelemetry-instrumentation-google-genai)
- [OpenTelemetry Python](https://opentelemetry.io/docs/languages/python/)


</TabItem>
<TabItem value="otel-tab2">

Traces chat completions sent to [Groq](https://console.groq.com/docs/overview).

**Install**:

`pip install "opentelemetry-instrumentation-genai-openai==1.3b0" openai`

**Run the following code after the [OpenTelemetry setup](#opentelemetry-setup)**:

```
import os
from opentelemetry.instrumentation.genai.openai import OpenAIInstrumentor
OpenAIInstrumentor().instrument()

from openai import OpenAI

//Groq's OpenAI-compatible endpoint
client = OpenAI(api_key=os.environ["GROQ_API_KEY"], base_url="https://api.groq.com/openai/v1")

response = client.chat.completions.create(
    model="openai/gpt-oss-20b",
    messages=[{"role": "user", "content": "What is 15 multiplied by 7?"}],
    max_tokens=100,
)
print(response.choices[0].message.content)
```

There is no OpenTelemetry Groq package, so this uses the OpenAI SDK with Groq's [OpenAI-compatible endpoint](https://console.groq.com/docs/openai). The provider is reported as `openai`.

**Related sources**:
- [OpenTelemetry Python](https://opentelemetry.io/docs/languages/python/)


</TabItem>
<TabItem value="otel-tab3">

Content for OpenTelemetry tab 3.

</TabItem>
<TabItem value="otel-tab4">

Content for OpenTelemetry tab 4.

</TabItem>
<TabItem value="otel-tab5">

Content for OpenTelemetry tab 5.

</TabItem>
<TabItem value="otel-tab6">

Content for OpenTelemetry tab 6.

</TabItem>
</Tabs>

</TabItem>

<TabItem value="OpenLLMetry">

<Tabs
  className="inner-tabs"
  defaultValue="llm-tab1"
  values={[
    {label: 'Google Gemini', value: 'llm-tab1'},
    {label: 'Groq', value: 'llm-tab2'},
    {label: 'LangChain and LangGraph', value: 'llm-tab3'},
    {label: 'LlamaIndex', value: 'llm-tab4'},
    {label: 'Haystack', value: 'llm-tab5'},
    {label: 'OpenAI and AI gateways: Helicone, OpenRouter, Braintrust', value: 'llm-tab6'},
  ]}>

<TabItem value="llm-tab1">

Traces content generation, including streamed calls, made with the [Google GenAI SDK](https://github.com/googleapis/python-genai) (`google-genai`), for both the Gemini Developer API and Vertex AI.

Gemini spans use the operation name `generate_content`, not `chat`.

**Install**:

`pip install "traceloop-sdk>=0.62.0" google-genai`

**Run the following code after the [OpenLLMetry setup](#openllmetry-setup)**:

```
import os
from google import genai

client = genai.Client()  # reads GEMINI_API_KEY

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="What is 15 multiplied by 7?",
)
print(response.text)
```

The provider is reported as `gcp.gen_ai`.

**Related sources**:
- [OpenLLMetry Google Generative AI](https://github.com/traceloop/openllmetry/tree/main/packages/opentelemetry-instrumentation-google-generativeai)
- [OpenLLMetry Python](https://www.traceloop.com/docs/openllmetry/getting-started-python)


</TabItem>
<TabItem value="llm-tab2">

Traces chat completions sent to [Groq](https://console.groq.com/docs/overview).

**Install**:

`pip install "traceloop-sdk>=0.62.0" groq`

**Run the following below after the [OpenLLMetry setup](#openllmetry-setup)**:

```
import os
from groq import Groq

client = Groq()  # reads GROQ_API_KEY

response = client.chat.completions.create(
    model="openai/gpt-oss-20b",
    messages=[{"role": "user", "content": "What is 15 multiplied by 7?"}],
    max_tokens=100,
)
print(response.choices[0].message.content)
```

Uses the native [Groq SDK](https://github.com/groq/groq-python), so the provider is reported correctly as `groq`.

Official docs:
- [OpenLLMetry Groq](https://github.com/traceloop/openllmetry/tree/main/packages/opentelemetry-instrumentation-groq)
- [OpenLLMetry Python](https://www.traceloop.com/docs/openllmetry/getting-started-python)


</TabItem>
<TabItem value="llm-tab3">

Content for OpenLLMetry tab 3.

</TabItem>
<TabItem value="llm-tab4">

Content for OpenLLMetry tab 4.

</TabItem>
<TabItem value="llm-tab5">

Content for OpenLLMetry tab 5.

</TabItem>
<TabItem value="llm-tab6">

Content for OpenLLMetry tab 6.

</TabItem>
</Tabs>

</TabItem>
</Tabs>