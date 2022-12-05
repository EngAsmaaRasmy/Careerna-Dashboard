<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <CCardHeader>
        <CCol col="12" style="font-size: 25px;"> Show an Job data</CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row">
            <div class="col-md-10">
                <table class="table table-bordered" style="text-align:start ">
                  <tr>
                    <th> Title </th>
                    <td>{{ job.title }} </td>
                  </tr>
                  <tr>
                    <th>Location </th>
                    <td v-if="job.location != 'undefined'">{{ job.location }}</td>
                  </tr>
                   <tr>
                    <th>Vacancies </th>
                    <td >{{ job.vacancies }}</td>
                  </tr>
                     <tr>
                      <th>  Salary</th>
                      <td>{{ job.salary }}</td>
                    </tr>
                     <tr>
                      <th>  Requirements </th>
                      <td v-if="job.requirements  != '<p>undefined</p>'">{{ job.requirements | stripHTML  }}</td>
                      <td v-else></td>
                    </tr>
                     <tr>
                      <th>  Description </th>
                      <td v-if="job.description  != '<p>undefined</p>'">{{ job.description | stripHTML  }}</td>
                      <td v-else></td>
                    </tr>
                     <tr>
                      <th> Category </th>
                      <td>{{ job.category.name }}</td>
                    </tr>
                     <tr v-if="job.employer.name">
                      <th>  Employer </th>
                      <td>{{ job.employer.name }}</td>
                    </tr>
                     <tr>
                      <th>  Career Level </th>
                      <td>{{ job.career_level.name }}</td>
                    </tr>
                    <tr>
                      <th>  job Type </th>
                      <td>{{ job.job_type.name }}</td>
                    </tr>
                </table>
            </div>
        </div>
        <CButton color="warning" @click="goBack">{{ $t('message.back')}}</CButton>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
</template>

<script>
export default {
  name: 'ShowJob',
  data () {
    return {
      job: []
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/jobs/${this.$route.params.id}`)
      .then((response) => {
        this.job = response.data.data.job
      })
  },
  methods: {
    goBack () {
      this.servicesOpened ? this.$router.go(-1) : this.$router.push({ path: '/jobs' })
    }
  }
}
</script>
<style scoped>
   th {
    background-color: #093adc;
    color: #f5f3f3;
  }
</style>
