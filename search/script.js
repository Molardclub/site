// Chargement du fichier JSON
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

        // Conteneur de l'image + overlay
        const wrapper = document.createElement('div');
        wrapper.className = 'result-item';

        // Lien vers le PDF
        const link = document.createElement('a');
        link.href = item.file;
        link.className = 'result-link';

        // Image miniature
        const img = document.createElement('img');
        img.src = jpg;
        img.alt = item.title;

        // Overlay sombre + texte
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.innerHTML = `
          <div class="title">${item.title}</div>
          <p>${item.author}<br>${item.month}, ${item.year}</p>
        `;

        // Construction
        link.appendChild(img);
        wrapper.appendChild(link);
        wrapper.appendChild(overlay);
        results.appendChild(wrapper);
      });
  });
});
