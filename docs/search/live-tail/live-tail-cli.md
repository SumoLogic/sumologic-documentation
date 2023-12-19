---
id: live-tail-cli
title: Live Tail CLI
description: The Live Tail Command Line Interface (CLI) is a standalone application that allows you to start and use a Live Tail session from the command line.
---

The Live Tail Command Line Interface (CLI) is a standalone application that allows you to start and use a Live Tail session from the command line.

The Live Tail CLI supports the following operating systems:

* Mac OS 10.6, Snow Leopard or later, 64-bit
* Windows XP or later, 64-bit
* Linux, major distributions, 64-bit

## Limitations

The limitations for the Live Tail CLI are the same as the [Live Tail](about-live-tail.md) feature in Sumo Logic, with some exceptions:

* You can tail logs ingested from Sources configured on Installed Collectors and from HTTP and Cloud Syslog Sources on Hosted Collectors.
  :::note
  Data ingested from Amazon S3 can't be tailed because of restrictions from Amazon.
  :::
* The Live Tail CLI session will expire after 30 minutes of inactivity. This is to provide the best performance possible. If a Live Tail session has expired, you can restart it at any time.
* `_view` and `_index` are not supported in Live Tail queries.

## Install and use the Live Tail CLI

:::note
The metadata field and filter must be enclosed in quotes.
:::

1. Review the [README file](https://github.com/sumologic/livetail-cli). 
1. Download your platform-specific binaries from [Releases](https://github.com/SumoLogic/livetail-cli/releases) to a location where you have read, write, and execute permissions.
1. In the command prompt, navigate to the directory where the files are saved.
1. Enter `./livetail -h`
1. When you run livetail the first time you need to provide the [deployment](/docs/api/troubleshooting#Deployments-and-Sumo-Logic-Endpoints) of the account and [access ID/key](/docs/manage/security/access-keys.md) to authenticate.<br/>  ![session start](/img/search/livetail/cli-live-tail-sessions-start.png)
   * A **config.json** file is created in the same directory as the livetail binary that stores this authentication information so you only need to enter your deployment, access ID, and access key once. But if you prefer to clear your access ID and access key and log in again each time, you can use the `-c` argument to clear them.
1. To start a Live Tail session with a filter, enter for example:
  ```bash
  .livetail "_sourceCategory=Apache/Access error"
  ```
1. To stop the Live Tail session, enter **Ctrl-C** or **Ctrl-D**.

### Search

With the Live Tail CLI, just as with [Live Tail](about-live-tail.md) in Sumo Logic, you can search with the following metadata fields:

* `_sourceCategory`
* `_sourceHost`
* `_sourceName`
* `_source`
* `_collector`

You may search with keywords after providing at least one metadata field.

#### Syntax

`./livetail [<argument>] "<metadataField><metadataValue> <filter>]"`

### Optional Arguments

The Live Tail CLI supports the following optional arguments:

* `-h` to view Help.
* `-i` to enter your Access ID.
* `-k` to enter your Access Key.
* `-v` to display the Live Tail CLI version number and exit.
* `-c` to clear your Access ID and Access Key.
* Ctrl-C or Ctrl-D to stop your Live Tail session.

## Examples

Tail all logs from a given Source Host:

```bash
./livetail "_sourceHost=localhost"
```

Look for errors in a particular application’s logs:

```bash
./livetail "_sourceCategory=db/mysql error"
```

Look for patterns:

```bash
./livetail "_sourceCategory=prod/my_app (publish* or delete*)"
```

Pipe the output into commands such as grep, awk, sed, etc.

```bash
./livetail "_sourceCategory=Apache/Access" | grep -i "rate limit exceeded"\> out.txt
```

## Update Live Tail CLI

When you start a Live Tail CLI session, it first checks the version of the Live Tail software.

### Major update

If a major version update exists, you will see the error: `Incompatible version of Live Tail CLI. Please download the latest version from <link>.`

You must download the latest version before you can start a new Live Tail CLI session.

### Minor update

If a minor version update exists, you will see the error: `A newer version of Live Tail CLI is available, but your current version will still function. If you'd like to download the latest version, go to <link>.`

Although not required, downloading the latest version to start a new Live Tail will allow you to take advantage of the latest bug fixes and features.
