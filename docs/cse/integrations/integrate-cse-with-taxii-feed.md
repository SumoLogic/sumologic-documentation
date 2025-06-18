---
id: integrate-cse-with-taxii-feed
title: Integrate Cloud SIEM with a TAXII Feed
sidebar_label: TAXII Feed
description: Learn how to integrate Cloud SIEM with a TAXII feed.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article has instructions for integrating Cloud SIEM with a TAXII threat intelligence feed. 

:::note
To integrate with a TAXII feed, first consult the documentation for the feed. For example:
* If you are integrating Cloud SIEM with the Cybersecurity & Information Security Agency (CISA) TAXII feed, see the [CISA AIS TAXII Server Connection Guide](https://www.cisa.gov/resources-tools/resources/cisa-ais-taxii-server-connection-guide-v20) and [Automated Indicator Sharing](https://www.cisa.gov/topics/cyber-threats-and-advisories/information-sharing/automated-indicator-sharing-ais).
* If you are integrating Cloud SIEM with Anomali Threatstream, see [Generating Your Own Threat Intelligence Feeds in ThreatStream](https://www.anomali.com/blog/generating-your-own-threat-intelligence-feeds-in-threatstream) on the Anomali blog.
:::

## About the integration

To ingest a TAXII feed, you configure the URL of the TAXII provider’s discovery service and a polling interval. At the configured interval, Sumo Logic uses the discovery service to look up the URL of the poll service, and then sends poll requests to that service, which then returns the indicators.

## Requirements

Cloud SIEM supports TAXII 1.x and TAXII 2.x. 

## Configure the integration

1. Configure the [TAXII 1 Client Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/stix-taxii-1-client-source/) or [TAXII 2 Client Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/stix-taxii-2-client-source/), depending on which you want to use.
1. The [ingested threat intelligence indicators](/docs/security/threat-intelligence/about-threat-intelligence/#ingest-threat-intelligence-indicators) appear on the [Threat Intelligence tab](/docs/security/threat-intelligence/threat-intelligence-indicators/#threat-intelligence-tab). To access the Threat Intelligence tab:
   * [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select **Manage Data > Logs > Threat Intelligence**. 
   * [**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Configuration**, and then under **Logs** select **Threat Intelligence**. You can also click the **Go To...** menu at the top of the screen and select **Threat Intelligence**. 
1. Use the [`hasThreatMatch`](/docs/cse/rules/cse-rules-syntax/#hasthreatmatch) Cloud SIEM rules language function to search incoming records for matches to threat intelligence indicators. When matches are found, they appear on records in Cloud SIEM.

## Leveraging indicators in rules

Threat intelligence indicators allow you to enrich incoming records with threat intel information. Cloud SIEM uses the the `hasThreatMatch` rules function to compare incoming records with information from the threat feed. When there is a “match”, for instance, when an IP address in a record matches an IP address that the feed says is malicious, Cloud SIEM adds relevant information to that record. 

Because the threat intel information is persisted within records, you can reference it downstream in both rules and search. The built-in rules that come with Cloud SIEM will also automatically create a signal for any record with a match from your threat feed. 

For more information, see [Find Threats with Cloud SIEM](/docs/security/threat-intelligence/threat-indicators-in-cloud-siem/).