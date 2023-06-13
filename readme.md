# 2sxc Docs

This repo is the source for the current <https://docs.2sxc.org>.

We keep it in a separate repo so docs-changes don't clutter the git-history of the EAV/2sxc software.

To generate the docs you have two options

1. With VS Code, just open the folder `2sxc Docs Generator` and `docfx` in the terminal
1. With Visual Studio, open the solution in the folder `2sxc Docs Generator` and rebuild solution

Further instructions: <https://docs.2sxc.org/abyss/contribute/docs.html>

Note that for this to work, these two repos must be in sibling folders, like this

* Some root, like `c:\projects\2sxc\`
    1. `2sxc-docs` (this solution)
    1. `2sxc` - this repo: [2sxc](https://github.com/2sic/2sxc)
    1. `eav-server` - this repo: [EAV Server](https://github.com/2sic/eav-server)
