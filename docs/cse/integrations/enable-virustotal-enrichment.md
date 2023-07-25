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
 
The enrichment looks up each value it finds in VirusTotal, calling the VirusTotal API to do so. When a Record value has a match in VirusTotal, the enrichment writes the response to CSE, where you can view it the Signal’s **Enrichment** tab. For an example, see [Example VirusTotal Enrichment](#Example-VirusTotal-enrichment).

:::note
VirusTotal enrichments are only added to Signals that are part of an Insight.
:::

## Configure VirusTotal enrichment 
1. Click the gear icon near the top of the CSE UI and choose **Enrichment**. 
1. On the **Enrichment** page, click the pencil icon for VirusTotal.<br/><img src={useBaseUrl('img/cse/enrichment-page.png')} alt="enrichment-page.png" width="800" />
2. On the **Edit VirusTotal Configuration** popup, enter your VirusTotal API Key, and click Update.<br/><img src={useBaseUrl('img/cse/edit.png')} alt="enrichment-page.png" width="400" /> 

## Example VirusTotal enrichment 
<img src={useBaseUrl('img/cse/virus-total-enrichment.png')} alt="enrichment-page.png" width="700" /> 

