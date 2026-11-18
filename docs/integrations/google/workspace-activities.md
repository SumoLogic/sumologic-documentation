---
id: workspace-activities
title: Google Workspace Activities
sidebar_label: Google Workspace Activities
description: The Sumo Logic app for Google Workspace Activities helps you monitor user and administrator activity across your Google Workspace environment by ingesting activity events from the Google Admin SDK Reports API.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/Google_Workspace_Logo.svg')} alt="Google Workspace logo" width="150" />

The Sumo Logic app for Google Workspace Activities helps you monitor user and administrator activity across your Google Workspace environment by ingesting audit activity events from the Google Admin SDK Reports API. The app provides a comprehensive set of predefined dashboards that present activity for core productivity services including Gmail, Drive, Calendar, Meet, Chat, Keep, Tasks, Contacts, and Gemini, alongside security, identity, and administration services such as Admin console changes, SAML and OAuth Token sign-ins, LDAP, Context-Aware Access, User Accounts, Rules, Mobile devices, Chrome, Directory Sync, Takeout, and Vault.

:::info
This app includes [built-in monitors](#google-workspace-activities-alerts). For details on creating custom monitors, refer to [Create monitors for Google Workspace Activities app](#create-monitors-for-google-workspace-activities-app).
:::

## Log type

This app uses the [Google Workspace Activities Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/google-workspace-activities/) to collect audit activity events from the [Google Admin SDK Reports API](https://developers.google.com/workspace/admin/reports/reference/rest/v1/activities/list). 

### Sample log message

<details>
<summary>Click to expand</summary>

```json title="Google Workspace Login Activity Event"
{
  "actor": {
    "email": "pablo.loaiza@abcd.com",
    "profileId": "116159349057010206877"
  },
  "etag": "\"nNEc9gal71zAXcZCAEuACF_HaHL-qljl7gkdrnnYaAs/ByvKAj_gE0W_hIlyo6zci0ZIiZo\"",
  "events": [
    {
      "name": "login_verification",
      "parameters": [
        {
          "name": "login_type",
          "value": "saml"
        },
        {
          "multiValue": [
            "saml"
          ],
          "name": "login_challenge_method"
        },
        {
          "name": "login_challenge_status",
          "value": "passed"
        },
        {
          "name": "is_second_factor"
        }
      ],
      "resourceIds": [
        "0haapch2v0v6ma"
      ],
      "type": "login"
    }
  ],
  "id": {
    "applicationName": "login",
    "customerId": "C01ydpbjo",
    "time": "2026-10-12T22:12:30.064Z",
    "uniqueQualifier": "5462944545274950170"
  },
  "ipAddress": "168.119.168.251",
  "kind": "admin#reports#activity",
  "networkInfo": {
    "ipAsn": [
      55256
    ],
    "regionCode": "US",
    "subdivisionCode": "US-FL"
  },
  "resourceDetails": [
    {
      "id": "0haapch2v0v6ma",
      "ownerDetails": {
        "ownerIdentity": [
          {
            "customerIdentity": {
              "id": "01ydpbjo"
            }
          }
        ],
        "ownerType": "CUSTOMER"
      },
      "title": "pablo.loaiza@abcd.com",
      "type": "USER"
    }
  ]
}
```

</details>

### Sample queries

```sumo title="Successful Logins"
_sourceCategory={{Logsdatasource}}  login login_success
| json "id.applicationName", "id.uniqueQualifier", "actor.email", "events[*].name" as app_name, id, actor_email, event_names nodrop

// global filters
| where app_name = "login"
| parse regex field=event_names "\"(?<event_name>[^\"]+)\"" multi
| parse regex field=_raw "\"name\":\s*\"login_type\",\s*\"value\":\s*\"(?<login_type>[^\"]+)\"" multi nodrop
| where if ("{{actor_email}}" = "*", true, actor_email matches "{{actor_email}}")
| where if ("{{login_type}}" = "*", true, login_type matches "{{login_type}}")

| where event_name = "login_success"
| count by id
| count
```

```sumo title="Files Shared Externally"
_sourceCategory={{Logsdatasource}}  drive shared_externally
| json "id.applicationName", "id.uniqueQualifier", "actor.email", "events[*].name" as app_name, id, actor_email, event_names nodrop

// global filters
| where app_name = "drive"
| parse regex field=event_names "\"(?<event_name>[^\"]+)\"" multi
| where if ("{{actor_email}}" = "*", true, actor_email matches "{{actor_email}}")
| where if ("{{event_name}}" = "*", true, event_name matches "{{event_name}}")

| parse regex field=_raw "\"name\":\s*\"visibility\",\s*\"value\":\s*\"(?<visibility>[^\"]+)\"" multi
| where visibility = "shared_externally"
| count by id
| count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::tip
Use the [Google Workspace Activities Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/google-workspace-activities/) to create the source and use the same source category while installing the app.
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

## Viewing Google Workspace Activities dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Access Evaluation Activities

The **Google Workspace - Access Evaluation Activities** dashboard monitors context-aware access token evaluations, including allowed and blocked requests and the OAuth apps requesting access. It breaks down client types, trends evaluation outcomes over time, and maps requests to source geography. Use this dashboard to review which applications are evaluated against access policies, investigate blocked requests, and detect access attempts from risky locations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Access-Evaluation-Activities.png')} alt="Google Workspace Access Evaluation Activities" />

### Access Transparency Activities

The **Google Workspace - Access Transparency Activities** dashboard monitors Google staff access to customer data, including access reasons, approval status, and the resources accessed. It trends access events over time and maps them to source geography for compliance review. Use this dashboard to audit provider access, verify justifications and approvals, and demonstrate transparency controls for security and compliance.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Access-Transparency-Activities.png')} alt="Google Workspace Access Transparency Activities" />

### Admin Activities

The **Google Workspace - Admin Activities** dashboard monitors Google Admin console changes, including overall event volume and the setting categories being modified. It highlights the most active administrators and the users most frequently affected by admin actions, and maps administrative activity to source geography. Use this dashboard to audit sensitive configuration changes, track privileged admin behavior, and detect administrative actions from unexpected locations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Admin-Activities.png')} alt="Google Workspace Admin Activities" />

### Calendar Activity

The **Google Workspace - Calendar Activity** dashboard monitors Google Calendar activity, including event creation, deletion, and sharing as well as external attendee interactions. It highlights the most active users, breaks down event actions, and trends calendar activity over time. Use this dashboard to audit calendar changes, surface external sharing of events, and understand scheduling patterns across the organization.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Calendar-Activity.png')} alt="Google Workspace Calendar Activity" />

### Chat Activity

The **Google Workspace - Chat Activity** dashboard monitors Google Chat activity, including spaces, messages, and membership changes. It highlights external and direct-message conversations, surfaces the most active users and spaces, and trends messaging activity over time. Use this dashboard to gain collaboration visibility, detect external communication, and investigate anomalous chat activity.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Chat-Activity.png')} alt="Google Workspace Chat Activity" />

### Chrome Activity

The **Google Workspace - Chrome Activity** dashboard monitors managed Chrome browser and extension activity across your fleet, including extension install, update, and removal events along with browser version spread. It highlights the top extensions, users, and profile users, breaks activity down by extension version, and maps events to source geography. Use this dashboard to track extension lifecycle changes, surface outdated or risky browsers, and investigate anomalous extension activity.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Chrome-Activity.png')} alt="Google Workspace Chrome Activity" />

### Classroom Activity

The **Google Workspace - Classroom Activity** dashboard monitors Google Classroom activity, including course events, roster changes, and assignment operations. It highlights the most active courses and users, trends events over time, and surfaces membership and coursework changes. Use this dashboard to audit classroom administration, track roster and assignment activity, and understand how Classroom is used.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Classroom-Activity.png')} alt="Google Workspace Classroom Activity" />

### Contacts Activity

The **Google Workspace - Contacts Activity** dashboard monitors Google Contacts activity, including contact mutations and the actions and categories behind them. It quantifies the volume of affected contacts, highlights the most active users, and trends events over time. Use this dashboard to audit contact data changes, surface bulk modifications, and understand how contact information is managed.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Contacts-Activity.png')} alt="Google Workspace Contacts Activity" />

### Context Aware Access Activity

The **Google Workspace - Context Aware Access Activity** dashboard monitors context-aware access decisions, including granted and denied requests, access levels, and denial reasons. It surfaces the most-accessed resources, the top denied users, and outcome trends over time, and maps access denials to source geography. Use this dashboard to validate access policies, investigate repeated denials, and detect access attempts from risky locations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Context-Aware-Access-Activity.png')} alt="Google Workspace Context Aware Access Activity" />

### Directory Sync Activity

The **Google Workspace - Directory Sync Activity** dashboard monitors directory synchronization, including sync outcomes, errors, and the number of records processed. It breaks down sync sources and error codes, highlights the targets most affected by failures, and maps sync errors to source geography. Use this dashboard to troubleshoot sync failures, monitor provisioning volume, and ensure identity data stays consistent across systems.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Directory-Sync-Activity.png')} alt="Google Workspace Directory Sync Activity" />

### Drive Activity

The **Google Workspace - Drive Activity** dashboard monitors Google Drive file activity, including access, downloads, and external sharing across the organization. It breaks down document types and sharing visibility, highlights the top users and most-active documents, and maps activity to source geography. Use this dashboard to detect external data sharing, investigate downloads of sensitive files, and audit Drive usage from risky locations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Drive-Activity.png')} alt="Google Workspace Drive Activity" />

### Gemini Feature Adoption

The **Google Workspace - Gemini Feature Adoption** dashboard analyzes how Gemini features are adopted and engaged with across Workspace apps. It trends feature usage over time, breaks activity down by app and feature, and compares active versus inactive engagement while surfacing abandoned features. Use this dashboard to measure feature-level adoption, identify the most and least used capabilities, and prioritize enablement efforts.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Gemini-Feature-Adoption.png')} alt="Google Workspace Gemini Feature Adoption" />

### Gemini Usage Overview

The **Google Workspace - Gemini Usage Overview** dashboard monitors adoption of Gemini in Workspace apps, including overall event volume, usage by Workspace app, and active users. It breaks down engagement categories, trends usage over time, and maps activity to source geography. Use this dashboard to measure Gemini adoption, identify the most engaged users and apps, and spot unusual usage patterns.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Gemini-Usage-Overview.png')} alt="Google Workspace Gemini Usage Overview" />

### Gmail Activity

The **Google Workspace - Gmail Activity** dashboard monitors Gmail message delivery across the organization, including SMTP responses and delivery outcomes. It highlights the top senders and most common subjects, breaks down delivery results, and maps email activity to source geography. Use this dashboard to investigate delivery issues, surface anomalous sending patterns, and review mail activity from risky locations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Gmail-Activity.png')} alt="Google Workspace Gmail Activity" />

### Keep Activity

The **Google Workspace - Keep Activity** dashboard monitors Google Keep note activity, including note actions, trashed or deleted notes, and the client applications used. It highlights the most active users and notes, breaks activity down by category, and trends events over time. Use this dashboard to audit note changes, surface bulk deletions, and understand how Keep is used across the organization.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Keep-Activity.png')} alt="Google Workspace Keep Activity" />

### LDAP Activity

The **Google Workspace - LDAP Activity** dashboard monitors Secure LDAP access requests across your organization, including granted and denied access, access levels, and failure reasons. It surfaces the top LDAP clients and the most-denied identities, trends access outcomes over time, and maps activity and denials to source geography. Use this dashboard to investigate authentication failures, detect brute-force or credential-stuffing attempts, and audit which clients and identities are accessing directory data.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-LDAP-Activity.png')} alt="Google Workspace LDAP Activity" />

### Login Activity

The **Google Workspace - Login Activity** dashboard monitors user sign-in activity, including successful logins, failures, and suspicious sign-in challenges. It breaks down login types, trends authentication over time, and maps logins to source geography while highlighting brute-force and unusual-location indicators. Use this dashboard to investigate account compromise, detect credential-stuffing attempts, and review sign-in patterns across the organization.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Login-Activity.png')} alt="Google Workspace Login Activity" />

### Meet Activity

The **Google Workspace - Meet Activity** dashboard monitors Google Meet conference activity, including meetings, participants, and presentation events. It breaks down participant identifier types, surfaces the most active meetings and users, and provides per-meeting event breakdowns. Use this dashboard to audit meeting participation, investigate external or anomalous conference activity, and understand collaboration patterns across Meet.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Meet-Activity.png')} alt="Google Workspace Meet Activity" />

### Mobile Activity

The **Google Workspace - Mobile Activity** dashboard monitors mobile and endpoint device activity, including device events, operating-system versions, and device models. It highlights outdated-OS compliance, the applications syncing corporate data, and device event trends over time. Use this dashboard to assess device compliance, identify out-of-date or non-compliant endpoints, and audit device and sync activity across the fleet.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Mobile-Activity.png')} alt="Google Workspace Mobile Activity" />

### Profile Activity

The **Google Workspace - Profile Activity** dashboard monitors changes to user profile fields, including the fields modified and the type of mutation. It distinguishes user- and admin-initiated changes, highlights profile deletions and the most active users, and trends activity over time. Use this dashboard to audit profile data changes, detect unexpected deletions, and review who is modifying user profiles.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Profile-Activity.png')} alt="Google Workspace Profile Activity" />

### Rules Activity

The **Google Workspace - Rules Activity** dashboard monitors DLP and security rule triggers across your environment, including severity distribution and the most frequently triggered rules. It surfaces the users and resources driving triggers, trends rule activity over time, and maps high-severity triggers to source geography. Use this dashboard to prioritize incident response by severity, identify noisy or high-risk rules, and detect policy violations originating from risky locations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Rules-Activity.png')} alt="Google Workspace Rules Activity" />

### SAML Activity

The **Google Workspace - SAML Activity** dashboard monitors SAML single sign-on authentication to third-party applications, including successful and failed logins and SAML status codes. It highlights per-application failures and the users and apps driving them, and maps login activity to source geography. Use this dashboard to troubleshoot SSO failures, detect authentication anomalies, and review sign-in activity from risky locations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-SAML-Activity.png')} alt="Google Workspace SAML Activity" />

### Takeout Activity

The **Google Workspace - Takeout Activity** dashboard monitors Google Takeout data exports, including takeout events and the products being exported. It correlates initiators with target users to reveal who is exporting whose data, trends exports over time, and maps export activity to source geography. Use this dashboard to gain data-exfiltration visibility, detect exports of other users' data, and flag risky export activity.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Takeout-Activity.png')} alt="Google Workspace Takeout Activity" />

### Task Activity

The **Google Workspace - Task Activity** dashboard monitors Google Tasks activity, including task mutations, event outcomes, and the host products that initiate them. It highlights the top users and task owners, trends events over time, and maps activity to source geography. Use this dashboard to audit task changes, surface failed operations, and understand how tasks are created and modified across connected products.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Task-Activity.png')} alt="Google Workspace Task Activity" />

### Token Activity

The **Google Workspace - Token Activity** dashboard monitors OAuth token activity, including third-party application authorizations and revocations and the scopes being requested. It breaks down client types, highlights the most-authorized applications, and maps consent activity to source geography. Use this dashboard to review third-party app access, detect over-privileged or risky scope grants, and investigate consent activity from unusual locations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Token-Activity.png')} alt="Google Workspace Token Activity" />

### User Accounts Activity

The **Google Workspace - User Accounts Activity** dashboard monitors account-security activity, including recovery information changes, password resets, and two-step verification changes. It tracks account status, highlights the most affected users, and maps account changes to source geography. Use this dashboard to detect account-takeover indicators, audit recovery and MFA changes, and flag account modifications from risky locations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-User-Accounts-Activity.png')} alt="Google Workspace User Accounts Activity" />

### Vault Activity

The **Google Workspace - Vault Activity** dashboard monitors Google Vault eDiscovery activity, including document views, searches, exports, and downloads across legal matters. It highlights the most-accessed matters, the top users, and export or download activity that may indicate data exfiltration, and maps Vault access to source geography. Use this dashboard to audit privileged eDiscovery access, correlate users with matters, and flag risky or unusual Vault activity.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GoogleWorkspaceActivities/Google-Workspace-Vault-Activity.png')} alt="Google Workspace Vault Activity" />

## Create monitors for Google Workspace Activities app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Google Workspace Activities alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition |
| :-- | :-- | :-- | :-- |
| `Google Workspace Activities - Activity from Embargoed Geo Locations` | This alert is triggered when any activity originates from an embargoed or high-risk country. | Critical | Count > 0 |
| `Google Workspace Activities - Drive Files Shared Externally` | This alert is triggered when Drive documents are shared outside the organization. | Critical | Count > 4 |
| `Google Workspace Activities - Excessive SAML Login Failures` | This alert is triggered when a user accumulates repeated SAML SSO login failures in a short window. | Critical | Count > 4 |
| `Google Workspace Activities - High or Critical Severity` | This alert is triggered when a Google Workspace security rule fires for High or Critical severity. | Critical | Count > 0 |
| `Google Workspace Activities - Repeated LDAP Access Denials` | This alert is triggered on a burst of Secure LDAP access denials from a client or identity. | Critical | Count > 4 |
| `Google Workspace Activities - Two Step Verification Disabled` | This alert is triggered when 2-Step Verification is turned off or disabled for a user. | Critical | Count > 0 |

## Upgrading/Downgrading the Google Workspace Activities app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Google Workspace Activities app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
