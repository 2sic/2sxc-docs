---
uid: Abyss.Contribute.Backend.Tests.Index
---

# Contribute to 2sxc / EAV Tests

[!include[""](../../_contributors-only.md)]

2sxc has about 3'500 unit tests and growing.
This is a guide to help you understand how to run them, and how to contribute to them.

## Pre-Requisites

* all the pre-requisites for building 2sxc

## Background

On 2sxc and the EAV project we strive to have many unit tests, but as always it's hard to keep up.

One of the challenges is also that some of the tests were written when we were less experienced, so we would do it better today.
So if you do review some tests, note that they may not use the latest best practices.


## Conversion to xUnit - Progress

1. ✅ `ToSic.Lib` - 100%
    1. ✅ `ToSic.Lib.Core.Tests`
    1. ✅ `ToSic.Lib.DI.Tests`
1. ✅ `ToSic.Eav.Core` - 100%
    1. ✅ `ToSic.Eav.Core.TestHelpers` (Startup and Test-Accessors)
    1. ✅ `ToSic.Eav.TokenEngine.Tests`
    1. ✅ `ToSic.Eav.Core.TestsBasic` (basic tests)
    1. ✅ `ToSic.Eav.Data.Tests` (data tests)
    1. ✅ `ToSic.Eav.StartupTests` (full tests)
1. ✅ `ToSic.Eav.DataSources` - 100%
    1. ✅ `ToSic.Eav.DataSource.TestHelpers`
    1. ✅ `ToSic.Eav.DataSource.Tests` (unit tests)
    1. ✅ `ToSic.Eav.DataSource.DbTests` (system tests)
