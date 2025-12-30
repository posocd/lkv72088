
import { dispatchesList, loadDispatchContent } from '@/data/dispatches';
import { CONFIG } from '@/config';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lang: string; slug: string }> }
) {
  const { lang, slug } = await params;
  const post = dispatchesList.find((p) => p.slug === slug);
  
  if (!post) {
    return new Response('Node not found', { status: 404 });
  }
  
  const l = (lang === 'en' || lang === 'id') ? lang : 'id';
  const content = await loadDispatchContent(post.id);
  
  const transformToAmpHtml = (text: string) => {
    return text.split('\n\n').map(p => {
      let clean = p.trim();
      if (!clean) return '';
      
      if (clean.startsWith('## ')) return `<h2 class="amp-h2">${clean.replace('## ', '')}</h2>`;
      if (clean.startsWith('### ')) return `<h3 class="amp-h3">${clean.replace('### ', '')}</h3>`;
      if (clean.startsWith('> ')) return `<blockquote class="amp-quote">${clean.replace('> ', '')}</blockquote>`;
      clean = clean.replace(/\*\*(.*?)\*\*/g, '<strong class="amp-bold">$1</strong>');
      clean = clean.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="amp-link">$1</a>');
      if (clean.includes('TRANSMISSION') || clean.includes('TRANSMISI')) {
        return `<div class="amp-transmission"><span>${clean.replace(/[\[\]]/g, '')}</span></div>`;
      }
      return `<p class="amp-p">${clean}</p>`;
    }).join('');
  };

  const ampHtmlContent = content ? transformToAmpHtml(content[l]) : '';
  const canonicalUrl = `${CONFIG.site.url}/${l}/${slug}/`;

  const ampHtml = `<!doctype html>
<html ⚡ lang="${l}">
<head>
  <meta charset="utf-8">
  <title>${post.title[l]} | ${CONFIG.site.title}</title>
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <style amp-custom>
    body { background: #050505; color: #f3f4f6; font-family: ui-monospace, monospace; padding: 20px; line-height: 1.8; font-size: 16px; }
    .container { max-width: 700px; margin: 0 auto; }
    .label { color: #22c55e; font-size: 10px; font-weight: 900; letter-spacing: 0.3em; margin-bottom: 30px; border-bottom: 1px solid #1f2937; padding-bottom: 10px; text-transform: uppercase; }
    h1 { font-size: 32px; color: #22c55e; line-height: 1.1; margin-bottom: 20px; font-weight: 900; }
    .meta { color: #6b7280; font-size: 12px; margin-bottom: 40px; border-left: 2px solid #22c55e; padding-left: 15px; }
    .content { color: #d1d5db; }
    .amp-p { margin-bottom: 1.5rem; }
    .amp-h2 { color: #ffffff; margin-top: 2.5rem; margin-bottom: 1rem; font-size: 24px; border-bottom: 1px solid #1f2937; padding-bottom: 10px; }
    .amp-quote { border-left: 3px solid #22c55e; padding: 20px; font-style: italic; background: rgba(31, 41, 55, 0.4); }
    .amp-bold { color: #22c55e; }
    .amp-link { color: #22c55e; text-decoration: none; border-bottom: 1px dotted #22c55e; }
    .amp-transmission { text-align: center; margin: 3rem 0; }
    .amp-transmission span { color: #22c55e; font-weight: 900; letter-spacing: 0.3em; border-bottom: 2px solid #22c55e; font-size: 11px; }
    footer { margin-top: 80px; padding: 40px 0; border-top: 1px solid #1f2937; text-align: center; color: #4b5563; font-size: 10px; letter-spacing: 0.25em; }
  </style>
</head>
<body>
  <div class="container">
    <div class="label">SECURE_NODE // V5.5_AMP</div>
    <h1>${post.title[l]}</h1>
    <div class="meta">
      SRC: ${post.author.toUpperCase()}<br>
      TS: ${post.timestamp}
    </div>
    <amp-img src="${post.imageUrl}" width="700" height="400" layout="responsive" alt="${post.title[l]}"></amp-img>
    <div class="content">
      ${ampHtmlContent}
    </div>
    <footer>
      &copy; ${new Date().getFullYear()} ${CONFIG.site.title.toUpperCase()} // END_OF_TRANSMISSION
    </footer>
  </div>
</body>
</html>`;

  return new Response(ampHtml, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
