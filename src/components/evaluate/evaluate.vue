<style>
  .el-input__inner{
    height: 20px;
    width: 125px;
    line-height: 20px;
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
    line-height: 20px;
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
    background:#0d3e53 !important;
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
  .el-table .cell {
    white-space: nowrap;
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
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div class="search">
              <el-col :span="8">
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
              <el-table
                id = "line_table"
                :data="lineData"
                stripe
                style="width: 100%; height: 282px"
                :header-row-class-name="getHeader"
                empty-text="数据读取中">
                <el-table-column label="线路指标">
                  <el-table-column
                    prop="order"
                    label="排名"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="during"
                    label="时间"
                    width="86"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop="line"
                    label="线路"
                    width="76"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop="company"
                    label="公司"
                    width="80"
                    :filters="lineFilter"
                    :filter-method="filterHandler">
                  </el-table-column>
                  <el-table-column
                    prop="index"
                    label="健康指数">
                  </el-table-column>
                </el-table-column>
              </el-table>
              <el-pagination
                small
                @current-change="indexCurrentChange"
                :current-page="index_start_index"
                :page-size="8"
                layout="prev, pager, next"
                :total="lineDataRefer.length">
              </el-pagination>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="content contain">
              <div id="radar" class="radar"></div>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="content contain" style="height: 324px; overflow: auto;">
              <div class="state">
                <span><i class="el-icon-document"></i>健康诊断报告</span>
              </div><br><br>
              <p class="label des_title">公交{{road_name}}，属于{{company_name}}线路，健康指数{{health_index}}，总体健康水平{{health_index>85?'优秀':health_index>75?'良好':health_index>60?'一般':'不合格'}}，需进一步参考问题诊断结果进行改善。</p>
              <el-row style="margin-bottom: 0;">
                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><div id="reliability" class="pie"></div></el-col>
                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><div id="rush" class="pie"></div></el-col>
                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><div id="security" class="pie"></div></el-col>
              </el-row>
              <el-row style="overflow: hidden;">
                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><div id="convenience" class="pie"></div></el-col>
                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><div id="balance" class="pie"></div></el-col>
                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><div id="profitability" class="pie"></div></el-col>
              </el-row>
              <el-row style="overflow: hidden;">
                <div id="health_index"></div>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="narrow_content block">
              <el-table
                :data="roadIndexData"
                stripe
                style="width: 100%; height: 202px"
                :header-row-class-name="getHeader"
                empty-text="数据读取中">
                <el-table-column label="线路指标">
                  <el-table-column
                    prop="norm"
                    label="指标"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    prop="monday"
                    label="周一">
                  </el-table-column>
                  <el-table-column
                    prop="tuesday"
                    label="周二">
                  </el-table-column>
                  <el-table-column
                    prop="wednesday"
                    label="周三">
                  </el-table-column>
                  <el-table-column
                    prop="thursday"
                    label="周四">
                  </el-table-column>
                  <el-table-column
                    prop="friday"
                    label="周五">
                  </el-table-column>
                  <el-table-column
                    prop="saturday"
                    label="周六">
                  </el-table-column>
                  <el-table-column
                    prop="sunday"
                    label="周日">
                  </el-table-column>
                </el-table-column>
              </el-table>
              <el-pagination
                small
                @current-change="weekCurrentChange"
                :current-page="week_start_index"
                :page-size="5"
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
  import navBar from '../../components/navBar/navBar.vue';
  import options from '../options';
  export default {
    name: "evaluate",
    components: {
      navBar: navBar
    },
    data (){
      let that = this;
      return{
        road_name: '27路',
        company_name: '永昌公司',
        health_index: 85,
        basis_date: [new Date(2017, 0, 1), new Date(2017, 10, 11)],
        lineDataRefer: [],
        lineData: [],
        lineFilter: [],
        radar_options: options.radar_options,
        rChart: null,
        reliability_options: options.reliability_options,
        reChart: null,
        rush_options: options.rush_options,
        rushChart: null,
        security_options: options.security_options,
        sChart: null,
        conven_options: options.conven_options,
        cChart: null,
        balance_options: options.balance_options,
        bChart: null,
        profit_options: options.profit_options,
        pChart: null,
        weekly_index_options: options.weekly_index_options,
        wChart: null,
        roadIndexData: [],
        roadIndexDataRefer: [],
        index_start_index: 0,
        week_start_index: 0,
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
      var that = this;
      //var myDoc = officgen('docx');
      var screen = window.screen.availHeight;
      var panels = document.getElementsByClassName('content');
      for(var i = 0; i < panels.length; i++){
        panels[i].style.height = screen - 490 + 'px';
      }
      document.getElementById('radar').style.marginTop = (screen - 700) /2 + 'px';
      this.drawChart();
      this.Search();
    },
    methods:{
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
      indexCurrentChange:function(val){
        this.index_start_index = val;
        this.lineData = this.lineDataRefer.slice((this.index_start_index-1)*8, this.index_start_index*8);
      },
      weekCurrentChange:function(val){
        this.week_start_index = val;
        this.roadIndexData = this.roadIndexDataRefer.slice((this.week_start_index-1)*5, this.week_start_index*5);
      },
      Search(){
        var that = this;
        this.$http.get('http://47.98.199.36:9001/evaluate/index?start_date=' + that.basis_date[0].getFullYear() + '-' +
          (that.basis_date[0].getMonth() + 1) + '-' + that.basis_date[0].getDate() + '&end_date=' +
          that.basis_date[1].getFullYear() + '-' +
          (that.basis_date[1].getMonth() + 1) + '-' + that.basis_date[1].getDate()).then(function(ret){
          that.lineDataRefer = ret.data;
          that.lineData = that.lineDataRefer.slice(0, 8);
        });
        if(that.road_name.indexOf('路') == -1){
          that.road_name += '路';
        }
        this.$http.get('http://47.98.199.36:9001/evaluate/line_index?line_name=' + that.road_name + '&start_date=' + that.basis_date[0].getFullYear() + '-' +
          (that.basis_date[0].getMonth() + 1) + '-' + that.basis_date[0].getDate() + '&end_date=' +
          that.basis_date[1].getFullYear() + '-' +
          (that.basis_date[1].getMonth() + 1) + '-' + that.basis_date[1].getDate()).then(function(ret){
            that.company_name = ret.data[0].company;
            that.health_index = ret.data[0].health_index;
            that.reliability_options.series[0].data[0].value = ret.data[0].reliability;
            that.reliability_options.series[0].data[1].value = 100 - ret.data[0].reliability;
            that.rush_options.series[0].data[0].value = ret.data[0].rush;
            that.rush_options.series[0].data[1].value = 100 - ret.data[0].rush;
            that.security_options.series[0].data[0].value = ret.data[0].security;
            that.security_options.series[0].data[1].value = 100 - ret.data[0].security;
            that.conven_options.series[0].data[0].value = ret.data[0].convenient;
            that.conven_options.series[0].data[1].value = 100 - ret.data[0].convenient;
            that.balance_options.series[0].data[0].value = ret.data[0].balance;
            that.balance_options.series[0].data[1].value = 100 - ret.data[0].balance;
            that.profit_options.series[0].data[0].value = ret.data[0].profit;
            that.profit_options.series[0].data[1].value = 100 - ret.data[0].profit;
            that.radar_options.series[0].data[0].value = [ret.data[0].reliability,  ret.data[0].convenient, ret.data[0].balance, ret.data[0].profit, ret.data[0].security,  ret.data[0].rush];
            that.rChart.setOption(that.radar_options);
            that.reChart.setOption(that.reliability_options);
            that.rushChart.setOption(that.rush_options);
            that.sChart.setOption(that.security_options);
            that.cChart.setOption(that.conven_options);
            that.bChart.setOption(that.balance_options);
            that.pChart.setOption(that.profit_options);
            var weekly = [];
            for(var i = 0; i < 7; i++){
              weekly.push(ret.data[i].health_index);
            }
            that.weekly_index_options.series[0].data = weekly;
            that.wChart.setOption(that.weekly_index_options);
        });
        this.$http.get('http://47.98.199.36:9001/evaluate/week?line_name=' + that.road_name).then(function(ret){
          that.roadIndexDataRefer = ret.data;
          that.roadIndexData = ret.data.slice(0, 5);
        });
      },
      drawChart() {
        var that = this;
        //线路指标雷达图
        let radarChart = document.getElementById('radar');
        this.rChart = this.$echarts.init(radarChart);
        this.rChart.setOption(this.radar_options);
        //可靠性环状图
        let reliaChart = document.getElementById('reliability');
        this.reChart = this.$echarts.init(reliaChart);
        this.reChart.setOption(this.reliability_options);
        //迅速性环状图
        let ruChart = document.getElementById('rush');
        this.rushChart = this.$echarts.init(ruChart);
        this.rushChart.setOption(this.rush_options);
        //安全性环状图
        let securChart = document.getElementById('security');
        this.sChart = this.$echarts.init(securChart);
        this.sChart.setOption(this.security_options);
        //便捷性环状图
        let conChart = document.getElementById('convenience');
        this.cChart = this.$echarts.init(conChart);
        this.cChart.setOption(this.conven_options);
        //平衡性环状图
        let baChart = document.getElementById('balance');
        this.bChart = this.$echarts.init(baChart);
        this.bChart.setOption(this.balance_options);
        //盈利性环状图
        let proChart = document.getElementById('profitability');
        this.pChart = this.$echarts.init(proChart);
        this.pChart.setOption(this.profit_options);
        //一周健康指数图
        let wChart = document.getElementById('health_index');
        this.wChart = this.$echarts.init(wChart);
        this.wChart.setOption(this.weekly_index_options);
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
    position: relative;
  }
  .panel{
    background: #133B50;
    padding: 20px;
  }
  .content {
    min-height: 324px;
  }
  .narrow_content {
    min-height: 242px;
  }
  .block{
    background-color: #0f2a37;
    padding: 15px 10px;
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
  .el-dropdown{
    border: 1px solid #203B66;
    background-color: #152534;
    padding: 3px;
    width: 100%;
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
  .des_title{
    text-align: left;
    -webkit-margin-before: 0;
    -webkit-margin-after: 1em;
  }
  .contain{
    background-color: #0f2a37;
    padding: 15px 20px;
  }
  .state{
    background-color: #0d3e53;
    float: left;
    color: #fff;
    padding: 5px 8px;
  }
  .el-icon-document{
    color: #84a9b5;
    margin: 0 2px;
  }
  .radar{
    width: 360px;
    height: 280px;
    margin: 0 auto;
  }
  .pie{
    height: 120px;
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
  #health_index{
    width: 100%;
    height: 200px;
  }
</style>
