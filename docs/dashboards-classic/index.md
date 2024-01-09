---
slug: /dashboards-classic
title: Dashboards (Classic)
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/dashboards.png')} alt="icon" width="50"/>

:::caution
We strongly recommend using our upgraded [Dashboards](/docs/dashboards), which allows you to analyze metrics and log data on the same dashboard in a streamlined user experience. Sumo Logic will cease updates and support for Classic Dashboards.
:::

Dashboards are a powerful forensic tool to create searches and view search results based on data available through a search.

<Iframe url="https://www.youtube.com/embed/FWzqVitfAfo"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

import Iframe from 'react-iframe';

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

See the following options to view and modify settings for dashboards:

<DocCardList items={useCurrentSidebarCategory().items}/>
