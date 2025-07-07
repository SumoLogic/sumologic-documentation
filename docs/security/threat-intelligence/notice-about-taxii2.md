---
id: notice-about-taxii-2
title: Customer Communication – Product Defect Notification for Missing Indicators of Compromise (IOCs) for Threat Intelligence Feeds with the TAXII 2.0 Protocol
description: This article is a product defect notification for missing indicators of compromise (IOCs) for Threat Intelligence feeds with the TAXII 2.0 protocol.
---

<head>
 <meta name="robots" content="noindex" />
</head>

<!-- Article added by DOCS-981. -->

## Summary of the issue

We are notifying you of a recently identified issue that affects Sumo Logic’s Threat Intelligence feeds using the TAXII 2.0 protocol. Specifically, URL, domain, and email Indicators of Compromise (IOCs) were not processed and displayed as expected. A customer first reported the issue on June 11, 2025.

Our investigation determined that a processing error in certain non-hash IOCs led to a breakdown in the normalization process, preventing these critical data types from appearing correctly in customer environments.

If your environment relies on TAXII 2.0-based Threat Intelligence feeds, you may have experienced the following:
* Missing URL, domain, and email IOCs in your threat feeds
* Incomplete detection logic, resulting in gaps in dashboards, threat hunting, and alerting mechanisms that depend on these data types

Our engineering team has traced the issue to a normalization defect in the data processing pipeline, occurring after collection but prior to feed availability.

A fix has been developed and is scheduled for deployment on July 9, 2025. There is no action you or your team needs to take in order to correct this.

## Important to note

Sumo Logic-provided threat feeds, including CrowdStrike and Intel 471, are not affected.

Customer-configured feeds using other protocols, such as TAXII 1.0, are also unaffected.

Historical signals will not be retroactively generated. Customers can expect to receive an influx of signals related to the previously missing IOCs from the moment the fix is applied.

## Resolution plan

To mitigate the risk of future issues, we are implementing the following changes:
* Expanded automated and manual test coverage across all supported threat feed protocols.
* Strengthened validation and normalization processes across the pipeline.
* Continuous monitoring and alerting enhancements to detect processing anomalies earlier

## Need help or have questions?

Our Support team is here to help. If you have questions, please [contact Support](https://support.sumologic.com/support/s/) by submitting a request.

We recognize how critical this functionality is and deeply regret any operational impact this may have caused. Thank you for your continued trust in us as your security partner.