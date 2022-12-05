<template>
  <div>
    <CRow>
      <CCol col="12">
           <CCard class="cards">
          <form id="createJob" @submit="createJob" >
          <CCardHeader>
            <CCol col="12" style="font-size: 25px;"> Add New Job  </CCol>
          </CCardHeader>
          <CCardBody>
            <CRow>
               <CCol sm='6'>
                <div class='form-group'>
                    <label for='category'>
                       Category
                      <span class='star'>*</span>
                    </label>
                      <CButton type="button" @click="showModal=true"  class="add mx-3">
                               +
                               </CButton>
                      <Modal v-model="showModal">
                       <NewCategory />
                          </Modal>
                      <div>
                      <multiselect
                        class='required category'
                        v-model='selectedCategory'
                        id='category_id'
                        :options='categories'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder="$t('message.select')"
                        label='name'
                        track-by='id'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                     <div v-if="errors.category_id" class="invalid-feedback">
                        {{errors.category_id}}
                      </div>
                    </div>
                  </div>
              </CCol>
               <CCol sm='6'>
                <div class='form-group'>
                    <label for='employer'>
                       Employer
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required employer'
                        v-model='selectedEmployer'
                        id='employer_id'
                        :options='employers'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder="$t('message.select')"
                        label='name'
                        track-by='id'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                     <div v-if="errors.employer_id" class="invalid-feedback">
                        {{errors.employer_id}}
                      </div>
                    </div>
                  </div>
              </CCol>
              </CRow>
              <CRow>
               <CCol sm='6'>
                <div class='form-group'>
                    <label for='careerLevels'>
                       Career Levels
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required career'
                        v-model='selectedCareerLevel'
                        id='employer_id'
                        :options='careerLevels'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder="$t('message.select')"
                        label='name'
                        track-by='id'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                     <div v-if="errors.career_level_id" class="invalid-feedback">
                        {{errors.career_level_id}}
                      </div>
                    </div>
                  </div>
              </CCol>
               <CCol sm='6'>
                <div class='form-group'>
                    <label for='jobType'>
                        Job Type
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required type'
                        v-model='selectedJobType'
                        id='employer_id'
                        :options='jobTypes'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder="$t('message.select')"
                        label='name'
                        track-by='id'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                     <div v-if="errors.job_type_id" class="invalid-feedback">
                        {{errors.job_type_id}}
                      </div>
                    </div>
                  </div>
              </CCol>
              </CRow>
              <CRow>
              <CCol sm="6">
                <CInput label=" Title"
                  id="title"
                  v-model="job.title"
                  class="required"
                  pattern="^[A-za-z][a-zA-Z].{1,}"
                 placeholder=" Title "
                  :invalidFeedback="errors.title"
                />
              </CCol>
            </CRow>
              <CRow>
              <CCol sm="6">
                <CInput label=" Location"
                  id="location"
                  v-model="job.location"
                 placeholder="Enter Job location "
                  :invalidFeedback="errors.location"
                />
              </CCol>
              <CCol sm="6">
                <CInput label="Vacancies"
                  id="vacancies"
                  class="required"
                  v-model="job.vacancies"
                 placeholder="Enter Job vacancies "
                  :invalidFeedback="errors.vacancies"
                  required
                />
              </CCol>
            </CRow>
             <CRow>
              <CCol sm="6">
                <CInput label="salary"
                  id="salary"
                   type="number"
                   min=0
                  v-model="job.salary"
                   placeholder="Enter Job salary "
                  :invalidFeedback="errors.salary"
                />
              </CCol>
            </CRow>
             <br>
               <CRow>
              <CCol col="2">
                <label>  Job Description </label>
              </CCol>
              <CCol col="10">
                <client-only>
                  <VueEditor v-model='job.description' :invalidFeedback="errors.description" />
                </client-only>
              </CCol>
            </CRow>
            <br>
            <CRow>
              <CCol col="2">
                <label>  Job Requirements </label>
              </CCol>
              <CCol col="10">
                <client-only>
                  <VueEditor v-model='job.requirements' :invalidFeedback="errors.requirements" />
                </client-only>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/> {{ $t('message.save') }}</CButton>
              &emsp;
            <CButton type="reset" size="sm" color="danger">
            <CIcon name="cil-ban"/> {{ $t('message.clear') }} </CButton>
          </CCardFooter>
          </form>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import $ from 'jquery'
