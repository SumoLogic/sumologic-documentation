---
id: parsing-patterns
title: Parsing Patterns
description: Parsing patterns are predefined named regular expressions used in regex-based parsers. 
---

This topic describes parsing patterns, predefined named regular expressions similar to [*Grok*](https://logz.io/blog/logstash-grok/), that simplify and speed the development of regex-based parsers. Use the [Parser Editor](/docs/cse/schema/parser-editor) to add patterns to parsers.

Patterns are stored in `patterns.conf` as `<Pattern Name> = <regex>` key value pairs, for example:<br/>`IPV4 = \d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}`

In parsers, you refer to a pattern as `%{<Pattern Name>}`. You can assign patterns to a
named capture group like this: <br/>`%{<Pattern Name>:<field_name>}`

## Data

The following patterns specify data formats:
* `DATA = .*?`
* `GREEDYDATA = .*`
* `UUID = [A-Fa-f0-9]{8}-?(?:[A-Fa-f0-9]{4}-?){3}[A-Fa-f0-9]{12}`

## Date and time

The following patterns specify date and time formats: 
* `ampm = ([ap]m|[\x{4E0A}\x{4E0B}]\x{5348})`
* `ANYDATESTAMP = %{TIMESTAMP_ISO8601}|%{SYSLOGTIMESTAMP}|%{DATESTAMP_EVENTLOG}|%{DATESTAMP_OTHER}|%{DATESTAMP_RFC2822}|%{DATESTAMP_RFC822}|%{DATESTAMP}`
* `anymonth = %{litmonth:_$litmonth}|%{month:_$month}`
* `bareurlitdate = (\d\d?)\|\|(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\|\|(20\d\d)`
* `bsdsyslogdate = %{anymonth}(?P<sep>[/\- ]) {0,2}%{day:_$day}`
* `combdatetime = (20\d\d)(0\d|1[012])([012]\d|3[01])[.-]?([01]\d|2[0123])([0-6]\d)([0-6]\d)(?:\.?(\d+))?( %{zone})?` <br/>(Specifies a format such as **20151102-000012 GMT**.)
* `combdatetime2 = (20\d\d)(?P<sep>[-/])([01]?\d)\g<sep>([012]?\d|3[01])\s+([012]?\d):([0-6]?\d):([0-6]?\d)( %{zone})?` <br/>(Specifies a format such as **2007-3-22 0:0:2 GMT**.)
* `DATE = %{DATE_US}|%{DATE_EU}`
* `DATE_EU = %{MONTHDAY:_$day}[./-]%{MONTHNUM:_$month}[./-]%{YEAR:_$year}`
* `DATESTAMP = %{DATE:date}[- ]%{TIME:time}`
* `DATESTAMP_EVENTLOG = %{YEAR:_$year}%{MONTHNUM2:_$month}%{MONTHDAY:_$day}%{HOUR:_$hour}%{MINUTE:_$minute}%{SECOND:_$second}`
* `DATESTAMP_OTHER = %{DAY:_$dayname} %{MONTH:_$month} %{MONTHDAY:_$day} %{TIME:time} %{TZ:zone} %{YEAR:_$year}`
* `DATESTAMP_RFC2822 = %{DAY:_$dayname}, %{MONTHDAY:_$day} %{MONTH:_$month} %{YEAR:_$year} %{TIME:time} %{ISO8601_TIMEZONE:zone}`
* `DATESTAMP_RFC822 = %{DAY:_$dayname} %{MONTH:_$month} %{MONTHDAY:_$day} %{YEAR:_$year} %{TIME:time} %{TZ:zone}`
* `DATE_US = %{MONTHNUM:_$month}[/-]%{MONTHDAY:_$day}[/-]%{YEAR:_$year}`
* `day = 3[01]|[12]\d|0?[1-9]`
* `DAY = (?:Mon(?:_day)?|Tue(?:sday)?|Wed(?:nesday)?|Thu(?:rsday)?|Fri(?:_day)?|Sat(?:urday)?|Sun(?:_day)?)`
* `dottime = (?P<hour>(?:[01]\d|2[0-3]))\.%{minute:_$minute}(?:\.?%{second:_$second}(?:[:,]\d+)?(?:\.(\d\d\d\d+))?) {0,2}%{zone:zone}`
* `eurodate1 = %{usday}(?P<sep>[\- /]) {0,2}%{anymonth}\g<sep> {0,2}%{year:_$year}`
* `eurodate2 = %{usday}\.%{anymonth}\.%{year:_$year}`
* `hmtime = (%{hour:_$hour}:%{minute:_$minute}(?: %{ampm})?)`
* `hour = (?:[01]?[1-9]|[012][0-3])`
* `HOUR = (?:2[0123]|[01]?[0-9])`
* `HTTPDATE = %{MONTHDAY}/%{MONTH}/%{YEAR}:%{TIME} %{INT}`
* `ISO8601_SECOND = (?:%{SECOND}|60)`
* `ISO8601_TIMEZONE = (?:Z|[+-]%{HOUR:_$hour}(?::?%{MINUTE:_$minute}))`
* `isodate = %{year:_$year}([\./\- ])%{anymonth}(?:[\./\- ] {0,2})%{day:_$day}`
* `litmonth = (?P<_$litmonth>jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[a-z,\.;]*`
* `masheddate = (?:^|source::).*?(?:20)?([901]\d)(0\d|1[012])([012]\d|3[01])`
* `masheddate2 = (?:^|source::).*?(0\d|1[012])([012]\d|3[01])(?:20)?([901]\d)`
* `MILLISECOND = \d{3}`
* `minute = (?:[0-6]\d)`
* `MINUTE = (?:[0-5][0-9])`
* `month = (0?[1-9]|1[012])`
* `MONTH = \b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b`
* `MONTHNUM = (?:0?[1-9]|1[0-2])`
* `MONTHNUM2 = (?:0[1-9]|1[0-2])`
* `MONTHDAY = (?:(?:0[1-9])|(?:[12][0-9])|(?:3[01])|[1-9])`
* `orddate = \s([01]\d)([0123]\d\d)\s`
* `second = (?:[0-6]\d)`
* `SECOND = (?:(?:[0-5]?[0-9]|60)(?:[:.,][0-9]+)?)`
* `time = (%{hour:_$hour}:%{minute:_$minute}:%{second:_$second}(?:(?: \d{4})?[:,\.](\d+))? {0,2}(%{ampm:ampm})? {0,2}%{zone:zone})`
* `TIME = %{HOUR:_$hour}:%{MINUTE:_$minute}(?::%{SECOND:_$second})`
* `TIMESTAMP_ISO8601 = %{YEAR:_$year}-%{MONTHNUM:_$month}-%{MONTHDAY:_$day}[T ]%{HOUR:_$hour}:?%{MINUTE:_$minute}(?::?%{SECOND:_$second})?(?:,%{MILLISECOND:_$millisecond})?%{ISO8601_TIMEZONE:zone}?`
* `TZ = (?:[PMCE][SD]T|UTC)`
* `usdate = %{anymonth}(?P<sep>[/\- ]) {0,2}%{day:_$day} {0,2}(?:\d\d:\d\d:\d\d(?:[\.\,]\d+)? {0,2}%{zone:zone})?((?:\g<sep>|,) {0,2}%{year:_$year})?` <br/>(Specifies a format such as **02 19 GMT 15**.)
* `usdate1 = %{litmonth}(?P<sep>[/\- ]) {0,2}%{day:_$day} {0,2}(?:\d\d:\d\d:\d\d(?:[\.\,]\d+)? {0,2}%{zone:zone})?((?:\g<sep>|,) {0,2}%{year:_$year})?` <br/>(Specifies a format such as **Feb 19, 15**.)
* `usdate2 = %{month:_$month}(?P<sep>[/\-])%{day:_$day}((?:\g<sep>)%{year:_$year})?` <br/>(Specifies a format such as **02/19/15**.)
* `usday = %{day:_$day}(?:st|nd|rd|th|[,\.;])?`
* `year = 20\d\d|19\d\d|[901]\d`
* `YEAR = (?:\d\d){1,2}`
* `zone = ((?:(?:UT|UTC|(?:GMT)?[+-]\d\d?:?(?:\d\d)?)|GMT|CET|CEST|CETDST|MET|MEST|METDST|MEZ|MESZ|EET|EEST|EETDST|WET|WEST|WETDST|MSK|MSD|IST|JST|KST|HKT|AST|ADT|EST|EDT|CST|CDT|MST|MDT|PST|PDT|CAST|CADT|EAST|EADT|WAST|WADT|Z)|(?:GMT)?[+-]\d\d?:?(?:\d\d)?))?`

## Host and port

The following patterns specify host and port formats:
* `HOSTNAME = (?:[0-9A-Za-z][0-9A-Za-z-]{0,62})(?:\.(?:[0-9A-Za-z][0-9A-Za-z-]{0,62}))*(\.?|\b)`
* `HOST = %{HOSTNAME}`
* `HOSTPORT = (?:%{IPORHOST}:%{POSINT})|%{IPPORT}`
* `IPORHOST = (?:%{HOSTNAME}|%{IP})`
* `SYSTEM_PORT = ^0*(?:[1-9]\d{0,3}|[0-2]\d{4}|3[01]\d{3}|32[0-6]\d{2}|327[0-5]\d|3276[0-7])(?:\s|$)` <br/>(Specifies well-known ports from 1-1023. It covers 1|01|001|0001 to 1023, skipping 0, 00, 000, 0000 and > 1024.) 

## IP address

The following patterns specify IP address formats:
* `IP = (?:%{IPV6}|%{IPV4})`
* `IPPORT = (?:(?:\[%{IPV6}\]|%{IPV4}):%{POSINT})`
* `IPV4 = (?:(?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})[.](?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})[.](?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})[.](?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2}))`
* `IPV6 = ((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?`

## Log format

The following patterns specify log formats:
* `BSD_SYSLOG_HEADER = %{SYSLOGFACILITY}%{SYSLOGTIMESTAMP:syslog_timestamp}(?: %{SYSLOGPRIORITY:syslog_priority})? %{SYSLOGHOST:syslog_host}(?: %{DATA:process}(?:\[%{INT:process_id}\])?\:)?`
* `BSD_SYSLOG_MSG = %{BSD_SYSLOG_HEADER} %{GREEDYDATA:_$log_entry}`
* `COMMONAPACHELOG = %{IPORHOST:clientip} %{USER:ident} %{USER:auth} \[%{HTTPDATE:timestamp}\] \"(?:%{WORD:verb} %{NOTSPACE:request}(?: HTTP/%{NUMBER:httpversion})?|%{DATA:rawrequest})\" %{NUMBER:response} (?:%{NUMBER:bytes}|-)`
* `LOGLEVEL = ([Aa]lert|ALERT|[Tt]race|TRACE|[Dd]ebug|DEBUG|[Nn]otice|NOTICE|[Ii]nfo|INFO|[Ww]arn?(?:ing)?|WARN?(?:ING)?|[Ee]rr?(?:or)?|ERR?(?:OR)?|[Cc]rit?(?:ical)?|CRIT?(?:ICAL)?|[Ff]atal|FATAL|[Ss]evere|SEVERE|EMERG(?:ENCY)?|[Ee]merg(?:ency)?)`
* `PROG = (?:[\w._/%-]+)`
* `SYSLOGBASE = %{SYSLOGTIMESTAMP:timestamp} (?:%{SYSLOGFACILITY} )?%{SYSLOGHOST:logsource} %{SYSLOGPROG}:`
* `SYSLOGFACILITY = <%{NONNEGINT:syslog_facility}(?:.%{NONNEGINT:syslog_priority})?>`
* `SYSLOGHOST = %{IPORHOST}`
* `SYSLOGPRIORITY = (?:%{WORD}\.)?(?:[0-7]|[Aa]lert|[Cc]ritical|[Ee]rror|[Ww]arning|[Nn]otice|[Ii]nformational|[Dd]ebug)`
* `SYSLOGPROG = %{PROG:program}(?:\[%{POSINT:pid}\])?`
* `SYSLOGTIMESTAMP = (?:%{MONTH:_$month} +%{MONTHDAY:_$day} %{TIME}( %{YEAR:_$year})?|%{TIMESTAMP_ISO8601})`

## Name

The following patterns specify name formats:
* `USERNAME = [a-zA-Z0-9._-]+`
* `USER = %{USERNAME}`

## Networking

The following patterns specify networking formats:
* `BADMAC = (?:(?:[A-Fa-f0-9]:){5}[A-Fa-f0-9])`
* `CISCOMAC = (?:(?:[A-Fa-f0-9]{4}\.){2}[A-Fa-f0-9]{4})`
* `COMMONMAC = (?:(?:[A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2})`
* `DHCP_INTERFACE = (?:%{IP}|.+?)`
* `MAC = (?:%{CISCOMAC}|%{WINDOWSMAC}|%{COMMONMAC}|%{BADMAC})`
* `WINDOWSMAC = (?:(?:[A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2})`

## Number

The following patterns specify number formats:
* `BASE10NUM = (?:[+-]?(?:(?:[0-9]+(?:\.[0-9]+)?)|(?:\.[0-9]+)))`
* `BASE16FLOAT = (?:[+-]?(?:0x)?(?:(?:[0-9A-Fa-f]+(?:\.[0-9A-Fa-f]*)?)|(?:\.[0-9A-Fa-f]+)))`
* `BASE16NUM =   (?:[+-]?(?:0x)?(?:[0-9A-Fa-f]+))`
* `INT = (?:[+-]?(?:[0-9]+))`
* `NONNEGINT = (?:[0-9]+)`
* `NUMBER = (?:%{BASE10NUM})`
* `POSINT = (?:[1-9][0-9]*)`

## Path

The following patterns specify path formats:
* `PATH = (?:%{UNIXPATH}|%{WINPATH})`
* `TTY = (?:/dev/(pts|tty([pq])?)(\w+)?/?(?:[0-9]+))`
* `UNIXPATH = (?:/(?:[\w_%!$@:.,-]+|\\.)*)+`
* `URI = %{URIPROTO:protocol}://(?:%{USER:user}(?::[^@]*)?@)?(?:%{URIHOST:host})?(?:%{URIPATHPARAM:path})?`
* `URIHOST = %{IPORHOST}(?::%{POSINT:port})?`
* `URIPARAM = \?[A-Za-z0-9$.+!*'|(){},~@#%&/=:;_?\-\[\]]*`
* `URIPATH = (?:/[A-Za-z0-9$.+!*'(){},~:;=@#%_\-]*)+`
* `URIPATHPARAM = %{URIPATH}(?:%{URIPARAM})?`
* `URIPROTO = [A-Za-z]+(\+[A-Za-z+]+)?`
* `WINPATH = (?:[A-Za-z]+:|\\)(?:\\[^\\?*]*)+`

## Text

The following patterns specify text formats:
* `DASHED_WORD = \w+(-\w+)*`
* `NOTSPACE = \S+`
* `SPACE = \s*`
* `WORD = \w+`
