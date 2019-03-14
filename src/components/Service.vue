
<template>
  <div id="s-box">
    <div id="s-top">
      <h1 class="s-left">客服列表</h1>
    </div>
    <div id="s-bottom">

      <el-table
        :data="arrS"
        stripe
        style="width: 100%">
        <el-table-column type="index" :index="indexMethod"
                         prop="x_serial"
                         label="序号"
                         width="90">
        </el-table-column>
        <el-table-column
          prop="s_userid"
          label="用户ID"
          width="90" header-align="center" align="center">
        </el-table-column>
        <el-table-column
          prop="s_username"
          label="用户名"
          width="100" header-align="center" align="center">
        </el-table-column>
        <el-table-column
          prop="s_message"
          label="内容"
          width="300" header-align="center" align="center">
        </el-table-column>
        <el-table-column
          prop="s_date"
          label="日期" header-align="center" align="center">
        </el-table-column>
        <el-table-column
          prop="s_see"
          label="查看" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="Ser(scope.$index,scope.row)" >
              <i class="iconfont icon-chakan"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--对话框-->
    <el-dialog
      title="客服"
      :visible.sync="dialogVisible"
      width="50%" v-if="aaa">
      <div id="all">
      <div id="Sealed-top" >
        <!-- Left -->
        <div class="Sealed-all" v-for="v in arrSSS">
          <div class="Sealed" >
                  <div>
                    <img :src="v.s_photo"/>
                        </div>
              <div>
                  <div class="left_triangle"></div>
                  <span>{{v.s_message}}</span>

              </div>

          </div>
          <div class="Sealed-date">
            {{v.s_date}}
          </div>
        </div>
        <!-- Right -->
        <div class="receiver-all" v-for="v in arrSS">
        <div class="receiver">
            <div>
                      <img src="/static/img/17.jpg"/>
            </div>
               <div class="div1">
                <div class="right_triangle"></div>
                <span>{{v.s_reply}}</span>
               </div>
        </div> 
          <div class="receiver-date">
            {{v.s_replydate}}
          </div>
        </div>
      </div>
      </div>
      <div id="Sealed-bottom">
        <el-input
          type="textarea"
          :rows="5"
          resize="none"
          placeholder="请输入内容"
          style="font-size: 20px;"
          v-model="textarea" id="msg">
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"  @click="sub">发 送</el-button>
      </span>
    </el-dialog>
  </div>


</template>

<script>
  var socket=new WebSocket('ws://172.16.8.13:9999');
  /*建立连接接受消息*/
  socket.onopen=function () {
    socket.onmessage=function (ev) {//传过来的数据其实在 ec.data
      var json=JSON.parse(ev.data);
      $('#Sealed-top').append(
        ' <div id="receiver-all"><div class="receiver" style="clear: both;color: black;font-size: 20px;height: 100px;"><div style="float:right;"><img src='+json.img+' style="width:50px;height:50px;border-radius:200px;float:right "/></div><div class="div1" style="float:right;background-color:#E6A23C;margin:0 10px 10px 20px;padding:10px 0px 10px 10px;border-radius:7px;"><div class="right_triangle" style="height:0px;width:0px;border-width:8px;border-style:solid;border-color:transparent transparent transparent #E6A23C;position: relative;right:-16px;top:3px;float: right;"></div><span id="message" style="clear:both;color: black;font-size: 20px;height: 100px;">'+json.msg+'</span></div></div><div class="receiver-date" style="width: 100%;height: 50px;text-align: center;float:right;">'+json.dataa+'</div></div>');
      $('#Sealed-top').scrollTop( $('#Sealed-top')[0].scrollHeight );
    }
  };


  export default {
    name: "Service",
    data() {
      return {
        input5: '',
        select: '',
        arrS:[{}],
        arrSS:[{}],
        arrSSS:[{}],
        dialogVisible: false,
        textarea: '',
        submit:'',
        date:'',
        asd:{},
        aaa:true
      };
    },
    methods: {
      indexMethod(index) {
        return index * 1 + 1;
      },
      sub() {
        var msg = {"img": "/static/img/17.jpg", "msg": $('#msg').val(), "dataa": this.date}
        socket.send(JSON.stringify(msg))
        this.$axios({
          method: 'get',
          url: 'http://localhost:8081/Serverfind6',
          params: {
            userid: this.arrSS[0].u_id,
            username: this.arrSS[0].u_name,
            reply: msg.msg,
            replydate: msg.dataa.split('T')[0]
          }
        });

        $('#msg').val('');

      },
      datetime() {
        var date1 = new Date();
        var a = date1.getFullYear()
        var b = date1.getMonth() + 1;
        var c = date1.getDate();
        var d = date1.getHours();
        var e = date1.getMinutes();
        var f = date1.getSeconds();
        var g = (a + '-' + b + '-' + c + '  ' + d + ':' + e + ':' + f);
        this.date = g;

      },
      Ser(i,date){

        var S1 = this.$axios({
          method: 'get',
          url: 'http://localhost:8081/Serverfind4',
          params: {
            id: date.u_id
          }
        });
        var S2 = this.$axios({
          method: 'get',
          url: 'http://localhost:8081/Serverfind5',
          params: {
            id: date.u_id
          }
        });
        Promise.all([S1,S2]).then((res) => {
          this.arrSS=res[0].data;
          this.arrSSS=res[1].data;
          // this.arrS=date;
          // this.arrS.reply=[];
          // this.arrS.photo=[];
          // this.arrS.message=[];
          // this.arrS.replydate=[];
          // this.arrS.date=[];
          // for (var i=0;i<res[1].data.length;i++) {
          //   this.arrS.reply.push(res[1].data[i].s_reply)
          //   this.arrS.replydate.push(res[1].data[i].s_replydate)
          // }
          // for (var i=0;i<res[0].data.length;i++) {
          //   this.arrS.photo.push(res[0].data[i].s_photo)
          //   this.arrS.message.push(res[0].data[i].s_message)
          //   this.arrS.date.push(res[0].data[i].s_date)
          // }
            // this.gameArr=data;
            // this.gameArr.type=[];
            // this.gameArr.os=[];
            // this.gameArr.language=[];
            // for (var i=0;i<res[0].data.data.length;i++) {
            //   this.gameArr.type.push(res[0].data.data[i].t_type
            //   )
            // }

            this.dialogVisible = true

          })
      },
    },
    //获取后台数据
    created(){
      this.$axios.get('http://localhost:8081/Serverfind')
        .then((res)=>{
          this.arrS=res.data
        });
        this.datetime()

      // this.$axios.get('http://localhost:8081/Serverfind2')
      //   .then((res)=>{
      //     this.arrSS=res.data
      //   });
      // this.$axios.get('http://localhost:8081/Serverfind3')
      //   .then((res)=>{
      //     this.arrSSS=res.data
      //   });
    },
  }


