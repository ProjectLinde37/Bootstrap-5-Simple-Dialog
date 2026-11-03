# Changelog

All notable changes to Goosse Dialog are documented here.

## [1.1] – 2026-11-03

### Added

- **String shorthand** — `goosseDialog.confirm('message')` and `goosseDialog.alert('message')` are normalized to `{ message }`

### Changed

- **Unknown `type` falls back to `warning`** instead of the destructive `danger` styling (a typo no longer looks like a delete action)

## [1.0] – 2026-11-03

### Added

- `goosseDialog.version` — readable module version
- Initial release: standalone Bootstrap 5 confirm/alert dialog module
- API: `goosseDialog.confirm(options)` and `goosseDialog.alert(options)`
- Dialog types: `info`, `warning` (default), `danger`, `success`
- Custom icon support (any valid HTML: Tabler, SVG, img)
- Promise-aware `onConfirm` (`false` keeps the dialog open)
- Singleton guard (one dialog at a time, warns via `goosseToast` when available)
- XSS-safe rendering (HTML escaping for title, message and button text)
- Configurable icons and duplicate warning via `goosseDialog.config`
