// JavaScript: search + thumbnails with onclick
async function loadIndex() {
  const res = await fetch('pdf-index.json');
  return await res.json();
}

loadIndex().then(index => {
  const input = document.getElementById('search');
  const results = document.getElementById('results');

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    results.innerHTML = '';

    index
      .filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      )
      .forEach(item => {
        const jpg = item.file.replace('.pdf', '.jpg');

        const link = document.createElement('a');
        link.href = item.file; // PDF link if user wants to open the file
        link.className = 'result-link';

        const img = document.createElement('img');
        img.src = jpg;
        img.alt = item.title;

        // Add the onclick attribute as requested
        img.setAttribute('onclick', 'openLightbox(this)');

        // Prevent the <a> default when clicking the image (so lightbox opens instead)
        img.addEventListener('click', (e) => {
          e.preventDefault();
        });

        link.appendChild(img);
        results.appendChild(link);
      });
  });
});

// Lightbox functions
function openLightbox(imgEl) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxLink = document.getElementById('lightboxLink');

  // Use the thumbnail src but show the full-size JPG (same path)
  lightboxImg.src = imgEl.src;
  lightboxImg.alt = imgEl.alt || '';
  // If you want the lightbox link to open the PDF, derive it from the JPG src:
  // replace .jpg with .pdf and set as href
  lightboxLink.href = imgEl.src.replace(/\.jpg$/i, '.pdf');

  lightbox.classList.add('show');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
  // clear src to stop any loading
  lightboxImg.src = '';
}

// Wire close button and click outside image to close
document.addEventListener('DOMContentLoaded', () => {
  const lb = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightboxClose');

  closeBtn.addEventListener('click', closeLightbox);

  // clicking the overlay (but not the image/link) closes the lightbox
  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
});
