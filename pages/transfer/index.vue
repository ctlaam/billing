<template>
  <div>
    <ListItem
      v-if="!showForm"
      :itemBanks="itemBanks"
      @selectItem="selectItem"
      title="Bill chuyển khoản"
      subtitle="Danh sách ngân hàng bill chuyển khoản"
    />
    <FormTransfer @showOrHideForm="showOrHideForm" v-else :itemSelected="itemSelected" />
  </div>
</template>

<script>
import ListItem from '../../components/common/ListItem.vue'
import FormTransfer from '../../components/transfer/index.vue'
import { LISTBANKS_TRANFER } from '../../constants/constants.js'
export default {
  components: {
    ListItem,
    FormTransfer,
  },
  data() {
    return {
      itemBanks: LISTBANKS_TRANFER,
      showForm: false,
      itemSelected: null,
    }
  },
  methods: {
    selectItem(item) {
      this.showForm = true
      this.itemSelected = item
    },
    showOrHideForm(bool) {
      this.showForm = bool
    },
  },
}
</script>

<style></style>
