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
          <div class="item mb-3">
            <div class="d-flex align-items-center justify-content-left ">
              <a-icon type="home" /> <span class="name-item">Dasboard</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item-menu mb-5">
        <div class="title-item h4 mb-4">Menu tạo bill</div>
        <div class="list-items">
          <div class="item mb-3">
            <div class="d-flex align-items-center justify-content-left">
              <a-icon type="bank" /> <span class="name-item">Dasboard</span>
            </div>
          </div>
          <div class="item mb-3">
            <div class="d-flex align-items-center justify-content-left">
              <a-icon type="bank" /> <span class="name-item">Dasboard</span>
            </div>
          </div>
          <div class="item active mb-3">
            <div class="d-flex align-items-center justify-content-left">
              <a-icon type="bank" /> <span class="name-item">Dasboard</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item-menu mb-5">
        <div class="title-item h4 mb-4">Menu khác</div>
        <div class="list-items">
          <div class="item mb-3">
            <div class="d-flex align-items-center justify-content-left">
              <a-icon type="link" />
              <span class="name-item">Liên kết khác</span>
            </div>
          </div>
          <div class="item active mb-3">
            <div class="d-flex align-items-center justify-content-left">
              <a-icon type="info-circle" />
              <span class="name-item">Các câu hỏi thường gặp</span>
            </div>
          </div>
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
  width: 26em;
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
        .item {
          height: 3em;
          font-size: 1.3em;
          padding: 0.5rem 0 0.5rem 0.5rem;
          display: flex;
          align-items: center;
          .name-item {
            margin-left: 1rem;
            position: relative;
            top: 1px;
          }
        }
        .item.active {
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
</style>
