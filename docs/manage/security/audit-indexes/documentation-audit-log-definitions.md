---
id: documentation-audit-log-definitions
title: Documentation for Audit Log Definitions
sidebar_label: Documentation
description: Audit Log Definitions are documentation of audited events, and are hosted on each deployment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

All available audit log events are documented for your reference on each deployment. Select the documentation link for your deployment.  

Sumo Logic has several deployments that are assigned depending on the geographic location and the date an account is created. See [how to determine which endpoint to use](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security "Sumo Logic Endpoints and Firewall Security") if you are unsure.

:::important
To see documentation for system events, when you click one of the links below, in the left margin scroll down to the **SUMOLOGIC_SYSTEM_EVENTS** section. For more information about system events, see [System Event Index](/docs/manage/security/audit-indexes/system-event-index/).
:::

### General audit log definitions

| Deployment | Documentation URL |
|:--|:--|
| AU | https://service.au.sumologic.com/audit/docs |
| CA | https://service.ca.sumologic.com/audit/docs |
| DE | https://service.de.sumologic.com/audit/docs |
| EU | https://service.eu.sumologic.com/audit/docs |
| FED | https://service.fed.sumologic.com/audit/docs |
| IN | https://service.in.sumologic.com/audit/docs |
| JP | https://service.jp.sumologic.com/audit/docs |
| US1 | https://service.sumologic.com/audit/docs |
| US2 | https://service.us2.sumologic.com/audit/docs |

### Cloud SIEM audit log definitions

| Deployment | Location | Documentation URL |
|:--|:--|:--|
| AU | Australia |https://service.au.sumologic.com/audit/docs/sec |
| JP | Japan |https://service.jp.sumologic.com/audit/docs/sec |
| IN | India |https://service.in.sumologic.com/audit/docs/sec |
| US1 | United States |https://service.sumologic.com/audit/docs/sec |
| US2 | United States |https://service.us2.sumologic.com/audit/docs/sec |

:::note
For more information about audit logging for Cloud SIEM, see [Cloud SIEM Audit Logging](/docs/cse/administration/cse-audit-logging/).
:::

### Automation Service and Cloud SOAR audit log definitions

| Deployment | Documentation URL |
|:--|:--|
| AU | https://service.au.sumologic.com/audit/docs/csoar |
| CA | https://service.ca.sumologic.com/audit/docs/csoar |
| DE | https://service.de.sumologic.com/audit/docs/csoar |
| EU | https://service.eu.sumologic.com/audit/docs/csoar |
| IN | https://service.in.sumologic.com/audit/docs/csoar |
| JP | https://service.jp.sumologic.com/audit/docs/csoar |
| US1 | https://service.sumologic.com/audit/docs/csoar |
| US2 | https://service.us2.sumologic.com/audit/docs/csoar |

<!--
// Add FED as soon as available
| FED | https://service.fed.sumologic.com/audit/docs/csoar |
-->

:::note
Audit logging for the Automation Service uses the same logging as Cloud SOAR, since the Automation Service is based on core functionality in Cloud SOAR. For more information, see [Audit Logging for the Automation Service and Cloud SOAR](/docs/platform-services/automation-service/automation-service-audit-logging/).
:::
