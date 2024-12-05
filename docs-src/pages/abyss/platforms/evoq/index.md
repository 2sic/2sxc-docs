---
uid: Abyss.Platforms.Evoq.Index
---

<!-- <img src="~/assets/features/platform-dnn.svg" width="100%"> -->

# Evoq Platform, Content, Social & Liquid Content

[Evoq](https://www.dnnsoftware.com/) is the paid version of [Dnn](xref:Abyss.Platforms.Dnn.Index).
It's been around since ca. 2001.

## Dnn Evoq History and Liquid Content

Evoq originally started as a clone of Dnn in [2012](https://www.dnnsoftware.com/DOCS/developers/product-versions.html).
At that time it didn't have any real Dynamic Data / Dynamic Content features.
2sxc just worked on that version, but at that time was just getting started.

To compete with other paid enterprise CMS solutions such as SiteCore,
Evoq tried to re-invent the wheel in 2017 and created a system called **Liquid Content**
which was meant to provide similar functionality as 2sxc.
Evoq wasn't able to include 2sxc, because that would have made it identical to the free version,
so they were forced to brew their own.

The Liquid Content is very data-focused (records of data + visualizers) so it doesn't feel like Web Content Management at all.
It's more like a data-management + show-the-data-here kind of functionality.

It appears that after that, Evoq lost interest in this subject, because Liquid Content never got past v1.0.
According to users it misses a lot of very basic features such as multi-language, proper versioning and data-relationships.
It also doesn't work with Page-Workflow (2sxc does) and the templating language is so restrictive,
that solutions built using Liquid Content are forced to choose inappropriate data structures just to get it to work.

Many Evoq customers then switched to 2sxc because they felt that Liquid Content didn't deliver on its promises.

## Migrate from Liquid Content to 2sxc

We've tried various attempts to assist in migrations, but it doesn't make sense in any way.

The reason is that any work done in Liquid Content was restricted by missing features in the data models
as well as missing features in the home-brew templating language which is is based on [Liquid.net](https://github.com/mikebridge/Liquid.NET).
This means that any solution built using Liquid Content isn't made the way such a solution would be built,
and any automatic porting would result in a very strange data model which would make life really difficult.

So you best process is to simply start over. Sorry 🤷🏾.

## Evoq and 2sxc Version Compatibilities

| Evoq V.   | Best       | Compatible            | Comments |
| ---       | -----      | -------------------   | --- |
| 7.0 - 7.1 | unknown    | ✅ 3.4 - 6.04         |
| 7.2+      | 09.43 LTS  | ✅ 6.x - 09.43        |
| 7.4.2+    | 13.x LTS   | ✅ 7.x - 13.x         |
| 8.x       | 13.x LTS   | ✅ 9.x - 13.x         |
| 8.0 - 9.6 | 13.x LTS   | ✅ 9.x - 13.x         |
| 9.6.1+    | latest     | ✅ ca. v9 - latest    | changes to DI and .net 4.8


## Features currently not implemented

All 2sxc features are available in Evoq.
