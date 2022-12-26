<template>
  <v-col cols="12" md="12" v-resize="onResize">
    <v-toolbar
      flat
      dark
      dense
      outlined
      color="white"
      class="elevation-5"
      v-show="mobile == true"
    >
      <v-dialog v-model="dialogItemsPerkiraan" max-width="1000px" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            class="mx-n2"
            color="blue darken-4"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
            {{ $t("All.BtnTambah") }}
          </v-btn>
        </template>

        <v-card>
          <v-toolbar dark outline color="blue darken-4" class="elevation-0">
            <v-card-title>
              <span class="headline">{{ formTitleItemsPerkiraan }}</span>
              <!-- <h3>Tambah data</h3> -->
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn dark text fab small @click="closeDialogPilihItems">
              <v-icon class="mx-1">mdi-window-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-col cols="12" md="12">
            <v-card>
              <!-- grid Perkiraan -->
              <ejs-grid
                id="Grid"
                :dataSource="ItemsPerkiraanList"
                height="250"
                width="100%"
                gridLines="Both"
                :allowReordering="true"
                :selectionSettings="selectionOptions"
                :allowSorting="true"
                :allowMultiSorting="true"
                :allowFiltering="true"
                :filterSettings="filterOptions"
                :allowResizing="true"
                :allowPaging="true"
                :pageSettings="pageSettings"
                :toolbar="toolbarOptionsSelect"
                ref="list"
                :rowSelected="rowSelectedItemsPerkiraanList"
              >
                <e-columns>
                  <e-column
                    :filter="filter"
                    field="Kode"
                    headerText="Kode"
                    textAlign="Left"
                    width="180"
                  ></e-column>

                  <e-column
                    field="Nama"
                    headerText="Nama"
                    width="250"
                  ></e-column>

                  <e-column
                    field="IsDetail"
                    displayAsCheckBox="true"
                    headerText="Is Detail"
                    width="170"
                  ></e-column>

                  <e-column
                    field="Sifat"
                    displayAsCheckBox="true"
                    headerText="Sifat"
                    width="170"
                  ></e-column>

                  <e-column
                    field="Aktif"
                    displayAsCheckBox="true"
                    headerText="Aktif"
                    width="170"
                  ></e-column>

                  <e-column
                    field="Memo"
                    headerText="Memo"
                    width="170"
                  ></e-column>

                  <e-column
                    field="DiBuatTgl"
                    headerText="Di Buat Tgl"
                    width="160"
                  ></e-column>

                  <e-column
                    :filter="filter"
                    field="DiBuatOleh"
                    headerText="Di Buat Oleh"
                    width="160"
                  ></e-column>

                  <e-column
                    :filter="filter"
                    field="DiUbahTgl"
                    headerText="Di Ubah Tgl"
                    width="160"
                  ></e-column>

                  <e-column
                    :filter="filter"
                    field="DiUbahOleh"
                    headerText="Di Ubah Oleh"
                    width="160"
                  ></e-column>
                </e-columns>
              </ejs-grid>
            </v-card>
          </v-col>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn
              dark
              color="error"
              @click="closeDialogPilihItems">
              <v-icon class="mr-1">mdi-close-circle</v-icon>Batal
            </v-btn> -->

            <v-btn dark color="blue darken-4" @click="PilihPerkiraan()">
              <v-icon class="mr-1">mdi-check</v-icon>Pilih
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-card color="grey lighten-3" class="pa-2 rounded-lg elevation-0">
      <!-- grid items Piutang Perkiraan -->
      <ejs-grid
        :dataSource="ItemsPerkiraanHutang"
        height="200"
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
        :recordDoubleClick="onDoubleClick"
        @actionComplete="onActionComplete"
      >
        <e-columns>
          <e-column
            field="NoUrut"
            headerText="NoUrut"
            width="170"
            :visible="false"
            :isPrimaryKey="true"
          >
          </e-column>
          <e-column
            field="Nama"
            headerText="Perkiraan"
            :allowEditing="false"
            width="170"
          ></e-column>

          <e-column
            field="Keterangan"
            headerText="Keterangan"
            width="170"
          ></e-column>

          <e-column
            field="Jumlah"
            headerText="Jumlah"
            editType="numericedit"
            textAlign="Right"
            :validationRules="customerJumlahRules"
            type="number"
            format="N"
            width="170"
          ></e-column>
        </e-columns>

        <e-aggregates>
          <e-aggregate>
            <e-columns>
              <e-column
                type="Count"
                field="Nama"
                :FooterTemplate="footerCount"
              ></e-column>
              <e-column type="Sum" format="N" field="Jumlah"></e-column>
            </e-columns>
          </e-aggregate>
        </e-aggregates>
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
  props: {
    totalBayar: String,
    ItemsPembayaran: Array,
    data_perkiraan: Array,
    title: String,
  },

  data() {
    return {
      mobile: null,
      windowSize: { x: 0, y: 0 },
      name: "itemspembayaran",
      setFocus: "",
      dialogItemsPerkiraan: false,
      customerJumlahRules: {
        required: true,
        min: 0,
        max: [this.customValidationFn, "Tidak Boleh Lebih dari Total Bayar"],
      },
      ItemsPerkiraanList: [],
      storeSelect: [],
      lastJumlah: "",
      hapus_items: [],
      ItemsPerkiraanHutang: [],
      totalBayarPerkiraan: "0",
      token: localStorage.getItem("token"),
      selectionOptions: { type: "Multiple" },
      toolbarOptionsSelect: ["Search"],
      pageSettings: { pageSizes: ["5", "10", "20", "50", "100"] },
      filterOptions: { type: "Menu" },
      filter: { type: "CheckBox" },
      editSettings: {
        showDeleteConfirmDialog: true,
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Normal",
      },
      groupSettings: { allowReordering: true },
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
      footerCount: function () {
        return {
          template: Vue.component("MaxTemplate", {
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
      Edit,
      CommandColumn,
      Reorder,
    ],
  },

  mounted() {
    // this.getDataPerkiraan()
  },
  // beforeCreate(){
  //     this.ItemsPerkiraanList = this.$options.propsData.data_perkiraan
  //     this.ItemsPerkiraanList = [...this.ItemsPerkiraanList]
  //     console.log('itemsperkiraanlist',this.ItemsPerkiraanList)
  //     console.log(document.getElementById("Grid").ej2_instances[0])
  // },
  created() {
    console.log("sx", this.data_perkiraan);
    this.ItemsPerkiraanList = this.data_perkiraan;
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

    ItemsPembayaran(val) {
      this.ItemsPerkiraanHutang = val;
    },

    title(ket) {
      console.log("title", ket);
      if (ket == "Kosongkan") {
        this.ItemsPerkiraanHutang = [];
        this.hapus_items = [];
      }
    },

    ItemsPerkiraanHutang(val) {
      // console.log(val)
      this.$emit("ItemsBYR", val);
      // console.log(this.title)
      // if (this.title == 'Ubah') {
      //   this.totalBayarPerkiraan = parseFloat(val.reduce((a,b) => a + parseFloat(b.Jumlah), 0))
      // } else {
      //   this.totalBayarPerkiraan = parseFloat(this.totalBayar) - parseFloat(val.reduce((a,b) => a + parseFloat(b.Jumlah), 0))
      // }
      this.totalBayarPerkiraan = parseFloat(
        val.reduce((a, b) => a + parseFloat(b.Jumlah), 0)
      );
    },
  },

  computed: {
    formTitleItemsPerkiraan() {
      return this.editedIndex === -1 ? "Tambah Perkiraan" : "Pilih Perkiraan";
    },
  },

  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },

    customValidationFn(args) {
      // console.log(args)
      // console.log(this.totalBayar)
      // console.log(this.totalBayarPerkiraan)
      let totalSemua =
        parseFloat(this.totalBayarPerkiraan) -
        parseFloat(this.lastJumlah) +
        parseFloat(args.value);

      if (totalSemua <= parseFloat(this.totalBayar)) {
        return true;
      } else {
        return false;
      }
      // if (parseFloat(args.value) <= parseFloat(this.totalBayar) && parseFloat(args.value) <= parseFloat(this.totalBayarPerkiraan)) {
      //   return true
      // } else {
      //   return false
      // }
    },
    rowSelectedItemsPerkiraanList: function () {
      // let grid = document.getElementById("Grid").ej2_instances[0];
      this.storeSelect = this.$refs.list.getSelectedRecords();
      // console.log(this.storeSelect,'di row selected')
      // console.log(this.storeSelect)
      // this.storeSelect.forEach(element => {
      // 	element.gudang_tujuan = ''
      // })
    },

    PilihPerkiraan() {
      this.ItemsPerkiraanHutang = [...this.ItemsPerkiraanHutang];
      if (this.ItemsPerkiraanHutang.length > 0) {
        for (let index = 0; index < this.storeSelect.length; index++) {
          const data = {
            Kode: this.storeSelect[index].Kode,
            Nama: this.storeSelect[index].Nama,
            NoUrut: index == 0 ? index + 1 + parseInt(this.ItemsPerkiraanHutang[this.ItemsPerkiraanHutang.length - 1].NoUrut) : parseInt(this.ItemsPerkiraanHutang[this.ItemsPerkiraanHutang.length - 1].NoUrut) + 1,
            Jumlah: 0,
            Keterangan: ""
          }
          this.ItemsPerkiraanHutang.push(data)
        }
      } else {
        for (let index = 0; index < this.storeSelect.length; index++) {
          const element = this.storeSelect[index];
          element.NoUrut = 1 + index;
          element.Jumlah = 0;
          element.Keterangan = "";
          this.ItemsPerkiraanHutang.push(element);
        }
      }
      this.ItemsPerkiraanHutang = [...this.ItemsPerkiraanHutang];
      this.dialogItemsPerkiraan = false;
      document.getElementById("Grid").ej2_instances[0].refresh();
    },

    onDoubleClick: function (args) {
      this.setFocus = args.column;
    },

    onActionComplete(args) {
      if (args.requestType === "beginEdit") {
        args.form.elements.namedItem(this.setFocus.field).focus();
        this.lastJumlah = args.rowData.Jumlah;
      }

      if (args.requestType === "batchsave" || args.requestType === "save") {
        // let data = this.ItemsPerkiraanHutang
        // this.ItemsPerkiraanHutang = data.map(item => {
        //   return {
        //     id:item.id,
        //     perkiraan: item.perkiraan,
        //     keterangan: item.keterangan,
        //     // jumlah_asing: parseFloat(item.jumlah_asing).toFixed(2),
        //     // mata_uang: item.mata_uang,
        //     // kurs: parseFloat(item.kurs).toFixed(2),
        //     // jumlah: (parseFloat(item.jumlah_asing) * parseFloat(item.kurs)).toFixed(2),
        //     jumlah: item.jumlah
        //   }
        // })
        this.ItemsPerkiraanHutang = [...this.ItemsPerkiraanHutang];
      }

      if (args.requestType === "delete" && this.title == "Ubah") {
        args.data.forEach((d) => {
          if (d.KodeNota != undefined) {
            this.hapus_items.push(d);
          }
        });
        this.$emit("hapus_item", this.hapus_items);
      }
    },

    closeDialogPilihItems() {
      this.dialogItemsPerkiraan = false;
    },

    getDataPerkiraan() {
      api.get("/coa?token=" + this.token).then(
        (res) => {
          this.ItemsPerkiraanList = res.data;
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
