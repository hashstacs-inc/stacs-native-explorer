<template>
  <div>
    <header>
      <navbar></navbar>
    </header>
    <main style="width: 1200px;margin: auto">
      <transition name="fade-transform" mode="out-in">
        <router-view style="margin-top: 60px;"/>
      </transition>
    </main>
    <footer style="margin-top: 270px">
      <gsp-footer></gsp-footer>
    </footer>
  </div>
</template>

<script>
  import navbar from './navbar'
  import gspFooter from './gspFooter'

  export default {
    data() {
      return {}
    },
    components: {
      navbar,
      gspFooter
    }
  }
</script>

<style>

</style>
