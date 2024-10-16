---
id: atlassian
title: Atlassian
sidebar_label: Atlassian
description: Monitor and analyze the critical events of Atlassian data.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/atlassian-icon.png')} alt="atlassian-icon" width="40" />

The Sumo Logic app for Atlassian provides comprehensive visibility into your organization's Atlassian environment, including Confluence, Jira, and Bitbucket. This app helps security and IT teams monitor critical events such as user activities, policy changes, group and API token creations, and product access, all of which are essential for security audits and compliance tracking. With pre-configured dashboards, you can quickly detect suspicious behavior like unauthorized access, configuration changes, and potential insider threats. Geolocation features helps you to identify the physical origin of actions, which is valuable for investigating abnormal activity from unusual regions. The app also tracks key security events such as failed logins, API accesses, and policy updates, allowing security teams to ensure that Atlassian services are being used securely and efficiently. This app is essential for maintaining governance and security within the Atlassian suite.

:::info
This app includes [built-in monitors](#atlassian-monitors). For details on creating custom monitors, refer to [Create monitors for Atlassian app](#create-monitors-for-atlassian-app).
:::

## Log types

This app uses Sumo Logic’s Atlassian Source to collect [Event Logs](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-events/#api-group-events) from Atlassian.

### Sample log message

```json title="Event Log"
{
    "type": "events",
    "id": "606a97f7-f2d9-4007-91a7-8adyc1s328bf",
    "attributes": {
      "time": "2024-10-03T10:44:26.457Z",
      "action": "jira_issue_viewed",
      "actor": {
        "id": "557058:bd955be1-e2d3-41e4-a3be-70bf24d0444e",
        "name": "xyzabc",
        "email": "xyzabc@gmail.com",
        "links": {
          "alt": "https://admin.atlassian.com/s/cee46caf-81e6-41b6-b8a0-a767d9/users/557058:bd955be1-e2d3-41e4-a3be-70bf24d0444e",
          "self": "https://api.atlassian.com/users/557058:bd955be1-e2d3-41e470bf24d0444e/manage/profile"
        }
      },
      "context": [],
      "container": [
        {
          "id": "cee46caf-81e6-41b6-b8723f8067d9",
          "type": "sites",
          "attributes": {
            "siteName": "gmail",
            "product": "software",
            "issueId": "284408",
            "issueKeyOrId": "WEB-21003",
            "siteHostName": "https://gmail.atlassian.net"
          },
          "links": {
            "alt": "https://gmail.atlassian.net/browse/WEB-21003"
          }
        }
      ],
      "location": {
        "ip": "91.225.122.155",
        "countryName": "Ukraine",
        "regionName": "Kyiv City",
        "city": "Kyiv"
      }
    },
    "links": {
      "self": "https://api.atlassian.com/admin/v1/orgs/eced9542-6842-bcb1-3662afe713d7/events/606a97f7-f2d907-91a7-8ad4c1f328bf"
    },
    "message": {
      "content": "Viewed Jira issue WEB-21003",
      "format": "simple"
    }
}
```

### Sample queries

```sql title="Events by Action"
_sourceCategory="Labs/Atlassian"
| json "attributes.actor.name", "attributes.action", "attributes.location.countryName", "id", "message.content", "attributes.location.city", "attributes.location.regionName", "attributes.location.ip", "attributes.actor.email", "attributes.time", "type", "attributes.context[*].attributes" as actor, action, country, id, message, city, region, ip, actor_email, time, type, action_performed_against nodrop

// global filters
| where actor matches "{{actor}}"
| where action matches "{{action}}"

| count by id, action
| count as frequency by action
| sort by frequency
```

## Set up collection

To set up [Cloud-to-Cloud Integration Atlassian Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/atlassian-source) for the Atlassian app, follow the instructions provided. These instructions will guide you through the process of creating a source using the Atlassian Source category, which you will need to use when installing the app. By following these steps, you can ensure that your Atlassian app is properly integrated and configured to collect and analyze your Atlassian data.

## Installing the Atlassian app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Atlassian dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Atlassian - Overview** dashboard provides a comprehensive overview of key actions and events across the Atlassian environment, offering critical insights for security teams. It displays the total number of events, breaks down actions by type (for example, user logins, API access, and policy changes), and visualizes event frequency over time to help detect abnormal activity patterns.

The top actors and their associated actions are highlighted, allowing quick identification of potential security risks. Additionally, the geolocation maps identify where actors and risky activities are originating from, offering further context for threat detection. The recent events table gives granular details, including timestamps, actor names, and countries, aiding in a thorough investigation of any security incidents. This dashboard is instrumental for detecting unauthorized access, policy violations, and other suspicious activity within the Atlassian ecosystem. <br/><img src={useBaseUrl('img/integrations/saas-cloud/atlassian-overview.png')} alt="atlassian-Overview" width="750"/>

### Jira, Confluence, and Bitbucket

The **Atlassian - Jira, Confluence, and Bitbucket** dashboard provides a holistic view of user activities across the three platforms, making it a crucial tool for security teams. It offers insights into key actions such as sprint management in Jira, space permissions in Confluence, and user account modifications in Bitbucket. 

Security professionals can use this dashboard to track the frequency of Jira events, such as sprint creations, updates, and closures, along with user roles and permission changes. The Confluence section monitors critical events related to permission alterations, while Bitbucket tracks password resets, user activations, and deactivations, helping detect unauthorized account actions. The *Events Over Time* section enables trend analysis of activity spikes and the *Recently Added Security Levels* highlights any updates in project security. The geolocation mapping of actors offers added visibility into where activities originate, helping identify potential geographic threats.<br/><img src={useBaseUrl('img/integrations/saas-cloud/atlassian-jira-confluence-and-bitbucket.png')} alt="atlassian-jira-confluence-and-bitbucke" width="750"/>

### User Activity

The **Atlassian - User Activity** dashboard provides a comprehensive overview of critical user actions and security-related events within the Atlassian platform. It monitors key activities such as user creation, role assignment, API token generation, and policy changes, helping security teams detect unauthorized account modifications or policy alterations. The dashboard includes visualizations of login attempts (both successful and failed attempts) and tracks access granted to users over time, aiding in the identification of potential security breaches or abnormal access patterns. A detailed events summary table provides insights into who performed specific actions and from which geographical locations, which is crucial for identifying suspicious activity. This dashboard is a valuable tool for security teams to oversee user activity, policy enforcement, and system integrity.<br/><img src={useBaseUrl('img/integrations/saas-cloud/atlassian-user-activity.png')} alt="atlassian-user-activity" width="750"/>

## Create monitors for Atlassian app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Atlassian monitors

The Atlassian monitors are designed for security purpose to focus on monitoring key activities and potential threats across Atlassian environments. These alerts provide real-time visibility into critical actions, enabling security teams to respond quickly to anomalies or policy violations. 

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Events from Risky Locations` | This alert is fired when the user actions are originating from high-risk locations (Afghanistan, China, Cuba, North Korea, Iran, Libya, Nigeria, Sudan, Syria, and Yemen) based on geographical profiles. This helps detect potential account compromise or malicious activities. | Critical | Count > 0 | 
| `User addition to group` | This alert is fired when when users are added to groups, ensuring that changes in group memberships, especially those with elevated privileges, are legitimate. | Critical | Count > 1|
| `API Token Created` | This alert is fired during the creation of API tokens, which can be exploited if misused. Monitoring this ensures that only authorized users are generating API tokens for secure integrations. | Critical | Count > 0 |
| `User Granted Product Access` | This alert fires when users are granted access to specific Atlassian products, helping ensure that only authorized individuals gain access to sensitive tools or data. | Critical | Count > 5 |
| `Failed Login events` | This alert is fired when there is failed login attempts, which can indicate brute force attacks or unauthorized access attempts. Repeated failures may suggest a compromised user account. | Critical | Count > 5 |
| `Login exceeds set parameters` | This alert is fired when logins exceed predefined thresholds, such as login attempts or unusual session durations, which could signal suspicious activity. | Critical | Count > 1 |
| `Change in Policy` | This alert is fired when there is changes in organizational policies, such as user access controls or security settings, helping prevent unauthorized modifications that could lead to vulnerabilities. | Critical | Count > 0 |

## Upgrading the Atlassian app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Atlassian app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>