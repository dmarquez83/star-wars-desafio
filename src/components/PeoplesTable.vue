<template>
  <b-card no-body>
    <div class="bg-secondary">
      <b-row class="p-2 pl-3">
        <b-col cols="8">
          <h2 class="text-left text-white">Peoples</h2>
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
    <b-table striped hover :items="search_result" :fields="fields" :per-page="per_page" :current-page="current_page"
             @row-clicked="viewDetails"
    >
    </b-table>
    <b-row>
      <b-col class="mx-auto" cols="2">
        <b-pagination label-next-page="siguiente" align="center" size="md" v-if="search_result"
                      :total-rows="search_result.length" v-model="current_page" :per-page="per_page">
        </b-pagination>
      </b-col>
    </b-row>
    <b-modal size="lg"  v-model="modal_people" v-if="modal_people" title="Characters Star Wars" ok-only>
      <b-card :footer="modalInfo.homeworld_name"
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
              <b-badge variant="info" pill>{{ modalInfo.homeworld_name }}</b-badge>
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
                <b-list-group-item href="#" v-for="(item, id) in modalInfo.starships_name" :key="id">{{ item }}</b-list-group-item>
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
                <b-list-group-item href="#" v-for="(item, id) in modalInfo.vehicles_name" :key="id">{{ item }}</b-list-group-item>
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
                <b-list-group-item href="#" v-for="(item, id) in modalInfo.species_name" :key="id">{{ item }}</b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-card>
    </b-modal>
    <modal-details-film :nameFilm="nameFilm" :active="active"></modal-details-film>
  </b-card>
</template>

<script>
import Default from '@/layouts/Default'
import { mapState } from 'vuex'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import ModalDetailsFilm from '@/components/ModalDetailsFilm'

export default {
  components: {Default, mapState, FontAwesomeIcon, ModalDetailsFilm},
  data () {
    return {
      search: '',
      pagination: {},
      selected: {},
      fields: {
        name: {
          label: 'Name',
          sortable: true,
          key: 'name'
        },
        species: {
          label: 'Species',
          sortable: true,
          key: 'species_name'
        },
        home_world: {
          label: 'Home World',
          sortable: true,
          key: 'homeworld_name'
        },
        gender: {
          label: 'Gender',
          sortable: true,
          key: 'gender'
        },
        birth_year: {
          label: 'Birth Year',
          sortable: true,
          key: 'birth_year'
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
      delete_id: null,
      modalInfo: { },
      active: false,
      nameFilm: '',
      per_page: 10,
      modal_people: false,
      show_modal_people: false
    }
  },
  mixins: [
    validationMixin
  ],
  validations () {
    if (this.formParameters.submit && this.formParameters.submit === 'Submit') {
      return {
        form: {
          name: {
            required,
            minLength: minLength(3)
          },
          description: {}
        }
      }
    } else {
      return {
        form: {
          name: {
            required,
            minLength: minLength(3)
          },
          people_id: {
            required
          },
          description: {}
        }
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('loadPeoples')
  },
  mounted () {
    Event.listen('close-details', () => {
      this.active = false
    })
    Event.listen('open-people-details', (info) => {
      this.modalInfo = info
      setTimeout(() => {
        this.modal_people = true
      }, 300)
    })
  },
  computed: {
    ...mapState(['search_result'])
  },
  methods: {
    viewDetails (row) {
      this.$store.dispatch('loadDetails', {url: row.url})
      this.modalInfo = row
      this.modal_people = true
    },
    viewDetailsFilm (row) {
      this.nameFilm = row
      this.modal_people = false
      this.active = true
    }
  }
}
</script>
