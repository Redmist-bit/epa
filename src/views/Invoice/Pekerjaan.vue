<template>
  <v-col cols="12" md="12" v-resize="onResize">
    <v-toolbar
      flat
      dark
      dense
      outlined
      color="white"
      class="elevation-5"
      v-show="mobile == true"
    >
      <v-dialog v-model="dialog" max-width="1000px" persistent>
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
              <span class="headline">Pekerjaan</span>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn dark text fab small @click="dialog = false">
              <v-icon class="mx-1">mdi-window-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-col cols="12" md="12">
            <v-card>
              <ejs-grid
                id="Grid"
                ref="ggs"
                :dataSource="dataPekerjaan"
                height="250"
                width="100%"
                gridLines="Both"
                :allowReordering="true"
                :selectionSettings="selectionOptions"
                :allowResizing="true"
                :allowPaging="true"
                :pageSettings="pageSettings"
                :toolbar="toolbarOptionsSelect"
                :rowSelected="rowSelectedPekerjaan"
              >
                <e-columns>
                  <e-column
                    field="Kode"
                    headerText="Kode"
                    textAlign="Left"
                    width="180"
                  >
                  </e-column>

                  <e-column field="Nama" headerText="Nama" width="250">
                  </e-column>

                  <e-column
                    field="GrupPekerjaan"
                    headerText="Grup Pekerjaan"
                    width="170"
                  >
                  </e-column>

                  <e-column
                    field="GrupKendaraan"
                    headerText="Grup Kendaraan"
                    width="170"
                  >
                  </e-column>

                  <e-column
                    field="HargaJualDefault"
                    headerText="Harga Jual Default"
                    width="170"
                  >
                  </e-column>

                  <e-column
                    field="HargaBeliDefault"
                    headerText="Harga Beli Default"
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
            <v-btn dark color="blue darken-4" @click="PilihPekerjaan">
              <v-icon class="mr-1">mdi-check</v-icon>Pilih
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-card color="grey lighten-3" class="pa-2 rounded-lg elevation-0">
      <!-- grid items Pekerjaan Ipo -->
      <ejs-grid
        :dataSource="listPekerjaan"
        height="200"
        width="100%"
        gridLines="Both"
        :groupSettings="groupSettings"
        :editSettings="editSettings"
        :recordDoubleClick="onDoubleClick"
        @actionComplete="onActionComplete"
        :filterSettings="filterOptions"
        :allowReordering="true"
        :allowGrouping="true"
        :allowSorting="true"
        :allowMultiSorting="true"
        :allowResizing="true"
        :allowPaging="true"
      >
        <e-columns>
          <e-column
            field="JenisPekerjaan"
            headerText="Jenis Pekerjaan"
            :isPrimaryKey="true"
            width="180"
            :allowEditing="false"
          >
          </e-column>

          <e-column
            field="Perkiraan"
            headerText="Perkiraan"
            :edit="dopdownPerkiraan"
            width="220"
            editType="dropdownedit"
          >
          </e-column>

          <e-column
            field="Keterangan"
            :allowEditing="false"
            headerText="Keterangan"
            width="170"
          >
          </e-column>

          <e-column
            field="Jumlah"
            headerText="Jumlah"
            width="170"
            textAlign="Right"
          >
          </e-column>

          <e-column
            field="Rasio"
            :allowEditing="false"
            headerText="Rasio"
            width="170"
          >
          </e-column>

          <e-column
            field="Harga"
            type="number"
            format="N"
            textAlign="Right"
            headerText="Harga"
            width="170"
          >
          </e-column>

          <e-column field="Diskon" headerText="Diskon (%)" width="170">
          </e-column>

          <e-column
            field="DiskonRp"
            type="number"
            format="N"
            :allowEditing="false"
            textAlign="Right"
            headerText="Diskon (Rp)"
            width="170"
          >
          </e-column>

          <e-column
            field="SubTotal"
            type="number"
            format="N"
            :allowEditing="false"
            textAlign="Right"
            headerText="SubTotal"
            width="170"
          >
          </e-column>
        </e-columns>

        <e-aggregates>
          <e-aggregate>
            <e-columns>
              <e-column type="Count" field="JenisPekerjaan"></e-column>
              <e-column type="Sum" format="N" field="SubTotal"></e-column>
            </e-columns>
          </e-aggregate>
        </e-aggregates>
      </ejs-grid>
    </v-card>
  </v-col>
</template>

