<template>
  <CRow>
    <CCol col="12" xl="12">
      <CCard>
        <CCardHeader>
          <CCol col="6" style="font-size: 25px">Job Applications </CCol>
        </CCardHeader>
        <CCardBody>
          <div class="row">
            <div class="col-md-6">
              <h2 class="title">Job Details</h2>
              <div class="line"></div>
              <table class="table table-bordered" style="text-align: start">
                <tr>
                  <th>Job Title</th>
                  <td>{{ application.job.title }}</td>
                </tr>
                <tr>
                  <th>Job Category</th>
                  <td>{{ application.job.category.name }}</td>
                </tr>
                <tr>
                  <th>Job Employer</th>
                  <td>{{ application.job.employer.name }}</td>
                </tr>
                <tr>
                  <th>Job Location</th>
                  <td>{{ application.job.location }}</td>
                </tr>
              </table>
            </div>
            <div class="col-md-6">
              <h2 class="title">Employee Details</h2>
              <div class="line"></div>
              <table class="table table-bordered" style="text-align: start">
                <tr>
                  <th>Employee Name</th>
                  <td>
                    {{ application.employee.personal_detail.first_name }}
                    {{ application.employee.personal_detail.last_name }}
                  </td>
                </tr>
                <tr>
                  <th>Employee Gender</th>
                  <td>{{ application.employee.personal_detail.gender }}</td>
                </tr>
                <tr>
                  <th>Employee Phone Number</th>
                  <td>{{ application.employee.contact_detail.phone }}</td>
                </tr>
                <tr>
                  <th>Employee Email</th>
                  <td>{{ application.employee.email }}</td>
                </tr>
              </table>
            </div>
          </div>
          <CButton color="warning" @click="goBack">
            {{ $t("message.back") }}</CButton
          >
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
export default {
  name: 'ShowApplication',
  data () {
    return {
      application: []
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(
        `${this.$hostUrl}admin-dashboard/applied-jobs/${this.$route.params.id}`
      )
      .then((response) => {
        this.application = response.data.data
      })
  },
  methods: {
    goBack () {
      this.customersOpened
        ? this.$router.go(-1)
        : this.$router.push({ path: '/job-applications' })
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
