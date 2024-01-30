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
        <div class="logo">
          <img src="../../static/logo.png" alt="" />
        </div>
        <h1 class="card-title mb-4 text-center">
          Chào mừng đến với fakebill.online! 👋
        </h1>
        <h4 class="mb-4 text-center">
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
          <a-form-item>
            <a-input
              v-decorator="['tele_id', {}]"
              type="text"
              placeholder="Nhập tài khoản telegram"
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
      <div class="w-70 intro">
        <h3 class="p-2 text-justify text-uppercase">
          Nhập tài khoản telegram để chúng tôi liên hệ với bạn trong trường hợp bạn mất mật khẩu
        </h3>
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
      this.$router.push('/login')
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
            .signUp({
              email: values.email,
              password: values.password,
              tele_id: values.tele_id,
            })
            .then((res) => {
              this.$message.success('Đăng kí thành công !')
              this.$router.push('/login')
            })
            .catch((err) => {
              if (err == 400) {
                this.$message.error('Email đã tồn tại !')
              } else {
                this.$message.error('Đăng kí thất bại !')
              }
            })
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
@media only screen and (min-width: 1025px) and (max-width: 1280px) {
  #signup {
    img {
      width: 100%;
    }
  }
}
@media only screen and (max-width: 1024px) {
  #signup {
    .left {
      display: none;
    }
    .right {
      width: 100%;
      .logo {
        display: block;
        text-align: center;
        margin-bottom: 2em;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
