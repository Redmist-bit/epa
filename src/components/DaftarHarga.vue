<template>
  <div v-resize="onResize">
    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>

    <div :class="mobile ? 'pa-2' : ''">
      <v-toolbar flat dark dense color="blue darken-4" v-show="mobile == true">
        <v-tabs>
          <v-tab>Daftar Harga Jual</v-tab>
          <v-tab>Daftar Harga Beli</v-tab>
          <v-tab-item :eager="true">
            <keep-alive>
              <HargaJual ref="hrgjual" />
            </keep-alive>
          </v-tab-item>
          <v-tab-item :eager="true">
            <keep-alive>
              <HargaBeli ref="hrgbeli" />
            </keep-alive>
          </v-tab-item>
        </v-tabs>
      </v-toolbar>

      <v-toolbar flat v-show="mobile == false">
        <div>
          <v-menu offset-y v-model="MenuDaftarHarga" rounded="lg">
            <template v-slot:activator="{ on, attrs }">
              <v-toolbar-title class="text-h5">
                <strong v-bind="attrs" v-on="on" v-show="DaftarHargaJual"
                  >Daftar Harga Jual</strong
                >
                <strong v-bind="attrs" v-on="on" v-show="DaftarHargaBeli"
                  >Daftar Harga Beli</strong
                >
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  color="black"
                  class="mr-1 ml-1 mb-1"
                  >{{
                    MenuDaftarHarga ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon
                >
              </v-toolbar-title>
            </template>

            <v-list class="rounded-lg">
              <v-list-item-group mandatory color="blue darken-4">
                <v-list-item @click="TampilkanDaftarHargaJual">
                  <v-list-item-content>
                    <v-list-item-title>Daftar Harga Jual</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="TampilkanDaftarHargaBeli">
                  <v-list-item-content>
                    <v-list-item-title>Daftar Harga Beli</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </div>
        <v-spacer></v-spacer>
      </v-toolbar>

      <div
        v-show="DaftarHargaJual && mobile == false"
        :style="mobile ? '' : 'margin-bottom: 90px;'"
      >
        <HargaJual ref="hrgjual" />
      </div>

      <div
        v-show="DaftarHargaBeli && mobile == false"
        :style="mobile ? '' : 'margin-bottom: 90px;'"
      >
        <HargaJual ref="hrgbeli" />
      </div>
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
import api from "@/services/http";
import HargaBeli from "@/views/DaftarHarga/HargaBeli.vue";
import HargaJual from "@/views/DaftarHarga/HargaJual.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    HargaBeli,
    HargaJual,
    Loading,
  },
  data() {
    return {
      MenuDaftarHarga: false,
      DaftarHargaJual: true,
      DaftarHargaBeli: false,
      ScrollKeAtas: false,
      mobile: null,
      windowSize: { x: 0, y: 0 },
      posisi: true,
      fullPage: true,
      isLoading: false,
      token: localStorage.getItem("token"),
      data: [],
    };
  },
  mounted() {
    // this.getData()
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

    dialogSupplier(val) {
      val || this.closeSupplier();
    },
  },

  computed: {
    formTitleSupplier() {
      return this.editedIndex === -1 ? "Tambah Supplier" : "Edit Supplier";
    },
  },

  methods: {
    TampilkanDaftarHargaJual() {
      this.DaftarHargaJual = true;
      this.DaftarHargaBeli = false;
    },

    TampilkanDaftarHargaBeli() {
      this.DaftarHargaJual = false;
      this.DaftarHargaBeli = true;
    },

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

    getData() {
      this.isLoading = true;
      api.get("/barangs?token=" + this.token).then(
        (res) => {
          console.log(res);
          this.isLoading = false;
          let x = [];
          for (let index = 0; index < res.data.lenght; index++) {
            const element = res.data[index];
            element.Rasio = element.hrgjual[0].Rasio;
            element.MataUang = element.hrgjual[0].MataUang;
            x.push(element);
          }

          this.data = res.data;
          sessionStorage.setItem("temp", JSON.stringify(res.data));
          console.log(res);
          this.$refs.hrgjual.setHargaJual();
          this.$refs.hrgbeli.setHargaBeli();
        },
        (err) => {
          console.log(err);
          this.$router.push("/");
          localStorage.removeItem("token");
        }
      );
    },
  },
};
</script>

<style>
.centered-input input {
  text-align: right;
}

.e-grid .e-groupdroparea.e-grouped {
  background-color: rgb(25, 118, 210);
}

.e-grid .e-groupheadercell {
  background-color: rgb(29, 79, 129);
}
</style>
