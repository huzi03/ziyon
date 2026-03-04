/*

脚本功能：Now 正念冥想 VIP解锁 + 课程解锁
软件版本：5.1.5
脚本作者：
更新时间：20260304
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：⚠️此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！⚠️⚠️⚠️
*******************************
[rewrite_local]
# > Now 正念冥想 VIP解锁 + 课程解锁
^https?://nowapi\.navoinfo\.cn/h2/activity/refreshAppConfig url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/refs/heads/main/Now213vip.js
^https?://nowapi\.navoinfo\.cn/h2/order/getNormalCourseSku url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/refs/heads/main/Now213vip.js
^https?://nowapi\.navoinfo\.cn/app_config_info url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/refs/heads/main/Now213vip.js
^https?://nowapi\.navoinfo\.cn/get_sections_list url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/refs/heads/main/Now213vip.js

[mitm]
hostname = nowapi.navoinfo.cn
*
*
*/

let body = $response.body;

// VIP 相关字段批量替换
body = body.replace(/"is_vip":\w+/g, '"is_vip":true');
body = body.replace(/"is_now_vip":\d+/g, '"is_now_vip":1');
body = body.replace(/"vip_status":\d+/g, '"vip_status":1');
body = body.replace(/"vip_type":"\w+"/g, '"vip_type":"permanent"');
body = body.replace(/"is_forever":\w+/g, '"is_forever":true');
body = body.replace(/"expire_time":\d+/g, '"expire_time":9999999999');
body = body.replace(/"has_paid":\w+/g, '"has_paid":true');
body = body.replace(/"member_type":"\w+"/g, '"member_type":"vip"');
body = body.replace(/"member_status":"\w+"/g, '"member_status":"active"');
body = body.replace(/"is_member":\w+/g, '"is_member":true');
body = body.replace(/"is_purchased":\w+/g, '"is_purchased":true');
body = body.replace(/"is_free":\w+/g, '"is_free":true');
body = body.replace(/"is_locked":\w+/g, '"is_locked":false');
body = body.replace(/"is_premium":\w+/g, '"is_premium":false');
body = body.replace(/"price":\d+/g, '"price":0');
body = body.replace(/"original_price":\d+/g, '"original_price":0');
body = body.replace(/"vip_price":\d+/g, '"vip_price":0');

// VIP 配置字段
body = body.replace(/"auto_vip_privacy_vip":\w+/g, '"auto_vip_privacy_vip":true');
body = body.replace(/"auto_vip_privacy_ob":\w+/g, '"auto_vip_privacy_ob":true');
body = body.replace(/"auto_vip_privacy_ad":\w+/g, '"auto_vip_privacy_ad":true');
body = body.replace(/"user_from_tapping":\w+/g, '"user_from_tapping":false');

// 课程访问权限
body = body.replace(/"access_level":"\w+"/g, '"access_level":"vip"');

// 将所有限制类字段改为无限制
body = body.replace(/"limitCount":\d+/g, '"limitCount":0');
body = body.replace(/"remainCount":\d+/g, '"remainCount":999');
body = body.replace(/"totalCount":\d+/g, '"totalCount":999');

// 错误码修正
body = body.replace(/"code":\d+/g, '"code":200');

$done({ body });
