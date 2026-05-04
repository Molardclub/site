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

        link.appendChild(img);
        results.appendChild(link);
      });
  });
});
