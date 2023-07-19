<template>
  <div>
    <ListItem :itemBanks="itemBanks" />
  </div>
</template>

<script>
import ListItem from '../../components/common/ListItem.vue'
import { LISTBANKS_BALANCE } from '../../constants/constants.js'
export default {
  components: {
    ListItem,
  },
  data() {
    return {
      itemBanks: LISTBANKS_BALANCE,
    }
  },
}
</script>

<style></style>
