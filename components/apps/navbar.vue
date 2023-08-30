<template>
  <div v-click-outside="hide" id="navbar" class="navbar-mobile">
    <nuxt-link to="/" exact active-class="active">
      <div class="image mb-4">
        <img src="../../static/ICON.png" width="50" alt="" />
      </div>
    </nuxt-link>
    <div class="walet mb-5">
      <p class="h3">Số dư ví: 0đ</p>
    </div>
    <div class="menu">
      <div class="item-menu mb-5">
        <div class="title-item h4 mb-4">Menu chức năng</div>
        <div class="list-items">
          <nuxt-link to="/" exact active-class="active">
            <div class="item mb-3">
              <div class="d-flex align-items-center justify-content-left">
                <a-icon type="home" />
                <span class="name-item">Dashboard</span>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div class="item-menu mb-5">
        <div class="title-item h4 mb-4">Menu tạo bill</div>
        <div class="list-items">
          <nuxt-link to="/transfer" exact active-class="active">
            <div class="item mb-3">
              <div class="d-flex align-items-center justify-content-left">
                <a-icon type="bank" />
                <span class="name-item">Hoá đơn chuyển khoản</span>
              </div>
            </div>
          </nuxt-link>
          <nuxt-link
            to="/volatility"
            exact
            active-class="active"
          >
            <div class="item mb-3">
              <div class="d-flex align-items-center justify-content-left">
                <a-icon type="bank" />
                <span class="name-item">Hoá đơn biến động</span>
              </div>
            </div>
          </nuxt-link>
          <nuxt-link class="" to="/balance" exact active-class="active">
            <div class="item mb-3">
              <div class="d-flex align-items-center justify-content-left">
                <a-icon type="bank" />
                <span class="name-item">Hoá đơn số dư</span>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div class="item-menu mb-5">
        <div class="title-item h4 mb-4">Menu khác</div>
        <div class="list-items">
          <div class="update" to="/link" exact active-class="active">
            <div class="item mb-3">
              <div class="d-flex align-items-center justify-content-left">
                <a-icon type="link" />
                <span class="name-item">Liên kết giới thiệu</span>
              </div>
            </div>
          </div>
          <div class="update" to="/question" exact active-class="active">
            <div class="item mb-3">
              <div class="d-flex align-items-center justify-content-left">
                <a-icon type="info-circle" />
                <span class="name-item">Câu hỏi thường gặp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vClickOutside from 'v-click-outside'
export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    hide() {
      const nav = document.getElementById('navbar')
      nav.classList.add('navbar-mobile')
      const modal = document.querySelector('.modal')
      modal.classList.remove('show')
    },
  },
}
</script>

<style lang="scss">
#navbar {
  color: #d0d2d6;
  width: 30em;
  height: 100vh;
  background-color: #283046;
  padding: 2em;
  .menu {
    .item-menu {
      .title-item {
        color: #676d7d;
        text-transform: uppercase;
      }
      .list-items {
        a {
          color: #d0d2d6;
        }
        .update {
          position: relative;
          cursor: pointer;
          &::after {
            content: 'Coming soon';
            position: absolute;
            top: 0;
            right: 0;
            background: #ff4d4f;
            color: #fff;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: 400;
            transform: translate(50%, -50%);
            transition: all 0.3s ease;
            z-index: 999;
          }
        }

        .item {
          height: 3em;
          font-size: 1.6em;
          padding: 0.5rem 0 0.5rem 0.5rem;
          display: flex;
          align-items: center;
          .name-item {
            margin-left: 1rem;
            position: relative;
            top: 1px;
          }
        }
        a.nuxt-link-exact-active.active {
          .item {
            background: linear-gradient(
              118deg,
              #7367f0,
              rgba(115, 103, 240, 0.7)
            );
            box-shadow: 0 0 10px 1px rgba(115, 103, 240, 0.7);
            color: #fff;
            font-weight: 400;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
.modal {
  display: none;
}
@media only screen and (max-width: 1024px) {
  #navbar.navbar-mobile {
    display: none;
  }
  #navbar {
    position: absolute;
    z-index: 99999;
    // font-size: 9px !important;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }
  .modal.show {
    position: fixed;
    right: 0;
    display: block;
    z-index: 99998;
    width: 100;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
