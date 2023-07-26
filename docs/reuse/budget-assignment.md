The **scope** supports the option to assign ingest budgets to your log data by either:

* A Field that is enabled in the [Fields table](/docs/manage/fields.md). Fields are created in many ways; see [Fields](/docs/manage/fields.md) for details.
* One of the following built-in metadata fields: `_collector`, `_source`, `_sourceCategory`, `_sourceHost`, or `_sourceName`.

The value supports a single wildcard, such as `_sourceCategory=prod*payment`.

For example, a **scope** expression like `_sourceCategory=/dev/catalog/*` implies that all incoming logs ingested into Sumo Logic with a matching `_sourceCategory` will fall under the scope of the given budget.
