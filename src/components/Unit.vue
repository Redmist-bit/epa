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
            <strong>{{ $t("Unit.MainTitle") }} </strong>
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
          <v-toolbar-title dark>{{ $t("Unit.MainTitle") }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-dialog
            v-model="dialogUnit"
            scrollable
            max-width="600px"
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
                <span>{{ $t("All.BtnTambah") }} </span>
              </v-btn>
            </template>

            <v-card class="rounded-lg">
              <v-toolbar flat dark outline color="blue darken-4">
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-spacer></v-spacer>
                <v-btn dark text fab small @click="closedialogUnit()">
                  <v-icon class="mx-1">mdi-window-close</v-icon>
                </v-btn>
              </v-toolbar>

              <v-divider></v-divider>

              <v-card-text>
                <div class="mt-8 mb-n3">
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
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          dense
                          readonly
                          v-model="editedItem.Kode"
                          label="Kode"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col>
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
                              v-model="editedItem.TanggalPembelian"
                              label="Tanggal Pembelian"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.TanggalPembelian"
                            @input="MenuTanggalAwal = false"
                            color="blue darken-4"
                            locale="id"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          dense
                          v-model="editedItem.Nama"
                          label="Nama"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          dense
                          v-model="editedItem.SerialNumber"
                          label="SerialNumber"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          dense
                          v-model="editedItem.Product"
                          label="Product"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          dense
                          v-model="editedItem.Brand"
                          label="Brand"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          dense
                          v-model="editedItem.Type"
                          label="Type"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          dense
                          v-model="editedItem.CodeUnit"
                          label="CodeUnit"
                        >
                        </v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          dense
                          readonly
                          v-model="editedItem.Supplier"
                          label="Supplier"
                        >
                          <template v-slot:append>
                            <v-dialog
                              v-model="dialogSupplier"
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
                                    @click="dialogSupplier = false"
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
                                        :dataSource="supplier"
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
                                        :recordDoubleClick="rowSelectedSupplier"
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

                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          dense
                          v-model="editedItem.Memo"
                          label="Memo"
                        >
                        </v-text-field>
                      </v-col>

                      <!-- <v-col cols="12" sm="12" md="12">
                        <v-switch
                          dense
                          class="mt-2"
                          color="blue darken-4"
                          v-model="editedItem.Aktif"
                          label="Aktif"
                        >
                        </v-switch>
                      </v-col> -->
                    </v-row>
                  </v-container>
                </div>
              </v-card-text>

              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn
                    dark
                    color="error"
                    @click="dialogUnit">
                    <v-icon class="mr-1">mdi-close-circle</v-icon>Batal
                    </v-btn> -->
                <v-btn
                  dark
                  depressed
                  @click="save"
                  color="blue darken-4"
                  class="mr-n2"
                >
                  <v-icon left>mdi-content-save</v-icon>
                  <span class="mr-1">{{ $t("All.BtnSimpan") }} </span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>

        <div id="app">
          <ejs-grid
            :dataSource="DataUnit"
            width="100%"
            gridLines="Both"
            :height="mobile ? 'auto' : 'auto'"
            :allowReordering="true"
            :selectionSettings="selectionOptions"
            :allowSorting="true"
            :allowMultiSorting="true"
            :allowFiltering="true"
            :rowDataBound="rowDataBound"
            :filterSettings="filterOptions"
            :allowResizing="true"
            :allowPaging="true"
            :pageSettings="pageSettings"
            :toolbar="toolbarOptions"
            :commandClick="commandClick"
          >
            <e-columns>
              <e-column
                :visible="mobile"
                :allowFiltering="false"
                field="Commands"
                headerText="Aksi"
                width="120"
                :commands="commands"
                textAlign="Center"
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
                field="Aktif"
                headerText="Aktif"
                textAlign="Center"
                displayAsCheckBox="true"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiBuatTgl"
                headerText="DiBuatTgl"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiBuatOleh"
                headerText="DiBuatOleh"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiUbahTgl"
                headerText="DiUbahTgl"
                width="180"
              ></e-column>

              <e-column
                :filter="filter"
                field="DiUbahOleh"
                headerText="DiUbahOleh"
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
import {
  //   GridPlugin,
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
import Loading from "vue-loading-overlay";
import api from "../services/http";
export default {
  components: {
    Loading,
  },
  data() {
    return {
      supplier: [],
      dialogSupplier: false,
      pesan: "",
      MenuTanggalAwal: false,
      alert: "",
      ScrollKeAtas: false,
      mobile: null,
      windowSize: { x: 0, y: 0 },
      isLoading: false,
      fullPage: true,
      editedIndex: -1,
      defaultItem: {
        Kode: "",
        Nama: "",
        SerialNumber: "",
        Product: "",
        Brand: "",
        Type: "",
        CodeUnit: "",
        TanggalPembelian: new Date().toISOString().substr(0, 10),
        Supplier: "",
        Memo: "",
      },
      editedItem: {
        Kode: "",
        Nama: "",
        SerialNumber: "",
        Product: "",
        Brand: "",
        Type: "",
        CodeUnit: "",
        TanggalPembelian: new Date().toISOString().substr(0, 10),
        Supplier: "",
        Memo: "",
      },
      dialogUnit: false,
      token: localStorage.getItem("token"),
      DataUnit: [],
      commands: [],
      groupSettings: { allowReordering: true },
      selectionOptions: { type: "Multiple" },
      toolbarOptions: ["Search"],
      pageSettings: { pageSize: 20, pageSizes: ["20", "50", "100"] },
      filterOptions: { type: "Menu" },
      filter: { type: "CheckBox" },
      action: null,
      btn_tambah: true,
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
    if (this.action.some((a) => a == "R")) {
      this.getData();
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
    this.getSupplier();
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

    dialogUnit(val) {
      val || this.closedialogUnit();
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Unit" : "Ubah Unit";
    },
  },
  methods: {
    rowSelectedSupplier: function (args) {
      this.editedItem.Supplier = args.rowData.Nama;
      this.dialogSupplier = false;
    },
    getSupplier() {
      api.get("chunk-supplier?token=" + this.token).then((res) => {
        this.supplier = res.data.data.filter((p) => p.Aktif == "1");
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
    save() {
      if (this.editedIndex == -1) {
        if (this.editedItem.Nama == "") {
          this.alert = true;
          this.pesan = "Nama Unit tidak boleh kosong";
        } else {
          this.isLoading = true;
          this.TambahData();
        }
      } else {
        if (this.editedItem.Nama == "") {
          this.alert = true;
          this.pesan = "Nama Unit tidak boleh kosong";
        } else {
          this.isLoading = true;
          this.UpdateData();
        }
      }
    },
    TambahData() {
      if (this.editedItem.Supplier != "") {
        this.editedItem.Supplier = this.supplier.find(
          (s) => s.Nama == this.editedItem.Supplier
        ).Kode;
      }
      api
        .post("unit?token=" + this.token, this.editedItem)
        .then(() => {
          this.isLoading = false;
          this.getData();
          this.closedialogUnit();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    UpdateData() {
      if (this.editedItem.Supplier != "") {
        this.editedItem.Supplier = this.supplier.find(
          (s) => s.Nama == this.editedItem.Supplier
        ).Kode;
      }
      api
        .put(
          "unit/" + this.editedItem.id + "?token=" + this.token,
          this.editedItem
        )
        .then(() => {
          this.isLoading = false;
          this.getData();
          this.closedialogUnit();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    closedialogUnit() {
      this.dialogUnit = false;
      this.editedItem = this.defaultItem;
      this.editedIndex = -1;
      this.alert = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    commandClick: function (args) {
      if (args.target.classList.contains("Delete")) {
        var r = confirm("Yakin Hapus data ?");
        if (r == true) {
          api
            .delete("unit/" + args.rowData.id + "?token=" + this.token)
            .then(() => {
              this.getData();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else if (args.target.classList.contains("Edit")) {
        this.editedItem.Kode = args.rowData.Kode;
        this.editedItem.Nama = args.rowData.Nama;
        this.editedItem.SerialNumber = args.rowData.SerialNumber;
        this.editedItem.Product = args.rowData.Product;
        this.editedItem.Brand = args.rowData.Brand;
        this.editedItem.Type = args.rowData.Type;
        this.editedItem.CodeUnit = args.rowData.CodeUnit;
        this.editedItem.TanggalPembelian = args.rowData.TanggalPembelian;
        this.editedItem.Supplier =
          args.rowData.supplier === null ? "" : args.rowData.supplier.Nama;
        this.editedItem.Memo = args.rowData.Memo;
        this.editedItem.id = args.rowData.id;
        this.dialogUnit = true;
        this.editedIndex = 1;
      }
    },
    getData() {
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
  },
};
</script>

<style></style>
