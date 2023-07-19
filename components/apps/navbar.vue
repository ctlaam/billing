<template>
  <div id="navbar">
    <div class="image">
      <img src="../../static/logo.png" width="100" alt="" />
    </div>
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
                <a-icon type="bank" />
                <span class="name-item">Bill chuyển khoản</span>
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
                <span class="name-item">Bill chuyển khoản</span>
              </div>
            </div>
          </nuxt-link>
          <nuxt-link to="/volatility" exact active-class="active">
            <div class="item mb-3">
              <div class="d-flex align-items-center justify-content-left">
                <a-icon type="bank" />
                <span class="name-item">Bill biến động</span>
              </div>
            </div>
          </nuxt-link>
          <nuxt-link to="/balance" exact active-class="active">
            <div class="item mb-3">
              <div class="d-flex align-items-center justify-content-left">
                <a-icon type="bank" /> <span class="name-item">Bill số dư</span>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div class="item-menu mb-5">
        <div class="title-item h4 mb-4">Menu khác</div>
        <div class="list-items">
          <nuxt-link to="/link" exact active-class="active">
            <div class="item mb-3">
              <div class="d-flex align-items-center justify-content-left">
                <a-icon type="link" />
                <span class="name-item">Liên kết giới thiệu</span>
              </div>
            </div>
          </nuxt-link>
          <nuxt-link to="/question" exact active-class="active">
            <div class="item mb-3">
              <div class="d-flex align-items-center justify-content-left">
                <a-icon type="info-circle" />
                <span class="name-item">Câu hỏi thường gặp</span>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
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
        a{
          color: #d0d2d6;
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
</style>
