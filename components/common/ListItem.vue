<template>
  <div id="list-item">
    <div class="title d-flex align-items-center mb-5">
      <div class="h1">{{ title }}</div>
      <div class="h3">Home > <span style="color: #5650b4">Balance</span></div>
    </div>
    <div class="list-banks">
      <div class="row" style="margin: 0">
        <div
          @click="selectItem(item)"
          v-for="item in itemBanks"
          class="col-md-6 col-xl-3 col-12 mb-4 bank"
        >
          <div class="card text-center">
            <div class="card-body">
              <div class="p-50 mb-1">
                <img
                  class="rounded-circle"
                  :src="item.img"
                  alt=""
                  height="50"
                />
              </div>
              <h3 class="fw-bolder">{{ item.name }}</h3>
              <h4 class="card-text">Đã tạo: 3 bill</h4>
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
      this.$emit('selectItem', item)
    },
  },
}
</script>

<style lang="scss">
#list-item {
  color: #d0d2d6;
  .list-banks {
    .bank {
      cursor: pointer;
    }
    .card {
      font-size: 20px;
      color: #d0d2d6;
      background-color: #283046;
      box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.24);
    }
  }
}
</style>
