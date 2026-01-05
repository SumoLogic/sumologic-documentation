---
title: Snowflake Authentication Update (Collection)
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - c2c
  - snowflake
hide_table_of_contents: true    
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### What's changing?

Starting November 2025, Snowflake will block single-factor authentication (password-only sign-ins) as part of their enhanced security protocols.

Snowflake has signed the CISA *Secure by Design* pledge and is committed to adopting security best practices, including:
- Eliminating high-risk authentication methods (for example, password-only access)
- Enforcing multi-factor authentication (MFA)
- Reducing the risk of credential theft and unauthorized access

These changes are designed to strengthen Snowflake’s overall security posture and better protect your data.

### Next steps

As an interim measure, Sumo Logic recommends you to use the Programmatic Access Tokens (PATs) to authenticate your Sumo Logic integration with Snowflake before 1st November 2025. This ensures continued access and seamless data collection from the Snowflake platform.

Refer to [Using programmatic access tokens for authentication](https://docs.snowflake.com/en/user-guide/programmatic-access-tokens) for step-by-step instructions to authenticate the integration with Snowflake.

:::note
- Programmatic Access Tokens (PATs) provide a short-term authentication solution, with each token expiring after approximately one year. So, you must generate a new token annually until a long-term multifactor authentication solution becomes available.
- Sumo Logic is actively developing a long-term authentication solution using OAuth 2.0, which will provide enhanced security and ease of use. More information and rollout timelines for OAuth 2.0 support will be shared in the upcoming release.
:::

[Learn more](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/snowflake-logs-source/#vendor-configuration).

For more information, contact your Technical Account Engineer (TAE) or reach out to Sumo Logic Support.