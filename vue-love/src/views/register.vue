<template>
  <el-card class="box-card">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="登录名称" prop="userAccount">
        <el-input v-model="ruleForm.userAccount"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="userPwd">
        <el-input v-model="ruleForm.userPwd"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="userPhone">
        <el-input v-model="ruleForm.userPhone"></el-input>
      </el-form-item>
      <el-form-item prop="userEmail" label="邮箱地址">
        <el-input v-model="ruleForm.userEmail"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="我同意注册" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { registerService } from "../service/users";
export default {
  name: "register",
  data() {
    let checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    return {
      ruleForm: {
        userAccount: "",
        userPwd: "",
        userPhone: "",
        userEmail: "",
        userName: "",
        delivery: false,
      },
      rules: {
        userAccount: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 2 到 12 个字符", trigger: "blur" }
        ],
        userPwd: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ],
        userPhone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          {
            message: "请输入正确的电话号码",
            validator: checkPhone,
            trigger: ["blur", "change"]
          }
        ],
        userEmail: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        userName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
     submitForm(formName) {
       this.$refs[formName].validate(async valid => {
         if (valid) {
            let userMes = { ...this.ruleForm, userType: "0", userStatus: "0" };
            let result = await registerService(userMes);
            if (result._id) {
              this.$alert("信息正在等待审核，请耐心等待", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.push("/");
              }
              });
            } 
          }else {
            this.$message.error("注册失败了");
          }
        })},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.box-card {
  width: 480px;
  margin: 70px auto;
  padding: 30px 30px 0 30px;
  box-sizing: border-box;
}
</style>