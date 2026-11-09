---
id: troubleshoot-ai-observability
title: Troubleshoot AI Observability 
sidebar_label: Troubleshoot
keywords:
  - apps
  - ai-observability
  - llm
  - genai
  - opentelemetry
  - openllmetry
  - instrumentation
description: Troubleshoot common AI Observability problems, such as missing spans, empty dashboards, and data that does not reach Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### No spans arrive

#### OpenTelemetry

Check that `OTEL_EXPORTER_OTLP_ENDPOINT` is set to your source URL. Short-lived scripts must call `provider.shutdown()` before they exit.

#### OpenLLMetry

Check that `TRACELOOP_BASE_URL` is set to your source URL. Call `Traceloop.init()` before importing any LLM library.

### LangChain or LangGraph sends no spans

Install the `langchain` package as well as `langchain-core`.

### Provider panels are empty

The spans carry `gen_ai.system` instead of `gen_ai.provider.name`. Use `opentelemetry-instrumentation-genai-openai` instead of `-openai-v2`, or set `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental`. With OpenLLMetry, upgrade to `traceloop-sdk>=0.62.0`.

### Provider shows openai for Groq or a gateway

Expected when you use the OpenAI SDK. For Groq, use OpenLLMetry with the native Groq SDK to report `groq`.

### The same provider appears under two names

OpenTelemetry and OpenLLMetry can name a provider differently, for example `gemini` and `gcp.gen_ai`. Use one method across your services.

### Conversation Analytics is empty

`gen_ai.conversation.id` isn't set. See Track conversations for [OpenLLMetry](/docs/observability/ai-observability/instrument-your-llm-application-with-openllmetry/#track-conversations) and [OpenTelemetry](/docs/observability/ai-observability/instrument-your-llm-application-with-opentelemetry/#track-conversations).

### Prompts and responses are blank

Content capture is off. See Capture prompts and responses for [OpenLLMetry](/docs/observability/ai-observability/instrument-your-llm-application-with-openllmetry/#capture-prompts-and-responses) and [OpenTelemetry](/docs/observability/ai-observability/instrument-your-llm-application-with-opentelemetry/#capture-prompts-and-responses).

### Long prompts are cut off

Raise `OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT` in your application.

### Spans are duplicated

Both OpenTelemetry and OpenLLMetry are enabled. Remove one.
