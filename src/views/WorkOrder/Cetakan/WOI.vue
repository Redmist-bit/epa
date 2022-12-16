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
        <h3 style="margin-bottom: -10px">
          WORK ORDER INTERNAL : {{ dataReport.KodeNota }}
        </h3>
        <table style="margin-top: 20px; border: 1px solid black">
          <tr>
            <td class="judul">DATA KENDARAAN</td>
            <td class="isi">&nbsp;</td>
            <td class="judul">Tahun Pembuatan</td>
            <td class="isi">: {{ dataReport.Tahun }}</td>
          </tr>
          <tr>
            <td class="judul">Merk/Type</td>
            <td class="isi">: {{ dataReport.MerkType }}</td>
            <td class="judul">Warna</td>
            <td class="isi">: {{ dataReport.Warna }}</td>
          </tr>
          <tr>
            <td class="judul">No Polisi</td>
            <td class="isi">: {{ dataReport.NomorPolisi }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td class="judul">No Rangka</td>
            <td class="isi">: {{ dataReport.NomorRangka }}</td>
            <td class="judul" style="text-decoration: underline">
              DATA PELANGGAN
            </td>
            <td class="isi">&nbsp;</td>
          </tr>
          <tr>
            <td class="judul">No Mesin</td>
            <td class="isi">: {{ dataReport.NomorMesin }}</td>
            <td class="judul">Nama</td>
            <td class="isi">: {{ dataReport.Pemilik }}</td>
          </tr>
          <tr>
            <td class="judul">Odometer</td>
            <td class="isi">: {{ dataReport.Odometer }}</td>
            <td class="judul">Tanggal</td>
            <td class="isi">: {{ dataReport.Tanggal }}</td>
          </tr>
          <tr>
            <td class="judul">BBM</td>
            <td class="isi">: F |------|------|------|------| E</td>
            <td class="judul">Asuransi</td>
            <td class="isi">: {{ dataReport.Pelanggan }}</td>
          </tr>
        </table>
        <table style="margin-top: 20px" class="isi">
          <tbody>
            <tr>
              <td>
                <div class="page">
                  <table>
                    <thead>
                      <tr>
                        <th style="width: 70%">Instruksi</th>
                        <th style="width: 30%">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in dataReport.Instruksi"
                        :key="index"
                      >
                        <td>
                          {{
                            item.pekerjaan.Nama + " (" + item.Keterangan + ")"
                          }}
                        </td>
                        <td>&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p style="font-family: calibri; margin-botom: 20px">
          Keterangan : {{ dataReport.Keterangan }}
        </p>
        <hr />
        <table class="foot">
          <thead>
            <tr>
              <th colspan="6">Petugas Bengkel</th>
            </tr>
            <tr>
              <th>Job Planner</th>
              <th>Manager Processing</th>
              <th>Spv Service</th>
              <th>Manager Service</th>
              <th>Fabrikasi</th>
              <th>Body Repair</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="height: 40px">&nbsp;</td>
              <td style="height: 40px">&nbsp;</td>
              <td style="height: 40px">&nbsp;</td>
              <td style="height: 40px">&nbsp;</td>
              <td style="height: 40px">&nbsp;</td>
              <td style="height: 40px">&nbsp;</td>
            </tr>
          </tbody>
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
    var mounth = this.$route.params.data.TanggalIWO.substring(5, 7);
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
      this.$route.params.data.TanggalIWO.substring(8, 10) +
      " " +
      mounth +
      " " +
      this.$route.params.data.TanggalIWO.substring(0, 4);
    this.dataReport.KodeNota = this.$route.params.data.KodeNota;
    this.dataReport.Pelanggan = this.$route.params.data.pelanggan.Nama;
    this.dataReport.Pemilik = this.$route.params.data.pemilik.Nama;
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
.judul {
  font-weight: bold;
  font-size: 16px;
}
.logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.isi .page thead th {
  border: 1px solid black;
}
.isi .page tbody td {
  border: 1px solid black;
}
table {
  /* margin-top: 20px; */
  /* border: 1px solid black; */
  border-collapse: collapse;
  width: 100%;
  /* height: auto; */
}
table td {
  font-family: calibri;
  font-size: 14px;
  vertical-align: top;
  /* padding-left: 5px; */
}
/* table tbody td{
        border: 1px solid black;
    } */
.foot th {
  border: 1px solid black;
}
.foot td {
  border: 1px solid black;
  height: 40px;
}
hr {
  background-color: black;
  color: black;
  height: 1px;
  border-width: 0;
  margin-bottom: 10px;
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
