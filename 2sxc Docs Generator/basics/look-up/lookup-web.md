---
uid: Basics.LookUp.Web
---

# Web / Server / HTTP LookUps

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .lookup-sources { visibility: visible; } </style>

There are three Sources for web parameters which can be used in LookUps:

1. `QueryString` - for url parameters
1. `Form` - for fields in the http-post
1. `Server` - for HTTP Server_... variables

## `QueryString` Tokens


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


## `Form` Tokens

Form Tokens only exist if the request was a Post.


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

## `Server` Tokens

**Schema**

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



**All Server variables**

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



## History

1. Params added in 2sxc ca. v2
1. Enhanced with Settings/Resources ca. v4

