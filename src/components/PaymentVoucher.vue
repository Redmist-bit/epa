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
            <v-btn text @click="getDataPV(tanggal_awal, tanggal_akhir)"
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
            <strong>{{ $t("PV.MainTitle") }}</strong>
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
            {{ $t("PV.MainTitle") }}
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

          <v-dialog v-model="dialog" scrollable persistent max-width="900px">
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
                  <span>{{ formTitle }}</span>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon @click="close">
                  <v-icon>mdi-window-close</v-icon>
                </v-btn>
              </v-toolbar>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        :disabled="true"
                        v-model="editedItem.KodeNota"
                        label="Kode Nota"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.Referensi"
                        label="Referensi"
                        :maxlength="50"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-menu
                        v-model="Menutanggal"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.Tanggal"
                            label="Tanggal"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.Tanggal"
                          @input="Menutanggal = false"
                          color="blue darken-4"
                          locale="id"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                    <!-- #Data Items Ipo-->
                    <v-col cols="12">
                      <v-card class="elevation-5" outlined>
                        <v-tabs
                          background-color="white"
                          color="dark"
                          slider-color="blue darken-4"
                        >
                          <v-tab>Detail</v-tab>
                          <v-divider
                            class="mx-2"
                            color="418BE5"
                            inset
                            vertical
                          ></v-divider>
                          <v-tab-item>
                            <Detail
                              v-on:detail="itemsDetail($event)"
                              :listDetail="Detail"
                              :title="title"
                              v-bind:itemsPv="itemsPv"
                              v-on:hapus_item="hps_items($event)"
                            />
                          </v-tab-item>
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
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="error" @click="close">
                  <v-icon class="mr-1">mdi-close-circle</v-icon
                  >{{ $t("All.BtnBatal") }}
                </v-btn>
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

        <div id="app">
          <ejs-grid
            :height="mobile ? '43vh' : 'auto'"
            width="100%"
            gridLines="Both"
            :dataSource="DataPaymentVoucher"
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
                width="180"
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
                field="Total"
                type="number"
                format="N"
                headerText="Total"
                textAlign="Right"
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
                headerText="KeteranganStatus"
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
                headerText="JumlahCetak"
                textAlign="Left"
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

    <v-dialog
      v-model="dialog_batal"
      transition="dialog-bottom-transition"
      max-width="400"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>Batal Pembelian</v-toolbar>
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
                  v-model="editedItem.KodeNota"
                  readonly
                  label="Kode Nota"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12" sm="12">
                <v-text-field
                  v-model="editedItem.Referensi"
                  readonly
                  label="Referensi"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12" sm="12">
                <v-text-field
                  v-model="editedItem.Tanggal"
                  readonly
                  label="Tanggal"
                ></v-text-field>
              </v-col>
            </v-row>

            <strong class="text-h5"><b>Debit</b></strong>
            <v-row no-gutters class="ml-n3 mr-n3 mb-6">
              <Detail
                v-on:detail="itemsDetail($event)"
                :listDetail="Detail"
                :title="title"
                v-bind:itemsPv="itemsPv"
                v-on:hapus_item="hps_items($event)"
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
  </div>
</template>

