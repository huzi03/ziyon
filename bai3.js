/*
 *
 *
脚本功能：百度网盘 精简界面（去金币乐园 + 隐藏游戏中心）
软件版本：13.9.0
脚本作者：
更新时间：20260305
使用声明：⚠️此脚本仅供学习与交流，请在下载使用24小时内删除！
*******************************
[rewrite_local]
# > 隐藏游戏中心
^https?://pan\.baidu\.com/act/v2/gamecenter/ url reject
^https?://pan\.baidu\.com/act/v1/gamecenter/ url reject

# > 隐藏金币乐园
^https?://pan\.baidu\.com/coins/ url reject

# > 金币中心
^https?://pan\.baidu\.com/coins/center/notice url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/refs/heads/main/bai3.js

# > 去广告
^https?://mobads\.baidu\.com/ url reject
^https?://mobads-logs\.baidu\.com/ url reject
^https?://mobads-pre-config\.cdn\.bcebos\.com/ url reject
^https?://sdk\.e\.qq\.com/ url reject
^https?://logrcv\.aiclk\.com/ url reject
^https?://qzs\.gdtimg\.com/ url reject
^https?://.*\.bdatu\.com/ url reject
^https?://.*\.bdtuiq\.com/ url reject

[mitm]
hostname = pan.baidu.com, mobads.baidu.com, mobads-logs.baidu.com
*/

let body = $response.body;
let obj = JSON.parse(body);

// ========== 金币中心去金币乐园 ==========
// /coins/center/notice - 删除金币乐园相关字段
if (obj.coin_bubble_img) delete obj.coin_bubble_img;
if (obj.coin_bubble_img_mypage) delete obj.coin_bubble_img_mypage;
if (obj.elf_id) delete obj.elf_id;
if (obj.elf_img) delete obj.elf_img;
if (obj.elf_bg_img_mypage) delete obj.elf_bg_img_mypage;
if (obj.elf_bg_img_mypage_v2) delete obj.elf_bg_img_mypage_v2;
if (obj.energy_bubble_img) delete obj.energy_bubble_img;
if (obj.energy_bubble_img_mypage) delete obj.energy_bubble_img_mypage;
if (obj.red_bubble_img) delete obj.red_bubble_img;
if (obj.red_bubble_img_mypage) delete obj.red_bubble_img_mypage;

// ========== 通用字符串替换兜底 ==========
body = JSON.stringify(obj);
body = body.replace(/"coin_bubble_img":".*?",/g, '');
body = body.replace(/"elf_id":".*?",/g, '');
body = body.replace(/"elf_img":".*?",/g, '');

$done({ body });
