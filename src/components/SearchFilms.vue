<template>
  <div>
    <b-button @click="filter=!filter" class="mb-1">
      <template v-if="filter">
        Hide Filter
      </template>
      <template v-else>
        Show Filter
      </template>
    </b-button>
    <b-container >
      <b-collapse v-model="filter" id="search_filters">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-row>
          <b-col cols="12" class="text-left">
            <b-row>
              <b-col cols="4">
                <b-form-group id="people_name_group"
                              label-for="name"
                              label="Name/species:">
                  <vue-bootstrap-typeahead
                    v-model="form.name"
                    :data="unionPeoplesSpecies"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="5">
                <div>
                  <label class="typo__label">Planets</label>
                  <multiselect v-model="form.planets" :options="planets" :multiple="true" :close-on-select="false"
                               :clear-on-select="false" :preserve-search="true" placeholder="" label="name"
                               track-by="name" >
                    <!--<template slot="selection" slot-scope="{ value, search, isOpen }"><span class="multiselect__single" v-if="value.length &amp;&amp; !isOpen">{{ value.length }} options selected</span></template>-->
                  </multiselect>
                  <!--<pre class="language-json"><code>{{ form.planets  }}</code></pre>-->
                </div>
              </b-col>
              <b-col cols="3">
                <b-form-group id="gender_group"
                              label-for="gender"
                              label="Gender:">
                  <b-form-select id="gender"
                                 :options="gender"
                                 v-model="form.gender">
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group id="date_ini_group"
                              label-for="date_ini"
                              label="Birth Year Ini:">
                  <b-form-input id="date_ini"
                                type="text"
                                v-model="form.date_ini"
                                placeholder="">
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group id="date_end_group"
                              label-for="date_end"
                              label="Birth Year End:">
                  <b-form-input id="date_end"
                                type="text"
                                v-model="form.date_end"
                                placeholder="">
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <b-col class="mt-2">
            <b-button type="submit" variant="primary" class="float-right ml-2">Submit</b-button>
            <b-button type="reset" variant="danger" class="float-right">Reset</b-button>
          </b-col>
        </b-row>
      </b-form>
      </b-collapse>
      <b-row>
        <b-col>
          <b-alert :variant="alertType"
                   dismissible
                   :show="showAlert"
                   @dismissed="showAlert=false">
            {{ errorMsg }}
          </b-alert>
        </b-col>
      </b-row>
    </b-container>
    <films-table class="mt-2" v-if="display_result"></films-table>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import { mapGetters, mapState } from 'vuex'
import FilmsTable from '@/components/FilmsTable'

export default {
  components: {Multiselect, VueBootstrapTypeahead, FilmsTable},
  data () {
    return {
      form: {
        date_end: '',
        date_ini: '',
        name: '',
        planets: ''
      },
      gender: [
        {value: 'female', text: 'Female'},
        {value: 'male', text: 'Male'},
        {value: 'unknown', text: 'Unknown'}
      ],
      handedness: [
        {value: 'right', text: 'Right'},
        {value: 'left', text: 'Left'},
        {value: 'ambidextrous', text: 'Ambidextrous'},
        {value: 'unknown', text: 'Unknown'}
      ],
      show: true,
      errorMsg: '',
      showAlert: false,
      alertType: '',
      display_result: true,
      filter: true
    }
  },
  computed: {
    ...mapState(['planets']),
    ...mapGetters(['unionPeoplesSpecies'])
  },
  mounted () {
    this.onSubmit()
  },
  beforeMount () {
    this.$store.dispatch('loadPlanets')
    this.$store.dispatch('loadNameSpecies')
    this.$store.dispatch('loadNamePanets')
  },
  methods: {
    onSubmit (evt) {
      if (evt) {
        evt.preventDefault()
      }
      this.$store.dispatch('loadPeoples')
      this.$store.dispatch('searchPeopleByCriteria', this.form)
        .then((data) => {
          //          if (data.length < 0) {
          //            this.errorMsg = 'Not people found'
          //            this.showAlert = true
          //            this.alertType = 'warning'
          //          } else {
          //            this.display_result = true
          //          }
        })
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form = {}
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
      this.display_result = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
