---
uid: Basics.App.PrimaryApp.Index
---

# The _Primary_ App

The **Primary** App is a special App in each Site which is automatically created whenever you start using 2sxc on a site. 
The core purpose is storing site-wide [Settings](xref:Basics.Configuration.Index) and [Metadata](xref:Basics.Metadata.Index). 

> [!TIP]
> The content App has some special behavior and limitations by design. 
> For example: It is not meant to be added to a page. 
> 
> Since it is the **primary App** in a Site, some settings on this app
> affect other Apps in the site. 
> Read more about [Settings](xref:Basics.Configuration.Index)


## Special Limitations of The Primary App

Since the Primary-App is meant for settings, it has some limitation. 
The limitations are:

1. Should never be added to a page as of v13 (future releases may change this)

## Technical Details

1. Each Site/Portal has an own Primary App
1. The ID of the Content-App is `251c0000-eafe-2792-0001-000000000001`

---

## History

1. Concept introduced in 2sxc v12 but there the Content App was also the Primary App
1. Standalone `Primary` App in 2sxc v13 (breaking change)