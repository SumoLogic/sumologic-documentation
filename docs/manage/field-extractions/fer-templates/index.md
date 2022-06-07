---
slug: /manage/field-extractions/fer-templates
---

# FER Templates

FER Templates are provided for common applications such as Apache Access, Akamai Cloud Monitor, AWS ELB, and Microsoft IIS logs. Instead of creating a parse expression, you can select a Template from the list, preview it, and then click to apply it.

![FERTemplates.png](/img/field-extraction-rules/FERTemplates.png)

The template will overwrite any existing parse expression.

You can use the Template for these logs:

* Akamai Cloud Monitor
* Apache Access
* Apache Tomcat Access
* AWS Cloud Trail
* AWS Elastic Load Balancer
* AWS S3 Usage
* Cisco ASA
* Microsoft IIS
* Nginx
* Palo Alto Networks
* Varnish

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

In this section, we will introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>