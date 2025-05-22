To install the app, do the following:
:::note
    Next-Gen App: To install or update the app, you must be an account administrator or a user with Manage Apps, Manage Monitors, Manage Fields, Manage Metric Rules, and Manage Collectors capabilities depending upon the different content types part of the app.
:::
1. Select **App Catalog**.
1. In the 🔎 **Search Apps** field, run a search for your desired app, then select it.
1. Click **Install App**.
    :::note
    Sometimes this button says **Add Integration**.
    :::
1. Click **Next** in the **Setup Data** section.
1. In the **Configure App** section of your respective app, complete the following field.
    1. **Index**. Specify value for _index if the collection is configured with custom partition. [Learn more](https://help.sumologic.com/docs/search/optimize-search-partitions). Default value is set to `sumologic_default` (default partition)
1. Click **Next**. You will be redirected to the **Preview & Done** section.

**Post-installation**

Once your app is installed, it will appear in your **Installed Apps** folder, and dashboard panels will start to fill automatically.

Each panel slowly fills with data matching the time range query received since the panel was created. Results will not immediately be available but will be updated with full graphs and charts over time.
