<style>
  .el-input__inner{
    height: 20px;
    width: 125px;
    background-color: #102530 !important;
    border: 0;
    border-radius: 0 !important;
    color: #fff;
    font-size: 60%;
  }
  .el-range-input{
    height: 20px;
    width: 120px;
    background-color: #102530 !important;
    border: 0;
    border-radius: 0 !important;
    color: #fff;
    font-size: 60%;
  }
  .el-range-editor.el-input__inner{
    margin-top: 6px;
    padding: 0;
  }
  .el-range-editor .el-range-input {
    line-height: 30px;
    font-size: 60%;
  }
  .el-date-editor .el-range__icon {
    font-size: 14px;
    margin-left: 5px;
    color: #c0c4cc;
    float: left;
    line-height: 20px;
  }
  .el-date-editor .el-range-separator {
    padding: 0 5px;
    line-height: 20px;
    font-size: 60%;
    width: 5%;
    color: #eee;
  }
  .el-input__icon {
    line-height: 20px;
  }
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
</style>
<template>
  <div>
    <navBar></navBar>
    <div class="container">
      <div class="panel">
        <el-row :gutter="10">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="search">
              <el-row>
                <el-col :span="3">
                  <div>
                    <span class="label">线路名称</span>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div>
                    <el-input @keyup.enter.native="Search" v-model="road_name" clearable></el-input>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div>
                    <span class="label">起终日期</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <el-date-picker
                      v-model="basis_date[0]"
                      type="date"
                      placeholder="开始日期"
                      :picker-options="pickerOptions0">
                    </el-date-picker>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div style="overflow: hidden;">
                    <el-date-picker
                      v-model="basis_date[1]"
                      type="date"
                      placeholder="结束日期"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="search">
              <el-col :span="4">
                <div v-on:click="Search" class="search_btn">搜索</div>
              </el-col>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="search">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="content block">
              <el-row>
                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                  <el-dropdown trigger="click" @command="handleCommand"><span class="el-dropdown-link label">{{company_name}}<i class="icon el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="(item, index) in company_order" :command="index">{{item}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                  <div class="subpanel">
                    <div class="form">
                      <div class="odd"><div class="left"><span class="label">速度</span></div><div class="right"><span class="label">{{company_speed}}</span></div></div>
                      <div class="even"><div class="left"><span class="label">准点率</span></div><div class="right"><span class="label">{{company_ontime}}</span></div></div>
                      <div class="odd"><div class="left"><span class="label">班次执行率</span></div><div class="right"><span class="label">{{company_execution}}</span></div></div>
                      <div class="even"><div class="left"><span class="label">实际车公里</span></div><div class="right"><span class="label">{{company_distance}}</span></div></div>
                      <div class="odd"><div class="left"><span class="label">百公里人次</span></div><div class="right"><span class="label">{{company_flow}}</span></div></div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                  <div id="company_rate" class="subpanel"></div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div id="man_time" class="content block"></div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div id="stop" class="content block">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="content block">
              <el-row>
                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" style="padding-left: 15px; text-align: left;">
                  <span class="label">{{road_name}}</span>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                  <div class="subpanel">
                    <div class="form">
                      <div class="odd"><div class="left"><span class="label">速度</span></div><div class="right"><span class="label">{{line_speed}}</span></div></div>
                      <div class="even"><div class="left"><span class="label">准点率</span></div><div class="right"><span class="label">{{line_ontime}}</span></div></div>
                      <div class="odd"><div class="left"><span class="label">班次执行率</span></div><div class="right"><span class="label">{{line_execution}}</span></div></div>
                      <div class="even"><div class="left"><span class="label">实际车公里</span></div><div class="right"><span class="label">{{line_distance}}</span></div></div>
                      <div class="odd"><div class="left"><span class="label">百公里人次</span></div><div class="right"><span class="label">{{line_flow}}</span></div></div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                  <div id="line_rate" class="subpanel"></div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div id="speed" class="content block"></div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div id="distribution" class="content block">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="content block">
              <el-table
                :data="roadData"
                stripe
                style="width: 100%; height: 282px"
                :header-row-class-name="getHeader"
                @sort-change="sortIndexChange"
                empty-text="数据读取中">
                <el-table-column label="线路指标">
                  <el-table-column
                    prop="line"
                    label="线路"
                    width="70">
                  </el-table-column>
                  <el-table-column
                    prop="car_number"
                    label="配车数"
                    sortable="custom"
                    width="90">
                  </el-table-column>
                  <el-table-column
                    prop="class_number"
                    label="排班数"
                    sortable="custom"
                    width="90">
                  </el-table-column>
                  <el-table-column
                    prop="execution"
                    label="班次执行率"
                    sortable="custom"
                    width="110">
                  </el-table-column>
                  <el-table-column
                    prop="ratio"
                    label="专用道比例"
                    width="110"
                    sortable="custom">
                  </el-table-column>
                  <el-table-column
                    prop="incontinuity"
                    label="专用道不连续指数"
                    width="150"
                    sortable="custom">
                  </el-table-column>
                  <el-table-column
                    prop="on_time"
                    label="准点率"
                    sortable="custom"
                    width="90">
                  </el-table-column>
                  <el-table-column
                    prop="early"
                    label="早发"
                    sortable="custom"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="late"
                    label="晚发"
                    sortable="custom"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="accident"
                    label="事故"
                    sortable="custom"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="interval"
                    label="大间隔"
                    sortable="custom"
                    width="90">
                  </el-table-column>
                  <el-table-column
                    prop="man_time"
                    label="百公里人次"
                    sortable="custom"
                    width="130">
                  </el-table-column>
                  <el-table-column
                    prop="speed"
                    label="运行速度"
                    sortable>
                  </el-table-column>
                </el-table-column>
              </el-table>
              <el-pagination
                background
                @current-change="roadIndexCurrentChange"
                :current-page="rIndex_start_index"
                :page-size="8"
                layout="prev, pager, next"
                :total="roadIndexDataRefer.length">
              </el-pagination>
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
    name: "diagnose",
    components: {
      navBar: navBar
    },
    data(){
      let that = this;
      return{
        road_name: '27路',
        basis_date: [new Date(2017, 0, 1), new Date(2017, 10, 11)],
        company_name: '镇海公司',
        company_order: ['永安公司', '永昌公司', '永平公司', '永盛公司', '镇海公司'],
        company_speed: 14 + 'km/h',
        company_ontime: 74 + '%',
        company_execution: 85 + '%',
        company_distance: 13495,
        company_flow: 105223,
        line_speed: 15 + 'km/h',
        line_ontime: 95 + '%',
        line_execution: 94 + '%',
        line_distance: 377,
        line_flow: 2863,
        roadData: [],
        sChart: null,
        stop_relia_options: options.stop_relia_options,
        crChart: null,
        comra_options: options.comra_options,
        mChart: null,
        flow_options: options.flow_options,
        spChart: null,
        road_speed_options: options.road_speed_options,
        lChart: null,
        line_health_options: options.line_health_options,
        rIndex_start_index: 0,
        roadIndexDataRefer: [],
        tdChart: null,
        time_distribution_options: options.time_distribution_options,
        pickerOptions0: {
          disabledDate(time){
            return time.getTime() > Date.now() - 8.64e7;
          }
        },
        pickerOptions: {
          disabledDate(time){
            return ((time.getTime() > Date.now() - 8.64e7) || (time.getTime() < new Date(that.basis_date[0]).getTime()));
          }
        },
      };
    },
    mounted(){
      this.drawChart();
      this.Search();
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
      sortIndexChange: function(column, prop, order){
        var that = this;
        function down(x, y){
          return (x[column.prop] < y[column.prop]) ? 1 : -1;
        }
        function up(x, y){
          return (x[column.prop] > y[column.prop]) ? 1 : -1;
        }
        if(column.order == 'ascending'){
          that.roadIndexDataRefer.sort(up);
          that.roadData = that.roadIndexDataRefer.slice(0, 8);
        }
        else{
          that.roadIndexDataRefer.sort(down);
          that.roadData = that.roadIndexDataRefer.slice(0, 8);
        }
      },
      roadIndexCurrentChange:function(val){
        this.rIndex_start_index = val;
        this.roadData = this.roadIndexDataRefer.slice((this.rIndex_start_index-1)*8, this.rIndex_start_index*8);
      },
      Search(){
        var that = this;
        if(this.road_name.indexOf('路') == -1){
          this.road_name += '路';
        }
        this.$http.get('http://47.98.199.36:9001/diagnose/company?company=' + that.company_name).then(function(ret){
          that.company_speed = (parseFloat(ret.data.speed) * 3.6 + '').substring(0, 5) + 'km/h';
          that.company_ontime = parseFloat(ret.data.on_time) * 100 + '%';
          that.company_execution = parseFloat(ret.data.execution) * 100 + '%';
          that.company_distance = ret.data.distance;
          that.company_flow = ret.data.flow;
          that.comra_options.series[0].data[0].value = parseFloat((ret.data.health_index + '').substring(0, 5));
          that.crChart.setOption(that.comra_options);
        });
        var start_date = that.basis_date[0].getFullYear() + '-' +
          (that.basis_date[0].getMonth() + 1) + '-' + that.basis_date[0].getDate();
        var end_date = that.basis_date[1].getFullYear() + '-' +
          (that.basis_date[1].getMonth() + 1) + '-' + that.basis_date[1].getDate();
        this.$http.get('http://47.98.199.36:9001/diagnose/buslines?start_date=' + start_date + '&end_date=' + end_date).then(function(ret){
          that.roadIndexDataRefer = ret.data;
          that.roadData = that.roadIndexDataRefer.slice(0, 8);
          for(var i = 0; i < that.roadIndexDataRefer.length; i++){
            if(that.road_name == that.roadIndexDataRefer[i].line){
              that.line_speed = that.roadIndexDataRefer[i].speed.substring(0, 5) + 'km/h';
              that.line_ontime = parseFloat(that.roadIndexDataRefer[i].on_time) + '%';
              that.line_execution = parseFloat(that.roadIndexDataRefer[i].execution) + '%';
              that.line_distance = that.roadIndexDataRefer[i].actual_miles;
              that.line_flow = that.roadIndexDataRefer[i].man_time;
              that.line_health_options.series[0].data[0].value = parseFloat((that.roadIndexDataRefer[i].health_index + '').substring(0, 5));
              that.lChart.setOption(that.line_health_options);
            }
          }
        });
        this.$http.get('http://47.98.199.36:9001/diagnose/info?busLine=' + that.road_name + '&start_date=' + start_date + '&end_date=' + end_date).then(function(ret){
          that.stop_relia_options.xAxis[0].data = ret.data[0].stops;
          that.stop_relia_options.series[0].data = ret.data[0].relia;
          var full = [];
          for(var i = 0; i < ret.data[0].stops.length; i++){
            full.push(1);
          }
          that.stop_relia_options.series[1].data = full;
          that.sChart.setOption(that.stop_relia_options);
          that.flow_options.xAxis[0].data = ret.data[0].stops;
          that.flow_options.series[0].data = ret.data[0].in_flow;
          var out_flow = ret.data[0].out_flow;
          for(var j = 0; j < out_flow.length; j++){
            out_flow[j] = (-1) * out_flow[j];
          }
          that.flow_options.series[1].data = out_flow;
          //that.flow_options.yAxis.max = Math.max(ret.data[0].in_flow);
          //that.flow_options.yAxis.min = Math.min(out_flow);
          that.mChart.setOption(that.flow_options);
          var data0 = [];
          var data2 = [];
          for (var i = 1; i < 6400; i++) {
            data0.push(Math.round((Math.random() - 0.5) * 200 + Math.random() * 40 + 60));
            data2.push(-1 * Math.round((Math.random() - 0.5) * 200 + Math.random() * 40 + 60))
          }
          that.time_distribution_options.series[0].data = data0;
          that.time_distribution_options.series[1].data = data2;
          that.tdChart.setOption(that.time_distribution_options);
          that.road_speed_options.series[0].data = ret.data[0].speed.slice(6, 22);
          that.spChart.setOption(that.road_speed_options);
        });
      },
      handleCommand(command) {
        var that = this;
        that.company_name = that.company_order[command];
        this.$http.get('http://47.98.199.36:9001/diagnose/company?company=' + that.company_name).then(function(ret){
          that.company_speed = ret.data.speed;
          that.company_ontime = ret.data.on_time;
          that.company_execution = ret.data.execution;
          that.company_distance = ret.data.distance;
          that.company_flow = ret.data.flow;
          that.comra_options.series[0].data[0].value = parseFloat((ret.data.health_index + '').substring(0, 5));
          that.crChart.setOption(that.comra_options);
        });
      },
      drawChart(){
        let stopChart = document.getElementById('stop');
        this.sChart = this.$echarts.init(stopChart);
        this.sChart.setOption(options.stop_relia_options);
        let comraChart = document.getElementById('company_rate');
        this.crChart = this.$echarts.init(comraChart);
        this.crChart.setOption(this.comra_options);
        let manChart = document.getElementById('man_time');
        this.mChart = this.$echarts.init(manChart);
        this.mChart.setOption(this.flow_options);
        let speedChart = document.getElementById('speed');
        this.spChart = this.$echarts.init(speedChart);
        this.spChart.setOption(this.road_speed_options);
        let lineChart = document.getElementById('line_rate');
        this.lChart = this.$echarts.init(lineChart);
        this.lChart.setOption(this.line_health_options);
        let timeChart = document.getElementById('distribution');
        this.tdChart = this.$echarts.init(timeChart);
        var date = [];
        var data0 = [];
        var data2 = [];
        for (var i = 1; i < 6400; i++) {
          date.push((parseInt(i/400) + 6) + ':00');
          data0.push(Math.round((Math.random() - 0.5) * 200 + Math.random() * 40 + 60));
          data2.push(-1 * Math.round((Math.random() - 0.5) * 200 + Math.random() * 40 + 60))
        }
        this.time_distribution_options.xAxis.data = date;
        this.time_distribution_options.series[0].data = data0;
        this.time_distribution_options.series[1].data = data2;
        this.time_distribution_options.series[0].areaStyle.normal.color = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#FABC1E'
        }, {
          offset: 1,
          color: '#FA4400'
        }]);
        this.time_distribution_options.series[1].areaStyle.normal.color = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#FA4400'
        }, {
          offset: 1,
          color: '#E96C1D'
        }]);
        this.tdChart.setOption(this.time_distribution_options);
      }
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
  .content {
    min-height: 226px;
  }
  .block{
    background-color: #0f2a37;
    padding: 15px 20px;
  }
  .search{
    min-height: 26px;
    width: 100%;
    line-height: 30px;
  }
  .label{
    color: #fff;
    font-size: 80%;
  }
  .subpanel{
    min-height: 160px;
  }
  .el-dropdown{
    float: left;
    border: 1px solid #203B66;
    background-color: #152534;
    padding: 3px;
    width: 60%;
  }
  .el-dropdown-link{
    float: left;
    width: 100%;
  }
  .icon{
    float: right;
    margin: 2px;
    color: #7199c4;
  }
  .form{
    width: 160px;
    height: 120px;
  }
  .odd, .even{
    width: 100%;
    padding: 3px;
  }
  .odd{
    background-color: #083f52;
  }
  .even{
    background-color: #0c3649;
  }
  .left{
    display: inline-block;
    width: 50%;
    text-align: left;
  }
  .right{
    display: inline-block;
    width: 30%;
    text-align: right;
  }
  .search_btn{
    margin-top: 5px;
    height: 26px;
    background-color: #102530;
    line-height: 26px;
    color: #fff;
    font-size: 60%;
    cursor: pointer;
  }
</style>
