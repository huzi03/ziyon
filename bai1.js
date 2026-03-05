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
^https?://pan\.baidu\.com/rest/2\.0/membership/product url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/refs/heads/main/bai1.js

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
// /rest/2.0/membership/product
if (obj.data) {
    // 视频广告相关
    if (obj.data.secondary_ad_video !== undefined) obj.data.secondary_ad_video = "0";
    if (obj.data.video_rate !== undefined) obj.data.video_rate = "0";
    if (obj.data.video_resolution !== undefined) obj.data.video_resolution = "0";
    if (obj.data.video_speedup_improve !== undefined) obj.data.video_speedup_improve = "0";
    if (obj.data.show_video_voucher !== undefined) obj.data.show_video_voucher = "0";
    if (obj.data.origin_video_upgrade !== undefined) obj.data.origin_video_upgrade = "0";
    
    // 页面广告相关
    if (obj.data.mypage_style !== undefined) obj.data.mypage_style = "0";
    if (obj.data.download_pri_style !== undefined) obj.data.download_pri_style = "0";
    if (obj.data.advanced_search_before_banner !== undefined) obj.data.advanced_search_before_banner = 0;
    if (obj.data.advanced_search_after_banner !== undefined) obj.data.advanced_search_after_banner = 0;
    
    // 礼包/推荐相关
    if (obj.data.fe_volume_guide !== undefined) obj.data.fe_volume_guide = "0";
    if (obj.data.ai_lesson !== undefined) obj.data.ai_lesson = "0";
    if (obj.data.scan_half_screen !== undefined) obj.data.scan_half_screen = "{\"show\":0,\"url\":\"\"}";
    
    // 引导/弹窗相关
    if (obj.data.guide_transfer_nahalffloating !== undefined) obj.data.guide_transfer_nahalffloating = 0;
    if (obj.data.show_simple_print !== undefined) obj.data.show_simple_print = 0;
    if (obj.data.parallel_backup !== undefined) obj.data.parallel_backup = 0;
    if (obj.data.original_backup_new_guide !== undefined) obj.data.original_backup_new_guide = 0;
    if (obj.data.scan_video_speed !== undefined) obj.data.scan_video_speed = "0";
    if (obj.data.video_original_backup !== undefined) obj.data.video_original_backup = 0;
    if (obj.data.filestab_video_original_backup !== undefined) obj.data.filestab_video_original_backup = "0";
    
    // 会员相关弹窗
    if (obj.data.home_member_plan_popup !== undefined) obj.data.home_member_plan_popup = false;
    if (obj.data.show_practice_vip !== undefined) obj.data.show_practice_vip = false;
}

// ========== 通用字符串替换兜底 ==========
body = JSON.stringify(obj);
body = body.replace(/"secondary_ad_video":"\d+"/g, '"secondary_ad_video":"0"');
body = body.replace(/"video_rate":"\d+"/g, '"video_rate":"0"');
body = body.replace(/"show_video_voucher":"\d+"/g, '"show_video_voucher":"0"');
body = body.replace(/"mypage_style":"\d+"/g, '"mypage_style":"0"');
body = body.replace(/"download_pri_style":"\d+"/g, '"download_pri_style":"0"');
body = body.replace(/"fe_volume_guide":"\d+"/g, '"fe_volume_guide":"0"');
body = body.replace(/"ai_lesson":"\d+"/g, '"ai_lesson":"0"');
body = body.replace(/"video_resolution":"\d+"/g, '"video_resolution":"0"');
body = body.replace(/"video_speedup_improve":"\d+"/g, '"video_speedup_improve":"0"');
body = body.replace(/"origin_video_upgrade":"\d+"/g, '"origin_video_upgrade":"0"');
body = body.replace(/"advanced_search_before_banner":\d+/g, '"advanced_search_before_banner":0');
body = body.replace(/"advanced_search_after_banner":\d+/g, '"advanced_search_after_banner":0');
body = body.replace(/"guide_transfer_nahalffloating":\d+/g, '"guide_transfer_nahalffloating":0');
body = body.replace(/"show_simple_print":\d+/g, '"show_simple_print":0');
body = body.replace(/"parallel_backup":\d+/g, '"parallel_backup":0');
body = body.replace(/"original_backup_new_guide":\d+/g, '"original_backup_new_guide":0');
body = body.replace(/"scan_video_speed":"\d+"/g, '"scan_video_speed":"0"');
body = body.replace(/"video_original_backup":\d+/g, '"video_original_backup":0');
body = body.replace(/"filestab_video_original_backup":"\d+"/g, '"filestab_video_original_backup":"0"');

$done({ body });
