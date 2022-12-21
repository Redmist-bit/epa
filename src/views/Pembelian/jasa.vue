<template>
  <v-col cols="12" md="12">
    <!-- <v-toolbar
        flat
        dark
        dense
        outlined
        color="white"
        class="elevation-5"
      > 
        <v-dialog v-model="dialogItemsbarang"  max-width="1000px" persistent>
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
              <span class="headline">{{ formTitleItemsbarang }}</span>
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
                    id="Grid"
                    ref='ggs' 
                    :dataSource="Pekerjaan" height='200' width='100%'
                    :allowReordering = true
                    :allowSelection="true"
                    :selectionSettings='selectionOptions'
                    :allowResizing='true'
                    :allowPaging='true'
                    :toolbar="toolbarOptionsSelect"
                    :pageSettings='pageSettings'
                    :rowSelected="rowSelectedBarang"
                    :rowSelecting='select'
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
      </v-toolbar> -->

    <v-card color="grey lighten-3" class="pa-2 rounded-lg elevation-0">
      <!-- grid items pembelian -->
      <ejs-grid
        :dataSource="itemsbarangPembelian"
        height="200"
        width="100%"
        gridLines="Both"
        :allowReordering="true"
        :editSettings="editSettings"
        :allowSorting="true"
        :allowResizing="true"
        :allowPaging="true"
        :pageSettings="pageSettings"
        :recordDoubleClick="onDoubleClick"
        @actionComplete="onActionComplete"
      >
        <e-columns>
          <e-column
            fieldText=""
            field="NoUrut"
            headerText="NoUrut"
            width="160"
            :visible="false"
            :isPrimaryKey="true"
          >
          </e-column>

          <!-- <e-column
            field="JenisPekerjaan"
            :allowEditing="false"
            headerText="JenisPekerjaan"
            width="170"
          >
          </e-column> -->

          <e-column
            field="Perkiraan"
            editType="dropdownedit"
            :edit="gudang_asalParams"
            headerText="Perkiraan"
            width="280"
          >
          </e-column>

          <e-column field="Keterangan" headerText="Keterangan" width="170">
          </e-column>

          <e-column
            field="Jumlah"
            headerText="Jumlah"
            :validationRules="JumlahRules"
            editType="numericedit"
            type="number"
            width="170"
            textAlign="Right"
          >
          </e-column>

          <e-column
            field="Harga"
            headerText="Harga"
            width="170"
            editType="numericedit"
            type="number"
            :validationRules="NominalRules"
            format="N"
            textAlign="Right"
          >
          </e-column>

          <e-column
            field="Diskon"
            headerText="Diskon"
            width="170"
            type="number"
            :validationRules="NominalRules"
            editType="numericedit"
            textAlign="Right"
          >
          </e-column>

          <e-column
            field="SubTotal"
            :allowEditing="false"
            headerText="Sub Total"
            type="number"
            format="N"
            width="170"
            textAlign="Right"
          >
          </e-column>
        </e-columns>
        <e-aggregates>
          <e-aggregate>
            <e-columns>
              <e-column
                format="N"
                type="Sum"
                field="SubTotal"
                :FooterTemplate="footerSum"
              ></e-column>
              <e-column
                type="Count"
                field="JenisPekerjaan"
                :FooterTemplate="footerCount"
              ></e-column>
            </e-columns>
          </e-aggregate>
        </e-aggregates>
      </ejs-grid>
    </v-card>
  </v-col>
</template>

