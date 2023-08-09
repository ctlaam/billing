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
          <!-- part 1 -->
          <div class="row">
            <div class="col-xl-6" :style="{ display: true ? 'block' : 'none' }">
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
            </div>
            <div class="col-xl-6" :style="{ display: true ? 'block' : 'none' }">
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
            </div>
            <div
              class="col-8 col-xl-6"
              :style="{ display: true ? 'block' : 'none' }"
            >
              <a-form-item label="Số dư cuối kì">
                <a-input
                  @keydown="handleKeyDown"
                  @change="changeMoneySource"
                  v-decorator="[
                    'money_source',
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
            </div>
            <div
              class="col-3 col-xl-6"
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
                          message: 'Chọn giờ tạo biến động',
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
          </div>

          <div class="row">
            <!-- instruction -->
            <div class="col-12" id="instruction" style="font-size: 1.4rem">
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
            </div>
          </div>
          <!-- biến động số dư -->

          <div class="row">
            <div class="col-12" :style="{ display: true ? 'block' : 'none' }">
              <a-form-item
                v-for="(item, index) in numberVolatility"
                :key="index"
                label="Thể loại"
              >
                <a-row
                  :default-active-key="item.keyTab"
                  @change="changeTab($event, index)"
                >
                  <a-row class="mb-4">
                    <a-radio-group v-model="item.keyTab">
                      <a-radio :checked="item.keyTab == 0" :value="0">
                        Nhận tiền
                      </a-radio>
                      <a-radio :checked="item.keyTab == '1'" :value="1">
                        Trừ tiền
                      </a-radio>
                    </a-radio-group>
                  </a-row>
                  <div v-if="item.keyTab == 0">
                    <div class="row">
                      <div class="h3 col-md-8 col-7" @click="test">
                        Biến động {{ index + 1 }}
                      </div>
                      <div class="text-end col-4">
                        <button
                          v-if="index >= 1"
                          class="delete-item btn btn-outline-danger text-nowrap px-1 waves-effect"
                          data-repeater-delete=""
                          type="button"
                          style="font-size: 1.4rem"
                          @click="deleteVolatile(item.id)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-x me-25"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <span>Xoá biến động</span>
                        </button>
                      </div>
                      <div class="col-12 col-md-6">
                        <a-form-item label="Số tiền">
                          <a-input
                            @keydown="handleKeyDown"
                            @change="changeMoneyVolatility"
                            v-decorator="[
                              `money-volatility[${index}]`,
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
                      </div>
                      <div class="col-12 col-md-6">
                        <a-tooltip placement="topLeft">
                          <template slot="title">
                            <span v-if="index > 0"
                              >Số dư từ biến động 2 sẽ tự động tính toán</span
                            >
                          </template>
                          <a-form-item label="Số dư hiện tại">
                            <!-- :disabled="index > 0" -->
                            <a-input
                              :disabled="index > 0"
                              @keydown="handleKeyDown"
                              @change="changeMoneyVolatility"
                              v-decorator="[
                                `current-balance[${index}]`,
                                {
                                  initialValue:
                                    index == 0
                                      ? moneySource
                                      : caculateMoneySource[index] || 0,
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
                        </a-tooltip>
                      </div>
                      <div
                        class="col-xl-3 col-6"
                        :style="{ display: true ? 'block' : 'none' }"
                      >
                        <a-form-item label="Giờ">
                          <a-time-picker
                            v-decorator="[
                              `timer-volatility[${index}]`,
                              {
                                initialValue:
                                  index == 0 ? moment(timeNow, 'HH:mm') : null,
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
                      </div>
                      <div
                        class="col-xl-3 col-6"
                        :style="{ display: true ? 'block' : 'none' }"
                      >
                        <a-form-item label="Ngày">
                          <a-date-picker
                            :disabled-date="disabledDate"
                            v-decorator="[
                              `date-volatility[${index}]`,
                              {
                                initialValue:
                                  index == 0
                                    ? moment(dateNow, 'YYYY/MM/DD')
                                    : null,
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
                      </div>
                      <div
                        class="col-12 col-xl-6"
                        :style="{ display: true ? 'block' : 'none' }"
                      >
                        <a-form-item label="Nôi dung giao dịch">
                          <a-textarea
                            v-decorator="[
                              `text-volatility[${index}]`,
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
                    <div class="col-12"></div>
                  </div>
                  <div v-if="item.keyTab == 1">
                    <div class="row">
                      <div class="h3 col-md-8 col-7" @click="test">
                        Biến động {{ index + 1 }}
                      </div>
                      <div class="text-end col-4">
                        <button
                          v-if="index >= 1"
                          class="delete-item btn btn-outline-danger text-nowrap px-1 waves-effect"
                          data-repeater-delete=""
                          type="button"
                          style="font-size: 1.4rem"
                          @click="deleteVolatile(item.id)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-x me-25"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <span>Xoá biến động</span>
                        </button>
                      </div>
                      <div class="col-12">
                        <a-form-item label="Chọn bill đã tạo">
                          <a-select
                            @change="selectBill($event, index)"
                            :getPopupContainer="
                              (trigger) => trigger.parentElement
                            "
                            class="w-100"
                            style="width: 120px"
                            v-decorator="[
                              `bill-volatility[${index}]`,
                              {
                                placeholder: 'Chọn bill đã tạo !',
                                rules: [
                                  {
                                    message: 'Chọn bill đã tạo !',
                                  },
                                ],
                              },
                            ]"
                            placeholder="Chọn bill đã tạo"
                          >
                            <a-select-option
                              v-for="item in billInfo"
                              :key="item.id"
                              :value="item.id"
                              :disabled="
                                form
                                  .getFieldsValue()
                                  ['bill-volatility']?.includes(item.id)
                              "
                            >
                              {{
                                `${item.name} | ${item.bank_name} | ${item.value_money}`
                              }}
                            </a-select-option>
                          </a-select>
                        </a-form-item>
                      </div>
                      <div class="col-12 col-md-6">
                        <a-form-item label="Số tiền">
                          <a-input
                            @keydown="handleKeyDown"
                            @change="changeMoneyVolatility"
                            v-decorator="[
                              `money-volatility[${index}]`,
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
                      </div>
                      <div class="col-12 col-md-6">
                        <a-tooltip placement="topLeft">
                          <template slot="title">
                            <span v-if="index > 0"
                              >Số dư từ biến động 2 sẽ tự động tính toán</span
                            >
                          </template>
                          <a-form-item label="Số dư hiện tại">
                            <a-input
                              :disabled="index > 0"
                              @keydown="handleKeyDown"
                              @change="changeMoneyVolatility"
                              v-decorator="[
                                `current-balance[${index}]`,
                                {
                                  initialValue:
                                    index == 0
                                      ? moneySource
                                      : caculateMoneySource[index] || 0,
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
                        </a-tooltip>
                      </div>
                      <div
                        class="col-12 col-md-6"
                        :style="{ display: true ? 'block' : 'none' }"
                      >
                        <a-form-item label="Tên người nhận">
                          <a-input
                            v-decorator="[
                              `name-recived[${index}]`,
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
                      <div
                        class="col-12 col-md-6"
                        :style="{ display: true ? 'block' : 'none' }"
                      >
                        <a-form-item label="Số tài khoản người nhận">
                          <a-input
                            v-decorator="[
                              `number-recived[${index}]`,
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
                      <div
                        v-if="!['MSB'].includes(itemSelected.name)"
                        class="col-12 col-md-6"
                        :style="{ display: true ? 'block' : 'none' }"
                      >
                        <a-form-item label="Ngân hàng thụ hưởng">
                          <a-select
                            :getPopupContainer="
                              (trigger) => trigger.parentElement
                            "
                            v-decorator="[
                              `bank_name[${index}]`,

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
                        class="col-12 col-md-6"
                        :style="{ display: true ? 'block' : 'none' }"
                      >
                        <a-form-item
                          v-if="!['ACB', 'MSB'].includes(itemSelected.name)"
                          label="Mã giao dịch (mã được tạo tự động) "
                        >
                          <a-input
                            v-decorator="[
                              `transfer_code[${index}]`,

                              {
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
                      <div
                        class="col-6 col-xl-3"
                        :style="{ display: true ? 'block' : 'none' }"
                      >
                        <a-form-item label="Giờ">
                          <a-time-picker
                            v-decorator="[
                              `timer-volatility[${index}]`,
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
                      </div>
                      <div
                        class="col-6 col-xl-3"
                        :style="{ display: true ? 'block' : 'none' }"
                      >
                        <a-form-item label="Ngày">
                          <a-date-picker
                            :disabled-date="disabledDate"
                            v-decorator="[
                              `date-volatility[${index}]`,
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
                      </div>
                      <div
                        class="col-12 col-md-6"
                        :style="{ display: true ? 'block' : 'none' }"
                      >
                        <a-form-item label="Nôi dung giao dịch">
                          <a-textarea
                            v-decorator="[
                              `text-volatility[${index}]`,
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
                  </div>
                </a-row>
                <div class="row">
                  <div class="col-12">
                    <div class="col-12 mb-2">
                      <button
                        class="add-item btn btn-icon btn-success waves-effect waves-float waves-light"
                        type="button"
                        data-repeater-create=""
                        style="font-size: 1.4rem"
                        @click="addVolatile"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-plus me-25"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <span>Thêm biến động</span>
                      </button>
                    </div>
                  </div>
                </div>
              </a-form-item>
            </div>
          </div>
          <!-- hình nền -->
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
                <a-radio :checked="true">Iphone 14 pro max</a-radio>
              </div>
            </div>

            <div
              v-if="['Agribank'].includes(itemSelected.name)"
              class="mb-5 col-md-6 mb-5 col-12"
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
                <a-radio-group v-model="internetWifi">
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
          :src="require(`~/assets/volality/${dynamicImagePath}`)"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import * as volatilityApi from '../../api/volatility.js'
import _ from 'lodash'

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
      internetWifi: 'wifi',
      oneSim: true,
      sim1: 4,
      sim2: 4,
      url: null,
      timeNow: null,
      dateNow: null,
      keyTab: 1,
      numberVolatility: [{ id: 1, name: '1', keyTab: 0 }],
      background: 'hinhnen1',
      lightness: 'light',
      avatar: null,
      modeBaterry: false,
      modeSim: 'simone',
      modeOTT: false,
      billInfo: null,
      moneySource: null,
      listBanks: null,
      caculateMoneySource: [0, 0, 0, 0],
      billSelected: [],
    }
  },
  created() {
    this.getBillInfo()
    this.getBankChange()
    this.dateNow = moment(new Date()).format('YYYY/MM/DD')
    this.timeNow = moment(new Date()).format('HH:mm')
  },
  computed: {
    dynamicImagePath() {
      return this.itemSelected.url_example
    },
  },
  watch: {
    numberVolatility(newVal, oldVal) {},
  },
  methods: {
    test() {
      console.log(moment('2023-08-05T08:46:00.000Z').format('HH:mm:ss'))
      let object = {}
      object['timer-volatility'] = [moment('8:13:00', 'HH:mm:ss')]
      this.form.setFieldsValue(object)
    },
    async selectBill(item, index) {
      this.billSelected[index] = item
      const bill = this.billInfo.find((i) => i.id === item)
      let object = {
        'money-volatility': [...this.form.getFieldsValue()['money-volatility']],
        'name-recived': [...this.form.getFieldsValue()['name-recived']],
        'number-recived': [...this.form.getFieldsValue()['number-recived']],
        bank_name: [...this.form.getFieldsValue()['bank_name']],
        transfer_code: [...this.form.getFieldsValue()['transfer_code']],
        'text-volatility': [...this.form.getFieldsValue()['text-volatility']],
        'date-volatility': [...this.form.getFieldsValue()['date-volatility']],
        'timer-volatility': [...this.form.getFieldsValue()['timer-volatility']],
      }
      object['money-volatility'][index] = bill.value_money
      object['name-recived'][index] = bill.name
      object['number-recived'][index] = bill.bank_code
      object['bank_name'][index] = 'Mb Bank'
      object['transfer_code'][index] = bill.transfer_code
      object['text-volatility'][index] = bill.description
      object['date-volatility'][index] = moment(bill.date).format('YYYY/MM/DD')
      object['timer-volatility'][index] = moment(
        moment(bill.date).format('HH:mm:ss'),
        'HH:mm:ss'
      )
      await this.form.setFieldsValue(object)
      await this.caculatedValue()
    },
    changeMoneyVolatility: _.debounce(function () {
      console.log(123123)
      this.caculatedValue()
    }, 500),
    caculatedValue() {
      let money = this.form.getFieldsValue()['money-volatility']
      this.caculateMoneySource = this.form.getFieldsValue()['current-balance']
      for (let i = 0; i < this.numberVolatility.length; i++) {
        const element = this.numberVolatility[i]
        if (element.keyTab == 1) {
          this.caculateMoneySource[i + 1] =
            parseInt(this.caculateMoneySource[i]) + parseInt(money[i]) || 0
        } else if (element.keyTab == 0) {
          this.caculateMoneySource[i + 1] =
            parseInt(this.caculateMoneySource[i]) - parseInt(money[i]) || 0
        }
      }
      this.form.setFieldsValue({
        'current-balance': [...this.caculateMoneySource].slice(
          0,
          this.numberVolatility.length
        ),
      })
    },
    changeMoneySource(event) {
      this.moneySource = event.target.value
    },
    async getBankChange() {
      await volatilityApi
        .listBankChange(this.itemSelected.name_api)
        .then((res) => {
          this.listBanks = res.list_bank
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    async getBillInfo() {
      await volatilityApi
        .getBillInfo(this.itemSelected.name_api)
        .then((res) => {
          this.billInfo = res.bill_info
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    async deleteVolatile(id) {
      // this.numberVolatility = this.numberVolatility.filter(
      //   (item) => item.id !== id
      // )
      const index = this.numberVolatility.findIndex((item) => item.id === id)
      this.numberVolatility.splice(index, 1)
      console.log(this.numberVolatility)
      let dataObject = await this.form.getFieldsValue()
      const arrayKeysObject = {}
      for (const key in dataObject) {
        if (dataObject.hasOwnProperty(key) && Array.isArray(dataObject[key])) {
          dataObject[key].splice(index, 1)
          arrayKeysObject[key] = dataObject[key]
        }
      }
      await this.form.setFieldsValue(arrayKeysObject)
      await this.caculatedValue()
    },
    async addVolatile() {
      this.form.validateFields(async (valid) => {
        if (valid) {
          this.$message.warning({
            content:
              'Vui lòng nhập đầy đủ thông tin trước khi thêm biến động mới',
            key: 'warning',
          })
        } else {
          await this.caculatedValue()
          this.numberVolatility.push({
            id: this.numberVolatility.length + 1,
            name: this.numberVolatility.length + 1,
            keyTab: 0,
          })
        }
      })
    },
    changeTab(key, index) {
      this.numberVolatility[index].keyTab = key
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
    handleSearch(e) {
      e.preventDefault()
      this.form.validateFields(async (error, values) => {
        const arrayVolatility = []
        for (let i = 0; i < this.numberVolatility.length; i++) {
          const item = this.numberVolatility[i]
          const dateMoment = moment(values[`date-volatility`][i]).format(
            'YYYY-MM-DD'
          )
          const timeMoment = moment(values[`timer-volatility`][i]).format(
            'HH:mm:ss'
          )
          const combinedISODate = dateMoment + 'T' + timeMoment + '.000Z'
          if (item.keyTab == 1) {
            const volatility = {
              type: '1',
              value_money: values[`money-volatility`][i],
              balance: values[`current-balance`][i],
              name: values[`name-recived`][i],
              bank_cod: values[`number-recived`][i],
              bank_name: values[`bank_name`][i],
              transfer_code: values[`transfer_code`][i],
              date_time: combinedISODate,
              content: values[`text-volatility`][i],
            }
            arrayVolatility.push(volatility)
          } else {
            const volatility = {
              type: '0',
              value_money: values[`money-volatility`][i],
              balance: values[`current-balance`][i],
              date_time: combinedISODate,
              content: values[`text-volatility`][i],
            }
            arrayVolatility.push(volatility)
          }
        }
        const dateMoment = moment().format('YYYY-MM-DD')
        const timeMoment = moment(values.timer).format('HH:mm:ss')
        const combinedISODate = dateMoment + 'T' + timeMoment + '.000Z'
        let formData = {
          type_pin: this.modeBaterry ? 'is_charging' : 'is_normal',
          pin_code: Math.floor(this.percentBaterry / 10.01) ?? 0,
          sms: this.sim1 ?? 1,
          wifi: this.internetWifi == 'wifi' ? this.wifi.toString() : 'LTE',
          date: combinedISODate,
          name_source: values.nameAccount,
          bank_code_source: values.accountNumber,
          money_source: values.money_source,
          data: arrayVolatility,
        }
        console.log(formData, 'formData')
        this.$store.dispatch('loading/setModalLoading', true)
        await volatilityApi
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
  .ant-form-item label {
    color: #aaadb4;
  }
  .h3.col-md-8.col-7 {
    color: #d0d2d6;
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
      width: 100%;
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
