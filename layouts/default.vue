<template>
  <div class="d-flex">
    <Navbar />
    <div>
      <Header />
      <Nuxt />
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

<style></style>
