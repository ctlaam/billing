<template>
  <div id="form-balance">
    <div class="title d-flex align-items-center">
      <div class="h2">Số dư</div>
      <div class="h4">
        Home >
        <span style="color: #5650b4"
          >Tạo phiếu số dư {{ itemSelected.name }}</span
        >
      </div>
    </div>
    <div @click="$emit('showOrHideForm', false)" class="p-3 h2 title">
      <a-button class="d-flex align-items-center">
        <a-icon type="arrow-left" /> Quay lại</a-button
      >
    </div>
    <div class="d-flex form">
      <div class="content-form">
        <a-form
          class="ant-advanced-search-form"
          :form="form"
          @submit="handleSearch"
        >
          <div class="row">
            <div
              class="col-md-6 col-12"
              :style="{ display: true ? 'block' : 'none' }"
            >
              <a-form-item label="Số tiền">
                <a-input
                  @keydown="handleKeyDown"
                  v-decorator="[
                    'money',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Nhập số tiền!',
                        },
                      ],
                    },
                  ]"
                  placeholder="Nhập số tiền cần làm giả"
                />
              </a-form-item>
            </div>
            <div
              class="col-md-6 col-12"
              :style="{ display: true ? 'block' : 'none' }"
            >
              <a-form-item label="Giờ">
                <a-time-picker
                  v-decorator="[
                    'timer',
                    {
                      initialValue: moment(timeNow, 'HH:mm'),
                      rules: [
                        {
                          required: true,
                          message: 'Nhập giờ chuyển khoản',
                        },
                      ],
                    },
                  ]"
                  format="hh:mm a"
                  placeholder="Chọn giờ"
                />
                <!-- <a-input
                v-decorator="[
                  'password',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Input something!',
                      },
                    ],
                  },
                ]"
                placeholder="placeholder"
              /> -->
              </a-form-item>
            </div>
            <div
              class="col-md-6 col-12"
              :style="{ display: true ? 'block' : 'none' }"
            >
              <a-form-item label="Tên tài khoản">
                <a-input
                  v-decorator="[
                    'name',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Nhập tên tài khoản',
                        },
                      ],
                    },
                  ]"
                  placeholder="Nhập tên tài khoản của bạn"
                />
              </a-form-item>
            </div>
            <div
              class="col-md-6 col-12"
              :style="{ display: true ? 'block' : 'none' }"
            >
              <a-form-item label="Số tài khoản">
                <a-input
                  @keydown="handleKeyDown"
                  v-decorator="[
                    'account_number',

                    {
                      rules: [
                        {
                          required: true,
                          message: 'Nhập số tài khoản',
                        },
                      ],
                    },
                  ]"
                  placeholder="Nhập số tài khoản của bạn"
                />
              </a-form-item>
            </div>
          </div>
          <div class="row">
            <div
              v-if="
                ![
                  'ACB',
                  'Techcombank',
                  'Agribank',
                  'MSB',
                  'TpBank',
                  'Vietcombank',
                  'VietinBank',
                ].includes(this.itemSelected.name)
              "
              class="mb-5"
              :class="
                itemSelected.background.length > 2
                  ? 'col-xl-12 col-md-12'
                  : 'col-xl-6 col-md-6'
              "
            >
              <div class="title mb-4">Hình nền</div>
              <!-- <div class="list-item d-flex justify-content-evenly"> -->
              <a-radio-group v-model="background">
                <div class="row w-100">
                  <div
                    class="col-6 mb-4"
                    :class="
                      itemSelected.background.length > 2
                        ? ' col-md-3'
                        : 'col-md-6'
                    "
                    v-for="(background, index) in itemSelected.background"
                    :key="index"
                  >
                    <div class="item">
                      <div class="img mb-2">
                        <img
                          style="max-width: 100px"
                          :src="require(`~/assets/background${background}`)"
                          alt=""
                        />
                      </div>
                      <a-radio :value="`hinhnen${index + 1}`"
                        >Hình nền {{ index + 1 }}</a-radio
                      >
                    </div>
                  </div>
                  <!-- <div class="item text-center">
                    <div class="img mb-2">
                      <img style="max-width: 100px" src="" alt="" />
                    </div>
                    <a-radio value="hinhnen2">Hình nền 2</a-radio>
                  </div> -->
                </div>
              </a-radio-group>
              <!-- </div> -->
            </div>
            <div
              v-if="
                !['ACB', 'Techcombank', 'Agribank', 'MBBank', 'MSB'].includes(
                  this.itemSelected.name
                )
              "
              class="col-md-6 mb-5"
            >
              <div class="title mb-4">Giao diện</div>
              <div class="list-item d-flex justify-content-evenly">
                <a-radio-group v-model="lightness">
                  <template v-if="itemSelected.theme.length">
                    <div class="item text-center">
                      <div class="img mb-2">
                        <img
                          style="max-width: 100px"
                          :src="
                            require(`~/assets/theme${itemSelected.theme[1]}`)
                          "
                          alt=""
                        />
                      </div>
                      <a-radio value="dark">Tối</a-radio>
                    </div>
                    <div class="item text-center">
                      <div class="img mb-2">
                        <img
                          style="max-width: 100px"
                          :src="
                            require(`~/assets/theme${itemSelected.theme[0]}`)
                          "
                          alt=""
                        />
                      </div>
                      <a-radio value="light">Sáng</a-radio>
                    </div>
                  </template>
                </a-radio-group>
              </div>
            </div>
          </div>
          <div class="row">
            <div
              v-if="
                ![
                  'ACB',
                  'Techcombank',
                  'Agribank',
                  'MBBank',
                  'MSB',
                  'VietinBank',
                ].includes(this.itemSelected.name) && false
              "
              class="mb-5 col-md-6 col-12"
            >
              <div class="title mb-4">Ảnh đại diện</div>
              <div class="item">
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  :before-upload="beforeUploadImg"
                  @change="handleChangeImg"
                  v-model="avatar"
                >
                  <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                  <div v-else>
                    <a-icon :type="loadingImg ? 'loadingImg' : 'plus'" />
                    <div class="ant-upload-text">Tải lên</div>
                  </div>
                </a-upload>
              </div>
            </div>
            <div
              v-if="
                ['ACB', 'Techcombank', 'Agribank', 'MBBank', 'MSB'].includes(
                  this.itemSelected.name
                )
              "
              class="mb-5 col-md-6 mb-5 col-12"
            >
              <div class="title mb-4">Giao diện</div>
              <div class="item">
                <a-radio :checked="true">Iphone 12 pro </a-radio>
              </div>
            </div>

            <div
              v-if="['Agribank'].includes(itemSelected.name)"
              class="mb-5 col-md-6 mb-5 col-12"
            >
              <div class="title mb-4">Đăng ký OTT biến động số dư</div>
              <a-switch v-model="modeOTT" />
            </div>
            <div class="mb-5 col-md-6 mb-5 col-12">
              <div class="title mb-4">Chế độ đang sạc</div>
              <a-switch v-model="modeBaterry" />
            </div>
            <div class="mb-5 col-md-6 mb-5 col-12">
              <div class="title mb-4">Phần trăm pin</div>
              <a-input-number
                id="inputNumber"
                v-model="percentBaterry"
                :min="1"
                :max="100"
                @change="isNumber"
                @keydown="handleKeyDown"
                :formatter="(percentBaterry) => `${percentBaterry}%`"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-xl-5 mb-5 col-12">
              <div class="title mb-4">Chế độ mạng</div>
              <div class="list-item d-flex">
                <a-radio-group class="mode-radio" v-model="internetWifi">
                  <div class="item text-center">
                    <div>
                      <a-radio value="wifi">Wifi</a-radio>

                      <a-input-number
                        id="inputNumber"
                        v-model="wifi"
                        :min="1"
                        :max="3"
                        @change="isNumber2"
                        @keydown="handleKeyDown"
                        :disabled="internetWifi === '4G'"
                      />
                    </div>
                  </div>
                  <div class="item text-center">
                    <a-radio value="4G" style="line-height: 32px">4G</a-radio>
                  </div>
                </a-radio-group>
              </div>
            </div>
            <div class="col-xl-7 mb-5 col-12">
              <div class="title mb-4">Sim</div>
              <div class="list-item d-flex">
                <a-radio-group class="mode-radio" v-model="modeSim">
                  <div class="item text-center">
                    <div>
                      <a-radio value="simone">Sim 1</a-radio>
                      <a-input-number
                        id="sim1"
                        :min="1"
                        :max="4"
                        @change="isNumber3"
                        @keydown="handleKeyDown"
                        v-model="sim1"
                        :disabled="modeSim === 'simtwo'"
                      />
                    </div>
                  </div>
                  <!-- <div class="item text-center">
                    <a-radio style="line-height: 32px" value="simtwo"
                      >Sim 2</a-radio
                    >
                    <a-input-number
                      id="sim2"
                      :min="1"
                      :max="4"
                      @change="isNumber4"
                      @keydown="handleKeyDown"
                      v-model="sim2"
                      :disabled="modeSim === 'simone'"
                    />
                  </div> -->
                </a-radio-group>
              </div>
            </div>
          </div>
          <div class="mt-5">
            <div class="col-12" :style="{ textAlign: 'left' }">
              <a-button
                class="btn-create d-flex align-items-center justify-content-center"
                style="
                  background-color: #48cf85;
                  border-color: #3ecd7d;
                  color: #fff;
                "
                html-type="submit"
              >
                <a-icon type="plus-circle" /> Tạo ảnh
              </a-button>
            </div>
          </div>
        </a-form>
      </div>
      <div class="example-img">
        <img
          v-if="dynamicImagePath"
          :src="require(`~/assets/balance/${dynamicImagePath}`)"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import * as apiBalance from '../../api/balance.js'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  props: ['itemSelected'],
  created() {
    if (!this.itemSelected) {
      this.$router.push('/balance')
    }
  },
  data() {
    return {
      expand: false,
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      loadingImg: false,
      imageUrl: '',
      baterry: false,
      percentBaterry: 68,
      money: null,
      wifi: 2,
      internetWifi: 'wifi',
      oneSim: true,
      sim1: 4,
      sim2: 4,
      url: null,
      timeNow: null,
      background: 'hinhnen1',
      lightness: 'dark',
      avatar: null,
      modeBaterry: false,
      modeSim: 'simone',
      modeOTT: false,
    }
  },
  created() {
    this.timeNow = moment(new Date()).format('HH:mm')
  },
  computed: {
    dynamicImagePath() {
      return this.itemSelected.url_example
    },
  },
  methods: {
    resetForm() {
      this.form.resetFields()
      this.modeSim = 'simone'
      this.modeBaterry = false
      this.modeOTT = false
      this.percentBaterry = 68
      this.internetWifi = 'wifi'
      this.wifi = 2
      this.sim1 = 4
    },
    filterCurrency(currency, text = '') {
      if (currency) {
        currency = Math.round(currency)
        var input = currency.toString().replace(/\./g, '').split('')
        var arr = []

        while (input.length >= 3) {
          var l = input.slice(input.length - 3, input.length)
          input.splice(input.length - 3, 1)
          input.splice(input.length - 2, 1)
          input.splice(input.length - 1, 1)
          arr.unshift(l.join(''))
        }

        if (input.length > 0) {
          arr.unshift(input.join(''))
        }

        if (arr.length >= 2) {
          currency = arr.join('.')
        }
      } else {
        if (text) {
          return text
        }
        return 0
      }

      if (!currency) {
        return 0
      }

      return currency
    },
    handleKeyDown(e) {
      const key = e.key
      const isSpecialCharacter = /^[a-zA-Z!@#$%^&*(),.?":{}|<>]$/.test(key)
      if (isSpecialCharacter) {
        this.$message.error({ content: 'Vui lòng chỉ nhập số', key: 'number' })
        e.preventDefault()
      }
    },
    isNumber3(value) {
      if (value > 4) {
        this.sim1 = 4
      } else if (value < 1 || !value) {
        this.sim1 = 1
      }
    },
    isNumber4(value) {
      if (value > 4) {
        this.sim2 = 4
      } else if (value < 1 || !value) {
        this.sim2 = 1
      }
    },
    isNumber2(value) {
      if (value > 4) {
        this.wifi = 4
      } else if (value < 1 || !value) {
        this.wifi = 1
      }
    },
    isNumber(value) {
      if (value > 100) {
        this.percentBaterry = 100
      } else if (value < 1 || !value) {
        this.percentBaterry = 1
      }
    },
    // for upload img
    async handleChangeImg(info) {
      let me = this
      if (info.file.status === 'uploading') {
        this.loadingImg = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        await getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          me.avatar = imageUrl
          this.loadingImg = false
        })
      }
    },
    beforeUploadImg(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('File tải lên không hợp lệ')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Dung lượng file phải nhỏ hơn 2MB')
      }
      return isJpgOrPng && isLt2M
    },
    moment,
    async handleSearch(e) {
      e.preventDefault()
      this.form.validateFields(async (error, values) => {
        if (error) {
          this.$message.error({
            content: 'Vui lòng nhập đầy đủ thông tin',
            key: 'error',
          })
          return
        }
        const dateMoment = moment(values.date).format('YYYY-MM-DD')
        const timeMoment = moment(values.time)
          .add(Math.floor(Math.random() * 59), 'seconds')
          .format('HH:mm:ss')
        const combinedISODate = dateMoment + 'T' + timeMoment + '.000Z'
        let formData = {
          type_pin: this.modeBaterry ? 'is_charging' : 'is_normal',
          pin_code: Math.floor(this.percentBaterry / 10.01) ?? 0,
          sms: this.sim1 ?? 1,
          wifi: this.internetWifi == 'wifi' ? this.wifi.toString() : 'LTE',
          date: combinedISODate,
          money: values.money,
          account_number: values.account_number,
          name: values.name,
          avatar: this.avatar,
          inick: this.inick || ' ',
          mode: this.lightness,
        }
        this.$store.dispatch('loading/setModalLoading', true)
        await apiBalance
          .getPhoto(this.itemSelected.name_api, formData)
          .then((res) => {
            let downloadUrl = res.link
            var a = document.createElement('a')
            a.href = downloadUrl //make the link of image
            a.download = 'autobill'
            a.target = '_blank' // Mở trong tab mới
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            this.resetForm()
            this.$message.success({
              content: 'Tạo ảnh thành công',
              key: 'success',
            })
            this.$store.dispatch('loading/setModalLoading', false)
          })
          .catch((error) => {
            this.resetForm()
            this.$store.dispatch('loading/setModalLoading', false)
            this.$message.error({
              content:
                'Bạn chưa có quyền dùng chức năng này, vui lòng liên hệ admin để được trợ giúp',
              key: 'error',
            })
          })
        setTimeout(() => {
          this.$store.dispatch('loading/setModalLoading', false)
        }, 3000)
      })
    },
  },
}
</script>

