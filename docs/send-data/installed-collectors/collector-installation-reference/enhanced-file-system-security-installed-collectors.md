---
id: enhanced-file-system-security-installed-collectors
title: Enhanced File System Security for Installed Collectors
description: Enhanced file system security protects the log cache and configuration files for installed Collectors.
---



The log cache and configuration files for an installed Collector can contain sensitive information. To address possible security issues associated with the cache and configuration files, Collector release 19.170 introduces an enhanced file system security mode for Collector installation.

The enhanced security mode protects the Collector installation folder at the file system level. When enabled, only the users in the **sumologic_collector** group have access to the Collector folder.

## New Collector installation

When you [install a Collector](/docs/send-data/installed-collectors) using the UI installer, quiet mode, or RPM/Debian package, the default behavior is as follows:

* The **sumologic_collector** group is created during installation, if it does not already exist.
* Only members of the **sumologic_collector** group can access the Collector folder. All members of this group have full permissions to the folder.  
* The following users are automatically added to the **sumologic_collector** group.  

  * Admin users (including root)
  * The user who launched the UI installer  
  * The Run As user, if provided

If you install the Collector using the binary package, you must explicitly enable enhanced file system security as described in the following section.

To disable enhanced file system security during new Collector installation, use the command line argument:

```
-Vcollector.secureFiles=false
```

### Enable or disable enhanced file system security

You can manually enable enhanced file system security for more secure installation or disable it for greater compatibility.  For Collector upgrades, you must change the mode manually. 

Use the following commands for Linux and MacOS:  

* `script/secureFiles.sh [homeDir] [runAs]` - switch to enhanced security mode
* `script/unsecureFiles.sh [homeDir] [runAs]` - switch to old mode

Use the following commands for Windows:  

* `script/secureFiles.cmd [homeDir] [runAs]` - switch to enhanced security mode  
* `script/unsecureFiles.cmd [homeDir] [runAs]` - switch to old mode

The following optional parameters are supported.

| Parameter | Usage | Description |
|:--|:--|:--|
| homeDir | `secureFiles`<br/>`unsecureFiles` | Root directory of Collector installation (if not specified, will use parent folder of this script located) |
| runAs | `secureFiles` | Name of the account that launched the Collector. If not specified, use current user, or root if running `sudo` |

### Solve problems with collector installation directory ownership

In some environments, for example (1) when the collector is being installed by a configuration manager process not descended from a login shell or (2) inside Docker containers, the `secureFiles.sh` script fails because `$USER` is not set. In this case, the collector’s installation directory will be owned by `root:root` instead of `root:sumologic_collector`.

To prevent this problem, the controlling process should set `$USER` to the current user or root.
