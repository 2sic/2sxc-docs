---
uid: Abyss.Contribute.Docs.Deploy.Index
---

[!include["many-projects"](../_docs-for-many-projects.md)]

# Deploy the Docs to GitHub

This documentation is static HTML which can be hosted on any web server.

As of now it's hosted an GitHub Pages, which automatically hosts the `/docs` folder of this repository.

Push the result back to the repository.
GitHub will automatically publish the updated documentation to:

* 🌴 2sxc: <https://docs.2sxc.org>
* 🩸 Oqtane: <https://docs.oqtane.org>
* ♾️ cre8magic: <https://cre8magic.blazor-cms.org/>

## How it Works

For this to work, the GitHub repository must be configured to host GitHub pages.

After every push, GitHub will review the `/docs` folder and publish it to the configured URL. This can take between 1 and 10 minutes.

> [!WARNING]
> Github allows us to use our own domain name (otherwise it would be `https://2sic.github.io/2sxc-docs` or something).
>
> But this is a bit fragile, a file called `CNAME` must be in the `/docs` folder with the domain name in it.
> If it is deleted, the domain will stop working and a repo-admin will need to configure the domain anew. 

---

[!include[](~/shared/authors/iJungleboy/_main-author.md)]