<script>
import Vue from "vue";
import api from "../../services/http";
let elementPerkiraan, perkiraanObj;
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
Vue.use(GridPlugin);
export default {
  props: {
    title: String,
    perkiraan: Array,
    loadEstimasiPekerjaan: Array,
  },
  data() {
    return {
      mobile: null,
      windowSize: { x: 0, y: 0 },
      editSettings: {
        showDeleteConfirmDialog: true,
        allowEditing: true,
        allowAdding: false,
        allowDeleting: true,
        mode: "Normal",
      },
      dopdownPerkiraan: {
        create: () => {
          elementPerkiraan = document.createElement("input");
          return elementPerkiraan;
        },
        read: () => {
          return perkiraanObj.text;
        },
        destroy: () => {
          perkiraanObj.destroy();
        },
        write: (w) => {
          if (w.rowData.Perkiraan != null || w.rowData.Perkiraan != "") {
            perkiraanObj = new DropDownList({
              dataSource: this.perkiraan,
              fields: { value: "Kode", text: "Nama" },
              value: w.rowData.Kode,
              text: w.rowData.Nama,
              change: (d) => {
                console.log("d gada isi", d);
              },
              placeholder: "Select a Gudang tujuan",
              floatLabelType: "Never",
            });
          } else {
            perkiraanObj = new DropDownList({
              dataSource: this.perkiraan,
              fields: { value: "Kode", text: "Nama" },
              value: w.rowData.Kode,
              text: w.rowData.Nama,
              change: (d) => {
                console.log("d", d);
              },
              placeholder: "Select a perkiraan",
              floatLabelType: "Never",
            });
          }
          perkiraanObj.appendTo(elementPerkiraan);
        },
        // actionBegin: onbegin,
      },
      dialog: false,
      selectionOptions: { type: "Multiple" },
      pageSettings: { pageSizes: ["5", "10", "20", "50"] },
      filterOptions: { type: "Menu" },
      token: localStorage.getItem("token"),
      filter: { type: "CheckBox" },
      toolbarOptionsSelect: ["Search"],
      groupSettings: { allowReordering: true },
      listPekerjaan: [],
      hapus_items: [],
      pekerjaanSelected: [],
      dataPekerjaan: [],
      // dataPerkiraan:[],
      setFocus: null,
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
  watch: {
    windowSize() {
      if (this.windowSize.x < 450) {
        this.titleClass = "d-none";
        this.mobile = false;
      } else {
        this.titleClass = "mr-4";
        this.mobile = true;
      }
    },

    loadEstimasiPekerjaan(val) {
      this.listPekerjaan = val;
      console.log(val);
    },
    title(ket) {
      if (ket == "Kosongkan") {
        this.listPekerjaan = [];
        this.listPekerjaan = [...this.listPekerjaan];
        this.hapus_items = [];
      }
    },
    listPekerjaan(val) {
      this.$emit("itemsKerja", val);
    },
  },
  mounted() {
    // console.log(this.dataPerkiraan)
    // this.getPerkiraan()
    this.getDataPekerjaan();
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },

    PilihPekerjaan() {
      this.listPekerjaan = [...this.listPekerjaan];
      if (this.listPekerjaan.length > 0) {
        if (this.pekerjaanSelected.length != undefined) {
          this.pekerjaanSelected.forEach((element) => {
            const data = element;
            let pekerjaanExist = this.listPekerjaan.findIndex(
              (b) => b.Pekerjaan == data.Kode
            );
            if (pekerjaanExist != -1) {
              this.listPekerjaan[pekerjaanExist].Jumlah += 1;
              this.listPekerjaan[pekerjaanExist].SubTotal = parseFloat(
                this.listPekerjaan[pekerjaanExist].Jumlah *
                  parseFloat(
                    parseFloat(this.listPekerjaan[pekerjaanExist].Harga) -
                      parseFloat(this.listPekerjaan[pekerjaanExist].DiskonRp)
                  )
              );
            } else {
              data.Pekerjaan = data.Kode;
              data.Jumlah = 1;
              data.Rasio = 1;
              data.Diskon = 0;
              data.Perkiraan = "";
              data.DiskonRp = 0;
              data.JenisPekerjaan = data.Nama;
              data.Keterangan = "";
              data.Harga = data.HargaJualDefault;
              data.SubTotal = data.HargaJualDefault;
              this.listPekerjaan.push(data);
            }
          });
        } else {
          let pekerjaanExist = this.listPekerjaan.findIndex(
            (b) => b.Pekerjaan == this.pekerjaanSelected.Kode
          );
          if (pekerjaanExist != -1) {
            this.listPekerjaan[pekerjaanExist].Jumlah += 1;
            this.listPekerjaan[pekerjaanExist].SubTotal = parseFloat(
              this.listPekerjaan[pekerjaanExist].Jumlah *
                parseFloat(
                  parseFloat(this.listPekerjaan[pekerjaanExist].Harga) -
                    parseFloat(this.listPekerjaan[pekerjaanExist].DiskonRp)
                )
            );
          } else {
            this.pekerjaanSelected.Pekerjaan = this.pekerjaanSelected.Kode;
            this.pekerjaanSelected.JenisPekerjaan = this.pekerjaanSelected.Nama;
            this.pekerjaanSelected.Jumlah = 1;
            this.pekerjaanSelected.Rasio = 1;
            this.pekerjaanSelected.Perkiraan = "";
            this.pekerjaanSelected.Harga =
              this.pekerjaanSelected.HargaJualDefault;
            this.pekerjaanSelected.Diskon = 0;
            this.pekerjaanSelected.DiskonRp = 0;
            this.pekerjaanSelected.SubTotal =
              this.pekerjaanSelected.HargaJualDefault;
            console.log("disini", this.pekerjaanSelected);
            this.listPekerjaan.push(this.pekerjaanSelected);
          }
        }
      } else {
        if (this.pekerjaanSelected.length != undefined) {
          this.pekerjaanSelected.forEach((element) => {
            const data = element;
            data.Pekerjaan = data.Kode;
            data.JenisPekerjaan = data.Nama;
            data.Keterangan = "";
            data.Harga = data.HargaJualDefault;
            data.Diskon = 0;
            data.Perkiraan = "";
            data.DiskonRp = 0;
            data.SubTotal = data.HargaJualDefault;
            data.Jumlah = 1;
            data.Rasio = 1;
            this.listPekerjaan.push(data);
          });
        } else {
          this.pekerjaanSelected.Pekerjaan = this.pekerjaanSelected.Kode;
          this.pekerjaanSelected.JenisPekerjaan = this.pekerjaanSelected.Nama;
          this.pekerjaanSelected.Jumlah = 1;
          this.pekerjaanSelected.Rasio = 1;
          this.pekerjaanSelected.Harga =
            this.pekerjaanSelected.HargaJualDefault;
          this.pekerjaanSelected.Diskon = 0;
          this.pekerjaanSelected.Perkiraan = "";
          this.pekerjaanSelected.DiskonRp = 0;
          this.pekerjaanSelected.SubTotal =
            this.pekerjaanSelected.HargaJualDefault;
          this.pekerjaanSelected.Keterangan = "";
          this.listPekerjaan.push(this.pekerjaanSelected);
        }
      }
      this.listPekerjaan = [...this.listPekerjaan];
      this.dialog = false;
    },
    rowSelectedPekerjaan() {
      this.pekerjaanSelected = this.$refs.ggs.ej2Instances.getSelectedRecords();
    },
    getDataPekerjaan() {
      api.get("estimasi-pekerjaan?token=" + this.token).then(
        (res) => {
          this.dataPekerjaan = res.data.pekerjaan;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    onDoubleClick: function (args) {
      console.log(args);
      this.setFocus = args.column;
    },
    onActionComplete(args) {
      console.log(args);
      if (args.requestType === "beginEdit") {
        args.form.elements.namedItem(this.setFocus.field).focus();
      }
      if (args.requestType === "save") {
        let data = this.listPekerjaan;
        console.log("diAction", data);
        this.listPekerjaan = data.map((item) => {
          item.Perkiraan =
            item.Perkiraan == null
              ? args.previousData.Perkiraan
              : item.Perkiraan;
          item.DiskonRp =
            (parseFloat(item.Harga) * parseFloat(item.Diskon)) / 100;
          item.SubTotal =
            item.Jumlah *
            (parseFloat(item.Harga) -
              (parseFloat(item.Harga) * parseFloat(item.Diskon)) / 100);
          return item;
        });
      }
      if (args.requestType === "delete" && this.title == "Ubah") {
        console.log(args.data[0]);
        if (
          args.data[0].KodeNota != undefined &&
          args.data[0].NoUrut != undefined
        ) {
          this.hapus_items.push({
            Pekerjaan: args.data[0].Pekerjaan,
            KodeNota: args.data[0].KodeNota,
            NoUrut: args.data[0].NoUrut,
          });
        }
        this.$emit("hpsPekerjaan", this.hapus_items);
      }
    },
    // getPerkiraan(){
    //   api.get('invoice-perkiraan?token='+this.token).then(
    //     res => {
    //       this.dataPerkiraan = res.data.map(element => {
    //         return {
    //           id : element.id,
    //           Kode : element.Kode,
    //           Nama : element.Nama,
    //           IsDetail : element.IsDetail,
    //           Sifat : element.Sifat,
    //           Aktif : element.Aktif,
    //           Memo : element.Memo,
    //           AccNo : element.Kode.substring(5,13),
    //           Deskripsi : element.Nama
    //         }
    //       })
    //       this.$emit('perkiraan',this.dataPerkiraan)
    //     },
    //     err => {
    //       console.log(err)
    //     }
    //   )
    // },
  },
};
</script>

<style></style>
