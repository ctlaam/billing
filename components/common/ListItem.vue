<template>
  <div id="list-item">
    <div class="title d-flex align-items-center mb-5">
      <div class="h2">{{ title }}</div>
      <div class="h4">
        <nuxt-link to="/" exact active-class="active" style="color: #5650b4"
          >Home</nuxt-link
        >
        > <span style="color: #a3a7ae">{{ subtitle }}</span>
      </div>
    </div>
    <div class="list-banks">
      <div class="row" style="margin: 0">
        <div
          @click="selectItem(item)"
          v-for="item in itemBanks"
          class="col-md-6 col-xl-3 col-12 mb-4 bank"
          :class="{ update: item.update }"
        >
          <div class="card text-center">
            <div class="card-body">
              <div class="p-50 mb-1">
                <img
                  class="rounded-circle"
                  :src="require(`@/assets/logoBank/${item.img}`)"
                  alt=""
                  height="50"
                />
              </div>
              <h3 class="fw-bolder">{{ item.name }}</h3>
              <h4 class="card-text">Đã tạo: ___ bill</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title', 'subtitle', 'itemBanks'],
  methods: {
    selectItem(item) {
      if (item.update) {
        this.$message.warning({
          content: 'Chức năng đang được phát triển',
          key: 'update',
          duration: 200,
        })
        return
      }
      this.$emit('selectItem', item)
    },
  },
}
</script>

<style lang="scss">
#list-item {
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
  color: #d0d2d6;
  .list-banks {
    .bank {
      cursor: pointer;
    }
    .bank.update .card {
      position: relative;
      &::after {
        content: 'Comming soon';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #2c2626a6;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #fff;
        font-weight: 600;
      }
    }
    .card {
      font-size: 20px;
      color: #d0d2d6;
      background-color: #283046;
      box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.24);
    }
  }
}
@media only screen and (max-width: 575px) {
  #list-item .title .h2 {
    display: none;
  }
}
</style>
