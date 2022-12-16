<template>
  <div class="fill-height" v-resize="onResize">
    <v-container class="fill-height" fluid>
      <v-row no-gutters justify="center">
        <v-card class="rounded-xl" height="auto" max-width="380">
          <div class="pa-8">
            <v-row no-gutters justify="center">
              <span class="text-h6">Change Password</span>
            </v-row>

            <v-row justify="center" dense>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.name"
                  prepend-icon="mdi-account"
                  label="Nama Pengguna"
                  class="form-control rounded-lg"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.password"
                  :prepend-icon="
                    editedItem.password ? 'mdi-lock' : 'mdi-lock-open-variant'
                  "
                  label="Kata Sandi Lama"
                  class="form-control"
                  :append-icon="TampilkanSandi ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="TampilkanSandi ? 'text' : 'password'"
                  @click:append="TampilkanSandi = !TampilkanSandi"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.new_password"
                  :prepend-icon="
                    editedItem.new_password
                      ? 'mdi-lock'
                      : 'mdi-lock-open-variant'
                  "
                  label="Kata Sandi Baru"
                  class="form-control"
                  :append-icon="TampilkanSandiBaru ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="TampilkanSandiBaru ? 'text' : 'password'"
                  @click:append="TampilkanSandiBaru = !TampilkanSandiBaru"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.konfirm_password"
                  :prepend-icon="
                    editedItem.konfirm_password
                      ? 'mdi-lock'
                      : 'mdi-lock-open-variant'
                  "
                  label="Konfirmasi Kata Sandi Baru"
                  class="form-control"
                  :append-icon="
                    KonfirmasiTampilkanSandiBaru ? 'mdi-eye' : 'mdi-eye-off'
                  "
                  :type="KonfirmasiTampilkanSandiBaru ? 'text' : 'password'"
                  @click:append="
                    KonfirmasiTampilkanSandiBaru = !KonfirmasiTampilkanSandiBaru
                  "
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="mt-3">
                <v-btn
                  @click="reset"
                  dark
                  block
                  depressed
                  height="40"
                  color="blue darken-4"
                  class="btn btn-primary rounded-lg text-capitalize subtitle-1"
                  >Change Password</v-btn
                >
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-row>
    </v-container>

    <!-- <v-container class="fill-height" fluid>
      <v-row>
        <v-col cols="12">
          <v-row justify="center">
            <v-alert v-model="AlertSuc" type="success">
              {{MessageAlert}}
            </v-alert>
            <v-alert v-model="AlertErr" type="error">
              {{MessageAlert}}
            </v-alert>
            <v-layout class="mt-6" justify-center>
              <v-card 
                outlined
                width="350"
                class="rounded-lg elevation-20"
              >
                <v-card-title dense class="headline">
                  Change Password
                </v-card-title>
                <div class="pa-3 mt-n3">
                  <v-col cols="12">
                    <div>
                      <v-subheader class="subtitle-1 mx-n4 font-weight-bold">User Name</v-subheader>
                      <v-text-field
                        dense
                        outlined
                        v-model="editedItem.name"
                        color="grey darken-1"
                        class="form-control rounded-lg mt-n2"
                      ></v-text-field>
                    </div>

                    <div  class="mt-n6">
                      <v-subheader class="subtitle-1 mx-n4 font-weight-bold">Kata Sandi Lama</v-subheader>
                      <v-text-field
                        dense
                        outlined
                        v-model="editedItem.password"
                        color="grey darken-1"
                        class="form-control rounded-lg mt-n2"
                        
                        :append-icon="TampilkanSandi ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="TampilkanSandi ? 'text' : 'password'"
                        @click:append="TampilkanSandi = !TampilkanSandi"
                      ></v-text-field>
                    </div>

                    <div  class="mt-n6">
                      <v-subheader class="subtitle-1 mx-n4 font-weight-bold">Kata Sandi Baru</v-subheader>
                      <v-text-field
                        dense
                        outlined
                        color="grey darken-1"
                        v-model="editedItem.new_password"
                        class="form-control rounded-lg mt-n2"
                        
                        :append-icon="TampilkanSandiBaru ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="TampilkanSandiBaru ? 'text' : 'password'"
                        @click:append="TampilkanSandiBaru = !TampilkanSandiBaru"
                      ></v-text-field>
                    </div>

                    <div class="mt-n6">
                      <v-subheader class="subtitle-1 mx-n4 font-weight-bold">Konfirmasi Kata Sandi Baru</v-subheader>
                      <v-text-field
                        dense
                        outlined
                        v-model="editedItem.konfirm_password"
                        color="grey darken-1"
                        class="form-control rounded-lg mt-n2"
                        
                        :append-icon="KonfirmasiTampilkanSandiBaru ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="KonfirmasiTampilkanSandiBaru ? 'text' : 'password'"
                        @click:append="KonfirmasiTampilkanSandiBaru = !KonfirmasiTampilkanSandiBaru"
                      ></v-text-field>
                    </div>

                    <v-btn 
                      block
                      dark
                      color="red darken-4"
                      @click="reset"
                      class="btn btn-primary rounded-lg text-capitalize">Change Password</v-btn>
                  </v-col>
                </div>
              </v-card>
            </v-layout>
          </v-row>
        </v-col>
      </v-row>
    </v-container> -->
  </div>
</template>

<script>
import api from "@/services/http";
export default {
  data: () => ({
    mobile: null,
    windowSize: { x: 0, y: 0 },
    TampilkanSandi: false,
    TampilkanSandiBaru: false,
    KonfirmasiTampilkanSandiBaru: false,
    token: "",
    editedItem: {
      name: "",
      password: "",
      new_password: "",
      konfirm_password: "",
    },
    defaultItem: {
      name: "",
      password: "",
      new_password: "",
      konfirm_password: "",
    },
    AlertErr: false,
    AlertSuc: false,
    MessageAlert: "",
  }),

  mounted() {
    this.token = localStorage.getItem("token");
    if (this.token == null) {
      this.$router.push("/login");
    }
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

    reset() {
      if (this.editedItem.new_password !== this.editedItem.konfirm_password) {
        this.MessageAlert = "Pastikan Password baru dan Konrimasinya benar";
        this.AlertErr = true;
        this.close();
      } else {
        api
          .post("reset?token=" + this.token, {
            Nama: this.editedItem.name,
            password: this.editedItem.password,
            new_password: this.editedItem.new_password,
            konfirm_password: this.editedItem.konfirm_password,
          })
          .then((res) => {
            console.log(res);
            this.MessageAlert = res.data.message;
            this.AlertSuc = true;
            this.close();
          })
          .catch((err) => {
            let eror = err.response.data;
            console.log(eror);
            if (eror.email != null) {
              this.MessageAlert = eror.email[0];
              this.AlertErr = true;
              this.close();
            } else if (eror.password != null) {
              this.MessageAlert = eror.password[0];
              this.AlertErr = true;
              this.close();
            } else if (eror.new_password != null) {
              this.MessageAlert = eror.new_password[0];
              this.AlertErr = true;
              this.close();
            } else {
              this.MessageAlert = eror.message;
              this.AlertErr = true;
              this.close();
            }
          });
      }
    },
    close() {
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
      window.setInterval(() => {
        this.AlertErr = false;
        this.AlertSuc = false;
      }, 10000);
    },
  },
};
</script>

<style></style>
