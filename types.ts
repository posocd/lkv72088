
export type Page = 'home' | 'about' | 'services' | 'archive' | 'contact' | 'dispatches' | 'privacy' | 'notFound' | 'sitemap';

export interface EncryptedPayload {
  cipher: string; // Base64 ciphertext + auth tag
  iv: string;     // Base64 Initialization Vector
  salt: string;   // Base64 Salt for key derivation
}

export interface ArchiveItem {
  id: string;
  title: string;
  // Description is now strictly encrypted payloads
  description: {
    en: EncryptedPayload;
    id: EncryptedPayload;
  };
  tags: string[];
  status: 'Completed' | 'Classified' | 'Processing';
  // Password is removed from the runtime bundle.
  // It is used only during the build process to generate the encrypted payload.
  password?: string; 
}

// Interface for source archive files before encryption
export interface ArchiveItemSource {
  id: string;
  title: string;
  description: {
    en: string;
    id: string;
  };
  tags: string[];
  status: 'Completed' | 'Classified' | 'Processing';
  password: string; 
}

export interface LocalizedContent {
  en: string;
  id: string;
}

export interface Dispatch {
  id: string;
  slug: string;
  title: LocalizedContent;
  author: string;
  timestamp: string;
  excerpt: LocalizedContent;
  content: LocalizedContent;
  tags: string[];
  imageUrl: string;
  promotionIds?: number[];
}

// Lightweight version for lists and routing (excludes heavy content)
export type DispatchSummary = Omit<Dispatch, 'content'>;
