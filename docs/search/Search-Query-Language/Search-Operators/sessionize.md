---
id: sessionize
---

# sessionize

The **sessionize** operator allows you to use an extracted value from
one log message (generated from one system) to find correlating values
in log messages from other systems. After you run sessionize, these
related events are displayed on the same page. The thread of logs woven
together is called a **session**.

Depending on your use case, you could also use the
[join](join.md "join") operator, which may be more appropriate and
easier to use.

For example, let's say we have the value of a userRequestId, which
entered a distributed system; the request goes through systems named
Service, Stream, and Config:

![](../../static/img/Search-Query-Language/Search-Operators/sessionize/../../../../Assets/Media_Repo_for_Search/Sessionize_layout_574x155.png)

Each system generated log messages, so we know that at some point a
failure occurred. We know the userRequestID value from the log files
from the Service machine, and we know the serviceSessionId,
streamRequestId, and configSessionId. Using **sessionize**, we can weave
together these disparate logs to identify where the failure occurred.

Queries using sessionize cannot be added to a Dashboard.

### Syntax

* `sessionize (\<anchor pattern\>") as \<alias list\>), (\<anchor pattern\>") as \<alias list\>) `

Where *anchor pattern* is like a parse anchor expression, except that it
can include variables from previous expressions (using `$variableName`).

### Rules

* The sessionize operator is followed by more than
    one [anchor](../01-Parse-Operators/01-Parse-Predictable-Patterns-Using-an-Anchor.md "Parse Operator") expression.
* Each anchor expression can be used to extract one or more variables
    from a matching log.
* You can use the extracted variable to join with a second log message
    containing that variable using a $variableName notation.

After using the [Trace](trace.md "trace") operator to find related
sessions, you can use the sessionize operator to refine the results.

### Example

Let's say we have two events that interest us in our Windows events:

* When users are logged off
* When someone restarts a session

These two events together for a system can reveal how problematic a
particular Windows machine, domain, or logon ID can be.

In this example:

`_sourceCategory=OS/Windows   | sessionize "ComputerName = \"*\";\n\tEventCode = 4778;*Account Name:\t\t*\r*Account Domain:\t\t*\r*Logon ID:\t\t*\r" as (computerName,_11,userName,_u1,domain,_d1,logonID),  "ComputerName = \"$computerName\";\n\tEventCode = 4779;*Account Name:\t\t$userName\r*Account Domain:\t\t$domain\r*Logon ID:\t\t*\r" as (_event2,_u2,_d2,_21)`

1.  Specify the search conditions that correlate the logs. In this
    example a simple \_sourceCategory of all my Windows logs.
2.  Extract the information relevant to the sessions you want to
    compare. In this case, we want to compare Windows disconnect
    events,  code 4779 to reconnections, 4778 to see if someone
    disconnects, were they able to reconnect.

Here's an example of the results from this query:

![sessionize.png](../../static/img/Search-Query-Language/Search-Operators/sessionize/sessionize.png)

 

 
