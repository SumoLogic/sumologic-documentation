---
id: github-copilot
title: GitHub Copilot
sidebar_label: GitHub Copilot
description: The Sumo Logic app for GitHub Copilot provides a comprehensive visibility into the developer adoption, engagement, and productivity of Copilot across your organization.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/github_copilot.png')} alt="thumbnail icon" width="50"/>

The Sumo Logic app for GitHub Copilot delivers clear, actionable visibility into Copilot adoption, engagement, and productivity across your organization. It consolidates key metrics, such as active users, suggestion efficiency, language usage, and chat activity, so you can monitor how Copilot is used and measure its impact on development workflows.

With dashboards tracking adoption trends, feature usage, engagement differences across teams, and low‑usage or zero‑engagement conditions, the app helps optimize license utilization and training opportunities. Metrics on code suggestion and acceptance rates reveal how effectively Copilot’s recommendations enhance coding efficiency, while language and chat insights highlight where Copilot drives the most value.

By unifying these data points, the Sumo Logic app for GitHub Copilot empowers you to optimize Copilot adoption, improve developer productivity, and ensure secure, data-driven use of AI-assisted coding.

## Log types

This app uses Sumo Logic’s [GitHub Copilot source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/github-copilot-source/) to collect the [organization metrics](https://docs.github.com/en/rest/copilot/copilot-metrics?apiVersion=2022-11-28#get-copilot-metrics-for-an-organization) and [team metrics](https://docs.github.com/en/rest/copilot/copilot-metrics?apiVersion=2022-11-28#get-copilot-metrics-for-a-team) from the GitHub Copilot platform.

## Sample log messages

<details>
<summary>Metric Log</summary>

```json
{
        "date": "2024-06-24",
        "total_active_users": 24,
        "total_engaged_users": 20,
        "copilot_ide_code_completions": {
            "total_engaged_users": 20,
            "languages": [
                {
                    "name": "python",
                    "total_engaged_users": 10
                },
                {
                    "name": "ruby",
                    "total_engaged_users": 10
                }
            ],
            "editors": [
                {
                    "name": "vscode",
                    "total_engaged_users": 13,
                    "models": [
                        {
                            "name": "default",
                            "is_custom_model": false,
                            "custom_model_training_date": null,
                            "total_engaged_users": 13,
                            "languages": [
                                {
                                    "name": "python",
                                    "total_engaged_users": 6,
                                    "total_code_suggestions": 249,
                                    "total_code_acceptances": 123,
                                    "total_code_lines_suggested": 225,
                                    "total_code_lines_accepted": 135
                                },
                                {
                                    "name": "ruby",
                                    "total_engaged_users": 7,
                                    "total_code_suggestions": 496,
                                    "total_code_acceptances": 253,
                                    "total_code_lines_suggested": 520,
                                    "total_code_lines_accepted": 270
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "neovim",
                    "total_engaged_users": 7,
                    "models": [
                        {
                            "name": "a-custom-model",
                            "is_custom_model": true,
                            "custom_model_training_date": "2024-02-01",
                            "languages": [
                                {
                                    "name": "typescript",
                                    "total_engaged_users": 3,
                                    "total_code_suggestions": 112,
                                    "total_code_acceptances": 56,
                                    "total_code_lines_suggested": 143,
                                    "total_code_lines_accepted": 61
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "copilot_ide_chat": {
            "total_engaged_users": 13,
            "editors": [
                {
                    "name": "vscode",
                    "total_engaged_users": 13,
                    "models": [
                        {
                            "name": "default",
                            "is_custom_model": false,
                            "custom_model_training_date": null,
                            "total_engaged_users": 12,
                            "total_chats": 45,
                            "total_chat_insertion_events": 12,
                            "total_chat_copy_events": 16
                        }
                    ]
                }
            ]
        },
        "copilot_dotcom_chat": {
            "total_engaged_users": 14,
            "models": [
                {
                    "name": "default",
                    "is_custom_model": false,
                    "custom_model_training_date": null,
                    "total_engaged_users": 14,
                    "total_chats": 38
                }
            ]
        },
        "copilot_dotcom_pull_requests": {
            "total_engaged_users": 12,
            "repositories": [
                {
                    "name": "demo/repo1",
                    "total_engaged_users": 8,
                    "models": [
                        {
                            "name": "default",
                            "is_custom_model": false,
                            "custom_model_training_date": null,
                            "total_pr_summaries_created": 6,
                            "total_engaged_users": 8
                        }
                    ]
                },
                {
                    "name": "demo/repo2",
                    "total_engaged_users": 4,
                    "models": [
                        {
                            "name": "a-custom-model",
                            "is_custom_model": true,
                            "custom_model_training_date": "2024-02-01",
                            "total_pr_summaries_created": 10,
                            "total_engaged_users": 4
                        }
                    ]
                }
            ]
        }
}
```
</details>

## Sample queries

```sql title="Code Suggestion Acceptance Rate Over Time"
_sourceCategory="Labs/GithubCopilot"
| json "date","copilot_ide_code_completions.editors[*].models[*].languages[*]" as date, copilot_ide_code_completions_editors_models_languages nodrop
| extract field=copilot_ide_code_completions_editors_models_languages "\"?(?<editor_language>\{[^\}]+\})\"?[,\n\]]" multi
| json field=editor_language "total_code_acceptances", "total_code_suggestions", "name", "total_code_lines_accepted", "total_code_lines_suggested" as code_acceptances, code_suggestions, name, code_lines_accepted, code_lines_suggested

| where _type matches "{{_type}}"

| sum(code_acceptances) as total_code_acceptances, sum(code_suggestions) as total_code_suggestions by date
| (total_code_acceptances/total_code_suggestions)*100 as acceptance_rate
| round(acceptance_rate, 2) as acceptance_rate
| count by date, acceptance_rate
| sort by date desc
| fields - _count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for GitHub Copilot](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/github-copilot-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your GitHub Copilot app is properly integrated and configured to collect and analyze your GitHub Copilot data.
:::

### Create a new collector and install the app

import AppCollectionOPtion1 from '../../reuse/apps/app-collection-option-1.md';

<AppCollectionOPtion1/>

### Use an existing collector and install the app

import AppCollectionOPtion2 from '../../reuse/apps/app-collection-option-2.md';

<AppCollectionOPtion2/>

### Use an existing source and install the app

import AppCollectionOPtion3 from '../../reuse/apps/app-collection-option-3.md';

<AppCollectionOPtion3/>

## Viewing the GitHub Copilot dashboards​​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Adoption and Anomaly

The **GitHub Copilot - Adoption and Anomaly** dashboard offers a unified view of Copilot usage across your organization, tracking active and engaged users, adoption trends, and anomalies over time. It surfaces engagement patterns across key features, such as code completions, IDE chat, and pull-request summaries, while enabling side-by-side comparisons between teams and organizational averages. Low-usage and zero-engagement panels highlight areas where adoption is lagging, supporting targeted actions to boost utilization. By consolidating these insights, the dashboard helps stakeholders monitor adoption health, encourage consistent Copilot use, and maximize the value of AI-assisted development. <br/><img src={useBaseUrl('img/integrations/saas-cloud/GitHub-Copilot-Adoption-and-Anomaly.png')} alt="GitHub-Copilot---Adoption-and-Anomaly" />

### Code Completion Efficiency

The **GitHub Copilot - Code Completion Efficiency** dashboard evaluates how effectively you use Copilot’s code suggestions across languages and timeframes. It tracks suggestion and acceptance rates, compares accepted versus suggested lines of code, and highlights efficiency variations by language. By visualizing acceptance trends and language-specific performance, the dashboard enables teams to assess the quality of Copilot’s recommendations, pinpoint where developers may need support or model adjustments, and optimize AI-assisted coding to enhance productivity and code quality. <br/><img src={useBaseUrl('img/integrations/saas-cloud/GitHub-Copilot-Code-Completion-Efficiency.png')} alt="GitHub-Copilot---Code-Completion-Efficiency" />

### Language Insights

The **GitHub Copilot - Language Insights** dashboard reveals how you use Copilot across programming and configuration languages. It identifies the most frequently used languages, compares engagement levels, and visualizes acceptance rates to highlight where Copilot suggestions deliver the most value. Low-engagement metrics expose languages with limited adoption, while dedicated views for infrastructure languages, such as YAML, Terraform, and Dockerfile, provide visibility into DevOps and configuration activity. By consolidating language-specific performance and adoption data, the dashboard helps teams assess Copilot’s impact across the technology stack and focus enablement efforts where they’ll drive the greatest improvement. <br/><img src={useBaseUrl('img/integrations/saas-cloud/GitHub-Copilot-Language-Insights.png')} alt="GitHub-Copilot---Language-Insights" />

### Chat Engagement and Interaction Quality

The **GitHub Copilot - Chat Engagement and Interaction Quality** dashboard offers visibility into how you use Copilot’s chat features across development environments. It tracks chat activity over time, analyzes user behavior through copy-versus-insert trends, and distinguishes engagement by model type to reveal adoption of default versus custom models. By unifying these insights, the dashboard helps teams understand how developers leverage chat for assistance, assess interaction quality, and identify opportunities to promote secure, effective use of Copilot’s conversational capabilities. <br/><img src={useBaseUrl('img/integrations/saas-cloud/GitHub-Copilot-Chat-Engagement-and-Interaction-Quality.png')} alt="GitHub-Copilot---Chat-Engagement-and-Interaction-Quality" />

## Upgrading the GitHub Copilot app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the GitHub Copilot app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>