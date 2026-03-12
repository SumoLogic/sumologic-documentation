import useBaseUrl from '@docusaurus/useBaseUrl';

In this step, we'll install remotely managed OpenTelemetry collector and add a uniquely identifiable tag to these collectors.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, Select **App Catalog**.<br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **App Catalog**.
1. In the 🔎 Search Apps field, run a search for your desired OpenTelemetry app, then select it. For example, Apache - OpenTelemetry.
1. Click the **Manage** dropdown and then select **Add Collection**.
1. On the **Set Up Collector** page, select **Add a New Collector** and then click **Next**.
:::note
If you want to use an existing OpenTelemetry Collector, you can skip this step by selecting the **Use an existing Collector** option.
:::
5. Select the platform where you want to install the Sumo Logic OpenTelemetry Collector. For example, Linux.<br/>
This will generate a command that you can execute in the machine environment you need to monitor. Once executed, it will install the Sumo Logic OpenTelemetry Collector.<br/><img src={useBaseUrl('img/send-data/opentelemetry-collector/remotely-managed.png')} alt="Thumbnail icon" />
The installation commands now include a `--remotely-managed` flag. When this flag is used, a remotely managed collector is installed automatically instead of a locally managed one. If you prefer to use a locally managed collector, simply remove the flag from the installation command.