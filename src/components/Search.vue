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
          <b-col cols="7" class="text-left">
            <b-row class="mb-3">
              <b-form-checkbox id="by_people"
                               v-model="by_people">
                Search by criteria People
              </b-form-checkbox>
            </b-row>
            <b-row>
              <b-col cols="6">
                <b-form-group v-if="by_people"
                              id="people_name_group"
                              label-for="name"
                              label="Name">
                  <b-form-input id="name"
                                type="text"
                                v-model="form.name"
                                aria-describedby="input1LiveFeedback"
                                :state="!$v.form.name.$invalid"
                                placeholder="">
                  </b-form-input>
                  <b-form-invalid-feedback id="input1LiveFeedback">
                     Only allows alphanumeric characters.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="5" class="pl-5">
            <b-row class="mb-6">
              <b-form-checkbox id="by_film"
                               v-model="by_film">
                Search by Films
              </b-form-checkbox>
            </b-row>
          </b-col>
          <b-col class="mt-2" v-if="by_people">
            <b-button type="submit" variant="primary" class="float-right ml-2">Submit</b-button>
            <b-button type="reset" variant="danger" class="float-right">Reset</b-button>
          </b-col>
        </b-row>
      </b-form>
      </b-collapse>
      <b-row >
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
    <peoples-table class="mt-2" v-if="by_people"></peoples-table>
    <films-search-table class="mt-2" v-if="by_film"></films-search-table>

  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { alphaNum } from 'vuelidate/lib/validators'
import PeoplesTable from '@/components/PeoplesTable'
import FilmsSearchTable from '@/components/FilmsSearchTable'
import FilmsTable from '@/components/FilmsTable'

export default {
  components: {PeoplesTable, FilmsTable, FilmsSearchTable},
  data () {
    return {
      by_people: true,
      by_film: false,
      form: {},
      show: true,
      alertType: '',
      showAlert: false,
      errorMsg: '',
      filter: true
    }
  },
  mixins: [
    validationMixin
  ],
  validations: {
    form: {
      name: {
        alphaNum
      }
    }
  },
  methods: {
    onSubmit (evt) {
      if (evt) {
        evt.preventDefault()
      }
      this.$store.dispatch('searchPeople', this.form)
        .then((data) => {
          //          if (data.length < 0) {
          //            this.errorMsg = 'Not people found'
          //            this.showAlert = true
          //            this.alertType = 'warning'
          //          }
        })
    },
    onReset (evt) {
      evt.preventDefault()
      this.form = {}
      console.log('entre a limpiar')
      this.$store.commit('resetResult')
    }
  },
  watch: {
    by_people (value) {
      if (value) {
        this.by_film = false
      }
    },
    by_film (value) {
      if (value) {
        this.by_people = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
