import os

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - Free Online Tool | ToolzGarden</title>
    <meta name="description" content="{desc}">
    <link rel="canonical" href="https://pixtools.github.io/tools/{filename}">
    
    <link rel="apple-touch-icon" sizes="180x180" href="../Favicon-Images/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../Favicon-Images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../Favicon-Images/favicon-16x16.png">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
    <link rel="stylesheet" href="../style.css">
{pdf_scripts}
    <!-- FAQPage Schema -->
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {{ "@type": "Question", "name": "Is it private?", "acceptedAnswer": {{ "@type": "Answer", "text": "Yes, 100% private." }} }},
        {{ "@type": "Question", "name": "Is it free?", "acceptedAnswer": {{ "@type": "Answer", "text": "Yes, completely free." }} }},
        {{ "@type": "Question", "name": "Does it work offline?", "acceptedAnswer": {{ "@type": "Answer", "text": "Yes." }} }},
        {{ "@type": "Question", "name": "Any uploads needed?", "acceptedAnswer": {{ "@type": "Answer", "text": "No uploads needed." }} }}
      ]
    }}
    </script>
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <a href="../index.html" style="display:flex; align-items:center; gap:12px; text-decoration:none;">
                    <img src="../Images/logo.png" alt="Logo" style="height:48px; width:48px; object-fit:contain;"/>
                    <span style="font-weight:700; font-size:1.8rem; color:#2563EB;">ToolzGarden</span>
                </a>
                <div class="nav-actions">
                    <button id="theme-toggle" class="theme-toggle" title="Toggle Dark Mode">
                        <i class="ri-moon-line"></i>
                    </button>
                </div>
            </nav>
        </div>
    </header>

    <main class="container">
        <section style="padding: 2rem 0;">
            <span class="badge-private"><i class="ri-shield-check-fill"></i> 100% Private, No Upload</span>
            <h1>{tool_title}</h1>
            <p style="color: var(--text-secondary);">{tool_desc}</p>
        </section>

        <div class="tool-layout">
            <div class="tool-main">
                {tool_body}
            </div>
            <aside class="tool-sidebar">
                <div class="controls-card">
                    {sidebar_controls}
                    <button id="reset-btn" class="btn btn-secondary" style="margin-top: 1rem; width: 100%;">
                        <i class="ri-restart-line"></i> Reset Inputs
                    </button>
                </div>
            </aside>
        </div>

        <section class="faq-section">
            <h2 style="margin-bottom: 2rem;">Frequently Asked Questions</h2>
            <div class="faq-item"><h3>Is it private?</h3><p>Yes, 100% private. Processing happens in your browser.</p></div>
            <div class="faq-item"><h3>Is it free?</h3><p>Yes, completely free to use without limits.</p></div>
            <div class="faq-item"><h3>Does it work offline?</h3><p>Yes, once loaded you can use it without internet.</p></div>
            <div class="faq-item"><h3>Any uploads needed?</h3><p>No, your files stay on your device.</p></div>
        </section>

        <section style="padding: 4rem 0; border-top: 1px solid var(--border-color);">
            <h3>Related Tools</h3>
            <div class="tool-grid" style="padding-top: 2rem;">
                <a href="pdf-compress.html" class="tool-card"><div class="tool-icon"><i class="ri-file-pdf-line"></i></div><h4>PDF Compress</h4><p>Reduce PDF size.</p></a>
                <a href="word-counter.html" class="tool-card"><div class="tool-icon"><i class="ri-text"></i></div><h4>Word Counter</h4><p>Count words.</p></a>
                <a href="json-formatter.html" class="tool-card"><div class="tool-icon"><i class="ri-braces-line"></i></div><h4>JSON Formatter</h4><p>Format JSON.</p></a>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <div class="footer-bottom"><p>&copy; 2024 ToolzGarden. All rights reserved.</p></div>
        </div>
    </footer>
    <script src="../script.js"></script>
    <script src="{js_file}"></script>
