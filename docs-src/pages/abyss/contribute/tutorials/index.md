---
uid: Abyss.Contribute.Tutorials.Index
---

2sxc has extensive tutorials, which are meant to help you learn how to use 2sxc.

* You can find the tutorials online here: [2sxc Tutorials](xref:Tut.Razor.Home)
* The repo is here: [](xref:Tut.Razor.Repo)

The system is quite complex, since it's a kind of database containing a lot of snippets.
What's special is that the snippets are not just text, but actually run Razor and JavaScript code.
Because of this, the structure needs some learning to understand how it works.

## Get Started

Leaving out all the verbose infos and get straight to contributing.

[See](xref:Abyss.Contribute.Tutorials.CreateTutorial)

## Tutorials Architecture

The code base is split into two main parts:

1. The UI which is the front-end listing the snippets etc. The code is mostly in the `/App_Code` folder as well as some Razor files in the `/tut-sys` folder.
1. The snippets which are stored in `/tutorials` folder

[See](xref:Abyss.Contribute.Tutorials.Verbose)
