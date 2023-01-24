---
id: edit-collector
title: Edit a Collector
description: Edit some characteristics of a Collector, including its name, version, description, Host Name, and Category.
---


From the **Manage Collection** page, you can edit some characteristics of a Collector, including its name, description, Host Name, and Category.

:::important
Changes to metadata are applied to messages going forward from this point in time, and aren't applied retroactively.
:::

## Edit an Installed Collector

1. In Sumo Logic, select **Manage Data > Collection > Collection**.
1. Click the Installed Collector name, or click **Edit** on the right of the table row.
1. Make your changes. Note that updated metadata is only be applied to newly ingested data; previously uploaded data retains its original metadata.
    * The Collector version is provided for reference and can be changed.
    * If you set **Host Name** or **Category** at the Collector level, then all Sources belonging to this Collector are tagged with these metadata fields. If you later specify metadata at the Source level, the Collector metadata will be overwritten.
    * Click the **Add Field** link in the **Fields** section if you want to assign metadata [fields](/docs/manage/fields.md) to the Collector. Define the fields you want to associate, each field needs a key and value.
      * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
      * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
    * **Assign to a Budget** allows you to assign an [ingest budget](/docs/manage/ingestion-volume/ingest-budgets) to the Collector. The dropdown displays your ingest budgets in the following format:
        ```xml
        <budget name> (<field value>) (<allocated capacity>)
        ```
1. Click **Advanced** to set a [CPU Usage Target](set-collector-cpu-usage-target.md), or to change the Collector management method you're using. You can switch to **Cloud Based Management** at any time by changing the setting here and saving, your JSON configuration will be ignored once changed to Cloud Based. To switch to **Local Configuration File** there are a few steps you'll need to do, see [Local Configuration File Management](/docs/send-data/use-json-configure-sources/local-configuration-file-management) for details.   <br/>  ![Edit installed collector.png](/img/collector/edit-installed-collector.png)
1. Click **Save** to apply your changes.

## Edit a Hosted Collector

1. In Sumo Logic, select **Manage Data > Collection > Collection**.
1. Click the Hosted Collector name, or click **Edit** to the right of the Collector name.<br/>  ![edit hosted collector.png](/img/collector/edit-hosted-collector.png)
1. Change the name or change the metadata fields as needed. Note that updated metadata is only be applied to newly ingested data; previously uploaded data retains its original metadata.
   * If you set **Category** at the collector level, then all sources belonging to this collector are tagged with that value. If you later specify metadata at the source level, the collector metadata will be overwritten.
   * Define the [**Fields**](/docs/manage/fields.md) you want to associate, each field needs a key and value. 
     * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
     * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
   * **Assign to a Budget** allows you to assign an [ingest budget](/docs/manage/ingestion-volume/ingest-budgets) to the Collector. The dropdown displays your ingest budgets in the following format:
        ```
        <budget name> (<field value>) (<allocated capacity>)
        ```
1. Click **Save** to apply your changes.
