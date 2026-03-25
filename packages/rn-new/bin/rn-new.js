#!/usr/bin/env node

try {
  require('create-expo-stack/bin/create-expo-stack.js');
} catch (_error) {
  console.error('Error: Could not find create-expo-stack package.');
  console.error('Please ensure create-expo-stack is installed globally.');
  process.exit(1);
}
