/*
 * Q
 * 修
[rewrite_local]
^https:\/\/cajcloud\.cnki\.net\/mcnkims\/users\/iplogin url script-request-header https://raw.githubusercontent.com/huzi03/ziyon/main/qqq.js

*/

var modifiedHeaders = $request.headers;
modifiedHeaders['X-Forwarded-For'] = '101.6.6.119';
$done({headers : modifiedHeaders});
