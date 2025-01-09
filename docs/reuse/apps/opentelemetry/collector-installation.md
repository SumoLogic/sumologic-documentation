To illustrate the setup and configuration process, we'll use an example scenario where you'd need to monitor Apache error logs from 50 Linux servers.

First, you'll need to install the OpenTelemetry collectors on each of the 50 Linux servers and tag them to indicate that they are running Apache.

In this step, we will install the collector and add a uniquely identifiable tag to these collectors.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **OpenTelemetry Collection**. You can also click the **Go To...** menu at the top of the screen and select **OpenTelemetry Collection**.
1. On the **OpenTelemetry Collection** page, click **Add Collector**.
1. In the **Set up Collector** step:
   <!-- ![Linux install](img/send-data/linux-install.png)-->
   1. Choose your platform (in this example, **Linux**).
   1. Enter your **Installation Token**.
   1. Under **Tag data on Collector level**, add a new tag to identify these collectors as having Apache running on them (we'll use `application = Apache`).
   1. Leave the **Collector Settings** at their default values to configure collectors as remotely managed.
   1. Under **Generate and run the command to install the collector**, copy and run the installation command in your system terminal where the collector needs to be installed.
      <!-- ![Linux terminal installation](img/send-data/linux-terminal-installation.png)-->
1. After installation is complete, click **Next** to proceed.
1. For this example, we'll select **Apache Source Template** to apply the source template to start collecting logs from all linked collectors, then proceed with the data configuration.
   <!--![Source template page](img/send-data/source-template.png)-->

To revisit this screen later:
* [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Source Template**.
* [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Source Template**. You can also click the **Go To...** menu at the top of the screen and select **Source Template**.
