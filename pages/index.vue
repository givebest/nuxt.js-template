<template>
  <section>
    <Nav/>
    <div class="main--container">

      <div class="login--container tac--">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h1>Home</h1>
          </div>
          <logo/>
          <h1 class="title">
            nuxt-template
          </h1>
          <h2 class="subtitle">
            Nuxt template Nuxt.js project
          </h2>
        </el-card>
      </div>

    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

import Nav from '~/components/Nav.vue'

export default {
  components: {
    Logo,
    Nav
  }
}
</script>

<style>
</style>
