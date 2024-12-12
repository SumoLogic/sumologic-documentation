---
id: rotating-credentials-playbooks
title: Rotating Access Credentials Playbooks
sidebar_label: Rotating Access Credentials Playbooks
---

<head>
  <meta name="robots" content="noindex" />
</head>

:::note
If you are rotating your access credentials due to the potential security incident announced on November 7, 2023 in our Security Response Center, and require additional information, please refer to the details listed in the [Security Response Center](https://www.sumologic.com/security-response-center/) site, or contact our Support team via opening a ticket using our [Support Console](https://support.sumologic.com/support/s/). 
:::

## Rotating Sumo Logic access keys playbook

Use the playbooks below to assist you in rotating your Sumo Logic [access keys](/docs/manage/security/access-keys/).

### Rotate Sumo Logic access keys
To properly rotate an access key:
1. Identify the [access keys](/docs/manage/security/access-keys/) that need to be retired/rotated. 
2. Identify where the access keys are used in any scripts/apps.
3. Create a new access key in Sumo Logic and ensure that it is activated.
4. Replace old key in any scripts/apps with new access key.
5. Verify that any scripts/apps continue to work with new access key.
6. In the Sumo Logic UI, deactivate or delete old access key.

### Request Support to disable access keys for You
Sumo Logic Customer Support Engineers can disable your access keys internally.
**HOWEVER**, doing so unilaterally will break workflows in your environment that utilize those keys. If you would like our Customer Support Engineers to disable your access keys internally, please submit a support ticket using our [Support Console](https://support.sumologic.com/support/s/).

### Monitoring access keys
As a best practice, create a [scheduled search](/docs/alerts/scheduled-searches/) for tracking usage of access keys via API, using the following query. We recommend that these results are set as a scheduled search (which may be emailed to the correct contacts as a saved search), and to periodically review them for possible suspicious activity from unknown IP addresses.

```
_index=sumologic_audit_events accessId api
| json "operator.interface" as interface nodrop
| json "subsystem" nodrop
| json "eventName" nodrop
| json "operator.email" as user nodrop
| json "operator.accessId" as id nodrop
| json "operator.sourceIp" as ip nodrop
| formatDate(_messageTime, "yyyy-MM-dd HH:mm:ss") as date
| count as Total by date, ip, user, id, subsystem, eventname 
| order by date
```

## Rotate third-party credentials used in Webhook Connections playbook

Use the playbooks below to assist you in rotating any third-party credentials used in [Webhook Connections](/docs/alerts/webhook-connections/). This includes general outbound webhooks and outbound connections to other services (Slack, Jira, PagerDuty, etc).

### Rotating third-party credentials used in Webhook Connections
To properly rotate these credentials, identify the credentials that need to be retired/rotated. 
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Monitoring > Connection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Monitoring** select **Connections**. You can also click the **Go To...** menu at the top of the screen and select **Connections**. 
1. Select any Connections defined in your Sumo Logic Account.
1. For the Connections you have defined, create new access credentials where necessary (that is, API keys, passwords, authorization headers, etc).
1. Replace the old access credentials with the newly created access credentials.
1. Delete the old access credentials in the corresponding services you are making Connections to.

For more details on configuring specific Webhook Connections, please see our help docs on [Webhook Connections](/docs/alerts/webhook-connections/) for the corresponding Webhooks that you use in Sumo Logic.
