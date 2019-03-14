<template>
  <div id="x-box">
    <div id="x-top">
      <h1 class="x-left">周边商品</h1>
      <div class="x-right">
        <el-input placeholder="请输入所需查询数据" v-model="input5" class="input-with-select" v-on:input ="searchX">
          <el-select v-model="select" slot="prepend" placeholder="全部" @change="searchX" value="0">
            <el-option label="全部" value="0" ></el-option>
            <el-option label="商品编号" value="1" ></el-option>
            <el-option label="商品名称" value="2" ></el-option>
            <el-option label="商品价格" value="3" ></el-option>
            <el-option label="商品类型" value="4" ></el-option>
            <el-option label="促销价" value="5" ></el-option>
          </el-select>
        <el-button slot="append"><i class="iconfont icon-sousuo"></i></el-button>
        </el-input>
        <div class="x-add">
        <el-button @click="addXShow()">
          <i class="iconfont icon-tianjia"></i><span>新增</span>
        </el-button></div>
      </div>
    </div>
    <div id="x-middle">
      <el-table
        :data="arrx"
        stripe
        style="width: 100%">
        <el-table-column
          prop="m_id"
          label="商品编号"
          width="100">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="m_show"-->
          <!--label="商品展示图"-->
          <!--width="100">-->
            <!--<template slot-scope="scope">-->
              <!--<img :src="'../../static/images/'+scope.row.m_show" style="width: 44px;height:44px">-->
            <!--</template>-->
          <!--</el-table-column>-->
        <el-table-column
          prop="m_name"
          label="商品名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="m_cost"
          label="商品价格">
        </el-table-column>
        <el-table-column
          prop="m_type"
          label="商品类型">
        </el-table-column>
        <el-table-column
          prop="m_price"
          label="促销价">
        </el-table-column>
        <el-table-column
          prop="x_see"
          label="查看">
          <template slot-scope="scope">
            <el-button @click="details(scope.row)" type="text" size="small">
              <i class="iconfont icon-chakan" style="color: paleturquoise; font-size: 18px"></i></el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="x_edit"
          label="编辑">
          <template slot-scope="scope">
            <el-button @click="editShow(scope.$index,scope.row)" type="text" size="small">
              <i class="iconfont icon-edit" style="color: green; font-size: 18px"></i></el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="X_upper"
          label="已上架">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showup(scope.$index,scope.row)">
              <i class="iconfont icon-shangjia" style="color: red; font-size: 20px"></i></el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="X_lower"
          label="已下架">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showdown(scope.$index,scope.row)">
              <i class="iconfont icon-xiajia" style="color: red; font-size: 20px"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!---分页--->
    <div id="x-bottom">
      <el-pagination
        background
        @size-change="handX"
        :current-page.sync="currentPage1"
        @current-change="changeX()"
        :page-size="5"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <!---编辑弹框--->
    <div id="editX" >
      <el-dialog title="编辑商品信息" :visible.sync="dialogFormVisible" @close="hideX">
        <el-form :model="arrX4">
          <el-form-item label="商品编号" :label-width="formLabelWidth">
            <el-input v-model="arrX4.m_id" autocomplete="off" placeholder="" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="arrX4.m_name" autocomplete="off" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="商品价格" :label-width="formLabelWidth">
            <el-input v-model="arrX4.m_cost" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品类型" :label-width="formLabelWidth">
            <el-select v-model="arrX4.m_type" placeholder="请选择商品类型">
              <el-option label="周边" value="周边"></el-option>
              <el-option label="促销" value="促销"></el-option>
              <el-option label="热门" value="热门"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="促销价" :label-width="formLabelWidth">
            <el-input v-model="arrX4.m_price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品状态" :label-width="formLabelWidth">
            <el-select v-model="arrX4.m_state" placeholder="请选择商品状态">
              <el-option label="已上架" value="已上架"></el-option>
              <el-option label="已下架" value="已下架"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品库存" :label-width="formLabelWidth">
            <el-input v-model="arrX4.m_surplus" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商标" :label-width="formLabelWidth">
            <el-input v-model="arrX4.m_trademark" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="品牌标签" :label-width="formLabelWidth">
            <el-input v-model="arrX4.m_tag" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="editXh">取 消</el-button>
          <el-button type="primary" @click="editX">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!---新增弹框--->
    <div id="addX">
      <el-dialog title="新增商品" :visible.sync="addButton">
        <el-form >
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="arrX5.m_name" autocomplete="off" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" :label-width="formLabelWidth">
            <el-input v-model="arrX5.m_cost" autocomplete="off" placeholder="请输入商品价格"></el-input>
          </el-form-item>
          <el-form-item label="商品类型" :label-width="formLabelWidth">
            <el-select v-model="arrX5.m_type" placeholder="请选择商品类型">
              <el-option label="周边" value="周边"></el-option>
              <el-option label="促销" value="促销"></el-option>
              <el-option label="热门" value="热门"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="促销价" :label-width="formLabelWidth">
            <el-input v-model="arrX5.m_price" autocomplete="off" placeholder="请输入商品促销价格"></el-input>
          </el-form-item>
          <el-form-item label="商品库存" :label-width="formLabelWidth">
            <el-input v-model="arrX5.m_surplus" autocomplete="off" placeholder="请输入商品库存"></el-input>
          </el-form-item>
          <el-form-item label="商标" :label-width="formLabelWidth">
            <el-input v-model="arrX5.m_trademark" autocomplete="off" placeholder="请输入商品商标"></el-input>
          </el-form-item>
          <el-form-item label="品牌标签" :label-width="formLabelWidth">
            <el-input v-model="arrX5.m_tag" autocomplete="off" placeholder="请输入商品品牌标签"></el-input>
          </el-form-item>
        </el-form>
        <div id="add">
          <h4>上传图片</h4>
            <el-upload
              style="width: 400px;display: inline-block"
              class="upload-demo"
              ref="upload"
              :multiple="true"
              action="http://localhost:8081/upload9"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addButton = false">取 消</el-button>
          <el-button type="primary" @click="addX">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!---查看弹框--->
    <div class="lookX">
      <el-dialog title="查看详情" :data="arrX2" :visible.sync="dialogVisible" width="40%" :before-close="handleCloseX">
        <p>商品编号：{{arrX2.m_id}}</p>
        <p>商品名称：{{arrX2.m_name}}</p>
        <p>商品类型：{{arrX2.m_type}}</p>
        <p>商品价格：{{arrX2.m_cost}}</p>
        <p>促销价格：{{arrX2.m_price}}</p>
        <p>商品库存：{{arrX2.m_surplus}}</p>
        <p>商品状态：{{arrX2.m_state}}</p>
        <p>商品库存：{{arrX2.m_surplus}}</p>
        <p>商标：{{arrX2.m_trademark}}</p>
        <p>品牌标签：{{arrX2.m_tag}}</p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
      </el-dialog>
    </div>

    <!---已上架弹框--->
    <el-dialog
      title="提示"
      :visible.sync="upperXVisible"
      width="30%"
      :data="arrX6"
      center>
      <p>你确定要上架<i style="font-size: 16px;color: red">{{arrX6.m_name}}</i>商品？</p>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="upperX">确 定</el-button>
          <el-button @click="upperXVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!---已下架弹框--->
    <el-dialog
      title="提示"
      :visible.sync="LowerXVisible"
      width="30%"
      :data="arrX6"
      center>
      <p>您确定要下架 <i style="font-size: 16px;color: red">{{arrX6.m_name}}</i> 商品？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="lowerX">确 定</el-button>
        <el-button @click="LowerXVisible = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "Order",
      data() {
    return {
      input5:'',
      select: '',
      total:0,
      currentPage1: 1,
      arrx:[],
      arrX2:[],
      arrX3:[],
      arrX4:[],
      arrX5:[{
        m_id:'',
        m_name:'',
        m_cost:'',
        m_price:'',
        m_surplus:'',
        m_type:'',
        m_trademark:'',
        m_tag:'',
      }],
      arrX6:[],
      dialogVisible:false,
      dialogFormVisible: false,
      addButton:false,
      upperXVisible:false,
      LowerXVisible:false,
      gridData:[],
      formLabelWidth: '120px',
      imgX: [{name: '', url: ''}, {name: '', url: ''}],
      img:[],
      mid:''
    }
  },
    //序号自增
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {

      },
      handleSizeChange(val) {
      },
      handleChange(file, fileList) {
        this.img.push(file.name);
      },

      indexMethod(index) {
        return index * 1;
      },
      hideX(){
        this.editXh();
      },
      handX(val){
        console.log(`每页${val}条`);
      },
      changeX(val){
        let a=this.input5;
        let b=this.select;
        this.$axios({
          method:'get',
          url:'http://localhost:8081/loginoneX',
          params:{
            k:a,
            page:this.currentPage1,
            so:b
          }
        })
          .then((res)=>{
            this.arrx=res.data.data1;
          }).catch((err)=>{
            console.log('出错了'+err)
        })
      },
      searchX:function () {
        let a=this.input5;
        let b=this.select;
        this.currentPage1=1;
        if(a==''){
          this.mothX();
          this.fathX();
        }else if (b==1){
          this.$axios({
            method:'get',
            url:'http://localhost:8081/loginoneX',
            params:{
              k:a,
              page:this.currentPage1,
              so:b
            }
          })
            .then((res)=>{
              this.total=res.data.data.length;
              this.arrx=res.data.data1;
            }).catch((err)=>{
              // console.log('出错了'+err)
          });
        }else if (b==2){
          this.$axios({
            method:'get',
            url:'http://localhost:8081/loginoneX',
            params:{
              k:a,
              page:this.currentPage1,
              so:b
            }
          })
            .then((res)=>{
              this.total=res.data.data.length;
              this.arrx=res.data.data1;
            }).catch((err)=>{
            // console.log('出错了'+err)
          })
        }else if (b==3) {
          this.$axios({
            method: 'get',
            url: 'http://localhost:8081/loginoneX',
            params: {
              k: a,
              page: this.currentPage1,
              so: b
            }
          })
            .then((res) => {
              this.total = res.data.data.length;
              this.arrx = res.data.data1;
            }).catch((err) => {
            // console.log('出错了' + err)
          })
        }else if (b==0){
          this.$axios({
            method:'get',
            url:'http://localhost:8081/loginoneX',
            params:{
              k:a,
              page:this.currentPage1,
              so:b
            }
          })
            .then((res)=>{
              this.total=res.data.data.length;
              this.arrx=res.data.data1;
            }).catch((err)=>{
            // console.log('出错了'+err)
          })
        }else if (b==4) {
          this.$axios({
            method: 'get',
            url: 'http://localhost:8081/loginoneX',
            params: {
              k: a,
              page: this.currentPage1,
              so: b
            }
          })
            .then((res) => {
              this.total = res.data.data.length;
              this.arrx = res.data.data1;
            }).catch((err) => {
            // console.log('出错了' + err)
          })
        }else if (b==5) {
          this.$axios({
            method: 'get',
            url: 'http://localhost:8081/loginoneX',
            params: {
              k: a,
              page: this.currentPage1,
              so: b
            }
          })
            .then((res) => {
              this.total = res.data.data.length;
              this.arrx = res.data.data1;
            }).catch((err) => {
            // console.log('出错了' + err)
          })
        }
      },
      handleCloseX(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      details(res){
        this.dialogVisible=true;
        this.arrX2=res
      },
      editShow(i,data){
        this.dialogFormVisible=true;
        this.arrX4=data;
        // console.log(i,data)
      },
      addXShow(i,data){
        this.addButton=true;
      },
      addX(){
        if(this.arrX5.m_name==undefined||this.arrX5.m_cost==undefined||this.arrX5.m_type==undefined||this.arrX5.m_price
          ==undefined||this.arrX5.m_surplus==undefined || this.arrX5.m_trademark==undefined || this.arrX5.m_tag==undefined){
          this.$message({
            type: 'warning',
            message: '所有信息都不能为空!',
          })
        }else {

          this.$axios.get('http://localhost:8081/addX',{
            params:{
              m_name:this.arrX5.m_name,
              m_cost:this.arrX5.m_cost,
              m_type:this.arrX5.m_type,
              m_price:this.arrX5.m_price,
              m_surplus:this.arrX5.m_surplus,
              m_trademark:this.arrX5.m_trademark,
              m_tag:this.arrX5.m_tag,
              img:this.img
            }
          })
            .then((res)=>{
              console.log(res.data)
                this.$axios.get('http://localhost:8081/addinformtion',{
                  params:{
                    xmid:res.data.insertId
                  }
                }).then((res)=>{
                  console.log(res)
                });


              this.$message({
                type: 'success',
                message: '新增成功！！!',
              });
              this.arrX5.m_type='';
                this.arrX5.m_cost='';
                this.arrX5.m_name='';
                this.arrX5.m_price='';
                this.arrX5.m_surplus='';
                this.arrX5.m_trademark='';
                this.arrX5.m_tag='';
            })
            .catch((err)=>{
              this.$message({
                type: 'warning',
                message: '新增失败！',
              })
            });
          this.addButton=false;
        }
      },
      editX(){
        this.dialogFormVisible=false;
        this.$axios.get('http://localhost:8081/changeEditX',{
          params:{
            m_name:this.arrX4.m_name,
            m_cost:this.arrX4.m_cost,
            m_type:this.arrX4.m_type,
            m_price:this.arrX4.m_price,
            m_id:this.arrX4.m_id,
            m_state:this.arrX4.m_state,
            m_surplus:this.arrX4.m_surplus,
            m_trademark:this.arrX4.m_trademark,
            m_tag:this.arrX4.m_tag,
          }
        })
          .then((res)=>{
            this.mothX();
            this.fathX();
          })
          .catch((err)=>{
            console.log(err)
          })
      },
      editXh(){
        this.dialogFormVisible = false;
        this.mothX();
        this.fathX();
      },
      showup(i,data){
        this.upperXVisible=true;
        this.arrX6=data;
      },
      showdown(i,data){
        this.LowerXVisible=true;
        this.arrX6=data;
      },
      upperX(){
        this.upperXVisible = false;
        this.$axios.get('http://localhost:8081/upperX',{
          params:{
            m_id:this.arrX6.m_id
          }
        }).then((res)=>{
          this.mothX();
          this.fathX();
        })
      },
      lowerX(){
        this.LowerXVisible = false;
        this.$axios.get('http://localhost:8081/lowerX',{
          params:{
            m_id:this.arrX6.m_id
          }
        }).then((res)=>{
          this.mothX();
          this.fathX();
        })
      },
      mothX:function () {
        this.$axios({
          method:'get',
          url:'http://localhost:8081/searchnumX'
        })
          .then((res)=>{
            this.total=res.data.count;
          }).catch((err)=>{
            console.log('出错了'+err)
        });
      },
      fathX:function () {
        this.$axios({
          method:'get',
          url:'http://localhost:8081/searchthisX',
          params: {
            page: this.currentPage1
          }
        })
          .then((res)=>{
            this.arrx=res.data.data;
          }).catch((err)=>{

        })
      },


    },
    //获取后台数据
    created(){
      this.$axios.get('http://localhost:8081/roundX')
        .then((res)=>{
          this.arrx=res.data
        });
      this.mothX();
      this.fathX();
    }
  }
</script>

<style scoped lang="less">
  #x-box{
    width: 100%;
    height: 98%;
  }
  #x-top{
    margin-top: 30px;
  }
  .x-left{
    float: left;
    font-size: 36px;
    font-weight: normal;
    margin-left: 40px;
  }
  .x-right{
    float: right;
    margin-right: 30px;
  }
  .el-input{
    width: 370px;
  }
  .el-select{
    width: 110px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .x-add{
    display: inline;
    height: 35px;
    span{
      margin-left: 10px;
    }
  }
  #x-middle{
    width: 94%;
    margin-left: 3%;
    margin-top: 30px;
    float: left;
  }
  #x-bottom{
    float: right;
    margin-top: 4%;
    margin-right: 2%;
  }
  .lookX{
    p{
      line-height: 30px;
    }
  }
  .el-form-item .el-select{
    width: 370px;
  }
  #add{
    margin-left: 8%;
    h4{
      float: left;
      margin-right: 20px;
    }
  }
</style>
