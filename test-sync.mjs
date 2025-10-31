#!/usr/bin/env node

// Test script to verify package exports work correctly
// Run this from a consumer app context to test sync functionality

import { syncAssets } from '@pure-ds/core/sync-assets';

console.log('🧪 Testing PDS sync functionality...');

try {
  const result = await syncAssets({
    dryRun: true,
    verbose: true
  });
  
  console.log('✅ Sync test completed successfully!');
  console.log('📊 Results:', result);
} catch (error) {
  console.error('❌ Sync test failed:', error.message);
  process.exit(1);
}