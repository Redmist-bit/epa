<template>
  <!-- <v-col cols="12" md="12"> -->
  <v-card>
    <v-btn color="success" @click="print">
      <v-icon>mdi-printer</v-icon>
    </v-btn>
    <!-- <v-card-text> -->
    <v-container class="fill-height" fluid>
      <v-sheet
        outlined
        width="21cm"
        height="auto"
        class="ma-8 mx-auto elevation-15"
      >
        <div
          id="printing"
          style="padding: 35px; width: 21cm; height: auto; margin: auto"
        >
          <!-- <img :src="logo"> -->
          <img
            style="width: 250px"
            src="../../../assets/TA_Logo1.png"
            alt="logo"
          />
          <h4 style="text-align: center; font-size:15px font-family: calibri;">
            {{ dataReport.AlamatLengkap }}
          </h4>
          <h4 style="text-align: center; font-size:15px font-family: calibri;">
            {{ dataReport.EmailPerusahaan }}
          </h4>
          <h3>WORK ORDER : {{ dataReport.KodeNota }}</h3>

          <!-- table info -->
          <table>
            <tr>
              <td class="judul" style="width: 20%">DATA KENDARAAN</td>
              <td style="width: 30%">: {{ dataReport.NomorPolisi }}</td>
              <td class="judul" style="width: 20%; text-decoration: underline">
                DATA PELANGGAN
              </td>
              <td style="width: 30%"></td>
            </tr>
            <tr>
              <td class="judul" style="width: 20%">Produsen Type</td>
              <td style="width: 30%">: {{ dataReport.MerkType }}</td>
              <td class="judul" style="width: 20%">Nama</td>
              <td style="width: 30%">: {{ dataReport.Pemilik }}</td>
            </tr>
            <tr>
              <td class="judul" style="width: 20%">Tahun</td>
              <td style="width: 30%">: {{ dataReport.Tahun }}</td>
              <td class="judul" style="width: 20%">Alamat</td>
              <td style="width: 30%">: {{ dataReport.Alamat }}</td>
            </tr>
            <tr>
              <td class="judul" style="width: 20%">No Rangka</td>
              <td style="width: 30%">: {{ dataReport.NomorRangka }}</td>
              <td class="judul" style="width: 20%">Nomor Telepon</td>
              <td style="width: 30%">: {{ dataReport.Telp }}</td>
            </tr>
            <tr>
              <td class="judul" style="width: 20%">No Mesin</td>
              <td style="width: 30%">: {{ dataReport.NomorMesin }}</td>
              <td class="judul" style="width: 20%">S/A</td>
              <td style="width: 30%">:</td>
            </tr>
            <tr>
              <td class="judul" style="width: 20%">Warna</td>
              <td style="width: 30%">: {{ dataReport.Warna }}</td>
              <td class="judul" style="width: 20%">Mekanik</td>
              <td style="width: 30%">:</td>
            </tr>
            <tr>
              <td class="judul" style="width: 20%">Odometer</td>
              <td style="width: 30%">: {{ dataReport.Odometer }}</td>
              <td class="judul" style="width: 20%">Tanggal</td>
              <td style="width: 30%">: {{ dataReport.Tanggal }}</td>
            </tr>
            <tr>
              <td class="judul" style="width: 20%">Biaya (Est)</td>
              <td style="width: 30%">:</td>
              <td class="judul" style="width: 20%">Jam</td>
              <td style="width: 30%">:</td>
            </tr>
            <tr>
              <td class="judul" style="width: 20%">Keterangan</td>
              <td style="width: 30%">: {{ dataReport.Keterangan }}</td>
              <td class="judul" style="width: 20%">Asuransi</td>
              <td style="width: 30%">: {{ dataReport.Pelanggan }}</td>
            </tr>
          </table>

          <!-- table isi -->
          <table>
            <tbody>
              <tr>
                <td>
                  <div class="page">
                    <table>
                      <tbody>
                        <tr
                          class="judul"
                          style="
                            font-size: 15px;
                            border-top: 2px solid black;
                            border-bottom: 1px solid black;
                          "
                        >
                          <td>Keluhan</td>
                        </tr>
                        <tr
                          v-for="(item, index) in dataReport.Keluhan"
                          :key="index"
                          style="border-bottom: 1px solid black"
                        >
                          <td>{{ item.Keluhan }}</td>
                        </tr>
                        <tr
                          class="judul"
                          style="
                            font-size: 15px;
                            border-bottom: 1px solid black;
                          "
                        >
                          <td>Instruksi Kerja</td>
                        </tr>
                        <tr
                          v-for="(item, index) in dataReport.Instruksi"
                          :key="index"
                          style="border-bottom: 1px solid black"
                        >
                          <td>
                            {{
                              item.pekerjaan.Nama + " (" + item.Keterangan + ")"
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <!-- table footer -->
              <div class="footer">
                <table
                  style="
                    width: 45%;
                    margin-top: 20px;
                    margin-bottom: 20px;
                    float: left;
                  "
                >
                  <thead>
                    <tr>
                      <th style="border: 1px solid black">No</th>
                      <th style="border: 1px solid black">
                        Perlengkapan / Akses
                      </th>
                      <th style="border: 1px solid black">Cek</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in perlengkapan" :key="item.Akses">
                      <td style="border: 1px solid black; text-align: center">
                        {{ index + 1 }}
                      </td>
                      <td style="border: 1px solid black">{{ item.Akses }}</td>
                      <td style="border: 1px solid black">{{ item.Cek }}</td>
                    </tr>
                  </tbody>
                </table>
                <table
                  style="
                    width: 45%;
                    margin-top: 20px;
                    margin-bottom: 20px;
                    float: right;
                  "
                >
                  <thead>
                    <tr>
                      <th style="border: 1px solid black">No</th>
                      <th style="border: 1px solid black">
                        Perlengkapan / Akses
                      </th>
                      <th style="border: 1px solid black">Cek</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in perlengkapan2"
                      :key="item.Akses"
                    >
                      <td style="border: 1px solid black; text-align: center">
                        {{ index + 11 }}
                      </td>
                      <td style="border: 1px solid black">{{ item.Akses }}</td>
                      <td style="border: 1px solid black">{{ item.Cek }}</td>
                    </tr>
                  </tbody>
                </table>
                <table style="width: 65%; margin-bottom: 20px; float: left">
                  <thead>
                    <tr>
                      <th style="border-bottom: 2px solid black" colspan="2">
                        Petugas Bengkel
                      </th>
                    </tr>
                    <tr>
                      <th style="width: 50%; border: 1px solid black">
                        Service Advisor
                      </th>
                      <th style="width: 50%; border: 1px solid black">
                        Mekanik
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="height: 50px">&nbsp;</td>
                      <td style="height: 50px">&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
                <table style="width: 25%; margin-bottom: 20px; float: right">
                  <thead>
                    <tr>
                      <th style="border-bottom: 2px solid black">Pelanggan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="height: 67px">&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </tfoot>
          </table>
        </div>
      </v-sheet>
    </v-container>
  </v-card>
</template>

<style scoped>
.footer table {
  border: 1px solid black;
  border-collapse: collapse;
  width: 100%;
  height: auto;
}

/* .page table {
      border: 1px solid black;
      border-collapse: collapse;
      width:100%;
      height:auto; 
    } */

table {
  border: 1px solid black;
  border-collapse: collapse;
  width: 100%;
  height: auto;
}

table td {
  /* border: 1px solid green; */
  /* height: auto; */
  /* overflow: auto; */
  font-size: 14px;
  vertical-align: top;
  font-family: calibri;
}

thead {
  text-align: center;
}

.judul {
  font-weight: bold;
  font-size: 16px;
}

.footer container {
  /* position: sticky; */
  bottom: 0px;
  /* left: 0px; */
  width: 100%;
  height: auto;
  margin: auto;
  padding: 35px;
  /* background: gray; */
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

p {
  /* font-weight: bold; */
  /* text-align: center; */
  margin-bottom: 0% !important;
  /* padding: 0%; */
}
@media print {
  .header {
    position: fixed;
    height: 100px;
    top: 0;
  }
  thead {
    display: table-header-group;
  }
  tfoot {
    display: table-footer-group;
  }
  .footer {
    position: relative;
    bottom: 0;
  }
  @page {
    margin: 20mm;
  }
  .page {
    page-break-after: always;
  }
}
</style>

<script>
// import TA from 'assets/logo.png'
import api from "@/services/http";
export default {
  data() {
    return {
      // logo:TA
      id: "",
      token: localStorage.getItem("token"),
      logo: require("@/assets/logoTA.png"),
      perlengkapan: [
        { Akses: "Segitiga Pengaman (Traffic Cone)", Cek: "" },
        { Akses: "Radio Komunikasi / HT / Rig", Cek: "" },
        { Akses: "Lampu Rotari", Cek: "" },
        { Akses: "Alat Pemadam Api Ringan / APAR", Cek: "" },
        { Akses: "Jok / Bantalan Belakang Kemudi", Cek: "" },
        { Akses: "Kunci Roda", Cek: "" },
        { Akses: "Tape / Radio", Cek: "" },
        { Akses: "Manual Book", Cek: "" },
        { Akses: "Tool Set", Cek: "" },
        { Akses: "Dongkrak + Handle", Cek: "" },
      ],
      perlengkapan2: [
        { Akses: "Monitor", Cek: "" },
        { Akses: "Controller", Cek: "" },
        { Akses: "Salon", Cek: "" },
        { Akses: "", Cek: "" },
        { Akses: "", Cek: "" },
        { Akses: "", Cek: "" },
        { Akses: "", Cek: "" },
        { Akses: "", Cek: "" },
        { Akses: "", Cek: "" },
        { Akses: "", Cek: "" },
      ],
      dataReport: {},
    };
  },
  mounted() {
    this.id = this.$route.params.data.id;
  },
  created() {
    var mounth = this.$route.params.data.Tanggal.substring(5, 7);
    switch (mounth) {
      case "01":
        mounth = "Januari";
        break;
      case "02":
        mounth = "Februari";
        break;
      case "03":
        mounth = "Maret";
        break;
      case "04":
        mounth = "April";
        break;
      case "05":
        mounth = "Mei";
        break;
      case "06":
        mounth = "Juni";
        break;
      case "07":
        mounth = "Juli";
        break;
      case "08":
        mounth = "Agustus";
        break;
      case "09":
        mounth = "September";
        break;
      case "10":
        mounth = "Oktober";
        break;
      case "11":
        mounth = "November";
        break;
      case "12":
        mounth = "Desember";
        break;
    }
    this.dataReport.Tanggal =
      this.$route.params.data.Tanggal.substring(8, 10) +
      " " +
      mounth +
      " " +
      this.$route.params.data.Tanggal.substring(0, 4);
    this.dataReport.KodeNota = this.$route.params.data.KodeNota;
    this.dataReport.Pelanggan = this.$route.params.data.pelanggan.Nama;
    this.dataReport.Pemilik = this.$route.params.data.pemilik.Nama;
    this.dataReport.Telp = this.$route.params.data.pemilik.Telp;
    this.dataReport.NomorPolisi = this.$route.params.data.NomorPolisi;
    this.dataReport.NomorRangka = this.$route.params.data.NomorRangka;
    this.dataReport.NomorMesin = this.$route.params.data.NomorMesin;
    this.dataReport.Odometer = this.$route.params.data.Odometer;
    this.dataReport.Warna = this.$route.params.data.rangka.Warna;
    this.dataReport.Tahun = this.$route.params.data.rangka.Tahun;
    this.dataReport.MerkType =
      this.$route.params.data.rangka.kendaraan.Merk +
      "/" +
      this.$route.params.data.rangka.kendaraan.Nama;
    this.dataReport.Keterangan = this.$route.params.data.Keterangan;
    this.dataReport.Instruksi = this.$route.params.data.rwl;
    this.dataReport.Keluhan = this.$route.params.data.keluhan;
    this.dataReport.EmailPerusahaan = JSON.parse(
      localStorage.getItem("info")
    ).Email;
    this.dataReport.AlamatLengkap =
      JSON.parse(localStorage.getItem("info")).Alamat +
      " Telp " +
      JSON.parse(localStorage.getItem("info")).Telepon +
      ", Fax. " +
      JSON.parse(localStorage.getItem("info")).Fax +
      " " +
      JSON.parse(localStorage.getItem("info")).Kota;
    console.log(this.dataReport);
  },
  methods: {
    countCetak(id, token) {
      api
        .put("countCetakan/" + id + "?token=" + token, { modul: "WO" })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async print() {
      // await this.$htmlToPaper('printing')
      // Get HTML to print from element
      const prtHtml = document.getElementById("printing").innerHTML;

      // Get all stylesheets HTML
      let stylesHtml = "";
      for (const node of [
        ...document.querySelectorAll('link[rel="stylesheet"], style'),
      ]) {
        // console.log(node.outerHTML)
        stylesHtml += node.outerHTML;
      }

      // Open the print window
      const WinPrint = window.open(
        "",
        "",
        "width=" + screen.availWidth + ",height=" + screen.availHeight,
        "left=0,top=0,toolbar=0,scrollbars=0,status=0"
      );
      var is_chrome = Boolean(WinPrint.chrome);
      WinPrint.document.write(`<!DOCTYPE html>
            <html>
            <head>
                ${stylesHtml}
            </head>
            <body>
                ${prtHtml}
            </body>
            </html>`);
      WinPrint.onafterprint = this.countCetak(this.id, this.token);
      WinPrint.document.close();
      if (is_chrome) {
        WinPrint.onload = function () {
          // wait until all resources loaded
          WinPrint.focus(); // necessary for IE >= 10
          WinPrint.print(); // change window to mywindow
          WinPrint.close(); // change window to mywindow
        };
      } else {
        WinPrint.document.close(); // necessary for IE >= 10
        WinPrint.focus(); // necessary for IE >= 10
        WinPrint.print();
        WinPrint.close();
      }
      window.addEventListener("afterprint", myFunction);

      function myFunction() {
        alert("This document is now being printed");
      }
      // WinPrint.document.close();
      // WinPrint.focus();
      // WinPrint.print();
      // WinPrint.close();
    },
  },
};
</script>
