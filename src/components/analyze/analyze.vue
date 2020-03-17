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
  .header th{
    background: #0d3e53 !important;
    font-size: 10px;
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
  .el-table__row td{
    background-color: #0c485d !important;
    font-size: 8px;
    color: #fff;
    border: none;
    padding: 2px 5px;
    text-align: left;
  }
  .el-table__row--striped td{
    background-color: #0d3e53 !important;
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
  .el-pagination button:disabled {
    background-color: #0A455A;
    cursor: not-allowed;
  }
  .el-pagination--small .btn-next, .el-pagination--small .btn-prev, .el-pagination--small .el-pager li, .el-pagination--small .el-pager li.btn-quicknext, .el-pagination--small .el-pager li.btn-quickprev, .el-pagination--small .el-pager li:last-child {
    background-color: #0A455A;
  }
</style>
<template>
  <div>
    <navBar></navBar>
    <div class="container">
      <div class="panel">
        <el-row :gutter="10">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <div class="grid-content block">
              <span class="data">{{hundred_flow}}</span><br>
              <span class="white">百车公里客流(人次/百车公里)</span>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <div class="grid-content block">
              <span class="data">{{bus_flow}}</span><br>
              <span class="white">公交客流(人次)</span>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <div class="grid-content block">
              <span class="data">{{bus_number}}</span><br>
              <span class="white">出车数</span>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <div class="grid-content block">
              <span class="data">{{bus_rate}}</span><br>
              <span class="white">出车率</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <div id="index" class="content block">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="table block">
              <el-table
                :data="classData"
                stripe
                style="width: 100%; height: 202px"
                :header-row-class-name="getHeader"
                @sort-change="sortClassChange"
                empty-text="数据读取中">
                <el-table-column label="班次、车公里统计">
                  <el-table-column
                    prop="company"
                    label="公司">
                  </el-table-column>
                  <el-table-column
                    prop="shift"
                    label="班次 实际/完成率/计划"
                    sortable="custom">
                  </el-table-column>
                  <el-table-column
                    prop="kilometer"
                    label="车公里 实际/完成率/计划"
                    sortable="custom">
                  </el-table-column>
                </el-table-column>
              </el-table>
              <el-pagination
                small
                @current-change="classCurrentChange"
                :current-page="class_start_index"
                :page-size="5"
                layout="prev, pager, next"
                :total="classDataRefer.length">
              </el-pagination>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <div id="on-time" class="content block">

            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <div id="congestion" class="grid block">

            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <div id="speed" class="grid block">

            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <div class="table block" style="height: 228px; overflow-y: auto;">
              <el-row>
                <el-col :span="3">
                  <div class="card middle"><i class="el-icon-warning"></i></div>
                </el-col>
                <el-col :span="14">
                  <div class="card">
                    <span class="white">547路浙B33152异常高速</span>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="card">
                    <span class="grey">{{new Date().getHours()}}:{{new Date().getMinutes()}}</span>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="3">
                  <div class="card middle"><i class="el-icon-warning"></i></div>
                </el-col>
                <el-col :span="14">
                  <div class="card">
                    <span class="white">37路浙B53338异常高速</span>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="card">
                    <span class="grey">{{new Date().getHours()}}:{{new Date().getMinutes()}}</span>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="3">
                  <div class="card middle"><i class="el-icon-warning"></i></div>
                </el-col>
                <el-col :span="14">
                  <div class="card">
                    <span class="white">857路浙B53689异常低速</span>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="card">
                    <span class="grey">{{new Date().getHours()}}:{{new Date().getMinutes()}}</span>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="3">
                  <div class="card middle"><i class="el-icon-warning"></i></div>
                </el-col>
                <el-col :span="14">
                  <div class="card">
                    <span class="white">801路浙B30039异常低速</span>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="card">
                    <span class="grey">{{new Date().getHours()}}:{{new Date().getMinutes()-1}}</span>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="3">
                  <div class="card middle"><i class="el-icon-warning"></i></div>
                </el-col>
                <el-col :span="14">
                  <div class="card">
                    <span class="white">541路浙B30815异常低速</span>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="card">
                    <span class="grey">{{new Date().getHours()}}:{{new Date().getMinutes()-1}}</span>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="3">
                  <div class="card middle"><i class="el-icon-warning"></i></div>
                </el-col>
                <el-col :span="14">
                  <div class="card">
                    <span class="white">341路浙B52928异常低速</span>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="card">
                    <span class="grey">{{new Date().getHours()}}:{{new Date().getMinutes()-2}}</span>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="3">
                  <div class="card middle"><i class="el-icon-warning"></i></div>
                </el-col>
                <el-col :span="14">
                  <div class="card">
                    <span class="white">82路浙B53369大间隔预警</span>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="card">
                    <span class="grey">{{new Date().getHours()}}:{{new Date().getMinutes()-2}}</span>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="3">
                  <div class="card middle"><i class="el-icon-warning"></i></div>
                </el-col>
                <el-col :span="14">
                  <div class="card">
                    <span class="white">857路浙B53689发生串车</span>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="card">
                    <span class="grey">{{new Date().getHours()}}:{{(new Date().getMinutes()-3) < 10?'0' + (new Date().getMinutes()-3).toString():(new Date().getMinutes()-3)}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="table block">
              <el-table
                :data="indexData"
                stripe
                style="width: 100%; height: 228px"
                :header-row-class-name="getHeader"
                empty-text="数据读取中">
                <el-table-column label="各类指标统计">
                  <el-table-column
                    prop="index"
                    label="指标"
                    sortable
                    width="280">
                  </el-table-column>
                  <el-table-column
                    prop="real"
                    label="实际值"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="plan"
                    label="计划值">
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <div class="content block">
              <div class="date middle">
                <span class="white">今天&nbsp;{{date}}</span>
              </div>
              <div class="weather">
                <img class="w_icon" v-bind:src="img_src">
                <div class="w_detail">
                  <span class="temperature">{{temperature}}<span class="symbol">℃</span></span>
                  <br>
                  <span class="white t_text">{{weather_status}}</span>
                  <br>
                  <span class="white t_text">空气质量&nbsp;{{air_score}}</span>
                  <br>
                  <span class="white air">{{air_quality}}</span>
                  <br>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import options from '../options';
  import navBar from '../../components/navBar/navBar.vue';
  export default {
    name: "analyze",
    components: {
      navBar: navBar
    },
    data(){
      return{
        hundred_flow: '',
        bus_flow: '',
        bus_number: '',
        bus_rate: '',
        classFilter: [],
        classData: [],
        classDataRefer: [],
        indexData: [],
        date: '',
        temperature: 0,
        weather_status: '',
        air_score: 80,
        air_quality: '良',
        img_src: 'static/rain.png',
        rChart: null,
        rate_option: options.on_time_rate,
        iChart: null,
        health_option: options.line_health_index,
        cChart: null,
        congestion_option: options.speed_rate_bar,
        speed_option: options.speed_variation_line,
        class_start_index: 0,
        dataTimer: null
      };
    },
    beforeDestroy(){
      clearInterval(this.dataTimer);
    },
    mounted(){
      var that = this;
      that.drawChart();
      var datetime = 1509206400 + new Date().getHours() * 3600;
      that.readData(datetime);
      that.dataTimer = setInterval(function(){
        datetime += 3600;
        that.readData(datetime);
      }, 3600000);
      var screen = window.screen.availHeight;
      var panels = document.getElementsByClassName('grid');
      for(var i = 0; i < panels.length; i++){
        panels[i].style.height = screen - 740 + 'px';
      }
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();
      this.date = year + '/' + month + '/' + day;
      var that = this;
      this.$http.get('http://wthrcdn.etouch.cn/weather_mini?city=上海').then(function(ret){
        that.temperature = ret.data.data.forecast[0].high.split(" ")[1].substring(0, 2);
        that.weather_status = ret.data.data.forecast[0].type;
        if(that.weather_status == '晴'){
          that.img_src = 'static/sunny.png';
        }
        else if(that.weather_status == '阴'){
          that.img_src = 'static/shade.png';
        }
        else if(that.weather_status == '多云'){
          that.img_src = 'static/cloudy.png';
        }
        else{
          that.img_src = 'static/rain.png';
        }
      });
    },
    methods: {
      readData(datetime){
        var that = this;
        var index_name = ['公共汽电车线路网比率', '公共汽电车线路网密度', '公共交通站点500米半径覆盖率', '公共交通正点率', '早高峰时段公共汽电车平均运营时速', '早高峰时段公共电汽车平均拥挤度'];
        that.$http.get('http://47.98.199.36:9001/analysis/info?date_time=' + datetime).then(function(ret){
          that.hundred_flow = ret.data.hundred;
          that.bus_flow = ret.data.bus_flow;
          that.bus_number = ret.data.bus_number;
          that.bus_rate = ret.data.bus_ratio;
          that.rate_option.series[0].data[0].value = parseInt(ret.data.on_time.substring(0, ret.data.on_time.indexOf('%')));
          that.rChart.setOption(that.rate_option);
          that.classDataRefer = ret.data.statitics;
          that.classData = ret.data.statitics.slice(0, 5);
          var company = ret.data.company.slice(0, 5);
          for(var i = 0; i < company.length; i++){
            company[i] = company[i].substring(0, 2);
          }
          that.health_option.xAxis[0].data = company;
          that.health_option.series[0].data = ret.data.health_index.slice(0, 5);
          that.iChart.setOption(that.health_option);
          var now = new Date();
          var hour = now.getHours();
          that.congestion_option.xAxis[0].data = that.congestion_option.xAxis[0].data.slice(0, hour > 23 ? 23 : hour - 3);
          that.congestion_option.series[2].data = ret.data.blocking_rate.slice(3, hour > 23 ? 23 : hour);
          that.congestion_option.series[1].data = ret.data.crowd_rate.slice(3, hour > 23 ? 23 : hour);
          that.congestion_option.series[0].data = ret.data.unblocked_rate.slice(3, hour > 23 ? 23 : hour);
          that.congestion_option.series[0].data.forEach(function(value, index, array){
            array[index] = parseFloat(array[index]) * 100;
          });
          that.congestion_option.series[1].data.forEach(function(value, index, array){
            array[index] = parseFloat(array[index]) * 100;
          });
          that.congestion_option.series[2].data.forEach(function(value, index, array){
            array[index] = parseFloat(array[index]) * 100;
          });
          that.cChart.setOption(that.congestion_option);
          that.speed_option.xAxis.data = that.speed_option.xAxis.data.slice(0, hour > 23 ? 23 : hour - 3);
          that.speed_option.series[0].data = ret.data.today_speed.slice(3, hour > 23 ? 23 : hour);
          that.speed_option.series[1].data = ret.data.yesterday_speed.slice(3, hour > 23 ? 23 : hour);
          that.speed_option.series[2].data = ret.data.last_week_speed.slice(3, hour > 23 ? 23 : hour);
          that.sChart.setOption(that.speed_option);
          var real = ret.data.real.split(",");
          var plan = ret.data.plan.split(",");
          for(var i = 0; i < index_name.length; i++){
            that.indexData.push({"index": index_name[i], "real": real[i], "plan": plan[i]});
          }
        });
      },
      drawChart() {
        var that = this;
        //index chart
        let indexChart = document.getElementById('index');
        that.iChart = this.$echarts.init(indexChart);
        that.iChart.setOption(that.health_option);
        //on time rate chart
        let rateChart = document.getElementById('on-time');
        that.rChart = this.$echarts.init(rateChart);
        that.rChart.setOption(that.rate_option);
        //speed variation
        let conChart = document.getElementById('congestion');
        that.cChart = this.$echarts.init(conChart);
        //speed variation
        that.cChart.setOption(that.congestion_option);
        //speed variation line chart
        let spChart = document.getElementById('speed');
        that.sChart = this.$echarts.init(spChart);
        that.sChart.setOption(that.speed_option);
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      getHeader({ row, rowIndex }) {
        if (rowIndex == 0) {
          return 'header'
        }
        else {
          return 'subheader'
        }
      },
      sortClassChange: function(column, prop, order){
        var that = this;
        function down(x, y){
          return (x[column.prop] < y[column.prop]) ? 1 : -1;
        }
        function up(x, y){
          return (x[column.prop] > y[column.prop]) ? 1 : -1;
        }
        if(column.order == 'ascending'){
          that.classDataRefer.sort(up);
          that.classData = that.classDataRefer.slice(0, 5);
        }
        else{
          that.classDataRefer.sort(down);
          that.classData = that.classDataRefer.slice(0, 5);
        }
      },
      classCurrentChange:function(val){
        this.class_start_index = val;
        this.classData = this.classDataRefer.slice((this.class_start_index-1)*5, this.class_start_index*5);
      },
    }
  }
</script>

<style scoped>
  body{
    background-color: #19232C;
  }
  .el-row {
    margin-bottom: 10px;
    &:last-child {
     margin-bottom: 0;
   }
  }
  .container{
    padding: 15px;
  }
  .panel{
    background: #133B50;
    padding: 20px;
  }
  .grid-content {
    min-height: 72px;
    text-align: center;
    padding-top: 10px;
  }
  .content {
    min-height: 248px;
  }
  .grid{
    min-height: 200px;
  }
  .block{
    background-color: #0f2a37;
  }
  .data{
    font-size: 1.5em;
    font-weight: bold;
    color: #3ce9c2;
  }
  .white{
    font-size: 60%;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
  }
  .table{
    padding: 10px;
    min-height: 228px;
  }
  .card{
    background-color: #0d4255;
    min-height: 28px;
    line-height: 28px;
    text-align: left;
  }
  .middle{
    text-align: center;
  }
  .el-icon-warning{
    color: #d5575c;
    font-size: 10px;
  }
  .el-icon-question{
    color: #e4c831;
    font-size: 14px;
  }
  .grey{
    font-size: 80%;
    color: #ccc;
  }
  .date{
    min-height: 48px;
    line-height: 48px;
  }
  .weather{
    min-height: 180px;
    position: relative;
  }
  .w_icon{
    width: 35%;
    position: absolute;
    top: 20%;
    left: 15%;
  }
  .w_detail{
    position: absolute;
    top: 15%;
    right: 17%;
    text-align: left;
  }
  .temperature{
    font-size: 200%;
    font-weight: 600;
    color: #fff;
  }
  .symbol{
    font-size: 30%;
    font-weight: 600;
    position: absolute;
    top: 5%;
    right: 17%;
  }
  .air{
    padding: 0 8px;
    border-radius: 4px;
    background-color: #64c523;
  }
  ::-webkit-scrollbar
  {
    width: 16px;
    height: 50px;
    background-color: #0f2a37;
  }
  ::-webkit-scrollbar-track
  {
    background-color: #19232C;
  }
  ::-webkit-scrollbar-thumb
  {
    background-color: #0d4255;
  }
</style>
