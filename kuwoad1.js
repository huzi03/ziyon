/*************************************
[rewrite_local]
# 匹配 Kuwo 特定 URL 并修改返回内容
^http://mobilead\.kuwo\.cn/EcomResourceServer/getIOSIsHideAd\.do\?plat=ip.*$ url script-response-body https://raw.githubusercontent.com/huzi03/ziyon/main/kuwoad.js

[mitm]
hostname = mobilead.kuwo.cn
*************************************/

let response = JSON.parse($response.body);

// 删除广告和特定板块
if (response.CebianlanDtAd) delete response.CebianlanDtAd;
if (response.CebianlanCLAd) delete response.CebianlanCLAd;
if (response.QukuCLAd) delete response.QukuCLAd;
if (response.SearchCLAd) delete response.SearchCLAd;
if (response.PayDownload) delete response.PayDownload;
if (response.ShowTipAd) delete response.ShowTipAd;
if (response.ShowTableTipAd) delete response.ShowTableTipAd;
if (response.MusicTipAd) delete response.MusicTipAd;
if (response.HardwareTipAd) delete response.HardwareTipAd;
if (response.KTipAd) delete response.KTipAd;
if (response.DownloadLogin) delete response.DownloadLogin;
if (response.SearchResPollingAd) delete response.SearchResPollingAd;
if (response.bindTelephone) delete response.bindTelephone;
if (response.tencentKaipingSDK) delete response.tencentKaipingSDK;
if (response.kaipingDef) delete response.kaipingDef;
if (response.flowPopup) delete response.flowPopup;
if (response.sceneIcon) delete response.sceneIcon;
if (response.KudouSign) delete response.KudouSign;
if (response.ActivityCenter) delete response.ActivityCenter;
if (response.BrowserHistoryAd) delete response.BrowserHistoryAd;
if (response.CebianlanCG) delete response.CebianlanCG;
if (response.ShareMusicAd) delete response.ShareMusicAd;
if (response.HotSwitching) delete response.HotSwitching;
if (response.CurrentCellAd) delete response.CurrentCellAd;
if (response.homeTop) {
    response.homeTop = response.homeTop.filter(item => !["听书", "儿童", "演出季"].includes(item.title));
}
if (response.MusicBoxPushKwShow) delete response.MusicBoxPushKwShow;
if (response.DomainNameConfig) delete response.DomainNameConfig;
if (response.Ai) delete response.Ai;
if (response.BuyHistory) delete response.BuyHistory;
if (response.playlisttitletips) delete response.playlisttitletips;
if (response.longAudioSwitch) delete response.longAudioSwitch;
if (response.playerTopShare) delete response.playerTopShare;
if (response.motivationalVideo) delete response.motivationalVideo;
if (response.kaipingInit) delete response.kaipingInit;
if (response.idfa) delete response.idfa;
if (response.lrtsUrl) delete response.lrtsUrl;
if (response.backGroundAd) delete response.backGroundAd;
if (response.bidding) delete response.bidding;
if (response.freeHotSwitching) delete response.freeHotSwitching;
if (response.interstitialAd) delete response.interstitialAd;
if (response.FeedFourShowAdFor58) delete response.FeedFourShowAdFor58;
if (response.rewardVideo) delete response.rewardVideo;
if (response.musicianAd) delete response.musicianAd;
if (response.longBackGroundAd) delete response.longBackGroundAd;
if (response.longSuspendAd) delete response.longSuspendAd;
if (response.longListenBookAd) delete response.longListenBookAd;
if (response.longListAd) delete response.longListAd;
if (response.longListExcitationAd) delete response.longListExcitationAd;
if (response.playPendantAd) delete response.playPendantAd;
if (response.playGuideAd) delete response.playGuideAd;
if (response.digitalCollectionList) delete response.digitalCollectionList;
if (response.grey) delete response.grey;
if (response.gravityInduction) delete response.gravityInduction;
if (response.platform) delete response.platform;
if (response.songSheet) delete response.songSheet;
if (response.ranking) delete response.ranking;
if (response.dayRecommend) delete response.dayRecommend;
if (response.freemium) delete response.freemium;
if (response.backGroundVideo) delete response.backGroundVideo;
if (response.commentAd) delete response.commentAd;
if (response.personalCenter) delete response.personalCenter;
if (response.freeMode) delete response.freeMode;
if (response.adPopup) delete response.adPopup;
if (response.LyricsLine) delete response.LyricsLine;
if (response.home) delete response.home;
if (response.rmLog) delete response.rmLog;
if (response.together) delete response.together;
if (response.mainPageHoliday) delete response.mainPageHoliday;
if (response.longAudioRecall) delete response.longAudioRecall;
if (response.examineApp) delete response.examineApp;
if (response.banner) delete response.banner;
if (response.splitDownload) delete response.splitDownload;
if (response.goodCommentPop) delete response.goodCommentPop;
if (response.limit_free_strategy) delete response.limit_free_strategy;
if (response.adArtistConfig) delete response.adArtistConfig;
if (response.contact) delete response.contact;
if (response.commentFontColor) delete response.commentFontColor;

// 过滤掉特定标题的板块
if (response.homeTop) {
    response.homeTop = response.homeTop.filter(item => !["听书", "儿童", "演出季"].includes(item.title));
}

$done({ body: JSON.stringify(response) });
