---
id: search-modes
---

# Search Modes

The [Log Search page](Search_Modes/...md "How to Use the Search Page")
offers two search modes to build your searches, Advanced and Basic.

-   **Basic Mode** gives you a structured query builder that writes a
    simple log query. This mode is designed for new users that are not
    familiar with Sumo Logic search features and query language. We
    recommend taking [Certification
    Courses](../../../01Start-Here/04Getting-Started/Certification_FAQs.md "Certification FAQs") and
    reading the [Getting
    Started](../../../01Start-Here/04Getting-Started.md "Getting Started")
    content before moving to advanced mode.
-   **Advanced Mode** has the original query text box and supports all
    of our search query language and features.

For details on all the other existing Log Search page features, see [how
to use the search
page](Search_Modes/...md "How to Use the Search Page").

#### Switch Modes

When you open a Log Search you'll have the option to switch between
Basic and Advanced Mode. The selected mode will persist to new searches.

1.  Open a Log Search by clicking ****+ New**** then ****Log Search****.

    ![new log
    search.png](../../static/img/Get-Started-with-Search/How-to-Use-the-Search-Page/Search_Modes/new%20log%20search.png)

2.  Click the three-dot icon on the right of the Search page and
    select ****Basic Mode**** or **Advanced Mode** from the menu
    options.

    ![search menu
    options.png](../../static/img/Get-Started-with-Search/How-to-Use-the-Search-Page/Search_Modes/search%20menu%20options.png)

#### Basic Mode

Search offers an easy-to-use, structured query builder to help you write
and complete simple log searches quickly and easily. This feature is
designed for basic queries and has limited support of the Search Query
Language. Once you're comfortable using basic mode we recommend you
start using Advanced Mode to get the full value out of Sumo Logic and
its robust search capabilities.

##### Basic Mode Query Builder

This section elaborates on the input options.

![Basic mode query
editor.png](../../static/img/Get-Started-with-Search/How-to-Use-the-Search-Page/Search_Modes/Basic%20mode%20query%20editor.png)

-   **Data Tier**  
    Select from the drop down which Data Tier the query should run
    against, either Continuous, Frequent, or Infrequent. See [searching
    Data
    Tiers](../../../Manage/Partitions_and_Data_Tiers/Searching_Data_Tiers.md "Searching Data Tiers")
    for further details.  
    ![Data Tier
    options.png](../../static/img/Get-Started-with-Search/How-to-Use-the-Search-Page/Search_Modes/Data%20Tier%20options.png)  
     
-   **Index**  
    Type in any
    [Partitions](../../../Manage/Partitions_and_Data_Tiers/01-About-Partitions.md "About Partitions")
    you want to run the query against. When you click in the text area a
    list of available options is provided. Click an option to
    automatically fill in the value in the text area. You can continue
    to add additional Partitions if desired.  
    ![Basic mode Index
    options.png](../../static/img/Get-Started-with-Search/How-to-Use-the-Search-Page/Search_Modes/Basic%20mode%20Index%20options.png)  
     
-   **Filters**  
    Type in any [fields](../../../Manage/Fields.md "Fields") you want to
    run the query against. Once you select a field you need to select a
    value for it. When you click in the text area and begin typing an
    autocomplete list begins to offer suggestions. Click a suggestion to
    automatically fill in the value in the text area. You can continue
    to add additional fields if desired.  
    ![basic mode filters
    option.png](../../static/img/Get-Started-with-Search/How-to-Use-the-Search-Page/Search_Modes/basic%20mode%20filters%20option.png)
    -   **Not option**: Once you have entered a filter you'll see a
        gray **no symbol** or **prohibition sign** to the left of the
        filter.  
        ![prohibition
        sign.png](../../static/img/Get-Started-with-Search/How-to-Use-the-Search-Page/Search_Modes/prohibition%20sign.png)  
        Click it to enable the filter as a NOT boolean, where the filter
        acts as an exclusion instead of inclusion. When enabled, the
        filter gets a border, and the no symbol changes to the color
        coral.  
        ![not option
        enabled.png](../../static/img/Get-Started-with-Search/How-to-Use-the-Search-Page/Search_Modes/not%20option%20enabled.png)
-   **Keywords**  
    Type a [keyword search
    expression](../How-to-Build-a-Search/Keyword-Search-Expressions.md "Keyword Search Expressions") in
    the text area.![basic mode keywords
    input.png](../../static/img/Get-Started-with-Search/How-to-Use-the-Search-Page/Search_Modes/basic%20mode%20keywords%20input.png)

For details on all the other Log Search page features, see [how to use
the search page](Search_Modes/...md "How to Use the Search Page").
