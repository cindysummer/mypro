<template>
  <div>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="text" class="input-with-select">
        <el-select v-model="type" slot="prepend" placeholder="请选择">
          <el-option label="服务名称" value="serviceName"></el-option>
          <el-option label="服务类型" value="serviceType"></el-option>
          <el-option label="适用规格" value="serviceDetial"></el-option>
          <el-option label="价格" value="servicePrice"></el-option>
        </el-select>
        <el-button slot="append" @click="searchService" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table :data="services">
      <el-table-column prop="serviceName" label="服务名称"></el-table-column>
      <el-table-column prop="serviceType" label="服务类型"></el-table-column>
      <el-table-column prop="serviceSchedule" label="服务时间"></el-table-column>
      <el-table-column prop="serviceDetial" label="适用规格"></el-table-column>
      <el-table-column prop="serviceCanFor" label="服务规格"></el-table-column>
      <el-table-column prop="serviceTime" label="耗时"></el-table-column>
      <el-table-column prop="serviceLevel" label="服务员等级"></el-table-column>
      <el-table-column prop="servicePrice" label="价格"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" @click="removeService(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
<<<<<<< HEAD
    <el-pagination
      @size-change="setEachPage"
      @current-change="setCurrentPage"
      :page-sizes="[2,4,6]"
      :page-size="~~eachPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="~~count"
    ></el-pagination>
=======
    <el-pagination @size-change="setEachPage" @current-change="setCurrentPage" :page-sizes="[1,2,3]"
      :page-size="~~eachPage" layout="total, sizes, prev, pager, next, jumper" :total="~~count"></el-pagination>
>>>>>>> 391c6688431336e239c62e2431442343570ccf85

    <el-dialog title="服务信息修改" :visible.sync="dialogFormVisible">
      <el-form ref="form" :inline="true" :model="form">
        <el-form-item label="名称:" style="margin-top: 30px">
          <el-input v-model="form.serviceName" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item label="服务类型:">
          <el-input style="width: 500px" v-model="form.serviceType"></el-input>
        </el-form-item>
        <div>
          <el-form-item label="服务时间:" style="width: 800px">
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.serviceSchedule" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
        </div>
        <el-form-item label="使用规格:">
          <el-radio-group v-model="form.serviceDetial" style="width: 500px">
            <el-radio label="大型宠物"></el-radio>
            <el-radio label="中型宠物"></el-radio>
            <el-radio label="小型宠物"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="服务规格:">
          <el-radio-group v-model="form.serviceCanFor">
            <el-radio label="高级"></el-radio>
            <el-radio label="中级"></el-radio>
            <el-radio label="普通"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="耗时:">
          <el-input v-model="form.serviceTime" style="width: 500px" placeholder="例如：20分钟"></el-input>
        </el-form-item>
        <el-form-item label="服务员等级:">
          <el-radio-group v-model="form.serviceLevel">
            <el-radio label="高级"></el-radio>
            <el-radio label="中级"></el-radio>
            <el-radio label="普通"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="价格:">
          <el-input v-model="form.servicePrice" style="width: 500px" placeholder="基准价格，会员价和活动价都以它为基准"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="comfire">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
  import { createNamespacedHelpers } from "vuex";
  const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
    "service"
  );
  export default {
    data() {
      return {
        dialogFormVisible: false,
        formLabelWidth: "120px",
        type:"",
        text:""
      };
    },
    computed: {
      ...mapState([
        "currentPage",
        "eachPage",
        "totalPage",
        "count",
        "services",
        "form"
      ])
    },
    watch: {
      eachPage() {
        this.getServicesByPageAsync();
        if(this.text){
          this.getServicesByPageAsync({service:this.type,text:this.text});
        }
      },
      currentPage() {
        this.getServicesByPageAsync();
        if(this.text){
          this.getServicesByPageAsync({service:this.type,text:this.text});
        }
      }
    },
    methods: {
      ...mapActions([
        "getServicesByPageAsync",
        "removeServiceByIdAsync",
        "updateServicesAsync"
      ]),
      ...mapMutations(["setEachPage", "setCurrentPage", "editServices"]),
      //
      edit(row) {
        this.dialogFormVisible = true;
        this.editServices(row);
      },
      searchService(){
        this.getServicesByPageAsync({service:this.type,text:this.text});
      },
      //
      comfire() {
        this.updateServicesAsync(this.form);
        this.dialogFormVisible = false;
      },
      removeService(a) {
        this.$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.removeServiceByIdAsync(a);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }

    },
    mounted() {
      this.getServicesByPageAsync();
    }
  };
</script>
<style>
  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>