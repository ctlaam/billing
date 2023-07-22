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
    <div class="d-flex">
      <div class="content-form">
        <a-form
          class="ant-advanced-search-form"
          :form="form"
          @submit="handleSearch"
        >
          <!-- part 1 -->
          <a-row :gutter="12">
            <a-col :span="12" :style="{ display: true ? 'block' : 'none' }">
              <a-form-item label="Tên tài khoản nguồn">
                <a-input
                  v-decorator="[
                    'nameAccount',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Nhập tên nguồn tài khoản !',
                        },
                      ],
                    },
                  ]"
                  placeholder="Nhập tên nguồn tài khoản"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12" :style="{ display: true ? 'block' : 'none' }">
              <a-form-item label="Số tài khoản nguồn">
                <a-input
                  @keydown="handleKeyDown"
                  v-decorator="[
                    'accountNumber',

                    {
                      rules: [
                        {
                          required: true,
                          message: 'Nhập số tài khoản !',
                        },
                      ],
                    },
                  ]"
                  placeholder="Nhập số nguồn tài khoản"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12" :style="{ display: true ? 'block' : 'none' }">
              <a-form-item label="Số dư cuối kì">
                <a-input
                  @keydown="handleKeyDown"
                  v-decorator="[
                    'money',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Nhập số dư cuối kì !',
                        },
                      ],
                    },
                  ]"
                  placeholder="Nhập số dư cuối kì"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12" :style="{ display: true ? 'block' : 'none' }">
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
          </a-row>

          <a-row :gutter="12">
            <!-- instruction -->
            <a-col :span="24" id="instruction" style="font-size: 1.4rem">
              <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading p-2 mb-4">
                  Hướng dẫn cho phần nhập biến động:
                </h4>
                <div class="alert-body">
                  <ul>
                    <li class="mb-25">
                      Vui lòng nhập số tiền để số dư không bị âm (Nếu là nhận
                      tiền thì số tiền không được lớn hơn hoặc bằng số dư hiện
                      tại)
                    </li>
                    <li class="mb-25">
                      Vui lòng chọn thời gian giảm dần (giao dịch mới nhất sẽ
                      nằm trên cùng)
                    </li>
                    <li class="mb-25">
                      Phần nội dung bạn chỉ cần điền mỗi nội dung chuyển tiền
                      thôi, phần râu ria còn lại hệ thống sẽ tự xử lý
                    </li>
                    <li>
                      Nếu muốn hiển thị biến động đầy đủ thì nên thêm 4 biến
                      động (như demo)
                    </li>
                  </ul>
                </div>
              </div>
            </a-col>
          </a-row>
          <!-- biến động số dư -->

          <a-row :gutter="12">
            <a-col :span="24" :style="{ display: true ? 'block' : 'none' }">
              <a-form-item label="Thể loại">
                <a-tabs default-active-key="1" @change="changeTab">
                  <a-tab-pane key="1" tab="Nhận tiền">
                    <div v-if="keyTab == 1">
                      <a-row
                        v-for="(i, index) in numberTest"
                        :key="index"
                        :gutter="12"
                      >
                        <a-col :span="12">
                          <a-form-item label="Số tiền">
                            <a-input
                              @keydown="handleKeyDown"
                              v-decorator="[
                                'money-volatility',
                                {
                                  rules: [
                                    {
                                      required: true,
                                      message: 'Nhập số tiền !',
                                    },
                                  ],
                                },
                              ]"
                              placeholder="Nhập số tiền"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-item label="Số dư hiện tại">
                            <a-input
                              @keydown="handleKeyDown"
                              v-decorator="[
                                'current-balance',
                                {
                                  rules: [
                                    {
                                      required: true,
                                      message: 'Nhập số dư hiện tại !',
                                    },
                                  ],
                                },
                              ]"
                              placeholder="Nhập số dư hiện tại"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col
                          :span="6"
                          :style="{ display: true ? 'block' : 'none' }"
                        >
                          <a-form-item label="Giờ">
                            <a-time-picker
                              v-decorator="[
                                'timer-volatility',
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
                          </a-form-item>
                        </a-col>
                        <a-col
                          :span="6"
                          :style="{ display: true ? 'block' : 'none' }"
                        >
                          <a-form-item label="Ngày">
                            <a-date-picker
                              :disabled-date="disabledDate"
                              v-decorator="[
                                'date-volatility',
                                {
                                  initialValue: moment(dateNow, 'YYYY/MM/DD'),
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
                          </a-form-item>
                        </a-col>
                      </a-row>
                    </div>
                  </a-tab-pane>
                  <a-tab-pane key="2" tab="Trừ tiền" force-render>
                    <div v-if="keyTab == 2">
                      <a-row :gutter="12">
                        <a-col
                          :span="12"
                          :style="{ display: true ? 'block' : 'none' }"
                        >
                          <a-form-item label="Tên tài khoản nguồn">
                            <a-input
                              v-decorator="[
                                'nameAccount-2',
                                {
                                  rules: [
                                    {
                                      required: true,
                                      message: 'Nhập tên nguồn tài khoản !',
                                    },
                                  ],
                                },
                              ]"
                              placeholder="Nhập tên nguồn tài khoản"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col
                          :span="12"
                          :style="{ display: true ? 'block' : 'none' }"
                        >
                          <a-form-item label="Số tài khoản nguồn">
                            <a-input
                              @keydown="handleKeyDown"
                              v-decorator="[
                                'accountNumber-2',

                                {
                                  rules: [
                                    {
                                      required: true,
                                      message: 'Nhập số tài khoản !',
                                    },
                                  ],
                                },
                              ]"
                              placeholder="Nhập số nguồn tài khoản"
                            />
                          </a-form-item>
                        </a-col>
                      </a-row>
                    </div>
                  </a-tab-pane>
                </a-tabs>
              </a-form-item>
            </a-col>
          </a-row>
          <!-- hình nền -->
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
          :src="require(`~/assets/balance/${dynamicImagePath}`)"
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
      this.$router.push('/volatility')
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
      timeNow: null,
      dateNow: null,
      keyTab: 1,
      numberTest:4,
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
  },
  test(){

  },
  methods: {
    changeTab(key) {
      this.keyTab = key
    },
    disabledDate(current) {
      // Lấy ngày hiện tại
      const currentDate = moment()

      // Để vô hiệu hóa các ngày trong tương lai, ta so sánh ngày hiện tại với ngày được chọn
      return current && current > currentDate.endOf('day')
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
  .ant-form-item label {
    color: #aaadb4;
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
  .ant-tabs-nav .ant-tabs-tab {
    color: #aaadb4;
  }
  #instruction {
    .alert.alert-danger {
      border: none;
      color: #ea5455 !important;
      background: rgba(234, 84, 85, 0.12) !important;
      border-color: 1px solid #f9cccc;
      border-radius: 0.358rem;
    }
    .alert-danger .alert-heading {
      box-shadow: rgba(234, 84, 85, 0.4) 0px 6px 15px -7px;
    }
    .alert-danger {
      background: rgba(234, 84, 85, 0.12) !important;
      color: #ea5455 !important;
    }
  }
}
</style>
