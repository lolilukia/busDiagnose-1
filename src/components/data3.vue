<script>
  const dispatch_result_data = [{
    time: '2018/6/27 6:00',
    name: '23路',
    company: '永安',
    direction: '上行',
    load: '低',
    across: '不需要'
  },{
    time: '2018/6/27 7:00',
    name: '23路',
    company: '永安',
    direction: '上行',
    load: '高',
    across: '需要'
  }, {
    time: '2018/6/27 8:00',
    name: '23路',
    company: '永安',
    direction: '下行',
    load: '低',
    across: '不需要'
  },{
    time: '2018/6/27 9:00',
    name: '23路',
    company: '永安',
    direction: '下行',
    load: '低',
    across: '不需要'
  },{
    time: '2018/6/27 10:00',
    name: '23路',
    company: '永安',
    direction: '上行',
    load: '低',
    across: '不需要'
  },{
    time: '2018/6/27 11:00',
    name: '23路',
    company: '永安',
    direction: '上行',
    load: '低',
    across: '不需要'
  },{
    time: '2018/6/27 12:00',
    name: '23路',
    company: '永安',
    direction: '下行',
    load: '低',
    across: '不需要'
  },{
    time: '2018/6/27 13:00',
    name: '23路',
    company: '永安',
    direction: '下行',
    load: '低',
    across: '不需要'
  },{
    time: '2018/6/27 14:00',
    name: '23路',
    company: '永安',
    direction: '上行',
    load: '低',
    across: '不需要'
  },{
    time: '2018/6/27 15:00',
    name: '23路',
    company: '永安',
    direction: '上行',
    load: '低',
    across: '不需要'
  },{
    time: '2018/6/27 16:00',
    name: '23路',
    company: '永安',
    direction: '下行',
    load: '低',
    across: '不需要'
  },{
    time: '2018/6/27 17:00',
    name: '23路',
    company: '永安',
    direction: '下行',
    load: '高',
    across: '需要'
  }, {
    time: '2018/6/27 18:00',
    name: '23路',
    company: '永安',
    direction: '下行',
    load: '低',
    across: '不需要'
  },{
    time: '2018/6/27 19:00',
    name: '23路',
    company: '永安',
    direction: '下行',
    load: '低',
    across: '不需要'
  },{
    time: '2018/6/27 20:00',
    name: '23路',
    company: '永安',
    direction: '下行',
    load: '低',
    across: '不需要'
  },{
    time: '2018/6/27 6:00',
    name: '821路',
    company: '永安',
    direction: '上行',
    load: '高',
    across: '需要'
  },{
    time: '2018/6/27 7:00',
    name: '821路',
    company: '永安',
    direction: '上行',
    load: '高',
    across: '需要'
  },{
    time: '2018/6/27 8:00',
    name: '821路',
    company: '永安',
    direction: '上行',
    load: '高',
    across: '需要'
  },{
    time: '2018/6/27 9:00',
    name: '821路',
    company: '永安',
    direction: '上行',
    load: '高',
    across: '需要'
  },{
    time: '2018/6/27 10:00',
    name: '821路',
    company: '永安',
    direction: '上行',
    load: '高',
    across: '需要'
  },{
    time: '2018/6/27 11:00',
    name: '821路',
    company: '永安',
    direction: '上行',
    load: '高',
    across: '需要'
  },{
    time: '2018/6/27 12:00',
    name: '821路',
    company: '永安',
    direction: '上行',
    load: '高',
    across: '需要'
  },{
    time: '2018/6/27 13:00',
    name: '821路',
    company: '永安',
    direction: '上行',
    load: '高',
    across: '需要'
  },{
    time: '2018/6/27 14:00',
    name: '821路',
    company: '永安',
    direction: '上行',
    load: '高',
    across: '需要'
  },{
    time: '2018/6/27 15:00',
    name: '821路',
    company: '永安',
    direction: '上行',
    load: '高',
    across: '需要'
  },{
    time: '2018/6/27 16:00',
    name: '821路',
    company: '永安',
    direction: '下行',
    load: '高',
    across: '需要'
  },{
    time: '2018/6/27 17:00',
    name: '821路',
    company: '永安',
    direction: '下行',
    load: '高',
    across: '需要'
  },{
    time: '2018/6/27 18:00',
    name: '821路',
    company: '永安',
    direction: '下行',
    load: '高',
    across: '需要'
  },{
    time: '2018/6/27 19:00',
    name: '821路',
    company: '永安',
    direction: '下行',
    load: '低',
    across: '不需要'
  },{
    time: '2018/6/27 20:00',
    name: '821路',
    company: '永安',
    direction: '下行',
    load: '低',
    across: '不需要'
  }];
  const dispatch_index = ['23路','821路'];
  const avail_index = [[0, 5], [5, 10]];
  const dispatch_scheme = [[[121.505893,29.871892,121.507578,29.86025],[121.580409,29.929228,121.589732,29.912627],[121.534265,29.854875,121.507578,29.86025],[121.6161,29.876573,121.589732,29.912627],[121.571446,29.867782,121.589732,29.912627]],[[121.532343,29.867102,121.5452,29.874738],[121.542723,29.85736,121.5452,29.874738],[121.6161,29.876573,121.601488,29.893136],[121.534265,29.854875,121.5452,29.874738],[121.571446,29.867782,121.5452,29.874738]]];
  const dispatch_available = [{
    time: '2018/6/27',
    name: '22路',
    company: '永安',
    direction: '下行',
    load: '低',
    scheme: '生成方案'
  }, {
    time: '2018/6/27',
    name: '812路',
    company: '永安',
    direction: '上行',
    load: '低',
    scheme: '生成方案'
  }, {
    time: '2018/6/27',
    name: '53路',
    company: '永安',
    direction: '下行',
    load: '低',
    scheme: '生成方案'
  }, {
    time: '2018/6/27',
    name: '521路',
    company: '永安',
    direction: '上行',
    load: '低',
    scheme: '生成方案'
  },{
    time: '2018/6/27',
    name: '351路',
    company: '永安',
    direction: '上行',
    load: '低',
    scheme: '生成方案'
  },{
    time: '2018/6/27',
    name: '22路',
    company: '永安',
    direction: '下行',
    load: '低',
    scheme: '生成方案'
  },{
    time: '2018/6/27',
    name: '812路',
    company: '永安',
    direction: '下行',
    load: '低',
    scheme: '生成方案'
  },{
    time: '2018/6/27',
    name: '512路',
    company: '永安',
    direction: '上行',
    load: '低',
    scheme: '生成方案'
  },{
    time: '2018/6/27',
    name: '53路',
    company: '永安',
    direction: '下行',
    load: '低',
    scheme: '生成方案'
  },{
    time: '2018/6/27',
    name: '351路',
    company: '永安',
    direction: '下行',
    load: '低',
    scheme: '生成方案'
  }];
  const dispatch_from_to = [[['联丰新村', '公交新典路站', '上行'], ['甬江外漕', '公交梅竹路站', '下行'], ['公交南塘老街站', '公交新典路站', '上行'], ['公交国际会展中心站', '公交梅竹路站', '下行'], ['甬港新村', '公交梅竹路站', '下行']],[['宁波火车站北广场', '公交鼓楼站', '下行'], ['澄浪社区', '公交鼓楼站', '下行'], ['公交国际会展中心站', '陆嘉家园', '下行'],['公交南塘老街站', '公交鼓楼站', '下行'], ['甬港新村', '公交鼓楼站', '下行']]];
  export default {
    dispatch_result_data,
    dispatch_index,
    dispatch_available,
    avail_index,
    dispatch_scheme,
    dispatch_from_to
  }
</script>

