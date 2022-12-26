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
          <v-toolbar color="primary" dark> Choose Date </v-toolbar>

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
            <v-btn
              text
              @click="getDataPembayaranPiutang(tanggal_awal, tanggal_akhir)"
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
            <strong>{{ $t("Piutang.MainTitle") }}</strong>
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
            {{ $t("Piutang.MainTitle") }}
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

          <v-dialog
            v-model="dialog_pembayaran_piutang"
            max-width="1100px"
            scrollable
            persistent
          >
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
                  <span>{{ formTitlePembayaranPiutang }}</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="closePembayaranPiutang()">
                  <v-icon>mdi-window-close</v-icon>
                </v-btn>
              </v-toolbar>

              <v-card-text>
                <v-card outlined class="mt-6">
                  <v-col>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          :disabled="true"
                          v-model="editedItem.KodeNota"
                          label="Kode Nota"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
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
                            color="blue darken-4"
                            locale="id"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          readonly
                          v-model="editedItem.Pelanggan.Nama"
                          label="Pelanggan"
                        >
                          <template v-slot:append>
                            <v-dialog
                              v-model="dialog_pilih_customer"
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
                                  <v-card-title>
                                    <span class="headline">{{
                                      formTitleCustomer
                                    }}</span>
                                  </v-card-title>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    dark
                                    text
                                    fab
                                    small
                                    @click="close_pilih_customer"
                                  >
                                    <v-icon class="mx-1"
                                      >mdi-window-close</v-icon
                                    >
                                  </v-btn>
                                </v-toolbar>

                                <v-card flat>
                                  <v-col cols="12" md="12">
                                    <v-card>
                                      <ejs-grid
                                        :dataSource="data_customer"
                                        height="200"
                                        width="100%"
                                        gridLines="Both"
                                        :pageSettings="pageSettings"
                                        :toolbar="toolbarOptions"
                                        :allowPaging="true"
                                        :allowReordering="true"
                                        :rowSelected="rowSelectedCustomer"
                                        :dataStateChange="dataStateChange"
                                        ref="ggs"
                                      >
                                        <e-columns>
                                          <e-column
                                            field="Kode"
                                            headerText="Kode"
                                            textAlign="Left"
                                            width="160"
                                          ></e-column>

                                          <e-column
                                            field="Nama"
                                            headerText="Nama"
                                            textAlign="Left"
                                            width="200"
                                          ></e-column>

                                          <e-column
                                            field="BillTo"
                                            headerText="BillTo"
                                            width="160"
                                          ></e-column>

                                          <e-column
                                            field="SellTo"
                                            headerText="SellTo"
                                            width="160"
                                          ></e-column>

                                          <e-column
                                            field="DiBuatTgl"
                                            headerText="Di Buat Tanggal"
                                            width="180"
                                          ></e-column>

                                          <e-column
                                            field="DiBuatOleh"
                                            headerText="Di Buat Oleh"
                                            width="180"
                                          ></e-column>

                                          <e-column
                                            field="DiUbahTgl"
                                            headerText="Di Ubah Tanggal"
                                            width="180"
                                          ></e-column>

                                          <e-column
                                            field="DiUbahOleh"
                                            headerText="Di Ubah Oleh"
                                            width="180"
                                          ></e-column>
                                        </e-columns>
                                      </ejs-grid>
                                    </v-card>
                                  </v-col>
                                </v-card>

                                <v-divider></v-divider>

                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    dark
                                    color="blue darken-4"
                                    @click="savePilihCustomer"
                                  >
                                    <v-icon class="mr-1">mdi-check</v-icon>
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </template>
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          v-model="editedItem.MataUang"
                          readonly
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
                                    <v-icon class="mx-1"
                                      >mdi-window-close</v-icon
                                    >
                                  </v-btn>
                                </v-toolbar>
                                <v-card flat
                                  ><!-- Tabel Data WorkOrder -->
                                  <v-col cols="12" md="12">
                                    <v-card>
                                      <ejs-grid
                                        :dataSource="mata_uang"
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

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          class="text-right"
                          v-model="editedItem.Kurs"
                          label="Kurs"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          class="text-right"
                          v-model="editedItem.Total"
                          label="Total"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          v-model="editedItem.Referensi"
                          label="Referensi"
                        ></v-text-field>
                      </v-col>

                      <!-- #Data Items Pembayaran Piutang -->
                      <v-col cols="12">
                        <v-card class="elevation-5" outlined>
                          <v-tabs
                            background-color="white"
                            color="dark"
                            slider-color="blue darken-4"
                          >
                            <v-tab>Invoice</v-tab>
                            <v-divider
                              class="mx-2"
                              color="418BE5"
                              inset
                              vertical
                            ></v-divider>
                            <v-tab>Pembayaran</v-tab>
                            <v-tab-item :eager="true">
                              <keep-alive>
                                <INVOICE
                                  v-on:ItemsINV="ItemsINV($event)"
                                  v-on:hapus_item="hps_items($event)"
                                  :data_invoice="data_invoice_all"
                                  :ItemsInvoice="items_invoice"
                                  :title="title"
                                />
                              </keep-alive>
                            </v-tab-item>
                            <v-tab-item :eager="true">
                              <keep-alive>
                                <PEMBAYARAN
                                  v-on:ItemsBYR="ItemsBYR($event)"
                                  v-on:hapus_item="hps_items($event)"
                                  :data_perkiraan="data_perkiraan_all"
                                  :ItemsPembayaran="items_pembayaran"
                                  :title="title"
                                  :totalBayar="this.editedItem.Total"
                                />
                              </keep-alive>
                            </v-tab-item>
                          </v-tabs>
                        </v-card>
                      </v-col>

                      <v-col cols="12" sm="12" md="12">
                        <v-text-field dense v-model="editedItem.Keterangan">
                          <template v-slot:prepend>
                            <div class="mr-3"><span>Keterangan</span></div>
                          </template>
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-card>
              </v-card-text>

              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
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

        <!-- table Pembayaran Piutang -->
        <div id="app">
          <ejs-grid
            :height="mobile ? '43vh' : 'auto'"
            width="100%"
            gridLines="Both"
            :dataSource="DataPembayaranPiutang"
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
            :commandClick="commandClick"
            :rowDataBound="rowDataBound"
            ref="grid"
            :allowExcelExport="true"
            :toolbar="toolbarOptions"
            :toolbarClick="toolbarClick"
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
                field="customer.Nama"
                headerText="Pelanggan"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="MataUang"
                headerText="Mata Uang"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Kurs"
                headerText="Kurs"
                textAlign="Left"
                type="number"
                format="N"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Total"
                headerText="Total"
                type="number"
                format="N"
                textAlign="Left"
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
                headerText="Keterangan Status"
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
                headerText="Jumlah Cetak"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiBuatTgl"
                headerText="Di Buat Tanggal"
                textAlign="Left"
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
                textAlign="Left"
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

    <!-- dialog_batal -->
    <v-dialog
      v-model="dialog_batal"
      transition="dialog-bottom-transition"
      max-width="400"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title> Batal Pembayaran Piutang </v-toolbar-title>
          </v-toolbar>
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
                  v-model="editedItem.Tanggal"
                  readonly
                  label="Tanggal"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12" sm="12">
                <v-text-field
                  v-model="editedItem.Pelanggan.Nama"
                  readonly
                  label="Tanggal"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12" sm="12">
                <v-text-field
                  v-model="editedItem.MataUang"
                  readonly
                  label="Tanggal"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12" sm="12">
                <v-text-field
                  v-model="editedItem.Kurs"
                  readonly
                  label="Kurs"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12" sm="12">
                <v-text-field
                  v-model="editedItem.Total"
                  readonly
                  label="Total"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12" sm="12">
                <v-text-field
                  v-model="editedItem.Referensi"
                  readonly
                  label="Referensi"
                ></v-text-field>
              </v-col>
            </v-row>

            <strong class="text-h5"><b>Invoice</b></strong>
            <v-row no-gutters class="ml-n3 mr-n3 mb-6">
              <INVOICE
                v-on:ItemsINV="ItemsINV($event)"
                v-on:hapus_item="hps_items($event)"
                :data_invoice="data_invoice_all"
                :ItemsInvoice="items_invoice"
                :title="title"
              />
            </v-row>

            <strong class="text-h5"><b>Pembayaran</b></strong>
            <v-row no-gutters class="ml-n3 mr-n3">
              <PEMBAYARAN
                v-on:ItemsBYR="ItemsBYR($event)"
                v-on:hapus_item="hps_items($event)"
                :data_perkiraan="data_perkiraan_all"
                :ItemsPembayaran="items_pembayaran"
                :title="title"
                :totalBayar="this.editedItem.Total"
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
  </div>
