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

        // Build JPG thumbnail path
        const jpg = item.file.replace('.pdf', '.jpg');

        // Create card
        const card = document.createElement('a');
        card.className = 'result-card';
        card.href = item.file;

        card.innerHTML = `
          <img src="${jpg}" alt="${item.title}">
        `;

        results.appendChild(card);
      });
  });
});
