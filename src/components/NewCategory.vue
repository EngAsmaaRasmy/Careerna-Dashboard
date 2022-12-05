<template>
  <div>
    <CRow>
      <CCol col="12">
           <CCard class="cards">
          <form id="createCategory" @submit="createCategory" >
          <CCardBody>
            <CRow>
                <CCol sm="12">
                <CInput label=" Category Name"
                  id="name"
                  v-model="category.name"
                   pattern="[a-zA-Z'-'\s]*"
                   oninvalid="setCustomValidity('invalid input')"
                  type = "text"
                  class="required"
                  placeholder="Category Name "
                  :invalidFeedback="errors.name"
                  required
                />
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/>  {{ $t('message.save') }}</CButton>
              &emsp;
            <CButton type="reset" size="sm" color="danger">
            <CIcon name="cil-ban"/>  {{ $t('message.clear') }} </CButton>
          </CCardFooter>
          </form>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  name: 'CreateCategory',
  data: function () {
    return {
      category: {},
      errors: []
    }
  },
  methods: {
    createCategory: function (e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', this.category.name)
      this.postRequest(formData, `${this.$hostUrl}admin-dashboard/categories`, '/categories')
    }
  }
}
</script>
