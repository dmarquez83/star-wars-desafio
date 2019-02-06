<template>
  <b-card no-body>
    <div class="bg-secondary">
      <b-row class="p-2 pl-3">
        <b-col cols="8">
          <h2 class="text-left text-white">Films</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-alert :variant="alert_type"
                   dismissible
                   :show="showAlert"
                   @dismissed="showAlert=false">
            {{ errorMsg }}
          </b-alert>
        </b-col>
      </b-row>
    </div>
    <b-table striped hover :items="films" :fields="fields">
    </b-table>
    <b-row>
      <b-col class="mx-auto" cols="2">
        <b-pagination label-next-page="siguiente" align="center" size="md" v-if="films.count > 10" :total-rows="films.count" v-model="current_page" :per-page="10">
        </b-pagination>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import Default from '@/layouts/Default'
import { mapState } from 'vuex'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  components: {Default, mapState, FontAwesomeIcon},
  data () {
    return {
      pagination: {},
      fields: {
        name: {
          label: 'Title',
          sortable: true,
          key: 'title'
        },
        species: {
          label: 'Director',
          sortable: true,
          key: 'director'
        },
        home_world: {
          label: 'Producer',
          sortable: true,
          key: 'producer'
        },
        gender: {
          label: 'Opening Crawl',
          sortable: true,
          key: 'opening_crawl'
        },
        birth_year: {
          label: 'Episode',
          sortable: true,
          key: 'episode_id'
        }
      },
      current_page: 1,
      peopleFormModal: false,
      show: true,
      form: {
        name: '',
        people_id: '',
        description: ''
      },
      formParameters: {
        title: ''
      },
      alert_form: { show: false },
      errorMsg: '',
      showAlert: false,
      alert_type: '',
      select_all: false,
      deleteModal: false,
      delete_id: null
    }
  },
  beforeMount () {
    this.$store.dispatch('loadfilms')
  },
  computed: {
    ...mapState(['films'])
  }
}
</script>
