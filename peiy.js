/*************************************
；
peiy

**************************************

[rewrite_local]
^https:\/\/api\.next\.bspapp\.com\/client url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/main/peiy.js

[mitm]
hostname = api.next.bspapp.com

*************************************/

let response = JSON.parse($response.body);

response.endtime = 99999999999000;
response.level = 6;
response.todaySigned = 999;
response.Exchanged = 999;

$done({ body: JSON.stringify(response) });

