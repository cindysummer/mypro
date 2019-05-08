
 <template>
  <el-card style="width:100%">
    <el-table :data="shops">
      <el-table-column prop="shopStatus" label="门店状态"></el-table-column>
      <el-table-column prop="shopName" label="门店名称"></el-table-column>
      <el-table-column prop="shopAdd" label="门店地址"></el-table-column>
      <el-table-column prop="shopTel" label="联系电话"></el-table-column>
      <el-table-column label="头图">
        <template slot-scope="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.shopImg"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="店员">
        <el-button type="primary" size="small">店员详情</el-button>
      </el-table-column>
      <el-table-column label="商品">
        <el-button type="primary" size="small">商品详情</el-button>
      </el-table-column>
      <el-table-column label="服务">
        <el-button type="primary" size="small">服务详情</el-button>
      </el-table-column>
      <el-table-column label="宠物">
        <el-button type="primary" size="small">宠物详情</el-button>
      </el-table-column>
    </el-table>-
    <el-pagination
      @size-change="setEachPage"
      @current-change="setCurrentPage"
      :page-size="~~eachPage"
      :page-sizes="[1,3,5]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="~~count"
    ></el-pagination>
  </el-card>
</template>
 <script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("shop");
export default {
  //监听方法， Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化
  //当需要在数据变化时执行异步或开销较大的操作时,通常用watch来响应数据的变化。
  //该绑定监听的方法的特点：当值第一次绑定的时候，不会执行监听函数，只有值发生改变才会执行
  watch: {
    //监听state里面eachPage这个属性,监听处理函数，如果该属性的值发生变化就执行一次函数
    eachPage() {
      this.getShopsByPageAsync();
    },
    //监听state里面currentPage这个属性
    currentPage() {
      this.getShopsByPageAsync();
    }
  },
  computed: {
    ...mapState(["eachPage", "currentPage", "count", "totalPage", "shops"])
  },
  methods: {
    ...mapActions(["getShopsByPageAsync"]),
    ...mapMutations(["setEachPage", "setCurrentPage"])
  },
  //生命周期函数（mounted函数是在所有页面全部加载和状态全部加载完成后执行，类似react的componentDidMount生命周期函数）
  mounted() {
    this.getShopsByPageAsync();
  }
};
</script>

