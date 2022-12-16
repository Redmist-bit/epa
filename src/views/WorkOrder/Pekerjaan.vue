<template>
  <v-col cols="12" md="12">
    <v-toolbar flat dark dense outlined color="white" class="elevation-5">
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
              <span class="headline">{{ "Pekerjaan" }}</span>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn dark text fab small @click="dialog = false">
              <v-icon class="mx-1">mdi-window-close</v-icon>
            </v-btn>
          </v-toolbar>
          <!-- table pilih PekerjaanKerja -->
          <v-col cols="12" md="12">
            <v-card>
              <!-- grid PekerjaanKerja -->
              <ejs-grid
                :dataSource="listPekerjaan"
                :allowReordering="true"
                :allowGrouping="true"
                :groupSettings="groupSettings"
                :allowSorting="true"
                :allowMultiSorting="true"
                :selectionSettings="selectionOptions"
                :toolbar="toolbarOptionsSelect"
                :allowResizing="true"
                :allowPaging="true"
                :rowSelected="rowSelectedPekerjaan"
              >
                <e-columns>
                  <e-column
                    field="Kode"
                    headerText="Kode"
                    width="120"
                  ></e-column>
                  <e-column
                    field="Nama"
                    headerText="Nama"
                    width="150"
                  ></e-column>
                  <e-column
                    field="GrupPekerjaan"
                    headerText="Grup Pekerjaan"
                    width="120"
                  ></e-column>
                  <e-column
                    field="GrupKendaraan"
                    headerText="Grup Kendaraan"
                    width="120"
                  ></e-column>
                  <e-column
                    field="HargaBeliDefault"
                    headerText="Harga Beli Default"
                    width="120"
                  ></e-column>
                  <e-column
                    field="HargaJualDefault"
                    headerText="Harga Jual Default"
                    width="120"
                  ></e-column>
                </e-columns>
              </ejs-grid>
            </v-card>
          </v-col>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="blue darken-4" @click="AddPekerjaan">
              <v-icon class="mr-1">mdi-check</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <!-- table items -->
    <v-card>
      <ejs-grid
        :dataSource="ItemsWoPekerjaan"
        height="200"
        width="100%"
        :allowReordering="true"
        :allowGrouping="true"
        :groupSettings="groupSettings"
        :allowSorting="true"
        :allowMultiSorting="true"
        :allowFiltering="true"
        :filterSettings="filterOptions"
        :allowResizing="true"
        :allowPaging="true"
      >
        <e-columns>
          <e-column
            field="Kode"
            headerText="Kode"
            width="170"
            :filter="filter"
          ></e-column>
          <e-column
            field="Nama"
            headerText="Pekerjaan"
            width="170"
            :filter="filter"
          ></e-column>
        </e-columns>
        <e-aggregates>
          <e-aggregate>
            <e-columns>
              <e-column type="Count" field="Pekerjaan"></e-column>
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
} from "@syncfusion/ej2-vue-grids";
Vue.use(GridPlugin);
export default {
  props: {
    title: String,
    listPekerjaan: Array,
  },
  data() {
    return {
      dialog: false,
      Pekerjaan: "",
      ItemsWoPekerjaan: [],
      selectionOptions: { type: "Multiple" },
      selectedData: [],
      toolbarOptionsSelect: ["Search"],
      pageSettings: { pageSizes: ["5", "10", "20", "50", "All"] },
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
    listPekerjaan(val) {
      console.log(val);
    },
  },
  methods: {
    AddPekerjaan() {
      if (this.selectedData.length > 0) {
        this.selectedData.forEach((e) => {
          let sameData = this.ItemsWoPekerjaan.findIndex(
            (c) => c.Kode == e.Kode
          );
          if (sameData == -1) {
            this.ItemsWoPekerjaan.push(e);
          }
        });
      } else {
        let sameData = this.ItemsWoPekerjaan.findIndex(
          (c) => c.Kode == this.selectedData.Kode
        );
        if (sameData == -1) {
          this.ItemsWoPekerjaan.push(this.selectedData);
        }
      }
      this.dialog = false;
      this.Pekerjaan = "";
      this.ItemsWoPekerjaan = [...this.ItemsWoPekerjaan];
    },
    rowSelectedPekerjaan(args) {
      this.selectedData = args.data;
    },
  },
};
</script>

<style></style>
