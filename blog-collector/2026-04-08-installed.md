---
title: Installed Collector Version 19.536-1
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - installed-collector
hide_table_of_contents: true    
---

In this release, we've enhanced the security and stability of the collector with added support for security patches and bug fixes.

#### Security fix

- Upgraded `io.netty` packages to **4.1.132.Final** to address known security vulnerabilities ([CVE-2026-33871](https://nvd.nist.gov/vuln/detail/CVE-2026-33871) and [CVE-2026-33870](https://nvd.nist.gov/vuln/detail/CVE-2026-33870)).
- Upgraded `io-netty:netty-codec-http` to **4.1.132.Final** to resolve an [HTTP header parsing issue](https://github.com/netty/netty/issues/16020).

#### Bug fix

- Fixed an issue on Windows installation where duplicate registry entries with suffixed **App IDs** could be created, which could cause stale information to be retained.
- Fixed an issue that caused Windows event reset after a Windows upgrade by auto-detection and collection recovery.