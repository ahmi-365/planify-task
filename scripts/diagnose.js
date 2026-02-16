import fs from 'fs';
import path from 'path';

console.log('[v0] Diagnosing project...');

// Check if critical files exist
const criticalFiles = [
  'package.json',
  'package-lock.json',
  'index.html',
  'src/main.tsx',
  'src/App.tsx',
  'vite.config.ts',
  'tailwind.config.ts',
];

console.log('[v0] Checking critical files:');
criticalFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`  ${exists ? '✓' : '✗'} ${file}`);
});

// Check node_modules
const nodeModulesExists = fs.existsSync('node_modules');
console.log(`\n[v0] node_modules exists: ${nodeModulesExists}`);

// Check package.json has dev script
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
console.log(`\n[v0] Package.json dev script:`, packageJson.scripts?.dev || 'NOT FOUND');
console.log(`[v0] Package.json build script:`, packageJson.scripts?.build || 'NOT FOUND');

// List some dependencies
console.log(`\n[v0] Key dependencies:`);
const deps = packageJson.dependencies;
console.log(`  vite: ${deps.vite || 'NOT FOUND'}`);
console.log(`  react: ${deps.react || 'NOT FOUND'}`);
console.log(`  react-dom: ${deps['react-dom'] || 'NOT FOUND'}`);
console.log(`  @vitejs/plugin-react-swc: ${deps['@vitejs/plugin-react-swc'] || 'NOT FOUND'}`);

console.log('\n[v0] Diagnosis complete');