<script>
import Vue from "vue";
import Loading from "vue-loading-overlay";
import api from "../services/http";
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
import Detail from "../views/PaymentVoucher/detail.vue";
export default {
  components: {
    Loading,
    Detail,
  },
  data() {
    return {
      dialog_detail: false,
      ScrollKeAtas: false,
      mobile: null,
      windowSize: { x: 0, y: 0 },
      dialogPaymentVoucher: false,
      dialog: false,
      dialog_print: false,
      isLoading: false,
      fullPage: true,
      MenuTanggalAwal: false,
      MenuTanggalAkhir: false,
      Menutanggal: false,
      reportDesign: null,
      tanggal_awal: "",
      tanggal_akhir: "",
      items_periode: [],
      printOutItems: [],
      dialog_periode: true,
      dialog_batal: false,
      action: null,
      btn_tambah: true,
      btn_simpan: false,
      editedIndex: -1,
      defaultItem: {
        KodeNota: "",
        Referensi: "",
        Tanggal: "",
        Keterangan: "",
      },
      editedItem: {
        KodeNota: "",
        Referensi: "",
        Tanggal: "",
        Keterangan: "",
      },
      hapus_items: [],
      itemsPv: [],
      title: "",
      keterangan_batal: "",
      Detail: [],
      DataPaymentVoucher: [],
      btn_datagrid: true,
      token: localStorage.getItem("token"),
      commands: [],
      commandsMobile: [
        { buttonOption: { content: "Details", cssClass: "e-flat Details" } },
      ],
      groupSettings: { allowReordering: true },
      selectionOptions: { type: "Multiple" },
      toolbarOptions: ["Search", "ExcelExport"],
      pageSettings: {
        pageSize: 5,
        pageSizes: ["5", "10", "15", "20", "50", "All"],
      },
      filterOptions: { type: "Menu" },
      filter: { type: "Excel" },
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
      this.btn_datagrid = false;
      this.tanggal_awal = JSON.parse(
        localStorage.getItem("Periode")
      )[0].TglAwal;
      this.tanggal_akhir = JSON.parse(
        localStorage.getItem("Periode")
      )[0].TglAkhir;
      this.getDataPV(
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
        title: "Batal/Hapus",
        buttonOption: {
          cssClass: "e-flat Delete",
          iconCss: "e-delete e-icons",
        },
      });
    }
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
    if (this.$route.params.printOut != "No Printed Document") {
      this.$route.params.printOut.split(",").forEach((element) => {
        this.printOutItems.push({
          text: element,
          target: ".e-content",
          id: element.replace(/\s/g, ""),
        });
      });
    }
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

    dialog(val) {
      val || this.close();
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Tambah Payment Voucher"
        : "Ubah Payment Voucher";
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
      // console.log(this.reportDesign)
      await api
        .get("report-pv/" + this.editedItem.id + "?token=" + this.token)
        .then(
          (res) => {
            // console.log(res)
            this.$router.push({
              name: "cetakPaymentVoucher",
              params: {
                // nama: 'tes',
                data: res.data.data,
              },
            });
          },
          (err) => {
            console.log(err);
          }
        );
    },
    hps_items(data) {
      // console.log(data)
      this.hapus_items = data;
    },
    Batalin(val) {
      api
        .put("/batal-pv/" + this.editedItem.id + "?token=" + this.token, {
          keterangan: val,
        })
        .then(() => {
          // console.log(res)
          this.getDataPV(this.tanggal_awal, this.tanggal_akhir);
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialog_batal = false;
      this.keterangan_batal = "";
    },
    rowDataBound: function (args) {
      if (args.data.Status == "BATAL") {
        args.row.classList.add("above-80");
        args.row.classList.add("edit-batal");
        args.row.classList.add("hapus-batal");
      }
    },
    itemsDetail(v) {
      this.Detail = v;
    },
    getDataPV(from, to) {
      this.isLoading = true;
      api
        .get("/payment-voucher/" + from + "/" + to + "?token=" + this.token)
        .then(
          (res) => {
            this.isLoading = false;
            this.dialog_periode = false;
            this.DataPaymentVoucher = res.data.data;
          },
          (err) => {
            console.log(err);
            this.isLoading = false;
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
    change_print(a) {
      this.reportDesign = a;
    },
    save() {
      if (this.formTitle === "Tambah Payment Voucher") {
        this.TambahData();
      } else {
        this.UpdateData();
      }
    },
    TambahData() {
      this.editedItem.items = this.Detail;
      this.editedItem.Total = this.Detail.reduce(
        (a, b) => a + parseFloat(b.Jumlah),
        0
      );
      this.isLoading = true;
      api
        .post("payment-voucher?token=" + this.token, this.editedItem)
        .then(() => {
          this.isLoading = false;
          this.close();
          this.getDataPV(this.tanggal_awal, this.tanggal_akhir);
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
      this.editedItem.new_items = this.Detail.filter(
        (d) => d.KodeNota == undefined
      );
      api
        .put(
          "payment-voucher/" + this.editedItem.id + "?token=" + this.token,
          this.editedItem
        )
        .then(() => {
          this.isLoading = false;
          this.close();
          this.hapus_items = [];
          this.getDataPV(this.tanggal_awal, this.tanggal_akhir);
        })
        .catch((err) => {
          this.hapus_items = [];
          console.log(err);
        });
    },
    close() {
      this.$nextTick(() => {
        this.title = "Kosongkan";
        this.editedIndex = -1;
        this.editedItem = Object.assign({}, this.defaultItem);
        this.btn_simpan = false;
        this.dialog = false;
      });
      this.editedItem = Object.assign({}, this.defaultItem);
    },
    commandClick: function (args) {
      if (args.target.classList.contains("Details")) {
        console.log("disni");
        api
          .get("payment-voucher/" + args.rowData.id + "?token=" + this.token)
          .then(
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
              this.itemsPv = res.data.data.detail.map((item) => {
                (item.MataUang = item.mata_uang.Nama),
                  (item.Perkiraan = item.perkiraan.Nama);
                return item;
              });
              this.editedItem = res.data.data;
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
        if (args.rowData.Status == null) {
          var b = confirm("Anda yakin membatalkan transaksi ini?");
          if (b == true) {
            this.editedItem.id = args.rowData.id;
            this.dialog_batal = true;
          }
        } else {
          var r = confirm("Yakin Hapus Data?");
          if (r == true) {
            api
              .delete(
                "/payment-voucher/" + args.rowData.id + "?token=" + this.token
              )
              .then(() => {
                this.getDataPV(this.tanggal_awal, this.tanggal_akhir);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      } else if (args.target.classList.contains("Edit")) {
        // let data = args
        api
          .get("payment-voucher/" + args.rowData.id + "?token=" + this.token)
          .then(
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
              this.itemsPv = res.data.data.detail.map((item) => {
                (item.MataUang = item.mata_uang.Nama),
                  (item.Perkiraan = item.perkiraan.Nama);
                return item;
              });
              this.editedItem = res.data.data;
            },
            (err) => {
              console.log(err);
            }
          );
        this.editedIndex = 1;
        this.title = "Ubah";
        this.dialog = true;
      }
    },
  },
};
</script>

<style></style>
