<style>
  .amap-container {
    cursor: default !important;
  }
  .amap-labels{
    cursor: default !important;
  }
  .el-input__inner{
    height: 20px;
    width: 100%;
    background-color: #152534 !important;
    border: 0;
    border-radius: 0 !important;
    color: #fff;
    font-size: 60%;
  }
</style>
<template>
  <div>
    <navBar></navBar>
    <div id="container">
      <div class="op_panel">
        <div class="op_bar"><span class="white op_title">新建线路</span>
          <span v-bind:class="{'op_button new op_button_inactive': (edit_op || modify_op), 'op_button new op_button_active': (!edit_op && !modify_op) }" v-on:click="createNewLine()">新建</span>
          <span v-bind:class="{'op_button create op_button_inactive': (edit_op || modify_op), 'op_button create op_button_active': (!modify_op && !edit_op) }" v-on:click="editLine()">编辑</span>
          <span v-bind:class="{'op_button add op_button_inactive op_button_disable': (!edit_op && !modify_op), 'op_button add op_button_active': (edit_op||modify_op) }" v-on:click="saveLine()">保存</span>
        </div>
        <div class="op_content">
          <el-row :gutter="10">
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"><span class="white">线路</span></el-col>
            <el-col :xs="4" :sm="8" :md="8" :lg="8" :xl="8"><el-input v-model="line_name"></el-input></el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"><span class="white">方向</span></el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><el-input v-model="line_direction"></el-input></el-col>
          </el-row>
          <el-row style="padding: 0 5px; margin-top:13px;">
            <el-col :span="4">
              <div v-bind:class="{'op_bgc': op_type != 0, 'op_bgc_selected': op_type == 0}" v-on:click="drawLine()">
                <div v-bind:class="{'op_icon line_active': op_type == 0 && (edit_op || modify_op), 'op_icon line_disable': !edit_op && !modify_op, 'op_icon line': op_type != 0 && (edit_op || modify_op)}"></div>
              </div>
            </el-col>
            <el-col :span="4">
              <div v-bind:class="{'op_bgc': op_type != 1, 'op_bgc_selected': op_type == 1}" v-on:click="drawCircle()">
                <div v-bind:class="{'op_icon circle_active': op_type == 1 && (edit_op || modify_op), 'op_icon circle_disable': !edit_op && !modify_op, 'op_icon circle': op_type != 1 && (edit_op || modify_op)}"></div>
              </div>
            </el-col>
            <el-col :span="4">
              <div v-bind:class="{'op_bgc': op_type != 2, 'op_bgc_selected': op_type == 2}" v-on:click="viewMap()">
                <div v-bind:class="{'op_icon move_active': op_type == 2 && (!edit_op && !modify_op), 'op_icon move_disable': !edit_op && !modify_op, 'op_icon move': op_type != 2 && (edit_op || modify_op)}"></div>
              </div>
            </el-col>
            <el-col :span="4">
              <div v-bind:class="{'op_bgc': op_type != 3, 'op_bgc_selected': op_type == 3}" v-on:click="editMap()">
                <div v-bind:class="{'op_icon edit_active': op_type == 3 && (edit_op || modify_op ), 'op_icon edit_disable': !edit_op && !modify_op, 'op_icon edit': op_type != 3 && (edit_op || modify_op || op_type == 2)}"></div>
              </div>
            </el-col>
            <el-col :span="4">
              <div v-bind:class="{'op_bgc': op_type != 4, 'op_bgc_selected': op_type == 4}">
                <div v-bind:class="{'op_icon shrink_active': op_type == 4 && (edit_op || modify_op || op_type == 3), 'op_icon shrink_disable': !edit_op && !modify_op, 'op_icon shrink': op_type != 3 && (edit_op || modify_op)}"></div>
              </div>
            </el-col>
            <el-col :span="4">
              <div v-bind:class="{'op_bgc': op_type != 5, 'op_bgc_selected': op_type == 5}">
                <div v-bind:class="{'op_icon magnify_active': op_type == 5 && (edit_op || modify_op || op_type == 3), 'op_icon magnify_disable': !edit_op && !modify_op, 'op_icon magnify': op_type != 3 && (edit_op || modify_op)}"></div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div id="station_panel" class="op_station">
        <div class="white edit_title"><span class="title_name">站点名称</span></div>
        <el-input class="station_input" v-model="station_name" @change="inputChange()"></el-input>
      </div>
      <div class="white effect_panel">
        <div class="effect_title"><span class="white op_title">影响评估</span></div>
        <div class="form">
          <div class="odd"><div class="left"><span class="label">非直线系数</span></div><div class="right"><span class="label">{{straight}}</span></div></div>
          <div class="even"><div class="left"><span class="label">线路长度</span></div><div class="right"><span class="label">{{line_distance}}</span></div></div>
          <div class="odd"><div class="left"><span class="label">平均运行速度</span></div><div class="right"><span class="label">{{speed}}</span></div></div>
          <div class="even"><div class="left"><span class="label">换乘便捷性</span></div><div class="right"><span class="label">{{convenience}}</span></div></div>
          <div class="odd"><div class="left"><span class="label">专用道比例</span></div><div class="right"><span class="label">{{distribution}}</span></div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import navBar from '../../components/navBar/navBar.vue';
  export default {
    name: "emulation",
    components: {
      navBar: navBar
    },
    data(){
      return{
        map: null,
        edit_op: false,
        line_name: '',
        line_direction: '',
        layer_base: null, //底图图层
        layer_station: null, //圆圈图层
        layer_point: null, //线路图层
        layer_line: null, //线路图层
        centers: [], //所有六边形的中心
        points: [], //所有选中的站点
        stations: [], //所有选中的圆圈
        lines: [], //所有线路所经点
        op_type: 0, //0为直线，1为圆圈，2为移动，3为编辑
        station_name: '',
        cur_lng: 0,
        cur_lat: 0,
        station_store: [],
        modify_op: false,
        view_op: true,
        line_name_store: '',
        line_direction_store: '',
        straight: '-',
        line_distance: '-',
        speed: '-',
        convenience: '-',
        distribution: '-'
      }
    },
    mounted(){
      var that = this;
      var height = window.screen.availHeight - 46;
      document.getElementById("container").style.height = window.screen.availHeight + 'px';
      that.map = new AMap.Map('container',{
        center: [121.56, 29.86],
        zoom: 13
      });
      that.map.setMapStyle('amap://styles/dark');
      /*
      that.map.on('click', function(e) {
        console.log(e.lnglat.getLng()+','+e.lnglat.getLat());
      });
      */
    },
    methods:{
      getHeader({ row, rowIndex }) {
        if (rowIndex == 0) {
          return 'header'
        }
        else {
          return 'subheader'
        }
      },
      createNewLine(){
        var that = this;
        that.op_type = 0;
        if(that.edit_op){
          that.$confirm('此操作将丢弃正在编辑的线路, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            that.edit_op = false;
            that.line_name = '';
            that.line_direction = '';
          }).catch(() => {
            return;
          });
        }
        else{
          if(that.line_name == '' || that.line_direction == ''){
            this.$message({
              showClose: true,
              message: '线路名称及方向不得为空',
              type: 'error'
            });
          }
          else{
            that.edit_op = true;
            that.op_type = 0;
            that.drawHexagon();
          }
        }
      },
      editLine(){
        var that = this;
        that.op_type = 0;
        if(that.edit_op){
          return;
        }
        if(that.line_name_store == '' && that.line_direction_store == ''){
          this.$message({
            showClose: true,
            message: '尚无可编辑的线路',
            type: 'error'
          });
        }
        else{
          that.line_name = that.line_name_store;
          that.line_direction = that.line_direction_store;
          that.modify_op = true;
          that.op_type = 0;
          that.drawHexagon();
        }
      },
      fillInput(){
        var that = this;
        var index = -1;
        for(var i = 0; i < that.station_store.length; i++){
          if(that.station_store[i].center[0] == that.cur_lng && that.station_store[i].center[1] == that.cur_lat){
            index = i;
            that.station_name = that.station_store[i].name;
            break;
          }
        }
        if(index == -1){
          that.station_name = '';
        }
      },
      inputChange(){
        var that = this;
        var index = -1;
        for(var i = 0; i < that.station_store.length; i++){
          if(that.station_store[i].center[0] == that.cur_lng && that.station_store[i].center[1] == that.cur_lat){
            index = i;
            break;
          }
        }
        if(index == -1){
          that.station_store.push({"center": [that.cur_lng, that.cur_lat], "name": that.station_name});
        }
        else{
          that.station_store[i].name = that.station_name;
        }
      },
      drawHexagon(){
        var that = this;
        var init = [121.451853, 29.913654, 121.668318, 29.806317];
        var left_top = new AMap.LngLat(init[0], init[1]);
        var right_top =  new AMap.LngLat(init[2], init[1]);
        var left_bottom = new AMap.LngLat(init[0], init[3]);
        var right_bottom =  new AMap.LngLat(init[2], init[3]);
        var radius = 0.3;
        var dy = radius * 3;
        var dx = radius * Math.sin(Math.PI / 3);
        that.centers = [];
        var xnum = Math.floor(Math.round(left_top.distance(right_top)/1000) / dx) + 1;
        var ynum = Math.floor(Math.round(left_top.distance(left_bottom)/1000) / dy) + 1;
        for(var i = 0; i < xnum; i++) {
          for (var j = 0; j < ynum; j++) {
            var point = [];
            if (i % 2 == 0) {
              point[0] = init[0] + (360 / (Math.sin(Math.PI / 3) * 2 * Math.PI * 6357)) * i * dx;
              point[1] = init[1] - (180 / (Math.PI * 6357)) * j * dy;
            }
            else {
              point[0] = init[0] + (360 / (Math.sin(Math.PI / 3) * 2 * Math.PI * 6357)) * i * dx;
              point[1] = init[1] - (180 / (Math.PI * 6357)) * (j + 0.5) * dy;
            }
            that.centers.push({'center': point});
          }
        }

        var amap = Loca.create(that.map);
        that.layer_base = Loca.visualLayer({
          eventSupport: true,
          container: amap,
          type: 'point',
          shape: 'hexagon'
        });

        that.layer_station = Loca.visualLayer({
          eventSupport: true,
          container: amap,
          type: 'point',
          shape: 'circle',
          zIndex: '250'
        });

        that.layer_point = Loca.visualLayer({
          eventSupport: true,
          container: amap,
          type: 'point',
          shape: 'circle',
          zIndex: '300'
        });

        that.layer_line = Loca.visualLayer({
          eventSupport: true,
          container: amap,
          blendMode: 'lighter',
          type: 'line',
          shape: 'line',
          zIndex: '300'
        });

        that.layer_base.setData(that.centers, {
          type: 'json',
          lnglat: 'center'
        });

        that.layer_line.setData(that.lines, {
          lnglat: 'line'
        });

        that.layer_base.setOptions({
          unit: 'meter',
          style: {
            radius: '300',
            fill: '#1D2A45',
            stroke: '#285166',
            lineWidth: 1,
            fillOpacity: 0.5
          },
          selectStyle: {
            fill: '#296992'
          }
        });

        that.layer_point.setOptions({
          unit: 'meter',
          style: {
            radius: '40',
            fill: '#FEF867',
            lineWidth: 1,
            fillOpacity: 1
          },
        });

        that.layer_station.setOptions({
          unit: 'meter',
          style: {
            radius: '100',
            fill: '#FEF867',
            lineWidth: 1,
            fillOpacity: 0.8
          },
        });

        that.layer_line.setOptions({
          style: {
            opacity: 1,
            lineWidth: 3,
            stroke: '#FEF867'
          }
        });

        that.layer_station.setData(that.stations, {
          type: 'json',
          lnglat: 'center'
        });

        that.layer_base.on('click', function (ev) {
          var rawData = ev.rawData;
          if(that.op_type == 0){
            if(that.map.lngLatToContainer(rawData.center).y > 50 && that.map.lngLatToContainer(rawData.center).x > 100){
              that.points.push(rawData);
            }
            that.layer_point.setData(that.points, {
              type: 'json',
              lnglat: 'center'
            });
            that.layer_point.render();
            if(that.points.length > 1){
              that.lines = [];
              for(var i = 0; i < that.points.length - 1; i++){
                that.lines.push({'line': [that.points[i].center[0] + "," + that.points[i].center[1], that.points[i + 1].center[0] + "," +that.points[i + 1].center[1]]});
              }
              that.layer_line.setData(that.lines, {
                lnglat: 'line'
              });
              that.layer_line.render();
            }
          }
          if(that.op_type == 1){
            if(that.map.lngLatToContainer(rawData.center).y > 50 && that.map.lngLatToContainer(rawData.center).x > 100){
              that.stations.push(rawData);
            }
            that.layer_station.setData(that.stations, {
              type: 'json',
              lnglat: 'center'
            });
            that.layer_station.render();
            var pixel = that.map.lngLatToContainer(new AMap.LngLat(rawData.center[0], rawData.center[1]));
            console.log(pixel);
            if(pixel.x > 160){
              document.getElementById("station_panel").style.display = 'block';
              document.getElementById("station_panel").style.top = (pixel.y - 100) + 'px';
              document.getElementById("station_panel").style.left = (pixel.x - 160) + 'px';
              that.cur_lng = rawData.center[0];
              that.cur_lat = rawData.center[1];
              that.fillInput();
            }
          }
        });
        that.layer_base.render();
      },
      hideStationInput(){
        document.getElementById("station_panel").style.display = 'none';
      },
      drawLine(){
        var that = this;
        if(that.op_type == 0){
          that.hideStationInput();
          return;
        }
        else{
          that.hideStationInput();
        }
        that.op_type = 0;
      },
      drawCircle(){
        var that = this;
        if(that.op_type == 0){
          that.hideStationInput();
        }
        else if(that.op_type == 1){
          return;
        }
        else if(that.op_type == 2){
          that.hideStationInput();
        }
        else{
          that.hideStationInput();
        }
        that.op_type = 1;
      },
      saveLine(){
        var that = this;
        //save line name, line direction and latitude of line
        if(that.edit_op){
          that.line_name_store = that.line_name;
          that.line_direction_store = that.line_direction;
          that.line_name = '';
          that.line_direction = '';
          that.edit_op = false;
          that.hideStationInput();
          that.layer_base.destroy();
          that.straight = '1.2';
          that.line_distance = '13.4km';
          that.speed = '14km/h';
          that.convenience = '0.6';
          that.distribution = '62%';

        }
        if(that.modify_op){
          that.modify_op = false;
          that.hideStationInput();
          that.layer_base.destroy();
          that.straight = '1.2';
          that.line_distance = '13.4km';
          that.speed = '14km/h';
          that.convenience = '0.6';
          that.distribution = '62%';
        }
        that.op_type = -1;
      },
      viewMap(){
        var that = this;
        if(that.edit_op || that.modify_op){
          that.edit_op = false;
          that.modify_op = false;
          that.hideStationInput();
        }
        that.layer_base.destroy();
        that.op_type = 2;
      },
      editMap(){
        var that = this;
        that.modify_op = true;
        that.drawHexagon();
        that.op_type = 3;
      }
    }
  }
