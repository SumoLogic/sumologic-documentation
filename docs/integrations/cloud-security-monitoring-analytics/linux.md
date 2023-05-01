---
id: linux
title: Linux Cloud Security Monitoring and Analytics
sidebar_label: Linux
description: Introduction to Linux Cloud Security Monitoring and Analytics.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/SecMon_Linux.png')} alt="Thumbnail icon" width="100"/>

The Cloud Security monitoring and Analytics app for Linux ingests any distribution of linux data to gain a better understanding of your production environments, and surface relevant insights by tuning out-of-the-box content to align with your security team’s focus. Consolidate analytics across various instances by wildcarding on data sources and gain full visibility into your Linux data for both monitoring and analytics use cases.

Follow the steps in this topic to install or uninstall a collector on Linux. See Installed Collectors for information on other OSs.


## System Requirements

* Linux, major distributions 64-bit, or any generic Unix capable of running Java 1.8
* Single core, 512MB RAM
* 8GB disk space
* Package installers require TLS 1.2 or higher.


## Collecting Data for the Linux Integration

### Download the Collector

Download the collector in either of the following ways:

* In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. Click **Add Collector**, click **Installed Collector**, and then click the link for the collector to begin the download.<br/>
-or-
* Open a browser and enter the static URL for your pod. See Download a Collector from a Static URL for a list of URLs for your deployment pod. The download begins immediately.


### Install the Collector on Linux

Choose one of these methods to install the Collector:

<details><summary>Install Using the UI Installer</summary>

Run the installer on your server with root or Administrator privileges. If you are not logged in as root or Administrator, you might be prompted to reauthenticate to your system when you start the UI Installer.

1. Open the downloaded installer file.
2. If prompted, enter the root or Administrator user name and password for the system.
3. Open the wizard to show the Welcome page. Click **Next**.
4. Accept the license agreement and click **Next**.
5. Browse to select a location for the collector or accept the default and click **Next** to install the Collector files on your machine.
6. The Installer displays the summary of the default settings. If you want to change any of these, click Advanced UI Installer Settings and follow the instructions. Click **Next**.
7. Choose an authentication method.
   * Access Key: If you have a Sumo Logic access ID and key, click **Next**, enter the access ID and key, and click **Next**.
   * Installation Token: The [Setup Wizard](/docs/send-data/setup-wizard) has not yet been updated to provide an option for Installation Tokens. You can provide the Installation Token using the Setup Wizard Token option. Enter the **Token String** you want to use to register the Collector in the input box for a Setup Wizard one-time token.
   * Setup Wizard Token: If the Setup Wizard has provided you with a token for the UI Installer, click **Next**, enter the token, and click **Next**. The Setup Wizard Token is a one-time use token, available for one hour after it is generated, then it expires. This token authenticates the user. It is designed to be used for only one Collector. The token cannot be used with the API, and it cannot be disabled.
8. Click **Finish** to complete the setup.
9. In Sumo Logic select** Manage Data > Collection > Collection** and verify that you can see the Collector. Look for the name that is listed as Collector Name in the confirmation step of this procedure (the name can be customized under **Advanced Settings**). If a Collector with that name already exists, a suffix is appended to uniquely identify it. If you don’t see the collector, check the Error Codes list to help troubleshoot.

</details>

<details><summary>Install Using the Command-Line Installer</summary>

1. Add execution permissions to the downloaded Collector file (.sh):
 ```bash
 chmod +x SumoCollector.sh
 ```
2. Run the script with the parameters that you want to configure. See Parameters for the Command Line Installer for a description of the parameters. By default, the Collector will be installed in either /opt/SumoCollector or /usr/local/SumoCollector.

**Examples**

```bash title="Using an Installation Token"
sudo ./SumoCollector.sh -q -Vsumo.token_and_url=<installationToken> -Vsources=<absolute_filepath>
```

```bash title="Using access ID and access key"
sudo ./SumoCollector.sh -q -Vsumo.accessid=<accessId> -Vsumo.accesskey=<accessKey> -Vsources=<absolute_filepath>
```

```bash title="Adding proxy settings"
sudo ./SumoCollector.sh -q -Vsumo.accessid=<accessId> -Vsumo.accesskey=<accessKey> -Vsources=<absolute_filepath> -Vproxy.host=<proxyHost> -Vproxy.port=<proxyPort>
```

```bash title="Including syncSources and a customized Collector name"
sudo ./SumoCollector.sh -q -Vsumo.accessid=<accessId> -Vsumo.accesskey=<accessKey> -VsyncSources=<absolute_filepath> -Vcollector.name=<name>
```

</details>

<details><summary>Install Using the RPM or Debian Package</summary>

You can use the RPM or Debian package to install a Collector on a Linux 64-bit system.

