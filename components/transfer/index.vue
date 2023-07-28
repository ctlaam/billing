<template>
  <div id="form-balance">
    <div class="title d-flex align-items-center">
      <div class="h2">Chuyển khoản</div>
      <div class="h4">
        Home >
        <span style="color: #5650b4"
          >Tạo phiếu chuyển khoản {{ itemSelected.name }}</span
        >
      </div>
    </div>
    <div class="d-flex">
      <div class="content-form">
        <a-form
          class="ant-advanced-search-form"
          :form="form"
          @submit="handleSearch"
        >
          <a-row :gutter="12">
            <a-col :span="12" :style="{ display: true ? 'block' : 'none' }">
              <a-form-item label="Số tiền cần chuyển">
                <a-input
                  @keydown="handleKeyDown"
                  v-decorator="[
                    'value_money',
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
            </a-col>
            <a-col :span="6" :style="{ display: true ? 'block' : 'none' }">
              <a-form-item label="Giờ">
                <a-time-picker
                  v-decorator="[
                    'time',
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
            </a-col>
            <a-col :span="6" :style="{ display: true ? 'block' : 'none' }">
              <a-form-item label="Ngày">
                <a-date-picker
                  :disabled-date="disabledDate"
                  v-decorator="[
                    'date',
                    {
                      initialValue: moment(dateNow, 'YYYY/MM/DD'),
                      // initialValue: moment('12:12', 'HH:mm'),
                      rules: [
                        {
                          required: true,
                          message: 'Nhập ngày chuyển khoản',
                        },
                      ],
                    },
                  ]"
                  placeholder="Chọn ngày"
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
            </a-col>
            <a-col
              v-if="['MBBank', 'ACB'].includes(itemSelected.name)"
              :span="12"
              :style="{ display: true ? 'block' : 'none' }"
            >
              <a-form-item label="Tên tài khoản nguồn">
                <a-input
                  v-decorator="[
                    'name_source',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Nhập tên tài khoản nguồn',
                        },
                      ],
                    },
                  ]"
                  placeholder="Nhập tên tài khoản nguồn"
                />
              </a-form-item>
            </a-col>
            <a-col
              v-if="['MBBank', 'ACB', 'MSB'].includes(itemSelected.name)"
              :span="12"
              :style="{ display: true ? 'block' : 'none' }"
            >
              <a-form-item label="Số tài khoản nguồn">
                <a-input
                  @keydown="handleKeyDown"
                  v-decorator="[
                    'bank_code_source',

                    {
                      rules: [
                        {
                          required: true,
                          message: 'Nhập số tài khoản nguồn',
                        },
                      ],
                    },
                  ]"
                  placeholder="Nhập số tài khoản nguồn"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12" :style="{ display: true ? 'block' : 'none' }">
              <a-form-item label="Tên người nhận">
                <a-input
                  v-decorator="[
                    'name',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Nhập tên người nhận',
                        },
                      ],
                    },
                  ]"
                  placeholder="Nhập tên người nhận"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12" :style="{ display: true ? 'block' : 'none' }">
              <a-form-item label="Số tài khoản người nhận">
                <a-input
                  @keydown="handleKeyDown"
                  v-decorator="[
                    'bank_code',

                    {
                      rules: [
                        {
                          required: true,
                          message: 'Nhập số tài khoản người nhận',
                        },
                      ],
                    },
                  ]"
                  placeholder="Nhập số tài khoản người nhận"
                />
              </a-form-item>
            </a-col>
            <a-col
              v-if="!['MSB'].includes(itemSelected.name)"
              :span="12"
              :style="{ display: true ? 'block' : 'none' }"
            >
              <a-form-item
                v-if="!['ACB', 'Techcombank'].includes(itemSelected.name)"
                label="Mã giao dịch (mã được tạo tự động) "
              >
                <a-input
                  :disabled="true"
                  v-decorator="[
                    'transfer_code',

                    {
                      initialValue: generateRandomNumberString,
                      rules: [
                        {
                          required: true,
                          message: 'Nhập mã giao dịch',
                        },
                      ],
                    },
                  ]"
                  placeholder="Nhập mã giao dịch"
                />
              </a-form-item>
            </a-col>
            <a-col
              v-if="!['MSB'].includes(itemSelected.name)"
              :span="12"
              :style="{ display: true ? 'block' : 'none' }"
            >
              <a-form-item label="Ngân hàng thụ hưởng">
                <a-select
                  v-decorator="[
                    'bank_name',

                    {
                      rules: [
                        {
                          required: true,
                          message: 'Chọn ngân hàng thụ hưởng',
                        },
                      ],
                    },
                  ]"
                  placeholder="Chọn ngân hàng thụ hưởng"
                >
                  <a-select-option v-for="i in listBanks" :key="i">
                    {{ i }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col
              v-if="!['MSB'].includes(itemSelected.name)"
              :span="12"
              :style="{ display: true ? 'block' : 'none' }"
            >
              <a-form-item
                v-if="!['ACB', 'Techcombank'].includes(itemSelected.name)"
                label="Mã giao dịch (mã được tạo tự động) "
              >
                <a-input
                  :disabled="true"
                  v-decorator="[
                    'transfer_code',

                    {
                      initialValue: generateRandomNumberString,
                      rules: [
                        {
                          required: true,
                          message: 'Nhập mã giao dịch',
                        },
                      ],
                    },
                  ]"
                  placeholder="Nhập mã giao dịch"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24" :style="{ display: true ? 'block' : 'none' }">
              <a-form-item label="Nội dung">
                <a-textarea
                  :auto-size="{ minRows: 2, maxRows: 6 }"
                  v-decorator="[
                    'description',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Nhập nội dung chuyển khoản',
                        },
                      ],
                    },
                  ]"
                  placeholder="Nhập nội dung chuyển khoản"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="12">
            <a-col
              v-if="
                !['ACB', 'Techcombank', 'Agribank'].includes(
                  this.itemSelected.name
                )
              "
              class="mb-5"
              :span="itemSelected.background.length > 2 ? 24 : 12"
              ><div class="title mb-4">Hình nền</div>
              <!-- <div class="list-item d-flex justify-content-evenly"> -->
              <a-radio-group v-model="background">
                <div class="row w-100">
                  <div
                    class="col-6 mb-4"
                    :class="
                      itemSelected.background.length > 2
                        ? 'col-md-2'
                        : 'col-md-4'
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
            </a-col>
            <a-col
              v-if="
                !['ACB', 'Techcombank', 'Agribank', 'MBBank'].includes(
                  this.itemSelected.name
                )
              "
              class="mb-5"
              :span="12"
              ><div class="title mb-4">Giao diện</div>
              <div class="list-item d-flex justify-content-evenly">
                <a-radio-group v-model="lightness">
                  <div class="item text-center">
                    <div class="img mb-2">
                      <img
                        style="max-width: 100px"
                        src="../../static/giaodien1.png"
                        alt=""
                      />
                    </div>
                    <a-radio value="light">Tối</a-radio>
                  </div>
                  <div class="item text-center">
                    <div class="img mb-2">
                      <img
                        style="max-width: 100px"
                        src="../../static/giaodien2.png"
                        alt=""
                      />
                    </div>
                    <a-radio value="dard">Sáng</a-radio>
                  </div>
                </a-radio-group>
              </div>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col
              v-if="
                !['ACB', 'Techcombank', 'Agribank', 'MBBank'].includes(
                  this.itemSelected.name
                )
              "
              class="mb-5"
              :span="8"
            >
              <div class="title mb-4">Ảnh đại diện</div>
              <div class="item">
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
            </a-col>
            <a-col
              v-if="
                ['ACB', 'Techcombank', 'Agribank', 'MBBank'].includes(
                  this.itemSelected.name
                )
              "
              class="mb-5"
              :span="6"
            >
              <div class="title mb-4">Giao diện</div>
              <div class="item">
                <a-radio :checked="true">Iphone 14 pro max</a-radio>
              </div>
            </a-col>

            <a-col
              v-if="['Agribank'].includes(itemSelected.name)"
              class="mb-5"
              :span="6"
            >
              <div class="title mb-4">Đăng ký OTT biến động số dư</div>
              <a-switch v-model="modeOTT" />
            </a-col>
            <a-col class="mb-5" :span="6">
              <div class="title mb-4">Chế độ nguồn điện thấp</div>
              <a-switch v-model="modeBaterry" />
            </a-col>
            <a-col class="mb-5" :span="4"
              ><div class="title mb-4">Phần trăm pin</div>
              <a-input-number
                id="inputNumber"
                v-model="percentBaterry"
                :min="1"
                :max="100"
                @change="isNumber"
                @keydown="handleKeyDown"
                :formatter="(percentBaterry) => `${percentBaterry}%`"
            /></a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col class="mb-5" :span="12"
              ><div class="title mb-4">Chế độ mạng</div>
              <div class="list-item d-flex justify-content-evenly">
                <a-radio-group v-model="internetWifi">
                  <div class="item text-center">
                    <div>
                      <a-radio value="wifi">Wifi</a-radio>

                      <a-input-number
                        id="inputNumber"
                        v-model="wifi"
                        :min="1"
                        :max="4"
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
            </a-col>
            <a-col class="mb-5" :span="12"
              ><div class="title mb-4">Sim</div>
              <div class="list-item d-flex justify-content-evenly">
                <a-radio-group v-model="modeSim">
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
                  <div class="item text-center">
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
                  </div>
                </a-radio-group>
              </div>
            </a-col>
          </a-row>
          <a-row class="mt-5">
            <a-col :span="24" :style="{ textAlign: 'left' }">
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
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="example-img">
        <img
          v-if="dynamicImagePath"
          :src="require(`~/assets/transfer/${dynamicImagePath}`)"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as transferAPi from '../../api/transfer.js'
