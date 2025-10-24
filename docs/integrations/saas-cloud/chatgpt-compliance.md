---
id: chatgpt-compliance
title: ChatGPT Compliance
sidebar_label: ChatGPT Compliance
description: The Sumo Logic app for ChatGPT Compliance gives you a unified view of AI usage, enabling transparent oversight, data protection, and adherence to corporate governance standards.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/chatgpt-compliance.png')} alt="Carbon Black Inventory icon" width="50" />

The Sumo Logic app for ChatGPT Compliance enables you to uphold security, transparency, and accountability in your use of AI-powered conversations across teams and departments by centralizing compliance and audit data from ChatGPT Workspace environments. You can monitor the usage, review conversation activity, and ensure adherence to corporate governance and data protection standards.

This app provides visibility into how ChatGPT is used across your organization, identifying interaction patterns, data-sharing behaviors, and potential policy or compliance risks by leveraging detailed metadata, content insights, and audit trails. This transparency supports proactive oversight, risk mitigation, and regulatory alignment.

Comprehensive dashboards and visualizations provide a holistic view of your organization’s AI interaction posture, highlighting activity trends, message-level insights, and data sensitivity indicators, to help compliance teams detect irregularities, enforce responsible AI policies, and protect proprietary information, while enabling leadership to strengthen governance, safeguard data integrity, and maintain trust in responsible technology use.

## Log types

This app uses Sumo Logic’s [ChatGPT Compliance Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/chatgpt-compliance-source/) to collect the conversation logs from the ChatGPT Compliance platform.

## Sample log message

<details>
<summary>Conversation Log</summary>

```json
{
  "id": "68cccb0d-6994-8321-8268-5193b8b55c01",
  "created_at": 1760231119.916074,
  "last_active_at": 1760349119.540962,
  "message": {
    "author": {
      "object": "compliance.workspace.conversation.message.author",
      "role": "user",
      "tool_name": "myfiles_browser"
    },
    "content": {
      "annotations": [],
      "type": "text",
      "value": "he didn't get the siding permit yet, but has started working on it."
    },
    "created_at": 1760411119.881,
    "files": {
      "data": [
        {
          "created_at": 1760411119.119338,
          "download_url": "https://files01.oaiusercontent.com/file-TfyE2zmUjSNYWCPudTieSx?se=2025-10-13T10%3A19%3A00Z\u0026sp=r\u0026sv=2024-08-04\u0026sr=b\u0026rscc=max-age%3D3599%2C%20immutable%2C%20private\u0026rscd=attachment%3B%20filename%3DGreg%2520F.txt\u0026skoid=dfdaf859-26f6-4fed-affc-1befb5ac1ac2\u0026sktid=a48cca56-e6da-484e-a814-9c849652bcb3\u0026skt=2025-10-13T09%3A16%3A38Z\u0026ske=2025-10-14T09%3A16%3A38Z\u0026sks=b\u0026skv=2024-08-04\u0026sig=v4gL3%2ByyUihI%2BPuMZTUx30pg7fPh/E/mgx4bc4RzGd8%3D",
          "id": "file-AfyE2zmUjSNYWCPudTieSx",
          "name": "Greg F1.txt",
          "object": "compliance.workspace.conversation.message.file"
        }
      ],
      "has_more": false,
      "last_id": null,
      "object": "list"
    },
    "gpt_id": "g-68a29a23af308191a22a206acd7f965a",
    "id": "b99bae4e-0746-4001-9971-17f8c019d55f",
    "object": "compliance.workspace.conversation.message",
    "parent_id": "b99bae4e-0746-4002-9971-17f8c019d55f",
    "project_id": null
  },
  "title": "Anchor div to bottom",
  "user_id": "user-avcJbusY2W3lkb6aT6aY4gsx",
  "user_email": "testuser1@test.com",
  "workspace_id": "11bf645e-d5e8-4478-a70e-e5742ded2436",
  "object": "compliance.workspace.conversation"
}
```
</details>

## Sample queries

