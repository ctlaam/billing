<template>
  <div id="dashboard">
    <div class="title d-flex align-items-center">
      <div class="h1">Dashboard</div>
      <div class="h3">Home > <span style="color: #5650b4">Dashboard</span></div>
    </div>
    <div class="notify">
      <div class="row" style="margin: 0">
        <div class="col-12">
          <div
            class="card bg-success text-white mb-4 rounded item-notify card-custom"
          >
            <div class="card-body">
              <h2 class="p-2">
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
                Nhằm phục vụ cho anh em chơi tết, troll người thân, gửi đến nhau
                những lời chúc năm mới, sống ảo... Chỉ với 200k anh em đã có thể
                thỏa thích tạo bill không giới hạn. Để được kích hoạt gói tài
                khoản VIP không giới hạn lượt tạo bill, anh em liên hệ với
                <span class="p-2 text-justify">
                  <a
                    style="color: #fff"
                    class="badge rounded-pill bg-warning draggable"
                    href="https://t.me/funnybillproAdministrator"
                    target="_blank"
                    >ADMIN</a
                  >
                </span>
                để được hỗ trợ trực tiếp. Chúc anh em chơi tết vui vẻ !!
              </h3>
              <h4 class="p-2 text-justify">
                LƯU Ý BÊN MÌNH CHỈ GIAO DỊCH DUY NHẤT QUA ĐƯỜNG LINK TELEGRAM Ở
                TRÊN
              </h4>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="card bg-info text-white mb-4 rounded">
            <div class="card-body rounded item-notify">
              <p class="card-text h4">
                Mỗi tài khoản chỉ đăng nhập được cùng lúc 2 thiết bị, thiết bị
                thứ 3 đăng nhập sẽ đăng xuất 2 thiết bị trước đó.
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12 mb-4">
          <div class="card p-2">
            <div
              class="card-header h-100 d-flex align-items-center justify-content-between"
            >
              <div>
                <h2 class="fw-bolder mb-75">{{ createBill.create_bill }}</h2>
                <p class="card-text h4">Lượt tạo hoá đơn chuyển khoản</p>
              </div>
              <div class="avatar bg-light-primary p-50 m-0 h1">
                <a-icon type="transaction" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12 mb-4">
          <div class="card p-2">
            <div
              class="card-header h-100 d-flex align-items-center justify-content-between"
            >
              <div>
                <h2 class="fw-bolder mb-75">{{ createBill.create_change }}</h2>
                <p class="card-text h4">Lượt tạo hoá đơn biến động</p>
              </div>
              <div class="avatar bg-light-success p-50 m-0 h1">
                <a-icon type="bank" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12 mb-4">
          <div class="card p-2">
            <div
              class="card-header h-100 d-flex align-items-center justify-content-between"
            >
              <div>
                <h2 class="fw-bolder mb-75">{{ createBill.create_balance }}</h2>
                <p class="card-text h4">Lượt tạo hoá đơn số dư</p>
              </div>
              <div class="avatar bg-light-danger p-50 m-0 h1">
                <a-icon type="credit-card" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12 mb-4">
          <div class="card p-2">
            <div
              class="card-header h-100 d-flex align-items-center justify-content-between"
            >
              <div>
                <h2 class="fw-bolder mb-75">0đ</h2>
                <p class="card-text h4">Tiền còn lại</p>
              </div>
              <div class="avatar bg-light-warning p-50 m-0 h1">
                <a-icon type="dollar" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as authApi from '../../api/auth.js'
export default {
  data() {
    return {
      createBill: {},
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const res = await authApi.getUserInfo()
      this.createBill = res
    },
  },
}
</script>

<style lang="scss">
#dashboard {
  .card-custom {
    height: 22rem !important;
  }
  .title {
    margin-bottom: 2em;
    .h1 {
      border-right: 1px solid #ccc;
      padding: 0 1rem;
      color: #aaadb4;
    }
    .h3 {
      margin-left: 1rem;
    }
  }
  .notify {
    .item-notify {
      height: 6rem;
      .card-text {
        line-height: 4rem;
      }
    }
    .card {
      background-color: #283046;
      box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.24);
      color: #d0d2d6;
      height: 8rem;
      .card-header {
        border: none;
        .avatar {
          color: #7367f0 !important;
          white-space: nowrap;
          background-color: #c3c3c3;
          border-radius: 50%;
          position: relative;
          cursor: pointer;
          color: #fff;
          display: inline-flex;
          padding: 14px;
          text-align: center;
          vertical-align: middle;
          font-weight: 600;
          background: rgba(115, 103, 240, 0.12) !important;
        }
        .bg-light-warning {
          background: rgba(255, 159, 67, 0.12) !important;
          color: #ff9f43 !important;
        }
        .bg-light-danger {
          background: rgba(234, 84, 85, 0.12) !important;
          color: #ea5455 !important;
        }
        .bg-light-success {
          background: rgba(40, 199, 111, 0.12) !important;
          color: #28c76f !important;
        }
      }
    }
  }
}
@media only screen and (max-width: 900px) {
  #dashboard .notify .card {
    height: 10rem;
    font-size: 16px;
  }
  #dashboard .notify .item-notify .card-text {
    line-height: 3rem;
  }
  #dashboard .card-custom {
    height: 28rem !important;
  }
}
@media only screen and (max-width: 450px) {
  #dashboard .card-custom {
    height: 30rem !important;
  }
}
</style>
