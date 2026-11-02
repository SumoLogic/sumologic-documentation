---
id: scheduled-report
title: Scheduled Report
sidebar_label: Scheduled Report (Email)
description: Schedule automated email delivery of Sumo Logic dashboards in PDF or PNG format to share insights with your team, including non-Sumo Logic users.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic scheduled reports email you a copy of a dashboard (PDF or PNG) on the schedule you choose, so you can get dashboard insights without logging in to Sumo Logic.

You can distribute the dashboard to people in your Sumo Logic organization who do not have access to the platform, which improves information sharing. Scheduled reports are also useful for compliance management because they automatically capture and archive the state of the dashboard.

:::info
- Scheduled reports are supported in the **Fed** environment.
- For PNG exports, you receive both an embedded copy and an attached copy of the dashboard in your email.
- If a PDF and/or PNG export fails, you’ll receive an error notification by email.
:::

## Create a scheduled report

To schedule a dashboard email report, do the following:

1. Navigate to the dashboard for which you want to create a schedule.
1. If the dashboard supports template variables, select values, if desired.
1. Click the kebab menu icon and select **Scheduled Reports**.<br/><img src={useBaseUrl('img/dashboards/scheduled_reports/create_scheduled_report.png')} alt="create_scheduled_report" style={{border: '1px solid gray'}} width="300"/>
  :::info
    The **Scheduled Reports** option appears only if you have edit permissions for the dashboard. You have edit permissions for all dashboards you create, and any dashboards that have been [shared](/docs/dashboards/share-dashboard-new/) with you with edit permissions granted.
  :::
1. Enter your preferences in the **Scheduled Reports** popup.<br/><img src={useBaseUrl('img/dashboards/scheduled_reports/scheduled_report.png')} alt="scheduled_report" style={{border: '1px solid gray'}} width="600"/>
   * **Select report type**. Choose the report format (PDF or PNG).
   * **Select report width**. Set the width of the report, in pixels, anywhere from 1,500 to 6,000. The default is 1,500. Increase the resolution for a sharper image on large displays, such as wall monitors or TV screens.
   * **Select theme**. Choose **Light** or **Dark** theme for the report. By default, the selected theme matches the dashboard's current theme.
   * **Select variables**. If the dashboard supports template variables, select the values you want to use in the scheduled report.
   * **Select Time Range**. Set the time range for the report by selecting a predefined interval from a dropdown list or by choosing a recently used time range.
   * **Select a frequency**. Choose the frequency settings for the scheduled dashboard report:
      * **Frequency**. Choose the frequency: Daily, Weekly, or Monthly.
      * **Every.** The options depend on the Frequency you selected.
         * **Daily.** Choose Every day, Weekdays, or Weekends.
         * **Weekly.** Choose a particular day of the week.
         * **Monthly.** Choose the day and week of the month when you want Sumo Logic to send the report.
      * **Time.** Choose the time of day when you want Sumo Logic to send the report.
      * **Time Zone.** Choose your time zone.
   * **Add recipients**.
      * **Email to.** Enter the email addresses to send the report to.
      * **Subject.** Enter a subject for the email.
      * **Message.** Enter the body of the email.
1. Click **Schedule**.
1. (Optional) Click **Schedule New Report** to create multiple scheduled reports for the dashboard. By allowing multiple reports from a single dashboard, you can save time, reduce effort, and ensure the delivery of critical insights to your team members and stakeholders. With scheduled reports, you can keep everyone informed with daily updates for your operations team or monthly summaries for executive reviews.<br/><img src={useBaseUrl('img/dashboards/scheduled_reports/scheduled_report_1.png')} style={{border: '1px solid gray'}} alt="Scheduled report settings" width="600"/>

:::note
Scheduled reports are allowed to run for a maximum of five minutes. Any panel that has not finished running its queries by then shows partial or empty data and an error message in the report.
:::

### Limitations

* Altering the template variables in the dashboard does not update the scheduled report.
* You can enter up to 10 email addresses to send the dashboard to.
* You can create a maximum of 20 scheduled reports for a dashboard.

## Edit a scheduled report

To update an existing scheduled report:

1. Navigate to the dashboard, then click the kebab menu and select **Scheduled Reports**.
1. Click the kebab menu and select **Edit** for the report you want to change. Or, double-click the scheduled report to edit it. <br/><img src={useBaseUrl('img/dashboards/scheduled_reports/update_scheduled_report_1.png')} alt="update_scheduled_report" style={{border: '1px solid gray'}} width="600"/>
1. Make your changes. When you're done, click **Update**. <br/><img src={useBaseUrl('img/dashboards/scheduled_reports/update_scheduled_report.png')} alt="update_scheduled_report" style={{border: '1px solid gray'}} width="600"/>

:::note
Toggle ON or OFF the status button to activate or deactivate the scheduled report.
:::

## Delete a scheduled report

To cancel a scheduled report:

1. Navigate to the dashboard, then click the kebab menu and select **Scheduled Reports** to open the scheduled reports list.
1. Click the kebab menu and select **Delete** for the report you want to delete.<br/><img src={useBaseUrl('img/dashboards/scheduled_reports/delete_scheduled_report_1.png')} alt="delete_scheduled_report" style={{border: '1px solid gray'}} width="600"/>
1. In the popup window, click **Delete**. <br/><img src={useBaseUrl('img/dashboards/scheduled_reports/delete_scheduled_report.png')} alt="delete_scheduled_report" style={{border: '1px solid gray'}} width="500"/>

## Duplicate a scheduled report

To duplicate an existing scheduled report:

1. Navigate to the dashboard, then click the kebab menu and select **Scheduled Reports** to open the scheduled reports list.
1. Click the kebab menu and select **Save As...** for the report you want to duplicate.<br/><img src={useBaseUrl('img/dashboards/scheduled_reports/duplicate_scheduled_report.png')} alt="update_scheduled_report" style={{border: '1px solid gray'}} width="600"/>
1. Make your changes. When you're done, click **Schedule**. <br/><img src={useBaseUrl('/img/dashboards/scheduled_reports/scheduled_report.png')} alt="update_scheduled_report" style={{border: '1px solid gray'}} width="600"/>

## Subscribe/unsubscribe to a scheduled report

:::info
You cannot unsubscribe if you are the only recipient.
:::

To subscribe to an existing scheduled report:

1. Navigate to the dashboard, then click the kebab menu and select **Scheduled Reports** to open the scheduled reports list.
1. Click the kebab menu and select **Subscribe** for the report you want to automatically add your email address to the list of recipients. <br/><img src={useBaseUrl('img/dashboards/scheduled_reports/subscribe_scheduled_report.png')} alt="update_scheduled_report" style={{border: '1px solid gray'}} width="600"/>
