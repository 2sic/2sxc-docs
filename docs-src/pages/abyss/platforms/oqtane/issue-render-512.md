---
uid: Abyss.Platforms.Oqtane.Install.IssueRender050102
---

<img src="~/assets/features/platform-oqtane.svg" width="100%">

# Issue with Interactive Render Mode in Oqtane 5.1.2

Oqtane 5.1 changed a lot to support the new .net 8 Server-Side-Rendering (SSR) and Interactive Render Mode.
This is a great feature, but at the moment Oqtane 5.1.2 still has various bugs
which cause problems - mainly in the combination:

* Interactive Render Mode
* together with Server Side Interactivity (Signal-R)

## Background

While implementing the new SSR modes in Oqtane 5.1+, a lot was changed under the hood,
resulting in bugs in the Interactive Render Mode.

Various pieces of information about the current site are missing at crucial moments,
resulting in broken behavior and loss of "connection" between the client and server.
It appears to be a timing problem, which should be fixed in a future version of Oqtane.

The final effect will be that the page will render correctly, but after that most things will fail to work,
including normal clicks on a button or link.

## Workaround

2sxc 18.0 runs on Oqtane 5.1.2 (previous versions of 2sxc don't run at all),
but as of now only the **Server-Side-Rendering** mode is stable enough.

So to get 2sxc to run on an Oqtane 5.1.2 site, you must change the Render Mode to either

* **Static** (Server-Side Rendering)
* or to **Interactive** with Client-Side Rendering (WASM)

As of now we believe that for most sites, Static Rendering is the preferred mode anyhow,
which is why we decided to release 2sxc with this limitation.

## Next Steps

We strongly hope that Oqtane 5.2 will improve these issues, but as of 2024-07-10
Oqtane 5.2 is still very unstable, so we cannot anticipate how quickly these issues will be resolved.

---

Shortlink to here: <https://go.2sxc.org/oqt-512>
