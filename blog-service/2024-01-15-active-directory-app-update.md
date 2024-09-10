---
title: Active Directory App Update (Apps)
image: https://help.sumologic.com/img/sumo-square.png
keywords:
  - apps
  - release notes
hide_table_of_contents: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<a href="https://help.sumologic.com/release-notes-service/rss.xml"><img src={useBaseUrl('img/release-notes/rss-orange2.png')} alt="icon" width="50"/></a>

We're excited to announce an update for the [Active Directory JSON - OpenTelemetry](/docs/integrations/microsoft-azure/opentelemetry/active-directory-json-opentelemetry) application to enhance efficiency and data collection. We are updating the `sumo.datasource` value from Active Directory to Windows. This change addresses the double data ingestion issue that occurs for customers who have installed both Active Directory and Windows apps and set up separate OpenTelemetry collections for each.

:::note
  Data collected before the upgrade will not be visible in the Active Directory application.
:::

If you have only the **[Active Directory JSON - OpenTelemetry](/docs/integrations/microsoft-azure/opentelemetry/active-directory-json-opentelemetry)** app installed and decided to upgrade it, you will need to update your collection configuration according to the instructions below.

  1. Open the configuration file located in `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d`.
  1. Update the following attributes:
      - key: `sumo.datasource`
      - value: `windows`
      - action: `insert`
  1. Restart the collector by using the following PowerShell command `Restart-Service -Name OtelcolSumo`.

If you have both the **[Windows - OpenTelemetry](/docs/integrations/hosts-operating-systems/opentelemetry/windows-opentelemetry)** and **[Active Directory JSON - OpenTelemetry](/docs/integrations/microsoft-azure/opentelemetry/active-directory-json-opentelemetry)** apps installed, you should remove the Active Directory OTEL YAML configuration from your machine to prevent double data ingestion. When upgrading the Active Directory app, there's no need to set up a new collection.

No changes are required if you only have **[Windows - OpenTelemetry](/docs/integrations/hosts-operating-systems/opentelemetry/windows-opentelemetry)** installed.