import axios from 'axios'

import moment from 'moment'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  props: ['itemSelected'],
  created() {
    if (!this.itemSelected) {
      this.$router.push('/transfer')
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
      dateNow: null,
      timeNow: null,
      listBanks: [
        'Ngân hàng Quân Đội (MB)',
        'Vietcombank',
        'Bidv',
        'Vietinbank',
      ],
      background: 'hinhnen1',
      lightness: 'light',
      avatar: null,
      modeBaterry: false,
      modeSim: 'simone',
      modeOTT: false,
    }
  },
  created() {
    this.dateNow = moment(new Date()).format('YYYY/MM/DD')
    this.timeNow = moment(new Date()).format('HH:mm')
  },
  computed: {
    dynamicImagePath() {
      return this.itemSelected.url_example
    },
    generateRandomNumberString() {
      let result = ''
      const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const characters = '0123456789'
      switch (this.itemSelected.name) {
        case 'Vietcombank':
          for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            result += characters.charAt(randomIndex)
          }

          break
        case 'MBBank':
          for (let i = 0; i < 2; i++) {
            result += upperCaseLetters.charAt(
              Math.floor(Math.random() * upperCaseLetters.length)
            )
          }

          // Tạo 14 kí tự số sau
          for (let i = 0; i < 14; i++) {
            result += characters.charAt(
              Math.floor(Math.random() * characters.length)
            )
          }
          break
        case 'Techcombank':
          for (let i = 0; i < 2; i++) {
            result += upperCaseLetters.charAt(
              Math.floor(Math.random() * upperCaseLetters.length)
            )
          }

          // Tạo 14 kí tự số sau
          for (let i = 0; i < 14; i++) {
            result += characters.charAt(
              Math.floor(Math.random() * characters.length)
            )
          }
          break
        case 'Agribank':
          // Tạo 14 kí tự số sau
          for (let i = 0; i < 6; i++) {
            result += characters.charAt(
              Math.floor(Math.random() * characters.length)
            )
          }
          break
        default:
          break
      }
      return result
    },
  },
  methods: {
    disabledDate(current) {
      // Lấy ngày hiện tại
      const currentDate = moment()

      // Để vô hiệu hóa các ngày trong tương lai, ta so sánh ngày hiện tại với ngày được chọn
      return current && current > currentDate.endOf('day')
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
    handleChangeImg(info) {
      if (info.file.status === 'uploading') {
        this.loadingImg = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loadingImg = false
        })
      }
    },
    beforeUploadImg(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    moment,
    async handleSearch(e) {
      e.preventDefault()
      this.form.validateFields(async (error, values) => {
        const dateMoment = moment(values.date, 'YYYY-MM-DD')
        const dateTimeString = moment(values.time, 'HH:mm').format('HH:mm')
        // Lấy ngày trong tuần (thứ mấy), trong đó 0 là Chủ nhật, 1 là Thứ 2, 2 là Thứ 3, và cứ tiếp tục
        const dayOfWeek = dateMoment.day()
        let dayOfWeekText
        switch (dayOfWeek) {
          case 0:
            dayOfWeekText = 'Chủ Nhật'
            break
          case 1:
            dayOfWeekText = 'Thứ Hai'
            break
          case 2:
            dayOfWeekText = 'Thứ Ba'
            break
          case 3:
            dayOfWeekText = 'Thứ Tư'
            break
          case 4:
            dayOfWeekText = 'Thứ Năm'
            break
          case 5:
            dayOfWeekText = 'Thứ Sáu'
            break
          case 6:
            dayOfWeekText = 'Thứ Bảy'
            break
          default:
            dayOfWeekText = 'Không xác định'
        }
        let formData = {
          sms: '3',
          wifi: this.wifi.toString(),
          time: dateTimeString,
          value_money: values.value_money,
          date: values.date,
          day_name: dayOfWeekText,
          name: values.name,
          bank_code: values.bank_code,
          bank_name: values.bank_name,
          transfer_code: values.transfer_code,
          description: values.description,
        }
        this.$store.dispatch('loading/setModalLoading', true)
        await transferAPi
          .getPhoto(formData)
          .then((res) => {
            let downloadUrl = res.link
            var a = document.createElement('a')
            a.href = downloadUrl //make the link of image
            a.download = 'autobill'
            a.target = '_blank' // Mở trong tab mới
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            this.$message.success({
              content: 'Tạo ảnh thành công',
              key: 'success',
            })
            this.$store.dispatch('loading/setModalLoading', false)
          })
          .catch((error) => {
            console.log(error)
            this.$message.error({
              content: 'Có lỗi xảy ra, vui lòng thử lại',
              key: 'error',
            })
            this.$store.dispatch('loading/setModalLoading', false)
          })
      })
    },
  },
}
</script>

<style lang="scss">
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
  .ant-radio-group {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
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
}
</style>
