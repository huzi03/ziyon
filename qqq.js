/*
 * Q
 * 修
[rewrite_local]
^https:\/\/cajcloud\.cnki\.net\/mcnkims\/users\/iplogin url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/main/qx_script.js

*/

var modifiedHeaders = $request.headers;
modifiedHeaders['X-Forwarded-For'] = '101.6.6.119';
$done({headers : modifiedHeaders});
