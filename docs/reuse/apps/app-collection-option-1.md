To set up collection and install the app, do the following:
:::note
    Next-Gen App: To install or update the app, you must be an account administrator or a user with Manage Apps, Manage Monitors, Manage Fields, Manage Metric Rules, and Manage Collectors capabilities depending upon the different content types part of the app.
:::
1. Select **App Catalog**.
1. In the 🔎 **Search Apps** field, run a search for your desired app, then select it.
1. Click **Install App**.
    :::note
    Sometimes this button says **Add Integration**.
    :::
1. In the **Set Up Collection** section of your respective app, select **Create a new Collector**.
    1. **Collector Name**. Enter a Name to display the Source in the Sumo Logic web application. The description is optional.
    1. **Timezone**. Set the default time zone when it is not extracted from the log timestamp. Time zone settings on Sources override a Collector time zone setting.
    1. (Optional) **Metadata**.  Click the **+Add Metadata** link to add a custom log [Metadata Fields](/docs/manage/fields). Define the fields you want to associate, each metadata field needs a name (key) and value.
        * <img src="/img/reuse/green-check-circle.png" alt="green check circle.png" width="20"/> A green circle with a checkmark is shown when the field exists and is enabled in the Fields table schema.
        * <img src="/img/reuse/orange-exclamation-point.png" alt="orange exclamation point.png" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic but isn’t present or enabled in the schema, it’s ignored and marked as **Dropped**.
    1. Click **Next**.
1. Configure the source as specified in the `Info` box above, ensuring all required fields are included.
1. In the **Configure** section of your respective app, complete the following fields.
    1. **Field Name**. If you already have collectors and sources set up, select the configured metadata field name (eg _sourcecategory) or specify other custom metadata (eg: _collector) along with its metadata **Field Value**.
1. Click **Next**. You will be redirected to the **Preview & Done** section.

**Post-installation**

Once your app is installed, it will appear in your **Installed Apps** folder, and dashboard panels will start to fill automatically.

Each panel slowly fills with data matching the time range query received since the panel was created. Results will not immediately be available but will be updated with full graphs and charts over time.
