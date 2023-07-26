---
id: role-capabilities
title: Role Capabilities
description: Assign any of these capabilities when you create user roles.
---


Following are just some of the capabilities you can assign when you [create roles](create-manage-roles.md).

## Data Management

<table>
  <tr>
   <td><strong>Capability</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>Manage connections
   </td>
   <td>Manage the <a href="/docs/manage/connections-integrations">connections</a> that allow you to send alerts to other tools.
   </td>
  </tr>
  <tr>
   <td>Manage Collectors
   </td>
   <td><a href="/docs/send-data">Install and manage</a> and Installed/Hosted Collectors and Sources. Manage permission automatically includes view permission.
   </td>
  </tr>
  <tr>
   <td>Manage Ingest Budgets
   </td>
   <td>Manage <a href="/docs/manage/ingestion-volume/ingest-budgets">ingest budgets</a>. Enabling this will automatically enable the Manage Collectors capability. The Manage Collectors capability on its own permits the re-assignment of budgets to different Collectors, but not creating or deleting them.
   </td>
  </tr>
  <tr>
   <td>Manage data volume feed
   </td>
   <td><a href="/docs/manage/ingestion-volume/data-volume-index">Enable and manage the data volume index</a> for your account to avoid using <a href="/docs/manage/manage-subscription/cloud-flex-accounts#Account-Capacity-Limitations">On-Demand Capacity</a>, and to determine when you need to upgrade your account.
   </td>
  </tr>
  <tr>
   <td>View Collectors
   </td>
   <td>View Collectors and Sources that have already been installed or added.
   </td>
  </tr>
  <tr>
   <td>View fields
   </td>
   <td>View <a href="/docs/manage/fields">fields</a>, which are custom metadata fields you can assign to logs.
   </td>
  </tr>
  <tr>
   <td>Manage fields
   </td>
   <td>Manage <a href="/docs/manage/fields">fields</a>, which are custom metadata fields you can assign to logs.
<p>Note that if you grant a role the Manage Fields capability, users with that role will also have the View Fields and View field extraction rules capabilities.</p>
   </td>
  </tr>
  <tr>
   <td>View field extraction rules
   </td>
   <td>View <a href="/docs/manage/field-extractions">field extraction rules</a>, which speed the search process by automatically parsing fields as log messages are ingested.
   </td>
  </tr>
  <tr>
   <td>Manage field extraction rules
   </td>
   <td><a href="/docs/manage/field-extractions">Manage field extractions</a>, which speed the search process by automatically parsing fields as log messages are ingested.
<p>Note that if you grant a role the Manage field extraction rules capability, users with that role will also have the Manage Fields, View Fields, and View field extraction rules capabilities.</p>
   </td>
  </tr>
  <tr>
   <td>View Partitions
   </td>
   <td>View <a href="/docs/manage/partitions-data-tiers">Partitions</a>.
   </td>
  </tr>
  <tr>
   <td>Manage Partitions
   </td>
   <td>View, create, edit, and delete <a href="/docs/manage/partitions-data-tiers">Partitions</a>.
<p>Note that if you grant a role the Manage Partitions capability, users with that role will also have View Partitions and Manage S3 data forwarding capabilities.</p>
   </td>
  </tr>
  <tr>
   <td>View Scheduled Views
   </td>
   <td>View <a href="/docs/manage/scheduled-views">Scheduled Views</a>.
   </td>
  </tr>
  <tr>
   <td>Manage Scheduled Views
   </td>
   <td>View, create, edit, and delete <a href="/docs/manage/scheduled-views">Scheduled Views</a>. Note that if you grant a role the Manage Schedule View capability, users with that role will also have View Scheduled View capabilities.
   </td>
  </tr>
  <tr>
   <td>Manage S3 data forwarding
   </td>
   <td><a href="/docs/manage/data-forwarding/amazon-s3-bucket">Manage S3 data forwarding</a> from Sumo Logic to an S3 bucket.
   </td>
  </tr>
  <tr>
   <td>Manage Content
   </td>
   <td>Manage the content for your organization. This provides access to <a href="/docs/manage/content-sharing/admin-mode">Admin Mode</a> in the Library.
   </td>
  </tr>
  <tr>
   <td>Manage Tokens
   </td>
   <td>Manage <a href="/docs/manage/security/installation-tokens">Installation Tokens</a>.
   </td>
  </tr>
  <tr>
   <td>View Account Overview
   </td>
   <td>View the Account Overview page.
   </td>
  </tr>
  <tr>
   <td>View Parsers
   </td>
   <td>View <a href="/docs/cse/schema/parser-editor">Parsers</a>.
   </td>
  </tr>
  <tr>
   <td>Download Search Results
   </td>
   <td><a href="/docs/search/get-started-with-search/search-basics/export-search-results">Export</a> log query results to a .csv file.
   </td>
  </tr>
</table>



## Metrics

<table>
  <tr>
   <td><strong>Capability</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>Manage Logs-to-Metrics
   </td>
   <td>Create, edit, or delete <a href="/docs/metrics/logs-to-metrics">Logs-to-Metrics</a> rules.
   </td>
  </tr>
  <tr>
   <td>Manage Metrics Transformation Rules
   </td>
   <td>Create, edit, or delete <a href="/docs/metrics/metrics-transformation-rules">Metrics Transformation rules</a>.
   </td>
  </tr>
  <tr>
   <td>Manage Metric Rules
   </td>
   <td>Create, edit, or delete <a href="/docs/metrics/metric-rules-editor">Metric Rules</a>.
   </td>
  </tr>
</table>



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



