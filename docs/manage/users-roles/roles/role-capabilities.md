---
id: role-capabilities
title: Role Capabilities
description: Assign any of these capabilities when you create user roles.
---


Following are the capabilities you can assign when you [create roles](create-manage-roles.md).

## Data Management

| Capability | Description |
| :-- | :-- |
| View Collectors	| View collectors and sources that have already been installed or added.|
| Manage Collectors	| [View and manage](/docs/send-data) installed and hosted collectors as well as sources. |
| Manage Ingest Budgets	| Allows you to manage [ingest budgets](/docs/manage/ingestion-volume/ingest-budgets). Enabling this will automatically enable the Manage Collectors capability. The Manage Collectors capability on its own permits the re-assignment of budgets to different collectors, but not creating or deleting them.|
| Manage Data Volume Feed	| Enable and manage the [data volume index](/docs/manage/ingestion-volume/data-volume-index) for your account to avoid exceeding your data limits, and to determine when you need to upgrade your account.|
| View Field Extraction Rules	| View [field extraction rules](/docs/manage/field-extractions/create-field-extraction-rule), which accelerate your search process by automatically parsing fields as log messages are ingested.|
| View Fields	| View [fields](/docs/manage/fields), which are custom metadata fields you can assign to logs.|
| Manage Fields	| Manage fields. Note that if you grant a role the Manage Fields capability, users with that role will also have the View Fields and View Field Extraction Rules capabilities.|
| Manage Field Extraction Rules	| Manage [field extractions](/docs/manage/field-extractions), which speed the search process by automatically parsing fields as log messages are ingested. Note that if you grant a role the Manage Field Extraction Rules capability, users with that role will also have the Manage Fields, View Fields, and View Field Extraction Rules capabilities.|
| Manage S3 Data Forwarding	| Manage [S3 data forwarding](/docs/manage/data-forwarding/amazon-s3-bucket) from Sumo Logic to an S3 bucket.|
| Manage Content	| Manage the content for your organization. This provides access to [Admin Mode](/docs/manage/content-sharing/admin-mode) in the Library.|
| Manage Apps | Install and manage [apps](/docs/integrations). |
| Manage Connections | Manage the [connections](/docs/alerts/webhook-connections/) that allow you to send alerts to other tools. |
| View Connections | View [connections](/docs/alerts/webhook-connections/) on the **Connections** page. |
| View Scheduled Views	| [View Scheduled Views](/docs/manage/scheduled-views).|
| Manage Scheduled Views	| View, create, edit, and delete Scheduled Views. Note that if you grant a role the Manage Schedule Views capability, users with that role will also have View Scheduled Views capability.|
| View Partitions	| View [partitions](/docs/manage/partitions).|
| Manage Partitions	| View, create, edit, and delete partitions. Note that if you grant a role the Manage Partitions capability, users with that role will also have View Partitions and Manage S3 Data Forwarding capabilities.|
| View Account Overview |	View the Account Overview page.|
| Manage Tokens	| Manage [Installation Tokens](/docs/manage/security/installation-tokens).|
| View Parsers	| View [parsers](/docs/cse/schema/parser-editor).|
| Download Search Results	| [Export log query results](/docs/search/get-started-with-search/search-basics/export-search-results) to a .csv file.|

## Entity Management

| Capability | Description |
| :-- | :-- |
| Manage Entity Type Configs | Reserved for internal use. |

## Metrics

| Capability | Description |
| :-- | :-- |
| Manage Metrics Transformation Rules	| Create, edit, or delete [metrics transformation rules](/docs/metrics/metrics-transformation-rules).|
| Manage Logs-to-Metrics	| Create, edit, or delete [Logs-to-Metrics](/docs/metrics/logs-to-metrics) rules.|
| Manage Metrics Rules	| Create, edit, or delete [metrics rules](/docs/metrics/metric-rules-editor/).|

## Security

