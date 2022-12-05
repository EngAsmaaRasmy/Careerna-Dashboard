<template>
  <CRow>
    <CCol sm='6' lg='6'>
      <CWidgetProgressIcon
         class="widget1"
        :header='employees'
        text="Number of Users "
        inverse
      >
     <CIcon name='cil-speedometer' height='45'/>
      </CWidgetProgressIcon>
    </CCol>
    <CCol sm='6' lg='6'>
      <CWidgetProgressIcon
       class="widget2"
        :header='employers'
        text="  Number of Employers "
        inverse
      >
      <CIcon name='cil-basket' height='45'/>
      </CWidgetProgressIcon>
       </CCol>
    <CCol sm='6' lg='6'>
      <CWidgetProgressIcon
       class="widget3"
        :header='jobs'
        text=" Number of Jobs "
        inverse
      >
        <CIcon name='cil-chartPie' height='45'/>
      </CWidgetProgressIcon>
    </CCol>
    <CCol sm='6' lg='6'>
      <CWidgetProgressIcon
       class="widget4"
        :header='jobApplications'
        text=" Number of job applications  "
        inverse
      >
        <CIcon name='cil-chartPie' height='45'/>
      </CWidgetProgressIcon>
    </CCol>
  </CROW>
</template>

<script>

export default {
  name: 'Widgets',
  data () {
    return {
      employees: '0',
      employers: '0',
      jobs: '0',
      jobApplications: '0'
    }
  },
  created () {
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/statistics`)
      .then((response) => {
        this.employees = response.data.data.employees.toString()
        this.employers = response.data.data.employers.toString()
        this.jobs = response.data.data.jobs.toString()
        this.jobApplications = response.data.data.job_applications.toString()
      })
  }
}
</script>
<style>
  .widget1,.widget2 ,.widget3 ,.widget4
{
  color: #fff !important;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  border-radius: 40px;
background-image: linear-gradient( 85.4deg, rgba(102,152,255,0.66) 29.8%, rgba(115,106,255,1) 98.3% );

  }
</style>
