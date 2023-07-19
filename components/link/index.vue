<template>
  <div id="link">
    <div class="title d-flex align-items-center">
      <div class="h1">Liên kết giới thiệu</div>
      <div class="h3">Home > <span style="color: #5650b4">Ref</span></div>
    </div>
    <div class="row" style="margin: 0">
      <div class="col-12">
        <div class="card p-2">
          <div class="card-body">
            <div class="row">
              <div class="col-xl-3 col-md-4 col-sm-6 col-12 pe-sm-0">
                <div class="mb-1">
                  <input
                    type="text"
                    class="form-control"
                    id="ref-link"
                    v-model="refLink"
                    readonly=""
                  />
                </div>
              </div>
              <div class="col-sm-2 col-12">
                <button @click="copy" class="btn btn-success waves-effect">Sao chép</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      refLink: 'https://autobill.shop/ref/maivantien',
    }
  },
  methods: {
    copy: _.debounce(function () {
      const textToCopy = this.refLink
      const input = document.createElement('input')
      input.value = textToCopy
      document.body.appendChild(input)

      // Chọn toàn bộ nội dung trong thẻ input
      input.select()

      // Thực hiện lệnh sao chép
      document.execCommand('copy')

      // Xóa thẻ input
      document.body.removeChild(input)
      this.$message.success('Sao chép thành công !')
    }, 200),
  },
}
</script>

<style lang="scss">
#link {
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
  .card {
    background-color: #283046;
    box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.24);
  }
}
</style>
