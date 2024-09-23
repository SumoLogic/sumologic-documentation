---
id: windows
title: Install a Collector on Windows
sidebar_label: For Windows
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

Download the Collector in either of the following ways.

### Via installation

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. Click **Add Collector**.
1. Click **Installed Collector**.
1. Click the link for the Collector to begin the download.

### Via browser

Open a browser and enter the static URL for your Sumo deployment. See [Which endpoint should I use?](/docs/api/getting-started/#which-endpoint-should-i-should-use) if you are unsure. The download begins immediately. See [Download a Collector from a Static URL](collector-installation-reference/download-collector-from-static-url.md) for a list of URLs for your deployment pod.

## Install Collector

Install the Collector using either the UI installer or command-line installer.

You can build a Collector into a [Windows machine image](collector-installation-reference/add-collector-windows-machine-image.md) such as an Amazon AMI or VMware image.

After installing Collectors, you can configure Sources directly in Sumo Logic or by providing the [Source settings in a JSON file](/docs/send-data/use-json-configure-sources). If you're using a UTF-8 encoded JSON file, you must provide the file before starting the Collector. The JSON file needs to be UTF-8 encoded.

If necessary, you can use the binary package to install a Collector on MacOS. See this [Collector FAQ](/docs/send-data/collector-faq) topic for details.

### Using the UI installer

:::note
This method does not support all advanced settings.
:::

Run the installer on your server with root or Administrator privileges. For Windows, right-click the installer file and select **Run as Administrator**. If you're not logged in as root or Administrator, you may be prompted to reauthenticate when you start the UI Installer.

1. Open the downloaded installer file.
1. If prompted, enter the root or Administrator user name and password for the system.
1. Open the wizard to show the Welcome page. Click **Next**.
1. Accept the license agreement and click **Next**.
1. Browse to select a location for the Collector or accept the default and click **Next** to install the Collector files on your machine.
1. The Installer displays the summary of the default settings. If you want to change any of these, click [Advanced UI Installer Settings](collector-installation-reference/advanced-ui-installer-settings.md) and follow the instructions. Click **Next**.
1. Choose an authentication method.
   * [Access Key](/docs/manage/security/access-keys/). If you have a Sumo Logic access ID and key, click **Next**, enter the access ID and key, and click **Next**.
   * [Installation Token](/docs/manage/security/installation-tokens/). Enter the **Token String** you want to use to register the Collector in the input box.
1. Click **Finish** to complete the setup.
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection** and verify that you can see the Collector. Look for the name that is listed as Collector Name in the confirmation step of this procedure (the name can be customized under **Advanced Settings**). If a Collector with that name already exists, a suffix is appended to uniquely identify it. If you don’t see the Collector, check the [Error Codes](collector-installation-reference/troubleshooting.md) list to help troubleshoot.

### Using the command line installer

1. From the command prompt, run the downloaded EXE file with with the parameters that you want to configure. See [Installed Collector CLI Parameters](collector-installation-reference/parameters-command-line-installer.md) for a description of the parameters.
1. When you see the `Finishing installation...` message you can close the command prompt window. The installation is complete.

The `-console` parameter is required to display output messages from the installation.

:::note PowerShell users
When using quiet mode installation on Windows with Microsoft PowerShell, parameters following `-console -q` must be escaped with quotes, for example:
```bash
SumoCollector.exe -console -q "-Vsumo.accessid=<accessId>" "-Vsumo.accesskey=<accessKey>" "-Vsources=<filepath>"
```

Or, if you're using `-varfile`:
```
Start-Process C:\<path to collector executable>\SumoCollector.exe -Wait -ArgumentList "-q","-console","-varfile `"C:\<path to varfile>\sumo_credentials.txt`""
```

:::

#### Examples

Using an [Installation Token](/docs/manage/security/installation-tokens):

```bash
SumoCollector.exe -console -q "-Vsumo.token_and_url=<installationToken>" "-Vsources=<filepath>"
```

Using [access ID and access key](/docs/manage/security/access-keys):

```bash
SumoCollector.exe -console -q "-Vsumo.accessid=<accessId>" "-Vsumo.accesskey=<accessKey>" "-Vsources=<filepath>"
```

Using access ID and access key with proxy settings:

```bash
SumoCollector.exe -console -q "-Vsumo.accessid=<accessId>" "-Vsumo.accesskey=<accessKey>" "-Vsources=<filepath>" "-Vproxy.host=<proxyHost>" "-Vproxy.port=<proxyPort>"
```


## Add a Collector to a Windows Machine Image

You can build a Sumo Logic Collector into a Windows machine image such as an Amazon AMI, a VMware image, or Azure virtual machine.

Collectors normally register with Sumo Logic during the installation process, but users can pass the `‑VskipRegistration=true` flag to skip registration. This way, the collector is installed as a service that will start and register automatically when the image is launched.

### Initial collector installation

Download the appropriate collector from the [**Collection**](/docs/send-data/collection/) page or from the list below.

1. Download your collector. Choose from the 32-bit or 64-bit static URLs for latest Windows collector builds, and make sure to choose your correct Sumo Logic pod. Find the list of URLs in [Download a collector from a static URL](download-collector-from-static-url.md) in Help.

1. To configure custom sources, create a source JSON file that lists all the sources you want the collector to scan and submit to the Sumo Logic service. These source configurations are only applied during the initial registration of the collector, any updates to the sources.json file will *not* be applied during a simple restart of the collector.

    The following sample JSON file includes Local File Source and Local Windows Event Source configuration samples. For a full list of available source types and parameters, which can be used within the sources.json file, please review the [JSON help documentation](/docs/send-data/use-json-configure-sources).

    :::important
    JSON files need to be UTF-8 encoded.
    :::

    ```json title="Sample sources.json"
    {
        "api.version": "v1",
        "sources": [
        {
            "sourceType": "LocalFile",
            "name": "Example Log Collection",
            "pathExpression": "C:\\Application\\logs\\*.log",
            "category": "my_application"
        },
        {
            "sourceType":"LocalWindowsEventLog",
            "name":"Local Windows Events",
            "renderMessages":true,
            "logNames":[
                "Security",
                "Application"
            ],
            "category": "windows_events"
        }
        ]
    }
    ```

1. Set up auto-registration details for the Collector:  

   * [Create a New User](/docs/manage/users-roles/users/) account with Administrator permissions or a role with permissions to "Manage Collectors."
   * Create an [Access Key and Access Id](/docs/manage/security/access-keys.md) for this user, which will be used to register the collector.

1. Run the installer with the following arguments:

   * `-console` starts the installer in console mode
   * `-q` starts the installer in quiet mode (no UI)
   * `-VskipRegistration=true` to skip collector registration during installation
   * `-Vephemeral=true` to [set the collector as ephemeral](set-collector-as-ephemeral.md) (will be removed after 12 hours offline)
   * `--Vsumo.accessid=<access_id>` to specify access id generated above  
   * `-Vsumo.accesskey=<access_key>` to specify access key generated above  
   * `-Vsources=<filepath>` to specify the path to your source JSON file created above
   * (Optional) `-dir` to install into a non-standard installation directory. By default, Windows will install in `C:\Program Files\Sumo Logic Collector`.

    Example:

    ```bash
    SumoCollector_windows-x64_19_XXX-XX.exe -console -q -VskipRegistration=true -Vephemeral=true -Vsumo.accessid=<access_id> -Vsumo.accesskey=<access_key> -Vsources=C:\\sumo\\sources.json
    ```

    When you see the `Finishing installation...` message you can close the command prompt window. The installation is complete.

1. (For Windows hosts launched on Amazon EC2 instances) There can be a delay on Amazon EC2 instances before a Windows host name is provided. If you would like the collector to wait for the host name to be available, you can enable a delay during registration. To set the delay parameter, add the following to the **collector.properties** file, which is created during installation at **C:\\Program Files\\Sumo Logic Collector\\config\\collector.properties**:

    ```bash
    collector.registration.delay.ms = 30000
    ```

:::note
Do not start the Collector before building the image If you're using `-VskipRegistration=true`. Starting the Collector prematurely will register the Collector with Sumo Logic, causing ingestion issues when using baked AMI. If you did start the Collector and it registered you can remove the Collector's registration by navigating to the Collector's installation directory under `/config/creds/` and deleting all of its contents.
:::

### Build your image

Now you are ready to take the machine at its current state and generate an image. Follow the procedure for the specific image type.  Instances launched from the image will automatically be registered with the DNS name of the instance. The installed collector service will start and register automatically when the instance is launched.



## Install using the Binary Package

import binarypackageinstall from '../../../reuse/binary-package-install.md';

<binarypackageinstall/>


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
    On Windows, the `-console` parameter is required to display output messages.
    :::

1. When you see the `Finishing installation...` message you can close the command prompt window. The uninstallation is complete.

### Remove the Collector from Sumo Logic

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. Find the Collector you want to remove, and click **Delete**.
1. When the Confirm dialog displays, click **OK**.

A success message is displayed and the Collector is removed from the list.
