<template>
  <div>
    <div class="header-container header">
      <el-input placeholder="请输入关键字" icon="search" v-model="input2" class="input-search" :on-icon-click="handleIconClick">
      </el-input>
      <el-dropdown trigger="click" class="more">
        <span class="el-dropdown-link">
          <i class="el-icon-caret-bottom el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="dropdown">
          <el-dropdown-item class="icon icon-date">
            <router-link to="/Calendar" class="link">日历</router-link>
          </el-dropdown-item>
          <el-dropdown-item class="icon icon-weather">
            <router-link to="/Weather" class="link">天气</router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-if="loading">
      <div class="el-icon-loading"></div>
    </div>
    <div v-else class="list-wrapper">
      <div v-for="d in msg" class="diary-box">
        <img v-if="d.src" :src="d.src" class="diary-photo" @click="lookDetail(d.id)" />
        <div class="overflow">
          <div class="diary-date">{{d.created_at | date}}</div>
          <div class="diary-weather">{{d.temperature}}</div>
          <div class="diary-address">{{d.address}}</div>
          <div class="delete" @click="deleteDiary(d.id)">
            <i class="el-icon-delete"></i>
          </div>
        </div>
        <div class="diary-text" @click="lookDetail(d.id)">{{d.context}}</div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" size="small" :before-close="handleClose">
      <span>网络故障</span>
    </el-dialog>
    <TabBar class="footer" indexColor=0 />
  </div>
</template>
<script>
import TabBar from '@/components/TabBar';
import { mapGetters } from 'vuex';
export default {
  name: 'index',
  components: {
    TabBar
  },
  filters: {
    "date": function(value) {
      if (value !== null) {
        let date = new Date(value);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let returnValue = year + "-" + month + "-" + day;
        return returnValue;
      }
    }
  },
  data() {
    return {
      loading: true,
      msg: {},
      dialogVisible: false,
      input2: '',
      uid: '',
    };
  },
  computed: mapGetters({
    diaryList: 'diaryList',
  }),
  methods: {
    handleClose(done) {
      done();
    },
    handleIconClick(ev) {
      this.func.ajaxPost(this.api.diaryFilter, { key: this.input2, uid: this.uid }, res => {
        if (res.data.code === 200) {
          this.msg = res.data.msg;
        }
      });
    },
    deleteDiary(did) {
      if (confirm("确定删除吗？")) {
        this.func.ajaxPost(this.api.diaryDelete, { "did": did }, res => {
          if (res.data.code === 200) {
            location.reload('/lists')
          }
        });
      }
    },
    lookDetail(did) {
      this.$router.push({ path: '/Details', query: { id: did } });
    }
  },
  created() {
    const uid = localStorage.getItem('uid');
    if (uid) {
      this.uid = uid;
      this.func.ajaxPost(this.api.diaryList, { uid: uid }, res => {
        if (res.data.code === 200) {
          this.msg = res.data.msg;
          this.loading = false;
        } else {
          this.dialogVisible = true;
        }
      });
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
}

.header-container {
  height: 60px;
  line-height: 60px;
  background: #3fc4e4;
  color: #fff;
  text-align: left;
}

.title {
  font-size: 16px;
  font-family: '黑体';
}

.input-search {
  width: 80%;
  margin-left: 20px;
}

.more {
  color: #fff;
  font-size: 16px;
  position: absolute;
  right: 20px;
}

.dropdown {
  right: 5px;
  top: 55px !important;
  left: auto !important;
  width: 100px;
}

.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}

.el-icon-loading {
  font-size: 28px;
  margin-top: 150px;
  color: #20a0ff;
}

.link {
  text-decoration: none;
  color: #283238;
  margin-left: 40px;
  font-size: 16px;
  text-align: center;
}

.icon-date {
  background: url(../assets/icons/calendar.svg) no-repeat 10px center;
  border-bottom: 1px solid #d8d8d8;
}

.icon-weather {
  background: url(../assets/icons/weather2.svg) no-repeat 10px center;
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
  font-size: 18px;
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

.delete {
  float: right;
  margin: 15px 22px;
}

.el-icon-delete {
  color: #888;
  font-size: 18px;
}

.diary-weather {
  float: left;
  line-height: 36px;
}

.diary-address {
  float: left;
  text-align: left;
  padding: 0 20px;
  font-size: 14px;
}

.list-wrapper {
  margin-bottom: 100px;
}
</style>
