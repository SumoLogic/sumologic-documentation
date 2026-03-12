---
title: Installed Collector Version 19.535-4
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - installed-collector
hide_table_of_contents: true    
---

In this release, we've enhanced the security and stability of the Collector with added support for security patches.

#### Security fix

- Upgraded collector JRE to **Amazon Corretto Version 17.0.18.8.1**.
- Upgraded the `software.amazon.awssdk:s3` to version **2.31.44.**

#### Bug fix

- Fixed an issue with forwarded Windows event collection that occurred on systems running with latest Windows version.