<template>
  <div id="signup">
    <div class="left">
      <div class="logo">
        <img src="../../static/logo.png" alt="" />
      </div>
      <div
        class="main-img p-5 d-flex align-items-center justify-content-center"
      >
        <img src="../../static/login-v2-dark.svg" alt="" />
      </div>
    </div>
    <div class="right p-5 d-flex align-items-center justify-content-center">
      <div>
        <h1 class="card-title mb-4">Chào mừng đến với fakebill.online! 👋</h1>
        <h4 class="mb-4">
          Vui lòng đăng kí tài khoản để sử dụng chức năng trên hệ thống
        </h4>
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
        >
          <!-- <a-form-item>
            <a-input
              v-decorator="[
                'fullName',
                {
                  rules: [
                    { required: true, message: 'Vui lòng nhập Họ & tên!' },
                  ],
                },
              ]"
              placeholder="Họ & tên"
            >
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'userName',
                {
                  rules: [
                    { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                  ],
                },
              ]"
              placeholder="Tên đăng nhập"
            >
            </a-input>
          </a-form-item> -->
          <a-form-item>
            <a-input
              v-decorator="[
                'email',
                {
                  rules: [
                    {
                      type: 'email',
                      message: 'Email không đúng định dạng',
                    },
                    { required: true, message: 'Vui lòng nhập email!' },
                  ],
                },
              ]"
              placeholder="Email"
            >
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [
                    { required: true, message: 'Vui lòng nhập mật khẩu!' },
                    {
                      min: 6,
                      message: 'Mật khẩu phải trên 6 kí tự!',
                    },
                  ],
                },
              ]"
              type="password"
              placeholder="Mật khẩu"
            >
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'password2',
                {
                  rules: [
                    { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                    {
                      validator: compareToFirstPassword,
                    },
                  ],
                },
              ]"
              type="password"
              placeholder="Nhập lại mật khẩu"
            >
            </a-input>
          </a-form-item>
          <!-- <a-form-item>
            <a-input
              v-decorator="['personCode', {}]"
              placeholder="Người giới thiệu"
            >
            </a-input>
          </a-form-item> -->
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button w-100"
            >
              Đăng Kí
            </a-button>
            Bạn đã có tài khoản
            <a @click="singIn" style="color: #008dff"> Đăng nhập ngay </a>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import * as authApi from '../../api/auth.js'
export default {
  layout: 'account',
  data() {
    return {
      username: null,
      password: null,
      password2: null,
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  methods: {
    singIn() {
      this.$router.push('/auth')
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('Mật khẩu không khớp !')
      } else {
        callback()
      }
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // call api here
          // resgister api
          authApi
            .callFunction(
              'https://api.fakebill.online/auth/register/',
              'POST',
              {
                email: values.email,
                password: values.password,
              }
            )
            .then((res) => {
              this.$message.success('Đăng kí thành công !')
              this.$router.push('/auth')
            })
            .catch((err) => {
              this.$message.error('Đăng nhập thất bại')
            })
          console.log('Received values of form: ', values)
        }
      })
    },
  },
}
</script>

<style lang="scss">
#signup {
  color: #d0d2d6 !important;
  .left {
    width: 60%;
    height: 100vh;
    background-color: #161d31;
    float: left;
    padding: 2em;
  }
  .right {
    width: 40%;
    float: left;
    height: 100vh;
    background-color: #283046;
  }
  .ant-checkbox-wrapper {
    color: #d0d2d6;
  }
  .ant-form-item {
    color: #d0d2d6;
  }
}
</style>
