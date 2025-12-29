import { dispatchesList, loadDispatchContent } from '@/data/dispatches';
import { CONFIG } from '@/config';
import { dictionary } from '@/data/languages';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lang: string; slug: string }> }
) {
  const { lang, slug } = await params;
  const post = dispatchesList.find((p) => p.slug === slug);
  
  if (!post) {
    return new Response('Not Found', { status: 404 });
  }
  
  const l = (lang === 'en' || lang === 'id') ? lang : 'id';
  const content = await loadDispatchContent(post.id);
  
  // AMP-safe content transformation - converts markdown-like syntax to AMP safe HTML
  const transformToAmpHtml = (text: string) => {
    return text.split('\n\n').map(p => {
      let clean = p.trim();
      if (!clean) return '';
      
      // Handle Headers
      if (clean.startsWith('## ')) return `<h2 class="amp-h2">${clean.replace('## ', '')}</h2>`;
      if (clean.startsWith('### ')) return `<h3 class="amp-h3">${clean.replace('### ', '')}</h3>`;
      
      // Handle Blockquotes
      if (clean.startsWith('> ')) return `<blockquote class="amp-quote">${clean.replace('> ', '')}</blockquote>`;

      // Handle Bold
      clean = clean.replace(/\*\*(.*?)\*\*/g, '<strong class="amp-bold">$1</strong>');
      
      // Handle Links
      clean = clean.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="amp-link">$1</a>');
      
      // Handle Transmission markers
      if (clean.includes('TRANSMISSION') || clean.includes('TRANSMISI')) {
        return `<div class="amp-transmission"><span>${clean.replace(/[\[\]]/g, '')}</span></div>`;
      }

      return `<p class="amp-p">${clean}</p>`;
    }).join('');
  };

  const ampHtmlContent = content ? transformToAmpHtml(content[l]) : '';
  const canonicalUrl = `${CONFIG.site.url}/${l}/${slug}/`;

  // Pure HTML response to bypass Next.js hydration scripts (Strictly required for AMP)
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
    body { 
      background: #050505; 
      color: #f3f4f6; 
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; 
      padding: 20px; 
      line-height: 1.8; 
      font-size: 16px; 
      -webkit-font-smoothing: antialiased;
    }
    .container { max-width: 700px; margin: 0 auto; padding: 20px 0; }
    .label { color: #facc15; font-size: 10px; font-weight: 900; letter-spacing: 0.3em; margin-bottom: 30px; border-bottom: 1px solid #1f2937; padding-bottom: 10px; text-transform: uppercase; }
    h1 { font-size: 32px; color: #facc15; line-height: 1.1; margin-bottom: 20px; font-weight: 900; letter-spacing: -0.02em; }
    .meta { color: #6b7280; font-size: 12px; margin-bottom: 40px; border-left: 2px solid #facc15; padding-left: 15px; font-weight: bold; }
    .content { color: #d1d5db; margin-top: 30px; }
    .amp-p { margin-bottom: 1.5rem; }
    .amp-h2 { color: #ffffff; margin-top: 2.5rem; margin-bottom: 1rem; font-size: 24px; font-weight: 900; border-bottom: 1px solid #1f2937; padding-bottom: 10px; }
    .amp-h3 { color: #facc15; margin-top: 2rem; margin-bottom: 0.75rem; font-size: 20px; font-weight: 700; }
    .amp-quote { border-left: 3px solid #facc15; padding-left: 20px; font-style: italic; color: #9ca3af; margin: 2rem 0; background: rgba(31, 41, 55, 0.4); padding: 20px; }
    .amp-bold { color: #facc15; font-weight: bold; }
    .amp-link { color: #facc15; text-decoration: none; border-bottom: 1px dotted #facc15; }
    .amp-transmission { text-align: center; margin: 3rem 0; }
    .amp-transmission span { color: #facc15; font-weight: 900; letter-spacing: 0.3em; border-bottom: 2px solid #facc15; padding-bottom: 5px; font-size: 11px; text-transform: uppercase; }
    footer { margin-top: 80px; padding: 40px 0; border-top: 1px solid #1f2937; text-align: center; color: #4b5563; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="container">
    <div class="label">${dictionary.dataTransmission[l]} // PROTOCOL_AMP_V5</div>
    <h1>${post.title[l]}</h1>
    <div class="meta">
      ORIGIN: ${post.author.toUpperCase()}<br>
      STAMP: ${post.timestamp}
    </div>
    <amp-img src="${post.imageUrl}" width="700" height="400" layout="responsive" alt="${post.title[l]}"></amp-img>
    <div class="content">
      ${ampHtmlContent}
    </div>
    <footer>
      &copy; ${new Date().getFullYear()} ${CONFIG.site.title.toUpperCase()} // DECENTRALIZED_NODE // SECURED
    </footer>
  </div>
</body>
</html>`;

  return new Response(ampHtml, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
