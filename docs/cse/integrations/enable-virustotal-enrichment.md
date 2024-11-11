---
id: enable-virustotal-enrichment
title: Enable VirusTotal Enrichment
sidebar_label: Enable VirusTotal Enrichment
description: Enrich your Insights with information from VirusTotal.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The VirusTotal Enrichment enriches Signals based on queries it runs against VirusTotal.

:::note
This feature requires the VirusTotal Premium API.
:::

For each Insight created, the enrichment checks the Records in the Signals that contribute to that Insight, looking for the values found in certain Record attributes that contain IP addresses, URLs, hostnames, or hashes. These are the fields the enrichment examines:

* `srcDevice_ip`
* `dstDevice_ip`
* `http_url`
* `http_hostname`
* `http_url_rootDomain`
* `dns_query`
* `file_hash_imphash`
* `file_hash_md5`
* `file_hash_prehash`
* `file_hash_sha1`
* `file_hash_sha256`
* `file_hash_ssdeep`

The enrichment looks up each value it finds in VirusTotal, calling the VirusTotal API to do so. When a Record value has a match in VirusTotal, the enrichment writes the response to Cloud SIEM, where you can view it the Signal’s **Enrichment** tab. For an example, see [Example VirusTotal Enrichment](#example-virustotal-enrichment).

:::note
VirusTotal enrichments are only added to Signals that are part of an Insight.
:::

## Configure VirusTotal enrichment

1. [**Classic UI**](/docs/cse/introduction-to-cloud-siem/#classic-ui). In the top menu select **Configuration**, and then under **Integrations** select **Enrichment**. <br/>[**New UI**](/docs/cse/introduction-to-cloud-siem/#new-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Enrichment**. You can also click the **Go To...** menu at the top of the screen and select **Enrichment**.  
1. On the **Enrichment** page, click the pencil icon for VirusTotal.<br/><img src={useBaseUrl('img/cse/enrichment-page.png')} alt="Edit button on the VirusTotal enrichment" style={{border: '1px solid gray'}} width="500" />
2. On the **Edit VirusTotal Configuration** popup, enter your VirusTotal API Key, and click Update.<br/><img src={useBaseUrl('img/cse/edit.png')} alt="Edit VirusTotal Configuration pop-up" style={{border: '1px solid gray'}} width="300" />

## Example VirusTotal enrichment
<img src={useBaseUrl('img/cse/virus-total-enrichment.png')} alt="Example VirusTotal enrichment" style={{border: '1px solid gray'}} width="700" />
