<template>
  <div>
    <ListItem
      v-if="!showForm"
      :itemBanks="itemBanks"
      @selectItem="selectItem"
      title="Bill số dư"
      subtitle="Danh sách ngân hàng bill số dư"
    />
    <FormBalance
      @showOrHideForm="showOrHideForm"
      :itemSelected="itemSelected"
      v-else
    />
  </div>
</template>

<script>
import ListItem from '../../components/common/ListItem.vue'
import FormBalance from '../../components/balance/index.vue'
import { LISTBANKS_BALANCE } from '../../constants/constants.js'
export default {
  components: {
    ListItem,
    FormBalance,
  },
  data() {
    return {
      itemBanks: LISTBANKS_BALANCE,
      itemSelected: null,
      showForm: false,
    }
  },
  methods: {
    showOrHideForm(bool) {
      this.showForm = bool
    },
    selectItem(item) {
      this.showForm = true
      this.itemSelected = item
    },
  },
}
</script>

<style></style>