| Capability | Description |
| :-- | :-- |
| Manage Password Policy	| Set the password policy for your Sumo Logic account.|
| Allowlist IP Addresses	| [Explicitly grant access](/docs/manage/security/create-allowlist-ip-cidr-addresses) to specific IP addresses or address ranges.|
| Create Access Keys	| Create your own [access keys](/docs/manage/security/access-keys/).|
| Manage Access Keys	| Set up, activate, deactivate, or delete access keys for your organization.|
| Manage Support Account Access	| Enable management of the Sumo Logic [support account](/docs/manage/security/enable-support-account) for your organization.|
| Manage Audit Data Feed	| Enable and manage the [Audit Index](/docs/manage/security/audit-indexes/audit-index), which provides information on the internal events that occur in your account associated with account management, user activity, and scheduled searches.|
| Manage SAML	| Provision and manage [SAML](/docs/manage/security/saml) for single sign-on to your Sumo Logic accounts.|
| Manage Share Dashboards Outside of Organization	| [Share a dashboard](/docs/dashboards/share-dashboard-outside-org/) with users who do not have access to Sumo Logic.|
| Manage Organization Settings	| Configure a [concurrent user sessions limit](/docs/manage/security/set-limit-user-concurrent-sessions) and enable the [Data Access Level for Shared Dashboards](/docs/manage/security/data-access-level-shared-dashboards/) security policy.|
| Change Data Access Level	| Change the [data access level of dashboards](/docs/dashboards/set-data-access-level/) or scheduled searches to which they have edit or manage permission.|

## Dashboards

| Capability | Description |
| :-- | :-- |
| Share Dashboards with the world	| [Share dashboards](/docs/dashboards/share-dashboard-outside-org) in view-only mode with no login required. Anyone with the URL can view the dashboard without logging in.|
| Share Dashboards with your allowlist	| [Share dashboards](/docs/dashboards/share-dashboard-new/) in view-only mode with no login required. Viewers must be connecting from IP addresses specified in your [service allowlist](/docs/manage/security/create-allowlist-ip-cidr-addresses).|


## User Management

| Capability | Description |
| :-- | :-- |
| Manage Users And Roles	| Access the web app pages to manage [users](/docs/manage/users-roles/users) and [roles](/docs/manage/users-roles/roles).|

## Automation Service

