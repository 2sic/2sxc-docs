---
uid: Basics.LnF.Licenses.Enterprise
---

<img src="~/assets/features/2sxc-patrons.svg" class="feature">

# Enterprise Licenses in 2sxc

Most licenses are system bound.
This means that the system generates a fingerprint, and the license is then activated for that specific system.
You can read more about it in [licenses](xref:Basics.LnF.Licenses.Index).

**Enterprise Licenses** are hear for scenarios where you must license many system with a special agreement with 2sxc.
Common examples are:

1. Hosters who wish to activate certain optimizations on all the systems they host
1. Features sponsors who "own" a feature and get to use it on all the systems they have
1. Enterprise customers with web-farms who have more complicated setups - eg. where the DB name changes, resulting in different fingerprints

## How it Works

Enterprise licenses consist of two files:

1. An **Identity** containing a fingerprint which is stored in a special data file
1. A **License** file which is stored just like any other license

Both files are stored at the system level in a folder which is preserved through upgrades.
The location is:

* On Dnn this is: `[WebRoot]/DesktopModules/ToSIC_SexyContent/App_Data/system-custom/`
* On Oqtane this is `[WebRoot]/Content/2sxc/system/App_Data/system-custom/`

👉🏻 See also [](xref:Abyss.Platforms.Folders)

Within this folder, there are two sub-folders:

* `entities` - which contains the **Identity** file
* `configurations` - which contains the **License** file

A typical setup will look like this:

* `[...]/App_Data/system-custom/`
  * `entities/`
    * `12345678-abcd-abcd-abcd-1234567890ab.Company-Name.json`
  * `configurations/`
    * `Company-Name.license.json`

At startup, these files are loaded and security checks are performed, then the licenses are activated.

## License Deployment

You will receive the files from 2sxc.

### Manual One-Time License Deployment

You can upload them manually to the system.
Just make sure the files are really in that location.

### Automated License Deployment

Please use one of the following options:

1. Include the files in your Dnn / Oqtane template
1. Create a module for Dnn / Oqtane with these files
1. Create PowerShell scripts to deploy the files

---

## History

1. Licenses introduced iv v13.02
1. Enterprise Licenses introduced in v15
