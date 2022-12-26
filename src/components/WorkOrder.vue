<template>
  <div v-resize="onResize">
    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
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
            <v-btn text @click="getDataWo(tanggal_awal, tanggal_akhir)"
              >Ok</v-btn
            >
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <v-dialog
      v-model="dialog_TanggalMasukKeluar"
      transition="dialog-top-transition"
      max-width="400"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>Choose Date</v-toolbar>
          <v-card-text>
            <v-container>
              <v-menu
                v-model="MenuTanggalMasuk"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    dense
                    v-model="tanggalMasuk"
                    label="Tanggal Masuk"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="tanggalMasuk"
                  @input="MenuTanggalMasuk = false"
                  color="blue darken-4"
                  locale="id"
                ></v-date-picker>
              </v-menu>
              <v-menu
                v-model="MenuTanggalKeluar"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    dense
                    v-model="TanggalKeluar"
                    label="Tanggal Keluar"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="TanggalKeluar"
                  @input="MenuTanggalKeluar = false"
                  color="blue darken-4"
                  locale="id"
                ></v-date-picker>
              </v-menu>
            </v-container>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
            <v-btn
              text
              @click="updateTanggalMasukKeluar(tanggalMasuk, TanggalKeluar)"
              >Ok</v-btn
            >
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <v-dialog
      v-model="dialog_TanggalKeluarFisik"
      transition="dialog-top-transition"
      max-width="400"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>Choose Date</v-toolbar>
          <v-card-text>
            <v-container>
              <v-menu
                v-model="MenuTanggalKeluarFisik"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    dense
                    v-model="TanggalKeluarFisik"
                    label="Tanggal Keluar Fisik"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="TanggalKeluarFisik"
                  @input="MenuTanggalKeluarFisik = false"
                  color="blue darken-4"
                  locale="id"
                ></v-date-picker>
              </v-menu>
            </v-container>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
            <v-btn text @click="updateTanggalKeluarFisik(TanggalKeluarFisik)"
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
            <strong>{{ $t("JO.MainTitle") }}</strong>
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
            {{ $t("JO.MainTitle") }}
          </v-toolbar-title>
          <v-icon
            large
            :disabled="btn_datagrid"
            @click="dialog_periode = true"
            dark
          >
            mdi-calendar-range
          </v-icon>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" scrollable persistent max-width="900px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="blue darken-4"
                dark
                v-bind="attrs"
                v-on="on"
                class="mx-2"
                :disabled="btn_tambah"
                medium
              >
                <v-icon left>mdi-plus-thick</v-icon>
                {{ $t("All.BtnTambah") }}
              </v-btn>
            </template>
            <v-card>
              <v-toolbar dark outline color="blue darken-4" class="elevation-0">
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
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        :disabled="true"
                        v-model="editedItem.KodeNota"
                        label="Kode Nota"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="6" md="6">
                                      <v-text-field
                                          v-model="editedItem.NomorMesin"
                                          label="Nomor Mesin"
                                          :maxlength=50
                                      ></v-text-field>
                                  </v-col> -->
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
                    <!-- <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                      :maxlength=100
                                      v-model="editedItem.NomorPolisi"
                                      label="Nomor Polisi"
                                  ></v-text-field>
                                  </v-col> -->
                    <v-col cols="12" sm="6" md="6">
                      <!-- <v-text-field
                                      :maxlength=100
                                      v-model="editedItem.JenisWorkOrder"
                                      label="Jenis Work Order"
                                  ></v-text-field> -->
                      <v-combobox
                        :items="[
                          'Konstruksi Gedung',
                          'Konstruksi Jalan',
                          'Konstruksi Bangunan Air',
                          'Rental',
                        ]"
                        v-model="editedItem.JenisWorkOrder"
                        label="Jenis Work Order"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        :maxlength="100"
                        v-model="editedItem.Odometer"
                        @keypress="isNumber($event)"
                        label="Odometer"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-combobox
                        :items="[
                          'HO',
                          'BERAU',
                          'PALEMBANG',
                          'SUNGAI DANAU',
                          'TABANG',
                          'MOROWALI',
                          'PALU',
                        ]"
                        v-model="editedItem.Lokasi"
                        label="Lokasi"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        :maxlength="100"
                        v-model="editedItem.PaymentTerm"
                        @keypress="isNumber($event)"
                        label="Payment Term"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.Pelanggan"
                        readonly
                        label="Pelanggan ( Piutang )"
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
                                      ref="asuransi"
                                      :pageSettings="pageSettings"
                                      :dataSource="asuransi"
                                      height="200"
                                      width="100%"
                                      gridLines="Both"
                                      :allowResizing="true"
                                      :allowPaging="true"
                                      :toolbar="toolbarOptionsSub"
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
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.Unit"
                        readonly
                        label="Unit"
                      >
                        <template v-slot:append>
                          <v-dialog
                            v-model="dialogUnit"
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
                                  @click="dialogUnit = false"
                                >
                                  <v-icon class="mx-1">mdi-window-close</v-icon>
                                </v-btn>
                              </v-toolbar>
                              <v-card flat>
                                <v-col cols="12" md="12">
                                  <v-card>
                                    <ejs-grid
                                      ref="Unit"
                                      :pageSettings="pageSettings"
                                      :dataSource="Unit"
                                      height="200"
                                      width="100%"
                                      gridLines="Both"
                                      :allowResizing="true"
                                      :allowPaging="true"
                                      :toolbar="toolbarOptionsSub"
                                      :recordDoubleClick="rowSelectedUnit"
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
                                          field="SerialNumber"
                                          headerText="Serial Number"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="Brand"
                                          headerText="Brand"
                                          width="150"
                                        ></e-column>
                                        <e-column
                                          field="Type"
                                          headerText="Type"
                                          width="150"
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
                        v-model="editedItem.MataUang"
                        readonly
                        label="Mata Uang"
                      >
                        <template v-slot:append>
                          <v-dialog
                            v-model="dialogMataUang"
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
                                  @click="dialogMataUang = false"
                                >
                                  <v-icon class="mx-1">mdi-window-close</v-icon>
                                </v-btn>
                              </v-toolbar>
                              <v-card flat>
                                <v-col cols="12" md="12">
                                  <v-card>
                                    <ejs-grid
                                      :pageSettings="pageSettings"
                                      :dataSource="DataMataUang"
                                      height="200"
                                      width="100%"
                                      gridLines="Both"
                                      :allowResizing="true"
                                      :allowPaging="true"
                                      :toolbar="toolbarOptionsSub"
                                      :recordDoubleClick="rowSelectedMataUang"
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
                                          field="Aktif"
                                          headerText="Aktif"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="DiBuatOleh"
                                          headerText="DiBuatOleh"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="DiBuatTgl"
                                          headerText="DiBuatTgl"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="DiUbahOleh"
                                          headerText="DiUbahOleh"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="DiUbahTgl"
                                          headerText="DiUbahTgl"
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
                    <!-- <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                      v-model="editedItem.Pemilik"
                                      readonly
                                      label="Pemilik"
                                  >
                                      <template v-slot:append>
                                          <v-dialog v-model="dialogPemilik" scrollable max-width="900px" persistent>
                                              <template v-slot:activator="{on, attrs}">
                                              <v-btn
                                                  dark
                                                  small
                                                  class="mt-n2"
                                                  color="blue darken-4"
                                                  v-bind="attrs"
                                                  v-on="on" >
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
                                                      @click="dialogPemilik = false">
                                                      <v-icon class="mx-1">mdi-window-close</v-icon>
                                                      </v-btn>
                                                  </v-toolbar>                        
                                                  <v-card flat>
                                                      <v-col cols="12" md="12">
                                                      <v-card>
                                                          <ejs-grid
                                                          :pageSettings='pageSettings'
                                                          :dataSource="pemilik" height="200" width="100%" gridLines='Both'
                                                          :allowResizing='true'
                                                          :allowPaging='true'
                                                          :toolbar='toolbarOptionsSub'
                                                          :recordDoubleClick="rowSelectedPemilik"
                                                          >
                                                              <e-columns>
                                                                  <e-column
                                                                  field='Kode'
                                                                  headerText='Kode'
                                                                  textAlign='Left'
                                                                  width=180
                                                                  ></e-column>
                                                                  <e-column
                                                                  field='Nama'
                                                                  headerText='Nama'
                                                                  width=180
                                                                  ></e-column>
                                                                  <e-column
                                                                  field='BadanHukum'
                                                                  headerText='Badan Hukum'
                                                                  width=180
                                                                  ></e-column>
                                                                  <e-column
                                                                  field='Kota'
                                                                  headerText='Kota'
                                                                  width=180
                                                                  ></e-column>
                                                                  <e-column
                                                                  field='Alamat'
                                                                  headerText='Alamat'
                                                                  width=180
                                                                  ></e-column>
                                                                  <e-column
                                                                  field='Telp'
                                                                  headerText='Telp'
                                                                  width=180
                                                                  ></e-column>
                                                                  <e-column
                                                                  field='ContactPerson'
                                                                  headerText='Contact Person'
                                                                  width=180
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
                        :maxlength="100"
                        v-model="editedItem.Kurs"
                        @keypress="isNumber($event)"
                        label="Kurs"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        :maxlength="100"
                        v-model="editedItem.ReserveOutcome"
                        @keypress="isNumber($event)"
                        label="Reserve Outcome"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        :maxlength="100"
                        v-model="editedItem.ReserveOutcomeJasa"
                        @keypress="isNumber($event)"
                        label="Reserve Outcome Jasa"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                      :maxlength=100
                                      v-model="editedItem.Lessor"
                                      label="Lessor"
                                  >
                                      <template v-slot:append>
                                          <v-dialog v-model="dialogLessor" scrollable max-width="900px" persistent>
                                              <template v-slot:activator="{on, attrs}">
                                              <v-btn
                                                  dark
                                                  small
                                                  class="mt-n2"
                                                  color="blue darken-4"
                                                  v-bind="attrs"
                                                  v-on="on" >
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
                                                      @click="dialogLessor = false">
                                                      <v-icon class="mx-1">mdi-window-close</v-icon>
                                                      </v-btn>
                                                  </v-toolbar>                        
                                                  <v-card flat>
                                                      <v-col cols="12" md="12">
                                                      <v-card>
                                                          <ejs-grid
                                                          :pageSettings='pageSettings'
                                                          :dataSource="lessor" height="200" width="100%" gridLines='Both'
                                                          :allowResizing='true'
                                                          :allowPaging='true'
                                                          :toolbar='toolbarOptionsSub'
                                                          :recordDoubleClick="rowSelectedLessor"
                                                          >
                                                              <e-columns>
                                                                  <e-column
                                                                  field='Kode'
                                                                  headerText='Kode'
                                                                  textAlign='Left'
                                                                  width=180
                                                                  ></e-column>
                                                                  <e-column
                                                                  field='Nama'
                                                                  headerText='Nama'
                                                                  width=180
                                                                  ></e-column>
                                                                  <e-column
                                                                  field='BadanHukum'
                                                                  headerText='Badan Hukum'
                                                                  width=180
                                                                  ></e-column>
                                                                  <e-column
                                                                  field='Kota'
                                                                  headerText='Kota'
                                                                  width=180
                                                                  ></e-column>
                                                                  <e-column
                                                                  field='Alamat'
                                                                  headerText='Alamat'
                                                                  width=180
                                                                  ></e-column>
                                                                  <e-column
                                                                  field='Telp'
                                                                  headerText='Telp'
                                                                  width=180
                                                                  ></e-column>
                                                                  <e-column
                                                                  field='ContactPerson'
                                                                  headerText='Contact Person'
                                                                  width=180
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
                        :maxlength="100"
                        v-model="editedItem.Referensi"
                        label="Referensi"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                      v-model="editedItem.NomorRangka"
                                      readonly
                                      label="Nomor Rangka"
                                  >
                                      <template v-slot:append>
                                          <v-dialog v-model="dialogNoRangka" scrollable max-width="900px" persistent>
                                              <template v-slot:activator="{on, attrs}">
                                              <v-btn
                                                  dark
                                                  small
                                                  class="mt-n2"
                                                  color="blue darken-4"
                                                  v-bind="attrs"
                                                  v-on="on" >
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
                                                      @click="dialogNoRangka = false">
                                                      <v-icon class="mx-1">mdi-window-close</v-icon>
                                                      </v-btn>
                                                  </v-toolbar>                        
                                                  <v-card flat>
                                                      <v-col cols="12" md="12">
                                                      <v-card>
                                                          <ejs-grid
                                                          :pageSettings='pageSettings'
                                                          :dataSource="DataRangka" height="200" width="100%" gridLines='Both'
                                                          :allowResizing='true'
                                                          :allowPaging='true'
                                                          :toolbar='toolbarOptionsSub'
                                                          :recordDoubleClick="rowSelectedNoRangka"
                                                          >
                                                              <e-columns>
                                                                  <e-column
                                                                  field='NomorRangka'
                                                                  headerText='Nomor Rangka'
                                                                  textAlign='Left'
                                                                  width=180
                                                                  ></e-column>
                                                                  <e-column
                                                                  field='NomorMesin'
                                                                  headerText='Nomor Mesin'
                                                                  width=180
                                                                  ></e-column>
                                                                  <e-column
                                                                  field='NomorPolisi'
                                                                  headerText='Nomor Polisi'
                                                                  width=180
                                                                  ></e-column>
                                                                  <e-column
                                                                  field='Kendaraan'
                                                                  headerText='Kendaraan'
                                                                  width=180
                                                                  ></e-column>
                                                                  <e-column
                                                                  field='Merk'
                                                                  headerText='Merk'
                                                                  width=180
                                                                  ></e-column>
                                                                  <e-column
                                                                  field='Pelanggan'
                                                                  headerText='Pelanggan'
                                                                  width=180
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

                    <!-- #Data Items Pembelian -->
                    <!-- <v-col cols="12">
                                      <v-card class="elevation-5" outlined>
                                          <v-tabs
                                          background-color="white"
                                          color="dark"
                                          slider-color="blue darken-4"
                                          >
                                          <v-tab>Keluhan</v-tab>
                                              <v-tab-item>
                                                  <keep-alive>
                                                      <Keluhan v-on:hapus_item="hps_items($event)" v-on:KeluhanDia="keluhan($event)" v-bind:ItemsKeluhan='ItemsKeluhan' :title="title"/>
                                                  </keep-alive>
                                              </v-tab-item>
                                          </v-tabs>
                                      </v-card>
                                  </v-col> -->

                    <v-col cols="12" sm="7" md="8">
                      <v-text-field
                        dense
                        prefix="Keterangan :"
                        class="font-weight-bold"
                        v-model="editedItem.Keterangan"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" md="4" sm="5">
                      <v-card flat class="mt-n3">
                        <v-row>
                          <v-col cols="12" sm="12">
                            <vuetify-money
                              dense
                              placeholder="0"
                              v-bind:options="DPP"
                              class="centered-input font-weight-bold"
                              v-model="editedItem.DPP"
                            />
                          </v-col>

                          <v-col cols="12" sm="4">
                            <vuetify-money
                              dense
                              placeholder="0"
                              v-bind:options="PPnPersen"
                              class="centered-input font-weight-bold"
                              v-model="editedItem.PPnPersen"
                              @input="Tambahppn()"
                            />
                          </v-col>

                          <v-col cols="12" sm="8">
                            <vuetify-money
                              dense
                              placeholder="0"
                              v-bind:options="PPn"
                              class="centered-input font-weight-bold"
                              v-model="editedItem.PPn"
                            />
                          </v-col>

                          <v-col cols="12" sm="12">
                            <vuetify-money
                              dense
                              placeholder="0"
                              v-bind:options="TotalBayar"
                              class="centered-input font-weight-bold"
                              v-model="editedItem.TotalBayar"
                            />
                          </v-col>
                        </v-row>
                      </v-card>
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

        <!-- <v-alert
            prominent
            type="error"
            transition="fab-transition"
            :value="alertClose"
            >
                <v-row align="center">
                <v-col class="grow">
                    Nunc nonummy metus. Nunc interdum lacus sit amet orci. Nullam dictum felis eu pede mollis pretium. Cras id dui.
                </v-col>
                <v-col class="shrink">
                    <v-btn>Take action</v-btn>
                </v-col>
                </v-row>
            </v-alert> -->

        <div id="app">
          <ejs-grid
            :dataSource="DataWorkOrder"
            :height="mobile ? '43vh' : 'auto'"
            width="100%"
            gridLines="Both"
            :allowReordering="true"
            :selectionSettings="selectionOptions"
            :editSettings="editSettings"
            :allowGrouping="mobile"
            :groupSettings="groupSettings"
            :allowSorting="true"
            :allowMultiSorting="true"
            :allowFiltering="mobile"
            :filterSettings="filterOptions"
            :allowResizing="true"
            :allowPaging="true"
            :pageSettings="pageSettings"
            :toolbar="toolbarOptions"
            :rowDataBound="rowDataBound"
            :commandClick="commandClick"
            :contextMenuItems="contextMenuItems"
            :contextMenuClick="contextMenuClick"
            ref="ggs"
            :allowExcelExport="true"
            :toolbarClick="toolbarClick"
            @actionComplete="onActionComplete"
            :beforeBatchSave="beforeBatchSave"
          >
            <e-columns>
              <e-column
                field="Commands"
                :visible="mobile"
                headerText="Aksi"
                width="144"
                :commands="commands"
                textAlign="center"
              >
              </e-column>
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
                :allowEditing="false"
                headerText="Kode Nota"
                textAlign="Left"
                width="200"
              ></e-column>

              <e-column
                :filter="filter"
                field="Tanggal"
                :allowEditing="false"
                headerText="Tanggal"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="JenisWorkOrder"
                :allowEditing="false"
                headerText="Jenis Work Order"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Lokasi"
                :allowEditing="false"
                headerText="Lokasi "
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Pelanggan"
                :allowEditing="false"
                headerText="Pelanggan"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="pelanggan.Nama"
                :allowEditing="false"
                headerText="Nama Pelanggan"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="pemilik.Nama"
                :allowEditing="false"
                headerText="Nama Pemilik"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="rangka.kendaraan.Nama"
                :allowEditing="false"
                headerText="Nama Kendaraan"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Lessor"
                :allowEditing="false"
                headerText="Lessor"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="NomorPolisi"
                :allowEditing="false"
                headerText="Nomor Polisi"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="NomorRangka"
                :allowEditing="false"
                headerText="Nomor Rangka"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="NomorMesin"
                :allowEditing="false"
                headerText="Nomor Mesin"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Odometer"
                :allowEditing="false"
                headerText="Odometer"
                textAlign="Center"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Status"
                :allowEditing="false"
                headerText="Status"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="KeteranganStatus"
                :allowEditing="false"
                headerText="Keterangan Status"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Keterangan"
                :allowEditing="false"
                headerText="Keterangan"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Saran"
                :allowEditing="false"
                headerText="Saran"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                :allowEditing="false"
                field="PaymentTerm"
                headerText="Payment Term"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Total"
                :allowEditing="false"
                type="number"
                format="N"
                headerText="Total"
                width="180"
                textAlign="Right"
              ></e-column>

              <e-column
                :filter="filter"
                field="Diskon"
                headerText="Diskon"
                :allowEditing="false"
                width="180"
                textAlign="Right"
              ></e-column>

              <e-column
                :filter="filter"
                field="DPP"
                type="number"
                format="N"
                headerText="DPP"
                :allowEditing="false"
                width="180"
                textAlign="Right"
              ></e-column>

              <e-column
                :filter="filter"
                field="PPn"
                headerText="PPn"
                :allowEditing="false"
                width="180"
                textAlign="Right"
              ></e-column>

              <e-column
                :filter="filter"
                field="PPnPersenManual"
                :allowEditing="false"
                headerText="PPn Persen Manual"
                width="180"
                textAlign="Right"
              ></e-column>

              <e-column
                :filter="filter"
                type="number"
                format="N"
                field="TotalBayar"
                :allowEditing="false"
                headerText="Total Bayar"
                width="180"
                textAlign="Right"
              ></e-column>

              <e-column
                :filter="filter"
                field="Terbayar"
                type="number"
                format="N"
                :allowEditing="false"
                headerText="Terbayar"
                width="180"
                textAlign="Right"
              ></e-column>

              <e-column
                :filter="filter"
                field="SisaBayar"
                :allowEditing="false"
                type="number"
                format="N"
                headerText="Sisa Bayar"
                width="180"
                textAlign="Right"
              ></e-column>

              <e-column
                :filter="filter"
                field="MataUang"
                :allowEditing="false"
                headerText="Mata Uang"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Kurs"
                :allowEditing="false"
                headerText="Kurs"
                width="180"
                textAlign="Right"
              ></e-column>

              <e-column
                :filter="filter"
                field="Referensi"
                :allowEditing="false"
                headerText="Referensi"
                width="180"
                textAlign="Left"
              ></e-column>

              <e-column
                :filter="filter"
                field="IsClose"
                :allowEditing="false"
                headerText="IsClose"
                width="180"
                displayAsCheckBox="true"
              ></e-column>

              <e-column
                :filter="filter"
                field="JumlahCetak"
                :allowEditing="false"
                headerText="Jumlah Cetak"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                :allowEditing="false"
                field="DiBuatTgl"
                headerText="Di Buat Tanggal"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                :allowEditing="false"
                field="DiBuatOleh"
                headerText="Di Buat Oleh"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                :allowEditing="false"
                field="DiUbahTgl"
                headerText="Di Ubah Tanggal"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiUbahOleh"
                :allowEditing="false"
                headerText="Di Ubah Oleh"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="OwnRisk"
                :customAttributes="columnEdit"
                :allowEditing="actionEdit"
                editType="numericedit"
                type="number"
                format="N"
                headerText="OwnRisk"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                :customAttributes="columnEdit"
                :allowEditing="actionEdit"
                editType="datepickeredit"
                type="date"
                field="TglOwnRisk"
                headerText="TglOwnRisk"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="SudahInvoice"
                :allowEditing="false"
                headerText="Sudah Invoice"
                width="180"
                displayAsCheckBox="true"
              ></e-column>

              <e-column
                :filter="filter"
                :allowEditing="false"
                field="SudahDeductible"
                headerText="Sudah Deductible"
                width="180"
                displayAsCheckBox="true"
              ></e-column>

              <e-column
                :filter="filter"
                :allowEditing="false"
                field="Penawaran"
                headerText="Penawaran"
                width="180"
                textAlign="Right"
              ></e-column>

              <e-column
                :filter="filter"
                :allowEditing="false"
                field="TglSPK"
                headerText="Tanggal SPK"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                :allowEditing="false"
                field="TglTerimaSPK"
                headerText="Tanggal Terima SPK"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                :customAttributes="columnEdit"
                :edit="dropdownKetWip"
                :allowEditing="actionEdit"
                field="KeteranganWIP"
                headerText="Keterangan WIP"
                width="600"
              ></e-column>

              <e-column
                :filter="filter"
                :allowEditing="false"
                field="Coding"
                headerText="Coding"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                :allowEditing="false"
                field="JenisKerusakan"
                headerText="Jenis Kerusakan"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                :allowEditing="false"
                field="ProgressPengerjaan"
                headerText="Progress Pengerjaan"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                :allowEditing="false"
                field="DetailProgress"
                headerText="Detail Progress"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="PICSite"
                :allowEditing="false"
                headerText="PIC Site"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                :allowEditing="false"
                field="Surveyor"
                headerText="Surveyor"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="TglDOL"
                headerText="Tanggal DOL"
                :allowEditing="false"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="NoPolisAsurans"
                :allowEditing="false"
                headerText="No. Polis Asuransi"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                :allowEditing="false"
                field="NoRegistrasi"
                headerText="No.Registrasi"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Remarks"
                :allowEditing="false"
                headerText="Remarks"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="RemarksSCM"
                :allowEditing="false"
                headerText="RemarkSCM"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="PICSCM1"
                :allowEditing="false"
                headerText="PIC SCM1"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="PICSCM2"
                :allowEditing="false"
                headerText="PIC SCM2"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                :allowEditing="false"
                field="ReserveOutcome"
                type="number"
                format="N"
                headerText="Reserve Outcome"
                width="180"
                textAlign="Right"
              ></e-column>

              <e-column
                :filter="filter"
                :allowEditing="false"
                field="AvailableBudget"
                type="number"
                format="N"
                headerText="Available Budget"
                width="180"
                textAlign="Right"
              ></e-column>

              <e-column
                :filter="filter"
                field="RFU"
                :allowEditing="false"
                headerText="RFU"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="CekList"
                :allowEditing="false"
                headerText="Cek List"
                width="180"
                displayAsCheckBox="true"
              ></e-column>

              <e-column
                :filter="filter"
                field="Adjuster"
                headerText="AdJuster"
                :allowEditing="false"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="PICAdj"
                :allowEditing="false"
                headerText="PIC Adj"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Broker"
                :allowEditing="false"
                headerText="Broker"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="PICBroker"
                :allowEditing="false"
                headerText="PIC Broker"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                :allowEditing="false"
                field="KeteranganProgressClaim"
                headerText="Keterangan Progress Claim"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                :allowEditing="false"
                field="PIC"
                headerText="PIC"
                width="180"
              ></e-column>
            </e-columns>

            <!-- <e-aggregates>
                    <e-aggregate>
                    <e-columns>
                        <e-column type="Sum" format="N" field="Total" :FooterTemplate="footerSum"></e-column>
                        <e-column type="Sum" field="total_bayar" :FooterTemplate="footerSum"></e-column>
                    </e-columns>
                    </e-aggregate>
                </e-aggregates> -->
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
          <v-toolbar color="primary" dark>Batal JO</v-toolbar>
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
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.KodeNota"
                  readonly
                  label="Kode Nota"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.NomorMesin"
                  readonly
                  label="Nomor Mesin"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.Tanggal"
                  readonly
                  label="Tanggal"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.NomorPolisi"
                  readonly
                  label="Nomor Polisi"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.JenisWorkOrder"
                  readonly
                  label="Jenis Work Order"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.Odometer"
                  readonly
                  label="Odometer"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.Lokasi"
                  readonly
                  label="Lokasi"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.PaymentTerm"
                  readonly
                  label="PaymentTerm"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.Pelanggan"
                  readonly
                  label="Pelanggan"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.MataUang"
                  readonly
                  label="MataUang"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.Pemilik"
                  readonly
                  label="Pemilik"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.Kurs"
                  readonly
                  label="Kurs"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.Lessor"
                  readonly
                  label="Lessor"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.Referensi"
                  readonly
                  label="Referensi"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.NomorRangka"
                  readonly
                  label="Nomor Rangka"
                ></v-text-field>
              </v-col>
            </v-row>

            <strong class="text-h5"><b>Keluhan</b></strong>

            <!-- <v-row no-gutters class="ml-n3 mr-n3">
                  <Keluhan v-on:hapus_item="hps_items($event)" v-on:KeluhanDia="keluhan($event)" v-bind:ItemsKeluhan='ItemsKeluhan' :title="title"/>
                </v-row> -->

            <v-row class="mt-3">
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.Keterangan"
                  readonly
                  label="Keterangan"
                  class="font-weight-bold"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="12" class="mt-n6">
                <vuetify-money
                  v-model="editedItem.DPP"
                  readonly
                  placeholder="0"
                  v-bind:options="DPP"
                  class="font-weight-bold centered-input"
                />
              </v-col>

              <v-col cols="4" sm="4" md="4" class="mt-n6">
                <vuetify-money
                  v-model="editedItem.PPnPersen"
                  readonly
                  placeholder="0"
                  v-bind:options="PPnPersen"
                  class="font-weight-bold centered-input"
                />
              </v-col>

              <v-col cols="8" sm="8" md="8" class="mt-n6">
                <vuetify-money
                  v-model="editedItem.PPn"
                  readonly
                  placeholder="0"
                  v-bind:options="PPn"
                  class="font-weight-bold centered-input"
                />
              </v-col>

              <v-col cols="12" sm="12" md="12" class="mt-n6">
                <vuetify-money
                  v-model="editedItem.TotalBayar"
                  readonly
                  placeholder="0"
                  v-bind:options="TotalBayar"
                  class="font-weight-bold centered-input"
                />
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

    <!-- ubah estimasi -->
    <v-dialog v-model="dialogEstimasi" scrollable persistent max-width="900px">
      <!-- <template v-slot:activator="{on, attrs}">
                <v-btn color="blue darken-4" dark v-bind="attrs" v-on="on" class="mx-2" :disabled='btn_tambah'  medium>
                    <v-icon left>mdi-plus-thick</v-icon>
                    {{$t('All.BtnTambah')}}
                </v-btn>
            </template> -->
      <v-card>
        <v-toolbar dark outline color="blue darken-4" class="elevation-0">
          <v-card-title>
            <span class="headline">Ubah Estimasi Terakhir di WO</span>
          </v-card-title>
          <v-spacer></v-spacer>

          <v-btn dark text fab small @click="closeEstimasi">
            <v-icon class="mx-1">mdi-window-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  :disabled="true"
                  v-model="Estimasi.KodeNota"
                  label="Kode Nota"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="Estimasi.Odometer"
                  label="Odometer"
                  :maxlength="50"
                ></v-text-field>
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
                      v-model="Estimasi.Tanggal"
                      label="Tanggal"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="Estimasi.Tanggal"
                    @input="Menutanggal = false"
                    color="blue darken-4"
                    locale="id"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  :maxlength="100"
                  v-model="Estimasi.PaymentTerm"
                  label="Payment Term"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  :maxlength="100"
                  readonly
                  v-model="Estimasi.Pelanggan"
                  label="Pelanggan"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  :maxlength="100"
                  readonly
                  v-model="Estimasi.MataUang"
                  label="Mata Uang"
                >
                  <template v-slot:append>
                    <v-dialog
                      v-model="dialogMataUangEstimasi"
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
                            <span class="headline">Mata Uang</span>
                          </v-card-title>
                          <v-spacer></v-spacer>
                          <v-btn
                            dark
                            text
                            fab
                            small
                            @click="dialogMataUangEstimasi = false"
                          >
                            <v-icon class="mx-1">mdi-window-close</v-icon>
                          </v-btn>
                        </v-toolbar>
                        <v-card flat
                          ><!-- Tabel Data WorkOrder -->
                          <v-col cols="12" md="12">
                            <v-card>
                              <ejs-grid
                                :dataSource="DataMataUang"
                                height="200"
                                width="100%"
                                gridLines="Both"
                                :pageSettings="pageSettings"
                                :recordDoubleClick="onDoubleClickUang"
                                :toolbar="toolbarOptions"
                              >
                                <e-columns>
                                  <e-column
                                    field="Kode"
                                    headerText="Kode"
                                    textAlign="Left"
                                    width="100"
                                  ></e-column>
                                  <e-column
                                    field="Nama"
                                    headerText="Nama"
                                    width="100"
                                  ></e-column>
                                  <e-column
                                    field="Aktif"
                                    headerText="Aktif"
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
                <v-text-field
                  :maxlength="100"
                  readonly
                  v-model="Estimasi.NomorWO"
                  label="Nomor WO"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  :maxlength="100"
                  v-model="Estimasi.Kurs"
                  label="Kurs"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  :maxlength="100"
                  readonly
                  v-model="Estimasi.NomorRangka"
                  label="Nomor Rangka"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  :maxlength="100"
                  v-model="editedItem.Referensi"
                  label="Referensi (Polis Asuransi)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  :maxlength="100"
                  readonly
                  v-model="Estimasi.NomorMesin"
                  label="Nomor Mesin"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-menu
                  v-model="MenuTanggalEstimasi"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="Estimasi.TanggalEstimasi"
                      label="Tanggal Estimasi"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="Estimasi.TanggalEstimasi"
                    @input="MenuTanggalEstimasi = false"
                    color="blue darken-4"
                    locale="id"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  :maxlength="100"
                  readonly
                  v-model="Estimasi.NomorPolisi"
                  label="Nomor Polisi"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-dialog v-model="dialogExcel" scrollable>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn elevation="10" v-bind="attrs" v-on="on"
                      >Import Barang dari Excel</v-btn
                    >
                  </template>
                  <v-card>
                    <v-toolbar
                      dark
                      outline
                      color="blue darken-4"
                      class="elevation-1"
                    >
                      <v-btn text href="/FormatBarangEstimasi.xlsx" download>
                        Format Excel
                      </v-btn>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <!-- <input type="file" style="display: none;" @change="previewFiles" id="upload" /> -->
                      <input
                        id="a"
                        type="button"
                        value="Masukan Excel"
                        onclick="document.getElementById('upload').click();"
                      />
                      <v-spacer></v-spacer>
                      <v-btn dark text fab small @click="dialogExcel = false">
                        <v-icon class="mx-1">mdi-window-close</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <ejs-grid
                      :dataSource="BarangExcel"
                      height="200"
                      width="100%"
                      :allowReordering="true"
                      :allowSorting="true"
                      :allowMultiSorting="true"
                      :allowResizing="true"
                      :allowPaging="true"
                    >
                      <e-columns>
                        <e-column
                          field="Barang"
                          headerText="Barang"
                          width="170"
                          :isPrimaryKey="true"
                        >
                        </e-column>

                        <e-column field="Nama" headerText="Nama" width="280">
                        </e-column>

                        <e-column
                          field="PartNumber1"
                          headerText="Part Number 1"
                          width="170"
                        >
                        </e-column>

                        <e-column field="Merk" headerText="Merk" width="170">
                        </e-column>

                        <e-column
                          field="Kendaraan"
                          headerText="Kendaraan"
                          width="170"
                        >
                        </e-column>

                        <e-column
                          field="Jumlah"
                          headerText="Jumlah"
                          width="170"
                          textAlign="Right"
                        >
                        </e-column>

                        <e-column field="Rasio" headerText="Rasio" width="170">
                        </e-column>

                        <e-column
                          field="Satuan"
                          headerText="Satuan"
                          width="170"
                        >
                        </e-column>

                        <e-column field="Harga" headerText="Harga" width="170">
                        </e-column>

                        <e-column
                          field="Diskon"
                          headerText="Diskon (%)"
                          width="170"
                        >
                        </e-column>

                        <e-column
                          field="SubTotal"
                          headerText="SubTotal"
                          width="170"
                        >
                        </e-column>
                      </e-columns>

                      <e-aggregates>
                        <e-aggregate>
                          <e-columns>
                            <e-column type="Count" field="Barang"></e-column>
                          </e-columns>
                        </e-aggregate>
                      </e-aggregates>
                    </ejs-grid>
                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="importExcel">
                        I accept
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
              <!-- #Data Items Pembelian -->
              <v-col cols="12">
                <v-card class="elevation-5" outlined>
                  <v-tabs
                    background-color="white"
                    color="dark"
                    slider-color="blue darken-4"
                  >
                    <v-tab>Barang</v-tab>
                    <v-divider
                      class="mx-2"
                      color="418BE5"
                      inset
                      vertical
                    ></v-divider>
                    <v-tab>Pekerjaan</v-tab>
                    <v-tab-item :eager="true">
                      <keep-alive>
                        <Barang
                          v-on:hpsBarang="hpsBrg($event)"
                          v-on:itemsBarang="itemsBarang($event)"
                          :title="title"
                          v-bind:EstimasiBarang="Items.Barang"
                        />
                      </keep-alive>
                    </v-tab-item>
                    <v-tab-item :eager="true">
                      <keep-alive>
                        <Pekerjaan
                          v-on:hpsPekerjaan="hpsKrj($event)"
                          v-on:itemsKerja="itemsKerja($event)"
                          :title="title"
                          v-bind:EstimasiPekerjaan="Items.Pekerjaan"
                        />
                      </keep-alive>
                    </v-tab-item>
                  </v-tabs>
                </v-card>
              </v-col>

              <v-col cols="12" sm="7" md="8">
                <v-text-field
                  dense
                  prefix="Keterangan :"
                  class="font-weight-bold"
                  v-model="Estimasi.Keterangan"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" md="4" sm="5">
                <v-card flat class="mt-n3">
                  <v-row>
                    <v-col cols="12" sm="12">
                      <vuetify-money
                        dense
                        placeholder="0"
                        v-bind:options="DPP"
                        class="centered-input font-weight-bold"
                        v-model="Estimasi.DPP"
                      />
                    </v-col>

                    <v-col cols="12" sm="4">
                      <vuetify-money
                        dense
                        placeholder="0"
                        v-bind:options="PPnPersen"
                        class="centered-input font-weight-bold"
                        v-model="Estimasi.PPnPersen"
                        @input="Tambahppn()"
                      />
                    </v-col>

                    <v-col cols="12" sm="8">
                      <vuetify-money
                        dense
                        placeholder="0"
                        v-bind:options="PPn"
                        class="centered-input font-weight-bold"
                        v-model="Estimasi.PPn"
                      />
                    </v-col>

                    <v-col cols="12" sm="12">
                      <vuetify-money
                        dense
                        placeholder="0"
                        v-bind:options="TotalBayar"
                        class="centered-input font-weight-bold"
                        v-model="Estimasi.TotalBayar"
                      />
                    </v-col>

                    <v-col cols="12" sm="12">
                      <vuetify-money
                        dense
                        placeholder="0"
                        v-bind:options="OnRisk"
                        class="centered-input font-weight-bold"
                        v-model="Estimasi.OnRisk"
                      />
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="error" @click="closeEstimasi">
            <v-icon class="mr-1">mdi-close-circle</v-icon
            >{{ $t("All.BtnBatal") }}
          </v-btn>
          <v-btn
            dark
            color="blue darken-4"
            :disabled="btn_simpan"
            @click="saveEstimasi"
          >
            <v-icon class="mr-1">mdi-content-save</v-icon
            >{{ $t("All.BtnSimpan") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import Loading from "vue-loading-overlay";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import {
  GridPlugin,
  ContextMenu,
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
  ExcelExport,
} from "@syncfusion/ej2-vue-grids";
import api from "../services/http";
// import Keluhan from  '../views/WorkOrder/Keluhan.vue'
import Barang from "../views/Estimasi/Barang.vue";
import Pekerjaan from "../views/Estimasi/Pekerjaan.vue";
let elementWip, WipObj;
// import xlsx from "xlsx"
// import Instruksi from '../views/WorkOrder/InstruksiKerja.vue'
// import Pekerjaan from '../views/WorkOrder/Pekerjaan.vue'
// import Mekanik from '../views/WorkOrder/Mekanik.vue'
Vue.use(GridPlugin);
export default {
  components: {
    Loading,
    // Instruksi,
    Barang,
    Pekerjaan,
    // Keluhan,
    // Pekerjaan,
    // Mekanik
  },
  data() {
    return {
      alert: "",
      dialogUnit: false,
      Unit: [],
      dialogExcel: false,
      dialogMataUangEstimasi: false,
      BarangExcel: [],
      OnRisk: {
        locale: "id-ID",
        prefix: "On Risk (OR)",
        suffix: "",
        length: 12,
        precision: 2,
      },
      pesan: "",
      Items: {
        Barang: [],
        Pekerjaan: [],
      },
      hapus_itemsEstimasi: {
        Barang: [],
        Pekerjaan: [],
      },
      MenuTanggalEstimasi: false,
      dialog_detail: false,
      dialogEstimasi: false,
      ScrollKeAtas: false,
      mobile: null,
      windowSize: { x: 0, y: 0 },
      idWO: "",
      dialog: false,
      dialog_TanggalMasukKeluar: false,
      dialog_TanggalKeluarFisik: false,
      isLoading: false,
      fullPage: true,
      MenuTanggalAwal: false,
      alertClose: false,
      MenuTanggalAkhir: false,
      MenuTanggalKeluarFisik: false,
      MenuTanggalMasuk: false,
      MenuTanggalKeluar: false,
      Menutanggal: false,
      tanggal_awal: "",
      tanggalMasuk: "",
      TanggalKeluar: "",
      TanggalKeluarFisik: "",
      tanggal_akhir: "",
      items_periode: [],
      Mekanik: [],
      dialog_print: false,
      JenisPekerjaan: [],
      dialog_periode: false,
      columnEdit: { class: "customcss" },
      actionEdit: false,
      dialog_batal: false,
      btn_datagrid: true,
      dialogAsuransi: false,
      dialogPemilik: false,
      dialogLessor: false,
      dialogMataUang: false,
      dialogNoRangka: false,
      action: null,
      reportDesign: null,
      btn_tambah: true,
      btn_simpan: false,
      editedIndex: -1,
      DPP: { locale: "id-ID", prefix: "dpp", length: 12, precision: 2 },
      PPnPersen: {
        locale: "id-ID",
        prefix: "ppn",
        suffix: "%",
        length: 3,
        precision: 0,
      },
      PPn: { locale: "id-ID", length: 12, precision: 2 },
      TotalBayar: {
        locale: "id-ID",
        prefix: "Total Bayar",
        suffix: "",
        length: 12,
        precision: 2,
      },
      defaultItem: {
        KodeNota: "",
        Tanggal: new Date().toISOString().substr(0, 10),
        NomorMesin: "",
        NomorPolisi: "",
        JenisWorkOrder: "Konstruksi Gedung",
        Odometer: 0,
        Lokasi: "",
        PaymentTerm: 0,
        Pelanggan: "",
        MataUang: "Rupiah",
        Pemilik: "",
        Kurs: 1,
        Lessor: "",
        Referensi: "",
        NomorRangka: "",
        Keterangan: "",
        DPP: 0,
        PPn: 0,
        PPnPersen: 0,
        ReserveOutcome: 0,
        ReserveOutcomeJasa: 0,
        Unit: "",
      },
      editedItem: {
        KodeNota: "",
        Tanggal: new Date().toISOString().substr(0, 10),
        NomorMesin: "",
        NomorPolisi: "",
        JenisWorkOrder: "Konstruksi Gedung",
        Odometer: 0,
        Lokasi: "",
        PaymentTerm: 0,
        Pelanggan: "",
        MataUang: "Rupiah",
        Pemilik: "",
        Kurs: 1,
        Lessor: "",
        Referensi: "",
        NomorRangka: "",
        Keterangan: "",
        DPP: 0,
        PPn: 0,
        PPnPersen: 0,
        ReserveOutcome: 0,
        ReserveOutcomeJasa: 0,
        Unit: "",
      },
      Estimasi: {
        KodeNota: "",
        Odometer: 0,
        Tanggal: "",
        PaymentTerm: 0,
        Pelanggan: "",
        MataUang: "",
        NomorWO: "",
        Kurs: 1,
        NomorRangka: "",
        Referensi: "",
        NomorMesin: "",
        TanggalEstimasi: "",
        NomorPolisi: "",
        Keterangan: "",
        DPP: 0,
        PPnPersen: 0,
        PPn: 0,
        TotalBayar: 0,
        OnRisk: 0,
      },
      defaultItemEstimasi: {
        KodeNota: "",
        Odometer: 0,
        Tanggal: "",
        PaymentTerm: 0,
        Pelanggan: "",
        MataUang: "",
        NomorWO: "",
        Kurs: 1,
        NomorRangka: "",
        Referensi: "",
        NomorMesin: "",
        TanggalEstimasi: "",
        NomorPolisi: "",
        Keterangan: "",
        DPP: 0,
        PPnPersen: 0,
        PPn: 0,
        TotalBayar: 0,
        OnRisk: 0,
      },
      dropdownKetWip: {
        create: () => {
          elementWip = document.createElement("input");
          return elementWip;
        },
        read: () => {
          return WipObj.text;
        },
        destroy: () => {
          WipObj.destroy();
        },
        write: (w) => {
          if (
            w.rowData.KeteranganWIP != null ||
            w.rowData.KeteranganWIP != ""
          ) {
            WipObj = new DropDownList({
              dataSource: this.KeteranganWIP,
              fields: { value: "KeteranganWIP", text: "KeteranganWIP" },
              value: w.rowData.KeteranganWIP,
              text: w.rowData.KeteranganWIP,
              change: () => {
                // console.log('d gada isi',d)
              },
              placeholder: "Select a Keterangan",
              floatLabelType: "Never",
            });
          } else {
            WipObj = new DropDownList({
              dataSource: this.KeteranganWIP,
              fields: { value: "KeteranganWIP", text: "KeteranganWIP" },
              value: w.rowData.KeteranganWIP,
              text: w.rowData.KeteranganWIP,
              change: () => {
                // console.log('d',d)
              },
              placeholder: "Select a Keterangan",
              floatLabelType: "Never",
            });
          }
          WipObj.appendTo(elementWip);
        },
      },
      KeteranganWIP: [
        {
          KeteranganWIP: "TUNGGU PAYMENT DEDUCTIBLE DAN ASURANSI",
          Coding: "T1",
        },
        { KeteranganWIP: "TUNGGU PAYMENT DEDUCTIBLE", Coding: "T1" },
        { KeteranganWIP: "TUNGGU PAYMENT ASURANSI", Coding: "T1" },
        { KeteranganWIP: "TUNGGU PAYMENT NON-KLAIM", Coding: "T1" },
        { KeteranganWIP: "TUNGGU PAYMENT, UNIT SUDAH SELESAI", Coding: "T3" },
        {
          KeteranganWIP: "TUNGGU PAYMENT, UNIT SEDANG DIKERJAKAN",
          Coding: "T2",
        },
        {
          KeteranganWIP: "TUNGGU PAYMENT, UNIT BELUM DIKERJAKAN",
          Coding: "T1",
        },
        { KeteranganWIP: "RECYCLE-BIN", Coding: "R1" },
        { KeteranganWIP: "PAYMENT SELESAI, UNIT SUDAH SELESAI", Coding: "D3" },
        {
          KeteranganWIP: "PAYMENT SELESAI, UNIT SEDANG DIKERJAKAN",
          Coding: "D2",
        },
        {
          KeteranganWIP: "PAYMENT SELESAI, UNIT BELUM DIKERJAKAN",
          Coding: "D1",
        },
        // {KeteranganWIP:'PAYMENT SELESAI',                                           Coding:'D'},
        {
          KeteranganWIP: "TUNGGU PERSETUJUAN, UNIT SUDAH SELESAI",
          Coding: "C3",
        },
        {
          KeteranganWIP: "TUNGGU PERSETUJUAN, UNIT SEDANG DIKERJAKAN",
          Coding: "C2",
        },
        {
          KeteranganWIP:
            "TUNGGU PERSETUJUAN, UNIT SEDANG DIKERJAKAN, TUNGGU PART",
          Coding: "C2",
        },
        {
          KeteranganWIP: "TUNGGU PERSETUJUAN, UNIT BELUM DIKERJAKAN",
          Coding: "C1",
        },
        {
          KeteranganWIP: "PERSETUJUAN TERBIT, UNIT SUDAH SELESAI",
          Coding: "A3",
        },
        {
          KeteranganWIP: "PERSETUJUAN TERBIT, UNIT SEDANG DIKERJAKAN",
          Coding: "A2",
        },
        {
          KeteranganWIP:
            "PERSETUJUAN TERBIT, UNIT SEDANG DIKERJAKAN, TUNGGU PART",
          Coding: "A2",
        },
        {
          KeteranganWIP: "PERSETUJUAN TERBIT, UNIT BELUM DIKERJAKAN",
          Coding: "A1",
        },
        { KeteranganWIP: "PROSES ESTIMASI, UNIT SUDAH SELESAI", Coding: "E3" },
        {
          KeteranganWIP: "PROSES ESTIMASI, UNIT SEDANG DIKERJAKAN",
          Coding: "E2",
        },
        {
          KeteranganWIP: "PROSES ESTIMASI, UNIT BELUM DIKERJAKAN",
          Coding: "E1",
        },
        { KeteranganWIP: "SPK PROBLEM, UNIT SUDAH SELESAI", Coding: "B3" },
        { KeteranganWIP: "SPK PROBLEM, UNIT SEDANG DIKERJAKAN", Coding: "B2" },
        { KeteranganWIP: "SPK PROBLEM, UNIT BELUM DIKERJAKAN", Coding: "B1" },
        { KeteranganWIP: "TIDAK JADI DIKERJAKAN", Coding: "Z" },
        { KeteranganWIP: "PROSPEK", Coding: "P" },
        // {KeteranganWIP:'INTERNAL HE',                                               Coding:'X'}
      ],
      hapus_items: [],
      DataWorkOrder: [],
      DataMataUang: [],
      asuransi: [],
      asuransiAll: [],
      pemilik: [],
      lessor: [],
      contextMenuItems: [],
      printOutItems: [],
      title: null,
      keterangan_batal: "",
      ItemsKeluhan: [],
      DataRangka: [],
      token: localStorage.getItem("token"),
      commands: [],
      commandsMobile: [
        { buttonOption: { content: "Details", cssClass: "e-flat Details" } },
      ],
      groupSettings: { allowReordering: true },
      selectionOptions: { type: "Multiple" },
      toolbarOptions: ["Search", "ExcelExport", "Update", "Cancel"],
      toolbarOptionsSub: ["Search"],
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
        mode: "Batch",
      },
      footerSum: function () {
        return {
          template: Vue.component("SumTemplate", {
            template: `<span>Sum: ${this.data}</span>`,
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
      ContextMenu,
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
      // this.autotanggal()
      this.btn_datagrid = false;
      this.tanggal_awal = JSON.parse(
        localStorage.getItem("Periode")
      )[0].TglAwal;
      this.tanggal_akhir = JSON.parse(
        localStorage.getItem("Periode")
      )[0].TglAkhir;
      this.getDataWo(
        JSON.parse(localStorage.getItem("Periode"))[0].TglAwal,
        JSON.parse(localStorage.getItem("Periode"))[0].TglAkhir
      );
      this.getAsuransi();
      this.getMataUang();
      this.getUnit();
      // this.getNoRangka()
    }
    if (this.action.some((a) => a == "C")) {
      this.btn_tambah = false;
    }
    if (this.action.some((a) => a == "U")) {
      this.actionEdit = true;
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
    // this.getDataMekanik()
    // this.getDataJenisPekerjaan()
    // this.getDatasupplier()
    // this.getGudang()
  },
  created() {
    // get actions for this page
    // this.contextMenuItems = this.$route.params.contextMenu.split(',')
    this.$route.params.contextMenu.split(",").forEach((element) => {
      this.contextMenuItems.push({
        text: element,
        target: ".e-content",
        id: element.replace(/\s/g, ""),
      });
    });
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
    Items: {
      deep: true,
      handler(val) {
        // console.log(val)
        let totalBarang = val.Barang.reduce(
          (a, b) => a + parseFloat(b.SubTotal),
          0
        );
        let totalPekerjaan = val.Pekerjaan.reduce(
          (a, b) => a + parseFloat(b.SubTotal),
          0
        );
        let PPn =
          (parseFloat(totalPekerjaan + totalBarang) *
            parseFloat(this.Estimasi.PPnPersen)) /
          100;
        this.Estimasi.Diskon =
          val.Barang.reduce((a, b) => a + parseFloat(b.DiskonRp), 0) +
          val.Pekerjaan.reduce((a, b) => a + parseFloat(b.DiskonRp), 0);
        this.Estimasi.DPP =
          parseFloat(totalBarang) + parseFloat(totalPekerjaan);
        this.Estimasi.Total =
          parseFloat(this.Estimasi.Diskon) + parseFloat(this.Estimasi.DPP);
        console.log(this.Estimasi.Total);
        this.Estimasi.PPn = PPn;
        this.Estimasi.TotalBayar = totalBarang + totalPekerjaan + PPn;
      },
    },
    windowSize() {
      if (this.windowSize.x < 450) {
        (this.toolbarOptions = ["Search"]), (this.titleClass = "d-none");
        this.mobile = false;
      } else {
        (this.toolbarOptions = ["Search", "ExcelExport", "Update", "Cancel"]),
          (this.titleClass = "mr-4");
        this.mobile = true;
      }
    },

    dialog(val) {
      val || this.close();
    },
    // ItemsKeluhan(val){
    //     console.log('val',val)
    //     console.log('keluhan dia', this.ItemsKeluhan)
    // }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Job Order" : "Ubah Job Order";
    },
  },
  methods: {
    getUnit() {
      api.get("unit?token=" + this.token).then(
        (res) => {
          this.isLoading = false;
          this.Unit = res.data.data;
        },
        (err) => {
          console.log(err);
        }
      );
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
    itemsBarang(data) {
      // console.log(data)
      this.Items.Barang = data;
      // console.log(this.Items)
    },
    itemsKerja(data) {
      this.Items.Pekerjaan = data;
    },
    hpsBrg(data) {
      console.log("hpsBrg", data);
      this.hapus_itemsEstimasi.Barang = data;
    },
    hpsKrj(data) {
      console.log("hpsKrj", data);
      this.hapus_itemsEstimasi.Pekerjaan = data;
    },
    closeEstimasi() {
      this.$nextTick(() => {
        this.dialogEstimasi = false;
        this.title = "Kosongkan";
        // this.editedIndex = -1;
        this.Estimasi = Object.assign({}, this.defaultItemEstimasi);
        this.btn_simpan = false;
        this.dialog = false;
        this.hapus_itemsEstimasi.Pekerjaan = [];
        this.hapus_itemsEstimasi.Barang = [];
      });
      this.Estimasi = Object.assign({}, this.Estimasi);
    },
    saveEstimasi() {
      console.log("belum");
      this.Estimasi.Items = this.Items;
      this.Estimasi.hapus_items = this.hapus_itemsEstimasi;
      api
        .put(
          "estimasi/" + this.Estimasi.id + "?token=" + this.token,
          this.Estimasi
        )
        .then(() => {
          this.closeEstimasi();
          this.getDataEstimasi(this.tanggal_awal, this.tanggal_akhir);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    importExcel() {
      this.dialogExcel = false;
      // this.Items.Barang = this.BarangExcel
      this.BarangExcel.forEach((element) => {
        let Exist = this.Items.Barang.findIndex(
          (b) => b.Barang == element.Barang && b.Rasio == element.Rasio
        );
        if (Exist != -1) {
          this.Items.Barang[Exist].Jumlah += element.Jumlah;
          this.Items.Barang[Exist].SubTotal = parseFloat(
            this.Items.Barang[Exist].Jumlah *
              parseFloat(
                parseFloat(this.Items.Barang[Exist].Harga) -
                  parseFloat(this.Items.Barang[Exist].DiskonRp)
              )
          );
        } else {
          this.Items.Barang.push(element);
          this.Items.Barang = [...this.Items.Barang];
          console.log(this.Items.Barang);
        }
      });
    },
    // previewFiles(e) {
    //     var files = e.target.files, f = files[0];
    //     var reader = new FileReader();
    //     var dataExcel = null;
    //     reader.onload = e => {
    //         var data = new Uint8Array(e.target.result);
    //         const XLSX = xlsx;
    //         var workbook = XLSX.read(data, {type: 'array'});
    //         let sheetName = workbook.SheetNames[0]
    //         /* DO SOMETHING WITH workbook HERE */
    //         // console.log(workbook);
    //         let worksheet = workbook.Sheets[sheetName];
    //         // console.log(XLSX.utils.sheet_to_json(worksheet));
    //         dataExcel = XLSX.utils.sheet_to_json(worksheet)
    //         this.BarangExcel = dataExcel.map(d => {
    //             d.Bekas = false
    //             d.DiskonRp = parseFloat(d.Harga) * parseFloat(d.Diskon) / 100
    //             d.SubTotal = d.Jumlah * (parseFloat(d.Harga) - (parseFloat(d.Harga) * parseFloat(d.Diskon) / 100))
    //             return d
    //         })
    //     };
    //     reader.readAsArrayBuffer(f);
    // },
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

    updateTanggalKeluarFisik(data) {
      this.contextMenuUpdateFn(
        { keluarFisik: data, update: "UbahTanggalKeluarFisik" },
        this.idWO
      );
    },
    updateTanggalMasukKeluar(awal, akhir) {
      console.log(awal, akhir);
      this.contextMenuUpdateFn(
        { awal: awal, akhir: akhir, update: "UbahTanggalMasuk/TanggalKeluar" },
        this.idWO
      );
    },
    onActionComplete(args) {
      if (args.requestType === "batchsave") {
        // console.log(args)
        this.isLoading = true;
        api
          .put("wo-ownrisk/" + this.idRow + "?token=" + this.token, {
            rowData: this.rowData,
          })
          .then(() => {
            this.isLoading = false;
            this.getDataWo(this.tanggal_awal, this.tanggal_akhir);
          })
          .catch((err) => {
            console.log(err);
          });
        this.idRow = "";
        this.rowData = [];
      }
    },
    beforeBatchSave(args) {
      this.idRow = args.batchChanges.changedRecords
        .map((a) => {
          return a.id;
        })
        .toString();
      // this.rowData = args.batchChanges.changedRecords
      this.rowData = args.batchChanges.changedRecords.map((b) => {
        b.Coding =
          b.KeteranganWIP != null
            ? this.KeteranganWIP.find((k) => k.KeteranganWIP == b.KeteranganWIP)
                .Coding
            : null;
        return b;
      });
    },
    toolbarClick: function (args) {
      // console.log(args)
      if (args.item.text === "Excel Export") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.ggs.excelExport();
      }
    },
    async getDataPrint() {
      console.log(this.reportDesign);
      var rute = {
        name: this.reportDesign.id.substr(1),
      };
      if (this.reportDesign.id == "/cetakTiket") {
        if (this.editedItem.estimasi == null) {
          alert("estimasi belum dibuat");
        } else if (this.editedItem.estimasi.NoTiketKeluar == null) {
          alert(
            "No Tiket Keluar belum ada, Silahkan set Tanggal Keluar terlebih dahulu."
          );
        } else if (this.editedItem.estimasi.NoTiketKeluar != null) {
          await api
            .put("report-wo/" + this.editedItem.id + "?token=" + this.token, {
              Cetak: rute.name,
            })
            .then(
              (res) => {
                rute.params = { data: res.data.data };
                this.$router.push(rute);
              },
              (err) => {
                console.log(err);
              }
            );
        }
      } else {
        await api
          .put("report-wo/" + this.editedItem.id + "?token=" + this.token, {
            Cetak: rute.name,
          })
          .then(
            (res) => {
              rute.params = { data: res.data.data };
              this.$router.push(rute);
            },
            (err) => {
              console.log(err);
            }
          );
      }
    },
    change_print(a) {
      this.reportDesign = a;
    },
    contextMenuUpdateFn(data, id) {
      api
        .put("/contextMenu-wo/" + id + "?token=" + this.token, data)
        .then((res) => {
          console.log(res);
          if (data.update == "CloseWO") {
            // this.getDataWo(JSON.parse(localStorage.getItem('Periode'))[0].TglAwal,JSON.parse(localStorage.getItem('Periode'))[0].TglAkhir)
            this.getDataWo(this.tanggal_awal, this.tanggal_akhir);
          }
          if (data.update == "UbahTanggalKeluarFisik") {
            // this.getDataWo(JSON.parse(localStorage.getItem('Periode'))[0].TglAwal,JSON.parse(localStorage.getItem('Periode'))[0].TglAkhir)
            this.getDataWo(this.tanggal_awal, this.tanggal_akhir);
          }
          this.idWO = "";
          this.tanggalMasuk = "";
          this.TanggalKeluar = "";
          this.TanggalKeluarFisik = "";
        })
        .catch((err) => {
          console.log(err);
          this.idWO = "";
        });
      this.dialog_TanggalMasukKeluar = false;
      this.dialog_TanggalKeluarFisik = false;
    },
    loadEstimasi(NomorWO) {
      this.isLoading = true;
      this.dialogEstimasi = true;
      this.title = "Ubah";
      api
        .get("load-estimasi?token=" + this.token + "&wo=" + NomorWO)
        .then((res) => {
          if (res.data.data.Status == "BATAL") {
            alert("Tidak dapat di ubah karena sudah dibatalkan");
            this.btn_simpan = true;
          }
          this.Estimasi = res.data.data;
          this.Estimasi.MataUang = res.data.data.uang.Nama;
          this.Estimasi.Pelanggan = res.data.data.wo.pelanggan.Nama;
          this.Items.Barang = res.data.data.barang.map((val) => {
            val.Bekas = val.BarangBekas;
            val.Satuan = val.satuan.Nama;
            val.PartNumber1 = val.barang.PartNumber1;
            val.DiskonRp = val.Diskon;
            val.Diskon = val.Diskon1;
            val.Nama = val.barang.Nama;
            val.Merk = val.barang.Merk;
            val.Kendaraan = val.barang.Kendaraan;
            delete val.satuan;
            delete val.BarangBekas;
            delete val.barang;
            return val;
          });
          this.Items.Pekerjaan = res.data.data.pekerjaan.map((val) => {
            val.Pekerjaan = val.JenisPekerjaan;
            val.JenisPekerjaan = val.kerja.Nama;
            val.DiskonRp = val.Diskon;
            val.Diskon = val.Diskon1;
            delete val.Diskon1;
            delete val.kerja;
            return val;
          });
          this.isLoading = false;
        });
    },
    contextMenuClick(args) {
      switch (args.item.id) {
        case "UbahEstimasi":
          // alert('tampilkan form estimasi disini,')
          // this.$router.push('/Estimasi')
          if (args.rowInfo.rowData.estimasi == null) {
            alert(
              "belum ada estimasi untuk WO (" +
                args.rowInfo.rowData.KodeNota +
                ") yang dipilih silahkan tambah baru estimasi"
            );
            this.$router.push("/Estimasi");
          } else {
            this.loadEstimasi(args.rowInfo.rowData.KodeNota);
          }
          break;
        case "CloseWO":
          // this.alertClose = true
          if (confirm("Job Order finish?") == true) {
            this.contextMenuUpdateFn(
              { update: "CloseWO", CloseWO: true },
              args.rowInfo.rowData.id
            );
          }
          break;
        case "UbahTanggalMasuk/TanggalKeluar":
          if (args.rowInfo.rowData.estimasi == null) {
            alert(
              "belum ada estimasi untuk WO (" +
                args.rowInfo.rowData.KodeNota +
                ") yang dipilih silahkan tambah baru estimasi"
            );
            this.$router.push("/Estimasi");
          } else {
            this.dialog_TanggalMasukKeluar = true;
            this.idWO = args.rowInfo.rowData.id;
          }
          break;
        case "UbahTanggalKeluarFisik":
          if (args.rowInfo.rowData.estimasi == null) {
            alert(
              "belum ada estimasi untuk WO (" +
                args.rowInfo.rowData.KodeNota +
                ") yang dipilih silahkan tambah baru estimasi"
            );
            this.$router.push("/Estimasi");
          } else {
            // if (args.rowInfo.rowData.estimasi.NoTiketKeluar != null) {
            //     alert('Nomor Tiket sudah ada')
            // } else {
            this.dialog_TanggalKeluarFisik = true;
            this.idWO = args.rowInfo.rowData.id;
            // }
          }
          break;
        case "InternalWorkOrder":
          break;
        default:
          console.log("nothing context menu action");
          break;
      }
    },
    hps_items(data) {
      this.hapus_items = data;
    },
    keluhan(data) {
      this.ItemsKeluhan = data;
      console.log("keluhan dia", this.ItemsKeluhan);
    },
    rowSelectedUnit: function (args) {
      this.editedItem.Unit = args.rowData.Nama;
      this.dialogUnit = false;
    },
    rowSelectedAsuransi: function (args) {
      this.editedItem.Pelanggan = args.rowData.Nama;
      this.dialogAsuransi = false;
    },
    rowSelectedPemilik: function (args) {
      this.editedItem.Pemilik = args.rowData.Nama;
      this.dialogPemilik = false;
    },
    rowSelectedLessor: function (args) {
      this.editedItem.Lessor = args.rowData.Nama;
      this.dialogLessor = false;
    },
    rowSelectedMataUang: function (args) {
      this.editedItem.MataUang = args.rowData.Nama;
      this.dialogMataUang = false;
    },
    onDoubleClickUang: function (args) {
      this.Estimasi.MataUang = args.rowData.Nama;
      this.dialogMataUangEstimasi = false;
    },
    rowSelectedNoRangka: function (args) {
      this.editedItem.NomorRangka = args.rowData.NomorRangka;
      this.editedItem.NomorMesin = args.rowData.NomorMesin;
      this.editedItem.NomorPolisi = args.rowData.NomorPolisi;
      this.dialogNoRangka = false;
    },
    getAsuransi() {
      api.get("asuransi?token=" + this.token).then((res) => {
        this.asuransiAll = res.data.data;
        this.asuransi = res.data.data.filter((p) => p.Aktif == "1");
        this.pemilik = res.data.data.filter((p) => p.Aktif == "1");
        this.lessor = res.data.data.filter((p) => p.Aktif == "1");
      });
    },
    getMataUang() {
      api.get("/mataUangs?token=" + this.token).then(
        (res) => {
          this.DataMataUang = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getNoRangka() {
      api.get("/woRangka?token=" + this.token).then(
        (res) => {
          this.DataRangka = res.data.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getDataWo(from, to) {
      this.isLoading = true;
      api.get("workOrder/" + from + "/" + to + "/?token=" + this.token).then(
        (res) => {
          this.isLoading = false;
          this.DataWorkOrder = res.data.data;
          this.dialog_periode = false;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    rowDataBound: function (args) {
      if (args.data.Status == "BATAL") {
        args.row.classList.add("above-80");
        args.row.classList.add("edit-batal");
        args.row.classList.add("hapus-batal");
      }
    },
    change_date(a) {
      this.tanggal_awal = JSON.parse(localStorage.getItem("Periode")).find(
        (d) => d.Nama === a
      ).TglAwal;
      this.tanggal_akhir = JSON.parse(localStorage.getItem("Periode")).find(
        (d) => d.Nama === a
      ).TglAkhir;
    },
    getDataMekanik() {
      api.get("mekanik?token=" + this.token).then(
        (res) => {
          this.Mekanik = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getDataJenisPekerjaan() {
      api.get("jenisPekerjaan?token=" + this.token).then(
        (res) => {
          this.JenisPekerjaan = res.data.data;
          console.log(this.JenisPekerjaan);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    save() {
      if (this.editedIndex == -1) {
        if (this.editedItem.Lokasi == "") {
          this.alert = true;
          this.pesan = "Lokasi tidak boleh kosong";
        } else if (this.editedItem.Pelanggan == "") {
          this.alert = true;
          this.pesan = "Pelanggan tidak boleh kosong";
        } else if (this.editedItem.ReserveOutcome === "") {
          this.alert = true;
          this.pesan = "ReserveOutcome tidak boleh kosong";
        } else if (this.editedItem.PaymentTerm === "") {
          this.alert = true;
          this.pesan = "Payment Term tidak boleh kosong";
        } else if (this.editedItem.ReserveOutcomeJasa === "") {
          this.alert = true;
          this.pesan = "ReserveOutcomeJasa tidak boleh kosong";
        } else {
          this.TambahData();
        }
      } else {
        if (this.editedItem.Lokasi == "") {
          this.alert = true;
          this.pesan = "Lokasi tidak boleh kosong";
        } else if (this.editedItem.Pelanggan == "") {
          this.alert = true;
          this.pesan = "Pelanggan tidak boleh kosong";
        } else if (this.editedItem.ReserveOutcome == "") {
          this.alert = true;
          this.pesan = "ReserveOutcome tidak boleh kosong";
        } else if (this.editedItem.PaymentTerm === "") {
          this.alert = true;
          this.pesan = "Payment Term tidak boleh kosong";
        } else if (this.editedItem.ReserveOutcomeJasa == "") {
          this.alert = true;
          this.pesan = "ReserveOutcomeJasa tidak boleh kosong";
        } else {
          this.UpdateData();
        }
      }
    },
    TambahData() {
      let Pelanggan = this.asuransi.find(
        (p) => p.Nama == this.editedItem.Pelanggan
      );
      // let Pemilik = this.pemilik.find(p => p.Nama == this.editedItem.Pemilik)
      // let Lessor = this.lessor.find(p => p.Nama == this.editedItem.Lessor)
      let MataUang = this.DataMataUang.find(
        (m) => m.Nama == this.editedItem.MataUang
      );
      this.editedItem.Pelanggan = Pelanggan.Kode;
      this.editedItem.SellTo = Pelanggan.Kode;
      // this.editedItem.Pemilik = Pemilik.Kode
      // this.editedItem.Lessor = Lessor.Kode
      this.editedItem.MataUang = MataUang.Kode;
      // this.editedItem.keluhan = this.ItemsKeluhan
      this.editedItem.Unit =
        this.editedItem.Unit == ""
          ? ""
          : this.Unit.find((p) => p.Nama == this.editedItem.Unit).Kode;
      api
        .post("/workOrder?token=" + this.token, this.editedItem)
        .then(() => {
          this.close();
          this.getDataWo(this.tanggal_awal, this.tanggal_akhir);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    UpdateData() {
      let Pelanggan = this.asuransi.find(
        (p) => p.Nama == this.editedItem.Pelanggan
      );
      // let Pemilik = this.pemilik.find(p => p.Nama == this.editedItem.Pemilik)
      // let Lessor = this.lessor.find(p => p.Nama == this.editedItem.Lessor)
      let MataUang = this.DataMataUang.find(
        (m) => m.Nama == this.editedItem.MataUang
      );
      this.editedItem.Pelanggan = Pelanggan.Kode;
      this.editedItem.SellTo = Pelanggan.Kode;
      // this.editedItem.Pemilik = Pemilik.Kode
      // this.editedItem.Lessor = Lessor.Kode
      this.editedItem.MataUang = MataUang.Kode;
      // this.editedItem.keluhan = this.ItemsKeluhan
      // this.editedItem.hapus_items = this.hapus_items
      this.editedItem.Unit =
        this.editedItem.Unit == ""
          ? ""
          : this.Unit.find((p) => p.Nama == this.editedItem.Unit).Kode;
      api
        .put(
          "workOrder/" + this.editedItem.id + "?token=" + this.token,
          this.editedItem
        )
        .then(() => {
          this.close();
          this.getDataWo(this.tanggal_awal, this.tanggal_akhir);
        })
        .catch((err) => {
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
      this.title = "Kosongkan";
      this.alert = false;
      this.editedItem = Object.assign({}, this.defaultItem);
    },
    Batalin(ket) {
      api
        .put(
          "/batal-workOrder/" + this.editedItem.id + "?token=" + this.token,
          {
            keterangan: ket,
          }
        )
        .then(() => {
          this.getDataWo(this.tanggal_awal, this.tanggal_akhir);
          this.dialog_batal = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async commandClick(args) {
      if (args.target.classList.contains("Details")) {
        // console.log('disni')
        this.dialog_detail = true;
        this.isLoading = true;
        await api
          .get("workOrder/" + args.rowData.id + "?token=" + this.token)
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
              this.ItemsKeluhan = res.data.data.keluhan;
              this.editedItem = res.data.data;
              let Pelanggan = this.asuransiAll.find(
                (p) => p.Kode == res.data.data.Pelanggan
              );
              let Pemilik = this.asuransiAll.find(
                (p) => p.Kode == res.data.data.Pemilik
              );
              let MataUang = this.DataMataUang.find(
                (m) => m.Kode == res.data.data.MataUang
              );

              if (
                res.data.data.Lessor !== "" &&
                this.editedItem.Lessor != null
              ) {
                let Lessor = this.asuransiAll.find(
                  (l) => l.Kode == res.data.data.Lessor
                );
                this.editedItem.Lessor = Lessor.Nama;
              }
              this.editedItem.Pelanggan = Pelanggan.Nama;
              this.editedItem.Pemilik = Pemilik.Nama;
              this.editedItem.MataUang = MataUang.Nama;
              this.editedIndex = 1;
              this.title = "Ubah";
              this.isLoading = false;
            },
            (err) => {
              console.log(err);
            }
          );
      }
      if (args.target.classList.contains("Print")) {
        this.dialog_print = true;
        // console.log(args.rowData.estimasi.NoTiketKeluar)
        this.editedItem.estimasi = args.rowData.estimasi;
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
            await api
              .delete("/workOrder/" + args.rowData.id + "?token=" + this.token)
              .then((res) => {
                console.log(res);
                this.getDataWo(this.tanggal_awal, this.tanggal_akhir);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      } else if (args.target.classList.contains("Edit")) {
        this.dialog = true;
        this.isLoading = true;
        let period = JSON.parse(localStorage.getItem("Periode")).find(
          (d) =>
            d.Kode ===
            args.rowData.DiBuatTgl.substr(0, 4) +
              args.rowData.DiBuatTgl.substr(5, 2)
        );
        if (period.Status == 0) {
          alert("Tidak dapat di ubah karena periode sudah tutup");
          this.btn_simpan = true;
        }
        if (args.rowData.Status == "BATAL") {
          alert("Tidak dapat di ubah karena sudah dibatalkan");
          this.btn_simpan = true;
        }
        this.editedItem.id = args.rowData.id;
        this.editedItem.KodeNota = args.rowData.KodeNota;
        this.editedItem.Tanggal = args.rowData.Tanggal;
        this.editedItem.JenisWorkOrder = args.rowData.JenisWorkOrder;
        this.editedItem.Odometer = args.rowData.Odometer;
        this.editedItem.Lokasi = args.rowData.Lokasi;
        this.editedItem.PaymentTerm = args.rowData.PaymentTerm;
        this.editedItem.Pelanggan = args.rowData.pelanggan.Nama;
        this.editedItem.MataUang = args.rowData.uang.Nama;
        this.editedItem.Kurs = args.rowData.Kurs;
        this.editedItem.Referensi = args.rowData.Referensi;
        this.editedItem.Keterangan = args.rowData.Keterangan;
        this.editedItem.DPP = args.rowData.DPP;
        this.editedItem.PPn = args.rowData.PPn;
        this.editedItem.PPnPersen = args.rowData.PPnPersen;
        this.editedItem.ReserveOutcome = args.rowData.ReserveOutcome;
        this.editedItem.ReserveOutcomeJasa = args.rowData.ReserveOutcomeJasa;
        this.editedItem.Unit =
          args.rowData.unit == null ? "" : args.rowData.unit.Nama;
        this.isLoading = false;
        this.editedIndex = 1;
        this.title = "Ubah";
        // await api
        //   .get("workOrder/" + args.rowData.id + "?token=" + this.token)
        //   .then(
        //     (res) => {
        //       let period = JSON.parse(localStorage.getItem("Periode")).find(
        //         (d) =>
        //           d.Kode ===
        //           res.data.data.DiBuatTgl.substr(0, 4) +
        //             res.data.data.DiBuatTgl.substr(5, 2)
        //       );
        //       if (period.Status == 0) {
        //         alert("Tidak dapat di ubah karena periode sudah tutup");
        //         this.btn_simpan = true;
        //       }
        //       if (args.rowData.Status == "BATAL") {
        //         alert("Tidak dapat di ubah karena sudah dibatalkan");
        //         this.btn_simpan = true;
        //       }
        //       this.ItemsKeluhan = res.data.data.keluhan;
        //       this.editedItem = res.data.data;
        //       let Pelanggan = this.asuransiAll.find(
        //         (p) => p.Kode == res.data.data.Pelanggan
        //       );
        //       let Pemilik = this.asuransiAll.find(
        //         (p) => p.Kode == res.data.data.Pemilik
        //       );
        //       let MataUang = this.DataMataUang.find(
        //         (m) => m.Kode == res.data.data.MataUang
        //       );
        //       this.editedItem.Pelanggan = Pelanggan.Nama;
        //       this.editedItem.Pemilik = Pemilik.Nama;
        //       this.editedItem.MataUang = MataUang.Nama;
        //       if (
        //         res.data.data.Lessor !== "" &&
        //         this.editedItem.Lessor != null
        //       ) {
        //         let Lessor = this.asuransiAll.find(
        //           (l) => l.Kode == res.data.data.Lessor
        //         );
        //         this.editedItem.Lessor = Lessor.Nama;
        //       }
        //       this.editedIndex = 1;
        //       this.title = "Ubah";
        //       this.isLoading = false;
        //     },
        //     (err) => {
        //       console.log(err);
        //     }
        //   );
      }
    },
  },
};
</script>

<style></style>
