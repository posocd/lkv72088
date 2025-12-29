
import { dispatchesList } from '@/data/dispatches';
import { CONFIG } from '@/config';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;
  const l = lang === 'en' ? 'en' : 'id';
  const baseUrl = CONFIG.site.url;

  const items = dispatchesList
    .map((post) => `
      <item>
        <title><![CDATA[${post.title[l]}]]></title>
        <link>${baseUrl}/${l}/${post.slug}/</link>
        <guid>${baseUrl}/${l}/${post.slug}/</guid>
        <pubDate>${new Date(post.timestamp).toUTCString()}</pubDate>
        <description><![CDATA[${post.excerpt[l]}]]></description>
      </item>
    `)
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${CONFIG.site.title} // ${CONFIG.site.tagline[l]}</title>
        <link>${baseUrl}/${l}/</link>
        <description>${CONFIG.site.description[l]}</description>
        <language>${l}</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${baseUrl}/${l}/rss.xml" rel="self" type="application/rss+xml" />
        ${items}
      </channel>
    </rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
