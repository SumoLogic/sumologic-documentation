1. Copy the yaml file into your Chef cookbook files directory `files/<downloaded_yaml_file>`.`
2. Use a Chef file resource in a recipe to manage it.
    ```
    cookbook_file '/etc/otelcol-sumo/conf.d/<downloaded_yaml_file>' do
    	mode 0644
        notifies :restart, 'service[otelcol-sumo]', :delayed
    end
    ```
3. Use a Chef file resource in a recipe to manage it.
    ```
    cookbook_file '/etc/otelcol-sumo/env/<downloaded_env_file>' do
        mode 0600
        notifies :restart, 'service[otelcol-sumo]', :delayed
    end
    ```
4. [Add the recipe](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/examples/chef/sumologic-otel-collector/README.md) to your collector setup to start collecting. Every team typically has their established way of applying the Chef recipe. The resulting Chef recipe should look something like:
    ```
    cookbook_file '/etc/otelcol-sumo/conf.d/<downloaded_yaml_file>' do
        mode 0644
        notifies :restart, 'service[otelcol-sumo]', :delayed
    end

    cookbook_file '/etc/otelcol-sumo/env/<downloaded_env_file>' do
        mode 0600
        notifies :restart, 'service[otelcol-sumo]', :delayed
    end
    ```
