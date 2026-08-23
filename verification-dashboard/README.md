# Incident Ledger Verification Dashboard

This directory contains a responsive React/Vite dashboard that turns the Loan-system verification report into an interactive review experience. It presents the completed checks, confirmed findings, code-level evidence, dependency-risk totals, and the recommended remediation order.

## Run locally

Install the locked dependencies and start the development server from this directory:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Run the repository-integrated quality checks with:

```bash
pnpm run check
pnpm run build
```

The dashboard packages its Incident Ledger imagery in `client/public/assets`, so no project-hosted asset URLs are required when the repository is cloned elsewhere.
