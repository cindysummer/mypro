<template>
  <div>
    <el-table :data="masters" stripe fit>
      <el-table-column prop="_id" label="编号" width="220"></el-table-column>
      <el-table-column prop="memberAcount" label="昵称" width="110"></el-table-column>
      <el-table-column prop="memberName" label="真实姓名" width="90"></el-table-column>
      <el-table-column prop="menberCard" label="会员卡号" width="120"></el-table-column>
      <el-table-column prop="memberPhone" label="联系电话" width="120"></el-table-column>
      <el-table-column prop="memberAdd" label="送货地址" width="180"></el-table-column>
      <el-table-column prop="memberArea" label="区域" width="80"></el-table-column>
      <el-table-column prop="memberPoint" label="积分" width="80"></el-table-column>
      <el-table-column prop="petId" label="宠物数量" :formatter="length" width="30"></el-table-column>
      <el-table-column label="操作" width="120">
      <template slot-scope="scope">
        <el-button size="mini" type="text" @click="pet(scope.$index, scope.row)">查看宠物</el-button>
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
