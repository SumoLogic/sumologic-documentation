---
id: role-capabilities
title: Role Capabilities
description: Assign any of these capabilities when you create user roles.
---


Following are the capabilities you can assign when you [create roles](create-manage-roles.md).

## Data Management

| Capability | Description | API |
| :-- | :-- | :-- |
| View Collectors | View collectors and sources that have already been installed or added. | `viewCollectors` |
| Manage Collectors | [View and manage](/docs/send-data) installed and hosted collectors as well as sources. | `manageCollectors` |
| Manage Ingest Budgets |Allows you to manage [ingest budgets](/docs/manage/ingestion-volume/ingest-budgets). Enabling this will automatically enable the Manage Collectors capability. The Manage Collectors capability on its own permits the re-assignment of budgets to different collectors, but not creating or deleting them. | `manageIngestBudgets` |
| Manage Data Volume Feed|Enable and manage the [data volume index](/docs/manage/ingestion-volume/data-volume-index) for your account to avoid exceeding your data limits, and to determine when you need to upgrade your account. | `manageDataVolumeFeed` |
| View Field Extraction Rules | View [field extraction rules](/docs/manage/field-extractions/create-field-extraction-rule), which accelerate your search process by automatically parsing fields as log messages are ingested. | `viewFieldExtractionRules` |
| View Fields | View [fields](/docs/manage/fields), which are custom metadata fields you can assign to logs. | `viewFields` |
| Manage Fields | Manage fields. Note that if you grant a role the Manage Fields capability, users with that role will also have the View Fields and View Field Extraction Rules capabilities. | `manageFields` |
| Manage Field Extraction Rules | Manage [field extractions](/docs/manage/field-extractions), which speed the search process by automatically parsing fields as log messages are ingested. Note that if you grant a role the Manage Field Extraction Rules capability, users with that role will also have the Manage Fields, View Fields, and View Field Extraction Rules capabilities. | `manageFieldExtractionRules` |
| Manage S3 Data Forwarding| Manage [S3 data forwarding](/docs/manage/data-forwarding/amazon-s3-bucket) from Sumo Logic to an S3 bucket. | `manageS3DataForwarding` |
| Manage Content| Manage the content for your organization. This provides access to [Admin Mode](/docs/manage/content-sharing/admin-mode) in the Library. | `manageContent` |
| Manage Apps |Install and manage [apps](/docs/integrations). | `manageApps` |
| Manage Connections | Manage the [connections](/docs/alerts/webhook-connections/) that allow you to send alerts to other tools. | `manageConnections` |
| View Connections | View [connections](/docs/alerts/webhook-connections/) on the **Connections** page. | `viewConnections` |
| View Scheduled Views | [View Scheduled Views](/docs/manage/scheduled-views). | `viewScheduledViews` |
| Manage Scheduled Views | View, create, edit, and delete Scheduled Views. Note that if you grant a role the Manage Scheduled Views capability, users with that role will also have View Scheduled Views capability. | `manageScheduledViews` |
| View Partitions | View [partitions](/docs/manage/partitions). | `viewPartitions` |
| Manage Partitions | View, create, edit, and delete partitions. Note that if you grant a role the Manage Partitions capability, users with that role will also have View Partitions and Manage S3 Data Forwarding capabilities. | `managePartitions` |
| View Account Overview| View the Account Overview page. | `viewAccountOverview` |
| Manage Tokens | Manage [Installation Tokens](/docs/manage/security/installation-tokens). | `manageTokens` |
| View Parsers | View [parsers](/docs/cse/schema/parser-editor). | `viewParsers` |
|Download Search Results | [Export log query results](/docs/search/get-started-with-search/search-basics/export-search-results) to a .csv file. | `downloadSearchResults` |

## Entity Management

| Capability | Description | API |
| :-- | :-- | :-- |
| Manage Entity Type Configs |Reserved for internal use. | `manageEntityTypeConfigs` |

## Metrics

| Capability | Description | API |
| :-- | :-- | :-- |
| Manage Metrics Transformation Rules | Create, edit, or delete [metrics transformation rules](/docs/metrics/metrics-transformation-rules). | `manageMetricsTransformationRules` |
| Manage Logs-to-Metrics | Create, edit, or delete [Logs-to-Metrics](/docs/metrics/logs-to-metrics) rules. | `manageLogsToMetrics` |
| Manage Metrics Rules | Create, edit, or delete [metrics rules](/docs/metrics/metric-rules-editor/). | `manageMetricsRules` |

