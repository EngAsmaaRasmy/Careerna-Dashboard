
<template>
  <CRow>
    <CCol col="12" xl="12">
         <CCard class="cards">
        <CCardHeader>
          <CRow>
            <CCol style="font-size: 25px;" col="6">
              تفاصيل الأرباح  لمٌقدمي  الخدمات
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
// import swal from 'sweetalert'
import VdtnetTable from '../VdtnetTable.vue'
export default {
  name: 'payments',
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
          url: this.$hostUrl + 'admin-dashboard/service/provider/profist',
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
          label: "الرقم",
          sortable: true,
          searchable: true,
             defaultOrder: 'SORT_ASC '
        },
        name: {
          label: "  مٌدم الخدمة",
          isLocal: true,
          searchable: true,
             defaultOrder: 'SORT_ASC '
        },
         amount: {
          label: " الرِبح ",
          isLocal: true,
          searchable: true,
             defaultOrder: 'SORT_ASC '
        },
        created_at: {
          label: this.$t('message.date'),
          isLocal: true,
          searchable: true,
             defaultOrder: 'SORT_ASC '
        }
      },
      quickSearch: '',
      details: {}
    }
  },
  // methods: {
  //   doLoadTable (cb) {
  //     this.$http.getJSON(
  //       this.$hostUrl + 'reports/payments/customers-fanni',
  //       function (data) {
  //         cb(data.data)
  //       }
  //     )
  //   },
  //   doAfterReload (data, table) {
  //     console.log('data reloaded')
  //   },
  //   doCreating (comp, el) {
  //     console.log('creating')
  //   },
  //   doCreated (comp) {
  //     console.log('created')
  //   },
  //   doSearch () {
  //     this.$refs.table.search(this.quickSearch)
  //   },
  //   doExport (type) {
  //     const parms = this.$refs.table.getServerParams()
  //     parms.export = type
  //   },
  //   formatCode (zipcode) {
  //     return zipcode.split('-')[0]
  //   }
  // }
}
</script>
