<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <CCardHeader>
        <CCol col="12" style="font-size: 25px;"> Show an Employer data</CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-bordered">
                  <tr>
                    <th> Full Name </th>
                    <td>{{ employer.first_name }} {{ employer.last_name }}</td>
                  </tr>
                  <tr>
                    <th>Compony Name </th>
                    <td>{{ employer.title }}</td>
                  </tr>
                   <tr>
                    <th>Email </th>
                    <td>{{ employer.email }}</td>
                  </tr>
                  <tr >
                      <th> Phone</th>
                      <td>{{ employer.phone }}</td>
                    </tr>
                     <tr>
                      <th>  Employer Size</th>
                      <td>{{ employer.employer_size }}</td>
                    </tr>
                     <tr>
                      <th>  Country</th>
                      <td>{{ country }}</td>
                    </tr>
                     <tr>
                      <th> Logo</th>
                      <td><img :src="employer.logo_full_path" height="100px" width="100px" style=" border-radius: 50%;"/></td>
                    </tr>
                     <tr>
                      <th>  Description</th>
                      <td  v-if="employer.description  != '<p>undefined</p>'">{{ employer.description  | stripHTML }}</td>
                    </tr>
                </table>
            </div>
               <div class="col-md-6">
               <h2 class="title">Jobs offered by the Employers</h2>
               <div class="line"></div>
                <table class="table table-bordered">
                  <tr>
                    <th>Job  </th>
                    <th>Show </th>
                  </tr>
                   <tr v-for=" job in employer.jobs" :key="job.id">
                    <td>{{ job.title }}</td>
                    <td><CButton color="primary" @click="show(job)" data-action="show">show</CButton></td>
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
  name: 'ShowEmployer',
  data () {
    return {
      employer: [],
      country: ''
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/employers/${this.$route.params.id}`)
      .then((response) => {
        this.employer = response.data.data.employer
        this.country = response.data.data.country.name
      })
  },
  methods: {
    goBack () {
      this.servicesOpened ? this.$router.go(-1) : this.$router.push({ path: '/employers' })
    },
    show (job) {
      console.log(job.id)
      this.$router.push({ path: `/jobs/${job.id}/show`, params: { id: job.id } })
    }
  }
}
</script>
<style scoped>
  th {
    background-color: rgb(0, 85, 217);
    color: #f5f3f3;
  }
</style>
