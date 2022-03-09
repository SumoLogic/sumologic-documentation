---
slug: /search/get-started-with-search/how-to-use-search-page
---

# How to Use the Search Page

On the Search page you can enter [simple or complex queries](/search/get-started-with-search/how-to-use-search-page/search-basics) to search your entire Sumo
Logic data repository. You can save and select searches from your [Library] (../../01Start-Here/Library.md "Library"). After running a search your results are displayed in either the **Messages** tab (for raw message data) or the **Aggregates** tab (for grouped results). See [how to navigate through search results](navigate-through-search-results.md).

You can [run a saved search](../search-basics/save-search.md), [pause, or stop searches](../search-basics/pause-cancel-search.md), or [schedule a search to run periodically] (../../Visualizations-and-Alerts/Alerts/Scheduled-Searches.md "Scheduled Searches") and notify you of the results.

![search page UI.png](/img/search/get-started-search/how-to-use-search-page/search-page-UI.png)

| Letter | Purpose |
| -- | -- |
| A | Basic or Advanced mode search text box. Advanced mode searches are limited to a maximum of 15,000 characters in length.<br/>Click the clock icon to see recent searches. Previously run searches are saved automatically for your reference. Instead of recreating your search, you can select it from the drop down. |
| B | Time range of the search. |
| C | Start the search. |
| D | Click the gear icon to open the Search Config menu that has the options to use the receipt time and Auto Parse Mode. |
| E | Click the three-dot icon to open a menu with the following options:<ul><li>Select between Basic or Advanced search mode.</li><li>Link to search cheat sheets.</li><li>Edit the search, if it has already been saved.</li><li>Save or schedule a search.</li><li>Share a link for the currently running search.</li><li>Info provides detailed information about the search.</li><li>Pin the search to run in the background independent of the browser session.</li><li>Favorite a saved search.</li><li>Add a new monitor based on the existing query in the search text box.</li><li>Use Live Tail to see a real-time live feed of log events.</li></ul>The menu options are dynamically provided so depending on if you have run or saved the search or conducted aggregation some options will be grayed out and unclickable. |
| F | Histogram of the messages. |
| G | Search Details such as session, status, elapsed time, results, raw count, search expression, and load.<br/>When searching an Infrequent Partition the estimated and actual amount of data scanned is displayed. |
| H | Search results as messages. |
| I | Aggregate search results. |
| J | Download and export search results (up to 100,000 records) as a CSV file. |
| K | Chart options for search results. |
| L | Click the gear icon to open a menu with the options to edit Display Message Preferences, Save as Default View, and Edit Settings JSON. |
| M | Add to Dashboard allows you to create a panel on a Dashboard from your search. If a Dashboard exists for the Search, you will have another option to Update Dashboard to update it based on changes made here. |
| N | Expands the results table and hides the histogram and search text area. |
| O | Hides the histogram. |

## Query colors explained

In your search query, you will see that we have separated out important terms in a search for you by color to help you identify them quickly.  
  
![Query Sample with Colors](/img/search/get-started-search/how-to-use-search-page/query-sample.png)

| Color | Purpose |
| -- | -- |
| Blue | Boolean operators (and, or, not) |
| Red | Quoted string |
| Purple | Sumo first operators (parse, nodrop, etc.) and secondary operators (row, column) |
| Green | Specific numeric values |

## Learn More

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

In this section, we will introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>