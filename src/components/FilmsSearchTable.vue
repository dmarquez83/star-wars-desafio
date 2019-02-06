<template>
  <b-card no-body>
    <div class="bg-secondary">
      <b-row class="p-2 pl-3">
        <b-col cols="8">
          <h2 class="text-left text-white">Films</h2>
        </b-col>
      </b-row>
    </div>
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Sort" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortBy" :options="sortOptions">
              <option slot="first" :value="null">-- none --</option>
            </b-form-select>
            <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Sort direction" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortDirection" slot="append">
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
              <option value="last">Last</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Per page" class="mb-0">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>
    </b-row>
    <!-- Main table element -->
    <b-table show-empty
             stacked="md"
             :items="films"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :sort-direction="sortDirection"
             @filtered="onFiltered"
    >
      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click="viewDetails(row)" class="mr-1">
          view
        </b-button>
        <b-button size="sm" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Opening Crawl
        </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card class="text-center">
           {{ row.item.opening_crawl }}
        </b-card>
      </template>
    </b-table>
    <b-row>
      <b-col  class="mx-auto" cols="2">
        <b-pagination v-if="films.length > perPage" align="center" size="md" :total-rows="films.length" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>
    <b-modal size="lg"  v-if="modal_film" v-model="modal_film"  :title="modalInfo.title" ok-only>
      <b-card :header="'Director: ' + modalInfo.director"
              header-tag="header"
              :footer="modalInfo.release_date | formatDate"
              footer-tag="footer"
              :title="'Producer: ' + modalInfo.producer">
        <b-card no-body class="mb-1">
          <p class="card-text mt-2">
             {{ modalInfo.opening_crawl }}
          </p>
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle.accordion1 variant="info">Characters</b-btn>
          </b-card-header>
          <b-collapse id="accordion1"  accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-list-group>
                <b-list-group-item href="#" @click.prevent="viewDetailsCharacters(item)"
                                   v-for="(item, id) in modalInfo.characters_name" :key="id">{{ item }}</b-list-group-item>
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
                <b-list-group-item href="#" v-for="(item, id) in modalInfo.planets_name" :key="id">{{ item }}</b-list-group-item>
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
                <b-list-group-item href="#" v-for="(item, id) in modalInfo.starships_name" :key="id">{{ item }}</b-list-group-item>
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
                <b-list-group-item href="#" v-for="(item, id) in modalInfo.vehicles_name" :key="id">{{ item }}</b-list-group-item>
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
                <b-list-group-item href="#" v-for="(item, id) in modalInfo.species_name" :key="id">{{ item }}</b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-card>
    </b-modal>
    <modal-details-people :namePeople="namePeople" :active_people="active"></modal-details-people>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import ModalDetailsPeople from '@/components/ModalDetailsPeople'

export default {
  name: 'FilmsSearchFable',
  components: {ModalDetailsPeople},
  data () {
    return {
      fields: [
        { key: 'title', label: 'Name', sortable: true, sortDirection: 'desc' },
        { key: 'director', label: 'Director', sortable: true, 'class': 'text-center' },
        { key: 'producer', label: 'Producer', sortable: true, 'class': 'text-center' },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 5,
      pageOptions: [ 5, 10, 15 ],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      modalInfo: { },
      modal_film: false,
      namePeople: '',
      active: false
    }
  },
  mounted () {
    Event.listen('close-details-film', () => {
      setTimeout(() => {
        this.active = false
      }, 300)
    })
    Event.listen('open-film-details', (info) => {
      this.modalInfo = info
      setTimeout(() => {
        this.modal_film = true
      }, 300)
    })
  },
  computed: {
    ...mapState(['films']),
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
  },
  methods: {
    viewDetails (row) {
      this.$store.dispatch('loadDetailsFilm', {url: row.item.url})
      this.modalInfo = row.item
      this.modal_film = true
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    viewDetailsCharacters (row) {
      console.log('viewDetailsCharacters:', row)
      this.namePeople = row
      this.modal_film = false
      this.active = true
    }
  },
  beforeMount () {
    this.$store.dispatch('loadFilms')
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
