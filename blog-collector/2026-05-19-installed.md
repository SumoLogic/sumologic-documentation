---
title: Installed Collector Version 19.536-4
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - installed-collector
hide_table_of_contents: true    
---

In this release, we've enhanced the security and stability of the Collector with upgraded JRE, security patches, and bug fixes.

#### Security fixes

- Upgraded Collector JRE to **Amazon Corretto Version 17.0.19.10.1**.
- Upgraded base image to **Ubuntu 24.04** in the Collector Docker image to address the following CVEs:
  - [CVE-2025-15281](https://nvd.nist.gov/vuln/detail/CVE-2025-15281) - libc-bin, libc6
  - [CVE-2026-28388](https://nvd.nist.gov/vuln/detail/CVE-2026-28388) - libssl1.1, openssl
  - [USN-8091-1](https://ubuntu.com/security/notices/USN-8091-1) - libblkid1, libfdisk1, and 4 more
  - [CVE-2023-4039](https://nvd.nist.gov/vuln/detail/CVE-2023-4039) - gcc-10, gcc-10-base, and 2 more
  - [CVE-2025-8058](https://nvd.nist.gov/vuln/detail/CVE-2025-8058) - libc-bin, libc6
  - [CVE-2026-29111](https://nvd.nist.gov/vuln/detail/CVE-2026-29111) - libsystemd0, libudev1, and 1 more
  - [CVE-2026-28390](https://nvd.nist.gov/vuln/detail/CVE-2026-28390) - libssl1.1, openssl
  - [CVE-2025-69420](https://nvd.nist.gov/vuln/detail/CVE-2025-69420) - libssl1.1, openssl
  - [CVE-2025-32990](https://nvd.nist.gov/vuln/detail/CVE-2025-32990) - libgnutls30
  - [CVE-2025-68160](https://nvd.nist.gov/vuln/detail/CVE-2025-68160) - libssl1.1, openssl
  - [CVE-2025-69421](https://nvd.nist.gov/vuln/detail/CVE-2025-69421) - libssl1.1, openssl
  - [CVE-2025-13151](https://nvd.nist.gov/vuln/detail/CVE-2025-13151) - libtasn1-6
  - [CVE-2026-0861](https://nvd.nist.gov/vuln/detail/CVE-2026-0861) - libc-bin, libc6
  - [CVE-2025-68973](https://nvd.nist.gov/vuln/detail/CVE-2025-68973) - gnupg2
  - [CVE-2025-9230](https://nvd.nist.gov/vuln/detail/CVE-2025-9230) - libssl1.1, openssl
  - [CVE-2026-28389](https://nvd.nist.gov/vuln/detail/CVE-2026-28389) - libssl1.1, openssl
  - [CVE-2025-6395](https://nvd.nist.gov/vuln/detail/CVE-2025-6395) - libgnutls30
  - [CVE-2026-28387](https://nvd.nist.gov/vuln/detail/CVE-2026-28387) - libssl1.1, openssl
  - [CVE-2026-0915](https://nvd.nist.gov/vuln/detail/CVE-2026-0915) - libc-bin, libc6
  - [CVE-2025-32988](https://nvd.nist.gov/vuln/detail/CVE-2025-32988) - libgnutls30
  - [CVE-2026-22796](https://nvd.nist.gov/vuln/detail/CVE-2026-22796) - libssl1.1, openssl
  - [CVE-2026-22795](https://nvd.nist.gov/vuln/detail/CVE-2026-22795) - libssl1.1, openssl
  - [CVE-2025-4598](https://nvd.nist.gov/vuln/detail/CVE-2025-4598) - libsystemd0, libudev1
  - [CVE-2025-69419](https://nvd.nist.gov/vuln/detail/CVE-2025-69419) - libssl1.1, openssl
- Upgraded `org.bouncycastle:bcpkix-jdk18on` to **1.84** to address [CVE-2026-5588](https://nvd.nist.gov/vuln/detail/CVE-2026-5588).
- Upgraded `io.netty` packages to **4.1.133.Final** to address [CVE-2026-44248](https://nvd.nist.gov/vuln/detail/CVE-2026-44248).
- Upgraded `org.apache.logging.log4j` packages to **2.25.4** to address known security vulnerabilities ([CVE-2026-34477](https://nvd.nist.gov/vuln/detail/CVE-2026-34477), [CVE-2026-34478](https://nvd.nist.gov/vuln/detail/CVE-2026-34478), and [CVE-2026-34480](https://nvd.nist.gov/vuln/detail/CVE-2026-34480)).

#### Bug fixes

- Fixed a race condition that caused a DLL crash in the Collector on Windows (SumoJNI.dll), which could lead to stuck sender (events_out=0).

