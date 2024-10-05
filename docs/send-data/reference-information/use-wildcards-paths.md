---
id: use-wildcards-paths
title: Using Wildcards in Paths
description: Rather than entering each file by name, using wildcards in the Source path allows you to collect all files of a certain type.
---

Rather than entering each file by name, using wildcards in the Source path allows you to collect all files of a certain type within one or more directories, or many files from many directories. When specifying file names (or paths) in Microsoft Windows and Unix-like operating systems, the asterisk character (`*`) substitutes for any zero or more characters, and the question mark (`?`) substitutes for any one character.

## Specifying paths to collect from

When using wildcards in paths for file collections:
* `*` is a simple, non-recursive wildcard representing zero or more characters which you can use for paths and file names.
* `**` is a recursive wildcard that can only be used with paths, not file names.

## Limitations

* Up to 32 nested symbolic links are allowed within a path expression.
* Multiple recursive expressions within the path are not supported. 

## Examples

* `/var/log/**` will match all files in /var/log and all files in all child directories, recursively.
* `/var/log/**/*.log` will match all files whose names end in .log in /var/log and all files in all child directories, recursively.
* `/home/*/.bashrc` will match all .bashrc files in all user's home directories.
* `/home/*/.ssh/**/*.key` will match all files ending in .key in all user's .ssh directories in all user's home directories.
