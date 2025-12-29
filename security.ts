import { EncryptedPayload } from './types';

/**
 * Validates if a string is a potentially valid base64 encoded string.
 */
function isValidBase64(str: string): boolean {
  if (!str || str.length % 4 !== 0) return false;
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  return base64Regex.test(str);
}

/**
 * Decrypts data using AES-256-GCM with PBKDF2 key derivation.
 * This runs securely in the browser using the Web Crypto API.
 */
export async function decryptArchive(
  payload: EncryptedPayload,
  password: string
): Promise<string> {
  // Guard clause for Server-Side Rendering
  if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
    throw new Error("Web Crypto API not available in this environment");
  }

  // Pre-validation to avoid atob() crashes
  if (!isValidBase64(payload.salt) || !isValidBase64(payload.iv) || !isValidBase64(payload.cipher)) {
    throw new Error("Invalid encrypted payload format");
  }

  const enc = new TextEncoder();
  const dec = new TextDecoder();

  try {
    // 1. Decode Base64 components to Uint8Arrays
    const salt = Uint8Array.from(atob(payload.salt), c => c.charCodeAt(0));
    const iv = Uint8Array.from(atob(payload.iv), c => c.charCodeAt(0));
    const ciphertext = Uint8Array.from(atob(payload.cipher), c => c.charCodeAt(0));

    // 2. Import the password as key material
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );

    // 3. Derive the AES-GCM Key using PBKDF2
    // Must match the parameters used in the build script (scripts/generate-archives.mjs)
    const key = await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000, // High iteration count to slow down brute-force
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );

    // 4. Decrypt the ciphertext
    // AES-GCM automatically verifies the integrity (Auth Tag).
    // If the password is wrong, this will throw a 'OperationError'.
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      key,
      ciphertext
    );

    return dec.decode(decryptedBuffer);

  } catch (error) {
    // If decryption fails (wrong password or tampered data), throw error
    console.error("Archive Decryption Error:", error);
    throw new Error("Decryption failed: Incorrect key or corrupted data.");
  }
}