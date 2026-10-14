---
title: Installed Collector Version 19.539-1
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - installed-collector
hide_table_of_contents: true
---

In this release, we've upgraded Collector dependencies and the JRE to address security vulnerabilities and fix a macOS startup issue.

#### Security fixes

- Upgraded Collector JRE to **Amazon Corretto Version 17.0.20.12.1**.
- Upgraded `com.fasterxml.jackson.core:jackson-core` to `2.21.7` to address CVEs ([CVE-2026-89407](https://nvd.nist.gov/vuln/detail/cve-2026-89407) and [CVE-2026-89425](https://nvd.nist.gov/vuln/detail/cve-2026-89425)).
- Upgraded `com.fasterxml.jackson.core:jackson-databind` to `2.21.7` to address CVEs ([CVE-2026-91776](https://nvd.nist.gov/vuln/detail/cve-2026-91776) and [CVE-2026-91777](https://nvd.nist.gov/vuln/detail/cve-2026-91777)).
- Upgraded `io.netty packages` to `4.2.19.Final` to address CVEs ([CVE-2026-89044](https://nvd.nist.gov/vuln/detail/cve-2026-89044), [CVE-2026-93488](https://nvd.nist.gov/vuln/detail/cve-2026-93488), [CVE-2026-93491](https://nvd.nist.gov/vuln/detail/cve-2026-93491), and [CVE-2026-93558](https://nvd.nist.gov/vuln/detail/cve-2026-93558)).
- Upgraded `org.bouncycastle:bcpkix-jdk18on` to `1.86` to address CVEs ([CVE-2026-17508](https://nvd.nist.gov/vuln/detail/cve-2026-17508), [CVE-2026-71888](https://nvd.nist.gov/vuln/detail/cve-2026-71888), [CVE-2026-71889](https://nvd.nist.gov/vuln/detail/cve-2026-71889), and [CVE-2026-71892](https://nvd.nist.gov/vuln/detail/cve-2026-71892)).
- Upgraded `org.bouncycastle:bcprov-jdk18on` to `1.86` to address CVEs ([CVE-2026-17508](https://nvd.nist.gov/vuln/detail/cve-2026-17508), [CVE-2026-18036](https://nvd.nist.gov/vuln/detail/cve-2026-18036), [CVE-2026-18040](https://nvd.nist.gov/vuln/detail/cve-2026-18040), [CVE-2026-71889](https://nvd.nist.gov/vuln/detail/cve-2026-71889), and [CVE-2026-71891](https://nvd.nist.gov/vuln/detail/cve-2026-71891)).

#### Bug fixes

- Fixed a macOS issue in `538-3` where the collector did not start after installation or upgrade on some computers.
