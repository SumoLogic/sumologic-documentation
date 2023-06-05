---
id: construct-search-filter-for-role
title: Construct a Search Filter for a Role
description: Construct a role search filter to control what log data users with that role can access.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page describes how to define a search filter for a role. These instructions apply to Step 6 of the procedure detailed on the [Create a New Role](/docs/manage/users-roles/roles/create-manage-roles/) page.

## Index based 

An index based search filter allows or denies access to [search indexes](/docs/alerts/scheduled-searches/save-to-index/). 

1. [Create a role](/docs/manage/users-roles/roles/create-manage-roles#create-a-role).
1. Under **Search Filter**, select **Index based**.<br/><img src={useBaseUrl('img/users-roles/index-based-filter.png')} alt="Index based filter" style={{border: '1px solid black'}} width="400"/>
1. Select one of the following:
   * **All indexes**. Allow access to all indexes.
   * **Allow few indexes**. Allow access to only the selected indexes. Choose the indexes in the **Select Indexes** box that appears.
   * **Deny few indexes**. Deny access to the selected indexes. Choose the indexes in the **Select Indexes** box that appears.

## Advanced filter

An advanced filter allows access only to the logs that match the search filter. 

1. [Create a role](/docs/manage/users-roles/roles/create-manage-roles#create-a-role).
1. Under **Search Filter**, select **Advanced filter**.<br/><img src={useBaseUrl('img/users-roles/advanced-filter.png')} alt="Advanced filter" style={{border: '1px solid black'}} width="400"/>
1. Select one of the following:
   * **Log Analytics data filter**. Allow access to only the logs that match the defined conditions in log analytics [partition indexes](/docs/manage/partitions-data-tiers/run-search-against-partition/) and [LiveTail](/docs/search/live-tail/). 
   * **Audit data filter**. Allow access to only the logs that match the defined conditions in Sumo Logic [Audit Indexes](/docs/manage/security/audit-index/) and [LiveTail](/docs/search/live-tail/).
   * **Security data filter**. Allow access to only the logs that match the defined conditions in [Cloud SIEM security indexes](/docs/cse/records-signals-entities-insights/search-cse-records-in-sumo/) and [LiveTail](/docs/search/live-tail/). 
1. Enter search criteria. For examples, see [Understanding the advanced filter](#understanding-advanced-filters) below.

## Test search filters

1. Go to **Administration** > **Users and Roles** > **Roles**. 
1. Select a role with search filtering defined. 
1. Click **Emulate log search**. The search will be emulated for the search filters defined in the role. (In the example below, an index based search filter is defined.)<br/><img src={useBaseUrl('img/users-roles/emulate-log-search-index-based.png')} alt="Emulate log search for index based filter" style={{border: '1px solid black'}} width="400"/>
1. Enter your search parameters in the log search emulation window. The search will return only what is allowed by search filters defined in the role.<br/><img src={useBaseUrl('img/users-roles/emulate-log-search-window.png')} alt="Emulate log search window" style={{border: '1px solid black'}} width="800"/>

## Understanding the advanced filter

An advanced filter for a role defines what log data a user with that role can access. You can define a search filter using keywords, wildcards, metadata fields, and logical operators. Here is a simple role filter:

```sql
_sourceCategory=labs*
```

This filter grants access to logs whose `_sourceCategory` begins with the string “labs”. (Logs whose `_sourceCategory` don’t start with “labs” won’t be accessible.)

When a user with this filter enters a query like:

```sql
_sourcecategory=labs/apache | parse "* --" as src_ip | count by src_ip | sort _count
```

Sumo silently (it’s transparent to the user) adds the role filter to the beginning of the query with an AND:

```sql
_sourceCategory=labs* AND (_sourcecategory=labs/apache | parse "* --" as src_ip | count by src_ip | sort _count)
```

The example above positively grants access to log data. You can do the opposite: explicitly deny access to data, with an exclamation point (!). For example:

```
!_sourceCategory=JobX*
```

The role filter above denies access to log data whose  `_sourceCategory` begins with “JobX”. (Access to log data with other source category values is not restricted.)

The examples above are simple: they involve a single role, and hence a single role filter. 

Typically however, a Sumo user will have multiple roles. If a user has multiple roles, Sumo ORs the several role filters and prepends that expression to the user’s queries with an AND, as discussed in [Multiple role filters and filter precedence](#multiple-role-filters-and-filter-precedence).
  
### Search filter basics

The sections below list search filter limitations, and describe how you can use keywords, wildcards, metadata, and logical operators in filters. 

The explanations of the behavior of each example filter assume that no other role filters apply. In practice, you will likely assign multiple roles to users. After you understand the basics of how role filters work, see [Multiple role filters and filter precedence](#multiple-role-filters-and-filter-precedence).

#### Search filter limitations

* Role filters cannot include vertical pipes (\|).
* Role filters apply to log searches, not metric searches.
* If one or more of your FERs override the out-of-the-box metadata tags you use in your search filters for a role,  LiveTail can still provide access to data outside of the scope intended in your search filter. You should either avoid overriding out-of-the-box metadata tags in your FERs or avoid overridden tags in your search filters.
* The [_dataTier](/docs/manage/partitions-data-tiers/searching-data-tiers/) search modifier is not supported in role filters.
* For limitations related to the use of Scheduled Views or Partitions in a search filter, see [Using Partitions and Scheduled Views in a search filter](#using-partitions-and-scheduled-views-in-a-search-filter), below.

#### Using metadata in a search filter

You can use metadata fields in a role search filter. The following search filter grants access to log data from a Collector named “HR_Tools”, and no other data:

```sql
_collector=HR_Tools
```

When a user with that role filter runs a query, Sumo prepends the filter to the query with an AND:

```sql
_collector=HR_Tools AND <user-query>
```

#### Using AND and OR in a search filter

:::note
For information about using logical operators with Partitions and Scheduled Views in role filters, see [Using Partitions and Scheduled Views in a search filter](#using-partitions-and-scheduled-views-in-a-search-filter), below.
:::

You can use AND and OR in a search filter. For example, this role filter uses OR to grant access to log data from two source categories:

```sql
_sourceCategory=stock OR _sourceCategory=insurance
```

When a user with that role filter runs a query, Sumo prepends the filter to the query with an AND:

```sql
(_sourceCategory=stock OR _sourceCategory=insurance) AND <user-query>
```

This role filter below uses AND to grant access to log data with the source category “insurance” from the collector named “HR_Tools”:

```sql
_collector=HR_Tools AND _sourceCategory=insurance
```

When a user with that role filter runs a query, Sumo prepends the filter to the query with an AND:

```sql
(_collector=HR_Tools AND _sourceCategory=insurance) AND <user-query>
```

#### Using Partitions and Scheduled Views in a search filter

You can use Scheduled Views or Partitions in a search filter. For example, this role filter uses OR to grant access to log data from two partitions belonging to same tier:

```sql
(_index=indexA OR _index=indexB) 
```

When a user with that role filter runs a query, Sumo prepends the filter to the query with an AND:

```sql
(_index=indexA OR _index=indexB) AND <user-query>
```

This role filter below uses AND to grant access to log data with the partition “indexA” from the collector named “HR_Tools”:

`_collector=HR_Tools AND _index=indexA`

When a user with that role filter runs a query, Sumo  prepends the role filter to the  query with an AND:

```sql
(_collector=HR_Tools AND _index=indexA) AND <user-query>
```

When you use Scheduled Views or Partitions in a search filter,
keep limitations and considerations in mind:

* The use of a logical NOT to restrict access by Scheduled View or
    Partition is not supported. For example, you cannot use expressions
    like the following in a search filter:
    * `!index = ipso`
    * `!view = facto`
* If you refer to multiple Scheduled Views or Partitions in a search
    filter, you must separate them with an OR. For example, these are
    not valid search filters:
    * `_index=A _index = B`
    * `_index=A AND _index=B `

#### Using keywords in a search filter 

You can include a string you want to search for in a role search filter. This role filter grants access to logs from the collector named “HR_Tools” that contain the string “enrollment”: 

```sql
_collector=HR_Tools AND enrollment
```

When a user with that role filter runs a query, Sumo runs it like this:

```sql
(_collector=HR_Tools AND enrollment) AND <user-query>
```

#### Using wildcards in a search filter 

You can use an asterisk (\*) as a wildcard in a role search filter. This role filter grants access to logs from all collectors whose name begins with “HR”:

```sql
_collector=HR* 
```

When a user with that role filter runs a query, Sumo runs it like this:

```sql
_collector=HR* AND <user-query>
```

This role filter grants access to logs that contain the string “violation” from all collectors whose name begins with “HR”.

```sql
_collector=HR* AND violation
```

When a user with that role filter runs a query, Sumo runs it like this:

```sql
(_collector=HR* AND violation) AND <user-query>
```

This role filter grants access to logs that contain the string “violation” from partitions whose name starts with “app”:

```sql
_index=app* AND violation
```

When a user with that role filter runs a query, Sumo runs it like this:

```sql
(_index=app* AND violation) AND <user-query>
```

:::note
You can grant access to multiple Partitions using a wildcard only if the multiple Partitions reside in the same data tier. For example, if the filter `app*` matches partitions in two data tiers, it is not a valid search filter.
:::

#### Using ! as a NOT in a search filter

You can use an exclamation point character (!) in a role search filter to restrict, rather than allow, access. For example, this filter:

```sql
!_sourceHost=humanresources* AND !_sourceName=*finance* AND !_sourceCategory=*secret*
```

denies access to log data whose:  

* `_sourceHost` begins with “humanresources” 
* `_sourceName` contains “finance”
* `_sourceCategory` contains “secret”

When a user with that role filter runs a query, Sumo runs it like this:

```sql
(!_sourceHost=humanresources* AND !_sourceName=*finance* AND !_sourceCategory=*secret*) AND <your-query>
```

### Multiple role filters and filter precedence

When a user is assigned to multiple Sumo roles, Sumo combines the role filters from each of the roles using a logical OR to come up with the combined role filter.

When multiple roles filters are applied to a query, the least restrictive filter takes precedence. That this rule doesn’t apply if any of the role filters applied to a query is simply blank, which effectively grants access to all data, and would be the least restrictive filter. If the combined search filters applied to a query includes filters that are blank, the blank search filter is ignored and the next least restrictive filter takes precedence. So, if you actually want to grant a role access to all data, set the search filter to an asterisk (`*`). A search filter that is configured in that fashion will take precedence when combined with more restrictive search filters.

#### Example 1

Assume the following role filters.

| Role | Filter |
|:----------|:--------------------------------------------|
| Role A   | `_source="GCP Audit" AND _collector="GCP"` |
| Role B   | `_sourceCategory="Vx*"`                    |

Role A allows access to log data whose `_source` tag is “GCP Audit” and `_collector` tag is “GCP”. 

Role B Allows access to log data whose `_sourceCategory` tag begins with “Vx”.  

When a user with Roles A and B runs a query, Sumo applies the filters with an OR, and prepends them with an AND to your query, like this:

```sql
((_source="GCP Audit" AND _collector="GCP") OR _sourceCategory="Vx*")
AND <your-query>
```

The combined filters enable access to log data whose `_source` tag is “GCP Audit” and `_collector` tag is “GCP”, and to any log data whose `_sourceCategory` tag begins with “Vx”.

#### Example 2

Assume the following role filters.

| Role | Filter |
|:----------|:-------------------|
| Role A   | `_collector=fee*` |
| Role B   | `!_collector=fi*` |

Role A allows access only to log data whose `_collector` tag matches “fee\*”, and not to data whose `_collector` tag is any other value.

Role B Allows access to any log data whose `_collector` tag does not match “fi”.  

When a user with Roles A and B runs a query, Sumo combines the two filters with an OR, and prepends them with an AND to your query, like this:

```sql
(_collector=fee  OR !_collector=fi) AND <your-query>
```

**The least restrictive of the role filters takes precedence**. So, although Role A effectively restricts results to log data that matches `_collector=fee*`, Role B allows grants access to all collectors, except for those that match `_collector=fi*`. So, Role B takes precedence and Role A has no effect.

#### Example 3 

Assume the following role filters.

| Role | Filter |
|:----------|:----------------------------------|
| Role A   | `_sourceCategory=analytics-lab*` |
| Role B   | `_sourceCategory=analytics*`     |


Role A allows access only to log data whose `_sourceCategory` is “analytics-lab”.

Role B Allows access to log data whose `_sourceCategory` begins with “analytics”.

When a user with Roles A and B runs a query, Sumo combines the two filters with an OR, like this:

```sql
(_sourceCategory=analytics-lab OR _sourceCategory=analytics*) AND <your-query>
```

**The least restrictive of the role filters takes precedence.** Role A alone grants access to a log data from a single  source category, “analytics-lab”.  Role B grants access to log data to any source category that starts with “analytics”. Since the least restrictive filter takes precedence, data tagged `_sourceCategory=analyticsLong` could be returned in addition to data tagged `_sourceCategory=analytics-lab`.

#### Example 4

Assume the following role filters.

| Role | Filter |
|:----------|:------------------------------|
| Role A   | `_collector=prod*`           |
| Role B   | `!_sourceCategory=*shoguns*` |

Role A allows access to log data whose `_collector` tag matches “prod\*”, and not to data whose `_collector` tag does not.

Role B prevents access to log data whose `_sourceCategory` tag does contain “shoguns”. Data with any ` _sourceCategory` tag that does not contain “shoguns” is available. 

When a user with Roles A and B runs a query, Sumo combines the two filters with an OR, and prepends them with an AND to your query, like this:

```sql
(_collector=prod* OR !_sourceCategory=*shoguns*) AND <your-query>
```

Role B is the least restrictive. Users with the combined role filter will be able to view any log data whose  `_sourceCategory` does not contain the string “shoguns”, regardless of the value of the `_collector` tag.

#### Example 5

Assume the following role filters.

| Role | Filter |
|:----------|:----------------------|
| Role A   | `_index=sumologic*`  |
| Role B   | Blank search filter  |

Role A allows access to all indexes whose name starts with "sumologic".

Role B, with a blank search filter (user did not enter anything as the search filter for the role), allows access to all data.

When a user with Roles A and B runs a query, Sumo combines the two filters and since Role B has a blank search filter, the more restrictive search filter, Role A, takes precedence. Users with the combined role filter will be able to  view any log data in any of the indexes prefixed with "sumologic".
