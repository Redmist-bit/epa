<template>
  <v-col cols="12" md="12">
    <v-card>
      <v-toolbar flat dark dense outlined color="white" class="elevation-5">
        <v-dialog v-model="dialogbeli" max-width="600px" persistent>
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
              <v-card class="elevation-5 py-2 px-5">
                <v-row>
                  <v-col cols="12" sm="4" md="4">
                    <v-select
                      :items="RasioList"
                      :item-text="TextNamaSatuan"
                      item-value="Rasio"
                      v-model="editedItem.Rasio"
                      label="Rasio"
                    >
                    </v-select>
                  </v-col>

                  <v-col cols="12" sm="4" md="4">
                    <v-combobox
                      clearable
                      :items="MataUangList"
                      v-model="editedItem.MataUang"
                      label="MataUang"
                    >
                    </v-combobox>
                  </v-col>

                  <v-col cols="12" sm="4" md="4">
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
                      @keyup="onchangeHarga(Harga)"
                      maxlength="12"
                      prefix="Rp"
                      class="mt-n3"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      dense
                      @keypress="isNumber($event)"
                      clearable
                      v-model="editedItem.Diskon"
                      label="Diskon"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark color="blue darken-4" @click="simpanHargaBeli">
                <v-icon class="mr-1">mdi-check</v-icon>Pilih
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

      <ejs-grid
        :dataSource="HargaBeliList"
        height="200"
        width="100%"
        :toolbar="toolbarOptions"
        :allowReordering="true"
        :groupSettings="groupSettings"
        :allowSorting="true"
        :allowMultiSorting="true"
        :allowFiltering="true"
        :filterSettings="filterOptions"
        :allowResizing="true"
        :allowPaging="true"
        :pageSettings="pageSettings"
        :commandClick="commandClick"
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
            :isPrimaryKey="true"
            fieldText=""
            field="Rasio"
            headerText="Rasio"
            textAlign="Left"
            width="120"
          >
          </e-column>

          <e-column field="MataUang" headerText="Mata Uang" width="120">
          </e-column>

          <e-column field="Tanggal" headerText="Tanggal" width="120">
          </e-column>

          <e-column
            field="Harga"
            headerText="HargaBeli"
            width="120"
            type="number"
            format="N"
          >
          </e-column>

          <e-column field="Diskon" headerText="Diskon" width="120"> </e-column>
        </e-columns>
      </ejs-grid>
    </v-card>
  </v-col>
</template>

