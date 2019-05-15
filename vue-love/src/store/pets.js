import petsService from '../service/pets';
export default {
    namespaced: true,
    state: {
        search: {
            input: "",
            select: "",
        },
        petMsg: {
            petBirth: "",
            petColor: "",
            petKind: "",
            petName: "",
            petNature: "",
            petType: "",// 品类(猫、狗类)
            price: "",
            _id: "",
            image: ""

        },
        ruleForm: {
            name: "64645",
            name1: "546456",
            name2: "45645",
            name3: "45645",
            name4: "4564564",
            price: "45",
            date1: "",
            image: ""
        },
        rules: {
            name: [
                { required: true, message: "请输入宠物名称", trigger: "blur" },
                { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
            ],
            name1: [
                {
                    required: true,
                    message: "请输入宠物品类(猫、狗类)",
                    trigger: "blur"
                },
                { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" }
            ],
            name2: [
                {
                    required: true,
                    message: "请输入宠物种类（泰迪，比熊等）",
                    trigger: "blur"
                },
                { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" }
            ],
            name3: [
                { required: true, message: "请输入宠物颜色", trigger: "blur" },
                { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" }
            ],
            name4: [
                { required: true, message: "请输入宠物性格", trigger: "blur" },
                { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
            ],
            date1: [
                {
                    type: "date",
                    required: true,
                    message: "请选择日期",
                    trigger: "change"
                }
            ],
            price: [
                { required: true, message: "请输入宠物价格", trigger: "blur" },
                { min: 1, max: 6, message: "长度在 1 到 6 个数字", trigger: "blur" }
            ]
        },
        pageData: {
            total: 0,
            currentPage: 1,
            pageSize: 3,
            userInputLastTime: "",
            userSelectLastTime: "",
        },

        tableData: [

        ]
    },
    mutations: {
        update: (state, payload) => {
            state.tableData = payload.data;
            Object.assign(state.pageData, payload.state)
        },


    },
    actions: {
        async addpetsAsync({ dispatch }, payload) {
            let k = payload.k;
            delete payload.k;
            const data = await petsService.addPets(payload);
            if (data) {
                k.$message({
                    showClose: true,
                    message: '新增成功',
                    type: 'success'
                });

            }
        },

        async findpetsAsync({ commit }, payload) {
            if (payload.currentPage == 0) {
                payload.currentPage = 1
            }
            const data = await petsService.findPets(payload);
            commit("update", data);
        },

        async removePetsAsync({ dispatch }, payload) {
            const data = await petsService.removePets(payload);
            if (data) {

                delete data._id;
                if ((data.total - 1) % data.pageSize == 0) {
                    data.currentPage = data.currentPage - 1;
                }
                dispatch("findpetsAsync", data)

            }
        },
        async updatePetsAsync({ dispatch }, payload) {
            let k = payload.this;
            delete payload.this;
            const data = await petsService.updatePets(payload);
            delete data._id;
            dispatch("findpetsAsync", data);
            k.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
            });
        },
    }
}