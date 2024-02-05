---
id: cloud-soar
title: Cloud SOAR APIs
sidebar_label: Cloud SOAR
description: The Cloud SOAR APIs allow you to manage incidents, triage, and other Cloud SOAR features.
hide_table_of_contents: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/security/SOC.png')} alt="icon" width="60"/>

The Cloud SOAR APIs allow you to manage incidents, triage, and other Cloud SOAR features.

:::info
If your instance URL is a subdomain of `soar.sumologic.com`, refer to the [next section](#inline-api-documentation) for information about API.
:::

import ApiIntro from '../reuse/api-intro.md';

<ApiIntro/>

import CloudSoarApi from '../reuse/csoar-api-table.md';

<CloudSoarApi/>

## Inline API documentation

For organizations having Cloud SOAR available at URLs matching the pattern `*.soar.sumologic.com`,  the API documentation is available through your Cloud SOAR instance at the following URL:

```
https://<cloudsoarhost>/incmansuite_ng/lib/gui/app.php#support_apidoc|api_documentation_v3
```

For more information, see [Cloud SOAR APIs](/docs/cloud-soar/cloud-soar-apis/).
