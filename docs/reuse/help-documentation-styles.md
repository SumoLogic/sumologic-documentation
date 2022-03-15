### Code Font
Search syntax, queries, parameters, and filenames are displayed in `Regular Code Font`. 

**Required and optional arguments:**

* A required argument is wrapped in angle brackets `< >`.
* An optional argument is wrapped in square brackets `[ ]`.

Example:

```sql
| parse [field=<field_name>] "<start_anchor>*<stop_anchor>" as <field> [nodrop]
```

The required arguments are `<start_anchor>`, `<stop_anchor>`, and `<field>`.
The optional arguments are `[field=<field_name>]` and the `[nodrop]` option. 

**One or more arguments:**

* An argument that can be specified more than once has an ellipsis ... to indicate where you may add additional arguments.

Example:

```sql
concat(<field1>, <field2>[, <field3>, ...]) as <field> 
```