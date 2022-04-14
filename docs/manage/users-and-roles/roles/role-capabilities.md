---
id: role-capabilities
---

# Role Capabilities

You can assign any of the following capabilities when you [create roles](create-manage-roles.md).

## Data Management

| Capability | Description |
|--|--|
| Manage connections | Manage the [connections](/docs/manage/connections-and-integrations) that allow you to send alerts to other tools. |
| Manage Collectors | Install and manage [installed] (/03Send-Data/Installed-Collectors) and [hosted] (/03Send-Data/Hosted-Collectors) Collectors and [Sources] (/03Send-Data/Sources). Manage permission automatically includes view permission. |
| Manage Ingest Budgets | Manage [ingest budgets](/docs/manage/ingestion-and-volume/ingest-budgets). Enabling this will automatically enable the Manage Collectors capability. The Manage Collectors capability on its own permits the re-assignment of budgets to different Collectors, but not creating or deleting them. |
| Manage data volume feed | [Enable and manage the data volume index](/docs/manage/ingestion-and-volume/data-volume-index/) for your account to avoid using On-Demand Capacity, and to determine when you need to upgrade your account. |
| View Collectors | View and Collectors and Sources that have already been installed or added. |
| View fields | View [fields](/docs/manage/fields), which are custom metadata fields you can assign to logs. |
| Manage fields | Manage [fields](/docs/manage/fields), which are custom metadata fields you can assign to logs. Note that if you grant a role the Manage Fields capability, users with that role will also have the View Fields and View field extraction rules capabilities. |
| View field extraction rules | View [field extraction rules](/docs/manage/field-extractions), which speed the search process by automatically parsing fields as log messages are ingested. |
| Manage field extraction rules | [Manage field extractions](/docs/manage/field-extractions), which speed the search process by automatically parsing fields as log messages are ingested. Note that if you grant a role the Manage field extraction rules capability, users with that role will also have the Manage Fields, View Fields, and View field extraction rules capabilities. |
| View Partitions | View [Partitions](/docs/manage/partitions-and-data-tiers). |
| Manage Partitions | View, create, edit, and delete [Partitions](/docs/manage/partitions-and-data-tiers). Note that if you grant a role the Manage Partitions capability, users with that role will also have View Partitions and Manage S3 data forwarding capabilities. |
| View Scheduled Views | View [Scheduled Views](/docs/manage/scheduled-views). |
| Manage Scheduled Views  | View, create, edit, and delete [Scheduled Views](/docs/manage/scheduled-views). Note that if you grant a role the Manage Schedule View capability, users with that role will also have View Scheduled View capabilities. |
| Manage S3 data forwarding | [Manage S3 data forwarding](../../data-forwarding/data-forwarding-to-s3.md) from Sumo Logic to an S3 bucket. |
| Manage Content | Manage the content for your organization. This provides access to [Admin Mode](../../content-sharing/admin-mode.md) in the Library. |
| Manage Tokens | Manage [Installation Tokens](../../security/installation-tokens.md). |
| View Account Overview | View the Account Overview page. |
| View Parsers | View [Parsers] (/Cloud_SIEM_Enterprise/CSE_Schema/Parser_Editor). |


## Metrics

| Capability | Description |
|--|--|
| Manage Logs-to-Metrics | Create, edit, or delete [Logs-to-Metrics] (../../../Metrics/Logs-to-Metrics.md "Logs-to-Metrics") rules.  |
| Manage Metrics Transformation Rules | Create, edit, or delete [Metrics Transformation rules] (../../../Metrics/Metrics_Transformation_Rules.md "Metrics Transformation Rules").  |
| Manage Metric Rules | Create, edit, or delete [Metric Rules] (../../../Metrics/Metric_Rules_Editor.md "Metric Rules Editor"). |

## Security

