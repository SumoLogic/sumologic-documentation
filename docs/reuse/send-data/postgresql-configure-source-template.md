In this step, you will configure the YAML required for PostgreSQL collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **Error Log Path**. Enter the path of the error log file for your PostgreSQL instance.
- **Endpoint**. The endpoint of the PostgreSQL server. This value should be host:port. Default endpoint is `localhost:5432`.
  :::note
  There should not be any http prefixed to this value. For example, `http://localhost:port`. 
  :::
- **UserName**. Enter the PostgreSQL username.
- **Password Environment Variable Name**. Enter the PostgreSQL password environment variable name.
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, Sumo Logic tags `_sourceCategory` with the value otel/postgresql user needs to provide the value for `db.cluster.name`.