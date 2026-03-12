---
id: alerts
title: SLO Alerts and Notifications
description: Learn how to create SLO alerts.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can create one or more alert monitors as needed for your SLO. We recommend creating separate monitors for SLI-based and burn rate-based condition types. You can access SLO monitors through your SLO details or from the monitors list page.

You will receive notifications according to monitor configurations, such as email messages and Slack channel posts. Use the variable `{{SloDashboardUrl}}` in your connection payloads, which will generate an SLO dashboard link in notifications. This variable will be included automatically in email notifications.

The [Alert Response](/docs/alerts/monitors/alert-response) page is not supported for SLO-based monitors at this time. Notifications will provide access to the SLO dashboard when warning and critical triggers occur.

Monitor notifications may auto-resolve. See [Auto-resolving notifications](#auto-resolving-notifications) for details according to the evaluation type (Windows or Request) and compliance type (Calendar or Rolling).

You can create one condition type for your SLO monitor, either an SLI trigger or error budget trigger. You can create one condition type for your SLO monitor, either a SLI condition or error budget condition. We support configuring a threshold value per critical and warning trigger for that condition type.

## Create an SLO monitor

You have two options to create an SLO monitor:
* Select **Save and Create Monitor** when creating an SLO. <br/><img src={useBaseUrl('img/observability/button-save-create-monitor.png')} alt="Reliability Management SLO SLI" style={{border: '1px solid gray'}} width="200" />
* Go to the **Monitors** tab, select **Add** > **New Monitor**, then select the SLO option. <br/><img src={useBaseUrl('img/observability/button-new-monitor.png')} alt="Reliability Management SLO SLI" style={{border: '1px solid gray'}} width="100" />

When you click **Save and Create Monitor**, a New Monitor dialog loads:
1. For the **Monitor Type**, select **SLO**. When creating from the **Monitors** tab, select an SLO from the dropdown menu. A preview of the SLO loads on the page. <br/><img src={useBaseUrl('img/observability/ani-new-monitor1.gif')} alt="Reliability Management SLO SLI" style={{border: '1px solid gray'}} width="800" />
2. Select and configure a condition type:
   * For the **SLI Condition Type**, you can select to alert when the SLI is below an entered percentage, as it nears your SLI target. For example, you could set this to 99.1% to raise a critical alert when it is getting close to a target of 99%. <br/><img src={useBaseUrl('img/observability/slo-monitor-sli.png')} alt="Reliability Management SLO SLI" style={{border: '1px solid gray'}} width="200"/>
   * For the **Burn Rate Condition Type**, create an alert indicating critical and warning conditions based on burn rate or the rate at which error budget is depleted. Enter a percentage depleted within an amount of minutes, hours, or days. For example, a critical alert for 10% depletion within 3 hours indicates the error budget is depleting quickly.<br/><img src={useBaseUrl('img/observability/slo-monitor-burn.png')} alt="Reliability Management SLO SLI" style={{border: '1px solid gray'}} width="350"/>
3. Under **Notifications**, select your preferred **Connection Type** for sending messages via email, Slack, webhook, or other methods. Select **Alert** and/or **Recovery** to notify for **Critical** and **Warning** triggers. You can add as many notifications as needed. A message is sent with a link to the SLO dashboard to investigate.<br/><img src={useBaseUrl('img/observability/slo-monitor-notifications.png')} alt="Reliability Management SLO SLI" style={{border: '1px solid gray'}} width="800" />

  For example, to set up a Slack notification, select **Slack** from the dropdown menu and edit the **Payload** as needed. The following information shows the default settings: <br/><img src={useBaseUrl('img/observability/slack-payload.png')} alt="Reliability Management SLO SLI" style={{border: '1px solid gray'}} width="800" />
4. For **Monitor Details**, enter the following information:
    * **Name**. Name for the monitor.
    * **Location**. Path for the monitor, default is /Monitor.
    * **Description**. Optional description for the monitor.
    * **Playbook**. Optional playbook for handling these monitors and situations if an issue occurs.<br/><img src={useBaseUrl('img/observability/slo-monitor-detals.png')} alt="Reliability Management SLO SLI" style={{border: '1px solid gray'}} width="800" />
5. Click **Save**.


## Auto-resolving notifications

SLO monitors in a triggered state can auto-resolve. See the following table for details.

| EvaluationType | ComplianceType | MonitorConditionType | Auto-resolves |
|---|---|---|---|
| Window | Calendar | SLITrigger | No. SLI never recovers within the same compliance period as the triggered alert, but it can recover in a different compliance period. So the monitor can auto-resolve then. New alert is created for each compliance period. Monitor status is based on latest compliance period’s alert status. |
| Window | Calendar | ErrorBudgetTrigger | Yes, if the error budget consumed is less than the alert threshold for a complete detection window. Resolution behavior is same as log monitors. |
| Window | Rolling | SLITrigger | Same as “Window-Calendar”. Separate alert is triggered for each compliance period. |
| Window | Rolling | ErrorBudgetTrigger | Same as “Window-Calendar”. |
| Request | Calendar | SLITrigger | Yes, when SLI value goes above alert threshold. A new alert is created for each compliance period. Monitor status is based on the latest compliance period’s alert status. |
| Request | Calendar | ErrorBudgetTrigger | Same as “Window-Calendar”. |
| Request | Rolling | SLITrigger | Same as “Request-Calendar”. Separate alert for each compliance period. |
| Request | Rolling | ErrorBudgetTrigger | Same as “Window-Calendar”. |

### Notification example

When a notification is sent, it includes information from the alert and a link to load the dashboard. Below is an example of a critical alert email notification. See [SLO Dashboards](/docs/observability/reliability-management-slo/dashboards) for information.<br/><img src={useBaseUrl('img/observability/slo-email-alert.png')} alt="Reliability Management SLO SLI" style={{border: '1px solid gray'}} width="350"/>


### Resolution email example

<img src={useBaseUrl('img/observability/resolution-email.png')} alt="Reliability Management SLO SLI" style={{border: '1px solid gray'}} width="350"/>

## Installing AWS SLO monitors via Terraform

AWS ELB users can now install Sumo Logic out-of-the-box SLOs and associated monitors using [this Sumo Logic Terraform script](https://github.com/SumoLogic/sumologic-solution-templates/tree/master/slo_packages/aws).

The script allows you to install Sumo Logic SLOs in your specified AWS ELB directory and configure SLO alert notifications (that is, latency limit breached, server error limit breached). Once installed, you can view and edit your SLO alerts via Terraform or from your Sumo Logic **Monitors** page.

## Limitations

* [Alert Responses](/docs/alerts/monitors/alert-response) are not yet supported for SLO-based monitors. Notifications will provide information and links to SLO dashboards.
* It is not possible to create an SLO on top of an SLO monitor.
