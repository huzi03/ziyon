/*

脚本功能：Now 正念冥想 VIP解锁 + 课程解锁 + 去广告 + 精简我的页面
软件版本：5.1.5
脚本作者：
更新时间：20260304
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：⚠️此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！⚠️⚠️⚠️
*******************************
[rewrite_local]
# > Now 正念冥想 VIP解锁 + 去广告 + 精简我的页面
^https?://nowapi\.navoinfo\.cn/h2/user/getUserInfo url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/refs/heads/main/Now338vip.js
^https?://nowapi\.navoinfo\.cn/h2/user/getUserRightList url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/refs/heads/main/Now338vip.js
^https?://nowapi\.navoinfo\.cn/h2/user/getUserCenterMenu url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/refs/heads/main/Now338vip.js
^https?://nowapi\.navoinfo\.cn/h2/user/getUserCenterMenuData url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/refs/heads/main/Now338vip.js
^https?://nowapi\.navoinfo\.cn/app_config_info url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/refs/heads/main/Now338vip.js
^https?://nowapi\.navoinfo\.cn/h2/activity/refreshAppConfig url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/refs/heads/main/Now338vip.js
^https?://nowapi\.navoinfo\.cn/h2/order/getNormalCourseSku url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/refs/heads/main/Now338vip.js
^https?://nowapi\.navoinfo\.cn/get_sections_list.* url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/refs/heads/main/Now338vip.js
^https?://nowapi\.navoinfo\.cn/get_course_details url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/refs/heads/main/Now338vip.js

# > 去广告
^https?://nowapi\.navoinfo\.cn/get/ad_list url reject
^https?://nowapi\.navoinfo\.cn/get_course_details_ad url reject
^https?://nowapi\.navoinfo\.cn/h2/ad/getBannerList url reject
^https?://nowapi\.navoinfo\.cn/h2/ad/getOpenScreenAd url reject
^https?://nowapi\.navoinfo\.cn/h2/tool/getAdList url reject
^https?://nowapi\.navoinfo\.cn/h2/tool/getPlanPopup url reject
^https?://nowapi\.navoinfo\.cn/add_addata url reject
^https?://nowapi\.navoinfo\.cn/h2/tool/adStatistics url reject
^https?://nowapi\.navoinfo\.cn/upload/error_data url reject

[mitm]
hostname = nowapi.navoinfo.cn
*
*
*/

let body = $response.body;
let obj = JSON.parse(body);

// ========== VIP 解锁（BiliUniverse 风格：精确修改对象属性）==========
if (obj.result) {
    // 用户基本信息 VIP 化
    if (obj.result.is_vip !== undefined) obj.result.is_vip = true;
    if (obj.result.is_now_vip !== undefined) obj.result.is_now_vip = 1;
    if (obj.result.vip_status !== undefined) obj.result.vip_status = 1;
    if (obj.result.vip_type !== undefined) obj.result.vip_type = "permanent";
    if (obj.result.is_forever !== undefined) obj.result.is_forever = true;
    if (obj.result.expire_time !== undefined) obj.result.expire_time = 9999999999;
    if (obj.result.has_paid !== undefined) obj.result.has_paid = true;
    
    // 修改用户名
    if (obj.result.username) obj.result.username = "VIP会员";
    if (obj.result.nickname) obj.result.nickname = "VIP会员";
    if (obj.result.name) obj.result.name = "VIP会员";
}

// ========== 精简我的页面（BiliUniverse 风格：数组过滤）==========
// getUserCenterMenu 接口 - 过滤菜单项
// 结构: obj.result = [{title: "模块名", list: [{title: "菜单项", tag: 数字}]}]

if (obj.result && Array.isArray(obj.result)) {
    // 定义需要移除的标题关键词
    const removeKeywords = [
        "分享Now", "广告占位", "我的活动", "每日提醒",
        "去App Store评分", "Apple健康", "意见反馈", 
        "感恩日记", "兑换码", "一万分钟计划",
        "邀请好友", "商城", "推荐", "推广",
        "会员中心"
    ];
    
    // 定义需要移除的 tag
    const removeTags = [1, 4, 5, 6, 7, 14, 20, 21, 22, 25, 26, 30, 31]; // 广告、反馈、分享、账户、已购课程、兑换码、计划、评分、Apple健康、活动、日记、提醒、订单
    
    // 过滤每个模块
    obj.result = obj.result.map(module => {
        if (module.list && Array.isArray(module.list)) {
            module.list = module.list.filter(item => {
                // 移除包含关键词的标题
                if (item.title && removeKeywords.some(kw => item.title.includes(kw))) {
                    return false;
                }
                // 移除指定 tag
                if (item.tag !== undefined && removeTags.includes(item.tag)) {
                    return false;
                }
                return true;
            });
        }
        // 如果模块标题包含"广告"、"推荐"、"推广"，清空整个模块
        if (module.title && /广告|推荐|推广/.test(module.title)) {
            module.list = [];
        }
        return module;
    });
    
    // 过滤掉空模块（list 为空的模块）
    obj.result = obj.result.filter(module => {
        return !(module.list && Array.isArray(module.list) && module.list.length === 0);
    });
}

// ========== 通用 VIP 字段处理（保持字符串替换兜底）==========
body = JSON.stringify(obj);
body = body.replace(/"is_vip":\w+/g, '"is_vip":true');
body = body.replace(/"is_member":\w+/g, '"is_member":true');
body = body.replace(/"is_purchased":\w+/g, '"is_purchased":true');
body = body.replace(/"is_free":\w+/g, '"is_free":true');
body = body.replace(/"is_locked":\w+/g, '"is_locked":false');
body = body.replace(/"price":\d+/g, '"price":0');
body = body.replace(/"original_price":\d+/g, '"original_price":0');

$done({ body });
