document.getElementById('generateBtn').addEventListener('click', generateScreenshot);
document.getElementById('theme-selector').addEventListener('change', updateTheme);
document.getElementById('language').addEventListener('change', updatePreview);
document.getElementById('code').addEventListener('input', updatePreview);
document.getElementById('title').addEventListener('input', updatePreview);

function updatePreview() {
    const title = document.getElementById('title').value;
    const code = document.getElementById('code').value;
    const language = document.getElementById('language').value;

    const codeElement = document.getElementById('preview-code');
    const titleElement = document.getElementById('preview-title');
    
    codeElement.className = language;
    codeElement.textContent = code;
    Prism.highlightElement(codeElement);

    titleElement.textContent = title;
}

function updateTheme() {
    const selectedTheme = document.getElementById('theme-selector').value;
    const themeLink = document.getElementById('prism-theme');
    const preview = document.getElementById('preview');

        // Map theme values to Prism CSS URLs
        const themeMap = {
            "default": "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css",
            "okaidia": "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-okaidia.min.css",
            "dracula": "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-dracula.min.css",
            "tomorrow-night": "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css",
            "solarized-dark": "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-solarizeddark.min.css",
            "solarized-light": "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-solarizedlight.min.css",
            "atom-dark": "https://cdn.jsdelivr.net/npm/prism-themes/themes/prism-atom-dark.min.css",
            "material-dark": "https://cdn.jsdelivr.net/npm/prism-themes/themes/prism-material-dark.min.css",
            "vs-dark": "https://cdn.jsdelivr.net/npm/prism-themes/themes/prism-vs-dark.min.css",
            "shades-of-purple": "https://cdn.jsdelivr.net/npm/prism-themes/themes/prism-shades-of-purple.min.css",
            "one-dark": "https://cdn.jsdelivr.net/npm/prism-themes/themes/prism-one-dark.min.css",
            "night-owl": "https://cdn.jsdelivr.net/npm/prism-themes/themes/prism-night-owl.min.css"
        };

    themeLink.href = themeMap[selectedTheme];

    // Apply the theme class to the preview section
    preview.className = `theme-${selectedTheme}`;
    // updatePreview();
}

async function generateScreenshot() {
    const previewDiv = document.getElementById('preview');
    try {
        const canvas = await html2canvas(previewDiv, { scale: 2 });
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        img.alt = 'Code Screenshot Preview';
        const previewContainer = document.getElementById('screenshot-preview');
        previewContainer.innerHTML = ''; // Clear previous preview
        previewContainer.appendChild(img);
    } catch (error) {
        console.error('Screenshot generation failed:', error);
    }
}

// Initialize preview
updatePreview();
