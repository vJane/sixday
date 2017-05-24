<template>
  <div class="weather-container" id="weather">
    {{weather}}
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
  export default {
    data() {
      return {
        weather: '',
      };
    },
    props: [
      'district'
    ],
    watch: {
      district(newVal, oldVal) {
        let self = this;
        AMap.service('AMap.Weather', function() {
          let weather = new AMap.Weather();
          weather.getLive(newVal, function(err, data) {
            self.weather = data.weather + "  " + data.temperature + "℃  " + data.windDirection + "风" + data.windPower + "级  湿度" + data.humidity; 
            self.$store.commit('setWeather', self.weather);
          });
        });
      }
    },
    created() {
      let self = this;
      AMap.service('AMap.Weather', function() {
        let weather = new AMap.Weather();
        weather.getLive(self.district, function(err, data) {
          self.weather = data.weather + "  " + data.temperature + "℃  " + data.windDirection + "风" + data.windPower + "级  湿度" + data.humidity; 
          self.$store.commit('setWeather', self.weather);
        });
      });
    }
  }
</script>
<style scoped>
</style>