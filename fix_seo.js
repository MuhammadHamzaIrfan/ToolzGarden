const fs = require('fs');
const path = require('path');

const toolData = {
  "image-compressor.html": {
    name: "Image Compressor",
    action: "Compress",
    desc: "Compress JPG, PNG and WebP images online for free. Reduce file size without losing quality. No signup. Works in browser.",
    keywords: "image compressor, compress image online, reduce image size, jpg compressor, png compressor",
    related: ["image-resizer", "image-to-jpg", "image-to-png"],
    formats: "JPEG (JPG), PNG, and WebP",
    step: "Adjust compression settings (if available) and wait for processing"
  },
  "image-resizer.html": {
    name: "Image Resizer",
    action: "Resize",
    desc: "Resize images online for free. Change image dimensions by pixels or percentage. Maintain aspect ratio. No upload needed.",
    keywords: "image resizer, resize image online, change image size, resize jpg png",
    related: ["image-compressor", "image-cropper", "image-to-png"],
    formats: "JPEG, PNG, WebP, and more",
    step: "Enter your target width and height in pixels or percentage"
  },
  "image-cropper.html": {
    name: "Image Cropper",
    action: "Crop",
    desc: "Crop images online for free with an interactive crop tool. Select any area and download instantly. No signup required.",
    keywords: "image cropper, crop image online, crop jpg png, free image crop tool",
    related: ["image-resizer", "image-compressor", "image-to-png"],
    formats: "JPEG, PNG, and WebP",
    step: "Use the selection box to highlight the area you want to keep"
  },
  "image-to-png.html": {
    name: "Image to PNG Converter",
    action: "Convert",
    desc: "Convert JPG, WebP, GIF to PNG format free online. High quality PNG conversion with transparency support. No signup needed.",
    keywords: "image to png, convert to png, jpg to png, webp to png converter free",
    related: ["image-to-jpg", "image-to-webp", "image-compressor"],
    formats: "JPG, WebP, GIF, and others to PNG",
    step: "The tool will automatically process the conversion to PNG"
  },
  "image-to-jpg.html": {
    name: "Image to JPG Converter",
    action: "Convert",
    desc: "Convert PNG, WebP, GIF to JPG format free online. Fast and high quality JPG conversion. No signup. Works in browser.",
    keywords: "image to jpg, convert to jpg, png to jpg, webp to jpg converter free",
    related: ["image-to-png", "image-to-webp", "image-compressor"],
    formats: "PNG, WebP, GIF, and others to JPG",
    step: "The tool will automatically process the conversion to JPG"
  },
  "image-to-webp.html": {
    name: "Image to WebP Converter",
    action: "Convert",
    desc: "Convert JPG, PNG to WebP format online for free. Smaller file sizes for faster websites. No signup required.",
    keywords: "image to webp, convert to webp, jpg to webp, png to webp converter",
    related: ["image-to-png", "image-to-jpg", "image-compressor"],
    formats: "JPG, PNG, and others to WebP",
    step: "The tool will automatically process the conversion to WebP"
  },
  "image-to-base64.html": {
    name: "Image to Base64 Converter",
    action: "Convert",
    desc: "Convert images to Base64 string online for free. Use in HTML, CSS, or JavaScript. Copy or download Base64 output instantly.",
    keywords: "image to base64, convert image base64, base64 encoder image, image base64 string",
    related: ["base64-encoder", "image-to-png", "image-to-jpg"],
    formats: "Any image format (JPG, PNG, WebP, etc.)",
    step: "Wait for the Base64 string to be generated in the output box"
  },
  "bulk-downloader.html": {
    name: "Bulk Image Downloader",
    action: "Download",
    desc: "Process and download multiple images at once as a ZIP file. Free online bulk image tool. No signup required.",
    keywords: "bulk image download, download images zip, multiple image download, batch image tool",
    related: ["image-compressor", "image-resizer", "image-to-jpg"],
    formats: "Multiple images in any common format",
    step: "Add multiple files and wait for them to be added to the batch"
  },
  "pdf-compress.html": {
    name: "PDF Compressor",
    action: "Compress",
    desc: "Compress PDF files online for free. Reduce PDF size without losing quality. No signup. Works in browser.",
    keywords: "pdf compressor, compress pdf online, reduce pdf size, pdf file size reducer",
    related: ["pdf-merge", "pdf-split", "image-to-pdf"],
    formats: "Standard PDF documents",
    step: "The tool will optimize the PDF internal structure to reduce size"
  },
  "pdf-merge.html": {
    name: "PDF Merger",
    action: "Merge",
    desc: "Merge multiple PDF files into one online for free. Easy drag to reorder pages. No signup. Works in browser.",
    keywords: "pdf merger, merge pdf online, combine pdf files, join pdf free",
    related: ["pdf-split", "pdf-compress", "pdf-page-remover"],
    formats: "Two or more PDF files",
    step: "Drag and drop the PDF files in the order you want them merged"
  },
  "pdf-split.html": {
    name: "PDF Splitter",
    action: "Split",
    desc: "Split PDF files online for free. Extract specific pages from any PDF. No signup. Works directly in browser.",
    keywords: "pdf splitter, split pdf online, extract pdf pages, separate pdf pages free",
    related: ["pdf-merge", "pdf-compress", "pdf-page-remover"],
    formats: "Any standard PDF document",
    step: "Specify the page ranges or individual pages you want to extract"
  },
  "pdf-to-image.html": {
    name: "PDF to Image Converter",
    action: "Convert",
    desc: "Convert PDF pages to PNG images online for free. High quality PDF to image conversion. No signup required.",
    keywords: "pdf to image, pdf to png, convert pdf to jpg, pdf page to image free",
    related: ["image-to-pdf", "pdf-compress", "pdf-split"],
    formats: "PDF documents to PNG images",
    step: "Select the resolution/quality for the output images"
  },
  "image-to-pdf.html": {
    name: "Image to PDF Converter",
    action: "Convert",
    desc: "Convert JPG, PNG images to PDF online for free. Combine multiple images into one PDF. No signup needed.",
    keywords: "image to pdf, jpg to pdf, png to pdf, convert image pdf free",
    related: ["pdf-to-image", "pdf-merge", "pdf-compress"],
    formats: "JPG, PNG, and other images to PDF",
    step: "Add multiple images and arrange them in your preferred page order"
  },
  "pdf-page-remover.html": {
    name: "PDF Page Remover",
    action: "Delete",
    desc: "Remove specific pages from PDF files online for free. Select and delete unwanted pages instantly. No signup required.",
    keywords: "pdf page remover, delete pdf pages, remove pages from pdf, pdf page deleter",
    related: ["pdf-split", "pdf-merge", "pdf-compress"],
    formats: "Any standard PDF document",
    step: "Click on the pages you wish to remove from the document"
  },
  "word-counter.html": {
    name: "Word Counter",
    action: "Count",
    desc: "Count words, characters, sentences and reading time online for free. Live word count as you type. No signup needed.",
    keywords: "word counter, count words online, word count tool, character counter free",
    related: ["character-counter", "case-converter", "text-reverser"],
    formats: "Plain text and copied content",
    step: "Type or paste your text into the input area for real-time counting"
  },
  "character-counter.html": {
    name: "Character Counter",
    action: "Count",
    desc: "Count characters, letters, numbers and spaces online for free. Set character limits. Live count as you type.",
    keywords: "character counter, count characters online, letter counter, character limit tool",
    related: ["word-counter", "case-converter", "text-to-slug"],
    formats: "Plain text and copied content",
    step: "Type or paste your text to see the total character count instantly"
  },
  "case-converter.html": {
    name: "Case Converter",
    action: "Convert",
    desc: "Convert text to UPPERCASE, lowercase, Title Case and more online for free. Instant text case conversion. No signup.",
    keywords: "case converter, text case converter, uppercase lowercase converter, title case tool",
    related: ["word-counter", "text-reverser", "remove-duplicates"],
    formats: "Any plain text content",
    step: "Choose the desired case format from the available buttons"
  },
  "text-reverser.html": {
    name: "Text Reverser",
    action: "Reverse",
    desc: "Reverse text, words or flip text upside down online for free. Instant text reversal tool. No signup required.",
    keywords: "text reverser, reverse text online, flip text, reverse words free tool",
    related: ["case-converter", "word-counter", "remove-duplicates"],
    formats: "Any plain text content",
    step: "Select whether you want to reverse characters or entire words"
  },
  "remove-duplicates.html": {
    name: "Remove Duplicate Lines",
    action: "Process",
    desc: "Remove duplicate lines from text online for free. Clean and sort unique lines instantly. No signup required.",
    keywords: "remove duplicate lines, delete duplicates text, unique lines tool, text deduplicator",
    related: ["word-counter", "text-reverser", "case-converter"],
    formats: "Lists and multi-line text content",
    step: "The tool will automatically scan and filter out identical lines"
  },
  "text-to-slug.html": {
    name: "Text to Slug Generator",
    action: "Generate",
    desc: "Convert text to URL slug online for free. Generate SEO friendly slugs for blog posts and URLs. No signup needed.",
    keywords: "text to slug, slug generator, url slug maker, seo slug tool free",
    related: ["url-encoder", "case-converter", "word-counter"],
    formats: "Titles, phrases, and text strings",
    step: "Adjust settings like separator (hyphen or underscore) if needed"
  },
  "json-formatter.html": {
    name: "JSON Formatter",
    action: "Format",
    desc: "Format and beautify JSON data online for free. Validate and pretty print JSON instantly. No signup required.",
    keywords: "json formatter, format json online, json beautifier, json pretty print free",
    related: ["json-minifier", "base64-encoder", "url-encoder"],
    formats: "JSON strings and raw data",
    step: "Paste your raw JSON and click the Beautify/Format button"
  },
  "json-minifier.html": {
    name: "JSON Minifier",
    action: "Minify",
    desc: "Minify and compress JSON data online for free. Remove whitespace from JSON instantly. No signup required.",
    keywords: "json minifier, minify json online, compress json, json compressor free",
    related: ["json-formatter", "base64-encoder", "html-encoder"],
    formats: "JSON strings and raw data",
    step: "The tool will strip all unnecessary spaces and line breaks"
  },
  "base64-encoder.html": {
    name: "Base64 Encoder Decoder",
    action: "Process",
    desc: "Encode and decode Base64 strings online for free. Also supports file to Base64 conversion. No signup required.",
    keywords: "base64 encoder, base64 decoder, encode base64 online, base64 converter free",
    related: ["url-encoder", "html-encoder", "image-to-base64"],
    formats: "Text strings or binary files",
    step: "Choose between Encoding or Decoding mode"
  },
  "url-encoder.html": {
    name: "URL Encoder Decoder",
    action: "Process",
    desc: "Encode and decode URLs online for free. Percent encode special characters instantly. No signup required.",
    keywords: "url encoder, url decoder, percent encoding, encode url online free",
    related: ["base64-encoder", "html-encoder", "text-to-slug"],
    formats: "URLs and query parameters",
    step: "Select 'Encode' to secure a URL or 'Decode' to make it readable"
  },
  "html-encoder.html": {
    name: "HTML Encoder Decoder",
    action: "Process",
    desc: "Encode and decode HTML entities online for free. Convert special characters to HTML entities instantly.",
    keywords: "html encoder, html decoder, html entities converter, encode html free",
    related: ["base64-encoder", "url-encoder", "json-formatter"],
    formats: "HTML code and special characters",
    step: "Choose whether to escape or unescape HTML special characters"
  }
};

