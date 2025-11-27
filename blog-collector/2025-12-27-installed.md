---
title: Version 19.534-1 (Installed Collector)
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In this release, we've enhanced the security and stability of the Collector with added support for security patches.

- Upgraded collector JRE to **Amazon Corretto Version 17.0.17.10.1**.
- Upgraded `com.tanuki:wrapper` to version 3.6.3.
- Upgraded `org.bouncycastle:bc-fips` to version 1.0.2.6 to address known security vulnerabilities (CVE-2025-8885).
- Known issues when upgrading to this version:
  - **Collector running as non-root user**. Collector running as non-root user (run as mode) cannot be upgraded through the API/Web UI. It display an error message indicating that the upgrade is not possible. The upgrade must be performed manually on your machine. Follow the [steps to upgrade manually](/docs/send-data/collection/upgrade-collectors/#upgrade-collectors-using-the-command-line).
  - **Collector running on Mac**. Collector running on a Mac operating system cannot be upgraded through the API/Web UI. The process will stop, and the collector will need to be restarted manually on your machine if upgraded using API or Web UI. Use the below code to manually restart.
    ```
    sudo ./collector start
    ```