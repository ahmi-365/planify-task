import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const lockFilePath = path.join(projectRoot, 'package-lock.json');

console.log('[v0] Starting npm lock file regeneration...');

// Remove existing lock file if it exists
if (fs.existsSync(lockFilePath)) {
  console.log('[v0] Removing existing package-lock.json');
  fs.unlinkSync(lockFilePath);
}

try {
  console.log('[v0] Running npm install to generate fresh lock file...');
  execSync('npm install', { 
    stdio: 'inherit',
    cwd: projectRoot
  });
  console.log('[v0] Successfully regenerated package-lock.json');
} catch (error) {
  console.error('[v0] Error during npm install:', error.message);
  process.exit(1);
}
