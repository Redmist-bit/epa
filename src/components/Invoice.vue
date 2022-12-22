<template>
  <div v-resize="onResize">
    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
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
            <v-btn text @click="getDataInvoice(tanggal_awal, tanggal_akhir)"
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
            <strong>{{ $t("IPO.Invoice") }}</strong>
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
            {{ $t("Inv.MainTitle") }}
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
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                        :disabled="true"
                        v-model="editedItem.KodeNota"
                        label="Kode Nota"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                        v-model="editedItem.MataUang"
                        label="Mata Uang"
                      >
                        <template v-slot:append>
                          <v-dialog
                            v-model="dialogMataUang"
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
                                  @click="dialogMataUang = false"
                                >
                                  <v-icon class="mx-1">mdi-window-close</v-icon>
                                </v-btn>
                              </v-toolbar>
                              <v-card flat
                                ><!-- Tabel Data WorkOrder -->
                                <v-col cols="12" md="12">
                                  <v-card>
                                    <ejs-grid
                                      :dataSource="MataUang"
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
                              <!-- <v-divider></v-divider>
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                dark
                                                                color="blue darken-4"
                                                                @click="savePilihWorkOrder">
                                                            <v-icon class="mr-1">mdi-check</v-icon>Pilih
                                                            </v-btn>
                                                        </v-card-actions> -->
                            </v-card>
                          </v-dialog>
                        </template>
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
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                        v-model="editedItem.Kurs"
                        label="Kurs"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                        v-model="editedItem.Pelanggan"
                        label="Pelanggan"
                        readonly
                      >
                        <template v-slot:append>
                          <v-dialog
                            v-model="dialogPemilik"
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
                                  @click="dialogPemilik = false"
                                >
                                  <v-icon class="mx-1">mdi-window-close</v-icon>
                                </v-btn>
                              </v-toolbar>
                              <v-card flat>
                                <v-col cols="12" md="12">
                                  <v-card>
                                    <ejs-grid
                                      :pageSettings="pageSettings"
                                      :dataSource="pemilik"
                                      height="200"
                                      width="100%"
                                      gridLines="Both"
                                      :allowResizing="true"
                                      :allowPaging="true"
                                      :toolbar="toolbarOptions"
                                      :recordDoubleClick="rowSelectedPemilik"
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
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                        v-model="editedItem.Referensi"
                        label="Referensi"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                        v-model="editedItem.NomorWO"
                        label="Nomor WO"
                      >
                        <template v-slot:append>
                          <v-dialog
                            v-model="dialogWorkOrder"
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
                                  <span class="headline">{{
                                    formTitleWorkOrder
                                  }}</span>
                                </v-card-title>
                                <v-spacer></v-spacer>
                                <v-btn
                                  dark
                                  text
                                  fab
                                  small
                                  @click="dialogWorkOrder = false"
                                >
                                  <v-icon class="mx-1">mdi-window-close</v-icon>
                                </v-btn>
                              </v-toolbar>
                              <v-card flat
                                ><!-- Tabel Data WorkOrder -->
                                <v-col cols="12" md="12">
                                  <v-card>
                                    <ejs-grid
                                      :dataSource="WorkOrder"
                                      height="200"
                                      width="100%"
                                      :toolbar="toolbarOptions"
                                      :dataStateChange="dataStateChange"
                                      :allowReordering="true"
                                      :allowResizing="true"
                                      :allowPaging="true"
                                      :pageSettings="pageSettings"
                                      ref="ggs"
                                      :recordDoubleClick="onDoubleClick"
                                    >
                                      <e-columns>
                                        <e-column
                                          field="KodeNota"
                                          headerText="Nomor Wo"
                                          textAlign="Left"
                                          width="190"
                                        ></e-column>
                                        <e-column
                                          field="pelanggan.Nama"
                                          headerText="Pelanggan"
                                          width="100"
                                        ></e-column>
                                        <e-column
                                          field="pemilik.Nama"
                                          headerText="Pemilik"
                                          width="100"
                                        ></e-column>
                                        <e-column
                                          field="NomorRangka"
                                          headerText="Nomor Rangka"
                                          width="100"
                                        ></e-column>
                                        <e-column
                                          field="NomorMesin"
                                          headerText="Nomor Mesin"
                                          width="100"
                                        ></e-column>
                                        <e-column
                                          field="NomorPolisi"
                                          headerText="Nomor Polisi"
                                          width="100"
                                        ></e-column>
                                      </e-columns>
                                    </ejs-grid>
                                  </v-card>
                                </v-col>
                              </v-card>
                              <v-divider></v-divider>
                              <!-- <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                dark
                                                                color="blue darken-4"
                                                                @click="savePilihWorkOrder">
                                                            <v-icon class="mr-1">mdi-check</v-icon>Pilih
                                                            </v-btn>
                                                        </v-card-actions> -->
                            </v-card>
                          </v-dialog>
                        </template>
                      </v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" md="6" sm="6">
                      <v-text-field
                        v-model="editedItem.KAss"
                        label="KAss"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                        v-model="editedItem.NomorRangka"
                        label="Nomor Rangka"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                        v-model="editedItem.KTtg"
                        label="KTtg"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                        v-model="editedItem.NomorMesin"
                        label="Nomor Mesin"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                        v-model="editedItem.Ddtb"
                        label="Ddtb"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                        v-model="editedItem.NomorPolisi"
                        label="Nomor Polisi"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                        v-model="editedItem.KPpn"
                        label="KPpn"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                        v-model="editedItem.Odometer"
                        label="Odometer"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                        v-model="editedItem.Kexc"
                        label="Kexc"
                      ></v-text-field>
                    </v-col> -->
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                        v-model="editedItem.PaymentTerm"
                        label="Payment Term"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" md="6" sm="6">
                      <v-text-field
                        v-model="editedItem.Kund"
                        label="Kund"
                      ></v-text-field>
                    </v-col> -->
                    <!-- <v-col cols="12">
                      <v-btn @click="loadEstimasi"
                        >Load Estimasi Terakhir</v-btn
                      >
                    </v-col> -->
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
                                v-bind:title="title"
                                v-bind:perkiraan="DataPerkiraan"
                                v-on:itemsBarang="itemsBarang($event)"
                                v-on:hpsBarang="hpsBrg($event)"
                                v-bind:loadEstimasiBarang="Items.Barang"
                              />
                            </keep-alive>
                          </v-tab-item>
                          <v-tab-item :eager="true">
                            <keep-alive>
                              <Pekerjaan
                                v-bind:title="title"
                                v-bind:perkiraan="DataPerkiraan"
                                v-on:itemsKerja="itemsKerja($event)"
                                v-on:hpsPekerjaan="hpsKrj($event)"
                                v-bind:loadEstimasiPekerjaan="Items.Pekerjaan"
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

        <div id="app">
          <ejs-grid
            :dataSource="DataInvoice"
            :height="mobile ? '43vh' : 'auto'"
            width="100%"
            gridLines="Both"
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
            :toolbar="toolbarOptionsInv"
            :rowDataBound="rowDataBound"
            :commandClick="commandClick"
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
                width="115"
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
                width="180"
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
                field="wo.JenisWorkOrder"
                :allowEditing="false"
                headerText="Jenis Work Order"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="wo.Lokasi"
                :allowEditing="false"
                headerText="Lokasi"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="wo.Keterangan"
                :allowEditing="false"
                headerText="Ket WO"
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
                field="wo.pemilik.Nama"
                :allowEditing="false"
                headerText="Nama Pemilik"
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
                field="NomorPolisi"
                :allowEditing="false"
                headerText="Nomor Polisi"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Odometer"
                :allowEditing="false"
                headerText="Odometer"
                textAlign="Left"
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
                field="NomorWO"
                :allowEditing="false"
                headerText="Nomor WO"
                textAlign="Left"
                width="200"
              ></e-column>

              <e-column
                :filter="filter"
                field="PaymentTerm"
                :allowEditing="false"
                headerText="Payment Term"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Total"
                type="number"
                format="N"
                :allowEditing="false"
                headerText="Total"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Diskon"
                :allowEditing="false"
                type="number"
                format="N"
                headerText="Diskon"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DPP"
                type="number"
                format="N"
                :allowEditing="false"
                headerText="DPP"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="PPn"
                type="number"
                format="N"
                :allowEditing="false"
                headerText="PPn"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="PPnPersen"
                :allowEditing="false"
                headerText="PPn Persen"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="PPnPersenManual"
                :allowEditing="false"
                headerText="PPn Persen Manual"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="OnRisk"
                :allowEditing="false"
                headerText="On Risk"
                textAlign="Left"
                type="number"
                format="N"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="TotalBayar"
                type="number"
                format="N"
                :allowEditing="false"
                headerText="Total Bayar"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Nett"
                type="number"
                format="N"
                :allowEditing="false"
                headerText="Nett"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Terbayar"
                type="number"
                format="N"
                :allowEditing="false"
                headerText="Terbayar"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="SisaBayar"
                type="number"
                format="N"
                :allowEditing="false"
                headerText="Sisa Bayar"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="KAss"
                type="number"
                format="N"
                :allowEditing="false"
                headerText="KAss"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="KTtg"
                type="number"
                format="N"
                :allowEditing="false"
                headerText="KTtg"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Ddtb"
                type="number"
                format="N"
                :allowEditing="false"
                headerText="Ddtb"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="KPpn"
                type="number"
                format="N"
                :allowEditing="false"
                headerText="KPpn"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Kexc"
                type="number"
                format="N"
                :allowEditing="false"
                headerText="Kexc"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Kund"
                type="number"
                format="N"
                :allowEditing="false"
                headerText="Kund"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="MataUang"
                :allowEditing="false"
                headerText="MataUang"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Kurs"
                :allowEditing="false"
                headerText="Kurs"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Referensi"
                :allowEditing="false"
                headerText="Referensi"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="KeteranganPenagihan"
                :allowEditing="false"
                headerText="Keterangan Penagihan"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="PIC"
                :allowEditing="false"
                headerText="PIC"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="InfoPemilik"
                :allowEditing="false"
                headerText="Info Pemilik"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="NoFakturPajak"
                :allowEditing="actionEdit"
                :customAttributes="columnEdit"
                headerText="No Faktur Pajak"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="TglKirim"
                :allowEditing="actionEdit"
                type="date"
                editType="datepickeredit"
                :customAttributes="columnEdit"
                headerText="Tgl Kirim"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="TglKonfirmasiTerima"
                type="date"
                editType="datepickeredit"
                :allowEditing="actionEdit"
                :customAttributes="columnEdit"
                headerText="Tgl Konfirmasi Terima"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="NoResi"
                :allowEditing="actionEdit"
                :customAttributes="columnEdit"
                headerText="No Resi"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="JumlahCetak"
                :allowEditing="false"
                headerText="Jumlah Cetak"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="TanggalMasuk"
                :allowEditing="false"
                headerText="Tanggal Masuk"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="TanggalKeluar"
                :allowEditing="false"
                headerText="Tanggal Keluar"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="WriteOff"
                :allowEditing="false"
                headerText="Write Off"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiBuatTgl"
                :allowEditing="false"
                headerText="DiBuatTgl"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiBuatOleh"
                :allowEditing="false"
                headerText="DiBuatOleh"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiUbahTgl"
                :allowEditing="false"
                headerText="DiUbahTgl"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiUbahOleh"
                :allowEditing="false"
                headerText="DiUbahOleh"
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
                field="SellTo"
                :allowEditing="false"
                headerText="SellTo"
                textAlign="Left"
                width="180"
              ></e-column>
            </e-columns>

            <!-- <e-aggregates>
                            <e-aggregate>
                                <e-columns>
                                    <e-column type="Sum" field="Total" :FooterTemplate="footerSum"></e-column>
                                    <e-column type="Sum" field="total_bayar" :FooterTemplate="footerSum"></e-column>
                                </e-columns>
                            </e-aggregate>
                        </e-aggregates> -->
          </ejs-grid>
        </div>

        <v-dialog
          v-model="dialog_batal"
          transition="dialog-bottom-transition"
          max-width="400"
        >
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark>Batal Invoice</v-toolbar>
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
                      v-model="editedItem.MataUang"
                      readonly
                      label="Mata Uang"
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
                      v-model="editedItem.Kurs"
                      readonly
                      label="Kurs"
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
                      v-model="editedItem.Referensi"
                      readonly
                      label="Referensi"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.NomorWO"
                      readonly
                      label="Nomor WO"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.KAss"
                      readonly
                      label="KAss"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.NomorRangka"
                      readonly
                      label="Nomor Rangka"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.KTtg"
                      readonly
                      label="KTtg"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.NomorMesin"
                      readonly
                      label="NomorMesin"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.Ddtb"
                      readonly
                      label="Ddtb"
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
                      v-model="editedItem.KPpn"
                      readonly
                      label="KPpn"
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
                      v-model="editedItem.Kexc"
                      readonly
                      label="Kexc"
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
                      v-model="editedItem.Kund"
                      readonly
                      label="Kund"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <strong class="text-h5"><b>Barang</b></strong>
                <v-row no-gutters class="ml-n3 mr-n3">
                  <Barang
                    v-bind:title="title"
                    v-bind:perkiraan="DataPerkiraan"
                    v-on:itemsBarang="itemsBarang($event)"
                    v-on:hpsBarang="hpsBrg($event)"
                    v-bind:loadEstimasiBarang="Items.Barang"
                  />
                </v-row>

                <v-divider
                  class="mb-3 mt-6"
                  style="border: 1px; solid black"
                ></v-divider>

                <strong class="text-h5"><b>Pekerjaan</b></strong>
                <v-row no-gutters class="ml-n3 mr-n3">
                  <Pekerjaan
                    v-bind:title="title"
                    v-bind:perkiraan="DataPerkiraan"
                    v-on:itemsKerja="itemsKerja($event)"
                    v-on:hpsPekerjaan="hpsKrj($event)"
                    v-bind:loadEstimasiPekerjaan="Items.Pekerjaan"
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
  ExcelExport,
} from "@syncfusion/ej2-vue-grids";
import api from "../services/http";
import Barang from "../views/Invoice/Barang.vue";
import Pekerjaan from "../views/Invoice/Pekerjaan.vue";
Vue.use(GridPlugin);
export default {
  components: {
    Loading,
    Barang,
    Pekerjaan,
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
  data() {
    return {
      alert: false,
      pesan: "",
      dialog_detail: false,
      ScrollKeAtas: false,
      mobile: null,
      windowSize: { x: 0, y: 0 },
      dialogPemilik: false,
      dialogWorkOrder: false,
      dialogMataUang: false,
      MataUang: [],
      pemilik: [],
      dialog: false,
      isLoading: false,
      btn_datagrid: true,
      fullPage: true,
      MenuTanggalAwal: false,
      MenuTanggalAkhir: false,
      Menutanggal: false,
      tanggal_awal: "",
      dialog_print: false,
      reportDesign: null,
      tanggal_akhir: "",
      keterangan_batal: "",
      items_periode: [],
      WorkOrder: [],
      Items: {
        Barang: [],
        Pekerjaan: [],
      },
      dialog_periode: false,
      dialog_batal: false,
      action: null,
      btn_tambah: true,
      btn_simpan: false,
      editedIndex: -1,
      printOutItems: [],
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
        MataUang: "Rupiah",
        Kurs: 1,
        Pelanggan: "",
        Referensi: "",
        NomorWO: "",
        KAss: 0,
        NomorRangka: "",
        KTtg: 0,
        NomorMesin: "",
        Ddtb: 0,
        NomorPolisi: "",
        KPpn: 0,
        Odometer: 0,
        Kexc: 0,
        PaymentTerm: 0,
        Kund: 0,
        Keterangan: "",
        DPP: 0,
        PPnPersen: 11,
        PPn: 0,
        TotalBayar: 0,
        Tanggal: new Date().toISOString().substr(0, 10),
      },
      editedItem: {
        KodeNota: "",
        MataUang: "Rupiah",
        Kurs: 1,
        Pelanggan: "",
        Referensi: "",
        NomorWO: "",
        KAss: 0,
        NomorRangka: "",
        KTtg: 0,
        NomorMesin: "",
        Ddtb: 0,
        NomorPolisi: "",
        KPpn: 0,
        Odometer: 0,
        Kexc: 0,
        PaymentTerm: 0,
        Kund: 0,
        Keterangan: "",
        DPP: 0,
        PPnPersen: 11,
        PPn: 0,
        TotalBayar: 0,
        Tanggal: new Date().toISOString().substr(0, 10),
      },
      hapus_items: {
        Barang: [],
        Pekerjaan: [],
      },
      DataInvoice: [],
      DataPerkiraan: [],
      actionEdit: false,
      columnEdit: { class: "customcss" },
      title: null,
      idRow: "",
      rowData: [],
      token: localStorage.getItem("token"),
      commands: [],
      commandsMobile: [
        { buttonOption: { content: "Details", cssClass: "e-flat Details" } },
      ],
      groupSettings: { allowReordering: true },
      selectionOptions: { type: "Multiple" },
      toolbarOptions: ["Search", "ExcelExport"],
      toolbarOptionsInv: ["Search", "ExcelExport", "Update", "Cancel"],
      pageSettings: {
        pageSize: 5,
        pageSizes: ["5", "10", "15", "20", "50", "All"],
      },
      filterOptions: { type: "Menu" },
      filter: { type: "Excel" },
      editSettings: {
        showDeleteConfirmDialog: true,
        allowEditing: true,
        allowAdding: false,
        allowDeleting: false,
        mode: "Batch",
      },
    };
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
      this.getDataInvoice(
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
      this.actionEdit = true;
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
    this.getDataWo(0, 100);
    this.getDataMataUang();
    this.getPerkiraan();
    this.getAsuransi();
  },
  created() {
    // get actions for this page
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
        (this.toolbarOptionsInv = ["Search"]), (this.titleClass = "d-none");
        this.mobile = false;
      } else {
        (this.toolbarOptionsInv = [
          "Search",
          "ExcelExport",
          "Update",
          "Cancel",
        ]),
          (this.titleClass = "mr-4");
        this.mobile = true;
      }
    },

    dialog(val) {
      val || this.close();
    },
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
        // console.log(totalPekerjaan)
        let PPn =
          (parseFloat(totalPekerjaan + totalBarang) *
            parseFloat(this.editedItem.PPnPersen)) /
          100;
        this.editedItem.Diskon =
          val.Barang.reduce((a, b) => a + parseFloat(b.DiskonRp), 0) +
          val.Pekerjaan.reduce((a, b) => a + parseFloat(b.DiskonRp), 0);
        this.editedItem.DPP = totalBarang + totalPekerjaan;
        this.editedItem.Total = this.editedItem.Diskon + this.editedItem.DPP;
        // console.log(this.editedItem.Total)
        this.editedItem.PPn = PPn;
        this.editedItem.TotalBayar = totalBarang + totalPekerjaan + PPn;
      },
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Invoice" : "Ubah Invoice";
    },
    formTitleWorkOrder() {
      return this.editedIndex === -1 ? "Tambah Nomer WO" : "Ubah Nomer WO";
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

    beforeBatchSave(args) {
      this.idRow = args.batchChanges.changedRecords
        .map((a) => {
          return a.id;
        })
        .toString();
      this.rowData = args.batchChanges.changedRecords;
    },
    onActionComplete(args) {
      if (args.requestType === "batchsave") {
        this.UpdateDataGrid(this.idRow, this.rowData);
      }
    },
    UpdateDataGrid(id, data) {
      this.isLoading = true;
      api
        .put("invoice-batch/" + id + "?token=" + this.token, { rowData: data })
        .then(() => {
          this.isLoading = false;
          this.getDataInvoice(this.tanggal_awal, this.tanggal_akhir);
        })
        .catch((err) => {
          console.log(err);
        });
      this.idRow = "";
      this.rowData = [];
    },
    toolbarClick: function (args) {
      // console.log(args)
      if (args.item.text === "Excel Export") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.ggs.excelExport();
      }
    },
    async getDataPrint() {
      // console.log(this.reportDesign)
      var rute = {
        name: this.reportDesign.id.substr(1),
      };
      await api
        .put("report-inv/" + this.editedItem.id + "?token=" + this.token, {
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
    },
    change_print(a) {
      this.reportDesign = a;
    },
    getPerkiraan() {
      api.get("invoice-perkiraan?token=" + this.token).then(
        (res) => {
          this.DataPerkiraan = res.data.map((element) => {
            return {
              id: element.id,
              Kode: element.Kode,
              Nama: element.Nama,
              IsDetail: element.IsDetail,
              Sifat: element.Sifat,
              Aktif: element.Aktif,
              Memo: element.Memo,
              AccNo: element.Kode.substring(5, 13),
              Deskripsi: element.Nama,
            };
          });
        },
        (err) => {
          console.log(err);
        }
      );
    },
    rowSelectedPemilik: function (args) {
      this.editedItem.Pelanggan = args.rowData.Nama;
      this.dialogPemilik = false;
    },
    getAsuransi() {
      api.get("asuransi?token=" + this.token).then((res) => {
        this.pemilik = res.data.data;
      });
    },
    getDataMataUang() {
      api.get("invoice-uang?token=" + this.token).then(
        (res) => {
          this.MataUang = res.data.mataUang;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    onDoubleClickUang: function (args) {
      this.editedItem.MataUang = args.rowData.Nama;
      this.dialogMataUang = false;
    },
    hpsKrj(data) {
      this.hapus_items.Pekerjaan = data;
    },
    hpsBrg(data) {
      this.hapus_items.Barang = data;
    },
    itemsBarang(v) {
      v.forEach((element) => {
        if (element.Perkiraan != "") {
          let findPerkiraan = this.DataPerkiraan.find(
            (f) => f.Nama == element.Perkiraan
          );
          element.KodePerkiraan =
            findPerkiraan == undefined ? "" : findPerkiraan.Kode;
        }
      });
      this.Items.Barang = v;
    },
    itemsKerja(data) {
      data.forEach((element) => {
        if (element.Perkiraan != "") {
          let findPerkiraan = this.DataPerkiraan.find(
            (f) => f.Nama == element.Perkiraan
          );
          element.KodePerkiraan =
            findPerkiraan == undefined ? "" : findPerkiraan.Kode;
        }
      });
      this.Items.Pekerjaan = data;
    },
    Tambahppn() {
      this.editedItem.PPn =
        (parseFloat(this.editedItem.DPP) *
          parseFloat(this.editedItem.PPnPersen)) /
        100;
      this.editedItem.TotalBayar = this.editedItem.DPP + this.editedItem.PPn;
    },
    change_date(a) {
      this.tanggal_awal = JSON.parse(localStorage.getItem("Periode")).find(
        (d) => d.Nama === a
      ).TglAwal;
      this.tanggal_akhir = JSON.parse(localStorage.getItem("Periode")).find(
        (d) => d.Nama === a
      ).TglAkhir;
    },
    close() {
      this.$nextTick(() => {
        this.title = "Kosongkan";
        this.isLoading = false;
        this.editedIndex = -1;
        this.editedItem = Object.assign({}, this.defaultItem);
        this.btn_simpan = false;
        this.dialog = false;
        this.hapus_items.Pekerjaan = [];
        this.hapus_items.Barang = [];
      });
      this.editedItem = Object.assign({}, this.defaultItem);
    },
    loadEstimasi() {
      api
        .get(
          "load-estimasi-inv?token=" +
            this.token +
            "&wo=" +
            this.editedItem.NomorWO
        )
        .then(
          (res) => {
            console.log(res);
            this.Items.Barang = res.data.data.barang.map((val) => {
              val.Nama = val.barang.Nama;
              val.PartNumber1 = val.barang.PartNumber1;
              val.Kendaraan = val.barang.Kendaraan;
              val.Merk = val.barang.Merk;
              val.DiskonRp = val.Diskon;
              val.Satuan = val.satuan.Nama;
              val.Diskon = val.Diskon1;
              val.SubTotal =
                val.Jumlah *
                (parseFloat(val.Harga) -
                  (parseFloat(val.Harga) * parseFloat(val.Diskon)) / 100);
              return val;
            });
            this.Items.Pekerjaan = res.data.data.pekerjaan.map((val) => {
              val.DiskonRp = val.Diskon;
              val.Pekerjaan = val.JenisPekerjaan;
              val.JenisPekerjaan = val.kerja.Nama;
              val.Diskon = val.Diskon1;
              val.Perkiraan = "";
              val.SubTotal =
                val.Jumlah *
                (parseFloat(val.Harga) -
                  (parseFloat(val.Harga) * parseFloat(val.Diskon)) / 100);
              return val;
            });
          },
          (err) => {
            console.log(err);
          }
        );
    },
    onDoubleClick: function (args) {
      // this.setFocus = args.column;
      this.editedItem.NomorWO = args.rowData.KodeNota;
      this.editedItem.NomorRangka = args.rowData.NomorRangka;
      this.editedItem.NomorMesin = args.rowData.NomorMesin;
      this.editedItem.NomorPolisi = args.rowData.NomorPolisi;
      this.editedItem.Pelanggan = args.rowData.pelanggan.Nama;
      this.editedItem.KodePelanggan = args.rowData.pelanggan.Kode;
      this.editedItem.MataUang = args.rowData.uang.Nama;
      this.dialogWorkOrder = false;
    },
    getDataWo(skip, take) {
      api
        .get(
          "invoice-wo?token=" + this.token + "&skip=" + skip + "&take=" + take
        )
        .then(
          (res) => {
            this.WorkOrder = res.data;
          },
          (err) => {
            console.log(err);
          }
        );
    },
    dataStateChange: function (state) {
      console.log(state);
      if (state.action.requestType === "paging") {
        this.skip = state.skip;
        this.take = state.take;
        if (state.search != undefined) {
          api
            .get(
              "invoice-wo?token=" +
                this.token +
                "&search=" +
                state.search[0].key +
                "&skip=" +
                state.skip +
                "&take=" +
                state.take
            )
            .then((res) => {
              this.WorkOrder = res.data;
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
              "invoice-wo?token=" +
                this.token +
                "&search=" +
                state.action.searchString +
                "&skip=" +
                0 +
                "&take=" +
                100
            )
            .then((res) => {
              this.WorkOrder = res.data;
            });
        } else {
          this.$refs.ggs.$el.ej2_instances[0].pageSettings.currentPage = 1;
        }
      }
    },
    save() {
      if (this.editedIndex == -1) {
        if (this.editedItem.Pelanggan == "") {
          this.alert = true;
          this.pesan = "Pelanggan tidak boleh kosong";
        } else {
          this.TambahData();
        }
      } else {
        this.UpdateData();
      }
    },
    getDataInvoice(from, to) {
      this.isLoading = true;
      api.get("invoice/" + from + "/" + to + "/?token=" + this.token).then(
        (res) => {
          this.DataInvoice = res.data.data;
          this.dialog_periode = false;
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    TambahData() {
      this.isLoading = true;
      this.editedItem.MataUang = this.MataUang.find(
        (d) => d.Nama == this.editedItem.MataUang
      ).Kode;
      this.editedItem.Items = this.Items;
      this.editedItem.Pelanggan = this.pemilik.find(
        (p) => p.Nama == this.editedItem.Pelanggan
      ).Kode;
      api
        .post("invoice?token=" + this.token, this.editedItem)
        .then(() => {
          this.close();
          this.getDataInvoice(this.tanggal_awal, this.tanggal_akhir);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    UpdateData() {
      this.isLoading = true;
      // this.editedItem.Items = this.Items;
      this.editedItem.hapus_items = this.hapus_items;
      this.editedItem.new_itemsBarang = this.Items.Barang.filter(
        (f) => f.KodeNota == undefined
      );
      this.editedItem.itemsBarang = this.Items.Barang.filter(
        (f) => f.KodeNota != undefined
      );
      this.editedItem.new_itemsJasa = this.Items.Pekerjaan.filter(
        (f) => f.KodeNota == undefined
      );
      this.editedItem.itemsJasa = this.Items.Pekerjaan.filter(
        (v) => v.KodeNota != undefined
      );
      api
        .put(
          "invoice/" + this.editedItem.id + "?token=" + this.token,
          this.editedItem
        )
        .then(() => {
          this.close();
          this.getDataInvoice(this.tanggal_awal, this.tanggal_akhir);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rowDataBound: function (args) {
      if (args.data.Status == "BATAL") {
        args.row.classList.add("above-80");
        args.row.classList.add("edit-batal");
        args.row.classList.add("hapus-batal");
      }
    },
    cekPelunasan(id) {
      api.get("inv/cekPelunasan/" + id + "?token=" + this.token).then(
        (res) => {
          // console.log(res.data.data)
          if (res.data.data == null) {
            this.dialog_batal = true;
          } else {
            alert("Sudah ada pelunasan");
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    commandClick: function (args) {
      if (args.target.classList.contains("Details")) {
        console.log("disni");
        this.isLoading = true;
        this.dialog_detail = true;
        api.get("/invoice/" + args.rowData.id + "?token=" + this.token).then(
          (res) => {
            let period = JSON.parse(localStorage.getItem("Periode")).find(
              (d) =>
                d.Kode ===
                res.data.data.DiBuatTgl.substr(0, 4) +
                  res.data.data.DiBuatTgl.substr(5, 2)
            );
            if (period.Status == false) {
              alert("Tidak dapat di ubah karena periode sudah tutup");
              this.btn_simpan = true;
            }
            if (args.rowData.Status == "BATAL") {
              alert("Tidak dapat di ubah karena sudah dibatalkan");
              this.btn_simpan = true;
            }
            this.editedItem = res.data.data;
            this.editedItem.MataUang = res.data.data.uang.Nama;
            this.editedItem.Pelanggan = res.data.data.wo.pelanggan.Nama;
            this.Items.Barang = res.data.data.barang.map((val) => {
              // val.Bekas = val.BarangBekas
              if (val.Perkiraan != "" || val.Perkiraan != null) {
                val.Perkiraan = val.perkiraan.Nama;
              }
              if (val.barang != null) {
                val.Satuan = val.satuan.Nama;
                val.PartNumber1 = val.barang.PartNumber1;
                val.DiskonRp = val.Diskon;
                val.Diskon = val.Diskon1;
                val.SubTotal =
                  val.Jumlah *
                  (parseFloat(val.Harga) -
                    (parseFloat(val.Harga) * parseFloat(val.Diskon)) / 100);
                val.Nama = val.barang.Nama;
                val.Merk = val.barang.Merk;
                val.Kendaraan = val.barang.Kendaraan;
                delete val.satuan;
                // delete val.BarangBekas
                delete val.barang;
              } else {
                // val.Bekas = val.BarangBekas
                val.Satuan = val.barang_s_p.Satuan;
                val.PartNumber1 = val.barang_s_p.PartNumber1;
                val.DiskonRp = val.Diskon;
                val.Diskon = val.Diskon1;
                val.SubTotal =
                  val.Jumlah *
                  (parseFloat(val.Harga) -
                    (parseFloat(val.Harga) * parseFloat(val.Diskon)) / 100);
                val.Nama = val.barang_s_p.Nama;
                val.Merk = val.barang_s_p.Merk;
                val.Kendaraan = val.barang_s_p.Kendaraan;
                delete val.satuan;
                // delete val.BarangBekas
                delete val.barang;
              }
              return val;
            });
            this.Items.Pekerjaan = res.data.data.pekerjaan.map((val) => {
              if (val.Perkiraan != "" || val.Perkiraan != null) {
                val.Perkiraan = val.perkiraan.Nama;
              }
              val.DiskonRp = val.Diskon;
              val.Diskon = val.Diskon1;
              val.JenisPekerjaan = val.kerja.Nama;
              val.SubTotal =
                val.Jumlah *
                (parseFloat(val.Harga) -
                  (parseFloat(val.Harga) * parseFloat(val.Diskon)) / 100);
              return val;
            });
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
        this.editedItem.id = args.rowData.id;
      }
      if (args.target.classList.contains("Delete")) {
        if (args.rowData.Status == null || args.rowData.Status == "") {
          var b = confirm("Anda yakin membatalkan transaksi ini?");
          if (b == true) {
            this.editedItem.id = args.rowData.id;
            this.cekPelunasan(this.editedItem.id);
          }
        } else {
          console.log("no delete");
        }
      }
      if (args.target.classList.contains("Edit")) {
        this.isLoading = true;
        this.dialog = true;
        api.get("/invoice/" + args.rowData.id + "?token=" + this.token).then(
          (res) => {
            let period = JSON.parse(localStorage.getItem("Periode")).find(
              (d) =>
                d.Kode ===
                res.data.data.DiBuatTgl.substr(0, 4) +
                  res.data.data.DiBuatTgl.substr(5, 2)
            );
            if (period.Status == false) {
              alert("Tidak dapat di ubah karena periode sudah tutup");
              this.btn_simpan = true;
            }
            if (args.rowData.Status == "BATAL") {
              alert("Tidak dapat di ubah karena sudah dibatalkan");
              this.btn_simpan = true;
            }
            this.editedItem = res.data.data;
            this.editedItem.MataUang = res.data.data.uang.Nama;
            this.editedItem.Pelanggan = res.data.data.pelanggan.Nama;
            this.Items.Barang = res.data.data.barang.map((val) => {
              // val.Bekas = val.BarangBekas
              // if (val.Perkiraan != "" || val.Perkiraan != null) {
              //   val.Perkiraan = val.perkiraan.Nama;
              // }
              if (val.barang != null) {
                val.Satuan = val.satuan.Nama;
                val.PartNumber1 = val.barang.PartNumber1;
                val.DiskonRp = val.Diskon;
                val.Diskon = val.Diskon1;
                val.SubTotal =
                  val.Jumlah *
                  (parseFloat(val.Harga) -
                    (parseFloat(val.Harga) * parseFloat(val.Diskon)) / 100);
                val.Nama = val.barang.Nama;
                val.Merk = val.barang.Merk;
                val.Kendaraan = val.barang.Kendaraan;
                delete val.satuan;
                // delete val.BarangBekas
                delete val.barang;
              } else {
                // val.Bekas = val.BarangBekas
                val.Satuan = val.barang_s_p.Satuan;
                val.PartNumber1 = val.barang_s_p.PartNumber1;
                val.DiskonRp = val.Diskon;
                val.Diskon = val.Diskon1;
                val.SubTotal =
                  val.Jumlah *
                  (parseFloat(val.Harga) -
                    (parseFloat(val.Harga) * parseFloat(val.Diskon)) / 100);
                val.Nama = val.barang_s_p.Nama;
                val.Merk = val.barang_s_p.Merk;
                val.Kendaraan = val.barang_s_p.Kendaraan;
                delete val.satuan;
                // delete val.BarangBekas
                delete val.barang;
              }
              return val;
            });
            this.Items.Pekerjaan = res.data.data.pekerjaan.map((val) => {
              if (val.Perkiraan != "" || val.Perkiraan != null) {
                val.Perkiraan = val.perkiraan.Nama;
              }
              val.DiskonRp = val.Diskon;
              val.Diskon = val.Diskon1;
              // val.JenisPekerjaan = val.kerja.Nama;
              val.SubTotal =
                val.Jumlah *
                (parseFloat(val.Harga) -
                  (parseFloat(val.Harga) * parseFloat(val.Diskon)) / 100);
              return val;
            });
            this.editedIndex = 1;
            this.title = "Ubah";
            this.isLoading = false;
          },
          (err) => {
            console.log(err);
          }
        );
      }
    },
    Batalin(ket) {
      api
        .put("/batal-invoice/" + this.editedItem.id + "?token=" + this.token, {
          keterangan: ket,
        })
        .then(() => {
          this.getDataInvoice(this.tanggal_awal, this.tanggal_akhir);
          this.dialog_batal = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    savePilihWorkOrder() {},
    rowSelectedWorkOrder() {},
  },
};
</script>

<style></style>
