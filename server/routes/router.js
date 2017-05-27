let express = require('express');
let diary = require('../controls/diary');
let user = require('../controls/user');
let map = require('../controls/map');
let weixin = require('../controls/weixin');
let api = require('../api');

let router = express.Router();

// diary
router.post(api.diaryList, diary.fetchAll);
router.post(api.diaryPublish, diary.publish);
router.post(api.diaryDetail, diary.fetchById);
router.post(api.diaryFilter, diary.filter);
router.post(api.diaryDelete, diary.delete);

//user
router.post(api.register, user.register);
router.post(api.userInfo, user.userInfo);
router.post(api.login, user.login);
router.post(api.uploadAvatar, user.uploadAvatar);
router.post(api.userModify, user.userModify);

//map
router.post(api.mapFilter, map.filter);
router.get(api.mapData, map.mapData);

//weixin
router.get(api.weixinTicket, weixin.weixinTicket);

module.exports = router;