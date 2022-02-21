---
id: "-logreduce-operator"
---

# LogReduce Operator

The summarize operator has been renamed the logreduce operator, to match
the **LogReduce** button on the **Messages** tab. Both operators will
continue to work in search queries as synonyms for a limited time. We
recommend that you rewrite saved queries replacing summarize with
logreduce.

The LogReduce algorithm uses fuzzy logic to group messages together
based on string and pattern similarity. You can use the logreduce
operator to quickly assess activity patterns for things like a range of
devices or traffic on a website. Focus the LogReduce algorithm on an
area of interest by defining that area in the keyword expression.

For information on how to interpret and influence the outcome of
LogReduce results, see [Detecting Patterns with
LogReduce](Detect-Patterns-with-LogReduce.md "Detecting Patterns with LogReduce") and [Influencing
the LogReduce
Outcome](Influence-the-LogReduce-Outcome.md "Influencing the LogReduce Outcome").

There are two ways to use the operator.

-   Use
    the **LogReduce** [button](./01-LogReduce-Operator.md "LogReduce Operator")
    displayed on the results table after running a search.
-   Manually add the operator to your query following its
    [syntax](./01-LogReduce-Operator.md "LogReduce Operator").

### LogReduce button

When you've already run a search query with non-aggregate results, you
can use the **LogReduce** button in the **Messages** tab to
automatically apply the LogReduce operator to the current results.

1.  Run a search query with non-aggregate results.
2.  In the **Messages** tab, the **LogReduce** button displays. Click it
    to automatically apply the LogReduce operator to your results.  
      
      
     
3.  The **Signatures** tab is displayed with your results. 

### Rules

-   The logreduce operator cannot be used with [group-by
    operators](../Search-Query-Language/aaGroup.md "Group or Aggregate Operators")
    such as "count by field".

### Syntax

-   `... | logreduce [field\<fiel\>] [by\<byFiel\>] [limit\<limi\>] [, criteria\<criteri\>]`

[TABLE]

### Details option

Using the **details** option launches a new query adding a unique
signature ID that allows you to view the logs grouped under that
signature. The signature ID is not available to run this manually,
you'll need to use the web interface.

After running a LogReduce operation, from the **Signatures** tab, you
can view logs grouped together in a signature. To see the raw log data
from signatures the operator provides the **details** option. You can
view details in two ways:

-   Click the number in the **Count** column for a signature.
-   Check the checkboxes in the **Select** column for any number of
    signatures and click the **View Details** button on the top right of
    the table.

![logreduce details
option.png](../static/img/LogReduce/01-LogReduce-Operator/logreduce%20details%20option.png)

Details option syntax:

`... | logreduce | details\<signatureI\>`

Once a LogReduce query has run with the details operator, you cannot use
that query again, for example in a separate Search tab.

### Optimize option

LogReduce Optimize is a scaled-out version of LogReduce that groups logs
by existing signatures. You need to prerun LogReduce on new data sources
to create its signatures. In many cases, the optimized version provides
up to 10x speedup over classic LogReduce on datasets with hundreds of
thousands of logs. The only caveat with the optimized version is that
some LogReduce classic features are not supported. The table below
compares classic LogReduce with its optimized version based on available
features and performance:

| Features                                                                         | LogReduce | LogReduce Optimize |
|----------------------------------------------------------------------------------|-----------|--------------------|
| Throughput                                                                       |           | \~10x logreduce    |
| Groups logs by existing signatures                                               | Yes       | Yes                |
| Creates new signatures at runtime                                                | Yes       | No                 |
| Displays signature relevance                                                     | Yes       | No                 |
| Allows interactive feedback (favoriting, disliking, editing, splitting, merging) | Yes       | No                 |
| Supports details investigation                                                   | Yes       | Yes                |

Optimize option syntax:

`... | logreduce [field\<fiel\>] optimize`

For example,

-   `_sourceCategory=cloudtrail`  
    `| logreduce optimize`
-   `_sourceCategory=kubernetes-audit`  
    `| json auto`  
    `| logreduce field=object optimize`

### Examples

1.  `_sourcecategory = "Labs/AWS/GuardDuty_V8"`  
    `| json keys "resource", "partition", "region"`  
    `| logreduce`  
     
2.  `_sourcecategory = "Labs/AWS/GuardDuty_V8"`  
    `| json keys "resource", "partition", "region"`  
    `| logreduce(partition) by region limit=5,criteria=mostcommon`  
     
3.  The LogReduce operator can act as an aggregate operator, supporting
    grouping by `_timeslice` as well as by other dimensions, such
    as `_sourcehost`.  
      
    `...     | logreduce by _sourcehost`  
      
    By grouping by `timeslice`, you can determine how signature counts
    change over a period of time.   
      
    `...     | timeslice 1m       | logreduce by _timeslice`  
      
     
4.  `_sourceCategory=MyApp`  
    `| timeslice 1m`  
    `| logreduce by _timeslice limit=5,criteria=mostcommon`  
    `| transpose row _timeslice column signature      `
5.  `_sourceCategory=MyApp`  
    `| logreduce by _sourceHost limit=5,criteria=mostcommon`  
    `| transpose row _sourcehost column signature`
