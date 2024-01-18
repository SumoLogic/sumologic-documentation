---
id: advanced-ui-installer-settings
title: Advanced UI Installer Settings
description: View the advanced settings for the UI installer.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

These options appear if you click **Advanced Settings** on the Confirmation dialog in the UI Installer. Click each tab to specify settings, and then click **Next** to return to the main UI installer flow.

| Tab | Settings | Description |
|:--|:--|:--|
| Properties | See [Properties](#properties) | Set the configuration parameters of the Collector. |
| URL | Default URL<br/>Override the default URL | URL used to register the Collector for the Data Collection API. By default, Sumo Logic will automatically detect the correct Data Collection API. |
| Proxy | See Proxy Settings | Proxy settings to connect. |
| Sources | Add Sources Later<br/>Add Sources from a JSON file. | If you want to add your Sources now, you'll need to provide a JSON file with your Source configurations.  |
| Run As | Root/Administration User<br/>Custom User | User account under which the Collector runs on this machine.<br/>For Windows, the user account must have "Log on as Service" privileges. Default is the Administrator/Root user. |

### Provide Full Control access for Custom User

Follow the below steps to provide **Full Control** privileges for the Custom User (Non Admin/System user) with existing collector.

1. Open the registry editor from the start menu.
1. Navigate to the below path and search for **sumo-collector** folder.
    `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\sumo-collector`
1. Right-click on the **sumo-collector** folder and select **Permissions** from the dropdown menu.<br/><img src={useBaseUrl('img/send-data/registry-editor.png')} alt="registry-editor" width="600" style={{border: '1px solid gray'}} />
1. In the **Permissions for sumo-collector** pop-up:
    1. Click **Add**.
    1. Select the **Full Control** **Allow** checkbox.
    1. Click on **Apply**.
    <br/><img src={useBaseUrl('img/send-data/permissions.png')} alt="permissions" style={{border: '1px solid gray'}} width="300" />

Follow the below steps to provide **Full Control** privileges for the Custom User (Non Admin/System user) with newly installed collector.

1. After the collector is installed, open the registry editor from the start menu.
1. Navigate to the below path and search for **sumo-collector** folder.
    `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\sumo-collector`
1. Right-click on the **sumo-collector** folder and select **Permissions** from the dropdown menu.<br/><img src={useBaseUrl('img/send-data/registry-editor.png')} alt="registry-editor" width="600" style={{border: '1px solid gray'}} />
1. In the **Permissions for sumo-collector** pop-up:
    1. Click **Add**.
    1. Select the **Full Control** **Allow** checkbox.
    1. Click on **Apply**.
    <br/><img src={useBaseUrl('img/send-data/permissions.png')} alt="permissions" style={{border: '1px solid gray'}} width="300" />
1. Restart the collector by using following commands.
    1. ```net stop sumo-collector```
    1. ```net start sumo-collector```

:::note
You can also configure the permissions by Microsoft Group Policy.
:::

## Properties

Configure these settings if you want to use a proxy to connect to the
Data Collection API.

| Parameter | Description |
|:--|:--|
| Collector Name | Name to identify the Collector in the Web UI. The Collector name must be unique. If you are installing a Collector that would have the same name as an existing Collector, the system automatically appends a 13-digit epoch timestamp to the Collector name. [Learn more.](force-collectors-name-clobber.md) |
| Host Name | Host name of the machine on which the Collector is running. The host name can be a maximum of 128 characters. |
| Category | [Source Category](/docs/send-data/best-practices) to use when a Source does not specify a category. |
| Description | Description for the Collector. |
| Time Zone | Time zone to use when it is not extracted from the timestamp. |
| CPU Target Percentage | You can choose to set a [CPU target](/docs/send-data/collection/set-collector-cpu-usage-target.md) to limit the amount of CPU processing a Collector uses. |
| Ephemeral | When true, the collector will be deleted after 12 hours of inactivity. For more information, see [Setting a Collector as Ephemeral](set-collector-as-ephemeral.md). |
| Clobber | When selected, if there is any existing Collector with the same name, that Collector will be deleted (clobbered). See Forcing a Collector's Name with Clobber for more information. |
| FIPS-compliant JCE | When selected, FIPS 140-2 compliant Java Cryptography Extension (JCE) will be enabled.<br/>This option is only supported in specific deployments, ask your Sumo account representative for details. |

## Proxy Settings

Configure these settings if you want to use a proxy.

| Setting | Description |
|:--|:--|
| Proxy Host | Host name of the proxy server. |
| Proxy Port | Port used by the proxy server. |
| Authentication Type | If authentication is required, we support two different types:<br/>Basic Authentication (Username, Password)<br/>NTLM domain used to log into the proxy server. Required only for NTLM authentication. |
| Proxy User | (Optional) User name to log into proxy server. Required for basic and NTLM authentication.
| Proxy Password | (Optional) Password to log into proxy server. Required for basic and NTLM authentication. |
| NTLM Domain | (Optional) NTLM Authentication (Username, Password, NTLM Domain) |
