<template>
  <div>
    <HeaderBar2 class="header"/>
    <div class="container">
      
      <div class="box">
        <div class="edit">
          <textarea type="text" class="input-text" placeholder="记录我的心情..." v-model="diaryText">
          </textarea>
        </div>
        <div class="image">
          {{diaryPhoto}}
          <div v-if=!diaryPhoto>
            <input type="file" class="input-upload" id="upload" @change=fileChange />
            <div class="input-upload">
              <label for="upload" class="icon-upload"></label>
              <div class="upload-text">上传照片</div>
            </div>
          </div>
          <div v-else class="input-upload">
            <img v-bind:src="diaryPhoto" />
          </div>
        </div>
      </div>

      <div class="box">
        <p class="title">显示地点、天气</p>
        <div class="box-wrapper">
          <div>
            <span class="icon icon-locate"></span>
            <div class="inline-block">
              <p class="show-text">地点</p>
              <p class="show-text-sub" v-if=address>{{this.address}}</p>
              <p class="el-icon-loading" v-else />
            </div>
          </div>
          <el-switch
            class="switch"
            v-model="value1"
            on-text=""
            off-text="">
          </el-switch>
        </div>
        <div class="box-wrapper">
          <div>
            <span class="icon icon-weather"></span>
            <div class="inline-block" >
              <p class="show-text">天气</p>
              <p class="show-text-sub" v-if=address>
                <Weather :district='district' />
                <!--{{weather}}-->
              </p>
              <p class="el-icon-loading" v-else />
            </div>
          </div>
          <el-switch
            class="switch"
            v-model="value2"
            on-text=""
            off-text="">
          </el-switch>
        </div>
      </div>
      
      <div class="box no-bottom">
        <p class="title">分享</p>
        <div class="share-box">
          <div class="share-wrapper">
            <div class="share qq1"></div>
            <el-checkbox v-model="checked1" class="checked"></el-checkbox>
          </div>
          <div class="share-wrapper">
            <div class="share qq2"></div>
            <el-checkbox v-model="checked2" class="checked"></el-checkbox>
          </div>
          <div class="share-wrapper" @click=shareWeixin>
            <div class="share wechat1"></div>
            <el-checkbox v-model="checked3" class="checked"></el-checkbox>
          </div>
          <div class="share-wrapper">
            <div class="share wechat2"></div>
            <el-checkbox v-model="checked4" class="checked"></el-checkbox>
          </div>
        </div>
      </div>
      <div v-if=uid class="button-circle" @click=publishDiary()>发布</div>
      <div v-else class="button-circle">
        <router-link to="/Personal" class="link">登录</router-link>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        size="small"
        :before-close="handleClose">
        <span>发布成功!</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click=diaryDetail()>查看详情</el-button>
        </span>
      </el-dialog>
    </div>
    <div id="demoComponent" :center="center">
        <el-amap vid="amap" :plugin="plugin">
        </el-amap>
    </div>
    <TabBar class="tab-footer"/>
  </div>
</template>

<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script>
  import HeaderBar2 from '@/components/HeaderBar2';
  import TabBar from '@/components/TabBar';
  import Weather from '@/components/Weather';
  import { mapGetters } from 'vuex';
  import uuid from 'node-uuid';
  import jsSHA from 'jssha';
  export default {
    name: 'index',
    components: {
      HeaderBar2,
      TabBar,
      Weather
    },
    data() {
      let self = this;
      return {
       center: [],
        plugin: [{
          pName: 'Geolocation',
          events: {
            init(instance) {
              instance.getCurrentPosition((status, result) => {
                if (status === 'error') {
                  // alert('网络故障，获取地点天气失败！')
                } else {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.address = result.formattedAddress;
                  self.district = result.addressComponent.district;
                }
              });
            }
          }
        }],
        address: '',
        district: '',
        lng: '',
        lat: '',
        value1: true,
        value2: true,
        diaryText: '',
        diaryPhoto: '',
        diaryLocation: '',
        diaryWeather: '',
        diaryShare: {},
        checked1: false,
        checked2: false,
        checked3: false,
        checked4: false,
        dialogVisible: false,
        did: '',
        uid: '',
        weather: '',
      };
    },
    computed: mapGetters({
      weather: 'weather'
    }),
    methods: {
      publishDiary() {
        let weather = document.getElementById('weather');
        if (weather) {
          this.weather = weather.innerHTML;
        }
        let diary = {
          uid: this.uid,
          diaryText: this.diaryText,
          diaryPhoto: this.diaryPhoto,
          diaryWeather: this.value2 ? this.weather : '', 
          diaryShare: {
            qq1: this.checked1,
            qq2: this.checked2,
            wechat1: this.checked3,
            wechat2: this.checked4,
          }, 
          diaryLocation: this.value1 ? {
            address: this.address,
            lng: this.lng,
            lat: this.lat
          } : {},
        };
        this.func.ajaxPost(this.api.diaryPublish, diary, res => {
            if (res.data.code === 200) {
              this.dialogVisible = true;
              this.did = res.data.msg;
            }
        });
      },
      handleClose(done) {
        done();
      },
      diaryDetail() {
        this.dialogVisible = false;
        this.$router.push({path: '/Details', query: {id: this.did}});
      },
      fileChange: function(e) {
        const fileName = e.target.files[0].name;
        this.diaryPhoto = '../assets/' + fileName;
        // console.log(this.diaryPhoto)
      },
      shareWeixin() {
        this.func.ajaxGet(this.api.weixinTicket, res => {
            if (res.data.code === 200) {
              const ticket = res.data.msg;
              const timestamp = (new Date()).getTime();
              const nonce = uuid.v1();
              const url = 'http://localhost:8080';
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
                  chooseImage, 
                  previewImage, 
                  uploadImage, 
                  downloadImage, 
                  onMenuShareTimeline, 
                  onMenuShareAppMessage, 
                  onMenuShareQQ, 
                  onMenuShareQZone
                ] 
              });
              wx.onMenuShareTimeline({
                title: this.diaryText,
                success: function () { 
                  console.log('分享成功！')
                },
                cancel: function () { 
                  console.log('分享取消！')
                }
            });
            }
        });
      }
    },
    created() {
      this.uid = localStorage.getItem('uid');
    }
  }
