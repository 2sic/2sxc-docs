---
uid: Abyss.Contribute.Tests.SystemDb
---

# Run Unit Tests in .net

_Important: If you only want to USE 2sxc / EAV, then **you do NOT need this**. This is meant for people who want to contribute to the source code of 2sxc and EAV._

2sxc and EAV have more than 1'000 Unit tests which require a DB to run.

This is explained here.

## Pre-Requisites

1. 2sxc server projects have been downloaded and placed as recommended in the checklists.
1. Compatibility Level 130 (SQL Server 2016) is required for the `eav-testing` database.
   This is to ensure that EF features of .net 9 work properly.

## Setup Tests

Follow this checklist:

<iframe src="https://azing.org/2sxc/r/vUQG9AgD?embed=1" width="100%" height="400" frameborder="0" allowfullscreen style="box-shadow: 0 1px 3px rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)"></iframe>
