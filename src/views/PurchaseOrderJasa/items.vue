<template>
  <v-col cols='12' md='12'>
    <v-toolbar flat dark dense outlined color="white" class="elevation-5">
        <v-dialog v-model="dialog" max-width='1000px' persistent>
            <template v-slot:activator="{on,attrs}">
                <v-btn dark class="mx-n2" color='blue darken-4' v-bind="attrs" v-on="on">
                    <v-icon>mdi-plus</v-icon>Tambah
                </v-btn>
            </template>
            <v-card>
                <v-toolbar dark outline color='blue darken-4'>
                    <v-card-title>
                        <span class="headline">{{formTitleItems}}</span>
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn
                        dark
                        text
                        fab
                        small
                        @click="closeDialogPilihItems">
                        <v-icon class="mx-1">mdi-window-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-col cols='12' md='12'>
                    <v-card>
                        <ejs-grid
                        id="Grid"
                        ref='ggs' 
                        :dataSource="dataPerkiraan" height='200' width='100%'
                        :allowReordering = true
                        :selectionSettings='selectionOptions'
                        :allowResizing='true'
                        :allowPaging='true'
                        :toolbar="toolbarOptions"
                        :pageSettings='pageSettings'
                        :rowSelected="rowSelectedPerkiraan"
                        >
                            <e-columns>
                                <e-column
                                    field='Kode' 
                                    headerText='Kode' 
                                    textAlign='Left'
                                    width=180
                                ></e-column>

                                <e-column
                                    field='Nama' 
                                    headerText='Nama' 
                                    textAlign='Left'
                                    width=180
                                ></e-column>

                                <!-- <e-column
                                    field='GrupPekerjaan' 
                                    headerText='GrupPekerjaan' 
                                    textAlign='Left'
                                    width=180
                                ></e-column>

                                <e-column
                                    field='GrupKendaraan' 
                                    headerText='GrupKendaraan' 
                                    textAlign='Left'
                                    width=180
                                ></e-column>
                                
                                <e-column
                                    field='HargaJualDefault' 
                                    headerText='HargaJualDefault' 
                                    textAlign='Left'
                                    width=180
                                ></e-column> -->
                            </e-columns>
                        </ejs-grid>
                    </v-card>
                </v-col>
                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    dark
                    color="blue darken-4"
                    @click="accjasa">
                    <v-icon class="mr-1">mdi-content-save</v-icon>Simpan
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-toolbar>
    <v-card color="grey lighten-3" class="pa-2 rounded-lg elevation-0">
      <ejs-grid
          :dataSource="items" height='200' width='100%' gridLines='Both'
          :allowReordering = true
          :editSettings='editSettings'
          :allowSorting='true'
          :allowResizing='true'
          :allowPaging='true'
          :pageSettings='pageSettings'
          :recordDoubleClick="onDoubleClick"
          @actionComplete="onActionComplete"
      >
          <e-columns>
              <e-column 
              fieldText=''
              field='Perkiraan'
              :edit='dropDownPerkiraan'
              headerText='Perkiraan' 
              textAlign='Left'
              width=260
              >
              </e-column>

              <e-column
              field='JenisPekerjaan'
              headerText='Jenis Pekerjaan'
              width=240
              :allowEditing= 'false'
              >
              </e-column>
            
            <e-column
            field='NoUrut'
            headerText='NoUrut'
            :allowEditing= 'false'
            width=170
            :visible=false
            :isPrimaryKey="true"
            >
            </e-column>

              <e-column
              field='Keterangan'
              headerText='Keterangan'
              width=300
              >
              </e-column>
              <e-column
                field='Jumlah'
                headerText='Jumlah'
                editType= 'numericedit' 
                width=170
                :validationRules="JumlahRules" 
                type="number" 
                format="N"
              >
              </e-column>
              <e-column
              field='Harga'
              type="number" 
              format="N"
              headerText='Harga'
              width=170
              editType= 'numericedit' 
              >
              </e-column>
              <e-column
              editType= 'numericedit' 
              field='Diskon'
              headerText='Diskon'
              width=170
              >
              </e-column>
              <e-column
              type="number" 
              format="N"
              :allowEditing= 'false'
              field='SubTotal'
              textAlign='Right'
              headerText='SubTotal'
              width=170
              >
              </e-column>
          </e-columns>
          <e-aggregates>
              <e-aggregate>
                  <e-columns>
                  <e-column type="Sum" format="N" field="SubTotal"  ></e-column>
                  <e-column type="Count" field="JenisPekerjaan"  ></e-column>
                  </e-columns>
              </e-aggregate>
          </e-aggregates>
      </ejs-grid>
    </v-card>
  </v-col>
</template>

