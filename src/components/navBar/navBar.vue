<style>
  .el-popper[x-placement^=bottom] .popper__arrow::after{
    border-bottom-color: transparent;
    display: none !important;
  }
</style>
<template>
  <div class="nav_bar">
    <el-row>
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
        <div :class="$route.path == '/common'?'grid-content bg-blue_click':'grid-content bg-blue'">
          <router-link to="/common" class="link"><span :class="$route.path == '/common'?'middle active font_modify':'middle light_blue'">体征扫描</span></router-link>
        </div>
      </el-col>
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
        <div :class="$route.path == '/analyze'?'grid-content bg-blue_click':'grid-content bg-blue'">
          <router-link to="/analyze" class="link"><span :class="$route.path == '/analyze'?'middle active font_modify':'middle light_blue'">症状分析</span></router-link>
        </div>
      </el-col>
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
        <div :class="($route.path == '/evaluate' || $route.path == '/diagnose')?'trapezoid_left_click':'trapezoid_left'">
          <el-dropdown class="fix light_blue" trigger="click">
            <span @click="openDiagnose" :class="($route.path == '/evaluate' || $route.path == '/diagnose') ? 'el-dropdown-link active':'el-dropdown-link'">健康诊断<i :class="dopen ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i></span>
            <el-dropdown-menu class="dmenu" slot="dropdown">
              <router-link to="/evaluate" class="link"><el-dropdown-item>综合评价</el-dropdown-item></router-link>
              <router-link to="/diagnose" class="link"><el-dropdown-item>智能诊断</el-dropdown-item></router-link>
            </el-dropdown-menu>
          </el-dropdown>
          <!--<span class="fix light_blue">健康诊断</span>-->
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
        <div class="title">
          <div class="title_left"></div>
          <div class="title_right"></div>
          <img src="../../../static/logo.png" class="logo">
          <span class="date">{{this.date}}</span>
        </div>
      </el-col>
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
        <div :class="$route.path == '/dispatch' ?'trapezoid_right_click':'trapezoid_right'">
          <router-link to="/dispatch" class="link"><span :class="$route.path == '/dispatch'?'fix active font_modify':'fix light_blue'">智能调度</span></router-link>
        </div>
      </el-col>
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
        <div :class="($route.path == '/history'||$route.path == '/risk')?'grid-content bg-blue_click':'grid-content bg-blue'">
          <el-dropdown class="middle light_blue" trigger="click">
            <span :class="$route.path == '/history' ? 'el-dropdown-link active':'el-dropdown-link'" @click="dispose = !dispose">应急处置<i :class="dispose ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i></span>
            <el-dropdown-menu class="dimenu" slot="dropdown">
              <router-link to="/history" class="link"><el-dropdown-item>历史事故查询</el-dropdown-item></router-link>
              <router-link to="/risk" class="link"><el-dropdown-item>事故风险分析</el-dropdown-item></router-link>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
        <div :class="$route.path == '/emulation'?'grid-content bg-blue_click':'grid-content bg-blue'">
          <router-link to="/emulation" class="link"><span :class="$route.path == '/emulation'?'middle active font_modify':'middle light_blue'">仿真优化</span></router-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "navBar",
    data(){
      return{
        dopen: false,
        dispose: false,
        emulation: false,
        mapOpen: true,
        chartOpen: false,
        diagnoseOpen: false,
        dispatchOpen: false,
        historyOpen: false,
        date: ''
      };
    },
    mounted(){
      var that = this;
      setInterval(function(){
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        var h = today.getHours() > 9 ? today.getHours() : '0' + today.getHours();
        var m = today.getMinutes() > 9 ? today.getMinutes() : '0' + today.getMinutes();
        var s = today.getSeconds() > 9 ? today.getSeconds() : '0' + today.getSeconds();
        that.date = year + '/' + month + '/' + day + ' ' + h + ':' + m + ':' + s;
      }, 1000);
    },
    methods:{
      openDiagnose(){
        this.dopen = !this.dopen;
        if(this.dopen){
          var arrow = document.getElementsByClassName("popper__arrow");
          if(arrow[0]){
            arrow[0].style.display = 'none';
          }
          if(arrow[1]){
            arrow[1].style.display = 'none';
          }
        }
      }
    }
  }
</script>

<style scoped>
  /*
  .nav_bar{
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }
  */
  .nav_bar{
    height: 46px !important;
    overflow: hidden;
  }	
  el-col {
    border-radius: 4px;
  }
  .bg-blue {
    background: #0f4760;
    opacity: 0.9;
  }
  .bg-blue_click {
    background: #1A232C;
    opacity: 0.9;
  }
  .grid-content {
    min-height: 36px;
    line-height: 36px;
  }
  .trapezoid_left{
    border-bottom: 37px solid #0f4760;
    border-right: 27px solid transparent;
    position: relative;
    opacity: 0.9;
  }
  .trapezoid_left_click{
    border-bottom: 37px solid #1A232C;
    border-right: 27px solid transparent;
    position: relative;
    opacity: 0.9;
  }
  .trapezoid_right{
    border-bottom: 37px solid #0f4760;
    border-left: 27px solid transparent;
    position: relative;
    opacity: 0.9;
  }
  .trapezoid_right_click{
    border-bottom: 37px solid #1A232C;
    border-left: 27px solid transparent;
    position: relative;
    opacity: 0.9;
  }
  .title{
    width: 80%;
    margin: 0 auto;
    position: relative;
    border-top: 46px solid #146C97;
    border-left: 32px solid transparent;
    border-right: 32px solid transparent;
    opacity: 0.9;
  }
  .title_left{
    position: absolute;
    left: -38px;
    top: -46px;
    width: 5%;
    min-height: 36px;
    background-color: #146C97;
    transform: skew(36deg);
    opacity: 0.9;
  }
  .title_right{
    position: absolute;
    right: -38px;
    top: -46px;
    width: 5%;
    min-height: 36px;
    background-color: #146C97;
    transform: skew(-36deg);
    opacity: 0.9;
  }
  .light_blue{
    color: #25D6F6;
    font-size: 80%;
    cursor: pointer;
  }
  .middle{
    text-align: center;
  }
  .white{
    color: #fff;
    font-weight: 600;
    position: absolute;
    top: -36px;
    left: 38%;
  }
  .fix{
    position: absolute;
    top: 9px;
    left: 30%;
  }
  .link{
    text-decoration: none;
  }
  .el-dropdown-menu {
    border: none;
    border-radius: 0;
    width: 140px;
    padding: 0;
    background-color: #0d4e67;
  }
  .el-dropdown-menu__item {
    list-style: none;
    line-height: 36px;
    margin: 0 auto;
    font-size: 12px;
    color: #fff;
    font-weight: 300;
    cursor: pointer;
    outline: 0;
  }
  .dmenu{
    position: absolute;
    top: 38px !important;
    left: 25% !important;
  }
  .dimenu{
    position: absolute;
    top: 38px !important;
    right: 15% !important;
  }
  .active{
    color: #fff;
  }
  .font_modify{
    font-size: 80%;
  }
  .logo{
    width: 30%;
    position: absolute;
    top: -40px;
    left: 35%;
  }
  .date{
    font-size: 12px;
    font-weight: 500;
    color: white;
    position: absolute;
    top: -17px;
    left: 32%;
  }
</style>
