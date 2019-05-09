<template>
  <el-tabs style="width:100%" type="border-card">
    <el-tab-pane>
      <span slot="label">
        <i class="el-icon-goods"></i> 商品信息
      </span>
      <el-button type="primary" @click="goodsDialogVisible = true">
        <i class="el-icon-edit"></i>新增商品
      </el-button>
      <el-dialog :visible.sync="goodsDialogVisible">
        <el-form label-width="180px" ref="goodsData" :model="goodsData">
          <el-form-item label="商品名称">
            <el-select
              style="width:300px"
              v-model="goods"
              filterable
              placeholder="请选择"
              @change="changeGoods(goods)"
            >
              <el-option
                v-for="item in goodsArr"
                :key="item._id"
                :label="item.goodsName"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品类型">
            <el-input style="width:300px" v-model="goodsData.goodsType"></el-input>
          </el-form-item>
          <el-form-item label="口味">
            <el-input style="width:300px" v-model="goodsData.goodsTaste"></el-input>
          </el-form-item>
          <el-form-item label="产地">
            <el-input style="width:300px" v-model="goodsData.goodsRegion"></el-input>
          </el-form-item>
          <el-form-item label="保质期">
            <el-input style="width:300px" v-model="goodsData.goodsTime"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input style="width:300px" v-model="goodsData.goodsPrice"></el-input>
          </el-form-item>
        </el-form>
        <div style="margin-left:200px">
          <el-button type="primary" @click="addGoods">确 定</el-button>
          <el-button @click="goodsDialogVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <el-table :data="shopGoods" style="width: 100%">
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="goodsType" label="商品类型"></el-table-column>
        <el-table-column prop="goodsTaste" label="口味"></el-table-column>
        <el-table-column prop="goodsRegion" label="产地"></el-table-column>
        <el-table-column prop="goodsTime" label="保质期"></el-table-column>
        <el-table-column prop="goodsPrice" label="价格"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="removeGoodsOnShopAsync(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label">
        <i class="el-icon-coffee-cup"></i> 服务信息
      </span>
      <el-button type="primary" @click="centerDialogVisible = true">
        <i class="el-icon-edit"></i>新增服务
      </el-button>
      <el-dialog :visible.sync="centerDialogVisible">
        <el-form label-width="180px" ref="serData" :model="serData">
          <el-form-item label="服务名称">
            <el-select
              style="width:300px"
              v-model="value"
              filterable
              placeholder="请选择"
              @change="changeSelect(value)"
            >
              <el-option
                v-for="item in serviceArr"
                :key="item._id"
                :label="item.serviceName"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务类别">
            <el-input style="width:300px" v-model="serData.serviceType"></el-input>
          </el-form-item>
          <el-form-item label="排期">
            <el-input style="width:300px" v-model="serData.serviceSchedule"></el-input>
          </el-form-item>
          <el-form-item label="服务员等级">
            <el-input style="width:300px" v-model="serData.serviceLevel"></el-input>
          </el-form-item>
          <el-form-item label="耗时">
            <el-input style="width:300px" v-model="serData.serviceTime"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input style="width:300px" v-model="serData.servicePrice"></el-input>
          </el-form-item>
        </el-form>
        <div style="margin-left:200px">
          <el-button type="primary" @click="addSer">确 定</el-button>
          <el-button @click="centerDialogVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <el-table :data="shopService" style="width: 100%">
        <el-table-column prop="serviceName" label="服务名称"></el-table-column>
        <el-table-column prop="serviceType" label="服务类别"></el-table-column>
        <el-table-column prop="serviceCanFor" label="适用规格"></el-table-column>
        <el-table-column prop="serviceDetial" label="服务规格"></el-table-column>
        <el-table-column prop="serviceTime" label="耗时"></el-table-column>
        <el-table-column prop="servicePrice" label="价格"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="removeServiceOnShopAsync(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label">
        <i class="el-icon-chicken"></i> 宠物信息
      </span>
      <el-button type="primary" @click="petDialogVisible = true">
        <i class="el-icon-edit"></i>新增宠物
      </el-button>
      <el-dialog :visible.sync="petDialogVisible">
        <el-form label-width="180px" ref="petsData" :model="petsData">
          <el-form-item label="宠物名称">
            <el-select
              style="width:300px"
              v-model="pets"
              filterable
              placeholder="请选择"
              @change="changePets(pets)"
            >
              <el-option
                v-for="item in petsArr"
                :key="item._id"
                :label="item.petName"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="宠物品类">
            <el-input style="width:300px" v-model="petsData.petType"></el-input>
          </el-form-item>
          <el-form-item label="宠物种类">
            <el-input style="width:300px" v-model="petsData.petKind"></el-input>
          </el-form-item>
          <el-form-item label="颜色">
            <el-input style="width:300px" v-model="petsData.petColor"></el-input>
          </el-form-item>
          <el-form-item label="性格">
            <el-input style="width:300px" v-model="petsData.petNature"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input style="width:300px" v-model="petsData.price"></el-input>
          </el-form-item>
        </el-form>
        <div style="margin-left:200px">
          <el-button type="primary" @click="addPet">确 定</el-button>
          <el-button @click="petDialogVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <el-table :data="shopPets" style="width: 100%">
        <el-table-column prop="petName" label="宠物名称"></el-table-column>
        <el-table-column prop="petType" label="宠物品类"></el-table-column>
        <el-table-column prop="petKind" label="宠物种类"></el-table-column>
        <el-table-column prop="petColor" label="颜色"></el-table-column>
        <el-table-column prop="petNature" label="性格"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="removePetsOnShopAsync(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label">
        <i class="el-icon-s-custom"></i> 员工信息
      </span>
      <el-button type="primary" @click="dialogFormVisible = true">
        <i class="el-icon-edit"></i>新增员工
      </el-button>
      <el-dialog :visible.sync="dialogFormVisible">
        <el-form label-width="180px" :model="empData">
          <el-form-item label="姓名">
            <el-input style="width:300px" v-model="empData.empName"></el-input>
          </el-form-item>
          <el-form-item label="职级">
            <el-input style="width:300px" v-model="empData.empLevel"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input style="width:300px" v-model="empData.empPhone"></el-input>
          </el-form-item>
        </el-form>
        <div style="margin-left:200px">
          <el-button type="primary" @click="addEmp">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <el-table :data="shopEmployee" style="width: 100%">
        <el-table-column prop="empName" label="姓名"></el-table-column>
        <el-table-column prop="empLevel" label="职级"></el-table-column>
        <el-table-column prop="empPhone" label="联系电话"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="removeEmployeeByShopIdAsync(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("shop");
