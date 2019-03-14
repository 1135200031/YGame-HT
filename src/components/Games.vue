<template>
  <div id="g-box">
    <div id="g-top" class="clearfix">
      <h1 class="g-left">游戏商品</h1>
      <div class="g-right">
        <el-input placeholder="请输入关键字" v-model="input5" class="input-with-select">
          <el-button slot="append" @click="search()"><i class="iconfont icon-sousuo"></i></el-button>
        </el-input>
      </div>
      <div class="g-add">
        <el-button  @click="addVisible=true">
          <i class="iconfont icon-tianjia"></i><span>新增</span>
        </el-button>
      </div>
    </div>
    <div id="g-bottom" class="clearfix">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">

        <el-table-column
          prop="g_id"
          label="商品编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="g_name"
          label="商品名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="g_price"
          label="商品价格">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="g_salePrice"-->
          <!--label="促销价">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="g_state"
          label="商品状态">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="x_see"-->
          <!--label="查看">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button @click="showSee(scope.$index,scope.row)" type="text" size="small">-->
              <!--<i class="iconfont icon-chakan" style="color: paleturquoise"></i></el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          prop="x_edit"
          label="编辑">
          <template slot-scope="scope">
            <el-button @click="showEdit(scope.$index,scope.row)" type="text" size="small">
              <i class="iconfont icon-edit" style="color: green"></i></el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="x_de"
          label="上架">
          <template slot-scope="scope">
            <el-button @click="showUpper(scope.$index,scope.row)" type="text" size="small">
              <i class="iconfont icon-shangjia" style="color: #5eff4b"></i></el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="x_delete"
          label="下架">
          <template slot-scope="scope">
            <el-button @click="showLower(scope.$index,scope.row)" type="text" size="small">
              <i class="iconfont icon-xiajia" style="color: red"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block g-block">
      <el-pagination
        @size-change="handleSizeChange"
        :current-page.sync="currentPage1"
        @current-change="changePage()"
        :page-size="5"
        layout="total,prev, pager, next"
        :total="pages">
      </el-pagination>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="upperVisible"
      width="30%"
      :data="gameArr"
      center>
      <span>你确定要上架<b style="font-size: 16px">{{gameArr.g_name}}</b>商品？</span>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="upper()">确 定</el-button>
          <el-button @click="upperVisible = false">取 消</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="LowerVisible"
      width="30%"
      :data="gameArr"
      center>
      <span>你确定要下架 <b style="font-size: 16px">{{gameArr.g_name}}</b> 商品？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Lower()">确 定</el-button>
        <el-button @click="LowerVisible = false">取 消</el-button>

  </span>
    </el-dialog>
    <el-dialog title="添加游戏" :visible.sync="addVisible"  width="70%" style="text-align: center">
      <el-form :inline="true" :model="addArr" class="demo-form-inline" label-position="right">
        <el-form-item label="游戏名称" label-width="120px">
          <el-input v-model="addArr.g_name" ></el-input>
        </el-form-item>
        <el-form-item label="英文名称" label-width="120px">
          <el-input v-model="addArr.g_en_name" ></el-input>
        </el-form-item>
        <el-form-item label="发行时间" label-width="120px">
          <el-col>
            <el-date-picker type="date" placeholder="选择日期" v-model="addArr.g_time" value-format="yyyy-MM-dd" ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="游戏状态" label-width="120px">
          <el-select v-model="addArr.g_state" placeholder="请选择游戏状态" style="width: 300px">
            <el-option label="上架" value="上架"></el-option>
            <el-option label="下架" value="下架"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="游戏价格" label-width="120px">
          <el-input v-model="addArr.g_price" ></el-input>
        </el-form-item>
        <el-form-item label="发行商 " label-width="120px">
          <el-input v-model="addArr.g_publisher" ></el-input>
        </el-form-item>
        <el-form-item label="开发商 " label-width="120px">
          <el-input v-model="addArr.g_developer" ></el-input>
        </el-form-item>
        <el-form-item label="游戏操作系统" label-width="120px">
          <el-input v-model="addArr.g_system" ></el-input>
        </el-form-item>
        <el-form-item label="游戏内存" label-width="120px">
          <el-input v-model="addArr.g_memory" ></el-input>
        </el-form-item>
        <el-form-item label="游戏处理器" label-width="120px">
          <el-input v-model="addArr.g_processor" ></el-input>
        </el-form-item>
        <el-form-item label="游戏DirectX版本" label-width="120px">
          <el-input v-model="addArr.g_directX" ></el-input>
        </el-form-item>
        <el-form-item label="游戏图形" label-width="120px">
          <el-input v-model="addArr.g_image" ></el-input>
        </el-form-item>
        <el-form-item label="游戏硬盘" label-width="120px">
          <el-input v-model="addArr.g_disk" ></el-input>
        </el-form-item>
        <el-form-item label="游戏声卡" label-width="120px">
          <el-input v-model="addArr.g_soundCard" ></el-input>
        </el-form-item>
        <el-upload
          style="width: 400px;display: inline-block"
          class="upload-demo"
          ref="upload2"
          :multiple="true"
          action="http://localhost:8081/upload8"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleChange1"
          :file-list="fileList2"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取封面和背景图片</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload2">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-upload
          style="width: 400px;display: inline-block"
          class="upload-demo"
          ref="upload"
          :multiple="true"
          action="http://localhost:8081/upload8"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取轮播图图片</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <el-form-item label="游戏类型" prop="type">
          <el-checkbox-group v-model="addArr.type" >
            <el-checkbox label="动作" name="type"></el-checkbox>
            <el-checkbox label="策略" name="type"></el-checkbox>
            <el-checkbox label="角色扮演" name="type"></el-checkbox>
            <el-checkbox label="VR" name="type"></el-checkbox>
            <el-checkbox label="4X" name="type"></el-checkbox>
            <el-checkbox label="休闲" name="type"></el-checkbox>
            <el-checkbox label="体育" name="type"></el-checkbox>
            <el-checkbox label="冒险" name="type"></el-checkbox>
            <el-checkbox label="单机多人" name="type"></el-checkbox>
            <el-checkbox label="历史" name="type"></el-checkbox>
            <el-checkbox label="回合" name="type"></el-checkbox>
            <el-checkbox label="多人" name="type"></el-checkbox>
            <el-checkbox label="家庭" name="type"></el-checkbox>
            <el-checkbox label="射击" name="type"></el-checkbox>
            <el-checkbox label="开放世界" name="type"></el-checkbox>
            <el-checkbox label="战争" name="type"></el-checkbox>
            <el-checkbox label="日系" name="type"></el-checkbox>
            <el-checkbox label="模拟" name="type"></el-checkbox>
            <el-checkbox label="科幻" name="type"></el-checkbox>
            <el-checkbox label="竞速" name="type"></el-checkbox>
            <el-checkbox label="第一人称" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="游戏系统：" prop="os" label-width="120px">
          <el-checkbox-group v-model="addArr.os" >
            <el-checkbox label="Win" name="os"></el-checkbox>
            <el-checkbox label="Linux" name="os"></el-checkbox>
            <el-checkbox label="Mac" name="os"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="游戏语言：" prop="language" label-width="120px">
          <el-checkbox-group v-model="addArr.language" >
            <el-checkbox label="简体中文" name="language"></el-checkbox>
            <el-checkbox label="繁体中文" name="language"></el-checkbox>
            <el-checkbox label="英文" name="language"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="游戏版权" >
          <el-input
            type="textarea"
            placeholder="请输入内容"
            rows="4"

            v-model="addArr.g_copy"
            style="width: 850px">
          </el-input>
        </el-form-item>
        <el-form-item label="游戏简介" >
          <el-input
            type="textarea"
            placeholder="请输入内容"
            rows="4"

            v-model="addArr.g_Int"
            style="width: 850px">
          </el-input>
        </el-form-item>
        <el-form-item label="详细内容介绍" >
          <el-input
            type="textarea"
            placeholder="请输入内容"
            rows="6"

            v-model="addArr.g_Introduction"
            style="width: 850px">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showAdd">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>

      </div>
    </el-dialog>
    <el-dialog title="查看游戏信息" :visible.sync="seeVisible"  width="70%" style="text-align: center">
      <el-form :inline="true" :model="gameArr" class="demo-form-inline" label-position="right">
        <el-form-item label="游戏名称" label-width="120px">
          <el-input v-model="gameArr.g_name" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="英文名称" label-width="120px">
          <el-input v-model="gameArr.g_en_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="发行时间" label-width="120px">
          <el-col>
            <el-date-picker type="date" placeholder="选择日期" v-model="gameArr.g_time" disabled></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="游戏状态" label-width="120px">
          <el-input v-model="gameArr.g_state" disabled></el-input>
        </el-form-item>
        <el-form-item label="游戏价格" label-width="120px">
          <el-input v-model="gameArr.g_price" disabled></el-input>
        </el-form-item>
        <el-form-item label="折扣价格" label-width="120px">
          <el-input v-model="gameArr.g_salePrice" disabled></el-input>
        </el-form-item>
        <el-form-item label="发行商 " label-width="120px">
          <el-input v-model="gameArr.g_publisher" disabled></el-input>
        </el-form-item>
        <el-form-item label="开发商 " label-width="120px">
          <el-input v-model="gameArr.g_developer" disabled></el-input>
        </el-form-item>
        <el-form-item label="游戏操作系统" label-width="120px">
          <el-input v-model="gameArr.g_system" disabled></el-input>
        </el-form-item>
        <el-form-item label="游戏内存" label-width="120px">
          <el-input v-model="gameArr.g_memory" disabled></el-input>
        </el-form-item>
        <el-form-item label="游戏处理器" label-width="120px">
          <el-input v-model="gameArr.g_processor" disabled></el-input>
        </el-form-item>
        <el-form-item label="游戏DirectX版本" label-width="120px">
          <el-input v-model="gameArr.g_directX" disabled></el-input>
        </el-form-item>
        <el-form-item label="游戏图形" label-width="120px">
          <el-input v-model="gameArr.g_image" disabled></el-input>
        </el-form-item>
        <el-form-item label="游戏硬盘" label-width="120px">
          <el-input v-model="gameArr.g_disk" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="gameArr.type" disabled>
            <el-checkbox label="动作" name="type"></el-checkbox>
            <el-checkbox label="策略" name="type"></el-checkbox>
            <el-checkbox label="角色扮演" name="type"></el-checkbox>
            <el-checkbox label="VR" name="type"></el-checkbox>
            <el-checkbox label="4X" name="type"></el-checkbox>
            <el-checkbox label="休闲" name="type"></el-checkbox>
            <el-checkbox label="体育" name="type"></el-checkbox>
            <el-checkbox label="冒险" name="type"></el-checkbox>
            <el-checkbox label="单机多人" name="type"></el-checkbox>
            <el-checkbox label="历史" name="type"></el-checkbox>
            <el-checkbox label="回合" name="type"></el-checkbox>
            <el-checkbox label="多人" name="type"></el-checkbox>
            <el-checkbox label="家庭" name="type"></el-checkbox>
            <el-checkbox label="射击" name="type"></el-checkbox>
            <el-checkbox label="开放世界" name="type"></el-checkbox>
            <el-checkbox label="战争" name="type"></el-checkbox>
            <el-checkbox label="日系" name="type"></el-checkbox>
            <el-checkbox label="模拟" name="type"></el-checkbox>
            <el-checkbox label="科幻" name="type"></el-checkbox>
            <el-checkbox label="竞速" name="type"></el-checkbox>
            <el-checkbox label="第一人称" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="游戏版权" >
          <el-input
            type="textarea"
            placeholder="请输入内容"
            rows="4"
            disabled
            v-model="gameArr.g_copy"
            style="width: 850px">
          </el-input>
        </el-form-item>
        <el-form-item label="游戏简介" >
          <el-input
            type="textarea"
            placeholder="请输入内容"
            rows="4"
            disabled
            v-model="gameArr.g_Int"
            style="width: 850px">
          </el-input>
        </el-form-item>
        <el-form-item label="详细内容介绍" >
          <el-input
            type="textarea"
            placeholder="请输入内容"
            rows="6"
            disabled
            v-model="gameArr.g_Introduction"
          style="width: 850px">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="seeVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑游戏信息" :visible.sync="editVisible"  width="70%" style="text-align: center">
      <el-form :inline="true" :model="gameArr" class="demo-form-inline" label-position="right">
        <el-form-item label="游戏名称" label-width="120px">
          <el-input v-model="gameArr.g_name" ></el-input>
        </el-form-item>
        <el-form-item label="英文名称" label-width="120px">
          <el-input v-model="gameArr.g_en_name" ></el-input>
        </el-form-item>
        <el-form-item label="发行时间" label-width="120px">
          <el-col>
            <el-date-picker type="date" placeholder="选择日期" v-model="gameArr.g_time" ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="游戏状态" label-width="120px">
          <el-select v-model="gameArr.g_state" placeholder="请选择游戏状态" style="width: 300px">
            <el-option label="上架" value="上架"></el-option>
            <el-option label="下架" value="下架"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="游戏价格" label-width="120px">
          <el-input v-model="gameArr.g_price" ></el-input>
        </el-form-item>

        <el-form-item label="发行商 " label-width="120px">
          <el-input v-model="gameArr.g_publisher" ></el-input>
        </el-form-item>
        <el-form-item label="开发商 " label-width="120px">
          <el-input v-model="gameArr.g_developer" ></el-input>
        </el-form-item>
        <el-form-item label="游戏操作系统" label-width="120px">
          <el-input v-model="gameArr.g_system" ></el-input>
        </el-form-item>
        <el-form-item label="游戏内存" label-width="120px">
          <el-input v-model="gameArr.g_memory" ></el-input>
        </el-form-item>
        <el-form-item label="游戏处理器" label-width="120px">
          <el-input v-model="gameArr.g_processor" ></el-input>
        </el-form-item>
        <el-form-item label="游戏DirectX版本" label-width="120px">
          <el-input v-model="gameArr.g_directX" ></el-input>
        </el-form-item>
        <el-form-item label="游戏图形" label-width="120px">
          <el-input v-model="gameArr.g_image" ></el-input>
        </el-form-item>
        <el-form-item label="游戏硬盘" label-width="120px">
          <el-input v-model="gameArr.g_disk" ></el-input>
        </el-form-item>
        <el-form-item label="游戏声卡" label-width="120px">
          <el-input v-model="gameArr.g_soundCard" ></el-input>
        </el-form-item>
        <el-form-item label="游戏类型" >
          <el-checkbox-group v-model="gameArr.type" >
            <el-checkbox label="动作" ></el-checkbox>
            <el-checkbox label="策略"  ></el-checkbox>
            <el-checkbox label="角色扮演"   ></el-checkbox>
            <el-checkbox label="VR"  ></el-checkbox>
            <el-checkbox label="4X"  ></el-checkbox>
            <el-checkbox label="休闲"  ></el-checkbox>
            <el-checkbox label="体育"  ></el-checkbox>
            <el-checkbox label="冒险"  ></el-checkbox>
            <el-checkbox label="单机多人"  ></el-checkbox>
            <el-checkbox label="历史"  ></el-checkbox>
            <el-checkbox label="回合"  ></el-checkbox>
            <el-checkbox label="多人"  ></el-checkbox>
            <el-checkbox label="家庭"  ></el-checkbox>
            <el-checkbox label="射击"  ></el-checkbox>
            <el-checkbox label="开放世界"  ></el-checkbox>
            <el-checkbox label="战争"  ></el-checkbox>
            <el-checkbox label="日系"  ></el-checkbox>
            <el-checkbox label="模拟"  ></el-checkbox>
            <el-checkbox label="科幻"  ></el-checkbox>
            <el-checkbox label="竞速"  ></el-checkbox>
            <el-checkbox label="第一人称"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="游戏系统：" prop="os" label-width="120px">
          <el-checkbox-group v-model="gameArr.os" >
            <el-checkbox label="Win" name="os"></el-checkbox>
            <el-checkbox label="Linux" name="os"></el-checkbox>
            <el-checkbox label="Mac" name="os"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="游戏语言：" prop="language" label-width="120px">
          <el-checkbox-group v-model="gameArr.language" >
            <el-checkbox label="简体中文" name="language"></el-checkbox>
            <el-checkbox label="繁体中文" name="language"></el-checkbox>
            <el-checkbox label="英文" name="language"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="游戏版权" >
          <el-input
            type="textarea"
            placeholder="请输入内容"
            rows="4"

            v-model="gameArr.g_copy"
            style="width: 850px">
          </el-input>
        </el-form-item>
        <el-form-item label="游戏简介" >
          <el-input
            type="textarea"
            placeholder="请输入内容"
            rows="4"

            v-model="gameArr.g_Int"
            style="width: 850px">
          </el-input>
        </el-form-item>
        <el-form-item label="详细内容介绍" >
          <el-input
            type="textarea"
            placeholder="请输入内容"
            rows="6"

            v-model="gameArr.g_Introduction"
            style="width: 850px">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editG">确 定</el-button>
        <el-button @click="editVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Order",
    data() {
      return {
        input5: '',
        select: '',
        tableData: [],
        form: {
          reaudit: ''
        },
        gameArr:{
          type:[],
          os:[],
          language:[]
        },
        arr:{
        },
        arr2:[],
        page:1,
        pages:0,
        textarea: '',
        currentPage1: 1,
        addVisible: false,
        seeVisible:false,
        upperVisible:false,
        LowerVisible:false,
        editVisible:false,
        addArr:{
          g_name:'',
          g_en_name:'',
          g_time:'',
          g_price:'',
          g_publisher:'',
          g_developer:'',
          g_Introduction:'',
          g_system:'',
          g_memory:'',
          g_processor:'',
          g_image:'',
          g_soundCard:'',
          g_disk:'',
          g_directX:'',
          g_Int:'',
          g_copy:'',
          g_state:'',
          type:[],
          os:[],
          language:[],
        },
        fileList: [],
        fileList2:[],
        img:[],
        img1:[],
      };
    },
    created(){
      this.getCounts();
      this.getContents();
      // this.$axios.get()
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      submitUpload2() {
        this.$refs.upload2.submit();
      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {

      },
      handleSizeChange(val) {

      },
      handleChange(file, fileList) {
        this.img.push(file.name);
        console.log(this.img)
      },
      handleChange1(file, fileList2) {

        this.img1.push(file.name);

      },
      changeFun(){

        console.log(this.arr)
      },
      search(){
        this.currentPage1=1;
        this.changePage()
      },
      changePage() {
        let a=this.input5;
        this.$axios({
          method:'get',
          url:'http://localhost:8081/GameContents',
          params:{
            k:a,
            page:this.currentPage1,
          }
        }).then((res)=>{
            this.pages=res.data.data.length;
            this.tableData=res.data.data1;
          }).catch((err)=>{
        });
      },
      showUpper(i,data){
        this.upperVisible=true;
        this.gameArr=data;

      },
      showLower(i,data){
        this.LowerVisible=true;
        this.gameArr=data
      },
      showEdit(i,data){
       var p1=this.$axios({
          method:'get',
          url:'http://localhost:8081/GType',
          params:{
            id:data.g_id
          }
        });
       var p2=this.$axios({
         method:'get',
         url:'http://localhost:8081/GOs',
         params:{
           id:data.g_id
         }
       });
        var p3=this.$axios({
          method:'get',
          url:'http://localhost:8081/GLanguage',
          params:{
            id:data.g_id
          }
        });
         Promise.all([p1,p2,p3]).then((res)=>{
          this.gameArr=data;
          this.gameArr.type=[];
          this.gameArr.os=[];
          this.gameArr.language=[];
          for (var i=0;i<res[0].data.data.length;i++){
            this.gameArr.type.push(res[0].data.data[i].t_type)
          }
           for (var i=0;i<res[1].data.data.length;i++){
             this.gameArr.os.push(res[1].data.data[i].o_os)
           }
           for (var i=0;i<res[2].data.data.length;i++){
             this.gameArr.language.push(res[2].data.data[i].L_language)
           }

         this.editVisible=true;
        })
      },
      editG(){
        this.$axios({
          method:'get',
          url:'http://localhost:8081/editG',
          params:{
            id:this.gameArr.g_id,
            gName:this.gameArr.g_name,
            EName:this.gameArr.g_en_name,
            gTime:this.gameArr.g_time.split('T')[0],
            price:this.gameArr.g_price,
            sPrice:this.gameArr.g_salePrice,
            pub:this.gameArr.g_publisher,
            dev:this.gameArr.g_developer,
            intr:this.gameArr.g_Introduction,
            sys:this.gameArr.g_system,
            mem:this.gameArr.g_memory,
            pro:this.gameArr.g_processor,
            ima:this.gameArr.g_image,
            sou:this.gameArr.g_soundCard,
            disk:this.gameArr.g_disk,
            dX:this.gameArr.g_directX,
            int:this.gameArr.g_Int,
            copy:this.gameArr.g_copy,
            sta:this.gameArr.g_state,
          }
        }).then((res)=>{
          this.$axios({
            method:'get',
            url:'http://localhost:8081/dedT',
            params:{
              id:this.gameArr.g_id,
            }
          });
          this.$axios({
            method:'get',
            url:'http://localhost:8081/dedO',
            params:{
              id:this.gameArr.g_id,
            }
          });
          this.$axios({
            method:'get',
            url:'http://localhost:8081/dedL',
            params:{
              id:this.gameArr.g_id,
            }
          })
        }).then((res)=>{
          for (var i=0;i<this.gameArr.type.length;i++){
            this.$axios({
              method:'get',
              url:'http://localhost:8081/addT',
              params:{
                id:this.gameArr.g_id,
                type:this.gameArr.type[i]
              }
            });
          }
          for (var i=0;i<this.gameArr.os.length;i++){
            this.$axios({
              method:'get',
              url:'http://localhost:8081/addO',
              params:{
                id:this.gameArr.g_id,
                os:this.gameArr.os[i]
              }
            });
          }
          for (var i=0;i<this.gameArr.language.length;i++){
            this.$axios({
              method:'get',
              url:'http://localhost:8081/addL',
              params:{
                id:this.gameArr.g_id,
                language:this.gameArr.language[i]
              }
            });
          }
          this.editVisible=false;
        })
      },
      showSee(i,data){
        this.$axios({
          method:'get',
          url:'http://localhost:8081/GType',
          params:{
            id:data.g_id
          }
        }).then((res)=>{
          this.gameArr=data;
          this.gameArr.type=[];
          for (var i=0;i<res.data.data.length;i++){
            this.gameArr.type.push(res.data.data[i].t_type)
          }
         this.seeVisible=true;
        })
      },
      showAdd(){
        this.$axios({
          method:'get',
          url:'http://localhost:8081/addG',
          params:{
            gName:this.addArr.g_name,
            EName:this.addArr.g_en_name,
            gTime:this.addArr.g_time,
            price:this.addArr.g_price,
            sPrice:this.addArr.g_salePrice,
            pub:this.addArr.g_publisher,
            dev:this.addArr.g_developer,
            intr:this.addArr.g_Introduction,
            sys:this.addArr.g_system,
            mem:this.addArr.g_memory,
            pro:this.addArr.g_processor,
            ima:this.addArr.g_image,
            sou:this.addArr.g_soundCard,
            disk:this.addArr.g_disk,
            dX:this.addArr.g_directX,
            int:this.addArr.g_Int,
            copy:this.addArr.g_copy,
            sta:this.addArr.g_state,
            img1:this.img,
            img2:this.img1,
          }
        }).then((res)=>{
          for (var i=0;i<this.addArr.type.length;i++){
            this.$axios({
              method:'get',
              url:'http://localhost:8081/addT',
              params:{
                id:res.data.data.insertId,
                type:this.addArr.type[i]
              }
            });
          }
          for (var i=0;i<this.addArr.os.length;i++){
            this.$axios({
              method:'get',
              url:'http://localhost:8081/addO',
              params:{
                id:res.data.data.insertId,
                os:this.addArr.os[i]
              }
            });
          }
          for (var i=0;i<this.addArr.language.length;i++){
            this.$axios({
              method:'get',
              url:'http://localhost:8081/addL',
              params:{
                id:res.data.data.insertId,
                language:this.addArr.language[i]
              }
            });
          }

          this.addVisible=false;
        })


      },

      upper(){
        this.upperVisible=false;
        this.$axios.get('http://localhost:8081/upper',{
          params:{
            id:this.gameArr.g_id
          }
        }).then((res)=>{

            this.changePage()
          })
      },
      Lower(){
        this.LowerVisible=false;
        this.$axios.get('http://localhost:8081/Lower',{
          params:{
            id:this.gameArr.g_id
          }
        }).then((res)=>{
          this.changePage()
        })
      },
      getCounts(){
        this.$axios.get('http://localhost:8081/newGameCounts')
          .then((res)=>{
            this.pages=res.data.count.num;
          });
      },
      getContents(){
        this.$axios.get('http://localhost:8081/newGameContents',{
          params:{
            page:this.currentPage1
          }
        })
          .then((res)=>{
            this.tableData=res.data.data;
          });
      },
    },
  }
</script>

<style scoped lang="less">
  .clearfix::after{
    content: '';
    clear: both;
    display: block;
  }
  #g-box{
    width: 100%;
    height: 100%;
  }
  #g-top{
    margin-top: 30px;
  }
  .g-left{
    text-align: center;
    font-size: 36px;
    font-weight: normal;
    margin-left: 40px;
    margin-bottom: 30px;
  }
  .g-right{
    float: left;
    margin-left: 3%;
    margin-right: 30px;
  }
  .el-input{
    width: 300px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .g-add{
    margin-left: 720px;
    display: inline;
    height: 35px;
    span{
      margin-left: 10px;
    }
  }
  #g-bottom{
    width: 94%;
    margin-left: 3%;
    margin-top: 30px;
    float: left;
  }
  .g-block{
    float: left;
    margin-top: 30px;
    margin-left: 40%;
  }
</style>
