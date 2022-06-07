---
slug: /send-data/sources
---

# Sources

Sources are the environments that Sumo Logic Collectors connect to collect data from your site. Each Source is configured to collect files in a specific way, depending on the type of Collector you're using.

 * [Sources for Installed Collectors](/docs/send-data/sources/sources-installed-collectors) are configured on Installed Collectors.
 * [Sources for Hosted Collectors](../hosted-collectors.md) are hosted along with the Collector in Amazon Web Services (AWS), Microsoft, or other hosting services.

When registering a Collector, you also have the option of [configuring the Collector using a Source JSON](/docs/send-data/sources/use-json-configure-sources) file.

:::note
The maximum number of Sources allowed on a Collector is 1,000.
:::

<Iframe url="https://www.youtube.com/embed/CfWXz6UkpIc"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        />

import Iframe from 'react-iframe';

## Allowlisting Sources that collect from AWS 

If you're configuring a Source that collects from Amazon Web Services (AWS), you may need to allowlist AWS IP addresses. AWS makes current IP address ranges available in JSON format. Amazon advises that this file changes several times a week.

In particular, you'll need to allowlist the IP address associated with your Sumo Logic endpoint.  For example, if your deployment is in the U.S., you'll need to allowlist the us-east region IP addresses.  See Sumo Logic Endpoints and Firewall Security for information on determining your endpoint.

For details on how the file is updated, its use, its syntax, and to download the JSON file, go to [http://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html](http://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html).

## Guide contents

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

In this section, we will introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>