---
id: configuring-threatq-source-in-cse
title: Configuring a ThreatQ Source in Cloud SIEM
sidebar_label: ThreatQ Source
description: Learn how to set up a ThreatQ source.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

ThreatQ is a threat intelligence platform that centrally manages and correlates external sources of threat intel information. If you have a ThreatQ subscription, you can leverage ThreatQ threat intel feeds. 

To do so, [ingest threat intelligence indicators](/docs/platform-services/threat-intelligence-indicators/#ingest-threat-intelligence-indicators) from your ThreatQ source. For more information, see [Threat Intelligence Indicators](/docs/platform-services/threat-intelligence-indicators/).


## Looking for ThreatQ indicators using Cloud SIEM rules

Threat Intelligence sources are used at the time of Record ingestion. When a Record is ingested, Cloud SIEM determines whether any of the fields in the Record exist in any of your Threat Intelligence sources. When a Record contains a value that matches an entry in one or more Threat Intelligence sources, the `hasThreatMatch` Cloud SIEM rules function searches incoming Records in Cloud SIEM for matches to threat intelligence indicators. For more information, see [Threat indicators in Cloud SIEM](/docs/platform-services/threat-intelligence-indicators/#threat-indicators-in-cloud-siem).