## Security

| Capability | Description | API |
| :-- | :-- | :-- |
| Manage Password Policy|Set the password policy for your Sumo Logic account. | `managePasswordPolicy` |
|Allowlist IP Addresses | [Explicitly grant access](/docs/manage/security/create-allowlist-ip-cidr-addresses) to specific IP addresses or address ranges. | `allowlistIpAddresses` |
| Create Access Keys | Create your own [access keys](/docs/manage/security/access-keys/). | `createAccessKeys` |
| Manage Access Keys |Set up, activate, deactivate, or delete access keys for your organization. | `manageAccessKeys` |
| Manage Support Account Access |Enable management of the Sumo Logic [support account](/docs/manage/security/enable-support-account) for your organization. | `manageSupportAccountAccess` |
| Manage Audit Data Feed|Enable and manage the [Audit Index](/docs/manage/security/audit-indexes/audit-index), which provides information on internal events. | `manageAuditDataFeed` |
| Manage SAML|Provision and manage [SAML](/docs/manage/security/saml) for single sign-on. | `manageSAML` |
| Manage Share Dashboards Outside Organization | [Share a dashboard](/docs/dashboards/share-dashboard-outside-org/) with users who do not have Sumo Logic access. | `manageShareDashboardsOutsideOrganization` |
| Manage Organization Settings | Configure concurrent session limits and the Data Access Level for Shared Dashboards security policy. | `manageOrganizationSettings` |
|Change Data Access Level|Change the [data access level](/docs/dashboards/set-data-access-level/) of dashboards or scheduled searches. | `changeDataAccessLevel` |

## Dashboards

| Capability | Description | API |
| :-- | :-- | :-- |
|Share Dashboards with the World | [Share dashboards](/docs/dashboards/share-dashboard-outside-org) in view-only mode with no login required. | `shareDashboardsWithTheWorld` |
|Share Dashboards with Your Allowlist | [Share dashboards](/docs/dashboards/share-dashboard-new/) in view-only mode; viewers must be on your service allowlist. | `shareDashboardsWithYourAllowlist` |

## User Management

| Capability | Description | API |
| :-- | :-- | :-- |
| Manage Users And Roles | Access the UI pages to manage [users](/docs/manage/users-roles/users) and [roles](/docs/manage/users-roles/roles). | `manageUsersAndRoles` |

## Audit Event Management

| Capability | Description | API |
| :-- | :-- | :-- |
| Access Search Audit Events | View and download audit logs of search queries executed in the UI. | `accessSearchAuditEvents` |
| Access Audit Events | View and download audit logs of admin and config events. | `accessAuditEvents` |

## Cloud SOAR

[Cloud SOAR](/docs/cloud-soar/) capabilities appear in the Roles UI only if Cloud SOAR has been enabled for your account.

