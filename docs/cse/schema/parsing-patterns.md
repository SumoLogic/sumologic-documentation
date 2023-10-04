---
id: parsing-patterns
title: Parsing Patterns
sidebar_label: Parsing Patterns
description: Parsing patterns are predefined named regular expressions used in regex-based parsers. 
---

This topic describes parsing patterns, predefined named regular expressions similar to [*Grok*](https://logz.io/blog/logstash-grok/), that simplify and speed the development of regex-based parsers. You can use a pattern anywhere that regex can be used. Patterns are stored in `patterns.conf` as `<Pattern Name> = <regex>` key value pairs, for example:

`IPV4 = \d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}`

In parsers, you refer to a pattern as `%{<Pattern Name>}`. You can assign patterns to a
named capture group like this:

`%{<Pattern Name>:<field_name>}`

## Hosts and ports

The following patterns define host and port formats:
* `HOSTNAME = (?:[0-9A-Za-z][0-9A-Za-z-]{0,62})(?:\.(?:[0-9A-Za-z][0-9A-Za-z-]{0,62}))*(\.?|\b)`
* `HOST = %{HOSTNAME}`
* `HOSTPORT = (?:%{IPORHOST}:%{POSINT})|%{IPPORT}`
* `IPORHOST = (?:%{HOSTNAME}|%{IP})`
* The following pattern identifies well-known ports from 1-1023. It covers 1|01|001|0001 to 1023, skipping 0, 00, 000, 0000 and > 1024. For example:<br/>`SYSTEM_PORT = ^0*(?:[1-9]\d{0,3}|[0-2]\d{4}|3[01]\d{3}|32[0-6]\d{2}|327[0-5]\d|3276[0-7])(?:\s|$)`

## Dates and times

The following patterns define dates and times formats: 
* `ampm = ([ap]m|[\x{4E0A}\x{4E0B}]\x{5348})`
* `anymonth = %{litmonth:_$litmonth}|%{month:_$month}`
* `bareurlitdate = (\d\d?)\|\|(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\|\|(20\d\d)`
* `bsdsyslogdate = %{anymonth}(?P<sep>[/\- ]) {0,2}%{day:_$day}`
* `day = 3[01]|[12]\d|0?[1-9]`
* `dottime = (?P<hour>(?:[01]\d|2[0-3]))\.%{minute:_$minute}(?:\.?%{second:_$second}(?:[:,]\d+)?(?:\.(\d\d\d\d+))?) {0,2}%{zone:zone}`
* `eurodate1 = %{usday}(?P<sep>[\- /]) {0,2}%{anymonth}\g<sep> {0,2}%{year:_$year}`
* `eurodate2 = %{usday}\.%{anymonth}\.%{year:_$year}`
* `hmtime = (%{hour:_$hour}:%{minute:_$minute}(?: %{ampm})?)`
* `hour = (?:[01]?[1-9]|[012][0-3])`
* `isodate = %{year:_$year}([\./\- ])%{anymonth}(?:[\./\- ] {0,2})%{day:_$day}`
* `litmonth = (?P<_$litmonth>jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[a-z,\.;]*`
* `masheddate = (?:^|source::).*?(?:20)?([901]\d)(0\d|1[012])([012]\d|3[01])`
* `masheddate2 = (?:^|source::).*?(0\d|1[012])([012]\d|3[01])(?:20)?([901]\d)`
* `minute = (?:[0-6]\d)`
* `month = (0?[1-9]|1[012])`
* `orddate = \s([01]\d)([0123]\d\d)\s`
* `second = (?:[0-6]\d)`
* `time = (%{hour:_$hour}:%{minute:_$minute}:%{second:_$second}(?:(?: \d{4})?[:,\.](\d+))? {0,2}(%{ampm:ampm})? {0,2}%{zone:zone})`
* `usday = %{day:_$day}(?:st|nd|rd|th|[,\.;])?`
* `year = 20\d\d|19\d\d|[901]\d`
* `zone = ((?:(?:UT|UTC|(?:GMT)?[+-]\d\d?:?(?:\d\d)?)|GMT|CET|CEST|CETDST|MET|MEST|METDST|MEZ|MESZ|EET|EEST|EETDST|WET|WEST|WETDST|MSK|MSD|IST|JST|KST|HKT|AST|ADT|EST|EDT|CST|CDT|MST|MDT|PST|PDT|CAST|CADT|EAST|EADT|WAST|WADT|Z)|(?:GMT)?[+-]\d\d?:?(?:\d\d)?))?`

### Combined date and time

The following patterns define combined date and time formats:
* The following pattern defines a format such as **20151102-000012 GMT**:<br/>`combdatetime = (20\d\d)(0\d|1[012])([012]\d|3[01])[.-]?([01]\d|2[0123])([0-6]\d)([0-6]\d)(?:\.?(\d+))?( %{zone})?`
* The following pattern defines a format such as **2007-3-22 0:0:2 GMT**:<br/>`combdatetime2 = (20\d\d)(?P<sep>[-/])([01]?\d)\g<sep>([012]?\d|3[01])\s+([012]?\d):([0-6]?\d):([0-6]?\d)( %{zone})?`

### U.S. date

The following patterns define United States date and time formats (month, day, year): 
* The following pattern defines a format such as **02 19 GMT 15**: <br/>`usdate = %{anymonth}(?P<sep>[/\- ]) {0,2}%{day:_$day} {0,2}(?:\d\d:\d\d:\d\d(?:[\.\,]\d+)? {0,2}%{zone:zone})?((?:\g<sep>|,) {0,2}%{year:_$year})?`
* The following pattern defines a format such as **Feb 19, 15**:<br/>`usdate1 = %{litmonth}(?P<sep>[/\- ]) {0,2}%{day:_$day} {0,2}(?:\d\d:\d\d:\d\d(?:[\.\,]\d+)? {0,2}%{zone:zone})?((?:\g<sep>|,) {0,2}%{year:_$year})?`
* The following pattern defines a format such as **02/19/15**:<br/>`usdate2 = %{month:_$month}(?P<sep>[/\-])%{day:_$day}((?:\g<sep>)%{year:_$year})?`

## Names

The following patterns define name formats:
* `USERNAME = [a-zA-Z0-9._-]+`
* `USER = %{USERNAME}`

## Numbers

The following patterns define number formats:
* `BASE10NUM = (?:[+-]?(?:(?:[0-9]+(?:\.[0-9]+)?)|(?:\.[0-9]+)))`
* `BASE16FLOAT = (?:[+-]?(?:0x)?(?:(?:[0-9A-Fa-f]+(?:\.[0-9A-Fa-f]*)?)|(?:\.[0-9A-Fa-f]+)))`
* `BASE16NUM =   (?:[+-]?(?:0x)?(?:[0-9A-Fa-f]+))`
* `INT = (?:[+-]?(?:[0-9]+))`
* `NONNEGINT = (?:[0-9]+)`
* `NUMBER = (?:%{BASE10NUM})`
* `POSINT = (?:[1-9][0-9]*)`

## Words

The following patterns define word formats:
* `DASHED_WORD = \w+(-\w+)*`
* `NOTSPACE = \S+`
* `SPACE = \s*`
* `WORD = \w+`

## Data

The following patterns define data formats:
* `DATA = .*?`
* `GREEDYDATA = .*`
* `UUID = [A-Fa-f0-9]{8}-?(?:[A-Fa-f0-9]{4}-?){3}[A-Fa-f0-9]{12}`

## Networking

The following patterns define networking formats:
* `BADMAC = (?:(?:[A-Fa-f0-9]:){5}[A-Fa-f0-9])`
* `CISCOMAC = (?:(?:[A-Fa-f0-9]{4}\.){2}[A-Fa-f0-9]{4})`
* `COMMONMAC = (?:(?:[A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2})`
* `MAC = (?:%{CISCOMAC}|%{WINDOWSMAC}|%{COMMONMAC}|%{BADMAC})`
* `WINDOWSMAC = (?:(?:[A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2})`

## IP addresses

The following patterns define IP address formats:
* `IP = (?:%{IPV6}|%{IPV4})`
* `IPPORT = (?:(?:\[%{IPV6}\]|%{IPV4}):%{POSINT})`
* `IPV4 = (?:(?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})[.](?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})[.](?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})[.](?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2}))`
* `IPV6 = ((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?`

```
# more patterns



# paths
TTY = (?:/dev/(pts|tty([pq])?)(\w+)?/?(?:[0-9]+))
UNIXPATH = (?:/(?:[\w_%!$@:.,-]+|\\.)*)+
WINPATH = (?:[A-Za-z]+:|\\)(?:\\[^\\?*]*)+
PATH = (?:%{UNIXPATH}|%{WINPATH})
URIPROTO = [A-Za-z]+(\+[A-Za-z+]+)?
URIHOST = %{IPORHOST}(?::%{POSINT:port})?
# uripath comes loosely from RFC1738, but mostly from what Firefox
# doesn't turn into %XX
URIPATH = (?:/[A-Za-z0-9$.+!*'(){},~:;=@#%_\-]*)+
#URIPARAM = \?(?:[A-Za-z0-9]+(?:=(?:[^&]*))?(?:&(?:[A-Za-z0-9]+(?:=(?:[^&]*))?)?)*)?
URIPARAM = \?[A-Za-z0-9$.+!*'|(){},~@#%&/=:;_?\-\[\]]*
URIPATHPARAM = %{URIPATH}(?:%{URIPARAM})?
URI = %{URIPROTO:protocol}://(?:%{USER:user}(?::[^@]*)?@)?(?:%{URIHOST:host})?(?:%{URIPATHPARAM:path})?

# Months: January, Feb, 3, 03, 12, December
MONTH = \b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b
MONTHNUM = (?:0?[1-9]|1[0-2])
MONTHNUM2 = (?:0[1-9]|1[0-2])
MONTHDAY = (?:(?:0[1-9])|(?:[12][0-9])|(?:3[01])|[1-9])

# Days: Monday, Tue, Thu, etc...
DAY = (?:Mon(?:_day)?|Tue(?:sday)?|Wed(?:nesday)?|Thu(?:rsday)?|Fri(?:_day)?|Sat(?:urday)?|Sun(?:_day)?)

# Years?
YEAR = (?:\d\d){1,2}
HOUR = (?:2[0123]|[01]?[0-9])
MINUTE = (?:[0-5][0-9])
# '60' is a leap second in most time standards and thus is valid.
SECOND = (?:(?:[0-5]?[0-9]|60)(?:[:.,][0-9]+)?)
MILLISECOND = \d{3}
TIME = %{HOUR:_$hour}:%{MINUTE:_$minute}(?::%{SECOND:_$second})
# datestamp is YYYY/MM/DD-HH:MM:SS.UUUU (or something like it)
DATE_US = %{MONTHNUM:_$month}[/-]%{MONTHDAY:_$day}[/-]%{YEAR:_$year}
DATE_EU = %{MONTHDAY:_$day}[./-]%{MONTHNUM:_$month}[./-]%{YEAR:_$year}
ISO8601_TIMEZONE = (?:Z|[+-]%{HOUR:_$hour}(?::?%{MINUTE:_$minute}))
ISO8601_SECOND = (?:%{SECOND}|60)
TIMESTAMP_ISO8601 = %{YEAR:_$year}-%{MONTHNUM:_$month}-%{MONTHDAY:_$day}[T ]%{HOUR:_$hour}:?%{MINUTE:_$minute}(?::?%{SECOND:_$second})?(?:,%{MILLISECOND:_$millisecond})?%{ISO8601_TIMEZONE:zone}?
DATE = %{DATE_US}|%{DATE_EU}
DATESTAMP = %{DATE:date}[- ]%{TIME:time}
TZ = (?:[PMCE][SD]T|UTC)
DATESTAMP_RFC822 = %{DAY:_$dayname} %{MONTH:_$month} %{MONTHDAY:_$day} %{YEAR:_$year} %{TIME:time} %{TZ:zone}
DATESTAMP_RFC2822 = %{DAY:_$dayname}, %{MONTHDAY:_$day} %{MONTH:_$month} %{YEAR:_$year} %{TIME:time} %{ISO8601_TIMEZONE:zone}
DATESTAMP_OTHER = %{DAY:_$dayname} %{MONTH:_$month} %{MONTHDAY:_$day} %{TIME:time} %{TZ:zone} %{YEAR:_$year}
DATESTAMP_EVENTLOG = %{YEAR:_$year}%{MONTHNUM2:_$month}%{MONTHDAY:_$day}%{HOUR:_$hour}%{MINUTE:_$minute}%{SECOND:_$second}

# Syslog Dates: Month Day HH:MM:SS
SYSLOGTIMESTAMP = (?:%{MONTH:_$month} +%{MONTHDAY:_$day} %{TIME}( %{YEAR:_$year})?|%{TIMESTAMP_ISO8601})
PROG = (?:[\w._/%-]+)
SYSLOGPROG = %{PROG:program}(?:\[%{POSINT:pid}\])?
SYSLOGHOST = %{IPORHOST}
SYSLOGFACILITY = <%{NONNEGINT:syslog_facility}(?:.%{NONNEGINT:syslog_priority})?>
HTTPDATE = %{MONTHDAY}/%{MONTH}/%{YEAR}:%{TIME} %{INT}
SYSLOGPRIORITY = (?:%{WORD}\.)?(?:[0-7]|[Aa]lert|[Cc]ritical|[Ee]rror|[Ww]arning|[Nn]otice|[Ii]nformational|[Dd]ebug)

# FC Original
BSD_SYSLOG_HEADER = %{SYSLOGFACILITY}%{SYSLOGTIMESTAMP:syslog_timestamp}(?: %{SYSLOGPRIORITY:syslog_priority})? %{SYSLOGHOST:syslog_host}(?: %{DATA:process}(?:\[%{INT:process_id}\])?\:)?
BSD_SYSLOG_MSG = %{BSD_SYSLOG_HEADER} %{GREEDYDATA:_$log_entry}

DHCP_INTERFACE = (?:%{IP}|.+?)


# Log formats
SYSLOGBASE = %{SYSLOGTIMESTAMP:timestamp} (?:%{SYSLOGFACILITY} )?%{SYSLOGHOST:logsource} %{SYSLOGPROG}:
COMMONAPACHELOG = %{IPORHOST:clientip} %{USER:ident} %{USER:auth} \[%{HTTPDATE:timestamp}\] \"(?:%{WORD:verb} %{NOTSPACE:request}(?: HTTP/%{NUMBER:httpversion})?|%{DATA:rawrequest})\" %{NUMBER:response} (?:%{NUMBER:bytes}|-)

# Log Levels
LOGLEVEL = ([Aa]lert|ALERT|[Tt]race|TRACE|[Dd]ebug|DEBUG|[Nn]otice|NOTICE|[Ii]nfo|INFO|[Ww]arn?(?:ing)?|WARN?(?:ING)?|[Ee]rr?(?:or)?|ERR?(?:OR)?|[Cc]rit?(?:ical)?|CRIT?(?:ICAL)?|[Ff]atal|FATAL|[Ss]evere|SEVERE|EMERG(?:ENCY)?|[Ee]merg(?:ency)?)

# FC Original
ANYDATESTAMP = %{TIMESTAMP_ISO8601}|%{SYSLOGTIMESTAMP}|%{DATESTAMP_EVENTLOG}|%{DATESTAMP_OTHER}|%{DATESTAMP_RFC2822}|%{DATESTAMP_RFC822}|%{DATESTAMP}


```

