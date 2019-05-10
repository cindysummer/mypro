<template>
  <div>
    <el-table :data="masters" stripe fit>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="memberAcount" label="昵称" ></el-table-column>
      <el-table-column prop="memberName" label="真实姓名" ></el-table-column>
      <el-table-column prop="menberCard" label="会员卡号" ></el-table-column>
      <el-table-column prop="memberPhone" label="联系电话" ></el-table-column>
      <el-table-column prop="memberAdd" label="送货地址"></el-table-column>
      <el-table-column prop="memberArea" label="区域" ></el-table-column>
      <el-table-column prop="memberPoint" label="积分" ></el-table-column>
      <el-table-column prop="petId" label="宠物数量" :formatter="length" ></el-table-column>
      <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button size="mini" type="text" @click="pet(scope.$index, scope.row)">查看宠物</el-button>
          <el-button
          size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="removeMaster(scope.$index, scope.row)"
          ></el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      @size-change="setEachPage"
      @current-change="setCurrentPage"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="~~eachPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    ></el-pagination>

    <el-dialog title="宠物详情" :visible.sync="dialogTableVisible">
      <el-table :data="petArr">
        <el-table-column property="petName" label="宠物名字" width="80"></el-table-column>
        <el-table-column property="petType" label="宠物品类" width="80"></el-table-column>
        <el-table-column property="petKind" label="宠物种类" width="80"></el-table-column>
        <el-table-column property="petColor" label="宠物颜色" width="80"></el-table-column>
        <el-table-column property="petBirth" label="出生日期" width="150"></el-table-column>
        <el-table-column property="petNature" label="性格" width="180"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState,
  mapMutations,
  mapActions,
  mapGetters
} = createNamespacedHelpers("masters");
import master from "../../service/master"
export default {
  name: "mastersList",
  data() {
    return {
      dialogTableVisible: false,
      petArr:[]
    };
  },
  watch: {
    eachPage() {
      this.getMastersByPageAsync();
    },
    currentPage() {
      this.getMastersByPageAsync();
    }
  },
  computed: {
    ...mapState(["totalPage", "eachPage", "currentPage", "count", "masters"]),
    // ...mapGetters(["petCount"]),
    eachPage: {
      get: mapState(["eachPage"]).eachPage,
      set: mapMutations(["setEachPage"]).setEachPage
    },
    currentPage: {
      get: mapState(["currentPage"]).currentPage,
      set: mapMutations(["setCurrentPage"]).setCurrentPage
    }
  },
  methods: {
    ...mapActions(["getMastersByPageAsync"]),
    ...mapMutations(["setCurrentPage", "setEachPage"]),
    pet(index,row) {
      this.dialogTableVisible=true;
      this.petArr=row.petId;
    },
     removeMaster(index, row) {
      this.$confirm("此操作将永久删除该宠物主, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          master.removeMasterFetch({_id:row._id}).then(res => {
            if (res.ok == 1) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getMastersByPageAsync();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    length(row){
      return row.petId.length
    }
  },
  //生命周期，加载完成
  mounted() {
    this.getMastersByPageAsync();
  }
};
</script>
