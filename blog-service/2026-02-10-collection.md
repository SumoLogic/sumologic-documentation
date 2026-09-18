---
title: Token-Based Authentication for Secure HTTP (Collection)
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - http source
  - authentication
hide_table_of_contents: true    
---

import useBaseUrl from '@docusaurus/useBaseUrl';

We're excited to introduce secure token-based authentication for HTTP sources. This new capability allows you to authenticate using a unique token in the request header, maintaining the existing HTTPS endpoint behavior while adding token validation per source.

Obtain the token to use in an auth header when you configure an HTTP source or regenerate the URL. To learn more, see:
* [Configure an HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source)
* [Create an OTLP/HTTP Source](/docs/send-data/hosted-collectors/http-source/otlp/#create-an-otlphttpsource)
* [Generate a New URL for an HTTP Source](/docs/send-data/hosted-collectors/http-source/generate-new-url/)

:::note
Token-based authentication in the request header is supported for the following HTTP sources:
* [HTTP Logs and Metrics](/docs/send-data/hosted-collectors/http-source/logs-metrics)
* [HTTP Traces Source](/docs/send-data/hosted-collectors/http-source/traces/)
* [RUM HTTP Traces Source](/docs/apm/real-user-monitoring/configure-data-collection)
* [OTLP/HTTP Source](/docs/send-data/hosted-collectors/http-source/otlp)
* [Zoom HTTP Source](/docs/send-data/hosted-collectors/webhook-sources/zoom/)

Token-based authentication in the request header is not supported for:
* [AWS Kinesis Firehose for Logs Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/)
* [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/)
* [Google Cloud Platform Source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source/)
:::