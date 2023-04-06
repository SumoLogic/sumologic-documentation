---
id: scheduled-report
title: Scheduled Report
sidebar_label: Scheduled Report
description: Learn how to create, update, delete and export a scheduled dashboard report.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Scheduled dashboard enables you to receive a copy of the dashboard to your email address or alias periodically, in either PDF or PNG format. 

## How it helps

Scheduled dashboard email helps you to access the dashboard without logging into the Sumo Logic platform, which allows you to distribute the dashboard to any people in the organization who do not have access to the platform enabling better information sharing. Also, it is very useful for compliance management as it automatically captures and archives the state of the dashboard.

## Schedule a dashboard email

To schedule a dashboard email, do the following:

1. Navigate to the dashboard for which you want to create a schedule.
1. Select or enter a time range for the dashboard.
1. If the dashboard supports template variables, select values, if desired.
1. Choose **Create Scheduled Report** from the more options menu in the upper right hand corner of the dashboard.

    <img src={useBaseUrl('img/dashboards-new/scheduled_reports/create_scheduled_report.png')} alt="create_scheduled_report" width="230"/>

1. The **Schedule Report** popup appears.

    **Format.** Choose PDF or PNG.

    **Frequency.** Choose Daily, Weekly, or Monthly.

    **Every:** The options depend on the Frequency you selected.
    *  **Daily.** Choose Every day, Weekdays, or Weekends.
    * **Weekly.** Choose a particular day of the week.
    * **Monthly.** Choose which day of which week of the month you want the report to be sent.

    **Time.** Choose the time of day you want the dashboard to be sent.

    **Time Zone.** Choose your time zone.

    **Email to.** Enter the email address where you want the dashboard to be sent.

    **Subject.** Enter a subject for the email.

    **Message.** Enter the body of the email.

    <img src={useBaseUrl('img/dashboards-new/scheduled_reports/scheduled_report.png')} alt="scheduled_report>" width="450"/>

:::note
1. You can schedule only one export per dashboard.

1. Alterting the queries or template variables will not update the scheduled report.
:::

## Update a scheduled report

To update the existing scheduled dashboard email, do the following:

1. Navigate to the dashboard, and choose **Update Scheduled Report** from the more options menu in the upper right corner of the page. 

1. Make desired changes, and click **Update** to save them. 

<img src={useBaseUrl('img/dashboards-new/scheduled_reports/update_scheduled_report.png')} alt="update_scheduled_report" width="450"/>

## Delete a scheduled report

To delete a scheduled report, click the down arrow next to the Update button, and click **Delete Report**. 

<img src={useBaseUrl('img/dashboards-new/scheduled_reports/delete_scheduled_report.png')} alt="delete_scheduled_report" width="250"/>




