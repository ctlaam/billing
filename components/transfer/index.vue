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
    <div @click="$emit('showOrHideForm', false)" class="p-3 h2 title">
      <a-button class="d-flex align-items-center button-56">
        <a-icon type="arrow-left" /> Đổi ngân hàng</a-button
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
            <div class="col-md-6" :style="{ display: true ? 'block' : 'none' }">
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
            </div>
            <div
              class="col-md-3 col-6"
              :style="{ display: true ? 'block' : 'none' }"
            >
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
            </div>
            <div
              class="col-md-3 col-6"
              :style="{ display: true ? 'block' : 'none' }"
            >
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
            </div>
            <div
              v-if="['MBBank', 'ACB'].includes(itemSelected.name)"
              class="col-md-6"
              :style="{ display: true ? 'block' : 'none' }"
            >
              <a-form-item label="Tên tài khoản nguồn">
                <a-input
                  v-decorator="[
                    'name_sender',
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
            </div>
            <div
              v-if="
                ['MBBank', 'ACB', 'MSB', 'Sacombank'].includes(
                  itemSelected.name
                )
              "
              class="col-md-6"
              :style="{ display: true ? 'block' : 'none' }"
            >
              <a-form-item label="Số tài khoản nguồn">
                <a-input
                  @keydown="handleKeyDown"
                  v-decorator="[
                    'bank_code_sender',

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
            </div>
            <div class="col-md-6" :style="{ display: true ? 'block' : 'none' }">
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
            </div>
            <div class="col-md-6" :style="{ display: true ? 'block' : 'none' }">
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
            </div>
            <!-- <div
              v-if="!['MSB'].includes(itemSelected.name)"
              class="col-md-6"
              :style="{ display: true ? 'block' : 'none' }"
            >
              <a-form-item
                v-if="!['ACB', 'Techcombank'].includes(itemSelected.name)"
                label="Mã giao dịch (mã được tạo tự động) "
              >
                <a-input
                  
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
            </div> -->
            <div
              v-if="!['MSB'].includes(itemSelected.name)"
              class="col-md-6"
              :style="{ display: true ? 'block' : 'none' }"
            >
              <a-form-item label="Ngân hàng thụ hưởng">
                <a-select
                  :getPopupContainer="(trigger) => trigger.parentElement"
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
                  <a-select-option
                    v-for="(i, index) in listBanks"
                    :value="i.bank_name"
                    :key="index"
                  >
                    {{ i.bank_name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </div>
            <div
              v-if="!['ACB', 'MSB'].includes(itemSelected.name)"
              class="col-md-6"
              :style="{ display: true ? 'block' : 'none' }"
            >
              <a-form-item label="Mã giao dịch (mã được tạo tự động) ">
                <a-input
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
            </div>
            <div :span="24" :style="{ display: true ? 'block' : 'none' }">
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
            </div>
          </div>
          <!-- <div class="row">
            <div
              v-if="
                !['ACB', 'Techcombank', 'Agribank', 'MSB'].includes(
                  this.itemSelected.name
                )
              "
              class="mb-5"
              :class="
                itemSelected.background.length > 2
                  ? 'col-xl-12 col-md-12'
                  : 'col-xl-6 col-md-6'
              "
            >
              <div class="title mb-4">Hình nền</div>
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
                </div>
              </a-radio-group>
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
              <div class="list-item row">
                <a-radio-group v-model="lightness">
                  <div class="item col-6">
                    <div class="img mb-2">
                      <img
                        style="max-width: 100px"
                        src="../../static/giaodien1.png"
                        alt=""
                      />
                    </div>
                    <a-radio value="light">Tối</a-radio>
                  </div>
                  <div class="item col-6">
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
            </div>
          </div> -->
          <div class="row">
            <!-- <div
              v-if="
                !['ACB', 'Techcombank', 'Agribank', 'MBBank', 'MSB'].includes(
                  this.itemSelected.name
                )
              "
              class="mb-5 col-md-6 col-12"
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
            </div> -->
            <div class="col-md-6 mb-5 col-12">
              <div class="title mb-4 col-12">Giao diện</div>
              <div class="item">
                <a-radio :checked="true"> Iphone 12 pro </a-radio>
              </div>
            </div>

            <div
              v-if="['Agribank'].includes(itemSelected.name)"
              class="col-md-6 mb-5 col-12"
            >
              <div class="title mb-4">Đăng ký OTT biến động số dư</div>
              <a-switch v-model="modeOTT" />
            </div>
            <div class="col-md-6 mb-5 col-12">
              <div class="title mb-4">Chế độ đang sạc</div>
              <a-switch v-model="modeBaterry" />
            </div>
            <div class="mb-5 col-md-6 col-12">
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
            <div :span="24" :style="{ textAlign: 'left' }">
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
      background: 'hinhnen1',
      lightness: 'light',
      avatar: null,
      modeBaterry: false,
      modeSim: 'simone',
      modeOTT: false,
      listBanks: [],
    }
  },
  created() {
    this.dateNow = moment().format('YYYY/MM/DD')
    this.timeNow = moment().format('HH:mm')
    this.getListBanks()
    if (!this.itemSelected) {
      this.$router.push('/transfer')
    }
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
          const currentDate = new Date()
          const currentYear = currentDate.getFullYear().toString().slice(-2)
          result = `FT${currentYear}`
          // Tạo 14 kí tự số sau
          for (let i = 0; i < 12; i++) {
            result += characters.charAt(
              Math.floor(Math.random() * characters.length)
            )
          }
          break
        case 'Agribank':
          // Tạo 6 kí tự số sau
          for (let i = 0; i < 6; i++) {
            result += characters.charAt(
              Math.floor(Math.random() * characters.length)
            )
          }
          break
        case 'Sacombank':
          // Tạo 9 kí tự số sau
          for (let i = 0; i < 9; i++) {
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
  watch: {
    itemSelected() {
      this.getListBanks()
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
    async getListBanks() {
      await transferAPi
        .getListBank(this.itemSelected.name_api)
        .then((res) => {
          this.listBanks = res.list_bank
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // Lâm
    async handleSearch(e) {
      e.preventDefault()
      this.form.validateFields(async (error, values) => {
        const dateMoment = moment().format('YYYY-MM-DD')
        const timeMoment = moment(values.time).format('HH:mm:ss')
        const combinedISODate = dateMoment + 'T' + timeMoment + '.000Z'
        let formData = {
          type_pin: this.modeBaterry ? 'is_charging' : 'is_normal',
          pin_code: Math.floor(this.percentBaterry / 10.01) ?? 0,
          sms: this.sim1 ?? 1,
          wifi: this.internetWifi == 'wifi' ? this.wifi.toString() : 'LTE',
          value_money: values.value_money ?? 0,
          date: combinedISODate,
          name_sender: values.name_sender || null,
          // time: dateTimeString,
          // day_name: dayOfWeekText,
          bank_code_sender: values.bank_code_sender || null,
          bank_code: values.bank_code || null,
          name: values.name || null,
          bank_name: values.bank_name || null,
          transfer_code: values.transfer_code || null,
          description: values.description || null,
        }
        this.$store.dispatch('loading/setModalLoading', true)
        await transferAPi
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
  .title {
    color: #d0d2d6;
  }
  .content-form {
    padding: 1rem;
    margin-right: 2rem;
    width: 75%;
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
  .button-56 {
    align-items: center;
    background-color: #ffdbd6;
    border: 2px solid #111;
    border-radius: 8px;
    box-sizing: border-box;
    color: #111;
    cursor: pointer;
    display: flex;
    font-family: Inter, sans-serif;
    font-size: 16px;
    height: 36px;
    justify-content: center;
    line-height: 24px;
    max-width: 100%;
    padding: 10px 10px;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  .button-56:after {
    background-color: #dddddd;
    border-radius: 8px;
    content: '';
    display: block;
    height: 36px;
    left: 0;
    width: 100%;
    position: absolute;
    top: -2px;
    transform: translate(8px, 8px);
    transition: transform 0.2s ease-out;
    z-index: -1;
  }

  .button-56:hover:after {
    transform: translate(0, 0);
  }

  .button-56:active {
    background-color: #ffdeda;
    outline: 0;
  }

  .button-56:hover {
    outline: 0;
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
  #form-balance .example-img {
    width: 100% !important;
    float: left;
    margin-top: 20px;
  }
  #form-balance .title .h2 {
    display: none;
  }
}
</style>
