---
id: migrate-audit-logging
title: Migrating Audit Logs Queries from Role V1 to V2
description: Learn to migrate from V1 to V2 audit logging by changing the search queries.
---

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

With [audit data filtering](/docs/manage/users-roles/roles/rbac-for-indexes/), role audit log lines for role creation and modification will be changed and we recommend you migrate the search from V1 to V2 audit logging. With advanced search filters added you can obtain more granular information about the selected role. The `filterPredicate` field in V1 audit logging is replaced with `logAnalyticsFilter`, `auditDataFilter`, and `securityDataFilter` fields in V2. In addition, we have also added `selectionType` and `selectedViews` fields to apply RBAC for indexes.

Currently, [Roles Management APIs v2](/docs/api/role-management-v2) records both the V1 and V2 log line changes.

:::note
V2 changes are **only** applicable for `RoleUpdate` and `RoleCreated` events.
:::

<br/><img src={useBaseUrl('img/users-roles/JSON-diff-V1-V2.png')} alt="JSON-diff-V1-V2" style={{border: '1px solid gray'}} width="800"/>

For example, consider you are interested in querying upon audit logs with change in `RoleUpdated` or `RoleCreated` events. Now, if you perform this search you will initially see the V1 type of event in the search results. However, to view the results with the V2 event type, you are required to adjust the parameters in the query.

```sql title="V1 Audit Logging"
(_index=sumologic_audit_events)
| json fields=_raw "roleIdentity.roleName" as role_name
| json fields=_raw "eventTime" as eventTime
| json fields=_raw "role.filterPredicate" as create_role
| json fields=_raw "to.filterPredicate" as update_role
| json fields=_raw "operator.email" as actor
| json fields=_raw "eventName" | where eventName matches "RoleCreated" OR eventName="RoleUpdate"
| count by eventTime, eventName, actor, role_name, create_role, update_role
```

```sql title="V2 Audit Logging"
(_index=sumologic_audit_events)
| json fields=_raw "roleIdentity.roleName" as role_name
| json fields=_raw "eventTime" as eventTime
| json fields=_raw "role.logAnalyticsFilter" as created_log_analytics_filter
| json fields=_raw "role.auditDataFilter" as created_audit_data_filter
| json fields=_raw "to.logAnalyticsFilter" as updated_log_analytics_filter
| json fields=_raw "to.auditDataFilter" as updated_audit_data_filter
| json fields=_raw "operator.email" as actor
| json fields=_raw "eventName" | where eventName matches "RoleCreatedV2" OR eventName="RoleUpdateV2"
| count by eventTime, eventName, actor, role_name, created_log_analytics_filter, created_audit_data_filter, updated_log_analytics_filter, updated_log_analytics_filter
```