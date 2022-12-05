
<template>
  <CRow>
    <CCol col="12" xl="12">
         <CCard class="cards">
        <CCardHeader>
          <CRow>
            <CCol style="font-size: 25px;" col="8">
            تفاصيل المبالغ الصادرة من الخزنة
            </CCol>
             <CCol style="font-size: 25px;" col="4">
             الرصيد  في الخزنة : {{balance}}
            </CCol>
        </CRow>
        <hr>
         <!-- <form  @submit.prevent="getFormValues" > -->
        <CRow class="mt-2">
              <CCol col= "5">
              <label class="filter-title">تاريخ البداية </label>
               <input type= "date" v-model="startDate" class="filter">
              </CCol>
              <div class="col-md-5">
              <label class="filter-title" >تاريخ النهاية </label>
            <input type= "date" v-model="endDate" class="filter">
            </div>
            <!-- <Ccol col="2">
             <button class="sub">تصفية</button>
             </Ccol> -->
        </CRow>
        <!-- </form> -->
        </CCardHeader>
        <CCardBody>
          <!-- Using the VdtnetTable component -->
          <vdtnet-table
            ref="table"
            :fields="fields"
            :opts="options"
            @reloaded="doAfterReload"
          >
          </vdtnet-table>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import VdtnetTable from '../VdtnetTable.vue'
import axios from 'axios'
export default {
  name: 'safe',
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
          url: (`http://178.79.181.70:8005/api/admin-dashboard/report/transaction/safe`),
          dataSrc: (json) => {
            return json[0].original.data
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
          label: 'رقم العملية',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        amount: {
          label: "المبلغ",
          sortable: false,
          isLocal: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        from_account: {
          label: "  من",
          sortable: false,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
         to_account: {
          label: "  إلي",
          sortable: false,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
         description: {
          label: "  الوصف",
          sortable: false,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        created_at: {
          label: "تاريخ التحويل",
          sortable: false,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        }
      },
      quickSearch: '',
      details: {},
      balance: []

    }
  },
     created () {
       this.$http
      .get(`${this.$hostUrl}admin-dashboard/report/transaction/safe`)
      .then((response) => {
         this.balance = response.data.blance_safe
      })
  },
  methods: {
      getFormValues:function (){
                    axios
                        .get(`http://178.79.181.70:8005/api/admin-dashboard/report/transaction/safe` , { params: { "start_date": this.startDate, "end_date": this.endDate  }})
                        .then((response) => {
                          this.$refs.table.options.ajax.dataSrc= response.data[0].original.data
                          console.log('asmaa')
                          console.log(this.$refs.table.options.ajax.dataSrc)
                        })
    },
    doLoadTable (cb) {
      this.$http.getJSON(
        this.$hostUrl + 'admin-dashboard/report/transaction/safe',
        function (data) {
          cb(data.data)
        }
      )
      console.log('sadfghjugfds')
    },
    doAfterReload (data, table) {
      axios
                        .get(`http://178.79.181.70:8005/api/admin-dashboard/report/transaction/safe` , { params: { "start_date": this.startDate, "end_date": this.endDate  }})
                        .then((response) => {
                          this.$refs.table.options.ajax.dataSrc= response.data[0].original.data
                          console.log('lkjhgfchjkl;lkjhbg')
                          console.log(this.$refs.table.options.ajax.dataSrc)
                        })
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
