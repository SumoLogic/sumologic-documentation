---
title: App Registration Authentication for Microsoft 365 Audit Source (Collection)
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - Microsoft 365 Audit
  - authentication
hide_table_of_contents: true    
---

import useBaseUrl from '@docusaurus/useBaseUrl';

We are excited to introduce **App Registration** support as the recommended authentication method for the Microsoft Office 365 Audit Source. This enhancement enables a more secure and reliable way to collect Microsoft 365 audit logs by using Azure AD application-based authentication instead of user credentials.

With App Registration, you can authenticate using Tenant ID, Client ID, and Client Secret, allowing Sumo Logic collectors to securely access the Microsoft 365 Management Activity APIs. This approach aligns with Microsoft’s recommended best practices for service-to-service integrations. [Learn more](/docs/send-data/hosted-collectors/microsoft-source/ms-office-audit-source).