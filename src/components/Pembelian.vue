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
            <v-btn text @click="getDataPembelian(tanggal_awal, tanggal_akhir)"
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
            <strong>{{ $t("Beli.MainTitle") }}</strong>
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
            {{ $t("Beli.MainTitle") }}
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
          <v-dialog
            v-model="dialogPembelian"
            max-width="1200px"
            scrollable
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
                {{ $t("All.BtnTambah") }}
              </v-btn>
            </template>
            <v-card>
              <v-toolbar dark outline class="elevation-0" color="blue darken-4">
                <v-card-title>
                  <span class="headline">{{ formTitlePembelian }}</span>
                </v-card-title>
                <v-spacer></v-spacer>
                <v-btn dark text fab small @click="closePembelian()">
                  <v-icon class="mx-1">mdi-window-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-card outlined class="mt-6">
                  <v-col>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          disabled
                          v-model="editedItem.KodeNota"
                          label="Kode Nota"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
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
                              dense
                              v-model="editedItem.Tanggal"
                              label="tanggal"
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

                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          v-model="Menutanggal_pengiriman"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              dense
                              v-model="editedItem.TanggalPengiriman"
                              label="Tanggal Pengiriman"
                              prepend-icon="mdi-calendar"
                              readonly
                              clearable
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.TanggalPengiriman"
                            @input="Menutanggal_pengiriman = false"
                            color="blue darken-4"
                            locale="id"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          readonly
                          v-model="editedItem.Supplier"
                          label="supplier"
                        >
                          <template v-slot:append>
                            <v-dialog
                              v-model="dialogPilihsupplier"
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
                                      formTitlePilihsupplier
                                    }}</span>
                                  </v-card-title>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    dark
                                    text
                                    fab
                                    small
                                    @click="closePilihsupplier"
                                  >
                                    <v-icon class="mx-1"
                                      >mdi-window-close</v-icon
                                    >
                                  </v-btn>
                                </v-toolbar>
                                <v-card flat
                                  ><!-- Tabel Data supplier -->
                                  <v-col cols="12" md="12">
                                    <v-card>
                                      <ejs-grid
                                        :dataSource="supplier"
                                        height="200"
                                        width="100%"
                                        gridLines="Both"
                                        :allowReordering="true"
                                        :rowSelected="rowSelectedSupplier"
                                        :allowSorting="true"
                                        :allowResizing="true"
                                        :allowPaging="true"
                                        :pageSettings="pageSettings"
                                        :toolbar="toolbarOptions"
                                      >
                                        <e-columns>
                                          <e-column
                                            fieldText=""
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
                                            :filter="filter"
                                            field="SellFrom"
                                            headerText="Sell From"
                                            width="170"
                                          >
                                          </e-column>

                                          <e-column
                                            field="BillFrom"
                                            headerText="Bill From"
                                            width="170"
                                          >
                                          </e-column>

                                          <e-column
                                            field="BadanHukum"
                                            headerText="Badan Hukum"
                                            width="170"
                                          >
                                          </e-column>

                                          <e-column
                                            field="Kota"
                                            headerText="Kota"
                                            width="170"
                                          >
                                          </e-column>

                                          <e-column
                                            field="Alamat"
                                            headerText="Alamat"
                                            width="170"
                                          >
                                          </e-column>

                                          <e-column
                                            field="Telp"
                                            headerText="Telp"
                                            width="170"
                                          >
                                          </e-column>

                                          <e-column
                                            field="ContactPerson"
                                            headerText="ContactPerson"
                                            width="170"
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
                                  <!-- <v-btn
                                      dark
                                      color="error"
                                      @click="closePilihsupplier">
                                      <v-icon class="mr-1">mdi-close-circle</v-icon>Batal
                                    </v-btn> -->
                                  <v-btn
                                    dark
                                    color="blue darken-4"
                                    @click="savePilihsupplier"
                                  >
                                    <v-icon class="mr-1">mdi-check</v-icon>Pilih
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </template>
                        </v-text-field>
                      </v-col>
                      <!-- Dialog supplier End -->

                      <!-- #Dialog BillFrom -->
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          readonly
                          v-model="editedItem.BillFrom"
                          label="Bill From"
                        >
                          <template v-slot:append>
                            <v-dialog
                              v-model="dialogPilihBillFrom"
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
                                      formTitlePilihBillFrom
                                    }}</span>
                                  </v-card-title>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    dark
                                    text
                                    fab
                                    small
                                    @click="closePilihBillFrom"
                                  >
                                    <v-icon class="mx-1"
                                      >mdi-window-close</v-icon
                                    >
                                  </v-btn>
                                </v-toolbar>
                                <v-card flat
                                  ><!-- Tabel Data supplier -->
                                  <v-col cols="12" md="12">
                                    <v-card>
                                      <ejs-grid
                                        :dataSource="supplier"
                                        height="200"
                                        width="100%"
                                        gridLines="Both"
                                        :allowReordering="true"
                                        :recordDoubleClick="rowSelectedBillFrom"
                                        :allowSorting="true"
                                        :allowResizing="true"
                                        :allowPaging="true"
                                        :pageSettings="pageSettings"
                                        :toolbar="toolbarOptions"
                                      >
                                        <e-columns>
                                          <e-column
                                            fieldText=""
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
                                            :filter="filter"
                                            field="SellFrom"
                                            headerText="Sell From"
                                            width="170"
                                          >
                                          </e-column>

                                          <e-column
                                            field="BillFrom"
                                            headerText="Bill From"
                                            width="170"
                                          >
                                          </e-column>

                                          <e-column
                                            field="BadanHukum"
                                            headerText="Badan Hukum"
                                            width="170"
                                          >
                                          </e-column>

                                          <e-column
                                            field="Kota"
                                            headerText="Kota"
                                            width="170"
                                          >
                                          </e-column>

                                          <e-column
                                            field="Alamat"
                                            headerText="Alamat"
                                            width="170"
                                          >
                                          </e-column>

                                          <e-column
                                            field="Telp"
                                            headerText="Telp"
                                            width="170"
                                          >
                                          </e-column>

                                          <e-column
                                            field="ContactPerson"
                                            headerText="ContactPerson"
                                            width="170"
                                          >
                                          </e-column>
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
                      </v-col>
                      <!-- Dialog BillFrom End -->

                      <!-- #Dialog SellFrom -->
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          readonly
                          v-model="editedItem.SellFrom"
                          label="Sell From"
                        >
                          <template v-slot:append>
                            <v-dialog
                              v-model="dialogPilihSellFrom"
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
                                      formTitlePilihSellFrom
                                    }}</span>
                                  </v-card-title>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    dark
                                    text
                                    fab
                                    small
                                    @click="closePilihSellFrom"
                                  >
                                    <v-icon class="mx-1"
                                      >mdi-window-close</v-icon
                                    >
                                  </v-btn>
                                </v-toolbar>
                                <v-card flat
                                  ><!-- Tabel Data supplier -->
                                  <v-col cols="12" md="12">
                                    <v-card>
                                      <ejs-grid
                                        :dataSource="supplier"
                                        height="200"
                                        width="100%"
                                        gridLines="Both"
                                        :allowReordering="true"
                                        :recordDoubleClick="rowSelectedSellFrom"
                                        :allowSorting="true"
                                        :allowResizing="true"
                                        :allowPaging="true"
                                        :pageSettings="pageSettings"
                                        :toolbar="toolbarOptions"
                                      >
                                        <e-columns>
                                          <e-column
                                            field="Nama"
                                            headerText="Nama"
                                            width="250"
                                          >
                                          </e-column>

                                          <e-column
                                            :filter="filter"
                                            field="SellFrom"
                                            headerText="Sell From"
                                            width="170"
                                          >
                                          </e-column>

                                          <e-column
                                            field="BillFrom"
                                            headerText="Bill From"
                                            width="170"
                                          >
                                          </e-column>

                                          <e-column
                                            field="BadanHukum"
                                            headerText="Badan Hukum"
                                            width="170"
                                          >
                                          </e-column>

                                          <e-column
                                            field="Kota"
                                            headerText="Kota"
                                            width="170"
                                          >
                                          </e-column>

                                          <e-column
                                            field="Alamat"
                                            headerText="Alamat"
                                            width="170"
                                          >
                                          </e-column>

                                          <e-column
                                            field="Telp"
                                            headerText="Telp"
                                            width="170"
                                          >
                                          </e-column>

                                          <e-column
                                            field="ContactPerson"
                                            headerText="ContactPerson"
                                            width="170"
                                          >
                                          </e-column>
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
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          class="centered-input"
                          @keypress="isNumber($event)"
                          v-model="editedItem.PaymentTerm"
                          label="payment_term"
                        >
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
                              </v-card>
                            </v-dialog>
                          </template>
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          class="centered-input"
                          v-model="editedItem.Kurs"
                          @keypress="isNumber($event)"
                          label="Kurs"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          clearable
                          v-model="editedItem.Referensi"
                          label="referensi"
                        >
                        </v-text-field>
                      </v-col>

                      <!-- #Dialog No. PO -->
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          readonly
                          v-model="editedItem.NoPO"
                          label="No. PO"
                        >
                          <template v-slot:append>
                            <v-dialog
                              v-model="dialogno_po"
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
                                      formTitleno_po
                                    }}</span>
                                  </v-card-title>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    dark
                                    text
                                    fab
                                    small
                                    @click="closeno_po"
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
                                        :dataSource="no_po"
                                        height="200"
                                        width="100%"
                                        gridLines="Both"
                                        :allowReordering="true"
                                        :allowSorting="true"
                                        :allowResizing="true"
                                        :allowPaging="true"
                                        :pageSettings="pageSettings"
                                        :toolbar="toolbarOptions"
                                        :rowSelected="rowSelectedno_po"
                                      >
                                        <e-columns>
                                          <e-column
                                            field="KodeNota"
                                            headerText="Kode Nota"
                                            textAlign="Left"
                                            width="180"
                                          ></e-column>
                                          <e-column
                                            field="NomorWO"
                                            headerText="Nomor WO"
                                            width="180"
                                          ></e-column>
                                          <e-column
                                            field="Tanggal"
                                            headerText="Tanggal"
                                            width="180"
                                          ></e-column>
                                          <e-column
                                            field="TanggalKirim"
                                            headerText="Tanggal Kirim"
                                            width="180"
                                          ></e-column>
                                          <e-column
                                            field="Status"
                                            headerText="Status"
                                            width="180"
                                          ></e-column>
                                          <e-column
                                            field="Keterangan"
                                            headerText="Keterangan"
                                            width="180"
                                          ></e-column>
                                          <e-column
                                            field="Referensi"
                                            headerText="Referensi"
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
                                  <!-- <v-btn
                                      dark
                                      color="error"
                                      @click="closeno_po">
                                      <v-icon class="mr-1">mdi-close-circle</v-icon>Batal
                                    </v-btn> -->
                                  <v-btn
                                    dark
                                    :disabled="btn_po"
                                    color="blue darken-4"
                                    @click="savePilihno_po"
                                  >
                                    <v-icon class="mr-1">mdi-check</v-icon>Pilih
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </template>
                        </v-text-field>
                      </v-col>

                      <!-- <v-col cols="12" sm="6" md="4">
                        <v-switch 
                          dense
                          class="mt-2"
                          label="Cek Fisik Inv"
                          color="blue darken-4"
                          v-model="editedItem.CekFisikInv"
                          true-value=true
                          false-value=false
                        >
                        </v-switch>
                      </v-col> -->

                      <!-- #Data Items Pembelian -->
                      <v-col cols="12">
                        <v-card class="elevation-5" outlined>
                          <v-tabs
                            background-color="white"
                            color="dark"
                            slider-color="blue darken-4"
                          >
                            <v-tab>ITEMS</v-tab>
                            <v-tab>Pekerjaan</v-tab>
                            <v-tab-item :eager="true">
                              <ItemsPembelian
                                ref="ItemsPb"
                                v-on:hapus_item="hps_items($event)"
                                v-on:itemsPb="items($event)"
                                v-bind:itemsgudang="gudang"
                                v-bind:ItemsPembelian="ItemsPembelian"
                                v-bind:itemspo="itemspo"
                                :title="title"
                              />
                            </v-tab-item>
                            <v-tab-item :eager="true">
                              <ItemsPembelianJasa
                                ref="ItemsPb"
                                v-on:hapus_item="hps_itemsJasa($event)"
                                v-on:itemsPb="itemsJasa($event)"
                                v-bind:itemsPerkiraan="dataPerkiraan"
                                v-bind:ItemsPembelian="ItemsPembelianJasa"
                                v-bind:itemspo="itemspojasa"
                                :title="title"
                              />
                            </v-tab-item>
                            <v-divider
                              class="mx-2"
                              color=""
                              inset
                              vertical
                            ></v-divider>
                          </v-tabs>
                        </v-card>
                      </v-col>

                      <v-col cols="12" sm="7" md="8">
                        <v-text-field
                          dense
                          prefix="keterangan :"
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
                                v-bind:options="dpp"
                                class="centered-input font-weight-bold"
                                v-model="editedItem.DPP"
                              />
                            </v-col>

                            <v-col cols="12" sm="4">
                              <vuetify-money
                                dense
                                placeholder="0"
                                v-bind:options="ppn_persen"
                                class="centered-input font-weight-bold"
                                v-model="editedItem.PPnPersen"
                                @input="Tambahppn()"
                              />
                            </v-col>

                            <v-col cols="12" sm="8">
                              <vuetify-money
                                dense
                                placeholder="0"
                                v-bind:options="ppn"
                                class="centered-input font-weight-bold"
                                v-model="editedItem.PPn"
                              />
                            </v-col>

                            <v-col cols="12" sm="12">
                              <vuetify-money
                                dense
                                placeholder="0"
                                v-bind:options="total_bayar"
                                class="centered-input font-weight-bold"
                                v-model="editedItem.TotalBayar"
                              />
                            </v-col>
                          </v-row>
                        </v-card>
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
        <div id="app">
          <ejs-grid
            :dataSource="DataPembelian"
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
            :commandClick="commandClick"
            :rowDataBound="rowDataBound"
            @actionComplete="actioncomplete"
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
                headerText="tanggal"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="supplier.Nama"
                :allowEditing="false"
                headerText="Nama Supplier "
                textAlign="Left"
                width="270"
              ></e-column>

              <e-column
                :filter="filter"
                field="TanggalPengiriman"
                :allowEditing="false"
                headerText="tanggal Pengiriman"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Referensi"
                :allowEditing="false"
                headerText="referensi"
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
                textAlign="Right"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Diskon"
                type="number"
                format="N"
                :allowEditing="false"
                headerText="Diskon"
                textAlign="Right"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DPP"
                type="number"
                format="N"
                :allowEditing="false"
                headerText="DPP"
                textAlign="Right"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="PPn"
                type="number"
                format="N"
                :allowEditing="false"
                headerText="ppn"
                textAlign="Right"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="TotalBayar"
                type="number"
                format="N"
                :allowEditing="false"
                headerText="Total Bayar"
                textAlign="Right"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="NoFakturPajak"
                :customAttributes="columnEdit"
                :allowEditing="actionEdit"
                headerText="NoFakturPajak"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="FPComplete"
                :customAttributes="columnEdit"
                :allowEditing="actionEdit"
                headerText="FPComplete"
                editType="booleanedit"
                displayAsCheckBox="true"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="PPnFaktur"
                headerText="ppnFaktur"
                textAlign="Right"
                type="number"
                format="N"
                :validationRules="moneyRules"
                :edit="numericParams"
                editType="numericedit"
                :customAttributes="columnEdit"
                :allowEditing="actionEdit"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="CekFisikInv"
                editType="booleanedit"
                :customAttributes="columnEdit"
                :allowEditing="actionEdit"
                headerText="Cek Fisik Inv"
                textAlign="Center"
                width="180"
                displayAsCheckBox="true"
              ></e-column>

              <e-column
                :filter="filter"
                field="NoPO"
                :allowEditing="false"
                headerText="No.PO"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="NoWorkOrder"
                :allowEditing="false"
                headerText="No.Work Order"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="po.Referensi"
                :allowEditing="false"
                headerText="NoIPO"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="NoInvSupplier"
                :customAttributes="columnEdit"
                :allowEditing="actionEdit"
                headerText="NoInvSupplier"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="wo.NomorPolisi"
                :allowEditing="false"
                headerText="NomorPolisi"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="Status"
                headerText="Status"
                :allowEditing="false"
                textAlign="Left"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="KeteranganStatus"
                :allowEditing="false"
                headerText="keterangan Status"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiBuatTgl"
                headerText="Di Buat Tanggal"
                :allowEditing="false"
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
                field="DiUbahTgl"
                headerText="Di Ubah Tanggal"
                :allowEditing="false"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                :allowEditing="false"
                field="DiUbahOleh"
                headerText="Di Ubah Oleh"
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
      v-model="dialog_batal"
      transition="dialog-bottom-transition"
      max-width="400"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>Batal Pembelian</v-toolbar>
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
                  v-model="editedItem.Tanggal"
                  readonly
                  label="Tanggal"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.TanggalPengiriman"
                  readonly
                  label="Tanggal Pengiriman"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.Supplier"
                  readonly
                  label="Supplier"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.BillFrom"
                  readonly
                  label="BillFrom"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.SellFrom"
                  readonly
                  label="SellFrom"
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
                  v-model="editedItem.MataUang"
                  readonly
                  label="Mata Uang"
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
                  v-model="editedItem.Referensi"
                  readonly
                  label="Referensi"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.NoPO"
                  readonly
                  label="No. PO"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-switch
                  dense
                  class="mt-2"
                  label="Cek Fisik Inv"
                  color="blue darken-4"
                  v-model="editedItem.CekFisikInv"
                  true-value="True"
                  false-value="False"
                >
                </v-switch>
              </v-col>

              <!-- <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.NomorRangka"
                  readonly
                  label="Nomor Rangka"
                ></v-text-field>
              </v-col> -->
            </v-row>

            <strong class="text-h5"><b>Items</b></strong>

            <v-row no-gutters class="ml-n3 mr-n3">
              <ItemsPembelian
                ref="ItemsPb"
                v-on:hapus_item="hps_items($event)"
                v-on:itemsPb="items($event)"
                v-bind:itemsgudang="gudang"
                v-bind:ItemsPembelian="ItemsPembelian"
                v-bind:itemspo="itemspo"
                :title="title"
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
                  v-bind:options="dpp"
                  class="font-weight-bold centered-input"
                />
              </v-col>

              <v-col cols="4" sm="4" md="4" class="mt-n6">
                <vuetify-money
                  v-model="editedItem.PPnPersen"
                  readonly
                  placeholder="0"
                  v-bind:options="ppn_persen"
                  class="font-weight-bold centered-input"
                />
              </v-col>

              <v-col cols="8" sm="8" md="8" class="mt-n6">
                <vuetify-money
                  v-model="editedItem.PPn"
                  readonly
                  placeholder="0"
                  v-bind:options="ppn"
                  class="font-weight-bold centered-input"
                />
              </v-col>

              <v-col cols="12" sm="12" md="12" class="mt-n6">
                <vuetify-money
                  v-model="editedItem.TotalBayar"
                  readonly
                  placeholder="0"
                  v-bind:options="total_bayar"
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
  </div>
