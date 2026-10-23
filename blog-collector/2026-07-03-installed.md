---
title: Installed Collector Version 19.536-14
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - installed-collector
hide_table_of_contents: true
---

In this release, we've enhanced the security and stability of the Collector with added support for security patches.

#### Security fixes

- Upgraded `com.fasterxml.jackson` libraries to the latest version **2.21**.
- Upgraded `io.netty` packages to **4.1.135.Final** to address the following CVEs:
  - [CVE-2026-48059](https://nvd.nist.gov/vuln/detail/CVE-2026-48059) - netty-codec-haproxy
  - [CVE-2026-47691](https://nvd.nist.gov/vuln/detail/CVE-2026-47691) - netty-resolver-dns
  - [CVE-2026-50560](https://nvd.nist.gov/vuln/detail/CVE-2026-50560) - netty-codec-http2
  - [CVE-2026-50011](https://nvd.nist.gov/vuln/detail/CVE-2026-50011) - netty-codec-redis
  - [CVE-2026-44250](https://nvd.nist.gov/vuln/detail/CVE-2026-44250) - netty-codec-redis
  - [CVE-2026-44890](https://nvd.nist.gov/vuln/detail/CVE-2026-44890) - netty-codec-redis
  - [CVE-2026-44249](https://nvd.nist.gov/vuln/detail/CVE-2026-44249) - netty-handler
  - [CVE-2026-50020](https://nvd.nist.gov/vuln/detail/CVE-2026-50020) - netty-codec-http
  - [CVE-2026-44893](https://nvd.nist.gov/vuln/detail/CVE-2026-44893) - netty-codec-haproxy
  - [CVE-2026-50010](https://nvd.nist.gov/vuln/detail/CVE-2026-50010) - netty-handler
  - [CVE-2026-45673](https://nvd.nist.gov/vuln/detail/CVE-2026-45673) - netty-resolver-dns
  - [CVE-2026-45416](https://nvd.nist.gov/vuln/detail/CVE-2026-45416) - netty-handler
  - [CVE-2026-45536](https://nvd.nist.gov/vuln/detail/CVE-2026-45536) - netty-transport-native-unix
  - [CVE-2026-45674](https://nvd.nist.gov/vuln/detail/CVE-2026-45674) - netty-resolver-dns
  - [CVE-2026-46340](https://nvd.nist.gov/vuln/detail/CVE-2026-46340) - netty-transport-sctp
  - [CVE-2026-47244](https://nvd.nist.gov/vuln/detail/CVE-2026-47244) - netty-codec-http2
  - [CVE-2026-48006](https://nvd.nist.gov/vuln/detail/CVE-2026-48006) - netty-codec-redis
  - [CVE-2026-48043](https://nvd.nist.gov/vuln/detail/CVE-2026-48043) - netty-codec-http2
- Upgraded `org.apache.commons:commons-configuration2` to **2.15.0** to address known security vulnerability ([CVE-2026-45205](https://nvd.nist.gov/vuln/detail/CVE-2026-45205)).
- Fixed the following Docker image security vulnerabilities:
  - [CVE-2026-42012](https://nvd.nist.gov/vuln/detail/CVE-2026-42012) - libgnutls30
  - [CVE-2026-3832](https://nvd.nist.gov/vuln/detail/CVE-2026-3832) - libgnutls30
  - [CVE-2026-42010](https://nvd.nist.gov/vuln/detail/CVE-2026-42010) - libgnutls30
  - [CVE-2026-42009](https://nvd.nist.gov/vuln/detail/CVE-2026-42009) - libgnutls30
  - [CVE-2026-33845](https://nvd.nist.gov/vuln/detail/CVE-2026-33845) - libgnutls30
  - [CVE-2026-33846](https://nvd.nist.gov/vuln/detail/CVE-2026-33846) - libgnutls30
  - [CVE-2026-3833](https://nvd.nist.gov/vuln/detail/CVE-2026-3833) - libgnutls30
  - [CVE-2026-42013](https://nvd.nist.gov/vuln/detail/CVE-2026-42013) - libgnutls30
  - [CVE-2026-42015](https://nvd.nist.gov/vuln/detail/CVE-2026-42015) - libgnutls30
  - [CVE-2026-41989](https://nvd.nist.gov/vuln/detail/CVE-2026-41989) - libgcrypt20
  - [CVE-2026-5260](https://nvd.nist.gov/vuln/detail/CVE-2026-5260) - libgnutls30
  - [CVE-2026-5419](https://nvd.nist.gov/vuln/detail/CVE-2026-5419) - libgnutls30
  - [CVE-2026-42011](https://nvd.nist.gov/vuln/detail/CVE-2026-42011) - libgnutls30
  - [CVE-2026-42014](https://nvd.nist.gov/vuln/detail/CVE-2026-42014) - libgnutls30
