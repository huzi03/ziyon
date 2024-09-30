/*************************************
[rewrite_local]
# 匹配 `htx.jietuguanjia.com` 的特定 API 并修改响应内容
http://htx.jietuguanjia.com/api/app/userInfo url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/refs/heads/main/xyy.js

[mitm]
hostname = htx.jietuguanjia.com
*************************************/
let body = $response.body;

// 替换 `isInAppBuy` 值为 `0`
body = body.replace(/isInAppBuy":0/g, 'isInAppBuy":1');

// 替换 `isVip` 值为 `false`
body = body.replace(/isVip":false/g, 'isVip":true');

// 替换 `vipExpiredTime` 为特定时间
body = body.replace(/vipExpiredTime":null/g, 'vipSignTime":"2099-09-30 20:52:09"');

$done({ body });
