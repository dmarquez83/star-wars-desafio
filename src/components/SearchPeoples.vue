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
                    v-model="form.names"
                    :data="unionPeoplesSpecies"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="5">
                <div>
                  <label class="typo__label">Planets</label>
                  <multiselect v-model="form.planets" :options="planetReduce" :multiple="true" :close-on-select="false"
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
              <!--<b-col cols="4">-->
                <!--<label class="typo__label">Birth Year: {{ range }} {{ BirthYear }}</label>-->
              <!--</b-col>-->
              <!--<b-col cols="8">-->
                <!--&lt;!&ndash;<vue-slider v-if="peoples" v-model="BirthYear" width="100%"&ndash;&gt;-->
                <!--&lt;!&ndash;:show="true"  :min="BirthYear[0]" :max="BirthYear[1]" :disabled="false" :tooltipMerge="false" :tooltip="'always'"></vue-slider>&ndash;&gt;-->
              <!--</b-col>-->
              <b-col cols="4">
                <b-form-group id="gender_group"
                              label-for="gender"
                              label="Birth Year Ini:">
                  <b-form-select id="gender"
                                 :options="BirthYearListAsc"
                                 v-model="form.date_ini">
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group id="gender_group"
                              label-for="gender"
                              label="Birth Year End:">
                  <b-form-select id="gender"
                                 :options="BirthYearListDesc"
                                 v-model="form.date_end">
                  </b-form-select>
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
    <peoples-table class="mt-2" v-if="display_result"></peoples-table>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import { mapGetters, mapState } from 'vuex'
import PeoplesTable from '@/components/PeoplesTable'
import vueSlider from 'vue-slider-component'

export default {
  components: {Multiselect, VueBootstrapTypeahead, PeoplesTable, vueSlider},
  data () {
    return {
      form: {
        date_end: '',
        date_ini: '',
        names: '',
        planets: '',
        gender: '',
        birth_year_range: [8, 50]
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
      filter: true,
      range: [8, 100]
    }
  },
  computed: {
    ...mapState(['planets', 'species', 'peoples']),
    ...mapGetters(['BirthYear', 'BirthYearListAsc', 'BirthYearListDesc']),
    unionPeoplesSpecies () {
      let species = this.species.map(t => {
        return t.name
      })
      let peoples = this.peoples.map(t => {
        return t.name
      })
      return [...species, ...peoples]
    },
    planetReduce () {
      return this.planets.map(value => {
        return {name: value.name, url: value.url}
      })
    }
  },
  mounted () {
    this.$store.dispatch('loadPeoples')
  },
  beforeMount () {
    this.$store.dispatch('loadPlanets')
    this.$store.dispatch('loadSpecies')
  },
  methods: {
    onSubmit (evt) {
      if (evt) {
        evt.preventDefault()
      }
      this.$store.dispatch('searchPeople', this.form)
    },
    onReset (evt) {
      evt.preventDefault()
      this.form = {
        date_end: '',
        date_ini: '',
        names: '',
        planets: '',
        gender: '',
        birth_year_range: ''
      }
      this.$store.commit('resetResult')
    }
  },
  watch: {
    resetResult () {
      this.value = this.BirthYear
    }
  }
}
</script>

<style lang="scss" scoped>
  .slider {
    /* overwrite slider styles */
    width: 200px;
  }
</style>
