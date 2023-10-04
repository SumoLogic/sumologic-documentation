1. Place the file into your Puppet module files directory `modules/install_otel_collector/files/<downloaded_yaml>`.
2. Use a Puppet file resource to manage it.
    ```
    file { '/etc/otelcol-sumo/conf.d/<downloaded_yaml_file>':
        ensure => present,
        source => 'puppet:///modules/install_otel_collector/<downloaded_yaml_file>',
        mode => '0644',
        notify => Service[otelcol-sumo],
      }
    ```
3. [Apply the Puppet manifest](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/examples/puppet/README.md). Every team typically has their established way of applying the Puppet manifest. The resulting Puppet manifest should look something like:
    ```
    node 'default' {
        class { 'install_otel_collector'
          installation_token => '<YOUR_TOKEN>',
          collector_tags => { <YOUR_TAGS> },
        }

        service { 'otelcol-sumo':
          provider => 'systemd',
          ensure => running,
          enable => true,
          require => Class['install_otel_collector'],
        }

        file { '/etc/otelcol-sumo/conf.d/<downloaded_yaml_file>':
          ensure => present,
          source => 'puppet:///modules/install_otel_collector/<downloaded_yaml_file>',
          mode => '0644',
          notify => Service[otelcol-sumo],
        }
      }
    ```
