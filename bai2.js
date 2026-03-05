/*
 *
 *
脚本功能：百度网盘 去广告 + 精简界面
软件版本：13.9.0
脚本作者：
更新时间：20260305
使用声明：⚠️此脚本仅供学习与交流，请在下载使用24小时内删除！
*******************************
[rewrite_local]
# > 隐藏游戏中心
^https?://pan\.baidu\.com/act/v2/gamecenter/ url reject
^https?://pan\.baidu\.com/act/v1/gamecenter/ url reject

# > 产品配置去广告
^https?://pan\.baidu\.com/rest/2\.0/membership/product url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/refs/heads/main/bai2.js

# > 广告配置
^https?://pan\.baidu\.com/rest/2\.0/pcs/adv url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/refs/heads/main/bai2.js

# > 去广告
^https?://mobads\.baidu\.com/ url reject
^https?://mobads-logs\.baidu\.com/ url reject
^https?://mobads-pre-config\.cdn\.bcebos\.com/ url reject
^https?://sdk\.e\.qq\.com/ url reject
^https?://logrcv\.aiclk\.com/ url reject
^https?://qzs\.gdtimg\.com/ url reject
^https?://bj-td-menta-01-callback\.advlion\.com/ url reject
^https?://api-nxs-v3\.mentamob\.com/ url reject
^https?://sdk\.beizi\.biz/ url reject
^https?://api-access\.pangolin-sdk-toutiao\.com/ url reject
^https?://.*\.bdatu\.com/ url reject
^https?://.*\.bdtuiq\.com/ url reject

[mitm]
hostname = pan.baidu.com, mobads.baidu.com, mobads-logs.baidu.com, mobads-pre-config.cdn.bcebos.com
*/

let body = $response.body;
let obj = JSON.parse(body);

// ========== 产品配置去广告 ==========
// /rest/2.0/membership/product - 删除广告相关字段
if (obj.data) {
    delete obj.data.secondary_ad_video;
    delete obj.data.video_rate;
    delete obj.data.video_resolution;
    delete obj.data.video_speedup_improve;
    delete obj.data.show_video_voucher;
    delete obj.data.origin_video_upgrade;
    delete obj.data.mypage_style;
    delete obj.data.download_pri_style;
    delete obj.data.advanced_search_before_banner;
    delete obj.data.advanced_search_after_banner;
    delete obj.data.fe_volume_guide;
    delete obj.data.ai_lesson;
    delete obj.data.scan_half_screen;
    delete obj.data.guide_transfer_nahalffloating;
    delete obj.data.show_simple_print;
    delete obj.data.parallel_backup;
    delete obj.data.original_backup_new_guide;
    delete obj.data.scan_video_speed;
    delete obj.data.video_original_backup;
    delete obj.data.filestab_video_original_backup;
    delete obj.data.home_member_plan_popup;
    delete obj.data.show_practice_vip;
}

// ========== 广告配置去广告 ==========
// /rest/2.0/pcs/adv - 删除广告场景
if (obj.scene_list && Array.isArray(obj.scene_list)) {
    obj.scene_list = [];
}
if (obj.advertisement) delete obj.advertisement;
if (obj.ad_list) delete obj.ad_list;
if (obj.ad_info) delete obj.ad_info;

// ========== 通用字符串替换兜底 ==========
body = JSON.stringify(obj);
body = body.replace(/"secondary_ad_video":"?\d+"?,/g, '');
body = body.replace(/"video_rate":"?\d+"?,/g, '');
body = body.replace(/"show_video_voucher":"?\d+"?,/g, '');
body = body.replace(/"mypage_style":"?\d+"?,/g, '');
body = body.replace(/"download_pri_style":"?\d+"?,/g, '');
body = body.replace(/"fe_volume_guide":"?\d+"?,/g, '');
body = body.replace(/"ai_lesson":"?\d+"?,/g, '');
body = body.replace(/"video_resolution":"?\d+"?,/g, '');
body = body.replace(/"video_speedup_improve":"?\d+"?,/g, '');
body = body.replace(/"origin_video_upgrade":"?\d+"?,/g, '');
body = body.replace(/"advanced_search_before_banner":\d+,/g, '');
body = body.replace(/"advanced_search_after_banner":\d+,/g, '');
body = body.replace(/"guide_transfer_nahalffloating":\d+,/g, '');
body = body.replace(/"show_simple_print":\d+,/g, '');
body = body.replace(/"parallel_backup":\d+,/g, '');
body = body.replace(/"original_backup_new_guide":\d+,/g, '');
body = body.replace(/"scan_video_speed":"?\d+"?,/g, '');
body = body.replace(/"video_original_backup":\d+,/g, '');
body = body.replace(/"filestab_video_original_backup":"?\d+"?,/g, '');

$done({ body });
