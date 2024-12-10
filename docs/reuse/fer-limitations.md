Ingest Time FERs have the following limitations:

* There is a limit of 50 Ingest Time rules and 200 fields. Fields created as log metadata and from Ingest Time rules share the same quota of 200 fields. You can manage your fields on the Fields page.
    :::note
    Enterprise and Enterprise Suite users can create a maximum of 400 fields.
    :::
* Ingest Time rule expressions are limited to a maximum of 16k (16,384) characters.
* Ingest Time rules can extract up to a maximum of 16k (16,384) characters for each field.
* The cumulative size of all fields extracted by a rule for a message/event is limited to 64kb.
* Ingest Time rules **only apply to data moving forward**. If you want to [parse](/docs/search/search-query-language/parse-operators) data ingested before the creation of your Ingest Time FER, you can either parse your data in your query, or create [Scheduled Views](/docs/manage/views/scheduled-views) to extract fields for your historical data.  
