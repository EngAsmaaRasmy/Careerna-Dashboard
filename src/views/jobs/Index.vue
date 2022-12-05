
<template>
  <CRow>
    <CCol col="12" xl="12">
         <CCard class="cards">
        <CCardHeader>
          <CRow>
            <CCol style="font-size: 25px;" col="6">
                Jobs
            </CCol>
            <CCol col="6" style="text-align: right;">
                <CButton  to="/jobs/create" class="add">
                    <CIcon class="c-icon" name="cil-chevron-top" /> &emsp;  Add New Job
                </CButton>
            </CCol>
        </CRow>
        </CCardHeader>
        <CCardBody>
          <!-- Using the VdtnetTable component -->
          <vdtnet-table
            ref="table"
            :fields="fields"
            :opts="options"
            @edit="doAlertEdit"
            @show="doAlertShow"
            @approve ="doAlertApprove"
            @close ="doAlertClose"
            @delete="doAlertDelete"
            @reloaded="doAfterReload"
            @table-creating="doCreating"
            @table-created="doCreated"
          >
          </vdtnet-table>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import swal from 'sweetalert'
import VdtnetTable from '../VdtnetTable.vue'
import jquery from 'jquery'
export default {
  name: 'jobs',
  components: { VdtnetTable },
  data () {
    return {
      options: {
        ajax: {
          beforeSend: function (xhr) {
            xhr.setRequestHeader(
              'Authorization',
              'Bearer ' + localStorage.token
            )
          },
          url: this.$hostUrl + 'admin-dashboard/jobs',
          dataSrc: (json) => {
            return json.data
          }
        },
        buttons: [
          {
            extend: 'print',
            text: this.$t('message.print'),
            titleAttr: '',
            className: 'print',
            exportOptions: {
              columns: 'th:not(:last-child)'
            }
          },
          {
            extend: 'copy',
            text: this.$t('message.copy'),
            className: 'copy',
            titleAttr: ''
          },
          {
            extend: 'excel',
            text: '',
            titleAttr: 'إكسل',
            className: 'fa fa-table btn-success',
            exportOptions: {
              columns: ':visible(:not(.not-export-col))'
            }
          }
        ],
        dom:
          "<'row'<'col-sm-6 col-md-6'f><'col-sm-6 col-md-6 added'l>>" +
          "<'row'<'col-sm-12'Btr>>" +
          "<'row'<'col-sm-12 col-md-5'p><'col-sm-12 col-md-7'i>>",
        paging: true,
        language: {
          url: this.$t('message.url')
        },
        responsive: false,
        processing: true,
        searching: true,
        searchDelay: 1500,
        destroy: true,
        ordering: true,
        lengthChange: true,
        serverSide: false,
        fixedHeader: true,
        saveState: true,
        select: {
          style: 'multi'
        }
      },
      fields: {
        id: {
          label: 'Job Id',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        title: {
          label: ' Job Title',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        approve: {
          label: ' Job Approval',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        close: {
          label: ' Close Job',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        employer: {
          label: ' Employer',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        type: {
          label: ' Created By',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        created_at: {
          label: this.$t('message.date'),
          isLocal: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        actions: {
          isLocal: true,
          label: this.$t('message.operation'),
          defaultContent: '<button href="javascript:void(0);" data-action="show" class="btn btn-info btn-sm" title="عرض الطلب"><i class="mdi mdi-square-show-outline"></i>' + this.$t('message.show') + ' </button>' +
            '&ensp;<button href="javascript:void(0);" data-action="edit" class="btn btn-dark btn-sm"><i class="mdi mdi-square-edit-outline"></i>' + this.$t('message.update') + ' </button>'
        }
      },
      quickSearch: '',
      details: {}
    }
  },
  methods: {
    doLoadTable (cb) {
      this.$http.getJSON(
        this.$hostUrl + 'admin-dashboard/jobs',
        function (data) {
          cb(data.data)
        }
      )
    },
    doAlertShow (data) {
      this.$router.push({ path: `jobs/${data.id}/show`, params: { id: data.id } })
    },
    doAlertEdit (data) {
      this.$router.push({
        path: `/jobs/${data.id}/edit`,
        params: { id: data.id }
      })
    },
    doAlertDelete (data, row, tr, target) {
      console.log(`deleting item ID: ${data.id}`)

      swal({
        title: 'Are you sure ?',
        text: 'Once deleted, you will not be able to recover this item !',
        icon: 'warning',
        buttons: ['No', 'Yes'],
        dangerMode: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((willDelete) => {
        if (willDelete) {
          this.$http
            .delete(
              `${this.$hostUrl}admin-dashboard/jobs/${data.id}`,
              { _method: 'delete' }
            )
            .then((response) => {
              console.log(response)
              localStorage.services = Number(localStorage.services) - 1
              jquery('#services_badge').text(localStorage.services)
              swal({ title: response.data.message, buttons: 'Done' })
            })
          tr.remove()
          const table = this.$refs.table
          setTimeout(() => {
            table.reload()
          }, 1500)
        } else {
          swal({ title: ' Delete has been cancelled !', buttons: 'Done' })
        }
      })
    },
    doAlertApprove (data, row, tr, target) {
      console.log(`deleting item ID: ${data.id}`)

      swal({
        title: 'Jop Approval',
        text: 'Are you sure you agree to this job?',
        icon: 'warning',
        buttons: ['No', 'Yes'],
        dangerMode: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((willDelete) => {
        if (willDelete) {
          this.$http
            .get(
              `${this.$hostUrl}admin-dashboard/job/${data.id}/approve`
            )
            .then((response) => {
              console.log(response)
              swal({ title: response.data.message, buttons: 'Done' })
            })
          const table = this.$refs.table
          setTimeout(() => {
            table.reload()
          }, 1500)
        } else {
          swal({ title: ' Approve has been cancelled !', buttons: 'Done' })
        }
      })
    },
    doAlertClose (data, row, tr, target) {
      console.log(`deleting item ID: ${data.id}`)

      swal({
        title: 'job availability',
        text: 'Are you sure you want to close this job?',
        icon: 'warning',
        buttons: ['No', 'Yes'],
        dangerMode: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((willDelete) => {
        if (willDelete) {
          this.$http
            .get(
              `${this.$hostUrl}admin-dashboard/job/${data.id}/close`
            )
            .then((response) => {
              console.log(response)
              swal({ title: response.data.message, buttons: 'Done' })
            })
          const table = this.$refs.table
          setTimeout(() => {
            table.reload()
          }, 1500)
        } else {
          swal({ title: ' Closed has been cancelled !', buttons: 'Done' })
        }
      })
    },
    doAfterReload (data, table) {
      console.log('data reloaded')
    },
    doCreating (comp, el) {
      console.log('creating')
    },
    doCreated (comp) {
      console.log('created')
    },
    doSearch () {
      this.$refs.table.search(this.quickSearch)
    },
    doExport (type) {
      const parms = this.$refs.table.getServerParams()
      parms.export = type
    },
    formatCode (zipcode) {
      return zipcode.split('-')[0]
    }
  }
}
</script>
