In this step, you will configure the YAML required for Local File Collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, sumo tags `_sourceCategory` with the value otel/rabbitmq.
- **File Path**. Provide the file which needs to be read by OpenTelemetry agent. You can provide path to multiple files by adding new entry to it.
- **DenyList**. Provide path expression describing the files to be excluded.
- **Endpoint**. (Default: `http://localhost:15672`.) The URL of the node to be monitored.
:::note
  The **Endpoint** value should have `http` at the beginning. For example, `http://localhost:port`. 
:::
- **Username**. Required. Enter the RabbitMQ username.
- **Password Environment Variable Name**. Required. Enter the RabbitMQ password environment variable name.