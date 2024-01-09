---
id: create-slo
title: Create an SLO
description: Learn how to create an SLO for reliability management.
keywords:
    - _view=sumologic_slo_output
    - sloVersion
---

import useBaseUrl from '@docusaurus/useBaseUrl';

When creating an SLO, you'll need to define the following:

* SLI (service level indicator) metric you are tracking and target configuration using ratio- or threshold-based definitions
* SLO (service level objective) defining the target and duration to monitor (for example, the uptime for the target)
* Basic details for SLO name and description

You have multiple configurations for creating SLOs:

* **Measurement for SLO**: Windows of time or Requests.
* **Query type**: Metrics or Logs.
* **Calculation definition**: Ratio (tracked amount against a total) or Threshold. Instead of defining two queries to identify successful versus total events to create a Ratio, you can specify a Threshold for the Total Events query that identifies successful events.

The following table lists the available options for an SLO:

|    | Window-based      | Request-based    |
|:---------|:-----|:---------|
| **Metrics-based SLO** | Ratio and Threshold | Ratio Only   |
| **Logs-based SLO**   | Ratio and Threshold | Ratio and Threshold |

## Create an SLO (General)

1. Click **Manage Data** > **Monitoring** > **SLO** tab.
2. Click **Add** > **New SLO**. Optionally, you can also:
   * Create folders to manage your SLOs.
   * Import an SLO:
      1. To transfer data immediately and create an SLO using an import, you should first export JSON content to use that formatting. The Sumo Logic JSON format may change without notice. See [Export and Import Content in the Library](/docs/get-started/library#import-content) for complete details.
      2. Click **Manage Data**, then **Monitoring**. Select the SLO tab if not loaded.
      3. Click **Add** > **Import**.
      4. Enter a Name for the SLO.
      5. Copy and paste the JSON in the text editor.
      6. Click **Import**.<br/><img src={useBaseUrl('img/observability/slo-import.png')} alt="Reliability Management SLO SLI" />
3. Select the **Signal Type**:
    * **Latency**. Select to calculate the speed of services, lag time.
    * **Error**. Select to monitor for errors that occur in your services.
    * **Throughput**. Select to track the throughput of services and processing.
    * **Availability**. Select to monitor the uptime of services.
    * **Other**. Select to monitor any other metric or log for SLIs.<br/><img src={useBaseUrl('img/observability/slo-create-type.png')} alt="Reliability Management SLO SLI" />
4. Select the Evaluation Type which determines how the events are measured:
    * **Window-based**. Select the time frame window for the events. Window sizes should be between 1m to 60m.<br/><img src={useBaseUrl('img/observability/slo-create-window-base.png')} alt="Reliability Management SLO SLI" />
    * **Request-based.**<br/><img src={useBaseUrl('img/observability/slo-create-request-base.png')} alt="Reliability Management SLO SLI" />

Select the **Query Type** to select and build your queries for the SLI data. You have a choice of Metrics or Logs with a ratio-based (partial against the total) or threshold-based (events amount against a set threshold amount) calculation. Review [Query recommendations](#query-recommendations) before building.

Follow the instructions below based on the query type:

<table>
  <tr>
   <td>Metrics: Ratio-based
   </td>
   <td>Metrics: Threshold-based
   </td>
  </tr>
  <tr>
   <td>For <strong>Ratio-based</strong> definition, define queries for the successful or unsuccessful events to calculate against total events:
<ol>
<li>Specify Total Events query.</li>
<li>Build a query using metrics and filters. See <a href="/docs/metrics/introduction">Overview of Metrics in Sumo</a>.</li>
<li>Select the values to use from <strong>Number of data points </strong>or <strong>Metric value</strong>.</li>
<li>Configure the Total Events, including a query and values, to use <strong>Number of data points</strong> or <strong>Metric value</strong>. You can copy and paste the previous query, removing filters to get the total.</li>
</ol>
   </td>
   <td>
    For <strong>Threshold-based</strong> definitions, which calculate against success criteria:
<ol>
<li>Select <strong>Successful</strong> or <strong>Unsuccessful Events</strong> to measure.</li>
<li>Build a query using metrics and filters. See <a href="/docs/metrics/introduction">Overview of Metrics in Sumo</a> for more information.</li>
<li>For <strong>Use values from</strong>, it always uses the Metric value.</li>
<li>For <strong>Success Criteria</strong> for <strong>Avg</strong>, <strong>Min</strong>, <strong>Max</strong>, or <strong>Sum</strong> of the selected signal type (such as latency) which must be <strong>greater than</strong>, <strong>greater than or equal to</strong>, <strong>less than</strong>, or <strong>less than equal to</strong> an amount you enter (positive or negative number).</li>
</ol>
   </td>
  </tr>
</table>

<img src={useBaseUrl('img/observability/slo-metrics.gif')} alt="Reliability Management SLO SLI" />

<table>
  <tr>
   <td>Logs: Ratio-based
   </td>
   <td>Logs: Threshold-based
   </td>
  </tr>
  <tr>
   <td>For <strong>Ratio-based</strong> definitions, which calculate successful or unsuccessful events against total events:
<ol><li>Specify Total Events query.</li>
<li>Search logs selecting and entering a log query. See <a href="/docs/search/get-started-with-search/search-basics/about-search-basics">About Search Basics</a> for more information.</li>
<li>For <strong>Use values from</strong>, select the numeric value available for that query to pull data from.</li>
<li>Then configure the <strong>Total Events</strong>, including a query and values. You can copy and paste the previous query, perhaps with filters removed to get the total.</li>
</ol>
   </td>
   <td>For <strong>Threshold-based</strong> definitions, which calculate against success criteria:
<ol><li>Select <strong>Successful</strong> or <strong>Unsuccessful Events</strong> to measure.</li>
<li>Search logs selecting and entering a log query. See <a href="/docs/search/get-started-with-search/search-basics/about-search-basics">About Search Basics</a> for more information.</li>
<li>For <strong>Use values from</strong>, it always uses the Metric value.</li>
<li>For <strong>Success Criteria</strong> for <strong>Avg</strong>, <strong>Min</strong>, <strong>Max</strong>, or <strong>Sum</strong> of the selected signal type (such as latency), which must be <strong>greater than</strong>, <strong>greater than or equal to</strong>, <strong>less than</strong>, or <strong>less than equal to</strong> an amount you enter (positive or negative number).</li>
</ol>
   </td>
  </tr>
</table>

   <img src={useBaseUrl('img/observability/slo-logs.gif')} alt="Reliability Management SLO SLI" />

8. Define your SLO for target amount and duration period to monitor:
   * **Target**. The value in percentage you want to target for the SLO (for example, you'd enter `99` for 99%).
   * **Compliance Type**. **Rolling** provides a sequence of recent days for the Compliance Period, such as the last 7d or last 30d. **Calendar** calculates over a window of time for a Week.
   * **Timezone**. Selecting a timezone is important to accurately assign events on the boundary of a compliance period, such as events received at 11:59 PM in a particular time zone.<br/><img src={useBaseUrl('img/observability/slo-create-slo.png')} alt="Reliability Management SLO SLI" width="400"/>
9. Enter SLO Details:
   * **Name**. Name of the SLO.
   * **Description**. Short explanation of your SLO.
   * **Tags**. Tags are key/value pairs that allow you to apply additional metadata to your SLOs beyond the name and description. [Learn more here](#slo-tags-and-filters). Tags can help you categorize, search, and filter your SLOs. They also enable you to correlate your other content items and data with SLOs.<br/>Select the key and its possible values from the tags dropdown, or create your own key/value pair for the tag.<br/>
  :::info
  You can associate multiple tags with your SLO.
  :::
  <img src={useBaseUrl('img/observability/slo-details.png')} alt="SLO Details" width="800"/>
10. Click **Save**. To create a monitor, click [Save and Create Monitor](#create-an-slo-monitor).

## Create an SLO from Log Search page

You can create SLOs directly from your Sumo Logic log search. This allows you to validate queries, quickly create SLOs, and reuse queries from existing dashboard panels.

1. Enter a new **Log search** query (or use an existing one).<br/><img src={useBaseUrl('img/observability/log-search.png')} alt="log search" />
1. Click the **More Actions** (kebab icon) dropdown menu.<br/><img src={useBaseUrl('img/observability/slo-more-actions-kebab.png')} alt="More Actions" width="400"/>
1. Click **Create an SLO**.<br/><img src={useBaseUrl('img/observability/slo-create.png')} alt="Create an SLO" width="150"/>


## Create an SLO from Metrics page

To create an SLO from the **Metrics** page:

1. Click **+ New** > **Metrics** or go to an existing **Metrics** tab.
1. Under **Metrics Explorer**, select your desired **Metric** and **Filters**. Optionally, you can **Add Operator**.<br/><img src={useBaseUrl('img/observability/metrics-slo.png')} alt="metrics-slo.png" />
1. Click the three-dot kebab icon, then select **Create an SLO**.
1. Follow the instructions under [Create an SLO (General)](#create-an-slo-general).

You can use [metrics operators](/docs/metrics/metrics-operators) for metrics-based SLOs. The metrics query specified in your SLO should have a quantization after the selector. You can specify one or more operators in the query for SLO.

As an example, a pure selector query with no operators could be `_sourceCategory=my-web-server metric=is_healthy`, which returns one time series per instance your web server indicating if it is healthy or not (`1` or `0`). To count the number of instances that were healthy in a given minute, you can use the `sum` operator with an appropriate quantization method and interval, as follows: `_sourceCategory=my-web-server metric=is_healthy | quantize to 1m using max | sum`.

## Create an SLO from Monitors list page

Critical Monitors are great candidates to convert to SLOs. From the **Monitors** section, you can create a Monitor- and window-based SLO for a given trigger condition.

As an example, say you have an existing Monitor that fires a **Critical** alert if the latency of a customer-critical service exceeds 500ms. By creating an SLO directly through this specific Monitor, those thresholds will automatically carry over into the new SLO, saving you time and effort.

:::caution Prerequisite
Your Monitor must be in an **active** state.
:::

1. Go to **Manage Data** > **Monitoring** > **Monitors** tab.
1. Click on any active Monitor to open its panel.
1. Choose one of the methods below:<br/>Click **More Actions** > **Create SLO**.<br/><img src={useBaseUrl('img/observability/more-actions-create-slo.png')} alt="Monitor-based SLO" width="500"/>   <br/>Or, click <strong>Monitor-based SLO</strong> > <strong>Add Monitor-based SLO</strong>.<br/><img src={useBaseUrl('img/observability/add-monitor-based-slo.png')} alt="Monitor-based SLO" width="500"/><br/>
This will open the **New SLO** window.
1. **Define your SLI**. Your Monitor's **Source**, **Signal Type**, and **Trigger Event** settings will auto-populate here (you can override these if you need to).<br/><img src={useBaseUrl('img/observability/new-slo1.png')} alt="Monitor-based SLO" />
1. **Define your SLO**. Set your window-based threshold here.<br/><img src={useBaseUrl('img/observability/new-slo2.png')} alt="Monitor-based SLO" />
1. When you're done, click **Save**, which will save the SLO.<br/><img src={useBaseUrl('img/observability/new-slo4.png')} alt="Monitor-based SLO" width="350" />

To edit SLO parameters:
1. Go to the **SLO** tab, locate your SLO and click on it. (If you're unable to find it, try applying filters or go to the search bar at the top and enter the SLO name or folder name.)
1. Edit definition and other parameters.

To edit SLO parameters from a Monitor:
1. Go to the **Monitors** tab and click on any Monitor.<br/><img src={useBaseUrl('img/observability/monitors-tab.png')} alt="Monitor-based SLO" width="500" />
1. In the panel, click **Monitor-based SLO** to view the list of SLOs associated with that particular Monitor.<br/><img src={useBaseUrl('img/observability/monitor-based-slo-panel.png')} alt="Monitor-based SLO" />

:::important
Any Monitor update that changes the Monitor definition will lead to a change in the version of related SLOs. This means that the SLO history or SLI will get reset for the SLO. Example include trigger condition changes and evaluation delay changes. Changes unrelated to the definition like **Name**, **Description** will not affect the related SLOs.
:::

### SLI calculation for Monitor-based SLOs

SLIs for Monitor-based SLOs are calculated at a granularity of 1 minute. One minute is treated as unsuccessful if the Monitor threshold is violated at any point of time within that minute.

## Create an SLO via Terraform

You can use the Sumo Logic Terraform provider to automate the creation of [SLOs (`sumologic_slo`)](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/slo) and [SLO folders (`sumologic_slo_folder`)](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/slo_folder). This can be useful for organizations that want to:
* Templatize SLOs
* Standardize the configuration of SLOs, monitors, and dashboards
* Automate SLO-related workflows

You can use the [Monitor Terraform provider (`sumologic_monitor`)](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/monitor) to create monitors associated with SLOs.


## Managing your SLOs

Below are some best practices for managing your SLOs. To get to your SLOs list, click **Manage Data** > **Monitoring** > **SLOs** tab.

### Tags and Filters

You can add key/value pair tags to your SLOs to allow you to better organize and filter them. For example, you might find it useful to add tags for `team`, `service`, and `application`.

:::note Limitations
- Tag keys cannot start with the prefixes `sumo.` or `_`
- Tag keys must only contain letters, numbers, and/or the symbols `_`, `.`, `/`, `+`, `-`, `@`
- Tag values can only contain letters, white spaces, numbers, and/or the symbols `_`, `.`, `/`, `=`, `+`, `-`, `@`
- You can associate a maximum of 50 tags per SLO.
:::

#### Add a Tag

To add a tag(s) to an existing SLO:

1. Click on any SLO line item in your list, then click **Edit**.
1. Scroll down to section **(3) SLO Details**. Click on **Tags (Optional)** and type in a new tag or select an existing tag.
1. Click **Save**.

To add a tag while creating a new SLO:

1. Click **Add** > **New SLO**.
1. After you've filled out sections **1** and **2**, scroll down to section **(3) SLO Details**. Click on **Tags (Optional)** and type in a new tag or select an existing tag.
1. Click **Save**.

#### Filter SLOs By Tags

After you've added a tag, you'll see it populate in the **Tags** column next to your SLO in the list.

1. Click **Add a filter** at the top of the screen, then click **Tag**.<br/><img src={useBaseUrl('img/observability/slo-tags.png')} alt="slo-tags.png" width="400"/>

2. Scroll through the list of tags or type in the tag name you're looking for.<br/><img src={useBaseUrl('img/observability/slo-tags.gif')} alt="slo-tags.gif" />

<img src={useBaseUrl('img/observability/FilterByTagKey.png')} alt="FilterByTagKey.png" />

If you run a query with multiple values for same tag key, they are `OR`'d. Tag filters for different tag keys are `AND`'d.

In this tag filter example query below, it's looking for SLOs where the `service` is either `cart` OR `checkout` OR `coffee-machine`.

<img src={useBaseUrl('img/observability/FilterByTagValue.png')} alt="FilterByTagValue.png" />

### Save filter

You can create and save custom filter views, allowing you to focus on the SLOs and insights most important to you. In this example, we'll create a view that contains the filters we've created above.

1. Click in the **Add a filter** field.

2. Enter the filters. In this example (see screenshot below #3), we are using tag filters. To use a tag filter, select `tag` -> select tag key (`application` in this example) -> select value for that tag key (`coffee-bar` in this example). You can select multiple filters for a saved filters.

3. Click the **Save Filter** icon on the right.

<img src={useBaseUrl('img/observability/SaveANewFilter.png')} alt="SaveANewFilter.png" />

4. Enter a name for the filter (we'll call it `Coffee Bar Application`).

<img src={useBaseUrl('img/observability/SaveANewFilterDialogue.png')} alt="SaveANewFilterDialogue.png" />

5. Optionally, you can set this as your default view so that when you load SLOs list page, this set of filters will be rendered by default.

6. Click **Save**.

This is how default filter rendering looks like:

<img src={useBaseUrl('img/observability/DefaultView.png')} alt="DefaultView.png" />

:::note
You can also set a saved filter view as default later by clicking the kebab menu next to the funnel icon > Click on **Set as default**.
:::

You can see the list of all saved filter views by clicking on the funnel icon.

<img src={useBaseUrl('img/observability/ListOfSavedFilters.png')} alt="ListOfSavedFilters.png" />

You can make further modifications to a saved filter view later using kebab menu options next to the funnel icon.

<img src={useBaseUrl('img/observability/MenuOptionsForAnExistingFilter.png')} alt="MenuOptionsForAnExistingFilter.png" />

:::note  
* A maximum of 10 saved views are allowed per user.
* Saved filter views are only visible to you and cannot be shared with other users in your org.
:::
