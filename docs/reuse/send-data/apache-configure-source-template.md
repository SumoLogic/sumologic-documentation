In this step, you will configure the yaml required for Apache Collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **Endpoint**. The URL of the httpd status endpoint (default: `http://localhost:80/server-status?auto`).
- **Access File log Path**. Enter the path to the Access log file for your Apache instance.
- **Error file log path**. Enter the path to the error log file for your Apache instance.
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, sumo tags `_sourceCategory` with the value otel/apache user needs to provide the value for `webengine.cluster.name`.