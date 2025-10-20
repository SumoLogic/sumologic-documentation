---
title: Version 19.533-5 (Installed Collector)
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In this release, we've added two important updates to Installed Collectors to enhance performance, security, and ensure long-term support:

:::note
Starting January 31, 2026, Sumo Logic will no longer support the collectors using Java Runtime Environment (JRE) versions older than 17 and will end support for Installed Collectors running on WIN 32 machines.

To ensure continued compatibility and support, upgrade your collectors to JRE 17 or later and migrate your collectors to Windows 64-bit or another supported operating system before this date.
:::

## Java upgrade and end of support for legacy versions

With Java 8 reaching its end of public updates in January 2019, and with newer Java versions offering significant improvements in both performance and security, we are upgrading our Installed Collectors to Java 17. This change applies differently depending on how your collectors are configured:

- **For collectors using default Sumo Logic bundled Corretto JRE**. This deprecation will not affect you as the upgrade to JRE 17 happens automatically when you update your collector to version 19.533-5. No immediate action is required.
- **For collectors with custom JRE setups**. If you're using a custom JRE configuration, including binary installer-based deployments, custom deployment scripts, or containerized collectors with JRE 8 or 11, you must manually upgrade to JRE 17 to maintain compatibility and support. After January 31, 2026, your existing collectors will continue to run. However, you will not be able to upgrade or download new collector versions using JRE 8 or 11.

## End of support for Windows 32-bit (WIN 32) systems

To align with Microsoft’s end-of-life for Windows 32-bit systems and ensure a secure, stable platform for all users, Sumo Logic will end support for Installed Collectors running on WIN 32 machines from January 31, 2026. After this date, the collectors on WIN 32 will no longer be supported and upgrades and new collector downloads for WIN 32 will be disabled.

To maintain support and access to the latest features, migrate your collectors to Windows 64-bit or another supported operating system as soon as possible.

[Learn more](/docs/send-data/collection/upgrade-collectors/#upgradecollectors-to-the-latest-build).