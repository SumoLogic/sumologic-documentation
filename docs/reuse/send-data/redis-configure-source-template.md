- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, sumo tags `_sourceCategory` with the value otel/redis.
- **File Path**. Provide the file which needs to be read by OpenTelemetry agent. You can provide path to multiple files by adding new entry to it.
- **DenyList**. Provide path expression describing the files to be excluded.
- **Endpoint**. (Default: `localhost:6379`.) The hostname and port of the Redis instance,
separated by a colon.
- **Username** (Optional). Enter the Redis username in case you are using a specific user for monitoring.
- **Password Environment Variable Name** (Required). Enter the Redis password environment variable name.