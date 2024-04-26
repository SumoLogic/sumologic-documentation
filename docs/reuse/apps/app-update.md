<head>
  <meta name="robots" content="noindex" />
</head>

To update the app, do the following:

1. From the Sumo Logic navigation, select **App Catalog**.
1. In the **Search Apps** field, search for and then select your app. <br/>Optionally, you can identify the app that has upgrade in **Upgrade available** section. 
1. To upgrade the app, click **Upgrade**. 
    1. You will be redirected to the **Preview & Done** section if the upgrade did not have any configuration or property change.
    1. You will be redirected to **Setup Data** page if the upgrade has any configuration or property change.
        1. In the **Configure** section of the respective app, complete the following fields.
            - **Key.** Select either of these options for the data source.
                * Choose **Source Category**, and select a source category from the list for **Default Value**.
                * Choose **Custom**, and enter a custom metadata field. Insert its value in **Default Value**.
        1. Click **Next**. You will be redirected to the **Preview & Done** section.

Your upgraded app will be installed in the **Installed Apps** folder and dashboard panels will start to fill automatically.

Each panel slowly fills with data matching the time range query and received since the panel was created. Results will not immediately be available, updating with full graphs and charts over time.