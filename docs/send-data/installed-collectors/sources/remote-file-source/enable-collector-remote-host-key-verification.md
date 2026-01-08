---
id: enable-collector-remote-host-key-verification
title: Enable Collector Remote Host Key Verification
---

The Sumo Logic Collector can optionally verify the RSA fingerprint for a remote server against a list of known hosts. When host verification is enabled, the Collector collects from a Remote File Source only if the remote host fingerprint is whitelisted in a **known_hosts** file.

## Generate a remote host key verification file

Remote host key verification uses the RSA algorithm to verify host keys. By default, SSH stores known host fingerprints in a **known_hosts** file located in **\~/.ssh/known_hosts**.

To obtain the RSA host key fingerprint, use SSH to access the remote server.

If the key fingerprint is not an RSA key fingerprint, use SSH to access the server again with the **HostKeyAlgorithms** configuration option, as follows.

```bash
ssh -oHostKeyAlgorithms=’ssh-rsa’ username@hostname
```

Example **known_hosts** file format:

```
192.168.1.2 ssh-rsa AAAAB3NzaC1...nXIDE=
195.145.6.2 ssh-rsa AAAAB3NzaC1...dlZDm=
192.35.212.357 ssh-rsa AAAAB3NzaC1...UffAaQ=
```

## Enable Remote Host Key Verification

1. Stop the Sumo Logic Collector service.
    * On Windows: `net stop sumo-collector`
    * On Linux: `sudo ./collector stop`
    
1. Add the following line to the **config/collector.properties** file in the Collector installation directory and save the file. Replace the placeholder `<pathto>` with the actual path to your known_hosts file.

    `ssh.host.verify.file = /<pathto>/known_hosts`

1. Start the Sumo Logic Collector service:

   * On Windows: `net start sumo-collector`
   * On Linux: `sudo ./collector start`

You can revert back to default configurations or disable the feature by removing the line you added from **collector.properties** and restarting the Collector service.
