---
uid: Basics.Server.Render.Tokens.Index
---
# Token Templates

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .process-razor { visibility: visible; } </style>

Token Templates will generate HTML - often based on the data a editor entered, and/or which was provided from the App.

> [!NOTE]
> The [View](xref:Basics.App.Views) determines which template file is being loaded. 

> [!TIP]
> Token templates are by far not as powerful as [Razor Templates](xref:NetCode.Razor.Index). We always recommend Razor. 

## Example Template

```html
<h1>[Header:Title]</h1>
<ul>
  <repeat>
    <li><a href="[Content:Link]">[Content:Title]</a> [Content:Toolbar]</li>
  </repeat>
</ul>
```

## How it Works

Token templates use a Token Engine to generate Html. The convention uses placeholders like `[Scope:Property]` to put data into the Html. 

The template files usually reside inside app root folder or sub folder. These end with `.html`. 
Placeholders and code usually is marked with `[...]` like `[Content:Name]`.

In addition, there is a special `<repeat>` token to create lists.

> [!TIP]
> Tokens are very limited, we strongly recommend to use [Razor Templates](xref:Basics.Server.Render.Razor.Index) templates instead. 

## Technical Conventions

Internally the Token-Engine uses [LookUps](xref:Basics.LookUp.Index) to find what can be shown. 

Your most common sources will be 

* `App` - the current App, which can give you folders (to link JS files)
* `App:Settings` - app settings
* `App.Resources` - app resources, for multi-language labels etc.
* `Content` - the current content
* `Content:Presentation` - presentation settings of the current content, if configured
* `Tab` - the current DNN page
* `Module` - the current DNN module
* `Portal` - the current DNN portal
* `DateTime`
* `QueryString`
* `User`
* `Profile`
* `Server`

> [!TIP]
> You can find a complete list of tokens and possible properties here further below.

