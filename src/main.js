import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCsrf from 'vue-csrf'
import jquery from 'jquery'
import vSelect from 'vue-select'
import _ from 'lodash'
import VueSession from 'vue-session'
import loading from 'vuejs-loading-screen'
import Multiselect from 'vue-multiselect'
// models
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'
// import autoCompleat componnent
import Autocomplete from 'vuejs-auto-complete'
import 'datatables.net-bs4'
// import buttons and plugins
import 'datatables.net-buttons/js/dataTables.buttons.js'
import 'datatables.net-buttons/js/buttons.html5.js'
import 'datatables.net-buttons/js/buttons.print.js'
// import the rest
import 'datatables.net-buttons-bs4'
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { numberFormat } from '././assets/js/number-format'
import JsonCSV from 'vue-json-csv'
import swal from 'sweetalert'
import 'babel-polyfill'
import switching from './components/switching.vue'
import i18n from './i18n'
// globally
Vue.component('Modal', VueModal)
Vue.config.productionTip = false
Vue.config.performance = true
Vue.use(CoreuiVue, VueAxios, axios, VueCsrf, jquery, VueSession, loading, Multiselect)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.prototype.$log = console.log.bind(console)
Vue.prototype.$http = axios
Vue.use(loading)
Vue.prototype.$ = jquery
Vue.prototype._ = _
Vue.prototype.$session = VueSession
Vue.prototype.i18n = i18n
Vue.component('v-select', vSelect)
Vue.component('multiselect', Multiselect)
Vue.component('modal', {
  template: '#modal-template'
})
Vue.component('downloadCsv', JsonCSV)
// number format
Vue.filter('toCurrency', function (value) {
  if (typeof value !== 'number') {
    return value
  }
  const formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 })
  return formatter.format(value)
})
Vue.prototype.$hostUrl = process.env.VUE_APP_BACKEND_SERVER
// Vue.prototype.$hostUrl2 = process.env.MS_URL

axios.interceptors.request.use(req => {
  jquery('.loading').show()
  req.headers.authorization = 'Bearer ' + localStorage.token
  return req
})
axios.interceptors.response.use(function (response) {
  jquery('.loading').hide()
  return response
}, function (error) {
  jquery('.loading').hide()
  console.log(error)
  if (error.response.status === 401) {
    swal({
      title: 'Session over',
      text: 'Your session has expired. Would you like to be redirected to the login page ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes',
      closeOnConfirm: false
    }).then((oKBtn) => {
      router.push({ path: '/login' })
    })
  } else {
    return Promise.reject(error)
  }
})
if (localStorage.Lang != null) {
  i18n.locale = localStorage.Lang
}

new Vue({
  el: '#app',
  router,
  store,
  icons,
  i18n,
  template: '<App/>',
  components: {
    Autocomplete,
    App,
    switching
  },
  data: {
    cities: 0,
    areas: 0
  },
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.authGuard) && !localStorage.token) {
    next({ name: 'Login' })
  }
  next()
})

Vue.filter('number', function (value) {
  return numberFormat(value, 0)
})
Vue.filter('stripHTML', function (value) {
  const div = document.createElement('div')
  div.innerHTML = value
  const text = div.textContent || div.innerText || ''
  return text
})
Vue.mixin({
  methods: {
    async postRequest (formData, url, create, uploadPercentage) {
      let errors = []
      await this.$http.post(`${url}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-api-key': process.env.VUE_APP_MS_TOKEN
        },
        onUploadProgress: function (progressEvent) {
          this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
        }.bind(this)
      })
        .then((response) => {
          if (!response.data.error) {
            swal({ title: response.data.message, buttons: 'تم' })
            if (create) {
              this.$router.push({ path: create })
            }
          } else {
            errors = response.data.data
          }
        }).catch(function (error) {
          if (Object.prototype.hasOwnProperty.call(error, 'response')) {
            const data = (error.response || {}).data
            if (data.error) {
              errors = data.data
            } else {
              swal({
                title: 'An error occurred while processing the request, please try again later',
                buttons: 'Done'
              })
            }
          } else {
            swal({
              title: 'An error occurred while processing the request, please try again later',
              buttons: 'Done'
            })
          }
        })
      return errors
    }
  }
})
