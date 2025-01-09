:::info
A new source template will always be created with the latest version of the source template.
:::

Follow the below steps to create a data collection configuration to gather the required logs and link them to all the collectors with the help of collector tags.

1. Complete the source template form with the name and file path for your logs (for example, error logs or access logs), then click **Next**.
1. Under **Link Collectors**, you will have the option to link the collectors using the collector name or by adding tags to find the group of collectors (for example, `application = Apache`).<br/><img src="/img/send-data/local-file-apache.png" alt="Screenshot of the file path configuration for Apache logs" style={{border:'1px solid gray'}} width="80%" />
1. Preview and confirm the collectors that will be linked (fetched automatically) to the newly created source template.<br/><img src="/img/send-data/preview-collectors1.png" alt="Screenshot showing the linked collectors preview" style={{border:'1px solid gray'}} width="90%" /><br/><img src="/img/send-data/preview-collectors2.png" alt="Screenshot showing the linked collectors preview" style={{border:'1px solid gray'}} width="90%" />
1. Click **Next** to complete the source template creation. In the background, the system will apply the configuration to all the linked collectors and will start collecting the respective telemetry data from the remote host (in the example, it would start collecting Apache error logs).
1. Click the **Log Search** or **Metrics Search** icons to search for and analyze your data collected for this source template.

<!-- Remove temporarily; not yet released

### Collector tags

#### Add a collector tag

You can add collector tags during OTEL collector setup - as described in the previous section - or after creation:

1. Navigate to the **OpenTelemetry Collection** page.
1. Click on the desired collector where you need to add collector tags.
1. In the right pane, scroll to the **Collector Tags** section and click **Edit**.
1. In the edit window, click **+ Add tags**.
1. Add the required tags and click **Proceed**.
1. A new **Update Collector Tag(s)** window appears. Click the **click here** link to understand the impact of this update.
1. You will be redirected to the **Mapped Source Template** section, which displays the mapped source templates for the collector tags added. This window also displays the **Compatible** and **Incompatible Version** details for the mapped source template for the collector.
1. If there are any incompatible source templates, [upgrade the source template](/docs/send-data/opentelemetry-collector/remote-management/source-templates/manage-source-templates/#upgrade-a-source-template) to ensure compatibility.
1. Once the source template is upgraded and is compatible, enter **PROCEED** and click **Confirm**.

#### Edit or delete a collector tag

:::note
- For default collector tags, you can only edit the **Values**.
- System collector tags like `sumo.disco.enabled` cannot be edited.
:::

To edit or delete a collector tag:

1. Go to the **OpenTelemetry Collection** page.
1. Click on the desired collector where you need to add the collector tags.
1. In the right pane, scroll to the **Collector Tags** section and click **Edit**.
1. Edit or delete the required tags and click **Proceed**.
1. A new **Update Collector Tag(s)** window appears. Click the **click here** button to see the impact of this update.
1. You will be redirected to a **Mapped Source Template** section, which displays the mapped source templates for the edited or deleted collector tags, along with **Compatible** and **Incompatible Version** details.
1. If find you find an incompatible source template, [upgrade the source template](/docs/send-data/opentelemetry-collector/remote-management/source-templates/manage-source-templates/#upgrade-a-source-template).
1. Once the source template is upgraded and is compatible, enter **PROCEED** and click **Confirm**.
-->
