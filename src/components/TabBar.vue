<template>
  <div>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item v-for="(tab,index) in tabs" :key="index" :index="index.toString()" class="menu-item" @click="redirectUrl(index, tab.type, tab.link)">
        <div :class="[tab.name, 'icon-common']"></div>
        <div class="icon-text">{{tab.text}}</div>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import uuid from 'node-uuid';
import jsSHA from 'jssha';
export default {
  name: 'TabBar',
  data() {
    return {
      activeIndex: '2',
      tabs: [
        { type: "url", link: "lists", text: "动态", name: "icon-diary" },
        { type: "function", link: "getImage", text: "照片", name: "icon-camera" },
        { type: "url", link: "/", text: "写日记", name: "el-icon-plus" },
        { type: "url", link: "map", text: "地图", name: "icon-map" },
        { type: "url", link: "personal", text: "个人中心", name: "icon-personal" }]
    };
  },
  created() {
    this.func.ajaxGet(this.api.weixinTicket, res => {
      if (res.data.code === 200) {
        const ticket = res.data.msg;
        const timestamp = (new Date()).getTime();
        const nonce = uuid.v1();
        const url = 'http://localhost:8081';
        const corpid = 'wx5ca89ffbd7dae3cc';
        const shaObj = new jsSHA(`jsapi_ticket=${ticket}&noncestr=${nonce}&timestamp=${timestamp}&url=${url}`, 'TEXT');
        const signature = shaObj.getHash('SHA-1', 'HEX');
        wx.config({
          debug: true,
          appId: corpid,
          timestamp: timestamp,
          nonceStr: nonce,
          signature: signature,
          jsApiList: [
            'chooseImage',
          ]
        });
      }
    });
  },
  methods: {
    getImage() {
      //TODO:
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['camera'],
        success: function(res) {
          console.log(res);
          var localIds = res.localIds;
        }
      });
    },
    redirectUrl(index, type, link) {
      this.tabs.forEach(tab => {
        let name = tab.name;
        if (name.indexOf("-blue") > 0) {
          tab.name = name.substring(0, name.length - 5);
        }
      });
      this.tabs[index].name += "-blue";
      switch (type) {
        case "url":
          this.$router.push(link);
          break;
        case "function":
          this[link]();
          break;
      }
    }
  },
};
</script>

<style scoped>
.menu-item {
  width: 20%;
  line-height: 1;
  color: #fff;
  padding: 0;
}

.el-menu-item.is-active {
  color: #3fc4e4;
}

.el-menu--horizontal>.el-menu-item:hover,
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title,
.el-menu--horizontal>.el-submenu:hover .el-submenu__title {
  border-bottom: 5px solid transparent;
}

.icon-common {
  font-size: 20px;
  margin-top: 12px;
  width: 20px;
  height: 20px;
  margin: 13px auto 0;
  transition: background 0.2s;
}

.icon-text {
  font-size: 10px;
  margin-top: 5px;
}


/*TODO: 简写优化, el-icon-plus-blue*/

.icon-diary {
  background: url("../assets/icons/diary.svg") no-repeat center center;
  background-size: 100%;
}

.icon-diary-blue {
  background: url("../assets/icons/diary_blue.svg") no-repeat center center;
  background-size: 100%;
}

.icon-camera {
  background: url("../assets/icons/camera.svg") no-repeat center center;
  background-size: 100%;
}

.icon-camera-blue {
  background: url("../assets/icons/camera_blue.svg") no-repeat center center;
  background-size: 100%;
}

.icon-map {
  background: url("../assets/icons/locate.svg") no-repeat center center;
  background-size: 100%;
}

.icon-map-blue {
  background: url("../assets/icons/locate_blue.svg") no-repeat center center;
  background-size: 100%;
}

.icon-personal {
  background: url("../assets/icons/personal.svg") no-repeat center center;
  background-size: 100%;
}

.icon-personal-blue {
  background: url("../assets/icons/personal_blue.svg") no-repeat center center;
  background-size: 100%;
}
</style>
