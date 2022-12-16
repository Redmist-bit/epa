<template>
  <div v-resize="onResize">
    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>

    <div :class="mobile ? 'pa-3' : ''">
      <v-card tile outlined :class="mobile ? 'elevation-2 pa-2' : ''">
        <v-toolbar flat v-show="mobile == false">
          <v-toolbar-title class="text-h5">
            <strong>{{ $t("Gudang.MainTitle") }}</strong>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-toolbar
          dark
          v-show="mobile == true"
          flat
          dense
          color="blue darken-4"
        >
          <v-toolbar-title>
            {{ $t("Gudang.MainTitle") }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-dialog
            v-model="dialogGudang"
            scrollable
            persistent
            max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                v-bind="attrs"
                v-on="on"
                :disabled="btn_tambah"
                v-show="mobile == true"
                class="text-capitalize subtitle-1"
              >
                <v-icon left>mdi-plus-thick</v-icon>
                <span>{{ $t("Gudang.BtnTambah") }}</span>
              </v-btn>
            </template>

            <v-card class="rounded-lg">
              <v-toolbar dark flat outline color="blue darken-4">
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-spacer></v-spacer>

                <v-btn text fab small @click="closeDialogGudang">
                  <v-icon class="mx-1">mdi-window-close</v-icon>
                </v-btn>
              </v-toolbar>

              <v-divider></v-divider>

              <v-card-text>
                <div class="mt-8 mb-n3">
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
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          dense
                          disabled
                          v-model="editedItem.Kode"
                          label="Kode"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          dense
                          v-model="editedItem.Nama"
                          label="Nama"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          dense
                          clearable
                          v-model="editedItem.Alamat"
                          label="Alamat"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <!-- <v-autocomplete
                          dense
                          clearable
                          v-model="editedItem.Kota"
                          :items="namakota"
                          label="Kota">
                        </v-autocomplete> -->
                        <div style="margin-top: -16px">
                          <ejs-autocomplete
                            :maxlength="25"
                            label-size="18px"
                            floatLabelType="Auto"
                            :dataSource="namakota"
                            v-model="editedItem.Kota"
                            :placeholder="waterMark"
                          ></ejs-autocomplete>
                        </div>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          dense
                          clearable
                          v-model="editedItem.Memo"
                          label="Memo"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <v-switch
                          dense
                          class="mt-2"
                          color="blue darken-4"
                          v-model="editedItem.Aktif"
                          label="Aktif"
                        >
                        </v-switch>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
              </v-card-text>

              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn
                  outlined
                  @click="closeDialogGudang"
                  color="blue darken-4"
                >
                  <span>{{$t('Gudang.BtnBatal')}}</span>
                </v-btn> -->

                <v-btn
                  dark
                  depressed
                  @click="save"
                  color="blue darken-4"
                  class="mr-n2"
                >
                  <v-icon left>mdi-content-save</v-icon>
                  <span class="mr-1">{{ $t("All.BtnSimpan") }}</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>

        <v-divider></v-divider>

        <div id="app">
          <ejs-grid
            :dataSource="data"
            style="height: 100%"
            :height="mobile ? '43vh' : 'auto'"
            width="100%"
            gridLines="Both"
            :allowReordering="true"
            :editSettings="editSettings"
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
            :commandClick="commandClick"
            :rowDataBound="rowDataBound"
          >
            <e-columns>
              <e-column
                :visible="mobile"
                :allowFiltering="false"
                field="Commands"
                headerText="Aksi"
                width="105"
                textAlign="Center"
                :commands="commands"
                :lockColumn="true"
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
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Alamat"
                headerText="Alamat"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Kota"
                headerText="Kota"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Aktif"
                headerText="Aktif"
                textAlign="Center"
                displayAsCheckBox="true"
                width="110"
              ></e-column>

              <e-column
                :filter="filter"
                field="Memo"
                headerText="Memo"
                textAlign="Left"
                displayAsCheckBox="true"
                width="180"
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
import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
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

export default {
  components: {
    Loading,
  },
  data() {
    return {
      alert: "",
      pesan: "",
      ScrollKeAtas: false,
      mobile: null,
      windowSize: { x: 0, y: 0 },
      action: null,
      btn_tambah: true,
      isLoading: false,
      fullPage: true,
      namakota: [],
      waterMark: "Kota",
      editedIndex: -1,
      defaultItem: {
        Kode: "",
        Nama: "",
        Alamat: "",
        Kota: "",
        Aktif: true,
        Memo: "",
      },
      editedItem: {
        Kode: "",
        Nama: "",
        Alamat: "",
        Kota: "",
        Aktif: true,
        Memo: "",
      },
      dialogGudang: false,
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
        allowEditing: false,
        allowAdding: false,
        allowDeleting: true,
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
    //check actions
    if (this.action.some((a) => a == "R")) {
      this.getData();
      this.countKode();
      this.getKota();
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
    //get action for this page
    this.action = Object.assign(
      [],
      this.$route.params.action
        .replaceAll('"', "")
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll(",", "")
    );
  },

  // dataStateChange(state){
  //     console.log(state)
  // },
  watch: {
    "editedItem.Nama": function (params) {
      if (params == "") {
        this.pesan = "Nama Gudang tidak boleh kosong";
        this.alert = true;
      } else {
        this.alert = false;
      }
    },
    windowSize() {
      if (this.windowSize.x < 450) {
        this.titleClass = "d-none";
        this.mobile = false;
      } else {
        this.titleClass = "mr-4";
        this.mobile = true;
      }
    },

    dialogGudang(val) {
      val || this.closeDialogGudang();
    },
    data: {
      handler() {
        this.countKode();
      },
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? this.$t("Gudang.DialogTitleTambah")
        : this.$t("Gudang.DialogTitleEdit");
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

    save() {
      if (this.editedIndex == -1) {
        if (this.editedItem.Nama == "") {
          this.alert = true;
          this.pesan = "Nama Gudang tidak boleh kosong";
        } else {
          this.isLoading = true;
          this.TambahData();
        }
      } else {
        if (this.editedItem.Nama == "") {
          this.alert = true;
          this.pesan = "Nama Gudang tidak boleh kosong";
        } else {
          this.isLoading = true;
          this.UpdateData();
        }
      }
    },

    countKode() {
      const PT = "01";
      let cabang = "01";
      let x = "0000";
      let spacer = "/";
      let x0 = 1;
      let s0 = [];
      let totalKode = [];
      let hitungan = [];
      if (this.data.length > 0) {
        for (let index = 0; index < this.data.length; index++) {
          const element = this.data[index];
          s0.push(element);
          totalKode.push(s0[index].Kode);
          // totalKode.sort(function(a, b){return b-a})
          hitungan = parseInt(s0.length - 1);
        }
        let xsx = totalKode[hitungan];
        let xsx1 = xsx.slice(5, 9);
        let xsx2 = xsx1.replace(/^0+/, "");
        let desc = parseInt(xsx2) + 1;
        let r0 = (x + desc).slice(-x.length);
        this.editedItem.Kode = PT + cabang + spacer + r0;
      } else if (this.data.length == 0) {
        let yuklah = (x + x0).slice(-x.length);
        this.editedItem.Kode = PT + cabang + spacer + yuklah;
      }
    },

    TambahData() {
      api
        .post("/gudangs?token=" + this.token, {
          Kode: this.editedItem.Kode,
          Nama: this.editedItem.Nama,
          Alamat: this.editedItem.Alamat,
          Kota: this.editedItem.Kota,
          Aktif: this.editedItem.Aktif.toString(),
          Memo: this.editedItem.Memo,
        })
        .then((res) => {
          (this.isLoading = false), (this.Kode = "");
          this.Nama = "";
          this.Alamat = "";
          this.Kota = "";
          this.Aktif = "";
          this.Memo = "";
          console.log(res);
          this.getData();
          this.closeDialogGudang();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    UpdateData() {
      api
        .put("/gudangs/" + this.editedItem.id + "?token=" + this.token, {
          Kode: this.editedItem.Kode,
          Nama: this.editedItem.Nama,
          Alamat: this.editedItem.Alamat,
          Kota: this.editedItem.Kota,
          Aktif: this.editedItem.Aktif.toString(),
          Memo: this.editedItem.Memo,
        })
        .then((res) => {
          this.isLoading = false;
          this.Kode = "";
          this.Nama = "";
          this.Alamat = "";
          this.Kota = "";
          this.Aktif = "";
          this.Memo = "";
          console.log(res);
          this.getData();
          this.closeDialogGudang();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    closeDialogGudang() {
      this.alert = false;
      this.dialogGudang = false;
      this.editedItem = this.defaultItem;
      this.editedIndex = -1;
      // this.editedItem.Kota = this.namakota[0].Kota
      // this.defaultItem.Kota = this.namakota[0].Kota
      this.$nextTick(() => {
        // this.id = ''
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.countKode();
    },

    commandClick: function (args) {
      if (args.target.classList.contains("custombutton")) {
        // let tampung = []
        let data = JSON.stringify(args.rowData);
        // console.log(args);
        // alert(JSON.stringify(args.rowData));
        // console.log(JSON.stringify(args.rowData))
        // tampung.push(args.rowData)
        // this.editedItem = Object.assign({},data)
        console.log(data);
      } else if (args.target.classList.contains("Delete")) {
        var r = confirm("Yakin Hapus Data?");
        if (r == true) {
          api
            .delete("/gudangs/" + args.rowData.id + "?token=" + this.token)
            .then((res) => {
              // this.item.splice(index, 1)
              console.log(res);
              this.getData();
            })
            .catch((err) => {
              console.log(err);
            });
        }
        // let data = JSON.stringify(args.rowData)
        // console.log(data)
        // console.log(args)
      } else if (args.target.classList.contains("Edit")) {
        let data = args;
        this.editedIndex = 1;
        console.log(data);
        this.editedItem = data.rowData;
        this.dialogGudang = true;
      }
    },

    actionComplete(args) {
      // if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      //     let dialog = args.dialog;
      //     dialog.height = 400;
      //     // change the header of the dialog
      //     dialog.header = args.requestType === 'beginEdit' ? 'Edit Record' : 'New Record';
      // }
      console.log(args);
    },
    rowDataBound: function (args) {
      if (args.data.Aktif == "0") {
        args.row.classList.add("not-active");
      }
    },
    // customiseCell: function(args) {
    //     if (args.column.field === 'Kode' ||
    //         args.column.field === 'Nama' ||
    //         args.column.field === 'Alamat' ||
    //         args.column.field === 'Kota' ||
    //         args.column.field === 'Aktif' ||
    //         args.column.field === 'Memo' ||
    //         args.column.field === 'Commands'
    //         ) {
    //     if (args.data['Aktif'] == 0) {
    //           args.cell.classList.add('TidakAktif');
    //       }
    //     }
    //   },
    getBool(x) {
      // if (x == 1) {
      //   x = 'true'
      // }else{
      //   x = 'false'
      // }
      return !!String(x).toLowerCase().replace(!!0, "");
    },

    getKota() {
      api.get("/search?token=" + this.token).then((res) => {
        this.namakota = res.data.kota;
        // console.log(this.namakota)
        // this.editedItem.Kota = this.namakota[0]
        // this.defaultItem.Kota = this.namakota[0]
      });
    },

    getData() {
      this.isLoading = true;
      api.get("/gudangs?token=" + this.token).then(
        (res) => {
          this.isLoading = false;
          let x = [];
          // console.log(res)
          this.data = res.data;
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            element.Aktif = this.getBool(element.Aktif);
            x.push(element);
          }
        },
        (err) => {
          console.log(err);
          this.$router.push("/login");
          localStorage.removeItem("token");
        }
      );
    },
  },
};
</script>

<style>
.e-grid .e-groupdroparea.e-grouped {
  background-color: rgb(25, 118, 210);
}
.e-grid .e-groupheadercell {
  background-color: rgb(29, 79, 129);
}

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
