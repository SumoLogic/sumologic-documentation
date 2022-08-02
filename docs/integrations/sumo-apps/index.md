---
id: index
title: Apps for Sumo Logic
description: Docs for apps that help you monitor your Sumo Logic org.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/sumo-apps/sumoapps.png')} alt="Web servers icon" width="75"/>

Sumo Logic provides a number of apps you can use to monitor your Sumo org, for instance, to understand data volume or see information about audit events. This guide has documentation for those apps.

## Requesting Sumo Logic Enterprise Apps

Although most apps can be installed directly from the Library, some apps are not available for instant installation. Enterprise apps, such as the [Sumo Logic App for PCI Compliance](/docs/integrations/pci-compliance/setup) and the [Sumo Logic App for Security Analytics](/docs/integrations/sumo-apps/security-analytics), are available for Sumo Logic Enterprise accounts only, and require a paid Professional Services contract to install and configure. You may upgrade your account at any time. In these instances, an admin can request an estimate.

Once a request has been submitted, a support ticket is automatically opened. A representative from Sumo Logic will respond to the request as quickly as possible, generally between one and two business days. Depending on the app that's been requested, Sumo Logic may need additional information, or may need to work with your organization to change the account type to enable some apps.

**To request an estimate:**

1. In the App Catalog, search the Enterprise app you'd like.
2. Click Request App Install.
3. Select the option to give Sumo Logic agents permission to access your account to install the app, and click Request.

## Table of Contents

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
