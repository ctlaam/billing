<template>
  <div
    id="header"
    class="d-flex align-items-center justify-content-between mb-4"
  >
    <div class="left d-flex">
      <div @click="showNavbar" class="item mobile h3">
        <a-icon type="menu" />
      </div>
      <div class="item h3">
        <a-icon type="user" />
      </div>
      <div class="item h3">
        <a-icon type="credit-card" />
      </div>
    </div>
    <div class="right d-flex align-items-center justify-content-right">
      <div class="money text-center">
        <h3 class="number">0đ</h3>
        <p class="h5">Số dư ví</p>
      </div>
      <div class="avatar">
        <a-dropdown>
          <a-menu slot="overlay" class="header-dropdown">
            <a-menu-item> <a-icon type="user" />Thông tin cá nhân </a-menu-item>
            <a-menu-item> <a-icon type="history" />Lịch sử </a-menu-item>
            <a-menu-item> <a-icon type="credit-card" />Nạp tiền </a-menu-item>
            <a-menu-item @click="logOut">
              <a-icon type="poweroff" />Đăng xuất
            </a-menu-item>
          </a-menu>
          <a-avatar
            class="mb-2"
            size="large"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  methods: {
    logOut() {
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
      Cookies.remove('user_id')
      Cookies.remove('time_valid')
      this.$store.dispatch('auth/logout')
      this.$router.push('/auth')
    },
    showNavbar(){
      const nav = document.getElementById('navbar')
      nav.classList.toggle('navbar-mobile')
      const modal = document.querySelector('.modal')
      modal.classList.add('show')
    }
  },
}
</script>

<style lang="scss">
#header {
  width: 100%;
  height: 6.5em;
  color: #b4b7bd;
  background-color: #283046;
  transition: 300ms ease all;
  border-radius: 5px;
  .left {
    padding: 0 1rem;
    .item {
      margin-right: 1em;
      &:hover {
        color: #fff;
        cursor: pointer;
      }
    }
    .mobile {
      display: none;
    }
  }
  .right {
    padding: 0 1rem;
    .avatar {
      margin-left: 2em;
    }
  }
}
.header-dropdown.ant-dropdown-menu {
  background-color: #283046;
  .ant-dropdown-menu-item {
    color: #b4b7bd;
    height: 3.6rem;
    &:hover {
      background: rgba(115, 103, 240, 0.12);
      color: #7367f0;
    }
    .anticon {
      position: relative;
      top: -3px;
    }
  }
}
@media only screen and (max-width: 1024px) {
  #header {
    .left {
      .mobile {
        display: block;
      }
    }
  }
}

</style>
