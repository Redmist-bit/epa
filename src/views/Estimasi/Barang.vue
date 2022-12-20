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
      <v-dialog v-model="dialog" max-width="1000px" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            class="mx-n2"
            color="blue darken-4"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
            Tambah
          </v-btn>
        </template>

        <v-card>
          <v-toolbar dark outline color="blue darken-4" class="elevation-0">
            <v-card-title>
              <span class="headline">Barang</span>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn dark text fab small @click="dialog = false">
              <v-icon class="mx-1">mdi-window-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-col cols="12" md="12">
            <v-card>
              <ejs-grid
                id="Grid"
                ref="ggs"
                :dataSource="dataBarang"
                height="250"
                width="100%"
                gridLines="Both"
                :allowReordering="true"
                :selectionSettings="selectionOptions"
                :allowResizing="true"
                :allowPaging="true"
                :pageSettings="pageSettings"
                :toolbar="toolbarOptionsSelect"
                :rowSelected="rowSelectedBarang"
                :dataStateChange="dataStateChange"
              >
                <e-columns>
                  <e-column
                    field="Kode"
                    headerText="Kode"
                    textAlign="Left"
                    width="180"
                  >
                  </e-column>

                  <e-column field="Nama" headerText="Nama" width="250">
                  </e-column>

                  <e-column field="Merk" headerText="Merk" width="130">
                  </e-column>

                  <e-column
                    field="PartNumber1"
                    headerText="Part Number 1"
                    width="170"
                  >
                  </e-column>

                  <e-column
                    field="Kendaraan"
                    headerText="Kendaraan"
                    width="170"
                  >
                  </e-column>

                  <e-column field="Satuan" headerText="Satuan" width="170">
                  </e-column>
                </e-columns>
              </ejs-grid>
            </v-card>
          </v-col>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="blue darken-4" @click="Pilihbarang">
              <v-icon class="mr-1">mdi-check</v-icon>Pilih
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-card color="grey lighten-3" class="pa-2 rounded-lg elevation-0">
      <!-- grid items Barang Ipo -->
      <ejs-grid
        :dataSource="listBarang"
        height="200"
        width="100%"
        gridLines="Both"
        :allowReordering="true"
        :allowGrouping="true"
        :groupSettings="groupSettings"
        :allowSorting="true"
        :allowMultiSorting="true"
        :filterSettings="filterOptions"
        :allowResizing="true"
        :allowPaging="true"
        :editSettings="editSettings"
        :recordDoubleClick="onDoubleClick"
        @actionComplete="onActionComplete"
      >
        <e-columns>
          <e-column
            field="Bekas"
            displayAsCheckBox="true"
            headerText="Barang Bekas"
            editType="booleanedit"
            width="170"
          >
          </e-column>

          <e-column
            field="Barang"
            :allowEditing="false"
            headerText="Barang"
            width="170"
            :isPrimaryKey="true"
          >
          </e-column>

          <e-column
            :filter="filter"
            field="Nama"
            :allowEditing="false"
            headerText="Nama"
            width="280"
          >
          </e-column>

          <e-column
            field="PartNumber1"
            :allowEditing="false"
            headerText="Part Number 1"
            width="170"
          >
          </e-column>

          <e-column
            field="Merk"
            headerText="Merk"
            :allowEditing="false"
            width="170"
          >
          </e-column>
          <e-column
            field="Kendaraan"
            :allowEditing="false"
            headerText="Kendaraan"
            width="170"
          >
          </e-column>

          <e-column
            field="Jumlah"
            headerText="Jumlah"
            width="170"
            editType="numericedit"
            textAlign="Right"
          >
          </e-column>

          <e-column
            field="Satuan"
            :allowEditing="false"
            headerText="Satuan"
            width="170"
          >
          </e-column>

          <e-column
            field="Harga"
            headerText="Harga"
            type="number"
            editType="numericedit"
            format="N"
            width="170"
          >
          </e-column>

          <e-column
            field="Diskon"
            headerText="Diskon (%)"
            editType="numericedit"
            width="170"
          >
          </e-column>

          <e-column
            field="DiskonRp"
            type="number"
            format="N"
            :allowEditing="false"
            headerText="Diskon (Rp)"
            width="170"
          >
          </e-column>

          <e-column
            field="SubTotal"
            type="number"
            format="N"
            :allowEditing="false"
            headerText="SubTotal"
            textAlign="Right"
            width="170"
          >
          </e-column>
        </e-columns>

        <e-aggregates>
          <e-aggregate>
            <e-columns>
              <e-column type="Count" field="Barang"></e-column>
              <e-column type="Sum" format="N" field="SubTotal"></e-column>
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
    title: String,
    EstimasiBarang: Array,
  },
  data() {
    return {
      mobile: null,
      windowSize: { x: 0, y: 0 },
      dialog: false,
      toolbarOptionsSelect: ["Search"],
      selectionOptions: { type: "Multiple" },
      dataBarang: [],
      listBarang: [],
      hapus_items: [],
      barangSelected: null,
      setFocus: null,
      pageSettings: { pageSize: "20", pageSizes: ["20", "50", "100"] },
      filterOptions: { type: "Menu" },
      token: localStorage.getItem("token"),
      filter: { type: "CheckBox" },
      groupSettings: { allowReordering: true },
      skip: 0,
      editSettings: {
        showDeleteConfirmDialog: true,
        allowEditing: true,
        allowAdding: false,
        allowDeleting: true,
        mode: "Normal",
      },
      take: 20,
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

    EstimasiBarang(val) {
      this.listBarang = val;
    },
    title(ket) {
      if (ket == "Kosongkan") {
        this.listBarang = [];
        this.listBarang = [...this.listBarang];
        this.hapus_items = [];
      }
    },
    listBarang(val) {
      this.$emit("itemsBarang", val);
    },
  },
  mounted() {
    this.getDataBarang(0, 20);
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },

    Pilihbarang() {
      this.listBarang = [...this.listBarang];
      if (this.listBarang.length > 0) {
        if (this.barangSelected.length != undefined) {
          this.barangSelected.forEach((element) => {
            const data = element;
            let barangExist = this.listBarang.findIndex(
              (b) => b.Barang == data.Kode && b.Satuan == data.Satuan
            );
            console.log(data, barangExist);
            if (barangExist != -1) {
              this.listBarang[barangExist].Jumlah += 1;
              this.listBarang[barangExist].SubTotal = parseFloat(
                this.listBarang[barangExist].Jumlah *
                  parseFloat(
                    parseFloat(this.listBarang[barangExist].Harga) -
                      parseFloat(this.listBarang[barangExist].DiskonRp)
                  )
              );
            } else {
              data.Barang = data.Kode;
              data.Jumlah = 1;
              data.Harga = 0;
              data.Diskon = 0;
              data.DiskonRp = 0;
              data.SubTotal = 0;
              data.Bekas = false;
              this.listBarang.push(data);
            }
          });
        } else {
          let barangExist = this.listBarang.findIndex(
            (b) =>
              b.Barang == this.barangSelected.Kode &&
              b.Satuan == this.barangSelected.Satuan
          );
          if (barangExist != -1) {
            this.listBarang[barangExist].Jumlah += 1;
            this.listBarang[barangExist].SubTotal = parseFloat(
              this.listBarang[barangExist].Jumlah *
                parseFloat(
                  parseFloat(this.listBarang[barangExist].Harga) -
                    parseFloat(this.listBarang[barangExist].DiskonRp)
                )
            );
          } else {
            this.barangSelected.Barang = this.barangSelected.Kode;
            this.barangSelected.Jumlah = 1;
            this.barangSelected.Bekas = false;
            this.barangSelected.Harga = 0;
            this.barangSelected.Diskon = 0;
            this.barangSelected.DiskonRp = 0;
            this.barangSelected.SubTotal = 0;
            this.listBarang.push(this.barangSelected);
          }
        }
      } else {
        if (this.barangSelected.length != undefined) {
          this.barangSelected.forEach((element) => {
            const data = element;
            data.Barang = data.Kode;
            data.Bekas = false;
            data.Harga = 0;
            data.Diskon = 0;
            data.DiskonRp = 0;
            data.SubTotal = 0;
            data.Jumlah = 1;
            this.listBarang.push(data);
          });
        } else {
          this.barangSelected.Barang = this.barangSelected.Kode;
          this.barangSelected.Jumlah = 1;
          this.barangSelected.Harga = 0;
          this.barangSelected.Diskon = 0;
          this.barangSelected.DiskonRp = 0;
          this.barangSelected.SubTotal = 0;
          this.barangSelected.Bekas = false;
          this.listBarang.push(this.barangSelected);
        }
      }
      this.listBarang = [...this.listBarang];
      this.dialog = false;
    },
    dataStateChange: function (state) {
      if (state.action.requestType === "paging") {
        this.skip = state.skip;
        this.take = state.take;
        if (state.search != undefined) {
          api
            .get(
              "estimasi-barang?token=" +
                this.token +
                "&search=" +
                state.search[0].key +
                "&skip=" +
                state.skip +
                "&take=" +
                state.take
            )
            .then((res) => {
              this.dataBarang = res.data;
            });
        } else if (state.search == undefined) {
          this.getDataBarang(
            state.skip,
            state.take,
            this.sorted != null ? this.sorted : undefined,
            this.filter != null ? this.filter : undefined
          );
        }
      }

      if (state.action.requestType === "searching") {
        state.skip = 0;
        state.take = 20;
        if (
          state.action.searchString == "" &&
          this.$refs.ggs.$el.ej2_instances[0].pageSettings.currentPage == 1
        ) {
          this.getDataBarang(0, 20);
        } else if (
          this.$refs.ggs.$el.ej2_instances[0].pageSettings.currentPage == 1
        ) {
          api
            .get(
              "estimasi-barang?token=" +
                this.token +
                "&search=" +
                state.action.searchString +
                "&skip=" +
                0 +
                "&take=" +
                20
            )
            .then((res) => {
              this.dataBarang = res.data;
            });
        } else {
          this.$refs.ggs.$el.ej2_instances[0].pageSettings.currentPage = 1;
        }
      }
    },
    rowSelectedBarang() {
      this.barangSelected = this.$refs.ggs.ej2Instances.getSelectedRecords();
    },
    getDataBarang(skip, take, sort, filter) {
      api
        .get(
          "estimasi-barang?token=" +
            this.token +
            "&skip=" +
            skip +
            "&take=" +
            take +
            "&sort=" +
            sort +
            "&filter=" +
            filter
        )
        .then(
          (res) => {
            this.dataBarang = res.data;
          },
          (err) => {
            console.log(err);
          }
        );
    },
    onDoubleClick: function (args) {
      this.setFocus = args.column;
    },
    onActionComplete(args) {
      console.log(args);
      if (args.requestType === "beginEdit") {
        args.form.elements.namedItem(this.setFocus.field).focus();
      }
      if (args.requestType === "save") {
        // let kode = args.primaryKeyValue
        // this.listBarang.find(d => d.Barang == kode).DiskonRp = args.data.Harga * args.data.Diskon / 100
        // this.listBarang.find(d => d.Barang == kode).SubTotal =
        // console.log(args)
        // console.log(this.listBarang)
        let data = this.listBarang;
        this.listBarang = data.map((item) => {
          item.DiskonRp =
            (parseFloat(item.Harga) * parseFloat(item.Diskon)) / 100;
          item.SubTotal =
            item.Jumlah *
            (parseFloat(item.Harga) -
              (parseFloat(item.Harga) * parseFloat(item.Diskon)) / 100);
          return item;
        });
      }
      if (args.requestType === "delete" && this.title == "Ubah") {
        console.log(args.data[0]);
        if (
          args.data[0].KodeNota != undefined &&
          args.data[0].NoUrut != undefined
        ) {
          this.hapus_items.push({
            Barang: args.data[0].Barang,
            KodeNota: args.data[0].KodeNota,
            NoUrut: args.data[0].NoUrut,
          });
        }
        this.$emit("hpsBarang", this.hapus_items);
      }
    },
  },
};
</script>

<style></style>
