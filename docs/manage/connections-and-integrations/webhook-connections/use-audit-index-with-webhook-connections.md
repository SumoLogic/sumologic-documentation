---
id: use-the-audit-index-with-webhook-connections
---

# Use the Audit Index with Webhook Connections

The [Audit Index] (../../Security/Audit-Index.md "Audit Index") provides event logs for scheduled search activity, including results sent via a webhook connection. The following steps show you how to query the Audit Index for webhook activity from scheduled searches. You can review the raw event log messages to customize a more valuable query as needed.

1. Ensure the [Audit Index is enabled] (../../Security/Audit-Index.md "https://sumologic-prod.mindtouch.us/Manage/Indexes/Manage_the_Audit_Index") in your account.
1. Run the following query with the desired time range: 

    ```sql
    _index=sumologic_audit _sourcecategory="scheduled_search" action="MODIFY"
    | parse "[AlertType=*]" as alertType
    | where alertType="webhook"
    ```

1. To see which user is sending scheduled searches results to webhooks, view the **sourceuser** field. A full list of available fields is available in the [Audit event message fields table] (../../Security/Audit-Index.md "Audit Index").
