---
id: binary-package-install-a-collector
title: Use the binary package to install a Collector on Windows or macOS
description: Use the binary package to install a Collector on MacOS or Windows only if you need to use a particular version of JRE.
---


Use the binary package to install a Collector on MacOS or Windows only if you need to use a particular version of JRE. See [Install a Collector on Linux](../linux.md).

:::note
This procedure is for Collector version 19.137 and later. If you have Collectors from earlier versions, you can update them using this procedure or one of the other installation options. See [Installed Collectors](/docs/send-data/installed-collectors).
:::

Before you begin:

* Install the version of JRE you want to use. The binary installation process does not include JRE installation. Download the JRE here: <https://docs.aws.amazon.com/corretto/latest/corretto-8-ug/downloads-list.htm> 
* Download the binary file from either of these locations:  

  * **Manage Collection > Collection > Collection > Add Collector > Installed Collector > Install a Binary Package**
  * Static download link: https://collectors.sumologic.com/rest/download/tar

## Prepare the binary file

1. Untar the downloaded binary file inside your desired destination directory to create **sumocollector** directory:

    ```bash
    tar -xvf SumoCollector_unix_XXX.tar.gz
    ``` 

1. Move the platform-specific wrapper file to the **sumocollector** directory:

    ```bash
    mv tanuki/<Platform>/wrapper wrapper
    ```

1. (MacOS only) Make the wrapper and collector files executable:

    ```bash
    chmod ug+x wrapper
    chmod ug+x collector
    ```

## (Optional) Configure sources

The Collector Management API allows you to pass all Source settings in a JSON file, including Source name, metadata tags, and pointer to the files you want to collect. For instructions, see [Using JSON to configure Sources](/docs/send-data/use-json-configure-sources).

Optionally, you can configure Source using Sumo Logic after the Collector has been installed.

## (Optional) Enable FIPS

This option is only supported in specific deployments, ask your Sumo account representative for details.

On Collector version 19.253-3+ you can enable FIPS 140-2 compliant Java Cryptography Extension (JCE) to encrypt your data. Once enabled, the Collector version cannot be downgraded below version 19.253-1.

To enable, locate and run the script **configureFipsMode.sh** contained in Collector's installation directory under **/script**:  

```bash
$ sh ./script/configureFipsMode.sh
```

## Create the user.properties file

The Collector uses the settings defined in **user.properties** to register and start up. Create the **user.properties** file under **config** directory and add the settings you want to specify for the installation.

This example **user.properties** configures basic settings for registration and start-up using access ID and key for authentication.

```
name = My Collector
accessid = <accessId>
accesskey = <accessKey>
wrapper.java.command = java
```

See [user.properties](user-properties.md) for a full list of all the parameters that you can add to the file.

## Start the Collector

Use either of the following commands to start the Collector.

* Mac:  

    ```bash
    sudo ./collector start
    ```

* Windows:  

    ```bash
    InstallCollector-NT.bat startCollectorService.bat
    ```

To verify that the Collector is installed, go to Sumo Logic > **Manage > Collection** and verify that you can see the Collector.
