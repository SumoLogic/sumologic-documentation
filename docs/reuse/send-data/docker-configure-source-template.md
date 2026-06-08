In this step, you will configure the YAML required for Docker Collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **Docker Event log location**. Enter the path of the JSON file generated through the command in the prerequisite section.
- **Endpoint**. Address to reach the desired Docker daemon (default: `unix:///var/run/docker.sock`).
- **Excluded Image List**. A list of strings, [regexes](https://golang.org/pkg/regexp/), or [globs](https://github.com/gobwas/glob) whose referent container image names will not be among the queried containers for scrapping metrics. Learn more about [*excluded_images*](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/dockerstatsreceiver/README.md#configuration).
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, Sumo Logic tags `_sourceCategory` with the value otel/docker.