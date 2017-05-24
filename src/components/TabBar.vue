<template>
  <div>
    <el-menu
      theme="dark"
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <router-link to='/Lists'>
        <el-menu-item index="1" class="menu-item">
          <div v-bind:class=index1></div>
          <div class="icon-text">动态</div>
        </el-menu-item>
      </router-link>
      <!--<router-link to='/Lists'>-->
        <el-menu-item index="2" class="menu-item">
          <div v-bind:class=index2></div>
          <div class="icon-text">照片</div>
        </el-menu-item>
      <!--</router-link>-->
      <router-link to='/'>
        <el-menu-item index="3" class="menu-item">
          <div v-bind:class=index3></div>
          <div class="icon-text">写日记</div>
        </el-menu-item>
      </router-link>
      <router-link to='/Map'>
        <el-menu-item index="4" class="menu-item">
          <div v-bind:class=index4></div>
          <div class="icon-text">地图</div>
        </el-menu-item>
      </router-link>
      <router-link to='/Personal'>
        <el-menu-item index="5" class="menu-item">
          <div v-bind:class=index5></div>
          <div class="icon-text">个人中心</div>
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>
<script>
  export default {
    name: 'headerBar',
    data() {
      return {
        index1: 'font-20 icon-diary',
        index2: 'font-20 icon-camera',
        index3: 'font-20 el-icon-plus',
        index4: 'font-20 icon-map ',
        index5: 'font-20 icon-personal',
        activeIndex: '3',
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  .el-menu--horizontal>.el-menu-item:hover, .el-menu--horizontal>.el-submenu.is-active .el-submenu__title, .el-menu--horizontal>.el-submenu:hover .el-submenu__title {
    border-bottom: 5px solid transparent;
  }
  .font-20 {
    font-size: 20px;
    margin-top: 12px;    
    width: 20px;
    height: 20px;
    margin: 13px auto 0;
  }
  .icon-diary {
    background: url("../assets/icons/diary.svg") no-repeat center center;
    background-size: 100%;
  }
  .icon-camera {
    background: url("../assets/icons/camera.svg") no-repeat center center;
    background-size: 100%;
  }
  .icon-map {
    background: url("../assets/icons/locate.svg") no-repeat center center;
    background-size: 100%;
  }
  .icon-personal {
    background: url("../assets/icons/personal.svg") no-repeat center center;
    background-size: 100%;
  }
  .icon-text {
    font-size: 10px;
    margin-top: 5px;
  }
  .icon-text:hover {
    color: #3fc4e4;
  }
</style>
