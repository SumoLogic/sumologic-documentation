---
id: integrate-cse-with-taxii-feed
title: Integrate Cloud SIEM with a TAXII Feed
sidebar_label: TAXII Feed
description: Learn how to integrate Cloud SIEM with a TAXII feed.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has instructions for integrating Cloud SIEM with a TAXII threat intelligence feed. In this configuration, Cloud SIEM is a TAXII client, and polls a TAXII Server. 

:::note
To integrate with a TAXII feed, consult the documentation for the feed. For example:
* If you are integrating Cloud SIEM with the Cybersecurity & Information Security Agency (CISA) TAXII feed, see the [CISA AIS TAXII Server Connection Guide](https://www.cisa.gov/resources-tools/resources/cisa-ais-taxii-server-connection-guide-v20) and [Automated Indicator Sharing](https://www.cisa.gov/topics/cyber-threats-and-advisories/information-sharing/automated-indicator-sharing-ais).
* If you are integrating Cloud SIEM with Anomali Threatstream, see [Generating Your Own Threat Intelligence Feeds in ThreatStream](https://www.anomali.com/blog/generating-your-own-threat-intelligence-feeds-in-threatstream) on the Anomali blog.
:::

## About the integration

To integrate Cloud SIEM with a TAXII feed, you configure the URL of the TAXII provider’s discovery service and a polling interval. At the configured interval, Cloud SIEM uses the discovery service to look up the URL of the poll service, and then sends poll requests to that service, which then returns the indicators to Cloud SIEM.

## Leveraging indicators in rules

The integration allows you to enrich incoming Records with threat intel information, and leverage that information in Cloud SIEM Rules. How does that work? Cloud SIEM compares incoming Records with information from the threat feed. When there is a “match”, for instance when an IP address in a Record matches an IP address that the feed says is malicious, Cloud SIEM adds relevant information to that Record. Because the threat intel information is persisted within Records, you can reference it downstream in both rules and search. The built-in rules that come with Cloud SIEM will also automatically create a Signal for any Record with a match from your threat feed. To leverage the information in a rule, you can extend your custom rule expression, or add a [Rule Tuning Expression](/docs/cse/rules/rule-tuning-expressions) to a built-in rule. For a more detailed explanation of how to use threat intelligence information in rules, see [Threat Intelligence](/docs/cse/rules/about-cse-rules/#threat-intelligence) in the *About Cloud SIEM Rules* topic.

## Requirements

Cloud SIEM supports TAXII v1.1 and v1.2. 

## Configure the integration

1. [**Classic UI**](/docs/cse/introduction-to-cloud-siem/#classic-ui). In the top menu select **Content > Threat Intelligence**. <br/>[**New UI**](/docs/cse/introduction-to-cloud-siem/#new-ui). In the main Sumo Logic menu, select **Cloud SIEM > Threat Intelligence**. You can also click the **Go To...** menu at the top of the screen and select **Threat Intelligence**.  
1. On the **Threat Intelligence** page, click **Add Source**.
1. On the **Add New Source** popup, click **TAXII Feed**. <br/><img src={useBaseUrl('img/cse/taxii-feed-option.png')} alt="TAXII Feed option" style={{border: '1px solid gray'}} width="600"/>
1. The **Add Source** page appears. <br/><img src={useBaseUrl('img/cse/add-new-source.png')} alt="Add new source" style={{border: '1px solid gray'}} width="600"/>
1. **Name**. Enter a name for the feed.
1. **Description**. Enter a description of the feed.
1. **URL**. Enter the URL for the feed provider’s TAXII discovery service endpoint.
1. **Poll Interval**. Enter the frequency at which you want to poll the feed for updates.
1. **Default Indicator TTL**. If desired, specify a default TTL that will take effect for Indicators that don’t have a defined expiration.
1. **Max Lookback days**. You can use this option to tell Cloud SIEM how many days of data to fetch the first time you populate your list of indicators. By default, the first time you populate the list, Cloud SIEM will look for all data from the feed for all time. Note that on subsequent updates, Cloud SIEM will only consider data added to the feed since the last time it was polled.
1. **Collections**. You can optionally enter a comma-separated list of the specific collections of indicators that you want to retrieve. (The collections available depend on your threat intel provider.) If you leave this field blank, all indicators will be queried.)
1. **Subscription ID**. As required, an subscription ID to send to the TAXII provider in the poll request.
1. **Username**. Enter the username for accessing the TAXII server.
1. **Password**. Enter the password for accessing the TAXII server.
1. **Certificate**. If required, drop the certificate for accessing the TAXII server into this field. 
1. **Certificate Password**. Enter the password for the certificate.
1. Click **Add TAXII Feed Source**.
