---
title: Shodan
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/shodan.png')} alt="shodan" width="100"/>

***Version: 1.1  
Updated: Apr 19, 2023***

Shodan is a search engine for Internet-connected devices. Web search engines, such as Google and Bing, are great for finding websites. But what if you're interested in measuring which countries are becoming more connected? Or if you want to know which version of Microsoft IIS is the most popular? Or you want to find the control servers for malware? Maybe a new vulnerability came out and you want to see how many hosts it could affect? Traditional web search engines do not let you answer those questions.

## Actions

* **Search** (*Enrichment*) - Search Shodan using the same query syntax as the website and use facets to get summary information for different properties.
* **Search IP** (*Enrichment*) - Returns all services that have been found on the given host IP.

## Configure Shodan in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* February 8, 2019 - First upload
* March 27, 2023 (v1.1)
	+ Updated integration: (Updated the integration Fields with Environmental Variables and improved error handling)
