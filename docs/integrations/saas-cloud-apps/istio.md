---
id: istio
title: Sumo Logic App for Istio
sidebar_label: Istio
---


[Istio](https://istio.io/) reduces the complexity of managing Kubernetes deployments by providing a uniform platform for securing, connecting, and monitoring microservices.

The Sumo Logic App for Istio provides visibility into the health and performance of Istio and its control plane components, including Mixer, Galley, Citadel, Pilot and Envoy. App dashboards also allow you to monitor how services and applications are performing in Istio Mesh, providing insights into service latency, errors, network traffic, and request workloads.


1.png "image_tooltip")

This app supports Istio versions 1.8.x and 1.9.x+.


## Collect logs and metrics for the Istio App

This page provides instructions for collecting logs and metrics for the Sumo App for Istio. Logs and metrics are collected with the Sumo Logic Helm chart. Istio [sample metrics](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Istio/Collect_logs_and_metrics_for_the_Istio_App#Sample_Metrics) and [sample log messages](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Istio/Collect_logs_and_metrics_for_the_Istio_App#Sample_Log_Messages) are also provided, along with a [query sample](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Istio/Collect_logs_and_metrics_for_the_Istio_App#Query_Sample).


2.png "image_tooltip")


This app supports Istio versions 1.8.x and 1.9.x+.


#### Log and Metrics Types

