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
    /* DragTest css by roc */
    *{ padding:0; margin:0}
    ul,li{ list-style:none}
    .box{ width:100%; margin: 0 auto; overflow:hidden; zoom:1; }
    .box ul{ width:94%; overflow:hidden;zoom:1; position:relative; height:500px}
    .box ul li{ width:30%; background-color: #06C; float:left; height:200px; font-weight:bolder; color:#FFF; font-size:24px; text-align:center; margin:5px; line-height:100px}
    .cur{ cursor:move;}
    .hig{ border:2px dotted #FFFFFF}
    .add{ background-color: transparent; border: 4px dashed #06C; border-radius: 4px; position: relative;}
    .add-icon{ color: #06C; font-size: 50px; position: absolute; top: 60px; bottom: 0; left: 0; right: 0;}
    #formPanel {position: absolute; top: 100px; left: 30%; right: 30%; background-color: #14435B; border-radius: 6px; padding: 20px; z-index: 5; display: none; width: 40%; margin: 0 auto; }
    .title {padding-left: 5%; text-align: left; width: 95%; height: 40px; line-height: 40px; position: absolute; top: 0; left: 0; color: white; background-color: #19222C;}
  /* End DragTest css by roc */
</style>
<template>
  <div class="container" id="container">
    <div id="formPanel">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="图表名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="图表类型">
          <el-select v-model="form.type" placeholder="请选择活动区域">
            <el-option label="条形图" value="bar"></el-option>
            <el-option label="折线图" value="line"></el-option>
            <el-option label="散点图" value="scatter"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.time" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="panel">
      <el-button type="primary" @click="showBlock">添加</el-button>
      <el-row :gutter="10">
        <div class="box" id="moveBox">
          <ul id="dragBox">
          </ul>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
  import options from '../options';
  export default {
    name: "diagnose",
    data(){
      let that = this;
      return{
        num: 0,
        form: {
          name: '',
          type: '',
          date: '',
          time: ''
        }
      }
    },
    mounted(){
      var height = window.screen.availHeight - 46;
      document.getElementById("container").style.height = height + 'px';
      this.drawChart();
    },
    methods:{
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
      addButton(){
        function hasClass( elements,cName ){
          return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
        };
        function addClass( elements,cName ){
          if( !hasClass( elements,cName ) ){
            elements.className += " " + cName;
          };
        };
        function removeClass( elements,cName ){
          if( hasClass( elements,cName ) ){
            elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " ); // replace方法是替换
          };
        };
        function showBlock(){
          document.getElementById('formPanel').style.display = 'block';
        };
        var panel = document.getElementById("dragBox");
        var newnode = document.createElement("li");
        newnode.style.backgroundColor = 'transparent';
        addClass(newnode, "add");
        newnode.innerHTML = "<i class=\"el-icon-plus add-icon\"></i>";
        newnode.addEventListener("click", showBlock, false);
        panel.appendChild(newnode);
        this.num++;
      },
      showBlock(){
        document.getElementById('formPanel').style.display = 'block';
      },
      onCancel() {
        document.getElementById('formPanel').style.display = 'none';
      },
      onSubmit() {
        function hasClass( elements,cName ){
          return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
        };
        function addClass( elements,cName ){
          if( !hasClass( elements,cName ) ){
            elements.className += " " + cName;
          };
        };
        function removeClass( elements,cName ){
          if( hasClass( elements,cName ) ){
            elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " ); // replace方法是替换
          };
        };
        document.getElementById('formPanel').style.display = 'none';
        var panel = document.getElementById("dragBox");
        var n = panel.childNodes;
        if(n.length == 1 && hasClass(n[n.length - 1], "add")){
          panel.removeChild(n[n.length - 1]);
        }
        var newnode = document.createElement("li");
        newnode.onmousedown=function(ev){
          var iEvent=ev||event;
          var dx=iEvent.clientX;
          var dy=iEvent.clientY;
          var dw=newnode.offsetWidth;
          var dh=newnode.offsetHeight;
          var disright=newnode.offsetLeft+newnode.offsetWidth;
          var distop=newnode.offsetHeight+newnode.offsetTop;
          if(iEvent.clientX>newnode.offsetLeft+newnode.offsetWidth-10){
            b='right';
          }
          if(iEvent.clientX<newnode.offsetLeft+10){
            b='left';
          }
          if(iEvent.clientY<newnode.offsetTop+10){
            a='top';
          }
          if(iEvent.clientY>newnode.offsetTop+newnode.offsetHeight-10){
            a='bottom';
          }
          document.onmousemove=function(ev){
            var iEvent=ev||event;
            if(b=='right'){
              newnode.style.width=dw+(iEvent.clientX-dx)+'px';
              if(newnode.offsetWidth<=10){
                newnode.style.width='10px';
              }
            }
            if(b=='left'){
              newnode.style.width=dw-(iEvent.clientX-dx)+'px';
              newnode.style.left=disright-newnode.offsetWidth+'px';
              if(newnode.offsetWidth<=10){
                newnode.style.width='10px';
                newnode.style.left=disright-newnode.offsetWidth+'px';
              }
            }
            if(a=='bottom'){
              newnode.style.height=iEvent.clientY-dy+dh+'px';
              if(newnode.offsetHeight<=10){
                newnode.style.height='10px';
              }
            }
            if(a=='top'){
              newnode.style.height=dh-(iEvent.clientY-dy)+'px'
              newnode.style.top=distop-newnode.offsetHeight+'px';
              if(newnode.offsetHeight<=10){
                newnode.style.height='10px';
                newnode.style.top=distop-newnode.offsetHeight+'px';
              }
            }

          };
          document.onmouseup=function(){
            document.onmousedown=null;
            document.onmousemove=null;
          };
          return false;
        };
        var name = document.createElement("div");
        addClass(name, "title");
        name.innerHTML = this.form.name;
        newnode.appendChild(name);
        panel.appendChild(newnode);
        n = panel.childNodes;
        for(var i = 0; i < n.length; i++){
          n[i].style = "";
          if(i == 2) n[i].style.height = 410 + 'px';
        }
        this.drawChart();
      },
      drawChart(){
        if(this.num == 0){
          this.addButton();
        }
        else{
          var newnode=document.getElementById("moveBox");
          var oUl=newnode.getElementsByTagName("ul")[0];
          var oLi=oUl.getElementsByTagName("li");
          var aPos = [];
          var zx=0;
          //布局转换
          for (var i = 0; i < oLi.length; i++)
          {
            oLi[i].index = i;
            oLi[i].style.top = oLi[i].offsetTop + "px";
            oLi[i].style.left = oLi[i].offsetLeft + "px";
            aPos.push({"left":oLi[i].offsetLeft, "top":oLi[i].offsetTop})
          }
          for(var i=0;i<oLi.length;i+=1){
            oLi[i].style.position="absolute";
            drap(oLi[i]);
          }
          //拖拽函数
          function  drap(obj){
            obj.onmousedown=function(e){
              var oNear=null;
              var ev=e||window.event;
              var disX=ev.clientX-this.offsetLeft-oUl.offsetLeft;
              var disY=ev.clientY-this.offsetTop-oUl.offsetTop;
              this.className="cur";
              this.style.zIndex=zx++;
              if(obj.setCapture){
                obj.setCapture();
              }else{
                window.captureEvents(Event.MOUSEMOVE);
              }
              ev.cancelBubble = true;//阻止事件冒泡，防止冲突
              document.onmousemove=function(e){
                var ev=e||window.event;
                var w=ev.clientX-disX-oUl.offsetLeft;
                var h=ev.clientY-disY-oUl.offsetTop;
                (w<0)&&(w=0);
                (w>=(oUl.offsetWidth-obj.offsetWidth))&&(w=(oUl.offsetWidth-obj.offsetWidth));
                (h<0)&&(h=0);
                (h>=(oUl.offsetHeight-obj.offsetHeight))&&(h=(oUl.offsetHeight-obj.offsetHeight));
                obj.style.top=h+"px";
                obj.style.left=w+"px";
                for(var i=0;i<oLi.length;i++){
                  oLi[i].className="cur";
                }
                oNear=findObj(obj);
                oNear && (oNear.className="hig");
              }
              document.onmouseup=function(){
                if(obj.releaseCapture){
                  obj.releaseCapture();
                }else{
                  window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP);
                }
                document.onmouseup=null;
                document.onmousemove=null;
                for(var i=0;i<oLi.length;i++){
                  oLi[i].className="";
                }
                if(oNear){
                  oNear.style.zIndex=zx++;
                  startMove(obj,aPos[oNear.index]);
                  startMove(oNear,aPos[obj.index]);
                  var temp=oNear.index;
                  oNear.index=obj.index;
                  obj.index=temp;
                }else{
                  startMove(obj,aPos[obj.index]);
                }
                return false;
              }
            }
          }
          //找出相遇点中最近的元素
          function  findObj(obj){
            var arr1=[];
            var arr2=[];
            var res=null;
            var minnum=9999999;
            var minLi=null;
            for(var i=0;i<oLi.length;i++){
              res=isButt(obj,oLi[i]);
              if(oLi[i]!=obj&&res){
                arr1.push(dian(obj,oLi[i]));
                arr2.push(oLi[i]);
              }
            }
            for(var i=0;i<arr1.length;i++){

              if(arr1[i]<minnum){
                minnum=arr1[i];
                minLi=arr2[i];
              }

            }
            return minLi;
          }
          //求亮点之间的距离
          function  dian(obj1,obj2){
            var a=(obj1.offsetLeft + obj1.offsetWidth / 2) - (obj2.offsetLeft + obj2.offsetWidth / 2);
            var b=(obj1.offsetTop + obj1.offsetHeight / 2) - (obj2.offsetTop + obj2.offsetHeight / 2);
            return Math.sqrt(a*a+b*b);

          }
          //碰撞检测
          function  isButt(aObj,bObj){
            var a1=aObj.offsetLeft;
            var b1=aObj.offsetTop;
            var c1=aObj.offsetLeft+aObj.offsetWidth;
            var d1=aObj.offsetTop+aObj.offsetHeight;
            var a2=bObj.offsetLeft;
            var b2=bObj.offsetTop;
            var c2=bObj.offsetLeft+bObj.offsetWidth;
            var d2=bObj.offsetTop+bObj.offsetHeight;
            if(a2>c1||b2>d1||a1>c2||b1>d2){
              return false;
            }else{
              return true;
            }
          }
          //获取最终样式
          function getStyle(obj, attr)
          {
            return parseFloat(obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr])
          }

          //运动框架
          function startMove(obj, pos, onEnd)
          {
            clearInterval(obj.timer);
            obj.timer = setInterval(function ()
            {
              doMove(obj, pos, onEnd)
            }, 30)
          }
          function doMove(obj, pos, onEnd)
          {
            var iCurL = getStyle(obj, "left");
            var iCurT = getStyle(obj, "top");
            var iSpeedL = (pos.left - iCurL) / 5;
            var iSpeedT = (pos.top - iCurT) / 5;
            iSpeedL = iSpeedL > 0 ? Math.ceil(iSpeedL) : Math.floor(iSpeedL);
            iSpeedT = iSpeedT > 0 ? Math.ceil(iSpeedT) : Math.floor(iSpeedT);
            if (pos.left == iCurL && pos.top == iCurT)
            {
              clearInterval(obj.timer);
              onEnd && onEnd()
            }
            else
            {
              obj.style.left = iCurL + iSpeedL + "px";
              obj.style.top = iCurT + iSpeedT + "px";
            }
          }
        }
      }
    }
  }

//   Drag Test by roc

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
