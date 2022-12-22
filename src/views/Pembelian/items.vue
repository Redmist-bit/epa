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
                :dataSource="dataBarang" height='200' width='100%'
                :allowReordering = true
                :allowSelection="true"
                :selectionSettings='selectionOptions'
                :allowResizing='true'
                :allowPaging='true'
                :toolbar="toolbarOptionsSelect"
                :pageSettings='pageSettings'
                :rowSelected="rowSelectedBarang"
                :rowSelecting='select'
                :dataStateChange='dataStateChange'
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
                      :filter='filter'
                      field='Merk'  
                      headerText='Merk' 
                      width=130
                      >
                    </e-column>

                    <e-column
                      field='PartNumber1'
                      headerText='Part Number 1'
                      width=170
                      >
                    </e-column>

                    <e-column
                      field='Kendaraan'
                      headerText='Kendaraan'
                      width=170
                    >
                    </e-column>

                    <e-column
                      field='Satuan'
                      headerText='Satuan'
                      width=170
                    >
                    </e-column>

                    <e-column
                      field='Harga'
                      headerText='HargaJualDefault'
                      width=170
                    >
                    </e-column>
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
                @click="Pilihbarang">
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
            field="Gudang"
            headerText="Gudang"
            editType="dropdownedit"
            :edit="gudang_asalParams"
            width="160"
          >
          </e-column>

          <e-column
            field="Barang"
            :allowEditing="false"
            headerText="Barang"
            width="170"
            :isPrimaryKey="true"
          >
          </e-column>

          <e-column
            field="Nama"
            :allowEditing="false"
            headerText="Nama"
            width="280"
          >
          </e-column>

          <e-column
            field="PartNumber1"
            :allowEditing="false"
            headerText="Part Number 1"
            width="170"
          >
          </e-column>

          <e-column
            field="Merk"
            headerText="Merk"
            :allowEditing="false"
            width="170"
          >
          </e-column>
          <e-column
            field="Kendaraan"
            :allowEditing="false"
            headerText="Kendaraan"
            width="170"
          >
          </e-column>
          <e-column
            field="Keterangan"
            headerText="Keterangan"
            width="170"
          >
          </e-column>
          <e-column
            field="Jumlah"
            headerText="Jumlah"
            width="170"
            :validationRules="JumlahRules"
            editType="numericedit"
            type="number"
            format="N"
            textAlign="Right"
          >
          </e-column>
          <e-column
            field="Satuan"
            headerText="Satuan"
            :allowEditing="false"
            width="170"
          >
          </e-column>
          <e-column
            field="Harga"
            type="number"
            format="N"
            headerText="Harga"
            editType="numericedit"
            width="170"
            textAlign="Right"
          >
          </e-column>
          <e-column
            field="Diskon"
            editType="numericedit"
            headerText="Diskon"
            width="170"
            textAlign="Right"
          >
          </e-column>
          <e-column
            field="SubTotal"
            type="number"
            format="N"
            headerText="Sub Total"
            :allowEditing="false"
            width="170"
            textAlign="Right"
          >
          </e-column>
        </e-columns>

        <e-aggregates>
          <e-aggregate>
            <e-columns>
              <e-column
                type="Sum"
                format="N"
                field="SubTotal"
                :FooterTemplate="footerSum"
              ></e-column>
              <e-column
                type="Count"
                field="Barang"
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
import api from "@/services/http";
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
    itemsgudang: {
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
      name: "items",
      setFocus: "",
      dialogItemsbarang: false,
      sisaPo: null,
      maxUpdateJumlah: null,
      ItemsPembelianList: [],
      storeSelect: [],
      JumlahRules: {
        required: true,
        min: 0,
        max: [
          this.customValidationFn,
          "Tidak Boleh Lebih dari Permintaan saat PO",
        ],
      },
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
      gudang: [],
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
              dataSource: this.gudang,
              fields: { value: "Kode", text: "Nama" },
              value: w.rowData.Kode,
              text: w.rowData.Gudang,
              change: (d) => {
                console.log("d gada isi", d);
              },
              placeholder: "Select a Gudang Asal",
              floatLabelType: "Never",
            });
          } else {
            gudangObjAsal = new DropDownList({
              dataSource: this.gudang,
              fields: { value: "Kode", text: "Nama" },
              value: w.rowData.Kode,
              text: w.rowData.Gudang,
              change: (d) => {
                console.log("d", d);
              },
              placeholder: "Select a Gudang Asal",
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
    this.getDataBarang(0, 20);
  },

  watch: {
    ItemsPembelian(val) {
      console.log(val);
      // console.log(this.title)
      // console.log(this.itemsbarangPembelian.length)
      // val.forEach(element => {
      //   element.Nama = element.barang.Nama
      //   element.PartNumber1 = element.barang.PartNumber1
      //   element.Merk = element.barang.Merk
      //   element.Kendaraan = element.barang.Kendaraan
      //   element.barang = element.barang.Kode
      // });
      // if (this.title == "Ubah") {
      this.itemsbarangPembelian = val;
      //   this.itemsbarangPembelian.forEach(element => {
      //     element.Nama = element.barang.Nama
      //     element.PartNumber1 = element.barang.PartNumber1
      //     element.Merk = element.barang.Merk
      //     element.Kendaraan = element.barang.Kendaraan
      //     element.barang = element.barang.Kode
      //   })
      // console.log(this.itemsbarangPembelian)
      // }
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
      // if (this.title == "Ubah") {
      //   val.forEach(d => this.itemsbarangPembelian.push(d))
      // } else {
      //   let konfirmasi = confirm("Detail pembelian akan di isi ulang, lanjutkan?")
      //   if (konfirmasi == true) {
      //     val.forEach(d => {
      //       delete d.Keterangan
      //       delete d.eta
      //       delete d.purchase_orders_id
      //       delete d.created_at
      //       delete d.updated_at
      //       delete d.id
      //       this.itemsbarangPembelian.push(d)})
      //   }
      // }
      this.itemsbarangPembelian = val.map((v) => {
        v.Gudang = this.gudang.find((g) => g.Kode == v.Gudang).Nama;
        v.Nama = v.barang.Nama;
        v.Merk = v.barang.Merk;
        v.PartNumber1 = v.barang.PartNumber1;
        v.Kendaraan = v.barang.Kendaraan;
        v.Satuan = v.satuan.Nama;
        v.Diskon = v.Diskon1 == ".0000" ? 0 : v.Diskon1;
        v.Harga = v.Harga == ".0000" ? 0 : v.Harga;
        v.DiskonRp = v.Diskon;
        v.SubTotal =
          (v.Jumlah - parseInt(v.Terpenuhi)) *
          (parseFloat(v.Harga) -
            (parseFloat(v.Harga) * parseFloat(v.Diskon)) / 100);
        return v;
      });
    },
    // dialogItemsbarang(val) {
    //   if (val) {
    //     this.getDatabarang()
    //   } else {
    //     this.closeDialogPilihItems();
    //   }
    // },
    itemsbarangPembelian(val) {
      this.$emit("itemsPb", val);
    },
  },

  created() {
    this.gudang = this.itemsgudang;
  },

  computed: {
    formTitleItemsbarang() {
      return this.editedIndex === -1 ? "Tambah barang" : "Pilih barang";
    },
  },
  methods: {
    customValidationFn(args) {
      // console.log(args)
      // if (parseInt(args.value) <= this.sisaPo) {
      //   return true
      // } else {
      //   return false
      // }
      if (this.title == "Ubah") {
        // console.log(args)
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
          // item.Gudang = item.Gudang == null ? args.previousData.Gudang : item.Gudang
          (item.DiskonRp = parseFloat((item.Diskon * item.Harga) / 100)),
            (item.SubTotal =
              parseFloat(item.Jumlah) * parseFloat(item.Harga) -
              parseFloat((item.Diskon * item.Harga * item.Jumlah) / 100));
          return item;
        });
      }
      if (args.requestType === "delete" && this.title == "Ubah") {
        // console.log(args.data.pembelian_id)
        args.data.forEach((d) => {
          if (d.KodeNota != undefined) {
            this.hapus_items.push(d);
          }
        });
        // console.log(this.hapus_items)
        this.$emit("hapus_item", this.hapus_items);
      }
      // console.log('hps',this.hapus_items)
    },
    //pilih barang
    select(a) {
      console.log(a);
    },
    rowSelectedBarang() {
      // console.log(args)
      // console.log(this.$refs.ggs.ej2Instances.getSelectedRecords())
      this.storeSelect = this.$refs.ggs.ej2Instances.getSelectedRecords();
      console.log(this.storeSelect);
    },

    closeDialogPilihItems() {
      this.dialogItemsbarang = false;
    },

    //simpan barang dari list
    Pilihbarang() {
      this.itemsbarangPembelian = [...this.itemsbarangPembelian];
      // cek items barang masih kosong atau sudah di load dari po
      if (this.itemsbarangPembelian.length > 0) {
        if (this.storeSelect.length > 0) {
          for (let i = 0; i < this.storeSelect.length; i++) {
            const element = this.storeSelect[i];
            let result = this.itemsbarangPembelian.findIndex(
              (o) => o.Barang == element.Kode && o.Satuan == element.Satuan
            );
            // Cek barang sdh ada apa belum di itemsbarang
            console.log("kode", element.Barang);
            console.log(result);
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
              element.Gudang = "GUDANG EPA";
              element.Jumlah = 1;
              element.Barang = element.Kode;
              element.Harga = element.Harga == null ? 0 : element.Harga;
              element.Diskon = 0;
              element.DiskonRp = 0;
              element.SubTotal = element.Harga == null ? 0 : element.Harga;
              this.itemsbarangPembelian.push(element);
            }
          }
        } else {
          let barangExist = this.itemsbarangPembelian.findIndex(
            (b) =>
              b.Barang == this.storeSelect.Kode &&
              b.Satuan == this.storeSelect.Satuan
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
            console.log("disini");
            this.storeSelect.Jumlah = 1;
            this.storeSelect.Barang = this.storeSelect.Kode;
            this.storeSelect.Harga =
              this.storeSelect.Harga == null ? 0 : this.storeSelect.Harga;
            this.storeSelect.Diskon = 0;
            this.storeSelect.Gudang = "GUDANG EPA";
            this.storeSelect.DiskonRp = 0;
            this.storeSelect.SubTotal =
              this.storeSelect.Harga == null ? 0 : this.storeSelect.Harga;
            this.itemsbarangPembelian.push(this.storeSelect);
          }
        }
      } else {
        if (this.storeSelect.length != undefined) {
          for (let i = 0; i < this.storeSelect.length; i++) {
            const element = this.storeSelect[i];
            element.Keterangan = "";
            element.Jumlah = 1;
            element.Barang = element.Kode;
            element.Gudang = "GUDANG EPA";
            element.Harga = element.Harga == null ? 0 : element.Harga;
            element.Diskon = 0;
            element.DiskonRp = 0;
            element.SubTotal = element.Harga == null ? 0 : element.Harga;
            this.itemsbarangPembelian.push(element);
          }
        } else {
          console.log("disini", this.storeSelect);
          this.storeSelect.Barang = this.storeSelect.Kode;
          this.storeSelect.Jumlah = 1;
          this.storeSelect.Gudang = "GUDANG EPA";
          this.storeSelect.Harga =
            this.storeSelect.Harga == null ? 0 : this.storeSelect.Harga;
          this.storeSelect.Diskon = 0;
          this.storeSelect.DiskonRp = 0;
          this.storeSelect.SubTotal =
            this.storeSelect.Harga == null ? 0 : this.storeSelect.Harga;
          this.itemsbarangPembelian.push(this.storeSelect);
        }
      }
      this.itemsbarangPembelian = [...this.itemsbarangPembelian];
      this.dialogItemsbarang = false;
      // grid.refresh()
      // GridPlugin.refresh()
      // document.getElementById("Grid").ej2_instances[0].refresh();
    },

    //ambil data Items Pembelian
    getDataItemsPembelian() {
      api.get("/itemsPembelians?token=" + this.token).then(
        (res) => {
          this.ItemsPembelianList = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },

    //ambil data barang
    getDataBarang(skip, take, sort, filter) {
      api
        .get(
          "pembelian-barang?token=" +
            this.token +
            "&skip=" +
            skip +
            "&take=" +
            take +
            "&sort=" +
            sort +
            "&filter=" +
            filter
        )
        .then(
          (res) => {
            this.dataBarang = res.data;
          },
          (err) => {
            console.log(err);
          }
        );
    },
    dataStateChange: function (state) {
      if (state.action.requestType === "paging") {
        this.skip = state.skip;
        this.take = state.take;
        if (state.search != undefined) {
          api
            .get(
              "pembelian-barang?token=" +
                this.token +
                "&search=" +
                state.search[0].key +
                "&skip=" +
                state.skip +
                "&take=" +
                state.take
            )
            .then((res) => {
              this.dataBarang = res.data;
            });
        } else if (state.search == undefined) {
          this.getDataBarang(state.skip, state.take);
        }
      }

      if (state.action.requestType === "searching") {
        state.skip = 0;
        state.take = 100;
        if (
          state.action.searchString == "" &&
          this.$refs.ggs.$el.ej2_instances[0].pageSettings.currentPage == 1
        ) {
          this.getDataBarang(0, 100);
        } else if (
          this.$refs.ggs.$el.ej2_instances[0].pageSettings.currentPage == 1
        ) {
          api
            .get(
              "pembelian-barang?token=" +
                this.token +
                "&search=" +
                state.action.searchString +
                "&skip=" +
                0 +
                "&take=" +
                100
            )
            .then((res) => {
              this.dataBarang = res.data;
            });
        } else {
          this.$refs.ggs.$el.ej2_instances[0].pageSettings.currentPage = 1;
        }
      }
    },
  },
};
</script>
