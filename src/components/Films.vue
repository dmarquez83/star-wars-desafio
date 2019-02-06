<template>
  <default fluid>
    <b-card no-body>
      <b-tabs pills card>
        <b-tab no-body title="Films">
          <search-films></search-films>
        </b-tab>
      </b-tabs>
    </b-card>
  </default>
</template>

<script>
import Default from '@/layouts/Default'
import SearchFilms from '@/components/SearchFilms'

export default {
  components: {Default, SearchFilms}
}
</script>

<style lang="scss" scoped>
</style>
