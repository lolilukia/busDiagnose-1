<style>
  .el-table{
    border: none;
    background-color: #0d3e53;
  }
  .el-table td, .el-table th.is-leaf {
    border: none;
  }
  .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: transparent;
  }
  .el-table__row td{
    background-color: #0c485d !important;
    font-size: 6px;
    color: #fff;
    border: none;
    padding: 2px 5px;
    text-align: left;
  }
  .el-table__row--striped td{
    background-color: #0d3e53 !important;
  }
  .el-table .cell {
    white-space: nowrap;
  }
  .el-pagination{
    background-color: #094B65;
    text-align: left;
  }
  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
    background-color: #08465C;
    width: 15px;
    color: #072f41;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #05465A;
    color: #fff;
  }
  .header th{
    background: #0d3e53 !important;
    font-size: 8px;
    border: none;
    color: #fff;
    font-weight: 400;
    padding: 5px;
  }
  .subheader th{
    background-color: #0e5f7c !important;
    font-size: 8px;
    border: none;
    color: #fff;
    font-weight: 400;
    padding: 0 5px;
  }
  .el-pager li{
    background-color: #0A455A;
  }
  .el-pager li.active{
    color: #fff;
  }
  .el-pagination button:disabled {
    background-color: #0A455A;
    cursor: not-allowed;
  }
  .el-pagination--small .btn-next, .el-pagination--small .btn-prev, .el-pagination--small .el-pager li, .el-pagination--small .el-pager li.btn-quicknext, .el-pagination--small .el-pager li.btn-quickprev, .el-pagination--small .el-pager li:last-child {
    background-color: #0A455A;
  }
  .el-input__inner{
    height: 20px;
    width: 100%;
    margin-top: 8px;
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
      <div class="bottom_bar">
        <div class="left"></div>
        <div class="right"></div>
        <div class="road switch" v-on:click="selectLayer(0)"><img class="icon_img" v-bind:src="button_index == 0 ? road_click_url: road_url"><p v-bind:class="button_index == 0 ? 'button click': 'button normal'">线路</p></div>
        <div class="station switch" v-on:click="selectLayer(1)"><img class="icon_img" v-bind:src="button_index == 1 ? station_click_url: station_url"><p v-bind:class="button_index == 1 ? 'button click': 'button normal'">站点</p></div>
        <div class="state switch" v-on:click="selectLayer(2)"><img class="icon_img" v-bind:src="button_index == 2 ? state_click_url: state_url"><p v-bind:class="button_index == 2 ? 'button click': 'button normal'">路况</p></div>
        <div class="vehicle switch" v-on:click="selectLayer(3)"><img class="icon_img" v-bind:src="button_index == 3 ? vehicle_click_url: vehicle_url"><p v-bind:class="button_index == 3 ? 'button click': 'button normal'">车辆</p></div>
      </div>
      <div class="search_bar">
        <el-row>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div class="label">目标线路</div>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <el-input class="input" v-model="target" clearable>
            </el-input></el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div class="label">分析日期</div>
          </el-col>
          <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <div style="overflow: hidden;">
              <el-date-picker
                v-model="date_start"
                type="date"
                placeholder="开始日期"
                :picker-options="pickerOptions0">
              </el-date-picker>
            </div>
          </el-col>
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <div class="label">-</div>
          </el-col>
          <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <div style="overflow: hidden;">
              <el-date-picker
                v-model="date_end"
                type="date"
                placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"><div class="label">分析时段</div></el-col>
          <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5"><el-input class="input" v-model="time_start"></el-input></el-col>
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"><div class="label">-</div></el-col>
          <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5"><el-input class="input" v-model="time_end"></el-input></el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"><span class="search" v-on:click="searchDispatch"><i class="el-icon-search"></i></span></el-col>
          <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5"><div class="label"></div></el-col>
        </el-row>
      </div>
      <div class="result_table">
        <el-table
          :data="resultData"
          stripe
          style="width: 480px; height: 216px"
          :header-row-class-name="getHeader"
          empty-text="数据读取中">
          <el-table-column label="搜索结果">
            <el-table-column
              prop="time"
              label="时间"
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="线路名称"
              width="80">
            </el-table-column>
            <el-table-column
              prop="company"
              label="公司"
              width="60">
            </el-table-column>
            <el-table-column
              prop="direction"
              label="方向"
              width="60">
            </el-table-column>
            <el-table-column
              prop="load"
              label="客流情况">
            </el-table-column>
            <el-table-column
              prop="across"
              label="跨线运营">
            </el-table-column>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          @current-change="dispatchCurrentChange"
          :current-page="dispatch_start_index"
          :page-size="6"
          layout="prev, pager, next"
          :total="resultDataRefer.length">
        </el-pagination>
      </div>
      <div class="assign_table">
        <el-table
          :data="assignData"
          stripe
          style="width: 480px; height: 216px"
          :header-row-class-name="getHeader"
          empty-text="数据读取中">
          <el-table-column label="可供调用线路">
            <el-table-column
              prop="time"
              label="时间"
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="线路名称"
              width="80">
            </el-table-column>
            <el-table-column
              prop="company"
              label="公司"
              width="60">
            </el-table-column>
            <el-table-column
              prop="direction"
              label="方向"
              width="60">
            </el-table-column>
            <el-table-column
              prop="load"
              label="客流情况">
            </el-table-column>
            <el-table-column
              prop="scheme"
              label="方案">
              <template slot-scope="scope">
                <a v-on:click="selectScheme(scope.row)">{{ scope.row.scheme }}</a>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          @current-change="assignCurrentChange"
          :current-page="assign_start_index"
          :page-size="6"
          layout="prev, pager, next"
          :total="assignDataRefer.length">
        </el-pagination>
      </div>
      <div class="panel" v-if="scheme_index != -1">
        <div class="panel_title"><span class="panel_label">调度方案</span></div>
        <div class="panel_content">
          <span class="panel_label">线路：<span class="panel_data">{{target}}</span></span><br>
          <span class="panel_label">方向：<span class="panel_data">{{target_direction}}</span></span><br>
          <span class="panel_label">时间：<span class="panel_data">{{time_start + '-' + time_end}}</span></span><br>
          <span class="panel_label">跨线运营方案： 调用<span class="panel_data">{{dispatch_line}}{{dispatch_direction}}</span>方向机动车，从<span class="panel_data">{{from_station}}</span>跨出，行驶<span class="panel_data">{{line_distance}}</span>公里，于<span class="panel_data">{{to_station}}</span>跨入<span class="panel_data">{{target}}</span>参与<span class="panel_data">{{target_direction}}</span>方向运营。</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import data from '../data3';
  import array from '../data2';
  import navBar from '../../components/navBar/navBar.vue';
  export default {
    name: "dispatch",
    components: {
      navBar: navBar
    },
    data(){
      let that = this;
      return{
        map: null,
        target: '23路',
        date_start: '2018/6/27',
        date_end: '2018/6/27',
        time_start: '6:00',
        time_end: '20:00',
        button_index: 0,
        pre_index: 0,
        road_url: 'static/icon/road.png',
        station_url: 'static/icon/station.png',
        state_url: 'static/icon/state.png',
        vehicle_url: 'static/icon/vehicle.png',
        road_click_url: 'static/icon/road_click.png',
        station_click_url: 'static/icon/station_click.png',
        state_click_url: 'static/icon/state_click.png',
        vehicle_click_url: 'static/icon/vehicle_click.png',
        trafficLayer: null,
        lineArray: [],
        stationArray: [],
        vehicleArray: [],
        linea_start: null,
        lineb_start: null,
        resultDataRefer: data.dispatch_result_data,
        resultData: data.dispatch_result_data.slice(0, 6),
        assignDataRefer: data.dispatch_available,
        assignData: data.dispatch_available.slice(0, 6),
        dispatch_start_index: 0,
        assign_start_index: 0,
        line_colors: ['#CCCCFF','#FFFF00','#00FFFF','#3399FF','#33FF00','#663399','#663300','#FF3366',
          '#990033','#6699CC','#FF6600','#003333','#999900','#999999','#FFCCCC'],
        scheme_index: -1,
        driving: null,
        cluster: null,
        dispatch_line: '',
        dispatch_direction: '上行',
        from_station: '',
        to_station: '',
        line_distance: -1,
        target_direction: '上行',
        pickerOptions0: {
          disabledDate(time){
            return time.getTime() > Date.now() - 8.64e7;
          }
        },
        pickerOptions: {
          disabledDate(time){
            return ((time.getTime() > Date.now() - 8.64e7) || (time.getTime() < new Date(that.date_start).getTime()));
          }
        },
      };
    },
    mounted(){
      var that = this;
      var height = window.screen.availHeight - 46;
      document.getElementById("container").style.height = window.screen.availHeight + 'px';
      that.map = new AMap.Map('container',{
        center: [121.56, 29.86],
        zoom: 13, //设置地图的缩放级别
      });
      that.map.setMapStyle('amap://styles/dark');
    },
    methods: {
      getHeader({ row, rowIndex }) {
        if (rowIndex == 0) {
          return 'header'
        }
        else {
          return 'subheader'
        }
      },
      dispatchCurrentChange:function(val){
        this.dispatch_start_index = val;
        this.resultData = this.resultDataRefer.slice((this.dispatch_start_index-1) * 6, this.dispatch_start_index * 6);
      },
      assignCurrentChange:function(val){
        this.assign_start_index = val;
        this.assignData = this.assignDataRefer.slice((this.assign_start_index-1) * 6, this.assign_start_index * 6);
      },
      clearAll(){
        for(var i = 0; i < this.lineArray.length; i++){
          this.map.remove(this.lineArray[i]);
        }
        this.lineArray = [];
        if(this.cluster != null){
          this.cluster.clearMarkers();
          this.cluster.setMap(null);
          this.cluster = null;
        }
        if(this.trafficLayer != null){
          this.trafficLayer.hide();
        }
        this.stationArray = [];
        this.vehicleArray = [];
      },
      selectLayer(index){
        if(this.button_index == index) return;
        else{
          this.pre_index = this.button_index;
          this.button_index = index;
          if(index == 0){
            this.clearAll();
            this.lineSearch(this.target, 0);
            if(this.scheme_index != -1){
              this.lineSearch(this.assignData[this.scheme_index].name, this.assignData[this.scheme_index].direction == '上行'? 0: 1);
            }
          }
          else if(index == 1){
            this.clearAll();
            this.stationSearch(this.target, 0);
            if(this.scheme_index != -1){
              this.stationSearch(this.assignData[this.scheme_index].name, this.assignData[this.scheme_index].direction == '上行'? 0: 1);
            }
          }
          else if(index == 2){
            this.clearAll();
            this.roadStatus();
          }
          else{
            this.clearAll();
            this.vehicleSearch(this.target, 0);
          }
        }
      },
      selectScheme(row){
        if(this.driving != null){
          this.driving.clear();
          this.map.remove(this.lineArray[this.lineArray.length-1]);
        }
        var scheme_index = this.assignDataRefer.indexOf(row);
        if(scheme_index != -1){
          this.scheme_index = scheme_index;
          this.dispatch_line = row.name;
          this.dispatch_direction = row.direction;
          this.target_direction = data.dispatch_from_to[data.dispatch_index.indexOf(this.target)][this.scheme_index][2];
          this.from_station = data.dispatch_from_to[data.dispatch_index.indexOf(this.target)][this.scheme_index][0];
          this.to_station = data.dispatch_from_to[data.dispatch_index.indexOf(this.target)][this.scheme_index][1];
          if(this.target_direction == '下行'){
            for(var i = 0; i < this.lineArray.length; i++){
              this.map.remove(this.lineArray[i]);
            }
            this.lineArray = [];
            this.lineSearch(this.target, 1);
          }
          this.lineSearch(row.name, row.direction == '上行'? 0:1);
          this.drivingScheme(data.dispatch_scheme[data.dispatch_index.indexOf(this.target)][this.scheme_index]);
        }
      },
      searchDispatch(){
        this.clearAll();
        if(this.driving != null){
          this.driving.clear();
        }
        var line_index = data.dispatch_index.indexOf(this.target);
        this.resultDataRefer = [];
        if(line_index != -1){
          for(var i = 0; i < data.dispatch_result_data.length; i++){
            if(data.dispatch_result_data[i].name == this.target){
              if(parseInt(data.dispatch_result_data[i].time.split(" ")[1].split(":")[0]) >= parseInt(this.time_start.split(":")[0])){
                if(parseInt(data.dispatch_result_data[i].time.split(" ")[1].split(":")[0]) <= parseInt(this.time_end.split(":")[0])){
                  this.resultDataRefer.push(data.dispatch_result_data[i]);
                }
              }
            }
          }
          this.resultData = this.resultDataRefer.slice(0, 6);
          this.assignDataRefer = [];
          var range = data.avail_index[line_index];
          for(var i = range[0]; i <range[1]; i++){
            this.assignDataRefer.push(data.dispatch_available[i]);
          }
          this.assignData = this.assignDataRefer.slice(0, 6);
          this.lineSearch(this.target, 0);
        }
        this.scheme_index = -1;
      },
      lineSearch(road_name, dir) {
        var that = this;
        var index = array.line_path_index.indexOf(road_name);
        console.log(index%15);
        if(index != -1){
          var pos = array.bus_line_pos[index][dir];
          var busPath = new AMap.Polyline({
            path: pos,
            strokeColor: that.line_colors[index%15],
            strokeOpacity: 1,
            strokeWeight: 6
          });
          that.lineArray.push(busPath);
          that.map.add(busPath);
        }
      },
      drivingScheme(lng_array){
        var that = this;
        that.driving = new AMap.Driving({
          policy: AMap.DrivingPolicy.LEAST_TIME,
          map: that.map,
          autoFitView: true
        });
        that.driving.search(new AMap.LngLat(lng_array[0], lng_array[1]), new AMap.LngLat(lng_array[2], lng_array[3]), function (status, result) {
          that.line_distance = result.routes[0].distance/1000;
        });
      },
      stationSearch(road_name, dir){
        var that = this;
        var current = 0;
        var index = array.line_path_index.indexOf(road_name);
        if(that.stationArray.length != 0){
          current = 1;
        }
        if(index != -1){
          var pos = array.bus_line_pos[index][dir];
          for(var j = 0; j < pos.length; j++){
            var marker = new AMap.Marker({
              position: pos[j],
              icon: new AMap.Icon({
                size: new AMap.Size(30, 30),
                image: 'static/icon/station_icon.png'
              })
            });
            that.stationArray.push(marker);
          }
          if(current == 1){
            that.cluster.setMarkers(that.stationArray);
          }
          else{
            that.cluster = new AMap.MarkerClusterer(
              that.map,
              that.stationArray
            );
          }
        }
      },
      roadStatus(){
        if(this.trafficLayer == null){
          this.trafficLayer = new AMap.TileLayer.Traffic({zIndex:10});
          this.trafficLayer.setMap(this.map);
        }
        else{
          this.trafficLayer.show();
        }
      },
      vehicleSearch(road_name, dir){
        var that = this;
        for(var i = 0; i < array.vehicle_line_index.length; i++) {
          var pos = array.vehicle_lnglat[i];
          for(var j = 0; j < pos.length; j++){
            var marker = new AMap.Marker({
              position: pos[j],
              icon: new AMap.Icon({
                size: new AMap.Size(30, 30),
                image: 'static/icon/vehicle_icon.png'
              })
            });
            that.vehicleArray.push(marker);
          }
        }
        that.cluster = new AMap.MarkerClusterer(
          that.map,
          that.vehicleArray
        );
      }
    }
  }
</script>

<style scoped>
@import 'https://js.arcgis.com/4.7/esri/css/main.css';
#container {
  width: 100%;
  height: 750px;
}
.bottom_bar{
  z-index: 15;
  position: absolute;
  bottom: 0;
  left: 30%;
  width: 40%;
  height: 40px;
  background-color: rgba(20, 108, 151, 0.7);
}
.left{
  z-index: 15;
  position: absolute;
  bottom: 0;
  left: -80px;
  border-bottom: 40px solid rgba(20, 108, 151, 0.7);
  border-left: 80px solid transparent;
}
.right{
  z-index: 15;
  position: absolute;
  bottom: 0;
  right: -80px;
  border-bottom: 40px solid rgba(20, 108, 151, 0.7);
  border-right: 80px solid transparent;
}
.switch{
  width: 65px;
  height: 45px;
  background-color: #2B88B8;
}
.road{
  position: absolute;
  bottom: 20px;
  left: 15%;
}
.station{
  position: absolute;
  bottom: 20px;
  left: 35%;
}
.state{
  position: absolute;
  bottom: 20px;
  left: 55%;
}
.vehicle{
  position: absolute;
  bottom: 20px;
  left: 75%;
}
.icon_img{
  margin-top: 5px;
  height: 20px;
}
.button{
  font-size: 60%;
  margin-top: -6px;
}
.normal{
  color: #000;
}
.click{
  color: #fff;
}
.search_bar{
  width: 480px;
  height: 80px;
  position: absolute;
  top: 30px;
  right: 10px;
  z-index: 100;
  background:rgba(18,113,139,0.7);
}
.label{
  color: #fff;
  font-size: 80%;
  line-height: 36px;
}
.search{
  background: #205f9d;
  height: 20px;
  padding: 0 8px;
  color: #fff;
  line-height: 36px;
  cursor: pointer;
}
.result_table{
  z-index: 15;
  position: absolute;
  top: 110px;
  right: 10px;
  opacity: 0.8;
}
.assign_table{
  z-index: 15;
  position: absolute;
  top: 386px;
  right: 10px;
  opacity: 0.8;
}
.panel{
  width: 480px;
  height: 120px;
  position: absolute;
  bottom: 100px;
  left: 10px;
  opacity: 0.8;
  z-index: 15;
}
.panel_title{
  width: 470px;
  height: 30px;
  padding-left: 10px;
  line-height: 30px;
  position: absolute;
  top: 0;
  left: 0;
  background: rgb(14, 95, 124);
  color: #fff;
  font-size: 60%;
  text-align: left;
}
.panel_content{
  width: 460px;
  height: 90px;
  padding: 10px;
  position: absolute;
  top: 30px;
  left: 0;
  background: rgb(13, 62, 83);
  color: #fff;
  font-size: 60%;
  text-align: left;
}
.panel_label{
  width: 100%;
}
.panel_data{
  color: #319BD6;
}
</style>