| Capability | Description |
|--|--|
| Manage password policy | Set the password policy for your Sumo Logic account. |
| Allowlist IP addresses | [Explicitly grant access](../../security/create-allowlist-ip-cidr-addresses.md) to specific IP addresses or address ranges. |
| Create access keys | Allows users to create their own access keys on the [Preferences page](/docs/get-started/manage-account#my-preferences). |
| Manage access keys | [Set up, activate, deactivate, or delete access keys](../../security/access-keys.md) for your organization. |
| Manage support account access | Enable [management of the Sumo Logic support account](../../security/enable-support-account.md) for your organization. |
| Manage audit data feed. | [Enable and manage the Audit Index](../../security/audit-index.md), which provides information on the internal events that occur in your account associated with account management, user activity, and scheduled searches.  |
| Manage SAML | [Provision and manage SAML](../../security/saml/set-up-saml.md) for single sign-on to your Sumo Logic accounts. |
| Manage Share dashboards outside of the organization | [Share a dashboard] (../../../Visualizations-and-Alerts/Dashboards/Share_Dashboards/Share_a_Dashboard_Inside_Your_Org.md "Share Dashboards") with users who don't have access to Sumo Logic. |
| Manage organization settings | Users with this capability can configure a [concurrent user sessions limit](../../security/set-limit-user-concurrent-sessions.md) and enable the [Data Access Level for Shared Dashboards](../../security/data-access-level-shared-dashboards.md) security policy. |
| Change Data Access Level  | Users with this capability can change the [data access level] (../../../Visualizations-and-Alerts/Dashboards/Get-Started-with-Dashboards-and-Panels/Set_the_Data_Access_Level_for_a_Dashboard.md "Set the Data Access Level for a Dashboard") of dashboards or scheduled searches to which they have edit or manage permission. |

## Dashboards

| Capability | Description |
|--|--|
| Share dashboards with the allowlist | [Share dashboards] (../../../Visualizations-and-Alerts/Dashboards/Share_Dashboards/Share_a_Dashboard_Inside_Your_Org.md "Share Dashboards") in view-only mode with no login required. Viewers must be connecting from IP addresses specified in your [service allowlist] (../../../Visualizations-and-Alerts/Dashboards/Share_Dashboards/Share_a_Dashboard_Inside_Your_Org.md "Share Dashboards"). |
| Share dashboards with the world | [Share dashboards] (../../../Visualizations-and-Alerts/Dashboards/Share_Dashboards/Share_a_Dashboard_Inside_Your_Org.md "Share Dashboards") in view-only mode with no login required. Anyone with the URL can view the dashboard without logging in. |

## User Management

| **Capability** | **Description** |
|--|--|
| Manage users and roles  | Access the web app pages to manage [users](/docs/manage/users-and-roles/users) and [roles](/docs/manage/users-and-roles/roles). |

## Alerts

| Capability | Description |
|--|--|
| View Monitors | View [Monitors](/docs/alerts/monitors). |
| Manage Monitors  | Create, edit, share, and delete [Monitors](/docs/alerts/monitors). |
| View Alerts | View [Alerts] (../../../Visualizations-and-Alerts/Alerts/Monitors/Alert_Response.md "Alert Response").  |

## Organizations

| Capability | Description |
|--|--|
| View Organizations | View the [Organizations](../../manage-subscription/create-manage-orgs.md) UI. |
| Create Organizations | Create and provision child organizations. |
| Change Credits Allocation | Change the credits allocation for a child organization. |
| Create Trial Organizations  | Create trial organizations. (For Sumo Logic Service Providers only.) |
| Upgrade Trial Organizations | Upgrade trial organizations. (For Sumo Logic Service Providers only.) |
| Deactivate Organizations | Deactivate trial organizations. (For Sumo Logic Service Providers only.) |

## Cloud SIEM Enterprise

Cloud SIEM Enterprise (CSE) capabilities only appear in the Roles UI if
CSE has been enabled for your account.

| Capability | Description |
| -- | -- |
| View Cloud SIEM Enterprise | Users with a role that grants this capability will see a "Cloud SIEM Enterprise" link in the left-nav bar of the Sumo Logic UI. When a user clicks on the link, the CSE Heads-Up Display (HUD) will open.
| Comment on Insights | Add comments to Insights. |
| Create Insights | Create Insights. |
| Delete Insights | Delete Insights. |
| Invoke Insights Actions | Choose and run an action from the Actions menu for an Insight. |
| Manage Insight Assignee | Change the user that is assigned to an Insight. |
| Manage Insights Signals | Add Signals to Insights; remove Signals from Insights. |
| Manage Insight Status | Change the status of an Insight. |
| Manage Insight Tags | Add and delete tags assigned to Insights. |
| Manage Rules | Create, edit, and delete rules. |
| Manage Threat Intelligence | Create, edit, and delete threat intelligence sources.  |
| Manage Match Lists | Create, edit, and delete Match Lists. |
| Manage File Analysis | Create, edit, and delete YARA rules. |
| Manage Custom Insights | Create, edit, and delete custom Insights |
| Manage Network Blocks | Create, edit, and delete network blocks. |
| Manage Suppressed Entities | Suppress and unsuppress Entities. |
| Manage Mappings | Create, edit, and delete log mappings. |
| Manage Workflow | Create, edit, and delete Workflow statuses. |
| Manage Context Actions | Create, edit, and delete Context Actions. |
| Manage Actions | Create, edit, and delete the Actions. Actions are CSE notifications you can set up to occur automatically when certain state changes occur to Insights, sensors, or rules. Actions can also be invoked on-demand from an Insight in the CSE UI. |
| Manage Enrichments | Upload Insight, Signal, and Entity enrichments using the CSE API. |
| Manage Entity Normalization | Update the configurations on CSE’s Domain Normatization page. |
| Manage Entity Criticalityntries 2880/2882 dependencies 59/1190Create, edit, and delete Entity Criticalities.  |
| Manage Tag Schemas | Create, edit, and delete schema key tags, which can be attached to Insights, Signals, Entities, and Rules.  |
| Manage Favorite Fields | Add and remove favorite fields by clicking the star icon next to the fields in CSE Records. |

  
  
  
  
  
  
  
  
  
  
 