</template>

<script>
import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import api from "../services/http";
import INVOICE from "../views/PembayaranPiutang/invoice.vue";
import PEMBAYARAN from "../views/PembayaranPiutang/pembayaran.vue";
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

export default {
  name: "PembayaranPiutang",
  components: { INVOICE, PEMBAYARAN, Loading },
  data() {
    return {
      alert: false,
      pesan: "",
      dialog_detail: false,
      ScrollKeAtas: false,
      mobile: null,
      windowSize: { x: 0, y: 0 },
      Namapelanggan: null,
      keterangan_batal: "",
      items_invoice: null,
      items_pembayaran: null,
      data_invoice_all: [],
      data_perkiraan_all: [],
      isLoading: false,
      fullPage: true,
      dialog_batal: false,
      dialog_print: false,
      dialog_periode: true,
      printOutItems: [],
      dialog_pilih_customer: false,
      reportDesign: null,
      dialog_pembayaran_piutang: false,
      MenuTanggalAwal: false,
      MenuTanggalAkhir: false,
      tanggal_awal: "",
      tanggal_akhir: "",
      ItemsInvoice: null,
      DataINV: [],
      // DataBYR:[],
      ItemsPembayaran: [],
      items_periode: [],
      DataPembayaranPiutang: [],
      data_customer: [],
      dialogMataUang: false,
      mata_uang: [],
      action: null,
      btn_tambah: true,
      btn_simpan: false,
      editedIndex: -1,
      editedItem: {
        KodeNota: "",
        Pelanggan: "",
        MataUang: "Rupiah",
        Kurs: 1,
        Total: "0",
        Referensi: "",
        Keterangan: "",
        Tanggal: new Date().toISOString().substr(0, 10),
      },
      defaultItem: {
        KodeNota: "",
        Pelanggan: "",
        MataUang: "Rupiah",
        Kurs: 1,
        Total: "0",
        Referensi: "",
        Keterangan: "",
        Tanggal: new Date().toISOString().substr(0, 10),
      },

      hapus_items: [],
      title: null,
      MenuTanggal: false,
      date: new Date().toISOString().substr(0, 10),
      token: localStorage.getItem("token"),
      commands: [],
      commandsMobile: [
        { buttonOption: { content: "Details", cssClass: "e-flat Details" } },
      ],
      btn_datagrid: true,
      groupSettings: { allowRecording: true },
      selectionOptions: { type: "Multiple" },
      toolbarOptions: ["Search", "ExcelExport"],
      pageSettings: {
        pageSize: 10,
        pageSizes: ["5", "10", "15", "20", "50", "All"],
      },
      filterOptions: { type: "Menu" },
      filter: { type: "CheckBox" },
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
      this.autotanggal();
      this.btn_datagrid = false;
      this.tanggal_awal = JSON.parse(
        localStorage.getItem("Periode")
      )[0].TglAwal;
      this.tanggal_akhir = JSON.parse(
        localStorage.getItem("Periode")
      )[0].TglAkhir;
      this.getDataPembayaranPiutang(
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
        title: "Hapus",
        buttonOption: {
          cssClass: "e-flat Delete",
          iconCss: "e-delete e-icons",
        },
      });
    }
    this.getDataPerkiraan();
    this.getDataCustomer(0, 100, undefined, undefined);
    this.getDataMataUang();
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

    dialog_pembayaran_piutang(val) {
      val || this.closePembayaranPiutang();
    },

    dialog_pilih_customer(val) {
      val || this.close_pilih_customer();
    },
  },

  computed: {
    formTitlePembayaranPiutang() {
      return this.editedIndex === -1
        ? "Tambah Pembayaran Piutang"
        : "Ubah Pembayaran Piutang";
    },

    formTitleCustomer() {
      return this.editedIndex === -1 ? "Pilih Pelanggan" : "Ubah Pelanggan";
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
      console.log(this.reportDesign);
      var rute = {
        name: this.reportDesign.id.substr(1),
      };
      console.log(rute);
      await api
        .get("report-piutang/" + this.editedItem.id + "?token=" + this.token)
        .then(
          (res) => {
            // console.log(res)
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
    onDoubleClickUang: function (args) {
      this.editedItem.MataUang = args.rowData.Nama;
      this.dialogMataUang = false;
    },
    ItemsINV(val) {
      this.DataINV = val;
      this.editedItem.Total = this.DataINV.reduce(
        (a, b) => a + parseFloat(b.Jumlah),
        0
      ).toString();
    },
    rowDataBound: function (args) {
      if (args.data.Status == "BATAL") {
        args.row.classList.add("above-80");
        args.row.classList.add("edit-batal");
        args.row.classList.add("hapus-batal");
      }
    },

    Batalin(val) {
      api
        .put("/batal-piutang/" + this.editedItem.id + "?token=" + this.token, {
          keterangan: val,
        })
        .then((res) => {
          console.log(res);
          this.getDataPembayaranPiutang(this.tanggal_awal, this.tanggal_akhir);
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialog_batal = false;
      this.keterangan_batal = "";
    },

    getDataPembayaranPiutang(from, to) {
      this.isLoading = true;
      api.get("/piutang/" + from + "/" + to + "?token=" + this.token).then(
        (res) => {
          this.isLoading = false;
          this.dialog_periode = false;
          this.DataPembayaranPiutang = res.data.data;
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
        }
      );
    },

    getDataPerkiraan() {
      api.get("/coa?token=" + this.token).then(
        (res) => {
          this.data_perkiraan_all = res.data.filter(
            (data) => data.IsDetail != false && data.Aktif != false
          );
          this.data_perkiraan_all = res.data.filter((data) => data.Nama);
        },
        (err) => {
          console.log(err);
        }
      );
    },

    getDataCustomer(skip, take, sort, filter) {
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
            let dataCus = {};
            dataCus.count = res.data.count;
            dataCus.result = res.data.result.map((d) => {
              d.Aktif = d.Aktif === "1";
              return d;
            });
            this.data_customer = dataCus;
          },
          (err) => {
            console.log(err);
          }
        );
    },

    dataStateChange: function (state) {
      if (state.action.requestType === "paging") {
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
              this.data_customer = res.data;
            });
        } else if (state.search == undefined) {
          this.getDataCustomer(
            state.skip,
            state.take,
            this.sorted != null ? this.sorted : undefined,
            undefined
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
        this.getDataCustomer(state.skip, state.take, this.sorted);
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
          .get("customers?token=" + this.token + "&dist=" + queryString)
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
        this.getDataCustomer(state.skip, state.take, undefined, this.filter);
        this.$refs.ggs.clearFiltering();
      }
      if (state.action.action === "clear-filter") {
        this.getDataCustomer(
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
          this.getDataCustomer(0, 100);
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
              this.data_customer = res.data;
            });
        } else {
          this.$refs.ggs.$el.ej2_instances[0].pageSettings.currentPage = 1;
        }
      }
    },

    getDataMataUang() {
      api.get("mataUangs?token=" + this.token).then(
        (res) => {
          this.mata_uang = res.data;
          this.editedItem.mata_uang = this.mata_uang[0].Nama;
          this.defaultItem.mata_uang = this.mata_uang[0].Nama;
          this.editedItem.kurs = 1.0;
          this.defaultItem.kurs = 1.0;
        },
        (err) => {
          console.log(err);
        }
      );
    },

    rowSelectedCustomer: function (args) {
      this.Namapelanggan = args.data;
      this.editedItem.Pelanggan = args.data;
    },

    close_pilih_customer() {
      this.dialog_pilih_customer = false;
    },

    async savePilihCustomer() {
      this.title = "Tambah";
      await api
        .post("piutang-invoice?token=" + this.token, {
          pelanggan: this.Namapelanggan.Kode,
        })
        .then((res) => {
          this.items_invoice = res.data.data.map((d) => {
            d.SisaBayar = parseFloat(d.SisaBayar);
            d.Jumlah = 0;
            return d;
          });
        })
        .catch((err) => {
          console.log(err);
        });
      this.close_pilih_customer();
    },

    ItemsBELI(data) {
      this.DataBELI = data;
      console.log("invoice", data);
    },

    ItemsBYR(data) {
      this.DataBYR = data;
      console.log("perkiraan", data);
    },

    save() {
      if (this.editedIndex == -1) {
        if (this.editedItem.Pelanggan == "") {
          this.alert = true;
          this.pesan = "Pelanggan tidak boleh kosong";
        } else if (this.DataBYR.length == 0) {
          this.alert = true;
          this.pesan = "Items pembayaran tidak boleh kosong";
        } else {
          this.TambahData();
        }
      } else {
        this.UpdateData();
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

    autotanggal() {
      this.editedItem.tanggal = this.date;
    },

    hps_items(data) {
      // console.log("data", data);
      // data.forEach((element) => {
      //   this.hapus_items.push(element.id);
      // });
      // console.log("hpsitems", this.hapus_items);
      this.hapus_items = data;
    },

    closePembayaranPiutang() {
      this.$nextTick(() => {
        this.title = "Kosongkan";
        this.editedIndex = -1;
        this.editedItem = Object.assign({}, this.defaultItem);
        this.autotanggal();
        this.btn_simpan = false;
        this.dialog_pembayaran_piutang = false;
      });
    },

    TambahData() {
      this.isLoading = true;
      this.editedItem.invoice = this.DataINV;
      this.editedItem.pembayaran = this.DataBYR;
      let TotalBayar = this.DataBYR.reduce(
        (a, b) => a + parseFloat(b.Jumlah),
        0
      );
      if (TotalBayar == parseFloat(this.editedItem.Total)) {
        this.editedItem.Pelanggan = this.editedItem.Pelanggan.Kode;
        this.editedItem.MataUang = this.mata_uang.find(
          (m) => m.Nama == this.editedItem.MataUang
        ).Kode;
        api
          .post("/piutang?token=" + this.token, this.editedItem)
          .then(() => {
            this.isLoading = false;
            this.closePembayaranPiutang();
            this.getDataPembayaranPiutang(this.tanggal_awal, this.tanggal_akhir);
          })
  
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Total Pembayaran dan Total Hutang yg akan dibayar tidak sama");
        this.isLoading = false;
      }
    },

    UpdateData() {
      this.isLoading = true;
      this.editedItem.invoice = this.DataINV;
      this.editedItem.pembayaran = this.DataBYR.filter(
        (v) => v.KodeNota != undefined
      );
      this.editedItem.newItemsPembayaran = this.DataBYR.filter(
        (v) => v.KodeNota == undefined
      );
      let TotalBayar = this.DataBYR.reduce(
        (a, b) => a + parseFloat(b.Jumlah),
        0
      );
      this.editedItem.hapus_items = this.hapus_items;
      if (TotalBayar == parseFloat(this.editedItem.Total)) {
        api
          .put(
            "/piutang/" + this.editedItem.id + "?token=" + this.token,
            this.editedItem
          )
          .then(() => {
            this.isLoading = false;
            this.hapus_items = [];
            this.closePembayaranPiutang();
            this.getDataPembayaranPiutang(
              this.tanggal_awal,
              this.tanggal_akhir
            );
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Total Pembayaran dan Total Piutang yg akan dibayar tidak sama");
        this.isLoading = false;
      }
    },

    commandClick: function (args) {
      if (args.target.classList.contains("Details")) {
        console.log("disni");
        this.isLoading = true;
        api.get("piutang/" + args.rowData.id + "?token=" + this.token).then(
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
            this.editedItem = res.data.data;
            this.editedItem.Pelanggan = res.data.data.customer;
            this.items_pembayaran = res.data.data.itemspembayaran.map((p) => {
              p.Nama = p.perkiraan.Nama;
              return p;
            });
            this.items_invoice = res.data.data.itemsinvoice.map((p) => {
              p.TotalBayar = p.invoice.TotalBayar;
              p.SisaBayar = p.invoice.SisaBayar;
              p.OnRisk = p.invoice.OnRisk;
              p.KodeNotaMaster = p.KodeNota;
              p.KodeNota = p.invoice.KodeNota;
              p.wo = p.invoice.wo;
              return p;
            });
            this.isLoading = false;
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
        if (args.rowData.status == null) {
          var b = confirm("Anda yakin membatalkan transaksi ini?");
          if (b == true) {
            this.editedItem.id = args.rowData.id;
            this.dialog_batal = true;
          }
        } else {
          var r = confirm("Yakin Hapus Data?");
          if (r == true) {
            api
              .delete("/piutang/" + args.rowData.id + "?token=" + this.token)
              .then(() => {
                this.getDataPembayaranPiutang(
                  this.tanggal_awal,
                  this.tanggal_akhir
                );
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      } else if (args.target.classList.contains("Edit")) {
        this.isLoading = true;
        api.get("piutang/" + args.rowData.id + "?token=" + this.token).then(
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
            this.editedItem = res.data.data;
            this.editedItem.Pelanggan = res.data.data.customer;
            this.items_pembayaran = res.data.data.itemspembayaran.map((p) => {
              p.Nama = p.perkiraan.Nama;
              p.Jumlah = parseFloat(p.Jumlah);
              return p;
            });
            this.items_invoice = res.data.data.itemsinvoice.map((p) => {
              p.Jumlah = parseFloat(p.Jumlah);
              p.TotalBayar = parseFloat(p.invoice.TotalBayar);
              p.SisaBayar = parseFloat(p.invoice.SisaBayar) + p.Jumlah;
              // p.OnRisk = p.invoice.OnRisk;
              p.KodeNotaMaster = p.KodeNota;
              p.KodeNota = p.invoice.KodeNota;
              // p.wo = p.invoice.wo;
              return p;
            });
            this.isLoading = false;
          },
          (err) => {
            console.log(err);
          }
        );
        this.editedIndex = 1;
        this.title = "Ubah";
        this.dialog_pembayaran_piutang = true;
      }
    },
  },
};
</script>

<style>
/* Text ada di kanan */
/* .text-right input {
    text-align: right
  }
  .edit-batal .e-icons.e-edit{
    color: #26A69A;
  }
  .hapus-batal .e-icons.e-delete{
    color: #EF5350;
  }
  .e-grid .e-row.above-80 .e-rowcell {
    background-color: rgb(0, 31, 61);
    color: rgb(167, 232, 202); 
    font-weight: bold; 
  } */
</style>
