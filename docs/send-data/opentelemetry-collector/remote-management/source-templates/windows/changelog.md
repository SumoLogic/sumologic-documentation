---
id: changelog
title: Changelog
sidebar_label: Changelog
description: Changelog for Windows source template for OpenTelemetry.
---

## [6.1.0] - 2024-10-26
### Added
- Seperate section for Log and metrics with enable/disable functionality
- Masking support for windows event log
- Minor UI changes

## [5.0.0] - 2024-10-16

### Fix
- Fix : Removal of whitespace if any, in custom windows event channel name to make validation pass through OpenTelemetry collector.

## [3.0.0] - 2024-10-01

### Added
- Changelog link and compatibility declaration for OpenTelemetry collector

## [2.0.0] - 2024-08-08

### Fixed
- Removing option for metric collection interval which are less then 1 minute.

## [1.1.2] - 2024-05-03

### Added
- Processing rules (Filtering) capability for logs and metrics.

## [1.0.0] - 2024-04-05

### Added
- Initial version of Windows source template.