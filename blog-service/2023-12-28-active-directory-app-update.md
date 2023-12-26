---
title: Active Directory App Update (Apps)
image: https://www.sumologic.com/img/logo.svg
keywords:
  - apps
  - release notes
hide_table_of_contents: true
authors:
  - url: https://help.sumologic.com/release-notes-service/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

We're excited to announce an update for the [Active Directory JSON - OpenTelemetry](/docs/integrations/microsoft-azure/opentelemetry/active-directory-json-opentelemetry) application to enhance the efficiency and data collection. We are updating the `sumo.datasource` value from the active directory to Windows. This change addresses the double data ingestion issue that occurs for customers who have installed both Active Directory and Windows apps and set up separate OpenTelemetry collections for each.

:::note
  Data collected before the upgrade will not be visible in the Active Directory application.
:::

- If you have only the **[Active Directory JSON - OpenTelemetry](/docs/integrations/microsoft-azure/opentelemetry/active-directory-json-opentelemetry)** installed and decided to upgrade it, you will need to update your collection configuration according to the instructions below. 

  1. Open the configuration file located in `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d`.
  1. Update the following attributes:
      - key: sumo.datasource
      - value: windows
      - action: insert
  1. Restart the collector, by using the following Powershell command `Restart-Service -Name OtelcolSumo`.

- If you have both the **[Windows - OpenTelemetry](/docs/integrations/hosts-operating-systems/opentelemetry/windows-opentelemetry)** and **[Active Directory JSON - OpenTelemetry](/docs/integrations/microsoft-azure/opentelemetry/active-directory-json-opentelemetry)** apps installed, you should remove the Active Directory OTEL YAML configuration from your machine to prevent double data ingestion. When upgrading the Active Directory app, there's no need to set up a new collection. 

- No changes required if you only have **[Windows - OpenTelemetry](/docs/integrations/hosts-operating-systems/opentelemetry/windows-opentelemetry)** installed.