There is also a repeater feature to go through many content-items, using `<repeat>`. Read more about it in the [Token Basics](https://2sxc.org/en/learn/token-templates-and-views)

## Content and Header Tokens

* Use `[Content:PropertyName]` like `[Content:FirstName]`
* Use `[Content:Presentation:PropertyName]` like `[Content:Presentation:UseLightbox]`
* Use `[ListContent:PropertyName]` like `[ListContent:Title]`  
_note: this is inconsistent with the latest Razor recommendations to use the `Header` object_
* Use `[ListContent:Presentation:PropertyName]` like `[ListContent:Presentation:UseLightbox]`  
_note: this is inconsistent with the latest Razor recommendations to use the `Header.Presentation` object_


👉 See [](xref:Basics.LookUp.App)

👉 See [](xref:Basics.LookUp.Dnn)

## DNN DateTime / Ticks Tokens

<table summary="" border="0" cellpadding="2" cellspacing="3" width="100%">
    <thead>
        <tr>
            <td>Token</td>
            <td>Description</td>
            <td>Result</td>
        </tr>
    </thead>
    <tr>
        <td>&#91;DateTime:Now]</td>
        <td>Current Date and Time</td>
        <td>12/2/2019 3:05 AM</td>
    </tr>
    <tr>
        <td>&#91;Ticks:Now]</td>
        <td>CPU Tick Count for Current Second</td>
        <td>637108851369920459</td>
    </tr>
    <tr>
        <td>&#91;Ticks:Today]</td>
        <td>CPU Tick Count since Midnight</td>
        <td>637108416000000000</td>
    </tr>
    <tr>
        <td>&#91;Ticks:TicksPerDay] </td>
        <td>CPU Ticks per Day (for calculations)</td>
        <td>864000000000 </td>
    </tr>
</table>

<p>Note that according to the DNN-Source-Code there are a total of 11 sources (status 2015-05-05). The ones not mentioned here are: </p>
<ol>
	<li>Date (missing above)</li>
	<li>Culture	(missing)		</li>
	<li>Host (missing)			</li>
</ol>

## QueryString Tokens

<h2>Extended Standard Tokens</h2>
<p>The following tokens are still very "normal" but not part of the common DNN tokens. They work in 2sxc - but not in many DNN-Tools</p>

<table summary="" border="0" cellpadding="2" cellspacing="3" width="100%">
    <thead>
        <tr>
            <td>Token</td>
            <td>Description</td>
            <td>Result</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>&#91;QueryString:&lt;Url-Param-Name&gt;]</td>
            <td>String</td>
            <td>-</td>
        </tr>
        <tr>
            <td>&#91;QueryString:TabId]</td>
            <td>String - this demo shows the TabId <br>which is in the QueryString because of the internal URL-Rewrite. </td>
            <td>730</td>
        </tr>
        <tr>
            <td>&#91;QueryString:Category]</td>
            <td>String - click <a href="?Category=Design">here</a> to see effect</td>
            <td></td>
        </tr>
</table>

## Form Tokens

<table summary="" border="0" cellpadding="2" cellspacing="3" width="100%">
    <thead>
        <tr>
            <td>Token</td>
            <td>Description</td>
            <td>Result</td>
        </tr>
    </thead>
        <tr>
            <td>&#91;Form:&lt;Form-Param-Name&gt;]</td>
            <td>Form post values. Usually not needed, but if you do need it, it's here.</td>
            <td>-</td>
        </tr>
</table>

## Server Tokens

<table summary="" border="0" cellpadding="2" cellspacing="3" width="100%">
    <thead>
        <tr>
            <td>Token</td>
            <td>Description</td>
            <td>Result</td>
        </tr>
    </thead>
        <tr>
            <td>&#91;Server:&lt;Server-Property&gt;]</td>
            <td>Many Server-Properties</td>
            <td>-</td>
        </tr>
        <tr>
            <td>&#91;Server:PATH_INFO]</td>
            <td>Example of a property</td>
            <td>/Default.aspx</td>
        </tr>        
</table>

### All Server variables

<table summary="" border="0" cellpadding="2" cellspacing="3" width="100%">
    <thead>
        <tr>
            <td>Token/Variable</td>
            <td>Description</td>
        </tr>
    </thead>
<tr>
<th style="width:20%">Variable</th>
<th>Description</th>
</tr>
<tr>
<td>[Server:ALL_HTTP]</td>
<td> Returns all HTTP headers sent by the client. Always prefixed
      with HTTP_ and capitalized</td>
</tr>
<tr>
<td>[Server:ALL_RAW]</td>
<td> Returns all headers in raw form</td>
</tr>
<tr>
<td>[Server:APPL_MD_PATH]</td>
<td> Returns the meta base path for the application for the ISAPI
  DLL</td>
</tr>
<tr>
<td>[Server:APPL_PHYSICAL_PATH]</td>
<td> Returns the physical path corresponding to the meta
      base path</td>
</tr>
<tr>
<td>[Server:AUTH_PASSWORD]</td>
<td>Returns the value entered in the client's authentication dialog</td>
</tr>
<tr>
<td>[Server:AUTH_TYPE]</td>
<td> The authentication method that the server uses to validate users</td>
</tr>
<tr>
<td>[Server:AUTH_USER]</td>
<td>Returns the raw authenticated user name</td>
</tr>
<tr>
<td>[Server:CERT_COOKIE]</td>
<td>Returns the unique ID for client certificate as a string</td>
</tr>
<tr>
<td>[Server:CERT_FLAGS]</td>
<td> bit0 is set to 1 if the client certificate is present and bit1 is set to 1 if the cCertification authority of the client certificate is
  not valid</td>
</tr>
<tr>
<td>[Server:CERT_ISSUER]</td>
<td>Returns the issuer field of the client certificate</td>
</tr>
<tr>
<td>[Server:CERT_KEYSIZE]</td>
<td>Returns the number of bits in Secure Sockets Layer connection key
  size</td>
</tr>
<tr>
<td>[Server:CERT_SECRETKEYSIZE]</td>
<td>Returns the number of bits in server certificate private key</td>
</tr>
<tr>
<td>[Server:CERT_SERIALNUMBER]</td>
<td>Returns the serial number field of the client certificate</td>
</tr>
<tr>
<td>[Server:CERT_SERVER_ISSUER]</td>
<td>Returns the issuer field of the server certificate</td>
</tr>
<tr>
<td>[Server:CERT_SERVER_SUBJECT]</td>
<td>Returns the subject field of the server certificate</td>
</tr>
<tr>
<td>[Server:CERT_SUBJECT]</td>
<td>Returns the subject field of the client certificate</td>
</tr>
<tr>
<td>[Server:CONTENT_LENGTH]</td>
<td>Returns the length of the content as sent by the client</td>
</tr>
<tr>
<td>[Server:CONTENT_TYPE]</td>
<td>Returns the data type of the content</td>
</tr>
<tr>
<td>[Server:GATEWAY_INTERFACE]</td>
<td>Returns the revision of the CGI specification used by the
  server</td>
</tr>
<tr>
<td>[Server:HTTP_&lt;<i>HeaderName</i>&gt;]</td>
<td>Returns the value stored in the header <i> HeaderName</i></td>
</tr>
<tr>
<td>[Server:HTTP_ACCEPT]</td>
<td> Returns the value of the Accept header</td>
</tr>
<tr>
<td>[Server:HTTP_ACCEPT_LANGUAGE]</td>
<td> Returns a string describing the language to use for displaying
  content</td>
</tr>
<tr>
<td>[Server:HTTP_COOKIE]</td>
<td> Returns the cookie string included with the request</td>
</tr>
<tr>
<td>[Server:HTTP_REFERER]</td>
<td> Returns a string containing the URL of the page that referred 
the request to the current page using an &lt;a&gt; tag. If the page is redirected, 
HTTP_REFERER is empty</td>
</tr>
<tr>
<td>[Server:HTTP_USER_AGENT]</td>
<td> Returns a string describing the browser that sent the request</td>
</tr>
<tr>
<td>[Server:HTTPS]</td>
<td> Returns ON if the request came in through secure channel or OFF if the request
  came in through a non-secure channel</td>
</tr>
<tr>
<td>[Server:HTTPS_KEYSIZE]</td>
<td> Returns the number of bits in Secure Sockets Layer connection key
  size</td>
</tr>
<tr>
<td>[Server:HTTPS_SECRETKEYSIZE]</td>
<td> Returns the number of bits in server certificate private key</td>
</tr>
<tr>
<td>[Server:HTTPS_SERVER_ISSUER]</td>
<td> Returns the issuer field of the server certificate</td>
</tr>
<tr>
<td>[Server:HTTPS_SERVER_SUBJECT]</td>
<td> Returns the subject field of the server certificate</td>
</tr>
<tr>
<td>[Server:INSTANCE_ID]</td>
<td> The ID for the IIS instance in text format</td>
</tr>
<tr>
<td>[Server:INSTANCE_META_PATH]</td>
<td> The meta base path for the instance of IIS that responds to the
  request</td>
</tr>
<tr>
<td>[Server:LOCAL_ADDR]</td>
<td> Returns the server address on which the request came in</td>
</tr>
<tr>
<td>[Server:LOGON_USER]</td>
<td>Returns the Windows account that the user is logged into</td>
</tr>
<tr>
<td>[Server:PATH_INFO]</td>
<td>Returns extra path information as given by the client</td>
</tr>
<tr>
<td>[Server:PATH_TRANSLATED]</td>
<td> A translated version of PATH_INFO that takes the path and performs any necessary virtual-to-physical
  mapping</td>
</tr>
<tr>
<td>[Server:QUERY_STRING]</td>
<td>Returns the query information stored in the string following the question mark (?) in the HTTP
  request</td>
</tr>
<tr>
<td>[Server:REMOTE_ADDR]</td>
<td> Returns the IP address of the remote host making the request</td>
</tr>
<tr>
<td>[Server:REMOTE_HOST]</td>
<td> Returns the name of the host making the request</td>
</tr>
<tr>
<td>[Server:REMOTE_USER]</td>
<td> Returns an unmapped user-name string sent in by the user</td>
</tr>
<tr>
<td>[Server:REQUEST_METHOD]</td>
<td> Returns the method used to make the request</td>
</tr>
<tr>
<td>[Server:SCRIPT_NAME]</td>
<td> Returns a virtual path to the script being executed</td>
</tr>
<tr>
<td>[Server:SERVER_NAME]</td>
<td> Returns the server's host name, DNS alias, or IP address as it would appear in self-referencing
  URLs</td>
</tr>
<tr>
<td>[Server:SERVER_PORT]</td>
<td> Returns the port number to which the request was sent</td>
</tr>
<tr>
<td>[Server:SERVER_PORT_SECURE]</td>
<td> Returns a string that contains 0 or 1. If the request is being handled on the secure port,
  it will be 1. Otherwise, it will be 0</td>
</tr>
<tr>
<td>[Server:SERVER_PROTOCOL]</td>
<td> Returns the name and revision of the request information
  protocol</td>
</tr>
<tr>
<td>[Server:SERVER_SOFTWARE]</td>
<td> Returns the name and version of the server software that answers the request and runs the
  gateway</td>
</tr>
<tr>
<td>[Server:URL]</td>
<td> Returns the base portion of the URL</td>
</tr>
</table>




## Read also

* [Views](xref:Basics.App.Views)
* [Templates](xref:Basics.App.Templates)
* [Razor Templates](xref:NetCode.Razor.Index)
* [Razor Tutorial](https://2sxc.org/dnn-tutorials/en/razor)

## History

1. Introduced in 2sxc 1.0