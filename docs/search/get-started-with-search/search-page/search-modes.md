---
id: search-modes
title: Search Modes
description: Learn about the new search modes of our Log Search page.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic Log Search offers two search modes to build your searches, Advanced and Basic.

* **Basic Mode** gives you a structured query builder that writes a simple log query. This mode is designed for new users that are not familiar with Sumo Logic search features and query language. We recommend taking [Certification Courses](/docs/get-started/training-certification-faq) and reading the [Getting Started](/docs/get-started) content before moving to advanced mode.
* **Advanced Mode** has the original query text box and supports all of our search query language and features.

For details on all other Log Search page features, see [How to use the search page](/docs/search/get-started-with-search/search-page).

## Switch Modes

When you open a Log Search you'll have the option to switch between Basic and Advanced Mode. The selected mode will persist to new searches.

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Logs > Log Search**. You can also click the **Go To...** menu at the top of the screen and select **Log Search**.  <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to the **Home** screen and select **Log Search**. 
1. Click the three-dot kebab icon on the right of the Search page and select **Basic Mode** or **Advanced Mode** from the menu options. <br/><img src={useBaseUrl('img/search/get-started-search/search-page/search-menu-options.png')} alt="Search menu options" style={{border: '1px solid gray'}} width="200" />

## Basic Mode

Search offers an easy-to-use, structured query builder to help you write and complete simple log searches quickly and easily. This feature is designed for basic queries and has limited support of the Search Query Language. Once you're comfortable using basic mode we recommend you start using Advanced Mode to get the full value out of Sumo Logic and its robust search capabilities.

## Basic Mode Query Builder

This section elaborates on the input options.

<img src={useBaseUrl('img/search/get-started-search/search-page/basic-mode-query-editor.png')} alt="Basic mode query editor" style={{border: '1px solid gray'}} width="600" />

* **Data Tier**. Select from the dropdown which Data Tier the query should run against, either Continuous, Frequent, or Infrequent. See [Searching Data Tiers](/docs/manage/partitions/data-tiers/searching-data-tiers) for further details.
    :::note
    **Data Tier** option is not available for the customer with Flex.
    :::

    <img src={useBaseUrl('img/search/get-started-search/search-page/Data-Tier-options.png')} alt="Data Tier options" style={{border: '1px solid gray'}} width="200" />

* **Index**. Type in any [Partitions](/docs/manage/partitions) you want to run the query against. When you click in the text area a list of available options is provided. Click an option to automatically fill in the value in the text area. You can continue to add additional Partitions if desired.<br/><img src={useBaseUrl('img/search/get-started-search/search-page/Basic-mode-Index-options.png')} alt="Basic mode Index options" style={{border: '1px solid gray'}} width="500" />
* **Filters**. Type in any [fields](/docs/manage/fields) you want to run the query against. Once you select a field you need to select a value for it. When you click in the text area and begin typing an autocomplete list begins to offer suggestions. Click a suggestion to automatically fill in the value in the text area. You can continue to add additional fields if desired.<br/><img src={useBaseUrl('img/search/get-started-search/search-page/basic-mode-filters-option.png')} alt="Basic mode filters option" style={{border: '1px solid gray'}} width="300" />

    * **Not option**: Once you have entered a filter you'll see a gray **no symbol** or **prohibition sign** to the left of the filter.<br/><img src={useBaseUrl('img/search/get-started-search/search-page/prohibition-sign.png')} alt="Prohibition sign" style={{border: '1px solid gray'}} width="200" />

        Click it to enable the filter as a NOT boolean, where the filter acts as an exclusion instead of inclusion. When enabled, the filter gets a border, and the no symbol changes to the color coral.<br/><img src={useBaseUrl('img/search/get-started-search/search-page/not-option-enabled.png')} alt="Not option enabled" style={{border: '1px solid gray'}} width="200" />

* **Keywords**. Type a [keyword search expression](../build-search/keyword-search-expressions.md) in the text area.<br/><img src={useBaseUrl('img/search/get-started-search/search-page/basic-mode-keywords-input.png')} alt="Basic mode keywords input" style={{border: '1px solid gray'}} width="800" />

For details on all other Log Search page features, see [How to use the search page](/docs/search/get-started-with-search/search-page).
