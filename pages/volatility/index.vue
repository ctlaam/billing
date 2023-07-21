<template>
  <div>
    <ListItem
      v-if="!showForm"
      :itemBanks="itemBanks"
      @selectItem="selectItem"
      title="Bill biến động"
      subtitle="Danh sách ngân hàng bill biến động"
    />
    <FormVolatility v-else :itemSelected="itemSelected" />
  </div>
</template>

<script>
import ListItem from '../../components/common/ListItem.vue'
import { LISTBANKS_VOLATILITY } from '../../constants/constants.js'
import FormVolatility from '../../components/volatility/index.vue'
export default {
  components: {
    ListItem,
    FormVolatility,
  },
  data() {
    return {
      itemBanks: LISTBANKS_VOLATILITY,
      showForm:false,
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
