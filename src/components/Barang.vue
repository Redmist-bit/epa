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
            <strong>{{ $t("Barang.MainTitle") }}</strong>
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
            <!-- <v-icon>mdi-cart</v-icon> -->
            {{ $t("Barang.MainTitle") }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" scrollable max-width="1200px" persistent>
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

            <v-card>
              <v-toolbar dark dense color="blue darken-4" class="elevation-0">
                <v-toolbar-title dark>
                  <v-icon>mdi-cart-plus</v-icon>
                </v-toolbar-title>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-spacer></v-spacer>
                <v-btn dark text fab small @click="close">
                  <v-icon class="mx-1">mdi-window-close</v-icon>
                </v-btn>
              </v-toolbar>

              <v-card-text>
                <v-container>
                  <v-card flat>
                    <v-col>
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
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            dense
                            readonly
                            :disabled="true"
                            v-model="editedItem.Kode"
                            label="Kode"
                          >
                          </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            dense
                            v-model="editedItem.Nama"
                            label="Nama*"
                            hint="Wajib diisi*"
                            required
                          >
                          </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <!-- <v-text-field dense clearable v-model="editedItem.Merk" label="Merk">
                          </v-text-field> -->
                          <div style="margin-top: -15px">
                            <ejs-autocomplete
                              :maxlength="25"
                              label-size="16px"
                              floatLabelType="Auto"
                              :dataSource="SelectMerk"
                              v-model="editedItem.Merk"
                              :placeholder="waterMark"
                            ></ejs-autocomplete>
                          </div>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            dense
                            clearable
                            v-model="editedItem.Kategori"
                            :items="[
                              'OPERATIONAL',
                              'NULL',
                              'CONSUMABLE',
                              'OLI & BAHAN',
                              'SPAREPART',
                              'SUKU CADANG',
                            ]"
                            label="Kategori*"
                            hint="Wajib pilih*"
                            required
                          >
                          </v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            dense
                            clearable
                            v-model="editedItem.PartNumber1"
                            label="Partnumber1*"
                            hint="Wajib diisi*"
                            required
                          >
                          </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            dense
                            clearable
                            v-model="editedItem.PartNumber2"
                            label="Partnumber2"
                          >
                          </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.Kendaraan"
                            clearable
                            label="Kendaraan"
                            dense
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            dense
                            clearable
                            v-model="editedItem.KodeSupplier"
                            label="Kode Supplier"
                          >
                          </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            dense
                            clearable
                            v-model="editedItem.Dimensi"
                            label="Dimensi"
                          >
                          </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            dense
                            clearable
                            v-model="editedItem.Gudang"
                            :items="gudang"
                            item-text="Nama"
                            item-value="Kode"
                            label="Gudang"
                            required
                          >
                          </v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            dense
                            clearable
                            v-model="editedItem.Memo"
                            label="Memo"
                          >
                          </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-switch
                            dense
                            clearable
                            v-model="editedItem.Aktif"
                            label="Aktif"
                          >
                          </v-switch>
                        </v-col>

                        <v-col cols="12" sm="5" md="3">
                          <v-text-field
                            dense
                            clearable
                            v-model="editedItem.StokMinimum"
                            @keypress="isNumber($event)"
                            label="Stok Minimum"
                          >
                          </v-text-field>
                        </v-col>

                        <v-col cols="12" md="9"> </v-col>

                        <v-col cols="12" sm="5" md="3">
                          <v-text-field
                            dense
                            clearable
                            v-model="editedItem.StokMaksimum"
                            @keypress="isNumber($event)"
                            label="Stok Maksimum"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12">
                          <v-card class="elevation-5" outlined>
                            <v-tabs
                              v-model="tab"
                              background-color="white"
                              color="dark"
                              slider-color="blue darken-4"
                            >
                              <v-tabs-slider></v-tabs-slider>

                              <v-tab href="#tab1"> Satuan </v-tab>
                              <v-divider
                                class="mx-2"
                                color=""
                                inset
                                vertical
                              ></v-divider>
                              <v-tab href="#tab2" v-if="editedIndex === 1">
                                Harga Jual
                              </v-tab>
                              <v-divider
                                v-if="editedIndex === 1"
                                class="mx-2"
                                color=""
                                inset
                                vertical
                              ></v-divider>
                              <v-tab href="#tab3" v-if="editedIndex === 1">
                                Harga Beli
                              </v-tab>
                              <v-divider
                                v-if="editedIndex === 1"
                                class="mx-2"
                                color=""
                                inset
                                vertical
                              ></v-divider>
                            </v-tabs>

                            <v-tabs-items v-model="tab">
                              <v-tab-item :eager="true" value="tab1">
                                <keep-alive>
                                  <Satuan
                                    ref="Satuan"
                                    @SyncSatuan="SyncSatuan"
                                    @SyncSatuanEdit="SyncSatuanEdit"
                                    v-bind:satuan="itemtabsatuan"
                                  />
                                </keep-alive>
                              </v-tab-item>

                              <!-- CODE TAB HARGA JUAL -->
                              <v-tab-item
                                :eager="true"
                                value="tab2"
                                v-if="editedIndex === 1"
                              >
                                <keep-alive>
                                  <HargaJual
                                    :mataUang="mataUangs"
                                    ref="HargaJual"
                                    @SyncHargaJual="SyncHargaJual"
                                    @SyncHargaJualEdit="SyncHargaJualEdit"
                                    v-bind:hrgjual="itemtabhargajual"
                                    v-bind:satuan="itemtabsatuan"
                                  />
                                </keep-alive>
                              </v-tab-item>

                              <!-- CODE TAB HARGA BELI -->
                              <v-tab-item
                                :eager="true"
                                value="tab3"
                                v-if="editedIndex === 1"
                              >
                                <keep-alive>
                                  <HargaBeli
                                    :mataUang="mataUangs"
                                    ref="HargaBeli"
                                    @SyncHargaBeli="SyncHargaBeli"
                                    @SyncHargaBeliEdit="SyncHargaBeliEdit"
                                    :hrgbeli="itemtabhargabeli"
                                    v-bind:satuan="itemtabsatuan"
                                  />
                                </keep-alive>
                              </v-tab-item>
                            </v-tabs-items>
                          </v-card>
                        </v-col>

                        <!-- <v-col cols="12">
                          <v-card class="elevation-5">
                            <v-tabs
                              v-model="tab1"
                              background-color="white"
                              color="dark"
                              slider-color="blue darken-4"
                            >
                              <v-tabs-slider></v-tabs-slider>
                              <v-tab href="#tab-1"> Stok </v-tab>
                            </v-tabs>

                            <v-tabs-items v-model="tab1">
                              <v-tab-item value="tab-1">
                                <Stok :stok="itemtabstok" />
                              </v-tab-item>
                            </v-tabs-items>
                            <div style="display: none">
                            </div>
                          </v-card>
                        </v-col> -->
                      </v-row>
                    </v-col>
                  </v-card>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <!-- <span>(<span class="red--text title">*</span>) Wajib Diisi</span>   -->
                <v-spacer></v-spacer>
                <!-- <v-btn btn dark color="error" @click="clearbarang">
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
            gridLines="Both"
            :dataSource="data"
            ref="ggs"
            style="height: 100%"
            :height="mobile ? '43vh' : 'auto'"
            width="100%"
            :toolbar="toolbarOptionsSelect"
            :filterSettings="filterOptions"
            :allowReordering="true"
            :allowFiltering="mobile"
            :allowGrouping="mobile"
            :allowSorting="true"
            :allowMultiSorting="true"
            :allowResizing="true"
            :allowPaging="true"
            :groupSettings="groupSettings"
            :selectionSettings="selectionOptions"
            :pageSettings="pageSettings"
            :commandClick="commandClick"
            :rowDataBound="rowDataBound"
            :dataStateChange="dataStateChange"
          >
            <e-columns>
              <e-column
                :visible="mobile"
                :allowFiltering="false"
                field="Commands"
                headerText="Aksi"
                width="105"
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
                fieldText=""
                field="Kode"
                :isPrimaryKey="true"
                headerText="Kode"
                textAlign="Left"
                width="120"
              >
              </e-column>

              <e-column
                :allowFiltering="false"
                field="Nama"
                headerText="Nama"
                width="250"
              >
              </e-column>
              <!-- <ejs-datepicker field='tgl' headerText='Tanggal' width='150' id="datepicker" locale='id' ></ejs-datepicker> -->

              <e-column field="Merk" headerText="Merk" width="120"> </e-column>

              <e-column field="Kategori" headerText="Kategori" width="170">
              </e-column>

              <e-column
                :allowFiltering="false"
                field="PartNumber1"
                headerText="Part Number 1"
                textAlign="Left"
                width="160"
              >
              </e-column>

              <e-column
                :allowFiltering="false"
                field="PartNumber2"
                headerText="Part Number 2"
                textAlign="Left"
                width="160"
              >
              </e-column>

              <e-column
                field="Kendaraan"
                headerText="Kendaraan"
                textAlign="Left"
                width="160"
              >
              </e-column>

              <e-column
                field="KodeSupplier"
                :isPrimaryKey="true"
                headerText="Kode Supplier"
                textAlign="Left"
                width="180"
              >
              </e-column>

              <e-column
                field="Dimensi"
                headerText="Dimensi"
                textAlign="Left"
                width="160"
              >
              </e-column>

              <e-column
                :allowFiltering="false"
                field="Aktif"
                headerText="Aktif"
                displayAsCheckBox="true"
                width="110"
              >
              </e-column>

              <e-column
                field="Gudang"
                headerText="Gudang"
                extAlign="Left"
                idth="160"
              >
              </e-column>

              <e-column
                field="StokMin"
                headerText="Stok Minimal"
                extAlign="Left"
                width="160"
              >
              </e-column>

              <e-column
                field="StokMaks"
                headerText="Stok Maksimal"
                extAlign="Left"
                width="160"
              >
              </e-column>
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
import api from "@/services/http";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Satuan from "@/views/Barang/Satuan";
import HargaBeli from "@/views/Barang/HargaBeli";
import HargaJual from "@/views/Barang/HargaJual";
// import Stok from "@/views/Barang/Stok";
import { DatePickerPlugin } from "@syncfusion/ej2-vue-calendars";
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
// import { loadCldr,L10n, setCulture, setCurrencyCode } from '@syncfusion/ej2-base';