import swal from 'sweetalert'
import { VueEditor } from 'vue2-editor'
import NewCategory from '@/components/NewCategory'
export default {
  name: 'createJob',
  components: {
    NewCategory,
    VueEditor
  },
  data: function () {
    return {
      job: {},
      showModal: false,
      employers: [],
      selectedEmployer: '',
      categories: [],
      selectedCategory: '',
      careerLevels: [],
      selectedCareerLevel: '',
      jobTypes: [],
      selectedJobType: '',
      educationLevels: [],
      selectedEducationLevel: '',
      errors: []
    }
  },
  created () {
    const employers = []
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/employers`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          employers.push({ id: value.id, name: value.name })
        })
        this.employers = employers
      })
    const categories = []
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/categories`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          categories.push({ id: value.id, name: value.name })
        })
        this.categories = categories
      })
    const careerLevels = []
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/career-levels`)
      .then((response) => {
        $.each(response.data.data.careerLevels, function (key, value) {
          careerLevels.push({ id: value.id, name: value.name })
        })
        this.careerLevels = careerLevels
      })
    const educationLevels = []
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/education-levels`)
      .then((response) => {
        $.each(response.data.data.educationLevels, function (key, value) {
          educationLevels.push({ id: value.id, name: value.name })
        })
        this.educationLevels = educationLevels
      })
    const jobTypes = []
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/job-types`)
      .then((response) => {
        $.each(response.data.data.jobTypes, function (key, value) {
          jobTypes.push({ id: value.id, name: value.name })
        })
        this.jobTypes = jobTypes
      })
  },
  methods: {
    isLetter (e) {
      const arabic = /[\u0600-\u06FF]/
      const char = String.fromCharCode(e.keyCode) // Get the character
      if (/^[A-Za-z]$/.test(char)) return true
      else if (arabic.test(char)) return true // Match with regex
      // else e.preventDefault() // If not match, don't add to input text
    },
    createJob: function (e) {
      e.preventDefault()
      const formData = new FormData()
      if (this.selectedCategory) {
        formData.append('category_id', this.selectedCategory.id)
      } else {
        this.errors.push('category_id')
        this.errors.category_id = 'Category id field is required'
        swal('You must choose a job category')
        $(' .category .multiselect__tags').addClass('redborder')
        return 0
      }
      if (this.selectedEmployer) {
        formData.append('employer_id', this.selectedEmployer.id)
      } else {
        this.errors.push('employer_id')
        this.errors.employer_id = 'Employer id field is required'
        swal('You must choose a job Employer')
        $(' .employer .multiselect__tags').addClass('redborder')
        return 0
      }
      if (this.selectedCareerLevel) {
        formData.append('career_level_id', this.selectedCareerLevel.id)
      } else {
        this.errors.push('career_level_id')
        this.errors.career_level_id = 'Career Level id field is required'
        swal('You must choose a Career Level for a Job')
        $(' .career .multiselect__tags').addClass('redborder')
        return 0
      }
      if (this.selectedJobType) {
        formData.append('job_type_id', this.selectedJobType.id)
      } else {
        this.errors.push('job_type_id')
        this.errors.job_type_id = 'Job Type id field is required'
        swal('You must choose a Job Type for a Job')
        $(' .type .multiselect__tags').addClass('redborder')
        return 0
      }
      formData.append('title', this.job.title)
      if (this.job.location !== 'undefined') {
        formData.append('location', this.job.location)
      }
      formData.append('vacancies', this.job.vacancies)
      if (this.job.salary <= 0) {
        swal(' Job Salary must be greater than zero ')
        $('#salary').addClass('redborder')
        return 0
      }
      if (this.job.salary !== 'undefined') {
        formData.append('salary', this.job.salary)
      }
      if (this.job.description !== 'undefined') {
        formData.append('description', this.job.description)
      }
      if (this.job.requirements !== 'undefined') {
        formData.append('requirements', this.job.requirements)
      }
      this.postRequest(formData, this.$hostUrl + 'admin-dashboard/jobs', '/jobs')
    }
  }
}

</script>
<style scoped>
.add{
    background-color: #347A1E !important;
  color: #fff !important;
  font-size: 20px !important;
  font-weight :500 !important;
}
</style>
