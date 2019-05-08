<template>
    <el-tabs style="width:100%" type="border-card">
        <el-tab-pane>
            <span slot="label"><i class="el-icon-goods"></i> 商品信息</span>
            商品
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label"><i class="el-icon-coffee-cup"></i> 服务信息</span>
            宠物
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label"><i class="el-icon-chicken"></i> 宠物信息</span>
            门店
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label"><i class="el-icon-s-custom"></i> 员工信息</span>
            <el-button type="primary" @click="dialogFormVisible = true"><i class="el-icon-edit"></i>新增员工</el-button>
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
                <el-table-column prop="empName" label="姓名">
                </el-table-column>
                <el-table-column prop="empLevel" label="职级">
                </el-table-column>
                <el-table-column prop="empPhone" label="联系电话">
                </el-table-column>
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
    import { createNamespacedHelpers } from 'vuex';
    const { mapState, mapActions, mapMutations } = createNamespacedHelpers('shop');
    export default {
        name: "moreMes",
        data() {
            return {
                empData: {
                    empName: "张三",
                    empLevel: "初级",
                    empPhone: "12312312311"
                },
                dialogTableVisible: false,
                dialogFormVisible: false,
            };
        },
        computed:mapState(["shopEmployee"]),
        methods: {
            ...mapActions(["updateShopAsync","getEmployeeByShopIdAsync","removeEmployeeByShopIdAsync"]),
            addEmp(){
                this.updateShopAsync(this.empData);
                this.dialogFormVisible = false;
            }
        },
        mounted() {
            this.getEmployeeByShopIdAsync();
        },
    }
</script>