</body>
</html>"""

def make_file(name, title, desc, tool_title, tool_desc, body, sidebar, is_pdf):
    pdf_scripts = """
    <!-- PDF.js for reading PDFs -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
    <!-- jsPDF for creating PDFs -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <!-- PDF-lib for merging/splitting -->
    <script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
    """ if is_pdf else ""
    
    html = HTML_TEMPLATE.format(
        title=title, desc=desc, filename=name+".html", tool_title=tool_title, 
        tool_desc=tool_desc, tool_body=body, sidebar_controls=sidebar, 
        js_file=name+".js", pdf_scripts=pdf_scripts
    )
    with open(f"d:\\Resizur\\tools\\{name}.html", "w", encoding="utf-8") as f:
        f.write(html)

tools = [
    # PDF Tools
    ("pdf-compress", "PDF Compress", "Reduce PDF file size.", "PDF Compressor", "Compress your PDF files in the browser.", 
     '<div id="drop-zone" class="upload-area"><div class="upload-icon"><i class="ri-upload-cloud-2-line"></i></div><h3>Drag & Drop PDF here</h3><input type="file" id="file-input" hidden accept=".pdf"></div><div id="preview" style="display:none;margin-top:1rem;"><p>Original: <span id="orig-size"></span></p><p>Compressed: <span id="comp-size"></span></p></div>',
     '<button id="download-btn" class="btn btn-primary" disabled><i class="ri-download-2-line"></i> Download Compressed</button>', True),
    
    ("pdf-merge", "PDF Merge", "Merge multiple PDFs.", "PDF Merger", "Merge multiple PDFs into one.",
     '<div id="drop-zone" class="upload-area"><div class="upload-icon"><i class="ri-upload-cloud-2-line"></i></div><h3>Upload PDFs</h3><input type="file" id="file-input" hidden accept=".pdf" multiple></div><ul id="file-list" style="margin-top:1rem;list-style:none;"></ul>',
     '<button id="download-btn" class="btn btn-primary" disabled><i class="ri-download-2-line"></i> Download Merged</button>', True),
     
    ("pdf-split", "PDF Split", "Extract pages from PDF.", "PDF Splitter", "Split your PDF into separate pages.",
     '<div id="drop-zone" class="upload-area"><div class="upload-icon"><i class="ri-upload-cloud-2-line"></i></div><h3>Upload PDF</h3><input type="file" id="file-input" hidden accept=".pdf"></div><div id="page-info" style="display:none;margin-top:1rem;">Total pages: <span id="total-pages"></span></div>',
     '<div class="control-group"><label>From Page</label><input type="number" id="from-page" min="1"></div><div class="control-group"><label>To Page</label><input type="number" id="to-page" min="1"></div><button id="download-btn" class="btn btn-primary" disabled><i class="ri-download-2-line"></i> Download Extracted</button>', True),
     
    ("pdf-to-image", "PDF to Image", "Convert PDF to PNG.", "PDF to Image", "Convert all pages of your PDF to PNG images.",
     '<div id="drop-zone" class="upload-area"><div class="upload-icon"><i class="ri-upload-cloud-2-line"></i></div><h3>Upload PDF</h3><input type="file" id="file-input" hidden accept=".pdf"></div><div id="preview-grid" style="display:grid;gap:1rem;margin-top:1rem;"></div>',
     '<button id="download-btn" class="btn btn-primary" disabled><i class="ri-download-2-line"></i> Download All Images</button>', True),
     
    ("image-to-pdf", "Image to PDF", "Convert images to PDF.", "Image to PDF", "Convert JPG, PNG to a single PDF.",
     '<div id="drop-zone" class="upload-area"><div class="upload-icon"><i class="ri-upload-cloud-2-line"></i></div><h3>Upload Images</h3><input type="file" id="file-input" hidden accept="image/*" multiple></div><div id="preview-grid" style="display:grid;gap:1rem;margin-top:1rem;"></div>',
     '<button id="download-btn" class="btn btn-primary" disabled><i class="ri-download-2-line"></i> Download PDF</button>', True),
     
    ("pdf-page-remover", "PDF Page Remover", "Remove PDF pages.", "PDF Page Remover", "Delete specific pages from PDF.",
     '<div id="drop-zone" class="upload-area"><div class="upload-icon"><i class="ri-upload-cloud-2-line"></i></div><h3>Upload PDF</h3><input type="file" id="file-input" hidden accept=".pdf"></div><div id="pages-grid" style="display:flex;gap:1rem;flex-wrap:wrap;margin-top:1rem;"></div>',
     '<button id="download-btn" class="btn btn-primary" disabled><i class="ri-download-2-line"></i> Download PDF</button>', True),

    # Text Tools
    ("word-counter", "Word Counter", "Count words and chars.", "Word Counter", "Count words, characters, and reading time.",
     '<textarea id="text-input" rows="10" style="width:100%;padding:1rem;border-radius:0.5rem;" placeholder="Type here..."></textarea><div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:1rem;"><div>Words: <b id="words">0</b></div><div>Chars: <b id="chars">0</b></div><div>Chars (no space): <b id="chars-ns">0</b></div><div>Sentences: <b id="sents">0</b></div><div>Paragraphs: <b id="paras">0</b></div><div>Reading Time: <b id="read-time">0</b> min</div></div>',
     '', False),
     
    ("character-counter", "Character Counter", "Advanced char count.", "Character Counter", "Count letters, numbers, and symbols.",
     '<textarea id="text-input" rows="10" style="width:100%;padding:1rem;border-radius:0.5rem;" placeholder="Type here..."></textarea><div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:1rem;"><div>Total: <b id="total">0</b></div><div>Letters: <b id="letters">0</b></div><div>Numbers: <b id="numbers">0</b></div><div>Spaces: <b id="spaces">0</b></div><div>Symbols: <b id="symbols">0</b></div></div>',
     '<div class="control-group"><label>Character Limit</label><input type="number" id="limit" value="0"></div><div id="warning" style="color:red;display:none;">Limit Exceeded!</div>', False),
     
    ("case-converter", "Case Converter", "Convert text case.", "Case Converter", "Convert to UPPERCASE, lowercase, etc.",
     '<textarea id="text-input" rows="8" style="width:100%;padding:1rem;border-radius:0.5rem;" placeholder="Type here..."></textarea><div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:1rem;"><button class="btn btn-primary" id="btn-upper">UPPERCASE</button><button class="btn btn-primary" id="btn-lower">lowercase</button><button class="btn btn-primary" id="btn-title">Title Case</button><button class="btn btn-primary" id="btn-sentence">Sentence case</button><button class="btn btn-primary" id="btn-alt">aLtErNaTiNg</button><button class="btn btn-primary" id="btn-rev">Reverse Case</button></div>',
     '<button id="copy-btn" class="btn btn-primary"><i class="ri-clipboard-line"></i> Copy</button>', False),
     
    ("text-reverser", "Text Reverser", "Reverse text instantly.", "Text Reverser", "Reverse strings and words.",
     '<textarea id="text-input" rows="5" style="width:100%;padding:1rem;border-radius:0.5rem;" placeholder="Type here..."></textarea><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;margin:1rem 0;"><button class="btn btn-primary" id="btn-rev-text">Reverse Text</button><button class="btn btn-primary" id="btn-rev-words">Reverse Words</button><button class="btn btn-primary" id="btn-flip">Upside Down</button></div><textarea id="text-output" rows="5" style="width:100%;padding:1rem;border-radius:0.5rem;" readonly></textarea>',
     '<button id="copy-btn" class="btn btn-primary"><i class="ri-clipboard-line"></i> Copy</button>', False),
     
    ("remove-duplicates", "Remove Duplicates", "Remove duplicate lines.", "Remove Duplicates", "Clean up lists by removing duplicate lines.",
     '<textarea id="text-input" rows="6" style="width:100%;padding:1rem;border-radius:0.5rem;" placeholder="Item 1\\nItem 2\\nItem 1"></textarea><textarea id="text-output" rows="6" style="width:100%;padding:1rem;border-radius:0.5rem;margin-top:1rem;" readonly></textarea><p id="status"></p>',
     '<div class="control-group"><label><input type="checkbox" id="case-sens"> Case Sensitive</label><br><label><input type="checkbox" id="trim" checked> Trim Whitespace</label><br><label><input type="checkbox" id="sort"> Sort Alphabetically</label></div><button id="process-btn" class="btn btn-primary">Remove Duplicates</button><button id="copy-btn" class="btn btn-primary" style="margin-top:1rem;"><i class="ri-clipboard-line"></i> Copy</button>', False),
     
    ("text-to-slug", "Text to Slug", "Convert text to URL slug.", "Text to Slug", "Create SEO-friendly URL slugs.",
     '<input type="text" id="text-input" style="width:100%;padding:1rem;border-radius:0.5rem;" placeholder="Enter title..."><div style="margin-top:1rem;padding:1rem;background:var(--bg-secondary);word-break:break-all;" id="output"></div>',
     '<div class="control-group"><label>Separator</label><select id="sep"><option value="-">Hyphen (-)</option><option value="_">Underscore (_)</option></select></div><div class="control-group"><label><input type="checkbox" id="lower" checked> Lowercase</label></div><button id="copy-btn" class="btn btn-primary"><i class="ri-clipboard-line"></i> Copy</button>', False),

    # File Tools
    ("json-formatter", "JSON Formatter", "Format JSON.", "JSON Formatter", "Beautify and validate JSON.",
     '<textarea id="text-input" rows="8" style="width:100%;padding:1rem;border-radius:0.5rem;font-family:monospace;" placeholder=\'{"a":1}\'></textarea><p id="error-msg" style="color:red;"></p><textarea id="text-output" rows="8" style="width:100%;padding:1rem;border-radius:0.5rem;font-family:monospace;margin-top:1rem;" readonly></textarea>',
     '<div class="control-group"><label>Indent</label><select id="indent"><option value="2">2 Spaces</option><option value="4">4 Spaces</option><option value="tab">Tab</option></select></div><button id="format-btn" class="btn btn-primary" style="margin-bottom:1rem;width:100%;">Format JSON</button><button id="copy-btn" class="btn btn-primary" style="margin-bottom:1rem;width:100%;"><i class="ri-clipboard-line"></i> Copy</button><button id="download-btn" class="btn btn-secondary" style="margin-bottom:1rem;width:100%;"><i class="ri-download-line"></i> Download .json</button>', False),
     
    ("json-minifier", "JSON Minifier", "Minify JSON.", "JSON Minifier", "Compress JSON by removing whitespace.",
     '<textarea id="text-input" rows="8" style="width:100%;padding:1rem;border-radius:0.5rem;font-family:monospace;" placeholder=\'{"a":  1}\'></textarea><div id="size-info" style="margin:1rem 0;"></div><textarea id="text-output" rows="8" style="width:100%;padding:1rem;border-radius:0.5rem;font-family:monospace;" readonly></textarea>',
     '<button id="minify-btn" class="btn btn-primary" style="margin-bottom:1rem;width:100%;">Minify JSON</button><button id="copy-btn" class="btn btn-primary" style="margin-bottom:1rem;width:100%;"><i class="ri-clipboard-line"></i> Copy</button><button id="download-btn" class="btn btn-secondary" style="margin-bottom:1rem;width:100%;"><i class="ri-download-line"></i> Download .json</button>', False),
     
    ("base64-encoder", "Base64 Encoder", "Encode/Decode Base64.", "Base64 Encoder / Decoder", "Encode text or files to Base64, or decode back.",
     '<div style="display:flex;gap:1rem;margin-bottom:1rem;"><button id="tab-enc" class="btn btn-primary">Encode</button><button id="tab-dec" class="btn btn-secondary">Decode</button></div><textarea id="text-input" rows="5" style="width:100%;padding:1rem;border-radius:0.5rem;" placeholder="Input..."></textarea><div style="margin:1rem 0;">Or upload file: <input type="file" id="file-input"></div><textarea id="text-output" rows="5" style="width:100%;padding:1rem;border-radius:0.5rem;" readonly></textarea>',
     '<button id="process-btn" class="btn btn-primary" style="margin-bottom:1rem;width:100%;">Encode</button><button id="copy-btn" class="btn btn-primary" style="margin-bottom:1rem;width:100%;"><i class="ri-clipboard-line"></i> Copy</button>', False),
     
    ("url-encoder", "URL Encoder", "Encode/Decode URLs.", "URL Encoder / Decoder", "Safe URL encoding and decoding.",
     '<div style="display:flex;gap:1rem;margin-bottom:1rem;"><button id="tab-enc" class="btn btn-primary">Encode</button><button id="tab-dec" class="btn btn-secondary">Decode</button></div><textarea id="text-input" rows="6" style="width:100%;padding:1rem;border-radius:0.5rem;" placeholder="Input..."></textarea><textarea id="text-output" rows="6" style="width:100%;padding:1rem;border-radius:0.5rem;margin-top:1rem;" readonly></textarea>',
     '<button id="copy-btn" class="btn btn-primary"><i class="ri-clipboard-line"></i> Copy</button>', False),
     
    ("html-encoder", "HTML Encoder", "Encode/Decode HTML entities.", "HTML Encoder / Decoder", "Convert < > & to HTML entities.",
     '<div style="display:flex;gap:1rem;margin-bottom:1rem;"><button id="tab-enc" class="btn btn-primary">Encode</button><button id="tab-dec" class="btn btn-secondary">Decode</button></div><textarea id="text-input" rows="6" style="width:100%;padding:1rem;border-radius:0.5rem;" placeholder="Input..."></textarea><textarea id="text-output" rows="6" style="width:100%;padding:1rem;border-radius:0.5rem;margin-top:1rem;" readonly></textarea>',
     '<button id="copy-btn" class="btn btn-primary"><i class="ri-clipboard-line"></i> Copy</button>', False)
]

for t in tools:
    make_file(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7])

JS_FILES = {
    "pdf-compress": """
