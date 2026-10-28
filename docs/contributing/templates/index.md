---
slug: /contributing/templates
title: Docs Templates
description: Copy-paste templates for creating a new Sumo Logic Docs page, App Catalog doc, Cloud-to-Cloud source doc, or Partner app doc.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Copy one of these templates into a new `.md` file to start a doc from a consistent starting point. Refer to the [Style Guide](/docs/contributing/style-guide) as you fill it in.

:::tip Recommended: Use Claude Code
Skip copying a template by hand. If you have [Claude Code](https://claude.ai/code) installed, these slash commands scaffold a new doc for you: `/doc` for a generic doc, `/app-doc` for an App Catalog doc, and `/c2c-source-doc` for a Cloud-to-Cloud source doc. For release notes, use `/release-note-service`, `/release-note-collector`, `/release-note-cse`, `/release-note-csoar`, or `/release-note-developer`. See the [README](https://github.com/SumoLogic/sumologic-documentation#claude-code-tooling) for the full command list.
:::

<div className="box-wrapper" markdown="1">
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/contributing/templates/generic-doc')}><img src={useBaseUrl('img/icons/documentation.png')} alt="Documentation icon" width="35"/><h4>Doc (Generic) Template</h4></a>
  <p>Create a general feature, how-to, or concept doc.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/contributing/templates/app-template-v2')}><img src={useBaseUrl('img/icons/documentation.png')} alt="Documentation icon" width="35"/><h4>Apps Template</h4></a>
  <p>Create an App Catalog integration doc.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/contributing/templates/c2c-source')}><img src={useBaseUrl('img/icons/documentation.png')} alt="Documentation icon" width="35"/><h4>Cloud-to-Cloud Source Template</h4></a>
  <p>Create a Cloud-to-Cloud source doc.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/contributing/templates/partner-app-doc')}><img src={useBaseUrl('img/icons/documentation.png')} alt="Documentation icon" width="35"/><h4>Partner App Template</h4></a>
  <p>Create a Sumo Logic Partner app doc.</p>
  </div>
</div>
</div>
