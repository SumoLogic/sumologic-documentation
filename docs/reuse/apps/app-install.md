To install the app:

1. From the left nav, select **App Catalog**.<br/>  ![App_Catalog.png](/img/get-started/library/App-Catalog.png)
1. Search for your app name and select it.
1. When you get to your app page:
   * If you want to see a preview of the dashboards included with the app before installing, scroll down to **Dashboard Preview**.
   * If your app has multiple versions (not all Sumo Logic apps have versions), select the version of the service you're using.<br/><img src="/img/get-started/library/add-version.png" alt="add-version.png" width="30%" />
   * Click **Add Integration**.<br/><img src="/img/get-started/library/add-integration.png" alt="add-integration.png" width="30%" />
1. On the next configuration page, **Select Data Source for your App**, complete the following fields:
   * **Data Source**. Select one of the following options:
      * Choose **Source Category**, and select a source category from the list; or
      * Choose **Enter a Custom Data Filter**, and [enter a custom source category](/docs/get-started/apps-integrations#custom-data-filters) beginning with an underscore. For example, `_sourceCategory=MyCategory`.
   * **Folder Name**. You can retain the existing name or enter a custom name of your choice for the app.
   * **All Folders** (optional). Default location is the **Personal** folder in your **Library**. If desired, you can choose a different location and/or click **New Folder** to add it to a new folder.
1. Click **Next**.<br/><img src="/img/get-started/library/configure-next.png" alt="next button" width="80%" />
1. You'll see a dialog confirming that the app was installed successfully.<br/><img src="/img/get-started/library/app-success.png" alt="app-success.png" width="80%" />

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't be available immediately, but within 20 minutes, you'll see full graphs and maps.
