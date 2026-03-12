---
title: April 23, 2026 - Content Release
hide_table_of_contents: true
keywords:
  - rules
  - log mappers
  - parsers
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082  
---

import useBaseUrl from '@docusaurus/useBaseUrl';

On April 23, 2026, Sumo Logic deprecates the Grok parsing service. For over two years Sumo Logic has been using Sumo Parsers and Cloud-to-Cloud (C2C) integrations as the approved methods of ingesting data into Cloud SIEM. If your Sumo Logic Instance contains sources that are utilizing Grok for parsing, you must migrate them to use the supported C2Cs or Sumo Logic parsers.

If you do not configure your data sources to use the supported C2Cs or Sumo Logic parsers, then you will lose the ability for those data sources to create any records, signals, or insights within Cloud SIEM on the Grok deprecation date and going forward.

[Learn more](/docs/cse/schema/grok-deprecation-notice).
