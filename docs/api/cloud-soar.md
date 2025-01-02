---
id: cloud-soar
title: Cloud SOAR APIs
sidebar_label: Cloud SOAR
description: The Cloud SOAR APIs allow you to manage incidents, triage, and other Cloud SOAR features.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import CloudSoarApi from '../reuse/csoar-api-table.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/security/SOC.png')} alt="icon" width="60"/>

The Cloud SOAR APIs allow you to manage incidents, triage, and other Cloud SOAR features.

## Documentation

:::info
If your instance URL is a subdomain of `soar.sumologic.com`, refer to [Inline API documentation](#inline-api-documentation) below.
:::

<ApiIntro/>

<CloudSoarApi/>

### Inline API documentation

For organizations having Cloud SOAR available at URLs matching the pattern `*.soar.sumologic.com`,  the API documentation is available through your Cloud SOAR instance at the following URL:

```
https://<cloudsoarhost>/incmansuite_ng/lib/gui/app.php#support_apidoc|api_documentation_v3
```

For more information, see [Legacy Cloud SOAR APIs](/docs/cloud-soar/legacy/legacy-cloud-soar-apis/).

<!-- ## Required role capabilities

<ApiRoles/>

* Cloud SOAR (all role capabilities)

-->