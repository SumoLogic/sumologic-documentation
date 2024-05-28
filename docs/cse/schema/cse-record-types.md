---
id: cse-record-types
title: Cloud SIEM Record Types
sidebar_label: Record Types
description: Learn about the Record types to which you can map schema attributes.
---

Each message that Cloud SIEM maps must be assigned one, and only one, Record Type.  For the complete list of record types, see [Schema: Record Types](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/schema/record_types.md) in the [Cloud SIEM Content Catalog](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/README.md).

Note that it is possible for multiple mappers to match a particular log message and each create a unique Record for that message—those multiple Records can have different Record Types. It isn’t standard practice to create multiple Cloud SIEM Records from a single log message, but it is possible if there is a use case. For related information, see [Attributes You Can Map to Records](/docs/cse/schema/attributes-map-to-records).