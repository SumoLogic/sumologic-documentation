---
id: role-capabilities
title: Role Capabilities
description: Assign any of these capabilities when you create user roles.
---

import ApiCreateRole from '../../../reuse/api-create-role.md';

Following are the capabilities you can assign when you [create roles](create-manage-roles.md). 

:::note
If you use the [createRoleV2 API](https://api.sumologic.com/docs/#operation/createRoleV2) to create a role, enter the corresponding role capability value in the `capabilities` parameter of the API as indicated in the tables below.
:::

## Data Management

| Capability | Description | <ApiCreateRole/> |
| :-- | :-- | :-- |
| View Collectors | View collectors and sources that have already been installed or added. | `viewCollectors` |
| Manage Collectors | [View and manage](/docs/send-data) installed and hosted collectors as well as sources. | `manageCollectors` |
| Manage Ingest Budgets |Allows you to manage [ingest budgets](/docs/manage/ingestion-volume/ingest-budgets). Enabling this will automatically enable the Manage Collectors capability. The Manage Collectors capability on its own permits the re-assignment of budgets to different collectors, but not creating or deleting them. | `manageBudgets` |
| Manage Data Volume Feed|Enable and manage the [data volume index](/docs/manage/ingestion-volume/data-volume-index) for your account to avoid exceeding your data limits, and to determine when you need to upgrade your account. | `manageDataVolumeFeed` |
| View Field Extraction Rules | View [field extraction rules](/docs/manage/field-extractions/create-field-extraction-rule), which accelerate your search process by automatically parsing fields as log messages are ingested. | `viewFieldExtraction` |
| View Fields | View [fields](/docs/manage/fields), which are custom metadata fields you can assign to logs. | `viewFields` |
| Manage Fields | Manage fields. Note that if you grant a role the Manage Fields capability, users with that role will also have the View Fields and View Field Extraction Rules capabilities. | `manageFields` |
| Manage Field Extraction Rules | Manage [field extractions](/docs/manage/field-extractions), which speed the search process by automatically parsing fields as log messages are ingested. Note that if you grant a role the Manage Field Extraction Rules capability, users with that role will also have the Manage Fields, View Fields, and View Field Extraction Rules capabilities. | `manageFieldExtractionRules` |
| Manage S3 Data Forwarding| Manage [S3 data forwarding](/docs/manage/data-forwarding/forward-data-from-sumologic) from Sumo Logic to an S3 bucket. | `manageS3DataForwarding` |
| Manage Content| Manage the content for your organization. This provides access to [Admin Mode](/docs/manage/content-sharing/admin-mode) in the Library. | `manageContent` |
| Manage Apps |Install and manage [apps](/docs/integrations). | `manageApps` |
| Manage Connections | Manage the [connections](/docs/alerts/webhook-connections/) that allow you to send alerts to other tools. | `manageConnections` |
| View Connections | View [connections](/docs/alerts/webhook-connections/) on the **Connections** page. | `viewConnections` |
| View Views | [View Scheduled Views](/docs/manage/scheduled-views). | `viewScheduledViews` |
| Manage Views | View, create, edit, and delete Scheduled Views. Note that if you grant a role the Manage Scheduled Views capability, users with that role will also have View Scheduled Views capability. | `manageScheduledViews` |
| View Partitions | View [partitions](/docs/manage/partitions). | `viewPartitions` |
| Manage Partitions | View, create, edit, and delete partitions. Note that if you grant a role the Manage Partitions capability, users with that role will also have View Partitions and Manage S3 Data Forwarding capabilities. | `managePartitions` |
| View Account Overview| View the Account Overview page. | `viewAccountOverview` |
| Manage Tokens | Manage [Installation Tokens](/docs/manage/security/installation-tokens). | `manageTokens` |
| View Parsers | View [parsers](/docs/cse/schema/parser-editor). | `viewParsers` |
| Download Search Results | [Export log query results](/docs/search/get-started-with-search/search-basics/export-search-results) to a .csv file. | `downloadSearchResults` | 
| Access Data Volume Index | Access the [`sumologic_volume` index](/docs/metrics/metrics-dpm/#query-the-sumologic_volume-index). | `dataVolumeIndex` |

<!-- Beta features to be added to Data Management
| Manage Data Streams | ? | `manageDataStreams` |
| View Data Streams | ? | `viewDataStreams` |
| View Deletion Requests | View [deletion requests](/docs/manage/deletion-requests/).| `listDeletionRules` |
| Manage Deletion Requests | Manage deletion requests. | `createDataDeletionRule` |
| Review Deletion Requests | Provide reviews of deletion requests. | `getDataDeletionRule` |
-->

## Entity Management

| Capability | Description | <ApiCreateRole/> |
| :-- | :-- | :-- |
| Manage Entity Type Configs | Reserved for internal use. | `manageEntityTypeConfig` |

## Metrics

| Capability | Description | Corresponding value in the *capabilities* field of the [createRoleV2 API](https://api.sumologic.com/docs/#operation/createRoleV2) |
| :-- | :-- | :-- |
| Manage Metrics Transformation Rules | Create, edit, or delete [metrics transformation rules](/docs/metrics/metrics-transformation-rules). | `metricsTransformation` |
| Manage Logs-to-Metrics | Create, edit, or delete [Logs-to-Metrics](/docs/metrics/logs-to-metrics) rules. | `metricsExtraction` |
| Manage Metrics Rules | Create, edit, or delete [metrics rules](/docs/metrics/metric-rules-editor/). | `metricsRules` |

## Security

| Capability | Description | <ApiCreateRole/> |
| :-- | :-- | :-- |
| Manage Password Policy|Set the password policy for your Sumo Logic account. | `managePasswordPolicy` |
|Allowlist IP Addresses | [Explicitly grant access](/docs/manage/security/create-allowlist-ip-cidr-addresses) to specific IP addresses or address ranges. | `ipAllowlisting` |
| Create Access Keys | Create your own [access keys](/docs/manage/security/access-keys/). | `createAccessKeys` |
| Manage Access Keys |Set up, activate, deactivate, or delete access keys for your organization. | `manageAccessKeys` |
| Manage Support Account Access |Enable management of the Sumo Logic [support account](/docs/manage/security/enable-support-account) for your organization. | `manageSupportAccountAccess` |
| Manage Audit Data Feed|Enable and manage the [Audit Index](/docs/manage/security/audit-indexes/audit-index), which provides information on internal events. | `manageAuditDataFeed` |
| Manage SAML|Provision and manage [SAML](/docs/manage/security/saml) for single sign-on. | `manageSAML` |
| Manage Share Dashboards Outside Organization | [Share a dashboard](/docs/dashboards/share-dashboard-outside-org/) with users who do not have Sumo Logic access. | `shareDashboardOutsideOrg` |
| Manage Organization Settings | Configure concurrent session limits and the Data Access Level for Shared Dashboards security policy. | `manageOrgSettings` |
|Change Data Access Level|Change the [data access level](/docs/dashboards/set-data-access-level/) of dashboards or scheduled searches. | `changeDataAccessLevel` |

## Dashboards

| Capability | Description | <ApiCreateRole/> |
| :-- | :-- | :-- |
| Share Dashboards with the World | [Share dashboards](/docs/dashboards/share-dashboard-outside-org) in view-only mode with no login required. | `shareDashboardWorld` |
| Share Dashboards with the Allowlist | [Share dashboards](/docs/dashboards/share-dashboard-new/) in view-only mode; viewers must be on your service allowlist. | `shareDashboardAllowlist` |

## User Management

| Capability | Description | <ApiCreateRole/> |
| :-- | :-- | :-- |
| Manage Users And Roles | Access the UI pages to manage [users](/docs/manage/users-roles/users) and [roles](/docs/manage/users-roles/roles). | `manageUsersAndRoles` |

## Audit Event Management

| Capability | Description | <ApiCreateRole/> |
| :-- | :-- | :-- |
| Access Search Audit Events | View and download audit logs of search queries executed in the UI. | `searchAuditIndex` |
| Access Audit Events | View and download audit logs of admin and config events. | `auditEventIndex` |

## Automation Service

| Capability | Description | <ApiCreateRole/> |
| :-- | :-- | :-- |
| Task View | See tasks in [playbooks](/docs/platform-services/automation-service/playbooks/). | `cloudSoarIncidentTaskView` |
| Task Access | Access your tasks in playbooks. | `cloudSoarIncidentTaskAccess` |
| Task Access All| Access all user tasks in playbooks. | `cloudSoarIncidentTaskAccessAll` |
| Task Edit| Configure tasks in playbooks. | `cloudSoarIncidentTaskEdit` |
| Task Reassign | Assign tasks in playbooks to users. | `cloudSoarIncidentTaskReassign` |
| App Central Access | View [App Central](/docs/platform-services/automation-service/automation-service-app-central/). | `cloudSoarAppCentralAccess` |
| App Central Export | Export integrations and playbooks from App Central. | `cloudSoarAppCentralExport` |
| Integrations Access | View [integrations](/docs/platform-services/automation-service/automation-service-integrations/). | `cloudSoarIntegrationsAccess` |
| Integrations Configure| Create and edit integrations. | `cloudSoarIntegrationsConfigure` |
| Playbooks Access | View playbooks. | `cloudSoarPlaybooksAccess` |
| Playbooks Configure| Create and edit playbooks. | `cloudSoarPlaybooksConfigure` |
| Bridge Monitoring Access |Monitor Bridge operations. | `cloudSoarBridgeMonitoringAccess` |
| Observability Access | Access automation in the SaaS Log UI. | `cloudSoarObservabilityAccess` |
| Observability Configure | Create and edit automation in the Sumo Logic SaaS Log Analytics Platform. | `cloudSoarObservabilityManagement` |

## Alerting

| Capability | Description | <ApiCreateRole/> |
| :-- | :-- | :-- |
| View Monitors |If folder perms are enabled, view folders & monitors you have access to. | `viewMonitorsV2` |
| Manage Monitors | Create folders & monitors, grant perms, and (with folder perms) full CRUD on folders you control. | `manageMonitorsV2` |
|Admin Monitors |With folder perms, full CRUD & grant on all folders & monitors. | `adminMonitorsV2` |
| View Alerts | View alerts on the [Alert page](/docs/alerts/monitors/alert-response). | `viewAlerts` |
| View Muting Schedules | View [Muting Schedules](/docs/alerts/monitors/muting-schedules). | `viewMutingSchedules` |
| Manage Muting Schedules | Create, edit, and delete Muting Schedules. | `manageMutingSchedules` |

<!-- 
## Open Analytics

| Capability | Description | <ApiCreateRole/> |
| :-- | :-- | :-- |
| Manage Open Analytics Endpoint | ? | ? |
-->

## Usage Management

| Capability | Description | <ApiCreateRole/> |
| :-- | :-- | :-- |
| View Usage Management | View [usage management](/docs/manage/manage-subscription/scan-budgets/). | `viewUsageManagement` |
| Manage Usage Management | Manage usage management. | `manageBudgets` |

## Reliability Management

| Capability | Description | <ApiCreateRole/> |
| :-- | :-- | :-- |
| View SLOs | View [Service Level Objectives (SLOs)](/docs/observability/reliability-management-slo/create-slo/). | `viewSlos` |
| Manage SLOs | Create, edit, and delete SLOs. | `manageSlos` |

## Threat Intel

| Capability | Description | <ApiCreateRole/> |
| :-- | :-- | :-- |
| View Threat Intel Data Store | View the [Threat Intelligence](/docs/security/threat-intelligence/about-threat-intelligence/) tab. | `viewThreatIntelDataStore` |
| Manage Threat Intel Data Store | Create, edit, and delete threat intel sources. | `manageThreatIntelDataStore` |

## Macros

| Capability | Description | <ApiCreateRole/> |
| :-- | :-- | :-- |
| Manage Macros | Manage [macros](/docs/manage/macro/). |  |


<!-- beta feature
## Data Masking

| Capability | Description | <ApiCreateRole/> |
| :-- | :-- | :-- |
| View Unmasked Data | ? | ? |
-->

## Organizations

| Capability | Description | <ApiCreateRole/> |
| :-- | :-- | :-- | 
| View Organizations | View the [Organizations](/docs/manage/manage-subscription/create-and-manage-orgs/create-manage-orgs) UI. | `viewOrganizations` |
| Create Organizations | Create and provision child organizations. | `createOrganizations` |
| Change Credits Allocation | Change the credits allocation for a child organization. | `changeCreditsAllocation` |
| Create Trial Organizations | Create trial organizations (Service Providers only). | `createTrialOrganizations` |
| Upgrade Trial Organizations | Upgrade trial organizations (Service Providers only). | `upgradeTrialOrganizations` |
| Deactivate Organizations | Deactivate trial organizations (Service Providers only). | `deactivateOrganizations` |
| Manage Organizations | Create, edit, and delete organizations. | `manageOrganizations` |

## Cloud SOAR

[Cloud SOAR](/docs/cloud-soar/) capabilities appear in the roles UI only if Cloud SOAR has been enabled for your account.

:::info
This section is for our Cloud SOAR SaaS version. If you have a legacy Cloud SOAR instance URL matching the pattern `*.soar.sumologic.com`, see [Legacy Cloud SOAR](#legacy-cloud-soar).
:::

| Capability category | Capability | Description| <ApiCreateRole/> |
| :-- | :-- | :-- |:--|
|View Cloud SOAR||Show “Cloud SOAR” link in nav.| `viewCloudSoar`|
|Incident|View|View all [incidents](/docs/cloud-soar/incidents-triage/).|`cloudSoarIncidentView`|
|Incident|Access|Access your incidents.|`cloudSoarIncidentAccess`|
|Incident|Access All|Access all incidents.|`cloudSoarIncidentAccessAll`|
|Incident|Edit|Create, edit, delete incidents.|`cloudSoarIncidentEdit`|
|Incident|Bulk Operations|Manage incident bulk operations.|`cloudSoarIncidentBulkOperations`|
|Incident|Manage Investigators|Assign/remove investigators.|`cloudSoarIncidentManageInvestigators`|
|Incident|Change Ownership|Change incident ownership.|`cloudSoarIncidentChangeOwnership`|
|Triage|View|View all [triage](/docs/cloud-soar/incidents-triage/).|`cloudSoarIncidentTriageView`|
|Triage|Access|Access your triage events.|`cloudSoarIncidentTriageAccess`|
|Triage|Access All|Access all triage events.|`cloudSoarIncidentTriageAccessAll`|
|Triage|Change Ownership|Change triage ownership.|`cloudSoarIncidentTriageChangeOwnership`|
|Triage|Edit|Create, edit, delete triage events.|`cloudSoarIncidentTriageEdit`|
|Triage|Bulk Physical Delete|Bulk-delete triage events.|`cloudSoarIncidentTriageBulkPhysicalDelete`|
|Folders|Edit|Create, edit, delete playbook folders.|`cloudSoarIncidentFoldersEdit`|
|Attachments|Access|View attachments.|`cloudSoarIncidentAttachmentsAccess`|
|Attachments|Edit|Create, edit, delete attachments.|`cloudSoarIncidentAttachmentsEdit`|
|Incident Playbook|Access|View playbooks.|`cloudSoarIncidentPlaybooksAccess`|
|Incident Playbook|Edit|Create, edit, delete playbooks.|`cloudSoarIncidentPlaybooksEdit`|
|Incident Playbook|Manage|Manage playbook lifecycle.|`cloudSoarIncidentPlaybooksManage`|
|Note|Access|View notes.|`cloudSoarIncidentNotesAccess`|
|Note|Edit|Create, edit, delete notes.|`cloudSoarIncidentNotesEdit`|
|War Room|Use|Participate in War Room.|`cloudSoarIncidentWarRoomUse`|
|Settings General|Configure|Configure global settings.|`cloudSoarGeneralConfigure`|
|User Management|Groups|Manage groups.|`cloudSoarUserManagementGroups`|
|Notification|Configure|Configure notifications.|`cloudSoarNotificationConfigure`|
|Customization|Logo|Customize logo.|`cloudSoarCustomizationLogo`|
|Customization|Fields|Customize fields.|`cloudSoarCustomizationFields`|
|Customization|Incident Labels|Customize incident labels.|`cloudSoarCustomizationIncidentLabels`|
|Customization|Triage|Customize triage UI.| `cloudSoarNotificationTriage` |
|Audit & Info|License Information|View license audit info.|`cloudSoarAuditAndInformationLicenseInformation`|
|Audit & Info|Audit Trail|View audit trail.|`cloudSoarAuditAndInformationAuditTrail`|
|Audit & Info|Configure Audit Trail|Configure audit trail.|`cloudSoarAuditAndInformationConfigureAuditTrail`|
|API|Use|Use the Cloud SOAR API.|`cloudSoarAPIUse`|
|API|API Admin|Administer Cloud SOAR API.| `cloudSoarAPIAdmin` |
|API|Email Read|Read email artifacts.|`cloudSoarAPIEmailRead`|
|API|Email Edit|Create, edit, delete email artifacts.|`cloudSoarAPIEmailEdit`|
|Incident Templates|Access|View incident templates.|`cloudSoarIncidentTemplatesAccess`|
|Incident Templates|Configure|Configure incident templates.|`cloudSoarIncidentTemplatesConfigure`|
|Automation Rules|Access|View automation rules.|`cloudSoarAutomationRulesAccess`|
|Automation Rules|Configure|Configure automation rules.|`cloudSoarAutomationRulesConfigure`|
|Entities|Access|View entities.|`cloudSoarEntitiesAccess`|
|Entities|Manage|Create, edit, delete entities.|`cloudSoarEntitiesManage`|
|Entities|Bulk Physical Delete|Bulk-delete entities.|`cloudSoarEntitiesBulkPhysicalDelete`|
|Report|Access|View reports.|`cloudSoarReportAccess`|
|Report|Access All|Access all reports.|`cloudSoarReportAll`|
|Dashboard|Access|View dashboards.|`cloudSoarDashboardAccess`|
|Dashboard|Access All|Access all dashboards.|`cloudSoarDashboardAll`|
|Widgets|Use All|Use all widgets.|`cloudSoarWidgetsAll`|

### Legacy Cloud SOAR

| Capability | Description | 
| :-- | :-- | 
| View Cloud SOAR|Show “Cloud SOAR” link in nav (legacy URL). | 
| Settings General| Configure legacy settings. | 
| Configure|Update legacy configuration. | 

## Cloud SIEM

[Cloud SIEM](/docs/cse/) features only show if enabled.

| Capability| Description | <ApiCreateRole/> |
| :-- | :-- | :-- |
|View Cloud SIEM|Show “Cloud SIEM” link in nav.|`viewCse`|

### Insights

| Capability| Description | <ApiCreateRole/> |
| :-- | :-- | :-- |
|Comment on Insights|Add comments to [Insights](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui).|`cseCommentOnInsights`|
|Create Insights|Create new Insights.|`cseCreateInsights`|
|Delete Insights|Delete existing Insights.|`cseDeleteInsights`|
|Invoke Insights Actions|Run an [Action](/docs/cse/administration/create-cse-actions) on an Insight.|`cseInvokeInsights`|
|Manage Insight Assignee|Change who’s assigned to an Insight.|`cseManageInsightAssignee`|
|Manage Insight Signals|Add/remove Signals on an Insight.|`cseManageInsightSignals`|
|Manage Insight Status|Change an Insight’s status.|`cseManageInsightStatus`|
|Manage Insight Tags|Add/delete [tags](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules).|`cseManageInsightTags`|

### Content

| Capability| Description | <ApiCreateRole/> |
| :-- | :-- | :-- |
|View Rules|View [rules](/docs/cse/rules/about-cse-rules).|`cseViewRules`|
|Manage Rules|Create, edit, delete rules.|`cseManageRules`|
|View Threat Intelligence|View [threat intel sources](/docs/cse/administration/create-custom-threat-intel-source).|`cseViewThreatIntelligence`|
|Manage Threat Intelligence|Create, edit, delete threat intel sources.|`cseManageThreatIntelligence`|
|View Match Lists|View [Match Lists](/docs/cse/match-lists-suppressed-lists/create-match-list).|`cseViewMatchLists`|
|Manage Match Lists|Create, edit, delete Match Lists.|`cseManageMatchLists`|
|View File Analysis|View [YARA rules](/docs/cse/rules/import-yara-rules).|`cseViewFileAnalysis`|
|Manage File Analysis|Create, edit, delete YARA rules.|`cseManageFileAnalysis`|
|View Custom Insights|View [custom Insights](/docs/cse/records-signals-entities-insights/configure-custom-insight).|`cseViewCustomInsights`|
|Manage Custom Insights|Create, edit, delete custom insights.|`cseManageCustomInsights`|
|View Network Blocks|View [network blocks](/docs/cse/administration/create-use-network-blocks).|`cseViewNetworkBlocks`|
|Manage Network Blocks|Create, edit, delete network blocks.|`cseManageNetworkBlocks`|
|View Suppressed Entities|View [suppressed entities](/docs/cse/records-signals-entities-insights/about-signal-suppression).|`cseViewSuppressedEntities`|
|Manage Suppressed Entities|Suppress/unsuppress entities.|`cseManageSuppressedEntities`|

### Configuration

| Capability| Description | <ApiCreateRole/> |
| :-- | :-- | :-- |
|View Mappings|View [mappings](/docs/cse/schema/create-structured-log-mapping).|`cseViewMappings`|
|Manage Mappings|Create, edit, delete mappings.|`cseManageMappings`|
|View Workflow|View detection settings, statuses, resolutions, tag schemas.| `cseViewCustomInsightStatuses` |
|Manage Workflow|Create, edit, delete detection settings, statuses, resolutions, tag schemas.| `cseManageCustomInsightStatuses` |
|View Context Actions|View [Context Actions](/docs/cse/administration/create-cse-context-actions).|`cseViewContextActions`|
|Manage Context Actions|Create, edit, delete Context Actions.|`cseManageContextActions`|
|View Actions|View [Actions](/docs/cse/administration/create-cse-actions).|`cseViewActions`|
|Manage Actions|Create, edit, delete Actions.|`cseManageActions`|
|View Enrichments|View [enrichments](/docs/cse/integrations/enrichments-and-indicators).|`cseViewEnrichments`|
|Manage Enrichments|Upload enrichment data via API.|`cseManageEnrichments`|
|View Custom Entity Types|View [custom entity types](/docs/cse/records-signals-entities-insights/create-custom-entity-type).|`cseViewCustomEntityType`|
|Manage Custom Entity Types|Create, edit, delete custom entity types.|`cseManageCustomEntityType`|
|View Entity|View [Entities](/docs/cse/records-signals-entities-insights/view-manage-entities).|`cseViewEntity`|
|Manage Entity|Create, edit, delete entities.|`cseManageEntity`|
|View Entity Normalization|View Domain Normalization settings.|`cseViewEntityConfiguration`|
|Manage Entity Normalization|Update Domain Normalization settings.|`cseManageEntityConfiguration`|
|View Entity Criticality|View [Entity Criticalities](/docs/cse/records-signals-entities-insights/entity-criticality).|`cseViewEntityCriticality`|
|Manage Entity Criticality|Create, edit, delete entity criticalities.|`cseManageEntityCriticality`|
|View Tag Schemas|View [tag schemas](/docs/cse/administration/create-a-custom-tag-schema).|`cseViewTagSchemas`|
|Manage Tag Schemas|Create, edit, delete tag schemas.|`cseManageTagSchemas`|
|Manage Favorite Fields|Add/remove favorite fields in Records UI.|`cseManageFavoriteFields`|
|View Entity Groups|View [Entity Groups](/docs/cse/records-signals-entities-insights/create-an-entity-group).|`cseViewEntityGroups`|
|Manage Entity Groups|Create, edit, delete entity groups.|`cseManageEntityGroups`|
|View Automations|View [automations](/docs/cse/automation/automations-in-cloud-siem/).|`cseViewAutomations`|
|Manage Automations|Create, edit, delete automations.|`cseManageAutomations`|
|Execute Automations|Run automations.|`cseExecuteAutomations`|
