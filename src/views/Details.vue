<template>
  <div>
    <HeaderBar2 class="header"/>
      <div v-if=loading>
        <div class="el-icon-loading"></div>
      </div>
      <div v-else class="diary-wrapper">
        <img :src=msg.src class="diary-image"/>
        <div class="diary-text">
          {{msg.context}}
        </div>
        <div class="diary-weather">{{msg.temperature}}</div>
        <div class="diary-address">{{msg.address}}</div>
        <div class="diary-date">{{msg.created_at}}</div>
      </div>
    <TabBar class="footer"/>
  </div>
</template>
<script>
  import HeaderBar2 from '@/components/HeaderBar2';
  import TabBar from '@/components/TabBar';
  export default {
    name: 'index',
    components: {
      HeaderBar2,
      TabBar
    },
    data() {
      return {
        loading: true,
        msg: {},
      };
    },
    created () {
      let id = this.$route.query.id;
      if (id) {
        this.func.ajaxPost(this.api.diaryDetail, {id}, res => {
          if (res.data.code === 200) {
            this.loading = false,
            this.msg = res.data.msg;
          } else {
            this.$router.push({path: '/'});
          }
        });
      } else {
        this.$router.push({path: '/'});
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
  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .diary-wrapper {
    margin-bottom: 100px;
  }
  .diary-image {
    width: 100%;
    padding: 10px;
    border: 1px solid #d8d8d8;
    box-shadow: 1px 1px 1px 1px #ccc;
  }
  .diary-text {
    margin: 10px 20px;
    text-align: left;
    line-height: 1.5;
    text-indent: 2em;
  }
  .diary-date {
    text-align: left;
    font-size: 14px;
    margin-left: 20px;
  }
  .diary-weather {
    text-align: left;
    margin: 0 20px;
  }
  .diary-address {
    text-align: left;
    margin: 5px 0;
  }
</style>