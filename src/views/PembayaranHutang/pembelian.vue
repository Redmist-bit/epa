<template>
  <v-col cols="12" md="12" v-resize="onResize">
    <!-- <v-toolbar
      flat
      dark
      dense
      outlined
      color="white"
      class="elevation-5"
    > 
      <v-dialog v-model="dialogItemsFaktur"  max-width="1000px" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            class="mx-n2"
            color="blue darken-4"
            v-bind="attrs"
            v-on="on" >
            <v-icon>mdi-plus</v-icon>
            Tambah
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
              <span class="headline">{{ formTitleItemsFaktur }}</span>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn
              dark
              text
              fab
              small
              @click="closeDialogPilihItems">
              <v-icon class="mx-1">mdi-window-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-col cols="12" md="12">
            <v-card>
              <ejs-grid 
                id="Grid"
                :dataSource="ItemsFakturList" height='250' width='100%' gridLines='Both'
                :allowReordering = true
                :selectionSettings='selectionOptions'
                :allowSorting='true'
                :allowMultiSorting='true'
                :allowFiltering='true'
                :filterSettings='filterOptions'
                :allowResizing='true'
                :allowPaging='true'
                :pageSettings='pageSettings'
                :toolbar='toolbarOptionsSelect'
                :rowSelected="rowSelectedItemsFakturList"
              >
                <e-columns>
                  <e-column 
                    :filter='filter'
                    field='kode_nota' 
                    headerText='Faktur' 
                    textAlign='Left'
                    width=170
                  ></e-column>

                  <e-column
                    field='tanggal'
                    headerText='Tanggal'
                    width=170
                  ></e-column>

                  <e-column
                    field='tanggal_pengiriman'
                    headerText='Tanggal Pengiriman'
                    width=170
                  ></e-column>

                  <e-column
                    field='status'
                    headerText='Status'
                    width=170
                  ></e-column>

                  <e-column
                    field='total_bayar'
                    headerText='Total Bayar'
                    width=170
                  ></e-column>

                  <e-column
                    field='keterangan'
                    headerText='Keterangan'
                    width=170
                  ></e-column>

                  <e-column
                    field='referensi'
                    headerText='Referensi'
                    width=170
                  ></e-column>
                  
                  <e-column
                    field='created_at'
                    headerText='Di Buat Tgl'
                    width=170
                  ></e-column>
                  
                  <e-column
                    :filter='filter'
                    field='author.name'  
                    headerText='Di Buat Oleh' 
                    width=170
                  ></e-column>

                  <e-column
                    :filter='filter'
                    field='updated_at'  
                    headerText='Di Ubah Tgl' 
                    width=170
                  ></e-column>
                  
                  <e-column
                    :filter='filter'
                    field='modifier.name'  
                    headerText='Di Ubah Oleh' 
                    width=170
                  ></e-column> 
                </e-columns>
              </ejs-grid>
            </v-card>
          </v-col>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer> 
            <v-btn
              dark
              color="blue darken-4"
              @click="PilihFaktur()">
              <v-icon class="mr-1">mdi-check</v-icon>Pilih
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar> -->

    <v-card color="grey lighten-3" class="pa-2 rounded-lg elevation-0">
      <!-- grid items faktur -->
      <ejs-grid
        :dataSource="ItemsFakturHutang"
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
        :contextMenuItems="contextMenuItems"
        :contextMenuClick="contextMenuClick"
      >
        <e-columns>
          <e-column
            field="KodeNota"
            headerText="Faktur"
            width="180"
            :isPrimaryKey="true"
          ></e-column>

          <!-- <e-column
            field="wo.NomorPolisi"
            :allowEditing="false"
            headerText="Nomor Polisi"
            width="170"
          ></e-column> -->

          <e-column
            field="Keterangan"
            headerText="Keterangan"
            width="170"
          ></e-column>

          <e-column
            field="TotalBayar"
            type="number"
            :allowEditing="false"
            format="N"
            textAlign="Right"
            headerText="Total Bayar"
            width="170"
          ></e-column>

          <!-- <e-column
            field='OnRisk'
            :allowEditing= 'false'
            type="number" 
            format="N"
            headerText='On Risk'
            width=170
          ></e-column> -->

          <e-column
            field="SisaBayar"
            :allowEditing="false"
            type="number"
            textAlign="Right"
            format="N"
            headerText="Sisa Bayar"
            width="170"
          ></e-column>

          <e-column
            field="Jumlah"
            headerText="Jumlah"
            textAlign="Right"
            editType="numericedit"
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
                field="KodeNota"
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
  ContextMenu,
} from "@syncfusion/ej2-vue-grids";
Vue.use(GridPlugin);
export default {
  props: {
    ItemsPembelian: Array,
    data_faktur: Array,
    title: String,
  },

  data() {
    return {
      mobile: null,
      windowSize: { x: 0, y: 0 },
      name: "itemspembelian",
      setFocus: "",
      dialogItemsFaktur: false,
      ItemsFakturList: [],
      storeSelect: [],
      customerJumlahRules: {
        required: true,
        max: [this.customValidationFn, "Tidak Boleh Lebih dari Total Bayar"],
      },
      hapus_items: [],
      ItemsFakturHutang: [],
      token: localStorage.getItem("token"),
      selectionOptions: { type: "Multiple" },
      toolbarOptionsSelect: ["Search"],
      pageSettings: { pageSizes: ["2", "10", "All"] },
      filterOptions: { type: "Menu" },
      filter: { type: "CheckBox" },
      editSettings: {
        showDeleteConfirmDialog: true,
        allowEditing: true,
        allowAdding: false,
        allowDeleting: true,
        mode: "Normal",
      },
      contextMenuItems: [
        { text: "Lunas", target: ".e-content", id: "lunas" },
        { text: "Batal bayar", target: ".e-content", id: "batalbayar" },
        { text: "Lunas semua", target: ".e-content", id: "lunassemua" },
        {
          text: "Batal bayar semua",
          target: ".e-content",
          id: "batalbayarsemua",
        },
      ],
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
      ContextMenu,
    ],
  },

  created() {
    console.log("sx", this.data_faktur);
    this.ItemsFakturList = this.data_faktur;
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

    ItemsPembelian(val) {
      this.ItemsFakturHutang = val;
    },

    title(ket) {
      console.log("title", ket);
      if (ket == "Kosongkan") {
        this.ItemsFakturHutang = [];
        this.hapus_items = [];
      }
    },

    ItemsFakturHutang(val) {
      this.$emit("ItemsBELI", val);
    },
  },

  computed: {
    formTitleItemsFaktur() {
      return this.editedIndex === -1 ? "Tambah Faktur" : "Pilih Faktur";
    },
  },

  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },

    customValidationFn(args) {
      // console.log('ccs',args)
      if (
        parseFloat(args.value) <=
        parseFloat(args.element.form[2].ej2_instances[0].initialValue)
      ) {
        return true;
      } else {
        return false;
      }
    },
    contextMenuClick(args) {
      // console.log(args);
      if (args.item.id == "lunas") {
        args.rowInfo.rowData.Jumlah = args.rowInfo.rowData.TotalBayar;
        args.rowInfo.rowData.SisaBayar = 0;
      }
      if (args.item.id == "batalbayar") {
        args.rowInfo.rowData.Jumlah = 0;
        args.rowInfo.rowData.SisaBayar = args.rowInfo.rowData.TotalBayar;
      }
      if (args.item.id == "lunassemua") {
        this.ItemsFakturHutang = this.ItemsFakturHutang.map((d) => {
          d.Jumlah = d.TotalBayar;
          d.SisaBayar = 0;
          return d;
        });
      }
      if (args.item.id == "batalbayarsemua") {
        this.ItemsFakturHutang = this.ItemsFakturHutang.map((d) => {
          d.Jumlah = 0;
          d.SisaBayar = d.TotalBayar;
          return d;
        });
      }
      this.ItemsFakturHutang = [...this.ItemsFakturHutang];
    },
    rowSelectedItemsFakturList: function () {
      let grid = document.getElementById("Grid").ej2_instances[0];
      this.storeSelect = grid.getSelectedRecords();
    },

    PilihFaktur() {
      let data = this.storeSelect.map((val) => {
        return {
          faktur: {
            kode_nota: val.kode_nota,
          },
          keterangan: "",
          jumlah: 0.0,
          // jumlah_asing:0.00,
          // mata_uang:"Rupiah",
          // kurs:1.00
        };
      });
      data.forEach((element) => {
        this.ItemsFakturHutang.push(element);
      });
      this.ItemsFakturHutang = [...this.ItemsFakturHutang];
      this.dialogItemsFaktur = false;
      document.getElementById("Grid").ej2_instances[0].refresh();
    },

    onDoubleClick: function (args) {
      this.setFocus = args.column;
    },

    onActionComplete(args) {
      if (args.requestType === "beginEdit") {
        args.form.elements.namedItem(this.setFocus.field).focus();
      }
      if (args.requestType === "batchsave" || args.requestType === "save") {
        this.ItemsFakturHutang = [...this.ItemsFakturHutang]
        //   let data = this.ItemsFakturHutang
        //   this.ItemsFakturHutang = data.map(item => {
        //   return {
        //     id:item.id,
        //     faktur: item.faktur,
        //     keterangan: item.keterangan,
        //     jumlah_asing: parseFloat(item.jumlah_asing).toFixed(2),
        //     kurs: parseFloat(item.kurs).toFixed(2),
        //     jumlah: (parseFloat(item.jumlah_asing) * parseFloat(item.kurs)).toFixed(2),
        //   }
        // })
      }
      // if (args.requestType === "delete" && this.title == "Ubah") {
      //   args.data.forEach((d => {if (d.KodeNotaMaster != undefined) {
      //     this.hapus_items.push(d)
      //   }}))
      //   this.$emit('hapus_item',this.hapus_items)
      // }
    },

    closeDialogPilihItems() {
      this.dialogItemsFaktur = false;
    },
  },
};
</script>

<style></style>
