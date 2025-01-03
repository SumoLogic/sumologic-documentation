import useBaseUrl from '@docusaurus/useBaseUrl';

In this step, we'll create a data collection configuration and link them to all the collectors that have particular tags.

1. Complete the source template form by providing the necessary details, then click **Next**.
1. On the **Link Collectors** step, you will have the option to link the collectors using the Collector name or by adding tags to find the group of collectors. In this Apache example, we will add the tag `application = Apache`.<br/><img src={useBaseUrl('img/send-data/local-file-apache.png')} alt="local-file-apache" style={{border: '1px solid gray'}} width="300"/>
1. Click **Preview Collector(s)** to see the list of collectors that will be linked to the newly created source template.<br/><img src={useBaseUrl('img/send-data/link-collectors.png')} alt="link-collectors" style={{border: '1px solid grey'}} width="800"/>
1. Click **Next** to complete the source template creation. In the background, the system will apply the configuration to all the linked collectors and will start collecting the respective telemetry data from the remote host.
1. Click the **Log Search** or **Metric Search** icon to search for data collected for this source template.
