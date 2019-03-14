<template>
  <div id="Cus-bgtwo">
    <div id="Cus-two">
      <div id="Cus-two-body">
        <div id="Cus-two-body-top">
          <h2>用户历史订单记录
            <i class="el-icon-close close-this" @click="back"></i>
          </h2>
        </div>
        <div id="Cus-two-body-mid">
          <el-table
            :data="tableData2"
            border
            style="width: 100%">
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
              prop="o_ordernum"
              label="订单号"
              width="400px"
              header-align="center" align='center' >
            </el-table-column>
            <el-table-column
              prop="o_ordertime"
              label="订单时间" header-align="center" align='center'>
            </el-table-column>
          </el-table>
        </div>
        <div id="Cus-two-body-bot" style="text-align: center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="5"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Customerone",
      data(){
          return{
            currentPage1: 1,
            total:0,
            tableData2:[{}]
          }
      },
      created(){
        let n = this.$route.query.cusid;
       let m=this.$route.query.nickname;

        this.$axios({
          method:'get',
          url:'http://localhost:8081/searchcusnum',
          params:{
            num:n,
          }
        })
          .then((res)=>{

            this.total=res.data.data.length
          }).catch((err)=>{
          console.log('报错了:'+err)
        });

        this.$axios({
          method:'get',
          url:'http://localhost:8081/searchcusthis',
          params:{
            num:n,
            page:this.currentPage1
          }
        })
          .then((res)=>{
            let arr=res.data.data1;
            for(let i=0;i<arr.length;i++){
              arr[i].u_nickName=m;
              this.tableData2.push(arr[i])
            }
            this.tableData2.splice(0,1);


          }).catch((err)=>{
          console.log('报错了666:'+err)
        });

      },

      methods:{
          back(){
            // console.log(this.$route.query.cusid);
            this.$router.back(-1);
          },
        handleSizeChange(val) {
          // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          let n = this.$route.query.cusid;
          let m=this.$route.query.nickname;

          this.$axios({
            method:'get',
            url:'http://localhost:8081/searchcusthis',
            params:{
              num:n,
              page:this.currentPage1
            }
          })
            .then((res)=>{
              let arr=res.data.data1;
              for(let i=0;i<arr.length;i++){
                arr[i].u_nickName=m;
                this.tableData2.push(arr[i])
              }
              this.tableData2=arr;


            }).catch((err)=>{
            console.log('报错了:'+err)
          });
        },
        fuckyou(){

        },
        fuckhim(){

        }
      },

    }
</script>

<style scoped>
  #Cus-bgtwo{
    width: 100%;
    height: 621px;
  }
  #Cus-two{
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,0.7);

    overflow: hidden;
  }
  #Cus-two-body{
    width: 1000px;
    height: 481px;
    margin: 70px auto 0 auto ;
    background-color: whitesmoke;
    border-radius: 4px;
    border: 1px solid #ebeef5;
  }
  #Cus-two-body h2{
    text-align: center;

  }
  #Cus-two-body h2 i{
    float: right;
    margin-top: 5px;
  }
  #Cus-two-body-top{
    width: 1000px;
    height: 35px;
    border-bottom: 1px solid gray;
    line-height:35px ;
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
