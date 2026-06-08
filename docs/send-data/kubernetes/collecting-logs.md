---
id: collecting-logs
title: Sumo Logic Kubernetes Helm Chart Log Collection
sidebar_label: Collecting Logs
description: Learn about collecting logs using the Sumo Logic Kubernetes Helm Chart.
---

By default, log collection is enabled. This includes both container logs and systemd logs.

Container logs are read and parsed directly from the Node filesystem, where the kubelet writes them under the `/var/log/pods` directory.

Systemd logs are read and parsed directly from the Node journal.

They are then sent to a metadata enrichment service which takes care of adding Kubernetes metadata, custom processing, filtering, and finally sending the data to Sumo Logic. Both the collection and the metadata enrichment are done by the OpenTelemetry Collector.

See the [Solution Overview diagram](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/docs#log-collection) for a visualization.

## Configuration

High level configuration for logs is located in [values.yaml][values] under the `sumologic.logs` key.

Configuration specific to the log collector DaemonSet can be found under the `otellogs` key.

Finally, configuration specific to the metadata enrichment StatefulSet can be found under the `metadata.logs` key.

## Container Logs

Configuration specific to container logs is located under the `sumologic.logs.container` key.

### Multiline log parsing

By default, each line output by an application is treated as a separate log record. However, some applications can actually output logs split into multiple lines - this is often the case for stack traces, for example. If we want such a multiline log to appear in Sumo Logic as a single record, we need to tell the collector how to distinguish between lines which start a new record and ones which continue an existing record.

Multiline log parsing can be configured using the `sumologic.logs.multiline` section in `user-values.yaml`.

```yaml
sumologic:
  logs:
    multiline:
      enabled: true
      first_line_regex: "^\\[?\\d{4}-\\d{1,2}-\\d{1,2}.\\d{2}:\\d{2}:\\d{2}"
```

where `first_line_regex` is a regular expression used to detect the first line of a multiline log.

This feature is enabled by default and the default regex will catch logs starting with a ISO8601 datetime. For example:

```text
2007-03-01T13:00:00Z this is the first line of a log record
  this is the second line
  and this is the third line
2007-03-01T13:00:01Z this is a new log record
```

This feature can rarely cause problems by merging together lines which are supposed to be separate. In that case, feel free to disable it.

#### Conditional multiline log parsing

Multiline log parsing can be also configured per specific conditions:

```yaml
sumologic:
  logs:
    multiline:
      enabled: true
      first_line_regex: "^\\[?\\d{4}-\\d{1,2}-\\d{1,2}.\\d{2}:\\d{2}:\\d{2}"
      additional:
        - first_line_regex: <regex 1>
          condition: <condition 1>
        - first_line_regex: <regex 2>
          condition: <condition 2>
        # ...
```

In that case `first_line_regex` of **first** matching condition is applied, and `sumologic.logs.multiline.first_line_regex` is used as expression for logs which do not match any of the condition.

Conditions have to be valid [OpenTelemetry Expression](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.90.1/pkg/stanza/docs/types/expression.md).

The following variables may be used in the condition:

- `body`. body of a log
- `attributes["k8s.namespace.name"]`
- `attributes["k8s.pod.name"]`
- `attributes["k8s.container.name"]`
- `attributes["log.file.path"]`. log path on the node (`/var/log/pods/...`)
- `attributes["stream"]`. may be either `stdout` or `stderr`

Consider the following example:

```yaml
sumologic:
  logs:
    multiline:
      enabled: true
      first_line_regex: "^\\[?\\d{4}-\\d{1,2}-\\d{1,2}.\\d{2}:\\d{2}:\\d{2}"
      additional:
        - first_line_regex: "^@@@@ First Line"
          condition: 'attributes["k8s.namespace.name"] == "foo"'
        - first_line_regex: "^--- First Line"
          condition: 'attributes["k8s.container.name"] matches "^bar-.*'
        - first_line_regex: "^Error"
          condition: 'attributes["stream"] == "stderr" and attributes["k8s.namespace.name"] != "lorem"'
```

It is going to:

- Use `^@@@@ First Line` expression for all logs from `foo` namespace
- Use `^--- First Line` expression for all remaingin logs from containers, which names start with `bar-`
- Use `^Error` expression for all remaining `stderr` logs which are not in `lorem` namespace
- Use `^\\[?\\d{4}-\\d{1,2}-\\d{1,2}.\\d{2}:\\d{2}:\\d{2}` expression for all remaining logs

:::note
Logs which match multiple conditions are processed only by the first match.
:::

### Container Log format

There are three log formats available: `fields`, `json_merge` and `text`. `fields` is the default.

You can change it by setting:

```yaml
sumologic:
  logs:
    container:
      format: fields
```

We're going to demonstrate the differences between them on two example log lines:

* A plain text log
   ```text
   2007-03-01T13:00:00Z I am a log line
   ```
* A JSON log
   ```json
   { "log_property": "value", "text": "I am a json log" }
   ```

#### `json` log format

`json` log format is an alias for the [`fields` log format](#fields-log-format).

#### `fields` log format

Logs formatted as `fields` are wrapped in a JSON object with additional properties, with the log body residing under the `log` key.

For example, log line 1 will show up in Sumo Logic as:

```javascript
{
  log: "2007-03-01T13:00:00Z I am a log line",
  stream: "stdout",
  timestamp: 1673627100045
}
```

If the log line contains json, as log line 2 does, it will be displayed as a nested object inside the `log` key:

```javascript
{
  log: {
    log_property: "value",
    text: "I am a json log"
  },
  stream: "stdout",
  timestamp: 1673627100045
}
```

#### `json_merge` log format

`json_merge` is identical to `fields` for non-JSON logs, but behaves differently for JSON logs. If the log is JSON, it gets merged into the top-level object.

Log line 1 will show up the same way as it did for `fields`:

```javascript
{
  log: "2007-03-01T13:00:00Z I am a log line",
  stream: "stdout",
  timestamp: 1673627100045
}
```

However, the attributes from log line 2 will show up at the top level:

```javascript
{
  log: {
    log_property: "value",
    text: "I am a json log"
  },
  stream: "stdout",
  timestamp: 1673627100045
  log_property: "value",
  text: "I am a json log"
}
```

#### `text` log format

The `text` log format sends the log line as-is without any additional wrappers.

Log line 1 will therefore show up as plain text:

```text
2007-03-01T13:00:00Z I am a log line
```

Whereas log line 2 will be displayed as JSON:

```javascript
{
  log_property: "value",
  text: "I am a json log"
}
```

If you want to send metadata along with an unstructured log record, you have to use resource level attributes, because record level attributes are going to be removed before sending log to Sumo Logic. See [Mapping OpenTelemetry concepts to Sumo Logic][mapping] for more details.

## Systemd Logs

Configuration specific to systemd logs is located under the `sumologic.logs.systemd` key. Most configuration options for systemd logs are shared with container logs, and are documented under [Modification and filtering](#modification-and-filtering).

### Selecting systemd units to collect logs from

You can control which systemd units to collect logs from by setting:

```yaml
sumologic:
  logs:
    systemd:
      units:
        - docker.service
```

The default is:

```yaml
- addon-config.service
- addon-run.service
- cfn-etcd-environment.service
- cfn-signal.service
- clean-ca-certificates.service
- containerd.service
- coreos-metadata.service
- coreos-setup-environment.service
- coreos-tmpfiles.service
- dbus.service
- docker.service
- efs.service
- etcd-member.service
- etcd.service
- etcd2.service
- etcd3.service
- etcdadm-check.service
- etcdadm-reconfigure.service
- etcdadm-save.service
- etcdadm-update-status.service
- flanneld.service
- format-etcd2-volume.service
- kube-node-taint-and-uncordon.service
- kubelet.service
- ldconfig.service
- locksmithd.service
- logrotate.service
- lvm2-monitor.service
- mdmon.service
- nfs-idmapd.service
- nfs-mountd.service
- nfs-server.service
- nfs-utils.service
- node-problem-detector.service
- ntp.service
- oem-cloudinit.service
- rkt-gc.service
- rkt-metadata.service
- rpc-idmapd.service
- rpc-mountd.service
- rpc-statd.service
- rpcbind.service
- set-aws-environment.service
- system-cloudinit.service
- systemd-timesyncd.service
- update-ca-certificates.service
- user-cloudinit.service
- var-lib-etcd2.service
```

## Kubelet Logs

Kubelet logs are a subset of systemd logs, but can be configured separately due to their particular significance for Kubernetes observability. Configuration specific to kubelet logs is located under the `sumologic.logs.kubelet` key. Most configuration options for kubelet logs are shared with container logs, and are documented under [Modification and filtering](#modification-and-filtering).

## Modification and filtering

These settings are identical for container, systemd and kubelet logs. The only difference is the top-level section name.

### Setting source name and other built-in metadata

It's possible to customize the built-in Sumo Logic metadata (like [source name][source_name] for example) for both container and systemd logs:

```yaml
sumologic:
 clusterName: my-k8s-cluster
 logs:
   container:
     enabled: true
     ## Set the _sourceHost metadata field in Sumo Logic.
     sourceHost: "%{node}"
     ## Set the _sourceName metadata field in Sumo Logic.
     sourceName: "%{namespace}.%{pod}.%{container}"
     ## Set the _sourceCategory metadata field in Sumo Logic.
     sourceCategory: "%{cluster}/%{namespace}/%{pod_name}"
     ## Set the prefix, for _sourceCategory metadata. Not able to use variables for prefix
     sourceCategoryPrefix: ""
     ## Used to replace - with another character.
     sourceCategoryReplaceDash: "-"
   systemd:
     enabled: true
     ## Set the _sourceName metadata field in Sumo Logic.
     sourceName: "k8s_systemd"
     ## Set the _sourceCategory metadata field in Sumo Logic.
     sourceCategory: "%{cluster}/systemd"
     ## Set the prefix, for _sourceCategory metadata.
     sourceCategoryPrefix: ""
     ## Used to replace - with another character.
     sourceCategoryReplaceDash: "-"
   kubelet:
     enabled: true
     ## Set the _sourceName metadata field in Sumo Logic.
     sourceName: "k8s_kubelet"
     ## Set the _sourceCategory metadata field in Sumo Logic.
     sourceCategory: "%{cluster}/kubelet"
     ## Set the prefix, for _sourceCategory metadata.
     sourceCategoryPrefix: ""
     ## Used to replace - with another character.
     sourceCategoryReplaceDash: "-"
```

As can be seen in the above example, these fields can contain templates of the form `%{field_name}`, where `field_name` is the name of a resource attribute. Available resource attributes include the values of `sumologic.logs.fields`, which by default are:

- `cluster`
- `container`
- `daemonset`
- `deployment`
- `host`
- `namespace`
- `node`
- `pod`
- `service`
- `statefulset`

in addition to the following:

- `_collector`
- `pod_labels_*` where `*` is the Pod label name

### Filtering

Please see [the doc about filtering data](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/docs/filtering.md).

### Modifying log records

To modify log records, use [OpenTelemetry processors][opentelemetry_processors]. Add them to
`sumologic.logs.container.(otelcol|systemd).extraProcessors`.

Here are some examples.

To modify log body, use the [Transform processor][transform_processor_docs]:

```yaml
sumologic:
  logs:
    container|systemd|kubelet:
      otelcol:
        extraProcessors:
          - transform/mask-card-numbers:
              log_statements:
                - context: log
                  statements:
                    - replace_pattern(body, "card=\\d+", "card=***")
```

To modify record attributes, use the [Attributes processor][attributes_processor_docs]:

```yaml
sumologic:
  logs:
    container|systemd|kubelet:
      otelcol:
        extraProcessors:
          - attributes/delete-record-attribute:
              actions:
                - action: delete
                  key: unwanted.attribute
          # To rename old.attribute to new.attribute, first create new.attribute and then delete old.attribute.
          - attributes/rename-old-to-new:
              - action: insert
                key: new.attribute
                from_attribute: old.attribute
              - action: delete
                key: old.attribute
```

To modify resource attributes, use the [Resource processor][resource_processor_docs]:

```yaml
sumologic:
  logs:
    container|systemd|kubelet:
      otelcol:
        extraProcessors:
          - resource/add-resource-attribute:
              attributes:
                - action: insert
                  key: environment
                  value: staging
          - resource/remove:
              attributes:
                - action: delete
                  key: redundant-attribute
```

#### Adding custom fields

To add a custom [field][sumo_fields] named `static-field` with value `hardcoded-value` to logs, use the following configuration:

```yaml
sumologic:
  logs:
    container|systemd|kubelet:
      otelcol:
        extraProcessors:
          - resource/add-static-field:
              attributes:
                - action: insert
                  key: static-field
                  value: hardcoded-value
```

To add a custom field named `k8s_app` with a value that comes from e.g. the pod label `app.kubernetes.io/name`, use the following configuration:

```yaml
sumologic:
  logs:
    container|systemd|kubelet:
      otelcol:
        extraProcessors:
          - resource/add-k8s_app-field:
              attributes:
                - action: insert
                  key: k8s_app
                  from_attribute: pod_labels_app.kubernetes.io/name
```

:::note
Make sure the field is [added in Sumo Logic][sumo_add_fields].
:::

## Persistence

By default, the metadata enrichment service provisions and uses a Kubernetes PersistentVolume as an on-disk queue that guarantees durability across Pod restarts and buffering in case of exporting problems.

This feature is enabled by default, but it only works if you have a correctly configured default `storageClass` in your cluster. Cloud providers will do this for you when provisioning the cluster. The only alternative is disabling persistence altogether.

Persistence can be customized via the `metadata.logs.persistence` section:

```yaml
metadata:
  persistence:
    enabled: true
    # storageClass: ""
    accessMode: ReadWriteOnce
    size: 10Gi
    ## Add custom labels to all otelcol statefulset PVC (logs and metrics)
    pvcLabels: {}
```

:::note
These settings affect persistence for metrics as well.
:::

## Advanced Configuration

This section covers more advanced ways of configuring logging. Knowledge of OpenTelemetry Collector configuration format and concepts will
be required.

### Direct configuration

There are two ways of directly configuring OpenTelemetry Collector for both log collection and metadata enrichment. These are both advanced features requiring a good understanding of this chart's architecture and OpenTelemetry Collector configuration.

The `metadata.logs.config.merge` and `otellogs.config.merge` keys can be used to provide configuration that will be merged with the Helm Chart's default configuration. It should be noted that this field is not subject to normal backwards compatibility guarantees, the default configuration can change even in minor versions while preserving the same end-to-end behavior. Use of this field is discouraged - ideally the necessary customizations should be able to be achieved without touching the otel configuration directly. Please open an issue if your use case requires the use of this field.

The `metadata.logs.config.override` and `otellogs.config.override` keys can be used to provide configuration that will be completely replace the default configuration. As above, care must be taken not to depend on implementation details that may change between minor releases of this Chart.

See [Sumologic OpenTelemetry Collector configuration][configuration] for more information.

### Disabling container logs

Container logs are collected by default. This can be disabled by setting:

```yaml
sumologic:
  logs:
    container:
      enabled: false
```

### Multiline unstructured logs with HTTP sources

By default, the Helm Chart sends data to Sumo using the OpenTelemetry Protocol (OTLP), and therefore uses the [OTLP Source][otlp_source]. However, if you've chosen to use a [plain HTTP Source][http_source] by setting `sumologic.logs.source_type` to `http`, be aware that this source does not support client-side multiline parsing for logs in `text` format. You'll need to do multiline detection in the source itself. This can be set up in the Helm Chart configuration the following way:

```yaml
sumologic:
  collector:
    sources:
      logs:
        default:
          properties:
            ## Disable automatic multiline detection on collector side
            use_autoline_matching: false
            ## Set the following multiline detection regexes on collector side:
            ## - \{".* - in order to match json lines
            ## - \[?\d{4}-\d{1,2}-\d{1,2}.\d{2}:\d{2}:\d{2}.*
            ## Note: `\` is translated to `\\` and `"` to `\"` as we pass to terraform script
            manual_prefix_regexp: (\\{\".*|\\[?\\d{4}-\\d{1,2}-\\d{1,2}.\\d{2}:\\d{2}:\\d{2}.*)
```

## Sending data to multiple targets

:::note
This feature is available from version [v4.8.0](https://github.com/SumoLogic/sumologic-kubernetes-collection/releases/tag/v4.8.0) of Kubernetes Helm Chart.
:::

It is possible to send logs to multiple locations. This section describes the following cases:

- Send logs simultaneously to Sumo Logic and other locations.
- Send all logs to Sumo Logic and part of it to other locations.
- Send logs selectively to multiple locations.

### Send logs simultaneously to Sumo Logic and other locations

In order to send data to Sumo Logic and other locations (for example another Sumo Logic organization), `sumologic.logs.otelcol.extraExporters` should be used.

With the following configuration, data will be sent to both default Sumo Logic organization and the production one:

```yaml
sumologic:
  logs:
    otelcol:
      extraExporters:
        ## define `sumologic/production` exporter
        sumologic/production:
          ## use environmental variable to set endpoint
          endpoint: ${PRODUCTION_ENDPOINT}
metadata:
  logs:
    statefulset:
      extraEnvVars:
        ## Set `PRODUCTION_ENDPOINT` env variable for `sumologic/production exporter` as `endpoint-production-logs` property of `sumologic-secrets` secret
        - name: PRODUCTION_ENDPOINT
          valueFrom:
            secretKeyRef:
              name: sumologic-secrets
              key: endpoint-production-logs
```

For the example above, the `sumologic-secrets` secret with the `endpoint-production-logs` key is required in the Sumo Logic installation namespace.

### Send all logs to Sumo Logic and a part of it to other locations

If you want to send only specific parts of logs to another location, you should use `sumologic.logs.otelcol.routing.table` along with `sumologic.logs.otelcol.extraExporters`.

In the following example, all logs are sent to default Sumo Logic organization, while only the logs from the `production` namespace are also sent to production Sumo Logic organization.

```yaml
sumologic:
  logs:
    otelcol:
      extraExporters:
        ## define `sumologic/production` exporter
        sumologic/production:
          ## use environmental variable to set endpoint
          endpoint: ${PRODUCTION_ENDPOINT}
      routing:
        table:
          ## send all logs from `production` namespace to `sumologic/production` exporter
          ## as `useDefaultExporters` is set to `true` (default), all logs will be sent to `sumologic` as well
          - exporter: sumologic/production
            statement: route() where resource.attributes["namespace"] == "production"
metadata:
  logs:
    statefulset:
      extraEnvVars:
        ## Set `PRODUCTION_ENDPOINT` env variable for `sumologic/production exporter` as `endpoint-production-logs` property of `sumologic-secrets` secret
        - name: PRODUCTION_ENDPOINT
          valueFrom:
            secretKeyRef:
              name: sumologic-secrets
              key: endpoint-production-logs
```

For the example above, the `sumologic-secrets` secret with the `endpoint-production-logs` key is required in the Sumo Logic installation namespace.

`sumologic.logs.otelcol.routing.table` is a list of maps, which consist of the keys `exporter` and `statement`.

Logs are sent to `exporter` when `statement` is met. `exporter` should be defined in `sumologic.logs.otelcol.extraExporters`, or the default `sumologic` may be used. `statement` has to be written in [OpenTelemetry Transformation Language](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/routingprocessor/README.md#tech-preview-opentelemetry-transformation-language-statements-as-routing-conditions).

:::note
Remember to use [attributes after translation to Sumo Logic schema](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/sumologicprocessor#attribute-translation). For example, use `namespace` instead of `k8s.namespace.name`.
:::

:::note
If a log matches multiple statements, it will be sent to all corresponding exporters. For example, the following routing table will send logs from the `production` namespace to `sumologic/production` and `sumologic/soc`:

```yaml
- exporter: sumologic/soc
  statement: route() where resource.attributes["namespace"] == "production"
- exporter: sumologic/production
  statement: route() where resource.attributes["namespace"] == "production"
```

:::

### Send logs selectively to multiple locations

This scenario differs from the previous ones by not sending all logs to Sumo Logic. If you want to send some data to Sumo Logic and some (the same or other) data to other locations, you need to disable default exporters. Set `sumologic.logs.otelcol.useDefaultExporters` to `false,` and then set `sumologic.logs.otelcol.routing.fallbackExporters` to a list of exporters that are going to be used for the logs which do not match any of the routing table statements.

In the following example, logs from the `production` namespace are going to be sent to the production Sumo Logic exporter, and all remaining logs will be sent to the default Sumo Logic exporter:

```yaml
sumologic:
  logs:
    otelcol:
      ## useDefaultExporters set to false to stop sending all logs to default exporters
      useDefaultExporters: false
      extraExporters:
        ## define `sumologic/production` exporter
        sumologic/production:
          ## use environmental variable to set endpoint
          endpoint: ${PRODUCTION_ENDPOINT}
      routing:
        ## use sumologic as fallbackExporter, which means it will get all data which do not match any statement
        fallbackExporters:
          - sumologic
        table:
          ## send all logs from `production` namespace to `sumologic/production` exporter
          - exporter: sumologic/production
            statement: route() where resource.attributes["namespace"] == "production"
metadata:
  logs:
    statefulset:
      extraEnvVars:
        ## Set `PRODUCTION_ENDPOINT` env variable for `sumologic/production exporter` as `endpoint-production-logs` property of `sumologic-secrets` secret
        - name: PRODUCTION_ENDPOINT
          valueFrom:
            secretKeyRef:
              name: sumologic-secrets
              key: endpoint-production-logs
```

For the example above, the `sumologic-secrets` secret with the `endpoint-production-logs` key is required in the Sumo Logic installation namespace.

[configuration]: https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/configuration.md
[values]: https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/deploy/helm/sumologic/values.yaml
[source_name]: /docs/send-data/reference-information/metadata-naming-conventions/#source-name
[opentelemetry_processors]: https://opentelemetry.io/docs/collector/configuration/#processors
[attributes_processor_docs]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md
[resource_processor_docs]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourceprocessor/README.md
[transform_processor_docs]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/transformprocessor/README.md
[sumo_fields]: /docs/manage/fields/
[sumo_add_fields]: /docs/manage/fields.md#add-field
[mapping]: /docs/send-data/opentelemetry-collector/data-source-configurations/mapping-records-resources.md
[otlp_source]: /docs/send-data/hosted-collectors/http-source/otlp.md
[http_source]: /docs/send-data/hosted-collectors/http-source/logs-metrics/index.md
