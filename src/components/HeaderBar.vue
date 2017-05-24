<template>
  <div class="container">
    <el-input
      placeholder="请输入关键字"
      icon="search"
      v-model="input2"
      class="input-search"
      :on-icon-click="handleIconClick">
    </el-input>
    <el-dropdown trigger="click" class="more">
      <span class="el-dropdown-link">
        <i class="el-icon-caret-bottom el-icon-more"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="dropdown">
        <el-dropdown-item class="el-icon-date">日历</el-dropdown-item>
        <a href='http://weather.alanwong.tech/'>
          <el-dropdown-item class="el-icon-date">天气</el-dropdown-item>
        </a>
      </el-dropdown-menu>
    </el-dropdown>
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
        alert(this.input2);
        this.func.ajaxPost(this.api.filterDiary, {key: this.input2}, res => {

        });
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
</style>