1. Install the Collector using the downloaded installation package.
   * For the RPM package, use the command:
    ```bash
    sudo rpm -i SumoCollector-19.XXX-XX.x86_64.rpm
    ```
   * For the Debian package, use the command:
    ```bash
    sudo dpkg -i SumoCollector-19.XXX-XX.x86_64.deb
    ```

   The RPM and Debian packages install the collector in the /opt/SumoCollector directory.  By default, the Collector is installed as a system service, but not yet started.
2. Configure the Collector user.properties file in the /opt/SumoCollector/config/ directory. The Collector uses the settings defined in user.properties to register and start. See user.properties for a full list of all the supported parameters.
   * To use an access key, provide the accessid and accesskey parameters. For example:
    ```bash
    name = <collectorName>
    accessid = <accessId>
    accesskey = <accessKey>
    ```
   * To use an installation token, provide the authentication parameters token and url. To use these two parameters you'll need to manually base64 decode the **Token String**. Once decoded, you'll have a string with a token and a URL. For example, the following decoded **Token String**: `sumoxxxxxxxxxxxxxxxxxxxxxxxxxxxxhttps://collectors.sumologic.com` would be used as:
    ```bash
    name = <collectorName>
    url=https://collectors.sumologic.com
    token=SUMOXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    ```

:::note
* Starting with collector 19.170+, the installation directory is secured to users belonging to the `sumologic_collector` group.
* Modifying user.properties may require sudo privileges. For more information, see Enhanced File System Security for Installed Collectors.
:::

3. (Optional) Provide a JSON Source information. You can pass all Source settings in a UTF-8 encoded JSON file. If you're using a JSON file, you must provide the file before starting the Collector. See Using JSON to configure Sources. Alternatively, you can configure Sources at any time by using the Sumo web app. See Sources.
4. (Optional) Set the run a user for the Collector if you want the Collector to run as a user other than root. See run as for a Collector.
5. (Optional on Collector version 19.253-3+ in the Fed deployment) Enable FIPS 140-2 compliant Java Cryptography Extension (JCE) to encrypt your data to Sumo Logic's Fed deployment in US1 only. FIPS mode is not supported for any other deployment. If you are unsure whether you are on the Fed deployment, check our deployments. To enable, locate and run the script `configureFipsMode.sh` contained in Collector's installation directory under `/script`:
 ```bash
 $ sh ./script/configureFipsMode.sh
 ```
6. Start the Collector using the following command.
 ```bash
 sudo service collector start
 ```

</details>


<details><summary>Install using the Binary Package</summary>

