<template>
    <div class="container">
        <HeaderBar2 class="header"/>
        <div class="amap-wrapper">
          <div id="demoComponent" class="demo-component">
            <el-amap vid="amap" :zoom="zoom" :center="center" :amapManager="amapManager" :plugin="plugin" :events="events">
              <el-amap-polyline :editable="polyline.editable"  :path="polyline.path" :events="polyline.events"></el-amap-polyline>
              <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events">
              </el-amap-marker>
            </el-amap>
          </div>
        </div>
        <div v-if=loading>
          <div class="el-icon-loading"></div>
        </div>
        <div v-else class="list-wrapper">
          <div v-for="d in msg" class="diary-box">
            <div class="overflow">
              <div class="diary-date">{{d.created_at | date}}</div>
            </div>
            <div class="diary-text" @click="lookDetail(d.id)">{{d.context}}</div>
          </div>
        </div>
        <TabBar class="footer"/>
    </div>
</template>
<script>
  import HeaderBar2 from '@/components/HeaderBar2';
  import TabBar from '@/components/TabBar';
  import Amap from '@/components/Amap';
  import { AMapManager } from 'vue-amap';
  let amapManager = new AMapManager();
  const POLYGON_ID = 'POLYGON_ID';
  export default {
    components: {
      HeaderBar2,
      TabBar,
      Amap
    },
  data () {
    return {
        loading: false,
        msg: {},
        zoom: 5,
        plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init(o) {
            console.log(o);
          }
         }
        }],
        amapManager: amapManager,
        center: [119.549226, 39.913419],
        markers: [
          {
            position: [111.65, 40.82],
            events: {
              click: () => {
                this.filterLocation('呼和浩特')
              },
            },
            visible: true,
            draggable: false
          },
          {
            position: [113.62, 34.75],
            events: {
              click: () => {
                this.filterLocation('郑州')
              },
            },
            visible: true,
            draggable: false
          },
          {
            position: [116.20, 40.22],
            events: {
              click: () => {
                this.filterLocation('北京')
              },
            },
            visible: true,
            draggable: false
          },
          {
            position: [116.92, 38.93],
            events: {
              click: () => {
                this.filterLocation('天津')
              },
            },
            visible: true,
            draggable: false
          },
          {
            position: [119.549226, 39.913419],
            events: {
              click: () => {
                this.filterLocation('秦皇岛')
              },
            },
            visible: true,
            draggable: false
          }
        ],
        polyline: {
        vid: POLYGON_ID,
        path: [[111.65, 40.82], [113.62, 34.75], [116.20, 40.22], [116.92, 38.93], [119.549226, 39.913419]],
        events: {
          click(e) {
            alert('click polyline');
          },
          end: (e) => {
            let newPath = e.target.getPath().map(point => [point.lng, point.lat]);
            console.log(newPath);
          }
        },
        editable: false
      }
    }
  },
  filters: {
    "date": function(value) {
      if (value !== null) {
        let date = new Date(value);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let returnValue = year + "年" + month + "月" + day + "日";
        return returnValue;
      }
    }
  },
  methods:{
    lookDetail(did) {
      this.$router.push({path: '/Details', query: {id: did}});
    },
    filterLocation(location) {
      this.func.ajaxPost(this.api.diaryFilter, {key: location}, res => {
        if (res.data.code === 200) {
          this.msg = res.data.msg;
        }
       });
    }
  },
  created() {
    this.func.ajaxGet(this.api.diaryList, res => {
        if (res.data.code === 200) {
            this.msg = res.data.msg;
            this.loading = false;
        }
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
  .amap-wrapper {
    width: 100%;
    height: 300px;
  }
  .demo-component {
    height: 300px;
  }
  .diary-weather {
    float: left;
    line-height: 36px;
  }
  .diary-address {
    float: left;
    text-align: left;
    padding: 5px 20px;
  }
  .list-wrapper {
    margin-bottom: 100px;
  }
  .diary-box {
    margin-bottom: 20px;
  }
  .diary-photo {
    height: 200px;
    width: 100%;
    overflow: hidden;
  }
  .diary-text {
    text-align: left;
    text-indent: 2em;
    padding: 0 20px;
  }
  .diary-date {
    float: left;
    margin: 5px 20px;
    color: #3fc4e4;
    font-size: 20px;
  }
  .overflow {
    overflow: auto;
  }
</style>
