---
title: New Environment Variables Added to Lambda Function (Collection)
image: https://help.sumologic.com/img/sumo-square.png
keywords:
  - collection
  - lamdda
  - environmental-variable
hide_table_of_contents: true
authors:
  - url: https://help.sumologic.com/release-notes-service/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

We're excited to announce the addition of new environmental variables such as `KMS_KEY_ID`, `KMS_CACHE_SECONDS`, `TELEMETRY_MAX_BYTES`, `TELEMETRY_MAX_ITEMS`, and `TELEMETRY_TIMEOUT_MS` to our Lambda function, to help you customize the function behaviour. [Learn more](/docs/send-data/collect-from-other-data-sources/collect-aws-lambda-logs-extension/#step-3-adding-the-environment-variables).


## Security fix

- Upgraded Golang to version 1.22 to resolve 20+ security vulnerabilities.