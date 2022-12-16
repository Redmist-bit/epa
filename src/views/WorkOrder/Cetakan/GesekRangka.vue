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
        <h4 style="text-align: center; font-size:15px font-family: calibri;">
          {{ dataReport.AlamatLengkap }}
        </h4>
        <h4 style="text-align: center; font-size:15px font-family: calibri;">
          {{ dataReport.EmailPerusahaan }}
        </h4>
        <hr />
        <h5>TANDA TERIMA GESEKAN RANGKA & MESIN</h5>
        <h5 style="text-decoration: underline 2px">
          {{ dataReport.Pelanggan }}
        </h5>

        <table style="margin-left: 15%; margin-top: 15px">
          <tr>
            <td>1. NAMA PEMILIK</td>
            <td>: {{ dataReport.Pemilik }}</td>
          </tr>
          <tr>
            <td>2. MERK/TYPE KENDARAAN</td>
            <td>: {{ dataReport.Merk }}/{{ dataReport.Type }}</td>
          </tr>
          <tr>
            <td>3. WARNA</td>
            <td>: {{ dataReport.Warna }}</td>
          </tr>
          <tr>
            <td>4. NO. POLISI</td>
            <td>: {{ dataReport.NomorPolisi }}</td>
          </tr>
          <tr>
            <td>5. TAHUN PEMBUATAN</td>
            <td>: {{ dataReport.Tahun }}</td>
          </tr>
          <tr>
            <td>6. NO. RANGKA</td>
            <td>: {{ dataReport.NomorRangka }}</td>
          </tr>
          <tr>
            <td>7. NO. MESIN</td>
            <td>: {{ dataReport.NomorMesin }}</td>
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
    this.dataReport.Pelanggan = this.$route.params.data.pelanggan.Nama;
    this.dataReport.Pemilik = this.$route.params.data.pemilik.Nama;
    this.dataReport.NomorPolisi = this.$route.params.data.NomorPolisi;
    this.dataReport.NomorMesin = this.$route.params.data.NomorMesin;
    this.dataReport.NomorRangka = this.$route.params.data.NomorRangka;
    this.dataReport.Tahun = this.$route.params.data.rangka.Tahun;
    this.dataReport.Warna = this.$route.params.data.rangka.Warna;
    this.dataReport.Merk = this.$route.params.data.rangka.kendaraan.Merk;
    this.dataReport.Type = this.$route.params.data.rangka.kendaraan.Nama;
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
    print() {
      // await this.$htmlToPaper('printing')
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
h5 {
  text-decoration: underline;
  text-align: center;
}
hr {
  background-color: green;
}
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
td {
  color: grey;
  margin: 0%;
  /* margin-left: 15%; */
  font-size: 12px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.row {
  margin: 0%;
  padding: 0%;
}
.col {
  margin: 0%;
  padding: 0%;
}
/* .judul{
        margin-left: 15%;
    }
    .data{
        margin-left: 20%;
    } */
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
