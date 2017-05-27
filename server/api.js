'use strict'
let path = '/api/';

module.exports = {
    diaryList: path + 'diary/list',
    diaryPublish: path + 'diary/publish',
    diaryDetail: path + 'diary/detail',
    diaryFilter: path + 'diary/filter',
    diaryDelete: path + 'diary/delete',
    
    register: path + 'user/register',
    userInfo: path + 'user/userInfo',
    login: path + 'user/login',
    uploadAvatar: path + 'user/uploadAvatar',
    userModify: path + 'user/userModify',

    mapFilter: path + 'map/filter',
    mapData: path + 'map/mapData',

    weixinTicket: path + "weixin/weixinTicket",
};