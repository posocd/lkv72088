
import { ArchiveItemSource } from '../../types';

export const op002: ArchiveItemSource = { 
  id: 'op002', 
  title: 'INV/LV/000002', 
  description: {
    en: 'Executed a full-spectrum penetration test on a Fortune 500 financial institution.',
    id: 'Melaksanakan uji penetrasi spektrum penuh pada lembaga keuangan Fortune 500.'
  },
  tags: ['Pentesting', 'Red Team', 'Security'], 
  status: 'Completed', 
  // Password for AES Encryption (removed in build)
  password: 'classified' 
};