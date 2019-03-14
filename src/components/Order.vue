<template>
  <div>
    <div id="top">
      <h1 class="top-left">订单管理</h1>
      <div class="top-right">
        <el-input placeholder="请输入商品名称或者订单号" v-model="searchstr" class="input-with-select" value="searchstr">
          <el-button slot="append" icon="el-icon-search"  @click="roundsearch"></el-button>
        </el-input>
      </div>
    </div>
    <div id="Order-buttom">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="周边商品订单" name="first">
          <el-table
            :data="roundArr"
            style="width: 100%" >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品价格：">
                    <span>{{ props.row.m_price }}</span>
                  </el-form-item>
                  <el-form-item label="商品数量：">
                    <span>{{ props.row.roundNum }}</span>
                  </el-form-item>
                  <el-form-item label="收货人电话：">
                    <span>{{ props.row.a_phone }}</span>
                  </el-form-item>
                  <el-form-item label="收货人地址：">
                    <span>{{ props.row.inTheArea }}</span>
                  </el-form-item>
                  <el-form-item label="收货人邮编：">
                    <span>{{ props.row.postalcode }}</span>
                  </el-form-item>
                  <el-form-item label="合计：">
                    <span>{{ props.row.roundSum}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label="订单号"
              prop="p_ordernum">
            </el-table-column>
            <el-table-column
              label="订单时间"
              prop="p_ordertime">
            </el-table-column>
            <el-table-column
              label="商品名称"
              prop="m_name">
            </el-table-column>
            <el-table-column
              label="收货人"
              prop="a_name">
            </el-table-column>
            <el-table-column
              label="订单状态">
              <template slot-scope="props">
                <span>{{props.row.p_orderstatus}}  </span> <i class="el-icon-loading" ></i>
              </template>
            </el-table-column>
            <el-table-column
              label="修改订单"
              prop="Modify">
              <template slot-scope="scope">
                <el-button plain
                           size="mini"
                           type="primary"
                           @click="editShow(scope.$index,scope.row)">修改</el-button>
                <el-dialog title="修改信息" :visible.sync="centerDialogVisible" width="37%" center @close="hide">
                  <el-form :model="round_arr" status-icon ref="roundArr">
                    <el-form-item label="订单号：">
                      <el-input v-model="round_arr.p_ordernum" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="订单时间">
                      <el-input v-model="round_arr.p_ordertime" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称">
                      <el-input v-model="round_arr.m_name" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="收货人：">
                      <el-input v-model="round_arr.a_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码">
                      <el-input v-model="round_arr.a_phone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="收货地址">
                      <el-input v-model="round_arr.inTheArea" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="收货邮编">
                      <el-input v-model="round_arr.postalcode" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
    <el-button @click="hideX">取 消</el-button>
    <el-button type="primary" @click="editDo">确 定</el-button>
  </span>
                </el-dialog>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              background
              @current-change="changePage()"
              :current-page.sync="currentPage1"
              :page-size="5"
              layout="total, prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="游戏商城订单" name="second"  >
          <el-table
            :data="gameArr"
            style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="游戏价格：">
                    <span>{{ props.row.g_price }}</span>
                  </el-form-item>
                  <el-form-item label="游戏类型：">
                    <span>{{ props.row.t_type }}</span>
                  </el-form-item>
                  <el-form-item label="收货人电话：">
                    <span>{{ props.row.u_phone }}</span>
                  </el-form-item>
                  <el-form-item label="合计：">
                    <span>{{ props.row.g_price }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label="订单号"
              prop="o_ordernum">
            </el-table-column>
            <el-table-column
              label="订单时间"
              prop="o_ordertime">
            </el-table-column>
            <el-table-column
              label="游戏名称"
              prop="g_name">
            </el-table-column>
            <el-table-column
              label="收货人"
              prop="u_name">
            </el-table-column>
            <el-table-column
              label="订单状态">
              <template slot-scope="scope">
                <span>{{scope.row.o_orderstatus}}  </span> <i class="el-icon-loading" ></i>
              </template>
            </el-table-column>
            <el-table-column
              label="修改订单"
              prop="Modify">
              <template slot-scope="scope">
                <el-button plain
                           size="mini"
                           type="primary" @click="changeGame(scope.$index,scope.row)">修改</el-button>
                <el-dialog title="修改信息" :visible.sync="centerDialogVisible2" width="37%" center @close="hide">
                  <el-form :model="game_arr" status-icon ref="game_arr">
                    <el-form-item label="订单号：">
                      <el-input v-model="game_arr.o_ordernum" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="订单时间">
                      <el-input v-model="game_arr.o_ordertime" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="游戏名称">
                      <el-input v-model="game_arr.g_name" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="游戏价格">
                      <el-input v-model="game_arr.g_price" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="游戏类型">
                      <el-input v-model="game_arr.t_type" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="收货人：">
                      <el-input v-model="game_arr.u_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码">
                      <el-input v-model="game_arr.u_phone" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
    <el-button @click="hideX">取 消</el-button>
    <el-button type="primary" @click="editDoGame">确 定</el-button>
  </span>
                </el-dialog>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              background
              @current-change="changePage2()"
              :current-page.sync="currentPage2"
              :page-size="5"
              layout="total, prev, pager, next"
              :total="total2">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Order",
    data() {
      return {
        centerDialogVisible: false,
        centerDialogVisible2: false,
        select: '',
        searchstr:'',
        activeName2: 'first',
        roundArr:[],
        gameArr:[],
        round_arr:[],
        game_arr:[],
        total:0,
        total2:0,
        currentPage1:1,
        currentPage2:1,

      };
    },
    created(){
      this.getnum();
      this.getOnePage();
      this.getGameNum();
      this.getOneGamePage();
    },
    methods: {
      handleClick(tab, event) {
        this.getnum();
        this.getGameNum();
        this.getOneGamePage();
        this.getOnePage();
      },

      hideX(){
          this.centerDialogVisible = false;
          this.getnum();
          this.getGameNum();
          this.getOneGamePage();
          this.getOnePage();
      },
      hide(){
        this.hideX();
        console.log(1)
      },
      editShow(i,data){
        this.centerDialogVisible=true;
        this.round_arr=data;
      },
      editDo(){
        //确定弹窗
        this.centerDialogVisible=false;
        this.$axios.get('http://localhost:8081/changeRound',{
          params:{
            a_name:this.round_arr.a_name,
            inTheArea:this.round_arr.inTheArea,
            postalcode:this.round_arr.postalcode,
            a_phone:this.round_arr.a_phone,
            u_id:this.round_arr.u_id
          }
        })
          .then((res)=>{
          })
          .catch((err)=>{
            console.log(err)
          })
      },
      //游戏修改
      changeGame(i,data){
        this.centerDialogVisible2=true;
        this.game_arr=data;
        // console.log(data);
        //记录数据
        //显示弹窗
      },
      editDoGame(){
        //确定弹窗
        this.centerDialogVisible2=false;
        // console.log(this.game_arr)
        this.$axios.get('http://localhost:8081/changeGame',{
          params:{
            u_name:this.game_arr.u_name,
            u_phone:this.game_arr.u_phone,
            u_id:this.game_arr.u_id
          }
        })
          .then((res)=>{
            // this.roundArr=res.data;
            // console.log(res)
          })
          .catch((err)=>{
            console.log(err)
          })
      },
      roundsearch(){
        let str=this.searchstr;
        this.currentPage1=1;
        if(str==''){
          this.getOnePage();
          this.getnum();
        }else {
          this.$axios({
            method:'get',
            url:'http://localhost:8081/getEveryPage',
            params:{
              k:str,
              page:this.currentPage1,
            }
          })
            .then((res)=>{
              this.total=res.data.data.length;
              // console.log(res);
              this.roundArr=res.data.data1;
            }).catch((err)=>{

          })
        }
      },
      getnum:function () {
        this.$axios({
          method:'get',
          url:'http://localhost:8081/getSumPage',
        }).then((res)=>{
          this.total=res.data.count;
        }).catch((err)=>{

        })
      },
      getOnePage:function () {
        this.$axios({
          method: 'get',
          url:'http://localhost:8081/getOnePage',
          params:{
            page:this.currentPage1
          }
        })
          .then((res)=>{
            this.roundArr=res.data.data;
          })
          .catch((err)=>{

          })
      },
      getGameNum:function () {
        this.$axios({
          method:'get',
          url:'http://localhost:8081/getSumGamePage',
        }).then((res)=>{
          this.total2=res.data.count;
        }).catch((err)=>{

        })
      },
      getOneGamePage:function () {
        this.$axios({
          method: 'get',
          url:'http://localhost:8081/getOneGamePage',
          params:{
            page:this.currentPage2
          }
        })
          .then((res)=>{
            this.gameArr=res.data.data1;
          })
          .catch((err)=>{

          })
      },
      changePage(val) {
        let a=this.searchstr;
        let b=this.currentPage1;
        this.$axios({
          method:'get',
          url:'http://localhost:8081/getEveryPage',
          params:{
            k:a,
            page: b
          }
        })
          .then((res)=>{
            this.roundArr=res.data.data1;
          })
          .catch((err)=>{

          })
      },
      changePage2(val) {
        let b=this.currentPage2;
        this.$axios({
          method:'get',
          url:'http://localhost:8081/getEveryGamePage',
          params:{
            page: b
          }
        })
          .then((res)=>{
            this.gameArr=res.data.data1;
          })
          .catch((err)=>{

          })
      },

    },

  }
</script>

<style scoped lang="less">
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  #top{
    margin-top: 15px;
    overflow: hidden;
  }
  #Order-buttom{
    margin-top: 10px;
  }
  .top-right{
    float: right;
    margin-right: 30px;
    margin-top: 18px;
  }
  .el-select {
    width: 100px;
  }
  .el-input{
    width: 450px;
  }
  .block{
    margin-top: 30px;
    text-align: center;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .top-left{
    float: left;
    font-size: 36px;
    margin-top: 10px;
    margin-left: 40px;
  }
</style>