<script>
import Vue from "vue";
import api from "@/services/http.js";
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
  props: ["hrgbeli", "satuan", "mataUang"],
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      dialogbeli: false,
      RasioReadonly: true,
      MenuTanggal: false,
      readonly: false,
      Rasio: "",
      MataUang: "Rupiah",
      Tanggal: "",
      // HargaBeli: '',
      Diskon: "",
      HargaBeliList: [],
      idHargaBeli: sessionStorage.getItem("brg"),
      HargaBeliListTemp: [],
      RasioList: [],
      Harga: "",
      MataUangList: [],
      storeSelect: [],
      itemsBarangPembelian: [],
      commands: [],
      options: {
        locale: "id-ID",
        prefix: "",
        suffix: "",
        length: 11,
        precision: 0,
      },

      editedIndex: -1,

      editedItem: {
        Rasio: "",
        MataUang: "Rupiah",
        Harga: 0,
        Diskon: 0,
        Tanggal: "",
      },
      defaultItem: {
        Rasio: "",
        MataUang: "Rupiah",
        Harga: 0,
        Diskon: 0,
        Tanggal: "",
      },

      token: localStorage.getItem("token"),
      selectionOptions: {
        type: "Multiple",
      },
      //  selectionOptions: { type: 'Multiple', persistSelection: true, enableSimpleMultiRowSelection: true},
      selectionOptionsSatuan: {
        type: "Single",
      },
      toolbarOptions: ["Search"],
      pageSettings: {
        pageSizes: ["2", "10", "All"],
      },
      groupSettings: {
        allowReordering: true,
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
    // console.log('prop',this.hrgjual)
    // this.firstHargaBeli()
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
    // dialogSatuan(val) {
    //   val || this.closeDialogPilihItems();
    //   this.getRasio()
    // },
    mataUang(val) {
      // console.log(val)
      this.MataUangList = val.map((d) => {
        return d.Nama;
      });
    },
    hrgbeli(val) {
      // this.HargaBeliList = val.harga.map(dx => {
      //   let obj = dx
      //   obj.Rasio = val.satuan.find(d=> dx.Rasio == d.Rasio).Nama
      //   return obj
      // })
      // this.satuan = val.satuan
      this.HargaBeliList = val;
    },
    satuan(va) {
      this.RasioList = va.map((d) => {
        return d.Nama;
      });
    },
    MataUang: {
      handler() {
        this.cekMataUang();
      },
      deep: true,
    },
    idHargaBeli: {
      handler() {
        this.setHargaBeli();
      },
    },
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Harga Beli" : "Edit Harga";
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
      //   api.delete('/BrgHrgBeli/' + args.data[0].id + '?token=' + this.token)
      //   this.$emit('SyncHargaBeli', this.HargaBeliList)
      //   sessionStorage.setItem('hrgbeliEdit', JSON.stringify(this.HargaBeliList))
      // } else if (args.requestType === "delete") {
      //   sessionStorage.setItem('hrgbeliEdit', JSON.stringify(this.HargaBeliList))
      //   this.$emit('SyncHargaBeli', this.HargaBeliList)
      // }
    },
    //pilih barang
    rowSelectedBarang: function () {
      let grid = document.getElementById("Grid").ej2_instances[0];
      this.storeSelect = grid.getSelectedRecords();
      console.log(this.storeSelect);
    },

    closeDialogPilihItems() {
      this.dialogbeli = false;
      // this.MataUang = "Rupiah"
      // this.editedItem = this.defaultItem
      // this.Rasio = ""
      // this.Harga = ""
      // this.Diskon = ""
      this.AutoTanggal();
      // this.editedIndex = -1
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
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
      // this.HargaJual = val
    },

    AutoTanggal() {
      this.editedItem.Tanggal = this.date;
    },
    getRasio() {
      return this.$rasio;
      //rasio select
      // this.RasioList = JSON.parse(sessionStorage.getItem('satuan'))
      // if (sessionStorage.getItem('satuan') == "[]") {
      //   this.RasioReadonly = true
      // } else {
      //   this.RasioReadonly = false
      // }
    },
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
    //Simpan Harga Beli
    simpanHargaBeli() {
      if (this.HargaBeliList.length > 0) {
        let obj = this.HargaBeliList.findIndex(
          (d) => d.Rasio == this.editedItem.Rasio
        );
        if (obj == -1) {
          this.HargaBeliList.push(this.editedItem);
        } else {
          this.HargaBeliList[obj].Rasio = this.editedItem.Rasio;
          this.HargaBeliList[obj].Tanggal = this.editedItem.Tanggal;
          this.HargaBeliList[obj].MataUang = this.editedItem.MataUang;
          this.HargaBeliList[obj].Harga = this.editedItem.Harga;
          this.HargaBeliList[obj].Diskon = this.editedItem.Diskon;
        }
      } else {
        this.HargaBeliList.push(this.editedItem);
      }
      this.HargaBeliList = [...this.HargaBeliList];
      this.$emit("SyncHargaBeli", this.HargaBeliList);
      // if (this.formTitle == "Tambah Harga Beli") {
      //   // const data = this.editedItem
      //   // console.log(data)
      // }else{
      //   let data = this.hrgbeli
      //   console.log(data)
      //   data.map(function (row){
      //     return {
      //       Rasio: row[0],
      //       MataUang: row[1],
      //       Tanggal: row[2],
      //       Harga: parseInt(row[3])
      //     }
      //   })
      //   this.$emit('SyncHargaBeliEdit',data)
      // }
      // const x = new Array();
      // x.push([this.Rasio, this.MataUang, this.Tanggal, this.Harga.replace(".", ''), this.Diskon])
      // if (this.formTitle === 'Edit Harga Barang' && this.Rasio != "" && this.MataUang != "" && this.Harga != "" && this.HargaBeliList.length == 0) {
      //   for (let index = 0; index < x.length; index++) {
      //     const element = x[index]
      //     this.HargaBeliListTemp = [...this.HargaBeliListTemp]
      //     this.HargaBeliListTemp.push(element)
      //     // console.log(this.HargaBeliList)
      //   }
      //   const ListHargaBeli = this.HargaBeliListTemp.map(function (row) {
      //     return {
      //       Rasio: row[0],
      //       MataUang: row[1],
      //       Tanggal: row[2],
      //       Harga: row[3].replace(".", ''),
      //       Diskon: row[4]
      //     }
      //   })
      //   // this.HargaBeliList = ListHargaBeli
      //   // sessionStorage.setItem('hrgbeliEdit',JSON.stringify(this.HargaBeliList))
      //   this.$emit('SyncHargaBeli', ListHargaBeli)
      // } else {
      //   for (let index = 0; index < x.length; index++) {
      //     const element = x[index]
      //     this.HargaBeliListTemp = [...this.HargaBeliListTemp]
      //     this.HargaBeliListTemp.push(element)
      //     // console.log(this.HargaBeliListTemp)
      //   }
      //   const ListHargaBeli = this.HargaBeliListTemp.map(function (row) {
      //     return {
      //       Rasio: row[0],
      //       MataUang: row[1],
      //       Tanggal: row[2],
      //       Harga: row[3].replace(".", ''),
      //       Diskon: row[4]
      //     }
      //   })
      //   // this.hrgbeli=[...this.hrgbeli]
      //   let xcs = ListHargaBeli.pop()
      //   // this.hrgbeli.push(xcs)
      //   // sessionStorage.setItem('hrgbeliEdit',JSON.stringify(this.HargaBeliList))
      //   // console.log(this.SatuanList)
      //   this.$emit('SyncHargaBeli', xcs)
      // }
      this.closeDialogPilihItems();
    },

    UpdateData() {
      console.log("update", this.editedItem);
      api
        .put("/BrgHrgBeli/" + this.editedItem.id + "?token=" + this.token, {
          Rasio: this.editedItem.Rasio,
          barangs_id: this.editedItem.barangs_id,
          Tanggal: this.editedItem.Tanggal,
          MataUang: this.editedItem.MataUang,
          Harga: this.editedItem.Harga,
          Diskon: this.editedItem.Diskon,
        })
        .then(() => {
          this.Rasio = "";
          this.Tanggal = "";
          this.MataUang = "";
          this.Harga = "";
          this.Diskon = "";
          this.getData();
          this.closeDialogPilihItems();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // reset Harga Beli Setelah Di close
    resetHargaBeli() {
      this.HargaBeliList = [];
      this.HargaBeliListTemp = [];
      this.$emit("SyncHargaBeli", this.HargaBeliList);
    },
    firstHargaBeli() {
      let id = sessionStorage.getItem("brg");
      if (id == "[]") {
        let x = [];
        this.HargaBeliList.push(...x);
      } else {
        let x = JSON.parse(sessionStorage.getItem("hrgbeliEdit"));
        this.HargaBeliList = [...this.HargaBeliList];
        this.HargaBeliList = x;
        sessionStorage.setItem("Page", "OK");
      }
    },
    setHargaBeli() {
      let id = sessionStorage.getItem("brg");
      if (id == "[]") {
        // Do Nothing
      } else {
        let x = JSON.parse(sessionStorage.getItem("hrgbeliEdit"));
        this.HargaBeliList = [...this.HargaBeliList];
        this.HargaBeliList = x;
        console.log(this.HargaBeliList);
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
        console.log("beli", data);
        this.editedIndex = 1;
        this.dialogbeli = true;
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
        this.editedItem.Diskon = data.rowData.Diskon;

        (err) => {
          console.log(err);
        };
      }
    },
  },
};
</script>
