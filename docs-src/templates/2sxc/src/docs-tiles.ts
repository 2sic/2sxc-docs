
// find icons here https://icons.getbootstrap.com/
export function convertDocsTiles() {
  const tileWrappers = document.querySelectorAll('div[docs-tiles]');
  if (!tileWrappers) return;

  tileWrappers.forEach(tileWrapper => {
    // make sure it gets these classes: "row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 docs-tiles"
    tileWrapper.classList.add('row', 'row-cols-1', 'row-cols-sm-2', 'row-cols-md-3', 'g-3', 'docs-tiles');
  });

  const tiles = document.querySelectorAll('div[docs-tiles] div');
  tiles.forEach(tile => {
    const icon = tile.getAttribute('icon') || '';
    const emoji = tile.getAttribute('emoji') || '';
    const iconCss = !emoji ? `bi bi-${icon}` : '';
    const title = tile.getAttribute('title') || '';
    const link = tile.querySelector('a')?.getAttribute('href') || '#';
    tile.classList.add('col'); //, 'card', 'h-100', 'text-center', 'position-relative');
    tile.innerHTML = `
      <div class="card h-100 text-center position-relative">
        <div class="card-body d-flex flex-column justify-content-center align-items-center py-4">
          <icon class="${iconCss} fs-1 text-primary mb-2">${emoji}</icon>
          <div class="fw-semibold">${title}</div>
        </div>
        <a href="${link}"></a>
      </div>
    `;
  });
}
