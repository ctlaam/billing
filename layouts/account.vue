<template>
  <div class="account-content">
    <Nuxt />
    <fullscreen-modal> </fullscreen-modal>
  </div>
</template>
<script>
import FullscreenModal from '../components/apps/FullscreenModal.vue'
export default {
  components: {
    FullscreenModal,
  },
}
</script>

<style scoped>
.account-content {
  width: 100vw;
  height: 100vh;
  background-color: #283046;
  cursor: pointer;
  transition: all 0.7s, z-index 0s;
  overflow-x: auto;
  overflow-y: hidden;
}
@media only screen and (max-width: 1024px) {
  .account-content {
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
