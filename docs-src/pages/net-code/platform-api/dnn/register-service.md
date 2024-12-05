---
uid: NetCode.PlatformApi.Dnn.RegisterService
---

<img src="~/assets/features/platform-dnn.svg" width="100%">

# Create and Register Custom Services in Dnn

If you are creating your own solutions and want to provide the services to DNN or 2sxc code, this is what you need to know.

> [!NOTE]
> This requires Dnn 9.4+

You need to create a class that implement `IDnnStartup` like this

```c#
using azing.Catalog.Permissions;
using DotNetNuke.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace azing.Catalog
{
    public class StartupAzing : IDnnStartup
    {
        // This is the new v13 mode, requires DNN 9.44+
        public void ConfigureServices(IServiceCollection services)
        {
            services.TryAddTransient<AppPermissions>();
        }
    }
}

```

[!include["history"](../../services/_history.md)]
