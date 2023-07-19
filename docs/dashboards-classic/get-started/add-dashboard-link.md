---
id: add-dashboard-link
title: Add a Dashboard Link
---

You can use the [tourl](/docs/search/search-query-language/search-operators/tourl) operator to link values in a dashboard to any other dashboard where you have View permissions. You can also pass dynamic values to these dashboards and searches based on a table entry.

These in-query links provide convenient drill down capabilities for problem solving. For example, if you track user activity on your website in a dashboard, you can have a panel that provides summary statistics for each user, such as number of logins, as well as links to details that open searches or other dashboards with specific search and dashboard usage statistics.

The following dashboard is an example in-query links, shown in parallel columns.

![image4.png](/img/dashboards/user-activity-test.png)

The following animation, illustrates how you can drill down into the data by selecting an in-query link.

![drilldownExample.gif](/img/dashboards/drilldownExample.gif)

## Tabs
When your URL points to another Sumo Logic feature from your account, such as a Dashboard (New), Search, Traces, or Collection page, you'll have the option to open the link in another Sumo Logic tab or browser tab.

Right-click the link to view the tab-options menu:

![tab-menu](/img/dashboards/tab-menu.png)

If you don't see the menu it's not a supported link.

* The URL must be from the same host.
* The menu isn't available in full-screen mode.

## Linking a Dashboard to another Dashboard

Now that you've seen the advantage of in-query links, this section shows
how to use them to link one dashboard to another.

To create a link from one dashboard to another, we'll first get the link
we want to put on the other dashboard:

1. Open the dashboard you want to link to another dashboard and select the Share ![share-icon](/img/dashboards/share-icon.png) icon.
1. Select **Shareable URL**. You can toggle any of the options to share with filters, the timerange, and accessibility.
1. Select **Copy**. The button text changes to **Copied** when the link has been copied to the clipboard.   <br/>![Dashboard_Share_URL.png](/img/dashboards/Dashboard_Share_URL.png)
1. Now, go to the dashboard where you want the link to appear and click the **Show In Search** icon to edit the query of the desired panel. The following is an example query we'll edit for this task.      
    ```sql
    _sourceCategory=mycategory keyword
    | json "score", "orgId"
    | avg(score) as avg_score by orgId
    ```
1. Add a line to the end of your query using the [toURL](/docs/search/search-query-language/search-operators/tourl) operator. The following assigns the Dashboard URL to the name **Account Dashboard** and adds it to the field **org**.
    ```sql
    _sourceCategory=mycategory keyword
    | json "score", "orgId"
    | avg(score) as avg_score by orgId
    | tourl("https://service.sumologic.com/ui/dashboard.html?k=example", "Account Dashboard") as org
    ```

## Customize filters from a query

A Dashboard that is configured with filters can be provided with custom filter values through its URL.  

[Dashboard filters](/docs/dashboards-classic/edit-dashboards/use-filters-dashboards) are in the format: `filters=<filtername>*eq*<value>`. For example, if you have a filter on the field `_source` and that filter has a value of **CrowdStrike** your filter would be appended as:  
```sql
&filters=_source*eq*CrowdStrike
```  

The full dashboard URL and this filter would look like: `https://service.sumologic.com/ui/dashboard.html?k=abcdefghi&f=&t=r&filters=_source*eq*CrowdStrike`.

To apply a filter value through a query, use the [concat](/docs/search/search-query-language/search-operators/concat) operator to concatenate the custom value to the location in the URL where the filter value is located. Using the same query example from the previous section, we'll use the value of the **orgId** field as a filter value in the Dashboard URL.

```sql
_sourceCategory=mycategory keyword
| json "score", "orgId"
| avg(score) as avg_score by orgId
| tourl(concat("https://service.sumologic.com/ui/dashboard.html?k=abcdefghi&f=&t=r&filters=orgId*eq*", orgId), "Account Dashboard") as org
| fields orgid, avg_score, org
```

When the query runs the value from the field **orgId** will be concatenated (appended in this case) to the location of the filter value. For example, if the value of **orgId** was `999` the filter section of the URL would be `&filters=orgId*eq*999`.

## Linking a Dashboard to a Search

Probably more common than linking a Dashboard to a Dashboard is linking a Dashboard to a search. You can use the linked Dashboard as a list of possible searches to help you investigate further by providing dynamic values as links.

1. Build your search and include the dynamic value for your link, using both the [concat](/docs/search/search-query-language/search-operators/concat) and [urlencode](/docs/search/search-query-language/search-operators/urlencode) operators.

    For example, to build a query that gives login activity for a user:

    ```sql
    urlencode(concat(“_sourceCategory=login_events and ” , user)) as search_query
    ```

    :::note
    We dynamically added the user value to the search by adding the user field. 
    ::: 

1. Create a URL and pass the search query you created as the parameter in the URL string.

    ```sql
    | format ("https://{YourURL}/ui/#/search/@%d,%d@%s",querystarttime(),queryendtime(),search_query) as search_query_link
    ```    

    :::note
    This example uses the same time range as the main query, but you can do any other time range if needed. Also, you must replace `{YourURL} `with your URL.
    :::

1. Create a hyperlink with the appropriate description using the [toURL](/docs/search/search-query-language/search-operators/tourl) operator.  For example:
    ```sql
    | tourl(search_query_link , "Click Here") as search_query_link
    ```    
1. Add the search to the dashboard. The field **search_query_link** automatically converts to hyperlink in the dashboard. In our example dashboard, **Click Here** displays.

    ![Screen Shot 2019-08-15 at 8.27.00 PM.png](/img/dashboards/search-query-link.png)

    :::note
    You will not see the hyperlink in the Search Page, only in the dashboard page. 
    ::: 

## Amazon GuardDuty Dashboard Use Case

Threat data provided by the GuardDuty provides a lot of data into threats you are facing. With a linked dashboard, we can drill down into one particular threat to understand it better. 

For example, we can modify the default Amazon GuardDuty - Threat Details Benchmark dashboard of the GuardDuty app, making the threatName column a link to threatDetails.

![image1.png](/img/dashboards/amazon-guarddog.png)

Clicking on the threatDetails link gives us the raw guard duty event associated with that particular threatType and threatPurpose. This allows users to get more details about the particular threat, like which resource was affected by the threat:

* Name
* ID
* IP address
* Security permissions applied to the resource.

All this information can help your users investigate security incidents quickly and effectively. To create this link, add the following snippet to your to the existing GuardDuty panel query. Include the section at the end of your query:

```
| urlencode(concat("_sourceCategory={SumoGuardDutysourceCategoryName}
| json field=_raw \"id\", \"type\",\"severity\" ,\"title\",\"description\", \"accountId\", \"resource.resourceType\", \"region\" | toint(severity) as sev | parse field=type \"*:*/*\" as threatPurpose, targetResource, threatName | where threatName = \"", threatName ,"\" and threatPurpose=\"",threatPurpose ,"\"")) as query
|format("https://{yourSumoDashboardURL}/ui/index.html#section/search/@%d,%d@%s",queryStarttime(),queryendtime(),query) as url
| tourl(url, threatName) as threatName
| fields -query,url
```
