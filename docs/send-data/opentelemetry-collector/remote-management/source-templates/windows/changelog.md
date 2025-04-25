---
id: changelog
title: Changelog
sidebar_label: Changelog
description: Changelog for Windows source template for OpenTelemetry.
---

## [6.1.2] - 2025-04-23
### Added
- FAQ for source template
### Fixed
- Warning for channel name addition in custom channel list.

## [6.1.1] - 2025-01-27
### Fixed
- Schema validations

## [6.1.0] - 2024-10-26
### Added
- Separate section for logs and metrics with enable or disable functionality.
- Masking support for Windows event log.
- Minor UI changes.

## [5.0.0] - 2024-10-16

### Fix
- Removal of whitespace if any, in custom Windows event channel name to make validation pass through OpenTelemetry collector.

## [3.0.0] - 2024-10-01

### Added
- Changelog link and compatibility declaration for OpenTelemetry collector.

## [2.0.0] - 2024-08-08

### Fixed
- Removing option for metric collection interval which are less then 1 minute.

## [1.1.2] - 2024-05-03

### Added
- Processing rules (Filtering) capability for logs and metrics.

## [1.0.0] - 2024-04-05

### Added
- Initial version of Windows source template.