| Capability | Description |
| :-- | :-- |
| Task View | See tasks in [playbooks](/docs/platform-services/automation-service/automation-service-playbooks/). |
| Task Access | Access your tasks in [playbooks](/docs/platform-services/automation-service/automation-service-playbooks/).|
| Task Access all | Access all user tasks in [playbooks](/docs/platform-services/automation-service/automation-service-playbooks/). |
| Task Edit | Configure tasks in [playbooks](/docs/platform-services/automation-service/automation-service-playbooks/). |
| Task Reassign | Assign tasks in [playbooks](/docs/platform-services/automation-service/automation-service-playbooks/) to users. |
| App Central Access | View [App Central](/docs/platform-services/automation-service/automation-service-app-central/). |
| App Central Export | Export contents of integrations and playbooks from [App Central](/docs/platform-services/automation-service/automation-service-app-central/). |
| Integrations Access | View [integrations](/docs/platform-services/automation-service/automation-service-integrations/). |
| Integrations Configure | Create and edit [integrations](/docs/platform-services/automation-service/automation-service-integrations/). |
| Playbooks Access | View [playbooks](/docs/platform-services/automation-service/automation-service-playbooks/). |
| Playbooks Configure | Create and edit [playbooks](/docs/platform-services/automation-service/automation-service-playbooks/). |
| Bridge Monitoring Access | Monitor [Bridge](/docs/platform-services/automation-service/automation-service-bridge/) operations. |
| Observability Access | [Access automation](/docs/platform-services/automation-service/about-automation-service/#where-you-can-run-automations) in the Sumo Logic SaaS Log Analytics Platform. |
| Observability Configure | Create and edit automation in the Sumo Logic SaaS Log Analytics Platform. |

## Alerting

Folder-level permissions are available if your org has fine-grained Monitor permissions enabled. If you'd like to use this feature, contact Sumo Logic Support to have it enabled.

| Capability | Description |
| :-- | :-- |
| View Monitors	| If [monitors folder permissions](/docs/alerts/monitors/settings/#monitor-folder-permissions) are enabled for your org, users with this capability can view folders on the [Monitors](/docs/alerts/monitors) page to which they've been granted View access, and the Monitors contained in those folders.|
| Manage Monitors	| Users with this capability can create new folders and [monitors](/docs/alerts/monitors), and grant other roles permissions to the folders they create. If [monitors folder permissions](/docs/alerts/monitors/settings/#monitor-folder-permissions) are enabled for your org, users with this capability can also create, edit, delete, update and grant permissions to folders to which another user has granted them those permissions.|
| Admin Monitors	| If [monitors folder permissions](/docs/alerts/monitors/settings/#monitor-folder-permissions) are enabled for your org, users with this capability have full access (Create, Edit, Delete, Update, and grant permissions) to ALL folders and monitors on the Monitors page. This is similar to the Content Administrator capability of the Content Library.|
| View Alerts	| View alerts on the [Alert page](/docs/alerts/monitors/alert-response).|
| View Muting Schedules	| Required for viewing the [Muting Schedules](/docs/alerts/monitors/muting-schedules) page and schedule definitions.|
| Manage Muting Schedules	| Required for creating, editing, and deleting Muting Schedules.|

## Reliability Management

| Capability | Description |
| :-- | :-- |
| View SLOs | View [Service Level Objectives (SLOs)](/docs/observability/reliability-management-slo/create-slo/). |
| Manage SLOs | Create, edit, and delete SLOs.|

## Organizations

| Capability | Description |
| :-- | :-- |
| View Organizations	| View the [Organizations](/docs/manage/manage-subscription/create-and-manage-orgs/create-manage-orgs) UI.|
| Create Organizations	| Create and provision child organizations.|
| Change Credits Allocation	| Change the credits allocation for a child organization.|
| Create Trial Organizations	| Create trial organizations. (For Sumo Logic Service Providers only.)|
| Upgrade Trial Organizations	| Upgrade trial organizations. (For Sumo Logic Service Providers only.)|
| Deactivate Organizations	| Deactivate trial organizations. (For Sumo Logic Service Providers only.)|

## Threat Intel
| Capability | Description |
| :-- | :-- |
| View Threat Intel Data Store | Search log data using [threat intelligence indicators](/docs/security/threat-intelligence/threat-intelligence-indicators/). |
| Manage Threat Intel Data Store | Create, edit, and delete [threat intelligence indicators](/docs/security/threat-intelligence/threat-intelligence-indicators/). |

## Cloud SOAR

[Cloud SOAR](/docs/cloud-soar/) capabilities appear in the Roles UI only if Cloud SOAR has been enabled for your account.

:::info
This section is for our Cloud SOAR SaaS version. If you have a legacy Cloud SOAR instance URL matching the pattern `*.soar.sumologic.com`, see [Legacy Cloud SOAR role capabilities](#legacy-cloud-soar-role-capabilities) below.
:::

| Capability category | Capability | Description |
| :-- | :-- | :-- |
| View Cloud SOAR |  | Users with a role that grants this capability will see a **Cloud SOAR** link in the left-nav bar of the Sumo Logic UI. |
| Incident | View | View all [incidents](/docs/cloud-soar/incidents-triage/). |
| Incident | Access | Access your incidents. |
| Incident | Access all | Access all incidents. |
| Incident | Edit | Create, edit, and delete incidents. |
| Incident | Bulk Operations | Manage incident bulk operations. |
| Incident | Manage Investigators | Manage investigators assigned to incidents. |
| Incident | Change Ownership | Change ownership of incidents. |
| Triage | View | View all [triage](/docs/cloud-soar/incidents-triage/) events. |
| Triage | Access | Access your triage events. |
| Triage | Access all | Access all triage events. |
| Triage | Change Ownership | Change ownership of triage events. |
| Triage | Edit | Create, edit,and delete triage events. |
| Triage | Bulk physical delete | Perform bulk deletion of triage events. |
| Folders | Edit | Create, edit, and delete folders. |
| Attachments | Access | Access all [attachments](/docs/cloud-soar/incidents-triage/#documentation-tab). |
| Attachments | Edit | Create, edit, and delete attachments. |
| Incident Playbook | Access | Access all [incident playbooks](/docs/cloud-soar/incidents-triage/#playbooks). |
| Incident Playbook | Edit | Create, edit, and delete incident playbooks. |
| Incident Playbook | Manage | Manage incident playbooks. |
| Note | Access | Access all [notes](/docs/cloud-soar/incidents-triage/#notes). |
| Note | Edit | Create, edit, and delete notes. |
| War Room | Use | Be able to use the [War Room](/docs/cloud-soar/incidents-triage/#war-room).  |
| Settings General | Configure | Configure [settings](/docs/cloud-soar/overview/#settings). |
| User Management | Groups | Manage [groups](/docs/cloud-soar/overview/#groups). |
| Notification | Configure | Configure [notifications](/docs/cloud-soar/overview/#notifications). |
| Customization | Logo | Customize the logo. |
| Customization | Fields | Customize [fields](/docs/cloud-soar/overview/#custom-fields). |
| Customization | Incident Labels | Customize incident labels. |
| Customization | Triage | Customize triage. |
| Audit and Information | License Information | View license [audit and information](/docs/cloud-soar/legacy/legacy-cloud-soar-global-functions-menu/#audit-and-information). |
| Audit and Information | Audit Trail | View audit trail information. |
| Audit and Information | Configure Audit Trail | Configure audit trail information. |
| API | Use | Use [APIs](/docs/api/cloud-soar/). |
| API | Api Admin | Have admin access to APIs. |
| API | Email Read | Read emails. |
| API | Email Edit | Create, edit, and delete emails. |
| Incident Templates | Access | Access all [incident templates](/docs/cloud-soar/automation/#incident-templates). |
| Incident Templates | Configure | Configure templates. |
| Automation Rules | Access | Access [automation rules](/docs/cloud-soar/automation/#automation-rules). |
| Automation Rules | Configure | Configure automation rules. |
| Entities | Access | Access all [entities](/docs/cloud-soar/incidents-triage/#entities). |
| Entities | Manage | Manage entities. |
| Entities | Bulk Physical Delete | Perform bulk deletion of entities. |
| Report | Access | Access your [reports](/docs/cloud-soar/incidents-triage/#report). |
| Report | Access all | Access all reports. |
| Dashboard | Access | Access your [dashboards](/docs/cloud-soar/incidents-triage/#dashboards). |
| Dashboard | Access all | Access all dashboards. |
| Widgets | Use all | Use all [widgets](/docs/cloud-soar/incidents-triage/#create-widgets). |

### Legacy Cloud SOAR role capabilities

:::info
This section only applies to organizations having a legacy Cloud SOAR instance URL matching the pattern `*.soar.sumologic.com`.
:::

| Capability | Description |
| :-- | :-- |
| View Cloud SOAR | Users with a role that grants this capability will see a **Cloud SOAR** link in the left-nav bar of the Sumo Logic UI. |
| Settings General | Access Cloud SOAR settings. |
| Configure | Configure Cloud SOAR. |

## Cloud SIEM

[Cloud SIEM](/docs/cse/) capabilities only appear in the Roles UI if Cloud SIEM has been [enabled](/docs/cse/get-started-with-cloud-siem/onboarding-checklist-cse/#provision-cloud-siem) for your account. For more information about how to assign Cloud SIEM capabilities, see [Cloud SIEM User Accounts and Roles](/docs/cse/administration/cse-user-accounts-and-roles/).

| Capability category | Capability | Description |
| :-- | :-- | :-- |
| View Cloud SIEM | | Users with a role that grants this capability will see a **Cloud SIEM** link in the left-nav bar of the Sumo Logic UI. When a user clicks on the link, the Cloud SIEM [Heads-Up Display (HUD)](/docs/cse/get-started-with-cloud-siem/cse-heads-up-display/) will open. |
| Insights | Comment on Insights | Add comments to [Insights](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui). |
| Insights | Create Insights	| Create Insights.|
| Insights | Delete Insights	| Delete Insights.|
| Insights | Invoke Insights Actions	| Choose and run an [Action](/docs/cse/administration/create-cse-actions) from the Actions menu for an Insight.|
| Insights | Manage Insight Assignee	| Change the user that is assigned to an Insight.|
| Insights | Manage Insight Signals	| Add Signals to Insights; remove Signals from Insights.|
| Insights | Manage Insight Status	| Change the status of an Insight.|
| Insights | Manage Insight Tags	| Add and delete [tags](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules) assigned to Insights.|
| Content | View Rules	| View Cloud SIEM [rules](/docs/cse/rules/about-cse-rules).|
| Content | Manage Rules	| Create, edit, and delete Cloud SIEM rules.|
| Content | View Threat Intelligence	| View [threat intel sources](/docs/cse/administration/create-custom-threat-intel-source) in Cloud SIEM.|
| Content | Manage Threat Intelligence	| Create, edit, and delete threat intel sources.|
| Content | View Match Lists	| View [Match Lists](/docs/cse/match-lists-suppressed-lists/create-match-list).|
| Content | Manage Match Lists	| Create, edit, and delete Match Lists.|
| Content | View File Analysis	| View [file analysis (YARA) rules](/docs/cse/rules/import-yara-rules).|
| Content | Manage File Analysis	| Create, edit, and delete file analysis (YARA) rules.|
| Content | View Custom Insights	| View [custom Insight](/docs/cse/records-signals-entities-insights/configure-custom-insight) configurations.|
| Content | Manage Custom Insights	| Create, edit, and delete custom Insight configurations.|
| Content | View Network Blocks	| View [network blocks](/docs/cse/administration/create-use-network-blocks).|
| Content | Manage Network Blocks	| Create, edit, and delete network blocks.|
| Content | View Suppressed Entities	| View [suppressed](/docs/cse/records-signals-entities-insights/about-signal-suppression) Entities.|
| Content | Manage Suppressed Entities	| Suppress and unsuppress Entities.|
| Configuration | View Mappings	| View [log mappings](/docs/cse/schema/create-structured-log-mapping) and [ingest mappings](/docs/cse/ingestion/sumo-logic-ingest-mapping).|
| Configuration | Manage Mappings	| Create, edit, and delete log mappings and ingest mappings.|
| Configuration | View Workflow	| View Insight [detection settings](/docs/cse/records-signals-entities-insights/set-insight-generation-window-threshold), [custom Insight statuses](/docs/cse/administration/manage-custom-insight-statuses), [custom Insight resolutions](/docs/cse/administration/manage-custom-insight-resolutions), and [tag schemas](/docs/cse/administration/create-a-custom-tag-schema).|
| Configuration | Manage Workflow	| Create, edit, and delete Insight detection settings, custom Insight statuses and resolutions, and tag schemas.|
| Configuration | View Context Actions	| View [Context Actions](/docs/cse/administration/create-cse-context-actions).|
| Configuration | Manage Context Actions	| Create, edit, and delete Context Actions.|
| Configuration | View Actions	| View [Actions](/docs/cse/administration/create-cse-actions).|
| Configuration | Manage Actions	| Create, edit, and delete Actions.|
| Configuration | View Enrichments	| View [Enrichments](/docs/cse/integrations/enrichments-and-indicators).|
| Configuration | Manage Enrichments	| Upload Insight, Signal, and Entity enrichments using the Cloud SIEM API.|
| Configuration | View Custom Entity Types	| View [custom Entity types](/docs/cse/records-signals-entities-insights/create-custom-entity-type).|
| Configuration | Manage Custom Entity Types	| Create, edit, and delete custom Entity types.|
| Configuration | View Entity	| View [Entities](/docs/cse/records-signals-entities-insights/view-manage-entities).|
| Configuration | Manage Entity	| Create, edit, and delete Entities. |
| Configuration | View Entity Normalization	| View the configurations on Cloud SIEM’s [Domain Normalization](/docs/cse/schema/username-and-hostname-normalization) page.|
| Configuration | Manage Entity Normalization	| Update the configurations on Cloud SIEM’s Domain Normalization page.|
| Configuration | View Entity Criticality	| View [Entity Criticalities](/docs/cse/records-signals-entities-insights/entity-criticality).|
| Configuration | Manage Entity Criticality	| Create, edit, and delete Entity Criticalities.|
| Configuration | View Tag Schemas	| View [tag schemas](/docs/cse/administration/create-a-custom-tag-schema).|
| Configuration | Manage Tag Schemas	| Create, edit, and delete schema key tags, which can be attached to Insights, Signals, Entities, and Rules.|
| Configuration | Manage Favorite Fields	| Add and remove favorite fields by clicking the star icon next to the fields in Cloud SIEM Records.|
| Configuration | View Entity Groups	| View [Entity Groups](/docs/cse/records-signals-entities-insights/create-an-entity-group).|
| Configuration | Manage Entity Groups	| Create, edit, and delete Entity Groups.|
| Configuration | View Automations | View [automations](/docs/cse/automation/automations-in-cloud-siem/). |
| Configuration | Manage Automations | Create, edit, and delete automations. |
| Configuration | Execute Automations | Run automations. |
