---
id: linux
title: Install a Collector on Linux
sidebar_label: For Linux
description: Install or uninstall a Collector on a Linux system.
---

Follow the steps in this topic to install or uninstall a collector on Linux. See [Installed Collectors](/docs/send-data/installed-collectors/sources) for information on other OSs.

## System Requirements 

* Linux, major distributions 64-bit, or any generic Unix capable of running Java 1.8
* Single core, 512MB RAM
* 8GB disk space
* Package installers require TLS 1.2 or higher

## Download 

Download the Collector in either of the following ways.

### Via installation

1. <!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/). Kanso--> In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <!--Kanso <br/>[**New UI**](/docs/get-started/sumo-logic-ui-new/). In the top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. Kanso-->
1. Click **Add Collector**.
1. Click **Installed Collector**.
1. Click the link for the Collector to begin the download.

### Via browser

Open a browser and enter the static URL for your Sumo deployment. See [Which endpoint should I use?](/docs/api/getting-started/#which-endpoint-should-i-should-use) if you are unsure. The download begins immediately. See [Download a Collector from a Static URL](collector-installation-reference/download-collector-from-static-url.md) for a list of URLs for your deployment pod.

## Install Collector

Install the Collector on Linux using any of the four methods below.

You can build a Collector into a [Linux machine image](collector-installation-reference/add-collector-linux-machine-image.md) such as an Amazon AMI or VMware image. After installing Collectors, you can configure Sources from Sumo Logic or by providing the [Source settings in a JSON file](/docs/send-data/use-json-configure-sources). If you're using a UTF-8 encoded JSON file, you must provide the file before starting the collector. The JSON file needs to be UTF-8 encoded.

### Using the UI installer 

:::note
This method does not support all advanced settings.
:::

Run the installer on your server with root or Administrator privileges. If you are not logged in as root or Administrator, you might be prompted to reauthenticate to your system when you start the UI Installer.

1. Open the downloaded installer file.
1. If prompted, enter the root or Administrator user name and password for the system.
1. Open the wizard to show the Welcome page. Click **Next**.
1. Accept the license agreement and click **Next**.
1. Browse to select a location for the collector or accept the default and click **Next** to install the Collector files on your machine.
1. The Installer displays the summary of the default settings. If you want to change any of these, click [Advanced UI Installer Settings](collector-installation-reference/advanced-ui-installer-settings.md) and follow the instructions. Click **Next**.
1. Choose an authentication method.
   * [Access Key](/docs/manage/security/access-keys/). If you have a Sumo Logic access ID and key, click **Next**, enter the access ID and key, and click **Next**.
   * [Installation Token](/docs/manage/security/installation-tokens/). Enter the **Token String** you want to use to register the Collector in the input box.
1. Click **Finish** to complete the setup.
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection** and verify that you can see the Collector. Look for the name that is listed as Collector Name in the confirmation step of this procedure (the name can be customized under **Advanced Settings**). If a Collector with that name already exists, a suffix is appended to uniquely identify it. If you don’t see the collector, check the [Error Codes](collector-installation-reference/troubleshooting.md) list to help troubleshoot.

### Using the command line installer

1. Add execution permissions to the downloaded Collector file (.sh):
   ```bash
   chmod +x SumoCollector.sh
   ```
1. Run the script with the parameters that you want to configure. See [Installed Collector CLI Parameters](collector-installation-reference/parameters-command-line-installer.md) for a description of the parameters.  By default the Collector will be installed in either `/opt/SumoCollector` or `/usr/local/SumoCollector`.

#### Examples

Using an [Installation Token](/docs/manage/security/installation-tokens.md):

```bash
sudo ./SumoCollector.sh -q -Vsumo.token_and_url=<installationToken> -Vsources=<absolute_filepath>
```

Using [access ID and access key](/docs/manage/security/access-keys.md):

```bash
sudo ./SumoCollector.sh -q -Vsumo.accessid=<accessId> -Vsumo.accesskey=<accessKey> -Vsources=<absolute_filepath>
```

Adding proxy settings:

```bash
sudo ./SumoCollector.sh -q -Vsumo.accessid=<accessId> -Vsumo.accesskey=<accessKey> -Vsources=<absolute_filepath> -Vproxy.host=<proxyHost> -Vproxy.port=<proxyPort>
```

Including `syncSources` and a customized Collector name:

```bash
sudo ./SumoCollector.sh -q -Vsumo.accessid=<accessId> -Vsumo.accesskey=<accessKey> -VsyncSources=<absolute_filepath> -Vcollector.name=<name>
```

### Using the RPM or Debian package

You can use the RPM or Debian package to install a Collector on a Linux 64-bit system.

1. Install the Collector using the downloaded installation package. For the RPM package, use the command:
   ```bash
   sudo rpm -i SumoCollector-19.XXX-XX.x86_64.rpm
   #Replace XXX-XX with the version number of the package you downloaded.
   ```
   For the Debian package, use the command:
   ```bash
   sudo dpkg -i SumoCollector-19.XXX-XX.x86_64.deb
   #Replace XXX-XX with the version number of the package you downloaded.
   ```
   :::note
   Replace _XXX-XX_ in the command above with the version number of the package you downloaded.
   :::
   The RPM and Debian packages install the collector in the `/opt/SumoCollector` directory. By default, the Collector is installed as a system service, but not yet started.
1. Configure the Collector [user.properties file](/docs/send-data/installed-collectors/collector-installation-reference/user-properties) in the `/opt/SumoCollector/config/` directory. The Collector uses the settings defined in user.properties to register and start.

   To use an [access key](/docs/manage/security/access-keys), provide the `accessid` and `accesskey` parameters. For example:

   ```
   name = <collectorName>
   accessid = <accessId>
   accesskey = <accessKey>
   ```

   To use an installation token, provide the authentication parameters `token` and `url`. To use these two parameters, you'll need to manually base64 decode the **Token String**. Once decoded, you'll have a string with a token and a URL.

   For example, the following decoded **Token String**:

   `sumoxxxxxxxxxxxxxxxxxxxxxxxxxxxxhttps://collectors.sumologic.com`

   would be used as:

   ```
   name = <collectorName>
   url=https://collectors.sumologic.com
   token=SUMOXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

   :::note
   Starting with collector 19.170+, the installation directory is secured to users belonging to the `sumologic_collector` group. Modifying user.properties may require sudo privileges. For more information see [Enhanced File System Security for Installed Collectors](collector-installation-reference/enhanced-file-system-security-installed-collectors.md).
   :::

1. (Optional) Provide a JSON Source information. You can pass all Source settings in a UTF-8 encoded JSON file. If you're using a JSON file, you must provide the file before starting the Collector. See [Using JSON to configure Sources](/docs/send-data/use-json-configure-sources). Alternatively, you can configure Sources at any time by using the Sumo web app. See [Sources](/docs/send-data/choose-collector-source).
1. (Optional) Set the run a user for the Collector if you want the Collector to run as a user other than root. See [run as for a Collector](collector-installation-reference/set-run-as-user-for-collector.md).
1. (Optional on Collector version 19.253-3+ in the Fed deployment) Enable FIPS 140-2 compliant Java Cryptography Extension (JCE) to encrypt your data to Sumo Logic's Fed deployment in US1 only. FIPS mode is not supported for any other deployment. If you are unsure whether you are on the Fed deployment, check our deployments. To enable, locate and run the script `configureFipsMode.sh` contained in Collector's installation directory under `/script`:      
   ```bash
   $ sh ./script/configureFipsMode.sh
   ```
1. Start the Collector using the following command.
   ```bash
   sudo service collector start
   ```

### Using the binary package

1. Install the version of JRE you want to use from the following location. (The collector requires Java 8 or higher). The binary installation process does not include JRE installation. See the [downloads list](https://docs.aws.amazon.com/corretto/latest/corretto-8-ug/downloads-list.html).
1. Check the version of Java is 8 or higher:
   ```bash
   java -version
   ```
1. Untar the downloaded binary file inside your desired destination directory to create a subdirectory named **sumocollector**:
   ```sh
   tar -xvf SumoCollector_unix_XXX.tar.gz
   ```
1. Copy the platform-specific wrapper file to the **sumocollector** directory:
   ```bash
   cp tanuki/wrapper-<platform> .
   ````
1. Make the **wrapper**, **collector**, and **script** directory files executable:
   ```bash
   chmod ug+x wrapper-<platform>
   chmod ug+x collector
   chmod ug+x script/*
   ```
1. Configure the Collector user.properties file in the `/opt/SumoCollector/config/` directory. The Collector uses the settings defined in user.properties to register and start. See [user.properties](collector-installation-reference/user-properties.md) for a full list of all the supported parameters.

   To use an access key, provide the `accessid` and `accesskey` parameters. For example:
   ```sh
   name = <collectorName>
   accessid = <accessId>
   accesskey = <accessKey>
   wrapper.java.command = java
   ```

   To use an installation token, provide the authentication parameters `token` and `url`. To use these two parameters, you'll need to manually base64 decode the **Token String**. Once decoded, you'll have a string with a token and a URL.

   For example, the following decoded **Token String**:

   ```sh
   SUMOXXXXXXXXXXXXXXXXXXXXXXXXXXXXhttps://collectors.sumologic.com
   ```

   would be used as:

   ```sh
   name = <collectorName>
   url=https://collectors.sumologic.com
   token=SUMOXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   wrapper.java.command = java
   ```

1. Set access control for files under the **sumocollector** directory:

   ```bash
   sudo script/secureFiles.sh
   ```
1. (Optional) Provide JSON Source information. You can pass all Source settings in a UTF-8 encoded JSON file. If you're using a JSON file, you must provide the file before starting the Collector. See [Using JSON to configure Sources](/docs/send-data/use-json-configure-sources). Alternatively, you can configure sources at any time by using the Sumo web app. See [Sources](/docs/send-data/choose-collector-source).
1. (Optional) Set the run as user for the Collector if you want the Collector to run as a user other than root. See [run as for a Collector](collector-installation-reference/set-run-as-user-for-collector.md).
1. (Optional on Collector version 19.253-3+) Enable FIPS 140-2 compliant Java Cryptography Extension (JCE) to encrypt your data. Once enabled, the Collector version cannot be downgraded below version 19.253-1. To enable, locate and run the script **configureFipsMode.sh** contained in Collector's installation directory under **/script**:
   ```bash
   $ sh ./script/configureFipsMode.sh
   ```
1. Install the Collector as a service. Use the following command to install the Collector as a service that is started when the machine starts.
   ```bash
   sudo ./collector install
   ```
1. Start the Collector service. Use the following command to start the collector service.
   ```bash
   sudo ./collector start
   ```
1. To verify that the collector is installed, go to **Manage Data** > **Collection** > **Collection** in the Sumo web app and verify that you can see the collector.


## Add a Collector to a Linux Machine Image

You can build a Sumo Logic Collector into a Linux machine image such as an Amazon AMI or VMware image.

Collectors will normally register with Sumo Logic during the installation process, but you can pass the `‑VskipRegistration=true` flag to skip registration. This way, the collector is installed as a service that will start and register automatically when the image is launched.

### Initial Collector installation

Download the appropriate collector from the Sumo Logic **Collection** page, or from the list below.

1. Download your collector. Choose from the 32-bit or 64-bit static URLs for latest Linux collector builds, and make sure to choose your correct Sumo Logic pod. Find the list of URLs in [Download a Collector from a static URL](download-collector-from-static-url.md) in Help.

1. Change the permissions to allow the file to be executed.

    ```bash
    chmod 744 SumoCollector_linux_amd64_19_XXX-X.sh
    ```

1. To configure custom sources, create a source JSON file that lists all the sources you want the collector to scan and submit to the Sumo Logic service. These source configurations are only applied during the initial registration of the collector, any updates to the sources.json file will *not* be applied during a simple restart of the collector.

    The following sample JSON file includes local file source and syslog source configuration samples. For a full list of available source types and parameters, which can be used within the sources.json file, please review the [JSON help documentation](/docs/send-data/use-json-configure-sources).

    :::important
    JSON files need to be UTF-8 encoded.
    :::

    ```json title="Sample sources.json"
    {
      "api.version": "v1",
      "sources": [
        {
            "sourceType": "LocalFile",
            "name": "Example1",
            "pathExpression": "/var/logs/maillog",
            "category": "mail",
            "hostName": "sampleSource",
            "useAutolineMatching": false,
            "multilineProcessingEnabled": false,
            "timeZone": "UTC",
            "automaticDateParsing": true,
            "forceTimeZone": false,
            "defaultDateFormat": "dd/MMM/yyyy HH:mm:ss"
        },
        {
            "protocol": "UDP",
            "port": 514,
            "sourceType": "Syslog",
            "name": "SyslogSource",
            "description": "SampleSyslogSource",
            "category": "events",
            "timeZone": "UTC",
            "automaticDateParsing": true,
            "multilineProcessingEnabled": true,
            "useAutolineMatching": true,
            "manualPrefixRegexp": "",
            "forceTimeZone": false,
            "defaultDateFormat": "dd/MMM/yyyy HH:mm:ss"
        }
      ]
    }
    ```

1. Set up auto-registration details for the Collector:  

   * [Create a New User account](/docs/manage/users-roles/users/create-edit-users) with Administrator permissions or a role with permissions to "Manage Collectors".
   * Create an [installation token](/docs/manage/security/installation-tokens).
   * Or, create an [Access Key and Access Id](/docs/manage/security/access-keys) for this user, which will be used to register the collector.

1. As root, run the installer with the following arguments:

   * `q` starts the installer in quiet mode (no UI)  
   * `-VskipRegistration=true` to skip collector registration during installation  
   * `-Vephemeral=true` to set the Collector as ephemeral (will be removed after 12 hours offline)  
   * `-Vsumo.token_and_url=<installationToken>` to use an installation token, or:
   * `-Vsumo.accessid=<access_id>` to specify access id generated above  
   * `-Vsumo.accesskey=<access_key>` to specify access key generated above  
   * `-Vsources=<filepath>` to specify the path to your source JSON file created above  
   * (Optional) `-dir` to install into a non-standard installation directory. By default, Linux will install in `/opt/SumoCollector`

    Example:

    ```bash
    ./SumoCollector_linux_amd64_19_XXX-X.sh -q -VskipRegistration=true -Vephemeral=true -Vsources=/path/to/sources.json -Vsumo.accessid=<access_id> -Vsumo.accesskey=<access_key>
    ```

    or

    ```bash
    ./SumoCollector_linux_amd64_19_XXX-X.sh -q -VskipRegistration=true -Vephemeral=true -Vsources=/path/to/sources.json -Vsumo.accessid=<access_id> -Vsumo.accesskey=<access_key> -dir "/usr/local/SumoCollector"
    ```

1. (Optional) Remove the `"name"` property from the generated user.properties file. By default, the collector installation will use the hostname of the machine the installer runs on. However, when creating an image, this will cause all collectors created using this image to have the same name prefix, followed by a unique epoch timestamp.

    To ensure collectors created using this image will use the correct hostname, you can modify the user.properties file, located at `/opt/SumoCollector/config/user.properties` or `/usr/local/SumoCollector/user.properties`. Remove the line that specifies `"hostName = <hostname>"` and save the file.

:::note
Do not start the collector before building the image, if you're using `-VskipRegistration=true`. Starting the collector prematurely will register the collector with Sumo Logic, causing ingestion issues when using baked AMI. If you did start the Collector and it registered you can remove the Collector's registration by navigating to the Collector's installation directory under `/config/creds/` and deleting all of its contents, and then add the Accesskey parameter in the user.properties file to bake the AMI.
:::

### Build your image

Now you are ready to take the machine at its current state and generate an image. Follow the AWS procedure to create an image. Instances launched from the image will automatically be registered with the DNS name of the instance. The installed collector service will start and register automatically when the instance is launched.






## Uninstall the collector

Uninstalling a collector requires the following two steps:

1. Uninstall the collector from the Linux system using any of these methods:
   * [UI installer](#uninstall-using-the-ui-installer)
   * [Command line installer](#uninstall-using-the-command-line)
   * [RPM/Debian package](#uninstall-using-the-rpmdebian-packages)
   * [Binary package](#uninstall-using-the-binary-package)
1. [Remove the collector from Sumo Logic](#remove-the-collector-from-the-web-app).

### Uninstall using the UI Installer

1. On your system, in the Applications folder, find the `Sumo Logic Collector` folder.
1. Double-click the file `Sumo Logic Collector Uninstaller`.
1. If prompted, select your language and click **OK**.
1. Enter the user name and password for the system.
1. When the Sumo Logic Collector Uninstall wizard is displayed, click **Next** to remove the collector.
1. When the success message is displayed, click **Finish**.

### Uninstall using the command line

1. In a terminal prompt, change the directory to the collector installation directory. By default, the collector will be installed in either `/opt/SumoCollector` or `/usr/local/SumoCollector`.
   ```bash
   cd /usr/local/SumoCollector
   ```
1. Run the `uninstall` binary with the `-q` option. The `-q` option executes the command without presenting additional prompts.
   ```bash
   sudo ./uninstall -q
   ```

### Uninstall using the RPM/Debian packages

For the RPM package, use the command:

```bash
sudo rpm -e SumoCollector
```

For the Debian package, use the command:

```bash
sudo dpkg -r SumoCollector
```

### Uninstall using the binary package

1. Uninstall the collector service.
   ```bash
   sudo <Collector Installation Directory>/collector remove
   ```
1. Remove the collector installation directory.
   ```bash
   sudo rm -rf <Collector Installation Directory>
   ```
1. (Optional) On some distributions, for instance, Ubuntu, you may need to re-synchronize the daemon setting before installing the collector again.
   ```bash
   sudo systemctl daemon-reload
   ```

### Remove the collector from the web app 

1. <!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/). Kanso--> In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <!--Kanso <br/>[**New UI**](/docs/get-started/sumo-logic-ui-new/). In the top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. Kanso-->
1. Find the collector you want to remove, and click **Delete**.
1. When the Confirm dialog displays, click **OK**.

A success message is displayed and the collector is removed from the list.
