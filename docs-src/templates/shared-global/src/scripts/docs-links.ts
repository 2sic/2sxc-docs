// Converts link syntax inside <div docs-links> into a tile layout
export function convertDocsLinks() {
  const links = document.querySelectorAll('ul li a[title^="icon:"]');
  if (!links.length)
    return;

  links.forEach((link) => {
    const listItem = link.closest("li");
    const list = link.closest("ul");

    if (!listItem || !list)
        return;

    // Make sure the list gets the needed classes
    list.classList.add(
      "row",
      "row-cols-1",
      "row-cols-sm-2",
      "row-cols-md-3",
      "g-3",
      "docs-tiles",
      "list-unstyled",
    );

    // Get the title
    const title = link.textContent?.trim() || "";

    // Everything else inside the <li> becomes the description
    const description = (listItem.textContent || "").replace(title, "").trim();

    // Get the target link
    const href = link.getAttribute("href") || "#";

    // Read the icon from the title "icon:file-code"
    const iconTitle = link.getAttribute("title") || "";
    const icon = iconTitle.startsWith("icon:") ? iconTitle.substring(5) : "";

    // Is icon emoji or bootstrap icon?
    const iconIsEmoji = /\p{Extended_Pictographic}/u.test(icon);
    const emoji = iconIsEmoji ? icon : "";
    const iconCss = !iconIsEmoji ? `bi bi-${icon || "link"}` : "";

    listItem.classList.add("col");

    // Build Html for the tile
    listItem.innerHTML = `
            <div class="card h-100 text-center position-relative">
                <div class="card-body d-flex flex-column justify-content-center align-items-center py-4">
                    <icon class="${iconCss} fs-1 text-primary mb-2">${emoji}</icon>
                    <div class="fw-semibold">${title}</div>
                    ${description ? `<div class="small text-muted mt-1">${description}</div>` : ''}
                </div>
                <a href="${href}"></a>
            </div>
        `;
  });
}
