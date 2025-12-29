
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import process from 'process';
import { Buffer } from 'buffer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const ARCHIVES_DIR = path.resolve(PROJECT_ROOT, 'data/archives');
const OUTPUT_FILE = path.resolve(PROJECT_ROOT, 'data/archive.ts');
const CACHE_DIR = path.resolve(PROJECT_ROOT, '.cache');
const CACHE_FILE = path.resolve(CACHE_DIR, 'archives.json');

/**
 * Encrypts text using AES-256-GCM with PBKDF2 key derivation.
 * Compatible with Web Crypto API for client-side decryption.
 */
function encryptAES(text, password) {
  if (!text) return { cipher: '', iv: '', salt: '' };

  // 1. Generate random Salt (16 bytes) and IV (12 bytes)
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);

  // 2. Derive Key using PBKDF2 (Must match client parameters)
  // 100,000 iterations, 32 bytes (256 bits) key length, SHA-256 digest
  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');

  // 3. Encrypt using AES-256-GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
  // Update and Finalize
  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final()
  ]);

  // Get Auth Tag (integrity check)
  const tag = cipher.getAuthTag();

  // Combine Encrypted Data + Auth Tag (Web Crypto expects tag at end of ciphertext)
  const finalCiphertext = Buffer.concat([encrypted, tag]).toString('base64');

  return {
    cipher: finalCiphertext,
    iv: iv.toString('base64'),
    salt: salt.toString('base64')
  };
}

/**
 * Helper to extract string property from a text block.
 * Supports single quotes, double quotes, and backticks.
 */
function extractProperty(block, key) {
  // Regex to find key: 'value', key: "value", or key: `value`
  const regex = new RegExp(`${key}\\s*:\\s*(?:'([^']*)'|"([^"]*)"|\`([^\`]*)\`)`);
  const match = block.match(regex);
  return match ? (match[1] || match[2] || match[3]) : '';
}

/**
 * Calculate SHA-256 hash of file content
 */
function calculateHash(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

const generate = () => {
  console.log('[Generator] Syncing archives (Incremental Build)...');

  if (!fs.existsSync(ARCHIVES_DIR)) {
    console.warn(`[Generator] Directory not found: ${ARCHIVES_DIR}`);
    // @ts-ignore
    process.exit(1);
  }

  // Ensure cache directory exists
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }

  // Load existing cache
  let cache = {};
  if (fs.existsSync(CACHE_FILE)) {
    try {
      cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    } catch (e) {
      console.warn('[Cache] Archive cache corrupted, rebuilding from scratch.');
    }
  }

  // 1. READ AND SORT FILES (DESCENDING)
  // We sort by filename descending (b.localeCompare(a)) to ensure higher IDs 
  // (like op002) come before lower IDs (like op001).
  const files = fs.readdirSync(ARCHIVES_DIR)
    .filter(file => 
      file.endsWith('.ts') && 
      !file.startsWith('index') && 
      !file.startsWith('_')
    )
    .sort((a, b) => b.localeCompare(a)); // Changed from .sort() to Descending

  const processedItems = [];
  const newCache = {};
  let cachedCount = 0;
  let processedCount = 0;

  files.forEach(file => {
    const filePath = path.join(ARCHIVES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const contentHash = calculateHash(content);

    // Check Cache
    if (cache[file] && cache[file].hash === contentHash) {
        // Cache Hit: Use pre-calculated output string
        processedItems.push(cache[file].output);
        newCache[file] = cache[file];
        cachedCount++;
        return;
    }

    // Cache Miss: Process File
    processedCount++;
    // console.log(`[Generator] Processing ${file}...`);

    // 1. Extract Root ID
    const idMatch = content.match(/id:\s*'([^']+)'/);
    const id = idMatch ? idMatch[1] : null;

    // 2. Extract Plaintext Password
    const passMatch = content.match(/password:\s*'([^']+)'/);
    const plainPassword = passMatch ? passMatch[1] : null;

    if (!id || !plainPassword) {
      console.warn(`[Generator] Skipping ${file}: Missing ID or Password.`);
      return;
    }

    // 3. Robust Description Extraction
    let descEn = '';
    let descId = '';
    
    const descKeyword = 'description:';
    const descStartIdx = content.indexOf(descKeyword);

    if (descStartIdx !== -1) {
      let openBraceIdx = content.indexOf('{', descStartIdx);
      if (openBraceIdx !== -1) {
        let braceCount = 1;
        let cursor = openBraceIdx + 1;
        let descContent = '';

        while (cursor < content.length && braceCount > 0) {
          const char = content[cursor];
          if (char === '{') braceCount++;
          else if (char === '}') braceCount--;
          
          if (braceCount > 0) descContent += char;
          cursor++;
        }

        descEn = extractProperty(descContent, 'en');
        descId = extractProperty(descContent, 'id');
      }
    }

    // 4. Extract other metadata
    const title = extractProperty(content, 'title') || 'Unknown';
    const status = extractProperty(content, 'status') || 'Processing';
    
    const tagsMatch = content.match(/tags:\s*\[(.*?)\]/s);
    const tagsRaw = tagsMatch ? tagsMatch[1] : '';
    const tags = tagsRaw.split(',').map(t => t.trim().replace(/['"]/g, '')).filter(t => t);

    // --- ENCRYPTION PHASE (Slow) ---
    const encryptedEn = encryptAES(descEn, plainPassword);
    const encryptedId = encryptAES(descId, plainPassword);

    // Construct the Safe Item
    const itemString = `{
    id: '${id}',
    title: '${title}',
    status: '${status}',
    tags: ${JSON.stringify(tags)},
    description: {
      en: ${JSON.stringify(encryptedEn)},
      id: ${JSON.stringify(encryptedId)}
    }
  }`;

    processedItems.push(itemString);
    
    // Update New Cache
    newCache[file] = {
        hash: contentHash,
        output: itemString
    };
  });

  // Save updated cache
  fs.writeFileSync(CACHE_FILE, JSON.stringify(newCache, null, 2));

  const outputContent = `
// -----------------------------------------------------------------------------
// THIS FILE IS AUTO-GENERATED BY scripts/generate-archives.mjs
// DO NOT EDIT MANUALLY.
//
// DATA SECURITY:
// - Descriptions are AES-256-GCM Encrypted.
// - Keys derived via PBKDF2 (100k iterations).
// - Plaintext passwords are STRIPPED from this file.
// -----------------------------------------------------------------------------

import { ArchiveItem } from '../types';

export const archiveData: ArchiveItem[] = [
  ${processedItems.join(',\n  ')}
];
`;

  fs.writeFileSync(OUTPUT_FILE, outputContent.trim() + '\n');
  console.log(`[Generator] Archives sync complete. Cached: ${cachedCount}, Processed: ${processedCount}.`);
};

generate();
