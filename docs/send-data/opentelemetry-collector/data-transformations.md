---
id: data-transformations
title: OpenTelemetry - String Hashing and Masking using Transform Processor and OTTL
description: Learn how to perform string hashing and masking operations using the Transform Processor and OTTL in OpenTelemetry.
---

OpenTelemetry provides the Transform Processor and OTTL (OpenTelemetry Transformation Language), empowering you to perform string hashing and masking operations on telemetry data. With the flexibility to configure the Transform Processor in your OpenTelemetry pipeline, you can replace sensitive information with hashed values or masked strings, ensuring data protection.

You can find more detailed information about the available OTTL functions and their usage in the [OTTL Functions README](https://github.com/rnishtala-sumo/opentelemetry-collector-contrib/blob/ottl-replace-pattern/pkg/ottl/ottlfuncs/README.md).

### Hashing Examples

#### Example 1: Hashing a Password in Log Body

```yaml
processors:
  attributes/extract:
  actions:
    - key: message
      pattern: "^password=(?P<password>\\w+)$"
      action: extract

  transform/replace:
    log_statements:
      - context: log
        statements:
          - set(attributes["password"], SHA256(attributes["password"]))
          - set(attributes["password"], Concat(["passwd", attributes["password"]], "="))
          - replace_pattern(attributes["message"], "password=(test)", attributes["password"])
```

The configuration consists of two sections: `attributes/extract` and `transform/replace`, representing attribute extraction and transformation operations, respectively.

- In the `attributes/extract` section, the `actions` key specifies the extraction action. In this example, the action extracts the password from an attribute value using a regular expression pattern. The pattern `^password=(?P<password>\\w+)$` captures the password value after `password=` and assigns it to the `password` attribute.

- The `transform/replace` section defines a transformation operation using the Transform Processor. Within the `log_statements` context, the following statements are executed:

  - The `set` function is used to hash the `password` attribute using the SHA256 hash algorithm. The resulting hash value replaces the original `password` value.

  - The `set` function is used to concatenate the string prefix `"hashed"` with the hashed `password`. This creates a new `password` value with the prefix included.

  - The `replace_pattern` function is applied to the `message` attribute. If the value matches the pattern `"password=(test)"`, the matched section is replaced with the hashed `password` attribute.

#### Example 2: Hashing a Kubernetes Name

```yaml
processors:
  attributes/extract:
  actions:
    - key: message
      pattern: "^kube=(?P<k8s_name>\\w+)$"
      action: extract

  transform/replace:
    log_statements:
      - context: log
        statements:
          - set(attributes["k8s_name"], SHA256(attributes["k8s_name"]))
          - set(attributes["k8s_name"], Concat(["k8s.", attributes["k8s_name"]], "="))
          - replace_pattern(attributes["message"], "^kube_([0-9A-Za-z]+_)", attributes["k8s_name"])
```

The provided configuration consists of two processors: `attributes/extract`, `transform/replace`.

- In the `attributes/extract` processor, an extraction action is defined for the `message` attribute using the pattern `^kube=(?P<k8s_name>\\w+)`. This pattern captures the value after `"kube="` and assigns it to the `k8s_name` attribute.

- In the `transform/replace` processor, within the `log_statements` context, several statements are executed:

  - The `set` function is used to hash the `k8s_name` attribute using the SHA256 hashing algorithm. The resulting hash value replaces the original value of the `k8s_name` attribute.

  - The `set` function is then used to concatenate the string prefix `"k8s."` with the hashed `k8s_name`, followed by `"="`. This creates a new value for the `k8s_name` attribute, prefixed with `"k8s="`.

  - The `replace_pattern` function is applied to the `message` attribute. It matches the pattern `^kube_([0-9A-Za-z]+_)` and replaces it with the value of the hashed `k8s_name` attribute.

These transformations ensure that the `k8s_name` attribute is first hashed using SHA256, prefixed with `"k8s."`, and then used to replace occurrences of the pattern `^kube_([0-9A-Za-z]+_)` in the `message` attribute.

Note: The Transform Processor in OpenTelemetry supports various hashing digests such as SHA256, SHA1, and FNV. You can choose the appropriate digest based on your requirements.

### Masking Examples

#### Example 1: Masking Attributes Based on a Regular Expression

```yaml
processors:
  transform:
    log_statements:
      - context: log
        statements:
          - replace_all_matches(attributes, ".*password", "***")
```

In this example, the `replace_all_matches` function is used to mask sensitive attributes based on a regular expression. All attribute values matching the regex `.*password` are replaced with `***`, providing a masked representation.

#### Example 2: Masking and Reformatting a Specific Field

```yaml
processors:
  transform:
    log_statements:
      - context: log
        statements:
          - replace_pattern(attributes["name"], "^kubernetes_([0-9A-Za-z]+_)", "k8s.$$1.")
```

In this example, the `replace_pattern` function is used to mask and reformat the `attributes["name"]` field. If the field value matches the regex pattern `^kubernetes_([0-9A-Za-z]+_)`, the matched section is replaced with `k8s.` and the captured group value (`$$1`).

Please refer to the [OTTL Functions README](https://github.com/rnishtala-sumo/opentelemetry-collector-contrib/blob/ottl-replace-pattern/pkg/ottl/ottlfuncs/README.md) for more details on the available OTTL functions and their usage.

By incorporating these examples into your OpenTelemetry configuration, you can easily apply string hashing and masking techniques, leveraging supported digest algorithms (such as SHA256, SHA1, and FNV), and ensuring the protection of sensitive information within your telemetry data.