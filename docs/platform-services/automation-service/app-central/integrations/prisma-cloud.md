---
title: Prisma Cloud
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/prisma-cloud.png')} alt="prisma-cloud" width="100"/>

***Version: 1.2  
Updated: Nov 09, 2023***

Receive alerts from Prisma Cloud CSPM and perform configuration searches to retrieve resource information, identify misconfigurations, gain operational insights and uncover policy and compliance violations.

## Actions

* **Get Alert Details** *(Enrichment)* - Returns information about an alert for the specified ID.
* **List Alert Filters** *(Enrichment)* - Returns a list of all valid filters.
* **List Alerts** *(Enrichment)* - Returns a list of alerts from the Prisma Cloud Platform that matches the specified filters.
* **Search Config** *(Enrichment)* - Returns the result of a RQL config query.

## Prisma Cloud configuration

Prisma Cloud requires an API access key to enable programmatic access to the REST API. By default, only the System Admin has API access and can enable API access for other administrators. To generate an access key, see [Create and Manage Access Keys](https://docs.prismacloud.io/en/enterprise-edition/content-collections/administration/create-access-keys).

## Category

Cloud Security Posture Management

## Change Log

* November 9, 2023 - First upload
