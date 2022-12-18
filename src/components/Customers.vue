/* eslint-disable */
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
            <strong>{{ $t("Pelanggan.MainTitle") }}</strong>
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
            {{ $t("Pelanggan.MainTitle") }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" scrollable persistent max-width="700px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                v-bind="attrs"
                v-on="on"
                :disabled="btn_tambah"
                class="text-capitalize subtitle-1"
              >
                <v-icon left>mdi-plus-thick</v-icon>
                {{ $t("Pelanggan.BtnTambah") }}
              </v-btn>
            </template>
            <v-card>
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
                    <v-col cols="12" sm="6" md="2">
                      <v-text-field
                        :disabled="true"
                        v-model="editedItem.Kode"
                        label="Kode"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="7">
                      <v-text-field
                        v-model="editedItem.Nama"
                        label="Nama"
                        :maxlength="50"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-select
                        v-model="editedItem.BadanHukum"
                        :items="itemsBadanHukum"
                        label="Badan Hukum*"
                        required
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        :maxlength="100"
                        v-model="editedItem.Alamat"
                        label="Alamat"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <div>
                        <ejs-autocomplete
                          :maxlength="25"
                          label-size="16px"
                          floatLabelType="Auto"
                          :dataSource="SelectKota"
                          v-model="kota"
                          :placeholder="waterMark"
                        ></ejs-autocomplete>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        :maxlength="7"
                        v-model="editedItem.KodePos"
                        label="Kode Pos"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <!-- <v-text-field
                                :maxlength=17
                                v-model="editedItem.Negara"
                                label="Negara"
                            ></v-text-field> -->
                      <div>
                        <ejs-autocomplete
                          :maxlength="25"
                          label-size="16px"
                          floatLabelType="Auto"
                          :dataSource="SelectNegara"
                          v-model="negara"
                          :placeholder="waterMarkNegara"
                        ></ejs-autocomplete>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        :maxlength="100"
                        v-model="editedItem.Telp"
                        label="Telepon"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        :maxlength="100"
                        v-model="editedItem.Fax"
                        label="Fax"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        :maxlength="400"
                        v-model="editedItem.Email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        :maxlength="50"
                        v-model="editedItem.ContactPerson"
                        label="Contact Person"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="6" md="6">
                        <v-text-field
                            :maxlength=50
                            v-model="editedItem.SalesPerson"
                            label="Sales Person"
                        ></v-text-field>
                        </v-col> -->
                    <v-col cols="12" sm="6" md="6">
                      <!-- <v-text-field
                                :maxlength=30
                                v-model="editedItem.GrupPelanggan"
                                label="Group Pelanggan"
                            ></v-text-field> -->
                      <v-select
                        v-model="editedItem.GrupPelanggan"
                        :items="namaGrup"
                        label="Grup Pelanggan"
                        required
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-switch
                        v-model="editedItem.Aktif"
                        color="primary"
                        label="Aktif"
                      ></v-switch>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        :maxlength="20"
                        v-model="editedItem.KreditLimit"
                        onPaste="return false"
                        @keypress="isNumber($event)"
                        label="Kredit Limit"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        :maxlength="20"
                        v-model="editedItem.LamaKredit"
                        onPaste="return false"
                        @keypress="isNumber($event)"
                        label="Lama Kredit"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
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
                            v-model="editedItem.CustSince"
                            label="Cust Since"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.CustSince"
                          @input="MenuTanggal = false"
                          color="blue darken-4"
                          locale="id"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        :maxlength="50"
                        v-model="editedItem.Memo"
                        label="Memo"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.Asuransi"
                        readonly
                        label="Asuransi"
                      >
                        <template v-slot:append>
                          <v-dialog
                            v-model="dialogAsuransi"
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
                                  @click="dialogAsuransi = false"
                                >
                                  <v-icon class="mx-1">mdi-window-close</v-icon>
                                </v-btn>
                              </v-toolbar>
                              <v-card flat>
                                <v-col cols="12" md="12">
                                  <v-card>
                                    <ejs-grid
                                      :dataSource="asuransi"
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
                                      :recordDoubleClick="rowSelectedAsuransi"
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
                    </v-col> -->
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.BillTo"
                        readonly
                        label="BillTo"
                      >
                        <template v-slot:append>
                          <v-dialog
                            v-model="dialogBillTo"
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
                                  @click="dialogBillTo = false"
                                >
                                  <v-icon class="mx-1">mdi-window-close</v-icon>
                                </v-btn>
                              </v-toolbar>
                              <v-card flat>
                                <v-col cols="12" md="12">
                                  <v-card>
                                    <ejs-grid
                                      :dataSource="asuransi"
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
                                      :recordDoubleClick="rowSelectedBillTo"
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
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.SellTo"
                        readonly
                        label="SellTo"
                      >
                        <template v-slot:append>
                          <v-dialog
                            v-model="dialogSellTo"
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
                                  @click="dialogSellTo = false"
                                >
                                  <v-icon class="mx-1">mdi-window-close</v-icon>
                                </v-btn>
                              </v-toolbar>
                              <v-card flat>
                                <v-col cols="12" md="12">
                                  <v-card>
                                    <ejs-grid
                                      :dataSource="asuransi"
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
                                      :recordDoubleClick="rowSelectedSellTo"
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
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="error" @click="close">
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
            :pageSettings="pageSettings"
            :dataSource="data"
            ref="ggs"
            gridLines="Both"
            style="height: 100%"
            :height="mobile ? '43vh' : 'auto'"
            width="100%"
            :editSettings="editSettings"
            :selectionSettings="selectionOptions"
            :groupSettings="groupSettings"
            :allowReordering="true"
            :allowGrouping="mobile"
            :allowSorting="true"
            :allowMultiSorting="true"
            :allowFiltering="mobile"
            :allowResizing="true"
            :allowPaging="true"
            :filterSettings="filterOptions"
            :toolbar="toolbarOptions"
            :commandClick="commandClick"
            @actionComplete="actioncomplete"
            :dataStateChange="dataStateChange"
            :rowDataBound="rowDataBound"
            :actionBegin="actionBegin"
            :cellEdit="cellEdit"
          >
            <e-columns>
              <e-column
                :visible="mobile"
                :allowFiltering="false"
                field="Commands"
                headerText="Action"
                width="120"
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
                :allowEditing="false"
                field="Kode"
                headerText="Kode Customers"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                field="Nama"
                :allowFiltering="false"
                headerText="Nama Customers"
                width="180"
              ></e-column>

              <!-- <e-column
                  field='BadanHukum'
                  :allowEditing="false"
                  headerText='Badan Hukum'
                  :customAttributes="customAttributes"
                  width=180
                  :dataSource="colData"
              ></e-column> -->

              <e-column
                field="BadanHukum"
                headerText="Badan Hukum"
                width="180"
                :dataSource="colData"
              ></e-column>

              <e-column
                field="Alamat"
                :allowFiltering="false"
                headerText="Alamat "
                width="180"
              ></e-column>

              <e-column
                field="Kota"
                :allowEditing="false"
                headerText="Kota "
                width="180"
                :dataSource="colDataKota"
              ></e-column>

              <e-column
                :allowEditing="false"
                field="KodePos"
                headerText="Kode POs"
                width="180"
              ></e-column>

              <e-column
                field="Negara"
                :allowEditing="false"
                headerText="Negara"
                width="180"
              ></e-column>

              <e-column
                :allowEditing="false"
                field="Telp"
                headerText="Telp"
                width="180"
              ></e-column>

              <e-column
                field="Fax"
                :allowEditing="false"
                headerText="Fax"
                width="180"
              ></e-column>

              <e-column
                field="Email"
                :allowEditing="false"
                headerText="Email Customers"
                width="180"
              ></e-column>

              <e-column
                field="ContactPerson"
                :allowEditing="false"
                headerText="Contact Person"
                width="180"
              ></e-column>

              <e-column
                field="Salesperson"
                :allowEditing="false"
                headerText="Sales Person"
                width="180"
              ></e-column>

              <e-column
                field="GrupPelanggan"
                :allowEditing="false"
                headerText="Grup Pelanggan"
                width="180"
              ></e-column>

              <e-column
                field="Aktif"
                :allowFiltering="false"
                :allowEditing="false"
                displayAsCheckBox="true"
                headerText="Aktif"
                width="180"
              ></e-column>

              <e-column
                field="KreditLimit"
                :allowEditing="false"
                headerText="Kredit Limit"
                width="180"
              ></e-column>

              <e-column
                field="LamaKredit"
                :allowEditing="false"
                headerText="Lama Kredit"
                width="180"
              ></e-column>

              <e-column
                field="CustSince"
                :allowEditing="false"
                headerText="CustSince"
                width="180"
              ></e-column>

              <e-column
                field="Memo"
                :allowEditing="false"
                headerText="Memo"
                width="180"
              ></e-column>

              <e-column
                field="Asuransi"
                :allowEditing="false"
                headerText="Asuransi"
                width="180"
              ></e-column>

              <e-column
                field="DiBuatTgl"
                :allowEditing="false"
                headerText="Di Buat Tanggal"
                width="180"
              ></e-column>

              <e-column
                field="DiBuatOleh"
                :allowEditing="false"
                headerText="Di Buat Oleh"
                width="180"
              ></e-column>

              <e-column
                field="DiUbahTgl"
                :allowEditing="false"
                headerText="Di Ubah Tanggal"
                width="180"
              ></e-column>

              <e-column
                field="DiUbahOleh"
                :allowEditing="false"
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { AutoCompletePlugin } from "@syncfusion/ej2-vue-dropdowns";
import { DataManager, Query, JsonAdaptor } from "@syncfusion/ej2-data";
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

// import { OrderService } from "../services/pagination.ts";
Vue.use(GridPlugin);
Vue.use(AutoCompletePlugin);
export default {
  components: {
    Loading,
  },
  data() {
    // let SERVICE_URI = "http://localhost:8000/api/customers?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMjM1ODU3NSwiZXhwIjoxNjMyMzkwOTc1LCJuYmYiOjE2MzIzNTg1NzUsImp0aSI6InZHT0ZGR0pBRmsyVUkzcXIiLCJzdWIiOjcsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.sjdISkk7TkAEmyxvBCB0d0YmHw5LX-i8GtCYZs5p8yE&page=1";
    return {
      alert: "",
      pesan: "",
      ScrollKeAtas: false,
      mobile: null,
      windowSize: { x: 0, y: 0 },
      // orderService: new OrderService(),
      customAttributes: { class: "customcss" },
      dialogAsuransi: false,
      dialogBillTo: false,
      dialogSellTo: false,
      BatalEdit: null,
      colData: [],
      colDataKota: [],
      Grup: [],
      namaGrup: [],
      action: null,
      btn_tambah: true,
      fullPage: true,
      isLoading: false,
      waterMarkAs: "Asuransi",
      waterMark: "Kota",
      waterMarkNegara: "Negara",
      city: null,
      asuransi: [],
      MenuTanggal: false,
      SelectKota: [],
      SelectNegara: [],
      toggle: false,
      alldata: [],
      resultKota: [],
      kota: "",
      negara: "",
      date: new Date().toISOString().substr(0, 10),
      itemsBadanHukum: ["PT", "CV", "UD", "-"],
      editedIndex: -1,
      defaultItem: {
        Kode: "",
        Nama: "",
        BadanHukum: "",
        Alamat: "",
        Kota: "",
        KodePos: "",
        Negara: "",
        Telp: "",
        Fax: "",
        Email: "",
        ContactPerson: "",
        SalesPerson: "UNDEFINED",
        GrupPelanggan: "UNDEFINED",
        Aktif: true,
        KreditLimit: 0,
        LamaKredit: 0,
        CustSince: "",
        Memo: "",
        Asuransi: null,
        BillTo: null,
        SellTo: null,
      },
      editedItem: {
        Kode: "",
        Nama: "",
        BadanHukum: "",
        Alamat: "",
        Kota: "",
        KodePos: "",
        Negara: "",
        Telp: "",
        Fax: "",
        Email: "",
        ContactPerson: "",
        SalesPerson: "UNDEFINED",
        GrupPelanggan: "UNDEFINED",
        Aktif: true,
        KreditLimit: 0,
        LamaKredit: 0,
        CustSince: "",
        Memo: "",
        Asuransi: null,
        BillTo: null,
        SellTo: null,
      },
      query: null,
      dialog: false,
      token: localStorage.getItem("token"),
      data: {},
      firstSearch: false,
      sorted: null,
      filter: null,
      commands: [],
      DataFilterSearc: [],
      groupSettings: { allowReordering: true },
      selectionOptions: { type: "Multiple" },
      toolbarOptions: ["Search"],
      pageSettings: {
        // pageCount: 44,
        pageSize: 100,
        pageSizes: ["20", "50", "100"],
      },
      skip: 0,
      take: 100,
      filterOptions: { type: "CheckBox" },
      // filter: { type : 'CheckBox' },
      editSettings: {
        showDeleteConfirmDialog: true,
        allowEditing: false,
        allowAdding: true,
        allowDeleting: true,
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
      this.autoTanggal();
      this.getDataPage(0, 100);
      // this.getData()
      // let state = { skip: 0, take: 40 };
      // this.dataStateChange(state);
      this.countKode();
      this.getKota();
      this.getGrup();
      this.getAsuransi();
    }
    if (this.action.some((a) => a == "C")) {
      this.btn_tambah = false;
    }
    if (this.action.some((a) => a == "U")) {
      this.commands.push(
        {
          title: "Edit",
          buttonOption: { cssClass: "e-flat Edit", iconCss: "e-edit e-icons" },
        }
        // { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
        // { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' }}
      );
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
    // console.log('data',this.data)
    // get actions for this page
    // this.getDataPage(1)
    this.action = Object.assign(
      [],
      this.$route.params.action
        .replaceAll('"', "")
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll(",", "")
    );
    // new DataManager({ url: "http://localhost:8000/api/customers", adaptor: new ODataAdaptor })
    // .executeQuery(new Query().addParams('token', this.token)).then((e) => {
    //     let items = e.result;
    //     console.log('ODataAdap',items)
    //     let dt = {
    //             Items: items.data,
    //             Count: items.total
    //         }
    //     console.log('dt',dt)
    //     this.data = e.result
    //     console.log('data',this.data)
    //         console.log(this.$refs.ggs)
    // });
  },

  watch: {
    "editedItem.Nama": function (params) {
      if (params == "") {
        this.pesan = "Nama Pelanggan tidak boleh kosong";
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

    // dialog(val) {
    //     val || this.close();
    // },
    // data:{
    //     handler(){
    //         this.countKode()
    //     }
    // },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Customer" : "Ubah Customer";
    },
  },
  methods: {
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
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

    rowSelectedAsuransi: function (args) {
      this.editedItem.Asuransi = args.rowData.Nama;
      this.dialogAsuransi = false;
    },
    rowSelectedBillTo: function (args) {
      this.editedItem.BillTo = args.rowData.Nama;
      this.dialogBillTo = false;
    },
    rowSelectedSellTo: function (args) {
      this.editedItem.SellTo = args.rowData.Nama;
      this.dialogSellTo = false;
    },
    rowDataBound: function (args) {
      if (args.data.Aktif == "0") {
        args.row.classList.add("not-active");
        // args.row.classList.add('edit-batal')
        // args.row.classList.add('hapus-batal')
      }
    },
    // async actionHandler(args){
    // console.log('begin',args)
    // var objDistinct = {}
    // if (Object.keys(args.filterModel.existingPredicate).length != 0) {
    //     Object.keys(args.filterModel.existingPredicate).forEach(element => {
    //         objDistinct[element] = args.filterModel.existingPredicate[element].map(item => (item.value))
    //     });
    // }
    // this.query = args.columnName
    // if (args.requestType === 'filterbeforeopen') {
    //     // this.$refs.ggs.clearFiltering()
    //     this.$refs.ggs.refreshColumns();
    //     await api.get('customers?token='+this.token+'&dist='+this.query).then(
    //         res => {
    //             console.log(res)
    //             localStorage.setItem('ds',JSON.stringify(res.data.result))
    //         },
    //         err => {
    //             console.log(err)
    //         }
    //     )
    // }
    // },
    filterByValue(array, string) {
      return array.filter((o) =>
        Object.keys(o).some((k) =>
          o[k] != null || o[k] != undefined
            ? o[k].toLowerCase().includes(string.toLowerCase())
            : ""
        )
      );
    },
    dataStateChange: function (state) {
      // console.log('awalState',state)
      // console.log(this.$refs.ggs)
      if (state.action.requestType === "paging") {
        // console.log('dipaging',state.search)
        this.skip = state.skip;
        this.take = state.take;
        if (state.search != undefined) {
          api
            .get(
              "customers?token=" +
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
        // console.log(state)
        this.$refs.ggs.clearFiltering();
        this.sorted =
          state.sorted == undefined
            ? undefined
            : state.sorted.length > 1
            ? state.sorted.map((element) => {
                return element.name + " " + element.direction;
              })
            : state.sorted[0].name + " " + state.sorted[0].direction;
        console.log(this.sorted);
        if (state.sorted != undefined && state.sorted.length > 1) {
          this.sorted = new URLSearchParams({ st: this.sorted }).toString();
        }
        // console.log(this.sorted)
        this.getDataPage(state.skip, state.take, this.sorted);
        this.query = null;
        this.filter = null;
      }
      if (state.action.requestType === "filterchoicerequest") {
        // console.log(Object.keys(state.action.filterModel.existingPredicate))
        var objDistinct = {};
        // if (Object.keys(state.action.filterModel.existingPredicate).length != 0) {
        //     Object.keys(state.action.filterModel.existingPredicate).forEach(element => {
        //         // console.log(state.action.filterModel.existingPredicate[element])
        //         objDistinct[element] = state.action.filterModel.existingPredicate[element].map(item => (item.value))
        //     });
        //     console.log('objDistinct',objDistinct)
        //     // objDistinct['Kota'] = ["Samarinda","Balikpapan"]
        // //     api.get('customers?token='+this.token+'&dist='+state.action.query.distincts.at(-1)+';'+new URLSearchParams(objDistinct).toString()).then(
        // //     res => {
        //     //         state.dataSource(res.data.result)
        // //         localStorage.setItem('ds',JSON.stringify(res.data.result))
        // //     }
        // // );
        // }
        // // console.log(this.getDataPage(undefined,undefined,undefined,state.action.query.distincts[0]))
        // if (this.DataFilterSearc.length != 0) {
        //     state.dataSource(this.DataFilterSearc)
        // }
        // console.log(new URLSearchParams(objDistinct).toString())
        // console.log('sax',state.action.query.distincts)
        let queryString =
          state.action.query.distincts.length > 1
            ? state.action.query.distincts.at(-1) +
              ";" +
              new URLSearchParams(objDistinct).toString()
            : state.action.query.distincts[0];
        // console.log(queryString)
        // this.query = queryString
        if (this.query != null) {
          queryString = queryString + ";" + this.query;
        }
        // console.log('quer',this.query)
        api
          .get("customers?token=" + this.token + "&dist=" + queryString)
          .then((res) => {
            // state.action.filterModel.filteredData =  res.data.result.map(element => {
            //     return {
            //         dataObj : element,
            //         Kota : element.Kota,
            //         ejValue: element.Kota
            //     }
            // });

            state.dataSource(res.data.result);
            localStorage.setItem("ds", JSON.stringify(res.data.result));
            //         // console.log(typeof(res.data.result))
          });
        // this.filterOptions = [...this.filterOptions]
      }

      if (state.action.requestType === "filtersearchbegin") {
        // console.log('disini')
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
      // let dataFilter = null
      if (
        state.action.requestType === "filtering" &&
        state.action.action !== "clear-filter"
      ) {
        // console.log('disini')
        // dataFilter = null
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
        // console.log('si filter baru',filter)
        let url = new URLSearchParams(filter).toString();
        this.query = this.query != null ? this.query + ";" + url : url;
        if (this.filter != null && this.filter.includes(prop)) {
          let jadiArr = this.filter.split(";");
          // console.log(typeof(jadiArr))
          // console.log(jadiArr)
          jadiArr.forEach(function (element, index, array) {
            if (element.includes(prop)) {
              // console.log('sama',element)
              // console.log('yg baru', url)
              array[index] = url;
              // console.log('ganti baru',element)
              // console.log('ganti baru',array[index])
            }
          });
          // console.log('apakah ganti',jadiArr)
          // console.log('newParameter',jadiArr.toString())
          // console.log('ganti jadi ;',jadiArr.toString().replaceAll(',',';'))
          this.filter = jadiArr.toString().replaceAll(",", ";");
        } else {
          this.filter = this.filter != null ? this.filter + ";" + url : url;
        }
        // console.log('filter',url)
        // console.log('queryFilter',this.filter)
        // console.log('Url To OBJECT',Object.fromEntries(new URLSearchParams(this.filter)))
        // console.log('total ;',(this.filter.match(/;/g) || []).length)
        // console.log('ambil string sebelum ;',this.filter.split(';'))
        // console.log('ambil string habis ;',this.filter.split(';').pop())
        this.getDataPage(state.skip, state.take, undefined, this.filter);
        // api.get('customers?token='+this.token+'&filter='+this.filter+'&skip='+state.skip+'&take='+state.take).then(
        //     res => {
        //         dataFilter = res.data
        //         console.log('dataFilter',dataFilter)
        //         if (state.action.action === "filter") {
        //             // state.rows = dataFilter.result
        //             // state.action.rows = dataFilter.result
        //             // console.log('fit',state)
        //             this.data = res.data
        //         }
        //         // state.dataSource = res.data.result
        //         // state.rows = res.data.result
        //         // localStorage.setItem('ds',JSON.stringify(res.data.result))
        //         // console.log(typeof(res.data.result))
        //     }
        // )
        this.$refs.ggs.clearFiltering();
      }
      // if (state.action.action === "filter") {
      //     console.log('filter',dataFilter)
      // }
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
        // console.log('yang dicari dia', state.action.searchString)
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
              "customers?token=" +
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
          // state.action.currentPage = 1
          // api.get('customers?token='+this.token+'&search='+state.action.searchString+'&skip='+0+'&take='+100).then(
          //     res => {
          //         this.data = res.data
          //     }
          // );
          this.$refs.ggs.$el.ej2_instances[0].pageSettings.currentPage = 1;
        }
      }
      // if (state.action.requestType == 'refresh') {
      //     state.skip = 0
      //     state.take = 100
      //     state.action.currentPage = 1
      //     state.action.currentPage = 1
      // }
      // Handled the other Grid actions like paging, sorting etc.. by using dataState change event
      // this.orderService.execute(state).then(gridData => {
      //     this.data = gridData;
      // });
    },
    getBool(x) {
      if (x == 1) {
        x = "true";
      } else {
        x = "false";
      }
      return !!String(x).toLowerCase().replace(!!0, "");
    },
    GetUniqueTablesCategory() {
      for (let i = 0; i < this.data.length; i++) {
        if (this.asuransi.indexOf(this.data[i].Nama) === -1) {
          this.asuransi.push(this.data[i].Nama);
        }
      }
    },
    autoTanggal() {
      this.editedItem.CustSince = this.date;
    },
    save() {
      if (this.editedIndex == -1) {
        if (this.editedItem.Nama == "") {
          this.alert = true;
          this.pesan = "Nama Pelanggan tidak boleh kosong";
        } else if (this.editedItem.Telp == "") {
          this.alert = true;
          this.pesan = "Nomer Telp tidak boleh kosong";
        } else {
          this.TambahData();
        }
      } else {
        if (this.editedItem.Nama == "") {
          this.alert = true;
          this.pesan = "Nama Pelanggan tidak boleh kosong";
        } else if (this.editedItem.Telp == "") {
          this.alert = true;
          this.pesan = "Nomer Telp tidak boleh kosong";
        } else {
          this.UpdateData();
        }
      }
    },

    UpdateData() {
      this.$refs.ggs.ej2Instances.searchSettings.key = "";
      this.isLoading = true;
      let grup = this.Grup.find((x) => x.Nama == this.editedItem.GrupPelanggan);
      // let asuransi = this.asuransi.find(
      //   (d) => d.Nama == this.editedItem.Asuransi
      // );
      let BillTo = this.asuransi.find((d) => d.Nama == this.editedItem.BillTo);
      let SellTo = this.asuransi.find((d) => d.Nama == this.editedItem.SellTo);
      api
        .put("/customers/" + this.editedItem.id + "?token=" + this.token, {
          Kode: this.editedItem.Kode,
          Nama: this.editedItem.Nama,
          BadanHukum: this.editedItem.BadanHukum,
          Alamat: this.editedItem.Alamat,
          Kota: this.kota,
          KodePos: this.editedItem.KodePos,
          Negara: this.negara,
          Telp: this.editedItem.Telp,
          Fax: this.editedItem.Fax,
          Email: this.editedItem.Email,
          ContactPerson: this.editedItem.ContactPerson,
          // SalesPerson: this.editedItem.SalesPerson,
          GrupPelanggan: grup.Kode,
          Aktif: this.editedItem.Aktif,
          KreditLimit: this.editedItem.KreditLimit,
          LamaKredit: this.editedItem.LamaKredit,
          CustSince: this.editedItem.CustSince,
          Memo: this.editedItem.Memo,
          // Asuransi: asuransi.Kode,
          BillTo: BillTo.Kode,
          SellTo: SellTo.Kode,
        })
        .then((res) => {
          this.isLoading = false;
          this.id = "";
          console.log(res);
          this.getDataPage(this.skip, this.take);
          this.close();
          this.getAsuransi();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    TambahData() {
      this.isLoading = true;
      // console.log(this.editedItem.Kota)
      let grup = this.Grup.find((x) => x.Nama == this.editedItem.GrupPelanggan);
      // let asuransi = this.asuransi.find(
      //   (d) => d.Nama == this.editedItem.Asuransi
      // );
      let BillTo = this.asuransi.find((d) => d.Nama == this.editedItem.BillTo);
      let SellTo = this.asuransi.find((d) => d.Nama == this.editedItem.SellTo);
      // console.log(asuransi);
      api
        .post("/customers?token=" + this.token, {
          Kode: this.editedItem.Kode,
          Nama: this.editedItem.Nama,
          BadanHukum: this.editedItem.BadanHukum,
          Alamat: this.editedItem.Alamat,
          Kota: this.kota,
          KodePos: this.editedItem.KodePos,
          Negara: this.negara,
          Telp: this.editedItem.Telp,
          Fax: this.editedItem.Fax,
          Email: this.editedItem.Email,
          ContactPerson: this.editedItem.ContactPerson,
          // SalesPerson: this.editedItem.SalesPerson,
          GrupPelanggan: grup.Kode,
          Aktif: this.editedItem.Aktif,
          KreditLimit: this.editedItem.KreditLimit,
          LamaKredit: this.editedItem.LamaKredit,
          CustSince: this.editedItem.CustSince,
          Memo: this.editedItem.Memo,
          // Asuransi: asuransi == undefined ? "" : asuransi.Kode,
          BillTo: BillTo == undefined ? "" : BillTo.Kode,
          SellTo: SellTo == undefined ? "" : SellTo.Kode,
        })
        .then((res) => {
          this.isLoading = false;
          this.Nama = "";
          this.BadanHukum = "";
          this.Alamat = "";
          this.Kota = "";
          this.KodePos = "";
          this.Negara = "";
          this.Telp = "";
          this.Fax = "";
          this.Email = "";
          this.ContactPerson = "";
          this.SalesPerson = "";
          this.GrupPelanggan = "";
          this.Aktif = "";
          this.KreditLimit = "";
          this.LamaKredit = "";
          this.CustSince = "";
          this.Memo = "";
          this.Asuransi = "";
          console.log(res);
          this.getDataPage(this.skip, this.take);
          this.close();
          this.getAsuransi();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    close() {
      this.autoTanggal();
      this.kota = "";
      this.negara = "";
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      // if (this.BatalEdit != null && this.editedItem.Kode != '') {
      //     this.data.result.find(d=> d.Kode == this.BatalEdit.Kode).GrupPelanggan = this.Grup.find(x=> x.Nama == this.BatalEdit.GrupPelanggan).Kode
      //     this.data.result.find(d=> d.Kode == this.BatalEdit.Kode).Asuransi = this.asuransi.find(x=> x.Nama == this.BatalEdit.Asuransi).Kode
      // }
      this.editedItem = this.defaultItem;
      this.dialog = false;
      this.alert = false;
      this.resultKota = [];
      this.editedIndex = -1;
      this.countKode();
    },

    commandClick: function (args) {
      if (args.target.classList.contains("custombutton")) {
        // let data = JSON.stringify(args.rowData)
        // console.log(data)
      } else if (args.target.classList.contains("Delete")) {
        var r = confirm("Yakin Hapus Data?");
        if (r == true) {
          api
            .delete("/customers/" + args.rowData.id + "?token=" + this.token)
            .then((res) => {
              console.log(res);
              this.getDataPage(this.skip, this.take);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else if (args.target.classList.contains("Edit")) {
        // console.log(args)
        this.editedIndex = 1;
        this.kota = args.rowData.Kota;
        this.negara = args.rowData.Negara;
        // this.editedItem = args.rowData
        // this.BatalEdit = args.rowData
        this.editedItem.id = args.rowData.id;
        this.editedItem.Kode = args.rowData.Kode;
        this.editedItem.Nama = args.rowData.Nama;
        this.editedItem.BadanHukum = args.rowData.BadanHukum;
        this.editedItem.Alamat = args.rowData.Alamat;
        this.editedItem.Kota = args.rowData.Kota;
        this.editedItem.KodePos = args.rowData.KodePos;
        this.editedItem.Negara = args.rowData.Negara;
        this.editedItem.Telp = args.rowData.Telp;
        this.editedItem.Fax = args.rowData.Fax;
        this.editedItem.Email = args.rowData.Email;
        this.editedItem.ContactPerson = args.rowData.ContactPerson;
        this.editedItem.SalesPerson = args.rowData.SalesPerson;
        this.editedItem.GrupPelanggan = args.rowData.GrupPelanggan;
        this.editedItem.Aktif = args.rowData.Aktif;
        this.editedItem.KreditLimit = args.rowData.KreditLimit;
        this.editedItem.LamaKredit = args.rowData.LamaKredit;
        this.editedItem.CustSince = args.rowData.CustSince;
        this.editedItem.Memo = args.rowData.Memo;
        this.editedItem.Asuransi = args.rowData.Asuransi;
        this.editedItem.BillTo = args.rowData.BillTo;
        this.editedItem.SellTo = args.rowData.SellTo;
        let grup = this.Grup.find((x) => x.Kode == args.rowData.GrupPelanggan);
        // let asuransi = this.asuransi.find(
        //   (d) => d.Kode == args.rowData.Asuransi
        // );
        let BillTo = this.asuransi.find((d) => d.Kode == args.rowData.BillTo);
        let SellTo = this.asuransi.find((d) => d.Kode == args.rowData.SellTo);
        this.editedItem.GrupPelanggan = grup.Nama;
        // this.editedItem.Asuransi = asuransi.Nama;
        this.editedItem.BillTo = BillTo.Nama;
        this.editedItem.SellTo = SellTo.Nama;
        this.dialog = true;
      }
    },

    actionBegin(args) {
      // console.log('begin',args)
      // console.log('ref',this.$refs.ggs)
      // args.canelEdit()
      // this.$refs.ggs.endEdit()
      if (args.requestType == "save") {
        // console.log('old',args.previousData)
        // console.log('new',args.data)
        console.log(
          "perubahan",
          JSON.stringify(args.previousData) === JSON.stringify(args.data)
        );
        if (JSON.stringify(args.previousData) === JSON.stringify(args.data)) {
          this.$refs.ggs.closeEdit();
          // args.cancel = true
        } else {
          for (const key in args.previousData) {
            if (args.previousData[key] != args.data[key]) {
              var conf = confirm(
                `ganti data ${key} lama ${args.previousData[key]} menjadi ${key} baru ${args.data[key]}`
              );
              // console.log(`ganti data ${key} lama ${args.previousData[key]} menjadi ${key} baru ${args.data[key]}`)
              // args.endEdit()
              if (conf == true) {
                console.log("request put endpoint");
              } else {
                this.$refs.ggs.closeEdit();
              }
            }
          }
        }
      }
    },

    cellEdit(args) {
      console.log(args);
    },

    actioncomplete(args) {
      // console.log('actioncomplet',args)
      if (
        args.requestType == "refresh" &&
        !args.rows &&
        this.alldata.length != 0
      ) {
        let items = new DataManager({
          json: this.alldata,
          adaptor: new JsonAdaptor(),
        }).executeLocal(new Query().skip(0));
        this.data = items;
        this.GetUniqueTablesCategory();
      }
    },

    getDataPage(skip, take, sort, filter) {
      // this.isLoading = true
      api
        .get(
          "customers?token=" +
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
            // this.pageSettings.pageSizes = true
            // this.pageSettings.pageSize = 100
            // this.pageSettings.pageCount = Math.ceil(res.data.count / 100)
            // console.log(this.pageSettings)
            // if (filter != undefined) {
            //     return res.data
            // }
            // console.log(res)
            let dataCust = {};
            dataCust.count = res.data.count;
            dataCust.result = res.data.result.map((d) => {
              d.Aktif = d.Aktif === "1";
              return d;
            });
            this.data = dataCust;
            // console.log(document.getElementById("Grid").ej2_instances[0])
            // this.$refs.ggs.refresh()
            // console.log(this.$refs.ggs)
            // this.$refs.ggs.dataSource = res.data.result
            // console.log(this.$refs.ggs)
            // this.isLoading = false
          },
          (err) => {
            console.log(err);
          }
        );
    },

    getData() {
      this.isLoading = true;
      api
        .get("/customers", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then(
          (res) => {
            let x = [];

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
            this.isLoading = false;
          },
          (err) => {
            console.log(err);
            this.$router.push("/");
            localStorage.removeItem("token");
          }
        );
    },

    getKota() {
      api
        .get("/search", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then(
          (res) => {
            this.SelectKota = res.data.kota;
            this.SelectNegara = res.data.negara;
          },
          (err) => {
            console.log(err);
          }
        );
    },

    getGrup() {
      api.get("grup-customers?token=" + this.token).then((res) => {
        this.Grup = res.data;
        this.namaGrup = this.Grup.map((x) => x.Nama);
      });
    },

    getAsuransi() {
      api.get("asuransi?token=" + this.token).then((res) => {
        this.asuransi = res.data.data.filter((p) => p.Aktif == "1");
      });
    },

    countKode() {
      const PT = "01";
      let cabang = "01";
      let x = "0000";
      let spacer = "/";
      let x0 = 1;
      let s0 = [];
      let totalKode = [];
      let hitungan = [];
      // console.log(PT)
      if (this.data.length > 0) {
        for (let index = 0; index < this.data.length; index++) {
          const element = this.data[index];
          s0.push(element);
          totalKode.push(s0[index].Kode);
          // totalKode.sort(function(a, b){return b-a})
          hitungan = parseInt(s0.length - 1);
        }
        let xsx = totalKode[hitungan];
        let xsx1 = xsx.slice(5, 9);
        let xsx2 = xsx1.replace(/^0+/, "");
        let desc = parseInt(xsx2) + 1;
        let r0 = (x + desc).slice(-x.length);
        this.editedItem.Kode = PT + cabang + spacer + r0;
      } else if (this.data.length == 0) {
        // console.log(PT)
        let yuklah = (x + x0).slice(-x.length);
        this.editedItem.Kode = PT + cabang + spacer + yuklah;
      }
    },
  },
};
</script>

<style>
/* @import "../node_modules/@syncfusion/ej2-vue-grids/styles/material.css"; */
.e-grid .e-rowcell.customcss {
  background-color: goldenrod;
}
/* .e-grid .e-row.not-active .e-rowcell {
    background-color: grey;
    color: whitesmoke;
    font-weight: bold;
} */
.e-float-input.e-control-wrapper.e-input-group:not(.e-float-icon-left)
  .e-float-line::after {
  background: #1976d2;
}

.e-float-input.e-control-wrapper.e-input-group:not(.e-float-icon-left)
  .e-float-line::before {
  background: #1976d2;
}
.e-float-input.e-control-wrapper:not(.e-error).e-input-focus
  input
  ~ label.e-float-text {
  color: #1976d2;
  /* caret-color: #1976D2 im !important; */
}

label.e-float-text,
.e-float-input label.e-float-text,
.e-float-input.e-control-wrapper label.e-float-text,
.e-float-input:not(.e-input-focus)
  input:not(:focus):valid
  ~ label.e-float-text.e-label-bottom,
.e-float-input.e-control-wrapper:not(.e-input-focus)
  input:not(:focus):valid
  ~ label.e-float-text.e-label-bottom {
  font-size: 16px;
}
.e-grid .e-groupdroparea.e-grouped {
  background-color: rgb(25, 118, 210);
}
.e-grid .e-groupheadercell {
  background-color: rgb(29, 79, 129);
}
</style>
/* eslint-disable */
