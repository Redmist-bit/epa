<template>
  <v-col cols="12" md="12">
    <loading :active.sync="isLoading" :is-full-page="true"></loading>
    <v-card class="elevation-3">
      <v-toolbar flat dark dense color="blue darken-4" class="elevation-1">
        <v-toolbar-title dark> UserMenu </v-toolbar-title>

        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-row dense>
        <v-col cols="12" sm="6" md="4">
          <v-autocomplete
            dense
            prefix="Jabatan"
            class="mx-2"
            :items="items"
            item-value="id"
            item-text="jabatan"
            v-model="selectedJabatan"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="2" md="1" class="my-2 mx-4">
          <v-btn @click="getMenu(selectedJabatan)" color="blue darken-4" dark
            >Show Menu</v-btn
          >
        </v-col>
        <v-col cols="12" sm="2" md="1" class="my-2 mx-4">
          <v-btn @click="sync()" color="blue darken-4" dark>Simpan</v-btn>
        </v-col>
      </v-row>
      <div id="app">
        <ejs-treeview
          ref="tree1"
          id="treeview"
          :fields="fields"
          :showCheckBox="true"
          :checkedNodes="checkedNodes"
          :nodeChecked="nodeChecked"
          :autoCheck="false"
        ></ejs-treeview>
      </div>
    </v-card>
  </v-col>
</template>
<script>
import Vue from "vue";
import api from "@/services/http";
import { TreeViewPlugin } from "@syncfusion/ej2-vue-navigations";
import Loading from "vue-loading-overlay";

