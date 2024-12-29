import useBaseUrl from '@docusaurus/useBaseUrl';

In this step, we will install the collector and add a uniquely identifiable tag to these collectors.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **OpenTelemetry Collection**. You can also click the **Go To...** menu at the top of the screen and select **OpenTelemetry Collection**.
1. On the **OpenTelemetry Collection** page, click **Add Collector**.
1. Select the platform of the remote host in the **Set up Collector**  section.<br/><img src={useBaseUrl('img/send-data/linux-install.png')} alt="Linux-install" style={{border: '1px solid gray'}} width="800"/>
1. Enter your **Installation Token**.
1. Under **Tag data on Collector level**, add a new key-value pair by clicking **+New tags**, for example, `application = Apache` to identify these collectors as having Apache running on them.
1. For **Collector Settings**, leave it as default.
1. Under **Generate and run the command to install the collector**, copy the command and execute it in your system terminal, where the collector needs to be installed.<br/><img src={useBaseUrl('img/send-data/linux-terminal-installation.png')} alt="Linux-terminal-installation" width="800"/>
1. Wait for the installation process to complete, then click **Next** to proceed.
1. On the next screen, you will see a list of available Source Templates.

:::note
If you close this source template creation screen, you can navigate back. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Source Template**. You can also click the **Go To...** menu at the top of the screen and select **Source Template**. 
:::
