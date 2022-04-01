---
id: checklist-analyst
---

# Getting Started Checklist for Analysts

Click each link to go to each Help topic for all the details, then come back to this checklist to continue.

## Getting started

These topics provide basic information about your Sumo Logic account.

* [Sumo Logic Account Types] (../../../Manage/01Manage_Subscription.md) The feature set of your Sumo Logic organization will depend on what type of Sumo Logic account you have. Review the list to make sure your account fits your use case. You can upgrade at any time.
* [Preferences] (../../05Customize-Your-Sumo-Logic-Experience/Preferences-Page.md "Preferences Page") Set the Preferences on your personal Sumo Logic account for settings such as your password, web session timeout, default time zone, and more.
* [Using Sumo Quick Start Tutorial] (../../Quick-Start-Tutorials/Using-Sumo-Logic-Tutorial.md) Here you can find a series of tutorials that will teach you the basics of using Sumo Logic. By reading through these tutorials new users can go from beginners to intermediate users of the product. 

## Searching log data

After configuring Sources to collect the logs you need, you can begin using search within minutes. Sumo Logic search syntax uses logical and familiar operators allowing you to create ad hoc queries quickly and efficiently.

* [General Search Examples Cheat Sheet](/docs/search/search-cheat-sheets): The search cheat sheet provides examples of useful search queries for different use cases.
* [Search Basics] FIX (/docs/category/search-basics): This topic describes keyword searches and the basics of Sumo Logic’s search syntax.
* [Modify a Search from the Messages tab](../search/get-started-with-search/search-page/modify-search-from-messages-tab.md): After running a search, you can modify subsequent searches by selecting text displayed in the Messages tab. After selecting text, you can choose how to modify the search using the options from a pop-up menu.
* [Parsing](/docs/search/search-query-language/parse-operators) Sumo Logic provides a number of ways to parse fields in your log messages.
* [Aggregating](/docs/search/search-query-language/group-aggregate-operators): Aggregating functions evaluate messages and place them into groups, which allows you to count and order your results. Once you have aggregate results, you can visualize your data using charts.
* [Search Operators] fix (/docs/category/search-operators): This section provides detailed syntax, rules, and examples for Sumo Logic Operators, Expressions, and Search Language.
* [Write Efficient Search Queries](/docs/search/get-started-with-search/build-search): An efficient search query returns targeted results as quickly as possible, with as little "noise" as possible. There are some easy ways to structure queries that run efficiently—returning better results in less time. To write more efficient search queries, see the following tips.

## Advanced search operators and capabilities

Sumo's search query language provides many search operators for advanced use cases. Here are some key operators:

