---
uid: Abyss.Contribute.Internals.BackendProjects
---

# Backend Projects and Relationships WIP v20

...trying to model how the projects should interlink and what their responsibility is...

```mermaid
flowchart TB
    A["Sxc.Code.Generate"] --> n1["Sxc.Custom"] & n2["Sxc.Code"]
    n7["Sxc.LightSpeed"] --> n5["Sxc.Blocks"]
    n1 --> n2
    n2 --> n3["Sxc.Services"] & n4["Sxc.Apps"] & n5
    n5 --> G["Sxc (core)"]
    n4 --> G
    n3 --> G
    n6["Sxc.Code.Hotbuild"] --> G
    n8["Sxc.Engines"] --> G
    n9["Sxc.WebApi"] --> A
    n10["Sxc.Edit"] --> G

    n1@{ shape: rect}
    n7@{ shape: rect}
    n5@{ shape: rect}
    n3@{ shape: rect}
    n4@{ shape: rect}
    n6@{ shape: rect}
    n8@{ shape: rect}
    n9@{ shape: rect}
    n10@{ shape: rect}


