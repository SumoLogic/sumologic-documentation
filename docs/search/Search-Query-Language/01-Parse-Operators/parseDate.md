---
id: parsedate
---

# parseDate

The parseDate operator extracts a date or time from a string and
provides a timestamp in milliseconds. To convert an epoch timestamp in a
human-readable format, use the `formatDate` operator.

### Syntax

-   `parseDate\<strDat\>,\<dateForma\>)`
-   `parseDate\<strDat\>,\<dateForma\>,\<timeZon\>)`

### Rules

-   `strDate` must start with the characters to match with the
    `dateFormat` pattern. For example, "3/4/2005 other" but not "other
    3/4/2005".
-   `dateFormat` is a pattern string, such as "MM/dd/yyyy HH:mm:ss a". A
    full list of the supported patterns can be found on [Java's
    simpledateformat](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html "https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html") documentation.
-   If you do not supply `timeZone,` the operator defaults to the time
    zone set in your
    [preferences](../../../01Start-Here/05Customize-Your-Sumo-Logic-Experience/Preferences-Page.md "Preferences Page"). For
    a list of `timeZone` codes,
    see�\<https://en.wikipedia.org/wiki/List_of_tz_database_time_zone\>.

### Examples

1.  Given the date `2019-11-18T19:00:00.000-08:00` you'd specify
    the `dateFormat` as `yyyy-MM-dd'T'HH:mm:ss.SSSXXX`. For example,  
      
    `| parseDate(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX") as milliseconds`  
      
     
2.  Given a log message such as:

&nbsp;

    instance of Win32_NTLogEvent
    {
        EventIdentifier = 100;
        Logfile = "Application";
        RecordNumber = 894528;
        SourceName = "Bonjour Service";
        TimeGenerated = "20170720000030.000000-000";
        TimeWritten = "20170720000030.000000-000";
        Type = "Error";
        ...

The following query returns TimeGenerated as a timestamp in
milliseconds, in this example 1500534030000.

`| parse "TimeGenerated = \"*.000000-000" as dd | parseDate(dd, "yyyyMMddHHmmss") as milliseconds`

To specify a time zone:

`| parseDate(dd, "yyyyMMddHHmmss", "etc/utc") as milliseconds`

 
