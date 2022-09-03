---
id: configure-hosted-collector
title: Configure a Hosted Collector
sidebar_label: Configure a Hosted Collector
description: Hosted Collectors allow you to upload data stored in the cloud to Sumo Logic.
---

:::note
The maximum number of Collectors allowed per organization is 10,000.
:::

Steps to configure a Hosted Collector:

1. In Sumo Logic select **Manage Data \> Collection \> Collection**.
1. Click **Add Collector**.
1. Click **Hosted **Collector.
1. Provide a **Name** for the Collector.
1. A **description** is optional.
1. **Category**. Enter any string to tag the logs collected from this Collector. This Source Category value is stored in a searchable metadata field called `_sourceCategory`. See our [Best Practices: Good and Bad Source Categories](/docs/send-data/best-practices#good-and-bad-source-categories).
1. Click the **+Add Field** link in the **Fields** section. Define the fields you want to associate, each field needs a name (key) and value.

    * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
    * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.

1. **Assign to a Budget** allows you to assign an ingest budget to the Collector. The drop-down displays your ingest budgets in the following format:  

   * `<budget name> (<field value>) (<allocated capacity>)`

1. **Time Zone**. Set the default time zone when it is not extracted from the log timestamp. Time zone settings on Sources override a Collector time zone setting.
1. Review your input and when finished click **Save**.

    ![Add hosted collector.png](/img/send-data/add-hosted-collector.png)

1. After the Collector has been set up, it appears on the Collection page as a Hosted Collector.

    ![Collector-types-hosted](/img/send-data/Collector-types-hosted.png)

## Next Step: Configure a Source

Once you have configured your Hosted Collector, the next step is to configure Sources. 

For instructions, go to [Sources](/docs/send-data/collectors-sources), and click the link **Sources for Hosted Collectors**. 
