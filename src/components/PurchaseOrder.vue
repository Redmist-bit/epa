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
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Choose Date</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
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
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false"> Close </v-btn>
            <v-btn
              text
              @click="getDataPurchaseOrder(tanggal_awal, tanggal_akhir)"
            >
              Ok
            </v-btn>
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
            <strong>{{ $t("PO.MainTitle") }}</strong>
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
            {{ $t("PO.MainTitle") }}
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

          <v-dialog v-model="dialog" scrollable persistent max-width="1200px">
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
                <v-toolbar-title dark>
                  <v-icon>mdi-cart-plus </v-icon>
                </v-toolbar-title>
                <span>{{ formTitle }}</span>
                <v-spacer></v-spacer>

                <v-btn icon @click="close">
                  <v-icon class="mx-1">mdi-window-close</v-icon>
                </v-btn>
              </v-toolbar>
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
              <v-card-text>
                <v-card outlined class="mt-6">
                  <v-col>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          v-model="editedItem.KodeNota"
                          :disabled="true"
                          label="Kode Nota"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          :disabled="lockedit"
                          v-model="menutanggalpo"
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
                            locale="id"
                            v-model="editedItem.Tanggal"
                            @input="menutanggalpo = false"
                            :min="HariIni"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          v-model="MenuTanggalPengiriman"
                          :disabled="lockeditEta"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              dense
                              v-model="editedItem.TanggalKirim"
                              label="Tanggal Kirim"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            locale="id"
                            v-model="editedItem.TanggalKirim"
                            @input="MenuTanggalPengiriman = false"
                            :min="HariIni"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          v-model="editedItem.Kurs"
                          @keypress="isNumber($event)"
                          :readonly="lockeditEta"
                          label="Kurs"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          v-model="editedItem.Supplier"
                          readonly
                          label="Supplier"
                        >
                          <template v-slot:append>
                            <v-dialog
                              v-model="dialogsupplier"
                              max-width="800px"
                              persistent
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  dark
                                  :disabled="lockedit"
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
                                    <span class="headline">Pilih Supplier</span>
                                  </v-card-title>
                                  <v-spacer></v-spacer>

                                  <v-btn
                                    dark
                                    text
                                    fab
                                    small
                                    @click="closePilihSupplier"
                                  >
                                    <v-icon class="mx-1"
                                      >mdi-window-close</v-icon
                                    >
                                  </v-btn>
                                </v-toolbar>

                                <v-col cols="12" md="12">
                                  <v-card>
                                    <ejs-grid
                                      id="GridSupplier"
                                      :dataSource="supplier"
                                      height="200"
                                      width="100%"
                                      gridLines="Both"
                                      :allowReordering="true"
                                      :recordDoubleClick="rowSelectedSupplier"
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

                                <v-divider></v-divider>
                              </v-card>
                            </v-dialog>
                          </template>
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          v-model="editedItem.BillFrom"
                          readonly
                          label="BillFrom"
                        >
                          <template v-slot:append>
                            <v-dialog
                              v-model="dialogBillFrom"
                              max-width="800px"
                              persistent
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  dark
                                  small
                                  :disabled="lockedit"
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
                                    <span class="headline">Pilih BillFrom</span>
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

                                <v-col cols="12" md="12">
                                  <v-card>
                                    <ejs-grid
                                      id="GridBillFrom"
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

                                <v-divider></v-divider>
                              </v-card>
                            </v-dialog>
                          </template>
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          v-model="editedItem.SellFrom"
                          readonly
                          label="SellFrom"
                        >
                          <template v-slot:append>
                            <v-dialog
                              v-model="dialogSellFrom"
                              max-width="800px"
                              persistent
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  dark
                                  small
                                  :disabled="lockedit"
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
                                    <span class="headline">Pilih SellFrom</span>
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

                                <v-col cols="12" md="12">
                                  <v-card>
                                    <ejs-grid
                                      id="GridSellFrom"
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

                                <v-divider></v-divider>
                              </v-card>
                            </v-dialog>
                          </template>
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          v-model="editedItem.PaymentTerm"
                          :disabled="lockeditEta"
                          @keypress="isNumber($event)"
                          label="Payment Term"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" md="4" sm="6">
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
                                  :disabled="lockeditEta"
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

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          v-model="editedItem.Referensi"
                          :disabled="lockeditEta"
                          label="Refrensi"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          readonly
                          v-model="editedItem.NomorWO"
                          label="Nomor Work Order"
                          dense
                          ><template v-slot:append>
                            <v-dialog
                              v-model="dialogWorkOrder"
                              max-width="800px"
                              persistent
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  dark
                                  small
                                  class="mt-n2"
                                  :disabled="lockedit"
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
                                    <span class="headline"
                                      >Pilih Work Order</span
                                    >
                                  </v-card-title>
                                  <v-spacer></v-spacer>

                                  <v-btn
                                    dark
                                    text
                                    fab
                                    small
                                    @click="closePilihWorkOrder"
                                  >
                                    <v-icon class="mx-1"
                                      >mdi-window-close</v-icon
                                    >
                                  </v-btn>
                                </v-toolbar>

                                <v-col cols="12" md="12">
                                  <v-card>
                                    <ejs-grid
                                      :dataSource="WorkOrder"
                                      height="200"
                                      width="100%"
                                      gridLines="Both"
                                      :allowReordering="true"
                                      :dataStateChange="dataStateChange"
                                      :allowResizing="true"
                                      :allowPaging="true"
                                      :pageSettings="pageSettings"
                                      ref="ggs"
                                      :toolbar="toolbarOptions"
                                      :recordDoubleClick="onDoubleClick"
                                    >
                                      <e-columns>
                                        <e-column
                                          field="KodeNota"
                                          headerText="Nomor Wo"
                                          textAlign="Left"
                                          width="200"
                                        ></e-column>
                                        <e-column
                                          field="NamaPelanggan"
                                          headerText="Pelanggan"
                                          width="170"
                                        ></e-column>
                                        <e-column
                                          field="NamaPemilik"
                                          headerText="Pemilik"
                                          width="170"
                                        ></e-column>
                                        <e-column
                                          field="NomorRangka"
                                          headerText="Nomor Rangka"
                                          width="150"
                                        ></e-column>
                                        <e-column
                                          field="NomorMesin"
                                          headerText="Nomor Mesin"
                                          width="150"
                                        ></e-column>
                                        <e-column
                                          field="NomorPolisi"
                                          headerText="Nomor Polisi"
                                          width="150"
                                        ></e-column>
                                      </e-columns>
                                    </ejs-grid>
                                  </v-card>
                                </v-col>

                                <v-divider></v-divider>
                              </v-card>
                            </v-dialog>
                          </template>
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          readonly
                          v-model="editedItem.Unit"
                          label="Unit"
                          dense
                          ><template v-slot:append>
                            <v-dialog
                              v-model="dialogUnit"
                              max-width="800px"
                              persistent
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  dark
                                  small
                                  class="mt-n2"
                                  :disabled="lockedit"
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
                                    <span class="headline">Pilih Unit</span>
                                  </v-card-title>
                                  <v-spacer></v-spacer>

                                  <v-btn
                                    dark
                                    text
                                    fab
                                    small
                                    @click="dialogUnit = false"
                                  >
                                    <v-icon class="mx-1"
                                      >mdi-window-close</v-icon
                                    >
                                  </v-btn>
                                </v-toolbar>

                                <v-col cols="12" md="12">
                                  <v-card>
                                    <ejs-grid
                                      :dataSource="DataUnit"
                                      height="200"
                                      width="100%"
                                      gridLines="Both"
                                      :allowReordering="true"
                                      :dataStateChange="dataStateChangeUnit"
                                      :allowResizing="true"
                                      :allowPaging="true"
                                      :pageSettings="pageSettings"
                                      ref="unit"
                                      :toolbar="toolbarOptions"
                                      :recordDoubleClick="onDoubleClickUnit"
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
                                          width="170"
                                        ></e-column>
                                        <e-column
                                          field="SerialNumber"
                                          headerText="SerialNumber"
                                          width="170"
                                        ></e-column>
                                        <e-column
                                          field="CodeUnit"
                                          headerText="CodeUnit"
                                          width="150"
                                        ></e-column>
                                        <e-column
                                          field="Product"
                                          headerText="Product"
                                          width="150"
                                        ></e-column>
                                        <e-column
                                          field="Brand"
                                          headerText="Brand"
                                          width="150"
                                        ></e-column>
                                      </e-columns>
                                    </ejs-grid>
                                  </v-card>
                                </v-col>

                                <v-divider></v-divider>
                              </v-card>
                            </v-dialog>
                          </template>
                        </v-text-field>
                      </v-col>

                      <v-snackbar v-model="snackbar" :timeout="timeout">
                        Data Items kosong
                        <template v-slot:action="{ attrs }">
                          <v-btn
                            color="blue"
                            text
                            v-bind="attrs"
                            @click="snackbar = false"
                          >
                            Tutup
                          </v-btn>
                        </template>
                      </v-snackbar>

                      <v-col cols="14" md="6">
                        <v-dialog v-model="dialogPO" persistent max-width="290">
                          <v-card>
                            <v-toolbar color="blue darken-4" dark
                              >Confirm</v-toolbar
                            >
                            <v-card-text
                              >Data Detail Purchase Order Akan Di Tulis
                              Ulang.</v-card-text
                            >
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="green darken-1"
                                text
                                @click="(dialogPO = false), (verifPO = 'Ya')"
                              >
                                Ya
                              </v-btn>
                              <v-btn
                                color="green darken-1"
                                text
                                @click="(dialogPO = false), (verifPO = 'Tidak')"
                              >
                                Tidak
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <!-- <v-btn dark color="blue darken-4" @click="dialogPartOrder">Load Part Order</v-btn> -->
                        <!-- <v-btn
                          color="blue darken-4"
                          dark
                          class="mb-2"
                          :disabled="lockedit"
                          @click="loadPartOrder"
                        >
                          Load Part Order
                        </v-btn> -->
                      </v-col>

                      <v-col cols="12">
                        <v-tabs
                          background-color="white"
                          color="dark"
                          slider-color="blue darken-4"
                        >
                          <v-tab>ITEMS</v-tab>
                          <v-tab>PEKERJAAN</v-tab>
                          <v-tab-item :eager="true">
                            <!-- @SyncItemBarangPO='rowSelectedBarang' -->
                            <ItemsPurchaseOrder
                              :dataUnit="DataUnit"
                              v-bind:title="title"
                              v-on:dataGudang="gudang($event)"
                              v-bind:loadRpl="PartOrderList"
                              ref="BarangPO"
                              @hapus_item="hps_items($event)"
                              @itemsPo="items($event)"
                              v-bind:itembarangpo="itembarangpo"
                            />
                          </v-tab-item>
                          <v-tab-item :eager="true">
                            <!-- @SyncItemBarangPO='rowSelectedBarang' -->
                            <ItemsPurchaseOrderJasa
                              v-bind:title="title"
                              v-on:dataPerkiraan="perkiraan($event)"
                              @hapus_item="hps_itemsJasa($event)"
                              @itemsPoJasa="itemsJasa($event)"
                              v-bind:itemsJasa="itempojasa"
                            />
                          </v-tab-item>
                          <v-divider
                            class="mx-2"
                            color=""
                            inset
                            vertical
                          ></v-divider>
                        </v-tabs>
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
                                readonly
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
                                :disabled="lockeditEta"
                                @input="TambahPPn()"
                              />
                            </v-col>

                            <v-col cols="12" sm="8">
                              <vuetify-money
                                dense
                                placeholder="0"
                                readonly
                                v-bind:options="PPn"
                                class="centered-input font-weight-bold"
                                v-model="editedItem.PPn"
                              />
                            </v-col>

                            <v-col cols="12" sm="12">
                              <vuetify-money
                                dense
                                readonly
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
                  </v-col>
                </v-card>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  dark
                  :disabled="btn_simpan"
                  color="blue darken-4"
                  @click="save"
                >
                  <v-icon class="mr-1">mdi-content-save</v-icon
                  >{{ $t("All.BtnSimpan") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- grid di depan-->
        </v-toolbar>

        <div id="app">
          <ejs-grid
            :dataSource="data"
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
            :contextMenuItems="contextMenuItems"
            :contextMenuClick="contextMenuClick"
            :rowDataBound="rowDataBound"
            :commandClick="commandClick"
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
                width="179"
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
                fieldText=""
                field="KodeNota"
                headerText="Kode Nota"
                textAlign="Left"
                width="180"
              >
              </e-column>

              <e-column
                field="Tanggal"
                editType="datepickeredit"
                type="date"
                format="yyyy-MM-dd"
                headerText="Tanggal"
                width="150"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="supplier.Nama"
                headerText="Nama Supplier"
                width="200"
              >
              </e-column>

              <e-column
                field="TanggalKirim"
                editType="datepickeredit"
                type="date"
                format="yyyy-MM-dd"
                headerText="TanggalKirim"
                width="170"
              >
              </e-column>

              <e-column field="Status" headerText="Status" width="170">
              </e-column>

              <e-column
                field="Total"
                headerText="Total"
                textAlign="Right"
                type="number"
                format="N"
                width="160"
              >
              </e-column>

              <e-column
                field="Diskon"
                headerText="Diskon"
                textAlign="Right"
                type="number"
                format="N"
                width="160"
              >
              </e-column>

              <e-column
                field="DPP"
                headerText="DPP"
                textAlign="Right"
                type="number"
                format="N"
                width="160"
              >
              </e-column>

              <e-column
                field="PPn"
                headerText="PPn"
                textAlign="Right"
                type="number"
                format="N"
                width="160"
              >
              </e-column>

              <e-column
                field="TotalBayar"
                headerText="Total Bayar"
                textAlign="Right"
                type="number"
                format="N"
                width="160"
              >
              </e-column>

              <e-column
                field="Keterangan"
                headerText="Keterangan"
                textAlign="Left"
                width="160"
              >
              </e-column>

              <e-column
                field="Referensi"
                headerText="Referensi"
                textAlign="Left"
                width="160"
              >
              </e-column>

              <e-column
                field="wo.NomorRangka"
                headerText="Nomor Rangka"
                textAlign="Left"
                width="160"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="wo.NomorPolisi"
                headerText="Nomor Polisi"
                textAlign="Left"
                width="160"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="NomorWO"
                headerText="No Work Order"
                textAlign="Left"
                width="160"
              >
              </e-column>

              <e-column
                field="Apply"
                headerText="Apply"
                width="180"
                editType="booleanedit"
                displayAsCheckBox="true"
                type="boolean"
                textAlign="Center"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiBuatTgl"
                headerText="DiBuatTgl"
                textAlign="Left"
                width="160"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="DiBuatOleh"
                headerText="DiBuatOleh"
                textAlign="Left"
                width="160"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="DiUbahTgl"
                headerText="DiUbahTgl"
                textAlign="Left"
                width="160"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="DiUbahOleh"
                headerText="DiUbahOleh"
                textAlign="Left"
                width="160"
              >
              </e-column>
            </e-columns>

            <!-- <e-aggregates>
              <e-aggregate>
                <e-columns>
                  <e-column type="Sum" field="total" format='C2' :FooterTemplate="footerSum"></e-column>
                  <e-column type="Sum" field="TotalBayar" format='C2' :FooterTemplate="footerSum"></e-column>
                </e-columns>
              </e-aggregate>
            </e-aggregates>   -->
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
      v-model="dialog_batal"
      transition="dialog-bottom-transition"
      max-width="400"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>Batal PO</v-toolbar>
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
      v-model="dialogEditSuplier"
      transition="dialog-bottom-transition"
      max-width="400"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>Ganti Supplier PO</v-toolbar>
          <v-card-text>
            <v-container>
              <v-text-field
                dense
                v-model="editedItem.Supplier"
                readonly
                label="Supplier"
              >
                <template v-slot:append>
                  <v-dialog
                    v-model="dialogsupplier"
                    max-width="800px"
                    persistent
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        dark
                        :disabled="lockedit"
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
                          <span class="headline">Pilih Supplier</span>
                        </v-card-title>
                        <v-spacer></v-spacer>

                        <v-btn dark text fab small @click="closePilihSupplier">
                          <v-icon class="mx-1">mdi-window-close</v-icon>
                        </v-btn>
                      </v-toolbar>

                      <v-col cols="12" md="12">
                        <v-card>
                          <ejs-grid
                            id="GridSupplier"
                            :dataSource="supplier"
                            height="200"
                            width="100%"
                            gridLines="Both"
                            :allowReordering="true"
                            :recordDoubleClick="rowSelectedSupplier"
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

                      <v-divider></v-divider>
                    </v-card>
                  </v-dialog>
                </template>
              </v-text-field>
              <v-text-field
                dense
                v-model="editedItem.BillFrom"
                readonly
                label="BillFrom"
              >
                <template v-slot:append>
                  <v-dialog
                    v-model="dialogBillFrom"
                    max-width="800px"
                    persistent
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        dark
                        small
                        :disabled="lockedit"
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
                          <span class="headline">Pilih BillFrom</span>
                        </v-card-title>
                        <v-spacer></v-spacer>

                        <v-btn dark text fab small @click="closePilihBillFrom">
                          <v-icon class="mx-1">mdi-window-close</v-icon>
                        </v-btn>
                      </v-toolbar>

                      <v-col cols="12" md="12">
                        <v-card>
                          <ejs-grid
                            id="GridBillFrom"
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

                      <v-divider></v-divider>
                    </v-card>
                  </v-dialog>
                </template>
              </v-text-field>
              <v-text-field
                dense
                v-model="editedItem.SellFrom"
                readonly
                label="SellFrom"
              >
                <template v-slot:append>
                  <v-dialog
                    v-model="dialogSellFrom"
                    max-width="800px"
                    persistent
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        dark
                        small
                        :disabled="lockedit"
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
                          <span class="headline">Pilih SellFrom</span>
                        </v-card-title>
                        <v-spacer></v-spacer>

                        <v-btn dark text fab small @click="closePilihSellFrom">
                          <v-icon class="mx-1">mdi-window-close</v-icon>
                        </v-btn>
                      </v-toolbar>

                      <v-col cols="12" md="12">
                        <v-card>
                          <ejs-grid
                            id="GridSellFrom"
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

                      <v-divider></v-divider>
                    </v-card>
                  </v-dialog>
                </template>
              </v-text-field>
            </v-container>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
            <v-btn text @click="UbahSupplier">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <v-dialog
      v-model="dialog_ipo"
      transition="dialog-top-transition"
      max-width="400"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>Choose No Part Order</v-toolbar>

          <v-card-text>
            <v-container>
              <v-combobox
                :items="KodeNotaIpo"
                v-model="KodeIpo"
                label="No Part Order"
              ></v-combobox>
            </v-container>
          </v-card-text>

          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
            <v-btn text @click="loadPartOrder()">Load</v-btn>
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
                  v-model="editedItem.Tanggal"
                  readonly
                  label="Tanggal"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.TanggalKirim"
                  readonly
                  label="Tanggal Kirim"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.Kurs"
                  readonly
                  @keypress="isNumber($event)"
                  label="Kurs"
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
                  @keypress="isNumber($event)"
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
                  v-model="editedItem.NomorRangka"
                  readonly
                  label="Nomor Rangka"
                ></v-text-field>
              </v-col>
            </v-row>

            <strong class="text-h5"><b>Items</b></strong>

            <v-row no-gutters class="ml-n3 mr-n3">
              <ItemsPurchaseOrder
                v-bind:title="title"
                v-on:dataGudang="gudang($event)"
                v-bind:loadRpl="PartOrderList"
                ref="BarangPO"
                @hapus_item="hps_items($event)"
                @itemsPo="items($event)"
                v-bind:itembarangpo="itembarangpo"
                :pembayaran="pembayaran"
                :childitembarangpo="childitembarangpo"
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
  </div>
</template>
<script>
import Vue from "vue";
import api from "@/services/http";
import { DatePickerPlugin } from "@syncfusion/ej2-vue-calendars";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import ItemsPurchaseOrder from "@/views/PurchaseOrder/items";
import ItemsPurchaseOrderJasa from "../views/PurchaseOrderJasa/items.vue";
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

Vue.use(DatePickerPlugin);
Vue.use(GridPlugin);

export default {
  components: {
    ItemsPurchaseOrder,
    ItemsPurchaseOrderJasa,
    Loading,
  },
  data() {
    return {
      dialogUnit: false,
      Unit: [],
      lockedit: false,
      lockeditEta: false,
      alert: false,
      pesan: "",
      contextMenuItems: [],
      dialog_detail: false,
      ScrollKeAtas: false,
      mobile: null,
      windowSize: { x: 0, y: 0 },
      ReserveOutcome: 0,
      AvailableBudget: 0,
      MenuTanggalAwal: false,
      MenuTanggalAkhir: false,
      btn_simpan: false,
      KodeNotaIpo: [],
      KodeIpo: "",
      keterangan_batal: "",
      dialog_batal: false,
      dialogEditSuplier: false,
      dialog_print: false,
      tanggal_awal: "",
      tanggal_akhir: "",
      reportDesign: null,
      items_periode: [],
      dialog_ipo: false,
      dialog_periode: false,
      action: null,
      isLoading: false,
      fullPage: true,
      snackbar: false,
      dialogPO: false,
      btn_tambah: true,
      dialogPartOrder: false,
      timeout: 4000,
      // vuetify-money
      DPP: { locale: "id-ID", prefix: "DPP", length: 12, precision: 2 },
      PPnPersen: {
        locale: "id-ID",
        prefix: "PPn",
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
      totalPPn: "0",
      HariIni: new Date().toISOString().substr(0, 10),
      PartOrderList: [],
      printOutItems: [],
      Gudang: [],
      Perkiraan:[],
      hapus_items: [],
      hapus_itemsJasa: [],
      editedItem: {
        KodeNota: "",
        Tanggal: new Date().toISOString().substr(0, 10),
        Supplier: "",
        BillFrom: "",
        Status: "",
        total: "",
        diskon: "",
        DPP: 0,
        PPnPersen: 11,
        PPn: "",
        TotalBayar: 0,
        keterangan: "",
        SellFrom: "",
        PaymentTerm: 0,
        no_polisi: "",
        MataUang: "Rupiah",
        Kurs: 1,
        TanggalKirim: "",
        Referensi: "",
        NomorWO: "",
        NomorRangka: "",
        apply: "",
        Unit: "",
      },
      defaultItem: {
        KodeNota: "",
        Tanggal: new Date().toISOString().substr(0, 10),
        Supplier: "",
        BillFrom: "",
        Status: "",
        total: "",
        diskon: "",
        DPP: 0,
        PPnPersen: 11,
        PPn: "",
        TotalBayar: 0,
        keterangan: "",
        SellFrom: "",
        PaymentTerm: 0,
        no_polisi: "",
        MataUang: "Rupiah",
        Kurs: 1,
        TanggalKirim: "",
        Referensi: "",
        NomorWO: "",
        NomorRangka: "",
        apply: "",
        Unit: "",
      },
      data: [],
      DataUnit: [],
      totalharga: [],
      stored: [],
      supplier: [],
      supplierAll: [],
      search: "",
      dialog: false,
      dialogWorkOrder: false,
      dialogDelete: false,
      dialogsupplier: false,
      dialogBillFrom: false,
      dialogSellFrom: false,
      MenuTanggalPengiriman: false,
      dialogMataUang: false,
      menutanggalpo: false,
      editedIndex: -1,
      itembaranglist: [],
      storeddata: [],
      itembarangpo: [],
      itempojasa: [],
      Items:{
        Barang: [],
        Pekerjaan: []
      },
      pembayaran: [],
      childitembarangpo: [],
      CodingTerlarang: ["A3", "B3", "C3", "E3", "D3", "T3", "Z"],
      childpembayaran: [],
      WorkOrder: [],
      title: "Kosongkan",
      paketan: sessionStorage.getItem("paket"),
      token: localStorage.getItem("token"),
      groupSettings: { allowReordering: true },
      selectionOptions: { type: "Multiple" },
      //  selectionOptions: { type: 'Multiple', persistSelection: true, enableSimpleMultiRowSelection: true},
      selectionOptionsSatuan: { type: "Single" },
      toolbarOptions: ["Search", "ExcelExport"],
      pageSettings: { pageSizes: ["5", "10", "All"] },
      filterOptions: { type: "Menu" },
      filter: { type: "CheckBox" },
      commands: [],
      commandsMobile: [
        { buttonOption: { content: "Details", cssClass: "e-flat Details" } },
      ],
      MataUang: [],
      btn_datagrid: true,
      editSettings: {
        showDeleteConfirmDialog: true,
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Normal",
      },
      editSettingsSelect: {
        showDeleteConfirmDialog: false,
        allowEditing: false,
        allowAdding: false,
        allowDeleting: false,
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
      ExcelExport,
      ContextMenu,
    ],
  },
  mounted() {
    // console.log(JSON.parse(localStorage.getItem('user')).Kode.substr(0,4)+"/0001")
    // check actions
    if (this.action.some((a) => a == "R")) {
      this.items_periode = JSON.parse(localStorage.getItem("Periode")).map(
        (x) => x.Nama
      );
      this.autoTanggal();
      // console.log(this.HariIni)
      this.btn_datagrid = false;
      this.tanggal_awal = JSON.parse(
        localStorage.getItem("Periode")
      )[0].TglAwal;
      this.tanggal_akhir = JSON.parse(
        localStorage.getItem("Periode")
      )[0].TglAkhir;
      this.getDataPurchaseOrder(
        JSON.parse(localStorage.getItem("Periode"))[0].TglAwal,
        JSON.parse(localStorage.getItem("Periode"))[0].TglAkhir
      );
    }
    if (this.action.some((a) => a == "C")) {
      this.btn_tambah = false;
    }
    if (this.action.some((a) => a == "U")) {
      this.commands.push(
        {
          buttonOption: {
            content: " ",
            cssClass: "e-flat Apply",
            iconCss: "e-icons check-mark-01",
          },
        },
        {
          title: "Edit",
          buttonOption: {
            content: " ",
            cssClass: "e-flat Edit",
            iconCss: "e-edit e-icons",
          },
        }
      );
    }
    if (this.action.some((a) => a == "D")) {
      this.commands.push({
        title: "Hapus",
        buttonOption: {
          content: " ",
          cssClass: "e-flat Delete",
          iconCss: "e-delete e-icons",
        },
      });
    }
    this.getDataSupplier();
    this.getDataWo(0, 100);
    this.getDataMataUang();
    this.getDataUnit();
    // this.commands = [...this.commands]
  },
  created() {
    // get actions for this page
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
    Items:{
        deep: true,
        handler(val){
            // console.log(this.Items)
            let totalBarang = val.Barang.reduce((a,b) => a + parseFloat(b.SubTotal), 0)
            let totalPekerjaan =  val.Pekerjaan.reduce((a,b) => a + parseFloat(b.SubTotal), 0)
            let PPn = parseFloat(totalPekerjaan + totalBarang) * parseFloat(this.editedItem.PPnPersen) / 100
            this.editedItem.Diskon =  val.Barang.reduce((a,b) => a + parseFloat(b.DiskonRp), 0) + val.Pekerjaan.reduce((a,b) => a + parseFloat(b.DiskonRp), 0)
            this.editedItem.DPP = totalBarang + totalPekerjaan
            this.editedItem.Total = this.editedItem.Diskon + this.editedItem.DPP
            // console.log(this.editedItem.Total)
            this.editedItem.PPn = PPn
            this.editedItem.TotalBayar = totalBarang + totalPekerjaan + PPn
        }
    },
    dialog: {
      handler() {
        if (this.dialog == true) {
          this.editedItem.mata_uang = "Rupiah";
          this.editedItem.kurs = "1";
        }
      },
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Tambah Purchase Order"
        : "Edit Purchase Order";
    },
  },
  methods: {
    getDataUnit() {
      this.isLoading = true;
      api.get("unit?token=" + this.token).then(
        (res) => {
          this.isLoading = false;
          this.DataUnit = res.data.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    UbahSupplier() {
      this.isLoading = true;
      this.editedItem.Supplier = this.supplierAll.find(
        (s) => s.Nama == this.editedItem.Supplier
      ).Kode;
      this.editedItem.BillFrom = this.supplierAll.find(
        (s) => s.Nama == this.editedItem.BillFrom
      ).Kode;
      this.editedItem.SellFrom = this.supplierAll.find(
        (s) => s.Nama == this.editedItem.SellFrom
      ).Kode;
      api
        .put(
          "/purchase-orders-supplier/" +
            this.editedItem.id +
            "?token=" +
            this.token,
          this.editedItem
        )
        .then((res) => {
          if (res.data.message == "received") {
            alert("Barang PO Sudah di Received, tidak bisa Ubah Supplier");
          } else {
            this.getDataPurchaseOrder(this.tanggal_awal, this.tanggal_akhir);
          }
          this.close();
          this.isLoading = false;
          this.dialogEditSuplier = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    contextMenuClick(args) {
      switch (args.item.id) {
        case "UbahETA":
          this.isLoading = true;
          this.editedIndex = 1;
          this.dialog = true;
          this.lockedit = true;
          this.lockeditEta = true;
          api
            .get(
              "/purchase-orders/" +
                args.rowInfo.rowData.id +
                "?token=" +
                this.token
            )
            .then((res) => {
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
              if (args.rowInfo.rowData.Status == "BATAL") {
                alert("Tidak dapat di ubah karena sudah dibatalkan");
                this.btn_simpan = true;
              }
              this.ReserveOutcome = res.data.data.wo.ReserveOutcome;
              this.editedItem = res.data.data;
              this.editedItem.Supplier = res.data.data.supplier.Nama;
              this.editedItem.BillFrom = res.data.data.bill_from.Nama;
              this.editedItem.SellFrom = res.data.data.sell_from.Nama;
              this.editedItem.MataUang = res.data.data.uang.Nama;
              this.itembarangpo = res.data.data.items.map((v) => {
                v.DiskonRp = v.Diskon;
                v.Diskon = v.Diskon1;
                v.SubTotal =
                  v.Jumlah *
                  (parseFloat(v.Harga) -
                    (parseFloat(v.Harga) * parseFloat(v.Diskon)) / 100);
                v.Nama = v.barang.Nama;
                v.Merk = v.barang.Merk;
                v.TanggalKirim = v.ETA;
                v.PartNumber1 = v.barang.PartNumber1;
                v.Kendaraan = v.barang.Kendaraan;
                v.Gudang = v.gudang.Nama;
                v.Satuan = v.satuan.Nama;
                return v;
              });
              this.isLoading = false;
            });
          this.title = "Ubah";
          break;
        case "UbahSupplier":
          this.dialogEditSuplier = true;
          this.editedItem.id = args.rowInfo.rowData.id;
          break;
        default:
          console.log("nothing context menu action");
          break;
      }
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
      let endPoint =
        this.reportDesign.id.includes("Tmj") == true
          ? "report-po/tmj/"
          : this.reportDesign.id.includes("NoDiskon") == true
          ? "report-po/no-disc/"
          : "report-po/";
      // console.log(endPoint)
      var rute = {
        name: this.reportDesign.id.substr(1),
      };
      await api
        .get(endPoint + this.editedItem.id + "?token=" + this.token)
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
    Batalin(ket) {
      api
        .put("/batal-po/" + this.editedItem.id + "?token=" + this.token, {
          keterangan: ket,
        })
        .then((res) => {
          if (res.data.message == "received") {
            alert("Barang PO Sudah di Received, tidak bisa di batalkan");
            this.dialog_batal = false;
          } else {
            this.getDataPurchaseOrder(this.tanggal_awal, this.tanggal_akhir);
            this.dialog_batal = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    gudang(v) {
      this.Gudang = v;
    },
    perkiraan(p){
      this.Perkiraan = p;
      // console.log(this.Perkiraan)
    },
    onDoubleClickUang: function (args) {
      this.editedItem.MataUang = args.rowData.Nama;
      this.dialogMataUang = false;
    },
    getDataMataUang() {
      api.get("purchase-orders-uang?token=" + this.token).then(
        (res) => {
          this.MataUang = res.data.mataUang;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    loadPartOrder() {
      if (this.KodeIpo != "") {
        api
          .get(
            "purchase-orders-rpl?token=" +
              this.token +
              "&wo=" +
              this.editedItem.NomorWO +
              "&ipo=" +
              this.KodeIpo
          )
          .then(
            (res) => {
              this.editedItem.Referensi = res.data.data[0].NoPartOrder;
              // console.log(this.editedItem.Referensi,this.KodeIpo)
              this.PartOrderList = res.data.data
                .filter(
                  (p) =>
                    parseFloat(p.Terpenuhi) !=
                    parseFloat(p.Jumlah) * parseFloat(p.Rasio)
                )
                .filter(
                  (v) =>
                    parseFloat(v.TerpenuhiPO) <
                    parseFloat(v.Jumlah) * parseFloat(v.Rasio)
                )
                .filter((s) => s.Status != "BATAL")
                .map((d) => {
                  d.Harga = parseFloat(d.Harga);
                  d.JumlahSisa =
                    parseFloat(d.Jumlah) -
                    parseFloat(d.TerpenuhiPO) / parseFloat(d.Rasio);
                  d.Jumlah =
                    parseFloat(d.Jumlah) -
                    parseFloat(d.TerpenuhiPO) / parseFloat(d.Rasio);
                  d.SubTotal =
                    d.Jumlah *
                    (parseFloat(d.Harga) -
                      (parseFloat(d.Harga) * parseFloat(d.Diskon1)) / 100);
                  return d;
                });
              this.dialog_ipo = false;
            },
            (err) => {
              console.log(err);
            }
          );
      } else {
        api
          .get(
            "purchase-orders-rpl?token=" +
              this.token +
              "&wo=" +
              this.editedItem.NomorWO
          )
          .then(
            (res) => {
              // this.PartOrderList = res.data.data.filter(v => parseFloat(v.TerpenuhiPO) < parseFloat(v.Jumlah)).map(d => {
              //     d.JumlahSisa = parseFloat(d.Jumlah) - parseFloat(d.TerpenuhiPO)
              //     d.Jumlah = parseFloat(d.Jumlah) - parseFloat(d.TerpenuhiPO)
              //     d.SubTotal = d.Jumlah * (parseFloat(d.Harga) - parseFloat(d.Harga) * parseFloat(d.Diskon1) / 100)
              //     return d
              //   })
              this.KodeNotaIpo = res.data.data.map((p) => {
                return p.NoPartOrder;
              });
              this.dialog_ipo = true;
            },
            (err) => {
              console.log(err);
            }
          );
      }
      this.KodeIpo = "";
    },
    change_date(a) {
      this.tanggal_awal = JSON.parse(localStorage.getItem("Periode")).find(
        (d) => d.Nama === a
      ).TglAwal;
      this.tanggal_akhir = JSON.parse(localStorage.getItem("Periode")).find(
        (d) => d.Nama === a
      ).TglAkhir;
    },
    save() {
      if (this.editedIndex == -1) {
        // if (this.editedItem.NomorWO == "") {
        //   this.alert = true;
        //   this.pesan = "Nomor WO tidak boleh kosong";
        // }
        if (this.editedItem.Supplier == "") {
          this.alert = true;
          this.pesan = "Supplier tidak boleh kosong";
        } else if (this.editedItem.Kurs === "") {
          this.alert = true;
          this.pesan = "Kurs tidak boleh kosong";
        } else if (this.editedItem.PaymentTerm === "") {
          this.alert = true;
          this.pesan = "PaymentTerm tidak boleh kosong";
        } else {
          if (this.itembarangpo.length == 0) {
            this.snackbar = true;
          } else {
            if (this.editedItem.NomorWO != "") {
              if (parseFloat(this.AvailableBudget) > 0 && parseFloat(this.AvailableBudget) < this.editedItem.TotalBayar) {
                alert("Total Bayar Melebihi Budget");
              } else if (parseFloat(this.ReserveOutcome) < this.editedItem.TotalBayar) {
                alert("Total Bayar Melebihi Budget");
              } else {
                this.isLoading = true;
                this.TambahData();
                this.close();
              }
            } else {
              this.isLoading = true;
              this.TambahData();
              this.close();
            }
          }
        }
      } else {
        if (this.editedItem.Kurs === "") {
          // console.log(this.editedItem.Kurs)
          this.alert = true;
          this.pesan = "Kurs tidak boleh kosong";
        } else if (this.editedItem.PaymentTerm === "") {
          this.alert = true;
          this.pesan = "PaymentTerm tidak boleh kosong";
        } else {
          if (this.editedItem.NomorWO != "") {
            if (parseFloat(this.AvailableBudget) > 0 && parseFloat(this.AvailableBudget) < this.editedItem.TotalBayar) {
              alert("Total Bayar Melebihi Budget");
            } else if (parseFloat(this.ReserveOutcome) < this.editedItem.TotalBayar) {
              alert("Total Bayar Melebihi Budget");
            } else {
              this.isLoading = true;
              this.UpdateData();
              this.close();
            }
          } else {
            this.isLoading = true;
            this.UpdateData();
            this.close();
          }
        }
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
      this.editedItem.Unit =
        this.editedItem.Unit == ""
          ? ""
          : this.DataUnit.find((s) => s.Nama == this.editedItem.Unit).Kode;
      // console.log(this.editedItem.Unit)
      this.editedItem.items = this.itembarangpo.map((i) => {
        i.Gudang =
          i.Gudang == "" || i.Gudang == null
            ? JSON.parse(localStorage.getItem('user')).Kode.substr(0,4)+"/0001"
            : this.Gudang.find((g) => g.Nama == i.Gudang).Kode;
        i.Unit =
          i.Unit == "" || i.Unit == null
            ? null
            : this.DataUnit.find((u) => u.Nama == i.Unit).Kode;
        return i;
      });
      // console.log(this.itempojasa)
      this.editedItem.itemsJasa = this.Items.Pekerjaan
      api
        .post("/purchase-orders?token=" + this.token, this.editedItem)
        .then((res) => {
          if (res) {
            this.isLoading = false;
            this.close();
            this.getDataPurchaseOrder(this.tanggal_awal, this.tanggal_akhir);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    UpdateData() {
      this.editedItem.hapus_items = this.hapus_items;
      this.editedItem.hapus_itemsJasa = this.hapus_itemsJasa;
      this.editedItem.items = this.itembarangpo
        .filter((v) => v.KodeNota != undefined)
        .map((i) => {
          i.Gudang =
            i.Gudang == "" || i.Gudang == null
              ? JSON.parse(localStorage.getItem('user')).Kode.substr(0,4)+"/0001"
              : this.Gudang.find((g) => g.Nama == i.Gudang).Kode;
          return i;
        });
      this.editedItem.new_items = this.itembarangpo
        .filter((v) => v.KodeNota == undefined)
        .map((i) => {
          i.Gudang =
            i.Gudang == "" || i.Gudang == null
              ? JSON.parse(localStorage.getItem('user')).Kode.substr(0,4)+"/0001"
              : this.Gudang.find((g) => g.Nama == i.Gudang).Kode;
          return i;
        });
      this.editedItem.itemsJasa = this.Items.Pekerjaan.filter((v) => v.KodeNota != undefined)
      this.editedItem.new_itemsJasa = this.Items.Pekerjaan
        .filter((f) => f.KodeNota == undefined)
      api
        .put(
          "/purchase-orders/" + this.editedItem.id + "?token=" + this.token,
          this.editedItem
        )
        .then((res) => {
          if (res) {
            this.isLoading = false;
            this.close();
            this.getDataPurchaseOrder(this.tanggal_awal, this.tanggal_akhir);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    autoTanggal() {
      this.editedItem.tanggal = this.HariIni;
    },
    

    TambahPPn() {
      this.editedItem.PPnPersen = this.editedItem.PPnPersen || 0;
      this.editedItem.PPn =
        (parseInt(this.editedItem.PPnPersen) *
          parseFloat(this.editedItem.DPP)) /
        100;
      this.editedItem.TotalBayar =
        parseFloat(this.editedItem.DPP) + parseFloat(this.editedItem.PPn);
    },
    rowSelectedPartOrder: function () {
      //  console.log('singel')
      let grid = document.getElementById("GridOP").ej2_instances[0];
      this.storeSelect = grid.getSelectedRecords();
    },
    closeDialogPilihItems() {
      this.dialogPO = false;
    },
    close() {
      this.$nextTick(() => {
        this.ReserveOutcome = 0;
        this.AvailableBudget = 0
        this.dialog = false;
        this.lockedit = false;
        this.lockeditEta = false;
        this.title = "Kosongkan";
        this.editedItem = Object.assign({}, this.defaultItem);
        this.dialogWorkOrder = false;
        this.MenuTanggalPengiriman = false;
        this.menutanggalpo = false;
        this.editedIndex = -1;
        this.btn_simpan = false;
        this.itembarangpo = [];
        this.itempojasa = []
        this.autoTanggal();
        // this.$refs.BarangPO.resetBarangPO()
      });

      // console.log('ewewew',this.storeddata)
      // sessionStorage.removeItem('paket')
    },
    closePilihSupplier() {
      this.dialogsupplier = false;
    },
    closePilihBillFrom() {
      this.dialogBillFrom = false;
    },
    closePilihSellFrom() {
      this.dialogSellFrom = false;
    },
    closePilihWorkOrder() {
      this.dialogWorkOrder = false;
    },
    commandClick: function (args) {
      if (args.target.classList.contains("Details")) {
        console.log("disni");
        this.isLoading = true;
        const data = args;
        this.editedIndex = 1;
        this.dialog_detail = true;
        api
          .get("/purchase-orders/" + data.rowData.id + "?token=" + this.token)
          .then((res) => {
            this.ReserveOutcome = res.data.data.wo.ReserveOutcome;
            this.editedItem = res.data.data;
            this.editedItem.Supplier = res.data.data.supplier.Nama;
            this.editedItem.BillFrom = res.data.data.bill_from.Nama;
            this.editedItem.SellFrom = res.data.data.sell_from.Nama;
            this.editedItem.MataUang = res.data.data.uang.Nama;
            this.itembarangpo = res.data.data.items.map((v) => {
              v.DiskonRp = v.Diskon;
              v.Diskon = v.Diskon1;
              v.SubTotal =
                v.Jumlah *
                (parseFloat(v.Harga) -
                  (parseFloat(v.Harga) * parseFloat(v.Diskon)) / 100);
              v.Nama = v.barang.Nama;
              v.Merk = v.barang.Merk;
              v.TanggalKirim = v.ETA;
              v.PartNumber1 = v.barang.PartNumber1;
              v.Kendaraan = v.barang.Kendaraan;
              v.Gudang = v.gudang.Nama;
              v.Satuan = v.satuan.Nama;
              return v;
            });
            this.isLoading = false;
          });
      }
      if (args.target.classList.contains("Print")) {
        this.dialog_print = true;
        this.editedItem.id = args.rowData.id;
      }
      if (args.target.classList.contains("Delete")) {
        var r = confirm("Yakin membatalkan transaksi?");
        if (r == true) {
          // api.delete('/purchase-orders/'+args.rowData.id+'?token='+this.token)
          // .then((res)=> {
          //     // this.item.splice(index, 1)
          //     console.log(res)
          //     this.getDataPurchaseOrder(this.tanggal_awal,this.tanggal_akhir)
          // })
          // .catch((err)=> {
          //     console.log(err)
          // })
          this.editedItem.id = args.rowData.id;
          this.dialog_batal = true;
        }
      } else if (args.target.classList.contains("Edit")) {
        this.isLoading = true;
        const data = args;
        this.editedIndex = 1;
        this.dialog = true;
        this.title = "Ubah";
        this.lockedit = true;
        api
          .get("/purchase-orders/" + data.rowData.id + "?token=" + this.token)
          .then((res) => {
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
            if (res.data.data.wo != undefined) {
              this.ReserveOutcome = res.data.data.wo.ReserveOutcome;
              this.AvailableBudget = res.data.data.wo.AvailableBudget
            }
            this.editedItem = res.data.data;
            this.editedItem.NomorWO =
              res.data.data.NomorWO == null ? "" : res.data.data.NomorWO;
            this.editedItem.Supplier = res.data.data.supplier.Nama;
            this.editedItem.BillFrom = res.data.data.bill_from.Nama;
            this.editedItem.SellFrom = res.data.data.sell_from.Nama;
            this.editedItem.MataUang = res.data.data.uang.Nama;
            this.itembarangpo = res.data.data.items.map((v) => {
              v.DiskonRp = v.Diskon;
              v.Diskon = v.Diskon1;
              v.SubTotal =
                v.Jumlah *
                (parseFloat(v.Harga) -
                  (parseFloat(v.Harga) * parseFloat(v.Diskon)) / 100);
              v.Nama = v.barang.Nama;
              v.Merk = v.barang.Merk;
              // v.maxUpdateJumlah =
              //   parseInt(v.rpl.Jumlah) -
              //   parseInt(v.rpl.TerpenuhiPO) / parseInt(v.Rasio) +
              //   v.Jumlah;
              v.TanggalKirim = v.ETA;
              v.PartNumber1 = v.barang.PartNumber1;
              v.Kendaraan = v.barang.Kendaraan;
              v.Gudang = v.gudang.Nama;
              v.Satuan = v.satuan.Nama;
              return v;
            });
            this.itempojasa = res.data.data.items_jasa.map((v) => {
              v.DiskonRp = v.Diskon;
              v.Diskon = v.Diskon1;
              v.SubTotal =
                v.Jumlah *
                (parseFloat(v.Harga) -
                  (parseFloat(v.Harga) * parseFloat(v.Diskon)) / 100);
              // v.rwl = res.data.rwl.find(
              //   (p) => p.JenisPekerjaan == v.JenisPekerjaan
              // );
              // v.JenisPekerjaan = v.pekerjaan.Nama;
              v.Perkiraan = v.perkiraan.Nama;
              return v;
            });
            this.isLoading = false;
          });
        this.title = "Ubah";
      } else if (args.target.classList.contains("Apply")) {
        let r = confirm("Ubah Apply/Un-Apply ?");
        if (r == true) {
          let apply = args.rowData.Apply == true ? false : true;
          api
            .put("/po-apply/" + args.rowData.id + "?token=" + this.token, {
              apply: apply,
            })
            .then((res) => {
              if (res) {
                this.getDataPurchaseOrder(
                  this.tanggal_awal,
                  this.tanggal_akhir
                );
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },

    //     ActionComplete(args) {
    //     console.log(args)
    // },
    //fungsi pilihan WO
    //fungsi pilihan Supplier
    rowSelectedSupplier: function (args) {
      this.editedItem.Supplier = args.rowData.Nama;
      this.editedItem.BillFrom = args.rowData.Nama;
      this.editedItem.SellFrom = args.rowData.Nama;
      this.editedItem.PaymentTerm = "0";
      this.dialogsupplier = false;
    },
    rowSelectedBillFrom: function (args) {
      this.editedItem.BillFrom = args.rowData.Nama;
      this.dialogBillFrom = false;
    },
    rowSelectedSellFrom: function (args) {
      this.editedItem.SellFrom = args.rowData.Nama;
      this.dialogSellFrom = false;
    },
    items(data) {
      this.itembarangpo = data;
      this.Items.Barang = data
      // console.log(this.Items)
      // this.editedItem.DPP = this.editedItem.DPP + data.reduce(
      //   (a, b) => a + parseFloat(b.SubTotal),
      //   0
      // );
      // this.editedItem.diskon = data.reduce(
      //   (a, b) =>
      //     a + parseFloat(b.Jumlah * parseFloat((b.Harga * b.Diskon) / 100)),
      //   0
      // );
      // this.editedItem.PPn =
      //   (parseInt(this.editedItem.PPnPersen) *
      //     parseFloat(this.editedItem.DPP)) /
      //   100;
      // this.editedItem.TotalBayar =
      //   parseFloat(this.editedItem.DPP) + parseFloat(this.editedItem.PPn);
    },
    hps_itemsJasa(data){
      this.hapus_itemsJasa = data;
    },
    itemsJasa(data){
      this.itempojasa = data;
      data.forEach(element => {
          if (element.Perkiraan != '') {
            let findPerkiraan = this.Perkiraan.find(f => f.Nama == element.Perkiraan)
            element.KodePerkiraan = findPerkiraan == undefined ? '' : findPerkiraan.Kode
          }
      });
      this.Items.Pekerjaan = data
      // this.editedItem.DPP = this.editedItem.DPP + data.reduce(
      //   (a, b) => a + parseFloat(b.SubTotal),
      //   0
      // );
      // this.editedItem.diskon = data.reduce(
      //   (a, b) =>
      //     a + parseFloat(b.Jumlah * parseFloat((b.Harga * b.Diskon) / 100)),
      //   0
      // );
      // this.editedItem.PPn =
      //   (parseInt(this.editedItem.PPnPersen) *
      //     parseFloat(this.editedItem.DPP)) /
      //   100;
      // this.editedItem.TotalBayar =
      //   parseFloat(this.editedItem.DPP) + parseFloat(this.editedItem.PPn);
    },
    hps_items(data) {
      this.hapus_items = data;
    },
    rowSelectedBarang(childitembarangpo, pembayaran) {
      this.itembarangpo = childitembarangpo;
      console.log("isi2", childitembarangpo);
      this.editedItem.DPP = pembayaran["DPP"];
      this.editedItem.PPnPersen = pembayaran["PPnPersen"];
      this.editedItem.TotalBayar = pembayaran["TotalBayar"];
      if (
        this.formTitle == "Tambah Purchase Order" &&
        childitembarangpo.length > 0
      ) {
        this.editedItem.referensi = this.itembarangpo[0].Refrensi;
      } else if (
        this.formTitle == "Edit Purchase Order" &&
        childitembarangpo.length > 0
      ) {
        this.editedItem.referensi = this.itembarangpo[0].Refrensi;
      } else if (childitembarangpo.length == 0) {
        console.log("ok");
      } else {
        // this.editedItem.Referensi = this.itembarangpo[0].Refrensi
      }
      // console.log(this.itembarangpo[0].Refrensi)
      // console.log('sync',this.itembarangpo)
    },
    //fungsi pilihan Barang
    // rowSelectedBarang: function() {
    //    let grid = document.getElementById("Grid").ej2_instances[0];
    //    this.itembarangpo = grid.getSelectedRecords();
    // },
    //fungsi pilihan Work Order Vuetify
    // pilihWorkOrder: function(item, row){
    //   row.select(true);
    //   this.editedItem.NomorWO = item.KodeNota
    //   this.editedItem.NomorRangka = item.NomorRangka
    //   this.editedItem.MataUang = item.MataUang
    //   this.editedItem.PaymentTerm = item.PaymentTerm
    //   this.editedItem.Kurs = item.Kurs

    // },

    //ambil data PO
    getData() {
      this.isLoading = true;
      api.get("/purchase-orders?token=" + this.token).then(
        (res) => {
          this.isLoading = false;
          console.log("data", res);
          this.data = res.data;
          this.data.PPnFaktur = res.data.PPnFaktur;
        },
        (err) => {
          console.log(err);
          // this.$router.push('/')
          // this.localStorage.removeItem('token')
        }
      );
    },

    getDataPurchaseOrder(from, to) {
      // console.log("from", from, "to", to);
      this.isLoading = true;
      api
        .get("/purchase-orders/" + from + "/" + to + "/?token=" + this.token)
        .then(
          (res) => {
            // console.log(res.data)
            this.isLoading = false;
            this.dialog_periode = false;
            this.data = res.data.data;
            // let x = []
            // this.data = x
          },
          (err) => {
            console.log(err);
            this.isLoading = false;
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

    //ambil data Supplier
    getDataSupplier() {
      api.get("/purchase-orders-supplier?token=" + this.token).then(
        (res) => {
          this.supplier = res.data.data.filter((p) => p.Aktif == "1");
          this.supplierAll = res.data.data;
        },
        (err) => {
          console.log(err);
          // this.$router.push('/')
          // this.localStorage.removeItem('token')
        }
      );
    },
    //ambil data WO
    getDataWo(skip, take) {
      api
        .get(
          "purchase-orders-wo?token=" +
            this.token +
            "&skip=" +
            skip +
            "&take=" +
            take
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
              "purchase-orders-wo?token=" +
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
        console.log(state);
        console.log(this.$refs);
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
              "purchase-orders-wo?token=" +
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
    onDoubleClick: function (args) {
      if (!this.CodingTerlarang.includes(args.rowData.Coding)) {
        this.editedItem.NomorWO = args.rowData.KodeNota;
        this.editedItem.MataUang = args.rowData.uang.Nama;
        this.editedItem.NomorRangka = args.rowData.NomorRangka;
        this.editedItem.PaymentTerm = args.rowData.PaymentTerm;
        this.editedItem.Kurs = args.rowData.Kurs;
        this.ReserveOutcome = args.rowData.ReserveOutcome;
        this.AvailableBudget = args.rowData.AvailableBudget;
        this.dialogWorkOrder = false;
      } else {
        alert(args.rowData.KeteranganWIP);
      }
    },
    dataStateChangeUnit: function (args) {
      console.log(args);
    },
    onDoubleClickUnit: function (args) {
      this.editedItem.Unit = args.rowData.Nama;
      this.dialogUnit = false;
    },
  },
};
</script>

<style>
/* Text ada di kanan */
.centered-input input {
  text-align: right;
}
span.e-btn-icon.e-icons.check-mark-01::before {
  content: "\e7ff";
}
</style>
