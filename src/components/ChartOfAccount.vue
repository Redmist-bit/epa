<template>
  <div v-resize="onResize">
    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>

    <div :class="mobile ? 'pa-3' : ''">
      <v-card
        tile
        outlined
        :class="mobile ? 'elevation-2 pa-2' : ''"
        :style="mobile ? '' : 'margin-bottom: 90px;'"
      >
        <v-toolbar flat v-show="mobile == false">
          <v-toolbar-title class="text-h5">
            <strong>{{ $t("Coa.MainTitle") }}</strong>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-toolbar
          flat
          dark
          dense
          color="blue darken-4"
          v-show="mobile == true"
        >
          <v-toolbar-title dark>
            {{ $t("Coa.MainTitle") }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" scrollable persistent max-width="700px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                v-bind="attrs"
                v-on="on"
                :disabled="btn_tambah"
                class="text-capitalize subtitle-1"
              >
                <v-icon left>mdi-plus-thick</v-icon>
                <span>{{ $t("All.BtnTambah") }}</span>
              </v-btn>
            </template>
            <v-card class="rounded-lg">
              <v-toolbar dark flat color="blue darken-4">
                <v-toolbar-title>
                  <span>{{ formTitle }}</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn icon @click="close">
                  <v-icon>mdi-window-close</v-icon>
                </v-btn>
              </v-toolbar>

              <v-card-text class="mt-6">
                <v-container>
                  <v-row>
                    <v-snackbar
                      v-model="alert"
                      rounded="lg"
                      top
                      color="error"
                      :value="true"
                      :timeout="-1"
                    >
                      <span
                        ><v-icon left>mdi-alert-circle</v-icon>{{ pesan }}
                        <v-icon @click="alert = false" style="float: right"
                          >mdi-close</v-icon
                        ></span
                      >
                    </v-snackbar>
                    <v-col cols="18" sm="10" md="6">
                      <v-text-field
                        v-model="editedItem.Kode"
                        label="Kode"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="18" sm="10" md="6">
                      <v-text-field
                        v-model="editedItem.Nama"
                        label="Nama"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="10" md="12">
                        <v-text-field v-model="editedItem.Deskripsi" label="Deskripsi" hint="Isi Deskripsi" ></v-text-field>
                    </v-col> -->
                    <!-- <v-col cols="18" sm="10" md="6">
                        <v-text-field v-model="editedItem.AccNo" label="AccNo"></v-text-field>
                    </v-col> -->
                    <v-col cols="18" sm="10" md="12">
                      <v-text-field
                        v-model="editedItem.Memo"
                        label="Memo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="18" sm="10" md="4">
                      <v-switch
                        v-model="editedItem.Aktif"
                        color="blue darken-4"
                        true-value="1"
                        false-value="0"
                        label=" Aktif "
                      ></v-switch>
                    </v-col>
                    <v-col cols="18" sm="10" md="4">
                      <v-switch
                        v-model="editedItem.IsDetail"
                        color="blue darken-4"
                        true-value="1"
                        false-value="0"
                        label="isDetail "
                      ></v-switch>
                    </v-col>
                    <v-col cols="18" sm="10" md="4">
                      <v-switch
                        v-model="editedItem.Sifat"
                        color="blue darken-4"
                        true-value="1"
                        false-value="0"
                        label="Sifat "
                      ></v-switch>
                    </v-col>
                    <!-- <v-col cols="18" sm="10" md="4">
                    <v-radio-group
                    class="mt-n2"
                    dense
                    v-model="editedItem.Sifat"
                    mandatory
                    >
                    <v-radio
                        label="Debit"
                        value="1"
                        color="blue darken-4"
                    ></v-radio>
                    <v-radio
                        label="Kredit"
                        value="0"
                        color="blue darken-4"
                    ></v-radio>
                    </v-radio-group>
                        <v-switch v-model="editedItem.sifat" color="blue darken-4" true-value="1" false-value="0" label="Debit / Kredit "></v-switch>
                    </v-col> -->
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn
                  dark
                  color="error"
                  @click="close">
                  <v-icon class="mr-1">mdi-close-circle</v-icon>Batal
                </v-btn> -->
                <v-btn dark color="blue darken-4" @click="save">
                  <v-icon class="mr-1">mdi-content-save</v-icon
                  >{{ $t("All.BtnSimpan") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>

        <div id="app">
          <ejs-grid
            :dataSource="data"
            gridLines="Both"
            style="height: 100%"
            :height="mobile ? '43vh' : 'auto'"
            width="100%"
            :allowReordering="true"
            :selectionSettings="selectionOptions"
            :allowGrouping="mobile"
            :groupSettings="groupSettings"
            :allowSorting="true"
            :allowMultiSorting="true"
            :allowFiltering="mobile"
            :filterSettings="filterOptions"
            :allowResizing="true"
            :allowPaging="true"
            :pageSettings="pageSettings"
            :toolbar="toolbarOptions"
            :rowDataBound="rowDataBound"
            :commandClick="commandClick"
            @actionComplete="actioncomplete"
          >
            <e-columns>
              <e-column
                :visible="mobile"
                :allowFiltering="false"
                field="Commands"
                headerText="Action"
                width="120"
                textAlign="center"
                :commands="commands"
              >
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-default"
                    (click)="prediemRowEdit($event)"
                  >
                    <i class="fa fa-pencil"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-default"
                    (click)="prediemRowDelete($event)"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </e-column>

              <e-column
                :filter="filter"
                field="Kode"
                headerText="Kode"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Nama"
                headerText="Nama"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="IsDetail"
                displayAsCheckBox="true"
                headerText="IsDetail"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Sifat"
                displayAsCheckBox="true"
                headerText="Sifat"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Aktif"
                displayAsCheckBox="true"
                headerText="Aktif"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="AccNo"
                headerText="AccNo"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Memo"
                headerText="Memo"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Deskripsi"
                headerText="Deskripsi "
                width="250"
              ></e-column>
            </e-columns>
          </ejs-grid>
        </div>
      </v-card>
    </div>

    <v-fab-transition>
      <v-btn
        color="grey darken-4"
        v-scroll="onScroll"
        v-show="ScrollKeAtas && mobile == false"
        fab
        dark
        fixed
        bottom
        right
        @click="toTop"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { AutoCompletePlugin } from "@syncfusion/ej2-vue-dropdowns";
import { DataManager, Query, JsonAdaptor } from "@syncfusion/ej2-data";
import Vue from "vue";
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
import api from "../services/http";
Vue.use(GridPlugin);
Vue.use(AutoCompletePlugin);
export default {
  components: {
    Loading,
  },
  data() {
    return {
      alert: false,
      pesan: "",
      ScrollKeAtas: false,
      mobile: null,
      windowSize: { x: 0, y: 0 },
      action: null,
      btn_tambah: true,
      fullPage: true,
      isLoading: false,
      waterMarkAs: "Asuransi",
      waterMark: "Kota",
      city: null,
      asuransi: [],
      MenuTanggal: false,
      SelectKota: [],
      toggle: false,
      alldata: [],
      resultKota: [],
      kota: "",
      date: new Date().toISOString().substr(0, 10),
      itemsBadanHukum: ["PT", "CV", "UD", "-"],
      editedIndex: -1,
      defaultItem: {
        Kode: JSON.parse(localStorage.getItem("user")).Kode.substring(0, 5),
        Nama: "",
        // Deskripsi: "",
        // AccNo: "",
        Memo: "",
        Aktif: "1",
        IsDetail: "1",
        Sifat: "1",
      },
      editedItem: {
        Kode: JSON.parse(localStorage.getItem("user")).Kode.substring(0, 5),
        Nama: "",
        // Deskripsi: "",
        // AccNo: "",
        Memo: "",
        Aktif: "1",
        IsDetail: "1",
        Sifat: "1",
      },
      dialog: false,
      token: localStorage.getItem("token"),
      data: [],
      commands: [],
      groupSettings: { allowReordering: true },
      selectionOptions: { type: "Multiple" },
      toolbarOptions: ["Search"],
      pageSettings: { pageSize: 20, pageSizes: ["20", "50", "100"] },
      filterOptions: { type: "Menu" },
      filter: { type: "CheckBox" },
      editSettings: {
        showDeleteConfirmDialog: true,
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Dialog",
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
    // console.log(this.token)
    // check actions
    if (this.action.some((a) => a == "R")) {
      // this.autoTanggal();
      this.getData();
    }
    if (this.action.some((a) => a == "C")) {
      this.btn_tambah = false;
    }
    if (this.action.some((a) => a == "U")) {
      this.commands.push({
        title: "Edit",
        buttonOption: { cssClass: "e-flat Edit", iconCss: "e-edit e-icons" },
      });
    }
    if (this.action.some((a) => a == "D")) {
      this.commands.push({
        title: "Hapus",
        buttonOption: {
          cssClass: "e-flat Delete",
          iconCss: "e-delete e-icons",
        },
      });
    }
  },
  created() {
    // get actions for this page
    this.action = Object.assign(
      [],
      this.$route.params.action
        .replaceAll('"', "")
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll(",", "")
    );
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

    dialog(val) {
      val || this.close();
    },
    // data:{
    // handler(){
    //     this.countKode()
    // }
    // },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah COA" : "Ubah COA";
    },
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.ScrollKeAtas = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },

    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },

    rowDataBound: function (args) {
      if (args.data.Aktif == "0") {
        args.row.classList.add("not-active");
      }
    },
    getBool(x) {
      if (x == 1) {
        x = "true";
      } else {
        x = "false";
      }
      return !!String(x).toLowerCase().replace(!!0, "");
    },
    GetUniqueTablesCategory() {
      for (let i = 0; i < this.data.length; i++) {
        if (this.asuransi.indexOf(this.data[i].Nama) === -1) {
          this.asuransi.push(this.data[i].Nama);
        }
      }
    },
    autoTanggal() {
      this.editedItem.CustSince = this.date;
    },
    save() {
      if (this.editedIndex == -1) {
        if (this.editedItem.Kode == "") {
          this.alert = true;
          this.pesan = "Kode tidak boleh kosong";
        } else if (this.editedItem.Nama == "") {
          this.alert = true;
          this.pesan = "Nama tidak boleh kosong";
        } else {
          this.TambahData();
        }
      } else {
        if (this.editedItem.Kode == "") {
          this.alert = true;
          this.pesan = "Kode tidak boleh kosong";
        } else if (this.editedItem.Nama == "") {
          this.alert = true;
          this.pesan = "Nama tidak boleh kosong";
        } else {
          this.UpdateData();
        }
      }
    },

    UpdateData() {
      this.isLoading = true;
      api
        .put("/coa/" + this.editedItem.id + "?token=" + this.token, {
          Kode: this.editedItem.Kode,
          Nama: this.editedItem.Nama,
          Memo: this.editedItem.Memo,
          // AccNo: this.editedItem.AccNo,
          // Deskripsi: this.editedItem.Deskripsi,
          Aktif: this.editedItem.Aktif,
          IsDetail: this.editedItem.IsDetail,
          Sifat: this.editedItem.Sifat,
        })
        .then((res) => {
          this.id = "";
          this.isLoading = false;
          this.close();
          console.log(res);
          this.getData();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    TambahData() {
      let cekKode = this.data.findIndex((p) => p.Kode == this.editedItem.Kode);
      if (cekKode != -1) {
        this.alert = true;
        this.pesan =
          "Kode tidak boleh sama '" +
          this.editedItem.Kode +
          "' adalah kode untuk " +
          this.data[cekKode].Nama;
      } else {
        this.isLoading = true;
        api
          .post("/coa?token=" + this.token, {
            Kode: this.editedItem.Kode,
            Nama: this.editedItem.Nama,
            Memo: this.editedItem.Memo,
            // AccNo: this.editedItem.AccNo,
            // Deskripsi: this.editedItem.Deskripsi,
            Aktif: this.editedItem.Aktif,
            IsDetail: this.editedItem.IsDetail,
            Sifat: this.editedItem.Sifat,
          })
          .then((res) => {
            this.isLoading = false;
            this.Kode = "";
            this.Nama = "";
            this.Memo = "";
            // this.AccNo = ''
            // this.Deskripsi = ''
            this.Aktif = "";
            this.IsDetail = "";
            this.Sifat = "";
            console.log(res);
            this.close();
            this.getData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    close() {
      // this.autoTanggal();
      this.alert = false;
      this.kota = "";
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.editedItem = this.defaultItem;
      this.dialog = false;
      this.resultKota = [];
      this.editedIndex = -1;
      // this.countKode()
    },

    commandClick: function (args) {
      if (args.target.classList.contains("custombutton")) {
        // let data = JSON.stringify(args.rowData)
        // console.log(data)
      } else if (args.target.classList.contains("Delete")) {
        var r = confirm("Yakin Hapus Data?");
        if (r == true) {
          api
            .delete("/coa/" + args.rowData.id + "?token=" + this.token)
            .then(() => {
              // console.log(res)
              this.getData();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else if (args.target.classList.contains("Edit")) {
        // console.log(args)
        this.editedIndex = 1;
        this.kota = args.rowData.Kota;
        this.editedItem = args.rowData;
        this.editedItem.Aktif = args.rowData.Aktif == true ? "1" : "0";
        this.editedItem.IsDetail = args.rowData.IsDetail == true ? "1" : "0";
        this.editedItem.Sifat = args.rowData.Sifat == true ? "1" : "0";
        this.dialog = true;
      }
    },

    actioncomplete(args) {
      if (
        args.requestType == "refresh" &&
        !args.rows &&
        this.alldata.length != 0
      ) {
        let items = new DataManager({
          json: this.alldata,
          adaptor: new JsonAdaptor(),
        }).executeLocal(new Query().skip(0));
        this.data = items;
        this.GetUniqueTablesCategory();
      }
    },

    getData() {
      this.isLoading = true;
      api
        .get("/coa", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then(
          (res) => {
            this.data =
              res.data == undefined
                ? []
                : res.data.map((element) => {
                    return {
                      id: element.id,
                      Kode: element.Kode,
                      Nama: element.Nama,
                      IsDetail: element.IsDetail,
                      Sifat: element.Sifat,
                      Aktif: element.Aktif,
                      Memo: element.Memo,
                      AccNo: element.Kode.substring(5, 13),
                      Deskripsi: element.Nama,
                    };
                  });
            // let x = []

            // for (let index = 0; index < res.data.length; index++) {
            // const element = res.data[index];
            // element.Aktif = this.getBool(element.Aktif)
            // x.push(element)
            // }
            // let items = new DataManager({
            //     json: res.data,
            //     adaptor: new JsonAdaptor }).executeLocal(new Query().take(0))
            // this.data = items
            // this.alldata = x
            this.isLoading = false;
          },
          (err) => {
            console.log(err);
            this.$router.push("/");
            localStorage.removeItem("token");
          }
        );
    },
  },
};
</script>

<style>
.e-float-input.e-control-wrapper.e-input-group:not(.e-float-icon-left)
  .e-float-line::after {
  background: #1976d2;
}

.e-float-input.e-control-wrapper.e-input-group:not(.e-float-icon-left)
  .e-float-line::before {
  background: #1976d2;
}
.e-float-input.e-control-wrapper:not(.e-error).e-input-focus
  input
  ~ label.e-float-text {
  color: #1976d2;
  /* caret-color: #1976D2 im !important; */
}

label.e-float-text,
.e-float-input label.e-float-text,
.e-float-input.e-control-wrapper label.e-float-text,
.e-float-input:not(.e-input-focus)
  input:not(:focus):valid
  ~ label.e-float-text.e-label-bottom,
.e-float-input.e-control-wrapper:not(.e-input-focus)
  input:not(:focus):valid
  ~ label.e-float-text.e-label-bottom {
  font-size: 16px;
}
.e-grid .e-groupdroparea.e-grouped {
  background-color: rgb(25, 118, 210);
}
.e-grid .e-groupheadercell {
  background-color: rgb(29, 79, 129);
}
</style>
