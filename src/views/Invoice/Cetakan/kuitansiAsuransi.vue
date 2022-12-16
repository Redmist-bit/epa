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
        <img
          class="logo"
          style="
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 250px;
          "
          src="../../../assets/TA_Logo1.png"
          alt="logo"
        />
        <h4 style="text-align: center; font-size:15px font-family: calibri;">
          {{ dataReport.AlamatLengkap }}
        </h4>
        <h4 style="text-align: center; font-size:15px font-family: calibri;">
          email : {{ dataReport.EmailPerusahaan }}
        </h4>
        <hr />
        <hr />
        <h3 style="text-align: center; text-decoration: underline">KUITANSI</h3>
        <table>
          <tr>
            <td style="width: 60%; text-align: right; padding-right: 10px">
              No
            </td>
            <td style="width: 20%">: 0101/FW/2111/000225</td>
          </tr>
        </table>
        <table style="width: 100%">
          <tr>
            <td style="width: 20%">Sudah Terima Dari</td>
            <td style="width: auto">:</td>
            <td style="width: 80%">{{ dataReport.Pelanggan }}</td>
          </tr>
          <tr height="50px;">
            <td style="width: 20%; vertical-align: text-top">Terbilang</td>
            <td style="vertical-align: text-top; width: auto">:</td>
            <td style="width: 80%; vertical-align: text-top">
              {{ dataReport.Terbilang }}
            </td>
          </tr>
          <tr>
            <td style="width: 20%; vertical-align: text-top">
              Untuk Pembayaran
            </td>
            <td style="vertical-align: text-top; width: auto">:</td>
            <td style="width: 80%; vertical-align: text-top">
              {{ dataReport.KeteranganPembayaran }}.
            </td>
          </tr>
        </table>
        <p style="padding-left: 2px; margin-top: 20px">Rincian :</p>
        <table style="width: 65%">
          <!-- <tr>
                        <td>Rincian :</td>
                    </tr> -->
          <tr>
            <td style="width: 30%">Biaya Perbaikan</td>
            <td style="width: 5%">:</td>
            <td
              style="
                width: 20%;
                text-align: right;
                border-bottom: 1px solid black;
              "
            >
              {{
                parseFloat(dataReport.KAss).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </td>
          </tr>
          <tr style="font-weight: bold">
            <td>Total</td>
            <td>:</td>
            <td style="text-align: right">
              {{
                dataReport.Total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </td>
          </tr>
        </table>
        <p style="text-align: right; margin-right: 65px; margin-top: 15px">
          Samarinda, 29 Nopember 2021
        </p>
        <div style="text-align: right; margin-top: 60px">
          <p style="margin-right: 90px; text-decoration: underline">
            STEPHEN CHRISTIANTO
          </p>
          <p style="margin-right: 130px">PIMPINAN</p>
        </div>
        <p>Keterangan :</p>
        <p>
          1. Mohon pembayaran dapat ditransfer ke BCA 861-588-7788 atau Mandiri
          148-001-899-7778 a/n PT. TRINITY AUTO
        </p>
        <p>2. Mohon bukti transfer dikirim via email ke fin@trinityauto.id</p>
        <p>
          3. Pembayaran dianggap sah apabila uang sudah masuk ke rekening kami
        </p>
      </div>
    </v-sheet>
  </v-card>
</template>

<script>
import api from "@/services/http";
import angkaTerbilang from "@develoka/angka-terbilang-js";
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
    this.dataReport.KodeNota = this.$route.params.data.KodeNota;
    this.dataReport.Pelanggan = this.$route.params.data.pelanggan.Nama;
    this.dataReport.KeteranganPembayaran =
      "Unit " +
      this.$route.params.data.rangka.kendaraan.Merk +
      " " +
      this.$route.params.data.rangka.kendaraan.Nama +
      " / " +
      this.$route.params.data.NomorPolisi +
      " / " +
      this.$route.params.data.NomorRangka +
      " Atas Nama " +
      this.$route.params.data.wo.pemilik.Nama;
    this.dataReport.Tanggal =
      this.$route.params.data.Tanggal.substring(8, 10) +
      " " +
      mounth +
      " " +
      this.$route.params.data.Tanggal.substring(0, 4);
    this.dataReport.KAss = this.$route.params.data.KAss;
    this.dataReport.Total = parseFloat(this.dataReport.KAss);
    this.dataReport.Terbilang =
      angkaTerbilang(parseFloat(this.dataReport.Total)).toUpperCase() +
      " RUPIAH";
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
        .put("countCetakan/" + id + "?token=" + token, { modul: "INV" })
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
p {
  margin: 0%;
  font-size: 14px;
  font-family: calibri;
}
td {
  font-size: 14px;
  font-family: calibri;
}
</style>
