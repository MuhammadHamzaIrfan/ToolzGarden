const fs = require('fs');
const path = require('path');

// Root directories to scan
const rootDir = process.cwd();
const toolsDir = path.join(rootDir, 'tools');

function getHtmlFiles(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(file => file.endsWith('.html'))
      .map(file => path.join(dir, file));
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
    return [];
  }
}

// Get all root level and tools level HTML files
const htmlFiles = [
  ...getHtmlFiles(rootDir),
  ...getHtmlFiles(toolsDir)
];

console.log(`Found ${htmlFiles.length} HTML files to process.`);

let updatedCount = 0;

htmlFiles.forEach(filePath => {
  const fileBasename = path.basename(filePath);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Regex Cleanup of existing tags and comments to prevent duplicates
  // Remove preconnect/dns-prefetch tags for the optimized domains
  content = content.replace(/<link\s+rel=["']?(?:preconnect|dns-prefetch)["']?\s+href=["']?https:\/\/(?:fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.jsdelivr\.net)["']?[^>]*>/gi, '');

  // Remove asynchronous/synchronous Remix Icon links
  content = content.replace(/<link\s+rel=["']?(?:preload|stylesheet)["']?\s+href=["']?https:\/\/cdn\.jsdelivr\.net\/npm\/remixicon@[^"'>]*remixicon\.css["']?[^>]*>/gi, '');
  content = content.replace(/<noscript>\s*<link\s+rel=["']?stylesheet["']?\s+href=["']?https:\/\/cdn\.jsdelivr\.net\/npm\/remixicon@[^"'>]*remixicon\.css["']?[^>]*>\s*<\/noscript>/gi, '');

  // Remove asynchronous/synchronous Google Fonts links
  content = content.replace(/<link\s+rel=["']?(?:preload|stylesheet)["']?\s+href=["']?https:\/\/fonts\.googleapis\.com\/css2?[^"'>]*["']?[^>]*>/gi, '');
  content = content.replace(/<noscript>\s*<link\s+rel=["']?stylesheet["']?\s+href=["']?https:\/\/fonts\.googleapis\.com\/css2?[^"'>]*["']?[^>]*>\s*<\/noscript>/gi, '');

  // Remove comments
  content = content.replace(/<!--\s*DNS Prefetch & Preconnect for High-Speed Asset Loading\s*-->/gi, '');
  content = content.replace(/<!--\s*Asynchronous Non-blocking Google Fonts\s*-->/gi, '');
  content = content.replace(/<!--\s*Asynchronous Non-blocking Remix Icon stylesheet\s*-->/gi, '');
  content = content.replace(/<!--\s*Main stylesheet(?:\s*\(.*\))?\s*-->/gi, '');

  // 2. Locate the main stylesheet link to insert our optimized block
  const styleMatch = content.match(/<link\s+rel=["']?stylesheet["']?\s+href=["']?([^"']*(?:style|style\.src)\.css)["']?\s*\/?>/i);

  if (!styleMatch) {
    console.warn(`[WARNING] Main stylesheet style.css or style.src.css not found in ${fileBasename}. Skipping performance optimization.`);
    return;
  }

  const exactStyleLink = styleMatch[0];
  const stylePath = styleMatch[1];

  // 3. Create the optimized resource loading block
  const optimizedBlock = `  <!-- DNS Prefetch & Preconnect for High-Speed Asset Loading -->
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
  <link rel="stylesheet" href="${stylePath}" />`;

  // 4. Inject optimized block by replacing the matched main stylesheet link
  let updatedContent = content.replace(exactStyleLink, optimizedBlock);

  // Clean up any double empty lines that may have resulted from the regex cleanup inside <head>
  updatedContent = updatedContent.replace(/(<\/title>|<\/meta>|<\/link>)\s*[\r\n]\s*[\r\n]\s*<!--/gi, '$1\n\n  <!--');
  updatedContent = updatedContent.replace(/(<\/title>|<\/meta>|<\/link>)\s*[\r\n]\s*[\r\n]\s*<link/gi, '$1\n\n  <link');

  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log(`[SUCCESS] Optimized asset loading performance in ${fileBasename}`);
  updatedCount++;
});

console.log(`Performance optimization complete. Successfully updated ${updatedCount} HTML files.`);
