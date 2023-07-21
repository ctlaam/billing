<template>
  <div>
    <ListItem
      v-if="!showForm"
      :itemBanks="itemBanks"
      @selectItem="selectItem"
      title="Bill số dư"
      subtitle="Danh sách ngân hàng bill số dư"

    />
    <FormBalance :itemSelected="itemSelected" v-else />
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
    selectItem(item) {
      this.showForm = true
      this.itemSelected = item
      console.log(item)
    },
  },
}
</script>

<style></style>