:::info
This section is for our Cloud SOAR SaaS version. If you have a legacy Cloud SOAR instance URL matching the pattern `*.soar.sumologic.com`, see [Legacy Cloud SOAR role capabilities](#legacy-cloud-soar) below.
:::

### SaaS Cloud SOAR

| Capability category | Capability | Description | API |
| :-- | :-- | :-- | :-- |
| View Cloud SOAR||Show “Cloud SOAR” link in nav. | `viewCloudSoar` |
|Incident| View| View all [incidents](/docs/cloud-soar/incidents-triage/). | `incidentView` |
|Incident| Access | Access your incidents. | `incidentAccess` |
|Incident| Access All| Access all incidents. | `incidentAccessAll` |
|Incident|Edit| Create, edit, delete incidents. | `incidentEdit` |
|Incident|Bulk Operations | Manage incident bulk operations. | `incidentBulkOperations` |
|Incident| Manage Investigators |Assign/remove investigators. | `incidentManageInvestigators` |
|Incident|Change Ownership|Change incident ownership. | `incidentChangeOwnership` |
| Triage | View| View all [triage](/docs/cloud-soar/incidents-triage/). | `triageView` |
| Triage | Access | Access your triage events. | `triageAccess` |
| Triage | Access All| Access all triage events. | `triageAccessAll` |
| Triage |Change Ownership|Change triage ownership. | `triageChangeOwnership` |
| Triage |Edit| Create, edit, delete triage events. | `triageEdit` |
| Triage |Bulk Physical Delete|Bulk-delete triage events. | `triageBulkPhysicalDelete` |
|Folders |Edit| Create, edit, delete playbook folders. | `foldersEdit` |
|Attachments | Access | View attachments. | `attachmentsAccess` |
|Attachments |Edit| Create, edit, delete attachments. | `attachmentsEdit` |
|Incident Playbook| Access | View playbooks. | `incidentPlaybookAccess` |
|Incident Playbook|Edit| Create, edit, delete playbooks. | `incidentPlaybookEdit` |
|Incident Playbook| Manage| Manage playbook lifecycle. | `incidentPlaybookManage` |
|Note| Access | View notes. | `noteAccess` |
|Note|Edit| Create, edit, delete notes. | `noteEdit` |
|War Room|Use|Participate in War Room. | `warRoomUse` |
|Settings General| Configure| Configure global settings. | `settingsGeneralConfigure` |
|User Management|Groups | Manage groups. | `userManagementGroups` |
|Notification| Configure| Configure notifications. | `notificationConfigure` |
|Customization|Logo|Customize logo. | `customizationLogo` |
|Customization|Fields |Customize fields. | `customizationFields` |
|Customization|Incident Labels |Customize incident labels. | `customizationIncidentLabels` |
|Customization| Triage |Customize triage. | `customizationTriage` |
|Audit & Info|License Information| View license audit info. | `auditInfoLicenseInformation` |
|Audit & Info|Audit Trail| View audit trail. | `auditInfoAuditTrail` |
|Audit & Info| Configure Audit Trail| Configure audit trail. | `auditInfoConfigureAuditTrail` |
| API |Use|Use the Cloud SOAR API. | `apiUse` |
| API |API Admin|Administer Cloud SOAR API. | `apiAdmin` |
| API |Email Read|Read email artifacts. | `emailRead` |
| API |Email Edit| Create, edit, delete email artifacts. | `emailEdit` |
|Incident Templates | Access | View incident templates. | `incidentTemplatesAccess` |
|Incident Templates | Configure| Configure incident templates. | `incidentTemplatesConfigure` |
|Automation Rules | Access | View automation rules. | `automationRulesAccess` |
|Automation Rules | Configure| Configure automation rules. | `automationRulesConfigure` |
|Entities | Access | View entities. | `entitiesAccess` |
|Entities | Manage| Create, edit, delete entities. | `entitiesManage` |
|Entities |Bulk Physical Delete|Bulk-delete entities. | `entitiesBulkPhysicalDelete` |
|Report| Access | View reports. | `reportAccess` |
|Report| Access All| Access all reports. | `reportAccessAll` |
|Dashboard| Access | View dashboards. | `dashboardAccess` |
|Dashboard| Access All| Access all dashboards. | `dashboardAccessAll` |
|Widgets |Use All|Use all widgets. | `widgetsUseAll` |

### Legacy Cloud SOAR

| Capability | Description | API |
| :-- | :-- | :-- |
| View Cloud SOAR|Show “Cloud SOAR” link in nav (legacy URL). | `viewCloudSoarLegacy` |
| Settings General| Configure legacy settings. | `settingsGeneralLegacy` |
| Configure|Update legacy configuration. | `configureLegacy` |

## Automation Service

| Capability | Description | API |
| :-- | :-- | :-- |
|Task View|See tasks in [playbooks](/docs/platform-services/automation-service/automation-service-playbooks/). | `taskView` |
|Task Access | Access your tasks in playbooks. | `taskAccess` |
|Task Access All| Access all user tasks in playbooks. | `taskAccessAll` |
|Task Edit| Configure tasks in playbooks. | `taskEdit` |
|Task Reassign|Assign tasks in playbooks to users. | `taskReassign` |
|App Central Access | View [App Central](/docs/platform-services/automation-service/automation-service-app-central/). | `appCentralAccess` |
|App Central Export|Export integrations and playbooks from App Central. | `appCentralExport` |
|Integrations Access | View [integrations](/docs/platform-services/automation-service/automation-service-integrations/). | `integrationsAccess` |
|Integrations Configure| Create and edit integrations. | `integrationsConfigure` |
|Playbooks Access | View playbooks. | `playbooksAccess` |
|Playbooks Configure| Create and edit playbooks. | `playbooksConfigure` |
|Bridge Monitoring Access |Monitor Bridge operations. | `bridgeMonitoringAccess` |
|Observability Access | Access automation in the SaaS Log UI. | `observabilityAccess` |
|Observability Configure| Create and edit automation in the SaaS Log UI. | `observabilityConfigure` |

## Settings General

## Content

## Configuration


## Alerting

| Capability | Description | API |
| :-- | :-- | :-- |
| View Monitors |If folder perms are enabled, view folders & monitors you have access to. | `viewMonitors` |
| Manage Monitors | Create folders & monitors, grant perms, and (with folder perms) full CRUD on folders you control. | `manageMonitors` |
|Admin Monitors |With folder perms, full CRUD & grant on all folders & monitors. | `adminMonitors` |
| View Alerts | View alerts on the [Alert page](/docs/alerts/monitors/alert-response). | `viewAlerts` |
| View Muting Schedules | View [Muting Schedules](/docs/alerts/monitors/muting-schedules). | `viewMutingSchedules` |
| Manage Muting Schedules | Create, edit, and delete Muting Schedules. | `manageMutingSchedules` |

## Open Analytics


## Usage Management


## Reliability Management

| Capability | Description | API |
| :-- | :-- | :-- |
| View SLOs | View [Service Level Objectives (SLOs)](/docs/observability/reliability-management-slo/create-slo/). | `viewSLOs` |
| Manage SLOs | Create, edit, and delete SLOs. | `manageSLOs` |

## Threat Intel

| Capability | Description | API |
| :-- | :-- | :-- |
| View Threat Intel Data Store| View the [Threat Intelligence](/docs/security/threat-intelligence/about-threat-intelligence/) tab. | `viewThreatIntelDataStore` |
| Manage Threat Intel Data Store| Create, edit, and delete threat intel sources. | `manageThreatIntelDataStore` |

## Macros


## Organizations

| Capability | Description | API |
| :-- | :-- | :-- |
| View Organizations | View the [Organizations](/docs/manage/manage-subscription/create-and-manage-orgs/create-manage-orgs) UI. | `viewOrganizations` |
| Create Organizations | Create and provision child organizations. | `createOrganizations` |
|Change Credits Allocation|Change the credits allocation for a child organization. | `changeCreditsAllocation` |
| Create Trial Organizations | Create trial organizations (Service Providers only). | `createTrialOrganizations` |
|Upgrade Trial Organizations |Upgrade trial organizations (Service Providers only). | `upgradeTrialOrganizations` |
|Deactivate Organizations |Deactivate trial organizations (Service Providers only). | `deactivateOrganizations` |

## Cloud SIEM

[Cloud SIEM](/docs/cse/) features only show if enabled.

| Capability category | Capability | Description | API |
| :-- | :-- | :-- | :-- |
| View Cloud SIEM||Show “Cloud SIEM” link in nav. | `viewCloudSiem` |
|Insights |Comment on Insights |Add comments to [Insights](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui). | `insightsCommentOnInsights` |
|Insights | Create Insights | Create new Insights. | `insightsCreateInsights` |
|Insights |Delete Insights |Delete existing Insights. | `insightsDeleteInsights` |
|Insights |Invoke Insights Actions |Run an [Action](/docs/cse/administration/create-cse-actions) on an Insight. | `insightsInvokeInsightsActions` |
|Insights | Manage Insight Assignee|Change who’s assigned to an Insight. | `insightsManageInsightAssignee` |
|Insights | Manage Insight Signals |Add/remove Signals on an Insight. | `insightsManageInsightSignals` |
|Insights | Manage Insight Status |Change an Insight’s status. | `insightsManageInsightStatus` |
|Insights | Manage Insight Tags |Add/delete [tags](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules). | `insightsManageInsightTags` |
|Content| View Rules | View [rules](/docs/cse/rules/about-cse-rules). | `contentViewRules` |
|Content| Manage Rules | Create, edit, delete rules. | `contentManageRules` |
|Content| View Threat Intelligence| View [threat intel sources](/docs/cse/administration/create-custom-threat-intel-source). | `contentViewThreatIntelligence` |
|Content| Manage Threat Intelligence| Create, edit, delete threat intel sources. | `contentManageThreatIntelligence` |
|Content| View Match Lists | View [Match Lists](/docs/cse/match-lists-suppressed-lists/create-match-list). | `contentViewMatchLists` |
|Content| Manage Match Lists | Create, edit, delete Match Lists. | `contentManageMatchLists` |
|Content| View File Analysis | View [YARA rules](/docs/cse/rules/import-yara-rules). | `contentViewFileAnalysis` |
|Content| Manage File Analysis | Create, edit, delete YARA rules. | `contentManageFileAnalysis` |
|Content| View Custom Insights | View [custom Insights](/docs/cse/records-signals-entities-insights/configure-custom-insight). | `contentViewCustomInsights` |
|Content| Manage Custom Insights | Create, edit, delete custom insights. | `contentManageCustomInsights` |
|Content| View Network Blocks | View [network blocks](/docs/cse/administration/create-use-network-blocks). | `contentViewNetworkBlocks` |
|Content| Manage Network Blocks | Create, edit, delete network blocks. | `contentManageNetworkBlocks` |
|Content| View Suppressed Entities | View [suppressed entities](/docs/cse/records-signals-entities-insights/about-signal-suppression). | `contentViewSuppressedEntities` |
|Content| Manage Suppressed Entities |Suppress/unsuppress entities. | `contentManageSuppressedEntities` |
| Configuration | View Mappings | View [mappings](/docs/cse/schema/create-structured-log-mapping). | `configurationViewMappings` |
| Configuration | Manage Mappings | Create, edit, delete mappings. | `configurationManageMappings` |
| Configuration | View Workflow| View detection settings, statuses, resolutions, tag schemas. | `configurationViewWorkflow` |
| Configuration | Manage Workflow| Create, edit, delete detection settings, statuses, resolutions, tag schemas. | `configurationManageWorkflow` |
| Configuration | View Context Actions | View [Context Actions](/docs/cse/administration/create-cse-context-actions). | `configurationViewContextActions` |
| Configuration | Manage Context Actions | Create, edit, delete Context Actions. | `configurationManageContextActions` |
| Configuration | View Actions | View [Actions](/docs/cse/administration/create-cse-actions). | `configurationViewActions` |
| Configuration | Manage Actions | Create, edit, delete Actions. | `configurationManageActions` |
| Configuration | View Enrichments | View [enrichments](/docs/cse/integrations/enrichments-and-indicators). | `configurationViewEnrichments` |
| Configuration | Manage Enrichments |Upload enrichment data via API. | `configurationManageEnrichments` |
| Configuration | View Custom Entity Types | View [custom entity types](/docs/cse/records-signals-entities-insights/create-custom-entity-type). | `configurationViewCustomEntityTypes` |
| Configuration | Manage Custom Entity Types | Create, edit, delete custom entity types. | `configurationManageCustomEntityTypes` |
| Configuration | View Entity| View [Entities](/docs/cse/records-signals-entities-insights/view-manage-entities). | `configurationViewEntity` |
| Configuration | Manage Entity| Create, edit, delete entities. | `configurationManageEntity` |
| Configuration | View Entity Normalization| View Domain Normalization settings. | `configurationViewEntityNormalization` |
| Configuration | Manage Entity Normalization|Update Domain Normalization settings. | `configurationManageEntityNormalization` |
| Configuration | View Entity Criticality| View [Entity Criticalities](/docs/cse/records-signals-entities-insights/entity-criticality). | `configurationViewEntityCriticality` |
| Configuration | Manage Entity Criticality| Create, edit, delete entity criticalities. | `configurationManageEntityCriticality` |
| Configuration | View Tag Schemas | View [tag schemas](/docs/cse/administration/create-a-custom-tag-schema). | `configurationViewTagSchemas` |
| Configuration | Manage Tag Schemas | Create, edit, delete tag schemas. | `configurationManageTagSchemas` |
| Configuration | Manage Favorite Fields |Add/remove favorite fields in Records UI. | `configurationManageFavoriteFields` |
| Configuration | View Entity Groups | View [Entity Groups](/docs/cse/records-signals-entities-insights/create-an-entity-group). | `configurationViewEntityGroups` |
| Configuration | Manage Entity Groups | Create, edit, delete entity groups. | `configurationManageEntityGroups` |
| Configuration | View Automations | View [automations](/docs/cse/automation/automations-in-cloud-siem/). | `configurationViewAutomations` |
| Configuration | Manage Automations | Create, edit, delete automations. | `configurationManageAutomations` |
| Configuration | Execute Automations |Run automations. | `configurationExecuteAutomations` |
