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
              <span class="headline">{{ "Keluhan" }}</span>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn dark text fab small @click="dialog = false">
              <v-icon class="mx-1">mdi-window-close</v-icon>
            </v-btn>
          </v-toolbar>
          <!-- table pilih KeluhanKerja -->
          <v-col cols="12" md="12">
            <v-card>
              <!-- grid KeluhanKerja -->
              <v-textarea
                name="input-7-1"
                filled
                label="Keluhan"
                v-model="Keluhan"
                auto-grow
              ></v-textarea>
            </v-card>
          </v-col>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="blue darken-4" @click="AddKeluhan">
              <v-icon class="mr-1">mdi-check</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <!-- table items -->
    <v-card color="grey lighten-3" class="pa-2 rounded-lg elevation-0">
      <ejs-grid
        :dataSource="ItemsWoKeluhan"
        height="200"
        width="100%"
        gridLines="Both"
        :allowReordering="true"
        ref="gg"
        :allowGrouping="true"
        :groupSettings="groupSettings"
        :allowSorting="true"
        :editSettings="editSettings"
        :allowMultiSorting="true"
        :allowFiltering="true"
        :filterSettings="filterOptions"
        :allowResizing="true"
        :allowPaging="true"
        @actionComplete="onActionComplete"
      >
        <e-columns>
          <e-column
            field="Keluhan"
            headerText="Keluhan"
            width="170"
            :filter="filter"
          ></e-column>
        </e-columns>
        <e-aggregates>
          <e-aggregate>
            <e-columns>
              <e-column type="Count" field="Keluhan"></e-column>
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
    ItemsKeluhan: Array,
    title: String,
  },
  data() {
    return {
      mobile: null,
      windowSize: { x: 0, y: 0 },
      dialog: false,
      Keluhan: "",
      ItemsWoKeluhan: [],
      hapus_items: [],
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

    ItemsKeluhan(val) {
      this.ItemsWoKeluhan = val;
    },
    title(ket) {
      if (ket == "Kosongkan") {
        this.ItemsWoKeluhan = [];
        this.ItemsWoKeluhan = [...this.ItemsWoKeluhan];
        this.hapus_items = [];
      }
    },
    ItemsWoKeluhan(val) {
      this.$emit("KeluhanDia", val);
    },
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },

    AddKeluhan() {
      this.ItemsWoKeluhan.push({ Keluhan: this.Keluhan });
      this.ItemsWoKeluhan = [...this.ItemsWoKeluhan];
      this.dialog = false;
      this.Keluhan = "";
      this.$refs.gg.refresh();
      console.log(this.$refs.gg);
      // document.getElementById("Grid").ej2_instances[0].refresh();
    },
    onActionComplete(args) {
      console.log(args);
      if (args.requestType === "batchsave" || args.requestType === "save") {
        this.ItemsWoKeluhan.find(
          (v) =>
            v.KodeNota == args.data.KodeNota && v.NoUrut == args.data.NoUrut
        ).Keluhan = args.data.Keluhan;
        this.ItemsWoKeluhan = [...this.ItemsWoKeluhan];
      }
      if (args.requestType === "delete" && this.title == "Ubah") {
        console.log(args.data[0]);
        if (
          args.data[0].KodeNota != undefined &&
          args.data[0].NoUrut != undefined
        ) {
          this.hapus_items.push(args.data[0].NoUrut);
        }
        this.$emit("hapus_item", this.hapus_items);
      }
    },
  },
};
</script>

<style></style>
