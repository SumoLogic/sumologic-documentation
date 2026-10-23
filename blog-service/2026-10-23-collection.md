---
title: Clobber Rate Limiting for OT Collector Registration (Collection)
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - OT Collector
  - clobber
  - collector registration
  - rate limiting
hide_table_of_contents: true
---

OT Collector registrations that use `clobber: true` are now rate limited for each collector name. After about 50 registration attempts with the same name within an hour, Sumo Logic rejects further attempts with an HTTP `429` response. This prevents multiple machines that share a collector name from repeatedly deleting and re-registering each other's collectors.

To avoid the limit, use a unique `collector_name` for each machine, and use `clobber` only to replace a collector that is no longer running. The limit applies to OT Collector only, not Installed Collector.

[Learn more](/docs/send-data/opentelemetry-collector/data-source-configurations/additional-configurations-reference/#clobber-rate-limiting).
