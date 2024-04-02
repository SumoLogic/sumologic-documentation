---
id: integrate-cse-with-taxii-feed
title: Integrate Cloud SIEM with a TAXII Feed
sidebar_label: TAXII Feed
description: Learn how to integrate Cloud SIEM with a TAXII feed.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has instructions for integrating Cloud SIEM with a TAXII threat intelligence feed. 

:::note
To integrate with a TAXII feed, consult the documentation for the feed. For example:
* If you are integrating Cloud SIEM with the Cybersecurity & Information Security Agency (CISA) TAXII feed, see the [CISA AIS TAXII Server Connection Guide](https://www.cisa.gov/resources-tools/resources/cisa-ais-taxii-server-connection-guide-v20) and [Automated Indicator Sharing](https://www.cisa.gov/topics/cyber-threats-and-advisories/information-sharing/automated-indicator-sharing-ais).
* If you are integrating Cloud SIEM with Anomali Threatstream, see [Generating Your Own Threat Intelligence Feeds in ThreatStream](https://www.anomali.com/blog/generating-your-own-threat-intelligence-feeds-in-threatstream) on the Anomali blog.
:::

## About the integration

To ingest a TAXII feed, you configure the URL of the TAXII provider’s discovery service and a polling interval. At the configured interval, Sumo Logic uses the discovery service to look up the URL of the poll service, and then sends poll requests to that service, which then returns the indicators.

## Requirements

Cloud SIEM supports TAXII 1.x and TAXII 2.x. 

## Configure the integration

1. Configure the [TAXII 1 Client Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/stix-taxii-1-client-source/) or [TAXII 2 Client Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/stix-taxii-2-client-source/), depending on which you want to use.
1. The [ingested threat intelligence indicators](/docs/platform-services/threat-intelligence/about-threat-intelligence/#ingest-threat-intelligence-indicators) appear on the [Threat Intelligence tab](/docs/platform-services/threat-intelligence/threat-intelligence-indicators/#threat-intelligence-tab). To access the Threat Intelligence tab, go to **Manage Data** > **Logs** > **Threat Intelligence**.
1. Use the `hasThreatMatch` Cloud SIEM rules language function to search incoming Records for matches to threat intelligence indicators. When matches are found, they appear on Records in Cloud SIEM. For more information, see [`hasThreatMatch`](/docs/cse/rules/cse-rules-syntax/#hasthreatmatch).

## Leveraging indicators in rules

Threat intelligence indicators allow you to enrich incoming Records with threat intel information. Cloud SIEM uses the the `hasThreatMatch` rules function to compare incoming Records with information from the threat feed. When there is a “match”, for instance, when an IP address in a Record matches an IP address that the feed says is malicious, Cloud SIEM adds relevant information to that Record. 

Because the threat intel information is persisted within Records, you can reference it downstream in both rules and search. The built-in rules that come with Cloud SIEM will also automatically create a Signal for any Record with a match from your threat feed. 

For more information, see [Threat Intelligence Indicators in Cloud SIEM](/docs/platform-services/threat-intelligence/threat-indicators-in-cloud-siem/).