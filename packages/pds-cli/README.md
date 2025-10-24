# PDS CLI

Minimal CLI to generate PDS artifacts and watch a config file.

Commands:

- `pds-cli generate --config ./pds.config.json --out ./public/pds`
- `pds-cli watch --config ./pds.config.json --out ./public/pds`

This CLI is intentionally tiny and depends on the repository's `pds-api` and `fs-writer` utilities.
