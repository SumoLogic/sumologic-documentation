---
id: onboarding-checklists
title: Onboarding Checklists
description: Onboarding Checklists for Analysts and Administrators.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This document provides a high-level checklist of onboarding tasks for Administrators and Analysts (non-admins). To determine whether your role is Analyst or Administrator, go to the left nav, then click your name > **Preferences**.

<img src={useBaseUrl('img/get-started/check-role.png')} alt="icon" width="500"/>


## Onboarding Checklist for Analysts

This section provides basic information about non-admin Sumo Logic accounts.

* [Sumo Logic Account Types](/docs/manage/manage-subscription). The feature set of your Sumo Logic organization will depend on what type of Sumo Logic account you have. Review the list to make sure your account fits your use case. You can upgrade at any time.
* [Preferences](/docs/get-started/account-settings-preferences). Set the Preferences on your personal Sumo Logic account for settings such as your password, web session timeout, default time zone, and more. 

### Searching log data

After configuring Sources to collect the logs you need, you can begin using search within minutes. Sumo Logic search syntax uses logical and familiar operators allowing you to create ad hoc queries quickly and efficiently.

* [General Search Examples Cheat Sheet](/docs/search/search-cheat-sheets). The search cheat sheet provides examples of useful search queries for different use cases.
* [Search Basics](/docs/search/get-started-with-search/search-basics). This topic describes keyword searches and the basics of Sumo Logic’s search syntax.
* [Modify a Search from the Messages tab](../search/get-started-with-search/search-page/modify-search-from-messages-tab.md). After running a search, you can modify subsequent searches by selecting text displayed in the Messages tab. After selecting text, you can choose how to modify the search using the options from a pop-up menu.
* [Parsing](/docs/search/search-query-language/parse-operators) Sumo Logic provides a number of ways to parse fields in your log messages.
* [Aggregating](/docs/search/search-query-language/group-aggregate-operators). Aggregating functions evaluate messages and place them into groups, which allows you to count and order your results. Once you have aggregate results, you can visualize your data using charts.
* [Search Operators](/docs/search/search-query-language/group-aggregate-operators). This section provides detailed syntax, rules, and examples for Sumo Logic Operators, Expressions, and Search Language.
* [Write Efficient Search Queries](/docs/search/get-started-with-search/build-search). An efficient search query returns targeted results as quickly as possible, with as little "noise" as possible. There are some easy ways to structure queries that run efficiently—returning better results in less time. To write more efficient search queries, see the following tips.

### Advanced search operators and capabilities

Sumo's search query language provides many search operators for advanced use cases. Here are some key operators:

