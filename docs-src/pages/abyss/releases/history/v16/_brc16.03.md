
### Breaking Changes in 2sxc 16.03

#### API Changes which affect you if you had installed v16.01/16.02 with the latest Blog or Mobius

1. Base classes were renamed because of confusing ...Pro suffix. RazorPro is now RazorTyped, ApiPro is ApiTyped and CodePro is CodeTyped #3147
1. Now by default, all access to a property like .String("SomeName") will throw an error in required mode if the field doesn't exist #3138
1. The .Parents(...) was enhanced to require named parameters (see blog post) #3139
