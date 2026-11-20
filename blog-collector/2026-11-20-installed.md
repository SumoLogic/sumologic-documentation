---
title: Installed Collector Version 19.541-4
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - installed-collector
hide_table_of_contents: true
---

In this release, we've upgraded the Collector JRE and several dependencies to address security vulnerabilities.

#### Security fixes

- Upgraded Collector JRE to **Amazon Corretto Version 17.0.21.1.2** to address [CVE-2026-114938](https://nvd.nist.gov/vuln/detail/cve-2026-114938).
- Upgraded `com.google.guava:guava` to **33.8.0** to address [CVE-2026-102554](https://nvd.nist.gov/vuln/detail/cve-2026-102554) and [CVE-2026-118042](https://nvd.nist.gov/vuln/detail/cve-2026-118042).
- Upgraded `commons-codec:commons-codec` to **1.23.0** to address [CVE-2026-119078](https://nvd.nist.gov/vuln/detail/cve-2026-119078).
- Upgraded `org.bouncycastle:bc-fips` to **2.1.3** to address [CVE-2026-71888](https://nvd.nist.gov/vuln/detail/cve-2026-71888).
- Upgraded `org.json:json` to **20260522** to address [CVE-2026-59171](https://nvd.nist.gov/vuln/detail/cve-2026-59171).
