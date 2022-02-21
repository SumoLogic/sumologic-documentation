---
id: live-tail-cli
---

# Live Tail CLI

The Live Tail Command Line Interface (CLI) is a standalone application
that allows you to start and use a Live Tail session from the command
line.

The Live Tail CLI supports the following operating systems:

-   Mac OS 10.6, Snow Leopard or later, 64-bit
-   Windows XP or later, 64-bit
-   Linux, major distributions, 64-bit

## Limitations

The limitations for the Live Tail CLI are the same as the [Live
Tail](About-Live-Tail.md "About Live Tail") feature in the Sumo Logic
Web Application, but for these exceptions:

-   You can tail logs ingested from Sources configured on Installed
    Collectors and from HTTP and Cloud Syslog Sources on Hosted
    Collectors.

    Data ingested from Amazon S3 can’t be tailed because of restrictions
    from Amazon

-   The Live Tail CLI session will expire after 30 minutes of
    inactivity. This is to provide the best performance possible. If a
    Live Tail session has expired, you can restart it at any time.

-   \_view and \_index are not supported in Live Tail queries.

For complete details, see [Live Tail](Live-Tail-CLI/...md "Live Tail").

## Install and use the Live Tail CLI

**To download the Live Tail CLI:**

1.  First, go to�\<https://github.com/sumologic/livetail-cl\> to view the
    README file. 
2.  Then download your platform-specific binaries
    at�\<https://github.com/SumoLogic/livetail-cli/release\>. 

When you run it the first time, the **livetail-cli** file creates
a **config.json** file that stores the user’s deployment, access ID, and
access key, when prompted. You only need to enter your
deployment, access ID, and access key once. But if you prefer to clear
your access ID and access key and log in again each time, you can use
the **-c** argument to clear them.

**To install the Live Tail CLI:**

1.  Go to�\<https://github.com/SumoLogic/livetail-cli/release\>.
2.  Download the **livetail-cli** file and save it to a location where
    you have read, write, and execute permissions.
3.  To begin, in the command prompt, CD to the directory where the files
    are saved.
4.  Enter **./livetail -h**.
5.  To start a Live Tail session and filter, enter for example:   
    **./livetail "\_sourceCategory=Apache/Access error"**

**T**he metadata field and filter must be enclosed in quotes.

1.  When prompted, enter your deployment, access ID and access key. (You
    only need to do this once.)
2.  The Live Tail CLI will first check the version of the Live Tail
    software, then it will create and start the session.
3.  To stop the Live Tail session, enter **Ctrl-C** or **Ctrl-D**.

![example live tail sessions
start.png](../static/img/Live-Tail/Live-Tail-CLI/example%20live%20tail%20sessions%20start.png)

### Search

With the Live Tail CLI, just as with [Live
Tail](Live-Tail-CLI/...md "Live Tail") in the Sumo Logic Web
Application, you can search with the following metadata fields:

-   \_sourceCategory
-   \_sourceHost
-   \_sourceName
-   \_source
-   \_collector

You may search with keywords after providing at least one metadata
field.

#### Syntax

`./livetail \<argumen\>] \<metadataFiel\>\<metadataValu\> \<filte\>]"`

#### Optional Arguments

The Live Tail CLI supports the following optional arguments:

-   **-h** to view Help.
-   **-i** to enter your Access ID.
-   **-k** to enter your Access Key.
-   **-v** to display the Live Tail CLI version number and exit.
-   **-c** to clear your Access ID and Access Key.
-   **Ctrl-C** or **Ctrl-D** to stop your Live Tail session.

### Examples

Tail all logs from a given Source Host:

`./livetail "_sourceHost=localhost"`

Look for errors in a particular application’s logs:

`./livetail "_sourceCategory=db/mysql error"`

Look for patterns:

`./livetail "_sourceCategory=prod/my_app (publish* or delete*)"`

Pipe the output into commands such as grep, awk, sed, etc.

`./livetail "_sourceCategory=Apache/Access" | grep -i "rate limit exceeded"\> out.txt`

### Update Live Tail CLI

When you start a Live Tail CLI session, it first checks the version of
the Live Tail software.

#### Major update

If a major version update exists, you will see the error:

**Incompatible version of Live Tail CLI. Please download the latest
version from \<link\>.**

You must download the latest version before you can start a new Live
Tail CLI session.

#### Minor update

If a minor version update exists, you will see the error:

**A newer version of Live Tail CLI is available, but your current
version will still function. If you would like to download the latest
version, go to \<link\>**

You are not required to download the latest version to start a new Live
Tail, but if you’d like to take advantage of the latest bug fixes and
features, you could.
