In this step, you will configure the YAML required for Nginx collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **Endpoint**. The URL of the httpd status endpoint (default: `http://localhost:80/status`).
- **Path to Nginx access Log file**. Enter the path to the Access log file for your Nginx instance.
- **Path to Nginx error Log file**. Enter the path to the error log file for your Nginx instance.
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default sumo tags `_sourceCategory` with the value otel/nginx user needs to provide the value for `webengine.cluster.name`.