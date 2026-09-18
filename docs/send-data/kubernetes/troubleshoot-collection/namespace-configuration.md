---
id: namespace-configuration
title: Troubleshooting Kubernetes Namespace Configuration
description: Troubleshoot common namespace configuration issues that can prevent the collector from discovering or accessing Kubernetes resources.
---

The following `kubectl` commands assume you are in the correct namespace `sumologic`. By default, these commands will use the namespace `default`.

To run a single command in the `sumologic` namespace, pass in the flag `-n sumologic`.

To set your namespace context more permanently, you can run the following command:

```sh
kubectl config set-context $(kubectl config current-context) --namespace=sumologic
```