* Access logs - Refer to [this page](https://istio.io/latest/docs/tasks/observability/logs/access-log/#default-access-log-format) for Istio Access log format.
* Istio Metrics - Refer to [this page](https://istio.io/latest/docs/concepts/observability/#service-level-metrics) for detailed Istio Metrics


#### Collection overview


3.png "image_tooltip")
The minimum version of Sumo Logic K8s Collection required is [V2.1.6](https://github.com/SumoLogic/sumologic-kubernetes-collection/releases/tag/v2.1.6).

Configure log and metrics collection with the Sumo Logic Helm chart, using one of the following options:



* [Kubernetes collection is already set up](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Istio/Collect_logs_and_metrics_for_the_Istio_App#Kubernetes_collection_is_already_set_up)
* [Kubernetes collection has not been set up](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Istio/Collect_logs_and_metrics_for_the_Istio_App#Kubernetes_collection_has_not_been_set_up)


##### Kubernetes collection is already set up


4.png "image_tooltip")
If you do not have Kubernetes set up, go[ here](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/master/deploy).

**Log Collection: **



1. Enable [Access Logging](https://istio.io/latest/docs/tasks/observability/logs/access-log/#enable-envoy-s-access-logging) to write logs to stdout.

The Sumologic-Kubernetes-Collection will automatically capture the logs from stdout and will send the logs to Sumologic.

**Metrics Collection:**



1. If you did install using the Sumo Logic Helm chart:
    * Update the helm chart values file with the following config:
        * Add following [additionalScrapeConfigs](https://sumologic-app-data.s3.amazonaws.com/Istio/sumologic-istio.yaml) section to **prometheusSpec** field of `sumologic-istio.yaml`.  These configs will scrape Istio endpoints for metrics. You can read more about the above scrape configs [here](https://istio.io/latest/docs/ops/integrations/prometheus/#option-2-customized-scraping-configurations)


```
       - job_name: 'istiod'
          kubernetes_sd_configs:
          - role: endpoints
            namespaces:
              names:
              - istio-system
          relabel_configs:
          - source_labels: [__meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
            action: keep
            regex: istiod;http-monitoring
        - job_name: 'envoy-stats'
          metrics_path: /stats/prometheus
          kubernetes_sd_configs:
          - role: pod
          relabel_configs:
          - source_labels: [__meta_kubernetes_pod_container_port_name]
            action: keep
            regex: '.*-envoy-prom'

```



1. Add following [rules](https://sumologic-app-data.s3.amazonaws.com/Istio/sumologic-istio.yaml) to **remoteWrite** section of `sumologic-istio.yaml`. These remote write configs make sure only metrics used by Sumo Logic Istio App are forwarded to Sumo Logic by Sumo Helm Chart.


```
       - url: http://$(FLUENTD_METRICS_SVC).$(NAMESPACE).svc.cluster.local:9888/prometheus.metrics.istio
          remoteTimeout: 5s
          writeRelabelConfigs:
            - action: keep
              regex: (?:galley_validation_(passed|failed|config_updates|config_update_error))
              sourceLabels: [__name__]
        - url: http://$(FLUENTD_METRICS_SVC).$(NAMESPACE).svc.cluster.local:9888/prometheus.metrics.istio
          remoteTimeout: 5s
          writeRelabelConfigs:
            - action: keep
              regex: (?:istio_(response_(bytes_sum|bytes_bucket)|requests_total|request_(duration_milliseconds_sum|duration_milliseconds_bucket|bytes_sum|bytes_bucket)|build|agent_(process_virtual_memory_bytes|process_max_fds|pilot_xds_pushes|pilot_xds_expired_nonce|pilot_xds|pilot_virt_services|pilot_proxy_queue_time_sum|pilot_endpoint_not_ready|num_outgoing_requests|num_failed_outgoing_requests|go_threads|go_memstats_heap_inuse_bytes|go_memstats_heap_alloc_bytes|go_memstats_gc_cpu_fraction|go_memstats_alloc_bytes_total|go_memstats_alloc_bytes|go_gc_duration_seconds)))
              sourceLabels: [__name__]

```



1. Upgrade the sumo logic helm chart by running the following


```
helm upgrade --install <my-release-name> sumologic/sumologic -f sumologic-istio.yaml
```



##### Kubernetes collection has not been set up

**Log Collection: **



1. **Enable [Access Logging](https://istio.io/latest/docs/tasks/observability/logs/access-log/#enable-envoy-s-access-logging) to write logs to stdout.**

The Sumologic-Kubernetes-Collection will automatically capture the logs from stdout and will send the logs to Sumologic.

**Metric Collection:**



1. Deploy using [Helm](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/master/deploy#installation-with-helm)
2. Add **additionalScrapeConfigs** and **remoteWrite** rules to values.yaml
    1. Add this **[additionalScrapeConfigs](https://sumologic-app-data.s3.amazonaws.com/Istio/sumologic-istio.yaml)** section to **prometheusSpec** field of `values.yaml`. These configs will scrape Istio endpoints for metrics. These configs will scrape Istio endpoints for metrics. You can read more about above scrape configs [here](https://istio.io/latest/docs/ops/integrations/prometheus/#option-2-customized-scraping-configurations)


```
       - job_name: 'istiod'
          kubernetes_sd_configs:
          - role: endpoints
            namespaces:
              names:
              - istio-system
          relabel_configs:
          - source_labels: [__meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
            action: keep
            regex: istiod;http-monitoring
        - job_name: 'envoy-stats'
          metrics_path: /stats/prometheus
          kubernetes_sd_configs:
          - role: pod
          relabel_configs:
          - source_labels: [__meta_kubernetes_pod_container_port_name]
            action: keep
            regex: '.*-envoy-prom'

```



1. Add these [rules](https://sumologic-app-data.s3.amazonaws.com/Istio/sumologic-istio.yaml) to **remoteWrite** section of `values.yaml`. This will send scraped metrics to sumo. \

5.png "image_tooltip")
2 **URL** blocks.


```
       - url: http://$(FLUENTD_METRICS_SVC).$(NAMESPACE).svc.cluster.local:9888/prometheus.metrics.istio
          remoteTimeout: 5s
          writeRelabelConfigs:
            - action: keep
              regex: (?:galley_validation_(passed|failed|config_updates|config_update_error))
              sourceLabels: [__name__]
        - url: http://$(FLUENTD_METRICS_SVC).$(NAMESPACE).svc.cluster.local:9888/prometheus.metrics.istio
          remoteTimeout: 5s
          writeRelabelConfigs:
            - action: keep
              regex: (?:istio_(response_(bytes_sum|bytes_bucket)|requests_total|request_(duration_milliseconds_sum|duration_milliseconds_bucket|bytes_sum|bytes_bucket)|build|agent_(process_virtual_memory_bytes|process_max_fds|pilot_xds_pushes|pilot_xds_expired_nonce|pilot_xds|pilot_virt_services|pilot_proxy_queue_time_sum|pilot_endpoint_not_ready|num_outgoing_requests|num_failed_outgoing_requests|go_threads|go_memstats_heap_inuse_bytes|go_memstats_heap_alloc_bytes|go_memstats_gc_cpu_fraction|go_memstats_alloc_bytes_total|go_memstats_alloc_bytes|go_gc_duration_seconds)))
              sourceLabels: [__name__]

```



1. Upgrade the sumo logic helm chart by running the following,


```
helm upgrade --install <my-release-name> sumologic/sumologic -f sumologic-istio.yaml
```



##### Validation Steps:



1. Do port forward via your terminal :


```
kubectl port-forward prometheus-my-release-kube-prometheus-prometheus-0 9090
```



6.png "image_tooltip")
my-release is my release i used while setting up [Sumo Logic helm chart](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/deploy/docs/Installation_with_Helm.md#installation-steps).



1. Open [http://127.0.0.1:9090/config](http://127.0.0.1:9090/config) in a web browser and make sure the following remotewrite configs are present:


```
- url: http://my-release-sumologic-fluentd-metrics.default.svc.cluster.local:9888/prometheus.metrics.istio
  remote_timeout: 5s
  write_relabel_configs:
  - source_labels: [__name__]
    separator: ;
    regex: (?:galley_validation_(passed|failed|config_updates|config_update_error))
    replacement: $1
    action: keep
  queue_config:
    capacity: 2500
    max_shards: 200
    min_shards: 1
    max_samples_per_send: 500
    batch_send_deadline: 5s
    min_backoff: 30ms
    max_backoff: 100ms
- url: http://my-release-sumologic-fluentd-metrics.default.svc.cluster.local:9888/prometheus.metrics.istio
  remote_timeout: 5s
  write_relabel_configs:
  - source_labels: [__name__]
    separator: ;
    regex: (?:istio_(response_(bytes_sum|bytes_bucket)|requests_total|request_(duration_milliseconds_sum|duration_milliseconds_bucket|bytes_sum|bytes_bucket)|build|agent_(process_virtual_memory_bytes|process_max_fds|pilot_xds_pushes|pilot_xds_expired_nonce|pilot_xds|pilot_virt_services|pilot_proxy_queue_time_sum|pilot_endpoint_not_ready|num_outgoing_requests|num_failed_outgoing_requests|go_threads|go_memstats_heap_inuse_bytes|go_memstats_heap_alloc_bytes|go_memstats_gc_cpu_fraction|go_memstats_alloc_bytes_total|go_memstats_alloc_bytes|go_gc_duration_seconds)))
    replacement: $1
    action: keep
  queue_config:
    capacity: 2500
    max_shards: 200
    min_shards: 1
    max_samples_per_send: 500
    batch_send_deadline: 5s
    min_backoff: 30ms
    max_backoff: 100ms
```


Above remotewrite configs make sure only metrics used by Sumo Logic Istio App are forwarded to Sumo Logic by Sumo Helm Chart.



1. Open [http://127.0.0.1:9090/config](http://127.0.0.1:9090/config) in a web browser and make sure the following scrape configs are present :


```
- job_name: istiod
  honor_timestamps: true
  scrape_interval: 30s
  scrape_timeout: 10s
  metrics_path: /metrics
  scheme: http
  relabel_configs:
  - source_labels: [__meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
    separator: ;
    regex: istiod;http-monitoring
    replacement: $1
    action: keep
  kubernetes_sd_configs:
  - role: endpoints
    namespaces:
      names:
      - istio-system
- job_name: envoy-stats
  honor_timestamps: true
  scrape_interval: 30s
  scrape_timeout: 10s
  metrics_path: /stats/prometheus
  scheme: http
  relabel_configs:
  - source_labels: [__meta_kubernetes_pod_container_port_name]
    separator: ;
    regex: .*-envoy-prom
    replacement: $1
    action: keep
  kubernetes_sd_configs:
  - role: pod
```



#### Query Sample

Query Sample from Dashboard "Istio - Logs" ; Panel "Non 200 Response Codes" :


```
namespace=istio-system cluster={{cluster}}
| json field=_raw "log" as log_message
| parse regex field=log_message "\[(?<start_time>.+)\] \"(?<req>.+?)\" (?<response_code>.+?) (?<response_flags>.+?) (?<response_code_details>.+?) (?<con_term_details>.+?) \"(?<upstream_fail_reason>.+?)\" (?<bytes_recvd>.+?) (?<bytessent>.+?) (?<duration>.+?) (?<resp>.+?) \"(?<req_fwd_for>.+?)\" \"(?<user_agent>.+?)\" \"(?<request_id>.+?)\" \"(?<request_authority>.+?)\" \"(?<upstream_host>.+?)\" (?<upstream_cluster>.+?) (?<upstream_loacl_address>.+?) (?<downstream_local_address>.+?) (?<downstream_remote_address>.+?) (?<requested_server_name>.+?) (?<route_name>.+?)"
| where response_code != "200"
| timeslice 1h
| count by response_code, _timeslice
| transpose row _timeslice column response_code
```



## Install the Istio App and view the Dashboards



1. **Last updated \
**Oct 19, 2021
2. [Save as PDF](https://help.sumologic.com/@api/deki/pages/7288/pdf/Install%2bthe%2bIstio%2bApp%2band%2bview%2bthe%2bDashboards.pdf?stylesheet=default)
3.  
4. [ Share](https://help.sumologic.com/07Sumo-Logic-Apps/18SAAS_and_Cloud_Apps/Istio/Install_the_Istio_App_and_view_the_Dashboards#)

    Table of contents


This page provides instructions for installing the Istio App, as well as descriptions and examples for each of the dashboards.


#### Install the App

Now that you have set up metric and log collection for Istio, install the Sumo Logic App for Istio and access the pre-configured dashboards that provide visibility into your Istio environment.

**To install the app, do the following:**

Locate and install the app you need from the App Catalog. If you want to see a preview of the dashboards included with the app before installing, click Preview Dashboards.



1. From the App Catalog, search for and select the app.
2. To install the app, click Add to Library and complete the following fields.
    1. **App Name**. You can retain the existing name, or enter a name of your choice for the app. 
    2. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.


7.png "image_tooltip")


1. Click **Add to Library**.

Once an app is installed, it will appear in your Personal folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


#### Filter with template variables   

Template variables provide dynamic dashboards that rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you can view dynamic changes to the data for a fast resolution to the root cause. For more information, see the [Filter with template variables](https://help.sumologic.com/Visualizations-and-Alerts/Dashboard_(New)/Filter_with_template_variables) help page.


8.png "image_tooltip")
You can use template variables to drill down and examine the data on a granular level.


##### Istio Overview Dashboard

The **Istio Overview** dashboard provides a high-level view of the number of applications in your environment, the average requests and responses, and the average duration of requests.

**Use this dashboard to: **



* Monitor application activity by requests, bytes transferred, and latency.


9.png "image_tooltip")



##### Istio - Mesh Throughput Dashboard

The **Istio Mesh** dashboard provides insights into the network of microservices in your environment, service success response rate, 4XX/5XX responses, latency, requests count, and request/response statistics.

**Use this dashboard to:**



* Monitor mesh performance and latency
* Monitor Errors and request/response size.


10.png "image_tooltip")



##### Istio - Workload Dashboard

The **Istio Workload** dashboard allows you to monitor the overall workloads in Istio and provides detailed breakdowns on inbound and outbound services.

**Use this dashboard to:**



* Monitor requests and responses for individual workloads.
* Analyze inbound and outbound services for workloads.


11.png "image_tooltip")



##### Istio - Galley Dashboard

The **Istio - Galley** Dashboard allows you to monitor the Istio Galley.

**Use this dashboard to:**



* Monitor resource validation passed/failed events and config updates errors.


12.png "image_tooltip")



##### Istio - Resource Usage Dashboard

The **Istio - Resource Usage** dashboard allows you to monitor the overall performance of Istio from a single dashboard.

**Use this dashboard to:**



* Monitor number of OS threads, GC duration,  File descriptors CPU, and Memory.
* Analyze the number of outgoing failed requests.


13.png "image_tooltip")



##### Istio - Pilot Traffic Dashboard

The Istio - Pilot Traffic dashboard assists in monitoring the Istio Pilot component

**Use this dashboard to:**



* Monitor Pilot queue time, endpoints connected to Pilot, endpoints not in ready state, and virtual service known to Pilot.


14.png "image_tooltip")
