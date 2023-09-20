---
id: lookup
title: lookup Search Operator
sidebar_label: lookup
---

The `lookup` operator can return one or more fields from a lookup table hosted by Sumo Logic and add the fields to the log messages returned by your query. You create a lookup table using the lookup UI or the <a href="https://api.sumologic.com/docs/#tag/lookupManagement">Lookup API</a>. You can populate a lookup table by uploading a CSV file using the Lookup API, or by using the [`save` operator](/docs/search/search-query-language/search-operators/save) to save the results of a log query. 

:::note
New Lookup Tables are available in all deployments except Sumo Logic's Montreal deployment, pending AWS providing a required AWS service in the Montreal region.
:::

For information about lookup tables, see [Create and Manage Lookup Tables](/docs/search/lookup-tables/create-lookup-table.md).

## Rules and limitations

This section describes requirements and limitations for the `lookup` operator and .csv files that contain lookup data.

### Requirements 

* The size limit for a lookup table is 100 MB.
* The `lookup` operator matches event field names and values to lookup table field names and values in a case-insensitive manner. 
* The columns you specify in the join condition for the lookup must be of the same data type. For example, if the event field on the left side of the join is an integer, the lookup field on the right side must also be integer. You can cast data to a string or numeric value. For more information, see [Casting Data to a Number or String](/docs/search/search-query-language/search-operators/manually-cast-data-string-number).

### CSV file requirements 

These requirements apply to lookup tables that you upload in CSV format:
 
* The CSV file must contain a header line.
* The header line can't use special characters. Any leading or trailing spaces in the header line will be trimmed.  

For example:

```sql
"id","name","time"
"1","foo","6-15-12"
"2","zoo","6-14-12"
"3","woo","6-13-12"
```

### How Sumo processes malformed .csv files

If your .csv file does not conform to the requirements described above, some or all of the rows in the table will not be indexed and saved, depending on the error encountered. Here’s how Sumo handles different types or errors in lookup files:

* Data type mismatches. Sumo will not index and store a row if any of its columns contain data whose type varies from the type defined for that column in the table schema. For example, if a field whose type is numeric contains a non-numeric string (“foo”), or a field whose type is boolean contains a non-boolean string ("blah") instead of "true" or "false".
* Schema mismatches. Sumo will not index and file any row in a file, if the schema of the .csv file does not match the schema of the lookup table. In this case, Sumo will reject the entire file.  
* Overly large lookup file. Sumo will not index and file any row in a lookup file if the file is too large or has too many rows. In this case, Sumo will reject the entire file.  

### Dashboard limitation 

The `lookup` operator behaves differently when used in live mode versus interactive mode or an interactive search. When used in live mode the lookup operation is done continually to provide real-time results. However, only the most recent data point is looked up in real time, while the previous data points keep their previously looked up result. An interactive search will conduct the lookup operation on all data points when the query is processed. Therefore, when you compare live mode results to interactive results you will likely see differences in your lookup results.

For example, say you are plotting the average price of a stock over the last 30 days.

In live mode, `lookup` returns the real-time price and retains the previously looked up data points during the 30 day period.

In an interactive search, `lookup` will only use the real-time stock price to plot over the past 30 days. In this case, you'd have to provide the previous stock prices for the past 30 days.

In other words, in live mode, `lookup` will use and retain the lookup data at that point in time when it ran. Whereas `lookup` in an interactive search will only use the data that was available when it ran.

### Tables and primary keys

You can only perform a lookup using fields defined as primary keys. If the key consists of multiple fields, use all of the primary key fields in the lookup. For example, if a lookup table has a composite key made up of:

* `srcDevice_ip`
* `eventTime`
* `sourceCategory`

your lookup query scope must include:

```sql
... on srcDevice_ip=srcDevice_ip and eventTime=eventTime and sourceCategory=sourceCategory
```

## Syntax 

```sql
lookup <outputColumn-1> [as <field>] [,<outputColumn-2> [as <field>]] from path://"<filePath>" on <joinColumn-1> [,<joinColumn-2>]
```

Where:

* `outputColumn-x` is a list of field names in the header of the lookup table.

* `filePath` is the path to the lookup table in the Sumo Logic Library. If the lookup table is in a personal folder, the path looks like this:  

    `/Library/Users/myusername@sumologic.com/Suspicious Users`

    If the lookup table is in an [Admin Recommended](/docs/manage/content-sharing/admin-mode.md) folder, the path looks like this:  

    `/Library/Admin Recommended/Lookups/Approved Cloud Jump Stations`  

    To determine the path to a lookup table, highlight the row for the table in the Sumo Logic Library, and select **Copy path to clipboard** from the three-dot more options menu for the table.   

    ![more-options-lookup.png](/img/search/searchquerylanguage/search-operators/more-options-lookup.png)

* `joinColumn-x` is a list of pairs of field names that define the relationship between values in the log data results with matching values in the lookup table, for example:  

    `name=userName, phone=cell`

## Examples

### Return one field

This lookup matches the `userEmail` field value from a log message with the `email` field in the lookup table at the specified path, and if a match is found, returns the value of the `cell` field with the alias `c1`.

```sql
| lookup cell as c1 from path://"/Library/Users/myusername@sumologic.com/Suspicious Users" on userEmail=email
```

In the example above, specifying an alias (the `as c1` part of the statement) is optional. Aliases are required only when a lookup returns multiple fields. 

:::note
If you're using `lookup` to return a single field, you can place the `lookup` operator before a `where` clause, and within a `where` clause.
:::

### Return multiple fields

This lookup matches the `userEmail` field value from a log message  with the `email` field in the lookup table at the specified path, and if a match is found, returns the the value of two fields from the matching row: `cell1` and `cell2`, with the aliases `c1` and `c2`, respectively: 

```sql
| lookup cell1 as c1, cell2 as c2 from path://"/Library/Users/myusername@sumologic.com/Suspicious Users" on userEmail=email
```

### Return all fields in a row

This lookup matches the `userID `field from a log message with the value of `ID` field in the specified lookup table, and returns all of the fields from the matching row.

```sql
| lookup * from path://"/Library/Users/myusername@sumologic.com/Users" on userID=id
```

### Using multiple lookup operators together

Another way to use a lookup operator is to chain lookup operators together. Each operator can call separate CSV files. For example, if you wanted to find user names and the position each user has in a company, your query could be:

```sql
* | parse "userID=*," as userID
| lookup userName from https://company.com/userTable.csv on userID=id
| lookup position from https://company.com/userPosition.csv on userID=id
```

where the `userPosition.csv` file includes the following:

```
"id","position"
"1","Salesperso"
"2","Salesperson"
"3","Engineer"
"4","Manager"
"5","Senior Engineer"
```

In our example above, the first `lookup` finds the name, and the second finds the position.

### Handling null values

To find a mismatch from a `lookup`  query, use the [isNull](/docs/search/search-query-language/search-operators/isnull-isempty-isblank#isnullstring) operator.

For example:

```sql
| parse "code=*]" as code
| lookup status_code from shared/statusupdates on status = code
| if (isNull(status_code), "unknown", status_code) as status_code
```

### Using two keys

In this example, we match the value of two fields from a log message against two fields in a lookup table:

* the `userEmail` field value from a log message with the `email` field in the lookup table
* the `userStatus` field value with the `status` field in the lookup table

and if a match is found, we return the value of two fields from the matching row: `cell1` and `cell2`, with the aliases `c1` and `c2`, respectively.

```sql
| lookup cell1 as c1, cell2 as c2 from path://"/Library/Users/myusername@sumologic.com/Suspicious Users" on userEmail=email, userStatus=status
```
