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
            <strong>{{ $t("Supplier.MainTitle") }}</strong>
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
            {{ $t("Supplier.MainTitle") }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-dialog
            v-model="dialogSupplier"
            scrollable
            max-width="1200px"
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
                {{ $t("Supplier.BtnTambah") }}
              </v-btn>
            </template>

            <v-card class="rounded-lg">
              <v-toolbar flat dark color="blue darken-4">
                <v-toolbar-title>
                  <span>{{ formTitleSupplier }}</span>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon @click="closeSupplier">
                  <v-icon>mdi-window-close</v-icon>
                </v-btn>
              </v-toolbar>

              <v-card-text>
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
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        dense
                        readonly
                        :disable="true"
                        v-model="editedItem.Kode"
                        label="Kode"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        dense
                        v-model="editedItem.Nama"
                        label="Nama"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        dense
                        clearable
                        v-model="editedItem.Alamat"
                        label="Alamat"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        dense
                        v-model="editedItem.BadanHukum"
                        :items="[
                          'PT',
                          'CV',
                          'UD',
                          'TOKO',
                          'ALL',
                          'PD',
                          'pribadi',
                          '-',
                        ]"
                        label="Badan Hukum*"
                        required
                      >
                      </v-select>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <!-- <v-text-field
                        dense
                        clearable
                        v-model="editedItem.Kota"
                        label="Kota">
                      </v-text-field> -->
                      <div style="margin-top: -16px">
                        <ejs-autocomplete
                          :maxlength="25"
                          label-size="16px"
                          floatLabelType="Auto"
                          :dataSource="namakota"
                          v-model="editedItem.Kota"
                          :placeholder="waterMark"
                        ></ejs-autocomplete>
                      </div>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        dense
                        clearable
                        v-model="editedItem.KodePos"
                        label="Kode Pos"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <!-- <v-text-field
                        dense
                        clearable
                        v-model="editedItem.Negara"
                        label="Negara">
                      </v-text-field> -->
                      <div style="margin-top: -16px">
                        <ejs-autocomplete
                          :maxlength="25"
                          label-size="18px"
                          floatLabelType="Auto"
                          :dataSource="namaNegara"
                          v-model="editedItem.Negara"
                          :placeholder="waterMark1"
                        ></ejs-autocomplete>
                      </div>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        dense
                        clearable
                        @keypress="isNumber($event)"
                        v-model="editedItem.Telp"
                        label="Telp"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.BillFrom"
                        readonly
                        label="BillFrom"
                      >
                        <template v-slot:append>
                          <v-dialog
                            v-model="dialogBillFrom"
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
                                  @click="dialogBillFrom = false"
                                >
                                  <v-icon class="mx-1">mdi-window-close</v-icon>
                                </v-btn>
                              </v-toolbar>
                              <v-card flat>
                                <v-col cols="12" md="12">
                                  <v-card>
                                    <ejs-grid
                                      :dataSource="chunkSupplier"
                                      height="200"
                                      width="100%"
                                      gridLines="Both"
                                      :allowReordering="true"
                                      :allowSorting="true"
                                      :allowMultiSorting="true"
                                      :allowFiltering="true"
                                      :filterSettings="filterOptions"
                                      :allowResizing="true"
                                      :allowPaging="true"
                                      :toolbar="toolbarOptions"
                                      :recordDoubleClick="rowSelectedBillFrom"
                                    >
                                      <e-columns>
                                        <e-column
                                          field="Kode"
                                          headerText="Kode"
                                          textAlign="Left"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="Nama"
                                          headerText="Nama"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="BadanHukum"
                                          headerText="Badan Hukum"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="Kota"
                                          headerText="Kota"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="Alamat"
                                          headerText="Alamat"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="Telp"
                                          headerText="Telp"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="ContactPerson"
                                          headerText="Contact Person"
                                          width="180"
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
                        v-model="editedItem.SellFrom"
                        readonly
                        label="SellFrom"
                      >
                        <template v-slot:append>
                          <v-dialog
                            v-model="dialogSellFrom"
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
                                  @click="dialogSellFrom = false"
                                >
                                  <v-icon class="mx-1">mdi-window-close</v-icon>
                                </v-btn>
                              </v-toolbar>
                              <v-card flat>
                                <v-col cols="12" md="12">
                                  <v-card>
                                    <ejs-grid
                                      :dataSource="chunkSupplier"
                                      height="200"
                                      width="100%"
                                      gridLines="Both"
                                      :allowReordering="true"
                                      :allowSorting="true"
                                      :allowMultiSorting="true"
                                      :allowFiltering="true"
                                      :filterSettings="filterOptions"
                                      :allowResizing="true"
                                      :allowPaging="true"
                                      :toolbar="toolbarOptions"
                                      :recordDoubleClick="rowSelectedSellFrom"
                                    >
                                      <e-columns>
                                        <e-column
                                          field="Kode"
                                          headerText="Kode"
                                          textAlign="Left"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="Nama"
                                          headerText="Nama"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="BadanHukum"
                                          headerText="Badan Hukum"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="Kota"
                                          headerText="Kota"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="Alamat"
                                          headerText="Alamat"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="Telp"
                                          headerText="Telp"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="ContactPerson"
                                          headerText="Contact Person"
                                          width="180"
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
                        @keypress="isNumber($event)"
                        v-model="editedItem.Fax"
                        label="Fax"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        dense
                        clearable
                        v-model="editedItem.Email"
                        label="Email"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        dense
                        clearable
                        v-model="editedItem.ContactPerson"
                        label="Contact Person"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <!-- <v-text-field
                        dense
                        clearable
                        v-model="editedItem.GrupSupplier"
                        label="Grup Supplier">
                      </v-text-field> -->
                      <v-select
                        dense
                        v-model="editedItem.GrupSupplier"
                        :items="namaGrup"
                        label="Grup Supplier"
                        required
                      >
                      </v-select>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        dense
                        clearable
                        maxlength="12"
                        onPaste="return false"
                        @keypress="isNumber($event)"
                        v-model="editedItem.KreditLimit"
                        label="Kredit Limit"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        dense
                        maxlength="3"
                        clearable
                        onPaste="return false"
                        v-model="editedItem.LamaKredit"
                        @keypress="isNumber($event)"
                        label="Lama Kredit"
                      >
                      </v-text-field>
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

                    <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        dense
                        clearable
                        v-model="editedItem.NPWP"
                        label="NPWP"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        dense
                        clearable
                        v-model="editedItem.NPPKP"
                        label="NPPKP"
                      >
                      </v-text-field>
                    </v-col> -->

                    <!-- <v-col cols="12" sm="6" md="4">
                      <v-menu
                        v-model="MenuTanggalPengukuhan"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            dense
                            v-model="editedItem.TglPengukuhan"
                            label="Tanggal Pengukuhan"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.TglPengukuhan"
                          @input="MenuTanggalPengukuhan = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col> -->

                    <v-col cols="12" sm="6" md="6">
                      <v-switch dense v-model="editedItem.Aktif" label="Aktif">
                      </v-switch>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="error" @click="closeSupplier">
                  <v-icon class="mr-1">mdi-close-circle</v-icon
                  >{{ $t("All.BtnBatal") }}
                </v-btn>

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
            :dataSource="data"
            ref="ggs"
            style="height: 100%"
            :height="mobile ? '43vh' : 'auto'"
            width="100%"
            gridLines="Both"
            :selectionSettings="selectionOptions"
            :groupSettings="groupSettings"
            :rowDataBound="rowDataBound"
            :allowReordering="true"
            :allowGrouping="mobile"
            :allowSorting="true"
            :allowMultiSorting="true"
            :allowFiltering="mobile"
            :allowResizing="true"
            :allowPaging="true"
            :filterSettings="filterOptions"
            :pageSettings="pageSettings"
            :toolbar="toolbarOptions"
            :commandClick="commandClick"
            @actionComplete="actioncomplete"
            :dataStateChange="dataStateChange"
          >
            <e-columns>
              <e-column
                :visible="mobile"
                :allowFiltering="false"
                field="Commands"
                headerText="Action"
                width="115"
                :commands="commands"
                textAlign="center"
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
                field="Kode"
                headerText="Kode"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :allowFiltering="false"
                field="Nama"
                headerText="Nama"
                width="320"
              ></e-column>

              <e-column
                field="BillFrom"
                headerText="BillFrom"
                width="180"
              ></e-column>

              <e-column
                field="SellFrom"
                headerText="SellFrom"
                width="180"
              ></e-column>

              <e-column
                field="BadanHukum"
                headerText="Badan Hukum "
                width="180"
              ></e-column>

              <e-column
                field="Alamat"
                :allowFiltering="false"
                headerText="Alamat"
                width="180"
              ></e-column>

              <e-column field="Kota" headerText="Kota" width="180"></e-column>

              <e-column
                field="KodePos"
                headerText="Kode Pos"
                width="180"
              ></e-column>

              <e-column
                field="Negara"
                headerText="Negara"
                width="180"
              ></e-column>

              <e-column field="Telp" headerText="Telp" width="180"></e-column>

              <e-column field="Fax" headerText="Fax" width="180"></e-column>

              <e-column field="Email" headerText="Email" width="180"></e-column>

              <e-column
                field="ContactPerson"
                headerText="Contact Person"
                width="180"
              ></e-column>

              <e-column
                field="GrupSupplier"
                headerText="Grup Supplier"
                width="180"
              ></e-column>

              <e-column
                field="KreditLimit"
                headerText="Kredit Limit"
                width="180"
              ></e-column>

              <e-column
                field="LamaKredit"
                headerText="Lama Kredit"
                width="180"
              ></e-column>

              <e-column field="Memo" headerText="Memo" width="180"></e-column>

              <e-column
                field="Posting"
                headerText="Posting"
                width="180"
              ></e-column>

              <e-column
                field="DiBuatTgl"
                headerText="DiBuatTgl"
                width="180"
              ></e-column>

              <e-column
                field="DiBuatOleh"
                headerText="DiBuatOleh"
                width="180"
              ></e-column>

              <e-column
                field="DiUbahTgl"
                headerText="DiUbahTgl"
                width="180"
              ></e-column>

              <e-column
                field="DiUbahOleh"
                headerText="DiUbahOleh"
                width="180"
              ></e-column>

              <!-- <e-column field="NPWP" headerText="NPWP" width="180"></e-column>

              <e-column field="NPPKP" headerText="NPPKP" width="180"></e-column> -->

              <!-- <e-column
                field="TglPengukuhan"
                headerText="TglPengukuhan"
                width="180"
              ></e-column> -->

              <e-column
                field="Aktif"
                headerText="Aktif"
                displayAsCheckBox="true"
                width="160"
                :allowFiltering="false"
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
import api from "../services/http";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { DataManager, Query, JsonAdaptor } from "@syncfusion/ej2-data";
Vue.use(GridPlugin);

