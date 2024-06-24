/*************************************

peiy

**************************************

[rewrite_local]
^https?:\/\/api\.next\.bspapp\.com url script-response-body https://raw.githubusercontent.com/yourusername/QuantumultX/main/orange_voice.js

[mitm]
hostname = api.next.bspapp.com

*************************************/

var body = $response.body;
var obj = JSON.parse(body);

obj.endtime = 9999999999000;
obj.level = 6;
obj.todaySigned = 999;
obj.Exchanged = 999;

$done({body: JSON.stringify(obj)});
