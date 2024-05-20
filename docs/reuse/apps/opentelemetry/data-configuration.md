import useBaseUrl from '@docusaurus/useBaseUrl';

In this step, we'll create a data collection configuration to collect Apache error logs and link them to all the collectors that have the tag `application = Apache`.

1. Complete the Source Template form by providing the **Name** and your error log **File Path**, then click **Next**.
1. On the **Link Collectors** step, you will have the option to link the collectors using the Collector name or by adding tags to find the group of collectors. For our scenario, we will add the tag `application = Apache`.<br/><img src={useBaseUrl('img/send-data/local-file-apache.png')} alt="local-file-apache" style={{border: '1px solid gray'}} width="300"/>
1. Click **Preview Collector(s)** to see the list of collectors that will be linked to the newly created source Template.<br/><img src={useBaseUrl('img/send-data/link-collectors.png')} alt="link-collectors" style={{border: '1px solid gray'}} width="800"/>
1. Click **Next** to complete Source Template creation. In the background, the system will apply the configuration to all the linked collectors and start collecting from Apache error files.
1. Click the **Log Search** icon to search for data collected for this Source Template.