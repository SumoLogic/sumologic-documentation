Use the binary package to install a Collector only if you need to use a particular version of JRE.

#### Before you begin

* Install the version of JRE you want to use. The binary installation process does not include JRE installation. Download the JRE here: https://docs.aws.amazon.com/corretto/latest/corretto-8-ug/downloads-list.htm
* Download the binary file from either of these locations:
  * Binary package
     1. <!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/). Kanso--> In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <!--Kanso <br/>[**New UI**](/docs/get-started/sumo-logic-ui-new/). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. Kanso-->
     1. Click **Add Collector > Installed Collector > Install a Binary Package**.
  * Static download link: https://collectors.sumologic.com/rest/download/tar

#### Prepare the binary file

1. Untar the downloaded binary file inside your desired destination directory to create **sumocollector** directory:
   ```bash
   tar -xvf SumoCollector_unix_XXX.tar.gz
   ``` 
1. Move the platform-specific wrapper file to the **sumocollector** directory:
    ```bash
    mv tanuki/<Platform>/wrapper wrapper
    ```
1. (macOS only) Make the wrapper and collector files executable:
    ```bash
    chmod ug+x wrapper
    chmod ug+x collector
    ```

#### Configure sources (optional)

The Collector Management API allows you to pass all Source settings in a JSON file, including Source name, metadata tags, and pointer to the files you want to collect. For instructions, see [Using JSON to configure Sources](/docs/send-data/use-json-configure-sources).

Optionally, you can configure Source using Sumo Logic after the Collector has been installed.

#### Enable FIPS (optional)

You can enable FIPS 140-2 compliant Java Cryptography Extension (JCE) to encrypt your data. Locate and run the script **configureFipsMode.sh** contained in Collector's installation directory under **/script**:  

```bash
$ sh ./script/configureFipsMode.sh
```

:::note
This option is only supported in specific deployments. Ask your Sumo Logic account representative for details.
:::

#### Create the user.properties file

The Collector uses the settings defined in your **user.properties** file to register and startup.

Create a **user.properties** file under your **/config** directory and add the settings you want to specify for the installation. This example configures basic settings for registration and startup using an access ID and access key for authentication.

```txt title="user.properties config"
name = My Collector
accessid = <accessId>
accesskey = <accessKey>
wrapper.java.command = java
```

See [user.properties](user-properties.md) for an exhaustive list of parameters that you can add to the file.

#### Start the Collector

Use either of the following commands to start the Collector.

* macOS:  
    ```bash
    sudo ./collector start
    ```
* Windows:  
    ```bash
    InstallCollector-NT.bat startCollectorService.bat
    ```

To verify that the Collector is installed, go to **Manage > Collection** and verify that you can see it.
