---
uid: Specs.DocsContribute
---
## How to contribute to this documentation
This documentation is a github page created with docfx stored in a github repository. 


TODO: THIS INFORMATION IS OUT OF DATE - IF YOU WISH TO CONTRIBUTE, PLEASE CONTACT THE iJungleboy.

## Working with images and asset-files
Adding images is very difficult when editing online (there's no upload feature) but it's very easy when editing offline, because you can create folders and push them back. Please use the following structure for now

* assets (contains all the assets)
  * logos (contains various logos, for re-use)
  * contribute (assets for the page _Contribute_)
  * \[page-name\] (assets for each specific page)

If you have any other image/file needs which need different structure, please discuss with Daniel @iJungleboy.


## About the Markdown Syntax
If you're new to wikis or github comments / documentation, you may be a bit lost when it comes to markdown. I think the most important things you need to know are:

* Headers have 1-6 hashes in front, like `## Header 2`
* **bold** uses two \* chars around the text, _\_italic\__ uses one \_ char, escaping chars uses the \ slash (so any character right after a \\ is shown and doesn't format)
* Linking has many options, better read the manuals
* Lists have many options, better read the manuals
* Images use a \!\[alt-text\](/assets/path/file.ext) syntax
* Note that line-breaks usually don't cause a line-break in the result (except in code-samples). You can enforce a simple line break by adding two spaces at the end of a line like "check out:  " (two spaces after the ":") 

Inline code starts and ends with a "\`" character - like \`code\` - it will then look like `code`

Multi-line code blocks start with three of these, like  
\`\`\`  
var x = 17; // a comment  
\`\`\`  
resulting in  
```
var x = 17; // a comment
```
Multi-line code with syntax highlighting needs you to specifiy the language c#:  
\`\`\`c#  
var x = 17; // a comment  
\`\`\`  
resulting in  
```c#
var x = 17; // a comment
```  

## Copyright
![CC-BY](https://licensebuttons.net/l/by/4.0/88x31.png)
All docs are licensed as [CC-BY](https://creativecommons.org/licenses/by/4.0/). By contributing you agree that your work can be used in this way. 
