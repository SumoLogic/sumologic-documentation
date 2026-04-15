---
title: Terraform Support of Token-Based Authentication for Secure HTTP Sources (Collection)
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - http source
  - authentication
hide_table_of_contents: true    
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Previously, we announced [token-based authentication for secure HTTP sources](/release-notes-service/2026/02/10/collection/). Now we are happy to announce that the Terraform `sumologic_http_source` data source adds the `token` and `base_url` attributes to support token-based auth for HTTP sources. [Learn more](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/data-sources/http_source).