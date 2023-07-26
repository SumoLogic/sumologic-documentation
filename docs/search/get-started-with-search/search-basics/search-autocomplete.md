---
id: search-autocomplete
title: Search Autocomplete
description: On the Search page, as you begin typing to enter a query in the search text box, the search autocomplete dropdown dialog opens to offer suggestions to make query writing easier.
---



On the **Search** page, as you begin typing to enter a query in the search text box, the search autocomplete dropdown dialog opens to offer suggestions to make query writing easier.

RBAC limitations prevent you from seeing options that you are not permitted to see. 

In the first part of a query, search autocomplete suggests common default queries, keywords, and [metadata](built-in-metadata.md "Search Metadata") terms. It also offers the names of Collectors, Sources, and Partitions, which are automatically configured in your system when you create them.

![autocomplete search](/img/search/get-started-search/search-basics/autocomplete-search.png)

As you type, or when you press the space bar, search autocomplete offers the common AND and OR operators. Then after you type the first pipe (`|`) of your query, it suggests more advanced search operators, depending on what you type. The feature also includes links to documentation for search operators and other Sumo Logic features. Click the blue question mark icon to open the Help page on that topic for more information.

As you type, search autocomplete underlines possible typos in your query and suggests corrections. It also colorizes some parts of your query, for easy detection. All suggestions are based on the location of the cursor in the text box.

![autocomplete keyword](/img/search/get-started-search/search-basics/autocomplete-keyword.png)

Search autocomplete does not suggest all available Sumo Logic keywords, metadata terms, and search operators. For full details on what is
supported, see [Search Operators](/docs/search/search-query-language/group-aggregate-operators).

More search autocomplete tips and limitations:

* Press **Alt + space** or **Esc** to open and close search autocomplete.
* Press **Shift + Enter** to add a new line to your query in the text box.
* Press **Alt + Esc** to disable the search autocomplete dialog from opening while you type. You can also disable this option in the [Preferences Page](../../../get-started/account-settings-preferences.md) page.
* Search autocomplete is also supported on the **Manage > Users** page in the **New Role** dialog in the **Query String** section.
* Search autocomplete does not show Field Extraction Rules or values from HTTP headers. 
