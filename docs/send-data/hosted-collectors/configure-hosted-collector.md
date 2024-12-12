---
id: configure-hosted-collector
title: Configure a Hosted Collector and Source
sidebar_label: Configure a Hosted Collector and Source
description: Set up Hosted Collectors so you can move data to Sumo Logic from an Amazon S3 bucket and other sources like Microsoft, Cloud Syslog, Google, and HTTP.
---

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';

:::note
The maximum number of Collectors allowed per organization is 10,000.
:::

## Step 1: Configure Hosted Collector

Steps to configure a Hosted Collector:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. Click **Add Collector**.
1. Click **Hosted** Collector.
1. Provide a **Name** for the Collector. **Description** is optional.
1. **Category**. Enter any string to tag the logs collected from this Collector. This Source Category value is stored in a searchable metadata field called `_sourceCategory`. See our [Best Practices: Good and Bad Source Categories](/docs/send-data/best-practices#good-and-bad-source-categories).
1. Click the **+Add Field** link in the **Fields** section. Define the fields you want to associate, each field needs a name (key) and value.
    * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
    * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **Assign to a Budget** allows you to assign an ingest budget to the Collector. The dropdown displays your ingest budgets in the following format: `<budget name> (<field value>) (<allocated capacity>)`
1. **Time Zone**. Set the default time zone when it is not extracted from the log timestamp. Time zone settings on Sources override a Collector time zone setting.
1. Review your input and when finished click **Save**.<br/> ![Screenshot of the 'Add Hosted Collector' dialog box in Sumo Logic. The form includes fields for 'Name' (with 'Sumo' entered), 'Description,' 'Category,' and 'Fields' with an option to '+Add Field.' Additional options include 'Assign to a Budget,' set to 'Not Assigned,' and 'Time Zone,' set to '(UTC) Etc/UTC.' At the bottom are 'Cancel' and 'Save' buttons.](/img/send-data/add-hosted-collector.png)
1. After the Collector has been set up, it appears on the Collection page as a Hosted Collector. <br/> ![Screenshot showing a portion of the Sumo Logic interface. It displays the label '--00CH' with a 'Hosted' badge next to it, indicating a hosted status with a green checkmark.](/img/send-data/Collector-types-hosted.png)

## Step 2: Configure a Source

Once you've configured your Hosted Collector, the next step is to configure a Source(s). 

<div className="box-wrapper" >
<div className="box smallbox card">
  <div className="container">
  <img src='https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' alt="Thumbnail icon" width="65"/>
  <h4><a href="/docs/send-data/hosted-collectors/amazon-aws">Amazon Sources</a></h4>
  <p>Collect data from a variety of AWS products.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <img src={useBaseUrl('img/integrations/microsoft-azure/azure.png')} alt="Thumbnail icon" width="50"/>
  <h4><a href="/docs/send-data/hosted-collectors/microsoft-source/ms-office-audit-source">Microsoft Sources</a></h4>
  <p>Collect data from Microsoft Office 365 Audit.</p>
  </div>
</div>
    <div className="box smallbox card">
      <div className="container">
      <img src={useBaseUrl('img/integrations/google/google-logo.png')} alt="Thumbnail icon" width="50"/>
      <h4><a href="/docs/send-data/hosted-collectors/google-source">Google Sources</a></h4>
      <p>Collect data from Google products such as GCP.</p>
      </div>
    </div>
    <div className="box smallbox card">
      <div className="container">
      <img src={useBaseUrl('img/icons/business/cloud-ecosytem.png')} alt="Cloud icon" width="50"/>
      <h4><a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework">Cloud-to-Cloud Integration Framework Sources</a></h4>
      <p>Collect logs and events directly from your SaaS and Cloud platforms.</p>
      </div>
    </div>
    <div className="box smallbox card">
      <div className="container">
      <img src={useBaseUrl('img/icons/cloud/cloud-systems.png')} alt="Cloud icon" width="50"/>
      <h4><a href="/docs/send-data/hosted-collectors/cloud-syslog-source">Cloud Syslog Sources</a></h4>
      <p>Configure a syslog client to send RFC 5424-compliant messages to Sumo.</p>
      </div>
    </div>
    <div className="box smallbox card">
      <div className="container">
      <img src={useBaseUrl('img/send-data/http-logs-metrics.png')} alt="Thumbnail icon" width="50"/>
      <h4><a href="/docs/send-data/hosted-collectors/http-source">HTTP Sources</a></h4>
      <p>Receive logs, metrics, traces, and OTLP data uploaded to a unique URL generated for the Source.</p>
      </div>
    </div>
  </div>
