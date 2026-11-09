---
slug: /observability/ai-observability
title: AI Observability
description: Monitor the health, performance, cost, and behavior of your AI and LLM applications with the Sumo Logic AI Observability solution.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

In this section, we'll walk you through the Sumo Logic AI Observability solution, from data collection and app installation to monitoring and troubleshooting your AI and LLM applications. The solution analyzes OpenTelemetry trace spans that carry GenAI semantic convention (`gen_ai.*`) attributes, so you can track request volume, latency, errors, token usage, cost, agent workflows, and conversations across LLM providers and frameworks.

<div className="box-wrapper">
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/observability/ai-observability/ai-observability-app')}><img src={useBaseUrl('img/observability/ai-observability/AI-Observability-icon.png')} alt="AI Observability icon" width="40"/><h4>AI Observability App</h4></a>
  <p>Set up collection, install the app, and use prebuilt dashboards and monitors for your AI and LLM applications.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/observability/ai-observability/instrument-your-llm-application')}><img src={useBaseUrl('img/observability/ai-observability/AI-Observability-icon.png')} alt="Instrument your LLM application icon" width="40"/><h4>LLM Application Instrumentation</h4></a>
  <p>Send OpenTelemetry GenAI traces from your LLM application to Sumo Logic using OpenTelemetry or OpenLLMetry.</p>
  </div>
</div>
</div>