</script>

<style scoped>
.white{
  color: #fff;
}
.op_panel{
  width: 420px;
  height: 160px;
  position: absolute;
  top: 50px;
  right: 50px;
  z-index: 100;
}
.op_bar{
  width: 400px;
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #1B7189;
  line-height: 40px;
  font-size: 80%;
  padding: 0 10px;
}
.op_title{
  float: left;
  margin-left: 10px;
}
.op_button{
  height: 20px;
  width: 50px;
  padding: 1px 10px;
  line-height: 20px;
  background-color: #17627C;
  border-radius: 2px;
}
.op_button_disable{
  cursor: not-allowed;;
}
.op_button_inactive{
  color: #1E2C43;
  border: 1px #1E2C43 solid;
}
.op_button_active{
  color: #21CEFA;
  border: 1px #21CEFA solid;
  cursor: pointer;
}
.create{
  position: absolute;
  top: 6px;
  right: 90px;
}
.new{
  position: absolute;
  top: 6px;
  right: 170px;
}
.add{
  position: absolute;
  top: 6px;
  right: 10px;
}
.op_content{
  width: 400px;
  height: 100px;
  position: absolute;
  top: 40px;
  left: 0;
  background-color: rgba(21, 59, 78, 0.7);
  padding: 10px;
  font-size: 80%;
}
.op_bgc{
  width: 46px;
  height: 46px;
  padding: 5px;
  background-color: rgba(20, 71, 94, 0.5);
  cursor: pointer;
  border: 1px #1E2C43 solid;
  border-radius: 4px;
}
.op_bgc_selected{
  width: 46px;
  height: 46px;
  padding: 5px;
  background-color: rgba(37, 114, 158, 0.5);
  border: 1px #21CEFA solid;
  border-radius: 4px;
}
.op_icon{
  width: 46px;
  height: 46px;
}
.op_station{
  display: none;
  width: 160px;
  height: 70px;
  position: absolute;
  top: 20px;
  left: 40px;
  background-color: rgba(21, 59, 78, 0.7);
  z-index: 300;
}
.edit_title{
  width: 140px;
  height: 30px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #1B7189;
  line-height: 30px;
  font-size: 60%;
  padding: 0 10px;
}
.title_name{
  float: left;
}
.station_input{
  position: absolute;
  left: 10px;
  bottom: 10px;
  width: 140px;
}
.effect_panel{
  position: absolute;
  top: 260px;
  right: 50px;
  width: 300px;
  height: 200px;
  z-index: 100;
}
.form{
  position: absolute;
  top: 36px;
  left: 0;
  width: 260px;
  font-size: 80%;
}
.odd, .even{
  width: 100%;
  padding: 5px 20px;
}
.odd{
  background-color: rgba(8, 63, 82, 0.7);
}
.even{
  background-color: rgba(12, 54, 73, 0.7);
}
.left{
  display: inline-block;
  width: 50%;
  text-align: left;
}
.right{
  display: inline-block;
  width: 50%;
  text-align: right;
}
.label{
  color: #fff;
  font-size: 80%;
}
.effect_title{
  width: 280px;
  padding: 0 10px;
  height: 36px;
  position: absolute;
  top: 0;
  left: 0;
  float: left;
  line-height: 36px;
  background-color: #1B7189;
  font-size: 80%;
}
.line{
  background: url('../../../static/icon/line.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
 }
.line_active{
  background: url('../../../static/icon/line_active.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.line_disable{
  background: url('../../../static/icon/line_disable.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.circle{
  background: url('../../../static/icon/circle.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.circle_active{
  background: url('../../../static/icon/circle_active.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.circle_disable{
  background: url('../../../static/icon/circle_disable.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.move{
  background: url('../../../static/icon/move.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.move_active{
  background: url('../../../static/icon/move_active.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.move_disable{
  background: url('../../../static/icon/move_disable.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.edit{
  background: url('../../../static/icon/edit.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.edit_active{
  background: url('../../../static/icon/edit_active.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.edit_disable{
  background: url('../../../static/icon/edit_disable.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.shrink{
  background: url('../../../static/icon/shrink.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.shrink_active{
  background: url('../../../static/icon/shrink_active.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.shrink_disable{
  background: url('../../../static/icon/shrink_disable.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.magnify{
  background: url('../../../static/icon/magnify.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.magnify_active{
  background: url('../../../static/icon/magnify_active.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.magnify_disable{
  background: url('../../../static/icon/magnify_disable.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
