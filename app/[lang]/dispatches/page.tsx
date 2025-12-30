import { Metadata } from 'next';
import DispatchesPageContent from '@/components/DispatchesPage';
import { CONFIG } from '@/config';
import { dispatchesList } from '@/data/dispatches';
// Fix case-sensitive import
import { dictionary } from '@/components/dictionary';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === 'en' ? 'en' : 'id';
  return {
    title: `${dictionary.dispatchesTitle[l]} | ${CONFIG.site.title}`,
    description: dictionary.dispatchesDesc[l],
  };
}

export default async function DispatchesPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { lang } = await params;
  const { q, page } = await searchParams;
  const l = lang === 'en' ? 'en' : 'id';
  
  const query = q?.toLowerCase() || '';
  const currentPage = parseInt(page || '1', 10);
  
  // Server-side filtering
  const filtered = dispatchesList.filter(dispatch => {
    if (!query) return true;
    const searchCorpus = `${dispatch.title[l]} ${dispatch.excerpt[l]} ${dispatch.tags.join(' ')}`.toLowerCase();
    return searchCorpus.includes(query);
  });

  const totalPages = Math.ceil(filtered.length / CONFIG.features.paginationLimit);
  const start = (currentPage - 1) * CONFIG.features.paginationLimit;
  const currentItems = filtered.slice(start, start + CONFIG.features.paginationLimit);

  return (
    <DispatchesPageContent 
      initialItems={currentItems} 
      totalPages={totalPages} 
      currentPage={currentPage}
      searchQuery={query}
    />
  );
}