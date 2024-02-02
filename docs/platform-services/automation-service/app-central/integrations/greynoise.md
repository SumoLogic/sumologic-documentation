---
title: GreyNoise
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/greynoise.png)

Version: 1.4  
Updated: Jun 28, 2023

GreyNoise tells security analysts what not to worry about. They do this by curating data on IPs that saturate security tools with noise. This unique perspective helps analysts confidently ignore irrelevant or harmless activity, creating more time to uncover and investigate true threats. Includes Actions to allow IP enrichments and GNQL queries via the GreyNoise API. 

## Actions

* **Context IP Lookup** *(Enrichment)* - Get more information about a given IP address
* **Execute GNQL Query** *(Enrichment)* - Make complex and one-off queries against the GreyNoise dataset
* **Ping** *(Enrichment)* - Check for connectivity and key validation
* **Quick IP Lookup** *(Enrichment)* - Check whether a given IP address is “Internet background noise”, or has been observed scanning or attacking devices across the Internet
* **RIOT IP Lookup** *(Enrichment)* - RIOT identifies IPs from known benign services and organizations that commonly cause false positives in network security and threat intelligence products
* **Grey Noise Alert Daemon** *(Daemon)* - Get an email if GreyNoise observes any Internet scan and attack traffic originating from networks that belong to you

## Change Log

* March 31, 2021 - First upload
* March 10, 2022 - Logo
* February 8, 2023 - Updated Action:
	+ Context IP Lookup (Improved error handling)
* June 28, 2023 (v1.4) - Visibility of the Resource fields changed and improved error handling
