<template>
  <div>
    <navbar></navbar>
    <b-container class="pt-4" :fluid="fluid">
      <slot></slot>
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/NavBar'

export default {
  components: {Navbar},
  props: ['fluid']
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
</style>
