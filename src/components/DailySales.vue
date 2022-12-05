
<template>
  <CRow>
    <CCol col="12" xl="12">
         <CCard class="cards">
        <CCardHeader>
          <CRow class="mb-3">
            <CCol style="font-size: 25px;" col="12">
             {{$t('message.dayily_inventory_reports')}}
            </CCol>
        </CRow>
         <CRow>
            <CCol style="font-size: 25px;" col="3">
                <input type="date" name="start_date">
            </CCol>
             <CCol style="font-size: 25px;" col="3">
                <input type="date" name="end_date">
            </CCol>
             <CCol style="font-size: 25px;" col="3">
                <input type="date" name="start_date">
            </CCol>
        </CRow>
        </CCardHeader>
        <CCardBody>
           
          <!-- Using the VdtnetTable component -->
          <vdtnet-table
            ref="table"
            :fields="fields"
            :opts="options"
           
          >
          </vdtnet-table>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import VdtnetTable from '@/views/VdtnetTable.vue'
export default {
  name: 'InventoryReports',
  components: { VdtnetTable},
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
          
          url: this.postRequest(formData, this.$hostUrl + 'admin-dashboard/customers', ''),
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
            text: this.$t('message.excel'),
            titleAttr: 'excel',
            className: 'fa fa-table btn-success excel',
            exportOptions: {
              columns: 'th:not(:last-child)'
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
        searching: false,
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
          label: this.$t('message.payment_id'),
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        // amount: {
        //   label: this.$t('message.amount'),
        //   sortable: false,
        //   isLocal: true,
        //   searchable: true,
        //   defaultOrder: 'SORT_ASC '
        // },
        // worker_name: {
        //   label: this.$t('message.worker_name'),
        //   sortable: false,
        //   searchable: true,
        //   defaultOrder: 'SORT_ASC '
        // },
        created_at: {
          label: this.$t('message.date'),
          sortable: false,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        }
      },
      quickSearch: '',
      details: {}
    }
  },
  methods: {
    doLoadTable (cb) {
    // this.postRequest(formData, this.$hostUrl + 'admin-dashboard/customers', '/customers')
      this.postRequest(
        formData,
        this.$hostUrl + 'admin-dashboard/report/sales',
        function (data) {
          cb(data.data)
        }
      )
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
