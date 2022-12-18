<template>
  <div v-resize="onResize">
    <loading :active.sync="isLoading"></loading>

    <div :class="mobile ? 'pa-3' : ''">
      <v-card
        tile
        outlined
        :class="mobile ? 'elevation-2 pa-2' : ''"
        :style="mobile ? '' : 'margin-bottom: 90px;'"
      >
        <v-toolbar flat v-show="mobile == false">
          <v-toolbar-title class="text-h5">
            <strong>{{ $t("Periode.MainTitle") }}</strong>
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
            {{ $t("Periode.MainTitle") }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" scrollable max-width="400px" persistent>
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
              <v-toolbar flat dark color="blue darken-4">
                <v-toolbar-title>
                  <span>{{ formTitle }}</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="close">
                  <v-icon>mdi-window-close</v-icon>
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
                          v-on:blur="getTanggal()"
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
                        <v-menu
                          v-model="MenuTanggalAwal"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              dense
                              v-model="editedItem.TglAwal"
                              label="Tanggal Awal"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.TglAwal"
                            @input="MenuTanggalAwal = false"
                            color="blue darken-4"
                            locale="id"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <v-menu
                          v-model="MenuTanggalAkhir"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              dense
                              v-model="editedItem.TglAkhir"
                              label="Tanggal Akhir"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.TglAkhir"
                            @input="MenuTanggalAkhir = false"
                            color="blue darken-4"
                            locale="id"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <v-menu
                          v-model="MenuTanggalAwalPayRoll"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              dense
                              v-model="editedItem.TglAwalPayRoll"
                              label="Tanggal Awal PayRoll"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.TglAwalPayRoll"
                            @input="MenuTanggalAwalPayRoll = false"
                            color="blue darken-4"
                            locale="id"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <v-menu
                          v-model="MenuTanggalAkhirPayRoll"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              dense
                              v-model="editedItem.TglAkhirPayRoll"
                              label="Tanggal Akhir PayRoll"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.TglAkhirPayRoll"
                            @input="MenuTanggalAkhirPayRoll = false"
                            color="blue darken-4"
                            locale="id"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <v-radio-group
                          class="mt-n3"
                          dense
                          v-model="editedItem.Status"
                          mandatory
                        >
                          <v-radio
                            label="Buka"
                            v-bind:value="true"
                            color="blue darken-4"
                          ></v-radio>
                          <v-radio
                            label="Tutup"
                            v-bind:value="false"
                            color="blue darken-4"
                          ></v-radio>
                        </v-radio-group>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
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

        <div id="app">
          <ejs-grid
            :dataSource="dataPeriode"
            width="100%"
            gridLines="Both"
            style="height: 100%"
            :height="mobile ? '43vh' : 'auto'"
            :allowReordering="true"
            :editSettings="editSettings"
            :selectionSettings="selectionOptions"
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
                width="106"
                :commands="commands"
                textAlign="Center"
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
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="TglAwal"
                headerText="Tanggal Awal "
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="TglAkhir"
                headerText="Tanggal Akhir "
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="TglAwalPayRoll"
                headerText="Tanggal Awal PayRoll"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="TglAkhirPayRoll"
                headerText="Tanggal Akhir PayRoll"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Status"
                headerText="Status"
                displayAsCheckBox="true"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiBuatTgl"
                headerText="Di Buat Tanggal"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiBuatOleh"
                headerText="Di Buat Oleh"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiUbahTgl"
                headerText="Di Ubah Tanggal"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiUbahOleh"
                headerText="Di Ubah Oleh"
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
import moment from "moment";
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
      alert: false,
      pesan: "",
      ScrollKeAtas: false,
      mobile: null,
      windowSize: { x: 0, y: 0 },
      btn_tambah: true,
      action: null,
      isLoading: false,
      fullPage: true,
      MenuTanggalAwal: false,
      MenuTanggalAkhir: false,
      MenuTanggalAwalPayRoll: false,
      MenuTanggalAkhirPayRoll: false,
      editedIndex: -1,
      defaultItem: {
        Kode: "",
        Nama: "",
        TglAwal: "",
        TglAkhir: "",
        TglAwalPayRoll: "",
        TglAkhirPayRoll: "",
        Status: "",
      },

      editedItem: {
        Kode: "",
        Nama: "",
        TglAwal: "",
        TglAkhir: "",
        TglAwalPayRoll: "",
        TglAkhirPayRoll: "",
        Status: "",
      },
      dialog: false,
      token: localStorage.getItem("token"),
      dataPeriode: [],
      commands: [],
      selectionOptions: { type: "Multiple" },
      toolbarOptions: ["Search"],
      pageSettings: { pageSize: 20, pageSizes: ["20", "50", "100"] },
      filterOptions: { type: "Menu" },
      filter: { type: "CheckBox" },
      editSettings: {
        showDeleteConfirmDialog: true,
        allowEditing: false,
        allowAdding: true,
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
      Edit,
      CommandColumn,
      Reorder,
    ],
  },

  created() {
    this.action = Object.assign(
      [],
      this.$route.params.action
        .replaceAll('"', "")
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll(",", "")
    );
  },

  mounted() {
    if (this.action.some((a) => a == "R")) {
      this.getDataPeriode();
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
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Periode" : "Ubah Periode";
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

    getTanggal() {
      this.editedItem.Nama = moment(this.editedItem.Kode.toString())
        .locale("id")
        .format("MMMM YYYY");
      let tahun = this.editedItem.Kode.toString().slice(0, 4);
      let bulan = this.editedItem.Kode.toString().slice(4);
      let hariAwal =
        "0" +
        new Date(parseInt(tahun), parseInt(bulan) - 1, 1).getDate().toString();
      let hariAkhir = new Date(parseInt(tahun), parseInt(bulan), 0)
        .getDate()
        .toString();
      this.editedItem.TglAwal = tahun + "-" + bulan + "-" + hariAwal;
      this.editedItem.TglAkhir = tahun + "-" + bulan + "-" + hariAkhir;
      this.editedItem.TglAwalPayRoll = tahun + "-" + bulan + "-" + hariAwal;
      this.editedItem.TglAkhirPayRoll = tahun + "-" + bulan + "-" + hariAkhir;
    },
    rowDataBound: function (args) {
      if (args.data.Status == "0") {
        args.row.classList.add("not-active");
      }
    },
    save() {
      if (this.editedIndex == -1) {
        if (this.editedItem.Kode == "") {
          this.alert = true;
          this.pesan = "Kode Periode tidak boleh kosong";
        } else if (this.editedItem.Kode.length != 6) {
          this.alert = true;
          this.pesan =
            "Format Kode Periode 'YYYYMM',contoh: " + this.dataPeriode[0].Kode;
        } else {
          this.isLoading = true;
          this.TambahData();
        }
      } else {
        this.isLoading = true;
        this.UpdateData();
      }
    },

    UpdateData() {
      console.log(this.editedItem.Status);
      if (this.editedItem.Status !== true) {
        var disablePeriodeId = this.dataPeriode
          .filter((p) => p.Kode < this.editedItem.Kode && p.Status == true)
          .map((p) => p.id);
      } else {
        var enablePeriodeId = this.dataPeriode
          .filter((p) => p.Kode > this.editedItem.Kode && p.Status == false)
          .map((p) => p.id);
      }
      api
        .put("/periodes/" + this.editedItem.id + "?token=" + this.token, {
          Kode: this.editedItem.Kode,
          Nama: this.editedItem.Nama,
          TglAwal: this.editedItem.TglAwal,
          TglAkhir: this.editedItem.TglAkhir,
          TglAwalPayRoll: this.editedItem.TglAwalPayRoll,
          TglAkhirPayRoll: this.editedItem.TglAkhirPayRoll,
          Status: this.editedItem.Status,
          disable: disablePeriodeId,
          enable: enablePeriodeId,
        })
        .then(() => {
          this.close();
          this.isLoading = false;
          this.id = "";
          // console.log(res)
          this.getDataPeriode();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    TambahData() {
      // if (this.dataPeriode.length != 0) {
      //   if (
      //     this.editedItem.Kode >
      //     this.dataPeriode[this.dataPeriode.length - 1].Kode
      //   ) {
      //     var r = confirm(
      //       "Periode " +
      //         this.editedItem.Nama +
      //         " Akan disimpan, Stok akhir periode " +
      //         this.dataPeriode[0].Nama +
      //         " akan menjadi stok awal periode " +
      //         this.editedItem.Nama
      //     );
      //     if (r == true) {
      //       api
      //         .post("/periodes?token=" + this.token, {
      //           Kode: this.editedItem.Kode,
      //           Nama: this.editedItem.Nama,
      //           TglAwal: this.editedItem.TglAwal,
      //           TglAkhir: this.editedItem.TglAkhir,
      //           TglAwalPayRoll: this.editedItem.TglAwalPayRoll,
      //           TglAkhirPayRoll: this.editedItem.TglAkhirPayRoll,
      //           Status: this.editedItem.Status,
      //         })
      //         .then(() => {
      //           (this.isLoading = false),
      //             // console.log(res)
      //             this.getDataPeriode();
      //           this.close();
      //         })
      //         .catch((err) => {
      //           console.log(err);
      //         });
      //     } else {
      //       this.isLoading = false;
      //     }
      //   }
      // } else {
      //   api
      //     .post("/periodes?token=" + this.token, {
      //       Kode: this.editedItem.Kode,
      //       Nama: this.editedItem.Nama,
      //       TglAwal: this.editedItem.TglAwal,
      //       TglAkhir: this.editedItem.TglAkhir,
      //       Status: this.editedItem.Status,
      //     })
      //     .then(() => {
      //       (this.isLoading = false),
      //         // console.log(res)
      //         this.getDataPeriode();
      //       this.close();
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // }
      api
        .post("/periodes?token=" + this.token, {
          Kode: this.editedItem.Kode,
          Nama: this.editedItem.Nama,
          TglAwal: this.editedItem.TglAwal,
          TglAkhir: this.editedItem.TglAkhir,
          Status: this.editedItem.Status,
        })
        .then(() => {
          (this.isLoading = false),
            // console.log(res)
            this.getDataPeriode();
          this.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    close() {
      this.alert = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.editedItem.Kode =
          this.dataPeriode[0].Kode.substring(4) == 12
            ? parseInt(this.dataPeriode[0].Kode.substring(0, 4)) + 1 + "01"
            : parseInt(this.dataPeriode[0].Kode) + 1;
        this.editedItem.Kode = this.editedItem.Kode.toString();
        // console.log(this.editedItem.Kode);
        this.getTanggal();
      });
      this.dialog = false;
    },

    commandClick: function (args) {
      if (args.target.classList.contains("custombutton")) {
        let data = JSON.stringify(args.rowData);
        console.log(data);
      } else if (args.target.classList.contains("Delete")) {
        let disablePeriodeId = this.dataPeriode
          .filter((p) => p.Kode < args.rowData.Kode && p.Status == true)
          .map((p) => p.id);
        disablePeriodeId.push(args.rowData.id);
        // console.log('matikanPeriode',disablePeriodeId.join(','))

        // console.log('id dipilih',args.rowData.id)
        // console.log('param',new URLSearchParams(disablePeriodeId).toString())
        var r = confirm("Yakin Hapus Data?");
        if (r == true) {
          api
            .delete(
              "/periodes/" + disablePeriodeId.join(",") + "?token=" + this.token
            )
            .then(() => {
              // console.log(res)
              this.getDataPeriode();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else if (args.target.classList.contains("Edit")) {
        let data = args;
        this.editedItem.id = data.rowData.id;
        if (data.rowData.Status == 0) {
          this.editedItem.Status = false;
        }
        this.editedItem.Kode = data.rowData.Kode;
        this.editedItem.Nama = data.rowData.Nama;
        this.editedItem.TglAwal = data.rowData.TglAwal;
        this.editedItem.TglAkhir = data.rowData.TglAkhir;
        this.editedIndex = 1;
        this.dialog = true;
      }
    },

    getDataPeriode() {
      this.isLoading = true;
      api.get("/periodes?token=" + this.token).then(
        (res) => {
          this.isLoading = false;
          this.dataPeriode = res.data;
          this.editedItem.Kode =
            this.dataPeriode[0].Kode.substring(4) == 12
              ? parseInt(this.dataPeriode[0].Kode.substring(0, 4)) + 1 + "01"
              : parseInt(this.dataPeriode[0].Kode) + 1;
          this.getTanggal();
        },
        (err) => {
          console.log(err);
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
</style>
