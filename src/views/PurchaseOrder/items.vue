<template>
  <v-col cols="12" md="12">
    <v-toolbar flat dark dense outlined color="white" class="elevation-5">
      <v-dialog v-model="dialogbarang" max-width="1000px" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            class="mx-n2"
            color="blue darken-4"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
            Tambah
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark outline color="blue darken-4" class="elevation-0">
            <v-card-title>
              <span class="headline">{{ formTitleItemsbarang }}</span>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn dark text fab small @click="closeDialogPilihItems">
              <v-icon class="mx-1">mdi-window-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-col cols="12" md="12">
            <v-card>
              <!-- <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    dense
                    v-model="Unit"
                    readonly
                    label="Unit"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    dense
                    v-model="Site"
                    readonly
                    label="Site"
                  >
                  </v-text-field>
                </v-col>
              </v-row> -->
              <ejs-grid
                id="Grid"
                ref="ggs"
                :dataSource="dataBarang"
                height="200"
                width="100%"
                :allowReordering="true"
                :selectionSettings="selectionOptions"
                :allowResizing="true"
                :allowPaging="true"
                :toolbar="toolbarOptions"
                :pageSettings="pageSettings"
                :rowSelected="rowSelectedBarang"
                :dataStateChange="dataStateChange"
              >
                <e-columns>
                  <e-column
                    fieldText=""
                    field="Kode"
                    headerText="Kode"
                    textAlign="Left"
                    width="180"
                  >
                  </e-column>

                  <e-column field="Nama" headerText="Nama" width="250">
                  </e-column>

                  <e-column
                    :filter="filter"
                    field="Merk"
                    headerText="Merk"
                    width="130"
                  >
                  </e-column>

                  <e-column
                    field="PartNumber1"
                    headerText="Part Number 1"
                    width="170"
                  >
                  </e-column>

                  <e-column
                    field="Kendaraan"
                    headerText="Kendaraan"
                    width="170"
                  >
                  </e-column>

                  <e-column field="Satuan" headerText="Satuan" width="170">
                  </e-column>

                  <e-column
                    field="Harga"
                    headerText="HargaJualDefault"
                    width="170"
                  >
                  </e-column>
                </e-columns>
              </ejs-grid>
            </v-card>
          </v-col>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="blue darken-4" @click="accbarang">
              <v-icon class="mr-1">mdi-content-save</v-icon>Simpan
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-card color="grey lighten-3" class="pa-2 rounded-lg elevation-0">
      <ejs-grid
        :dataSource="childitembarangpo"
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
            :edit="dropdownGudang"
            headerText="Gudang"
            textAlign="Left"
            width="160"
          >
          </e-column>

          <e-column
            field="Barang"
            headerText="Barang"
            :isPrimaryKey="true"
            width="120"
          ></e-column>

          <e-column
            field="Nama"
            headerText="Nama"
            :isPrimaryKey="true"
            width="280"
          ></e-column>

          <e-column
            field="PartNumber1"
            :isPrimaryKey="true"
            headerText="Part Number 1"
            width="170"
          ></e-column>

          <e-column
            field="Merk"
            headerText="Merk"
            :isPrimaryKey="true"
            width="170"
          ></e-column>

          <e-column
            field="Kendaraan"
            :isPrimaryKey="true"
            headerText="Kendaraan"
            width="170"
          ></e-column>

          <e-column
            field="Keterangan"
            headerText="Keterangan"
            width="170"
          ></e-column>

          <e-column :edit="dropdownUnit" field="Unit" headerText="Unit" width="170"></e-column>

          <e-column field="Site" :edit="dropdownSite" headerText="Site" width="170"></e-column>

          <!-- <e-column
            field="TanggalKirim"
            headerText="ETA"
            format="dd/MM/yyyy"
            editType="datepickeredit"
            type="date"
            width="170"
          ></e-column> -->

          <e-column
            field="Jumlah"
            headerText="Jumlah"
            width="170"
            :validationRules="JumlahRules"
            editType="numericedit"
            type="number"
            format="N"
          ></e-column>

          <e-column
            field="Satuan"
            headerText="Satuan"
            :allowEditing="false"
            width="170"
          ></e-column>

          <e-column
            field="Harga"
            headerText="Harga"
            type="number"
            format="N"
            editType="numericedit"
            width="170"
          ></e-column>

          <e-column
            field="Diskon"
            editType="numericedit"
            headerText="Diskon"
            width="170"
          ></e-column>

          <e-column
            type="number"
            format="N"
            :allowEditing="false"
            field="SubTotal"
            headerText="SubTotal"
            textAlign="Right"
            width="170"
          ></e-column>
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
import {
  GridPlugin,
  Toolbar,
  Page,
  Aggregate,
  Resize,
  Filter,
  Sort,
  Group,
  Edit,
  CommandColumn,
  Reorder,
} from "@syncfusion/ej2-vue-grids";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
let elementGudang, GudangObj,elementUnit,UnitObj,elementSite,SiteObj;
import { DatePickerPlugin } from "@syncfusion/ej2-vue-calendars";
// let gudangnya = [
//   { Gudang: "GUDANG EPA"},
//   { Gudang: "DEPO 1"},
//   { Gudang: "DEPO 2"},
// ];
Vue.use(GridPlugin);
Vue.use(DatePickerPlugin);
export default {
  props: {
    dataUnit: Array,
    loadRpl: Array,
    title: String,
    itembarangpo: Array,
  },
  data() {
    return {
      dataSite:[
        {Site:'HO'},
        {Site:'BERAU'},
        {Site:'PALEMBANG'},
        {Site:'SUNGAI DANAU'},
        {Site:'TABANG'},
        {Site:'MOROWALI'},
        {Site:'PALU'}
      ],
      dropdownGudang: {
        create: () => {
          elementGudang = document.createElement("input");
          return elementGudang;
        },
        read: () => {
          return GudangObj.text;
        },
        destroy: () => {
          GudangObj.destroy();
        },
        write: (w) => {
          if (w.rowData.Gudang != null || w.rowData.Gudang != "") {
            GudangObj = new DropDownList({
              dataSource: this.dataGudang,
              fields: { value: "Kode", text: "Nama" },
              value: w.rowData.Kode,
              text: w.rowData.Gudang,
              change: (d) => {
                console.log("d gada isi", d);
              },
              placeholder: "Select a Gudang tujuan",
              floatLabelType: "Never",
            });
          } else {
            GudangObj = new DropDownList({
              dataSource: this.dataGudang,
              fields: { value: "Kode", text: "Nama" },
              value: w.rowData.Kode,
              text: w.rowData.Gudang,
              change: (d) => {
                console.log("d", d);
              },
              placeholder: "Select a Gudang",
              floatLabelType: "Never",
            });
          }
          GudangObj.appendTo(elementGudang);
        },
      },
      dropdownUnit: {
        create: () => {
          elementUnit = document.createElement("input");
          return elementUnit;
        },
        read: () => {
          return UnitObj.text;
        },
        destroy: () => {
          UnitObj.destroy();
        },
        write: (w) => {
          if (w.rowData.Unit != null || w.rowData.Unit != "") {
            UnitObj = new DropDownList({
              dataSource: this.dataUnit,
              fields: { value: "Kode", text: "Nama" },
              value: w.rowData.Kode,
              text: w.rowData.Unit,
              change: (d) => {
                console.log("d gada isi", d);
              },
              placeholder: "Select a Unit",
              floatLabelType: "Never",
            });
          } else {
            UnitObj = new DropDownList({
              dataSource: this.dataUnit,
              fields: { value: "Kode", text: "Nama" },
              value: w.rowData.Kode,
              text: w.rowData.Unit,
              change: (d) => {
                console.log("d", d);
              },
              placeholder: "Select a Unit",
              floatLabelType: "Never",
            });
          }
          UnitObj.appendTo(elementUnit);
        },
      },
      dropdownSite: {
        create: () => {
          elementSite = document.createElement("input");
          return elementSite;
        },
        read: () => {
          return SiteObj.text;
        },
        destroy: () => {
          SiteObj.destroy();
        },
        write: (w) => {
          if (w.rowData.Site != null || w.rowData.Site != "") {
            SiteObj = new DropDownList({
              dataSource: this.dataSite,
              fields: { value: "Site", text: "Site" },
              value: w.rowData.Site,
              text: w.rowData.Site,
              change: (d) => {
                console.log("d gada isi", d);
              },
              placeholder: "Select a Site",
              floatLabelType: "Never",
            });
          } else {
            SiteObj = new DropDownList({
              dataSource: this.dataSite,
              fields: { value: "Site", text: "Site" },
              value: w.rowData.Site,
              text: w.rowData.Site,
              change: (d) => {
                console.log("d", d);
              },
              placeholder: "Select a Site",
              floatLabelType: "Never",
            });
          }
          SiteObj.appendTo(elementSite);
        },
      },
      TotalBayar: "",
      DPp: "",
      PPn: "",
      Unit:"",
      Site:"",
      childpembayaran: [],
      hapus_items: [],
      gudang: "",
      ppnPersen: 0,
      JumlahRules: {
        required: true,
        min: 1,
        // max: [
        //   this.customValidationFn,
        //   "Tidak Boleh Lebih dari Permintaan saat RPL",
        // ],
      },
      dialogbarang: false,
      dialogPartOrder: false,
      verifPO: "",
      tempbarang: [],
      itembaranglist: [],
      dataBarang: [],
      dataGudang: [],
      storeSelect: [],
      childitembarangpo: [],
      sisaRpl: null,
      setFocus: "",
      token: localStorage.getItem("token"),
      groupSettings: { allowReordering: true },
      selectionOptions: { type: "Multiple" },
      // gudangParams: {
      // params: {
      // allowFiltering: true,
      // // dataSource: gudangnya,
      // fields: { text: "Gudang", value: "Gudang" },
      // actionComplete: () => false,
      //  },
      // },
      //  selectionOptions: { type: 'Multiple', persistSelection: true, enableSimpleMultiRowSelection: true},
      // selectionOptionsSatuan: { type: 'Single'},
      toolbarOptions: ["Search"],
      pageSettings: { pageSizes: ["5", "10", "20", "50"] },
      filterOptions: { type: "Menu" },
      filter: { type: "CheckBox" },
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

      editSettings: {
        showDeleteConfirmDialog: true,
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Normal",
      },
      editSettingsSelect: {
        showDeleteConfirmDialog: false,
        allowEditing: false,
        allowAdding: false,
        allowDeleting: false,
        mode: "Normal",
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
      Group,
      Edit,
      CommandColumn,
      Reorder,
    ],
  },
  mounted() {
    this.getDataBarang(0, 20);
    this.getDataGudang();
  },
  computed: {
    formTitleItemsbarang() {
      return this.editedIndex === -1 ? "Tambah barang" : "Pilih barang";
    },
  },
  watch: {
    dataGudang(val) {
      this.$emit("dataGudang", val);
    },
    title(ket) {
      if (ket == "Kosongkan") {
        this.childitembarangpo = [];
        this.hapus_items = [];
        this.childitembarangpo = [...this.childitembarangpo];
        // this.JumlahRules.max[1] = "Tidak Boleh Lebih dari Permintaan saat RPL";
      }
      // if (ket == "Ubah") {
      //   this.JumlahRules.max[1] =
      //     "Tidak Boleh Lebih dari Permintaan saat RPL / Tidak Boleh Kurang dari receive pembelian";
      // }
    },
    loadRpl(val) {
      // console.log('di anak', val)
      this.childitembarangpo = val.map((v) => {
        v.Jumlah = parseInt(v.Jumlah);
        v.Gudang = this.dataGudang.find((g) => g.Kode == v.Gudang).Nama;
        v.Diskon = v.Diskon1 == ".0000" ? 0 : v.Diskon1;
        v.Harga = v.Harga == ".0000" ? 0 : v.Harga;
        return v;
      });
      // console.log(this.childitembarangpo)
    },
    itembarangpo(val) {
      // console.log(val)
      this.childitembarangpo = val;
      // console.log('watchitem sblm di kirim', val)
      // this.childitembarangpo = this.itembarangpo
      // console.log('asdasd',this.itembarangpo)
      // this.childitembarangpo = [...this.childitembarangpo]
      // this.childpembayaran = this.pembayaran
      // this.childpembayaran = [...this.childpembayaran]
    },
    childitembarangpo(val) {
      // console.log('watchitem sblm di kirim', val)
      this.$emit("itemsPo", val);
    },
    // pembayaran(){
    //   this.DPp = this.childpembayaran[0].DPp
    //   this.ppnPersen = this.pembayaran[0].PPn
    //   this.TotalBayar = this.childpembayaran[0].TotalBayar
    // },
    verifPO: {
      handler() {
        if (this.verifPO == "Tidak") {
          this.itembarangpo = [];
          this.itembarangpo = this.tempbarang;
          this.$emit("SyncItemBarangPO", this.itembarangpo);
          this.verifPO = "";
        }
      },
    },
  },
  methods: {
    customValidationFn(args) {
      if (this.title == "Ubah") {
        if (
          parseInt(args.value) <= this.maxUpdateJumlah &&
          parseInt(args.value) >= parseInt(this.Terpenuhi)
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (parseInt(args.value) <= this.sisaRpl) {
          return true;
        } else {
          return false;
        }
      }
    },
    onActionComplete(args) {
      // console.log(args)
      if (args.requestType === "beginEdit") {
        // this.sisaRpl = args.rowData.JumlahSisa;
        // console.log(this.sisaRpl)
        // if (this.title == "Ubah") {
        //   // this.JumlahRules.max[1] = 'rrr'
        //   // console.log(this.JumlahRules)
        //   this.Terpenuhi = args.rowData.Terpenuhi;
        //   // this.sisaRpl = args.rowData.rpl.Jumlah - args.rowData.Jumlah
        //   // this.maxUpdateJumlah = args.rowData.rpl.Jumlah - parseInt(args.rowData.rpl.TerpenuhiPO) + parseInt(args.rowData.Jumlah)
        //   this.maxUpdateJumlah = args.rowData.maxUpdateJumlah;
        // }
        // console.log(args)
        // console.log(this.sisaRpl)
        if (args.form.elements.namedItem(this.setFocus.field) != null) {
          args.form.elements.namedItem(this.setFocus.field).focus();
        }
      }
      if (args.requestType === "delete") {
        args.data.forEach((d) => {
          if (d.KodeNota != undefined) {
            this.hapus_items.push(d);
          }
        });
        this.$emit("hapus_item", this.hapus_items);
      }
      // console.log('hps',this.hapus_items)
      if (args.requestType === "save") {
        let data = this.childitembarangpo;
        this.childitembarangpo = data.map((item) => {
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
    },

    onDoubleClick: function (args) {
      this.setFocus = args.column;
    },
    //pilih barang
    rowSelectedBarang: function () {
      // this.storeSelect = args.data
      this.storeSelect = this.$refs.ggs.ej2Instances.getSelectedRecords();
    },

    //simpan barang dari list
    accbarang() {
      this.childitembarangpo = [...this.childitembarangpo];
      if (this.childitembarangpo.length > 0) {
        if (this.storeSelect.length > 0) {
          this.storeSelect.forEach((e) => {
            const data = e;
            let barangExist = this.childitembarangpo.findIndex(
              (b) => b.Barang == data.Kode && b.Satuan == data.Satuan
            );
            if (barangExist != -1) {
              this.childitembarangpo[barangExist].Jumlah += 1;
              this.childitembarangpo[barangExist].SubTotal = parseFloat(
                this.childitembarangpo[barangExist].Jumlah *
                  parseFloat(
                    parseFloat(this.childitembarangpo[barangExist].Harga) -
                      parseFloat(this.childitembarangpo[barangExist].DiskonRp)
                  )
              );
            } else {
              data.Jumlah = 1;
              data.Gudang = "GUDANG EPA";
              data.Barang = data.Kode;
              console.log(data.Harga)
              data.Harga = data.Harga == null ? 0 : data.Harga;
              data.Diskon = 0;
              data.DiskonRp = 0;
              data.SubTotal = data.Harga == null ? 0 : data.Harga;
              this.childitembarangpo.push(data);
            }
          });
        } else {
          let barangExist = this.childitembarangpo.findIndex(
            (b) =>
              b.Barang == this.storeSelect.Kode &&
              b.Satuan == this.storeSelect.Satuan
          );
          if (barangExist != -1) {
            this.childitembarangpo[barangExist].Jumlah += 1;
            this.childitembarangpo[barangExist].SubTotal = parseFloat(
              this.childitembarangpo[barangExist].Jumlah *
                parseFloat(
                  parseFloat(this.childitembarangpo[barangExist].Harga) -
                    parseFloat(this.childitembarangpo[barangExist].DiskonRp)
                )
            );
          } else {
            this.storeSelect.Jumlah = 1;
            this.storeSelect.Barang = this.storeSelect.Kode;
            this.storeSelect.Harga =
              this.storeSelect.Harga == null ? 0 : this.storeSelect.Harga;
            this.storeSelect.Diskon = 0;
            this.storeSelect.Gudang = "GUDANG EPA";
            this.storeSelect.DiskonRp = 0;
            this.storeSelect.SubTotal =
              this.storeSelect.Harga == null ? 0 : this.storeSelect.Harga;
            this.childitembarangpo.push(this.storeSelect);
          }
        }
      } else {
        if (this.storeSelect.length != undefined) {
          // console.log('disini')
          this.storeSelect.forEach((e) => {
            const data = e;
            data.Barang = data.Kode;
            data.Harga = data.Harga == null ? 0 : data.Harga;
            data.Diskon = 0;
            data.Gudang = "GUDANG EPA";
            data.DiskonRp = 0;
            data.SubTotal = data.Harga == null ? 0 : data.Harga;
            data.Jumlah = 1;
            this.childitembarangpo.push(data);
          });
        } else {
          // console.log('disini')
          this.storeSelect.Barang = this.storeSelect.Kode;
          this.storeSelect.Jumlah = 1;
          this.storeSelect.Gudang = "GUDANG EPA";
          this.storeSelect.Harga =
            this.storeSelect.Harga == null ? 0 : this.storeSelect.Harga;
          this.storeSelect.Diskon = 0;
          this.storeSelect.DiskonRp = 0;
          this.storeSelect.SubTotal =
            this.storeSelect.Harga == null ? 0 : this.storeSelect.Harga;
          this.childitembarangpo.push(this.storeSelect);
        }
      }
      // console.log(this.childitembarangpo)
      this.childitembarangpo = [...this.childitembarangpo];
      this.dialogbarang = false;
    },

    closeDialogPilihItems() {
      this.dialogbarang = false;
    },

    setBarangPO() {
      // let x = JSON.parse(sessionStorage.getItem('itemspurchase'))
      //  this.itembarangpo = [...this.itembarangpo]
      //  this.itembarangpo = x
      this.$emit("SyncItemBarangPO", this.itembarangpo, this.pembayaran);
      // console.log('dari items',this.itembarangpo)
    },
    resetBarangPO() {
      this.hapus_items = [];
    },
    //ambil data Barang
    getDataBarang(skip, take, sort, filter) {
      api
        .get(
          "purchase-orders-barang?token=" +
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
            this.dataBarang = {
              result: res.data.result.map((p) => {
                p.Harga = p.Harga == null ? 0 : parseFloat(p.Harga);
                return p;
              }),
              count: res.data.count,
            };
          },
          (err) => {
            console.log(err);
          }
        );
    },
    getDataGudang() {
      api.get("purchase-orders-gudang?token=" + this.token).then(
        (res) => {
          this.dataGudang = res.data.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    // getDataBarang(){
    //   api.get('/barangs?token='+this.token).then(
    //     res=>{
    //       // console.log('brg',res)
    //       this.itembaranglist = res.data
    //     },
    //     err => {
    //       console.log(err)
    //       // this.$router.push('/')
    //       // this.localStorage.removeItem('token')
    //     }
    //   )

    // },
    dataStateChange: function (state) {
      if (state.action.requestType === "paging") {
        this.skip = state.skip;
        this.take = state.take;
        if (state.search != undefined) {
          api
            .get(
              "purchase-orders-barang?token=" +
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
          this.getDataBarang(
            state.skip,
            state.take,
            this.sorted != null ? this.sorted : undefined,
            this.filter != null ? this.filter : undefined
          );
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
              "purchase-orders-barang?token=" +
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
