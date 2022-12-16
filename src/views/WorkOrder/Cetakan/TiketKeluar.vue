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
          style="width: 250px"
          src="../../../assets/TA_Logo1.png"
          alt="logo"
        />
        <v-row>
          <h1>Ticket</h1>
          <h4>No : {{ this.dataReport.NoTicket }}</h4>
        </v-row>
        <table>
          <tr>
            <td>Customer / Asuransi</td>
            <td style="font-weight: bold">
              : {{ dataReport.Pemilik }} / {{ dataReport.Pelanggan }}
            </td>
          </tr>
          <tr>
            <td>Tanggal</td>
            <td style="font-weight: bold">: {{ dataReport.Tanggal }}</td>
          </tr>
          <tr>
            <td>Nomor Polisi</td>
            <td style="font-weight: bold">: {{ dataReport.NomorPolisi }}</td>
          </tr>
          <tr>
            <td>Merk / Tipe / Warna</td>
            <td style="font-weight: bold">: {{ dataReport.Kendaraan }}</td>
          </tr>
          <tr>
            <td>Nomor WO</td>
            <td style="font-weight: bold">: {{ dataReport.KodeNota }}</td>
          </tr>
          <tr>
            <td>OR</td>
            <td style="font-weight: bold">: {{ dataReport.OwnRisk }}</td>
          </tr>
          <tr>
            <td>ttd</td>
            <td>&nbsp;</td>
          </tr>
        </table>
        <hr style="color: grey; background-color: grey; height: 2px" />
        <img
          style="width: 250px"
          src="../../../assets/TA_Logo1.png"
          alt="logo"
        />
        <v-row>
          <h1>Ticket</h1>
          <h4>No : {{ this.dataReport.NoTicket }}</h4>
        </v-row>
        <table>
          <tr>
            <td>Customer / Asuransi</td>
            <td style="font-weight: bold">
              : {{ dataReport.Pemilik }} / {{ dataReport.Pelanggan }}
            </td>
          </tr>
          <tr>
            <td>Tanggal</td>
            <td style="font-weight: bold">: {{ dataReport.Tanggal }}</td>
          </tr>
          <tr>
            <td>Nomor Polisi</td>
            <td style="font-weight: bold">: {{ dataReport.NomorPolisi }}</td>
          </tr>
          <tr>
            <td>Merk / Tipe / Warna</td>
            <td style="font-weight: bold">: {{ dataReport.Kendaraan }}</td>
          </tr>
          <tr>
            <td>Nomor WO</td>
            <td style="font-weight: bold">: {{ dataReport.KodeNota }}</td>
          </tr>
          <tr>
            <td>OR</td>
            <td style="font-weight: bold">: {{ dataReport.OwnRisk }}</td>
          </tr>
          <tr>
            <td>ttd</td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </div>
    </v-sheet>
  </v-card>
</template>

<script>
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
    var mounth = this.$route.params.data.estimasi.TanggalKeluarFisik.substring(
      5,
      7
    );
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
      this.$route.params.data.estimasi.TanggalKeluarFisik.substring(8, 10) +
      " " +
      mounth +
      " " +
      this.$route.params.data.Tanggal.substring(0, 4);
    this.dataReport.KodeNota = this.$route.params.data.KodeNota;
    this.dataReport.Pelanggan = this.$route.params.data.pelanggan.Nama;
    this.dataReport.Pemilik = this.$route.params.data.pemilik.Nama;
    this.dataReport.NomorPolisi = this.$route.params.data.NomorPolisi;
    this.dataReport.Kendaraan =
      this.$route.params.data.rangka.kendaraan.Merk +
      " " +
      this.$route.params.data.rangka.kendaraan.Nama +
      " " +
      this.$route.params.data.rangka.Warna;
    // this.dataReport.NoTicket = this.dataReport.KodeNota.replace("WO","TK")
    this.dataReport.NoTicket = this.$route.params.data.estimasi.NoTiketKeluar;
    this.dataReport.OwnRisk = parseFloat(
      this.$route.params.data.estimasi.OnRisk
    ).toLocaleString("id-ID", { style: "currency", currency: "IDR" });
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
table {
  width: 100%;
}
.row {
  margin: 0;
  padding-top: 10px;
  /* display: block; */
  margin-left: 45%;
  /* margin-right: auto; */
}
hr {
  margin-top: 30px;
  margin-bottom: 10px;
}
h4 {
  padding-top: 10px;
  padding-left: 30px;
}
table td {
  font-family: calibri;
}
</style>
