---
id: ai-observability
title: AI Observability
sidebar_label: AI Observability
description: The Sumo Logic app for AI Observability provides visibility into LLM request volume, cost, token usage, latency, errors, and agent workflows across providers such as OpenAI, Anthropic, Gemini, Groq, and AWS Bedrock.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/ai-observability-icon.png')} alt="AI Observability icon" width="45"/>

The Sumo Logic app for AI Observability provides preconfigured dashboards and monitors to track the health, performance, cost, and behavior of your AI and LLM applications. Use the app to monitor request volume, error rate, latency, and token consumption; estimate LLM spend; troubleshoot authentication errors, rate limits, and truncated responses; understand agent workflows and tool usage; and review prompts and responses.

The app analyzes OpenTelemetry trace spans that carry [GenAI Semantic Convention](https://opentelemetry.io/docs/specs/semconv/gen-ai/) (`gen_ai.*`) attributes. It works across LLM providers such as OpenAI, Anthropic, Google Gemini, Groq, and AWS Bedrock, and across frameworks such as LangChain, LangGraph, and LlamaIndex.

Use this app to:

* Track request volume, error rate, latency, and token consumption across models and providers.
* Estimate LLM spend and identify the top cost consumers.
* Troubleshoot authentication errors, rate limits, truncated responses, and slow requests.
* Understand agent workflows, tool usage, and tool failures.
* Review prompts and responses for debugging and auditing.
* Check instrumentation health by SDK, language, and semantic convention version.

## Sample logs

The AI Observability app uses OpenTelemetry **trace spans** exported to Sumo Logic over OTLP/HTTP. The dashboards and monitors query these spans from the `_index=_trace_spans` index.

The following is a sample LangGraph agent task span, as stored in Sumo Logic when exported with OpenLLMetry.

<details>
<summary>Agent task span (<code>branch:to:agent</code>)</summary>

```json
{
  "traceloop.association.properties.langgraph_triggers": "[branch:to:agent]",
  "application": "default",
  "_sourcecategory": "Http Input",
  "traceloop.association.properties.langgraph_step": "3",
  "_source": "AI-LLM-Testing",
  "traceloop.span.kind": "task",
  "gen_ai.task.id": "01a0d821-5b67-76b2-81f4-9b21d3ce34e5",
  "traceloop.entity.path": "agent",
  "gen_ai.task.output": "{\"outputs\": \"end\", \"kwargs\": {\"tags\": [\"seq:step:3\"]}}",
  "gen_ai.task.parent.id": "01a0d821-584c-7391-8dea-0a14a84de51e",
  "traceloop.entity.output": "{\"outputs\": \"end\", \"kwargs\": {\"tags\": [\"seq:step:3\"]}}",
  "_sourcehost": "<source-host-ip>",
  "traceloop.association.properties.langgraph_path": "[__pregel_pull,agent]",
  "gen_ai.task.input": "{\"inputs\": {\"messages\": [{\"lc\": 1, \"type\": \"constructor\", \"id\": [\"langchain\", \"schema\", \"messages\", \"HumanMessage\"], \"kwargs\": {\"content\": \"What is today's date, and what is 47 * 89?\", \"type\": \"human\", \"id\": \"ba58f76a-c837-47a8-86c1-b259fc9c8198\"}}, {\"lc\": 1, \"type\": \"constructor\", \"id\": [\"langchain\", \"schema\", \"messages\", \"AIMessage\"], \"kwargs\": {\"content\": \"\", \"additional_kwargs\": {\"refusal\": null}, \"response_metadata\": {\"token_usage\": {\"completion_tokens\": 31, \"prompt_tokens\": 203, \"total_tokens\": 234, \"completion_tokens_details\": {\"accepted_prediction_tokens\": null, \"audio_tokens\": null, \"reasoning_tokens\": 11, \"rejected_prediction_tokens\": null}, \"prompt_tokens_details\": null, \"queue_time\": 0.345919444, \"prompt_time\": 0.009992713, \"completion_time\": 0.034119296, \"total_time\": 0.044112009}, \"model_provider\": \"openai\", \"model_name\": \"openai/gpt-oss-20b\", \"system_fingerprint\": \"fp_3023a70d60\", \"id\": \"chatcmpl-41437840-17a8-4209-b5a1-5e5e0a504bd4\", \"service_tier\": \"on_demand\", \"finish_reason\": \"tool_calls\", \"logprobs\": null}, \"type\": \"ai\", \"id\": \"lc_run--01a0d821-4b88-7512-9b82-95dc03066141-0\", \"tool_calls\": [{\"name\": \"get_current_date\", \"args\": {}, \"id\": \"fc_790af7ac-66c4-4d1b-bd26-c83d39a75247\", \"type\": \"tool_call\"}], \"usage_metadata\": {\"input_tokens\": 203, \"output_tokens\": 31, \"total_tokens\": 234, \"input_token_details\": {}, \"output_token_details\": {\"reasoning\": 11}}, \"invalid_tool_calls\": []}}, {\"lc\": 1, \"type\": \"constructor\", \"id\": [\"langchain\", \"schema\", \"messages\", \"ToolMessage\"], \"kwargs\": {\"content\": \"2026-09-25\", \"type\": \"tool\", \"id\": \"c37c0562-6387-4238-a495-f4b72dbb7300\", \"tool_call_id\": \"fc_790af7ac-66c4-4d1b-bd26-c83d39a75247\", \"status\": \"success\"}}, {\"lc\": 1, \"type\": \"constructor\", \"id\": [\"langchain\", \"schema\", \"messages\", \"AIMessage\"], \"kwargs\": {\"content\": \"- **Today's date:** 2026‑09‑25  \\n- **47 × 89:** 4,183\", \"additional_kwargs\": {\"refusal\": null}, \"response_metadata\": {\"token_usage\": {\"completion_tokens\": 82, \"prompt_tokens\": 231, \"total_tokens\": 313, \"completion_tokens_details\": {\"accepted_prediction_tokens\": null, \"audio_tokens\": null, \"reasoning_tokens\": 48, \"rejected_prediction_tokens\": null}, \"prompt_tokens_details\": null, \"queue_time\": 0.333773111, \"prompt_time\": 0.011137784, \"completion_time\": 0.083844025, \"total_time\": 0.094981809}, \"model_provider\": \"openai\", \"model_name\": \"openai/gpt-oss-20b\", \"system_fingerprint\": \"fp_1074f9ce08\", \"id\": \"chatcmpl-0d0e77ff-2b67-4b34-bd5b-4e5189b04615\", \"service_tier\": \"on_demand\", \"finish_reason\": \"stop\", \"logprobs\": null}, \"type\": \"ai\", \"id\": \"lc_run--01a0d821-584e-7541-ab6a-81dba289efdf-0\", \"usage_metadata\": {\"input_tokens\": 231, \"output_tokens\": 82, \"total_tokens\": 313, \"input_token_details\": {}, \"output_token_details\": {\"reasoning\": 48}}, \"tool_calls\": [], \"invalid_tool_calls\": []}}]}, \"tags\": [\"seq:step:3\"], \"metadata\": {\"ls_integration\": \"langgraph\", \"langgraph_step\": 3, \"langgraph_node\": \"agent\", \"langgraph_triggers\": [\"branch:to:agent\"], \"langgraph_path\": [\"__pregel_pull\", \"agent\"], \"langgraph_checkpoint_ns\": \"agent:2ea97ae2-01cb-052e-b1b1-e6b4f0d46eee\"}, \"kwargs\": {\"name\": \"should_continue\"}}",
  "telemetry.sdk.version": "1.44.0",
  "_sourcename": "Http Input",
  "_sourceid": "<source-id>",
  "gen_ai.task.name": "should_continue",
  "traceloop.association.properties.ls_integration": "langgraph",
  "gen_ai.operation.name": "execute_task",
  "traceloop.entity.input": "{\"inputs\": {\"messages\": [{\"lc\": 1, \"type\": \"constructor\", \"id\": [\"langchain\", \"schema\", \"messages\", \"HumanMessage\"], \"kwargs\": {\"content\": \"What is today's date, and what is 47 * 89?\", \"type\": \"human\", \"id\": \"ba58f76a-c837-47a8-86c1-b259fc9c8198\"}}, {\"lc\": 1, \"type\": \"constructor\", \"id\": [\"langchain\", \"schema\", \"messages\", \"AIMessage\"], \"kwargs\": {\"content\": \"\", \"additional_kwargs\": {\"refusal\": null}, \"response_metadata\": {\"token_usage\": {\"completion_tokens\": 31, \"prompt_tokens\": 203, \"total_tokens\": 234, \"completion_tokens_details\": {\"accepted_prediction_tokens\": null, \"audio_tokens\": null, \"reasoning_tokens\": 11, \"rejected_prediction_tokens\": null}, \"prompt_tokens_details\": null, \"queue_time\": 0.345919444, \"prompt_time\": 0.009992713, \"completion_time\": 0.034119296, \"total_time\": 0.044112009}, \"model_provider\": \"openai\", \"model_name\": \"openai/gpt-oss-20b\", \"system_fingerprint\": \"fp_3023a70d60\", \"id\": \"chatcmpl-41437840-17a8-4209-b5a1-5e5e0a504bd4\", \"service_tier\": \"on_demand\", \"finish_reason\": \"tool_calls\", \"logprobs\": null}, \"type\": \"ai\", \"id\": \"lc_run--01a0d821-4b88-7512-9b82-95dc03066141-0\", \"tool_calls\": [{\"name\": \"get_current_date\", \"args\": {}, \"id\": \"fc_790af7ac-66c4-4d1b-bd26-c83d39a75247\", \"type\": \"tool_call\"}], \"usage_metadata\": {\"input_tokens\": 203, \"output_tokens\": 31, \"total_tokens\": 234, \"input_token_details\": {}, \"output_token_details\": {\"reasoning\": 11}}, \"invalid_tool_calls\": []}}, {\"lc\": 1, \"type\": \"constructor\", \"id\": [\"langchain\", \"schema\", \"messages\", \"ToolMessage\"], \"kwargs\": {\"content\": \"2026-09-25\", \"type\": \"tool\", \"id\": \"c37c0562-6387-4238-a495-f4b72dbb7300\", \"tool_call_id\": \"fc_790af7ac-66c4-4d1b-bd26-c83d39a75247\", \"status\": \"success\"}}, {\"lc\": 1, \"type\": \"constructor\", \"id\": [\"langchain\", \"schema\", \"messages\", \"AIMessage\"], \"kwargs\": {\"content\": \"- **Today's date:** 2026‑09‑25  \\n- **47 × 89:** 4,183\", \"additional_kwargs\": {\"refusal\": null}, \"response_metadata\": {\"token_usage\": {\"completion_tokens\": 82, \"prompt_tokens\": 231, \"total_tokens\": 313, \"completion_tokens_details\": {\"accepted_prediction_tokens\": null, \"audio_tokens\": null, \"reasoning_tokens\": 48, \"rejected_prediction_tokens\": null}, \"prompt_tokens_details\": null, \"queue_time\": 0.333773111, \"prompt_time\": 0.011137784, \"completion_time\": 0.083844025, \"total_time\": 0.094981809}, \"model_provider\": \"openai\", \"model_name\": \"openai/gpt-oss-20b\", \"system_fingerprint\": \"fp_1074f9ce08\", \"id\": \"chatcmpl-0d0e77ff-2b67-4b34-bd5b-4e5189b04615\", \"service_tier\": \"on_demand\", \"finish_reason\": \"stop\", \"logprobs\": null}, \"type\": \"ai\", \"id\": \"lc_run--01a0d821-584e-7541-ab6a-81dba289efdf-0\", \"usage_metadata\": {\"input_tokens\": 231, \"output_tokens\": 82, \"total_tokens\": 313, \"input_token_details\": {}, \"output_token_details\": {\"reasoning\": 48}}, \"tool_calls\": [], \"invalid_tool_calls\": []}}]}, \"tags\": [\"seq:step:3\"], \"metadata\": {\"ls_integration\": \"langgraph\", \"langgraph_step\": 3, \"langgraph_node\": \"agent\", \"langgraph_triggers\": [\"branch:to:agent\"], \"langgraph_path\": [\"__pregel_pull\", \"agent\"], \"langgraph_checkpoint_ns\": \"agent:2ea97ae2-01cb-052e-b1b1-e6b4f0d46eee\"}, \"kwargs\": {\"name\": \"should_continue\"}}",
  "deployment.environment": "default",
  "service.instance.id": "155062c0-3f15-4951-ba44-e924bf5a704a",
  "traceloop.association.properties.langgraph_node": "agent",
  "traceloop.association.properties.langgraph_checkpoint_ns": "agent:2ea97ae2-01cb-052e-b1b1-e6b4f0d46eee",
  "telemetry.sdk.language": "python",
  "traceloop.workflow.name": "LangGraph",
  "telemetry.sdk.name": "opentelemetry",
  "traceloop.entity.name": "should_continue",
  "service.name": "langgraph-openllmetry",
  "_collector": "<collector-name>",
  "gen_ai.provider.name": "langgraph",
  "gen_ai.task.status": "success"
}
```
</details>

### How it works

Your application emits OTel trace spans with `gen_ai.*` attributes, the spans are exported via OTLP/HTTP to Sumo Logic, and the app dashboards and monitors query those spans from `_index=_trace_spans`.

### Key terms

| Term | Description |
|:--|:--|
| Span | A single unit of work in your LLM application, such as one chat completion call, one tool execution, or one agent workflow. Each span carries `gen_ai.*` attributes describing the request, response, model, tokens, and latency. |
| Trace | A collection of related spans that form a complete request. For a simple LLM call this is one span. For an agent workflow it can include workflow, LLM, and tool spans in a parent-child tree. |
| LLM span | A span representing a direct call to a language model. Key attributes: `gen_ai.request.model`, `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`, `gen_ai.response.finish_reasons`. |
| Tool span | A span representing a tool or function execution triggered by the LLM. Key attributes: `gen_ai.tool.name`, `gen_ai.tool.call.arguments`, `gen_ai.tool.call.result`, `gen_ai.task.status`. |
| Workflow span | A span representing an agent or chain orchestration that groups multiple LLM and tool spans. |
| Provider | The LLM backend serving the request, such as OpenAI, Anthropic, Gemini, or Groq. Captured in `gen_ai.provider.name`. |
| Model | The specific model used, such as `gpt-4o`, `claude-sonnet-4`, or `gemini-3.6-flash`. Captured in `gen_ai.request.model`. |
| Finish reason | Why the LLM stopped generating: `stop` (natural end), `length` (hit max tokens), or `tool_call` (wants to call a tool). Captured in `gen_ai.response.finish_reasons`. |

### Core attributes

| Attribute | Description |
|:--|:--|
| `gen_ai.request.model` | Model requested. |
| `gen_ai.response.model` | Model actually used in the response. |
| `gen_ai.provider.name` | LLM provider (for example, `openai`, `gemini`, `groq`). |
| `gen_ai.usage.input_tokens` | Input (prompt) token count. |
| `gen_ai.usage.output_tokens` | Output (completion) token count. |
| `gen_ai.usage.reasoning_tokens` | Reasoning token count. |
| `gen_ai.usage.cache_read.input_tokens` | Cached input token count. |
| `gen_ai.request.max_tokens` | Maximum tokens requested. |
| `gen_ai.request.temperature` | Temperature setting. |
| `gen_ai.response.finish_reasons` | Why generation stopped (for example, `stop`, `length`, `tool_call`). |
| `gen_ai.response.id` | Response identifier. |
| `gen_ai.is_streaming` | Whether the request was streaming. |
| `gen_ai.operation.name` | Operation type (for example, `chat`, `generate_content`, `execute_tool`). |
| `gen_ai.input.messages` | Prompt content (captured by OpenLLMetry). |
| `gen_ai.output.messages` | Response content (captured by OpenLLMetry). |
| `gen_ai.system_instructions` | System prompt text. |
| `gen_ai.tool.name` | Tool or function name. |
| `gen_ai.tool.definitions` | Tool schema definitions. |
| `gen_ai.tool.call.arguments` | Arguments passed to the tool. |
| `gen_ai.tool.call.result` | Tool execution result. |
| `gen_ai.task.status` | Task execution status. |
| `server.address` | API endpoint hostname. |
| `deployment.environment` | Deployment environment (for example, `production`, `staging`). |

## Prerequisites

Before setting up the AI Observability app, ensure you have an application instrumented with OpenTelemetry that can export traces over OTLP/HTTP. See [Instrumentation methods](#instrumentation-methods).

## Collection setup

### Step 1: Create an OTLP/HTTP Source

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**.
1. Select an existing Hosted Collector, or click **Add Collector** and then **Hosted Collector** to create one.
1. Click **Add Source** next to the Hosted Collector.
1. Select **OTLP/HTTP**.
1. Enter a **Name** for the Source. **Description** is optional.
1. Click **Save**.
1. Copy the generated **Source URL**.

For more information, see [OTLP/HTTP Source](/docs/send-data/hosted-collectors/http-source/otlp/).

### Step 2: Set the endpoint in your application

Set the endpoint in your application's environment:

```bash
export SUMO_OTLP_ENDPOINT="<your source URL>"
```

### Step 3: Instrument your application

Instrument your application using either plain OpenTelemetry or OpenLLMetry. Both produce the same `gen_ai.*` attributes.

#### Instrumentation methods

| Method | How | Best for |
|:--|:--|:--|
| **OpenTelemetry (plain OTel)** | Install a per-provider instrumentor and configure the TracerProvider and OTLP exporter. | Minimal dependencies and a pure-spec setup. |
| **OpenLLMetry (Traceloop SDK)** | Run `pip install traceloop-sdk` and call `Traceloop.init()`. | Broad provider and framework coverage. Captures prompts and responses by default. |

#### Supported providers and frameworks

| Provider / framework | Plain OTel | OpenLLMetry |
|:--|:--|:--|
| OpenAI | Yes | Yes |
| Google Gemini | Yes | Yes |
| Groq | Yes (via OpenAI SDK) | Yes (native SDK) |
| Anthropic | No | Yes |
| AWS Bedrock | No | Yes |
| LangChain | Yes | Yes |
| LangGraph | Yes | Yes |
| LlamaIndex | No | Yes |

### Step 4: Verify data collection

Run your application, and then run the following search to verify that spans are arriving:

```sql
_index=_trace_spans service=<your-service-name>
```

## Installing the AI Observability app

import AppInstall from '../../reuse/apps/app-install-v2.md';

<AppInstall/>

## Viewing the AI Observability dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **AI Observability - Overview** dashboard provides a single-pane view of AI workload health across all LLM providers. Use this dashboard to monitor total requests, errors, success rate, average latency, and total tokens. Identify top models and providers, operation breakdown, and finish reasons to understand usage patterns. Analyze request volume over time, streaming versus non-streaming split, request outliers, and recent LLM requests for troubleshooting.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AiObservability/AI-Observability-Overview.png')} alt="AI Observability - Overview dashboard" style={{border: '1px solid gray'}} width="800" />

### Agent and Workflow Intelligence

The **AI Observability - Agent and Workflow Intelligence** dashboard provides visibility into tool and function calling, agent workflows, and system prompt configurations. Use this dashboard to monitor tool call rate, tool success rate, and unique tools used to understand agent behavior. Identify tool latency and failure rate by tool name to troubleshoot unreliable tool integrations. Analyze tool definitions, system instructions inventory, and recent tool executions for workflow auditing and optimization.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AiObservability/AI-Observability-Agent-and-Workflow-Intelligence.png')} alt="AI Observability - Agent and Workflow Intelligence dashboard" style={{border: '1px solid gray'}} width="800" />

### Cost Analytics

The **AI Observability - Cost Analytics** dashboard provides estimated LLM spend by model, provider, and time using a per-model list-price mapping. Use this dashboard to monitor total estimated cost, average cost per request, and daily and monthly cost projections. Identify top cost consumers and compare input and output cost split across models and providers. Analyze estimated cache savings and reasoning cost for budgeting and cost optimization.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AiObservability/AI-Observability-Cost-Analytics.png')} alt="AI Observability - Cost Analytics dashboard" style={{border: '1px solid gray'}} width="800" />

### Developer and Service Observability

The **AI Observability - Developer and Service Observability** dashboard provides visibility into instrumentation health and service topology across LLM applications. Use this dashboard to monitor SDK language and version distribution and active services and environments to ensure consistent instrumentation. Identify services using mixed semantic conventions and track framework activity by service. Analyze requests and error rate by environment for coverage validation and telemetry quality assessment.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AiObservability/AI-Observability-Developer-and-Service-Observability.png')} alt="AI Observability - Developer and Service Observability dashboard" style={{border: '1px solid gray'}} width="800" />

### Errors and Reliability

The **AI Observability - Errors and Reliability** dashboard provides visibility into LLM error patterns and reliability across models and providers. Use this dashboard to monitor total errors, error rate, and successful requests. Identify authentication (401) and rate-limit or quota (429) errors, and analyze errors by model, provider, type, and endpoint to troubleshoot failures. Track error outliers, top error messages, and recent error details for incident response.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AiObservability/AI-Observability-Errors-and-Reliability.png')} alt="AI Observability - Errors and Reliability dashboard" style={{border: '1px solid gray'}} width="800" />

### Model and Provider Intelligence

The **AI Observability - Model and Provider Intelligence** dashboard provides a governance view of model adoption and provider distribution across LLM workloads. Use this dashboard to monitor model adoption trends and provider distribution. Compare latency and token efficiency, and streaming versus non-streaming latency across models. Analyze temperature distribution, max tokens utilization, gateway and API base distribution, and error rate by environment for governance and optimization.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AiObservability/AI-Observability-Model-and-Provider-Intelligence.png')} alt="AI Observability - Model and Provider Intelligence dashboard" style={{border: '1px solid gray'}} width="800" />

### Performance and Latency

The **AI Observability - Performance and Latency** dashboard provides response time analysis for LLM inference across models and providers. Use this dashboard to monitor average, P50, P95, and P99 latency and latency percentiles over time. Identify latency outliers and slow requests exceeding 5 seconds to troubleshoot bottlenecks. Analyze latency by model and provider, model swap detections, and system fingerprints for performance tuning and change tracking.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AiObservability/AI-Observability-Performance-and-Latency.png')} alt="AI Observability - Performance and Latency dashboard" style={{border: '1px solid gray'}} width="800" />

### Prompt and Response Analytics

The **AI Observability - Prompt and Response Analytics** dashboard provides visibility into prompt and response content for debugging, auditing, and quality review. Use this dashboard to monitor requests with prompts captured and average input and output message lengths over time. Browse prompts and responses and review the system prompt catalog to understand application behavior. Identify duplicate response IDs to detect retries.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AiObservability/AI-Observability-Prompt-and-Response-Analytics.png')} alt="AI Observability - Prompt and Response Analytics dashboard" style={{border: '1px solid gray'}} width="800" />

### Token Usage

The **AI Observability - Token Usage** dashboard provides deep token consumption analysis by model, provider, and time. Use this dashboard to monitor total input, output, and combined tokens and average tokens per request. Identify top consumers and analyze token usage by model and provider for capacity planning. Track truncated responses, cache hit rate, and reasoning token usage for cost and efficiency optimization.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AiObservability/AI-Observability-Token-Usage.png')} alt="AI Observability - Token Usage dashboard" style={{border: '1px solid gray'}} width="800" />

## Create monitors for AI Observability app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### AI Observability alerts

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `AI Observability - Auth Errors (401) Spike` | This alert is triggered when LLM provider authentication errors (HTTP 401) exceed 5 within a 15-minute window. Spikes typically indicate expired or rotated API keys. | Count > 5 | Count < = 5 |
| `AI Observability - High Latency Detected` | This alert is triggered when more than 5 LLM requests exceed 10 seconds end to end within a 15-minute window. Sustained high latency can indicate overloaded providers or inefficient prompt patterns. | Count > 5 | Count < = 5 |
| `AI Observability - LLM Error Rate Spike` | This alert is triggered when the LLM API error count exceeds 10 within a 15-minute window. A sudden spike can indicate provider outages, invalid credentials, or malformed requests. | Count > 10 | Count < = 10 |
| `AI Observability - Runaway Agent Detected` | This alert is triggered when any single trace accumulates more than 50 agent spans, indicating a runaway agentic loop that can exhaust token budgets. | Count > 50 | Count < = 50 |
| `AI Observability - Token Limit Breached` | This alert is triggered when more than 5 LLM responses are truncated because of token limits (finish reason `max_tokens` or `length`) within a 15-minute window. | Count > 5 | Count < = 5 |

## Upgrading the AI Observability app

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the AI Observability app

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
