---
id: timeslice-join-results
---

# Timeslice Join Results

When you gather data using a `join ` operation, you can slice data by
time period using the `timeslice` operator. But to do so, you need to
conduct the `timeslice` operation *before* the `join`. 

The `timeslice` operator uses the metadata field **\_messagetime** to
organize the logs by slices. In your query, you need to specify the
`timeslice` operation before the `join`, because the
**\_messagetime** field will no longer exist after the `join` operation
is performed.

When you add the `timeslice` before the `join`, each of the tables
created by the `join` will now include a **\_timeslice** field. 

You can reference the table's **\_timeslice** field to use in your
`group by` operation. The name of the table is appended to the table's
fields.

For example, if your table is named **errors**, your field would be
**errors\_\_timeslice**. (Notice that the name uses *two* underscores.)

Here's an example query:

`* | timeslice 1h | join (parse "starting stream from * " AS streamId) AS table1, (parse "starting search from parent stream * " AS streamId) AS table2 on table1.streamId = table2.streamId | count table1_streamId, table1__timeslice | formatDate(fromMillis(table1__timeslice ), "MM/dd/yyyy HH:mm:ss z") as timeslice`
