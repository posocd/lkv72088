
import { Metadata } from 'next';
import { dispatchesList } from '@/data/dispatches';
import PostPageContent from '@/components/post/PostPage';
import { notFound } from 'next/navigation';
import { CONFIG } from '@/config';

export async function generateStaticParams() {
  const params = [];
  for (const post of dispatchesList) {
    params.push({ lang: 'en', slug: post.slug });
    params.push({ lang: 'id', slug: post.slug });
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = dispatchesList.find((p) => p.slug === slug);
  if (!post) return { title: 'Not Found' };
  const l = lang === 'en' ? 'en' : 'id';

  return {
    title: `${post.title[l]} | ${CONFIG.site.title}`,
    description: post.excerpt[l],
    openGraph: {
      images: [post.imageUrl],
      type: 'article',
      publishedTime: new Date(post.timestamp).toISOString(),
      authors: [post.author],
    },
    alternates: {
      canonical: `${CONFIG.site.url}/${l}/${slug}/`,
    },
  };
}

export default async function DispatchPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const post = dispatchesList.find((p) => p.slug === slug);
  if (!post) notFound();

  const l = lang === 'en' ? 'en' : 'id';
  
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": post.title[l],
    "image": [post.imageUrl],
    "datePublished": new Date(post.timestamp).toISOString(),
    "author": {
      "@type": "Organization",
      "name": post.author,
      "url": `${CONFIG.site.url}/${l}/about/`
    },
    "publisher": {
      "@type": "Organization",
      "name": CONFIG.site.title,
      "logo": {
        "@type": "ImageObject",
        "url": `${CONFIG.site.url}${CONFIG.assets.logo}`
      }
    },
    "description": post.excerpt[l]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <PostPageContent postSummary={post} />
    </>
  );
}
