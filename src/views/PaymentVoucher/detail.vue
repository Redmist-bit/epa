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
      <v-dialog v-model="dialogDetail" max-width="1000px" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            class="mx-n2"
            color="blue darken-4"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
            {{ $t("All.BtnTambah") }}
          </v-btn>
        </template>

        <v-card>
          <v-toolbar dark outline color="blue darken-4" class="elevation-0">
            <v-card-title>
              <span class="headline">Details</span>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn dark text fab small @click="dialogDetail = false">
              <v-icon class="mx-1">mdi-window-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-col cols="12" md="12">
            <v-card>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Perkiraan" readonly v-model="detail.Perkiraan">
                      <template v-slot:append>
                        <v-dialog v-model="dialogPerkiraan">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              dark
                              small
                              class="mt-n2"
                              color="blue darken-4"
                              v-bind="attrs"
                              v-on="on"
                              ><v-icon>mdi-dots-horizontal</v-icon></v-btn
                            >
                          </template>
                          <v-card>
                            <v-toolbar
                              dark
                              outline
                              color="blue darken-4"
                              class="elevation-0"
                            >
                              <v-card-title>
                                <span class="headline">Data WO</span>
                              </v-card-title>
                              <v-spacer></v-spacer>
                              <v-btn
                                dark
                                text
                                fab
                                small
                                @click="dialogPerkiraan = false"
                              >
                                <v-icon class="mx-1">mdi-window-close</v-icon>
                              </v-btn>
                            </v-toolbar>
                            <v-card flat>
                              <v-col cols="12" md="12">
                                <v-card>
                                  <ejs-grid
                                    :dataSource="Perkiraan"
                                    height="200"
                                    width="100%"
                                    gridLines="Both"
                                    :pageSettings="pageSettings"
                                    :toolbar="toolbarOptions"
                                    :recordDoubleClick="rowSelectedPerkiraan"
                                    :allowReordering="true"
                                    :allowResizing="true"
                                    :allowPaging="true"
                                  >
                                    <e-columns>
                                      <e-column
                                        field="Kode"
                                        headerText="Kode"
                                        textAlign="Left"
                                        width="200"
                                      ></e-column>
                                      <e-column
                                        field="Nama"
                                        headerText="Nama"
                                        width="200"
                                      ></e-column>
                                      <e-column
                                        field="IsDetail"
                                        displayAsCheckBox="true"
                                        headerText="IsDetail"
                                        width="180"
                                      ></e-column>

                                      <e-column
                                        field="Sifat"
                                        displayAsCheckBox="true"
                                        headerText="Sifat"
                                        width="180"
                                      ></e-column>

                                      <e-column
                                        field="Aktif"
                                        displayAsCheckBox="true"
                                        headerText="Aktif"
                                        width="180"
                                      ></e-column>

                                      <e-column
                                        field="AccNo"
                                        headerText="Acc No"
                                        width="200"
                                      ></e-column>
                                      <e-column
                                        field="Memo"
                                        headerText="Memo"
                                        width="100"
                                      ></e-column>
                                      <e-column
                                        field="Deskripsi"
                                        headerText="Deskripsi"
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
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Nomor WO" readonly v-model="detail.NomorWO">
                      <template v-slot:append>
                        <v-dialog v-model="dialogNoWO">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              dark
                              small
                              class="mt-n2"
                              color="blue darken-4"
                              v-bind="attrs"
                              v-on="on"
                              ><v-icon>mdi-dots-horizontal</v-icon></v-btn
                            >
                          </template>
                          <v-card>
                            <v-toolbar
                              dark
                              outline
                              color="blue darken-4"
                              class="elevation-0"
                            >
                              <v-card-title>
                                <span class="headline">Data WO</span>
                              </v-card-title>
                              <v-spacer></v-spacer>
                              <v-btn
                                dark
                                text
                                fab
                                small
                                @click="dialogNoWO = false"
                              >
                                <v-icon class="mx-1">mdi-window-close</v-icon>
                              </v-btn>
                            </v-toolbar>
                            <v-card flat>
                              <v-col cols="12" md="12">
                                <v-card>
                                  <ejs-grid
                                    :dataSource="NomorWO"
                                    height="200"
                                    width="100%"
                                    gridLines="Both"
                                    :pageSettings="pageSettings"
                                    :toolbar="toolbarOptions"
                                    :recordDoubleClick="rowSelectedNomorWO"
                                    :dataStateChange="dataStateChange"
                                    :allowReordering="true"
                                    :allowResizing="true"
                                    :allowPaging="true"
                                    ref="ggs"
                                  >
                                    <e-columns>
                                      <e-column
                                        field="KodeNota"
                                        headerText="Nomor Wo"
                                        textAlign="Left"
                                        width="200"
                                      ></e-column>
                                      <e-column
                                        field="Lokasi"
                                        headerText="Lokasi"
                                        width="200"
                                      ></e-column>
                                      <e-column
                                        field="JenisWorkOrder"
                                        headerText="Jenis Work Order"
                                        width="200"
                                      ></e-column>
                                      <e-column
                                        field="Keterangan"
                                        headerText="Keterangan"
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
                  <v-col cols="12" sm="6" md="6">
                    <!-- <v-text-field label="Lokasi" v-model="detail.Lokasi">
                      </v-text-field> -->
                    <v-autocomplete
                      v-model="detail.Lokasi"
                      label="Lokasi"
                      :items="itemsLokasi"
                    >
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <!-- <v-text-field label="Jenis Work Order" v-model="detail.JenisWorkOrder">
                      </v-text-field> -->
                    <v-autocomplete
                      v-model="detail.JenisWorkOrder"
                      label="Jenis Work Order"
                      :items="itemsJenisWorkOrder"
                    >
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-autocomplete
                      v-model="detail.Departemen"
                      label="Departemen"
                      :items="itemsDepartemen"
                    >
                    </v-autocomplete>
                    <!-- <v-text-field label="Departemen" v-model="detail.Departemen">
                      </v-text-field> -->
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Keterangan"
                      v-model="detail.Keterangan"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Mata Uang" readonly v-model="detail.MataUang">
                      <template v-slot:append>
                        <v-dialog v-model="dialogUang">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              dark
                              small
                              class="mt-n2"
                              color="blue darken-4"
                              v-bind="attrs"
                              v-on="on"
                              ><v-icon>mdi-dots-horizontal</v-icon></v-btn
                            >
                          </template>
                          <v-card>
                            <v-toolbar
                              dark
                              outline
                              color="blue darken-4"
                              class="elevation-0"
                            >
                              <v-card-title>
                                <span class="headline">Data WO</span>
                              </v-card-title>
                              <v-spacer></v-spacer>
                              <v-btn
                                dark
                                text
                                fab
                                small
                                @click="dialogUang = false"
                              >
                                <v-icon class="mx-1">mdi-window-close</v-icon>
                              </v-btn>
                            </v-toolbar>
                            <v-card flat>
                              <v-col cols="12" md="12">
                                <v-card>
                                  <ejs-grid
                                    :dataSource="MataUang"
                                    height="200"
                                    width="100%"
                                    gridLines="Both"
                                    :pageSettings="pageSettings"
                                    :toolbar="toolbarOptions"
                                    :recordDoubleClick="rowSelectedMataUang"
                                    :dataStateChange="dataStateChange"
                                    :allowReordering="true"
                                    :allowResizing="true"
                                    :allowPaging="true"
                                  >
                                    <e-columns>
                                      <e-column
                                        field="Kode"
                                        headerText="Kode"
                                        textAlign="Left"
                                        width="200"
                                      ></e-column>
                                      <e-column
                                        field="Nama"
                                        headerText="Nama"
                                        width="200"
                                      ></e-column>
                                      <e-column
                                        field="Aktif"
                                        displayAsCheckBox="true"
                                        headerText="Aktif"
                                        width="200"
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
                  <v-col cols="12" sm="6" md="6">
                    <!-- <v-text-field label="Jumlah Asing" v-model="detail.JumlahAsing">
                      </v-text-field> -->
                    <vuetify-money
                      dense
                      placeholder="1"
                      v-bind:options="asing"
                      label="Jumlah Asing"
                      v-model="detail.JumlahAsing"
                      class="v-input theme--light v-text-field v-text-field--is-booted"
                      @input="Jumlah()"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <!-- <v-text-field label="Kurs" v-model="detail.Kurs">
                      </v-text-field> -->
                    <vuetify-money
                      dense
                      placeholder="1"
                      label="Kurs"
                      v-bind:options="kurs"
                      v-model="detail.Kurs"
                      class="v-input theme--light v-text-field v-text-field--is-booted"
                      @input="Jumlah()"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <!-- <v-text-field label="Jumlah" v-model="detail.Jumlah">
                      </v-text-field> -->
                    <vuetify-money
                      dense
                      placeholder="1"
                      label="Jumlah"
                      v-bind:options="total_bayar"
                      v-model="detail.Jumlah"
                      class="v-input theme--light v-text-field v-text-field--is-booted"
                    />
                  </v-col>
                </v-row>
              </v-container>
              <!-- <ejs-grid 
                  id="Grid"
                  :dataSource="ItemsPembelianList" height='250' width='100%' gridLines='Both'
                  :allowReordering = true
                  :selectionSettings='selectionOptions'
                  :allowSorting='true'
                  :allowMultiSorting='true'
                  :allowFiltering='true'
                  :filterSettings='filterOptions'
                  :allowResizing='true'
                  :allowPaging='true'
                  :pageSettings='pageSettings'
                  :toolbar='toolbarOptionsSelect'
                  :rowSelected="rowSelectedItemsPembelianList"
                >
                  <e-columns>
                    <e-column 
                      :filter='filter'
                      field='Kode' 
                      headerText='Kode' 
                      textAlign='Left'
                      width=180
                    >
                    </e-column>

                    <e-column
                      field='Nama'
                      headerText='nama'
                      width=250
                    >
                    </e-column>

                    <e-column
                      :filter='filter'
                      field='Merk'  
                      headerText='merk' 
                      width=130
                    >
                    </e-column>

                    <e-column
                      field='PartNumber1'
                      headerText='Part Number 1'
                      width=170
                    >
                    </e-column>
                  </e-columns>
                </ejs-grid> -->
            </v-card>
          </v-col>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="blue darken-4" @click="Done">
              <v-icon class="mr-1">{{ iconBtn }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-card color="grey lighten-3" class="pa-2 rounded-lg elevation-0">
      <!-- grid items Barang Ipo -->
      <ejs-grid
        id="Grid"
        :dataSource="listDetail"
        height="200"
        width="100%"
        gridLines="Both"
        :allowReordering="true"
        :allowGrouping="mobile"
        :groupSettings="groupSettings"
        :allowSorting="true"
        :allowMultiSorting="true"
        :allowFiltering="mobile"
        :filterSettings="filterOptions"
        :allowResizing="true"
        :allowPaging="true"
        :commandClick="commandClick"
      >
        <e-columns>
          <e-column
            field="Commands"
            :visible="mobile"
            headerText="Aksi"
            width="110"
            textAlign="Center"
            :commands="commands"
            :lockColumn="true"
          >
          </e-column>

          <e-column
            field="Perkiraan"
            :allowEditing="false"
            headerText="Perkiraan"
            width="170"
          >
          </e-column>

          <e-column
            :filter="filter"
            field="JenisWorkOrder"
            :allowEditing="false"
            headerText="Jenis Work Order"
            width="280"
          >
          </e-column>

          <e-column
            field="Lokasi"
            :allowEditing="false"
            headerText="Lokasi"
            width="170"
          >
          </e-column>

          <e-column
            field="Departemen"
            headerText="Departemen"
            :allowEditing="false"
            width="170"
          >
          </e-column>
          <e-column
            field="NomorWO"
            :allowEditing="false"
            headerText="Nomor WO"
            width="190"
          >
          </e-column>

          <e-column
            field="Keterangan"
            :allowEditing="false"
            headerText="Keterangan"
            width="170"
          >
          </e-column>

          <e-column field="MataUang" headerText="Mata Uang" width="170">
          </e-column>
          <e-column
            field="JumlahAsing"
            headerText="Jumlah Asing"
            width="170"
            type="number"
            format="N"
            textAlign="Right"
          >
          </e-column>
          <e-column
            field="Kurs"
            headerText="Kurs"
            width="170"
            type="number"
            format="N"
            textAlign="Right"
          >
          </e-column>
          <e-column
            field="Jumlah"
            headerText="Jumlah"
            width="170"
            type="number"
            format="N"
            textAlign="Right"
          >
          </e-column>
        </e-columns>

        <e-aggregates>
          <e-aggregate>
            <e-columns>
              <e-column type="Count" field="Perkiraan"></e-column>
              <e-column type="Sum" format="N" field="JumlahAsing"></e-column>
              <e-column type="Sum" format="N" field="Jumlah"></e-column>
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
    itemsPv: Array,
    // listDetail: Array
  },
  data() {
    return {
      mobile: null,
      windowSize: { x: 0, y: 0 },
      listDetail: [],
      kurs: { locale: "id-ID", suffix: "", length: 12, precision: 2 },
      asing: { locale: "id-ID", suffix: "", length: 12, precision: 2 },
      total_bayar: { locale: "id-ID", suffix: "", length: 12, precision: 2 },
      commands: [
        // { title:"Edit", buttonOption: { cssClass: 'e-flat Edit', iconCss: 'e-edit e-icons' } },
        {
          title: "Hapus",
          buttonOption: {
            cssClass: "e-flat Delete",
            iconCss: "e-delete e-icons",
          },
        },
      ],
      toolbarOptions: ["Search"],
      dialogUang: false,
      itemsDepartemen: [
        "PROCESSING",
        "FINANCE ACCOUNTING",
        "HRGA",
        "SCM",
        "SERVICE",
        "IT MARCOMM",
        "HSE",
        "AUDIT",
        "ID",
      ],
      itemsLokasi: [
        "HO",
        "BERAU",
        "PALEMBANG",
        "SUNGAI DANAU",
        "TABANG",
        "MOROWALI",
        "PALU",
      ],
      itemsJenisWorkOrder: [
        "Konstruksi Gedung",
        "Konstruksi Jalan",
        "Konstruksi Bangunan Air",
        "Rental",
      ],
      token: localStorage.getItem("token"),
      dialogPerkiraan: false,
      dialogNoWO: false,
      pageSettings: {
        pageSize: 100,
        pageSizes: ["5", "10", "15", "20", "50", "100"],
      },
      detail: {
        Perkiraan: "",
        NomorWO: "",
        Lokasi: "",
        JenisWorkOrder: "",
        Departemen: "",
        Keterangan: "",
        MataUang: "Rupiah",
        JumlahAsing: 1,
        Kurs: 1,
        Jumlah: 1,
      },
      detailDefault: {
        Perkiraan: "",
        NomorWO: "",
        Lokasi: "",
        JenisWorkOrder: "",
        Departemen: "",
        Keterangan: "",
        MataUang: "Rupiah",
        JumlahAsing: 1,
        Kurs: 1,
        Jumlah: 1,
      },
      NomorWO: {},
      MataUang: [],
      Perkiraan: [],
      hapus_items: [],
      dialogDetail: false,
      dialog: false,
      selectionOptions: { type: "Multiple" },
      filterOptions: { type: "Menu" },
      filter: { type: "CheckBox" },
      groupSettings: { allowReordering: true },
      iconBtn: "mdi-check",
    };
  },
  mounted() {
    this.getDataWo(0, 100);
    this.getPerkiraan();
    this.getMataUang();
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

    title(ket) {
      if (ket == "Kosongkan") {
        this.listDetail = [];
        this.hapus_items = [];
      }
    },
    dialogDetail(v) {
      if (v == false) {
        this.$nextTick(() => {
          this.detail = Object.assign({}, this.detailDefault);
          this.dialogDetail = false;
          this.iconBtn = "mdi-check";
        });
      }
    },
    listDetail(v) {
      this.$emit("detail", v);
    },
    itemsPv(v) {
      this.listDetail = v;
    },
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },

    commandClick: function (args) {
      if (args.target.classList.contains("Edit")) {
        this.iconBtn = "mdi-find-replace";
        this.detail = args.rowData;
        this.dialogDetail = true;
      } else if (args.target.classList.contains("Delete")) {
        // console.log(this.listDetail.findIndex(a => a == args.rowData))
        // console.log(this.listDetail)
        // this.listDetail = [...this.listDetail]
        this.hapus_items.push(this.listDetail.find((a) => a == args.rowData));
        this.$emit("hapus_item", this.hapus_items);
        this.listDetail.splice(
          this.listDetail.findIndex((a) => a == args.rowData),
          1
        );
        document.getElementById("Grid").ej2_instances[0].refresh();
      }
    },
    Jumlah() {
      this.detail.Jumlah =
        parseFloat(this.detail.JumlahAsing) * parseFloat(this.detail.Kurs);
    },
    getMataUang() {
      api.get("mataUangs?token=" + this.token).then(
        (res) => {
          this.MataUang = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getPerkiraan() {
      api.get("coa?token=" + this.token).then(
        (res) => {
          this.Perkiraan = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    rowSelectedMataUang(args) {
      this.detail.MataUang = args.rowData.Nama;
      this.detail.KodeUang = args.rowData.Kode;
      this.dialogUang = false;
    },
    rowSelectedPerkiraan(args) {
      this.detail.Perkiraan = args.rowData.Nama;
      this.detail.KodePerkiraan = args.rowData.Kode;
      this.dialogPerkiraan = false;
    },
    rowSelectedNomorWO(args) {
      // console.log(args)
      this.detail.NomorWO = args.rowData.KodeNota;
      this.detail.Lokasi = args.rowData.Lokasi;
      this.detail.JenisWorkOrder = args.rowData.JenisWorkOrder;
      this.dialogNoWO = false;
    },
    Done() {
      if (this.detail.Perkiraan == "" || this.detail.Lokasi == "" || this.detail.JenisWorkOrder == "" || this.detail.Departemen == "") {
        alert('Perkiraan, Lokasi, JenisWorkOrder, dan Departemen tidak boleh kosong')
      } else {
        if (this.listDetail.length == 0) {
          this.detail.NoUrut = 1;
          this.listDetail.push(this.detail);
        } else {
          this.detail.NoUrut =
            this.listDetail.sort(
              (a, b) => parseInt(b.NoUrut) - parseInt(a.NoUrut)
            )[0].NoUrut + 1;
          this.listDetail.push(this.detail);
        }
        this.listDetail = [...this.listDetail];
        document.getElementById("Grid").ej2_instances[0].refresh();
        console.log(this.listDetail);
        this.dialogDetail = false;
      }
    },
    dataStateChange: function (state) {
      if (state.action.requestType === "paging") {
        this.skip = state.skip;
        this.take = state.take;
        if (state.search != undefined) {
          api
            .get(
              "payment-voucher-wo?token=" +
                this.token +
                "&search=" +
                state.search[0].key +
                "&skip=" +
                state.skip +
                "&take=" +
                state.take
            )
            .then((res) => {
              this.NomorWO = res.data;
            });
        } else if (state.search == undefined) {
          this.getDataWo(
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
          this.getDataWo(0, 100);
        } else if (
          this.$refs.ggs.$el.ej2_instances[0].pageSettings.currentPage == 1
        ) {
          api
            .get(
              "payment-voucher-wo?token=" +
                this.token +
                "&search=" +
                state.action.searchString +
                "&skip=" +
                0 +
                "&take=" +
                100
            )
            .then((res) => {
              this.NomorWO = res.data;
            });
        } else {
          this.$refs.ggs.$el.ej2_instances[0].pageSettings.currentPage = 1;
        }
      }
    },
    getDataWo(skip, take) {
      api
        .get(
          "payment-voucher-wo?token=" +
            this.token +
            "&skip=" +
            skip +
            "&take=" +
            take
        )
        .then(
          (res) => {
            this.NomorWO = res.data;
          },
          (err) => {
            console.log(err);
          }
        );
    },
  },
};
</script>

<style></style>
