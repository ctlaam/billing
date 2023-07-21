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
            </a-col>
            <a-col :span="6" :style="{ display: true ? 'block' : 'none' }">
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
            <a-col :span="12" :style="{ display: true ? 'block' : 'none' }">
              <a-form-item label="Tên người nhận">
                <a-input
                  v-decorator="[
                    'nameAccountRecive',
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
                    'accountNumberRecive',

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
            <a-col :span="12" :style="{ display: true ? 'block' : 'none' }">
              <a-form-item label="Ngân hàng thụ hưởng">
                <a-select
                  v-decorator="[
                    'bankNameRecive',

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
                    v-for="i in 25"
                    :key="(i + 9).toString(36) + i"
                  >
                    {{ (i + 9).toString(36) + i }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12" :style="{ display: true ? 'block' : 'none' }">
              <a-form-item label="Mã giao dịch (mã được tạo tự động) ">
                <a-input
                  :disabled="true"
                  v-decorator="[
                    'codeTransfer',

                    {
                      initialValue: generateRandomNumberString(10),
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
                    'content',
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
            <a-col class="mb-5" :span="12"
              ><div class="title mb-4">Hình nền</div>
              <div class="list-item d-flex justify-content-evenly">
                <div class="item text-center">
                  <div class="img mb-2">
                    <img
                      style="max-width: 100px"
                      src="../../static/nen1.png"
                      alt=""
                    />
                  </div>
                  <a-checkbox>Hình nền 1</a-checkbox>
                </div>
                <div class="item text-center">
                  <div class="img mb-2">
                    <img
                      style="max-width: 100px"
                      src="../../static/nen2.png"
                      alt=""
                    />
                  </div>
                  <a-checkbox>Hình nền 2</a-checkbox>
                </div>
              </div>
            </a-col>
            <a-col class="mb-5" :span="12"
              ><div class="title mb-4">Giao diện</div>
              <div class="list-item d-flex justify-content-evenly">
                <div class="item text-center">
                  <div class="img mb-2">
                    <img
                      style="max-width: 100px"
                      src="../../static/giaodien1.png"
                      alt=""
                    />
                  </div>
                  <a-checkbox>Tối</a-checkbox>
                </div>
                <div class="item text-center">
                  <div class="img mb-2">
                    <img
                      style="max-width: 100px"
                      src="../../static/giaodien2.png"
                      alt=""
                    />
                  </div>
                  <a-checkbox>Sáng</a-checkbox>
                </div>
              </div>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col class="mb-5" :span="8">
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
                >
                  <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                  <div v-else>
                    <a-icon :type="loadingImg ? 'loadingImg' : 'plus'" />
                    <div class="ant-upload-text">Tải lên</div>
                  </div>
                </a-upload>
              </div>
            </a-col>
            <a-col class="mb-5" :span="8"
              ><div class="title mb-4">Chế độ nguồn điện thấp</div>
              <a-switch v-model="baterry"
            /></a-col>
            <a-col class="mb-5" :span="8"
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
                <div class="item text-center">
                  <div>
                    <a-checkbox v-model="internetWifi">Wifi</a-checkbox>
                    <a-input-number
                      id="inputNumber"
                      v-model="wifi"
                      :min="1"
                      :max="4"
                      @change="isNumber2"
                      @keydown="handleKeyDown"
                      :formatter="(percentBaterry) => `${percentBaterry}`"
                    />
                  </div>
                </div>
                <div class="item text-center">
                  <a-checkbox
                    style="line-height: 32px"
                    @click="internetWifi = false"
                    :checked="!internetWifi"
                    >4G</a-checkbox
                  >
                </div>
              </div></a-col
            >
            <a-col class="mb-5" :span="12"
              ><div class="title mb-4">Sim</div>
              <div class="list-item d-flex justify-content-evenly">
                <div class="item text-center">
                  <div>
                    <a-checkbox v-model="oneSim">Sim 1</a-checkbox>
                    <a-input-number
                      id="sim1"
                      v-model="sim1"
                      :min="1"
                      :max="4"
                      @change="isNumber3"
                      @keydown="handleKeyDown"
                      :formatter="(percentBaterry) => `${percentBaterry}`"
                    />
                  </div>
                </div>
                <div class="item text-center">
                  <a-checkbox
                    style="line-height: 32px"
                    @click="oneSim = false"
                    :checked="!oneSim"
                    >Sim 2</a-checkbox
                  >
                  <a-input-number
                    id="sim2"
                    v-model="sim2"
                    :min="1"
                    :max="4"
                    @change="isNumber4"
                    @keydown="handleKeyDown"
                    :formatter="(percentBaterry) => `${percentBaterry}`"
                  />
                </div>
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
      internetWifi: true,
      oneSim: true,
      sim1: 4,
      sim2: 4,
      url: null,
      dateNow: null,
      timeNow: null,
    }
  },
  created() {
    this.dateNow = moment(new Date()).format('YYYY/MM/DD')
    this.timeNow = moment(new Date()).format('HH:mm')
    console.log(this.timeNow)
  },
  computed: {
    dynamicImagePath() {
      return this.itemSelected.url_example
    },
  },
  methods: {
    disabledDate(current) {
      // Lấy ngày hiện tại
      const currentDate = moment()

      // Để vô hiệu hóa các ngày trong tương lai, ta so sánh ngày hiện tại với ngày được chọn
      return current && current > currentDate.endOf('day')
    },
    generateRandomNumberString(length) {
      let result = ''
      const characters = '0123456789'

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        result += characters.charAt(randomIndex)
      }

      return result
    },
    filterCurrency(currency, text = '') {
      if (currency) {
        console.log(currency)
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
      console.log(info)
      if (info.file.status === 'uploading') {
        this.loadingImg = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          console.log(this.imageUrl)
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
    handleSearch(e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        console.log('error', error)
        console.log('Received values of form: ', values)
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
