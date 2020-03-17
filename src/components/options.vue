<script>
  //线路健康指数条形图
  const line_health_index = {
    title: {
      text: '线路健康指数',
      top: 20,
      left: 20,
      textStyle:{
        color: '#fff',
        fontSize: '80%',
        fontWeight: 'normal'
      }
    },
    color: ['#3398DB'],
    textStyle: {
      color: '#fff'
    },
    tooltip : {
      trigger: 'axis',
      axisPointer : {
        type : 'shadow'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        dataView: {}
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      containLabel: true
    },
    xAxis:[
      {
        type : 'category',
        data : ['永安', '永昌', '永平', '永盛', '镇海'],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel:{
          textStyle: {
            fontSize: '60%'
          },
          interval: 0,
        },
        axisLine: {
          lineStyle:{
            color: '#fff'
          }
        },
      }
    ],
    yAxis:[
      {
        type : 'value',
        splitLine:{
          show:false
        },
        axisLabel:{
          textStyle: {
            fontSize: '60%'
          },
          interval: 0
        },
        axisLine:{
          lineStyle:{
            color: '#fff'
          }
        },
        max: 100
      }
    ],
    series : [
      {
        name:'健康指数',
        type:'bar',
        barWidth: '40%',
        data: [75.6, 75.3, 75.4, 74.0, 74.3]
      }
    ]
  };
  //准点率仪表盘图
  const on_time_rate = {
    tooltip : {
      formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        dataView: {}
      }
    },
    series: [
      {
        name: '指标',
        type: 'gauge',
        detail: {
          formatter:'{value}%',
          offsetCenter: [0, 60],
          textStyle:{
            fontSize: 17,
            fontWeight: 'bold'
          },
        },
        radius: '85%',
        axisLine: {
          lineStyle: {
            width: 10,
            color: [[0.2, '#e5585f'], [0.8, '#2ccec3'], [1, '#2f89f1']]
          }
        },
        splitNumber: 10,
        splitLine:{
          show: true,
          length: 10,
          lineStyle:{
            color: '#0f2a37'
          }
        },
        axisLabel:{
          distance: 5
        },
        axisTick:{
          show: false
        },
        pointer: {
          width: 4
        },
        title:{
          color: '#fff',
          fontSize: '80%'
        },
        data: [{value: 73.92, name: '准点率'}]
      }
    ]
  };
  //公交速率变化（拥挤比例）
  const speed_rate_bar = {
    title: {
      text: '全天公交运行状态变化情况',
      top: 20,
      left: 20,
      textStyle:{
        color: '#fff',
        fontSize: '10px'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        dataView: {}
      }
    },
    legend: {
      top: 20,
      right: 50,
      textStyle:{
        color: '#fff'
      },
      data: ['畅通比例', '拥挤比例', '堵塞比例']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle:{
            color: '#fff'
          }
        },
        type: 'category',
        data: ['04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle:{
            color: '#fff'
          }
        },
        axisLabel: {
          show: true,
          interval: '20',
          formatter: '{value}%'
        },
        max: 100
      }
    ],
    dataZoom: [
      {
        show: true,
        start: 0,
        end: 100
      },
      {
        type: 'inside',
        start: 0,
        end: 100
      }
    ],
    series: [
      {
        name: '畅通比例',
        type: 'bar',
        stack: '速度',
        data: [50, 40, 10, 20, 20, 30, 10, 40, 40],
        itemStyle: {
          normal: {
            color: '#38cac1'
          }
        }
      },
      {
        name: '拥挤比例',
        type: 'bar',
        stack: '速度',
        data: [40, 50, 10, 30, 30, 10, 30, 20, 10],
        itemStyle: {
          normal: {
            color: '#d9ca3e'
          }
        }
      },
      {
        name: '堵塞比例',
        type: 'bar',
        stack: '速度',
        barWidth: '50%',
        data: [10, 10, 80, 50, 50, 60, 60, 40, 50],
        itemStyle: {
          normal: {
            color: '#E14D55'
          }
        }
      },
    ]
  };
  const speed_variation_line = {
    title: {
      text: '全天公交运行速度变化情况',
      top: 20,
      left: 20,
      textStyle:{
        color: '#fff',
        fontSize: '10px'
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top: 20,
      right: 50,
      textStyle:{
        color: '#fff'
      },
      data: ['今天','昨天','上周'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        dataView: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle:{
          color: '#fff'
        }
      },
      data: ['04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 30,
      interval: 10,
      axisLine: {
        lineStyle:{
          color: '#fff'
        }
      },
      splitLine: {
        show: false
      }
    },
    dataZoom: [
      {
        show: true,
        start: 0,
        end: 100
      },
      {
        type: 'inside',
        start: 0,
        end: 100
      }
    ],
    series: [
      {
        name:'今天',
        type:'line',
        symbol:'none',
        lineStyle:{
          color: '#83dd55'
        },
        itemStyle:{
          color: '#83dd55'
        },
        data:[18, 11, 20, 14, 10, 14, 10, 14, 13, 20, 14, 13, 10, 14, 14, 17, 17]
      },
      {
        name:'昨天',
        type:'line',
        symbol:'none',
        lineStyle:{
          color: '#fdb708'
        },
        itemStyle:{
          color: '#fdb708'
        },
        data:[16, 14, 19, 11, 17, 11, 18, 19, 12, 15, 16, 18, 12, 15, 17, 10, 10]
      },
      {
        name:'上周',
        type:'line',
        symbol:'none',
        lineStyle:{
          color: '#3695fe'
        },
        itemStyle:{
          color: '#3695fe'
        },
        data:[18, 20, 13, 20, 20, 11, 18, 10, 17, 14, 17, 10, 17, 10, 18, 15, 17]
      },
    ]
  };
  const radar_options = {
    toolbox: {
      feature: {
        saveAsImage: {},
        dataView:{}
      }
    },
    tooltip: {},
    radar: {
      name: {
        textStyle: {
          color: '#fff'
        }
      },
      nameGap: 5,
      indicator: [
        { name: '可靠性', max: 100},
        { name: '便捷性', max: 100},
        { name: '供需平衡性', max: 100},
        { name: '盈利性', max: 100},
        { name: '安全性', max: 100},
        { name: '迅速性', max: 100}
      ],
      axisLine:{
        show: false
      },
      splitLine:{
        lineStyle:{
          color: '#fff'
        }
      },
      splitArea:{
        areaStyle: {
          color: '#0f2a37'
        }
      }
    },
    series: [{
      symbol: "none",
      areaStyle: {
        color: '#21698a'
      },
      lineStyle: {
        color: '#21698a'
      },
      type: 'radar',
      data : [
        {
          value : [63,57,64,72,76,73],
          name : '属性'
        }
      ]
    }]
  };
  const reliability_options = {
    graphic:{
      type: 'text',
      left: 'center',
      top: 'center',
      style:{
        text: '可靠性',
        x: 100,
        y: 100,
        textAlign: 'center',
        fill: '#fff',
        fontSize: 10
      }
    },
    color: ['#e65e05', '#0b4a5e'],
    series: [
      {
        name: '可靠性',
        type:'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data:[
          {value: 63},
          {value: 100},
        ],
      }
    ]
  };
  const rush_options = {
    graphic:{
      type: 'text',
      left: 'center',
      top: 'center',
      style:{
        text: '迅速性',
        x: 100,
        y: 100,
        textAlign: 'center',
        fill: '#fff',
        fontSize: 10
      }
    },
    color: ['#fbbf0b', '#0b4a5e'],
    series: [
      {
        name: '迅速性',
        type:'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data:[
          {value: 57},
          {value: 100},
        ],
      }
    ]
  };
  const security_options = {
    graphic:{
      type: 'text',
      left: 'center',
      top: 'center',
      style:{
        text: '安全性',
        x: 100,
        y: 100,
        textAlign: 'center',
        fill: '#fff',
        fontSize: 10
      }
    },
    color: ['#c19559', '#0b4a5e'],
    series: [
      {
        name: '安全性',
        type:'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data:[
          {value: 64},
          {value: 100},
        ],
      }
    ]
  };
  const conven_options = {
    graphic:{
      type: 'text',
      left: 'center',
      top: 'center',
      style:{
        text: '便捷性',
        x: 100,
        y: 100,
        textAlign: 'center',
        fill: '#fff',
        fontSize: 10
      }
    },
    color: ['#269ddc', '#0b4a5e'],
    series: [
      {
        name: '便捷性',
        type:'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data:[
          {value: 72},
          {value: 100},
        ],
      }
    ]
  };
  const balance_options = {
    graphic:{
      type: 'text',
      left: 'center',
      top: 'center',
      style:{
        text: '供需平衡性',
        x: 100,
        y: 100,
        textAlign: 'center',
        fill: '#fff',
        fontSize: 10
      }
    },
    color: ['#e01568', '#0b4a5e'],
    series: [
      {
        name: '供需平衡性',
        type:'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data:[
          {value: 76},
          {value: 0},
        ],
      }
    ]
  };
  const profit_options = {
    graphic:{
      type: 'text',
      left: 'center',
      top: 'center',
      style:{
        text: '盈利性',
        x: 100,
        y: 100,
        textAlign: 'center',
        fill: '#fff',
        fontSize: 10
      }
    },
    color: ['#54197d', '#0b4a5e'],
    series: [
      {
        name: '盈利性',
        type:'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data:[
          {value: 73},
          {value: 100},
        ],
      }
    ]
  };
  const stop_relia_options = {
    title: {
      text: '停站时间可靠度',
      top: 10,
      left: 10,
      textStyle:{
        color: '#fff',
        fontSize: '80%',
        fontWeight: 'normal'
      }
    },
    color: ['#4ec0f2','#094253'],
    tooltip : {
      trigger: 'axis',
      axisPointer : {
        type : 'shadow'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        dataView: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        data : ['公交庄市站', '柳岸晨韵', '汤家庙', '庄市浅水湾小区', '庄市菜市场', '鑫隆花园', '清泉花园西大门(市大学科技园)', '纺织服装学院生活区', '商帮文化公园', '三官堂', '工程学院东校区(永安公交)', '路林市场', '常洪(汽车北站)', '怡江新村', '半路凉亭', '孔浦', '红梅社区', '大通桥', '大庆北路', '东鹰花园', '白沙路', '宁大附属医院', '老外滩(宁波美术馆)', '江厦公园', '灵桥西(日新街)', '药行街(中国银行)', '第一医院', '镇明小区(月湖盛园)', '三支街'],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel:{rotate: -30},
        axisLine:{
          lineStyle:{
            color: '#fff'
          }
        }
      }
    ],
    yAxis : [
      {
        type : 'value',
        axisLine:{
          lineStyle:{
            color: '#fff'
          }
        },
        splitLine:{
          show: false
        },
        max: 1
      },
    ],
    series : [
      {
        type:'bar',
        barWidth: '50%',
        zlevel: 1,
        data:[0.37, 1.65, 1.83, 1.91, 1.41, 0.92, 2.09, 1.49, 2.95, 1.95, 2.26, 1.81, 2.33, 1.44, 1.45, 2.65, 1.01, 2.86, 2.71, 2.23, 2.88, 0.78, 1.86, 0.31, 0.66, 1.52, 1.44, 0.62, 1.42]
      },
      {
        type:'bar',
        barWidth: '50%',
        barGap: '-100%',
        data:[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
      }
    ]
  };
  const comra_options = {
    tooltip : {
      formatter: "{a} <br/>{b} : {c}"
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        dataView: {}
      }
    },
    series: [
      {
        type: 'gauge',
        detail: {
          offsetCenter: [0, 60],
          textStyle:{
            fontSize: 17,
            fontWeight: 'bold'
          },
          formatter:'{value}',
        },
        radius: '100%',
        axisLine: {
          lineStyle: {
            width: 12,
            color: [[0.6, '#e75d5b'], [1, '#4ec0f1']]
          }
        },
        splitNumber: 10,
        splitLine:{
          show: true,
          length: 12,
          lineStyle:{
            color: '#0f2a37'
          }
        },
        axisLabel:{
          distance: 5
        },
        axisTick:{
          show: false
        },
        pointer: {
          width: 4
        },
        title:{
          color: '#fff',
          fontSize: '80%'
        },
        data: [{value: 77.32, name: '健康指数'}]
      }
    ]
  };
  var xAxisData = ['公交庄市站', '柳岸晨韵', '汤家庙', '庄市浅水湾小区', '庄市菜市场', '鑫隆花园', '清泉花园西大门(市大学科技园)', '纺织服装学院生活区', '商帮文化公园', '三官堂', '工程学院东校区(永安公交)', '路林市场', '常洪(汽车北站)', '怡江新村', '半路凉亭', '孔浦', '红梅社区', '大通桥', '大庆北路', '东鹰花园', '白沙路', '宁大附属医院', '老外滩(宁波美术馆)', '江厦公园', '灵桥西(日新街)', '药行街(中国银行)', '第一医院', '镇明小区(月湖盛园)', '三支街'];
  var in_account = [98, 186, 160, 130, 54, 91, 136, 139, 31, 172, 164, 151, 159, 118, 32, 176, 71, 31, 121, 24, 145, 150, 70, 117, 89, 30, 82, 33, 49];
  var out_account = [-84, -178, -154, -149, -37, -93, -155, -139, -15, -163, -179, -155, -158, -119, -39, -178, -81, -25, -131, -22, -135, -147, -66, -120, -99, -28, -68, -34, -63];
  const flow_options = {
    title: {
      text: '站点上下客流量',
      top: 10,
      left: 10,
      textStyle:{
        color: '#fff',
        fontSize: '80%',
        fontWeight: 'normal'
      }
    },
    xAxis: [
      {
        data: xAxisData,
        position: 'bottom',
        silent: false,
        axisLine: {
          onZero: false,
          lineStyle:{
            color: '#fff'
          }
        },
        axisTick: {
          show: true
        },
        axisLabel:{rotate: -30},
        splitLine: {show: false},
        splitArea: {show: false}
      },
      {
        silent: false,
        axisLine: {
          onZero: true,
          lineStyle:{
            color: '#fff'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {show: false},
        splitArea: {show: false}
      }
    ],
    yAxis: {
      axisLine: {
        lineStyle:{
          color: '#fff'
        }
      },
      interval: 400,
      max: 600,
      min: -800,
      splitLine: {show: false},
      splitArea: {show: false}
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        dataView: {}
      }
    },
    tooltip : {
      trigger: 'axis',
      axisPointer : {
        type : 'shadow'
      }
    },
    series: [
      {
        name: 'bar2',
        type: 'bar',
        stack: 'two',
        data: in_account,
        barWidth: '30%',
        itemStyle: {
          color: '#007c96'
        }
      },
      {
        name: 'bar4',
        type: 'bar',
        stack: 'two',
        data: out_account,
        barWidth: '30%',
        itemStyle: {
          color: '#ff6100'
        }
      }
    ]
  };
  const road_speed_options = {
    title: {
      text: '路段运行速度',
      top: 10,
      left: 10,
      textStyle:{
        color: '#fff',
        fontSize: '80%',
        fontWeight: 'normal'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        dataView: {}
      }
    },
    tooltip : {
      trigger: 'axis',
      axisPointer : {
        type : 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
      axisLine:{
        lineStyle:{
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'value',
      interval: 10,
      max: 30,
      splitLine:{
        show: false
      },
      axisLine:{
        lineStyle:{
          color: '#fff'
        }
      }
    },
    series: [{
      data: [18, 19, 9, 19, 16, 9, 11, 15, 20, 20, 10, 20, 20, 14, 18, 9, 13],
      type: 'line',
      symbolSize: 0,
      lineStyle: {
        color: '#4ec0f2'
      }
    }]
  };
  const line_health_options = {
    tooltip : {
      formatter: "{a} <br/>{b} : {c}"
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        dataView: {}
      }
    },
    series: [
      {
        type: 'gauge',
        detail: {
          offsetCenter: [0, 60],
          textStyle:{
            fontSize: 17,
            fontWeight: 'bold'
          },
          formatter:'{value}',
        },
        radius: '100%',
        axisLine: {
          lineStyle: {
            width: 12,
            color: [[0.6, '#e75d5b'], [1, '#4ec0f1']]
          }
        },
        splitNumber: 10,
        splitLine:{
          show: true,
          length: 12,
          lineStyle:{
            color: '#0f2a37'
          }
        },
        axisLabel:{
          distance: 5
        },
        axisTick:{
          show: false
        },
        pointer: {
          width: 4
        },
        title:{
          color: '#fff',
          fontSize: '80%'
        },
        data: [{value: 81.17, name: '健康指数'}]
      }
    ]
  };
  const time_distribution_options = {
    title: {
      text: '单程周转时间分布',
      top: 10,
      left: 10,
      textStyle:{
        color: '#fff',
        fontSize: '80%',
        fontWeight: 'normal'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        dataView: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
      axisLine:{
        lineStyle:{
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      max: 120,
      min: -120,
      interval: 60,
      splitLine:{
        show: false
      },
      axisLine:{
        lineStyle:{
          color: '#fff'
        }
      }
    },
    series: [
      {
        name:'from',
        type:'line',
        smooth:true,
        symbol: 'none',
        sampling: 'average',
        itemStyle: {
          normal: {
            color: '#FABC1E'
          }
        },
        areaStyle: {
          normal: {
            color: '#fff'
          }
        },
        data: []
      },
      {
        name:'from',
        type:'line',
        smooth:true,
        symbol: 'none',
        sampling: 'average',
        itemStyle: {
          normal: {
            color: '#FABC1E'
          }
        },
        areaStyle: {
          normal: {
            color: '#fff'
          }
        },
        data: []
      }
    ]
  };
  const accident_num_options = {
    calculable : true,
    xAxis : [
      {
        type : 'category',
        data : ['公交职校', '公共', '宁波公交', '旅游公司', '永安公司', '永平公司', '永昌公司', '永盛公司', '自行车公司', '镇海公司'],
        axisLabel:{rotate: -30},
        axisLine:{
          lineStyle:{
            color: '#fff'
          }
        }
      }
    ],
    toolbox: {
      feature: {
        saveAsImage: {},
        dataView: {}
      }
    },
    tooltip : {
      trigger: 'axis',
      axisPointer : {
        type : 'shadow'
      }
    },
    yAxis : [
      {
        type : 'value',
        max: 80,
        splitLine:{
          show: false
        },
        axisLine:{
          lineStyle:{
            color: '#fff'
          }
        }
      }
    ],
    series : [
      {
        name:'一般事故',
        type:'bar',
        itemStyle:{
          color: '#eccc18'
        },
        data:[3, 0, 11, 0, 5, 5, 4, 0, 0, 0],
      },
      {
        name:'紧急事故',
        type:'bar',
        itemStyle:{
          color: '#cf1a0d'
        },
        data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      }
    ]
  };
  const accident_ratio_options = {
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        dataView: {}
      }
    },
    series : [
      {
        name:'事故类型',
        type:'pie',
        radius : [0, '55%'],
        center: ['50%', '50%'],
        selectedMode: 'single',
        startAngle: 30,
        labelLine:{
          show: false
        },
        data:[
          {value: 97, name:'一般事故', itemStyle: {color: '#eccc18'}},
          {value: 3, name:'紧急事故', itemStyle: {color: '#cf1a0d'}},
        ],
        label: {
          normal: {
            textStyle: {
              color: '#fff',
              fontSize: 10
            }
          }
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }
    ]
  };
  const weekly_index_options = {
    title: {
      text: '一周健康指数',
      top: 10,
      left: 10,
      textStyle:{
        color: '#fff',
        fontSize: '80%',
        fontWeight: 'normal'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        dataView: {}
      }
    },
    tooltip : {
      trigger: 'axis',
      axisPointer : {
        type : 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLine:{
        lineStyle:{
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'value',
      interval: 20,
      max: 100,
      splitLine:{
        show: false
      },
      axisLine:{
        lineStyle:{
          color: '#fff'
        }
      }
    },
    series: [{
      data: [67, 72, 71, 78, 74, 82, 70],
      type: 'line',
      symbolSize: 0,
      lineStyle: {
        color: '#4ec0f2'
      }
    }]
  };
  export default {
    line_health_index,
    on_time_rate,
    speed_rate_bar,
    speed_variation_line,
    radar_options,
    reliability_options,
    rush_options,
    security_options,
    conven_options,
    balance_options,
    profit_options,
    stop_relia_options,
    comra_options,
    flow_options,
    road_speed_options,
    line_health_options,
    time_distribution_options,
    accident_num_options,
    accident_ratio_options,
    weekly_index_options
  }
</script>

