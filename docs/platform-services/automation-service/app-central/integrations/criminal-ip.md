---
title: Criminal IP
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/criminal-ip.png')} alt="criminal-ip" width="90"/>

***Version: 1.0  
Updated: Mar 1, 2024***

Criminal IP is a cybersecurity search engine that uses AI technology to scan global IP addresses, identifying connected devices and assessing threats. It provides detailed intelligence on malicious IPs, domains, and offers real-time data integration through an API for organizational security management.

## Actions

* **Scan Domain** *(Enrichment)* - Initiating a new scan of a specific domain.
* **Get IP Malicious Info** *(Enrichment)* - Inquire whether a specific IP address is a malicious IP address.
* **Get IP Suspicious Info** *(Enrichment)* - Retrieve data suspected to be malicious, which is associated with a specific IP address.
* **Search Vulnerability** *(Enrichment)* - Retrieve information on a specific CVE vulnerability.
* **Get IP Report** *(Enrichment)* - Retrieve comprehensive data on a specific IP address, including VPN IP status, Scanner IP status, open ports, connected domains, vulnerabilities, and more.
* **Get Domain Reports** *(Enrichment)* - Retrieve scanned data on security information such as phishing, vulnerabilities, and more for a specific domain.
* **Get IP Summary** *(Enrichment)* - Retrieve summarized information such as location data, ISP, owner, ASN, and other details for a specific IP address.
* **Search Banners** *(Enrichment)* - Retrieve search results of banners using filters.
* **Get Employee Identity Analysis** *(Enrichment)* - Retrieve search results of banners using filters.
* **Get IP Report Summary** *(Enrichment)* - Retrieve summarized data, such as issues, risks, open ports, connections, and detection information for a specific IP address.

## Configure Criminal IP in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Criminal IP, see the [Criminal IP website](https://www.criminalip.io/).

## Change Log

* March 1, 2024 - First upload
