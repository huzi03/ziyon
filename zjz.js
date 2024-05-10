/*************************************
[rewrite_local]
# 修改会员数据
^https://zhengjian\.flyingeffect\.com/api/user/userInfo$ url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/main/zjz.js
**************************************
[mitm]
hostname = zhengjian.flyingeffect.com
*************************************/
let body = $response.body;

// 解析原始响应体 JSON
let obj = JSON.parse(body);


obj.data.is_vip = 1;
obj.data.vip_end_time = "2099-05-10 13:17:31";
obj.data.permanent_vip = 1;

// 修改后的响应体 JSON
body = JSON.stringify(obj);

$done({ body });
