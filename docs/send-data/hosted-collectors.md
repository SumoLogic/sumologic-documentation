---
id: hosted-collectors
---

# Hosted Collectors

A **Hosted Collector** is not installed on a local system in your deployment. Instead, Sumo Logic hosts the Collector and its Sources in AWS. With a Hosted Collector, you can create Sources to collect data from various services. A single Hosted Collector can be configured with any number of  Sources.

Data collection flow for S3 buckets and HTTP requests:

![team built hosted diagram.png](/img/send-data/team-built-hosted-diagram.png)

Just as Installed Collectors, you can monitor the activity of Hosted Collectors using the Status tab of the Sumo Logic Web Application.

:::note
The maximum number of Collectors allowed per organization is 10,000.
:::

## Micro Lesson: Hosted Collector Overview

<Iframe url="https://www.youtube.com/embed/bjbTm3vR2nA"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        />

import Iframe from 'react-iframe';

## Create a Hosted Collector

1. In Sumo Logic select **Manage Data \> Collection \> Collection**.
1. Click **Add Collector**.
1. Click **Hosted Collector**.
1. Provide a **Name** for the Collector.
1. A **description** is optional.
1. **Category**. Enter any string to tag the logs collected from this Collector. This Source Category value is stored in a searchable metadata field called `_sourceCategory`. See our [Best Practices: Good Source Category, Bad Source Category](design-deployment/best-practices-source-categories.md).

1. Click the **+Add Field** link in the **Fields** section. Define the fields you want to associate, each field needs a name (key) and value.

    * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema. 
    * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.

1. **Assign to a Budget** allows you to assign an ingest budget to the Collector. The drop-down displays your ingest budgets in the following format:  

   * `<budget name> (<field value>) (<allocated capacity>)`

1. **Time Zone**. Set the default time zone when it is not extracted from the log timestamp. Time zone settings on Sources override a Collector time zone setting.

1. Review your input and when finished click **Save**.

    ![add-hosted-collector.png](/img/send-data/add-hosted-collector.png)

1. After the Collector has been set up, it appears on the Collection page as a Hosted Collector.
   
    ![Collector-types-hosted](/img/send-data/Collector-types-hosted.png)

## Next Step: Configure a Source

Once you have configured your Hosted Collector, the next step is to configure Sources. See all of the available [Sources supported on Hosted Collectors](Sources/02Sources-for-Hosted-Collectors.md "Sources for Hosted Collectors").