</template>

<script>
import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import ItemsPembelian from "@/views/Pembelian/items";
import ItemsPembelianJasa from "@/views/Pembelian/jasa";
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
Vue.use(GridPlugin);

export default {
  name: "Pembelian",
  components: { ItemsPembelian, Loading, ItemsPembelianJasa },
  data() {
    return {
      alert: false,
      pesan: "",
      btn_po: false,
      dialog_detail: false,
      ScrollKeAtas: false,
      mobile: null,
      windowSize: { x: 0, y: 0 },
      MenuTanggalAwal: false,
      numericParams: { params: { decimals: 2 } },
      moneyRules: { maxLength: 17 },
      MenuTanggalAkhir: false,
      tanggal_awal: "",
      tanggal_akhir: "",
      dialog_print: false,
      items_periode: [],
      dataPerkiraan: [],
      gudang: [],
      dialog_periode: false,
      dialog_batal: false,
      btn_datagrid: true,
      keterangan_batal: "",
      printOutItems: [],
      reportDesign: null,
      dialogMataUang: false,
      columnEdit: { class: "customcss" },
      actionEdit: false,
      action: null,
      btn_tambah: true,
      btn_simpan: false,
      // vuetify-money
      dpp: { locale: "id-ID", prefix: "DPP", length: 12, precision: 2 },
      ppn_persen: {
        locale: "id-ID",
        prefix: "PPn",
        suffix: "%",
        length: 3,
        precision: 0,
      },
      ppn: { locale: "id-ID", length: 12, precision: 2 },
      total_bayar: {
        locale: "id-ID",
        prefix: "Total Bayar",
        suffix: "",
        length: 12,
        precision: 2,
      },
      ItemsPembelian: [],
      ItemsPembelianJasa: [],
      editedIndex: -1,
      defaultItem: {
        KodeNota: "",
        Tanggal: new Date().toISOString().substr(0, 10),
        TanggalPengiriman: "",
        Supplier: "",
        BillFrom: "",
        SellFrom: "",
        PaymentTerm: 0,
        MataUang: "Rupiah",
        Kurs: 1,
        Referensi: "",
        NoPO: "",
        CekFisikInv: false,
        NoWorkOrder: "",
        Keterangan: "",
        DPP: 0,
        PPn: 0,
        PPnPersen: 0,
        TotalBayar: 0,
      },

      editedItem: {
        KodeNota: "",
        Tanggal: new Date().toISOString().substr(0, 10),
        TanggalPengiriman: "",
        Supplier: "",
        BillFrom: "",
        SellFrom: "",
        PaymentTerm: 0,
        MataUang: "Rupiah",
        Kurs: 1,
        Referensi: "",
        NoPO: "",
        CekFisikInv: false,
        NoWorkOrder: "",
        Keterangan: "",
        DPP: 0,
        PPn: 0,
        PPnPersen: 0,
        TotalBayar: 0,
      },
      supplier: [],
      BillFrom: [],
      MataUang: [],
      SellFrom: [],
      no_po: [],
      hapus_items: [],
      hapus_itemsJasa: [],
      DataPembelian: [],
      CodingTerlarang: ["A3", "B3", "C3", "E3", "D3", "T3", "Z"],
      isLoading: false,
      fullPage: true,
      dialogPembelian: false,
      dialogPilihsupplier: false,
      kodeSupplier: null,
      dialogPilihBillFrom: false,
      dialogPilihSellFrom: false,
      dialogno_po: false,
      itemspo: null,
      itemspojasa: null,
      title: null,
      Menutanggal: false,
      Menutanggal_pengiriman: false,
      date: new Date().toISOString().substr(0, 10),
      token: localStorage.getItem("token"),
      commands: [],
      commandsMobile: [
        { buttonOption: { content: "Details", cssClass: "e-flat Details" } },
      ],
      Items: {
        Barang: [],
        Pekerjaan: [],
      },
      groupSettings: { allowReordering: true },
      selectionOptions: { type: "Multiple" },
      toolbarOptions: ["Search", "ExcelExport"],
      pageSettings: {
        pageSize: 5,
        pageSizes: ["5", "10", "15", "20", "50", "100"],
      },
      filterOptions: { type: "Menu" },
      filter: { type: "Excel" },
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
      this.getDataPembelian(
        JSON.parse(localStorage.getItem("Periode"))[0].TglAwal,
        JSON.parse(localStorage.getItem("Periode"))[0].TglAkhir
      );
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
    this.getDatasupplier();
    this.getGudang();
    this.getDataMataUang();
    this.getDataPerkiraan();
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
        (this.toolbarOptions = ["Search"]), (this.titleClass = "d-none");
        this.mobile = false;
      } else {
        (this.toolbarOptions = ["Search", "ExcelExport"]),
          (this.titleClass = "mr-4");
        this.mobile = true;
      }
    },

    dialogPembelian(val) {
      val || this.closePembelian();
    },
    dialogPilihBillFrom(val) {
      val || this.closePilihsupplier();
    },
    dialogPilihSellFrom(val) {
      val || this.closePilihSellFrom();
    },
    Items: {
      deep: true,
      handler(val) {
        // console.log(this.Items)
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
    formTitlePembelian() {
      return this.editedIndex === -1 ? "Tambah Pembelian" : "Ubah Pembelian";
    },
    formTitleno_po() {
      return this.editedIndex === -1 ? "Pilih No.PO" : "Ubah No.PO";
    },
    formTitlePilihsupplier() {
      return this.editedIndex === -1 ? "Pilih supplier" : "Ubah supplier";
    },
    formTitlePilihBillFrom() {
      return this.editedIndex === -1 ? "Pilih BillFrom" : "Ubah BillFrom";
    },
    formTitlePilihSellFrom() {
      return this.editedIndex === -1 ? "Pilih SellFrom" : "Ubah SellFrom";
    },
  },

  methods: {
    getDataPerkiraan() {
      api.get("/coa?token=" + this.token).then(
        (res) => {
          this.dataPerkiraan = res.data;
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
      // console.log(this.reportDesign)
      await api
        .get("report-pembelian/" + this.editedItem.id + "?token=" + this.token)
        .then(
          (res) => {
            // console.log(res)
            this.$router.push({
              name: "cetakBeli",
              params: {
                // nama: 'tes',
                data: res.data.data,
              },
            });
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
    getDataMataUang() {
      api.get("pembelian-uang?token=" + this.token).then(
        (res) => {
          this.MataUang = res.data.mataUang;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    actionHandler(args) {
      console.log("begin", args);
    },
    dataStateChange: function (state) {
      console.log("state", state);
    },
    async getGudang() {
      await api.get("pembelian-gudang?token=" + this.token).then((res) => {
        this.gudang = res.data.data;
      });
    },
    Batalin(val) {
      api
        .put("/batal-beli/" + this.editedItem.id + "?token=" + this.token, {
          keterangan: val,
        })
        .then((res) => {
          console.log(res);
          this.getDataPembelian(this.tanggal_awal, this.tanggal_akhir);
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialog_batal = false;
      this.keterangan_batal = "";
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
    Tambahppn() {
      this.editedItem.PPnPersen = this.editedItem.PPnPersen || 0;
      this.editedItem.PPn =
        (parseInt(this.editedItem.PPnPersen) *
          parseFloat(this.editedItem.DPP)) /
        100;
      this.editedItem.TotalBayar =
        parseFloat(this.editedItem.DPP) + parseFloat(this.editedItem.PPn);
    },
    hps_items(data) {
      // data.forEach(element => {
      //   this.hapus_items.push(element.id)
      // });
      this.hapus_items = data;
    },
    hps_itemsJasa(data) {
      console.log(data);
      this.hapus_itemsJasa = data;
    },
    itemsJasa(data) {
      console.log(data);
      this.ItemsPembelianJasa = data;
      this.Items.Pekerjaan = data;
    },
    items(data) {
      this.ItemsPembelian = data;
      this.Items.Barang = data;
      // this.editedItem.Total = data.reduce(
      //   (a, b) => a + parseFloat(b.Jumlah * b.Harga),
      //   0
      // );
      // this.editedItem.Diskon = data.reduce((a,b) => a + parseFloat(b.jumlah* parseFloat(b.harga * b.diskon1 /100)), 0)
      // console.log('Total',this.editedItem.Total)
      // console.log('SubDiskon',this.editedItem.Diskon)
      // this.editedItem.DPP = data.reduce(
      //   (a, b) => a + parseFloat(b.SubTotal),
      //   0
      // );
      // this.editedItem.PPn =
      //   (parseInt(this.editedItem.PPnPersen) *
      //     parseFloat(this.editedItem.DPP)) /
      //   100;
      // this.editedItem.TotalBayar =
      //   parseFloat(this.editedItem.DPP) + parseFloat(this.editedItem.PPn);
    },
    save() {
      if (this.editedIndex == -1) {
        if (this.editedItem.Supplier == "") {
          this.alert = true;
          this.pesan = "Supplier tidak boleh kosong";
        } else if (this.editedItem.NoPO == "") {
          this.alert = true;
          this.pesan = "Nomor PO tidak boleh kosong";
        } else if (this.editedItem.PaymentTerm === "") {
          this.alert = true;
          this.pesan = "Payment Term tidak boleh kosong";
        } else if (this.editedItem.Kurs === "") {
          this.alert = true;
          this.pesan = "Kurs tidak boleh kosong";
        } else {
          if (
            this.ItemsPembelian.length == 0 &&
            this.ItemsPembelianJasa.length == 0
          ) {
            alert("Data Items kosong");
          } else {
            this.TambahData();
          }
        }
      } else {
        if (this.editedItem.PaymentTerm === "") {
          this.alert = true;
          this.pesan = "Payment Term tidak boleh kosong";
        } else if (this.editedItem.Kurs === "") {
          this.alert = true;
          this.pesan = "Kurs tidak boleh kosong";
        } else {
          this.UpdateData();
        }
      }
      // this.closePembelian()
    },
    async savePilihsupplier() {
      await api
        .get(
          "pembelian-po?token=" + this.token + "&supplier=" + this.kodeSupplier
        )
        .then((res) => {
          // this.editedItem.no_po = ""
          // console.log(res)
          this.no_po = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      this.closePilihsupplier();
    },
    savePilihBillFrom() {
      this.closePilihBillFrom();
    },
    savePilihSellFrom() {
      this.closePilihSellFrom();
    },
    async savePilihno_po() {
      this.title = "Tambah";
      await api.get("items-po/" + this.id_po + "?token=" + this.token).then(
        (res) => {
          this.itemspo = res.data.data
            .filter((v) => parseFloat(v.Terpenuhi) < v.Jumlah)
            .map((d) => {
              d.JumlahSisa = parseFloat(d.Jumlah) - parseFloat(d.Terpenuhi);
              d.Jumlah = parseFloat(d.Jumlah) - parseFloat(d.Terpenuhi);
              d.SubTotal =
                d.Jumlah *
                (parseFloat(d.Harga) -
                  (parseFloat(d.Harga) * parseFloat(d.Diskon1)) / 100);
              return d;
            });
          this.itemspojasa = res.data.jasa
            .filter((v) => parseFloat(v.Terpenuhi) < v.Jumlah)
            .map((v) => {
              v.JumlahSisa = parseFloat(v.Jumlah) - parseFloat(v.Terpenuhi);
              v.Jumlah = parseFloat(v.Jumlah) - parseFloat(v.Terpenuhi);
              v.DiskonRp = v.Diskon;
              v.Diskon = v.Diskon1;
              v.SubTotal =
                v.Jumlah *
                (parseFloat(v.Harga) -
                  (parseFloat(v.Harga) * parseFloat(v.Diskon)) / 100);
              v.Perkiraan = v.perkiraan.Nama;
              // v.JenisPekerjaan = v.pekerjaan.Nama;
              return v;
            });
          // console.log(res)
          // console.log('data',data)
        },
        (err) => {
          console.log(err);
        }
      );
      this.closeno_po();
    },

    closePembelian() {
      this.$nextTick(() => {
        this.title = "Kosongkan";
        this.editedIndex = -1;
        this.ItemsPembelian = [];
        this.editedItem = Object.assign({}, this.defaultItem);
        this.autotanggal();
        // this.getDatasupplier()
        this.btn_simpan = false;
        this.dialogPembelian = false;
      });
      // this.$refs.ItemsPb.resetItemsPb()
      this.editedItem = Object.assign({}, this.defaultItem);
    },
    closeno_po() {
      this.dialogno_po = false;
    },
    closePilihsupplier() {
      this.dialogPilihsupplier = false;
    },
    closePilihBillFrom() {
      this.dialogPilihBillFrom = false;
    },
    closePilihSellFrom() {
      this.dialogPilihSellFrom = false;
    },

    autotanggal() {
      this.editedItem.Tanggal = this.date;
      // this.editedItem.TanggalPengiriman = this.date
    },

    // Fungsi Saat Pilih Row Tabel supplier
    rowSelectedSupplier: function (args) {
      this.kodeSupplier = args.data.Kode;
      this.editedItem.Supplier = args.data.Nama;
      this.editedItem.BillFrom = args.data.Nama;
      this.editedItem.SellFrom = args.data.Nama;
      // this.closePilihsupplier()
    },

    // Fungsi Saat Pilih Row Tabel BillFrom
    rowSelectedBillFrom: function (args) {
      this.editedItem.BillFrom = args.rowData.Nama;
      this.closePilihBillFrom;
    },

    // Fungsi Saat Pilih Row Tabel SellFrom
    rowSelectedSellFrom: function (args) {
      this.editedItem.SellFrom = args.rowData.Nama;
      this.closePilihSellFrom();
    },

    // Fungsi Saat Pilih Row Tabel No. PO
    rowSelectedno_po: function (args) {
      // console.log(args)
      if (args.data.wo != null) {
        if (!this.CodingTerlarang.includes(args.data.wo.Coding)) {
          this.id_po = args.data.id;
          this.editedItem.NoPO = args.data.KodeNota;
          this.editedItem.NoWorkOrder = args.data.NomorWO;
          this.editedItem.Keterangan = args.data.Keterangan;
          this.editedItem.PPnPersen = parseInt(args.data.PPnPersen);
          this.btn_po = false;
        } else {
          alert(args.data.wo.KeteranganWIP);
          this.btn_po = true;
        }
      } else {
        this.id_po = args.data.id;
        this.editedItem.NoPO = args.data.KodeNota;
        this.editedItem.Keterangan = args.data.Keterangan;
        this.editedItem.PPnPersen = parseInt(args.data.PPnPersen);
      }
    },

    TambahData() {
      this.editedItem.MataUang = this.MataUang.find(
        (m) => m.Nama == this.editedItem.MataUang
      ).Kode;
      this.editedItem.Supplier = this.supplier.find(
        (s) => s.Nama == this.editedItem.Supplier
      ).Kode;
      this.editedItem.BillFrom = this.supplier.find(
        (s) => s.Nama == this.editedItem.BillFrom
      ).Kode;
      this.editedItem.SellFrom = this.supplier.find(
        (s) => s.Nama == this.editedItem.SellFrom
      ).Kode;
      // this.ItemsPembelian.forEach(element => {
      //   let gudangnya = this.gudang.find(d => d.Nama == element.gudang)
      //   this.ItemsPembelian.find(g => g.gudang == gudangnya.Nama).gudang = gudangnya.Kode
      // });
      this.editedItem.items = this.ItemsPembelian.map((v) => {
        v.Gudang =
          v.Gudang == "" || v.Gudang == null
            ? JSON.parse(localStorage.getItem("user")).Kode.substr(0, 4) +
              "/0001"
            : this.gudang.find((g) => g.Nama == v.Gudang).Kode;
        return v;
      });
      this.editedItem.itemsJasa = this.ItemsPembelianJasa.map((j) => {
        j.Perkiraan = this.dataPerkiraan.find(
          (p) => p.Nama == j.Perkiraan
        ).Kode;
        return j;
      });
      this.isLoading = true;
      api
        .post("/pembelian?token=" + this.token, this.editedItem)
        .then((res) => {
          this.isLoading = false;
          console.log(res);
          this.closePembelian();
          this.getDataPembelian(this.tanggal_awal, this.tanggal_akhir);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    UpdateData() {
      // console.log('item',this.ItemsPembelian)
      this.editedItem.hapus_items = this.hapus_items;
      this.editedItem.hapus_itemsJasa = this.hapus_itemsJasa;
      this.editedItem.items = this.ItemsPembelian.filter(
        (v) => v.KodeNota != undefined
      ).map((i) => {
        i.Gudang =
          i.Gudang == "" || i.Gudang == null
            ? JSON.parse(localStorage.getItem("user")).Kode.substr(0, 4) +
              "/0001"
            : this.gudang.find((g) => g.Nama == i.Gudang).Kode;
        return i;
      });
      this.editedItem.new_items = this.ItemsPembelian.filter(
        (v) => v.KodeNota == undefined
      ).map((i) => {
        i.Gudang =
          i.Gudang == "" || i.Gudang == null
            ? JSON.parse(localStorage.getItem("user")).Kode.substr(0, 4) +
              "/0001"
            : this.gudang.find((g) => g.Nama == i.Gudang).Kode;
        return i;
      });
      this.editedItem.itemsJasa = this.ItemsPembelianJasa.map((j) => {
        j.Perkiraan = this.dataPerkiraan.find(
          (p) => p.Nama == j.Perkiraan
        ).Kode;
        return j;
      });
      api
        .put(
          "/pembelian/" + this.editedItem.id + "?token=" + this.token,
          this.editedItem
        )
        .then((res) => {
          console.log(res);
          this.hapus_items = [];
          this.hapus_itemsJasa = [];
          this.closePembelian();
          this.getDataPembelian(this.tanggal_awal, this.tanggal_akhir);
        })
        .catch((err) => {
          this.hapus_items = [];
          this.hapus_itemsJasa = [];
          console.log(err);
        });
    },
    cekPelunasan(id) {
      api.get("beli/cekPelunasan/" + id + "?token=" + this.token).then(
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
        this.editedIndex = 1;
        this.dialog_detail = true;
        api.get("pembelian/" + args.rowData.id + "?token=" + this.token).then(
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
            // console.log(res.data.items)
            // let items = res.data.items.map(item => {
            //   return {
            //     id: item.id,
            //     kodenota: item.kodenota,
            //     nourut: item.nourut,
            //     barang: item.barang.Kode,
            //     Nama:item.barang.Nama,
            //     PartNumber1:item.barang.PartNumber1,
            //     Merk:item.barang.Merk,
            //     Kendaraan:item.barang.Kendaraan,
            //     gudang: item.gudang,
            //     harga: item.harga,
            //     jumlah: item.jumlah,
            //     jumlahBonus: item.jumlahBonus,
            //     satuan: item.satuan,
            //     diskon: item.diskon,
            //     diskon1: item.diskon1,
            //     diskon2: item.diskon2,
            //     diskon3: item.diskon3,
            //     diskon4: item.diskon4,
            //     diskon5: item.diskon5,
            //     subdiskokn: item.subdiskon,
            //     subtotal: item.subtotal
            //   }
            // })
            // items.forEach(x => {
            //   let NamaGudang = this.gudang.find(a => a.Kode == x.gudang)
            //   console.log(NamaGudang)
            //   x.gudang = NamaGudang.Nama
            // });
            this.ItemsPembelian = res.data.data.items.map((v) => {
              v.DiskonRp = v.Diskon;
              v.Diskon = v.Diskon1;
              v.SubTotal =
                v.Jumlah *
                (parseFloat(v.Harga) -
                  (parseFloat(v.Harga) * parseFloat(v.Diskon)) / 100);
              v.Nama = v.barang.Nama;
              v.Merk = v.barang.Merk;
              // v.TanggalKirim = v.ETA
              v.PartNumber1 = v.barang.PartNumber1;
              v.Kendaraan = v.barang.Kendaraan;
              v.Gudang = v.gudang.Nama;
              v.Satuan = v.satuan.Nama;
              return v;
            });
            console.log(this.ItemsPembelian);
            this.editedItem = res.data.data;
            this.editedItem.SellFrom = res.data.data.sell_from.Nama;
            this.editedItem.BillFrom = res.data.data.bill_from.Nama;
            this.editedItem.MataUang = res.data.data.uang.Nama;
            this.editedItem.Supplier = res.data.data.supplier.Nama;

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
      if (args.target.classList.contains("custombutton")) {
        let data = JSON.stringify(args.rowData);
        console.log(data);
      } else if (args.target.classList.contains("Delete")) {
        if (args.rowData.Status == null) {
          var b = confirm("Anda yakin membatalkan transaksi ini?");
          if (b == true) {
            this.editedItem.id = args.rowData.id;
            this.cekPelunasan(this.editedItem.id);
          }
        } else {
          var r = confirm("Yakin Hapus Data?");
          if (r == true) {
            api
              .delete("/pembelians/" + args.rowData.id + "?token=" + this.token)
              .then((res) => {
                console.log(res);
                this.getDataPembelian(this.tanggal_awal, this.tanggal_akhir);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      } else if (args.target.classList.contains("Edit")) {
        // let data = args
        this.isLoading = true;
        this.dialogPembelian = true;
        this.editedIndex = 1;
        api.get("pembelian/" + args.rowData.id + "?token=" + this.token).then(
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
            // console.log(res.data.items)
            // let items = res.data.items.map(item => {
            //   return {
            //     id: item.id,
            //     kodenota: item.kodenota,
            //     nourut: item.nourut,
            //     barang: item.barang.Kode,
            //     Nama:item.barang.Nama,
            //     PartNumber1:item.barang.PartNumber1,
            //     Merk:item.barang.Merk,
            //     Kendaraan:item.barang.Kendaraan,
            //     gudang: item.gudang,
            //     harga: item.harga,
            //     jumlah: item.jumlah,
            //     jumlahBonus: item.jumlahBonus,
            //     satuan: item.satuan,
            //     diskon: item.diskon,
            //     diskon1: item.diskon1,
            //     diskon2: item.diskon2,
            //     diskon3: item.diskon3,
            //     diskon4: item.diskon4,
            //     diskon5: item.diskon5,
            //     subdiskokn: item.subdiskon,
            //     subtotal: item.subtotal
            //   }
            // })
            // items.forEach(x => {
            //   let NamaGudang = this.gudang.find(a => a.Kode == x.gudang)
            //   console.log(NamaGudang)
            //   x.gudang = NamaGudang.Nama
            // });
            this.ItemsPembelian = res.data.data.items.map((v) => {
              v.DiskonRp = v.Diskon;
              v.Diskon = v.Diskon1;
              v.SubTotal =
                v.Jumlah *
                (parseFloat(v.Harga) -
                  (parseFloat(v.Harga) * parseFloat(v.Diskon)) / 100);
              v.Nama = v.barang.Nama;
              v.Merk = v.barang.Merk;
              v.maxUpdateJumlah =
                parseInt(v.detail_po.Jumlah) -
                parseInt(v.detail_po.Terpenuhi) +
                v.Jumlah;
              // v.TanggalKirim = v.ETA
              v.PartNumber1 = v.barang.PartNumber1;
              v.Kendaraan = v.barang.Kendaraan;
              v.Gudang = v.gudang.Nama;
              v.Satuan = v.satuan.Nama;
              return v;
            });
            this.ItemsPembelianJasa = res.data.data.items_jasa.map((v) => {
              v.DiskonRp = v.Diskon;
              v.Diskon = v.Diskon1;
              v.SubTotal =
                v.Jumlah *
                (parseFloat(v.Harga) -
                  (parseFloat(v.Harga) * parseFloat(v.Diskon)) / 100);
              v.Perkiraan = v.perkiraan.Nama;
              // v.JenisPekerjaan = v.pekerjaan.Nama;
              v.maxUpdateJumlah =
                parseInt(v.detail_po.Jumlah) -
                parseInt(v.detail_po.Terpenuhi) +
                v.Jumlah;
              return v;
            });
            // console.log(this.ItemsPembelian);
            this.editedItem = res.data.data;
            this.editedItem.SellFrom = res.data.data.sell_from.Nama;
            this.editedItem.BillFrom = res.data.data.bill_from.Nama;
            this.editedItem.MataUang = res.data.data.uang.Nama;
            this.editedItem.Supplier = res.data.data.supplier.Nama;

            this.isLoading = false;
          },
          (err) => {
            console.log(err);
          }
        );
        // this.editedIndex = 1;
        this.title = "Ubah";
      }
    },

    actioncomplete(args) {
      if (args.requestType === "batchsave" || args.requestType === "save") {
        for (const key in args.previousData) {
          let arrUpdate = [
            "PPnFaktur",
            "CekFisikInv",
            "FPComplete",
            "NoFakturPajak",
            "NoInvSupplier",
          ];
          if (
            args.previousData[key] != args.data[key] &&
            arrUpdate.includes(key)
          ) {
            // console.log(key.includes('Tanggal'))
            var conf = confirm(
              `ganti data ${key} lama ${args.previousData[key]} menjadi ${key} baru ${args.data[key]}`
            );
            // console.log(`ganti data ${key} lama ${args.previousData[key]} menjadi ${key} baru ${args.data[key]}`)
            // args.endEdit()
            if (conf == true) {
              this.UpdateDataGrid(args.data.id, args.data);
            } else {
              this.$refs.grid.closeEdit();
            }
          }
        }
      }
    },
    UpdateDataGrid(id, data) {
      this.isLoading = true;
      api
        .put("grid-beli/" + id + "?token=" + this.token, data)
        .then(() => {
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataPembelian(from, to) {
      console.log("from", from, "to", to);
      this.isLoading = true;
      api.get("/pembelian/" + from + "/" + to + "/?token=" + this.token).then(
        (res) => {
          this.isLoading = false;
          this.dialog_periode = false;
          this.DataPembelian = res.data.data;
          let x = [];
          this.data = x;
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
        }
      );
    },

    getDatasupplier() {
      api.get("/pembelian-supplier?token=" + this.token).then(
        (res) => {
          this.supplier = res.data.data.filter((p) => p.Aktif == "1");
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>

<style>
/* Text ada di kanan */
.centered-input input {
  text-align: right;
}
.below-30 {
  background-color: orangered;
}

.below-80 {
  background-color: yellow;
}
.edit-batal .e-icons.e-edit {
  color: #26a69a;
}
.hapus-batal .e-icons.e-delete {
  color: #ef5350;
}
/* .e-grid .e-row.above-80 .e-rowcell {
    background-color: rgb(0, 31, 61);
    color: rgb(167, 232, 202); 
    font-weight: bold; 
  } */
/* .e-icons{
    color:yellow;
  } */
</style>

`.-:/++ossssso++/:-.` `-/oydmNNMMMMMMMMMMMMMMMNNmdyo/-`
.:ohmNMMMNNmmddhhhhhyyhhhhddmmNNMMMNmho:`
.+hmMMMNmdhhyyyyyyyyyyyyyyyyyyyyyyyyhdmNMMNmy/.
./hNMMNmdhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhdmNMMNh/.
-smMMNmhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhmNMMms-
-yNMMNdyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhmMMNy-
.yMMMmhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhmMMNy.
`oNMMNhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyymMMN+`
-dMMNhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhNMMd-
+MMMmyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyydMMN+
`sMMMdyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhNMMo
`yMMNhyyyyyyyyyyddmNmdhhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyNMMs`
yMMNhyyyyyyyydNMMNdyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyNMMs
+MMMhyyyyyyydMMMMdyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyNMM+
-NMMdyyyyyyymMMMMmyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhhyyyyyyyyyyyyyhMMN.
`hMMmyyyyyyydMMMMMdyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyydNmhyyyyyyyyyyymMMh
:MMMhyyyyyyyNMMMMMmyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyymMMmyyyyyyyyyyyNMM:
hMMmyyyyyyyyNMMMMMMdyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhMMMmsyyyyyyyysdMMy
.NMMdyyyyyyyyNMMMMMMMNmhyyyyyyhhdddddhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhMMMMyyyyyyyyyyhMMm.
:MMMyyyyyyyyyhMMMMMMMMMMMMNNNMMMMMMMMMMMNmhyyyyyyyyyyyyyyyyyyyyyyyydMMMMyyyyyyyyyyyNMM:
oMMMyyyyyyyyyydMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNNNNmmhyyyyyyyyyyyyydMMMMMyyyyyyyyyysNMM+
sMMNyyyyyyyyyyyhNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNdyysssyyhmNMMMMMNsyyyyyyyyysmMMo
oMMMyyyyyyyyyyyyyhmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNmNNMMMMMMMMMMhyyyyyyyyyysmMMo
oMMMyyyyyyyyyyyyyyyhdmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMhyyyyyyyyyyyyNMM/
:MMMhyyyyyyyyyyyhNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMmhyyyyyyyyyyyyyMMM-
`NMMdyyyyyyyyyyyyhmNMMMMMMMMMMhmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNmdyyyyyyyyyyyyyyydMMm`
yMMNyyyyyyyyyyyyyyhmMMMMMMMMMhyNMMMMMMMMMMMMMMMMmdMMMMMMMMMMmhhyyyyyyyyyyyyyyyyyymMMs
-NMMdyyyyyyyyyhdmNMMMMMMMMMMMMmdhdNMMMMMMMMMMNNdymMMMMMMMMMMNhyyyyyyyyyyyyyyyyyyhMMN-
yMMNhyhhdmmNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNmdddNMMMMMMMMMMMNmyyyyyyyyyyyyyyyyyyNMMs
.mMMNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNyhhhhhhhyyyyyyyyyyyyyyyyyyymMMm`
:MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMhyyyyyyyyyyyyyyyyyyyyyyyyyydMMN:
+MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNyyyyyyyyyyyyyyyyyyyyyyyyyydMMN/
+NMMMMMMMMMMMMMMMMMMMMMMMMMMMMNmmmmmNNMMMMMMMMmyyyyyyyyyyyyyyyyyyyyyyyyydMMN+
+NMMMMMMMMMMMMMMMMMMMMMMMMMNo:/` `:/oMMMMMMMhyyyyyyyyyyyyyyyyyyyyyyyymMMN/
:mMMMMMMMMMMMMMMMMMMMMMMMMy :--..+` yMMMMMNyyyyyyyyyyyyyyyyyyyyyyyhNMMm-
`yMMMMMMMMMMMMMMMMMMMMMMMmhh/.```:oodMMMMMmyyyyyyyyyyyyyyyyyyyyyymMMMy`
:mMMMMMMMMMMMMMMMMMMMMMMMMMMNNMMMMMMMMMMdyyyyyyyyyyyyyyyyyyyydMMMd:
`omMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMhyyyyyyyyyyyyyyyyyhmMMMm+`
.omMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMyyyyyyyyyyyyyyyydNMMMm+`
`/hNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNyyyyyyyyyyyyhdmMMMNh/`
`-odNMMMMMMMMMMMMMMMMMMMMMMMMMMMNyyyyyyyyhhmNMMMNdo-`
`-odNMMMMMMMMMMMMMMMMMMMMMMMMmyyhhdmmNMMMMmho-`
.:ohmNMMMMMMMMMMMMMMMMMMMNNNMMMMMNmho:. `-/+yhmmNNNMMMMMMMMMNNNmmhs+:-`
`.--:///////:--.`