</script>
<!--<script>-->
  <!--var socket=new WebSocket('ws://172.16.8.69:9999');-->
  <!--/*建立连接接受消息*/-->
  <!--socket.onopen=function () {-->
    <!--socket.onmessage=function (ev) {//传过来的数据其实在 ec.data-->
      <!--var json=JSON.parse(ev.data);-->
      <!--$('#con').append(`-->
      <!--<div class="Sealed-all" v-for="v in arrS">-->
          <!--<div class="Sealed">-->
            <!--      <div>-->
              <!--      <img :src="v.u_photo"/>-->
                        <!--</div>-->
            <!--  <div>-->
            <!--      <div class="left_triangle"></div>-->
            <!--      <span>{{v.s_message}}</span>-->

            <!--  </div>-->

          <!--</div>-->
          <!--<div class="Sealed-date">-->
            <!--{{v.s_date}}-->
          <!--</div>-->
        <!--</div>`);-->
    <!--}-->
  <!--};-->

  <!--$('#submit').click(function () {-->
    <!--//消息的格式都是字符串-->
    <!--var msg={"name":"客服","msg":$('#msg').val()}-->
    <!--socket.send(JSON.stringify(msg))-->
  <!--});-->

<!--</script>-->

<style scoped lang="less">
  #s-box{
    width: 100%;
    height: 100%;
  }
  #s-top{
    margin-top: 30px;
  }
  .s-left{
    float: left;
    font-size: 36px;
    font-weight: normal;
    margin-left: 40px;
  }
  .el-input{
    width: 300px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  #s-bottom{
    width: 94%;
    margin-left: 3%;
    margin-top: 30px;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 0px;
  }
  #msg{
    width: 500px;
    height: 400px;
    border: 1px solid;
  }
  .Sealed{
    clear:both;
    color: black;
    font-size: 20px;
    height: 100px;
  }
  .Sealed div:nth-of-type(1){
    float: left;
  }
  .Sealed div:nth-of-type(2){
    background-color: #989898;
    float: left;
    margin: 0 20px 10px 15px;
    padding: 10px 10px 10px 0px;
    border-radius:7px;
  }


  .Sealed div:first-child img{
    width: 50px;
    height: 50px;
    border-radius: 200px;
  }
  #Sealed-top img{
    width: 50px;
    height: 50px;
    border-radius: 200px;
  }

  .receiver{
    clear:both;
    color: black;
    font-size: 20px;
    height: 100px;
    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .receiver div:nth-child(1){
    float: right;
  }
  #app #box #nav-right #s-box .el-dialog__wrapper .el-dialog .el-dialog__body #Sealed-top .receiver-all .receiver div:nth-of-type(2){
    float:right;
    background-color: #E6A23C;
    margin: 0 10px 10px 20px;
    padding: 10px 0px 10px 10px;
    border-radius:7px;
  }

  .left_triangle{
    height:0px;
    width:0px;
    border-width:8px;
    border-style:solid;
    border-color:transparent #989898 transparent transparent ;
    position: relative;
    left:-16px;
    top:3px;
  }

  #Sealed-top .receiver-all .receiver .div1 .right_triangle{
    height:0px;
    width:0px;
    border-width:8px;
    border-style:solid;
    border-color:transparent transparent transparent #E6A23C;
    position: relative;
    right:-16px;
    top:3px;
  }
  #Sealed-top{
    width: 100%;
    height: 400px;
    overflow: auto;
  }
  #all{
    width: 100%;
    height: 400px;
    overflow: auto;
  }
  .Sealed-date{
    width: 100%;
    height: 50px;

  }
  .receiver-date{
    width: 100%;
    height: 50px;
    text-align: center;
  }
</style>
