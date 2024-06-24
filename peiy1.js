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

// 确保字段存在并进行修改
if (obj.data && obj.data.userInfo) {
    obj.data.userInfo.vip_endtime = 9999999999000;            // 修改vip_endtime
    obj.data.userInfo.vip_level = '6';                        // 修改vip_level
    obj.data.userInfo.todaySigned = 999;                      // 修改todaySigned
    obj.data.userInfo.oneMonthExchanged = 999;                // 修改oneMonthExchanged
    obj.data.userInfo.oneYearExchanged = 999;                 // 修改oneYearExchanged
}

$done({body: JSON.stringify(obj)});

