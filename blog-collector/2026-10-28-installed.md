---
title: Installed Collector Version 19.540-2
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - installed-collector
hide_table_of_contents: true
---

In this release, we've upgraded the Collector JRE and a dependency to address security vulnerabilities.

#### Security fixes

- Upgraded Collector JRE to **Amazon Corretto Version 17.0.21.0.1** to address [CVE-2026-91403](https://nvd.nist.gov/vuln/detail/cve-2026-91403) by distrusting the compromised eMudhra emSign root CA.
- Upgraded `com.fasterxml.jackson.core:jackson-databind` to `2.21.8` to address [CVE-2026-110879](https://nvd.nist.gov/vuln/detail/cve-2026-110879).
