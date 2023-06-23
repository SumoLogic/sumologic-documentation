---
id: macos
title: Install a Collector on macOS
description: Install or uninstall a Collector on a macOS system.
---

Follow the steps in this topic to install or uninstall a Collector on  macOS. See [Installed Collectors](/docs/send-data/installed-collectors) for information on other OSs.

## System Requirements

* macOS 10.X
* Single core, 512MB RAM
* 8GB disk space

:::note
If your machine has already had an Installed Collector installed in the past and you want a fresh install, you'll need to delete the previously installed base application folder path `/Application/Sumo Logic Installer` before installing.
:::

## Download

Download the Collector in either of the following ways:

* In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. Click **Add Collector**, click **Installed Collector,** and then click the link for the Collector to begin the download.
* Open a browser and enter the static URL for your Sumo deployment. See how to determine which endpoint to use if you are unsure. The download begins immediately. See [Download a Collector from a Static URL](collector-installation-reference/download-collector-from-static-url.md) for a list of URLs for your deployment pod.

## Install

Install the Collector using either of the following methods:

* [UI installer](#install-using-the-ui-installer) - This method does not support all advanced settings.
* [Command line installer](#install-using-the-command-line-installer)

After installing Collectors, you can configure Sources from Sumo Logic or by providing the [Source settings in a JSON file](/docs/send-data/use-json-configure-sources). If you're using a UTF-8 encoded JSON file, you must provide the file before starting the Collector.

If necessary, you can use the binary package to install a Collector on macOS. See this [Collector FAQ](collector-installation-reference/binary-package-install-a-collector.md) topic for details.

### Install using the UI installer 

Run the installer on your server with root or Administrator privileges. If you are not logged in as root or Administrator, you might be prompted to reauthenticate to your system when you start the UI Installer.

1. Open the downloaded installer file.
1. If prompted, enter the root or Administrator user name and password for the system.
1. Open the wizard to show the Welcome page. Click **Next**.
1. Accept the license agreement and click **Next**.
1. Browse to select a location for the Collector or accept the default and click **Next** to install the Collector files on your machine.
1. The Installer displays the summary of the default settings. If you want to change any of these, click [Advanced UI Installer Settings](collector-installation-reference/advanced-ui-installer-settings.md)  and follow the instructions. Click **Next**.
1. Choose an authentication method.
   * Access Key: If you have a Sumo Logic access ID and key, click **Next**, enter the access ID and key, and click **Next**.
   * Installation Token: The Setup Wizard has not yet been updated to provide an option for Installation Tokens. You can provide the Installation Token using the Setup Wizard Token option. Enter the **Token String** you want to use to register the Collector in the input box for a Setup Wizard one-time token.
1. Click **Finish** to complete the setup.
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection** and verify that you can see the Collector. Look for the name that is listed as Collector Name in the confirmation step of this procedure (the name can be customized under **Advanced Settings**). If a Collector with that name already exists, a suffix is appended to uniquely identify it. If you don’t see the Collector, check the [Error Codes](collector-installation-reference/collector-installation-error-messages.md) list to help troubleshoot.

### Install using the command line installer 

Quiet mode performs the same installation steps as the UI installer, but runs in the background and doesn’t require any user interaction while it is running. It is useful for scripting an automated installation of multiple Collectors.

Specify the installation parameters on the command line, or create a variables file (varfile) to call from the command line. See [Parameters for the Command Line Installer](collector-installation-reference/parameters-command-line-installer.md) for a description of the parameters.

1. Open the downloaded installer file to mount it.   

    `open /Volumes/SumoCollector/Sumo\ Logic\ Collector\ Installer.app`

1. In a terminal prompt, change the directory to the Java class within the mounted location:   

    `cd /Volumes/SumoCollector/Sumo\ Logic\ Collector\ Installer.app/Contents/MacOS/`

1. Run the JavaApplicationStub binary with the parameters that you want to configure. See [Parameters for the Command Line Installer](collector-installation-reference/parameters-command-line-installer.md) for a description of the parameters.

**Examples**

Using an Installation Token:

```bash
sudo ./JavaApplicationStub -q -Vsumo.token_and_url=<installationToken>
```

Using access ID and access key:

```bash
sudo ./JavaApplicationStub -q -Vsumo.accessid=<accessId> -Vsumo.accesskey=<accessKey>
```

Using access ID and access key with proxy settings:

```bash
sudo ./JavaApplicationStub -q -Vsumo.accessid=<accessId> -Vsumo.accesskey=<accessKey> -Vproxy.host=<proxyHost> -Vproxy.port=<proxyPort>
```

## Uninstall

If you uninstall a Collector, no more data is sent to Sumo Logic from that machine. Uninstalling a Collector doesn't cancel your Sumo Logic account or delete any data from Sumo Logic.

Uninstalling a Sumo Logic installed Collector requires the following steps:

1. Uninstall the Collector from the host machine using either of these methods.
   * [Uninstall using the installer](#uninstall-using-the-installer)
   * [Uninstall from the command line](#uninstall-from-the-command-line)
1. [Remove the Collector from Sumo Logic](#delete-the-collector-from-the-web-application).

### Uninstall using the installer

1. On your system, in the Applications folder, find the folder Sumo Logic Collector.
1. Double-click the file Sumo Logic Collector Uninstaller.
1. If prompted, select your language and click **OK**.
1. Enter the user name and password for the system.
1. When the Sumo Logic Collector Uninstall wizard is displayed, click **Next** to remove the Collector.
1. When the success message is displayed, click **Finish**.

### Uninstall from the command line

1. In a terminal prompt, change the directory to the Collector installation directory.   Example:
1. In a terminal prompt, change the directory to the Collector installation directory. Example:
   ```bash
   cd /Applications/Sumo\ Logic\ Collector
   ```
1. Run the JavaApplicationStub binary with the **-q** option. The **-q** option executes the command without presenting additional prompts.   Example:
   ```bash
   sudo Sumo\ Logic\ Collector\ Uninstaller.app/Contents/MacOS/JavaApplicationStub -q
   ```

### Delete the Collector from Sumo Logic

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
1. Find the Collector you want to remove, and click **Delete**.
1. When the Confirm dialog displays, click **OK**.

A success message is displayed and the Collector is removed from the list.

## Troubleshooting

:::note
This issue only applies to Collector versions prior to 19.361-8.
:::

When you try to install a Sumo Logic Collector on a Mac running OS X Mountain Lion or later, you may see the error message "App can't be opened because it is from an unidentified developer". This message appears to prevent installing applications from developers that aren't verified through the Mac App Store:

![install](/img/send-data/Mac_OSX_Gatekeeper.png)

This doesn't mean that you can't install a Sumo Logic Collector. The Sumo Logic Collector app is a legitimate and safe download. It just takes an extra step.

To install a Sumo Logic Collector:

1. **Control + click** (or right-click) the Sumo Logic application icon and choose **Open**.  

    ![install](/img/send-data/Mac_OSX_Gatekeeper_workaround1.png)
1. In the next dialog, click **Open**. This will allow the Collector to install.  

    ![install](/img/send-data/Mac_OSX_Gatekeeper_workaround2.png)
