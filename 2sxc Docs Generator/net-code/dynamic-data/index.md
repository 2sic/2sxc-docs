---
uid: NetCode.DynamicData.Index
---

# Dynamic Data

2sxc does a lot for you it making sure your templates get the right data. 
Once you've gotten the basics to work, it's important that you understand what's really happening in the background. 
This section should give you that overview. 

## DynamicEntities vs. Entities

When working with 2sxc data, there are two core data objects you for everything:

1. [Dynamic Entities](xref:NetCode.DynamicData.DynamicEntity)  
    These are simple, _dynamic_ objects that allow you to write template with any property you believe the data should have, like `@person.FirstName` etc. They will automatically pick the right language and do a lot of magic 🧙‍♂️ in the background. 
1. [Entities](xref:NetCode.DynamicData.Entity)  
    These are strongly typed objects for complex work, but getting values is much more difficult. You usually don't need this, but it's important that you know this exists. 

Each type can be converted to the other type using helpers like [AsDynamic(...)](xref:NetCode.DynamicCode.AsDynamic), [AsList(...)](xref:NetCode.DynamicCode.AsList) and [AsEntity(...)](xref:NetCode.DynamicCode.AsEntity). 
Learn more in [](xref:NetCode.DynamicData.EntityVsDynamicEntity).

> [!TIP]
> In most cases you'll always use [Dynamic Entities](xref:NetCode.DynamicData.DynamicEntity) and if you're not sure whan an object is, just run it through [AsDynamic(...)](xref:NetCode.DynamicCode.AsDynamic).



## Instance Specific Data

> [!NOTE]
> Instance specific data _belongs_ to the module-instance on the page, either because it was manually added or because the module-instance uses a Query which is specific to this module. 

When a 2sxc module is added to a page the editor decides what should be shown. Based on configurations 2sxc will then ensure that the right data is provided to the template to match expectations. There are two scenarios:

1. In the **Content Mode** the editor will add/edit content in the module, and this content is then linked to this module instance.  
2sxc keeps track of where things are added. It then prepares this data before your code runs to make it super-easy for you to access these items. 
1. In the **Data Mode** the template has been configured to use a query. This query can be parameterized by the module instance (similar to the _Content Mode_) but the data prepared for the template is retrieved from a query. 

In both of these cases, the following objects are then pre-populated with the correct data, making it easy to use in a template or Web API:

[!include["List of Data Context Objects"](../dynamic-code/_include-instance-data.md)]



## Conversion Commands

[!include["Conversions"](../dynamic-code/_include-conversions.md)]