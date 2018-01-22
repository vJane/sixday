<template>
  <div class="container">
    <HeaderBar2 class="header" />
    <div class="amap-wrapper">
      <div id="demoComponent" class="demo-component">
        <el-amap vid="amap" :zoom="zoom" :center="center" :amapManager="amapManager" :plugin="plugin" :events="events">
          <el-amap-polyline :editable="polyline.editable" :path="polyline.path" :events="polyline.events"></el-amap-polyline>
          <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events">
          </el-amap-marker>
        </el-amap>
      </div>
    </div>
    <div v-if="loading">
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
    <TabBar class="footer" indexColor=2 />
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
  data() {
    return {
      loading: false,
      uid: '',
      locations: [],
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
      center: [],
      markers: [],
      polyline: {
        vid: POLYGON_ID,
        path: '',
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
  methods: {
    lookDetail(did) {
      this.$router.push({ path: '/Details', query: { id: did } });
    },
    filterLocation(location) {
      this.func.ajaxPost(this.api.mapFilter, { key: location, uid: this.uid }, res => {
        if (res.data.code === 200) {
          this.msg = res.data.msg;
        }
      });
    }
  },
  created() {
    const uid = localStorage.getItem('uid');
    this.uid = uid;
    this.func.ajaxPost(this.api.diaryList, { uid: uid }, res => {
      if (res.data.code === 200) {
        this.msg = res.data.msg;
        this.loading = false;
        for (let m of res.data.msg) {
          if (m.longitude && m.latitude) {
            let location = [m.longitude, m.latitude];
            this.locations.push(location);
            this.markers.push({
              position: location,
              events: {
                click: () => {
                  this.filterLocation(location);
                },
              },
              visible: true,
              draggable: false
            });
          }
        }
        this.polyline.path = this.locations.reverse();
      }
    });
    this.func.ajaxGet(this.api.mapData, res => {
      if (res.data.code === 200) {
        let row = res.data.msg;
        this.center = [row.longitude, row.latitude];
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
  margin-bottom: 20px;
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
