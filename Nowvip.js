/*
 * 
 * 脚本功能：Now
 * 软件版本：5.1.5
 * 脚本作者：
 * 更新时间：20260304
 * 电报频道：
 * 问题反馈：
 * 使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！
 * 
 *******************************
 * [rewrite_local]
 * ^https?://nowapi\.navoinfo\.cn/(h2/(ad/getOpenScreenAd|tool/getAdList|activity/refreshAppConfig|order/getNormalCourseSku)|app_config_info|get_sections_list) url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/refs/heads/main/Nowvip.js, requires-body=true, timeout=10, tag=NowVIP
 * 
 * ^https?://(sensor|analytics|sysdk|dig)\.(navoinfo\.cn|oceanengine\.com|cl2009\.com|bdurl\.net) url reject
 * 
 * [mitm]
 * hostname = nowapi.navoinfo.cn, noweocdn.navolove.com, sensor.navoinfo.cn
 * 
 */

// Loon 原生 API 封装
const $loon = typeof $loon !== "undefined" ? $loon : {};
const $script = typeof $script !== "undefined" ? $script : { name: "Now VIP", startTime: Date.now() };

// 日志函数
const log = (msg) => console.log(`[${$script.name}] ${msg}`);

// 通知函数
const notify = (title, subtitle, content) => {
    if (typeof $notification !== "undefined") {
        $notification.post(title, subtitle, content);
    }
};

const url = $request.url;
let body = $response.body;

// 解析原始响应
let obj;
try {
    obj = JSON.parse(body);
} catch (e) {
    log("JSON 解析失败，返回原始响应");
    $done({ body });
}

// ==================== 1. 去广告 ====================

// 开屏广告接口 - 清空广告数据
if (url.includes('/ad/getOpenScreenAd')) {
    obj.result = {
        "id": 0,
        "title": "",
        "imgURL": "",
        "image_url_type": 0,
        "link_value": 0,
        "thumb_img": "",
        "tag": "",
        "lessionsID": "",
        "sequence": 0,
        "display_position": "",
        "category_type": "",
        "channel": "",
        "prohibit_channel": "",
        "type": "",
        "pro_type": "",
        "start_time": "",
        "end_time": "",
        "show_level": 0,
        "is_abtest": 0,
        "ad_type": 0,
        "is_click_auto_close": true
    };
    log("开屏广告已去除");
    notify("Now VIP", "", "开屏广告已去除");
}

// 广告列表接口 - 清空广告数组
if (url.includes('/tool/getAdList')) {
    obj.result = [];
    log("广告列表已清空");
    notify("Now VIP", "", "广告列表已清空");
}

// ==================== 2. VIP 解锁 ====================

// 应用配置接口 - 强制开启 VIP 相关权限
if (url.includes('/activity/refreshAppConfig')) {
    if (obj.result) {
        // 强制开启 VIP 隐私权限（去广告、VIP 标识等）
        obj.result.auto_vip_privacy_vip = true;        // VIP 标识
        obj.result.auto_vip_privacy_ob = true;         // VIP 权益
        obj.result.auto_vip_privacy_ad = true;         // 去广告权限
        obj.result.single_privacy_switch = false;
        obj.result.auto_vip_privacy_first_daily_report = true;
        obj.result.sku_switch_reset_privacy_state = false;
        obj.result.user_from_tapping = false;
        obj.result.ab_sub_page_video = 0;
        obj.result.vip_plan_full_screen_route = [];
        
        log("VIP 配置已解锁");
        notify("Now VIP", "", "VIP 配置已解锁");
    }
}

// ==================== 3. 用户信息修改 ====================

// 应用配置信息接口 - 修改为 VIP 用户
if (url.includes('/app_config_info')) {
    if (obj.result) {
        // 强制设置 VIP 相关字段
        obj.result.is_vip = true;
        obj.result.vip_status = 1;
        obj.result.vip_expire_time = "2099-12-31 23:59:59";
        obj.result.vip_type = "permanent";
        obj.result.has_paid = true;
        obj.result.member_type = "vip";
        obj.result.member_status = "active";
        obj.result.is_member = true;
        obj.result.privilege = {
            "no_ad": true,
            "unlimited_access": true,
            "hd_audio": true,
            "offline_download": true,
            "all_courses": true
        };
        
        log("用户已修改为 VIP");
        notify("Now VIP", "", "用户已修改为永久 VIP");
    }
}

// 课程/订单相关接口 - 解锁付费内容
if (url.includes('/order/getNormalCourseSku') || url.includes('/course')) {
    if (obj.result && typeof obj.result === 'object') {
        // 将付费课程标记为已购买
        if (obj.result.sku_list) {
            obj.result.sku_list.forEach(sku => {
                sku.is_purchased = true;
                sku.is_free = true;
                sku.price = 0;
                sku.original_price = 0;
            });
        }
        
        // 解锁课程访问权限
        if (obj.result.course_info) {
            obj.result.course_info.is_purchased = true;
            obj.result.course_info.is_free = true;
            obj.result.course_info.access_level = "vip";
        }
        
        log("课程已解锁");
        notify("Now VIP", "", "课程已解锁");
    }
}

// 搜索/内容接口 - 移除付费限制
if (url.includes('/search/') || url.includes('/get_sections_list')) {
    if (obj.result && Array.isArray(obj.result)) {
        obj.result.forEach(item => {
            if (item.is_premium !== undefined) {
                item.is_premium = false;
                item.is_free = true;
                item.is_locked = false;
            }
        });
    }
    
    if (obj.result && obj.result.list && Array.isArray(obj.result.list)) {
        obj.result.list.forEach(item => {
            item.is_premium = false;
            item.is_free = true;
            item.is_locked = false;
        });
    }
    
    log("搜索/章节内容已解锁");
}

// ==================== 4. 数据上报拦截 ====================

// 拦截统计和追踪请求
if (url.includes('/sensor') || url.includes('analytics') || url.includes('/log/') || url.includes('sensorsdata')) {
    log("已拦截数据上报: " + url);
    $done({ 
        body: JSON.stringify({ 
            "code": 200, 
            "msg": "success",
            "result": {}
        })
    });
    return;
}

// 返回修改后的响应
body = JSON.stringify(obj);
log("脚本执行完成，耗时: " + (Date.now() - $script.startTime) + "ms");
$done({ body });
