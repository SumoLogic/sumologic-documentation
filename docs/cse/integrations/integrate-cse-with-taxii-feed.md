---
id: integrate-cse-with-taxii-feed
title: Integrate CSE with a TAXII Feed
sidebar_label: TAXII Feed
description: Learn how to integrate CSE with a TAXII feed.
---

This topic has instructions for integrating CSE with a TAXII threat intelligence feed. In this configuration, CSE is a TAXII client, and polls a TAXII Server. 

:::note
To integrate with a TAXII feed, consult the documentation for the feed. For example:
* If you are integrating Cloud SIEM with the Cybersecurity & Information Security Agency (CISA) TAXII feed, see the [CISA AIS TAXII Server Connection Guide](https://www.cisa.gov/resources-tools/resources/cisa-ais-taxii-server-connection-guide-v20) and [Automated Indicator Sharing](https://www.cisa.gov/topics/cyber-threats-and-advisories/information-sharing/automated-indicator-sharing-ais).
* If you are integrating Cloud SIEM with Anomali Threatstream, see [Generating Your Own Threat Intelligence Feeds in ThreatStream](https://www.anomali.com/blog/generating-your-own-threat-intelligence-feeds-in-threatstream) on the Anomali blog.
:::

## About the integration

To integrate CSE with a TAXII feed, you configure the URL of the TAXII provider’s discovery service and a polling interval. At the configured interval, CSE uses the discovery service to look up the URL of the poll service, and then sends poll requests to that service, which then returns the indicators to CSE.

## Leveraging indicators in rules

The integration allows you to enrich incoming Records with threat intel information, and leverage that information in CSE Rules. How does that work? CSE compares incoming Records with information from the threat feed. When there is a “match”, for instance when an IP address in a Record matches an IP address that the feed says is malicious, CSE adds relevant information to that Record. Because the threat intel information is persisted within Records, you can reference it downstream in both rules and search. The built-in rules that come with CSE will also automatically create a Signal for any Record with a match from your threat feed. To leverage the information in a rule, you can extend your custom rule expression, or add a [Rule Turning Expression](../rules/rule-tuning-expressions.md) to a built-in rule. For a more detailed explanation of how to use threat intelligence information in rules, see [Threat Intelligence](../rules/about-cse-rules/#threat-intelligence) in the *About CSE Rules* topic.

## Requirements

CSE supports TAXII v1.1 and v1.2. 

## Configure the integration

1. Click the **Content menu** and select **Threat Intelligence**.
1. On the **Threat Intelligence** page, click **Add Source**. <br/>  ![threat-intel-page.png](/img/cse/threat-intel-page.png)
1. On the **Add New Source** popup, click **TAXII Feed**. <br/>  ![taxii-feed-option.png](/img/cse/taxii-feed-option.png)
1. The **Add Source** page appears. <br/>  ![add-new-source.png](/img/cse/add-new-source.png)
1. **Name**. Enter a name for the feed.
1. **Description**. Enter a description of the feed.
1. **URL**. Enter the URL for the feed provider’s TAXII discovery service endpoint.
1. **Poll Interval**. Enter the frequency at which you want to poll the feed for updates.
1. **Default Indicator TTL**. If desired, specify a default TTL that will take effect for Indicators that don’t have a defined expiration.
1. **Max Lookback days**. You can use this option to tell CSE how many days of data to fetch the first time you populate your list of indicators. By default, the first time you populate the list, CSE will look for all data from the feed for all time. Note that on subsequent updates, CSE will only consider data added to the feed since the last time it was polled.
1. **Collections**. You can optionally enter a comma-separated list of the specific collections of indicators that you want to retrieve. (The collections available depend on your threat intel provider.) If you leave this field blank, all indicators will be queried.)
1. **Subscription ID**. As required, an subscription ID to send to the TAXII provider in the poll request.
1. **Username**. Enter the username for accessing the TAXII server.
1. **Password**. Enter the password for accessing the TAXII server.
1. **Certificate**. If required, drop the certificate for accessing the TAXII server into this field. 
1. **Certificate Password**. Enter the password for the certificate.
1. Click **Add TAXII Feed Source**.
