<template>
  <div id="signup">
    <div class="left">
      <div class="logo">
        <img src="../../static/logo_funnybill2.png" alt="" />
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
          <img width="200" src="../../static/ICON2.png" alt="" />
        </div>
        <h1 class="card-title mb-4 text-center">
          Chào mừng đến với funnybill.pro! 👋
        </h1>
        <h4 class="mb-4 text-center">
          Vui lòng đăng nhập để sử dụng chức năng trên hệ thống
        </h4>
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
        >
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
              placeholder="Password"
            >
            </a-input>
          </a-form-item>
          <a-form-item>
            <div class="w-100 d-flex">
              <a-checkbox
                class="w-50"
                v-decorator="[
                  'remember',
                  {
                    valuePropName: 'checked',
                    initialValue: true,
                  },
                ]"
              >
                Nhớ mật khẩu
              </a-checkbox>
              <div class="w-50 text-end">
                <a class="login-form-forgot text-right" href="">
                  Quên mật khẩu
                </a>
              </div>
            </div>

            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button w-100"
            >
              Đăng nhập
            </a-button>
            Hoặc
            <a @click="singUp" style="color: #008dff"> Đăng kí ngay </a>
          </a-form-item>
        </a-form>
      </div>
      <div class="w-70 intro">
        <h2 class="text-center p-2">
          Tài khoản đăng ký mới trong thời gian test có
          <span
            style="
              background: -webkit-linear-gradient(#e90000, #faa6ff);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-weight: 700;
            "
            >1 LƯỢT TẠO BILL</span
          >
        </h2>
        <h3 class="p-2 text-justify">
          Nhằm phục vụ cho anh em chơi tết, troll người thân, gửi đến nhau những
          lời chúc năm mới, sống ảo... Chỉ với 200k anh em đã có thể thỏa thích
          tạo bill không giới hạn. Để được kích hoạt gói tài khoản VIP không
          giới hạn lượt tạo bill, anh em liên hệ với <span class="p-2 text-justify">
          <a
            style="color: #fff"
            class="badge rounded-pill bg-warning draggable"
            href="https://t.me/vulethin"
            target="_blank"
            >ADMIN</a
          >
        </span> để được hỗ trợ
          trực tiếp. Chúc anh em chơi tết vui vẻ !!
        </h3>     
        <h3 class="p-2 text-justify">
          LƯU Ý BÊN MÌNH CHỈ GIAO DỊCH DUY NHẤT QUA ĐƯỜNG LINK TELEGRAM Ở TRÊN
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import * as authApi from '../../api/auth.js'
import Cookies from 'js-cookie'
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
    singUp() {
      this.$router.push('/login/signup')
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch('loading/setModalLoading', true)

          authApi
            .logIn({
              email: values.email,
              password: values.password,
            })
            .then((res) => {
              this.$store.dispatch('loading/setModalLoading', false)
              this.$message.success('Đăng nhập thành công')
              this.$store.dispatch('auth/login', {
                accessToken: res.tokens.access,
                refreshToken: res.tokens.refresh,
                userId: res.id,
                time_valid: res.time_valid,
              })
              Cookies.set('access_token', res.tokens.access, { expires: 1 })
              Cookies.set('refresh_token', res.tokens.refresh, { expires: 1 })
              Cookies.set('user_id', res.id, { expires: 1 })
              Cookies.set('time_valid', res.time_valid, { expires: 1 })
              Cookies.set('test', true, { expires: 1 })
              this.$router.push('/')
            })
            .catch((err) => {
              this.$store.dispatch('loading/setModalLoading', false)
              if (err.message) {
                this.$message.error('Sai tài khoản hoặc mật khẩu')
              } else {
                this.$message.error('Có lỗi xảy ra vui lòng thử lại sau')
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
    img {
      width: 80%;
    }
  }
  .right {
    width: 40%;
    float: left;
    height: 100vh;
    background-color: #283046;
    .logo {
      display: none;
    }
    .intro {
      background: -webkit-linear-gradient(#18a57a, #bfffc7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      a {
        -webkit-text-fill-color: #fff;
      }
    }
    flex-direction: column;
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
      margin-top: 10px;
      width: 100%;
      .logo {
        display: block;
        text-align: center;
        margin-bottom: 2em;
      }
    }
  }
}
</style>
