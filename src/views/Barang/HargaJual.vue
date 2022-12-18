<template>
  <v-col cols="12" md="12">
    <v-card>
      <v-toolbar flat dark dense outlined color="white" class="elevation-5">
        <v-dialog v-model="dialogjual" max-width="600px" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              class="mx-n2"
              color="blue darken-4"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left>mdi-plus-thick</v-icon>
              Tambah
            </v-btn>
          </template>

          <v-card>
            <v-toolbar dark outline color="blue darken-4" class="elevation-0">
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-spacer></v-spacer>
              <v-btn dark text fab small @click="closeDialogPilihItems">
                <v-icon class="mx-1">mdi-window-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-col cols="12" md="12">
              <v-card class="elevation-5 pa-2">
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      :items="RasioList"
                      :item-text="TextNamaSatuan"
                      item-value="Rasio"
                      v-model="editedItem.Rasio"
                      label="Rasio"
                    >
                    </v-select>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-combobox
                      clearable
                      :items="MataUangList"
                      v-model="editedItem.MataUang"
                      label="MataUang"
                    >
                    </v-combobox>
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
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      clearable
                      v-model="Harga"
                      prefix="Rp"
                      @keyup="onchangeHarga(Harga)"
                      maxlength="14"
                      class="mt-n3"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark color="blue darken-4" @click="simpanHargaJual">
                <v-icon class="mr-1">mdi-check</v-icon>Pilih
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

      <ejs-grid
        :dataSource="HargaJualList"
        height="200"
        width="100%"
        :toolbar="toolbarOptions"
        :allowReordering="true"
        :editSettings="editSettings"
        :selectionSettings="selectionOptions"
        :allowGrouping="true"
        :groupSettings="groupSettings"
        :allowSorting="true"
        :allowMultiSorting="true"
        :allowFiltering="true"
        :filterSettings="filterOptions"
        :allowResizing="true"
        :allowPaging="true"
        :pageSettings="pageSettings"
        :commandClick="commandClick"
        @actionComplete="onActionComplete"
      >
        <e-columns>
          <e-column
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
            :filter="filter"
            fieldText=""
            field="Rasio"
            headerText="Rasio"
            textAlign="Left"
            width="120"
          >
          </e-column>

          <e-column
            :filter="filter"
            field="MataUang"
            headerText="Mata Uang"
            width="150"
          >
          </e-column>

          <e-column
            :filter="filter"
            field="Tanggal"
            headerText="Tanggal"
            width="150"
          >
          </e-column>

          <e-column
            :filter="filter"
            field="Harga"
            TextAlign="Right"
            type="number"
            format="N"
            headerText="HargaJual"
            width="150"
          >
          </e-column>
        </e-columns>
      </ejs-grid>
    </v-card>
  </v-col>
</template>

