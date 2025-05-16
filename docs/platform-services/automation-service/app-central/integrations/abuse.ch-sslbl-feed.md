---
title: Abuse.ch SSLBL Feed
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/abuse.ch-sslbl-feed.png')} alt="abuse.ch-sslbl-feed" width="90"/>

***Version: 1.2  
Updated: Jun 26, 2023***

An SSL certificate can be associated with one or more servers (IP address:port combination). SSLBL collects IP addresses that are running with an SSL certificate blacklisted on SSLBL. These are usually botnet Command&Control servers (C&C). SSLBL hence publishes a blacklist containing these IPs which can be used to detect botnet C2 traffic from infected machines towards the internet, leaving your network. 

## Actions

* **Get Botnet C2 IP Blacklist** *(Enrichment)* - Collects IP addresses that are running with an SSL certificate blacklisted on SSLBL

## Notes

* The Botnet C2 IP Blacklist gets generated every 5 minutes. Do not fetch it more often than every 5 minutes.
* As IP addresses are getting recycled and reused, this blacklist only contains IP addresses that have been see to be associated with malicious SSL certificate in past 30 days. The false positive rate for this blacklist should therefore be low.
* I strongly recommend you to not use the aggressive version of the Botnet C2 IP blacklist as it definitely will cause false positives. If you want to reduce the amount of false positives, do not use this option. If you want to get maximum protection and do not care about false positives, you can enable the action by selecting the checkbox (not recommended).
* More info: 'https://sslbl.abuse.ch/'

## Configure Abuse.ch SSLBL Feed in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/abuse-ch-sslbl-configuration.png')} style={{border:'1px solid gray'}} alt="Abuse.ch SSLBL configuration" width="400"/>

For information about Abuse.ch SSLBL, see [Abuse.ch SSLBL documentation](https://sslbl.abuse.ch/).

## Change Log

* May 6, 2022 - First upload
* June 26, 2023 (v1.2) - Updated the integration with Environmental Variables
