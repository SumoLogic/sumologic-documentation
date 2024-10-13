---
id: migrate-audit-logging
title: Migrate Audit Logging
description: Learn to migrate from V1 to V2 audit logging by changing the search queries.
---

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

This document outlines the migration process from V1 to V2 audit logging by modifying the search queries. The `filterPredicate` field in V1 audit logging is replaced with `logAlayticsFilter`, `auditDataFilter`, and `securityDataFilter` fields in V2. In addition, we have also added `selectionType` and `selectedViews` fields (what benefit with this?)

Currently, both the log lines of V1 and V2 will be accessible for RBAC indexes query.

:::note
V2 changes are only applicable for `RoleUpdate` and `RoleCreated` events.
:::

<br/><img src={useBaseUrl('img/users-roles/JSON-diff-V1-V2.png')} alt="JSON-diff-V1-V2" style={{border: '1px solid gray'}} width="800"/>

For example, consider you are interested in searching a customer-specific query with a change in `roleupdated` or `rolecreated` events. Now, if you perform this search you will initially see the V1 type of event in the search results. However, to view the results with the V2 event type, you are required to adjust the parameters in the query.

```sql title="V1 Audit Logging"


```

```sql title="V2 Audit Logging"


```