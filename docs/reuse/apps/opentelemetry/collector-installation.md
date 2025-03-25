In this step, we'll install the collector and add a uniquely identifiable tag to these collectors.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**.<br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **OpenTelemetry Collection**. You can also click the **Go To...** menu at the top of the screen and select **OpenTelemetry Collection**.
1. On the **OpenTelemetry Collection** page, click **+ Add Collector**.
1. In the **Set up Collector** step:
   1. Choose your platform (for example, Linux).
   1. Enter your **Installation Token**.
   1. Under **Tag data on Collector level**, add a new tag to identify these collectors for their corresponding use case (for example, if you are running Apache, set application = Apache)
   1. Leave the **Collector Settings** at their default values to configure collectors as remotely managed.
   1. Under **Generate and run the command to install the collector**, copy and run the installation command in your system terminal where the collector needs to be installed.
1. After installation is complete, click **Next** to proceed.
1. Select a source template (for example, Apache source template) to start collecting logs from all linked collectors, then proceed with the data configuration.<br/><img src="/img/send-data/source-template.png" alt="source template page" style={{border:'1px solid gray'}} width="90%" />

To revisit this screen later: From the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic), select **Manage Data > Collection > Source Template**. From the [**New UI**](/docs/get-started/sumo-logic-ui), select **Configuration** > **Source Template**.
