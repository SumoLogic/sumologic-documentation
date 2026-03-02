---
id: search-from-field-browser
title: Search from the Field Browser
description: Drilling down into a field from the Field Browser is seamless for non-aggregate queries.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Depending on the type of field you want to drill down into, you can run searches in two ways:

* **Drill down searches.** Depending on if the field contains a string or numerical value, there are default drill down searches that you can run by simply clicking the name of the search.
* **Histogram.** Clicking a value in the histogram runs a new search on that value.

### About histograms

The histogram shows the top ten values (by percentage) of a field. If there are fewer than ten values returned you'll see fewer than ten values. 

### Searches for numerical fields

When you click a numerical field the average, minimum, maximum, and standard deviation values are displayed in addition to the top ten values by percentage. Click one of the **DRILLDOWN** search options at the bottom of the pane to start a new search.

<img src={useBaseUrl('img/search/get-started-search/search-page/field-browser-number.png')} alt="field browser number" style={{border: '1px solid gray'}} width="700" />

### Searches for fields containing strings

The histogram shows the top ten values by percentage. Click one of the **DRILLDOWN** search options at the bottom of the pane to start a new search.

<img src={useBaseUrl('img/search/get-started-search/search-page/String-values-in-Field-Browser.png')} alt="String values in Field Browser" style={{border: '1px solid gray'}} width="700" />

### Launching a search from the Field Browser

The drill down searches can be launched with just a click, opening a new search tab.

**To launch a drill down search from the Field Browser:**

1. Run a search.
1. In the Field Browser column, click a field.
1. Click one of the **DRILLDOWN** search options at the bottom of the pane. A new search is created.
