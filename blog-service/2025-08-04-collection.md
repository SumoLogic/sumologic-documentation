---
title: Cloud Syslog Source Certificate Transition to ACM (Collection)
image: https://help.sumologic.com/img/reuse/rss-image.jpg
keywords:
  - certificates
  - Cloud Syslog Source
hide_table_of_contents: true    
---

import useBaseUrl from '@docusaurus/useBaseUrl';

We're excited to announce that we are transitioning to AWS Certificate Manager (ACM) certificates for Transport Layer Security (TLS) communication between your cloud syslog sources and Sumo Logic.

Currently, Sumo Logic uses a DigiCert ALB certificate to secure communication with your cloud syslog sources. This certificate is set to expire on October 13, 2025, at which point Sumo Logic will transition to the ACM root certificates. This change provides the following benefits:
* **Automated certificate renewal and deployment**. ACM eliminates the need for future manual renewals, reducing administrative overhead.
* **Simplified infrastructure management for AWS customers**. ACM is deeply integrated into the AWS ecosystem, streamlining your overall infrastructure management. Because Sumo Logic is also on AWS, using ACM provides a seamless experience.

If you use cloud syslog sources to send data to Sumo Logic, please prepare for this transition by downloading and configuring the ACM certificate on your system. For more information and setup instructions, see:
* [Cloud Syslog Source](/docs/send-data/hosted-collectors/cloud-syslog-source/)
* [rsyslog](/docs/send-data/hosted-collectors/cloud-syslog-source/rsyslog)
* [syslog-ng](/docs/send-data/hosted-collectors/cloud-syslog-source/syslog-ng/)
* [Collect Logs for SentinelOne](/docs/send-data/collect-from-other-data-sources/collect-logs-sentinelone/)
* [Acquia](/docs/integrations/saas-cloud/acquia/#step-2-configure-a-source)
