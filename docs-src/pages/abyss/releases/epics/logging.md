---
uid: Abyss.Releases.Epics.Logging
---

# Epic: Logging with Microsoft.Extensions.Logging

Move EAV and 2sxc logging to Microsoft.Extensions.Logging (MEL),
while keeping the existing logging calls and the Insights experience.
This connects 2sxc diagnostics to the logging providers configured by the host.

## 📈 Status Overview ⌛ WIP - Updated: 2026-10-19

* Implementation: ca. 70% (roadmap estimate; core integration is on `develop`, hardening remains)
* Documentation: overview and host configuration below; detailed guides and tutorials remain
* Next Priorities:
    1. Harden logging failure handling and diagnostic output
    1. Finish Insights presentation and history consistency
    1. Measure performance and validate both hosts before wider rollout

> [!NOTE]
> Implemented on `develop` does not mean released or ready for general production use.
> MEL is opt-in. Legacy remains the default while the remaining work is completed.

## Motivation

2sxc has its own logging API and an Insights UI tailored to debugging apps, modules and startup.
MEL makes these diagnostics available to standard host logging providers as well,
without requiring all existing callers to be rewritten.
It also provides structured events and request correlation for future observability integrations.

## Features Needed

### Logging API and stack selection (✅ done)

1. ✅ Keep the existing `ILog`, `Fn`, `Done` and `Return` calling patterns.
1. ✅ Create logs through a factory, with separate Legacy and MEL implementations.
1. ✅ Select one complete logging stack before the first startup log is created.
1. ✅ Register the matching store and Insights reader; reject mixing the two stacks.
1. ✅ Configure selection in DNN and Oqtane, once per application lifetime.

📈 Status: ✅ Implemented on `develop`. Compatibility edge cases still need hardening.

### Host logging and startup diagnostics (✅ done)

1. ✅ Send structured events through the host's `ILoggerFactory` using `ToSic.*` categories.
1. ✅ Include source location, log name, severity and available `Activity` trace/span identifiers.
1. ✅ Emit operation completion, result and timing data, plus separate log metadata events.
1. ✅ Establish DNN request correlation; use the ambient `Activity` when available.
1. ✅ Buffer pre-DI startup events and replay them after the host logger factory becomes available.

The startup buffer retains at most 4,096 events or 1 MiB of diagnostic characters.
It drops whole events when necessary and reports the dropped count after binding.
Replayed events retain their original timestamps and detached exception diagnostics.

The host owns the logger factory and its providers.
Where DNN does not already supply a factory, `AddLogging()` supplies one.
Enabling MEL does not automatically install a file logger, Serilog sink or telemetry exporter.

📈 Status: ✅ Implemented on `develop`; provider failure handling and live host validation remain.

### Insights with MEL (⌛ WIP)

1. ✅ Capture detached, immutable diagnostic events in a bounded in-memory store.
1. ✅ Read both Legacy and MEL diagnostics through snapshot readers for Insights.
1. ✅ Support listing, detail views, pause/resume and flushing.
1. ✅ Group histories by the log added to a store (`LogGroupId`), with named segments such as `boot-log`.
1. ✅ Use `TraceId` to correlate related histories within a request.
1. ✅ Preserve precise start times and durations for rendering.
1. 🔳 Finish presentation parity: timings, hierarchy/indentation, timers and recognizable log/instance names.
1. 🔳 Check early messages from other producers and shared services across multiple modules and asynchronous calls.
1. 🔳 Finish obsolete-code warning compatibility and restore missing list information where needed.

The MEL Insights store currently defaults to 4,096 events, 500 groups and a 16 MiB estimated retention budget,
with a maximum of 4,096 events per group.
The byte budget is an estimate, not a measured process-memory limit.
Insights is an in-memory diagnostic history; it is not persistent log storage.

📈 Status: ⌛ The read path and detail rendering are implemented; full Legacy-equivalent behavior is still being finalized.

## Configuration

The setting `Logging:2sxc:UseMel` selects the complete stack at application startup:

| Value | Selected stack |
| --- | --- |
| `true` | MEL, including the MEL Insights provider and store |
| `false`, missing or invalid | Legacy |

Changing the setting requires an application restart.
The mode cannot be switched per request or by reloading configuration during the same application lifetime.
To return to Legacy, set it to `false` and restart the application.

### DNN: web.config

Add or update the entry inside the existing `<appSettings>` element in the **DNN host installation's** `web.config`:

```xml
<configuration>
  <appSettings>
    <add key="Logging:2sxc:UseMel" value="true" />
  </appSettings>
</configuration>
```

Merge this entry into the existing configuration; do not replace other settings or create a second `<appSettings>` element.
The `web.config` in the 2sxc source project is a Visual Studio placeholder, not the host configuration.
Restart/recycle the DNN application after changing the setting.

### Oqtane: appsettings.json

Merge this property into the existing `Logging` section in the **Oqtane host installation's** `appsettings.json`:

```json
{
  "Logging": {
    "2sxc": {
      "UseMel": true
    }
  }
}
```

Preserve the other logging settings and restart the Oqtane application.
Currently, 2sxc reads this flag through its own configuration builder loading only `appsettings.json`.
Environment variables such as `Logging__2sxc__UseMel` and `appsettings.Production.json` do not override this flag in that reader.
Using the host configuration consistently is remaining work.

### Log levels and providers

`UseMel` selects the backend; it does not configure the host's sinks or their log levels.
The Insights provider has its own `Trace` rule, without lowering the filters for other providers.
Ordinary diagnostic messages and metadata use `Trace`, operation completions/results use `Debug`,
and warnings/errors use their corresponding MEL levels.
As a result, detailed messages can appear in Insights while being absent from host log files.
Host providers can also impose their own filtering or support different structured properties.

## Planned Improvements and Roadmap

### Before wider MEL rollout

1. 🔳 **Failure isolation and compatibility:** prevent failing host providers from breaking application work;
   cover null/disabled parent-log edge cases and obsolete-code warnings;
   verify static factory selection and DI registration agree in supported startup flows.
1. 🔳 **Diagnostic output:** harden DNN debug-comment output and review request-wide dumps,
   automatic result stringification and sensitive data retention before sending more detail to host sinks.
1. 🔳 **Insights consistency:** finish the presentation and history work above,
   including early messages, shared services and asynchronous links.
1. 🔳 **Performance:** measure and reduce the global forwarding lock, store sorting/scanning under locks,
   snapshot costs and per-log `AsyncLocal` overhead; check paused-capture costs and retention under load.
1. 🔳 **Configuration and discoverability:** report the active stack clearly and align Oqtane flag loading with host configuration.
1. 🔳 **Validation and release documentation:** run representative DNN and Oqtane scenarios in both modes,
   including startup, multiple modules, APIs, errors, pause/flush, provider failures and sustained load;
   publish the supported configuration and troubleshooting guidance.

### Features in Consideration

1. Standard telemetry integrations such as OpenTelemetry/OTLP and Aspire, configured through the host.
1. Further simplification of internal logging once compatibility and Insights behavior are established.

📈 Status: 🔳 Future integration work; exporters and external telemetry storage are not part of the implemented core.

## Related Features

1. 2sxc Insights and application diagnostics
1. DNN and Oqtane host logging providers, including Serilog where configured by the host
1. `System.Diagnostics.Activity` request correlation
1. Startup and app-load debug-level configuration

## History

1. 2026-09 implemented the logging factory, MEL events, bounded Insights storage and host integration.
