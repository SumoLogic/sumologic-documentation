import useBaseUrl from '@docusaurus/useBaseUrl';

In this step, we'll install the opentelemetry collector and add a uniquely identifiable tag to these collectors.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, Select **App Catalog**.<br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **App Catalog**.
1. In the 🔎 Search Apps field, run a search for your desired opentelemetry app, then select it. For example, `Apache - OpenTelemetry`.
1. Click the **Manage** dropdown and then select **Add Collection**.
1. On the **OpenTelemetry Collection** page, click **+ Add Collector**.
1. In the **Set up Collector** step:
   1. Choose your platform (for example, Linux).
   1. Enter your **Installation Token**.
   1. Under **Tag data on Collector level**, add a new tag to identify these collectors for their corresponding use case (for example, if you are running Apache, set `application = Apache`).
   1. Leave the **Collector Settings** at their default values to configure collectors as remotely managed.
   1. Under **Generate and run the command to install the collector**, copy and run the installation command in your system terminal where the collector needs to be installed.

To revisit this screen later: From the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic), select **Manage Data > Collection > Source Template**. From the [**New UI**](/docs/get-started/sumo-logic-ui), select **Data Management** and under **Data Collection** select **Source Template**.
