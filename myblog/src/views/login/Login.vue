<template>
  <div class="login-body">
    <div class="login-content">
      <div class="login-card">
        <div class="login-head">
          <div class="login-title">博客用户登录</div>
          <div class="login-sign-pic">
            <img src="@/assets/img/user.png" alt="" />
          </div>
          <div class="login-slogan">分享改变世界</div>
        </div>
        <div class="login-form">
          <el-form
            :model="loginForm"
            status-icon
            ref="loginFormRef"
            :rules="loginFormRules"
            class="demo-loginForm"
          >
            <el-form-item prop="userCode">
              <el-input
                prefix-icon="el-icon-s-custom"
                type="text"
                placeholder="请输入用户名"
                v-model="loginForm.userCode"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                prefix-icon="el-icon-lock"
                type="password"
                placeholder="请输入用户密码"
                v-model="loginForm.password"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitLogin">登录</el-button>
              <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Request from "@/api/request.js";

export default {
  name: "Login",
  mouted() {},
  data() {
    return {
      //登录表单的数据绑定对象
      loginForm: {
        password: "",
        userCode: ""
      },
      //表单的验证规则对象
      //验证规则的required：表示是否必填，message：表示提示信息，trigger：表示触发时机（blur失去焦点）
      loginFormRules: {
        userCode: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 8, max: 16, message: "长度在8到16个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitLogin() {
      this.$refs.loginFormRef.validate(async valid => {
        console.log(valid);
        if (valid) {
          console.log(
            this.sendPost().then(res => {
              console.log(res);
            })
          );
        }
      });
    },
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    sendPost() {
      return Request.request({
        methods: "post",
        url: "/user/login",
        data: {
          userCode,
          password
        },
        timeout: 1000
      });
    }
  }
};
</script>

<style>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(214, 219, 224, 0.692);
}
.login-card {
  width: 18vw;
  min-width: 280px;
  height: 40vh;
  min-height: 340px;

  padding: 30px;
  background-color: #fff;
}

.login-sign-pic {
  width: 40px;
  height: 40px;
  margin: 15px auto;
  background-color: rgb(3, 130, 248);
  border: 1px solid rgb(2, 68, 122);
  border-radius: 20px;
  text-align: center;
}

.login-title {
  font-size: 20px;
  font-weight: 100;
  color: rgb(26, 25, 25);
  text-align: center;
}
.login-sign-pic img {
  width: 80%;
  height: auto;
}
.login-slogan {
  font-size: 14px;
  text-align: center;
}
</style>
