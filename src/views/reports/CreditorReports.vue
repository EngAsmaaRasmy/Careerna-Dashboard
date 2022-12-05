
<template>
  <CRow>
    <CCol col="12" xl="12">
         <CCard class="cards">
        <CCardHeader>
          <CRow>
            <CCol style="font-size: 25px;" col="12">
              تفاصيل المبالغ المٌستحقة للدائنين
            </CCol>
        </CRow>
        <hr>
         <form  @submit.prevent="getFormValues" >
        <CRow class="mt-2">
              <CCol col= "5">
              <label class="filter-title">تاريخ البداية </label>
               <input type= "date" v-model="startDate" class="filter">
              </CCol>
              <div class="col-md-5">
              <label class="filter-title" >تاريخ النهاية </label>
            <input type= "date" v-model="endDate" class="filter">
            </div>
            <Ccol col="2">
             <button class="sub">تصفية</button>
             </Ccol>
        </CRow>
        </form>
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
            @reloaded="getFormValues"
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
  name: 'creditor',
  components: { VdtnetTable },
  data () {
    return {
       startDate : null,
      endDate : null,
      options: {
        ajax: {
          beforeSend: function (xhr) {
            xhr.setRequestHeader(
              'Authorization',
              'Bearer ' + localStorage.token
            )
          },
          url: this.$hostUrl + 'admin-dashboard/creditors-list',
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
          label: "الدائن",
          isLocal: true,
          searchable: true,
             defaultOrder: 'SORT_ASC '
        },
        amount: {
          label: "المبلغ المٌستحق",
          isLocal: true,
          searchable: true,
             defaultOrder: 'SORT_ASC '
        },
         description: {
          label: " الوصف",
          isLocal: true,
          searchable: true,
             defaultOrder: 'SORT_ASC '
        },
         blance: {
          label: " الرصيد",
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
  methods: {
      getFormValues:function (){
                    axios
                        .get(`http://178.79.181.70:8005/api/admin-dashboard/report/transaction/bank` , { params: { "start_date": this.startDate, "end_date": this.endDate  }})
                        .then((response) =>{
                          const table = this.$refs.table
                          this.table = response.data.data
                          console.log(this.table)
                        })
    },
    doLoadTable (cb) {
      this.$http.getJSON(
        this.$hostUrl + 'admin-dashboard/report/creditor/amount',
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
