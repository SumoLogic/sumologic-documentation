---
id: scheduled-report
title: Scheduled Report
sidebar_label: Scheduled Report (Email)
description: Learn how to create, update, delete and export a scheduled dashboard report.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The **Scheduled Report** feature enables you to receive an emailed copy of a dashboard (PDF or PNG format) at the frequency of your choice, allowing you to get your dashboard insights without logging into the Sumo Logic platform.

You can distribute the dashboard to folks in your Sumo organization who do not have access to the platform, enabling better information sharing. It is also useful for compliance management, as it automatically captures and archives the state of the dashboard.

:::info
If a PDF export fails, an error email will be sent to your email ID.
:::

## Create a Scheduled Report

To schedule a dashboard email report, do the following:

1. Navigate to the dashboard for which you want to create a schedule.
1. Select or enter a time range for the dashboard.
1. If the dashboard supports template variables, select values, if desired.
1. Click the kebab menu and select **Create Scheduled Report**.<br/><img src={useBaseUrl('img/dashboards-new/scheduled_reports/create_scheduled_report.png')} alt="create_scheduled_report" width="230"/>
1. Enter your preferences in the **Schedule Report** popup.<br/><img src={useBaseUrl('img/dashboards-new/scheduled_reports/scheduled_report.png')} alt="scheduled_report>" width="450"/>
   * **Format.** Choose PDF or PNG.
   * **Frequency.** Choose Daily, Weekly, or Monthly.
   * **Every:** The options depend on the Frequency you selected.
      * **Daily.** Choose Every day, Weekdays, or Weekends.
      * **Weekly.** Choose a particular day of the week.
      * **Monthly.** Choose which day of which week of the month you want the report to be sent.
   * **Time.** Choose the time of day you want the dashboard to be sent.
   * **Time Zone.** Choose your time zone.
   * **Email to.** Enter the email addresses where you want the dashboard to be sent.
   * **Subject.** Enter a subject for the email.
   * **Message.** Enter the body of the email.

:::note
* You can schedule only one export per dashboard.
* Altering the queries or template variables will not update the scheduled report.
* You can enter up to 20 email addresses to which you want to send the dashboard.
:::

## Edit a Scheduled Report

To update an existing a Scheduled Report dashboard email:

1. Navigate to the dashboard, then click the kebab menu and select **Update Scheduled Report**.
1. Make desired changes and click **Update** to save them. <br/><img src={useBaseUrl('img/dashboards-new/scheduled_reports/update_scheduled_report.png')} alt="update_scheduled_report" width="450"/>

## Delete a Scheduled Report

To cancel a Scheduled Report:

1. Navigate to the dashboard, then click the kebab menu and select **Update Scheduled Report**.
1. Click the down arrow next to the **Update** button, then click **Delete Report**.

<img src={useBaseUrl('img/dashboards-new/scheduled_reports/delete_scheduled_report.png')} alt="delete_scheduled_report" width="250"/>
