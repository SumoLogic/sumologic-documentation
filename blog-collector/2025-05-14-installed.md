---
title: Version 19.525-42 (Installed Collector)
hide_table_of_contents: true
image: https://www.sumologic.com/help/img/reuse/sumo-square.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In this release, we've enhanced the security and stability of the Collector with added support for security patches and a bug fix.

## Security Fix

- Upgraded `com.google.crypto.tink` to version 1.16.0 to address protobuf-java DOS vulnerability (CVE-2024-7254).

## Bug Fix

- Fixed the improper filtering of `AD` objects when `Exclude Distinguished Name Suffixes` filter is configured.
