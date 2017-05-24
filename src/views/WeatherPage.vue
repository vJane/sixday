<template>
    <div class="container">
        <HeaderBar2 class="header"/>
        <div class="weather-wrapper">
          <div class="weather">
            <span class="temperature">{{weather.temperature}}</span>
            ℃
          </div>
          <div class="sun-wrapper">
            <span class="sun"></span>
          </div>
          <div class="province-box">
            <div>
              <p>{{weather.province}}省  {{weather.city}}</p>
            </div>
          </div>
          <div class="trans-box">
            <div>
              <p>{{weather.windDirection}}风</p>
              <p>风力{{weather.windPower}}级 </p>
            </div>
          </div>
          <div class="trans-box">
            <div>
              <p>湿度{{weather.humidity}}</p>
              <p>空气质量良好</p>
            </div>
          </div>
        </div>
        <TabBar class="footer"/>
    </div>
</template>
<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&key=865d481a98e51cf90cbf2b9f30fae682"></script>
<script type="text/javascript" src="http://cache.amap.com/lbs/static/addToolbar.js"></script>
<script>
  var map = new AMap.Map('weather', {
      resizeEnable: true,
  });
</script>
<script>
  import HeaderBar2 from '@/components/HeaderBar2';
  import TabBar from '@/components/TabBar';
  export default {
    components: {
      HeaderBar2,
      TabBar,
    },
    data () {
      return {
        weather: '',
        district: '海港区'
      }
    },
    watch: {
      district(newVal, oldVal) {
        let self = this;
        AMap.service('AMap.Weather', function() {
          let weather = new AMap.Weather();
          weather.getLive(newVal, function(err, data) {
            self.weather = data.weather + "  " + data.temperature + "℃  " + data.windDirection + "风" + data.windPower + "级  湿度" + data.humidity; 
          });
        });
      }
    },
    created() {
      let self = this;
      AMap.service('AMap.Weather', function() {
        let weather = new AMap.Weather();
        weather.getLive(self.district, function(err, data) {
          // self.weather = data.weather + "  " + data.temperature + "℃  " + data.windDirection + "风" + data.windPower + "级  湿度" + data.humidity; 
          self.weather = data;
        });
      });
    }
 }
</script>
<style type="text/css">
 .header {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
  }
  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .weather-wrapper {
    background-image: -webkit-linear-gradient(top,#3fc4e4,#6ec2ff);
    width: 100%;
    height: 650px;
    padding-top: 20px;
    overflow: hidden;
  }
  .trans-box {
    width: 50%;
    background: rgba(255, 255, 255, 0.2);
    height: 100px;
    float: left;
    margin-top: 15%;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    border-right: 1px solid #fff;
  }
  .trans-box:last-child {
    border-right: none;
  }
  .weather {
    color: #fff;
    font-size: 24px;
    float: left;
    margin-left: 15%;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
    width: 45%;
  }
  .temperature {
    font-size: 100px;
  }
  .sun-wrapper {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(255, 255, 0, 0.2);
    line-height: 80px;
    float: left;
    margin-left: 5%;
    margin-top: 20px;
  }
  .sun {
    width: 60px;
    height: 60px;
    background: #fe4;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
  }
  .province-box {
    width: 80%;
    margin: 0 10%;
    float: left;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-weight: bold;
    font-size: 26px;
  }
</style>
