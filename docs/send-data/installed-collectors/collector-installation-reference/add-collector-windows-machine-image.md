---
id: add-collector-windows-machine-image
title: Add a Collector to a Windows Machine Image
description: You can build a Sumo Logic Collector into a Windows machine image such as an Amazon AMI, a VMware image, or Azure virtual machine.
---



Use the information in this topic to build a Sumo Logic Collector into a Windows machine image such as an Amazon AMI, a VMware image, or Azure virtual machine.

Collectors normally register with Sumo Logic during the installation process, but users can pass the `‑VskipRegistration=true` flag to skip registration. This way, the collector is installed as a service that will start and register automatically when the image is launched.

## Initial collector installation

Download the appropriate collector from the **Manage Data > Collection > Collection** page or from the list below.

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
   * `-Vsumo.accessid\<access_i\>` to specify access id generated above  
   * `-Vsumo.accesskey\<access_ke\>` to specify access key generated above  
   * `-Vsources\<filepat\>` to specify the path to your source JSON file created above
   * (Optional) `-dir` to install into a non-standard installation directory. By default, Windows will install in **C:\\Program Files\\Sumo Logic Collector**.

    Example:

    ```bash
    SumoCollector_windows-x64_19_XXX-XX.exe -console -q -VskipRegistration=true -Vephemeral=true -Vsumo.accessid=<access_id> -Vsumo.accesskey=<access_key> -Vsources=C:\\sumo\\sources.json
    ```

    When you see the `Finishing installation...` message you can close the command prompt window. The installation is complete.

1. (For Windows hosts launched on Amazon EC2 instances) There can be a delay on Amazon EC2 instances before a Windows host name is provided. If you would like the collector to wait for the host name to be available, you can enable a delay during registration. To set the delay parameter, add the following to the **collector.properties** file, which is created during installation at **C:\\Program Files\\Sumo Logic Collector\\config\\collector.properties:**

    ```bash
    collector.registration.delay.ms = 30000
    ```

:::note
Do not start the Collector before building the image If you're using `-VskipRegistration=true`. Starting the Collector prematurely will register the Collector with Sumo Logic, causing ingestion issues when using baked AMI. If you did start the Collector and it registered you can remove the Collector's registration by navigating to the Collector's installation directory under `/config/creds/` and deleting all of its contents.
:::

## Build your image

Now you are ready to take the machine at its current state and generate an image. Follow the procedure for the specific image type.  Instances launched from the image will automatically be registered with the DNS name of the instance. The installed collector service will start and register automatically when the instance is launched.
