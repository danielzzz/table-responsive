#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const pkgPath = path.join(root, 'package.json');
const original = fs.readFileSync(pkgPath, 'utf8');
const pkg = JSON.parse(original);

pkg.name = '@danielzzz/table-responsive';
pkg.publishConfig = {
  registry: 'https://npm.pkg.github.com',
};

fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

const result = spawnSync(
  'npm',
  ['publish', '--registry', 'https://npm.pkg.github.com'],
  {
    cwd: root,
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_AUTH_TOKEN: process.env.GITHUB_TOKEN || process.env.NODE_AUTH_TOKEN,
    },
  }
);

fs.writeFileSync(pkgPath, original);

if (result.status !== 0) {
  process.exit(result.status || 1);
}
