---
id: scheduled-report
title: Scheduled Report
sidebar_label: Scheduled Report (Email)
description: Learn how to create, update, delete and export a scheduled dashboard report.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The scheduled report feature enables you to receive an emailed copy of a dashboard (PDF or PNG format) at the frequency of your choice, allowing you to get your dashboard insights without logging into the Sumo Logic platform.

You can distribute the dashboard to people in your Sumo Logic organization who do not have access to the platform, enabling better information sharing. It is also useful for compliance management, as it automatically captures and archives the state of the dashboard.

:::info
If a .pdf and/or .png export fails, an error email will be sent to your email ID.
:::

## Create a scheduled report

To schedule a dashboard email report, do the following:

1. Navigate to the dashboard for which you want to create a schedule.
1. Select or enter a time range for the dashboard.
1. If the dashboard supports template variables, select values, if desired.
1. Click the kebab menu and select **Create Schedule Report**. <br/><img src={useBaseUrl('img/dashboards-new/scheduled_reports/create_scheduled_report.png')} alt="Create Schedule Report option selected on the dropdown menu" width="200"/>
    :::info
    The **Create Schedule Report** option appears only if you have edit permissions for the dashboard. You have edit permissions for all dashboards you create, and any dashboards have been [shared](/docs/dashboards/share-dashboard-new/) with you with edit permissions granted.
    ::: 
1. Enter your preferences in the **Schedule Report** dialog. <br/><img src={useBaseUrl('img/dashboards-new/scheduled_reports/scheduled_report.png')} alt="Schedule Report dialog" width="600"/>
   * **Format.** Choose PDF or PNG.
   * **Frequency.** Choose Daily, Weekly, or Monthly.
   * **Every:** The options depend on the Frequency you selected.
      * **Daily.** Choose Every day, Weekdays, or Weekends.
      * **Weekly.** Choose a particular day of the week.
      * **Monthly.** Choose which day of which week of the month you want the report to be sent.
   * **Time.** Choose the time of day you want the dashboard to be sent.
   * **Time Zone.** Choose your time zone.
   * **Email to.** Enter the email addresses where you want the report to be sent.
   * **Subject.** Enter a subject for the email.
   * **Message.** Enter the body of the email.

:::note
Scheduled reports are allowed to run for a maximum of five minutes. Any panel that has not completed running its queries at this time will have partial or empty data in the panel with an error message in the report.
:::

### Limitations

* You can schedule only one export per dashboard.
* Altering the queries or template variables will not update the scheduled report.
* You can enter up to 20 email addresses to which you want to send the report.

## Edit a scheduled report

To update an existing a scheduled report dashboard email:

1. Navigate to the dashboard, then click the kebab menu and select **Update Scheduled Report**.
1. Make desired changes and click **Update** to save them. <br/><img src={useBaseUrl('img/dashboards-new/scheduled_reports/update_scheduled_report.png')} alt="Update button on the Schedule Report dialog" width="450"/>

## Delete a scheduled report

To cancel a scheduled report:

1. Navigate to the dashboard, then click the kebab menu and select **Update Scheduled Report**.
1. Click the down arrow next to the **Update** button, then click **Delete Report**. <br/><img src={useBaseUrl('img/dashboards-new/scheduled_reports/delete_scheduled_report.png')} alt="Delete Report button" width="250"/>
