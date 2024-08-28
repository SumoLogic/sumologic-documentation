---
title: Sumo Logic AWS Lambda Extension v8 (Collection)
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg
keywords:
  - collection
  - lambda
  - environmental-variable
hide_table_of_contents: true
authors:
  - url: https://www.sumologic.com/help/release-notes-service/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

We're excited to announce the release of Sumo Logic AWS Lambda Extension version 8. Here are the key features that this upgrade provides:

- Improved the support for AWS KMS encrypted `SUMOLOGIC_HTTP_ENDPOINT`, including the introduction of new `KMS_KEY_ID` and `KMS_CACHE_SECONDS` environment variables.
- Introduced three new environment variables `TELEMETRY_MAX_BYTES`, `TELEMETRY_MAX_ITEMS`, and `TELEMETRY_TIMEOUT_MS`, which helps you to reduce the ingestion delay based on log volume.
- Upgraded Golang to version 1.22 to resolve 20+ security vulnerabilities.

To learn more, refer to our [Lambda extensions changelog](https://github.com/SumoLogic/sumologic-lambda-extensions/releases/).
