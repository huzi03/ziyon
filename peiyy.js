/*************************************
；
peiy

**************************************

[rewrite_local]
^https:\/\/api\.next\.bspapp\.com\/client url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/main/peiy.js

[mitm]
hostname = api.next.bspapp.com

*************************************/
var body = $response.body;
var obj = JSON.parse(body);

// 修改内容
if (obj.endtime !== undefined) obj.endtime = 9999999999000;          // 修改endtime
if (obj.level !== undefined) obj.level = 6;                          // 修改level
if (obj.todaySigned !== undefined) obj.todaySigned = 999;            // 修改todaySigned
if (obj.Exchanged !== undefined) obj.Exchanged = 999;                // 修改Exchanged

$done({body: JSON.stringify(obj)});

