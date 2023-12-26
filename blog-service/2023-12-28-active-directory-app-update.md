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

We're happy to announce an Azure Active Directory for OpenTelemetry application update. To enhance efficiency and streamline data collection, we are updating the sumo.datasource value from activedirectory to windows. This change addresses the issue of double data ingestion that occurs for customers who have installed both AD and Windows apps and set up separate OpenTelemetry collections for each.

- If you have only the Azure Active Directory for OpenTelemetry installed and decide to upgrade, you will need to update your collection configuration according to the instructions below. Please note that data collected before the upgrade will not be visible in the Active Directory app.
Instructions for attributes update:

Open the configuration file located in C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d
and update the following attributes:
   attributes:
      - key: sumo.datasource
        value: windows
        action: insert

Restart the collector e.g. by using the following Powershell command:
“Restart-Service -Name OtelcolSumo”

- If you have both the Windows - OpenTelemetry and Azure Active Directory for OpenTelemetry apps installed, you should remove the Active Directory OTEL YAML configuration from your machine to prevent double data ingestion. When upgrading the Active Directory App, there's no need to set up a new collection. Please note that data collected before the upgrade will not be available in the Active Directory app.

- There are no changes required if you have only Windows - OpenTelemetry app installed.