<template>
  <div v-resize="onResize">
    <v-dialog v-model="dialogHargaJual" scrollable persistent max-width="700px">
      <v-card>
        <v-toolbar dark dense outline color="blue darken-3" class="elevation-1">
          <v-card-title>
            <v-icon class="mr-1">mdi-file-document-edit</v-icon>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-spacer></v-spacer>
          <v-btn dark text @click="closehargajual">
            <v-icon class="mx-1">mdi-window-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  clearable
                  v-model="editedItem.Nama"
                  label="Barang"
                >
                  <template v-slot:append>
                    <v-dialog
                      v-model="dialogPilihBarang"
                      scrollable
                      max-width="700px"
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
                            <span class="headline">Pilih Barang</span>
                          </v-card-title>
                          <v-spacer></v-spacer>

                          <v-btn dark text fab small @click="closePilihBarang">
                            <v-icon class="mx-1">mdi-window-close</v-icon>
                          </v-btn>
                        </v-toolbar>

                        <v-card flat>
                          <v-col cols="12" md="12">
                            <v-card>
                              <ejs-grid
                                :dataSource="DataBarang"
                                height="200"
                                width="100%"
                                gridLines="Both"
                                :allowReordering="true"
                                :editSettings="editSettings"
                                :selectionSettings="selectionOptions"
                                :allowSorting="true"
                                :allowMultiSorting="true"
                                :allowFiltering="true"
                                :filterSettings="filterOptions"
                                :allowResizing="true"
                                :allowPaging="true"
                                :pageSettings="pageSettingsBarang"
                                :toolbar="toolbarOptions"
                                :commandClick="commandClick"
                                :rowSelected="rowSelectedBarang"
                              >
                                <e-columns>
                                  <!-- <e-column field="Commands" headerText="Action" width="120" :commands="commands" textAlign='Left'>
                                      <div class="btn-group">
                                        <button type="button" class="btn btn-default" (click)='prediemRowEdit($event)'>
                                          <i class="fa fa-pencil"></i></button>
                                        <button type="button" class="btn btn-default" (click)='prediemRowDelete($event)'>
                                            <i class="fa fa-trash"></i></button>
                                      </div>
                                    </e-column> -->

                                  <e-column
                                    :filter="filter"
                                    fieldText=""
                                    field="Kode"
                                    :isPrimaryKey="true"
                                    headerText="Kode"
                                    textAlign="Left"
                                    width="120"
                                  >
                                  </e-column>

                                  <e-column
                                    :filter="filter"
                                    field="Nama"
                                    headerText="Nama"
                                    textAlign="Left"
                                    width="200"
                                  >
                                  </e-column>

                                  <e-column
                                    :filter="filter"
                                    field="Kategori"
                                    headerText="Kategori"
                                    width="200"
                                  >
                                  </e-column>

                                  <e-column
                                    :filter="filter"
                                    field="SubKategori"
                                    headerText="SubKategori"
                                    width="200"
                                  >
                                  </e-column>

                                  <e-column
                                    :filter="filter"
                                    field="Grup"
                                    headerText="Grup"
                                    width="200"
                                  >
                                  </e-column>

                                  <e-column
                                    :filter="filter"
                                    field="SubGrup"
                                    headerText="SubGrup"
                                    width="200"
                                  >
                                  </e-column>

                                  <e-column
                                    :filter="filter"
                                    field="Merk"
                                    headerText="Merk"
                                    width="200"
                                  >
                                  </e-column>

                                  <!-- <e-column :filter='filter' field='AktifCheck' headerText='Aktif' displayAsCheckBox='true' width=110>
                                </e-column> -->

                                  <e-column
                                    :filter="filter"
                                    field="Memo"
                                    headerText="Memo"
                                    width="200"
                                  >
                                  </e-column>

                                  <e-column
                                    :filter="filter"
                                    field="Posting"
                                    headerText="Posting"
                                    width="200"
                                  >
                                  </e-column>

                                  <e-column
                                    :filter="filter"
                                    field="DiBuatTgl"
                                    headerText="DiBuatTgl"
                                    width="200"
                                  >
                                  </e-column>

                                  <e-column
                                    :filter="filter"
                                    field="DiBuatTgl"
                                    headerText="DiBuatTgl"
                                    width="200"
                                  >
                                  </e-column>

                                  <e-column
                                    :filter="filter"
                                    field="DiBuatOleh"
                                    headerText="DiBuatOleh"
                                    width="200"
                                  >
                                  </e-column>

                                  <e-column
                                    :filter="filter"
                                    field="DiUbahTgl"
                                    headerText="DiUbahTgl"
                                    width="200"
                                  >
                                  </e-column>

                                  <e-column
                                    :filter="filter"
                                    field="DiUbahOleh"
                                    headerText="DiUbahOleh"
                                    width="200"
                                  >
                                  </e-column>

                                  <e-column
                                    field="PartNumber1"
                                    headerText="Part Number 1"
                                    textAlign="Left"
                                    width="160"
                                  >
                                  </e-column>

                                  <e-column
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
                                    headerText="Kode Supplier"
                                    textAlign="Left"
                                    width="160"
                                  >
                                  </e-column>

                                  <e-column
                                    field="PartNumber1"
                                    headerText="Part Number 1"
                                    textAlign="Left"
                                    width="160"
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
                                    field="Gudang"
                                    headerText="Gudang"
                                    textAlign="Left"
                                    width="160"
                                  >
                                  </e-column>
                                </e-columns>
                              </ejs-grid>
                            </v-card>
                          </v-col>
                        </v-card>
                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <!-- <v-btn dark color="error" @click="closePilihSupplier">
                            <v-icon class="mr-1">mdi-close-circle</v-icon>Batal
                          </v-btn> -->

                          <v-btn
                            dark
                            color="blue darken-4"
                            @click="savePilihBarang"
                          >
                            <v-icon class="mr-1">mdi-check</v-icon>Pilih
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  clearable
                  :readonly="RasioReadonly"
                  v-model="editedItem.Rasio"
                  label="Rasio"
                >
                  <!-- <template v-slot:append>
                    <v-dialog v-model="dialogPilihRasio" scrollable max-width="700px" persistent>
                      <template v-slot:activator="{on, attrs}">
                        <v-btn dark small class="mt-n2" color="blue darken-4" v-bind="attrs" v-on="on">
                          <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                      </template>

                      <v-card>
                        <v-toolbar dark outline color="blue darken-4" class="elevation-1">
                          <v-card-title>
                            <span class="headline">Pilih Rasio</span>
                          </v-card-title>
                          <v-spacer></v-spacer>

                          <v-btn dark text fab small @click="closePilihRasio">
                            <v-icon class="mx-1">mdi-window-close</v-icon>
                          </v-btn>
                        </v-toolbar>

                        <v-card flat>
                          <v-col cols="12" md="12">
                            <v-card>
                              <ejs-grid :dataSource="DataRasio" height="200" width="100%" gridLines='Both'
                                :allowReordering='true' :editSettings='editSettings'
                                :selectionSettings='selectionOptions' :allowSorting='true' :allowMultiSorting='true'
                                :allowFiltering='true' :filterSettings='filterOptions' :allowResizing='true'
                                :allowPaging='true' :pageSettings='pageSettingsBarang' :toolbar='toolbarOptions'
                                :commandClick="commandClick" :rowSelected="rowSelectedRasio">
                                <e-columns>
                                  <e-column field="Commands" headerText="Action" width="120" :commands="commands" textAlign='Left'>
                                      <div class="btn-group">
                                        <button type="button" class="btn btn-default" (click)='prediemRowEdit($event)'>
                                          <i class="fa fa-pencil"></i></button>
                                        <button type="button" class="btn btn-default" (click)='prediemRowDelete($event)'>
                                            <i class="fa fa-trash"></i></button>
                                      </div>
                                    </e-column>

                                  <e-column :filter='filter' field='Kode' :isPrimaryKey='true' headerText='Barang'
                                    textAlign='Left' width=120>
                                  </e-column>

                                  <e-column :filter='filter' field='Rasio' headerText='Rasio' textAlign='Left'
                                    width=200>
                                  </e-column>

                                  <e-column :filter='filter' field='NamaSatuan' headerText='Nama' width=200>
                                  </e-column>

                                  <e-column :filter='filter' field='created_at' headerText='DiBuatTgl' width=200>
                                  </e-column>

                                  <e-column :filter='filter' field='DiBuatOleh' headerText='DiBuatOleh' width=200>
                                  </e-column>

                                  <e-column :filter='filter' field='updated_at' headerText='DiUbahTgl' width=200>
                                  </e-column>

                                  <e-column :filter='filter' field='DiUbahOleh' headerText='DiUbahOleh' width=200>
                                  </e-column>

                                </e-columns>
                              </ejs-grid>

                            </v-card>
                          </v-col>
                        </v-card>
                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn dark color="error" @click="closePilihSupplier">
                            <v-icon class="mr-1">mdi-close-circle</v-icon>Batal
                          </v-btn>

                          <v-btn dark color="blue darken-4" @click="savePilihRasio">
                            <v-icon class="mr-1">mdi-check</v-icon>Pilih
                          </v-btn>
                        </v-card-actions>

                      </v-card>
                    </v-dialog>

                  </template> -->
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-menu
                  v-model="MenuTanggal"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      dense
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
                    @input="MenuTanggal = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-combobox
                  dense
                  clearable
                  :items="MataUangList"
                  v-model="editedItem.MataUang"
                  label="Mata Uang"
                >
                </v-combobox>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  clearable
                  v-model="editedItem.Harga"
                  prefix="Rp"
                  @keyup="onchangeHarga(editedItem.Harga)"
                  maxlength="14"
                  class="mt-n3"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  readonly
                  v-model="editedItem.Gudang"
                  label="Cabang"
                  class="mt-n3"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="blue darken-4" @click="save">
            <v-icon class="mr-1">mdi-check</v-icon>Simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- <loading :active.sync="isLoading" :is-full-page="fullPage"></loading> -->
    <ejs-grid
      :dataSource="data"
      width="100%"
      gridLines="Both"
      :height="mobile ? '43vh' : 'auto'"
      style="height: 100%"
      :allowReordering="true"
      :selectionSettings="selectionOptions"
      :allowGrouping="mobile"
      :groupSettings="groupSettings"
      :allowSorting="true"
      :allowMultiSorting="true"
      :allowFiltering="mobile"
      ref="ggs"
      :filterSettings="filterOptions"
      :allowResizing="true"
      :allowPaging="true"
      :pageSettings="pageSettings"
      :toolbar="toolbarOptions"
      :dataStateChange="dataStateChange"
    >
      <e-columns>
        <!-- <e-column field="Commands" headerText="Action" width="115" :commands="commands" textAlign='center'>
          <div class="btn-group">
            <button type="button" class="btn btn-default" (click)='prediemRowEdit($event)'>
              <i class="fa fa-pencil"></i>
            </button>
            <button type="button" class="btn btn-default" (click)='prediemRowDelete($event)'>
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </e-column> -->

        <e-column
          field="Barang"
          headerText="Kode"
          textAlign="Left"
          width="180"
        ></e-column>

        <e-column
          field="NamaBarang"
          headerText="Barang"
          textAlign="Left"
          width="180"
        ></e-column>

        <e-column field="NamaSatuan" headerText="Rasio" width="180"></e-column>

        <e-column field="NamaUang" headerText="MataUang" width="180"></e-column>

        <e-column field="Tanggal" headerText="Tanggal" width="180"></e-column>

        <e-column field="Cabang" headerText="Cabang" width="180"></e-column>

        <e-column
          field="Harga"
          headerText="Harga"
          textAlign="Right"
          width="180"
        ></e-column>

        <e-column
          field="DiBuatOleh"
          headerText="Dibuat Oleh"
          width="180"
        ></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script>
