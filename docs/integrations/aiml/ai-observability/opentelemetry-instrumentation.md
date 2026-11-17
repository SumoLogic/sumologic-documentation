---
id: instrument-your-llm-application-with-opentelemetry
title: Send your GenAI traces to Sumo Logic with OpenTelemetry
sidebar_label: Instrument LLM Applications with OpenTelemetry
keywords:
  - apps
  - ai-observability
  - llm
  - genai
  - opentelemetry
  - instrumentation
description: Learn how to instrument your LLM application with OpenTelemetry to send GenAI trace spans to Sumo Logic for AI Observability.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <meta name="robots" content="noindex" />
</head>

<img src={useBaseUrl('img/observability/ai-observability/AI-Observability-icon.png')} alt="AI Observability icon" width="60"/>

The Sumo Logic AI Observability app reads OpenTelemetry (OTel) traces that follow the OpenTelemetry GenAI semantic conventions. Any library that emits `gen_ai.*` span attributes works, and you don't need a Sumo Logic agent or SDK.

## Get started with OpenTelemetry instrumentation

:::tip
Use either [OpenLLMetry](/docs/integrations/aiml/ai-observability/instrument-your-llm-application-with-openllmetry) or OpenTelemetry instrumentation method per process. Running both can generate duplicate spans.
:::

