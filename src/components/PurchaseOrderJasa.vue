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
            <v-btn
              text
              @click="getDataPurchaseOrder(tanggal_awal, tanggal_akhir)"
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
            <strong>{{ $t("PJ.MainTitle") }}</strong>
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
            {{ $t("PJ.MainTitle") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-icon
            large
            :disabled="btn_datagrid"
            @click="dialog_periode = true"
            dark
          >
            mdi-calendar-range
          </v-icon>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" scrollable persistent max-width="1200px">
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
                <v-icon>mdi-plus</v-icon>
                {{ $t("All.BtnTambah") }}
              </v-btn>
            </template>
            <v-card>
              <v-toolbar dark dense color="blue darken-4" class="elevation-1">
                <v-toolbar-title dark>
                  <v-icon>mdi-cart-plus</v-icon>
                </v-toolbar-title>
                <span class="headline">{{ formTitle }}</span>
                <v-spacer></v-spacer>
                <v-btn darj text fab small @click="close">
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
                          v-model="editedItem.KodeNota"
                          :disabled="true"
                          label="Kode Nota"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          v-model="menuTanggalKirim"
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
                              label="TanggalKirim"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            locale="id"
                            v-model="editedItem.TanggalKirim"
                            @input="menuTanggalKirim = false"
                            :min="HariIni"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          v-model="menuTanggal"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :disabled="lockedit"
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
                            :min="HariIni"
                            v-model="editedItem.Tanggal"
                            @input="menuTanggal = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          v-model="editedItem.Referensi"
                          label="Referensi"
                        ></v-text-field>
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
                          v-model="editedItem.NomorWO"
                          readonly
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
                                      ref="ggs"
                                      :allowResizing="true"
                                      :allowPaging="true"
                                      :pageSettings="pageSettings"
                                      :toolbar="toolbarOptions"
                                      :recordDoubleClick="onDoubleClick"
                                    >
                                      <e-columns>
                                        <e-column
                                          field="KodeNota"
                                          headerText="Nomor Wo"
                                          textAlign="Left"
                                          width="195"
                                        ></e-column>
                                        <e-column
                                          field="NamaPelanggan"
                                          headerText="Pelanggan"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="NamaPemilik"
                                          headerText="Pemilik"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="NomorRangka"
                                          headerText="Nomor Rangka"
                                          width="180"
                                        ></e-column>
                                        <e-column
                                          field="NomorMesin"
                                          headerText="Nomor Mesin"
                                          width="180"
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

                                <v-divider></v-divider>
                              </v-card>
                            </v-dialog>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          v-model="editedItem.NomorRangka"
                          readonly
                          label="Nomor Rangka"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          v-model="editedItem.PaymentTerm"
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
                          v-model="editedItem.Kurs"
                          @keypress="isNumber($event)"
                          label="Kurs"
                        >
                        </v-text-field>
                      </v-col>
                      <v-btn
                        color="blue darken-4"
                        dark
                        :disabled="lockedit"
                        class="mb-2"
                        @click="loadWorkList"
                      >
                        Load Work List
                      </v-btn>

                      <v-col cols="12">
                        <v-card class="elevation-5" outlined>
                          <v-tabs
                            background-color="white"
                            color="dark"
                            slider-color="blue darken-4"
                          >
                            <v-tab>Account</v-tab>
                            <v-tab-item :eager="true">
                              <ItemsPoJasa
                                v-on:hapus_item="hps_items($event)"
                                v-on:dataPekerjaan="pekerjaan($event)"
                                v-bind:title="title"
                                v-on:dataPerkiraan="perkiraan($event)"
                                v-on:items="itemsPoJasa($event)"
                                v-bind:itemsJasa="itemJasa"
                                v-bind:loadRwl="WorkLis"
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
                                v-bind:options="DPP"
                                readonly
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
                                @input="TambahPPn()"
                              />
                            </v-col>

                            <v-col cols="12" sm="8">
                              <vuetify-money
                                dense
                                placeholder="0"
                                v-bind:options="PPn"
                                readonly
                                class="centered-input font-weight-bold"
                                v-model="editedItem.PPn"
                              />
                            </v-col>

                            <v-col cols="12" sm="12">
                              <vuetify-money
                                dense
                                placeholder="0"
                                readonly
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
        </v-toolbar>
        <div id="app">
          <ejs-grid
            :dataSource="data"
            :height="mobile ? '43vh' : 'auto'"
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
            :toolbar="toolbarOptions"
            :pageSettings="pageSettings"
            :rowDataBound="rowDataBound"
            :commandClick="commandClick"
            :contextMenuClick="contextMenuClick"
            :contextMenuItems="contextMenuItems"
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
                fieldText=""
                field="KodeNota"
                headerText="Kode Nota"
                textAlign="Left"
                width="180"
              >
              </e-column>

              <e-column field="Tanggal" headerText="Tanggal" width="150">
              </e-column>

              <e-column
                :filter="filter"
                field="supplier.Nama"
                headerText="Nama Supplier"
                width="170"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="TanggalKirim"
                headerText="Tanggal Kirim"
                width="170"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="Status"
                headerText="Status"
                width="170"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="Total"
                headerText="Total"
                type="number"
                format="N"
                width="170"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="Diskon"
                type="number"
                format="N"
                headerText="Diskon"
                width="170"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="DPP"
                type="number"
                format="N"
                headerText="DPP"
                width="170"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="PPn"
                type="number"
                format="N"
                headerText="PPn"
                width="170"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="TotalBayar"
                type="number"
                format="N"
                headerText="TotalBayar"
                width="170"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="Keterangan"
                headerText="Keterangan"
                width="170"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="Referensi"
                headerText="Referensi"
                width="170"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="wo.NomorRangka"
                headerText="Nomor Rangka"
                width="170"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="wo.NomorPolisi"
                headerText="NomorPolisi"
                width="170"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="NomorWO"
                headerText="NomorWO"
                width="170"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="wo.Lokasi"
                headerText="Lokasi"
                width="170"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="Apply"
                headerText="Apply"
                editType="booleanedit"
                displayAsCheckBox="true"
                type="boolean"
                width="170"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="DiBuatTgl"
                headerText="DiBuatTgl"
                width="170"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="DiBuatOleh"
                headerText="DiBuatOleh"
                width="170"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="DiUbahTgl"
                headerText="DiUbahTgl"
                width="170"
              >
              </e-column>

              <e-column
                :filter="filter"
                field="DiUbahOleh"
                headerText="DiUbahOleh"
                width="170"
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

    <v-dialog
      v-model="dialog_batal"
      transition="dialog-bottom-transition"
      max-width="400"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>Batal PO Jasa</v-toolbar>
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

            <strong class="text-h5"><b>Account</b></strong>

            <v-row no-gutters class="ml-n3 mr-n3">
              <ItemsPoJasa
                v-on:hapus_item="hps_items($event)"
                v-on:dataPekerjaan="pekerjaan($event)"
                v-on:dataPerkiraan="perkiraan($event)"
                v-on:items="itemsPoJasa($event)"
                v-bind:itemsJasa="itemJasa"
                v-bind:loadRwl="WorkLis"
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
import ItemsPoJasa from "../views/PurchaseOrderJasa/items.vue";
import "vue-loading-overlay/dist/vue-loading.css";
// import ItemsPurchaseOrder from '@/views/PurchaseOrder/items'
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
  ContextMenu,
} from "@syncfusion/ej2-vue-grids";

Vue.use(DatePickerPlugin);
Vue.use(GridPlugin);
export default {
  components: {
    Loading,
    ItemsPoJasa,
  },
  data() {
    return {
      lockedit: false,
      contextMenuItems: [],
      supplierAll: [],
      dialog_detail: false,
      alert: false,
      pesan: "",
      ScrollKeAtas: false,
      mobile: null,
      windowSize: { x: 0, y: 0 },
      ReserveOutcome: 0,
      WorkLis: [],
      itemJasa: [],
      printOutItems: [],
      btn_simpan: false,
      filterOptions: { type: "Menu" },
      CodingTerlarang: ["A3", "B3", "C3", "E3", "D3", "T3", "X", "Z"],
      MenuTanggalAwal: false,
      MenuTanggalAkhir: false,
      menuTanggalKirim: false,
      dialogMataUang: false,
      menuTanggal: false,
      keterangan_batal: "",
      dialog_batal: false,
      tanggal_awal: "",
      tanggal_akhir: "",
      items_periode: [],
      editedIndex: -1,
      dialog_periode: false,
      action: null,
      isLoading: false,
      fullPage: true,
      btn_tambah: true,
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
      hapus_items: [],
      reportDesign: null,
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
        MataUang: "",
        Kurs: 1,
        TanggalKirim: "",
        Referensi: "",
        NomorWO: "",
        NomorRangka: "",
        apply: "",
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
        MataUang: "",
        Kurs: 1,
        TanggalKirim: "",
        Referensi: "",
        NomorWO: "",
        NomorRangka: "",
        apply: "",
      },
      data: [],
      WorkOrder: [],
      dialogEditSuplier: false,
      dialog_print: false,
      title: null,
      token: localStorage.getItem("token"),
      groupSettings: { allowReordering: true },
      selectionOptions: { type: "Multiple" },
      selectionOptionsSatuan: { type: "Single" },
      toolbarOptions: ["Search"],
      pageSettings: { pageSizes: ["5", "10", "20", "50"] },
      filter: { type: "CheckBox" },
      commands: [],
      commandsMobile: [
        { buttonOption: { content: "Details", cssClass: "e-flat Details" } },
      ],
      MataUang: [],
      Pekerjaan: [],
      Perkiraan: [],
      dialogsupplier: false,
      dialogBillFrom: false,
      dialogSellFrom: false,
      btn_datagrid: true,
      dialogWorkOrder: false,
      dialog: false,
      supplier: [],
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
      ContextMenu,
    ],
  },
  mounted() {
    // check actions
    if (this.action.some((a) => a == "R")) {
      this.items_periode = JSON.parse(localStorage.getItem("Periode")).map(
        (x) => x.Nama
      );
      // this.autoTanggal()
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
      // console.log(this.HariIni)
    }
    if (this.action.some((a) => a == "C")) {
      this.btn_tambah = false;
    }
    if (this.action.some((a) => a == "U")) {
      this.commands.push({
        title: "Edit",
        buttonOption: {
          content: " ",
          cssClass: "e-flat Edit",
          iconCss: "e-edit e-icons",
        },
      });
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
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Tambah Purchase Order Jasa"
        : "Edit Purchase Order Jasa";
    },
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
  },

  methods: {
    async getDataPrint() {
      console.log(this.reportDesign);
      let endPoint =
        this.reportDesign.id.includes("Tmj") == true
          ? "report-po/tmj/"
          : this.reportDesign.id.includes("NoDiskon") == true
          ? "report-po/no-disc/"
          : this.reportDesign.id.includes("PoJasa") == true
          ? "report-po/jasa/"
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
            alert("Jasa PO Sudah di Received, tidak bisa Ubah Supplier");
          } else {
            this.getDataPurchaseOrder(this.tanggal_awal, this.tanggal_akhir);
          }
          this.isLoading = false;
          this.close();
          this.dialogEditSuplier = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    contextMenuClick(args) {
      switch (args.item.id) {
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
    Batalin(ket) {
      api
        .put("/batal-po/" + this.editedItem.id + "?token=" + this.token, {
          keterangan: ket,
        })
        .then((res) => {
          if (res.data.message == "received") {
            alert("Jasa PO Sudah di Received, tidak bisa di batalkan");
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
    hps_items(data) {
      this.hapus_items = data;
    },
    pekerjaan(v) {
      this.Pekerjaan = v;
    },
    perkiraan(v) {
      this.Perkiraan = v;
    },
    save() {
      if (this.editedIndex == -1) {
        if (this.editedItem.NomorWO == "") {
          this.alert = true;
          this.pesan = "Nomor WO tidak boleh kosong";
        } else if (this.editedItem.Supplier == "") {
          this.alert = true;
          this.pesan = "Supplier tidak boleh kosong";
        } else if (this.editedItem.Kurs === "") {
          this.alert = true;
          this.pesan = "Kurs tidak boleh kosong";
        } else if (this.editedItem.PaymentTerm === "") {
          this.alert = true;
          this.pesan = "PaymentTerm tidak boleh kosong";
        } else {
          if (this.itemJasa.length == 0) {
            this.snackbar = true;
          } else {
            if (parseFloat(this.ReserveOutcome) < this.editedItem.TotalBayar) {
              alert("Total Bayar Melebihi Budget");
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
          if (this.editedItem.TotalBayar > parseFloat(this.ReserveOutcome)) {
            alert("Total Bayar Melebihi Budget");
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
      this.editedItem.items = this.itemJasa.map((j) => {
        j.Perkiraan = this.Perkiraan.find((p) => p.Nama == j.Perkiraan).Kode;
        j.JenisPekerjaan = this.Pekerjaan.find(
          (p) => p.Nama == j.JenisPekerjaan
        ).Kode;
        return j;
      });
      api
        .post("/purchase-orders-jasa?token=" + this.token, this.editedItem)
        .then(() => {
          this.isLoading = false;
          this.close();
          this.getDataPurchaseOrder(this.tanggal_awal, this.tanggal_akhir);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    UpdateData() {
      this.editedItem.hapus_items = this.hapus_items.map((f) => {
        f.JenisPekerjaan = this.Pekerjaan.find(
          (p) => p.Nama == f.JenisPekerjaan
        ).Kode;
        return f;
      });
      this.editedItem.items = this.itemJasa
        .filter((f) => f.KodeNota != undefined)
        .map((j) => {
          j.Perkiraan = this.Perkiraan.find((p) => p.Nama == j.Perkiraan).Kode;
          j.JenisPekerjaan = this.Pekerjaan.find(
            (p) => p.Nama == j.JenisPekerjaan
          ).Kode;
          return j;
        });
      this.editedItem.new_items = this.itemJasa
        .filter((f) => f.KodeNota == undefined)
        .map((j) => {
          j.Perkiraan = this.Perkiraan.find((p) => p.Nama == j.Perkiraan).Kode;
          j.JenisPekerjaan = this.Pekerjaan.find(
            (p) => p.Nama == j.JenisPekerjaan
          ).Kode;
          return j;
        });
      api
        .put(
          "purchase-orders-jasa/" + this.editedItem.id + "?token=" + this.token,
          this.editedItem
        )
        .then(() => {
          this.isLoading = false;
          this.close();
          this.getDataPurchaseOrder(this.tanggal_awal, this.tanggal_akhir);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    itemsPoJasa(data) {
      this.itemJasa = data;
      this.editedItem.DPP = data.reduce(
        (a, b) => a + parseFloat(b.SubTotal),
        0
      );
      this.editedItem.diskon = data.reduce(
        (a, b) =>
          a + parseFloat(b.Jumlah * parseFloat((b.Harga * b.Diskon) / 100)),
        0
      );
      this.editedItem.PPn =
        (parseInt(this.editedItem.PPnPersen) *
          parseFloat(this.editedItem.DPP)) /
        100;
      this.editedItem.TotalBayar =
        parseFloat(this.editedItem.DPP) + parseFloat(this.editedItem.PPn);
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
    getDataPurchaseOrder(from, to) {
      this.isLoading = true;
      api
        .get(
          "/purchase-orders-jasa/" + from + "/" + to + "/?token=" + this.token
        )
        .then(
          (res) => {
            this.isLoading = false;
            this.dialog_periode = false;
            this.data = res.data.data;
          },
          (err) => {
            console.log(err);
            this.isLoading = false;
          }
        );
    },
    commandClick: function (args) {
      if (args.target.classList.contains("Details")) {
        console.log("disni");
        this.isLoading = true;
        const data = args;
        this.editedIndex = 1;
        this.dialog_detail = true;
        api
          .get(
            "/purchase-orders-jasa/" + data.rowData.id + "?token=" + this.token
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
            if (args.rowData.Status == "BATAL") {
              alert("Tidak dapat di ubah karena sudah dibatalkan");
              this.btn_simpan = true;
            }
            this.ReserveOutcome = res.data.data.wo.ReserveOutcomeJasa;
            this.editedItem = res.data.data;
            this.editedItem.Supplier = res.data.data.supplier.Nama;
            this.editedItem.BillFrom = res.data.data.bill_from.Nama;
            this.editedItem.SellFrom = res.data.data.sell_from.Nama;
            this.editedItem.MataUang = res.data.data.uang.Nama;
            this.itemJasa = res.data.data.items_jasa.map((v) => {
              v.DiskonRp = v.Diskon;
              v.Diskon = v.Diskon1;
              v.SubTotal =
                v.Jumlah *
                (parseFloat(v.Harga) -
                  (parseFloat(v.Harga) * parseFloat(v.Diskon)) / 100);
              v.JenisPekerjaan = v.pekerjaan.Nama;
              v.Perkiraan = v.perkiraan.Nama;
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
          this.editedItem.id = args.rowData.id;
          this.dialog_batal = true;
        }
      } else if (args.target.classList.contains("Edit")) {
        this.isLoading = true;
        const data = args;
        this.lockedit = true;
        this.editedIndex = 1;
        this.dialog = true;
        api
          .get(
            "/purchase-orders-jasa/" + data.rowData.id + "?token=" + this.token
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
            if (args.rowData.Status == "BATAL") {
              alert("Tidak dapat di ubah karena sudah dibatalkan");
              this.btn_simpan = true;
            }
            this.ReserveOutcome = res.data.data.wo.ReserveOutcomeJasa;
            this.editedItem = res.data.data;
            this.editedItem.Supplier = res.data.data.supplier.Nama;
            this.editedItem.BillFrom = res.data.data.bill_from.Nama;
            this.editedItem.SellFrom = res.data.data.sell_from.Nama;
            this.editedItem.MataUang = res.data.data.uang.Nama;
            this.itemJasa = res.data.data.items_jasa.map((v) => {
              v.DiskonRp = v.Diskon;
              v.Diskon = v.Diskon1;
              v.SubTotal =
                v.Jumlah *
                (parseFloat(v.Harga) -
                  (parseFloat(v.Harga) * parseFloat(v.Diskon)) / 100);
              v.rwl = res.data.rwl.find(
                (p) => p.JenisPekerjaan == v.JenisPekerjaan
              );
              v.JenisPekerjaan = v.pekerjaan.Nama;
              v.Perkiraan = v.perkiraan.Nama;
              return v;
            });
            this.isLoading = false;
          });
        this.title = "Ubah";
      } else if (args.target.classList.contains("Apply")) {
        let r = confirm("Ubah Apply/Un-Apply ?");
        if (r == true) {
          let apply = args.rowData.apply == 1 ? false : true;
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
    rowDataBound: function (args) {
      if (args.data.Status == "BATAL") {
        args.row.classList.add("above-80");
        args.row.classList.add("edit-batal");
        args.row.classList.add("hapus-batal");
      }
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
    getDataSupplier() {
      api.get("/purchase-orders-supplier?token=" + this.token).then(
        (res) => {
          this.supplierAll = res.data.data;
          this.supplier = res.data.data.filter((p) => p.Aktif == "1");
        },
        (err) => {
          console.log(err);
        }
      );
    },
    onDoubleClick: function (args) {
      if (!this.CodingTerlarang.includes(args.rowData.Coding)) {
        this.editedItem.NomorWO = args.rowData.KodeNota;
        this.editedItem.MataUang = args.rowData.uang.Nama;
        this.editedItem.NomorRangka = args.rowData.NomorRangka;
        this.editedItem.PaymentTerm = args.rowData.PaymentTerm;
        this.editedItem.Kurs = args.rowData.Kurs;
        this.ReserveOutcome = args.rowData.ReserveOutcomeJasa;
        this.dialogWorkOrder = false;
      } else {
        alert(args.rowData.KeteranganWIP);
      }
    },
    dataStateChange: function (state) {
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
    onDoubleClickUang: function (args) {
      this.editedItem.MataUang = args.rowData.Nama;
      this.dialogMataUang = false;
    },
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
    loadWorkList() {
      api
        .get(
          "purchase-orders-rwl?token=" +
            this.token +
            "&wo=" +
            this.editedItem.NomorWO
        )
        .then(
          (res) => {
            if (res.data.dataPj === null) {
              // console.log('disini')
              this.WorkLis = res.data.data.map((p) => {
                p.JumlahSisa = p.Jumlah;
                return p;
              });
            } else {
              let wl = [];
              res.data.data.forEach((rwl) => {
                let findIndexPj = res.data.dataPj.items_jasa.findIndex(
                  (p) => p.JenisPekerjaan == rwl.JenisPekerjaan
                );
                if (findIndexPj == -1) {
                  wl.push(rwl);
                } else {
                  if (
                    parseInt(res.data.dataPj.items_jasa[findIndexPj].Jumlah) <
                    parseInt(rwl.Jumlah)
                  ) {
                    rwl.Jumlah =
                      parseInt(rwl.Jumlah) -
                      parseInt(res.data.dataPj.items_jasa[findIndexPj].Jumlah);
                    rwl.JumlahSisa =
                      parseInt(rwl.Jumlah) -
                      parseInt(res.data.dataPj.items_jasa[findIndexPj].Jumlah);
                    wl.push(rwl);
                  }
                }
                // res.data.dataPj.items_jasa.forEach(pj => {
                //     if (rwl.JenisPekerjaan != pj.JenisPekerjaan) {
                //         console.log('disiniii',rwl.JenisPekerjaan,'pj',pj.JenisPekerjaan)
                //         wl.push(rwl)
                //     } else {
                //         if (pj.Jumlah < rwl.Jumlah) {
                //             rwl.Jumlah = parseInt(rwl.Jumlah) - parseInt(pj.Jumlah)
                //             wl.push(rwl)
                //         }
                //     }
                // });
              });
              this.WorkLis = wl;
            }
            console.log(res.data.dataPj);
          },
          (err) => {
            console.log(err);
          }
        );
    },
    close() {
      this.$nextTick(() => {
        this.lockedit = false;
        this.dialog = false;
        this.ReserveOutcome = 0;
        this.title = "Kosongkan";
        this.editedItem = Object.assign({}, this.defaultItem);
        this.dialogWorkOrder = false;
        this.MenuTanggalPengiriman = false;
        this.menutanggalpo = false;
        this.editedIndex = -1;
        this.btn_simpan = false;
        this.itemJasa = [];
        // this.autoTanggal()
        // this.$refs.BarangPO.resetBarangPO()
      });
    },
    change_date(a) {
      this.tanggal_awal = JSON.parse(localStorage.getItem("Periode")).find(
        (d) => d.Nama === a
      ).TglAwal;
      this.tanggal_akhir = JSON.parse(localStorage.getItem("Periode")).find(
        (d) => d.Nama === a
      ).TglAkhir;
    },
  },
};
</script>

<style></style>
