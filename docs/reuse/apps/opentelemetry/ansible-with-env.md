1. Place the file into your Ansible playbook files directory.
2. Run the Ansible playbook using:
    ```
    ansible-playbook -i inventory install_sumologic_otel_collector.yaml       
    -e '{"installation_token": "<YOUR_TOKEN>", "collector_tags": {<YOUR_TAGS>}, "src_config_path": "files/conf.d", "src_env_path": "files/env"}'
    ```
