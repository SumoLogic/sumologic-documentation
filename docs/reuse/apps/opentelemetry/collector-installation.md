import useBaseUrl from '@docusaurus/useBaseUrl';

In this step, we'll install the collector on 50 servers and add a uniquely identifiable tag to these collectors depicting that these have Apache server running on them.

1. In Sumo Logic, select **Manage Data** > **Collection** > **OpenTelemetry Collection**.
1. On the **OpenTelemetry Collection** page, click **Add Collector**.
1. In the **Set up Collector** step, select **Linux** as the platform.<br/><img src={useBaseUrl('img/send-data/linux-install.png')} alt="linux-install" style={{border: '1px solid gray'}} width="800"/>
1. Enter your **Installation Token**.
1. Under **Tag data on Collector level**, add a new tag, “application = Apache” as seen in the screenshot below to identify these collectors as having Apache running on them.
1. For **Collector Settings**, leave them as default (unchecked).
1. Under **Generate and run the command to install the collector**, copy the command and execute it in your system terminal where the collector needs to be installed.<br/><img src={useBaseUrl('img/send-data/linux-terminal-installation.png')} alt="linux-terminal-installation" width="800"/>
1. Wait for the installation process to complete, then click **Next** to proceed.
1. On the next screen, you will see a list of available Source Templates. For our use case, we will select Apache Source Template.

:::note
If you choose to close this Source template creation screen, you can navigate back by selecting **Manage Data** > **Collection** > **Source Template**.
:::