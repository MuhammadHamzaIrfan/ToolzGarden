import os

with open('d:\\Resizur\\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('Resizur', 'ToolzGarden')

with open('d:\\Resizur\\index.html', 'w', encoding='utf-8') as f:
    f.write(content)

tools = [
    "pdf-compress", "pdf-merge", "pdf-split", "pdf-to-image", "image-to-pdf", "pdf-page-remover",
    "word-counter", "character-counter", "case-converter", "text-reverser", "remove-duplicates", "text-to-slug",
    "json-formatter", "json-minifier", "base64-encoder", "url-encoder", "html-encoder"
]

urls = ""
for t in tools:
    urls += f"""    <url>\n        <loc>https://pixtools.github.io/tools/{t}.html</loc>\n        <lastmod>2024-05-14</lastmod>\n        <priority>0.8</priority>\n    </url>\n"""

with open('d:\\Resizur\\sitemap.xml', 'r', encoding='utf-8') as f:
    sitemap = f.read()

if "pdf-compress" not in sitemap:
    sitemap = sitemap.replace('</urlset>', urls + '</urlset>')
    with open('d:\\Resizur\\sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(sitemap)
