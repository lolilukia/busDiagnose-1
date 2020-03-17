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
    white-space: normal;
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
  .amap-container {
    cursor: default !important;
  }
  .amap-labels{
    cursor: default !important;
  }
</style>
<template>
  <div>
    <navBar></navBar>
    <div id="container">
      <div class="bottom_bar">
        <div class="left"></div>
        <div class="right"></div>
        <div class="heat switch" v-on:click="selectLayer(0)"><img class="icon_img" v-bind:src="button_index == 0 ? heat_click_url: heat_url"><p v-bind:class="button_index == 0 ? 'button click': 'button normal'">事故热力</p></div>
        <div class="danger switch" v-on:click="selectLayer(1)"><img class="icon_img" v-bind:src="button_index == 1 ? danger_click_url: danger_url"><p v-bind:class="button_index == 1 ? 'button click': 'button normal'">隐患点</p></div>
      </div>
      <div class="search_bar">
        <el-row :gutter="10">
          <el-col :span="4">
            <div class="label">开始时间</div>
          </el-col>
          <el-col :span="6">
            <div style="overflow: hidden;">
              <el-date-picker
                v-model="start"
                type="date"
                placeholder="开始日期"
                :picker-options="pickerOptions0">
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="label">结束时间</div>
          </el-col>
          <el-col :span="6">
            <div style="overflow: hidden;">
              <el-date-picker
                v-model="end"
                type="date"
                placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <span class="search" v-on:click="searchAccident">
            <i class="el-icon-search"></i></span>
          </el-col>
        </el-row>
      </div>
      <div v-if="button_index == 1" class="search_table">
        <el-table
          :data="searchData"
          stripe
          style="width: 340px; height: 394px"
          :header-row-class-name="getHeader"
          @sort-change="sortSearchChange"
          empty-text="数据读取中">
          <el-table-column
            prop="time"
            label="时间"
            width="110"
            sortable="custom"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="company"
            label="公司"
            width="80"
            sortable="custom">
          </el-table-column>
          <el-table-column
            prop="serious"
            label="严重程度"
            width="80">
          </el-table-column>
          <el-table-column
            prop="detail"
            label="状态">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="right">
                <span>{{ scope.row.detail }}</span>
                <div slot="reference" class="name-wrapper">详情</div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          @current-change="searchCurrentChange"
          :current-page="search_start_index"
          :page-size="13"
          layout="prev, pager, next"
          :total="searchDataRefer.length">
        </el-pagination>
      </div>
      <div v-if="button_index == 1" class="res_table">
        <el-table
          :data="resData"
          stripe
          style="width: 460px; height: 178px"
          :header-row-class-name="getHeader"
          @sort-change="sortResChange"
          empty-text="数据读取中">
          <el-table-column
            prop="vehicle"
            label="车辆"
            width="90">
          </el-table-column>
          <el-table-column
            prop="kilometer"
            label="累计运行公里数"
            width="120"
            sortable="custom">
          </el-table-column>
          <el-table-column
            prop="repair"
            label="累计维修次数"
            width="110"
            sortable="custom">
          </el-table-column>
          <el-table-column
            prop="accident"
            label="历史事故数"
            sortable="custom">
          </el-table-column>
        </el-table>
        <el-pagination
          small
          @current-change="resCurrentChange"
          :current-page="res_start_index"
          :page-size="5"
          layout="prev, pager, next"
          :total="resDataRefer.length">
        </el-pagination>
      </div>
      <div v-if="button_index == 1" class="result_table">
        <el-table
          :data="resultData"
          stripe
          style="width: 460px; height: 178px"
          :header-row-class-name="getHeader"
          @sort-change="sortResultChange"
          empty-text="数据读取中">
          <el-table-column
            prop="name"
            label="路名"
            width="70"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="weather"
            label="天气"
            width="60"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="condition"
            label="道路条件"
            width="78">
          </el-table-column>
          <el-table-column
            prop="traffic"
            label="交通状态"
            width="78">
          </el-table-column>
          <el-table-column
            prop="speed"
            label="运行速度"
            sortable="custom">
          </el-table-column>
          <el-table-column
            prop="prediction"
            label="事故预测"
            sortable="custom"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          @current-change="resultCurrentChange"
          :current-page="result_start_index"
          :page-size="5"
          layout="prev, pager, next"
          :total="resultDataRefer.length">
        </el-pagination>
      </div>
      <div v-show="button_index == 0" class="chart_bar">
        <el-row>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><div id="bar"></div></el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><div id="pie"></div></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import options from '../options';
  import navBar from '../../components/navBar/navBar.vue';
  export default {
    name: "history",
    components: {
      navBar: navBar
    },
    data(){
      let that = this;
      return{
        map: null,
        start: '2017-1-11',
        end: '2017-11-11',
        heatmap: null,
        button_index: 0,
        pre_index: 0,
        heat_url: 'static/icon/accident.png',
        danger_url: 'static/icon/warning.png',
        heat_click_url: 'static/icon/accident_click.png',
        danger_click_url: 'static/icon/warning_click.png',
        searchData: [],
        searchDataRefer: [],
        resData: [],
        resDataRefer: [],
        resultData: [],
        resultDataRefer: [],
        bChart: null,
        accident_num_options: options.accident_num_options,
        pChart: null,
        accident_ratio_options: options.accident_ratio_options,
        res_start_index: 0,
        search_start_index: 0,
        result_start_index: 0,
        danger_points: [],
        road_net: null,
        hidden_segment: [
          [
            [121.563755,29.874179], [121.562661,29.8731], [121.562382,29.872784], [121.561867,29.87189], [121.561609,29.871183],
            [121.561438,29.869993], [121.561266,29.868932], [121.561287,29.869099], [121.561137,29.86789], [121.560944,29.866866],
            [121.560794,29.866159], [121.560622,29.865117], [121.56,29.863908], [121.559399,29.86281]
          ],
          [
            [121.559276,29.870286], [121.559265,29.869411], [121.559233,29.868723], [121.559147,29.868285], [121.558975,29.867895],
            [121.558804,29.867448], [121.558654,29.866927], [121.558396,29.866611], [121.557988,29.86608], [121.557506,29.865476],
            [121.557055,29.864871], [121.55624,29.86394]
          ],
          [
            [121.550114,29.897813], [121.550576,29.897655], [121.550973,29.897497], [121.551874,29.897302], [121.5524,29.897274],
            [121.553301,29.89732], [121.553837,29.897404], [121.554502,29.897599], [121.554824,29.897692], [121.555543,29.897981],
            [121.556369,29.898297], [121.558,29.898827]
          ],
          [
            [121.557243,29.881268], [121.558112,29.880403], [121.557683,29.879379], [121.557146,29.878245], [121.556953,29.877844],
            [121.556974,29.877537], [121.557393,29.876803], [121.557736,29.876291], [121.558326,29.875872], [121.559324,29.875547]
          ],
          [
            [121.553412,29.856632], [121.55279,29.856111], [121.549507,29.852165], [121.548413,29.851123], [121.546417,29.849355],
            [121.545645,29.848573], [121.54528,29.847624], [121.545538,29.84647]
          ],
          [
            [121.569468,29.852361], [121.575734,29.852323], [121.577386,29.852454], [121.581442,29.852323], [121.582085,29.852342],
            [121.583051,29.852268]
          ],
          [
            [121.503368,29.825246], [121.504355,29.824325], [121.505503,29.823157], [121.506731,29.821933], [121.507498,29.821165],
            [121.508507,29.820127]
          ],
          [
            [121.580599,29.873807], [121.577745,29.870644], [121.577585,29.870467], [121.576984,29.869202], [121.576083,29.866755]
          ],
          [
            [121.573357,29.880245], [121.570461,29.881761], [121.567757,29.878412]
          ],
          [
            [121.566856,29.834558], [121.565558,29.834521], [121.56294,29.834502], [121.561695,29.834316], [121.561298,29.834307],
            [121.561191,29.834186], [121.56073,29.831347], [121.560515,29.830175]
          ]
        ],
        segments: [],
        pickerOptions0: {
          disabledDate(time){
            return time.getTime() > Date.now() - 8.64e7;
          }
        },
        pickerOptions: {
          disabledDate(time){
            return ((time.getTime() > Date.now() - 8.64e7) || (time.getTime() < new Date(that.start).getTime()));
          }
        },
      }
    },
    mounted(){
      var that = this;
      var height = window.screen.availHeight - 46;
      document.getElementById("container").style.height = height + 'px';
      that.map = new AMap.Map('container',{
        center: [121.56, 29.86],
        zoom: 13,
      });
      that.map.setMapStyle('amap://styles/dark');
      this.showHeat();
      this.drawChart();
      this.searchAccident();
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
      sortSearchChange: function(column, prop, order){
        var that = this;
        function down(x, y){
          return (x[column.prop] < y[column.prop]) ? 1 : -1;
        }
        function up(x, y){
          return (x[column.prop] > y[column.prop]) ? 1 : -1;
        }
        if(column.order == 'ascending'){
          that.searchDataRefer.sort(up);
          that.searchData = that.searchDataRefer.slice(0, 13);
        }
        else{
          that.searchDataRefer.sort(down);
          that.searchData = that.searchDataRefer.slice(0, 13);
        }
      },
      sortResChange: function(column, prop, order){
        var that = this;
        function down(x, y){
          return (x[column.prop] < y[column.prop]) ? 1 : -1;
        }
        function up(x, y){
          return (x[column.prop] > y[column.prop]) ? 1 : -1;
        }
        if(column.order == 'ascending'){
          that.resDataRefer.sort(up);
          that.resData = that.resDataRefer.slice(0, 5);
        }
        else{
          that.resDataRefer.sort(down);
          that.resData = that.resDataRefer.slice(0, 5);
        }
      },
      sortResultChange: function(column, prop, order){
        var that = this;
        function down(x, y){
          return (x[column.prop] < y[column.prop]) ? 1 : -1;
        }
        function up(x, y){
          return (x[column.prop] > y[column.prop]) ? 1 : -1;
        }
        if(column.order == 'ascending'){
          that.resultDataRefer.sort(up);
          that.resultData = that.resultDataRefer.slice(0, 5);
        }
        else{
          that.resultDataRefer.sort(down);
          that.resultData = that.resultDataRefer.slice(0, 5);
        }
      },
      selectLayer(index){
        var that = this;
        if(this.button_index == index) return;
        else{
          this.pre_index = this.button_index;
          this.button_index = index;
          if(index == 0){
            if(this.heatmap != null){
              this.heatmap.show();
            }
            if(this.road_net != null){
              this.road_net.hide();
              for(var i = 0; i < that.segments.length; i++){
                that.map.remove(that.segments[i]);
              }
              that.segments = [];
            }
            for(var i = 0; i < this.danger_points.length; i++){
              this.map.remove(this.danger_points[i]);
            }
            this.danger_points = [];
            this.$http.get('http://47.98.199.36:9001/api/accident/segment?start_date=' + that.start + '&end_date=' + that.end).then(function(ret){
              that.accident_num_options.xAxis[0].data = ret.data.company;
              that.accident_num_options.series[0].data = ret.data.company_normal;
              that.accident_num_options.series[1].data = ret.data.company_urgent;
              that.bChart.setOption(that.accident_num_options);
              that.accident_ratio_options.series[0].data[0].value = ret.data.normal_num;
              that.accident_ratio_options.series[0].data[1].value = ret.data.urgent_num;
              that.pChart.setOption(that.accident_ratio_options);
            });
          }
          else if(index == 1){
            if(this.heatmap != null){
              this.heatmap.hide();
            }
            this.$http.get('http://47.98.199.36:9001/api/history/accident?start_date=' + that.start + '&end_date=' + that.end).then(function(ret){
              that.searchDataRefer = ret.data;
              that.searchData = that.searchDataRefer.slice(0, 13);
            });
            this.$http.get('http://47.98.199.36:9001/api/accident/info?start_date=' + that.start + '&end_date=' + that.end).then(function(ret){
              that.resDataRefer = ret.data;
              that.resData = that.resDataRefer.slice(0, 5);
            });
            this.$http.get('http://47.98.199.36:9001/api/accident/vehicle?start_date=' + that.start + '&end_date=' + that.end).then(function(ret){
              that.resultDataRefer = ret.data;
              that.resultData = that.resultDataRefer.slice(0, 5);
            });
            this.showDanger();
          }
        }
      },
      searchCurrentChange: function(val){
        this.search_start_index = val;
        this.searchData = this.searchDataRefer.slice((this.search_start_index-1) * 13, this.search_start_index * 13);
      },
      resCurrentChange: function(val){
        this.res_start_index = val;
        this.resData = this.resDataRefer.slice((this.res_start_index-1) * 5, this.res_start_index * 5);
      },
      resultCurrentChange: function(val){
        this.result_start_index = val;
        this.resultData = this.resultDataRefer.slice((this.result_start_index-1) * 5, this.result_start_index * 5);
      },
      searchAccident(){
        var that = this;
        if(this.button_index == 0){
          this.$http.get('http://47.98.199.36:9001/api/accident/segment?start_date=' + that.start + '&end_date=' + that.end).then(function(ret){
            that.accident_num_options.xAxis[0].data = ret.data.company;
            that.accident_num_options.series[0].data = ret.data.company_normal;
            that.accident_num_options.series[1].data = ret.data.company_urgent;
            that.bChart.setOption(that.accident_num_options);
            that.accident_ratio_options.series[0].data[0].value = ret.data.normal_num;
            that.accident_ratio_options.series[0].data[1].value = ret.data.urgent_num;
            that.pChart.setOption(that.accident_ratio_options);
          });
        }
        else if(this.button_index == 1){
          this.$http.get('http://47.98.199.36:9001/api/history/accident?start_date=' + that.start + '&end_date=' + that.end).then(function(ret){
            that.searchDataRefer = ret.data;
            that.searchData = that.searchDataRefer.slice(0, 13);
          });
          this.$http.get('http://47.98.199.36:9001/api/accident/info?start_date=' + that.start + '&end_date=' + that.end).then(function(ret){
            that.resDataRefer = ret.data;
            that.resData = that.resDataRefer.slice(0, 5);
          });
          this.$http.get('http://47.98.199.36:9001/api/accident/vehicle?start_date=' + that.start + '&end_date=' + that.end).then(function(ret){
            that.resultDataRefer = ret.data;
            that.resultData = that.resultDataRefer.slice(0, 5);
          });
        }
      },
      showHeat() {
        var that = this;
        this.$http.get('http://47.98.199.36:9001/api/accident/segment?start_date=' + that.start + '&end_date=' + that.end).then(function(ret){
          var heatmapData = ret.data.heaps_map;
          that.map.plugin(["AMap.Heatmap"], function() {
            that.heatmap = new AMap.Heatmap(that.map, {
              radius: 25, //给定半径
              opacity: [0, 0.8],
              gradient:{
                0.5: 'rgba(14, 37, 72, 1)',
                0.7: 'rgba(255, 215, 0, 1)',
                1.0: 'rgba(255, 0, 0, 1)'
              }
            });
            that.heatmap.setDataSet({
              data: heatmapData,
              max: 5
            });
          });
        });
      },
      showDanger(){
        var that = this;
        if(that.road_net == null){
          that.road_net = new AMap.TileLayer.RoadNet();
          that.road_net.setMap(that.map);
          for(var i = 0; i < that.hidden_segment.length; i++){
            var busOption = {
              path: that.hidden_segment[i],
              strokeColor: 'rgb(255, 0, 0)',
              strokeOpacity: 1,
              strokeWeight: 10
            };
            var dangerPath = new AMap.Polyline(busOption);
            that.segments.push(dangerPath);
            that.map.add(dangerPath);
          }
        }
        else{
          that.road_net.show();
        }
      },
      drawChart(){
        let barChart = document.getElementById('bar');
        this.bChart = this.$echarts.init(barChart);
        this.bChart.setOption(this.accident_num_options);
        let pieChart = document.getElementById('pie');
        this.pChart = this.$echarts.init(pieChart);
        this.pChart.setOption(this.accident_ratio_options);
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
  left: 40%;
  width: 20%;
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
.heat{
  position: absolute;
  bottom: 20px;
  left: 15%;
}
.danger{
  position: absolute;
  bottom: 20px;
  left: 55%;
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
  width: 460px;
  height: 36px;
  position: absolute;
  top: 50px;
  right: 10px;
  z-index: 100;
  background:rgba(19,66,91,0.5);
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
.search_table{
  z-index: 15;
  position: absolute;
  top: 110px;
  left: 10px;
  opacity: 0.8;
}
.res_table{
  z-index: 15;
  position: absolute;
  top: 110px;
  right: 10px;
  opacity: 0.8;
}
.result_table{
  z-index: 15;
  position: absolute;
  top: 350px;
  right: 10px;
  opacity: 0.8;
}
.chart_bar{
  width: 600px;
  height: 180px;
  position: absolute;
  bottom: 150px;
  right: 10px;
  z-index: 100;
  background:rgba(19,66,91,0.5);
}
#bar, #pie{
  margin-left: 10px;
  width: 100%;
  height: 200px;
}
</style>