document.getElementById('drop-zone')?.addEventListener('click', () => document.getElementById('file-input').click());
document.getElementById('file-input')?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    document.getElementById('orig-size').innerText = (file.size/1024).toFixed(2) + ' KB';
    const bytes = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(bytes);
    const compBytes = await pdfDoc.save({ useObjectStreams: true });
    document.getElementById('comp-size').innerText = (compBytes.length/1024).toFixed(2) + ' KB';
    document.getElementById('preview').style.display = 'block';
    
    const btn = document.getElementById('download-btn');
    btn.disabled = false;
    btn.onclick = () => {
        const blob = new Blob([compBytes], {type: 'application/pdf'});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'compressed_' + file.name;
        link.click();
    };
});
document.getElementById('reset-btn')?.addEventListener('click', () => location.reload());
""",
    "pdf-merge": """
let pdfFiles = [];
document.getElementById('drop-zone')?.addEventListener('click', () => document.getElementById('file-input').click());
document.getElementById('file-input')?.addEventListener('change', (e) => {
    pdfFiles = [...pdfFiles, ...Array.from(e.target.files)];
    renderList();
    document.getElementById('download-btn').disabled = false;
});
function renderList() {
    const ul = document.getElementById('file-list');
    ul.innerHTML = '';
    pdfFiles.forEach((f, i) => {
        const li = document.createElement('li');
        li.innerText = f.name;
        ul.appendChild(li);
    });
}
document.getElementById('download-btn')?.addEventListener('click', async () => {
    const mergedPdf = await PDFLib.PDFDocument.create();
    for (const file of pdfFiles) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(bytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
    }
    const mergedBytes = await mergedPdf.save();
    const blob = new Blob([mergedBytes], {type: 'application/pdf'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'merged.pdf';
    link.click();
});
document.getElementById('reset-btn')?.addEventListener('click', () => location.reload());
""",
    "pdf-split": """
let pdfDocBytes = null;
let originalName = '';
document.getElementById('drop-zone')?.addEventListener('click', () => document.getElementById('file-input').click());
document.getElementById('file-input')?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    originalName = file.name;
    pdfDocBytes = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(pdfDocBytes);
    const num = pdfDoc.getPageCount();
    document.getElementById('total-pages').innerText = num;
    document.getElementById('page-info').style.display = 'block';
    document.getElementById('from-page').max = num;
    document.getElementById('to-page').max = num;
    document.getElementById('download-btn').disabled = false;
});
document.getElementById('download-btn')?.addEventListener('click', async () => {
    const fromP = parseInt(document.getElementById('from-page').value) || 1;
    const toP = parseInt(document.getElementById('to-page').value) || 1;
    const pdfDoc = await PDFLib.PDFDocument.load(pdfDocBytes);
    const newPdf = await PDFLib.PDFDocument.create();
    const indices = [];
    for(let i=fromP-1; i<=toP-1; i++) indices.push(i);
    const pages = await newPdf.copyPages(pdfDoc, indices);
    pages.forEach(page => newPdf.addPage(page));
    const bytes = await newPdf.save();
    const blob = new Blob([bytes], {type: 'application/pdf'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'split_' + originalName;
    link.click();
});
document.getElementById('reset-btn')?.addEventListener('click', () => location.reload());
""",
    "pdf-to-image": """
document.getElementById('drop-zone')?.addEventListener('click', () => document.getElementById('file-input').click());
document.getElementById('file-input')?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const arrayBuffer = await file.arrayBuffer();
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    const grid = document.getElementById('preview-grid');
    grid.innerHTML = '';
    window.pdfImages = [];
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        img.style.width = '100%';
        grid.appendChild(img);
        window.pdfImages.push(img.src);
    }
    document.getElementById('download-btn').disabled = false;
});
document.getElementById('download-btn')?.addEventListener('click', () => {
    window.pdfImages.forEach((src, i) => {
        const link = document.createElement('a');
        link.href = src;
        link.download = `page_${i+1}.png`;
        link.click();
    });
});
document.getElementById('reset-btn')?.addEventListener('click', () => location.reload());
""",
    "image-to-pdf": """
