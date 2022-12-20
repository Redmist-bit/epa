<template>
    <v-col cols='12' md='12'>
        <v-toolbar
        flat
        dark
        dense
        outlined
        color="white"
            class="elevation-5"
        > 
            <v-dialog v-model="dialogItemsJasa"  max-width="1000px" persistent>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    dark
                    class="mx-n2"
                    color="blue darken-4"
                    v-bind="attrs"
                    v-on="on" >
                    <v-icon>mdi-plus</v-icon>
                    Tambah
                    </v-btn>
                </template>
                <v-card>
                    <v-toolbar
                    dark
                    outline
                    color="blue darken-4"
                    class="elevation-0"
                    >
                    <v-card-title>
                    <span class="headline">{{ formTitleItems }}</span>
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

                    <v-col cols="12" md="12">
                    <v-card>
                        <ejs-grid 
                        ref='ggs' 
                        :dataSource="dataPekerjaan" height='200' width='100%'
                        :allowReordering = true
                        :allowSelection="true"
                        :selectionSettings='selectionOptions'
                        :allowResizing='true'
                        :allowPaging='true'
                        :toolbar="toolbarOptionsSelect"
                        :pageSettings='pageSettings'
                        :rowSelected="rowSelectedJasa"
                        >
                        <e-columns>
                            <e-column 
                            fieldText=''
                            field='Kode' 
                            headerText='Kode' 
                            textAlign='Left'
                            width=180
                            >
                            </e-column>

                            <e-column
                            field='Nama'
                            headerText='Nama'
                            width=250
                            >
                            </e-column>

                            <e-column
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
                            ></e-column>
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
                        @click="PilihJasa">
                        <v-icon class="mr-1">mdi-check</v-icon>Pilih
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>

        <v-card>
            <ejs-grid 
                :dataSource="itemsBeliJasa" height='200' width='100%'
                :allowReordering = true
                :editSettings='editSettings'
                
                :recordDoubleClick="onDoubleClick"
                @actionComplete="onActionComplete">
                <e-columns>
                    <e-column
                    field='NoUrut'
                    headerText='NoUrut'
                    :isPrimaryKey="true" 
                    width=240
                    >
                    <!-- <e-column
                    field='JenisPekerjaan'
                    headerText='Jenis Pekerjaan'
                    :isPrimaryKey="true" 
                    width=240
                    >
                    </e-column> -->
                    <!-- <e-column 
                    fieldText=''
                    field='Perkiraan'
                    :edit='dropDownPerkiraan'
                    headerText='Perkiraan' 
                    textAlign='Left'
                    width=260
                    >
                    </e-column> -->
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
                    type="number" 
                    :validationRules="JumlahRules" 
                    format="N"
                    width=170
                    >
                    </e-column>
                    <e-column
                    field='Harga'
                    type="number" 
                    editType= 'numericedit' 
                    format="N"
                    headerText='Harga'
                    width=170
                    >
                    </e-column>
                    <e-column
                    field='Diskon'
                    editType= 'numericedit' 
                    headerText='Diskon'
                    width=170
                    >
                    </e-column>
                    <e-column
                    type="number" 
                    format="N"
                    field='SubTotal'
                    headerText='SubTotal'
                    width=170
                    >
                    </e-column>
                </e-columns>
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
        itemsJasa: Array,
        title: String,
        ItemSpo: Array,
    },
    data(){
        return {
            dialogItemsJasa:false,
            JumlahRules: { required: true, min: 0, max:  [this.customValidationFn,'Tidak Boleh Lebih dari Permintaan saat PO'] },
            itemsBeliJasa:[],
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
            toolbarOptionsSelect: ['Search'],
            pageSettings: {pageSizes: ['5','10','20','50']},
            editSettings: { showDeleteConfirmDialog: true, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal'},
            editSettingsSelect: { showDeleteConfirmDialog: false, allowEditing: false, allowAdding: false, allowDeleting: false, mode: 'Normal'},
        }
    },
    provide:{
        grid: [Page, Toolbar, Aggregate, Group, Resize, Filter, Sort, Edit, CommandColumn, Reorder]
    },
    mounted(){
        this.getDataPerkiraan()
        this.getDataPekerjaan()
    },
    computed:{
        formTitleItems(){
            return this.editedIndex === -1 ? "Tambah Jasa" : "Pilih Jasa"
        }
    },
    watch:{
        title(ket){
            if (ket == "Kosongkan") {
                this.items = []
                this.hapus_items = []
                this.items = [...this.items]
            }
        },
        ItemSpo(val){
            this.items = val.map(v => {
                v.Perkiraan = v.perkiraan.Nama
                v.JenisPekerjaan = v.pekerjaan.Nama
                v.DiskonRp = v.Diskon
                v.Diskon = v.Diskon1 == '.0000' ? 0 : v.Diskon1
                v.Harga = v.Harga == '.0000' ? 0 : v.Harga
                v.SubTotal = v.Jumlah * (parseFloat(v.Harga) - (parseFloat(v.Harga) * parseFloat(v.Diskon) / 100))
                return v
            })
        },
        dataPerkiraan(val){
            this.$emit('dataPerkiraan',val)
        },
        dataPekerjaan(val){
            this.$emit('dataPekerjaan',val)
        },
        items(val){
            this.$emit('itemsPb',val)
            console.log(val)
        },
        itemsJasa(val){
            // this.$refs.xx.ej2Instances.dataSource = val; 
            console.log(val)
            this.items = []
            this.itemsBeliJasa = val
        },
    },
    methods:{
        customValidationFn(args){
            if (this.title == 'Ubah') {
                // console.log(args)
                if (parseInt(args.value) <= this.maxUpdateJumlah) {
                return true
                } else {
                return false
                }
            } else {
                if (parseInt(args.value) <= this.sisaPo) {
                return true
                } else {
                return false
                }
            }
        },
        closeDialogPilihItems() {
            this.dialogItemsJasa = false;
        },
        rowSelectedJasa(){
            this.storeSelect = this.$refs.ggs.ej2Instances.getSelectedRecords()
        },
        PilihJasa(){
            this.items = [...this.items]
            if (this.items.length > 0) {
                if (this.storeSelect.length > 0) {
                    this.storeSelect.forEach(e => {
                        const data= e
                        let jasaExist = this.items.findIndex(i => i.JenisPekerjaan == data.Nama)
                        if (jasaExist != -1) {
                            this.items[jasaExist].Jumlah += 1
                            this.items[jasaExist].SubTotal = parseFloat(this.items[jasaExist].Jumlah * parseFloat(parseFloat(this.items[jasaExist].Harga) - parseFloat(this.items[jasaExist].DiskonRp)))
                        } else {
                            data.Jumlah = 1
                            data.JenisPekerjaan = data.Nama
                            data.Harga = data.HargaJualDefault == null ? 0 : data.HargaJualDefault
                            data.Diskon = 0
                            data.DiskonRp = 0
                            data.SubTotal = data.HargaJualDefault == null ? 0 : data.HargaJualDefault
                            this.items.push(data)
                        }
                    })
                } else {
                    let jasaExist = this.items.findIndex(j => j.JenisPekerjaan == this.storeSelect.Nama)
                    if (jasaExist != -1) {
                        this.items[jasaExist].Jumlah +=1
                        this.items[jasaExist].SubTotal = parseFloat(this.items[jasaExist].Jumlah * parseFloat(parseFloat(this.items[jasaExist].Harga) - parseFloat(this.items[jasaExist].DiskonRp)))
                    } else {
                        this.storeSelect.Jumlah = 1
                        this.storeSelect.JenisPekerjaan = this.storeSelect.Nama
                        this.storeSelect.Harga = this.storeSelect.HargaJualDefault == null ? 0 : this.storeSelect.HargaJualDefault
                        this.storeSelect.Diskon = 0
                        this.storeSelect.DiskonRp = 0
                        this.storeSelect.SubTotal = this.storeSelect.HargaJualDefault == null ? 0 : this.storeSelect.HargaJualDefault
                        this.items.push(this.storeSelect)
                    }
                }
            } else {
                if (this.storeSelect.length != undefined) {
                    this.storeSelect.forEach(e => {
                        const data = e
                        data.Jumlah = 1
                        data.JenisPekerjaan = data.Nama
                        data.Harga = data.HargaJualDefault == null ? 0 : data.HargaJualDefault
                        data.Diskon = 0
                        data.DiskonRp = 0
                        data.SubTotal = data.HargaJualDefault == null ? 0 : data.HargaJualDefault
                        this.items.push(data)
                    })
                } else {
                    this.storeSelect.Jumlah = 1
                    this.storeSelect.JenisPekerjaan = this.storeSelect.Nama
                    this.storeSelect.Harga = this.storeSelect.HargaJualDefault == null ? 0 : this.storeSelect.HargaJualDefault
                    this.storeSelect.Diskon = 0
                    this.storeSelect.DiskonRp = 0
                    this.storeSelect.SubTotal = this.storeSelect.HargaJualDefault == null ? 0 : this.storeSelect.HargaJualDefault
                    this.items.push(this.storeSelect)
                }
            }
            this.items = [...this.items]
            this.dialogItemsJasa = false
        },
        onDoubleClick:function(args){
            this.setFocus = args.column;
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
        onActionComplete(args){
            console.log(args)
            if (args.requestType === "beginEdit") {
                this.sisaPo = args.rowData.JumlahSisa
            if (this.title == 'Ubah') {
                this.maxUpdateJumlah = args.rowData.maxUpdateJumlah
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