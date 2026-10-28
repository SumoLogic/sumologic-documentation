---
id: grok-deprecation-notice
title: Grok Deprecation Notice
sidebar_label: Grok Deprecation
description: Learn about deprecation of Grok and what you need to know about migrating to Sumo Logic data sources.
---

<head>
  <meta name="robots" content="noindex" />
</head>

On April 23, 2026, Sumo Logic deprecates the Grok parsing service. Sumo Logic parsers and Cloud-to-Cloud (C2C) integrations are the supported methods for ingesting data into Cloud SIEM. If your instance uses Grok for parsing, you must migrate before that date or those sources will stop creating records, signals, and insights in Cloud SIEM.

## Migrate to a C2C integration

C2C integrations are the preferred option. They automatically tag messages with the mapping hints Cloud SIEM requires, and most have a **Forward to SIEM** option in the configuration UI.

See [Cloud-to-Cloud Integration Framework Sources](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/) for the full list of available integrations.

## Migrate to a Sumo Logic parser

If no C2C integration exists for your data source, use a Sumo Logic Source with a parser.

1. Find a parser. Go to **Data Management > Logs > Parsers** in the Sumo Logic UI. If the parser doesn't fully meet your needs, [create a local configuration](/docs/cse/schema/parser-editor#create-a-local-configuration-for-a-system-parser). If none exists, [file a support ticket](https://support.sumologic.com/).
1. Configure the source to forward logs. Click the **SIEM Processing** checkbox on an HTTP source, or assign `_siemforward=true` as a field on any other source type.
1. Set the parser path. Assign `_parser` as a field on the source, with the full path as its value, for example: `_parser=/Parsers/System/AWS/AWS Network Firewall`. To get a parser's path, open **Data Management > Logs > Parsers**, click the three-dot menu for the parser, and select **Copy Path**.

## Additional references

* [Cloud SIEM Ingestion Best Practices](/docs/cse/ingestion/cse-ingestion-best-practices/)
* [Ingestion Sources for Cloud SIEM](/docs/cse/ingestion/ingestion-sources-for-cloud-siem/)
* [Cloud-to-Cloud Integration Framework Sources](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/)
* [Troubleshoot Parsers](/docs/cse/troubleshoot/troubleshoot-parsers/)
