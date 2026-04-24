## Ingesting from Multiple Storage Accounts (Optional)

If you want to ingest data into Sumo Logic from multiple storage accounts, perform the following tasks for each storage account separately.

:::note
The following steps assume you have noted down the resource group name, storage account name, and container name from which the blobs will be ingested.
:::

* Authorize App Service to read from the storage account.
* Create an Event Grid Subscription - Subscribes all blob creation events to the Event Hub created by the ARM template.

### Step 1: Authorize App Service to read from storage account

This section provides instructions on authorizing the App Service to list the Storage Account key. This enables the Azure function to read from the storage account.

To authorize the App Service to list the Storage Account key, do the following:

1. Navigate to the **Storage Account** and click **Access Control(IAM)**.
1. Click the **Add** **+** at the top of the page.
1. Select **Add role assignment** from the dropdown.
1. In the **Add role assignment** window, select **Role > Storage Blob Data Reader > Next**.
1. In the **Members** tab, select **Managed Identity**.
1. In the **Select Managed identities** window:
   * **Subscription**. Select **Pay as you Go**.
   * **Managed Identity**. Choose **Function App**.
   * **Select**. Select **SUMOBRDLQProcessor\<unique_prefix\>** and **SUMOBRTaskConsumer\<unique_prefix\>** app services created by the ARM template, then click **Select**.
1. Click **Review + assign**.
1. Click **Save** to complete the role assignment.

### Step 2: Create an Event Grid Subscription

This section provides instructions for creating an event grid subscription that subscribes all blob creation events to the Event Hub created by the ARM template.

To create an event grid subscription, do the following:

1. Navigate to the storage account you want to monitor and open the **Events** blade from the left pane. 
2. In the **Event subscriptions** tab, click **+Event Subscription** to create a new subscription.
3. Under **Event Subscription Details**, provide:
   * **Name**. Enter a name for the subscription. 
   * **Event Schema**. Select **Event Grid Schema**.
4. Under **Topic Details**, enter a **System Topic Name**. If a topic already exists, it will be selected automatically. 
5. Under **Event Types**, choose **Blob Created** from the **Filter to Event Types** dropdown.
6. Under **Endpoint Details**,
   * Select **Event Hubs** as the **Endpoint Type** from the dropdown.
   * Click **Configure an endpoint**, then proceed in the dialog.
7. In the **Select Event Hub** dialog, configure:
   * **Resource Group**. Select the resource group you created via the ARM template.
   * **Event Hub Namespace**. Select **SUMOBREventHubNamespace\<*unique string*\\>**.
   * **Event Hub**. Choose **blobreadereventhub** from the dropdown.
   * Click **Confirm Selection**.
8. (Optional) Under the **Filters** tab:
   * Enable **Subject filtering**.
   * To filter events by container name, set the **Subject Begins With** field to `/blobServices/default/containers/<container_name>/`, replacing `<container_name>` with the name of the container you want to export logs from.
9. Click **Create** to finalize the subscription.
10. Verify the deployment by checking **Notifications** in the top-right corner of the Azure portal.
