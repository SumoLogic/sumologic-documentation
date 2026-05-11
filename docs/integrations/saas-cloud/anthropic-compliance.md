---
id: anthropic-compliance
title: Anthropic Compliance
sidebar_label: Anthropic Compliance
description: The Anthropic Compliance Monitoring app analyzes compliance, security, authentication, API, billing, integration, and Claude activity data from the Anthropic platform. It provides visibility into user behavior, operational activity, governance changes, and potential security threats across the environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/anthropic.png')} alt="Anthropic" width="75"/>

The Anthropic Compliance Monitoring app for Sumo Logic provides centralized visibility into Anthropic platform activities, security events, user behavior, API usage, authentication activity, billing operations, integrations, data access, and organizational changes. The app enables security, compliance, and operations teams to monitor critical activities, detect suspicious behavior, investigate threats, and maintain governance across Anthropic environments. With dashboards covering Claude usage, API monitoring, authentication, exfiltration detection, integrations, SSO, session management, billing, user lifecycle events, and policy changes, the app delivers real-time operational insights and comprehensive compliance monitoring through detailed analytics and event correlation.

## Log types

This app uses activity logs of anthropic compliance.

### Sample log message

```json title="Activity Log"
{
  "actor": {
    "type": "user_actor",
    "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.6099.119 Mobile/15E148 Safari/604.1",
    "user_id": "user_01KQS2GBC9MK53Y7WE6G16G2Y8",
    "email_address": "alex.martinez482@example.org",
    "ip_address": "45.150.108.61"
  },
  "id": "activity_01KQS28XP295M0QR9VRCX7C3K0",
  "type": "org_join_request_instant_approved",
  "organization_uuid": "org_081m2TJpAuK364YHLwQCXe5r",
  "created_at": "2026-05-08T12:18:11.000538Z",
  "organization_id": "01KQS4ZBD35MR4678P2NNXZPW1"
}
```

### Sample queries

```sumo title="Compliance Activities"
_sourceCategory="{{Logsdatasource}}" type actor

| json "type","organization_uuid","id","actor.type" as event_type,org_uuid,id,actor_type nodrop

// Global filter
| where if("{{event_type}}" = "*",true,event_type matches "{{event_type}}")
| where if("{{organization}}" = "*",true,org_uuid matches "{{organization}}")
| where if("{{actor_type}}" = "*",true,actor_type matches "{{actor_type}}")

// Panel specific
| count by id
| count
```

```sumo title="Activity Types"
_sourceCategory="{{Logsdatasource}}" type actor

| json "type","organization_uuid","id","actor.type" as event_type,org_uuid,id,actor_type nodrop

// Global filter
| where if("{{event_type}}" = "*",true,event_type matches "{{event_type}}")
| where if("{{organization}}" = "*",true,org_uuid matches "{{organization}}")
| where if("{{actor_type}}" = "*",true,actor_type matches "{{actor_type}}")

// Panel specific
| count by id,event_type
| count by event_type
| count
```

## Collecting logs

This section has instructions for collecting logs for the Sumo Logic app for Anthropic Compliance.

### Collection process overview