<script>
import Vue from "vue";
import api from "@/services/http";
import VuetifyMoney from "vuetify-money";
import {
  GridPlugin,
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
Vue.use(GridPlugin);
Vue.use(VuetifyMoney);
export default {
  props: ["hrgjual", "satuan", "mataUang"],
  data() {
    return {
      action: null,
      date: new Date().toISOString().substr(0, 10),
      MenuTanggal: false,
      dialogjual: false,
      readonly: false,
      RasioReadonly: true,
      editedIndex: -1,
      Rasio: "",
      RasioList: null,
      commands: [],
      MataUangList: ["Rupiah", "Dollar"],
      Tanggal: "",
      // MataUang: "Rupiah",
      Harga: "",
      // HargaJualFormated: "0.00",
      options: {
        prefix: "",
        suffix: "",
        length: 11,
      },

      editedItem: {
        Rasio: "",
        Tanggal: "",
        Harga: 0,
        MataUang: "Rupiah",
        barangs_id: "",
      },
      defaultItem: {
        Rasio: "",
        Tanggal: "",
        Harga: 0,
        MataUang: "",
        barangs_id: "",
      },

      HargaJualList: [],
      HargaJualListTemp: [],
      idHargaJual: sessionStorage.getItem("brg"),
      storeSelect: [],
      itemsBarangPembelian: [],
      token: localStorage.getItem("token"),
      selectionOptions: {
        type: "Multiple",
      },
      //  selectionOptions: { type: 'Multiple', persistSelection: true, enableSimpleMultiRowSelection: true},
      selectionOptionsSatuan: {
        type: "Single",
      },
      toolbarOptions: ["Search", "Update", "Cancel"],
      toolbarOptionsSelect: ["Search"],
      groupSettings: {
        allowReordering: true,
      },
      pageSettings: {
        pageSizes: ["5", "10", "All"],
      },
      filterOptions: {
        type: "Menu",
      },
      filter: {
        type: "CheckBox",
      },
      editSettings: {
        showDeleteConfirmDialog: true,
        allowEditing: false,
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
      Edit,
      CommandColumn,
      Reorder,
    ],
  },

  mounted() {
    if (this.action.some((a) => a == "R")) {
      this.AutoTanggal();
      this.cekMataUang();
      // this.getData()
      // this.firstHargaJual()
    }
    if (this.action.some((a) => a == "U")) {
      this.commands.push({
        buttonOption: {
          cssClass: "e-flat Edit",
          iconCss: "e-edit e-icons",
        },
      });
    }
    if (this.action.some((a) => a == "D")) {
      this.commands.push({
        buttonOption: {
          cssClass: "e-flat Delete",
          iconCss: "e-delete e-icons",
        },
      });
    }
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
  },

  watch: {
    mataUang(val) {
      // console.log(val)
      this.MataUangList = val.map((d) => {
        return d.Nama;
      });
    },
    // dialogjual(val) {
    //   val || this.closeDialogPilihItems();
    //   this.getRasio()
    // },
    hrgjual(val) {
      // this.HargaJualList = val.harga.map(dx => {
      //   let obj = dx
      //   obj.Rasio = val.satuan.find(d=> dx.Rasio == d.Rasio).Nama
      //   return obj
      // })
      // this.satuan = val.satuan
      this.HargaJualList = val;
    },
    satuan(va) {
      this.RasioList = va.map((d) => {
        return d.Nama;
      });
    },
    // MataUang: {
    //   handler() {
    //     this.cekMataUang()
    //   },
    //   deep: true
    // },
    // idHargaJual: {
    //   handler() {
    //     this.setHargaJual()
    //   }
    // }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Tambah Harga Jual"
        : "Edit Harga Barang";
    },
  },

  methods: {
    TextNamaSatuan(val) {
      return val.Rasio + " - " + val.NamaSatuan;
    },
    onActionComplete(args) {
      console.log("actionComplete", args);
      // if (args.requestType === "batchsave" || args.requestType === "save") {
      //   console.log("data: " + JSON.stringify(this.SatuanList));
      // } else if (args.requestType === "delete" && args.data[0].id != null) {
      //   api.delete('/BrgHrgJual/' + args.data[0].id + '?token=' + this.token)
      //   this.$emit('SyncHargaJual', this.HargaJualList)
      //   sessionStorage.setItem('hrgjualEdit', JSON.stringify(this.HargaJualList))
      // } else if (args.requestType === "delete") {
      //   sessionStorage.setItem('hrgjualEdit', JSON.stringify(this.HargaJualList))
      //   this.$emit('SyncHargaJual', this.HargaJualList)
      // }
    },
    //pilih barang
    rowSelectedBarang: function () {
      let grid = document.getElementById("Grid").ej2_instances[0];
      this.storeSelect = grid.getSelectedRecords();
      console.log(this.storeSelect);
    },
    closeDialogPilihItems() {
      this.dialogjual = false;
      this.editedItem = [];
      this.editedItem.MataUang = "Rupiah";
      // console.log('in close btn', this.editedItem)
      // this.Tanggal = ""
      // this.MataUang = ""
      // this.Rasio = ""
      // this.Harga = ""
      this.editedIndex = -1;
      this.AutoTanggal();
    },

    onchangeHarga(val) {
      var number_string = val.replace(/[^,\d]/g, "").toString(),
        split = number_string.split(","),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

      // tambahkan titik jika yang di input sudah menjadi angka ribuan
      if (ribuan) {
        var separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
      }

      rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
      this.Harga = rupiah;
      this.editedItem.Harga = rupiah.replaceAll(".", "");
    },

    onHarga(val) {
      var number_string = val.replace(/[^,\d]/g, "").toString(),
        split = number_string.split(","),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

      // tambahkan titik jika yang di input sudah menjadi angka ribuan
      if (ribuan) {
        var separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
      }

      rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
      return rupiah;
    },

    AutoTanggal() {
      // tgl
      this.editedItem.Tanggal = this.date;
    },
    // getRasio() {
    //   return this.$rasio

    //   // this.RasioList = JSON.parse(sessionStorage.getItem('satuan'))
    //   // if (localStorage.getItem('satuan') == "[]") {
    //   //   this.RasioReadonly = true
    //   // } else {
    //   //   this.RasioReadonly = false
    //   // }
    // },
    cekMataUang() {
      if (this.MataUang == "Rupiah") {
        this.options.prefix = "Rp";
        this.readonly = false;
      } else if (this.MataUang == "Dollar") {
        this.options.prefix = "$";
        this.readonly = false;
      } else {
        this.readonly = true;
        this.Harga = "";
        this.options.prefix = "?";
      }
    },
    //Simpan Harga Jual
    simpanHargaJual() {
      if (this.HargaJualList.length > 0) {
        let obj = this.HargaJualList.findIndex(
          (d) => d.Rasio == this.editedItem.Rasio
        );
        if (obj == -1) {
          this.HargaJualList.push(this.editedItem);
        } else {
          this.HargaJualList[obj].Rasio = this.editedItem.Rasio;
          this.HargaJualList[obj].Tanggal = this.editedItem.Tanggal;
          this.HargaJualList[obj].MataUang = this.editedItem.MataUang;
          this.HargaJualList[obj].Harga = this.editedItem.Harga;
          this.HargaJualList[obj].Diskon = this.editedItem.Diskon;
        }
      } else {
        this.HargaJualList.push(this.editedItem);
      }
      this.HargaJualList = [...this.HargaJualList];
      this.$emit("SyncHargaJual", this.HargaJualList);
      // const x = new Array();
      // x.push([this.Rasio, this.MataUang, this.Tanggal, this.Harga.replace(".", '')])
      // if (this.formTitle === "Edit Harga Barang" && this.Rasio != "" && this.MataUang != "" && this.Harga != "" && this.HargaJualList.length == 0) {
      //   for (let index = 0; index < x.length; index++) {
      //     const element = x[index]
      //     console.log(element)
      //     this.HargaJualListTemp = [...this.HargaJualListTemp]
      //     this.HargaJualListTemp.push(element)
      //     // console.log(this.HargaJualList)
      //   }
      //   const ListHargaJual = this.HargaJualListTemp.map(function (row) {
      //     return {
      //       Rasio: row[0],
      //       MataUang: row[1],
      //       Tanggal: row[2],
      //       Harga: row[3].replace(".", '')
      //     }
      //   })
      //   this.$emit('SyncHargaJual', ListHargaJual)
      //   this.editedItem = this.defaultItem
      //   this.UpdateData()
      // } else {
      //   for (let index = 0; index < x.length; index++) {
      //     const element = x[index]
      //     this.HargaJualListTemp = [...this.HargaJualListTemp]
      //     this.HargaJualListTemp.push(element)
      //     // console.log(this.HargaJualListTemp)
      //   }
      //   const ListHargaJual = this.HargaJualListTemp.map(function (row) {
      //     return {
      //       Rasio: row[0],
      //       MataUang: row[1],
      //       Tanggal: row[2],
      //       Harga: row[3].replace(".", '')
      //     }
      //   })
      //   let xcs = ListHargaJual.pop()
      //   this.$emit('SyncHargaJual', xcs)
      // }
      this.closeDialogPilihItems();
    },

    UpdateData() {
      console.log("update", this.editedItem);
      api
        .put("/BrgHrgJual/" + this.editedItem.id + "?token=" + this.token, {
          Rasio: this.editedItem.Rasio,
          barangs_id: this.editedItem.barangs_id,
          Tanggal: this.editedItem.Tanggal,
          MataUang: this.editedItem.MataUang,
          Harga: this.editedItem.Harga,
        })
        .then(() => {
          this.Rasio = "";
          this.Tanggal = "";
          this.MataUang = "";
          this.Harga = "";
          this.getData();
          this.closeDialogPilihItems();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // reset harga jual setelah di close
    resetHargaJual() {
      this.HargaJualList = [];
      this.HargaJualListTemp = [];
      this.$emit("SyncHargaJual", this.HargaJualList);
    },
    firstHargaJual() {
      let id = sessionStorage.getItem("brg");
      if (id == "[]") {
        let x = [];
        this.HargaJualList.push(...x);
      } else {
        let x = JSON.parse(sessionStorage.getItem("hrgjualEdit"));
        this.HargaJualList = [...this.HargaJualList];
        this.HargaJualList = x;
        sessionStorage.setItem("Page", "OK");
      }
    },
    setHargaJual() {
      let id = sessionStorage.getItem("brg");
      if (id == "[]") {
        // Do Nothing
      } else {
        let x = JSON.parse(sessionStorage.getItem("hrgjualEdit"));
        this.HargaJualList = [...this.HargaJualList];
        this.HargaJualList = x;
        console.log(this.HargaJualList);
      }
    },

    getData() {
      api.get("/barangs?token=" + this.token).then(
        (res) => {
          console.log(res);
          this.hrgjual = res.data;
        },
        (err) => {
          this.$router.push("/");
          this.localStorage.removeItem("token");
          console.log(err);
        }
      );
    },

    commandClick: function (args) {
      if (args.target.classList.contains("custombutton")) {
        let data = JSON.stringify(args.rowData);
        console.log(data);
      } else if (args.target.classList.contains("Delete")) {
        var r = confirm("Yakin Hapus Data?");
        if (r == true) {
          api
            .delete("/barangs/" + args.rowData.id + "?token=" + this.token)
            .then((res) => {
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
        this.dialogjual = true;
        this.editedItem = data.rowData;
        this.id = data.rowData.id;

        this.editedItem.barangs_id = data.rowData.barangs_id;
        this.editedItem.id = data.rowData.id;
        this.editedItem.Harga = data.rowData.Harga;
        this.Harga = this.onHarga(data.rowData.Harga);
        // this.editedItem.Harga = parseInt(data.rowData.Harga).toString().replace(
        //   /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
        //   ".")
        this.editedItem.MataUang = data.rowData.MataUang;
        this.editedItem.Rasio = data.rowData.Rasio;

        (err) => {
          console.log(err);
        };
      }
    },
  },
};
</script>
