<template>
  <v-col cols="12" md="12">
    <v-card>
      <v-toolbar flat dark dense outlined color="white" class="elevation-5">
        <v-dialog v-model="dialogSatuan" max-width="500px" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              class="mx-n2"
              color="blue darken-4"
              v-bind="attrs"
              v-on="on"
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
              <v-btn dark text fab small @click="closeDialogSatuan">
                <v-icon class="mx-1">mdi-window-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-col cols="12" md="12">
              <v-card class="elevation-5 py-2 px-5">
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      clearable
                      v-model="editedItem.Rasio"
                      label="Rasio"
                      @keypress="isNumber($event)"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.Nama"
                      clearable
                      label="Nama"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark color="blue darken-4" @click="simpanSatuan">
                <v-icon class="mr-1">mdi-check</v-icon>Pilih
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

      <ejs-grid
        :dataSource="SatuanList"
        height="200"
        width="100%"
        :toolbar="toolbarOptions"
        :allowReordering="true"
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
      >
        <e-columns>
          <e-column
            field="Commands"
            headerText="Action"
            width="65"
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
            :isPrimaryKey="true"
            :filter="filter"
            fieldText=""
            field="Rasio"
            headerText="Rasio"
            textAlign="Left"
            width="80"
          >
          </e-column>

          <e-column :filter="filter" field="Nama" headerText="Nama" width="200">
          </e-column>
        </e-columns>
      </ejs-grid>
    </v-card>
  </v-col>
</template>

<script>
import Vue from "vue";
import api from "@/services/http";
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
export default {
  props: ["satuan"],
  data() {
    return {
      action: null,
      // Rasio: "",
      // Nama: "",
      dialogSatuan: false,
      commands: [],
      SatuanList: [],
      // SatuanListTemp: [],
      storeSelect: [],
      itemsBarangPembelian: [],

      editedIndex: -1,
      editedItem: {
        Rasio: 1,
        Nama: "PCS",
      },

      defaultItem: {
        Rasio: 1,
        Nama: "PCS",
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
      this.cekRasio();
      this.setSatuan();
      // this.AutoTanggal()
      // this.cekMataUang()
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
    // if (this.action.some(a => a == 'D')) {
    //   this.commands.push({
    //     buttonOption: {
    //       cssClass: 'e-flat Delete',
    //       iconCss: 'e-delete e-icons'
    //     }
    //   }, )
    // }
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
    //   val || this.closeDialogSatuan();
    // },
    // Rasio() {
    //   this.cekRasio()
    // }
    satuan(val) {
      this.SatuanList = val;
      console.log(this.SatuanList);
      console.log(this.SatuanList.length);
    },
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Satuan" : "Edit Satuan";
    },
  },
  methods: {
    onActionComplete(args) {
      // console.log("actionComplete", args);
      if (args.requestType === "batchsave" || args.requestType === "save") {
        console.log("data: " + JSON.stringify(this.SatuanList));
      } else if (args.requestType === "delete") {
        api.delete("/satuan/" + args.data[0].id + "?token=" + this.token);
        console.log(args.data[0].id);
        this.$emit("SyncSatuan", this.SatuanList);
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
    //pilih barang
    // rowSelectedBarang: function () {
    //   let grid = document.getElementById("Grid").ej2_instances[0];
    //   this.storeSelect = grid.getSelectedRecords();
    //   console.log(this.storeSelect)
    // },

    closeDialogSatuan() {
      this.$nextTick(() => {
        this.dialogSatuan = false;
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    cekRasio() {
      let x = this.Rasio;
      // if (x > 0 && x < 12) {
      if (x > 0) {
        this.Nama = "PCS";
      } else {
        this.Nama = "";
      }
    },
    //Simpan Satuan
    simpanSatuan() {
      this.SatuanList = [...this.SatuanList];
      // console.log(this.SatuanList.length,'disini')
      if (this.SatuanList.length > 0) {
        // console.log('disini')
        let obj = this.SatuanList.findIndex(
          (d) => d.Rasio == this.editedItem.Rasio
        );
        console.log(obj);
        if (obj == -1) {
          this.SatuanList.push(this.editedItem);
        } else {
          this.SatuanList[obj].Rasio = this.editedItem.Rasio;
          this.SatuanList[obj].Nama = this.editedItem.Nama;
        }
      } else {
        this.SatuanList.push(this.editedItem);
      }
      this.SatuanList = [...this.SatuanList];
      this.$emit("SyncSatuan", this.SatuanList);
      // else{
      //   let data = this.satuan
      //   data.map(function (row){
      //     return {
      //       Rasio: row[0],
      //       Nama: row[1]
      //     }
      //   })
      //   this.$emit('SyncSatuanEdit',data)
      // }

      // const x = new Array();
      // x.push([this.Rasio, this.Nama])
      // if (this.formTitle === "Edit Barang" && this.Rasio != 0 && this.SatuanList < 0) {
      //   for (let index = 0; index < x.length; index++) {
      //     const element = x[index]
      //     this.SatuanListTemp = [...this.SatuanListTemp]
      //     this.SatuanListTemp.push(element)
      //   }
      //   const ListSatuan = this.SatuanListTemp.map(function (row) {
      //     return {
      //       Rasio: row[0],
      //       Nama: row[1]
      //     }
      //   })
      //   this.satuan = ListSatuan
      //   console.log(this.satuan)
      //   this.$emit('SyncSatuan', this.satuan)
      // } else {
      //   for (let index = 0; index < x.length; index++) {
      //     const element = x[index]
      //     this.SatuanListTemp = [...this.SatuanListTemp]
      //     this.SatuanListTemp.push(element)
      //   }
      //   const ListSatuan = this.SatuanListTemp.map(function (row) {
      //     return {
      //       Rasio: row[0],
      //       Nama: row[1]
      //     }
      //   })
      //   let xcs = ListSatuan.pop()
      //   this.$emit('SyncSatuan', xcs)
      // }
      this.closeDialogSatuan();
    },
    // reset SatuanList setelah di close
    resetSatuan() {
      this.SatuanList = [];
      this.SatuanListTemp = [];
    },
    // set SatuanList edit
    setSatuan() {
      let it = sessionStorage.getItem("satuanEdit");
      let id = sessionStorage.getItem("brg");
      if (id == "[]") {
        // Do Nothing
      } else if (it === null) {
        sessionStorage.setItem("satuanEdit", "[]");
      } else {
        let x = JSON.parse(sessionStorage.getItem("satuanEdit"));
        this.SatuanList = [...this.SatuanList];
        this.SatuanList = x;
      }
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
        console.log("satuan", data);
        this.editedIndex = 1;
        this.dialogSatuan = true;
        this.editedItem = data.rowData;

        this.editedItem.Nama = data.rowData.Nama;
        this.editedItem.Rasio = data.rowData.Rasio;

        (err) => {
          console.log(err);
        };
      }
    },
  },
};
</script>
