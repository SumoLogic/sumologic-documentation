If your Source encounters VendorConfig errors, you can restart it from either the Sumo Logic UI or Sumo Logic API.

#### UI

To restart your source in the Sumo Logic platform, follow the steps below:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
2. Select the source and click the **information** icon on the right side of the row.
3. The API usage information popup is displayed. Click the **Restart Source** button on the bottom left.<br/> <img src="/img/send-data/restart-source-button.png" alt="restart-source-button" width="500" />
4. Click **Confirm** to send the restart request.<br/> <img src="/img/send-data/restart-source-confirm.png" alt="restart-source-confirm" width="500" />
5. The bottom left of the platform will provide a notification informing you the request was successful.<br/>   <img src="/img/send-data/restart-source-initiated.png" alt="restart-source-initiated" width="400" />


#### API

To restart your source using the Sumo Management API, follow the instructions below:
* Method: `POST`
* Example endpoint:
  ```
  https://api.sumologic.com/api/v1/collectors/{collector_id}/sources/{source_id}/action/restart
  ```

Sumo Logic endpoints like `api.sumologic.com` are different in deployments outside `us1`. For example, an API endpoint in Europe would begin `api.eu.sumologic.com`. A service endpoint in `us2` (Western U.S.) would begin `service.us2.sumologic.com`. For more information, see [Sumo Logic Endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).
