In this step, you will configure the YAML required for MySQL collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **Error log path**. Location where the SQL Errors are logged. Please refer to your my.cnf file.
- **Slow Transaction log file path (optional)**. Location where the Slow SQL transactions are logged. Please refer to your my.cnf file.
- **Endpoint**. The URL of the MySQL endpoint (default: `localhost:3306`).
- **Username**. Enter the MySQL username.
- **Password Environment Variable Name**. Enter the MySQL password environment variable name.
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, Sumo Logic tags `_sourceCategory` with the value otel/mysql user needs to provide the value for `db.cluster.name`.