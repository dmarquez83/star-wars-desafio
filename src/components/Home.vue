<template>
  <default fluid>
    <b-card no-body>
      <b-tabs pills card v-model="tabs">
        <b-tab title="Search Form" active>
          <search v-if="tabs===0"></search>
        </b-tab>
        <b-tab title="Table People">
          <search-peoples v-if="tabs===1"></search-peoples>
        </b-tab>
      </b-tabs>
    </b-card>
  </default>
</template>

<script>
import Default from '@/layouts/Default'
import Search from '@/components/Search'
import SearchPeoples from '@/components/SearchPeoples'

export default {
  name: 'home',
  components: {Default, Search, SearchPeoples},
  data () {
    return {
      tabs: null
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
