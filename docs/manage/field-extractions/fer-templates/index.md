---
slug: /manage/field-extractions/fer-templates
title: FER Templates
description: Instead of creating a parse expression, you can select a Template from the list, preview it, and then click to apply it.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

FER Templates are provided for common applications such as Apache Access, Akamai Cloud Monitor, AWS ELB, and Microsoft IIS logs. Rather than creating a parse expression from scratch, you can select a Template from the list, preview it, and then click to apply it.

<img src={useBaseUrl('img/field-extraction-rules/FERTemplates.png')} alt="img/field-extraction-rules/FERTemplates.png" width="450"/>

The template will overwrite any existing parse expression.

In this section, we'll introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>
