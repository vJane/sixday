<template>
  <div class="container">
      <div class="title">浮生六记</div>
      <div class="right-button">
        <el-dropdown trigger="click" class="more">
          <span class="el-dropdown-link">
            <i class="el-icon-caret-bottom el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="dropdown">
            <el-dropdown-item class="icon icon-date">
              <router-link to="/Calendar" class="link">日历</router-link>
            </el-dropdown-item>
            <el-dropdown-item class="icon icon-weather">
              <router-link to="/weather" class="link">天气</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'headerBar',
    data() {
      return {
        input2: ''
      };
    },
    methods: {
      handleIconClick(ev) {
        console.log(ev);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    height: 60px;
    line-height: 60px;
    background: #3fc4e4;
    color: #fff;
  }
  .title {
    font-size: 18px;
    font-family: PingFang SC;
    text-align: center;
  }
  .right-button {
    position: absolute;
    right: 20px;
    top: 0;
    display: flex;
    align-items: center;
  }
  .more {
    margin-left: 20px;
    color: #fff;
    font-size: 16px;
  }
  .dropdown {
    right: 5px;
    top: 55px !important;
    left: auto !important;
    width: 100px;
  }
  .refresh {
    height: 60px;
    width: 27px;
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
</style>
