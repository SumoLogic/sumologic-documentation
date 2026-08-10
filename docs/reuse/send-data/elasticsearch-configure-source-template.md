In this step, you will configure the YAML required for Elasticsearch collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **Log Filepath**. Location where the Elasticsearch logs are logged. Please refer to your elasticsearch.conf file.
- **Endpoint**. Enter the url of the server you need to monitor. (default: `localhost:9200`).
- **Username**. Enter the Elasticsearch username.
- **Password Environment Variable Name**. Enter the Elasticsearch password environment variable name.
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, Sumo Logic tags `_sourceCategory` with the value otel/elasticsearch user needs to provide the value for `db.cluster.name`.