<template>
  <div>
    <el-table :data="services">
      <el-table-column prop="serviceName" label="名称" ></el-table-column>
      <el-table-column prop="serviceType" label="服务类型" ></el-table-column>
      <el-table-column prop="serviceSchedule" label="服务时间" ></el-table-column>
      <el-table-column prop="serviceDetial" label="适用规格" ></el-table-column>
      <el-table-column prop="serviceCanFor" label="服务规格" ></el-table-column>
      <el-table-column prop="serviceTime" label="耗时" ></el-table-column>
      <el-table-column prop="serviceLevel" label="服务员等级" ></el-table-column>
      <el-table-column prop="servicePrice" label="价格" ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" @click="removeService(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="setEachPage"
      @current-change="setCurrentPage"
      :page-sizes="[2,4,6]"
      :page-size="~~eachPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="~~count"
    ></el-pagination>

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
              <el-time-picker
                placeholder="选择时间"
                v-model="form.serviceSchedule"
                style="width: 100%;"
              ></el-time-picker>
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
          <el-input
            v-model="form.servicePrice"
            style="width: 500px"
            placeholder="基准价格，会员价和活动价都以它为基准"
          ></el-input>
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
      formLabelWidth: "120px"
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
    },
    currentPage() {
      this.getServicesByPageAsync();
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