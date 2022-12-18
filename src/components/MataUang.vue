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
            <strong>{{ $t("Uang.MainTitle") }} </strong>
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
          <v-toolbar-title dark>{{ $t("Uang.MainTitle") }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-dialog
            v-model="dialogMataUang"
            scrollable
            max-width="400px"
            persistent
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                v-bind="attrs"
                v-on="on"
                :disabled="btn_tambah"
                class="text-capitalize subtitle-1"
              >
                <v-icon left>mdi-plus-thick</v-icon>
                <span>{{ $t("All.BtnTambah") }} </span>
              </v-btn>
            </template>

            <v-card class="rounded-lg">
              <v-toolbar flat dark outline color="blue darken-4">
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-spacer></v-spacer>
                <v-btn dark text fab small @click="closeDialogMataUang()">
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
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          dense
                          v-model="editedItem.Kode"
                          label="Kode"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          dense
                          v-model="editedItem.Nama"
                          label="Nama"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="12">
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
                  dark
                  color="error"
                  @click="dialogMataUang">
                  <v-icon class="mr-1">mdi-close-circle</v-icon>Batal
                </v-btn> -->
                <v-btn
                  dark
                  depressed
                  @click="save"
                  color="blue darken-4"
                  class="mr-n2"
                >
                  <v-icon left>mdi-content-save</v-icon>
                  <span class="mr-1">{{ $t("All.BtnSimpan") }} </span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>

        <div id="app">
          <ejs-grid
            :dataSource="DataMataUang"
            width="100%"
            gridLines="Both"
            :height="mobile ? 'auto' : 'auto'"
            :allowReordering="true"
            :editSettings="editSettings"
            :selectionSettings="selectionOptions"
            :allowSorting="true"
            :allowMultiSorting="true"
            :allowFiltering="true"
            :rowDataBound="rowDataBound"
            :filterSettings="filterOptions"
            :allowResizing="true"
            :allowPaging="true"
            :pageSettings="pageSettings"
            :toolbar="toolbarOptions"
            :commandClick="commandClick"
          >
            <e-columns>
              <e-column
                :visible="mobile"
                :allowFiltering="false"
                field="Commands"
                headerText="Aksi"
                width="120"
                :commands="commands"
                textAlign="Center"
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
                field="Aktif"
                headerText="Aktif"
                textAlign="Center"
                displayAsCheckBox="true"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiBuatTgl"
                headerText="DiBuatTgl"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiBuatOleh"
                headerText="DiBuatOleh"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiUbahTgl"
                headerText="DiUbahTgl"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiUbahOleh"
                headerText="DiUbahOleh"
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
      pesan: "",
      alert: "",
      ScrollKeAtas: false,
      mobile: null,
      windowSize: { x: 0, y: 0 },
      isLoading: false,
      fullPage: true,

      editedIndex: -1,
      defaultItem: {
        Kode: "",
        Nama: "",
        Aktif: true,
      },
      editedItem: {
        Kode: "",
        Nama: "",
        Aktif: true,
      },
      dialogMataUang: false,
      token: localStorage.getItem("token"),
      DataMataUang: [],
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
        mode: "Normal",
      },
      action: null,
      btn_tambah: true,
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
    // this.getData()
    if (this.action.some((a) => a == "R")) {
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
    "editedItem.Nama": function (params) {
      if (params == "") {
        this.pesan = "Nama Mata Uang tidak boleh kosong";
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

    dialogMataUang(val) {
      val || this.closeDialogMataUang();
    },
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Mata Uang" : "Ubah Mata Uang";
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
    save() {
      if (this.editedIndex == -1) {
        if (this.editedItem.Kode == "") {
          this.alert = true;
          this.pesan = "Kode Mata Uang tidak boleh kosong";
        } else if (this.editedItem.Nama == "") {
          this.alert = true;
          this.pesan = "Nama Mata Uang tidak boleh kosong";
        } else {
          this.isLoading = true;
          this.TambahData();
        }
      } else {
        if (this.editedItem.Kode == "") {
          this.alert = true;
          this.pesan = "Kode Mata Uang tidak boleh kosong";
        } else if (this.editedItem.Nama == "") {
          this.alert = true;
          this.pesan = "Nama Mata Uang tidak boleh kosong";
        } else {
          this.isLoading = true;
          this.UpdateData();
        }
      }
    },
    TambahData() {
      api
        .post("/mataUangs?token=" + this.token, {
          Kode: this.editedItem.Kode,
          Nama: this.editedItem.Nama,
          Aktif: this.editedItem.Aktif,
        })
        .then(() => {
          (this.isLoading = false), (this.Kode = "");
          this.Nama = "";
          this.Aktif = "";
          // console.log(res)
          this.getData();
          this.closeDialogMataUang();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    UpdateData() {
      api
        .put("/mataUangs/" + this.editedItem.id + "?token=" + this.token, {
          Kode: this.editedItem.Kode,
          Nama: this.editedItem.Nama,
          Aktif: this.editedItem.Aktif,
        })
        .then(() => {
          this.isLoading = false;
          this.Kode = "";
          this.Nama = "";
          this.Aktif = "";
          // console.log(res)
          this.getData();
          this.closeDialogMataUang();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    closeDialogMataUang() {
      this.dialogMataUang = false;
      this.editedItem = this.defaultItem;
      this.editedIndex = -1;
      this.alert = false;
      this.$nextTick(() => {
        // this.id = ''
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    commandClick: function (args) {
      if (args.target.classList.contains("custombutton")) {
        let data = JSON.stringify(args.rowData);
        console.log(data);
      } else if (args.target.classList.contains("Delete")) {
        var r = confirm("Yakin Hapus Data?");
        if (r == true) {
          api
            .delete("/mataUangs/" + args.rowData.id + "?token=" + this.token)
            .then(() => {
              // this.item.splice(index, 1)
              // console.log(res)
              this.getData();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else if (args.target.classList.contains("Edit")) {
        let data = args;
        this.editedIndex = 1;
        // console.log(data)
        this.editedItem = data.rowData;
        this.dialogMataUang = true;
      }
    },

    // customiseCell: function(args) {
    //     if (args.column.field === 'Kode' ||
    //         args.column.field === 'Nama' ||
    //         args.column.field === 'Aktif' ||
    //         args.column.field === 'Commands' ||
    //         args.column.field === 'DiBuatTgl' ||
    //         args.column.field === 'DiBuatOleh' ||
    //         args.column.field === 'DiUbahTgl' ||
    //         args.column.field === 'DiUbahOleh'
    //         ) {
    //        if (args.data['Aktif'] == 0) {
    //           args.cell.classList.add('TidakAktif');
    //       }
    //     }
    //   },
    getBool(x) {
      return !!String(x).toLowerCase().replace(!!0, "");
    },

    getData() {
      this.isLoading = true;
      api.get("/mataUangs?token=" + this.token).then(
        (res) => {
          this.isLoading = false;
          let x = [];
          // console.log(res)
          this.DataMataUang = res.data;
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            element.Aktif = this.getBool(element.Aktif);
            x.push(element);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>
