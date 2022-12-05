<template>
<CRow>
  <CCol col="12" xl="12">
    <CCard>
      <CCardHeader>
        <CCol col="12" style="font-size: 25px;">  Show User Details   </CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row">
            <div class="col-md-6">
              <h2 class="title">Basic Information</h2>
              <div class="line"></div>
                <table class="table table-bordered" style="text-align:start ">
                  <tr>
                    <th> Employee Id   </th>
                    <td>{{ employee.id }}</td>
                  </tr>
                  <tr>
                    <th>  Employee Email </th>
                    <td>{{ employee.email }}</td>
                  </tr>
                  <tr>
                    <th> Employee CV   </th>
                    <td>
                      <a href="employee->cv_full_path" download>CV</a>
                    </td>
                  </tr>
                  <tr>
                    <th> Employee Education Level   </th>
                    <td>{{ educationLevel.name  }}</td>
                  </tr>
                </table>

              <h2 class="title">Career Details</h2>
               <div class="line"></div>
                <table class="table table-bordered" style="text-align:start ">
                  <tr v-if="employee.career_detail.salary ">
                    <th> Salary  </th>
                    <td>{{ employee.career_detail.salary   }}</td>
                  </tr>
                  <tr v-if="employee.career_detail.experience">
                    <th>  Experience </th>
                    <td v-if="employee.career_detail.experience == 1">No experience</td>
                    <td v-else-if="employee.career_detail.experience == 2">less than one  Year</td>
                    <td v-else-if="employee.career_detail.experience == 3">1 Year</td>
                    <td v-else-if="employee.career_detail.experience == 4">2 Year</td>
                    <td v-else-if="employee.career_detail.experience == 5">3 Year</td>
                    <td v-else-if="employee.career_detail.experience == 6">4 Year</td>
                    <td v-else-if="employee.career_detail.experience == 7">5 Year</td>
                    <td v-else-if="employee.career_detail.experience == 8">6 Year</td>
                    <td v-else-if="employee.career_detail.experience == 9">7 Year</td>
                    <td v-else-if="employee.career_detail.experience == 10">8 Year</td>
                    <td v-else-if="employee.career_detail.experience == 11">9 Year</td>
                    <td v-else-if="employee.career_detail.experience == 12">10 Year</td>
                    <td v-else-if="employee.career_detail.experience == 13">11 Year</td>
                    <td v-else-if="employee.career_detail.experience == 14">12 Year</td>
                    <td v-else-if="employee.career_detail.experience == 15">13 Year</td>
                    <td v-else-if="employee.career_detail.experience == 16">14 Year</td>
                    <td v-else-if="employee.career_detail.experience == 17">15 Year</td>
                    <td v-else-if="employee.career_detail.experience == 18">More than 15 Year</td>
                  </tr>
                  <tr v-if="jobType">
                    <th>  Job Type </th>
                    <td>{{ jobType}}</td>
                  </tr>
                  <tr>
                    <th>  Candidates Status </th>
                    <td v-if="employee.career_detail.candidates_status == 1">I am unemployed and desperate looking for a job</td>
                    <td v-else-if="employee.career_detail.candidates_status == 2">I am actively looking for new jobs and opportunities</td>
                    <td v-else-if="employee.career_detail.candidates_status == 3">I am happy where I am but don’t mind finding good opportunitie</td>
                    <td v-else-if="employee.career_detail.candidates_status == 4">I am only interested in very specific opportunities</td>
                    <td v-else-if="employee.career_detail.candidates_status == 5">I am not looking for a job</td>

                  </tr>
                  <tr v-if="careerLevel">
                    <th>  Career Level </th>
                    <td>{{ careerLevel }}</td>
                  </tr>
                   <tr v-if="employee.categories">
                    <th>  Categories </th>
                    <td>
                      <span class="badge badge-info mx-1"  v-for="category in employee.categories" :key="category.id">
                      {{ category.name}}  </span>{{ employee.categories.name }}</td>
                  </tr>
                  <tr v-if="employee.job_titles">
                    <th>  Job Titles </th>
                    <td><span class="badge badge-info mx-1"  v-for="jobTitle in employee.job_titles" :key="jobTitle.id">
                      {{ jobTitle.name}}  </span></td>
                  </tr>
                </table>
            </div>
            <div class="col-md-6">
              <h2 class="title">Personal Details</h2>
               <div class="line"></div>
                <table class="table table-bordered" style="text-align:start ">
                  <tr v-if="employee.personal_detail.first_name">
                    <th> Employee Name   </th>
                    <td>{{ employee.personal_detail.first_name }} {{ employee.personal_detail.last_name }}</td>
                  </tr>
                  <tr v-if="employee.personal_detail.gender">
                    <th>  Employee Gender </th>
                    <td> {{ employee.personal_detail.gender }}</td>
                  </tr>
                   <tr v-if="employee.personal_detail.data_of_birth">
                    <th> Employee Date Of Birth  </th>
                    <td>{{ employee.personal_detail.data_of_birth  }}</td>
                  </tr>
                   <tr v-if="country">
                    <th>  Employee Country </th>
                    <td> {{ country }}</td>
                  </tr>
                   <tr v-if="state">
                    <th>  Employee State </th>
                    <td> {{ state }}</td>
                  </tr>
                  <tr v-if="employee.contact_detail.phone">
                    <th> Employee Phone Number   </th>
                    <td>{{ employee.contact_detail.phone }}</td>
                  </tr>
                   <tr v-if="employee.contact_detail.another_phone">
                    <th> Employee Another Phone Number   </th>
                    <td>{{ employee.contact_detail.another_phone }}</td>
                  </tr>
                </table>
                <h2 class="title">Skills </h2>
               <div class="line"></div>
                <table class="table table-bordered">
                  <tr>
                    <th>Skill Name  </th>
                    <th>Proficiency</th>
                  </tr>
                   <tr v-for=" skill in employee.skills" :key="skill.id">
                    <td>{{ skill.skill_name }}</td>
                    <td>{{ skill.proficiency }}</td>
                  </tr>
                </table>
                <h2 class="title">Languages </h2>
               <div class="line"></div>
                <table class="table table-bordered">
                  <tr>
                    <th>Language Name  </th>
                    <th>Proficiency</th>
                  </tr>
                   <tr v-for=" language in employee.languages" :key="language.id">
                    <td>{{ language.language_name }}</td>
                    <td>{{ language.proficiency }}</td>
                  </tr>
                </table>
            </div>
        </div>
          <br>
          <div class="row">
               <div class="col-md-8 m-auto">
               <h2 class="title">Education Details </h2>
               <div class="line"></div>
                <table class="table table-bordered">
                  <tr>
                    <th>Education Level</th>
                    <th>University  </th>
                    <th>Field of Study </th>
                    <th>Degree</th>
                    <th>Start Year</th>
                    <th>End Year</th>
                  </tr>
                   <tr v-for="educationDetail in employee.education_detail" :key="educationDetail.id">
                    <td v-if="educationDetail.education_level_id = '1' "> Bachelor's Degree</td>
                    <td v-else-if="educationDetail.education_level_id = '2' "> Master Degree</td>
                    <td v-else-if="educationDetail.education_level_id = '3' "> Doctorate Degree</td>
                    <td v-else></td>
                    <td>{{ educationDetail.university }}</td>
                    <td>{{ educationDetail.field_of_study }}</td>
                    <td>{{ educationDetail.degree }}</td>
                    <td>{{ educationDetail.start_year }}</td>
                    <td>{{ educationDetail.end_year }}</td>
                  </tr>
                </table>
              </div>

          </div>
          <div class="row">
               <div class="col-md-8 m-auto">
               <h2 class="title">Experience Details </h2>
               <div class="line"></div>
                <table class="table table-bordered">
                  <tr>
                    <th>Job Title  </th>
                    <th>Compony Name </th>
                    <th>Start Duration</th>
                    <th>End  Duration</th>
                  </tr>
                   <tr v-for=" experienceDetail in employee.experience_detail" :key="experienceDetail.id">
                    <td>{{ experienceDetail.job_title }}</td>
                    <td>{{ experienceDetail.company_name }}</td>
                    <td>{{ experienceDetail.start_month }}, {{ experienceDetail.start_year }} </td>
                    <td>{{ experienceDetail.end_month }}, {{ experienceDetail.end_year }} </td>
                  </tr>
                </table>
              </div>

          </div>
          <br>
        <CButton color="warning" @click="goBack"> {{ $t('message.back')}}</CButton>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
</template>

<script>
export default {
  name: 'ShowEmployee',
  data () {
    return {
      employee: [],
      educationLevel: '',
      country: '',
      state: '',
      careerLevel: '',
      jobType: ''
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/employees/${this.$route.params.id}`)
      .then((response) => {
        this.employee = response.data.data.employee
        this.educationLevel = response.data.data.educationLevel
        this.country = response.data.data.country.name
        this.state = response.data.data.state.name
        this.careerLevel = response.data.data.careerLevel.name
        this.jobType = response.data.data.jobType.name
      })
  },
  methods: {
    goBack () {
      this.$router.push({ path: '/employees' })
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
