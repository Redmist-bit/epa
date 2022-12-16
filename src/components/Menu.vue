<template>
  <div v-resize="onResize">
    <!-- <loading :active.sync="isLoading" :is-full-page="fullPage"></loading> -->
    <div :class="mobile ? 'pa-3' : ''">
      <v-card
        tile
        outlined
        :class="mobile ? 'elevation-2 pa-2' : ''"
        :style="mobile ? '' : 'margin-bottom: 90px;'"
      >
        <v-toolbar flat v-show="mobile == false">
          <v-toolbar-title class="text-h5">
            <strong>Daftar Menu</strong>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-toolbar
          flat
          dark
          dense
          color="blue darken-4"
          v-show="mobile == true"
        >
          <v-toolbar-title dark> Daftar Menu </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="1200px" scrollable persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                class="mx-n2"
                color="blue darken-4"
                v-bind="attrs"
                :disabled="btn_tambah"
                v-on="on"
              >
                <v-icon>mdi-plus</v-icon>
                Tambah
              </v-btn>
            </template>

            <v-card>
              <v-toolbar dark outline class="elevation-0" color="blue darken-4">
                <v-card-title>
                  <span class="headline">{{ formTitleMenu }}</span>
                </v-card-title>
                <v-spacer></v-spacer>
                <v-btn dark text fab small @click="dialog = false">
                  <v-icon class="mx-1">mdi-window-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-card outlined class="mt-6">
                  <v-col>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <!-- <div id="app">
                                      <div id='container' style="margin:50px auto 0; width:250px;">
                                          <br>
                                      </div>
                                  </div> -->
                        <div id="app">
                          <keep-alive>
                            <ejs-dropdowntree
                              style="margin-top: 0%"
                              ref="dropdown"
                              id="dropdowntree"
                              :fields="fields"
                              @change="selectedChange"
                              @select="selectedMenu"
                              placeholder="Menu Parent"
                              floatLabelType="Auto"
                              headerTemplate="Parent"
                            ></ejs-dropdowntree>
                          </keep-alive>
                        </div>
                        <!-- <v-text-field
                                      dense
                                      class="centered-input"
                                      v-model="editedItem.parent"
                                      label="Parent">
                                  </v-text-field> -->
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          class="centered-input"
                          v-model="editedItem.nama"
                          label="Nama"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          class="centered-input"
                          v-model="editedItem.link"
                          label="Link"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          class="centered-input"
                          v-model="editedItem.NamaComponent"
                          label="Nama Component"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          class="centered-input"
                          v-model="editedItem.icon"
                          label="Icon"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          class="centered-input"
                          v-model="editedItem.idn"
                          label="Bahasa Indonesia"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          class="centered-input"
                          v-model="editedItem.eng"
                          label="Bahasa Inggris"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-checkbox
                          label="CRUD"
                          v-model="editedItem.crudAction"
                        ></v-checkbox>
                        <!-- :label="`Checkbox 1: ${checkbox.toString()}`" -->
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          class="centered-input"
                          v-model="editedItem.contextMenu"
                          v-on:keyup.enter="submit(editedItem.contextMenu)"
                          label="Context Menu"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          dense
                          class="centered-input"
                          v-model="editedItem.print"
                          v-on:keyup.enter="submitPrint(editedItem.print)"
                          label="Cetakan"
                        >
                        </v-text-field>
                      </v-col>
                      <!-- <div v-for="(value,index) in editedItem.contextMenuAction" :key="index">
                                  {{index}} <span class="e-badge e-badge-primary">{{value}}</span>
                              </div> -->
                    </v-row>
                    <!-- <v-card class="mx-auto" max-width="500">
                              <v-container class="py-0">
                                  <v-row align="center" justify="start">
                                      <v-col v-for="(selection, i) in editedItem.contextMenuAction" :key="i" class="shrink">
                                          <v-chip close @click:close="editedItem.contextMenuAction.splice(i, 1)" :color='"#"+(Math.random()*0xFFFFFF<<0).toString(16)' text-color="white">
                                              {{ selection }}
                                          </v-chip>
                                      </v-col>
                                  </v-row>
                              </v-container>
                          </v-card> -->
                    <v-container style="display: flex; justify-content: center">
                      <!-- context menu -->
                      <v-card
                        class="mx-auto"
                        max-width="500"
                        style="margin-top: 20px"
                      >
                        <v-card-title> Context Menu </v-card-title>
                        <v-container class="py-0">
                          <v-row align="center" justify="start">
                            <v-col
                              v-for="(
                                selection, i
                              ) in editedItem.contextMenuAction"
                              :key="i"
                              class="shrink"
                            >
                              <v-chip
                                close
                                @click:close="
                                  editedItem.contextMenuAction.splice(i, 1)
                                "
                                :color="
                                  '#' +
                                  ((Math.random() * 0xffffff) << 0).toString(16)
                                "
                                text-color="white"
                              >
                                {{ selection }}
                              </v-chip>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card>
                      <!-- print -->
                      <v-card
                        class="mx-auto"
                        max-width="500"
                        style="margin-top: 20px"
                      >
                        <v-card-title> Printed </v-card-title>
                        <v-container class="py-0">
                          <v-row align="center" justify="start">
                            <v-col
                              v-for="(selection, i) in editedItem.printAction"
                              :key="i"
                              class="shrink"
                            >
                              <v-chip
                                close
                                @click:close="
                                  editedItem.printAction.splice(i, 1)
                                "
                                :color="
                                  '#' +
                                  ((Math.random() * 0xffffff) << 0).toString(16)
                                "
                                text-color="white"
                              >
                                {{ selection }}
                              </v-chip>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card>
                    </v-container>
                  </v-col>
                </v-card>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="save">save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>

        <div id="app">
          <ejs-grid
            ref="grid"
            :dataSource="dataMenu"
            :dataBound="dataBound"
            :height="mobile ? '43vh' : 'auto'"
            width="100%"
            gridLines="Both"
            :allowReordering="true"
            :allowGrouping="mobile"
            :groupSettings="groupSettings"
            :allowSorting="true"
            :allowMultiSorting="true"
            :allowFiltering="false"
            :filterSettings="filterOptions"
            :commandClick="commandClick"
            :allowResizing="true"
            :allowPaging="true"
            :pageSettings="pageSettings"
            :toolbar="toolbarOptions"
          ></ejs-grid>
        </div>
      </v-card>
    </div>

    <v-fab-transition>
      <v-btn
        color="grey darken-4"
        v-scroll="onScroll"
        v-show="ScrollKeAtas && mobile == false"
        fab
        dark
        fixed
        bottom
        right
        @click="toTop"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import Vue from "vue";
