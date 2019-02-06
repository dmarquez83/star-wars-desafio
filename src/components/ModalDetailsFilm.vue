<template>
  <b-modal v-model="show" v-if="show" hide-footer>
    <b-card :header="'Director: ' + films_details.director"
            header-tag="header"
            :footer="films_details.release_date | formatDate"
            footer-tag="footer"
            :title="'Producer: ' + films_details.producer">
      <b-card no-body class="mb-1">
        <p class="card-text mt-2">
          {{ films_details.opening_crawl }}
        </p>
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion1 variant="info">Characters</b-btn>
        </b-card-header>
        <b-collapse id="accordion1"  accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-list-group>
              <b-list-group-item href="#" @click.prevent="viewDetailsPeople(item)"
                                 v-for="(item, id) in films_details.characters_name" :key="id">
                {{ item }}
              </b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion2 variant="info">Planets</b-btn>
        </b-card-header>
        <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-list-group>
              <b-list-group-item href="#" v-for="(item, id) in films_details.planets_name" :key="id">{{ item }}</b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion3 variant="info">Starships</b-btn>
        </b-card-header>
        <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-list-group>
              <b-list-group-item href="#" v-for="(item, id) in films_details.starships_name" :key="id">{{ item }}</b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion4 variant="info">Vehicles</b-btn>
        </b-card-header>
        <b-collapse id="accordion4" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-list-group>
              <b-list-group-item href="#" v-for="(item, id) in films_details.vehicles_name" :key="id">{{ item }}</b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion5 variant="info">species</b-btn>
        </b-card-header>
        <b-collapse id="accordion5" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-list-group>
              <b-list-group-item href="#" v-for="(item, id) in films_details.species_name" :key="id">{{ item }}</b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-collapse>
      </b-card>
    </b-card>
    <b-btn class="mt-3" variant="info" @click="show=false">Close</b-btn>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'DetailsFilms',
  components: {mapState},
  props: ['nameFilm', 'active'],
  data () {
    return {
      show: false,
      active_people: false,
      modalInfo: {}
    }
  },
  computed: {
    ...mapState(['index_film_details', 'films', 'index_people_details', 'search_result']),
    films_details () {
      return this.films[this.index_film_details]
    }
  },
  methods: {
    viewDetailsPeople (name) {
      this.show = false
      this.$store.dispatch('loadDetails', {name: name})
      this.modalInfo = this.search_result[this.index_people_details]
      Event.fire('open-people-details', this.modalInfo)
    }
  },
  watch: {
    active (value) {
      this.show = value
      if (value) this.$store.dispatch('loadDetailsFilm', {title: this.nameFilm})
    },
    show (value) {
      if (!value) {
        Event.fire('close-details')
      }
    }
  },
  filters: {
    formatDate (value) {
      if (value) {
        return 'Release Date: ' + moment(String(value)).format('MM/DD/YYYY')
      }
    }
  },
  mounted () {
    Event.listen('close-detail-film', () => {
      this.active_people = false
    })
  }
}
</script>
