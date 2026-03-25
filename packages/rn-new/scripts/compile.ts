import { mkdir, writeFile, chmod } from 'node:fs/promises';
import { join } from 'node:path';

async function compile() {
  const binDir = join(import.meta.dir, '..', 'bin');
  const binFile = join(binDir, 'rn-new.js');

  try {
    await mkdir(binDir, { recursive: true });

    const content = `#!/usr/bin/env node

try {
  require("create-expo-stack/bin/create-expo-stack.js");
} catch (error) {
  console.error("Error: Could not find create-expo-stack package.");
  console.error("Please ensure create-expo-stack is installed globally.");
  process.exit(1);
}
`;

    await writeFile(binFile, content);

    // chmod +x (doesn't hurt on Windows, helps on others)
    try {
      await chmod(binFile, 0o755);
    } catch (_err) {
      // Ignore errors on platforms where chmod is not supported
    }

    console.log('Successfully compiled rn-new.js');
  } catch (error) {
    console.error('Failed to compile rn-new.js:', error);
    process.exit(1);
  }
}

compile();
