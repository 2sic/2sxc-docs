1. [Data](xref:NetCode.DynamicCode.Data) (IDataSource)  
    This object gives you all the data which was meant to be used by this Templates
1. [Content](xref:NetCode.DynamicCode.Content) (a [DynamicEntity](xref:NetCode.DynamicData.DynamicEntity))  
    The primary and often the only content-item in the [Data](xref:NetCode.DynamicCode.Data) for this template. 
1. [Content.Presentation](xref:NetCode.DynamicCode.Content) (a [DynamicEntity](xref:NetCode.DynamicData.DynamicEntity))  
    Can contain additional presentation settings for this content, like how to format it. 
1. [Header](xref:NetCode.DynamicCode.Header) (a [DynamicEntity](xref:NetCode.DynamicData.DynamicEntity))  
    The header data if the template expects to be a list and also needs a title or intro.
1. [Header.Presentation](xref:NetCode.DynamicCode.Content) (a [DynamicEntity](xref:NetCode.DynamicData.DynamicEntity))  
    Can contain additional presentation settings for the header, like how to format it. 