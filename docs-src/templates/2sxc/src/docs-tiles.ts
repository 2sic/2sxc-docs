
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
    const title = tile.getAttribute('title') || '';
    const link = tile.querySelector('a')?.getAttribute('href') || '#';

    // Figure out the icon, and if it's an emoji or a bootstrap icon
    const icon = tile.getAttribute('icon') || '';
    const iconIsEmoji = /\p{Extended_Pictographic}/u.test(icon);
    const emoji = iconIsEmoji ? icon : '';
    const iconCss = !iconIsEmoji ? `bi bi-${icon || 'link'}` : '';

    // Make sure this div is now a proper bootstrap col
    tile.classList.add('col');

    // Construct the HTML which will make the tiles and everything clickable
    // Note that this relies on some CSS, which is in the main.scss file,
    // to make the entire card clickable, even though the <a> tag is only at the bottom
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
