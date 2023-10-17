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
  transform:
    log_statements:
      - context: log
        statements:
          - replace_pattern(body, "password=([^\\s]*)", "$$1", "password=", SHA256)
```

In this example, the `replace_pattern` function is used to hash the value of a password in the log body. The pattern `password=([^\\s]*)` captures the password value after `password=`. The matching section is replaced with the hash value of the captured group (`$$1`), utilizing the SHA256 hash function. The replacement is then prefixed with `"password="`, preserving the original prefix.

#### Example 2: Hashing a Kubernetes Name

```yaml
processors:
  transform:
    log_statements:
      - context: log
        statements:
          - replace_pattern(name, "^kube_([0-9A-Za-z]+_)", "$$1.", "k8s.", SHA1)
```

In this example, the `replace_pattern` function is used to hash a section of the Kubernetes name matching the specified pattern. The captured group (`$$1`) is replaced with its SHA1 hash value. Additionally, `k8s.` is added as a prefix to the hash value.

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