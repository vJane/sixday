<template>
    <div class="container">
        <HeaderBar2 class="header"/>
          <div class="block">
            <full-calendar :events="fcEvents" locale="en"></full-calendar>
          </div>
        <TabBar class="footer"/>
    </div>
</template>
<script>
  import HeaderBar2 from '@/components/HeaderBar2';
  import TabBar from '@/components/TabBar';
  import fullCalendar from 'vue-fullcalendar'
  export default {
    components: {
      HeaderBar2,
      TabBar,
      'full-calendar': fullCalendar
    },
    data () {
      return {
        fcEvents : demoEvents
      }
    },
    methods:{
    },
    created() {
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
  .block {
    height: 586px;
    overflow: hidden;
  }
</style>
