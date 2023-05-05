---
id: linux
title: Install a Collector on Linux
description: Install or uninstall a Collector on a Linux system.
tags: [installed collectors]
---

Follow the steps in this topic to install or uninstall a collector on Linux. See [Installed Collectors](/docs/send-data/installed-collectors/sources) for information on other OSs.

## System Requirements 

* Linux, major distributions 64-bit, or any generic Unix capable of running Java 1.8
* Single core, 512MB RAM
* 8GB disk space
* Package installers require TLS 1.2 or higher.

## Download 

Download the collector in either of the following ways:

* In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. Click **Add Collector**, click **Installed Collector,** and then click the link for the collector to begin the download.
* Open a browser and enter the static URL for your pod. See [Download a Collector from a Static URL](collector-installation-reference/download-collector-from-static-url.md) for a list of URLs for your deployment pod. The download begins immediately.

## Install a collector on Linux

Choose one of these methods to install the Collector:

* [UI installer](#install-using-the-ui-installer) - This method does not support all advanced settings.
* [Command line installer](#install-using-the-command-line-installer)
* [RPM/Debian package](#install-using-the-rpm-or-debian-package)
* [Binary package](#install-using-the-binary-package)

You can build a Collector into a [Linux machine image](collector-installation-reference/add-collector-linux-machine-image.md) such as an Amazon AMI or VMware image.

After installing Collectors, you can configure Sources from Sumo Logic or by providing the [Source settings in a JSON file](/docs/send-data/use-json-configure-sources). If you're using a UTF-8 encoded JSON file, you must provide the file before starting the collector. The JSON file needs to be UTF-8 encoded.

### Install using the UI installer 

Run the installer on your server with root or Administrator privileges. If you are not logged in as root or Administrator, you might be prompted to reauthenticate to your system when you start the UI Installer.

1. Open the downloaded installer file.
1. If prompted, enter the root or Administrator user name and password for the system.
1. Open the wizard to show the Welcome page. Click **Next**.
1. Accept the license agreement and click **Next**.
1. Browse to select a location for the collector or accept the default and click **Next** to install the Collector files on your machine.
1. The Installer displays the summary of the default settings. If you want to change any of these, click [Advanced UI Installer Settings](collector-installation-reference/advanced-ui-installer-settings.md) and follow the instructions. Click **Next**.
1. Choose an authentication method.

   * Access Key: If you have a Sumo Logic access ID and key, click **Next**, enter the access ID and key, and click **Next**.
   * Installation Token: The Setup Wizard has not yet been updated to provide an option for Installation Tokens. You can provide the Installation Token using the Setup Wizard Token option. Enter the ****Token String**** you want to use to register the Collector in the input box for a Setup Wizard one-time token.

1. Click **Finish** to complete the setup.
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection** and verify that you can see the Collector. Look for the name that is listed as Collector Name in the confirmation step of this procedure (the name can be customized under **Advanced Settings**). If a Collector with that name already exists, a suffix is appended to uniquely identify it. If you don’t see the collector, check the [Error Codes](collector-installation-reference/collector-installation-error-messages.md) list to help troubleshoot.

### Install using the command line installer

1. Add execution permissions to the downloaded Collector file (.sh):

   ```bash
   chmod +x SumoCollector.sh
   ```

1. Run the script with the parameters that you want to configure. See [Parameters for the Command Line Installer](collector-installation-reference/parameters-command-line-installer.md) for a description of the parameters.  By default the Collector will be installed in either `/opt/SumoCollector` or `/usr/local/SumoCollector`.

**Examples** 

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

### Install using the RPM or Debian package

You can use the RPM or Debian package to install a Collector on a Linux
64-bit system.

1. Install the Collector using the downloaded installation package.   For the RPM package, use the command:

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

1. Configure the Collector `user.properties` file in the `/opt/SumoCollector/config/` directory. The Collector uses the settings defined in `user.properties` to register and start. See [user.properties](collector-installation-reference/user-properties.md) for a full list of all the supported parameters.

   To use an [access key](/docs/manage/security/access-keys.md), provide the `accessid` and `accesskey` parameters. For example:

   ```
   name = <collectorName>
   accessid = <accessId>
   accesskey = <accessKey>
   ```

   To use an installation token, provide the authentication parameters `token` and `url`. To use these two parameters you'll need to manually base64 decode the **Token String**. Once decoded you'll have a string with a token and a URL.

   For example, the following decoded **Token String**:

   `sumoxxxxxxxxxxxxxxxxxxxxxxxxxxxxhttps://collectors.sumologic.com`

   would be used as:

   ```
   name = <collectorName>
   url=https://collectors.sumologic.com
   token=SUMOXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

   :::note
   Starting with collector 19.170+, the installation directory is secured to users belonging to the `sumologic_collector` group. Modifying `user.properties` may require sudo privileges. For more information see [Enhanced File System Security for Installed Collectors](collector-installation-reference/enhanced-file-system-security-installed-collectors.md).
   :::

1. (Optional) Provide a JSON Source information.  You can pass all Source settings in a UTF-8 encoded JSON file. If you're using a JSON file, you must provide the file before starting the Collector. See [Using JSON to configure Sources](/docs/send-data/use-json-configure-sources). Alternatively, you can configure Sources at any time by using the Sumo web app. See [Sources](/docs/send-data/choose-collector-source).
1. (Optional) Set the run a user for the Collector if you want the Collector to run as a user other than root. See [run as for a Collector](collector-installation-reference/set-run-as-user-for-collector.md).
1. (Optional on Collector version 19.253-3+ in the Fed deployment) Enable FIPS 140-2 compliant Java Cryptography Extension (JCE) to encrypt your data to Sumo Logic's Fed deployment in US1 only. FIPS mode is not supported for any other deployment. If you are unsure whether you are on the Fed deployment, check our deployments. To enable, locate and run the script **configureFipsMode.sh** contained in Collector's installation directory under **/script**:      

   ```bash
   $ sh ./script/configureFipsMode.sh
   ```

1. Start the Collector using the following command.
   ```bash
   sudo service collector start
   ```

### Install using the binary package

1. Install the version of JRE you want to use from the following location. (The collector requires Java 8 or higher). The binary installation process does not include JRE installation. See the [downloads list](https://docs.aws.amazon.com/corretto/latest/corretto-8-ug/downloads-list.html).
1. Check the version of Java is 8 or higher:

   ```bash
   java -version
   ```

1. Untar the downloaded binary file inside your desired destination directory to create a subdirectory named **sumocollector**:

   ````bash
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

1. Configure the Collector `user.properties` file in the `/opt/SumoCollector/config/` directory. The Collector uses the settings defined in `user.properties` to register and start. See [user.properties](collector-installation-reference/user-properties.md) for a full list of all the supported parameters.

   To use an access key, provide the `accessid` and `accesskey` parameters. For example:

   ```
   name = <collectorName>
   accessid = <accessId>
   accesskey = <accessKey>
   wrapper.java.command = java
   ```

   To use an installation token, provide the authentication parameters `token` and `url`. To use these two parameters you'll need to manually base64 decode the **Token String**. Once decoded you'll have a string with a token and a URL.

   For example, the following decoded **Token String**:

   ```
   SUMOXXXXXXXXXXXXXXXXXXXXXXXXXXXXhttps://collectors.sumologic.com
   ```

   would be used as:

   ```
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

## Uninstall the collector

Uninstalling a collector requires the following two steps:

1. Uninstall the collector from the Linux system using any of these methods:

* [UI installer](#uninstall-using-the-ui-installer)
* [Command line installer](#uninstall-using-the-command-line-installer)
* [RPM/Debian package](#uninstall-using-the-rpm-or-debian-package)
* [Binary package](#uninstall-using-the-binary-package)

1. [Remove the collector from Sumo Logic](#remove-the-collector-from-the-web-app)

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

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
1. Find the collector you want to remove, and click **Delete**.
1. When the Confirm dialog displays, click **OK**.

A success message is displayed and the collector is removed from the list.
