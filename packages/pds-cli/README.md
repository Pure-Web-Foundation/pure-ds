# PDS CLI

Minimal CLI to generate PDS artifacts and optionally watch a config file.

Commands:

- `pds-cli generate --config ./pds.config.js --out ./public/pds`
- `pds-cli watch --config ./pds.config.js --out ./public/pds`

Notes:

- The `--config` can be a JS/JSON file resolving to your PDS configuration.
- Output includes constructable stylesheet modules (pds-*.css.js) and plain CSS files.

This CLI is intentionally tiny and uses the repository's `pds-api` and `fs-writer` utilities.
