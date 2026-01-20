---
title: Token-Based Authentication for Secure HTTP (Collection)
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - http source
  - authentication
hide_table_of_contents: true    
---

import useBaseUrl from '@docusaurus/useBaseUrl';

We're excited to introduce secure token-based authentication for the HTTP Logs and Metrics Source, the OTLP/HTTP Source, and Terraform. This new capability allows you to authenticate using a unique token in the request header, maintaining the existing HTTPS endpoint behavior while adding token validation per source.

Obtain the token to use in an auth header when you configure an HTTP source or regenerate the URL. To learn more, see:
* [Configure an HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source)
* [Create an OTLP/HTTP Source](/docs/send-data/hosted-collectors/http-source/otlp/#create-an-otlphttpsource)
* [Generate a New URL for an HTTP Source](/docs/send-data/hosted-collectors/http-source/generate-new-url/)
* Terraform [sumologic_token](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/token) resource. This resource has an `encoded_token_and_url` attribute for the encoded token for collector registration.