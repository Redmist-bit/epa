<template>
  <div class="fill-height" v-resize="onResize">
    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>

    <v-snackbar
      v-model="alert"
      rounded="lg"
      top
      color="error"
      :value="true"
      :timeout="-1"
    >
      <span><v-icon left>mdi-alert-circle</v-icon>{{ pesan }}</span>
    </v-snackbar>

    <v-container class="fill-height" fluid>
      <v-row no-gutters justify="center">
        <v-card class="rounded-xl" height="auto" max-width="380">
          <!-- <div class="text-center mt-n10">
            <v-sheet class="mx-auto rounded-circle elevation-3" width="80" height="80">
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-img max-width="45" class="mt-1" :src="require('../assets/LogoTrinity.png')"/>
              </v-row>
            </v-sheet>
          </div> -->

          <div class="pa-8">
            <v-row no-gutters justify="center">
              <span class="text-h6">Register</span>
            </v-row>

            <v-row justify="center" dense>
              <v-col cols="12">
                <v-select
                  dense
                  clearable
                  v-model="editedItem.Perusahaan"
                  :items="['EPA', 'WPA', 'MPA']"
                  label="Perusahaan*"
                  hint="Wajib pilih*"
                  required
                >
                </v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  color="blue darken-4"
                  prepend-icon="mdi-account"
                  v-model="editedItem.Nama"
                  label="Nama"
                  :rules="nameRules"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  color="blue darken-4"
                  prepend-icon="mdi-email"
                  v-model="editedItem.Email"
                  label="Email"
                  :rules="emailRules"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  color="blue darken-4"
                  prepend-icon="mdi-lock"
                  v-model="editedItem.password"
                  :append-icon="TampilkanPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="TampilkanPassword ? 'text' : 'password'"
                  name="input-10-1"
                  label="Kata Sandi"
                  hint="Min 4 Karakter"
                  persistent-hint
                  counter
                  @click:append="TampilkanPassword = !TampilkanPassword"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  color="blue darken-4"
                  prepend-icon="mdi-lock"
                  v-model="editedItem.password2"
                  :append-icon="TampilkanPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="TampilkanPassword2 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Konfirmasi Sandi"
                  hint="Min 4 Karakter"
                  persistent-hint
                  counter
                  @click:append="TampilkanPassword2 = !TampilkanPassword2"
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="mt-3">
                <v-btn
                  dark
                  block
                  depressed
                  height="40"
                  class="rounded-lg text-capitalize subtitle-1"
                  color="blue darken-4"
                  @click="save"
                  >Daftar</v-btn
                >
              </v-col>

              <!-- <v-col cols="12" class="mt-3">
                <v-row no-gutters justify="center">
                  <span>Sudah Punya Akun? Klik <router-link to="/Login" class="text-decoration-none"> Login</router-link></span>
                </v-row>
              </v-col> -->
            </v-row>
          </div>

          <!-- <v-divider></v-divider>

          <div class="pa-4">
            <v-row no-gutters justify="center">
              <span>Sudah Punya Akun? Klik <router-link to="/Login" class="text-decoration-none"> Login</router-link></span>
            </v-row>
          </div> -->
        </v-card>
      </v-row>
    </v-container>

    <!-- <v-layout class="my-5" row wrap align-center justify-center>
      <v-col cols="10" md="6" sm="6">
        <loading
          :active.sync="isLoading" 
          :is-full-page="fullPage"
        ></loading>

        <v-alert type="error" v-model="alert">
          {{pesan}}
        </v-alert>


        <v-card class="elevation-20">
          <v-toolbar
            dark
            outline
            color="blue darken-4"
            class="elevation-1"
          >
            <v-card-title>
              <span class="headline">Register</span>
            </v-card-title>
          </v-toolbar>

          <v-card-text>
            <v-card outlined>
              <v-col>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      dense
                      color="blue darken-4"
                      prepend-icon="mdi-account"
                      v-model="editedItem.Nama"
                      label="Nama"
                      :rules="nameRules"
                      >
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      dense
                      color="blue darken-4"
                      prepend-icon="mdi-email"
                      v-model="editedItem.Email"
                      label="Email"
                      :rules="emailRules"
                      >
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      dense
                      color="blue darken-4"
                      prepend-icon="mdi-lock"
                      v-model="editedItem.password"
                      :append-icon="TampilkanPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="TampilkanPassword ? 'text' : 'password'"
                      name="input-10-1"
                      label="Kata Sandi"
                      hint="Min 4 Karakter"
                      persistent-hint
                      counter
                      @click:append="TampilkanPassword = !TampilkanPassword"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      dense
                      color="blue darken-4"
                      prepend-icon="mdi-lock"
                      v-model="editedItem.password2"
                      :append-icon="TampilkanPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="TampilkanPassword2 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Konfirmasi Sandi"
                      hint="Min 4 Karakter"
                      persistent-hint
                      counter
                      @click:append="TampilkanPassword2 = !TampilkanPassword2"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-card>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            
            <v-btn
              dark
              block
              color="blue darken-4"
              @click="save">
              <v-icon class="mr-1">mdi-account-plus</v-icon>Daftar
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-layout class="my-2" row wrap align-center justify-center>
        <p class="subheading font-weight-regular my-4">
          Sudah Punya Akun? Klik
          <router-link to="/Login">Login</router-link>
        </p>
        </v-layout>

      </v-col>
    </v-layout> -->
  </div>
