---
id: data-transformations
title: OpenTelemetry - String Hashing and Masking using Transform Processor and OTTL
sidebar_label: String Hashing and Masking
description: Learn how to perform string hashing and masking operations using the Transform Processor and OTTL in OpenTelemetry.
---

OpenTelemetry provides the Transform Processor and OTTL (OpenTelemetry Transformation Language), empowering you to perform string hashing and masking operations on telemetry data. With the flexibility to configure the Transform Processor in your OpenTelemetry pipeline, you can replace sensitive information with hashed values or masked strings, ensuring data protection.

You can find more detailed information about the available OTTL functions and their usage in the [OTTL Functions README](https://github.com/rnishtala-sumo/opentelemetry-collector-contrib/blob/main/pkg/ottl/ottlfuncs/README.md).

## Hashing examples

### Example 1: Hashing a password in log body

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
          - replace_pattern(attributes["message"], "password=([0-9A-Za-z]+_)", attributes["password"])
```

The configuration consists of two sections: `attributes/extract` and `transform/replace`, representing attribute and transform processing, respectively.

- In the `attributes/extract` section, the `actions` key specifies the extraction action. In this example, the action extracts the password from an attribute value using a regular expression pattern. The pattern `^password=(?P<password>\\w+)$` captures the password value after `password=` and assigns it to the `password` attribute.
- The `transform/replace` section defines a transformation operation using the Transform Processor. Within the `log_statements` context, the following statements are executed:
  - The `set` function is used to hash the `password` attribute using the SHA256 hash algorithm. The resulting hash value replaces the original `password` value.
  - The `set` function is used to concatenate the string prefix `"hashed"` with the hashed `password`. This creates a new `password` value with the prefix included.
  - The `replace_pattern` function is applied to the `message` attribute. If the value matches the pattern `"password=(test)"`, the matched section is replaced with the hashed `password` attribute.

### Example 2: Hashing an attribute

```yaml
processors:
  transform/replace:
    log_statements:
      - context: log
        statements:
          - set(attributes["message"], SHA1(attributes["message"]))
```

The given configuration demonstrates hashing using the transform processor. Within the `log` context, a single statement is executed.

The `set` function is used to apply the SHA1 hashing algorithm to the message attribute. The resulting hashed value replaces the original value of the message attribute. This configuration ensures that the message attribute is transformed by applying the SHA1 hashing algorithm

:::note
The Transform Processor in OpenTelemetry supports various hashing digests such as SHA256, SHA1, and FNV. You can choose the appropriate digest based on your requirements.
:::

## Masking examples

### Example 1: Masking attributes based on a regular expression

```yaml
processors:
  transform:
    log_statements:
      - context: log
        statements:
          - replace_all_matches(attributes, ".*password", "***")
```

In this example, the `replace_all_matches` function is used to mask sensitive attributes based on a regular expression. All attribute values matching the regex `.*password` are replaced with `***`, providing a masked representation.

### Example 2: Masking and reformatting a specific field

```yaml
processors:
  transform:
    log_statements:
      - context: log
        statements:
          - replace_pattern(attributes["name"], "^kubernetes_([0-9A-Za-z]+_)", "k8s.$$1.")
```

In this example, the `replace_pattern` function is used to mask and reformat the `attributes["name"]` field. If the field value matches the regex pattern `^kubernetes_([0-9A-Za-z]+_)`, the matched section is replaced with `k8s.` and the captured group value (`$$1`).

Refer to the [OTTL Functions README](https://github.com/rnishtala-sumo/opentelemetry-collector-contrib/blob/main/pkg/ottl/ottlfuncs/README.md) for more details on the available OTTL functions and their usage.

By incorporating these examples into your OpenTelemetry configuration, you can easily apply string hashing and masking techniques, leveraging supported digest algorithms (such as SHA256, SHA1, and FNV), and ensuring the protection of sensitive information within your telemetry data.
