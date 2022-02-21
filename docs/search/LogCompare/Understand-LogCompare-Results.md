---
id: understand-logcompare-results
---

# Understand LogCompare Results

LogCompare results are displayed in the **Signatures** tab, in
the **Count** and **Score** columns.

## Count

In the **Count** column, LogCompare results are shown under the count
numbers, which appear as blue links. (This is the count from the target
query, not the baseline query.) The LogCompare results are the black
words and percentages beneath the blue links.

![LogCompareCount.png](../static/img/LogCompare/Understand-LogCompare-Results/LogCompareCount.png)

The **Count** column shows the absolute number of signatures found in
the target query.

You will see that some clusters are "new" and some are "gone,"
especially if you have used a target query that is different from the
baseline query. So, if a signature is shown as "gone" (meaning, it was
in the baseline query, but is missing in the target query) the count for
it will be zero.

You will also see the percentage of changes in your log messages.

These changes are defined as:

-   **Delta Percentage.** The delta percentage is the straight
    percentage change in the number of messages divided by the
    historical count percentage, which is the historical count change
    over time since the initial count results for this cluster.
-   **New.** When the word "new" appears, the cluster did not exist in
    the original baseline.
-   **Gone.** When the word "gone" appears, a previous cluster did not
    return in the target query.

The following table illustrates the way the LogCompare results work. For
example, the Baseline includes clusters A, B, C, and D. The Target
includes A, B, D, and E.

|              |                   |            |
|--------------|-------------------|------------|
| **Baseline** | **Delta Results** | **Target** |
| A            | \< + %            | A          |
| B            | \\> - %            | B          |
| C            | gone              |            |
| D            | \< + %            | D          |
|              | new               | E          |

So in this example, C is "gone" in the Target results, and E is "new".
Between the matching clusters, LogCompare reports the percentages of
changes in the log message for that time shift.

## Score

The **Score** column is calculated based on the significance of the
change in the occurrence of that specific pattern, compared to the
baseline. So the higher the score, the more significant the change in
this message.

The value is calculated using a symmetric version of [Kullback-Leibler
divergence
score](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence).

![Score.png](../static/img/LogCompare/Understand-LogCompare-Results/Score.png)
