<template>
  <div v-resize="onResize">
    <loading :active.sync="isLoading" :is-full-page="fullPage"> </loading>

    <v-dialog
      v-model="dialog_periode"
      transition="dialog-top-transition"
      max-width="400"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>Choose Date</v-toolbar>

          <v-card-text>
            <v-container>
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
                    v-model="tanggal_awal"
                    label="Tanggal Awal"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="tanggal_awal"
                  @input="MenuTanggalAwal = false"
                  color="blue darken-4"
                  locale="id"
                ></v-date-picker>
              </v-menu>
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
                    v-model="tanggal_akhir"
                    label="Tanggal Akhir"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="tanggal_akhir"
                  @input="MenuTanggalAkhir = false"
                  color="blue darken-4"
                  locale="id"
                ></v-date-picker>
              </v-menu>
              <v-combobox
                :items="items_periode"
                v-on:change="change_date"
                label="Periode"
              ></v-combobox>
            </v-container>
          </v-card-text>

          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
            <v-btn text @click="getDataMutasiKas(tanggal_awal, tanggal_akhir)"
              >Ok</v-btn
            >
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <div :class="mobile ? 'pa-3' : ''">
      <v-card
        tile
        outlined
        :class="mobile ? 'elevation-2 pa-2' : ''"
        :style="mobile ? '' : 'margin-bottom: 90px;'"
      >
        <v-toolbar flat v-show="mobile == false">
          <v-toolbar-title class="text-h5">
            <strong>{{ $t("Kas.MainTitle") }}</strong>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            color="black"
            :disabled="btn_datagrid"
            @click="dialog_periode = true"
          >
            <v-icon large>mdi-calendar-range</v-icon>
          </v-btn>
        </v-toolbar>

        <v-toolbar
          flat
          dark
          dense
          color="blue darken-4"
          v-show="mobile == true"
        >
          <v-toolbar-title dark>
            {{ $t("Kas.MainTitle") }}
          </v-toolbar-title>

          <v-divider inset vertical class="mr-2 ml-2"></v-divider>

          <v-btn
            icon
            large
            :disabled="btn_datagrid"
            @click="dialog_periode = true"
          >
            <v-icon>mdi-calendar-range</v-icon>
          </v-btn>

          <v-spacer></v-spacer>

          <v-dialog
            v-model="dialogMutasiKas"
            max-width="1200px"
            scrollable
            persistent
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                class="mr-n2"
                v-bind="attrs"
                :disabled="btn_tambah"
                v-on="on"
              >
                <v-icon left>mdi-plus-thick</v-icon>
                {{ $t("All.BtnTambah") }}
              </v-btn>
            </template>

            <v-card class="rounded-lg">
              <v-toolbar dark flat color="blue darken-4">
                <v-toolbar-title>
                  <span>{{ formTitleMutasiKas }}</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="closeMutasiKas()">
                  <v-icon>mdi-window-close</v-icon>
                </v-btn>
              </v-toolbar>

              <v-card-text>
                <v-card outlined class="mt-6">
                  <v-col>
                    <v-row style="margin-bottom: -50px">
                      <v-col cols="12" md="4" sm="4">
                        <v-select
                          :items="['KAS KELUAR', 'KAS MASUK']"
                          label="Arus Kas"
                          outlined
                          v-model="editedItem.arus"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          :disabled="true"
                          class="centered-input"
                          v-model="editedItem.KodeNota"
                          label="Kode Nota"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          v-model="MenuTanggal"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              dense
                              v-model="editedItem.Tanggal"
                              label="Tanggal"
                              prepend-icon="mdi-calendar"
                              readonly
                              clearable
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.Tanggal"
                            @input="MenuTanggal = false"
                            color="blue darken-4"
                            locale="id"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          readonly
                          v-model="editedItem.Perkiraan.Nama"
                          label="Perkiraan Kas Bank"
                        >
                          <template v-slot:append>
                            <v-dialog
                              v-model="dialog_perkiraan_kas"
                              scrollable
                              max-width="800px"
                              persistent
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  dark
                                  small
                                  class="mt-n2"
                                  color="blue darken-4"
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  <v-icon>mdi-dots-horizontal</v-icon>
                                </v-btn>
                              </template>
                              <v-card>
                                <v-toolbar
                                  dark
                                  outline
                                  color="blue darken-4"
                                  class="elevation-1"
                                >
                                  <v-card-title>
                                    <span class="headline">Data Perkiraan</span>
                                  </v-card-title>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    dark
                                    text
                                    fab
                                    small
                                    @click="dialog_perkiraan_kas = false"
                                  >
                                    <v-icon class="mx-1"
                                      >mdi-window-close</v-icon
                                    >
                                  </v-btn>
                                </v-toolbar>

                                <v-card flat
                                  ><!-- Tabel Data perkiraan kas bank -->
                                  <v-col cols="12" md="12">
                                    <v-card>
                                      <ejs-grid
                                        :dataSource="data_perkiraan_kas"
                                        height="200"
                                        width="100%"
                                        gridLines="Both"
                                        :allowSorting="true"
                                        :allowMultiSorting="true"
                                        :allowFiltering="true"
                                        :filterSettings="filterOptions"
                                        :allowResizing="true"
                                        :recordDoubleClick="onDoubleClick"
                                      >
                                        <e-columns>
                                          <e-column
                                            :filter="filter"
                                            field="Kode"
                                            headerText="Kode"
                                            textAlign="Left"
                                            width="100"
                                          ></e-column>
                                          <e-column
                                            :filter="filter"
                                            field="Nama"
                                            headerText="Nama"
                                            width="100"
                                          ></e-column>
                                          <e-column
                                            :filter="filter"
                                            field="IsDetail"
                                            headerText="IsDetail"
                                            displayAsCheckBox="true"
                                            width="100"
                                          ></e-column>
                                          <e-column
                                            :filter="filter"
                                            field="Sifat"
                                            headerText="Sifat"
                                            displayAsCheckBox="true"
                                            width="100"
                                          ></e-column>
                                          <e-column
                                            :filter="filter"
                                            field="Aktif"
                                            displayAsCheckBox="true"
                                            headerText="Aktif"
                                            width="100"
                                          ></e-column>
                                          <e-column
                                            :filter="filter"
                                            field="Memo"
                                            headerText="Memo"
                                            width="100"
                                          ></e-column>
                                        </e-columns>
                                      </ejs-grid>
                                    </v-card>
                                  </v-col>
                                </v-card>
                              </v-card>
                            </v-dialog>
                          </template>
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          clearable
                          v-model="editedItem.Referensi"
                          label="Referensi"
                        >
                        </v-text-field>
                      </v-col>

                      <!-- #Data Items MutasiKas Stok -->
                      <v-col cols="12">
                        <v-card class="elevation-5" outlined>
                          <v-tabs
                            background-color="white"
                            color="dark"
                            slider-color="blue darken-4"
                          >
                            <v-tab>ITEMS</v-tab>
                            <v-tab-item>
                              <ItemsMutasiKas
                                v-on:itemsMk="items($event)"
                                v-on:hapus_item="hps_items($event)"
                                :data_perkiraan="data_perkiraan_all"
                                :ItemsMutasiKas="items_mutasi"
                                :title="title"
                              />
                            </v-tab-item>
                            <v-divider
                              class="mx-2"
                              color=""
                              inset
                              vertical
                            ></v-divider>
                          </v-tabs>
                        </v-card>
                      </v-col>

                      <v-col cols="12" sm="7" md="8">
                        <v-text-field
                          dense
                          prefix="Keterangan :"
                          class="font-weight-bold"
                          v-model="editedItem.Keterangan"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-card>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  dark
                  color="blue darken-4"
                  :disabled="btn_simpan"
                  @click="save"
                >
                  <v-icon class="mr-1">mdi-content-save</v-icon
                  >{{ $t("All.BtnSimpan") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <!-- table Mutasi Kas -->
        <div id="app">
          <ejs-grid
            :dataSource="DataMutasiKas"
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
            ref="grid"
            :allowExcelExport="true"
            :toolbar="toolbarOptions"
            :toolbarClick="toolbarClick"
            :commandClick="commandClick"
            :rowDataBound="rowDataBound"
          >
            <e-columns>
              <e-column
                field="Commands"
                :visible="mobile"
                headerText="Aksi"
                width="140"
                textAlign="Center"
                :commands="commands"
                :lockColumn="true"
              ></e-column>

              <e-column
                headerText="Aksi"
                :visible="!mobile"
                width="150"
                textAlign="center"
                :commands="commandsMobile"
              ></e-column>

              <e-column
                :filter="filter"
                field="KodeNota"
                headerText="Kode Nota"
                textAlign="Left"
                width="185"
              ></e-column>

              <e-column
                :filter="filter"
                field="Tanggal"
                headerText="Tanggal"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="PerkiraanKasBank"
                headerText="Perkiraan Kas Bank"
                textAlign="Left"
                width="270"
              ></e-column>

              <e-column
                :filter="filter"
                field="Tipe"
                headerText="Tipe"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="NoCekBG"
                headerText="No. Cek BG"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="StatusCekBG"
                headerText="Status Cek BG"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="TglCairBatalCekBG"
                headerText="Tanggal Cari Batal Cek BG"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Total"
                type="number"
                format="N"
                headerText="Total"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Status"
                headerText="Status"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="KeteranganStatus"
                headerText="Keterangan Status"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Keterangan"
                headerText="Keterangan"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Referensi"
                headerText="Referensi"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="JumlahCetak"
                headerText="Jumlah Cetak"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiBuatTgl"
                headerText="Di Buat Tanggal"
                textAlign="Left"
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
                textAlign="Left"
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

    <!-- dialog_batal -->
    <v-dialog
      v-model="dialog_batal"
      transition="dialog-bottom-transition"
      max-width="400"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>Batal Mutasi Kas</v-toolbar>
          <v-card-text>
            <v-container>
              <v-text-field
                label="Alasan :"
                required
                autocomplete="off"
                v-model="keterangan_batal"
                hint="apa alasan anda membatalkan ini"
              ></v-text-field>
            </v-container>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
            <v-btn text @click="Batalin(keterangan_batal)">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <v-dialog
      v-model="dialog_print"
      transition="dialog-top-transition"
      max-width="400"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>Choose Print Design</v-toolbar>

          <v-card-text>
            <v-container>
              <v-combobox
                :items="printOutItems"
                v-on:change="change_print"
                label="Print"
              ></v-combobox>
            </v-container>
          </v-card-text>

          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
            <v-btn text @click="getDataPrint()">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <v-dialog
      v-model="dialog_detail"
      persistent
      fullscreen
      scrollable
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card tile>
        <v-toolbar flat dark color="blue darken-4">
          <v-toolbar-title>Detail</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog_detail = false">
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-sheet>
            <v-row no-gutters class="mt-4">
              <v-col cols="12" md="12" sm="12">
                <v-text-field
                  v-model="editedItem.arus"
                  readonly
                  label="Arus Kas"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.KodeNota"
                  readonly
                  label="Kode Nota"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.Tanggal"
                  readonly
                  label="Tanggal"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.Perkiraan.Nama"
                  readonly
                  label="Perkiraan Kas Bank"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.Referensi"
                  readonly
                  label="Referensi"
                ></v-text-field>
              </v-col>
            </v-row>

            <strong class="text-h5"><b>Items</b></strong>

            <v-row no-gutters class="ml-n3 mr-n3">
              <ItemsMutasiKas
                v-on:itemsMk="items($event)"
                v-on:hapus_item="hps_items($event)"
                :data_perkiraan="data_perkiraan_all"
                :ItemsMutasiKas="items_mutasi"
                :title="title"
              />
            </v-row>

            <v-row class="mt-3">
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.Keterangan"
                  readonly
                  label="Keterangan"
                  class="font-weight-bold"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>
        <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    @click="dialog_detail = false"
                >
                    Tutup
                </v-btn>
                </v-card-actions> -->
      </v-card>
    </v-dialog>

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
  </div>
</template>

<script>
import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import api from "../services/http";
import ItemsMutasiKas from "../views/MutasiKas/items.vue";
import {
  GridPlugin,
  Page,
  Aggregate,
  Resize,
  Filter,
  Sort,
  Group,
  Edit,
  CommandColumn,
  Reorder,
  Toolbar,
  ExcelExport,
} from "@syncfusion/ej2-vue-grids";
Vue.use(GridPlugin);

export default {
  name: "MutasiKas",
  components: { ItemsMutasiKas, Loading },
  data() {
    return {
      alert: false,
      pesan: "",
      dialog_detail: false,
      ScrollKeAtas: false,
      mobile: null,
      windowSize: { x: 0, y: 0 },
      dialog_perkiraan_kas: false,
      data_perkiraan_kas: [],
      data_perkiraan_all: [],
      dialog_batal: false,
      items_mutasi: null,
      dialog_print: false,
      printOutItems: [],
      MenuTanggalAwal: false,
      MenuTanggalAkhir: false,
      reportDesign: null,
      tanggal_awal: "",
      tanggal_akhir: "",
      keterangan_batal: "",
      initial_kode: "",
      items_periode: [],
      dialog_periode: true,
      btn_simpan: false,
      action: null,
      btn_tambah: true,
      editedIndex: -1,
      defaultItem: {
        KodeNota: "",
        Tanggal: new Date().toISOString().substr(0, 10),
        Perkiraan: "",
        Referensi: "",
        Keterangan: "",
        arus: "",
      },
      editedItem: {
        KodeNota: "",
        Tanggal: new Date().toISOString().substr(0, 10),
        Perkiraan: "",
        Referensi: "",
        Keterangan: "",
        arus: "",
      },
      ItemsMutasiKas: [],
      hapus_items: [],
      DataMutasiKas: [],
      isLoading: false,
      fullPage: true,
      btn_datagrid: true,
      dialogMutasiKas: false,
      title: "cok",
      MenuTanggal: false,
      date: new Date().toISOString().substr(0, 10),
      token: localStorage.getItem("token"),
      commands: [],
      commandsMobile: [
        { buttonOption: { content: "Details", cssClass: "e-flat Details" } },
      ],
      groupSettings: { allowRecording: true },
      selectionOptions: { type: "Multiple" },
      toolbarOptions: ["Search", "ExcelExport"],
      pageSettings: {
        pageSize: 5,
        pageSizes: ["5", "10", "15", "20", "50", "All"],
      },
      filterOptions: { type: "Menu" },
      filter: { type: "CheckBox" },
      editSettings: {
        showDeleteConfirmDialog: true,
        allowEditing: true,
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
      Group,
      Edit,
      CommandColumn,
      Reorder,
      ExcelExport,
    ],
  },
  mounted() {
    if (this.action.some((a) => a == "R")) {
      this.items_periode = JSON.parse(localStorage.getItem("Periode")).map(
        (x) => x.Nama
      );
      this.autotanggal();
      this.btn_datagrid = false;
      this.tanggal_awal = JSON.parse(
        localStorage.getItem("Periode")
      )[0].TglAwal;
      this.tanggal_akhir = JSON.parse(
        localStorage.getItem("Periode")
      )[0].TglAkhir;
      this.getDataMutasiKas(
        JSON.parse(localStorage.getItem("Periode"))[0].TglAwal,
        JSON.parse(localStorage.getItem("Periode"))[0].TglAkhir
      );
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
    this.DataPerkiraan();
  },
  created() {
    // get actions for this page
    console.log(this.$route.params.printOut);
    this.action = Object.assign(
      [],
      this.$route.params.action
        .replaceAll('"', "")
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll(",", "")
    );
    if (this.$route.params.printOut != "No Printed Document") {
      this.$route.params.printOut.split(",").forEach((element) => {
        this.printOutItems.push({
          text: element,
          target: ".e-content",
          id: element.replace(/\s/g, ""),
        });
      });
    }
    console.log(this.printOutItems.length);
    if (this.printOutItems.length > 0) {
      this.commands.push({
        title: "Print",
        buttonOption: { cssClass: "e-flat Print", iconCss: "e-print e-icons" },
      });
    }
  },
  watch: {
    windowSize() {
      if (this.windowSize.x < 450) {
        (this.toolbarOptions = ["Search"]), (this.titleClass = "d-none");
        this.mobile = false;
      } else {
        (this.toolbarOptions = ["Search", "ExcelExport"]),
          (this.titleClass = "mr-4");
        this.mobile = true;
      }
    },

    dialogMutasiKas(val) {
      val || this.closeMutasiKas();
    },
    "editedItem.arus"(val) {
      if (val == "KAS KELUAR") {
        this.initial_kode = "KK";
      } else {
        this.initial_kode = "KM";
      }
    },
    // initial_kode(val){
    //     console.log(val)
    // }
  },
  computed: {
    formTitleMutasiKas() {
      return this.editedIndex === -1 ? "Tambah Mutasi Kas" : "Ubah Mutasi Kas";
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

    toolbarClick: function (args) {
      // console.log(args)
      if (args.item.text === "Excel Export") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.grid.excelExport();
      }
    },
    async getDataPrint() {
      console.log(this.reportDesign);
      var rute = {
        name: this.reportDesign.id.substr(1),
      };
      console.log(rute);
      await api
        .get("report-mutasi/" + this.editedItem.id + "?token=" + this.token)
        .then(
          (res) => {
            // console.log(res)
            rute.params = { data: res.data.data };
            this.$router.push(rute);
          },
          (err) => {
            console.log(err);
          }
        );
    },
    change_print(a) {
      this.reportDesign = a;
    },
    rowDataBound: function (args) {
      if (args.data.Status == "BATAL") {
        args.row.classList.add("above-80");
        args.row.classList.add("edit-batal");
        args.row.classList.add("hapus-batal");
      }
    },
    Batalin(val) {
      api
        .put("/batal-mutasi/" + this.editedItem.id + "?token=" + this.token, {
          keterangan: val,
        })
        .then((res) => {
          console.log(res);
          this.getDataMutasiKas(this.tanggal_awal, this.tanggal_akhir);
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialog_batal = false;
      this.keterangan_batal = "";
    },
    onDoubleClick(args) {
      this.editedItem.Perkiraan = args.rowData;
      this.dialog_perkiraan_kas = false;
    },
    DataPerkiraan() {
      api.get("/coa?token=" + this.token).then(
        (res) => {
          this.data_perkiraan_all = res.data.filter(
            (data) => data.IsDetail != false && data.Aktif != false
          );
          this.data_perkiraan_kas = res.data.filter(
            (data) =>
              data.Nama.includes("KAS BESAR") || data.Nama.includes("KAS KECIL")
          );
          // console.log(this.data_perkiraan_kas)
        },
        (err) => {
          console.log(err);
        }
      );
    },
    change_date(a) {
      this.tanggal_awal = JSON.parse(localStorage.getItem("Periode")).find(
        (d) => d.Nama === a
      ).TglAwal;
      this.tanggal_akhir = JSON.parse(localStorage.getItem("Periode")).find(
        (d) => d.Nama === a
      ).TglAkhir;
    },
    hps_items(data) {
      // data.forEach(element => {
      // 	this.hapus_items.push(element.id)
      // });
      this.hapus_items = data;
    },
    items(data) {
      console.log("emit", data);
      this.ItemsMutasiKas = data;
    },
    save() {
      if (this.editedIndex == -1) {
        if (this.editedItem.arus == "") {
          this.alert = true;
          this.pesan = "Arus Kas tidak boleh kosong";
        } else if (this.editedItem.Perkiraan == "") {
          this.alert = true;
          this.pesan = "PerkiraanKas tidak boleh kosong";
        } else if (this.ItemsMutasiKas.length == 0) {
          this.alert = true;
          this.pesan = "Items Mutasi tidak boleh kosong";
        } else {
          this.TambahData();
        }
      } else {
        this.UpdateData();
      }
    },
    closeMutasiKas() {
      this.$nextTick(() => {
        this.title = "Kosongkan";
        this.editedIndex = -1;
        this.btn_simpan = false;
        this.ItemsMutasiKas = [];
        this.editedItem = Object.assign({}, this.defaultItem);
        this.autotanggal();
        this.items_mutasi = [];
        this.dialogMutasiKas = false;
      });
    },
    autotanggal() {
      this.editedItem.tanggal = this.date;
    },
    getDataMutasiKas(from, to) {
      this.isLoading = true;
      api.get("/mutasi/kas/" + from + "/" + to + "?token=" + this.token).then(
        (res) => {
          this.isLoading = false;
          this.dialog_periode = false;
          this.DataMutasiKas = res.data.data;
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
        }
      );
    },
    TambahData() {
      this.isLoading = true;
      this.editedItem.modulMutasi = "KAS";
      this.editedItem.Tipe = this.editedItem.arus;
      this.editedItem.PerkiraanKasBank = this.editedItem.Perkiraan.Kode;
      this.editedItem.arus_kas = this.initial_kode;
      this.editedItem.items = this.ItemsMutasiKas;
      api
        .post("/mutasi?token=" + this.token, this.editedItem)
        .then(() => {
          this.isLoading = false;
          this.closeMutasiKas();
          this.getDataMutasiKas(this.tanggal_awal, this.tanggal_akhir);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    UpdateData() {
      this.isLoading = true;
      this.editedItem.hapus_items = this.hapus_items.filter(
        (d) => d.KodeNota != undefined
      );
      this.editedItem.new_items = this.ItemsMutasiKas.filter(
        (d) => d.KodeNota == undefined
      );
      api
        .put(
          "/mutasi/" + this.editedItem.id + "?token=" + this.token,
          this.editedItem
        )
        .then(() => {
          this.hapus_items = [];
          this.closeMutasiKas();
          this.getDataMutasiKas(this.tanggal_awal, this.tanggal_akhir);
        })
        .catch((err) => {
          this.hapus_items = [];
          console.log(err);
        });
    },
    commandClick: function (args) {
      if (args.target.classList.contains("Details")) {
        console.log("disni");
        api.get("/mutasi/" + args.rowData.id + "?token=" + this.token).then(
          (res) => {
            let period = JSON.parse(localStorage.getItem("Periode")).find(
              (d) =>
                d.Kode ===
                res.data.data.DiBuatTgl.substr(0, 4) +
                  res.data.data.DiBuatTgl.substr(5, 2)
            );
            if (period.Status == 0) {
              alert("Tidak dapat di ubah karena periode sudah tutup");
              this.btn_simpan = true;
            }
            if (args.rowData.Status == "BATAL") {
              alert("Tidak dapat di ubah karena sudah dibatalkan");
              this.btn_simpan = true;
            }
            this.editedItem = res.data.data;
            this.editedItem.Perkiraan = res.data.data.perkiraan;
            this.editedItem.arus = res.data.data.KodeNota.includes("KM")
              ? "KAS MASUK"
              : "KAS KELUAR";
            this.items_mutasi = res.data.data.items.map((item) => {
              (item.MataUang = item.mata_uang.Nama),
                (item.Perkiraan = item.perkiraan.Nama);
              return item;
            });
          },
          (err) => {
            console.log(err);
          }
        );
        this.editedIndex = 1;
        this.title = "Ubah";
        this.dialog_detail = true;
      }
      if (args.target.classList.contains("Print")) {
        this.dialog_print = true;
        this.editedItem.id = args.rowData.id;
      }
      if (args.target.classList.contains("Delete")) {
        if (args.rowData.status == null) {
          var b = confirm("Anda yakin membatalkan transaksi ini?");
          if (b == true) {
            this.editedItem.id = args.rowData.id;
            this.dialog_batal = true;
          }
        } else {
          var r = confirm("Yakin Hapus Data?");
          if (r == true) {
            api
              .delete("/mutasi/" + args.rowData.id + "?token=" + this.token)
              .then(() => {
                this.getDataMutasiKas(this.tanggal_awal, this.tanggal_akhir);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      } else if (args.target.classList.contains("Edit")) {
        api.get("/mutasi/" + args.rowData.id + "?token=" + this.token).then(
          (res) => {
            let period = JSON.parse(localStorage.getItem("Periode")).find(
              (d) =>
                d.Kode ===
                res.data.data.DiBuatTgl.substr(0, 4) +
                  res.data.data.DiBuatTgl.substr(5, 2)
            );
            if (period.Status == 0) {
              alert("Tidak dapat di ubah karena periode sudah tutup");
              this.btn_simpan = true;
            }
            if (args.rowData.Status == "BATAL") {
              alert("Tidak dapat di ubah karena sudah dibatalkan");
              this.btn_simpan = true;
            }
            this.editedItem = res.data.data;
            this.editedItem.Perkiraan = res.data.data.perkiraan;
            this.editedItem.arus = res.data.data.KodeNota.includes("KM")
              ? "KAS MASUK"
              : "KAS KELUAR";
            this.items_mutasi = res.data.data.items.map((item) => {
              (item.MataUang = item.mata_uang.Nama),
                (item.Perkiraan = item.perkiraan.Nama);
              return item;
            });
          },
          (err) => {
            console.log(err);
          }
        );
        this.editedIndex = 1;
        this.title = "Ubah";
        this.dialogMutasiKas = true;
      }
    },
  },
};
</script>

<style>
/* .edit-batal .e-icons.e-edit{
        color: #26A69A;
    }
    .hapus-batal .e-icons.e-delete{
        color: #EF5350;
    }
    .e-grid .e-row.above-80 .e-rowcell {
        background-color: rgb(0, 31, 61);
        color: rgb(167, 232, 202); 
        font-weight: bold; 
    } */
</style>
