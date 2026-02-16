import { execSync } from 'child_process';
import fs from 'fs';

console.log('[v0] Syncing package.json and package-lock.json...');

try {
  // First, let's remove the lock file so npm will regenerate it
  if (fs.existsSync('package-lock.json')) {
    fs.unlinkSync('package-lock.json');
    console.log('[v0] Removed package-lock.json');
  }
  
  // Run npm install with --legacy-peer-deps to avoid conflicts
  console.log('[v0] Running npm install to regenerate lock file...');
  execSync('npm install --legacy-peer-deps --no-audit 2>&1', { stdio: 'inherit', shell: '/bin/bash' });
  
  console.log('[v0] Package sync complete!');
} catch (error) {
  console.error('[v0] Error syncing packages:', error.message);
}
