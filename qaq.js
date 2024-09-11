/*
 * Q
 * 通
[rewrite_local]
^https?:\/\/(.*\.)?cnki\.net\/.* url script-request-header https://raw.githubusercontent.com/huzi03/ziyon/main/qqq.js

*/

var modifiedHeaders = $request.headers;
modifiedHeaders['X-Forwarded-For'] = '101.6.6.119';
$done({headers : modifiedHeaders});