const toolIconMap = {
  "image-compressor": "ri-file-zip",
  "image-resizer": "ri-aspect-ratio",
  "image-cropper": "ri-crop-2",
  "image-to-png": "ri-file-image",
  "image-to-jpg": "ri-file-image",
  "image-to-webp": "ri-windy",
  "image-to-base64": "ri-code",
  "bulk-downloader": "ri-download-cloud-2",
  "pdf-compress": "ri-file-pdf",
  "pdf-merge": "ri-file-pdf",
  "pdf-split": "ri-file-pdf",
  "pdf-to-image": "ri-file-image",
  "image-to-pdf": "ri-file-pdf",
  "pdf-page-remover": "ri-delete-bin-7",
  "word-counter": "ri-text",
  "character-counter": "ri-text-spacing",
  "case-converter": "ri-text-direction-l",
  "text-reverser": "ri-repeat",
  "remove-duplicates": "ri-filter",
  "text-to-slug": "ri-links",
  "json-formatter": "ri-braces",
  "json-minifier": "ri-collapse-diagonal",
  "base64-encoder": "ri-shield-keyhole",
  "url-encoder": "ri-global",
  "html-encoder": "ri-code-s-slash"
};

const dir = path.join(process.cwd(), 'tools');

Object.keys(toolData).forEach(filename => {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) return;

  const data = toolData[filename];
  const fileBasename = filename.replace('.html', '');
  
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Update <head>
  const newHead = `  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Primary SEO -->
  <title>${data.name} - Free Online ${data.action} Tool | ToolzGarden</title>
  <meta name="description" content="${data.desc}" />
  <meta name="keywords" content="${data.keywords}" />
  <meta name="author" content="ToolzGarden" />
  <meta name="robots" content="index, follow" />

  <!-- Canonical -->
  <link rel="canonical" href="https://toolzgarden.com/tools/${filename}" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${data.name} - Free Online Tool | ToolzGarden" />
  <meta property="og:description" content="${data.desc}" />
  <meta property="og:url" content="https://toolzgarden.com/tools/${filename}" />
  <meta property="og:site_name" content="ToolzGarden" />
  <meta property="og:image" content="https://toolzgarden.com/Images/og-image.jpg" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${data.name} - Free Online Tool | ToolzGarden" />
  <meta name="twitter:description" content="${data.desc}" />
  <meta name="twitter:image" content="https://toolzgarden.com/Images/og-image.jpg" />

  <!-- Favicon -->
  <link rel="apple-touch-icon" sizes="180x180" href="../Favicon-Images/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="../Favicon-Images/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="../Favicon-Images/favicon-16x16.png" />

  <!-- DNS Prefetch & Preconnect for High-Speed Asset Loading -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://fonts.gstatic.com">
  <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">

  <!-- Asynchronous Non-blocking Google Fonts -->
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"></noscript>

  <!-- Asynchronous Non-blocking Remix Icon stylesheet -->
  <link rel="preload" href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"></noscript>

  <!-- Main stylesheet -->
  <link rel="stylesheet" href="../style.css" />

  <!-- JSON-LD WebApplication Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "${data.name}",
    "url": "https://toolzgarden.com/tools/${filename}",
    "description": "${data.desc}",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": {
      "@type": "Organization",
      "name": "ToolzGarden",
      "url": "https://toolzgarden.com"
    }
  }
  </script>

  <!-- FAQPage Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is ${data.name} free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, ${data.name} on ToolzGarden is completely free. No signup or payment required."
        }
      },
      {
        "@type": "Question",
        "name": "Do you store my files?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. All processing happens in your browser. Your files never leave your device."
        }
      },
      {
        "@type": "Question",
        "name": "What formats are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "${data.formats}"
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to install anything?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No installation needed. Open the tool in any browser and use it instantly."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a file size limit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "There is no strict limit. Very large files above 50MB may process slowly depending on your device."
        }
      }
    ]
  }
  </script>`;

  content = content.replace(/<head>[\s\S]*?<\/head>/, `<head>\n${newHead}\n</head>`);

  // 2. Update H1
  content = content.replace(/<h1>[\s\S]*?<\/h1>/, `<h1>Free Online ${data.name} - No Signup Required</h1>`);

  // 3. Add Tool Description
  const toolDescSection = `
        <section class="tool-description" style="margin-top:2rem; padding:1.5rem; background:var(--bg-secondary); border-radius:1rem; border:1px solid var(--border-color);">
          <h2 style="font-size:1.3rem; margin-bottom:0.75rem;">How to Use ${data.name}</h2>
          <ol style="color:var(--text-secondary); line-height:2; padding-left:1.5rem;">
            <li>Click the upload area or drag and drop your file</li>
            <li>${data.step}</li>
            <li>Click Download to save your result</li>
          </ol>
          <p style="color:var(--text-secondary); margin-top:1rem; font-size:0.95rem;">
            ${data.desc} ToolzGarden is designed for speed and privacy, ensuring your data never leaves your browser.
          </p>
        </section>`;

  if (!content.includes('class="tool-description"')) {
    content = content.replace(/(<div id="preview-container"[\s\S]*?<\/div>\s*<\/div>)/, `$1\n${toolDescSection}`);
  }

  // 4. Add Related Tools and FAQ
  const relatedToolsSection = `
        <section style="padding:3rem 0;">
          <div class="container">
            <h2 style="margin-bottom:1.5rem;">Related Tools</h2>
            <div class="tool-grid" style="padding:0;">
              ${data.related.map(r => {
                const rName = toolData[r + '.html'] ? toolData[r + '.html'].name : r.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                const rIcon = toolIconMap[r] || 'ri-tools';
                return `
              <a href="${r}.html" class="tool-card" style="text-decoration:none;">
                <div class="tool-icon"><i class="${rIcon}-line"></i></div>
                <h3>${rName}</h3>
                <p>${toolData[r + '.html'] ? toolData[r + '.html'].desc.split('.')[0] + '.' : 'Free online tool.'}</p>
              </a>`;
              }).join('')}
            </div>
          </div>
        </section>`;

  const faqSection = `
        <section class="faq-section">
          <div class="container">
            <h2 style="text-align:center; margin-bottom:2rem;">Frequently Asked Questions</h2>
            <div class="faq-item">
              <h3>Is ${data.name} completely free?</h3>
              <p>Yes. ${data.name} on ToolzGarden is 100% free. No account, no payment, no limits.</p>
            </div>
            <div class="faq-item">
              <h3>Are my files safe?</h3>
              <p>Completely. All processing happens in your browser using JavaScript. Your files never leave your device and are never uploaded to any server.</p>
            </div>
            <div class="faq-item">
              <h3>What file formats does this tool support?</h3>
              <p>${data.formats}</p>
            </div>
            <div class="faq-item">
              <h3>Do I need to install any software?</h3>
              <p>No. This tool works directly in your browser. No installation, no plugins, no extensions required.</p>
            </div>
            <div class="faq-item">
              <h3>Is there a file size limit?</h3>
              <p>There is no strict file size limit. Very large files above 50MB may take longer depending on your device speed.</p>
            </div>
          </div>
        </section>`;

  // Remove existing related tools or faq if they exist
  content = content.replace(/<section[^>]*class="faq-section"[\s\S]*?<\/section>/, '');
  content = content.replace(/<section[^>]*style="[^"]*padding: 4rem 0; border-top: 1px solid var\(--border-color\);[\s\S]*?<\/section>/, '');
  content = content.replace(/<section[^>]*style="[^"]*padding:3rem 0;[\s\S]*?<\/section>/, ''); // matches our new one to avoid duplicates if re-run

  // Insert before </main>
  content = content.replace('</main>', `${relatedToolsSection}\n${faqSection}\n      </main>`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated SEO for ' + filename);
});
