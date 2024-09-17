---
id: run-search-against-view
title: Run a Search Against a View
description: Learn how to run a search against indexed data in a Scheduled View.
---

Running a search against the indexed data in a Scheduled View is almost exactly the same as running any other query. The difference you'll notice is the quick speed at which results are returned, especially if you're searching over a long period of historical data.

Queries that contain Views can be saved as scheduled searches, as Dashboard Panels, and as published or saved searches. Only Admins can [create Scheduled Views](add-view.md).

To run a search against a Scheduled View:

1. Begin the search with `_view=ScheduledViewName`, specifying the name of the Scheduled View that has indexed the data you want to search. The use of `_view` is only supported in the scope of a query, that is, before the first pipe (`|`).
1. Type the rest of the query, using any operators you prefer.

    For our example, we're running a search against a Scheduled View named fraudTroller, which indexes NGINX logs. By specifying that subset of data, we can dive into the prior day's logs, and get search results very quickly because the data has already been aggregated. Depending on the operators in the query, we could use this as a scheduled search or even a Dashboard Panel.  

    ```sql
    _view=fraudTroller
    | sum(total) as total,count_distinct(cookie) as %"Cookie", count_distinct(url) as distinct_pages,sum(login_cmd) as login_cmd, sum(login_jsp) as login_jsp, sum(main_jsp) as main_jsp ,max(L_time) as L_time, min(E_Time) as E_Time by trueip
    | where login_cmd+login_jsp>0
    | distinct_pages/(login_cmd+login_jsp) as bad_rating
    | formatDate(tolong(E_Time),"MM-dd-yyyy HH:mm:ss") as E_Time
    | formatDate(tolong(L_time),"MM-dd-yyyy HH:mm:ss") as L_time
    | sort + bad_rating
    | limit 50
    ```

1. Click **Start** to run the search.
