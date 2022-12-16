<template>
  <v-card>
    <v-btn color="success" @click="print">
      <v-icon>mdi-printer</v-icon>
    </v-btn>
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
        <v-row>
          <v-col cols="8">
            <img
              style="width: 250px; margin-left: 50%"
              src="../../../assets/TA_Logo1.png"
              alt="logo"
            />
          </v-col>
          <v-col cols="4">
            <img
              style="width: 80px; margin-left: 65%"
              src="../../../assets/ulin.png"
              alt="logoUlin"
            />
          </v-col>
        </v-row>
        <h4 style="text-align: center; font-size:15px font-family: calibri;">
          {{ dataReport.AlamatLengkap }}
        </h4>
        <h4 style="text-align: center; font-size:15px font-family: calibri;">
          {{ dataReport.EmailPerusahaan }}
        </h4>
        <hr style="height: 2px; color: black; background-color: black" />
        <hr style="height: 2px; color: black; background-color: black" />
        <h3
          style="
            margin-top: 10px;
            text-align: center;
            text-decoration: underline 1px;
          "
        >
          KUITANSI
        </h3>

        <table style="margin-top: 10px; width: 100%">
          <tr>
            <td style="width: 27%">No Kuitansi</td>
            <td>: {{ dataReport.KodeNota }}</td>
          </tr>
          <tr>
            <td>Sudah Terima Dari</td>
            <td>: {{ dataReport.Pelanggan }}</td>
          </tr>
          <tr>
            <td>Banyaknya Uang</td>
            <td>: {{ dataReport.Terbilang }}</td>
          </tr>
          <tr>
            <td>Untuk Pembayaran</td>
            <td>: {{ dataReport.KeteranganPembayaran }}</td>
          </tr>
          <tr>
            <td>Jumlah</td>
            <td>
              : {{ parseFloat(dataReport.Jumlah).toLocaleString(undefined) }}
            </td>
          </tr>
        </table>
        <table style="width: 100%">
          <tr>
            <td
              style="
                text-align: right;
                padding-bottom: 70px;
                padding-right: 30px;
              "
            >
              Samarinda, 20 September 2021
            </td>
          </tr>
          <tr>
            <td
              style="
                text-align: right;
                text-decoration: underline;
                padding-right: 50px;
              "
            >
              STEPHEN CHRISTIANTO
            </td>
          </tr>
          <tr>
            <td style="text-align: right; padding-right: 100px">DIREKTUR</td>
          </tr>
        </table>
        <p><i>Keterangan :</i></p>
        <p><i>Mohon pembayaran dapat ditransfer ke</i></p>
        <p><i>1. BCA 861-588-7788 a/n PT. TRINITY AUTO</i></p>
        <p><i>2. Mandiri 148-001-899-7778 a/n PT. TRINITY AUTO</i></p>
        <p style="text-align: right"><i>Dicetak : CGAACA 10:14</i></p>
      </div>
    </v-sheet>
    <!-- <h1>logoTA</h1>
        <h4 style="text-align: center; font-size:15px font-family: calibri;">Jl. Bung Tomo No. 49 RT. 11 Telp (0541) - 260521 Samarinda Seberang</h4>
        <h4 style="text-align: center; font-size:15px font-family: calibri;">he@trinityauto.id</h4>
        <h5>garisline</h5>
        <h3>KUITANSI</h3>
        <p>No Kuitansi : 0101/WO/2109/000117</p>
        <p>Sudah Terima Dari : ASURANSI CENTRAL ASIA</p>
        <p>Banyaknya Uang : TIGA RATUS RIBU RUPIAH</p>
        <p>Untuk Pembayaran : Unit SUZUKI ERTIGA KT 1306 HD</p>
        <p>Jumlah : 300,000</p>
        <p>Samarinda, 20 September 2021</p>
        <p>STEPHEN CHRISTIANTO</p>
        <p>DIREKTUR</p> -->
  </v-card>
</template>

<script>
import angkaTerbilang from "@develoka/angka-terbilang-js";
import api from "@/services/http";
export default {
  data() {
    return {
      id: "",
      token: localStorage.getItem("token"),
      dataReport: {},
    };
  },
  mounted() {
    this.id = this.$route.params.data.id;
  },
  created() {
    console.log(this.$route);
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
    this.dataReport.KodeNota = this.$route.params.data.KodeNota;
    this.dataReport.Pelanggan = this.$route.params.data.pelanggan.Nama;
    this.dataReport.KeteranganPembayaran =
      "Unit " +
      this.$route.params.data.rangka.kendaraan.Merk +
      " " +
      this.$route.params.data.rangka.kendaraan.Nama +
      " " +
      this.$route.params.data.NomorPolisi;
    this.dataReport.Jumlah =
      this.$route.params.data.estimasi.OnRisk === null
        ? 0
        : this.$route.params.data.estimasi.OnRisk;
    this.dataReport.Terbilang =
      angkaTerbilang(parseFloat(this.dataReport.Jumlah)).toUpperCase() +
      " RUPIAH";
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
    print() {
      // Get HTML to print from element
      const prtHtml = document.getElementById("printing").innerHTML;

      // Get all stylesheets HTML
      let stylesHtml = "";
      for (const node of [
        ...document.querySelectorAll('link[rel="stylesheet"], style'),
      ]) {
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
      // WinPrint.document.close();
      // WinPrint.focus();
      // WinPrint.print();
      // WinPrint.close();
    },
  },
};
</script>

<style scoped>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
table td {
  vertical-align: top;
  font-family: calibri;
}
p {
  margin: 0%;
  font-size: 12px;
}
</style>
