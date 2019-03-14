<template>
  <div id="h-box">
    <div id="h-top">

        <div class="h-one">
          <div><b>今日数据</b></div>
          <div id="h-unum">   <i>  新增用户：</i>      <span>   {{arr.usernum}}             </span>        </div>
          <div id="h-gorder"> <i>  游戏订单：</i>      <span>   {{arr.gameorder}}   </span>        </div>
          <div id="h-rorder"> <i>  周边订单：</i>      <span>   {{arr.roundorder}}  </span>        </div>
          <div id="h-sum">    <i>  总订单：  </i>       <span>   {{arr.sum}}          </span>        </div>
        </div>

    </div>


    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" id="tabs">
      <el-tab-pane label="数据统计" name="first" id="tab1">
        <div id="h-chart">
          <div id="echarts" :style="{width: '1000px', height: '300px'}"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="订单汇总" name="second">
        <div id="h-chartone">
          <div id="echartsone" :style="{width: '1000px', height: '250px'}"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品数量" name="third">
        <div id="h-charttwo">
          <div id="echartstwo" :style="{width: '1000px', height: '250px'}"></div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  /*算总数量*/

    export default {
        name: "Home",
      data() {
        return {
          activeName2: 'first',
          arr: {
            usernum: '',
            gameorder: '',
            roundorder: '',
            sum:''
          },
            gsum:'',
            msum:'',
           user:''
        }
      },
      /*获取后台数量*/
      created(){
        var _this=this;
          /*用户数量*/
        this.$axios.get('http://localhost:8081/autostart ')
          .then((res)=>{
            _this.arr.usernum=res.data[0].countnum;

          });
        /*游戏订单数量*/
        this.$axios.get('http://localhost:8081/gameordersum')
          .then((res)=>{
            _this.arr.gameorder=res.data[0].countnum;

          });
        /*周边订单数量*/
        this.$axios.get('http://localhost:8081/roundordersum')
          .then((res)=>{
            _this.arr.roundorder=res.data[0].countnum;
          });
        /*游戏数量*/
        this.$axios.get('http://localhost:8081/gsum')
          .then((res)=>{
            _this.gsum=res.data[0].countnum;

          });
        /*商品数量*/
        this.$axios.get('http://localhost:8081/msum')
          .then((res)=>{
            _this.msum=res.data[0].countnum;

          });


      },
      methods:{
           handleClick(tab, event) {

      }},
      updated(){
        var dom = document.getElementById('echarts');
        var domone = document.getElementById('echartsone');
        var domtwo = document.getElementById('echartstwo');
        let oData=new Date();
        let y=oData.getFullYear();
        let m=oData.getMonth();
        let r=oData.getDate();
        var myChart = this.$echarts.init(dom);
        var myChartone = this.$echarts.init(domone);
        var myCharttwo = this.$echarts.init(domtwo);

        this.arr.sum=Math.floor(document.querySelector('#h-rorder span').innerHTML)+Math.floor(document.querySelector('#h-gorder span').innerHTML);
        let themeJson = {
          "周边订单": this.arr.roundorder,
          "游戏订单": this.arr.gameorder,
        };
        let themeJson1 = {
          "周边商品数量": this.msum,
          "游戏数量": this.gsum,
        };

        var waterMarkText = 'ECHARTS';
        var canvas = document.createElement('canvas');
        /*今日数据图表*/
        myChart.setOption({
          title: {
            text: '数据统计',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '1%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },

          yAxis: {
            type: 'category',
            nameTextStyle:{
              fontSize:14,

            },
            data: ['新增用户','周边订单','游戏订单','总订单']
          },

          series: [
            {
              name:''+y+'年'+m+1+'月'+r+'日' ,
              type: 'bar',
              data: [this.arr.usernum,this.arr.gameorder,this.arr.roundorder,this.arr.sum]
            },
          ],
          color: function (params){
            var colorList = ['rgb(127,154,162)','rgb(193,216,172)','rgb(214,235,216)','rgb(211,191,162)'];
            return colorList[params.dataIndex];
          }

        });
        /*订单图表*/
        myChartone.setOption({
          title: {
            text: '订单数量',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          // grid: {
          //   left: '3%',
          //   right: '4%',
          //   bottom: '1%',
          //   containLabel: true
          // },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['周边订单','游戏订单']
          },

          series: [
            {
              name:''+y+'年'+m+1+'月'+r+'日' ,
              type: 'bar',
              data: [this.arr.roundorder,this.arr.gameorder]
            },
          ],
          color: function (params){
            var colorList = ['rgb(127,154,162)','rgb(193,216,172)'];
            return colorList[params.dataIndex];
          }

        });
        /*商品数量图表*/
        myCharttwo.setOption({
          title: {
            text: '商品数量',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          // grid: {
          //   left: '3%',
          //   right: '4%',
          //   bottom: '1%',
          //   containLabel: true
          // },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['商品数量','游戏数量']
          },

          series: [
            {
              name:''+y+'年'+m+1+'月'+r+'日' ,
              type: 'bar',
              data: [this.msum,this.gsum]
            },
          ],
          color: function (params){
            var colorList = ['rgb(214,235,216)','rgb(211,191,162)'];
            return colorList[params.dataIndex];
          }

        });




      }


    }



</script>

<style scoped lang="less">
#h-box{
  width: 100%;
  .h-one div:hover span{
    font-weight: bold;
    font-size: 20px;
  }
  #h-top{

    .h-one{
      overflow: hidden;
      margin-top: 30px;
      font-size: 16px;
      border-bottom: 1px #e4e4e4 solid;

      div{
        width: 180px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        float: left;
        margin-left: 35px;
        padding: 10px 0;
        i{
           display: inline-block;
          width: 100px;
          float: left;
          font-weight: normal;
        }
        span{
          display: inline-block;
          width: 50px;
          text-align: left;
          transition: all 0.1s linear;
          float: left;

        }
      }

    }

  }
  #h-chart,#h-chartone,#h-charttwo{
    margin-top: 30px;
    width: 100%;

    #echarts{
      margin: 0 auto;
    }
  }

  #tabs{
    margin-top: 30px;
    #echartsone,#echartstwo{
            margin: 0 auto;
}
  }

  .el-tabs__item{
    font-size: 16px;
  }
}
.h-one div:hover {
  font-size: 16px;
}
</style>
