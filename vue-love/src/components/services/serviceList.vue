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
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" @click="removeService">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="setEachPage"
        @current-change="setCurrentPage"
        :page-sizes="[1,2,3]"
        :page-size="~~eachPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="~~count"
      ></el-pagination>
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
  import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "service"
);

export default {
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
    ...mapActions(["getServicesByPageAsync","DelServiceAsync"]),
    ...mapMutations(["setEachPage", "setCurrentPage"]),
    handleClick(row) {
      console.log(row);
    },
    removeService() {
      
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
        
         this.DelServiceAsync(this.services[0]);

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


// export default {
//   methods: {
//     handleClick(row) {
//       console.log(row);
//     },
//     open() {
//       const h = this.$createElement;
//       this.$msgbox({
//         dangerouslyUseHTMLString: true,
//         title: "修改信息",
//         message: `nihao`,
//         showCancelButton: true,
//         confirmButtonText: "确定",
//         cancelButtonText: "取消",
//         beforeClose: (action, instance, done) => {
//           if (action === "confirm") {
//             instance.confirmButtonLoading = true;
//             instance.confirmButtonText = "执行中...";
//             setTimeout(() => {
//               done();
//               setTimeout(() => {
//                 instance.confirmButtonLoading = false;
//               }, 300);
//             }, 3000);
//           } else {
//             done();
//           }
//         }
//       }).then(action => {
//         this.$message({
//           type: "info",
//           message: "action: " + action
//         });
//       });
//     }
//   },

//   data() {
//     return {
//       tableData: [
//         {
//           date: "2016-05-02",
//           name: "王小虎",
//           province: "上海",
//           city: "普陀区",
//           address: "上海市普陀区金沙江路 1518 弄",
//           zip: 200333
//         },
//         {
//           date: "2016-05-04",
//           name: "王小虎",
//           province: "上海",
//           city: "普陀区",
//           address: "上海市普陀区金沙江路 1517 弄",
//           zip: 200333
//         },
//         {
//           date: "2016-05-01",
//           name: "王小虎",
//           province: "上海",
//           city: "普陀区",
//           address: "上海市普陀区金沙江路 1519 弄",
//           zip: 200333
//         },
//         {
//           date: "2016-05-03",
//           name: "王小虎",
//           province: "上海",
//           city: "普陀区",
//           address: "上海市普陀区金沙江路 1516 弄",
//           zip: 200333
//         }
//       ]
//     };
//   }
// };
</script>