<script>
import Vue from "vue";
// import api from '@/services/http'
// import { DropDownList } from "@syncfusion/ej2-dropdowns";
// import { Query } from '@syncfusion/ej2-data';
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import {
  GridPlugin,
  Toolbar,
  Page,
  Aggregate,
  Resize,
  Filter,
  Sort,
  Edit,
  CommandColumn,
  Reorder,
} from "@syncfusion/ej2-vue-grids";
// let country= [
//         { countryName: 'United States', countryId: '1' },
//         { countryName: 'Australia', countryId: '2' }
//     ];
// let countryElem,  countryObj, stateObj;
let gudangElemAsal, gudangObjAsal;
Vue.use(GridPlugin);
export default {
  props: {
    itemsPerkiraan: {
      type: Array,
    },
    itemsPekerjaan: {
      type: Array,
    },
    ItemsPembelian: {
      type: Array,
    },
    itemspo: {
      type: Array,
    },
    title: String,
  },
  data() {
    return {
      NominalRules: { required: true, min: 0 },
      JumlahRules: {
        required: true,
        min: 0,
        max: [
          this.customValidationFn,
          "Tidak Boleh Lebih dari Permintaan saat PO",
        ],
      },
      name: "items",
      setFocus: "",
      dialogItemsbarang: false,
      ItemsPembelianList: [],
      storeSelect: [],
      hapus_items: [],
      dataBarang: [],
      itemsbarangPembelian: [],
      token: localStorage.getItem("token"),
      selectionOptions: { type: "Multiple" },
      //  selectionOptions: { type: 'Multiple', persistSelection: true, enableSimpleMultiRowSelection: true},
      // selectionOptionssatuan: { type: 'Single'},
      toolbarOptions: ["Search", "Delete", "Update", "Cancel"],
      toolbarOptionsSelect: ["Search"],
      pageSettings: { pageSizes: ["5", "10", "20", "50"] },
      filterOptions: { type: "Menu" },
      filter: { type: "CheckBox" },
      editSettings: {
        showDeleteConfirmDialog: true,
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Normal",
      },
      groupSettings: { allowReordering: true },
      footerSum: function () {
        return {
          template: Vue.component("SumTemplate", {
            template: `<span>Sum: {{data.Sum}}</span>`,
            data() {
              return { data: {} };
            },
          }),
        };
      },
      footerCount: function () {
        return {
          template: Vue.component("MaxTemplate", {
            data() {
              return { data: {} };
            },
          }),
        };
      },
      Perkiraan: [],
      Pekerjaan: [],
      gudang_asalParams: {
        create: () => {
          gudangElemAsal = document.createElement("input");
          return gudangElemAsal;
        },
        read: () => {
          // console.log('red',e)
          return gudangObjAsal.text;
        },
        destroy: () => {
          // console.log('destroy',e)
          gudangObjAsal.destroy();
        },
        write: (w) => {
          // console.log('writ',w)
          if (w.rowData.gudang_asal != null) {
            gudangObjAsal = new DropDownList({
              dataSource: this.Perkiraan,
              fields: { value: "Kode", text: "Nama" },
              value: w.rowData.Perkiraan,
              text: w.rowData.Perkiraan,
              change: (d) => {
                console.log("d gada isi", d);
              },
              placeholder: "Select a Perkiraan",
              floatLabelType: "Never",
            });
          } else {
            gudangObjAsal = new DropDownList({
              dataSource: this.Perkiraan,
              fields: { value: "Kode", text: "Nama" },
              value: w.rowData.Perkiraan,
              text: w.rowData.Perkiraan,
              change: (d) => {
                console.log("d", d);
              },
              placeholder: "Select a Perkiraan",
              floatLabelType: "Never",
            });
          }
          gudangObjAsal.appendTo(gudangElemAsal);
        },
      },
    };
  },
  provide: {
    grid: [
      Page,
      Toolbar,
      Aggregate,
      Resize,
      Filter,
      Sort,
      Edit,
      CommandColumn,
      Reorder,
    ],
  },
  mounted() {
    // this.getDataBarang(0,20)
  },

  watch: {
    ItemsPembelian(val) {
      console.log(val);
      this.itemsbarangPembelian = val;
    },
    title(ket) {
      console.log(ket);
      if (ket == "Kosongkan") {
        this.itemsbarangPembelian = [];
        this.hapus_items = [];
        this.itemsbarangPembelian = [...this.itemsbarangPembelian];
        this.hapus_items = [];
      }
    },
    itemspo(val) {
      this.itemsbarangPembelian = [];
      this.itemsbarangPembelian = val;
    },
    itemsbarangPembelian(val) {
      this.$emit("itemsPb", val);
    },
  },

  created() {
    this.Perkiraan = this.itemsPerkiraan;
    this.Pekerjaan = this.itemsPekerjaan;
  },

  computed: {
    formTitleItemsbarang() {
      return this.editedIndex === -1 ? "Tambah Jasa" : "Pilih Jasa";
    },
  },
  methods: {
    customValidationFn(args) {
      if (this.title == "Ubah") {
        if (parseInt(args.value) <= this.maxUpdateJumlah) {
          return true;
        } else {
          return false;
        }
      } else {
        if (parseInt(args.value) <= this.sisaPo) {
          return true;
        } else {
          return false;
        }
      }
    },
    onDoubleClick: function (args) {
      this.setFocus = args.column;
    },
    onActionComplete(args) {
      if (args.requestType === "beginEdit") {
        this.sisaPo = args.rowData.JumlahSisa;
        if (this.title == "Ubah") {
          this.maxUpdateJumlah = args.rowData.maxUpdateJumlah;
        }
        args.form.elements.namedItem(this.setFocus.field).focus();
      }
      if (args.requestType === "batchsave" || args.requestType === "save") {
        let data = this.itemsbarangPembelian;
        this.itemsbarangPembelian = data.map((item) => {
          item.Gudang =
            item.Gudang == null || item.Gudang == item.Nama
              ? args.previousData.Gudang
              : item.Gudang;
          (item.DiskonRp = parseFloat((item.Diskon * item.Harga) / 100)),
            (item.SubTotal =
              parseFloat(item.Jumlah) * parseFloat(item.Harga) -
              parseFloat((item.Diskon * item.Harga * item.Jumlah) / 100));
          return item;
        });
      }
      if (args.requestType === "delete" && this.title == "Ubah") {
        args.data.forEach((d) => {
          if (d.KodeNota != undefined) {
            this.hapus_items.push(d);
          }
        });
        this.$emit("hapus_item", this.hapus_items);
      }
    },
    //pilih barang
    select(a) {
      console.log(a);
    },
    rowSelectedBarang() {
      this.storeSelect = this.$refs.ggs.ej2Instances.getSelectedRecords();
    },

    closeDialogPilihItems() {
      this.dialogItemsbarang = false;
    },

    //simpan barang dari list
    PilihJasa() {
      this.itemsbarangPembelian = [...this.itemsbarangPembelian];
      // cek items barang masih kosong atau sudah di load dari po
      if (this.itemsbarangPembelian.length > 0) {
        if (this.storeSelect.length > 0) {
          for (let i = 0; i < this.storeSelect.length; i++) {
            const element = this.storeSelect[i];
            let result = this.itemsbarangPembelian.findIndex(
              (o) => o.JenisPekerjaan == element.Nama
            );
            // Cek barang sdh ada apa belum di itemsbarang
            if (result != -1) {
              this.itemsbarangPembelian[result].Jumlah += 1;
              this.itemsbarangPembelian[result].SubTotal = parseFloat(
                this.itemsbarangPembelian[result].Jumlah *
                  parseFloat(
                    parseFloat(this.itemsbarangPembelian[result].Harga) -
                      parseFloat(this.itemsbarangPembelian[result].DiskonRp)
                  )
              );
            } else {
              // element.gudang = element.Gudang
              element.Keterangan = "";
              element.Jumlah = 1;
              element.JenisPekerjaan = element.Nama;
              element.Harga =
                element.HargaJualDefault == null ? 0 : element.HargaJualDefault;
              element.Diskon = 0;
              element.DiskonRp = 0;
              element.SubTotal =
                element.HargaJualDefault == null ? 0 : element.HargaJualDefault;
              this.itemsbarangPembelian.push(element);
            }
          }
        } else {
          let barangExist = this.itemsbarangPembelian.findIndex(
            (b) => b.JenisPekerjaan == this.storeSelect.Nama
          );
          if (barangExist != -1) {
            this.itemsbarangPembelian[barangExist].Jumlah += 1;
            this.itemsbarangPembelian[barangExist].SubTotal = parseFloat(
              this.itemsbarangPembelian[barangExist].Jumlah *
                parseFloat(
                  parseFloat(this.itemsbarangPembelian[barangExist].Harga) -
                    parseFloat(this.itemsbarangPembelian[barangExist].DiskonRp)
                )
            );
          } else {
            this.storeSelect.Jumlah = 1;
            this.storeSelect.JenisPekerjaan = this.storeSelect.Nama;
            this.storeSelect.Harga =
              this.storeSelect.HargaJualDefault == null
                ? 0
                : this.storeSelect.HargaJualDefault;
            this.storeSelect.Diskon = 0;
            this.storeSelect.Gudang = "GUDANG TA 1";
            this.storeSelect.DiskonRp = 0;
            this.storeSelect.SubTotal =
              this.storeSelect.HargaJualDefault == null
                ? 0
                : this.storeSelect.HargaJualDefault;
            this.itemsbarangPembelian.push(this.storeSelect);
          }
        }
      } else {
        if (this.storeSelect.length != undefined) {
          for (let i = 0; i < this.storeSelect.length; i++) {
            const element = this.storeSelect[i];
            element.Keterangan = "";
            element.Jumlah = 1;
            element.JenisPekerjaan = element.Nama;
            element.Harga =
              element.HargaJualDefault == null ? 0 : element.HargaJualDefault;
            element.Diskon = 0;
            element.DiskonRp = 0;
            element.SubTotal =
              element.HargaJualDefault == null ? 0 : element.HargaJualDefault;
            this.itemsbarangPembelian.push(element);
          }
        } else {
          console.log("disini", this.storeSelect);
          this.storeSelect.JenisPekerjaan = this.storeSelect.Nama;
          this.storeSelect.Jumlah = 1;
          this.storeSelect.Harga =
            this.storeSelect.HargaJualDefault == null
              ? 0
              : this.storeSelect.HargaJualDefault;
          this.storeSelect.Diskon = 0;
          this.storeSelect.DiskonRp = 0;
          this.storeSelect.SubTotal =
            this.storeSelect.HargaJualDefault == null
              ? 0
              : this.storeSelect.HargaJualDefault;
          this.itemsbarangPembelian.push(this.storeSelect);
        }
      }
      this.itemsbarangPembelian = [...this.itemsbarangPembelian];
      this.dialogItemsbarang = false;
    },
  },
};
</script>
