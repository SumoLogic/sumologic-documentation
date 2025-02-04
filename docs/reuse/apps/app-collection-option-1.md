To set up collection and install the app, do the following:

1. Select **App Catalog**.
1. In the 🔎 **Search Apps** field, run a search for your desired app, then select it.
1. Click **Install App**.
    :::note
    Sometimes this button says **Add Integration**.
    :::
1. In the **Set Up Collection** section of your respective app, select **Create a new Collector**.
    1. **Collector Name**. Enter a Name to display for the Source in the Sumo Logic web application. The description is optional.
    1. **Timezone**. Set the default time zone when it is not extracted from the log timestamp. Time zone settings on Sources override a Collector time zone setting.
    1. (Optional) **Metadata**.  Click the **+Add Metadata** link to add custom log [Metadata Fields](/docs/manage/fields). Define the fields you want to associate, each metadata field needs a name (key) and value.
        * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
        * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
    1. Click **Next**.
1. Configure the source as specified in the info above, ensuring all required fields are included.
1. In the **Configure** section of your respective app, complete the following fields.
    1. **Key**. Select either of these options for the data source.
        * Choose **Source Category** and select a source category from the list for **Default Value**.
        * Choose **Custom**, and enter a custom metadata field. Insert its value in **Default Value**.
1. Click **Next**. You will be redirected to the **Preview & Done** section.

**Post-installation**

Once your app is installed, it will appear in your **Installed Apps** folder, and dashboard panels will start to fill automatically.

Each panel slowly fills with data matching the time range query and received since the panel was created. Results will not immediately be available, but will update with full graphs and charts over time.
