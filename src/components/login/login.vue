<style>
  .el_tabs{
    width: 200px;
  }
  .el-tabs__item{
    font-size: 12px;
    color: #fff;
    font-weight: 400;
  }
  .el-tabs__nav{
    width: 200px;
  }
  #login_block .el-input__inner{
    color: white;
    border-radius: 1px;
    border: #93A1C2 solid 1px !important;
    width: 100% !important;
    height: 30px !important;
    background-color: transparent !important;
    font-size: 12px;
  }
  .el-tabs__active-bar{
    width: 112px !important;
  }
</style>
<template>
  <div id="container">
    <div class="login_panel">
      <div class="logo_block">
        <img :src="logo_src" class="logo_img">
        <div class="logo_title">
          <span>公交医生</span>
          <span class="en">Dr.Transit</span>
        </div>
      </div>
      <div id="login_block" class="login_block">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="手机登录" name="mobile">
            <div class="content">
              <span class="label">手机号</span>
              <el-input id="phone" v-model="phone"></el-input>
            </div>
            <div class="short_content">
              <span class="label">验证码</span><br>
              <el-input id="code" class="short" type="password" v-model="message"></el-input>
              <span class="send">发送验证码</span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="邮箱登录" name="mail">
            <div class="content">
              <span class="label">邮箱</span>
              <el-input id="mail" v-model="address"></el-input>
            </div>
            <div class="content">
              <span class="label">密码</span>
              <el-input id="pwd" type="password" v-model="pwd"></el-input>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="content">
          <el-button class="register" type="primary" @click="submitLogin">登&nbsp;录</el-button>
          <span class="tips">还没有账号?&nbsp;&nbsp;<router-link to="/register"><span class="go_reg">免费注册</span></router-link></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data(){
      return{
        logo_src: 'static/icon/logo_bus.png',
        activeName: 'mobile',
        phone: '', //13801866675
        message: '',
        password: '',
        address: '',
        pwd: ''
      }
    },
    mounted(){
      var height = window.screen.availHeight;
      document.getElementById("container").style.height = height + 'px';
      var input = document.getElementsByClassName('el-input__inner');
      for(var i=0; i<input.length; i++){
        input[i].id = 'input_' + i;
      }
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      submitLogin(){
        var that = this;
        var url = 'http://47.98.199.36:9001/user/login';
        that.$http.get(url, {
          params:{
            "username": that.phone,
            "validate_code": that.message
          }
        }, {emulateJSON: true}).then((res)=>{
          if(res.data.error_code == 0){
            var session = window.sessionStorage;
            session.setItem('login', true);
            that.$router.push({ name: 'common' });
          }
        }).catch((res)=>{
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  #container{
    width: 100%;
    height: 750px;
    background:url(/static/bg/login_bg.png)no-repeat;
    background-size:100% 100%;
    position: relative;
    filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/static/bg/login_bg.png',sizingMethod='scale');
  }
  .login_panel{
    width: 300px;
    height: 380px;
    background-color: rgba(58, 85, 146, 0.7);
    position: absolute;
    right: 160px;
    bottom: 200px;
  }
  .login_block{
    width: 200px;
    height: 280px;
    position: absolute;
    bottom: 0;
    left: 30px;
    right: 30px;
    padding: 0 20px;
  }
  .label{
    color: #fff;
    font-size: 12px;
    float: left;
    margin-bottom: 5px;
  }
  .content{
    width: 100%;
    margin: 5px 0;
  }
  .short{
    width: 50%;
    float: left;
  }
  .send{
    color: #15A3FF;
    font-size: 12px;
  }
  .register{
    width: 100%;
    background-color: #159DFF;
    color: #fff;
    border-radius: 0;
    margin-top: 10px;
    height: 35px;
    line-height: 10px;
  }
  .tips{
    color: #fff;
    font-size: 12px;
    width: 100%;
    margin-top: 10px;
  }
  .logo_block{
    width: 70px;
    height: 70px;
    position: absolute;
    top: -35px;
    left: 115px;
  }
  .logo_img{
    width: 100%;
  }
  .logo_title{
    margin-top: -8px;
    color: #209AFF;
    font-size: 14px;
  }
  .en{
    font-size: 10px;
  }
  .go_reg{
    color: #209AFF;
    cursor: pointer;
  }
</style>
