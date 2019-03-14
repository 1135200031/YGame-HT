<template>
    <div class="y-box">
      <div class="y-name"><p>论坛管理</p></div>
      <div class="y-search">
        <div style=" margin-top: 49px; margin-right: 50px">
          <el-input placeholder="请输入所查询数据" v-model="input5" class="input-with-select" v-on:input ="search">
            <el-select v-model="select" slot="prepend" placeholder="全部" @change="search" value="0" style="width: 100px">
              <el-option label="全部" value="0" ></el-option>
              <el-option label="帖子ID" value="1" ></el-option>
              <el-option label="帖子标题" value="2" ></el-option>
              <el-option label="帖子小组" value="3" ></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
      <div class="y-subject">
          <el-table :data="arr" stripe style="width: 100%">
              <el-table-column type="index" label="序号" width="100px"></el-table-column>
              <el-table-column prop="p_id" label="ID" width="100px"></el-table-column>
              <el-table-column prop="p_text" label="标题" width="250px"></el-table-column>
              <el-table-column prop="a_name" label="小组" width="350px"></el-table-column>
              <el-table-column prop="details" label="详情" width="100px">
                <template slot-scope="scope">
                  <el-button @click="details(scope.row)"
                             type="text" size="small"
                             style="color: paleturquoise">
                    <i class="icon iconfont icon-chakan" style="font-size: 18px"></i>
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="comment" label="评论" width="100px">
                <template slot-scope="scope">
                  <el-button  @click="comment(scope.row)" type="text" index-id="this.p_id" size="small"
                              style="color: paleturquoise">
                    <i class="icon iconfont icon-chakan" style="font-size: 18px"></i>
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="delete" label="删除" width="100px">
                <template slot-scope="scope">
                  <el-button @click="open2(scope.row)" type="text" size="small" style="color: red">
                    <i class="icon iconfont icon-shanchu" style="font-size: 20px"></i>
                  </el-button>
                </template>
              </el-table-column>
          </el-table>
        <!--分页-->
          <div class="y-button">
            <el-pagination
              @current-change="changePage()"
              background
              :current-page.sync="currentPage1"
              :page-size="5"
              layout="total, prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
      </div>
      <!--评论弹框-->
      <div>
        <el-dialog title="评论管理" :visible.sync="dialogTableVisible" width="1200px">
          <el-table :data="arr3">
            <el-table-column type="index" label="序号" width="100px"></el-table-column>
            <el-table-column property="pm_id" label="ID" width="100px"></el-table-column>
            <el-table-column property="pm_message" label="内容" width="300px"></el-table-column>
            <el-table-column property="pm_date" label="发布时间" width="200px"></el-table-column>
            <el-table-column property="u_nickName" label="发布昵称" width="200px"></el-table-column>
            <el-table-column property="pm_give" label="点赞数" width="100px"></el-table-column>
            <el-table-column property="address" label="删除">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small" style="color: red">
                  <i class="icon iconfont icon-shanchu" style="font-size: 20px"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>

      </div>
      <!--详情弹框-->
      <div class="y-details">
        <el-dialog title="详情" :data="arr2" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
          <p>发布人：{{arr2.u_nickName}}</p>
          <p>发布小组：{{arr2.a_name}}</p>
          <p>小组类型：{{arr2.a_type}}</p>
          <p>发布时间：{{arr2.p_date}}</p>
          <p>点赞数：{{arr2.p_fabulous}}</p>
          <p>发布标题：{{arr2.p_text}}</p>
          <p>发布内容：{{arr2.p_message}}</p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
      </el-dialog>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Forum",
        data() {
          return {
            input5: '',
            arr:[],
            arr2:[],
            arr3:[],
            select:'',
            total:0,
            currentPage1: 1,
            dialogTableVisible: false,
            dialogVisible:false,
          }
        },
        created(){
            // this.$axios.get('http://localhost:8081/y_forum')
            //   .then((res)=>{
            //     this.arr=res.data
            //   });

          this.motherfuck();
          this.fatherfuck();
        },
        methods: {
          handleClose(done) {
            this.$confirm('确认关闭？')
              .then(_ => {
                done();
              })
              .catch(_ => {});
          },
          open2(val) {
            let id=val.p_id;
            this.$confirm('此操作将永久删除该帖子, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then((val) => {
              this.$axios.get('http://localhost:8081/y_delete',{
                params:{
                  id:id
                }
              })
                .then((res)=>{
                  if(res.data.error==0){
                    this.motherfuck();
                    this.fatherfuck();
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                  }else {
                    this.$message({
                      type: 'info',
                      message: '此帖子有留言，不能删除！'
                    });
                  }
                }).catch(()=>{

              });

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          changePage(val){
            let a=this.input5;
            let b=this.select;
            this.$axios.get('http://localhost:8081/y_comment',{
              params:{
                k:a,
                page:this.currentPage1,
                so:b
              }
            })
              .then((res)=>{
                this.arr=res.data.data1
              })

          },
          search:function () {
            let a=this.input5;
            let b=this.select;
            this.currentPage1=1;
            if(a==''){
              this.motherfuck();
              this.fatherfuck();
            }else if(b==1){
              this.$axios.get('http://localhost:8081/y_comment',{
                params:{
                  k:a,
                  page:this.currentPage1,
                  so:b
                }
              })
                .then((res)=>{
                  this.total=res.data.data.length;
                  this.arr=res.data.data1
                })
            }else if(b==2){
              this.$axios.get('http://localhost:8081/y_comment',{
                params:{
                  k:a,
                  page:this.currentPage1,
                  so:b
                }
              })
                .then((res)=>{
                  this.total=res.data.data.length;
                  this.arr=res.data.data1
                })
            }else if(b==3){
              this.$axios.get('http://localhost:8081/y_comment',{
                params:{
                  k:a,
                  page:this.currentPage1,
                  so:b
                }
              })
                .then((res)=>{
                  this.total=res.data.data.length;
                  this.arr=res.data.data1
                })
            }else if(b==0){
              this.$axios.get('http://localhost:8081/y_comment',{
                params:{
                  k:a,
                  page:this.currentPage1,
                  so:b
                }
              })
                .then((res)=>{
                  this.total=res.data.data.length;
                  this.arr=res.data.data1
                })
            }
          },
          motherfuck:function () {
            this.$axios.get('http://localhost:8081/y_forumunm')
              .then((res)=>{
                this.total=res.data.count
              });
          },
          fatherfuck:function () {
            this.$axios.get('http://localhost:8081/y_forum',{
              params:{
                page:this.currentPage1
              }
            })
              .then((res)=>{
                this.arr=res.data.data
              })
          },
          leaving:function(id){
            this.$axios('http://localhost:8081/y_Leaving',{
              params:{
                id:id
              }
            })
              .then((res)=>{

                this.arr3=res.data.data
              })
          },
          details(res){
            this.dialogVisible=true;
            this.arr2=res
          },
          comment(res){
            this.dialogTableVisible = true;
            let id=res.p_id;
            this.leaving(id);
          },
          handleClick(res){
            let a=res.pm_id;
            let id=res.p_id;
            this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then((val) => {
              this.$axios.get('http://localhost:8081/y_deleteLeaving',{
                params:{
                  id:a
                }
              })
                .then((res)=>{
                  this.leaving(id);
                  // this.motherfuck();
                  // this.fatherfuck();
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }).catch(()=>{

              });

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }
        }
    };

</script>

<style scoped lang="less">
  .el-select{
    width: 130px;
  }
  .input-with-select{
    background-color: #fff;
  }
  .y-box{
    width: 100%;
    height: 100%;
    .y-name{
      width: 50%;
      height: 115px;
      float: left;
      p{
        font-size: 38px;
        text-align: left;
        margin-left: 50px;
        margin-top: 40px;
      }
    }
    .y-search{
      width: 50%;
      height: 115px;
      float: left;
    }
    .y-subject{
      margin-left:40px;
      margin-right: 40px;
      .y-button{
        div{
          float: right;
          margin-top: 60px;
          margin-bottom: 60px;
          margin-right: 60px;
        }
      }
    }
    .y-details{
      p{
        line-height: 30px;
      }
    }
  }
</style>