</template>

<script>
import api from "../services/http";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components: {
    Loading,
  },
  data() {
    return {
      mobile: null,
      windowSize: { x: 0, y: 0 },
      isLoading: false,
      fullPage: true,
      alert: false,
      pesan: "",
      // itemsJabatan: ['HRD', 'IT', 'Mekanik', 'Teknisi'],
      jabatanRules: [(value) => !!value || "Jabatan Dibutuhkan."],

      nameRules: [(value) => !!value || "Nama Wajib Diisi."],

      emailRules: [
        (v) => !!v || "E-mail Wajib Diisi",
        (v) => /.+@.+\..+/.test(v) || "E-mail Harus Benar",
      ],

      rules: {
        required: (value) => !!value || "Kata Sandi Wajib Diisi.",
        min: (v) => v.length >= 4 || "Setidaknya 4 Karakter",
        // emailMatch: () => (`The email and password you entered don't match`),
      },
      TampilkanPassword: false,
      TampilkanPassword2: false,
      editedIndex: -1,
      defaultItem: {
        Nama: "",
        Email: "",
        Jabatan: "USER",
        Perusahaan: "",
        KodePT: "",
        password: "",
        password2: "",
      },

      editedItem: {
        Nama: "",
        Email: "",
        Jabatan: "USER",
        Perusahaan: "",
        KodePT: "",
        password: "",
        password2: "",
      },

      token: localStorage.getItem("token"),
    };
  },

  mounted() {
    // this.ceklogin()
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Register Baru" : "Ubah Data";
    },
  },

  watch: {
    windowSize() {
      if (this.windowSize.x < 450) {
        (this.toolbarOptions = ["Search"]), (this.titleClass = "d-none");
        this.mobile = false;
      } else {
        (this.toolbarOptions = ["Search", "ExcelExport"]),
          (this.titleClass = "mr-4");
        this.mobile = true;
      }
    },
  },

  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },

    ceklogin() {
      let cek = JSON.parse(localStorage.getItem("user"));
      if (cek != null) {
        this.$router.push("/");
      } else {
        //do nothing
      }
    },
    save() {
      if (this.editedItem.password != this.editedItem.password2) {
        this.alert = true;
        this.pesan = "Password Tidak Match";
      } else {
        this.isLoading = true;
        if (this.editedItem.Perusahaan == "EPA") {
          this.editedItem.KodePT = "01";
        } else if (this.editedItem.Perusahaan == "WPA") {
          this.editedItem.KodePT = "02";
        } else {
          this.editedItem.KodePT = "03";
        }
        api
          .post("/register", {
            Kode:
              this.editedItem.KodePT +
              "01" +
              "/" +
              this.editedItem.Nama.toUpperCase(),
            Nama: this.editedItem.Nama,
            Email: this.editedItem.Email,
            Jabatan: this.editedItem.Jabatan,
            password: this.editedItem.password,
            Aktif: 1,
            DiBuatOleh:
              this.editedItem.KodePT +
              "01" +
              "/" +
              this.editedItem.Nama.toUpperCase(),
            DiUbahOleh:
              this.editedItem.KodePT +
              "01" +
              "/" +
              this.editedItem.Nama.toUpperCase(),
          })
          .then((res) => {
            if (res.data.status == true) {
              // localStorage.setItem('token', res.data.token)
              // localStorage.setItem('user',JSON.stringify(res.data.user))
              // location.reload(false)
              this.$emit("register", res.data.status);
            } else {
              alert("email sudah digunakan");
            }
            this.isLoading = false;
            this.editedItem = Object.assign({}, this.defaultItem);
          })
          .catch((err) => {
            console.log(err);
            alert("Pastikan data sudah terisi dengan benar");
            // this.$emit('register',res.data.status)
            // console.log(err.response.data)
            let pesanErr = {
              Nama: err.response.data.Nama,
              password: err.response.data.password,
            };
            alert(JSON.stringify(pesanErr));
            this.isLoading = false;
          });
      }
    },
  },
};
</script>
