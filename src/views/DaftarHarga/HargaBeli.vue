<template>
  <div v-resize="onResize">
    <v-dialog v-model="dialoghargabeli" scrollable persistent max-width="700px">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="blue darken-2" v-bind="attrs" v-on="on">
          <v-icon>mdi-plus</v-icon>Tambah
        </v-btn>
      </template> -->
      <v-card>
        <v-toolbar dark dense outline color="blue darken-3" class="elevation-1">
          <v-card-title>
            <v-icon class="mr-1">mdi-file-document-edit</v-icon>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-spacer></v-spacer>
          <v-btn dark text @click="closehargabeli">
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
                      max-width="600px"
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
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-combobox
                  dense
                  clearable
                  :items="MataUangList"
                  v-model="editedItem.MataUang"
                  label="MataUang"
                >
                </v-combobox>
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
                <v-text-field
                  clearable
                  v-model="editedItem.Diskon"
                  label="Diskon"
                  @keyup="onchangeDiskon(editedItem.Diskon)"
                  class="mt-n3"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  clearable
                  v-model="editedItem.Harga"
                  length="12"
                  @keyup="onchangeHarga(editedItem.Harga)"
                  prefix="Rp"
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

    <ejs-grid
      :dataSource="data"
      width="100%"
      gridLines="Both"
      ref="ggs"
      :height="mobile ? '43vh' : 'auto'"
      style="height: 100%"
      :allowReordering="true"
      :selectionSettings="selectionOptions"
      :allowGrouping="true"
      :groupSettings="groupSettings"
      :allowSorting="true"
      :allowMultiSorting="true"
      :allowFiltering="false"
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
              <i class="fa fa-pencil"></i></button>
            <button type="button" class="btn btn-default" (click)='prediemRowDelete($event)'>
              <i class="fa fa-trash"></i></button>
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

        <e-column field="Cabang" headerText="Cabang " width="180"></e-column>

        <e-column
          field="Harga"
          headerText="Harga"
          textAlign="Right"
          width="180"
        ></e-column>

        <e-column
          field="Diskon"
          headerText="Diskon"
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
  data() {
    return {
      mobile: null,
      windowSize: { x: 0, y: 0 },
      date: new Date().toISOString().substr(0, 10),
      dialoghargabeli: false,
      RasioReadonly: true,
      MenuTanggal: false,
      readonly: false,
      dialogPilihBarang: false,
      // HargaBeliFormated: "0.00",
      // DiskonFormated: 0,
      Harga: "",
      // Rasio: "",
      // TanggalHargaBeli: "",
      // dialogSupplier: false,
      // dialogNoWorkOrder: false,
      // dialogNoPartOrder: false,
      editedIndex: -1,
      editedItem: {
        id: "",
        kode: "",
        Nama: "",
        Gudang: "",
        Rasio: "",
        Tanggal: "",
        MataUang: "",
        Harga: "",
        Diskon: "",
        barangs_id: "",
      },
      defaultItem: {
        id: "",
        kode: "",
        Nama: "",
        Gudang: "",
        MataUang: "",
        Rasio: "",
        Tanggal: "",
        Harga: "",
        Diskon: "",
        barangs_id: "",
      },
      token: localStorage.getItem("token"),

      options: {
        locale: "id-ID",
        prefix: "",
        suffix: "",
        length: 11,
        precision: 0,
      },

      // MataUang: "Rupiah",
      data: [],
      DataBarang: [],
      NamaSatuan: [],
      RasioList: [],
      MataUangList: ["Rupiah", "Dollar"],
      commands: [],
      // datafunc: [],

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
      // this.cekMataUang()
      // this.AutoTanggal()
      this.getHargaBeli(0, 100);
      // this.setHargaBeli()
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

    dialoghargabeli(val) {
      val || this.closehargabeli();
      this.getRasio();
    },

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
              "BrgHrgBeli?token=" +
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
          this.getHargaBeli(
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
        // console.log(state)
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
        // if (state.sorted == undefined) {
        //   this.sorted = undefined
        // } else if (state.sorted.length > 1) {
        //   state.sorted.map(el => {
        //     return el.name == 'NamaBarang' ? 'Barang.Nama' + ' ' + el.direction : el.name == 'NamaUang' ? 'MataUang.Nama' + ' ' + el.direction : el.name == 'NamaSatuan' ? 'Satuan.Nama' + ' ' + el.direction : state.sorted[0].name+' '+state.sorted[0].direction
        //     // var name = ''
        //     // if (el.name == 'NamaBarang') {
        //     //   name = 'Barang.Nama'
        //     // }
        //     // if (el.name == 'NamaUang') {
        //     //   name = 'MataUang.Nama'
        //     // }
        //     // if (el.name == 'NamaSatuan') {
        //     //   name = 'Satuan.Nama'
        //     // }
        //     // return name+' '+el.direction
        //   })
        // } else {
        //   this.sorted = state.sorted[0].name
        //   if (state.sorted[0].name == 'NamaBarang') {
        //     this.sorted = 'Barang.Nama'+' '+state.sorted[0].direction
        //   }
        //   if (state.sorted[0].name == 'NamaUang') {
        //     this.sorted = 'MataUang.Nama'+' '+state.sorted[0].direction
        //   }
        //   if (state.sorted[0].name == 'NamaSatuan') {
        //     this.sorted = 'Satuan.Nama'+' '+state.sorted[0].direction
        //   }
        // }
        if (state.sorted != undefined && state.sorted.length > 1) {
          this.sorted = new URLSearchParams({ st: this.sorted }).toString();
        }
        this.getHargaBeli(state.skip, state.take, this.sorted);
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
          .get("BrgHrgBeli?token=" + this.token + "&dist=" + queryString)
          .then((res) => {
            state.dataSource(res.data.result);
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
        this.getHargaBeli(state.skip, state.take, undefined, this.filter);
        this.$refs.ggs.clearFiltering();
      }
      if (state.action.action === "clear-filter") {
        this.getHargaBeli(
          state.skip,
          state.take,
          this.sorted != null ? this.sorted : undefined
        );
        this.query = null;
        this.filter = null;
      }
      if (state.action.requestType === "searching") {
        // console.log('yang dicari dia', state.action.searchString)
        state.skip = 0;
        state.take = 100;
        if (
          state.action.searchString == "" &&
          this.$refs.ggs.$el.ej2_instances[0].pageSettings.currentPage == 1
        ) {
          this.getHargaBeli(0, 100);
        } else if (
          this.$refs.ggs.$el.ej2_instances[0].pageSettings.currentPage == 1
        ) {
          api
            .get(
              "BrgHrgBeli?token=" +
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
    save() {
      if (this.formTitle === "Edit Barang") {
        this.Updatedata();
      }
      this.closehargabeli();
    },

    savePilihBarang() {
      this.dialogPilihBarang = false;
    },

    closePilihBarang() {
      this.dialogPilihBarang = false;
    },

    rowSelectedBarang: function (args) {
      this.editedItem.barangs_id = args.data.id;
      this.editedItem.Nama = args.data.Nama;
      // this.editedItem.Harga = args.data.hrgbeli[0].Harga
      this.editedItem.Rasio = args.data.satuan[0].NamaSatuan;
      this.editedItem.MataUang = args.data.hrgbeli[0].MataUang;
      // this.editedItem.Diskon = args.data.hrgbeli[0].Diskon
      this.NamaBarang = args.data.Nama;
      // this.NamaBarang = args.data.hrgbeli[0].Harga
      this.NamaBarang = args.data.satuan[0].NamaSatuan;
      this.NamaBarang = args.data.hrgbeli[0].MataUang;
      // this.NamaBarang = args.data.hrgbeli[0].Diskon
    },

    // onActionComplete(args) {
    //   console.log("actionComplete", args);
    //   if (args.requestType === "batchsave" || args.requestType === "save") {
    //     console.log("data: " + JSON.stringify(this.SatuanList));
    //   } else if (args.requestType === "delete" && args.data[0].id != null) {
    //     api.delete('/BrgHrgBeli/' + args.data[0].id + '?token=' + this.token)
    //     this.$emit('SyncHargaBeli', this.HargaBeliList)
    //     sessionStorage.setItem('hrgbeliEdit', JSON.stringify(this.HargaBeliList))
    //   } else if (args.requestType === "delete") {
    //     sessionStorage.setItem('hrgbeliEdit', JSON.stringify(this.HargaBeliList))
    //     this.$emit('SyncHargaBeli', this.HargaBeliList)
    //   }
    // },

    Updatedata() {
      api
        .put("/BrgHrgBeli/" + this.editedItem.id + "?token=" + this.token, {
          Nama: this.editedItem.Nama,
          barangs_id: this.editedItem.barangs_id,
          Rasio: this.editedItem.Rasio,
          Tanggal: this.editedItem.Tanggal,
          MataUang: this.editedItem.MataUang,
          Diskon: this.editedItem.Diskon,
          Harga: this.editedItem.Harga.replaceAll(".", ""),
        })
        .then(() => {
          this.Nama = "";
          this.Rasio = "";
          this.Tanggal = "";
          this.MataUang = "";
          this.Diskon = "";
          this.Harga = "";
          this.getHargaBeli();
          this.closehargabeli();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    setHargaBeli() {
      let HargaBeli = sessionStorage.getItem("temp");
      this.data = [...this.data];
      let tes = async () => {
        return await JSON.parse(HargaBeli);
      };
      tes().then(cekdata);
      // let data = JSON.parse(HargaBeli)
      // console.log('datsaa',data)
      let x = [];

      function cekdata() {
        let data = JSON.parse(HargaBeli);
        if (data != null) {
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            // console.log(element.hrgbeli[0].MataUang)
            element.Rasio = element.satuan[0].NamaSatuan;
            element.MataUang = element.hrgbeli[0].MataUang;
            element.Tanggal = element.hrgbeli[0].Tanggal;
            element.Harga = element.hrgbeli[0].Harga;
            element.Diskon = element.hrgbeli[0].Diskon;
            x.push(element);
          }
        }
      }

      this.data = x;
      console.log("data aing", x);
    },

    AutoTanggal() {
      this.Tanggal = this.date;
      console.log(this.HargaBeliList);
    },

    getHargaBeli(skip, take, sort, filter) {
      api
        .get(
          "/BrgHrgBeli?token=" +
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

    getRasio() {
      this.RasioList = JSON.parse(sessionStorage.getItem("satuan"));
      if (sessionStorage.getItem("satuan") == "[]") {
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

    onchangeDiskon(val) {
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
      this.Diskon = rupiah;
      this.editedItem.Diskon = rupiah;
      console.log("Diskon", rupiah);
    },

    // focusOutHarga: function () {
    //   this.HargaBeli = parseFloat(this.HargaBeliFormated.replace(/[^\d\.]/g, "")) //eslint-disable-line
    //   if (isNaN(this.HargaBeli)) {
    //     this.HargaBeli = 0
    //   }
    //   this.HargaBeliFormated = this.HargaBeli.toFixed().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g,
    //     "$1.") // eslint-disable-line
    // },
    // focusInHarga: function () {
    //   this.HargaBeliFormated = this.HargaBeli.toFixed()
    // },

    // focusOutDiskon: function() {
    //   this.Diskon =parseFloat(this.DiskonFormated.replace(/[^\d.]/g, "")) // eslint-disable-line
    //   if (isNaN(this.Diskon)) {
    //     this.Diskon = 0
    //   }
    //   this.DiskonFormated = this.Diskon.toFixed().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.") // eslint-disable-line
    // },
    // focusInDiskon: function() {
    //   this.DiskonFormated = this.Diskon.toISOString()
    // },

    // simpanHargaBeli() {
    //   const x = new Array();
    //   x.push([this.Rasio, this.MataUang, this.TanggalHargaBeli, this.HargaBeli, this.Diskon])
    //   if (this.Rasio != "" && this.MataUang != "" && this.HargaBeli != "" && this.HargaBeliList.length == 0) {
    //     for (let index = 0; index < x.length; index++) {
    //       const element = x[index]
    //       this.HargaBeliListTemp = [...this.HargaBeliListTemp]
    //       this.HargaBeliListTemp.push(element)
    //       // console.log(this.HargaBeliList)
    //     }
    //     const ListHargaBeli = this.HargaBeliListTemp.map(function (row) {
    //       return {
    //         Rasio: row[0],
    //         MataUang: row[1],
    //         Tanggal: row[2],
    //         Harga: row[3],
    //         Diskon: row[4]
    //       }
    //     })
    //     this.HargaBeliList = ListHargaBeli
    //     sessionStorage.setItem('hrgbeliEdit', JSON.stringify(this.HargaBeliList))
    //     this.$emit('SyncHargaBeli', this.HargaBeliList)
    //   } else {
    //     for (let index = 0; index < x.length; index++) {
    //       const element = x[index]
    //       this.HargaBeliListTemp = [...this.HargaBeliListTemp]
    //       this.HargaBeliListTemp.push(element)
    //       // console.log(this.HargaBeliListTemp)
    //     }
    //     const ListHargaBeli = this.HargaBeliListTemp.map(function (row) {
    //       return {
    //         Rasio: row[0],
    //         MataUang: row[1],
    //         Tanggal: row[2],
    //         Harga: row[3],
    //         Diskon: row[4]
    //       }
    //     })
    //     this.HargaBeliList = [...this.HargaBeliList]
    //     let xcs = ListHargaBeli.pop()
    //     this.HargaBeliList.push(xcs)
    //     sessionStorage.setItem('hrgbeliEdit', JSON.stringify(this.HargaBeliList))
    //     // console.log(this.SatuanList)
    //     this.$emit('SyncHargaBeli', this.HargaBeliList)
    //   }
    //   this.closehargabeli()
    // },

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

    closehargabeli() {
      this.dialoghargabeli = false;
      this.Rasio = "";
      this.editedItem = this.defaultItem;
      this.$nextTick(() => {
        // this.id = ''
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.MataUang = "Rupiah";
      this.Diskon = "";
      this.AutoTanggal();
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
              this.getHargaBeli();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else if (args.target.classList.contains("Edit")) {
        let data = args;
        this.editedIndex = 1;
        this.dialoghargabeli = true;
        // console.log(data);
        this.editedItem = data.rowData;
        this.id = data.rowData.id;
        this.editedItem.id = data.rowData.hrgbeli[0].id;
        this.editedItem.barangs_id = data.rowData.hrgbeli[0].barangs_id;
        this.editedItem.MataUang = data.rowData.hrgbeli[0].MataUang;
        this.editedItem.Harga = parseInt(data.rowData.hrgbeli[0].Harga)
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
        this.editedItem.Diskon = parseInt(data.rowData.Diskon);
        this.dialoghargabeli = true;

        (err) => {
          console.log(err);
        };
      }
    },

    getBool(x) {
      return !!String(x).toLowerCase().replace(!!0, "");
    },

    getData() {
      api.get("barangs?token=" + this.token).then(
        (res) => {
          let x = [];
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            element.AktifCheck = this.getBool(element.Aktif);
            x.push(element);
          }
          this.data = x;
          console.log(this.data);
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
@import url(https://cdn.syncfusion.com/ejs2/material.css);
.centered-input input {
  text-align: right;
}

.e-grid .e-groupdroparea.e-grouped {
  background-color: rgb(25, 118, 210);
}

.e-grid .e-groupheadercell {
  background-color: rgb(29, 79, 129);
}
</style>
