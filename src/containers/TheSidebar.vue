<template>
  <CSidebar id="sidbar"
  :class='$i18n.locale'
    fixed
    class="sky"
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand>
  <div class='stars'></div>
      <img  class="responsive" src="@/assets/logo2.jpg" >

    </CSidebarBrand>
    <CRenderFunction flat :content-to-render="$options.nav"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'

export default {
  name: 'TheSidebar',
  data () {
    return {
      companyName: 'SM Dashboard'
    }
  },
  created () {
  },
  nav,
  computed: {
    show () {
      return this.$store.state.sidebarShow
    },
    minimize () {
      return this.$store.state.sidebarMinimize
    }
  }
}
</script>
<style scoped>
/* #sidbar{
  background: #121416;
 align-content: right;
 color: #fff !important;
} */
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
.sky {
  position:fixed;
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
#sidbar li a:hover{
      background-color: #87CEFA !important;
}
.responsive{
  width:100% ;
  height: 160px;
  background: #4B79A1;
}

</style>