| Category | OpenTelemetry |
|:--|:--|
| Overview | Official [OpenTelemetry packages for GenAI](https://github.com/open-telemetry/opentelemetry-python-genai). |
| Setup | Install and enable a package for each provider or framework. |
| Prompt and response capture | Disabled by default. Must be enabled. |
| Best suited for | A simple, vendor-neutral setup. |

## Tested providers and frameworks

The following providers and frameworks have been tested with OpenTelemetry. any provider or framework that OpenTelemetry instruments and that emits `gen_ai.*` span attributes works with the app.

| Vendor | OpenTelemetry |
|:--|:--|
| Google Gemini | Yes |
| Groq | Yes, through the OpenAI SDK. |
| LangChain and LangGraph | Yes |
| LlamaIndex | Yes |
| Haystack | Not covered yet. |
| OpenAI and AI gateways: Helicone, OpenRouter, Braintrust | Yes |

## How to instrument your LLM application?

### Prerequisites

- Create a Sumo Logic [OTLP/HTTP source](/docs/send-data/hosted-collectors/http-source/otlp/) and copy its source URL. The URL contains the authentication token, so you don't need to set headers or API keys.
- Use Python 3.10 or later.
- Use one virtual environment per method. Don't install OpenTelemetry and OpenLLMetry together.

### Step 1. Set up the exporter

Set up the exporter only once in your application, using OpenTelemetry. Every example in [Instrument your application](#step-2-instrument-your-application) assumes it has run first, so none of them repeats it.

1. Set the following environment variables, along with your LLM provider's API key:
        
        ```
        export OTEL_EXPORTER_OTLP_ENDPOINT="<YOUR_SOURCE_URL>"

        export OTEL_SERVICE_NAME="<YOUR_SERVICE_NAME>"
        export OTEL_RESOURCE_ATTRIBUTES="deployment.environment=<YOUR_ENVIRONMENT>"
        export OTEL_METRICS_EXPORTER=none  # Sumo Logic drops OTLP histogram metrics, so send traces only
        export OTEL_LOGS_EXPORTER=none
        ```

        `OTEL_SERVICE_NAME` becomes the service filter in the dashboards and `deployment.environment` becomes the environment filter.

2. Install packages:

        ```
        pip install "opentelemetry-sdk>=1.43" "opentelemetry-exporter-otlp-proto-http>=1.43" "opentelemetry-util-genai==1.3b0"
        ```

3. Initialize the exporter by adding the following code at the start of your application, before you import any LLM library:

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

4. Flush spans before the process exits. This matters for short-lived scripts:

        ```
        provider.shutdown()
        ```

        In a long-running service, skip the shutdown call. Spans are sent in batches.

### Step 2. Instrument your application

You can use Python to instrument your LLM application directly with OpenTelemetry.

<Tabs
  values={[
    {label: 'Python', value: 'Python'},
    // {label: 'Node.js', value: 'Node.js'},
  ]}>

<TabItem value="Python">

<details>
    <summary>Google Gemini</summary>

    Traces content generation, including streamed calls, made with the [Google GenAI SDK](https://github.com/googleapis/python-genai) (`google-genai`), for both the Gemini Developer API and Vertex AI.

    Gemini spans use the operation name `generate_content`, not `chat`.

    **Install**:

    `pip install "opentelemetry-instrumentation-google-genai==1.3b0" "google-genai<3"`

    The instrumentor supports `google-genai` versions earlier than 3.0. With 3.x installed, it logs a warning and emits no spans.

    **Run the following code after the [OpenTelemetry setup](#step-1-set-up-the-exporter)**:

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

    **Additional resources**:
    - [OpenTelemetry Google GenAI package](https://github.com/open-telemetry/opentelemetry-python-genai/tree/main/instrumentation/opentelemetry-instrumentation-google-genai)
    - [OpenTelemetry Python](https://opentelemetry.io/docs/languages/python/)

</details>

<details>
    <summary>Groq</summary>

    Traces chat completions sent to [Groq](https://console.groq.com/docs/overview).

    **Install**:

    `pip install "opentelemetry-instrumentation-genai-openai==1.3b0" openai`

    **Run the following code after the [OpenTelemetry setup](#step-1-set-up-the-exporter)**:

    ```
    import os
    from opentelemetry.instrumentation.genai.openai import OpenAIInstrumentor
    OpenAIInstrumentor().instrument()

    from openai import OpenAI

    # Groq's OpenAI-compatible endpoint
    client = OpenAI(api_key=os.environ["GROQ_API_KEY"], base_url="https://api.groq.com/openai/v1")

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[{"role": "user", "content": "What is 15 multiplied by 7?"}],
        max_tokens=100,
    )
    print(response.choices[0].message.content)
    ```

    There is no OpenTelemetry Groq package, so this uses the OpenAI SDK with Groq's [OpenAI-compatible endpoint](https://console.groq.com/docs/openai). The provider is reported as `openai`.

    **Additional resources**:
    - [OpenTelemetry Python](https://opentelemetry.io/docs/languages/python/)

</details>

<details>
    <summary>LangChain and LangGraph</summary>

    Traces agents, chains, chat models, and tool calls. One package covers both LangChain and LangGraph. The example is a tool-calling agent: each run appears as an `invoke_workflow` span with `chat <model>` and `execute_tool <tool>` child spans.

    **Install**:

    `pip install "opentelemetry-instrumentation-genai-langchain==1.3b0" "langchain<2" langchain-openai`

    **Run the following code after the [OpenTelemetry setup](#step-1-set-up-the-exporter)**:

    ```
    import os
    from opentelemetry.instrumentation.genai.langchain import LangChainInstrumentor
    LangChainInstrumentor().instrument()  # covers LangChain and LangGraph

    from langchain_core.tools import tool
    from langchain_openai import ChatOpenAI
    from langchain.agents import create_agent

    @tool
    def multiply(a: int, b: int) -> int:
        """Multiply two integers."""
        return a * b

    agent = create_agent(ChatOpenAI(model="gpt-4o-mini"), tools=[multiply])  # reads OPENAI_API_KEY

    result = agent.invoke(
        {"messages": [("user", "What is 15 multiplied by 7?")]},
        {"configurable": {"thread_id": "session-123"}},  # sets gen_ai.conversation.id (OpenTelemetry)
    )
    print(result["messages"][-1].content)
    ```
    Install the `langchain` package itself, not only `langchain-core`. Without it, the instrumentor logs a warning and emits no spans.

    **Additional resources**:
    - [OpenTelemetry LangChain package](https://github.com/open-telemetry/opentelemetry-python-genai/tree/main/instrumentation/opentelemetry-instrumentation-genai-langchain)
    - [OpenTelemetry Python](https://opentelemetry.io/docs/languages/python/)


</details>

<details>
    <summary>LlamaIndex</summary>

    Traces retrieval, query engines, agents, and the LLM and embedding calls they make with [LlamaIndex](https://docs.llamaindex.ai/).

    **Install**:

    `pip install "opentelemetry-instrumentation-genai-llama-index==1.3b0" "opentelemetry-instrumentation-genai-openai==1.3b0" llama-index-core llama-index-llms-openai llama-index-embeddings-openai`

    **Run the following code after the [OpenTelemetry setup](#step-1-set-up-the-exporter)**:

    ```
    from opentelemetry.instrumentation.genai.llama_index import LlamaIndexInstrumentor
    from opentelemetry.instrumentation.genai.openai import OpenAIInstrumentor

    LlamaIndexInstrumentor().instrument()  # retrieval, agents, tools
    OpenAIInstrumentor().instrument()      # the chat call LlamaIndex delegates to the OpenAI SDK

    from llama_index.core import Document, Settings, VectorStoreIndex
    from llama_index.embeddings.openai import OpenAIEmbedding
    from llama_index.llms.openai import OpenAI

    Settings.llm = OpenAI(model="gpt-4o-mini")  # reads OPENAI_API_KEY
    Settings.embed_model = OpenAIEmbedding(model="text-embedding-3-small")

    index = VectorStoreIndex.from_documents([
        Document(text="Sumo Logic accepts OpenTelemetry traces over OTLP/HTTP."),
        Document(text="The AI Observability app reads gen_ai.* span attributes."),
    ])
    print(index.as_query_engine().query("How do I send LLM traces to Sumo Logic?"))
    ```

    The `LlamaIndexInstrumentor` traces retrieval, agents, and tools. The model call is traced by the OpenAI instrumentor, so install both.

    **Additional resources**:
    - [OpenTelemetry LlamaIndex package](https://github.com/open-telemetry/opentelemetry-python-genai/tree/main/instrumentation/opentelemetry-instrumentation-genai-llama-index)
    - [OpenTelemetry Python](https://opentelemetry.io/docs/languages/python/)

</details>

<details>
    <summary>OpenAI and AI gateways: Helicone, OpenRouter, Braintrust</summary>

    Traces calls made with the [OpenAI Python SDK](https://github.com/openai/openai-python), directly or through an OpenAI-compatible gateway. To use a gateway, set `base_url` to it.

    The provider is reported as `openai`. Use the **Gateway/API Base Distribution** panel, which reads `server.address`, to split traffic by gateway.

    **Related sources**:
    - [Helicone](https://docs.helicone.ai/)
    - [OpenRouter](https://openrouter.ai/docs/quickstart)
    - [Braintrust](https://www.braintrust.dev/docs/guides/proxy)

    **Install**:

    `pip install "opentelemetry-instrumentation-genai-openai==1.3b0" openai`

    **Run the following code after the [OpenTelemetry setup](#step-1-set-up-the-exporter)**:

    ```
    import os
    from opentelemetry.instrumentation.genai.openai import OpenAIInstrumentor
    OpenAIInstrumentor().instrument()

    from openai import OpenAI

    # Pick your gateway's base URL and key:
    #   Helicone   https://gateway.helicone.ai/api/v1   (plus a Helicone-Auth header)
    #   OpenRouter https://openrouter.ai/api/v1
    #   Braintrust https://api.braintrust.dev/v1/proxy
    client = OpenAI(api_key=os.environ["OPENROUTER_API_KEY"], base_url="https://openrouter.ai/api/v1")

    response = client.chat.completions.create(
        model="openai/gpt-4o-mini",
        messages=[{"role": "user", "content": "What is 15 multiplied by 7?"}],
        max_tokens=100,
    )
    print(response.choices[0].message.content)
    ```

    For Helicone, also pass the Helicone key and the provider to forward to:

    ```
    client = OpenAI(
        api_key=os.environ["OPENROUTER_API_KEY"],
        base_url="https://gateway.helicone.ai/api/v1",
        default_headers={
            "Helicone-Auth": f"Bearer {os.environ['HELICONE_API_KEY']}",
            "Helicone-Target-Url": "https://openrouter.ai",
        },
    )
    ```

    **Additional resources**:
    - [OpenTelemetry Python](https://opentelemetry.io/docs/languages/python/)

</details>

</TabItem>

{/*
<TabItem value="Node.js">

  <details>
  <summary>Google Gemini</summary>

  This is the detailed content.

  </details>

    <details>
    <summary>Groq</summary>

    This is the detailed content.

  </details>

  <details>
    <summary>LangChain and LangGraph</summary>

    This is the detailed content.

  </details>

  <details>
    <summary>LlamaIndex</summary>

    This is the detailed content.

  </details>

  <details>
    <summary>Haystack</summary>

    This is the detailed content.

  </details>

  <details>
    <summary>OpenAI and AI gateways</summary>

    This is the detailed content.

  </details>

</TabItem>
*/}
</Tabs>

## Optional settings

### Track conversations

The Conversation Analytics dashboard and the `conversation_id` filter require `gen_ai.conversation.id` on each LLM span. Use one ID for every call in the same chat or session. Don't include personal data.


| Method | How to set the conversation ID |
|:--|:--|
| OpenTelemetry LangChain | `chain.invoke(inputs, {"metadata": {"session_id": "<ID>"}})` |
| OpenTelemetry LangGraph and LangChain agents | `agent.invoke(inputs, {"configurable": {"thread_id": "<ID>"}})` |
| Other OpenTelemetry packages (OpenAI, Gemini, LlamaIndex, gateways) | Wrap the call in a workflow with `TelemetryHandler`, as shown below.|

```
from opentelemetry.util.genai.handler import TelemetryHandler

handler = TelemetryHandler(tracer_provider=provider)

with handler.workflow("chat_session", conversation_id="<ID>"):
    response = client.chat.completions.create(...)  # nested LLM spans inherit the ID
```

### Capture prompts and responses

:::info
Prompts and responses can contain personal data, credentials, or regulated data. Review your data-handling policies before you capture them in production.
:::

Content is the text your application exchanges with the model:
* Prompts and system instructions.
* Model responses.
* Tool call arguments and results.

Only the **Prompt and Response Analytics** dashboard and the tool input and output panels use content. All other panels work without it.

OpenTelemetry doesn't capture content by default. To turn it on, set `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=SPAN_ONLY`. See [GenAI configuration](https://github.com/open-telemetry/opentelemetry-python-contrib/blob/main/util/opentelemetry-util-genai/README.rst).

### Other providers

If no package covers your provider, use the OpenTelemetry setup from any example above and set the `gen_ai.*` attributes on your own span:

```
tracer = trace.get_tracer(__name__)

with tracer.start_as_current_span("chat my-model", kind=trace.SpanKind.CLIENT) as span:
    span.set_attribute("gen_ai.operation.name", "chat")
    span.set_attribute("gen_ai.provider.name", "my-provider")
    span.set_attribute("gen_ai.request.model", "my-model")
    response = call_my_model(prompt)
    span.set_attribute("gen_ai.usage.input_tokens", response.input_tokens)
    span.set_attribute("gen_ai.usage.output_tokens", response.output_tokens)
    span.set_attribute("gen_ai.response.finish_reasons", [response.finish_reason])
```

For every attribute, see [GenAI client spans](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md) and [GenAI agent spans](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md).

## Verify data collection

Run your application, send a few requests, and then run this log search in Sumo Logic:

`_index=_trace_spans service="<YOUR_SERVICE_NAME>"`

Within a few minutes, you should see one row per provider, model, and operation. Then open any AI Observability dashboard and select your service in the `service` filter.

## Additional resources

- [OpenTelemetry GenAI semantic conventions](https://github.com/open-telemetry/semantic-conventions-genai)
- [OpenTelemetry GenAI Python instrumentations](https://github.com/open-telemetry/opentelemetry-python-genai)
- [OpenTelemetry Python](https://opentelemetry.io/docs/languages/python/)
