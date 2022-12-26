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
      <v-dialog v-model="dialogItemsPerkiraan" max-width="1000px" persistent>
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
              <span class="headline">{{ formTitleItemsPerkiraan }}</span>
              <!-- <h3>Tambah data</h3> -->
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn dark text fab small @click="closeDialogPilihItems">
              <v-icon class="mx-1">mdi-window-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-col cols="12" md="12">
            <v-card>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Perkiraan"
                      readonly
                      v-model="detail.Perkiraan"
                    >
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
                                <span class="headline">Data Perkiraan</span>
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
                              <!-- grid Perkiraan -->
                              <ejs-grid
                                :dataSource="ItemsPerkiraanList"
                                height="250"
                                width="100%"
                                gridLines="Both"
                                :allowReordering="true"
                                :allowSorting="true"
                                :allowMultiSorting="true"
                                :allowResizing="true"
                                :allowPaging="true"
                                :pageSettings="pageSettings"
                                :toolbar="toolbarOptionsSelect"
                                :recordDoubleClick="
                                  rowSelectedItemsPerkiraanList
                                "
                              >
                                <e-columns>
                                  <e-column
                                    :filter="filter"
                                    field="Kode"
                                    headerText="Kode"
                                    textAlign="Left"
                                    width="180"
                                  >
                                  </e-column>

                                  <e-column
                                    field="Nama"
                                    headerText="Nama"
                                    width="250"
                                  >
                                  </e-column>

                                  <e-column
                                    field="IsDetail"
                                    displayAsCheckBox="true"
                                    headerText="Is Detail"
                                    width="170"
                                  >
                                  </e-column>

                                  <e-column
                                    field="Sifat"
                                    displayAsCheckBox="true"
                                    headerText="Sifat"
                                    width="170"
                                  >
                                  </e-column>

                                  <e-column
                                    field="Aktif"
                                    displayAsCheckBox="true"
                                    headerText="Aktif"
                                    width="170"
                                  >
                                  </e-column>

                                  <e-column
                                    field="Memo"
                                    headerText="Memo"
                                    width="170"
                                  >
                                  </e-column>

                                  <e-column
                                    field="created_at"
                                    headerText="Di Buat Tgl"
                                    width="170"
                                  >
                                  </e-column>

                                  <e-column
                                    :filter="filter"
                                    field="author.name"
                                    headerText="Di Buat Oleh"
                                    width="130"
                                  >
                                  </e-column>

                                  <e-column
                                    :filter="filter"
                                    field="updated_at"
                                    headerText="Di Ubah Tgl"
                                    width="160"
                                  >
                                  </e-column>

                                  <e-column
                                    :filter="filter"
                                    field="modifier.name"
                                    headerText="Di Ubah Oleh"
                                    width="130"
                                  >
                                  </e-column>
                                </e-columns>
                              </ejs-grid>
                            </v-card>
                          </v-card>
                        </v-dialog>
                      </template>
                    </v-text-field>
                  </v-col>
                  <!-- <v-col cols='12' sm='6' md='6'>
                                        <v-autocomplete v-model="detail.JenisWorkOrder" label="Jenis Work Order" :items="itemsJenisWorkOrder">
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col cols='12' sm='6' md='6'>
                                        <v-autocomplete v-model="detail.Lokasi" label="Lokasi" :items="itemsLokasi">
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col cols='12' sm='6' md='6'>
                                        <v-autocomplete v-model="detail.Departemen" label="Departemen" :items="itemsDepartemen">
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col cols='12' sm='6' md='6'>
                                        <v-text-field label='Nomor PV' readonly v-model="detail.NomorPV">
                                            <template v-slot:append>
                                                <v-dialog v-model="dialogNomorPV">
                                                    <template v-slot:activator="{on,attrs}">
                                                        <v-btn dark small class="mt-n2" color="blue darken-4" v-bind="attrs" v-on="on"><v-icon>mdi-dots-horizontal</v-icon></v-btn>
                                                    </template>
                                                    <v-card>
                                                        <v-toolbar dark outline color="blue darken-4" class="elevation-0">
                                                            <v-card-title>
                                                                <span>Data Payment Voucher</span>
                                                            </v-card-title>
                                                            <v-spacer></v-spacer>
                                                            <v-btn dark text fab small @click="dialogNomorPV = false">
                                                                <v-icon class="mx-1">mdi-window-close</v-icon>
                                                            </v-btn>
                                                        </v-toolbar>
                                                        <v-card flat>
                                                            <ejs-grid
                                                            :dataSource="NomorPV" height="200" width="100%" gridLines='Both'
                                                            :pageSettings='pageSettings'
                                                            :toolbar='toolbarOptionsSelect'
                                                            :recordDoubleClick="rowSelectedNomorPV"
                                                            :dataStateChange='dataStateChangePV'
                                                            :allowReordering = true
                                                            :allowResizing='true'
                                                            :allowPaging='true'
                                                            ref='ggsPV'
                                                            >
                                                                <e-columns>
                                                                    <e-column
                                                                    field='KodeNota'
                                                                    headerText='Nomor PV'
                                                                    textAlign='Left'
                                                                    width=200
                                                                    ></e-column>
                                                                    <e-column
                                                                    field='Tanggal'
                                                                    headerText='Tanggal'
                                                                    textAlign='Left'
                                                                    width=160
                                                                    ></e-column>
                                                                    <e-column
                                                                    field='Keterangan'
                                                                    headerText='Keterangan'
                                                                    textAlign='Left'
                                                                    width=200
                                                                    ></e-column>
                                                                    <e-column
                                                                    field='DiBuatOleh'
                                                                    headerText='DiBuatOleh'
                                                                    textAlign='Left'
                                                                    width=180
                                                                    ></e-column>
                                                                    <e-column
                                                                    field='DiBuatTgl'
                                                                    headerText='DiBuatTgl'
                                                                    textAlign='Left'
                                                                    width=170
                                                                    ></e-column>
                                                                    <e-column
                                                                    field='DiUbahOleh'
                                                                    headerText='DiUbahOleh'
                                                                    textAlign='Left'
                                                                    width=180
                                                                    ></e-column>
                                                                    <e-column
                                                                    field='DiUbahTgl'
                                                                    headerText='DiUbahTgl'
                                                                    textAlign='Left'
                                                                    width=170
                                                                    ></e-column>
                                                                </e-columns>
                                                            </ejs-grid>
                                                        </v-card>
                                                    </v-card>
                                                </v-dialog>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols='12' sm='6' md='6'>
                                        <v-text-field readonly label="Nomor WO" v-model="detail.NomorWO">
                                            <template v-slot:append>
                                                <v-dialog v-model="dialogNoWO">
                                                    <template v-slot:activator="{on,attrs}">
                                                    <v-btn dark small class="mt-n2" color="blue darken-4" v-bind="attrs" v-on="on"><v-icon>mdi-dots-horizontal</v-icon></v-btn>
                                                    </template>
                                                    <v-card>
                                                    <v-toolbar dark
                                                        outline
                                                        color="blue darken-4"
                                                        class="elevation-0">
                                                        <v-card-title>
                                                        <span class="headline">Data WO</span>
                                                        </v-card-title>
                                                        <v-spacer></v-spacer>             
                                                        <v-btn
                                                        dark
                                                        text
                                                        fab
                                                        small
                                                        @click="dialogNoWO = false">
                                                        <v-icon class="mx-1">mdi-window-close</v-icon>
                                                        </v-btn>
                                                    </v-toolbar>
                                                    <v-card flat>
                                                        <v-col cols="12" md="12">
                                                        <v-card>
                                                            <ejs-grid
                                                            :dataSource="NomorWO" height="200" width="100%" gridLines='Both'
                                                            :pageSettings='pageSettings'
                                                            :toolbar='toolbarOptionsSelect'
                                                            :recordDoubleClick="rowSelectedNomorWO"
                                                            :dataStateChange='dataStateChange'
                                                            :allowReordering = true
                                                            :allowResizing='true'
                                                            :allowPaging='true'
                                                            ref='ggs'
                                                            >
                                                                <e-columns>
                                                                    <e-column
                                                                    field='KodeNota'
                                                                    headerText='Nomor Wo'
                                                                    textAlign='Left'
                                                                    width=200
                                                                    ></e-column>
                                                                    <e-column
                                                                    field='Lokasi'
                                                                    headerText='Lokasi'
                                                                    width=200
                                                                    ></e-column>
                                                                    <e-column
                                                                    field='JenisWorkOrder'
                                                                    headerText='Jenis Work Order'
                                                                    width=200
                                                                    ></e-column>
                                                                    <e-column
                                                                    field='Keterangan'
                                                                    headerText='Keterangan'
                                                                    width=100
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
                                    </v-col> -->
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Keterangan"
                      v-model="detail.Keterangan"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      readonly
                      label="Mata Uang"
                      v-model="detail.MataUang"
                    >
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
                                    :toolbar="toolbarOptionsSelect"
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
                      v-bind:valueWhenIsEmpty="valueWhenIsEmpty"
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
                      v-bind:valueWhenIsEmpty="valueWhenIsEmpty"
                      v-bind:options="kurs"
                      v-model="detail.Kurs"
                      class="v-input theme--light v-text-field v-text-field--is-booted"
                      @input="Jumlah()"
                    />
                  </v-col>
                  <!-- <v-col cols='12' sm='6' md='6'>
                                        <vuetify-money
                                            dense
                                            placeholder="1"
                                            label='Jumlah'
                                            v-bind:options="total_bayar"
                                            v-model="detail.Jumlah"
                                            class="v-input theme--light v-text-field v-text-field--is-booted"
                                        />
                                    </v-col> -->
                </v-row>
              </v-container>
            </v-card>
          </v-col>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn
                            dark
                            color="error"
                            @click="closeDialogPilihItems">
                            <v-icon class="mr-1">mdi-close-circle</v-icon>Batal
                        </v-btn> -->

            <v-btn dark color="blue darken-4" @click="PilihPerkiraan()">
              <v-icon class="mr-1">mdi-check</v-icon>Pilih
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-card color="grey lighten-3" class="pa-2 rounded-lg elevation-0">
      <!-- grid items Mutasi Kas -->
      <ejs-grid
        id="Grid"
        :dataSource="ItemsPerkiraanMutasi"
        height="200"
        width="100%"
        gridLines="Both"
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
          ></e-column>

          <e-column
            field="Perkiraan"
            headerText="Perkiraan"
            width="170"
          ></e-column>

          <e-column
            field="NoUrut"
            headerText="NoUrut"
            width="170"
            :visible="false"
            :isPrimaryKey="true"
          ></e-column>

          <!-- <e-column
                        field='JenisWorkOrder'
                        headerText='Jenis Work Order'
                        width=170
                    ></e-column>

                    <e-column
                        field='Lokasi'
                        headerText='Lokasi'
                        width=170
                    ></e-column>

                    <e-column
                        field='Departemen'
                        headerText='Departemen'
                        width=170
                    ></e-column>

                    <e-column
                        field='NomorPV'
                        headerText='Nomor PV'
                        width=170
                    ></e-column>

                    <e-column
                        field='NomorWO'
                        headerText='Nomor Wo'
                        width=170
                    ></e-column> -->

          <e-column
            field="Keterangan"
            headerText="Keterangan"
            width="170"
          ></e-column>

          <e-column
            field="MataUang"
            headerText="Mata Uang"
            width="170"
          ></e-column>

          <e-column
            field="JumlahAsing"
            type="number"
            format="N"
            headerText="Jumlah Asing"
            width="170"
          ></e-column>

          <e-column
            field="Kurs"
            type="number"
            format="N"
            headerText="Kurs"
            width="170"
          ></e-column>

          <e-column
            field="Jumlah"
            type="number"
            format="N"
            headerText="Jumlah"
            width="170"
          ></e-column>
        </e-columns>

        <e-aggregates>
          <e-aggregate>
            <e-columns>
              <e-column
                type="Count"
                field="Perkiraan"
                :FooterTemplate="footerCount"
              ></e-column>
              <e-column
                type="Sum"
                format="N"
                field="Jumlah"
                :FooterTemplate="footerSum"
              ></e-column>
              <e-column
                type="Sum"
                format="N"
                field="JumlahAsing"
                :FooterTemplate="footerSum"
              ></e-column>
            </e-columns>
          </e-aggregate>
        </e-aggregates>
      </ejs-grid>
    </v-card>
  </v-col>
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
  Edit,
  CommandColumn,
  Reorder,
} from "@syncfusion/ej2-vue-grids";
Vue.use(GridPlugin);
export default {
  props: {
    ItemsMutasiKas: Array,
    data_perkiraan: Array,
    title: String,
    // itemsmutasi:{
    //     type: Array
    // }
  },
  data() {
    return {
      mobile: null,
      valueWhenIsEmpty: "0",
      windowSize: { x: 0, y: 0 },
      name: "itmes",
      kurs: { locale: "id-ID", suffix: "", length: 12, precision: 2 },
      asing: { locale: "id-ID", suffix: "", length: 12, precision: 2 },
      total_bayar: { locale: "id-ID", suffix: "", length: 12, precision: 2 },
      setFocus: "",
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
      ],
      itemsJenisWorkOrder: ["CAR", "HE", "ULIN", "GA"],
      commands: [
        {
          title: "Hapus",
          buttonOption: {
            cssClass: "e-flat Delete",
            iconCss: "e-delete e-icons",
          },
        },
      ],
      detail: {
        Perkiraan: "",
        NomorPV: "",
        NomorWO: "",
        Lokasi: "",
        JenisWorkOrder: "",
        Departemen: "",
        Keterangan: "",
        MataUang: "Rupiah",
        KodeUang: "IDR",
        JumlahAsing: 1,
        Kurs: 1,
        Jumlah: 1,
      },
      detailDefault: {
        Perkiraan: "",
        NomorPV: "",
        NomorWO: "",
        Lokasi: "",
        JenisWorkOrder: "",
        Departemen: "",
        Keterangan: "",
        MataUang: "Rupiah",
        KodeUang: "IDR",
        JumlahAsing: 1,
        Kurs: 1,
        Jumlah: 1,
      },
      dialogPerkiraan: false,
      dialogNoWO: false,
      dialogUang: false,
      dialogNomorPV: false,
      dialogItemsPerkiraan: false,
      ItemsPerkiraanList: [],
      storeSelect: [],
      hapus_items: [],
      NomorWO: [],
      NomorPV: [],
      MataUang: [],
      ItemsPerkiraanMutasi: [],
      token: localStorage.getItem("token"),
      selectionOptions: { type: "Multiple" },
      toolbarOptionsSelect: ["Search"],
      pageSettings: { pageSizes: ["2", "10", "All"] },
      filterOptions: { type: "Menu" },
      filter: { type: "CheckBox" },
      editSettings: {
        showDeleteConfirmDialog: true,
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Normal",
      },
      groupSettings: { allowReordering: true },
      footerSum: function () {
        return {
          template: Vue.component("SumTemplate", {
            template: `<span>Sum: {{data.Sum}}</span>`,
            data() {
              return { data: {} };
            },
          }),
        };
      },
      footerCount: function () {
        return {
          template: Vue.component("MaxTemplate", {
            data() {
              return { data: {} };
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
      Edit,
      CommandColumn,
      Reorder,
    ],
  },
  mounted() {
    // this.getDataPerkiraan()
    this.getDataWo(0, 100);
    this.getDataPv(0, 100);
    this.getMataUang();
  },
  // beforeCreate(){
  //     this.ItemsPerkiraanList = this.$options.propsData.data_perkiraan
  //     this.ItemsPerkiraanList = [...this.ItemsPerkiraanList]
  //     console.log('itemsperkiraanlist',this.ItemsPerkiraanList)
  //     console.log(document.getElementById("Grid").ej2_instances[0])
  // },
  created() {
    console.log("sx", this.data_perkiraan);
    this.ItemsPerkiraanList = this.data_perkiraan;
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
    // itemsmutasi(val){
    //     console.log(val)
    //     this.ItemsPerkiraanMutasi = []
    //     this.ItemsPerkiraanMutasi = val
    // },
    ItemsMutasiKas(val) {
      this.ItemsPerkiraanMutasi = val;
    },
    title(ket) {
      console.log("title", ket);
      if (ket == "Kosongkan") {
        this.ItemsPerkiraanMutasi = [];
        this.hapus_items = [];
      }
    },
    ItemsPerkiraanMutasi(val) {
      this.$emit("itemsMk", val);
    },
    dialogItemsPerkiraan(v) {
      if (v == false) {
        this.$nextTick(() => {
          this.detail = Object.assign({}, this.detailDefault);
        });
      }
    },
  },
  computed: {
    formTitleItemsPerkiraan() {
      return this.editedIndex === -1 ? "Tambah barang" : "Pilih perkiraan";
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
        this.hapus_items.push(
          this.ItemsPerkiraanMutasi.find((a) => a == args.rowData)
        );
        this.$emit("hapus_item", this.hapus_items);
        this.ItemsPerkiraanMutasi.splice(
          this.ItemsPerkiraanMutasi.findIndex((a) => a == args.rowData),
          1
        );
        document.getElementById("Grid").ej2_instances[0].refresh();
      }
    },
    Jumlah() {
      this.detail.Jumlah =
        parseFloat(this.detail.JumlahAsing) * parseFloat(this.detail.Kurs);
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
    dataStateChangePV: function (state) {
      if (state.action.requestType === "paging") {
        this.skip = state.skip;
        this.take = state.take;
        if (state.search != undefined) {
          api
            .get(
              "mutasi-pv?token=" +
                this.token +
                "&search=" +
                state.search[0].key +
                "&skip=" +
                state.skip +
                "&take=" +
                state.take
            )
            .then((res) => {
              this.NomorPV = res.data;
            });
        } else if (state.search == undefined) {
          this.getDataPv(
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
          this.$refs.ggsPV.$el.ej2_instances[0].pageSettings.currentPage == 1
        ) {
          this.getDataPv(0, 100);
        } else if (
          this.$refs.ggsPV.$el.ej2_instances[0].pageSettings.currentPage == 1
        ) {
          api
            .get(
              "mutasi-pv?token=" +
                this.token +
                "&search=" +
                state.action.searchString +
                "&skip=" +
                0 +
                "&take=" +
                100
            )
            .then((res) => {
              this.NomorPV = res.data;
            });
        } else {
          this.$refs.ggsPV.$el.ej2_instances[0].pageSettings.currentPage = 1;
        }
      }
    },
    rowSelectedNomorPV(args) {
      this.detail.NomorPV = args.rowData.KodeNota;
      this.dialogNomorPV = false;
    },
    rowSelectedNomorWO(args) {
      // console.log(args)
      this.detail.NomorWO = args.rowData.KodeNota;
      // this.detail.Lokasi = args.rowData.Lokasi
      // this.detail.JenisWorkOrder = args.rowData.JenisWorkOrder
      this.dialogNoWO = false;
    },
    rowSelectedMataUang(args) {
      this.detail.MataUang = args.rowData.Nama;
      this.detail.KodeUang = args.rowData.Kode;
      this.dialogUang = false;
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
    getDataPv(skip, take) {
      api
        .get(
          "mutasi-pv?token=" + this.token + "&skip=" + skip + "&take=" + take
        )
        .then(
          (res) => {
            this.NomorPV = res.data;
          },
          (err) => {
            console.log(err);
          }
        );
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
    rowSelectedItemsPerkiraanList: function (args) {
      this.detail.Perkiraan = args.rowData.Nama;
      this.detail.KodePerkiraan = args.rowData.Kode;
      this.dialogPerkiraan = false;
      // let grid = document.getElementById("Grid").ej2_instances[0];
      // this.storeSelect = grid.getSelectedRecords();
      // console.log(this.storeSelect)
      // this.storeSelect.forEach(element => {
      // 	element.gudang_tujuan = ''
      // })
    },
    PilihPerkiraan() {
      if (this.detail.Perkiraan == "") {
        alert("Perkiraan tidak boleh kosong");
      } else {
        if (this.ItemsPerkiraanMutasi.length == 0) {
          this.detail.NoUrut = 1;
          this.ItemsPerkiraanMutasi.push(this.detail);
        } else {
          this.detail.NoUrut =
            this.ItemsPerkiraanMutasi.sort(
              (a, b) => parseInt(b.NoUrut) - parseInt(a.NoUrut)
            )[0].NoUrut + 1;
          this.ItemsPerkiraanMutasi.push(this.detail);
        }
        // let data = this.storeSelect.map(val => {
        //     return {
        //         perkiraan:{
        //             Kode:val.Kode,
        //             Nama:val.Nama
        //         },
        //         no_wo:'',
        //         keterangan:'',
        //         jumlah:0.00,
        //         jumlah_asing:0.00,
        //         mata_uang:"Rupiah",
        //         kurs:1.00
        //     }
        // })
        // data.forEach(element => {
        //     this.ItemsPerkiraanMutasi.push(element)
        // })
        this.ItemsPerkiraanMutasi = [...this.ItemsPerkiraanMutasi];
        this.dialogItemsPerkiraan = false;
        // console.log(this.ItemsPerkiraanMutasi)
        document.getElementById("Grid").ej2_instances[0].refresh();
      }
    },
    onDoubleClick: function (args) {
      this.setFocus = args.column;
    },
    onActionComplete(args) {
      if (args.requestType === "beginEdit") {
        args.form.elements.namedItem(this.setFocus.field).focus();
      }
      if (args.requestType === "batchsave" || args.requestType === "save") {
        let data = this.ItemsPerkiraanMutasi;
        this.ItemsPerkiraanMutasi = data.map((item) => {
          return {
            id: item.id,
            perkiraan: item.perkiraan,
            no_wo: item.no_wo,
            keterangan: item.keterangan,
            jumlah_asing: parseFloat(item.jumlah_asing).toFixed(2),
            mata_uang: item.mata_uang,
            kurs: parseFloat(item.kurs).toFixed(2),
            jumlah: (
              parseFloat(item.jumlah_asing) * parseFloat(item.kurs)
            ).toFixed(2),
          };
        });
      }
      if (args.requestType === "delete" && this.title == "Ubah") {
        args.data.forEach((d) => {
          if (d.id != undefined) {
            this.hapus_items.push(d);
          }
        });
        this.$emit("hapus_item", this.hapus_items);
      }
    },
    closeDialogPilihItems() {
      this.dialogItemsPerkiraan = false;
    },
    getDataPerkiraan() {
      api.get("/coa?token=" + this.token).then(
        (res) => {
          this.ItemsPerkiraanList = res.data;
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