1. Install the version of JRE you want to use from the following location. (The collector requires Java 8 or higher). The binary installation process does not include JRE installation.
[https://docs.aws.amazon.com/corretto/latest/corretto-8-ug/downloads-list.html](https://docs.aws.amazon.com/corretto/latest/corretto-8-ug/downloads-list.html)
2. Check the version of Java is 8 or higher:
 ```bash
 java -version
 ```
3. Untar the downloaded binary file inside your desired destination directory to create a subdirectory named `sumocollector`:
 ```bash
 tar -xvf SumoCollector_unix_XXX.tar.gz
 ```
4. Copy the platform-specific wrapper file to the **sumocollector** directory:
 ```bash
 cp tanuki/wrapper-<platform>
 ```
5. Make the **wrapper**, **collector**, and **script** directory files executable:
 ```bash
 chmod ug+x wrapper-<platform>
 chmod ug+x collector
 chmod ug+x script/*
 ```
6. Configure the Collector  user.properties file in the /opt/SumoCollector/config/ directory. The Collector uses the settings defined in user.properties to register and start. See user.properties for a full list of all the supported parameters. To use an access key, provide the accessid and accesskey parameters. For example:
 ```bash
 name = <collectorName>
 accessid = <accessId>
 accesskey = <accessKey>
 wrapper.java.command = java
 ```
To use an installation token, provide the authentication parameters token and url. To use these two parameters you'll need to manually base64 decode the **Token String**. Once decoded you'll have a string with a token and a URL.
For example, the following decoded **Token String**:
`SUMOXXXXXXXXXXXXXXXXXXXXXXXXXXXXhttps://collectors.sumologic.com`
would be used as:
 ```bash
 name = <collectorName>
 url=https://collectors.sumologic.com
 token=SUMOXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 wrapper.java.command = java
 ```
7. Set access control for files under the **sumocollector** directory:
```bash
sudo script/secureFiles.sh
```
8. (Optional) Provide JSON Source information.
You can pass all Source settings in a UTF-8 encoded JSON file. If you're using a JSON file, you must provide the file before starting the Collector. See Using JSON to configure Sources.
Alternatively, you can configure sources at any time by using the Sumo web app. See Sources.
9. (Optional) Set the run as user for the Collector if you want the Collector to run as a user other than root. See run as for a Collector.
10. (Optional on Collector version 19.253-3+) Enable FIPS 140-2 compliant Java Cryptography Extension (JCE) to encrypt your data. Once enabled, the Collector version cannot be downgraded below version 19.253-3. To enable, locate and run the script **configureFipsMode.sh** contained in Collector's installation directory under **/script**:
 ```bash
 $ sh ./script/configureFipsMode.sh
 ```
11. Install the Collector as a service.
Use the following command to install the Collector as a service that is started when the machine starts.
 ```bash
 sudo ./collector install
 ```
12. Start the Collector service.
Use the following command to start the collector service.
 ```bash
 sudo ./collector start
 ```
13. To verify that the collector is installed, go to **Manage Data** > **Collection** > **Collection** in the Sumo web app and verify that you can see the collector.

</details>

You can build a Collector into a Linux machine image such as an Amazon AMI or VMware image.

After installing Collectors, you can configure Sources from Sumo Logic or by providing the Source settings in a JSON file. If you're using a UTF-8 encoded JSON file, you must provide the file before starting the collector. The JSON file needs to be UTF-8 encoded.


### Uninstalling the Collector

Uninstalling a collector requires the following two steps:

1. **Uninstall the collector from the Linux system using any of these methods**:

<details><summary>Uninstall using the UI Installer</summary>

1. On your system, in the Applications folder, find the Sumo Logic Collector folder.
2. Double-click the file Sumo Logic Collector Uninstaller.
3. If prompted, select your language and click **OK**.
4. Enter the user name and password for the system.
5. When the Sumo Logic Collector Uninstall wizard is displayed, click **Next** to remove the collector.
6. When the success message is displayed, click **Finish**.

</details>

<details><summary>Uninstall using the Command Line</summary>

1. In a terminal prompt, change the directory to the collector installation directory. By default, the collector will be installed in either /opt/SumoCollector or /usr/local/SumoCollector.
```bash
cd /usr/local/SumoCollector
```
1. Run the uninstall binary with the -q option. The -q option executes the command without presenting additional prompts.
```bash
sudo ./uninstall -q
```

</details>

<details><summary>Uninstall using the RPM/Debian packages</summary>

For the RPM package, use the command:
```bash
sudo rpm -e SumoCollector
```
For the Debian package, use the command:
```bash
sudo dpkg -r SumoCollector
```

</details>

<details><summary>Uninstall using the binary package</summary>

1. Uninstall the collector service.
```bash
sudo <Collector Installation Directory>/collector remove
```
2. Remove the collector installation directory.
```bash
sudo rm -rf <Collector Installation Directory>
```
3. (Optional) On some distributions, for instance, Ubuntu, you may need to re-synchronize the daemon setting before installing the collector again.
```bash
sudo systemctl daemon-reload
```

</details>


2. **Remove the collector from Sumo Logic**:
   1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
   2. Find the collector you want to remove, and click **Delete**.
   3. When the Confirm dialog displays, click **OK**.

A success message is displayed and the collector is removed from the list.


## Installing the Linux App

Now that you have set up collection, install the Sumo Logic App for PCI Compliance for Linux to use the preconfigured searches and Dashboards that provide insight into your data.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app.
2. Select the version of the service you're using and click **Add to Library**. Version selection is applicable only to a few apps currently. For more information, see the Install the Apps from the Library.
3. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing Linux Security Monitoring Dashboards

### Linux - Security Monitoring - Overview

**Dashboard description:** This dashboard provides an overview of security statistics relevant for Linux systems. It presents information about successful and failed logins, root login successes and failures, user accounts created and deleted, sudo attempts and total Services.

**Use case:** Use this dashboard to monitor administrative actions (create, delete users) performed by end users, ensure proper services are running on all systems, detect attempts to change the system time, and verify that critical systems are up and running.You can also monitor excessive failed login attempts to detect attempts to break into the system.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Linux-Security-Monitoring-Overview.png')} alt="Linux Security dashboards" />


### Linux - Security Analytics - Login Activity

**Dashboard description: **This dashboard tracks login activity. It provides information about failed and successful user logins, and failed and successful root logins.

**Use case:** Use this dashboard to monitor access to the linux computing environment. You can monitor failed and successful user logins.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Linux-Security-Analytics-Login-Activity.png')} alt="Linux Security dashboards" />


### Linux - Security Analytics - Privileged Activity

**Dashboard description: **This dashboard provides information about total sudo attempts, failed sudo attempts, the top 10 users and hosts that have issued sudo attempts, recent sudo attempts, and sudo attempts over time.

**Use case:** Use this dashboard to monitor successful and failed access attempts to systems, especially with administrative privileges. It also helps monitor actions performed by users with administrative privileges.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Linux-Security-Analytics-Privileged-Activity.png')} alt="Linux Security dashboards" />


### Linux - Security Monitoring - User, Service, and System Monitoring

**Dashboard description: **This dashboard provides information about total sudo attempts, failed sudo attempts, the top 10 users and hosts that have issued sudo attempts, recent sudo attempts, and sudo attempts over time.

**Use case:** Use this dashboard to monitor accounts created and deleted. It also helps monitor service usage and other system activity.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Linux-Security-Analytics-User-Service-and-System-Monitoring.png')} alt="Linux Security dashboards" />