export default {
  components: {
    Loading,
  },
  data() {
    return {
      alert: "",
      dialogBillFrom: false,
      dialogSellFrom: false,
      pesan: "",
      chunkSupplier: [],
      ScrollKeAtas: false,
      mobile: null,
      windowSize: { x: 0, y: 0 },
      action: null,
      btn_tambah: true,
      BatalEdit: null,
      isLoading: false,
      fullPage: true,
      MenuTanggalPengukuhan: false,
      date: new Date().toISOString().substr(0, 10),
      search: null,
      search2: null,
      namaGrup: [],
      Grup: [],
      namakota: [],
      waterMark: "Kota",
      namaNegara: [],
      waterMark1: "Negara",
      BillSell: [],
      alldata: [],
      editedIndex: -1,
      defaultItem: {
        Kode: "",
        Nama: "",
        BillFrom: null,
        SellFrom: null,
        BadanHukum: "",
        Alamat: "",
        Kota: "",
        KodePos: "",
        Negara: "",
        Telp: "",
        Fax: "",
        Email: "",
        ContactPerson: "",
        GrupSupplier: "UNDEFINED",
        KreditLimit: 0,
        LamaKredit: 0,
        Memo: "",
        // NPWP: "",
        // NPPKP: "",
        // TglPengukuhan: "",
        Aktif: true,
      },

      editedItem: {
        Kode: "",
        Nama: "",
        BillFrom: null,
        SellFrom: null,
        BadanHukum: "",
        Alamat: "",
        Kota: "",
        KodePos: "",
        Negara: "",
        Telp: "",
        Fax: "",
        Email: "",
        ContactPerson: "",
        GrupSupplier: "UNDEFINED",
        KreditLimit: 0,
        LamaKredit: 0,
        Memo: "",
        // NPWP: "",
        // NPPKP: "",
        // TglPengukuhan: "",
        Aktif: true,
      },
      dialogSupplier: false,
      dialogNoWorkOrder: false,
      dialogNoPartOrder: false,
      token: localStorage.getItem("token"),
      data: [],
      commands: [],
      sorted: null,
      filter: null,
      groupSettings: { allowReordering: true },
      selectionOptions: { type: "Multiple" },
      toolbarOptions: ["Search"],
      pageSettings: { pageSize: 100, pageSizes: ["20", "50", "100"] },
      skip: 0,
      take: 100,
      filterOptions: { type: "CheckBox" },
      // filter: { type : 'CheckBox' },
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
    // chaeck actions
    if (this.action.some((a) => a == "R")) {
      // this.getData()
      this.getDataPage(0, 100);
      // this.countSupplier()
      this.getKota();
      this.getSupp();
      this.getGrup();
      // console.log('awkowkwok',this.items)
      // this.editedItem.TglPengukuhan = this.date;
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
        this.pesan = "Nama Suplier tidak boleh kosong";
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
    dialogNoWorkOrder(val) {
      val || this.closeNoWorkOrder();
    },
    dialogNoPartOrder(val) {
      val || this.closeNoPartOrder();
    },
  },

  computed: {
    formTitleSupplier() {
      return this.editedIndex === -1 ? "Tambah Supplier" : "Edit Supplier";
    },

    formTitleNoWorkOrder() {
      return this.editedIndex === -1
        ? "Tambah No.Work Order"
        : "Edit No.Work Order";
    },

    formTitleNoPartOrder() {
      return this.editedIndex === -1
        ? "Tambah No.Part Order"
        : "Edit No.Part Order";
    },
  },

  methods: {
    rowSelectedBillFrom: function (args) {
      this.editedItem.BillFrom = args.rowData.Nama;
      this.dialogBillFrom = false;
    },
    rowSelectedSellFrom: function (args) {
      this.editedItem.SellFrom = args.rowData.Nama;
      this.dialogSellFrom = false;
    },
    getSupp() {
      api.get("chunk-supplier?token=" + this.token).then((res) => {
        this.chunkSupplier = res.data.data.filter((p) => p.Aktif == "1");
      });
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

    rowDataBound: function (args) {
      if (args.data.Aktif == "0") {
        args.row.classList.add("not-active");
      }
    },
    getKota() {
      api.get("/search?token=" + this.token).then((res) => {
        this.namakota = res.data.kota;
        this.namaNegara = res.data.negara;
      });
    },
    getGrup() {
      api.get("grup-suppliers?token=" + this.token).then((res) => {
        this.Grup = res.data;
        this.namaGrup = this.Grup.map((x) => x.Nama);
      });
    },
    save() {
      if (this.editedIndex == -1) {
        if (this.editedItem.Nama == "") {
          this.alert = true;
          this.pesan = "Nama Suplier tidak boleh kosong";
        } else if (this.editedItem.Telp == "") {
          this.alert = true;
          this.pesan = "Nomer Telp tidak boleh kosong";
        } else {
          this.TambahData();
        }
      } else {
        if (this.editedItem.Nama == "") {
          this.alert = true;
          this.pesan = "Nama Suplier tidak boleh kosong";
        } else if (this.editedItem.Telp == "") {
          this.alert = true;
          this.pesan = "Nomer Telp tidak boleh kosong";
        } else {
          this.UpdateData();
        }
      }
    },
    dataStateChange: function (state) {
      if (state.action.requestType === "paging") {
        this.skip = state.skip;
        this.take = state.take;
        if (state.search != undefined) {
          api
            .get(
              "suppliers?token=" +
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
        console.log(this.sorted);
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
          .get("suppliers?token=" + this.token + "&dist=" + queryString)
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
        console.log("yang dicari dia", state.action.searchString);
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
              "suppliers?token=" +
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
    getDataPage(skip, take, sort, filter) {
      api
        .get(
          "suppliers?token=" +
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
            let dataSup = {};
            dataSup.count = res.data.count;
            dataSup.result = res.data.result.map((d) => {
              d.Aktif = d.Aktif === "1";
              return d;
            });
            this.data = dataSup;
          },
          (err) => {
            console.log(err);
          }
        );
    },
    // countSupplier(){
    //   const PT = "01"
    //   let cabang = "01"
    //   let x = "0000"
    //   let spacer = "/"
    //   let x0 = 1
    //   let s0 = []
    //   let totalsuplier = []
    //   let hitungan = []
    //   if (this.data.length > 0) {
    //     let awok = this.alldata.reverse()
    //     // for (let index = 0; index < this.data.length; index++) {
    //     //   const element = this.data[index];
    //     //   s0.push(element)
    //     //   totalsuplier.push(s0[index].Kode)
    //     // }
    //     // hitungan = parseInt(s0.length-1)
    //     // totalsuplier.sort(function(a, b){return b-a})
    //     let xsx = awok[0].Kode
    //     let xsx1 = xsx.slice(5, 9)
    //     let xsx2 = xsx1.replace(/^0+/, '')
    //     let desc = parseInt(xsx2)+1
    //     let r0 = (x+desc).slice(-x.length)
    //     this.editedItem.Kode = (PT+cabang+spacer+r0)
    //     this.editedItem.BillFrom = (PT+cabang+spacer+r0)
    //     this.editedItem.SellFrom = (PT+cabang+spacer+r0)
    //   }else if (this.data.length == 0) {
    //    let yuklah = (x+x0).slice(-x.length)
    //    this.editedItem.Kode = (PT+cabang+spacer+yuklah)
    //    this.editedItem.BillFrom = (PT+cabang+spacer+yuklah)
    //    this.editedItem.SellFrom = (PT+cabang+spacer+yuklah)
    //  }
    //  Object.freeze(s0,totalsuplier,hitungan)
    // },
    UpdateData() {
      this.$refs.ggs.ej2Instances.searchSettings.key = "";
      this.isLoading = true;
      let grup = this.Grup.find((x) => x.Nama == this.editedItem.GrupSupplier);
      let BillFrom = this.chunkSupplier.find(
        (d) => d.Nama == this.editedItem.BillFrom
      );
      let SellFrom = this.chunkSupplier.find(
        (d) => d.Nama == this.editedItem.SellFrom
      );
      api
        .put("/suppliers/" + this.editedItem.id + "?token=" + this.token, {
          Kode: this.editedItem.Kode,
          Nama: this.editedItem.Nama,
          BillFrom: BillFrom == undefined ? "" : BillFrom.Kode,
          SellFrom: SellFrom == undefined ? "" : SellFrom.Kode,
          BadanHukum: this.editedItem.BadanHukum,
          Alamat: this.editedItem.Alamat,
          Kota: this.editedItem.Kota,
          KodePos: this.editedItem.KodePos,
          Negara: this.editedItem.Negara,
          Telp: this.editedItem.Telp,
          Fax: this.editedItem.Fax,
          Email: this.editedItem.Email,
          ContactPerson: this.editedItem.ContactPerson,
          GrupSupplier: grup.Kode,
          KreditLimit: this.editedItem.KreditLimit,
          LamaKredit: this.editedItem.LamaKredit,
          Memo: this.editedItem.Memo,
          // NPWP: this.editedItem.NPWP,
          // NPPKP: this.editedItem.NPPKP,
          // TglPengukuhan: this.editedItem.TglPengukuhan,
          Aktif: this.editedItem.Aktif,
        })
        .then(() => {
          this.BatalEdit = null;
          this.id = "";
          // console.log(res)
          // this.getData()
          this.isLoading = false;
          this.closeSupplier();
          this.getDataPage(this.skip, this.take);
          this.getSupp();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    TambahData() {
      this.isLoading = true;
      let grup = this.Grup.find((x) => x.Nama == this.editedItem.GrupSupplier);
      let BillFrom = this.chunkSupplier.find(
        (d) => d.Nama == this.editedItem.BillFrom
      );
      let SellFrom = this.chunkSupplier.find(
        (d) => d.Nama == this.editedItem.SellFrom
      );
      api
        .post("/suppliers?token=" + this.token, {
          Kode: this.editedItem.Kode,
          Nama: this.editedItem.Nama,
          BillFrom: BillFrom == undefined ? "" : BillFrom.Kode,
          SellFrom: SellFrom == undefined ? "" : SellFrom.Kode,
          BadanHukum: this.editedItem.BadanHukum,
          Alamat: this.editedItem.Alamat,
          Kota: this.editedItem.Kota,
          KodePos: this.editedItem.KodePos,
          Negara: this.editedItem.Negara,
          Telp: this.editedItem.Telp,
          Fax: this.editedItem.Fax,
          Email: this.editedItem.Email,
          ContactPerson: this.editedItem.ContactPerson,
          GrupSupplier: grup.Kode,
          KreditLimit: this.editedItem.KreditLimit,
          LamaKredit: this.editedItem.LamaKredit,
          Memo: this.editedItem.Memo,
          // NPWP: this.editedItem.NPWP,
          // NPPKP: this.editedItem.NPPKP,
          // TglPengukuhan: this.editedItem.TglPengukuhan,
          Aktif: this.editedItem.Aktif,
        })
        .then((res) => {
          (this.isLoading = false), (this.Kode = "");
          this.Nama = "";
          this.BillFrom = "";
          this.SellFrom = "";
          this.BadanHukum = "";
          this.Alamat = "";
          this.Kota = "";
          this.KodePos = "";
          this.Negara = "";
          this.Telp = "";
          this.Fax = "";
          this.Email = "";
          this.ContactPerson = "";
          this.GrupSupplier = "";
          this.KreditLimit = "";
          this.LamaKredit = "";
          this.Memo = "";
          // this.NPWP = "";
          // this.NPPKP = "";
          // this.TglPengukuhan = "";
          this.Aktif = "";
          console.log(res);
          // this.getData()
          this.getDataPage(this.skip, this.take);
          this.closeSupplier();
          this.getSupp();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    closeSupplier() {
      this.dialogSupplier = false;
      // this.editedItem = this.defaultItem
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      // if (this.BatalEdit != null && this.editedItem.Kode != '') {
      //   this.data.result.find(d=> d.Kode == this.BatalEdit.Kode).GrupSupplier = this.Grup.find(x=> x.Nama == this.BatalEdit.GrupSupplier).Kode
      // }
      this.editedItem = [];
      // this.countSupplier()
      // this.editedItem.TglPengukuhan = this.date;
      this.editedIndex = -1;
      this.alert = false;
    },
    closeNoWorkOrder() {
      this.dialogNoWorkOrder = false;
    },
    closeNoPartOrder() {
      this.dialogNoPartOrder = false;
    },

    commandClick: function (args) {
      if (args.target.classList.contains("custombutton")) {
        let data = JSON.stringify(args.rowData);

        console.log(data);
      } else if (args.target.classList.contains("Delete")) {
        var r = confirm("Yakin Hapus Data?");
        if (r == true) {
          api
            .delete("/suppliers/" + args.rowData.id + "?token=" + this.token)
            .then(() => {
              // this.getData()
              this.getDataPage(this.skip, this.take);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else if (args.target.classList.contains("Edit")) {
        this.editedIndex = 1;
        // let data = args.rowData
        // this.BatalEdit = data
        // // console.log(data)
        // this.editedItem = data
        this.editedItem.id = args.rowData.id;
        this.editedItem.Kode = args.rowData.Kode;
        this.editedItem.Nama = args.rowData.Nama;
        this.editedItem.BillFrom = args.rowData.BillFrom;
        this.editedItem.SellFrom = args.rowData.SellFrom;
        this.editedItem.BadanHukum = args.rowData.BadanHukum;
        this.editedItem.Alamat = args.rowData.Alamat;
        this.editedItem.Kota = args.rowData.Kota;
        this.editedItem.KodePos = args.rowData.KodePos;
        this.editedItem.Negara = args.rowData.Negara;
        this.editedItem.Telp = args.rowData.Telp;
        this.editedItem.Fax = args.rowData.Fax;
        this.editedItem.Email = args.rowData.Email;
        this.editedItem.ContactPerson = args.rowData.ContactPerson;
        this.editedItem.GrupSupplier = args.rowData.GrupSupplier;
        this.editedItem.KreditLimit = args.rowData.KreditLimit;
        this.editedItem.LamaKredit = args.rowData.LamaKredit;
        this.editedItem.Memo = args.rowData.Memo;
        // this.editedItem.NPWP = args.rowData.NPWP;
        // this.editedItem.NPPKP = args.rowData.NPPKP;
        // this.editedItem.TglPengukuhan = args.rowData.TglPengukuhan;
        this.editedItem.Aktif = args.rowData.Aktif;
        this.editedItem.GrupSupplier = this.Grup.find(
          (x) => x.Kode == args.rowData.GrupSupplier
        ).Nama;
        let BillFrom = this.chunkSupplier.find(
          (d) => d.Kode == args.rowData.BillFrom
        );
        let SellFrom = this.chunkSupplier.find(
          (d) => d.Kode == args.rowData.SellFrom
        );
        this.editedItem.BillFrom = BillFrom.Nama;
        this.editedItem.SellFrom = SellFrom.Nama;
        this.dialogSupplier = true;
      }
    },
    //     actionBegin(args) {
    //     console.log(args)
    // },
    actioncomplete(args) {
      // console.log(args)
      //    let x = args.rows.length
      //   console.log(x)
      //   switch (x) {
      //     case "01":
      //       this.editedItem.Nama = "Januari "+this.thn
      //     break;
      //   }
      if (
        args.requestType == "refresh" &&
        !args.rows &&
        this.alldata.length != 0
      ) {
        let items = new DataManager({
          json: this.alldata,
          adaptor: new JsonAdaptor(),
        }).executeLocal(new Query().skip(0));
        // console.log('222',items)
        this.data = items;
      } else {
        //Tidak ada yg ditampilkan
      }
    },
    FilterBillSell(item, queryText) {
      if (this.editedItem.BillFrom == null) {
        this.editedItem.BillFrom = this.editedItem.Kode;
      }
      const pencarianNama = item.Nama.toLowerCase();
      const pencarianKode = item.Kode.toLowerCase();
      const cari = queryText.toLowerCase();

      return (
        pencarianNama.indexOf(cari) > -1 || pencarianKode.indexOf(cari) > -1
      );
    },
    resetBillFrom() {
      this.editedItem.BillFrom = null;
      if (
        this.editedItem.BillFrom == null ||
        this.editedItem.BillFrom != null
      ) {
        this.editedItem.BillFrom = this.editedItem.Kode;
      }
    },
    resetSellFrom() {
      this.editedItem.SellFrom = null;
      if (this.editedItem.SellFrom == null) {
        this.editedItem.SellFrom = this.editedItem.Kode;
      }
    },
    // customiseCell: function(args) {
    //     if (args.column.field === 'Kode' ||
    //         args.column.field === 'Nama' ||
    //         args.column.field === 'BillFrom' ||
    //         args.column.field === 'SellFrom' ||
    //         args.column.field === 'BadanHukum' ||
    //         args.column.field === 'Alamat' ||
    //         args.column.field === 'Kota' ||
    //         args.column.field === 'KodePos' ||
    //         args.column.field === 'Negara' ||
    //         args.column.field === 'Telp' ||
    //         args.column.field === 'Fax' ||
    //         args.column.field === 'Email' ||
    //         args.column.field === 'ContactPerson' ||
    //         args.column.field === 'GrupSupplier' ||
    //         args.column.field === 'KreditLimit' ||
    //         args.column.field === 'LamaKredit' ||
    //         args.column.field === 'Memo' ||
    //         args.column.field === 'npwp' ||
    //         args.column.field === 'NPPKP' ||
    //         args.column.field === 'TglPengukuhan' ||
    //         args.column.field === 'Aktif' ||
    //         args.column.field === 'Commands'
    //         ) {
    //        if (args.data['Aktif'] == 0) {
    //           args.cell.classList.add('TidakAktif');
    //       }
    //     }
    //   },
    getBool(x) {
      if (x == 1) {
        x = "true";
      } else {
        x = "false";
      }
      return !!String(x).toLowerCase().replace(!!0, "");
    },
    getData() {
      this.isLoading = true;
      api.get("/suppliers?token=" + this.token).then(
        (res) => {
          this.isLoading = false;
          // console.log(res)
          let x = [];
          // this.data = res.data
          // this.countSupplier()
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            element.Aktif = this.getBool(element.Aktif);
            x.push(element);
          }
          let items = new DataManager({
            json: res.data,
            adaptor: new JsonAdaptor(),
          }).executeLocal(new Query().take(0));
          this.data = items;
          this.alldata = x;
          this.BillSell = x;
          // console.log('busx',this.BillSell)
          // Object.freeze(this.BillSell,this.data,items,x)
          // console.log('awokwokwokwowowkw',items)
          // x.push(this.editedItem.Kode,this.editedItem.Nama)
          // this.BillSell.push(x)
          // console.log(x)
        },
        (err) => {
          console.log(err);
          this.$router.push("/login");
          localStorage.removeItem("token");
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

.e-grid .e-groupdroparea.e-grouped {
  background-color: rgb(25, 118, 210);
}
.e-grid .e-groupheadercell {
  background-color: rgb(29, 79, 129);
}
</style>
