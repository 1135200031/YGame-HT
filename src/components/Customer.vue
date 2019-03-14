<template>
    <div id="Cus-bgone">
      <div id="Cus-body">
        <h3>用户管理</h3>
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入所需查询数据" v-model="input5" class="input-with-select" v-on:input ="search">
            <el-select v-model="select" slot="prepend" placeholder="全部" @change="search" value="0">
              <el-option label="全部" value="0" ></el-option>
              <el-option label="用户id" value="1" ></el-option>
              <el-option label="用户昵称" value="2" ></el-option>
              <el-option label="用户邮箱" value="3" ></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" ></el-button>
          </el-input>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"  class="Cus-table">
          <el-table-column
            prop="u_id"
            label="用户ID"
            width="180" header-align="center" align='center'>
          </el-table-column>
          <el-table-column
            prop="u_nickName"
            label="用户昵称"
            width="180" header-align="center" align='center'>
          </el-table-column>
          <el-table-column
            prop="u_mail"
            label="用户邮箱"
            width="400px"

            header-align="center" align='center' >
          </el-table-column>
          <el-table-column
            prop="lookit"
            label="历史订单" header-align="center" align='center' datafld="">
            <template slot-scope="scope">
              <el-button @click="show(scope.$index,scope.row)" type="text">
                <i class="el-icon-view">查询历史记录</i></el-button>
            </template>
          </el-table-column>


        </el-table>
        <div class="block">

          <el-pagination
            @size-change="handleSizeChange"
            :current-page.sync="currentPage1"
            @current-change="changePage()"
            :page-size="5"
            layout=" total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>

      </div>
    </div>
</template>

<script>
    export default {
        name: "Customer",
      data() {
        return {
          input5: '',
          select: '',
          total:0,
          currentPage1: 1,
          tableData: [{}],
        }
      },
      created(){
        // this.$axios.get('http://localhost:8081/loginid')
        //   .then((res)=>{
        //     this.tableData=res.data
        //   }).catch((err)=>{
        // });
        this.motherfuck();
        this.fatherfuck();


      },
      methods:{
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        changePage(val) {
          let a=this.input5;
          let b=this.select;
          this.$axios({
            method:'get',
            url:'http://localhost:8081/loginidone',
            params:{
              k:a,
              page:this.currentPage1,
              so:b
            }
          })
            .then((res)=>{
              this.tableData=res.data.data1;
            }).catch((err)=>{

          });
        },
        show:function (s,q) {

            this.$router.push({path:'/customerone', query:{cusid:q.u_id,nickname:q.u_nickName}});
        },

        search:function () {
            let a=this.input5;
            let b=this.select;
            this.currentPage1=1;
            if(a==''){

              this.motherfuck();
              this.fatherfuck();

            }else if(b==1){

              this.$axios({
                method:'get',
                url:'http://localhost:8081/loginidone',
                params:{
                  k:a,
                  page:this.currentPage1,
                  so:b
                }
              })
                .then((res)=>{
                  this.total=res.data.data.length;
                  this.tableData=res.data.data1;

                }).catch((err)=>{

              });
            }else if(b==2){
              this.$axios({
                method:'get',
                url:'http://localhost:8081/loginidone',
                params:{
                  k:a,
                  page:this.currentPage1,
                  so:b
                }
              })
                .then((res)=>{
                  this.total=res.data.data.length;
                  this.tableData=res.data.data1;

                }).catch((err)=>{

              });
            }else if(b==3){
              this.$axios({
                method:'get',
                url:'http://localhost:8081/loginidone',
                params:{
                  k:a,
                  page:this.currentPage1,
                  so:b
                }
              })
                .then((res)=>{
                  this.total=res.data.data.length;
                  this.tableData=res.data.data1;
                }).catch((err)=>{
              });
            }else if(b==0){
              this.$axios({
                method:'get',
                url:'http://localhost:8081/loginidone',
                params:{
                  k:a,
                  page:this.currentPage1,
                  so:b
                }
              })
                .then((res)=>{
                  this.total=res.data.data.length;
                  this.tableData=res.data.data1;
                }).catch((err)=>{
              });
            }
        },

        motherfuck:function () {
          this.$axios({
            method:'get',
            url:'http://localhost:8081/searchpagenum',
          })
            .then((res)=>{
              this.total=res.data.count;
            }).catch((err)=>{

          });
        },
        fatherfuck:function () {
          this.$axios({
            method:'get',
            url:'http://localhost:8081/searchpagethis',
            params:{
              page:this.currentPage1
            }
          })
            .then((res)=>{
              this.tableData=res.data.data;
            }).catch((err)=>{

          });
        }

      },


    }
</script>

<style scoped lang="less">
   #Cus-bgone{
     width: 100%;
     height: 621px;
     overflow: auto;
     position: relative;
   }
   #Cus-body{
     width: 1000px;
     height: 100%;
     margin: 70px auto 0 auto ;


   }

   .el-input{
     width: 450px;
   }
   .el-select{
     width: 110px;
   }
   .el-table{
     margin-top: 10px;
   }
   .el-pagination{
     margin-top: 20px;
   }

   .input-with-select .el-input-group__prepend {
     background-color: #fff;
   }
</style>
