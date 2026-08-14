---
id: okta
title: Okta
sidebar_label: Okta
description: The Sumo Logic app for Okta provides visibility into authentication, policy management, user lifecycle events, and threat indicators from Okta system logs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saml/okta.png')} alt="Okta icon" width="75"/>

Okta provides secure identity management and access control between users and applications on any device. The Sumo Logic app for Okta offers comprehensive visibility into identity, access, and authentication activity by analyzing Okta system logs. The app includes dashboards that consolidate policy management, user activity, lifecycle events, and threat detection to support compliance, investigation, and continuous improvement in security posture.

## Log types

The Sumo Logic collector uses the Okta API to collect two types of logs:

- **System logs**. Collected via the Okta System Log API. The log types include authentication, events, and actions. For more information, see the [Okta System Log API](https://developer.okta.com/docs/api/resources/system_log.html).
- **User logs**. Collected via the [Okta Users API](https://developer.okta.com/docs/reference/api/users/) and [User Groups API](https://developer.okta.com/docs/reference/api/users/#get-user-s-groups). Includes user profile data, group membership, account status, and credential information.

### Sample log messages

<details>
<summary>System Log</summary>

```json
{
   "actor":{
      "id":"00u17b6c3rwVP7kqo1d8",
      "type":"User",
      "alternateId":"kyle.diedrich@company.com",
      "displayName":"Kyle Diedrich",
      "detailEntry":null
   },
   "client":{
      "userAgent":{
         "rawUserAgent":"PostmanRuntime/3.0.11-hotfix.2",
         "os":"Unknown",
         "browser":"UNKNOWN"
      },
      "zone":"null",
      "device":"Unknown",
      "id":null,
      "ipAddress":"12.97.85.90",
      "geographicalContext":{
         "city":"San Francisco",
         "state":null,
         "country":"United States",
         "postalCode":"94107",
         "geolocation":{
            "lat":37.7697,
            "lon":-122.3933
         }
      }
   },
   "authenticationContext":{
      "authenticationProvider":null,
      "credentialProvider":null,
      "credentialType":null,
      "issuer":null,
      "interface":null,
      "authenticationStep":0,
      "externalSessionId":"trsp5PU7OIoTgCOdFBgJOQWIA"
   },
   "displayMessage":"Delete application",
   "eventType":"application.lifecycle.delete",
   "outcome":{
      "result":"SUCCESS",
      "reason":null
   },
   "published":"2017-10-02T17:38:45+0000",
   "securityContext":{
      "asNumber":null,
      "asOrg":null,
      "isp":null,
      "domain":null,
      "isProxy":null
   },
   "severity":"INFO",
   "debugContext":{
      "debugData":{
         "requestUri":"/api/v1/apps/0oa1alyz0mr8M2MoG1d8"
      }
   },
   "legacyEventType":"app.generic.config.app_deleted",
   "transaction":{
      "type":"WEB",
      "id":"WRzO-wWGVlYAavrUTHqwcgAABsA",
      "detail":{ }
   },
   "uuid":"49916412-d679-4285-b3e0-d740c73e4999",
   "version":"0",
   "request":{
      "ipChain":[
         {
            "ip":"12.97.85.90",
            "geographicalContext":{
               "city":"San Francisco",
               "state":null,
               "country":"United States",
               "postalCode":"94107",
               "geolocation":{
                  "lat":37.7697,
                  "lon":-122.3933
               }
            },
            "version":"V4",
            "source":null
         },
         {
            "ip":"54.235.68.72",
            "geographicalContext":{
               "city":"Ashburn",
               "state":null,
               "country":"United States",
               "postalCode":"20149",
               "geolocation":{
                  "lat":39.0481,
                  "lon":-77.4728
               }
            },
            "version":"V4",
            "source":null
         }
      ]
   },
   "target":[
      {
         "id":"0oa1alyz0mr8M2MoG1d8",
         "type":"AppInstance",
         "alternateId":"Cisco AnyConnect VPN (2)",
         "displayName":"Cisco AnyConnect VPN",
         "detailEntry":null
      }
   ]
}
```

</details>

<details>
<summary>User Logs</summary>

```json
{
  "_groups": [
    {
      "id": "00g1abc123Everyone0x7",
      "profile": {
        "name": "Everyone",
        "description": "All users in your organization"
      }
    },
    {
      "id": "00g1yza567HR0x7",
      "profile": {
        "name": "Human Resources",
        "description": "HR and people operations team"
      }
    },
    {
      "id": "00g1mno345Engineering0x7",
      "profile": {
        "name": "Engineering",
        "description": "Software engineering team"
      }
    },
    {
      "id": "00g1vwx234Finance0x7",
      "profile": {
        "name": "Finance",
        "description": "Finance and accounting team"
      }
    }
  ],
  "_links": {
    "self": {
      "href": "https://globexcorp.okta.com/api/v1/users/00u17m9zau6BuEWNA1d8"
    }
  },
  "activated": "2022-10-19T13:59:47.000Z",
  "created": "2022-10-18T05:59:47.000Z",
  "credentials": {
    "password": {},
    "provider": { "name": "OKTA", "type": "OKTA" },
    "recovery_question": { "question": "What is your mother's maiden name?" }
  },
  "id": "00u17m9zau6BuEWNA1d8",
  "lastLogin": "2023-04-24T13:59:47.000Z",
  "lastUpdated": "2023-02-02T13:59:47.000Z",
  "passwordChanged": "2022-12-29T13:59:47.000Z",
  "profile": {
    "email": "chris.robins@globexcorp.com",
    "firstName": "Christian",
    "lastName": "Robins",
    "login": "chris.robins@globexcorp.com",
    "mobilePhone": "+18735427481",
    "secondEmail": "christian.robins@yahoo.com"
  },
  "status": "ACTIVE",
  "statusChanged": "2022-11-04T13:59:47.000Z",
  "type": { "id": "oty1abc123defaultType0x7" }
}
```

</details>

### Sample queries

```sumo title="Total Events"
_sourceCategory={{Logsdatasource}} actor eventType
| json "uuid","eventType","actor.displayName","actor.type","severity",
 "client.userAgent.rawUserAgent","client.userAgent.os","client.userAgent.browser",
 "client.device","client.geographicalContext.city","client.geographicalContext.state",
 "client.geographicalContext.country","outcome.result","securityContext.isp"
  as uuid,event_type,actor_name,actor_type,severity,user_agent,os,browser, device,city,state,country,result,isp nodrop

// Global filters
| where if("{{event_type}}" = "*", true,event_type matches "{{event_type}}")
| where if("{{okta_user}}" = "*", true, actor_name matches "{{okta_user}}")
| where if("{{actor_type}}" = "*", true, actor_type matches "{{actor_type}}")
| where if("{{severity}}" = "*", true, severity matches "{{severity}}")
| where if("{{user_agent}}" = "*", true, user_agent matches "{{user_agent}}")
| where if("{{device}}" = "*", true, device matches "{{device}}")
| where if("{{os}}" = "*", true, os matches "{{os}}")
| where if("{{browser}}" = "*", true, browser matches "{{browser}}")
| where if("{{city}}" = "*", true, city matches "{{city}}")
| where if("{{country}}" = "*", true, country matches "{{country}}")
| where if("{{state}}" = "*", true, state matches "{{state}}")
| where if("{{result}}" = "*", true, result matches "{{result}}")
| where if("{{internet_service_provider}}" = "*", true, isp matches "{{internet_service_provider}}")

// Panel specific
| count by uuid
| count 
```


```sumo title="Risky Events Details"
_sourceCategory={{Logsdatasource}} actor eventType securityContext risk level HIGH
| json "uuid","eventType","actor.displayName","actor.type","severity", "client.userAgent.rawUserAgent","client.userAgent.os","client.userAgent.browser","client.device","client.geographicalContext.city","client.geographicalContext.state",
"client.geographicalContext.country","outcome.result","securityContext.isp","published","target.[*].type","securityContext.risk.detectionName","securityContext.risk.issuer","securityContext.risk.level","securityContext.risk.previousLevel","securityContext.risk.reasons"
  as uuid,event_type,actor_name,actor_type,severity,user_agent,os,browser,device,city,state,country,result,isp,published,target_type,risk_detection_name,risk_issuer,risk_level,risk_previous_level,risk_reason nodrop

| where !isBlank(risk_level) AND risk_level = "HIGH"

// Global filters
| where if("{{event_type}}" = "*", true,event_type matches "{{event_type}}")
| where if("{{okta_user}}" = "*", true, actor_name matches "{{okta_user}}")
| where if("{{actor_type}}" = "*", true, actor_type matches "{{actor_type}}")
| where if("{{severity}}" = "*", true, severity matches "{{severity}}")
| where if("{{user_agent}}" = "*", true, user_agent matches "{{user_agent}}")
| where if("{{device}}" = "*", true, device matches "{{device}}")
| where if("{{os}}" = "*", true, os matches "{{os}}")
| where if("{{browser}}" = "*", true, browser matches "{{browser}}")
| where if("{{city}}" = "*", true, city matches "{{city}}")
| where if("{{country}}" = "*", true, country matches "{{country}}")
| where if("{{state}}" = "*", true, state matches "{{state}}")
| where if("{{result}}" = "*", true, result matches "{{result}}")
| where if("{{internet_service_provider}}" = "*", true, isp matches "{{internet_service_provider}}")

// Panel specific
| count by published, uuid, event_type,actor_name,actor_type,severity,user_agent,os,browser,device,city,state,country,result,isp,target_type,risk_detection_name, risk_issuer, risk_level, risk_previous_level, risk_reason
| count by published, event_type, actor_name, actor_type, severity, user_agent, os, browser, device, city, state, country, result, isp, target_type, risk_detection_name, risk_issuer, risk_level, risk_previous_level, risk_reason
| sort by published
| fields -_count
| limit 1000
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Okta](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/okta-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Okta app is properly integrated and configured to collect and analyze your Okta data.
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

## Viewing the Okta dashboards​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Application Activity Overview

The **Okta - Application Activity Overview** dashboard provides visibility into all application access events within your Okta environment. It tracks authentication outcomes, application usage trends, and lifecycle changes, highlighting top and frequently denied applications, as well as outlier access behaviors. This view enables administrators to monitor how users interact with enterprise applications and quickly identify anomalous or risky sign‑on patterns.

<img src={useBaseUrl('img/integrations/saml/Okta-Application-Activity-Overview.png')} alt="Okta - Application Activity Overview dashboard" />


### Events Overview

The **Okta - Events Overview** dashboard delivers a unified view of all Okta system events across users, applications, and policies. It visualizes event counts, severities, geographic distribution, and temporal patterns to surface spikes or anomalies. This dashboard serves as the central health and activity indicator, helping security teams monitor the overall state of Okta operations and environmental risk.

<img src={useBaseUrl('img/integrations/saml/Okta-Events-Overview.png')} alt="Okta - Events Overview dashboard" />

### Failed Login Activity

The **Okta - Failed Login Activity** dashboard focuses on failed authentication events to help identify patterns of login issues or possible attack attempts. It showcases top failed users, failure reasons, and trends by severity and location. This dashboard aids in diagnosing access issues, monitoring brute‑force attempts, and improving authentication reliability.

<img src={useBaseUrl('img/integrations/saml/Okta-Failed-Login-Activity.png')} alt="Okta - Failed Login Activity dashboard" />

### Identity and Policy Management

The **Okta - Identity and Policy Management** dashboard monitors identity governance and policy enforcement within the organization. It analyzes policy activity, access control changes, and account lifecycle events to identify misconfigurations or risky policy actions. Ideal for compliance and IAM administrators, it supports audits, reporting, and continuous assessment of access policy alignment.

<img src={useBaseUrl('img/integrations/saml/Okta-Identity-and-Policy-Management.png')} alt="Okta - Identity and Policy Management dashboard" />

### Successful Login Activity

The **Okta - Successful Login Activity** dashboard provides insights into legitimate user authentication behavior. It displays successful login trends across users, geographies, browsers, and devices while identifying outlier or embargoed geographic access. This helps teams understand normal authentication baselines and ensure authorized usage patterns.

<img src={useBaseUrl('img/integrations/saml/Okta-Successful-Login-Activity.png')} alt="Okta - Successful Login Activity dashboard" />

### Threat Detection and Protection

The **Okta - Threat Detection and Protection** dashboard consolidates all threat‑related event data, providing visibility into detected security incidents, suspicious activities, and credential breaches. It classifies threats by type, severity, and target entity to support rapid identification and response. This view strengthens proactive threat detection and enables continuous protection monitoring across the Okta environment.

<img src={useBaseUrl('img/integrations/saml/Okta-Threat-Detection-and-Protection.png')} alt="Okta - Threat Detection and Protection dashboard" />

### User Account, Lifecycle and Activity

The **Okta - User Account, Lifecycle and Activity** Monitoring dashboard tracks user lifecycle events, administrative actions, and risky account behaviors. It highlights suspended or reactivated accounts, frequent updates, and high‑risk users to aid in compliance and anomaly detection. This dashboard is instrumental in maintaining account hygiene, monitoring privileged accounts, and auditing user access changes.

<img src={useBaseUrl('img/integrations/saml/Okta-User-Account-Lifecycle-and-Activity-Monitoring.png')} alt="Okta - User Account, Lifecycle and Activity dashboard" />

### User and Groups Details

The **Okta - User and Groups Details** dashboard offers a comprehensive inventory view of users, groups, and authentication providers. It reports user counts by status, provider, and group membership, helping administrators maintain accurate identity records. This dashboard is useful for IAM operations, provisioning validation, and organizational reporting.

<img src={useBaseUrl('img/integrations/saml/Okta-User-and-Groups-Details.png')} alt="Okta - User and Groups Details dashboard" />

### User Authentication and MFA

The **Okta - User Authentication and MFA** dashboard provides a detailed analysis of authentication and multi‑factor authentication events across your environment. It tracks success and failure patterns, MFA bypass attempts, and authentication trends by OS, geography, and target type. Security teams can use this to verify MFA enforcement effectiveness, identify suspicious access attempts, and optimize authentication policy configurations.

<img src={useBaseUrl('img/integrations/saml/Okta-User-Authentication-and-MFA.png')} alt="Okta - User Authentication and MFA dashboard" />


## Create monitors for the Okta app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Okta alerts

| Name | Description | Trigger Type | Alert Condition |
|:--|:--|:--|:--|
| `Okta - Credential Breach Event Detected` | Monitor triggers an alert whenever Okta reports that a user’s credentials have appeared in a known public data breach, indicating a potential account compromise. This monitor enables security teams to respond quickly by enforcing password resets, notifying affected users, and investigating any suspicious activity to prevent unauthorized access and protect organizational data. | Critical | Count > 0 |
| `Okta - Events from Embargoed Geo Locations` | This monitor detects Okta events originating from countries or regions subject to government-imposed embargoes or organizational geo-access restrictions. The activity may span across user logins, application access, and administrative actions. Such events may indicate a compliance policy violation, compromised credentials, or the use of a VPN or proxy to bypass geographic access controls. | Critical | Count > 0 |
| `Okta - Malicious IP Request Detected by ThreatInsight` | This monitor detects Okta ThreatInsight events signaling inbound requests from malicious IPs involved in brute‑force or password‑spray activity, helping identify and block credential‑based attacks. | Critical | Count > 0 |
| `Okta - Multiple Failed Logins From User` | This monitor detects multiple failed login attempts from a single user within a short period, helping identify potential brute‑force attacks, account lockouts, or use of compromised credentials. | Critical | Count > 5 |
| `Okta - Repeated Authentication Failures Detected` | This monitor detects a surge in authentication failures occurring across multiple user accounts within a defined time window. The activity may indicate a coordinated credential stuffing campaign, automated attack tooling, or a widespread access disruption affecting the organization. Such patterns warrant immediate investigation to assess the scope and origin of the failures. | Critical | Count > 5 |
| `Okta - Risky Event Detected` | Monitor triggers when potentially suspicious or high‑risk activity is identified within the Okta environment based on contextual risk signals and security indicators. It enables security teams to promptly investigate unusual behaviors such as anomalous login attempts, elevated risk levels, or other threat-related events to reduce the likelihood of account compromise and unauthorized access. | Critical | Count > 0 |
| `Okta - Suspicious Activity Self-Reported by End User` | This monitor detects user.account.report_suspicious_activity_by_enduser events triggered when an end user explicitly reports suspicious activity on their own Okta account. Such reports may indicate an account takeover attempt, unauthorized session access, or credential phishing targeting the user. Security teams should treat each report as a high-priority signal and initiate immediate account investigation and containment steps. | Critical | Count > 0 |
| `Okta - ThreatInsight Attack Detected` | This monitor triggers when Okta logs a security.attack.start event, indicating that ThreatInsight has detected that the organization is under attack. When this event occurs, ThreatInsight automatically increases its logging and blocking sensitivity for suspicious requests, helping security teams identify and mitigate active threats in real time. | Critical | Count > 0 |
| `Okta - User Risk Level Elevation Detected` | This monitor detects user.risk.detect events triggered when Okta's risk engine identifies that a user is exhibiting behavior or operating within a context associated with elevated risk. The risk signal may be based on anomalous activity patterns, suspicious contextual signals, or known threat indicators. Security teams should investigate flagged accounts and consider enforcing step-up authentication, session termination, or temporary account suspension as appropriate. | Critical | Count > 0 |

## Upgrade/Downgrade the Okta app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Okta app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>