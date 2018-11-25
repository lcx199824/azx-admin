<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import { login } from '@/api/data'
export default {
  components: {
    LoginForm
  },
  // created() {
  //   console.log(123);
  //   this.$router.push({
  //     path: '/home'
  //   })
  // },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        // this.getUserInfo().then(res => {
        // console.log("******login.vue");
        // console.log(res);
        if (res.msg !== '登陆成功') {
          this.$toasted.show('登陆帐号或密码有误!')
        } else {
          this.$router.push({
            name: this.$config.homeName
          })
        }
        // })
      })
      // login({ userName, password }).then(res => {
      //   // console.log(res.status);
      //   if (res) {
      //     console.log("1111111111111");

      //     this.$router.push({
      //       path: '/home'
      //     })
      //   }
      // })
    }
  }
}
</script>

<style>
</style>
