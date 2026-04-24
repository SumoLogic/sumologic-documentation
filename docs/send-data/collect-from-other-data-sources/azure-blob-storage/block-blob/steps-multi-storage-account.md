## Ingesting from Multiple Storage Accounts (Optional)

If you want to ingest data into Sumo Logic from multiple storage accounts, perform following tasks for each storage account separately.

:::note
The following steps assume you have noted down the resource group name, storage account name, and container name where the blobs will be ingested from.
:::

* Authorize App Service read from storage account
* Create an Event Grid Subscription - Subscribes all blob creation events to the Event Hub created by ARM template 

### Step 1: Authorize App Service to read from storage account

This section provides instructions on authorizing the App Service to list the Storage Account key. This enables the Azure function to read from the storage account.

To authorize the App Service to list the Storage Account key, do the following:

1. Go to **Storage Account** and click **Access Control(IAM)**.


1. Click the **Add** **+** at the top of the page.


1. Select **Add role assignment** from dropdown.
1. In the **Add role assignment** window, go to **Role** tab and choose **Storage Blob Data Reader**. Click **Next**.
1. In **Members** tab, select **Managed Identity**.
1. In the **Select Managed identities** window,

   * **Subscription**: Choose Pay as you Go.
   * **Managed Identity**: Choose Function App.
   * **Select**:  **Select SUMOBRDLQProcessor\<unique_prefix\>** and **SUMOBRTaskConsumer\<unique_prefix\>** app services which are created by the ARM template. Click **Select**.
1. Click **Review + assign**
1. Click **Save**.

### Step 2: Create an Event Grid Subscription

This section provides instructions for creating an event grid subscription, that subscribes all blob creation events to the Event Hub created by ARM template 

To create an event grid subscription, do the following:

1. Go to the storage account which needs to be monitored additionally. Go under Events blade in left pane.

1. At the top of the **Event subscriptions** tab, click **+Event Subscription** to create new event subscription.


1. Specify the following values for **Event Subscription Details**:

   * **Name:** Fill the event subscription name.
   * **Event Schema:** Select **Event Grid Schema**.

1. Specify the following values for **Topic Details**:

   * **System Topic Name**. Provide the topic name, if the system topic already exists then it will automatically select the existing topic.
    
1. Specify the following details for Event Types:

   * Select **Blob Created** from the **Filter to Event Types** dropdown.

1. Specify the following details for Endpoint Types:

   * **Endpoint Type**. Select **Event Hubs** from the dropdown.
   * **Endpoint.**  Click on **Configure an endpoint.**

    The Select Event Hub dialog appears.


1. Specify the following Select Event Hub parameters, then click **Confirm Selection.**

   * **Resource Group**. Select the resource group you created by ARM template.
   * **Event Hub Namespace**. Select **SUMOBREventHubNamespace\<*unique string*\\>**.
   * **Event Hub**. Select **blobreadereventhub** from the dropdown.

1. Specify the following Filters tab options(Optional):

   * Check Enable subject filtering.
   * To filter events by container name, enter the following in the **Subject Begins With** field, replacing `<container_name>` with the name of the container from where you want to export logs. `/blobServices/default/containers/<container_name>/`

1. Click **Create**.

1. Verify the deployment was successful by checking **Notifications** in the top right corner of the Azure Portal.