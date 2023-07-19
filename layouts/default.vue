<template>
  <div class="d-flex app">
    <Navbar />
    <div class="main-content">
      <Header />
      <div id="content" class="mb-5">
        <Nuxt />
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from '../components/apps/header.vue'
import Navbar from '../components/apps/navbar.vue'
import Footer from '../components/apps/footer.vue'

export default {
  components: {
    Header,
    Navbar,
    Footer,
  },
}
</script>

<style lang="scss">
.app {
}
.main-content {
  padding: 2em 10em;
  background-color: #161d31;
  width: 100%;
  color: #d0d2d6;
  position: relative;
}
#content {
  height: 80vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: #e5e5e5;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #e5e5e5;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #888888;
  }
}
</style>