```sql title="Messages by Content Type"
_sourceCategory=GPT
| json "id", "last_active_at", "user_id", "user_email", "title", "workspace_id", "message.author.role", "message.author.tool_name", "message.content.type", "message.content.value", "message.files.data[*]", "message.gpt_id", "message.id" as id, last_active_at, user_id, user_email, title, workspace_id, role, tool_name, message_type, message_value, files_data, gpt_id, message_id nodrop

// global filters
| where user_email matches "{{user}}" or isBlank(user_email)
| where role matches "{{role}}" or isBlank(role)
| where tool_name matches "{{tool}}" or isBlank(tool_name)
| where gpt_id matches "{{model}}" or isBlank(gpt_id)
| where message_type matches "{{message_type}}" or isBlank(message_type)
| where message_value contains "{{message}}" or "{{message}}" == "*"

| where !isBlank(message_type)
| count by message_id, message_type
| count by message_type
| sort by _count, message_type
```

```sql title="Messages by Role"
_sourceCategory=GPT
| json "id", "last_active_at", "user_id", "user_email", "title", "workspace_id", "message.author.role", "message.author.tool_name", "message.content.type", "message.content.value", "message.files.data[*]", "message.gpt_id", "message.id" as id, last_active_at, user_id, user_email, title, workspace_id, role, tool_name, message_type, message_value, files_data, gpt_id, message_id nodrop

// global filters
| where user_email matches "{{user}}" or isBlank(user_email)
| where role matches "{{role}}" or isBlank(role)
| where tool_name matches "{{tool}}" or isBlank(tool_name)
| where gpt_id matches "{{model}}" or isBlank(gpt_id)
| where message_type matches "{{message_type}}" or isBlank(message_type)
| where message_value contains "{{message}}" or "{{message}}" == "*"

| where !isBlank(role)
| count by message_id, role
| count by role
| sort by _count, role
```

```sql title="Top 10 Users by Conversations"
_sourceCategory=GPT
| json "id", "last_active_at", "user_id", "user_email", "title", "workspace_id", "message.author.role", "message.author.tool_name", "message.content.type", "message.content.value", "message.files.data[*]", "message.gpt_id", "message.id" as id, last_active_at, user_id, user_email, title, workspace_id, role, tool_name, message_type, message_value, files_data, gpt_id, message_id nodrop

// global filters
| where user_email matches "{{user}}" or isBlank(user_email)
| where role matches "{{role}}" or isBlank(role)
| where tool_name matches "{{tool}}" or isBlank(tool_name)
| where gpt_id matches "{{model}}" or isBlank(gpt_id)
| where message_type matches "{{message_type}}" or isBlank(message_type)
| where message_value contains "{{message}}" or "{{message}}" == "*"

| where !isBlank(user_id) and !isBlank(user_email)
| count by id, user_id, user_email
| count as frequency by user_id, user_email
| sort by frequency
| limit 10
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for ChatGPT Compliance](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/chatgpt-compliance-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your ChatGPT Compliance app is properly integrated and configured to collect and analyze your ChatGPT Compliance data.
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

## Viewing the ChatGPT Compliance dashboards​​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Security

The **ChatGPT Compliance – Security** dashboard offers a comprehensive view of ChatGPT usage and interaction patterns across your organization, enabling compliance and security teams to monitor activity, assess AI adoption, and uphold responsible data governance. Interactive visualizations reveal key metrics, including active users, model utilization, message volume, and content types.

Panels like *Top 10 Users by Conversations* and *Top 10 Users by Messages* highlight the most active participants, enabling administrators to identify behavioral trends and usage patterns, supporting policy alignment and informed decisions on model governance and optimization. Time-series views, such as the *Messages Over Time* panel, track engagement over time to detect spikes or anomalies. Meanwhile, *File Uploads*, *Conversations Summaries*, and *Messages Summaries* centralize interaction metrics for streamlined monitoring and audit readiness. The *Content Sensitivity Scan* further strengthens oversight by flagging messages with potentially sensitive or regulated data for prompt risk mitigation.

By unifying user activity, data sensitivity, and model usage insights in a single dynamic interface, this dashboard delivers the visibility and control needed to ensure transparency, responsible AI use, and compliance across your organization.<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/chatgpt-compliance/ChatGPT+Compliance+-+Security.png' alt="ChatGPT-Compliance-Security-Dashboard" />

## Upgrading/Downgrading the ChatGPT Compliance app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the ChatGPT Compliance app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