<style lang="scss">
.ant-upload.ant-upload-select.ant-upload-select-picture-card img {
  width: 128px;
}
#form-balance {
  .title {
    .h2 {
      border-right: 1px solid #ccc;
      padding: 0 1rem;
      color: #aaadb4;
    }
    .h4 {
      margin-left: 1rem;
    }
  }
  .content-form {
    padding: 1rem;
    margin-right: 2rem;
    color: #d0d2d6;
    background-color: #283046;
    float: left;
    flex: 1 1 auto;
    .ant-col {
      color: #d0d2d6;
    }
    .ant-advanced-search-form {
      label.ant-form-item-required {
        color: #d0d2d6;
      }
      .ant-checkbox-wrapper {
        color: #d0d2d6;
      }
    }
    .btn-create {
      &:hover {
        box-shadow: 0 8px 25px -8px #28c76f;
      }
    }
  }
  .example-img {
    width: 30%;
    float: left;
    img {
      max-width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
  .mode-radio.ant-radio-group {
    justify-content: space-between !important;
    padding: 0 4rem;
  }
}
@media only screen and (max-width: 1024px) {
  #form-balance .content-form {
    width: 80%;
  }
  #form-balance .ant-radio-group {
    justify-content: start;
    .item.text-center {
      margin-right: 20px;
    }
  }
}
@media only screen and (max-width: 900px) {
  #form-balance .example-img {
    width: 100% !important;
    float: left;
    margin-top: 20px;
  }
  #form-balance {
    .d-flex.form {
      display: block !important;
      width: 100%;
      margin-bottom: 2em;
      .ant-input-number {
        width: 60px;
      }
      .ant-form label {
        margin: 0;
      }
    }
    .content-form {
      margin: 0;
      width: 100%;
    }
  }
}
@media only screen and (max-width: 575px) {
  #form-balance {
    .d-flex.form {
      display: block !important;
      width: 100%;
      margin-bottom: 2em;
      .ant-input-number {
        width: 60px;
      }
      .ant-form label {
        margin: 0;
      }
    }
    .content-form {
      margin: 0;
      width: 100%;
    }
  }

  #form-balance .title .h2 {
    display: none;
  }
}
</style>
