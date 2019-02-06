<template>
  <default fluid>
    <b-card no-body>
      <b-tabs pills card>
        <b-tab title="People" active>
          <search-peoples></search-peoples>
        </b-tab>
        <b-tab no-body title="Films">
          <search-films></search-films>
        </b-tab>
      </b-tabs>
    </b-card>
  </default>
</template>

<script>
import Default from '@/layouts/Default'
import SearchPeoples from '@/components/SearchPeoples'
import SearchFilms from '@/components/SearchFilms'

export default {
  components: {Default, SearchPeoples, SearchFilms}
}
</script>

<style lang="scss" scoped>
</style>