import "vue-loading-overlay/dist/vue-loading.css";
import api from "../services/http";
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
  Group,
} from "@syncfusion/ej2-vue-grids";
import { DropDownTreePlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(DropDownTreePlugin);
Vue.use(GridPlugin);
var data = [
  // {
  //     nodeId: '01', nodeText: 'Music',
  //     nodeChild: [
  //         { nodeId: '01-01', nodeText: 'Gouttes.mp3' }
  //     ]
  // },
  // {
  //     nodeId: '02', nodeText: 'Videos', expanded: true,
  //     nodeChild: [
  //         { nodeId: '02-01', nodeText: 'Naturals.mp4' },
  //         { nodeId: '02-02', nodeText: 'Wild.mpeg' },
  //     ]
  // },
  // {
  //     nodeId: '03', nodeText: 'Documents',
  //     nodeChild: [
  //         { nodeId: '03-01', nodeText: 'Environment Pollution.docx' },
  //         { nodeId: '03-02', nodeText: 'Global Water, Sanitation, & Hygiene.docx' },
  //         { nodeId: '03-03', nodeText: 'Global Warming.ppt' },
  //         { nodeId: '03-04', nodeText: 'Social Network.pdf' },
  //         { nodeId: '03-05', nodeText: 'Youth Empowerment.pdf' },
  //     ]
  // }
];
export default {
  data() {
    return {
      ScrollKeAtas: false,
      mobile: null,
      windowSize: { x: 0, y: 0 },
      dataMenu: [],
      dataParent: [],
      namaParent: "",
      dialog: false,
      btn_tambah: true,
      editedItem: {
        parent: "",
        nama: "",
        link: "",
        NamaComponent: "",
        icon: "",
        idn: "",
        eng: "",
        crudAction: false,
        contextMenu: "",
        contextMenuAction: [],
        print: "",
        printAction: [],
      },
      action: null,
      defaultItem: {
        parent: "",
        nama: "",
        link: "",
        NamaComponent: "",
        icon: "",
        idn: "",
        eng: "",
        crudAction: false,
        contextMenu: "",
        contextMenuAction: [],
        print: "",
        printAction: [],
      },
      toolbarOptions: ["Search"],
      commands: [
        // { title:"Edit", buttonOption: { cssClass: 'e-flat Edit', iconCss: 'e-edit e-icons' } },
      ],
      editedIndex: -1,
      fields: {
        dataSource: data,
        value: "id",
        text: "nama",
        child: "children",
      },
      updateWidth: false,
      groupSettings: { allowRecording: true },
      filterOptions: { type: "CheckBox" },
      token: localStorage.getItem("token"),
      pageSettings: { pageSize: 10, pageSizes: ["5", "10", "20", "50"] },
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
      Group,
      Edit,
      CommandColumn,
      Reorder,
    ],
  },
  computed: {
    formTitleMenu() {
      return this.editedIndex === -1 ? "Tambah Menu" : "Ubah Menu";
    },
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

    async dialog(val) {
      if (val == false) {
        // console.log(this.$refs.dropdown)
        this.$nextTick(() => {
          let newData = this.delNested(this.fields.dataSource);
          this.editedItem = Object.assign({}, this.defaultItem);
          this.fields = {
            dataSource: newData,
            value: "id",
            text: "nama",
            child: "children",
          };
          this.editedIndex = -1;
          // this.fields.dataSource = JSON.parse(localStorage.getItem('parentmenu'))
          // this.$refs.dropdown.ej2Instances.clear()
          // console.log(this.fields)
          this.$refs.dropdown.ej2Instances.refresh();
        });
      }
    },
  },
  mounted() {
    // this.getParent()
    if (this.action.some((a) => a == "R")) {
      this.getMenu();
    }
    if (this.action.some((a) => a == "C")) {
      this.btn_tambah = false;
    }
    if (this.action.some((a) => a == "U")) {
      this.commands.push({
        title: "Edit",
        buttonOption: { cssClass: "e-flat Edit", iconCss: "e-edit e-icons" },
      });
    }
    if (this.action.some((a) => a == "D")) {
      this.commands.push({
        title: "Hapus",
        buttonOption: {
          cssClass: "e-flat Delete",
          iconCss: "e-delete e-icons",
        },
      });
    }
  },
  created() {
    // get actions for this page
    this.action = Object.assign(
      [],
      this.$route.params.action
        .replaceAll('"', "")
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll(",", "")
    );
  },
  beforeCreate() {
    // this.getParent()
    api.get("parent?token=" + localStorage.getItem("token")).then(
      (res) => {
        // this.fields = {
        //     dataSource : res.data.data,
        //     value : 'id',
        //     text : 'nama',
        //     child : 'children'
        // }
        this.fields.dataSource = res.data.data;
        this.dataParent = res.data.data;
        localStorage.setItem("parentmenu", JSON.stringify(res.data.data));
        // data = res.data.data
        // console.log(res)
        // console.log(document.getElementById('dropdowntree'))
        // console.log(this.$refs)
        // console.log(data)
        // this.$refs.dd.fields.dataSource = res.data
      },
      (err) => {
        console.log(err);
      }
    );
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.ScrollKeAtas = top > 20;
    },

    toTop() {
      this.$vuetify.goTo(0);
    },

    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },

    selectedChange(args) {
      console.log(args);
    },
    commandClick(args) {
      if (args.target.classList.contains("custombutton")) {
        // let data = JSON.stringify(args.rowData)
        // console.log(data)
      } else if (args.target.classList.contains("Edit")) {
        // this.editedItem = args.rowData
        this.editedItem.id = args.rowData.id;
        this.editedItem.parent = args.rowData.parent;
        this.editedItem.nama = args.rowData.nama;
        this.editedItem.link = args.rowData.link;
        this.editedItem.NamaComponent = args.rowData.NamaComponent;
        this.editedItem.icon = args.rowData.icon;
        this.editedItem.idn = args.rowData.idn;
        this.editedItem.eng = args.rowData.eng;
        this.editedItem.crudAction = args.rowData.crudAction;
        this.editedItem.contextMenu = args.rowData.contextMenu;
        this.editedItem.contextMenuAction = args.rowData.contextMenuAction;
        this.editedItem.print = args.rowData.print;
        this.editedItem.printAction = args.rowData.printAction;
        this.editedItem.contextMenuAction =
          this.editedItem.contextMenuAction == null
            ? []
            : this.editedItem.contextMenuAction.split(",");
        this.editedItem.printAction =
          this.editedItem.printAction == null
            ? []
            : this.editedItem.printAction.split(",");
        // console.log(this.editedItem)
        // console.log(args.rowData.printAction)
        this.editedIndex = 1;
        // this.$refs.dropdown.ej2Instances.refresh()
        // this.$nextTick(() => {
        //     this.$refs.dropdown.ej2Instances.clear()
        //     this.$refs.dropdown.ej2Instances.refresh()
        // })
        this.$nextTick(() => {
          this.dialog = true;
          //     // console.log('edit',newData)
          // console.log(this.$refs)
          //     this.$refs.dropdown.ej2Instances.dataValue = 'cus'
          //     this.$refs.dropdown.ej2Instances.currentValue = 'cus'
          //     this.$refs.dropdown.ej2Instances.currentText = 'cus'
          //     this.$refs.dropdown.ej2Instances.selectedData = 'cus'
          //     this.$refs.dropdown.ej2Instances.selectedText = 'cus'
          const dtLama = this.fields.dataSource;
          let newData = this.findNested(dtLama, "id", args.rowData.parent);
          // console.log('baru',newData)
          // console.log('lama',dtLama)
          if (this.$refs.dropdown != undefined) {
            // console.log(this.$refs.dropdown.getData())
            // console.log('dibawah',this.$refs)
            this.$refs.dropdown.ej2Instances.refresh();
            this.fields = {
              dataSource: newData,
              value: "id",
              text: "nama",
              child: "children",
            };
            // this.$refs.dropdown.ej2Instances.dataValue = 'Purchase Order'
            // this.$refs.dropdown.ej2Instances.currentValue = ['15']
            // this.$refs.dropdown.ej2Instances.currentText = 'Purchase Order'
            // this.$refs.dropdown.ej2Instances.selectedText.push('Purchase Order')
            // this.$refs.dropdown.ej2Instances.selectedData.push({
            //     expanded:true,
            //     hasChildren:true,
            //     isChecked: null,
            //     parentID: 14,
            //     id: 15,
            //     selected:true,
            //     text: "Purchase Order"
            // })
            this.$refs.dropdown.$el.value = this.namaParent;
            this.$refs.dropdown.$el.labels[0].classList = [
              "e-float-text",
              "e-label-top",
            ];
            this.$refs.dropdown.$el.labels[0].className =
              "e-float-text e-label-top";
          }
          // setTimeout(() => {
          //     // console.log(this.$refs.dropdown)
          //     // this.$refs.dropdown.ej2Instances.refresh()
          //     console.log('neww',this.fields)
          // }, 2000);
        });
        // console.log(args)
      }
    },
    findNested(obj, key, value) {
      // Base case
      // if (obj[key] === value) {
      //     return obj[key];
      // } else {
      //     for (var i = 0, len = Object.keys(obj).length; i < len; i++) {
      //     if (typeof obj[i] == 'object') {
      //         var found = this.findNested(obj[i], key, value);
      //         if (found) {
      //         // If the object was found in the recursive call, bubble it up.
      //         return found;
      //         }
      //     }
      //     }
      // }
      for (let index = 0; index < obj.length; index++) {
        const element = obj[index];
        if (element[key] == value) {
          element.selected = true;
          element.expanded = true;
          this.namaParent = element.nama;
          if (element.parent != "0") {
            this.expanNested(this.fields.dataSource, key, element.parent);
          }
        } else {
          // element.selected = false
          // element.expanded = false
          if (element.children.length > 0) {
            this.findNested(element.children, key, value);
          }
        }
      }
      return obj;
    },
    expanNested(obj, key, value) {
      for (let index = 0; index < obj.length; index++) {
        const element = obj[index];
        if (element[key] == value) {
          element.expanded = true;
        } else {
          if (element.children.length > 0) {
            this.expanNested(element.children, key, value);
          }
        }
      }
      return obj;
    },
    delNested(obj) {
      for (let index = 0; index < obj.length; index++) {
        const element = obj[index];
        delete element.selected;
        delete element.expanded;
        if (element.children.length > 0) {
          this.delNested(element.children);
        }
      }
      return obj;
    },
    save() {
      if (this.editedIndex == -1) {
        this.editedItem.contextMenuAction =
          this.editedItem.contextMenuAction.toString();
        this.editedItem.printAction = this.editedItem.printAction.toString();
        api
          .post("Menus?token=" + this.token, this.editedItem)
          .then(() => {
            this.editedItem = this.defaultItem;
            this.getMenu();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.editedItem.contextMenuAction =
          this.editedItem.contextMenuAction.toString();
        this.editedItem.printAction = this.editedItem.printAction.toString();
        api
          .put(
            "Menu/" + this.editedItem.id + "?token=" + this.token,
            this.editedItem
          )
          .then(() => {
            this.editedItem = this.defaultItem;
            this.editedIndex = -1;
            this.getMenu();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    submit(c) {
      this.editedItem.contextMenuAction.push(c);
      this.editedItem.contextMenu = "";
    },
    submitPrint(c) {
      this.editedItem.printAction.push(c);
      this.editedItem.print = "";
    },
    selectedMenu(args) {
      console.log(args);
      this.editedItem.parent = args.itemData.id;
    },
    getParent() {
      api.get("parent?token=" + this.token).then(
        (res) => {
          this.data = res.data;
          console.log(res);
          console.log(document.getElementById("dropdowntree"));
          console.log(this.$refs);
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getMenu() {
      api.get("Menus?token=" + this.token).then(
        (res) => {
          this.dataMenu = res.data;
          this.updateWidth = true;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    dataBound: function () {
      if (this.updateWidth == true) {
        for (var i = 0; i < this.$refs.grid.ej2Instances.columns.length; i++) {
          this.$refs.grid.ej2Instances.columns[i].width = 180;
        }
        this.updateWidth = false;
        // console.log(this.$refs.grid.ej2Instances)
        this.$refs.grid.ej2Instances.columns.unshift({
          field: "Commands",
          headerText: "Aksi",
          width: 120,
          textAlign: "Center",
          commands: this.commands,
        });
        this.$refs.grid.ej2Instances.refreshColumns();
      }
    },
  },
};
</script>

<style scoped>
.e-float-input,
.e-float-input.e-control-wrapper {
  margin: 0%;
}
</style>
