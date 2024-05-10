/*************************************

项目名称：FlyingEffect
下载地址：https://zhengjian.flyingeffect.com
更新日期：2024-05-10
脚本作者：你的名字
电报频道：https://t.me/your_telegram_channel
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************/

[rewrite_local]
^https://zhengjian\.flyingeffect\.com/api/user/userInfo url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/main/zjz.js

[mitm]
hostname = zhengjian.flyingeffect.com

/************************************/


/************************************/

// flyingeffect_vip.js

var body = $response.body;
var obj = JSON.parse(body);

// 修改用户信息中的 VIP 类型
obj.data.is_vip = 1;
obj.data.is_permanent_vip = 1;
obj.data.vip_end_time = "2099-09-09 09:09:09";

// 修改响应体中的提示信息
obj.msg = "request success, VIP user";

$done({body: JSON.stringify(obj)});