// loadCldr (
//   require('../cldr/id/currencies.json'),
//   require('../cldr/id/numbers.json'),
//   require('../cldr/supplemental/numberingSystems.json'),
//   require('../cldr/id/timeZoneNames.json'),
//   require('../cldr/supplemental/weekData.json'),
//   require('../cldr/id/ca-gregorian.json')
// );

// setCulture('id');
// setCurrencyCode('IDR');

// L10n.load({
//   'id': {
//     'datepicker': { placeholder: 'Tanggal', today: 'Hari ini' },
//     'grid': {
//       'Add': 'Tambahkan',
//       'Delete': 'Hapus',
//       'Cancel': 'Batal',
//       'Search': 'Pencarian',
//       'EmptyRecord': 'Record Kosong',
//       'GroupDropArea': 'Drag Data ke sini untuk Grouping',
//       'UnGroup': 'Klik di sini untuk memisahkan grup',
//       'EmptyDataSourceError': 'DataSource tidak boleh kosong pada pemuatan pertama, karena kolom dari dataSource di kisi kolom Buat Otomatis',
//       'Item': 'Item',
//       'Items': 'Item'
//     },
//     'pager':{
//       'currentPageInfo': '{0} dari {1} halaman',
//       'totalItemsInfo': '({0} items)',
//       'firstPageTooltip': 'Ke halaman pertama',
//       'lastPageTooltip': 'Ke halaman terakhir',
//       'nextPageTooltip': 'Ke halaman selanjutnya',
//       'previousPageTooltip': 'Kembali ke halaman terakhir',
//       'nextPagerTooltip': 'Ke pager berikutnya',
//       'previousPagerTooltip': 'Ke halaman sebelumnya'
//     }
//   }
// });

