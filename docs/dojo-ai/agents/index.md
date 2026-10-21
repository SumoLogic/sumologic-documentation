---
id: agents
title: Agents
sidebar_label: Agents ✨
description: DojoAI agents investigate security incidents and observability alerts, returning evidence-backed findings so your team can focus on real threats.
slug: /dojo-ai/agents
keywords:
  - dojoai
  - agents
  - soc analyst agent
  - root cause agent
  - agentic ai
---

import useBaseUrl from '@docusaurus/useBaseUrl';

DojoAI agents investigate alerts on your behalf and return evidence-backed findings, with a human in the loop at every step. Each agent is purpose-built for its domain — security or observability — and works in the product area it serves. Any investigation can continue conversationally in [Mobot](/docs/dojo-ai/mobot), DojoAI's chat interface.

<div className="box-wrapper">
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/dojo-ai/agents/soc-analyst-agent')}><img src={useBaseUrl('img/icons/operations/soc-analyst-agent.png')} alt="SOC Analyst Agent icon" width="50"/><h4>SOC Analyst Agent</h4></a>
  <p>Automatically investigate Cloud SIEM insights and get an AI verdict — malicious, suspicious, or benign — with supporting evidence.</p>
  </div>
</div>
</div>

<!-- Publish this when RCA goes GA
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/dojo-ai/agents/root-cause-agent-preview')}><img src={useBaseUrl('img/icons/operations/generic-agent.png')} alt="Root Cause Agent icon" width="50"/><h4>Root Cause Agent</h4></a>
  <p>Investigate monitor alerts and identify the most likely root cause based on your logs and metrics.</p>
  </div>
</div>
</div>
-->
