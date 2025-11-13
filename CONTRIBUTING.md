# Contributing to Pure Design System (PDS)

Thanks for your interest in contributing! We welcome issues, discussions, and pull requests.

## Getting started

- Requirements: Node.js 18+ and npm 9+
- Install dependencies:
  - `npm ci`
- Build:
  - `npm run build`
- Dev (watch):
  - `npm run dev`

## Project layout

- Core sources: `src/js/**`
- Public runtime bundle: `public/assets/js/pds.js`
- Static exports (for hosting): `public/pds/` (components, styles, icons)
- CLI tools: `packages/pds-cli/bin/`

## Making changes

1. Fork and create a feature branch: `feat/your-idea` or `fix/your-bug`
2. Keep PRs focused and small; include rationale in the description
3. Update docs when behavior changes (README, GETTING-STARTED, etc.)
4. Add examples or minimal tests where applicable (even a small demo in `public/_test/` helps)

## Commit messages

We encourage Conventional Commits:

- `feat: add configurable theme storage key`
- `fix: avoid double registration in auto-define`
- `docs: clarify static export paths`
- `refactor: simplify event payloads`

This keeps history readable and enables automated changelogs later.

## Pull request checklist

- [ ] Builds locally with `npm run build`
- [ ] Updated docs (if needed)
- [ ] No large, unrelated diffs (format-only changes avoid churning)

## Reporting bugs and proposing features

- Use GitHub Issues. Please include:
  - What you did and what you expected
  - Minimal reproduction (repo, codesandbox, or snippet)
  - Environment details (browser, bundler, OS)

## Code of Conduct

This project follows our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Security issues

Please see [SECURITY.md](./SECURITY.md) for how to report vulnerabilities.