let uploadedImages = [];
document.getElementById('drop-zone')?.addEventListener('click', () => document.getElementById('file-input').click());
document.getElementById('file-input')?.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    const grid = document.getElementById('preview-grid');
    files.forEach(f => {
        const reader = new FileReader();
        reader.onload = (ev) => {
            uploadedImages.push(ev.target.result);
            const img = document.createElement('img');
            img.src = ev.target.result;
            img.style.width = '100px';
            grid.appendChild(img);
        };
        reader.readAsDataURL(f);
    });
    document.getElementById('download-btn').disabled = false;
});
document.getElementById('download-btn')?.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    uploadedImages.forEach((img, i) => {
        if (i > 0) pdf.addPage();
        pdf.addImage(img, 'JPEG', 0, 0, 210, 297);
    });
    pdf.save('converted.pdf');
});
document.getElementById('reset-btn')?.addEventListener('click', () => location.reload());
""",
    "pdf-page-remover": """
let pdfDocBytes = null;
let originalName = '';
document.getElementById('drop-zone')?.addEventListener('click', () => document.getElementById('file-input').click());
document.getElementById('file-input')?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    originalName = file.name;
    pdfDocBytes = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(pdfDocBytes);
    const num = pdfDoc.getPageCount();
    const grid = document.getElementById('pages-grid');
    grid.innerHTML = '';
    for(let i=1; i<=num; i++) {
        const div = document.createElement('div');
        div.innerHTML = `<input type="checkbox" value="${i-1}" id="p${i}"><label for="p${i}">Page ${i}</label>`;
        grid.appendChild(div);
    }
    document.getElementById('download-btn').disabled = false;
});
document.getElementById('download-btn')?.addEventListener('click', async () => {
    const checkboxes = document.querySelectorAll('#pages-grid input:checked');
    const selectedPages = Array.from(checkboxes).map(c => parseInt(c.value));
    const pdfDoc = await PDFLib.PDFDocument.load(pdfDocBytes);
    const num = pdfDoc.getPageCount();
    const indicesToKeep = [];
    for(let i=0; i<num; i++) {
        if(!selectedPages.includes(i)) indicesToKeep.push(i);
    }
    const newPdf = await PDFLib.PDFDocument.create();
    const pages = await newPdf.copyPages(pdfDoc, indicesToKeep);
    pages.forEach(p => newPdf.addPage(p));
    const bytes = await newPdf.save();
    const blob = new Blob([bytes], {type: 'application/pdf'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'removed_' + originalName;
    link.click();
});
document.getElementById('reset-btn')?.addEventListener('click', () => location.reload());
""",
    "word-counter": """
const ta = document.getElementById('text-input');
ta?.addEventListener('input', () => {
    const text = ta.value;
    document.getElementById('words').innerText = text.trim() === '' ? 0 : text.trim().split(/\\s+/).length;
    document.getElementById('chars').innerText = text.length;
    document.getElementById('chars-ns').innerText = text.replace(/\\s/g, '').length;
    document.getElementById('sents').innerText = text.split(/[.!?]+/).filter(s => s.trim()).length;
    document.getElementById('paras').innerText = text.split(/\\n\\s*\\n/).filter(p => p.trim()).length;
    document.getElementById('read-time').innerText = Math.ceil((text.trim() === '' ? 0 : text.trim().split(/\\s+/).length) / 200);
});
document.getElementById('reset-btn')?.addEventListener('click', () => { if(ta) {ta.value = ''; ta.dispatchEvent(new Event('input'));} });
""",
    "character-counter": """
const ta = document.getElementById('text-input');
const limitInp = document.getElementById('limit');
ta?.addEventListener('input', update);
limitInp?.addEventListener('input', update);
function update() {
    const text = ta.value;
    document.getElementById('total').innerText = text.length;
    document.getElementById('letters').innerText = (text.match(/[a-zA-Z]/g) || []).length;
    document.getElementById('numbers').innerText = (text.match(/[0-9]/g) || []).length;
    document.getElementById('spaces').innerText = (text.match(/\\s/g) || []).length;
    document.getElementById('symbols').innerText = text.length - (text.match(/[a-zA-Z0-9\\s]/g) || []).length;
    
    const limit = parseInt(limitInp.value) || 0;
    if(limit > 0 && text.length > limit) {
        document.getElementById('warning').style.display = 'block';
    } else {
        document.getElementById('warning').style.display = 'none';
    }
}
document.getElementById('reset-btn')?.addEventListener('click', () => { if(ta) {ta.value = ''; update();} });
""",
    "case-converter": """
const ta = document.getElementById('text-input');
const btnUp = document.getElementById('btn-upper');
if(btnUp) btnUp.onclick = () => ta.value = ta.value.toUpperCase();
const btnLo = document.getElementById('btn-lower');
if(btnLo) btnLo.onclick = () => ta.value = ta.value.toLowerCase();
const btnTi = document.getElementById('btn-title');
if(btnTi) btnTi.onclick = () => ta.value = ta.value.replace(/\\w\\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase());
const btnSe = document.getElementById('btn-sentence');
if(btnSe) btnSe.onclick = () => ta.value = ta.value.toLowerCase().replace(/(^\\s*\\w|[.!?]\\s*\\w)/g, c => c.toUpperCase());
const btnAl = document.getElementById('btn-alt');
if(btnAl) btnAl.onclick = () => ta.value = ta.value.split('').map((c,i) => i%2===0 ? c.toUpperCase() : c.toLowerCase()).join('');
const btnRe = document.getElementById('btn-rev');
if(btnRe) btnRe.onclick = () => ta.value = ta.value.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
const btnCo = document.getElementById('copy-btn');
if(btnCo) btnCo.onclick = () => { navigator.clipboard.writeText(ta.value); alert('Copied!'); };
document.getElementById('reset-btn')?.addEventListener('click', () => { if(ta) ta.value = ''; });
""",
    "text-reverser": """
const taIn = document.getElementById('text-input');
const taOut = document.getElementById('text-output');
const btnRt = document.getElementById('btn-rev-text');
if(btnRt) btnRt.onclick = () => taOut.value = taIn.value.split('').reverse().join('');
const btnRw = document.getElementById('btn-rev-words');
if(btnRw) btnRw.onclick = () => taOut.value = taIn.value.split(' ').reverse().join(' ');
const flipTable = { 'a':'ɐ', 'b':'q', 'c':'ɔ', 'd':'p', 'e':'ǝ', 'f':'ɟ', 'g':'ƃ', 'h':'ɥ', 'i':'ᴉ', 'j':'ɾ', 'k':'ʞ', 'l':'l', 'm':'ɯ', 'n':'u', 'o':'o', 'p':'d', 'q':'b', 'r':'ɹ', 's':'s', 't':'ʇ', 'u':'n', 'v':'ʌ', 'w':'ʍ', 'x':'x', 'y':'ʎ', 'z':'z' };
const btnFl = document.getElementById('btn-flip');
if(btnFl) btnFl.onclick = () => taOut.value = taIn.value.toLowerCase().split('').reverse().map(c => flipTable[c] || c).join('');
const btnCo = document.getElementById('copy-btn');
if(btnCo) btnCo.onclick = () => { navigator.clipboard.writeText(taOut.value); alert('Copied!'); };
document.getElementById('reset-btn')?.addEventListener('click', () => { if(taIn) taIn.value = ''; if(taOut) taOut.value = ''; });
""",
    "remove-duplicates": """
const taIn = document.getElementById('text-input');
const taOut = document.getElementById('text-output');
const btnPr = document.getElementById('process-btn');
if(btnPr) btnPr.onclick = () => {
    let lines = taIn.value.split('\\n');
    if(document.getElementById('trim').checked) lines = lines.map(l => l.trim());
    const caseSens = document.getElementById('case-sens').checked;
    const unique = [...new Set(lines.map(l => caseSens ? l : l.toLowerCase()))];
    if(document.getElementById('sort').checked) unique.sort();
    taOut.value = unique.join('\\n');
    document.getElementById('status').innerText = `Removed ${lines.length - unique.length} duplicates.`;
};
const btnCo = document.getElementById('copy-btn');
if(btnCo) btnCo.onclick = () => { navigator.clipboard.writeText(taOut.value); alert('Copied!'); };
document.getElementById('reset-btn')?.addEventListener('click', () => { if(taIn) taIn.value = ''; if(taOut) taOut.value = ''; document.getElementById('status').innerText = ''; });
""",
    "text-to-slug": """
const inp = document.getElementById('text-input');
const out = document.getElementById('output');
inp?.addEventListener('input', update);
document.getElementById('sep')?.addEventListener('change', update);
document.getElementById('lower')?.addEventListener('change', update);
function update() {
    let text = inp.value;
    if(document.getElementById('lower').checked) text = text.toLowerCase();
    const sep = document.getElementById('sep').value;
    out.innerText = text.trim().replace(/[^\\w\\s-]/g, '').replace(/[\\s_-]+/g, sep).replace(/^-+|-+$/g, '');
}
const btnCo = document.getElementById('copy-btn');
if(btnCo) btnCo.onclick = () => { navigator.clipboard.writeText(out.innerText); alert('Copied!'); };
document.getElementById('reset-btn')?.addEventListener('click', () => { if(inp) {inp.value = ''; update();} });
""",
    "json-formatter": """
const taIn = document.getElementById('text-input');
const taOut = document.getElementById('text-output');
const btnFm = document.getElementById('format-btn');
if(btnFm) btnFm.onclick = () => {
    try {
        const parsed = JSON.parse(taIn.value);
        let ind = document.getElementById('indent').value;
        if(ind === 'tab') ind = '\\t'; else ind = parseInt(ind);
        taOut.value = JSON.stringify(parsed, null, ind);
        document.getElementById('error-msg').innerText = '';
    } catch(e) {
        document.getElementById('error-msg').innerText = 'Invalid JSON: ' + e.message;
    }
};
const btnCo = document.getElementById('copy-btn');
if(btnCo) btnCo.onclick = () => { navigator.clipboard.writeText(taOut.value); alert('Copied!'); };
const btnDl = document.getElementById('download-btn');
if(btnDl) btnDl.onclick = () => {
    const blob = new Blob([taOut.value], {type: 'application/json'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'formatted.json';
    link.click();
};
document.getElementById('reset-btn')?.addEventListener('click', () => { if(taIn){taIn.value = ''; taOut.value = ''; document.getElementById('error-msg').innerText = '';} });
""",
    "json-minifier": """
const taIn = document.getElementById('text-input');
const taOut = document.getElementById('text-output');
const btnMi = document.getElementById('minify-btn');
if(btnMi) btnMi.onclick = () => {
    try {
        taOut.value = JSON.stringify(JSON.parse(taIn.value));
        document.getElementById('size-info').innerText = `Original: ${taIn.value.length} chars | Minified: ${taOut.value.length} chars`;
    } catch(e) { alert('Invalid JSON'); }
};
const btnCo = document.getElementById('copy-btn');
if(btnCo) btnCo.onclick = () => { navigator.clipboard.writeText(taOut.value); alert('Copied!'); };
const btnDl = document.getElementById('download-btn');
if(btnDl) btnDl.onclick = () => {
    const blob = new Blob([taOut.value], {type: 'application/json'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'minified.json';
    link.click();
};
document.getElementById('reset-btn')?.addEventListener('click', () => { if(taIn){taIn.value = ''; taOut.value = ''; document.getElementById('size-info').innerText = '';} });
""",
    "base64-encoder": """
let mode = 'enc';
const taIn = document.getElementById('text-input');
const taOut = document.getElementById('text-output');
const btnTe = document.getElementById('tab-enc');
if(btnTe) btnTe.onclick = () => { mode = 'enc'; document.getElementById('process-btn').innerText = 'Encode'; btnTe.classList.replace('btn-secondary', 'btn-primary'); document.getElementById('tab-dec').classList.replace('btn-primary', 'btn-secondary'); };
const btnTd = document.getElementById('tab-dec');
if(btnTd) btnTd.onclick = () => { mode = 'dec'; document.getElementById('process-btn').innerText = 'Decode'; btnTd.classList.replace('btn-secondary', 'btn-primary'); document.getElementById('tab-enc').classList.replace('btn-primary', 'btn-secondary'); };
const btnPr = document.getElementById('process-btn');
if(btnPr) btnPr.onclick = () => {
    try {
        if(mode === 'enc') taOut.value = btoa(unescape(encodeURIComponent(taIn.value)));
        else taOut.value = decodeURIComponent(escape(atob(taIn.value)));
    } catch(e) { alert('Error processing text'); }
};
const fiInp = document.getElementById('file-input');
if(fiInp) fiInp.onchange = (e) => {
    const f = e.target.files[0];
    if(!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        taOut.value = ev.target.result.split(',')[1];
    };
    reader.readAsDataURL(f);
};
const btnCo = document.getElementById('copy-btn');
if(btnCo) btnCo.onclick = () => { navigator.clipboard.writeText(taOut.value); alert('Copied!'); };
document.getElementById('reset-btn')?.addEventListener('click', () => { if(taIn){taIn.value = ''; taOut.value = ''; document.getElementById('file-input').value = '';} });
""",
    "url-encoder": """
let mode = 'enc';
const taIn = document.getElementById('text-input');
const taOut = document.getElementById('text-output');
const btnTe = document.getElementById('tab-enc');
if(btnTe) btnTe.onclick = () => { mode = 'enc'; btnTe.classList.replace('btn-secondary', 'btn-primary'); document.getElementById('tab-dec').classList.replace('btn-primary', 'btn-secondary'); taIn.dispatchEvent(new Event('input')); };
const btnTd = document.getElementById('tab-dec');
if(btnTd) btnTd.onclick = () => { mode = 'dec'; btnTd.classList.replace('btn-secondary', 'btn-primary'); document.getElementById('tab-enc').classList.replace('btn-primary', 'btn-secondary'); taIn.dispatchEvent(new Event('input')); };
taIn?.addEventListener('input', () => {
    try {
        if(mode === 'enc') taOut.value = encodeURIComponent(taIn.value);
        else taOut.value = decodeURIComponent(taIn.value);
    } catch(e) { taOut.value = 'Invalid Input'; }
});
const btnCo = document.getElementById('copy-btn');
if(btnCo) btnCo.onclick = () => { navigator.clipboard.writeText(taOut.value); alert('Copied!'); };
document.getElementById('reset-btn')?.addEventListener('click', () => { if(taIn){taIn.value = ''; taOut.value = '';} });
""",
    "html-encoder": """
let mode = 'enc';
const taIn = document.getElementById('text-input');
const taOut = document.getElementById('text-output');
const btnTe = document.getElementById('tab-enc');
if(btnTe) btnTe.onclick = () => { mode = 'enc'; btnTe.classList.replace('btn-secondary', 'btn-primary'); document.getElementById('tab-dec').classList.replace('btn-primary', 'btn-secondary'); taIn.dispatchEvent(new Event('input')); };
const btnTd = document.getElementById('tab-dec');
if(btnTd) btnTd.onclick = () => { mode = 'dec'; btnTd.classList.replace('btn-secondary', 'btn-primary'); document.getElementById('tab-enc').classList.replace('btn-primary', 'btn-secondary'); taIn.dispatchEvent(new Event('input')); };
taIn?.addEventListener('input', () => {
    if(mode === 'enc') {
        taOut.value = taIn.value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    } else {
        const txt = document.createElement('textarea');
        txt.innerHTML = taIn.value;
        taOut.value = txt.value;
    }
});
const btnCo = document.getElementById('copy-btn');
if(btnCo) btnCo.onclick = () => { navigator.clipboard.writeText(taOut.value); alert('Copied!'); };
document.getElementById('reset-btn')?.addEventListener('click', () => { if(taIn){taIn.value = ''; taOut.value = '';} });
"""
}

for name, content in JS_FILES.items():
    with open(f"d:\\Resizur\\tools\\{name}.js", "w", encoding="utf-8") as f:
        f.write(content)

print("Generated all 17 JS files.")
