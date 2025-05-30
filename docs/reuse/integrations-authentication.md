import useBaseUrl from '@docusaurus/useBaseUrl';

Before you can use this automation integration, you must configure its authentication settings so that the product you're integrating with can communicate with Sumo Logic. For general guidance, see [Configure Authentication for Automation Integrations](/docs/platform-services/automation-service/configure-authentication-for-integrations/).

<details>
<summary>How to open the integration's configuration dialog</summary>
1. [Access App Central](/docs/platform-services/automation-service/automation-service-app-central/#view-app-central) and install the integration. (You can configure at installation, or after installation with the following steps.)
1. Go to the [**Integrations**](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) page. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic).  In the main Sumo Logic menu, select **Automation** and then select **Integrations** in the left nav bar. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Automation > Integrations**. You can also click the **Go To...** menu at the top of the screen and select **Integrations**.
1. Select the installed integration.
1. Hover over the resource name and click the **Edit** button that appears.<br/><img src={useBaseUrl('img/platform-services/automation-service/automations-edit-resource-detail.png')} style={{border:'1px solid gray'}} alt="Edit a resource" width="500"/> 
</details>

In the configuration dialog, enter information from the product you're integrating with. When done, click **TEST** to test the configuration, and click **SAVE** to save the configuration.