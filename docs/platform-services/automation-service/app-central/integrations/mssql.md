---
title: MSSQL
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/mssql.png')} alt="mssql" width="100"/>

***Version: 1.1  
Updated: Aug 17, 2023***

Query data from MSSQL Database.

## Actions

* **Query MSSQL** (*Enrichment*) - Query data from MSSQL Database.

:::note
This Integration does not support client-side encryption.
:::

## Configure MSSQL in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **SQL Server**. Enter the address of the [MSSQL server](https://learn.microsoft.com/en-us/sql/sql-server/?view=sql-server-ver17).

* **SQL Database**. Enter the name of the [MSSQL database](https://learn.microsoft.com/en-us/sql/relational-databases/lesson-1-connecting-to-the-database-engine?view=sql-server-ver17).

* **SQL Username**. Enter the username of the MSSQL user.

* **SQL Password**. Enter the password of the MSSQL user.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/mssql-configuration.png')} style={{border:'1px solid gray'}} alt="MSSQL configuration" width="400"/>

For information about MSSQL, see [MSSQL documentation](https://learn.microsoft.com/en-us/sql/?view=sql-server-ver16).

## Change Log

* January 30, 2023- First upload
* August 17, 2023 (v1.1) - Updated the integration with Environmental Variables
