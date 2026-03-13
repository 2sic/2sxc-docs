
// Converts link syntax inside <div docs-links> into a tile layout
export function convertDocsLinks() {
    //Find all wrappers using the syntax
    const linkWrappers = document.querySelectorAll('div[docs-links]');
    if(!linkWrappers) 
        return;

    linkWrappers.forEach(linkWrapper => {
        // Add bootstrap classes
        linkWrapper.classList.add('row', 'row-cols-1', 'row-cols-sm-2', 'row-cols-md-3', 'g-3', 'docs-tiles');

    });

    // Find all elements inside the wrappers
    const links = document.querySelectorAll('div[docs-links] a');

    links.forEach(link => {
        const wrapper = link.parentElement as HTMLElement;


        // Get the title
        const title = link.textContent || '';
        
        // Get the link
        const href = link.getAttribute('href') || '#';

        // Get the icon, and determine if it's an emoji or a bootstrap icon
        const icon = wrapper?.getAttribute('icon') || link.getAttribute('icon') || '';
        const iconIsEmoji = /\p{Extended_Pictographic}/u.test(icon);
        const emoji = iconIsEmoji ? icon : '';
        const iconCss = !iconIsEmoji ? `bi bi-${icon || 'link'}` : '';

        // Create the column wrapper
        const col = document.createElement('div');
        col.classList.add('col');

        // Build the title card
        col.innerHTML = `
            <div class="card h-100 text-center position-relative">
                <div class="card-body d-flex flex-column justify-content-center align-items-center py-4">
                    <icon class="${iconCss} fs-1 text-primary mb-2">${emoji}</icon>
                    <div class="fw-semibold">${title}</div>
                </div>
                <a href="${href}"></a>
            </div>
        `;
        // Replace the original link with the new column
        wrapper?.replaceWith(col);
    });
}