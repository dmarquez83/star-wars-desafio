<template>
  <b-modal v-model="show" v-if="show" hide-footer>
    <b-card :footer="peoples_details.homeworld_name"
            footer-tag="footer"
            :title="peoples_details.name">
      <b-container >
        <b-list-group>
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="peoples_details.height">
            Height
            <b-badge variant="info" pill>{{ peoples_details.height }}</b-badge>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="peoples_details.mass">
            Mass
            <b-badge variant="info" pill>{{ peoples_details.mass }}</b-badge>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="peoples_details.hair_color">
            hair_color
            <b-badge variant="info" pill>{{ peoples_details.hair_color }}</b-badge>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="peoples_details.skin_color">
            skin_color
            <b-badge variant="info" pill>{{ peoples_details.skin_color }}</b-badge>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="peoples_details.eye_color">
            eye_color
            <b-badge variant="info" pill>{{ peoples_details.eye_color }}</b-badge>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="peoples_details.birth_year">
            birth_year
            <b-badge variant="info" pill>{{ peoples_details.birth_year }}</b-badge>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="peoples_details.male">
            male
            <b-badge variant="info" pill>{{ peoples_details.male }}</b-badge>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-left" v-if="peoples_details.homeworld">
            homeworld
            <b-badge variant="info" pill>{{ peoples_details.homeworld_name }}</b-badge>
          </b-list-group-item>
        </b-list-group>
      </b-container>
      <b-card no-body class="mb-1" v-if="peoples_details.films && Object.keys(peoples_details.films).length > 0" >
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion1 variant="info">Films</b-btn>
        </b-card-header>
        <b-collapse id="accordion1"  accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-list-group >
              <b-list-group-item href="#" @click.prevent="viewDetailsFilm(item)"
                                 v-for="(item, id) in peoples_details.films_name" :key="id" >
                {{ item }}
              </b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="peoples_details.starships && Object.keys(peoples_details.starships).length > 0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion3 variant="info">Starships</b-btn>
        </b-card-header>
        <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-list-group>
              <b-list-group-item href="#" v-for="(item, id) in peoples_details.starships_name" :key="id">{{ item }}</b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="peoples_details.vehicles && Object.keys(peoples_details.vehicles).length > 0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion4 variant="info">Vehicles</b-btn>
        </b-card-header>
        <b-collapse id="accordion4" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-list-group>
              <b-list-group-item href="#" v-for="(item, id) in peoples_details.vehicles_name" :key="id">{{ item }}</b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="peoples_details.species && Object.keys(peoples_details.species).length > 0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion5 variant="info">species</b-btn>
        </b-card-header>
        <b-collapse id="accordion5" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-list-group>
              <b-list-group-item href="#" v-for="(item, id) in peoples_details.species_anme" :key="id">{{ item }}</b-list-group-item>
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
  name: 'DetailsPeople',
  props: ['namePeople', 'active_people'],
  data () {
    return {
      show: false,
      active_film: false
    }
  },
  computed: {
    ...mapState(['index_people_details', 'search_result', 'films', 'index_film_details']),
    peoples_details () {
      console.log('this.index_people_details: ', this.index_people_details)
      return this.search_result[this.index_people_details]
    }
  },
  methods: {
    viewDetailsFilm (name) {
      this.show = false
      this.$store.dispatch('loadDetailsFilm', {title: name})
      this.modalInfo = this.films[this.index_people_details]
      Event.fire('open-film-details', this.modalInfo)
    }
  },
  watch: {
    active_people (value) {
      this.show = value
      console.log('namePeople: ', this.namePeople)
      if (value) this.$store.dispatch('loadDetails', {name: this.namePeople})
    },
    show (value) {
      if (!value) {
        Event.fire('close-details-film')
      }
    }
  },
  filters: {
    formatDate (value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY')
      }
    }
  }
}
</script>
