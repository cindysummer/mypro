<template>
  <div style="float: left;margin-left: 50px;margin-top: 50px">
    <el-table :data="services">
      <el-table-column prop="serviceName" label="名称" width="130" align="center"></el-table-column>
      <el-table-column prop="serviceType" label="服务类型" width="130" align="center"></el-table-column>
      <el-table-column prop="serviceSchedule" label="服务时间" width="130" align="center"></el-table-column>
      <el-table-column prop="serviceDetial" label="适用规格" width="130" align="center"></el-table-column>
      <el-table-column prop="serviceCanFor" label="服务规格" width="130" align="center"></el-table-column>
      <el-table-column prop="serviceTime" label="耗时" width="130" align="center"></el-table-column>
      <el-table-column prop="serviceLevel" label="服务员等级" width="130" align="center"></el-table-column>
      <el-table-column prop="servicePrice" label="价格" width="130" align="center"></el-table-column>
      <el-table-column label="操作" width="100">

        
        <template slot-scope="scope">
          <el-button @click="dialogFormVisible = true" type="text" size="small">编辑</el-button>
          <el-button type="text" @click="removeService(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="setEachPage" @current-change="setCurrentPage" :page-sizes="[1,2,3]" :page-size="~~eachPage"
      layout="total, sizes, prev, pager, next, jumper" :total="~~count"></el-pagination>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>
<script>
  import { createNamespacedHelpers } from "vuex";
  const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
    "service"
  );

  export default {
    dialogFormVisible: false,
    dialogTableVisible: false,
    form: {
      name: "1",
      region: "1",
      date1: "2",
      date2: "3",
      delivery: false,
      type: [],
      resource: "1",
      desc: "1"
    },
    formLabelWidth: "120px",
    computed: {
      ...mapState(["currentPage", "eachPage", "totalPage", "count", "services"])
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
      ...mapActions(["getServicesByPageAsync", "removeServiceByIdAsync"]),
      ...mapMutations(["setEachPage", "setCurrentPage"]),
      handleClick(row) { },

      removeService(a) {
        this.$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // console.log(a)
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