In this step, you will configure the yaml required for Kafka collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **Server file log path**. Enter the path to the server log file for your Kafka instance.
- **Controller file log path**. Enter the path to the controller log file for your Kafka instance.
- **Endpoint**. The URL of the broker endpoint (default: `localhost:9092`).
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, Sumo Logic tags `_sourceCategory` with the value otel/kafka user needs to provide the value for `webengine.cluster.name`.