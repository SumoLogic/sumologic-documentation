---
id: role-management-v2
title: Role Management APIs V2 (Beta)
sidebar_label: Roles V2
description: Role Management APIs V2 (Beta) allow you to manage roles from HTTP endpoints.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/operations/role-based-access.png')} alt="icon" width="50"/>

<p> <a href="/docs/beta"><span className="beta">Beta</span></a> </p>

Roles determine the functions that users are able to perform in Sumo Logic. The Role Management API (V2) allows you to configure access on partitions and manage roles from HTTP endpoints.

To manage roles, you must have an administrator role or your role must have been assigned the [Manage Users and Roles](/docs/manage/users-roles/) capability.

## Documentation

<ApiIntro/>

| Deployment | Documentation URL                                      |
|:------------|:--------------------------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag/roleManagementV2  |
| CA         | https://api.ca.sumologic.com/docs/#tag/roleManagementV2  |
| DE         | https://api.de.sumologic.com/docs/#tag/roleManagementV2  |
| EU         | https://api.eu.sumologic.com/docs/#tag/roleManagementV2  |
| FED        | https://api.fed.sumologic.com/docs/#tag/roleManagementV2 |
| IN         | https://api.in.sumologic.com/docs/#tag/roleManagementV2  |
| JP         | https://api.jp.sumologic.com/docs/#tag/roleManagementV2  |
| KR         | https://api.kr.sumologic.com/docs/#tag/roleManagementV2  |
| US1        | https://api.sumologic.com/docs/#tag/roleManagementV2     |
| US2        | https://api.us2.sumologic.com/docs/#tag/roleManagementV2 |

## Migrate audit logs queries from Role Management API V1 to V2

If you use role-based [audit data filtering](/docs/manage/users-roles/roles/create-manage-roles/#create-a-role), we recommend you migrate the search from V1 to V2 audit logging. 

With advanced search filters added, you can obtain more granular information about the selected role. The `filterPredicate` field in V1 audit logging is replaced with `logAnalyticsFilter`, `auditDataFilter`, and `securityDataFilter` fields in V2. In addition, we have also added `selectionType` and `selectedViews` fields to apply for audit data filtering.

Currently, Role Management APIs V2 records both the V1 and V2 log line changes.

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

## Required role capabilities

<ApiRoles/>

* User Management (all role capabilities)

