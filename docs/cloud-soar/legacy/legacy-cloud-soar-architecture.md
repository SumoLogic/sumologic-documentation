---
id: legacy-cloud-soar-architecture
title: Legacy Cloud SOAR Architecture
sidebar_label: Architecture
description: Features of the legacy Cloud SOAR architecture.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::info
This article only applies to organizations having a legacy Cloud SOAR instance URL matching the pattern `*.soar.sumologic.com`. If it doesn't, refer to [Cloud SOAR Architecture](/docs/cloud-soar/overview/#architecture) for documentation about the architecture of our latest Cloud SOAR SaaS version.
:::

## Multi-Tenancy

Cloud SOAR Security Operations (Cloud SOAR SO) supports a multi-tenant architecture, typically for a Managed Security Service Provider (MSSP) to support management of multiple customers in isolated environments.

Tenants are separately managed in a segregated Cloud SOAR instance with complete isolation of all the platform's functions. Additionally, a Master Console is available to manage all the instances (create, destroy, monitor) and to provide aggregated reporting.

All multi-tenant installations offer:
- Separate schema or databases for each individual tenant
- Logical or physical segregation of tenants
- A **Superuser** role that provides visibility on all tenants and provides for execution of administrative duties, analytics, dashboards, and reporting
- Individual administrators otherwise segregated to each tenant
- Isolation of external actions (e.g., enrichment of indicators of compromise, containment actions prescribed to a host)

<img src={useBaseUrl('img/cloud-soar/image5.png')} alt="Multiple database symbols" width="600"/>

## Automated Responder Knowledge (DF-ARK)

Cloud SOAR's Automated Responder Knowledge (DF-ARK) module utilizes machine
learning through historical responses to past incidents and threat
intelligence feeds to enrich new incidents. This enrichment allows
Cloud SOAR to recommend relevant Playbooks and plans of action to expedite
detection and response times.
