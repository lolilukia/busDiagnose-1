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
  .el-tag {
    padding: 0 2px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #fff;
    border-radius: 0;
  }
  .el-tag--info {
    background-color: #082b3e;
    border-color: #082b3e;
  }
  .el-tag--success {
    background-color: #027BAB;
    border-color: #027BAB;
  }
  .el-tag--danger {
    background-color: #BA2510;
    border-color: #BA2510;
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
  .amap-container {
    cursor: default !important;
  }
  .amap-labels{
    cursor: default !important;
  }
  .el-message{
    top: 70px;
  }
</style>
<template>
  <div>
    <navBar></navBar>
    <div id="container">
      <div class="bottom_bar">
        <div class="left"></div>
        <div class="right"></div>
        <div class="road switch" v-on:click="selectLayer(0)"><img class="icon_img" v-bind:src="road_switch ? road_click_url: road_url"><p v-bind:class="road_switch ? 'button click': 'button normal'">线路</p></div>
        <div class="station switch" v-on:click="selectLayer(1)"><img class="icon_img" v-bind:src="station_switch ? station_click_url: station_url"><p v-bind:class="station_switch ? 'button click': 'button normal'">站点</p></div>
        <div class="state switch" v-on:click="selectLayer(2)"><img class="icon_img" v-bind:src="status_switch ? state_click_url: state_url"><p v-bind:class="status_switch ? 'button click': 'button normal'">路况</p></div>
        <div class="vehicle switch" v-on:click="selectLayer(3)"><img class="icon_img" v-bind:src="vehicle_switch ? vehicle_click_url: vehicle_url"><p v-bind:class="vehicle_switch ? 'button click': 'button normal'">车辆</p></div>
      </div>
      <div class="road_table">
        <div class="data_filter">
          <el-popover
            placement="bottom"
            width="30"
            trigger="click">
            <p class="filter_title">线路名称</p>
            <input @keyup.enter="searchBusLine" v-model="road_name" class="filter_input">
            <span class="confirm" v-on:click="searchBusLine">确定</span>
            <span class="clear" v-on:click="clearLineInput">重置</span>
            <el-button slot="reference" class="filter_button">aaa</el-button>
          </el-popover>
        </div>
        <el-table
          :data="roadData"
          stripe
          style="width: 400px; height: 172px"
          :header-row-class-name="getHeader"
          @header-click="searchLine"
          @sort-change="sortRoadChange"
          empty-text="数据读取中">
          <el-table-column
            prop="name"
            label="线路名称">
          </el-table-column>
          <el-table-column
            prop="company"
            label="公司"
            width="80">
          </el-table-column>
          <el-table-column
            prop="direction"
            label="方向"
            width="60">
          </el-table-column>
          <el-table-column
            prop="history"
            label="历史准点率"
            width="100"
            sortable="custom">
          </el-table-column>
          <el-table-column
            prop="on_time"
            label="准点率"
            sortable="custom">
          </el-table-column>
        </el-table>
        <el-pagination
          small
          @current-change="roadCurrentChange"
          :current-page="road_start_index"
          :page-size="5"
          layout="prev, pager, next"
          :total="roadDataRefer.length">
        </el-pagination>
      </div>
      <div class="vehicle_table">
        <div class="data_filter">
          <el-popover
            placement="bottom"
            width="30"
            trigger="click">
            <p class="filter_title">车牌号</p>
            <input @keyup.enter="searchVehicle" v-model="vehicle_num" class="filter_input">
            <span class="confirm" v-on:click="searchVehicle">确定</span>
            <span class="clear" v-on:click="clearVehicleInput">重置</span>
            <el-button slot="reference" class="filter_button">aaa</el-button>
          </el-popover>
        </div>
        <el-table
          :data="vehicleData"
          stripe
          style="width: 492px; height: 174px"
          :header-row-class-name="getHeader"
          @sort-change="sortVehicleChange"
          empty-text="数据读取中">
          <el-table-column
            prop="license_num"
            label="车牌号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="line_name"
            label="所在线路"
            width="80">
          </el-table-column>
          <el-table-column
            prop="road_name"
            label="路段名称"
            width="78"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="speed_range"
            label="合理速度区间"
            width="108">
          </el-table-column>
          <el-table-column
            prop="current_speed"
            label="当前速度"
            width="86"
            sortable="custom">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="60">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status == '正常' ? 'info' : scope.row.status == '异常低速' ? 'success' : 'danger'"
                disable-transitions>{{scope.row.status == '正常' ? scope.row.status : scope.row.status.substring(2, 4)}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          @current-change="vehicleCurrentChange"
          :current-page="vehicle_start_index"
          :page-size="5"
          layout="prev, pager, next"
          :total="84">
        </el-pagination>
      </div>
      <div class="result_table">
        <div class="data_filter">
          <el-popover
            placement="bottom"
            width="30"
            trigger="click">
            <p class="filter_title">站点名称</p>
            <input @keyup.enter="searchResult" v-model="station_name" class="filter_input">
            <span class="confirm" v-on:click="searchResult">确定</span>
            <span class="clear" v-on:click="clearStationInput">重置</span>
            <el-button slot="reference" class="filter_button">aaa</el-button>
          </el-popover>
        </div>
        <el-table
          :data="resultData"
          stripe
          style="width: 400px; height: 168px"
          :header-row-class-name="getHeader"
          empty-text="数据读取中">
          <el-table-column
            prop="station_name"
            label="站点名称"
            width="80"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="flow"
            label="客流负荷"
            width="80">
          </el-table-column>
          <el-table-column
            prop="lines"
            label="途径站点线路"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          @current-change="resultCurrentChange"
          :current-page="result_start_index"
          :page-size="10"
          layout="prev, pager, next"
          :total="resultDataRefer.length">
        </el-pagination>
      </div>
      <div class="stops" id="stops">
        <div v-bind:class="{'direction up dir_active': upClick, 'direction up dir_inactive': !upClick}" v-on:click="clickUp">上行</div>
        <div v-bind:class="{'direction down dir_active': !upClick, 'direction down dir_inactive': upClick}" v-on:click="clickDown">下行</div>
        <div class="stations start" id="start_station"></div>
        <div class="stations end" id="end_station"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import navBar from '../../components/navBar/navBar.vue';
  import { Message } from 'element-ui';
  export default {
    name: "common",
    components: {
      navBar: navBar
    },
    data(){
      return{
        map: null,
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
        datetime: '2017/5/21',
        roadDataRefer: [],
        roadData: [],
        vehicleDataRefer: [],
        vehicleData: [],
        resultDataRefer: [],
        resultData: [],
        road_start_index: 0,
        vehicle_start_index: 0,
        result_start_index: 0,
        upClick: true,
        via_stops: [],
        current_line: 0,
        line_colors: ['#CCCCFF','#FFFF00','#FF99FF','#3399FF','#33FF00','#663399','#663300','#FF3366',
        '#990033','#6699CC','#FF6600','#003333','#999900','#999999','#FFCCCC'],
        station_cluster: null,
        vehicle_cluster: null,
        filter: false,
        road_name: '',
        station_name: '',
        vehicle_license: '',
        road_switch: true,
        station_switch: true,
        status_switch: true,
        vehicle_switch: true,
        pre_line: null,
        line_option: [],
        vehicle_num: '',
        message : ['547路浙B33152当前速度68km/h，异常高速', '37路浙B53338当前速度64km/h，异常高速', '857路浙B53689当前速度8km/h，异常低速',
          '801路浙B30039当前速度5km/h，异常低速', '541路浙B30815当前速度2km/h，异常低速', '341路浙B52928当前速度4km/h，异常低速',
          '82路浙B53369大间隔预警，计划运行5分，实际运行25分', '857路浙B53689发生串车'],
        type : [0, 0, 0, 0, 0, 0, 1, 2],
        isDestroyed: false,
        messageInterval: null,
        intervals: [],
        mapTimer: null,
        dateTime: null
      };
    },
    beforeDestroy(){
      this.isDestroyed = true;
      clearInterval(this.mapTimer);
      clearInterval(this.messageInterval);
      for(var each in this.intervals){
        clearTimeout(each);
      }
    },
    mounted(){
      var that = this;
      this.messageInterval = setInterval(this.showMessage, 30000);
      var height = window.screen.availHeight - 46;
      that.map = new AMap.Map('container',{
        center: [121.56, 29.86],
        zoom: 13
      });
      that.map.setMapStyle('amap://styles/dark');
      document.getElementById("container").style.height = height + 'px';
      that.dateTime = 1452046547;
      that.lineMapData(that.dateTime);
      that.mapTimer = setInterval(function(){
        that.dateTime += 60;
        that.clearAll();
        that.lineMapData();
      }, 60000);
    },
    methods:{
      lineMapData(){
        var that = this;
        that.$http.get('http://47.98.199.36:9001/api/buslines/info?date_time=' + that.dateTime).then(function(ret){
          that.roadDataRefer = ret.data;
          that.roadData = ret.data.slice(0, 5);
          that.lineSearch();
          that.showStations(that.roadData[0].name, 0);
        });
        that.$http.get('http://47.98.199.36:9001/api/stations/info?date_time=' + that.dateTime).then(function(ret){
          that.resultDataRefer = ret.data;
          that.resultData = ret.data.slice(0, 5);
          that.stationSearch();
        });
        that.$http.get('http://47.98.199.36:9001/api/vehicles/info?date_time=' + that.dateTime).then(function(ret){
          that.vehicleDataRefer = ret.data;
          that.vehicleData = ret.data.slice(0, 5);
          that.vehicleSearch();
        });
        that.roadStatus();
      },
      showMessage(){
        var that = this;
        var f = function(i){
          var inter = setTimeout(function(){
            if (that.type[i] == 0) {
              that.showNormal(that.message[i]);
            }
            else if (that.type[i] == 1) {
              that.showWarning(that.message[i]);
            }
            else{
              that.showError(that.message[i]);
            }
          }, 5000*i);
          that.intervals.push(inter);
        };
        if(this.isDestroyed != true){
          for (var i = 0; i < that.message.length; i++) {
            f(i);
          }
        }
        Message.closeAll();
      },
      showNormal(mes){
        Message({message: mes, duration: 3000});
      },
      showWarning(mes){
        Message({
          message: mes,
          type: 'warning'
        });
      },
      showError(mes){
        Message.error(mes);
      },
      getHeader({ row, rowIndex }) {
        if (rowIndex == 0) {
          return 'header'
        }
        else {
          return 'subheader'
        }
      },
      sortRoadChange: function(column, prop, order){
        var that = this;
        function down(x, y){
          return (x[column.prop] < y[column.prop]) ? 1 : -1;
        }
        function up(x, y){
          return (x[column.prop] > y[column.prop]) ? 1 : -1;
        }
        if(column.order == 'ascending'){
          that.roadDataRefer.sort(up);
          that.roadData = that.roadDataRefer.slice(0, 5);
        }
        else{
          that.roadDataRefer.sort(down);
          that.roadData = that.roadDataRefer.slice(0, 5);
        }
      },
      sortVehicleChange: function(column, prop, order){
        var that = this;
        function down(x, y){
          return (x[column.prop] < y[column.prop]) ? 1 : -1;
        }
        function up(x, y){
          return (x[column.prop] > y[column.prop]) ? 1 : -1;
        }
        if(column.order == 'ascending'){
          that.vehicleDataRefer.sort(up);
          that.vehicleData = that.vehicleDataRefer.slice(0, 5);
        }
        else{
          that.vehicleDataRefer.sort(down);
          that.vehicleData = that.vehicleDataRefer.slice(0, 5);
        }
      },
      searchLine(column, event){
        if(column.label == '线路名称'){
          this.filter = true;
        }
      },
      searchVehicle(){
        var that = this;
        that.filter = false;
        that.clearAll();
        this.$http.get('http://47.98.199.36:9001/api/vehicle/buslines?license_num='+ that.vehicle_num + '&date_time=' + that.dateTime).then(function(ret){
          that.roadDataRefer = ret.data;
          that.roadData = ret.data.slice(0, 5);
          if(that.road_switch){
            that.lineSearch();
          }
          that.showStations(that.roadDataRefer[0].name, that.upClick ? 0:1);
        });
        that.$http.get('http://47.98.199.36:9001/api/vehicle/stations?license_num='+ that.vehicle_num + '&date_time=' + that.dateTime).then(function(ret){
          that.resultDataRefer = ret.data;
          that.resultData = ret.data.slice(0, 5);
          if(that.station_switch){
            that.stationSearch();
          }
        });
        if(that.status_switch){
          that.roadStatus();
        }
        that.$http.get('http://47.98.199.36:9001/api/vehicle/vehicles?license_num='+ that.vehicle_num + '&date_time=' + that.dateTime).then(function(ret){
          that.vehicleDataRefer = ret.data;
          that.vehicleData = ret.data.slice(0, 5);
          if(that.vehicle_switch){
            that.vehicleSearch();
          }
        });
      },
      searchBusLine(){
        var that = this;
        if(that.road_name.indexOf('路') == -1){
          that.road_name += '路';
        }
        that.filter = false;
        that.clearAll();
        this.$http.get('http://47.98.199.36:9001/api/busline/punctuality_info?line_name='+ that.road_name + '&date_time=' + that.dateTime).then(function(ret){
          that.roadDataRefer = ret.data;
          that.roadData = ret.data.slice(0, 5);
          if(that.road_switch){
            that.lineSearch();
          }
        });
        that.$http.get('http://47.98.199.36:9001/api/busline/via_station?line_name='+ that.road_name + '&date_time=' + that.dateTime).then(function(ret){
          that.resultDataRefer = ret.data;
          that.resultData = ret.data.slice(0, 5);
          if(that.station_switch){
            that.stationSearch();
          }
        });
        if(that.status_switch){
          that.roadStatus();
        }
        that.$http.get('http://47.98.199.36:9001/api/busline/vehicle?line_name='+ that.road_name + '&date_time=' + that.dateTime).then(function(ret){
          that.vehicleDataRefer = ret.data;
          that.vehicleData = ret.data.slice(0, 5);
          if(that.vehicle_switch){
            that.vehicleSearch();
          }
        });
        that.showStations(that.road_name, that.upClick ? 0:1);
      },
      searchResult(){
        var that = this;
        that.filter = false;
        that.clearAll();
        this.$http.get('http://47.98.199.36:9001/api/station/lines?station_name='+ that.station_name + '&date_time=' + that.dateTime).then(function(ret){
          that.roadDataRefer = ret.data;
          that.roadData = ret.data.slice(0, 5);
          if(that.road_switch){
            that.lineSearch();
          }
          that.showStations(that.roadDataRefer[0].name, that.upClick ? 0:1);
        });
        that.$http.get('http://47.98.199.36:9001/api/station/stations?station_name='+ that.station_name + '&date_time=' + that.dateTime).then(function(ret){
          that.resultDataRefer = ret.data;
          that.resultData = ret.data.slice(0, 5);
          if(that.station_switch){
            that.stationSearch();
          }
        });
        if(that.status_switch){
          that.roadStatus();
        }
        that.$http.get('http://47.98.199.36:9001/api/station/vehicle?station_name='+ that.station_name + '&date_time=' + that.dateTime).then(function(ret){
          that.vehicleDataRefer = ret.data;
          that.vehicleData = ret.data.slice(0, 5);
          if(that.vehicle_switch){
            that.vehicleSearch();
          }
        });
      },
      clearLineInput(){
        var that = this;
        this.road_name = '';
        this.filter = false;
        this.clearAll();
        if(this.road_name == '' && this.station_name == '' && this.vehicle_num == ''){
          this.$http.get('http://47.98.199.36:9001/api/buslines/info?date_time=' + that.dateTime).then(function(ret){
            that.roadDataRefer = ret.data;
            that.roadData = ret.data.slice(0, 5);
            if(that.road_switch){
              that.lineSearch();
            }
            that.showStations(that.roadData[0].name, 0);
          });
          this.$http.get('http://47.98.199.36:9001/api/stations/info?date_time=' + that.dateTime).then(function(ret){
            that.resultDataRefer = ret.data;
            that.resultData = ret.data.slice(0, 5);
            if(that.station_switch){
              that.stationSearch();
            }
          });
          this.$http.get('http://47.98.199.36:9001/api/vehicles/info?date_time=' + that.dateTime).then(function(ret){
            that.vehicleDataRefer = ret.data;
            that.vehicleData = ret.data.slice(0, 5);
            if(that.vehicle_switch){
              that.vehicleSearch();
            }
          });
          if(that.status_switch){
            this.roadStatus();
          }
        }
        if(this.road_name != ''){
          this.searchBusLine();
        }
        if(this.station_name != ''){
          this.searchResult();
        }
        if(this.vehicle_num != ''){
          this.searchVehicle();
        }
      },
      clearStationInput(){
        var that = this;
        this.station_name = '';
        this.filter = false;
        this.clearAll();
        if(this.road_name == '' && this.station_name == '' && this.vehicle_num == ''){
          this.$http.get('http://47.98.199.36:9001/api/buslines/info?date_time=' + that.dateTime).then(function(ret){
            that.roadDataRefer = ret.data;
            that.roadData = ret.data.slice(0, 5);
            if(that.road_switch){
              that.lineSearch();
            }
            that.showStations(that.roadData[0].name, 0);
          });
          this.$http.get('http://47.98.199.36:9001/api/stations/info?date_time=' + that.dateTime).then(function(ret){
            that.resultDataRefer = ret.data;
            that.resultData = ret.data.slice(0, 5);
            if(that.station_switch){
              that.stationSearch();
            }
          });
          this.$http.get('http://47.98.199.36:9001/api/vehicles/info?date_time=' + that.dateTime).then(function(ret){
            that.vehicleDataRefer = ret.data;
            that.vehicleData = ret.data.slice(0, 5);
            if(that.vehicle_switch){
              that.vehicleSearch();
            }
          });
          if(that.status_switch){
            this.roadStatus();
          }
        }
        if(this.road_name != ''){
          this.searchBusLine();
        }
        if(this.station_name != ''){
          this.searchResult();
        }
        if(this.vehicle_num != ''){
          this.searchVehicle();
        }
      },
      clearVehicleInput(){
        var that = this;
        this.vehicle_num = '';
        this.filter = false;
        this.clearAll();
        if(this.road_name == '' && this.station_name == '' && this.vehicle_num == ''){
          this.$http.get('http://47.98.199.36:9001/api/buslines/info?date_time=' + that.dateTime).then(function(ret){
            that.roadDataRefer = ret.data;
            that.roadData = ret.data.slice(0, 5);
            if(that.road_switch){
              that.lineSearch();
            }
            that.showStations(that.roadData[0].name, 0);
          });
          this.$http.get('http://47.98.199.36:9001/api/stations/info?date_time=' + that.dateTime).then(function(ret){
            that.resultDataRefer = ret.data;
            that.resultData = ret.data.slice(0, 5);
            if(that.station_switch){
              that.stationSearch();
            }
          });
          this.$http.get('http://47.98.199.36:9001/api/vehicles/info?date_time=' + that.dateTime).then(function(ret){
            that.vehicleDataRefer = ret.data;
            that.vehicleData = ret.data.slice(0, 5);
            if(that.vehicle_switch){
              that.vehicleSearch();
            }
          });
          if(that.status_switch){
            this.roadStatus();
          }
        }
        if(this.road_name != ''){
          this.searchBusLine();
        }
        if(this.station_name != ''){
          this.searchResult();
        }
        if(this.vehicle_num != ''){
          this.searchVehicle();
        }
      },
      roadCurrentChange:function(val){
        this.road_start_index = val;
        this.roadData = this.roadDataRefer.slice((this.road_start_index-1)*5, this.road_start_index*5);
      },
      vehicleCurrentChange:function(val){
        this.vehicle_start_index = val;
        this.vehicleData = this.vehicleDataRefer.slice((this.vehicle_start_index-1)*5, this.vehicle_start_index*5);
      },
      resultCurrentChange:function(val){
        this.result_start_index = val;
        this.resultData = this.resultDataRefer.slice((this.result_start_index-1)*5, this.result_start_index*5);
      },
      clickUp(){
        this.upClick = true;
        if(this.road_name == ''){
          this.showStations(this.roadDataRefer[0].name, 0);
        }
        else{
          this.showStations(this.road_name, 0);
        }
      },
      clickDown(){
        this.upClick = false;
        if(this.road_name == ''){
          this.showStations(this.roadDataRefer[0].name, 1);
        }
        else{
          this.showStations(this.road_name, 1);
        }
      },
      showStations(name, dir){
        var that = this;
        this.$http.get('http://47.98.199.36:9001/api/busline/station?line_name='+ name + '&date_time=' + that.dateTime).then(function(ret){
          var stops_name = ret.data[dir].via_stations;
          var line_status = ret.data[dir].station_condition;
          var vehicle_num = ret.data[dir].veh_num;
          var num = vehicle_num.length;
          var stop_width = 24;
          var stop_contain = document.getElementById("stops");
          var start = document.getElementById("start_station");
          var end = document.getElementById("end_station");
          while(stop_contain.children != null && stop_contain.children.length > 4){
            stop_contain.removeChild(stop_contain.children[4]);
          }
          start.innerHTML = "";
          end.innerHTML = "";
          for(var i = 0; i < num; i++){
            var line = document.createElement("div");
            var space = document.body.clientWidth  * 0.05;
            var gap = document.body.clientWidth - space * 2 - 320;
            var width = (gap - stop_width * num)/num;
            line.style.width = width + 'px';
            line.style.position = 'absolute';
            line.style.height = '5px';
            line.style.top = '55px';
            line.style.left = 214 + i * stop_width + i * width + 'px';
            line.style.backgroundColor = line_status[i] == 0 ? '#AF2811':'#2D80C6';
            /*
            if(Math.abs(line_status[i]) != 1){
              var tag = document.createElement("div");
              tag.style.width = width * 5 + 'px';
              tag.style.position = 'absolute';
              tag.style.height = '20px';
              tag.style.top = '20px';
              tag.style.left = 214 + i * stop_width + i * width + 'px';
              tag.style.backgroundColor = '#AF2811';
              tag.style.color = '#ffffff';
              tag.style.fontSize = '60%';
              tag.style.lineHeight = '20px';
              if(i%2 == 1){
                tag.innerHTML = '高速';
              }
              else{
                tag.innerHTML = '大间隔';
              }
              stop_contain.appendChild(tag);
            }*/
            if(i != num - 1){
              var point = document.createElement("div");
              point.style.width = stop_width - 4 + 'px';
              point.style.zIndex = '15';
              point.style.position = 'absolute';
              point.style.height = stop_width - 4 + 'px';
              point.style.top = '48px';
              point.style.left = 214 + i * stop_width + (i + 1) * width + 'px';
              point.style.backgroundColor = 'transparent';
              point.style.borderRadius = '100px';
              point.style.border = '2px solid #2D80C6';
              point.style.color = '#ffffff';
              point.style.fontSize = '60%';
              point.style.lineHeight = stop_width - 4 + 'px';
              point.innerHTML = vehicle_num[i];
              stop_contain.appendChild(point);
              var station_name = document.createElement("div");
              station_name.style.width = stop_width - 4 + 'px';
              station_name.style.height = 70 + 'px';
              station_name.style.overflow = 'hidden';
              station_name.style.position = 'absolute';
              station_name.style.top = '75px';
              station_name.style.left = 216 + i * stop_width + (i + 1) * width + 'px';
              station_name.style.color = '#ffffff';
              station_name.style.fontSize = '60%';
              station_name.innerHTML = stops_name[i + 1];
              stop_contain.appendChild(station_name);
            }
            stop_contain.appendChild(line);
          }
          start.innerHTML = stops_name[0].length > 4 ? stops_name[0].substring(0,4) + '<br>' + name:stops_name[0] + '<br>' + name;
          end.innerHTML = stops_name[num].length > 4 ? stops_name[num].substring(0,4) + '<br>' + name:stops_name[num] + '<br>' + name;
        });
      },
      selectLayer(index){
        if(index == 0){
          if(this.road_switch){
            this.removeLine();
            this.road_switch = false;
          }
          else{
            this.lineSearch();
            this.road_switch = true;
          }
        }
        else if(index == 1){
          if(this.station_switch){
            this.removeStation();
          }
          else{
            this.stationSearch();
          }
          this.station_switch = !this.station_switch;
        }
        else if(index == 2){
          if(this.status_switch){
            this.removeTraffic();
          }
          else{
            this.roadStatus();
          }
          this.status_switch = !this.status_switch;
        }
        else if(index == 3){
          if(this.vehicle_switch){
            this.removeVehicle();
          }
          else{
            this.vehicleSearch();
          }
          this.vehicle_switch = !this.vehicle_switch;
        }
      },
      clearAll(){
        this.removeLine();
        this.removeStation();
        this.removeTraffic();
        this.removeVehicle();
      },
      removeLine(){
        for(var i = 0; i < this.lineArray.length; i++){
          this.map.remove(this.lineArray[i]);
        }
        this.lineArray = [];
      },
      removeStation(){
        for(var i = 0; i < this.stationArray.length; i++){
          this.map.remove(this.stationArray[i]);
        }
        this.stationArray = [];
        if(this.station_cluster){
          this.station_cluster.setMap(null);
          this.station_cluster = null;
        }
      },
      removeTraffic(){
        if(this.trafficLayer){
          this.trafficLayer.hide();
        }
      },
      removeVehicle(){
        for(var i = 0; i < this.vehicleArray.length; i++){
          this.map.remove(this.vehicleArray[i]);
        }
        this.vehicleArray = [];
        if(this.vehicle_cluster){
          this.vehicle_cluster.setMap(null);
          this.vehicle_cluster = null;
        }
      },
      lineSearch() {
        var that = this;
        that.line_option = [];
        if(that.road_name == '' && that.station_name == '' && that.vehicle_license == ''){
          for(var i = 0; i < that.roadDataRefer.length; i++){
            var pos = [];
            for(var j = 0; j < that.roadDataRefer[i].lats.length; j++){
              pos.push([that.roadDataRefer[i].longs[j], that.roadDataRefer[i].lats[j]]);
            }
            var busOption = {
              path: pos,
              strokeColor: that.line_colors[i],
              strokeOpacity: 1,
              strokeWeight: 2
            };
            var busPath = new AMap.Polyline(busOption);
            busPath.name = that.roadDataRefer[i].name;
            busPath.direction = that.roadDataRefer[i].direction;
            busPath.order = i;
            that.line_option.push(busOption);
            busPath.on("mouseover", function(){
              that.line_option[this.order].strokeWeight = 4;
              this.setOptions(that.line_option[this.order]);
              if(that.pre_line != null){
                var pre_Option = that.pre_line.getOptions();
                pre_Option.strokeWeight = 2;
                that.pre_line.setOptions(pre_Option);
              }
              that.pre_line = this;
            });
            busPath.on("click", function(){
              that.current_line = this.order;
              console.log(this.name+","+this.direction);
              that.showStations(this.name, this.direction == '上行' ? 0:1);
              that.upClick = this.direction == '上行' ? 0:1;
              that.road_name = this.name;
              that.searchBusLine();
            });
            that.lineArray.push(busPath);
            that.map.add(busPath);
          }
        }
        else{
          var latlng = that.roadDataRefer;
          for(var i = 0; i < latlng.length; i++){
            var pos = [];
            for(var j = 0; j < latlng[i].via_stop_lat.length; j++){
              pos.push([latlng[i].via_stop_lng[j], latlng[i].via_stop_lat[j]]);
            }
            var busOption = {
              path: pos,
              strokeColor: that.line_colors[i],
              strokeOpacity: 1,
              strokeWeight: 2
            };
            var f_busPath = new AMap.Polyline(busOption);
            f_busPath.name = latlng[i].name;
            f_busPath.direction = latlng[i].direction;
            f_busPath.order = i;
            that.line_option.push(busOption);
            f_busPath.on("mouseover", function(){
              that.line_option[this.order].strokeWeight = 4;
              this.setOptions(that.line_option[this.order]);
              if(that.pre_line != null){
                var pre_Option = that.pre_line.getOptions();
                pre_Option.strokeWeight = 2;
                that.pre_line.setOptions(pre_Option);
              }
              that.pre_line = this;
            });
            f_busPath.on("click", function(){
              that.current_line = this.order;
              that.showStations(this.name, this.direction == '上行' ? 0:1);
              that.upClick = this.direction == '上行' ? 0:1;
              that.road_name = this.name;
              that.searchBusLine();
            });
            that.lineArray.push(f_busPath);
            that.map.add(f_busPath);
          }
        }
      },
      stationSearch(){
        var that = this;
        for(var i = 0; i < that.resultDataRefer.length; i++){
          var marker = new AMap.Marker({
            position: that.resultDataRefer[i].latlng,
            icon: new AMap.Icon({
              size: new AMap.Size(30, 30),
              image: 'static/icon/station_icon.png'
            })
          });
          marker.name = that.resultDataRefer[i].station_name;
          marker.on("click", function(){
            that.station_name = this.name;
            that.searchResult();
            that.road_name = that.roadDataRefer[0].name;
            that.showStations(that.road_name, that.upClick ? 0:1);
          });
          that.stationArray.push(marker);
        }
        that.station_cluster = new AMap.MarkerClusterer(
          that.map,
          that.stationArray
        );
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
      vehicleSearch(){
        var that = this;
        for(var i = 0; i < that.vehicleDataRefer.length; i++){
          var pos = that.vehicleDataRefer[i].latlng;
          var marker = new AMap.Marker({
            position: pos,
            icon: new AMap.Icon({
              size: new AMap.Size(30, 30),
              image: 'static/icon/vehicle_icon.png'
            })
          });
          marker.num = that.vehicleDataRefer[i].license_num;
          marker.on("click", function(){
            that.vehicle_num = this.num;
            that.searchVehicle();
            that.road_name = that.roadDataRefer[0].name;
            that.showStations(that.road_name, that.upClick ? 0:1);
          });
          that.vehicleArray.push(marker);
        }
        that.vehicle_cluster = new AMap.MarkerClusterer(
          that.map,
          that.vehicleArray
        );
      }
    }
  }
</script>

<style scoped>
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
    cursor: pointer;
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
    width: 22px;
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
  .road_table{
    z-index: 15;
    position: absolute;
    top: 10px;
    left: 10px;
    opacity: 0.8;
  }
  .vehicle_table{
    z-index: 15;
    position: absolute;
    top: 10px;
    right: 10px;
    opacity: 0.8;
  }
  .search_bar{
    width: 460px;
    height: 36px;
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
  }
  .result_table{
    z-index: 15;
    position: absolute;
    top: 225px;
    left: 10px;
    opacity: 0.8;
  }
  .stops{
    z-index: 15;
    width: 90%;
    height: 160px;
    position: absolute;
    left: 5%;
    bottom: 80px;
    background-color: rgba(20, 108, 151, 0.5);
  }
  .direction{
    width: 70px;
    height: 25px;
    line-height: 25px;
    color: #fff;
    font-size: 60%;
    text-align: center;
    cursor: pointer;
  }
  .dir_active{
    background-color: rgba(18,113,139,0.7);
  }
  .dir_inactive{
    background-color: transparent;
    border: 1px solid rgba(18,113,139,0.7);
    border-radius: 2px;
  }
  .up{
    position: absolute;
    top: 40px;
    left: 30px;
  }
  .down{
    position: absolute;
    top: 75px;
    left: 30px;
  }
  .stations{
    width: 80px;
    height: 90px;
    background-color: #082B3D;
    border: 1px solid #135193;
    border-radius: 2px;
    color: #fff;
    font-size: 80%;
    line-height: 30px;
  }
  .start{
    position: absolute;
    left: 130px;
    top: 35px;
  }
  .end{
    position: absolute;
    right: 30px;
    top: 35px;
  }
  .line_arrow{
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-left-color: #2D80C6;
    position: absolute;
    top: -5px;
    right: 0;
  }
  .filter_title{
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
  }
  .filter_input{
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 2px;
    width: 100%;
    margin-bottom: 5px;
    outline: none;
  }
  .data_filter{
    position: absolute;
    top: 0;
    left: 10px;
    width: 25px;
    height: 50px;
    z-index: 20;
  }
  .filter_button{
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  .confirm{
    margin: 10px 15px 0 0;
    color: #2198D4;
    cursor: pointer;
  }
  .clear{
    margin-top: 10px;
    color: #000;
    cursor: pointer;
  }
</style>
