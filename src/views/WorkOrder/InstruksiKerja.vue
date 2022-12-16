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
              <span class="headline">{{ "Intruksi Kerja" }}</span>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn dark text fab small @click="dialog = false">
              <v-icon class="mx-1">mdi-window-close</v-icon>
            </v-btn>
          </v-toolbar>
          <!-- table pilih InstruksiKerja -->
          <v-col cols="12" md="12">
            <v-card>
              <!-- grid InstruksiKerja -->
              <v-textarea
                name="input-7-1"
                filled
                label="Instruksi Kerja"
                v-model="Instruksi"
                auto-grow
              ></v-textarea>
            </v-card>
          </v-col>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="blue darken-4" @click="AddInstruksiKerja">
              <v-icon class="mr-1">mdi-check</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <!-- table items -->
    <v-card>
      <ejs-grid
        :dataSource="ItemsWoInstruksiKerja"
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
            field="InstruksiKerja"
            headerText="Instruksi Kerja"
            width="170"
            :filter="filter"
          ></e-column>
        </e-columns>
        <e-aggregates>
          <e-aggregate>
            <e-columns>
              <e-column type="Count" field="InstruksiKerja"></e-column>
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
    ItemsWoIntruksi: Array,
    title: String,
  },
  data() {
    return {
      dialog: false,
      Instruksi: "",
      ItemsWoInstruksiKerja: [],
      selectionOptions: { type: "Multiple" },
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
  methods: {
    AddInstruksiKerja() {
      this.ItemsWoInstruksiKerja.push({ InstruksiKerja: this.Instruksi });
      this.dialog = false;
      this.Instruksi = "";
      this.ItemsWoInstruksiKerja = [...this.ItemsWoInstruksiKerja];
    },
  },
};
</script>

<style></style>
