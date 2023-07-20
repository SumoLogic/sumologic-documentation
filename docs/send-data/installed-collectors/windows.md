---
id: windows
title: Install a Collector on Windows
description: Install or uninstall a Collector on a Windows system.
---


Follow the steps in this topic to install or uninstall a collector on Windows. See [Installed Collectors](/docs/send-data/installed-collectors/sources) for information on other OSs.

## System Requirements

* Windows 7, 32 or 64 bit
* Windows 8, 32 or 64 bit
* Windows 8.1, 32 or 64 bit
* Windows 10, 32 or 64 bit
* Windows 11, 32 or 64 bit
* Windows Server 2012
* Windows Server 2016
* Windows Server 2019
* Windows Server 2022
* Single core, 512MB RAM
* 8GB disk space
* Package installers require TLS 1.2 or higher.

## Download

Download the Collector in either of the following ways:

* In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. Click **Add Collector**, click **Installed Collector,** and then click the link for the Collector to begin the download.
* Open a browser and enter the static URL for your Sumo deployment. See how to determine which endpoint to use if you are unsure. The download begins immediately. See [Download a Collector from a Static URL](collector-installation-reference/download-collector-from-static-url.md) for a list of URLs for your deployment pod.

## Install a Collector on Windows

Install the Collector using either of the following methods: 

* UI installer - This method does not support all advanced settings.
* Command line installer

You can build a Collector into a [Windows machine image](collector-installation-reference/add-collector-windows-machine-image.md) such as an Amazon AMI or VMware image.

After installing Collectors, you can configure Sources directly in Sumo Logic or by providing the [Source settings in a JSON file](/docs/send-data/use-json-configure-sources). If you're using a UTF-8 encoded JSON file, you must provide the file before starting the Collector. The JSON file needs to be UTF-8 encoded.

If necessary, you can use the binary package to install a Collector on MacOS. See this [Collector FAQ](/docs/send-data/collector-faq) topic for details.

### Install using the UI installer

Run the installer on your server with root or Administrator privileges. If you are not logged in as root or Administrator, you might be prompted to reauthenticate to your system when you start the UI Installer.

1. Open the downloaded installer file.
1. If prompted, enter the root or Administrator user name and password for the system.
1. Open the wizard to show the Welcome page. Click **Next**.
1. Accept the license agreement and click **Next**.
1. Browse to select a location for the Collector or accept the default and click **Next** to install the Collector files on your machine.
1. The Installer displays the summary of the default settings. If you want to change any of these, click [Advanced UI Installer Settings](collector-installation-reference/advanced-ui-installer-settings.md) and follow the instructions. Click **Next**.
1. Choose an authentication method.
   * Access Key: If you have a Sumo Logic access ID and key, click **Next** enter the access ID and key, and click **Next**.
   * Installation Token: The Setup Wizard has not yet been updated to provide an option for Installation Tokens. You can provide the Installation Token using the Setup Wizard Token option. Enter the **Token String** you want to use to register the Collector in the input box for a Setup Wizard one-time token.
1. Click **Finish** to complete the setup.
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection** and verify that you can see the Collector. Look for the name that is listed as Collector Name in the confirmation step of this procedure (the name can be customized under **Advanced Settings**). If a Collector with that name already exists, a suffix is appended to uniquely identify it. If you don’t see the Collector, check the [Error Codes](collector-installation-reference/collector-installation-error-messages.md) list to help troubleshoot.

### Install using the command line installer

1. From the command prompt, run the downloaded EXE file with with the parameters that you want to configure. See [Parameters for the Command Line Installer](collector-installation-reference/parameters-command-line-installer.md) for a description of the parameters.
1. When you see the `Finishing installation...` message you can close the command prompt window. The installation is complete.

The `-console` parameter is required to display output messages from the installation.

:::note PowerShell users
When using quiet mode installation on Windows with Microsoft PowerShell, parameters following `-console -q` must be escaped with quotes, for example:
```bash
SumoCollector.exe -console -q "-Vsumo.accessid=<accessId>" "-Vsumo.accesskey=<accessKey>" "-Vsources=<filepath>"
```

Or, if you're using -varfile:
```
Start-Process C:\<path to collector executable>\SumoCollector.exe -Wait -ArgumentList "-q","-console","-varfile `"C:\<path to varfile>\sumo_credentials.txt`""
```

:::

**Examples**

Using an [Installation Token](/docs/manage/security/installation-tokens.md):

```bash
SumoCollector.exe -console -q "-Vsumo.token_and_url=<installationToken>" "-Vsources=<filepath>"
```

Using [access ID and access key](/docs/manage/security/access-keys.md):

```bash
SumoCollector.exe -console -q "-Vsumo.accessid=<accessId>" "-Vsumo.accesskey=<accessKey>" "-Vsources=<filepath>"
```

Using access ID and access key with proxy settings:

```bash
SumoCollector.exe -console -q "-Vsumo.accessid=<accessId>" "-Vsumo.accesskey=<accessKey>" "-Vsources=<filepath>" "-Vproxy.host=<proxyHost>" "-Vproxy.port=<proxyPort>"
```

## Uninstall

If you uninstall a Collector, no more data is sent to Sumo Logic from that machine. Uninstalling a Collector doesn't cancel your Sumo Logic account or delete any data from Sumo Logic.

Uninstalling a Sumo Logic installed Collector requires the following steps:

1. Uninstall the Collector from the host machine using either of these methods.
   * [Uninstall using the installer](#uninstall-using-the-installer)
   * [Uninstall from the command line](#uninstall-from-the-command-line)
1. [Remove the Collector from Sumo Logic](#remove-the-collector-from-sumo-logic).

### Uninstall using the installer

1. From the Windows Control Panel choose **Uninstall a program**.
1. Right-click Sumo Logic Collector and choose **Uninstall**.
1. Click **Next** to uninstall the Collector.
1. When the success message is displayed, click **Finish**.

### Uninstall from the command line

1. From the command prompt, run the `uninstall.exe` file with the `-q `option. The `-q` option executes the command without presenting additional prompts.   

    ```bash
    uninstall.exe -q -console
    ```

    :::note
    On Windows, the **`-console`** parameter is required to display output messages.
    :::

1. When you see the `Finishing installation...` message you can close the command prompt window. The uninstallation is complete.

### Remove the Collector from Sumo Logic

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
1. Find the Collector you want to remove, and click **Delete**.
1. When the Confirm dialog displays, click **OK**.

A success message is displayed and the Collector is removed from the list.
