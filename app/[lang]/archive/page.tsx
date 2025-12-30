import { Metadata } from 'next';
import ArchivePageContent from '@/components/ArchivePage';
import { CONFIG } from '@/config';
import { archiveData } from '@/data/archive';
// Fix case-sensitive import
import { dictionary } from '@/components/dictionary';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === 'en' ? 'en' : 'id';
  return {
    title: `${dictionary.archiveTitle[l]} | ${CONFIG.site.title}`,
    description: dictionary.archiveSubtitle[l],
    robots: 'noindex, nofollow',
  };
}

export default async function ArchivePage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const { q, page } = await searchParams;
  const query = q?.toLowerCase() || '';
  const currentPage = parseInt(page || '1', 10);

  const filtered = archiveData.filter(item => 
    !query || item.title.toLowerCase().includes(query) || item.id.toLowerCase().includes(query)
  );

  const totalPages = Math.ceil(filtered.length / CONFIG.features.paginationLimit);
  const start = (currentPage - 1) * CONFIG.features.paginationLimit;
  const currentItems = filtered.slice(start, start + CONFIG.features.paginationLimit);

  return (
    <ArchivePageContent 
      initialItems={currentItems} 
      totalPages={totalPages} 
      currentPage={currentPage} 
      searchQuery={query}
    />
  );
}