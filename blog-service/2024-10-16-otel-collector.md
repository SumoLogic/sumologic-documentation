---
title: Remote Management Support for OpenTelemetry Collector (Collectors)
image: https://www.sumologic.com/img/logo.svg
keywords:
  - opentelemetry
  - otel
  - remote management
  - collectors
hide_table_of_contents: true
authors:
  - url: https://help.sumologic.com/release-notes-service/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

The Sumo Logic Distribution for OpenTelemetry Collector now supports remote management of data collection configuration, which you can set up from the Sumo UI and push to one or more collectors. [Learn more](/docs/send-data/opentelemetry-collector/remote-management).

### Remote Management features

* **Collector tags**. You can tag your Installed Collectors and use those collector tags to categorize and group them. These tags are enriched in your data, so you can use them in your dashboards and searches as well.
* **Source templates**. Data configuration setup is done using Source templates. This is an extension of our existing Installed Collector source template, with the addition of this new capability to be attached to multiple collectors.
