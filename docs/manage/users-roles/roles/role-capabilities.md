---
id: role-capabilities
title: Role Capabilities
description: Assign any of these capabilities when you create user roles.
---


Following are just some of the capabilities you can assign when you [create roles](create-manage-roles.md).

## Data Management

| Capability | Description |
| :-- | :-- |
| View Collectors	| View Collectors and Sources that have already been installed or added.| 
| Manage Collectors	| [Install and manage](/docs/send-data) Installed/Hosted Collectors and Sources. Manage permission automatically includes view permission.| 
| Manage Ingest Budgets	| Manage [ingest budgets](/docs/manage/ingestion-volume/ingest-budgets). Enabling this will automatically enable the Manage Collectors capability. The Manage Collectors capability on its own permits the re-assignment of budgets to different Collectors, but not creating or deleting them.| 
| Manage Data Volume Feed	| Enable and manage the [data volume index](/docs/manage/ingestion-volume/data-volume-index) for your account to avoid using [On-Demand Capacity](/docs/manage/manage-subscription/cloud-flex-accounts#account-limitations-and-guidelines), and to determine when you need to upgrade your account.| 
| View Field Extraction Rules	| View [field extraction rules](/docs/manage/field-extractions/create-field-extraction-rule), which speed the search process by automatically parsing fields as log messages are ingested.| 
| View Fields	| View [fields](/docs/manage/fields), which are custom metadata fields you can assign to logs.| 
| Manage Fields	| Manage fields, which are custom metadata fields you can assign to logs.Note that if you grant a role the Manage Fields capability, users with that role will also have the View Fields and View field extraction rules capabilities.| 
| Manage Field Extraction Rules	| Manage [field extractions](/docs/manage/field-extractions), which speed the search process by automatically parsing fields as log messages are ingested. Note that if you grant a role the Manage field extraction rules capability, users with that role will also have the Manage Fields, View Fields, and View field extraction rules capabilities.| 
| Manage S3 Data Forwarding	| Manage [S3 data forwarding](/docs/manage/data-forwarding/amazon-s3-bucket) from Sumo Logic to an S3 bucket.| 
| Manage Content	| Manage the content for your organization. This provides access to [Admin Mode](/docs/manage/content-sharing/admin-mode) in the Library.| 
| Manage Apps | Install apps. |
| Manage Connections | Manage the [connections](/docs/manage/connections-integrations) that allow you to send alerts to other tools. |
| View Scheduled Views	| View Scheduled Views.| 
| Manage Scheduled Views	| View, create, edit, and delete [Scheduled Views](/docs/manage/scheduled-views). Note that if you grant a role the Manage Schedule View capability, users with that role will also have View Scheduled View capabilities.| 
| View Partitions	| View [Partitions](/docs/manage/partitions-data-tiers).| 
| Manage Partitions	| View, create, edit, and delete Partitions. Note that if you grant a role the Manage Partitions capability, users with that role will also have View Partitions and Manage S3 data forwarding capabilities.| 
| View Account Overview | Overview	View the Account Overview page.| 
| Manage Tokens	| Manage [Installation Tokens](/docs/manage/security/installation-tokens).| 
| View Parsers	| View [Parsers](/docs/cse/schema/parser-editor).| 
| Download Search Results	| [Export](/docs/search/get-started-with-search/search-basics/export-search-results) log query results to a .csv file.| 

## Entity Management

| Capability | Description |
| :-- | :-- |
| Manage Entity Type Configs | Reserved for internal use. |

## Metrics

| Capability | Description |
| :-- | :-- |
| Manage Metrics Transformation Rules	| Create, edit, or delete [metrics transformation rules](/docs/metrics/metrics-transformation-rules).| 
| Manage Logs-to-Metrics	| Create, edit, or delete [Logs-to-Metrics](/docs/metrics/logs-to-metrics) rules.| 
| Manage Metrics Rules	| Create, edit, or delete [metrics rules](/metrics/metric-rules-editor/).| 

## Security

<table>
  <tr>
   <td><strong>Capability</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>Manage password policy
   </td>
   <td>Set the password policy for your Sumo Logic account.
   </td>
  </tr>
  <tr>
   <td>Allowlist IP addresses
   </td>
   <td><a href="/docs/manage/security/create-allowlist-ip-cidr-addresses">Explicitly grant access</a> to specific IP addresses or address ranges.
   </td>
  </tr>
  <tr>
   <td>Create access keys
   </td>
   <td>Allows users to create their own access keys on the <a href="/docs/get-started/sumo-logic-ui">Preferences page</a>.
   </td>
  </tr>
  <tr>
   <td>Manage access keys
   </td>
   <td><a href="/docs/manage/security/access-keys">Set up, activate, deactivate, or delete access keys</a> for your organization.
   </td>
  </tr>
  <tr>
   <td>Manage support account access
   </td>
   <td>Enable <a href="/docs/manage/security/enable-support-account">management of the Sumo Logic support account</a> for your organization.
   </td>
  </tr>
  <tr>
   <td>Manage audit data feed.
   </td>
   <td><a href="/docs/manage/security/audit-index">Enable and manage the Audit Index</a>, which provides information on the internal events that occur in your account associated with account management, user activity, and scheduled searches.
   </td>
  </tr>
  <tr>
   <td>Manage SAML
   </td>
   <td><a href="/docs/manage/security/saml">Provision and manage SAML</a> for single sign-on to your Sumo Logic accounts.
   </td>
  </tr>
  <tr>
   <td>Manage Share dashboards outside of the organization
   </td>
   <td><a href="/docs/dashboards-classic/share-dashboard-inside-org">Share a dashboard</a> with users who don't have access to Sumo Logic.
   </td>
  </tr>
  <tr>
   <td>Manage organization settings
   </td>
   <td>Users with this capability can configure a <a href="/docs/manage/security/set-limit-user-concurrent-sessions">concurrent user sessions limit</a> and enable the <a href="/docs/manage/security/data-access-level-shared-dashboards">Data Access Level for Shared Dashboards</a> security policy.
   </td>
  </tr>
  <tr>
   <td>Change Data Access Level
   </td>
   <td>Users with this capability can change the <a href="/docs/dashboards-classic/get-started/set-data-access-level-dashboard">data access level</a> of dashboards or scheduled searches to which they have edit or manage permission.
   </td>
  </tr>
</table>



## Dashboards

<table>
  <tr>
   <td><strong>Capability</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>Share dashboards with the allowlist
   </td>
   <td><a href="/docs/dashboards-classic/share-dashboard-inside-org">Share dashboards</a> in view-only mode with no login required. Viewers must be connecting from IP addresses specified in your <a href="/docs/manage/security/create-allowlist-ip-cidr-addresses/#enable-dashboard-allowlist">service allowlist</a>.
   </td>
  </tr>
  <tr>
   <td>Share dashboards with the world
   </td>
   <td><a href="/docs/dashboards-classic/share-dashboard-outside-org">Share dashboards</a> in view-only mode with no login required. Anyone with the URL can view the dashboard without logging in.
   </td>
  </tr>
</table>



## User Management
<table>
  <tr>
   <td><strong>Capability</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>Manage users and roles
   </td>
   <td>Access the web app pages to manage <a href="/docs/manage/users-roles/users">users</a> and <a href="/docs/manage/users-roles/roles/role-capabilities">roles</a>.
   </td>
  </tr>
</table>



## Alerts

Folder-level permissions are available if your org has fine-grained Monitor permissions enabled. If you'd like to use this feature, contact Sumo Logic Support to have it enabled.


<table>
  <tr>
   <td><strong>Capability</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>View Monitors
   </td>
   <td>If <a href="/docs/alerts/monitors/edit-settings/#monitors-folder-permissions">Monitor folder permissions</a> are enabled for your org, users with this capability can view folders on the <a href="/docs/alerts/monitors">Monitors</a> page to which they've been granted View access, and the Monitors contained in those folders.
   </td>
  </tr>
  <tr>
   <td>Manage Monitors
   </td>
   <td>A user with this capability can create new folders and <a href="/docs/alerts/monitors">Monitors</a>, and grant other roles permissions to the folders they create.
<p>If <a href="/docs/alerts/monitors/edit-settings/#monitors-folder-permissions">Monitor folder permissions</a> are enabled for your org, users with this capability can also create, edit, delete, update and grant permissions to folders to which another user has granted them those permissions.</p>
   </td>
  </tr>
  <tr>
   <td>View Alerts
   </td>
   <td>View <a href="/docs/alerts/monitors/alert-response#alert-list">Alerts</a> on the Alerts page.
   </td>
  </tr>
  <tr>
   <td>Admin Monitors
   </td>
   <td>If <a href="/docs/alerts/monitors/edit-settings/#monitors-folder-permissions">Monitor folder permissions</a> are enabled for your org, users with this capability have full access (Create, Edit, Delete, Update, and grant permissions) to ALL folders and monitors on the <a href="/docs/alerts/monitors">Monitors</a> page. This is similar to the Content Administrator capability of the Content Library.
   </td>
  </tr>
<tr>
 <td>View Muting Schedules</td>
 <td>Required for viewing the <a href="/docs/alerts/monitors/muting-schedules">Muting Schedules</a> page and schedule definitions.
 </td>
</tr>
<tr>
 <td>Manage Muting Schedules</td>
 <td>Required for creating, editing, and deleting Muting Schedules.
 </td>
</tr>
</table>



## Organizations

<table>
  <tr>
   <td><strong>Capability</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>View Organizations
   </td>
   <td>View the <a href="/docs/manage/manage-subscription/create-manage-orgs">Organizations</a> UI.
   </td>
  </tr>
  <tr>
   <td>Create Organizations
   </td>
   <td>Create and provision child organizations.
   </td>
  </tr>
  <tr>
   <td>Change Credits Allocation
   </td>
   <td>Change the credits allocation for a child organization.
   </td>
  </tr>
  <tr>
   <td>Create Trial Organizations
   </td>
   <td>Create trial organizations. (For Sumo Logic Service Providers only.)
   </td>
  </tr>
  <tr>
   <td>Upgrade Trial Organizations
   </td>
   <td>Upgrade trial organizations. (For Sumo Logic Service Providers only.)
   </td>
  </tr>
  <tr>
   <td>Deactivate Organizations
   </td>
   <td>Deactivate trial organizations. (For Sumo Logic Service Providers only.)
   </td>
  </tr>
</table>

## Cloud SOAR

[Cloud SOAR](/docs/cloud-soar/) capabilities only appear in the Roles UI if Cloud SOAR has been enabled for your account.

| Capability category | Capability | Description |
| :-- | :-- | :-- |
| View Cloud SOAR | | Users with a role that grants this capability will see a **Cloud SOAR** link in the left-nav bar of the Sumo Logic UI. | 
| App Central | Access | Access [App Central](/docs/cloud-soar/automation#app-central). |  
| App Central | Export | Export from App Central. |  
| Integrations | Access | Access [Integrations](/docs/cloud-soar/automation#integrations). |  
| Integrations | Configure | Configure Integrations. |  
| Automation Playbooks | Access | Access [playbooks](/docs/cloud-soar/automation#playbook).  |  
| Automation Playbooks | Configure | Configure playbooks. |  
| Bridge Monitoring | Access | Access [Bridge monitoring](/docs/cloud-soar/global-functions-menu/#audit-and-information). | 
| Observability | Access | Access [Incidents](/docs/cloud-soar/incidents-triage/).  |   
| Observability | Configure | Configure Incidents. |   


## Cloud SIEM Enterprise

[Cloud SIEM Enterprise](/docs/cse/) capabilities only appear in the Roles UI if Cloud SIEM has been [enabled](/docs/cse/get-started-with-cloud-siem/onboarding-checklist-cse/#provision-cloud-siem) for your account.

For information about how to assign Cloud SIEM capabilities, see [Cloud SIEM User Accounts and Roles](/docs/cse/administration/cse-user-accounts-and-roles/).

| Capability category | Capability | Description |
| :-- | :-- | :-- |
| View Cloud SIEM Enterprise | | Users with a role that grants this capability will see a **Cloud SIEM Enterprise** link in the left-nav bar of the Sumo Logic UI. When a user clicks on the link, the Cloud SIEM [Heads-Up Display (HUD)](/docs/cse/get-started-with-cloud-siem/cse-heads-up-display/) will open. |
| Insights | Comment on Insights | Add comments to [Insights](docs/cse/get-started-with-cloud-siem/about-cse-insight-ui). |
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
| Configuration | View Automations | View [automations](/docs/cse/automation-service/automation-service-automations/). |
| Configuration | Manage Automations | Create, edit, and delete automations. |
| Configuration | Execute Automations | Run automations. |