import Vue from "vue";
import api from "@/services/http";
// import Loading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/vue-loading.css';
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
// import api from '@/axios/http'
Vue.use(GridPlugin);

export default {
  // components: {

  //   Loading
  // },
  data() {
    return {
      mobile: null,
      windowSize: { x: 0, y: 0 },
      date: new Date().toISOString().substr(0, 10),
      dialogHargaJual: false,
      MenuTanggal: false,
      readonly: false,
      RasioReadonly: true,
      // fullPage: true,
      // isLoading: false,
      dialogPilihBarang: false,
      // dialogPilihRasio: false,
      Harga: "",

      editedIndex: -1,
      editedItem: {
        id: "",
        Kode: "",
        Nama: "",
        Gudang: "",
        Rasio: "",
        Tanggal: "",
        MataUang: "",
        Harga: "",
        barangs_id: "",
      },
      defaultItem: {
        id: "",
        Kode: "",
        Nama: "",
        Gudang: "",
        MataUang: "",
        Rasio: "",
        Tanggal: "",
        Harga: "",
        barangs_id: "",
      },
      // TanggalHargaJual: "",
      // HargaJualFormated: "0.00",
      // Rasio: "",
      // HargaJual: 0,
      token: localStorage.getItem("token"),

      options: {
        locale: "id-ID",
        prefix: "",
        suffix: "",
        length: 11,
        precision: 0,
      },
      data: [],
      // DataRasio: [],
      DataBarang: [],
      NamaBarang: [],
      NamaRasio: [],
      RasioList: [],
      MataUangList: ["Rupiah", "Dolar"],
      commands: [],

      groupSettings: {
        allowReordering: true,
      },
      selectionOptions: {
        type: "Multiple",
      },
      pageSettingsBarang: {
        pageSize: 5,
        pageSizes: ["5", "10", "15", "20", "50", "All"],
      },
      toolbarOptions: ["Search"],
      pageSettings: {
        pageSize: 100,
        pageSizes: ["20", "50", "100"],
      },
      filterOptions: {
        type: "CheckBox",
      },
      // filter: {
      //   type: 'CheckBox'
      // },
      sorted: null,
      filter: null,
      skip: 0,
      take: 100,
      editSettings: {
        showDeleteConfirmDialog: true,
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Normal",
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
    if (this.action.some((a) => a == "R")) {
      // this.getData()
      // this.setHargaJual()
      // this.AutoTanggal()
      // this.cekMataUang()
      // this.getBarang()
      this.getHargaJual(0, 100);
      // this.getDataRasio()
    }
    if (this.action.some((a) => a == "U")) {
      this.commands.push({
        buttonOption: {
          cssClass: "e-flat Edit",
          iconCss: "e-edit e-icons",
        },
      });
    }
    if (this.action.some((a) => a == "D")) {
      this.commands.push({
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
    windowSize() {
      if (this.windowSize.x < 450) {
        this.titleClass = "d-none";
        this.mobile = false;
      } else {
        this.titleClass = "mr-4";
        this.mobile = true;
      }
    },

    // dialogHargaJual(val) {
    //   val || this.closehargajual();
    //   this.getRasio()
    // },

    MataUang: {
      handler() {
        this.cekMataUang();
      },
    },
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Barang" : "Edit Barang";
    },
  },

  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },

    dataStateChange: function (state) {
      if (state.action.requestType === "paging") {
        this.skip = state.skip;
        this.take = state.take;
        if (state.search != undefined) {
          api
            .get(
              "BrgHrgJual?token=" +
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
          this.getHargaJual(
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
        this.$refs.ggs.clearFiltering();
        this.sorted =
          state.sorted == undefined
            ? undefined
            : state.sorted.length > 1
            ? state.sorted.map((element) => {
                return element.name == "NamaBarang"
                  ? "Barang.Nama" + " " + element.direction
                  : element.name == "NamaUang"
                  ? "MataUang.Nama" + " " + element.direction
                  : element.name == "NamaSatuan"
                  ? "Satuan.Nama" + " " + element.direction
                  : state.sorted[0].name + " " + state.sorted[0].direction;
              })
            : state.sorted[0].name == "NamaBarang"
            ? "Barang.Nama" + " " + state.sorted[0].direction
            : state.sorted[0].name == "NamaUang"
            ? "MataUang.Nama" + " " + state.sorted[0].direction
            : state.sorted[0].name == "NamaSatuan"
            ? "Satuan.Nama" + " " + state.sorted[0].direction
            : state.sorted[0].name + " " + state.sorted[0].direction;
        if (state.sorted != undefined && state.sorted.length > 1) {
          this.sorted = new URLSearchParams({ st: this.sorted }).toString();
        }
        this.getHargaJual(state.skip, state.take, this.sorted);
        this.query = null;
        this.filter = null;
      }
      if (state.action.requestType === "filterchoicerequest") {
        console.log("disini");
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
          .get("BrgHrgJual?token=" + this.token + "&dist=" + queryString)
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
        this.getHargaJual(state.skip, state.take, undefined, this.filter);
        this.$refs.ggs.clearFiltering();
      }
      if (state.action.action === "clear-filter") {
        this.getHargaJual(
          state.skip,
          state.take,
          this.sorted != null ? this.sorted : undefined
        );
        this.query = null;
        this.filter = null;
      }
      if (state.action.requestType === "searching") {
        console.log("yang dicari dia", state.action.searchString);
        state.skip = 0;
        state.take = 100;
        if (
          state.action.searchString == "" &&
          this.$refs.ggs.$el.ej2_instances[0].pageSettings.currentPage == 1
        ) {
          this.getHargaJual(0, 100);
        } else if (
          this.$refs.ggs.$el.ej2_instances[0].pageSettings.currentPage == 1
        ) {
          api
            .get(
              "BrgHrgJual?token=" +
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
    getHargaJual(skip, take, sort, filter) {
      api
        .get(
          "/BrgHrgJual?token=" +
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
            // console.log(res)
            this.data = res.data;
          },
          (err) => {
            console.log(err);
          }
        );
    },
    save() {
      if (this.formTitle === "Edit Barang") {
        // this.isLoading = true
        this.UpdateData();
        this.editedItem = this.defaultItem;
      }
      this.closehargajual();
    },

    savePilihBarang() {
      this.dialogPilihBarang = false;
    },

    // savePilihRasio() {
    //   this.dialogPilihRasio = false
    // },

    // closePilihRasio() {
    //   this.dialogPilihRasio = false
    // },

    closePilihBarang() {
      this.dialogPilihBarang = false;
    },

    rowSelectedBarang: function (args) {
      this.editedItem.barangs_id = args.data.id;
      this.editedItem.Nama = args.data.Nama;
      this.editedItem.Rasio = args.data.satuan[0].NamaSatuan;
      this.editedItem.MataUang = args.data.hrgjual[0].MataUang;
      this.NamaBarang = args.data.Nama;
      this.NamaBarang = args.data.satuan[0].NamaSatuan;
      this.NamaBarang = args.data.hrgjual[0].MataUang;
    },

    // rowSelectedRasio: function (args) {
    //   this.editedItem.Rasio = args.data.satuan[0].NamaSatuan
    //   this.NamaRasio = args.data.satuan[0].NamaSatuan
    // },

    UpdateData() {
      console.log("update", this.editedItem);
      api
        .put("/BrgHrgJual/" + this.editedItem.id + "?token=" + this.token, {
          Nama: this.editedItem.Nama,
          barangs_id: this.editedItem.barangs_id,
          Rasio: this.editedItem.Rasio,
          Tanggal: this.editedItem.Tanggal,
          MataUang: this.editedItem.MataUang,
          Harga: this.editedItem.Harga.replaceAll(".", ""),
        })
        .then(() => {
          // this.isLoading = false,
          this.Nama = "";
          // this.Gudang = ''
          this.Rasio = "";
          this.Tanggal = "";
          this.MataUang = "";
          this.Harga = "";
          this.getBarang();
          this.closehargajual();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    setHargaJual() {
      // this.isLoading = true
      let HargaJual = sessionStorage.getItem("temp");
      this.data = [...this.data];
      // let data = JSON.parse(HargaJual)
      let tes = async () => {
        return await JSON.parse(HargaJual);
      };
      tes().then(cekdata);
      let x = [];

      function cekdata() {
        let data = JSON.parse(HargaJual);
        if (data != null) {
          for (let index = 0; index < data.length; index++) {
            // this.isLoading = false
            const element = data[index];
            element.Rasio = element.satuan[0].NamaSatuan;
            element.MataUang = element.hrgjual[0].MataUang;
            element.Tanggal = element.hrgjual[0].Tanggal;
            element.Harga = element.hrgjual[0].Harga;
            x.push(element);
          }
        }
      }
      this.data = x;
      console.log("data aing", x);
      // console.log("data",this.data[0].hrgjual[0]['Rasio'])
    },

    AutoTanggal() {
      this.Tanggal = this.date;
      console.log(this.HargaJualList);
    },

    // getDataRasio() {
    //   api.get('/barangs?token=' + this.token).then(
    //     res => {
    //       console.log('aku rasio', res)
    //       this.DataRasio = res.data
    //     },
    //     err => {
    //       console.log(err)
    //     }
    //   )
    // },

    getBarang() {
      // this.isLoading = true
      api.get("/barangs?token=" + this.token).then(
        (res) => {
          // this.isLoading = false
          console.log(res);
          this.DataBarang = res.data;
        },
        (err) => {
          this.$router.push("/");
          this.localStorage.removeItem("token");
          console.log(err);
        }
      );
    },

    getRasio() {
      this.RasioList = JSON.parse(sessionStorage.getItem("satuan"));
      if (localStorage.getItem("satuan") == "[]") {
        this.RasioReadonly = true;
      } else {
        this.RasioReadonly = false;
      }
    },

    onchangeHarga(val) {
      console.log(val);
      var number_string = val.replace(/[^,\d]/g, "").toString(),
        split = number_string.split(","),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

      // tambahkan titik jika yang di input sudah menjadi angka ribuan
      if (ribuan) {
        var separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
      }

      rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
      this.Harga = rupiah;
      this.editedItem.Harga = rupiah;
      console.log("harga", rupiah);
    },

    cekMataUang() {
      if (this.MataUang == "Rupiah") {
        this.options.prefix = "Rp";
        this.readonly = false;
      } else if (this.MataUang == "Dolar") {
        this.options.prefix = "$";
        this.readonly = false;
      } else {
        this.readonly = true;
        this.HargaJual = "";
        this.options.prefix = "?";
      }
    },

    closehargajual() {
      this.dialogHargaJual = false;
      this.editedItem = this.defaultItem;

      console.log("in close btn", this.editedItem);
      // this.Rasio = ""
      // this.MataUang = ""
      // this.Harga = ""
      this.AutoTanggal();
      this.editedIndex = -1;
    },

    actioncomplete(args) {
      console.log(args);
    },

    commandClick: function (args) {
      if (args.target.classList.contains("custombutton")) {
        let data = JSON.stringify(args.rowData);
        console.log(data);
      } else if (args.target.classList.contains("Delete")) {
        var r = confirm("Yakin Hapus Data?");
        if (r == true) {
          api
            .delete("/barangs/" + args.rowData.id + "?token=" + this.token)
            .then((res) => {
              console.log(res);
              this.getBarang();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else if (args.target.classList.contains("Edit")) {
        let data = args;
        // console.log('do edit',data)
        this.editedIndex = 1;
        this.dialogHargaJual = true;
        this.editedItem = data.rowData;
        this.id = data.rowData.id;

        this.editedItem.barangs_id = data.rowData.hrgjual[0].barangs_id;
        this.editedItem.id = data.rowData.hrgjual[0].id;
        this.editedItem.MataUang = data.rowData.hrgjual[0].MataUang;
        this.editedItem.Tanggal = data.rowData.hrgjual[0].Tanggal;
        this.editedItem.Harga = parseInt(data.rowData.hrgjual[0].Harga)
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
        (err) => {
          console.log(err);
        };
        // console.log('edititem',this.editedItem);
      }
    },

    getBool(x) {
      return !!String(x).toLowerCase().replace(!!0, "");
    },

    getData() {
      // this.isLoading = true
      api.get("/barangs?token=" + this.token).then(
        (res) => {
          // this.isLoading = false
          //console.log(res)
          let x = [];
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            element.AktifCheck = this.getBool(element.Aktif);
            x.push(element);
          }
          this.data = x;
          console.log(this.data);
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
.centered-input input {
  text-align: right;
}

/* .e-grid .e-headercell {
    background-color: grey;
  } */

.e-grid .e-groupdroparea.e-grouped {
  background-color: rgb(25, 118, 210);
}

.e-grid .e-groupheadercell {
  background-color: rgb(29, 79, 129);
}
</style>
