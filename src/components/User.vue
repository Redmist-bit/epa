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
            <strong>{{ $t("User.MainTitle") }}</strong>
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
            {{ $t("User.MainTitle") }}
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialogRegister"
            scrollable
            max-width="950"
            persistent
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                class="mx-n2"
                color="blue darken-4"
                v-bind="attrs"
                :disabled="btn_tambah"
                v-on="on"
              >
                <v-icon>mdi-plus</v-icon>
                {{ $t("User.BtnTambah") }}
              </v-btn>
            </template>
            <v-card>
              <v-toolbar flat dark color="blue darken-4">
                <v-toolbar-title>
                  <span>{{ formTitle }}</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn icon @click="dialogRegister = false">
                  <v-icon>mdi-window-close</v-icon>
                </v-btn>
              </v-toolbar>
              <Register v-on:register="info($event)" />
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialog" scrollable max-width="950" persistent>
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

              <v-card-text>
                <v-container class="mt-7 mb-n3">
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
                        :disabled="true"
                        dense
                        v-model="Kode"
                        @input="
                          (text) => {
                            Kode = text.toUpperCase();
                          }
                        "
                        label="Kode"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        dense
                        v-model="editedItem.Nama"
                        :disabled="true"
                        label="Nama"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        dense
                        v-model="editedItem.NamaLengkap"
                        :disabled="disabled"
                        label="Nama Lengkap"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        dense
                        v-model="editedItem.Telp"
                        :disabled="disabled"
                        label="Telp"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        dense
                        v-model="editedItem.Alamat"
                        :disabled="disabled"
                        label="Alamat"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        dense
                        v-model="editedItem.Email"
                        :disabled="disabled"
                        label="E-mail"
                      >
                      </v-text-field>
                    </v-col>

                    <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        dense
                        :disabled="disabled"
                        v-model="editedItem.Password"
                        :append-icon="TampilkanPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        
                        :type="TampilkanPassword ? 'text' : 'password'"
                        name="input-10-1"
                        label="Kata Sandi"
                        hint="Setidaknya 4 Karakter"
                        counter
                        @click:append="TampilkanPassword = !TampilkanPassword"
                      ></v-text-field>
                    </v-col> -->

                    <v-col cols="12" sm="6" md="4" class="mt-n4 mb-3">
                      <ejs-autocomplete
                        label-size="16px"
                        floatLabelType="Auto"
                        :dataSource="ListJabatan"
                        v-model="editedItem.Jabatan"
                        placeholder="Jabatan"
                      ></ejs-autocomplete>
                      <!-- <v-combobox
                        dense
                        v-model="editedItem.Jabatan"
                        :disabled="disabled"
                        label="Jabatan"
                        :items="['HRD', 'IT', 'Mekanik', 'Teknisi']"
                      ></v-combobox> -->
                    </v-col>
                    <v-col cols="12" sm="6" md="4" class="mt-n4 mb-3">
                      <ejs-autocomplete
                        label-size="16px"
                        floatLabelType="Auto"
                        :dataSource="dataDept"
                        v-model="editedItem.Departemen"
                        placeholder="Departemen"
                      ></ejs-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        dense
                        :disabled="disabled"
                        :items="['Pria', 'Wanita']"
                        label="Jenis Kelamin*"
                        v-model="editedItem.JenisKelamin"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        v-model="MenuTanggalLahir"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            dense
                            v-model="editedItem.TanggalLahir"
                            :disabled="disabled"
                            label="Tanggal Lahir"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.TanggalLahir"
                          @input="MenuTanggalLahir = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        v-model="MenuTanggalMulaiKerja"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            dense
                            :disabled="disabled"
                            v-model="editedItem.TanggalMulaiKerja"
                            label="Tanggal Mulai Kerja"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.TanggalMulaiKerja"
                          @input="MenuTanggalMulaiKerja = false"
                          locale="id"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        v-model="MenuTanggalBerhentiKerja"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            dense
                            :disabled="disabled"
                            v-model="editedItem.TanggalBerhentiKerja"
                            label="Tanggal Berhenti Kerja"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.TanggalBerhentiKerja"
                          @input="MenuTanggalBerhentiKerja = false"
                          locale="id"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        dense
                        :disabled="disabled"
                        v-model="editedItem.Keterangan"
                        label="Keterangan"
                      >
                      </v-text-field>
                    </v-col>

                    <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        dense
                        readonly
                        :disabled="disabled"
                        v-model="editedItem.Gudang"
                        label="Gudang"
                      >
                        <template v-slot:append>
                          <v-dialog
                            v-model="dialog_gudang"
                            scrollable
                            max-width="900px"
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
                                class="elevation-0"
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  dark
                                  text
                                  fab
                                  small
                                  @click="dialog_gudang = false"
                                >
                                  <v-icon class="mx-1">mdi-window-close</v-icon>
                                </v-btn>
                              </v-toolbar>

                              <v-card flat>
                                <v-col cols="12" md="12">
                                  <v-card>
                                    <ejs-grid
                                      :dataSource="Gudangs"
                                      height="200"
                                      width="100%"
                                      gridLines="Both"
                                      :pageSettings="pageSettings"
                                      :toolbar="toolbarOptions"
                                      :allowResizing="true"
                                      :allowPaging="true"
                                      :recordDoubleClick="rowSelectedGudang"
                                    >
                                      <e-columns>
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
                                          field="Alamat"
                                          headerText="Alamat"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          :filter="filter"
                                          field="Kota"
                                          headerText="Kota"
                                          width="180"
                                        ></e-column>
                                      </e-columns>
                                    </ejs-grid>
                                  </v-card>
                                </v-col>
                              </v-card>

                              <v-divider></v-divider>
                            </v-card>
                          </v-dialog>
                        </template>
                      </v-text-field>
                    </v-col> -->

                    <v-col cols="12" sm="6" md="4" class="mt-n3">
                      <v-switch
                        dense
                        :disabled="disabled"
                        v-model="editedItem.Aktif"
                        label="Aktif"
                      >
                      </v-switch>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="lime" @click="resetPassword">
                  <v-icon class="mr-1">mdi-key</v-icon>Reset Password
                </v-btn>

                <v-btn dark color="error" @click="close">
                  <v-icon class="mr-1">mdi-close-circle</v-icon
                  >{{ $t("User.BtnBatal") }}
                </v-btn>

                <v-btn dark color="blue darken-4" @click="save">
                  <v-icon class="mr-1">mdi-content-save</v-icon
                  >{{ $t("User.BtnSimpan") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>

        <div id="app">
          <ejs-grid
            :dataSource="data"
            width="100%"
            gridLines="Both"
            style="height: 100%"
            :height="mobile ? '43vh' : 'auto'"
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
            :rowDataBound="rowDataBound"
            :toolbar="toolbarOptions"
            :commandClick="commandClick"
          >
            <e-columns>
              <e-column
                :visible="mobile"
                :allowFiltering="false"
                field="Commands"
                headerText="Aksi"
                width="110"
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
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="NamaLengkap"
                headerText="Nama Lengkap"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Alamat"
                headerText="Alamat"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Telp"
                headerText="Telepon"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Email"
                headerText="E-mail "
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Gudang"
                headerText="Gudang "
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Jabatan"
                headerText="Jabatan "
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Departemen"
                headerText="Departemen "
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="JenisKelamin"
                headerText="Jenis Kelamin"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="TanggalLahir"
                headerText="Tanggal Lahir"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="TanggalMulaikKerja"
                headerText="Tanggal Mulai Kerja"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="TanggalBerhentiKerja"
                headerText="Tanggal Berhenti Kerja"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Keterangan"
                headerText="Keterangan"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Aktif"
                headerText="Aktif"
                displayAsCheckBox="true"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiBuatTgl"
                headerText="Di Buat Tgl"
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
                headerText="Di Ubah Tgl"
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
import Vue from "vue";
import api from "@/services/http";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { DatePickerPlugin } from "@syncfusion/ej2-vue-calendars";
import {
  GridPlugin,
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
} from "@syncfusion/ej2-vue-grids";
import { AutoCompletePlugin } from "@syncfusion/ej2-vue-dropdowns";
import Register from "../components/Register.vue";
Vue.use(DatePickerPlugin);
Vue.use(GridPlugin);
Vue.use(AutoCompletePlugin);
export default {
  components: {
    Register,
    Loading,
  },
  data() {
    return {
      dialogRegister: false,
      btn_tambah: false,
      alert: "",
      action: null,
      pesan: "",
      ScrollKeAtas: false,
      mobile: null,
      windowSize: { x: 0, y: 0 },
      isLoading: false,
      dialog_gudang: false,
      fullPage: true,
      id_user: null,
      Kode: "",
      email: "",
      Aktif: "",
      toolbarOptions: ["Search"],
      ListJabatan: [],
      user: JSON.parse(localStorage.getItem("user")),
      disabled: false,
      emailRules: [
        (v) => !!v || "E-mail wajib diisi",
        (v) => /.+@.+\..+/.test(v) || "E-mail harus benar",
      ],
      password: "",
      rules: {
        required: (value) => !!value || "Wajib diisi.",
        min: (v) => v.length >= 4 || "Setidaknya 4 Karakter",
        // emailMatch: () => (`The email and password you entered don't match`),
      },

      TampilkanPassword: false,
      MenuTanggalMulaiKerja: false,
      MenuTanggalBerhentiKerja: false,
      MenuTanggalLahir: false,
      date: new Date().toISOString().substr(0, 10),

      tanggal_lahir: false,
      tab: false,
      tab1: false,
      editedIndex: -1,

      editedItem: {
        Kode: "",
        Nama: "",
        NamaLengkap: "",
        Telepon: "",
        Alamat: "",
        Email: "",
        Password: "",
        Jabatan: "",
        Departemen: "",
        JenisKelamin: "",
        Gudang: "",
        TanggalLahir: "",
        TanggalMulaiKerja: "",
        TanggalBerhentiKerja: "",
        Keterangan: "",
        Aktif: false,
      },
      defaultItem: {
        Kode: "",
        Nama: "",
        NamaLengkap: "",
        Telepon: "",
        Alamat: "",
        Gudang: "",
        Email: "",
        Password: "",
        Jabatan: "",
        Departemen: "",
        JenisKelamin: "",
        TanggalLahir: "",
        TanggalMulaiKerja: "",
        TanggalBerhentiKerja: "",
        Keterangan: "",
        Aktif: false,
      },
      itemtabsatuan: [],
      // headertabstok: [
      //   {
      //     text: 'COA',
      //     align: 'start',
      //     sortable: false,
      //     value: 'coa',
      //   },
      //   { text: 'Nama', value: 'nama' },
      //   { text: 'Stock On Hand', value: 'stockonhand' },
      // ],
      dialog: false,
      DataJabatan: [],
      dataDept: [],
      dataStateChange: false,
      token: localStorage.getItem("token"),
      data: [],
      commands: [
        // {title:"Edit",  buttonOption: { cssClass: 'e-flat Edit', iconCss: 'e-edit e-icons' } },
        // {title:"Hapus", buttonOption: { cssClass: 'e-flat Delete', iconCss: 'e-delete e-icons' } },
      ],
      groupSettings: { allowReordering: true },
      selectionOptions: { type: "Multiple" },
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
      footerMax: function () {
        return {
          template: Vue.component("MaxTemplate", {
            template: `<span>Max: {{data.Max}}</span>`,
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
      Group,
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
    // chaeck actions
    // if (this.action.some(a => a == 'R')){
    this.getData();
    // this.getDataGudang();
    //   this.autoTanggal()
    // }

    // if (this.action.some(a => a == 'C')){
    //   this.btn_tambah = false
    // }
    // if (this.action.some(a => a == 'U')){
    this.commands.push({
      title: "Edit",
      buttonOption: { cssClass: "e-flat Edit", iconCss: "e-edit e-icons" },
    });
    // }
    // if (this.action.some(a => a == 'D')){
    this.commands.push({
      title: "Hapus",
      buttonOption: { cssClass: "e-flat Delete", iconCss: "e-delete e-icons" },
    });
    // }
  },
  created() {
    //get action for this page
    // this.action = Object.assign([],this.$route.params.action.replaceAll('"','').replaceAll('[','').replaceAll(']','').replaceAll(',',''))
    // console.log(this.action)
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
    // Aktif:{
    //   handler(){
    //     if (this.Aktif == "True") {
    //       this.editedItem.Aktif = 1
    //     }else{
    //       this.editedItem.Aktif = 0
    //     }
    //   }
    // },
    // Kode:{
    //   handler(){
    //     if (this.Kode.length > 0) {
    //       this.editedItem.Kode = this.Kode
    //       this.disabled = false
    //       this.enabled = true
    //     }else{
    //       this.disabled = true
    //       this.enabled = false
    //     }
    //   }
    // },
    dialog(val) {
      val || this.close();
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? this.$t("User.DialogTitleTambah")
        : this.$t("User.DialogTitleEdit");
    },
  },
  methods: {
    info(v) {
      if (v == true) {
        alert("Berhasil Menambahkan User");
        this.dialogRegister = false;
        this.getData();
      }
    },
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

    getDataGudang() {
      api.get("/gudangs?token=" + this.token).then(
        (res) => {
          this.Gudangs = res.data;
        },
        (err) => {
          console.log(err);
          // this.$router.push('/login')
          // localStorage.removeItem('token')
        }
      );
    },
    // rowSelectedGudang: function (args) {
    //   this.editedItem.Gudang = args.rowData.Nama;
    //   this.dialog_gudang = false;
    // },
    resetPassword() {
      api
        .put("/resetPwd/" + this.id_user + "?token=" + this.token)
        .then((res) => {
          alert("New Password : " + res.data.new_password);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rowDataBound: function (args) {
      if (args.data.Aktif == "0") {
        args.row.classList.add("not-active");
      }
    },
    save() {
      if (this.editedIndex == -1) {
        // if (this.editedItem.Gudang == "") {
        //   this.alert = true;
        //   this.pesan = "Gudang tidak boleh kosong";
        // } else {
        //   this.isLoading = true;
        //   this.TambahData();
        // }
        this.isLoading = true;
        this.TambahData();
      } else {
        // if (this.editedItem.Gudang == "") {
        //   this.alert = true;
        //   this.pesan = "Gudang tidak boleh kosong";
        // } else {
        //   this.isLoading = true;
        //   this.UpdateData();
        // }
        this.isLoading = true;
        this.UpdateData();
      }
    },
    // TambahData(){
    //         api.post('/register?token='+this.token, {
    //         kode:this.editedItem.Kode,
    //         name:this.editedItem.Nama,
    //         nama_lengkap: this.editedItem.NamaLengkap,
    //         telp: this.editedItem.Telepon,
    //         alamat: this.editedItem.Alamat,
    //         email: this.editedItem.Email,
    //         password: this.editedItem.Password,
    //         jabatan: this.editedItem.Jabatan,
    //         jenis_kelamin: this.editedItem.JenisKelamin,
    //         tanggal_lahir: this.editedItem.TanggalLahir,
    //         tanggal_mulai_kerja: this.editedItem.TanggalMulaiKerja,
    //         tanggal_berhenti_kerja: this.editedItem.TanggalBerhentiKerja,
    //         keterangan: this.editedItem.Keterangan,
    //         aktif: this.editedItem.Aktif,
    //         di_buat_oleh: this.user.kode
    //     })
    //     .then((res) => {
    //         this.isLoading = false,
    //         this.NamaLengkap = ''
    //         this.Telepon = ''
    //         this.Alamat = ''
    //         this.email = ''
    //         this.password = ''
    //         this.Jabatan = ''
    //         this.JenisKelamin = ''
    //         this.TanggalLahir = ''
    //         this.TanggalMulaiKerja = ''
    //         this.TanggalBerhentiKerja = ''
    //         this.Keterangan = ''
    //         this.Aktif = ''
    //         console.log(res)
    //         this.close()
    //         this.getData()
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    //     },
    UpdateData() {
      let tampung_jabatan = this.editedItem.Jabatan;
      // this.editedItem.Gudang = this.Gudangs.find(p => p.Nama == this.editedItem.Gudang).Kode
      api
        .put("/user/" + this.id_user + "?token=" + this.token, this.editedItem)
        .then((res) => {
          this.isLoading = false;
          console.log(this.ListJabatan.indexOf(tampung_jabatan));
          if (this.ListJabatan.indexOf(tampung_jabatan) == -1) {
            api
              .post("/jabatan?token=" + this.token, {
                jabatan: tampung_jabatan,
              })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
          this.id_user = null;
          this.id = "";
          console.log(res);
          this.getData();
          this.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    close() {
      this.$nextTick(() => {
        this.Kode = "";
        this.dialog = false;
        this.editedIndex = -1;
        this.editedItem = Object.assign({}, this.defaultItem);
        this.autoTanggal();
      });
      this.alert = false;
    },

    autoTanggal() {
      this.editedItem.TanggalMulaiKerja = this.date;
      this.editedItem.TanggalBerhentiKerja = this.date;
      this.editedItem.TanggalLahir = this.date;
    },

    commandClick: function (args) {
      if (args.target.classList.contains("custombutton")) {
        let data = JSON.stringify(args.rowData);
        console.log(data);
      } else if (args.target.classList.contains("Delete")) {
        var r = confirm("Yakin Hapus Data?");
        if (r == true) {
          api
            .delete("/user/" + args.rowData.id + "?token=" + this.token)
            .then((res) => {
              // this.item.splice(index, 1)
              console.log(res);
              this.getData();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else if (args.target.classList.contains("Edit")) {
        let data = args;
        this.editedIndex = 1;
        console.log(data.rowData);
        this.editedItem = data.rowData;
        this.id_user = data.rowData["id"];
        // this.editedItem.Aktif = data.rowData['aktif']
        // this.editedItem.Nama = data.rowData['name']
        // this.editedItem.NamaLengkap = data.rowData['nama_lengkap']
        // this.editedItem.Telepon = data.rowData['telp']
        // this.editedItem.Alamat = data.rowData['alamat']
        // this.editedItem.Email = data.rowData['email']
        // this.editedItem.Password = data.rowData['password']
        // this.editedItem.Jabatan = data.rowData['jabatan']
        // this.editedItem.JenisKelamin = data.rowData['jenis_kelamin']
        // this.editedItem.TanggalLahir = data.rowData['tanggal_lahir']
        // this.editedItem.TanggalMulaiKerja = data.rowData['tanggal_mulai_kerja']
        // this.editedItem.TanggalBerhentiKerja = data.rowData['tanggal_berhenti_kerja']
        // this.editedItem.Keterangan = data.rowData['keterangan']
        this.dialog = true;
        // if (data.rowData.Gudang != "") {
        //   this.editedItem.Gudang = this.Gudangs.find(p => p.Kode == this.editedItem.Gudang).Nama
        // }
        this.Kode = data.rowData["Kode"];
      }
    },

    actionComplete(args) {
      console.log(args);
    },
    CariUniqueJabatan() {
      this.ListJabatan = [];
      api.get("jabatan?token=" + this.token).then(
        (res) => {
          res.data.forEach((element) => {
            this.ListJabatan.push(element.jabatan);
          });
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getData() {
      this.isLoading = true;
      api.get("/user?token=" + this.token).then(
        (res) => {
          this.isLoading = false;
          // console.log(res)s
          this.dataDept = res.data
            .filter((d) => d.Departemen != null)
            .map((p) => {
              return p.Departemen;
            })
            .filter((v, i, a) => a.indexOf(v) === i);
          // console.log(this.dataDept)
          this.data = res.data;
          this.CariUniqueJabatan();
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>
