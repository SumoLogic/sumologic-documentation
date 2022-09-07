---
id: "run-searches-from-apps"
---

# Run Searches from Sumo Logic Apps

Sumo Logic Apps provide a host of pre-built saved searches for popular data Sources that you can run against your data without installing the App itself. This way, you can try the searches in a Sumo Logic App against your data before you decide to install it. Or you can run the searches to see how good example queries are written.

To run a saved search from a Sumo Logic App, just find the search you want to run in the Library, click it, and select a Source Category or a custom data filter to run the search against. The Search page opens and runs the search in a new tab automatically using the query's time range.

In order to run a search from an App, you would first need to have data ingested in your system that the search query would find. For example, before you can run a search from the Sumo Logic App for Apache, you must set up a Collector and Source to ingest your Apache data. If you don't have data that matches the requirements of the search query, or if you select the incorrect Source Category or data filter, you will either get no results, or bad results.

After the search has run, you can [save the search](../../search/get-started-with-search/search-basics/save-search.md) to use it again in the future from the Library.

:::important
Searches from Enterprise Apps, which require a paid Professional Services contract, are not included.
:::

## Run a Search

To run a search from a Sumo Logic App:

1. Find the Sumo Logic App for the data Source you would like to search in the App Catalog (**Library \> Apps** in the classic UI). For example, we've picked Cloud Passage Halo's **Outlier in Critical Issues**.

    ![Outlier in critical issues](/img/get-started/library/FindSearchInApp.png)

1. Find the search you want to run and click it.
1. In the **Run Search** dialog, select a **Source Category** or enter a **Custom data filter** to run the search against.

    ![Run a Search from an app](/img/get-started/library/RunSearch.png)

1. Click **Run Search**.

The **Search** page opens, the search populates a new tab, and the search runs using the query's time range. If you would like to use a different time range, stop the search and reset it.

If you don't have data that matches the requirements of the search query, or if you select the incorrect Source Category or data filter, you will either get no results, or bad results.

:::note
Searches included with the [Sumo Logic App for Data Volume] (docs/integrations/sumo-apps/Data_Volume_App_-_Legacy.md "Data Volume App") do
not require you to select a Source Category.
:::

## Custom Data Filters

When you install a Sumo Logic app, you tell Sumo what data to search and present in app dashboards.

Most typically, you specify the source category that was assigned to the logs or metrics source when data collection was set up for the app. 

However, if you want to use multiple metadata fields as your filter criteria, for example both source category and source host, you must define a custom data filter. The app will prefix its searches with your custom data filter. 

### Define a custom data filter

1. In the App Catalog, select the application you want to install and click **Add to Library**.
1. The **Add \<*AppName\>* to Library** popup, click the down arrow next to **Source Category**.
    
    ![Custom Data Filter](/img/get-started/library/add-apache.png)

1. A **Custom Data Filte**r option appears. Click the option. 
    
    ![apache-custom-filter.png](/img/get-started/library/apache-custom-filter.png)

1. Enter a filter expression in the **Custom Data Filter** field. For example filters, see [Example custom data filters](#example-custom-data-filters), below. 

    ![apache-custom-filter-field.png](/img/get-started/library/apache-custom-filter-field.png)

### Example custom data filters

The table below has examples of custom data filters.

| Custom Data Filter | Description |
| -- | -- |
| `_sourceHost=stage-EMEA* AND _sourceCategory=Apache*` | App searches will return data whose source host begins with the string stage-EMEA and whose source category begins with the string Apache. |
| `_sourceCategory=Apache* AND "dev-us"` | App searches will return log data that contains the string dev-us whose source category begins with the string Apache. |
| `_sourcehost = "Jon Smith"` | App searches will return data whose source host is Jon Smith. If a metadata field value contains spaces, you must use quotes. |
| `_sourceHost=stage-EMEA* AND (_source=Apache* or _source=DB)` | App searches will return data whose source host begins with the string stage-EMEA and whose source either begins with Apache or is DB. We use parentheses to group the logic operations. |