Vue.use(TreeViewPlugin);
export default {
  components: {
    Loading,
  },
  data() {
    return {
      selectedJabatan: {},
      checkedNodes: [],
      data: [],
      jabatan_menu: [],
      isLoading: false,
      fields: {
        dataSource: null,
        id: null,
        parentID: null,
        text: null,
        hasChildren: null,
      },
      items: [],
      dataStateChange: false,
      token: localStorage.getItem("token"),
    };
  },
  mounted() {
    console.log(localStorage.getItem("a"));
    this.getData();
    this.getJabatan();
  },
  created() {
    console.log("dapat permission", this.$route.params.permission);
  },
  methods: {
    nodeChecked: function () {
      var treeObj =
        document.getElementById("treeview").ej2_instances[0]["checkedNodes"];
      this.jabatan_menu = treeObj;
    },

    sync() {
      this.isLoading = true;
      let kosong = [];
      kosong = this.jabatan_menu;
      console.log("jabatan", kosong);
      for (let x = kosong.length - 1; x >= 0; x--) {
        const element = kosong[x];

        if (typeof element != "object") {
          if (element.includes("READ")) {
            let parent = element.replace("READ", "");
            let index = kosong.findIndex((i) => i == parent);
            let IndexObj = kosong.findIndex(
              (a) =>
                typeof a == "object" &&
                Object.prototype.hasOwnProperty.call(a, parent)
            );
            if (index != -1) {
              kosong[index] = {
                [parent]: ["R"],
              };
            } else {
              kosong[IndexObj][parent].push("R");
            }
          } else if (element.includes("CREATE")) {
            let parent = element.replace("CREATE", "");
            let index = kosong.findIndex((i) => i == parent);
            let IndexObj = kosong.findIndex(
              (a) =>
                typeof a == "object" &&
                Object.prototype.hasOwnProperty.call(a, parent)
            );
            if (index != -1) {
              kosong[index] = {
                [parent]: ["C"],
              };
            } else {
              kosong[IndexObj][parent].push("C");
            }
          } else if (element.includes("UPDATE")) {
            let parent = element.replace("UPDATE", "");
            let index = kosong.findIndex((i) => i == parent);
            let IndexObj = kosong.findIndex(
              (a) =>
                typeof a == "object" &&
                Object.prototype.hasOwnProperty.call(a, parent)
            );
            if (index != -1) {
              kosong[index] = {
                [parent]: ["U"],
              };
            } else {
              kosong[IndexObj][parent].push("U");
            }
          } else if (element.includes("DELETE")) {
            let parent = element.replace("DELETE", "");
            let index = kosong.findIndex((i) => i == parent);
            let IndexObj = kosong.findIndex(
              (a) =>
                typeof a == "object" &&
                Object.prototype.hasOwnProperty.call(a, parent)
            );
            if (index != -1) {
              kosong[index] = {
                [parent]: ["D"],
              };
            } else {
              kosong[IndexObj][parent].push("D");
            }
          } else {
            console.log(element);
            console.log(element.replace(/\D+/g, ""));
            let parent = element.includes("cetak")
              ? element.split("/").shift()
              : element.replace(/\D+/g, "");
            console.log(element.replace(parent, ""));
            let index = kosong.findIndex((i) => i == parent);
            if (element.replace(parent, "") != "") {
              let IndexObj = kosong.findIndex(
                (a) =>
                  typeof a == "object" &&
                  Object.prototype.hasOwnProperty.call(a, parent)
              );
              if (index != -1) {
                kosong[index] = {
                  [parent]: [element.replace(parent, "")],
                };
              } else {
                kosong[IndexObj][parent].push(element.replace(parent, ""));
              }
              kosong.splice(
                kosong.findIndex((k) => k == element),
                1
              );
            }
          }
        }
      }
      var a;
      for (a = kosong.length - 1; a >= 0; a--) {
        const element = kosong[a];

        if (typeof element != "object") {
          if (
            element.includes("READ") ||
            element.includes("CREATE") ||
            element.includes("UPDATE") ||
            element.includes("DELETE")
          ) {
            kosong.splice(a, 1);
          }
        }
      }

      api
        .put("Menus/" + this.selectedJabatan + "?token=" + this.token, {
          Menu: this.jabatan_menu,
        })
        .then((res) => {
          console.log(res);
          this.jabatan_menu = [];
          this.$refs.tree1.uncheckAll();
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getJabatan() {
      api.get("jabatan?token=" + this.token).then(
        (res) => {
          this.items = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },

    getMenu() {
      this.isLoading = true;
      this.checkedNodes.splice(0);
      this.$refs.tree1.uncheckAll();

      api.get("/Menus/" + this.selectedJabatan + "?token=" + this.token).then(
        (res) => {
          res.data.data.menus.forEach((element) => {
            if (
              element.pivot.permission != "" &&
              element.pivot.permission != null
            ) {
              let aksi = Object.assign(
                [],
                element.pivot.permission
                  .replaceAll('"', "")
                  .replaceAll("[", "")
                  .replaceAll("]", "")
                  .replaceAll(",", "")
              );
              // console.log(aksi)
              if (
                element.pivot.context_menu != "" &&
                element.pivot.context_menu != null
              ) {
                let contexMenu = element.pivot.context_menu.split(",");
                contexMenu.forEach((c) => {
                  this.checkedNodes.push(element.id + c);
                });
              }
              if (
                element.pivot.print_out != "" &&
                element.pivot.print_out != null
              ) {
                let printDesign = element.pivot.print_out.split(",");
                printDesign.forEach((c) => {
                  this.checkedNodes.push(element.id + c);
                });
              }
              aksi.forEach((dt) => {
                if (dt == "R") {
                  this.checkedNodes.push(element.pivot.menu_id + "READ");
                }
                if (dt == "C") {
                  this.checkedNodes.push(element.pivot.menu_id + "CREATE");
                }
                if (dt == "U") {
                  this.checkedNodes.push(element.pivot.menu_id + "UPDATE");
                }
                if (dt == "D") {
                  this.checkedNodes.push(element.pivot.menu_id + "DELETE");
                }
              });
              this.checkedNodes.push(element.pivot.menu_id.toString());
            } else {
              this.checkedNodes.push(element.pivot.menu_id.toString());
            }
          });
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
        }
      );
    },

    getData() {
      this.isLoading = true;
      api.get("/Menus?token=" + this.token).then(
        (res) => {
          this.data = res.data;
          res.data.forEach((d) => {
            if (d.parent == 0) {
              delete d["parent"];
              d["punyaAnak"] = true;
            } else {
              d["punyaAnak"] = true;
              if (d.crudAction == true) {
                this.data.push(
                  {
                    id: d.id + "READ",
                    nama: "Hanya Lihat",
                    parent: d.id,
                  },
                  {
                    id: d.id + "CREATE",
                    nama: "Tambah Data",
                    parent: d.id,
                  },
                  {
                    id: d.id + "UPDATE",
                    nama: "Ubah Data",
                    parent: d.id,
                  },
                  {
                    id: d.id + "DELETE",
                    nama: "Hapus Data",
                    parent: d.id,
                  }
                );
              }
              if (d.contextMenuAction != null) {
                var contextMenu = d.contextMenuAction.split(",");
                contextMenu.forEach((element) => {
                  this.data.push({
                    id: d.id + element,
                    nama: element,
                    parent: d.id,
                  });
                });
              }
              if (d.printAction != null) {
                var printDesign = d.printAction.split(",");
                printDesign.forEach((element) => {
                  this.data.push({
                    id: d.id + element,
                    nama: element,
                    parent: d.id,
                  });
                });
              }
            }
          });
          this.fields = {
            dataSource: this.data,
            parentID: "parent",
            id: "id",
            text: "nama",
            hasChildren: "punyaAnak",
          };
          console.log(this.fields);
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>
