# PDS CLI

Minimal CLI to generate PDS artifacts and optionally watch a config file.

Commands:

- `pds-cli generate --config ./pds.config.js --out ./public/pds`
- `pds-cli watch --config ./pds.config.js --out ./public/pds`

Notes:

- The `--config` can be a JS/JSON file resolving to your PDS configuration.
- Output includes constructable stylesheet modules (pds-*.css.js) and plain CSS files.

This CLI is intentionally tiny and uses the repository's `pds-api` and `fs-writer` utilities.

## pds-import

`pds-import` runs the same import pipeline used by live edit and writes a JSON result file.

### Modes

- `convert-only`: converts source input to PDS-friendly HTML only
- `adopt-design-and-convert`: converts HTML and also infers a design patch (`designPatch`)

### Usage

```bash
# HTML conversion only
pds-import \
	--type tailwind-html \
	--mode convert-only \
	--source ./input.html \
	--out ./out/import-result.json

# Convert HTML + infer/adopt styles
pds-import \
	--type tailwind-html \
	--mode adopt-design-and-convert \
	--source ./input.html \
	--out ./out/import-result.json

# Brand guideline text + style adoption
pds-import \
	--type brand-guidelines \
	--mode adopt-design-and-convert \
	--source ./brand.txt \
	--out ./out/brand-import.json
```

### Output locations

- `--out <path>` (required): writes the full import result JSON to the provided path
- `--html-out <path>` (optional): writes `result.template.html` to that file (if template exists)
- `--design-out <path>` (optional): writes `result.designPatch` JSON to that file

All output paths are resolved relative to your current working directory and parent directories are created automatically.

### Result shape

The full JSON (`--out`) includes:

- `template.html` for converted markup (when available)
- `designPatch` for inferred style config updates (mode-dependent)
- `issues[]` and `confidence`
- `meta.validationBlocked` when style adoption is rejected by accessibility checks