Vue.use(DatePickerPlugin);
Vue.use(GridPlugin);

export default {
  components: {
    Satuan,
    HargaJual,
    HargaBeli,
    // Stok,
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
      isLoading: false,
      fullPage: true,
      HariIni: new Date().toISOString().substr(0, 10),
      menutanggalhargabeli: false,
      menutanggalhargajual: false,
      gudang: [],
      tab: false,
      tab1: false,
      editedIndex: -1,
      divisi: "",
      namaSupplier: [],
      barangcount: "",
      waterMark: "Merk",
      SelectMerk: [],
      editedItem: {
        Kode: "",
        Nama: "",
        Merk: "",
        Kategori: "",
        PartNumber1: "",
        PartNumber2: "",
        Kendaraan: "",
        KodeSupplier: "",
        Dimensi: "",
        Aktif: true,
        Gudang: "",
        Memo: "",
        StokMinimum: 0,
        StokMaksimum: 0,
        MataUang: "",
        StockOnHand: "",
        TanggalHargaJual: "",
        TanggalHargaBeli: "",
        HargaBeli: "",
        HargaJual: "",
        DiskonHargaBeli: "",
        satuan: "",
      },
      defaultItem: {
        Kode: "",
        Nama: "",
        Merk: "",
        Kategori: "",
        PartNumber1: "",
        PartNumber2: "",
        Kendaraan: "",
        KodeSupplier: "",
        Dimensi: "",
        Aktif: true,
        Gudang: "",
        Memo: "",
        StokMinimum: 0,
        StokMaksimum: 0,
        Rasio: "",
        MataUang: "",
        StockOnHand: "",
        TanggalHargaJual: "",
        TanggalHargaBeli: "",
        HargaBeli: "",
        HargaJual: "",
        DiskonHargaBeli: "",
        satuan: "",
      },
      mataUangs: [],
      itemtabsatuan: [],
      itemtabstok: [],
      itemtabhargajual: [],
      itemtabhargabeli: [],
      selectedbarang: [],
      DataSupplier: [],
      dialog: false,
      dialogsatuan: false,
      dialoghargajual: false,
      dialoghargabeli: false,
      dialogPilihSupplier: false,
      dialogstok: false,
      toolbarOptions: ["Search", "Update", "Cancel"],
      toolbarOptionsSelect: ["Search"],
      // dataStateChange: false,
      token: localStorage.getItem("token"),
      data: [],

      commands: [],
      firstSearch: false,
      sorted: null,
      filter: null,
      groupSettings: {
        allowReordering: true,
      },
      selectionOptions: {
        type: "Multiple",
      },
      pageSettingsSupplier: {
        pageSize: 5,
        pageSizes: ["5", "10", "15", "20", "50", "All"],
      },
      pageSettings: {
        pageSize: 100,
        pageSizes: ["20", "50", "100"],
      },
      filterOptions: { type: "CheckBox" },
      skip: 0,
      take: 100,
      // filter: {
      //   type: 'CheckBox'
      // },
      editSettings: {
        showDeleteConfirmDialog: true,
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
      },

      footerSum: function () {
        return {
          template: Vue.component("SumTemplate", {
            template: `<span>Sum: {{data.Sum}}</span>`,
            data() {
              return {
                data: {},
              };
            },
          }),
        };
      },
      footerMax: function () {
        return {
          template: Vue.component("MaxTemplate", {
            template: `<span>Max: {{data.Max}}</span>`,
            data() {
              return {
                data: {},
              };
            },
          }),
        };
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
    // check actions
    if (this.action.some((a) => a == "R")) {
      // read
      // this.getData()
      this.getDataPage(0, 100);
      // this.getSupplier()
      this.getGudang();
      this.getDataMerk();
      this.getDataUang();
      // this.countBarang()
    }

    if (this.action.some((a) => a == "C")) {
      //create
      this.btn_tambah = false;
    }
    if (this.action.some((a) => a == "U")) {
      // edit
      this.commands.push({
        title: "Edit",
        buttonOption: {
          cssClass: "e-flat Edit",
          iconCss: "e-edit e-icons",
        },
      });
    }
    if (this.action.some((a) => a == "D")) {
      //delete
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

  watch: {
    "editedItem.Nama": function (params) {
      if (params == "") {
        this.pesan = "Nama Barang tidak boleh kosong";
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

    //  dialog(val){
    //     val || this.close()
    //   },
    // dialog:{
    //   handler(){
    //     if (this.dialog == true) {
    //       console.log('hilang')
    //     }
    //   }
    // },
    // data: {
    //   handler() {
    //     this.countBarang()
    //   }
    // },
    itemtabsatuan: {
      handler() {
        // this.getRasio()
        console.log(this.itemtabsatuan);
        // this.getEditSatuan()
      },
      deep: true,
    },
    // itemtabhargabeli: {
    //     handler() {
    //   this.getEditHrgBeli()
    //   },
    // },
    // itemtabhargajual: {
    //     handler() {
    //   this.getEditHrgJual()
    //   },
    // }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Barang" : "Edit Barang";
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
    getDataMerk() {
      api.get("/merk-barang?token=" + this.token).then(
        (res) => {
          this.SelectMerk = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getDataUang() {
      api.get("/mataUangs?token=" + this.token).then(
        (res) => {
          this.mataUangs = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    save() {
      if (this.editedIndex == -1) {
        if (this.editedItem.Nama == "") {
          this.alert = true;
          this.pesan = "Nama Barang tidak boleh kosong";
        } else if (this.editedItem.Kategori == "") {
          this.alert = true;
          this.pesan = "Kategori harus diisi";
        } else if (this.editedItem.PartNumber1 == "") {
          this.alert = true;
          this.pesan = "Part Number1 tidak boleh kosong";
        } else if (this.itemtabsatuan.length == 0) {
          this.alert = true;
          this.pesan = "Tambahkan Satuan Barang";
        } else {
          this.isLoading = true;
          this.TambahData();
        }
      } else {
        if (this.editedItem.Nama == "") {
          this.alert = true;
          this.pesan = "Nama Barang tidak boleh kosong";
        } else if (this.editedItem.Kategori == "") {
          this.alert = true;
          this.pesan = "Kategori harus diisi";
        } else {
          this.isLoading = true;
          this.UpdateData();
        }
      }
    },
    // countBarang() {
    //   this.divisi = "01"
    //   let x = "0000000"
    //   let spacer = "/"
    //   let x0 = 1
    //   let s0 = []
    //   let totalitem = []
    //   let cariygbesar = []
    //   if (this.data.length > 0) {
    //     for (let index = 0; index < this.data.length; index++) {
    //       const element = this.data[index];
    //       s0.push(element)
    //       totalitem.push(s0[index].Kode)
    //     }
    //     // totalitem.sort(function(a, b){return b-a})
    //     cariygbesar = parseInt(s0.length - 1)
    //     let xsx = totalitem[cariygbesar]
    //     let xsx1 = xsx.slice(3, 10)
    //     let xsx2 = xsx1.replace(/^0+/, '')
    //     let desc = parseInt(xsx2) + 1
    //     let r0 = (x + desc).slice(-x.length)
    //     this.editedItem.Kode = (this.divisi + spacer + r0)
    //   } else if (this.data.length == 0) {
    //     let yuklah = (x + x0).slice(-x.length)
    //     this.editedItem.Kode = (this.divisi + spacer + yuklah)
    //   }
    //   // let x99 = parseInt(this.data.length+x0)
    //   // if (this.data.length > 0) {
    //   //   let count = (x+x99).slice(-x.length)
    //   //   this.editedItem.Kode = (this.divisi+spacer+count)
    //   // }else{
    //   //   let count = (x+x99).slice(-x.length)
    //   //   this.editedItem.Kode = (this.divisi+spacer+count)
    //   // }
    // },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    SyncSatuan(satuan) {
      // this.itemtabsatuan.push(satuan)
      // this.itemtabsatuan = [...this.itemtabsatuan]
      // Vue.prototype.$rasio = this.itemtabsatuan
      console.log(satuan);
      this.itemtabsatuan = satuan;
    },
    SyncSatuanEdit(satuan) {
      this.itemtabsatuan = satuan;
      this.itemtabsatuan = [...this.itemtabsatuan];
      Vue.prototype.$rasio = this.itemtabsatuan;
    },
    SyncHargaJual(hrgjual) {
      // this.itemtabhargajual.push(hrgjual)
      this.itemtabhargajual = hrgjual;
      console.log(hrgjual);
      // this.itemtabhargajual = [...this.itemtabhargajual]
    },
    SyncHargaJualEdit(hrgjual) {
      this.itemtabhargajual = hrgjual;
      this.itemtabhargajual = [...this.itemtabhargajual];
    },
    SyncHargaBeli(hrgbeli) {
      // this.itemtabhargabeli.harga.push(hrgbeli)
      console.log(hrgbeli);
      this.itemtabhargabeli = hrgbeli;
      // this.itemtabhargabeli = [...this.itemtabhargabeli]
    },
    SyncHargaBeliEdit(hrgbeli) {
      this.itemtabhargabeli = hrgbeli;
      this.itemtabhargabeli = [...this.itemtabhargabeli];
    },
    getRasio() {
      let x = [];
      if (this.itemtabsatuan.length > 0) {
        for (let index = 0; index < this.itemtabsatuan.length; index++) {
          const element = this.itemtabsatuan[index];
          element.Rasio = this.itemtabsatuan[index].Rasio;
          element.NamaSatuan = this.itemtabsatuan[index].NamaSatuan;
          x.push(element);
          // sessionStorage.setItem('satuan', JSON.stringify(x))
          // console.log(x)
        }
      }
      // else {
      //   sessionStorage.setItem('satuan', '[]')
      // }
    },
    TambahData() {
      // let gudang = this.gudang.find((d) => (d.Nama = this.editedItem.Gudang));
      api
        .post("/barangs?token=" + this.token, {
          Kode: this.editedItem.Kode,
          Nama: this.editedItem.Nama,
          Merk: this.editedItem.Merk,
          Kategori: this.editedItem.Kategori,
          PartNumber1: this.editedItem.PartNumber1,
          PartNumber2: this.editedItem.PartNumber2,
          Kendaraan: this.editedItem.Kendaraan,
          KodeSupplier: this.editedItem.KodeSupplier,
          Dimensi: this.editedItem.Dimensi,
          Aktif: this.editedItem.Aktif,
          Gudang: this.editedItem.Gudang,
          Memo: this.editedItem.Memo,
          satuan: this.itemtabsatuan,
          StokLimit: {
            StokMinimum: this.editedItem.StokMinimum,
            StokMaksimum: this.editedItem.StokMaksimum,
          },
        })
        .then(() => {
          this.isLoading = false;
          this.close();
          // this.getData()
          this.getDataPage(this.skip, this.take);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    UpdateData() {
      this.$refs.ggs.ej2Instances.searchSettings.key = "";
      let gudang = this.gudang.find((d) => (d.Nama = this.editedItem.Gudang));
      let hargaBeli = this.itemtabhargabeli.map((d) => {
        let obj = {};
        obj = d;
        obj.Rasio = this.itemtabsatuan.find((x) => x.Nama == obj.Rasio).Rasio;
        obj.MataUang = this.mataUangs.find((y) => y.Nama == obj.MataUang).Kode;
        return obj;
      });
      let hargaJual = this.itemtabhargajual.map((d) => {
        let obj = {};
        obj = d;
        obj.Rasio = this.itemtabsatuan.find((x) => x.Nama == obj.Rasio).Rasio;
        obj.MataUang = this.mataUangs.find((y) => y.Nama == obj.MataUang).Kode;
        return obj;
      });
      api
        .put("/barangs/" + this.editedItem.id + "?token=" + this.token, {
          Kode: this.editedItem.Kode,
          Nama: this.editedItem.Nama,
          Merk: this.editedItem.Merk,
          Kategori: this.editedItem.Kategori,
          PartNumber1: this.editedItem.PartNumber1,
          PartNumber2: this.editedItem.PartNumber2,
          Kendaraan: this.editedItem.Kendaraan,
          KodeSupplier: this.editedItem.KodeSupplier,
          Dimensi: this.editedItem.Dimensi,
          Aktif: this.editedItem.Aktif,
          Gudang: typeof gudang.Nama === "object" ? gudang.Kode : gudang.Nama,
          Memo: this.editedItem.Memo,
          StokLimit: {
            StokMinimum: this.editedItem.StokMinimum,
            StokMaksimum: this.editedItem.StokMaksimum,
          },
          satuan: this.itemtabsatuan,
          hrgbeli: hargaBeli,
          hrgjual: hargaJual,
        })
        .then(() => {
          this.isLoading = false;
          this.close();
          // this.getData()
          this.getDataPage(this.skip, this.take);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    resetAll() {
      console.log("ok");
      // let x = sessionStorage.getItem('hrgbeliEdit')
      // let x2 = sessionStorage.getItem('hrgjualEdit')
      // if (this.itemtabsatuan > 0) {
      //   this.$refs.Satuan.resetSatuan()
      // }else{
      //   this.$refs.Satuan.resetSatuan()
      // }
      // if (this.itemtabhargabeli > 0) {
      //   this.$refs.HargaBeli.resetHargaBeli()
      // }else{
      //   this.$refs.HargaBeli.resetHargaBeli()
      //       // do nothing
      // }
      // if (this.itemtabhargajual > 0) {
      //   this.$refs.HargaJual.HargaJualReset()
      // }else{
      //   this.$refs.HargaJual.HargaJualReset()
      //      //do nothing
      // }
    },
    close() {
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        // this.editedItem.Gudang = this.gudang[0].Nama;
        // this.defaultItem.Gudang = this.gudang[0].Nama;
        [...this.gudang];
        console.log(this.gudang);
      });
      this.dialog = false;
      this.alert = false;
      this.namaSupplier = [];
      this.itemtabsatuan = [];
      this.itemtabhargabeli = [];
      this.itemtabhargajual = [];
      this.itemtabstok = [];
      this.selectedbarang = [];
      this.tab = "1";
      // this.countBarang()
      this.resetAll();
      // sessionStorage.removeItem("satuan")
      // sessionStorage.removeItem("satuanEdit")
    },
    savePilihSupplier() {
      this.dialogPilihSupplier = false;
    },

    // clearbarang() {
    //   this.editedItem.Nama = this.Nama = ""
    //   this.editedItem.Merk = this.Merk = ""
    //   this.editedItem.Kategori = this.Kategori = ""
    //   this.editedItem.PartNumber1 = this.PartNumber1 = ""
    //   this.editedItem.PartNumber2 = this.PartNumber2 = ""
    //   this.editedItem.Kendaraan = this.Kendaraan = ""
    //   this.editedItem.KodeSupplier = this.KodeSupplier = ""
    //   this.editedItem.Dimensi = this.Dimensi = ""
    //   this.Aktif= false,
    //   this.editedItem.Gudang = this.Gudang = ""
    //   this.editedItem.Memo = this.Memo = ""
    //   this.editedItem.StokMin = this.StokMin = ""
    //   this.editedItem.StokMaks = this.StokMaks = ""
    //   this.editedItem.Rasio = this.Rasio = ""
    //   this.editedItem.MataUang = this.MataUang = ""
    //   this.editedItem.StockOnHand = this.StockOnHand = ""
    //   this.editedItem.TanggalHargaJual = this.TanggalHargaJual = ""
    //   this.editedItem.TanggalHargaBeli = this.TanggalHargaBeli = ""
    //   this.editedItem.HargaBeli = this.HargaBeli = ""
    //   this.editedItem.HargaJual = this.HargaJual = ""
    //   this.editedItem.DiskonHargaBeli = this.DiskonHargaBeli = ""
    // },

    closePilihSupplier() {
      this.dialogPilihSupplier = false;
    },
    rowSelectedSupplier: function (args) {
      this.editedItem.KodeSupplier = args.data.Kode;
      this.namaSupplier = args.data.Nama;
    },
    sesiEditSatuan() {
      sessionStorage.setItem("satuanEdit", JSON.stringify(this.itemtabsatuan));
    },
    getEditSatuan() {
      if (this.itemtabsatuan.length > 0) {
        localStorage.setItem("temp", "OK");
      } else {
        sessionStorage.setItem("satuanEdit", "[]");
        localStorage.removeItem("temp");
        sessionStorage.removeItem("satuanEdit");
      }
    },
    getEditHrgBeli() {
      if (this.itemtabhargabeli.length > 0) {
        localStorage.setItem("temp", "OK");
      } else {
        sessionStorage.setItem("brg", "[]");
        sessionStorage.removeItem("hrgbeliEdit");
      }
    },
    getEditHrgJual() {
      if (this.itemtabhargajual.length > 0) {
        localStorage.setItem("temp", "OK");
      } else {
        sessionStorage.setItem("brg", "[]");
        sessionStorage.removeItem("hrgjualEdit");
      }
    },
    commandClick: function (args) {
      if (args.target.classList.contains("custombutton")) {
        // let data = JSON.stringify(args.rowData)
        // console.log(data)
      } else if (args.target.classList.contains("Delete")) {
        var r = confirm("Yakin Hapus Data?");
        if (r == true) {
          api
            .delete("/barangs/" + args.rowData.id + "?token=" + this.token)
            .then(() => {
              // this.item.splice(index, 1)

              // this.getData()
              this.getDataPage(0, 100);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else if (args.target.classList.contains("Edit")) {
        let data = args;
        this.editedIndex = 1;
        this.isLoading = true;
        this.dialog = true;
        this.editedItem = data.rowData;
        api.get("/barangs/" + data.rowData.id + "?token=" + this.token).then(
          (res) => {
            this.itemtabsatuan = res.data.satuan;
            this.editedItem.Gudang = this.gudang.find(
              (g) => g.Kode == res.data.Gudang
            );
            // this.editedItem.StokMinimum =
            //   res.data.stoklimit === null ? 0 : res.data.stoklimit.StokMinimum;
            // this.editedItem.StokMaksimum =
            //   res.data.stoklimit === null ? 0 : res.data.stoklimit.StokMaksimum;
            this.itemtabhargajual = res.data.hrgjual.map((d) => {
              let obj = d;
              obj.Rasio = res.data.satuan.find(
                (dx) => dx.Rasio == d.Rasio
              ).Nama;
              obj.MataUang = this.mataUangs.find(
                (m) => m.Kode == d.MataUang
              ).Nama;
              return obj;
            });
            this.itemtabhargabeli = res.data.hrgbeli.map((d) => {
              let obj = d;
              obj.Rasio = res.data.satuan.find(
                (dx) => dx.Rasio == d.Rasio
              ).Nama;
              obj.MataUang = this.mataUangs.find(
                (m) => m.Kode == d.MataUang
              ).Nama;
              return obj;
            });
            // this.itemtabstok = res.data.stok;
            this.mataUangs = [...this.mataUangs];
            this.isLoading = false;
          },
          (err) => {
            console.log(err);
          }
        );
      }
    },
    bukatab2() {
      let x = sessionStorage.getItem("Page");
      if (x == "OK") {
        this.$refs.HargaJual.setHargaJual();
      } else {
        // Do Nothing
      }
    },
    bukatab3() {
      let x = sessionStorage.getItem("Page");
      if (x == "OK") {
        this.$refs.HargaBeli.setHargaBeli();
      } else {
        // Do Nothing
      }
    },
    // actioncomplete(args) {
    //   console.log(args)
    // },
    // cellEdit(args) {
    //   // console.log(args)
    //   if (args.columnName === 'Kode' ||
    //     args.columnName === 'Commands' ||
    //     args.columnName === 'KodeSupplier' ||
    //     args.columnName === 'Gudang'
    //   ) {
    //     args.cancel = true;
    //   }
    //   if (args.rowData.Aktif === 'false') {
    //     args.cancel = true;
    //   }
    // },
    // customiseCell: function (args) {
    //   // console.log(args)
    //   if (args.column.field === 'Kode' ||
    //     args.column.field === 'Nama' ||
    //     args.column.field === 'Merk' ||
    //     args.column.field === 'Kategori' ||
    //     args.column.field === 'PartNumber1' ||
    //     args.column.field === 'PartNumber2' ||
    //     args.column.field === 'Kendaraan' ||
    //     args.column.field === 'KodeSupplier' ||
    //     args.column.field === 'Dimensi' ||
    //     args.column.field === 'AktifCheck' ||
    //     args.column.field === 'Gudang' ||
    //     args.column.field === 'StokMin' ||
    //     args.column.field === 'StokMaks' ||
    //     args.column.field === 'Commands'
    //   ) {
    //     if (args.data['AktifCheck'] == false) {
    //       args.cell.classList.add('TidakAktif');
    //     }
    //   }
    //   // if (args.column.field === 'Kode') {
    //   //   args.cell.classList.add('TidakAktif');
    //   // }
    // },
    getSupplier() {
      api.get("/suppliers?token=" + this.token).then(
        (res) => {
          // console.log(res)
          this.DataSupplier = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getBool(x) {
      return !!String(x).toLowerCase().replace(!!0, "");
    },
    dataStateChange: function (state) {
      if (state.action.requestType === "paging") {
        this.skip = state.skip;
        this.take = state.take;
        if (state.search != undefined) {
          api
            .get(
              "barangs?token=" +
                this.token +
                "&search=" +
                state.search[0].key +
                "&skip=" +
                state.skip +
                "&take=" +
                state.take
            )
            .then((res) => {
              this.data = res.data;
            });
        } else if (state.search == undefined) {
          this.getDataPage(
            state.skip,
            state.take,
            this.sorted != null ? this.sorted : undefined,
            this.filter != null ? this.filter : undefined
          );
        }
      }
      if (
        state.action.requestType === "sorting" ||
        state.action.requestType === "grouping" ||
        state.action.requestType === "ungrouping"
      ) {
        // SORTIR GROUPING UNGROUPING
        // MULTI GROUPING
        this.$refs.ggs.clearFiltering();
        this.sorted =
          state.sorted == undefined
            ? undefined
            : state.sorted.length > 1
            ? state.sorted.map((element) => {
                return element.name + " " + element.direction;
              })
            : state.sorted[0].name + " " + state.sorted[0].direction;
        if (state.sorted != undefined && state.sorted.length > 1) {
          this.sorted = new URLSearchParams({ st: this.sorted }).toString();
        }
        this.getDataPage(state.skip, state.take, this.sorted);
        this.query = null;
        this.filter = null;
      }
      if (state.action.requestType === "filterchoicerequest") {
        var objDistinct = {};
        let queryString =
          state.action.query.distincts.length > 1
            ? state.action.query.distincts.at(-1) +
              ";" +
              new URLSearchParams(objDistinct).toString()
            : state.action.query.distincts[0];
        if (this.query != null) {
          queryString = queryString + ";" + this.query;
        }
        api
          .get("barangs?token=" + this.token + "&dist=" + queryString)
          .then((res) => {
            state.dataSource(res.data.result);
            localStorage.setItem("ds", JSON.stringify(res.data.result));
          });
      }

      if (state.action.requestType === "filtersearchbegin") {
        if (state.action.value == undefined) {
          state.dataSource(JSON.parse(localStorage.getItem("ds")));
        } else {
          state.dataSource(
            this.filterByValue(
              JSON.parse(localStorage.getItem("ds")),
              state.action.value
            )
          );
        }
      }
      if (
        state.action.requestType === "filtering" &&
        state.action.action !== "clear-filter"
      ) {
        let filter = {};
        let val = [];
        let prop =
          state.where[0].predicates[0].predicates == undefined
            ? state.where[0].predicates[0].field
            : state.where[0].predicates[0].predicates[0].field;
        if (state.where[0].predicates[0].predicates == undefined) {
          val.push(state.where[0].predicates[0].value);
        } else {
          state.where[0].predicates[0].predicates.forEach((element) => {
            val.push(element.value);
          });
        }
        filter[prop] = val;
        let url = new URLSearchParams(filter).toString();
        this.query = this.query != null ? this.query + ";" + url : url;
        if (this.filter != null && this.filter.includes(prop)) {
          let jadiArr = this.filter.split(";");
          jadiArr.forEach(function (element, index, array) {
            if (element.includes(prop)) {
              array[index] = url;
            }
          });
          this.filter = jadiArr.toString().replaceAll(",", ";");
        } else {
          this.filter = this.filter != null ? this.filter + ";" + url : url;
        }
        this.getDataPage(state.skip, state.take, undefined, this.filter);
        this.$refs.ggs.clearFiltering();
      }
      if (state.action.action === "clear-filter") {
        this.getDataPage(
          state.skip,
          state.take,
          this.sorted != null ? this.sorted : undefined
        );
        this.query = null;
        this.filter = null;
      }
      if (state.action.requestType === "searching") {
        state.skip = 0;
        state.take = 100;
        if (
          state.action.searchString == "" &&
          this.$refs.ggs.$el.ej2_instances[0].pageSettings.currentPage == 1
        ) {
          this.getDataPage(0, 100);
        } else if (
          this.$refs.ggs.$el.ej2_instances[0].pageSettings.currentPage == 1
        ) {
          api
            .get(
              "barangs?token=" +
                this.token +
                "&search=" +
                state.action.searchString +
                "&skip=" +
                0 +
                "&take=" +
                100
            )
            .then((res) => {
              this.data = res.data;
            });
        } else {
          this.$refs.ggs.$el.ej2_instances[0].pageSettings.currentPage = 1;
        }
      }
    },
    filterByValue(array, string) {
      return array.filter((o) =>
        Object.keys(o).some((k) =>
          o[k] != null || o[k] != undefined
            ? o[k].toLowerCase().includes(string.toLowerCase())
            : ""
        )
      );
    },
    getGudang() {
      api.get("/gudangs?token=" + this.token).then(
        (res) => {
          this.gudang = res.data;
          this.editedItem.Gudang = this.gudang[0].Nama;
          this.defaultItem.Gudang = this.gudang[0].Nama;
        },
        (err) => {
          console.log(err);
        }
      );
    },

    getDataPage(skip, take, sort, filter) {
      api
        .get(
          "barangs?token=" +
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
            let dataCust = {};
            dataCust.count = res.data.count;
            dataCust.result = res.data.result.map((d) => {
              d.Aktif = d.Aktif === "1";
              return d;
            });
            this.data = dataCust;
          },
          (err) => {
            console.log(err);
          }
        );
    },
    getData() {
      this.isLoading = true;
      api.get("/barangs?token=" + this.token).then(
        (res) => {
          this.isLoading = false;
          //console.log(res)
          let x = [];
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            element.AktifCheck = this.getBool(element.Aktif);
            x.push(element);
          }
          this.data = x;
          // console.log(this.data)
          // this.countBarang()
        },
        (err) => {
          console.log(err);
          this.$router.push("/");
          this.localStorage.removeItem("token");
        }
      );
    },
  },
};
</script>

<style>
/* @import url(https://cdn.syncfusion.com/ejs2/material.css); */
</style>
