---
title: Cloud Syslog Source Certificate Fully Transitioned to ACM (Collection)
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - certificates
  - Cloud Syslog Source
hide_table_of_contents: true    
---

import useBaseUrl from '@docusaurus/useBaseUrl';

We're excited to announce that Sumo Logic has fully transitioned to AWS Certificate Manager (ACM) certificates for Transport Layer Security (TLS) communication between your cloud syslog sources and Sumo Logic.

In [a previous release note](/release-notes-service/2025/08/01/collection/), we announced that we are transitioning from DigiCert to ACM certificates.

This change provides the following benefits:
* **Automated certificate renewal and deployment**. ACM eliminates the need for future manual renewals, reducing administrative overhead.
* **Simplified infrastructure management for AWS customers**. ACM is deeply integrated into the AWS ecosystem, streamlining your overall infrastructure management. Because Sumo Logic is also on AWS, using ACM provides a seamless experience.

If you use cloud syslog sources to send data to Sumo Logic, download and configure the ACM certificate on your system. For more information and setup instructions, see:
* [Cloud Syslog Source](/docs/send-data/hosted-collectors/cloud-syslog-source/)
* [rsyslog](/docs/send-data/hosted-collectors/cloud-syslog-source/rsyslog)
* [syslog-ng](/docs/send-data/hosted-collectors/cloud-syslog-source/syslog-ng/)
* [Collect Logs for SentinelOne](/docs/send-data/collect-from-other-data-sources/collect-logs-sentinelone/)
* [Acquia](/docs/integrations/saas-cloud/acquia/#step-2-configure-a-source)