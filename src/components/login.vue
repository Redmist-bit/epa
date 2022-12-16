<template>
  <div class="fill-height" v-resize="onResize">
    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>

    <!-- Alert Error Email Atau Password Salah -->
    <v-snackbar
      v-model="alert"
      rounded="lg"
      top
      absolute
      color="error"
      :value="true"
      :timeout="-1"
    >
      <span><v-icon left>mdi-alert-circle</v-icon>{{ pesan }}</span>
    </v-snackbar>

    <!-- <div class="mx-auto mb-n8 col-12">
      <v-alert
        type="error"
        v-model="alert"
      >
        {{pesan}}
      </v-alert>
    </div> -->

    <v-container class="fill-height" fluid>
      <v-row no-gutters justify="center">
        <v-card class="rounded-xl mt-10" height="auto" max-width="380">
          <div class="text-center mt-n10">
            <v-sheet
              class="mx-auto rounded-circle elevation-3"
              width="80"
              height="80"
            >
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-img
                  max-width="45"
                  class="mt-1"
                  :src="require('../assets/LogoTrinity.png')"
                />
              </v-row>
            </v-sheet>
          </div>

          <div class="pa-8 mt-n3">
            <v-row no-gutters justify="center">
              <!-- <span class="text-h6">{{$t('Login.MainTitle')}}</span> -->
              <span class="text-h6">Selamat datang di Max System</span>
              <span>ENERGI PERKASA ABADI</span>
            </v-row>

            <v-row no-gutters justify="center">
              <!-- <span>{{$t('Login.MainTitle2')}}</span> -->
              <span>Silahkan masuk terlebih dahulu</span>
            </v-row>

            <v-row no-gutters justify="center" class="mt-6 mb-3">
              <!-- <span class="text-h6">{{$t('Login.LoginTitle')}}</span> -->
              <span class="text-h6">Login</span>
            </v-row>

            <v-row justify="center" dense>
              <v-col cols="12">
                <v-text-field
                  prepend-icon="mdi-account-circle"
                  label="Nama Pengguna"
                  class="form-control"
                  v-model="credentials.Nama"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  prepend-icon="mdi-lock"
                  label="Kata Sandi"
                  class="form-control"
                  v-model="credentials.password"
                  :append-icon="TampilkanSandi ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="TampilkanSandi ? 'text' : 'password'"
                  @click:append="TampilkanSandi = !TampilkanSandi"
                  @keyup.enter="login()"
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="mt-3">
                <v-btn
                  block
                  dark
                  height="40"
                  depressed
                  color="blue darken-4"
                  class="btn btn-primary text-capitalize subtitle-1 rounded-lg"
                  @click="login"
                  >Login</v-btn
                >
                <!-- <v-btn block dark height="40" depressed color="blue darken-4" class="btn btn-primary text-capitalize subtitle-1 rounded-lg" @click="login">{{$t('Login.LoginTitle')}}</v-btn>  -->
              </v-col>

              <v-col cols="12" class="mt-3">
                <v-row no-gutters justify="center">
                  <span>Belum Punya Akun ? Hubungin Dept IT</span>
                </v-row>
              </v-col>
            </v-row>
          </div>

          <!-- <v-divider></v-divider>

          <div class="pa-4">
            <v-row no-gutters justify="center">
              <span>Belum Punya Akun Klik <router-link to="/Register" class="text-decoration-none"> Register</router-link></span>
            </v-row>
          </div> -->
        </v-card>
      </v-row>

      <!-- <v-row>
        <v-col cols="12">
          <v-row justify="center">
            <v-col cols="12">
              <v-row justify="center">
                
                <v-row class="text-center ma-2 mt-n3">
                  <v-col cols="12">
                    <v-img :src="require('../assets/LogoTrinity.png')" class="mb-n3" contain height="160" />
                  </v-col>

                  <div class="mx-auto">
                    <h1 class="font-weight-bold mb-1">{{$t('Login.MainTitle')}}</h1>
                    <p class="subheading font-weight-regular">{{$t('Login.MainTitle2')}}</p>

                    <v-card width="500" class="rounded-lg elevation-20">
                      <v-toolbar
                        flat
                        dense
                      >
                        <span class="title mx-auto">{{$t('Login.LoginTitle')}}</span>
                        
                      </v-toolbar>
                    
                      <v-col cols="12" class="mb-3">
                        <v-text-field 
                          prepend-icon="mdi-account-circle"
                          label="Username"
                          class="form-control"
                          v-model="credentials.Nama"
                        ></v-text-field>

                        <v-text-field
                          prepend-icon="mdi-lock"
                          label="Password"
                          class="form-control"
                          v-model="credentials.password"
                          :append-icon="TampilkanSandi ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="TampilkanSandi ? 'text' : 'password'"
                          @click:append="TampilkanSandi = !TampilkanSandi"
                          @keyup.enter="login()"
                        ></v-text-field>

                        <v-btn block dark depressed color="blue darken-4" class="btn btn-primary text-capitalize subtitle-1" @click="login">{{$t('Login.LoginTitle')}}</v-btn>       
                      </v-col>
                    </v-card>
                    <span>Belum Punya Akun Klik <router-link to="/Register" class="text-decoration-none"> Register</router-link></span>
                  </div>
                </v-row>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row> -->
    </v-container>
  </div>
</template>

<script>
import api from "../services/http";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  token: "",
  name: "login",
  components: {
    Loading,
  },
  data: () => ({
    mobile: null,
    windowSize: { x: 0, y: 0 },
    isLoading: false,
    fullPage: true,
    alert: false,
    pesan: "",
    items: [{ title: "Register", link: "/Register", icon: "mdi-account-plus" }],
    offset: true,

    sementara: [],
    TampilkanSandi: false,
    email1: "",
    credentials: {
      Nama: "",
      password: "",
    },
    return: {
      loading: true,
    },
  }),
  mounted() {
    this.ceklogin();
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
      }
    },
    login() {
      this.isLoading = true;
      api
        .post("/login", this.credentials)
        .then((res) => {
          if (res.data.status == false) {
            this.pesan = "Access Denied : Email Atau Password salah";
            this.alert = true;
            this.isLoading = false;
          } else if (res.data.user.Aktif != true) {
            this.pesan = "Akun Tidak Aktif Silahkan Hubungi Administrator";
            this.alert = true;
            this.isLoading = false;
          } else {
            if (res.data.user.Kode.substring(0, 2) != "01") {
              alert(
                "Silahkan login menggunakan user EPA, " +
                  this.credentials.Nama +
                  " bukan user EPA"
              );
            }
            localStorage.setItem("token", res.data.token);
            this.infoPerusahaan(res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            this.$router.push("/Dashboard");
            location.reload();
          }
        })
        .catch((err) => {
          alert("email atau password salah");
          console.log(err);
          confirm("email atau password salah");
          console.log("email atau password salah");
          this.loading = false;
          location.reload();
        });
    },
    infoPerusahaan(token) {
      api.get("/info?token=" + token).then(
        (res) => {
          // this.isLoading = false
          // Object.assign(this.data,res.data[0])
          localStorage.setItem("info", JSON.stringify(res.data[0]));
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>

<style></style>