* [Save Operator](/docs/search/search-query-language/search-operators/save-classic). The Save operator allows you to save the results of a query into the Sumo Logic file system. Later, you can use the Lookup operator to access the saved data. The Save operator saves data in a simple format to a location you choose.
* [Lookup Operator](/docs/search/search-query-language/search-operators/lookup-classic). Using a lookup operator, you can map data in your log messages to meaningful information. For example, you could use a lookup operator to map "userID" to a real user's name. Or, you could use a lookup operator to find black-listed IP addresses.
* [Join Operator](/docs/search/search-query-language/search-operators/join). The Join operator combines records of two or more data streams. Results are admitted on-the-fly to allow real time tables to be built. Values common to each table are then delivered as search results. The Join operator in Sumo Logic works much like a standard SQL join.
* [Transaction Operator](/docs/search/search-query-language/transaction-analytics). The transaction operator is used to analyze related sequences of logs. For example, if you ran a retail website, you could use the transaction operator to track your customer's movements through the log events that determine the states of their transaction, such as login, cart, payment, and checkout. From the results, you can visualize your customers as they move or "flow" through the site as a Flow Diagram, and identify any problems, such as a drop-off at the payment state, which prevents them from completing their purchase.
* [Predict Operator](/docs/search/search-query-language/search-operators/predict). The Predict Operator uses a series of time-stamped numerical values to predict future values. For example, you could use this operator to take your current disk space capacity numbers, and predict when your system might run out of disk space.
* [Outlier Operator](/docs/search/search-query-language/search-operators/outlier). Given a series of time-stamped numerical values, using the Outlier operator in a query can identify values in a sequence that seem unexpected, and would identify an alert or violation, for example, for a scheduled search. To do this, the Outlier operator tracks the moving average and standard deviation of the value, and detects or alerts when the difference between the value exceeds mean by some multiple of standard deviation, for example, 3 standard deviation.
* [Geo Lookup Operator (Map)](/docs/search/search-query-language/search-operators/geo-lookup-map). Sumo Logic can match an extracted IP address to it's geographical location on a map. To create the map, after parsing the IP addresses from log files, the lookup operator matches extracted IP addresses to the physical location where the addresses originated. Finally, geolocation fields are used by the Google Maps API to add the IPs to a map. The latitude and longitude fields are required; optional fields are country_code, country_name, region, city, state, postal_code, connection_type, country_cf, state_cf, city_cf. Details of these data fields can be found in [Neustar's documentation](https://ipintelligence.neustar.biz/portal/#documentation) under the GeoPoint Data Glossary topic. Depending on how specific you’d like the output to be, you can include all the optional fields, or choose a subset.
* [Subqueries](/docs/search/subqueries). Subqueries let you filter a query when you may not be sure of the exact filter criteria but you can write a short query to set the filter criteria for you. Subqueries use one query to pass results back to another query to narrow down the set of messages that are searched in that query. 

### Visualizing log data with charts and dashboards

Once you have created search queries, you can visualize your data using charts, which you can convert into Panels and put them in Dashboards that you can share with your organization in the Library.

* [Chart Panel Types](/docs/dashboards/panels).  Any search query that produces results in the Aggregates tab can be represented graphically as different types of charts. Then these charts can be saved as Panels into Dashboards. Sumo Logic supports charts such as bar, column, line, area, pie, box plot, maps, single value, and combo charts.
* [Dashboards](/docs/dashboards). Dashboards contain a collection of Data Panels that provide a graphical representation in the form of a chart of your organization's data, along with Text and Title Panels that allow you to add context to the data in the Dashboard. The information you save in a Dashboard provides insight into the current state of the data you're uploading to Sumo Logic. Instead of having to run a number of queries, Sumo Logic runs these searches automatically, making sure that you're never looking at stale data.
* [Using the Library](/docs/get-started/library). The Library provides a central location for shared and saved content in your Sumo Logic account, as well as content shared by others in your organization. All Sumo Logic Apps are available through the Library.
* [Share a Dashboard from the Library](../dashboards/share-dashboard-new.md). Publishing a Dashboard from the Library is a great way to keep everyone on top of data that is important to your organization.
* [Share a Dashboard](/docs/dashboards-classic/share-dashboard-inside-org.md). When you share or publish a Dashboard, the default is that users will see exactly the same view as the person who created the Dashboard. If the user viewing the Dashboard has different RBAC permissions than the owner, the user will temporarily assume the RBAC permissions of the owner when they're viewing the Dashboard.

### Monitoring

* [Save a Search](/docs/search/get-started-with-search/search-basics/save-search). Whether you are running ad hoc searches during a forensic investigation or running standard searches for health checks, you can save any search to run later.
* [Schedule a Search](/docs/alerts/scheduled-searches) When you save a search, you have the option to set up the saved search to run at a scheduled interval with an automated notification by email of the search results. You can edit a saved search at any time.
* [Receive Email Alerts from Scheduled Searches](../alerts/scheduled-searches/receive-email-alerts.md). ​There are three ways to receive scheduled search results email notifications: scheduled email, alert email, and real-time alerts. 

### Working with metrics

Sumo supports several metric formats: Carbon 2.0, Prometheus, and Graphite. To learn about metrics in Sumo, see [Overview of Metrics in Sumo](/docs/metrics/introduction). Metrics-related features for analysts include:

* [Metric queries](/docs/metrics/metrics-queries). You can query your metrics from a metric query tab. For information about the operators you can use in metric queries, see [Metric Operators](/docs/metrics/metrics-operators). 
* [Metric charts](/docs/metrics/metric-charts). You can create line charts, area charts, and single value charts.

### Sumo Logic Apps

Sumo Logic apps deliver out-of-the box Dashboards, reports, saved searches, and field extraction for popular data Sources. When you install a Sumo Logic App, these pre-set searches and Dashboards are customized with your Source configurations and populated in a folder in the Library selected by you.

* [Run Searches from Sumo Logic Apps](/docs/get-started/apps-integrations#run-searches-from-sumo-logic-apps). Sumo Logic apps provide a host of pre-built saved searches for popular data Sources that you can run against your data without installing the App itself. This way, you can try the searches in an App against your data before you decide to install it. Or you can view the searches to see how good example queries are written.
* [Install Sumo Logic Apps](/docs/get-started/apps-integrations#install-apps-from-the-library).  Sumo Logic Apps are available in the Library. Select from a long list of popular data Sources and install them right from the Library. Certain Apps have specific installation requirements. Be sure to check the Help topic for your App for specific instructions.
* [Log Analysis QuickStart App](/docs/get-started/apps-integrations#log-analysis-quickstart-app). The Log Analysis QuickStart App, created especially for new users of Sumo Logic, includes searches to extract important information from your log files, independent of where they get generated. Whether you are new to log management or plan to migrate from other products, the Log Analysis QuickStart app will bring you up to speed with the Sumo Logic search, visualization, and analytics capabilities.
* [Data Volume App](/docs/integrations/sumo-apps/data-volume). The Sumo Logic App for Data Volume allows you to view at a glance your account's data usage volume by category, Collector, Source name, and hosts. The app uses predefined searches and a Dashboard that provide visibility into your environment for real-time analysis of overall usage.

 


## Onboarding Checklist for Administrators

These topics provide basic information about administrator Sumo Logic accounts, and how to customize your Sumo Logic implementation for your specific use case.

* [Sumo Logic Account Types](/docs/manage/manage-subscription). The feature set of your Sumo Logic organization will depend on what type of Sumo Logic account you have. Review the list to make sure your account fits your use case. You can upgrade at any time.
* [Sumo Logic Components](/docs/get-started#sumo-logic-components). Sumo Logic is comprised of just a few components: Collectors, Sources, the Sumo Logic Cloud, and Sumo Logic. Learn how these components work together here.
* [Choose a Collector Type](/docs/send-data/choose-collector-source). Depending on your use case, you may need to use Installed or Hosted Collectors. Use this topic to help you determine what your organization will need.
* [Best Practices: Local and Centralized Data Collection](/docs/send-data/best-practices#local-and-centralized-data-collection). Which method is right for you? 
* [System Requirements](system-requirements.md). These topics include information on basic hardware requirements for Sumo Logic Collectors, supported web browsers for best performance, and supported log encoding.
* [Preferences Page](/docs/get-started/account-settings-preferences). Set the Preferences on your personal Sumo Logic account for settings such as your password, web session timeout, default time zone, and more.

### Collecting logs and metrics

To send your data to Sumo Logic, you’ll need to learn how to configure Collectors and Sources.

* [Metadata Naming Conventions](/docs/send-data/reference-information/metadata-naming-conventions.md). Prior to configuring Collectors, it is a good idea to establish a naming convention for Sources, Collectors, and especially metadata tags.
* [Compare Installed and Hosted Collectors](/docs/send-data/choose-collector-source#compare-installed-and-hosted-collectors). Before you can send data to Sumo Logic, you'll need to decide what type of Collectors make sense for your use case: Installed Collectors or Hosted Collectors.
* [Installed Collectors](/docs/send-data/installed-collectors). Installed Collectors are deployed in your environment, either on a local machine, a machine in your organization, or even an Amazon Machine Image (AMI). Installed Collectors require a software download and installation. Upgrades to Collector software are released regularly by Sumo Logic.
* [Hosted Collectors](/docs/send-data/hosted-collectors) Hosted Collectors don't require installation or activation, nor do Hosted Collectors have physical requirements, since they're hosted in AWS or HTTP.
* [Sources](/docs/send-data/choose-collector-source). Sources are the environments that Sumo Logic Collectors connect to collect data from a customer's site.
* [Sources for Installed Collectors](/docs/send-data/installed-collectors/sources). Sources for Installed Collectors include Local and Remote File Sources, Local and Remote Windows Event Sources, Local and Remote Windows Performance Sources, Script Sources, Syslog Sources, and Script Actions.
* [Sources for Hosted Collectors](/docs/send-data/hosted-collectors/). Sources for Hosted Collectors include HTTP Sources and AWS Source Types such as AWS CloudTrail, AWS Config, AWS ELB, Amazon CloudFront, Amazon S3 Audit, and Amazon S3.
* [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference.md). Sumo Logic supports several options for timestamps, time zones, time ranges, and dates.
* [Using JSON to Configure Sources](/docs/send-data/use-json-configure-sources). If you’d like to configure your Sources using JSON files, you can do that too.

### Managing collection and data volume

Sumo provides a tool for tracking and managing collection and data volume.

* [Log Ingest Data Volume Index](/docs/manage/ingestion-volume/data-volume-index/log-tracing-data-volume-index). Sumo Logic writes messages to the index about how much log data your account is ingesting. You can query the index, and if desired, install the [Sumo Logic Data Volume app](/docs/integrations/sumo-apps/data-volume), which provides pre-configured searches and dashboards for analyzing log ingestion. 
* [Metric Ingest Data Volume Index](/docs/manage/ingestion-volume/data-volume-index/metrics-data-volume-index.md). The Metrics Data Volume Index is populated with a set of index messages every five minutes. The messages contain information on how much metrics (by data points) your account is ingesting. 

### Searching

After configuring Sources to collect the logs you need, you can begin using search within minutes. Sumo Logic search syntax uses logical and familiar operators allowing you to create ad hoc queries quickly and efficiently.

* [General Search Examples Cheat Sheet](/docs/search/search-cheat-sheets). The search cheat sheet provides examples of useful search queries for different use cases.
* [Search Basics](/docs/search/get-started-with-search/search-basics). This topic describes keyword searches and the basics of Sumo Logic’s search syntax.
* [Modify a Search from the Messages tab](../search/get-started-with-search/search-page/modify-search-from-messages-tab.md). After running a search, you can modify subsequent searches by selecting text displayed in the Messages tab. After selecting text, you can choose how to modify the search using the options from a pop-up menu.
* [Parsing](/docs/search/search-query-language/parse-operators). Sumo Logic provides a number of ways to parse fields in your log messages.
* [Aggregating](/docs/search/search-query-language/group-aggregate-operators). Aggregating functions evaluate messages and place them into groups, which allows you to count and order your results. Once you have aggregate results, you can visualize your data using charts.
* [Search Operators](/docs/search/search-query-language/group-aggregate-operators). This section provides detailed syntax, rules, and examples for Sumo Logic Operators, Expressions, and Search Language.

### Search optimization tools

Search optimization tools speed the search process, delivering query results in less time and improving productivity for forensic analysis and log management. Search speed generally depends on the amount of data and the type of query run against the data. Search optimization tools segment the data and queue it up for quick results.

* [Optimize Search Performance](../search/optimize-search-performance.md). Describes index-based and field-based methods for search optimization, the search optimization process, and how to choose the right tool for the job.
* [Partitions](/docs/manage/partitions-data-tiers). Partitions speed the search process by allowing you to filter a subset of the log messages in an index.
* [Scheduled Views](/docs/manage/scheduled-views). Scheduled Views speed the search process for small and historical subsets of your data by functioning as a pre-aggregated index.
* [Field Extraction](/docs/manage/field-extractions). Field Extraction speeds the search process by parsing fields as log messages are ingested. The parsing is done automatically, so you don’t need to run a query to parse the fields.
* [Field Browser](/docs/search/get-started-with-search/search-page/field-browser). The Field Browser allows you to zero in on just the fields of interest in a search by displaying or hiding selected fields without having to parse them. You can focus on the fields you’re interested in, avoiding the “noise” of fields you don’t want to see.
* [Search Templates](../search/get-started-with-search/build-search/search-templates.md). You can set up search templates to simplify searches for your users. Search templates shield users from search syntax and allow them to select search parameter values from a selector list.  

### Users, roles, and security

Sumo Logic provides a number of tools for managing users' access to Sumo Logic and configuring security policies. You can:

* [Set password policies](/docs/manage/security/set-password-policy.md). Set rules for password expiration, reuse, and lock out.
* [Create an Allowlist for IP or CIDR addresses](/docs/manage/security/create-allowlist-ip-cidr-addresses.md). Service Allowlist Settings allow you to explicitly grant access to specific IP addresses and/or CIDR notations for logins, APIs, and dashboard access.
* [Manage access keys](/docs/manage/security/access-keys.md). Access keys are used in sumo to securely register new collectors and for accessing Sumo Logic APIs.
* [Sumo audit index](/docs/manage/security/audit-index.md). If you enable the audit index, Sumo captures information on the internal events that occur in your account associated with account management, user activity, scheduled searches, and more.
* [Support account access](/docs/manage/security/enable-support-account.md). You can enable a Sumo Logic support account, which grants very select Sumo Logic support agents access to your organization's account, better helping those agents to resolve issues that arise. Admins can choose to keep the support account enabled full-time, or the account can be disabled when no issues are being investigated.
* [Set Up SAML for Single Sign-On](/docs/manage/security/saml). Enterprise accounts can provision Security Assertion Markup Language (SAML) 2.0 to enable Single Sign-On (SSO) for user access to Sumo Logic. In addition to basic SAML functionality, you can choose optional on-demand user creation (using SAML 2.0 assertions), and designate custom login and/or logout portals.
* [Role-based access control (RBAC)](/docs/manage/users-roles). Sumo Logic supports RBAC. Users are not assigned permissions directly, but inherit permissions through roles (or even through a single role). Role assignments grant users specific capabilities, and govern what data users can view.   

### Metrics

Sumo Logic supports several metric formats: Carbon 2.0, Prometheus, and Graphite. To learn about metrics in Sumo Logic, see [Overview of Metrics in Sumo](/docs/metrics/introduction). Metrics-related features for administrators include:

* [Metric Rules Editor](/docs/metrics/metric-rules-editor). An interface you can use to tag metrics with data derived from the metric identifier. Then, users can use those tags in metric queries.
* [Logs-to-Metrics](../metrics/logs-to-metrics.md). Sumo’s Logs-to-Metrics features allow you to extract or create metrics from log data:
  * You can extract metrics that are embedded in logs. For example, your logs might contain numerical values for latency, bytes sent, request time, and so on. You can extract multiple metrics from a single log.
  * You can count logs as a metric. For example, you might count the number of log messages that contain a 404 status code. 

### APIs

For customers with Enterprise accounts, Sumo Logic provides different APIs to interact with third-party scripts and applications.

* [Sumo Logic Endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security). Sumo Logic has five deployments, or pods, that are assigned depending on the geographic location and the date a Sumo Logic account is created.
* [Collector Management API](/docs/api/collector-management). The Collector Management API allows you to define an initial Source configuration for your Collectors using a JSON file. It also allows you to create, update, and delete Collectors and Sources from an HTTP endpoint.
* [Search Job API](/docs/api/search-job). Sumo Logic exposes the Search Job API for access to resources and log data from third-party scripts and applications. The API follows Representational State Transfer (REST) patterns and is optimized for ease of use and consistency.

## Sumo Logic apps

Sumo Logic apps deliver deliver out-of-the-box Dashboards, reports, saved searches, and field extraction functionality for popular data sources. When you install a Sumo Logic app, these pre-set searches and Dashboards are customized with your Source configurations and populated in a folder in the Library selected by you.

* [Using the Library](/docs/get-started/library/). The Library provides a central location for shared and saved content in your Sumo Logic account, as well as content shared by others in your organization. All Sumo Logic Apps are available through the Library.
* [Run Searches from Sumo Logic Apps](/docs/get-started/apps-integrations#run-searches-from-sumo-logic-apps). Sumo Logic Apps provide a host of pre-built saved searches for popular data Sources that you can run against your data without installing the App itself. This way, you can try the searches in an App against your data before you decide to install it. Or you can view the searches to see how good example queries are written.
* [Install Apps from the Library](/docs/get-started/apps-integrations#install-apps-from-the-library). Sumo Logic Apps are available in the Library. Select from a long list of popular data Sources and install them right from the Library. Certain Apps have specific installation requirements. Be sure to check the Help topic for your App for specific instructions.
* [Log Analysis QuickStart App](/docs/get-started/apps-integrations#log-analysis-quickstart-app). The Log Analysis QuickStart App, created especially for new users of Sumo Logic, includes searches to extract important information from your log files, independent of where they get generated. Whether you are new to log management or plan to migrate from other products, the Log Analysis QuickStart app will bring you up to speed with the Sumo Logic search, visualization, and analytics capabilities.

<!--
<label class="label-container">Management or plan to migrate from other products, the Log Analysis QuickStart app will bring you up to speed with the Sumo Logic search, visualization, and analytics cap
  <input type="checkbox"/>
  <span class="checkmark"></span>
</label>

<label class="label-container">Management or plan to migrate from other products, the Log Analysis QuickStart app will bring you up to speed with the Sumo Logic search, visualization, and analytics cap
  <input type="checkbox"/>
  <span class="checkmark"></span>
</label>

<label class="label-container">Management or plan to migrate from other products, the Log Analysis QuickStart app will bring you up to speed with the Sumo Logic search, visualization, and analytics cap
  <input type="checkbox"/>
  <span class="checkmark"></span>
</label>
-->
