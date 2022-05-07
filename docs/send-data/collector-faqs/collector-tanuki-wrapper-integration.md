---
id: collector-tanuki-wrapper-integration
---

# Windows: 

Error messages on Windows: "This Collector does not seem to have tanuki wrapper integration enabled."

## Question:

When attempting to upgrade a Windows Collector from the UI, the upgrade fails and the following error is reported in the tool tip of the failed Collector:

`"This Collector does not seem to have tanuki wrapper integration enabled."`

## Answer:

This is a known issue regarding upgrading a Windows collector from versions 19.60-x to the latest released version. The cause is a missing wrapper.dll file, which is required during a pre-check test of the Collector during upgrade. To correct this issue and allow the upgrade to succeed, perform the following steps on the affected host:

1. Download the [wrapper-dll.zip](/files/wrapper-dll.zip) file attached to this article, which includes the missing wrapper.dll files.
1. Stop the Sumo Logic Collector service running on the host.
1. Unzip the downloaded file and place the extracted .dll files into the following directory, where \<version\> is the "current version" listed in the upgrade UI in Sumo Logic:

    `C:\Program Files\Sumo Logic Collector\<version-specific>\bin\native\lib`

1. Restart the Sumo Logic Collector service.

When these steps are complete, in Sumo Logic, go to **Manage Data \> Collection \> Collection**, click **Upgrade Collectors**, and select the **Retry** option next to the failed Collector.
