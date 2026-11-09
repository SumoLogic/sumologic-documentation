---
id: instrument-your-llm-application-with-openllmetry
title: Send your GenAI traces to Sumo Logic with OpenLLMetry
sidebar_label: Instrument LLM Applications with OpenLLMetry
keywords:
  - apps
  - ai-observability
  - llm
  - genai
  - openllmetry
  - instrumentation
description: Learn how to instrument your LLM application with OpenLLMetry to send GenAI trace spans to Sumo Logic for AI Observability.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <meta name="robots" content="noindex" />
</head>

<img src={useBaseUrl('img/observability/ai-observability/AI-Observability-icon.png')} alt="AI Observability icon" width="60"/>

The Sumo Logic AI Observability app reads OpenLLMetry traces that follow the OpenLLMetry GenAI semantic conventions. Any library that emits `gen_ai.*` span attributes works, and you don't need a Sumo Logic agent or SDK.

## Get started with OpenLLMetry instrumentation

:::tip
Use either OpenLLMetry or [OpenTelemetry](/docs/observability/ai-observability/opentelemetry-instrumentation) instrumentation method per process. Running both can generate duplicate spans.
:::

| Category | OpenLLMetry |
|:--|:--|
| Overview | Open-source [Traceloop SDK](https://github.com/traceloop/openllmetry) built on OpenTelemetry. |
| Setup | Install the SDK and initialize it with `Traceloop.init()`. |
| Prompt and response capture | Enabled by default. |
| Best suited for | Broad provider and framework coverage with minimal code. |

## Supported providers and frameworks

| Vendor | OpenLLMetry |
|:--|:--|
| Google Gemini | Yes |
| Groq | Yes |
| LangChain and LangGraph | Yes |
| LlamaIndex | Yes |
| Haystack | Yes |
| OpenAI and AI gateways: Helicone, OpenRouter, Braintrust | Yes |

## How to instrument your LLM application?

### Prerequisites

- Create a Sumo Logic [OTLP/HTTP source](/docs/send-data/hosted-collectors/http-source/otlp/) and copy its source URL. The URL contains the authentication token, so you don't need to set headers or API keys.
- Use Python 3.10 or later.
- Use one virtual environment per method. Don't install OpenTelemetry and OpenLLMetry together.

### Step 1. Set up the exporter

Set up the exporter only once in your application, using OpenLLMetry. Every example in [Instrument your application](#step-2-instrument-your-application) assumes it has run first, so none of them repeats it.

1. Set the following environment variables, along with your LLM provider's API key. Use the same source URL value as the OpenTelemetry method:
    ```
    export TRACELOOP_BASE_URL="<YOUR_SOURCE_URL>"

    export OTEL_SERVICE_NAME="<YOUR_SERVICE_NAME>"
    export OTEL_RESOURCE_ATTRIBUTES="deployment.environment=<YOUR_ENVIRONMENT>"
    export OTEL_METRICS_EXPORTER=none  # Sumo Logic drops OTLP histogram metrics, so send traces only
    ```

    `OTEL_SERVICE_NAME` becomes the service filter in the dashboards and `deployment.environment` becomes the environment filter.

2. Install the SDK:
  
    ```
    pip install "traceloop-sdk>=0.62.0"
    ```

3. Initialize the SDK by adding the following code at the start of your application, before you import any LLM or framework library:

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

4. Flush spans before the process exits. OpenLLMetry has no public `flush()`, but it registers the global provider:

    ```
    from opentelemetry import trace

    trace.get_tracer_provider().shutdown()
    ```
    
    In a long-running service, skip the shutdown call. Spans are sent in batches.

### Step 2. Instrument your application

You can use Python or Node.js to instrument your LLM application directly with OpenLLMetry. 

<Tabs
  values={[
    {label: 'Python', value: 'Python'},
    {label: 'Node.js', value: 'Node.js'},
  ]}>

  <TabItem value="Python">

  <details>
    <summary>Google Gemini</summary>

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

    **Additional reources**:
    - [OpenLLMetry Google Generative AI](https://github.com/traceloop/openllmetry/tree/main/packages/opentelemetry-instrumentation-google-generativeai)
    - [OpenLLMetry Python](https://www.traceloop.com/docs/openllmetry/getting-started-python)

  </details>

  <details>
    <summary>Groq</summary>

    Traces chat completions sent to [Groq](https://console.groq.com/docs/overview).

    **Install**:

    `pip install "traceloop-sdk>=0.62.0" groq`

    **Run the following code after the [OpenLLMetry setup](#openllmetry-setup)**:

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

    **Additional reources**:
    - [OpenLLMetry Groq](https://github.com/traceloop/openllmetry/tree/main/packages/opentelemetry-instrumentation-groq)
    - [OpenLLMetry Python](https://www.traceloop.com/docs/openllmetry/getting-started-python)

  </details>

  <details>
    <summary>LangChain and LangGraph</summary>

    Traces agents, chains, chat models, and tool calls. One package covers both LangChain and LangGraph. The example is a tool-calling agent: each run appears as an `invoke_agent` span with the LLM and tool calls as child spans.

    **Install**:

    `pip install "traceloop-sdk>=0.62.0" "langchain<2" langchain-openai`

    **Run the following code after the [OpenLLMetry setup](#openllmetry-setup)**:

    ```
    import os
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
    OpenLLMetry also emits an `execute_task` span for each LangGraph node.
    
    To set the conversation ID, call `set_conversation_id()`. For more information, see [Track conversations](#track-conversations).
    
    **Additional reources**:
    - [OpenLLMetry LangChain](https://github.com/traceloop/openllmetry/tree/main/packages/opentelemetry-instrumentation-langchain)
    - [OpenLLMetry Python](https://www.traceloop.com/docs/openllmetry/getting-started-python)

  </details>

  <details>
    <summary>LlamaIndex</summary>

    Traces retrieval, query engines, agents, and the LLM and embedding calls they make with [LlamaIndex](https://docs.llamaindex.ai/).

    **Install**:

    `pip install "traceloop-sdk>=0.62.0" llama-index-core llama-index-llms-openai llama-index-embeddings-openai`

    **Run the following code after the [OpenLLMetry setup](#openllmetry-setup)**:

    ```
    import os
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

    **Additional reources**:
    - [OpenLLMetry LlamaIndex](https://github.com/traceloop/openllmetry/tree/main/packages/opentelemetry-instrumentation-llamaindex)
    - [OpenLLMetry Python](https://www.traceloop.com/docs/openllmetry/getting-started-python)    

  </details>

  <details>
    <summary>Haystack</summary>

    Traces [Haystack](https://docs.haystack.deepset.ai/) pipelines and the LLM calls their components make.

    **Install**:

    `pip install "traceloop-sdk>=0.62.0" haystack-ai`

    **Run the following code after the [OpenLLMetry setup](#openllmetry-setup)**:

    ```
    import os
    from haystack import Pipeline
    from haystack.components.builders import ChatPromptBuilder
    from haystack.components.generators.chat import OpenAIChatGenerator
    from haystack.dataclasses import ChatMessage

    pipeline = Pipeline()
    pipeline.add_component("prompt_builder", ChatPromptBuilder())
    pipeline.add_component("llm", OpenAIChatGenerator(model="gpt-4o-mini"))  # reads OPENAI_API_KEY
    pipeline.connect("prompt_builder.prompt", "llm.messages")

    result = pipeline.run({"prompt_builder": {
        "template": [ChatMessage.from_user("What is {{ a }} multiplied by {{ b }}?")],
        "template_variables": {"a": 15, "b": 7},
    }})
    print(result["llm"]["replies"][0].text)
    ```

    **Additional reources**:
    - [OpenLLMetry Haystack](https://github.com/traceloop/openllmetry/tree/main/packages/opentelemetry-instrumentation-haystack)
    - [OpenLLMetry Python](https://www.traceloop.com/docs/openllmetry/getting-started-python)

  </details>

  <details>
    <summary>OpenAI and AI gateways</summary>

    Traces calls made with the [OpenAI Python SDK](https://github.com/openai/openai-python), directly or through an OpenAI-compatible gateway. To use a gateway, set `base_url` to it.

    The provider is reported as `openai`. Use the **Gateway/API Base Distribution** panel, which reads `server.address`, to split traffic by gateway.

    **Related sources**:
    - [Helicone](https://docs.helicone.ai/)
    - [OpenRouter](https://openrouter.ai/docs/quickstart)
    - [Braintrust](https://www.braintrust.dev/docs/guides/proxy)

    **Install**:

    `pip install "traceloop-sdk>=0.62.0" openai`

    **Run the following code after the [OpenLLMetry setup](#openllmetry-setup)**:

    ```
    import os
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

    **Additional reources**:
    - [OpenLLMetry Python](https://www.traceloop.com/docs/openllmetry/getting-started-python)

  </details>

  </TabItem>

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
</Tabs>


## Optional settings

### Track conversations

The Conversation Analytics dashboard and the `conversation_id` filter require `gen_ai.conversation.id` on each LLM span. Use one ID for every call in the same chat or session. Don't include personal data.


| Method | How to set the conversation ID |
|:--|:--|
| OpenLLMetry | Import `set_conversation_id` from `traceloop.sdk.tracing`, then call `set_conversation_id("<ID>")` before your LLM calls. |

### Name workflows

With OpenLLMetry, decorate a workflow's entry point with [@workflow](https://www.traceloop.com/docs/openllmetry/tracing/annotations) so it appears by name in the **Agent and Workflow Intelligence** dashboard:

```
from traceloop.sdk.decorators import workflow

@workflow(name="answer_question")
def answer_question(question: str): ...
```

### Capture prompts and responses

:::info
Prompts and responses can contain personal data, credentials, or regulated data. Review your data-handling policies before you capture them in production.
:::

Content is needed only for the **Prompt and Response Analytics** dashboard and the tool input and output panels. All other panels work without it.

| Method | Default | Setting |
|:--|:--|:--|
| OpenTelemetry | On | Set `TRACELOOP_TRACE_CONTENT=false` to turn it off. See [OpenLLMetry privacy](https://www.traceloop.com/docs/openllmetry/privacy/traces).|

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

For every attribute, see [GenAI client spans](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/) and [GenAI agent spans](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-agent-spans/).

## Verify data collection

Run your application, send a few requests, and then run this search in Sumo Logic:

`_index=_trace_spans service="<YOUR_SERVICE_NAME>"`

Within a few minutes, you should see one row per provider, model, and operation. Then open the **AI Observability - Overview** dashboard and select your service.

## Additional resources

- [OpenLLMetry documentation](https://www.traceloop.com/docs/openllmetry/introduction)