<script>
import Vue from 'vue'
import api from '@/services/http'
import { GridPlugin, Toolbar, Page, Aggregate, Resize, Filter, Sort, Group, Edit, CommandColumn, Reorder } from "@syncfusion/ej2-vue-grids";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
let elementPerkiraan,perkiraanObj
Vue.use(GridPlugin)
export default {
    props:{
        loadRwl:Array,
        title: String,
        itemsJasa:Array
    },
    data(){
        return{
            JumlahRules: { required: true, min: 1, 
            // max:  [this.customValidationFn,'Tidak Boleh Lebih dari Permintaan saat RWL'] 
            },
            dropDownPerkiraan:{
                create: () => {
					elementPerkiraan = document.createElement('input');
					return elementPerkiraan;
				},
				read: () => {
					return perkiraanObj.text;
				},
				destroy: () => {
					perkiraanObj.destroy();
				},
                write: (w) => {
					if (w.rowData.Perkiraan != null || w.rowData.Perkiraan != '') {
						perkiraanObj = new DropDownList({
							dataSource: this.dataPerkiraan,
						fields: { value: 'Kode', text: 'Nama' },
							value: w.rowData.Kode,
							text: w.rowData.Nama,
						change: (d) => {
							console.log('d gada isi',d)
						},
						placeholder: 'Select a Perkiraan',
						floatLabelType: 'Never'
						});
					} else {
						perkiraanObj = new DropDownList({
							dataSource: this.dataPerkiraan,
						fields: { value: 'Kode', text: 'Nama' },
						value: w.rowData.Kode,
							text: w.rowData.Nama,
						change: (d) => {
							console.log('d',d)
						},
						placeholder: 'Select a Perkiraan',
						floatLabelType: 'Never'
						});
					}
                    perkiraanObj.appendTo(elementPerkiraan);
				},
            },
            items:[],
            TotalBayar: '',
            dialog:false,
            DPp:'',
            PPn:'',
            toolbarOptions: ['Search'],
            setFocus:'',
            dataPekerjaan:[],
            dataPerkiraan:[],
            storeSelect: [],
            hapus_items:[],
            token : localStorage.getItem('token'),
            groupSettings: { allowReordering: true },
            selectionOptions: { type: 'Multiple'},
            pageSettings: {pageSizes: ['5','10','20','50']},
            editSettings: { showDeleteConfirmDialog: true, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal'},
            editSettingsSelect: { showDeleteConfirmDialog: false, allowEditing: false, allowAdding: false, allowDeleting: false, mode: 'Normal'},
        }
    },
    provide:{
        grid: [Page, Toolbar, Aggregate, Resize, Filter, Sort, Group, Edit, CommandColumn, Reorder]
    },
    mounted(){
        this.getDataPerkiraan()
        // this.getDataPekerjaan()
    },
    computed:{
        formTitleItems(){
            return this.editedIndex === -1 ? "Tambah Perkiraan" : "Pilih Perkiraan"
        }
    },
    watch:{
        // dataPekerjaan
        dataPerkiraan(val){
            this.$emit('dataPerkiraan',val)
        },
        dataPekerjaan(val){
            this.$emit('dataPekerjaan',val)
        },
        title(ket){
            if (ket == 'Kosongkan') {
                this.items = []
                this.hapus_items = []
                this.items = [...this.items]
            }
            if (ket == 'Ubah') {
                this.JumlahRules.max[1] = 'Tidak Boleh Lebih dari Permintaan saat RWL / Tidak Boleh Kurang dari receive pembelian'
            }
        },
        items(val){
            this.$emit('itemsPoJasa',val)
        },
        loadRwl(val){
            this.items = val.map(v => {
                v.JenisPekerjaan = v.Nama
                v.Jumlah = parseInt(v.Jumlah)
                v.Diskon = v.Diskon1 == '.0000' ? 0 : parseFloat(v.Diskon1).toFixed(2)
                v.Harga = v.Harga == '.0000' ? 0 : parseFloat(v.Harga).toFixed(2)
                v.DiskonRp = parseFloat(v.Harga) * parseFloat(v.Diskon) / 100
                v.SubTotal = v.Jumlah * (parseFloat(v.Harga) - (parseFloat(v.Harga) * parseFloat(v.Diskon) / 100))
                return v
            })
            // console.log(val)
        },
        itemsJasa(val){
            this.items = val
            // console.log(val)
        },
    },
    methods: {
        customValidationFn(args){
            if (this.title == 'Ubah') {
                if (parseInt(args.value) <= this.maxUpdateJumlah && parseInt(args.value) >= parseInt(this.Terpenuhi)) {
                    return true
                } else {
                    return false
                }
            } else {
                if (parseInt(args.value) <= this.sisaRwl) {
                    return true
                } else {
                    return false
                }
            }
        },
        accjasa(){
            this.items = [...this.items]
            if (this.items.length > 0) {
                if (this.storeSelect.length > 0) {
                    this.storeSelect.forEach(e,index => {
                        const data = {
                            NoUrut : index == 0 ? index + 1 + parseInt(this.items[this.items.length - 1].NoUrut) : parseInt(this.items[this.items.length - 1].NoUrut) + 1,
                            Jumlah : 1,
                            Rasio : 1,
                            Diskon : 0,
                            DiskonRp : 0,
                            Perkiraan : e.Nama,
                            Keterangan : '',
                            Harga : 0,
                            SubTotal : 0,
                        }
                        this.items.push(data)
                    })
                } else {
                    const data = {
                        NoUrut : parseInt(this.items[this.items.length - 1].NoUrut) + 1,
                        Jumlah : 1,
                        Rasio : 1,
                        Diskon : 0,
                        DiskonRp : 0,
                        Perkiraan : this.storeSelect.Nama,
                        Keterangan : '',
                        Harga : 0,
                        SubTotal : 0,
                    }
                    this.items.push(data)
                }
            } else {
                if (this.storeSelect.length != undefined) {
                    this.storeSelect.forEach(e => {
                        const data = {
                            Perkiraan : e.Nama,
                            NoUrut : index +1,
                            Jumlah : 1,
                            Rasio : 1,
                            Diskon : 0,
                            DiskonRp : 0,
                            Keterangan : '',
                            Harga : 0,
                            SubTotal : 0,
                        }
                        this.items.push(data)
                    })
                } else {
                    // this.storeSelect.Jumlah = 1
                    // this.storeSelect.NoUrut = 1
                    // this.storeSelect.JenisPekerjaan = this.storeSelect.Nama
                    // this.storeSelect.Harga = this.storeSelect.HargaJualDefault == null ? 0 : this.storeSelect.HargaJualDefault
                    // this.storeSelect.Diskon = 0
                    // this.storeSelect.DiskonRp = 0
                    // this.storeSelect.SubTotal = this.storeSelect.HargaJualDefault == null ? 0 : this.storeSelect.HargaJualDefault
                    const data = {
                        Perkiraan : this.storeSelect.Nama,
                        NoUrut : 1,
                        Jumlah : 1,
                        Rasio : 1,
                        Diskon : 0,
                        DiskonRp : 0,
                        Keterangan : '',
                        Harga : 0,
                        SubTotal : 0,
                    }
                    this.items.push(data)
                }
            }
            this.items = [...this.items]
            this.dialog = false
        },
        closeDialogPilihItems(){
            this.dialog = false
        },
        rowSelectedPerkiraan: function() {
            this.storeSelect = this.$refs.ggs.ej2Instances.getSelectedRecords()
        },
        getDataPekerjaan(){
            api.get('jenisPekerjaan?token='+this.token).then(
                res => {
                    this.dataPekerjaan = res.data.data
                },
                err => {console.log(err)}
            )
        },
        getDataPerkiraan(){
            api.get('/coa?token='+this.token).then(
                res => {
                    this.dataPerkiraan = res.data
                },
                err => {
                    console.log(err)
                }
            )
        },
        onDoubleClick:function(args){
            this.setFocus = args.column;
        },
        onActionComplete(args){
            if (args.requestType === "beginEdit") {
                this.sisaRwl = args.rowData.JumlahSisa
                if (this.title == 'Ubah') {
                    // console.log(args)
                    this.Terpenuhi = args.rowData.Terpenuhi
                    if (args.rwl != undefined) {
                        this.maxUpdateJumlah = parseInt(args.rowData.rwl.Jumlah) - parseInt(args.rowData.Jumlah) + parseInt(args.rowData.Jumlah)
                    } else {
                        this.maxUpdateJumlah = parseInt(args.rowData.Jumlah)
                    }
                }
                if (args.form.elements.namedItem(this.setFocus.field) != null) {
                    args.form.elements.namedItem(this.setFocus.field).focus()
                }
            }
            if (args.requestType === "delete") {
                args.data.forEach((d => {if (d.KodeNota != undefined) {
                    this.hapus_items.push(d) 
                }}))
                this.$emit('hapus_item',this.hapus_items)
            }
            if (args.requestType === "save") {
                let data = this.items
                this.items = data.map(item => {
                    item.Perkiraan = item.Perkiraan == null || item.Perkiraan == item.Nama ? args.previousData.Perkiraan : item.Perkiraan
                    item.DiskonRp = parseFloat(item.Diskon*item.Harga/100),
                    item.SubTotal = parseFloat(item.Jumlah)*parseFloat(item.Harga)-parseFloat(item.Diskon*item.Harga*item.Jumlah/100)
                    return item
                })
            }
        }
    }
}
</script>

<style>

</style>