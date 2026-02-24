---
id: litellm
title: LiteLLM
sidebar_label: LiteLLM
description: The Sumo Logic app for LiteLLM provides visibility into LLM proxy usage, cost, latency, deployment health, and performance across OpenAI, Bedrock, Groq, and other providers.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

[LiteLLM](https://docs.litellm.ai/) is an open-source proxy that provides a unified interface to call 100+ LLM APIs (OpenAI, Anthropic, AWS Bedrock, Groq, and more). It routes requests, manages fallbacks, tracks budgets, and exposes Prometheus metrics for observability.

The Sumo Logic app for LiteLLM provides preconfigured dashboards to monitor request volume, latency, token consumption, spend, budget and rate limits, deployment and fallback health, infrastructure (Redis, Postgres), and user or route visibility. Use the app to track cost by team or API key, identify slow models, detect failures and fallbacks, and ensure your LLM proxy is running smoothly.

:::info
This app includes [built-in monitors](#litellm-monitors). For details on creating custom monitors, refer to [Create monitors for LiteLLM app](#create-monitors-for-litellm-app).
:::

## Metric types

This app collects Prometheus metrics from the LiteLLM proxy. LiteLLM exposes metrics at `/metrics/` when configured with `callbacks: ["prometheus"]` or `prometheus_metrics_config` in `litellm-config.yaml`.

The app uses the following metrics:

* **Request metrics** — `litellm_proxy_total_requests_metric_total`, `litellm_proxy_failed_requests_metric_total`, `litellm_deployment_success_responses_total`, `litellm_deployment_failure_responses_total`
* **Latency metrics** — `litellm_request_total_latency_metric_sum`/`_count`, `litellm_llm_api_latency_metric_sum`/`_count`, `litellm_overhead_latency_metric_sum`/`_count`, `litellm_llm_api_time_to_first_token_metric_sum`/`_count`
* **Token metrics** — `litellm_total_tokens_metric_total`, `litellm_input_tokens_metric_total`, `litellm_output_tokens_metric_total`
* **Cost metrics** — `litellm_spend_metric_total` (by team, API key, alias)
* **Budget metrics** — `litellm_remaining_team_budget_metric`, `litellm_remaining_api_key_budget_metric`, `litellm_team_max_budget_metric`, `litellm_team_budget_remaining_hours_metric`
* **Deployment health** — `litellm_deployment_state`, `litellm_deployment_successful_fallbacks_total`, `litellm_deployment_failed_fallbacks_total`, `litellm_deployment_cooled_down_total`
* **Rate limits** — `litellm_remaining_requests_metric`, `litellm_remaining_tokens_metric` (provider-specific, e.g. Groq)
* **Infrastructure** — `litellm_redis_latency_sum`/`_count`, `litellm_postgres_latency_sum`/`_count`, `litellm_self_latency_sum`/`_count`, `litellm_callback_logging_failures_metric_total`

For a complete list of metrics and dimensions, see the [LiteLLM metrics documentation](https://docs.litellm.ai/docs/proxy/configs#prometheus-metrics-config).

## Fields creation in Sumo Logic for LiteLLM

The following [fields](/docs/manage/fields/) are created as part of the LiteLLM app installation, if not already present:

* **`sumo.datasource`**. Has fixed value of `litellm-metrics`.
* **`_sourceCategory`**. Set by the OpenTelemetry Collector resource processor. Use a value such as `otel/litellm/metrics` for consistent querying.
* **`deployment.environment`**. User configured. Enter a name to identify your deployment environment (e.g. `production`, `staging`, `dev`).

## Prerequisites

### For metrics collection

* LiteLLM proxy with Prometheus metrics enabled (e.g. `callbacks: ["prometheus"]` or `prometheus_metrics_config` in `litellm-config.yaml`).
* LiteLLM metrics endpoint accessible (default: `http://localhost:4000/metrics/`).
* OpenTelemetry Collector (or Sumo Logic Distribution for OpenTelemetry Collector) to scrape Prometheus metrics and send to Sumo Logic.
* HTTP Source in a Sumo Logic Hosted Collector for receiving metrics.

### For team and budget labels

* `team` and `team_alias` dimensions are populated when API keys are created with a `team_id` via `/team/new` and `/key/generate`. Keys without a team show `team=None`, `team_alias=None`. Create teams and associate keys to enable team-level spend and budget dashboards.

### Optional dimensions

* `end_user`, `user`, `user_email`, `route`, `status_code` are populated when the application passes them (e.g. via headers or `prometheus_metrics_config` in `litellm-config.yaml`). Panels using these may return no data if not configured.

## Collection configuration and app installation

import ConfigAppInstall from '../../reuse/apps/opentelemetry/config-app-install.md';

<ConfigAppInstall/>

### Step 1: Set up collector

import SetupColl from '../../reuse/apps/opentelemetry/set-up-collector.md';

<SetupColl/>

### Step 2: Configure integration

Create an HTTP Source in your Hosted Collector for receiving metrics. Note the HTTP Source URL — you will use it as the `SUMOLOGIC_WEBHOOK_URL` environment variable.

Set the following environment variables:

* **`SUMOLOGIC_WEBHOOK_URL`**. Your Sumo Logic HTTP Source URL. The OpenTelemetry Collector will send metrics to this endpoint.
* **`SUMOLOGIC_INSTALLATION_TOKEN`**. Your Sumo Logic installation token (for collector registration if using the Sumo Logic Distribution).

Configure the OpenTelemetry Collector to scrape LiteLLM metrics and send them to Sumo Logic. Use a configuration similar to the following:

```yaml
extensions:
  sumologic:
    installation_token: ${SUMOLOGIC_INSTALLATION_TOKEN}
    collector_name: litellm-otel-collector

receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: 'litellm'
          scrape_interval: 30s
          metrics_path: '/metrics/'
          static_configs:
            - targets: ['localhost:4000']   # Change if LiteLLM runs elsewhere

processors:
  memory_limiter:
    check_interval: 1s
    limit_mib: 512
  batch:
    send_batch_size: 2048
    timeout: 5s
  resourcedetection/system:
    detectors: ["system"]
    system:
      hostname_sources: ["os"]
  resource/common:
    attributes:
      - key: sumo.datasource
        value: litellm-metrics
        action: upsert
      - key: _sourceCategory
        value: otel/litellm/metrics
        action: upsert
      - key: service.name
        value: litellm-proxy
        action: upsert
      - key: deployment.environment
        value: production
        action: upsert

exporters:
  sumologic:
    endpoint: ${SUMOLOGIC_WEBHOOK_URL}
    metric_format: prometheus

service:
  extensions: [sumologic]
  pipelines:
    metrics:
      receivers: [prometheus]
      processors: [memory_limiter, batch, resourcedetection/system, resource/common]
      exporters: [sumologic]
```

:::important
* Update `targets` in the Prometheus scrape config if LiteLLM runs on a different host or port.
* Ensure `_sourceCategory` and `deployment.environment` match the values used in the app dashboards (e.g. template variables `{{source_category}}` and `{{deployment.environment}}`).
:::

### Step 3: Verify LiteLLM configuration

Ensure LiteLLM is configured to expose Prometheus metrics. In `litellm-config.yaml`:

```yaml
litellm_settings:
  callbacks: ["otel", "prometheus", "sumologic"]
  service_callback: ["prometheus_system"]
```

For team and budget tracking, create teams and API keys with `team_id` via the LiteLLM API. See [LiteLLM team management](https://docs.litellm.ai/docs/proxy/team_management) for details.

## Sample metrics

<details>
<summary>Request and latency metrics</summary>

```json
{
  "metric": "litellm_proxy_total_requests_metric_total",
  "sumo.datasource": "litellm-metrics",
  "_sourceCategory": "otel/litellm/metrics",
  "deployment.environment": "production",
  "requested_model": "gpt-4",
  "team_alias": "platform-team",
  "value": 1250,
  "timestamp": "2025-02-21T10:30:00.000Z"
}
```

```json
{
  "metric": "litellm_request_total_latency_metric_sum",
  "sumo.datasource": "litellm-metrics",
  "deployment.environment": "production",
  "requested_model": "gpt-4",
  "value": 45.2,
  "timestamp": "2025-02-21T10:30:00.000Z"
}
```

</details>

## Sample queries

:::note
Pipes in queries are escaped as `\|` for Markdown. When pasting into Sumo Logic, use `|` (single pipe).
:::

```sql title="Total requests over time"
_sourceCategory=otel/litellm/metrics deployment.environment=production metric=litellm_proxy_total_requests_metric_total
| quantize using sum
| sum
```

```sql title="Average latency by requested model"
_sourceCategory=otel/litellm/metrics deployment.environment=production metric=litellm_request_total_latency_metric_sum
| quantize using sum
| sum by requested_model
```

```sql title="Spend by team"
_sourceCategory=otel/litellm/metrics deployment.environment=production metric=litellm_spend_metric_total
| quantize using sum
| sum by team_alias
```

```sql title="Success rate (success / total)"
_sourceCategory=otel/litellm/metrics deployment.environment=production litellm_model_name=* metric=litellm_deployment_success_responses_total
| quantize using sum
| sum
```
Divide by the total requests query result to get percentage.

## Installing the LiteLLM app

import AppInstallIndexV2 from '../../reuse/apps/app-install-index-option.md';

<AppInstallIndexV2/>

As part of the app installation process, the following fields will be created by default:

* **`sumo.datasource`**. Fixed value `litellm-metrics`.
* **`_sourceCategory`**. Source category for LiteLLM metrics (e.g. `otel/litellm/metrics`).
* **`deployment.environment`**. Deployment environment (e.g. `production`, `staging`).

## Viewing the LiteLLM dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

### Overview (Executive)

The **LiteLLM - Overview** dashboard provides high-level health and usage at a glance.

Use this dashboard to:
* Monitor total requests, success rate, and active deployments.
* Track total spend and average latency.
* Compare request volume and spend over time.
* Identify top models by request volume and top teams by spend.

<img src="https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/LiteLLM/LiteLLM-Overview.png" alt="LiteLLM - Overview" style={{border: '1px solid gray'}} width="800" />

### Latency & Performance

The **LiteLLM - Latency & Performance** dashboard provides a deep dive into request latency, time to first token, and overhead.

Use this dashboard to:
* Track end-to-end latency and LLM API latency over time.
* Compare overhead latency by API provider.
* Identify slowest models and latency distribution by model.
* Drill down by requested model and API key alias.

<img src="https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/LiteLLM/LiteLLM-Latency-Performance.png" alt="LiteLLM - Latency & Performance" style={{border: '1px solid gray'}} width="800" />

### Tokens & Cost

The **LiteLLM - Tokens & Cost** dashboard tracks token consumption and spend.

Use this dashboard to:
* Monitor total tokens, input vs output tokens, and token rate.
* Track spend over time and by team.
* Compare token usage by model and spend by API key alias.
* Identify top teams by spend.

:::note
**`litellm_spend_metric_total`** uses `team`, `team_alias`, `hashed_api_key`, `api_key_alias` — not `model`. Use `requested_model` for token metrics.
:::

<img src="https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/LiteLLM/LiteLLM-Tokens-Cost.png" alt="LiteLLM - Tokens & Cost" style={{border: '1px solid gray'}} width="800" />

### Budget & Rate Limits

The **LiteLLM - Budget & Rate Limits** dashboard provides visibility into remaining budgets and provider rate limits.

Use this dashboard to:
* Track team and API key budget remaining.
* Monitor provider rate limit headroom (e.g. Groq remaining requests and tokens).
* View hours until budget reset.
* Compare budget and rate limits by model and API base.

<img src="https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/LiteLLM/LiteLLM-Budget-RateLimits.png" alt="LiteLLM - Budget & Rate Limits" style={{border: '1px solid gray'}} width="800" />

### Deployment & Fallback Health

The **LiteLLM - Deployment & Fallback Health** dashboard monitors LLM deployment health, fallbacks, and failures.

Use this dashboard to:
* Track deployment state (healthy, partial, outage) by model.
* Compare success vs failure trends per deployment.
* Monitor successful and failed fallbacks.
* Identify deployment failures by exception class and status.
* Track cooled-down deployments.

<img src="https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/LiteLLM/LiteLLM-Deployment-Fallback-Health.png" alt="LiteLLM - Deployment & Fallback Health" style={{border: '1px solid gray'}} width="800" />

### Infrastructure & Callbacks

The **LiteLLM - Infrastructure & Callbacks** dashboard provides visibility into Redis, Postgres, self latency, and callback health.

Use this dashboard to:
* Monitor Redis, Postgres, and LiteLLM self latency.
* Track Redis failed requests and callback logging failures.
* View deployment latency per token by model.
* Monitor queue sizes (pod lock manager, spend update queues).
* Map deployment correlation (model ↔ provider ↔ API base).

<img src="https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/LiteLLM/LiteLLM-Infrastructure-Callbacks.png" alt="LiteLLM - Infrastructure & Callbacks" style={{border: '1px solid gray'}} width="800" />

### User & Route Visibility

The **LiteLLM - User & Route Visibility** dashboard provides user/end-user segmentation and route-level metrics.

Use this dashboard to:
* View requests by status code and by route.
* Track requests and spend by end user.
* Identify failed requests by status code.
* Rank top end users by spend.

:::note
Panels use optional dimensions (`end_user`, `route`, `status_code`). Populate these when the application passes them (e.g. via `prometheus_metrics_config` in `litellm-config.yaml`).
:::

<img src="https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/LiteLLM/LiteLLM-User-Route-Visibility.png" alt="LiteLLM - User & Route Visibility" style={{border: '1px solid gray'}} width="800" />

## Create monitors for LiteLLM app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### LiteLLM monitors

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `LiteLLM - High Error Rate` | Critical when proxy failure rate exceeds 10% of total requests. | Count (failure rate) > 10% | Count < 10% |
| `LiteLLM - High Latency` | Warning when average request latency exceeds 30 seconds. | Avg latency > 30s | Avg latency ≤ 30s |
| `LiteLLM - Budget Exceeded` | Critical when team budget remaining is zero or negative. | Remaining budget ≤ 0 | Remaining budget > 0 |
| `LiteLLM - Deployment Unhealthy` | Critical when deployment state indicates outage (state=2). | deployment_state = 2 | deployment_state < 2 |
| `LiteLLM - High Failed Fallbacks` | Warning when failed fallbacks exceed threshold for a requested model. | Failed fallbacks > 5 | Failed fallbacks ≤ 5 |

## Upgrading the LiteLLM app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the LiteLLM app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Troubleshooting

### No data in dashboards

* Verify the OpenTelemetry Collector is running and scraping LiteLLM at the configured target (e.g. `localhost:4000`).
* Ensure `SUMOLOGIC_WEBHOOK_URL` is set correctly and the HTTP Source is receiving data.
* Check that `_sourceCategory` and `deployment.environment` in the collector config match the dashboard template variables.
* Confirm LiteLLM exposes Prometheus metrics at `/metrics/` and that `callbacks` includes `prometheus`.

### `team=None` or `team_alias=None` in metrics

* API keys must be created with `team_id` from the start. Keys created without `team_id` cannot be updated later.
* Create teams via `/team/new` and generate keys via `/key/generate` with `{"team_id": "..."}`. See [LiteLLM team management](https://docs.litellm.ai/docs/proxy/team_management).

### Invalid dimension in panel queries

* Each metric has specific valid dimensions. Using `sum by <dimension>` with an invalid dimension returns no data. Refer to the dashboard label reference for valid dimensions per metric (e.g. `litellm_spend_metric_total` uses `team`, `team_alias`, `hashed_api_key`, `api_key_alias` — not `model`).

### Query pipe syntax

* In Sumo Logic, use `|` (single pipe) for query operators. In this documentation, pipes are escaped as `\|` for Markdown. When copying queries, replace `\|` with `|`.
