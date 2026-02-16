#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();

console.log('[v0] Regenerating package-lock.json...');

try {
  // Run npm install to regenerate the lock file
  execSync('npm install', {
    stdio: 'inherit',
    cwd: projectRoot,
  });
  console.log('[v0] Successfully regenerated package-lock.json');
} catch (error) {
  console.error('[v0] Error regenerating lock file:', error.message);
  process.exit(1);
}
