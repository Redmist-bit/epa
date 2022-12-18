<template>
  <v-col cols="12" md="12">
    <v-card>
      <v-toolbar flat dark dense outlined color="white" class="elevation-5">
      </v-toolbar>

      <ejs-grid
        :dataSource="StokList"
        height="200"
        width="100%"
        :toolbar="toolbarOptionsSelect"
        :allowReordering="true"
        :selectionSettings="selectionOptions"
        :groupSettings="groupSettings"
        :allowSorting="true"
        :allowMultiSorting="true"
        :allowFiltering="true"
        :filterSettings="filterOptions"
        :allowResizing="true"
        :allowPaging="true"
        :pageSettings="pageSettings"
      >
        <e-columns>
          <e-column
            :filter="filter"
            fieldText=""
            field="Gudang"
            headerText="Gudang"
            textAlign="Left"
            width="120"
          >
          </e-column>

          <e-column field="gudang.Nama" headerText="Nama" width="120">
          </e-column>

          <e-column field="StokAkhir" headerText="Stock On Hand" width="120">
          </e-column>
        </e-columns>
      </ejs-grid>
    </v-card>
  </v-col>
</template>

<script>
import Vue from "vue";
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
  props: ["stok"],
  data() {
    return {
      Gudang: "",
      Nama: "",
      StockOnHand: "",
      dialogSatuan: false,
      StokList: [],
      storeSelect: [],
      itemsBarangPembelian: [],
      token: localStorage.getItem("token"),
      selectionOptions: { type: "Multiple" },
      //  selectionOptions: { type: 'Multiple', persistSelection: true, enableSimpleMultiRowSelection: true},
      selectionOptionsSatuan: { type: "Single" },
      toolbarOptions: ["Search", "Delete", "Update", "Cancel"],
      toolbarOptionsSelect: ["Search"],
      pageSettings: { pageSizes: ["2", "10", "All"] },
      groupSettings: { allowReordering: true },
      filterOptions: { type: "Menu" },
      filter: { type: "CheckBox" },
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
  mounted() {},

  watch: {
    stok(val) {
      // console.log(val)
      this.StokList = [val];
    },
    // dialogSatuan(val) {
    //   val || this.closeDialogStok();
    // },
    // Rasio(){
    //   this.cekRasio()
    // }
  },

  computed: {
    formTitleItemsBarang() {
      return this.editedIndex === -1 ? "Tambah Barang" : "Pilih Barang";
    },
  },
  methods: {
    //pilih barang
    rowSelectedBarang: function () {
      let grid = document.getElementById("Grid").ej2_instances[0];
      this.storeSelect = grid.getSelectedRecords();
      console.log(this.storeSelect);
    },

    closeDialogStok() {
      this.dialogSatuan = false;
      this.Rasio = "";
      this.NamaSatuan = "";
    },
    //Simpan Satuan
    simpanStok() {
      const x = new Array();
      x.push([this.Gudang, this.Nama, this.StockOnHand]);
      if (this.Gudang != "") {
        for (let index = 0; index < x.length; index++) {
          const element = x[index];
          this.StokList = [...this.StokList];
          this.StokList.push(element);
          console.log(this.StokList);
        }
      }
    },
    //simpan barang dari list
    accbarang() {
      this.dialogSatuan = false;
      if (this.storeSelect.length > 1) {
        for (let i = 0; i < this.storeSelect.length; i++) {
          const element = this.storeSelect[i];
          delete element.Dimensi;
          delete element.PartNumber2;
          delete element.updated_at;
          delete element.created_at;
          delete element.Aktif;
          delete element.created_by;
          delete element.StokMin;
          delete element.StokMaks;
          element.Keterangan = "-";
          (element.Jumlah = "1"), (element.Satuan = "PCS");
          //  itembarang.push(element);
          this.itemsBarangPembelian.push(element);
          this.itemsBarangPembelian = [...this.itemsBarangPembelian];
          console.log(this.itemsBarangPembelian);
          //  this.itembarangipo.push(this.itembarang);
          //  this.itembarangipo = itembarang;
          //  localStorage.setItem("storage",JSON.stringify(itembarang));
        }
        this.$emit("SyncItemsBarangPembelian", this.itemsBarangPembelian);
      } else {
        for (let i = 0; i < this.storeSelect.length; i++) {
          const element = this.storeSelect[i];
          delete element.Dimensi;
          delete element.PartNumber2;
          delete element.updated_at;
          delete element.created_at;
          delete element.Aktif;
          delete element.created_by;
          delete element.StokMin;
          delete element.StokMaks;
          element.Keterangan = "-";
          (element.Jumlah = "1"), (element.Satuan = "PCS");
          //  itembarang.push(element);
          this.itemsBarangPembelian = [...this.itemsBarangPembelian];
          this.itemsBarangPembelian.push(element);
          //  this.itembarangipo.push(a)
          //  this.itembarangipo.push(this.itembarang);
          //  this.itembarangipo = itembarang;
          //  localStorage.setItem("storage",JSON.stringify(itembarang));
        }
        this.$emit("SyncItemsBarangPembelian", this.itemsBarangPembelian);
      }
    },
  },
};
</script>
