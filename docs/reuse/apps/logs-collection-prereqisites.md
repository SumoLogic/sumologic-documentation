For Linux systems with **ACL Support**, the otelcol install process should have created the ACL grants necessary for the otelcol system user to access default log locations. You can verify the active ACL grants using the `getfacl` command. Install the ACL in your Linux environment, if not installed.

The required ACL may not be supported for some rare cases, for example, Linux OS Distro, which is officially not supported by Sumo Logic. In this case, you can run the following command to explicitly grant the permissions.

```
sudo setfacl -R -m d:u:otelcol-sumo:r-x,d:g:otelcol-sumo:r-x,u:otelcol-sumo:r-x,g:otelcol-sumo:r-x <PATH_TO_LOG_FILE>
```

Run the above command for all the log files in the directory that need to be ingested, which are not residing in the default location.

If Linux **ACL Support** is not available, traditional Unix-styled user and group permission must be modified. It should be sufficient to add the otelcol system user to the specific group that has access to the log files.