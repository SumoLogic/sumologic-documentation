---
id: add-collector-linux-machine-image
title: Add a Collector to a Linux Machine Image
description: You can build a Sumo Logic Collector into a Linux machine image such as an Amazon AMI or VMware image.
---

You can build a Sumo Logic Collector into a Linux machine image such as an Amazon AMI or VMware image.

Collectors will normally register with Sumo Logic during the
installation process, but users can pass the **‑VskipRegistration=true**
flag to skip registration. This way, the collector is installed as a
service that will start and register automatically when the image is
launched.

## Initial Collector installation

Download the appropriate collector from the Sumo Logic **Manage Data >
Collection > Collection** page, or from the list below.

1. Download your collector. Choose from the 32-bit or 64-bit static URLs for latest Linux collector builds, and make sure to choose your correct Sumo Logic pod. Find the list of URLs in [Download a Collector from a static URL](download-collector-from-static-url.md) in Help.

1. Change the permissions to allow the file to be executed.

    ```bash
    chmod 744 SumoCollector_linux_amd64_19_XXX-X.sh
    ```

1. To configure custom sources, create a source JSON file that lists all the sources you want the collector to scan and submit to the Sumo Logic service. These source configurations are only applied during the initial registration of the collector, any updates to the sources.json file will *not* be applied during a simple restart of the collector.

    The following sample JSON file includes local file source and syslog source configuration samples. For a full list of available source types and parameters, which can be used within the sources.json file, please review the [JSON help documentation](/docs/send-data/use-json-configure-sources).

    :::important
    JSON files need to be UTF-8 encoded.
    ```

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

   * [Create a New User account](/docs/manage/users-roles/users/create-edit-users) with Administrator permissions or a role with permissions to "Manage Collectors."  
   * Create an [installation token](/docs/manage/security/installation-tokens).
   * Or, create an [Access Key and Access Id](/docs/manage/security/access-keys) for this user, which will be used to register the collector.

1. As root, run the installer with the following arguments:

   * `-``q` starts the installer in quiet mode (no UI)  
   * `-VskipRegistration=true` to skip collector registration during installation  
   * `-Vephemeral=true` to set the Collector as ephemeral (will be removed after 12 hours offline)  
   * `-Vsumo.token_and_url=<installationToken>` to use an installation token, or:
   * `-Vsumo.accessid\<access_i\>` to specify access id generated above  
   * `-Vsumo.accesskey\<access_ke\>` to specify access key generated above  
   * `-Vsources\<filepat\>` to specify the path to your source JSON file created above  
   * (Optional) `-dir` to install into a non-standard installation directory. By default, Linux will install in **/opt/SumoCollector**.

    Example:

    ```bash
    ./SumoCollector_linux_amd64_19_XXX-X.sh -q -VskipRegistration=true -Vephemeral=true -Vsources=/path/to/sources.json -Vsumo.accessid=<access_id> -Vsumo.accesskey=<access_key>
    ```

    or

    ```bash
    ./SumoCollector_linux_amd64_19_XXX-X.sh -q -VskipRegistration=true -Vephemeral=true -Vsources=/path/to/sources.json -Vsumo.accessid=<access_id> -Vsumo.accesskey=<access_key> -dir "/usr/local/SumoCollector"
    ```

1. (Optional) Remove "name" property from generated user.properties file. By default, the collector installation will use the hostname of the machine the installer runs on, but when creating an image, this will cause all collectors created using this image to have the same name prefix, followed by a unique epoch timestamp.

    To ensure collectors created using this image will use the correct hostname, you can modify the user.properties file, located at **/opt/SumoCollector/config/user.properties** or **/usr/local/SumoCollector/user.properties. **Remove the line that specifies "**hostName = \<hostname\>**" and save the file.

:::note
Do not start the collector before building the image If you're using `-VskipRegistration=true`. Starting the collector prematurely will register the collector with Sumo Logic, causing ingestion issues when using baked AMI. If you did start the Collector and it registered you can remove the Collector's registration by navigating to the Collector's installation directory under `/config/creds/` and deleting all of its contents, and then add the Accesskey parameter in `user.properties` file to bake the AMI.
:::

## Build your image

Now you are ready to take the machine at its current state and generate an image. Follow AWS’s procedure to create an image. Instances launched from the image will automatically be registered with the DNS name of the instance. The installed collector service will start and register automatically when the instance is launched.