export default {
  name: "moreMes",
  data() {
    return {
      empData: {
        empName: "张三",
        empLevel: "初级",
        empPhone: "12312312311"
      },
      serData: {},
      goodsData: {},
      petsData: {},
      value: "",
      goods: "",
      pets: "",
      dialogFormVisible: false,
      centerDialogVisible: false,
      goodsDialogVisible: false,
      petDialogVisible: false
    };
  },
  computed: mapState([
    "shopEmployee",
    "serviceArr",
    "shopService",
    "goodsArr",
    "shopGoods",
    "petsArr",
    "shopPets"
  ]),
  methods: {
    ...mapActions([
      "updateShopAsync",
      "getEmployeeByShopIdAsync",
      "removeEmployeeByShopIdAsync",
      "getServicesByUserIdAsync",
      "addServiceIdOnShopsAsync",
      "getServiceByShopIdAsync",
      "removeServiceOnShopAsync",
      "getGoodsByUserIdAsync",
      "addGoodsIdOnShopsAsync",
      "getGoodsByShopIdAsync",
      "removeGoodsOnShopAsync",
      "getPetsByUserIdAsync",
      "addPetsIdOnShopsAsync",
      "getPetsByShopIdAsync",
      "removePetsOnShopAsync"
    ]),
    addEmp() {
      this.updateShopAsync(this.empData);
      this.dialogFormVisible = false;
    },
    changeSelect(_id) {
      this.serData = this.serviceArr.filter(item => item._id === _id)[0];
    },
    changeGoods(_id) {
      this.goodsData = this.goodsArr.filter(item => item._id === _id)[0];
    },
    changePets(_id) {
      this.petsData = this.petsArr.filter(item => item._id === _id)[0];
    },
    addSer() {
      this.centerDialogVisible = false;
      this.addServiceIdOnShopsAsync(this.serData);
    },
    addGoods() {
      this.goodsDialogVisible = false;
      this.addGoodsIdOnShopsAsync(this.goodsData);
    },
    addPet() {
      this.petDialogVisible = false;
      this.addPetsIdOnShopsAsync(this.petsData);
    }
  },
  mounted() {
    this.getServicesByUserIdAsync();
    this.getServiceByShopIdAsync();
    this.getEmployeeByShopIdAsync();
    this.getGoodsByUserIdAsync();
    this.getGoodsByShopIdAsync();
    this.getPetsByUserIdAsync();
    this.getPetsByShopIdAsync();
  }
};
</script>