* [Save Operator](../search/search-query-language/search-operators/save-lookups-classic.md): The Save operator allows you to save the results of a query into the Sumo Logic file system. Later, you can use the Lookup operator to access the saved data. The Save operator saves data in a simple format to a location you choose.
* [Lookup Operator](../search/search-query-language/search-operators/lookup-classic.md):  Using a lookup operator, you can map data in your log messages to meaningful information. For example, you could use a lookup operator to map "userID" to a real user's name. Or, you could use a lookup operator to find black-listed IP addresses.
* [Join Operator](../search/search-query-language/search-operators/join.md): The Join operator combines records of two or more data streams. Results are admitted on-the-fly to allow real time tables to be built. Values common to each table are then delivered as search results. The Join operator in Sumo Logic works much like a standard SQL join.
* [Transaction Operator ](/docs/search/search-query-language/transaction-analytics): The transaction operator is used to analyze related sequences of logs. For example, if you ran a retail website, you could use the transaction operator to track your customer's movements through the log events that determine the states of their transaction, such as login, cart, payment, and checkout. From the results, you can visualize your customers as they move or "flow" through the site as a Flow Diagram, and identify any problems, such as a drop-off at the payment state, which prevents them from completing their purchase.
* [Predict Operator](../search/search-query-language/search-operators/predict.md): The Predict Operator uses a series of time-stamped numerical values to predict future values. For example, you could use this operator to take your current disk space capacity numbers, and predict when your system might run out of disk space.
* [Outlier Operator](../search/search-query-language/search-operators/outlier.md  Given a series of time-stamped numerical values, using the Outlier operator in a query can identify values in a sequence that seem unexpected, and would identify an alert or violation, for example, for a scheduled search. To do this, the Outlier operator tracks the moving average and standard deviation of the value, and detects or alerts when the difference between the value exceeds mean by some multiple of standard deviation, for example, 3 standard deviation.
* [Geo Lookup Operator (Map)](../search/search-query-language/search-operators/Geo-Lookup.md): Sumo Logic can match an extracted IP address to it's geographical location on a map. To create the map, after parsing the IP addresses from log files, the lookup operator matches extracted IP addresses to the physical location where the addresses originated. Finally, geolocation fields are used by the Google Maps API to add the IPs to a map. The latitude and longitude fields are required; optional fields are country_code, country_name, region, city, state, postal_code, connection_type, country_cf, state_cf, city_cf. Details of these data fields can be found in [Neustar's documentation](https://ipintelligence.neustar.biz/portal/#documentation) under the GeoPoint Data Glossary topic. Depending on how specific you’d like the output to be, you can include all the optional fi
* elds, or choose a subset.
* [Subqueries](../search/subqueries.md): Subqueries let you filter a query when you may not be sure of the exact filter criteria but you can write a short query to set the filter criteria for you. Subqueries use one query to pass results back to another query to narrow down the set of messages that are searched in that query. 

## Visualizing log data with charts and dashboards

Once you have created search queries, you can visualize your data using charts, which you can convert into Panels and put them in Dashboards that you can share with your organization in the Library.

* [Chart Panel Types] (../../../Visualizations-and-Alerts/Dashboards/Chart-Panel-Types.md):  Any search query that produces results in the Aggregates tab can be represented graphically as different types of charts. Then these charts can be saved as Panels into Dashboards. Sumo Logic supports charts such as bar, column, line, area, pie, box plot, maps, single value, and combo charts.
* [Dashboards] (../../../Visualizations-and-Alerts/Dashboards.md): Dashboards contain a collection of Data Panels that provide a graphical representation in the form of a chart of your organization's data, along with Text and Title Panels that allow you to add context to the data in the Dashboard. The information you save in a Dashboard provides insight into the current state of the data you're uploading to Sumo Logic. Instead of having to run a number of queries, Sumo Logic runs these searches automatically, making sure that you're never looking at stale data.
* [Using the Library] (../../Library.md): The Library provides a central location for shared and saved content in your Sumo Logic account, as well as content shared by others in your organization. All Sumo Logic Apps are available through the Library.
* [Share a Dashboard from the Library] (../../../Visualizations-and-Alerts/Dashboards/Share_Dashboards.md): Publishing a Dashboard from the Library is a great way to keep everyone on top of data that is important to your organization.
* [Share a Dashboard] (../../../Visualizations-and-Alerts/Dashboards/Share_Dashboards/Share_a_Dashboard_Inside_Your_Org.md): When you share or publish a Dashboard, the default is that users will see exactly the same view as the person who created the Dashboard. If the user viewing the Dashboard has different RBAC permissions than the owner, the user will temporarily assume the RBAC permissions of the owner when they're viewing the Dashboard.

## Monitoring

* [Save a Search](../search/get-started-with-search/search-basics/save-search.md): Whether you are running ad hoc searches during a forensic investigation or running standard searches for health checks, you can save any search to run later.
* [Schedule a Search] (../../../Visualizations-and-Alerts/Alerts/Scheduled-Searches/Schedule_a_Search.md) When you save a search, you have the option to set up the saved search to run at a scheduled interval with an automated notification by email of the search results. You can edit a saved search at any time.
* [Receive Email Alerts from Scheduled Searches] (../../../Visualizations-and-Alerts/Alerts/Scheduled-Searches/Receive_Email_Alerts_from_Scheduled_Searches.md): ​There are three ways to receive the results of scheduled searches in  email : scheduled email, alert email, and  Real Time  Alerts. 

## Working with metrics

Sumo supports several metric formats: Carbon 2.0, Prometheus, and Graphite. To learn about metrics in Sumo, see [Overview of Metrics in Sumo] (../../../Metrics/Introduction-to-Metrics/01Overview-of-Metrics-in-Sumo.md). Metrics-related features for analysts include:

* [Metric queries] (../../../Metrics/Metric-Queries-and-Alerts.md): You can query your metrics from a metric query tab. For information about the operators you can use in metric queries, see [Metric Operators] (../../../Metrics/Metric-Queries-and-Alerts/07Metrics_Operators.md). 
* [Metric charts] (../../../Metrics/03-Metric-Charts.md): You can create line charts, area charts, and single value charts.

## Sumo Logic apps

Sumo Logic Applications deliver out-of-the box Dashboards, reports, saved searches, and field extraction for popular data Sources. When you install a Sumo Logic App, these pre-set searches and Dashboards are customized with your Source configurations and populated in a folder in the Library selected by you.

* [Run Searches from Sumo Logic Apps](library/run-searches-apps.md): Sumo Logic Apps provide a host of pre-built saved searches for popular data Sources that you can run against your data without installing the App itself. This way, you can try the searches in an App against your data before you decide to install it. Or you can view the searches to see how good example queries are written.
* [Install Sumo Logic Apps](library/install-apps.md):  Sumo Logic Apps are available in the Library. Select from a long list of popular data Sources and install them right from the Library. Certain Apps have specific installation requirements. Be sure to check the Help topic for your App for specific instructions.
* [Log Analysis QuickStart App](library/log-analysis-quickstart-app.md): The Log Analysis QuickStart App, created especially for new users of Sumo Logic, includes searches to extract important information from your log files, independent of where they get generated. Whether you are new to log management or plan to migrate from other products, the Log Analysis QuickStart app will bring you up to speed with the Sumo Logic search, visualization, and analytics capabilities.
* [Data Volume App] (../../../07Sumo-Logic-Apps/26Apps_for_Sumo/Data_Volume_App_-_Legacy.md): The Sumo Logic App for Data Volume allows you to view at a glance your account's data usage volume by category, Collector, Source name, and hosts. The app uses predefined searches and a Dashboard that provide visibility into your environment for real-time analysis of overall usage.

 
