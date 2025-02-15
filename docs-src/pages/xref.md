# Find XREF and Redirect

This page will redirect you to the correct page based on an XREF documentation reference.

<!-- Placeholder for JS to show the redirect which was found in the URL Parameters -->
Found the following XREF reference: <code id="xref-show">loading...</code>

<!-- Placeholder for JS to show the target URL -->
Target is: <a id="xref-target" href="#">loading target...</a>

<!-- Message that it will redirect, and hidden placeholder to show if cancelled -->
Auto redirect in 1 seconds unless you press escape or the XREF was not found...
<code id="xref-cancelled" style="display: none">cancelled</code>

---

## Internal Notes / Information

Goal is to redirect to a documentation XREF or Namespace.
If we ever make bigger changes which change important XREFs, we would add manual redirect XREFs to the `/xrefmap.yml`.

* Shortlink: <https://go.2sxc.org/find>
* Shortlink current version of the docs: <https://go.2sxc.org/xref17>
* Expected url parameters: `xref`
* Test this directly: [ToSic.Sxc.Data](/xref.html?xref=ToSic.Sxc.Data)
* Test this directly: [ToSic.Sxc.Data.ITypedItem](/xref.html?xref=ToSic.Sxc.Data.ITypedItem)
* Test using redirect: <https://go.2sxc.org/find?xref=ToSic.Eav.Data>
* Test current version  redirect: <https://go.2sxc.org/xref17?xref=ToSic.Eav.Data>

## History

* Introduced ca. 2022 handling inbound links, using the `go.2sxc.org/xref17` shortlink
* Improved 2025-02-15 with the nicer `go.2sxc.org/find` shortlink
