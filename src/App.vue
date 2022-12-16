<template>
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div> -->
  <v-app>
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
@import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
@import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../node_modules/@syncfusion/ej2-grids/styles/material.css";
@import "../node_modules/@syncfusion/ej2-pivotview/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-pivotview/styles/material.css";
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */

.e-attr {
  background: #fafafa;
}
.e-grid .e-altrow {
  background-color: #fafafa;
}
.e-grid .e-row.not-active .e-rowcell {
  background-color: grey;
  color: black;
  font-weight: bold;
}
.edit-batal .e-icons.e-edit {
  color: #26a69a;
}
.hapus-batal .e-icons.e-delete {
  color: #ef5350;
}
.e-grid .e-row.above-80 .e-rowcell {
  background-color: rgb(177, 140, 160);
  color: black;
  font-weight: bold;
}
.e-grid .e-rowcell.customcss {
  background-color: #d7f0f4 !important;
  font-weight: bold;
  color: #02142b !important;
}
.e-input-group .e-control-wrapper .e-input-focus {
  background-color: white !important;
}
.e-grid .e-row.white .e-rowcell {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  font-weight: bold;
}
.e-grid .e-row.black .e-rowcell {
  background-color: rgb(0, 0, 0);
  color: whitesmoke;
  font-weight: bold;
}
.e-grid .e-row.red .e-rowcell {
  background-color: rgb(155, 12, 12);
  color: whitesmoke;
  font-weight: bold;
}
.e-grid .e-row.green .e-rowcell {
  background-color: rgb(7, 137, 48);
  color: whitesmoke;
  font-weight: bold;
}
.e-grid .e-row.yellow .e-rowcell {
  background-color: rgb(141, 154, 3);
  color: whitesmoke;
  font-weight: bold;
}
.e-popup.e-popup-open.e-dialog {
  width: 500px !important;
}
</style>
