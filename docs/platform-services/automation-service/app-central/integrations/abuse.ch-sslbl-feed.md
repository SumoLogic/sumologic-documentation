---
title: Abuse.ch SSLBL Feed
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/abuse.ch-sslbl-feed.png)

Version: 1.2  
Updated: Jun 26, 2023

An SSL certificate can be associated with one or more servers (IP address:port combination). SSLBL collects IP addresses that are running with an SSL certificate blacklisted on SSLBL. These are usually botnet Command&Control servers (C&C). SSLBL hence publishes a blacklist containing these IPs which can be used to detect botnet C2 traffic from infected machines towards the internet, leaving your network. 

## Actions

* **Get Botnet C2 IP Blacklist** *(Enrichment)* - Collects IP addresses that are running with an SSL certificate blacklisted on SSLBL

## Notes

* The Botnet C2 IP Blacklist gets generated every 5 minutes. Please do not fetch it more often than every 5 minutes.
* As IP addresses are getting recycled and reused, this blacklist only contains IP addresses that have been see to be associated with malicious SSL certificate in past 30 days. The false positive rate for this blacklist should therefore be low.
* I strongly recommend you to not use the aggressive version of the Botnet C2 IP blacklist as it definitely will cause false positives. If you want to reduce the amount of false positives, don't use this option. If you want to get maximum protection and don't care about false positives, you can enable the action by selecting the checkbox (not recommended).
* More info: 'https://sslbl.abuse.ch/'

## Abuse.ch SSLBL Feed in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/abuse.ch-sslbl-feed/abuse.ch-sslbl-feed-1.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/abuse.ch-sslbl-feed/abuse.ch-sslbl-feed-2.png)

1. After the list of the integrations appears, search/look for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](		data:image/png;base64,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)

1. Populate all the required fields (\*) and then click Save. <br/>![](/img/platform-services/automation-service/app-central/integrations/abuse.ch-sslbl-feed/abuse.ch-sslbl-feed-4.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/abuse.ch-sslbl-feed/abuse.ch-sslbl-feed-5.png)

1. Click Test Saved Settings. <br/>![](/img/platform-services/automation-service/app-central/integrations/abuse.ch-sslbl-feed/abuse.ch-sslbl-feed-6.png)

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/abuse.ch-sslbl-feed/abuse.ch-sslbl-feed-7.png)

## Change Log

* May 6, 2022 - First upload
* June 26, 2023 (v1.2) - Updated the integration with Environmental Variables
