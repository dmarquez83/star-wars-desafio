<template>
  <b-modal v-model="show_people" v-if="show_people" hide-footer>
    <b-card :footer="modalInfo.homeworld"
            footer-tag="footer"
            :title="modalInfo.name">
      <b-container >
        <b-list-group>
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="modalInfo.height">
            Height
            <b-badge variant="info" pill>{{ modalInfo.height }}</b-badge>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="modalInfo.mass">
            Mass
            <b-badge variant="info" pill>{{ modalInfo.mass }}</b-badge>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="modalInfo.hair_color">
            hair_color
            <b-badge variant="info" pill>{{ modalInfo.hair_color }}</b-badge>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="modalInfo.skin_color">
            skin_color
            <b-badge variant="info" pill>{{ modalInfo.skin_color }}</b-badge>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="modalInfo.eye_color">
            eye_color
            <b-badge variant="info" pill>{{ modalInfo.eye_color }}</b-badge>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="modalInfo.birth_year">
            birth_year
            <b-badge variant="info" pill>{{ modalInfo.birth_year }}</b-badge>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="modalInfo.male">
            male
            <b-badge variant="info" pill>{{ modalInfo.male }}</b-badge>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-left" v-if="modalInfo.homeworld">
            homeworld
            <b-badge variant="info" pill>{{ modalInfo.homeworld }}</b-badge>
          </b-list-group-item>
        </b-list-group>
      </b-container>
      <b-card no-body class="mb-1" v-if="modalInfo.films && Object.keys(modalInfo.films).length > 0" >
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion1 variant="info">Films</b-btn>
        </b-card-header>
        <b-collapse id="accordion1"  accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-list-group >
              <b-list-group-item href="#" @click.prevent="viewDetailsFilm(item)"
                                 v-for="(item, id) in modalInfo.films_name" :key="id" >
                {{ item }}
              </b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="modalInfo.starships && Object.keys(modalInfo.starships).length > 0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion3 variant="info">Starships</b-btn>
        </b-card-header>
        <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-list-group>
              <b-list-group-item href="#" v-for="(item, id) in modalInfo.starships" :key="id">{{ item }}</b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="modalInfo.vehicles && Object.keys(modalInfo.vehicles).length > 0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion4 variant="info">Vehicles</b-btn>
        </b-card-header>
        <b-collapse id="accordion4" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-list-group>
              <b-list-group-item href="#" v-for="(item, id) in modalInfo.vehicles" :key="id">{{ item }}</b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="modalInfo.species && Object.keys(modalInfo.species).length > 0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion5 variant="info">species</b-btn>
        </b-card-header>
        <b-collapse id="accordion5" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-list-group>
              <b-list-group-item href="#" v-for="(item, id) in modalInfo.species" :key="id">{{ item }}</b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-collapse>
      </b-card>
    </b-card>
    <b-btn class="mt-3" variant="info" @click="show_people=false">Close</b-btn>
  </b-modal>
</template>

<script>
import moment from 'moment'

export default {
  name: 'DetailsFilms',
  props: ['modalInfo', 'active_people'],
  data () {
    return {
      show_people: false
    }
  },
  watch: {
    active (value) {
      this.show_people = value
    },
    show_people (value) {
      if (!value) {
        Event.fire('close-detail-film')
      }
    }
  },
  filters: {
    formatDate (value) {
      if (value) {
        return 'Release Date: ' + moment(String(value)).format('MM/DD/YYYY')
      }
    }
  }
}
</script>