</script>

<style scoped>
  .header {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }
  .tab-footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .container {
    width: 100%;
    padding: 0 0 0 10px;
    background: #fff;
    text-align: left;
  }
  .box {
    padding: 10px 10px 20px 0;
    border-bottom: 1px solid #d8d8d8;
  }
  .input-text {
    resize: none;
    width: 100%;
    height: 120px;
    font-size: 16px;
    padding: 0;
  }
  .image {
    position: relative;
    height: 100px;
  }
  .input-upload {
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    position: absolute;
    left: 0;
    top: 0;
    color: #f8f8f8;
    text-align: center;
  }
  .upload-bg {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 0;
    top: 0;
    background: #f8f8f8; 
  }
  .icon-upload {
    font-size: 40px;
    margin-top: 17px;
    background: url("../assets/icons/image-upload-icon.svg") no-repeat center center;
    display: inline-block;
    width: 50px;
    height: 50px;
    background-size: 100%;
  }
  .upload-text {
    color: #bbb;
    font-size: 12px;
  }
  .title {
    color: #3fc4e4;
    margin: 0;
    font-size: 16px;
  }
  .no-bottom {
    border-bottom: 0;
  }
  .icon {
    width: 30px;
    height: 30px;
    display: inline-block;
  }
  .icon-locate {
    background: url("../assets/icons/map.svg") no-repeat center center;
    background-size: 100%;
    float: left;
    margin-right: 5px;
  }
  .icon-weather {
    background: url("../assets/icons/weather.svg") no-repeat center center;
    background-size: 100%;
    float: left;
    margin-right: 5px;
    vertical-align: middle;
  }
  .inline-block {
    display: inline-block;
    vertical-align: middle;
  }
  .show-text {
    font-size: 14px;
    margin: 0;
  }
  .show-text-sub {
    font-size: 12px;
    margin: 0;
    color: #999;
    max-width: 280px;
  }
  .box-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .switch {
    font-size: 14px;
    width: 50px;
    height: 35px;
    display: flex;
    align-items: center;
  }
  .share-box {
    overflow: auto;
  }
  .share-wrapper {
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
    width: 20%;
    float: left;
    margin-left: 5%;
  }
  .checked {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 10px;
  }
  .share {
    width: 40px;
    height: 40px;
  }
  .qq1 {
    background: url("../assets/icons/share.png") no-repeat 0 0;
    background-size: 260px;
  }
  .qq2 {
    background: url("../assets/icons/share.png") no-repeat -69px 0;
    background-size: 260px;
  }
  .wechat1 {
    background: url("../assets/icons/share.png") no-repeat 0 -86px;
    background-size: 260px;
  }
  .wechat2 {
    background: url("../assets/icons/share.png") no-repeat -69px -86px;
    background-size: 260px;
  }
  .button-circle {
    width: 60px;
    height: 60px;
    color: #fff;
    background: #3fc4e4;
    float: right;
    text-align: center;
    line-height: 60px;
    margin-right: 20px;
    margin-bottom: 20px;
    font-size: 18px;
    border-radius: 50%;
    box-shadow: 1px 1px 1px 1px #d8d8d8;
  }
  .button-circle:hover {
    background: #20a0ff;
    width:58px;
    height: 58px;
  }
  .link {
    color: #fff;
    text-decoration: none;
  }
  .el-icon-loading {
    margin: 0;
  }
</style>