---
id: use-sudo-privileges
title: Use Sudo Privileges for Remote Files  (Beta)
description: Learn how to collect remote logfiles using sudo privileges.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Closed Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

The **Privilege Escalations** checkbox is used to collect root-owned data from the remote file source using sudo privileges.

To successfully collect the root-owned data from the remote file source, make sure the below conditions are met.
- Sudo should be passwordless on the remote machine where the logfile is present.
- SFTP server path and sudo path should be `/usr/libexec/openssh/sftp-server` and `/bin/sudo`.

To collect data from a remote host using sudo privileges, follow the instructions:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Add source/ Edit source** > **Remote file**.
1. In the **Credentials** section, click the **Privilege Escalations** checkbox.

<img src={useBaseUrl('img/send-data/privilege-escalation.png')} style={{border: '1px solid black'}} alt="privilege-escalation" width="600"/>