:::important
Use the [Universal Connector](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/universal-connector-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Anthropic Compliance app is properly integrated and configured to collect and analyze your Anthropic Compliance data.
:::

## Installing the Anthropic Compliance app   

This section shows you how to install the Sumo Logic app for Anthropic Compliance.

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing the Anthropic Compliance dashboards​​ 

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Activity Overview

This dashboard delivers a high-level summary of all compliance-relevant activities occurring across your Anthropic environment, including event volumes, activity types, and threat counts. It maps activity by geographic location, highlights events from embargoed regions, and identifies unauthenticated actors and failed activities. Teams can drill into activity distribution by organization, actor, and identity provider connection type to quickly assess the overall compliance posture and surface anomalous behavior patterns.

<img src={useBaseUrl('img/send-data/Anthropic-Compliance-Activity-Overview.png')} alt="Anthropic Compliance - Activity Overview dashboard" />

### Billing Monitoring

This dashboard monitors billing-related compliance events, including subscription lifecycle changes, spend limit updates, prepaid activity, and recharge events across your Anthropic organization. It highlights the top plan types, organizations with the most billing activity, and users making frequent spend limit changes. Trend analysis and detailed event tables provide full audit coverage for financial governance and compliance. Use this dashboard to detect unauthorized billing changes, track subscription modifications, and ensure spend controls are functioning as intended.

<img src={useBaseUrl('img/send-data/Anthropic-Compliance-Billing-Monitoring.png')} alt="Anthropic Compliance - Billing Monitoring dashboard" />

### API Key Monitoring

This dashboard provides visibility into API key lifecycle events across your Anthropic environment, including creation, deletion, and modification of API, Admin, Service, and Signing keys. It tracks key event trends over time, highlights the most active users, and surfaces detailed event records for audit and investigation purposes. Use this dashboard to detect unauthorized key activity, monitor privileged admin key usage, and ensure key management practices align with your security policies.


<img src={useBaseUrl('img/send-data/Anthropic-Compliance-API-Key-Monitoring.png')} alt="Anthropic Compliance - API Key Monitoring dashboard" />

### Artifacts, Marketplace, and Projects Monitoring

This dashboard tracks lifecycle events for Artifacts, Marketplace items, and Projects on the Anthropic platform, including creation, access, and deletion. It provides trend analysis, event breakdowns, and detailed activity tables to help teams identify unusual access patterns or unauthorized changes. Active artifact, project, and user counts give a real-time snapshot of platform engagement. Use this dashboard to maintain governance over shared resources and to ensure marketplace and project activities align with organizational policies.

<img src={useBaseUrl('img/send-data/Anthropic-Compliance-Artifacts-Marketplace-and-Projects-Monitoring.png')} alt="Anthropic Compliance - Artifacts, Marketplace, and Projects Monitoring dashboard" />

### Claude Skills and Plugins Monitoring

This dashboard provides visibility into the usage and lifecycle of Claude Skills and Plugins across your Anthropic environment, including invocation trends, event distributions, and top active skills and plugins. It surfaces unique skill and plugin counts, along with detailed activity records, to help teams govern AI capability extensions. Usage trends help identify sudden spikes or drops in plugin or skill activity that may warrant investigation. Use this dashboard to ensure approved extensions are being used appropriately and to detect any unauthorized or anomalous AI tool usage.

<img src={useBaseUrl('img/send-data/Anthropic-Compliance-Claude-Skills-and-Plugins-Monitoring.png')} alt="Anthropic Compliance - Claude Skills and Plugins Monitoring dashboard" />

### Claude Usage Monitoring

This dashboard delivers comprehensive visibility into Claude platform usage, covering chat events, chat snapshots, Claude Code activity, and Claude Command executions. It tracks usage trends, top active users, unique interaction counts, failed chats, and model usage distribution to support both operational monitoring and compliance oversight. Dedicated sections for Claude Code provide insight into trigger modes, top repositories, and event statuses across development workflows. Use this dashboard to enforce acceptable use policies, detect excessive or anomalous usage, and maintain a complete audit trail of Claude interactions.

<img src={useBaseUrl('img/send-data/Anthropic-Compliance-Claude-Usage-Monitoring.png')} alt="Anthropic Compliance - Claude Usage Monitoring dashboard" />

### Compliance API Access Monitoring

This dashboard monitors access to Anthropic's Compliance API, providing visibility into request trends by user agent, HTTP status code distributions, and geographic origin of API calls. It highlights non-2xx error trends, top actor IP addresses, and accessed API endpoint types to help teams detect misuse or unauthorized access attempts. Embargoed geo-location filtering surfaces API access from restricted regions for immediate review. Use this dashboard to ensure Compliance API access is limited to authorized actors and to investigate anomalous or error-prone API usage patterns.

<img src={useBaseUrl('img/send-data/Anthropic-Compliance-Compliance-API-Access-Monitoring.png')} alt="Anthropic Compliance - Compliance API Access Monitoring dashboard" />

### Data Access and Exfiltration Monitoring

This dashboard provides deep visibility into file, document, and data export activities across the Anthropic platform to help detect potential data exfiltration or unauthorized access. It tracks file access events, reconnaissance behavior, Claude artifact sharing, and platform-level file activities alongside group and project views. Frequently uploaded and most-viewed file analysis helps identify unusual data movement patterns. Use this dashboard to monitor data governance compliance, investigate suspicious exfiltration indicators, and maintain oversight of sensitive content access and sharing.


<img src={useBaseUrl('img/send-data/Anthropic-Compliance-Data-Access-and-Exfiltration-Monitoring.png')} alt="Anthropic Compliance - Data Access and Exfiltration Monitoring dashboard" />

### Identity, Access, and Authentication Monitoring

This dashboard provides comprehensive monitoring of authentication events, role and group changes, SCIM provisioning, and API key activity across your Anthropic environment. It tracks login success and failure trends, highlights users with failed authentication, and maps activity by geographic location, including embargoed regions. Privilege escalation flows and recon-exploit patterns are surfaced to help security teams identify and respond to identity-based threats. Use this dashboard to enforce least-privilege access, investigate authentication anomalies, and maintain a complete audit trail of identity and access events.

<img src={useBaseUrl('img/send-data/Anthropic-Compliance-Identity-Access-and-Authentication-Monitoring.png')} alt="Anthropic Compliance - Identity, Access, and Authentication Monitoring dashboard" />

### MCP Servers, Integrations, and GitHub Enterprise

This dashboard monitors management events for MCP Servers, third-party Integrations, and GitHub Enterprise connections within your Anthropic environment. It tracks active MCP servers, integration types, top GitHub repositories, and the geo-locations of actors performing management actions. Event distribution and detail tables provide full visibility into configuration changes and integration lifecycle activity. Use this dashboard to govern AI infrastructure extensions, detect unauthorized changes to integrations, and ensure GitHub Enterprise connectivity aligns with organizational security standards.

<img src={useBaseUrl('img/send-data/Anthropic-Compliance-MCP-Servers-Integrations-and-GitHub-Enterprise.png')} alt="Anthropic Compliance - MCP Servers, Integrations, and GitHub Enterprise dashboard" />

### Organization and Policy Configuration

This dashboard monitors organization-level configuration events, including discoverability changes, org management actions, disabled events, and user policy modifications. It maps the geo-location of users performing org changes, highlights top users making configuration updates, and tracks event trends over time. Detailed event tables and breakdowns support rapid investigation of unauthorized or unexpected organizational changes. Use this dashboard to ensure configuration governance, detect policy drift, and maintain an auditable record of all organization-level administrative activity.

<img src={useBaseUrl('img/send-data/Anthropic-Compliance-Organization-and-Policy-Configuration.png')} alt="Anthropic Compliance - Organization and Policy Configuration dashboard" />

### SSO, Directory Sync Monitoring

This dashboard tracks Single Sign-On (SSO) and Directory Sync events across your Anthropic environment, including connection activations, deactivations, deletions, and sync lifecycle activity. It provides event distributions, trend analysis, and geographic mapping of SSO and directory sync activities to support identity governance. Top users performing SSO and directory sync changes are highlighted for accountability and anomaly detection. Use this dashboard to ensure SSO configurations remain secure, detect unauthorized changes to identity providers, and maintain compliance with access management policies.

<img src={useBaseUrl('img/send-data/Anthropic-Compliance-SSO-Directory-Sync-Monitoring.png')} alt="Anthropic Compliance - SSO, Directory Sync Monitoring dashboard" />

### Session Management

This dashboard monitors user session activity across the Anthropic platform, including session creation, sharing, and termination events. It visualizes session event distributions, activity trends, and geographic locations of session activity, including events from embargoed regions. A top user's view highlights accounts with the highest session activity for anomaly detection and access governance. Use this dashboard to detect suspicious session behavior, enforce session policy compliance, and investigate unauthorized or geographically anomalous session access.


<img src={useBaseUrl('img/send-data/Anthropic-Compliance-Session-Management.png')} alt="Anthropic Compliance - Session Management dashboard" />

### User Agent Analysis

This dashboard analyzes the user agents accessing your Anthropic environment, categorizing traffic by browser, operating system, platform, and automated versus human origin. It tracks user-agent activity trends, surfaces the top agents associated with failed activities, and highlights HTTP errors encountered by different client types. Connector and category trend analysis helps teams identify unusual or unauthorized client tooling over time. Use this dashboard to detect bot activity, investigate suspicious client behavior, and ensure that only approved tools and platforms access your Anthropic environment.

<img src={useBaseUrl('img/send-data/Anthropic-Compliance-User-Agent-Analysis.png')} alt="Anthropic Compliance - User Agent Analysis dashboard" />

### User Configuration and Invite Lifecycle Monitoring

This dashboard provides full visibility into user configuration changes, invite lifecycle events, role assignments, and organizational membership activity across your Anthropic environment. It tracks users with the highest frequency of configuration changes, monitors invite link usage, and surfaces geolocation data on user activities, including access from embargoed regions. Detailed tables cover role changes, org member invites, user settings updates, and recent activity for comprehensive audit coverage. Use this dashboard to govern user onboarding and offboarding processes, detect unauthorized role changes, and ensure invite and configuration practices comply with organizational policies.

<img src={useBaseUrl('img/send-data/Anthropic-Compliance-User-Configuration-and-Invite-Lifecycle-Monitoring.png')} alt="Anthropic Compliance - User Configuration and Invite Lifecycle Monitoring dashboard" />

## Upgrade/Downgrade the Anthropic Compliance app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Anthropic Compliance app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
