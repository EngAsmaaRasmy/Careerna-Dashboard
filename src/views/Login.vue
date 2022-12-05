<template>

 <section class="vh-100 sky">
  <div class='stars'></div>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-7 col-xl-7">
        <div class="card bg-dark text-white" style="border-radius: 1rem; background-color: transparent!important; border-color:  #fff; font-size: 18px;">
          <div class="card-body p-5 text-center">
             <CForm @submit.prevent='UserLogin'>
            <div class="mb-md-5 mt-md-4 pb-5">

              <h2 class="fw-bold mb-2 text-uppercase"> LOGIN</h2>
              <p class="text-white-50 mb-5">  Please enter your email and password   </p>

              <div class="form-outline form-white mb-4">
                <label class="form-label" style="font-size: 22px;"  for="typeEmailX"> E-mail</label>
                 <input type="email" id="email" class="form-control form-control-lg"  v-model='user.email'/>
              </div>

              <div class="form-outline form-white mb-3">
                <label class="form-label" style="font-size: 22px;" for="typePasswordX"> Password</label>
                 <input type="password" id="password" class="form-control form-control-lg" v-model='user.password'/>
              </div>
              <button class="btn btn-outline-light btn-lg  login" type="submit"> LOGIN</button>
            </div>
         </CForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'Login',
  data () {
    return {
      user: [],
      permissions: []
    }
  },
  methods: {
    UserLogin: function () {
      const formData = new FormData()
      formData.append('email', this.user.email)
      formData.append('password', this.user.password)
      this.$http.post(`${this.$hostUrl}admin-dashboard/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          if (!response.data.error) {
            localStorage.token = response.data.data.token
            this.$router.push({ path: '/dashboard' })
            const permissions = response.data.data.role.permissions
            const permissionsList = []
            permissions.forEach(function (permission) {
              const perm = permission.route
              console.log('per', permission.route)
              if (perm) { permissionsList.push(perm) }
            })
            localStorage.permissionsList = permissionsList
          } else {
            swal({ title: response.data.message, buttons: 'Done' })
          }
        })
        .catch(function (error) {
          if (Object.prototype.hasOwnProperty.call(error, 'response')) {
            const data = (error.response || {}).data
            if (data.error) {
              swal({ title: data.message, buttons: 'Done' })
            } else {
              swal({
                title: 'An error occurred while processing the request, please try again later',
                buttons: 'Done'
              })
            }
          } else {
            swal({
              title: ' You are logged in successfully  ',
              buttons: 'Done'
            })
          }
        })
    }
  }
}
</script>
<style scoped>
.sky {
  position:absolute;
  width:100%;
  background: #4B79A1;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #283E51, #0A2342);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #283E51, #0A2342); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: -olinear-gradient(to top, #283E51, #0A2342);
  height: 100vh;
}

.stars {
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  width:100%;
  height:100%;
  display:block;
  background:url(http://www.script-tutorials.com/demos/360/images/stars.png) repeat top center;
  z-index:0;
}
.form-outline.form-white .form-control {
    color: #fff;
    background-color: inherit;
}
.login{
  padding: 10px 50px;
  margin-top: 10px;
}
.login:hover{
   background-color: #fff!important;
   border-color:#0A2342 !important;
   color:#0A2342 !important;
}
.form-outline .form-control {
  padding : 1.5rem;
}
</style>
