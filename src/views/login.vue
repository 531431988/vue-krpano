<template>
  <a-button type="primary" @click="handleSubmit">登录</a-button>
</template>

<script>
export default {
  components: {
  },
  created () {
  },
  methods: {
    handleSubmit () {
      this.$store.dispatch('Login', { username: '', password: '' }).then(res => this.loginSuccess(res)).catch(err => this.requestFailed(err))
    },
    loginSuccess (res) {
      this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `小明欢迎回来`
        })
      }, 1000)
    },
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }

}
</script>
<style lang="less" scoped>
</style>
