#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

try {
  require('create-expo-stack/bin/create-expo-stack.js');
} catch {
  console.error('Error: Could not find create-expo-stack package.');
  console.error('Please ensure create-expo-stack is installed globally.');
  process.exit(1);
}
