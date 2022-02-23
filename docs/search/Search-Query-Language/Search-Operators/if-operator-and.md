---
id: if-operator-and
---

# if operator and ?

There are two forms of ternary expression you can use in Sumo
Logic queries: one is constructed using the **IF **operator, and the
other uses the question mark (**?**) operator. The syntax varies
slightly, but the results are equivalent. You can use the syntax you are
most comfortable with.

These expressions are used to evaluate a condition as either true or
false, with values assigned for each outcome. It is a shorthand way to
express an if-else condition. On the basis of the test, the entire
expression returns value_if_true if the condition is true, else
value_if_false if the condition is false. The two sub-expressions
(value_if_true and value_if_false) must have the same type.

### Syntax

* `if\<conditio\>,\<value_if_tru\>,\<value_if_fals\>) as\<fiel\>`

#### Examples

* `| if(status_code matches "5*", 1, 0) as serverError`
* `| if(status_code matches "2*", 1, 0) as success`
* \| if(!(status_code matches "2\*"), 1, 0) as failure
* \| if(status matches "WARN" or status matches "ERROR", 1, 0) as
    status
* \| if(alpha \> 1 and beta \> 5, "true", "false") as conditionState

#### Nested if statement (if...elseif...else)

To create **nested** if statements, your query should use the following
syntax:  
  
`| if(message matches "*/schedule?*","Alert Scheduled", if(message matches "*/update?*","Alert Updated", if(message matches "*/cancel?*","Alert Canceled","N/A"))) as problem`

### Question mark (?) syntax

* \<conditio\> ?\<value_if_tru\> :\<value_if_fals\> as\<fiel\>`

#### Examples

* `| disk_usage\> threshold ? "disk full" : "OK" as status`
* `| !(disk_usage\> threshold) ? "disk full" : "OK" as status`
* `| a\< b ? a : b as this_or_that     // This is the same as min(a, b)`

For information on handling null values,
see [isNull](isNull,-isEmpty,-isBlank.md "isNull, isEmpty, isBlank")
operator.
